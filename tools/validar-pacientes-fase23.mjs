import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase22-index.html';
const indexPath = process.argv[3] || 'index.html';
const searchPath = process.argv[4] || 'js/modules/patient-search.js';
const recordsPath = process.argv[5] || 'js/modules/patient-records.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const searchSource = fs.readFileSync(searchPath, 'utf8');
const recordsSource = fs.readFileSync(recordsPath, 'utf8');

const searchFunctions = ['globalSearch', 'searchPatient'];
const recordsFunctions = [
  'logChange', 'renderChangeLog', 'toggleChangeLog', 'clearChangeLog',
  'renderPacientes', 'verHistorial', 'verHistorialPac', '_renderHistorial',
  'exportarHistorialPaciente', 'editarPacienteIdx', 'editarPaciente',
  'guardarPaciente', 'borrarPaciente',
];

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

function validateGroup(names, moduleSource, panel) {
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 22.`);
    const adapter = extractNamedFunction(index, name);
    assert(adapter.includes(`window.${panel}`), `${name}: adaptador sin ${panel}.`);
    assert(adapter.includes(`module.${name}`), `${name}: adaptador sin delegación.`);
    assert(!index.includes(original), `${name}: implementación original todavía en index.html.`);
  }
  assert(moduleSource.includes(`global.${panel} = Object.freeze`), `Falta API congelada ${panel}.`);
}

validateGroup(searchFunctions, searchSource, 'PanelPatientSearch');
validateGroup(recordsFunctions, recordsSource, 'PanelPatientRecords');

const pacsDeclaration = extractDeclaration(base, '_pacs');
assert(recordsSource.includes(pacsDeclaration), '_pacs no quedó encapsulado con paridad exacta.');
assert(!index.includes(pacsDeclaration), '_pacs todavía permanece en index.html.');
assert(!index.includes('let _pacs'), 'Quedó otra declaración de _pacs en index.html.');

const commissionsTag = '<script src="js/modules/commissions.js"></script>';
const searchTag = '<script src="js/modules/patient-search.js"></script>';
const recordsTag = '<script src="js/modules/patient-records.js"></script>';
assert((index.match(/script src="js\/modules\/patient-search\.js"/g) || []).length === 1, 'patient-search.js debe cargarse una vez.');
assert((index.match(/script src="js\/modules\/patient-records\.js"/g) || []).length === 1, 'patient-records.js debe cargarse una vez.');
assert(index.indexOf(searchTag) > index.indexOf(commissionsTag), 'Búsqueda debe cargar después de Comisiones.');
assert(index.indexOf(recordsTag) > index.indexOf(searchTag), 'Pacientes debe cargar después de Búsqueda.');

assert(!searchSource.includes('fetch('), 'Búsqueda no debe hacer llamadas de red.');
assert(!searchSource.includes('APPS_SCRIPT_URL'), 'Búsqueda no debe depender de Apps Script.');
const baseRecordBodies = recordsFunctions.map(name => extractNamedFunction(base, name)).join('\n');
const baseActions = [...baseRecordBodies.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]).sort();
const moduleActions = [...recordsSource.matchAll(/action=([A-Za-z0-9_]+)/g)].map(m => m[1]).sort();
assert(JSON.stringify(baseActions) === JSON.stringify(moduleActions), 'Las acciones de servidor de pacientes cambiaron.');

for (const token of ['allData.citas', 'allData.pacientes', 'pacDropdown', 'telefono', 'email']) {
  assert(searchSource.includes(token), `Falta comportamiento de búsqueda: ${token}.`);
}
for (const token of ['adminChangeLog', '150', 'modalHistorial', 'modalHistorialContent', 'Blob', 'editPatient', 'deletePatient']) {
  assert(recordsSource.includes(token), `Falta comportamiento de pacientes/historial: ${token}.`);
}

// Las utilidades y adaptadores compartidos deben conservarse fuera de esta fase.
const originalNorm = extractNamedFunction(base, '_normStr');
assert(index.includes(originalNorm), '_normStr debe permanecer compartida en index.html.');
const fillAdapter = extractNamedFunction(index, 'fillPatient');
assert(fillAdapter.includes('window.PanelAppointmentCreate'), 'fillPatient dejó de delegar en PanelAppointmentCreate.');
assert((index.match(/script src="js\/modules\/database\.js"/g) || []).length === 1, 'database.js debe conservarse una sola vez.');

const searchElements = {fSearch: {value:''}};
let shown = '';
let rendered = 0;
const searchContext = {
  window: null, globalThis: null, console,
  allData: {citas:[{nombre:'Ana Pérez',telefono:'3001234567',email:'ana@example.com'}], pacientes:[]},
  showView: value => { shown = value; },
  renderAgenda: () => { rendered++; },
  document: {getElementById: id => searchElements[id] || null},
};
searchContext.window = searchContext;
searchContext.globalThis = searchContext;
vm.createContext(searchContext);
vm.runInContext(searchSource, searchContext, {filename: searchPath});
assert(searchContext.PanelPatientSearch && Object.isFrozen(searchContext.PanelPatientSearch), 'PanelPatientSearch no está congelado.');
for (const name of searchFunctions) assert(typeof searchContext.PanelPatientSearch[name] === 'function', `Falta ${name} en PanelPatientSearch.`);
searchContext.PanelPatientSearch.globalSearch('Ana');
assert(shown === 'agenda' && searchElements.fSearch.value === 'Ana' && rendered === 1, 'globalSearch no conserva la navegación y filtro de agenda.');

const store = new Map();
const countEl = {textContent:''};
const recordsContext = {
  window: null, globalThis: null, console,
  kvGet: key => store.get(key) || '',
  kvSet: (key, value) => store.set(key, value),
  kvRemove: key => store.delete(key),
  document: {getElementById: id => id === 'changeLogCount' ? countEl : null},
  Date,
};
recordsContext.window = recordsContext;
recordsContext.globalThis = recordsContext;
vm.createContext(recordsContext);
vm.runInContext(recordsSource, recordsContext, {filename: recordsPath});
assert(recordsContext.PanelPatientRecords && Object.isFrozen(recordsContext.PanelPatientRecords), 'PanelPatientRecords no está congelado.');
for (const name of recordsFunctions) assert(typeof recordsContext.PanelPatientRecords[name] === 'function', `Falta ${name} en PanelPatientRecords.`);
assert(recordsContext.PanelPatientRecords._pacs === undefined, '_pacs debe permanecer privada.');
for (let i = 0; i < 155; i++) recordsContext.PanelPatientRecords.logChange('Prueba', `Movimiento ${i}`);
const savedLog = JSON.parse(store.get('adminChangeLog'));
assert(savedLog.length === 150, 'logChange debe conservar el límite de 150 movimientos.');
assert(countEl.textContent === 150, 'logChange debe actualizar el contador.');

console.log(`FASE 23 VALIDADA: ${searchFunctions.length + recordsFunctions.length} funciones de pacientes, historial y búsqueda.`);
