import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'payments.js');
const scriptTag = '<script src="js/modules/payments.js"></script>';

const exported = [
  'loadOperationsData',
  'setupOperationsModuleUI',
  'paymentAccountLabel',
  'paymentCandidateAppointments',
  'renderPaymentAppointmentList',
  'selectPaymentAppointment',
  'updateSelectedPaymentCard',
  'updatePaymentProofLabel',
  'fillPaymentSelectors',
  'prefillPaymentFromAppointment',
  'clearPaymentForm',
  'abrirPagoCita',
  'saveManualPayment',
  'readPaymentProofFile',
  'verifyPayment',
  'renderPagos',
  'openPago'
];

function extractFunction(source, signature) {
  const start = source.indexOf(signature);
  if (start < 0) throw new Error(`No se encontró ${signature}.`);
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error(`No se encontró la apertura de ${signature}.`);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1, text: source.slice(start, i + 1) };
    }
  }
  throw new Error(`No se pudo cerrar ${signature}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 4 ya estaba aplicada.');
  process.exit(0);
}

const blockStartMarker = 'async function loadOperationsData() {';
const blockEndMarker = 'function downloadOperationsCSV';
const blockStart = html.indexOf(blockStartMarker);
const blockEnd = html.indexOf(blockEndMarker, blockStart);
if (blockStart < 0 || blockEnd < 0 || blockEnd <= blockStart) {
  throw new Error('No se reconoció el bloque continuo del módulo de Pagos.');
}
const paymentBlock = html.slice(blockStart, blockEnd).trimEnd();

const openPagoBlock = extractFunction(html, 'function openPago(citaId)');

for (const name of exported.filter(name => name !== 'openPago')) {
  const regex = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\(`);
  if (!regex.test(paymentBlock)) throw new Error(`El bloque de Pagos no contiene ${name}().`);
}

const moduleSource = `/* Cuidándote Fisioterapia — módulo aislado de Pagos. */\n(function (global) {\n  'use strict';\n\n${paymentBlock}\n\n${openPagoBlock.text}\n\n  global.PanelPayments = Object.freeze({\n${exported.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

const adapters = `// Adaptadores de compatibilidad — Fase 4 Pagos.\n${exported.map(name => {
  const isAsync = ['loadOperationsData','setupOperationsModuleUI','saveManualPayment','readPaymentProofFile','verifyPayment'].includes(name);
  return `${isAsync ? 'async ' : ''}function ${name}(...args) {\n  const module = window.PanelPayments;\n  if (!module || typeof module.${name} !== 'function') {\n    throw new Error('El módulo de Pagos no está disponible: ${name}');\n  }\n  return ${isAsync ? 'await ' : ''}module.${name}(...args);\n}`;
}).join('\n\n')}\n\n`;

// Retirar primero openPago; está después del bloque principal y no altera sus marcadores.
html = html.slice(0, openPagoBlock.start) + html.slice(openPagoBlock.end);

const currentBlockStart = html.indexOf(blockStartMarker);
const currentBlockEnd = html.indexOf(blockEndMarker, currentBlockStart);
if (currentBlockStart < 0 || currentBlockEnd < 0) {
  throw new Error('El bloque principal cambió antes de reemplazarlo.');
}
html = html.slice(0, currentBlockStart) + adapters + html.slice(currentBlockEnd);

if (!html.includes(scriptTag)) {
  const bodyClose = html.lastIndexOf('</body>');
  if (bodyClose < 0) throw new Error('No se encontró </body> para cargar payments.js.');
  html = html.slice(0, bodyClose) + `  ${scriptTag}\n` + html.slice(bodyClose);
}

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');

console.log(`Fase 4 aplicada: ${exported.length} funciones trasladadas a ${modulePath}.`);
