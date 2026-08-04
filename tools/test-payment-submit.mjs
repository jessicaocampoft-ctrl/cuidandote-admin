import fs from 'node:fs';
import vm from 'node:vm';

const target = process.argv[2] || 'index.html';
const html = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');

function extractFunction(name) {
  const match = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`).exec(html);
  if (!match) throw new Error(`No se encontró ${name}.`);
  const start = match.index;
  const braceStart = html.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    const next = html[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') { const nl = html.indexOf('\n', i + 2); i = nl < 0 ? html.length : nl; continue; }
    if (ch === '/' && next === '*') { const end = html.indexOf('*/', i + 2); i = end < 0 ? html.length : end + 1; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error(`No se pudo delimitar ${name}.`);
}

const functionSource = extractFunction('saveManualPayment');
for (const required of [
  "const valorRecibido = valorEl?.value.trim() || '';",
  "const fechaPago = fechaEl?.value || '';",
  "const medioPago = medioEl?.value || '';",
  "action: 'savePayment'",
  'estado=PAGO_APROBADO',
  "catch (error)",
  "finally"
]) {
  if (!functionSource.includes(required)) throw new Error(`Falta control requerido: ${required}`);
}

function element(value = '') {
  return {
    value,
    textContent: '',
    disabled: false,
    style: {},
    selectedOptions: [{ dataset: { account: 'CTA-QA' } }]
  };
}

async function runCase({ failSave = false } = {}) {
  const elements = {
    payActionStatus: element(),
    payVerifyBtn: element(),
    payApproveBtn: element(),
    payCitaId: element('QA-CITA'),
    payValorRecibido: element('10000'),
    payFechaPago: element('2026-08-04'),
    payMedioPago: element('Bancolombia · 91257857099'),
    payComprobante: element('PRUEBA AUTOMÁTICA'),
    payObservaciones: element('')
  };
  elements.payVerifyBtn.textContent = 'Subir para revisar';
  elements.payApproveBtn.textContent = 'Confirmar pago y autorizar';

  const calls = [];
  const toasts = [];
  let cleared = 0;
  let reloads = 0;
  let operationsLoads = 0;
  let pagosRendered = 0;
  let agendaRendered = 0;

  const context = {
    console,
    document: { getElementById: id => elements[id] || null },
    allData: { citas: [{ id: 'QA-CITA', nombre: 'QA Auditoría', servicio: 'Valoración funcional', precio: '10000' }] },
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/QA/exec',
    TOKEN: 'token-qa',
    confirm: () => true,
    toast: (message, tone) => toasts.push({ message, tone }),
    readPaymentProofFile: async () => null,
    fetchJsonWithTimeout: async (url, options = {}) => {
      calls.push({ url, options });
      if (options.body) {
        const body = JSON.parse(options.body);
        if (body.action !== 'savePayment') throw new Error('La primera llamada no fue savePayment.');
        if (failSave) return { ok: false, error: 'Fallo simulado del servidor' };
        return { ok: true, id: 'QA-PAGO' };
      }
      return { ok: true };
    },
    clearPaymentForm: () => { cleared++; },
    reload: async () => { reloads++; },
    loadOperationsData: async () => { operationsLoads++; },
    renderPagos: () => { pagosRendered++; },
    renderAgenda: () => { agendaRendered++; },
    encodeURIComponent,
    JSON,
    Error,
    Promise
  };

  vm.createContext(context);
  vm.runInContext(functionSource, context);
  await context.saveManualPayment('approve');

  return { elements, calls, toasts, cleared, reloads, operationsLoads, pagosRendered, agendaRendered };
}

const success = await runCase();
if (success.calls.length !== 2) throw new Error(`Se esperaban 2 llamadas y hubo ${success.calls.length}.`);
const saveBody = JSON.parse(success.calls[0].options.body);
const data = saveBody.data;
if (data.valorRecibido !== '10000') throw new Error('El valor recibido no se envió correctamente.');
if (data.fechaPago !== '2026-08-04') throw new Error('La fecha del pago no se envió correctamente.');
if (data.medioPago !== 'Bancolombia · 91257857099') throw new Error('El medio de pago no se envió correctamente.');
if (data.comprobante !== 'PRUEBA AUTOMÁTICA') throw new Error('La referencia no se envió correctamente.');
if (!success.calls[1].url.includes('action=verifyPayment') || !success.calls[1].url.includes('estado=PAGO_APROBADO')) {
  throw new Error('La segunda llamada no aprobó el pago.');
}
if (success.cleared !== 1 || success.reloads !== 1 || success.operationsLoads !== 1 || success.pagosRendered !== 1 || success.agendaRendered !== 1) {
  throw new Error('El flujo exitoso no refrescó todos los módulos.');
}
if (success.elements.payApproveBtn.disabled || success.elements.payVerifyBtn.disabled) throw new Error('Los botones quedaron deshabilitados.');
if (!success.elements.payActionStatus.textContent.includes('correctamente')) throw new Error('No se mostró confirmación visible.');

const failure = await runCase({ failSave: true });
if (!failure.elements.payActionStatus.textContent.includes('Fallo simulado')) throw new Error('El error del servidor no quedó visible.');
if (failure.elements.payApproveBtn.disabled || failure.elements.payVerifyBtn.disabled) throw new Error('Los botones no se recuperaron después del error.');
if (!failure.toasts.some(t => t.tone === 'err')) throw new Error('No se mostró alerta de error.');

fs.writeFileSync('PAYMENT_TEST_RESULT.md', [
  '# Prueba del botón Confirmar pago y autorizar',
  '',
  '- Declaración de valor, fecha y medio: OK',
  '- Registro `savePayment`: OK',
  '- Aprobación `verifyPayment` con `PAGO_APROBADO`: OK',
  '- Actualización de Pagos y Agenda: OK',
  '- Mensaje visible de éxito: OK',
  '- Mensaje visible de error: OK',
  '- Recuperación de los botones: OK',
  '',
  'La prueba usa una cita y respuestas simuladas. No modifica información real.'
].join('\n'), 'utf8');

console.log('Prueba del flujo de pagos superada.');
