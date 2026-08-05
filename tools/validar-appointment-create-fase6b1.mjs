import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/appointment-create.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const expected = [
  'bookWaitPatient','agendarHoy','calcAbono','validateNoMidnight','submitAdminBookingMulti',
  'agendarDesdePaciente','toggleNcAddress','_updateDuoTime','checkDomicilioWarn',
  'updateSesionesInfo','calcConvenio','autoFillPrice','submitAdminBooking','fillPatient',
  'clearNuevaCita','checkTimeConflict','openNuevaCitaFromCal','agendarDesdePacienteRec','agendarDesdeSeg'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/appointment-create.js"></script>'), 'index.html no carga appointment-create.js.');
assert((html.match(/script src="js\/modules\/appointment-create\.js"/g) || []).length === 1, 'appointment-create.js debe cargarse una sola vez.');
assert(html.includes('let _submittingBooking = false;'), 'El bloqueo de doble envío debe permanecer en index.html.');
assert(html.includes("let _scheduleMode    = 'unica';"), 'El modo de agenda debe permanecer en index.html.');
assert(html.includes('let _multiDates      = [];'), 'Las fechas múltiples deben permanecer en index.html.');
assert(html.includes('let _duoActive = false;'), 'El estado de segunda persona debe permanecer en index.html.');

for (const name of expected) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva su adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en appointment-create.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}
assert(!moduleSource.includes('function exportarHistorialPaciente('), 'La exportación de historial no debe estar en creación de citas.');
assert(!moduleSource.includes('function _parseVoice('), 'La herramienta de voz no debe estar en creación de citas.');
assert(!moduleSource.includes('action=updateAppointment'), 'La edición de citas no debe estar en 6B1.');
assert(!moduleSource.includes('action=changeAppointmentStatus'), 'Los cambios de estado no deben estar en 6B1.');
assert(!moduleSource.includes('action=deleteAppointment'), 'La eliminación no debe estar en 6B1.');

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, { filename:'inline-scripts.js' });
new vm.Script(moduleSource, { filename:modulePath });

function makeElement(id) {
  return {
    id,
    value:'',
    textContent:'',
    innerHTML:'',
    disabled:false,
    checked:false,
    selectedIndex:0,
    style:{ display:'', cssText:'' },
    dataset:{},
    options:[],
    selectedOptions:[{ dataset:{} }],
    files:[],
    focus(){ this.focused = true; },
    addEventListener(){},
    dispatchEvent(){},
    insertAdjacentHTML(){},
    classList:{ add(){}, remove(){}, toggle(){} }
  };
}

const elements = new Map();
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  createElement(tag){ return makeElement(tag); }
};

const calls = [];
const toasts = [];
let currentView = '';
let reloads = 0;
let agendaRenders = 0;
let dashboardRuns = 0;

const context = {
  console,
  document,
  window:null,
  globalThis:null,
  Date,
  Math,
  JSON,
  Number,
  String,
  Object,
  Array,
  Promise,
  encodeURIComponent,
  decodeURIComponent,
  parseFloat,
  parseInt,
  setTimeout:fn => { if (typeof fn === 'function') fn(); return 1; },
  clearTimeout(){},
  Event:class Event { constructor(type){ this.type = type; } },
  APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  TOKEN:'TOKEN-QA',
  _submittingBooking:false,
  _scheduleMode:'unica',
  _multiDates:[],
  _selectedServices:[],
  _duoActive:false,
  _getWaitList:() => [{id:'W1',nombre:'Lista QA',telefono:'3000000000',servicio:'Valoración Funcional'}],
  _getServiceDurationJS:() => 45,
  _calcRecDates:() => [],
  _renderMultiChips(){},
  _getPrecioServicio:() => 10000,
  costosReales:{},
  convenios:{},
  soloPresencial:[],
  sesionesPorPaquete:{},
  allData:{ citas:[] },
  showView:view => { currentView = view; },
  closeModal(){},
  toast:(message,tone) => { toasts.push({message,tone}); },
  today:() => '2026-08-06',
  isMidnightTime:value => /^00:/.test(String(value || '')),
  updateTimeHelp(){},
  parsePrecio:value => Number(String(value || '').replace(/[^\d]/g,'')),
  parsePrecioNum:value => Number(String(value || '').replace(/[^\d]/g,'')),
  formatPrecio:value => `$${Number(value || 0).toLocaleString('es-CO')}`,
  fmtPeso:value => `$${Number(value || 0).toLocaleString('es-CO')}`,
  getPrecioFinal:() => document.getElementById('ncPrice').value || '10000',
  getAbonoNota:() => '',
  logChange(){},
  reload:async () => { reloads++; },
  renderAgenda:() => { agendaRenders++; },
  initDashboard:() => { dashboardRuns++; },
  checkDomicilioWarn(){},
  updateSesionesInfo(){},
  calcConvenio(){},
  calcAbono(){},
  checkTimeConflict:() => false,
  autoFillPrice(){},
  toggleNcAddress(){},
  fetch:async (url, options={}) => {
    calls.push({url:String(url),options});
    return { ok:true, json:async () => ({ok:true}), text:async () => JSON.stringify({ok:true}) };
  }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });

