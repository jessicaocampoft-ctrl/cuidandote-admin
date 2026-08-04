# Detalles exactos para correcciones de fase 4

Archivo: `index.html`

## Encuestas y NPS

```html
3788:               <label style="font-size:.82rem;color:var(--muted)">Mes:</label>
3789:               <input type="month" id="egresoMesFiltro" oninput="renderEgresosList()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:6px 10px;outline:none">
3790:               <button class="btn btn-ghost btn-sm" onclick="document.getElementById('egresoMesFiltro').value='';renderEgresosList()">Todos</button>
3791:             </div>
3792:           </div>
3793:           <div id="egresosListResult"></div>
3794:         </div>
3795:       </div>
3796: 
3797:       <!-- ══ KPI TABLERO ══ -->
3798:       <div style="margin-top:28px">
3799:         <div class="fin-section-title">📊 Tablero de KPIs de Gestión</div>
3800: 
3801:         <!-- KPIs manuales -->
3802:         <div class="card" style="margin-bottom:16px">
3803:           <div class="card-title" style="margin-bottom:14px">Indicadores manuales de la semana</div>
3804:           <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;align-items:end">
3805:             <div class="field" style="margin:0">
3806:               <label>Leads recibidos (semana)</label>
3807:               <input type="number" id="kpiLeads" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3808:             </div>
3809:             <div class="field" style="margin:0">
3810:               <label>Citas agendadas desde leads</label>
3811:               <input type="number" id="kpiConvertidos" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3812:             </div>
3813:             <div class="field" style="margin:0">
3814:               <label>NPS último mes</label>
3815:               <div id="kpiNPSAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3816:               <input type="hidden" id="kpiNPS" value="0">
3817:             </div>
3818:             <div class="field" style="margin:0">
3819:               <label>Encuestas realizadas</label>
3820:               <div id="kpiEncuestasAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3821:               <input type="hidden" id="kpiEncuestas" value="0">
3822:             </div>
3823:             <div class="field" style="margin:0">
3824:               <label>BD actualizada (%)</label>
3825:               <div id="kpiBDAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--primary);font-family:var(--font-b)">🤖 Calculado automáticamente</div>
3826:               <input type="hidden" id="kpiBD" value="0">
3827:             </div>
3828:             <div style="display:flex;align-items:flex-end;gap:8px;flex-wrap:wrap">
3829:               <button class="btn btn-teal btn-sm" id="btnCargarEncuesta" onclick="loadEncuestaStats()">🔄 Cargar desde formulario</button>
3830:               <button class="btn btn-ghost btn-sm" onclick="guardarKPIManual()">Guardar manual</button>
3831:             </div>
3832:           </div>
3833:         </div>
3834: 
3835:         <!-- Contador de Leads -->
```

## Interfaz del dictado por voz

