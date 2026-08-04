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

## Funciones con Gestion en el nombre

### Coincidencia 1 — línea 13801

```html
13795:   el.innerHTML = html;
13796: }
13797: 
13798: // ══════════════════════════════════════════════════════════════
13799: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13800: // ══════════════════════════════════════════════════════════════
13801: function _copyGestionMesKey(d = new Date()) {
13802:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13803: }
13804: 
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
```

### Coincidencia 2 — línea 13805

```html
13799: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13800: // ══════════════════════════════════════════════════════════════
13801: function _copyGestionMesKey(d = new Date()) {
13802:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13803: }
13804: 
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13808:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13809: }
13810: 
13811: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 3 — línea 13811

```html
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13808:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13809: }
13810: 
13811: function _copyGestionTop(map, limit = 5) {
13812:   return Object.entries(map || {})
13813:     .sort((a,b) => b[1] - a[1])
13814:     .slice(0, limit)
13815:     .map(([k,v]) => `${k}: ${v}`)
13816:     .join('\n') || 'Sin datos registrados';
13817: }
```

### Coincidencia 4 — línea 13819

```html
13813:     .sort((a,b) => b[1] - a[1])
13814:     .slice(0, limit)
13815:     .map(([k,v]) => `${k}: ${v}`)
13816:     .join('\n') || 'Sin datos registrados';
13817: }
13818: 
13819: function _copyGestionData() {
13820:   const now = new Date();
13821:   const monthKey = _copyGestionMesKey(now);
13822:   const citasAll = allData.citas || [];
13823:   const eventosAll = allData.eventos || [];
13824:   const pacientesAll = allData.pacientes || [];
13825:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 5 — línea 13909

```html
13903:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13904:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13905:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13906:   };
13907: }
13908: 
13909: function _copyGestionOcupacion(citasProgramadas, date) {
13910:   const y = date.getFullYear(), m = date.getMonth();
13911:   const days = new Date(y, m + 1, 0).getDate();
13912:   let capacidad = 0;
13913:   for (let d = 1; d <= days; d++) {
13914:     const dow = new Date(y, m, d).getDay();
13915:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13923

```html
13917:     else if (dow === 6) capacidad += 2;
13918:     else capacidad += 9;
13919:   }
13920:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13921: }
13922: 
13923: function _copyGestionReactivar(citasAll, pacientesAll) {
13924:   const last = {};
13925:   citasAll.forEach(c => {
13926:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13927:     const key = String(c.nombre).trim().toLowerCase();
13928:     const f = normDate(c.fecha || '');
13929:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13939

```html
13933:   return Object.values(last)
13934:     .filter(p => p.fecha && p.fecha < cutoffStr)
13935:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13936:     .slice(0,40);
13937: }
13938: 
13939: function _copyGestionCandidatosPaquete(citasAll) {
13940:   const map = {};
13941:   citasAll.forEach(c => {
13942:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13943:     const key = String(c.nombre).trim().toLowerCase();
13944:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13945:     map[key].total++;
```

### Coincidencia 8 — línea 13953

```html
13947:     const f = normDate(c.fecha || '');
13948:     if (f > map[key].ultimo) map[key].ultimo = f;
13949:   });
13950:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13951: }
13952: 
13953: function _copyGestionDiagnostico(d) {
13954:   const ok = [];
13955:   const att = [];
13956:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13957:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13958:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13959:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13967

```html
13961:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13962:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13963:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13964:   return {ok, att};
13965: }
13966: 
13967: function _copyGestionAcciones(d) {
13968:   return [
13969:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
13970:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13971:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13972:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13973:     'Revisar el servicio más vendido y crear una oferta complementaria.'
```

### Coincidencia 10 — línea 13977

```html
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
```

### Coincidencia 11 — línea 14014

```html
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
```

### Coincidencia 12 — línea 14136

```html
14130:   const ta = document.getElementById('copyFallbackText');
14131:   ta.value = text;
14132:   modal.style.display = 'flex';
14133:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14134: }
14135: 
14136: function abrirCopiarListaGestion() {
14137:   const d = _copyGestionData();
14138:   const groups = [
14139:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14140:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14141:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14142:   ];
```

### Coincidencia 13 — línea 14147

```html
14141:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14142:   ];
14143:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14144:   return _copyPlainText(text);
14145: }
14146: 
14147: function copiarInfoPersonaGestion() {
14148:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14149:   if (!nombre) return;
14150:   const key = nombre.trim().toLowerCase();
14151:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14152:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14153:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
```

### Coincidencia 14 — línea 14175

```html
14169:     'Historial reciente:',
14170:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14171:   ].join('\n');
14172:   return _copyPlainText(text);
14173: }
14174: 
14175: function abrirMensajeWAGestion() {
14176:   const d = _copyGestionData();
14177:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14178:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14179:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14180:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14181:   _showWhatsAppCopyModal(msg, phone);
```

### Coincidencia 15 — línea 14209

```html
14203:   }
14204:   document.getElementById('waCopyGestionPhone').value = phone || '';
14205:   document.getElementById('waCopyGestionText').value = msg;
14206:   modal.style.display = 'flex';
14207: }
14208: 
14209: function _openWAGestionPrepared() {
14210:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14211:   const text = document.getElementById('waCopyGestionText').value || '';
14212:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14213:   window.open(url, '_blank');
14214: }
14215: 
```

## Funciones relacionadas con copiar

### Coincidencia 1 — línea 13801

```html
13795:   el.innerHTML = html;
13796: }
13797: 
13798: // ══════════════════════════════════════════════════════════════
13799: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13800: // ══════════════════════════════════════════════════════════════
13801: function _copyGestionMesKey(d = new Date()) {
13802:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13803: }
13804: 
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
```

### Coincidencia 2 — línea 13805

```html
13799: // COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
13800: // ══════════════════════════════════════════════════════════════
13801: function _copyGestionMesKey(d = new Date()) {
13802:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13803: }
13804: 
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13808:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13809: }
13810: 
13811: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 3 — línea 13811

