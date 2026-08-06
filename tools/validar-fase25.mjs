import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase24-index.html';
const indexPath = process.argv[3] || 'index.html';
const utilsPath = process.argv[4] || 'js/modules/shared-utils.js';
const storagePath = process.argv[5] || 'js/modules/shared-storage.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const utilsSource = fs.readFileSync(utilsPath, 'utf8');
const storageSource = fs.readFileSync(storagePath, 'utf8');

const utilityFunctions = [
  'esc','today','pad','parsePrecio','parsePrecioNum','toDateStr',
  'normDate','fmtDate','fmtPeso','toast','openModal','closeModal',
];
const storageFunctions = ['loadAdminKV','kvGet','kvSet','kvRemove','_flushKV'];
const storagePrivate = ['_gasKV','_kvDirty','_kvFlushTimer'];

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

function extractStorageBlock(text) {
  const startMarker = '// ── KV SYNC — datos persistentes sincronizados en todos los dispositivos via GAS ──';
  const endMarker = '\nlet TOKEN  = sessionStorage.getItem(\'adminToken\') || \'\';';
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start);
  assert(start >= 0 && end > start, 'No se encontró el bloque KV original.');
  return text.slice(start, end).trimEnd();
}

let moved = 0;
for (const name of utilityFunctions) {
  const original = extractNamedFunction(base, name);
  const adapter = extractNamedFunction(index, name);
  assert(utilsSource.includes(original), `${name}: perdió paridad con la Fase 24.`);
  assert(adapter.includes('window.PanelUtils') && adapter.includes(`module.${name}`), `${name}: adaptador inválido.`);
  assert(!index.includes(original), `${name}: implementación original permanece en index.html.`);
  moved++;
}
for (const name of storageFunctions) {
  const original = extractNamedFunction(base, name);
  const adapter = extractNamedFunction(index, name);
  assert(storageSource.includes(original), `${name}: perdió paridad con la Fase 24.`);
  assert(adapter.includes('window.PanelStorage') && adapter.includes(`module.${name}`), `${name}: adaptador KV inválido.`);
  assert(!index.includes(original), `${name}: implementación KV original permanece en index.html.`);
  moved++;
}
const originalStorage = extractStorageBlock(base);
assert(storageSource.includes(originalStorage), 'El bloque KV no conserva paridad exacta con la Fase 24.');
for (const name of storagePrivate) {
  assert(!new RegExp(`(?:^|\\n)(?:let|const|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`, 'm').test(index), `${name}: estado privado permanece en index.html.`);
}
assert(utilsSource.includes('global.PanelUtils = Object.freeze'), 'PanelUtils no expone una API congelada.');
assert(storageSource.includes('global.PanelStorage = Object.freeze'), 'PanelStorage no expone una API congelada.');

const utilsTag = '<script src="js/modules/shared-utils.js"></script>';
const storageTag = '<script src="js/modules/shared-storage.js"></script>';
const firstDomainTag = '<script src="js/modules/payments.js"></script>';
const utilsPos = index.indexOf(utilsTag);
const storagePos = index.indexOf(storageTag);
const domainPos = index.indexOf(firstDomainTag);
assert(utilsPos >= 0 && storagePos > utilsPos && domainPos > storagePos, 'Las dependencias compartidas no cargan antes de los módulos de dominio.');
for (const tag of [utilsTag,storageTag]) {
  assert(index.split(tag).length === 2, `${tag}: debe cargarse exactamente una vez.`);
}

// Las acciones de Apps Script ya existentes se conservan; no se crean acciones nuevas.
assert(storageSource.includes('action=getAdminKV'), 'Falta la acción existente getAdminKV.');
assert(storageSource.includes('action=setAdminKV'), 'Falta la acción existente setAdminKV.');
for (const forbidden of ['saveAdminKV','deleteAdminKV','patchAdminKV','migrateAdminKV']) {
  assert(!storageSource.includes(forbidden), `Acción KV nueva o inesperada: ${forbidden}.`);
}

