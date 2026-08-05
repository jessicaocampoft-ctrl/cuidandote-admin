# Contexto de fallos del navegador automático

## Encabezado y política de seguridad

```html
1: <!DOCTYPE html>
2: <html lang="es">
3: <head>
4: <meta charset="UTF-8">
5: <meta name="viewport" content="width=device-width,initial-scale=1">
6: <meta name="robots" content="noindex,nofollow,noarchive">
7: <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://script.google.com https://script.googleusercontent.com https://places.googleapis.com;">
8: <script>
9: (function(){
10:   var publicHosts = ['cuidandotefisioterapia.com', 'www.cuidandotefisioterapia.com'];
11:   if (publicHosts.indexOf(location.hostname) !== -1) {
12:     location.replace('/');
13:   }
14: })();
15: </script>
16: <script>if(localStorage.getItem('adminDarkMode')==='dark')document.documentElement.setAttribute('data-theme','dark');</script>
17: <title>Admin — Cuidándote Fisioterapia</title>
18: <link rel="icon" href="LogoCuidandote/favicon.png">
19: <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
20: <style>
21: *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
22: :root{
23:   --bg:#F7F8FA;--s1:#FFFFFF;--s2:#F0F2F5;--s3:#E8EAED;
24:   --primary:#1BBFB0;--primary-h:#17A89A;
25:   --text:#1A1A2E;--muted:#6B7280;
26:   --border:rgba(27,191,176,.18);--glow:rgba(27,191,176,.12);
27:   --font-h:'Cormorant Garamond',serif;--font-b:'DM Sans',sans-serif;--font-m:'DM Mono',monospace;
28:   --r:10px;--tr:.2s ease;
29:   --ok:#16a34a;--warn:#d97706;--err:#dc2626;--info:#2563eb;
30: }
31: [data-theme="dark"]{
32:   --bg:#0F1117;--s1:#1A1D24;--s2:#22262E;--s3:#2A2F3A;
33:   --text:#E8EAF0;--muted:#8B929E;
34:   --border:rgba(27,191,176,.22);--glow:rgba(27,191,176,.15);
35: }
36: html{font-size:16px;scroll-behavior:smooth}
37: body{background:var(--bg);color:var(--text);font-family:var(--font-b);min-height:100vh;overflow-x:hidden}
38: 
39: /* ── SCROLLBAR ── */
40: ::-webkit-scrollbar{width:5px;height:5px}
41: ::-webkit-scrollbar-track{background:var(--s1)}
42: ::-webkit-scrollbar-thumb{background:var(--primary);border-radius:99px}
43: 
44: /* ══════════════════════════════════════════
45:    LOGIN SCREEN
46: ══════════════════════════════════════════ */
47: #loginScreen{
48:   position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
49:   background:var(--bg);z-index:1000;
50: }
51: .login-card{
52:   background:var(--s1);border:1px solid var(--border);border-radius:16px;
53:   padding:48px 40px;width:100%;max-width:400px;text-align:center;
54:   box-shadow:0 0 60px var(--glow);
55: }
56: .login-card img{margin-bottom:28px}
57: .login-card h1{font-family:var(--font-h);font-size:1.6rem;font-weight:600;margin-bottom:8px}
58: .login-card p{color:var(--muted);font-size:.9rem;margin-bottom:28px}
59: .login-input{
60:   width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;
61:   color:var(--text);font-family:var(--font-b);font-size:.95rem;
62:   padding:12px 16px;margin-bottom:16px;outline:none;transition:var(--tr);
63: }
64: .login-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--glow)}
65: .login-btn{
66:   width:100%;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);
67:   font-size:.95rem;font-weight:600;padding:13px;border:none;border-radius:8px;
68:   cursor:pointer;transition:var(--tr);letter-spacing:.03em;
69: }
70: .login-btn:hover{background:var(--primary-h)}
71: .login-err{color:var(--err);font-size:.85rem;margin-top:12px;display:none}
72: .login-alt{
73:   margin-top:18px;border-top:1px solid var(--border);padding-top:16px;
74:   display:flex;flex-direction:column;gap:8px;align-items:center
75: }
76: .login-alt button{
77:   background:transparent;border:1px solid var(--border);border-radius:999px;
78:   color:var(--primary-h);font-family:var(--font-b);font-weight:700;
79:   padding:9px 16px;cursor:pointer;transition:var(--tr);min-height:44px
80: }
81: .login-alt button:hover,.login-alt button:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--glow);outline:none}
82: 
83: /* ══════════════════════════════════════════
84:    PORTAL PROFESIONALES / EQUIPO
85: ══════════════════════════════════════════ */
86: #proLoginScreen,#proApp{
87:   position:fixed;inset:0;background:var(--bg);z-index:1001;display:none;
88:   overflow:auto;padding:28px 16px
89: }
90: .pro-shell{width:min(1120px,100%);margin:0 auto}
```

## Función renderMetricas

### Coincidencia 1 — línea 16649

```html
16637:         <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h)">129 sesiones/mes</div>
16638:         <div style="font-size:.72rem;color:var(--muted)">~30/sem · Ticket prom. $83.000</div>
16639:       </div>
16640:     </div>
16641:   </div>`;
16642: 
16643:   el.innerHTML = html;
16644: }
16645: 
16646: // ══════════════════════════════════════════════════════════════
16647: // ── MÉTRICAS INTELIGENTES ──
16648: // ══════════════════════════════════════════════════════════════
16649: function renderMetricas() {
16650:   const now = new Date();
16651:   const m = now.getMonth() + 1;
16652:   const y = now.getFullYear();
16653:   const citas = citasReales();
16654:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16655:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16656: 
16657:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
16658:   const horMap = {};
16659:   let sinHoraCnt = 0;
16660:   citas.forEach(c => {
16661:     const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
```

## Usos de now en renderizado financiero

### Coincidencia 1 — línea 7250

```html
7238:   openProfessionalLoginMode();
7239: }
7240: 
7241: let _submittingBooking = false;
7242: let _submittingPatient = false;
7243: let _loginTime = null;
7244: 
7245: // ── LOGIN ──
7246: let _loginAttempts = 0;
7247: let _loginLockedUntil = 0;
7248: 
7249: async function doLogin() {
7250:   const ahora = Date.now();
7251:   if (_loginLockedUntil > ahora) {
7252:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7253:     const errEl = document.getElementById('loginErr');
7254:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7255:     errEl.style.display = 'block';
7256:     return;
7257:   }
7258:   const pw  = document.getElementById('pwInput').value.trim();
7259:   const user = (document.getElementById('userInput')?.value || '').trim();
7260:   const btn = document.getElementById('loginBtn');
7261:   if (!pw) return;
7262:   btn.textContent = 'Verificando...'; btn.disabled = true;
```

### Coincidencia 2 — línea 7272

```html
7260:   const btn = document.getElementById('loginBtn');
7261:   if (!pw) return;
7262:   btn.textContent = 'Verificando...'; btn.disabled = true;
7263:   try {
7264:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7265:       method: 'POST',
7266:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7267:     }, 45000);
7268:     if (d.ok) {
7269:       _loginAttempts = 0;
7270:       TOKEN = d.sessionToken;
7271:       sessionStorage.setItem('adminToken', d.sessionToken);
7272:       _loginTime = Date.now();
7273:       document.getElementById('loginScreen').style.display = 'none';
7274:       document.getElementById('adminApp').style.display   = 'block';
7275:       allData = d;
7276:       await loadAdminKV();
7277:       await loadTeamData();
7278:       reloadMetas();
7279:       _initSidebarState();
7280:       initDashboard();
7281:       await _runUrlRepairIfRequested();
7282:     } else {
7283:       _loginAttempts++;
7284:       const errEl = document.getElementById('loginErr');
```

### Coincidencia 3 — línea 7286

```html
7274:       document.getElementById('adminApp').style.display   = 'block';
7275:       allData = d;
7276:       await loadAdminKV();
7277:       await loadTeamData();
7278:       reloadMetas();
7279:       _initSidebarState();
7280:       initDashboard();
7281:       await _runUrlRepairIfRequested();
7282:     } else {
7283:       _loginAttempts++;
7284:       const errEl = document.getElementById('loginErr');
7285:       if (_loginAttempts >= 5) {
7286:         _loginLockedUntil = Date.now() + 120000;
7287:         _loginAttempts = 0;
7288:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7289:       } else {
7290:         const restantes = 5 - _loginAttempts;
7291:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
7292:       }
7293:       errEl.style.display = 'block';
7294:     }
7295:   } catch(e) {
7296:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7297:     document.getElementById('loginErr').style.display = 'block';
7298:   }
```

### Coincidencia 4 — línea 7308

```html
7296:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7297:     document.getElementById('loginErr').style.display = 'block';
7298:   }
7299:   btn.textContent = 'Ingresar'; btn.disabled = false;
7300: }
7301: 
7302: function logout() {
7303:   sessionStorage.removeItem('adminToken');
7304:   location.reload();
7305: }
7306: 
7307: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7308: let _lastActivity = Date.now();
7309: const _INACTIVITY_MS = 30 * 60 * 1000;
7310: 
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
7314: );
7315: setInterval(() => {
7316:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7317:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7318:     setTimeout(logout, 1500);
7319:   }
7320: }, 60_000);
```

### Coincidencia 5 — línea 7311

```html
7299:   btn.textContent = 'Ingresar'; btn.disabled = false;
7300: }
7301: 
7302: function logout() {
7303:   sessionStorage.removeItem('adminToken');
7304:   location.reload();
7305: }
7306: 
7307: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7308: let _lastActivity = Date.now();
7309: const _INACTIVITY_MS = 30 * 60 * 1000;
7310: 
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
7314: );
7315: setInterval(() => {
7316:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7317:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7318:     setTimeout(logout, 1500);
7319:   }
7320: }, 60_000);
7321: 
7322: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7323: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
```

### Coincidencia 6 — línea 7316

```html
7304:   location.reload();
7305: }
7306: 
7307: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7308: let _lastActivity = Date.now();
7309: const _INACTIVITY_MS = 30 * 60 * 1000;
7310: 
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
7314: );
7315: setInterval(() => {
7316:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7317:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7318:     setTimeout(logout, 1500);
7319:   }
7320: }, 60_000);
7321: 
7322: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7323: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7324: document.addEventListener('visibilitychange', async () => {
7325:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7326:   try {
7327:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7328:     if (!r.ok) {
```

### Coincidencia 7 — línea 7350

```html
7338:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7339:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7340:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7341:     else openProfessionalLoginMode();
7342:     return;
7343:   }
7344:   if (TOKEN) {
7345:     const btn = document.getElementById('loginBtn');
7346:     try {
7347:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7348:       const d = await r.json();
7349:       if (d.ok) {
7350:         _loginTime = Date.now();
7351:         document.getElementById('loginScreen').style.display = 'none';
7352:         document.getElementById('adminApp').style.display   = 'block';
7353:         allData = d;
7354:         await loadAdminKV();
7355:         await loadTeamData();
7356:         reloadMetas();
7357:         _initSidebarState();
7358:         initDashboard();
7359:         await _runUrlRepairIfRequested();
7360:           return;
7361:       }
7362:     } catch(e) {}
```

### Coincidencia 8 — línea 7397

```html
7385:       renderIngresosDetalle();
7386:     } else {
7387:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7388:     }
7389:   } catch(e) {
7390:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
```

### Coincidencia 9 — línea 7398

```html
7386:     } else {
7387:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7388:     }
7389:   } catch(e) {
7390:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
```

### Coincidencia 10 — línea 7399

```html
7387:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7388:     }
7389:   } catch(e) {
7390:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
```

### Coincidencia 11 — línea 7400

```html
7388:     }
7389:   } catch(e) {
7390:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
```

### Coincidencia 12 — línea 7400

```html
7388:     }
7389:   } catch(e) {
7390:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
```

### Coincidencia 13 — línea 7403

```html
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7413: 
7414:   const citas = citasReales();
7415: 
```

### Coincidencia 14 — línea 7403

```html
7391:     toast('Error ejecutando reparación de reprogramación', 'err');
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7413: 
7414:   const citas = citasReales();
7415: 
```

### Coincidencia 15 — línea 7411

```html
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7413: 
7414:   const citas = citasReales();
7415: 
7416:   const semana = citas.filter(c => {
7417:     if (!c.hora) return false;
7418:     const [cy,cm,cd] = normDate(c.fecha).split('-');
7419:     const d = new Date(+cy, +cm-1, +cd);
7420:     return d >= startW && d <= endW;
7421:   }).length;
7422: 
7423:   const semanaPrev = citas.filter(c => {
```

### Coincidencia 16 — línea 7457

```html
7445:   }
7446: 
7447:   const sbW = document.getElementById('sbStSemana');
7448:   const sbM = document.getElementById('sbStMes');
7449: 
7450:   if (sbW) sbW.textContent = semana;
7451:   if (sbM) sbM.textContent = mes;
7452:   setDelta(document.getElementById('sbDeltaSemana'), semana, semanaPrev);
7453:   setDelta(document.getElementById('sbDeltaMes'), mes, mesPrev);
7454: 
7455:   // Tiempo de sesión activa
7456:   if (_loginTime) {
7457:     const mins = Math.round((Date.now() - _loginTime) / 60000);
7458:     const h = Math.floor(mins / 60), rm = mins % 60;
7459:     const label = h > 0 ? `${h}h ${rm}min` : `${mins}min`;
7460:     const el = document.getElementById('sbSessionInfo');
7461:     if (el) el.innerHTML = `<span class="sb-session-dot"></span> ${label}`;
7462:   }
7463: }
7464: 
7465: function openCambiarPassword() {
7466:   ['pwActual','pwNueva','pwConfirmar'].forEach(id => { document.getElementById(id).value = ''; });
7467:   const errEl = document.getElementById('pwChangeErr');
7468:   errEl.style.display = 'none';
7469:   document.getElementById('modalCambiarPassword').classList.add('open');
```

### Coincidencia 17 — línea 7885

```html
7873:   if (v === 'recuperacion')   renderRecuperaciones();
7874:   if (v === 'acciones')       renderCentroAcciones();
7875:   if (v === 'espera')         renderWaitList();
7876:   if (v === 'automatizaciones') loadAutomationCenter();
7877:   if (v === 'dashboard')      actualizarContadorLeads();
7878: }
7879: 
7880: // ── CENTRO DE ACCIONES ──
7881: function _daysSince(dateStr) {
7882:   const normalized = normDate(dateStr);
7883:   if (!normalized) return 0;
7884:   const d = new Date(normalized + 'T12:00:00');
7885:   return Math.floor((Date.now() - d.getTime()) / 86400000);
7886: }
7887: 
7888: function _actionIcon(type) {
7889:   const icons = {
7890:     cita:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
7891:     pago:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
7892:     paciente:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>',
7893:     datos:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/></svg>'
7894:   };
7895:   return icons[type] || icons.paciente;
7896: }
7897: 
```

### Coincidencia 18 — línea 7988

```html
7976:     const d = await fetch(`${APPS_SCRIPT_URL}?action=getWaitlist&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7977:     if (d.ok) { _saveWaitList(d.items || []); _waitLoaded = true; return true; }
7978:   } catch(e) {}
7979:   return false;
7980: }
7981: 
7982: async function addWaitPatient() {
7983:   const nombre = document.getElementById('waitNombre').value.trim();
7984:   const telefono = document.getElementById('waitTelefono').value.trim();
7985:   const servicio = document.getElementById('waitServicio').value.trim();
7986:   const preferencia = document.getElementById('waitPreferencia').value.trim();
7987:   if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
7988:   const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
7989:   try {
7990:     const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
7991:     if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
7992:     item.id = d.id || item.id;
7993:   } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
7994:   const list = _getWaitList(); list.unshift(item); _saveWaitList(list); _waitLoaded = true;
7995:   ['waitNombre','waitTelefono','waitServicio','waitPreferencia'].forEach(id => document.getElementById(id).value='');
7996:   renderWaitList(); toast('Paciente agregado a la lista de espera');
7997: }
7998: 
7999: async function removeWaitPatient(id) {
8000:   try { await fetch(`${APPS_SCRIPT_URL}?action=removeWaitlist&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r=>r.json()); } catch(e) {}
```

### Coincidencia 19 — línea 8124

```html
8112: // ══════════════════════════════════════════════════════
8113: // ── PREMIUM UI — CONTADORES, MOBILE NAV, SKELETONS ──
8114: // ══════════════════════════════════════════════════════
8115: 
8116: // Contador animado para números del dashboard
8117: function _animateCounter(el, target, duration = 700) {
8118:   if (!el) return;
8119:   const isMonetary = typeof target === 'string' && target.includes('$');
8120:   const numTarget  = isMonetary
8121:     ? parseInt(target.replace(/[^0-9]/g,'')) || 0
8122:     : parseInt(String(target).replace(/[^0-9]/g,'')) || 0;
8123:   if (numTarget === 0) { el.textContent = target; return; }
8124:   const startTs = performance.now();
8125:   const easeOut = t => 1 - Math.pow(1 - t, 3);
8126:   const tick = ts => {
8127:     const progress = Math.min((ts - startTs) / duration, 1);
8128:     const current  = Math.round(easeOut(progress) * numTarget);
8129:     el.textContent = isMonetary
8130:       ? '$' + current.toLocaleString('es-CO')
8131:       : current.toLocaleString('es-CO');
8132:     if (progress < 1) requestAnimationFrame(tick);
8133:     else el.textContent = target; // valor final exacto
8134:   };
8135:   requestAnimationFrame(tick);
8136: }
```

### Coincidencia 20 — línea 8320

```html
8308:       if (c) c.pago = metodo;
8309:       if (metodo) kvSet('pago_'+id, '1');
8310:       else kvRemove('pago_'+id);
8311:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8312:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8313:       renderAgenda(); initDashboard(); renderFinanzas();
8314:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8315:   } catch(e) { toast('Error de conexión', 'err'); }
8316: }
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
```

### Coincidencia 21 — línea 8329

```html
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
8336:   if (!candidates.length) { banner.classList.remove('show'); return; }
8337:   const next = candidates[0];
8338:   const mins = Math.round(next.diff);
8339:   document.getElementById('upcomingAlertTxt').innerHTML =
8340:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8341:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 22 — línea 8329

