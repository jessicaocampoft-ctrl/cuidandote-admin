import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase15-index.html';
const indexPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/income-analysis.js';
const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'setModoIngresos',
  '_ingFmt',
  '_ingFmtLabel',
  '_ingFmtMes',
  'renderCitasResumen',
  'renderIngresosDetalle',
  '_analisisSemana',
  '_analisisMes',
  '_renderAnalisis',
];

function assert(condition, message) { if (!condition) throw new Error(message); }

function findBodyBrace(text, start) {
  const openParen = text.indexOf('(', start);
  if (openParen < 0) return -1;
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = openParen; i < text.length; i++) {
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
    if (ch === '(') depth++;
    if (ch === ')') {
      depth--;
      if (depth === 0) return text.indexOf('{', i + 1);
    }
  }
  return -1;
}

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = findBodyBrace(source, start);
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
  assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 15.`);
  const adapter = extractNamedFunction(index, name);
  assert(adapter.includes('window.PanelIncomeAnalysis'), `${name}: el adaptador no usa PanelIncomeAnalysis.`);
  assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
  assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
}

assert(index.includes('<script src="js/modules/income-analysis.js"></script>'), 'Falta cargar income-analysis.js.');
assert((index.match(/script src="js\/modules\/income-analysis\.js"/g) || []).length === 1, 'income-analysis.js debe cargarse una sola vez.');
assert(moduleSource.includes('global.PanelIncomeAnalysis = Object.freeze'), 'Falta la API pública congelada PanelIncomeAnalysis.');
assert(/let\s+_modoIngresos\s*=\s*['"]dia['"]\s*;/.test(index), '_modoIngresos debe permanecer compartida en index.html.');
assert(!/let\s+_modoIngresos\s*=/.test(moduleSource), '_modoIngresos no debe duplicarse dentro del módulo.');
assert(/function\s+_checkAlertaSemanFloja\s*\(/.test(index), 'La alerta de semana floja debe permanecer fuera de esta fase.');
assert(!/function\s+_checkAlertaSemanFloja\s*\(/.test(moduleSource), 'La alerta de semana floja no pertenece a este módulo.');
assert(!moduleSource.includes('fetch('), 'El módulo no debe introducir fetch.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'El módulo no debe depender directamente de Apps Script.');
assert(!moduleSource.includes('action='), 'El módulo no debe introducir acciones de servidor.');

for (const token of ['MODO DÍA','MODO SEMANA','MODO MES','Análisis financiero semanal','Análisis financiero mensual']) {
  assert(moduleSource.includes(token), `Falta el bloque funcional: ${token}.`);
}

const context = { window:null, globalThis:null, console };
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });
const api = context.PanelIncomeAnalysis;
assert(api && Object.isFrozen(api), 'PanelIncomeAnalysis no está disponible o no está congelado.');
for (const name of names) assert(typeof api[name] === 'function', `Falta ${name} en la API pública.`);
const html = api._renderAnalisis('Prueba', ['Bien'], ['Alerta'], ['Recomendación']);
assert(typeof html === 'string' && html.includes('Prueba') && html.includes('Bien') && html.includes('Alerta') && html.includes('Recomendación'), '_renderAnalisis no conserva una salida útil.');
const vacio = api._renderAnalisis('Vacío', [], [], []);
assert(vacio === '', '_renderAnalisis debe conservar la salida vacía cuando no hay hallazgos.');
const etiqueta = api._ingFmtLabel(new Date('2026-08-06T12:00:00'));
assert(typeof etiqueta === 'string' && etiqueta.length > 0, '_ingFmtLabel no conserva una salida útil.');

console.log('FASE 16 VALIDADA: Ingresos y análisis financiero separados con paridad exacta, API compatible y sin nuevas llamadas al servidor.');