// Smoke tests de utilidades.
const modalClasses = new Set();
const modal = {classList:{add:x=>modalClasses.add(x),remove:x=>modalClasses.delete(x)}};
const utilsContext = {
  window:null, globalThis:null, console, Date, Math, String, Number, Object, Array,
  document:{getElementById:id=>id === 'modalPrueba' ? modal : null},
  setTimeout:()=>1,
};
utilsContext.window = utilsContext;
utilsContext.globalThis = utilsContext;
vm.createContext(utilsContext);
vm.runInContext(utilsSource, utilsContext, {filename:utilsPath});
const U = utilsContext.PanelUtils;
assert(Object.isFrozen(U), 'PanelUtils no está congelado en ejecución.');
assert(U.pad(7) === '07' && U.pad(12) === '12', 'pad perdió comportamiento.');
assert(U.toDateStr(new Date(2026,7,6)) === '2026-08-06', 'toDateStr perdió fecha local.');
assert(U.normDate('06/08/2026') === '2026-08-06', 'normDate no normaliza DD/MM/YYYY.');
assert(U.normDate('2026-08-06T10:30:00') === '2026-08-06', 'normDate no normaliza ISO.');
assert(U.parsePrecio('$75.000') === 75000 && U.parsePrecioNum('$110.000') === 110000, 'Parseo monetario inválido.');
assert(U.fmtPeso(1234567) === '$1.234.567', 'fmtPeso perdió formato colombiano.');
assert(U.esc(`<>&"'`) === '&lt;&gt;&amp;&quot;&#39;', 'esc perdió protección HTML.');
U.openModal('modalPrueba');
assert(modalClasses.has('open'), 'openModal no abre el modal.');
U.closeModal('modalPrueba');
assert(!modalClasses.has('open'), 'closeModal no cierra el modal.');

// Smoke tests de almacenamiento sincronizado.
const local = new Map();
const scheduled = new Map();
const listeners = new Map();
const requests = [];
let timerId = 0;
const storageContext = {
  window:null, globalThis:null, console, Object, JSON, String,
  APPS_SCRIPT_URL:'https://example.test/exec', TOKEN:'token-prueba',
  encodeURIComponent,
  localStorage:{
    getItem:key=>local.has(key) ? local.get(key) : null,
    setItem:(key,value)=>local.set(key,String(value)),
    removeItem:key=>local.delete(key),
  },
  setTimeout:(fn)=>{ const id=++timerId; scheduled.set(id,fn); return id; },
  clearTimeout:id=>scheduled.delete(id),
  fetch:async (url,options={})=>{
    requests.push({url,options});
    if (url.includes('action=getAdminKV')) return {json:async()=>({ok:true,kv:{remoto:'valor'}})};
    return {json:async()=>({ok:true})};
  },
  addEventListener:(name,fn)=>listeners.set(name,fn),
};
storageContext.window = storageContext;
storageContext.globalThis = storageContext;
vm.createContext(storageContext);
vm.runInContext(storageSource, storageContext, {filename:storagePath});
const S = storageContext.PanelStorage;
assert(Object.isFrozen(S), 'PanelStorage no está congelado en ejecución.');
for (const name of storagePrivate) assert(S[name] === undefined, `${name} no quedó privado.`);
await S.loadAdminKV();
assert(S.kvGet('remoto') === 'valor' && local.get('remoto') === 'valor', 'loadAdminKV no sincroniza caché local.');
S.kvSet('prueba','123');
assert(S.kvGet('prueba') === '123' && local.get('prueba') === '123', 'kvSet/kvGet perdió comportamiento.');
await S._flushKV();
assert(requests.some(r=>r.url.includes('action=setAdminKV') && r.url.includes('prueba')), '_flushKV no envía el lote existente.');
S.kvRemove('prueba');
assert(S.kvGet('prueba') === null && !local.has('prueba'), 'kvRemove perdió comportamiento.');
assert(typeof listeners.get('beforeunload') === 'function', 'No se conservó la descarga al cerrar el navegador.');

// La integración no debe alterar propietarios funcionales ya definidos.
for (const shared of ['isOperationalDate','_sessionBridge','showView','renderKPITablero','renderPacientes','renderAgenda','renderFinanzas']) {
  const original = extractNamedFunction(base, shared);
  assert(index.includes(original), `${shared}: debía permanecer fuera de las utilidades compartidas.`);
}

console.log(`FASE 25 VALIDADA: ${moved} funciones, almacenamiento privado e integración final.`);
