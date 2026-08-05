# Detalles exactos para correcciones de fase 4

Archivo: `index.html`

## Encuestas y NPS

```html
3788:               <input type="month" id="egresoMesFiltro" oninput="renderEgresosList()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:6px 10px;outline:none">
3789:               <button class="btn btn-ghost btn-sm" onclick="document.getElementById('egresoMesFiltro').value='';renderEgresosList()">Todos</button>
3790:             </div>
3791:           </div>
3792:           <div id="egresosListResult"></div>
3793:         </div>
3794:       </div>
3795: 
3796:       <!-- ══ KPI TABLERO ══ -->
3797:       <div style="margin-top:28px">
3798:         <div class="fin-section-title">📊 Tablero de KPIs de Gestión</div>
3799: 
3800:         <!-- KPIs manuales -->
3801:         <div class="card" style="margin-bottom:16px">
3802:           <div class="card-title" style="margin-bottom:14px">Indicadores manuales de la semana</div>
3803:           <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;align-items:end">
3804:             <div class="field" style="margin:0">
3805:               <label>Leads recibidos (semana)</label>
3806:               <input type="number" id="kpiLeads" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3807:             </div>
3808:             <div class="field" style="margin:0">
3809:               <label>Citas agendadas desde leads</label>
3810:               <input type="number" id="kpiConvertidos" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3811:             </div>
3812:             <div class="field" style="margin:0">
3813:               <label>NPS último mes</label>
3814:               <div id="kpiNPSAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3815:               <input type="hidden" id="kpiNPS" value="0">
3816:             </div>
3817:             <div class="field" style="margin:0">
3818:               <label>Encuestas realizadas</label>
3819:               <div id="kpiEncuestasAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3820:               <input type="hidden" id="kpiEncuestas" value="0">
3821:             </div>
3822:             <div class="field" style="margin:0">
3823:               <label>BD actualizada (%)</label>
3824:               <div id="kpiBDAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--primary);font-family:var(--font-b)">🤖 Calculado automáticamente</div>
3825:               <input type="hidden" id="kpiBD" value="0">
3826:             </div>
3827:             <div style="display:flex;align-items:flex-end;gap:8px;flex-wrap:wrap">
3828:               <button class="btn btn-teal btn-sm" id="btnCargarEncuesta" onclick="loadEncuestaStats()">🔄 Cargar desde formulario</button>
3829:               <button class="btn btn-ghost btn-sm" onclick="guardarKPIManual()">Guardar manual</button>
3830:             </div>
3831:           </div>
3832:         </div>
3833: 
3834:         <!-- Contador de Leads -->
3835:         <div class="card" style="margin-bottom:16px">
```

## Interfaz del dictado por voz

