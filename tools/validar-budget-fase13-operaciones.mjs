import fs from 'node:fs';
import vm from 'node:vm';

const modulePath = process.argv[2] || 'js/modules/budget.js';
const source = fs.readFileSync(modulePath, 'utf8');
function assert(condition, message) { if (!condition) throw new Error(message); }

function element(id) {
  return {
    id, value:'', textContent:'', innerHTML:'', style:{display:'none',width:''},
    dataset:{}, disabled:false, classList:{add(){},remove(){},toggle(){}},
    addEventListener(){}, focus(){}, querySelector(){return null;}, querySelectorAll(){return [];}
  };
}
const elements = new Map();
const costInputs = [];
const document = {
  getElementById(id) { if (!elements.has(id)) elements.set(id, element(id)); return elements.get(id); },
  querySelectorAll(selector) { return selector === '#costosEditorPanel [data-costo]' ? costInputs : []; },
  createElement(tag) { return element(tag); }
};
const store = new Map();
const messages = [];
let refs = 0, finance = 0;
let cfg = {
  meta_sesiones_semana:20, meta_ventas_mes:10265000, meta_leads_min:40, meta_leads_max:60,
  meta_conv_min:20, meta_conv_max:35, meta_nps:70, meta_encuestas:60,
  meta_cancelacion:10, meta_retencion:65, meta_cac_max:30000,
  inv_mkt_total:500000, inv_mkt_pauta:200000, inv_mkt_contenido:300000,
  sv_cuello_p:75000, sv_cuello_d:90000, sv_piernas_p:75000, sv_piernas_d:90000,
  sv_completa_p:110000, sv_completa_d:125000, sv_valoracion_p:80000, sv_valoracion_d:95000,
  sv_readap_p:70000, sv_readap_d:85000, precio_express:75000, sv_express_d:90000
};
const context = {
  console, window:null, globalThis:null, document, JSON, Math, Number, String, Object, Array, Date,
  parseInt, parseFloat,
  META_SESIONES_SEMANA:0, META_VENTAS_MES:0, META_VENTAS_SEMANA:0,
  META_NPS:0, META_ENCUESTAS:0, META_CANCELACION_PCT:0, META_RETENCION_PCT:0, META_CAC_MAX:80000,
  kvGet:key => store.has(key) ? store.get(key) : null,
  kvSet:(key,value) => {
    store.set(key, String(value));
    if (key === 'kpiConfig') cfg = JSON.parse(String(value));
  },
  getKPIConfig:() => ({...cfg}),
  applyKPIRefSpans:() => { refs++; },
  calcCobradoMes:() => 5000000,
  renderFinanzas:() => { finance++; },
  fmtPeso:value => '$' + Number(value || 0).toLocaleString('es-CO'),
  toast:(message,tone) => messages.push({message,tone}),
  _buildReporteMes:() => '<div>Reporte actualizado QA</div>',
  setTimeout:fn => { fn(); return 1; }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, {filename:modulePath});
const api = context.PanelBudget;
assert(api, 'PanelBudget no está disponible.');

// Render completo de la vista.
document.getElementById('presupuestoBody');
api.renderPresupuestoMetas();
const html = document.getElementById('presupuestoBody').innerHTML;
assert(html.includes('Costos Fijos'), 'Falta el bloque de costos fijos.');
assert(html.includes('Metas operativas'), 'Falta el bloque de metas operativas.');
assert(html.includes('Precios de servicios'), 'Falta el bloque de precios.');

// Preparar campos del presupuesto.
const values = {
  honorarios_fisio:1000000, seguridad_social:0, asistente_fisio:0, auxiliar_admin:0,
  arriendo:0, servicios_publicos:0, suscripcion_ia:0, suscripcion_capcut:0,
  asesorias_ap:0, redes_contenido:0, activacion_eventos:0, pautas_redes:0,
  mantenimiento:0, insumos:0, pct_imprevistos:10, pct_utilidad:20,
  kpi_sesiones_semana:30, kpi_ventas_mes:1500000, kpi_leads_min:50, kpi_leads_max:80,
  kpi_conv_min:25, kpi_conv_max:40, kpi_nps:85, kpi_encuestas:75,
  kpi_inv_mkt_total:600000, kpi_inv_mkt_pauta:250000, kpi_inv_mkt_contenido:350000,
  sv_cuello_p:76000, sv_cuello_d:91000, sv_piernas_p:77000, sv_piernas_d:92000,
  sv_completa_p:111000, sv_completa_d:126000, sv_valoracion_p:81000, sv_valoracion_d:96000,
  sv_readap_p:71000, sv_readap_d:86000, sv_express_p:76000, sv_express_d:91000
};
for (const [key,value] of Object.entries(values)) document.getElementById('pm_' + key).value = String(value);
for (const id of ['pm_res_subtotal','pm_res_imprevistos','pm_res_utilidad','pm_res_total','pm_ticket_avg','pm_sess_calc']) document.getElementById(id);

api.pmRecalc();
assert(document.getElementById('pm_res_subtotal').textContent.includes('1.000.000'), 'Subtotal incorrecto.');
assert(document.getElementById('pm_res_total').textContent.includes('1.300.000'), 'Meta total incorrecta.');
assert(Number(document.getElementById('pm_sess_calc').textContent) > 0, 'No calculó sesiones necesarias.');

api.pmGuardarCostos();
const savedCosts = JSON.parse(store.get('costosEstructura'));
assert(savedCosts.honorarios_fisio === 1000000 && savedCosts.pct_utilidad === 20, 'No guardó los costos del presupuesto.');

api.pmGuardarKPIs();
assert(cfg.meta_sesiones_semana === 30 && cfg.meta_ventas_mes === 1500000, 'No guardó metas operativas.');
assert(cfg.sv_cuello_p === 76000 && cfg.sv_completa_d === 126000, 'No guardó precios configurados.');
assert(context._preciosOverride['Descarga Muscular — Cuello y Espalda'].Presencial.includes('76.000'), 'El precio no llegó al autocompletado de citas.');
assert(refs > 0, 'No actualizó referencias KPI.');

// Editor de costos incluido en el reporte mensual.
for (const [key,value] of Object.entries({honorarios_fisio:1000000,pct_imprevistos:10,pct_utilidad:20})) {
  const input = element(key); input.dataset.costo = key; input.value = String(value); costInputs.push(input);
}
for (const id of ['crSubtotal','crImprevistos','crUtilidad','crTotal','reporteMesBody']) document.getElementById(id);
api._recalcCostos();
assert(document.getElementById('crTotal').textContent.includes('1.300.000'), 'El editor no recalculó el total.');
api._guardarCostos();
assert(document.getElementById('reporteMesBody').innerHTML.includes('Reporte actualizado QA'), 'No actualizó el reporte después de guardar costos.');

// Guardado desde la tarjeta de Finanzas.
document.getElementById('metaInputFin').value = '14.000.000';
for (const id of ['metaBarFill','metaPct','metaTexto','metaInput','metaBarFinFill','metaBarFinPct','metaBarFinWrap']) document.getElementById(id);
api.guardarMetaFin();
assert(cfg.meta_ventas_mes === 14000000 && finance > 0, 'No sincronizó la meta desde Finanzas.');

assert(messages.some(x => String(x.message).includes('guardad')), 'No mostró confirmaciones de guardado.');
console.log('FASE 13 OPERATIVA: presupuesto, metas, costos y precios funcionan con datos QA en memoria.');
