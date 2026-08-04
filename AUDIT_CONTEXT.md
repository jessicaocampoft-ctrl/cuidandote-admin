# Contexto técnico para correcciones del panel

Archivo revisado: `index.html`
Total de líneas: 20246

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

### Coincidencia 3 — línea 14128

```html
14122:   _showCopyFallback(clean);
14123:   return false;
14124: }
14125: 
14126: function _copyOk() {
14127:   toast('Información copiada correctamente', 'ok');
14128:   const estados = document.querySelectorAll('.copyGestionStatus');
14129:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14130:   clearTimeout(window._copyGestionStatusTimer);
14131:   window._copyGestionStatusTimer = setTimeout(() => {
14132:     estados.forEach(el => { el.style.display = 'none'; });
14133:   }, 2200);
14134: }
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

### Coincidencia 1 — línea 9519

```html
9513:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes esta semana';
9514:   document.getElementById('reporteMesBody').innerHTML = html;
9515:   document.getElementById('modalReporteMes').style.display = 'flex';
9516: }
9517: 
9518: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9519: function globalSearch(val) {
9520:   if (!val || !val.trim()) return;
9521:   const q = val.trim().toLowerCase();
9522: 
9523:   // ¿Es un paciente?
9524:   const esPaciente = (allData.citas || []).some(c =>
9525:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
```

## Declaración de copyGestionTexto

### Coincidencia 1 — línea 14035

```html
14029:   } else {
14030:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14031:   }
14032:   return _copyPlainText(text);
14033: }
14034: 
14035: function copyGestionTexto(kind) {
14036:   return _copyGestionTexto(kind);
14037: }
14038: 
14039: function _copyGestionAsesorText(d) {
14040:   const money = v => fmtPeso(v || 0);
14041:   return [
```

## Funciones con Gestion en el nombre

### Coincidencia 1 — línea 13822

```html
13816:   el.innerHTML = html;
13817: }
13818: 
13819: // ══════════════════════════════════════════════════════════════
13820: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13821: // ══════════════════════════════════════════════════════════════
13822: function _copyGestionMesKey(d = new Date()) {
13823:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13824: }
13825: 
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
```

### Coincidencia 2 — línea 13826

```html
13820: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13821: // ══════════════════════════════════════════════════════════════
13822: function _copyGestionMesKey(d = new Date()) {
13823:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13824: }
13825: 
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13829:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13830: }
13831: 
13832: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 3 — línea 13832

```html
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13829:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13830: }
13831: 
13832: function _copyGestionTop(map, limit = 5) {
13833:   return Object.entries(map || {})
13834:     .sort((a,b) => b[1] - a[1])
13835:     .slice(0, limit)
13836:     .map(([k,v]) => `${k}: ${v}`)
13837:     .join('\n') || 'Sin datos registrados';
13838: }
```

### Coincidencia 4 — línea 13840

