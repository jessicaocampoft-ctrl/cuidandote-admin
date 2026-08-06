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
  'getMeta','actualizarMetaBarra','previewMeta','guardarMeta','guardarMetaFin','previewMetaFin','reloadMetas',
  '_toggleEditCostos','_leerCamposCostos','_recalcCostos','_guardarCostos'
];
const sharedGlobals = [
  'META_SESIONES_SEMANA','META_VENTAS_MES','META_VENTAS_SEMANA','META_NPS',
  'META_RETENCION_PCT','META_CANCELACION_PCT','META_ENCUESTAS','META_CAC_MAX'
];
function assert(condition, message) { if (!condition) throw new Error(message); }

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const firstLineEnd = source.indexOf('\n', start);
  const firstLine = source.slice(start, firstLineEnd < 0 ? source.length : firstLineEnd);
  const opens = (firstLine.match(/{/g) || []).length;
  const closes = (firstLine.match(/}/g) || []).length;
  if (opens > 0 && opens === closes) return firstLine.trimEnd();
  const closeRegex = /^}\s*$/gm;
  closeRegex.lastIndex = firstLineEnd < 0 ? start : firstLineEnd + 1;
  const close = closeRegex.exec(source);
  if (!close) throw new Error(`No se pudo cerrar ${name}.`);
  return source.slice(start, close.index + close[0].length).trimEnd();
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
    if (ch === '"' || ch === "'") { quote = ch; continue; }
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
assert(current.indexOf('<script src="js/modules/kpi.js"></script>') < current.indexOf('<script src="js/modules/budget.js"></script>'), 'budget.js debe cargar después de kpi.js.');
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
for (const shared of sharedGlobals) {
  assert(new RegExp(`(?:const|let|var)\\s+${shared}\\b`).test(current), `${shared} debe permanecer en index.html.`);
  assert(!new RegExp(`(?:const|let|var)\\s+${shared}\\b`).test(moduleSource), `${shared} no debe duplicarse en budget.js.`);
}
for (const forbidden of ['renderFinanzas','renderEstructuraFinanciera','renderKPITablero','renderKPIGuia','renderMetricas','renderComisiones','renderPagos','renderAgenda']) {
  assert(!moduleSource.includes(`function ${forbidden}(`), `${forbidden} fue incluido por error.`);
}
new vm.Script(moduleSource, { filename:modulePath });

function makeElement(id) {
  return {
    id, value:'', textContent:'', innerHTML:'', disabled:false, checked:false,
    style:{display:'none',width:'',borderColor:''}, dataset:{},
    addEventListener(){}, focus(){}, querySelector(){return null;}, querySelectorAll(){return [];},
    classList:{add(){},remove(){},toggle(){}}
  };
}
const elements = new Map();
const costInputs = [];
const document = {
  getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); },
  querySelectorAll(selector) { return selector === '#costosEditorPanel [data-costo]' ? costInputs : []; },
  createElement(tag) { return makeElement(tag); }
};
const store = new Map();
const toasts = [];
let syncPrices = 0, applyRefs = 0, financeRenders = 0;
const cfg = {
  meta_sesiones_semana:20, meta_ventas_mes:10265000, meta_leads_min:40, meta_leads_max:60,
  meta_conv_min:20, meta_conv_max:35, meta_nps:70, meta_encuestas:60,
  meta_cancelacion:10, meta_retencion:65, meta_cac_max:30000,
  inv_mkt_total:500000, inv_mkt_pauta:200000, inv_mkt_contenido:300000
};
const context = {
  console, window:null, globalThis:null, document,
  JSON, Math, Number, String, Object, Array, Date, parseInt, parseFloat,
  META_SESIONES_SEMANA:0, META_VENTAS_MES:0, META_VENTAS_SEMANA:0,
  META_NPS:0, META_RETENCION_PCT:0, META_CANCELACION_PCT:0, META_ENCUESTAS:0, META_CAC_MAX:0,
  kvGet:key => store.has(key) ? store.get(key) : null,
  kvSet:(key,value) => store.set(key, String(value)),
  getKPIConfig:() => cfg,
  applyKPIRefSpans:() => { applyRefs++; },
  _syncPreciosToAutoFill:() => { syncPrices++; },
  renderFinanzas:() => { financeRenders++; },
  calcCobradoMes:() => 5000000,
  fmtPeso:value => '$' + Number(value || 0).toLocaleString('es-CO'),
  toast:(message,tone) => toasts.push({message,tone}),
  _buildReporteMes:() => '<div>Reporte QA</div>',
  setTimeout:fn => { fn(); return 1; },
  confirm:() => true,
  allData:{citas:[],eventos:[]}
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });
const api = context.PanelBudget;
assert(api, 'PanelBudget no quedó disponible.');
for (const name of names) assert(typeof api[name] === 'function', `PanelBudget.${name} no es función.`);

