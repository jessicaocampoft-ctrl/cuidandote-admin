# Contexto exacto para fase 4

Archivo: `index.html`

## Encuestas y NPS

### Línea 3814

```html
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
```

### Línea 3815

```html
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
```

### Línea 3816

```html
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
```

### Línea 3819

```html
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
```

### Línea 3820

```html
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
```

### Línea 3821

```html
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
```

### Línea 3829

```html
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
3836:         <div class="card" style="margin-bottom:16px">
3837:           <div class="card-title">📩 Contador de Leads</div>
3838: 
3839:           <div class="help-banner open" data-help-id="leads-counter" onclick="toggleHelpBanner(this)">
3840:             <div class="help-banner-header">
3841:               <div class="help-banner-title">💡 ¿Cómo usar el contador de leads?</div>
```

### Línea 4356

```html
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
```

### Línea 4357

```html
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
```

### Línea 4359

```html
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
```

### Línea 4364

```html
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
```

### Línea 4368

```html
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

### Línea 4370

```html
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
4381: 
4382:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
```

### Línea 4371

```html
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
4381: 
4382:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4383:         <div class="gk-kpi-header">
```

### Línea 4372

```html
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
4381: 
4382:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4383:         <div class="gk-kpi-header">
4384:           <div class="gk-kpi-left">
```

### Línea 4385

```html
4373:           <h5>Cuándo enviarla</h5>
4374:           <div class="gk-semaforo">
4375:             <div class="gk-sem-item verde">🟢 El mismo día de la consulta o al día siguiente</div>
4376:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4377:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4378:           </div>
4379:         </div>
4380:       </div>
4381: 
4382:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4383:         <div class="gk-kpi-header">
4384:           <div class="gk-kpi-left">
4385:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4386:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4387:           </div>
4388:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4389:           <div class="gk-kpi-toggle">▼</div>
4390:         </div>
4391:         <div class="gk-kpi-body">
4392:           <h5>Utilidad</h5>
4393:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4394:           <h5>Importancia</h5>
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
```

### Línea 4388

```html
4376:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4377:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4378:           </div>
4379:         </div>
4380:       </div>
4381: 
4382:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4383:         <div class="gk-kpi-header">
4384:           <div class="gk-kpi-left">
4385:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4386:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4387:           </div>
4388:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4389:           <div class="gk-kpi-toggle">▼</div>
4390:         </div>
4391:         <div class="gk-kpi-body">
4392:           <h5>Utilidad</h5>
4393:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4394:           <h5>Importancia</h5>
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4398:           <h5>Cómo se clasifican las respuestas</h5>
4399:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4400: Nota 4       →  PASIVOS      — Les da igual
```

### Línea 4395

```html
4383:         <div class="gk-kpi-header">
4384:           <div class="gk-kpi-left">
4385:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4386:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4387:           </div>
4388:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4389:           <div class="gk-kpi-toggle">▼</div>
4390:         </div>
4391:         <div class="gk-kpi-body">
4392:           <h5>Utilidad</h5>
4393:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4394:           <h5>Importancia</h5>
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4398:           <h5>Cómo se clasifican las respuestas</h5>
4399:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4400: Nota 4       →  PASIVOS      — Les da igual
4401: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4402:           <h5>Fórmula de cálculo</h5>
4403:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
```

### Línea 4403

```html
4391:         <div class="gk-kpi-body">
4392:           <h5>Utilidad</h5>
4393:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4394:           <h5>Importancia</h5>
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4398:           <h5>Cómo se clasifican las respuestas</h5>
4399:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4400: Nota 4       →  PASIVOS      — Les da igual
4401: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4402:           <h5>Fórmula de cálculo</h5>
4403:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4408:           <h5>Ejemplo</h5>
4409:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4410: • Promotores:   92%
4411: • Pasivos:       6% (NO suman)
4412: • Detractores:   2%
4413: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4414:           <h5>Cómo se lee</h5>
4415:           <div class="gk-semaforo">
```

### Línea 4405

```html
4393:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4394:           <h5>Importancia</h5>
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4398:           <h5>Cómo se clasifican las respuestas</h5>
4399:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4400: Nota 4       →  PASIVOS      — Les da igual
4401: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4402:           <h5>Fórmula de cálculo</h5>
4403:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4408:           <h5>Ejemplo</h5>
4409:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4410: • Promotores:   92%
4411: • Pasivos:       6% (NO suman)
4412: • Detractores:   2%
4413: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4414:           <h5>Cómo se lee</h5>
4415:           <div class="gk-semaforo">
4416:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4417:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
```

### Línea 4407

```html
4395:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4396:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4397:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4398:           <h5>Cómo se clasifican las respuestas</h5>
4399:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4400: Nota 4       →  PASIVOS      — Les da igual
4401: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4402:           <h5>Fórmula de cálculo</h5>
4403:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4408:           <h5>Ejemplo</h5>
4409:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4410: • Promotores:   92%
4411: • Pasivos:       6% (NO suman)
4412: • Detractores:   2%
4413: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4414:           <h5>Cómo se lee</h5>
4415:           <div class="gk-semaforo">
4416:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4417:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4418:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4419:           </div>
```

### Línea 4413

```html
4401: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4402:           <h5>Fórmula de cálculo</h5>
4403:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4408:           <h5>Ejemplo</h5>
4409:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4410: • Promotores:   92%
4411: • Pasivos:       6% (NO suman)
4412: • Detractores:   2%
4413: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4414:           <h5>Cómo se lee</h5>
4415:           <div class="gk-semaforo">
4416:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4417:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4418:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4419:           </div>
4420:           <h5>Acción inmediata con detractores</h5>
4421:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4422:         </div>
4423:       </div>
4424: 
4425:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
```

### Línea 4416

```html
4404:           <h5>Explicación</h5>
4405:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4406:           <h5>Lo más importante de entender</h5>
4407:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4408:           <h5>Ejemplo</h5>
4409:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4410: • Promotores:   92%
4411: • Pasivos:       6% (NO suman)
4412: • Detractores:   2%
4413: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4414:           <h5>Cómo se lee</h5>
4415:           <div class="gk-semaforo">
4416:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4417:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4418:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4419:           </div>
4420:           <h5>Acción inmediata con detractores</h5>
4421:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4422:         </div>
4423:       </div>
4424: 
4425:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
4426:         <div class="gk-kpi-header">
4427:           <div class="gk-kpi-left">
4428:             <div class="gk-kpi-name">KPI 8 — Porcentaje de Actualización de la Base de Datos</div>
```

### Línea 4762

```html
4750:         </div>
4751:       </div>
4752: 
4753:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4754:       <div class="em-dim" id="emDim_4">
4755:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4756:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4757:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4758:           <span class="em-dim-arr" id="emDA_4">▼</span>
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
```

### Línea 4763

```html
4751:       </div>
4752: 
4753:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4754:       <div class="em-dim" id="emDim_4">
4755:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4756:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4757:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4758:           <span class="em-dim-arr" id="emDA_4">▼</span>
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
```

### Línea 4764

```html
4752: 
4753:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4754:       <div class="em-dim" id="emDim_4">
4755:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4756:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4757:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4758:           <span class="em-dim-arr" id="emDA_4">▼</span>
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
```

### Línea 4765

```html
4753:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4754:       <div class="em-dim" id="emDim_4">
4755:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4756:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4757:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4758:           <span class="em-dim-arr" id="emDA_4">▼</span>
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
```

### Línea 4766

```html
4754:       <div class="em-dim" id="emDim_4">
4755:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4756:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4757:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4758:           <span class="em-dim-arr" id="emDA_4">▼</span>
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
```

### Línea 4771

```html
4759:         </div>
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
```

### Línea 4772

```html
4760:         <div class="em-dim-body" id="emDB_body_4">
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
```

### Línea 4773

```html
4761: 
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
```

### Línea 4774

```html
4762:           <!-- KPI: NPS -->
4763:           <div class="em-card" id="emCard_nps">
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
```

### Línea 4776

```html
4764:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
```

### Línea 4777

```html
4765:               <div class="em-dot gris" id="emDot_nps"></div>
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
```

### Línea 4778

```html
4766:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
```

### Línea 4779

```html
4767:               <span class="em-sev c">🔴 Crítico</span>
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
```

### Línea 4780

```html
4768:               <span class="em-card-time">⏱ 48 h</span>
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
```

### Línea 4781

```html
4769:               <span class="em-carr">▼</span>
4770:             </div>
4771:             <div class="em-card-body" id="emBody_nps">
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
```

### Línea 4784

```html
4772:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
4794:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
```

### Línea 4785

```html
4773:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4774:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4775:               <div class="em-steps">
4776:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4777:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
4794:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
4797:               <span class="em-carr">▼</span>
```

### Línea 4790

```html
4778:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4779:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4780:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4781:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
4794:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
4797:               <span class="em-carr">▼</span>
4798:             </div>
4799:             <div class="em-card-body" id="emBody_enc">
4800:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4801:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4802:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
```

### Línea 4794

```html
4782:               </div>
4783:               <div class="em-card-footer">
4784:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4785:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4786:               </div>
4787:             </div>
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
4794:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
4797:               <span class="em-carr">▼</span>
4798:             </div>
4799:             <div class="em-card-body" id="emBody_enc">
4800:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4801:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4802:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4803:               <div class="em-steps">
4804:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4805:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4806:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
```

### Línea 4800

```html
4788:           </div>
4789: 
4790:           <!-- KPI: Encuestas -->
4791:           <div class="em-card" id="emCard_enc">
4792:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4793:               <div class="em-dot gris" id="emDot_enc"></div>
4794:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
4797:               <span class="em-carr">▼</span>
4798:             </div>
4799:             <div class="em-card-body" id="emBody_enc">
4800:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4801:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4802:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4803:               <div class="em-steps">
4804:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4805:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4806:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4807:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4808:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4809:               </div>
4810:               <div class="em-card-footer">
4811:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4812:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
```

### Línea 4807

```html
4795:               <span class="em-sev m">🔵 Monitorear</span>
4796:               <span class="em-card-time">⏱ 15 min</span>
4797:               <span class="em-carr">▼</span>
4798:             </div>
4799:             <div class="em-card-body" id="emBody_enc">
4800:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4801:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4802:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4803:               <div class="em-steps">
4804:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4805:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4806:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4807:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4808:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4809:               </div>
4810:               <div class="em-card-footer">
4811:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4812:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
4813:               </div>
4814:             </div>
4815:           </div>
4816: 
4817:           <!-- KPI: BD actualizada -->
4818:           <div class="em-card" id="emCard_bd">
4819:             <div class="em-card-hdr" onclick="toggleEmCard('bd')">
```

### Línea 4955

```html
4943:             <input type="checkbox" id="rck_s7" onchange="toggleRutinaCheck('s7')">
4944:             <span>Iniciar campaña de recuperación de pacientes inactivos — enviar mensaje personalizado a los que no han vuelto en 30+ días</span>
4945:           </label>
4946:         </div>
4947: 
4948:         <div class="gk-rutina-grupo">
4949:           <div class="gk-rutina-titulo" style="display:flex;justify-content:space-between;align-items:center">
4950:             <span>🗓️ MENSUAL (1 hora el primer lunes del mes)</span>
4951:             <button onclick="resetRutinaGrupo('m')" style="font-size:.68rem;padding:3px 10px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:6px;cursor:pointer;font-family:var(--font-b)">↺ Reiniciar</button>
4952:           </div>
4953:           <label class="gk-check-item" onclick="toggleRutinaCheck('m1')">
4954:             <input type="checkbox" id="rck_m1" onchange="toggleRutinaCheck('m1')">
4955:             <span>Presionar <strong>🔄 Cargar encuestas</strong> para calcular NPS y % de respuestas automáticamente</span>
4956:           </label>
4957: 
4958:           <label class="gk-check-item" onclick="toggleRutinaCheck('m3')">
4959:             <input type="checkbox" id="rck_m3" onchange="toggleRutinaCheck('m3')">
4960:             <span>Revisar mix de servicios del mes — ¿la Descarga Full superó el 30%?</span>
4961:           </label>
4962:           <label class="gk-check-item" onclick="toggleRutinaCheck('m4')">
4963:             <input type="checkbox" id="rck_m4" onchange="toggleRutinaCheck('m4')">
4964:             <span>Comparar ingresos del mes vs mes anterior en la gráfica de Finanzas</span>
4965:           </label>
4966:           <label class="gk-check-item" onclick="toggleRutinaCheck('m5')">
4967:             <input type="checkbox" id="rck_m5" onchange="toggleRutinaCheck('m5')">
```

### Línea 5412

```html
5400:         <div class="co-sep"></div>
5401:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Creador de Contenido</div>
5402:         <div class="co-cfg-grid">
5403:           <div><label class="co-inp-label">Bono total contenido (si cumple meta)</label><input class="co-inp" id="cfg_bono_contenido" type="number" placeholder="50000"></div>
5404:           <div><label class="co-inp-label">% del bono que va a la Auxiliar</label><input class="co-inp" id="cfg_contenido_split_aux" type="number" placeholder="50"></div>
5405:           <div><label class="co-inp-label">Nombre de la persona del video</label><input class="co-inp" id="cfg_contenido_persona" type="text" placeholder="Nombre"></div>
5406:           <div><label class="co-inp-label">Meta mínima de leads para ganar el bono</label><input class="co-inp" id="cfg_contenido_leads_meta" type="number" placeholder="5"></div>
5407:         </div>
5408: 
5409:         <div class="co-sep"></div>
5410:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Todo el Equipo</div>
5411:         <div class="co-cfg-grid">
5412:           <div><label class="co-inp-label">Meta de calidad del servicio (NPS %)</label><input class="co-inp" id="cfg_equipo_nps_meta" type="number" placeholder="90"></div>
5413:         </div>
5414: 
5415:         <button onclick="saveComisConfig()" style="padding:8px 20px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem">Guardar configuración</button>
5416:         <span id="coConfigMsg" style="font-size:.75rem;color:var(--ok);margin-left:10px;display:none">✓ Guardado</span>
5417:       </div>
5418: 
5419:       <!-- Tarjetas principales (2-columnas) -->
5420:       <div class="co-grid" id="coCards">
5421:         <div style="color:var(--muted);font-size:.9rem;padding:40px 0;text-align:center;grid-column:1/-1">Cargando comisiones...</div>
5422:       </div>
5423: 
5424:       <!-- Creador de Contenido (ancho completo) -->
```

### Línea 5507

```html
5495:         </div>
5496:         <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:14px">
5497:           <div>
5498:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Nombre del paciente *</label>
5499:             <input id="recInpPaciente" type="text" placeholder="Ej: María López" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5500:           </div>
5501:           <div>
5502:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Fecha de la cita recuperada *</label>
5503:             <input id="recInpFecha" type="date" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5504:           </div>
5505:           <div>
5506:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Servicio *</label>
5507:             <select id="recInpServicio" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none;cursor:pointer">
5508:               <option value="">Seleccionar...</option>
5509:               <option value="Express Cuello">Express Cuello</option>
5510:               <option value="Express Piernas">Express Piernas</option>
5511:               <option value="Express Completa">Express Completa</option>
5512:               <option value="Full">Full (1.5h)</option>
5513:               <option value="Valoración">Valoración Postural</option>
5514:               <option value="Readaptación">Readaptación Funcional</option>
5515:               <option value="Pack 3 sesiones">Pack 3 sesiones</option>
5516:               <option value="Pack 6 sesiones">Pack 6 sesiones</option>
5517:               <option value="Pack 10 sesiones">Pack 10 sesiones</option>
5518:               <option value="Membresía">Membresía</option>
5519:               <option value="Otro">Otro</option>
```

### Línea 5586

```html
5574:       <div style="background:var(--s2);border:1px solid var(--border);border-radius:14px;margin-bottom:24px;overflow:hidden">
5575:         <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
5576:           <div>
5577:             <div style="font-family:var(--font-h);font-size:.95rem;font-weight:700">Campaña de Referidos del Mes</div>
5578:             <div style="font-size:.78rem;color:var(--muted);margin-top:2px">Pacientes que asistieron este mes · envíales su código de referido personalizado</div>
5579:           </div>
5580:           <button onclick="cargarCampañaReferidos()" style="padding:8px 16px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem;display:flex;align-items:center;gap:6px">
5581:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
5582:             Cargar pacientes del mes
5583:           </button>
5584:         </div>
5585:         <div style="padding:14px 16px;background:linear-gradient(135deg,#f5f3ff,#ede9fe20);border-bottom:1px solid var(--border);font-size:.82rem;color:var(--text);line-height:1.55">
5586:           <strong>¿Cómo funciona?</strong> Se listan los pacientes que vinieron este mes. Cada uno recibe un código REF único por WhatsApp. Cuando ese código lo usa un amigo al agendar, tú registras la referencia en la sección Códigos. Tu NPS de 100 significa que <strong>todos tus pacientes actuales son promotores potenciales</strong> — solo hay que activarlos.
5587:         </div>
5588:         <div id="refCampañaPanel" style="padding:20px">
5589:           <div style="text-align:center;color:var(--muted);padding:30px;font-size:.88rem">Haz clic en "Cargar pacientes del mes" para ver la lista</div>
5590:         </div>
5591:       </div>
5592: 
5593:     </section>
5594: 
5595:     <!-- ── MENSAJES PREDETERMINADOS ── -->
5596:     <section id="vMensajes" style="display:none">
5597:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
5598:         <div>
```

### Línea 7705

```html
7693:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7694:   </div>`;
7695:   document.body.appendChild(modal);
7696:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7697: }
7698: 
7699: const KPI_INTERACTIVE = {
7700:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7701:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7702:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7703:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7704:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7705:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7706:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7707:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7708:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7709:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7710: };
7711: let _activeKPIExplorer = null;
7712: 
7713: function _kpiSnapshot(m,y) {
7714:   const citas = citasReales();
7715:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7716:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7717:   const leads = getLeadsMes(m,y);
```

