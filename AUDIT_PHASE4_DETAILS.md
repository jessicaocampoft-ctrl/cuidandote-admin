# Detalles exactos para correcciones de fase 4

Archivo: `index.html`

## Encuestas y NPS

```html
3788:       </div>
3789: 
3790:       <!-- ══ KPI TABLERO ══ -->
3791:       <div style="margin-top:28px">
3792:         <div class="fin-section-title">📊 Tablero de KPIs de Gestión</div>
3793: 
3794:         <!-- KPIs manuales -->
3795:         <div class="card" style="margin-bottom:16px">
3796:           <div class="card-title" style="margin-bottom:14px">Indicadores manuales de la semana</div>
3797:           <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;align-items:end">
3798:             <div class="field" style="margin:0">
3799:               <label>Leads recibidos (semana)</label>
3800:               <input type="number" id="kpiLeads" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3801:             </div>
3802:             <div class="field" style="margin:0">
3803:               <label>Citas agendadas desde leads</label>
3804:               <input type="number" id="kpiConvertidos" min="0" placeholder="0" style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box">
3805:             </div>
3806:             <div class="field" style="margin:0">
3807:               <label>NPS último mes</label>
3808:               <div id="kpiNPSAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3809:               <input type="hidden" id="kpiNPS" value="0">
3810:             </div>
3811:             <div class="field" style="margin:0">
3812:               <label>Encuestas realizadas</label>
3813:               <div id="kpiEncuestasAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--muted);font-family:var(--font-b)">🤖 Cargando desde formulario...</div>
3814:               <input type="hidden" id="kpiEncuestas" value="0">
3815:             </div>
3816:             <div class="field" style="margin:0">
3817:               <label>BD actualizada (%)</label>
3818:               <div id="kpiBDAutoTag" style="padding:9px 11px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.3);border-radius:8px;font-size:.82rem;color:var(--primary);font-family:var(--font-b)">🤖 Calculado automáticamente</div>
3819:               <input type="hidden" id="kpiBD" value="0">
3820:             </div>
3821:             <div style="display:flex;align-items:flex-end;gap:8px;flex-wrap:wrap">
3822:               <button class="btn btn-teal btn-sm" id="btnCargarEncuesta" onclick="loadEncuestaStats()">🔄 Cargar desde formulario</button>
3823:               <button class="btn btn-ghost btn-sm" onclick="guardarKPIManual()">Guardar manual</button>
3824:             </div>
3825:           </div>
3826:         </div>
3827: 
3828:         <!-- Contador de Leads -->
3829:         <div class="card" style="margin-bottom:16px">
3830:           <div class="card-title">📩 Contador de Leads</div>
3831: 
3832:           <div class="help-banner open" data-help-id="leads-counter" onclick="toggleHelpBanner(this)">
3833:             <div class="help-banner-header">
3834:               <div class="help-banner-title">💡 ¿Cómo usar el contador de leads?</div>
3835:               <div class="help-banner-toggle">▼</div>
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
2797:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2798:           <div style="display:flex;gap:8px">
2799:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2800:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2801:           </div>
2802:         </div>
2803:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2804: 
2805:         <!-- ── BUSCADOR PACIENTE EXISTENTE ── -->
2806:         <div class="field" style="margin-bottom:20px;position:relative">
2807:           <label style="font-size:.82rem;color:var(--primary);font-weight:600">
2808:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
2809:             Buscar paciente existente
2810:           </label>
2811:           <input type="text" id="pacSearch"
2812:             placeholder="Escribe nombre o teléfono para autocompletar..."
2813:             oninput="searchPatient(this.value)"
2814:             autocomplete="off"
2815:             style="background:#f0faf9;border-color:rgba(27,191,176,.35)">
2816:           <div id="pacDropdown" style="
2817:             display:none;position:absolute;top:100%;left:0;right:0;z-index:200;
2818:             background:#fff;border:1px solid rgba(27,191,176,.3);border-radius:8px;
2819:             box-shadow:0 8px 24px rgba(0,0,0,.1);max-height:220px;overflow-y:auto;margin-top:4px">
2820:           </div>
2821:           <p style="font-size:.75rem;color:var(--muted);margin-top:5px">Si el paciente ya tiene citas previas, selecciónalo para llenar los datos automáticamente.</p>
2822:         </div>
2823:         <hr style="border:none;border-top:1px solid var(--border);margin-bottom:20px">
2824: 
2825:         <div class="form-grid">
2826:           <div class="field">
2827:             <label>Nombre del paciente *</label>
2828:             <input type="text" id="ncName" placeholder="Nombre completo">
2829:           </div>
2830:           <div class="field">
2831:             <label>Teléfono</label>
2832:             <input type="tel" id="ncPhone" placeholder="+57 300 000 0000">
2833:           </div>
2834:           <div class="field">
2835:             <label>Email</label>
```

