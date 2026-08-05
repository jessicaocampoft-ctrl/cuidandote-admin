import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/appointment-edit.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'toggleReagendar','confirmarReagendar','guardarNotaAdmin','changeStatus','verDetalle',
  'cancelarCita','confirmarCancelacion','getCancelMotivos','saveCancelMotivo','getCancelMotivo',
  'esCancelExcluida','marcarErrorMio','editarCita','toggleDescuentoEdit','calcDescuentoEdit',
  'calcDescuentoMontoEdit','_showEditDescResult','quitarDescuentoEdit','getPrecioFinalEdit','guardarEdicion'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/appointment-edit.js"></script>'), 'index.html no carga appointment-edit.js.');
assert((html.match(/script src="js\/modules\/appointment-edit\.js"/g) || []).length === 1, 'appointment-edit.js debe cargarse una sola vez.');
assert(html.includes('let _cancelPendingId = null;'), 'El estado del modal de cancelación debe permanecer en index.html.');
assert(html.indexOf('appointment-create.js') < html.indexOf('appointment-edit.js'), 'appointment-edit.js debe cargar después de appointment-create.js.');

for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva su adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en appointment-edit.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}

assert(moduleSource.includes('action=editBooking'), 'El módulo no conserva la edición/reprogramación con editBooking.');
assert(moduleSource.includes('action=updateStatus'), 'El módulo no conserva el cambio de estado con updateStatus.');
assert(moduleSource.includes('action=cancelBooking'), 'El módulo no conserva la cancelación con cancelBooking.');
assert(!moduleSource.includes('action=adminBook'), 'La creación de citas no debe estar en 6B2.');
assert(!moduleSource.includes('action=savePayment'), 'Pagos no debe estar en 6B2.');
assert(!moduleSource.includes('passportSaveProgress'), 'Pasaporte no debe estar en 6B2.');

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, { filename:'inline-scripts.js' });
new vm.Script(moduleSource, { filename:modulePath });

function makeElement(id) {
  return {
    id,
    value:'', textContent:'', innerHTML:'', disabled:false, checked:false,
    selectedIndex:0, style:{display:'none',borderColor:''}, dataset:{},
    options:[], selectedOptions:[{dataset:{}}],
    focus(){ this.focused = true; },
    addEventListener(){}, dispatchEvent(){}, insertAdjacentHTML(){},
    querySelector(){ return makeElement(`${id}-child`); },
    classList:{ add(){}, remove(){}, toggle(){} }
  };
}

const elements = new Map();
const radios = [makeElement('motivo1'), makeElement('motivo2')];
radios[0].value = 'Paciente solicitó cancelar';
radios[1].value = 'Prueba interna';
const labels = radios.map((radio, index) => ({
  id:`label${index}`, style:{borderColor:''}, querySelector(){ return radio; }
}));
let selectedRadio = null;

const document = {
  body:{dataset:{}},
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelector(selector) {
    if (selector === 'input[name="motivoCancel"]:checked') return selectedRadio;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === 'input[name="motivoCancel"]') return radios;
    if (selector === '#motivoOpciones label') return labels;
    return [];
  },
  createElement(tag){ return makeElement(tag); }
};

const storage = new Map();
const localStorage = {
  getItem:key => storage.has(key) ? storage.get(key) : null,
  setItem:(key,value) => storage.set(key,String(value)),
  removeItem:key => storage.delete(key)
};

const calls = [];
const toasts = [];
let reloads = 0;
let openedModal = '';
let closedModal = '';
let renderCount = 0;
let fetchMode = 'ok';

const context = {
  console, document, localStorage,
  window:null, globalThis:null,
  Date, Math, JSON, Number, String, Object, Array, Promise,
  encodeURIComponent, decodeURIComponent, parseFloat, parseInt,
  APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  TOKEN:'TOKEN-QA',
  _cancelPendingId:null,
  allData:{citas:[{
    id:'C1', nombre:'QA Cita', telefono:'3000000000', email:'qa@example.com',
    servicio:'Valoración Funcional', modalidad:'Presencial', fecha:'2026-08-05',
    hora:'10:00', precio:'10000', notas:'Nota inicial', notaAdmin:'', estado:'Confirmada'
  }]},
  toast:(message,tone) => toasts.push({message,tone}),
  validateNoMidnight:() => true,
  reload:async () => { reloads++; },
  logChange(){},
  fmtDate:value => value,
  closeModal:id => { closedModal = id; },
  openModal:id => { openedModal = id; },
  initDashboard:() => { renderCount++; },
  renderAgenda:() => { renderCount++; },
  renderCalendar:() => { renderCount++; },
  renderIngresosDetalle:() => { renderCount++; },
  renderCitasResumen:() => { renderCount++; },
  updateBadge:() => { renderCount++; },
  waNombre:name => String(name || '').split(' ')[0],
  confirm:() => false,
  parsePrecio:value => Number(String(value || '').replace(/[^\d]/g,'')),
  formatPrecio:value => String(Math.round(Number(value || 0))),
  chipState:value => String(value || ''),
  detField:(label,value) => `${label}:${value}`,
  pagoBadge:() => '',
  esc:value => String(value == null ? '' : value),
  navigator:{clipboard:{writeText:async()=>{}}},
  fetch:async (url, options={}) => {
    calls.push({url:String(url),options});
    if (fetchMode === 'throw') throw new Error('Fallo QA');
    return {ok:true,json:async()=>({ok:true})};
  }
};
context.window = context;
context.globalThis = context;
context.window.open = () => {};
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelAppointmentEdit, 'PanelAppointmentEdit no quedó disponible.');
for (const name of names) assert(typeof context.PanelAppointmentEdit[name] === 'function', `PanelAppointmentEdit.${name} no es función.`);

