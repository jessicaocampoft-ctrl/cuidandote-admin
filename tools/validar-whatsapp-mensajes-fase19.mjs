import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase18-index.html';
const indexPath = process.argv[3] || 'index.html';
const whatsappPath = process.argv[4] || 'js/modules/whatsapp-tools.js';
const messagesPath = process.argv[5] || 'js/modules/message-library.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const whatsappSource = fs.readFileSync(whatsappPath, 'utf8');
const messagesSource = fs.readFileSync(messagesPath, 'utf8');

const whatsappNames = [
  'waNombre','waFechaES','waAmPm','ordinalES','getInfoSesion','waLink','waLinkRec','waLinkSeg',
  '_copyGestionMesKey','_copyGestionPeriodo','_copyGestionTop','_copyGestionData',
  '_copyGestionOcupacion','_copyGestionReactivar','_copyGestionCandidatosPaquete',
  '_copyGestionDiagnostico','_copyGestionAcciones','_copyGestionTexto','copyGestionTexto',
  '_copyGestionAsesorText','_copyPlainText','_copyOk','_showCopyFallback',
  'abrirCopiarListaGestion','copiarInfoPersonaGestion','abrirMensajeWAGestion',
  '_showWhatsAppCopyModal','_openWAGestionPrepared','cerrarWaCopyModal','copiarMsgWA',
];
const messageNames = [
  '_getMensajesPre','_setMensajesPre','_initMensajesPre','renderMensajes','_msgCard',
  'setMsgCat','abrirNuevoMensaje','editarMensaje','guardarMensaje','eliminarMensaje',
  'copiarMensajePre','gEditarToggle','gAutoGuardar','gFitHeight','gCargarGuardados',
  'gTabSwitch','gCopiar',
];
const privateNames = ['_MSG_CATS','_msgCatActiva','_MSG_DEFAULTS'];

function assert(condition, message) { if (!condition) throw new Error(message); }

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try { new vm.Script(`(${body})`); return body.trimEnd(); } catch {}
  }
  throw new Error(`${name}: cuerpo sin cierre válido.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== ';') continue;
    const body = text.slice(start, i + 1);
    try { new vm.Script(body); return body.trimEnd(); } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

function validateFunctions(names, moduleSource, apiName) {
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 18.`);
    const adapter = extractNamedFunction(index, name);
    assert(adapter.includes(`window.${apiName}`), `${name}: el adaptador no usa ${apiName}.`);
    assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
    assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
  }
}

validateFunctions(whatsappNames, whatsappSource, 'PanelWhatsAppTools');
validateFunctions(messageNames, messagesSource, 'PanelMessageLibrary');

for (const name of privateNames) {
  const original = extractDeclaration(base, name);
  assert(messagesSource.includes(original), `${name}: no quedó encapsulada con paridad exacta.`);
  assert(!index.includes(original), `${name}: todavía permanece en index.html.`);
}

const operationsTag = '<script src="js/modules/operations-automation.js"></script>';
const whatsappTag = '<script src="js/modules/whatsapp-tools.js"></script>';
const messagesTag = '<script src="js/modules/message-library.js"></script>';
assert((index.match(/script src="js\/modules\/whatsapp-tools\.js"/g) || []).length === 1, 'whatsapp-tools.js debe cargarse una sola vez.');
assert((index.match(/script src="js\/modules\/message-library\.js"/g) || []).length === 1, 'message-library.js debe cargarse una sola vez.');
assert(index.indexOf(whatsappTag) > index.indexOf(operationsTag), 'WhatsApp debe cargarse después de Operaciones.');
assert(index.indexOf(messagesTag) > index.indexOf(whatsappTag), 'Mensajes debe cargarse después de WhatsApp.');
assert(whatsappSource.includes('global.PanelWhatsAppTools = Object.freeze'), 'Falta la API congelada de WhatsApp.');
assert(messagesSource.includes('global.PanelMessageLibrary = Object.freeze'), 'Falta la API congelada de Mensajes.');

for (const src of [whatsappSource, messagesSource]) {
  assert(!src.includes('fetch('), 'Los módulos no deben introducir llamadas de red.');
  assert(!src.includes('APPS_SCRIPT_URL'), 'Los módulos no deben depender directamente de Apps Script.');
  assert(!src.includes('action='), 'No deben aparecer acciones nuevas de servidor.');
}

for (const token of ['wa.me','WhatsApp','Copiar','gestión']) {
  assert(whatsappSource.toLowerCase().includes(token.toLowerCase()), `Falta el flujo de WhatsApp/copia: ${token}.`);
}
for (const token of ['mensajes_pre','Mensaje guardado','Copiado al portapapeles']) {
  assert(messagesSource.includes(token), `Falta el flujo de mensajes: ${token}.`);
}

for (const externalName of ['fmtDate','chipState','toggleVoicePanel','procesarVozTexto','copiarDisponibilidadWA','renderTareas','renderSeguimiento']) {
  assert(new RegExp(`function\\s+${externalName}\\s*\\(`).test(index), `${externalName} debe permanecer fuera de esta fase.`);
}

const waContext = { window:null, globalThis:null, console, Date, Math, Intl };
waContext.window = waContext;
waContext.globalThis = waContext;
vm.createContext(waContext);
vm.runInContext(whatsappSource, waContext, { filename: whatsappPath });
const waApi = waContext.PanelWhatsAppTools;
assert(waApi && Object.isFrozen(waApi), 'PanelWhatsAppTools no está disponible o no está congelado.');
for (const name of whatsappNames) assert(typeof waApi[name] === 'function', `Falta ${name} en PanelWhatsAppTools.`);
assert(waApi.waNombre('Jessica Andrea') === 'Jessica', 'waNombre no conserva el primer nombre.');
assert(waApi._copyGestionMesKey(new Date(2026,7,6)) === '2026-08', 'La clave mensual de gestión cambió.');

let saved = null;
const msgContext = {
  window:null, globalThis:null, console, Date, Math, Intl,
  kvGet: () => null,
  kvSet: (key, value) => { saved = { key, value }; },
};
msgContext.window = msgContext;
msgContext.globalThis = msgContext;
vm.createContext(msgContext);
vm.runInContext(messagesSource, msgContext, { filename: messagesPath });
const msgApi = msgContext.PanelMessageLibrary;
assert(msgApi && Object.isFrozen(msgApi), 'PanelMessageLibrary no está disponible o no está congelado.');
for (const name of messageNames) assert(typeof msgApi[name] === 'function', `Falta ${name} en PanelMessageLibrary.`);
assert(Array.isArray(msgApi._getMensajesPre()) && msgApi._getMensajesPre().length === 0, 'La biblioteca debe iniciar vacía sin datos guardados.');
msgApi._setMensajesPre([{ id:'qa' }]);
assert(saved?.key === 'mensajes_pre' && saved.value.includes('qa'), 'No conserva el almacenamiento de mensajes.');
assert(msgApi._MSG_CATS === undefined && msgApi._MSG_DEFAULTS === undefined && msgApi._msgCatActiva === undefined, 'El estado privado de mensajes no debe exportarse.');

console.log(`FASE 19 VALIDADA: ${whatsappNames.length} funciones de WhatsApp y ${messageNames.length} de mensajes separadas con paridad exacta y sin llamadas nuevas al servidor.`);
