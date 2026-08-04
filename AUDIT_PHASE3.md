# Contexto exacto para fase 3

Archivo: `index.html`

## kpiLoadBtn

### Coincidencia 1 — línea 4769

```html
4759:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4760:               <span class="em-sev c">🔴 Crítico</span>
4761:               <span class="em-card-time">⏱ 48 h</span>
4762:               <span class="em-carr">▼</span>
4763:             </div>
4764:             <div class="em-card-body" id="emBody_nps">
4765:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4766:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4767:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4768:               <div class="em-steps">
4769:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('kpiLoadBtn') && document.getElementById('kpiLoadBtn').click()">Cargar encuestas →</button></label>
4770:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4771:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4772:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4773:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4774:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4775:               </div>
4776:               <div class="em-card-footer">
4777:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4778:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4779:               </div>
```

### Coincidencia 2 — línea 4769

```html
4759:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4760:               <span class="em-sev c">🔴 Crítico</span>
4761:               <span class="em-card-time">⏱ 48 h</span>
4762:               <span class="em-carr">▼</span>
4763:             </div>
4764:             <div class="em-card-body" id="emBody_nps">
4765:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4766:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4767:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4768:               <div class="em-steps">
4769:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('kpiLoadBtn') && document.getElementById('kpiLoadBtn').click()">Cargar encuestas →</button></label>
4770:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4771:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4772:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4773:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4774:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4775:               </div>
4776:               <div class="em-card-footer">
4777:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4778:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4779:               </div>
```

## dbServicioMain

### Coincidencia 1 — línea 11361

```html
11351: }
11352: 
11353: // ── BASE DE DATOS ──
11354: let _dbPacs = [];
11355: 
11356: function initFormDB() {
11357:   // noop — form fields start empty, no defaults needed
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
```

## dbServicioPlan

### Coincidencia 1 — línea 11362

```html
11352: 
11353: // ── BASE DE DATOS ──
11354: let _dbPacs = [];
11355: 
11356: function initFormDB() {
11357:   // noop — form fields start empty, no defaults needed
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
```

### Coincidencia 2 — línea 11373

```html
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11378:   const map = {};
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
11381:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11382:     const email  = (p.email || '').toLowerCase().trim();
11383:     const nombre = (p.nombre || '').trim();
```

## dbServicio

### Coincidencia 1 — línea 11361

```html
11351: }
11352: 
11353: // ── BASE DE DATOS ──
11354: let _dbPacs = [];
11355: 
11356: function initFormDB() {
11357:   // noop — form fields start empty, no defaults needed
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
```

### Coincidencia 2 — línea 11362

```html
11352: 
11353: // ── BASE DE DATOS ──
11354: let _dbPacs = [];
11355: 
11356: function initFormDB() {
11357:   // noop — form fields start empty, no defaults needed
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
```

### Coincidencia 3 — línea 11365

```html
11355: 
11356: function initFormDB() {
11357:   // noop — form fields start empty, no defaults needed
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
```

### Coincidencia 4 — línea 11368

```html
11358: }
11359: 
11360: function dbOnServiceChange() {
11361:   const val = document.getElementById('dbServicioMain').value;
11362:   const planSel = document.getElementById('dbServicioPlan');
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11378:   const map = {};
```

### Coincidencia 5 — línea 11373

```html
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11378:   const map = {};
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
11381:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11382:     const email  = (p.email || '').toLowerCase().trim();
11383:     const nombre = (p.nombre || '').trim();
```

### Coincidencia 6 — línea 11373

```html
11363:   if (val === '__planes__') {
11364:     planSel.style.display = 'block';
11365:     document.getElementById('dbServicio').value = '';
11366:   } else {
11367:     planSel.style.display = 'none';
11368:     document.getElementById('dbServicio').value = val;
11369:   }
11370: }
11371: 
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11378:   const map = {};
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
11381:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11382:     const email  = (p.email || '').toLowerCase().trim();
11383:     const nombre = (p.nombre || '').trim();
```

