import fs from 'node:fs';

const htmlPath = process.argv[2] || 'index.html';
const reportPath = process.argv[3] || 'MODULARIZACION_FASE9_INVENTARIO_RESULTADO.md';
let html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
}

// Para este inventario solo se necesitan dependencias y nombres. Se delimita cada
// función por la siguiente declaración de nivel superior para tolerar plantillas
// literales anidadas como las usadas por updateBonosBadge.
function extractNamedFunction(source, name) {
  const escaped = name.replace(/[$]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g');
  const matches = [...source.matchAll(regex)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const nextRegex = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  nextRegex.lastIndex = start + 1;
  const next = nextRegex.exec(source);
  const end = next ? next.index + 1 : source.length;
  const text = source.slice(start, end).trimEnd();
  return {name, text, async:/^async\s+function/.test(text)};
}

const sectionStart = html.indexOf('<section id="vCodigos"');
const sectionEnd = html.indexOf('</section>', sectionStart);
if (sectionStart < 0 || sectionEnd < 0) throw new Error('No se pudo delimitar la vista vCodigos.');
const ui = html.slice(sectionStart, sectionEnd + '</section>'.length);

const declarations = unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]));
const declarationSet = new Set(declarations);
const blocks = new Map(declarations.map(name => [name, extractNamedFunction(html, name)]));
const uiHandlers = unique([...ui.matchAll(/\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]))
  .filter(name => declarationSet.has(name));

const shared = new Set([
  'showView','openModal','closeModal','toast','esc','fmtDate','today','initDashboard',
  'formatCOP','rgba','chipColor','kvGet','kvSet','kvRemove','logChange','renderChangeLog',
  'toggleChangeLog','clearChangeLog','agendarDesdePacienteRec','usarSesion','reload','loadTeamData'
]);
const forbidden = new Set([
  'renderCalendar','submitAdminBooking','guardarEdicion','saveManualPayment','renderPagos',
  'passportSaveProgress','renderPassport','renderEquipo','renderFinanzas','renderKPITablero',
  'renderBasedatos','renderReactivacion','reload','loadTeamData'
]);

const seeds = unique([...uiHandlers.filter(name => declarationSet.has(name)), 'renderCodigos']);
const selected = new Set();
const queue = [...seeds];
while (queue.length) {
  const name = queue.shift();
  if (selected.has(name) || shared.has(name)) continue;
  if (!declarationSet.has(name)) throw new Error(`La función semilla ${name} no existe.`);
  selected.add(name);
  const text = blocks.get(name).text;
  const calls = unique([...text.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]));
  for (const called of calls) {
    if (declarationSet.has(called) && !selected.has(called) && !shared.has(called)) queue.push(called);
  }
}

const selectedNames = [...selected].sort((a, b) => a.localeCompare(b, 'es'));
if (selectedNames.length < 3 || selectedNames.length > 35) throw new Error(`Inventario inseguro: ${selectedNames.length} funciones.`);
const crossed = selectedNames.filter(name => forbidden.has(name));
if (crossed.length) throw new Error(`Se incluyeron funciones de otros módulos: ${crossed.join(', ')}.`);

const selectedSource = selectedNames.map(name => blocks.get(name).text).join('\n\n');
const constants = ['BONO_VALOR','BONO_MAX_MES','_MES_EN'].filter(name => new RegExp(`\\b${name}\\b`).test(selectedSource));
const stateNames = unique([...html.matchAll(/(?:^|\n)(?:let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)]
  .map(m => m[1])
  .filter(name => new RegExp(`\\b${name}\\b`).test(selectedSource))
  .filter(name => /^_(?:cod|bono|ref)/i.test(name)));
const actions = unique([
  ...[...selectedSource.matchAll(/\baction\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]),
  ...[...selectedSource.matchAll(/[?&]action=([A-Za-z0-9_-]+)/g)].map(m => m[1])
]);
const domIds = unique([
  ...[...selectedSource.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]),
  ...[...ui.matchAll(/\bid\s*=\s*['"]([^'"]+)['"]/g)].map(m => m[1])
]);
const asyncNames = selectedNames.filter(name => blocks.get(name).async);
const outsideCalls = unique([...selectedSource.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]))
  .filter(name => !selected.has(name) && declarationSet.has(name));

const lines = [];
lines.push('# Inventario de modularización — Fase 9 Códigos REF y bono', '');
lines.push('- Vista delimitada: `vCodigos`.');
lines.push(`- Funciones propias seleccionadas: **${selectedNames.length}**.`);
lines.push(`- Funciones asíncronas: **${asyncNames.length}**.`);
lines.push(`- Constantes propias detectadas: **${constants.length}**.`);
lines.push(`- Estados propios detectados: **${stateNames.length}**.`);
lines.push(`- Acciones API detectadas: **${actions.length}**.`);
lines.push(`- IDs relacionados: **${domIds.length}**.`);
lines.push('- Agenda y las Fases 1 a 8 permanecen fuera del alcance.');
lines.push('- `reload` y `loadTeamData` permanecen compartidas y fuera del módulo.');
lines.push('');
lines.push('## Funciones propias seleccionadas');
for (const name of selectedNames) lines.push(`- \`${name}\`${blocks.get(name).async ? ' — async' : ''}`);
lines.push('');
lines.push('## Manejadores declarados en la vista');
for (const name of uiHandlers) lines.push(`- \`${name}\`${shared.has(name) ? ' — compartido, no se mueve' : ''}`);
lines.push('');
lines.push('## Constantes propias');
for (const name of constants) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Estados propios');
if (stateNames.length) for (const name of stateNames) lines.push(`- \`${name}\``);
else lines.push('- No se detectaron estados mutables propios.');
lines.push('');
lines.push('## Acciones API');
if (actions.length) for (const action of actions) lines.push(`- \`${action}\``);
else lines.push('- No se detectaron acciones API literales.');
lines.push('');
lines.push('## Funciones compartidas llamadas desde el módulo');
if (outsideCalls.length) for (const name of outsideCalls) lines.push(`- \`${name}\``);
else lines.push('- No se detectaron llamadas a funciones declaradas fuera del módulo.');
lines.push('');
lines.push('## Controles para una posible implementación');
lines.push('- Crear un módulo separado solo después de confirmar este inventario.');
lines.push('- Mantener los mismos nombres mediante adaptadores compatibles.');
lines.push('- No mover Agenda, Base de datos, Pagos, Pasaporte, Equipo clínico ni navegación compartida.');
lines.push('- No modificar `main`, Apps Script ni el panel publicado.');
lines.push('');

fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`Inventario Fase 9 generado: ${selectedNames.length} funciones, ${constants.length} constantes y ${actions.length} acciones.`);
