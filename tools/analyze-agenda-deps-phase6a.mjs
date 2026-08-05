import fs from 'node:fs';

const source = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const roots = [
  'goAgendaPatient','filtrarDia','smartAgendaFilter','renderAgenda','clearFilters','filtrarHoy',
  'getMonday','calPrev','calNext','calToday','renderCalendar'
];

function extract(start) {
  const open = source.indexOf('{', start);
  if (open < 0) return null;
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
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

const defs = new Map();
for (const match of source.matchAll(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
  const block = extract(match.index);
  if (block) defs.set(match[1], block);
}

const reserved = new Set(['if','for','while','switch','catch','function','return','typeof','new','setTimeout','clearTimeout','setInterval','clearInterval','encodeURIComponent','decodeURIComponent','parseInt','parseFloat','Number','String','Boolean','Date','Array','Object','Math','JSON','Promise']);
function calls(text) {
  const set = new Set();
  for (const m of text.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) {
    const name = m[1];
    if (!reserved.has(name) && defs.has(name)) set.add(name);
  }
  return [...set].sort();
}

const closure = new Set();
const queue = [...roots];
while (queue.length) {
  const name = queue.shift();
  if (closure.has(name)) continue;
  if (!defs.has(name)) throw new Error(`No existe ${name}().`);
  closure.add(name);
  for (const dep of calls(defs.get(name))) {
    if (!closure.has(dep)) queue.push(dep);
  }
}

const writeMarkers = [
  'action=save', 'action=update', 'action=create', 'action=delete', 'action=change', 'action=reprogram',
  "method: 'POST'", 'method:"POST"', 'guardar', 'eliminar', 'confirmarPago', 'changeStatus',
  'cancelarCita', 'editarCita', 'submitAdminBooking', 'marcarTodasAtendidas'
];

let report = '# Dependencias de Agenda — Fase 6A\n\n';
report += `- Raíces: ${roots.length}\n- Cierre total: ${closure.size}\n\n`;
for (const name of [...closure].sort()) {
  const text = defs.get(name);
  const deps = calls(text).filter(x => closure.has(x));
  const suspicious = writeMarkers.filter(x => text.includes(x));
  report += `## ${name}\n\n`;
  report += `- Dependencias internas: ${deps.length ? deps.map(x => `\`${x}\``).join(', ') : 'ninguna'}\n`;
  report += `- Marcadores de escritura: ${suspicious.length ? suspicious.map(x => `\`${x}\``).join(', ') : 'ninguno'}\n\n`;
}
report += '## Funciones del cierre\n\n' + [...closure].sort().map(x => `- \`${x}\``).join('\n') + '\n';
fs.writeFileSync('MODULARIZACION_FASE6A_DEPENDENCIAS.md', report, 'utf8');
console.log(`Dependencias calculadas: ${closure.size} funciones.`);
