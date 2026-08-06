import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/goals-budget.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'getMeta','actualizarMetaBarra','previewMeta','guardarMeta','previewMetaFin','guardarMetaFin',
  'getCostosEstructura','saveCostosEstructura','calcTotalCostos','reloadMetas',
  '_toggleEditCostos','_leerCamposCostos','_recalcCostos','_guardarCostos',
  'renderPresupuestoMetas','pmRecalc','pmGuardarCostos','pmGuardarKPIs'
];
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(html.includes('<script src="js/modules/goals-budget.js"></script>'), 'index.html no carga goals-budget.js.');
assert((html.match(/script src="js\/modules\/goals-budget\.js"/g) || []).length === 1, 'goals-budget.js debe cargarse una sola vez.');
assert(html.indexOf('js/modules/kpi.js') < html.indexOf('js/modules/goals-budget.js'), 'goals-budget.js debe cargar después de kpi.js.');
for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en goals-budget.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}
for (const shared of ['COSTOS_DEFAULTS','META_SESIONES_SEMANA','META_VENTAS_MES','META_VENTAS_SEMANA','META_NPS','META_ENCUESTAS','META_CANCELACION_PCT','META_RETENCION_PCT']) {
  assert(new RegExp(`(?:const|let|var)\\s+${shared}\\b`).test(html), `${shared} debe permanecer en index.html.`);
  assert(!new RegExp(`(?:const|let|var)\\s+${shared}\\b`).test(moduleSource), `${shared} no debe duplicarse en el módulo.`);
}
for (const forbidden of ['renderFinanzas','renderEstructuraFinanciera','renderKPITablero','renderKPIGuia','renderMetricas','renderComisiones','renderPagos','renderAgenda']) {
  assert(!moduleSource.includes(`function ${forbidden}(`), `${forbidden} fue incluido por error.`);
}
assert(!moduleSource.includes('fetch('), 'Metas y Presupuesto no debe introducir fetch.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'Metas y Presupuesto no debe depender directamente de Apps Script.');
new vm.Script(moduleSource, { filename:modulePath });

function makeElement(id) {
  return {
    id, value:'', textContent:'', innerHTML:'', disabled:false, checked:false,
    style:{display:'none',width:'',borderColor:''}, dataset:{},
    classList:{add(){},remove(){},toggle(){}},
    addEventListener(){}, focus(){}, querySelector(){return null;}
  };
}
const elements = new Map();
const costInputs = [];
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelectorAll(selector) {
    if (selector === '#costosEditorPanel [data-costo]') return costInputs;
    return [];
  }
};
const store = new Map();
const toasts = [];
let syncPrices = 0, applyRefs = 0, financeRenders = 0, budgetRenders = 0;
const COSTOS_DEFAULTS = {
  honorarios_fisio:4000000, seguridad_social:500000, asistente_fisio:1200000, auxiliar_admin:500000,
  arriendo:450000, servicios_publicos:50000, suscripcion_ia:80000, suscripcion_capcut:12000,
  asesorias_ap:480000, redes_contenido:240000, activacion_eventos:300000, pautas_redes:100000,
  mantenimiento:200000, insumos:100000, pct_imprevistos:5, pct_utilidad:20
};
const cfg = {
  meta_sesiones_semana:20, meta_ventas_mes:10265000, meta_leads_min:40, meta_leads_max:60,
  meta_conv_min:20, meta_conv_max:35, meta_nps:70, meta_encuestas:60,
  meta_cancelacion:10, meta_retencion:65, inv_mkt_total:500000, inv_mkt_pauta:200000,
  inv_mkt_contenido:300000
};
const context = {
  console, document, window:null, globalThis:null, JSON, Math, Number, String, Object, Array, Date,
  parseInt, parseFloat,
  COSTOS_DEFAULTS,
  META_SESIONES_SEMANA:0, META_VENTAS_MES:0, META_VENTAS_SEMANA:0,
  META_NPS:0, META_ENCUESTAS:0, META_CANCELACION_PCT:0, META_RETENCION_PCT:0,
  kvGet:key => store.has(key) ? store.get(key) : null,
  kvSet:(key,value) => store.set(key, String(value)),
  getKPIConfig:() => cfg,
  calcCobradoMes:() => 5000000,
  applyKPIRefSpans:() => { applyRefs++; },
  _syncPreciosToAutoFill:() => { syncPrices++; },
  renderFinanzas:() => { financeRenders++; },
  fmtPeso:value => '$' + Number(value || 0).toLocaleString('es-CO'),
  toast:(message,tone) => toasts.push({message,tone}),
  _buildReporteMes:() => '<div>Reporte QA</div>',
  setTimeout:fn => { fn(); return 1; }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });

