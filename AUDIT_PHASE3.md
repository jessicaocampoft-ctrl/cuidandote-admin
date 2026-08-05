# Contexto exacto para fase 3

Archivo: `index.html`

## kpiLoadBtn

No se encontraron coincidencias.

## dbServicioMain

No se encontraron coincidencias.

## dbServicioPlan

No se encontraron coincidencias.

## dbServicio

No se encontraron coincidencias.

## voiceStatus

### Coincidencia 1 — línea 2796

```html
2786:         <button type="button" id="voiceBtn" onclick="toggleVoicePanel()" style="width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(27,191,176,.08);border:1.5px solid var(--primary);border-radius:10px;color:var(--primary);font-family:var(--font-b);font-size:.95rem;font-weight:600;padding:13px;margin-bottom:0;cursor:pointer">
2787:           🎙️ Dictar cita por voz
2788:         </button>
2789:         <div id="voicePanel" style="display:none;margin-top:10px;background:rgba(27,191,176,.05);border:1px solid var(--border);border-radius:10px;padding:14px">
2790:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2791:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2792:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2793:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2794:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2795:           </p>
2796:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2797:             <span>🎙️ Escuchando</span>
2798:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2799:           </div>
2800:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2801:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2802:           </div>
2803:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2804:           <div style="display:flex;gap:8px">
2805:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2806:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
```

### Coincidencia 2 — línea 11893

```html
11883: // ══════════════════════════════════════════════════════════════
11884: // ── VOZ ──
11885: // ══════════════════════════════════════════════════════════════
11886: let _voiceActive  = false;
11887: let _voiceRec     = null;
11888: let _voiceGotResult = false;
11889: 
11890: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11891: 
11892: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11893: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11894: 
11895: const VOICE_ICON = '🎙️ Dictar cita por voz';
11896: const VOICE_STOP = '⏹ Detener escucha';
11897: 
11898: // ── Panel de voz (dictado por teclado iOS) ──
11899: function toggleVoicePanel() {
11900:   const panel = document.getElementById('voicePanel');
11901:   const isOpen = panel.style.display !== 'none';
11902:   panel.style.display = isOpen ? 'none' : 'block';
11903:   if (!isOpen) {
```

### Coincidencia 3 — línea 11893

```html
11883: // ══════════════════════════════════════════════════════════════
11884: // ── VOZ ──
11885: // ══════════════════════════════════════════════════════════════
11886: let _voiceActive  = false;
11887: let _voiceRec     = null;
11888: let _voiceGotResult = false;
11889: 
11890: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11891: 
11892: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11893: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11894: 
11895: const VOICE_ICON = '🎙️ Dictar cita por voz';
11896: const VOICE_STOP = '⏹ Detener escucha';
11897: 
11898: // ── Panel de voz (dictado por teclado iOS) ──
11899: function toggleVoicePanel() {
11900:   const panel = document.getElementById('voicePanel');
11901:   const isOpen = panel.style.display !== 'none';
11902:   panel.style.display = isOpen ? 'none' : 'block';
11903:   if (!isOpen) {
```

### Coincidencia 4 — línea 11947

```html
11937:   _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
11938:   _voiceRec.interimResults  = false;
11939:   _voiceRec.maxAlternatives = 1;
11940: 
11941:   _voiceActive    = true;
11942:   _voiceGotResult = false;
11943: 
11944:   const btn = _voiceBtn();
11945:   btn.classList.add('listening');
11946:   btn.textContent = VOICE_STOP;
11947:   _voiceStatusEl().style.display = 'flex';
11948:   document.getElementById('voiceTranscript').textContent = '';
11949:   document.getElementById('voiceHelp').style.display = 'none';
11950: 
11951:   _voiceRec.onresult = e => {
11952:     _voiceGotResult = true;
11953:     const transcript = Array.from(e.results)
11954:       .map(r => r[0].transcript).join(' ');
11955:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11956:     _parseVoice(transcript);
11957:   };
```

### Coincidencia 5 — línea 12004

```html
11994:     _voiceRec.onend = null; // evitar loop
11995:     try { _voiceRec.stop(); } catch(e) {}
11996:     _voiceRec = null;
11997:   }
11998:   const btn = _voiceBtn();
11999:   if (btn) {
12000:     btn.classList.remove('listening');
12001:     btn.textContent = VOICE_ICON;
12002:   }
12003:   setTimeout(() => {
12004:     const s = _voiceStatusEl();
12005:     if (s) s.style.display = 'none';
12006:   }, 3000);
12007: }
12008: 
12009: function _norm(s) {
12010:   return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
12011: }
12012: 
12013: function _parseVoice(text) {
12014:   const t = _norm(text);
```

## voiceTranscript

### Coincidencia 1 — línea 2798

