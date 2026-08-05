import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const htmlPath = process.argv[2] || 'index.html';
const sessionPath = process.argv[3] || 'js/core/session.js';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');
const sessionSource = fs.readFileSync(sessionPath, 'utf8').replace(/^\uFEFF/, '');

new Function(sessionSource);

const nodes = new Map();
const listeners = new Map();
const makeNode = id => ({
  id,
  style: {},
  textContent: '',
  value: '',
  disabled: false,
  classList: { add() {}, remove() {} }
});
const document = {
  visibilityState: 'visible',
  getElementById(id) {
    if (!nodes.has(id)) nodes.set(id, makeNode(id));
    return nodes.get(id);
  },
  addEventListener(name, handler) {
    if (!listeners.has(name)) listeners.set(name, []);
    listeners.get(name).push(handler);
  }
};

const values = new Map();
const sessionStorage = {
  getItem(key) { return values.has(key) ? values.get(key) : null; },
  setItem(key, value) { values.set(key, String(value)); },
  removeItem(key) { values.delete(key); }
};

const scheduledTimeouts = [];
const scheduledIntervals = [];
const location = { hash: '', reloadCount: 0, reload() { this.reloadCount++; } };
const windowObject = {
  document,
  sessionStorage,
  location,
  setTimeout(fn, ms) { scheduledTimeouts.push({ fn, ms }); return scheduledTimeouts.length; },
  setInterval(fn, ms) { scheduledIntervals.push({ fn, ms }); return scheduledIntervals.length; }
};
windowObject.window = windowObject;
vm.runInNewContext(sessionSource, { window: windowObject, console, Date, URLSearchParams, encodeURIComponent });
const PanelSession = windowObject.PanelSession;
assert.ok(PanelSession, 'PanelSession no fue creado');

const state = {
  adminToken: '',
  professionalToken: '',
  professionalSession: null,
  professionalAgenda: [],
  allData: null,
  loginTime: null,
  readyCount: 0,
  rendered: 0,
  toastMessages: [],
  adminUX: 0,
  professionalAppCalls: 0,
  professionalAgendaCalls: 0,
  reloads: 0
};

function resetNodes() {
  for (const id of [
    'loginScreen','adminApp','proLoginScreen','proApp','loginErr','loginBtn',
    'pwInput','userInput','proLoginBtn','proLoginErr','proUser','proPass',
    'proNewPass','proFirstChangeBox','proWelcome','proDate','dashDate'
  ]) {
    nodes.set(id, makeNode(id));
  }
}
resetNodes();

function bridge(overrides = {}) {
  return {
    apiUrl: 'https://example.test/exec',
    document,
    location,
    sessionStorage,
    setTimeout: windowObject.setTimeout,
    setInterval: windowObject.setInterval,
    inactivityMs: 30 * 60 * 1000,
    fetchJsonWithTimeout: async () => ({ ok: true }),
    toast: (message, tone) => state.toastMessages.push({ message, tone }),
    today: () => '2026-08-05',
    getAdminToken: () => state.adminToken,
    setAdminToken: value => { state.adminToken = value; },
    getAdminUser: () => document.getElementById('userInput').value,
    getAdminPassword: () => document.getElementById('pwInput').value,
    setLoginTime: value => { state.loginTime = value; },
    setAllData: value => { state.allData = value; },
    onAdminReady: async () => { state.readyCount++; },
    reloadPage: () => { state.reloads++; },
    getProfessionalToken: () => state.professionalToken,
    setProfessionalToken: value => { state.professionalToken = value; },
    getProfessionalSession: () => state.professionalSession,
    setProfessionalSession: value => { state.professionalSession = value; },
    setProfessionalAgenda: value => { state.professionalAgenda = value; },
    getProfessionalUser: () => document.getElementById('proUser').value,
    getProfessionalPassword: () => document.getElementById('proPass').value,
    getProfessionalNewPassword: () => document.getElementById('proNewPass').value,
    showProfessionalApp: async () => { state.professionalAppCalls++; },
    loadProfessionalAgenda: async () => { state.professionalAgendaCalls++; },
    renderProfessionalAgenda: () => { state.rendered++; },
    logoutAdmin: () => { state.adminToken = ''; state.reloads++; },
    initAdminUX: () => { state.adminUX++; },
    ...overrides
  };
}

