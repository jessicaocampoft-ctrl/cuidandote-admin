import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

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
  return `/* Cuidándote Fisioterapia — ${panel}. */\n(function (global) {\n'use strict';\n\n${declarations.join('\n\n')}\n\n${functions.map(x => x.body).join('\n\n')}\n\nglobal.${panel} = Object.freeze({\n    ${api}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
}

function moveGroup(functionNames, declarationNames, panel, label) {
  const declarations = declarationNames.map(name => extractDeclaration(source, name));
  const functions = functionNames.map(name => ({name, body: extractNamedFunction(source, name)}));

  for (const declaration of declarations) source = source.replace(declaration, '');
  for (const item of functions) source = source.replace(item.body, adapter(item.name, item.body, panel, label));
  return buildModule({panel, declarations, functions});
}

const waitlistModule = moveGroup(
  waitlistFunctions,
  waitlistDeclarations,
  'PanelWaitlist',
  'Lista de espera',
);
const scheduleModule = moveGroup(
  scheduleFunctions,
  [],
  'PanelScheduleOperations',
  'Operación de agenda',
);
const eventsModule = moveGroup(
  eventAgreementFunctions,
  eventAgreementDeclarations,
  'PanelEventsAgreements',
  'Eventos y convenios',
);

const anchor = '<script src="js/modules/reminders.js"></script>';
assert(source.includes(anchor), 'No se encontró el ancla de Recordatorios de la Fase 20.');
for (const file of ['waitlist.js', 'schedule-operations.js', 'events-agreements.js']) {
  assert(!source.includes(`js/modules/${file}`), `${file} ya estaba cargado.`);
}
source = source.replace(
  anchor,
  `${anchor}\n<script src="js/modules/waitlist.js"></script>\n<script src="js/modules/schedule-operations.js"></script>\n<script src="js/modules/events-agreements.js"></script>`,
);

fs.mkdirSync('js/modules', {recursive: true});
fs.writeFileSync('js/modules/waitlist.js', waitlistModule);
fs.writeFileSync('js/modules/schedule-operations.js', scheduleModule);
fs.writeFileSync('js/modules/events-agreements.js', eventsModule);
fs.writeFileSync(indexPath, source);

console.log(`Fase 21 aplicada: ${waitlistFunctions.length} funciones de lista de espera, ${scheduleFunctions.length} de operación de agenda y ${eventAgreementFunctions.length} de eventos/convenios.`);
