import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
const whatsappPath = 'js/modules/whatsapp-tools.js';
const messagesPath = 'js/modules/message-library.js';
let source = fs.readFileSync(indexPath, 'utf8');

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

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(`(${body})`);
      return { start, end: i + 1, body, isAsync: /^async\s+function/.test(body) };
    } catch {}
  }
  throw new Error(`${name}: cuerpo sin cierre válido.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== ';') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(body);
      return { start, end: i + 1, body };
    } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

function adapterFor(item, apiName, label) {
  const prefix = item.isAsync ? 'async ' : '';
  const call = item.isAsync ? `return await module.${item.name}(...args);` : `return module.${item.name}(...args);`;
  return `${prefix}function ${item.name}(...args) {\n  const module = window.${apiName};\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo ${label} no está disponible: ${item.name}');\n  }\n  ${call}\n}`;
}

if (source.includes('window.PanelWhatsAppTools') && source.includes('window.PanelMessageLibrary') && fs.existsSync(whatsappPath) && fs.existsSync(messagesPath)) {
  console.log('La Fase 19 ya estaba aplicada.');
  process.exit(0);
}

const whatsappFunctions = whatsappNames.map(name => ({ name, ...extractNamedFunction(source, name) }));
const messageFunctions = messageNames.map(name => ({ name, ...extractNamedFunction(source, name) }));
const messageDeclarations = ['_MSG_CATS','_msgCatActiva','_MSG_DEFAULTS'].map(name => ({ name, ...extractDeclaration(source, name) }));

const whatsappSource = `(function(global) {\n  'use strict';\n\n${whatsappFunctions.map(x => x.body).join('\n\n')}\n\n  global.PanelWhatsAppTools = Object.freeze({\n    ${whatsappNames.join(',\n    ')}\n  });\n})(window);\n`;

const messagesSource = `(function(global) {\n  'use strict';\n\n${messageDeclarations.map(x => x.body).join('\n\n')}\n\n${messageFunctions.map(x => x.body).join('\n\n')}\n\n  global.PanelMessageLibrary = Object.freeze({\n    ${messageNames.join(',\n    ')}\n  });\n})(window);\n`;

const replacements = [
  ...whatsappFunctions.map(item => ({ ...item, replacement: adapterFor(item, 'PanelWhatsAppTools', 'Herramientas de WhatsApp') })),
  ...messageFunctions.map(item => ({ ...item, replacement: adapterFor(item, 'PanelMessageLibrary', 'Mensajes preparados') })),
  ...messageDeclarations.map(item => ({ ...item, replacement: '' })),
];

for (const item of replacements.sort((a,b) => b.start - a.start)) {
  source = source.slice(0, item.start) + item.replacement + source.slice(item.end);
}

const anchor = '<script src="js/modules/operations-automation.js"></script>';
const whatsappTag = '<script src="js/modules/whatsapp-tools.js"></script>';
const messagesTag = '<script src="js/modules/message-library.js"></script>';
if (!source.includes(whatsappTag) || !source.includes(messagesTag)) {
  if (!source.includes(anchor)) throw new Error('No se encontró el ancla operations-automation.js.');
  source = source.replace(anchor, `${anchor}\n${whatsappTag}\n${messagesTag}`);
}

fs.mkdirSync('js/modules', { recursive: true });
fs.writeFileSync(whatsappPath, whatsappSource, 'utf8');
fs.writeFileSync(messagesPath, messagesSource, 'utf8');
fs.writeFileSync(indexPath, source, 'utf8');
console.log(`Fase 19 aplicada: ${whatsappNames.length} funciones de WhatsApp y ${messageNames.length} de mensajes trasladadas.`);
