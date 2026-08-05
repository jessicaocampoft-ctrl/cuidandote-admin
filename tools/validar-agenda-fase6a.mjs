import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/agenda.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const expected = [
  'goAgendaPatient','filtrarDia','smartAgendaFilter','renderAgenda','clearFilters','filtrarHoy',
  'calPrev','calNext','calToday','renderCalendar'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/agenda.js"></script>'), 'index.html no carga agenda.js.');
assert((html.match(/script src="js\/modules\/agenda\.js"/g) || []).length === 1, 'agenda.js debe cargarse una sola vez.');
assert(html.includes('function getMonday(d)'), 'getMonday debe permanecer en index.html para inicializar el calendario.');
assert(html.includes('let calWeekStart = getMonday(new Date());'), 'La inicialización de la semana debe permanecer intacta.');
assert(html.includes('let _agendaPage = 0;'), 'La paginación debe permanecer disponible para los handlers actuales.');
assert(html.includes('const AGENDA_PER_PAGE = 25;'), 'El tamaño de página debe permanecer intacto.');
assert(html.includes('let _calGCevents = [];'), 'La caché del calendario debe permanecer intacta.');

for (const name of expected) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva su adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en agenda.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada por PanelAgenda.`);
}

const forbidden = [
  'action=saveAppointment','action=updateAppointment','action=createAppointment',
  'action=changeAppointmentStatus','action=deleteAppointment',
  "method: 'POST'", 'method:"POST"'
];
for (const marker of forbidden) {
  assert(!moduleSource.includes(marker), `Agenda 6A contiene una operación de escritura prohibida: ${marker}`);
}

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, { filename:'inline-scripts.js' });
new vm.Script(moduleSource, { filename:modulePath });

const context = { console, Date };
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename:modulePath });
assert(context.PanelAgenda, 'PanelAgenda no quedó disponible.');
for (const name of expected) assert(typeof context.PanelAgenda[name] === 'function', `PanelAgenda.${name} no es función.`);

console.log('FASE 6A VALIDADA: Agenda y calendario separados sin operaciones de escritura.');
