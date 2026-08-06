import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/packages.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  '_getPkAsignados','_getPkPlantillas','_savePkAsignados','_savePkPlantillas',
  'abrirModalPaquete','abrirModalPlantillaPaquete','ajustarSesiones',
  'borrarPaqueteAsignado','borrarPlantillaPaquete','renderPaquetes','usarSesion'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const referralsTag = '<script src="js/modules/referrals.js"></script>';
const packagesTag = '<script src="js/modules/packages.js"></script>';
assert(html.includes(packagesTag), 'index.html no carga packages.js.');
assert((html.match(/script src="js\/modules\/packages\.js"/g) || []).length === 1, 'packages.js debe cargarse una sola vez.');
assert(html.indexOf(referralsTag) >= 0 && html.indexOf(referralsTag) < html.indexOf(packagesTag), 'packages.js debe cargar después de referrals.js.');

for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en packages.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}
assert(moduleSource.includes('global.PanelPackages = Object.freeze'), 'PanelPackages no quedó exportado de forma controlada.');

for (const external of ['kvGet','kvSet','toast','today','fmtDate','parsePrecio']) {
  assert(!moduleSource.includes(`function ${external}(`) && !moduleSource.includes(`async function ${external}(`), `${external} debe permanecer compartida.`);
}
for (const forbidden of [
  'submitAdminBooking','guardarEdicion','changeStatus','saveManualPayment','verifyPayment',
  'passportSaveProgress','renderPassport','renderEquipo','renderBasedatos','renderCodigos',
  'renderFinanzas','renderKPITablero','renderAgenda','renderCalendar'
]) {
  assert(!moduleSource.includes(`function ${forbidden}(`) && !moduleSource.includes(`async function ${forbidden}(`), `${forbidden} no pertenece a packages.js.`);
}
assert(!/[?&]action=/.test(moduleSource), 'Paquetes no debe introducir llamadas API directas en esta fase.');

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, {filename:'inline-scripts.js'});
new vm.Script(moduleSource, {filename:modulePath});

function element(id) {
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
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, element(id));
    return elements.get(id);
  },
  querySelectorAll(){ return []; },
  querySelector(){ return null; },
  createElement(tag){ return element(tag); },
  body:{appendChild(){}}
};

const storage = new Map();
const toasts = [];
const prompts = [];
let confirmResult = true;
const context = {
  console, document, window:null, globalThis:null,
  Date, Math, JSON, Number, String, Object, Array, Set, Promise,
  encodeURIComponent, decodeURIComponent, parseInt, parseFloat, isNaN,
  allData:{
    citas:[{nombre:'Ana Pérez'},{nombre:'Carlos Ruiz'}],
    pacientes:[{nombre:'Ana Pérez'},{nombre:'Diana Gómez'}]
  },
  kvGet:key => storage.has(key) ? storage.get(key) : null,
  kvSet:(key,value) => storage.set(key,String(value)),
  toast:(message,type='ok') => toasts.push({message:String(message),type}),
  today:() => '2026-08-05',
  fmtDate:value => String(value || ''),
  parsePrecio:value => Number(String(value ?? 0).replace(/[^0-9.-]/g,'')) || 0,
  confirm:() => confirmResult,
  prompt:() => prompts.length ? prompts.shift() : null
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelPackages, 'PanelPackages no quedó disponible.');
for (const name of names) assert(typeof context.PanelPackages[name] === 'function', `PanelPackages.${name} no es función.`);

// Lectura segura y persistencia.
storage.set('pk_asignados', '{json inválido');
assert(context.PanelPackages._getPkAsignados().length === 0, 'JSON inválido de asignados no volvió a arreglo vacío.');
storage.delete('pk_asignados');
const plantillas = [{nombre:'Plan 6',sesiones:6,precio:390000,vigencia:60,servicios:'Readaptación'}];
const asignados = [
  {paciente:'Ana Pérez',telefono:'3000000001',nombre:'Plan 6',sesiones:6,consumidas:2,precio:390000,fechaCompra:'2026-08-01',vencimiento:'2026-09-30'},
  {paciente:'Carlos Ruiz',telefono:'3000000002',nombre:'Plan 4',sesiones:4,consumidas:4,precio:250000,fechaCompra:'2026-07-01',vencimiento:'2026-08-01'},
  {paciente:'Diana Gómez',telefono:'3000000003',nombre:'Plan 2',sesiones:2,consumidas:1,precio:140000,fechaCompra:'2026-08-01',vencimiento:'2026-08-10'}
];
context.PanelPackages._savePkPlantillas(plantillas);
context.PanelPackages._savePkAsignados(asignados);
assert(context.PanelPackages._getPkPlantillas().length === 1, 'No persistió plantillas.');
assert(context.PanelPackages._getPkAsignados().length === 3, 'No persistió asignados.');