const api = context.PanelGoalsBudget;
assert(api, 'PanelGoalsBudget no quedó disponible.');
for (const name of names) assert(typeof api[name] === 'function', `${name} no quedó disponible.`);

// Migración de meta histórica y lectura desde KPI.
store.set('metaMensual','8000000');
assert(api.getMeta() === 10265000, 'getMeta no leyó la meta KPI.');
assert(store.get('metaMensual') === '10265000', 'getMeta no migró la meta antigua.');

// Costos: valores por defecto, migraciones y cálculo.
store.delete('costosEstructura');
let costs = api.getCostosEstructura();
assert(costs.arriendo === 450000 && costs.pct_utilidad === 20, 'No recuperó costos por defecto.');
store.set('costosEstructura', JSON.stringify({asesorias_ap:790000,redes_contenido:150000,pct_imprevistos:5,pct_utilidad:20}));
costs = api.getCostosEstructura();
assert(costs.asesorias_ap === 480000 && costs.redes_contenido === 240000, 'No aplicó migraciones de costos.');
assert(costs.asistente_fisio === 1200000 && costs.arriendo === 450000, 'No completó campos nuevos.');
store.set('costosEstructura','{mal json');
assert(api.getCostosEstructura().honorarios_fisio === 4000000, 'No recuperó costos por defecto ante JSON inválido.');
const calc = api.calcTotalCostos({honorarios_fisio:1000000,pct_imprevistos:10,pct_utilidad:20});
assert(calc.subtotal === 1000000 && calc.imprevistos === 100000 && calc.utilidad === 200000 && calc.total === 1300000, 'calcTotalCostos produjo valores incorrectos.');
api.saveCostosEstructura({honorarios_fisio:123});
assert(JSON.parse(store.get('costosEstructura')).honorarios_fisio === 123, 'No persistió costos.');

// Barra y previsualizaciones.
document.getElementById('metaBarFill'); document.getElementById('metaPct'); document.getElementById('metaTexto'); document.getElementById('metaInput');
api.actualizarMetaBarra(5132500);
assert(document.getElementById('metaBarFill').style.width === '50%', 'Barra principal incorrecta.');
assert(document.getElementById('metaPct').textContent === '50%', 'Porcentaje principal incorrecto.');
api.previewMeta('20.000.000');
assert(document.getElementById('metaBarFill').style.width === '25%', 'previewMeta incorrecto.');
document.getElementById('metaBarFinFill'); document.getElementById('metaBarFinPct'); document.getElementById('metaBarFinWrap');
api.previewMetaFin('10.000.000');
assert(document.getElementById('metaBarFinFill').style.width === '50%', 'previewMetaFin incorrecto.');
assert(document.getElementById('metaBarFinWrap').style.display === 'block', 'previewMetaFin no mostró la barra.');

// Guardado de meta inválida y válida.
document.getElementById('metaInput').value = '50.000';
const beforeInvalid = toasts.length;
api.guardarMeta();
assert(toasts.slice(beforeInvalid).some(x => x.tone === 'err'), 'Meta inválida no fue rechazada.');
document.getElementById('presupuestoBody');
document.getElementById('metaInput').value = '12.000.000';
api.guardarMeta();
assert(cfg.meta_ventas_mes === 12000000 && context.META_VENTAS_MES === 12000000 && context.META_VENTAS_SEMANA === 3000000, 'guardarMeta no sincronizó metas.');
assert(store.get('metaMensual') === '12000000', 'guardarMeta no persistió metaMensual.');

document.getElementById('metaInputFin').value = '13.000.000';
api.guardarMetaFin();
assert(cfg.meta_ventas_mes === 13000000 && financeRenders >= 1, 'guardarMetaFin no sincronizó Finanzas.');

