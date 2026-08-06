import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase23-index.html';
const indexPath = process.argv[3] || 'index.html';
const profilePath = process.argv[4] || 'js/modules/admin-profile-accessibility.js';
const emergencyPath = process.argv[5] || 'js/modules/emergency-manual.js';
const surveyPath = process.argv[6] || 'js/modules/survey-measurement.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const sources = {
  PanelAdminProfileUX: fs.readFileSync(profilePath, 'utf8'),
  PanelEmergencyManual: fs.readFileSync(emergencyPath, 'utf8'),
  PanelSurveyMeasurement: fs.readFileSync(surveyPath, 'utf8'),
};
const groups = {
  PanelAdminProfileUX: ['updateProfileCard','openCambiarPassword','cambiarPassword','initAdminUX2026','toggleDarkMode'],
  PanelEmergencyManual: ['renderEmergencia','toggleEmDim','toggleEmCard','handleEmStep','_persistEmStep','_updateEmProgress','loadAllEmSteps','markEmDone','resetEmSteps'],
  PanelSurveyMeasurement: ['getEncuestaStats','loadEncuestaStats','_renderEncuestaStatsUI','_rutinaKey','loadRutinaChecks','toggleRutinaCheck','resetRutina','resetRutinaGrupo'],
};

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
  assert(matches.length === 1, `${name}: declaración inesperada.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== ';') continue;
    const body = text.slice(start, i + 1);
    try { new vm.Script(body); return body.trimEnd(); } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

let total = 0;
for (const [panel, names] of Object.entries(groups)) {
  const moduleSource = sources[panel];
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    const adapter = extractNamedFunction(index, name);
    assert(moduleSource.includes(original), `${name}: perdió paridad con la Fase 23.`);
    assert(adapter.includes(`window.${panel}`) && adapter.includes(`module.${name}`), `${name}: adaptador inválido.`);
    assert(!index.includes(original), `${name}: implementación original permanece en index.html.`);
    total++;
  }
  assert(moduleSource.includes(`global.${panel} = Object.freeze`), `${panel}: API no congelada.`);
}
const rutinaDeclaration = extractDeclaration(base, 'RUTINA_IDS');
assert(sources.PanelSurveyMeasurement.includes(rutinaDeclaration), 'RUTINA_IDS no conserva paridad.');
assert(!index.includes(rutinaDeclaration) && !index.includes('const RUTINA_IDS'), 'RUTINA_IDS no quedó encapsulada.');

const anchor = '<script src="js/modules/patient-records.js"></script>';
const tags = [
  '<script src="js/modules/admin-profile-accessibility.js"></script>',
  '<script src="js/modules/emergency-manual.js"></script>',
  '<script src="js/modules/survey-measurement.js"></script>',
];
let pos = index.indexOf(anchor);
assert(pos >= 0, 'Falta ancla patient-records.js.');
for (const tag of tags) {
  const next = index.indexOf(tag);
  assert(next > pos, `${tag}: orden de carga incorrecto.`);
  assert((index.match(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 1, `${tag}: debe cargarse una vez.`);
  pos = next;
}

for (const shared of ['openEvalExpress','initFunctionalModules2026','applyRoleRestrictions','showView','getLeads','renderKPITablero','renderPacientes','waEncuesta']) {
  const original = extractNamedFunction(base, shared);
  assert(index.includes(original), `${shared}: debía permanecer en su ubicación compartida.`);
}

assert(!sources.PanelEmergencyManual.includes('fetch(') && !sources.PanelEmergencyManual.includes('APPS_SCRIPT_URL'), 'El manual de emergencia no debe usar red.');
assert(sources.PanelAdminProfileUX.includes("action: 'changePassword'"), 'Falta acción existente changePassword.');
assert(sources.PanelSurveyMeasurement.includes('action=getEncuestaStats'), 'Falta acción existente getEncuestaStats.');
for (const forbidden of ['editPatient','deletePatient','sendReminders','createAppointment']) {
  assert(!sources.PanelAdminProfileUX.includes(forbidden) && !sources.PanelSurveyMeasurement.includes(forbidden), `Acción fuera de alcance: ${forbidden}.`);
}

const storage = new Map();
const profileDocument = {
  documentElement: {
    attrs: new Map([['data-theme','']]),
    getAttribute(name) { return this.attrs.get(name) || ''; },
    setAttribute(name, value) { this.attrs.set(name, value); },
  },
  getElementById: id => id === 'darkModeTxt' ? {textContent:''} : null,
};
const profileContext = {
  window: null, globalThis: null, console,
  document: profileDocument,
  localStorage: {setItem:(k,v)=>storage.set(k,v)},
};
profileContext.window = profileContext; profileContext.globalThis = profileContext;
vm.createContext(profileContext);
vm.runInContext(sources.PanelAdminProfileUX, profileContext, {filename: profilePath});
assert(Object.isFrozen(profileContext.PanelAdminProfileUX), 'PanelAdminProfileUX no está congelado.');
profileContext.PanelAdminProfileUX.toggleDarkMode();
assert(profileDocument.documentElement.getAttribute('data-theme') === 'dark' && storage.get('adminDarkMode') === 'dark', 'toggleDarkMode perdió comportamiento.');

const emStore = new Map();
const emergencyContext = {
  window: null, globalThis: null, console,
  kvGet:key=>emStore.get(key)||'', kvSet:(key,val)=>emStore.set(key,val), kvRemove:key=>emStore.delete(key),
  document:{getElementById:()=>null},
};
emergencyContext.window = emergencyContext; emergencyContext.globalThis = emergencyContext;
vm.createContext(emergencyContext);
vm.runInContext(sources.PanelEmergencyManual, emergencyContext, {filename: emergencyPath});
assert(Object.isFrozen(emergencyContext.PanelEmergencyManual), 'PanelEmergencyManual no está congelado.');
emergencyContext.PanelEmergencyManual._persistEmStep('sesiones', 1, true);
const emSaved = JSON.parse(emStore.get('em_steps_sesiones'));
assert(emSaved[1] === true, 'Persistencia del manual de emergencia falló.');
emergencyContext.PanelEmergencyManual.resetEmSteps('sesiones', 2);
assert(!emStore.has('em_steps_sesiones'), 'Reinicio del manual de emergencia falló.');

const surveyStore = new Map([['encuestaStats','{dañado']]);
const surveyContext = {
  window:null, globalThis:null, console, Date, setTimeout,
  kvGet:key=>surveyStore.get(key)||'', kvSet:(key,val)=>surveyStore.set(key,val), kvRemove:key=>surveyStore.delete(key),
  document:{getElementById:()=>null}, toast:()=>{},
};
surveyContext.window = surveyContext; surveyContext.globalThis = surveyContext;
vm.createContext(surveyContext);
vm.runInContext(sources.PanelSurveyMeasurement, surveyContext, {filename: surveyPath});
assert(Object.isFrozen(surveyContext.PanelSurveyMeasurement), 'PanelSurveyMeasurement no está congelado.');
assert(Object.keys(surveyContext.PanelSurveyMeasurement.getEncuestaStats()).length === 0, 'Encuestas no se recuperan de JSON dañado.');
const key = surveyContext.PanelSurveyMeasurement._rutinaKey();
assert(/^rutina_\d{4}-\d{2}-\d{2}$/.test(key), 'Clave diaria de rutina inválida.');
surveyStore.set(key, '{dañado');
surveyContext.PanelSurveyMeasurement.loadRutinaChecks();
assert(surveyContext.PanelSurveyMeasurement.RUTINA_IDS === undefined, 'RUTINA_IDS debe permanecer privada.');

console.log(`FASE 24 VALIDADA: ${total} funciones y RUTINA_IDS.`);
