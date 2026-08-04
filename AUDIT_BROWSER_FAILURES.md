# Contexto de fallos del navegador automático

## Encabezado y política de seguridad

```html
1: <!DOCTYPE html>
2: <html lang="es">
3: <head>
4: <meta charset="UTF-8">
5: <meta name="viewport" content="width=device-width,initial-scale=1">
6: <meta name="robots" content="noindex,nofollow,noarchive">
7: <meta http-equiv="X-Frame-Options" content="DENY">
8: <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://script.google.com https://script.googleusercontent.com https://places.googleapis.com;">
9: <script>
10: (function(){
11:   var publicHosts = ['cuidandotefisioterapia.com', 'www.cuidandotefisioterapia.com'];
12:   if (publicHosts.indexOf(location.hostname) !== -1) {
13:     location.replace('/');
14:   }
15: })();
16: </script>
17: <script>if(localStorage.getItem('adminDarkMode')==='dark')document.documentElement.setAttribute('data-theme','dark');</script>
18: <title>Admin — Cuidándote Fisioterapia</title>
19: <link rel="icon" href="LogoCuidandote/favicon.png">
20: <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
21: <style>
22: *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
23: :root{
24:   --bg:#F7F8FA;--s1:#FFFFFF;--s2:#F0F2F5;--s3:#E8EAED;
25:   --primary:#1BBFB0;--primary-h:#17A89A;
26:   --text:#1A1A2E;--muted:#6B7280;
27:   --border:rgba(27,191,176,.18);--glow:rgba(27,191,176,.12);
28:   --font-h:'Cormorant Garamond',serif;--font-b:'DM Sans',sans-serif;--font-m:'DM Mono',monospace;
29:   --r:10px;--tr:.2s ease;
30:   --ok:#16a34a;--warn:#d97706;--err:#dc2626;--info:#2563eb;
31: }
32: [data-theme="dark"]{
33:   --bg:#0F1117;--s1:#1A1D24;--s2:#22262E;--s3:#2A2F3A;
34:   --text:#E8EAF0;--muted:#8B929E;
35:   --border:rgba(27,191,176,.22);--glow:rgba(27,191,176,.15);
36: }
37: html{font-size:16px;scroll-behavior:smooth}
38: body{background:var(--bg);color:var(--text);font-family:var(--font-b);min-height:100vh;overflow-x:hidden}
39: 
40: /* ── SCROLLBAR ── */
41: ::-webkit-scrollbar{width:5px;height:5px}
42: ::-webkit-scrollbar-track{background:var(--s1)}
43: ::-webkit-scrollbar-thumb{background:var(--primary);border-radius:99px}
44: 
45: /* ══════════════════════════════════════════
46:    LOGIN SCREEN
47: ══════════════════════════════════════════ */
48: #loginScreen{
49:   position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
50:   background:var(--bg);z-index:1000;
51: }
52: .login-card{
53:   background:var(--s1);border:1px solid var(--border);border-radius:16px;
54:   padding:48px 40px;width:100%;max-width:400px;text-align:center;
55:   box-shadow:0 0 60px var(--glow);
56: }
57: .login-card img{margin-bottom:28px}
58: .login-card h1{font-family:var(--font-h);font-size:1.6rem;font-weight:600;margin-bottom:8px}
59: .login-card p{color:var(--muted);font-size:.9rem;margin-bottom:28px}
60: .login-input{
61:   width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;
62:   color:var(--text);font-family:var(--font-b);font-size:.95rem;
63:   padding:12px 16px;margin-bottom:16px;outline:none;transition:var(--tr);
64: }
65: .login-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--glow)}
66: .login-btn{
67:   width:100%;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);
68:   font-size:.95rem;font-weight:600;padding:13px;border:none;border-radius:8px;
69:   cursor:pointer;transition:var(--tr);letter-spacing:.03em;
70: }
71: .login-btn:hover{background:var(--primary-h)}
72: .login-err{color:var(--err);font-size:.85rem;margin-top:12px;display:none}
73: .login-alt{
74:   margin-top:18px;border-top:1px solid var(--border);padding-top:16px;
75:   display:flex;flex-direction:column;gap:8px;align-items:center
76: }
77: .login-alt button{
78:   background:transparent;border:1px solid var(--border);border-radius:999px;
79:   color:var(--primary-h);font-family:var(--font-b);font-weight:700;
80:   padding:9px 16px;cursor:pointer;transition:var(--tr);min-height:44px
81: }
82: .login-alt button:hover,.login-alt button:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--glow);outline:none}
83: 
84: /* ══════════════════════════════════════════
85:    PORTAL PROFESIONALES / EQUIPO
86: ══════════════════════════════════════════ */
87: #proLoginScreen,#proApp{
88:   position:fixed;inset:0;background:var(--bg);z-index:1001;display:none;
89:   overflow:auto;padding:28px 16px
90: }
```

## Función renderMetricas

### Coincidencia 1 — línea 16644

```html
16632:         <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h)">129 sesiones/mes</div>
16633:         <div style="font-size:.72rem;color:var(--muted)">~30/sem · Ticket prom. $83.000</div>
16634:       </div>
16635:     </div>
16636:   </div>`;
16637: 
16638:   el.innerHTML = html;
16639: }
16640: 
16641: // ══════════════════════════════════════════════════════════════
16642: // ── MÉTRICAS INTELIGENTES ──
16643: // ══════════════════════════════════════════════════════════════
16644: function renderMetricas() {
16645:   const citas = citasReales();
16646:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16647:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16648: 
16649:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
16650:   const horMap = {};
16651:   let sinHoraCnt = 0;
16652:   citas.forEach(c => {
16653:     const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
16654:     if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
16655:     else sinHoraCnt++;
16656:   });
```

## Usos de now en renderizado financiero

### Coincidencia 1 — línea 7251

```html
7239:   openProfessionalLoginMode();
7240: }
7241: 
7242: let _submittingBooking = false;
7243: let _submittingPatient = false;
7244: let _loginTime = null;
7245: 
7246: // ── LOGIN ──
7247: let _loginAttempts = 0;
7248: let _loginLockedUntil = 0;
7249: 
7250: async function doLogin() {
7251:   const ahora = Date.now();
7252:   if (_loginLockedUntil > ahora) {
7253:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7254:     const errEl = document.getElementById('loginErr');
7255:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7256:     errEl.style.display = 'block';
7257:     return;
7258:   }
7259:   const pw  = document.getElementById('pwInput').value.trim();
7260:   const user = (document.getElementById('userInput')?.value || '').trim();
7261:   const btn = document.getElementById('loginBtn');
7262:   if (!pw) return;
7263:   btn.textContent = 'Verificando...'; btn.disabled = true;
```

### Coincidencia 2 — línea 7273

```html
7261:   const btn = document.getElementById('loginBtn');
7262:   if (!pw) return;
7263:   btn.textContent = 'Verificando...'; btn.disabled = true;
7264:   try {
7265:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7266:       method: 'POST',
7267:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7268:     }, 45000);
7269:     if (d.ok) {
7270:       _loginAttempts = 0;
7271:       TOKEN = d.sessionToken;
7272:       sessionStorage.setItem('adminToken', d.sessionToken);
7273:       _loginTime = Date.now();
7274:       document.getElementById('loginScreen').style.display = 'none';
7275:       document.getElementById('adminApp').style.display   = 'block';
7276:       allData = d;
7277:       await loadAdminKV();
7278:       await loadTeamData();
7279:       reloadMetas();
7280:       _initSidebarState();
7281:       initDashboard();
7282:       await _runUrlRepairIfRequested();
7283:     } else {
7284:       _loginAttempts++;
7285:       const errEl = document.getElementById('loginErr');
```

### Coincidencia 3 — línea 7287

```html
7275:       document.getElementById('adminApp').style.display   = 'block';
7276:       allData = d;
7277:       await loadAdminKV();
7278:       await loadTeamData();
7279:       reloadMetas();
7280:       _initSidebarState();
7281:       initDashboard();
7282:       await _runUrlRepairIfRequested();
7283:     } else {
7284:       _loginAttempts++;
7285:       const errEl = document.getElementById('loginErr');
7286:       if (_loginAttempts >= 5) {
7287:         _loginLockedUntil = Date.now() + 120000;
7288:         _loginAttempts = 0;
7289:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7290:       } else {
7291:         const restantes = 5 - _loginAttempts;
7292:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
7293:       }
7294:       errEl.style.display = 'block';
7295:     }
7296:   } catch(e) {
7297:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7298:     document.getElementById('loginErr').style.display = 'block';
7299:   }
```

### Coincidencia 4 — línea 7309

```html
7297:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7298:     document.getElementById('loginErr').style.display = 'block';
7299:   }
7300:   btn.textContent = 'Ingresar'; btn.disabled = false;
7301: }
7302: 
7303: function logout() {
7304:   sessionStorage.removeItem('adminToken');
7305:   location.reload();
7306: }
7307: 
7308: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7309: let _lastActivity = Date.now();
7310: const _INACTIVITY_MS = 30 * 60 * 1000;
7311: 
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
7315: );
7316: setInterval(() => {
7317:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7318:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7319:     setTimeout(logout, 1500);
7320:   }
7321: }, 60_000);
```

### Coincidencia 5 — línea 7312

```html
7300:   btn.textContent = 'Ingresar'; btn.disabled = false;
7301: }
7302: 
7303: function logout() {
7304:   sessionStorage.removeItem('adminToken');
7305:   location.reload();
7306: }
7307: 
7308: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7309: let _lastActivity = Date.now();
7310: const _INACTIVITY_MS = 30 * 60 * 1000;
7311: 
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
7315: );
7316: setInterval(() => {
7317:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7318:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7319:     setTimeout(logout, 1500);
7320:   }
7321: }, 60_000);
7322: 
7323: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7324: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
```

### Coincidencia 6 — línea 7317

```html
7305:   location.reload();
7306: }
7307: 
7308: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7309: let _lastActivity = Date.now();
7310: const _INACTIVITY_MS = 30 * 60 * 1000;
7311: 
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
7315: );
7316: setInterval(() => {
7317:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7318:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7319:     setTimeout(logout, 1500);
7320:   }
7321: }, 60_000);
7322: 
7323: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7324: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7325: document.addEventListener('visibilitychange', async () => {
7326:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7327:   try {
7328:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7329:     if (!r.ok) {
```

### Coincidencia 7 — línea 7351

```html
7339:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7340:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7341:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7342:     else openProfessionalLoginMode();
7343:     return;
7344:   }
7345:   if (TOKEN) {
7346:     const btn = document.getElementById('loginBtn');
7347:     try {
7348:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7349:       const d = await r.json();
7350:       if (d.ok) {
7351:         _loginTime = Date.now();
7352:         document.getElementById('loginScreen').style.display = 'none';
7353:         document.getElementById('adminApp').style.display   = 'block';
7354:         allData = d;
7355:         await loadAdminKV();
7356:         await loadTeamData();
7357:         reloadMetas();
7358:         _initSidebarState();
7359:         initDashboard();
7360:         await _runUrlRepairIfRequested();
7361:           return;
7362:       }
7363:     } catch(e) {}
```

### Coincidencia 8 — línea 7398

```html
7386:       renderIngresosDetalle();
7387:     } else {
7388:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7389:     }
7390:   } catch(e) {
7391:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
```

### Coincidencia 9 — línea 7399

```html
7387:     } else {
7388:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7389:     }
7390:   } catch(e) {
7391:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
```

### Coincidencia 10 — línea 7400

```html
7388:       toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
7389:     }
7390:   } catch(e) {
7391:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
```

### Coincidencia 11 — línea 7401

```html
7389:     }
7390:   } catch(e) {
7391:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
```

### Coincidencia 12 — línea 7401

```html
7389:     }
7390:   } catch(e) {
7391:     document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
```

### Coincidencia 13 — línea 7404

```html
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7414: 
7415:   const citas = citasReales();
7416: 
```

### Coincidencia 14 — línea 7404

```html
7392:     toast('Error ejecutando reparación de reprogramación', 'err');
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7414: 
7415:   const citas = citasReales();
7416: 
```

### Coincidencia 15 — línea 7412

```html
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7414: 
7415:   const citas = citasReales();
7416: 
7417:   const semana = citas.filter(c => {
7418:     if (!c.hora) return false;
7419:     const [cy,cm,cd] = normDate(c.fecha).split('-');
7420:     const d = new Date(+cy, +cm-1, +cd);
7421:     return d >= startW && d <= endW;
7422:   }).length;
7423: 
7424:   const semanaPrev = citas.filter(c => {
```

### Coincidencia 16 — línea 7458

```html
7446:   }
7447: 
7448:   const sbW = document.getElementById('sbStSemana');
7449:   const sbM = document.getElementById('sbStMes');
7450: 
7451:   if (sbW) sbW.textContent = semana;
7452:   if (sbM) sbM.textContent = mes;
7453:   setDelta(document.getElementById('sbDeltaSemana'), semana, semanaPrev);
7454:   setDelta(document.getElementById('sbDeltaMes'), mes, mesPrev);
7455: 
7456:   // Tiempo de sesión activa
7457:   if (_loginTime) {
7458:     const mins = Math.round((Date.now() - _loginTime) / 60000);
7459:     const h = Math.floor(mins / 60), rm = mins % 60;
7460:     const label = h > 0 ? `${h}h ${rm}min` : `${mins}min`;
7461:     const el = document.getElementById('sbSessionInfo');
7462:     if (el) el.innerHTML = `<span class="sb-session-dot"></span> ${label}`;
7463:   }
7464: }
7465: 
7466: function openCambiarPassword() {
7467:   ['pwActual','pwNueva','pwConfirmar'].forEach(id => { document.getElementById(id).value = ''; });
7468:   const errEl = document.getElementById('pwChangeErr');
7469:   errEl.style.display = 'none';
7470:   document.getElementById('modalCambiarPassword').classList.add('open');
```

### Coincidencia 17 — línea 7880

```html
7868:   if (v === 'recuperacion')   renderRecuperaciones();
7869:   if (v === 'acciones')       renderCentroAcciones();
7870:   if (v === 'espera')         renderWaitList();
7871:   if (v === 'automatizaciones') loadAutomationCenter();
7872:   if (v === 'dashboard')      actualizarContadorLeads();
7873: }
7874: 
7875: // ── CENTRO DE ACCIONES ──
7876: function _daysSince(dateStr) {
7877:   const normalized = normDate(dateStr);
7878:   if (!normalized) return 0;
7879:   const d = new Date(normalized + 'T12:00:00');
7880:   return Math.floor((Date.now() - d.getTime()) / 86400000);
7881: }
7882: 
7883: function _actionIcon(type) {
7884:   const icons = {
7885:     cita:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
7886:     pago:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
7887:     paciente:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>',
7888:     datos:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/></svg>'
7889:   };
7890:   return icons[type] || icons.paciente;
7891: }
7892: 
```

### Coincidencia 18 — línea 7983

```html
7971:     const d = await fetch(`${APPS_SCRIPT_URL}?action=getWaitlist&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7972:     if (d.ok) { _saveWaitList(d.items || []); _waitLoaded = true; return true; }
7973:   } catch(e) {}
7974:   return false;
7975: }
7976: 
7977: async function addWaitPatient() {
7978:   const nombre = document.getElementById('waitNombre').value.trim();
7979:   const telefono = document.getElementById('waitTelefono').value.trim();
7980:   const servicio = document.getElementById('waitServicio').value.trim();
7981:   const preferencia = document.getElementById('waitPreferencia').value.trim();
7982:   if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
7983:   const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
7984:   try {
7985:     const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
7986:     if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
7987:     item.id = d.id || item.id;
7988:   } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
7989:   const list = _getWaitList(); list.unshift(item); _saveWaitList(list); _waitLoaded = true;
7990:   ['waitNombre','waitTelefono','waitServicio','waitPreferencia'].forEach(id => document.getElementById(id).value='');
7991:   renderWaitList(); toast('Paciente agregado a la lista de espera');
7992: }
7993: 
7994: async function removeWaitPatient(id) {
7995:   try { await fetch(`${APPS_SCRIPT_URL}?action=removeWaitlist&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r=>r.json()); } catch(e) {}
```

### Coincidencia 19 — línea 8119

```html
8107: // ══════════════════════════════════════════════════════
8108: // ── PREMIUM UI — CONTADORES, MOBILE NAV, SKELETONS ──
8109: // ══════════════════════════════════════════════════════
8110: 
8111: // Contador animado para números del dashboard
8112: function _animateCounter(el, target, duration = 700) {
8113:   if (!el) return;
8114:   const isMonetary = typeof target === 'string' && target.includes('$');
8115:   const numTarget  = isMonetary
8116:     ? parseInt(target.replace(/[^0-9]/g,'')) || 0
8117:     : parseInt(String(target).replace(/[^0-9]/g,'')) || 0;
8118:   if (numTarget === 0) { el.textContent = target; return; }
8119:   const startTs = performance.now();
8120:   const easeOut = t => 1 - Math.pow(1 - t, 3);
8121:   const tick = ts => {
8122:     const progress = Math.min((ts - startTs) / duration, 1);
8123:     const current  = Math.round(easeOut(progress) * numTarget);
8124:     el.textContent = isMonetary
8125:       ? '$' + current.toLocaleString('es-CO')
8126:       : current.toLocaleString('es-CO');
8127:     if (progress < 1) requestAnimationFrame(tick);
8128:     else el.textContent = target; // valor final exacto
8129:   };
8130:   requestAnimationFrame(tick);
8131: }
```

### Coincidencia 20 — línea 8315

```html
8303:       if (c) c.pago = metodo;
8304:       if (metodo) kvSet('pago_'+id, '1');
8305:       else kvRemove('pago_'+id);
8306:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8307:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8308:       renderAgenda(); initDashboard(); renderFinanzas();
8309:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8310:   } catch(e) { toast('Error de conexión', 'err'); }
8311: }
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
```

### Coincidencia 21 — línea 8324

```html
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
8330: 
8331:   if (!candidates.length) { banner.classList.remove('show'); return; }
8332:   const next = candidates[0];
8333:   const mins = Math.round(next.diff);
8334:   document.getElementById('upcomingAlertTxt').innerHTML =
8335:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8336:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 22 — línea 8324

