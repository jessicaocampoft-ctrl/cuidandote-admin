import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase14-index.html';
const indexPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/smart-metrics.js';
const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

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

const original = extractNamedFunction(base, 'renderMetricas');
assert(moduleSource.includes(original), 'renderMetricas no conserva paridad exacta con la Fase 14.');
const adapter = extractNamedFunction(index, 'renderMetricas');
assert(adapter.includes('window.PanelSmartMetrics'), 'El adaptador no usa PanelSmartMetrics.');
assert(adapter.includes('module.renderMetricas'), 'El adaptador no delega en renderMetricas.');
assert(!index.includes(original), 'La implementación original todavía permanece en index.html.');

const tag = '<script src="js/modules/smart-metrics.js"></script>';
assert(index.includes(tag), 'Falta la carga de smart-metrics.js.');
assert((index.match(/script src="js\/modules\/smart-metrics\.js"/g) || []).length === 1, 'smart-metrics.js debe cargarse una sola vez.');
assert(moduleSource.includes('global.PanelSmartMetrics = Object.freeze'), 'Falta la API pública congelada PanelSmartMetrics.');
assert(!moduleSource.includes('fetch('), 'El módulo no debe introducir fetch.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'El módulo no debe depender directamente de Apps Script.');
assert(!moduleSource.includes('action='), 'El módulo no debe introducir acciones de servidor.');

for (const marker of ['metricHorarios','metricPagos','metricPacientes']) {
  assert(original.includes(marker), `Falta el bloque esperado ${marker} en la función original.`);
  assert(moduleSource.includes(marker), `Falta el bloque esperado ${marker} en el módulo.`);
}
assert(original.split('\n').length >= 350, 'renderMetricas parece incompleta: se esperaban al menos 350 líneas.');

const context = { window:null, globalThis:null, console };
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });
assert(context.PanelSmartMetrics, 'PanelSmartMetrics no está disponible.');
assert(Object.isFrozen(context.PanelSmartMetrics), 'PanelSmartMetrics debe estar congelado.');
assert(typeof context.PanelSmartMetrics.renderMetricas === 'function', 'La API no expone renderMetricas.');

console.log('FASE 15 VALIDADA: Métricas inteligentes conserva paridad exacta, API compatible y aislamiento del servidor.');