```html
2745:                 <option value="Jornada">Jornada</option>
2746:                 <option value="Capacitación">Capacitación</option>
2747:                 <option value="Evento externo">Evento externo</option>
2748:                 <option value="Reunión">Reunión</option>
2749:                 <option value="Otro">Otro</option>
2750:               </select>
2751:             </div>
2752:             <div class="field">
2753:               <label>Fecha *</label>
2754:               <input type="date" id="evFecha">
2755:             </div>
2756:             <div class="field">
2757:               <label>Hora inicio *</label>
2758:               <input type="time" id="evHoraInicio" oninput="calcDuracion()">
2759:             </div>
2760:             <div class="field">
2761:               <label>Hora fin *</label>
2762:               <input type="time" id="evHoraFin" oninput="calcDuracion()">
2763:               <span id="evDuracionLabel" style="font-size:.75rem;color:var(--primary);margin-top:4px;display:none"></span>
2764:             </div>
2765:             <div class="field">
2766:               <label>Cobro / Precio</label>
2767:               <input type="text" id="evCobro" placeholder="Ej: $50.000, Gratis, A convenir">
2768:             </div>
2769:             <div class="field" style="grid-column:1/-1">
2770:               <label>Descripción / Notas</label>
2771:               <textarea id="evNotas" rows="2" placeholder="Detalles del evento, lugar, participantes..."></textarea>
2772:             </div>
2773:           </div>
2774:           <div style="margin-top:16px;display:flex;gap:10px">
2775:             <button class="btn btn-teal" onclick="submitEvento()">
2776:               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v4l3 3"/></svg>
2777:               Crear evento
2778:             </button>
2779:             <button class="btn btn-ghost" onclick="clearEvento()">Limpiar</button>
2780:           </div>
2781:         </div>
2782: 
2783:         <!-- ══ FORMULARIO CITA (existente) ══ -->
2784:         <div id="formCita">
2785: 
2786:         <!-- ── COMANDO DE VOZ ── -->
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
2808:           </div>
2809:         </div>
2810:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2811: 
2812:         <!-- ── BUSCADOR PACIENTE EXISTENTE ── -->
2813:         <div class="field" style="margin-bottom:20px;position:relative">
2814:           <label style="font-size:.82rem;color:var(--primary);font-weight:600">
2815:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
2816:             Buscar paciente existente
2817:           </label>
2818:           <input type="text" id="pacSearch"
2819:             placeholder="Escribe nombre o teléfono para autocompletar..."
2820:             oninput="searchPatient(this.value)"
2821:             autocomplete="off"
2822:             style="background:#f0faf9;border-color:rgba(27,191,176,.35)">
2823:           <div id="pacDropdown" style="
2824:             display:none;position:absolute;top:100%;left:0;right:0;z-index:200;
2825:             background:#fff;border:1px solid rgba(27,191,176,.3);border-radius:8px;
2826:             box-shadow:0 8px 24px rgba(0,0,0,.1);max-height:220px;overflow-y:auto;margin-top:4px">
2827:           </div>
2828:           <p style="font-size:.75rem;color:var(--muted);margin-top:5px">Si el paciente ya tiene citas previas, selecciónalo para llenar los datos automáticamente.</p>
2829:         </div>
2830:         <hr style="border:none;border-top:1px solid var(--border);margin-bottom:20px">
2831: 
2832:         <div class="form-grid">
2833:           <div class="field">
2834:             <label>Nombre del paciente *</label>
2835:             <input type="text" id="ncName" placeholder="Nombre completo">
```

## Formulario de Base de datos