```html
2745:                 <option value="Capacitación">Capacitación</option>
2746:                 <option value="Evento externo">Evento externo</option>
2747:                 <option value="Reunión">Reunión</option>
2748:                 <option value="Otro">Otro</option>
2749:               </select>
2750:             </div>
2751:             <div class="field">
2752:               <label>Fecha *</label>
2753:               <input type="date" id="evFecha">
2754:             </div>
2755:             <div class="field">
2756:               <label>Hora inicio *</label>
2757:               <input type="time" id="evHoraInicio" oninput="calcDuracion()">
2758:             </div>
2759:             <div class="field">
2760:               <label>Hora fin *</label>
2761:               <input type="time" id="evHoraFin" oninput="calcDuracion()">
2762:               <span id="evDuracionLabel" style="font-size:.75rem;color:var(--primary);margin-top:4px;display:none"></span>
2763:             </div>
2764:             <div class="field">
2765:               <label>Cobro / Precio</label>
2766:               <input type="text" id="evCobro" placeholder="Ej: $50.000, Gratis, A convenir">
2767:             </div>
2768:             <div class="field" style="grid-column:1/-1">
2769:               <label>Descripción / Notas</label>
2770:               <textarea id="evNotas" rows="2" placeholder="Detalles del evento, lugar, participantes..."></textarea>
2771:             </div>
2772:           </div>
2773:           <div style="margin-top:16px;display:flex;gap:10px">
2774:             <button class="btn btn-teal" onclick="submitEvento()">
2775:               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v4l3 3"/></svg>
2776:               Crear evento
2777:             </button>
2778:             <button class="btn btn-ghost" onclick="clearEvento()">Limpiar</button>
2779:           </div>
2780:         </div>
2781: 
2782:         <!-- ══ FORMULARIO CITA (existente) ══ -->
2783:         <div id="formCita">
2784: 
2785:         <!-- ── COMANDO DE VOZ ── -->
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
2807:           </div>
2808:         </div>
2809:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2810: 
2811:         <!-- ── BUSCADOR PACIENTE EXISTENTE ── -->
2812:         <div class="field" style="margin-bottom:20px;position:relative">
2813:           <label style="font-size:.82rem;color:var(--primary);font-weight:600">
2814:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
2815:             Buscar paciente existente
2816:           </label>
2817:           <input type="text" id="pacSearch"
2818:             placeholder="Escribe nombre o teléfono para autocompletar..."
2819:             oninput="searchPatient(this.value)"
2820:             autocomplete="off"
2821:             style="background:#f0faf9;border-color:rgba(27,191,176,.35)">
2822:           <div id="pacDropdown" style="
2823:             display:none;position:absolute;top:100%;left:0;right:0;z-index:200;
2824:             background:#fff;border:1px solid rgba(27,191,176,.3);border-radius:8px;
2825:             box-shadow:0 8px 24px rgba(0,0,0,.1);max-height:220px;overflow-y:auto;margin-top:4px">
2826:           </div>
2827:           <p style="font-size:.75rem;color:var(--muted);margin-top:5px">Si el paciente ya tiene citas previas, selecciónalo para llenar los datos automáticamente.</p>
2828:         </div>
2829:         <hr style="border:none;border-top:1px solid var(--border);margin-bottom:20px">
2830: 
2831:         <div class="form-grid">
2832:           <div class="field">
2833:             <label>Nombre del paciente *</label>
2834:             <input type="text" id="ncName" placeholder="Nombre completo">
2835:           </div>
```

## Formulario de Base de datos

