import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/team.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  'byIdFrom','assignmentFor','professionalName','loadTeamData','activeProfessionals',
  'teamCleanText','teamAppointmentById','teamAssignedAppointments','teamIsInactiveAppointment',
  'teamDateCode','teamAvailabilityDays','teamTimeToMinutes','teamAvailabilityRange',
  'teamAvailabilityIssues','teamConflictAppointments','renderTeamOperations','renderEquipo',
  'openProfessionalSchedule','openProfessionalForm','showTemporaryPassword','copyTempPassword',
  'saveProfessionalForm','resetProPassword','togglePro','deletePro','abrirAsignarPro',
  'renderAssignWarnings','saveAssignPro','authorizeAssignPro','markPayablePaid',
  'setProfessionalMode','renderProfessionalAgenda','markProfessionalAttended',
  'openProIssue','sendProfessionalIssue'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/team.js"></script>'), 'index.html no carga team.js.');
assert((html.match(/script src="js\/modules\/team\.js"/g) || []).length === 1, 'team.js debe cargarse una sola vez.');
assert(html.indexOf('appointment-edit.js') < html.indexOf('team.js'), 'team.js debe cargar después de appointment-edit.js.');

for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en team.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}

assert(!moduleSource.includes('function loadProfessionalAgenda('), 'loadProfessionalAgenda pertenece a Sesión y no debe moverse a team.js.');
assert(!moduleSource.includes('function professionalSignout('), 'professionalSignout pertenece a Sesión.');
assert(/function\s+loadProfessionalAgenda\s*\([^)]*\)\s*\{[\s\S]{0,300}PanelSession/.test(html), 'El adaptador loadProfessionalAgenda dejó de apuntar a Sesión.');
assert(/function\s+professionalSignout\s*\([^)]*\)\s*\{[\s\S]{0,300}PanelSession/.test(html), 'professionalSignout dejó de apuntar a Sesión.');

for (const forbidden of ['saveManualPayment','verifyPayment','renderPagos','submitAdminBooking','guardarEdicion','passportSaveProgress']) {
  assert(!moduleSource.includes(`function ${forbidden}(`) && !moduleSource.includes(`async function ${forbidden}(`), `${forbidden} no pertenece a Equipo clínico.`);
}

for (const action of [
  'teamData','saveProfessional','resetProfessionalPassword','toggleProfessional','deleteProfessional',
  'assignProfessional','authorizeAppointment','markPayablePaid','professionalMarkAttended','professionalReportIssue'
]) {
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
    focus(){}, select(){}, remove(){}, addEventListener(){}, querySelector(){return null;}
  };
}
const elements = new Map();
const document = {
  getElementById(id){ if (!elements.has(id)) elements.set(id, el(id)); return elements.get(id); },
  querySelectorAll(){ return []; },
  createElement(tag){ return el(tag); },
  body:{appendChild(){}}
};

const calls = [];
const toasts = [];
let professionalReloads = 0;
let fetchResponse = {ok:true};
const context = {
  console, document, window:null, globalThis:null,
  Date, Math, JSON, Number, String, Object, Array, Set, Promise, URLSearchParams,
  encodeURIComponent, decodeURIComponent, parseInt, parseFloat,
  APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  TOKEN:'ADMIN-QA', PROFESSIONAL_TOKEN:'PRO-QA',
  professionalMode:'hoy', professionalAgenda:[], professionalSession:{nombre:'QA Pro'},
  teamData:{profesionales:[], asignaciones:[], novedades:[], auditoria:[], cuentas:[]},
  allData:{citas:[
    {id:'C1',nombre:'Paciente Uno',fecha:'2026-08-05',hora:'10:00',servicio:'Valoración Funcional',estado:'Confirmada'},
    {id:'C2',nombre:'Paciente Dos',fecha:'2026-08-05',hora:'10:00',servicio:'Valoración Funcional',estado:'Confirmada'}
  ]},
  isOperationalDate:() => true,
  normDate:value => String(value || '').slice(0,10),
  today:() => '2026-08-05',
  fmtDate:value => String(value || ''),
  formatPrecio:value => String(value || ''),
  esc:value => String(value == null ? '' : value),
  toast:(message,tone) => toasts.push({message,tone}),
  closeModal(){}, openModal(){}, renderAgenda(){},
  loadProfessionalAgenda:async () => { professionalReloads++; },
  confirm:() => true,
  navigator:{clipboard:{writeText:async()=>{}}},
  fetch:async (url, options={}) => {
    calls.push({url:String(url),options});
    return {json:async()=>fetchResponse};
  }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelTeam, 'PanelTeam no quedó disponible.');
