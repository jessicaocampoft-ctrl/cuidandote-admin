# Contexto exacto para fase 2

## Login profesional

```html
7045:   downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
7046: }
7047: 
7048: function exportOperationsAuditCSV() {
7049:   const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
7050:   (operationsData.auditoria || []).forEach(a => rows.push([
7051:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7052:   ]));
7053:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7054: }
7055: 
7056: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7057:   const controller = new AbortController();
7058:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7059:   try {
7060:     const response = await fetch(url, { ...options, signal: controller.signal });
7061:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7062:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7063:     try {
7064:       return JSON.parse(raw);
7065:     } catch (_) {
7066:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7067:     }
7068:   } catch (error) {
7069:     if (error && error.name === 'AbortError') {
7070:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7071:     }
7072:     throw error;
7073:   } finally {
7074:     clearTimeout(timeout);
7075:   }
7076: }
7077: 
7078: function openProfessionalLoginMode() {
7079:   location.hash = '/profesionales/login';
7080:   showOnlyScreen('proLoginScreen');
7081:   document.getElementById('proLoginErr').style.display = 'none';
7082: }
7083: 
7084: function backToAdminLogin() {
7085:   location.hash = '';
7086:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7087: }
7088: 
7089: async function doProfessionalLogin() {
7090:   const btn = document.getElementById('proLoginBtn');
7091:   const err = document.getElementById('proLoginErr');
7092:   err.style.display = 'none';
7093:   btn.disabled = true; btn.textContent = 'Verificando...';
7094:   try {
7095:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7096:       method:'POST',
7097:       body:JSON.stringify({
7098:         action:'professionalLogin',
7099:         user:document.getElementById('proUser').value.trim(),
7100:         password:document.getElementById('proPass').value
7101:       })
7102:     }, 45000);
7103:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7104:     PROFESSIONAL_TOKEN = d.professionalToken;
7105:     professionalSession = d.professional;
7106:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7107:     if (professionalSession.debeCambiarPassword) {
7108:       document.getElementById('proFirstChangeBox').style.display = 'block';
7109:       toast('Cambia la contraseña temporal para continuar');
7110:     } else {
7111:       await showProfessionalApp();
7112:     }
7113:   } catch(e) {
7114:     err.textContent = e.message || 'Error de acceso';
7115:     err.style.display = 'block';
7116:   } finally {
7117:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7118:   }
7119: }
7120: 
7121: async function changeProfessionalPassword() {
7122:   const currentPassword = document.getElementById('proPass').value;
7123:   const newPassword = document.getElementById('proNewPass').value;
7124:   const d = await fetch(APPS_SCRIPT_URL, {
7125:     method:'POST',
```

## Login administrativo

```html
7210: 
7211: function openProIssue(citaId) {
7212:   document.getElementById('proIssueCitaId').value = citaId;
7213:   document.getElementById('proIssueTipo').value = 'Paciente no responde';
7214:   document.getElementById('proIssueObs').value = '';
7215:   openModal('modalProIssue');
7216: }
7217: 
7218: async function sendProfessionalIssue() {
7219:   const d = await fetch(APPS_SCRIPT_URL, {
7220:     method:'POST',
7221:     body:JSON.stringify({
7222:       action:'professionalReportIssue',
7223:       token:PROFESSIONAL_TOKEN,
7224:       citaId:document.getElementById('proIssueCitaId').value,
7225:       tipo:document.getElementById('proIssueTipo').value,
7226:       observacion:document.getElementById('proIssueObs').value.trim()
7227:     })
7228:   }).then(r => r.json());
7229:   if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
7230:   else toast(d.error || 'No se pudo enviar', 'err');
7231: }
7232: 
7233: function professionalSignout() {
7234:   sessionStorage.removeItem('professionalToken');
7235:   PROFESSIONAL_TOKEN = '';
7236:   professionalSession = null;
7237:   professionalAgenda = [];
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
```

## Generación y copia del texto de gestión

```html
13970: function _copyGestionDiagnostico(d) {
13971:   const ok = [];
13972:   const att = [];
13973:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13974:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13975:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13976:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
13977:   if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
13978:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13979:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13980:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13981:   return {ok, att};
13982: }
13983: 
13984: function _copyGestionAcciones(d) {
13985:   return [
13986:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
13987:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13988:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13989:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13990:     'Revisar el servicio más vendido y crear una oferta complementaria.'
13991:   ];
13992: }
13993: 
13994: function _copyGestionTexto(kind) {
13995:   const d = _copyGestionData();
13996:   const diag = _copyGestionDiagnostico(d);
13997:   const acciones = _copyGestionAcciones(d);
13998:   const money = v => fmtPeso(v || 0);
13999:   const baseFin = [
14000:     `Periodo: ${d.periodo}`,
14001:     '',
14002:     'RESUMEN FINANCIERO',
14003:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14004:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14005:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14006:     `* Gastos: ${money(d.egresosMes)}`,
14007:     `* Ganancia estimada: ${money(d.ganancia)}`,
14008:     `* Meta mensual: ${money(d.metaMensual)}`,
14009:     `* Cumplimiento: ${d.cumplimiento}%`,
14010:     `* Dinero faltante: ${money(d.faltante)}`
14011:   ];
14012:   let text = '';
14013:   if (kind === 'ejecutivo') {
14014:     text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
14015:   } else if (kind === 'indicadores') {
14016:     text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
14017:   } else if (kind === 'diagnostico') {
14018:     text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
14019:   } else if (kind === 'estrategias') {
14020:     text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
14021:   } else if (kind === 'plan') {
14022:     text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
14023:   } else if (kind === 'asesor') {
14024:     text = _copyGestionAsesorText(d);
14025:   } else {
```

## Utilidad de copia

```html
14080:     `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
14081:     '* Servicios más rentables: revisar estructura de costos.',
14082:     '* Servicios con menor rentabilidad: revisar estructura de costos.',
14083:     '',
14084:     'ACCIONES DEL MES',
14085:     `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
14086:     `* Resultado: ${d.resultadosObtenidos}`,
14087:     '* Ingreso generado: calcular según campañas registradas.',
14088:     '',
14089:     'OBSERVACIONES',
14090:     d.observaciones,
14091:     '',
14092:     'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
14093:     '',
14094:     '1. Diagnóstico del mes.',
14095:     '2. Principales problemas.',
14096:     '3. Oportunidades de ingresos.',
14097:     '4. Cinco acciones prioritarias.',
14098:     '5. Personas o segmentos que debemos contactar.',
14099:     '6. Estrategias para llegar a la meta.',
14100:     '7. Actividades que debe realizar administración.',
14101:     '8. Actividades que se pueden delegar a los fisioterapeutas.',
14102:     '9. Riesgos.',
14103:     '10. Próximo paso inmediato.',
14104:     '',
14105:     'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
14106:   ].join('\n');
14107: }
14108: 
14109: async function _copyPlainText(text) {
14110:   const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
14111:   try {
14112:     if (navigator.clipboard && window.isSecureContext) {
14113:       await navigator.clipboard.writeText(clean);
14114:       _copyOk();
14115:       return true;
14116:     }
14117:   } catch(e) {}
14118:   _showCopyFallback(clean);
14119:   return false;
14120: }
```