```html
5070:           </div>
5071:           <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
5072:             <label style="font-size:.78rem;color:var(--muted)">Inactivos hace más de:</label>
5073:             <select id="reacDias" onchange="renderReactivacion()"
5074:               style="font-size:.8rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
5075:               <option value="30">30 días</option>
5076:               <option value="60">60 días</option>
5077:               <option value="90" selected>90 días</option>
5078:               <option value="180">6 meses</option>
5079:               <option value="365">1 año</option>
5080:             </select>
5081:           </div>
5082:         </div>
5083:         <div id="reactivacionResult" style="margin-top:16px"></div>
5084:       </div>
5085: 
5086:       <!-- Formulario agregar paciente -->
5087:       <div class="card" style="margin-bottom:24px">
5088:         <div class="card-title">Agregar paciente</div>
5089:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
5090:           <div class="field">
5091:             <label>Nombre completo *</label>
5092:             <input type="text" id="dbNombre" placeholder="Ana García López" autocomplete="off" oninput="checkDupDB()">
5093:             <div id="dbDupWarn" style="display:none;margin-top:6px;padding:8px 12px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.5);border-radius:8px;font-size:.82rem;color:#92400e">
5094:               ⚠️ Ya existe un paciente con ese nombre: <strong id="dbDupName"></strong>. ¿Seguro que deseas crear otro registro?
5095:             </div>
5096:           </div>
5097:           <div class="field">
5098:             <label>Teléfono / WhatsApp</label>
5099:             <input type="tel" id="dbTelefono" placeholder="3136467945">
5100:           </div>
5101:           <div class="field">
5102:             <label>Correo electrónico</label>
5103:             <input type="email" id="dbEmail" placeholder="correo@email.com">
5104:           </div>
5105:           <div class="field">
5106:             <label>Entidad</label>
5107:             <input type="text" id="dbEntidad" placeholder="EPS, ARL, Particular..." autocomplete="off">
5108:           </div>
5109:           <div class="field">
5110:             <label>Deporte o actividad</label>
5111:             <input type="text" id="dbDeporte" placeholder="Fútbol, natación, yoga, ninguno..." autocomplete="off">
5112:           </div>
5113:           <div class="field">
5114:             <label>Origen del paciente</label>
5115:             <select id="dbOrigen" onchange="dbOnOrigenChange()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;width:100%">
5116:               <option value="">— Selecciona origen —</option>
5117:               <option>Instagram</option><option>Referido</option><option>Gimnasio</option>
5118:               <option>Empresa</option><option>Página web</option><option>Recomendación médica</option><option>Otro</option>
5119:             </select>
5120:             <input type="text" id="dbOrigenSub" placeholder="Nombre del gimnasio / empresa / detalle..." style="display:none;margin-top:6px;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5121:             <!-- Campo extra para referidos con autocomplete de pacientes -->
5122:             <div id="dbReferidoPorWrap" style="display:none;margin-top:6px;position:relative">
5123:               <input type="text" id="dbReferidoPor" placeholder="Nombre de quien la refirió..." autocomplete="off"
5124:                 oninput="dbReferidoFilter()" onfocus="dbReferidoFilter()" onblur="setTimeout(()=>document.getElementById('dbReferidoList').style.display='none',200)"
5125:                 style="width:100%;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.3);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5126:               <ul id="dbReferidoList" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:999;background:var(--s2);border:1px solid rgba(139,92,246,.3);border-radius:8px;margin:3px 0 0;padding:4px 0;max-height:180px;overflow-y:auto;box-shadow:0 4px 16px rgba(0,0,0,.15);list-style:none"></ul>
5127:             </div>
5128:           </div>
5129:           <!-- Banner del código generado (se muestra tras guardar un referido) -->
5130:           <div id="dbCodigoResult" style="display:none;grid-column:1/-1;background:rgba(139,92,246,.08);border:1.5px solid rgba(139,92,246,.35);border-radius:12px;padding:14px 18px">
5131:             <div style="font-size:.75rem;font-weight:700;color:#7c3aed;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">Código REF generado</div>
5132:             <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
5133:               <span id="dbCodigoValor" style="font-family:var(--font-m);font-size:1.3rem;font-weight:700;color:#7c3aed;letter-spacing:.05em"></span>
5134:               <span style="font-size:.8rem;color:var(--muted)">Guardado en Google Sheets · hoja <strong>Codigos</strong></span>
5135:               <button class="btn btn-sm" onclick="showView('codigos')" style="background:rgba(139,92,246,.15);color:#7c3aed;border:1px solid rgba(139,92,246,.3);margin-left:auto">Ver todos los códigos →</button>
5136:             </div>
5137:           </div>
5138:           <div class="field" style="grid-column:1/-1">
5139:             <label>Notas / Diagnóstico</label>
5140:             <textarea id="dbNotas" rows="2" style="resize:vertical;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none" placeholder="Motivo de consulta, diagnóstico, observaciones..."></textarea>
5141:           </div>
5142:         </div>
5143:         <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
5144:           <button class="btn btn-teal" id="dbSubmitBtn" onclick="agregarPacienteDB()">
5145:             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
5146:             Agregar paciente
5147:           </button>
5148:           <button class="btn btn-ghost" onclick="limpiarFormDB()">Limpiar</button>
5149:         </div>
5150:       </div>
5151: 
5152:       <!-- Tabla de pacientes -->
5153:       <div class="card">
5154:         <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
5155:           <div class="card-title" style="margin-bottom:0">Pacientes registrados</div>
5156:           <input type="text" id="dbSearch" placeholder="Buscar por nombre, teléfono o email..." oninput="renderBasedatos()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:.85rem;outline:none;color:var(--text);width:260px;transition:var(--tr)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
5157:         </div>
5158:         <div class="tbl-wrap">
5159:           <table>
5160:             <thead>
5161:               <tr>
5162:                 <th>Paciente</th>
5163:                 <th>Teléfono</th>
5164:                 <th>Email</th>
5165:                 <th>Sesiones</th>
5166:                 <th>Última cita</th>
5167:                 <th>Servicio frecuente</th>
5168:                 <th>Origen</th>
5169:                 <th>Acciones</th>
5170:               </tr>
5171:             </thead>
5172:             <tbody id="dbTbody">
5173:               <tr><td colspan="8"><div class="loading-wrap"><div class="spinner"></div> Cargando...</div></td></tr>
5174:             </tbody>
5175:           </table>
5176:         </div>
5177:       </div>
5178: 
5179:       <!-- Historial de cambios -->
5180:       <div class="card" style="margin-top:24px">
5181:         <div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none" onclick="toggleChangeLog()">
5182:           <div class="card-title" style="margin-bottom:0;display:flex;align-items:center;gap:8px">
5183:             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
5184:             Historial de cambios
5185:             <span id="changeLogCount" style="font-size:.75rem;font-weight:500;background:var(--primary);color:#fff;padding:1px 7px;border-radius:20px">0</span>
```