// Reagendar: apertura y guardado.
document.getElementById('reagendarPanel_C1').style.display = 'none';
context.PanelAppointmentEdit.toggleReagendar('C1');
assert(document.getElementById('reagendarPanel_C1').style.display === 'block', 'No abrió el panel de reagendamiento.');
document.getElementById('rDate_C1').value = '2026-08-06';
document.getElementById('rTime_C1').value = '11:00';
const beforeReprogram = calls.length;
await context.PanelAppointmentEdit.confirmarReagendar('C1');
const reprogramCall = calls.slice(beforeReprogram).find(c => c.url.includes('action=editBooking'));
assert(reprogramCall, 'Reagendar no llamó editBooking.');
const reprogramData = JSON.parse(decodeURIComponent(new URL(reprogramCall.url).searchParams.get('data')));
assert(reprogramData.id === 'C1' && reprogramData.fecha === '2026-08-06' && reprogramData.hora === '11:00', 'Reagendar envió datos incorrectos.');
assert(reloads >= 1 && closedModal === 'modalDetalle', 'Reagendar no actualizó y cerró el detalle.');

// Cambio de estado.
const beforeStatus = calls.length;
await context.PanelAppointmentEdit.changeStatus('C1','Atendida');
assert(calls.slice(beforeStatus).some(c => c.url.includes('action=updateStatus') && c.url.includes('status=Atendida')), 'Cambio de estado no llamó updateStatus.');
assert(context.allData.citas[0].estado === 'Atendida', 'El estado local no se actualizó.');

// Cancelación con motivo.
context.PanelAppointmentEdit.cancelarCita('C1','QA Cita');
assert(context._cancelPendingId === 'C1', 'No conservó la cita pendiente de cancelación.');
selectedRadio = radios[0]; selectedRadio.checked = true;
const beforeCancel = calls.length;
await context.PanelAppointmentEdit.confirmarCancelacion();
assert(calls.slice(beforeCancel).some(c => c.url.includes('action=cancelBooking') && c.url.includes('id=C1')), 'Cancelar no llamó cancelBooking.');
assert(context.allData.citas[0].estado === 'Cancelada', 'La cita no quedó cancelada localmente.');
assert(document.getElementById('btnConfirmarCancelar').disabled === false, 'El botón de cancelación no se recuperó.');

// Edición completa.
context.allData.citas[0].estado = 'Confirmada';
document.getElementById('editId').value = 'C1';
document.getElementById('editServicio').value = 'Readaptación Funcional';
document.getElementById('editModalidad').value = 'Presencial';
document.getElementById('editFecha').value = '2026-08-07';
document.getElementById('editHora').value = '12:00';
document.getElementById('editPrecio').value = '70000';
document.getElementById('editNotas').value = 'Editada en QA';
document.getElementById('editDescPct').value = '';
document.getElementById('editDescMonto').value = '';
const beforeEdit = calls.length;
await context.PanelAppointmentEdit.guardarEdicion();
const editCall = calls.slice(beforeEdit).find(c => c.url.includes('action=editBooking'));
assert(editCall, 'Guardar edición no llamó editBooking.');
const editData = JSON.parse(decodeURIComponent(new URL(editCall.url).searchParams.get('data')));
assert(editData.servicio === 'Readaptación Funcional' && editData.fecha === '2026-08-07' && editData.hora === '12:00', 'La edición envió datos incorrectos.');
assert(document.getElementById('editSaveBtn').disabled === false && document.getElementById('editSaveBtn').textContent === 'Guardar cambios', 'El botón Guardar cambios no se recuperó.');
assert(closedModal === 'modalEditar', 'La edición no cerró su modal.');

// Error de red controlado y recuperación del botón.
fetchMode = 'throw';
document.getElementById('editFecha').value = '2026-08-08';
document.getElementById('editHora').value = '13:00';
const toastBeforeError = toasts.length;
await context.PanelAppointmentEdit.guardarEdicion();
assert(toasts.slice(toastBeforeError).some(x => x.tone === 'err'), 'El error de red no produjo mensaje visible.');
assert(document.getElementById('editSaveBtn').disabled === false, 'El botón quedó bloqueado después del error.');

console.log('FASE 6B2 VALIDADA: reprogramación, estado, cancelación y edición separadas y probadas.');
