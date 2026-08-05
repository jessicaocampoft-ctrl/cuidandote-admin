import fs from 'node:fs';

const htmlPath = process.argv[2] || 'index.html';
const reportPath = process.argv[3] || 'MODULARIZACION_FASE8_INVENTARIO_RESULTADO.md';
let html = fs.readFileSync(htmlPath, 'utf8');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1);

const uiStartMarker = '<!-- ── BASE DE DATOS ── -->';
const uiEndMarker = '<!-- ── CÓDIGOS REF & BONO ── -->';
const jsStartMarker = '// ── BASE DE DATOS ──';
const jsEndMarker = '// CÓDIGOS REF & BONO';

function between(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0 || end <= start) {
    throw new Error(`No se pudo delimitar ${label}.`);
  }
  return {
    start,
    end,
    text: source.slice(start, end)
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
}

function matchAllValues(source, regex, group = 1) {
  return [...source.matchAll(regex)].map(match => match[group]);
}

const ui = between(html, uiStartMarker, uiEndMarker, 'la interfaz de Base de datos');
const js = between(html, jsStartMarker, jsEndMarker, 'la lógica de Base de datos');

const functions = unique(matchAllValues(js.text, /(?:^|\n)\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g));
const asyncFunctions = unique(matchAllValues(js.text, /(?:^|\n)\s*async\s+function\s+([A-Za-z_$][\w$]*)\s*\(/g));
const states = unique(matchAllValues(js.text, /(?:^|\n)\s*(?:let|const|var)\s+([A-Za-z_$][\w$]*)/g));
const actions = unique([
  ...matchAllValues(js.text, /\baction\s*:\s*['"]([^'"]+)['"]/g),
  ...matchAllValues(js.text, /[?&]action=([A-Za-z0-9_-]+)/g)
]);
const domIds = unique([
  ...matchAllValues(js.text, /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g),
  ...matchAllValues(ui.text, /\bid\s*=\s*['"]([^'"]+)['"]/g)
]);
const inlineHandlers = unique(matchAllValues(ui.text, /\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g));

const knownSharedCandidates = [
  'allData','TOKEN','SCRIPT_URL','fetchJsonWithTimeout','toast','esc','today','fmtDate',
  'showView','initDashboard','closeModal','openModal','formatCOP','normalizePhone',
  'navigator','document','window','URLSearchParams','fetch','confirm','encodeURIComponent'
];
const sharedDependencies = knownSharedCandidates.filter(name => new RegExp(`\\b${name}\\b`).test(js.text));

const referencesOutside = functions
  .map(name => {
    const outside = html.slice(0, js.start) + html.slice(js.end);
    const count = (outside.match(new RegExp(`\\b${name.replace(/[$]/g, '\\$&')}\\b`, 'g')) || []).length;
    return { name, count };
  })
  .filter(item => item.count > 0)
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

const requiredCoreFunctions = [
  'initFormDB','renderBasedatos','renderReactivacion','dbEditarPac','dbBorrarPac',
  'dbOnOrigenChange','dbReferidoFilter'
];
for (const name of requiredCoreFunctions) {
  if (!functions.includes(name)) throw new Error(`Falta la función esperada ${name}.`);
}

if (!ui.text.includes('id="vBasedatos"')) throw new Error('No se encontró la vista vBasedatos.');
if (!js.text.includes('let _dbPacs')) throw new Error('No se encontró el estado _dbPacs.');
if (functions.length < 7) throw new Error(`Inventario incompleto: solo se detectaron ${functions.length} funciones.`);

const lines = [];
lines.push('# Inventario de modularización — Fase 8 Base de datos', '');
lines.push(`- Vista delimitada: \`vBasedatos\`.`);
lines.push(`- Funciones detectadas: **${functions.length}**.`);
lines.push(`- Funciones asíncronas: **${asyncFunctions.length}**.`);
lines.push(`- Estados o constantes locales detectados: **${states.length}**.`);
lines.push(`- Acciones API detectadas: **${actions.length}**.`);
lines.push(`- IDs de interfaz detectados: **${domIds.length}**.`);
lines.push('- La sección Códigos REF & BONO quedó fuera del alcance de esta fase.');
lines.push('');
lines.push('## Funciones');
for (const name of functions) lines.push(`- \`${name}\`${asyncFunctions.includes(name) ? ' — async' : ''}`);
lines.push('');
lines.push('## Estado local');
for (const name of states) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Acciones API');
if (actions.length) for (const action of actions) lines.push(`- \`${action}\``);
else lines.push('- No se detectaron acciones API literales.');
lines.push('');
lines.push('## Dependencias compartidas visibles');
for (const name of sharedDependencies) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Funciones usadas fuera del bloque');
if (referencesOutside.length) {
  for (const item of referencesOutside) lines.push(`- \`${item.name}\`: ${item.count} referencia(s) externa(s); requiere adaptador compatible.`);
} else {
  lines.push('- No se detectaron referencias externas.');
}
lines.push('');
lines.push('## Manejadores declarados en la interfaz');
for (const name of inlineHandlers) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Regla de aislamiento');
lines.push('- El inventario no modifica `index.html`, los módulos JavaScript ni `main`.');
lines.push('- Agenda, creación y edición de citas, Pagos, Pasaporte, Sesión y Equipo clínico deben permanecer sin cambios durante la implementación.');
lines.push('');

fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`Inventario Fase 8 generado: ${functions.length} funciones, ${states.length} estados, ${actions.length} acciones API.`);