## Interfaz de meta mensual y presupuesto

```html
4285:           <h5>Importancia</h5>
4286:           <p>Una cancelación no solo es ingreso perdido — también es <strong>tiempo bloqueado que no se pudo reasignar</strong>. Identificar el patrón permite anticiparse y tomar acción antes de que se vuelva hábito.</p>
4287:           <h5>Fórmula</h5>
4288:           <div class="gk-formula">Tasa de cancelación = (Nro. citas canceladas ÷ Nro. total citas del período) × 100
4289: 
4290: Por servicio: Nro. canceladas de cada tipo / período
4291: Por día:      Nro. canceladas por día de la semana / período</div>
4292:           <h5>Cómo se lee</h5>
4293:           <div class="gk-semaforo">
4294:             <div class="gk-sem-item verde">🟢 &lt;10% — Normal, dentro del margen</div>
4295:             <div class="gk-sem-item amarillo">🟡 10–20% — Vigilar, algo está fallando</div>
4296:             <div class="gk-sem-item rojo">🔴 &gt;20% — Crítico, patrón de cancelación</div>
4297:           </div>
4298:           <h5>Explicación</h5>
4299:           <p>Si un <strong>servicio específico cancela más</strong>, revisa si hay problema de precio, tiempo de sesión o expectativa del paciente. Si un <strong>día específico concentra cancelaciones</strong>, refuerza el recordatorio automático 24h antes de esas citas.</p>
4300:           <h5>Acción inmediata</h5>
4301:           <div class="gk-ejemplo">• Enviar recordatorio por WhatsApp 24h antes de la cita
4302: • Confirmar asistencia el día anterior (respuesta de 1 a 2 palabras)
4303: • Si cancela, ofrecer reagendar en el mismo mensaje
4304: • Registrar el motivo de cancelación para detectar patrones</div>
4305:           <h5>Dato en vivo</h5>
4306:           <div id="kpiCancelBreakdown" style="margin-top:6px">
4307:             <span style="font-size:.8rem;color:var(--muted)">Cargando datos...</span>
4308:           </div>
4309:         </div>
4310:       </div>
4311: 
4312:       <!-- DIMENSIÓN 3 -->
4313:       <div class="gk-section-title">🟥 Dimensión 3: Resultados Financieros (Sostenibilidad)</div>
4314:       <p style="font-size:.9rem;color:var(--muted);margin-bottom:14px">El dinero manda. Esta dimensión asegura que los esfuerzos físicos se traduzcan en el cumplimiento de tus metas financieras.</p>
4315: 
4316:       <div class="gk-kpi-card" id="gkKpi5" onclick="toggleKPICard(this)">
4317:         <div class="gk-kpi-header">
4318:           <div class="gk-kpi-left">
4319:             <div class="gk-kpi-name">KPI 5 — Valor de Ventas Brutas (Semanal y Mensual)</div>
4320:             <div class="gk-kpi-summary">El dinero total recaudado por servicios y paquetes, <strong>antes de descontar gastos</strong>.</div>
4321:           </div>
4322:           <div class="gk-kpi-meta">Meta: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span>/mes</div>
4323:           <div class="gk-kpi-toggle">▼</div>
4324:         </div>
4325:         <div class="gk-kpi-body">
4326:           <h5>Utilidad</h5>
4327:           <p>Mide el dinero total recaudado por la prestación de servicios y venta de paquetes.</p>
4328:           <h5>Importancia</h5>
4329:           <p>Es el indicador definitivo de <strong>supervivencia y crecimiento</strong>. Sin ventas suficientes no hay clínica, sin importar cuántos pacientes atendiste.</p>
4330:           <h5>OJO con la palabra "brutas"</h5>
4331:           <p>Ventas brutas NO es lo que te queda. Es lo que <strong>facturas</strong>. Lo que te queda después de pagar gastos es la <strong>utilidad</strong>.</p>
4332:           <h5>Fórmula</h5>
4333:           <div class="gk-formula">Ventas Brutas = Ingresos por Servicios Fisioterapéuticos
4334:               + Ingresos por Contratos Corporativos</div>
4335:           <h5>Explicación — metas</h5>
4336:           <div class="gk-ejemplo">📅 <strong>Meta Semanal Obligatoria: <span class="kpi-ref" data-ref="meta_ventas_semana">$2.566.250</span></strong> — para mantener el ritmo.
4337: 🗓️ <strong>Meta Mensual Total: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></strong> — para cubrir costos, imprevistos y asegurar tu 20% de utilidad.</div>
4338:           <h5>Cómo se lee</h5>
4339:           <div class="gk-semaforo">
4340:             <div class="gk-sem-item verde">🟢 ≥100% — Meta cumplida</div>
4341:             <div class="gk-sem-item amarillo">🟡 84–99% — Cubres operación, no ganas</div>
4342:             <div class="gk-sem-item rojo">🔴 &lt;80% — Pierdes plata</div>
4343:           </div>
4344:           <h5>Truco para no llevarte sorpresas</h5>
4345:           <p>Compara semana a semana, NO al final del mes. Si en la semana 2 vas en $4M cuando deberías ir en $5.1M, <strong>todavía tienes 2 semanas para corregir</strong>.</p>
4346:         </div>
4347:       </div>
4348: 
4349:       <!-- DIMENSIÓN 4 -->
4350:       <div class="gk-section-title">🟪 Dimensión 4: Calidad y Retención</div>
4351: 
4352:       <div class="gk-kpi-card" id="gkKpi6" onclick="toggleKPICard(this)">
4353:         <div class="gk-kpi-header">
4354:           <div class="gk-kpi-left">
4355:             <div class="gk-kpi-name">KPI 6 — Tasa de Encuestas de Satisfacción Realizadas</div>
4356:             <div class="gk-kpi-summary">De los pacientes atendidos, qué porcentaje recibió y contestó la encuesta. <strong>Sin esto el NPS no vale nada.</strong></div>
4357:           </div>
4358:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_encuestas">70</span>%</div>
4359:           <div class="gk-kpi-toggle">▼</div>
4360:         </div>
4361:         <div class="gk-kpi-body">
4362:           <h5>Utilidad</h5>
4363:           <p>Mide el control administrativo sobre la voz del paciente. No puedes evaluar la calidad si solo encuestas al 5% de las personas.</p>
4364:           <h5>Importancia</h5>
4365:           <p>Garantiza que la auxiliar administrativa esté haciendo el <strong>seguimiento post-servicio</strong>. Si la tasa es baja, no es que los pacientes estén satisfechos — es que nadie les está preguntando.</p>
4366:           <h5>Fórmula</h5>
4367:           <div class="gk-formula">Encuestas realizadas = (Nro. Encuestas Contestadas ÷ Nro. Pacientes Dados de Alta o Atendidos) × 100</div>
4368:           <h5>Explicación</h5>
4369:           <p>Tu meta de control debe ser mayor al <strong><span class="kpi-ref" data-ref="meta_encuestas">70</span>%</strong>. Al final de la semana, si atendieron 20 personas, al menos <strong>14 deben haber recibido y contestado</strong> el link de evaluación.</p>
4370:           <h5>Por qué es un KPI "previo" al NPS</h5>
4371:           <p>El NPS te dice qué tan satisfechos están. Pero si solo el 10% contesta, ese NPS <strong>está sesgado</strong>. Para que el NPS sea confiable, al menos <strong>7 de cada 10 pacientes</strong> deben responder.</p>
4372:           <h5>Cuándo enviarla</h5>
4373:           <div class="gk-semaforo">
4374:             <div class="gk-sem-item verde">🟢 El mismo día de la consulta o al día siguiente</div>
4375:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4376:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4377:           </div>
4378:         </div>
4379:       </div>
4380: 
```

