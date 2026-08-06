import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase21-index.html';
const indexPath = process.argv[3] || 'index.html';
const modulePath = process.argv[4] || 'js/modules/commissions.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const functions = [
  '_comisGetConfig', 'saveComisConfig', 'toggleComisConfig', '_initComisMesSel',
  '_comisMesVal', '_comisSemanasLlenas', '_comisReactivaciones', '_comisReventas',
  '_comisVentasCruzadas', '_comisCruzadaAsign', 'setCruzadaAsign', '_comisManualReact',
  '_comisSetManualReact', 'addManualReactivacion', 'removeManualReactivacion',
  'marcarComisionPagada', 'desmarcarComisionPagada', 'renderComisiones',
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

for (const name of functions) {
  const original = extractNamedFunction(base, name);
  assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 21.`);
  const adapter = extractNamedFunction(index, name);
  assert(adapter.includes('window.PanelCommissions'), `${name}: el adaptador no usa PanelCommissions.`);
  assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
  assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
}

assert(moduleSource.includes('global.PanelCommissions = Object.freeze'), 'Falta la API congelada PanelCommissions.');
assert(!moduleSource.includes('fetch('), 'Comisiones no debe realizar llamadas de red.');
assert(!moduleSource.includes('APPS_SCRIPT_URL'), 'Comisiones no debe depender directamente de Apps Script.');
assert(!/action=[A-Za-z0-9_]+/.test(moduleSource), 'Comisiones introdujo una acción de servidor.');

const eventsTag = '<script src="js/modules/events-agreements.js"></script>';
const commissionsTag = '<script src="js/modules/commissions.js"></script>';
assert((index.match(/script src="js\/modules\/commissions\.js"/g) || []).length === 1, 'commissions.js debe cargarse una sola vez.');
assert(index.indexOf(commissionsTag) > index.indexOf(eventsTag), 'Comisiones debe cargarse después de la Fase 21.');

for (const token of [
  'META_SESIONES_SEMANA', 'function getLeadsMes(', 'function getKPIManual(',
  'function getEncuestaStats(', 'function citasReales(',
]) {
  assert(index.includes(token), `La dependencia compartida debe permanecer en index.html: ${token}`);
}
const teamAdapter = extractNamedFunction(index, 'markPayablePaid');
assert(teamAdapter.includes('window.PanelTeam'), 'markPayablePaid debe continuar en PanelTeam.');
assert(index.includes('js/modules/patient-recovery.js'), 'Las comisiones de recuperación deben continuar en patient-recovery.js.');

for (const token of [
  "kvGet('comisiones_config')", "kvSet('comisiones_config'", "comis_pago_",
  "comis_cruzada_", "comis_react_", 'Auxiliar Administrativa',
  'Fisioterapeuta de Apoyo', 'Persona del video',
]) {
  assert(moduleSource.includes(token), `Falta comportamiento de comisiones: ${token}`);
}

if (!Date.prototype.toLocalDateStr) {
  Date.prototype.toLocalDateStr = function () {
    return this.getFullYear() + '-' + String(this.getMonth() + 1).padStart(2, '0') + '-' + String(this.getDate()).padStart(2, '0');
  };
}
const store = new Map();
const context = {
  window: null,
  globalThis: null,
  console,
  Date,
  String,
  Number,
  Math,
  JSON,
  Object,
  Array,
  Map,
  Set,
  parseInt,
  parseFloat,
  META_SESIONES_SEMANA: 20,
  kvGet: key => store.get(key) || '',
  kvSet: (key, value) => { store.set(key, String(value)); },
  kvRemove: key => { store.delete(key); },
  normDate: value => value instanceof Date ? value.toLocalDateStr() : String(value || '').split('T')[0],
  parsePrecio: value => parseInt(String(value || '').replace(/\D/g, ''), 10) || 0,
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename: modulePath});
const api = context.PanelCommissions;
assert(api && Object.isFrozen(api), 'PanelCommissions no está disponible o no está congelado.');
for (const name of functions) assert(typeof api[name] === 'function', `Falta ${name} en PanelCommissions.`);

const defaults = api._comisGetConfig();
assert(defaults.bono_agenda === 80000, 'El bono de agenda por defecto cambió.');
assert(defaults.ses_llena === 20, 'La meta semanal dejó de usar META_SESIONES_SEMANA.');
assert(defaults.bono_react === 15000 && defaults.pct_reventa === 5, 'Los valores predeterminados cambiaron.');
store.set('comisiones_config', '{mal-json');
assert(api._comisGetConfig().bono_agenda === 80000, 'La configuración dañada no recupera los valores predeterminados.');
store.delete('comisiones_config');

const semanas = api._comisSemanasLlenas([
  {fecha:'2026-08-03', estado:'Atendida'},
  {fecha:'2026-08-04', estado:'Confirmada'},
  {fecha:'2026-08-05', estado:'Cancelada'},
], [], 2026, 8, 2);
assert(semanas.some(item => item.llena && item.sesiones === 2), 'El cálculo de semana llena cambió.');

const citas = [
  {nombre:'Ana Pérez', fecha:'2026-05-01', estado:'Atendida', servicio:'Valoración', precio:'$80.000'},
  {nombre:'Ana Pérez', fecha:'2026-08-10', estado:'Atendida', servicio:'Plan Activo', precio:'$100.000'},
  {nombre:'Ana Pérez', fecha:'2026-08-12', estado:'Atendida', servicio:'Descarga completa', precio:'$110.000'},
];
const reactivaciones = api._comisReactivaciones(citas, 2026, 8);
assert(reactivaciones.length === 1 && reactivaciones[0].nombre === 'Ana Pérez', 'La detección de reactivaciones cambió.');
const reventas = api._comisReventas(citas, 2026, 8, ['plan activo'], 5);
assert(reventas.length === 1 && reventas[0].comision === 5000, 'El cálculo de reventas cambió.');
const cruzadas = api._comisVentasCruzadas(citas, 2026, 8, 'descarga');
assert(cruzadas.length === 1 && cruzadas[0].nombre === 'Ana Pérez', 'La detección de venta cruzada cambió.');
store.set('comis_react_2026-08', '{mal-json');
assert(Array.isArray(api._comisManualReact(2026, 8)) && api._comisManualReact(2026, 8).length === 0, 'La recuperación de reactivaciones manuales cambió.');

console.log(`FASE 22 VALIDADA: ${functions.length} funciones de comisiones con paridad, comportamiento y aislamiento.`);