## voiceStatus

### Coincidencia 1 — línea 11897

```html
11887: // ══════════════════════════════════════════════════════════════
11888: // ── VOZ ──
11889: // ══════════════════════════════════════════════════════════════
11890: let _voiceActive  = false;
11891: let _voiceRec     = null;
11892: let _voiceGotResult = false;
11893: 
11894: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11895: 
11896: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11897: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11898: 
11899: const VOICE_ICON = '🎙️ Dictar cita por voz';
11900: const VOICE_STOP = '⏹ Detener escucha';
11901: 
11902: // ── Panel de voz (dictado por teclado iOS) ──
11903: function toggleVoicePanel() {
11904:   const panel = document.getElementById('voicePanel');
11905:   const isOpen = panel.style.display !== 'none';
11906:   panel.style.display = isOpen ? 'none' : 'block';
11907:   if (!isOpen) {
```

### Coincidencia 2 — línea 11897

```html
11887: // ══════════════════════════════════════════════════════════════
11888: // ── VOZ ──
11889: // ══════════════════════════════════════════════════════════════
11890: let _voiceActive  = false;
11891: let _voiceRec     = null;
11892: let _voiceGotResult = false;
11893: 
11894: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11895: 
11896: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11897: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11898: 
11899: const VOICE_ICON = '🎙️ Dictar cita por voz';
11900: const VOICE_STOP = '⏹ Detener escucha';
11901: 
11902: // ── Panel de voz (dictado por teclado iOS) ──
11903: function toggleVoicePanel() {
11904:   const panel = document.getElementById('voicePanel');
11905:   const isOpen = panel.style.display !== 'none';
11906:   panel.style.display = isOpen ? 'none' : 'block';
11907:   if (!isOpen) {
```

### Coincidencia 3 — línea 11951

```html
11941:   _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
11942:   _voiceRec.interimResults  = false;
11943:   _voiceRec.maxAlternatives = 1;
11944: 
11945:   _voiceActive    = true;
11946:   _voiceGotResult = false;
11947: 
11948:   const btn = _voiceBtn();
11949:   btn.classList.add('listening');
11950:   btn.textContent = VOICE_STOP;
11951:   _voiceStatusEl().style.display = 'flex';
11952:   document.getElementById('voiceTranscript').textContent = '';
11953:   document.getElementById('voiceHelp').style.display = 'none';
11954: 
11955:   _voiceRec.onresult = e => {
11956:     _voiceGotResult = true;
11957:     const transcript = Array.from(e.results)
11958:       .map(r => r[0].transcript).join(' ');
11959:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11960:     _parseVoice(transcript);
11961:   };
```

### Coincidencia 4 — línea 12008

```html
11998:     _voiceRec.onend = null; // evitar loop
11999:     try { _voiceRec.stop(); } catch(e) {}
12000:     _voiceRec = null;
12001:   }
12002:   const btn = _voiceBtn();
12003:   if (btn) {
12004:     btn.classList.remove('listening');
12005:     btn.textContent = VOICE_ICON;
12006:   }
12007:   setTimeout(() => {
12008:     const s = _voiceStatusEl();
12009:     if (s) s.style.display = 'none';
12010:   }, 3000);
12011: }
12012: 
12013: function _norm(s) {
12014:   return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
12015: }
12016: 
12017: function _parseVoice(text) {
12018:   const t = _norm(text);
```

## voiceTranscript

### Coincidencia 1 — línea 11952

