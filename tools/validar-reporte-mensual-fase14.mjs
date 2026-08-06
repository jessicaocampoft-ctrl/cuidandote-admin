import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase13-index.html';
const indexPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/monthly-report.js';
const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const moduleSource = fs.readFileSync(modulePath, 'utf8');
const names = ['abrirReporteMes','cerrarReporteMes','_secTitle','_rFila','_semCell','_buildReporteMes'];

function assert(condition, message) { if (!condition) throw new Error(message); }

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = source.indexOf('{', start);
  assert(brace >= 0, `${name}: no se encontró el cuerpo.`);
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = brace; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
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
      if (depth === 0) return source.slice(start, i + 1).trimEnd();
    }
  }
  throw new Error(`${name}: cuerpo sin cierre.`);
}

for (const name of names) {
  const original = extractNamedFunction(base, name);
  assert(moduleSource.includes(original), `${name}: el cuerpo trasladado no conserva paridad exacta con Fase 13.`);
  const adapter = extractNamedFunction(index, name);
  assert(adapter.includes('window.PanelMonthlyReport'), `${name}: el adaptador no usa PanelMonthlyReport.`);
  assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega en el método correcto.`);
  assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
}

assert(index.includes('<script src="js/modules/monthly-report.js"></script>'), 'Falta la carga de monthly-report.js.');
assert((index.match(/script src="js\/modules\/monthly-report\.js"/g) || []).length === 1, 'monthly-report.js debe cargarse una sola vez.');
assert(moduleSource.includes('global.PanelMonthlyReport = Object.freeze'), 'Falta la API pública PanelMonthlyReport.');
assert(!moduleSource.includes('fetch('), 'El módulo no debe introducir fetch.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'El módulo no debe depender directamente de Apps Script.');
assert(!moduleSource.includes('action='), 'El módulo no debe introducir acciones de servidor.');
for (const shared of ['copiarReporteMes','imprimirReporteMes','copiarBriefClaude']) {
  assert(new RegExp(`function\\s+${shared}\\s*\\(`).test(index), `${shared} debe permanecer en index.html.`);
  assert(!new RegExp(`function\\s+${shared}\\s*\\(`).test(moduleSource), `${shared} no debe trasladarse en esta fase.`);
}

const context = { window:null, globalThis:null, console };
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });
const api = context.PanelMonthlyReport;
assert(api && Object.isFrozen(api), 'PanelMonthlyReport no está disponible o no está congelado.');
for (const name of names) assert(typeof api[name] === 'function', `Falta ${name} en la API pública.`);
const title = api._secTitle('📊', 'Resumen');
const row = api._rFila('Ventas', '$1.000');
const cell = api._semCell(90, 100, true);
assert(typeof title === 'string' && title.includes('Resumen'), '_secTitle no conserva salida útil.');
assert(typeof row === 'string' && row.includes('Ventas') && row.includes('$1.000'), '_rFila no conserva salida útil.');
assert(cell && cell.dot === '🟡' && cell.txt === 'Cerca', '_semCell no conserva la clasificación esperada.');

console.log('FASE 14 VALIDADA: reporte mensual separado con paridad exacta, API compatible y sin nuevas llamadas al servidor.');
