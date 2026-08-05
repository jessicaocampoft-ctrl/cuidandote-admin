import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const changes = [];

function findBalancedBlock(start, braceStart) {
  let depth = 0;
  let quote = '';
  let escaped = false;
  let templateDepth = 0;
  for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    const next = html[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') { templateDepth++; i++; continue; }
      if (quote === '`' && templateDepth > 0 && ch === '}') { templateDepth--; continue; }
      if (ch === quote && templateDepth === 0) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = html.indexOf('\n', i + 2);
      i = end < 0 ? html.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = html.indexOf('*/', i + 2);
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error('No se pudo cerrar un bloque de JavaScript.');
}

function findFunction(name) {
  const re = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = re.exec(html);
  if (!match) return null;
  const braceStart = html.indexOf('{', match.index);
  const end = findBalancedBlock(match.index, braceStart);
  return { start: match.index, end, text: html.slice(match.index, end) };
}

function replaceFunction(name, replacement) {
  if (html.includes(replacement)) return;
  const block = findFunction(name);
  if (!block) throw new Error(`No se encontró la función ${name}.`);
  html = html.slice(0, block.start) + replacement + html.slice(block.end);
  changes.push(`Separar ${name}`);
}

function findListener(targetName, eventName) {
  const variants = [
    `${targetName}.addEventListener('${eventName}'`,
    `${targetName}.addEventListener("${eventName}"`
  ];
  let start = -1;
  for (const marker of variants) {
    start = html.indexOf(marker);
    if (start >= 0) break;
  }
  if (start < 0) return null;
  const arrow = html.indexOf('=>', start);
  const braceStart = html.indexOf('{', arrow);
  let end = findBalancedBlock(start, braceStart);
  const close = html.indexOf(');', end);
  if (close >= 0 && close - end < 20) end = close + 2;
  return { start, end, text: html.slice(start, end) };
}

const sessionTag = '<script src="js/core/session.js"></script>';
if (!html.includes(sessionTag)) {
  const navigationTag = '<script src="js/core/navigation.js"></script>';
  if (!html.includes(navigationTag)) throw new Error('No se encontró el punto de carga de navigation.js.');
  html = html.replace(navigationTag, `${sessionTag}\n${navigationTag}`);
  changes.push('Cargar session.js antes del panel');
}

const bridge = `function _sessionBridge() {
  return {
    apiUrl: APPS_SCRIPT_URL,
    document,
    location,
    sessionStorage,
    setTimeout: window.setTimeout.bind(window),
    setInterval: window.setInterval.bind(window),
    inactivityMs: 30 * 60 * 1000,
    fetchJsonWithTimeout,
    toast,
    today,
    getAdminToken: () => TOKEN,
    setAdminToken: value => { TOKEN = value || ''; },
    getAdminUser: () => document.getElementById('userInput')?.value || '',
    getAdminPassword: () => document.getElementById('pwInput')?.value || '',
    setLoginTime: value => { _loginTime = value; },
    setAllData: value => { allData = value; },
    onAdminReady: async () => {
      await loadAdminKV();
      await loadTeamData();
      reloadMetas();
      _initSidebarState();
      initDashboard();
      await _runUrlRepairIfRequested();
    },
    reloadPage: () => location.reload(),
    getProfessionalToken: () => PROFESSIONAL_TOKEN,
    setProfessionalToken: value => { PROFESSIONAL_TOKEN = value || ''; },
    getProfessionalSession: () => professionalSession,
    setProfessionalSession: value => { professionalSession = value; },
    setProfessionalAgenda: value => { professionalAgenda = value || []; },
    getProfessionalUser: () => document.getElementById('proUser')?.value || '',
    getProfessionalPassword: () => document.getElementById('proPass')?.value || '',
    getProfessionalNewPassword: () => document.getElementById('proNewPass')?.value || '',
    showProfessionalApp: () => showProfessionalApp(),
    loadProfessionalAgenda: () => loadProfessionalAgenda(),
    renderProfessionalAgenda,
    logoutAdmin: () => logout(),
    initAdminUX: () => {
      initAdminUX2026();
      const dashDate = document.getElementById('dashDate');
      if (dashDate) {
        dashDate.textContent = new Date().toLocaleDateString('es-CO', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    }
  };
}

function showOnlyScreen(screenId) {
  return window.PanelSession.showOnlyScreen(screenId, _sessionBridge());
}`;
replaceFunction('showOnlyScreen', bridge);

replaceFunction('openProfessionalLoginMode', `function openProfessionalLoginMode() {
  return window.PanelSession.openProfessionalLoginMode(_sessionBridge());
}`);
replaceFunction('backToAdminLogin', `function backToAdminLogin() {
  return window.PanelSession.backToAdminLogin(_sessionBridge());
}`);
replaceFunction('doProfessionalLogin', `async function doProfessionalLogin() {
  return window.PanelSession.doProfessionalLogin(_sessionBridge());
}`);
replaceFunction('changeProfessionalPassword', `async function changeProfessionalPassword() {
  return window.PanelSession.changeProfessionalPassword(_sessionBridge());
}`);
replaceFunction('showProfessionalApp', `async function showProfessionalApp() {
  return window.PanelSession.showProfessionalApp(_sessionBridge());
}`);
replaceFunction('loadProfessionalAgenda', `async function loadProfessionalAgenda() {
  return window.PanelSession.loadProfessionalAgenda(_sessionBridge());
}`);
replaceFunction('professionalSignout', `function professionalSignout() {
  return window.PanelSession.logoutProfessional(_sessionBridge());
}`);
replaceFunction('doLogin', `async function doLogin() {
  return window.PanelSession.doAdminLogin(_sessionBridge());
}`);
replaceFunction('logout', `function logout() {
  return window.PanelSession.logoutAdmin(_sessionBridge());
}`);

html = html.replace(/^\s*let\s+_loginAttempts\s*=\s*0;\s*$/m, '');
html = html.replace(/^\s*let\s+_loginLockedUntil\s*=\s*0;\s*$/m, '');

const inactivityStart = html.indexOf('// ── TIMEOUT DE INACTIVIDAD (30 min) ──');
const autoLoginStart = html.indexOf('// Auto-login si tiene sesión guardada');
if (inactivityStart >= 0 && autoLoginStart > inactivityStart) {
  html = html.slice(0, inactivityStart)
    + `// ── GUARDAS DE SESIÓN MODULARIZADAS ──\nwindow.PanelSession.installAdminGuards(_sessionBridge());\n\n`
    + html.slice(autoLoginStart);
  changes.push('Mover inactividad y verificación de sesión');
} else if (!html.includes('window.PanelSession.installAdminGuards(_sessionBridge())')) {
  throw new Error('No se encontró el bloque de inactividad para separar.');
}

const domReady = findListener('window', 'DOMContentLoaded');
const domReadyReplacement = `window.addEventListener('DOMContentLoaded', async () => {
  await window.PanelSession.restoreOnLoad(_sessionBridge());
});`;
if (!html.includes(domReadyReplacement)) {
  if (!domReady) throw new Error('No se encontró la restauración DOMContentLoaded.');
  html = html.slice(0, domReady.start) + domReadyReplacement + html.slice(domReady.end);
  changes.push('Mover restauración automática de sesión');
}

const required = [
  sessionTag,
  'window.PanelSession.doAdminLogin(_sessionBridge())',
  'window.PanelSession.doProfessionalLogin(_sessionBridge())',
  'window.PanelSession.installAdminGuards(_sessionBridge())',
  'window.PanelSession.restoreOnLoad(_sessionBridge())'
];
for (const text of required) {
  if (!html.includes(text)) throw new Error(`Falta validación final: ${text}`);
}

for (const forbidden of [
  "body: JSON.stringify({action: 'adminLogin'",
  "action:'professionalLogin'",
  '// ── TIMEOUT DE INACTIVIDAD (30 min) ──'
]) {
  if (html.includes(forbidden)) throw new Error(`Quedó lógica de sesión duplicada: ${forbidden}`);
}

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(changes.length ? `Fase 3 aplicada:\n- ${changes.join('\n- ')}` : 'La Fase 3 ya estaba aplicada.');
