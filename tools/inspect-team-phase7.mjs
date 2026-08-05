import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE7_INVENTARIO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

function extractFunctions(text) {
  const found = [];
  const re = /\b(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match;
  while ((match = re.exec(text))) {
    const start = match.index;
    const open = text.indexOf('{', re.lastIndex);
    if (open < 0) continue;
    let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
    let end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i], next = text[i + 1];
      if (lineComment) { if (ch === '\n') lineComment = false; continue; }
      if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === '\\') { escaped = true; continue; }
        if (ch === quote) quote = '';
        continue;
      }
      if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
      if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      found.push({
        name: match[2],
        async: !!match[1],
        line: text.slice(0, start).split('\n').length,
        code: text.slice(start, end)
      });
      re.lastIndex = end;
    }
  }
  return found;
}

const all = extractFunctions(source);
const exact = new Set([
  'byIdFrom','assignmentFor','professionalName','loadTeamData','activeProfessionals',
  'renderEquipo','abrirNuevoPro','abrirEditarPro','savePro','resetProPassword','togglePro','deletePro',
  'abrirAsignarPro','guardarAsignacion','autorizarAsignacion','revocarAsignacion',
  'marcarPagoProfesional','abrirDetalleProfesional','cerrarDetalleProfesional',
  'renderProfessionalAgenda','loadProfessionalAgenda','markProfessionalAttended',
  'openProfessionalIssue','submitProfessionalIssue','renderTeamOperations'
]);
const prefix = /^(?:team|professional|pro[A-Z]|renderPro|loadPro|savePro|resetPro|togglePro|deletePro|abrir.*Pro|guardarAsignacion|autorizarAsignacion|revocarAsignacion|marcarPagoProfesional)/;
const candidates = all.filter(fn => exact.has(fn.name) || prefix.test(fn.name));

let md = '# Inventario estricto — Fase 7 Equipo clínico\n\n';
md += `- Funciones totales detectadas: ${all.length}\n`;
md += `- Candidatas estrictas: ${candidates.length}\n\n`;
md += '## Resumen\n\n';
for (const fn of candidates) {
  const actions = [...fn.code.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]);
  md += `- \`${fn.name}\` — línea ${fn.line}`;
  if (actions.length) md += ` — acciones: ${[...new Set(actions)].join(', ')}`;
  md += '\n';
}
md += '\n## Código exacto\n\n';
for (const fn of candidates) {
  md += `### ${fn.name}\n\n\`\`\`javascript\n${fn.code}\n\`\`\`\n\n`;
}
fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario Fase 7 generado: ${candidates.length} candidatas.`);