```html
11942:   _voiceRec.interimResults  = false;
11943:   _voiceRec.maxAlternatives = 1;
11944: 
11945:   _voiceActive    = true;
11946:   _voiceGotResult = false;
11947: 
11948:   const btn = _voiceBtn();
11949:   btn.classList.add('listening');
11950:   btn.textContent = VOICE_STOP;
11951:   _voiceStatusEl().style.display = 'flex';
11952:   document.getElementById('voiceTranscript').textContent = '';
11953:   document.getElementById('voiceHelp').style.display = 'none';
11954: 
11955:   _voiceRec.onresult = e => {
11956:     _voiceGotResult = true;
11957:     const transcript = Array.from(e.results)
11958:       .map(r => r[0].transcript).join(' ');
11959:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11960:     _parseVoice(transcript);
11961:   };
11962: 
```

### Coincidencia 2 — línea 11959

```html
11949:   btn.classList.add('listening');
11950:   btn.textContent = VOICE_STOP;
11951:   _voiceStatusEl().style.display = 'flex';
11952:   document.getElementById('voiceTranscript').textContent = '';
11953:   document.getElementById('voiceHelp').style.display = 'none';
11954: 
11955:   _voiceRec.onresult = e => {
11956:     _voiceGotResult = true;
11957:     const transcript = Array.from(e.results)
11958:       .map(r => r[0].transcript).join(' ');
11959:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11960:     _parseVoice(transcript);
11961:   };
11962: 
11963:   _voiceRec.onerror = e => {
11964:     if (e.error === 'not-allowed') {
11965:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11966:     } else if (e.error === 'no-speech') {
11967:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11968:     } else {
11969:       toast('Error: ' + e.error, 'err');
```

## voiceHelp

### Coincidencia 1 — línea 11953

```html
11943:   _voiceRec.maxAlternatives = 1;
11944: 
11945:   _voiceActive    = true;
11946:   _voiceGotResult = false;
11947: 
11948:   const btn = _voiceBtn();
11949:   btn.classList.add('listening');
11950:   btn.textContent = VOICE_STOP;
11951:   _voiceStatusEl().style.display = 'flex';
11952:   document.getElementById('voiceTranscript').textContent = '';
11953:   document.getElementById('voiceHelp').style.display = 'none';
11954: 
11955:   _voiceRec.onresult = e => {
11956:     _voiceGotResult = true;
11957:     const transcript = Array.from(e.results)
11958:       .map(r => r[0].transcript).join(' ');
11959:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11960:     _parseVoice(transcript);
11961:   };
11962: 
11963:   _voiceRec.onerror = e => {
```

### Coincidencia 2 — línea 12156

```html
12146:         if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
12147:         filled.push('paciente (encontrado)');
12148:       } else {
12149:         document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
12150:         filled.push('nombre');
12151:       }
12152:     }
12153:   }
12154: 
12155:   if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
12156:   else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
12157: }
12158: 
12159: // ══════════════════════════════════════════════════════════════
12160: // ── RECORDATORIOS ──
12161: // ══════════════════════════════════════════════════════════════
12162: 
12163: // Mensajes predefinidos con el nombre del paciente
12164: function msgSemana4(nombre) {
12165:   const primero = nombre.split(' ')[0];
12166:   return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya vamos en la semana 4 desde tu ultima descarga muscular — la proxima semana seria el momento ideal para hacerla antes de que el cuerpo empiece a acumular tension de nuevo. ¿Te agendo? \uD83D\uDCAA`;
```

## pm_kpi_ventas_mes

### Coincidencia 1 — línea 16370

```html
16360:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16361:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16362:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16363:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16364:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16365:   };
16366:   const calc = calcTotalCostos(costos);
16367:   saveCostosEstructura(costos);
16368:   // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
16369:   const cfg = getKPIConfig();
16370:   const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
16371:   if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
16372:     cfg.meta_ventas_mes = inputMeta;
16373:     kvSet('kpiConfig', JSON.stringify(cfg));
16374:     META_VENTAS_MES    = inputMeta;
16375:     META_VENTAS_SEMANA = Math.round(inputMeta / 4);
16376:     kvSet('metaMensual', inputMeta);
16377:   }
16378:   reloadMetas();
16379:   applyKPIRefSpans();
16380:   toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
```
