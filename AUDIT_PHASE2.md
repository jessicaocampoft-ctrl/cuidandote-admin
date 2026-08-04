# Contexto exacto para fase 2

## Login profesional

```html
7045:   ]));
7046:   downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
7047: }
7048: 
7049: function exportOperationsAuditCSV() {
7050:   const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
7051:   (operationsData.auditoria || []).forEach(a => rows.push([
7052:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7053:   ]));
7054:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7055: }
7056: 
7057: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7058:   const controller = new AbortController();
7059:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7060:   try {
7061:     const response = await fetch(url, { ...options, signal: controller.signal });
7062:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7063:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7064:     try {
7065:       return JSON.parse(raw);
7066:     } catch (_) {
7067:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7068:     }
7069:   } catch (error) {
7070:     if (error && error.name === 'AbortError') {
7071:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7072:     }
7073:     throw error;
7074:   } finally {
7075:     clearTimeout(timeout);
7076:   }
7077: }
7078: 
7079: function openProfessionalLoginMode() {
7080:   location.hash = '/profesionales/login';
7081:   showOnlyScreen('proLoginScreen');
7082:   document.getElementById('proLoginErr').style.display = 'none';
7083: }
7084: 
7085: function backToAdminLogin() {
7086:   location.hash = '';
7087:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7088: }
7089: 
7090: async function doProfessionalLogin() {
7091:   const btn = document.getElementById('proLoginBtn');
7092:   const err = document.getElementById('proLoginErr');
7093:   err.style.display = 'none';
7094:   btn.disabled = true; btn.textContent = 'Verificando...';
7095:   try {
7096:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7097:       method:'POST',
7098:       body:JSON.stringify({
7099:         action:'professionalLogin',
7100:         user:document.getElementById('proUser').value.trim(),
7101:         password:document.getElementById('proPass').value
7102:       })
7103:     }, 45000);
7104:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7105:     PROFESSIONAL_TOKEN = d.professionalToken;
7106:     professionalSession = d.professional;
7107:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7108:     if (professionalSession.debeCambiarPassword) {
7109:       document.getElementById('proFirstChangeBox').style.display = 'block';
7110:       toast('Cambia la contraseña temporal para continuar');
7111:     } else {
7112:       await showProfessionalApp();
7113:     }
7114:   } catch(e) {
7115:     err.textContent = e.message || 'Error de acceso';
7116:     err.style.display = 'block';
7117:   } finally {
7118:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7119:   }
7120: }
7121: 
7122: async function changeProfessionalPassword() {
7123:   const currentPassword = document.getElementById('proPass').value;
7124:   const newPassword = document.getElementById('proNewPass').value;
7125:   const d = await fetch(APPS_SCRIPT_URL, {
```

## Login administrativo

```html
7210: }
7211: 
7212: function openProIssue(citaId) {
7213:   document.getElementById('proIssueCitaId').value = citaId;
7214:   document.getElementById('proIssueTipo').value = 'Paciente no responde';
7215:   document.getElementById('proIssueObs').value = '';
7216:   openModal('modalProIssue');
7217: }
7218: 
7219: async function sendProfessionalIssue() {
7220:   const d = await fetch(APPS_SCRIPT_URL, {
7221:     method:'POST',
7222:     body:JSON.stringify({
7223:       action:'professionalReportIssue',
7224:       token:PROFESSIONAL_TOKEN,
7225:       citaId:document.getElementById('proIssueCitaId').value,
7226:       tipo:document.getElementById('proIssueTipo').value,
7227:       observacion:document.getElementById('proIssueObs').value.trim()
7228:     })
7229:   }).then(r => r.json());
7230:   if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
7231:   else toast(d.error || 'No se pudo enviar', 'err');
7232: }
7233: 
7234: function professionalSignout() {
7235:   sessionStorage.removeItem('professionalToken');
7236:   PROFESSIONAL_TOKEN = '';
7237:   professionalSession = null;
7238:   professionalAgenda = [];
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
```

## Generación y copia del texto de gestión

```html
13970:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13971:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
13972:   if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
13973:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13974:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13975:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13976:   return {ok, att};
13977: }
13978: 
13979: function _copyGestionAcciones(d) {
13980:   return [
13981:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
13982:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13983:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13984:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13985:     'Revisar el servicio más vendido y crear una oferta complementaria.'
13986:   ];
13987: }
13988: 
13989: function _copyGestionTexto(kind) {
13990:   const d = _copyGestionData();
13991:   const diag = _copyGestionDiagnostico(d);
13992:   const acciones = _copyGestionAcciones(d);
13993:   const money = v => fmtPeso(v || 0);
13994:   const baseFin = [
13995:     `Periodo: ${d.periodo}`,
13996:     '',
13997:     'RESUMEN FINANCIERO',
13998:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
13999:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14000:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14001:     `* Gastos: ${money(d.egresosMes)}`,
14002:     `* Ganancia estimada: ${money(d.ganancia)}`,
14003:     `* Meta mensual: ${money(d.metaMensual)}`,
14004:     `* Cumplimiento: ${d.cumplimiento}%`,
14005:     `* Dinero faltante: ${money(d.faltante)}`
14006:   ];
14007:   let text = '';
14008:   if (kind === 'ejecutivo') {
14009:     text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
14010:   } else if (kind === 'indicadores') {
14011:     text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
14012:   } else if (kind === 'diagnostico') {
14013:     text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
14014:   } else if (kind === 'estrategias') {
14015:     text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
14016:   } else if (kind === 'plan') {
14017:     text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
14018:   } else if (kind === 'asesor') {
14019:     text = _copyGestionAsesorText(d);
14020:   } else {
14021:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14022:   }
14023:   return _copyPlainText(text);
14024: }
14025: 
```

## Utilidad de copia

```html
14080:     `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
14081:     `* Resultado: ${d.resultadosObtenidos}`,
14082:     '* Ingreso generado: calcular según campañas registradas.',
14083:     '',
14084:     'OBSERVACIONES',
14085:     d.observaciones,
14086:     '',
14087:     'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
14088:     '',
14089:     '1. Diagnóstico del mes.',
14090:     '2. Principales problemas.',
14091:     '3. Oportunidades de ingresos.',
14092:     '4. Cinco acciones prioritarias.',
14093:     '5. Personas o segmentos que debemos contactar.',
14094:     '6. Estrategias para llegar a la meta.',
14095:     '7. Actividades que debe realizar administración.',
14096:     '8. Actividades que se pueden delegar a los fisioterapeutas.',
14097:     '9. Riesgos.',
14098:     '10. Próximo paso inmediato.',
14099:     '',
14100:     'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
14101:   ].join('\n');
14102: }
14103: 
14104: async function _copyPlainText(text) {
14105:   const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
14106:   try {
14107:     if (navigator.clipboard && window.isSecureContext) {
14108:       await navigator.clipboard.writeText(clean);
14109:       _copyOk();
14110:       return true;
14111:     }
14112:   } catch(e) {}
14113:   _showCopyFallback(clean);
14114:   return false;
14115: }
14116: 
14117: function _copyOk() {
14118:   toast('Información copiada correctamente', 'ok');
14119:   const estados = document.querySelectorAll('.copyGestionStatus');
14120:   estados.forEach(el => { el.style.display = 'inline-flex'; });
```