# Contexto exacto para fase 4

Archivo: `index.html`

## Encuestas y NPS

### Línea 3813

```html
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
```

### Línea 3814

```html
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
```

### Línea 3815

```html
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
```

### Línea 3818

```html
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
```

### Línea 3819

```html
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
```

### Línea 3820

```html
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
```

### Línea 3828

```html
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
3836:           <div class="card-title">📩 Contador de Leads</div>
3837: 
3838:           <div class="help-banner open" data-help-id="leads-counter" onclick="toggleHelpBanner(this)">
3839:             <div class="help-banner-header">
3840:               <div class="help-banner-title">💡 ¿Cómo usar el contador de leads?</div>
```

### Línea 4355

```html
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
```

### Línea 4356

```html
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
```

### Línea 4358

```html
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
```

### Línea 4363

```html
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
```

### Línea 4367

```html
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
```

### Línea 4369

```html
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
4381:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
```

### Línea 4370

```html
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
4381:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4382:         <div class="gk-kpi-header">
```

### Línea 4371

```html
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
4381:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4382:         <div class="gk-kpi-header">
4383:           <div class="gk-kpi-left">
```

### Línea 4384

```html
4372:           <h5>Cuándo enviarla</h5>
4373:           <div class="gk-semaforo">
4374:             <div class="gk-sem-item verde">🟢 El mismo día de la consulta o al día siguiente</div>
4375:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4376:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4377:           </div>
4378:         </div>
4379:       </div>
4380: 
4381:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4382:         <div class="gk-kpi-header">
4383:           <div class="gk-kpi-left">
4384:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4385:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4386:           </div>
4387:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4388:           <div class="gk-kpi-toggle">▼</div>
4389:         </div>
4390:         <div class="gk-kpi-body">
4391:           <h5>Utilidad</h5>
4392:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4393:           <h5>Importancia</h5>
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
```

### Línea 4387

```html
4375:             <div class="gk-sem-item amarillo">🟡 Si no responden: recordar al tercer día</div>
4376:             <div class="gk-sem-item rojo">🔴 Después del quinto día: el paciente ya olvidó la experiencia</div>
4377:           </div>
4378:         </div>
4379:       </div>
4380: 
4381:       <div class="gk-kpi-card" id="gkKpi7" onclick="toggleKPICard(this)">
4382:         <div class="gk-kpi-header">
4383:           <div class="gk-kpi-left">
4384:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4385:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4386:           </div>
4387:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4388:           <div class="gk-kpi-toggle">▼</div>
4389:         </div>
4390:         <div class="gk-kpi-body">
4391:           <h5>Utilidad</h5>
4392:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4393:           <h5>Importancia</h5>
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4397:           <h5>Cómo se clasifican las respuestas</h5>
4398:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4399: Nota 4       →  PASIVOS      — Les da igual
```

### Línea 4394

```html
4382:         <div class="gk-kpi-header">
4383:           <div class="gk-kpi-left">
4384:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4385:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4386:           </div>
4387:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4388:           <div class="gk-kpi-toggle">▼</div>
4389:         </div>
4390:         <div class="gk-kpi-body">
4391:           <h5>Utilidad</h5>
4392:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4393:           <h5>Importancia</h5>
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4397:           <h5>Cómo se clasifican las respuestas</h5>
4398:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4399: Nota 4       →  PASIVOS      — Les da igual
4400: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4401:           <h5>Fórmula de cálculo</h5>
4402:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
```

### Línea 4402

```html
4390:         <div class="gk-kpi-body">
4391:           <h5>Utilidad</h5>
4392:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4393:           <h5>Importancia</h5>
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4397:           <h5>Cómo se clasifican las respuestas</h5>
4398:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4399: Nota 4       →  PASIVOS      — Les da igual
4400: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4401:           <h5>Fórmula de cálculo</h5>
4402:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4407:           <h5>Ejemplo</h5>
4408:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4409: • Promotores:   92%
4410: • Pasivos:       6% (NO suman)
4411: • Detractores:   2%
4412: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4413:           <h5>Cómo se lee</h5>
4414:           <div class="gk-semaforo">
```

### Línea 4404

```html
4392:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4393:           <h5>Importancia</h5>
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4397:           <h5>Cómo se clasifican las respuestas</h5>
4398:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4399: Nota 4       →  PASIVOS      — Les da igual
4400: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4401:           <h5>Fórmula de cálculo</h5>
4402:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4407:           <h5>Ejemplo</h5>
4408:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4409: • Promotores:   92%
4410: • Pasivos:       6% (NO suman)
4411: • Detractores:   2%
4412: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4413:           <h5>Cómo se lee</h5>
4414:           <div class="gk-semaforo">
4415:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4416:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
```

### Línea 4406

```html
4394:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4395:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4396:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4397:           <h5>Cómo se clasifican las respuestas</h5>
4398:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4399: Nota 4       →  PASIVOS      — Les da igual
4400: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4401:           <h5>Fórmula de cálculo</h5>
4402:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4407:           <h5>Ejemplo</h5>
4408:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4409: • Promotores:   92%
4410: • Pasivos:       6% (NO suman)
4411: • Detractores:   2%
4412: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4413:           <h5>Cómo se lee</h5>
4414:           <div class="gk-semaforo">
4415:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4416:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4417:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4418:           </div>
```

### Línea 4412

```html
4400: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4401:           <h5>Fórmula de cálculo</h5>
4402:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4407:           <h5>Ejemplo</h5>
4408:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4409: • Promotores:   92%
4410: • Pasivos:       6% (NO suman)
4411: • Detractores:   2%
4412: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4413:           <h5>Cómo se lee</h5>
4414:           <div class="gk-semaforo">
4415:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4416:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4417:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4418:           </div>
4419:           <h5>Acción inmediata con detractores</h5>
4420:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4421:         </div>
4422:       </div>
4423: 
4424:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
```

### Línea 4415

```html
4403:           <h5>Explicación</h5>
4404:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4405:           <h5>Lo más importante de entender</h5>
4406:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4407:           <h5>Ejemplo</h5>
4408:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4409: • Promotores:   92%
4410: • Pasivos:       6% (NO suman)
4411: • Detractores:   2%
4412: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4413:           <h5>Cómo se lee</h5>
4414:           <div class="gk-semaforo">
4415:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4416:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4417:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4418:           </div>
4419:           <h5>Acción inmediata con detractores</h5>
4420:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4421:         </div>
4422:       </div>
4423: 
4424:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
4425:         <div class="gk-kpi-header">
4426:           <div class="gk-kpi-left">
4427:             <div class="gk-kpi-name">KPI 8 — Porcentaje de Actualización de la Base de Datos</div>
```

### Línea 4761

```html
4749:         </div>
4750:       </div>
4751: 
4752:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4753:       <div class="em-dim" id="emDim_4">
4754:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4755:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4756:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4757:           <span class="em-dim-arr" id="emDA_4">▼</span>
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
```

### Línea 4762

```html
4750:       </div>
4751: 
4752:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4753:       <div class="em-dim" id="emDim_4">
4754:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4755:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4756:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4757:           <span class="em-dim-arr" id="emDA_4">▼</span>
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
```

### Línea 4763

```html
4751: 
4752:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4753:       <div class="em-dim" id="emDim_4">
4754:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4755:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4756:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4757:           <span class="em-dim-arr" id="emDA_4">▼</span>
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
```

### Línea 4764

```html
4752:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4753:       <div class="em-dim" id="emDim_4">
4754:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4755:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4756:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4757:           <span class="em-dim-arr" id="emDA_4">▼</span>
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
```

### Línea 4765

```html
4753:       <div class="em-dim" id="emDim_4">
4754:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4755:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4756:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4757:           <span class="em-dim-arr" id="emDA_4">▼</span>
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
```

### Línea 4770

```html
4758:         </div>
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
```

### Línea 4771

```html
4759:         <div class="em-dim-body" id="emDB_body_4">
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
```

### Línea 4772

```html
4760: 
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
```

### Línea 4773

```html
4761:           <!-- KPI: NPS -->
4762:           <div class="em-card" id="emCard_nps">
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
```

### Línea 4775

```html
4763:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
```

### Línea 4776

```html
4764:               <div class="em-dot gris" id="emDot_nps"></div>
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
```

### Línea 4777

```html
4765:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
```

### Línea 4778

```html
4766:               <span class="em-sev c">🔴 Crítico</span>
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
```

### Línea 4779

```html
4767:               <span class="em-card-time">⏱ 48 h</span>
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
```

### Línea 4780

```html
4768:               <span class="em-carr">▼</span>
4769:             </div>
4770:             <div class="em-card-body" id="emBody_nps">
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
```

### Línea 4783

```html
4771:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
4793:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
```

### Línea 4784

```html
4772:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4773:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
4774:               <div class="em-steps">
4775:                 <label class="em-step" id="emS_nps_0" onclick="handleEmStep(event,'nps',0)"><input type="checkbox" id="emCk_nps_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cargar encuestas e identificar detractores:</strong> presionar "Cargar encuestas" en el tablero y revisar en el formulario de Google quiénes respondieron con nota 0–3. Anotar nombre, servicio y fecha de la sesión.</span><button class="em-goto" onclick="event.stopPropagation();document.getElementById('btnCargarEncuesta') && document.getElementById('btnCargarEncuesta').click()">Cargar encuestas →</button></label>
4776:                 <label class="em-step" id="emS_nps_1" onclick="handleEmStep(event,'nps',1)"><input type="checkbox" id="emCk_nps_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Llamar a cada detractor en menos de 48h:</strong> no WhatsApp — llamada de voz. Guión de apertura: <em>"Hola [nombre], soy Jessica. Vi que tu experiencia no fue lo que esperabas y quería llamarte personalmente para entender qué pasó. No es para defenderme — es para aprender."</em> Escuchar el doble de lo que hablas.</span></label>
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
4793:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
4796:               <span class="em-carr">▼</span>
```

### Línea 4789

```html
4777:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4778:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4779:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4780:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
4793:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
4796:               <span class="em-carr">▼</span>
4797:             </div>
4798:             <div class="em-card-body" id="emBody_enc">
4799:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4800:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4801:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
```

### Línea 4793

```html
4781:               </div>
4782:               <div class="em-card-footer">
4783:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4784:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4785:               </div>
4786:             </div>
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
4793:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
4796:               <span class="em-carr">▼</span>
4797:             </div>
4798:             <div class="em-card-body" id="emBody_enc">
4799:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4800:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4801:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4802:               <div class="em-steps">
4803:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4804:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4805:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
```

### Línea 4799

```html
4787:           </div>
4788: 
4789:           <!-- KPI: Encuestas -->
4790:           <div class="em-card" id="emCard_enc">
4791:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4792:               <div class="em-dot gris" id="emDot_enc"></div>
4793:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
4796:               <span class="em-carr">▼</span>
4797:             </div>
4798:             <div class="em-card-body" id="emBody_enc">
4799:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4800:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4801:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4802:               <div class="em-steps">
4803:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4804:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4805:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4806:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4807:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4808:               </div>
4809:               <div class="em-card-footer">
4810:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4811:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
```

### Línea 4806

```html
4794:               <span class="em-sev m">🔵 Monitorear</span>
4795:               <span class="em-card-time">⏱ 15 min</span>
4796:               <span class="em-carr">▼</span>
4797:             </div>
4798:             <div class="em-card-body" id="emBody_enc">
4799:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4800:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4801:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4802:               <div class="em-steps">
4803:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4804:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4805:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4806:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4807:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4808:               </div>
4809:               <div class="em-card-footer">
4810:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4811:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
4812:               </div>
4813:             </div>
4814:           </div>
4815: 
4816:           <!-- KPI: BD actualizada -->
4817:           <div class="em-card" id="emCard_bd">
4818:             <div class="em-card-hdr" onclick="toggleEmCard('bd')">
```

### Línea 4954

```html
4942:             <input type="checkbox" id="rck_s7" onchange="toggleRutinaCheck('s7')">
4943:             <span>Iniciar campaña de recuperación de pacientes inactivos — enviar mensaje personalizado a los que no han vuelto en 30+ días</span>
4944:           </label>
4945:         </div>
4946: 
4947:         <div class="gk-rutina-grupo">
4948:           <div class="gk-rutina-titulo" style="display:flex;justify-content:space-between;align-items:center">
4949:             <span>🗓️ MENSUAL (1 hora el primer lunes del mes)</span>
4950:             <button onclick="resetRutinaGrupo('m')" style="font-size:.68rem;padding:3px 10px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:6px;cursor:pointer;font-family:var(--font-b)">↺ Reiniciar</button>
4951:           </div>
4952:           <label class="gk-check-item" onclick="toggleRutinaCheck('m1')">
4953:             <input type="checkbox" id="rck_m1" onchange="toggleRutinaCheck('m1')">
4954:             <span>Presionar <strong>🔄 Cargar encuestas</strong> para calcular NPS y % de respuestas automáticamente</span>
4955:           </label>
4956: 
4957:           <label class="gk-check-item" onclick="toggleRutinaCheck('m3')">
4958:             <input type="checkbox" id="rck_m3" onchange="toggleRutinaCheck('m3')">
4959:             <span>Revisar mix de servicios del mes — ¿la Descarga Full superó el 30%?</span>
4960:           </label>
4961:           <label class="gk-check-item" onclick="toggleRutinaCheck('m4')">
4962:             <input type="checkbox" id="rck_m4" onchange="toggleRutinaCheck('m4')">
4963:             <span>Comparar ingresos del mes vs mes anterior en la gráfica de Finanzas</span>
4964:           </label>
4965:           <label class="gk-check-item" onclick="toggleRutinaCheck('m5')">
4966:             <input type="checkbox" id="rck_m5" onchange="toggleRutinaCheck('m5')">
```