## Formulario de Base de datos

```html
5070:               <option value="60">60 días</option>
5071:               <option value="90" selected>90 días</option>
5072:               <option value="180">6 meses</option>
5073:               <option value="365">1 año</option>
5074:             </select>
5075:           </div>
5076:         </div>
5077:         <div id="reactivacionResult" style="margin-top:16px"></div>
5078:       </div>
5079: 
5080:       <!-- Formulario agregar paciente -->
5081:       <div class="card" style="margin-bottom:24px">
5082:         <div class="card-title">Agregar paciente</div>
5083:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
5084:           <div class="field">
5085:             <label>Nombre completo *</label>
5086:             <input type="text" id="dbNombre" placeholder="Ana García López" autocomplete="off" oninput="checkDupDB()">
5087:             <div id="dbDupWarn" style="display:none;margin-top:6px;padding:8px 12px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.5);border-radius:8px;font-size:.82rem;color:#92400e">
5088:               ⚠️ Ya existe un paciente con ese nombre: <strong id="dbDupName"></strong>. ¿Seguro que deseas crear otro registro?
5089:             </div>
5090:           </div>
5091:           <div class="field">
5092:             <label>Teléfono / WhatsApp</label>
5093:             <input type="tel" id="dbTelefono" placeholder="3136467945">
5094:           </div>
5095:           <div class="field">
5096:             <label>Correo electrónico</label>
5097:             <input type="email" id="dbEmail" placeholder="correo@email.com">
5098:           </div>
5099:           <div class="field">
5100:             <label>Entidad</label>
5101:             <input type="text" id="dbEntidad" placeholder="EPS, ARL, Particular..." autocomplete="off">
5102:           </div>
5103:           <div class="field">
5104:             <label>Deporte o actividad</label>
5105:             <input type="text" id="dbDeporte" placeholder="Fútbol, natación, yoga, ninguno..." autocomplete="off">
5106:           </div>
5107:           <div class="field">
5108:             <label>Origen del paciente</label>
5109:             <select id="dbOrigen" onchange="dbOnOrigenChange()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;width:100%">
5110:               <option value="">— Selecciona origen —</option>
5111:               <option>Instagram</option><option>Referido</option><option>Gimnasio</option>
5112:               <option>Empresa</option><option>Página web</option><option>Recomendación médica</option><option>Otro</option>
5113:             </select>
5114:             <input type="text" id="dbOrigenSub" placeholder="Nombre del gimnasio / empresa / detalle..." style="display:none;margin-top:6px;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5115:             <!-- Campo extra para referidos con autocomplete de pacientes -->
5116:             <div id="dbReferidoPorWrap" style="display:none;margin-top:6px;position:relative">
5117:               <input type="text" id="dbReferidoPor" placeholder="Nombre de quien la refirió..." autocomplete="off"
5118:                 oninput="dbReferidoFilter()" onfocus="dbReferidoFilter()" onblur="setTimeout(()=>document.getElementById('dbReferidoList').style.display='none',200)"
5119:                 style="width:100%;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.3);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5120:               <ul id="dbReferidoList" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:999;background:var(--s2);border:1px solid rgba(139,92,246,.3);border-radius:8px;margin:3px 0 0;padding:4px 0;max-height:180px;overflow-y:auto;box-shadow:0 4px 16px rgba(0,0,0,.15);list-style:none"></ul>
5121:             </div>
5122:           </div>
5123:           <!-- Banner del código generado (se muestra tras guardar un referido) -->
5124:           <div id="dbCodigoResult" style="display:none;grid-column:1/-1;background:rgba(139,92,246,.08);border:1.5px solid rgba(139,92,246,.35);border-radius:12px;padding:14px 18px">
5125:             <div style="font-size:.75rem;font-weight:700;color:#7c3aed;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">Código REF generado</div>
5126:             <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
5127:               <span id="dbCodigoValor" style="font-family:var(--font-m);font-size:1.3rem;font-weight:700;color:#7c3aed;letter-spacing:.05em"></span>
5128:               <span style="font-size:.8rem;color:var(--muted)">Guardado en Google Sheets · hoja <strong>Codigos</strong></span>
5129:               <button class="btn btn-sm" onclick="showView('codigos')" style="background:rgba(139,92,246,.15);color:#7c3aed;border:1px solid rgba(139,92,246,.3);margin-left:auto">Ver todos los códigos →</button>
5130:             </div>
5131:           </div>
5132:           <div class="field" style="grid-column:1/-1">
5133:             <label>Notas / Diagnóstico</label>
5134:             <textarea id="dbNotas" rows="2" style="resize:vertical;width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none" placeholder="Motivo de consulta, diagnóstico, observaciones..."></textarea>
5135:           </div>
5136:         </div>
5137:         <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
5138:           <button class="btn btn-teal" id="dbSubmitBtn" onclick="agregarPacienteDB()">
5139:             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
5140:             Agregar paciente
5141:           </button>
5142:           <button class="btn btn-ghost" onclick="limpiarFormDB()">Limpiar</button>
5143:         </div>
5144:       </div>
5145: 
5146:       <!-- Tabla de pacientes -->
5147:       <div class="card">
5148:         <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
5149:           <div class="card-title" style="margin-bottom:0">Pacientes registrados</div>
5150:           <input type="text" id="dbSearch" placeholder="Buscar por nombre, teléfono o email..." oninput="renderBasedatos()" style="background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:.85rem;outline:none;color:var(--text);width:260px;transition:var(--tr)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
5151:         </div>
5152:         <div class="tbl-wrap">
5153:           <table>
5154:             <thead>
5155:               <tr>
5156:                 <th>Paciente</th>
5157:                 <th>Teléfono</th>
5158:                 <th>Email</th>
5159:                 <th>Sesiones</th>
5160:                 <th>Última cita</th>
5161:                 <th>Servicio frecuente</th>
5162:                 <th>Origen</th>
5163:                 <th>Acciones</th>
5164:               </tr>
5165:             </thead>
5166:             <tbody id="dbTbody">
5167:               <tr><td colspan="8"><div class="loading-wrap"><div class="spinner"></div> Cargando...</div></td></tr>
5168:             </tbody>
5169:           </table>
5170:         </div>
5171:       </div>
5172: 
5173:       <!-- Historial de cambios -->
5174:       <div class="card" style="margin-top:24px">
5175:         <div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none" onclick="toggleChangeLog()">
5176:           <div class="card-title" style="margin-bottom:0;display:flex;align-items:center;gap:8px">
5177:             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
5178:             Historial de cambios
5179:             <span id="changeLogCount" style="font-size:.75rem;font-weight:500;background:var(--primary);color:#fff;padding:1px 7px;border-radius:20px">0</span>
5180:           </div>
5181:           <span id="changeLogChevron" style="font-size:.85rem;color:var(--muted);transition:.2s">▼ Ver</span>
5182:         </div>
5183:         <div id="changeLogPanel" style="display:none;margin-top:16px">
5184:           <div style="display:flex;justify-content:flex-end;margin-bottom:10px">
5185:             <button onclick="clearChangeLog()" style="padding:5px 12px;background:transparent;border:1px solid var(--border);border-radius:7px;color:var(--muted);font-size:.78rem;cursor:pointer;font-family:var(--font-b)">Limpiar historial</button>
```