```html
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
8336:   if (!candidates.length) { banner.classList.remove('show'); return; }
8337:   const next = candidates[0];
8338:   const mins = Math.round(next.diff);
8339:   document.getElementById('upcomingAlertTxt').innerHTML =
8340:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8341:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 23 — línea 8329

```html
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
8336:   if (!candidates.length) { banner.classList.remove('show'); return; }
8337:   const next = candidates[0];
8338:   const mins = Math.round(next.diff);
8339:   document.getElementById('upcomingAlertTxt').innerHTML =
8340:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8341:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 24 — línea 8330

```html
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
8336:   if (!candidates.length) { banner.classList.remove('show'); return; }
8337:   const next = candidates[0];
8338:   const mins = Math.round(next.diff);
8339:   document.getElementById('upcomingAlertTxt').innerHTML =
8340:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8341:   document.getElementById('upcomingAlertMins').textContent =
8342:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
```

### Coincidencia 25 — línea 8779

```html
8767:       logChange('Cita reagendada', `${cita.nombre} · ${cita.fecha} ${cita.hora} → ${fecha} ${hora}`);
8768:       await reload();
8769:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8770:       closeModal('modalDetalle');
8771:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8772:     } else toast('Error: ' + (d.error || ''), 'err');
8773:   } catch(e) { toast('Error de conexión', 'err'); }
8774: }
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
8786:   const grid = document.getElementById('weekGrid');
8787:   if (!grid) return;
8788:   grid.innerHTML = days.map((d, i) => {
8789:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8790:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8791:     const isToday = ds === todayStr;
```

### Coincidencia 26 — línea 8780

```html
8768:       await reload();
8769:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8770:       closeModal('modalDetalle');
8771:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8772:     } else toast('Error: ' + (d.error || ''), 'err');
8773:   } catch(e) { toast('Error de conexión', 'err'); }
8774: }
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
8786:   const grid = document.getElementById('weekGrid');
8787:   if (!grid) return;
8788:   grid.innerHTML = days.map((d, i) => {
8789:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8790:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8791:     const isToday = ds === todayStr;
8792:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
```

### Coincidencia 27 — línea 8781

```html
8769:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8770:       closeModal('modalDetalle');
8771:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8772:     } else toast('Error: ' + (d.error || ''), 'err');
8773:   } catch(e) { toast('Error de conexión', 'err'); }
8774: }
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
8786:   const grid = document.getElementById('weekGrid');
8787:   if (!grid) return;
8788:   grid.innerHTML = days.map((d, i) => {
8789:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8790:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8791:     const isToday = ds === todayStr;
8792:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
8793:       <span class="wday-name">${dayNames[i]}</span>
```

### Coincidencia 28 — línea 8781

```html
8769:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8770:       closeModal('modalDetalle');
8771:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8772:     } else toast('Error: ' + (d.error || ''), 'err');
8773:   } catch(e) { toast('Error de conexión', 'err'); }
8774: }
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
8786:   const grid = document.getElementById('weekGrid');
8787:   if (!grid) return;
8788:   grid.innerHTML = days.map((d, i) => {
8789:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8790:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8791:     const isToday = ds === todayStr;
8792:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
8793:       <span class="wday-name">${dayNames[i]}</span>
```

### Coincidencia 29 — línea 9237

