# Contexto técnico para correcciones del panel

Archivo revisado: `index.html`
Total de líneas: 20245

## Todas las apariciones de copyGestionStatus

### Coincidencia 1 — línea 3957

```html
3951:             <div>
3952:               <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
3953:               <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
3954:                 Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
3955:               </p>
3956:             </div>
3957:             <span id="copyGestionStatusPrincipal" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3958:           </div>
3959:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3960:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3963:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 2 — línea 4020

```html
4014:           <div>
4015:             <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
4016:             <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
4017:               Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
4018:             </p>
4019:           </div>
4020:           <span id="copyGestionStatusSecundario" class="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4021:         </div>
4022:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4023:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4026:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
```

### Coincidencia 3 — línea 14124

```html
14118:   _showCopyFallback(clean);
14119:   return false;
14120: }
14121: 
14122: function _copyOk() {
14123:   toast('Información copiada correctamente', 'ok');
14124:   const estados = document.querySelectorAll('.copyGestionStatus');
14125:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14126:   clearTimeout(window._copyGestionStatusTimer);
14127:   window._copyGestionStatusTimer = setTimeout(() => {
14128:     estados.forEach(el => { el.style.display = 'none'; });
14129:   }, 2200);
14130: }
```

## ID duplicado: emCk_ventas_sem_1

### Coincidencia 1 — línea 4709

```html
4703:             <div class="em-card-body" id="emBody_ventas_sem">
4704:               <div class="em-symptom">💡 <strong>Semana financieramente débil.</strong> Aún hay tiempo de corregir antes de que cierre el mes — actuar esta semana evita que el problema se acumule. Primero verifica que no sea un error de registro (citas atendidas sin precio ingresado) antes de asumir que las ventas realmente bajaron.</div>
4705:               <div class="em-prog-meta" id="emPM_ventas_sem">0 de 5 pasos completados</div>
4706:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_sem" style="width:0%"></div></div>
4707:               <div class="em-steps">
4708:                 <label class="em-step" id="emS_ventas_sem_0" onclick="handleEmStep(event,'ventas_sem',0)"><input type="checkbox" id="emCk_ventas_sem_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Verificar integridad del registro:</strong> abrir Finanzas y revisar que todas las citas atendidas esta semana tienen precio registrado. A veces las ventas están "perdidas" simplemente porque la cita no tiene valor ingresado — eso es un problema de registro, no de ventas.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4709:                 <label class="em-step" id="emS_ventas_sem_1" onclick="handleEmStep(event,'ventas_sem',1)"><input type="checkbox" id="emCk_ventas_sem_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Calcular el gap exacto:</strong> ¿cuánto falta para llegar a la meta semanal? ¿Cuántas citas adicionales necesitas a precio promedio para cerrar ese gap? Ese es el número concreto que persigues hoy.</span></label>
4710:                 <label class="em-step" id="emS_ventas_sem_2" onclick="handleEmStep(event,'ventas_sem',2)"><input type="checkbox" id="emCk_ventas_sem_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer paquete a pacientes en sesión suelta:</strong> cuando un paciente viene a una cita individual, la auxiliar debe siempre mencionar el paquete equivalente: <em>"¿Sabías que si agendas 3 sesiones juntas ahorras $27.000? ¿Te lo separo con el mismo horario?"</em> El upgrade en el momento de la cita tiene 40–60% de cierre.</span></label>
4711:                 <label class="em-step" id="emS_ventas_sem_3" onclick="handleEmStep(event,'ventas_sem',3)"><input type="checkbox" id="emCk_ventas_sem_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Reactivar pacientes inactivos con WhatsApp personalizado:</strong> desde Recordatorios, contactar 3–5 pacientes que no han vuelto en 30–60 días. Un paciente que ya confió en ti convierte 5× más fácil que uno nuevo.</span><button class="em-goto" onclick="event.stopPropagation();showView('recordatorios')">Recordatorios →</button></label>
4712:                 <label class="em-step" id="emS_ventas_sem_4" onclick="handleEmStep(event,'ventas_sem',4)"><input type="checkbox" id="emCk_ventas_sem_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Historia de urgencia en redes:</strong> publicar disponibilidad real para esta semana con CTA directo. No una oferta de descuento — solo mostrar los horarios disponibles genera urgencia genuina sin devaluar el servicio.</span></label>
4713:               </div>
4714:               <div class="em-card-footer">
4715:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
```

## Declaraciones de globalSearch

### Coincidencia 1 — línea 9531

```html
9525:   document.getElementById('reporteMesTitulo').textContent = 'Cobros pendientes esta semana';
9526:   document.getElementById('reporteMesBody').innerHTML = html;
9527:   document.getElementById('modalReporteMes').style.display = 'flex';
9528: }
9529: 
9530: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9531: function globalSearch(val) {
9532:   if (!val || !val.trim()) return;
9533:   const q = val.trim().toLowerCase();
9534: 
9535:   // ¿Es un paciente?
9536:   const esPaciente = (allData.citas || []).some(c =>
9537:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
```

## Declaración de copyGestionTexto

### Coincidencia 1 — línea 14031

```html
14025:   } else {
14026:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14027:   }
14028:   return _copyPlainText(text);
14029: }
14030: 
14031: function copyGestionTexto(kind) {
14032:   return _copyGestionTexto(kind);
14033: }
14034: 
14035: function _copyGestionAsesorText(d) {
14036:   const money = v => fmtPeso(v || 0);
14037:   return [
```

## Funciones con Gestion en el nombre

### Coincidencia 1 — línea 13818

```html
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
```

### Coincidencia 2 — línea 13822

```html
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
```

### Coincidencia 3 — línea 13828

```html
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
```

### Coincidencia 4 — línea 13836

```html
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
```

### Coincidencia 5 — línea 13926

```html
13920:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13921:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13922:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13923:   };
13924: }
13925: 
13926: function _copyGestionOcupacion(citasProgramadas, date) {
13927:   const y = date.getFullYear(), m = date.getMonth();
13928:   const days = new Date(y, m + 1, 0).getDate();
13929:   let capacidad = 0;
13930:   for (let d = 1; d <= days; d++) {
13931:     const dow = new Date(y, m, d).getDay();
13932:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13940

```html
13934:     else if (dow === 6) capacidad += 2;
13935:     else capacidad += 9;
13936:   }
13937:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13938: }
13939: 
13940: function _copyGestionReactivar(citasAll, pacientesAll) {
13941:   const last = {};
13942:   citasAll.forEach(c => {
13943:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13944:     const key = String(c.nombre).trim().toLowerCase();
13945:     const f = normDate(c.fecha || '');
13946:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13956

```html
13950:   return Object.values(last)
13951:     .filter(p => p.fecha && p.fecha < cutoffStr)
13952:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13953:     .slice(0,40);
13954: }
13955: 
13956: function _copyGestionCandidatosPaquete(citasAll) {
13957:   const map = {};
13958:   citasAll.forEach(c => {
13959:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13960:     const key = String(c.nombre).trim().toLowerCase();
13961:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13962:     map[key].total++;
```

### Coincidencia 8 — línea 13970

```html
13964:     const f = normDate(c.fecha || '');
13965:     if (f > map[key].ultimo) map[key].ultimo = f;
13966:   });
13967:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13968: }
13969: 
13970: function _copyGestionDiagnostico(d) {
13971:   const ok = [];
13972:   const att = [];
13973:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13974:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13975:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13976:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13984

```html
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
```

### Coincidencia 10 — línea 13994

```html
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
```

### Coincidencia 11 — línea 14031

```html
14025:   } else {
14026:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14027:   }
14028:   return _copyPlainText(text);
14029: }
14030: 
14031: function copyGestionTexto(kind) {
14032:   return _copyGestionTexto(kind);
14033: }
14034: 
14035: function _copyGestionAsesorText(d) {
14036:   const money = v => fmtPeso(v || 0);
14037:   return [
```

### Coincidencia 12 — línea 14035

```html
14029: }
14030: 
14031: function copyGestionTexto(kind) {
14032:   return _copyGestionTexto(kind);
14033: }
14034: 
14035: function _copyGestionAsesorText(d) {
14036:   const money = v => fmtPeso(v || 0);
14037:   return [
14038:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14039:     '',
14040:     `Periodo: ${d.periodo}`,
14041:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 13 — línea 14157

```html
14151:   const ta = document.getElementById('copyFallbackText');
14152:   ta.value = text;
14153:   modal.style.display = 'flex';
14154:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14155: }
14156: 
14157: function abrirCopiarListaGestion() {
14158:   const d = _copyGestionData();
14159:   const groups = [
14160:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14161:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14162:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14163:   ];
```

### Coincidencia 14 — línea 14168

```html
14162:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14163:   ];
14164:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14165:   return _copyPlainText(text);
14166: }
14167: 
14168: function copiarInfoPersonaGestion() {
14169:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14170:   if (!nombre) return;
14171:   const key = nombre.trim().toLowerCase();
14172:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14173:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14174:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
```

### Coincidencia 15 — línea 14196

```html
14190:     'Historial reciente:',
14191:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14192:   ].join('\n');
14193:   return _copyPlainText(text);
14194: }
14195: 
14196: function abrirMensajeWAGestion() {
14197:   const d = _copyGestionData();
14198:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14199:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14200:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14201:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14202:   _showWhatsAppCopyModal(msg, phone);
```

### Coincidencia 16 — línea 14230

```html
14224:   }
14225:   document.getElementById('waCopyGestionPhone').value = phone || '';
14226:   document.getElementById('waCopyGestionText').value = msg;
14227:   modal.style.display = 'flex';
14228: }
14229: 
14230: function _openWAGestionPrepared() {
14231:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14232:   const text = document.getElementById('waCopyGestionText').value || '';
14233:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14234:   window.open(url, '_blank');
14235: }
14236: 
```

## Funciones relacionadas con copiar

### Coincidencia 1 — línea 13818

```html
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
```

### Coincidencia 2 — línea 13822

```html
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
```

### Coincidencia 3 — línea 13828

```html
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
```

### Coincidencia 4 — línea 13836

```html
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
```

### Coincidencia 5 — línea 13926

```html
13920:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13921:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13922:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13923:   };
13924: }
13925: 
13926: function _copyGestionOcupacion(citasProgramadas, date) {
13927:   const y = date.getFullYear(), m = date.getMonth();
13928:   const days = new Date(y, m + 1, 0).getDate();
13929:   let capacidad = 0;
13930:   for (let d = 1; d <= days; d++) {
13931:     const dow = new Date(y, m, d).getDay();
13932:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13940

```html
13934:     else if (dow === 6) capacidad += 2;
13935:     else capacidad += 9;
13936:   }
13937:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13938: }
13939: 
13940: function _copyGestionReactivar(citasAll, pacientesAll) {
13941:   const last = {};
13942:   citasAll.forEach(c => {
13943:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13944:     const key = String(c.nombre).trim().toLowerCase();
13945:     const f = normDate(c.fecha || '');
13946:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13956

```html
13950:   return Object.values(last)
13951:     .filter(p => p.fecha && p.fecha < cutoffStr)
13952:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13953:     .slice(0,40);
13954: }
13955: 
13956: function _copyGestionCandidatosPaquete(citasAll) {
13957:   const map = {};
13958:   citasAll.forEach(c => {
13959:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13960:     const key = String(c.nombre).trim().toLowerCase();
13961:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13962:     map[key].total++;
```

### Coincidencia 8 — línea 13970

```html
13964:     const f = normDate(c.fecha || '');
13965:     if (f > map[key].ultimo) map[key].ultimo = f;
13966:   });
13967:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13968: }
13969: 
13970: function _copyGestionDiagnostico(d) {
13971:   const ok = [];
13972:   const att = [];
13973:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13974:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13975:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13976:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13984

```html
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
```

### Coincidencia 10 — línea 13994

```html
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
```

### Coincidencia 11 — línea 14035

```html
14029: }
14030: 
14031: function copyGestionTexto(kind) {
14032:   return _copyGestionTexto(kind);
14033: }
14034: 
14035: function _copyGestionAsesorText(d) {
14036:   const money = v => fmtPeso(v || 0);
14037:   return [
14038:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14039:     '',
14040:     `Periodo: ${d.periodo}`,
14041:     `Meta mensual: ${money(d.metaMensual)}`,
```

### Coincidencia 12 — línea 14109

```html
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
```

### Coincidencia 13 — línea 14122

```html
14116:     }
14117:   } catch(e) {}
14118:   _showCopyFallback(clean);
14119:   return false;
14120: }
14121: 
14122: function _copyOk() {
14123:   toast('Información copiada correctamente', 'ok');
14124:   const estados = document.querySelectorAll('.copyGestionStatus');
14125:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14126:   clearTimeout(window._copyGestionStatusTimer);
14127:   window._copyGestionStatusTimer = setTimeout(() => {
14128:     estados.forEach(el => { el.style.display = 'none'; });
```

### Coincidencia 14 — línea 14132

```html
14126:   clearTimeout(window._copyGestionStatusTimer);
14127:   window._copyGestionStatusTimer = setTimeout(() => {
14128:     estados.forEach(el => { el.style.display = 'none'; });
14129:   }, 2200);
14130: }
14131: 
14132: function _showCopyFallback(text, title='Copiar manualmente') {
14133:   let modal = document.getElementById('copyFallbackModal');
14134:   if (!modal) {
14135:     modal = document.createElement('div');
14136:     modal.id = 'copyFallbackModal';
14137:     modal.className = 'modal-bg';
14138:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 15 — línea 14157

```html
14151:   const ta = document.getElementById('copyFallbackText');
14152:   ta.value = text;
14153:   modal.style.display = 'flex';
14154:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14155: }
14156: 
14157: function abrirCopiarListaGestion() {
14158:   const d = _copyGestionData();
14159:   const groups = [
14160:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14161:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14162:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14163:   ];
```

### Coincidencia 16 — línea 14205

```html
14199:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14200:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14201:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14202:   _showWhatsAppCopyModal(msg, phone);
14203: }
14204: 
14205: function _showWhatsAppCopyModal(msg, phone='') {
14206:   let modal = document.getElementById('waCopyGestionModal');
14207:   if (!modal) {
14208:     modal = document.createElement('div');
14209:     modal.id = 'waCopyGestionModal';
14210:     modal.className = 'modal-bg';
14211:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 17 — línea 18840

```html
18834:   _pasCurrent = data.passport || _pasCurrent;
18835:   renderPasaporteAdminTools();
18836:   toast('Pasaporte reactivado', 'success');
18837: }
18838: 
18839: // ── Interceptor WA en desktop: muestra modal para copiar en vez de abrir wa.me ──
18840: (function initWACopyInterceptor() {
18841:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18842:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18843: 
18844:   document.addEventListener('click', function(e) {
18845:     const a = e.target.closest('a[href]');
18846:     if (!a) return;
```

### Coincidencia 18 — línea 18870

```html
18864:       document.getElementById('waOpenLink').href        = 'https://web.whatsapp.com';
18865:     }
18866:     document.getElementById('waCopyModal').style.display = 'flex';
18867:   }); // bubble phase: los onclick inline (markWaSent, etc.) disparan primero, luego prevenimos la navegacion
18868: })();
18869: 
18870: function cerrarWaCopyModal() {
18871:   document.getElementById('waCopyModal').style.display = 'none';
18872: }
18873: 
18874: function copiarMsgWA() {
18875:   const txt = document.getElementById('waCopyText').textContent;
18876:   navigator.clipboard.writeText(txt).then(() => {
```

### Coincidencia 19 — línea 19663

```html
19657:     if (el) el.style.display = t === tab ? 'block' : 'none';
19658:     if (btn) {
19659:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19660:     }
19661:   });
19662: }
19663: function gCopiar(id, btn) {
19664:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19665:   navigator.clipboard.writeText(txt).then(() => {
19666:     const orig = btn.textContent;
19667:     btn.textContent = '✅ Copiado';
19668:     btn.style.background = '#16a34a';
19669:     btn.style.color = '#fff';
```

## Uso de navigator.clipboard

### Coincidencia 1 — línea 6587

```html
6581: }
6582: 
6583: async function copyTempPassword() {
6584:   const value = document.getElementById('tempPassValue').textContent.trim();
6585:   if (!value) return;
6586:   try {
6587:     await navigator.clipboard.writeText(value);
6588:     toast('Contraseña copiada');
6589:   } catch(e) {
6590:     const ta = document.createElement('textarea');
6591:     ta.value = value;
6592:     document.body.appendChild(ta);
6593:     ta.select();
```

### Coincidencia 2 — línea 14112

```html
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
```

### Coincidencia 3 — línea 14113

```html
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
```

### Coincidencia 4 — línea 15020

```html
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
15024:     btn.style.color = 'var(--ok)';
15025:     setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
15026:   }).catch(() => toast('No se pudo copiar', 'err'));
```

### Coincidencia 5 — línea 15308

```html
15302:   line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
15303:   line();
15304:   line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
15305:   line(`implementar esta semana.`);
15306:   line(sep(60));
15307: 
15308:   navigator.clipboard.writeText(t).then(() => {
15309:     const btn = document.getElementById('btnBriefClaude');
15310:     const orig = btn.innerHTML;
15311:     btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
15312:     btn.style.background = 'var(--ok)';
15313:     btn.style.color = '#fff';
15314:     setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
```

### Coincidencia 6 — línea 18743

```html
18737:   window.open(link, '_blank');
18738: }
18739: 
18740: function copiarLinkPas() {
18741:   const link = document.getElementById('pasLinkTexto').textContent;
18742:   if (!link) return;
18743:   navigator.clipboard.writeText(link).then(() => {
18744:     const btn = document.getElementById('pasCopyBtn');
18745:     const orig = btn.textContent;
18746:     btn.textContent = '¡Copiado!';
18747:     setTimeout(() => btn.textContent = orig, 2000);
18748:   });
18749: }
```

### Coincidencia 7 — línea 18876

```html
18870: function cerrarWaCopyModal() {
18871:   document.getElementById('waCopyModal').style.display = 'none';
18872: }
18873: 
18874: function copiarMsgWA() {
18875:   const txt = document.getElementById('waCopyText').textContent;
18876:   navigator.clipboard.writeText(txt).then(() => {
18877:     const btn = document.getElementById('waCopyBtn');
18878:     const orig = btn.textContent;
18879:     btn.textContent = '✅ ¡Copiado!';
18880:     setTimeout(() => btn.textContent = orig, 2500);
18881:     toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
18882:   }).catch(() => {
```

### Coincidencia 8 — línea 19440

```html
19434:   const msg =
19435:     `📅 *Horarios disponibles — ${fechaLegible}*\n` +
19436:     `🩺 Servicio: ${servicio}\n\n` +
19437:     libres.map(h => `✅ ${h}`).join('\n') +
19438:     '\n\n¿Cuál te queda mejor? 😊';
19439: 
19440:   navigator.clipboard.writeText(msg).then(() => {
19441:     const msgEl = document.getElementById('dispCopyMsg');
19442:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19443:   }).catch(() => {
19444:     // Fallback para dispositivos sin clipboard API
19445:     const ta = document.createElement('textarea');
19446:     ta.value = msg; ta.style.position = 'fixed'; ta.style.opacity = '0';
```

### Coincidencia 9 — línea 19597

```html
19591:   toast('Mensaje eliminado', 'ok');
19592: }
19593: 
19594: function copiarMensajePre(id) {
19595:   const m = _getMensajesPre().find(x => x.id === id);
19596:   if (!m) return;
19597:   navigator.clipboard.writeText(m.texto)
19598:     .then(() => toast('Copiado al portapapeles ✓', 'ok'))
19599:     .catch(() => {
19600:       const ta = document.createElement('textarea');
19601:       ta.value = m.texto; document.body.appendChild(ta); ta.select();
19602:       document.execCommand('copy'); document.body.removeChild(ta);
19603:       toast('Copiado al portapapeles ✓', 'ok');
```

### Coincidencia 10 — línea 19665

```html
19659:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19660:     }
19661:   });
19662: }
19663: function gCopiar(id, btn) {
19664:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19665:   navigator.clipboard.writeText(txt).then(() => {
19666:     const orig = btn.textContent;
19667:     btn.textContent = '✅ Copiado';
19668:     btn.style.background = '#16a34a';
19669:     btn.style.color = '#fff';
19670:     setTimeout(() => {
19671:       btn.textContent = orig;
```

## Declaración de openPago

### Coincidencia 1 — línea 17141

```html
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
```

## Referencias a openPago

### Coincidencia 1 — línea 17135

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
```

### Coincidencia 2 — línea 17141

```html
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
```

## Acción adminLogin

### Coincidencia 1 — línea 7266

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
```

## Variables loginUrl

No se encontraron coincidencias.

## Funciones relacionadas con login

### Coincidencia 1 — línea 7078

```html
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
```

### Coincidencia 2 — línea 7084

```html
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
```

### Coincidencia 3 — línea 7089

```html
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
```

### Coincidencia 4 — línea 7249

```html
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
```

### Coincidencia 5 — línea 8873

```html
8867: 
8868: function ordinalES(n) {
8869:   const s = ['','ra','da','ra','ta','ta','ta','ma','va','na','ma'];
8870:   return n + (n <= 10 ? s[n] : 'ra');
8871: }
8872: 
8873: function getInfoSesion(nombre, servicio, fecha) {
8874:   const total = sesionesPorPaquete[servicio];
8875:   if (!total) return null;
8876:   const norm  = (nombre||'').toLowerCase().trim();
8877:   const hasta = normDate(fecha);
8878:   const lista = (allData && allData.citas) ? allData.citas : [];
8879:   const numero = lista.filter(c =>
```

### Coincidencia 6 — línea 10382

```html
10376:     btn.style.color = 'var(--muted)';
10377:     icon.textContent  = '🚫';
10378:     label.textContent = 'Sin cobro de desplazamiento';
10379:   }
10380: }
10381: 
10382: function updateSesionesInfo() {
10383:   const serv   = document.getElementById('ncService').value;
10384:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10385:   const el     = document.getElementById('ncSesionesInfo');
10386:   if (!el) return;
10387:   const n = sesionesPorPaquete[serv];
10388:   if (n) {
```

### Coincidencia 7 — línea 18173

```html
18167:   const asignados = _getPkAsignados();
18168:   asignados.push({ paciente, telefono:tel, nombre:pl.nombre, sesiones:+pl.sesiones, consumidas:0, precio:pl.precio, fechaCompra:fechaC, vencimiento:vigD.toLocalDateStr(), notas });
18169:   _savePkAsignados(asignados);
18170:   document.getElementById('modalPaquete').style.display='none';
18171:   renderPaquetes(); toast('Paquete asignado ✓');
18172: }
18173: function usarSesion(idx) {
18174:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18175:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18176:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18177:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18178: }
18179: function ajustarSesiones(idx) {
```

### Coincidencia 8 — línea 18179

```html
18173: function usarSesion(idx) {
18174:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18175:   if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
18176:   p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
18177:   renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
18178: }
18179: function ajustarSesiones(idx) {
18180:   const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
18181:   const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
18182:   if (val === null) return;
18183:   const n = parseInt(val, 10);
18184:   if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
18185:   if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
```

## AbortController

### Coincidencia 1 — línea 7057

```html
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
```

## Llamadas fetch con señal

### Coincidencia 1 — línea 7060

```html
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
```

## Estados de pago canónicos

### Coincidencia 1 — línea 6914

```html
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
```

### Coincidencia 2 — línea 6968

```html
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
```

### Coincidencia 3 — línea 6969

```html
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
```

### Coincidencia 4 — línea 6970

```html
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
```

### Coincidencia 5 — línea 6986

```html
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
```

### Coincidencia 6 — línea 6986

```html
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
```

### Coincidencia 7 — línea 6999

```html
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
```

### Coincidencia 8 — línea 6999

```html
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
```

### Coincidencia 9 — línea 7000

```html
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 10 — línea 7000

```html
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
```

### Coincidencia 11 — línea 7001

```html
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
```

## Bloque completo de login profesional

Líneas 7045–7125

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

## Bloque completo de login administrativo

Líneas 7210–7285

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
```

## Utilidades de copia y gestión

Líneas 13940–14360

```html
13940: function _copyGestionReactivar(citasAll, pacientesAll) {
13941:   const last = {};
13942:   citasAll.forEach(c => {
13943:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13944:     const key = String(c.nombre).trim().toLowerCase();
13945:     const f = normDate(c.fecha || '');
13946:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
13947:   });
13948:   const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 42);
13949:   const cutoffStr = normDate(cutoff);
13950:   return Object.values(last)
13951:     .filter(p => p.fecha && p.fecha < cutoffStr)
13952:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13953:     .slice(0,40);
13954: }
13955: 
13956: function _copyGestionCandidatosPaquete(citasAll) {
13957:   const map = {};
13958:   citasAll.forEach(c => {
13959:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13960:     const key = String(c.nombre).trim().toLowerCase();
13961:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13962:     map[key].total++;
13963:     if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
13964:     const f = normDate(c.fecha || '');
13965:     if (f > map[key].ultimo) map[key].ultimo = f;
13966:   });
13967:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13968: }
13969: 
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
14026:     text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
14027:   }
14028:   return _copyPlainText(text);
14029: }
14030: 
14031: function copyGestionTexto(kind) {
14032:   return _copyGestionTexto(kind);
14033: }
14034: 
14035: function _copyGestionAsesorText(d) {
14036:   const money = v => fmtPeso(v || 0);
14037:   return [
14038:     'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
14039:     '',
14040:     `Periodo: ${d.periodo}`,
14041:     `Meta mensual: ${money(d.metaMensual)}`,
14042:     '',
14043:     'RESUMEN FINANCIERO',
14044:     `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
14045:     `* Ventas generadas: ${money(d.ventasGeneradas)}`,
14046:     `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
14047:     `* Gastos: ${money(d.egresosMes)}`,
14048:     `* Ganancia estimada: ${money(d.ganancia)}`,
14049:     `* Cumplimiento de la meta: ${d.cumplimiento}%`,
14050:     '',
14051:     'OPERACIÓN',
14052:     `* Citas programadas: ${d.citasProgramadas}`,
14053:     `* Sesiones atendidas: ${d.sesionesAtendidas}`,
14054:     `* Cancelaciones: ${d.cancelaciones}`,
14055:     `* No asistencias: ${d.noAsistencias}`,
14056:     `* Ocupación total: ${d.ocupacion}`,
14057:     '',
14058:     'CLIENTES Y VENTAS',
14059:     `* Personas nuevas: ${d.personasNuevas}`,
14060:     `* Personas recurrentes: ${d.personasRecurrentes}`,
14061:     `* Leads recibidos: ${d.leadsRecibidos}`,
14062:     `* Leads convertidos: ${d.leadsConvertidos}`,
14063:     `* Paquetes vendidos: ${d.paquetesVendidos}`,
14064:     `* Ticket promedio: ${money(d.ticketPromedio)}`,
14065:     '',
14066:     'CAPACIDAD DEL EQUIPO',
14067:     `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
14068:     `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
14069:     '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
14070:     '',
14071:     'OPORTUNIDADES',
14072:     `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
14073:     `* Personas para reactivar: ${d.reactivar.length}`,
14074:     `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
14075:     '* Paquetes próximos a terminar: revisar módulo de paquetes.',
14076:     `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
14077:     '',
14078:     'SERVICIOS',
14079:     `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
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
14121: 
14122: function _copyOk() {
14123:   toast('Información copiada correctamente', 'ok');
14124:   const estados = document.querySelectorAll('.copyGestionStatus');
14125:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14126:   clearTimeout(window._copyGestionStatusTimer);
14127:   window._copyGestionStatusTimer = setTimeout(() => {
14128:     estados.forEach(el => { el.style.display = 'none'; });
14129:   }, 2200);
14130: }
14131: 
14132: function _showCopyFallback(text, title='Copiar manualmente') {
14133:   let modal = document.getElementById('copyFallbackModal');
14134:   if (!modal) {
14135:     modal = document.createElement('div');
14136:     modal.id = 'copyFallbackModal';
14137:     modal.className = 'modal-bg';
14138:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14139:     modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14140:       <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
14141:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
14142:       <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
14143:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14144:         <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
14145:         <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
14146:       </div>
14147:     </div>`;
14148:     document.body.appendChild(modal);
14149:   }
14150:   document.getElementById('copyFallbackTitle').textContent = title;
14151:   const ta = document.getElementById('copyFallbackText');
14152:   ta.value = text;
14153:   modal.style.display = 'flex';
14154:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14155: }
14156: 
14157: function abrirCopiarListaGestion() {
14158:   const d = _copyGestionData();
14159:   const groups = [
14160:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14161:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14162:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14163:   ];
14164:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14165:   return _copyPlainText(text);
14166: }
14167: 
14168: function copiarInfoPersonaGestion() {
14169:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14170:   if (!nombre) return;
14171:   const key = nombre.trim().toLowerCase();
14172:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14173:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14174:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14175:   const c0 = citas[0];
14176:   const total = citas.length;
14177:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14178:   const text = [
14179:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14180:     '',
14181:     `Nombre: ${c0.nombre}`,
14182:     `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
14183:     `Correo: ${c0.email || 'Sin registrar'}`,
14184:     `Total de citas registradas: ${total}`,
14185:     `Citas confirmadas/atendidas: ${pagado}`,
14186:     `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
14187:     `Último servicio: ${c0.servicio || 'Sin servicio'}`,
14188:     `Estado último registro: ${c0.estado || 'Sin estado'}`,
14189:     '',
14190:     'Historial reciente:',
14191:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14192:   ].join('\n');
14193:   return _copyPlainText(text);
14194: }
14195: 
14196: function abrirMensajeWAGestion() {
14197:   const d = _copyGestionData();
14198:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14199:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14200:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14201:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14202:   _showWhatsAppCopyModal(msg, phone);
14203: }
14204: 
14205: function _showWhatsAppCopyModal(msg, phone='') {
14206:   let modal = document.getElementById('waCopyGestionModal');
14207:   if (!modal) {
14208:     modal = document.createElement('div');
14209:     modal.id = 'waCopyGestionModal';
14210:     modal.className = 'modal-bg';
14211:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14212:     modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14213:       <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
14214:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
14215:       <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
14216:       <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
14217:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14218:         <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
14219:         <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
14220:         <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
14221:       </div>
14222:     </div>`;
14223:     document.body.appendChild(modal);
14224:   }
14225:   document.getElementById('waCopyGestionPhone').value = phone || '';
14226:   document.getElementById('waCopyGestionText').value = msg;
14227:   modal.style.display = 'flex';
14228: }
14229: 
14230: function _openWAGestionPrepared() {
14231:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14232:   const text = document.getElementById('waCopyGestionText').value || '';
14233:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14234:   window.open(url, '_blank');
14235: }
14236: 
14237: // ══════════════════════════════════════════════════════════════
14238: // ── REPORTE FIN DE MES ──
14239: // ══════════════════════════════════════════════════════════════
14240: function abrirReporteMes() {
14241:   const modal = document.getElementById('modalReporteMes');
14242:   modal.style.display = 'flex';
14243:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
14244:   setTimeout(() => {
14245:     const html = _buildReporteMes();
14246:     document.getElementById('reporteMesBody').innerHTML = html;
14247:   }, 80);
14248: }
14249: 
14250: function cerrarReporteMes() {
14251:   document.getElementById('modalReporteMes').style.display = 'none';
14252: }
14253: 
14254: function _toggleEditCostos() {
14255:   const panel   = document.getElementById('costosEditorPanel');
14256:   const compact = document.getElementById('costosVistaCompacta');
14257:   const btn     = document.getElementById('btnEditCostos');
14258:   const open    = panel.style.display === 'none';
14259:   panel.style.display   = open ? 'block' : 'none';
14260:   compact.style.display = open ? 'none'  : 'block';
14261:   btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
14262: }
14263: 
14264: function _leerCamposCostos() {
14265:   const c = {...COSTOS_DEFAULTS};
14266:   document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
14267:     c[inp.dataset.costo] = parseFloat(inp.value) || 0;
14268:   });
14269:   return c;
14270: }
14271: 
14272: function _recalcCostos() {
14273:   const c    = _leerCamposCostos();
14274:   const calc = calcTotalCostos(c);
14275:   const el   = id => document.getElementById(id);
14276:   if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
14277:   if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
14278:   if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
14279:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14280: }
14281: 
14282: function _guardarCostos() {
14283:   const c    = _leerCamposCostos();
14284:   const calc = calcTotalCostos(c);
14285:   saveCostosEstructura(c);
14286: 
14287:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14288:   const cfg = getKPIConfig();
14289:   cfg.meta_ventas_mes = calc.total;
14290:   kvSet('kpiConfig', JSON.stringify(cfg));
14291:   META_VENTAS_MES    = calc.total;
14292:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14293: 
14294:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14295: 
14296:   // Refrescar todo el reporte
14297:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14298:   setTimeout(() => {
14299:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14300:   }, 60);
14301: }
14302: 
14303: function _secTitle(icon, title) {
14304:   return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
14305:     <span style="font-size:1.15rem">${icon}</span>
14306:     <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
14307:   </div>`;
14308: }
14309: 
14310: function _rFila(label, val, color='var(--text)', bold=false) {
14311:   return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14312:     <span style="font-size:.84rem;color:var(--muted)">${label}</span>
14313:     <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
14314:   </div>`;
14315: }
14316: 
14317: function _semCell(val, meta, alto=true) {
14318:   if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
14319:   const ok   = alto ? val >= meta : val <= meta;
14320:   const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
14321:   if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
14322:   if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
14323:   return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
14324: }
14325: 
14326: function _kpiRow(icon, label, valTxt, dot, color, sub) {
14327:   return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
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
14353: 
14354:   // ══════════ CÁLCULOS ══════════
14355: 
14356:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
14357:   const metaSesionesMes = META_SESIONES_SEMANA * 4;
14358: 
14359:   // ── Citas del mes ──
14360:   const citasMes = citas.filter(c => {
```

## Botón y función Registrar pago

Líneas 17090–17165

```html
17090:   window._autoAtendidaList = pendientes;
17091:   const banner = document.getElementById('bannerAutoAtendida');
17092:   const txt    = document.getElementById('bannerAutoAtendidaTxt');
17093:   if (!banner) return;
17094:   banner.style.display = pendientes.length > 0 ? 'flex' : 'none';
17095:   if (txt && pendientes.length) txt.textContent = `${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pasada${pendientes.length !== 1 ? 's' : ''} aún sin marcar como Atendida`;
17096: }
17097: 
17098: async function marcarTodasAtendidas() {
17099:   const pendientes = window._autoAtendidaList || [];
17100:   if (!pendientes.length) { toast('No hay citas pendientes de cierre.'); return; }
17101:   window._agendaFiltroPendienteCierre = true;
17102:   showView('agenda');
17103:   if (typeof renderAgenda === 'function') renderAgenda();
17104:   toast(`${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} de cierre. Revísalas manualmente.`);
17105: }
17106: 
17107: // ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
17108: function _checkCobrosPendientes() {
17109:   const hoyStr = today();
17110:   const pendientes = citasReales().filter(c => {
17111:     if (c.estado !== 'Atendida') return false;
17112:     if (c.pago) return false;
17113:     if (kvGet('pago_' + c.id) === '1') return false;
17114:     if (parsePrecio(c.precio) === 0) return false;
17115:     const f = normDate(c.fecha);
17116:     if (!f) return false;
17117:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17118:     return diff >= 3;
17119:   });
17120:   const banner = document.getElementById('bannerCobros');
17121:   const txtEl  = document.getElementById('bannerCobrosTxt');
17122:   const lista  = document.getElementById('bannerCobrosLista');
17123:   if (!banner) return;
17124:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17125:   banner.style.display = 'block';
17126:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17127:   if (lista) lista.innerHTML = pendientes.map(c => {
17128:     const tel = (c.telefono || '').replace(/\D/g, '');
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
```
