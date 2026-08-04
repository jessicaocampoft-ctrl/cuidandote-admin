# Contexto técnico para correcciones del panel

Archivo revisado: `index.html`
Total de líneas: 20221

## Todas las apariciones de copyGestionStatus

### Coincidencia 1 — línea 3951

```html
3945:             <div>
3946:               <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
3947:               <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
3948:                 Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
3949:               </p>
3950:             </div>
3951:             <span id="copyGestionStatusPrincipal" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 2 — línea 4014

```html
4008:           <div>
4009:             <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
4010:             <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
4011:               Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
4012:             </p>
4013:           </div>
4014:           <span id="copyGestionStatusSecundario" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 3 — línea 14103

```html
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
```

## ID duplicado: emCk_ventas_sem_1

### Coincidencia 1 — línea 4703

```html
4697:             <div class="em-card-body" id="emBody_ventas_sem">
4698:               <div class="em-symptom">💡 <strong>Semana financieramente débil.</strong> Aún hay tiempo de corregir antes de que cierre el mes — actuar esta semana evita que el problema se acumule. Primero verifica que no sea un error de registro (citas atendidas sin precio ingresado) antes de asumir que las ventas realmente bajaron.</div>
4699:               <div class="em-prog-meta" id="emPM_ventas_sem">0 de 5 pasos completados</div>
4700:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_sem" style="width:0%"></div></div>
4701:               <div class="em-steps">
4702:                 <label class="em-step" id="emS_ventas_sem_0" onclick="handleEmStep(event,'ventas_sem',0)"><input type="checkbox" id="emCk_ventas_sem_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Verificar integridad del registro:</strong> abrir Finanzas y revisar que todas las citas atendidas esta semana tienen precio registrado. A veces las ventas están "perdidas" simplemente porque la cita no tiene valor ingresado — eso es un problema de registro, no de ventas.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4703:                 <label class="em-step" id="emS_ventas_sem_1" onclick="handleEmStep(event,'ventas_sem',1)"><input type="checkbox" id="emCk_ventas_sem_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Calcular el gap exacto:</strong> ¿cuánto falta para llegar a la meta semanal? ¿Cuántas citas adicionales necesitas a precio promedio para cerrar ese gap? Ese es el número concreto que persigues hoy.</span></label>
4704:                 <label class="em-step" id="emS_ventas_sem_2" onclick="handleEmStep(event,'ventas_sem',2)"><input type="checkbox" id="emCk_ventas_sem_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer paquete a pacientes en sesión suelta:</strong> cuando un paciente viene a una cita individual, la auxiliar debe siempre mencionar el paquete equivalente: <em>"¿Sabías que si agendas 3 sesiones juntas ahorras $27.000? ¿Te lo separo con el mismo horario?"</em> El upgrade en el momento de la cita tiene 40–60% de cierre.</span></label>
4705:                 <label class="em-step" id="emS_ventas_sem_3" onclick="handleEmStep(event,'ventas_sem',3)"><input type="checkbox" id="emCk_ventas_sem_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Reactivar pacientes inactivos con WhatsApp personalizado:</strong> desde Recordatorios, contactar 3–5 pacientes que no han vuelto en 30–60 días. Un paciente que ya confió en ti convierte 5× más fácil que uno nuevo.</span><button class="em-goto" onclick="event.stopPropagation();showView('recordatorios')">Recordatorios →</button></label>
4706:                 <label class="em-step" id="emS_ventas_sem_4" onclick="handleEmStep(event,'ventas_sem',4)"><input type="checkbox" id="emCk_ventas_sem_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Historia de urgencia en redes:</strong> publicar disponibilidad real para esta semana con CTA directo. No una oferta de descuento — solo mostrar los horarios disponibles genera urgencia genuina sin devaluar el servicio.</span></label>
4707:               </div>
4708:               <div class="em-card-footer">
4709:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
```

## Declaraciones de globalSearch

### Coincidencia 1 — línea 9498

```html
9492:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes esta semana';
9493:   document.getElementById('reporteMesBody').innerHTML = html;
9494:   document.getElementById('modalReporteMes').style.display = 'flex';
9495: }
9496: 
9497: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9498: function globalSearch(val) {
9499:   if (!val || !val.trim()) return;
9500:   const q = val.trim().toLowerCase();
9501: 
9502:   // ¿Es un paciente?
9503:   const esPaciente = (allData.citas || []).some(c =>
9504:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
```

## Declaración de copyGestionTexto

No se encontraron coincidencias.

## Declaración de openPago

### Coincidencia 1 — línea 17117