```html
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
8330: 
8331:   if (!candidates.length) { banner.classList.remove('show'); return; }
8332:   const next = candidates[0];
8333:   const mins = Math.round(next.diff);
8334:   document.getElementById('upcomingAlertTxt').innerHTML =
8335:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8336:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 23 — línea 8324

```html
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
8330: 
8331:   if (!candidates.length) { banner.classList.remove('show'); return; }
8332:   const next = candidates[0];
8333:   const mins = Math.round(next.diff);
8334:   document.getElementById('upcomingAlertTxt').innerHTML =
8335:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8336:   document.getElementById('upcomingAlertMins').textContent =
```

### Coincidencia 24 — línea 8325

```html
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
8330: 
8331:   if (!candidates.length) { banner.classList.remove('show'); return; }
8332:   const next = candidates[0];
8333:   const mins = Math.round(next.diff);
8334:   document.getElementById('upcomingAlertTxt').innerHTML =
8335:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8336:   document.getElementById('upcomingAlertMins').textContent =
8337:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
```

### Coincidencia 25 — línea 8774

```html
8762:       logChange('Cita reagendada', `${cita.nombre} · ${cita.fecha} ${cita.hora} → ${fecha} ${hora}`);
8763:       await reload();
8764:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8765:       closeModal('modalDetalle');
8766:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8767:     } else toast('Error: ' + (d.error || ''), 'err');
8768:   } catch(e) { toast('Error de conexión', 'err'); }
8769: }
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
8781:   const grid = document.getElementById('weekGrid');
8782:   if (!grid) return;
8783:   grid.innerHTML = days.map((d, i) => {
8784:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8785:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8786:     const isToday = ds === todayStr;
```

### Coincidencia 26 — línea 8775

```html
8763:       await reload();
8764:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8765:       closeModal('modalDetalle');
8766:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8767:     } else toast('Error: ' + (d.error || ''), 'err');
8768:   } catch(e) { toast('Error de conexión', 'err'); }
8769: }
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
8781:   const grid = document.getElementById('weekGrid');
8782:   if (!grid) return;
8783:   grid.innerHTML = days.map((d, i) => {
8784:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8785:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8786:     const isToday = ds === todayStr;
8787:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
```

### Coincidencia 27 — línea 8776

```html
8764:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8765:       closeModal('modalDetalle');
8766:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8767:     } else toast('Error: ' + (d.error || ''), 'err');
8768:   } catch(e) { toast('Error de conexión', 'err'); }
8769: }
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
8781:   const grid = document.getElementById('weekGrid');
8782:   if (!grid) return;
8783:   grid.innerHTML = days.map((d, i) => {
8784:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8785:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8786:     const isToday = ds === todayStr;
8787:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
8788:       <span class="wday-name">${dayNames[i]}</span>
```

### Coincidencia 28 — línea 8776

```html
8764:       toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
8765:       closeModal('modalDetalle');
8766:       initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
8767:     } else toast('Error: ' + (d.error || ''), 'err');
8768:   } catch(e) { toast('Error de conexión', 'err'); }
8769: }
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
8781:   const grid = document.getElementById('weekGrid');
8782:   if (!grid) return;
8783:   grid.innerHTML = days.map((d, i) => {
8784:     const ds = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
8785:     const count = citasReales().filter(c => normDate(c.fecha) === ds).length;
8786:     const isToday = ds === todayStr;
8787:     return `<div class="wday ${isToday ? 'wday-today' : ''}" onclick="filtrarDia('${ds}')">
8788:       <span class="wday-name">${dayNames[i]}</span>
```

### Coincidencia 29 — línea 9232

```html
9220:     </div>`;
9221: }
9222: 
9223: function smartCobroWhatsApp(c) {
9224:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9225:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9226: }
9227: 
9228: function renderSmartCobrosCenter() {
9229:   const box = document.getElementById('smartCobrosCenter');
9230:   if (!box) return;
9231:   const hoy = today();
9232:   const now = new Date();
9233:   const m = now.getMonth() + 1, y = now.getFullYear();
9234:   const d = smartBriefingData();
9235:   const citas = citasReales().filter(smartIsActiveAppointment);
9236:   const mesPend = citas.filter(c => {
9237:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9238:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9239:   });
9240:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9241:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9242:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9243:     .slice(0,5);
9244:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
```

### Coincidencia 30 — línea 9233

```html
9221: }
9222: 
9223: function smartCobroWhatsApp(c) {
9224:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9225:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9226: }
9227: 
9228: function renderSmartCobrosCenter() {
9229:   const box = document.getElementById('smartCobrosCenter');
9230:   if (!box) return;
9231:   const hoy = today();
9232:   const now = new Date();
9233:   const m = now.getMonth() + 1, y = now.getFullYear();
9234:   const d = smartBriefingData();
9235:   const citas = citasReales().filter(smartIsActiveAppointment);
9236:   const mesPend = citas.filter(c => {
9237:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9238:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9239:   });
9240:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9241:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9242:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9243:     .slice(0,5);
9244:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
9245:   box.style.display = 'block';
```

### Coincidencia 31 — línea 9233

```html
9221: }
9222: 
9223: function smartCobroWhatsApp(c) {
9224:   const url = waLink(c.telefono, c.nombre, c.fecha, c.hora, c.servicio, c.precio, c.modalidad);
9225:   return url ? `<a href="${url}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>` : '';
9226: }
9227: 
9228: function renderSmartCobrosCenter() {
9229:   const box = document.getElementById('smartCobrosCenter');
9230:   if (!box) return;
9231:   const hoy = today();
9232:   const now = new Date();
9233:   const m = now.getMonth() + 1, y = now.getFullYear();
9234:   const d = smartBriefingData();
9235:   const citas = citasReales().filter(smartIsActiveAppointment);
9236:   const mesPend = citas.filter(c => {
9237:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9238:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
9239:   });
9240:   const totalMes = mesPend.reduce((s,c)=>s+parsePrecio(c.precio),0);
9241:   const prioridad = [...d.cobrosVencidos, ...d.porCobrarSemana]
9242:     .sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora))
9243:     .slice(0,5);
9244:   if (!prioridad.length && totalMes === 0) { box.style.display = 'none'; return; }
9245:   box.style.display = 'block';
```

### Coincidencia 32 — línea 9311

```html
9299:       <div class="patient-insight-card"><span>Citas totales</span><strong>${lista.length}</strong></div>
9300:       <div class="patient-insight-card"><span>Realizadas</span><strong>${realizadas.length}</strong></div>
9301:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9302:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9303:     </div>
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
```

### Coincidencia 33 — línea 9312

```html
9300:       <div class="patient-insight-card"><span>Realizadas</span><strong>${realizadas.length}</strong></div>
9301:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9302:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9303:     </div>
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9324: 
```

### Coincidencia 34 — línea 9313

```html
9301:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9302:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9303:     </div>
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9324: 
9325:   document.getElementById('stHoy').textContent      = hoy;
```

### Coincidencia 35 — línea 9313

```html
9301:       <div class="patient-insight-card"><span>Valor histórico</span><strong style="font-size:1rem">${smartPeso(total)}</strong></div>
9302:       <div class="patient-insight-card"><span>Por marcar pago</span><strong style="font-size:1rem;color:${pendiente ? '#d97706' : 'var(--primary)'}">${smartPeso(pendiente)}</strong></div>
9303:     </div>
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9324: 
9325:   document.getElementById('stHoy').textContent      = hoy;
```

### Coincidencia 36 — línea 9315

```html
9303:     </div>
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9324: 
9325:   document.getElementById('stHoy').textContent      = hoy;
9326:   document.getElementById('stSemana').textContent   = semana;
9327:   document.getElementById('stMes').textContent      = mes;
```

### Coincidencia 37 — línea 9316

```html
9304:     ${last ? `<div style="margin-top:9px;font-size:.76rem;color:var(--muted)">Último movimiento local: <strong>${esc(last.accion)}</strong> · ${esc(last.ts)}</div>` : ''}
9305:   </div>`;
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
9322:   const mes    = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
9323:   const pacs   = new Set(citas.map(c => c.telefono || c.email || (c.nombre||'').toLowerCase().trim())).size;
9324: 
9325:   document.getElementById('stHoy').textContent      = hoy;
9326:   document.getElementById('stSemana').textContent   = semana;
9327:   document.getElementById('stMes').textContent      = mes;
9328:   document.getElementById('stPacientes').textContent = pacs;
```

### Coincidencia 38 — línea 9456

```html
9444:   // Banner tareas pendientes en dashboard
9445:   renderTareas();
9446:   // Alerta semana floja en dashboard
9447:   _checkAlertaSemanFloja(citasReales());
9448:   renderSmartBriefing();
9449:   renderSmartCobrosCenter();
9450: }
9451: 
9452: // ── AGENDA ──
9453: 
9454: // ── COBROS PENDIENTES DETALLE ──
9455: function _verCobrosPendientes() {
9456:   const now    = new Date();
9457:   const m      = now.getMonth() + 1, y = now.getFullYear();
9458:   const hoy    = today();
9459:   const citas  = citasReales();
9460:   const futuras = citas.filter(c => {
9461:     const [cy,cm] = normDate(c.fecha).split('-');
9462:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9463:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9464: 
9465:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9466:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9467: 
9468:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
```

### Coincidencia 39 — línea 9457

```html
9445:   renderTareas();
9446:   // Alerta semana floja en dashboard
9447:   _checkAlertaSemanFloja(citasReales());
9448:   renderSmartBriefing();
9449:   renderSmartCobrosCenter();
9450: }
9451: 
9452: // ── AGENDA ──
9453: 
9454: // ── COBROS PENDIENTES DETALLE ──
9455: function _verCobrosPendientes() {
9456:   const now    = new Date();
9457:   const m      = now.getMonth() + 1, y = now.getFullYear();
9458:   const hoy    = today();
9459:   const citas  = citasReales();
9460:   const futuras = citas.filter(c => {
9461:     const [cy,cm] = normDate(c.fecha).split('-');
9462:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9463:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9464: 
9465:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9466:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9467: 
9468:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
9469:     💳 Cobros pendientes — ${futuras.length} citas · ${fmtPeso(total)}
```