### Línea 5411

```html
5399:         <div class="co-sep"></div>
5400:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Creador de Contenido</div>
5401:         <div class="co-cfg-grid">
5402:           <div><label class="co-inp-label">Bono total contenido (si cumple meta)</label><input class="co-inp" id="cfg_bono_contenido" type="number" placeholder="50000"></div>
5403:           <div><label class="co-inp-label">% del bono que va a la Auxiliar</label><input class="co-inp" id="cfg_contenido_split_aux" type="number" placeholder="50"></div>
5404:           <div><label class="co-inp-label">Nombre de la persona del video</label><input class="co-inp" id="cfg_contenido_persona" type="text" placeholder="Nombre"></div>
5405:           <div><label class="co-inp-label">Meta mínima de leads para ganar el bono</label><input class="co-inp" id="cfg_contenido_leads_meta" type="number" placeholder="5"></div>
5406:         </div>
5407: 
5408:         <div class="co-sep"></div>
5409:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Todo el Equipo</div>
5410:         <div class="co-cfg-grid">
5411:           <div><label class="co-inp-label">Meta de calidad del servicio (NPS %)</label><input class="co-inp" id="cfg_equipo_nps_meta" type="number" placeholder="90"></div>
5412:         </div>
5413: 
5414:         <button onclick="saveComisConfig()" style="padding:8px 20px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem">Guardar configuración</button>
5415:         <span id="coConfigMsg" style="font-size:.75rem;color:var(--ok);margin-left:10px;display:none">✓ Guardado</span>
5416:       </div>
5417: 
5418:       <!-- Tarjetas principales (2-columnas) -->
5419:       <div class="co-grid" id="coCards">
5420:         <div style="color:var(--muted);font-size:.9rem;padding:40px 0;text-align:center;grid-column:1/-1">Cargando comisiones...</div>
5421:       </div>
5422: 
5423:       <!-- Creador de Contenido (ancho completo) -->
```

### Línea 5506

```html
5494:         </div>
5495:         <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:14px">
5496:           <div>
5497:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Nombre del paciente *</label>
5498:             <input id="recInpPaciente" type="text" placeholder="Ej: María López" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5499:           </div>
5500:           <div>
5501:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Fecha de la cita recuperada *</label>
5502:             <input id="recInpFecha" type="date" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5503:           </div>
5504:           <div>
5505:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Servicio *</label>
5506:             <select id="recInpServicio" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none;cursor:pointer">
5507:               <option value="">Seleccionar...</option>
5508:               <option value="Express Cuello">Express Cuello</option>
5509:               <option value="Express Piernas">Express Piernas</option>
5510:               <option value="Express Completa">Express Completa</option>
5511:               <option value="Full">Full (1.5h)</option>
5512:               <option value="Valoración">Valoración Postural</option>
5513:               <option value="Readaptación">Readaptación Funcional</option>
5514:               <option value="Pack 3 sesiones">Pack 3 sesiones</option>
5515:               <option value="Pack 6 sesiones">Pack 6 sesiones</option>
5516:               <option value="Pack 10 sesiones">Pack 10 sesiones</option>
5517:               <option value="Membresía">Membresía</option>
5518:               <option value="Otro">Otro</option>
```

### Línea 5585

```html
5573:       <div style="background:var(--s2);border:1px solid var(--border);border-radius:14px;margin-bottom:24px;overflow:hidden">
5574:         <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
5575:           <div>
5576:             <div style="font-family:var(--font-h);font-size:.95rem;font-weight:700">Campaña de Referidos del Mes</div>
5577:             <div style="font-size:.78rem;color:var(--muted);margin-top:2px">Pacientes que asistieron este mes · envíales su código de referido personalizado</div>
5578:           </div>
5579:           <button onclick="cargarCampañaReferidos()" style="padding:8px 16px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem;display:flex;align-items:center;gap:6px">
5580:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
5581:             Cargar pacientes del mes
5582:           </button>
5583:         </div>
5584:         <div style="padding:14px 16px;background:linear-gradient(135deg,#f5f3ff,#ede9fe20);border-bottom:1px solid var(--border);font-size:.82rem;color:var(--text);line-height:1.55">
5585:           <strong>¿Cómo funciona?</strong> Se listan los pacientes que vinieron este mes. Cada uno recibe un código REF único por WhatsApp. Cuando ese código lo usa un amigo al agendar, tú registras la referencia en la sección Códigos. Tu NPS de 100 significa que <strong>todos tus pacientes actuales son promotores potenciales</strong> — solo hay que activarlos.
5586:         </div>
5587:         <div id="refCampañaPanel" style="padding:20px">
5588:           <div style="text-align:center;color:var(--muted);padding:30px;font-size:.88rem">Haz clic en "Cargar pacientes del mes" para ver la lista</div>
5589:         </div>
5590:       </div>
5591: 
5592:     </section>
5593: 
5594:     <!-- ── MENSAJES PREDETERMINADOS ── -->
5595:     <section id="vMensajes" style="display:none">
5596:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
5597:         <div>
```

### Línea 7704

```html
7692:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7693:   </div>`;
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7715:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7716:   const leads = getLeadsMes(m,y);
```

### Línea 7705

```html
7693:   </div>`;
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7715:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7716:   const leads = getLeadsMes(m,y);
7717:   const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
```

### Línea 7737

```html
7725:     gkKpi1:mes.length,
7726:     gkKpi2:mes.length?Math.round(mixFull/mes.length*100):0,
7727:     gkKpi3:leads,
7728:     gkKpi4:leads?Math.round(mes.length/leads*100):null,
7729:     gkKpi5:calcCobradoMes(m,y),
7730:     gkKpi6:null,gkKpi7:null,
7731:     gkKpi8:bd?bd.pct:null,
7732:     gkKpi4b:todas.length?Math.round(cancel/todas.length*100):0,
7733:     gkKpi9:retTotal?Math.round(Object.values(cuenta).filter(n=>n>=2).length/retTotal*100):0
7734:   };
7735:   const saved = _kpiServerHistory[`${y}-${String(m).padStart(2,'0')}`];
7736:   if (saved) {
7737:     if (saved.nps !== null) snapshot.gkKpi7 = saved.nps;
7738:     if (saved.sessions) snapshot.gkKpi6 = Math.round((saved.surveyResponses||0) / saved.sessions * 100);
7739:   }
7740:   return snapshot;
7741: }
7742: 
7743: async function loadKPIHistoryFromServer() {
7744:   try {
7745:     const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7746:     if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
7747:   } catch(e) {}
7748: }
7749: 
```

### Línea 7861

```html
7849:         if (_f.desde   !== undefined) document.getElementById('fDesde').value   = _f.desde;
7850:         if (_f.hasta   !== undefined) document.getElementById('fHasta').value   = _f.hasta;
7851:       } catch(e) {}
7852:     }
7853:     renderAgenda();
7854:   }
7855:   if (v === 'bloquear')       renderBloqueos();
7856:   if (v === 'pacientes')      renderPacientes();
7857:   if (v === 'equipo')         { loadTeamData().then(renderEquipo); }
7858:   if (v === 'calendario')     renderCalendar();
7859:   if (v === 'recordatorios')  cargarRecordatorios();
7860:   if (v === 'basedatos')      { renderBasedatos(); initFormDB(); renderChangeLog(); renderReactivacion(); }
7861:   if (v === 'finanzas')       { renderFinanzas(); actualizarContadorLeads(); _renderEncuestaStatsUI(getEncuestaStats()); }
7862:   if (v === 'pagos')          { loadOperationsData().then(renderPagos); }
7863:   if (v === 'seguimiento')    renderSeguimiento();
7864:   if (v === 'tareas')         renderTareas();
7865:   if (v === 'tareasConfig')   initTareasConfig();
7866:   if (v === 'paquetes')       renderPaquetes();
7867:   if (v === 'mensajes')       renderMensajes();
7868:   if (v === 'empresas')       renderEmpresas();
7869:   if (v === 'codigos')        renderCodigos();
7870:   if (v === 'guiakpis')       { renderKPIGuia(); actualizarContadorLeads(); loadRutinaChecks(); loadKPIHistoryFromServer(); }
7871:   if (v === 'presupuesto')    { renderPresupuestoMetas(); }
7872:   if (v === 'comisiones')     renderComisiones();
7873:   if (v === 'recuperacion')   renderRecuperaciones();
```

### Línea 13325

```html
13313:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13314:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13315:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13316: }
13317: 
13318: const KPI_CONFIG_DEFAULTS = {
13319:   meta_sesiones_semana: 30,
13320:   meta_ventas_mes:      10265000,
13321:   meta_leads_min:       40,
13322:   meta_leads_max:       50,
13323:   meta_conv_min:        25,
13324:   meta_conv_max:        35,
13325:   meta_nps:             90,
13326:   meta_encuestas:       70,
13327:   meta_cancelacion:     10,
13328:   meta_retencion:       60,
13329:   inv_mkt_total:        340000,
13330:   inv_mkt_pauta:        100000,
13331:   inv_mkt_contenido:    240000,
13332:   precio_full:          110000,
13333:   duracion_full:        90,
13334:   precio_express:       75000,
13335:   duracion_express:     50,
13336:   // Precios por servicio (presencial / domicilio)
13337:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
```

### Línea 13326

```html
13314:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13315:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13316: }
13317: 
13318: const KPI_CONFIG_DEFAULTS = {
13319:   meta_sesiones_semana: 30,
13320:   meta_ventas_mes:      10265000,
13321:   meta_leads_min:       40,
13322:   meta_leads_max:       50,
13323:   meta_conv_min:        25,
13324:   meta_conv_max:        35,
13325:   meta_nps:             90,
13326:   meta_encuestas:       70,
13327:   meta_cancelacion:     10,
13328:   meta_retencion:       60,
13329:   inv_mkt_total:        340000,
13330:   inv_mkt_pauta:        100000,
13331:   inv_mkt_contenido:    240000,
13332:   precio_full:          110000,
13333:   duracion_full:        90,
13334:   precio_express:       75000,
13335:   duracion_express:     50,
13336:   // Precios por servicio (presencial / domicilio)
13337:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
13338:   sv_piernas_p:    75000,  sv_piernas_d:     90000,
```

### Línea 13373

```html
13361:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13362:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13363:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13364:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13365:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13366: }
13367: 
13368: const _cfg0 = getKPIConfig();
13369: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13370: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
```

### Línea 13374

```html
13362:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13363:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13364:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13365:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13366: }
13367: 
13368: const _cfg0 = getKPIConfig();
13369: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13370: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
```

### Línea 13431

```html
13419:     completos,
13420:     total:     pacs.length,
13421:     sinTel,
13422:     sinEmail,
13423:   };
13424: }
13425: 
13426: function reloadMetas() {
13427:   const cfg = getKPIConfig();
13428:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13429:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13430:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13431:   META_NPS             = cfg.meta_nps;
13432:   META_ENCUESTAS       = cfg.meta_encuestas;
13433:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13434:   META_RETENCION_PCT   = cfg.meta_retencion;
13435:   // Sincronizar precios de servicios siempre
13436:   _syncPreciosToAutoFill(cfg);
13437: }
13438: 
13439: function getKPIManual() {
13440:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13441: }
13442: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13443: 
```

### Línea 13432

```html
13420:     total:     pacs.length,
13421:     sinTel,
13422:     sinEmail,
13423:   };
13424: }
13425: 
13426: function reloadMetas() {
13427:   const cfg = getKPIConfig();
13428:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13429:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13430:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13431:   META_NPS             = cfg.meta_nps;
13432:   META_ENCUESTAS       = cfg.meta_encuestas;
13433:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13434:   META_RETENCION_PCT   = cfg.meta_retencion;
13435:   // Sincronizar precios de servicios siempre
13436:   _syncPreciosToAutoFill(cfg);
13437: }
13438: 
13439: function getKPIManual() {
13440:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13441: }
13442: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13443: 
13444: // ═══════════════════════════════════════════════
```

### Línea 13570

```html
13558:   const elGHoy = document.getElementById('leadsHoyGuia');
13559:   const elGSem = document.getElementById('leadsSemGuia');
13560:   const elGMes = document.getElementById('leadsMesGuia');
13561:   if (elGHoy) elGHoy.textContent = hoy;
13562:   if (elGSem) elGSem.textContent = sem;
13563:   if (elGMes) elGMes.textContent = mes;
13564: }
13565: 
13566: function guardarKPIManual() {
13567:   const obj = {
13568:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13569:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13570:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13571:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13572:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13573:   };
13574:   saveKPIManual(obj);
13575:   toast('KPIs guardados', 'ok');
13576:   renderKPITablero();
13577: }
13578: 
13579: function renderKPITablero() {
13580:   const el = document.getElementById('kpiTableroResult');
13581:   if (!el) return;
13582: 
```

### Línea 13571

```html
13559:   const elGSem = document.getElementById('leadsSemGuia');
13560:   const elGMes = document.getElementById('leadsMesGuia');
13561:   if (elGHoy) elGHoy.textContent = hoy;
13562:   if (elGSem) elGSem.textContent = sem;
13563:   if (elGMes) elGMes.textContent = mes;
13564: }
13565: 
13566: function guardarKPIManual() {
13567:   const obj = {
13568:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13569:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13570:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13571:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13572:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13573:   };
13574:   saveKPIManual(obj);
13575:   toast('KPIs guardados', 'ok');
13576:   renderKPITablero();
13577: }
13578: 
13579: function renderKPITablero() {
13580:   const el = document.getElementById('kpiTableroResult');
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
```

