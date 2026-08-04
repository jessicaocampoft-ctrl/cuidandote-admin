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

### Coincidencia 1 — línea 2797

```html
2787:         <button type="button" id="voiceBtn" onclick="toggleVoicePanel()" style="width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(27,191,176,.08);border:1.5px solid var(--primary);border-radius:10px;color:var(--primary);font-family:var(--font-b);font-size:.95rem;font-weight:600;padding:13px;margin-bottom:0;cursor:pointer">
2788:           🎙️ Dictar cita por voz
2789:         </button>
2790:         <div id="voicePanel" style="display:none;margin-top:10px;background:rgba(27,191,176,.05);border:1px solid var(--border);border-radius:10px;padding:14px">
2791:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2792:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2793:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2794:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2795:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2796:           </p>
2797:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2798:             <span>🎙️ Escuchando</span>
2799:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2800:           </div>
2801:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2802:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2803:           </div>
2804:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2805:           <div style="display:flex;gap:8px">
2806:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2807:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
```

### Coincidencia 2 — línea 11888

```html
11878: // ══════════════════════════════════════════════════════════════
11879: // ── VOZ ──
11880: // ══════════════════════════════════════════════════════════════
11881: let _voiceActive  = false;
11882: let _voiceRec     = null;
11883: let _voiceGotResult = false;
11884: 
11885: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11886: 
11887: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11888: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11889: 
11890: const VOICE_ICON = '🎙️ Dictar cita por voz';
11891: const VOICE_STOP = '⏹ Detener escucha';
11892: 
11893: // ── Panel de voz (dictado por teclado iOS) ──
11894: function toggleVoicePanel() {
11895:   const panel = document.getElementById('voicePanel');
11896:   const isOpen = panel.style.display !== 'none';
11897:   panel.style.display = isOpen ? 'none' : 'block';
11898:   if (!isOpen) {
```

### Coincidencia 3 — línea 11888

```html
11878: // ══════════════════════════════════════════════════════════════
11879: // ── VOZ ──
11880: // ══════════════════════════════════════════════════════════════
11881: let _voiceActive  = false;
11882: let _voiceRec     = null;
11883: let _voiceGotResult = false;
11884: 
11885: function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }
11886: 
11887: function _voiceBtn()      { return document.getElementById('voiceBtn'); }
11888: function _voiceStatusEl() { return document.getElementById('voiceStatus'); }
11889: 
11890: const VOICE_ICON = '🎙️ Dictar cita por voz';
11891: const VOICE_STOP = '⏹ Detener escucha';
11892: 
11893: // ── Panel de voz (dictado por teclado iOS) ──
11894: function toggleVoicePanel() {
11895:   const panel = document.getElementById('voicePanel');
11896:   const isOpen = panel.style.display !== 'none';
11897:   panel.style.display = isOpen ? 'none' : 'block';
11898:   if (!isOpen) {
```

### Coincidencia 4 — línea 11942

```html
11932:   _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
11933:   _voiceRec.interimResults  = false;
11934:   _voiceRec.maxAlternatives = 1;
11935: 
11936:   _voiceActive    = true;
11937:   _voiceGotResult = false;
11938: 
11939:   const btn = _voiceBtn();
11940:   btn.classList.add('listening');
11941:   btn.textContent = VOICE_STOP;
11942:   _voiceStatusEl().style.display = 'flex';
11943:   document.getElementById('voiceTranscript').textContent = '';
11944:   document.getElementById('voiceHelp').style.display = 'none';
11945: 
11946:   _voiceRec.onresult = e => {
11947:     _voiceGotResult = true;
11948:     const transcript = Array.from(e.results)
11949:       .map(r => r[0].transcript).join(' ');
11950:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11951:     _parseVoice(transcript);
11952:   };
```

### Coincidencia 5 — línea 11999

```html
11989:     _voiceRec.onend = null; // evitar loop
11990:     try { _voiceRec.stop(); } catch(e) {}
11991:     _voiceRec = null;
11992:   }
11993:   const btn = _voiceBtn();
11994:   if (btn) {
11995:     btn.classList.remove('listening');
11996:     btn.textContent = VOICE_ICON;
11997:   }
11998:   setTimeout(() => {
11999:     const s = _voiceStatusEl();
12000:     if (s) s.style.display = 'none';
12001:   }, 3000);
12002: }
12003: 
12004: function _norm(s) {
12005:   return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
12006: }
12007: 
12008: function _parseVoice(text) {
12009:   const t = _norm(text);
```

## voiceTranscript

### Coincidencia 1 — línea 2799

```html
2789:         </button>
2790:         <div id="voicePanel" style="display:none;margin-top:10px;background:rgba(27,191,176,.05);border:1px solid var(--border);border-radius:10px;padding:14px">
2791:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2792:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2793:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2794:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2795:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2796:           </p>
2797:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2798:             <span>🎙️ Escuchando</span>
2799:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2800:           </div>
2801:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2802:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2803:           </div>
2804:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2805:           <div style="display:flex;gap:8px">
2806:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2807:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2808:           </div>
2809:         </div>
```

### Coincidencia 2 — línea 11943