## Guardado de presupuesto y actualización de meta

```html
16280:           ${inpDoble('sv_mini_p','sv_mini_d','Mini-sesión Familiar 20min',cfg.sv_mini_p||40000,cfg.sv_mini_d||40000)}
16281: 
16282:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Paquetes Readaptación</div>
16283:           ${inpDoble('sv_pkInicio_p','sv_pkInicio_d','Paquete Inicio (6 ses)',cfg.sv_pkInicio_p||378000,cfg.sv_pkInicio_d||469000)}
16284:           ${inpDoble('sv_pkAvance_p','sv_pkAvance_d','Paquete Avance (8 ses)',cfg.sv_pkAvance_p||476000,cfg.sv_pkAvance_d||598000)}
16285:           ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
16286:           ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}
16287: 
16288:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
16289:           ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
16290:           ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}
16291: 
16292:           <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
16293:             💡 Ticket promedio individual (sesiones sueltas):
16294:             <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
16295:             · Sesiones necesarias/mes:
16296:             <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
16297:           </div>
16298:         </div>
16299: 
16300:         <div class="card">
16301:           <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
16302:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16303:             ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
16304:             ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
16305:             ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
16306:           </div>
16307:         </div>
16308: 
16309:         <button onclick="pmGuardarKPIs()"
16310:           style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
16311:           💾 Guardar metas de KPIs
16312:         </button>
16313: 
16314:       </div>
16315:     </div>`;
16316: }
16317: 
16318: function pmRecalc() {
16319:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16320:   const c = {
16321:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16322:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16323:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
16324:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16325:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16326:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16327:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16328:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16329:   };
16330:   const calc  = calcTotalCostos(c);
16331:   const fmtN  = v => Number(v).toLocaleString('es-CO');
16332:   const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
16333:   set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
16334:   set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
16335:   set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
16336:   set('pm_res_total',       '$' + fmtN(calc.total));
16337:   // Actualizar ticket promedio
16338:   // Ticket promedio = promedio de los 6 servicios individuales (presencial)
16339:   const indivPrecios = [
16340:     g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
16341:     g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
16342:   ];
16343:   const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
16344:   const ta = document.getElementById('pm_ticket_avg');
16345:   const sc = document.getElementById('pm_sess_calc');
16346:   if (ta) ta.textContent = '$' + fmtN(ticket);
16347:   if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
16348: }
16349: 
16350: function pmGuardarCostos() {
16351:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16352:   const costos = {
16353:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16354:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16355:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
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
16377:   renderPresupuestoMetas();
16378: }
16379: 
16380: function pmGuardarKPIs() {
16381:   const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
16382:   const cfg = getKPIConfig();
16383:   // Metas operativas
16384:   cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
16385:   cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
16386:   cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
16387:   cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
16388:   cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
16389:   cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
16390:   cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
16391:   cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
16392:   // Marketing
16393:   cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
16394:   cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
16395:   cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
16396:   // Precios servicios (presencial y domicilio)
16397:   cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
16398:   cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
16399:   cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
16400:   cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
16401:   cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
16402:   cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
16403:   cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
16404:   cfg.sv_valoracion_d       = g('sv_valoracion_d')|| 95000;
16405:   cfg.sv_readap_p           = g('sv_readap_p')    || 70000;
```
