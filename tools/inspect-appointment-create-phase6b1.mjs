import fs from 'node:fs';

const source = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');

function lineOf(index) {
  return source.slice(0, index).split('\n').length;
}

function extractFunction(start) {
  const open = source.indexOf('{', start);
  if (open < 0) return null;
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') { const end = source.indexOf('\n', i + 2); i = end < 0 ? source.length : end; continue; }
    if (ch === '/' && next === '*') { const end = source.indexOf('*/', i + 2); i = end < 0 ? source.length : end + 1; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  return null;
}

const namePattern = /(submitAdminBooking|clearNuevaCita|agendarHoy|agendarDesde|openNuevaCitaFromCal|autoFillPrice|calcAbono|calcConvenio|checkDomicilioWarn|toggleNcAddress|updateSesionesInfo|validateNoMidnight|paciente.*Cita|select.*Paciente|search.*Paciente|nuevaCita)/i;
const bodyMarkers = ['ncName','ncPhone','ncEmail','ncService','ncMod','ncDate','ncTime','ncPrice','ncAddress','formCita','pacSearch','pacDropdown'];
const excludePattern = /(editar|reagendar|cancel|changeStatus|estado|eliminar)/i;

const results = [];
for (const match of source.matchAll(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
  const text = extractFunction(match.index);
  if (!text) continue;
  const name = match[1];
  const related = namePattern.test(name) || bodyMarkers.filter(marker => text.includes(marker)).length >= 3;
  if (!related) continue;
  results.push({ name, line:lineOf(match.index), excluded:excludePattern.test(name), text });
}

let report = '# Inventario de creación de citas — Fase 6B1\n\n';
report += `- Funciones relacionadas: ${results.length}\n`;
report += `- Candidatas para 6B1: ${results.filter(x => !x.excluded).length}\n`;
report += `- Excluidas para 6B2: ${results.filter(x => x.excluded).length}\n\n`;
report += '## Candidatas para creación\n\n';
for (const item of results.filter(x => !x.excluded)) report += `- \`${item.name}\` — línea ${item.line}\n`;
report += '\n## Excluidas para edición/reprogramación/estado\n\n';
for (const item of results.filter(x => x.excluded)) report += `- \`${item.name}\` — línea ${item.line}\n`;
report += '\n## Código exacto de candidatas\n\n';
for (const item of results.filter(x => !x.excluded)) report += `### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\`\n\n`;
report += '\n## Código exacto de excluidas\n\n';
for (const item of results.filter(x => x.excluded)) report += `### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\`\n\n`;

fs.writeFileSync('MODULARIZACION_FASE6B1_INVENTARIO.md', report, 'utf8');
console.log(`Creación de citas inventariada: ${results.length} funciones.`);