### Línea 7706

```html
7694:   </div>`;
7695:   document.body.appendChild(modal);
7696:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7697: }
7698: 
7699: const KPI_INTERACTIVE = {
7700:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7701:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7702:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7703:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7704:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7705:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7706:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7707:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7708:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7709:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7710: };
7711: let _activeKPIExplorer = null;
7712: 
7713: function _kpiSnapshot(m,y) {
7714:   const citas = citasReales();
7715:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7716:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7717:   const leads = getLeadsMes(m,y);
7718:   const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
```

### Línea 7738

```html
7726:     gkKpi1:mes.length,
7727:     gkKpi2:mes.length?Math.round(mixFull/mes.length*100):0,
7728:     gkKpi3:leads,
7729:     gkKpi4:leads?Math.round(mes.length/leads*100):null,
7730:     gkKpi5:calcCobradoMes(m,y),
7731:     gkKpi6:null,gkKpi7:null,
7732:     gkKpi8:bd?bd.pct:null,
7733:     gkKpi4b:todas.length?Math.round(cancel/todas.length*100):0,
7734:     gkKpi9:retTotal?Math.round(Object.values(cuenta).filter(n=>n>=2).length/retTotal*100):0
7735:   };
7736:   const saved = _kpiServerHistory[`${y}-${String(m).padStart(2,'0')}`];
7737:   if (saved) {
7738:     if (saved.nps !== null) snapshot.gkKpi7 = saved.nps;
7739:     if (saved.sessions) snapshot.gkKpi6 = Math.round((saved.surveyResponses||0) / saved.sessions * 100);
7740:   }
7741:   return snapshot;
7742: }
7743: 
7744: async function loadKPIHistoryFromServer() {
7745:   try {
7746:     const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7747:     if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
7748:   } catch(e) {}
7749: }
7750: 
```

### Línea 7856

```html
7844:         if (_f.desde   !== undefined) document.getElementById('fDesde').value   = _f.desde;
7845:         if (_f.hasta   !== undefined) document.getElementById('fHasta').value   = _f.hasta;
7846:       } catch(e) {}
7847:     }
7848:     renderAgenda();
7849:   }
7850:   if (v === 'bloquear')       renderBloqueos();
7851:   if (v === 'pacientes')      renderPacientes();
7852:   if (v === 'equipo')         { loadTeamData().then(renderEquipo); }
7853:   if (v === 'calendario')     renderCalendar();
7854:   if (v === 'recordatorios')  cargarRecordatorios();
7855:   if (v === 'basedatos')      { renderBasedatos(); initFormDB(); renderChangeLog(); renderReactivacion(); }
7856:   if (v === 'finanzas')       { renderFinanzas(); actualizarContadorLeads(); _renderEncuestaStatsUI(getEncuestaStats()); }
7857:   if (v === 'pagos')          { loadOperationsData().then(renderPagos); }
7858:   if (v === 'seguimiento')    renderSeguimiento();
7859:   if (v === 'tareas')         renderTareas();
7860:   if (v === 'tareasConfig')   initTareasConfig();
7861:   if (v === 'paquetes')       renderPaquetes();
7862:   if (v === 'mensajes')       renderMensajes();
7863:   if (v === 'empresas')       renderEmpresas();
7864:   if (v === 'codigos')        renderCodigos();
7865:   if (v === 'guiakpis')       { renderKPIGuia(); actualizarContadorLeads(); loadRutinaChecks(); loadKPIHistoryFromServer(); }
7866:   if (v === 'presupuesto')    { renderPresupuestoMetas(); }
7867:   if (v === 'comisiones')     renderComisiones();
7868:   if (v === 'recuperacion')   renderRecuperaciones();
```

### Línea 13320

```html
13308:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13309:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13310:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13311: }
13312: 
13313: const KPI_CONFIG_DEFAULTS = {
13314:   meta_sesiones_semana: 30,
13315:   meta_ventas_mes:      10265000,
13316:   meta_leads_min:       40,
13317:   meta_leads_max:       50,
13318:   meta_conv_min:        25,
13319:   meta_conv_max:        35,
13320:   meta_nps:             90,
13321:   meta_encuestas:       70,
13322:   meta_cancelacion:     10,
13323:   meta_retencion:       60,
13324:   inv_mkt_total:        340000,
13325:   inv_mkt_pauta:        100000,
13326:   inv_mkt_contenido:    240000,
13327:   precio_full:          110000,
13328:   duracion_full:        90,
13329:   precio_express:       75000,
13330:   duracion_express:     50,
13331:   // Precios por servicio (presencial / domicilio)
13332:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
```

### Línea 13321

```html
13309:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13310:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13311: }
13312: 
13313: const KPI_CONFIG_DEFAULTS = {
13314:   meta_sesiones_semana: 30,
13315:   meta_ventas_mes:      10265000,
13316:   meta_leads_min:       40,
13317:   meta_leads_max:       50,
13318:   meta_conv_min:        25,
13319:   meta_conv_max:        35,
13320:   meta_nps:             90,
13321:   meta_encuestas:       70,
13322:   meta_cancelacion:     10,
13323:   meta_retencion:       60,
13324:   inv_mkt_total:        340000,
13325:   inv_mkt_pauta:        100000,
13326:   inv_mkt_contenido:    240000,
13327:   precio_full:          110000,
13328:   duracion_full:        90,
13329:   precio_express:       75000,
13330:   duracion_express:     50,
13331:   // Precios por servicio (presencial / domicilio)
13332:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
13333:   sv_piernas_p:    75000,  sv_piernas_d:     90000,
```

### Línea 13368

```html
13356:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13357:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13358:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13359:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13360:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13361: }
13362: 
13363: const _cfg0 = getKPIConfig();
13364: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13365: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
```

### Línea 13369

```html
13357:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13358:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13359:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13360:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13361: }
13362: 
13363: const _cfg0 = getKPIConfig();
13364: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13365: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
```

### Línea 13426

```html
13414:     completos,
13415:     total:     pacs.length,
13416:     sinTel,
13417:     sinEmail,
13418:   };
13419: }
13420: 
13421: function reloadMetas() {
13422:   const cfg = getKPIConfig();
13423:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13424:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13425:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13426:   META_NPS             = cfg.meta_nps;
13427:   META_ENCUESTAS       = cfg.meta_encuestas;
13428:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13429:   META_RETENCION_PCT   = cfg.meta_retencion;
13430:   // Sincronizar precios de servicios siempre
13431:   _syncPreciosToAutoFill(cfg);
13432: }
13433: 
13434: function getKPIManual() {
13435:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13436: }
13437: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13438: 
```

### Línea 13427

```html
13415:     total:     pacs.length,
13416:     sinTel,
13417:     sinEmail,
13418:   };
13419: }
13420: 
13421: function reloadMetas() {
13422:   const cfg = getKPIConfig();
13423:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13424:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13425:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13426:   META_NPS             = cfg.meta_nps;
13427:   META_ENCUESTAS       = cfg.meta_encuestas;
13428:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13429:   META_RETENCION_PCT   = cfg.meta_retencion;
13430:   // Sincronizar precios de servicios siempre
13431:   _syncPreciosToAutoFill(cfg);
13432: }
13433: 
13434: function getKPIManual() {
13435:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13436: }
13437: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13438: 
13439: // ═══════════════════════════════════════════════
```

### Línea 13565

```html
13553:   const elGHoy = document.getElementById('leadsHoyGuia');
13554:   const elGSem = document.getElementById('leadsSemGuia');
13555:   const elGMes = document.getElementById('leadsMesGuia');
13556:   if (elGHoy) elGHoy.textContent = hoy;
13557:   if (elGSem) elGSem.textContent = sem;
13558:   if (elGMes) elGMes.textContent = mes;
13559: }
13560: 
13561: function guardarKPIManual() {
13562:   const obj = {
13563:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13564:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13565:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13566:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13567:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13568:   };
13569:   saveKPIManual(obj);
13570:   toast('KPIs guardados', 'ok');
13571:   renderKPITablero();
13572: }
13573: 
13574: function renderKPITablero() {
13575:   const el = document.getElementById('kpiTableroResult');
13576:   if (!el) return;
13577: 
```

### Línea 13566

```html
13554:   const elGSem = document.getElementById('leadsSemGuia');
13555:   const elGMes = document.getElementById('leadsMesGuia');
13556:   if (elGHoy) elGHoy.textContent = hoy;
13557:   if (elGSem) elGSem.textContent = sem;
13558:   if (elGMes) elGMes.textContent = mes;
13559: }
13560: 
13561: function guardarKPIManual() {
13562:   const obj = {
13563:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13564:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13565:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13566:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13567:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13568:   };
13569:   saveKPIManual(obj);
13570:   toast('KPIs guardados', 'ok');
13571:   renderKPITablero();
13572: }
13573: 
13574: function renderKPITablero() {
13575:   const el = document.getElementById('kpiTableroResult');
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
```

### Línea 13583

```html
13571:   renderKPITablero();
13572: }
13573: 
13574: function renderKPITablero() {
13575:   const el = document.getElementById('kpiTableroResult');
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
13579:   const manual = getKPIManual();
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
```

### Línea 13584

```html
13572: }
13573: 
13574: function renderKPITablero() {
13575:   const el = document.getElementById('kpiTableroResult');
13576:   if (!el) return;
13577: 
13578:   // Cargar valores manuales guardados en inputs
13579:   const manual = getKPIManual();
13580:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13581:   setVal('kpiLeads', manual.leads);
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
```

### Línea 13677

```html
13665:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13666:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13667: 
13668:   if (tasa !== null) {
13669:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
```

### Línea 13678

```html
13666:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13667: 
13668:   if (tasa !== null) {
13669:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
```

### Línea 13679

```html
13667: 
13668:   if (tasa !== null) {
13669:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
13691:   const canalMap = {};
```

### Línea 13680

```html
13668:   if (tasa !== null) {
13669:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
13691:   const canalMap = {};
13692:   citas.filter(c => {
```

### Línea 13682

```html
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
13691:   const canalMap = {};
13692:   citas.filter(c => {
13693:     const [cy,cm] = normDate(c.fecha).split('-');
13694:     const estado = (c.estado || '').toLowerCase();
```

### Línea 13683

```html
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
13691:   const canalMap = {};
13692:   citas.filter(c => {
13693:     const [cy,cm] = normDate(c.fecha).split('-');
13694:     const estado = (c.estado || '').toLowerCase();
13695:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
```

### Línea 13684

```html
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
13678:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13679:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13680:   const _npsMeta   = _encStats.promotores !== undefined
13681:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13682:     : `>${META_NPS}%`;
13683:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13684:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13685:   const _bdAuto = calcBDActualizada();
13686:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13687:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13688:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13689: 
13690:   // ───── KPI: Ingreso por canal (mes actual) ─────
13691:   const canalMap = {};
13692:   citas.filter(c => {
13693:     const [cy,cm] = normDate(c.fecha).split('-');
13694:     const estado = (c.estado || '').toLowerCase();
13695:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
13696:   }).forEach(c => {
```

### Línea 14495

```html
14483:   const citasNuevasMes = citasMes.length;
14484:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14485: 
14486:   // Canal de captación
14487:   const canalMap = {};
14488:   const canalIngMap = {};
14489:   citasMes.forEach(c => {
14490:     const canal = c.canal||'Directo';
14491:     canalMap[canal] = (canalMap[canal]||0)+1;
14492:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14493:   });
14494: 
14495:   // ── NPS y encuestas ──
14496:   const encStats = getEncuestaStats();
14497:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14498:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14499: 
14500:   // ── BD ──
14501:   const bdAuto = calcBDActualizada();
14502:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14503: 
14504:   // ── CAC ──
14505:   const egresosMkt = egresosAll.filter(e =>
14506:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14507:   ).reduce((s,e)=>s+(e.monto||0), 0);
```

### Línea 14496

```html
14484:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14485: 
14486:   // Canal de captación
14487:   const canalMap = {};
14488:   const canalIngMap = {};
14489:   citasMes.forEach(c => {
14490:     const canal = c.canal||'Directo';
14491:     canalMap[canal] = (canalMap[canal]||0)+1;
14492:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14493:   });
14494: 
14495:   // ── NPS y encuestas ──
14496:   const encStats = getEncuestaStats();
14497:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14498:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14499: 
14500:   // ── BD ──
14501:   const bdAuto = calcBDActualizada();
14502:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14503: 
14504:   // ── CAC ──
14505:   const egresosMkt = egresosAll.filter(e =>
14506:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14507:   ).reduce((s,e)=>s+(e.monto||0), 0);
14508:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
```

### Línea 14497

```html
14485: 
14486:   // Canal de captación
14487:   const canalMap = {};
14488:   const canalIngMap = {};
14489:   citasMes.forEach(c => {
14490:     const canal = c.canal||'Directo';
14491:     canalMap[canal] = (canalMap[canal]||0)+1;
14492:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14493:   });
14494: 
14495:   // ── NPS y encuestas ──
14496:   const encStats = getEncuestaStats();
14497:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14498:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14499: 
14500:   // ── BD ──
14501:   const bdAuto = calcBDActualizada();
14502:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14503: 
14504:   // ── CAC ──
14505:   const egresosMkt = egresosAll.filter(e =>
14506:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14507:   ).reduce((s,e)=>s+(e.monto||0), 0);
14508:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14509: 
```

### Línea 14498

```html
14486:   // Canal de captación
14487:   const canalMap = {};
14488:   const canalIngMap = {};
14489:   citasMes.forEach(c => {
14490:     const canal = c.canal||'Directo';
14491:     canalMap[canal] = (canalMap[canal]||0)+1;
14492:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14493:   });
14494: 
14495:   // ── NPS y encuestas ──
14496:   const encStats = getEncuestaStats();
14497:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14498:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14499: 
14500:   // ── BD ──
14501:   const bdAuto = calcBDActualizada();
14502:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14503: 
14504:   // ── CAC ──
14505:   const egresosMkt = egresosAll.filter(e =>
14506:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14507:   ).reduce((s,e)=>s+(e.monto||0), 0);
14508:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14509: 
14510:   // ══ Helpers ══
```

### Línea 14542

```html
14530:   if (tasaConv!==null && tasaConv<25) {
14531:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14532:   }
14533:   if (tasaCancel>META_CANCELACION_PCT) {
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
14537:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14538:   }
14539:   if (tasaRet<META_RETENCION_PCT) {
14540:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14541:   }
14542:   if (npsVal<META_NPS) {
14543:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14544:   }
14545:   if (encPct<META_ENCUESTAS) {
14546:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14547:   }
14548:   if (bdPct<100) {
14549:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14550:   }
14551: 
14552:   const fci = (key, val) =>
14553:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14554:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
```

### Línea 14543

```html
14531:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14532:   }
14533:   if (tasaCancel>META_CANCELACION_PCT) {
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
14537:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14538:   }
14539:   if (tasaRet<META_RETENCION_PCT) {
14540:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14541:   }
14542:   if (npsVal<META_NPS) {
14543:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14544:   }
14545:   if (encPct<META_ENCUESTAS) {
14546:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14547:   }
14548:   if (bdPct<100) {
14549:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14550:   }
14551: 
14552:   const fci = (key, val) =>
14553:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14554:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14555:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
```

### Línea 14545

```html
14533:   if (tasaCancel>META_CANCELACION_PCT) {
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
14537:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14538:   }
14539:   if (tasaRet<META_RETENCION_PCT) {
14540:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14541:   }
14542:   if (npsVal<META_NPS) {
14543:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14544:   }
14545:   if (encPct<META_ENCUESTAS) {
14546:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14547:   }
14548:   if (bdPct<100) {
14549:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14550:   }
14551: 
14552:   const fci = (key, val) =>
14553:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14554:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14555:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14556:              text-align:right;box-sizing:border-box"
14557:       oninput="_recalcCostos()">`;
```

### Línea 14546

```html
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
14537:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14538:   }
14539:   if (tasaRet<META_RETENCION_PCT) {
14540:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14541:   }
14542:   if (npsVal<META_NPS) {
14543:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14544:   }
14545:   if (encPct<META_ENCUESTAS) {
14546:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14547:   }
14548:   if (bdPct<100) {
14549:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14550:   }
14551: 
14552:   const fci = (key, val) =>
14553:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14554:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14555:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14556:              text-align:right;box-sizing:border-box"
14557:       oninput="_recalcCostos()">`;
14558: 
```

### Línea 14575

```html
14563:     </div>`;
14564: 
14565:   let html = '';
14566: 
14567:   // ══════════════════════════════════════════
14568:   // 1 · RESUMEN EJECUTIVO
14569:   // ══════════════════════════════════════════
14570:   const kpisOk   = [
14571:     ventasCobradas >= META_VENTAS_MES,
14572:     totalSesiones  >= metaSesionesMes,
14573:     tasaCancel     <= META_CANCELACION_PCT,
14574:     tasaRet        >= META_RETENCION_PCT,
14575:     npsVal         >= META_NPS,
14576:   ].filter(Boolean).length;
14577:   const totalKpis = 5;
14578:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14579:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14580:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14581:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14582: 
14583:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14584:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14585:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14586:       <div style="flex:1">
14587:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
```

### Línea 14946

```html
14934:         <span style="font-size:.7rem;color:var(--muted)">${sess} sesión${sess===1?'':'es'} · ${pp}% del ingreso total</span>
14935:       </div>`;
14936:     });
14937:     html += `</div></div>`;
14938:   } else {
14939:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14940:   }
14941: 
14942:   // ══════════════════════════════════════════
14943:   // 7 · CALIDAD Y SATISFACCIÓN
14944:   // ══════════════════════════════════════════
14945:   html += _secTitle('⭐','Calidad y Satisfacción');
14946:   const npsC = _semCell(npsVal, META_NPS);
14947:   const encC = _semCell(encPct, META_ENCUESTAS);
14948:   const bdC  = _semCell(bdPct, 100);
14949:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14950:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14951:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14952:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14953:   html += `</div>`;
14954: 
14955:   // ══════════════════════════════════════════
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
```

### Línea 14947

```html
14935:       </div>`;
14936:     });
14937:     html += `</div></div>`;
14938:   } else {
14939:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14940:   }
14941: 
14942:   // ══════════════════════════════════════════
14943:   // 7 · CALIDAD Y SATISFACCIÓN
14944:   // ══════════════════════════════════════════
14945:   html += _secTitle('⭐','Calidad y Satisfacción');
14946:   const npsC = _semCell(npsVal, META_NPS);
14947:   const encC = _semCell(encPct, META_ENCUESTAS);
14948:   const bdC  = _semCell(bdPct, 100);
14949:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14950:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14951:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14952:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14953:   html += `</div>`;
14954: 
14955:   // ══════════════════════════════════════════
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
```

### Línea 14950

```html
14938:   } else {
14939:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14940:   }
14941: 
14942:   // ══════════════════════════════════════════
14943:   // 7 · CALIDAD Y SATISFACCIÓN
14944:   // ══════════════════════════════════════════
14945:   html += _secTitle('⭐','Calidad y Satisfacción');
14946:   const npsC = _semCell(npsVal, META_NPS);
14947:   const encC = _semCell(encPct, META_ENCUESTAS);
14948:   const bdC  = _semCell(bdPct, 100);
14949:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14950:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14951:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14952:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14953:   html += `</div>`;
14954: 
14955:   // ══════════════════════════════════════════
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14960:   const rows = [
14961:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14962:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
```

### Línea 14951

```html
14939:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14940:   }
14941: 
14942:   // ══════════════════════════════════════════
14943:   // 7 · CALIDAD Y SATISFACCIÓN
14944:   // ══════════════════════════════════════════
14945:   html += _secTitle('⭐','Calidad y Satisfacción');
14946:   const npsC = _semCell(npsVal, META_NPS);
14947:   const encC = _semCell(encPct, META_ENCUESTAS);
14948:   const bdC  = _semCell(bdPct, 100);
14949:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14950:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14951:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14952:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14953:   html += `</div>`;
14954: 
14955:   // ══════════════════════════════════════════
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14960:   const rows = [
14961:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14962:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14963:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
```

### Línea 14968

```html
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14960:   const rows = [
14961:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14962:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14963:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14964:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14965:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14966:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14967:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14968:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14969:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14970:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14971:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14972:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14973:   ];
14974:   rows.forEach(([icon,label,val,c,sub]) => {
14975:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14976:   });
14977:   html += `</div>`;
14978: 
14979:   // ══════════════════════════════════════════
14980:   // 9 · PLAN DE MEJORA
```

### Línea 14969

```html
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14960:   const rows = [
14961:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14962:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14963:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14964:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14965:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14966:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14967:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14968:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14969:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14970:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14971:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14972:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14973:   ];
14974:   rows.forEach(([icon,label,val,c,sub]) => {
14975:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14976:   });
14977:   html += `</div>`;
14978: 
14979:   // ══════════════════════════════════════════
14980:   // 9 · PLAN DE MEJORA
14981:   // ══════════════════════════════════════════
```

### Línea 15122

```html
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15111:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15112: 
15113:   // ── Leads y marketing ──
15114:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15115:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15116:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15117:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15118:   const canalMap={}, canalIng={};
15119:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15120: 
15121:   // ── Calidad ──
15122:   const encStats=getEncuestaStats();
15123:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15124:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15125:   const bdAuto  = calcBDActualizada();
15126:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15127: 
15128:   // ── Semanas ──
15129:   const semanas=[0,0,0,0,0];
15130:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15131:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15132: 
15133:   // ── Días pico ──
15134:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
```

### Línea 15123

```html
15111:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15112: 
15113:   // ── Leads y marketing ──
15114:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15115:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15116:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15117:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15118:   const canalMap={}, canalIng={};
15119:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15120: 
15121:   // ── Calidad ──
15122:   const encStats=getEncuestaStats();
15123:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15124:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15125:   const bdAuto  = calcBDActualizada();
15126:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15127: 
15128:   // ── Semanas ──
15129:   const semanas=[0,0,0,0,0];
15130:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15131:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15132: 
15133:   // ── Días pico ──
15134:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15135:   const porDia=[0,0,0,0,0,0,0];
```

### Línea 15124

```html
15112: 
15113:   // ── Leads y marketing ──
15114:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15115:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15116:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15117:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15118:   const canalMap={}, canalIng={};
15119:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15120: 
15121:   // ── Calidad ──
15122:   const encStats=getEncuestaStats();
15123:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15124:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15125:   const bdAuto  = calcBDActualizada();
15126:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15127: 
15128:   // ── Semanas ──
15129:   const semanas=[0,0,0,0,0];
15130:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15131:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15132: 
15133:   // ── Días pico ──
15134:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15135:   const porDia=[0,0,0,0,0,0,0];
15136:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
```

### Línea 15258

```html
15246:   row('CAC (costo adquisición cliente)', cac>0?fmtPeso(cac)+' — meta <'+fmtPeso(META_CAC_MAX):'Sin datos');
15247:   if (Object.keys(canalIng).length>0) {
15248:     line();
15249:     line('  Ingresos por canal de captación:');
15250:     const totalCanalIng=Object.values(canalIng).reduce((s,v)=>s+v,0);
15251:     Object.entries(canalIng).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing])=>{
15252:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15253:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15254:     });
15255:   }
15256: 
15257:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15258:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15259:   if (encStats.promotores!==undefined) {
15260:     row('  Promotores', encStats.promotores+'');
15261:     row('  Pasivos', encStats.pasivos+'');
15262:     row('  Detractores', encStats.detractores+'');
15263:   }
15264:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15265:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15266: 
15267:   h1(`7. SEMÁFORO DE INDICADORES`);
15268:   const sem2 = (v,meta,alto=true) => {
15269:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15270:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
```

### Línea 15264

```html
15252:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15253:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15254:     });
15255:   }
15256: 
15257:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15258:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15259:   if (encStats.promotores!==undefined) {
15260:     row('  Promotores', encStats.promotores+'');
15261:     row('  Pasivos', encStats.pasivos+'');
15262:     row('  Detractores', encStats.detractores+'');
15263:   }
15264:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15265:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15266: 
15267:   h1(`7. SEMÁFORO DE INDICADORES`);
15268:   const sem2 = (v,meta,alto=true) => {
15269:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15270:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15271:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15272:   };
15273:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15274:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15275:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15276:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
```

### Línea 15279

```html
15267:   h1(`7. SEMÁFORO DE INDICADORES`);
15268:   const sem2 = (v,meta,alto=true) => {
15269:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15270:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15271:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15272:   };
15273:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15274:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15275:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15276:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15277:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15278:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15279:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15280:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15281:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15282:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15283: 
15284:   line();
15285:   line(sep(60));
15286:   line();
15287:   line(`PREGUNTA PARA CLAUDE:`);
15288:   line();
15289:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15290:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15291:   line();
```

### Línea 15280

```html
15268:   const sem2 = (v,meta,alto=true) => {
15269:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15270:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15271:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15272:   };
15273:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15274:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15275:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15276:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15277:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15278:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15279:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15280:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15281:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15282:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15283: 
15284:   line();
15285:   line(sep(60));
15286:   line();
15287:   line(`PREGUNTA PARA CLAUDE:`);
15288:   line();
15289:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15290:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15291:   line();
15292:   line(`Con base en estos datos reales:`);
```

### Línea 15377

```html
15365:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15366:     return ok ? 0 : warn ? 1 : 2;
15367:   }
15368: 
15369:   const st = {
15370:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15371:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15372:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15373:     leads:      kpiSt(d.leadsShow,  40,                      true),
15374:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15375:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15376:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15377:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15378:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15379:     bd:         kpiSt(d.bd,         90,                      true),
15380:   };
15381: 
15382:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15383: 
15384:   for (const [kpi, status] of Object.entries(st)) {
15385:     const dot  = document.getElementById('emDot_' + kpi);
15386:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15387:     const card = document.getElementById('emCard_' + kpi);
15388:     if (card) {
15389:       if (status === 2) card.classList.add('alerta');
```

### Línea 15378

```html
15366:     return ok ? 0 : warn ? 1 : 2;
15367:   }
15368: 
15369:   const st = {
15370:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15371:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15372:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15373:     leads:      kpiSt(d.leadsShow,  40,                      true),
15374:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15375:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15376:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15377:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15378:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15379:     bd:         kpiSt(d.bd,         90,                      true),
15380:   };
15381: 
15382:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15383: 
15384:   for (const [kpi, status] of Object.entries(st)) {
15385:     const dot  = document.getElementById('emDot_' + kpi);
15386:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15387:     const card = document.getElementById('emCard_' + kpi);
15388:     if (card) {
15389:       if (status === 2) card.classList.add('alerta');
15390:       else              card.classList.remove('alerta');
```

### Línea 15394

```html
15382:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15383: 
15384:   for (const [kpi, status] of Object.entries(st)) {
15385:     const dot  = document.getElementById('emDot_' + kpi);
15386:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15387:     const card = document.getElementById('emCard_' + kpi);
15388:     if (card) {
15389:       if (status === 2) card.classList.add('alerta');
15390:       else              card.classList.remove('alerta');
15391:     }
15392:   }
15393: 
15394:   const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
15395:   let totalRojos = 0;
15396: 
15397:   for (const [dim, kpis] of Object.entries(dims)) {
15398:     const rojos     = kpis.filter(k => st[k] === 2).length;
15399:     const amarillos = kpis.filter(k => st[k] === 1).length;
15400:     totalRojos += rojos;
15401: 
15402:     const badge = document.getElementById('emDB_' + dim);
15403:     if (badge) {
15404:       if (rojos > 0) {
15405:         badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
15406:         badge.className = 'em-dim-badge has-red';
```

### Línea 15496

```html
15484:     if (row) row.classList.toggle('done', ck.checked);
15485:   }
15486:   const total = checks.length, done = checks.filter(Boolean).length;
15487:   const fill = document.getElementById('emPF_' + kpi);
15488:   if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
15489:   const meta = document.getElementById('emPM_' + kpi);
15490:   if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
15491:   const btn  = document.getElementById('emDB_' + kpi);
15492:   if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
15493: }
15494: 
15495: function loadAllEmSteps() {
15496:   ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
15497:     let state = [];
15498:     try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
15499:     state.forEach((checked, idx) => {
15500:       const ck = document.getElementById('emCk_' + kpi + '_' + idx);
15501:       if (ck) ck.checked = !!checked;
15502:     });
15503:     _updateEmProgress(kpi);
15504:   });
15505: }
15506: 
15507: function markEmDone(kpi, total) {
15508:   const state = Array(total).fill(true);
```

### Línea 15596

```html
15584:   const manual    = getKPIManual();
15585:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15586: 
15587:   // KPI 4 — Tasa conversión
15588:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15589:   let tasaConv = null;
15590:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15591:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15592: 
15593:   // KPI 5 — Ventas mes
15594:   const ventasMes = calcCobradoMes(m, y);
15595: 
15596:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15597:   const _encStatsG = getEncuestaStats();
15598:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15599: 
15600:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15601:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15602: 
15603:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15604:   const _bdGuia = calcBDActualizada(m, y);
15605:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15606: 
15607:   // Recurrentes este mes = vinieron este mes
15608:   const _pacUnicosMes = {};
```

### Línea 15597

```html
15585:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15586: 
15587:   // KPI 4 — Tasa conversión
15588:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15589:   let tasaConv = null;
15590:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15591:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15592: 
15593:   // KPI 5 — Ventas mes
15594:   const ventasMes = calcCobradoMes(m, y);
15595: 
15596:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15597:   const _encStatsG = getEncuestaStats();
15598:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15599: 
15600:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15601:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15602: 
15603:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15604:   const _bdGuia = calcBDActualizada(m, y);
15605:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15606: 
15607:   // Recurrentes este mes = vinieron este mes
15608:   const _pacUnicosMes = {};
15609:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
```

### Línea 15598

```html
15586: 
15587:   // KPI 4 — Tasa conversión
15588:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15589:   let tasaConv = null;
15590:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15591:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15592: 
15593:   // KPI 5 — Ventas mes
15594:   const ventasMes = calcCobradoMes(m, y);
15595: 
15596:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15597:   const _encStatsG = getEncuestaStats();
15598:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15599: 
15600:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15601:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15602: 
15603:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15604:   const _bdGuia = calcBDActualizada(m, y);
15605:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15606: 
15607:   // Recurrentes este mes = vinieron este mes
15608:   const _pacUnicosMes = {};
15609:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15610:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
```

### Línea 15600

```html
15588:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15589:   let tasaConv = null;
15590:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15591:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15592: 
15593:   // KPI 5 — Ventas mes
15594:   const ventasMes = calcCobradoMes(m, y);
15595: 
15596:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15597:   const _encStatsG = getEncuestaStats();
15598:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15599: 
15600:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15601:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15602: 
15603:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15604:   const _bdGuia = calcBDActualizada(m, y);
15605:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15606: 
15607:   // Recurrentes este mes = vinieron este mes
15608:   const _pacUnicosMes = {};
15609:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15610:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15611:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15612:   const _stRecurrentes = _listaRecurrentes.length;
```

### Línea 15601

```html
15589:   let tasaConv = null;
15590:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15591:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15592: 
15593:   // KPI 5 — Ventas mes
15594:   const ventasMes = calcCobradoMes(m, y);
15595: 
15596:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15597:   const _encStatsG = getEncuestaStats();
15598:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15599: 
15600:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15601:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15602: 
15603:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15604:   const _bdGuia = calcBDActualizada(m, y);
15605:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15606: 
15607:   // Recurrentes este mes = vinieron este mes
15608:   const _pacUnicosMes = {};
15609:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15610:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15611:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15612:   const _stRecurrentes = _listaRecurrentes.length;
15613: 
```

### Línea 15660

```html
15648: 
15649:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15650:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
15651:       <div>
15652:         <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
15653:         <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
15654:       </div>
15655:       <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
15656:         <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
15657:           style="font-size:.73rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
15658:           ${opcionesSelect}
15659:         </select>
15660:         ${esMesActual ? `<button onclick="loadEncuestaStats()" id="btnCargarEncuestaGuia" style="font-size:.73rem;padding:6px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">🔄 Cargar encuestas</button>` : ''}
15661:         <button onclick="showView('finanzas')" style="font-size:.73rem;padding:6px 14px;background:rgba(27,191,176,.1);border:1px solid rgba(27,191,176,.3);color:var(--primary);border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">Ver finanzas →</button>
15662:       </div>
15663:     </div>
15664:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15665: 
15666:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15667:   const _sess1Meta  = esMesActual
15668:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
```

### Línea 15677

```html
15665: 
15666:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15667:   const _sess1Meta  = esMesActual
15668:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15687:   const _mkPacList = (id, icon, label, count, lista, color) => {
15688:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15689:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
```

### Línea 15678

```html
15666:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15667:   const _sess1Meta  = esMesActual
15668:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15687:   const _mkPacList = (id, icon, label, count, lista, color) => {
15688:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15689:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15690:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
```

### Línea 15679

```html
15667:   const _sess1Meta  = esMesActual
15668:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15687:   const _mkPacList = (id, icon, label, count, lista, color) => {
15688:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15689:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15690:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15691:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
```

### Línea 15681

```html
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15687:   const _mkPacList = (id, icon, label, count, lista, color) => {
15688:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15689:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15690:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15691:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15692:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15693:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
```

### Línea 15682

```html
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15687:   const _mkPacList = (id, icon, label, count, lista, color) => {
15688:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15689:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15690:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15691:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15692:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15693:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15694:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
```

### Línea 15742

```html
15730:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15731:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15732:     const textoBanner        = metaYaCumplida
15733:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15734:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15735:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15736:       ${iconoBanner} ${textoBanner}
15737:     </div>`;
15738:   }
15739: 
15740:   if (!esMesActual) {
15741:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15742:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15743:     </div>`;
15744:   }
15745: 
15746:   const cfg = getKPIConfig();
15747:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15748:   const inp = (key, label, val, note='') => `
15749:     <div>
15750:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15751:       <input type="number" id="kcfg_${key}" value="${val}"
15752:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15753:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15754:     </div>`;
```

### Línea 15758

```html
15746:   const cfg = getKPIConfig();
15747:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15748:   const inp = (key, label, val, note='') => `
15749:     <div>
15750:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15751:       <input type="number" id="kcfg_${key}" value="${val}"
15752:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15753:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15754:     </div>`;
15755: 
15756:   html += `</div>
15757:     <div style="margin-top:12px;padding:10px 14px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px;font-size:.75rem;color:var(--muted)">
15758:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15759:     </div>
15760:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15761:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15762:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15763:         ⚙️ Editar valores de referencia
15764:       </button>
15765:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15766:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15767:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15768:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15769:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15770:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
```

### Línea 15775

```html
15763:         ⚙️ Editar valores de referencia
15764:       </button>
15765:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15766:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15767:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15768:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15769:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15770:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15771:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15772:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15773:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15774:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15775:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15776:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15777:         </div>
15778:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15779:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15780:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15781:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15782:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15783:         </div>
15784:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15785:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15786:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15787:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
```

### Línea 15776

```html
15764:       </button>
15765:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15766:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15767:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15768:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15769:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15770:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15771:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15772:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15773:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15774:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15775:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15776:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15777:         </div>
15778:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15779:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15780:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15781:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15782:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15783:         </div>
15784:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15785:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15786:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15787:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
15788:           ${inp('precio_express', 'Precio Descarga Express ($)', cfg.precio_express)}
```

### Línea 15809

```html
15797:     </div>
15798:   </div>`;
15799: 
15800:   // Exportar datos para el Manual de Emergencia
15801:   window._emKPIData = {
15802:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15803:     fullPct:       fullPct,           totalMix:      totalMix,
15804:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15805:     leadsShow:     leadsShow || 0,
15806:     tasaConv:      tasaConv,
15807:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15808:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15809:     nps:           isNaN(nps)       ? 0 : nps,
15810:     npsMeta:       META_NPS,
15811:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15812:     encMeta:       META_ENCUESTAS,
15813:     bd:            isNaN(bd)        ? 0 : bd,
15814:   };
15815: 
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
```

### Línea 15810

```html
15798:   </div>`;
15799: 
15800:   // Exportar datos para el Manual de Emergencia
15801:   window._emKPIData = {
15802:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15803:     fullPct:       fullPct,           totalMix:      totalMix,
15804:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15805:     leadsShow:     leadsShow || 0,
15806:     tasaConv:      tasaConv,
15807:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15808:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15809:     nps:           isNaN(nps)       ? 0 : nps,
15810:     npsMeta:       META_NPS,
15811:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15812:     encMeta:       META_ENCUESTAS,
15813:     bd:            isNaN(bd)        ? 0 : bd,
15814:   };
15815: 
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
```

### Línea 15811

```html
15799: 
15800:   // Exportar datos para el Manual de Emergencia
15801:   window._emKPIData = {
15802:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15803:     fullPct:       fullPct,           totalMix:      totalMix,
15804:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15805:     leadsShow:     leadsShow || 0,
15806:     tasaConv:      tasaConv,
15807:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15808:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15809:     nps:           isNaN(nps)       ? 0 : nps,
15810:     npsMeta:       META_NPS,
15811:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15812:     encMeta:       META_ENCUESTAS,
15813:     bd:            isNaN(bd)        ? 0 : bd,
15814:   };
15815: 
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
15823: 
```

### Línea 15812

```html
15800:   // Exportar datos para el Manual de Emergencia
15801:   window._emKPIData = {
15802:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15803:     fullPct:       fullPct,           totalMix:      totalMix,
15804:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15805:     leadsShow:     leadsShow || 0,
15806:     tasaConv:      tasaConv,
15807:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15808:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15809:     nps:           isNaN(nps)       ? 0 : nps,
15810:     npsMeta:       META_NPS,
15811:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15812:     encMeta:       META_ENCUESTAS,
15813:     bd:            isNaN(bd)        ? 0 : bd,
15814:   };
15815: 
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
15821:   renderEmergencia();
15822: }
15823: 
15824: function _renderCancelBreakdown() {
```

### Línea 15957

```html
15945:   if (cancelMesPruebas.length) {
15946:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15947:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15948:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15949:     </div>`;
15950:   }
15951: 
15952:   html += `</div>`;
15953:   el.innerHTML = html;
15954: }
15955: 
15956: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15957: function getEncuestaStats() {
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
```

### Línea 15958

```html
15946:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15947:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15948:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15949:     </div>`;
15950:   }
15951: 
15952:   html += `</div>`;
15953:   el.innerHTML = html;
15954: }
15955: 
15956: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15957: function getEncuestaStats() {
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
```

### Línea 15961

```html
15949:     </div>`;
15950:   }
15951: 
15952:   html += `</div>`;
15953:   el.innerHTML = html;
15954: }
15955: 
15956: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15957: function getEncuestaStats() {
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
```

### Línea 15966

```html
15954: }
15955: 
15956: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15957: function getEncuestaStats() {
15958:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15959: }
15960: 
15961: async function loadEncuestaStats() {
15962:   const btn  = document.getElementById('btnCargarEncuesta');
15963:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
```

### Línea 15976

```html
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
```

### Línea 15978

```html
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
```

### Línea 15983

```html
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
```

### Línea 15986

```html
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
```

### Línea 15988

```html
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
```

### Línea 15991

```html
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
```

### Línea 15995

```html
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
```

### Línea 15996

```html
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
```

### Línea 15999

```html
15987:       guardarKPIManual();
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
```

### Línea 16000

```html
15988:       _renderEncuestaStatsUI(stats);
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
```

### Línea 16001

```html
15989:       renderKPITablero();
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
```

### Línea 16002

```html
15990:       renderKPIGuia();
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
```

### Línea 16003

```html
15991:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
```

### Línea 16004

```html
15992:     } else {
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16016: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
```

### Línea 16005

```html
15993:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16016: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16017: 
```

### Línea 16006

```html
15994:     }
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16016: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16017: 
16018: function _rutinaKey() {
```

### Línea 16007

```html
15995:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
15996:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
15997: }
15998: 
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16016: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16017: 
16018: function _rutinaKey() {
16019:   const d = new Date();
```

### Línea 16011

```html
15999: function _renderEncuestaStatsUI(stats) {
16000:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16001:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16002:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16003:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16004:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16005:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16006:   if (npsEl) npsEl.innerHTML = npsOk
16007:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16008:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16009:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16010:   if (encEl) encEl.innerHTML =
16011:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16012:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16013: }
16014: 
16015: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16016: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16017: 
16018: function _rutinaKey() {
16019:   const d = new Date();
16020:   return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
16021: }
16022: 
16023: function loadRutinaChecks() {
```

### Línea 16248

```html
16236:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16237:       <div style="display:flex;flex-direction:column;gap:16px">
16238: 
16239:         <div class="card">
16240:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16241:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16242:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16243:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16244:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16245:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16246:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16247:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16248:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16249:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16250:           </div>
16251:         </div>
16252: 
16253:         <div class="card">
16254:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16255:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16256: 
16257:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16258:             <div></div>
16259:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16260:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
```

### Línea 16249

```html
16237:       <div style="display:flex;flex-direction:column;gap:16px">
16238: 
16239:         <div class="card">
16240:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16241:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16242:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16243:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16244:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16245:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16246:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16247:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16248:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16249:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16250:           </div>
16251:         </div>
16252: 
16253:         <div class="card">
16254:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16255:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16256: 
16257:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16258:             <div></div>
16259:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16260:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
16261:           </div>
```

### Línea 16385

```html
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
```

### Línea 16386

```html
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
```

### Línea 16467

```html
16455: 
16456: function guardarKPIConfig() {
16457:   const get = key => {
16458:     const el = document.getElementById('kcfg_' + key);
16459:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16460:   };
16461:   const prev = getKPIConfig();
16462:   const updated = {
16463:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16464:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16465:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16466:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16467:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16468:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16469:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16470:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16471:     meta_cancelacion:     prev.meta_cancelacion,
16472:     meta_retencion:       prev.meta_retencion,
16473:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16474:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16475:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16476:     precio_full:          get('precio_full')          ?? prev.precio_full,
16477:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16478:     precio_express:       get('precio_express')       ?? prev.precio_express,
16479:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
```

### Línea 16468

```html
16456: function guardarKPIConfig() {
16457:   const get = key => {
16458:     const el = document.getElementById('kcfg_' + key);
16459:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16460:   };
16461:   const prev = getKPIConfig();
16462:   const updated = {
16463:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16464:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16465:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16466:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16467:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16468:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16469:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16470:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16471:     meta_cancelacion:     prev.meta_cancelacion,
16472:     meta_retencion:       prev.meta_retencion,
16473:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16474:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16475:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16476:     precio_full:          get('precio_full')          ?? prev.precio_full,
16477:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16478:     precio_express:       get('precio_express')       ?? prev.precio_express,
16479:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
16480:   };
```

### Línea 18944

```html
18932:     semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
18933:     ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
18934:     bono_react:            parseInt(cfg.bono_react            || '15000', 10),
18935:     bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
18936:     pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
18937:     bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
18938:     serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
18939:     serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
18940:     bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
18941:     contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
18942:     contenido_persona:     cfg.contenido_persona || 'Persona del video',
18943:     contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
18944:     equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
18945:   };
18946: }
18947: 
18948: function saveComisConfig() {
18949:   const g = id => (document.getElementById(id)||{}).value || '';
18950:   kvSet('comisiones_config', JSON.stringify({
18951:     bono_agenda:          g('cfg_bono_agenda'),
18952:     semanas_meta:         g('cfg_semanas_meta'),
18953:     ses_llena:            g('cfg_ses_llena'),
18954:     bono_react:           g('cfg_bono_react'),
18955:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18956:     pct_reventa:          g('cfg_pct_reventa'),
```

### Línea 18964

```html
18952:     semanas_meta:         g('cfg_semanas_meta'),
18953:     ses_llena:            g('cfg_ses_llena'),
18954:     bono_react:           g('cfg_bono_react'),
18955:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18956:     pct_reventa:          g('cfg_pct_reventa'),
18957:     bono_cruzada:         g('cfg_bono_cruzada'),
18958:     serv_mant:            g('cfg_serv_mant'),
18959:     serv_descarga:        g('cfg_serv_descarga'),
18960:     bono_contenido:       g('cfg_bono_contenido'),
18961:     contenido_split_aux:  g('cfg_contenido_split_aux'),
18962:     contenido_persona:    g('cfg_contenido_persona'),
18963:     contenido_leads_meta: g('cfg_contenido_leads_meta'),
18964:     equipo_nps_meta:      g('cfg_equipo_nps_meta'),
18965:   }));
18966:   const msg = document.getElementById('coConfigMsg');
18967:   if (msg) { msg.style.display='inline'; setTimeout(()=>msg.style.display='none',2000); }
18968:   renderComisiones();
18969: }
18970: 
18971: function toggleComisConfig() {
18972:   const p = document.getElementById('coConfigPanel');
18973:   if (!p) return;
18974:   const open = p.style.display === 'none';
18975:   p.style.display = open ? 'block' : 'none';
18976:   if (!open) return;
```

### Línea 18992

```html
18980:   set('cfg_semanas_meta',         cfg.semanas_meta);
18981:   set('cfg_ses_llena',            META_SESIONES_SEMANA);
18982:   set('cfg_bono_react',           cfg.bono_react);
18983:   set('cfg_bono_react_tipo',      cfg.bono_react_tipo);
18984:   set('cfg_pct_reventa',          cfg.pct_reventa);
18985:   set('cfg_bono_cruzada',         cfg.bono_cruzada);
18986:   set('cfg_serv_mant',            cfg.serv_mant.join(', '));
18987:   set('cfg_serv_descarga',        cfg.serv_descarga);
18988:   set('cfg_bono_contenido',       cfg.bono_contenido);
18989:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18990:   set('cfg_contenido_persona',    cfg.contenido_persona);
18991:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
18992:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
18993: }
18994: 
18995: function _initComisMesSel() {
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19004:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
```

### Línea 19183

```html
19171:   const bonoCruzAux   = cruzadas.filter(c => c.asign === 'auxiliar').length * cfg.bono_cruzada;
19172:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19173: 
19174:   // ── CREADOR DE CONTENIDO ──
19175:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19176:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19177:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19178:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19179:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19180:   const bonoContVideo= bonoCont - bonoContAux;
19181:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19182: 
19183:   // ── NPS / TODO EL EQUIPO ──
19184:   const _enc    = getEncuestaStats();
19185:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19186:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19187: 
19188:   // ── TOTALES ──
19189:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19190:   const totalFisio = bonoRev + bonoCruzFisio;
19191:   const totalVideo = bonoContVideo;
19192:   const totalGen   = totalAux + totalFisio + totalVideo;
19193: 
19194:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19195:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
```

### Línea 19184

```html
19172:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19173: 
19174:   // ── CREADOR DE CONTENIDO ──
19175:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19176:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19177:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19178:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19179:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19180:   const bonoContVideo= bonoCont - bonoContAux;
19181:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19182: 
19183:   // ── NPS / TODO EL EQUIPO ──
19184:   const _enc    = getEncuestaStats();
19185:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19186:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19187: 
19188:   // ── TOTALES ──
19189:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19190:   const totalFisio = bonoRev + bonoCruzFisio;
19191:   const totalVideo = bonoContVideo;
19192:   const totalGen   = totalAux + totalFisio + totalVideo;
19193: 
19194:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19195:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19196:   const pagoVideo = kvGet('comis_pago_video_' + mes);
```

### Línea 19185

```html
19173: 
19174:   // ── CREADOR DE CONTENIDO ──
19175:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19176:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19177:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19178:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19179:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19180:   const bonoContVideo= bonoCont - bonoContAux;
19181:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19182: 
19183:   // ── NPS / TODO EL EQUIPO ──
19184:   const _enc    = getEncuestaStats();
19185:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19186:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19187: 
19188:   // ── TOTALES ──
19189:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19190:   const totalFisio = bonoRev + bonoCruzFisio;
19191:   const totalVideo = bonoContVideo;
19192:   const totalGen   = totalAux + totalFisio + totalVideo;
19193: 
19194:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19195:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19196:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19197: 
```

### Línea 19186

```html
19174:   // ── CREADOR DE CONTENIDO ──
19175:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19176:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19177:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19178:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19179:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19180:   const bonoContVideo= bonoCont - bonoContAux;
19181:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19182: 
19183:   // ── NPS / TODO EL EQUIPO ──
19184:   const _enc    = getEncuestaStats();
19185:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19186:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19187: 
19188:   // ── TOTALES ──
19189:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19190:   const totalFisio = bonoRev + bonoCruzFisio;
19191:   const totalVideo = bonoContVideo;
19192:   const totalGen   = totalAux + totalFisio + totalVideo;
19193: 
19194:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19195:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19196:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19197: 
19198:   // ── RESUMEN ──
```

### Línea 19326

```html
19314:       </div>
19315:     </div>
19316:     <div class="co-footer">
19317:       ${btnVideo}
19318:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19319:     </div>
19320:   </div>`;
19321: 
19322:   const contWrap = document.getElementById('coContenidoWrap');
19323:   if (contWrap) contWrap.innerHTML = htmlCont;
19324: 
19325:   // ── TODO EL EQUIPO ──
19326:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19327:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19328:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19329:     <div>
19330:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19331:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19332:     </div>
19333:     <div style="text-align:right">
19334:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19335:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19336:     </div>
19337:   </div>`;
19338: 
```

### Línea 19327

```html
19315:     </div>
19316:     <div class="co-footer">
19317:       ${btnVideo}
19318:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19319:     </div>
19320:   </div>`;
19321: 
19322:   const contWrap = document.getElementById('coContenidoWrap');
19323:   if (contWrap) contWrap.innerHTML = htmlCont;
19324: 
19325:   // ── TODO EL EQUIPO ──
19326:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19327:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19328:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19329:     <div>
19330:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19331:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19332:     </div>
19333:     <div style="text-align:right">
19334:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19335:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19336:     </div>
19337:   </div>`;
19338: 
19339:   const equipoWrap = document.getElementById('coEquipoWrap');
```

### Línea 19331

```html
19319:     </div>
19320:   </div>`;
19321: 
19322:   const contWrap = document.getElementById('coContenidoWrap');
19323:   if (contWrap) contWrap.innerHTML = htmlCont;
19324: 
19325:   // ── TODO EL EQUIPO ──
19326:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19327:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19328:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19329:     <div>
19330:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19331:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19332:     </div>
19333:     <div style="text-align:right">
19334:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19335:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19336:     </div>
19337:   </div>`;
19338: 
19339:   const equipoWrap = document.getElementById('coEquipoWrap');
19340:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19341: }
19342: </script>
19343: 
```

### Línea 19334

```html
19322:   const contWrap = document.getElementById('coContenidoWrap');
19323:   if (contWrap) contWrap.innerHTML = htmlCont;
19324: 
19325:   // ── TODO EL EQUIPO ──
19326:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19327:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19328:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19329:     <div>
19330:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19331:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19332:     </div>
19333:     <div style="text-align:right">
19334:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19335:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19336:     </div>
19337:   </div>`;
19338: 
19339:   const equipoWrap = document.getElementById('coEquipoWrap');
19340:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19341: }
19342: </script>
19343: 
19344: <script>
19345: // ══════════════════════════════════════════
19346: //  DISPONIBILIDAD RÁPIDA
```

### Línea 19799

```html
19787:     pie.style.display = 'flex';
19788:     pie.innerHTML = `
19789:       <span style="color:var(--muted)">Ventas filtradas: <strong style="color:var(--text)">${_fmtCLP(totalFilVenta)}</strong></span>
19790:       <span style="color:var(--muted)">Comisión total: <strong style="color:#10b981">${_fmtCLP(totalFilComis)}</strong></span>
19791:       ${totalFilPend > 0 ? `<span style="color:var(--muted)">Pendiente: <strong style="color:#f59e0b">${_fmtCLP(totalFilPend)}</strong></span>` : ''}
19792:     `;
19793:   }
19794: }
19795: 
19796: function registrarRecuperacion() {
19797:   const paciente = document.getElementById('recInpPaciente')?.value.trim();
19798:   const fecha    = document.getElementById('recInpFecha')?.value;
19799:   const servicio = document.getElementById('recInpServicio')?.value;
19800:   const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
19801:   const nota     = document.getElementById('recInpNota')?.value.trim() || '';
19802: 
19803:   if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
19804:   if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
19805:   if (!servicio) { alert('Selecciona el servicio'); return; }
19806:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19807: 
19808:   const comision = Math.round(venta * REC_PCT);
19809:   const rec = {
19810:     id: Date.now().toString(),
19811:     fecha,
```

### Línea 19828

```html
19816:     nota,
19817:     pagado: false,
19818:     pagadoFecha: null
19819:   };
19820: 
19821:   const all = _loadRec();
19822:   all.push(rec);
19823:   _saveRec(all);
19824: 
19825:   // Limpiar formulario
19826:   document.getElementById('recInpPaciente').value = '';
19827:   document.getElementById('recInpFecha').value    = '';
19828:   document.getElementById('recInpServicio').value = '';
19829:   document.getElementById('recInpVenta').value    = '';
19830:   document.getElementById('recInpNota').value     = '';
19831:   document.getElementById('recInpComisionCalc').value = '$0';
19832: 
19833:   const msg = document.getElementById('recGuardadoMsg');
19834:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19835: 
19836:   renderRecuperaciones();
19837:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
19838: }
19839: 
19840: function marcarPagado(id) {
```

### Línea 20052

```html
20040:       </div>
20041:       <div style="flex-shrink:0">${registrarBtn}</div>
20042:     </div>
20043:     <div style="margin-top:10px;padding-top:10px;border-top:1px solid ${gc.border};display:flex;gap:6px;flex-wrap:wrap;align-items:center">
20044:       <span style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);white-space:nowrap">Enviar por WA:</span>
20045:       ${waBtns}
20046:     </div>
20047:   </div>`;
20048: }
20049: 
20050: function preRellenaRecuperacion(nombre, servicio) {
20051:   const inpNombre = document.getElementById('recInpPaciente');
20052:   const inpServ   = document.getElementById('recInpServicio');
20053:   const inpFecha  = document.getElementById('recInpFecha');
20054:   if (inpNombre) inpNombre.value = nombre;
20055:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20056:   // Intentar hacer match del servicio en el select
20057:   if (inpServ && servicio) {
20058:     const opts = Array.from(inpServ.options);
20059:     const srv  = servicio.toLowerCase();
20060:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20061:     if (match) inpServ.value = match.value;
20062:   }
20063:   // Scroll suave al formulario
20064:   const form = document.getElementById('recInpVenta');
```

### Línea 20057

```html
20045:       ${waBtns}
20046:     </div>
20047:   </div>`;
20048: }
20049: 
20050: function preRellenaRecuperacion(nombre, servicio) {
20051:   const inpNombre = document.getElementById('recInpPaciente');
20052:   const inpServ   = document.getElementById('recInpServicio');
20053:   const inpFecha  = document.getElementById('recInpFecha');
20054:   if (inpNombre) inpNombre.value = nombre;
20055:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20056:   // Intentar hacer match del servicio en el select
20057:   if (inpServ && servicio) {
20058:     const opts = Array.from(inpServ.options);
20059:     const srv  = servicio.toLowerCase();
20060:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20061:     if (match) inpServ.value = match.value;
20062:   }
20063:   // Scroll suave al formulario
20064:   const form = document.getElementById('recInpVenta');
20065:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20066:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20067: }
20068: 
20069: // ── CAMPAÑA DE REFERIDOS DEL MES ──
```

### Línea 20058

```html
20046:     </div>
20047:   </div>`;
20048: }
20049: 
20050: function preRellenaRecuperacion(nombre, servicio) {
20051:   const inpNombre = document.getElementById('recInpPaciente');
20052:   const inpServ   = document.getElementById('recInpServicio');
20053:   const inpFecha  = document.getElementById('recInpFecha');
20054:   if (inpNombre) inpNombre.value = nombre;
20055:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20056:   // Intentar hacer match del servicio en el select
20057:   if (inpServ && servicio) {
20058:     const opts = Array.from(inpServ.options);
20059:     const srv  = servicio.toLowerCase();
20060:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20061:     if (match) inpServ.value = match.value;
20062:   }
20063:   // Scroll suave al formulario
20064:   const form = document.getElementById('recInpVenta');
20065:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20066:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20067: }
20068: 
20069: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20070: // ── helpers de estado por paciente (persisten en localStorage) ──
```

### Línea 20061

```html
20049: 
20050: function preRellenaRecuperacion(nombre, servicio) {
20051:   const inpNombre = document.getElementById('recInpPaciente');
20052:   const inpServ   = document.getElementById('recInpServicio');
20053:   const inpFecha  = document.getElementById('recInpFecha');
20054:   if (inpNombre) inpNombre.value = nombre;
20055:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20056:   // Intentar hacer match del servicio en el select
20057:   if (inpServ && servicio) {
20058:     const opts = Array.from(inpServ.options);
20059:     const srv  = servicio.toLowerCase();
20060:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20061:     if (match) inpServ.value = match.value;
20062:   }
20063:   // Scroll suave al formulario
20064:   const form = document.getElementById('recInpVenta');
20065:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20066:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20067: }
20068: 
20069: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20070: // ── helpers de estado por paciente (persisten en localStorage) ──
20071: function _refKey(mesStr, anio, nombre) {
20072:   return `refCamp_${mesStr}${anio}_${(nombre||'').toLowerCase().trim().replace(/\s+/g,'_')}`;
20073: }
```

## Controles del formulario de Base de datos

### Línea 5157

```html
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
```

### Línea 11368

```html
11356:     initDashboard();
11357:   } catch(e) { toast('Error de conexión', 'err'); }
11358: }
11359: 
11360: // ── BASE DE DATOS ──
11361: let _dbPacs = [];
11362: 
11363: function initFormDB() {
11364:   // noop — form fields start empty, no defaults needed
11365: }
11366: 
11367: function renderBasedatos() {
11368:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11369:   const map = {};
11370:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11371:   (allData.pacientes || []).forEach(function(p) {
11372:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11373:     const email  = (p.email || '').toLowerCase().trim();
11374:     const nombre = (p.nombre || '').trim();
11375:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11376:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11377:   });
11378:   // Luego cruzar con citas (actualizan datos si el paciente ya existe)
11379:   (allData.citas || []).forEach(function(c) {
11380:     const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
```

## Interfaz de voz

### Línea 2787

```html
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
```

### Línea 2788

```html
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
```

### Línea 2790

```html
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
```

### Línea 2797

```html
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
```

### Línea 2799

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
2808:           </div>
2809:         </div>
2810:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2811: 
```

### Línea 2801

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
2810:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2811: 
2812:         <!-- ── BUSCADOR PACIENTE EXISTENTE ── -->
2813:         <div class="field" style="margin-bottom:20px;position:relative">
```

### Línea 2807

```html
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
```

### Línea 11887

```html
11875:   if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
11876: }
11877: 
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
11899:     document.getElementById('voiceText').value = '';
```

### Línea 11888

```html
11876: }
11877: 
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
11899:     document.getElementById('voiceText').value = '';
11900:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
```

### Línea 11890

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
11899:     document.getElementById('voiceText').value = '';
11900:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11901:   }
11902: }
```

### Línea 11894

```html
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
11899:     document.getElementById('voiceText').value = '';
11900:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11901:   }
11902: }
11903: 
11904: function procesarVozTexto() {
11905:   const txt = (document.getElementById('voiceText').value || '').trim();
11906:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
```

### Línea 11895

```html
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
11899:     document.getElementById('voiceText').value = '';
11900:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11901:   }
11902: }
11903: 
11904: function procesarVozTexto() {
11905:   const txt = (document.getElementById('voiceText').value || '').trim();
11906:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11907:   _parseVoice(txt);
```

### Línea 11908

```html
11896:   const isOpen = panel.style.display !== 'none';
11897:   panel.style.display = isOpen ? 'none' : 'block';
11898:   if (!isOpen) {
11899:     document.getElementById('voiceText').value = '';
11900:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11901:   }
11902: }
11903: 
11904: function procesarVozTexto() {
11905:   const txt = (document.getElementById('voiceText').value || '').trim();
11906:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11907:   _parseVoice(txt);
11908:   document.getElementById('voicePanel').style.display = 'none';
11909:   document.getElementById('voiceText').value = '';
11910: }
11911: 
11912: function toggleVoice() {
11913:   const SR = _getSR();
11914:   if (!SR) {
11915:     alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
11916:     return;
11917:   }
11918:   if (_voiceActive) { _stopVoice(false); return; }
11919:   _startVoice(SR);
11920: }
```

### Línea 11939

```html
11927:     return;
11928:   }
11929: 
11930:   // Configuración optimizada para iOS Safari
11931:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
```

### Línea 11942

```html
11930:   // Configuración optimizada para iOS Safari
11931:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11953: 
11954:   _voiceRec.onerror = e => {
```

### Línea 11943

```html
11931:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11953: 
11954:   _voiceRec.onerror = e => {
11955:     if (e.error === 'not-allowed') {
```

### Línea 11944

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
11953: 
11954:   _voiceRec.onerror = e => {
11955:     if (e.error === 'not-allowed') {
11956:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
```

### Línea 11950

```html
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
11955:     if (e.error === 'not-allowed') {
11956:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11957:     } else if (e.error === 'no-speech') {
11958:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11959:     } else {
11960:       toast('Error: ' + e.error, 'err');
11961:     }
11962:     _stopVoice(false);
```

### Línea 11993

```html
11981:     alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
11982:     _stopVoice(false);
11983:   }
11984: }
11985: 
11986: function _stopVoice(showMsg = true) {
11987:   _voiceActive = false;
11988:   if (_voiceRec) {
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
```

### Línea 11999

```html
11987:   _voiceActive = false;
11988:   if (_voiceRec) {
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
12010:   let filled = [];
12011: 
```

### Línea 12147

```html
12135:         document.getElementById('ncPhone').value = known.telefono || '';
12136:         document.getElementById('ncEmail').value = known.email    || '';
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
12158: }
12159: function msgSemana5(nombre) {
```

## Meta mensual y presupuesto

### Línea 4323

```html
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
```

### Línea 4338

```html
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
```

### Línea 4726

```html
4714:               </div>
4715:               <div class="em-card-footer">
4716:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
4717:                 <button class="em-reset-btn" onclick="resetEmSteps('ventas_sem',5)">↺ Reiniciar</button>
4718:               </div>
4719:             </div>
4720:           </div>
4721: 
4722:           <!-- KPI: Ventas mes -->
4723:           <div class="em-card" id="emCard_ventas_mes">
4724:             <div class="em-card-hdr" onclick="toggleEmCard('ventas_mes')">
4725:               <div class="em-dot gris" id="emDot_ventas_mes"></div>
4726:               <span class="em-card-title">Ventas mes &lt;80% meta<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">&lt;<span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></small></span>
4727:               <span class="em-sev c">🔴 Crítico</span>
4728:               <span class="em-card-time">⏱ 45 min</span>
4729:               <span class="em-carr">▼</span>
4730:             </div>
4731:             <div class="em-card-body" id="emBody_ventas_mes">
4732:               <div class="em-symptom">💡 <strong>El mes está comprometido.</strong> Por debajo del 80% de la meta ya no alcanza con citas normales — se necesita una acción extraordinaria. La clave es calcular primero cuánto falta y cuántos días quedan, para saber si el gap es recuperable con citas extra, paquetes, o si hay que activar un plan de contingencia.</div>
4733:               <div class="em-prog-meta" id="emPM_ventas_mes">0 de 6 pasos completados</div>
4734:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_mes" style="width:0%"></div></div>
4735:               <div class="em-steps">
4736:                 <label class="em-step" id="emS_ventas_mes_0" onclick="handleEmStep(event,'ventas_mes',0)"><input type="checkbox" id="emCk_ventas_mes_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Calcular el gap real:</strong> abrir Finanzas, ver cuánto se ha facturado y cuánto falta. Dividirlo entre los días hábiles restantes del mes — ese es el ingreso diario necesario. Si son más de $600k/día extra, el plan de citas no es suficiente solo.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4737:                 <label class="em-step" id="emS_ventas_mes_1" onclick="handleEmStep(event,'ventas_mes',1)"><input type="checkbox" id="emCk_ventas_mes_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Campaña de paquetes con fecha límite:</strong> ofrecer a pacientes activos paquetes pre-pagados con vigencia de 60 días. El pago adelantado ingresa al mes actual aunque las citas se usen después — es la palanca más rápida para cerrar el gap.</span></label>
4738:                 <label class="em-step" id="emS_ventas_mes_2" onclick="handleEmStep(event,'ventas_mes',2)"><input type="checkbox" id="emCk_ventas_mes_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Evento corporativo o grupal de emergencia:</strong> si hay contactos en empresas, gimnasios o equipos deportivos de la zona, ofrecer una jornada de valoraciones express (20–30 min c/u). 10 valoraciones a $80k = $800k en un día, sin costo de adquisición.</span></label>
```

### Línea 12779

```html
12767:       if (_remData) renderRecordatorios(_remData);
12768:     } else toast('Error al enviar email', 'err');
12769:   } catch(e) { toast('Error de conexión', 'err'); }
12770: }
12771: 
12772: // ══════════════════════════════════════════════════════════════
12773: // ── META MENSUAL ──
12774: // ══════════════════════════════════════════════════════════════
12775: function getMeta() {
12776:   // Limpiar metaMensual si tiene valor viejo
12777:   const stored = parseInt(kvGet('metaMensual')||'0', 10);
12778:   if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
12779:   return getKPIConfig().meta_ventas_mes || 10265000;
12780: }
12781: 
12782: function actualizarMetaBarra(cobrado) {
12783:   const meta = getMeta();
12784:   const fill = document.getElementById('metaBarFill');
12785:   const pct  = document.getElementById('metaPct');
12786:   const txt  = document.getElementById('metaTexto');
12787:   const inp  = document.getElementById('metaInput');
12788:   if (!fill) return;
12789:   if (!meta) {
12790:     if (pct) pct.textContent = '';
12791:     if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
```

### Línea 12817

```html
12805:   const cobrado = calcCobradoMes();
12806:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12807:   const fill = document.getElementById('metaBarFill');
12808:   const pct  = document.getElementById('metaPct');
12809:   if (fill) fill.style.width = p + '%';
12810:   if (pct)  pct.textContent  = p + '%';
12811: }
12812: 
12813: function guardarMeta() {
12814:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12815:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12816:   kvSet('metaMensual', val);
12817:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12818:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12819:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12820:   actualizarMetaBarra(calcCobradoMes());
12821:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12822: }
12823: 
12824: function previewMetaFin(v) {
12825:   const n = parseInt(v.replace(/\D/g,''), 10);
12826:   if (!n) return;
12827:   const cobrado = calcCobradoMes();
12828:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12829:   const fill = document.getElementById('metaBarFinFill');
```

### Línea 12818

```html
12806:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12807:   const fill = document.getElementById('metaBarFill');
12808:   const pct  = document.getElementById('metaPct');
12809:   if (fill) fill.style.width = p + '%';
12810:   if (pct)  pct.textContent  = p + '%';
12811: }
12812: 
12813: function guardarMeta() {
12814:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12815:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12816:   kvSet('metaMensual', val);
12817:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12818:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12819:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12820:   actualizarMetaBarra(calcCobradoMes());
12821:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12822: }
12823: 
12824: function previewMetaFin(v) {
12825:   const n = parseInt(v.replace(/\D/g,''), 10);
12826:   if (!n) return;
12827:   const cobrado = calcCobradoMes();
12828:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12829:   const fill = document.getElementById('metaBarFinFill');
12830:   const pct  = document.getElementById('metaBarFinPct');
```

### Línea 12841

```html
12829:   const fill = document.getElementById('metaBarFinFill');
12830:   const pct  = document.getElementById('metaBarFinPct');
12831:   const wrap = document.getElementById('metaBarFinWrap');
12832:   if (wrap) wrap.style.display = 'block';
12833:   if (fill) fill.style.width = p + '%';
12834:   if (pct)  pct.textContent  = p + '%';
12835: }
12836: 
12837: function guardarMetaFin() {
12838:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12839:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12840:   kvSet('metaMensual', val);
12841:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12842:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12843:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12844:   renderFinanzas();
12845:   actualizarMetaBarra(calcCobradoMes());
12846:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
```

### Línea 12842

```html
12830:   const pct  = document.getElementById('metaBarFinPct');
12831:   const wrap = document.getElementById('metaBarFinWrap');
12832:   if (wrap) wrap.style.display = 'block';
12833:   if (fill) fill.style.width = p + '%';
12834:   if (pct)  pct.textContent  = p + '%';
12835: }
12836: 
12837: function guardarMetaFin() {
12838:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12839:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12840:   kvSet('metaMensual', val);
12841:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12842:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12843:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12844:   renderFinanzas();
12845:   actualizarMetaBarra(calcCobradoMes());
12846:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12847: }
12848: 
12849: function calcIngresoPaquetesMes(m, y) {
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
```

### Línea 13315

```html
13303:     + (c.redes_contenido     || 0)
13304:     + (c.activacion_eventos  || 0)
13305:     + (c.pautas_redes        || 0)
13306:     + (c.mantenimiento       || 0)
13307:     + (c.insumos             || 0);
13308:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13309:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13310:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13311: }
13312: 
13313: const KPI_CONFIG_DEFAULTS = {
13314:   meta_sesiones_semana: 30,
13315:   meta_ventas_mes:      10265000,
13316:   meta_leads_min:       40,
13317:   meta_leads_max:       50,
13318:   meta_conv_min:        25,
13319:   meta_conv_max:        35,
13320:   meta_nps:             90,
13321:   meta_encuestas:       70,
13322:   meta_cancelacion:     10,
13323:   meta_retencion:       60,
13324:   inv_mkt_total:        340000,
13325:   inv_mkt_pauta:        100000,
13326:   inv_mkt_contenido:    240000,
13327:   precio_full:          110000,
```

### Línea 13356

```html
13344:   sv_pkTotal_p:   560000,  sv_pkTotal_d:    722000,
13345:   sv_planActivo_p:135000,  sv_planActivo_d: 165000,
13346:   sv_planPro_p:   230000,  sv_planPro_d:    275000,
13347: };
13348: 
13349: function getKPIConfig() {
13350:   try {
13351:     const stored = kvGet('kpiConfig');
13352:     if (!stored) return {...KPI_CONFIG_DEFAULTS};
13353:     const parsed = JSON.parse(stored);
13354:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13355:     let migrated = false;
13356:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13357:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13358:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13359:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13360:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13361: }
13362: 
13363: const _cfg0 = getKPIConfig();
13364: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13365: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
```

### Línea 13366

```html
13354:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13355:     let migrated = false;
13356:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13357:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13358:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13359:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13360:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13361: }
13362: 
13363: const _cfg0 = getKPIConfig();
13364: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13365: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
```

### Línea 13367

```html
13355:     let migrated = false;
13356:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13357:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13358:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13359:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13360:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13361: }
13362: 
13363: const _cfg0 = getKPIConfig();
13364: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13365: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13366: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13367: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13368: let META_NPS             = _cfg0.meta_nps;
13369: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13370: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13371: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13372: const META_CAC_MAX         = 80000;
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
```

### Línea 13424

```html
13412:   return {
13413:     pct:       Math.round((completos / pacs.length) * 100),
13414:     completos,
13415:     total:     pacs.length,
13416:     sinTel,
13417:     sinEmail,
13418:   };
13419: }
13420: 
13421: function reloadMetas() {
13422:   const cfg = getKPIConfig();
13423:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13424:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13425:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13426:   META_NPS             = cfg.meta_nps;
13427:   META_ENCUESTAS       = cfg.meta_encuestas;
13428:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13429:   META_RETENCION_PCT   = cfg.meta_retencion;
13430:   // Sincronizar precios de servicios siempre
13431:   _syncPreciosToAutoFill(cfg);
13432: }
13433: 
13434: function getKPIManual() {
13435:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13436: }
```

### Línea 13425

```html
13413:     pct:       Math.round((completos / pacs.length) * 100),
13414:     completos,
13415:     total:     pacs.length,
13416:     sinTel,
13417:     sinEmail,
13418:   };
13419: }
13420: 
13421: function reloadMetas() {
13422:   const cfg = getKPIConfig();
13423:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13424:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13425:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13426:   META_NPS             = cfg.meta_nps;
13427:   META_ENCUESTAS       = cfg.meta_encuestas;
13428:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13429:   META_RETENCION_PCT   = cfg.meta_retencion;
13430:   // Sincronizar precios de servicios siempre
13431:   _syncPreciosToAutoFill(cfg);
13432: }
13433: 
13434: function getKPIManual() {
13435:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13436: }
13437: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
```

### Línea 13665

```html
13653:   // Tarjeta sesiones con lógica de compensación por eventos
13654:   const _revenueOk    = ventasSemana >= META_VENTAS_SEMANA * 0.84;
13655:   const _sessLabel    = nEventosSem > 0 ? `${nCitasSem} citas + ${nEventosSem} evento${nEventosSem>1?'s':''}` : `${sessSemana}`;
13656:   const _sessMetaTxt  = nEventosSem > 0 && _revenueOk
13657:     ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan`
13658:     : `${META_SESIONES_SEMANA} sesiones`;
13659:   // Si hay eventos y los ingresos están bien, no mostrar rojo
13660:   const _sessEvalVal  = (nEventosSem > 0 && _revenueOk) ? META_SESIONES_SEMANA : sessSemana;
13661: 
13662:   let html = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px">`;
13663:   html += kpiCard('📅','Sesiones esta semana', _sessLabel, META_SESIONES_SEMANA, '', true, _sessMetaTxt, _sessEvalVal);
13664:   html += kpiCard('💰','Ventas esta semana', fmtPeso(ventasSemana), META_VENTAS_SEMANA, '', true, fmtPeso(META_VENTAS_SEMANA));
13665:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13666:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13667: 
13668:   if (tasa !== null) {
13669:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13670:   } else {
13671:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13672:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13673:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13674:     </div>`;
13675:   }
13676: 
13677:   const _encStats  = getEncuestaStats();
```

### Línea 13857

```html
13845:   const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
13846:   const ventasGeneradas = citasMesActivas.reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosMes.reduce((s,e) => s + parsePrecio(e.cobro), 0);
13847:   const ingresosCobrados = (typeof calcCobradoMes === 'function') ? calcCobradoMes() : ventasGeneradas;
13848:   const pagosPendientesLista = citasMesActivas.filter(c => {
13849:     const estado = String(c.estado || '').toLowerCase();
13850:     return estado.includes('pendiente de pago') || estado.includes('pago por verificar') || estado.includes('rechazado');
13851:   });
13852:   const pendienteCobrar = pagosPendientesLista.reduce((s,c) => s + parsePrecio(c.precio), 0);
13853:   const egresosMes = (typeof getEgresos === 'function' ? getEgresos() : [])
13854:     .filter(e => String(e.fecha || '').startsWith(monthKey))
13855:     .reduce((s,e) => s + (Number(e.monto) || parsePrecio(e.monto)), 0);
13856:   const ganancia = ingresosCobrados - egresosMes;
13857:   const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;
13858:   const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;
13859:   const faltante = Math.max(0, metaMensual - ingresosCobrados);
13860: 
13861:   const pacienteMes = {};
13862:   citasMesActivas.forEach(c => { if (c.nombre) pacienteMes[String(c.nombre).trim().toLowerCase()] = c.nombre; });
13863:   let personasNuevas = 0;
13864:   let personasRecurrentes = 0;
13865:   Object.keys(pacienteMes).forEach(key => {
13866:     const tuvoAntes = citasAll.some(c => String(c.nombre || '').trim().toLowerCase() === key && normDate(c.fecha || '') < monthKey + '-01' && !String(c.estado || '').toLowerCase().includes('cancel'));
13867:     if (tuvoAntes) personasRecurrentes++; else personasNuevas++;
13868:   });
13869: 
```

### Línea 14284

```html
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
```

### Línea 14286

```html
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
```

### Línea 14524

```html
14512:   const SC = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
14513: 
14514:   // ── Recomendaciones ──
14515:   const mejoras = [];
14516: 
14517:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14518:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14519: 
14520:   if (totalSesiones < metaSesionesMes) {
14521:     const falta = metaSesionesMes-totalSesiones;
14522:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14523:   }
14524:   if (ventasCobradas < META_VENTAS_MES) {
14525:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14526:   }
14527:   if (fullCnt > expressCnt && fullCnt>0) {
14528:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14529:   }
14530:   if (tasaConv!==null && tasaConv<25) {
14531:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14532:   }
14533:   if (tasaCancel>META_CANCELACION_PCT) {
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
```

### Línea 14525

```html
14513: 
14514:   // ── Recomendaciones ──
14515:   const mejoras = [];
14516: 
14517:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14518:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14519: 
14520:   if (totalSesiones < metaSesionesMes) {
14521:     const falta = metaSesionesMes-totalSesiones;
14522:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14523:   }
14524:   if (ventasCobradas < META_VENTAS_MES) {
14525:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14526:   }
14527:   if (fullCnt > expressCnt && fullCnt>0) {
14528:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14529:   }
14530:   if (tasaConv!==null && tasaConv<25) {
14531:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14532:   }
14533:   if (tasaCancel>META_CANCELACION_PCT) {
14534:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14535:   }
14536:   if (noShowsMes.length>0) {
14537:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
```

### Línea 14571

```html
14559:   const filaC = (label, key, val) =>
14560:     `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14561:       <span style="font-size:.82rem;color:var(--text);flex:1">${label}</span>
14562:       <div style="width:130px;flex-shrink:0">${fci(key, val)}</div>
14563:     </div>`;
14564: 
14565:   let html = '';
14566: 
14567:   // ══════════════════════════════════════════
14568:   // 1 · RESUMEN EJECUTIVO
14569:   // ══════════════════════════════════════════
14570:   const kpisOk   = [
14571:     ventasCobradas >= META_VENTAS_MES,
14572:     totalSesiones  >= metaSesionesMes,
14573:     tasaCancel     <= META_CANCELACION_PCT,
14574:     tasaRet        >= META_RETENCION_PCT,
14575:     npsVal         >= META_NPS,
14576:   ].filter(Boolean).length;
14577:   const totalKpis = 5;
14578:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14579:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14580:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14581:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14582: 
14583:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
```

### Línea 14616

```html
14604:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${pacUnicosMes}</div>
14605:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">PACIENTES</div>
14606:         </div>
14607:       </div>
14608:     </div>
14609:   </div>`;
14610: 
14611:   // ══════════════════════════════════════════
14612:   // 2 · P&L — ESTADO FINANCIERO
14613:   // ══════════════════════════════════════════
14614:   html += _secTitle('💰','Estado Financiero del Mes');
14615: 
14616:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14617:   const barW    = Math.min(pctMeta, 100);
14618:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14619: 
14620:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14621:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14622:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14623:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14624:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14625:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14626:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14627:       <div style="margin-top:10px">
14628:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
```

### Línea 14626

```html
14614:   html += _secTitle('💰','Estado Financiero del Mes');
14615: 
14616:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14617:   const barW    = Math.min(pctMeta, 100);
14618:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14619: 
14620:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14621:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14622:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14623:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14624:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14625:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14626:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14627:       <div style="margin-top:10px">
14628:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
14629:           <span>Avance vs meta</span><span style="color:${barCol};font-weight:700">${pctMeta}%</span>
14630:         </div>
14631:         <div style="height:8px;background:var(--s3);border-radius:99px;overflow:hidden">
14632:           <div style="height:100%;width:${barW}%;background:${barCol};border-radius:99px;transition:width .3s"></div>
14633:         </div>
14634:       </div>
14635:     </div>
14636:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14637:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Costos reales vs estructura</div>
14638:       ${_rFila('Subtotal costos estimados', fmtPeso(calc.subtotal))}
```

### Línea 14962

```html
14950:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14951:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14952:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14953:   html += `</div>`;
14954: 
14955:   // ══════════════════════════════════════════
14956:   // 8 · SEMÁFORO COMPLETO DE KPIs
14957:   // ══════════════════════════════════════════
14958:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14959:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14960:   const rows = [
14961:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14962:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14963:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14964:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14965:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14966:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14967:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14968:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14969:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14970:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14971:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14972:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14973:   ];
14974:   rows.forEach(([icon,label,val,c,sub]) => {
```

### Línea 15674

```html
15662:       </div>
15663:     </div>
15664:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15665: 
15666:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15667:   const _sess1Meta  = esMesActual
15668:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15669:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15670:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15671:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15672:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15673:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15674:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15675:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15676:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15677:     : `>${META_ENCUESTAS}%`;
15678:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15679:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15680:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15681:     : `>${META_NPS}`;
15682:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15683:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15684:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15685:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15686:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
```

### Línea 15721

```html
15709:     .map(p => p.nombre).sort();
15710: 
15711:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15712:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15713:   // Cálculo: sesiones diarias necesarias para cumplir meta
15714:   if (esMesActual) {
15715:     const diasEnMes = new Date(y, m, 0).getDate();
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15718:       const dow = new Date(y, m - 1, d).getDay();
15719:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15720:     }
15721:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15722:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15723:     const avgPrecio     = citasMesHechas.length > 0
15724:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15725:       : (getKPIConfig().precio_full || 80000);
15726:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15727:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15728:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15729:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15730:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15731:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15732:     const textoBanner        = metaYaCumplida
15733:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
```

### Línea 15728

```html
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15718:       const dow = new Date(y, m - 1, d).getDay();
15719:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15720:     }
15721:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15722:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15723:     const avgPrecio     = citasMesHechas.length > 0
15724:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15725:       : (getKPIConfig().precio_full || 80000);
15726:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15727:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15728:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15729:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15730:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15731:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15732:     const textoBanner        = metaYaCumplida
15733:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15734:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15735:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15736:       ${iconoBanner} ${textoBanner}
15737:     </div>`;
15738:   }
15739: 
15740:   if (!esMesActual) {
```

### Línea 15733

```html
15721:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15722:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15723:     const avgPrecio     = citasMesHechas.length > 0
15724:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15725:       : (getKPIConfig().precio_full || 80000);
15726:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15727:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15728:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15729:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15730:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15731:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15732:     const textoBanner        = metaYaCumplida
15733:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15734:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15735:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15736:       ${iconoBanner} ${textoBanner}
15737:     </div>`;
15738:   }
15739: 
15740:   if (!esMesActual) {
15741:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15742:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15743:     </div>`;
15744:   }
15745: 
```

### Línea 15770

```html
15758:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15759:     </div>
15760:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15761:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15762:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15763:         ⚙️ Editar valores de referencia
15764:       </button>
15765:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15766:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15767:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15768:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15769:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15770:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15771:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15772:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15773:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15774:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15775:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15776:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15777:         </div>
15778:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15779:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15780:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15781:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15782:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
```

### Línea 15808

```html
15796:       </div>
15797:     </div>
15798:   </div>`;
15799: 
15800:   // Exportar datos para el Manual de Emergencia
15801:   window._emKPIData = {
15802:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15803:     fullPct:       fullPct,           totalMix:      totalMix,
15804:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15805:     leadsShow:     leadsShow || 0,
15806:     tasaConv:      tasaConv,
15807:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15808:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15809:     nps:           isNaN(nps)       ? 0 : nps,
15810:     npsMeta:       META_NPS,
15811:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15812:     encMeta:       META_ENCUESTAS,
15813:     bd:            isNaN(bd)        ? 0 : bd,
15814:   };
15815: 
15816:   el.innerHTML = html;
15817:   applyKPIFavorites();
15818:   applyKPIRefSpans();
15819:   _renderCancelBreakdown();
15820:   _renderBDBreakdown();
```

### Línea 16119

```html
16107: function applyKPIRefSpans() {
16108:   const cfg = getKPIConfig();
16109:   const fmt = v => v >= 1000 ? '$' + Number(v).toLocaleString('es-CO') : String(v);
16110:   const map = {
16111:     inv_mkt_total:     fmt(cfg.inv_mkt_total),
16112:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16113:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16114:     precio_full:       fmt(cfg.precio_full),
16115:     duracion_full:     String(cfg.duracion_full),
16116:     precio_express:    fmt(cfg.precio_express),
16117:     duracion_express:  String(cfg.duracion_express),
16118:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16119:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16120:     meta_leads_min:    String(cfg.meta_leads_min),
16121:     meta_leads_max:    String(cfg.meta_leads_max),
16122:     meta_conv_min:     String(cfg.meta_conv_min),
16123:     meta_conv_max:     String(cfg.meta_conv_max),
16124:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16125:   };
16126:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16127:     const v = map[el.dataset.ref];
16128:     if (v !== undefined) el.textContent = v;
16129:   });
16130: }
16131: 
```

### Línea 16124

```html
16112:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16113:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16114:     precio_full:       fmt(cfg.precio_full),
16115:     duracion_full:     String(cfg.duracion_full),
16116:     precio_express:    fmt(cfg.precio_express),
16117:     duracion_express:  String(cfg.duracion_express),
16118:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16119:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16120:     meta_leads_min:    String(cfg.meta_leads_min),
16121:     meta_leads_max:    String(cfg.meta_leads_max),
16122:     meta_conv_min:     String(cfg.meta_conv_min),
16123:     meta_conv_max:     String(cfg.meta_conv_max),
16124:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16125:   };
16126:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16127:     const v = map[el.dataset.ref];
16128:     if (v !== undefined) el.textContent = v;
16129:   });
16130: }
16131: 
16132: function renderPresupuestoMetas() {
16133:   const el = document.getElementById('presupuestoBody');
16134:   if (!el) return;
16135:   const costos = getCostosEstructura();
16136:   const calc   = calcTotalCostos(costos);
```

### Línea 16243

```html
16231:           💾 Guardar presupuesto y actualizar metas
16232:         </button>
16233: 
16234:       </div>
16235: 
16236:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16237:       <div style="display:flex;flex-direction:column;gap:16px">
16238: 
16239:         <div class="card">
16240:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16241:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16242:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16243:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16244:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16245:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16246:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16247:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16248:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16249:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16250:           </div>
16251:         </div>
16252: 
16253:         <div class="card">
16254:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16255:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
```

### Línea 16359

```html
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
```

### Línea 16361

```html
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
```

### Línea 16362

```html
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
```

### Línea 16363

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
16372:   renderPresupuestoMetas();
16373: }
16374: 
16375: function pmGuardarKPIs() {
```

### Línea 16365

```html
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
```

### Línea 16380

```html
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
```

### Línea 16425

```html
16413:   cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
16414:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16415:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16416:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16417:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16418:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16419:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16420:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16421:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16422:   // Mantener precio_full apuntando a Completa
16423:   cfg.precio_full           = cfg.sv_completa_p;
16424:   kvSet('kpiConfig', JSON.stringify(cfg));
16425:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16426:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16427:   // Actualizar autoFillPrice con los nuevos precios
16428:   _syncPreciosToAutoFill(cfg);
16429:   reloadMetas();
16430:   applyKPIRefSpans();
16431:   actualizarMetaBarra(calcCobradoMes());
16432:   toast('✅ Precios y metas guardados', 'ok');
16433:   renderPresupuestoMetas();
16434: }
16435: 
16436: function _syncPreciosToAutoFill(cfg) {
16437:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
```

### Línea 16426

```html
16414:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16415:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16416:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16417:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16418:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16419:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16420:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16421:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16422:   // Mantener precio_full apuntando a Completa
16423:   cfg.precio_full           = cfg.sv_completa_p;
16424:   kvSet('kpiConfig', JSON.stringify(cfg));
16425:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16426:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16427:   // Actualizar autoFillPrice con los nuevos precios
16428:   _syncPreciosToAutoFill(cfg);
16429:   reloadMetas();
16430:   applyKPIRefSpans();
16431:   actualizarMetaBarra(calcCobradoMes());
16432:   toast('✅ Precios y metas guardados', 'ok');
16433:   renderPresupuestoMetas();
16434: }
16435: 
16436: function _syncPreciosToAutoFill(cfg) {
16437:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
16438:   window._preciosOverride = {
```

### Línea 16464

```html
16452:     'Plan Pro':                             { Presencial: '$'+Number(cfg.sv_planPro_p||230000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_planPro_d||275000).toLocaleString('es-CO') },
16453:   };
16454: }
16455: 
16456: function guardarKPIConfig() {
16457:   const get = key => {
16458:     const el = document.getElementById('kcfg_' + key);
16459:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16460:   };
16461:   const prev = getKPIConfig();
16462:   const updated = {
16463:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16464:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16465:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16466:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16467:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16468:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16469:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16470:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16471:     meta_cancelacion:     prev.meta_cancelacion,
16472:     meta_retencion:       prev.meta_retencion,
16473:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16474:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16475:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16476:     precio_full:          get('precio_full')          ?? prev.precio_full,
```