### Línea 13588

```html
13576:   renderKPITablero();
13577: }
13578: 
13579: function renderKPITablero() {
13580:   const el = document.getElementById('kpiTableroResult');
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
13584:   const manual = getKPIManual();
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
```

### Línea 13589

```html
13577: }
13578: 
13579: function renderKPITablero() {
13580:   const el = document.getElementById('kpiTableroResult');
13581:   if (!el) return;
13582: 
13583:   // Cargar valores manuales guardados en inputs
13584:   const manual = getKPIManual();
13585:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13586:   setVal('kpiLeads', manual.leads);
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
```

### Línea 13682

```html
13670:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13671:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13672: 
13673:   if (tasa !== null) {
13674:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
```

### Línea 13683

```html
13671:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13672: 
13673:   if (tasa !== null) {
13674:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
```

### Línea 13684

```html
13672: 
13673:   if (tasa !== null) {
13674:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
13696:   const canalMap = {};
```

### Línea 13685

```html
13673:   if (tasa !== null) {
13674:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
13696:   const canalMap = {};
13697:   citas.filter(c => {
```

### Línea 13687

```html
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
13696:   const canalMap = {};
13697:   citas.filter(c => {
13698:     const [cy,cm] = normDate(c.fecha).split('-');
13699:     const estado = (c.estado || '').toLowerCase();
```

### Línea 13688

```html
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
13696:   const canalMap = {};
13697:   citas.filter(c => {
13698:     const [cy,cm] = normDate(c.fecha).split('-');
13699:     const estado = (c.estado || '').toLowerCase();
13700:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
```

### Línea 13689

```html
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
13683:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13684:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13685:   const _npsMeta   = _encStats.promotores !== undefined
13686:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13687:     : `>${META_NPS}%`;
13688:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13689:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13690:   const _bdAuto = calcBDActualizada();
13691:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13692:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13693:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13694: 
13695:   // ───── KPI: Ingreso por canal (mes actual) ─────
13696:   const canalMap = {};
13697:   citas.filter(c => {
13698:     const [cy,cm] = normDate(c.fecha).split('-');
13699:     const estado = (c.estado || '').toLowerCase();
13700:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
13701:   }).forEach(c => {
```

### Línea 14500

```html
14488:   const citasNuevasMes = citasMes.length;
14489:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14490: 
14491:   // Canal de captación
14492:   const canalMap = {};
14493:   const canalIngMap = {};
14494:   citasMes.forEach(c => {
14495:     const canal = c.canal||'Directo';
14496:     canalMap[canal] = (canalMap[canal]||0)+1;
14497:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14498:   });
14499: 
14500:   // ── NPS y encuestas ──
14501:   const encStats = getEncuestaStats();
14502:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14503:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14504: 
14505:   // ── BD ──
14506:   const bdAuto = calcBDActualizada();
14507:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14508: 
14509:   // ── CAC ──
14510:   const egresosMkt = egresosAll.filter(e =>
14511:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14512:   ).reduce((s,e)=>s+(e.monto||0), 0);
```

### Línea 14501

```html
14489:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14490: 
14491:   // Canal de captación
14492:   const canalMap = {};
14493:   const canalIngMap = {};
14494:   citasMes.forEach(c => {
14495:     const canal = c.canal||'Directo';
14496:     canalMap[canal] = (canalMap[canal]||0)+1;
14497:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14498:   });
14499: 
14500:   // ── NPS y encuestas ──
14501:   const encStats = getEncuestaStats();
14502:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14503:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14504: 
14505:   // ── BD ──
14506:   const bdAuto = calcBDActualizada();
14507:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14508: 
14509:   // ── CAC ──
14510:   const egresosMkt = egresosAll.filter(e =>
14511:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14512:   ).reduce((s,e)=>s+(e.monto||0), 0);
14513:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
```

### Línea 14502

```html
14490: 
14491:   // Canal de captación
14492:   const canalMap = {};
14493:   const canalIngMap = {};
14494:   citasMes.forEach(c => {
14495:     const canal = c.canal||'Directo';
14496:     canalMap[canal] = (canalMap[canal]||0)+1;
14497:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14498:   });
14499: 
14500:   // ── NPS y encuestas ──
14501:   const encStats = getEncuestaStats();
14502:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14503:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14504: 
14505:   // ── BD ──
14506:   const bdAuto = calcBDActualizada();
14507:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14508: 
14509:   // ── CAC ──
14510:   const egresosMkt = egresosAll.filter(e =>
14511:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14512:   ).reduce((s,e)=>s+(e.monto||0), 0);
14513:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14514: 
```

### Línea 14503

```html
14491:   // Canal de captación
14492:   const canalMap = {};
14493:   const canalIngMap = {};
14494:   citasMes.forEach(c => {
14495:     const canal = c.canal||'Directo';
14496:     canalMap[canal] = (canalMap[canal]||0)+1;
14497:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14498:   });
14499: 
14500:   // ── NPS y encuestas ──
14501:   const encStats = getEncuestaStats();
14502:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14503:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14504: 
14505:   // ── BD ──
14506:   const bdAuto = calcBDActualizada();
14507:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14508: 
14509:   // ── CAC ──
14510:   const egresosMkt = egresosAll.filter(e =>
14511:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14512:   ).reduce((s,e)=>s+(e.monto||0), 0);
14513:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14514: 
14515:   // ══ Helpers ══
```

### Línea 14547

```html
14535:   if (tasaConv!==null && tasaConv<25) {
14536:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14537:   }
14538:   if (tasaCancel>META_CANCELACION_PCT) {
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
14542:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14543:   }
14544:   if (tasaRet<META_RETENCION_PCT) {
14545:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14546:   }
14547:   if (npsVal<META_NPS) {
14548:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14549:   }
14550:   if (encPct<META_ENCUESTAS) {
14551:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14552:   }
14553:   if (bdPct<100) {
14554:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14555:   }
14556: 
14557:   const fci = (key, val) =>
14558:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14559:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
```

### Línea 14548

```html
14536:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14537:   }
14538:   if (tasaCancel>META_CANCELACION_PCT) {
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
14542:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14543:   }
14544:   if (tasaRet<META_RETENCION_PCT) {
14545:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14546:   }
14547:   if (npsVal<META_NPS) {
14548:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14549:   }
14550:   if (encPct<META_ENCUESTAS) {
14551:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14552:   }
14553:   if (bdPct<100) {
14554:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14555:   }
14556: 
14557:   const fci = (key, val) =>
14558:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14559:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14560:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
```

### Línea 14550

```html
14538:   if (tasaCancel>META_CANCELACION_PCT) {
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
14542:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14543:   }
14544:   if (tasaRet<META_RETENCION_PCT) {
14545:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14546:   }
14547:   if (npsVal<META_NPS) {
14548:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14549:   }
14550:   if (encPct<META_ENCUESTAS) {
14551:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14552:   }
14553:   if (bdPct<100) {
14554:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14555:   }
14556: 
14557:   const fci = (key, val) =>
14558:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14559:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14560:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14561:              text-align:right;box-sizing:border-box"
14562:       oninput="_recalcCostos()">`;
```

### Línea 14551

```html
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
14542:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14543:   }
14544:   if (tasaRet<META_RETENCION_PCT) {
14545:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14546:   }
14547:   if (npsVal<META_NPS) {
14548:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14549:   }
14550:   if (encPct<META_ENCUESTAS) {
14551:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14552:   }
14553:   if (bdPct<100) {
14554:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14555:   }
14556: 
14557:   const fci = (key, val) =>
14558:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14559:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14560:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14561:              text-align:right;box-sizing:border-box"
14562:       oninput="_recalcCostos()">`;
14563: 
```

### Línea 14580

```html
14568:     </div>`;
14569: 
14570:   let html = '';
14571: 
14572:   // ══════════════════════════════════════════
14573:   // 1 · RESUMEN EJECUTIVO
14574:   // ══════════════════════════════════════════
14575:   const kpisOk   = [
14576:     ventasCobradas >= META_VENTAS_MES,
14577:     totalSesiones  >= metaSesionesMes,
14578:     tasaCancel     <= META_CANCELACION_PCT,
14579:     tasaRet        >= META_RETENCION_PCT,
14580:     npsVal         >= META_NPS,
14581:   ].filter(Boolean).length;
14582:   const totalKpis = 5;
14583:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14584:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14585:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14586:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14587: 
14588:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14589:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14590:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14591:       <div style="flex:1">
14592:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
```

### Línea 14951

```html
14939:         <span style="font-size:.7rem;color:var(--muted)">${sess} sesión${sess===1?'':'es'} · ${pp}% del ingreso total</span>
14940:       </div>`;
14941:     });
14942:     html += `</div></div>`;
14943:   } else {
14944:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14945:   }
14946: 
14947:   // ══════════════════════════════════════════
14948:   // 7 · CALIDAD Y SATISFACCIÓN
14949:   // ══════════════════════════════════════════
14950:   html += _secTitle('⭐','Calidad y Satisfacción');
14951:   const npsC = _semCell(npsVal, META_NPS);
14952:   const encC = _semCell(encPct, META_ENCUESTAS);
14953:   const bdC  = _semCell(bdPct, 100);
14954:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14955:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14956:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14957:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14958:   html += `</div>`;
14959: 
14960:   // ══════════════════════════════════════════
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
```

### Línea 14952