## Interfaz de meta mensual y presupuesto

```html
4285: Por día:      Nro. canceladas por día de la semana / período</div>
4286:           <h5>Cómo se lee</h5>
4287:           <div class="gk-semaforo">
4288:             <div class="gk-sem-item verde">🟢 &lt;10% — Normal, dentro del margen</div>
4289:             <div class="gk-sem-item amarillo">🟡 10–20% — Vigilar, algo está fallando</div>
4290:             <div class="gk-sem-item rojo">🔴 &gt;20% — Crítico, patrón de cancelación</div>
4291:           </div>
4292:           <h5>Explicación</h5>
4293:           <p>Si un <strong>servicio específico cancela más</strong>, revisa si hay problema de precio, tiempo de sesión o expectativa del paciente. Si un <strong>día específico concentra cancelaciones</strong>, refuerza el recordatorio automático 24h antes de esas citas.</p>
4294:           <h5>Acción inmediata</h5>
4295:           <div class="gk-ejemplo">• Enviar recordatorio por WhatsApp 24h antes de la cita
4296: • Confirmar asistencia el día anterior (respuesta de 1 a 2 palabras)
4297: • Si cancela, ofrecer reagendar en el mismo mensaje
4298: • Registrar el motivo de cancelación para detectar patrones</div>
4299:           <h5>Dato en vivo</h5>
4300:           <div id="kpiCancelBreakdown" style="margin-top:6px">
4301:             <span style="font-size:.8rem;color:var(--muted)">Cargando datos...</span>
4302:           </div>
4303:         </div>
4304:       </div>
4305: 
4306:       <!-- DIMENSIÓN 3 -->
4307:       <div class="gk-section-title">🟥 Dimensión 3: Resultados Financieros (Sostenibilidad)</div>
4308:       <p style="font-size:.9rem;color:var(--muted);margin-bottom:14px">El dinero manda. Esta dimensión asegura que los esfuerzos físicos se traduzcan en el cumplimiento de tus metas financieras.</p>
4309: 
4310:       <div class="gk-kpi-card" id="gkKpi5" onclick="toggleKPICard(this)">
4311:         <div class="gk-kpi-header">
4312:           <div class="gk-kpi-left">
4313:             <div class="gk-kpi-name">KPI 5 — Valor de Ventas Brutas (Semanal y Mensual)</div>
4314:             <div class="gk-kpi-summary">El dinero total recaudado por servicios y paquetes, <strong>antes de descontar gastos</strong>.</div>
4315:           </div>
4316:           <div class="gk-kpi-meta">Meta: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span>/mes</div>
4317:           <div class="gk-kpi-toggle">▼</div>
4318:         </div>
4319:         <div class="gk-kpi-body">
4320:           <h5>Utilidad</h5>
4321:           <p>Mide el dinero total recaudado por la prestación de servicios y venta de paquetes.</p>
4322:           <h5>Importancia</h5>
4323:           <p>Es el indicador definitivo de <strong>supervivencia y crecimiento</strong>. Sin ventas suficientes no hay clínica, sin importar cuántos pacientes atendiste.</p>
4324:           <h5>OJO con la palabra "brutas"</h5>
4325:           <p>Ventas brutas NO es lo que te queda. Es lo que <strong>facturas</strong>. Lo que te queda después de pagar gastos es la <strong>utilidad</strong>.</p>
4326:           <h5>Fórmula</h5>
4327:           <div class="gk-formula">Ventas Brutas = Ingresos por Servicios Fisioterapéuticos
4328:               + Ingresos por Contratos Corporativos</div>
4329:           <h5>Explicación — metas</h5>
4330:           <div class="gk-ejemplo">📅 <strong>Meta Semanal Obligatoria: <span class="kpi-ref" data-ref="meta_ventas_semana">$2.566.250</span></strong> — para mantener el ritmo.
4331: 🗓️ <strong>Meta Mensual Total: <span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></strong> — para cubrir costos, imprevistos y asegurar tu 20% de utilidad.</div>
4332:           <h5>Cómo se lee</h5>
4333:           <div class="gk-semaforo">
4334:             <div class="gk-sem-item verde">🟢 ≥100% — Meta cumplida</div>
4335:             <div class="gk-sem-item amarillo">🟡 84–99% — Cubres operación, no ganas</div>
4336:             <div class="gk-sem-item rojo">🔴 &lt;80% — Pierdes plata</div>
4337:           </div>
4338:           <h5>Truco para no llevarte sorpresas</h5>
4339:           <p>Compara semana a semana, NO al final del mes. Si en la semana 2 vas en $4M cuando deberías ir en $5.1M, <strong>todavía tienes 2 semanas para corregir</strong>.</p>
4340:         </div>
4341:       </div>
4342: 
4343:       <!-- DIMENSIÓN 4 -->
4344:       <div class="gk-section-title">🟪 Dimensión 4: Calidad y Retención</div>
4345: 
4346:       <div class="gk-kpi-card" id="gkKpi6" onclick="toggleKPICard(this)">
4347:         <div class="gk-kpi-header">
4348:           <div class="gk-kpi-left">
4349:             <div class="gk-kpi-name">KPI 6 — Tasa de Encuestas de Satisfacción Realizadas</div>
4350:             <div class="gk-kpi-summary">De los pacientes atendidos, qué porcentaje recibió y contestó la encuesta. <strong>Sin esto el NPS no vale nada.</strong></div>
4351:           </div>
4352:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_encuestas">70</span>%</div>
4353:           <div class="gk-kpi-toggle">▼</div>
4354:         </div>
4355:         <div class="gk-kpi-body">
4356:           <h5>Utilidad</h5>
4357:           <p>Mide el control administrativo sobre la voz del paciente. No puedes evaluar la calidad si solo encuestas al 5% de las personas.</p>
4358:           <h5>Importancia</h5>
4359:           <p>Garantiza que la auxiliar administrativa esté haciendo el <strong>seguimiento post-servicio</strong>. Si la tasa es baja, no es que los pacientes estén satisfechos — es que nadie les está preguntando.</p>
4360:           <h5>Fórmula</h5>
4361:           <div class="gk-formula">Encuestas realizadas = (Nro. Encuestas Contestadas ÷ Nro. Pacientes Dados de Alta o Atendidos) × 100</div>
4362:           <h5>Explicación</h5>
4363:           <p>Tu meta de control debe ser mayor al <strong><span class="kpi-ref" data-ref="meta_encuestas">70</span>%</strong>. Al final de la semana, si atendieron 20 personas, al menos <strong>14 deben haber recibido y contestado</strong> el link de evaluación.</p>
4364:           <h5>Por qué es un KPI "previo" al NPS</h5>
4365:           <p>El NPS te dice qué tan satisfechos están. Pero si solo el 10% contesta, ese NPS <strong>está sesgado</strong>. Para que el NPS sea confiable, al menos <strong>7 de cada 10 pacientes</strong> deben responder.</p>
4366:           <h5>Cuándo enviarla</h5>
4367:           <div class="gk-semaforo">
4368:             <div class="gk-sem-item verde">🟢 El mismo día de la consulta o al día siguiente</div>
4369:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4370:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4371:           </div>
4372:         </div>
4373:       </div>
4374: 
4375:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4376:         <div class="gk-kpi-header">
4377:           <div class="gk-kpi-left">
4378:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4379:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4380:           </div>
```