```html
5070:             <div style="font-size:.75rem;color:var(--muted);margin-top:3px">Pacientes que no han vuelto — sin cita futura agendada</div>
5071:           </div>
5072:           <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
5073:             <label style="font-size:.78rem;color:var(--muted)">Inactivos hace más de:</label>
5074:             <select id="reacDias" onchange="renderReactivacion()"
5075:               style="font-size:.8rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
5076:               <option value="30">30 días</option>
5077:               <option value="60">60 días</option>
5078:               <option value="90" selected>90 días</option>
5079:               <option value="180">6 meses</option>
5080:               <option value="365">1 año</option>
5081:             </select>
5082:           </div>
5083:         </div>
5084:         <div id="reactivacionResult" style="margin-top:16px"></div>
5085:       </div>
5086: 
5087:       <!-- Formulario agregar paciente -->
5088:       <div class="card" style="margin-bottom:24px">
5089:         <div class="card-title">Agregar paciente</div>
5090:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
5091:           <div class="field">
5092:             <label>Nombre completo *</label>
5093:             <input type="text" id="dbNombre" placeholder="Ana García López" autocomplete="off" oninput="checkDupDB()">
5094:             <div id="dbDupWarn" style="display:none;margin-top:6px;padding:8px 12px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.5);border-radius:8px;font-size:.82rem;color:#92400e">
5095:               ⚠️ Ya existe un paciente con ese nombre: <strong id="dbDupName"></strong>. ¿Seguro que deseas crear otro registro?
5096:             </div>
5097:           </div>
5098:           <div class="field">
5099:             <label>Teléfono / WhatsApp</label>
5100:             <input type="tel" id="dbTelefono" placeholder="3136467945">
5101:           </div>
5102:           <div class="field">
5103:             <label>Correo electrónico</label>
5104:             <input type="email" id="dbEmail" placeholder="correo@email.com">
5105:           </div>
5106:           <div class="field">
5107:             <label>Entidad</label>
5108:             <input type="text" id="dbEntidad" placeholder="EPS, ARL, Particular..." autocomplete="off">
5109:           </div>
5110:           <div class="field">
5111:             <label>Deporte o actividad</label>
5112:             <input type="text" id="dbDeporte" placeholder="Fútbol, natación, yoga, ninguno..." autocomplete="off">
5113:           </div>
5114:           <div class="field">
5115:             <label>Origen del paciente</label>
5116:             <select id="dbOrigen" onchange="dbOnOrigenChange()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;width:100%">
5117:               <option value="">— Selecciona origen —</option>
5118:               <option>Instagram</option><option>Referido</option><option>Gimnasio</option>
5119:               <option>Empresa</option><option>Página web</option><option>Recomendación médica</option><option>Otro</option>
5120:             </select>
5121:             <input type="text" id="dbOrigenSub" placeholder="Nombre del gimnasio / empresa / detalle..." style="display:none;margin-top:6px;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5122:             <!-- Campo extra para referidos con autocomplete de pacientes -->
5123:             <div id="dbReferidoPorWrap" style="display:none;margin-top:6px;position:relative">
5124:               <input type="text" id="dbReferidoPor" placeholder="Nombre de quien la refirió..." autocomplete="off"
5125:                 oninput="dbReferidoFilter()" onfocus="dbReferidoFilter()" onblur="setTimeout(()=>document.getElementById('dbReferidoList').style.display='none',200)"
5126:                 style="width:100%;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.3);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5127:               <ul id="dbReferidoList" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:999;background:var(--s2);border:1px solid rgba(139,92,246,.3);border-radius:8px;margin:3px 0 0;padding:4px 0;max-height:180px;overflow-y:auto;box-shadow:0 4px 16px rgba(0,0,0,.15);list-style:none"></ul>
5128:             </div>
5129:           </div>
5130:           <!-- Banner del código generado (se muestra tras guardar un referido) -->
5131:           <div id="dbCodigoResult" style="display:none;grid-column:1/-1;background:rgba(139,92,246,.08);border:1.5px solid rgba(139,92,246,.35);border-radius:12px;padding:14px 18px">
5132:             <div style="font-size:.75rem;font-weight:700;color:#7c3aed;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">Código REF generado</div>
5133:             <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
5134:               <span id="dbCodigoValor" style="font-family:var(--font-m);font-size:1.3rem;font-weight:700;color:#7c3aed;letter-spacing:.05em"></span>
5135:               <span style="font-size:.8rem;color:var(--muted)">Guardado en Google Sheets · hoja <strong>Codigos</strong></span>
5136:               <button class="btn btn-sm" onclick="showView('codigos')" style="background:rgba(139,92,246,.15);color:#7c3aed;border:1px solid rgba(139,92,246,.3);margin-left:auto">Ver todos los códigos →</button>
5137:             </div>
5138:           </div>
5139:           <div class="field" style="grid-column:1/-1">
5140:             <label>Notas / Diagnóstico</label>
5141:             <textarea id="dbNotas" rows="2" style="resize:vertical;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none" placeholder="Motivo de consulta, diagnóstico, observaciones..."></textarea>
5142:           </div>
5143:         </div>
5144:         <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
5145:           <button class="btn btn-teal" id="dbSubmitBtn" onclick="agregarPacienteDB()">
5146:             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
5147:             Agregar paciente
5148:           </button>
5149:           <button class="btn btn-ghost" onclick="limpiarFormDB()">Limpiar</button>
5150:         </div>
5151:       </div>
5152: 
5153:       <!-- Tabla de pacientes -->
5154:       <div class="card">
5155:         <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
5156:           <div class="card-title" style="margin-bottom:0">Pacientes registrados</div>
5157:           <input type="text" id="dbSearch" placeholder="Buscar por nombre, teléfono o email..." oninput="renderBasedatos()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:.85rem;outline:none;color:var(--text);width:260px;transition:var(--tr)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
5158:         </div>
5159:         <div class="tbl-wrap">
5160:           <table>
5161:             <thead>
5162:               <tr>
5163:                 <th>Paciente</th>
5164:                 <th>Teléfono</th>
5165:                 <th>Email</th>
5166:                 <th>Sesiones</th>
5167:                 <th>Última cita</th>
5168:                 <th>Servicio frecuente</th>
5169:                 <th>Origen</th>
5170:                 <th>Acciones</th>
5171:               </tr>
5172:             </thead>
5173:             <tbody id="dbTbody">
5174:               <tr><td colspan="8"><div class="loading-wrap"><div class="spinner"></div> Cargando...</div></td></tr>
5175:             </tbody>
5176:           </table>
5177:         </div>
5178:       </div>
5179: 
5180:       <!-- Historial de cambios -->
5181:       <div class="card" style="margin-top:24px">
5182:         <div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none" onclick="toggleChangeLog()">
5183:           <div class="card-title" style="margin-bottom:0;display:flex;align-items:center;gap:8px">
5184:             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
5185:             Historial de cambios
```

