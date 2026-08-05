import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/payments.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const expected = [
  'loadOperationsData','setupOperationsModuleUI','paymentAccountLabel','paymentCandidateAppointments',
  'renderPaymentAppointmentList','selectPaymentAppointment','updateSelectedPaymentCard',
  'updatePaymentProofLabel','fillPaymentSelectors','prefillPaymentFromAppointment','clearPaymentForm',
  'abrirPagoCita','saveManualPayment','readPaymentProofFile','verifyPayment','renderPagos','openPago'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/payments.js"></script>'), 'index.html no carga payments.js.');
for (const name of expected) {
  const matches = [...html.matchAll(new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\(`, 'g'))];
  assert(matches.length === 1, `${name} debe conservar exactamente un adaptador en index.html; encontrados: ${matches.length}.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en payments.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada por PanelPayments.`);
}
assert(!html.includes('async function loadOperationsData() {\n  if (!TOKEN)'), 'La implementación original de Pagos sigue dentro de index.html.');
assert(!html.includes("function openPago(citaId) {\n  showView('pagos')"), 'La implementación original de openPago sigue dentro de index.html.');

// Validar sintaxis de todos los scripts inline.
const inline = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n;\n');
new vm.Script(inline, { filename: 'inline-scripts.js' });
new vm.Script(moduleSource, { filename: modulePath });

function createElement(id) {
  const el = {
    id,
    value: '',
    innerHTML: '',
    textContent: '',
    disabled: false,
    checked: false,
    files: [],
    style: {},
    dataset: {},
    options: [],
    selectedOptions: [{ dataset: { account: 'CTA-1' } }],
    focus() { this.focused = true; },
    dispatchEvent() {},
    addEventListener() {},
    classList: { add() {}, remove() {}, toggle() {} }
  };
  return el;
}

const elements = new Map();
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElement(id));
    return elements.get(id);
  },
  createElement(tag) { return createElement(tag); },
  querySelectorAll() { return []; }
};

const calls = [];
const toasts = [];
let reloadCount = 0;
let shownView = '';

const context = {
  console,
  document,
  location: { href: '', hash: '' },
  sessionStorage: { getItem(){return null;}, setItem(){}, removeItem(){} },
  TOKEN: 'TOKEN-QA',
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/QA/exec',
  operationsData: {
    cuentas: [{ ID:'CTA-1', Medio:'Bancolombia', Numero:'123', Tipo:'Ahorros', Titular:'Cuidándote', Estado:'Activa' }],
    pagos: [], config: [], historialEstados: [], plantillasPlanes: []
  },
  allData: {
    citas: [
      { id:'QA-CITA', nombre:'QA Prueba', fecha:'2026-08-05', hora:'10:00', servicio:'Descarga', estado:'Pendiente de pago', precio:'10000', modalidad:'Sede' },
      { id:'QA-CANCELADA', nombre:'No incluir', fecha:'2026-08-05', hora:'11:00', servicio:'Descarga', estado:'Cancelada', precio:'10000' }
    ]
  },
  isOperationalDate: () => true,
  normDate: value => String(value || ''),
  fmtDate: value => String(value || ''),
  formatPrecio: value => `$${Number(value || 0).toLocaleString('es-CO')}`,
  parsePrecio: value => Number(String(value || '').replace(/[^\d]/g, '')),
  esc: value => String(value == null ? '' : value),
  today: () => '2026-08-05',
  toast: (message, tone) => { toasts.push({message, tone}); },
  showView: view => { shownView = view; },
  confirm: () => true,
  Event: class Event { constructor(type){ this.type = type; } },
  setTimeout: fn => { fn(); return 1; },
  clearTimeout() {},
  URL: { createObjectURL: () => 'blob:qa', revokeObjectURL() {} },
  Blob: class Blob {},
  FileReader: class FileReader {},
  reload: async () => { reloadCount++; },
  renderAgenda() {}, renderCalendar() {}, renderCitasResumen() {}, renderIngresosDetalle() {},
  closeModal() {},
  fetchJsonWithTimeout: async (url, options = {}) => {
    let body = null;
    try { body = options.body ? JSON.parse(options.body) : null; } catch (_) {}
    calls.push({ kind:'timeout', url, body });
    if (body?.action === 'savePayment') return { ok:true, id:'PAY-QA-1' };
    if (String(url).includes('verifyPayment')) return { ok:true };
    return { ok:true };
  },
  fetch: async (url, options = {}) => {
    let body = null;
    try { body = options.body ? JSON.parse(options.body) : null; } catch (_) {}
    calls.push({ kind:'fetch', url:String(url), body });
    let response;
    if (String(url).includes('operationsData')) {
      response = { ok:true, cuentas:context.operationsData.cuentas, pagos:context.operationsData.pagos, config:[], historialEstados:[], plantillasPlanes:[] };
    } else if (String(url).includes('verifyPayment')) {
      response = { ok:true };
    } else if (String(url).includes('setupOperationsModule')) {
      response = { ok:true };
    } else {
      response = { ok:true };
    }
    return { ok:true, json: async () => response };
  }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename: modulePath });

assert(context.PanelPayments, 'PanelPayments no quedó disponible.');
for (const name of expected) assert(typeof context.PanelPayments[name] === 'function', `PanelPayments.${name} no es función.`);

const candidates = context.PanelPayments.paymentCandidateAppointments();
assert(candidates.length === 1 && candidates[0].id === 'QA-CITA', 'El filtro de citas candidatas no excluye canceladas correctamente.');

context.PanelPayments.fillPaymentSelectors('QA-CITA');
assert(document.getElementById('payCitaId').innerHTML.includes('QA Prueba'), 'No se cargaron las citas en el selector.');
document.getElementById('payCitaId').value = 'QA-CITA';
context.PanelPayments.prefillPaymentFromAppointment();
assert(document.getElementById('payValorRecibido').value === '10000', 'No se precargó el valor de la cita.');
assert(document.getElementById('payFechaPago').value === '2026-08-05', 'No se precargó la fecha del pago.');

const payId = document.getElementById('payCitaId');
payId.value = 'QA-CITA';
document.getElementById('payValorRecibido').value = '10000';
document.getElementById('payFechaPago').value = '2026-08-05';
const medio = document.getElementById('payMedioPago');
medio.value = 'Bancolombia';
medio.selectedOptions = [{ dataset:{ account:'CTA-1' } }];
document.getElementById('payComprobante').value = 'REF-QA';
document.getElementById('payObservaciones').value = 'Prueba aislada';
document.getElementById('payProofFile').files = [];

await context.PanelPayments.saveManualPayment('approve');
const saveCall = calls.find(call => call.body?.action === 'savePayment');
assert(saveCall, 'saveManualPayment no llamó savePayment.');
assert(saveCall.body.data.estadoPago === 'COMPROBANTE_RECIBIDO', 'El registro inicial no usa COMPROBANTE_RECIBIDO.');
assert(saveCall.body.data.valorRecibido === '10000', 'El valor recibido no llegó al payload.');
assert(saveCall.body.data.cuentaReceptora === 'CTA-1', 'La cuenta receptora no llegó al payload.');
assert(calls.some(call => String(call.url).includes('verifyPayment') && String(call.url).includes('PAGO_APROBADO')), 'No se solicitó PAGO_APROBADO al confirmar.');
assert(document.getElementById('payApproveBtn').disabled === false, 'El botón Aprobar no se recuperó.');
assert(/correctamente|confirmado|aprobado/i.test(document.getElementById('payActionStatus').textContent), 'No quedó mensaje visible de éxito.');
assert(reloadCount >= 1, 'No se actualizó la información después de guardar.');

await context.PanelPayments.verifyPayment('PAY-QA-1', 'PAGO_RECHAZADO');
assert(calls.some(call => String(call.url).includes('PAGO_RECHAZADO')), 'verifyPayment no envió PAGO_RECHAZADO.');

context.PanelPayments.openPago('QA-CITA');
assert(shownView === 'pagos', 'openPago no abrió la vista Pagos.');

context.PanelPayments.clearPaymentForm();
assert(document.getElementById('payCitaId').value === '', 'clearPaymentForm no limpió la cita.');

console.log('FASE 4 VALIDADA: Pagos separado y flujos principales superados.');
