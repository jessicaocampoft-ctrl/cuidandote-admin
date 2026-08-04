# Contexto exacto para fase 2

## Login profesional

```html
7045:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7046:   ]));
7047:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7048: }
7049: 
7050: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7051:   const controller = new AbortController();
7052:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7053:   try {
7054:     const response = await fetch(url, { ...options, signal: controller.signal });
7055:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7056:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7057:     try {
7058:       return JSON.parse(raw);
7059:     } catch (_) {
7060:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7061:     }
7062:   } catch (error) {
7063:     if (error && error.name === 'AbortError') {
7064:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7065:     }
7066:     throw error;
7067:   } finally {
7068:     clearTimeout(timeout);
7069:   }
7070: }
7071: 
7072: function openProfessionalLoginMode() {
7073:   location.hash = '/profesionales/login';
7074:   showOnlyScreen('proLoginScreen');
7075:   document.getElementById('proLoginErr').style.display = 'none';
7076: }
7077: 
7078: function backToAdminLogin() {
7079:   location.hash = '';
7080:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7081: }
7082: 
7083: async function doProfessionalLogin() {
7084:   const btn = document.getElementById('proLoginBtn');
7085:   const err = document.getElementById('proLoginErr');
7086:   err.style.display = 'none';
7087:   btn.disabled = true; btn.textContent = 'Verificando...';
7088:   try {
7089:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7090:       method:'POST',
7091:       body:JSON.stringify({
7092:         action:'professionalLogin',
7093:         user:document.getElementById('proUser').value.trim(),
7094:         password:document.getElementById('proPass').value
7095:       })
7096:     }, 45000);
7097:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7098:     PROFESSIONAL_TOKEN = d.professionalToken;
7099:     professionalSession = d.professional;
7100:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7101:     if (professionalSession.debeCambiarPassword) {
7102:       document.getElementById('proFirstChangeBox').style.display = 'block';
7103:       toast('Cambia la contraseña temporal para continuar');
7104:     } else {
7105:       await showProfessionalApp();
7106:     }
7107:   } catch(e) {
7108:     err.textContent = e.message || 'Error de acceso';
7109:     err.style.display = 'block';
7110:   } finally {
7111:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7112:   }
7113: }
7114: 
7115: async function changeProfessionalPassword() {
7116:   const currentPassword = document.getElementById('proPass').value;
7117:   const newPassword = document.getElementById('proNewPass').value;
7118:   const d = await fetch(APPS_SCRIPT_URL, {
7119:     method:'POST',
7120:     body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
7121:   }).then(r => r.json());
7122:   if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
7123:   toast('Contraseña actualizada');
7124:   document.getElementById('proFirstChangeBox').style.display = 'none';
7125:   await showProfessionalApp();
```

## Login administrativo

```html
7210: }
7211: 
7212: async function sendProfessionalIssue() {
7213:   const d = await fetch(APPS_SCRIPT_URL, {
7214:     method:'POST',
7215:     body:JSON.stringify({
7216:       action:'professionalReportIssue',
7217:       token:PROFESSIONAL_TOKEN,
7218:       citaId:document.getElementById('proIssueCitaId').value,
7219:       tipo:document.getElementById('proIssueTipo').value,
7220:       observacion:document.getElementById('proIssueObs').value.trim()
7221:     })
7222:   }).then(r => r.json());
7223:   if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
7224:   else toast(d.error || 'No se pudo enviar', 'err');
7225: }
7226: 
7227: function professionalSignout() {
7228:   sessionStorage.removeItem('professionalToken');
7229:   PROFESSIONAL_TOKEN = '';
7230:   professionalSession = null;
7231:   professionalAgenda = [];
7232:   openProfessionalLoginMode();
7233: }
7234: 
7235: let _submittingBooking = false;
7236: let _submittingPatient = false;
7237: let _loginTime = null;
7238: 
7239: // ── LOGIN ──
7240: let _loginAttempts = 0;
7241: let _loginLockedUntil = 0;
7242: 
7243: async function doLogin() {
7244:   const ahora = Date.now();
7245:   if (_loginLockedUntil > ahora) {
7246:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7247:     const errEl = document.getElementById('loginErr');
7248:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7249:     errEl.style.display = 'block';
7250:     return;
7251:   }
7252:   const pw  = document.getElementById('pwInput').value.trim();
7253:   const user = (document.getElementById('userInput')?.value || '').trim();
7254:   const btn = document.getElementById('loginBtn');
7255:   if (!pw) return;
7256:   btn.textContent = 'Verificando...'; btn.disabled = true;
7257:   try {
7258:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7259:       method: 'POST',
7260:       body: JSON.stringify({action: 'adminLogin', user, password: pw})
7261:     }, 45000);
7262:     if (d.ok) {
7263:       _loginAttempts = 0;
7264:       TOKEN = d.sessionToken;
7265:       sessionStorage.setItem('adminToken', d.sessionToken);
7266:       _loginTime = Date.now();
7267:       document.getElementById('loginScreen').style.display = 'none';
7268:       document.getElementById('adminApp').style.display   = 'block';
7269:       allData = d;
7270:       await loadAdminKV();
7271:       await loadTeamData();
7272:       reloadMetas();
7273:       _initSidebarState();
7274:       initDashboard();
7275:       await _runUrlRepairIfRequested();
7276:     } else {
7277:       _loginAttempts++;
7278:       const errEl = document.getElementById('loginErr');
7279:       if (_loginAttempts >= 5) {
7280:         _loginLockedUntil = Date.now() + 120000;
7281:         _loginAttempts = 0;
7282:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7283:       } else {
7284:         const restantes = 5 - _loginAttempts;
7285:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
7286:       }
7287:       errEl.style.display = 'block';
7288:     }
7289:   } catch(e) {
7290:     document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
7291:     document.getElementById('loginErr').style.display = 'block';
7292:   }
7293:   btn.textContent = 'Ingresar'; btn.disabled = false;
7294: }
7295: 
```

