import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase20-index.html';
const indexPath = process.argv[3] || 'index.html';
const waitlistPath = process.argv[4] || 'js/modules/waitlist.js';
const schedulePath = process.argv[5] || 'js/modules/schedule-operations.js';
const eventsPath = process.argv[6] || 'js/modules/events-agreements.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const waitlistSource = fs.readFileSync(waitlistPath, 'utf8');
const scheduleSource = fs.readFileSync(schedulePath, 'utf8');
const eventsSource = fs.readFileSync(eventsPath, 'utf8');

const waitlistFunctions = [
  '_getWaitList', '_saveWaitList', '_syncWaitList',
  'addWaitPatient', 'removeWaitPatient', 'renderWaitList',
];
const waitlistDeclarations = ['_waitLoaded'];

const scheduleFunctions = [
  'renderBloqueos', 'doBlock', 'doUnblock',
  'toggleRecurringPanel', 'switchScheduleMode', '_updateSubmitLabel',
  'isMidnightTime', 'timeHumanLabel', 'updateTimeHelp',
  'adminScheduleRanges', 'adminTimeToMinutes', 'validateBusinessSchedule',
  '_addMultiDate', '_removeMultiDate', '_renderMultiChips',
  '_calcRecDates', '_updateRecPreview',
];

const eventAgreementFunctions = [
  'onConvenioChange', 'renderConveniosReport',
  'switchNuevaMode', 'calcDuracion', 'getDuracionStr',
  'submitEvento', 'clearEvento', 'eliminarEvento',
  'normHHMM', 'cerrarModalEditarEvento', 'abrirEditarEvento',
  'eeeCalcDuracion', 'eeeGuardar', 'eeeEliminar',
];
const eventAgreementDeclarations = ['_eeeId'];

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

