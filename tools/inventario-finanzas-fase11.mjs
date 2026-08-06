import fs from 'node:fs';

const htmlPath = process.argv[2] || 'index.html';
const reportPath = process.argv[3] || 'MODULARIZACION_FASE11_INVENTARIO_RESULTADO.md';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
}

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
  return {name, text, async: /^async\s+function/.test(text)};
}

const sectionStart = html.indexOf('<section id="vFinanzas"');
const sectionEnd = html.indexOf('</section>', sectionStart);
if (sectionStart < 0 || sectionEnd < 0) throw new Error('No se pudo delimitar la vista vFinanzas.');
const ui = html.slice(sectionStart, sectionEnd + '</section>'.length);

const declarations = unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]));
const declarationSet = new Set(declarations);
const blocks = new Map(declarations.map(name => [name, extractNamedFunction(html, name)]));
const uiHandlers = unique([...ui.matchAll(/\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]))
  .filter(name => declarationSet.has(name));

const shared = new Set([
  'showView','openModal','closeModal','toast','esc','fmtDate','today','initDashboard',
  'formatCOP','rgba','chipColor','kvGet','kvSet','kvRemove','logChange','renderChangeLog',
  'toggleChangeLog','clearChangeLog','parsePrecio','reload','loadTeamData'
]);

const forbidden = new Set([
  'renderCalendar','submitAdminBooking','guardarEdicion','renderAgenda','renderControlDiario',
  'saveManualPayment','renderPagos','verifyPayment','approvePayment',
  'passportSaveProgress','renderPassport','renderPasaportes',
  'renderEquipo','renderBasedatos','renderReactivacion','renderCodigos','usarSesion','renderPaquetes',
  'renderKPITablero','renderPresupuesto','renderMetas','renderComisiones','renderRecordatorios',
  'renderSeguimiento','renderMensajes','renderEmpresas','renderListaEspera'
]);

const seeds = unique([...uiHandlers, 'renderFinanzas'].filter(name => declarationSet.has(name)));
if (!seeds.includes('renderFinanzas')) throw new Error('No existe renderFinanzas en el panel.');

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
if (selectedNames.length < 3 || selectedNames.length > 60) throw new Error(`Inventario inseguro: ${selectedNames.length} funciones.`);
const crossed = selectedNames.filter(name => forbidden.has(name));
if (crossed.length) throw new Error(`Se incluyeron funciones de otros módulos: ${crossed.join(', ')}.`);

const selectedSource = selectedNames.map(name => blocks.get(name).text).join('\n\n');
const constants = unique([...html.matchAll(/(?:^|\n)const\s+([A-Za-z_$][\w$]*)\s*=/g)].map(m => m[1])
  .filter(name => new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`).test(selectedSource))
  .filter(name => /(?:fin|ingreso|gasto|categoria|mes|movimiento)/i.test(name)));
const stateNames = unique([...html.matchAll(/(?:^|\n)(?:let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)].map(m => m[1])
  .filter(name => new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`).test(selectedSource))
  .filter(name => /(?:fin|ingreso|gasto|categoria|mes|movimiento)/i.test(name)));
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
lines.push('# Inventario de modularización — Fase 11 Finanzas', '');
lines.push('- Vista delimitada: `vFinanzas`.');
lines.push(`- Funciones propias seleccionadas: **${selectedNames.length}**.`);
lines.push(`- Funciones asíncronas: **${asyncNames.length}**.`);
lines.push(`- Estados propios detectados: **${stateNames.length}**.`);
lines.push(`- Constantes propias detectadas: **${constants.length}**.`);
lines.push(`- Acciones API detectadas: **${actions.length}**.`);
lines.push(`- IDs relacionados: **${domIds.length}**.`);
lines.push('- Pagos operativos, Comisiones, Presupuesto, Metas, Indicadores y las Fases 1 a 10 permanecen fuera del alcance.');
lines.push('');
lines.push('## Funciones propias seleccionadas');
for (const name of selectedNames) lines.push(`- \`${name}\`${blocks.get(name).async ? ' — async' : ''}`);
lines.push('', '## Manejadores declarados en la vista');
for (const name of uiHandlers) lines.push(`- \`${name}\`${shared.has(name) ? ' — compartido, no se mueve' : ''}`);
lines.push('', '## Estados propios');
if (stateNames.length) for (const name of stateNames) lines.push(`- \`${name}\``); else lines.push('- No se detectaron estados mutables propios.');
lines.push('', '## Constantes propias');
if (constants.length) for (const name of constants) lines.push(`- \`${name}\``); else lines.push('- No se detectaron constantes propias.');
lines.push('', '## Acciones API');
if (actions.length) for (const action of actions) lines.push(`- \`${action}\``); else lines.push('- No se detectaron acciones API literales.');
lines.push('', '## Funciones compartidas llamadas desde el módulo');
if (outsideCalls.length) for (const name of outsideCalls) lines.push(`- \`${name}\``); else lines.push('- No se detectaron llamadas a funciones declaradas fuera del módulo.');
lines.push('', '## IDs relacionados');
for (const id of domIds) lines.push(`- \`${id}\``);
lines.push('', '## Controles');
lines.push('- Mantener los mismos nombres mediante adaptadores compatibles.');
lines.push('- No mover Pagos, Comisiones, Presupuesto, Metas, Indicadores ni funciones de otras vistas.');
lines.push('- No modificar `main`, Apps Script ni el panel publicado.');
lines.push('');

fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`Inventario Fase 11 generado: ${selectedNames.length} funciones, ${stateNames.length} estados, ${constants.length} constantes y ${actions.length} acciones.`);