## Interfaz de meta mensual y presupuesto

```html
4285:           <p>Saber cuántas citas se pierden por semana y mes, qué tipo de servicio cancela más y qué día de la semana tiene más cancelaciones.</p>
4286:           <h5>Importancia</h5>
4287:           <p>Una cancelación no solo es ingreso perdido — también es <strong>tiempo bloqueado que no se pudo reasignar</strong>. Identificar el patrón permite anticiparse y tomar acción antes de que se vuelva hábito.</p>
4288:           <h5>Fórmula</h5>
4289:           <div class="gk-formula">Tasa de cancelación = (Nro. citas canceladas ÷ Nro. total citas del período) × 100
4290: 
4291: Por servicio: Nro. canceladas de cada tipo / período
4292: Por día:      Nro. canceladas por día de la semana / período</div>
4293:           <h5>Cómo se lee</h5>
4294:           <div class="gk-semaforo">
4295:             <div class="gk-sem-item verde">🟢 &lt;10% — Normal, dentro del margen</div>
4296:             <div class="gk-sem-item amarillo">🟡 10–20% — Vigilar, algo está fallando</div>
4297:             <div class="gk-sem-item rojo">🔴 &gt;20% — Crítico, patrón de cancelación</div>
4298:           </div>
4299:           <h5>Explicación</h5>
4300:           <p>Si un <strong>servicio específico cancela más</strong>, revisa si hay problema de precio, tiempo de sesión o expectativa del paciente. Si un <strong>día específico concentra cancelaciones</strong>, refuerza el recordatorio automático 24h antes de esas citas.</p>
4301:           <h5>Acción inmediata</h5>
4302:           <div class="gk-ejemplo">• Enviar recordatorio por WhatsApp 24h antes de la cita
4303: • Confirmar asistencia el día anterior (respuesta de 1 a 2 palabras)
4304: • Si cancela, ofrecer reagendar en el mismo mensaje
4305: • Registrar el motivo de cancelación para detectar patrones</div>
4306:           <h5>Dato en vivo</h5>
4307:           <div id="kpiCancelBreakdown" style="margin-top:6px">
4308:             <span style="font-size:.8rem;color:var(--muted)">Cargando datos...</span>
4309:           </div>
4310:         </div>
4311:       </div>
4312: 
4313:       <!-- DIMENSIÓN 3 -->
4314:       <div class="gk-section-title">🟥 Dimensión 3: Resultados Financieros (Sostenibilidad)</div>
4315:       <p style="font-size:.9rem;color:var(--muted);margin-bottom:14px">El dinero manda. Esta dimensión asegura que los esfuerzos físicos se traduzcan en el cumplimiento de tus metas financieras.</p>
4316: 
4317:       <div class="gk-kpi-card" id="gkKpi5" onclick="toggleKPICard(this)">
4318:         <div class="gk-kpi-header">
4319:           <div class="gk-kpi-left">
4320:             <div class="gk-kpi-name">KPI 5 — Valor de Ventas Brutas (Semanal y Mensual)</div>
4321:             <div class="gk-kpi-summary">El dinero total recaudado por servicios y paquetes, <strong>antes de descontar gastos</strong>.</div>
4322:           </div>
4323:           <div class="gk-kpi-meta">Meta: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span>/mes</div>
4324:           <div class="gk-kpi-toggle">▼</div>
4325:         </div>
4326:         <div class="gk-kpi-body">
4327:           <h5>Utilidad</h5>
4328:           <p>Mide el dinero total recaudado por la prestación de servicios y venta de paquetes.</p>
4329:           <h5>Importancia</h5>
4330:           <p>Es el indicador definitivo de <strong>supervivencia y crecimiento</strong>. Sin ventas suficientes no hay clínica, sin importar cuántos pacientes atendiste.</p>
4331:           <h5>OJO con la palabra "brutas"</h5>
4332:           <p>Ventas brutas NO es lo que te queda. Es lo que <strong>facturas</strong>. Lo que te queda después de pagar gastos es la <strong>utilidad</strong>.</p>
4333:           <h5>Fórmula</h5>
4334:           <div class="gk-formula">Ventas Brutas = Ingresos por Servicios Fisioterapéuticos
4335:               + Ingresos por Contratos Corporativos</div>
4336:           <h5>Explicación — metas</h5>
4337:           <div class="gk-ejemplo">📅 <strong>Meta Semanal Obligatoria: <span class="kpi-ref" data-ref="meta_ventas_semana">$2.566.250</span></strong> — para mantener el ritmo.
4338: 🗓️ <strong>Meta Mensual Total: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></strong> — para cubrir costos, imprevistos y asegurar tu 20% de utilidad.</div>
4339:           <h5>Cómo se lee</h5>
4340:           <div class="gk-semaforo">
4341:             <div class="gk-sem-item verde">🟢 ≥100% — Meta cumplida</div>
4342:             <div class="gk-sem-item amarillo">🟡 84–99% — Cubres operación, no ganas</div>
4343:             <div class="gk-sem-item rojo">🔴 &lt;80% — Pierdes plata</div>
4344:           </div>
4345:           <h5>Truco para no llevarte sorpresas</h5>
4346:           <p>Compara semana a semana, NO al final del mes. Si en la semana 2 vas en $4M cuando deberías ir en $5.1M, <strong>todavía tienes 2 semanas para corregir</strong>.</p>
4347:         </div>
4348:       </div>
4349: 
4350:       <!-- DIMENSIÓN 4 -->
4351:       <div class="gk-section-title">🟪 Dimensión 4: Calidad y Retención</div>
4352: 
4353:       <div class="gk-kpi-card" id="gkKpi6" onclick="toggleKPICard(this)">
4354:         <div class="gk-kpi-header">
4355:           <div class="gk-kpi-left">
4356:             <div class="gk-kpi-name">KPI 6 — Tasa de Encuestas de Satisfacción Realizadas</div>
4357:             <div class="gk-kpi-summary">De los pacientes atendidos, qué porcentaje recibió y contestó la encuesta. <strong>Sin esto el NPS no vale nada.</strong></div>
4358:           </div>
4359:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_encuestas">70</span>%</div>
4360:           <div class="gk-kpi-toggle">▼</div>
4361:         </div>
4362:         <div class="gk-kpi-body">
4363:           <h5>Utilidad</h5>
4364:           <p>Mide el control administrativo sobre la voz del paciente. No puedes evaluar la calidad si solo encuestas al 5% de las personas.</p>
4365:           <h5>Importancia</h5>
4366:           <p>Garantiza que la auxiliar administrativa esté haciendo el <strong>seguimiento post-servicio</strong>. Si la tasa es baja, no es que los pacientes estén satisfechos — es que nadie les está preguntando.</p>
4367:           <h5>Fórmula</h5>
4368:           <div class="gk-formula">Encuestas realizadas = (Nro. Encuestas Contestadas ÷ Nro. Pacientes Dados de Alta o Atendidos) × 100</div>
4369:           <h5>Explicación</h5>
4370:           <p>Tu meta de control debe ser mayor al <strong><span class="kpi-ref" data-ref="meta_encuestas">70</span>%</strong>. Al final de la semana, si atendieron 20 personas, al menos <strong>14 deben haber recibido y contestado</strong> el link de evaluación.</p>
4371:           <h5>Por qué es un KPI "previo" al NPS</h5>
4372:           <p>El NPS te dice qué tan satisfechos están. Pero si solo el 10% contesta, ese NPS <strong>está sesgado</strong>. Para que el NPS sea confiable, al menos <strong>7 de cada 10 pacientes</strong> deben responder.</p>
4373:           <h5>Cuándo enviarla</h5>
4374:           <div class="gk-semaforo">
4375:             <div class="gk-sem-item verde">🟢 El mismo día de la consulta o al día siguiente</div>
4376:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4377:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4378:           </div>
4379:         </div>
4380:       </div>
```