// Costos por defecto, persistencia, migraciones y recuperación.
let costs = api.getCostosEstructura();
assert(costs.honorarios_fisio > 0 && costs.pct_utilidad > 0, 'No recuperó costos por defecto.');
api.saveCostosEstructura({...costs, arriendo:777000});
assert(JSON.parse(store.get('costosEstructura')).arriendo === 777000, 'No persistió costos.');
store.set('costosEstructura','{invalido');
assert(api.getCostosEstructura().honorarios_fisio > 0, 'No se recuperó ante JSON inválido.');
store.set('costosEstructura', JSON.stringify({asesorias_ap:790000,redes_contenido:150000}));
costs = api.getCostosEstructura();
assert(costs.asesorias_ap === 480000 && costs.redes_contenido === 240000, 'No aplicó migraciones históricas.');
const calc = api.calcTotalCostos({honorarios_fisio:1000000,pct_imprevistos:10,pct_utilidad:20});
assert(calc.subtotal === 1000000 && calc.imprevistos === 100000 && calc.utilidad === 200000 && calc.total === 1300000, 'Cálculo presupuestal incorrecto.');

// Meta, migración, validación y barras.
store.set('metaMensual','8000000');
assert(api.getMeta() === 10265000 && store.get('metaMensual') === '10265000', 'getMeta no migró la meta antigua.');
for (const id of ['metaBarFill','metaPct','metaTexto','metaInput','metaBarFinFill','metaBarFinPct','metaBarFinWrap','metaInputFin','presupuestoBody']) document.getElementById(id);
api.actualizarMetaBarra(5132500);
assert(document.getElementById('metaBarFill').style.width === '50%', 'Barra principal incorrecta.');
api.previewMeta('20.000.000');
assert(document.getElementById('metaBarFill').style.width === '25%', 'previewMeta incorrecto.');
api.previewMetaFin('10.000.000');
assert(document.getElementById('metaBarFinFill').style.width === '50%' && document.getElementById('metaBarFinWrap').style.display === 'block', 'previewMetaFin incorrecto.');
document.getElementById('metaInput').value = '50.000';
const invalidBefore = toasts.length;
api.guardarMeta();
assert(toasts.slice(invalidBefore).some(x => x.tone === 'err'), 'Meta inválida no produjo error.');
document.getElementById('metaInput').value = '12.000.000';
api.guardarMeta();
assert(cfg.meta_ventas_mes === 12000000 && context.META_VENTAS_MES === 12000000 && context.META_VENTAS_SEMANA === 3000000, 'guardarMeta no sincronizó metas.');
document.getElementById('metaInputFin').value = '13.000.000';
api.guardarMetaFin();
assert(cfg.meta_ventas_mes === 13000000 && financeRenders > 0, 'guardarMetaFin no sincronizó Finanzas.');

// Recarga de metas compartidas.
cfg.meta_sesiones_semana=24; cfg.meta_nps=80; cfg.meta_encuestas=70; cfg.meta_cancelacion=8; cfg.meta_retencion=72; cfg.meta_cac_max=28000;
api.reloadMetas();
assert(context.META_SESIONES_SEMANA === 24 && context.META_NPS === 80 && context.META_RETENCION_PCT === 72, 'reloadMetas no actualizó variables compartidas.');
assert(syncPrices > 0, 'reloadMetas no sincronizó precios.');