## Guardado de presupuesto y actualización de meta

```html
16280: 
16281:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Combos y sesiones especiales</div>
16282:           ${inpDoble('sv_diag_p','sv_diag_d','Combo Diagnóstico Pro',cfg.sv_diag_p||160000,cfg.sv_diag_d||185000)}
16283:           ${inpDoble('sv_bienvenida_p','sv_bienvenida_d','Combo Bienvenida',cfg.sv_bienvenida_p||120000,cfg.sv_bienvenida_d||120000)}
16284:           ${inpDoble('sv_mini_p','sv_mini_d','Mini-sesión Familiar 20min',cfg.sv_mini_p||40000,cfg.sv_mini_d||40000)}
16285: 
16286:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Paquetes Readaptación</div>
16287:           ${inpDoble('sv_pkInicio_p','sv_pkInicio_d','Paquete Inicio (6 ses)',cfg.sv_pkInicio_p||378000,cfg.sv_pkInicio_d||469000)}
16288:           ${inpDoble('sv_pkAvance_p','sv_pkAvance_d','Paquete Avance (8 ses)',cfg.sv_pkAvance_p||476000,cfg.sv_pkAvance_d||598000)}
16289:           ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
16290:           ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}
16291: 
16292:           <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
16293:           ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
16294:           ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}
16295: 
16296:           <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
16297:             💡 Ticket promedio individual (sesiones sueltas):
16298:             <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
16299:             · Sesiones necesarias/mes:
16300:             <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
16301:           </div>
16302:         </div>
16303: 
16304:         <div class="card">
16305:           <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
16306:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16307:             ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
16308:             ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
16309:             ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
16310:           </div>
16311:         </div>
16312: 
16313:         <button onclick="pmGuardarKPIs()"
16314:           style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
16315:           💾 Guardar metas de KPIs
16316:         </button>
16317: 
16318:       </div>
16319:     </div>`;
16320: }
16321: 
16322: function pmRecalc() {
16323:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16324:   const c = {
16325:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16326:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16327:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
16328:     suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
16329:     asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
16330:     activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
16331:     mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
16332:     pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
16333:   };
16334:   const calc  = calcTotalCostos(c);
16335:   const fmtN  = v => Number(v).toLocaleString('es-CO');
16336:   const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
16337:   set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
16338:   set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
16339:   set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
16340:   set('pm_res_total',       '$' + fmtN(calc.total));
16341:   // Actualizar ticket promedio
16342:   // Ticket promedio = promedio de los 6 servicios individuales (presencial)
16343:   const indivPrecios = [
16344:     g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
16345:     g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
16346:   ];
16347:   const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
16348:   const ta = document.getElementById('pm_ticket_avg');
16349:   const sc = document.getElementById('pm_sess_calc');
16350:   if (ta) ta.textContent = '$' + fmtN(ticket);
16351:   if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
16352: }
16353: 
16354: function pmGuardarCostos() {
16355:   const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
16356:   const costos = {
16357:     honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
16358:     asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
16359:     arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
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
16381:   renderPresupuestoMetas();
16382: }
16383: 
16384: function pmGuardarKPIs() {
16385:   const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
16386:   const cfg = getKPIConfig();
16387:   // Metas operativas
16388:   cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
16389:   cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
16390:   cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
16391:   cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
16392:   cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
16393:   cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
16394:   cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
16395:   cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
16396:   // Marketing
16397:   cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
16398:   cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
16399:   cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
16400:   // Precios servicios (presencial y domicilio)
16401:   cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
16402:   cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
16403:   cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
16404:   cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
16405:   cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
```
