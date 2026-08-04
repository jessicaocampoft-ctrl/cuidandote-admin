# Contexto exacto para fase 2

## Login profesional

```html
7045:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7046:   ]));
7047:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7048: }
7049: 
7050: function openProfessionalLoginMode() {
7051:   location.hash = '/profesionales/login';
7052:   showOnlyScreen('proLoginScreen');
7053:   document.getElementById('proLoginErr').style.display = 'none';
7054: }
7055: 
7056: function backToAdminLogin() {
7057:   location.hash = '';
7058:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7059: }
7060: 
7061: async function doProfessionalLogin() {
7062:   const btn = document.getElementById('proLoginBtn');
7063:   const err = document.getElementById('proLoginErr');
7064:   err.style.display = 'none';
7065:   btn.disabled = true; btn.textContent = 'Verificando...';
7066:   try {
7067:     const d = await fetch(APPS_SCRIPT_URL, {
7068:       method:'POST',
7069:       body:JSON.stringify({
7070:         action:'professionalLogin',
7071:         user:document.getElementById('proUser').value.trim(),
7072:         password:document.getElementById('proPass').value
7073:       })
7074:     }).then(r => r.json());
7075:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7076:     PROFESSIONAL_TOKEN = d.professionalToken;
7077:     professionalSession = d.professional;
7078:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7079:     if (professionalSession.debeCambiarPassword) {
7080:       document.getElementById('proFirstChangeBox').style.display = 'block';
7081:       toast('Cambia la contraseña temporal para continuar');
7082:     } else {
7083:       await showProfessionalApp();
7084:     }
7085:   } catch(e) {
7086:     err.textContent = e.message || 'Error de acceso';
7087:     err.style.display = 'block';
7088:   } finally {
7089:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7090:   }
7091: }
7092: 
7093: async function changeProfessionalPassword() {
7094:   const currentPassword = document.getElementById('proPass').value;
7095:   const newPassword = document.getElementById('proNewPass').value;
7096:   const d = await fetch(APPS_SCRIPT_URL, {
7097:     method:'POST',
7098:     body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
7099:   }).then(r => r.json());
7100:   if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
7101:   toast('Contraseña actualizada');
7102:   document.getElementById('proFirstChangeBox').style.display = 'none';
7103:   await showProfessionalApp();
7104: }
7105: 
7106: async function showProfessionalApp() {
7107:   location.hash = '/profesionales/agenda';
7108:   showOnlyScreen('proApp');
7109:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7110:   document.getElementById('proDate').value = today();
7111:   await loadProfessionalAgenda();
7112: }
7113: 
7114: async function loadProfessionalAgenda() {
7115:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7116:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7117:   if (!d.ok) {
7118:     sessionStorage.removeItem('professionalToken');
7119:     PROFESSIONAL_TOKEN = '';
7120:     toast(d.error || 'Sesión vencida', 'err');
7121:     return openProfessionalLoginMode();
7122:   }
7123:   professionalSession = d.professional;
7124:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7125:   professionalAgenda = d.citas || [];
```

## Login administrativo

```html
7210:   openProfessionalLoginMode();
7211: }
7212: 
7213: let _submittingBooking = false;
7214: let _submittingPatient = false;
7215: let _loginTime = null;
7216: 
7217: // ── LOGIN ──
7218: let _loginAttempts = 0;
7219: let _loginLockedUntil = 0;
7220: 
7221: async function doLogin() {
7222:   const ahora = Date.now();
7223:   if (_loginLockedUntil > ahora) {
7224:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7225:     const errEl = document.getElementById('loginErr');
7226:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7227:     errEl.style.display = 'block';
7228:     return;
7229:   }
7230:   const pw  = document.getElementById('pwInput').value.trim();
7231:   const user = (document.getElementById('userInput')?.value || '').trim();
7232:   const btn = document.getElementById('loginBtn');
7233:   if (!pw) return;
7234:   btn.textContent = 'Verificando...'; btn.disabled = true;
7235:   try {
7236:     const r = await fetch(APPS_SCRIPT_URL, {
7237:       method: 'POST',
7238:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7239:     });
7240:     const d = await r.json();
7241:     if (d.ok) {
7242:       _loginAttempts = 0;
7243:       TOKEN = d.sessionToken;
7244:       sessionStorage.setItem('adminToken', d.sessionToken);
7245:       _loginTime = Date.now();
7246:       document.getElementById('loginScreen').style.display = 'none';
7247:       document.getElementById('adminApp').style.display   = 'block';
7248:       allData = d;
7249:       await loadAdminKV();
7250:       await loadTeamData();
7251:       reloadMetas();
7252:       _initSidebarState();
7253:       initDashboard();
7254:       await _runUrlRepairIfRequested();
7255:     } else {
7256:       _loginAttempts++;
7257:       const errEl = document.getElementById('loginErr');
7258:       if (_loginAttempts >= 5) {
7259:         _loginLockedUntil = Date.now() + 120000;
7260:         _loginAttempts = 0;
7261:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7262:       } else {
7263:         const restantes = 5 - _loginAttempts;
7264:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
7265:       }
7266:       errEl.style.display = 'block';
7267:     }
7268:   } catch(e) {
7269:     document.getElementById('loginErr').textContent = 'Error de conexión. Revisa tu internet.';
7270:     document.getElementById('loginErr').style.display = 'block';
7271:   }
7272:   btn.textContent = 'Ingresar'; btn.disabled = false;
7273: }
7274: 
7275: function logout() {
7276:   sessionStorage.removeItem('adminToken');
7277:   location.reload();
7278: }
7279: 
7280: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7281: let _lastActivity = Date.now();
7282: const _INACTIVITY_MS = 30 * 60 * 1000;
7283: 
7284: function _resetActivity() { _lastActivity = Date.now(); }
7285: ['click','keydown','scroll','touchstart'].forEach(ev =>
7286:   document.addEventListener(ev, _resetActivity, {passive: true})
7287: );
7288: setInterval(() => {
7289:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7290:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7291:     setTimeout(logout, 1500);
7292:   }
7293: }, 60_000);
7294: 
7295: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
```