// Editor de costos del reporte.
const panel=document.getElementById('costosEditorPanel'); panel.style.display='none';
const compact=document.getElementById('costosVistaCompacta'); compact.style.display='block';
document.getElementById('btnEditCostos');
api._toggleEditCostos();
assert(panel.style.display === 'block' && compact.style.display === 'none', 'No abrió el editor de costos.');
for (const [key,value] of Object.entries({honorarios_fisio:1000000,pct_imprevistos:10,pct_utilidad:20})) {
  const el=makeElement(key); el.dataset.costo=key; el.value=String(value); costInputs.push(el);
}
assert(api._leerCamposCostos().honorarios_fisio === 1000000, 'No leyó campos de costos.');
for (const id of ['crSubtotal','crImprevistos','crUtilidad','crTotal','reporteMesBody']) document.getElementById(id);
api._recalcCostos();
assert(document.getElementById('crTotal').textContent.includes('1.300.000'), 'No recalculó el editor.');
api._guardarCostos();
assert(document.getElementById('reporteMesBody').innerHTML.includes('Reporte QA'), 'No refrescó el reporte mensual.');

// Renderizado y guardado desde Presupuesto y Metas.
api.renderPresupuestoMetas();
const body = document.getElementById('presupuestoBody').innerHTML;
assert(body.includes('Costos Fijos') && body.includes('Metas operativas') && body.includes('Precios de servicios'), 'No renderizó Presupuesto y Metas completo.');
const pm = {
  honorarios_fisio:1000000,seguridad_social:0,asistente_fisio:0,auxiliar_admin:0,arriendo:0,servicios_publicos:0,
  suscripcion_ia:0,suscripcion_capcut:0,asesorias_ap:0,redes_contenido:0,activacion_eventos:0,pautas_redes:0,mantenimiento:0,insumos:0,
  pct_imprevistos:10,pct_utilidad:20,kpi_ventas_mes:1500000,kpi_sesiones_semana:30,kpi_leads_min:50,kpi_leads_max:80,
  kpi_conv_min:25,kpi_conv_max:40,kpi_nps:85,kpi_encuestas:75,kpi_inv_mkt_total:600000,kpi_inv_mkt_pauta:250000,kpi_inv_mkt_contenido:350000,
  sv_cuello_p:76000,sv_cuello_d:91000,sv_piernas_p:76000,sv_piernas_d:91000,sv_completa_p:111000,sv_completa_d:126000,
  sv_valoracion_p:81000,sv_valoracion_d:96000,sv_readap_p:71000,sv_readap_d:86000,sv_express_p:76000,sv_express_d:91000
};
for (const [key,value] of Object.entries(pm)) document.getElementById('pm_'+key).value=String(value);
for (const id of ['pm_res_subtotal','pm_res_imprevistos','pm_res_utilidad','pm_res_total','pm_ticket_avg','pm_sess_calc']) document.getElementById(id);
api.pmRecalc();
assert(document.getElementById('pm_res_total').textContent.includes('1.300.000'), 'pmRecalc no actualizó el total.');
api.pmGuardarCostos();
assert(JSON.parse(store.get('costosEstructura')).honorarios_fisio === 1000000, 'pmGuardarCostos no persistió costos.');
api.pmGuardarKPIs();
assert(cfg.meta_sesiones_semana === 30 && cfg.meta_ventas_mes === 1500000, 'pmGuardarKPIs no guardó metas.');
assert(cfg.sv_cuello_p === 76000 && cfg.sv_completa_d === 126000, 'pmGuardarKPIs no guardó precios.');
assert(applyRefs > 0 && syncPrices > 0, 'No actualizó referencias y precios.');

console.log('FASE 13 VALIDADA: paridad, metas, presupuesto, costos, precios y compatibilidad global preservados.');
