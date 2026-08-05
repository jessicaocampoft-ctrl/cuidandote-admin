import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/database.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'initFormDB','renderBasedatos','renderReactivacion','limpiarFormDB','agregarPacienteDB',
  'checkDupDB','dbEditarPac','guardarPacienteDB','dbBorrarPac','dbOnOrigenChange',
  'dbReferidoFilter','recCard','recEnviado','recEmailEnviado','_updateReacBtn',
  'msgSemana4','msgSemana5','waRecordatorio'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/database.js"></script>'), 'index.html no carga database.js.');
assert((html.match(/script src="js\/modules\/database\.js"/g) || []).length === 1, 'database.js debe cargarse una sola vez.');
assert(html.indexOf('team.js') < html.indexOf('database.js'), 'database.js debe cargar después de team.js.');

for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en database.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}

assert(!/\blet\s+_dbPacs\s*=/.test(html), '_dbPacs no debe seguir declarado en index.html.');
assert((moduleSource.match(/\blet\s+_dbPacs\s*=/g) || []).length === 1, '_dbPacs debe quedar encapsulado una sola vez.');
assert(moduleSource.includes('global.PanelDatabase = Object.freeze'), 'PanelDatabase no quedó exportado de forma controlada.');

const mustRemainExternal = [
  'showView','agendarDesdePacienteRec','usarSesion','logChange','renderChangeLog',
  'toggleChangeLog','clearChangeLog'
];
for (const name of mustRemainExternal) {
  assert(!moduleSource.includes(`function ${name}(`) && !moduleSource.includes(`async function ${name}(`), `${name} no pertenece a database.js.`);
  assert(new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(`).test(html), `${name} dejó de existir en index.html.`);
}
assert(/function\s+agendarDesdePacienteRec\s*\([^)]*\)\s*\{[\s\S]{0,350}PanelAppointmentCreate/.test(html), 'agendarDesdePacienteRec dejó de apuntar a Crear cita.');

for (const forbidden of [
  'renderCalendar','submitAdminBooking','guardarEdicion','saveManualPayment','passportSaveProgress',
  'renderEquipo','usarSesion','renderFinanzas','renderKPITablero'
]) {
  assert(!moduleSource.includes(`function ${forbidden}(`) && !moduleSource.includes(`async function ${forbidden}(`), `${forbidden} no pertenece a Base de datos.`);
}

for (const action of ['adminBook','deletePatient','editPatient','generarCodigo','registrarCodigo']) {
  assert(moduleSource.includes(action), `No se conservó la acción ${action}.`);
}

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, {filename:'inline-scripts.js'});
new vm.Script(moduleSource, {filename:modulePath});

function el(id) {
  return {
    id, value:'', textContent:'', innerHTML:'', disabled:false, checked:false,
    style:{display:'none'}, dataset:{}, selectedIndex:0,
    classList:{add(){},remove(){},toggle(){}},
    focus(){}, select(){}, remove(){}, addEventListener(){}, querySelector(){return null;},
    setAttribute(){}, appendChild(){}, click(){}
  };
}
const elements = new Map();
const document = {
  getElementById(id){ if (!elements.has(id)) elements.set(id, el(id)); return elements.get(id); },
  querySelectorAll(){ return []; },
  createElement(tag){ return el(tag); },
  body:{appendChild(){}}
};

const kv = new Map();
const context = {
  console, document, window:null, globalThis:null,
  Date, Math, JSON, Number, String, Object, Array, Set, Promise, URLSearchParams,
  encodeURIComponent, decodeURIComponent, parseInt, parseFloat,
  allData:{
    pacientes:[{nombre:'Ana García López',telefono:'3001234567',email:'ana@example.com'}],
    citas:[{id:'C1',nombre:'Paciente Dos',telefono:'3010000000',servicio:'Valoración Funcional',fecha:'2026-08-01',estado:'Atendida'}]
  },
  TOKEN:'ADMIN-QA', APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  _submittingPatient:false,
  esRegistroServ:() => false,
  normDate:value => String(value || '').slice(0,10),
  toLocalDateStr:value => String(value || '').slice(0,10),
  today:() => '2026-08-05',
  fmtDate:value => String(value || ''),
  toast(){}, closeModal(){}, openModal(){}, initDashboard(){}, renderPaquetes(){},
  logChange(){}, agendarDesdePacienteRec(){}, marcarRecordatorioEnviado(){}, enviarEmailUno:async()=>({ok:true}),
  kvGet:key => kv.get(key) || '',
  kvSet:(key,value) => kv.set(key,value),
  kvRemove:key => kv.delete(key),
  confirm:() => true,
  fetch:async () => ({json:async()=>({ok:true})}),
  location:{reload(){}},
  navigator:{clipboard:{writeText:async()=>{}}}
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelDatabase, 'PanelDatabase no quedó disponible.');
for (const name of names) assert(typeof context.PanelDatabase[name] === 'function', `PanelDatabase.${name} no es función.`);

const msg4 = context.PanelDatabase.msgSemana4('Ana García');
const msg5 = context.PanelDatabase.msgSemana5('Ana García');
assert(msg4.includes('Ana') && msg4.includes('4 semanas'), 'El mensaje de reactivación de 4 semanas cambió.');
assert(msg5.includes('Ana') && msg5.includes('5 semanas'), 'El mensaje de reactivación de 5 semanas cambió.');
const wa = context.PanelDatabase.waRecordatorio('3001234567', 'Ana García', 4);
assert(wa.startsWith('https://wa.me/573001234567?text='), 'El enlace de WhatsApp de reactivación cambió.');

document.getElementById('dbNombre').value = 'Ana García';
context.PanelDatabase.checkDupDB();
assert(document.getElementById('dbDupWarn').style.display === 'block', 'No detectó el paciente duplicado.');
assert(document.getElementById('dbDupName').textContent === 'Ana García López', 'No mostró el nombre duplicado correcto.');

document.getElementById('dbOrigen').value = 'Referido';
context.PanelDatabase.dbOnOrigenChange();
assert(document.getElementById('dbReferidoPorWrap').style.display === 'block', 'No mostró el campo de referido.');
assert(document.getElementById('dbOrigenSub').style.display === 'none', 'Mostró un campo secundario incorrecto para Referido.');

document.getElementById('dbOrigen').value = 'Gimnasio';
context.PanelDatabase.dbOnOrigenChange();
assert(document.getElementById('dbOrigenSub').style.display === 'block', 'No mostró la entidad para Gimnasio.');
assert(document.getElementById('dbReferidoPorWrap').style.display === 'none', 'No ocultó el referido para Gimnasio.');

console.log('FASE 8 VALIDADA: Base de datos y reactivación separadas, puentes externos preservados.');