## Generación y copia del texto de gestión

```html
13970:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13971:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13972:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13973:     'Revisar el servicio más vendido y crear una oferta complementaria.'
13974:   ];
13975: }
13976: 
13977: function _copyGestionTexto(kind) {
13978:   const d = _copyGestionData();
13979:   const diag = _copyGestionDiagnostico(d);
13980:   const acciones = _copyGestionAcciones(d);
13981:   const money = v => fmtPeso(v || 0);
13982:   const baseFin = [
13983:     `Periodo: ${d.periodo}`,
13984:     '',
13985:     'RESUMEN FINANCIERO',
13986:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
13987:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
13988:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
13989:     `* Gastos: ${money(d.egresosMes)}`,
13990:     `* Ganancia estimada: ${money(d.ganancia)}`,
13991:     `* Meta mensual: ${money(d.metaMensual)}`,
13992:     `* Cumplimiento: ${d.cumplimiento}%`,
13993:     `* Dinero faltante: ${money(d.faltante)}`
13994:   ];
13995:   let text = '';
13996:   if (kind === 'ejecutivo') {
13997:     text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
13998:   } else if (kind === 'indicadores') {
13999:     text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
14000:   } else if (kind === 'diagnostico') {
14001:     text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
14002:   } else if (kind === 'estrategias') {
14003:     text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
14004:   } else if (kind === 'plan') {
14005:     text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
14006:   } else if (kind === 'asesor') {
14007:     text = _copyGestionAsesorText(d);
14008:   } else {
14009:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14010:   }
14011:   return _copyPlainText(text);
14012: }
14013: 
14014: function _copyGestionAsesorText(d) {
14015:   const money = v => fmtPeso(v || 0);
14016:   return [
14017:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14018:     '',
14019:     `Periodo: ${d.periodo}`,
14020:     `Meta mensual: ${money(d.metaMensual)}`,
14021:     '',
14022:     'RESUMEN FINANCIERO',
14023:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14024:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14025:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
```

## Utilidad de copia

```html
14080:     '8. Actividades que se pueden delegar a los fisioterapeutas.',
14081:     '9. Riesgos.',
14082:     '10. Próximo paso inmediato.',
14083:     '',
14084:     'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
14085:   ].join('\n');
14086: }
14087: 
14088: async function _copyPlainText(text) {
14089:   const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
14090:   try {
14091:     if (navigator.clipboard && window.isSecureContext) {
14092:       await navigator.clipboard.writeText(clean);
14093:       _copyOk();
14094:       return true;
14095:     }
14096:   } catch(e) {}
14097:   _showCopyFallback(clean);
14098:   return false;
14099: }
14100: 
14101: function _copyOk() {
14102:   toast('Información copiada correctamente', 'ok');
14103:   const estados = document.querySelectorAll('.copyGestionStatus');
14104:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14105:   clearTimeout(window._copyGestionStatusTimer);
14106:   window._copyGestionStatusTimer = setTimeout(() => {
14107:     estados.forEach(el => { el.style.display = 'none'; });
14108:   }, 2200);
14109: }
14110: 
14111: function _showCopyFallback(text, title='Copiar manualmente') {
14112:   let modal = document.getElementById('copyFallbackModal');
14113:   if (!modal) {
14114:     modal = document.createElement('div');
14115:     modal.id = 'copyFallbackModal';
14116:     modal.className = 'modal-bg';
14117:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14118:     modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14119:       <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
14120:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
```