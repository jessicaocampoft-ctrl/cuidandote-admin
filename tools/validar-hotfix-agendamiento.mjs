import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2] || 'index.html';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractNamedFunction(text, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`, 'g');
  const matches = [...text.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: declaraciones encontradas ${matches.length}.`);
  const start = matches[0].index;
  const open = text.indexOf('{', start);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = text.indexOf('\n', i + 2);
      i = end < 0 ? text.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = text.indexOf('*/', i + 2);
      i = end < 0 ? text.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

const fnSource = extractNamedFunction(source, 'submitAdminBookingMulti');
new vm.Script(fnSource, {filename:'submitAdminBookingMulti.js'});
assert(fnSource.includes('action=ping'), 'Falta la validación previa de sesión.');
assert(fnSource.includes('erroresDetalle'), 'Falta conservar el detalle de errores.');
assert(fnSource.includes('Tu sesión venció'), 'Falta el mensaje de sesión vencida.');
assert(fnSource.includes('No se creó la cita: '), 'Falta mostrar el motivo real del servidor.');
assert(fnSource.includes('restoreSubmitButton'), 'Falta recuperación centralizada del botón.');

function makeElement(id) {
  return {
    id,
    value:'',
    textContent:'',
    checked:false,
    disabled:false,
    style:{display:'none'},
    selectedIndex:0,
    dataset:{},
    options:[],
    focus(){},
    addEventListener(){},
    dispatchEvent(){},
    classList:{add(){},remove(){},toggle(){}}
  };
}

async function runScenario({ping, booking}) {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  };
  Object.assign(get('ncName'), {value:'QA AGENDA'});
  Object.assign(get('ncService'), {value:'Valoración Funcional'});
  Object.assign(get('ncMod'), {value:'Presencial'});
  Object.assign(get('ncDate'), {value:'2026-08-06'});
  Object.assign(get('ncTime'), {value:'10:00'});
  Object.assign(get('ncPhone'), {value:'3000000000'});
  Object.assign(get('ncEmail'), {value:'qa@example.com'});
  Object.assign(get('ncPrice'), {value:'125000'});
  Object.assign(get('ncAddress'), {value:''});
  Object.assign(get('ncNotes'), {value:'Prueba aislada'});
  Object.assign(get('ncParaQuien'), {value:''});
  Object.assign(get('nuevaCitaCanal'), {value:'Directo'});
  Object.assign(get('ncConvenio'), {value:''});
  Object.assign(get('ncSubmitLabel'), {textContent:'Crear cita'});

  const toasts = [];
  const requests = [];
  let cleared = false;
  const context = {
    console,
    window:null,
    globalThis:null,
    document:{getElementById:get},
    APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
    TOKEN:'TOKEN-QA-VALIDO-DE-MAS-DE-20-CARACTERES',
    _submittingBooking:false,
    _scheduleMode:'unica',
    _multiDates:[],
    _duoActive:false,
    costosReales:{},
    validateNoMidnight:()=>true,
    updateTimeHelp(){},
    isMidnightTime:()=>false,
    _calcRecDates:()=>[],
    parsePrecioNum:value=>Number(String(value || '').replace(/[^\d]/g,'')),
    fmtPeso:value=>String(value),
    getPrecioFinal:()=>'$125.000',
    getAbonoNota:()=>'',
    toast:(message,tone)=>toasts.push({message:String(message),tone}),
    logChange(){},
    reload:async()=>{},
    renderAgenda(){},
    initDashboard(){},
    _renderMultiChips(){},
    clearNuevaCita(){ cleared = true; },
    encodeURIComponent,
    URL,
    Set,
    String,
    Number,
    Array,
    Object,
    Promise,
    JSON,
    Math,
    Date,
    fetch:async url => {
      const text = String(url);
      requests.push(text);
      const data = text.includes('action=ping') ? ping : booking;
      return {json:async()=>data};
    }
  };
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fnSource, context, {filename:'submitAdminBookingMulti.js'});
  await context.submitAdminBookingMulti();
  return {context, elements, toasts, requests, cleared};
}

const expired = await runScenario({ping:{ok:false,error:'Sin permiso'}, booking:{ok:true}});
assert(expired.requests.length === 1 && expired.requests[0].includes('action=ping'), 'Con sesión vencida no debe enviarse adminBook.');
assert(expired.toasts.some(x => x.tone === 'err' && x.message.includes('sesión venció')), 'No mostró el mensaje claro de sesión vencida.');
assert(expired.elements.get('ncSubmitBtn').disabled === false, 'El botón quedó bloqueado con sesión vencida.');
assert(expired.elements.get('ncSubmitLabel').textContent === 'Crear cita', 'La etiqueta no se recuperó con sesión vencida.');
assert(expired.cleared === false, 'No debe limpiar el formulario con sesión vencida.');

const rejected = await runScenario({ping:{ok:true}, booking:{ok:false,error:'Horario ocupado por otra cita'}});
assert(rejected.requests.some(x => x.includes('action=adminBook')), 'No se envió adminBook con sesión válida.');
assert(rejected.toasts.some(x => x.tone === 'err' && x.message.includes('Horario ocupado por otra cita')), 'No mostró el motivo exacto del servidor.');
assert(rejected.elements.get('ncSubmitBtn').disabled === false, 'El botón quedó bloqueado tras rechazo.');
assert(rejected.cleared === false, 'No debe limpiar el formulario tras rechazo.');

const success = await runScenario({ping:{ok:true}, booking:{ok:true}});
assert(success.requests.filter(x => x.includes('action=adminBook')).length === 1, 'Debe crear una sola cita en modo único.');
assert(success.toasts.some(x => x.tone === 'ok' && x.message.includes('1 cita creada correctamente')), 'No mostró confirmación de creación.');
assert(success.elements.get('ncSubmitBtn').disabled === false, 'El botón quedó bloqueado tras éxito.');
assert(success.cleared === true, 'Debe limpiar el formulario después de una creación confirmada.');

console.log('HOTFIX AGENDAMIENTO VALIDADO: sesión vencida, rechazo con motivo y creación correcta.');