### Coincidencia 40 — línea 9457

```html
9445:   renderTareas();
9446:   // Alerta semana floja en dashboard
9447:   _checkAlertaSemanFloja(citasReales());
9448:   renderSmartBriefing();
9449:   renderSmartCobrosCenter();
9450: }
9451: 
9452: // ── AGENDA ──
9453: 
9454: // ── COBROS PENDIENTES DETALLE ──
9455: function _verCobrosPendientes() {
9456:   const now    = new Date();
9457:   const m      = now.getMonth() + 1, y = now.getFullYear();
9458:   const hoy    = today();
9459:   const citas  = citasReales();
9460:   const futuras = citas.filter(c => {
9461:     const [cy,cm] = normDate(c.fecha).split('-');
9462:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
9463:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9464: 
9465:   if (!futuras.length) { toast('No hay cobros pendientes este mes', 'ok'); return; }
9466:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
9467: 
9468:   let html = `<div style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;margin-bottom:14px">
9469:     💳 Cobros pendientes — ${futuras.length} citas · ${fmtPeso(total)}
```

### Coincidencia 41 — línea 9489

```html
9477:       <span style="font-family:var(--font-m);font-size:.88rem;font-weight:700;color:#f59e0b">${c.precio}</span>
9478:     </div>`;
9479:   });
9480:   html += `</div>`;
9481: 
9482:   // Reutiliza el modal de reporte
9483:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9484:   document.getElementById('reporteMesBody').innerHTML = html;
9485:   document.getElementById('modalReporteMes').style.display = 'flex';
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
9497:   const citas = citasReales();
9498:   const futuras = citas.filter(c => {
9499:     const f = normDate(c.fecha);
9500:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9501:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
```

### Coincidencia 42 — línea 9491

```html
9479:   });
9480:   html += `</div>`;
9481: 
9482:   // Reutiliza el modal de reporte
9483:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9484:   document.getElementById('reporteMesBody').innerHTML = html;
9485:   document.getElementById('modalReporteMes').style.display = 'flex';
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
9497:   const citas = citasReales();
9498:   const futuras = citas.filter(c => {
9499:     const f = normDate(c.fecha);
9500:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9501:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9502: 
9503:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
```

### Coincidencia 43 — línea 9492

```html
9480:   html += `</div>`;
9481: 
9482:   // Reutiliza el modal de reporte
9483:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9484:   document.getElementById('reporteMesBody').innerHTML = html;
9485:   document.getElementById('modalReporteMes').style.display = 'flex';
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
9497:   const citas = citasReales();
9498:   const futuras = citas.filter(c => {
9499:     const f = normDate(c.fecha);
9500:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9501:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9502: 
9503:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
9504:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
```

### Coincidencia 44 — línea 9492

```html
9480:   html += `</div>`;
9481: 
9482:   // Reutiliza el modal de reporte
9483:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes este mes';
9484:   document.getElementById('reporteMesBody').innerHTML = html;
9485:   document.getElementById('modalReporteMes').style.display = 'flex';
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
9497:   const citas = citasReales();
9498:   const futuras = citas.filter(c => {
9499:     const f = normDate(c.fecha);
9500:     return f > hoy && f >= sw && f <= ew && !isPagada(c.id);
9501:   }).sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
9502: 
9503:   if (!futuras.length) { toast('No hay cobros pendientes esta semana', 'ok'); return; }
9504:   const total = futuras.reduce((s,c) => s+parsePrecio(c.precio), 0);
```

### Coincidencia 45 — línea 9567

```html
9555:   const fService = document.getElementById('fService').value;
9556:   const fDesde   = document.getElementById('fDesde').value;
9557:   const fHasta   = document.getElementById('fHasta').value;
9558: 
9559:   // Persistir filtros en sessionStorage
9560:   sessionStorage.setItem('agendaFilters', JSON.stringify(
9561:     {search, status: fSt, mod: fMod, service: fService, desde: fDesde, hasta: fHasta}
9562:   ));
9563: 
9564:   // Citas normales
9565:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9566:   if (window._agendaFiltroPendienteCierre) {
9567:     const nowMs = Date.now();
9568:     citas = citas.filter(c => {
9569:       const estado = normalizeAppointmentStatus(c);
9570:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9571:       const fecha = normDate(c.fecha);
9572:       const hora = String(c.hora || '').slice(0, 5);
9573:       if (!fecha || !/^\d{2}:\d{2}$/.test(hora)) return false;
9574:       const fin = new Date(fecha + 'T' + hora);
9575:       fin.setMinutes(fin.getMinutes() + 60);
9576:       return fin.getTime() < nowMs;
9577:     });
9578:     window._agendaFiltroPendienteCierre = false;
9579:   }
```

### Coincidencia 46 — línea 12339

```html
12327: function toggleSegFiltro(f) {
12328:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12329:   else _segFiltros.add(f);
12330:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12331:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12332:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12333:   _renderSegLista(window._segData || [], window._segReadapData || []);
12334: }
12335: 
12336: // Helpers KV sync seguimiento
12337: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12338: function segToggleR(nombre)     {
12339:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12340:   if (segReagendo(nombre)) {
12341:     kvRemove('seg_reagendo_'+nombre);
12342:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12343:   } else {
12344:     kvSet('seg_reagendo_'+nombre,'1');
12345:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12346:     const list = _comisManualReact(y, m);
12347:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12348:   }
12349:   renderSeguimiento();
12350: }
12351: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 47 — línea 12339

```html
12327: function toggleSegFiltro(f) {
12328:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12329:   else _segFiltros.add(f);
12330:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12331:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12332:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12333:   _renderSegLista(window._segData || [], window._segReadapData || []);
12334: }
12335: 
12336: // Helpers KV sync seguimiento
12337: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12338: function segToggleR(nombre)     {
12339:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12340:   if (segReagendo(nombre)) {
12341:     kvRemove('seg_reagendo_'+nombre);
12342:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12343:   } else {
12344:     kvSet('seg_reagendo_'+nombre,'1');
12345:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12346:     const list = _comisManualReact(y, m);
12347:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12348:   }
12349:   renderSeguimiento();
12350: }
12351: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 48 — línea 12339

```html
12327: function toggleSegFiltro(f) {
12328:   if (_segFiltros.has(f)) _segFiltros.delete(f);
12329:   else _segFiltros.add(f);
12330:   const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
12331:   const chip = document.getElementById('segChip' + (idMap[f] || f));
12332:   if (chip) chip.classList.toggle('active', _segFiltros.has(f));
12333:   _renderSegLista(window._segData || [], window._segReadapData || []);
12334: }
12335: 
12336: // Helpers KV sync seguimiento
12337: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12338: function segToggleR(nombre)     {
12339:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12340:   if (segReagendo(nombre)) {
12341:     kvRemove('seg_reagendo_'+nombre);
12342:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12343:   } else {
12344:     kvSet('seg_reagendo_'+nombre,'1');
12345:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12346:     const list = _comisManualReact(y, m);
12347:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12348:   }
12349:   renderSeguimiento();
12350: }
12351: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
```

### Coincidencia 49 — línea 12353

```html
12341:     kvRemove('seg_reagendo_'+nombre);
12342:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12343:   } else {
12344:     kvSet('seg_reagendo_'+nombre,'1');
12345:     segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
12346:     const list = _comisManualReact(y, m);
12347:     if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
12348:   }
12349:   renderSeguimiento();
12350: }
12351: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
12352: function segMarkWa(nombre, tipo, dias) {
12353:   kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
12354:   const label = tipo==='sem3' ? 'WA aviso 3 semanas' : tipo==='sem4' ? 'WA semana 4' : 'WA semana 5+';
12355:   segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin descarga)');
12356:   renderSeguimiento();
12357: }
12358: 
12359: // Log de acciones
12360: function segLogAction(nombre, tipo, accion) {
12361:   const log = JSON.parse(kvGet('seg_log') || '[]');
12362:   log.unshift({ nombre, tipo, accion, fecha: new Date().toLocaleString('es-CO',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) });
12363:   if (log.length > 80) log.length = 80;
12364:   kvSet('seg_log', JSON.stringify(log));
12365: }
```

### Coincidencia 50 — línea 12396

```html
12384:   return kvGet('seg_readap_zona_'+nombre) || '';
12385: }
12386: function setReadapZona(nombre, zona) {
12387:   if (zona) kvSet('seg_readap_zona_'+nombre, zona);
12388:   else kvRemove('seg_readap_zona_'+nombre);
12389: }
12390: 
12391: function renderSeguimiento() {
12392:   const lista = document.getElementById('segLista');
12393:   if (!lista) return;
12394:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12395: 
12396:   const now = new Date(); now.setHours(0,0,0,0);
12397: 
12398:   // Mapa: última descarga por paciente
12399:   const map = {};
12400:   allData.citas
12401:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12402:     .forEach(c => {
12403:       const nombre = (c.nombre||'').trim();
12404:       const fecha  = normDate(c.fecha);
12405:       if (!nombre || !fecha) return;
12406:       if (!map[nombre] || fecha > map[nombre].fecha) {
12407:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12408:       }
```

### Coincidencia 51 — línea 12396

```html
12384:   return kvGet('seg_readap_zona_'+nombre) || '';
12385: }
12386: function setReadapZona(nombre, zona) {
12387:   if (zona) kvSet('seg_readap_zona_'+nombre, zona);
12388:   else kvRemove('seg_readap_zona_'+nombre);
12389: }
12390: 
12391: function renderSeguimiento() {
12392:   const lista = document.getElementById('segLista');
12393:   if (!lista) return;
12394:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12395: 
12396:   const now = new Date(); now.setHours(0,0,0,0);
12397: 
12398:   // Mapa: última descarga por paciente
12399:   const map = {};
12400:   allData.citas
12401:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12402:     .forEach(c => {
12403:       const nombre = (c.nombre||'').trim();
12404:       const fecha  = normDate(c.fecha);
12405:       if (!nombre || !fecha) return;
12406:       if (!map[nombre] || fecha > map[nombre].fecha) {
12407:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12408:       }
```

### Coincidencia 52 — línea 12415

```html
12403:       const nombre = (c.nombre||'').trim();
12404:       const fecha  = normDate(c.fecha);
12405:       if (!nombre || !fecha) return;
12406:       if (!map[nombre] || fecha > map[nombre].fecha) {
12407:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12408:       }
12409:     });
12410: 
12411:   // Calcular días y semana — descargas
12412:   const pacientes = Object.values(map).map(p => {
12413:     const [y,m,d] = p.fecha.split('-');
12414:     const last = new Date(+y,+m-1,+d);
12415:     const dias = Math.floor((now - last) / 86400000);
12416:     let semana = null;
12417:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12418:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12419:     else if (dias >= 49)              semana = 'sem5';
12420:     return { ...p, dias, semana };
12421:   }).filter(p => p.semana !== null);
12422: 
12423:   // Mapa: última readaptación por paciente
12424:   const mapR = {};
12425:   allData.citas
12426:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esReadaptacion(c.servicio))
12427:     .forEach(c => {
```

### Coincidencia 53 — línea 12439

```html
12427:     .forEach(c => {
12428:       const nombre = (c.nombre||'').trim();
12429:       const fecha  = normDate(c.fecha);
12430:       if (!nombre || !fecha) return;
12431:       if (!mapR[nombre] || fecha > mapR[nombre].fecha) {
12432:         mapR[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12433:       }
12434:     });
12435: 
12436:   const readapPacs = Object.values(mapR).map(p => {
12437:     const [y,m,d] = p.fecha.split('-');
12438:     const last = new Date(+y,+m-1,+d);
12439:     const dias = Math.floor((now - last) / 86400000);
12440:     return { ...p, dias };
12441:   });
12442: 
12443:   // Contar
12444:   const c3 = pacientes.filter(p=>p.semana==='sem3').length;
12445:   const c4 = pacientes.filter(p=>p.semana==='sem4').length;
12446:   const c5 = pacientes.filter(p=>p.semana==='sem5').length;
12447:   const cR = pacientes.filter(p=>segReagendo(p.nombre)).length;
12448:   const cReadap = readapPacs.filter(p=>!segReagendo(p.nombre)).length;
12449: 
12450:   ['3','4','5','R'].forEach(k => {
12451:     const el = document.getElementById('segCount'+k);
```

### Coincidencia 54 — línea 12855

```html
12843:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12844:   renderFinanzas();
12845:   actualizarMetaBarra(calcCobradoMes());
12846:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
```

### Coincidencia 55 — línea 12856

```html
12844:   renderFinanzas();
12845:   actualizarMetaBarra(calcCobradoMes());
12846:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
12868: 
```

### Coincidencia 56 — línea 12857

```html
12845:   actualizarMetaBarra(calcCobradoMes());
12846:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
12868: 
12869: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 57 — línea 12859

```html
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
12868: 
12869: // ══════════════════════════════════════════════════════════════
12870: // ── NOTAS RÁPIDAS ──
12871: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 58 — línea 12859

```html
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
12868: 
12869: // ══════════════════════════════════════════════════════════════
12870: // ── NOTAS RÁPIDAS ──
12871: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 59 — línea 12859

```html
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
12865:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
12866:   return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
12867: }
12868: 
12869: // ══════════════════════════════════════════════════════════════
12870: // ── NOTAS RÁPIDAS ──
12871: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 60 — línea 12941

```html
12929:   for (const key in grupos) {
12930:     const arr = grupos[key];
12931:     if (arr.length > 1) {
12932:       arr.slice(1).forEach(c => dups.push(c));
12933:     }
12934:   }
12935:   return dups;
12936: }
12937: 
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
12947:   const egresoFechaEl = document.getElementById('egresoFecha');
12948:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12949: 
12950:   // ── Meta ──
12951:   const meta = getMeta();
12952:   const cobradoMes = calcCobradoMes();
12953:   const metaInp = document.getElementById('metaInputFin');
```

### Coincidencia 61 — línea 12942

