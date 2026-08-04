# Contexto técnico para correcciones del panel

Archivo revisado: `index.html`
Total de líneas: 20237

## Todas las apariciones de copyGestionStatus

### Coincidencia 1 — línea 3958

```html
3952:             <div>
3953:               <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
3954:               <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
3955:                 Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
3956:               </p>
3957:             </div>
3958:             <span id="copyGestionStatusPrincipal" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3959:           </div>
3960:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3961:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3963:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3964:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 2 — línea 4021

```html
4015:           <div>
4016:             <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
4017:             <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
4018:               Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
4019:             </p>
4020:           </div>
4021:           <span id="copyGestionStatusSecundario" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4022:         </div>
4023:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4024:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4026:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4027:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 3 — línea 14119

```html
14113:   _showCopyFallback(clean);
14114:   return false;
14115: }
14116: 
14117: function _copyOk() {
14118:   toast('Información copiada correctamente', 'ok');
14119:   const estados = document.querySelectorAll('.copyGestionStatus');
14120:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14121:   clearTimeout(window._copyGestionStatusTimer);
14122:   window._copyGestionStatusTimer = setTimeout(() => {
14123:     estados.forEach(el => { el.style.display = 'none'; });
14124:   }, 2200);
14125: }
```

## ID duplicado: emCk_ventas_sem_1

### Coincidencia 1 — línea 4710

```html
4704:             <div class="em-card-body" id="emBody_ventas_sem">
4705:               <div class="em-symptom">💡 <strong>Semana financieramente débil.</strong> Aún hay tiempo de corregir antes de que cierre el mes — actuar esta semana evita que el problema se acumule. Primero verifica que no sea un error de registro (citas atendidas sin precio ingresado) antes de asumir que las ventas realmente bajaron.</div>
4706:               <div class="em-prog-meta" id="emPM_ventas_sem">0 de 5 pasos completados</div>
4707:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_sem" style="width:0%"></div></div>
4708:               <div class="em-steps">
4709:                 <label class="em-step" id="emS_ventas_sem_0" onclick="handleEmStep(event,'ventas_sem',0)"><input type="checkbox" id="emCk_ventas_sem_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Verificar integridad del registro:</strong> abrir Finanzas y revisar que todas las citas atendidas esta semana tienen precio registrado. A veces las ventas están "perdidas" simplemente porque la cita no tiene valor ingresado — eso es un problema de registro, no de ventas.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4710:                 <label class="em-step" id="emS_ventas_sem_1" onclick="handleEmStep(event,'ventas_sem',1)"><input type="checkbox" id="emCk_ventas_sem_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Calcular el gap exacto:</strong> ¿cuánto falta para llegar a la meta semanal? ¿Cuántas citas adicionales necesitas a precio promedio para cerrar ese gap? Ese es el número concreto que persigues hoy.</span></label>
4711:                 <label class="em-step" id="emS_ventas_sem_2" onclick="handleEmStep(event,'ventas_sem',2)"><input type="checkbox" id="emCk_ventas_sem_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer paquete a pacientes en sesión suelta:</strong> cuando un paciente viene a una cita individual, la auxiliar debe siempre mencionar el paquete equivalente: <em>"¿Sabías que si agendas 3 sesiones juntas ahorras $27.000? ¿Te lo separo con el mismo horario?"</em> El upgrade en el momento de la cita tiene 40–60% de cierre.</span></label>
4712:                 <label class="em-step" id="emS_ventas_sem_3" onclick="handleEmStep(event,'ventas_sem',3)"><input type="checkbox" id="emCk_ventas_sem_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Reactivar pacientes inactivos con WhatsApp personalizado:</strong> desde Recordatorios, contactar 3–5 pacientes que no han vuelto en 30–60 días. Un paciente que ya confió en ti convierte 5× más fácil que uno nuevo.</span><button class="em-goto" onclick="event.stopPropagation();showView('recordatorios')">Recordatorios →</button></label>
4713:                 <label class="em-step" id="emS_ventas_sem_4" onclick="handleEmStep(event,'ventas_sem',4)"><input type="checkbox" id="emCk_ventas_sem_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Historia de urgencia en redes:</strong> publicar disponibilidad real para esta semana con CTA directo. No una oferta de descuento — solo mostrar los horarios disponibles genera urgencia genuina sin devaluar el servicio.</span></label>
4714:               </div>
4715:               <div class="em-card-footer">
4716:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
```

## Declaraciones de globalSearch

### Coincidencia 1 — línea 9526

```html
9520:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes esta semana';
9521:   document.getElementById('reporteMesBody').innerHTML = html;
9522:   document.getElementById('modalReporteMes').style.display = 'flex';
9523: }
9524: 
9525: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9526: function globalSearch(val) {
9527:   if (!val || !val.trim()) return;
9528:   const q = val.trim().toLowerCase();
9529: 
9530:   // ¿Es un paciente?
9531:   const esPaciente = (allData.citas || []).some(c =>
9532:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
```

