import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase19-index.html';
const indexPath = process.argv[3] || 'index.html';
const voicePath = process.argv[4] || 'js/modules/voice-assistant.js';
const reminderPath = process.argv[5] || 'js/modules/reminders.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const voiceSource = fs.readFileSync(voicePath, 'utf8');
const reminderSource = fs.readFileSync(reminderPath, 'utf8');

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

function validateGroup(names, declarations, moduleSource, panel) {
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 19.`);
    const adapter = extractNamedFunction(index, name);
    assert(adapter.includes(`window.${panel}`), `${name}: el adaptador no usa ${panel}.`);
    assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
    assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
  }
  for (const name of declarations) {
    const original = extractDeclaration(base, name);
    assert(moduleSource.includes(original), `${name}: no quedó encapsulada con paridad exacta.`);
    assert(!index.includes(original), `${name}: todavía permanece en index.html.`);
  }
  assert(moduleSource.includes(`global.${panel} = Object.freeze`), `Falta la API congelada ${panel}.`);
}

validateGroup(voiceFunctions, voiceDeclarations, voiceSource, 'PanelVoiceAssistant');
validateGroup(reminderFunctions, reminderDeclarations, reminderSource, 'PanelReminders');

const messageTag = '<script src="js/modules/message-library.js"></script>';
const voiceTag = '<script src="js/modules/voice-assistant.js"></script>';
const reminderTag = '<script src="js/modules/reminders.js"></script>';
assert((index.match(/script src="js\/modules\/voice-assistant\.js"/g) || []).length === 1, 'voice-assistant.js debe cargarse una sola vez.');
assert((index.match(/script src="js\/modules\/reminders\.js"/g) || []).length === 1, 'reminders.js debe cargarse una sola vez.');
assert(index.indexOf(voiceTag) > index.indexOf(messageTag), 'Voz debe cargarse después de la Fase 19.');
assert(index.indexOf(reminderTag) > index.indexOf(voiceTag), 'Recordatorios debe cargarse después de Voz.');

assert(!voiceSource.includes('fetch('), 'El módulo de voz no debe hacer llamadas de red.');
assert(!voiceSource.includes('APPS_SCRIPT_URL'), 'El módulo de voz no debe depender de Apps Script.');
const reminderActions = [...reminderSource.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]);
assert(reminderActions.length === 3, `Se esperaban 3 usos de acciones existentes y se encontraron ${reminderActions.length}.`);
assert(reminderActions.filter(x => x === 'getReminders').length === 1, 'Debe conservar una consulta getReminders.');
assert(reminderActions.filter(x => x === 'sendReminders').length === 2, 'Debe conservar dos usos de sendReminders.');
assert(reminderActions.every(x => ['getReminders','sendReminders'].includes(x)), 'Apareció una acción de servidor nueva en Recordatorios.');

for (const token of [
  'SpeechRecognition', 'webkitSpeechRecognition', "lang            = 'es-ES'",
  'paciente (encontrado)', 'No entendí la cita',
]) {
  assert(voiceSource.includes(token), `Falta comportamiento de voz: ${token}.`);
}
for (const token of [
  'Semana 4 — Momento ideal', 'Semana 5+ — Reagendamiento urgente',
  'Enviar emails a todos', 'rec_wa_', 'rec_email_',
]) {
  assert(reminderSource.includes(token), `Falta comportamiento de recordatorios: ${token}.`);
}

// El calendario ya pertenece a PanelAgenda: debe conservar exactamente su puente y estado compartido.
const originalGetMonday = extractNamedFunction(base, 'getMonday');
assert(index.includes(originalGetMonday), 'getMonday debe permanecer intacta para inicializar el calendario antes de cargar módulos.');
for (const name of ['calWeekStart', '_calGCevents']) {
  const original = extractDeclaration(base, name);
  assert(index.includes(original), `${name} debe permanecer compartida con PanelAgenda.`);
}
for (const name of ['calPrev','calNext','calToday','renderCalendar']) {
  const calendarAdapter = extractNamedFunction(index, name);
  assert(calendarAdapter.includes('window.PanelAgenda'), `${name} dejó de delegar en PanelAgenda.`);
}
assert((index.match(/script src="js\/modules\/agenda\.js"/g) || []).length === 1, 'agenda.js debe seguir cargándose una sola vez.');

for (const externalName of ['switchScheduleMode', 'buscarDisponibilidad', 'renderWaitList']) {
  assert(new RegExp(`(?:async\\s+)?function\\s+${externalName}\\s*\\(`).test(index), `${externalName} debe permanecer fuera de esta fase.`);
}

const voiceContext = { window: null, globalThis: null, console, String };
voiceContext.window = voiceContext;
voiceContext.globalThis = voiceContext;
vm.createContext(voiceContext);
vm.runInContext(voiceSource, voiceContext, {filename: voicePath});
const voiceApi = voiceContext.PanelVoiceAssistant;
assert(voiceApi && Object.isFrozen(voiceApi), 'PanelVoiceAssistant no está disponible o no está congelado.');
for (const name of voiceFunctions) assert(typeof voiceApi[name] === 'function', `Falta ${name} en PanelVoiceAssistant.`);
assert(voiceApi._norm('Valoración Músculo') === 'valoracion musculo', '_norm no conserva la normalización de acentos.');
assert(voiceApi._voiceActive === undefined && voiceApi.VOICE_ICON === undefined, 'El estado y constantes de voz deben permanecer privados.');

const reminderContext = { window: null, globalThis: null, console };
reminderContext.window = reminderContext;
reminderContext.globalThis = reminderContext;
vm.createContext(reminderContext);
vm.runInContext(reminderSource, reminderContext, {filename: reminderPath});
const reminderApi = reminderContext.PanelReminders;
assert(reminderApi && Object.isFrozen(reminderApi), 'PanelReminders no está disponible o no está congelado.');
for (const name of reminderFunctions) assert(typeof reminderApi[name] === 'function', `Falta ${name} en PanelReminders.`);
assert(reminderApi._remData === undefined, '_remData debe permanecer privada.');

console.log(`FASE 20 VALIDADA: ${voiceFunctions.length} funciones de voz y ${reminderFunctions.length} de recordatorios, con regresión del calendario.`);