```html
2788:         </button>
2789:         <div id="voicePanel" style="display:none;margin-top:10px;background:rgba(27,191,176,.05);border:1px solid var(--border);border-radius:10px;padding:14px">
2790:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2791:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2792:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2793:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2794:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2795:           </p>
2796:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2797:             <span>🎙️ Escuchando</span>
2798:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2799:           </div>
2800:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2801:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2802:           </div>
2803:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2804:           <div style="display:flex;gap:8px">
2805:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2806:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2807:           </div>
2808:         </div>
```

### Coincidencia 2 — línea 11948

```html
11938:   _voiceRec.interimResults  = false;
11939:   _voiceRec.maxAlternatives = 1;
11940: 
11941:   _voiceActive    = true;
11942:   _voiceGotResult = false;
11943: 
11944:   const btn = _voiceBtn();
11945:   btn.classList.add('listening');
11946:   btn.textContent = VOICE_STOP;
11947:   _voiceStatusEl().style.display = 'flex';
11948:   document.getElementById('voiceTranscript').textContent = '';
11949:   document.getElementById('voiceHelp').style.display = 'none';
11950: 
11951:   _voiceRec.onresult = e => {
11952:     _voiceGotResult = true;
11953:     const transcript = Array.from(e.results)
11954:       .map(r => r[0].transcript).join(' ');
11955:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11956:     _parseVoice(transcript);
11957:   };
11958: 
```

### Coincidencia 3 — línea 11955

```html
11945:   btn.classList.add('listening');
11946:   btn.textContent = VOICE_STOP;
11947:   _voiceStatusEl().style.display = 'flex';
11948:   document.getElementById('voiceTranscript').textContent = '';
11949:   document.getElementById('voiceHelp').style.display = 'none';
11950: 
11951:   _voiceRec.onresult = e => {
11952:     _voiceGotResult = true;
11953:     const transcript = Array.from(e.results)
11954:       .map(r => r[0].transcript).join(' ');
11955:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11956:     _parseVoice(transcript);
11957:   };
11958: 
11959:   _voiceRec.onerror = e => {
11960:     if (e.error === 'not-allowed') {
11961:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11962:     } else if (e.error === 'no-speech') {
11963:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11964:     } else {
11965:       toast('Error: ' + e.error, 'err');
```

## voiceHelp

### Coincidencia 1 — línea 2800

```html
2790:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2791:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2792:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2793:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2794:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2795:           </p>
2796:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2797:             <span>🎙️ Escuchando</span>
2798:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2799:           </div>
2800:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2801:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2802:           </div>
2803:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2804:           <div style="display:flex;gap:8px">
2805:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2806:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2807:           </div>
2808:         </div>
2809:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2810: 
```

### Coincidencia 2 — línea 11949

```html
11939:   _voiceRec.maxAlternatives = 1;
11940: 
11941:   _voiceActive    = true;
11942:   _voiceGotResult = false;
11943: 
11944:   const btn = _voiceBtn();
11945:   btn.classList.add('listening');
11946:   btn.textContent = VOICE_STOP;
11947:   _voiceStatusEl().style.display = 'flex';
11948:   document.getElementById('voiceTranscript').textContent = '';
11949:   document.getElementById('voiceHelp').style.display = 'none';
11950: 
11951:   _voiceRec.onresult = e => {
11952:     _voiceGotResult = true;
11953:     const transcript = Array.from(e.results)
11954:       .map(r => r[0].transcript).join(' ');
11955:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11956:     _parseVoice(transcript);
11957:   };
11958: 
11959:   _voiceRec.onerror = e => {
```

### Coincidencia 3 — línea 12152

```html
12142:         if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
12143:         filled.push('paciente (encontrado)');
12144:       } else {
12145:         document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
12146:         filled.push('nombre');
12147:       }
12148:     }
12149:   }
12150: 
12151:   if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
12152:   else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
12153: }
12154: 
12155: // ══════════════════════════════════════════════════════════════
12156: // ── RECORDATORIOS ──
12157: // ══════════════════════════════════════════════════════════════
12158: 
12159: // Mensajes predefinidos con el nombre del paciente
12160: function msgSemana4(nombre) {
12161:   const primero = nombre.split(' ')[0];
12162:   return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya vamos en la semana 4 desde tu ultima descarga muscular — la proxima semana seria el momento ideal para hacerla antes de que el cuerpo empiece a acumular tension de nuevo. ¿Te agendo? \uD83D\uDCAA`;
```

## pm_kpi_ventas_mes

### Coincidencia 1 — línea 16366

```html
16356:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16357:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16358:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16359:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16360:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16361:   };
16362:   const calc = calcTotalCostos(costos);
16363:   saveCostosEstructura(costos);
16364:   // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
16365:   const cfg = getKPIConfig();
16366:   const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
16367:   if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
16368:     cfg.meta_ventas_mes = inputMeta;
16369:     kvSet('kpiConfig', JSON.stringify(cfg));
16370:     META_VENTAS_MES    = inputMeta;
16371:     META_VENTAS_SEMANA = Math.round(inputMeta / 4);
16372:     kvSet('metaMensual', inputMeta);
16373:   }
16374:   reloadMetas();
16375:   applyKPIRefSpans();
16376:   toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
```
