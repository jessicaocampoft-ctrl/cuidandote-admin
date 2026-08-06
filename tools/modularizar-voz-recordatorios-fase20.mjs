import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

const voiceFunctions = [
  '_getSR', '_voiceBtn', '_voiceStatusEl',
  'toggleVoicePanel', 'procesarVozTexto', 'toggleVoice',
  '_startVoice', '_stopVoice', '_norm', '_parseVoice',
];
const voiceDeclarations = [
  '_voiceActive', '_voiceRec', '_voiceGotResult', 'VOICE_ICON', 'VOICE_STOP',
];
const reminderFunctions = [
  'cargarRecordatorios', 'renderRecordatorios', 'marcarRecordatorioEnviado',
  'enviarEmailsRecordatorio', 'enviarEmailUno',
];
const reminderDeclarations = ['_remData'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(`(${body})`);
      return body.trimEnd();
    } catch {}
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
    try {
      new vm.Script(body);
      return body.trimEnd();
    } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

function adapter(name, original, panel, label) {
  const isAsync = /^async\s+function/.test(original);
  return `${isAsync ? 'async ' : ''}function ${name}(...args) {\n` +
    `  const module = window.${panel};\n` +
    `  if (!module || typeof module.${name} !== 'function') {\n` +
    `    throw new Error('El módulo ${label} no está disponible: ${name}');\n` +
    `  }\n` +
    `  return ${isAsync ? 'await ' : ''}module.${name}(...args);\n` +
    `}`;
}

function buildModule({panel, declarations, functions}) {
  const api = functions.map(({name}) => name).join(',\n    ');
  return `(function (global) {\n'use strict';\n\n${declarations.join('\n\n')}\n\n${functions.map(x => x.body).join('\n\n')}\n\nglobal.${panel} = Object.freeze({\n    ${api}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
}

function moveGroup(functionNames, declarationNames, panel, label) {
  const declarations = declarationNames.map(name => extractDeclaration(source, name));
  const functions = functionNames.map(name => ({name, body: extractNamedFunction(source, name)}));

  for (const declaration of declarations) {
    source = source.replace(declaration, '');
  }
  for (const item of functions) {
    source = source.replace(item.body, adapter(item.name, item.body, panel, label));
  }
  return buildModule({panel, declarations, functions});
}

const voiceModule = moveGroup(
  voiceFunctions,
  voiceDeclarations,
  'PanelVoiceAssistant',
  'Asistente de voz',
);
const reminderModule = moveGroup(
  reminderFunctions,
  reminderDeclarations,
  'PanelReminders',
  'Recordatorios',
);

const anchor = '<script src="js/modules/message-library.js"></script>';
assert(source.includes(anchor), 'No se encontró el ancla del módulo de mensajes de la Fase 19.');
assert(!source.includes('js/modules/voice-assistant.js'), 'voice-assistant.js ya estaba cargado.');
assert(!source.includes('js/modules/reminders.js'), 'reminders.js ya estaba cargado.');
source = source.replace(
  anchor,
  `${anchor}\n<script src="js/modules/voice-assistant.js"></script>\n<script src="js/modules/reminders.js"></script>`,
);

fs.mkdirSync('js/modules', {recursive: true});
fs.writeFileSync('js/modules/voice-assistant.js', voiceModule);
fs.writeFileSync('js/modules/reminders.js', reminderModule);
fs.writeFileSync(indexPath, source);

console.log(`Fase 20 aplicada: ${voiceFunctions.length} funciones de voz y ${reminderFunctions.length} de recordatorios trasladadas.`);
