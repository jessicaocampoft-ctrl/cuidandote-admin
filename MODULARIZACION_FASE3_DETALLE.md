# Detalle exacto de inicio de sesión y sesiones — Fase 3

## Estado inicial de sesión — línea 6205

```javascript
6197: // Garantiza que leads y checklist pendientes se guarden aunque el navegador cierre
6198: window.addEventListener('beforeunload', () => {
6199:   if (!Object.keys(_kvDirty).length) return;
6200:   const batch = { ..._kvDirty };
6201:   _kvDirty = {};
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
6215: let _kpiServerHistory = {};
6216: 
6217: // Escapa HTML para prevenir XSS en innerHTML
6218: function esc(s) {
6219:   return String(s == null ? '' : s)
6220:     .replace(/&/g,'&amp;').replace(/</g,'&lt;')
6221:     .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
6222:     .replace(/'/g,'&#39;');
6223: }
6224: 
6225: const APPOINTMENT_STATUSES = [
```

## Cambio de pantallas — línea 6257

```javascript
6252: function isOperationalDate(dateStr) {
6253:   const d = normDate(dateStr);
6254:   return !!d && d >= ADMIN_OPERATIONS_START_DATE;
6255: }
6256: 
6257: function showOnlyScreen(screenId) {
6258:   ['loginScreen','adminApp','proLoginScreen','proApp'].forEach(id => {
6259:     const el = document.getElementById(id);
6260:     if (el) el.style.display = id === screenId ? (id === 'adminApp' ? 'block' : 'flex') : 'none';
6261:   });
6262:   if (screenId === 'proApp') document.getElementById('proApp').style.display = 'block';
6263:   if (screenId === 'proLoginScreen') document.getElementById('proLoginScreen').style.display = 'block';
6264: }
6265: 
6266: function byIdFrom(list, key, val) {
6267:   return (list || []).find(x => String(x[key] || '') === String(val || ''));
6268: }
6269: 
6270: function assignmentFor(citaId) {
6271:   return byIdFrom(teamData.asignaciones, 'CitaID', citaId) || {};
6272: }
6273: 
6274: function professionalName(id) {
6275:   const p = byIdFrom(teamData.profesionales, 'id', id) || byIdFrom(teamData.profesionales, 'ID', id);
6276:   return p ? (p.nombre || p.Nombre || 'Equipo') : 'Sin asignar';
6277: }
```

## Acceso profesional — línea 7130

