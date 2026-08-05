import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/passport.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const expected = [
  'pasaporteLink','pasaporteLinkAdmin','waBtnPasaporte','openPassportModuleFor',
  '_pasGetDB','onPasInput','searchPasPatient','selectPasPatient','_pasSetConfirmed','limpiarPasBusqueda',
  'generarLinkPasaporte','renderPasaporteQR','abrirPasaporte','copiarLinkPas','renderPasaporteAdminTools',
  'guardarProgresoPasaporte','regenerarTokenPasaporte','desactivarPasaporte','reactivarPasaporte'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/modules/passport.js"></script>'), 'index.html no carga passport.js.');
assert((html.match(/script src="js\/modules\/passport\.js"/g) || []).length === 1, 'passport.js debe cargarse una sola vez.');
for (const name of expected) {
  const matches = [...html.matchAll(new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace('$','\\$')}\\s*\\(`, 'g'))];
  assert(matches.length === 1, `${name} debe conservar exactamente un adaptador en index.html; encontrados: ${matches.length}.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en passport.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada por PanelPassport.`);
}
assert(!html.includes("const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html'"), 'PASAPORTE_BASE sigue declarado en index.html.');
assert(!html.includes("let _pasCurrent = null"), 'El estado interno del Pasaporte sigue en index.html.');
assert(!html.includes("function pasaporteLink(nombre) {\n  return PASAPORTE_BASE;"), 'La implementación original de pasaporteLink sigue en index.html.');
assert(!html.includes("async function generarLinkPasaporte() {\n  if (!_pasConfirmado) return;"), 'La implementación original de generarLinkPasaporte sigue en index.html.');

const inline = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n;\n');
new vm.Script(inline, { filename:'inline-scripts.js' });
new vm.Script(moduleSource, { filename:modulePath });

function createElement(id) {
  return {
    id,
    value:'',
    innerHTML:'',
    textContent:'',
    href:'',
    disabled:false,
    checked:false,
    dataset:{},
    style:{},
    files:[],
    focus(){ this.focused = true; },
    remove(){ this.removed = true; },
    addEventListener(){},
    insertAdjacentHTML(){},
    insertAdjacentElement(){},
    classList:{ add(){}, remove(){}, toggle(){} }
  };
}

const elements = new Map();
const ids = [
  'pasDropdown','pasNombreInput','pasAbrirBtn','pasConfirmBadge','pasPhoneBadge','pasWarning',
  'pasLinkCard','pasLinkTexto','pasWhatsApp','pasQR','pasQRBox','pasAdminTools','pasProgressEditor',
  'pasSaveStatus','pasCopyBtn'
];
ids.forEach(id => elements.set(id, createElement(id)));
elements.get('pasAbrirBtn').disabled = true;
elements.get('pasCopyBtn').textContent = 'Copiar enlace';

const saveButton = createElement('pasSaveButton');
saveButton.textContent = 'Guardar progreso';
const stamps = Array.from({length:16}, (_, i) => ({ dataset:{n:String(i + 1)}, checked:i < 5 }));
const descargaStamps = Array.from({length:2}, (_, i) => ({ dataset:{n:String(i + 1)}, checked:i === 0 }));

const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, createElement(id));
    return elements.get(id);
  },
  createElement(tag) { return createElement(tag); },
  querySelector(selector) {
    if (selector.includes('guardarProgresoPasaporte')) return saveButton;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === '.pasStamp') return stamps;
    if (selector === '.pasDescarga') return descargaStamps;
    return [];
  }
};

const calls = [];
const toasts = [];
let shownView = '';
let openedLink = '';
let copiedLink = '';
let serverPassport = {
  id:'PAS-QA',
  link:'https://example.test/pasaporte?id=PAS-QA&token=uno',
  estado:'ACTIVO',
  passport:{stamps:{1:true},autoStampCount:1},
  descarga:{stamps:{}}
};

function response(data, ok = true) {
  return {
    ok,
    status:ok ? 200 : 500,
    async json(){ return data; },
    async text(){ return JSON.stringify(data); }
  };
}

async function fetchMock(url, options = {}) {
  const value = String(url);
  const parsed = new URL(value);
  const action = parsed.searchParams.get('action') || '';
  calls.push({ action, url:value, options });
  if (action === 'passportEnsure') return response({ok:true, passport:serverPassport});
  if (action === 'passportSaveProgress') {
    const passport = JSON.parse(parsed.searchParams.get('passport') || '{}');
    const descarga = JSON.parse(parsed.searchParams.get('descarga') || '{}');
    serverPassport = {...serverPassport, passport, descarga};
    return response({ok:true, passport:serverPassport});
  }
  if (action === 'passportRegenerateToken') {
    serverPassport = {...serverPassport, link:'https://example.test/pasaporte?id=PAS-QA&token=dos'};
    return response({ok:true, passport:serverPassport});
  }
  if (action === 'passportDeactivate') {
    serverPassport = {...serverPassport, estado:'INACTIVO'};
    return response({ok:true, passport:serverPassport});
  }
  if (action === 'passportReactivate') {
    serverPassport = {...serverPassport, estado:'ACTIVO'};
    return response({ok:true, passport:serverPassport});
  }
  return response({ok:true});
}

const context = {
  console,
  document,
  navigator:{ clipboard:{ async writeText(value){ copiedLink = value; } } },
  location:{href:'',hash:''},
  APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  TOKEN:'TOKEN-QA',
  allData:{
    citas:[{nombre:'Ana Prueba',telefono:'3001234567',estado:'Confirmada'}],
    pacientes:[{nombre:'Beatriz Prueba',telefono:'3111234567'}]
  },
  toast:(message,tone) => toasts.push({message,tone}),
  showView:view => { shownView = view; },
  confirm:() => true,
  fetch:fetchMock,
  AbortController,
  QRCode:{
    toCanvas(){},
    CorrectLevel:{M:'M'}
  },
  setTimeout:(fn, ms = 0) => { if (ms < 1000) fn(); return 1; },
  clearTimeout(){},
  Date,
  URL,
  encodeURIComponent,
  decodeURIComponent,
  open:link => { openedLink = link; }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelPassport, 'PanelPassport no quedó disponible.');
for (const name of expected) assert(typeof context.PanelPassport[name] === 'function', `PanelPassport.${name} no es función.`);

assert(context.PanelPassport.pasaporteLink('Ana').includes('pasaporte.html'), 'pasaporteLink no conserva la URL base.');
assert(context.PanelPassport.waBtnPasaporte('300','Ana').includes('openPassportModuleFor'), 'waBtnPasaporte perdió la apertura del módulo.');

context.PanelPassport.openPassportModuleFor('Ana');
assert(shownView === 'pasaporte', 'openPassportModuleFor no abrió la vista Pasaporte.');
assert(document.getElementById('pasNombreInput').value === 'Ana', 'openPassportModuleFor no precargó el nombre.');
assert(document.getElementById('pasDropdown').innerHTML.includes('Ana Prueba'), 'La búsqueda no mostró al paciente existente.');

context.PanelPassport.selectPasPatient({nombre:'Ana Prueba',telefono:'3001234567'});
await context.PanelPassport.generarLinkPasaporte();
assert(document.getElementById('pasAbrirBtn').disabled === false, 'La selección no habilitó Abrir y editar.');
assert(document.getElementById('pasLinkTexto').textContent === serverPassport.link, 'No se mostró el enlace seguro devuelto por el servidor.');
assert(document.getElementById('pasLinkCard').style.display === 'block', 'La tarjeta del enlace no quedó visible.');
assert(document.getElementById('pasWhatsApp').href.includes('wa.me'), 'No se generó el enlace de WhatsApp.');
assert(document.getElementById('pasProgressEditor').innerHTML.includes('pasStamp'), 'No se renderizó el editor de sellos.');

context.PanelPassport.abrirPasaporte();
assert(openedLink === serverPassport.link, 'abrirPasaporte no abrió el enlace vigente.');
await context.PanelPassport.copiarLinkPas();
await Promise.resolve();
assert(copiedLink === serverPassport.link, 'copiarLinkPas no copió el enlace vigente.');

await context.PanelPassport.guardarProgresoPasaporte();
const saveCall = calls.find(call => call.action === 'passportSaveProgress');
assert(saveCall, 'guardarProgresoPasaporte no llamó passportSaveProgress.');
const saved = JSON.parse(new URL(saveCall.url).searchParams.get('passport'));
assert(Object.values(saved.stamps).filter(Boolean).length === 5, 'El guardado no envió los cinco sellos marcados.');
assert(/5\/16/.test(document.getElementById('pasSaveStatus').textContent), 'El mensaje de éxito no muestra 5/16.');
assert(saveButton.disabled === false, 'El botón Guardar progreso no se recuperó.');

await context.PanelPassport.regenerarTokenPasaporte();
assert(calls.some(call => call.action === 'passportRegenerateToken'), 'No se llamó passportRegenerateToken.');
await context.PanelPassport.desactivarPasaporte();
assert(serverPassport.estado === 'INACTIVO', 'No se desactivó el pasaporte en la prueba.');
await context.PanelPassport.reactivarPasaporte();
assert(serverPassport.estado === 'ACTIVO', 'No se reactivó el pasaporte en la prueba.');

context.PanelPassport.limpiarPasBusqueda();
assert(document.getElementById('pasNombreInput').value === '', 'No se limpió la búsqueda.');
assert(document.getElementById('pasAbrirBtn').disabled === true, 'La limpieza no volvió a bloquear Abrir y editar.');

console.log('FASE 5 VALIDADA: Pasaporte separado y flujos principales superados.');