```html
17111:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17112:       </div>
17113:     </div>`;
17114:   }).join('');
17115: }
17116: 
17117: function openPago(citaId) {
17118:   showView('pagos');
17119:   setTimeout(() => {
17120:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17121:     const selector = document.getElementById('payCitaId');
17122:     if (selector) {
17123:       selector.value = citaId || '';
```

## Referencias a openPago

### Coincidencia 1 — línea 17111

```html
17105:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17106:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17107:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17108:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17109:       <div style="display:flex;gap:6px">
17110:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17111:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17112:       </div>
17113:     </div>`;
17114:   }).join('');
17115: }
17116: 
17117: function openPago(citaId) {
```

### Coincidencia 2 — línea 17117

```html
17111:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17112:       </div>
17113:     </div>`;
17114:   }).join('');
17115: }
17116: 
17117: function openPago(citaId) {
17118:   showView('pagos');
17119:   setTimeout(() => {
17120:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17121:     const selector = document.getElementById('payCitaId');
17122:     if (selector) {
17123:       selector.value = citaId || '';
```

## Acción adminLogin

### Coincidencia 1 — línea 7238

```html
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
```

## Variables loginUrl

No se encontraron coincidencias.

## Funciones relacionadas con login

### Coincidencia 1 — línea 7050

```html
7044:   (operationsData.auditoria || []).forEach(a => rows.push([
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
```

### Coincidencia 2 — línea 7056

```html
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
```

### Coincidencia 3 — línea 7061

```html
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
```

### Coincidencia 4 — línea 7221

```html
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
```

### Coincidencia 5 — línea 8840

```html
8834: 
8835: function ordinalES(n) {
8836:   const s = ['','ra','da','ra','ta','ta','ta','ma','va','na','ma'];
8837:   return n + (n <= 10 ? s[n] : 'ra');
8838: }
8839: 
8840: function getInfoSesion(nombre, servicio, fecha) {
8841:   const total = sesionesPorPaquete[servicio];
8842:   if (!total) return null;
8843:   const norm  = (nombre||'').toLowerCase().trim();
8844:   const hasta = normDate(fecha);
8845:   const lista = (allData && allData.citas) ? allData.citas : [];
8846:   const numero = lista.filter(c =>
```

### Coincidencia 6 — línea 10349

```html
10343:     btn.style.color = 'var(--muted)';
10344:     icon.textContent  = '🚫';
10345:     label.textContent = 'Sin cobro de desplazamiento';
10346:   }
10347: }
10348: 
10349: function updateSesionesInfo() {
10350:   const serv   = document.getElementById('ncService').value;
10351:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10352:   const el     = document.getElementById('ncSesionesInfo');
10353:   if (!el) return;
10354:   const n = sesionesPorPaquete[serv];
10355:   if (n) {
```

### Coincidencia 7 — línea 18149

```html
18143:   const asignados = _getPkAsignados();
18144:   asignados.push({ paciente, telefono:tel, nombre:pl.nombre, sesiones:+pl.sesiones, consumidas:0, precio:pl.precio, fechaCompra:fechaC, vencimiento:vigD.toLocalDateStr(), notas });
18145:   _savePkAsignados(asignados);
18146:   document.getElementById('modalPaquete').style.display='none';
18147:   renderPaquetes(); toast('Paquete asignado ✓');
18148: }
18149: function usarSesion(idx) {
18150:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18151:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18152:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18153:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18154: }
18155: function ajustarSesiones(idx) {
```

### Coincidencia 8 — línea 18155

```html
18149: function usarSesion(idx) {
18150:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18151:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18152:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18153:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18154: }
18155: function ajustarSesiones(idx) {
18156:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18157:   const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
18158:   if (val === null) return;
18159:   const n = parseInt(val, 10);
18160:   if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
18161:   if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
```

## AbortController

No se encontraron coincidencias.

## Llamadas fetch con señal

No se encontraron coincidencias.

## Estados de pago canónicos

### Coincidencia 1 — línea 6908

```html
6902:     method:'POST',
6903:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6904:   }).then(r => r.json());
6905:   if (d.ok) {
6906:     if (mode === 'approve') {
6907:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6908:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6909:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6910:       toast('Pago confirmado y cita autorizada');
6911:     } else {
6912:       toast('Comprobante subido para revisión');
6913:     }
6914:     clearPaymentForm();
```

### Coincidencia 2 — línea 6962

```html
6956:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6957:     if (seenPayments.has(key)) return;
6958:     seenPayments.add(key);
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
6968:     ['Rechazados', rechazados],
```

### Coincidencia 3 — línea 6963

```html
6957:     if (seenPayments.has(key)) return;
6958:     seenPayments.add(key);
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
6968:     ['Rechazados', rechazados],
6969:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
```

### Coincidencia 4 — línea 6964

```html
6958:     seenPayments.add(key);
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
6968:     ['Rechazados', rechazados],
6969:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6970:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
```

### Coincidencia 5 — línea 6980

```html
6974:     .map(a => `<div class="team-card">
6975:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6976:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6977:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6978: 
6979:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6980:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6981:     return `<div class="team-card">
6982:       <div class="team-card-head">
6983:         <div>
6984:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6985:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6986:         </div>
```

### Coincidencia 6 — línea 6980

```html
6974:     .map(a => `<div class="team-card">
6975:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6976:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6977:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6978: 
6979:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6980:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6981:     return `<div class="team-card">
6982:       <div class="team-card-head">
6983:         <div>
6984:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6985:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6986:         </div>
```

### Coincidencia 7 — línea 6993

```html
6987:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
```

### Coincidencia 8 — línea 6993

```html
6987:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
```

### Coincidencia 9 — línea 6994

```html
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
7000:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 10 — línea 6994

```html
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
7000:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 11 — línea 6995

```html
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
7000:   const planTemplates = operationsData.plantillasPlanes || [];
7001:   const clientPlans = operationsData.planesCliente || [];
```
