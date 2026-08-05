import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/referrals.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const names = [
  '_mesAbrevActual','_bonosReferidorMes','updateBonosBadge',
  'renderCodigos','marcarUsado','generarBono'
];
const constants = ['BONO_VALOR','BONO_MAX_MES','_MES_EN'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const databaseTag = '<script src="js/modules/database.js"></script>';
const referralsTag = '<script src="js/modules/referrals.js"></script>';
assert(html.includes(referralsTag), 'index.html no carga referrals.js.');
assert((html.match(/script src="js\/modules\/referrals\.js"/g) || []).length === 1, 'referrals.js debe cargarse una sola vez.');
assert(html.indexOf(databaseTag) >= 0 && html.indexOf(databaseTag) < html.indexOf(referralsTag), 'referrals.js debe cargar después de database.js.');

for (const name of names) {
  const adapter = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(\.\.\.args\\)`);
  assert(adapter.test(html), `${name} no conserva adaptador en index.html.`);
  assert(moduleSource.includes(`function ${name}(`) || moduleSource.includes(`async function ${name}(`), `${name} no existe en referrals.js.`);
  assert(moduleSource.includes(`    ${name}`), `${name} no fue exportada.`);
}

for (const name of constants) {
  assert(!new RegExp(`\\bconst\\s+${name.replace(/[$]/g,'\\$&')}\\b`).test(html), `${name} no debe seguir declarada en index.html.`);
  assert((moduleSource.match(new RegExp(`\\bconst\\s+${name.replace(/[$]/g,'\\$&')}\\b`, 'g')) || []).length === 1, `${name} debe existir una sola vez en referrals.js.`);
}
assert(moduleSource.includes('global.PanelReferrals = Object.freeze'), 'PanelReferrals no quedó exportado de forma controlada.');

for (const external of ['reload','loadTeamData','toast','esc']) {
  assert(!moduleSource.includes(`function ${external}(`) && !moduleSource.includes(`async function ${external}(`), `${external} debe permanecer compartida.`);
}
for (const forbidden of [
  'renderCalendar','submitAdminBooking','guardarEdicion','saveManualPayment','passportSaveProgress',
  'renderEquipo','renderBasedatos','renderReactivacion','usarSesion','renderFinanzas','renderKPITablero'
]) {
  assert(!moduleSource.includes(`function ${forbidden}(`) && !moduleSource.includes(`async function ${forbidden}(`), `${forbidden} no pertenece a referrals.js.`);
}
assert(/\baction=registrarCodigo\b/.test(moduleSource), 'No se conservó registrarCodigo.');
assert(/\baction=actualizarCodigo\b/.test(moduleSource), 'No se conservó actualizarCodigo.');

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1]).join('\n;\n');
new vm.Script(inlineScripts, {filename:'inline-scripts.js'});
new vm.Script(moduleSource, {filename:modulePath});

class FakeDate extends Date {
  constructor(...args) {
    super(...(args.length ? args : ['2026-08-05T12:00:00-05:00']));
  }
  static now() { return new Date('2026-08-05T12:00:00-05:00').getTime(); }
}

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

const calls = [];
const toasts = [];
let reloadCount = 0;
const context = {
  console, document, window:null, globalThis:null,
  Date:FakeDate, Math, JSON, Number, String, Object, Array, Set, Promise, URLSearchParams,
  encodeURIComponent, decodeURIComponent, parseInt, parseFloat,
  APPS_SCRIPT_URL:'https://script.google.com/macros/s/QA/exec',
  TOKEN:'ADMIN-QA',
  allData:{
    codigos:[
      {tipo:'REF',codigo:'REF-AUG-001',paciente:'Paciente Uno',telefono:'3000000001',referidoPor:'Ana Pérez',estado:'Activo'},
      {tipo:'BONO',codigo:'BONO-AUG-001',paciente:'Ana Pérez',telefono:'3000000002',codigoRef:'REF-AUG-000',estado:'Activo'}
    ]
  },
  esc:value => String(value ?? '').replace(/[<>&]/g, ''),
  toast:(message,type='ok') => toasts.push({message:String(message),type}),
  reload:async () => { reloadCount++; },
  loadTeamData:async () => {},
  confirm:() => true,
  fetch:async url => {
    calls.push(String(url));
    return {ok:true,json:async()=>({ok:true})};
  }
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, {filename:modulePath});

assert(context.PanelReferrals, 'PanelReferrals no quedó disponible.');
for (const name of names) assert(typeof context.PanelReferrals[name] === 'function', `PanelReferrals.${name} no es función.`);
assert(context.PanelReferrals._mesAbrevActual() === 'AUG', 'La abreviatura mensual cambió.');
assert(context.PanelReferrals._bonosReferidorMes('Ana Pérez').length === 1, 'El conteo mensual de bonos cambió.');

context.PanelReferrals.renderCodigos();
assert(document.getElementById('codigosTbody').innerHTML.includes('REF-AUG-001'), 'La tabla no mostró el código REF esperado.');
context.PanelReferrals.updateBonosBadge();
assert(document.getElementById('bonoPendingBanner').style.display === 'block', 'No mostró el bono pendiente de generar.');

context.allData.codigos.push({tipo:'BONO',codigo:'BONO-AUG-002',paciente:'Ana Pérez',telefono:'3000000002',codigoRef:'REF-AUG-099',estado:'Activo'});
const callsBeforeLimit = calls.length;
await context.PanelReferrals.generarBono('REF-AUG-LIMITE','Ana Pérez','3000000002');
assert(calls.length === callsBeforeLimit, 'Generó un bono aunque el límite mensual estaba alcanzado.');
assert(toasts.some(item => item.message.includes('límite alcanzado')), 'No avisó el límite mensual de bonos.');

context.allData.codigos = context.allData.codigos.filter(item => item.codigo !== 'BONO-AUG-002');
await context.PanelReferrals.generarBono('REF-AUG-002','Carlos Ruiz','3000000003');
const registerUrl = calls.find(url => url.includes('action=registrarCodigo'));
assert(registerUrl, 'No envió la generación del bono al servidor.');
const registerParams = new URL(registerUrl).searchParams;
const registerData = JSON.parse(registerParams.get('data'));
assert(registerData.tipo === 'BONO', 'El registro generado no es tipo BONO.');
assert(registerData.codigoRef === 'REF-AUG-002', 'El bono no conservó el código REF de origen.');
assert(registerData.paciente === 'Carlos Ruiz', 'El bono no conservó el referidor.');
assert(reloadCount >= 1, 'No recargó los datos después de generar el bono.');

await context.PanelReferrals.marcarUsado('REF-AUG-001');
const updateUrl = calls.find(url => url.includes('action=actualizarCodigo'));
assert(updateUrl && updateUrl.includes('estado=Usado'), 'No envió el cambio de estado a Usado.');

console.log('FASE 9 VALIDADA: referidos, bonos, límite mensual y estado Usado preservados.');