// reloadMetas conserva las variables compartidas.
cfg.meta_sesiones_semana = 24; cfg.meta_nps = 80; cfg.meta_encuestas = 70; cfg.meta_cancelacion = 8; cfg.meta_retencion = 72;
api.reloadMetas();
assert(context.META_SESIONES_SEMANA === 24 && context.META_NPS === 80 && context.META_RETENCION_PCT === 72, 'reloadMetas no actualizó variables compartidas.');
assert(syncPrices > 0, 'reloadMetas no sincronizó precios.');

// Editor de costos del reporte.
const panel = document.getElementById('costosEditorPanel'); panel.style.display = 'none';
const compact = document.getElementById('costosVistaCompacta'); compact.style.display = 'block';
const btn = document.getElementById('btnEditCostos');
api._toggleEditCostos();
assert(panel.style.display === 'block' && compact.style.display === 'none', 'No abrió el editor de costos.');
for (const [key,value] of Object.entries({honorarios_fisio:1000000,pct_imprevistos:10,pct_utilidad:20})) {
  const el = makeElement(key); el.dataset.costo = key; el.value = String(value); costInputs.push(el);
}
const read = api._leerCamposCostos();
assert(read.honorarios_fisio === 1000000 && read.pct_utilidad === 20, 'No leyó campos de costos.');
for (const id of ['crSubtotal','crImprevistos','crUtilidad','crTotal']) document.getElementById(id);
api._recalcCostos();
assert(document.getElementById('crTotal').textContent.includes('1.300.000'), 'No recalculó el total del editor.');
document.getElementById('reporteMesBody');
api._guardarCostos();
assert(document.getElementById('reporteMesBody').innerHTML.includes('Reporte QA'), 'No refrescó el reporte después de guardar costos.');

// Vista Presupuesto y Metas.
api.renderPresupuestoMetas();
const budgetHtml = document.getElementById('presupuestoBody').innerHTML;
assert(budgetHtml.includes('Costos Fijos') && budgetHtml.includes('Metas operativas') && budgetHtml.includes('Precios de servicios'), 'No renderizó Presupuesto y Metas completo.');

// Recalcular y guardar desde la vista pm.
const pmValues = {
  honorarios_fisio:1000000,seguridad_social:0,asistente_fisio:0,auxiliar_admin:0,arriendo:0,servicios_publicos:0,
  suscripcion_ia:0,suscripcion_capcut:0,asesorias_ap:0,redes_contenido:0,activacion_eventos:0,pautas_redes:0,mantenimiento:0,insumos:0,
  pct_imprevistos:10,pct_utilidad:20,kpi_ventas_mes:1500000,kpi_sesiones_semana:30,kpi_leads_min:50,kpi_leads_max:80,
  kpi_conv_min:25,kpi_conv_max:40,kpi_nps:85,kpi_encuestas:75,kpi_inv_mkt_total:600000,kpi_inv_mkt_pauta:250000,kpi_inv_mkt_contenido:350000,
  sv_cuello_p:76000,sv_cuello_d:91000,sv_piernas_p:76000,sv_piernas_d:91000,sv_completa_p:111000,sv_completa_d:126000,
  sv_valoracion_p:81000,sv_valoracion_d:96000,sv_readap_p:71000,sv_readap_d:86000,sv_express_p:76000,sv_express_d:91000
};
for (const [key,value] of Object.entries(pmValues)) document.getElementById('pm_' + key).value = String(value);
for (const id of ['pm_res_subtotal','pm_res_imprevistos','pm_res_utilidad','pm_res_total','pm_ticket_avg','pm_sess_calc']) document.getElementById(id);
api.pmRecalc();
assert(document.getElementById('pm_res_total').textContent.includes('1.300.000'), 'pmRecalc no actualizó el total.');
api.pmGuardarCostos();
assert(JSON.parse(store.get('costosEstructura')).honorarios_fisio === 1000000, 'pmGuardarCostos no persistió costos.');
api.pmGuardarKPIs();
assert(cfg.meta_sesiones_semana === 30 && cfg.meta_ventas_mes === 1500000, 'pmGuardarKPIs no guardó metas operativas.');
assert(cfg.sv_cuello_p === 76000 && cfg.sv_completa_d === 126000, 'pmGuardarKPIs no guardó precios.');
assert(applyRefs > 0 && syncPrices > 0, 'No actualizó referencias y precios después de guardar.');

console.log('FASE 13 VALIDADA: metas, presupuesto, costos, precios y compatibilidad global preservados.');
