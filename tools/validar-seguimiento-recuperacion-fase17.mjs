import fs from 'node:fs';
import vm from 'node:vm';

const basePath = process.argv[2] || '/tmp/fase16-index.html';
const indexPath = process.argv[3] || 'index.html';
const followPath = process.argv[4] || 'js/modules/patient-follow-up.js';
const recoveryPath = process.argv[5] || 'js/modules/patient-recovery.js';

const base = fs.readFileSync(basePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const followSource = fs.readFileSync(followPath, 'utf8');
const recoverySource = fs.readFileSync(recoveryPath, 'utf8');

const followNames = [
  'toggleSegFiltro','segReagendo','segToggleR','segWaSent','segMarkWa','segLogAction',
  'limpiarLogSeguimiento','esDescargaMusc','esReadaptacion','readapZona','setReadapZona',
  'renderSeguimiento','_renderSegLista','_segCard','_segCardReadap','_renderSegLog',
  'exportarSeguimientoCSV',
];
const recoveryNames = [
  '_loadRec','_saveRec','_fmtCLP','_recMesActual','_initRecMesSel','renderRecuperaciones',
  'registrarRecuperacion','marcarPagado','desmarcarPago','eliminarRecuperacion',
  'pagarTodasComisiones','cargarInactivos','_recPreguntaDolencia','_renderRecMsgSelector',
  'renderInactivos','_waIconSvg','_recInactivoCard','preRellenaRecuperacion',
];

function assert(condition, message) { if (!condition) throw new Error(message); }

function skipQuoted(text, start, quote) {
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === quote) return i + 1;
  }
  return text.length;
}
function skipLineComment(text, start) {
  const end = text.indexOf('\n', start + 2);
  return end < 0 ? text.length : end;
}
function skipBlockComment(text, start) {
  const end = text.indexOf('*/', start + 2);
  return end < 0 ? text.length : end + 2;
}
function skipTemplateExpression(text, start) {
  let depth = 1;
  for (let i = start; i < text.length;) {
    const ch = text[i], next = text[i + 1];
    if (ch === "'" || ch === '"') { i = skipQuoted(text, i, ch); continue; }
    if (ch === '`') { i = skipTemplate(text, i); continue; }
    if (ch === '/' && next === '/') { i = skipLineComment(text, i); continue; }
    if (ch === '/' && next === '*') { i = skipBlockComment(text, i); continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return text.length;
}
function skipTemplate(text, start) {
  for (let i = start + 1; i < text.length;) {
    const ch = text[i], next = text[i + 1];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '`') return i + 1;
    if (ch === '$' && next === '{') { i = skipTemplateExpression(text, i + 2); continue; }
    i++;
  }
  return text.length;
}
function skipSpecial(text, i) {
  const ch = text[i], next = text[i + 1];
  if (ch === "'" || ch === '"') return skipQuoted(text, i, ch);
  if (ch === '`') return skipTemplate(text, i);
  if (ch === '/' && next === '/') return skipLineComment(text, i);
  if (ch === '/' && next === '*') return skipBlockComment(text, i);
  return i;
}

function findBodyBrace(text, start) {
  const openParen = text.indexOf('(', start);
  assert(openParen >= 0, 'No se encontró apertura de parámetros.');
  let depth = 0;
  for (let i = openParen; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return text.indexOf('{', i + 1);
    }
    i++;
  }
  return -1;
}

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = findBodyBrace(text, start);
  assert(brace >= 0, `${name}: no se encontró el cuerpo.`);
  let depth = 0;
  for (let i = brace; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1).trimEnd();
    }
    i++;
  }
  throw new Error(`${name}: cuerpo sin cierre.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const eq = text.indexOf('=', start);
  let paren = 0, brace = 0, bracket = 0;
  for (let i = eq + 1; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '(') paren++;
    else if (ch === ')') paren--;
    else if (ch === '{') brace++;
    else if (ch === '}') brace--;
    else if (ch === '[') bracket++;
    else if (ch === ']') bracket--;
    else if (ch === ';' && paren === 0 && brace === 0 && bracket === 0) return text.slice(start, i + 1).trimEnd();
    i++;
  }
  throw new Error(`${name}: declaración sin cierre.`);
}

function validateFunctions(names, moduleSource, apiName) {
  for (const name of names) {
    const original = extractNamedFunction(base, name);
    assert(moduleSource.includes(original), `${name}: no conserva paridad exacta con la Fase 16.`);
    const adapter = extractNamedFunction(index, name);
    assert(adapter.includes(`window.${apiName}`), `${name}: el adaptador no usa ${apiName}.`);
    assert(adapter.includes(`module.${name}`), `${name}: el adaptador no delega correctamente.`);
    assert(!index.includes(original), `${name}: la implementación original todavía permanece en index.html.`);
  }
}

validateFunctions(followNames, followSource, 'PanelPatientFollowUp');
validateFunctions(recoveryNames, recoverySource, 'PanelPatientRecovery');

for (const name of ['_segFiltros']) {
  const original = extractDeclaration(base, name);
  assert(followSource.includes(original), `${name}: no quedó encapsulada con paridad exacta.`);
  assert(!index.includes(original), `${name}: todavía permanece en index.html.`);
}
for (const name of ['REC_KEY','_recMensajes']) {
  const original = extractDeclaration(base, name);
  assert(recoverySource.includes(original), `${name}: no quedó encapsulada con paridad exacta.`);
  assert(!index.includes(original), `${name}: todavía permanece en index.html.`);
}

assert(/const\s+REC_PCT\s*=\s*0\.05\s*;/.test(index), 'REC_PCT debe permanecer compartida en index.html.');
assert(/let\s+_recCurrentLista\s*=\s*\[\]\s*;/.test(index), '_recCurrentLista debe permanecer compartida.');
assert(/let\s+_recMsgTipo\s*=\s*0\s*;/.test(index), '_recMsgTipo debe permanecer compartida.');
assert(!/const\s+REC_PCT\s*=/.test(recoverySource), 'REC_PCT no debe duplicarse dentro del módulo.');
assert(!/let\s+_recCurrentLista\s*=/.test(recoverySource), '_recCurrentLista no debe duplicarse dentro del módulo.');
assert(!/let\s+_recMsgTipo\s*=/.test(recoverySource), '_recMsgTipo no debe duplicarse dentro del módulo.');

const followTag = '<script src="js/modules/patient-follow-up.js"></script>';
const recoveryTag = '<script src="js/modules/patient-recovery.js"></script>';
assert((index.match(/script src="js\/modules\/patient-follow-up\.js"/g) || []).length === 1, 'patient-follow-up.js debe cargarse una sola vez.');
assert((index.match(/script src="js\/modules\/patient-recovery\.js"/g) || []).length === 1, 'patient-recovery.js debe cargarse una sola vez.');
assert(index.indexOf(followTag) > index.indexOf('<script src="js/modules/income-analysis.js"></script>'), 'Seguimiento debe cargarse después de Ingresos.');
assert(index.indexOf(recoveryTag) > index.indexOf(followTag), 'Recuperación debe cargarse después de Seguimiento.');
assert(followSource.includes('global.PanelPatientFollowUp = Object.freeze'), 'Falta la API congelada de Seguimiento.');
assert(recoverySource.includes('global.PanelPatientRecovery = Object.freeze'), 'Falta la API congelada de Recuperación.');

assert(!followSource.includes('fetch('), 'Seguimiento no debe introducir llamadas de red.');
assert((recoverySource.match(/fetch\s*\(/g) || []).length === 1, 'Recuperación debe conservar únicamente la consulta existente de inactivos.');
assert((recoverySource.match(/action=getInactivos/g) || []).length === 1, 'Debe conservarse exactamente una acción getInactivos.');
assert(!recoverySource.includes('action=save') && !recoverySource.includes('action=update'), 'No deben aparecer acciones nuevas de escritura en servidor.');

for (const token of ['Semana 3 — aviso previo','Readaptación Funcional','Aún no hay acciones registradas']) {
  assert(followSource.includes(token), `Falta el flujo de seguimiento: ${token}.`);
}
for (const token of ['No hay recuperaciones para este período','getInactivos','Más de 6 meses sin sesión','Chequeo amigable']) {
  assert(recoverySource.includes(token), `Falta el flujo de recuperación: ${token}.`);
}

for (const externalName of ['seguimientoWA','agendarDesdeSeg','limpiarCitasSinHora','cargarCampañaReferidos']) {
  assert(new RegExp(`function\\s+${externalName}\\s*\\(`).test(index), `${externalName} debe permanecer fuera de esta fase.`);
}

const followContext = { window:null, globalThis:null, console, Set, kvGet:()=>null, kvSet:()=>{}, kvRemove:()=>{} };
followContext.window = followContext;
followContext.globalThis = followContext;
vm.createContext(followContext);
vm.runInContext(followSource, followContext, { filename: followPath });
const followApi = followContext.PanelPatientFollowUp;
assert(followApi && Object.isFrozen(followApi), 'PanelPatientFollowUp no está disponible o no está congelado.');
for (const name of followNames) assert(typeof followApi[name] === 'function', `Falta ${name} en PanelPatientFollowUp.`);
assert(followApi.esDescargaMusc('Descarga muscular completa') === true, 'No reconoce una descarga muscular.');
assert(followApi.esReadaptacion('Readaptación funcional') === true, 'No reconoce una readaptación.');
assert(followApi.segReagendo('Paciente QA') === false, 'El estado base de reagendamiento debe conservarse.');

const storage = {
  value: '{json inválido',
  getItem() { return this.value; },
  setItem(_k, v) { this.value = v; },
};
const recoveryContext = { window:null, globalThis:null, console, localStorage:storage, Date, Math, Intl };
recoveryContext.window = recoveryContext;
recoveryContext.globalThis = recoveryContext;
vm.createContext(recoveryContext);
vm.runInContext(recoverySource, recoveryContext, { filename: recoveryPath });
const recoveryApi = recoveryContext.PanelPatientRecovery;
assert(recoveryApi && Object.isFrozen(recoveryApi), 'PanelPatientRecovery no está disponible o no está congelado.');
for (const name of recoveryNames) assert(typeof recoveryApi[name] === 'function', `Falta ${name} en PanelPatientRecovery.`);
assert(Array.isArray(recoveryApi._loadRec()) && recoveryApi._loadRec().length === 0, '_loadRec debe recuperarse ante JSON inválido.');
assert(/^\d{4}-\d{2}$/.test(recoveryApi._recMesActual()), '_recMesActual no conserva el formato YYYY-MM.');
assert(recoveryApi._fmtCLP(100000).startsWith('$'), '_fmtCLP no conserva el formato monetario.');
assert(recoveryApi._recPreguntaDolencia('Readaptación funcional').toLowerCase().includes('readapt'), 'No personaliza la pregunta de readaptación.');
assert(recoveryApi._waIconSvg().includes('<svg'), 'No conserva el ícono de WhatsApp.');
assert(recoveryApi._recMensajes === undefined, '_recMensajes debe permanecer privada.');

console.log(`FASE 17 VALIDADA: ${followNames.length} funciones de seguimiento y ${recoveryNames.length} de recuperación separadas con paridad exacta y sin acciones nuevas de servidor.`);
