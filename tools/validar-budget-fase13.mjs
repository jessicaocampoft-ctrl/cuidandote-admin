import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase12-index.html';
const currentPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/budget.js';
const base = fs.readFileSync(basePath, 'utf8').replace(/^\uFEFF/, '');
const current = fs.readFileSync(currentPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'getCostosEstructura','saveCostosEstructura','calcTotalCostos',
  'renderPresupuestoMetas','pmRecalc','pmGuardarCostos','pmGuardarKPIs',
  'getMeta','actualizarMetaBarra','guardarMeta','guardarMetaFin','previewMetaFin','reloadMetas',
  '_toggleEditCostos','_leerCamposCostos','_guardarCostos'
];

function assert(condition, message) { if (!condition) throw new Error(message); }

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const re = new RegExp(`(?:async\\s+)?function\\s+${safe}\\s*\\(`, 'g');
  const matches = [...source.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index;
  const open = source.indexOf('{', start);
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
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
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

function extractObjectConstant(source, name) {
  const start = source.indexOf(`const ${name} =`);
  assert(start >= 0, `No se encontró ${name} en la base.`);
  const open = source.indexOf('{', start);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const semi = source.indexOf(';', i);
        return source.slice(start, semi + 1);
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

assert(current.includes('<script src="js/modules/budget.js"></script>'), 'index.html no carga budget.js.');
assert((current.match(/script src="js\/modules\/budget\.js"/g) || []).length === 1, 'budget.js debe cargarse una sola vez.');
assert(current.indexOf('js/modules/kpi.js') < current.indexOf('js/modules/budget.js'), 'budget.js debe cargar después de kpi.js.');
assert(moduleSource.includes('global.PanelBudget = Object.freeze'), 'PanelBudget no fue exportado.');
assert(!/\bfetch\s*\(/.test(moduleSource), 'Metas y Presupuesto no debe introducir fetch.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'Metas y Presupuesto no debe usar APPS_SCRIPT_URL.');
assert(!moduleSource.includes('action='), 'Metas y Presupuesto no debe crear acciones de servidor.');

for (const name of names) {
  const original = extractNamedFunction(base, name);
  assert(moduleSource.includes(original), `${name} no conserva el cuerpo exacto de la Fase 12.`);
  const adapter = new RegExp(`function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(current), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada por PanelBudget.`);
}
const originalDefaults = extractObjectConstant(base, 'COSTOS_DEFAULTS');
assert(moduleSource.includes(originalDefaults), 'COSTOS_DEFAULTS no conserva su declaración exacta.');
assert(!current.includes('const COSTOS_DEFAULTS ='), 'COSTOS_DEFAULTS no debe seguir declarada en index.html.');

new vm.Script(moduleSource, { filename: modulePath });

function makeElement(id) {
  return {
    id, value:'', textContent:'', innerHTML:'', disabled:false, checked:false,
    style:{display:'none',width:''}, dataset:{},
    addEventListener(){}, focus(){},
    querySelector(){ return null; }, querySelectorAll(){ return []; }
  };
}
const elements = new Map();
const document = {
  getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); },
  querySelectorAll() { return []; },
  createElement(tag) { return makeElement(tag); }
};
const store = new Map();
const toasts = [];
let kpiConfig = {
  meta_sesiones_semana: 20,
  meta_ventas_mes: 10265000,
  meta_nps: 9,
  meta_retencion_pct: 60,
  meta_cancelacion_pct: 10,
  meta_encuestas: 12,
  meta_cac_max: 30000
};
const context = {
  console, window:null, globalThis:null, document,
  JSON, Math, Number, String, Object, Array, Date, parseInt, parseFloat,
  META_SESIONES_SEMANA:0, META_VENTAS_MES:0, META_VENTAS_SEMANA:0,
  META_NPS:0, META_RETENCION_PCT:0, META_CANCELACION_PCT:0, META_ENCUESTAS:0, META_CAC_MAX:0,
  kvGet:key => store.has(key) ? store.get(key) : null,
  kvSet:(key,value) => store.set(key, String(value)),
  getKPIConfig:() => ({...kpiConfig}),
  applyKPIRefSpans(){}, renderKPITablero(){}, renderKPIGuia(){}, renderFinanzas(){},
  calcCobradoMes:() => 5000000,
  fmtPeso:value => '$' + Number(value || 0).toLocaleString('es-CO'),
  toast:(message,tone) => toasts.push({message,tone}),
  confirm:() => true,
  allData:{citas:[],eventos:[]}
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename: modulePath });

assert(context.PanelBudget, 'PanelBudget no quedó disponible.');
for (const name of names) assert(typeof context.PanelBudget[name] === 'function', `PanelBudget.${name} no es función.`);

// Valores por defecto, persistencia y recuperación ante JSON inválido.
let costs = context.PanelBudget.getCostosEstructura();
assert(costs && costs.honorarios_fisio > 0 && costs.pct_utilidad > 0, 'No recuperó los costos por defecto.');
context.PanelBudget.saveCostosEstructura({...costs, arriendo:777000});
assert(JSON.parse(store.get('costosEstructura')).arriendo === 777000, 'No persistió la estructura de costos.');
store.set('costosEstructura', '{invalido');
costs = context.PanelBudget.getCostosEstructura();
assert(costs.honorarios_fisio > 0, 'No se recuperó ante JSON inválido.');

// Migraciones históricas.
store.set('costosEstructura', JSON.stringify({asesorias_ap:790000, redes_contenido:150000}));
costs = context.PanelBudget.getCostosEstructura();
assert(costs.asesorias_ap === 480000, 'No migró asesorías históricas.');
assert(costs.redes_contenido === 240000, 'No migró contenido histórico.');

// Cálculo de presupuesto.
const calc = context.PanelBudget.calcTotalCostos({...costs, pct_imprevistos:5, pct_utilidad:20});
assert(calc && Number.isFinite(calc.subtotal) && Number.isFinite(calc.total), 'calcTotalCostos no devolvió valores numéricos.');
assert(calc.total >= calc.subtotal, 'El total calculado no puede ser menor al subtotal.');

// Meta y migración de valores antiguos.
store.set('metaMensual', '8000000');
assert(context.PanelBudget.getMeta() === kpiConfig.meta_ventas_mes, 'getMeta no usa la configuración KPI vigente.');
assert(store.get('metaMensual') === '10265000', 'getMeta no migró la meta histórica.');

document.getElementById('metaInput').value = '50000';
const beforeInvalid = toasts.length;
context.PanelBudget.guardarMeta();
assert(toasts.length > beforeInvalid && toasts.at(-1).tone === 'err', 'Meta inválida no produjo error visible.');

document.getElementById('metaInput').value = '12000000';
context.PanelBudget.guardarMeta();
assert(store.get('metaMensual') === '12000000', 'guardarMeta no persistió la meta válida.');
assert(context.META_VENTAS_MES === 12000000 && context.META_VENTAS_SEMANA === 3000000, 'guardarMeta no actualizó variables compartidas.');

// Barra de meta.
document.getElementById('metaBarFill').style.width = '';
context.PanelBudget.actualizarMetaBarra(6000000);
assert(document.getElementById('metaBarFill').style.width, 'actualizarMetaBarra no actualizó el progreso.');

// Recarga de metas desde KPI.
kpiConfig = {...kpiConfig, meta_ventas_mes:14000000, meta_sesiones_semana:25, meta_nps:10};
context.PanelBudget.reloadMetas();
assert(context.META_VENTAS_MES === 14000000 && context.META_SESIONES_SEMANA === 25 && context.META_NPS === 10, 'reloadMetas no sincronizó las metas.');

// Apertura/cierre del editor de costos.
document.getElementById('costosEditorPanel').style.display = 'none';
document.getElementById('costosVistaCompacta').style.display = 'block';
context.PanelBudget._toggleEditCostos();
assert(document.getElementById('costosEditorPanel').style.display === 'block', 'No abrió el editor de costos.');
context.PanelBudget._toggleEditCostos();
assert(document.getElementById('costosEditorPanel').style.display === 'none', 'No cerró el editor de costos.');

console.log('FASE 13 VALIDADA: paridad exacta, costos, migraciones, cálculos, metas y editor preservados.');