// Cambio de pantallas.
PanelSession.showOnlyScreen('adminApp', bridge());
assert.equal(document.getElementById('adminApp').style.display, 'block');
assert.equal(document.getElementById('loginScreen').style.display, 'none');
PanelSession.showOnlyScreen('proLoginScreen', bridge());
assert.equal(document.getElementById('proLoginScreen').style.display, 'flex');

// Inicio administrativo correcto.
document.getElementById('userInput').value = 'admin';
document.getElementById('pwInput').value = 'segura';
const adminSuccess = await PanelSession.doAdminLogin(bridge({
  fetchJsonWithTimeout: async (_url, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.action, 'adminLogin');
    assert.equal(payload.user, 'admin');
    assert.equal(payload.password, 'segura');
    return { ok: true, sessionToken: 'TOKEN-ADMIN', citas: [] };
  }
}));
assert.equal(adminSuccess.ok, true);
assert.equal(state.adminToken, 'TOKEN-ADMIN');
assert.equal(sessionStorage.getItem('adminToken'), 'TOKEN-ADMIN');
assert.equal(state.readyCount, 1);
assert.equal(document.getElementById('loginBtn').disabled, false);

// Contraseña incorrecta y error visible.
document.getElementById('pwInput').value = 'incorrecta';
const adminFailure = await PanelSession.doAdminLogin(bridge({
  fetchJsonWithTimeout: async () => ({ ok: false })
}));
assert.equal(adminFailure.ok, false);
assert.match(document.getElementById('loginErr').textContent, /Intentos restantes/);

// Error de conexión visible y botón recuperado.
const adminNetwork = await PanelSession.doAdminLogin(bridge({
  fetchJsonWithTimeout: async () => { throw new Error('Servidor lento'); }
}));
assert.equal(adminNetwork.ok, false);
assert.equal(document.getElementById('loginErr').textContent, 'Servidor lento');
assert.equal(document.getElementById('loginBtn').disabled, false);

// Cierre administrativo.
PanelSession.logoutAdmin(bridge());
assert.equal(sessionStorage.getItem('adminToken'), null);
assert.equal(state.adminToken, '');
assert.equal(state.reloads, 1);

// Inicio profesional correcto.
document.getElementById('proUser').value = 'fisio';
document.getElementById('proPass').value = 'clave';
const professionalSuccess = await PanelSession.doProfessionalLogin(bridge({
  fetchJsonWithTimeout: async (_url, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.action, 'professionalLogin');
    return { ok: true, professionalToken: 'TOKEN-PRO', professional: { nombre: 'Verónica', rol: 'Fisioterapeuta' } };
  }
}));
assert.equal(professionalSuccess.ok, true);
assert.equal(state.professionalToken, 'TOKEN-PRO');
assert.equal(sessionStorage.getItem('professionalToken'), 'TOKEN-PRO');
assert.equal(state.professionalAppCalls, 1);

// Cambio de contraseña profesional.
document.getElementById('proNewPass').value = 'nueva-segura';
const passwordResult = await PanelSession.changeProfessionalPassword(bridge({
  fetchJsonWithTimeout: async (_url, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.action, 'professionalChangePassword');
    assert.equal(payload.newPassword, 'nueva-segura');
    return { ok: true };
  }
}));
assert.equal(passwordResult.ok, true);
assert.equal(document.getElementById('proFirstChangeBox').style.display, 'none');

// Agenda profesional válida.
state.professionalToken = 'TOKEN-PRO';
const agendaResult = await PanelSession.loadProfessionalAgenda(bridge({
  fetchJsonWithTimeout: async url => {
    assert.match(url, /professionalAgenda/);
    return { ok: true, professional: { nombre: 'Verónica', rol: 'Fisioterapeuta' }, citas: [{ id: 'C1' }] };
  }
}));
assert.equal(agendaResult.ok, true);
assert.equal(state.professionalAgenda.length, 1);
assert.equal(state.rendered, 1);