// Renderizado de métricas, plantillas y alertas.
context.PanelPackages.renderPaquetes();
assert(document.getElementById('pkActivos').textContent === 2, 'El conteo de paquetes activos cambió.');
assert(document.getElementById('pkAgotados').textContent === 1, 'El conteo de agotados cambió.');
assert(document.getElementById('pkPorVencer').textContent === 1, 'El conteo de próximos a vencer cambió.');
assert(document.getElementById('pkValor').textContent.includes('530'), 'El valor activo no se calculó correctamente.');
assert(document.getElementById('pkPlantillas').innerHTML.includes('Plan 6'), 'No renderizó la plantilla.');
assert(document.getElementById('pkLista').innerHTML.includes('Ana Pérez'), 'No renderizó los paquetes asignados.');
assert(document.getElementById('pkLista').innerHTML.includes('Paquete agotado'), 'No renderizó la alerta de agotado.');
assert(document.getElementById('pkLista').innerHTML.includes('Última sesión restante'), 'No renderizó la alerta de última sesión.');

// Búsqueda.
document.getElementById('pkSearch').value = 'ana';
context.PanelPackages.renderPaquetes();
assert(document.getElementById('pkLista').innerHTML.includes('Ana Pérez'), 'La búsqueda no conservó la coincidencia.');
assert(!document.getElementById('pkLista').innerHTML.includes('Carlos Ruiz'), 'La búsqueda no filtró otros pacientes.');
document.getElementById('pkSearch').value = '';

// Apertura de modal y deduplicación de pacientes.
context.PanelPackages.abrirModalPaquete(0);
assert(document.getElementById('pkPlantillaSel').innerHTML.includes('selected'), 'No preseleccionó la plantilla.');
const patientOptions = document.getElementById('pkPacienteList').innerHTML;
assert((patientOptions.match(/Ana Pérez/g) || []).length === 1, 'No deduplicó pacientes de citas y base de datos.');
assert(patientOptions.includes('Diana Gómez'), 'No incluyó pacientes de la base de datos.');
assert(document.getElementById('pkFechaCompra').value === '2026-08-05', 'No precargó la fecha de compra.');
assert(document.getElementById('modalPaquete').style.display === 'flex', 'No abrió el modal de paquete.');
context.PanelPackages.abrirModalPlantillaPaquete();
assert(document.getElementById('modalPlantillaPaquete').style.display === 'flex', 'No abrió el modal de plantilla.');

// Consumir sesión y bloquear paquete agotado.
const toastBeforeUse = toasts.length;
context.PanelPackages.usarSesion(0);
let persisted = context.PanelPackages._getPkAsignados();
assert(persisted[0].consumidas === 3, 'Usar sesión no incrementó el consumo.');
assert(toasts.slice(toastBeforeUse).some(x => x.message.includes('3/6')), 'No confirmó el consumo de sesión.');
const beforeExhausted = persisted[1].consumidas;
context.PanelPackages.usarSesion(1);
persisted = context.PanelPackages._getPkAsignados();
assert(persisted[1].consumidas === beforeExhausted, 'Permitió consumir un paquete agotado.');
assert(toasts.some(x => x.message.includes('Paquete agotado') && x.type === 'err'), 'No avisó que el paquete estaba agotado.');

// Ajuste válido e inválido.
prompts.push('5');
context.PanelPackages.ajustarSesiones(0);
persisted = context.PanelPackages._getPkAsignados();
assert(persisted[0].consumidas === 5, 'No guardó el ajuste válido de sesiones.');
prompts.push('99');
context.PanelPackages.ajustarSesiones(0);
persisted = context.PanelPackages._getPkAsignados();
assert(persisted[0].consumidas === 5, 'Guardó un ajuste superior al total.');
assert(toasts.some(x => x.message.includes('No puede superar el total')), 'No avisó el ajuste superior al total.');

// Eliminación confirmada y cancelada.
confirmResult = false;
const countBeforeCancel = context.PanelPackages._getPkAsignados().length;
context.PanelPackages.borrarPaqueteAsignado(0);
assert(context.PanelPackages._getPkAsignados().length === countBeforeCancel, 'Eliminó un paquete sin confirmación.');
confirmResult = true;
context.PanelPackages.borrarPaqueteAsignado(1);
assert(context.PanelPackages._getPkAsignados().length === countBeforeCancel - 1, 'No eliminó el paquete confirmado.');
context.PanelPackages.borrarPlantillaPaquete(0);
assert(context.PanelPackages._getPkPlantillas().length === 0, 'No eliminó la plantilla confirmada.');

console.log('FASE 10 VALIDADA: plantillas, asignación, métricas, consumo, ajuste y eliminación preservados.');