```html
13834:     .sort((a,b) => b[1] - a[1])
13835:     .slice(0, limit)
13836:     .map(([k,v]) => `${k}: ${v}`)
13837:     .join('\n') || 'Sin datos registrados';
13838: }
13839: 
13840: function _copyGestionData() {
13841:   const now = new Date();
13842:   const monthKey = _copyGestionMesKey(now);
13843:   const citasAll = allData.citas || [];
13844:   const eventosAll = allData.eventos || [];
13845:   const pacientesAll = allData.pacientes || [];
13846:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 5 — línea 13930

```html
13924:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13925:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13926:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13927:   };
13928: }
13929: 
13930: function _copyGestionOcupacion(citasProgramadas, date) {
13931:   const y = date.getFullYear(), m = date.getMonth();
13932:   const days = new Date(y, m + 1, 0).getDate();
13933:   let capacidad = 0;
13934:   for (let d = 1; d <= days; d++) {
13935:     const dow = new Date(y, m, d).getDay();
13936:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13944

```html
13938:     else if (dow === 6) capacidad += 2;
13939:     else capacidad += 9;
13940:   }
13941:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13942: }
13943: 
13944: function _copyGestionReactivar(citasAll, pacientesAll) {
13945:   const last = {};
13946:   citasAll.forEach(c => {
13947:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13948:     const key = String(c.nombre).trim().toLowerCase();
13949:     const f = normDate(c.fecha || '');
13950:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13960

```html
13954:   return Object.values(last)
13955:     .filter(p => p.fecha && p.fecha < cutoffStr)
13956:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13957:     .slice(0,40);
13958: }
13959: 
13960: function _copyGestionCandidatosPaquete(citasAll) {
13961:   const map = {};
13962:   citasAll.forEach(c => {
13963:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13964:     const key = String(c.nombre).trim().toLowerCase();
13965:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13966:     map[key].total++;
```

### Coincidencia 8 — línea 13974

```html
13968:     const f = normDate(c.fecha || '');
13969:     if (f > map[key].ultimo) map[key].ultimo = f;
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
```

### Coincidencia 9 — línea 13988

```html
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
```

### Coincidencia 10 — línea 13998

```html
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
```

### Coincidencia 11 — línea 14035

```html
14029:   } else {
14030:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14031:   }
14032:   return _copyPlainText(text);
14033: }
14034: 
14035: function copyGestionTexto(kind) {
14036:   return _copyGestionTexto(kind);
14037: }
14038: 
14039: function _copyGestionAsesorText(d) {
14040:   const money = v => fmtPeso(v || 0);
14041:   return [
```

### Coincidencia 12 — línea 14039

```html
14033: }
14034: 
14035: function copyGestionTexto(kind) {
14036:   return _copyGestionTexto(kind);
14037: }
14038: 
14039: function _copyGestionAsesorText(d) {
14040:   const money = v => fmtPeso(v || 0);
14041:   return [
14042:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14043:     '',
14044:     `Periodo: ${d.periodo}`,
14045:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 13 — línea 14161

```html
14155:   const ta = document.getElementById('copyFallbackText');
14156:   ta.value = text;
14157:   modal.style.display = 'flex';
14158:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14159: }
14160: 
14161: function abrirCopiarListaGestion() {
14162:   const d = _copyGestionData();
14163:   const groups = [
14164:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14165:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14166:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14167:   ];
```

### Coincidencia 14 — línea 14172

```html
14166:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14167:   ];
14168:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14169:   return _copyPlainText(text);
14170: }
14171: 
14172: function copiarInfoPersonaGestion() {
14173:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14174:   if (!nombre) return;
14175:   const key = nombre.trim().toLowerCase();
14176:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14177:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14178:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
```

### Coincidencia 15 — línea 14200

```html
14194:     'Historial reciente:',
14195:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14196:   ].join('\n');
14197:   return _copyPlainText(text);
14198: }
14199: 
14200: function abrirMensajeWAGestion() {
14201:   const d = _copyGestionData();
14202:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14203:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14204:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14205:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14206:   _showWhatsAppCopyModal(msg, phone);
```

### Coincidencia 16 — línea 14234

```html
14228:   }
14229:   document.getElementById('waCopyGestionPhone').value = phone || '';
14230:   document.getElementById('waCopyGestionText').value = msg;
14231:   modal.style.display = 'flex';
14232: }
14233: 
14234: function _openWAGestionPrepared() {
14235:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14236:   const text = document.getElementById('waCopyGestionText').value || '';
14237:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14238:   window.open(url, '_blank');
14239: }
14240: 
```

## Funciones relacionadas con copiar

### Coincidencia 1 — línea 13822

```html
13816:   el.innerHTML = html;
13817: }
13818: 
13819: // ══════════════════════════════════════════════════════════════
13820: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13821: // ══════════════════════════════════════════════════════════════
13822: function _copyGestionMesKey(d = new Date()) {
13823:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13824: }
13825: 
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
```

### Coincidencia 2 — línea 13826

```html
13820: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13821: // ══════════════════════════════════════════════════════════════
13822: function _copyGestionMesKey(d = new Date()) {
13823:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13824: }
13825: 
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13829:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13830: }
13831: 
13832: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 3 — línea 13832

```html
13826: function _copyGestionPeriodo() {
13827:   const now = new Date();
13828:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13829:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13830: }
13831: 
13832: function _copyGestionTop(map, limit = 5) {
13833:   return Object.entries(map || {})
13834:     .sort((a,b) => b[1] - a[1])
13835:     .slice(0, limit)
13836:     .map(([k,v]) => `${k}: ${v}`)
13837:     .join('\n') || 'Sin datos registrados';
13838: }
```

### Coincidencia 4 — línea 13840

```html
13834:     .sort((a,b) => b[1] - a[1])
13835:     .slice(0, limit)
13836:     .map(([k,v]) => `${k}: ${v}`)
13837:     .join('\n') || 'Sin datos registrados';
13838: }
13839: 
13840: function _copyGestionData() {
13841:   const now = new Date();
13842:   const monthKey = _copyGestionMesKey(now);
13843:   const citasAll = allData.citas || [];
13844:   const eventosAll = allData.eventos || [];
13845:   const pacientesAll = allData.pacientes || [];
13846:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 5 — línea 13930

```html
13924:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13925:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13926:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13927:   };
13928: }
13929: 
13930: function _copyGestionOcupacion(citasProgramadas, date) {
13931:   const y = date.getFullYear(), m = date.getMonth();
13932:   const days = new Date(y, m + 1, 0).getDate();
13933:   let capacidad = 0;
13934:   for (let d = 1; d <= days; d++) {
13935:     const dow = new Date(y, m, d).getDay();
13936:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13944

```html
13938:     else if (dow === 6) capacidad += 2;
13939:     else capacidad += 9;
13940:   }
13941:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13942: }
13943: 
13944: function _copyGestionReactivar(citasAll, pacientesAll) {
13945:   const last = {};
13946:   citasAll.forEach(c => {
13947:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13948:     const key = String(c.nombre).trim().toLowerCase();
13949:     const f = normDate(c.fecha || '');
13950:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13960

```html
13954:   return Object.values(last)
13955:     .filter(p => p.fecha && p.fecha < cutoffStr)
13956:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13957:     .slice(0,40);
13958: }
13959: 
13960: function _copyGestionCandidatosPaquete(citasAll) {
13961:   const map = {};
13962:   citasAll.forEach(c => {
13963:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13964:     const key = String(c.nombre).trim().toLowerCase();
13965:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13966:     map[key].total++;
```

### Coincidencia 8 — línea 13974

```html
13968:     const f = normDate(c.fecha || '');
13969:     if (f > map[key].ultimo) map[key].ultimo = f;
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
```

### Coincidencia 9 — línea 13988

```html
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
```

### Coincidencia 10 — línea 13998

```html
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
```

### Coincidencia 11 — línea 14039

```html
14033: }
14034: 
14035: function copyGestionTexto(kind) {
14036:   return _copyGestionTexto(kind);
14037: }
14038: 
14039: function _copyGestionAsesorText(d) {
14040:   const money = v => fmtPeso(v || 0);
14041:   return [
14042:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14043:     '',
14044:     `Periodo: ${d.periodo}`,
14045:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 12 — línea 14113

```html
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
```

### Coincidencia 13 — línea 14126

```html
14120:     }
14121:   } catch(e) {}
14122:   _showCopyFallback(clean);
14123:   return false;
14124: }
14125: 
14126: function _copyOk() {
14127:   toast('Información copiada correctamente', 'ok');
14128:   const estados = document.querySelectorAll('.copyGestionStatus');
14129:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14130:   clearTimeout(window._copyGestionStatusTimer);
14131:   window._copyGestionStatusTimer = setTimeout(() => {
14132:     estados.forEach(el => { el.style.display = 'none'; });
```

### Coincidencia 14 — línea 14136

```html
14130:   clearTimeout(window._copyGestionStatusTimer);
14131:   window._copyGestionStatusTimer = setTimeout(() => {
14132:     estados.forEach(el => { el.style.display = 'none'; });
14133:   }, 2200);
14134: }
14135: 
14136: function _showCopyFallback(text, title='Copiar manualmente') {
14137:   let modal = document.getElementById('copyFallbackModal');
14138:   if (!modal) {
14139:     modal = document.createElement('div');
14140:     modal.id = 'copyFallbackModal';
14141:     modal.className = 'modal-bg';
14142:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 15 — línea 14161

```html
14155:   const ta = document.getElementById('copyFallbackText');
14156:   ta.value = text;
14157:   modal.style.display = 'flex';
14158:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14159: }
14160: 
14161: function abrirCopiarListaGestion() {
14162:   const d = _copyGestionData();
14163:   const groups = [
14164:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14165:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14166:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14167:   ];
```

### Coincidencia 16 — línea 14209

```html
14203:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14204:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14205:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14206:   _showWhatsAppCopyModal(msg, phone);
14207: }
14208: 
14209: function _showWhatsAppCopyModal(msg, phone='') {
14210:   let modal = document.getElementById('waCopyGestionModal');
14211:   if (!modal) {
14212:     modal = document.createElement('div');
14213:     modal.id = 'waCopyGestionModal';
14214:     modal.className = 'modal-bg';
14215:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 17 — línea 18841

```html
18835:   _pasCurrent = data.passport || _pasCurrent;
18836:   renderPasaporteAdminTools();
18837:   toast('Pasaporte reactivado', 'success');
18838: }
18839: 
18840: // ── Interceptor WA en desktop: muestra modal para copiar en vez de abrir wa.me ──
18841: (function initWACopyInterceptor() {
18842:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18843:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18844: 
18845:   document.addEventListener('click', function(e) {
18846:     const a = e.target.closest('a[href]');
18847:     if (!a) return;
```

### Coincidencia 18 — línea 18871

```html
18865:       document.getElementById('waOpenLink').href        = 'https://web.whatsapp.com';
18866:     }
18867:     document.getElementById('waCopyModal').style.display = 'flex';
18868:   }); // bubble phase: los onclick inline (markWaSent, etc.) disparan primero, luego prevenimos la navegacion
18869: })();
18870: 
18871: function cerrarWaCopyModal() {
18872:   document.getElementById('waCopyModal').style.display = 'none';
18873: }
18874: 
18875: function copiarMsgWA() {
18876:   const txt = document.getElementById('waCopyText').textContent;
18877:   navigator.clipboard.writeText(txt).then(() => {
```

### Coincidencia 19 — línea 19664

```html
19658:     if (el) el.style.display = t === tab ? 'block' : 'none';
19659:     if (btn) {
19660:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19661:     }
19662:   });
19663: }
19664: function gCopiar(id, btn) {
19665:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19666:   navigator.clipboard.writeText(txt).then(() => {
19667:     const orig = btn.textContent;
19668:     btn.textContent = '✅ Copiado';
19669:     btn.style.background = '#16a34a';
19670:     btn.style.color = '#fff';
```

## Uso de navigator.clipboard

### Coincidencia 1 — línea 6581

```html
6575: }
6576: 
6577: async function copyTempPassword() {
6578:   const value = document.getElementById('tempPassValue').textContent.trim();
6579:   if (!value) return;
6580:   try {
6581:     await navigator.clipboard.writeText(value);
6582:     toast('Contraseña copiada');
6583:   } catch(e) {
6584:     const ta = document.createElement('textarea');
6585:     ta.value = value;
6586:     document.body.appendChild(ta);
6587:     ta.select();
```

### Coincidencia 2 — línea 14116

```html
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
14121:   } catch(e) {}
14122:   _showCopyFallback(clean);
```

### Coincidencia 3 — línea 14117

```html
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
14121:   } catch(e) {}
14122:   _showCopyFallback(clean);
14123:   return false;
```

### Coincidencia 4 — línea 15024

```html
15018: 
15019:   const el = document.getElementById('reporteMesBody');
15020:   // Construir texto plano desde el HTML
15021:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
15022:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
15023: 
15024:   navigator.clipboard.writeText(txt).then(() => {
15025:     const btn = document.getElementById('btnCopiarReporte');
15026:     const orig = btn.innerHTML;
15027:     btn.textContent = '✓ Copiado';
15028:     btn.style.color = 'var(--ok)';
15029:     setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
15030:   }).catch(() => toast('No se pudo copiar', 'err'));
```

### Coincidencia 5 — línea 15312

```html
15306:   line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
15307:   line();
15308:   line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
15309:   line(`implementar esta semana.`);
15310:   line(sep(60));
15311: 
15312:   navigator.clipboard.writeText(t).then(() => {
15313:     const btn = document.getElementById('btnBriefClaude');
15314:     const orig = btn.innerHTML;
15315:     btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
15316:     btn.style.background = 'var(--ok)';
15317:     btn.style.color = '#fff';
15318:     setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
```

### Coincidencia 6 — línea 18744

```html
18738:   window.open(link, '_blank');
18739: }
18740: 
18741: function copiarLinkPas() {
18742:   const link = document.getElementById('pasLinkTexto').textContent;
18743:   if (!link) return;
18744:   navigator.clipboard.writeText(link).then(() => {
18745:     const btn = document.getElementById('pasCopyBtn');
18746:     const orig = btn.textContent;
18747:     btn.textContent = '¡Copiado!';
18748:     setTimeout(() => btn.textContent = orig, 2000);
18749:   });
18750: }
```

### Coincidencia 7 — línea 18877

```html
18871: function cerrarWaCopyModal() {
18872:   document.getElementById('waCopyModal').style.display = 'none';
18873: }
18874: 
18875: function copiarMsgWA() {
18876:   const txt = document.getElementById('waCopyText').textContent;
18877:   navigator.clipboard.writeText(txt).then(() => {
18878:     const btn = document.getElementById('waCopyBtn');
18879:     const orig = btn.textContent;
18880:     btn.textContent = '✅ ¡Copiado!';
18881:     setTimeout(() => btn.textContent = orig, 2500);
18882:     toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
18883:   }).catch(() => {
```

### Coincidencia 8 — línea 19441

```html
19435:   const msg =
19436:     `📅 *Horarios disponibles — ${fechaLegible}*\n` +
19437:     `🩺 Servicio: ${servicio}\n\n` +
19438:     libres.map(h => `✅ ${h}`).join('\n') +
19439:     '\n\n¿Cuál te queda mejor? 😊';
19440: 
19441:   navigator.clipboard.writeText(msg).then(() => {
19442:     const msgEl = document.getElementById('dispCopyMsg');
19443:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19444:   }).catch(() => {
19445:     // Fallback para dispositivos sin clipboard API
19446:     const ta = document.createElement('textarea');
19447:     ta.value = msg; ta.style.position = 'fixed'; ta.style.opacity = '0';
```

### Coincidencia 9 — línea 19598

```html
19592:   toast('Mensaje eliminado', 'ok');
19593: }
19594: 
19595: function copiarMensajePre(id) {
19596:   const m = _getMensajesPre().find(x => x.id === id);
19597:   if (!m) return;
19598:   navigator.clipboard.writeText(m.texto)
19599:     .then(() => toast('Copiado al portapapeles ✓', 'ok'))
19600:     .catch(() => {
19601:       const ta = document.createElement('textarea');
19602:       ta.value = m.texto; document.body.appendChild(ta); ta.select();
19603:       document.execCommand('copy'); document.body.removeChild(ta);
19604:       toast('Copiado al portapapeles ✓', 'ok');
```

### Coincidencia 10 — línea 19666

```html
19660:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19661:     }
19662:   });
19663: }
19664: function gCopiar(id, btn) {
19665:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19666:   navigator.clipboard.writeText(txt).then(() => {
19667:     const orig = btn.textContent;
19668:     btn.textContent = '✅ Copiado';
19669:     btn.style.background = '#16a34a';
19670:     btn.style.color = '#fff';
19671:     setTimeout(() => {
19672:       btn.textContent = orig;
```

## Declaración de openPago

### Coincidencia 1 — línea 17142

```html
17136:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17137:       </div>
17138:     </div>`;
17139:   }).join('');
17140: }
17141: 
17142: function openPago(citaId) {
17143:   showView('pagos');
17144:   setTimeout(() => {
17145:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17146:     const selector = document.getElementById('payCitaId');
17147:     if (selector) {
17148:       selector.value = citaId || '';
```

## Referencias a openPago

### Coincidencia 1 — línea 17136

```html
17130:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17131:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17132:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17133:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17134:       <div style="display:flex;gap:6px">
17135:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17136:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17137:       </div>
17138:     </div>`;
17139:   }).join('');
17140: }
17141: 
17142: function openPago(citaId) {
```

### Coincidencia 2 — línea 17142

```html
17136:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17137:       </div>
17138:     </div>`;
17139:   }).join('');
17140: }
17141: 
17142: function openPago(citaId) {
17143:   showView('pagos');
17144:   setTimeout(() => {
17145:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17146:     const selector = document.getElementById('payCitaId');
17147:     if (selector) {
17148:       selector.value = citaId || '';
```

## Acción adminLogin

### Coincidencia 1 — línea 7260

```html
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
```

## Variables loginUrl

No se encontraron coincidencias.

## Funciones relacionadas con login

### Coincidencia 1 — línea 7072

```html
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
```

### Coincidencia 2 — línea 7078

```html
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
```

### Coincidencia 3 — línea 7083

```html
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
```

### Coincidencia 4 — línea 7243

```html
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
```

### Coincidencia 5 — línea 8861

```html
8855: 
8856: function ordinalES(n) {
8857:   const s = ['','ra','da','ra','ta','ta','ta','ma','va','na','ma'];
8858:   return n + (n <= 10 ? s[n] : 'ra');
8859: }
8860: 
8861: function getInfoSesion(nombre, servicio, fecha) {
8862:   const total = sesionesPorPaquete[servicio];
8863:   if (!total) return null;
8864:   const norm  = (nombre||'').toLowerCase().trim();
8865:   const hasta = normDate(fecha);
8866:   const lista = (allData && allData.citas) ? allData.citas : [];
8867:   const numero = lista.filter(c =>
```

### Coincidencia 6 — línea 10370

```html
10364:     btn.style.color = 'var(--muted)';
10365:     icon.textContent  = '🚫';
10366:     label.textContent = 'Sin cobro de desplazamiento';
10367:   }
10368: }
10369: 
10370: function updateSesionesInfo() {
10371:   const serv   = document.getElementById('ncService').value;
10372:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10373:   const el     = document.getElementById('ncSesionesInfo');
10374:   if (!el) return;
10375:   const n = sesionesPorPaquete[serv];
10376:   if (n) {
```

### Coincidencia 7 — línea 18174

```html
18168:   const asignados = _getPkAsignados();
18169:   asignados.push({ paciente, telefono:tel, nombre:pl.nombre, sesiones:+pl.sesiones, consumidas:0, precio:pl.precio, fechaCompra:fechaC, vencimiento:vigD.toLocalDateStr(), notas });
18170:   _savePkAsignados(asignados);
18171:   document.getElementById('modalPaquete').style.display='none';
18172:   renderPaquetes(); toast('Paquete asignado ✓');
18173: }
18174: function usarSesion(idx) {
18175:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18176:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18177:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18178:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18179: }
18180: function ajustarSesiones(idx) {
```

### Coincidencia 8 — línea 18180

```html
18174: function usarSesion(idx) {
18175:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18176:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18177:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18178:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18179: }
18180: function ajustarSesiones(idx) {
18181:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18182:   const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
18183:   if (val === null) return;
18184:   const n = parseInt(val, 10);
18185:   if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
18186:   if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
```

## AbortController

### Coincidencia 1 — línea 7051

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
```

## Llamadas fetch con señal

### Coincidencia 1 — línea 7054

```html
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
```

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

## Bloque completo de login profesional

Líneas 7045–7125

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

## Bloque completo de login administrativo

Líneas 7210–7285

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
```

## Utilidades de copia y gestión

Líneas 13940–14360

```html
13940:   }
13941:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13942: }
13943: 
13944: function _copyGestionReactivar(citasAll, pacientesAll) {
13945:   const last = {};
13946:   citasAll.forEach(c => {
13947:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13948:     const key = String(c.nombre).trim().toLowerCase();
13949:     const f = normDate(c.fecha || '');
13950:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
13951:   });
13952:   const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 42);
13953:   const cutoffStr = normDate(cutoff);
13954:   return Object.values(last)
13955:     .filter(p => p.fecha && p.fecha < cutoffStr)
13956:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13957:     .slice(0,40);
13958: }
13959: 
13960: function _copyGestionCandidatosPaquete(citasAll) {
13961:   const map = {};
13962:   citasAll.forEach(c => {
13963:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13964:     const key = String(c.nombre).trim().toLowerCase();
13965:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13966:     map[key].total++;
13967:     if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
13968:     const f = normDate(c.fecha || '');
13969:     if (f > map[key].ultimo) map[key].ultimo = f;
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
14026:     text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
14027:   } else if (kind === 'asesor') {
14028:     text = _copyGestionAsesorText(d);
14029:   } else {
14030:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14031:   }
14032:   return _copyPlainText(text);
14033: }
14034: 
14035: function copyGestionTexto(kind) {
14036:   return _copyGestionTexto(kind);
14037: }
14038: 
14039: function _copyGestionAsesorText(d) {
14040:   const money = v => fmtPeso(v || 0);
14041:   return [
14042:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14043:     '',
14044:     `Periodo: ${d.periodo}`,
14045:     `Meta mensual: ${money(d.metaMensual)}`,
14046:     '',
14047:     'RESUMEN FINANCIERO',
14048:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14049:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14050:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14051:     `* Gastos: ${money(d.egresosMes)}`,
14052:     `* Ganancia estimada: ${money(d.ganancia)}`,
14053:     `* Cumplimiento de la meta: ${d.cumplimiento}%`,
14054:     '',
14055:     'OPERACIÓN',
14056:     `* Citas programadas: ${d.citasProgramadas}`,
14057:     `* Sesiones atendidas: ${d.sesionesAtendidas}`,
14058:     `* Cancelaciones: ${d.cancelaciones}`,
14059:     `* No asistencias: ${d.noAsistencias}`,
14060:     `* Ocupación total: ${d.ocupacion}`,
14061:     '',
14062:     'CLIENTES Y VENTAS',
14063:     `* Personas nuevas: ${d.personasNuevas}`,
14064:     `* Personas recurrentes: ${d.personasRecurrentes}`,
14065:     `* Leads recibidos: ${d.leadsRecibidos}`,
14066:     `* Leads convertidos: ${d.leadsConvertidos}`,
14067:     `* Paquetes vendidos: ${d.paquetesVendidos}`,
14068:     `* Ticket promedio: ${money(d.ticketPromedio)}`,
14069:     '',
14070:     'CAPACIDAD DEL EQUIPO',
14071:     `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
14072:     `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
14073:     '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
14074:     '',
14075:     'OPORTUNIDADES',
14076:     `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
14077:     `* Personas para reactivar: ${d.reactivar.length}`,
14078:     `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
14079:     '* Paquetes próximos a terminar: revisar módulo de paquetes.',
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
14121:   } catch(e) {}
14122:   _showCopyFallback(clean);
14123:   return false;
14124: }
14125: 
14126: function _copyOk() {
14127:   toast('Información copiada correctamente', 'ok');
14128:   const estados = document.querySelectorAll('.copyGestionStatus');
14129:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14130:   clearTimeout(window._copyGestionStatusTimer);
14131:   window._copyGestionStatusTimer = setTimeout(() => {
14132:     estados.forEach(el => { el.style.display = 'none'; });
14133:   }, 2200);
14134: }
14135: 
14136: function _showCopyFallback(text, title='Copiar manualmente') {
14137:   let modal = document.getElementById('copyFallbackModal');
14138:   if (!modal) {
14139:     modal = document.createElement('div');
14140:     modal.id = 'copyFallbackModal';
14141:     modal.className = 'modal-bg';
14142:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14143:     modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14144:       <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
14145:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
14146:       <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
14147:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14148:         <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
14149:         <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
14150:       </div>
14151:     </div>`;
14152:     document.body.appendChild(modal);
14153:   }
14154:   document.getElementById('copyFallbackTitle').textContent = title;
14155:   const ta = document.getElementById('copyFallbackText');
14156:   ta.value = text;
14157:   modal.style.display = 'flex';
14158:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14159: }
14160: 
14161: function abrirCopiarListaGestion() {
14162:   const d = _copyGestionData();
14163:   const groups = [
14164:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14165:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14166:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14167:   ];
14168:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14169:   return _copyPlainText(text);
14170: }
14171: 
14172: function copiarInfoPersonaGestion() {
14173:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14174:   if (!nombre) return;
14175:   const key = nombre.trim().toLowerCase();
14176:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14177:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14178:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14179:   const c0 = citas[0];
14180:   const total = citas.length;
14181:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14182:   const text = [
14183:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14184:     '',
14185:     `Nombre: ${c0.nombre}`,
14186:     `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
14187:     `Correo: ${c0.email || 'Sin registrar'}`,
14188:     `Total de citas registradas: ${total}`,
14189:     `Citas confirmadas/atendidas: ${pagado}`,
14190:     `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
14191:     `Último servicio: ${c0.servicio || 'Sin servicio'}`,
14192:     `Estado último registro: ${c0.estado || 'Sin estado'}`,
14193:     '',
14194:     'Historial reciente:',
14195:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14196:   ].join('\n');
14197:   return _copyPlainText(text);
14198: }
14199: 
14200: function abrirMensajeWAGestion() {
14201:   const d = _copyGestionData();
14202:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14203:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14204:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14205:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14206:   _showWhatsAppCopyModal(msg, phone);
14207: }
14208: 
14209: function _showWhatsAppCopyModal(msg, phone='') {
14210:   let modal = document.getElementById('waCopyGestionModal');
14211:   if (!modal) {
14212:     modal = document.createElement('div');
14213:     modal.id = 'waCopyGestionModal';
14214:     modal.className = 'modal-bg';
14215:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14216:     modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14217:       <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
14218:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
14219:       <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
14220:       <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
14221:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14222:         <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
14223:         <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
14224:         <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
14225:       </div>
14226:     </div>`;
14227:     document.body.appendChild(modal);
14228:   }
14229:   document.getElementById('waCopyGestionPhone').value = phone || '';
14230:   document.getElementById('waCopyGestionText').value = msg;
14231:   modal.style.display = 'flex';
14232: }
14233: 
14234: function _openWAGestionPrepared() {
14235:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14236:   const text = document.getElementById('waCopyGestionText').value || '';
14237:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14238:   window.open(url, '_blank');
14239: }
14240: 
14241: // ══════════════════════════════════════════════════════════════
14242: // ── REPORTE FIN DE MES ──
14243: // ══════════════════════════════════════════════════════════════
14244: function abrirReporteMes() {
14245:   const modal = document.getElementById('modalReporteMes');
14246:   modal.style.display = 'flex';
14247:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
14248:   setTimeout(() => {
14249:     const html = _buildReporteMes();
14250:     document.getElementById('reporteMesBody').innerHTML = html;
14251:   }, 80);
14252: }
14253: 
14254: function cerrarReporteMes() {
14255:   document.getElementById('modalReporteMes').style.display = 'none';
14256: }
14257: 
14258: function _toggleEditCostos() {
14259:   const panel   = document.getElementById('costosEditorPanel');
14260:   const compact = document.getElementById('costosVistaCompacta');
14261:   const btn     = document.getElementById('btnEditCostos');
14262:   const open    = panel.style.display === 'none';
14263:   panel.style.display   = open ? 'block' : 'none';
14264:   compact.style.display = open ? 'none'  : 'block';
14265:   btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
14266: }
14267: 
14268: function _leerCamposCostos() {
14269:   const c = {...COSTOS_DEFAULTS};
14270:   document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
14271:     c[inp.dataset.costo] = parseFloat(inp.value) || 0;
14272:   });
14273:   return c;
14274: }
14275: 
14276: function _recalcCostos() {
14277:   const c    = _leerCamposCostos();
14278:   const calc = calcTotalCostos(c);
14279:   const el   = id => document.getElementById(id);
14280:   if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
14281:   if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
14282:   if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
14283:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14284: }
14285: 
14286: function _guardarCostos() {
14287:   const c    = _leerCamposCostos();
14288:   const calc = calcTotalCostos(c);
14289:   saveCostosEstructura(c);
14290: 
14291:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14292:   const cfg = getKPIConfig();
14293:   cfg.meta_ventas_mes = calc.total;
14294:   kvSet('kpiConfig', JSON.stringify(cfg));
14295:   META_VENTAS_MES    = calc.total;
14296:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14297: 
14298:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14299: 
14300:   // Refrescar todo el reporte
14301:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14302:   setTimeout(() => {
14303:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14304:   }, 60);
14305: }
14306: 
14307: function _secTitle(icon, title) {
14308:   return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
14309:     <span style="font-size:1.15rem">${icon}</span>
14310:     <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
14311:   </div>`;
14312: }
14313: 
14314: function _rFila(label, val, color='var(--text)', bold=false) {
14315:   return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14316:     <span style="font-size:.84rem;color:var(--muted)">${label}</span>
14317:     <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
14318:   </div>`;
14319: }
14320: 
14321: function _semCell(val, meta, alto=true) {
14322:   if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
14323:   const ok   = alto ? val >= meta : val <= meta;
14324:   const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
14325:   if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
14326:   if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
14327:   return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
14328: }
14329: 
14330: function _kpiRow(icon, label, valTxt, dot, color, sub) {
14331:   return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
14332:     <span style="font-size:1rem;margin-top:1px">${dot}</span>
14333:     <div style="flex:1;min-width:0">
14334:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14335:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14336:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14337:       </div>
14338:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14339:     </div>
14340:   </div>`;
14341: }
14342: 
14343: function _buildReporteMes() {
14344:   const now  = new Date();
14345:   const m    = now.getMonth() + 1;
14346:   const y    = now.getFullYear();
14347:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14348:   const nomMes = MESES[m - 1];
14349: 
14350:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14351:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14352: 
14353:   const citas  = citasReales();
14354:   const manual = getKPIManual();
14355:   const todasCitas = allData.citas || [];
14356:   const eventosAll = allData.eventos || [];
14357: 
14358:   // ══════════ CÁLCULOS ══════════
14359: 
14360:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
```

## Botón y función Registrar pago

Líneas 17090–17165

```html
17090:   });
17091:   window._autoAtendidaList = pendientes;
17092:   const banner = document.getElementById('bannerAutoAtendida');
17093:   const txt    = document.getElementById('bannerAutoAtendidaTxt');
17094:   if (!banner) return;
17095:   banner.style.display = pendientes.length > 0 ? 'flex' : 'none';
17096:   if (txt && pendientes.length) txt.textContent = `${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pasada${pendientes.length !== 1 ? 's' : ''} aún sin marcar como Atendida`;
17097: }
17098: 
17099: async function marcarTodasAtendidas() {
17100:   const pendientes = window._autoAtendidaList || [];
17101:   if (!pendientes.length) { toast('No hay citas pendientes de cierre.'); return; }
17102:   window._agendaFiltroPendienteCierre = true;
17103:   showView('agenda');
17104:   if (typeof renderAgenda === 'function') renderAgenda();
17105:   toast(`${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} de cierre. Revísalas manualmente.`);
17106: }
17107: 
17108: // ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
17109: function _checkCobrosPendientes() {
17110:   const hoyStr = today();
17111:   const pendientes = citasReales().filter(c => {
17112:     if (c.estado !== 'Atendida') return false;
17113:     if (c.pago) return false;
17114:     if (kvGet('pago_' + c.id) === '1') return false;
17115:     if (parsePrecio(c.precio) === 0) return false;
17116:     const f = normDate(c.fecha);
17117:     if (!f) return false;
17118:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17119:     return diff >= 3;
17120:   });
17121:   const banner = document.getElementById('bannerCobros');
17122:   const txtEl  = document.getElementById('bannerCobrosTxt');
17123:   const lista  = document.getElementById('bannerCobrosLista');
17124:   if (!banner) return;
17125:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17126:   banner.style.display = 'block';
17127:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17128:   if (lista) lista.innerHTML = pendientes.map(c => {
17129:     const tel = (c.telefono || '').replace(/\D/g, '');
17130:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17131:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17132:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17133:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17134:       <div style="display:flex;gap:6px">
17135:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17136:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17137:       </div>
17138:     </div>`;
17139:   }).join('');
17140: }
17141: 
17142: function openPago(citaId) {
17143:   showView('pagos');
17144:   setTimeout(() => {
17145:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17146:     const selector = document.getElementById('payCitaId');
17147:     if (selector) {
17148:       selector.value = citaId || '';
17149:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17150:       selector.focus();
17151:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17152:     } else {
17153:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17154:     }
17155:   }, 100);
17156: }
17157: 
17158: // ── Alerta semana floja ──
17159: function _checkAlertaSemanFloja(citas) {
17160:   const now = new Date();
17161:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17162:   const hoyStr = today();
17163: 
17164:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17165:   const dashEl = document.getElementById('alertaSemanFlojaDash');
```