function validateGroup(names, declarations, moduleSource, panel, baseLabel) {
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con ${baseLabel}.`);
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

validateGroup(waitlistFunctions, waitlistDeclarations, waitlistSource, 'PanelWaitlist', 'la Fase 20');
validateGroup(scheduleFunctions, [], scheduleSource, 'PanelScheduleOperations', 'la Fase 20');
validateGroup(eventAgreementFunctions, eventAgreementDeclarations, eventsSource, 'PanelEventsAgreements', 'la Fase 20');

const reminderTag = '<script src="js/modules/reminders.js"></script>';
const waitlistTag = '<script src="js/modules/waitlist.js"></script>';
const scheduleTag = '<script src="js/modules/schedule-operations.js"></script>';
const eventsTag = '<script src="js/modules/events-agreements.js"></script>';
for (const [file, re] of [
  ['waitlist.js', /script src="js\/modules\/waitlist\.js"/g],
  ['schedule-operations.js', /script src="js\/modules\/schedule-operations\.js"/g],
  ['events-agreements.js', /script src="js\/modules\/events-agreements\.js"/g],
]) assert((index.match(re) || []).length === 1, `${file} debe cargarse una sola vez.`);
assert(index.indexOf(waitlistTag) > index.indexOf(reminderTag), 'Lista de espera debe cargarse después de la Fase 20.');
assert(index.indexOf(scheduleTag) > index.indexOf(waitlistTag), 'Operación de agenda debe cargarse después de Lista de espera.');
assert(index.indexOf(eventsTag) > index.indexOf(scheduleTag), 'Eventos y convenios debe cargarse después de Operación de agenda.');

// Estado que comparte PanelAppointmentCreate: debe seguir global para conservar compatibilidad.
for (const name of [
  '_scheduleMode', '_multiDates', '_selectedServices',
  'convenios', 'costosReales', 'sesionesPorPaquete', 'soloPresencial',
]) {
  const original = extractDeclaration(base, name);
  assert(index.includes(original), `${name} debe permanecer compartida con PanelAppointmentCreate.`);
}
for (const [name, panel] of [
  ['submitAdminBookingMulti', 'PanelAppointmentCreate'],
  ['bookWaitPatient', 'PanelAppointmentCreate'],
  ['calcConvenio', 'PanelAppointmentCreate'],
  ['renderAgenda', 'PanelAgenda'],
]) {
  const fn = extractNamedFunction(index, name);
  assert(fn.includes(`window.${panel}`), `${name} dejó de delegar en ${panel}.`);
}
assert(extractNamedFunction(index, 'resumenDiaWA').includes('eventosHoy'), 'resumenDiaWA debe permanecer intacta fuera de esta fase.');

const waitActions = [...waitlistSource.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]);
assert(waitActions.length === 3, `Lista de espera debía conservar 3 acciones y tiene ${waitActions.length}.`);
assert(waitActions.filter(x => x === 'getWaitlist').length === 1, 'Debe conservar getWaitlist una vez.');
assert(waitActions.filter(x => x === 'addWaitlist').length === 1, 'Debe conservar addWaitlist una vez.');
assert(waitActions.filter(x => x === 'removeWaitlist').length === 1, 'Debe conservar removeWaitlist una vez.');
assert(waitActions.every(x => ['getWaitlist','addWaitlist','removeWaitlist'].includes(x)), 'Apareció una acción nueva en Lista de espera.');

const scheduleActions = [...scheduleSource.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]);
assert(scheduleActions.length === 2, `Operación de agenda debía conservar 2 acciones y tiene ${scheduleActions.length}.`);
assert(scheduleActions.filter(x => x === 'block').length === 1, 'Debe conservar block una vez.');
assert(scheduleActions.filter(x => x === 'unblock').length === 1, 'Debe conservar unblock una vez.');
assert(scheduleActions.every(x => ['block','unblock'].includes(x)), 'Apareció una acción nueva en Operación de agenda.');

const eventActions = [...eventsSource.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]);
assert(eventActions.length === 5, `Eventos debía conservar 5 usos de acciones y tiene ${eventActions.length}.`);
assert(eventActions.filter(x => x === 'crearEvento').length === 2, 'Debe conservar crearEvento dos veces.');
assert(eventActions.filter(x => x === 'eliminarEvento').length === 3, 'Debe conservar eliminarEvento tres veces.');
assert(eventActions.every(x => ['crearEvento','eliminarEvento'].includes(x)), 'Apareció una acción nueva en Eventos.');

for (const token of [
  'adminWaitList', 'Guardado localmente; se sincronizará', 'se liberó un horario',
]) assert(waitlistSource.includes(token), `Falta comportamiento de lista de espera: ${token}.`);
for (const token of [
  'Horario fuera de la jornada habitual', 'Vista previa —', 'No hay bloqueos activos',
]) assert(scheduleSource.includes(token), `Falta comportamiento de operación de agenda: ${token}.`);
for (const token of [
  'Evento creado ✓', 'Evento actualizado ✓', 'Comisión a pagar', 'Ingreso neto',
]) assert(eventsSource.includes(token), `Falta comportamiento de eventos/convenios: ${token}.`);

const waitContext = {
  window: null, globalThis: null, console,
  localStorage: {
    value: '{mal',
    getItem() { return this.value; },
    setItem(_k, value) { this.value = value; },
  },
};
waitContext.window = waitContext;
waitContext.globalThis = waitContext;
vm.createContext(waitContext);
vm.runInContext(waitlistSource, waitContext, {filename: waitlistPath});
const waitApi = waitContext.PanelWaitlist;
assert(waitApi && Object.isFrozen(waitApi), 'PanelWaitlist no está disponible o no está congelado.');
for (const name of waitlistFunctions) assert(typeof waitApi[name] === 'function', `Falta ${name} en PanelWaitlist.`);
assert(Array.isArray(waitApi._getWaitList()) && waitApi._getWaitList().length === 0, '_getWaitList no se recupera de JSON inválido.');
assert(waitApi._waitLoaded === undefined, '_waitLoaded debe permanecer privada.');

const scheduleContext = {window: null, globalThis: null, console, Date, String, Number, Math};
scheduleContext.window = scheduleContext;
scheduleContext.globalThis = scheduleContext;
vm.createContext(scheduleContext);
vm.runInContext(scheduleSource, scheduleContext, {filename: schedulePath});
const scheduleApi = scheduleContext.PanelScheduleOperations;
assert(scheduleApi && Object.isFrozen(scheduleApi), 'PanelScheduleOperations no está disponible o no está congelado.');
for (const name of scheduleFunctions) assert(typeof scheduleApi[name] === 'function', `Falta ${name} en PanelScheduleOperations.`);
assert(scheduleApi.timeHumanLabel('12:00') === '12:00 del mediodía', 'timeHumanLabel no reconoce el mediodía.');
assert(scheduleApi.isMidnightTime('00:30') === true, 'isMidnightTime no reconoce medianoche.');
assert(scheduleApi.adminTimeToMinutes('08:30') === 510, 'adminTimeToMinutes cambió su cálculo.');
const monday = scheduleApi.adminScheduleRanges('2026-08-03');
assert(JSON.stringify(monday) === JSON.stringify([['08:00','16:30']]), 'adminScheduleRanges cambió el horario del lunes.');

const eventsContext = {window: null, globalThis: null, console, String, Number, Math};
eventsContext.window = eventsContext;
eventsContext.globalThis = eventsContext;
vm.createContext(eventsContext);
vm.runInContext(eventsSource, eventsContext, {filename: eventsPath});
const eventsApi = eventsContext.PanelEventsAgreements;
assert(eventsApi && Object.isFrozen(eventsApi), 'PanelEventsAgreements no está disponible o no está congelado.');
for (const name of eventAgreementFunctions) assert(typeof eventsApi[name] === 'function', `Falta ${name} en PanelEventsAgreements.`);
assert(eventsApi.getDuracionStr('08:00','09:30') === '1h 30min', 'getDuracionStr cambió el cálculo de duración.');
assert(eventsApi.normHHMM('8:05') === '08:05', 'normHHMM cambió la normalización de hora.');
assert(eventsApi._eeeId === undefined, '_eeeId debe permanecer privada.');

console.log(`FASE 21 VALIDADA: ${waitlistFunctions.length} funciones de espera, ${scheduleFunctions.length} de agenda y ${eventAgreementFunctions.length} de eventos/convenios.`);