```html
9225:     </div>`;
9226: }
9227: 
9228: function smartCobroWhatsApp(c) {
9229:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9230:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9231: }
9232: 
9233: function renderSmartCobrosCenter() {
9234:   const box = document.getElementById('smartCobrosCenter');
9235:   if (!box) return;
9236:   const hoy = today();
9237:   const now = new Date();
9238:   const m = now.getMonth() + 1, y = now.getFullYear();
9239:   const d = smartBriefingData();
9240:   const citas = citasReales().filter(smartIsActiveAppointment);
9241:   const mesPend = citas.filter(c => {
9242:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9243:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9244:   });
9245:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9246:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9247:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9248:     .slice(0,5);
9249:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
```

### Coincidencia 30 — línea 9238

```html
9226: }
9227: 
9228: function smartCobroWhatsApp(c) {
9229:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9230:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9231: }
9232: 
9233: function renderSmartCobrosCenter() {
9234:   const box = document.getElementById('smartCobrosCenter');
9235:   if (!box) return;
9236:   const hoy = today();
9237:   const now = new Date();
9238:   const m = now.getMonth() + 1, y = now.getFullYear();
9239:   const d = smartBriefingData();
9240:   const citas = citasReales().filter(smartIsActiveAppointment);
9241:   const mesPend = citas.filter(c => {
9242:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9243:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9244:   });
9245:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9246:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9247:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9248:     .slice(0,5);
9249:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
9250:   box.style.display = 'block';
```

### Coincidencia 31 — línea 9238

```html
9226: }
9227: 
9228: function smartCobroWhatsApp(c) {
9229:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9230:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9231: }
9232: 
9233: function renderSmartCobrosCenter() {
9234:   const box = document.getElementById('smartCobrosCenter');
9235:   if (!box) return;
9236:   const hoy = today();
9237:   const now = new Date();
9238:   const m = now.getMonth() + 1, y = now.getFullYear();
9239:   const d = smartBriefingData();
9240:   const citas = citasReales().filter(smartIsActiveAppointment);
9241:   const mesPend = citas.filter(c => {
9242:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9243:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9244:   });
9245:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9246:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9247:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9248:     .slice(0,5);
9249:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
9250:   box.style.display = 'block';
```

### Coincidencia 32 — línea 9316

```html
9304:       <div class="patient-insight-card"><span>Citas totales</span><strong>${lista.length}</strong></div>
9305:       <div class="patient-insight-card"><span>Realizadas</span><strong>${realizadas.length}</strong></div>
9306:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9307:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9308:     </div>
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
```

### Coincidencia 33 — línea 9317

```html
9305:       <div class="patient-insight-card"><span>Realizadas</span><strong>${realizadas.length}</strong></div>
9306:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9307:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9308:     </div>
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9329: 
```

### Coincidencia 34 — línea 9318

```html
9306:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9307:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9308:     </div>
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9329: 
9330:   document.getElementById('stHoy').textContent      = hoy;
```

### Coincidencia 35 — línea 9318

```html
9306:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9307:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9308:     </div>
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9329: 
9330:   document.getElementById('stHoy').textContent      = hoy;
```

### Coincidencia 36 — línea 9320

```html
9308:     </div>
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9329: 
9330:   document.getElementById('stHoy').textContent      = hoy;
9331:   document.getElementById('stSemana').textContent   = semana;
9332:   document.getElementById('stMes').textContent      = mes;
```

### Coincidencia 37 — línea 9321

```html
9309:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9310:   </div>`;
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9327:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9328:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9329: 
9330:   document.getElementById('stHoy').textContent      = hoy;
9331:   document.getElementById('stSemana').textContent   = semana;
9332:   document.getElementById('stMes').textContent      = mes;
9333:   document.getElementById('stPacientes').textContent = pacs;
```

### Coincidencia 38 — línea 9461

```html
9449:   // Banner tareas pendientes en dashboard
9450:   renderTareas();
9451:   // Alerta semana floja en dashboard
9452:   _checkAlertaSemanFloja(citasReales());
9453:   renderSmartBriefing();
9454:   renderSmartCobrosCenter();
9455: }
9456: 
9457: // ── AGENDA ──
9458: 
9459: // ── COBROS PENDIENTES DETALLE ──
9460: function _verCobrosPendientes() {
9461:   const now    = new Date();
9462:   const m      = now.getMonth() + 1, y = now.getFullYear();
9463:   const hoy    = today();
9464:   const citas  = citasReales();
9465:   const futuras = citas.filter(c => {
9466:     const [cy,cm] = normDate(c.fecha).split('-');
9467:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9468:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9469: 
9470:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9471:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9472: 
9473:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
```

### Coincidencia 39 — línea 9462

```html
9450:   renderTareas();
9451:   // Alerta semana floja en dashboard
9452:   _checkAlertaSemanFloja(citasReales());
9453:   renderSmartBriefing();
9454:   renderSmartCobrosCenter();
9455: }
9456: 
9457: // ── AGENDA ──
9458: 
9459: // ── COBROS PENDIENTES DETALLE ──
9460: function _verCobrosPendientes() {
9461:   const now    = new Date();
9462:   const m      = now.getMonth() + 1, y = now.getFullYear();
9463:   const hoy    = today();
9464:   const citas  = citasReales();
9465:   const futuras = citas.filter(c => {
9466:     const [cy,cm] = normDate(c.fecha).split('-');
9467:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9468:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9469: 
9470:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9471:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9472: 
9473:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
9474:     💳 Cobros pendientes — ${futuras.length} citas · ${fmtPeso(total)}
```

### Coincidencia 40 — línea 9462

```html
9450:   renderTareas();
9451:   // Alerta semana floja en dashboard
9452:   _checkAlertaSemanFloja(citasReales());
9453:   renderSmartBriefing();
9454:   renderSmartCobrosCenter();
9455: }
9456: 
9457: // ── AGENDA ──
9458: 
9459: // ── COBROS PENDIENTES DETALLE ──
9460: function _verCobrosPendientes() {
9461:   const now    = new Date();
9462:   const m      = now.getMonth() + 1, y = now.getFullYear();
9463:   const hoy    = today();
9464:   const citas  = citasReales();
9465:   const futuras = citas.filter(c => {
9466:     const [cy,cm] = normDate(c.fecha).split('-');
9467:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9468:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9469: 
9470:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9471:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9472: 
9473:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
9474:     💳 Cobros pendientes — ${futuras.length} citas · ${fmtPeso(total)}
```

### Coincidencia 41 — línea 9494

```html
9482:       <span style="font-family:var(--font-m);font-size:.88rem;font-weight:700;color:#f59e0b">${c.precio}</span>
9483:     </div>`;
9484:   });
9485:   html += `</div>`;
9486: 
9487:   // Reutiliza el modal de reporte
9488:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9489:   document.getElementById('reporteMesBody').innerHTML = html;
9490:   document.getElementById('modalReporteMes').style.display = 'flex';
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
9502:   const citas = citasReales();
9503:   const futuras = citas.filter(c => {
9504:     const f = normDate(c.fecha);
9505:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9506:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
```

### Coincidencia 42 — línea 9496

```html
9484:   });
9485:   html += `</div>`;
9486: 
9487:   // Reutiliza el modal de reporte
9488:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9489:   document.getElementById('reporteMesBody').innerHTML = html;
9490:   document.getElementById('modalReporteMes').style.display = 'flex';
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
9502:   const citas = citasReales();
9503:   const futuras = citas.filter(c => {
9504:     const f = normDate(c.fecha);
9505:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9506:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9507: 
9508:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
```

### Coincidencia 43 — línea 9497

```html
9485:   html += `</div>`;
9486: 
9487:   // Reutiliza el modal de reporte
9488:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9489:   document.getElementById('reporteMesBody').innerHTML = html;
9490:   document.getElementById('modalReporteMes').style.display = 'flex';
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
9502:   const citas = citasReales();
9503:   const futuras = citas.filter(c => {
9504:     const f = normDate(c.fecha);
9505:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9506:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9507: 
9508:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
9509:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
```

### Coincidencia 44 — línea 9497

```html
9485:   html += `</div>`;
9486: 
9487:   // Reutiliza el modal de reporte
9488:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9489:   document.getElementById('reporteMesBody').innerHTML = html;
9490:   document.getElementById('modalReporteMes').style.display = 'flex';
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
9502:   const citas = citasReales();
9503:   const futuras = citas.filter(c => {
9504:     const f = normDate(c.fecha);
9505:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9506:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9507: 
9508:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
9509:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
```

### Coincidencia 45 — línea 9572

```html
9560:   const fService = document.getElementById('fService').value;
9561:   const fDesde   = document.getElementById('fDesde').value;
9562:   const fHasta   = document.getElementById('fHasta').value;
9563: 
9564:   // Persistir filtros en sessionStorage
9565:   sessionStorage.setItem('agendaFilters', JSON.stringify(
9566:     {search, status: fSt, mod: fMod, service: fService, desde: fDesde, hasta: fHasta}
9567:   ));
9568: 
9569:   // Citas normales
9570:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9571:   if (window._agendaFiltroPendienteCierre) {
9572:     const nowMs = Date.now();
9573:     citas = citas.filter(c => {
9574:       const estado = normalizeAppointmentStatus(c);
9575:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9576:       const fecha = normDate(c.fecha);
9577:       const hora = String(c.hora || '').slice(0, 5);
9578:       if (!fecha || !/^\d{2}:\d{2}$/.test(hora)) return false;
9579:       const fin = new Date(fecha + 'T' + hora);
9580:       fin.setMinutes(fin.getMinutes() + 60);
9581:       return fin.getTime() < nowMs;
9582:     });
9583:     window._agendaFiltroPendienteCierre = false;
9584:   }
```

### Coincidencia 46 — línea 12344

```html
12332: function toggleSegFiltro(f) {
12333:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12334:   else _segFiltros.add(f);
12335:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12336:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12337:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12338:   _renderSegLista(window._segData || [], window._segReadapData || []);
12339: }
12340: 
12341: // Helpers KV sync seguimiento
12342: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12343: function segToggleR(nombre)     {
12344:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12345:   if (segReagendo(nombre)) {
12346:     kvRemove('seg_reagendo_'+nombre);
12347:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12348:   } else {
12349:     kvSet('seg_reagendo_'+nombre,'1');
12350:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12351:     const list = _comisManualReact(y, m);
12352:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12353:   }
12354:   renderSeguimiento();
12355: }
12356: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 47 — línea 12344

```html
12332: function toggleSegFiltro(f) {
12333:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12334:   else _segFiltros.add(f);
12335:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12336:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12337:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12338:   _renderSegLista(window._segData || [], window._segReadapData || []);
12339: }
12340: 
12341: // Helpers KV sync seguimiento
12342: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12343: function segToggleR(nombre)     {
12344:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12345:   if (segReagendo(nombre)) {
12346:     kvRemove('seg_reagendo_'+nombre);
12347:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12348:   } else {
12349:     kvSet('seg_reagendo_'+nombre,'1');
12350:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12351:     const list = _comisManualReact(y, m);
12352:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12353:   }
12354:   renderSeguimiento();
12355: }
12356: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 48 — línea 12344

```html
12332: function toggleSegFiltro(f) {
12333:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12334:   else _segFiltros.add(f);
12335:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12336:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12337:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12338:   _renderSegLista(window._segData || [], window._segReadapData || []);
12339: }
12340: 
12341: // Helpers KV sync seguimiento
12342: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12343: function segToggleR(nombre)     {
12344:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12345:   if (segReagendo(nombre)) {
12346:     kvRemove('seg_reagendo_'+nombre);
12347:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12348:   } else {
12349:     kvSet('seg_reagendo_'+nombre,'1');
12350:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12351:     const list = _comisManualReact(y, m);
12352:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12353:   }
12354:   renderSeguimiento();
12355: }
12356: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 49 — línea 12358

```html
12346:     kvRemove('seg_reagendo_'+nombre);
12347:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12348:   } else {
12349:     kvSet('seg_reagendo_'+nombre,'1');
12350:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12351:     const list = _comisManualReact(y, m);
12352:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12353:   }
12354:   renderSeguimiento();
12355: }
12356: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
12357: function segMarkWa(nombre, tipo, dias) {
12358:   kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
12359:   const label = tipo==='sem3' ? 'WA aviso 3 semanas' : tipo==='sem4' ? 'WA semana 4' : 'WA semana 5+';
12360:   segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin descarga)');
12361:   renderSeguimiento();
12362: }
12363: 
12364: // Log de acciones
12365: function segLogAction(nombre, tipo, accion) {
12366:   const log = JSON.parse(kvGet('seg_log') || '[]');
12367:   log.unshift({ nombre, tipo, accion, fecha: new Date().toLocaleString('es-CO',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) });
12368:   if (log.length > 80) log.length = 80;
12369:   kvSet('seg_log', JSON.stringify(log));
12370: }
```

### Coincidencia 50 — línea 12401

```html
12389:   return kvGet('seg_readap_zona_'+nombre) || '';
12390: }
12391: function setReadapZona(nombre, zona) {
12392:   if (zona) kvSet('seg_readap_zona_'+nombre, zona);
12393:   else kvRemove('seg_readap_zona_'+nombre);
12394: }
12395: 
12396: function renderSeguimiento() {
12397:   const lista = document.getElementById('segLista');
12398:   if (!lista) return;
12399:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12400: 
12401:   const now = new Date(); now.setHours(0,0,0,0);
12402: 
12403:   // Mapa: última descarga por paciente
12404:   const map = {};
12405:   allData.citas
12406:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12407:     .forEach(c => {
12408:       const nombre = (c.nombre||'').trim();
12409:       const fecha  = normDate(c.fecha);
12410:       if (!nombre || !fecha) return;
12411:       if (!map[nombre] || fecha > map[nombre].fecha) {
12412:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12413:       }
```

### Coincidencia 51 — línea 12401

```html
12389:   return kvGet('seg_readap_zona_'+nombre) || '';
12390: }
12391: function setReadapZona(nombre, zona) {
12392:   if (zona) kvSet('seg_readap_zona_'+nombre, zona);
12393:   else kvRemove('seg_readap_zona_'+nombre);
12394: }
12395: 
12396: function renderSeguimiento() {
12397:   const lista = document.getElementById('segLista');
12398:   if (!lista) return;
12399:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12400: 
12401:   const now = new Date(); now.setHours(0,0,0,0);
12402: 
12403:   // Mapa: última descarga por paciente
12404:   const map = {};
12405:   allData.citas
12406:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12407:     .forEach(c => {
12408:       const nombre = (c.nombre||'').trim();
12409:       const fecha  = normDate(c.fecha);
12410:       if (!nombre || !fecha) return;
12411:       if (!map[nombre] || fecha > map[nombre].fecha) {
12412:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12413:       }
```

### Coincidencia 52 — línea 12420

```html
12408:       const nombre = (c.nombre||'').trim();
12409:       const fecha  = normDate(c.fecha);
12410:       if (!nombre || !fecha) return;
12411:       if (!map[nombre] || fecha > map[nombre].fecha) {
12412:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12413:       }
12414:     });
12415: 
12416:   // Calcular días y semana — descargas
12417:   const pacientes = Object.values(map).map(p => {
12418:     const [y,m,d] = p.fecha.split('-');
12419:     const last = new Date(+y,+m-1,+d);
12420:     const dias = Math.floor((now - last) / 86400000);
12421:     let semana = null;
12422:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12423:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12424:     else if (dias >= 49)              semana = 'sem5';
12425:     return { ...p, dias, semana };
12426:   }).filter(p => p.semana !== null);
12427: 
12428:   // Mapa: última readaptación por paciente
12429:   const mapR = {};
12430:   allData.citas
12431:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esReadaptacion(c.servicio))
12432:     .forEach(c => {
```

### Coincidencia 53 — línea 12444

```html
12432:     .forEach(c => {
12433:       const nombre = (c.nombre||'').trim();
12434:       const fecha  = normDate(c.fecha);
12435:       if (!nombre || !fecha) return;
12436:       if (!mapR[nombre] || fecha > mapR[nombre].fecha) {
12437:         mapR[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12438:       }
12439:     });
12440: 
12441:   const readapPacs = Object.values(mapR).map(p => {
12442:     const [y,m,d] = p.fecha.split('-');
12443:     const last = new Date(+y,+m-1,+d);
12444:     const dias = Math.floor((now - last) / 86400000);
12445:     return { ...p, dias };
12446:   });
12447: 
12448:   // Contar
12449:   const c3 = pacientes.filter(p=>p.semana==='sem3').length;
12450:   const c4 = pacientes.filter(p=>p.semana==='sem4').length;
12451:   const c5 = pacientes.filter(p=>p.semana==='sem5').length;
12452:   const cR = pacientes.filter(p=>segReagendo(p.nombre)).length;
12453:   const cReadap = readapPacs.filter(p=>!segReagendo(p.nombre)).length;
12454: 
12455:   ['3','4','5','R'].forEach(k => {
12456:     const el = document.getElementById('segCount'+k);
```

### Coincidencia 54 — línea 12860

```html
12848:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12849:   renderFinanzas();
12850:   actualizarMetaBarra(calcCobradoMes());
12851:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
```

### Coincidencia 55 — línea 12861

```html
12849:   renderFinanzas();
12850:   actualizarMetaBarra(calcCobradoMes());
12851:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
12873: 
```

### Coincidencia 56 — línea 12862

```html
12850:   actualizarMetaBarra(calcCobradoMes());
12851:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
12873: 
12874: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 57 — línea 12864

```html
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
12873: 
12874: // ══════════════════════════════════════════════════════════════
12875: // ── NOTAS RÁPIDAS ──
12876: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 58 — línea 12864

```html
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
12873: 
12874: // ══════════════════════════════════════════════════════════════
12875: // ── NOTAS RÁPIDAS ──
12876: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 59 — línea 12864

```html
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12870:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12871:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12872: }
12873: 
12874: // ══════════════════════════════════════════════════════════════
12875: // ── NOTAS RÁPIDAS ──
12876: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 60 — línea 12946

```html
12934:   for (const key in grupos) {
12935:     const arr = grupos[key];
12936:     if (arr.length > 1) {
12937:       arr.slice(1).forEach(c => dups.push(c));
12938:     }
12939:   }
12940:   return dups;
12941: }
12942: 
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
12952:   const egresoFechaEl = document.getElementById('egresoFecha');
12953:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12954: 
12955:   // ── Meta ──
12956:   const meta = getMeta();
12957:   const cobradoMes = calcCobradoMes();
12958:   const metaInp = document.getElementById('metaInputFin');
```

### Coincidencia 61 — línea 12947

```html
12935:     const arr = grupos[key];
12936:     if (arr.length > 1) {
12937:       arr.slice(1).forEach(c => dups.push(c));
12938:     }
12939:   }
12940:   return dups;
12941: }
12942: 
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
12952:   const egresoFechaEl = document.getElementById('egresoFecha');
12953:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12954: 
12955:   // ── Meta ──
12956:   const meta = getMeta();
12957:   const cobradoMes = calcCobradoMes();
12958:   const metaInp = document.getElementById('metaInputFin');
12959:   const metaActTxt = document.getElementById('metaActualTexto');
```

### Coincidencia 62 — línea 12948

```html
12936:     if (arr.length > 1) {
12937:       arr.slice(1).forEach(c => dups.push(c));
12938:     }
12939:   }
12940:   return dups;
12941: }
12942: 
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
12952:   const egresoFechaEl = document.getElementById('egresoFecha');
12953:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12954: 
12955:   // ── Meta ──
12956:   const meta = getMeta();
12957:   const cobradoMes = calcCobradoMes();
12958:   const metaInp = document.getElementById('metaInputFin');
12959:   const metaActTxt = document.getElementById('metaActualTexto');
12960:   if (metaInp && meta) metaInp.value = meta.toLocaleString('es-CO');
```

### Coincidencia 63 — línea 13084

```html
13072:         ${resRow('Ticket promedio', ticketProm > 0 ? '$' + ticketProm.toLocaleString('es-CO') : '—', '')}
13073:         ${meta ? resRow('Meta cumplida', Math.min(Math.round(cobradoMes/meta*100),100) + '%', cobradoMes >= meta ? 'color:var(--ok);font-weight:700' : 'color:var(--warn)') : ''}
13074:       </div>`;
13075:   }
13076: 
13077:   // ── Alerta semana floja ──
13078:   _checkAlertaSemanFloja(citas);
13079: 
13080:   // ── Proyección extendida a fin de mes ──
13081:   const proyExtEl = document.getElementById('finProyeccionExt');
13082:   if (proyExtEl) {
13083:     const diasMes   = new Date(y, m, 0).getDate();
13084:     const diaActual = now.getDate();
13085:     const diasRest  = diasMes - diaActual;
13086:     const ritmoD    = diaActual > 0 ? cobradoMes / diaActual : 0;
13087:     const proyFin   = Math.round(ritmoD * diasMes);
13088:     const pctProy   = meta ? Math.min(Math.round(proyFin / meta * 100), 120) : null;
13089:     const color     = !meta ? 'var(--primary)' : (pctProy >= 100 ? 'var(--ok)' : pctProy >= 70 ? 'var(--warn)' : '#ef4444');
13090:     const indicador = !meta ? '🔵' : (pctProy >= 100 ? '🟢' : pctProy >= 70 ? '🟡' : '🔴');
13091:     const promNec   = meta && diasRest > 0 ? Math.round((meta - cobradoMes) / diasRest) : 0;
13092:     const difProyM  = meta ? proyFin - meta : null;
13093:     proyExtEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px">
13094:       <div style="padding:14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
13095:         <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Proyección al día ${diasMes}</div>
13096:         <div style="font-family:var(--font-h);font-size:1.25rem;font-weight:700;color:${color}">${indicador} $${proyFin.toLocaleString('es-CO')}</div>
```

### Coincidencia 64 — línea 13164

```html
13152: 
13153: function guardarEgreso() {
13154:   const fecha = document.getElementById('egresoFecha').value;
13155:   const cat   = document.getElementById('egresoCategoria').value;
13156:   const conc  = document.getElementById('egresoConcepto').value;
13157:   const monto = parseInt((document.getElementById('egresoMonto').value || '').replace(/\D/g,''), 10);
13158:   const desc  = document.getElementById('egresoDesc').value.trim();
13159: 
13160:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
13161:   if (!monto || monto <= 0) { toast('Ingresa un monto válido', 'err'); return; }
13162: 
13163:   const arr = getEgresos();
13164:   arr.push({ id: Date.now().toString(), fecha, categoria: cat, concepto: conc, monto, descripcion: desc });
13165:   saveEgresos(arr);
13166: 
13167:   document.getElementById('egresoFecha').value  = '';
13168:   document.getElementById('egresoMonto').value  = '';
13169:   document.getElementById('egresoDesc').value   = '';
13170:   toast('Egreso registrado', 'ok');
13171:   renderEgresosList();
13172:   renderEstructuraFinanciera();
13173: }
13174: 
13175: function eliminarEgreso(id) {
13176:   if (!confirm('¿Eliminar este egreso?')) return;
```

### Coincidencia 65 — línea 13187

```html
13175: function eliminarEgreso(id) {
13176:   if (!confirm('¿Eliminar este egreso?')) return;
13177:   saveEgresos(getEgresos().filter(e => e.id !== id));
13178:   renderEgresosList();
13179:   renderEstructuraFinanciera();
13180: }
13181: 
13182: function renderEgresosList() {
13183:   const el = document.getElementById('egresosListResult');
13184:   if (!el) return;
13185: 
13186:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13187:   const now = new Date();
13188:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13189:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13190:     document.getElementById('egresoMesFiltro').value = defaultMes;
13191:   }
13192:   const mes = filtroMes || defaultMes;
13193: 
13194:   let arr = getEgresos();
13195:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13196:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13197: 
13198:   if (!arr.length) {
13199:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
```

### Coincidencia 66 — línea 13188

```html
13176:   if (!confirm('¿Eliminar este egreso?')) return;
13177:   saveEgresos(getEgresos().filter(e => e.id !== id));
13178:   renderEgresosList();
13179:   renderEstructuraFinanciera();
13180: }
13181: 
13182: function renderEgresosList() {
13183:   const el = document.getElementById('egresosListResult');
13184:   if (!el) return;
13185: 
13186:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13187:   const now = new Date();
13188:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13189:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13190:     document.getElementById('egresoMesFiltro').value = defaultMes;
13191:   }
13192:   const mes = filtroMes || defaultMes;
13193: 
13194:   let arr = getEgresos();
13195:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13196:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13197: 
13198:   if (!arr.length) {
13199:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
13200:     return;
```

### Coincidencia 67 — línea 13188

```html
13176:   if (!confirm('¿Eliminar este egreso?')) return;
13177:   saveEgresos(getEgresos().filter(e => e.id !== id));
13178:   renderEgresosList();
13179:   renderEstructuraFinanciera();
13180: }
13181: 
13182: function renderEgresosList() {
13183:   const el = document.getElementById('egresosListResult');
13184:   if (!el) return;
13185: 
13186:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13187:   const now = new Date();
13188:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13189:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13190:     document.getElementById('egresoMesFiltro').value = defaultMes;
13191:   }
13192:   const mes = filtroMes || defaultMes;
13193: 
13194:   let arr = getEgresos();
13195:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13196:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13197: 
13198:   if (!arr.length) {
13199:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
13200:     return;
```

### Coincidencia 68 — línea 13383

```html
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
13390:     const [cy,cm] = normDate(c.fecha).split('-');
13391:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13392:   }).forEach(c => {
13393:     const key = (c.nombre||'').trim().toLowerCase();
13394:     if (!key) return;
13395:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
```

### Coincidencia 69 — línea 13384

```html
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
13390:     const [cy,cm] = normDate(c.fecha).split('-');
13391:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13392:   }).forEach(c => {
13393:     const key = (c.nombre||'').trim().toLowerCase();
13394:     if (!key) return;
13395:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13396:     if (c.telefono) pacMap[key].telefono = c.telefono;
```

### Coincidencia 70 — línea 13385

```html
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
13390:     const [cy,cm] = normDate(c.fecha).split('-');
13391:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13392:   }).forEach(c => {
13393:     const key = (c.nombre||'').trim().toLowerCase();
13394:     if (!key) return;
13395:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13396:     if (c.telefono) pacMap[key].telefono = c.telefono;
13397:     if (c.email)    pacMap[key].email    = c.email;
```

### Coincidencia 71 — línea 13462

```html
13450:     return raw ? JSON.parse(raw) : [];
13451:   } catch { return []; }
13452: }
13453: 
13454: function saveLeads(arr) {
13455:   kvSet('leads_log', JSON.stringify(arr));
13456: }
13457: 
13458: function addLead(canal = 'WhatsApp') {
13459:   const leads = getLeads();
13460:   const ahora = new Date();
13461:   leads.push({
13462:     id: Date.now(),
13463:     fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
13464:     hora: ahora.toTimeString().slice(0,5),    // HH:MM
13465:     canal: canal,
13466:     timestamp: ahora.getTime()
13467:   });
13468:   saveLeads(leads);
13469:   return leads.length;
13470: }
13471: 
13472: function deleteLastLead() {
13473:   const leads = getLeads();
13474:   if (leads.length === 0) return false;
```

### Coincidencia 72 — línea 13505

```html
13493: 
13494: function getLeadsMes(mesParam, anyoParam) {
13495:   const ahora = new Date();
13496:   const y = anyoParam || ahora.getFullYear();
13497:   const m = mesParam  || ahora.getMonth() + 1;
13498:   return getLeads().filter(l => {
13499:     const [ly, lm] = l.fecha.split('-');
13500:     return +ly === y && +lm === m;
13501:   }).length;
13502: }
13503: 
13504: function changeKPIMonth(m, y) {
13505:   const now = new Date();
13506:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13507:   _kpiViewMonth = esActual ? null : {m, y};
13508:   renderKPIGuia();
13509: }
13510: 
13511: function registrarLead(canal) {
13512:   addLead(canal);
13513:   actualizarContadorLeads();
13514:   const fb = document.getElementById('leadFeedback');
13515:   if (fb) {
13516:     fb.textContent = `✅ Lead de ${canal} registrado`;
13517:     setTimeout(() => { fb.textContent = ''; }, 2500);
```

### Coincidencia 73 — línea 13506

```html
13494: function getLeadsMes(mesParam, anyoParam) {
13495:   const ahora = new Date();
13496:   const y = anyoParam || ahora.getFullYear();
13497:   const m = mesParam  || ahora.getMonth() + 1;
13498:   return getLeads().filter(l => {
13499:     const [ly, lm] = l.fecha.split('-');
13500:     return +ly === y && +lm === m;
13501:   }).length;
13502: }
13503: 
13504: function changeKPIMonth(m, y) {
13505:   const now = new Date();
13506:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13507:   _kpiViewMonth = esActual ? null : {m, y};
13508:   renderKPIGuia();
13509: }
13510: 
13511: function registrarLead(canal) {
13512:   addLead(canal);
13513:   actualizarContadorLeads();
13514:   const fb = document.getElementById('leadFeedback');
13515:   if (fb) {
13516:     fb.textContent = `✅ Lead de ${canal} registrado`;
13517:     setTimeout(() => { fb.textContent = ''; }, 2500);
13518:   }
```

### Coincidencia 74 — línea 13506

```html
13494: function getLeadsMes(mesParam, anyoParam) {
13495:   const ahora = new Date();
13496:   const y = anyoParam || ahora.getFullYear();
13497:   const m = mesParam  || ahora.getMonth() + 1;
13498:   return getLeads().filter(l => {
13499:     const [ly, lm] = l.fecha.split('-');
13500:     return +ly === y && +lm === m;
13501:   }).length;
13502: }
13503: 
13504: function changeKPIMonth(m, y) {
13505:   const now = new Date();
13506:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13507:   _kpiViewMonth = esActual ? null : {m, y};
13508:   renderKPIGuia();
13509: }
13510: 
13511: function registrarLead(canal) {
13512:   addLead(canal);
13513:   actualizarContadorLeads();
13514:   const fb = document.getElementById('leadFeedback');
13515:   if (fb) {
13516:     fb.textContent = `✅ Lead de ${canal} registrado`;
13517:     setTimeout(() => { fb.textContent = ''; }, 2500);
13518:   }
```

### Coincidencia 75 — línea 13592

```html
13580:   const el = document.getElementById('kpiTableroResult');
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
13584:   const manual = getKPIManual();
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
```

### Coincidencia 76 — línea 13593

```html
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
13584:   const manual = getKPIManual();
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
```

### Coincidencia 77 — línea 13593

```html
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
13584:   const manual = getKPIManual();
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
```

### Coincidencia 78 — línea 13597

```html
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
13606:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13607:   });
13608:   const eventosSemana = (allData.eventos || []).filter(e => {
13609:     const f = normDate(e.fecha);
```

### Coincidencia 79 — línea 13597

```html
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
13606:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13607:   });
13608:   const eventosSemana = (allData.eventos || []).filter(e => {
13609:     const f = normDate(e.fecha);
```

### Coincidencia 80 — línea 13598

```html
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
13606:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13607:   });
13608:   const eventosSemana = (allData.eventos || []).filter(e => {
13609:     const f = normDate(e.fecha);
13610:     return f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 81 — línea 13598

```html
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13604:   const citasSemana = citas.filter(c => {
13605:     const f = normDate(c.fecha);
13606:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13607:   });
13608:   const eventosSemana = (allData.eventos || []).filter(e => {
13609:     const f = normDate(e.fecha);
13610:     return f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 82 — línea 13823

```html
13811: 
13812:   el.innerHTML = html;
13813: }
13814: 
13815: // ══════════════════════════════════════════════════════════════
13816: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13817: // ══════════════════════════════════════════════════════════════
13818: function _copyGestionMesKey(d = new Date()) {
13819:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13820: }
13821: 
13822: function _copyGestionPeriodo() {
13823:   const now = new Date();
13824:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
```

### Coincidencia 83 — línea 13825

```html
13813: }
13814: 
13815: // ══════════════════════════════════════════════════════════════
13816: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13817: // ══════════════════════════════════════════════════════════════
13818: function _copyGestionMesKey(d = new Date()) {
13819:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13820: }
13821: 
13822: function _copyGestionPeriodo() {
13823:   const now = new Date();
13824:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
```

### Coincidencia 84 — línea 13825

```html
13813: }
13814: 
13815: // ══════════════════════════════════════════════════════════════
13816: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13817: // ══════════════════════════════════════════════════════════════
13818: function _copyGestionMesKey(d = new Date()) {
13819:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13820: }
13821: 
13822: function _copyGestionPeriodo() {
13823:   const now = new Date();
13824:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
```

### Coincidencia 85 — línea 13837

```html
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
13838:   const monthKey = _copyGestionMesKey(now);
13839:   const citasAll = allData.citas || [];
13840:   const eventosAll = allData.eventos || [];
13841:   const pacientesAll = allData.pacientes || [];
13842:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13843:   const manual = getKPIManual ? getKPIManual() : {};
13844:   const cfg = getKPIConfig ? getKPIConfig() : {};
13845:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13846:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13847:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
13848:   const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
13849:   const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
```

### Coincidencia 86 — línea 13838

```html
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
13838:   const monthKey = _copyGestionMesKey(now);
13839:   const citasAll = allData.citas || [];
13840:   const eventosAll = allData.eventos || [];
13841:   const pacientesAll = allData.pacientes || [];
13842:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13843:   const manual = getKPIManual ? getKPIManual() : {};
13844:   const cfg = getKPIConfig ? getKPIConfig() : {};
13845:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13846:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13847:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
13848:   const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
13849:   const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
13850:   const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
```

### Coincidencia 87 — línea 13890

```html
13878:     const serv = c.servicio || 'Sin servicio';
13879:     servicios[serv] = (servicios[serv] || 0) + 1;
13880:     const h = String(c.hora || '').slice(0,2) + ':00';
13881:     if (h && h !== ':00') horarios[h] = (horarios[h] || 0) + 1;
13882:   });
13883:   const serviciosArr = Object.entries(servicios).sort((a,b) => b[1] - a[1]);
13884:   const horariosArr = Object.entries(horarios).sort((a,b) => b[1] - a[1]);
13885:   const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
13886:   const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;
13887: 
13888:   const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
13889:   const leadsConvertidos = manual.convertidos || citasMesActivas.length;
13890:   const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);
13891: 
13892:   const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
13893:   const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
13894:   const disponibilidadPros = pros.length
13895:     ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
13896:     : 'Sin fisioterapeutas registrados';
13897: 
13898:   return {
13899:     periodo: _copyGestionPeriodo(),
13900:     metaMensual, ingresosCobrados, ventasGeneradas, pendienteCobrar, egresosMes, ganancia, cumplimiento, faltante,
13901:     citasProgramadas: citasMesActivas.length,
13902:     sesionesAtendidas,
```

### Coincidencia 88 — línea 14340

```html
14328:     <span style="font-size:1rem;margin-top:1px">${dot}</span>
14329:     <div style="flex:1;min-width:0">
14330:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14331:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14332:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14333:       </div>
14334:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14335:     </div>
14336:   </div>`;
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14347:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14348: 
14349:   const citas  = citasReales();
14350:   const manual = getKPIManual();
14351:   const todasCitas = allData.citas || [];
14352:   const eventosAll = allData.eventos || [];
```

### Coincidencia 89 — línea 14341

```html
14329:     <div style="flex:1;min-width:0">
14330:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14331:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14332:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14333:       </div>
14334:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14335:     </div>
14336:   </div>`;
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14347:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14348: 
14349:   const citas  = citasReales();
14350:   const manual = getKPIManual();
14351:   const todasCitas = allData.citas || [];
14352:   const eventosAll = allData.eventos || [];
14353: 
```

### Coincidencia 90 — línea 14342

```html
14330:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14331:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14332:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14333:       </div>
14334:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14335:     </div>
14336:   </div>`;
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14347:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14348: 
14349:   const citas  = citasReales();
14350:   const manual = getKPIManual();
14351:   const todasCitas = allData.citas || [];
14352:   const eventosAll = allData.eventos || [];
14353: 
14354:   // ══════════ CÁLCULOS ══════════
```

### Coincidencia 91 — línea 14455

```html
14443:   );
14444:   const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
14445:   const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
14446: 
14447:   // Cancelaciones por servicio
14448:   const cancelPorServ = {};
14449:   canceladasMes.forEach(c => {
14450:     const sv = c.servicio||'Sin tipo';
14451:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14452:   });
14453: 
14454:   // ── Pacientes ──
14455:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14456:   const pacMesMap = {};
14457:   citasMes.forEach(c => {
14458:     if (!c.nombre) return;
14459:     const k = c.nombre.trim().toLowerCase();
14460:     pacMesMap[k] = (pacMesMap[k]||0)+1;
14461:   });
14462:   const pacUnicosMes = Object.keys(pacMesMap).length;
14463: 
14464:   let pacNuevos = 0, pacRecurrentes = 0;
14465:   Object.keys(pacMesMap).forEach(pac => {
14466:     const prev = todasCitas.filter(c => {
14467:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
```

### Coincidencia 92 — línea 14455

```html
14443:   );
14444:   const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
14445:   const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
14446: 
14447:   // Cancelaciones por servicio
14448:   const cancelPorServ = {};
14449:   canceladasMes.forEach(c => {
14450:     const sv = c.servicio||'Sin tipo';
14451:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14452:   });
14453: 
14454:   // ── Pacientes ──
14455:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14456:   const pacMesMap = {};
14457:   citasMes.forEach(c => {
14458:     if (!c.nombre) return;
14459:     const k = c.nombre.trim().toLowerCase();
14460:     pacMesMap[k] = (pacMesMap[k]||0)+1;
14461:   });
14462:   const pacUnicosMes = Object.keys(pacMesMap).length;
14463: 
14464:   let pacNuevos = 0, pacRecurrentes = 0;
14465:   Object.keys(pacMesMap).forEach(pac => {
14466:     const prev = todasCitas.filter(c => {
14467:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
```

### Coincidencia 93 — línea 14478

```html
14466:     const prev = todasCitas.filter(c => {
14467:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
14468:       const f = new Date(normDate(c.fecha)+'T12:00:00');
14469:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
14470:     });
14471:     if (prev.length===0) pacNuevos++; else pacRecurrentes++;
14472:   });
14473: 
14474:   // Top 5 pacientes por sesiones
14475:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14476: 
14477:   // Retención 60 días
14478:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14479:   const conteoPac = {};
14480:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14481:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14482:   const pac60 = Object.keys(conteoPac).length;
14483:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
14484:   const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;
14485: 
14486:   // ── Leads y conversión ──
14487:   const leadsMes = getLeadsMes() || manual.leads || 0;
14488:   const citasNuevasMes = citasMes.length;
14489:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14490: 
```

### Coincidencia 94 — línea 14478

```html
14466:     const prev = todasCitas.filter(c => {
14467:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
14468:       const f = new Date(normDate(c.fecha)+'T12:00:00');
14469:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
14470:     });
14471:     if (prev.length===0) pacNuevos++; else pacRecurrentes++;
14472:   });
14473: 
14474:   // Top 5 pacientes por sesiones
14475:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14476: 
14477:   // Retención 60 días
14478:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14479:   const conteoPac = {};
14480:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14481:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14482:   const pac60 = Object.keys(conteoPac).length;
14483:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
14484:   const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;
14485: 
14486:   // ── Leads y conversión ──
14487:   const leadsMes = getLeadsMes() || manual.leads || 0;
14488:   const citasNuevasMes = citasMes.length;
14489:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14490: 
```

### Coincidencia 95 — línea 14593

```html
14581:   ].filter(Boolean).length;
14582:   const totalKpis = 5;
14583:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14584:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14585:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14586:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14587: 
14588:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14589:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14590:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14591:       <div style="flex:1">
14592:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
14593:         <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
14594:       </div>
14595:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
14596:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14597:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
14598:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
14599:         </div>
14600:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14601:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${totalSesiones}</div>
14602:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">SESIONES</div>
14603:         </div>
14604:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14605:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${utilidadMes>=0?'var(--ok)':'#ef4444'}">${fmtPeso(utilidadMes)}</div>
```

### Coincidencia 96 — línea 15009

```html
14997:   } else {
14998:     html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
14999:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
15000:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
15001:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
15002:     </div>`;
15003:   }
15004: 
15005:   return html;
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
15015:   const el = document.getElementById('reporteMesBody');
15016:   // Construir texto plano desde el HTML
15017:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15018:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15019: 
15020:   navigator.clipboard.writeText(txt).then(() => {
15021:     const btn = document.getElementById('btnCopiarReporte');
```

### Coincidencia 97 — línea 15010

```html
14998:     html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
14999:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
15000:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
15001:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
15002:     </div>`;
15003:   }
15004: 
15005:   return html;
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
15015:   const el = document.getElementById('reporteMesBody');
15016:   // Construir texto plano desde el HTML
15017:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15018:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15019: 
15020:   navigator.clipboard.writeText(txt).then(() => {
15021:     const btn = document.getElementById('btnCopiarReporte');
15022:     const orig = btn.innerHTML;
```

### Coincidencia 98 — línea 15011

```html
14999:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
15000:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
15001:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
15002:     </div>`;
15003:   }
15004: 
15005:   return html;
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
15015:   const el = document.getElementById('reporteMesBody');
15016:   // Construir texto plano desde el HTML
15017:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15018:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15019: 
15020:   navigator.clipboard.writeText(txt).then(() => {
15021:     const btn = document.getElementById('btnCopiarReporte');
15022:     const orig = btn.innerHTML;
15023:     btn.textContent = '✓ Copiado';
```

### Coincidencia 99 — línea 15055

```html
15043:     <p style="color:#6B7280;font-size:.85rem;margin-bottom:28px">Reporte automático de indicadores de gestión</p>
15044:     ${body}
15045:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15046:   </body></html>`);
15047:   w.document.close();
15048:   setTimeout(() => w.print(), 500);
15049: }
15050: 
15051: // ══════════════════════════════════════════════════════════════
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
15062: 
15063:   const citas      = citasReales();
15064:   const todasCitas = allData.citas || [];
15065:   const eventosAll = allData.eventos || [];
15066:   const manual     = getKPIManual();
15067:   const costos     = getCostosEstructura();
```

### Coincidencia 100 — línea 15056

```html
15044:     ${body}
15045:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15046:   </body></html>`);
15047:   w.document.close();
15048:   setTimeout(() => w.print(), 500);
15049: }
15050: 
15051: // ══════════════════════════════════════════════════════════════
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
15062: 
15063:   const citas      = citasReales();
15064:   const todasCitas = allData.citas || [];
15065:   const eventosAll = allData.eventos || [];
15066:   const manual     = getKPIManual();
15067:   const costos     = getCostosEstructura();
15068:   const calc       = calcTotalCostos(costos);
```

### Coincidencia 101 — línea 15057

```html
15045:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15046:   </body></html>`);
15047:   w.document.close();
15048:   setTimeout(() => w.print(), 500);
15049: }
15050: 
15051: // ══════════════════════════════════════════════════════════════
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
15062: 
15063:   const citas      = citasReales();
15064:   const todasCitas = allData.citas || [];
15065:   const eventosAll = allData.eventos || [];
15066:   const manual     = getKPIManual();
15067:   const costos     = getCostosEstructura();
15068:   const calc       = calcTotalCostos(costos);
15069: 
```

### Coincidencia 102 — línea 15103

```html
15091:   citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
15092:   const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
15093:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
15094:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
15095: 
15096:   // ── Cancelaciones ──
15097:   const motivosMes    = getCancelMotivos();
15098:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15099:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15100:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15101: 
15102:   // ── Pacientes ──
15103:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15104:   const pacMesMap = {};
15105:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15106:   const pacUnicosMes = Object.keys(pacMesMap).length;
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
15109:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15110:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15111:   });
15112:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15113:   const cont60={};
15114:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
```

### Coincidencia 103 — línea 15103

```html
15091:   citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
15092:   const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
15093:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
15094:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
15095: 
15096:   // ── Cancelaciones ──
15097:   const motivosMes    = getCancelMotivos();
15098:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15099:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15100:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15101: 
15102:   // ── Pacientes ──
15103:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15104:   const pacMesMap = {};
15105:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15106:   const pacUnicosMes = Object.keys(pacMesMap).length;
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
15109:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15110:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15111:   });
15112:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15113:   const cont60={};
15114:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
```

### Coincidencia 104 — línea 15112

```html
15100:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15101: 
15102:   // ── Pacientes ──
15103:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15104:   const pacMesMap = {};
15105:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15106:   const pacUnicosMes = Object.keys(pacMesMap).length;
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
15109:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15110:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15111:   });
15112:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15113:   const cont60={};
15114:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15116:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15117: 
15118:   // ── Leads y marketing ──
15119:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15120:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15121:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15122:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15123:   const canalMap={}, canalIng={};
15124:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
```

### Coincidencia 105 — línea 15112

```html
15100:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15101: 
15102:   // ── Pacientes ──
15103:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15104:   const pacMesMap = {};
15105:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15106:   const pacUnicosMes = Object.keys(pacMesMap).length;
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
15109:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15110:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15111:   });
15112:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15113:   const cont60={};
15114:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15116:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15117: 
15118:   // ── Leads y marketing ──
15119:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15120:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15121:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15122:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15123:   const canalMap={}, canalIng={};
15124:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
```

### Coincidencia 106 — línea 15153

```html
15141:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
15142:   const diaPico = diasNom[porDia.indexOf(Math.max(...porDia))];
15143:   const diaBajo = diasNom[[1,2,3,4,5,6,0].reduce((best,d)=>porDia[d]<porDia[best]?d:best, 1)];
15144: 
15145:   // ════════════ CONSTRUIR TEXTO ════════════
15146:   let t = '';
15147:   const line = (l='') => t += l + '\n';
15148:   const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
15149:   const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
15150:   const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);
15151: 
15152:   line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
15153:   line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
15154:   line(sep(60));
15155:   line();
15156:   line(`CONTEXTO DEL NEGOCIO`);
15157:   line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
15158:   line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
15159:   line(`Objetivo: ${fmtPeso(calc.total)}/mes para cubrir costos, imprevistos y 20% de utilidad.`);
15160: 
15161:   h1(`1. RESULTADOS FINANCIEROS`);
15162:   row('Ingresos facturados', fmtPeso(ventasFact));
15163:   row('Ingresos cobrados', fmtPeso(ventasCobradas));
15164:   row('Pendiente de cobro', fmtPeso(ventasPendientes));
15165:   row('Meta de ventas del mes', fmtPeso(calc.total));
```

### Coincidencia 107 — línea 15364

```html
15352:     if (body) body.style.display = 'block';
15353:     if (id === 'gkKpi4b') _renderCancelBreakdown();
15354:     if (id === 'gkKpi8')  _renderBDBreakdown();
15355:   }
15356:   setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
15357: }
15358: 
15359: // ══ MANUAL DE EMERGENCIA — funciones ══
15360: function renderEmergencia() {
15361:   const d = window._emKPIData;
15362:   if (!d) return;
15363: 
15364:   const now  = new Date();
15365:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15366: 
15367:   function kpiSt(val, meta, altoEsMejor) {
15368:     if (isNaN(val) || !meta || meta <= 0) return -1;
15369:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15370:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15371:     return ok ? 0 : warn ? 1 : 2;
15372:   }
15373: 
15374:   const st = {
15375:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15376:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
```

### Coincidencia 108 — línea 15365

```html
15353:     if (id === 'gkKpi4b') _renderCancelBreakdown();
15354:     if (id === 'gkKpi8')  _renderBDBreakdown();
15355:   }
15356:   setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
15357: }
15358: 
15359: // ══ MANUAL DE EMERGENCIA — funciones ══
15360: function renderEmergencia() {
15361:   const d = window._emKPIData;
15362:   if (!d) return;
15363: 
15364:   const now  = new Date();
15365:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15366: 
15367:   function kpiSt(val, meta, altoEsMejor) {
15368:     if (isNaN(val) || !meta || meta <= 0) return -1;
15369:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15370:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15371:     return ok ? 0 : warn ? 1 : 2;
15372:   }
15373: 
15374:   const st = {
15375:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15376:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15377:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
```

### Coincidencia 109 — línea 15535

```html
15523:   kvRemove('em_steps_' + kpi);
15524:   for (let i = 0; i < total; i++) {
15525:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15526:     if (ck) ck.checked = false;
15527:   }
15528:   _updateEmProgress(kpi);
15529: }
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 110 — línea 15536

```html
15524:   for (let i = 0; i < total; i++) {
15525:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15526:     if (ck) ck.checked = false;
15527:   }
15528:   _updateEmProgress(kpi);
15529: }
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
```

### Coincidencia 111 — línea 15537

```html
15525:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15526:     if (ck) ck.checked = false;
15527:   }
15528:   _updateEmProgress(kpi);
15529: }
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
```

### Coincidencia 112 — línea 15538

```html
15526:     if (ck) ck.checked = false;
15527:   }
15528:   _updateEmProgress(kpi);
15529: }
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
```

### Coincidencia 113 — línea 15538

```html
15526:     if (ck) ck.checked = false;
15527:   }
15528:   _updateEmProgress(kpi);
15529: }
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
```

### Coincidencia 114 — línea 15546

```html
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15552:     });
15553:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15554:       const f = normDate(e.fecha);
15555:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15556:     });
15557:     const _nCitasG = citasSemana.length;
15558:     _nEvG    = eventosSemanaG.length;
```

### Coincidencia 115 — línea 15546

```html
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15552:     });
15553:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15554:       const f = normDate(e.fecha);
15555:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15556:     });
15557:     const _nCitasG = citasSemana.length;
15558:     _nEvG    = eventosSemanaG.length;
```

### Coincidencia 116 — línea 15547

```html
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15552:     });
15553:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15554:       const f = normDate(e.fecha);
15555:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15556:     });
15557:     const _nCitasG = citasSemana.length;
15558:     _nEvG    = eventosSemanaG.length;
15559:     const sessSemana = _nCitasG + _nEvG;
```

### Coincidencia 117 — línea 15547

```html
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15552:     });
15553:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15554:       const f = normDate(e.fecha);
15555:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15556:     });
15557:     const _nCitasG = citasSemana.length;
15558:     _nEvG    = eventosSemanaG.length;
15559:     const sessSemana = _nCitasG + _nEvG;
```

### Coincidencia 118 — línea 15628

```html
15616:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15617:   const _stRecurrentes = _listaRecurrentes.length;
15618: 
15619:   // Extra — Cancelaciones mes (excluye pruebas)
15620:   const _motivosGuia  = getCancelMotivos();
15621:   const todasCitasMes = (allData.citas || []).filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
15622:   const canceladasMes = todasCitasMes.filter(c =>
15623:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15624:   ).length;
15625:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15626: 
15627:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15628:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15629:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
15630:   const cuentaPac = {};
15631:   citas.filter(c => {
15632:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15633:     return fd >= hace60 && fd <= refDate;
15634:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15635:   const pacs60     = Object.keys(cuentaPac).length;
15636:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15637:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15638: 
15639:   // Selector de mes
15640:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
```

### Coincidencia 119 — línea 15643

```html
15631:   citas.filter(c => {
15632:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15633:     return fd >= hace60 && fd <= refDate;
15634:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15635:   const pacs60     = Object.keys(cuentaPac).length;
15636:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15637:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15638: 
15639:   // Selector de mes
15640:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15641:   let opcionesSelect = '';
15642:   for (let i = 0; i < 13; i++) {
15643:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15644:     const om = d.getMonth() + 1, oy = d.getFullYear();
15645:     const sel = (om === m && oy === y) ? 'selected' : '';
15646:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15647:   }
15648: 
15649:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15650:   const subtitulo = esMesActual
15651:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15652:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15653: 
15654:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15655:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
```

### Coincidencia 120 — línea 15643

```html
15631:   citas.filter(c => {
15632:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15633:     return fd >= hace60 && fd <= refDate;
15634:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15635:   const pacs60     = Object.keys(cuentaPac).length;
15636:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15637:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15638: 
15639:   // Selector de mes
15640:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15641:   let opcionesSelect = '';
15642:   for (let i = 0; i < 13; i++) {
15643:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15644:     const om = d.getMonth() + 1, oy = d.getFullYear();
15645:     const sel = (om === m && oy === y) ? 'selected' : '';
15646:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15647:   }
15648: 
15649:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15650:   const subtitulo = esMesActual
15651:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15652:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15653: 
15654:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15655:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
```

### Coincidencia 121 — línea 15649

```html
15637:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15638: 
15639:   // Selector de mes
15640:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15641:   let opcionesSelect = '';
15642:   for (let i = 0; i < 13; i++) {
15643:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15644:     const om = d.getMonth() + 1, oy = d.getFullYear();
15645:     const sel = (om === m && oy === y) ? 'selected' : '';
15646:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15647:   }
15648: 
15649:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15650:   const subtitulo = esMesActual
15651:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15652:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15653: 
15654:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15655:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
15656:       <div>
15657:         <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
15658:         <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
15659:       </div>
15660:       <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
15661:         <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
```

### Coincidencia 122 — línea 15710

```html
15698:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15699:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
15700:     </div>`;
15701:   };
15702:   // Pacientes de 1 sola sesión que no han vuelto en +30 días
15703:   const _citasPorPac = {};
15704:   citasReales().forEach(c => {
15705:     if (!c.nombre) return;
15706:     const nom = c.nombre.trim().toLowerCase();
15707:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15708:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15709:   });
15710:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15711:   const hace90Str = hace90.toLocalDateStr();
15712:   const _listaUnaVez = Object.values(_citasPorPac)
15713:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15714:     .map(p => p.nombre).sort();
15715: 
15716:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15717:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15718:   // Cálculo: sesiones diarias necesarias para cumplir meta
15719:   if (esMesActual) {
15720:     const diasEnMes = new Date(y, m, 0).getDate();
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
```

### Coincidencia 123 — línea 15710

```html
15698:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15699:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
15700:     </div>`;
15701:   };
15702:   // Pacientes de 1 sola sesión que no han vuelto en +30 días
15703:   const _citasPorPac = {};
15704:   citasReales().forEach(c => {
15705:     if (!c.nombre) return;
15706:     const nom = c.nombre.trim().toLowerCase();
15707:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15708:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15709:   });
15710:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15711:   const hace90Str = hace90.toLocalDateStr();
15712:   const _listaUnaVez = Object.values(_citasPorPac)
15713:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15714:     .map(p => p.nombre).sort();
15715: 
15716:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15717:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15718:   // Cálculo: sesiones diarias necesarias para cumplir meta
15719:   if (esMesActual) {
15720:     const diasEnMes = new Date(y, m, 0).getDate();
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
```

### Coincidencia 124 — línea 15722

```html
15710:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15711:   const hace90Str = hace90.toLocalDateStr();
15712:   const _listaUnaVez = Object.values(_citasPorPac)
15713:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15714:     .map(p => p.nombre).sort();
15715: 
15716:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15717:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15718:   // Cálculo: sesiones diarias necesarias para cumplir meta
15719:   if (esMesActual) {
15720:     const diasEnMes = new Date(y, m, 0).getDate();
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15723:       const dow = new Date(y, m - 1, d).getDay();
15724:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15725:     }
15726:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15727:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15728:     const avgPrecio     = citasMesHechas.length > 0
15729:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15730:       : (getKPIConfig().precio_full || 80000);
15731:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15732:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15733:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15734:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
```

### Coincidencia 125 — línea 15833

```html
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
```

### Coincidencia 126 — línea 15834

```html
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
```

### Coincidencia 127 — línea 15835

```html
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 128 — línea 15838

```html
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
```

### Coincidencia 129 — línea 15838

```html
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
```

### Coincidencia 130 — línea 15839

```html
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15851:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
```

### Coincidencia 131 — línea 15839

```html
15827: }
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15851:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
```

### Coincidencia 132 — línea 15974

```html
15962: function getEncuestaStats() {
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
```

### Coincidencia 133 — línea 15975

```html
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
```

### Coincidencia 134 — línea 15975

```html
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
```

### Coincidencia 135 — línea 15986

```html
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
```

### Coincidencia 136 — línea 16085

```html
16073:     const lbl = cb ? cb.closest('.gk-check-item') : null;
16074:     if (!cb || !lbl) return;
16075:     cb.checked = false;
16076:     lbl.classList.remove('done');
16077:   });
16078:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16079:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16080: }
16081: 
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
16091:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16092:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16093:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16094:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16095:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16096:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16097:     </div>
```

### Coincidencia 137 — línea 16086

```html
16074:     if (!cb || !lbl) return;
16075:     cb.checked = false;
16076:     lbl.classList.remove('done');
16077:   });
16078:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16079:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16080: }
16081: 
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
16091:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16092:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16093:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16094:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16095:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16096:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16097:     </div>
16098:     ${bd.sinTel ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #ef4444">
```

### Coincidencia 138 — línea 16087

```html
16075:     cb.checked = false;
16076:     lbl.classList.remove('done');
16077:   });
16078:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16079:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16080: }
16081: 
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
16091:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16092:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16093:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16094:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16095:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16096:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16097:     </div>
16098:     ${bd.sinTel ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #ef4444">
16099:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">SIN TELÉFONO</div>
```

### Coincidencia 139 — línea 16507

```html
16495:   if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2500); }
16496:   toast('Valores actualizados ✓', 'ok');
16497: }
16498: 
16499: // ══════════════════════════════════════════════════════════════
16500: // ── ESTRUCTURA FINANCIERA ──
16501: // ══════════════════════════════════════════════════════════════
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
16519:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
```

### Coincidencia 140 — línea 16509

```html
16497: }
16498: 
16499: // ══════════════════════════════════════════════════════════════
16500: // ── ESTRUCTURA FINANCIERA ──
16501: // ══════════════════════════════════════════════════════════════
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
16519:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16520:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16521:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
```

### Coincidencia 141 — línea 16509

```html
16497: }
16498: 
16499: // ══════════════════════════════════════════════════════════════
16500: // ── ESTRUCTURA FINANCIERA ──
16501: // ══════════════════════════════════════════════════════════════
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
16519:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16520:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16521:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
```

### Coincidencia 142 — línea 16513

```html
16501: // ══════════════════════════════════════════════════════════════
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
16519:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16520:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16521:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
16522:   const colorMeta = ingMes >= COSTO_META ? 'var(--ok)' : '#f59e0b';
16523: 
16524:   function barRow(label, pct, color) {
16525:     return `<div style="margin-bottom:6px">
```

### Coincidencia 143 — línea 16513

```html
16501: // ══════════════════════════════════════════════════════════════
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
16519:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16520:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16521:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
16522:   const colorMeta = ingMes >= COSTO_META ? 'var(--ok)' : '#f59e0b';
16523: 
16524:   function barRow(label, pct, color) {
16525:     return `<div style="margin-bottom:6px">
```

### Coincidencia 144 — línea 16650

```html
16638:         <div style="font-size:.72rem;color:var(--muted)">~30/sem · Ticket prom. $83.000</div>
16639:       </div>
16640:     </div>
16641:   </div>`;
16642: 
16643:   el.innerHTML = html;
16644: }
16645: 
16646: // ══════════════════════════════════════════════════════════════
16647: // ── MÉTRICAS INTELIGENTES ──
16648: // ══════════════════════════════════════════════════════════════
16649: function renderMetricas() {
16650:   const now = new Date();
16651:   const m = now.getMonth() + 1;
16652:   const y = now.getFullYear();
16653:   const citas = citasReales();
16654:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16655:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16656: 
16657:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
16658:   const horMap = {};
16659:   let sinHoraCnt = 0;
16660:   citas.forEach(c => {
16661:     const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
16662:     if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
```

### Coincidencia 145 — línea 16651

```html
16639:       </div>
16640:     </div>
16641:   </div>`;
16642: 
16643:   el.innerHTML = html;
16644: }
16645: 
16646: // ══════════════════════════════════════════════════════════════
16647: // ── MÉTRICAS INTELIGENTES ──
16648: // ══════════════════════════════════════════════════════════════
16649: function renderMetricas() {
16650:   const now = new Date();
16651:   const m = now.getMonth() + 1;
16652:   const y = now.getFullYear();
16653:   const citas = citasReales();
16654:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16655:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16656: 
16657:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
16658:   const horMap = {};
16659:   let sinHoraCnt = 0;
16660:   citas.forEach(c => {
16661:     const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
16662:     if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
16663:     else sinHoraCnt++;
```

### Coincidencia 146 — línea 16652

```html
16640:     </div>
16641:   </div>`;
16642: 
16643:   el.innerHTML = html;
16644: }
16645: 
16646: // ══════════════════════════════════════════════════════════════
16647: // ── MÉTRICAS INTELIGENTES ──
16648: // ══════════════════════════════════════════════════════════════
16649: function renderMetricas() {
16650:   const now = new Date();
16651:   const m = now.getMonth() + 1;
16652:   const y = now.getFullYear();
16653:   const citas = citasReales();
16654:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16655:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16656: 
16657:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
16658:   const horMap = {};
16659:   let sinHoraCnt = 0;
16660:   citas.forEach(c => {
16661:     const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
16662:     if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
16663:     else sinHoraCnt++;
16664:   });
```

### Coincidencia 147 — línea 17069

```html
17057: 
17058:   // Inicializar selector de fecha para ingresos por día/semana
17059:   const fechaInp = document.getElementById('ingresosFechaInput');
17060:   if (fechaInp && !fechaInp.value) {
17061:     fechaInp.value = today();
17062:     setModoIngresos('semana');
17063:   }
17064:   renderCitasResumen();
17065: 
17066:   // Inicializar filtro de convenios con el mes actual
17067:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17068:   if (convMesFiltro && !convMesFiltro.value) {
17069:     const nm = now.getMonth()+1;
17070:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17071:   }
17072:   renderConveniosReport();
17073:   _checkAutoAtendida();
17074:   _checkCobrosPendientes();
17075: }
17076: 
17077: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17078: function _checkAutoAtendida() {
17079:   const nowMs = Date.now();
17080:   const pendientes = (allData.citas || []).filter(c => {
17081:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
```

### Coincidencia 148 — línea 17079

```html
17067:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17068:   if (convMesFiltro && !convMesFiltro.value) {
17069:     const nm = now.getMonth()+1;
17070:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17071:   }
17072:   renderConveniosReport();
17073:   _checkAutoAtendida();
17074:   _checkCobrosPendientes();
17075: }
17076: 
17077: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17078: function _checkAutoAtendida() {
17079:   const nowMs = Date.now();
17080:   const pendientes = (allData.citas || []).filter(c => {
17081:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17082:     if (esRegistroServ(c.servicio)) return false;
17083:     const f = normDate(c.fecha);
17084:     if (!f || !c.hora) return false;
17085:     const [hh, mm] = c.hora.split(':').map(Number);
17086:     const citaEnd = new Date(f + 'T' + c.hora);
17087:     citaEnd.setMinutes(citaEnd.getMinutes() + 60);
17088:     return citaEnd.getTime() < nowMs;
17089:   });
17090:   window._autoAtendidaList = pendientes;
17091:   const banner = document.getElementById('bannerAutoAtendida');
```

### Coincidencia 149 — línea 17159

```html
17147:       selector.value = citaId || '';
17148:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17149:       selector.focus();
17150:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17151:     } else {
17152:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17153:     }
17154:   }, 100);
17155: }
17156: 
17157: // ── Alerta semana floja ──
17158: function _checkAlertaSemanFloja(citas) {
17159:   const now = new Date();
17160:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17161:   const hoyStr = today();
17162: 
17163:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17164:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
```

### Coincidencia 150 — línea 17160

```html
17148:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17149:       selector.focus();
17150:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17151:     } else {
17152:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17153:     }
17154:   }, 100);
17155: }
17156: 
17157: // ── Alerta semana floja ──
17158: function _checkAlertaSemanFloja(citas) {
17159:   const now = new Date();
17160:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17161:   const hoyStr = today();
17162: 
17163:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17164:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
17172: 
```

### Coincidencia 151 — línea 17176

```html
17164:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
17172: 
17173:   if (dow < 3 || dow > 5) { apagar(); return; }
17174: 
17175:   // Calcular ingresos semana actual (lunes a hoy)
17176:   const lunes = new Date(now);
17177:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17178:   lunes.setHours(0,0,0,0);
17179: 
17180:   let totalSemActual = 0, nSemActual = 0;
17181:   citas.forEach(c => {
17182:     const f = normDate(c.fecha);
17183:     if (!f) return;
17184:     const fd = new Date(f + 'T12:00:00');
17185:     if (fd >= lunes && f <= hoyStr) {
17186:       totalSemActual += parsePrecio(c.precio);
17187:       nSemActual++;
17188:     }
```

### Coincidencia 152 — línea 17177

```html
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
17172: 
17173:   if (dow < 3 || dow > 5) { apagar(); return; }
17174: 
17175:   // Calcular ingresos semana actual (lunes a hoy)
17176:   const lunes = new Date(now);
17177:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17178:   lunes.setHours(0,0,0,0);
17179: 
17180:   let totalSemActual = 0, nSemActual = 0;
17181:   citas.forEach(c => {
17182:     const f = normDate(c.fecha);
17183:     if (!f) return;
17184:     const fd = new Date(f + 'T12:00:00');
17185:     if (fd >= lunes && f <= hoyStr) {
17186:       totalSemActual += parsePrecio(c.precio);
17187:       nSemActual++;
17188:     }
17189:   });
```

### Coincidencia 153 — línea 18544

```html
18532: 
18533: function resRow(label, val, style='') {
18534:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18535:     <span style="color:var(--muted)">${label}</span>
18536:     <span style="${style}">${val}</span>
18537:   </div>`;
18538: }
18539: 
18540: // ══════════════════════════════════════════════════════════════
18541: // ── EXPORTAR CSV ──
18542: // ══════════════════════════════════════════════════════════════
18543: function exportarCSV(modo) {
18544:   const now = new Date();
18545:   const m   = now.getMonth()+1;
18546:   const y   = now.getFullYear();
18547:   let citas = citasReales().filter(esCobrada);
18548: 
18549:   if (modo === 'mes') {
18550:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18551:   }
18552: 
18553:   // Agregar eventos externos como filas adicionales
18554:   let evts = (allData.eventos || []);
18555:   if (modo === 'mes') {
18556:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
```

### Coincidencia 154 — línea 18545

```html
18533: function resRow(label, val, style='') {
18534:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18535:     <span style="color:var(--muted)">${label}</span>
18536:     <span style="${style}">${val}</span>
18537:   </div>`;
18538: }
18539: 
18540: // ══════════════════════════════════════════════════════════════
18541: // ── EXPORTAR CSV ──
18542: // ══════════════════════════════════════════════════════════════
18543: function exportarCSV(modo) {
18544:   const now = new Date();
18545:   const m   = now.getMonth()+1;
18546:   const y   = now.getFullYear();
18547:   let citas = citasReales().filter(esCobrada);
18548: 
18549:   if (modo === 'mes') {
18550:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18551:   }
18552: 
18553:   // Agregar eventos externos como filas adicionales
18554:   let evts = (allData.eventos || []);
18555:   if (modo === 'mes') {
18556:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
18557:   }
```

### Coincidencia 155 — línea 18546

```html
18534:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18535:     <span style="color:var(--muted)">${label}</span>
18536:     <span style="${style}">${val}</span>
18537:   </div>`;
18538: }
18539: 
18540: // ══════════════════════════════════════════════════════════════
18541: // ── EXPORTAR CSV ──
18542: // ══════════════════════════════════════════════════════════════
18543: function exportarCSV(modo) {
18544:   const now = new Date();
18545:   const m   = now.getMonth()+1;
18546:   const y   = now.getFullYear();
18547:   let citas = citasReales().filter(esCobrada);
18548: 
18549:   if (modo === 'mes') {
18550:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18551:   }
18552: 
18553:   // Agregar eventos externos como filas adicionales
18554:   let evts = (allData.eventos || []);
18555:   if (modo === 'mes') {
18556:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
18557:   }
18558:   const filasEventos = evts.map(e => ({
```

### Coincidencia 156 — línea 18588

```html
18576:     ])
18577:   ].sort((a,b) => a[0].localeCompare(b[0]));
18578: 
18579:   const csvContent = [header, ...rows]
18580:     .map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))
18581:     .join('\n');
18582: 
18583:   const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
18584:   const url  = URL.createObjectURL(blob);
18585:   const a    = document.createElement('a');
18586:   const nombre = modo === 'mes'
18587:     ? `ingresos_${y}-${pad(m)}.csv`
18588:     : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
18589:   a.href = url; a.download = nombre; a.click();
18590:   URL.revokeObjectURL(url);
18591:   toast('CSV descargado: ' + nombre);
18592: }
18593: 
18594: // ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
18595: const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
18596: let _pasTelefono = '';
18597: let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
18598: let _pasCurrent = null;
18599: 
18600: function _pasGetDB() {
```

### Coincidencia 157 — línea 19006

```html
18994:   set('cfg_serv_mant',            cfg.serv_mant.join(', '));
18995:   set('cfg_serv_descarga',        cfg.serv_descarga);
18996:   set('cfg_bono_contenido',       cfg.bono_contenido);
18997:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18998:   set('cfg_contenido_persona',    cfg.contenido_persona);
18999:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
19000:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
19001: }
19002: 
19003: function _initComisMesSel() {
19004:   const sel = document.getElementById('comisMes');
19005:   if (!sel || sel.options.length > 0) return;
19006:   const now = new Date();
19007:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19008:   for (let i = 0; i < 12; i++) {
19009:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19010:     const opt = document.createElement('option');
19011:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19012:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19013:     sel.appendChild(opt);
19014:   }
19015: }
19016: 
19017: function _comisMesVal() {
19018:   const sel = document.getElementById('comisMes');
```

### Coincidencia 158 — línea 19009

```html
18997:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18998:   set('cfg_contenido_persona',    cfg.contenido_persona);
18999:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
19000:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
19001: }
19002: 
19003: function _initComisMesSel() {
19004:   const sel = document.getElementById('comisMes');
19005:   if (!sel || sel.options.length > 0) return;
19006:   const now = new Date();
19007:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19008:   for (let i = 0; i < 12; i++) {
19009:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19010:     const opt = document.createElement('option');
19011:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19012:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19013:     sel.appendChild(opt);
19014:   }
19015: }
19016: 
19017: function _comisMesVal() {
19018:   const sel = document.getElementById('comisMes');
19019:   return sel ? sel.value : '';
19020: }
19021: 
```

### Coincidencia 159 — línea 19009

```html
18997:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18998:   set('cfg_contenido_persona',    cfg.contenido_persona);
18999:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
19000:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
19001: }
19002: 
19003: function _initComisMesSel() {
19004:   const sel = document.getElementById('comisMes');
19005:   if (!sel || sel.options.length > 0) return;
19006:   const now = new Date();
19007:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19008:   for (let i = 0; i < 12; i++) {
19009:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19010:     const opt = document.createElement('option');
19011:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19012:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19013:     sel.appendChild(opt);
19014:   }
19015: }
19016: 
19017: function _comisMesVal() {
19018:   const sel = document.getElementById('comisMes');
19019:   return sel ? sel.value : '';
19020: }
19021: 
```

### Coincidencia 160 — línea 19130

```html
19118:   const list = _comisManualReact(y, m);
19119:   if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
19120:   renderComisiones();
19121: }
19122: 
19123: function removeManualReactivacion(nombre) {
19124:   const [y, m] = _comisMesVal().split('-').map(Number);
19125:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19126:   renderComisiones();
19127: }
19128: 
19129: function marcarComisionPagada(persona) {
19130:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19131:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19132:   renderComisiones();
19133: }
19134: function desmarcarComisionPagada(persona) {
19135:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19136:   renderComisiones();
19137: }
19138: 
19139: function renderComisiones() {
19140:   _initComisMesSel();
19141:   const mes = _comisMesVal();
19142:   if (!mes) return;
```

### Coincidencia 161 — línea 19131

```html
19119:   if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
19120:   renderComisiones();
19121: }
19122: 
19123: function removeManualReactivacion(nombre) {
19124:   const [y, m] = _comisMesVal().split('-').map(Number);
19125:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19126:   renderComisiones();
19127: }
19128: 
19129: function marcarComisionPagada(persona) {
19130:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19131:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19132:   renderComisiones();
19133: }
19134: function desmarcarComisionPagada(persona) {
19135:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19136:   renderComisiones();
19137: }
19138: 
19139: function renderComisiones() {
19140:   _initComisMesSel();
19141:   const mes = _comisMesVal();
19142:   if (!mes) return;
19143:   const [year, month] = mes.split('-').map(Number);
```

### Coincidencia 162 — línea 19579

```html
19567: 
19568: function guardarMensaje() {
19569:   const titulo = document.getElementById('msgTitulo').value.trim();
19570:   const cat    = document.getElementById('msgCat').value;
19571:   const texto  = document.getElementById('msgTexto').value.trim();
19572:   if (!titulo || !texto) { toast('Completa el título y el mensaje', 'err'); return; }
19573:   const msgs  = _getMensajesPre();
19574:   const editId = document.getElementById('msgEditId').value;
19575:   if (editId) {
19576:     const idx = msgs.findIndex(m => m.id === editId);
19577:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19578:   } else {
19579:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19580:   }
19581:   _setMensajesPre(msgs);
19582:   closeModal('modalMensaje');
19583:   renderMensajes();
19584:   toast('Mensaje guardado ✓', 'ok');
19585: }
19586: 
19587: function eliminarMensaje(id) {
19588:   if (!confirm('¿Eliminar este mensaje?')) return;
19589:   _setMensajesPre(_getMensajesPre().filter(m => m.id !== id));
19590:   renderMensajes();
19591:   toast('Mensaje eliminado', 'ok');
```

### Coincidencia 163 — línea 19579

```html
19567: 
19568: function guardarMensaje() {
19569:   const titulo = document.getElementById('msgTitulo').value.trim();
19570:   const cat    = document.getElementById('msgCat').value;
19571:   const texto  = document.getElementById('msgTexto').value.trim();
19572:   if (!titulo || !texto) { toast('Completa el título y el mensaje', 'err'); return; }
19573:   const msgs  = _getMensajesPre();
19574:   const editId = document.getElementById('msgEditId').value;
19575:   if (editId) {
19576:     const idx = msgs.findIndex(m => m.id === editId);
19577:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19578:   } else {
19579:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19580:   }
19581:   _setMensajesPre(msgs);
19582:   closeModal('modalMensaje');
19583:   renderMensajes();
19584:   toast('Mensaje guardado ✓', 'ok');
19585: }
19586: 
19587: function eliminarMensaje(id) {
19588:   if (!confirm('¿Eliminar este mensaje?')) return;
19589:   _setMensajesPre(_getMensajesPre().filter(m => m.id !== id));
19590:   renderMensajes();
19591:   toast('Mensaje eliminado', 'ok');
```

### Coincidencia 164 — línea 19708

```html
19696: function _loadRec() {
19697:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19698: }
19699: function _saveRec(arr) {
19700:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19701: }
19702: 
19703: function _fmtCLP(n) {
19704:   return '$' + Math.round(n).toLocaleString('es-CO');
19705: }
19706: 
19707: function _recMesActual() {
19708:   const now = new Date();
19709:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19710: }
19711: 
19712: function _initRecMesSel() {
19713:   const sel = document.getElementById('recMesFiltro');
19714:   if (!sel) return;
19715:   const all = _loadRec();
19716:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19717:   const actual = _recMesActual();
19718:   if (!meses.includes(actual)) meses.unshift(actual);
19719:   const cur = sel.value || actual;
19720:   sel.innerHTML = meses.map(m => {
```

### Coincidencia 165 — línea 19709

```html
19697:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19698: }
19699: function _saveRec(arr) {
19700:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19701: }
19702: 
19703: function _fmtCLP(n) {
19704:   return '$' + Math.round(n).toLocaleString('es-CO');
19705: }
19706: 
19707: function _recMesActual() {
19708:   const now = new Date();
19709:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19710: }
19711: 
19712: function _initRecMesSel() {
19713:   const sel = document.getElementById('recMesFiltro');
19714:   if (!sel) return;
19715:   const all = _loadRec();
19716:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19717:   const actual = _recMesActual();
19718:   if (!meses.includes(actual)) meses.unshift(actual);
19719:   const cur = sel.value || actual;
19720:   sel.innerHTML = meses.map(m => {
19721:     const [y,mo] = m.split('-');
```

### Coincidencia 166 — línea 19709

```html
19697:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19698: }
19699: function _saveRec(arr) {
19700:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19701: }
19702: 
19703: function _fmtCLP(n) {
19704:   return '$' + Math.round(n).toLocaleString('es-CO');
19705: }
19706: 
19707: function _recMesActual() {
19708:   const now = new Date();
19709:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19710: }
19711: 
19712: function _initRecMesSel() {
19713:   const sel = document.getElementById('recMesFiltro');
19714:   if (!sel) return;
19715:   const all = _loadRec();
19716:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19717:   const actual = _recMesActual();
19718:   if (!meses.includes(actual)) meses.unshift(actual);
19719:   const cur = sel.value || actual;
19720:   sel.innerHTML = meses.map(m => {
19721:     const [y,mo] = m.split('-');
```

### Coincidencia 167 — línea 19818

```html
19806:   const fecha    = document.getElementById('recInpFecha')?.value;
19807:   const servicio = document.getElementById('recInpServicio')?.value;
19808:   const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
19809:   const nota     = document.getElementById('recInpNota')?.value.trim() || '';
19810: 
19811:   if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
19812:   if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
19813:   if (!servicio) { alert('Selecciona el servicio'); return; }
19814:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19815: 
19816:   const comision = Math.round(venta * REC_PCT);
19817:   const rec = {
19818:     id: Date.now().toString(),
19819:     fecha,
19820:     paciente,
19821:     servicio,
19822:     venta,
19823:     comision,
19824:     nota,
19825:     pagado: false,
19826:     pagadoFecha: null
19827:   };
19828: 
19829:   const all = _loadRec();
19830:   all.push(rec);
```

### Coincidencia 168 — línea 20098

```html
20086:   kvSet(_refKey(mesStr, anio, nombre), estado);
20087: }
20088: 
20089: function marcarRefEstado(mesStr, anio, nombre, estado) {
20090:   _refSetEstado(mesStr, anio, nombre, estado);
20091:   cargarCampañaReferidos();
20092: }
20093: 
20094: function cargarCampañaReferidos() {
20095:   const panel = document.getElementById('refCampañaPanel');
20096:   if (!panel) return;
20097: 
20098:   const now   = new Date();
20099:   const mes   = now.getMonth();
20100:   const anio  = now.getFullYear();
20101:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20102:   const mesStr = MESES[mes];
20103: 
20104:   const citas = (allData.citas || []).filter(c => {
20105:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20106:     const [y, m] = c.fecha.split('-');
20107:     return +y === anio && +m === (mes + 1);
20108:   });
20109: 
20110:   const vistos = {};
```

### Coincidencia 169 — línea 20099

```html
20087: }
20088: 
20089: function marcarRefEstado(mesStr, anio, nombre, estado) {
20090:   _refSetEstado(mesStr, anio, nombre, estado);
20091:   cargarCampañaReferidos();
20092: }
20093: 
20094: function cargarCampañaReferidos() {
20095:   const panel = document.getElementById('refCampañaPanel');
20096:   if (!panel) return;
20097: 
20098:   const now   = new Date();
20099:   const mes   = now.getMonth();
20100:   const anio  = now.getFullYear();
20101:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20102:   const mesStr = MESES[mes];
20103: 
20104:   const citas = (allData.citas || []).filter(c => {
20105:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20106:     const [y, m] = c.fecha.split('-');
20107:     return +y === anio && +m === (mes + 1);
20108:   });
20109: 
20110:   const vistos = {};
20111:   const pacientes = [];
```

### Coincidencia 170 — línea 20100

```html
20088: 
20089: function marcarRefEstado(mesStr, anio, nombre, estado) {
20090:   _refSetEstado(mesStr, anio, nombre, estado);
20091:   cargarCampañaReferidos();
20092: }
20093: 
20094: function cargarCampañaReferidos() {
20095:   const panel = document.getElementById('refCampañaPanel');
20096:   if (!panel) return;
20097: 
20098:   const now   = new Date();
20099:   const mes   = now.getMonth();
20100:   const anio  = now.getFullYear();
20101:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20102:   const mesStr = MESES[mes];
20103: 
20104:   const citas = (allData.citas || []).filter(c => {
20105:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20106:     const [y, m] = c.fecha.split('-');
20107:     return +y === anio && +m === (mes + 1);
20108:   });
20109: 
20110:   const vistos = {};
20111:   const pacientes = [];
20112:   citas.forEach(c => {
```

## Llamadas a showView('citas')

### Coincidencia 1 — línea 4575

```html
4563:               <span class="em-card-title">Mix Full &gt;40%</span>
4564:               <span class="em-sev u">🟠 Urgente</span>
4565:               <span class="em-card-time">⏱ 20 min</span>
4566:               <span class="em-carr">▼</span>
4567:             </div>
4568:             <div class="em-card-body" id="emBody_mixfull">
4569:               <div class="em-symptom">💡 <strong>Pérdida silenciosa de margen.</strong> Full rinde ~$73k/h vs ~$90k/h de Express. Cada 10% de exceso en Full equivale a dejar entre $70k y $100k/semana sobre la mesa. El problema suele estar en cómo la auxiliar presenta las opciones al paciente — no en el paciente mismo.</div>
4570:               <div class="em-prog-meta" id="emPM_mixfull">0 de 5 pasos completados</div>
4571:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_mixfull" style="width:0%"></div></div>
4572:               <div class="em-steps">
4573:                 <label class="em-step" id="emS_mixfull_0" onclick="handleEmStep(event,'mixfull',0)"><input type="checkbox" id="emCk_mixfull_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Ver el breakdown actual:</strong> ¿qué porcentaje exacto son Full esta semana? ¿Es un problema puntual o viene subiendo varios meses?</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 2 →</button></label>
4574:                 <label class="em-step" id="emS_mixfull_1" onclick="handleEmStep(event,'mixfull',1)"><input type="checkbox" id="emCk_mixfull_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reunión con auxiliar — cambiar el guión de agendamiento:</strong> la regla es ofrecer Express por defecto. Guión exacto: <em>"La Descarga Express cubre cuello, espalda o piernas en 50 min — ¿cuál zona necesitas trabajar?"</em>. Full solo si el paciente lo pide explícitamente o hay justificación clínica de Jessica.</span></label>
4575:                 <label class="em-step" id="emS_mixfull_2" onclick="handleEmStep(event,'mixfull',2)"><input type="checkbox" id="emCk_mixfull_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Revisar citas Full activas:</strong> ¿hay pacientes en plan Full que podrían migrar a Express + Readaptación sin afectar su evolución clínica? Coordinar con Jessica antes de cambiar.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ver citas →</button></label>
4576:                 <label class="em-step" id="emS_mixfull_3" onclick="handleEmStep(event,'mixfull',3)"><input type="checkbox" id="emCk_mixfull_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Empujar Readaptación en contenido:</strong> publicar esta semana un reel o historia explicando qué es la Readaptación Funcional y para quién es — es el servicio más ignorado y el de mejor margen por hora para sesiones largas.</span></label>
4577:                 <label class="em-step" id="emS_mixfull_4" onclick="handleEmStep(event,'mixfull',4)"><input type="checkbox" id="emCk_mixfull_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Seguimiento la próxima semana:</strong> revisar si el mix bajó. Si en 2 semanas sigue >35%, el problema es estructural — revisar si los paquetes activos tienen demasiado peso en Full.</span></label>
4578:               </div>
4579:               <div class="em-card-footer">
4580:                 <button class="em-done-btn" id="emDB_mixfull" onclick="markEmDone('mixfull',5)">✓ Plan ejecutado</button>
4581:                 <button class="em-reset-btn" onclick="resetEmSteps('mixfull',5)">↺ Reiniciar</button>
4582:               </div>
4583:             </div>
4584:           </div>
4585: 
4586:           <!-- KPI: Cancelaciones -->
4587:           <div class="em-card" id="emCard_cancel">
```

### Coincidencia 2 — línea 4605

```html
4593:               <span class="em-carr">▼</span>
4594:             </div>
4595:             <div class="em-card-body" id="emBody_cancel">
4596:               <div class="em-symptom">💡 <strong>Patrón de cancelación.</strong> Cada cancelación es ingreso y tiempo perdido. Más del 20% indica un problema sistemático, no casos aislados. Los 3 culpables más comunes: (1) no hay recordatorio 24h antes, (2) un día o servicio específico concentra todo, (3) pacientes nuevos que nunca tuvieron intención real de asistir.</div>
4597:               <div class="em-prog-meta" id="emPM_cancel">0 de 6 pasos completados</div>
4598:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_cancel" style="width:0%"></div></div>
4599:               <div class="em-steps">
4600:                 <label class="em-step" id="emS_cancel_0" onclick="handleEmStep(event,'cancel',0)"><input type="checkbox" id="emCk_cancel_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Abrir KPI 4B y hacer el diagnóstico completo:</strong> ¿qué servicio cancela más? ¿Qué día de la semana? ¿Son pacientes nuevos o recurrentes? La respuesta a estas 3 preguntas determina todo lo siguiente.</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 4B →</button></label>
4601:                 <label class="em-step" id="emS_cancel_1" onclick="handleEmStep(event,'cancel',1)"><input type="checkbox" id="emCk_cancel_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reforzar el recordatorio 24h antes:</strong> si no se está enviando confirmación por WhatsApp el día anterior, implementarlo desde hoy. Guión: <em>"Hola [nombre]! Te confirmo tu cita mañana 📋 [servicio] · [hora] · [modalidad]. Respóndeme: ✅ 1 — Sí confirmo · ❌ 2 — Necesito cancelar."</em></span></label>
4602:                 <label class="em-step" id="emS_cancel_2" onclick="handleEmStep(event,'cancel',2)"><input type="checkbox" id="emCk_cancel_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Si hay un día con muchas cancelaciones:</strong> agregar un segundo recordatorio 2 horas antes de la cita ese día específico. Los lunes y viernes suelen concentrar más cancelaciones por reuniones de trabajo o planes del fin de semana.</span></label>
4603:                 <label class="em-step" id="emS_cancel_3" onclick="handleEmStep(event,'cancel',3)"><input type="checkbox" id="emCk_cancel_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Si hay un servicio con muchas cancelaciones:</strong> revisar si el precio, la duración o la expectativa del paciente no están alineados. Por ejemplo, si Full cancela mucho, puede ser que 90 min sea demasiado tiempo para agendar con anticipación.</span></label>
4604:                 <label class="em-step" id="emS_cancel_4" onclick="handleEmStep(event,'cancel',4)"><input type="checkbox" id="emCk_cancel_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer reagendamiento inmediato:</strong> cuando un paciente cancela, el mensaje de respuesta debe siempre terminar con una fecha alternativa. Nunca dejar el chat abierto sin proponer otra opción: <em>"¡Sin problema! ¿Te queda bien el [día X] a las [hora Y]?"</em></span></label>
4605:                 <label class="em-step" id="emS_cancel_5" onclick="handleEmStep(event,'cancel',5)"><input type="checkbox" id="emCk_cancel_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Registrar el motivo de cada cancelación:</strong> en el campo "Nota Admin" de la cita — sin este dato el patrón es invisible. En 2 semanas los datos mostrarán si es un problema de horario, precio, salud o simplemente leads mal calificados.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ir a citas →</button></label>
4606:               </div>
4607:               <div class="em-card-footer">
4608:                 <button class="em-done-btn" id="emDB_cancel" onclick="markEmDone('cancel',6)">✓ Plan ejecutado</button>
4609:                 <button class="em-reset-btn" onclick="resetEmSteps('cancel',6)">↺ Reiniciar</button>
4610:               </div>
4611:             </div>
4612:           </div>
4613: 
4614:         </div>
4615:       </div>
4616: 
4617:       <!-- ══ DIMENSIÓN 2: Comercial ══ -->
```

## Contenedores de vista relacionados con citas y agenda

No se encontraron coincidencias.

## Biblioteca QR y creación de códigos

### Coincidencia 1 — línea 1560

```html
1548:   .auto-grid{grid-template-columns:1fr}
1549:   .auto-panels{grid-template-columns:1fr!important}
1550: }
1551: @media(max-width:420px){
1552:   .stats-grid,.stats-grid[style]{grid-template-columns:1fr!important}
1553:   .mob-nav-btn{padding:5px 4px;min-width:44px;font-size:.58rem}
1554: }
1555: @media(prefers-reduced-motion:reduce){
1556:   *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;
1557:     animation-iteration-count:1!important;transition-duration:.01ms!important}
1558: }
1559: </style>
1560: <script src="vendor/qrcode.min.js"></script>
1561: </head>
1562: <body>
1563: 
1564: <!-- ── TOAST ── -->
1565: <div id="toast"></div>
1566: 
1567: <!-- ── MODAL COPIAR MENSAJE WA (desktop) ── -->
1568: <div id="waCopyModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this)cerrarWaCopyModal()">
1569:   <div style="background:var(--s1,#fff);border-radius:16px;max-width:480px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.22);overflow:hidden">
1570:     <div style="background:#25D366;padding:14px 18px;display:flex;align-items:center;gap:10px">
1571:       <span style="font-size:1.3rem">💬</span>
1572:       <span style="color:#fff;font-weight:700;font-size:1rem">Enviar por WhatsApp</span>
```

### Coincidencia 2 — línea 18717

```html
18705: function renderPasaporteQR(link) {
18706:   const canvas = document.getElementById('pasQR');
18707:   if (!canvas) return;
18708:   let box = document.getElementById('pasQRBox');
18709:   if (!box) {
18710:     box = document.createElement('div');
18711:     box.id = 'pasQRBox';
18712:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18713:     canvas.insertAdjacentElement('afterend', box);
18714:   }
18715:   box.innerHTML = '';
18716:   canvas.style.display = 'none';
18717:   if (typeof QRCode !== 'undefined') {
18718:     if (QRCode.toCanvas) {
18719:       canvas.style.display = 'block';
18720:       box.style.display = 'none';
18721:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18722:     } else {
18723:       box.style.display = 'grid';
18724:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18725:     }
18726:   } else {
18727:     box.textContent = 'QR no disponible';
18728:     box.style.fontSize = '11px';
18729:     box.style.color = 'var(--muted)';
```

### Coincidencia 3 — línea 18718

```html
18706:   const canvas = document.getElementById('pasQR');
18707:   if (!canvas) return;
18708:   let box = document.getElementById('pasQRBox');
18709:   if (!box) {
18710:     box = document.createElement('div');
18711:     box.id = 'pasQRBox';
18712:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18713:     canvas.insertAdjacentElement('afterend', box);
18714:   }
18715:   box.innerHTML = '';
18716:   canvas.style.display = 'none';
18717:   if (typeof QRCode !== 'undefined') {
18718:     if (QRCode.toCanvas) {
18719:       canvas.style.display = 'block';
18720:       box.style.display = 'none';
18721:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18722:     } else {
18723:       box.style.display = 'grid';
18724:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18725:     }
18726:   } else {
18727:     box.textContent = 'QR no disponible';
18728:     box.style.fontSize = '11px';
18729:     box.style.color = 'var(--muted)';
18730:   }
```

### Coincidencia 4 — línea 18721

```html
18709:   if (!box) {
18710:     box = document.createElement('div');
18711:     box.id = 'pasQRBox';
18712:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18713:     canvas.insertAdjacentElement('afterend', box);
18714:   }
18715:   box.innerHTML = '';
18716:   canvas.style.display = 'none';
18717:   if (typeof QRCode !== 'undefined') {
18718:     if (QRCode.toCanvas) {
18719:       canvas.style.display = 'block';
18720:       box.style.display = 'none';
18721:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18722:     } else {
18723:       box.style.display = 'grid';
18724:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18725:     }
18726:   } else {
18727:     box.textContent = 'QR no disponible';
18728:     box.style.fontSize = '11px';
18729:     box.style.color = 'var(--muted)';
18730:   }
18731: }
18732: 
18733: function abrirPasaporte() {
```

### Coincidencia 5 — línea 18724

```html
18712:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18713:     canvas.insertAdjacentElement('afterend', box);
18714:   }
18715:   box.innerHTML = '';
18716:   canvas.style.display = 'none';
18717:   if (typeof QRCode !== 'undefined') {
18718:     if (QRCode.toCanvas) {
18719:       canvas.style.display = 'block';
18720:       box.style.display = 'none';
18721:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18722:     } else {
18723:       box.style.display = 'grid';
18724:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18725:     }
18726:   } else {
18727:     box.textContent = 'QR no disponible';
18728:     box.style.fontSize = '11px';
18729:     box.style.color = 'var(--muted)';
18730:   }
18731: }
18732: 
18733: function abrirPasaporte() {
18734:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18735:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18736:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

### Coincidencia 6 — línea 18724

```html
18712:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18713:     canvas.insertAdjacentElement('afterend', box);
18714:   }
18715:   box.innerHTML = '';
18716:   canvas.style.display = 'none';
18717:   if (typeof QRCode !== 'undefined') {
18718:     if (QRCode.toCanvas) {
18719:       canvas.style.display = 'block';
18720:       box.style.display = 'none';
18721:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18722:     } else {
18723:       box.style.display = 'grid';
18724:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18725:     }
18726:   } else {
18727:     box.textContent = 'QR no disponible';
18728:     box.style.fontSize = '11px';
18729:     box.style.color = 'var(--muted)';
18730:   }
18731: }
18732: 
18733: function abrirPasaporte() {
18734:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18735:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18736:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

## Función openPago

### Coincidencia 1 — línea 17141

```html
17129:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17130:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17131:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17132:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17133:       <div style="display:flex;gap:6px">
17134:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17135:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17136:       </div>
17137:     </div>`;
17138:   }).join('');
17139: }
17140: 
17141: function openPago(citaId) {
17142:   showView('pagos');
17143:   setTimeout(() => {
17144:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17145:     const selector = document.getElementById('payCitaId');
17146:     if (selector) {
17147:       selector.value = citaId || '';
17148:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17149:       selector.focus();
17150:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17151:     } else {
17152:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17153:     }
```

## Función fillPaymentSelectors

### Coincidencia 1 — línea 6839

```html
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
```
