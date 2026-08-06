import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase17-index.html';
const indexPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/operations-automation.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  '_checkAutoAtendida','marcarTodasAtendidas','_checkCobrosPendientes','_checkAlertaSemanFloja',
  'getTplTarea','guardarPlantillaTarea','initTareasConfig','_tareaKey','_tareaEstado',
  '_tareaFechaTipo','generarTareas','toggleTareaFiltro','renderTareas','_renderTareasLista',
  'marcarTareaWA','marcarTareaCompletada','posponerTarea','omitirTarea',
];
const privateNames = ['_TPL_DEFAULT', '_tareaFiltros'];

function assert(condition, message) { if (!condition) throw new Error(message); }

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

for (const name of names) {
  const original = extractNamedFunction(base, name);
  assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 17.`);
  const adapter = extractNamedFunction(index, name);
  assert(adapter.includes('window.PanelOperationsAutomation'), `${name}: el adaptador no usa PanelOperationsAutomation.`);
  assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
  assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
}

for (const name of privateNames) {
  const original = extractDeclaration(base, name);
  assert(moduleSource.includes(original), `${name}: no quedó encapsulada con paridad exacta.`);
  assert(!index.includes(original), `${name}: todavía permanece en index.html.`);
}

const tag = '<script src="js/modules/operations-automation.js"></script>';
const anchor = '<script src="js/modules/patient-recovery.js"></script>';
assert((index.match(/script src="js\/modules\/operations-automation\.js"/g) || []).length === 1, 'operations-automation.js debe cargarse una sola vez.');
assert(index.indexOf(tag) > index.indexOf(anchor), 'El módulo operativo debe cargarse después de Recuperación.');
assert(moduleSource.includes('global.PanelOperationsAutomation = Object.freeze'), 'Falta la API pública congelada.');

assert(!moduleSource.includes('fetch('), 'El módulo operativo no debe hacer llamadas de red.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'El módulo operativo no debe depender directamente de Apps Script.');
assert(!moduleSource.includes('action='), 'No deben aparecer acciones nuevas de servidor.');

for (const token of [
  'Tienes ${total} tarea',
  'citas pasadas',
  '3+ días sin registrar pago',
  'Alerta: semana floja',
  'Posponer 1 día',
]) {
  assert(moduleSource.includes(token), `Falta el flujo operativo: ${token}.`);
}

for (const externalName of ['openPago','renderAgenda','showView','renderSmartBriefing','renderSmartCobrosCenter']) {
  assert(new RegExp(`function\\s+${externalName}\\s*\\(`).test(index), `${externalName} debe permanecer fuera de esta fase.`);
}
assert(index.includes('ADMIN_OPERATIONS_START_DATE'), 'La fecha de inicio operativo compartida debe permanecer disponible.');

const context = {
  window: null,
  globalThis: null,
  console,
  Set,
  Date,
  Math,
  Intl,
  kvGet: () => null,
  kvSet: () => {},
  normDate: value => typeof value === 'string' ? value : (value?.fecha || ''),
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename: modulePath });
const api = context.PanelOperationsAutomation;
assert(api && Object.isFrozen(api), 'PanelOperationsAutomation no está disponible o no está congelado.');
for (const name of names) assert(typeof api[name] === 'function', `Falta ${name} en PanelOperationsAutomation.`);
assert(api._TPL_DEFAULT === undefined, '_TPL_DEFAULT debe permanecer privada.');
assert(api._tareaFiltros === undefined, '_tareaFiltros debe permanecer privada.');
assert(api.getTplTarea('descarga').includes('{nombre}'), 'No conserva la plantilla por defecto de descarga.');
assert(api._tareaFechaTipo({ servicio: 'Descarga muscular completa' })?.tipo === 'descarga', 'No reconoce tareas de descarga.');
assert(api._tareaFechaTipo({ servicio: 'Valoración funcional' })?.diasDelay === 1, 'No reconoce tareas de valoración.');
assert(api._tareaFechaTipo({ servicio: 'Readaptación funcional' })?.tipo === 'readaptacion', 'No reconoce tareas de readaptación.');
assert(api._tareaFechaTipo({ servicio: 'Otro servicio' }) === null, 'No debe crear tareas para servicios ajenos.');
assert(api._tareaEstado({ fecha:'2026-08-06', nombre:'Paciente QA', servicio:'Descarga' }) === 'pendiente', 'El estado inicial debe ser pendiente.');

console.log(`FASE 18 VALIDADA: ${names.length} funciones de tareas y automatizaciones separadas con paridad exacta y sin llamadas nuevas al servidor.`);