## Guardado de presupuesto y actualización de meta

```html
16280:           ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
16281:           ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}
16282: 
16283:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
16284:           ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
16285:           ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}
16286: 
16287:           <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
16288:             💡 Ticket promedio individual (sesiones sueltas):
16289:             <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
16290:             · Sesiones necesarias/mes:
16291:             <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
16292:           </div>
16293:         </div>
16294: 
16295:         <div class="card">
16296:           <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
16297:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16298:             ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
16299:             ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
16300:             ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
16301:           </div>
16302:         </div>
16303: 
16304:         <button onclick="pmGuardarKPIs()"
16305:           style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
16306:           💾 Guardar metas de KPIs
16307:         </button>
16308: 
16309:       </div>
16310:     </div>`;
16311: }
16312: 
16313: function pmRecalc() {
16314:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16315:   const c = {
16316:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16317:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16318:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
16319:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16320:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16321:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16322:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16323:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16324:   };
16325:   const calc  = calcTotalCostos(c);
16326:   const fmtN  = v => Number(v).toLocaleString('es-CO');
16327:   const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
16328:   set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
16329:   set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
16330:   set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
16331:   set('pm_res_total',       '$' + fmtN(calc.total));
16332:   // Actualizar ticket promedio
16333:   // Ticket promedio = promedio de los 6 servicios individuales (presencial)
16334:   const indivPrecios = [
16335:     g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
16336:     g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
16337:   ];
16338:   const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
16339:   const ta = document.getElementById('pm_ticket_avg');
16340:   const sc = document.getElementById('pm_sess_calc');
16341:   if (ta) ta.textContent = '$' + fmtN(ticket);
16342:   if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
16343: }
16344: 
16345: function pmGuardarCostos() {
16346:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16347:   const costos = {
16348:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16349:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16350:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
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
16372:   renderPresupuestoMetas();
16373: }
16374: 
16375: function pmGuardarKPIs() {
16376:   const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
16377:   const cfg = getKPIConfig();
16378:   // Metas operativas
16379:   cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
16380:   cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
16381:   cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
16382:   cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
16383:   cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
16384:   cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
16385:   cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
16386:   cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
16387:   // Marketing
16388:   cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
16389:   cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
16390:   cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
16391:   // Precios servicios (presencial y domicilio)
16392:   cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
16393:   cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
16394:   cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
16395:   cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
16396:   cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
16397:   cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
16398:   cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
16399:   cfg.sv_valoracion_d       = g('sv_valoracion_d')|| 95000;
16400:   cfg.sv_readap_p           = g('sv_readap_p')    || 70000;
16401:   cfg.sv_readap_d           = g('sv_readap_d')    || 85000;
16402:   cfg.precio_express        = g('sv_express_p')   || 75000;
16403:   cfg.sv_express_d          = g('sv_express_d')   || 90000;
16404:   cfg.sv_diag_p             = g('sv_diag_p')      || 160000;
16405:   cfg.sv_diag_d             = g('sv_diag_d')      || 185000;
```