```html
14940:       </div>`;
14941:     });
14942:     html += `</div></div>`;
14943:   } else {
14944:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14945:   }
14946: 
14947:   // ══════════════════════════════════════════
14948:   // 7 · CALIDAD Y SATISFACCIÓN
14949:   // ══════════════════════════════════════════
14950:   html += _secTitle('⭐','Calidad y Satisfacción');
14951:   const npsC = _semCell(npsVal, META_NPS);
14952:   const encC = _semCell(encPct, META_ENCUESTAS);
14953:   const bdC  = _semCell(bdPct, 100);
14954:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14955:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14956:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14957:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14958:   html += `</div>`;
14959: 
14960:   // ══════════════════════════════════════════
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
```

### Línea 14955

```html
14943:   } else {
14944:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14945:   }
14946: 
14947:   // ══════════════════════════════════════════
14948:   // 7 · CALIDAD Y SATISFACCIÓN
14949:   // ══════════════════════════════════════════
14950:   html += _secTitle('⭐','Calidad y Satisfacción');
14951:   const npsC = _semCell(npsVal, META_NPS);
14952:   const encC = _semCell(encPct, META_ENCUESTAS);
14953:   const bdC  = _semCell(bdPct, 100);
14954:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14955:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14956:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14957:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14958:   html += `</div>`;
14959: 
14960:   // ══════════════════════════════════════════
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14965:   const rows = [
14966:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14967:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
```

### Línea 14956

```html
14944:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14945:   }
14946: 
14947:   // ══════════════════════════════════════════
14948:   // 7 · CALIDAD Y SATISFACCIÓN
14949:   // ══════════════════════════════════════════
14950:   html += _secTitle('⭐','Calidad y Satisfacción');
14951:   const npsC = _semCell(npsVal, META_NPS);
14952:   const encC = _semCell(encPct, META_ENCUESTAS);
14953:   const bdC  = _semCell(bdPct, 100);
14954:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14955:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14956:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14957:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14958:   html += `</div>`;
14959: 
14960:   // ══════════════════════════════════════════
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14965:   const rows = [
14966:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14967:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14968:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
```

### Línea 14973

```html
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14965:   const rows = [
14966:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14967:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14968:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14969:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14970:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14971:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14972:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14973:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14974:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14975:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14976:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14977:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14978:   ];
14979:   rows.forEach(([icon,label,val,c,sub]) => {
14980:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14981:   });
14982:   html += `</div>`;
14983: 
14984:   // ══════════════════════════════════════════
14985:   // 9 · PLAN DE MEJORA
```

### Línea 14974

```html
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14965:   const rows = [
14966:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14967:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14968:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14969:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14970:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14971:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14972:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14973:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14974:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14975:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14976:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14977:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14978:   ];
14979:   rows.forEach(([icon,label,val,c,sub]) => {
14980:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14981:   });
14982:   html += `</div>`;
14983: 
14984:   // ══════════════════════════════════════════
14985:   // 9 · PLAN DE MEJORA
14986:   // ══════════════════════════════════════════
```

### Línea 15127

```html
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15116:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15117: 
15118:   // ── Leads y marketing ──
15119:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15120:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15121:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15122:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15123:   const canalMap={}, canalIng={};
15124:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15125: 
15126:   // ── Calidad ──
15127:   const encStats=getEncuestaStats();
15128:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15129:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15130:   const bdAuto  = calcBDActualizada();
15131:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15132: 
15133:   // ── Semanas ──
15134:   const semanas=[0,0,0,0,0];
15135:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15136:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15137: 
15138:   // ── Días pico ──
15139:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
```

### Línea 15128

```html
15116:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15117: 
15118:   // ── Leads y marketing ──
15119:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15120:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15121:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15122:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15123:   const canalMap={}, canalIng={};
15124:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15125: 
15126:   // ── Calidad ──
15127:   const encStats=getEncuestaStats();
15128:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15129:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15130:   const bdAuto  = calcBDActualizada();
15131:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15132: 
15133:   // ── Semanas ──
15134:   const semanas=[0,0,0,0,0];
15135:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15136:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15137: 
15138:   // ── Días pico ──
15139:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15140:   const porDia=[0,0,0,0,0,0,0];
```

### Línea 15129

```html
15117: 
15118:   // ── Leads y marketing ──
15119:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15120:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15121:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15122:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15123:   const canalMap={}, canalIng={};
15124:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15125: 
15126:   // ── Calidad ──
15127:   const encStats=getEncuestaStats();
15128:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15129:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15130:   const bdAuto  = calcBDActualizada();
15131:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15132: 
15133:   // ── Semanas ──
15134:   const semanas=[0,0,0,0,0];
15135:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15136:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15137: 
15138:   // ── Días pico ──
15139:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15140:   const porDia=[0,0,0,0,0,0,0];
15141:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
```

### Línea 15263

```html
15251:   row('CAC (costo adquisición cliente)', cac>0?fmtPeso(cac)+' — meta <'+fmtPeso(META_CAC_MAX):'Sin datos');
15252:   if (Object.keys(canalIng).length>0) {
15253:     line();
15254:     line('  Ingresos por canal de captación:');
15255:     const totalCanalIng=Object.values(canalIng).reduce((s,v)=>s+v,0);
15256:     Object.entries(canalIng).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing])=>{
15257:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15258:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15259:     });
15260:   }
15261: 
15262:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15263:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15264:   if (encStats.promotores!==undefined) {
15265:     row('  Promotores', encStats.promotores+'');
15266:     row('  Pasivos', encStats.pasivos+'');
15267:     row('  Detractores', encStats.detractores+'');
15268:   }
15269:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15270:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15271: 
15272:   h1(`7. SEMÁFORO DE INDICADORES`);
15273:   const sem2 = (v,meta,alto=true) => {
15274:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15275:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
```

### Línea 15269

```html
15257:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15258:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15259:     });
15260:   }
15261: 
15262:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15263:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15264:   if (encStats.promotores!==undefined) {
15265:     row('  Promotores', encStats.promotores+'');
15266:     row('  Pasivos', encStats.pasivos+'');
15267:     row('  Detractores', encStats.detractores+'');
15268:   }
15269:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15270:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15271: 
15272:   h1(`7. SEMÁFORO DE INDICADORES`);
15273:   const sem2 = (v,meta,alto=true) => {
15274:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15275:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15276:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15277:   };
15278:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15279:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15280:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15281:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
```

### Línea 15284

```html
15272:   h1(`7. SEMÁFORO DE INDICADORES`);
15273:   const sem2 = (v,meta,alto=true) => {
15274:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15275:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15276:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15277:   };
15278:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15279:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15280:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15281:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15282:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15283:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15284:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15285:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15286:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15287:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15288: 
15289:   line();
15290:   line(sep(60));
15291:   line();
15292:   line(`PREGUNTA PARA CLAUDE:`);
15293:   line();
15294:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15295:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15296:   line();
```

### Línea 15285

```html
15273:   const sem2 = (v,meta,alto=true) => {
15274:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15275:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15276:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15277:   };
15278:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15279:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15280:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15281:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15282:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15283:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15284:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15285:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15286:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15287:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15288: 
15289:   line();
15290:   line(sep(60));
15291:   line();
15292:   line(`PREGUNTA PARA CLAUDE:`);
15293:   line();
15294:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15295:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15296:   line();
15297:   line(`Con base en estos datos reales:`);
```

### Línea 15382

```html
15370:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15371:     return ok ? 0 : warn ? 1 : 2;
15372:   }
15373: 
15374:   const st = {
15375:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15376:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15377:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15378:     leads:      kpiSt(d.leadsShow,  40,                      true),
15379:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15380:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15381:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15382:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15383:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15384:     bd:         kpiSt(d.bd,         90,                      true),
15385:   };
15386: 
15387:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15388: 
15389:   for (const [kpi, status] of Object.entries(st)) {
15390:     const dot  = document.getElementById('emDot_' + kpi);
15391:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15392:     const card = document.getElementById('emCard_' + kpi);
15393:     if (card) {
15394:       if (status === 2) card.classList.add('alerta');
```

### Línea 15383

```html
15371:     return ok ? 0 : warn ? 1 : 2;
15372:   }
15373: 
15374:   const st = {
15375:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15376:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15377:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15378:     leads:      kpiSt(d.leadsShow,  40,                      true),
15379:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15380:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15381:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15382:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15383:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15384:     bd:         kpiSt(d.bd,         90,                      true),
15385:   };
15386: 
15387:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15388: 
15389:   for (const [kpi, status] of Object.entries(st)) {
15390:     const dot  = document.getElementById('emDot_' + kpi);
15391:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15392:     const card = document.getElementById('emCard_' + kpi);
15393:     if (card) {
15394:       if (status === 2) card.classList.add('alerta');
15395:       else              card.classList.remove('alerta');
```

### Línea 15399

```html
15387:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15388: 
15389:   for (const [kpi, status] of Object.entries(st)) {
15390:     const dot  = document.getElementById('emDot_' + kpi);
15391:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15392:     const card = document.getElementById('emCard_' + kpi);
15393:     if (card) {
15394:       if (status === 2) card.classList.add('alerta');
15395:       else              card.classList.remove('alerta');
15396:     }
15397:   }
15398: 
15399:   const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
15400:   let totalRojos = 0;
15401: 
15402:   for (const [dim, kpis] of Object.entries(dims)) {
15403:     const rojos     = kpis.filter(k => st[k] === 2).length;
15404:     const amarillos = kpis.filter(k => st[k] === 1).length;
15405:     totalRojos += rojos;
15406: 
15407:     const badge = document.getElementById('emDB_' + dim);
15408:     if (badge) {
15409:       if (rojos > 0) {
15410:         badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
15411:         badge.className = 'em-dim-badge has-red';
```

### Línea 15501

```html
15489:     if (row) row.classList.toggle('done', ck.checked);
15490:   }
15491:   const total = checks.length, done = checks.filter(Boolean).length;
15492:   const fill = document.getElementById('emPF_' + kpi);
15493:   if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
15494:   const meta = document.getElementById('emPM_' + kpi);
15495:   if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
15496:   const btn  = document.getElementById('emDB_' + kpi);
15497:   if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
15498: }
15499: 
15500: function loadAllEmSteps() {
15501:   ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
15502:     let state = [];
15503:     try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
15504:     state.forEach((checked, idx) => {
15505:       const ck = document.getElementById('emCk_' + kpi + '_' + idx);
15506:       if (ck) ck.checked = !!checked;
15507:     });
15508:     _updateEmProgress(kpi);
15509:   });
15510: }
15511: 
15512: function markEmDone(kpi, total) {
15513:   const state = Array(total).fill(true);
```

### Línea 15601

```html
15589:   const manual    = getKPIManual();
15590:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15591: 
15592:   // KPI 4 — Tasa conversión
15593:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15594:   let tasaConv = null;
15595:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15596:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15597: 
15598:   // KPI 5 — Ventas mes
15599:   const ventasMes = calcCobradoMes(m, y);
15600: 
15601:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15602:   const _encStatsG = getEncuestaStats();
15603:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15604: 
15605:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15606:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15607: 
15608:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15609:   const _bdGuia = calcBDActualizada(m, y);
15610:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15611: 
15612:   // Recurrentes este mes = vinieron este mes
15613:   const _pacUnicosMes = {};
```

### Línea 15602

```html
15590:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15591: 
15592:   // KPI 4 — Tasa conversión
15593:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15594:   let tasaConv = null;
15595:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15596:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15597: 
15598:   // KPI 5 — Ventas mes
15599:   const ventasMes = calcCobradoMes(m, y);
15600: 
15601:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15602:   const _encStatsG = getEncuestaStats();
15603:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15604: 
15605:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15606:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15607: 
15608:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15609:   const _bdGuia = calcBDActualizada(m, y);
15610:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15611: 
15612:   // Recurrentes este mes = vinieron este mes
15613:   const _pacUnicosMes = {};
15614:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
```

### Línea 15603

```html
15591: 
15592:   // KPI 4 — Tasa conversión
15593:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15594:   let tasaConv = null;
15595:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15596:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15597: 
15598:   // KPI 5 — Ventas mes
15599:   const ventasMes = calcCobradoMes(m, y);
15600: 
15601:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15602:   const _encStatsG = getEncuestaStats();
15603:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15604: 
15605:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15606:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15607: 
15608:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15609:   const _bdGuia = calcBDActualizada(m, y);
15610:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15611: 
15612:   // Recurrentes este mes = vinieron este mes
15613:   const _pacUnicosMes = {};
15614:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15615:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
```

### Línea 15605

```html
15593:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15594:   let tasaConv = null;
15595:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15596:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15597: 
15598:   // KPI 5 — Ventas mes
15599:   const ventasMes = calcCobradoMes(m, y);
15600: 
15601:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15602:   const _encStatsG = getEncuestaStats();
15603:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15604: 
15605:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15606:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15607: 
15608:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15609:   const _bdGuia = calcBDActualizada(m, y);
15610:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15611: 
15612:   // Recurrentes este mes = vinieron este mes
15613:   const _pacUnicosMes = {};
15614:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15615:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15616:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15617:   const _stRecurrentes = _listaRecurrentes.length;
```

### Línea 15606

```html
15594:   let tasaConv = null;
15595:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15596:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15597: 
15598:   // KPI 5 — Ventas mes
15599:   const ventasMes = calcCobradoMes(m, y);
15600: 
15601:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15602:   const _encStatsG = getEncuestaStats();
15603:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15604: 
15605:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15606:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15607: 
15608:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15609:   const _bdGuia = calcBDActualizada(m, y);
15610:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15611: 
15612:   // Recurrentes este mes = vinieron este mes
15613:   const _pacUnicosMes = {};
15614:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15615:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15616:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15617:   const _stRecurrentes = _listaRecurrentes.length;
15618: 
```

### Línea 15665

```html
15653: 
15654:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15655:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
15656:       <div>
15657:         <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
15658:         <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
15659:       </div>
15660:       <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
15661:         <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
15662:           style="font-size:.73rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
15663:           ${opcionesSelect}
15664:         </select>
15665:         ${esMesActual ? `<button onclick="loadEncuestaStats()" id="btnCargarEncuestaGuia" style="font-size:.73rem;padding:6px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">🔄 Cargar encuestas</button>` : ''}
15666:         <button onclick="showView('finanzas')" style="font-size:.73rem;padding:6px 14px;background:rgba(27,191,176,.1);border:1px solid rgba(27,191,176,.3);color:var(--primary);border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">Ver finanzas →</button>
15667:       </div>
15668:     </div>
15669:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15670: 
15671:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15672:   const _sess1Meta  = esMesActual
15673:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
```

### Línea 15682

```html
15670: 
15671:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15672:   const _sess1Meta  = esMesActual
15673:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15692:   const _mkPacList = (id, icon, label, count, lista, color) => {
15693:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15694:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
```

### Línea 15683

```html
15671:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15672:   const _sess1Meta  = esMesActual
15673:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15692:   const _mkPacList = (id, icon, label, count, lista, color) => {
15693:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15694:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15695:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
```

### Línea 15684

```html
15672:   const _sess1Meta  = esMesActual
15673:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15692:   const _mkPacList = (id, icon, label, count, lista, color) => {
15693:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15694:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15695:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15696:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
```

### Línea 15686

```html
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15692:   const _mkPacList = (id, icon, label, count, lista, color) => {
15693:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15694:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15695:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15696:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15697:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15698:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
```

### Línea 15687

```html
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15692:   const _mkPacList = (id, icon, label, count, lista, color) => {
15693:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15694:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15695:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15696:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15697:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15698:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15699:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
```

### Línea 15747

```html
15735:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15736:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15737:     const textoBanner        = metaYaCumplida
15738:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15739:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15740:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15741:       ${iconoBanner} ${textoBanner}
15742:     </div>`;
15743:   }
15744: 
15745:   if (!esMesActual) {
15746:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15747:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15748:     </div>`;
15749:   }
15750: 
15751:   const cfg = getKPIConfig();
15752:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15753:   const inp = (key, label, val, note='') => `
15754:     <div>
15755:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15756:       <input type="number" id="kcfg_${key}" value="${val}"
15757:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15758:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15759:     </div>`;
```

### Línea 15763

```html
15751:   const cfg = getKPIConfig();
15752:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15753:   const inp = (key, label, val, note='') => `
15754:     <div>
15755:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15756:       <input type="number" id="kcfg_${key}" value="${val}"
15757:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15758:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15759:     </div>`;
15760: 
15761:   html += `</div>
15762:     <div style="margin-top:12px;padding:10px 14px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px;font-size:.75rem;color:var(--muted)">
15763:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15764:     </div>
15765:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15766:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15767:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15768:         ⚙️ Editar valores de referencia
15769:       </button>
15770:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15771:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15772:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15773:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15774:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15775:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
```

### Línea 15780

```html
15768:         ⚙️ Editar valores de referencia
15769:       </button>
15770:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15771:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15772:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15773:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15774:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15775:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15776:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15777:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15778:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15779:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15780:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15781:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15782:         </div>
15783:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15784:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15785:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15786:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15787:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15788:         </div>
15789:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15790:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15791:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15792:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
```

### Línea 15781

```html
15769:       </button>
15770:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15771:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15772:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15773:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15774:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15775:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15776:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15777:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15778:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15779:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15780:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15781:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15782:         </div>
15783:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15784:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15785:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15786:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15787:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15788:         </div>
15789:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15790:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15791:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15792:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
15793:           ${inp('precio_express', 'Precio Descarga Express ($)', cfg.precio_express)}
```

### Línea 15814

```html
15802:     </div>
15803:   </div>`;
15804: 
15805:   // Exportar datos para el Manual de Emergencia
15806:   window._emKPIData = {
15807:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15808:     fullPct:       fullPct,           totalMix:      totalMix,
15809:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15810:     leadsShow:     leadsShow || 0,
15811:     tasaConv:      tasaConv,
15812:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15813:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15814:     nps:           isNaN(nps)       ? 0 : nps,
15815:     npsMeta:       META_NPS,
15816:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15817:     encMeta:       META_ENCUESTAS,
15818:     bd:            isNaN(bd)        ? 0 : bd,
15819:   };
15820: 
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
```

### Línea 15815

```html
15803:   </div>`;
15804: 
15805:   // Exportar datos para el Manual de Emergencia
15806:   window._emKPIData = {
15807:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15808:     fullPct:       fullPct,           totalMix:      totalMix,
15809:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15810:     leadsShow:     leadsShow || 0,
15811:     tasaConv:      tasaConv,
15812:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15813:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15814:     nps:           isNaN(nps)       ? 0 : nps,
15815:     npsMeta:       META_NPS,
15816:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15817:     encMeta:       META_ENCUESTAS,
15818:     bd:            isNaN(bd)        ? 0 : bd,
15819:   };
15820: 
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
```

### Línea 15816

```html
15804: 
15805:   // Exportar datos para el Manual de Emergencia
15806:   window._emKPIData = {
15807:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15808:     fullPct:       fullPct,           totalMix:      totalMix,
15809:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15810:     leadsShow:     leadsShow || 0,
15811:     tasaConv:      tasaConv,
15812:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15813:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15814:     nps:           isNaN(nps)       ? 0 : nps,
15815:     npsMeta:       META_NPS,
15816:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15817:     encMeta:       META_ENCUESTAS,
15818:     bd:            isNaN(bd)        ? 0 : bd,
15819:   };
15820: 
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
15828: 
```

### Línea 15817

```html
15805:   // Exportar datos para el Manual de Emergencia
15806:   window._emKPIData = {
15807:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15808:     fullPct:       fullPct,           totalMix:      totalMix,
15809:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15810:     leadsShow:     leadsShow || 0,
15811:     tasaConv:      tasaConv,
15812:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15813:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15814:     nps:           isNaN(nps)       ? 0 : nps,
15815:     npsMeta:       META_NPS,
15816:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15817:     encMeta:       META_ENCUESTAS,
15818:     bd:            isNaN(bd)        ? 0 : bd,
15819:   };
15820: 
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
15826:   renderEmergencia();
15827: }
15828: 
15829: function _renderCancelBreakdown() {
```

### Línea 15962

```html
15950:   if (cancelMesPruebas.length) {
15951:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15952:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15953:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15954:     </div>`;
15955:   }
15956: 
15957:   html += `</div>`;
15958:   el.innerHTML = html;
15959: }
15960: 
15961: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15962: function getEncuestaStats() {
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
```

### Línea 15963

```html
15951:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15952:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15953:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15954:     </div>`;
15955:   }
15956: 
15957:   html += `</div>`;
15958:   el.innerHTML = html;
15959: }
15960: 
15961: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15962: function getEncuestaStats() {
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
```

### Línea 15966

```html
15954:     </div>`;
15955:   }
15956: 
15957:   html += `</div>`;
15958:   el.innerHTML = html;
15959: }
15960: 
15961: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15962: function getEncuestaStats() {
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
```

### Línea 15971

```html
15959: }
15960: 
15961: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15962: function getEncuestaStats() {
15963:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15964: }
15965: 
15966: async function loadEncuestaStats() {
15967:   const btn  = document.getElementById('btnCargarEncuesta');
15968:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
```

### Línea 15981

```html
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
```

### Línea 15983

```html
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
```

### Línea 15988

```html
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
```

### Línea 15991

```html
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
```

### Línea 15993

```html
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
```

### Línea 15996

```html
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
```

### Línea 16000

```html
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
```

### Línea 16001

```html
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
```

### Línea 16004

```html
15992:       guardarKPIManual();
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
```

### Línea 16005

```html
15993:       _renderEncuestaStatsUI(stats);
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
```

### Línea 16006

```html
15994:       renderKPITablero();
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
```

### Línea 16007

```html
15995:       renderKPIGuia();
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
```

### Línea 16008

```html
15996:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
```

### Línea 16009

```html
15997:     } else {
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16021: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
```

### Línea 16010

```html
15998:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16021: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16022: 
```

### Línea 16011

```html
15999:     }
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16021: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16022: 
16023: function _rutinaKey() {
```

### Línea 16012

```html
16000:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16001:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16002: }
16003: 
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16021: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16022: 
16023: function _rutinaKey() {
16024:   const d = new Date();
```

### Línea 16016

```html
16004: function _renderEncuestaStatsUI(stats) {
16005:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16006:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16007:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16008:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16009:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16010:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16011:   if (npsEl) npsEl.innerHTML = npsOk
16012:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16013:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16014:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16015:   if (encEl) encEl.innerHTML =
16016:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16017:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16018: }
16019: 
16020: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16021: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16022: 
16023: function _rutinaKey() {
16024:   const d = new Date();
16025:   return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
16026: }
16027: 
16028: function loadRutinaChecks() {
```

### Línea 16253

```html
16241:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16242:       <div style="display:flex;flex-direction:column;gap:16px">
16243: 
16244:         <div class="card">
16245:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16246:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16247:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16248:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16249:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16250:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16251:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16252:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16253:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16254:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16255:           </div>
16256:         </div>
16257: 
16258:         <div class="card">
16259:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16260:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16261: 
16262:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16263:             <div></div>
16264:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16265:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
```

### Línea 16254

```html
16242:       <div style="display:flex;flex-direction:column;gap:16px">
16243: 
16244:         <div class="card">
16245:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16246:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16247:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16248:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16249:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16250:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16251:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16252:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16253:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16254:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16255:           </div>
16256:         </div>
16257: 
16258:         <div class="card">
16259:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16260:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16261: 
16262:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16263:             <div></div>
16264:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16265:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
16266:           </div>
```

### Línea 16390

```html
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
```

### Línea 16391

```html
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
```

### Línea 16472

```html
16460: 
16461: function guardarKPIConfig() {
16462:   const get = key => {
16463:     const el = document.getElementById('kcfg_' + key);
16464:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16465:   };
16466:   const prev = getKPIConfig();
16467:   const updated = {
16468:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16469:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16470:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16471:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16472:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16473:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16474:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16475:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16476:     meta_cancelacion:     prev.meta_cancelacion,
16477:     meta_retencion:       prev.meta_retencion,
16478:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16479:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16480:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16481:     precio_full:          get('precio_full')          ?? prev.precio_full,
16482:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16483:     precio_express:       get('precio_express')       ?? prev.precio_express,
16484:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
```

### Línea 16473

```html
16461: function guardarKPIConfig() {
16462:   const get = key => {
16463:     const el = document.getElementById('kcfg_' + key);
16464:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16465:   };
16466:   const prev = getKPIConfig();
16467:   const updated = {
16468:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16469:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16470:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16471:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16472:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16473:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16474:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16475:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16476:     meta_cancelacion:     prev.meta_cancelacion,
16477:     meta_retencion:       prev.meta_retencion,
16478:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16479:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16480:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16481:     precio_full:          get('precio_full')          ?? prev.precio_full,
16482:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16483:     precio_express:       get('precio_express')       ?? prev.precio_express,
16484:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
16485:   };
```

### Línea 18950

```html
18938:     semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
18939:     ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
18940:     bono_react:            parseInt(cfg.bono_react            || '15000', 10),
18941:     bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
18942:     pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
18943:     bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
18944:     serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
18945:     serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
18946:     bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
18947:     contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
18948:     contenido_persona:     cfg.contenido_persona || 'Persona del video',
18949:     contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
18950:     equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
18951:   };
18952: }
18953: 
18954: function saveComisConfig() {
18955:   const g = id => (document.getElementById(id)||{}).value || '';
18956:   kvSet('comisiones_config', JSON.stringify({
18957:     bono_agenda:          g('cfg_bono_agenda'),
18958:     semanas_meta:         g('cfg_semanas_meta'),
18959:     ses_llena:            g('cfg_ses_llena'),
18960:     bono_react:           g('cfg_bono_react'),
18961:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18962:     pct_reventa:          g('cfg_pct_reventa'),
```

### Línea 18970

```html
18958:     semanas_meta:         g('cfg_semanas_meta'),
18959:     ses_llena:            g('cfg_ses_llena'),
18960:     bono_react:           g('cfg_bono_react'),
18961:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18962:     pct_reventa:          g('cfg_pct_reventa'),
18963:     bono_cruzada:         g('cfg_bono_cruzada'),
18964:     serv_mant:            g('cfg_serv_mant'),
18965:     serv_descarga:        g('cfg_serv_descarga'),
18966:     bono_contenido:       g('cfg_bono_contenido'),
18967:     contenido_split_aux:  g('cfg_contenido_split_aux'),
18968:     contenido_persona:    g('cfg_contenido_persona'),
18969:     contenido_leads_meta: g('cfg_contenido_leads_meta'),
18970:     equipo_nps_meta:      g('cfg_equipo_nps_meta'),
18971:   }));
18972:   const msg = document.getElementById('coConfigMsg');
18973:   if (msg) { msg.style.display='inline'; setTimeout(()=>msg.style.display='none',2000); }
18974:   renderComisiones();
18975: }
18976: 
18977: function toggleComisConfig() {
18978:   const p = document.getElementById('coConfigPanel');
18979:   if (!p) return;
18980:   const open = p.style.display === 'none';
18981:   p.style.display = open ? 'block' : 'none';
18982:   if (!open) return;
```

### Línea 18998

```html
18986:   set('cfg_semanas_meta',         cfg.semanas_meta);
18987:   set('cfg_ses_llena',            META_SESIONES_SEMANA);
18988:   set('cfg_bono_react',           cfg.bono_react);
18989:   set('cfg_bono_react_tipo',      cfg.bono_react_tipo);
18990:   set('cfg_pct_reventa',          cfg.pct_reventa);
18991:   set('cfg_bono_cruzada',         cfg.bono_cruzada);
18992:   set('cfg_serv_mant',            cfg.serv_mant.join(', '));
18993:   set('cfg_serv_descarga',        cfg.serv_descarga);
18994:   set('cfg_bono_contenido',       cfg.bono_contenido);
18995:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18996:   set('cfg_contenido_persona',    cfg.contenido_persona);
18997:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
18998:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
18999: }
19000: 
19001: function _initComisMesSel() {
19002:   const sel = document.getElementById('comisMes');
19003:   if (!sel || sel.options.length > 0) return;
19004:   const now = new Date();
19005:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19006:   for (let i = 0; i < 12; i++) {
19007:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19008:     const opt = document.createElement('option');
19009:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19010:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
```

### Línea 19189

```html
19177:   const bonoCruzAux   = cruzadas.filter(c => c.asign === 'auxiliar').length * cfg.bono_cruzada;
19178:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19179: 
19180:   // ── CREADOR DE CONTENIDO ──
19181:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19182:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19183:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19184:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19185:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19186:   const bonoContVideo= bonoCont - bonoContAux;
19187:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19188: 
19189:   // ── NPS / TODO EL EQUIPO ──
19190:   const _enc    = getEncuestaStats();
19191:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19192:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19193: 
19194:   // ── TOTALES ──
19195:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19196:   const totalFisio = bonoRev + bonoCruzFisio;
19197:   const totalVideo = bonoContVideo;
19198:   const totalGen   = totalAux + totalFisio + totalVideo;
19199: 
19200:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19201:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
```

### Línea 19190

```html
19178:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19179: 
19180:   // ── CREADOR DE CONTENIDO ──
19181:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19182:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19183:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19184:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19185:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19186:   const bonoContVideo= bonoCont - bonoContAux;
19187:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19188: 
19189:   // ── NPS / TODO EL EQUIPO ──
19190:   const _enc    = getEncuestaStats();
19191:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19192:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19193: 
19194:   // ── TOTALES ──
19195:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19196:   const totalFisio = bonoRev + bonoCruzFisio;
19197:   const totalVideo = bonoContVideo;
19198:   const totalGen   = totalAux + totalFisio + totalVideo;
19199: 
19200:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19201:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19202:   const pagoVideo = kvGet('comis_pago_video_' + mes);
```

### Línea 19191

```html
19179: 
19180:   // ── CREADOR DE CONTENIDO ──
19181:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19182:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19183:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19184:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19185:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19186:   const bonoContVideo= bonoCont - bonoContAux;
19187:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19188: 
19189:   // ── NPS / TODO EL EQUIPO ──
19190:   const _enc    = getEncuestaStats();
19191:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19192:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19193: 
19194:   // ── TOTALES ──
19195:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19196:   const totalFisio = bonoRev + bonoCruzFisio;
19197:   const totalVideo = bonoContVideo;
19198:   const totalGen   = totalAux + totalFisio + totalVideo;
19199: 
19200:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19201:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19202:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19203: 
```

### Línea 19192

```html
19180:   // ── CREADOR DE CONTENIDO ──
19181:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19182:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19183:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19184:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19185:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19186:   const bonoContVideo= bonoCont - bonoContAux;
19187:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19188: 
19189:   // ── NPS / TODO EL EQUIPO ──
19190:   const _enc    = getEncuestaStats();
19191:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19192:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19193: 
19194:   // ── TOTALES ──
19195:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19196:   const totalFisio = bonoRev + bonoCruzFisio;
19197:   const totalVideo = bonoContVideo;
19198:   const totalGen   = totalAux + totalFisio + totalVideo;
19199: 
19200:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19201:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19202:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19203: 
19204:   // ── RESUMEN ──
```

### Línea 19332

```html
19320:       </div>
19321:     </div>
19322:     <div class="co-footer">
19323:       ${btnVideo}
19324:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19325:     </div>
19326:   </div>`;
19327: 
19328:   const contWrap = document.getElementById('coContenidoWrap');
19329:   if (contWrap) contWrap.innerHTML = htmlCont;
19330: 
19331:   // ── TODO EL EQUIPO ──
19332:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19333:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19334:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19335:     <div>
19336:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19337:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19338:     </div>
19339:     <div style="text-align:right">
19340:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19341:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19342:     </div>
19343:   </div>`;
19344: 
```

### Línea 19333

```html
19321:     </div>
19322:     <div class="co-footer">
19323:       ${btnVideo}
19324:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19325:     </div>
19326:   </div>`;
19327: 
19328:   const contWrap = document.getElementById('coContenidoWrap');
19329:   if (contWrap) contWrap.innerHTML = htmlCont;
19330: 
19331:   // ── TODO EL EQUIPO ──
19332:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19333:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19334:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19335:     <div>
19336:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19337:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19338:     </div>
19339:     <div style="text-align:right">
19340:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19341:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19342:     </div>
19343:   </div>`;
19344: 
19345:   const equipoWrap = document.getElementById('coEquipoWrap');
```

### Línea 19337

```html
19325:     </div>
19326:   </div>`;
19327: 
19328:   const contWrap = document.getElementById('coContenidoWrap');
19329:   if (contWrap) contWrap.innerHTML = htmlCont;
19330: 
19331:   // ── TODO EL EQUIPO ──
19332:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19333:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19334:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19335:     <div>
19336:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19337:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19338:     </div>
19339:     <div style="text-align:right">
19340:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19341:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19342:     </div>
19343:   </div>`;
19344: 
19345:   const equipoWrap = document.getElementById('coEquipoWrap');
19346:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19347: }
19348: </script>
19349: 
```

### Línea 19340

```html
19328:   const contWrap = document.getElementById('coContenidoWrap');
19329:   if (contWrap) contWrap.innerHTML = htmlCont;
19330: 
19331:   // ── TODO EL EQUIPO ──
19332:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19333:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19334:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19335:     <div>
19336:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19337:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19338:     </div>
19339:     <div style="text-align:right">
19340:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19341:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19342:     </div>
19343:   </div>`;
19344: 
19345:   const equipoWrap = document.getElementById('coEquipoWrap');
19346:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19347: }
19348: </script>
19349: 
19350: <script>
19351: // ══════════════════════════════════════════
19352: //  DISPONIBILIDAD RÁPIDA
```

### Línea 19805

```html
19793:     pie.style.display = 'flex';
19794:     pie.innerHTML = `
19795:       <span style="color:var(--muted)">Ventas filtradas: <strong style="color:var(--text)">${_fmtCLP(totalFilVenta)}</strong></span>
19796:       <span style="color:var(--muted)">Comisión total: <strong style="color:#10b981">${_fmtCLP(totalFilComis)}</strong></span>
19797:       ${totalFilPend > 0 ? `<span style="color:var(--muted)">Pendiente: <strong style="color:#f59e0b">${_fmtCLP(totalFilPend)}</strong></span>` : ''}
19798:     `;
19799:   }
19800: }
19801: 
19802: function registrarRecuperacion() {
19803:   const paciente = document.getElementById('recInpPaciente')?.value.trim();
19804:   const fecha    = document.getElementById('recInpFecha')?.value;
19805:   const servicio = document.getElementById('recInpServicio')?.value;
19806:   const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
19807:   const nota     = document.getElementById('recInpNota')?.value.trim() || '';
19808: 
19809:   if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
19810:   if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
19811:   if (!servicio) { alert('Selecciona el servicio'); return; }
19812:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19813: 
19814:   const comision = Math.round(venta * REC_PCT);
19815:   const rec = {
19816:     id: Date.now().toString(),
19817:     fecha,
```

### Línea 19834

```html
19822:     nota,
19823:     pagado: false,
19824:     pagadoFecha: null
19825:   };
19826: 
19827:   const all = _loadRec();
19828:   all.push(rec);
19829:   _saveRec(all);
19830: 
19831:   // Limpiar formulario
19832:   document.getElementById('recInpPaciente').value = '';
19833:   document.getElementById('recInpFecha').value    = '';
19834:   document.getElementById('recInpServicio').value = '';
19835:   document.getElementById('recInpVenta').value    = '';
19836:   document.getElementById('recInpNota').value     = '';
19837:   document.getElementById('recInpComisionCalc').value = '$0';
19838: 
19839:   const msg = document.getElementById('recGuardadoMsg');
19840:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19841: 
19842:   renderRecuperaciones();
19843:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
19844: }
19845: 
19846: function marcarPagado(id) {
```

### Línea 20058

```html
20046:       </div>
20047:       <div style="flex-shrink:0">${registrarBtn}</div>
20048:     </div>
20049:     <div style="margin-top:10px;padding-top:10px;border-top:1px solid ${gc.border};display:flex;gap:6px;flex-wrap:wrap;align-items:center">
20050:       <span style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);white-space:nowrap">Enviar por WA:</span>
20051:       ${waBtns}
20052:     </div>
20053:   </div>`;
20054: }
20055: 
20056: function preRellenaRecuperacion(nombre, servicio) {
20057:   const inpNombre = document.getElementById('recInpPaciente');
20058:   const inpServ   = document.getElementById('recInpServicio');
20059:   const inpFecha  = document.getElementById('recInpFecha');
20060:   if (inpNombre) inpNombre.value = nombre;
20061:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20062:   // Intentar hacer match del servicio en el select
20063:   if (inpServ && servicio) {
20064:     const opts = Array.from(inpServ.options);
20065:     const srv  = servicio.toLowerCase();
20066:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20067:     if (match) inpServ.value = match.value;
20068:   }
20069:   // Scroll suave al formulario
20070:   const form = document.getElementById('recInpVenta');
```

### Línea 20063

```html
20051:       ${waBtns}
20052:     </div>
20053:   </div>`;
20054: }
20055: 
20056: function preRellenaRecuperacion(nombre, servicio) {
20057:   const inpNombre = document.getElementById('recInpPaciente');
20058:   const inpServ   = document.getElementById('recInpServicio');
20059:   const inpFecha  = document.getElementById('recInpFecha');
20060:   if (inpNombre) inpNombre.value = nombre;
20061:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20062:   // Intentar hacer match del servicio en el select
20063:   if (inpServ && servicio) {
20064:     const opts = Array.from(inpServ.options);
20065:     const srv  = servicio.toLowerCase();
20066:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20067:     if (match) inpServ.value = match.value;
20068:   }
20069:   // Scroll suave al formulario
20070:   const form = document.getElementById('recInpVenta');
20071:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20072:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20073: }
20074: 
20075: // ── CAMPAÑA DE REFERIDOS DEL MES ──
```

### Línea 20064

```html
20052:     </div>
20053:   </div>`;
20054: }
20055: 
20056: function preRellenaRecuperacion(nombre, servicio) {
20057:   const inpNombre = document.getElementById('recInpPaciente');
20058:   const inpServ   = document.getElementById('recInpServicio');
20059:   const inpFecha  = document.getElementById('recInpFecha');
20060:   if (inpNombre) inpNombre.value = nombre;
20061:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20062:   // Intentar hacer match del servicio en el select
20063:   if (inpServ && servicio) {
20064:     const opts = Array.from(inpServ.options);
20065:     const srv  = servicio.toLowerCase();
20066:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20067:     if (match) inpServ.value = match.value;
20068:   }
20069:   // Scroll suave al formulario
20070:   const form = document.getElementById('recInpVenta');
20071:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20072:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20073: }
20074: 
20075: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20076: // ── helpers de estado por paciente (persisten en localStorage) ──
```

### Línea 20067

```html
20055: 
20056: function preRellenaRecuperacion(nombre, servicio) {
20057:   const inpNombre = document.getElementById('recInpPaciente');
20058:   const inpServ   = document.getElementById('recInpServicio');
20059:   const inpFecha  = document.getElementById('recInpFecha');
20060:   if (inpNombre) inpNombre.value = nombre;
20061:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20062:   // Intentar hacer match del servicio en el select
20063:   if (inpServ && servicio) {
20064:     const opts = Array.from(inpServ.options);
20065:     const srv  = servicio.toLowerCase();
20066:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20067:     if (match) inpServ.value = match.value;
20068:   }
20069:   // Scroll suave al formulario
20070:   const form = document.getElementById('recInpVenta');
20071:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20072:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20073: }
20074: 
20075: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20076: // ── helpers de estado por paciente (persisten en localStorage) ──
20077: function _refKey(mesStr, anio, nombre) {
20078:   return `refCamp_${mesStr}${anio}_${(nombre||'').toLowerCase().trim().replace(/\s+/g,'_')}`;
20079: }
```

## Controles del formulario de Base de datos

### Línea 5156

```html
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
```

### Línea 11373

```html
11361:     initDashboard();
11362:   } catch(e) { toast('Error de conexión', 'err'); }
11363: }
11364: 
11365: // ── BASE DE DATOS ──
11366: let _dbPacs = [];
11367: 
11368: function initFormDB() {
11369:   // noop — form fields start empty, no defaults needed
11370: }
11371: 
11372: function renderBasedatos() {
11373:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11374:   const map = {};
11375:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11376:   (allData.pacientes || []).forEach(function(p) {
11377:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11378:     const email  = (p.email || '').toLowerCase().trim();
11379:     const nombre = (p.nombre || '').trim();
11380:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11381:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11382:   });
11383:   // Luego cruzar con citas (actualizan datos si el paciente ya existe)
11384:   (allData.citas || []).forEach(function(c) {
11385:     const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
```

## Interfaz de voz

### Línea 2786

```html
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
```

### Línea 2787

```html
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
```

### Línea 2789

```html
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
```

### Línea 2796

```html
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
```

### Línea 2798

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
2807:           </div>
2808:         </div>
2809:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2810: 
```

### Línea 2800

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
2809:         <hr style="border:none;border-top:1px solid var(--border);margin:18px 0 20px">
2810: 
2811:         <!-- ── BUSCADOR PACIENTE EXISTENTE ── -->
2812:         <div class="field" style="margin-bottom:20px;position:relative">
```

### Línea 2806

```html
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
```

### Línea 11892

```html
11880:   if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
11881: }
11882: 
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
11904:     document.getElementById('voiceText').value = '';
```

### Línea 11893

```html
11881: }
11882: 
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
11904:     document.getElementById('voiceText').value = '';
11905:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
```

### Línea 11895

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
11904:     document.getElementById('voiceText').value = '';
11905:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11906:   }
11907: }
```

### Línea 11899

```html
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
11904:     document.getElementById('voiceText').value = '';
11905:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11906:   }
11907: }
11908: 
11909: function procesarVozTexto() {
11910:   const txt = (document.getElementById('voiceText').value || '').trim();
11911:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
```

### Línea 11900

```html
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
11904:     document.getElementById('voiceText').value = '';
11905:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11906:   }
11907: }
11908: 
11909: function procesarVozTexto() {
11910:   const txt = (document.getElementById('voiceText').value || '').trim();
11911:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11912:   _parseVoice(txt);
```

### Línea 11913

```html
11901:   const isOpen = panel.style.display !== 'none';
11902:   panel.style.display = isOpen ? 'none' : 'block';
11903:   if (!isOpen) {
11904:     document.getElementById('voiceText').value = '';
11905:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11906:   }
11907: }
11908: 
11909: function procesarVozTexto() {
11910:   const txt = (document.getElementById('voiceText').value || '').trim();
11911:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11912:   _parseVoice(txt);
11913:   document.getElementById('voicePanel').style.display = 'none';
11914:   document.getElementById('voiceText').value = '';
11915: }
11916: 
11917: function toggleVoice() {
11918:   const SR = _getSR();
11919:   if (!SR) {
11920:     alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
11921:     return;
11922:   }
11923:   if (_voiceActive) { _stopVoice(false); return; }
11924:   _startVoice(SR);
11925: }
```

### Línea 11944

```html
11932:     return;
11933:   }
11934: 
11935:   // Configuración optimizada para iOS Safari
11936:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
```

### Línea 11947

```html
11935:   // Configuración optimizada para iOS Safari
11936:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11958: 
11959:   _voiceRec.onerror = e => {
```

### Línea 11948

```html
11936:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11958: 
11959:   _voiceRec.onerror = e => {
11960:     if (e.error === 'not-allowed') {
```

### Línea 11949

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
11958: 
11959:   _voiceRec.onerror = e => {
11960:     if (e.error === 'not-allowed') {
11961:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
```

### Línea 11955

```html
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
11960:     if (e.error === 'not-allowed') {
11961:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11962:     } else if (e.error === 'no-speech') {
11963:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11964:     } else {
11965:       toast('Error: ' + e.error, 'err');
11966:     }
11967:     _stopVoice(false);
```

### Línea 11998

```html
11986:     alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
11987:     _stopVoice(false);
11988:   }
11989: }
11990: 
11991: function _stopVoice(showMsg = true) {
11992:   _voiceActive = false;
11993:   if (_voiceRec) {
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
```

### Línea 12004

```html
11992:   _voiceActive = false;
11993:   if (_voiceRec) {
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
12015:   let filled = [];
12016: 
```

### Línea 12152

```html
12140:         document.getElementById('ncPhone').value = known.telefono || '';
12141:         document.getElementById('ncEmail').value = known.email    || '';
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
12163: }
12164: function msgSemana5(nombre) {
```

## Meta mensual y presupuesto

### Línea 4322

```html
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
```

### Línea 4337

```html
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
```

### Línea 4725

```html
4713:               </div>
4714:               <div class="em-card-footer">
4715:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
4716:                 <button class="em-reset-btn" onclick="resetEmSteps('ventas_sem',5)">↺ Reiniciar</button>
4717:               </div>
4718:             </div>
4719:           </div>
4720: 
4721:           <!-- KPI: Ventas mes -->
4722:           <div class="em-card" id="emCard_ventas_mes">
4723:             <div class="em-card-hdr" onclick="toggleEmCard('ventas_mes')">
4724:               <div class="em-dot gris" id="emDot_ventas_mes"></div>
4725:               <span class="em-card-title">Ventas mes &lt;80% meta<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">&lt;<span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></small></span>
4726:               <span class="em-sev c">🔴 Crítico</span>
4727:               <span class="em-card-time">⏱ 45 min</span>
4728:               <span class="em-carr">▼</span>
4729:             </div>
4730:             <div class="em-card-body" id="emBody_ventas_mes">
4731:               <div class="em-symptom">💡 <strong>El mes está comprometido.</strong> Por debajo del 80% de la meta ya no alcanza con citas normales — se necesita una acción extraordinaria. La clave es calcular primero cuánto falta y cuántos días quedan, para saber si el gap es recuperable con citas extra, paquetes, o si hay que activar un plan de contingencia.</div>
4732:               <div class="em-prog-meta" id="emPM_ventas_mes">0 de 6 pasos completados</div>
4733:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_mes" style="width:0%"></div></div>
4734:               <div class="em-steps">
4735:                 <label class="em-step" id="emS_ventas_mes_0" onclick="handleEmStep(event,'ventas_mes',0)"><input type="checkbox" id="emCk_ventas_mes_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Calcular el gap real:</strong> abrir Finanzas, ver cuánto se ha facturado y cuánto falta. Dividirlo entre los días hábiles restantes del mes — ese es el ingreso diario necesario. Si son más de $600k/día extra, el plan de citas no es suficiente solo.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4736:                 <label class="em-step" id="emS_ventas_mes_1" onclick="handleEmStep(event,'ventas_mes',1)"><input type="checkbox" id="emCk_ventas_mes_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Campaña de paquetes con fecha límite:</strong> ofrecer a pacientes activos paquetes pre-pagados con vigencia de 60 días. El pago adelantado ingresa al mes actual aunque las citas se usen después — es la palanca más rápida para cerrar el gap.</span></label>
4737:                 <label class="em-step" id="emS_ventas_mes_2" onclick="handleEmStep(event,'ventas_mes',2)"><input type="checkbox" id="emCk_ventas_mes_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Evento corporativo o grupal de emergencia:</strong> si hay contactos en empresas, gimnasios o equipos deportivos de la zona, ofrecer una jornada de valoraciones express (20–30 min c/u). 10 valoraciones a $80k = $800k en un día, sin costo de adquisición.</span></label>
```

### Línea 12784

```html
12772:       if (_remData) renderRecordatorios(_remData);
12773:     } else toast('Error al enviar email', 'err');
12774:   } catch(e) { toast('Error de conexión', 'err'); }
12775: }
12776: 
12777: // ══════════════════════════════════════════════════════════════
12778: // ── META MENSUAL ──
12779: // ══════════════════════════════════════════════════════════════
12780: function getMeta() {
12781:   // Limpiar metaMensual si tiene valor viejo
12782:   const stored = parseInt(kvGet('metaMensual')||'0', 10);
12783:   if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
12784:   return getKPIConfig().meta_ventas_mes || 10265000;
12785: }
12786: 
12787: function actualizarMetaBarra(cobrado) {
12788:   const meta = getMeta();
12789:   const fill = document.getElementById('metaBarFill');
12790:   const pct  = document.getElementById('metaPct');
12791:   const txt  = document.getElementById('metaTexto');
12792:   const inp  = document.getElementById('metaInput');
12793:   if (!fill) return;
12794:   if (!meta) {
12795:     if (pct) pct.textContent = '';
12796:     if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
```

### Línea 12822

```html
12810:   const cobrado = calcCobradoMes();
12811:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12812:   const fill = document.getElementById('metaBarFill');
12813:   const pct  = document.getElementById('metaPct');
12814:   if (fill) fill.style.width = p + '%';
12815:   if (pct)  pct.textContent  = p + '%';
12816: }
12817: 
12818: function guardarMeta() {
12819:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12820:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12821:   kvSet('metaMensual', val);
12822:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12823:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12824:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12825:   actualizarMetaBarra(calcCobradoMes());
12826:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12827: }
12828: 
12829: function previewMetaFin(v) {
12830:   const n = parseInt(v.replace(/\D/g,''), 10);
12831:   if (!n) return;
12832:   const cobrado = calcCobradoMes();
12833:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12834:   const fill = document.getElementById('metaBarFinFill');
```

### Línea 12823

```html
12811:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12812:   const fill = document.getElementById('metaBarFill');
12813:   const pct  = document.getElementById('metaPct');
12814:   if (fill) fill.style.width = p + '%';
12815:   if (pct)  pct.textContent  = p + '%';
12816: }
12817: 
12818: function guardarMeta() {
12819:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12820:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12821:   kvSet('metaMensual', val);
12822:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12823:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12824:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12825:   actualizarMetaBarra(calcCobradoMes());
12826:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12827: }
12828: 
12829: function previewMetaFin(v) {
12830:   const n = parseInt(v.replace(/\D/g,''), 10);
12831:   if (!n) return;
12832:   const cobrado = calcCobradoMes();
12833:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12834:   const fill = document.getElementById('metaBarFinFill');
12835:   const pct  = document.getElementById('metaBarFinPct');
```

### Línea 12846

```html
12834:   const fill = document.getElementById('metaBarFinFill');
12835:   const pct  = document.getElementById('metaBarFinPct');
12836:   const wrap = document.getElementById('metaBarFinWrap');
12837:   if (wrap) wrap.style.display = 'block';
12838:   if (fill) fill.style.width = p + '%';
12839:   if (pct)  pct.textContent  = p + '%';
12840: }
12841: 
12842: function guardarMetaFin() {
12843:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12844:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12845:   kvSet('metaMensual', val);
12846:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12847:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12848:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12849:   renderFinanzas();
12850:   actualizarMetaBarra(calcCobradoMes());
12851:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
```

### Línea 12847

```html
12835:   const pct  = document.getElementById('metaBarFinPct');
12836:   const wrap = document.getElementById('metaBarFinWrap');
12837:   if (wrap) wrap.style.display = 'block';
12838:   if (fill) fill.style.width = p + '%';
12839:   if (pct)  pct.textContent  = p + '%';
12840: }
12841: 
12842: function guardarMetaFin() {
12843:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12844:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12845:   kvSet('metaMensual', val);
12846:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12847:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12848:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12849:   renderFinanzas();
12850:   actualizarMetaBarra(calcCobradoMes());
12851:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12852: }
12853: 
12854: function calcIngresoPaquetesMes(m, y) {
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
```

### Línea 13320

```html
13308:     + (c.redes_contenido     || 0)
13309:     + (c.activacion_eventos  || 0)
13310:     + (c.pautas_redes        || 0)
13311:     + (c.mantenimiento       || 0)
13312:     + (c.insumos             || 0);
13313:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13314:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13315:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13316: }
13317: 
13318: const KPI_CONFIG_DEFAULTS = {
13319:   meta_sesiones_semana: 30,
13320:   meta_ventas_mes:      10265000,
13321:   meta_leads_min:       40,
13322:   meta_leads_max:       50,
13323:   meta_conv_min:        25,
13324:   meta_conv_max:        35,
13325:   meta_nps:             90,
13326:   meta_encuestas:       70,
13327:   meta_cancelacion:     10,
13328:   meta_retencion:       60,
13329:   inv_mkt_total:        340000,
13330:   inv_mkt_pauta:        100000,
13331:   inv_mkt_contenido:    240000,
13332:   precio_full:          110000,
```

### Línea 13361

```html
13349:   sv_pkTotal_p:   560000,  sv_pkTotal_d:    722000,
13350:   sv_planActivo_p:135000,  sv_planActivo_d: 165000,
13351:   sv_planPro_p:   230000,  sv_planPro_d:    275000,
13352: };
13353: 
13354: function getKPIConfig() {
13355:   try {
13356:     const stored = kvGet('kpiConfig');
13357:     if (!stored) return {...KPI_CONFIG_DEFAULTS};
13358:     const parsed = JSON.parse(stored);
13359:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13360:     let migrated = false;
13361:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13362:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13363:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13364:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13365:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13366: }
13367: 
13368: const _cfg0 = getKPIConfig();
13369: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13370: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
```

### Línea 13371

```html
13359:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13360:     let migrated = false;
13361:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13362:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13363:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13364:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13365:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13366: }
13367: 
13368: const _cfg0 = getKPIConfig();
13369: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13370: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
```

### Línea 13372

```html
13360:     let migrated = false;
13361:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13362:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13363:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13364:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13365:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13366: }
13367: 
13368: const _cfg0 = getKPIConfig();
13369: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13370: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13371: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13372: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13373: let META_NPS             = _cfg0.meta_nps;
13374: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13375: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13376: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13377: const META_CAC_MAX         = 80000;
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
```

### Línea 13429

```html
13417:   return {
13418:     pct:       Math.round((completos / pacs.length) * 100),
13419:     completos,
13420:     total:     pacs.length,
13421:     sinTel,
13422:     sinEmail,
13423:   };
13424: }
13425: 
13426: function reloadMetas() {
13427:   const cfg = getKPIConfig();
13428:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13429:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13430:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13431:   META_NPS             = cfg.meta_nps;
13432:   META_ENCUESTAS       = cfg.meta_encuestas;
13433:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13434:   META_RETENCION_PCT   = cfg.meta_retencion;
13435:   // Sincronizar precios de servicios siempre
13436:   _syncPreciosToAutoFill(cfg);
13437: }
13438: 
13439: function getKPIManual() {
13440:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13441: }
```

### Línea 13430

```html
13418:     pct:       Math.round((completos / pacs.length) * 100),
13419:     completos,
13420:     total:     pacs.length,
13421:     sinTel,
13422:     sinEmail,
13423:   };
13424: }
13425: 
13426: function reloadMetas() {
13427:   const cfg = getKPIConfig();
13428:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13429:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13430:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13431:   META_NPS             = cfg.meta_nps;
13432:   META_ENCUESTAS       = cfg.meta_encuestas;
13433:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13434:   META_RETENCION_PCT   = cfg.meta_retencion;
13435:   // Sincronizar precios de servicios siempre
13436:   _syncPreciosToAutoFill(cfg);
13437: }
13438: 
13439: function getKPIManual() {
13440:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13441: }
13442: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
```

### Línea 13670

```html
13658:   // Tarjeta sesiones con lógica de compensación por eventos
13659:   const _revenueOk    = ventasSemana >= META_VENTAS_SEMANA * 0.84;
13660:   const _sessLabel    = nEventosSem > 0 ? `${nCitasSem} citas + ${nEventosSem} evento${nEventosSem>1?'s':''}` : `${sessSemana}`;
13661:   const _sessMetaTxt  = nEventosSem > 0 && _revenueOk
13662:     ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan`
13663:     : `${META_SESIONES_SEMANA} sesiones`;
13664:   // Si hay eventos y los ingresos están bien, no mostrar rojo
13665:   const _sessEvalVal  = (nEventosSem > 0 && _revenueOk) ? META_SESIONES_SEMANA : sessSemana;
13666: 
13667:   let html = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px">`;
13668:   html += kpiCard('📅','Sesiones esta semana', _sessLabel, META_SESIONES_SEMANA, '', true, _sessMetaTxt, _sessEvalVal);
13669:   html += kpiCard('💰','Ventas esta semana', fmtPeso(ventasSemana), META_VENTAS_SEMANA, '', true, fmtPeso(META_VENTAS_SEMANA));
13670:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13671:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13672: 
13673:   if (tasa !== null) {
13674:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13675:   } else {
13676:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13677:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13678:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13679:     </div>`;
13680:   }
13681: 
13682:   const _encStats  = getEncuestaStats();
```

### Línea 13862

```html
13850:   const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
13851:   const ventasGeneradas = citasMesActivas.reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosMes.reduce((s,e) => s + parsePrecio(e.cobro), 0);
13852:   const ingresosCobrados = (typeof calcCobradoMes === 'function') ? calcCobradoMes() : ventasGeneradas;
13853:   const pagosPendientesLista = citasMesActivas.filter(c => {
13854:     const estado = String(c.estado || '').toLowerCase();
13855:     return estado.includes('pendiente de pago') || estado.includes('pago por verificar') || estado.includes('rechazado');
13856:   });
13857:   const pendienteCobrar = pagosPendientesLista.reduce((s,c) => s + parsePrecio(c.precio), 0);
13858:   const egresosMes = (typeof getEgresos === 'function' ? getEgresos() : [])
13859:     .filter(e => String(e.fecha || '').startsWith(monthKey))
13860:     .reduce((s,e) => s + (Number(e.monto) || parsePrecio(e.monto)), 0);
13861:   const ganancia = ingresosCobrados - egresosMes;
13862:   const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;
13863:   const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;
13864:   const faltante = Math.max(0, metaMensual - ingresosCobrados);
13865: 
13866:   const pacienteMes = {};
13867:   citasMesActivas.forEach(c => { if (c.nombre) pacienteMes[String(c.nombre).trim().toLowerCase()] = c.nombre; });
13868:   let personasNuevas = 0;
13869:   let personasRecurrentes = 0;
13870:   Object.keys(pacienteMes).forEach(key => {
13871:     const tuvoAntes = citasAll.some(c => String(c.nombre || '').trim().toLowerCase() === key && normDate(c.fecha || '') < monthKey + '-01' && !String(c.estado || '').toLowerCase().includes('cancel'));
13872:     if (tuvoAntes) personasRecurrentes++; else personasNuevas++;
13873:   });
13874: 
```

### Línea 14289

```html
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
```

### Línea 14291

```html
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
```

### Línea 14529

```html
14517:   const SC = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
14518: 
14519:   // ── Recomendaciones ──
14520:   const mejoras = [];
14521: 
14522:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14523:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14524: 
14525:   if (totalSesiones < metaSesionesMes) {
14526:     const falta = metaSesionesMes-totalSesiones;
14527:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14528:   }
14529:   if (ventasCobradas < META_VENTAS_MES) {
14530:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14531:   }
14532:   if (fullCnt > expressCnt && fullCnt>0) {
14533:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14534:   }
14535:   if (tasaConv!==null && tasaConv<25) {
14536:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14537:   }
14538:   if (tasaCancel>META_CANCELACION_PCT) {
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
```

### Línea 14530

```html
14518: 
14519:   // ── Recomendaciones ──
14520:   const mejoras = [];
14521: 
14522:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14523:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14524: 
14525:   if (totalSesiones < metaSesionesMes) {
14526:     const falta = metaSesionesMes-totalSesiones;
14527:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14528:   }
14529:   if (ventasCobradas < META_VENTAS_MES) {
14530:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14531:   }
14532:   if (fullCnt > expressCnt && fullCnt>0) {
14533:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14534:   }
14535:   if (tasaConv!==null && tasaConv<25) {
14536:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14537:   }
14538:   if (tasaCancel>META_CANCELACION_PCT) {
14539:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14540:   }
14541:   if (noShowsMes.length>0) {
14542:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
```

### Línea 14576

```html
14564:   const filaC = (label, key, val) =>
14565:     `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14566:       <span style="font-size:.82rem;color:var(--text);flex:1">${label}</span>
14567:       <div style="width:130px;flex-shrink:0">${fci(key, val)}</div>
14568:     </div>`;
14569: 
14570:   let html = '';
14571: 
14572:   // ══════════════════════════════════════════
14573:   // 1 · RESUMEN EJECUTIVO
14574:   // ══════════════════════════════════════════
14575:   const kpisOk   = [
14576:     ventasCobradas >= META_VENTAS_MES,
14577:     totalSesiones  >= metaSesionesMes,
14578:     tasaCancel     <= META_CANCELACION_PCT,
14579:     tasaRet        >= META_RETENCION_PCT,
14580:     npsVal         >= META_NPS,
14581:   ].filter(Boolean).length;
14582:   const totalKpis = 5;
14583:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14584:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14585:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14586:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14587: 
14588:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
```

### Línea 14621

```html
14609:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${pacUnicosMes}</div>
14610:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">PACIENTES</div>
14611:         </div>
14612:       </div>
14613:     </div>
14614:   </div>`;
14615: 
14616:   // ══════════════════════════════════════════
14617:   // 2 · P&L — ESTADO FINANCIERO
14618:   // ══════════════════════════════════════════
14619:   html += _secTitle('💰','Estado Financiero del Mes');
14620: 
14621:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14622:   const barW    = Math.min(pctMeta, 100);
14623:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14624: 
14625:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14626:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14627:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14628:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14629:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14630:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14631:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14632:       <div style="margin-top:10px">
14633:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
```

### Línea 14631

```html
14619:   html += _secTitle('💰','Estado Financiero del Mes');
14620: 
14621:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14622:   const barW    = Math.min(pctMeta, 100);
14623:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14624: 
14625:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14626:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14627:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14628:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14629:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14630:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14631:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14632:       <div style="margin-top:10px">
14633:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
14634:           <span>Avance vs meta</span><span style="color:${barCol};font-weight:700">${pctMeta}%</span>
14635:         </div>
14636:         <div style="height:8px;background:var(--s3);border-radius:99px;overflow:hidden">
14637:           <div style="height:100%;width:${barW}%;background:${barCol};border-radius:99px;transition:width .3s"></div>
14638:         </div>
14639:       </div>
14640:     </div>
14641:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14642:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Costos reales vs estructura</div>
14643:       ${_rFila('Subtotal costos estimados', fmtPeso(calc.subtotal))}
```

### Línea 14967

```html
14955:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14956:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14957:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14958:   html += `</div>`;
14959: 
14960:   // ══════════════════════════════════════════
14961:   // 8 · SEMÁFORO COMPLETO DE KPIs
14962:   // ══════════════════════════════════════════
14963:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14964:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14965:   const rows = [
14966:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14967:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14968:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14969:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14970:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14971:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14972:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14973:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14974:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14975:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14976:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14977:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14978:   ];
14979:   rows.forEach(([icon,label,val,c,sub]) => {
```

### Línea 15679

```html
15667:       </div>
15668:     </div>
15669:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15670: 
15671:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15672:   const _sess1Meta  = esMesActual
15673:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15674:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15675:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15676:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15677:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15678:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15679:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15680:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15681:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15682:     : `>${META_ENCUESTAS}%`;
15683:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15684:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15685:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15686:     : `>${META_NPS}`;
15687:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15688:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15689:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15690:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15691:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
```

### Línea 15726

```html
15714:     .map(p => p.nombre).sort();
15715: 
15716:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15717:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15718:   // Cálculo: sesiones diarias necesarias para cumplir meta
15719:   if (esMesActual) {
15720:     const diasEnMes = new Date(y, m, 0).getDate();
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15723:       const dow = new Date(y, m - 1, d).getDay();
15724:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15725:     }
15726:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15727:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15728:     const avgPrecio     = citasMesHechas.length > 0
15729:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15730:       : (getKPIConfig().precio_full || 80000);
15731:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15732:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15733:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15734:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15735:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15736:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15737:     const textoBanner        = metaYaCumplida
15738:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
```

### Línea 15733

```html
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15723:       const dow = new Date(y, m - 1, d).getDay();
15724:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15725:     }
15726:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15727:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15728:     const avgPrecio     = citasMesHechas.length > 0
15729:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15730:       : (getKPIConfig().precio_full || 80000);
15731:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15732:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15733:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15734:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15735:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15736:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15737:     const textoBanner        = metaYaCumplida
15738:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15739:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15740:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15741:       ${iconoBanner} ${textoBanner}
15742:     </div>`;
15743:   }
15744: 
15745:   if (!esMesActual) {
```

### Línea 15738

```html
15726:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15727:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15728:     const avgPrecio     = citasMesHechas.length > 0
15729:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15730:       : (getKPIConfig().precio_full || 80000);
15731:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15732:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15733:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15734:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15735:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15736:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15737:     const textoBanner        = metaYaCumplida
15738:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15739:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15740:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15741:       ${iconoBanner} ${textoBanner}
15742:     </div>`;
15743:   }
15744: 
15745:   if (!esMesActual) {
15746:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15747:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15748:     </div>`;
15749:   }
15750: 
```

### Línea 15775

```html
15763:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15764:     </div>
15765:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15766:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15767:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15768:         ⚙️ Editar valores de referencia
15769:       </button>
15770:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15771:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15772:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15773:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15774:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15775:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15776:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15777:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15778:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15779:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15780:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15781:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15782:         </div>
15783:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15784:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15785:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15786:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15787:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
```

### Línea 15813

```html
15801:       </div>
15802:     </div>
15803:   </div>`;
15804: 
15805:   // Exportar datos para el Manual de Emergencia
15806:   window._emKPIData = {
15807:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15808:     fullPct:       fullPct,           totalMix:      totalMix,
15809:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15810:     leadsShow:     leadsShow || 0,
15811:     tasaConv:      tasaConv,
15812:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15813:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15814:     nps:           isNaN(nps)       ? 0 : nps,
15815:     npsMeta:       META_NPS,
15816:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15817:     encMeta:       META_ENCUESTAS,
15818:     bd:            isNaN(bd)        ? 0 : bd,
15819:   };
15820: 
15821:   el.innerHTML = html;
15822:   applyKPIFavorites();
15823:   applyKPIRefSpans();
15824:   _renderCancelBreakdown();
15825:   _renderBDBreakdown();
```

### Línea 16124

```html
16112: function applyKPIRefSpans() {
16113:   const cfg = getKPIConfig();
16114:   const fmt = v => v >= 1000 ? '$' + Number(v).toLocaleString('es-CO') : String(v);
16115:   const map = {
16116:     inv_mkt_total:     fmt(cfg.inv_mkt_total),
16117:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16118:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16119:     precio_full:       fmt(cfg.precio_full),
16120:     duracion_full:     String(cfg.duracion_full),
16121:     precio_express:    fmt(cfg.precio_express),
16122:     duracion_express:  String(cfg.duracion_express),
16123:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16124:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16125:     meta_leads_min:    String(cfg.meta_leads_min),
16126:     meta_leads_max:    String(cfg.meta_leads_max),
16127:     meta_conv_min:     String(cfg.meta_conv_min),
16128:     meta_conv_max:     String(cfg.meta_conv_max),
16129:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16130:   };
16131:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16132:     const v = map[el.dataset.ref];
16133:     if (v !== undefined) el.textContent = v;
16134:   });
16135: }
16136: 
```

### Línea 16129

```html
16117:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16118:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16119:     precio_full:       fmt(cfg.precio_full),
16120:     duracion_full:     String(cfg.duracion_full),
16121:     precio_express:    fmt(cfg.precio_express),
16122:     duracion_express:  String(cfg.duracion_express),
16123:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16124:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16125:     meta_leads_min:    String(cfg.meta_leads_min),
16126:     meta_leads_max:    String(cfg.meta_leads_max),
16127:     meta_conv_min:     String(cfg.meta_conv_min),
16128:     meta_conv_max:     String(cfg.meta_conv_max),
16129:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16130:   };
16131:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16132:     const v = map[el.dataset.ref];
16133:     if (v !== undefined) el.textContent = v;
16134:   });
16135: }
16136: 
16137: function renderPresupuestoMetas() {
16138:   const el = document.getElementById('presupuestoBody');
16139:   if (!el) return;
16140:   const costos = getCostosEstructura();
16141:   const calc   = calcTotalCostos(costos);
```

### Línea 16248

```html
16236:           💾 Guardar presupuesto y actualizar metas
16237:         </button>
16238: 
16239:       </div>
16240: 
16241:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16242:       <div style="display:flex;flex-direction:column;gap:16px">
16243: 
16244:         <div class="card">
16245:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16246:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16247:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16248:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16249:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16250:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16251:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16252:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16253:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16254:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16255:           </div>
16256:         </div>
16257: 
16258:         <div class="card">
16259:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16260:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
```

### Línea 16364

```html
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
```

### Línea 16366

```html
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
```

### Línea 16367

```html
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
```

### Línea 16368

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
16377:   renderPresupuestoMetas();
16378: }
16379: 
16380: function pmGuardarKPIs() {
```

### Línea 16370

```html
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
```

### Línea 16385

```html
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
```

### Línea 16430

```html
16418:   cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
16419:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16420:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16421:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16422:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16423:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16424:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16425:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16426:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16427:   // Mantener precio_full apuntando a Completa
16428:   cfg.precio_full           = cfg.sv_completa_p;
16429:   kvSet('kpiConfig', JSON.stringify(cfg));
16430:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16431:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16432:   // Actualizar autoFillPrice con los nuevos precios
16433:   _syncPreciosToAutoFill(cfg);
16434:   reloadMetas();
16435:   applyKPIRefSpans();
16436:   actualizarMetaBarra(calcCobradoMes());
16437:   toast('✅ Precios y metas guardados', 'ok');
16438:   renderPresupuestoMetas();
16439: }
16440: 
16441: function _syncPreciosToAutoFill(cfg) {
16442:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
```

### Línea 16431

```html
16419:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16420:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16421:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16422:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16423:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16424:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16425:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16426:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16427:   // Mantener precio_full apuntando a Completa
16428:   cfg.precio_full           = cfg.sv_completa_p;
16429:   kvSet('kpiConfig', JSON.stringify(cfg));
16430:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16431:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16432:   // Actualizar autoFillPrice con los nuevos precios
16433:   _syncPreciosToAutoFill(cfg);
16434:   reloadMetas();
16435:   applyKPIRefSpans();
16436:   actualizarMetaBarra(calcCobradoMes());
16437:   toast('✅ Precios y metas guardados', 'ok');
16438:   renderPresupuestoMetas();
16439: }
16440: 
16441: function _syncPreciosToAutoFill(cfg) {
16442:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
16443:   window._preciosOverride = {
```

### Línea 16469

```html
16457:     'Plan Pro':                             { Presencial: '$'+Number(cfg.sv_planPro_p||230000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_planPro_d||275000).toLocaleString('es-CO') },
16458:   };
16459: }
16460: 
16461: function guardarKPIConfig() {
16462:   const get = key => {
16463:     const el = document.getElementById('kcfg_' + key);
16464:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16465:   };
16466:   const prev = getKPIConfig();
16467:   const updated = {
16468:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16469:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16470:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16471:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16472:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16473:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16474:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16475:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16476:     meta_cancelacion:     prev.meta_cancelacion,
16477:     meta_retencion:       prev.meta_retencion,
16478:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16479:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16480:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16481:     precio_full:          get('precio_full')          ?? prev.precio_full,
```