## Generación y copia del texto de gestión

```html
13970:   });
13971:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13972: }
13973: 
13974: function _copyGestionDiagnostico(d) {
13975:   const ok = [];
13976:   const att = [];
13977:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13978:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13979:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13980:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
13981:   if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
13982:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13983:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13984:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13985:   return {ok, att};
13986: }
13987: 
13988: function _copyGestionAcciones(d) {
13989:   return [
13990:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
13991:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13992:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13993:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13994:     'Revisar el servicio más vendido y crear una oferta complementaria.'
13995:   ];
13996: }
13997: 
13998: function _copyGestionTexto(kind) {
13999:   const d = _copyGestionData();
14000:   const diag = _copyGestionDiagnostico(d);
14001:   const acciones = _copyGestionAcciones(d);
14002:   const money = v => fmtPeso(v || 0);
14003:   const baseFin = [
14004:     `Periodo: ${d.periodo}`,
14005:     '',
14006:     'RESUMEN FINANCIERO',
14007:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14008:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14009:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14010:     `* Gastos: ${money(d.egresosMes)}`,
14011:     `* Ganancia estimada: ${money(d.ganancia)}`,
14012:     `* Meta mensual: ${money(d.metaMensual)}`,
14013:     `* Cumplimiento: ${d.cumplimiento}%`,
14014:     `* Dinero faltante: ${money(d.faltante)}`
14015:   ];
14016:   let text = '';
14017:   if (kind === 'ejecutivo') {
14018:     text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
14019:   } else if (kind === 'indicadores') {
14020:     text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
14021:   } else if (kind === 'diagnostico') {
14022:     text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
14023:   } else if (kind === 'estrategias') {
14024:     text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
14025:   } else if (kind === 'plan') {
```

## Utilidad de copia

```html
14080:     `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
14081:     '',
14082:     'SERVICIOS',
14083:     `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
14084:     `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
14085:     '* Servicios más rentables: revisar estructura de costos.',
14086:     '* Servicios con menor rentabilidad: revisar estructura de costos.',
14087:     '',
14088:     'ACCIONES DEL MES',
14089:     `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
14090:     `* Resultado: ${d.resultadosObtenidos}`,
14091:     '* Ingreso generado: calcular según campañas registradas.',
14092:     '',
14093:     'OBSERVACIONES',
14094:     d.observaciones,
14095:     '',
14096:     'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
14097:     '',
14098:     '1. Diagnóstico del mes.',
14099:     '2. Principales problemas.',
14100:     '3. Oportunidades de ingresos.',
14101:     '4. Cinco acciones prioritarias.',
14102:     '5. Personas o segmentos que debemos contactar.',
14103:     '6. Estrategias para llegar a la meta.',
14104:     '7. Actividades que debe realizar administración.',
14105:     '8. Actividades que se pueden delegar a los fisioterapeutas.',
14106:     '9. Riesgos.',
14107:     '10. Próximo paso inmediato.',
14108:     '',
14109:     'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
14110:   ].join('\n');
14111: }
14112: 
14113: async function _copyPlainText(text) {
14114:   const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
14115:   try {
14116:     if (navigator.clipboard && window.isSecureContext) {
14117:       await navigator.clipboard.writeText(clean);
14118:       _copyOk();
14119:       return true;
14120:     }
```