## Declaración de copyGestionTexto

### Coincidencia 1 — línea 14026

```html
14020:   } else {
14021:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14022:   }
14023:   return _copyPlainText(text);
14024: }
14025: 
14026: function copyGestionTexto(kind) {
14027:   return _copyGestionTexto(kind);
14028: }
14029: 
14030: function _copyGestionAsesorText(d) {
14031:   const money = v => fmtPeso(v || 0);
14032:   return [
```

## Funciones con Gestion en el nombre

### Coincidencia 1 — línea 13813

```html
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
```

### Coincidencia 2 — línea 13817

```html
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
```

### Coincidencia 3 — línea 13823

```html
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
```

### Coincidencia 4 — línea 13831

```html
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
```

### Coincidencia 5 — línea 13921

```html
13915:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13916:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13917:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13918:   };
13919: }
13920: 
13921: function _copyGestionOcupacion(citasProgramadas, date) {
13922:   const y = date.getFullYear(), m = date.getMonth();
13923:   const days = new Date(y, m + 1, 0).getDate();
13924:   let capacidad = 0;
13925:   for (let d = 1; d <= days; d++) {
13926:     const dow = new Date(y, m, d).getDay();
13927:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13935

```html
13929:     else if (dow === 6) capacidad += 2;
13930:     else capacidad += 9;
13931:   }
13932:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13933: }
13934: 
13935: function _copyGestionReactivar(citasAll, pacientesAll) {
13936:   const last = {};
13937:   citasAll.forEach(c => {
13938:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13939:     const key = String(c.nombre).trim().toLowerCase();
13940:     const f = normDate(c.fecha || '');
13941:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13951

```html
13945:   return Object.values(last)
13946:     .filter(p => p.fecha && p.fecha < cutoffStr)
13947:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13948:     .slice(0,40);
13949: }
13950: 
13951: function _copyGestionCandidatosPaquete(citasAll) {
13952:   const map = {};
13953:   citasAll.forEach(c => {
13954:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13955:     const key = String(c.nombre).trim().toLowerCase();
13956:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13957:     map[key].total++;
```

### Coincidencia 8 — línea 13965

```html
13959:     const f = normDate(c.fecha || '');
13960:     if (f > map[key].ultimo) map[key].ultimo = f;
13961:   });
13962:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13963: }
13964: 
13965: function _copyGestionDiagnostico(d) {
13966:   const ok = [];
13967:   const att = [];
13968:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13969:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13970:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13971:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13979

```html
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
```

### Coincidencia 10 — línea 13989

```html
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
```

### Coincidencia 11 — línea 14026

```html
14020:   } else {
14021:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14022:   }
14023:   return _copyPlainText(text);
14024: }
14025: 
14026: function copyGestionTexto(kind) {
14027:   return _copyGestionTexto(kind);
14028: }
14029: 
14030: function _copyGestionAsesorText(d) {
14031:   const money = v => fmtPeso(v || 0);
14032:   return [
```

### Coincidencia 12 — línea 14030

```html
14024: }
14025: 
14026: function copyGestionTexto(kind) {
14027:   return _copyGestionTexto(kind);
14028: }
14029: 
14030: function _copyGestionAsesorText(d) {
14031:   const money = v => fmtPeso(v || 0);
14032:   return [
14033:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14034:     '',
14035:     `Periodo: ${d.periodo}`,
14036:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 13 — línea 14152

```html
14146:   const ta = document.getElementById('copyFallbackText');
14147:   ta.value = text;
14148:   modal.style.display = 'flex';
14149:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14150: }
14151: 
14152: function abrirCopiarListaGestion() {
14153:   const d = _copyGestionData();
14154:   const groups = [
14155:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14156:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14157:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14158:   ];
```

### Coincidencia 14 — línea 14163

```html
14157:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14158:   ];
14159:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14160:   return _copyPlainText(text);
14161: }
14162: 
14163: function copiarInfoPersonaGestion() {
14164:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14165:   if (!nombre) return;
14166:   const key = nombre.trim().toLowerCase();
14167:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14168:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14169:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
```

### Coincidencia 15 — línea 14191

```html
14185:     'Historial reciente:',
14186:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14187:   ].join('\n');
14188:   return _copyPlainText(text);
14189: }
14190: 
14191: function abrirMensajeWAGestion() {
14192:   const d = _copyGestionData();
14193:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14194:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14195:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14196:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14197:   _showWhatsAppCopyModal(msg, phone);
```

### Coincidencia 16 — línea 14225

```html
14219:   }
14220:   document.getElementById('waCopyGestionPhone').value = phone || '';
14221:   document.getElementById('waCopyGestionText').value = msg;
14222:   modal.style.display = 'flex';
14223: }
14224: 
14225: function _openWAGestionPrepared() {
14226:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14227:   const text = document.getElementById('waCopyGestionText').value || '';
14228:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14229:   window.open(url, '_blank');
14230: }
14231: 
```

## Funciones relacionadas con copiar

### Coincidencia 1 — línea 13813

```html
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
```

### Coincidencia 2 — línea 13817

```html
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
```

### Coincidencia 3 — línea 13823

```html
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
```

### Coincidencia 4 — línea 13831

```html
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
```

### Coincidencia 5 — línea 13921

```html
13915:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13916:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13917:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13918:   };
13919: }
13920: 
13921: function _copyGestionOcupacion(citasProgramadas, date) {
13922:   const y = date.getFullYear(), m = date.getMonth();
13923:   const days = new Date(y, m + 1, 0).getDate();
13924:   let capacidad = 0;
13925:   for (let d = 1; d <= days; d++) {
13926:     const dow = new Date(y, m, d).getDay();
13927:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13935

```html
13929:     else if (dow === 6) capacidad += 2;
13930:     else capacidad += 9;
13931:   }
13932:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13933: }
13934: 
13935: function _copyGestionReactivar(citasAll, pacientesAll) {
13936:   const last = {};
13937:   citasAll.forEach(c => {
13938:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13939:     const key = String(c.nombre).trim().toLowerCase();
13940:     const f = normDate(c.fecha || '');
13941:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13951

```html
13945:   return Object.values(last)
13946:     .filter(p => p.fecha && p.fecha < cutoffStr)
13947:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13948:     .slice(0,40);
13949: }
13950: 
13951: function _copyGestionCandidatosPaquete(citasAll) {
13952:   const map = {};
13953:   citasAll.forEach(c => {
13954:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13955:     const key = String(c.nombre).trim().toLowerCase();
13956:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13957:     map[key].total++;
```

### Coincidencia 8 — línea 13965

```html
13959:     const f = normDate(c.fecha || '');
13960:     if (f > map[key].ultimo) map[key].ultimo = f;
13961:   });
13962:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13963: }
13964: 
13965: function _copyGestionDiagnostico(d) {
13966:   const ok = [];
13967:   const att = [];
13968:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13969:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13970:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13971:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13979

```html
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
```

### Coincidencia 10 — línea 13989

```html
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
```

### Coincidencia 11 — línea 14030

```html
14024: }
14025: 
14026: function copyGestionTexto(kind) {
14027:   return _copyGestionTexto(kind);
14028: }
14029: 
14030: function _copyGestionAsesorText(d) {
14031:   const money = v => fmtPeso(v || 0);
14032:   return [
14033:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14034:     '',
14035:     `Periodo: ${d.periodo}`,
14036:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 12 — línea 14104

```html
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
```

### Coincidencia 13 — línea 14117

```html
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
14121:   clearTimeout(window._copyGestionStatusTimer);
14122:   window._copyGestionStatusTimer = setTimeout(() => {
14123:     estados.forEach(el => { el.style.display = 'none'; });
```

### Coincidencia 14 — línea 14127

```html
14121:   clearTimeout(window._copyGestionStatusTimer);
14122:   window._copyGestionStatusTimer = setTimeout(() => {
14123:     estados.forEach(el => { el.style.display = 'none'; });
14124:   }, 2200);
14125: }
14126: 
14127: function _showCopyFallback(text, title='Copiar manualmente') {
14128:   let modal = document.getElementById('copyFallbackModal');
14129:   if (!modal) {
14130:     modal = document.createElement('div');
14131:     modal.id = 'copyFallbackModal';
14132:     modal.className = 'modal-bg';
14133:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 15 — línea 14152

```html
14146:   const ta = document.getElementById('copyFallbackText');
14147:   ta.value = text;
14148:   modal.style.display = 'flex';
14149:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14150: }
14151: 
14152: function abrirCopiarListaGestion() {
14153:   const d = _copyGestionData();
14154:   const groups = [
14155:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14156:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14157:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14158:   ];
```

### Coincidencia 16 — línea 14200

```html
14194:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14195:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14196:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14197:   _showWhatsAppCopyModal(msg, phone);
14198: }
14199: 
14200: function _showWhatsAppCopyModal(msg, phone='') {
14201:   let modal = document.getElementById('waCopyGestionModal');
14202:   if (!modal) {
14203:     modal = document.createElement('div');
14204:     modal.id = 'waCopyGestionModal';
14205:     modal.className = 'modal-bg';
14206:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 17 — línea 18832

```html
18826:   _pasCurrent = data.passport || _pasCurrent;
18827:   renderPasaporteAdminTools();
18828:   toast('Pasaporte reactivado', 'success');
18829: }
18830: 
18831: // ── Interceptor WA en desktop: muestra modal para copiar en vez de abrir wa.me ──
18832: (function initWACopyInterceptor() {
18833:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18834:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18835: 
18836:   document.addEventListener('click', function(e) {
18837:     const a = e.target.closest('a[href]');
18838:     if (!a) return;
```

### Coincidencia 18 — línea 18862

```html
18856:       document.getElementById('waOpenLink').href        = 'https://web.whatsapp.com';
18857:     }
18858:     document.getElementById('waCopyModal').style.display = 'flex';
18859:   }); // bubble phase: los onclick inline (markWaSent, etc.) disparan primero, luego prevenimos la navegacion
18860: })();
18861: 
18862: function cerrarWaCopyModal() {
18863:   document.getElementById('waCopyModal').style.display = 'none';
18864: }
18865: 
18866: function copiarMsgWA() {
18867:   const txt = document.getElementById('waCopyText').textContent;
18868:   navigator.clipboard.writeText(txt).then(() => {
```

### Coincidencia 19 — línea 19655

```html
19649:     if (el) el.style.display = t === tab ? 'block' : 'none';
19650:     if (btn) {
19651:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19652:     }
19653:   });
19654: }
19655: function gCopiar(id, btn) {
19656:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19657:   navigator.clipboard.writeText(txt).then(() => {
19658:     const orig = btn.textContent;
19659:     btn.textContent = '✅ Copiado';
19660:     btn.style.background = '#16a34a';
19661:     btn.style.color = '#fff';
```

## Uso de navigator.clipboard

### Coincidencia 1 — línea 6588

```html
6582: }
6583: 
6584: async function copyTempPassword() {
6585:   const value = document.getElementById('tempPassValue').textContent.trim();
6586:   if (!value) return;
6587:   try {
6588:     await navigator.clipboard.writeText(value);
6589:     toast('Contraseña copiada');
6590:   } catch(e) {
6591:     const ta = document.createElement('textarea');
6592:     ta.value = value;
6593:     document.body.appendChild(ta);
6594:     ta.select();
```

### Coincidencia 2 — línea 14107

```html
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
```

### Coincidencia 3 — línea 14108

```html
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
```

### Coincidencia 4 — línea 15015

```html
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
15019:     btn.style.color = 'var(--ok)';
15020:     setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
15021:   }).catch(() => toast('No se pudo copiar', 'err'));
```

### Coincidencia 5 — línea 15303

```html
15297:   line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
15298:   line();
15299:   line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
15300:   line(`implementar esta semana.`);
15301:   line(sep(60));
15302: 
15303:   navigator.clipboard.writeText(t).then(() => {
15304:     const btn = document.getElementById('btnBriefClaude');
15305:     const orig = btn.innerHTML;
15306:     btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
15307:     btn.style.background = 'var(--ok)';
15308:     btn.style.color = '#fff';
15309:     setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
```

### Coincidencia 6 — línea 18735

```html
18729:   window.open(link, '_blank');
18730: }
18731: 
18732: function copiarLinkPas() {
18733:   const link = document.getElementById('pasLinkTexto').textContent;
18734:   if (!link) return;
18735:   navigator.clipboard.writeText(link).then(() => {
18736:     const btn = document.getElementById('pasCopyBtn');
18737:     const orig = btn.textContent;
18738:     btn.textContent = '¡Copiado!';
18739:     setTimeout(() => btn.textContent = orig, 2000);
18740:   });
18741: }
```

### Coincidencia 7 — línea 18868

```html
18862: function cerrarWaCopyModal() {
18863:   document.getElementById('waCopyModal').style.display = 'none';
18864: }
18865: 
18866: function copiarMsgWA() {
18867:   const txt = document.getElementById('waCopyText').textContent;
18868:   navigator.clipboard.writeText(txt).then(() => {
18869:     const btn = document.getElementById('waCopyBtn');
18870:     const orig = btn.textContent;
18871:     btn.textContent = '✅ ¡Copiado!';
18872:     setTimeout(() => btn.textContent = orig, 2500);
18873:     toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
18874:   }).catch(() => {
```

### Coincidencia 8 — línea 19432

```html
19426:   const msg =
19427:     `📅 *Horarios disponibles — ${fechaLegible}*\n` +
19428:     `🩺 Servicio: ${servicio}\n\n` +
19429:     libres.map(h => `✅ ${h}`).join('\n') +
19430:     '\n\n¿Cuál te queda mejor? 😊';
19431: 
19432:   navigator.clipboard.writeText(msg).then(() => {
19433:     const msgEl = document.getElementById('dispCopyMsg');
19434:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19435:   }).catch(() => {
19436:     // Fallback para dispositivos sin clipboard API
19437:     const ta = document.createElement('textarea');
19438:     ta.value = msg; ta.style.position = 'fixed'; ta.style.opacity = '0';
```

### Coincidencia 9 — línea 19589

```html
19583:   toast('Mensaje eliminado', 'ok');
19584: }
19585: 
19586: function copiarMensajePre(id) {
19587:   const m = _getMensajesPre().find(x => x.id === id);
19588:   if (!m) return;
19589:   navigator.clipboard.writeText(m.texto)
19590:     .then(() => toast('Copiado al portapapeles ✓', 'ok'))
19591:     .catch(() => {
19592:       const ta = document.createElement('textarea');
19593:       ta.value = m.texto; document.body.appendChild(ta); ta.select();
19594:       document.execCommand('copy'); document.body.removeChild(ta);
19595:       toast('Copiado al portapapeles ✓', 'ok');
```

### Coincidencia 10 — línea 19657

```html
19651:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19652:     }
19653:   });
19654: }
19655: function gCopiar(id, btn) {
19656:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19657:   navigator.clipboard.writeText(txt).then(() => {
19658:     const orig = btn.textContent;
19659:     btn.textContent = '✅ Copiado';
19660:     btn.style.background = '#16a34a';
19661:     btn.style.color = '#fff';
19662:     setTimeout(() => {
19663:       btn.textContent = orig;
```

## Declaración de openPago

### Coincidencia 1 — línea 17133

```html
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
```

## Referencias a openPago

### Coincidencia 1 — línea 17127

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
```

### Coincidencia 2 — línea 17133

```html
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
```

## Acción adminLogin

### Coincidencia 1 — línea 7267

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
```

## Variables loginUrl

No se encontraron coincidencias.

## Funciones relacionadas con login

### Coincidencia 1 — línea 7079

```html
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
```

### Coincidencia 2 — línea 7085

```html
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
```

### Coincidencia 3 — línea 7090

```html
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
```

### Coincidencia 4 — línea 7250

```html
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
```

### Coincidencia 5 — línea 8868

```html
8862: 
8863: function ordinalES(n) {
8864:   const s = ['','ra','da','ra','ta','ta','ta','ma','va','na','ma'];
8865:   return n + (n <= 10 ? s[n] : 'ra');
8866: }
8867: 
8868: function getInfoSesion(nombre, servicio, fecha) {
8869:   const total = sesionesPorPaquete[servicio];
8870:   if (!total) return null;
8871:   const norm  = (nombre||'').toLowerCase().trim();
8872:   const hasta = normDate(fecha);
8873:   const lista = (allData && allData.citas) ? allData.citas : [];
8874:   const numero = lista.filter(c =>
```

### Coincidencia 6 — línea 10377

```html
10371:     btn.style.color = 'var(--muted)';
10372:     icon.textContent  = '🚫';
10373:     label.textContent = 'Sin cobro de desplazamiento';
10374:   }
10375: }
10376: 
10377: function updateSesionesInfo() {
10378:   const serv   = document.getElementById('ncService').value;
10379:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10380:   const el     = document.getElementById('ncSesionesInfo');
10381:   if (!el) return;
10382:   const n = sesionesPorPaquete[serv];
10383:   if (n) {
```

### Coincidencia 7 — línea 18165

```html
18159:   const asignados = _getPkAsignados();
18160:   asignados.push({ paciente, telefono:tel, nombre:pl.nombre, sesiones:+pl.sesiones, consumidas:0, precio:pl.precio, fechaCompra:fechaC, vencimiento:vigD.toLocalDateStr(), notas });
18161:   _savePkAsignados(asignados);
18162:   document.getElementById('modalPaquete').style.display='none';
18163:   renderPaquetes(); toast('Paquete asignado ✓');
18164: }
18165: function usarSesion(idx) {
18166:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18167:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18168:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18169:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18170: }
18171: function ajustarSesiones(idx) {
```

### Coincidencia 8 — línea 18171

```html
18165: function usarSesion(idx) {
18166:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18167:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18168:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18169:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18170: }
18171: function ajustarSesiones(idx) {
18172:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18173:   const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
18174:   if (val === null) return;
18175:   const n = parseInt(val, 10);
18176:   if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
18177:   if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
```

## AbortController

### Coincidencia 1 — línea 7058

```html
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
```

## Llamadas fetch con señal

### Coincidencia 1 — línea 7061

```html
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
```

## Estados de pago canónicos

### Coincidencia 1 — línea 6915

```html
6909:     method:'POST',
6910:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6911:   }).then(r => r.json());
6912:   if (d.ok) {
6913:     if (mode === 'approve') {
6914:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6915:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6916:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6917:       toast('Pago confirmado y cita autorizada');
6918:     } else {
6919:       toast('Comprobante subido para revisión');
6920:     }
6921:     clearPaymentForm();
```

### Coincidencia 2 — línea 6969

```html
6963:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6964:     if (seenPayments.has(key)) return;
6965:     seenPayments.add(key);
6966:     pagosUnicos.push(p);
6967:   });
6968:   const cuentas = operationsData.cuentas || [];
6969:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6970:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6971:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6972:   document.getElementById('pagosStats').innerHTML = [
6973:     ['Por verificar', porVerificar],
6974:     ['Aprobados', aprobados],
6975:     ['Rechazados', rechazados],
```

### Coincidencia 3 — línea 6970

```html
6964:     if (seenPayments.has(key)) return;
6965:     seenPayments.add(key);
6966:     pagosUnicos.push(p);
6967:   });
6968:   const cuentas = operationsData.cuentas || [];
6969:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6970:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6971:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6972:   document.getElementById('pagosStats').innerHTML = [
6973:     ['Por verificar', porVerificar],
6974:     ['Aprobados', aprobados],
6975:     ['Rechazados', rechazados],
6976:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
```

### Coincidencia 4 — línea 6971

```html
6965:     seenPayments.add(key);
6966:     pagosUnicos.push(p);
6967:   });
6968:   const cuentas = operationsData.cuentas || [];
6969:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6970:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6971:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6972:   document.getElementById('pagosStats').innerHTML = [
6973:     ['Por verificar', porVerificar],
6974:     ['Aprobados', aprobados],
6975:     ['Rechazados', rechazados],
6976:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6977:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
```

### Coincidencia 5 — línea 6987

```html
6981:     .map(a => `<div class="team-card">
6982:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6983:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6984:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6985: 
6986:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6987:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6988:     return `<div class="team-card">
6989:       <div class="team-card-head">
6990:         <div>
6991:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6992:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6993:         </div>
```

### Coincidencia 6 — línea 6987

```html
6981:     .map(a => `<div class="team-card">
6982:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6983:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6984:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6985: 
6986:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6987:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6988:     return `<div class="team-card">
6989:       <div class="team-card-head">
6990:         <div>
6991:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6992:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6993:         </div>
```

### Coincidencia 7 — línea 7000

```html
6994:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6995:       </div>
6996:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6997:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6998:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6999:       <div class="team-card-actions">
7000:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7001:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7002:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7003:       </div>
7004:     </div>`;
7005:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7006: 
```

### Coincidencia 8 — línea 7000

```html
6994:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6995:       </div>
6996:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6997:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6998:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6999:       <div class="team-card-actions">
7000:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7001:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7002:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7003:       </div>
7004:     </div>`;
7005:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7006: 
```

### Coincidencia 9 — línea 7001

```html
6995:       </div>
6996:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6997:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6998:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6999:       <div class="team-card-actions">
7000:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7001:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7002:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7003:       </div>
7004:     </div>`;
7005:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7006: 
7007:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 10 — línea 7001

```html
6995:       </div>
6996:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6997:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6998:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6999:       <div class="team-card-actions">
7000:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7001:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7002:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7003:       </div>
7004:     </div>`;
7005:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7006: 
7007:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 11 — línea 7002

```html
6996:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6997:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6998:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6999:       <div class="team-card-actions">
7000:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7001:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7002:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7003:       </div>
7004:     </div>`;
7005:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7006: 
7007:   const planTemplates = operationsData.plantillasPlanes || [];
7008:   const clientPlans = operationsData.planesCliente || [];
```

## Bloque completo de login profesional

Líneas 7045–7125

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

## Bloque completo de login administrativo

Líneas 7210–7285

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
```

## Utilidades de copia y gestión

Líneas 13940–14360

```html
13940:     const f = normDate(c.fecha || '');
13941:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
13942:   });
13943:   const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 42);
13944:   const cutoffStr = normDate(cutoff);
13945:   return Object.values(last)
13946:     .filter(p => p.fecha && p.fecha < cutoffStr)
13947:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13948:     .slice(0,40);
13949: }
13950: 
13951: function _copyGestionCandidatosPaquete(citasAll) {
13952:   const map = {};
13953:   citasAll.forEach(c => {
13954:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13955:     const key = String(c.nombre).trim().toLowerCase();
13956:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13957:     map[key].total++;
13958:     if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
13959:     const f = normDate(c.fecha || '');
13960:     if (f > map[key].ultimo) map[key].ultimo = f;
13961:   });
13962:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13963: }
13964: 
13965: function _copyGestionDiagnostico(d) {
13966:   const ok = [];
13967:   const att = [];
13968:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13969:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
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
14026: function copyGestionTexto(kind) {
14027:   return _copyGestionTexto(kind);
14028: }
14029: 
14030: function _copyGestionAsesorText(d) {
14031:   const money = v => fmtPeso(v || 0);
14032:   return [
14033:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14034:     '',
14035:     `Periodo: ${d.periodo}`,
14036:     `Meta mensual: ${money(d.metaMensual)}`,
14037:     '',
14038:     'RESUMEN FINANCIERO',
14039:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14040:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14041:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14042:     `* Gastos: ${money(d.egresosMes)}`,
14043:     `* Ganancia estimada: ${money(d.ganancia)}`,
14044:     `* Cumplimiento de la meta: ${d.cumplimiento}%`,
14045:     '',
14046:     'OPERACIÓN',
14047:     `* Citas programadas: ${d.citasProgramadas}`,
14048:     `* Sesiones atendidas: ${d.sesionesAtendidas}`,
14049:     `* Cancelaciones: ${d.cancelaciones}`,
14050:     `* No asistencias: ${d.noAsistencias}`,
14051:     `* Ocupación total: ${d.ocupacion}`,
14052:     '',
14053:     'CLIENTES Y VENTAS',
14054:     `* Personas nuevas: ${d.personasNuevas}`,
14055:     `* Personas recurrentes: ${d.personasRecurrentes}`,
14056:     `* Leads recibidos: ${d.leadsRecibidos}`,
14057:     `* Leads convertidos: ${d.leadsConvertidos}`,
14058:     `* Paquetes vendidos: ${d.paquetesVendidos}`,
14059:     `* Ticket promedio: ${money(d.ticketPromedio)}`,
14060:     '',
14061:     'CAPACIDAD DEL EQUIPO',
14062:     `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
14063:     `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
14064:     '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
14065:     '',
14066:     'OPORTUNIDADES',
14067:     `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
14068:     `* Personas para reactivar: ${d.reactivar.length}`,
14069:     `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
14070:     '* Paquetes próximos a terminar: revisar módulo de paquetes.',
14071:     `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
14072:     '',
14073:     'SERVICIOS',
14074:     `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
14075:     `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
14076:     '* Servicios más rentables: revisar estructura de costos.',
14077:     '* Servicios con menor rentabilidad: revisar estructura de costos.',
14078:     '',
14079:     'ACCIONES DEL MES',
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
14121:   clearTimeout(window._copyGestionStatusTimer);
14122:   window._copyGestionStatusTimer = setTimeout(() => {
14123:     estados.forEach(el => { el.style.display = 'none'; });
14124:   }, 2200);
14125: }
14126: 
14127: function _showCopyFallback(text, title='Copiar manualmente') {
14128:   let modal = document.getElementById('copyFallbackModal');
14129:   if (!modal) {
14130:     modal = document.createElement('div');
14131:     modal.id = 'copyFallbackModal';
14132:     modal.className = 'modal-bg';
14133:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14134:     modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14135:       <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
14136:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
14137:       <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
14138:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14139:         <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
14140:         <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
14141:       </div>
14142:     </div>`;
14143:     document.body.appendChild(modal);
14144:   }
14145:   document.getElementById('copyFallbackTitle').textContent = title;
14146:   const ta = document.getElementById('copyFallbackText');
14147:   ta.value = text;
14148:   modal.style.display = 'flex';
14149:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14150: }
14151: 
14152: function abrirCopiarListaGestion() {
14153:   const d = _copyGestionData();
14154:   const groups = [
14155:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14156:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14157:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14158:   ];
14159:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14160:   return _copyPlainText(text);
14161: }
14162: 
14163: function copiarInfoPersonaGestion() {
14164:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14165:   if (!nombre) return;
14166:   const key = nombre.trim().toLowerCase();
14167:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14168:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14169:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14170:   const c0 = citas[0];
14171:   const total = citas.length;
14172:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14173:   const text = [
14174:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14175:     '',
14176:     `Nombre: ${c0.nombre}`,
14177:     `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
14178:     `Correo: ${c0.email || 'Sin registrar'}`,
14179:     `Total de citas registradas: ${total}`,
14180:     `Citas confirmadas/atendidas: ${pagado}`,
14181:     `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
14182:     `Último servicio: ${c0.servicio || 'Sin servicio'}`,
14183:     `Estado último registro: ${c0.estado || 'Sin estado'}`,
14184:     '',
14185:     'Historial reciente:',
14186:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14187:   ].join('\n');
14188:   return _copyPlainText(text);
14189: }
14190: 
14191: function abrirMensajeWAGestion() {
14192:   const d = _copyGestionData();
14193:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14194:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14195:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14196:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14197:   _showWhatsAppCopyModal(msg, phone);
14198: }
14199: 
14200: function _showWhatsAppCopyModal(msg, phone='') {
14201:   let modal = document.getElementById('waCopyGestionModal');
14202:   if (!modal) {
14203:     modal = document.createElement('div');
14204:     modal.id = 'waCopyGestionModal';
14205:     modal.className = 'modal-bg';
14206:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14207:     modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14208:       <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
14209:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
14210:       <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
14211:       <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
14212:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14213:         <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
14214:         <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
14215:         <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
14216:       </div>
14217:     </div>`;
14218:     document.body.appendChild(modal);
14219:   }
14220:   document.getElementById('waCopyGestionPhone').value = phone || '';
14221:   document.getElementById('waCopyGestionText').value = msg;
14222:   modal.style.display = 'flex';
14223: }
14224: 
14225: function _openWAGestionPrepared() {
14226:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14227:   const text = document.getElementById('waCopyGestionText').value || '';
14228:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14229:   window.open(url, '_blank');
14230: }
14231: 
14232: // ══════════════════════════════════════════════════════════════
14233: // ── REPORTE FIN DE MES ──
14234: // ══════════════════════════════════════════════════════════════
14235: function abrirReporteMes() {
14236:   const modal = document.getElementById('modalReporteMes');
14237:   modal.style.display = 'flex';
14238:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
14239:   setTimeout(() => {
14240:     const html = _buildReporteMes();
14241:     document.getElementById('reporteMesBody').innerHTML = html;
14242:   }, 80);
14243: }
14244: 
14245: function cerrarReporteMes() {
14246:   document.getElementById('modalReporteMes').style.display = 'none';
14247: }
14248: 
14249: function _toggleEditCostos() {
14250:   const panel   = document.getElementById('costosEditorPanel');
14251:   const compact = document.getElementById('costosVistaCompacta');
14252:   const btn     = document.getElementById('btnEditCostos');
14253:   const open    = panel.style.display === 'none';
14254:   panel.style.display   = open ? 'block' : 'none';
14255:   compact.style.display = open ? 'none'  : 'block';
14256:   btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
14257: }
14258: 
14259: function _leerCamposCostos() {
14260:   const c = {...COSTOS_DEFAULTS};
14261:   document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
14262:     c[inp.dataset.costo] = parseFloat(inp.value) || 0;
14263:   });
14264:   return c;
14265: }
14266: 
14267: function _recalcCostos() {
14268:   const c    = _leerCamposCostos();
14269:   const calc = calcTotalCostos(c);
14270:   const el   = id => document.getElementById(id);
14271:   if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
14272:   if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
14273:   if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
14274:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14275: }
14276: 
14277: function _guardarCostos() {
14278:   const c    = _leerCamposCostos();
14279:   const calc = calcTotalCostos(c);
14280:   saveCostosEstructura(c);
14281: 
14282:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14283:   const cfg = getKPIConfig();
14284:   cfg.meta_ventas_mes = calc.total;
14285:   kvSet('kpiConfig', JSON.stringify(cfg));
14286:   META_VENTAS_MES    = calc.total;
14287:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14288: 
14289:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14290: 
14291:   // Refrescar todo el reporte
14292:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14293:   setTimeout(() => {
14294:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14295:   }, 60);
14296: }
14297: 
14298: function _secTitle(icon, title) {
14299:   return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
14300:     <span style="font-size:1.15rem">${icon}</span>
14301:     <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
14302:   </div>`;
14303: }
14304: 
14305: function _rFila(label, val, color='var(--text)', bold=false) {
14306:   return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14307:     <span style="font-size:.84rem;color:var(--muted)">${label}</span>
14308:     <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
14309:   </div>`;
14310: }
14311: 
14312: function _semCell(val, meta, alto=true) {
14313:   if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
14314:   const ok   = alto ? val >= meta : val <= meta;
14315:   const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
14316:   if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
14317:   if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
14318:   return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
14319: }
14320: 
14321: function _kpiRow(icon, label, valTxt, dot, color, sub) {
14322:   return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
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
14348: 
14349:   // ══════════ CÁLCULOS ══════════
14350: 
14351:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
14352:   const metaSesionesMes = META_SESIONES_SEMANA * 4;
14353: 
14354:   // ── Citas del mes ──
14355:   const citasMes = citas.filter(c => {
14356:     const [cy,cm] = normDate(c.fecha).split('-');
14357:     return +cm===m && +cy===y && c.estado !== 'No asistió';
14358:   });
14359:   const noShowsMes = todasCitas.filter(c => {
14360:     const [cy,cm] = normDate(c.fecha).split('-');
```

## Botón y función Registrar pago

Líneas 17090–17165

```html
17090: async function marcarTodasAtendidas() {
17091:   const pendientes = window._autoAtendidaList || [];
17092:   if (!pendientes.length) { toast('No hay citas pendientes de cierre.'); return; }
17093:   window._agendaFiltroPendienteCierre = true;
17094:   showView('agenda');
17095:   if (typeof renderAgenda === 'function') renderAgenda();
17096:   toast(`${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} de cierre. Revísalas manualmente.`);
17097: }
17098: 
17099: // ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
17100: function _checkCobrosPendientes() {
17101:   const hoyStr = today();
17102:   const pendientes = citasReales().filter(c => {
17103:     if (c.estado !== 'Atendida') return false;
17104:     if (c.pago) return false;
17105:     if (kvGet('pago_' + c.id) === '1') return false;
17106:     if (parsePrecio(c.precio) === 0) return false;
17107:     const f = normDate(c.fecha);
17108:     if (!f) return false;
17109:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17110:     return diff >= 3;
17111:   });
17112:   const banner = document.getElementById('bannerCobros');
17113:   const txtEl  = document.getElementById('bannerCobrosTxt');
17114:   const lista  = document.getElementById('bannerCobrosLista');
17115:   if (!banner) return;
17116:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17117:   banner.style.display = 'block';
17118:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17119:   if (lista) lista.innerHTML = pendientes.map(c => {
17120:     const tel = (c.telefono || '').replace(/\D/g, '');
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
17165:   if (dow < 3 || dow > 5) { apagar(); return; }
```