for (const name of names) assert(typeof context.PanelTeam[name] === 'function', `PanelTeam.${name} no es función.`);

const days = context.PanelTeam.teamAvailabilityDays('Lun-vie 8:00 a 18:00');
assert(days.has('LUN') && days.has('VIE') && !days.has('SAB'), 'La disponibilidad por días no se interpretó correctamente.');
const range = context.PanelTeam.teamAvailabilityRange('Lun-vie 8:00 a 18:00');
assert(range && range.start === 480 && range.end === 1080, 'El rango horario no se interpretó correctamente.');

context.teamData = {
  profesionales:[{id:'P1',nombre:'Fisio QA',estado:'Activo',disponibilidad:'Lun-vie 8:00 a 18:00',servicios:'Valoración'}],
  asignaciones:[{CitaID:'C2',ProfesionalID:'P1',EstadoAutorizacion:'Autorizada',Tarifa:'50000'}],
  novedades:[],auditoria:[],cuentas:[]
};
const conflicts = context.PanelTeam.teamConflictAppointments('P1', context.allData.citas[0]);
assert(conflicts.length === 1 && conflicts[0].id === 'C2', 'No detectó el choque de horario del profesional.');

fetchResponse = {
  ok:true,
  profesionales:[{id:'P1',nombre:'Fisio QA',estado:'Activo'}],
  asignaciones:[{CitaID:'C1',ProfesionalID:'P1',EstadoAutorizacion:'Autorizada',Tarifa:'50000'}],
  novedades:[],auditoria:[],cuentas:[]
};
await context.PanelTeam.loadTeamData();
assert(calls.some(c => c.url.includes('action=teamData')), 'loadTeamData no consultó teamData.');
assert(context.allData.citas[0].profesionalId === 'P1', 'loadTeamData no enlazó la asignación con la cita.');

fetchResponse = {ok:true};
const callsBeforeAttend = calls.length;
await context.PanelTeam.markProfessionalAttended('C1');
const attendedCall = calls.slice(callsBeforeAttend).find(c => c.options?.method === 'POST');
assert(attendedCall, 'No se envió la sesión atendida.');
const attendedBody = JSON.parse(attendedCall.options.body);
assert(attendedBody.action === 'professionalMarkAttended' && attendedBody.citaId === 'C1', 'La sesión atendida envió datos incorrectos.');
assert(professionalReloads === 1, 'No recargó la agenda profesional después de marcar atendida.');

document.getElementById('proIssueCitaId').value = 'C1';
document.getElementById('proIssueTipo').value = 'Paciente no responde';
document.getElementById('proIssueObs').value = 'Prueba QA';
const callsBeforeIssue = calls.length;
await context.PanelTeam.sendProfessionalIssue();
const issueCall = calls.slice(callsBeforeIssue).find(c => c.options?.method === 'POST');
assert(issueCall, 'No se envió la novedad profesional.');
const issueBody = JSON.parse(issueCall.options.body);
assert(issueBody.action === 'professionalReportIssue' && issueBody.citaId === 'C1', 'La novedad profesional envió datos incorrectos.');

console.log('FASE 7 VALIDADA: Equipo clínico separado, acciones y aislamiento comprobados.');