```javascript
7125: 
7126: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7127:   return window.PanelApi.fetchJsonWithTimeout(url, options, timeoutMs);
7128: }
7129: 
7130: function openProfessionalLoginMode() {
7131:   location.hash = '/profesionales/login';
7132:   showOnlyScreen('proLoginScreen');
7133:   document.getElementById('proLoginErr').style.display = 'none';
7134: }
7135: 
7136: function backToAdminLogin() {
7137:   location.hash = '';
7138:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7139: }
7140: 
7141: async function doProfessionalLogin() {
7142:   const btn = document.getElementById('proLoginBtn');
7143:   const err = document.getElementById('proLoginErr');
7144:   err.style.display = 'none';
7145:   btn.disabled = true; btn.textContent = 'Verificando...';
7146:   try {
7147:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7148:       method:'POST',
7149:       body:JSON.stringify({
7150:         action:'professionalLogin',
7151:         user:document.getElementById('proUser').value.trim(),
7152:         password:document.getElementById('proPass').value
7153:       })
7154:     }, 45000);
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
7161:       toast('Cambia la contraseña temporal para continuar');
7162:     } else {
7163:       await showProfessionalApp();
7164:     }
7165:   } catch(e) {
7166:     err.textContent = e.message || 'Error de acceso';
7167:     err.style.display = 'block';
7168:   } finally {
7169:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7170:   }
7171: }
7172: 
7173: async function changeProfessionalPassword() {
7174:   const currentPassword = document.getElementById('proPass').value;
7175:   const newPassword = document.getElementById('proNewPass').value;
7176:   const d = await fetch(APPS_SCRIPT_URL, {
7177:     method:'POST',
7178:     body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
7179:   }).then(r => r.json());
7180:   if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
7181:   toast('Contraseña actualizada');
7182:   document.getElementById('proFirstChangeBox').style.display = 'none';
7183:   await showProfessionalApp();
7184: }
7185: 
7186: async function showProfessionalApp() {
7187:   location.hash = '/profesionales/agenda';
7188:   showOnlyScreen('proApp');
7189:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7190:   document.getElementById('proDate').value = today();
7191:   await loadProfessionalAgenda();
7192: }
7193: 
7194: async function loadProfessionalAgenda() {
7195:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
7199:     PROFESSIONAL_TOKEN = '';
7200:     toast(d.error || 'Sesión vencida', 'err');
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
7207: }
7208: 
7209: function setProfessionalMode(mode) {
7210:   professionalMode = mode;
7211:   document.querySelectorAll('.pro-seg').forEach(b => b.classList.remove('active'));
7212:   const btn = document.getElementById('proMode-' + mode);
7213:   if (btn) btn.classList.add('active');
7214:   renderProfessionalAgenda();
7215: }
7216: 
7217: function renderProfessionalAgenda() {
7218:   const selected = document.getElementById('proDate').value || today();
7219:   const base = professionalAgenda.slice().sort((a,b) => (`${a.fecha} ${a.hora}`).localeCompare(`${b.fecha} ${b.hora}`));
7220:   const start = new Date(selected + 'T00:00:00');
7221:   const end = new Date(start); end.setDate(end.getDate() + 7);
7222:   const list = base.filter(c => {
7223:     const d = new Date(c.fecha + 'T00:00:00');
7224:     if (professionalMode === 'hoy') return c.fecha === today();
7225:     if (professionalMode === 'fecha') return c.fecha === selected;
7226:     if (professionalMode === 'semana') return d >= start && d < end;
7227:     return d >= new Date(today() + 'T00:00:00');
7228:   });
7229:   document.getElementById('proAgendaList').innerHTML = list.length ? list.map(c => {
7230:     const badge = c.autorizada ? (c.estado || 'Autorizada') : (c.autorizacion || 'Asignada pendiente de autorización');
7231:     const canAttend = c.puedeAtender && c.estado !== 'Sesión atendida';
7232:     return `
7233:     <article class="pro-card pro-appointment">
7234:       <div class="team-card-head">
7235:         <h3>${esc(c.nombre)}</h3>
```

## Acceso administrativo — línea 7301

```javascript
7286:   sessionStorage.removeItem('professionalToken');
7287:   PROFESSIONAL_TOKEN = '';
7288:   professionalSession = null;
7289:   professionalAgenda = [];
7290:   openProfessionalLoginMode();
7291: }
7292: 
7293: let _submittingBooking = false;
7294: let _submittingPatient = false;
7295: let _loginTime = null;
7296: 
7297: // ── LOGIN ──
7298: let _loginAttempts = 0;
7299: let _loginLockedUntil = 0;
7300: 
7301: async function doLogin() {
7302:   const ahora = Date.now();
7303:   if (_loginLockedUntil > ahora) {
7304:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7305:     const errEl = document.getElementById('loginErr');
7306:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7307:     errEl.style.display = 'block';
7308:     return;
7309:   }
7310:   const pw  = document.getElementById('pwInput').value.trim();
7311:   const user = (document.getElementById('userInput')?.value || '').trim();
7312:   const btn = document.getElementById('loginBtn');
7313:   if (!pw) return;
7314:   btn.textContent = 'Verificando...'; btn.disabled = true;
7315:   try {
7316:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7317:       method: 'POST',
7318:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7319:     }, 45000);
7320:     if (d.ok) {
7321:       _loginAttempts = 0;
7322:       TOKEN = d.sessionToken;
7323:       sessionStorage.setItem('adminToken', d.sessionToken);
7324:       _loginTime = Date.now();
7325:       document.getElementById('loginScreen').style.display = 'none';
7326:       document.getElementById('adminApp').style.display   = 'block';
7327:       allData = d;
7328:       await loadAdminKV();
7329:       await loadTeamData();
7330:       reloadMetas();
7331:       _initSidebarState();
7332:       initDashboard();
7333:       await _runUrlRepairIfRequested();
7334:     } else {
7335:       _loginAttempts++;
7336:       const errEl = document.getElementById('loginErr');
7337:       if (_loginAttempts >= 5) {
7338:         _loginLockedUntil = Date.now() + 120000;
7339:         _loginAttempts = 0;
7340:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7341:       } else {
7342:         const restantes = 5 - _loginAttempts;
7343:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
7344:       }
7345:       errEl.style.display = 'block';
7346:     }
7347:   } catch(e) {
7348:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7349:     document.getElementById('loginErr').style.display = 'block';
7350:   }
7351:   btn.textContent = 'Ingresar'; btn.disabled = false;
7352: }
7353: 
7354: function logout() {
7355:   sessionStorage.removeItem('adminToken');
7356:   location.reload();
7357: }
7358: 
7359: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7360: let _lastActivity = Date.now();
7361: const _INACTIVITY_MS = 30 * 60 * 1000;
7362: 
7363: function _resetActivity() { _lastActivity = Date.now(); }
7364: ['click','keydown','scroll','touchstart'].forEach(ev =>
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7370:     setTimeout(logout, 1500);
7371:   }
7372: }, 60_000);
7373: 
7374: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7375: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7376: document.addEventListener('visibilitychange', async () => {
7377:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
7381:       toast('Sesión expirada. Volviendo al login...', 'warn');
7382:       setTimeout(logout, 1500);
7383:     }
7384:   } catch(e) {}
7385: });
7386: 
7387: // Auto-login si tiene sesión guardada
7388: window.addEventListener('DOMContentLoaded', async () => {
7389:   initAdminUX2026();
7390:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7391:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7392:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7393:     else openProfessionalLoginMode();
7394:     return;
7395:   }
7396:   if (TOKEN) {
7397:     const btn = document.getElementById('loginBtn');
7398:     try {
7399:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7400:       const d = await r.json();
7401:       if (d.ok) {
7402:         _loginTime = Date.now();
7403:         document.getElementById('loginScreen').style.display = 'none';
7404:         document.getElementById('adminApp').style.display   = 'block';
7405:         allData = d;
7406:         await loadAdminKV();
7407:         await loadTeamData();
7408:         reloadMetas();
7409:         _initSidebarState();
7410:         initDashboard();
7411:         await _runUrlRepairIfRequested();
7412:           return;
7413:       }
7414:     } catch(e) {}
7415:     sessionStorage.removeItem('adminToken');
7416:   }
7417: });
7418: 
7419: async function _runUrlRepairIfRequested() {
7420:   const params = new URLSearchParams(location.search);
7421:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7422:   const nombre = params.get('nombre') || '';
7423:   const keepFecha = params.get('keepFecha') || '';
7424:   const keepHora = params.get('keepHora') || '';
7425:   if (!nombre || !keepFecha || !keepHora) return;
7426:   try {
7427:     const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
7428:     const result = await fetch(url).then(r => r.json());
7429:     document.body.dataset.repairResult = JSON.stringify(result);
7430:     if (result.ok) {
7431:       toast(result.repaired > 0 ? `Reparación lista: ${result.repaired} cita duplicada cancelada.` : 'Revisión lista: no encontré duplicados activos.', result.repaired > 0 ? 'ok' : 'warn');
7432:       await reload();
7433:       initDashboard();
7434:       renderAgenda();
7435:       renderCalendar();
7436:       renderCitasResumen();
7437:       renderIngresosDetalle();
7438:     } else {
7439:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7440:     }
7441:   } catch(e) {
7442:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7443:     toast('Error ejecutando reparación de reprogramación', 'err');
7444:   }
7445: }
7446: 
7447: // ── PERFIL DEL ADMIN ──
7448: function updateProfileCard() {
7449:   const now = new Date();
7450:   const wd  = now.getDay();
7451:   const todayDay = now.getDate();
```

## Inactividad y restauración — línea 7359

```javascript
7354: function logout() {
7355:   sessionStorage.removeItem('adminToken');
7356:   location.reload();
7357: }
7358: 
7359: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7360: let _lastActivity = Date.now();
7361: const _INACTIVITY_MS = 30 * 60 * 1000;
7362: 
7363: function _resetActivity() { _lastActivity = Date.now(); }
7364: ['click','keydown','scroll','touchstart'].forEach(ev =>
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7370:     setTimeout(logout, 1500);
7371:   }
7372: }, 60_000);
7373: 
7374: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7375: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7376: document.addEventListener('visibilitychange', async () => {
7377:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
7381:       toast('Sesión expirada. Volviendo al login...', 'warn');
7382:       setTimeout(logout, 1500);
7383:     }
7384:   } catch(e) {}
7385: });
7386: 
7387: // Auto-login si tiene sesión guardada
7388: window.addEventListener('DOMContentLoaded', async () => {
7389:   initAdminUX2026();
7390:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7391:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7392:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7393:     else openProfessionalLoginMode();
7394:     return;
7395:   }
7396:   if (TOKEN) {
7397:     const btn = document.getElementById('loginBtn');
7398:     try {
7399:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7400:       const d = await r.json();
7401:       if (d.ok) {
7402:         _loginTime = Date.now();
7403:         document.getElementById('loginScreen').style.display = 'none';
7404:         document.getElementById('adminApp').style.display   = 'block';
7405:         allData = d;
7406:         await loadAdminKV();
7407:         await loadTeamData();
7408:         reloadMetas();
7409:         _initSidebarState();
7410:         initDashboard();
7411:         await _runUrlRepairIfRequested();
7412:           return;
7413:       }
7414:     } catch(e) {}
7415:     sessionStorage.removeItem('adminToken');
7416:   }
7417: });
7418: 
7419: async function _runUrlRepairIfRequested() {
7420:   const params = new URLSearchParams(location.search);
7421:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7422:   const nombre = params.get('nombre') || '';
7423:   const keepFecha = params.get('keepFecha') || '';
7424:   const keepHora = params.get('keepHora') || '';
7425:   if (!nombre || !keepFecha || !keepHora) return;
7426:   try {
7427:     const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
7428:     const result = await fetch(url).then(r => r.json());
7429:     document.body.dataset.repairResult = JSON.stringify(result);
7430:     if (result.ok) {
7431:       toast(result.repaired > 0 ? `Reparación lista: ${result.repaired} cita duplicada cancelada.` : 'Revisión lista: no encontré duplicados activos.', result.repaired > 0 ? 'ok' : 'warn');
7432:       await reload();
7433:       initDashboard();
7434:       renderAgenda();
7435:       renderCalendar();
7436:       renderCitasResumen();
7437:       renderIngresosDetalle();
7438:     } else {
7439:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7440:     }
7441:   } catch(e) {
7442:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7443:     toast('Error ejecutando reparación de reprogramación', 'err');
7444:   }
7445: }
7446: 
7447: // ── PERFIL DEL ADMIN ──
7448: function updateProfileCard() {
7449:   const now = new Date();
7450:   const wd  = now.getDay();
7451:   const todayDay = now.getDate();
7452:   const m = now.getMonth() + 1, y = now.getFullYear();
7453: 
7454:   // Semana actual (lun–dom)
7455:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7456:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7457: 
7458:   // Semana anterior (7 días antes)
7459:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7460:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7461: 
7462:   // Mes anterior
7463:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7464:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7465: 
7466:   const citas = citasReales();
7467: 
7468:   const semana = citas.filter(c => {
7469:     if (!c.hora) return false;
7470:     const [cy,cm,cd] = normDate(c.fecha).split('-');
7471:     const d = new Date(+cy, +cm-1, +cd);
7472:     return d >= startW && d <= endW;
7473:   }).length;
7474: 
7475:   const semanaPrev = citas.filter(c => {
7476:     const [cy,cm,cd] = normDate(c.fecha).split('-');
7477:     const d = new Date(+cy, +cm-1, +cd);
7478:     return d >= startPW && d <= endPW;
7479:   }).length;
7480: 
7481:   const mes = citas.filter(c => {
7482:     const [cy,cm] = normDate(c.fecha).split('-');
7483:     return +cm === m && +cy === y;
7484:   }).length;
7485: 
7486:   // Mes anterior prorateado: solo hasta el mismo día del mes para comparación justa
7487:   const mesPrev = citas.filter(c => {
7488:     const [cy,cm,cd] = normDate(c.fecha).split('-');
7489:     return +cm === pm && +cy === py && +cd <= todayDay;
```

## Inicialización al cargar la página

### Coincidencia 1 — línea 7388

```javascript
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
7381:       toast('Sesión expirada. Volviendo al login...', 'warn');
7382:       setTimeout(logout, 1500);
7383:     }
7384:   } catch(e) {}
7385: });
7386: 
7387: // Auto-login si tiene sesión guardada
7388: window.addEventListener('DOMContentLoaded', async () => {
7389:   initAdminUX2026();
7390:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7391:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7392:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7393:     else openProfessionalLoginMode();
7394:     return;
7395:   }
7396:   if (TOKEN) {
7397:     const btn = document.getElementById('loginBtn');
7398:     try {
7399:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7400:       const d = await r.json();
7401:       if (d.ok) {
7402:         _loginTime = Date.now();
7403:         document.getElementById('loginScreen').style.display = 'none';
7404:         document.getElementById('adminApp').style.display   = 'block';
7405:         allData = d;
7406:         await loadAdminKV();
7407:         await loadTeamData();
7408:         reloadMetas();
7409:         _initSidebarState();
7410:         initDashboard();
7411:         await _runUrlRepairIfRequested();
7412:           return;
7413:       }
7414:     } catch(e) {}
7415:     sessionStorage.removeItem('adminToken');
7416:   }
7417: });
7418: 
7419: async function _runUrlRepairIfRequested() {
7420:   const params = new URLSearchParams(location.search);
7421:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7422:   const nombre = params.get('nombre') || '';
7423:   const keepFecha = params.get('keepFecha') || '';
```

### Coincidencia 2 — línea 12713

```javascript
12703: // ── DARK MODE ──
12704: function toggleDarkMode() {
12705:   const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
12706:   const next = isDark ? '' : 'dark';
12707:   document.documentElement.setAttribute('data-theme', next);
12708:   localStorage.setItem('adminDarkMode', next);
12709:   const txt = document.getElementById('darkModeTxt');
12710:   if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
12711: }
12712: // Sincronizar texto del botón al cargar
12713: window.addEventListener('DOMContentLoaded', () => {
12714:   const txt = document.getElementById('darkModeTxt');
12715:   if (txt && document.documentElement.getAttribute('data-theme') === 'dark') {
12716:     txt.textContent = 'Modo claro';
12717:   }
12718: });
12719: 
12720: // ── ATAJOS DE TECLADO ──
12721: document.addEventListener('keydown', e => {
12722:   // Esc → cerrar modal abierto
12723:   if (e.key === 'Escape') {
12724:     const m = document.querySelector('.modal-bg.open');
12725:     if (m) { m.classList.remove('open'); return; }
12726:   }
12727:   // No activar atajos cuando el usuario escribe
12728:   const tag = document.activeElement ? document.activeElement.tagName : '';
12729:   if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
12730:   // Ctrl/Cmd + K → búsqueda global
12731:   if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
12732:     e.preventDefault();
12733:     const s = document.getElementById('globalSearchInput');
12734:     if (s) { s.focus(); s.select(); }
12735:   }
12736: });
12737: 
12738: // ── ENVIAR EMAIL A UN SOLO PACIENTE (recordatorio) ──
12739: async function enviarEmailUno(encNombre, semanas) {
12740:   const nombre = decodeURIComponent(encNombre);
12741:   try {
12742:     const r = await fetch(`${APPS_SCRIPT_URL}?action=sendReminders&token=${encodeURIComponent(TOKEN)}`);
12743:     const d = await r.json();
12744:     if (d.ok) {
12745:       kvSet('rec_email_'+nombre, '1');
12746:       toast('Email de recordatorio enviado a ' + nombre.split(' ')[0]);
12747:       if (_remData) renderRecordatorios(_remData);
12748:     } else toast('Error al enviar email', 'err');
```

### Coincidencia 3 — línea 18985

```javascript
18975:       const saved = localStorage.getItem('helpBanner_' + id);
18976:       // Abiertos por defecto la primera vez; cerrados si el usuario los cerró
18977:       if (saved === '0') el.classList.remove('open');
18978:       else el.classList.add('open');
18979:     } catch(e) {
18980:       el.classList.add('open');
18981:     }
18982:   });
18983: }
18984: 
18985: document.addEventListener('DOMContentLoaded', () => {
18986:   setTimeout(actualizarContadorLeads, 500);
18987:   setTimeout(restoreHelpBanners, 300);
18988: });
18989: 
18990: // ══════════════════════════════════════════
18991: //  MÓDULO DE COMISIONES
18992: // ══════════════════════════════════════════
18993: 
18994: function _comisGetConfig() {
18995:   let cfg = {};
18996:   try { cfg = JSON.parse(kvGet('comisiones_config') || '{}'); } catch(e) {}
18997:   return {
18998:     bono_agenda:           parseInt(cfg.bono_agenda           || '80000', 10),
18999:     semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
19000:     ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
19001:     bono_react:            parseInt(cfg.bono_react            || '15000', 10),
19002:     bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
19003:     pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
19004:     bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
19005:     serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
19006:     serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
19007:     bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
19008:     contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
19009:     contenido_persona:     cfg.contenido_persona || 'Persona del video',
19010:     contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
19011:     equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
19012:   };
19013: }
19014: 
19015: function saveComisConfig() {
19016:   const g = id => (document.getElementById(id)||{}).value || '';
19017:   kvSet('comisiones_config', JSON.stringify({
19018:     bono_agenda:          g('cfg_bono_agenda'),
19019:     semanas_meta:         g('cfg_semanas_meta'),
19020:     ses_llena:            g('cfg_ses_llena'),
```

### Coincidencia 4 — línea 19710

```javascript
19700:   ta.style.height = 'auto';
19701:   ta.style.height = ta.scrollHeight + 'px';
19702: }
19703: function gCargarGuardados() {
19704:   document.querySelectorAll('textarea[id^="gMsg-"]').forEach(el => {
19705:     const saved = localStorage.getItem('gMsg_' + el.id);
19706:     if (saved !== null) el.value = saved;
19707:     gFitHeight(el);
19708:   });
19709: }
19710: document.addEventListener('DOMContentLoaded', gCargarGuardados);
19711: 
19712: function gTabSwitch(tab) {
19713:   ['servicios','paquetes','membresias','recuperacion'].forEach(t => {
19714:     const el = document.getElementById('gTab-' + t);
19715:     const btn = document.getElementById('tabN' + t.charAt(0).toUpperCase() + t.slice(1)) || document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
19716:     if (el) el.style.display = t === tab ? 'block' : 'none';
19717:     if (btn) {
19718:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19719:     }
19720:   });
19721: }
19722: function gCopiar(id, btn) {
19723:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19724:   navigator.clipboard.writeText(txt).then(() => {
19725:     const orig = btn.textContent;
19726:     btn.textContent = '✅ Copiado';
19727:     btn.style.background = '#16a34a';
19728:     btn.style.color = '#fff';
19729:     setTimeout(() => {
19730:       btn.textContent = orig;
19731:       btn.style.background = '';
19732:       btn.style.color = '';
19733:     }, 2000);
19734:   }).catch(() => {
19735:     const range = document.createRange();
19736:     range.selectNode(document.getElementById(id));
19737:     window.getSelection().removeAllRanges();
19738:     window.getSelection().addRange(range);
19739:     document.execCommand('copy');
19740:     window.getSelection().removeAllRanges();
19741:     const orig = btn.textContent;
19742:     btn.textContent = '✅ Copiado';
19743:     setTimeout(() => { btn.textContent = orig; }, 2000);
19744:   });
19745: }
```

### Coincidencia 5 — línea 20282

```javascript
20272:         ${botonesHtml}
20273:       </div>
20274:     </div>`;
20275:   });
20276: 
20277:   html += '</div>';
20278:   panel.innerHTML = html;
20279: }
20280: 
20281: // Calcular comisión en tiempo real mientras se escribe el valor de venta
20282: document.addEventListener('DOMContentLoaded', () => {
20283:   const ventaInp = document.getElementById('recInpVenta');
20284:   if (ventaInp) {
20285:     ventaInp.addEventListener('input', () => {
20286:       const v = parseFloat(ventaInp.value || '0');
20287:       const comEl = document.getElementById('recInpComisionCalc');
20288:       if (comEl) comEl.value = v > 0 ? _fmtCLP(v * REC_PCT) : '$0';
20289:     });
20290:   }
20291:   // Setear fecha de hoy por defecto al entrar
20292:   const fechaInp = document.getElementById('recInpFecha');
20293:   if (fechaInp && !fechaInp.value) fechaInp.value = today();
20294: });
20295: </script>
20296: <script src="admin-copy-tools.js"></script>
20297: </body>
20298: </html>
20299: 
20300: 
20301: 
20302: 
20303: 
20304: 
```

## Limpieza de tokens

### Coincidencia 1 — línea 7198

```javascript
7191:   await loadProfessionalAgenda();
7192: }
7193: 
7194: async function loadProfessionalAgenda() {
7195:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
7199:     PROFESSIONAL_TOKEN = '';
7200:     toast(d.error || 'Sesión vencida', 'err');
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
7207: }
7208: 
7209: function setProfessionalMode(mode) {
7210:   professionalMode = mode;
7211:   document.querySelectorAll('.pro-seg').forEach(b => b.classList.remove('active'));
7212:   const btn = document.getElementById('proMode-' + mode);
```

### Coincidencia 2 — línea 7286

```javascript
7279:     })
7280:   }).then(r => r.json());
7281:   if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
7282:   else toast(d.error || 'No se pudo enviar', 'err');
7283: }
7284: 
7285: function professionalSignout() {
7286:   sessionStorage.removeItem('professionalToken');
7287:   PROFESSIONAL_TOKEN = '';
7288:   professionalSession = null;
7289:   professionalAgenda = [];
7290:   openProfessionalLoginMode();
7291: }
7292: 
7293: let _submittingBooking = false;
7294: let _submittingPatient = false;
7295: let _loginTime = null;
7296: 
7297: // ── LOGIN ──
7298: let _loginAttempts = 0;
7299: let _loginLockedUntil = 0;
7300: 
```

### Coincidencia 3 — línea 7355

```javascript
7348:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7349:     document.getElementById('loginErr').style.display = 'block';
7350:   }
7351:   btn.textContent = 'Ingresar'; btn.disabled = false;
7352: }
7353: 
7354: function logout() {
7355:   sessionStorage.removeItem('adminToken');
7356:   location.reload();
7357: }
7358: 
7359: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7360: let _lastActivity = Date.now();
7361: const _INACTIVITY_MS = 30 * 60 * 1000;
7362: 
7363: function _resetActivity() { _lastActivity = Date.now(); }
7364: ['click','keydown','scroll','touchstart'].forEach(ev =>
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
```

### Coincidencia 4 — línea 7415

```javascript
7408:         reloadMetas();
7409:         _initSidebarState();
7410:         initDashboard();
7411:         await _runUrlRepairIfRequested();
7412:           return;
7413:       }
7414:     } catch(e) {}
7415:     sessionStorage.removeItem('adminToken');
7416:   }
7417: });
7418: 
7419: async function _runUrlRepairIfRequested() {
7420:   const params = new URLSearchParams(location.search);
7421:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7422:   const nombre = params.get('nombre') || '';
7423:   const keepFecha = params.get('keepFecha') || '';
7424:   const keepHora = params.get('keepHora') || '';
7425:   if (!nombre || !keepFecha || !keepHora) return;
7426:   try {
7427:     const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
7428:     const result = await fetch(url).then(r => r.json());
7429:     document.body.dataset.repairResult = JSON.stringify(result);
```

## Persistencia de usuarios y tokens

### Coincidencia 1 — línea 6205

```javascript
6198: window.addEventListener('beforeunload', () => {
6199:   if (!Object.keys(_kvDirty).length) return;
6200:   const batch = { ..._kvDirty };
6201:   _kvDirty = {};
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
6215: let _kpiServerHistory = {};
6216: 
6217: // Escapa HTML para prevenir XSS en innerHTML
6218: function esc(s) {
6219:   return String(s == null ? '' : s)
```

### Coincidencia 2 — línea 6206

```javascript
6199:   if (!Object.keys(_kvDirty).length) return;
6200:   const batch = { ..._kvDirty };
6201:   _kvDirty = {};
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
6215: let _kpiServerHistory = {};
6216: 
6217: // Escapa HTML para prevenir XSS en innerHTML
6218: function esc(s) {
6219:   return String(s == null ? '' : s)
6220:     .replace(/&/g,'&amp;').replace(/</g,'&lt;')
```

### Coincidencia 3 — línea 6210

```javascript
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
6215: let _kpiServerHistory = {};
6216: 
6217: // Escapa HTML para prevenir XSS en innerHTML
6218: function esc(s) {
6219:   return String(s == null ? '' : s)
6220:     .replace(/&/g,'&amp;').replace(/</g,'&lt;')
6221:     .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
6222:     .replace(/'/g,'&#39;');
6223: }
6224: 
```

### Coincidencia 4 — línea 7158

```javascript
7151:         user:document.getElementById('proUser').value.trim(),
7152:         password:document.getElementById('proPass').value
7153:       })
7154:     }, 45000);
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
7161:       toast('Cambia la contraseña temporal para continuar');
7162:     } else {
7163:       await showProfessionalApp();
7164:     }
7165:   } catch(e) {
7166:     err.textContent = e.message || 'Error de acceso';
7167:     err.style.display = 'block';
7168:   } finally {
7169:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7170:   }
7171: }
7172: 
```

### Coincidencia 5 — línea 7323

```javascript
7316:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7317:       method: 'POST',
7318:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7319:     }, 45000);
7320:     if (d.ok) {
7321:       _loginAttempts = 0;
7322:       TOKEN = d.sessionToken;
7323:       sessionStorage.setItem('adminToken', d.sessionToken);
7324:       _loginTime = Date.now();
7325:       document.getElementById('loginScreen').style.display = 'none';
7326:       document.getElementById('adminApp').style.display   = 'block';
7327:       allData = d;
7328:       await loadAdminKV();
7329:       await loadTeamData();
7330:       reloadMetas();
7331:       _initSidebarState();
7332:       initDashboard();
7333:       await _runUrlRepairIfRequested();
7334:     } else {
7335:       _loginAttempts++;
7336:       const errEl = document.getElementById('loginErr');
7337:       if (_loginAttempts >= 5) {
```