assert(context.PanelAppointmentCreate, 'PanelAppointmentCreate no quedó disponible.');
for (const name of expected) assert(typeof context.PanelAppointmentCreate[name] === 'function', `PanelAppointmentCreate.${name} no es función.`);

context.PanelAppointmentCreate.agendarHoy();
assert(currentView === 'nueva', 'agendarHoy no abrió Nueva cita.');
assert(document.getElementById('ncDate').value === '2026-08-06', 'agendarHoy no precargó la fecha actual.');

context.PanelAppointmentCreate.bookWaitPatient('W1');
assert(document.getElementById('ncName').value === 'Lista QA', 'No se precargó el paciente de lista de espera.');

assert(context.PanelAppointmentCreate.validateNoMidnight('00:30','agendar') === false, 'Debe rechazar una hora de medianoche.');
assert(context.PanelAppointmentCreate.validateNoMidnight('12:00','agendar') === true, 'Debe aceptar 12:00 como mediodía.');

document.getElementById('ncMod').value = 'Domicilio';
context.PanelAppointmentCreate.toggleNcAddress();
assert(document.getElementById('ncAddrWrap').style.display === 'block', 'No mostró la dirección para domicilio.');

document.getElementById('ncName').value = 'QA Crear Cita';
document.getElementById('ncPhone').value = '3000000000';
document.getElementById('ncEmail').value = 'qa@example.com';
document.getElementById('ncService').value = 'Valoración Funcional';
document.getElementById('ncMod').value = 'Sede';
document.getElementById('ncDate').value = '2026-08-06';
document.getElementById('ncTime').value = '10:00';
document.getElementById('ncPrice').value = '10000';
document.getElementById('ncAddress').value = '';
document.getElementById('ncNotes').value = 'Prueba aislada';
document.getElementById('ncParaQuien').value = '';
document.getElementById('nuevaCitaCanal').value = 'Directo';
document.getElementById('ncConvenio').value = '';
document.getElementById('ncSubmitLabel').textContent = 'Crear cita';

await context.PanelAppointmentCreate.submitAdminBooking();
assert(calls.some(call => call.url.includes('action=adminBook')), 'submitAdminBooking no llamó adminBook.');
assert(context._submittingBooking === false, 'El bloqueo de envío no se recuperó.');
assert(reloads >= 1 && agendaRenders >= 1, 'No actualizó Agenda después de crear la cita.');

const callsBeforeMulti = calls.length;
context._scheduleMode = 'unica';
context._duoActive = false;
document.getElementById('ncName').value = 'QA Crear Múltiple';
document.getElementById('ncService').value = 'Valoración Funcional';
document.getElementById('ncMod').value = 'Sede';
document.getElementById('ncDate').value = '2026-08-07';
document.getElementById('ncTime').value = '11:00';
document.getElementById('ncPrice').value = '10000';
document.getElementById('ncSubmitLabel').textContent = 'Crear citas';
await context.PanelAppointmentCreate.submitAdminBookingMulti();
assert(calls.slice(callsBeforeMulti).some(call => call.url.includes('action=adminBook')), 'submitAdminBookingMulti no creó la cita única de prueba.');
assert(context._submittingBooking === false, 'El bloqueo del envío múltiple no se recuperó.');

console.log('FASE 6B1 VALIDADA: creación individual y múltiple separada y probada.');