// Sesión profesional vencida limpia token y vuelve al acceso.
state.professionalToken = 'VENCIDO';
sessionStorage.setItem('professionalToken', 'VENCIDO');
const expiredAgenda = await PanelSession.loadProfessionalAgenda(bridge({
  fetchJsonWithTimeout: async () => ({ ok: false, error: 'Sesión vencida' })
}));
assert.equal(expiredAgenda.ok, false);
assert.equal(state.professionalToken, '');
assert.equal(sessionStorage.getItem('professionalToken'), null);
assert.equal(document.getElementById('proLoginScreen').style.display, 'flex');

// Restauración administrativa válida.
state.adminToken = 'TOKEN-GUARDADO';
sessionStorage.setItem('adminToken', 'TOKEN-GUARDADO');
const restoreAdmin = await PanelSession.restoreOnLoad(bridge({
  fetchJsonWithTimeout: async url => {
    assert.match(url, /adminData/);
    return { ok: true, citas: [{ id: 'C2' }] };
  }
}));
assert.equal(restoreAdmin.mode, 'admin');
assert.equal(state.allData.citas.length, 1);
assert.equal(state.adminUX, 1);

// Restauración administrativa inválida limpia token.
state.adminToken = 'INVALIDO';
sessionStorage.setItem('adminToken', 'INVALIDO');
const restoreExpired = await PanelSession.restoreOnLoad(bridge({
  fetchJsonWithTimeout: async () => ({ ok: false })
}));
assert.equal(restoreExpired.mode, 'login');
assert.equal(state.adminToken, '');
assert.equal(sessionStorage.getItem('adminToken'), null);

// Ruta profesional guardada.
location.hash = '#/profesionales';
state.professionalToken = 'TOKEN-PRO-2';
const restoreProfessional = await PanelSession.restoreOnLoad(bridge());
assert.equal(restoreProfessional.mode, 'professional');
assert.ok(state.professionalAppCalls >= 2);
location.hash = '';

// Inactividad y verificación al volver a la pestaña.
state.adminToken = 'TOKEN-ACTIVO';
PanelSession.resetActivity(0);
const inactivityTriggered = PanelSession.checkInactivity(bridge(), 30 * 60 * 1000 + 1);
assert.equal(inactivityTriggered, true);
assert.equal(scheduledTimeouts.at(-1).ms, 1500);

PanelSession.installAdminGuards(bridge());
assert.ok(listeners.has('click'));
assert.ok(listeners.has('visibilitychange'));
assert.equal(scheduledIntervals.at(-1).ms, 60000);

// Integración en index.html.
const required = [
  '<script src="js/core/session.js"></script>',
  'window.PanelSession.doAdminLogin(_sessionBridge())',
  'window.PanelSession.doProfessionalLogin(_sessionBridge())',
  'window.PanelSession.restoreOnLoad(_sessionBridge())',
  'window.PanelSession.installAdminGuards(_sessionBridge())'
];
for (const text of required) assert.ok(html.includes(text), `Falta ${text}`);

const order = [
  'js/core/config.js',
  'js/core/api.js',
  'js/core/session.js',
  'js/core/navigation.js'
].map(path => html.indexOf(path));
assert.ok(order.every(index => index >= 0), 'Falta un módulo core');
assert.deepEqual([...order].sort((a, b) => a - b), order, 'Orden incorrecto de módulos core');

assert.ok(!html.includes("body: JSON.stringify({action: 'adminLogin'"));
assert.ok(!html.includes("action:'professionalLogin'"));
assert.ok(!html.includes('// ── TIMEOUT DE INACTIVIDAD (30 min) ──'));

// Sintaxis de todos los scripts inline clásicos.
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1].trim())
  .filter(Boolean);
for (const script of inlineScripts) new Function(script);

console.log('VALIDACIÓN FASE 3 SUPERADA');
console.log('- Inicio administrativo y profesional');
console.log('- Errores, timeout y recuperación de botones');
console.log('- Restauración y cierre de sesiones');
console.log('- Sesión profesional vencida');
console.log('- Inactividad y verificación de pestaña');
console.log('- Integración y sintaxis del panel');
