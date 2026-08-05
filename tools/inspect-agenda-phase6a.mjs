import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const lines = source.split('\n');

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
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1, text: source.slice(start, i + 1) };
    }
  }
  return null;
}

const declarations = [...source.matchAll(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)];
const namePattern = /(agenda|calendar|calendario|citasResumen|citasDia|citasSemana|citaCard|detalleCita|abrirCita|openCita|renderCitas|filtrarCitas|filtroAgenda|navegarAgenda|mesAgenda|semanaAgenda|diaAgenda)/i;
const bodyMarkers = [
  "getElementById('vAgenda')", 'getElementById("vAgenda")',
  "getElementById('agenda", 'getElementById("agenda',
  "getElementById('calendar", 'getElementById("calendar',
  "getElementById('cal", 'getElementById("cal',
  'renderAgenda(', 'renderCalendar(', 'renderCitasResumen(',
  "showView('agenda')", 'showView("agenda")',
  'agendaDate', 'agendaSearch', 'agendaFilter', 'calendarGrid', 'calendarTitle'
];
const writeMarkers = [
  'action=saveAppointment', 'action=updateAppointment', 'action=createAppointment',
  'action=changeAppointmentStatus', 'action=reprogram', 'action=deleteAppointment',
  'guardarCita(', 'saveCita(', 'crearCita(', 'reprogramar', 'cambiarEstado',
  'fetchJsonWithTimeout(APPS_SCRIPT_URL', "method: 'POST'", 'method:"POST"'
];

const results = [];
for (const match of declarations) {
  const block = extractFunction(match.index);
  if (!block) continue;
  const name = match[1];
  const related = namePattern.test(name) || bodyMarkers.some(marker => block.text.includes(marker));
  if (!related) continue;
  const writes = writeMarkers.some(marker => block.text.includes(marker));
  results.push({ name, line: lineOf(match.index), writes, text: block.text });
}

const ids = [...source.matchAll(/id=["']([^"']*(?:agenda|calendar|calendario|cita)[^"']*)["']/gi)]
  .map(m => m[1])
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort();
const handlers = [...source.matchAll(/on(?:click|change|input)=["']([^"']+)["']/gi)]
  .map(m => m[1])
  .filter(v => /(agenda|calendar|cita|fecha|mes|semana)/i.test(v))
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort();

let report = '# Inventario focal de Agenda — Fase 6A\n\n';
report += `- Funciones relacionadas: ${results.length}\n`;
report += `- Funciones con escritura detectada: ${results.filter(x => x.writes).length}\n`;
report += `- IDs relacionados: ${ids.length}\n`;
report += `- Handlers relacionados: ${handlers.length}\n\n`;
report += '## Funciones candidatas de lectura/renderizado\n\n';
for (const item of results.filter(x => !x.writes)) report += `- \`${item.name}\` — línea ${item.line}\n`;
report += '\n## Funciones excluidas por posible escritura\n\n';
for (const item of results.filter(x => x.writes)) report += `- \`${item.name}\` — línea ${item.line}\n`;
report += '\n## IDs\n\n' + ids.map(x => `- \`${x}\``).join('\n') + '\n';
report += '\n## Handlers\n\n' + handlers.map(x => `- \`${x}\``).join('\n') + '\n';
report += '\n## Código exacto de candidatas\n\n';
for (const item of results.filter(x => !x.writes)) {
  report += `### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\`\n\n`;
}
report += '\n## Código exacto de funciones excluidas\n\n';
for (const item of results.filter(x => x.writes)) {
  report += `### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\`\n\n`;
}

fs.writeFileSync('MODULARIZACION_FASE6A_INVENTARIO.md', report, 'utf8');
console.log(`Agenda inventariada: ${results.length} funciones; ${results.filter(x => x.writes).length} excluidas por escritura.`);