```html
11933:   _voiceRec.interimResults  = false;
11934:   _voiceRec.maxAlternatives = 1;
11935: 
11936:   _voiceActive    = true;
11937:   _voiceGotResult = false;
11938: 
11939:   const btn = _voiceBtn();
11940:   btn.classList.add('listening');
11941:   btn.textContent = VOICE_STOP;
11942:   _voiceStatusEl().style.display = 'flex';
11943:   document.getElementById('voiceTranscript').textContent = '';
11944:   document.getElementById('voiceHelp').style.display = 'none';
11945: 
11946:   _voiceRec.onresult = e => {
11947:     _voiceGotResult = true;
11948:     const transcript = Array.from(e.results)
11949:       .map(r => r[0].transcript).join(' ');
11950:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11951:     _parseVoice(transcript);
11952:   };
11953: 
```

### Coincidencia 3 — línea 11950

```html
11940:   btn.classList.add('listening');
11941:   btn.textContent = VOICE_STOP;
11942:   _voiceStatusEl().style.display = 'flex';
11943:   document.getElementById('voiceTranscript').textContent = '';
11944:   document.getElementById('voiceHelp').style.display = 'none';
11945: 
11946:   _voiceRec.onresult = e => {
11947:     _voiceGotResult = true;
11948:     const transcript = Array.from(e.results)
11949:       .map(r => r[0].transcript).join(' ');
11950:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11951:     _parseVoice(transcript);
11952:   };
11953: 
11954:   _voiceRec.onerror = e => {
11955:     if (e.error === 'not-allowed') {
11956:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11957:     } else if (e.error === 'no-speech') {
11958:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11959:     } else {
11960:       toast('Error: ' + e.error, 'err');
```

## voiceHelp

### Coincidencia 1 — línea 2801

```html
2791:           <p style="font-size:.8rem;color:var(--muted);margin-bottom:8px;line-height:1.5">
2792:             <strong style="color:var(--text)">1.</strong> Toca el campo de abajo &nbsp;
2793:             <strong style="color:var(--text)">2.</strong> Toca el <strong>🎤 micrófono del teclado</strong> de tu iPhone &nbsp;
2794:             <strong style="color:var(--text)">3.</strong> Dicta la cita &nbsp;
2795:             <strong style="color:var(--text)">4.</strong> Toca <em>Procesar</em>
2796:           </p>
2797:           <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
2798:             <span>🎙️ Escuchando</span>
2799:             <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
2800:           </div>
2801:           <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
2802:             Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
2803:           </div>
2804:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2805:           <div style="display:flex;gap:8px">
2806:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2807:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2808:           </div>
2809:         </div>
2810:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2811: 
```

### Coincidencia 2 — línea 11944

```html
11934:   _voiceRec.maxAlternatives = 1;
11935: 
11936:   _voiceActive    = true;
11937:   _voiceGotResult = false;
11938: 
11939:   const btn = _voiceBtn();
11940:   btn.classList.add('listening');
11941:   btn.textContent = VOICE_STOP;
11942:   _voiceStatusEl().style.display = 'flex';
11943:   document.getElementById('voiceTranscript').textContent = '';
11944:   document.getElementById('voiceHelp').style.display = 'none';
11945: 
11946:   _voiceRec.onresult = e => {
11947:     _voiceGotResult = true;
11948:     const transcript = Array.from(e.results)
11949:       .map(r => r[0].transcript).join(' ');
11950:     document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
11951:     _parseVoice(transcript);
11952:   };
11953: 
11954:   _voiceRec.onerror = e => {
```

### Coincidencia 3 — línea 12147

```html
12137:         if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
12138:         filled.push('paciente (encontrado)');
12139:       } else {
12140:         document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
12141:         filled.push('nombre');
12142:       }
12143:     }
12144:   }
12145: 
12146:   if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
12147:   else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
12148: }
12149: 
12150: // ══════════════════════════════════════════════════════════════
12151: // ── RECORDATORIOS ──
12152: // ══════════════════════════════════════════════════════════════
12153: 
12154: // Mensajes predefinidos con el nombre del paciente
12155: function msgSemana4(nombre) {
12156:   const primero = nombre.split(' ')[0];
12157:   return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya vamos en la semana 4 desde tu ultima descarga muscular — la proxima semana seria el momento ideal para hacerla antes de que el cuerpo empiece a acumular tension de nuevo. ¿Te agendo? \uD83D\uDCAA`;
```

## pm_kpi_ventas_mes

### Coincidencia 1 — línea 16361

```html
16351:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16352:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16353:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16354:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16355:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16356:   };
16357:   const calc = calcTotalCostos(costos);
16358:   saveCostosEstructura(costos);
16359:   // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
16360:   const cfg = getKPIConfig();
16361:   const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
16362:   if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
16363:     cfg.meta_ventas_mes = inputMeta;
16364:     kvSet('kpiConfig', JSON.stringify(cfg));
16365:     META_VENTAS_MES    = inputMeta;
16366:     META_VENTAS_SEMANA = Math.round(inputMeta / 4);
16367:     kvSet('metaMensual', inputMeta);
16368:   }
16369:   reloadMetas();
16370:   applyKPIRefSpans();
16371:   toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
```