```html
12930:     const arr = grupos[key];
12931:     if (arr.length > 1) {
12932:       arr.slice(1).forEach(c => dups.push(c));
12933:     }
12934:   }
12935:   return dups;
12936: }
12937: 
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
12947:   const egresoFechaEl = document.getElementById('egresoFecha');
12948:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12949: 
12950:   // ── Meta ──
12951:   const meta = getMeta();
12952:   const cobradoMes = calcCobradoMes();
12953:   const metaInp = document.getElementById('metaInputFin');
12954:   const metaActTxt = document.getElementById('metaActualTexto');
```

### Coincidencia 62 — línea 12943

```html
12931:     if (arr.length > 1) {
12932:       arr.slice(1).forEach(c => dups.push(c));
12933:     }
12934:   }
12935:   return dups;
12936: }
12937: 
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
12947:   const egresoFechaEl = document.getElementById('egresoFecha');
12948:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
12949: 
12950:   // ── Meta ──
12951:   const meta = getMeta();
12952:   const cobradoMes = calcCobradoMes();
12953:   const metaInp = document.getElementById('metaInputFin');
12954:   const metaActTxt = document.getElementById('metaActualTexto');
12955:   if (metaInp && meta) metaInp.value = meta.toLocaleString('es-CO');
```

### Coincidencia 63 — línea 13079