```html
13805: function _copyGestionPeriodo() {
13806:   const now = new Date();
13807:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13808:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13809: }
13810: 
13811: function _copyGestionTop(map, limit = 5) {
13812:   return Object.entries(map || {})
13813:     .sort((a,b) => b[1] - a[1])
13814:     .slice(0, limit)
13815:     .map(([k,v]) => `${k}: ${v}`)
13816:     .join('\n') || 'Sin datos registrados';
13817: }
```

### Coincidencia 4 — línea 13819

```html
13813:     .sort((a,b) => b[1] - a[1])
13814:     .slice(0, limit)
13815:     .map(([k,v]) => `${k}: ${v}`)
13816:     .join('\n') || 'Sin datos registrados';
13817: }
13818: 
13819: function _copyGestionData() {
13820:   const now = new Date();
13821:   const monthKey = _copyGestionMesKey(now);
13822:   const citasAll = allData.citas || [];
13823:   const eventosAll = allData.eventos || [];
13824:   const pacientesAll = allData.pacientes || [];
13825:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 5 — línea 13909

```html
13903:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13904:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13905:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13906:   };
13907: }
13908: 
13909: function _copyGestionOcupacion(citasProgramadas, date) {
13910:   const y = date.getFullYear(), m = date.getMonth();
13911:   const days = new Date(y, m + 1, 0).getDate();
13912:   let capacidad = 0;
13913:   for (let d = 1; d <= days; d++) {
13914:     const dow = new Date(y, m, d).getDay();
13915:     if (dow === 0) continue;
```

### Coincidencia 6 — línea 13923

```html
13917:     else if (dow === 6) capacidad += 2;
13918:     else capacidad += 9;
13919:   }
13920:   return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
13921: }
13922: 
13923: function _copyGestionReactivar(citasAll, pacientesAll) {
13924:   const last = {};
13925:   citasAll.forEach(c => {
13926:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13927:     const key = String(c.nombre).trim().toLowerCase();
13928:     const f = normDate(c.fecha || '');
13929:     if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
```

### Coincidencia 7 — línea 13939

```html
13933:   return Object.values(last)
13934:     .filter(p => p.fecha && p.fecha < cutoffStr)
13935:     .sort((a,b) => a.fecha.localeCompare(b.fecha))
13936:     .slice(0,40);
13937: }
13938: 
13939: function _copyGestionCandidatosPaquete(citasAll) {
13940:   const map = {};
13941:   citasAll.forEach(c => {
13942:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13943:     const key = String(c.nombre).trim().toLowerCase();
13944:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13945:     map[key].total++;
```

### Coincidencia 8 — línea 13953

```html
13947:     const f = normDate(c.fecha || '');
13948:     if (f > map[key].ultimo) map[key].ultimo = f;
13949:   });
13950:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13951: }
13952: 
13953: function _copyGestionDiagnostico(d) {
13954:   const ok = [];
13955:   const att = [];
13956:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13957:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13958:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13959:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
```

### Coincidencia 9 — línea 13967

```html
13961:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13962:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13963:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13964:   return {ok, att};
13965: }
13966: 
13967: function _copyGestionAcciones(d) {
13968:   return [
13969:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
13970:     `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
13971:     `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
13972:     'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
13973:     'Revisar el servicio más vendido y crear una oferta complementaria.'
```

### Coincidencia 10 — línea 13977

```html
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
```

### Coincidencia 11 — línea 14014

```html
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
```

### Coincidencia 12 — línea 14088

```html
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
```

### Coincidencia 13 — línea 14101

```html
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
```

### Coincidencia 14 — línea 14111

```html
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
```

### Coincidencia 15 — línea 14136

```html
14130:   const ta = document.getElementById('copyFallbackText');
14131:   ta.value = text;
14132:   modal.style.display = 'flex';
14133:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14134: }
14135: 
14136: function abrirCopiarListaGestion() {
14137:   const d = _copyGestionData();
14138:   const groups = [
14139:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14140:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14141:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14142:   ];
```

### Coincidencia 16 — línea 14184

```html
14178:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14179:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14180:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14181:   _showWhatsAppCopyModal(msg, phone);
14182: }
14183: 
14184: function _showWhatsAppCopyModal(msg, phone='') {
14185:   let modal = document.getElementById('waCopyGestionModal');
14186:   if (!modal) {
14187:     modal = document.createElement('div');
14188:     modal.id = 'waCopyGestionModal';
14189:     modal.className = 'modal-bg';
14190:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
```

### Coincidencia 17 — línea 18816

```html
18810:   _pasCurrent = data.passport || _pasCurrent;
18811:   renderPasaporteAdminTools();
18812:   toast('Pasaporte reactivado', 'success');
18813: }
18814: 
18815: // ── Interceptor WA en desktop: muestra modal para copiar en vez de abrir wa.me ──
18816: (function initWACopyInterceptor() {
18817:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18818:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18819: 
18820:   document.addEventListener('click', function(e) {
18821:     const a = e.target.closest('a[href]');
18822:     if (!a) return;
```

### Coincidencia 18 — línea 18846

```html
18840:       document.getElementById('waOpenLink').href        = 'https://web.whatsapp.com';
18841:     }
18842:     document.getElementById('waCopyModal').style.display = 'flex';
18843:   }); // bubble phase: los onclick inline (markWaSent, etc.) disparan primero, luego prevenimos la navegacion
18844: })();
18845: 
18846: function cerrarWaCopyModal() {
18847:   document.getElementById('waCopyModal').style.display = 'none';
18848: }
18849: 
18850: function copiarMsgWA() {
18851:   const txt = document.getElementById('waCopyText').textContent;
18852:   navigator.clipboard.writeText(txt).then(() => {
```

### Coincidencia 19 — línea 19639

```html
19633:     if (el) el.style.display = t === tab ? 'block' : 'none';
19634:     if (btn) {
19635:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19636:     }
19637:   });
19638: }
19639: function gCopiar(id, btn) {
19640:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19641:   navigator.clipboard.writeText(txt).then(() => {
19642:     const orig = btn.textContent;
19643:     btn.textContent = '✅ Copiado';
19644:     btn.style.background = '#16a34a';
19645:     btn.style.color = '#fff';
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

### Coincidencia 2 — línea 14091

```html
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
```

### Coincidencia 3 — línea 14092

```html
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
```

### Coincidencia 4 — línea 14999

```html
14993: 
14994:   const el = document.getElementById('reporteMesBody');
14995:   // Construir texto plano desde el HTML
14996:   let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
14997:   txt += el.innerText.replace(/\n{3,}/g, '\n\n');
14998: 
14999:   navigator.clipboard.writeText(txt).then(() => {
15000:     const btn = document.getElementById('btnCopiarReporte');
15001:     const orig = btn.innerHTML;
15002:     btn.textContent = '✓ Copiado';
15003:     btn.style.color = 'var(--ok)';
15004:     setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
15005:   }).catch(() => toast('No se pudo copiar', 'err'));
```

### Coincidencia 5 — línea 15287

```html
15281:   line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
15282:   line();
15283:   line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
15284:   line(`implementar esta semana.`);
15285:   line(sep(60));
15286: 
15287:   navigator.clipboard.writeText(t).then(() => {
15288:     const btn = document.getElementById('btnBriefClaude');
15289:     const orig = btn.innerHTML;
15290:     btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
15291:     btn.style.background = 'var(--ok)';
15292:     btn.style.color = '#fff';
15293:     setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
```

### Coincidencia 6 — línea 18719

```html
18713:   window.open(link, '_blank');
18714: }
18715: 
18716: function copiarLinkPas() {
18717:   const link = document.getElementById('pasLinkTexto').textContent;
18718:   if (!link) return;
18719:   navigator.clipboard.writeText(link).then(() => {
18720:     const btn = document.getElementById('pasCopyBtn');
18721:     const orig = btn.textContent;
18722:     btn.textContent = '¡Copiado!';
18723:     setTimeout(() => btn.textContent = orig, 2000);
18724:   });
18725: }
```

### Coincidencia 7 — línea 18852

```html
18846: function cerrarWaCopyModal() {
18847:   document.getElementById('waCopyModal').style.display = 'none';
18848: }
18849: 
18850: function copiarMsgWA() {
18851:   const txt = document.getElementById('waCopyText').textContent;
18852:   navigator.clipboard.writeText(txt).then(() => {
18853:     const btn = document.getElementById('waCopyBtn');
18854:     const orig = btn.textContent;
18855:     btn.textContent = '✅ ¡Copiado!';
18856:     setTimeout(() => btn.textContent = orig, 2500);
18857:     toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
18858:   }).catch(() => {
```

### Coincidencia 8 — línea 19416

```html
19410:   const msg =
19411:     `📅 *Horarios disponibles — ${fechaLegible}*\n` +
19412:     `🩺 Servicio: ${servicio}\n\n` +
19413:     libres.map(h => `✅ ${h}`).join('\n') +
19414:     '\n\n¿Cuál te queda mejor? 😊';
19415: 
19416:   navigator.clipboard.writeText(msg).then(() => {
19417:     const msgEl = document.getElementById('dispCopyMsg');
19418:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19419:   }).catch(() => {
19420:     // Fallback para dispositivos sin clipboard API
19421:     const ta = document.createElement('textarea');
19422:     ta.value = msg; ta.style.position = 'fixed'; ta.style.opacity = '0';
```

### Coincidencia 9 — línea 19573

```html
19567:   toast('Mensaje eliminado', 'ok');
19568: }
19569: 
19570: function copiarMensajePre(id) {
19571:   const m = _getMensajesPre().find(x => x.id === id);
19572:   if (!m) return;
19573:   navigator.clipboard.writeText(m.texto)
19574:     .then(() => toast('Copiado al portapapeles ✓', 'ok'))
19575:     .catch(() => {
19576:       const ta = document.createElement('textarea');
19577:       ta.value = m.texto; document.body.appendChild(ta); ta.select();
19578:       document.execCommand('copy'); document.body.removeChild(ta);
19579:       toast('Copiado al portapapeles ✓', 'ok');
```

### Coincidencia 10 — línea 19641

```html
19635:       btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
19636:     }
19637:   });
19638: }
19639: function gCopiar(id, btn) {
19640:   const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
19641:   navigator.clipboard.writeText(txt).then(() => {
19642:     const orig = btn.textContent;
19643:     btn.textContent = '✅ Copiado';
19644:     btn.style.background = '#16a34a';
19645:     btn.style.color = '#fff';
19646:     setTimeout(() => {
19647:       btn.textContent = orig;
```

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

## Bloque completo de login profesional

Líneas 7045–7125

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

## Bloque completo de login administrativo

Líneas 7210–7285

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
```

## Utilidades de copia y gestión

Líneas 13940–14360

```html
13940:   const map = {};
13941:   citasAll.forEach(c => {
13942:     if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
13943:     const key = String(c.nombre).trim().toLowerCase();
13944:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
13945:     map[key].total++;
13946:     if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
13947:     const f = normDate(c.fecha || '');
13948:     if (f > map[key].ultimo) map[key].ultimo = f;
13949:   });
13950:   return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
13951: }
13952: 
13953: function _copyGestionDiagnostico(d) {
13954:   const ok = [];
13955:   const att = [];
13956:   if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
13957:   else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
13958:   if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
13959:   if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
13960:   if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
13961:   if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
13962:   if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
13963:   if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
13964:   return {ok, att};
13965: }
13966: 
13967: function _copyGestionAcciones(d) {
13968:   return [
13969:     `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
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
14026:     `* Gastos: ${money(d.egresosMes)}`,
14027:     `* Ganancia estimada: ${money(d.ganancia)}`,
14028:     `* Cumplimiento de la meta: ${d.cumplimiento}%`,
14029:     '',
14030:     'OPERACIÓN',
14031:     `* Citas programadas: ${d.citasProgramadas}`,
14032:     `* Sesiones atendidas: ${d.sesionesAtendidas}`,
14033:     `* Cancelaciones: ${d.cancelaciones}`,
14034:     `* No asistencias: ${d.noAsistencias}`,
14035:     `* Ocupación total: ${d.ocupacion}`,
14036:     '',
14037:     'CLIENTES Y VENTAS',
14038:     `* Personas nuevas: ${d.personasNuevas}`,
14039:     `* Personas recurrentes: ${d.personasRecurrentes}`,
14040:     `* Leads recibidos: ${d.leadsRecibidos}`,
14041:     `* Leads convertidos: ${d.leadsConvertidos}`,
14042:     `* Paquetes vendidos: ${d.paquetesVendidos}`,
14043:     `* Ticket promedio: ${money(d.ticketPromedio)}`,
14044:     '',
14045:     'CAPACIDAD DEL EQUIPO',
14046:     `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
14047:     `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
14048:     '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
14049:     '',
14050:     'OPORTUNIDADES',
14051:     `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
14052:     `* Personas para reactivar: ${d.reactivar.length}`,
14053:     `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
14054:     '* Paquetes próximos a terminar: revisar módulo de paquetes.',
14055:     `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
14056:     '',
14057:     'SERVICIOS',
14058:     `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
14059:     `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
14060:     '* Servicios más rentables: revisar estructura de costos.',
14061:     '* Servicios con menor rentabilidad: revisar estructura de costos.',
14062:     '',
14063:     'ACCIONES DEL MES',
14064:     `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
14065:     `* Resultado: ${d.resultadosObtenidos}`,
14066:     '* Ingreso generado: calcular según campañas registradas.',
14067:     '',
14068:     'OBSERVACIONES',
14069:     d.observaciones,
14070:     '',
14071:     'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
14072:     '',
14073:     '1. Diagnóstico del mes.',
14074:     '2. Principales problemas.',
14075:     '3. Oportunidades de ingresos.',
14076:     '4. Cinco acciones prioritarias.',
14077:     '5. Personas o segmentos que debemos contactar.',
14078:     '6. Estrategias para llegar a la meta.',
14079:     '7. Actividades que debe realizar administración.',
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
14121:       <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
14122:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14123:         <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
14124:         <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
14125:       </div>
14126:     </div>`;
14127:     document.body.appendChild(modal);
14128:   }
14129:   document.getElementById('copyFallbackTitle').textContent = title;
14130:   const ta = document.getElementById('copyFallbackText');
14131:   ta.value = text;
14132:   modal.style.display = 'flex';
14133:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14134: }
14135: 
14136: function abrirCopiarListaGestion() {
14137:   const d = _copyGestionData();
14138:   const groups = [
14139:     ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
14140:     ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
14141:     ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
14142:   ];
14143:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14144:   return _copyPlainText(text);
14145: }
14146: 
14147: function copiarInfoPersonaGestion() {
14148:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14149:   if (!nombre) return;
14150:   const key = nombre.trim().toLowerCase();
14151:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14152:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14153:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14154:   const c0 = citas[0];
14155:   const total = citas.length;
14156:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14157:   const text = [
14158:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14159:     '',
14160:     `Nombre: ${c0.nombre}`,
14161:     `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
14162:     `Correo: ${c0.email || 'Sin registrar'}`,
14163:     `Total de citas registradas: ${total}`,
14164:     `Citas confirmadas/atendidas: ${pagado}`,
14165:     `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
14166:     `Último servicio: ${c0.servicio || 'Sin servicio'}`,
14167:     `Estado último registro: ${c0.estado || 'Sin estado'}`,
14168:     '',
14169:     'Historial reciente:',
14170:     ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
14171:   ].join('\n');
14172:   return _copyPlainText(text);
14173: }
14174: 
14175: function abrirMensajeWAGestion() {
14176:   const d = _copyGestionData();
14177:   const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
14178:   const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
14179:   const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
14180:   const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
14181:   _showWhatsAppCopyModal(msg, phone);
14182: }
14183: 
14184: function _showWhatsAppCopyModal(msg, phone='') {
14185:   let modal = document.getElementById('waCopyGestionModal');
14186:   if (!modal) {
14187:     modal = document.createElement('div');
14188:     modal.id = 'waCopyGestionModal';
14189:     modal.className = 'modal-bg';
14190:     modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
14191:     modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
14192:       <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
14193:       <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
14194:       <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
14195:       <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
14196:       <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
14197:         <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
14198:         <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
14199:         <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
14200:       </div>
14201:     </div>`;
14202:     document.body.appendChild(modal);
14203:   }
14204:   document.getElementById('waCopyGestionPhone').value = phone || '';
14205:   document.getElementById('waCopyGestionText').value = msg;
14206:   modal.style.display = 'flex';
14207: }
14208: 
14209: function _openWAGestionPrepared() {
14210:   const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
14211:   const text = document.getElementById('waCopyGestionText').value || '';
14212:   const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
14213:   window.open(url, '_blank');
14214: }
14215: 
14216: // ══════════════════════════════════════════════════════════════
14217: // ── REPORTE FIN DE MES ──
14218: // ══════════════════════════════════════════════════════════════
14219: function abrirReporteMes() {
14220:   const modal = document.getElementById('modalReporteMes');
14221:   modal.style.display = 'flex';
14222:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
14223:   setTimeout(() => {
14224:     const html = _buildReporteMes();
14225:     document.getElementById('reporteMesBody').innerHTML = html;
14226:   }, 80);
14227: }
14228: 
14229: function cerrarReporteMes() {
14230:   document.getElementById('modalReporteMes').style.display = 'none';
14231: }
14232: 
14233: function _toggleEditCostos() {
14234:   const panel   = document.getElementById('costosEditorPanel');
14235:   const compact = document.getElementById('costosVistaCompacta');
14236:   const btn     = document.getElementById('btnEditCostos');
14237:   const open    = panel.style.display === 'none';
14238:   panel.style.display   = open ? 'block' : 'none';
14239:   compact.style.display = open ? 'none'  : 'block';
14240:   btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
14241: }
14242: 
14243: function _leerCamposCostos() {
14244:   const c = {...COSTOS_DEFAULTS};
14245:   document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
14246:     c[inp.dataset.costo] = parseFloat(inp.value) || 0;
14247:   });
14248:   return c;
14249: }
14250: 
14251: function _recalcCostos() {
14252:   const c    = _leerCamposCostos();
14253:   const calc = calcTotalCostos(c);
14254:   const el   = id => document.getElementById(id);
14255:   if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
14256:   if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
14257:   if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
14258:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14259: }
14260: 
14261: function _guardarCostos() {
14262:   const c    = _leerCamposCostos();
14263:   const calc = calcTotalCostos(c);
14264:   saveCostosEstructura(c);
14265: 
14266:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14267:   const cfg = getKPIConfig();
14268:   cfg.meta_ventas_mes = calc.total;
14269:   kvSet('kpiConfig', JSON.stringify(cfg));
14270:   META_VENTAS_MES    = calc.total;
14271:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14272: 
14273:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14274: 
14275:   // Refrescar todo el reporte
14276:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14277:   setTimeout(() => {
14278:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14279:   }, 60);
14280: }
14281: 
14282: function _secTitle(icon, title) {
14283:   return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
14284:     <span style="font-size:1.15rem">${icon}</span>
14285:     <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
14286:   </div>`;
14287: }
14288: 
14289: function _rFila(label, val, color='var(--text)', bold=false) {
14290:   return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14291:     <span style="font-size:.84rem;color:var(--muted)">${label}</span>
14292:     <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
14293:   </div>`;
14294: }
14295: 
14296: function _semCell(val, meta, alto=true) {
14297:   if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
14298:   const ok   = alto ? val >= meta : val <= meta;
14299:   const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
14300:   if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
14301:   if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
14302:   return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
14303: }
14304: 
14305: function _kpiRow(icon, label, valTxt, dot, color, sub) {
14306:   return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
14307:     <span style="font-size:1rem;margin-top:1px">${dot}</span>
14308:     <div style="flex:1;min-width:0">
14309:       <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
14310:         <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
14311:         <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
14312:       </div>
14313:       ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
14314:     </div>
14315:   </div>`;
14316: }
14317: 
14318: function _buildReporteMes() {
14319:   const now  = new Date();
14320:   const m    = now.getMonth() + 1;
14321:   const y    = now.getFullYear();
14322:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14323:   const nomMes = MESES[m - 1];
14324: 
14325:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14326:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14327: 
14328:   const citas  = citasReales();
14329:   const manual = getKPIManual();
14330:   const todasCitas = allData.citas || [];
14331:   const eventosAll = allData.eventos || [];
14332: 
14333:   // ══════════ CÁLCULOS ══════════
14334: 
14335:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
14336:   const metaSesionesMes = META_SESIONES_SEMANA * 4;
14337: 
14338:   // ── Citas del mes ──
14339:   const citasMes = citas.filter(c => {
14340:     const [cy,cm] = normDate(c.fecha).split('-');
14341:     return +cm===m && +cy===y && c.estado !== 'No asistió';
14342:   });
14343:   const noShowsMes = todasCitas.filter(c => {
14344:     const [cy,cm] = normDate(c.fecha).split('-');
14345:     return +cm===m && +cy===y && c.estado === 'No asistió';
14346:   });
14347:   const eventosMes = eventosAll.filter(e => {
14348:     const [cy,cm] = normDate(e.fecha).split('-');
14349:     return +cm===m && +cy===y;
14350:   });
14351:   const totalSesiones = citasMes.length + eventosMes.length;
14352: 
14353:   // ── Financiero ──
14354:   const ventasCobradas = calcCobradoMes();
14355:   const ventasFact = citasMes.reduce((s,c) => s+parsePrecio(c.precio), 0)
14356:                    + eventosMes.reduce((s,e) => s+parsePrecio(e.cobro), 0);
14357:   const ventasPendientes = citasMes.filter(c => !isPagada(c.id))
14358:                             .reduce((s,c) => s+parsePrecio(c.precio), 0);
14359:   const costos = getCostosEstructura();
14360:   const calc   = calcTotalCostos(costos);
```

## Botón y función Registrar pago

Líneas 17090–17165

```html
17090:     if (parsePrecio(c.precio) === 0) return false;
17091:     const f = normDate(c.fecha);
17092:     if (!f) return false;
17093:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17094:     return diff >= 3;
17095:   });
17096:   const banner = document.getElementById('bannerCobros');
17097:   const txtEl  = document.getElementById('bannerCobrosTxt');
17098:   const lista  = document.getElementById('bannerCobrosLista');
17099:   if (!banner) return;
17100:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17101:   banner.style.display = 'block';
17102:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17103:   if (lista) lista.innerHTML = pendientes.map(c => {
17104:     const tel = (c.telefono || '').replace(/\D/g, '');
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
17118:   showView('pagos');
17119:   setTimeout(() => {
17120:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17121:     const selector = document.getElementById('payCitaId');
17122:     if (selector) {
17123:       selector.value = citaId || '';
17124:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17125:       selector.focus();
17126:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17127:     } else {
17128:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17129:     }
17130:   }, 100);
17131: }
17132: 
17133: // ── Alerta semana floja ──
17134: function _checkAlertaSemanFloja(citas) {
17135:   const now = new Date();
17136:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17137:   const hoyStr = today();
17138: 
17139:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17140:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17141:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17142:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17143: 
17144:   const apagar = () => {
17145:     if (dashEl) dashEl.style.display = 'none';
17146:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17147:   };
17148: 
17149:   if (dow < 3 || dow > 5) { apagar(); return; }
17150: 
17151:   // Calcular ingresos semana actual (lunes a hoy)
17152:   const lunes = new Date(now);
17153:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17154:   lunes.setHours(0,0,0,0);
17155: 
17156:   let totalSemActual = 0, nSemActual = 0;
17157:   citas.forEach(c => {
17158:     const f = normDate(c.fecha);
17159:     if (!f) return;
17160:     const fd = new Date(f + 'T12:00:00');
17161:     if (fd >= lunes && f <= hoyStr) {
17162:       totalSemActual += parsePrecio(c.precio);
17163:       nSemActual++;
17164:     }
17165:   });
```