```html
13067:         ${resRow('Ticket promedio', ticketProm > 0 ? '$' + ticketProm.toLocaleString('es-CO') : '—', '')}
13068:         ${meta ? resRow('Meta cumplida', Math.min(Math.round(cobradoMes/meta*100),100) + '%', cobradoMes >= meta ? 'color:var(--ok);font-weight:700' : 'color:var(--warn)') : ''}
13069:       </div>`;
13070:   }
13071: 
13072:   // ── Alerta semana floja ──
13073:   _checkAlertaSemanFloja(citas);
13074: 
13075:   // ── Proyección extendida a fin de mes ──
13076:   const proyExtEl = document.getElementById('finProyeccionExt');
13077:   if (proyExtEl) {
13078:     const diasMes   = new Date(y, m, 0).getDate();
13079:     const diaActual = now.getDate();
13080:     const diasRest  = diasMes - diaActual;
13081:     const ritmoD    = diaActual > 0 ? cobradoMes / diaActual : 0;
13082:     const proyFin   = Math.round(ritmoD * diasMes);
13083:     const pctProy   = meta ? Math.min(Math.round(proyFin / meta * 100), 120) : null;
13084:     const color     = !meta ? 'var(--primary)' : (pctProy >= 100 ? 'var(--ok)' : pctProy >= 70 ? 'var(--warn)' : '#ef4444');
13085:     const indicador = !meta ? '🔵' : (pctProy >= 100 ? '🟢' : pctProy >= 70 ? '🟡' : '🔴');
13086:     const promNec   = meta && diasRest > 0 ? Math.round((meta - cobradoMes) / diasRest) : 0;
13087:     const difProyM  = meta ? proyFin - meta : null;
13088:     proyExtEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px">
13089:       <div style="padding:14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
13090:         <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Proyección al día ${diasMes}</div>
13091:         <div style="font-family:var(--font-h);font-size:1.25rem;font-weight:700;color:${color}">${indicador} $${proyFin.toLocaleString('es-CO')}</div>
```

### Coincidencia 64 — línea 13159

```html
13147: 
13148: function guardarEgreso() {
13149:   const fecha = document.getElementById('egresoFecha').value;
13150:   const cat   = document.getElementById('egresoCategoria').value;
13151:   const conc  = document.getElementById('egresoConcepto').value;
13152:   const monto = parseInt((document.getElementById('egresoMonto').value || '').replace(/\D/g,''), 10);
13153:   const desc  = document.getElementById('egresoDesc').value.trim();
13154: 
13155:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
13156:   if (!monto || monto <= 0) { toast('Ingresa un monto válido', 'err'); return; }
13157: 
13158:   const arr = getEgresos();
13159:   arr.push({ id: Date.now().toString(), fecha, categoria: cat, concepto: conc, monto, descripcion: desc });
13160:   saveEgresos(arr);
13161: 
13162:   document.getElementById('egresoFecha').value  = '';
13163:   document.getElementById('egresoMonto').value  = '';
13164:   document.getElementById('egresoDesc').value   = '';
13165:   toast('Egreso registrado', 'ok');
13166:   renderEgresosList();
13167:   renderEstructuraFinanciera();
13168: }
13169: 
13170: function eliminarEgreso(id) {
13171:   if (!confirm('¿Eliminar este egreso?')) return;
```

### Coincidencia 65 — línea 13182

```html
13170: function eliminarEgreso(id) {
13171:   if (!confirm('¿Eliminar este egreso?')) return;
13172:   saveEgresos(getEgresos().filter(e => e.id !== id));
13173:   renderEgresosList();
13174:   renderEstructuraFinanciera();
13175: }
13176: 
13177: function renderEgresosList() {
13178:   const el = document.getElementById('egresosListResult');
13179:   if (!el) return;
13180: 
13181:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13182:   const now = new Date();
13183:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13184:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13185:     document.getElementById('egresoMesFiltro').value = defaultMes;
13186:   }
13187:   const mes = filtroMes || defaultMes;
13188: 
13189:   let arr = getEgresos();
13190:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13191:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13192: 
13193:   if (!arr.length) {
13194:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
```

### Coincidencia 66 — línea 13183

```html
13171:   if (!confirm('¿Eliminar este egreso?')) return;
13172:   saveEgresos(getEgresos().filter(e => e.id !== id));
13173:   renderEgresosList();
13174:   renderEstructuraFinanciera();
13175: }
13176: 
13177: function renderEgresosList() {
13178:   const el = document.getElementById('egresosListResult');
13179:   if (!el) return;
13180: 
13181:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13182:   const now = new Date();
13183:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13184:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13185:     document.getElementById('egresoMesFiltro').value = defaultMes;
13186:   }
13187:   const mes = filtroMes || defaultMes;
13188: 
13189:   let arr = getEgresos();
13190:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13191:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13192: 
13193:   if (!arr.length) {
13194:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
13195:     return;
```

### Coincidencia 67 — línea 13183

```html
13171:   if (!confirm('¿Eliminar este egreso?')) return;
13172:   saveEgresos(getEgresos().filter(e => e.id !== id));
13173:   renderEgresosList();
13174:   renderEstructuraFinanciera();
13175: }
13176: 
13177: function renderEgresosList() {
13178:   const el = document.getElementById('egresosListResult');
13179:   if (!el) return;
13180: 
13181:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13182:   const now = new Date();
13183:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13184:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13185:     document.getElementById('egresoMesFiltro').value = defaultMes;
13186:   }
13187:   const mes = filtroMes || defaultMes;
13188: 
13189:   let arr = getEgresos();
13190:   if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
13191:   arr.sort((a,b) => b.fecha.localeCompare(a.fecha));
13192: 
13193:   if (!arr.length) {
13194:     el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
13195:     return;
```

### Coincidencia 68 — línea 13378

```html
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
13385:     const [cy,cm] = normDate(c.fecha).split('-');
13386:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13387:   }).forEach(c => {
13388:     const key = (c.nombre||'').trim().toLowerCase();
13389:     if (!key) return;
13390:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
```

### Coincidencia 69 — línea 13379

```html
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
13385:     const [cy,cm] = normDate(c.fecha).split('-');
13386:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13387:   }).forEach(c => {
13388:     const key = (c.nombre||'').trim().toLowerCase();
13389:     if (!key) return;
13390:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13391:     if (c.telefono) pacMap[key].telefono = c.telefono;
```

### Coincidencia 70 — línea 13380

```html
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
13385:     const [cy,cm] = normDate(c.fecha).split('-');
13386:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13387:   }).forEach(c => {
13388:     const key = (c.nombre||'').trim().toLowerCase();
13389:     if (!key) return;
13390:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13391:     if (c.telefono) pacMap[key].telefono = c.telefono;
13392:     if (c.email)    pacMap[key].email    = c.email;
```

### Coincidencia 71 — línea 13457

```html
13445:     return raw ? JSON.parse(raw) : [];
13446:   } catch { return []; }
13447: }
13448: 
13449: function saveLeads(arr) {
13450:   kvSet('leads_log', JSON.stringify(arr));
13451: }
13452: 
13453: function addLead(canal = 'WhatsApp') {
13454:   const leads = getLeads();
13455:   const ahora = new Date();
13456:   leads.push({
13457:     id: Date.now(),
13458:     fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
13459:     hora: ahora.toTimeString().slice(0,5),    // HH:MM
13460:     canal: canal,
13461:     timestamp: ahora.getTime()
13462:   });
13463:   saveLeads(leads);
13464:   return leads.length;
13465: }
13466: 
13467: function deleteLastLead() {
13468:   const leads = getLeads();
13469:   if (leads.length === 0) return false;
```

### Coincidencia 72 — línea 13500

```html
13488: 
13489: function getLeadsMes(mesParam, anyoParam) {
13490:   const ahora = new Date();
13491:   const y = anyoParam || ahora.getFullYear();
13492:   const m = mesParam  || ahora.getMonth() + 1;
13493:   return getLeads().filter(l => {
13494:     const [ly, lm] = l.fecha.split('-');
13495:     return +ly === y && +lm === m;
13496:   }).length;
13497: }
13498: 
13499: function changeKPIMonth(m, y) {
13500:   const now = new Date();
13501:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13502:   _kpiViewMonth = esActual ? null : {m, y};
13503:   renderKPIGuia();
13504: }
13505: 
13506: function registrarLead(canal) {
13507:   addLead(canal);
13508:   actualizarContadorLeads();
13509:   const fb = document.getElementById('leadFeedback');
13510:   if (fb) {
13511:     fb.textContent = `✅ Lead de ${canal} registrado`;
13512:     setTimeout(() => { fb.textContent = ''; }, 2500);
```

### Coincidencia 73 — línea 13501

```html
13489: function getLeadsMes(mesParam, anyoParam) {
13490:   const ahora = new Date();
13491:   const y = anyoParam || ahora.getFullYear();
13492:   const m = mesParam  || ahora.getMonth() + 1;
13493:   return getLeads().filter(l => {
13494:     const [ly, lm] = l.fecha.split('-');
13495:     return +ly === y && +lm === m;
13496:   }).length;
13497: }
13498: 
13499: function changeKPIMonth(m, y) {
13500:   const now = new Date();
13501:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13502:   _kpiViewMonth = esActual ? null : {m, y};
13503:   renderKPIGuia();
13504: }
13505: 
13506: function registrarLead(canal) {
13507:   addLead(canal);
13508:   actualizarContadorLeads();
13509:   const fb = document.getElementById('leadFeedback');
13510:   if (fb) {
13511:     fb.textContent = `✅ Lead de ${canal} registrado`;
13512:     setTimeout(() => { fb.textContent = ''; }, 2500);
13513:   }
```

### Coincidencia 74 — línea 13501

```html
13489: function getLeadsMes(mesParam, anyoParam) {
13490:   const ahora = new Date();
13491:   const y = anyoParam || ahora.getFullYear();
13492:   const m = mesParam  || ahora.getMonth() + 1;
13493:   return getLeads().filter(l => {
13494:     const [ly, lm] = l.fecha.split('-');
13495:     return +ly === y && +lm === m;
13496:   }).length;
13497: }
13498: 
13499: function changeKPIMonth(m, y) {
13500:   const now = new Date();
13501:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13502:   _kpiViewMonth = esActual ? null : {m, y};
13503:   renderKPIGuia();
13504: }
13505: 
13506: function registrarLead(canal) {
13507:   addLead(canal);
13508:   actualizarContadorLeads();
13509:   const fb = document.getElementById('leadFeedback');
13510:   if (fb) {
13511:     fb.textContent = `✅ Lead de ${canal} registrado`;
13512:     setTimeout(() => { fb.textContent = ''; }, 2500);
13513:   }
```

### Coincidencia 75 — línea 13587

```html
13575:   const el = document.getElementById('kpiTableroResult');
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
13579:   const manual = getKPIManual();
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
```

### Coincidencia 76 — línea 13588

```html
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
13579:   const manual = getKPIManual();
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
```

### Coincidencia 77 — línea 13588

```html
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
13579:   const manual = getKPIManual();
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
```

### Coincidencia 78 — línea 13592

```html
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
13601:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13602:   });
13603:   const eventosSemana = (allData.eventos || []).filter(e => {
13604:     const f = normDate(e.fecha);
```

### Coincidencia 79 — línea 13592

```html
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
13601:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13602:   });
13603:   const eventosSemana = (allData.eventos || []).filter(e => {
13604:     const f = normDate(e.fecha);
```

### Coincidencia 80 — línea 13593

```html
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
13601:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13602:   });
13603:   const eventosSemana = (allData.eventos || []).filter(e => {
13604:     const f = normDate(e.fecha);
13605:     return f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 81 — línea 13593

```html
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
13599:   const citasSemana = citas.filter(c => {
13600:     const f = normDate(c.fecha);
13601:     return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
13602:   });
13603:   const eventosSemana = (allData.eventos || []).filter(e => {
13604:     const f = normDate(e.fecha);
13605:     return f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 82 — línea 13818

```html
13806: 
13807:   el.innerHTML = html;
13808: }
13809: 
13810: // ══════════════════════════════════════════════════════════════
13811: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13812: // ══════════════════════════════════════════════════════════════
13813: function _copyGestionMesKey(d = new Date()) {
13814:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13815: }
13816: 
13817: function _copyGestionPeriodo() {
13818:   const now = new Date();
13819:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
```

### Coincidencia 83 — línea 13820

```html
13808: }
13809: 
13810: // ══════════════════════════════════════════════════════════════
13811: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13812: // ══════════════════════════════════════════════════════════════
13813: function _copyGestionMesKey(d = new Date()) {
13814:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13815: }
13816: 
13817: function _copyGestionPeriodo() {
13818:   const now = new Date();
13819:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
```

### Coincidencia 84 — línea 13820

```html
13808: }
13809: 
13810: // ══════════════════════════════════════════════════════════════
13811: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13812: // ══════════════════════════════════════════════════════════════
13813: function _copyGestionMesKey(d = new Date()) {
13814:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13815: }
13816: 
13817: function _copyGestionPeriodo() {
13818:   const now = new Date();
13819:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
```

### Coincidencia 85 — línea 13832

```html
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
13833:   const monthKey = _copyGestionMesKey(now);
13834:   const citasAll = allData.citas || [];
13835:   const eventosAll = allData.eventos || [];
13836:   const pacientesAll = allData.pacientes || [];
13837:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13838:   const manual = getKPIManual ? getKPIManual() : {};
13839:   const cfg = getKPIConfig ? getKPIConfig() : {};
13840:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13841:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13842:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
13843:   const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
13844:   const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
```

### Coincidencia 86 — línea 13833

```html
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
13833:   const monthKey = _copyGestionMesKey(now);
13834:   const citasAll = allData.citas || [];
13835:   const eventosAll = allData.eventos || [];
13836:   const pacientesAll = allData.pacientes || [];
13837:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13838:   const manual = getKPIManual ? getKPIManual() : {};
13839:   const cfg = getKPIConfig ? getKPIConfig() : {};
13840:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13841:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13842:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
13843:   const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
13844:   const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
13845:   const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
```

### Coincidencia 87 — línea 13885

```html
13873:     const serv = c.servicio || 'Sin servicio';
13874:     servicios[serv] = (servicios[serv] || 0) + 1;
13875:     const h = String(c.hora || '').slice(0,2) + ':00';
13876:     if (h && h !== ':00') horarios[h] = (horarios[h] || 0) + 1;
13877:   });
13878:   const serviciosArr = Object.entries(servicios).sort((a,b) => b[1] - a[1]);
13879:   const horariosArr = Object.entries(horarios).sort((a,b) => b[1] - a[1]);
13880:   const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
13881:   const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;
13882: 
13883:   const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
13884:   const leadsConvertidos = manual.convertidos || citasMesActivas.length;
13885:   const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);
13886: 
13887:   const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
13888:   const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
13889:   const disponibilidadPros = pros.length
13890:     ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
13891:     : 'Sin fisioterapeutas registrados';
13892: 
13893:   return {
13894:     periodo: _copyGestionPeriodo(),
13895:     metaMensual, ingresosCobrados, ventasGeneradas, pendienteCobrar, egresosMes, ganancia, cumplimiento, faltante,
13896:     citasProgramadas: citasMesActivas.length,
13897:     sesionesAtendidas,
```

### Coincidencia 88 — línea 14335

```html
14323:     <span style="font-size:1rem;margin-top:1px">${dot}</span>
14324:     <div style="flex:1;min-width:0">
14325:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14326:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14327:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14328:       </div>
14329:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14330:     </div>
14331:   </div>`;
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14342:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14343: 
14344:   const citas  = citasReales();
14345:   const manual = getKPIManual();
14346:   const todasCitas = allData.citas || [];
14347:   const eventosAll = allData.eventos || [];
```

### Coincidencia 89 — línea 14336

```html
14324:     <div style="flex:1;min-width:0">
14325:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14326:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14327:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14328:       </div>
14329:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14330:     </div>
14331:   </div>`;
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14342:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14343: 
14344:   const citas  = citasReales();
14345:   const manual = getKPIManual();
14346:   const todasCitas = allData.citas || [];
14347:   const eventosAll = allData.eventos || [];
14348: 
```

### Coincidencia 90 — línea 14337

```html
14325:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14326:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14327:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14328:       </div>
14329:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14330:     </div>
14331:   </div>`;
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14342:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14343: 
14344:   const citas  = citasReales();
14345:   const manual = getKPIManual();
14346:   const todasCitas = allData.citas || [];
14347:   const eventosAll = allData.eventos || [];
14348: 
14349:   // ══════════ CÁLCULOS ══════════
```

### Coincidencia 91 — línea 14450

```html
14438:   );
14439:   const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
14440:   const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
14441: 
14442:   // Cancelaciones por servicio
14443:   const cancelPorServ = {};
14444:   canceladasMes.forEach(c => {
14445:     const sv = c.servicio||'Sin tipo';
14446:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14447:   });
14448: 
14449:   // ── Pacientes ──
14450:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14451:   const pacMesMap = {};
14452:   citasMes.forEach(c => {
14453:     if (!c.nombre) return;
14454:     const k = c.nombre.trim().toLowerCase();
14455:     pacMesMap[k] = (pacMesMap[k]||0)+1;
14456:   });
14457:   const pacUnicosMes = Object.keys(pacMesMap).length;
14458: 
14459:   let pacNuevos = 0, pacRecurrentes = 0;
14460:   Object.keys(pacMesMap).forEach(pac => {
14461:     const prev = todasCitas.filter(c => {
14462:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
```

### Coincidencia 92 — línea 14450

```html
14438:   );
14439:   const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
14440:   const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
14441: 
14442:   // Cancelaciones por servicio
14443:   const cancelPorServ = {};
14444:   canceladasMes.forEach(c => {
14445:     const sv = c.servicio||'Sin tipo';
14446:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14447:   });
14448: 
14449:   // ── Pacientes ──
14450:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14451:   const pacMesMap = {};
14452:   citasMes.forEach(c => {
14453:     if (!c.nombre) return;
14454:     const k = c.nombre.trim().toLowerCase();
14455:     pacMesMap[k] = (pacMesMap[k]||0)+1;
14456:   });
14457:   const pacUnicosMes = Object.keys(pacMesMap).length;
14458: 
14459:   let pacNuevos = 0, pacRecurrentes = 0;
14460:   Object.keys(pacMesMap).forEach(pac => {
14461:     const prev = todasCitas.filter(c => {
14462:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
```

### Coincidencia 93 — línea 14473

```html
14461:     const prev = todasCitas.filter(c => {
14462:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
14463:       const f = new Date(normDate(c.fecha)+'T12:00:00');
14464:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
14465:     });
14466:     if (prev.length===0) pacNuevos++; else pacRecurrentes++;
14467:   });
14468: 
14469:   // Top 5 pacientes por sesiones
14470:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14471: 
14472:   // Retención 60 días
14473:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14474:   const conteoPac = {};
14475:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14476:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14477:   const pac60 = Object.keys(conteoPac).length;
14478:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
14479:   const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;
14480: 
14481:   // ── Leads y conversión ──
14482:   const leadsMes = getLeadsMes() || manual.leads || 0;
14483:   const citasNuevasMes = citasMes.length;
14484:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14485: 
```

### Coincidencia 94 — línea 14473

```html
14461:     const prev = todasCitas.filter(c => {
14462:       if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
14463:       const f = new Date(normDate(c.fecha)+'T12:00:00');
14464:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
14465:     });
14466:     if (prev.length===0) pacNuevos++; else pacRecurrentes++;
14467:   });
14468: 
14469:   // Top 5 pacientes por sesiones
14470:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14471: 
14472:   // Retención 60 días
14473:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14474:   const conteoPac = {};
14475:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14476:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14477:   const pac60 = Object.keys(conteoPac).length;
14478:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
14479:   const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;
14480: 
14481:   // ── Leads y conversión ──
14482:   const leadsMes = getLeadsMes() || manual.leads || 0;
14483:   const citasNuevasMes = citasMes.length;
14484:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14485: 
```

### Coincidencia 95 — línea 14588

```html
14576:   ].filter(Boolean).length;
14577:   const totalKpis = 5;
14578:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14579:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14580:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14581:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14582: 
14583:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14584:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14585:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14586:       <div style="flex:1">
14587:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
14588:         <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
14589:       </div>
14590:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
14591:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14592:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
14593:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
14594:         </div>
14595:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14596:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${totalSesiones}</div>
14597:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">SESIONES</div>
14598:         </div>
14599:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14600:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${utilidadMes>=0?'var(--ok)':'#ef4444'}">${fmtPeso(utilidadMes)}</div>
```

### Coincidencia 96 — línea 15004

```html
14992:   } else {
14993:     html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
14994:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
14995:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
14996:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
14997:     </div>`;
14998:   }
14999: 
15000:   return html;
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
15010:   const el = document.getElementById('reporteMesBody');
15011:   // Construir texto plano desde el HTML
15012:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15013:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15014: 
15015:   navigator.clipboard.writeText(txt).then(() => {
15016:     const btn = document.getElementById('btnCopiarReporte');
```

### Coincidencia 97 — línea 15005

```html
14993:     html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
14994:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
14995:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
14996:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
14997:     </div>`;
14998:   }
14999: 
15000:   return html;
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
15010:   const el = document.getElementById('reporteMesBody');
15011:   // Construir texto plano desde el HTML
15012:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15013:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15014: 
15015:   navigator.clipboard.writeText(txt).then(() => {
15016:     const btn = document.getElementById('btnCopiarReporte');
15017:     const orig = btn.innerHTML;
```

### Coincidencia 98 — línea 15006

```html
14994:       <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
14995:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
14996:       <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
14997:     </div>`;
14998:   }
14999: 
15000:   return html;
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
15010:   const el = document.getElementById('reporteMesBody');
15011:   // Construir texto plano desde el HTML
15012:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15013:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15014: 
15015:   navigator.clipboard.writeText(txt).then(() => {
15016:     const btn = document.getElementById('btnCopiarReporte');
15017:     const orig = btn.innerHTML;
15018:     btn.textContent = '✓ Copiado';
```

### Coincidencia 99 — línea 15050

```html
15038:     <p style="color:#6B7280;font-size:.85rem;margin-bottom:28px">Reporte automático de indicadores de gestión</p>
15039:     ${body}
15040:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15041:   </body></html>`);
15042:   w.document.close();
15043:   setTimeout(() => w.print(), 500);
15044: }
15045: 
15046: // ══════════════════════════════════════════════════════════════
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
15057: 
15058:   const citas      = citasReales();
15059:   const todasCitas = allData.citas || [];
15060:   const eventosAll = allData.eventos || [];
15061:   const manual     = getKPIManual();
15062:   const costos     = getCostosEstructura();
```

### Coincidencia 100 — línea 15051

```html
15039:     ${body}
15040:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15041:   </body></html>`);
15042:   w.document.close();
15043:   setTimeout(() => w.print(), 500);
15044: }
15045: 
15046: // ══════════════════════════════════════════════════════════════
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
15057: 
15058:   const citas      = citasReales();
15059:   const todasCitas = allData.citas || [];
15060:   const eventosAll = allData.eventos || [];
15061:   const manual     = getKPIManual();
15062:   const costos     = getCostosEstructura();
15063:   const calc       = calcTotalCostos(costos);
```

### Coincidencia 101 — línea 15052

```html
15040:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15041:   </body></html>`);
15042:   w.document.close();
15043:   setTimeout(() => w.print(), 500);
15044: }
15045: 
15046: // ══════════════════════════════════════════════════════════════
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
15057: 
15058:   const citas      = citasReales();
15059:   const todasCitas = allData.citas || [];
15060:   const eventosAll = allData.eventos || [];
15061:   const manual     = getKPIManual();
15062:   const costos     = getCostosEstructura();
15063:   const calc       = calcTotalCostos(costos);
15064: 
```

### Coincidencia 102 — línea 15098

```html
15086:   citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
15087:   const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
15088:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
15089:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
15090: 
15091:   // ── Cancelaciones ──
15092:   const motivosMes    = getCancelMotivos();
15093:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15094:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15095:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15096: 
15097:   // ── Pacientes ──
15098:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15099:   const pacMesMap = {};
15100:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15101:   const pacUnicosMes = Object.keys(pacMesMap).length;
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
15104:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15105:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15106:   });
15107:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15108:   const cont60={};
15109:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
```

### Coincidencia 103 — línea 15098

```html
15086:   citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
15087:   const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
15088:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
15089:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
15090: 
15091:   // ── Cancelaciones ──
15092:   const motivosMes    = getCancelMotivos();
15093:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15094:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15095:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15096: 
15097:   // ── Pacientes ──
15098:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15099:   const pacMesMap = {};
15100:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15101:   const pacUnicosMes = Object.keys(pacMesMap).length;
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
15104:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15105:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15106:   });
15107:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15108:   const cont60={};
15109:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
```

### Coincidencia 104 — línea 15107

```html
15095:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15096: 
15097:   // ── Pacientes ──
15098:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15099:   const pacMesMap = {};
15100:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15101:   const pacUnicosMes = Object.keys(pacMesMap).length;
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
15104:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15105:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15106:   });
15107:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15108:   const cont60={};
15109:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15111:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15112: 
15113:   // ── Leads y marketing ──
15114:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15115:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15116:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15117:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15118:   const canalMap={}, canalIng={};
15119:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
```

### Coincidencia 105 — línea 15107

```html
15095:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15096: 
15097:   // ── Pacientes ──
15098:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15099:   const pacMesMap = {};
15100:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15101:   const pacUnicosMes = Object.keys(pacMesMap).length;
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
15104:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15105:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15106:   });
15107:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15108:   const cont60={};
15109:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15111:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15112: 
15113:   // ── Leads y marketing ──
15114:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15115:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15116:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15117:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15118:   const canalMap={}, canalIng={};
15119:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
```

### Coincidencia 106 — línea 15148

```html
15136:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
15137:   const diaPico = diasNom[porDia.indexOf(Math.max(...porDia))];
15138:   const diaBajo = diasNom[[1,2,3,4,5,6,0].reduce((best,d)=>porDia[d]<porDia[best]?d:best, 1)];
15139: 
15140:   // ════════════ CONSTRUIR TEXTO ════════════
15141:   let t = '';
15142:   const line = (l='') => t += l + '\n';
15143:   const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
15144:   const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
15145:   const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);
15146: 
15147:   line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
15148:   line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
15149:   line(sep(60));
15150:   line();
15151:   line(`CONTEXTO DEL NEGOCIO`);
15152:   line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
15153:   line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
15154:   line(`Objetivo: ${fmtPeso(calc.total)}/mes para cubrir costos, imprevistos y 20% de utilidad.`);
15155: 
15156:   h1(`1. RESULTADOS FINANCIEROS`);
15157:   row('Ingresos facturados', fmtPeso(ventasFact));
15158:   row('Ingresos cobrados', fmtPeso(ventasCobradas));
15159:   row('Pendiente de cobro', fmtPeso(ventasPendientes));
15160:   row('Meta de ventas del mes', fmtPeso(calc.total));
```

### Coincidencia 107 — línea 15359

```html
15347:     if (body) body.style.display = 'block';
15348:     if (id === 'gkKpi4b') _renderCancelBreakdown();
15349:     if (id === 'gkKpi8')  _renderBDBreakdown();
15350:   }
15351:   setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
15352: }
15353: 
15354: // ══ MANUAL DE EMERGENCIA — funciones ══
15355: function renderEmergencia() {
15356:   const d = window._emKPIData;
15357:   if (!d) return;
15358: 
15359:   const now  = new Date();
15360:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15361: 
15362:   function kpiSt(val, meta, altoEsMejor) {
15363:     if (isNaN(val) || !meta || meta <= 0) return -1;
15364:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15365:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15366:     return ok ? 0 : warn ? 1 : 2;
15367:   }
15368: 
15369:   const st = {
15370:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15371:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
```

### Coincidencia 108 — línea 15360

```html
15348:     if (id === 'gkKpi4b') _renderCancelBreakdown();
15349:     if (id === 'gkKpi8')  _renderBDBreakdown();
15350:   }
15351:   setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
15352: }
15353: 
15354: // ══ MANUAL DE EMERGENCIA — funciones ══
15355: function renderEmergencia() {
15356:   const d = window._emKPIData;
15357:   if (!d) return;
15358: 
15359:   const now  = new Date();
15360:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15361: 
15362:   function kpiSt(val, meta, altoEsMejor) {
15363:     if (isNaN(val) || !meta || meta <= 0) return -1;
15364:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15365:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15366:     return ok ? 0 : warn ? 1 : 2;
15367:   }
15368: 
15369:   const st = {
15370:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15371:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15372:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
```

### Coincidencia 109 — línea 15530

```html
15518:   kvRemove('em_steps_' + kpi);
15519:   for (let i = 0; i < total; i++) {
15520:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15521:     if (ck) ck.checked = false;
15522:   }
15523:   _updateEmProgress(kpi);
15524: }
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 110 — línea 15531

```html
15519:   for (let i = 0; i < total; i++) {
15520:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15521:     if (ck) ck.checked = false;
15522:   }
15523:   _updateEmProgress(kpi);
15524: }
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
```

### Coincidencia 111 — línea 15532

```html
15520:     const ck = document.getElementById('emCk_' + kpi + '_' + i);
15521:     if (ck) ck.checked = false;
15522:   }
15523:   _updateEmProgress(kpi);
15524: }
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
```

### Coincidencia 112 — línea 15533

```html
15521:     if (ck) ck.checked = false;
15522:   }
15523:   _updateEmProgress(kpi);
15524: }
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
```

### Coincidencia 113 — línea 15533

```html
15521:     if (ck) ck.checked = false;
15522:   }
15523:   _updateEmProgress(kpi);
15524: }
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
```

### Coincidencia 114 — línea 15541

```html
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15547:     });
15548:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15549:       const f = normDate(e.fecha);
15550:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15551:     });
15552:     const _nCitasG = citasSemana.length;
15553:     _nEvG    = eventosSemanaG.length;
```

### Coincidencia 115 — línea 15541

```html
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15547:     });
15548:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15549:       const f = normDate(e.fecha);
15550:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15551:     });
15552:     const _nCitasG = citasSemana.length;
15553:     _nEvG    = eventosSemanaG.length;
```

### Coincidencia 116 — línea 15542

```html
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15547:     });
15548:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15549:       const f = normDate(e.fecha);
15550:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15551:     });
15552:     const _nCitasG = citasSemana.length;
15553:     _nEvG    = eventosSemanaG.length;
15554:     const sessSemana = _nCitasG + _nEvG;
```

### Coincidencia 117 — línea 15542

```html
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15547:     });
15548:     const eventosSemanaG = (allData.eventos || []).filter(e => {
15549:       const f = normDate(e.fecha);
15550:       return f >= toStr(lunesSem) && f <= toStr(domingoSem);
15551:     });
15552:     const _nCitasG = citasSemana.length;
15553:     _nEvG    = eventosSemanaG.length;
15554:     const sessSemana = _nCitasG + _nEvG;
```

### Coincidencia 118 — línea 15623

```html
15611:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15612:   const _stRecurrentes = _listaRecurrentes.length;
15613: 
15614:   // Extra — Cancelaciones mes (excluye pruebas)
15615:   const _motivosGuia  = getCancelMotivos();
15616:   const todasCitasMes = (allData.citas || []).filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
15617:   const canceladasMes = todasCitasMes.filter(c =>
15618:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15619:   ).length;
15620:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15621: 
15622:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15623:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15624:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
15625:   const cuentaPac = {};
15626:   citas.filter(c => {
15627:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15628:     return fd >= hace60 && fd <= refDate;
15629:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15630:   const pacs60     = Object.keys(cuentaPac).length;
15631:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15632:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15633: 
15634:   // Selector de mes
15635:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
```

### Coincidencia 119 — línea 15638

```html
15626:   citas.filter(c => {
15627:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15628:     return fd >= hace60 && fd <= refDate;
15629:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15630:   const pacs60     = Object.keys(cuentaPac).length;
15631:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15632:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15633: 
15634:   // Selector de mes
15635:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15636:   let opcionesSelect = '';
15637:   for (let i = 0; i < 13; i++) {
15638:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15639:     const om = d.getMonth() + 1, oy = d.getFullYear();
15640:     const sel = (om === m && oy === y) ? 'selected' : '';
15641:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15642:   }
15643: 
15644:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15645:   const subtitulo = esMesActual
15646:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15647:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15648: 
15649:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15650:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
```

### Coincidencia 120 — línea 15638

```html
15626:   citas.filter(c => {
15627:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15628:     return fd >= hace60 && fd <= refDate;
15629:   }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
15630:   const pacs60     = Object.keys(cuentaPac).length;
15631:   const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
15632:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15633: 
15634:   // Selector de mes
15635:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15636:   let opcionesSelect = '';
15637:   for (let i = 0; i < 13; i++) {
15638:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15639:     const om = d.getMonth() + 1, oy = d.getFullYear();
15640:     const sel = (om === m && oy === y) ? 'selected' : '';
15641:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15642:   }
15643: 
15644:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15645:   const subtitulo = esMesActual
15646:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15647:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15648: 
15649:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15650:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
```

### Coincidencia 121 — línea 15644

```html
15632:   const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;
15633: 
15634:   // Selector de mes
15635:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15636:   let opcionesSelect = '';
15637:   for (let i = 0; i < 13; i++) {
15638:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15639:     const om = d.getMonth() + 1, oy = d.getFullYear();
15640:     const sel = (om === m && oy === y) ? 'selected' : '';
15641:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15642:   }
15643: 
15644:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15645:   const subtitulo = esMesActual
15646:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15647:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15648: 
15649:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15650:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
15651:       <div>
15652:         <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
15653:         <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
15654:       </div>
15655:       <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
15656:         <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
```

### Coincidencia 122 — línea 15705

```html
15693:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15694:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
15695:     </div>`;
15696:   };
15697:   // Pacientes de 1 sola sesión que no han vuelto en +30 días
15698:   const _citasPorPac = {};
15699:   citasReales().forEach(c => {
15700:     if (!c.nombre) return;
15701:     const nom = c.nombre.trim().toLowerCase();
15702:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15703:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15704:   });
15705:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15706:   const hace90Str = hace90.toLocalDateStr();
15707:   const _listaUnaVez = Object.values(_citasPorPac)
15708:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15709:     .map(p => p.nombre).sort();
15710: 
15711:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15712:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15713:   // Cálculo: sesiones diarias necesarias para cumplir meta
15714:   if (esMesActual) {
15715:     const diasEnMes = new Date(y, m, 0).getDate();
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
```

### Coincidencia 123 — línea 15705

```html
15693:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15694:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
15695:     </div>`;
15696:   };
15697:   // Pacientes de 1 sola sesión que no han vuelto en +30 días
15698:   const _citasPorPac = {};
15699:   citasReales().forEach(c => {
15700:     if (!c.nombre) return;
15701:     const nom = c.nombre.trim().toLowerCase();
15702:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15703:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15704:   });
15705:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15706:   const hace90Str = hace90.toLocalDateStr();
15707:   const _listaUnaVez = Object.values(_citasPorPac)
15708:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15709:     .map(p => p.nombre).sort();
15710: 
15711:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15712:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15713:   // Cálculo: sesiones diarias necesarias para cumplir meta
15714:   if (esMesActual) {
15715:     const diasEnMes = new Date(y, m, 0).getDate();
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
```

### Coincidencia 124 — línea 15717

```html
15705:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15706:   const hace90Str = hace90.toLocalDateStr();
15707:   const _listaUnaVez = Object.values(_citasPorPac)
15708:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15709:     .map(p => p.nombre).sort();
15710: 
15711:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15712:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15713:   // Cálculo: sesiones diarias necesarias para cumplir meta
15714:   if (esMesActual) {
15715:     const diasEnMes = new Date(y, m, 0).getDate();
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15718:       const dow = new Date(y, m - 1, d).getDay();
15719:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15720:     }
15721:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15722:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15723:     const avgPrecio     = citasMesHechas.length > 0
15724:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15725:       : (getKPIConfig().precio_full || 80000);
15726:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15727:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15728:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15729:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
```

### Coincidencia 125 — línea 15828

```html
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
```

### Coincidencia 126 — línea 15829

```html
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
```

### Coincidencia 127 — línea 15830

```html
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 128 — línea 15833

```html
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
```

### Coincidencia 129 — línea 15833

```html
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
```

### Coincidencia 130 — línea 15834

```html
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15846:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
```

### Coincidencia 131 — línea 15834

```html
15822: }
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15846:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
```

### Coincidencia 132 — línea 15969

```html
15957: function getEncuestaStats() {
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
```

### Coincidencia 133 — línea 15970

```html
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
```

### Coincidencia 134 — línea 15970

```html
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
```

### Coincidencia 135 — línea 15981

```html
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
```

### Coincidencia 136 — línea 16080

```html
16068:     const lbl = cb ? cb.closest('.gk-check-item') : null;
16069:     if (!cb || !lbl) return;
16070:     cb.checked = false;
16071:     lbl.classList.remove('done');
16072:   });
16073:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16074:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16075: }
16076: 
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
16086:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16087:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16088:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16089:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16090:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16091:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16092:     </div>
```

### Coincidencia 137 — línea 16081

```html
16069:     if (!cb || !lbl) return;
16070:     cb.checked = false;
16071:     lbl.classList.remove('done');
16072:   });
16073:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16074:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16075: }
16076: 
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
16086:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16087:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16088:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16089:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16090:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16091:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16092:     </div>
16093:     ${bd.sinTel ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #ef4444">
```

### Coincidencia 138 — línea 16082

```html
16070:     cb.checked = false;
16071:     lbl.classList.remove('done');
16072:   });
16073:   const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
16074:   toast('Checklist ' + nombre + ' reiniciado', 'ok');
16075: }
16076: 
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
16086:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16087:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
16088:     <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
16089:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
16090:       <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
16091:       <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
16092:     </div>
16093:     ${bd.sinTel ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #ef4444">
16094:       <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">SIN TELÉFONO</div>
```

### Coincidencia 139 — línea 16502

```html
16490:   if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2500); }
16491:   toast('Valores actualizados ✓', 'ok');
16492: }
16493: 
16494: // ══════════════════════════════════════════════════════════════
16495: // ── ESTRUCTURA FINANCIERA ──
16496: // ══════════════════════════════════════════════════════════════
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
16514:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
```

### Coincidencia 140 — línea 16504

```html
16492: }
16493: 
16494: // ══════════════════════════════════════════════════════════════
16495: // ── ESTRUCTURA FINANCIERA ──
16496: // ══════════════════════════════════════════════════════════════
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
16514:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16515:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16516:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
```

### Coincidencia 141 — línea 16504

```html
16492: }
16493: 
16494: // ══════════════════════════════════════════════════════════════
16495: // ── ESTRUCTURA FINANCIERA ──
16496: // ══════════════════════════════════════════════════════════════
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
16514:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16515:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16516:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
```

### Coincidencia 142 — línea 16508

```html
16496: // ══════════════════════════════════════════════════════════════
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
16514:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16515:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16516:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
16517:   const colorMeta = ingMes >= COSTO_META ? 'var(--ok)' : '#f59e0b';
16518: 
16519:   function barRow(label, pct, color) {
16520:     return `<div style="margin-bottom:6px">
```

### Coincidencia 143 — línea 16508

```html
16496: // ══════════════════════════════════════════════════════════════
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
16514:   const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
16515:   const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
16516:   const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
16517:   const colorMeta = ingMes >= COSTO_META ? 'var(--ok)' : '#f59e0b';
16518: 
16519:   function barRow(label, pct, color) {
16520:     return `<div style="margin-bottom:6px">
```

### Coincidencia 144 — línea 17061

```html
17049: 
17050:   // Inicializar selector de fecha para ingresos por día/semana
17051:   const fechaInp = document.getElementById('ingresosFechaInput');
17052:   if (fechaInp && !fechaInp.value) {
17053:     fechaInp.value = today();
17054:     setModoIngresos('semana');
17055:   }
17056:   renderCitasResumen();
17057: 
17058:   // Inicializar filtro de convenios con el mes actual
17059:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17060:   if (convMesFiltro && !convMesFiltro.value) {
17061:     const nm = now.getMonth()+1;
17062:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17063:   }
17064:   renderConveniosReport();
17065:   _checkAutoAtendida();
17066:   _checkCobrosPendientes();
17067: }
17068: 
17069: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17070: function _checkAutoAtendida() {
17071:   const nowMs = Date.now();
17072:   const pendientes = (allData.citas || []).filter(c => {
17073:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
```

### Coincidencia 145 — línea 17071

```html
17059:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17060:   if (convMesFiltro && !convMesFiltro.value) {
17061:     const nm = now.getMonth()+1;
17062:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17063:   }
17064:   renderConveniosReport();
17065:   _checkAutoAtendida();
17066:   _checkCobrosPendientes();
17067: }
17068: 
17069: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17070: function _checkAutoAtendida() {
17071:   const nowMs = Date.now();
17072:   const pendientes = (allData.citas || []).filter(c => {
17073:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17074:     if (esRegistroServ(c.servicio)) return false;
17075:     const f = normDate(c.fecha);
17076:     if (!f || !c.hora) return false;
17077:     const [hh, mm] = c.hora.split(':').map(Number);
17078:     const citaEnd = new Date(f + 'T' + c.hora);
17079:     citaEnd.setMinutes(citaEnd.getMinutes() + 60);
17080:     return citaEnd.getTime() < nowMs;
17081:   });
17082:   window._autoAtendidaList = pendientes;
17083:   const banner = document.getElementById('bannerAutoAtendida');
```

### Coincidencia 146 — línea 17151

```html
17139:       selector.value = citaId || '';
17140:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17141:       selector.focus();
17142:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17143:     } else {
17144:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17145:     }
17146:   }, 100);
17147: }
17148: 
17149: // ── Alerta semana floja ──
17150: function _checkAlertaSemanFloja(citas) {
17151:   const now = new Date();
17152:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17153:   const hoyStr = today();
17154: 
17155:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17156:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17157:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17158:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17159: 
17160:   const apagar = () => {
17161:     if (dashEl) dashEl.style.display = 'none';
17162:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17163:   };
```

### Coincidencia 147 — línea 17152

```html
17140:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17141:       selector.focus();
17142:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17143:     } else {
17144:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17145:     }
17146:   }, 100);
17147: }
17148: 
17149: // ── Alerta semana floja ──
17150: function _checkAlertaSemanFloja(citas) {
17151:   const now = new Date();
17152:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17153:   const hoyStr = today();
17154: 
17155:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17156:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17157:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17158:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17159: 
17160:   const apagar = () => {
17161:     if (dashEl) dashEl.style.display = 'none';
17162:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17163:   };
17164: 
```

### Coincidencia 148 — línea 17168

```html
17156:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17157:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17158:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17159: 
17160:   const apagar = () => {
17161:     if (dashEl) dashEl.style.display = 'none';
17162:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17163:   };
17164: 
17165:   if (dow < 3 || dow > 5) { apagar(); return; }
17166: 
17167:   // Calcular ingresos semana actual (lunes a hoy)
17168:   const lunes = new Date(now);
17169:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17170:   lunes.setHours(0,0,0,0);
17171: 
17172:   let totalSemActual = 0, nSemActual = 0;
17173:   citas.forEach(c => {
17174:     const f = normDate(c.fecha);
17175:     if (!f) return;
17176:     const fd = new Date(f + 'T12:00:00');
17177:     if (fd >= lunes && f <= hoyStr) {
17178:       totalSemActual += parsePrecio(c.precio);
17179:       nSemActual++;
17180:     }
```

### Coincidencia 149 — línea 17169

```html
17157:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17158:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17159: 
17160:   const apagar = () => {
17161:     if (dashEl) dashEl.style.display = 'none';
17162:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17163:   };
17164: 
17165:   if (dow < 3 || dow > 5) { apagar(); return; }
17166: 
17167:   // Calcular ingresos semana actual (lunes a hoy)
17168:   const lunes = new Date(now);
17169:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17170:   lunes.setHours(0,0,0,0);
17171: 
17172:   let totalSemActual = 0, nSemActual = 0;
17173:   citas.forEach(c => {
17174:     const f = normDate(c.fecha);
17175:     if (!f) return;
17176:     const fd = new Date(f + 'T12:00:00');
17177:     if (fd >= lunes && f <= hoyStr) {
17178:       totalSemActual += parsePrecio(c.precio);
17179:       nSemActual++;
17180:     }
17181:   });
```

### Coincidencia 150 — línea 18536

```html
18524: 
18525: function resRow(label, val, style='') {
18526:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18527:     <span style="color:var(--muted)">${label}</span>
18528:     <span style="${style}">${val}</span>
18529:   </div>`;
18530: }
18531: 
18532: // ══════════════════════════════════════════════════════════════
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
18542:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18543:   }
18544: 
18545:   // Agregar eventos externos como filas adicionales
18546:   let evts = (allData.eventos || []);
18547:   if (modo === 'mes') {
18548:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
```

### Coincidencia 151 — línea 18537

```html
18525: function resRow(label, val, style='') {
18526:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18527:     <span style="color:var(--muted)">${label}</span>
18528:     <span style="${style}">${val}</span>
18529:   </div>`;
18530: }
18531: 
18532: // ══════════════════════════════════════════════════════════════
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
18542:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18543:   }
18544: 
18545:   // Agregar eventos externos como filas adicionales
18546:   let evts = (allData.eventos || []);
18547:   if (modo === 'mes') {
18548:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
18549:   }
```

### Coincidencia 152 — línea 18538

```html
18526:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18527:     <span style="color:var(--muted)">${label}</span>
18528:     <span style="${style}">${val}</span>
18529:   </div>`;
18530: }
18531: 
18532: // ══════════════════════════════════════════════════════════════
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
18542:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18543:   }
18544: 
18545:   // Agregar eventos externos como filas adicionales
18546:   let evts = (allData.eventos || []);
18547:   if (modo === 'mes') {
18548:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
18549:   }
18550:   const filasEventos = evts.map(e => ({
```

### Coincidencia 153 — línea 18580

```html
18568:     ])
18569:   ].sort((a,b) => a[0].localeCompare(b[0]));
18570: 
18571:   const csvContent = [header, ...rows]
18572:     .map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))
18573:     .join('\n');
18574: 
18575:   const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
18576:   const url  = URL.createObjectURL(blob);
18577:   const a    = document.createElement('a');
18578:   const nombre = modo === 'mes'
18579:     ? `ingresos_${y}-${pad(m)}.csv`
18580:     : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
18581:   a.href = url; a.download = nombre; a.click();
18582:   URL.revokeObjectURL(url);
18583:   toast('CSV descargado: ' + nombre);
18584: }
18585: 
18586: // ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
18587: const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
18588: let _pasTelefono = '';
18589: let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
18590: let _pasCurrent = null;
18591: 
18592: function _pasGetDB() {
```

### Coincidencia 154 — línea 18998

```html
18986:   set('cfg_serv_mant',            cfg.serv_mant.join(', '));
18987:   set('cfg_serv_descarga',        cfg.serv_descarga);
18988:   set('cfg_bono_contenido',       cfg.bono_contenido);
18989:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18990:   set('cfg_contenido_persona',    cfg.contenido_persona);
18991:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
18992:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
18993: }
18994: 
18995: function _initComisMesSel() {
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19004:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19005:     sel.appendChild(opt);
19006:   }
19007: }
19008: 
19009: function _comisMesVal() {
19010:   const sel = document.getElementById('comisMes');
```

### Coincidencia 155 — línea 19001

```html
18989:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18990:   set('cfg_contenido_persona',    cfg.contenido_persona);
18991:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
18992:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
18993: }
18994: 
18995: function _initComisMesSel() {
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19004:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19005:     sel.appendChild(opt);
19006:   }
19007: }
19008: 
19009: function _comisMesVal() {
19010:   const sel = document.getElementById('comisMes');
19011:   return sel ? sel.value : '';
19012: }
19013: 
```

### Coincidencia 156 — línea 19001

```html
18989:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18990:   set('cfg_contenido_persona',    cfg.contenido_persona);
18991:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
18992:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
18993: }
18994: 
18995: function _initComisMesSel() {
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19004:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19005:     sel.appendChild(opt);
19006:   }
19007: }
19008: 
19009: function _comisMesVal() {
19010:   const sel = document.getElementById('comisMes');
19011:   return sel ? sel.value : '';
19012: }
19013: 
```

### Coincidencia 157 — línea 19122

```html
19110:   const list = _comisManualReact(y, m);
19111:   if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
19112:   renderComisiones();
19113: }
19114: 
19115: function removeManualReactivacion(nombre) {
19116:   const [y, m] = _comisMesVal().split('-').map(Number);
19117:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19118:   renderComisiones();
19119: }
19120: 
19121: function marcarComisionPagada(persona) {
19122:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19123:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19124:   renderComisiones();
19125: }
19126: function desmarcarComisionPagada(persona) {
19127:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19128:   renderComisiones();
19129: }
19130: 
19131: function renderComisiones() {
19132:   _initComisMesSel();
19133:   const mes = _comisMesVal();
19134:   if (!mes) return;
```

### Coincidencia 158 — línea 19123

```html
19111:   if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
19112:   renderComisiones();
19113: }
19114: 
19115: function removeManualReactivacion(nombre) {
19116:   const [y, m] = _comisMesVal().split('-').map(Number);
19117:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19118:   renderComisiones();
19119: }
19120: 
19121: function marcarComisionPagada(persona) {
19122:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19123:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19124:   renderComisiones();
19125: }
19126: function desmarcarComisionPagada(persona) {
19127:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19128:   renderComisiones();
19129: }
19130: 
19131: function renderComisiones() {
19132:   _initComisMesSel();
19133:   const mes = _comisMesVal();
19134:   if (!mes) return;
19135:   const [year, month] = mes.split('-').map(Number);
```

### Coincidencia 159 — línea 19571

```html
19559: 
19560: function guardarMensaje() {
19561:   const titulo = document.getElementById('msgTitulo').value.trim();
19562:   const cat    = document.getElementById('msgCat').value;
19563:   const texto  = document.getElementById('msgTexto').value.trim();
19564:   if (!titulo || !texto) { toast('Completa el título y el mensaje', 'err'); return; }
19565:   const msgs  = _getMensajesPre();
19566:   const editId = document.getElementById('msgEditId').value;
19567:   if (editId) {
19568:     const idx = msgs.findIndex(m => m.id === editId);
19569:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19570:   } else {
19571:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19572:   }
19573:   _setMensajesPre(msgs);
19574:   closeModal('modalMensaje');
19575:   renderMensajes();
19576:   toast('Mensaje guardado ✓', 'ok');
19577: }
19578: 
19579: function eliminarMensaje(id) {
19580:   if (!confirm('¿Eliminar este mensaje?')) return;
19581:   _setMensajesPre(_getMensajesPre().filter(m => m.id !== id));
19582:   renderMensajes();
19583:   toast('Mensaje eliminado', 'ok');
```

### Coincidencia 160 — línea 19571

```html
19559: 
19560: function guardarMensaje() {
19561:   const titulo = document.getElementById('msgTitulo').value.trim();
19562:   const cat    = document.getElementById('msgCat').value;
19563:   const texto  = document.getElementById('msgTexto').value.trim();
19564:   if (!titulo || !texto) { toast('Completa el título y el mensaje', 'err'); return; }
19565:   const msgs  = _getMensajesPre();
19566:   const editId = document.getElementById('msgEditId').value;
19567:   if (editId) {
19568:     const idx = msgs.findIndex(m => m.id === editId);
19569:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19570:   } else {
19571:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19572:   }
19573:   _setMensajesPre(msgs);
19574:   closeModal('modalMensaje');
19575:   renderMensajes();
19576:   toast('Mensaje guardado ✓', 'ok');
19577: }
19578: 
19579: function eliminarMensaje(id) {
19580:   if (!confirm('¿Eliminar este mensaje?')) return;
19581:   _setMensajesPre(_getMensajesPre().filter(m => m.id !== id));
19582:   renderMensajes();
19583:   toast('Mensaje eliminado', 'ok');
```

### Coincidencia 161 — línea 19700

```html
19688: function _loadRec() {
19689:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19690: }
19691: function _saveRec(arr) {
19692:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19693: }
19694: 
19695: function _fmtCLP(n) {
19696:   return '$' + Math.round(n).toLocaleString('es-CO');
19697: }
19698: 
19699: function _recMesActual() {
19700:   const now = new Date();
19701:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19702: }
19703: 
19704: function _initRecMesSel() {
19705:   const sel = document.getElementById('recMesFiltro');
19706:   if (!sel) return;
19707:   const all = _loadRec();
19708:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19709:   const actual = _recMesActual();
19710:   if (!meses.includes(actual)) meses.unshift(actual);
19711:   const cur = sel.value || actual;
19712:   sel.innerHTML = meses.map(m => {
```

### Coincidencia 162 — línea 19701

```html
19689:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19690: }
19691: function _saveRec(arr) {
19692:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19693: }
19694: 
19695: function _fmtCLP(n) {
19696:   return '$' + Math.round(n).toLocaleString('es-CO');
19697: }
19698: 
19699: function _recMesActual() {
19700:   const now = new Date();
19701:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19702: }
19703: 
19704: function _initRecMesSel() {
19705:   const sel = document.getElementById('recMesFiltro');
19706:   if (!sel) return;
19707:   const all = _loadRec();
19708:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19709:   const actual = _recMesActual();
19710:   if (!meses.includes(actual)) meses.unshift(actual);
19711:   const cur = sel.value || actual;
19712:   sel.innerHTML = meses.map(m => {
19713:     const [y,mo] = m.split('-');
```

### Coincidencia 163 — línea 19701

```html
19689:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19690: }
19691: function _saveRec(arr) {
19692:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19693: }
19694: 
19695: function _fmtCLP(n) {
19696:   return '$' + Math.round(n).toLocaleString('es-CO');
19697: }
19698: 
19699: function _recMesActual() {
19700:   const now = new Date();
19701:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19702: }
19703: 
19704: function _initRecMesSel() {
19705:   const sel = document.getElementById('recMesFiltro');
19706:   if (!sel) return;
19707:   const all = _loadRec();
19708:   const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
19709:   const actual = _recMesActual();
19710:   if (!meses.includes(actual)) meses.unshift(actual);
19711:   const cur = sel.value || actual;
19712:   sel.innerHTML = meses.map(m => {
19713:     const [y,mo] = m.split('-');
```

### Coincidencia 164 — línea 19810

```html
19798:   const fecha    = document.getElementById('recInpFecha')?.value;
19799:   const servicio = document.getElementById('recInpServicio')?.value;
19800:   const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
19801:   const nota     = document.getElementById('recInpNota')?.value.trim() || '';
19802: 
19803:   if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
19804:   if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
19805:   if (!servicio) { alert('Selecciona el servicio'); return; }
19806:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19807: 
19808:   const comision = Math.round(venta * REC_PCT);
19809:   const rec = {
19810:     id: Date.now().toString(),
19811:     fecha,
19812:     paciente,
19813:     servicio,
19814:     venta,
19815:     comision,
19816:     nota,
19817:     pagado: false,
19818:     pagadoFecha: null
19819:   };
19820: 
19821:   const all = _loadRec();
19822:   all.push(rec);
```

### Coincidencia 165 — línea 20090

```html
20078:   kvSet(_refKey(mesStr, anio, nombre), estado);
20079: }
20080: 
20081: function marcarRefEstado(mesStr, anio, nombre, estado) {
20082:   _refSetEstado(mesStr, anio, nombre, estado);
20083:   cargarCampañaReferidos();
20084: }
20085: 
20086: function cargarCampañaReferidos() {
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
20097:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20098:     const [y, m] = c.fecha.split('-');
20099:     return +y === anio && +m === (mes + 1);
20100:   });
20101: 
20102:   const vistos = {};
```

### Coincidencia 166 — línea 20091

```html
20079: }
20080: 
20081: function marcarRefEstado(mesStr, anio, nombre, estado) {
20082:   _refSetEstado(mesStr, anio, nombre, estado);
20083:   cargarCampañaReferidos();
20084: }
20085: 
20086: function cargarCampañaReferidos() {
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
20097:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20098:     const [y, m] = c.fecha.split('-');
20099:     return +y === anio && +m === (mes + 1);
20100:   });
20101: 
20102:   const vistos = {};
20103:   const pacientes = [];
```

### Coincidencia 167 — línea 20092

```html
20080: 
20081: function marcarRefEstado(mesStr, anio, nombre, estado) {
20082:   _refSetEstado(mesStr, anio, nombre, estado);
20083:   cargarCampañaReferidos();
20084: }
20085: 
20086: function cargarCampañaReferidos() {
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
20097:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20098:     const [y, m] = c.fecha.split('-');
20099:     return +y === anio && +m === (mes + 1);
20100:   });
20101: 
20102:   const vistos = {};
20103:   const pacientes = [];
20104:   citas.forEach(c => {
```

## Llamadas a showView('citas')

### Coincidencia 1 — línea 4576

```html
4564:               <span class="em-card-title">Mix Full &gt;40%</span>
4565:               <span class="em-sev u">🟠 Urgente</span>
4566:               <span class="em-card-time">⏱ 20 min</span>
4567:               <span class="em-carr">▼</span>
4568:             </div>
4569:             <div class="em-card-body" id="emBody_mixfull">
4570:               <div class="em-symptom">💡 <strong>Pérdida silenciosa de margen.</strong> Full rinde ~$73k/h vs ~$90k/h de Express. Cada 10% de exceso en Full equivale a dejar entre $70k y $100k/semana sobre la mesa. El problema suele estar en cómo la auxiliar presenta las opciones al paciente — no en el paciente mismo.</div>
4571:               <div class="em-prog-meta" id="emPM_mixfull">0 de 5 pasos completados</div>
4572:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_mixfull" style="width:0%"></div></div>
4573:               <div class="em-steps">
4574:                 <label class="em-step" id="emS_mixfull_0" onclick="handleEmStep(event,'mixfull',0)"><input type="checkbox" id="emCk_mixfull_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Ver el breakdown actual:</strong> ¿qué porcentaje exacto son Full esta semana? ¿Es un problema puntual o viene subiendo varios meses?</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 2 →</button></label>
4575:                 <label class="em-step" id="emS_mixfull_1" onclick="handleEmStep(event,'mixfull',1)"><input type="checkbox" id="emCk_mixfull_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reunión con auxiliar — cambiar el guión de agendamiento:</strong> la regla es ofrecer Express por defecto. Guión exacto: <em>"La Descarga Express cubre cuello, espalda o piernas en 50 min — ¿cuál zona necesitas trabajar?"</em>. Full solo si el paciente lo pide explícitamente o hay justificación clínica de Jessica.</span></label>
4576:                 <label class="em-step" id="emS_mixfull_2" onclick="handleEmStep(event,'mixfull',2)"><input type="checkbox" id="emCk_mixfull_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Revisar citas Full activas:</strong> ¿hay pacientes en plan Full que podrían migrar a Express + Readaptación sin afectar su evolución clínica? Coordinar con Jessica antes de cambiar.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ver citas →</button></label>
4577:                 <label class="em-step" id="emS_mixfull_3" onclick="handleEmStep(event,'mixfull',3)"><input type="checkbox" id="emCk_mixfull_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Empujar Readaptación en contenido:</strong> publicar esta semana un reel o historia explicando qué es la Readaptación Funcional y para quién es — es el servicio más ignorado y el de mejor margen por hora para sesiones largas.</span></label>
4578:                 <label class="em-step" id="emS_mixfull_4" onclick="handleEmStep(event,'mixfull',4)"><input type="checkbox" id="emCk_mixfull_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Seguimiento la próxima semana:</strong> revisar si el mix bajó. Si en 2 semanas sigue >35%, el problema es estructural — revisar si los paquetes activos tienen demasiado peso en Full.</span></label>
4579:               </div>
4580:               <div class="em-card-footer">
4581:                 <button class="em-done-btn" id="emDB_mixfull" onclick="markEmDone('mixfull',5)">✓ Plan ejecutado</button>
4582:                 <button class="em-reset-btn" onclick="resetEmSteps('mixfull',5)">↺ Reiniciar</button>
4583:               </div>
4584:             </div>
4585:           </div>
4586: 
4587:           <!-- KPI: Cancelaciones -->
4588:           <div class="em-card" id="emCard_cancel">
```

### Coincidencia 2 — línea 4606

```html
4594:               <span class="em-carr">▼</span>
4595:             </div>
4596:             <div class="em-card-body" id="emBody_cancel">
4597:               <div class="em-symptom">💡 <strong>Patrón de cancelación.</strong> Cada cancelación es ingreso y tiempo perdido. Más del 20% indica un problema sistemático, no casos aislados. Los 3 culpables más comunes: (1) no hay recordatorio 24h antes, (2) un día o servicio específico concentra todo, (3) pacientes nuevos que nunca tuvieron intención real de asistir.</div>
4598:               <div class="em-prog-meta" id="emPM_cancel">0 de 6 pasos completados</div>
4599:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_cancel" style="width:0%"></div></div>
4600:               <div class="em-steps">
4601:                 <label class="em-step" id="emS_cancel_0" onclick="handleEmStep(event,'cancel',0)"><input type="checkbox" id="emCk_cancel_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Abrir KPI 4B y hacer el diagnóstico completo:</strong> ¿qué servicio cancela más? ¿Qué día de la semana? ¿Son pacientes nuevos o recurrentes? La respuesta a estas 3 preguntas determina todo lo siguiente.</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 4B →</button></label>
4602:                 <label class="em-step" id="emS_cancel_1" onclick="handleEmStep(event,'cancel',1)"><input type="checkbox" id="emCk_cancel_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reforzar el recordatorio 24h antes:</strong> si no se está enviando confirmación por WhatsApp el día anterior, implementarlo desde hoy. Guión: <em>"Hola [nombre]! Te confirmo tu cita mañana 📋 [servicio] · [hora] · [modalidad]. Respóndeme: ✅ 1 — Sí confirmo · ❌ 2 — Necesito cancelar."</em></span></label>
4603:                 <label class="em-step" id="emS_cancel_2" onclick="handleEmStep(event,'cancel',2)"><input type="checkbox" id="emCk_cancel_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Si hay un día con muchas cancelaciones:</strong> agregar un segundo recordatorio 2 horas antes de la cita ese día específico. Los lunes y viernes suelen concentrar más cancelaciones por reuniones de trabajo o planes del fin de semana.</span></label>
4604:                 <label class="em-step" id="emS_cancel_3" onclick="handleEmStep(event,'cancel',3)"><input type="checkbox" id="emCk_cancel_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Si hay un servicio con muchas cancelaciones:</strong> revisar si el precio, la duración o la expectativa del paciente no están alineados. Por ejemplo, si Full cancela mucho, puede ser que 90 min sea demasiado tiempo para agendar con anticipación.</span></label>
4605:                 <label class="em-step" id="emS_cancel_4" onclick="handleEmStep(event,'cancel',4)"><input type="checkbox" id="emCk_cancel_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer reagendamiento inmediato:</strong> cuando un paciente cancela, el mensaje de respuesta debe siempre terminar con una fecha alternativa. Nunca dejar el chat abierto sin proponer otra opción: <em>"¡Sin problema! ¿Te queda bien el [día X] a las [hora Y]?"</em></span></label>
4606:                 <label class="em-step" id="emS_cancel_5" onclick="handleEmStep(event,'cancel',5)"><input type="checkbox" id="emCk_cancel_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Registrar el motivo de cada cancelación:</strong> en el campo "Nota Admin" de la cita — sin este dato el patrón es invisible. En 2 semanas los datos mostrarán si es un problema de horario, precio, salud o simplemente leads mal calificados.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ir a citas →</button></label>
4607:               </div>
4608:               <div class="em-card-footer">
4609:                 <button class="em-done-btn" id="emDB_cancel" onclick="markEmDone('cancel',6)">✓ Plan ejecutado</button>
4610:                 <button class="em-reset-btn" onclick="resetEmSteps('cancel',6)">↺ Reiniciar</button>
4611:               </div>
4612:             </div>
4613:           </div>
4614: 
4615:         </div>
4616:       </div>
4617: 
4618:       <!-- ══ DIMENSIÓN 2: Comercial ══ -->
```

## Contenedores de vista relacionados con citas y agenda

No se encontraron coincidencias.

## Biblioteca QR y creación de códigos

### Coincidencia 1 — línea 1561

```html
1549:   .auto-grid{grid-template-columns:1fr}
1550:   .auto-panels{grid-template-columns:1fr!important}
1551: }
1552: @media(max-width:420px){
1553:   .stats-grid,.stats-grid[style]{grid-template-columns:1fr!important}
1554:   .mob-nav-btn{padding:5px 4px;min-width:44px;font-size:.58rem}
1555: }
1556: @media(prefers-reduced-motion:reduce){
1557:   *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;
1558:     animation-iteration-count:1!important;transition-duration:.01ms!important}
1559: }
1560: </style>
1561: <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
1562: </head>
1563: <body>
1564: 
1565: <!-- ── TOAST ── -->
1566: <div id="toast"></div>
1567: 
1568: <!-- ── MODAL COPIAR MENSAJE WA (desktop) ── -->
1569: <div id="waCopyModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this)cerrarWaCopyModal()">
1570:   <div style="background:var(--s1,#fff);border-radius:16px;max-width:480px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.22);overflow:hidden">
1571:     <div style="background:#25D366;padding:14px 18px;display:flex;align-items:center;gap:10px">
1572:       <span style="font-size:1.3rem">💬</span>
1573:       <span style="color:#fff;font-weight:700;font-size:1rem">Enviar por WhatsApp</span>
```

### Coincidencia 2 — línea 1561

```html
1549:   .auto-grid{grid-template-columns:1fr}
1550:   .auto-panels{grid-template-columns:1fr!important}
1551: }
1552: @media(max-width:420px){
1553:   .stats-grid,.stats-grid[style]{grid-template-columns:1fr!important}
1554:   .mob-nav-btn{padding:5px 4px;min-width:44px;font-size:.58rem}
1555: }
1556: @media(prefers-reduced-motion:reduce){
1557:   *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;
1558:     animation-iteration-count:1!important;transition-duration:.01ms!important}
1559: }
1560: </style>
1561: <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
1562: </head>
1563: <body>
1564: 
1565: <!-- ── TOAST ── -->
1566: <div id="toast"></div>
1567: 
1568: <!-- ── MODAL COPIAR MENSAJE WA (desktop) ── -->
1569: <div id="waCopyModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this)cerrarWaCopyModal()">
1570:   <div style="background:var(--s1,#fff);border-radius:16px;max-width:480px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.22);overflow:hidden">
1571:     <div style="background:#25D366;padding:14px 18px;display:flex;align-items:center;gap:10px">
1572:       <span style="font-size:1.3rem">💬</span>
1573:       <span style="color:#fff;font-weight:700;font-size:1rem">Enviar por WhatsApp</span>
```

### Coincidencia 3 — línea 18709

```html
18697: function renderPasaporteQR(link) {
18698:   const canvas = document.getElementById('pasQR');
18699:   if (!canvas) return;
18700:   let box = document.getElementById('pasQRBox');
18701:   if (!box) {
18702:     box = document.createElement('div');
18703:     box.id = 'pasQRBox';
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
```

### Coincidencia 4 — línea 18710

```html
18698:   const canvas = document.getElementById('pasQR');
18699:   if (!canvas) return;
18700:   let box = document.getElementById('pasQRBox');
18701:   if (!box) {
18702:     box = document.createElement('div');
18703:     box.id = 'pasQRBox';
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
18722:   }
```

### Coincidencia 5 — línea 18713

```html
18701:   if (!box) {
18702:     box = document.createElement('div');
18703:     box.id = 'pasQRBox';
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
18722:   }
18723: }
18724: 
18725: function abrirPasaporte() {
```

### Coincidencia 6 — línea 18716

```html
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
18722:   }
18723: }
18724: 
18725: function abrirPasaporte() {
18726:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18727:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18728:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

### Coincidencia 7 — línea 18716

```html
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
18722:   }
18723: }
18724: 
18725: function abrirPasaporte() {
18726:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18727:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18728:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

## Función openPago

### Coincidencia 1 — línea 17133

```html
17121:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17122:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17123:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17124:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17125:       <div style="display:flex;gap:6px">
17126:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17127:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17128:       </div>
17129:     </div>`;
17130:   }).join('');
17131: }
17132: 
17133: function openPago(citaId) {
17134:   showView('pagos');
17135:   setTimeout(() => {
17136:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17137:     const selector = document.getElementById('payCitaId');
17138:     if (selector) {
17139:       selector.value = citaId || '';
17140:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17141:       selector.focus();
17142:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17143:     } else {
17144:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17145:     }
```

## Función fillPaymentSelectors

### Coincidencia 1 — línea 6840

```html
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
```
