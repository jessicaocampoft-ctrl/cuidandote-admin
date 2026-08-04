# Contexto exacto para fase 4

Archivo: `index.html`

## Encuestas y NPS

### Línea 3807

```html
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
```

### Línea 3808

```html
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
```

### Línea 3809

```html
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
```

### Línea 3812

```html
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
```

### Línea 3813

```html
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
```

### Línea 3814

```html
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
```

### Línea 3822

```html
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
```

### Línea 4349

```html
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
```

### Línea 4350

```html
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
```

### Línea 4352

```html
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
```

### Línea 4357

```html
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
```

### Línea 4361

```html
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
```

### Línea 4363

```html
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
```

### Línea 4364

```html
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
```

### Línea 4365

```html
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
```

### Línea 4378

```html
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
4381:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4382:           <div class="gk-kpi-toggle">▼</div>
4383:         </div>
4384:         <div class="gk-kpi-body">
4385:           <h5>Utilidad</h5>
4386:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4387:           <h5>Importancia</h5>
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
```

### Línea 4381

```html
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
4381:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4382:           <div class="gk-kpi-toggle">▼</div>
4383:         </div>
4384:         <div class="gk-kpi-body">
4385:           <h5>Utilidad</h5>
4386:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4387:           <h5>Importancia</h5>
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4391:           <h5>Cómo se clasifican las respuestas</h5>
4392:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4393: Nota 4       →  PASIVOS      — Les da igual
```

### Línea 4388

```html
4376:         <div class="gk-kpi-header">
4377:           <div class="gk-kpi-left">
4378:             <div class="gk-kpi-name">KPI 7 — Net Promoter Score (NPS)</div>
4379:             <div class="gk-kpi-summary">Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos.</div>
4380:           </div>
4381:           <div class="gk-kpi-meta">Meta: &gt;<span class="kpi-ref" data-ref="meta_nps">90</span>%</div>
4382:           <div class="gk-kpi-toggle">▼</div>
4383:         </div>
4384:         <div class="gk-kpi-body">
4385:           <h5>Utilidad</h5>
4386:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4387:           <h5>Importancia</h5>
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4391:           <h5>Cómo se clasifican las respuestas</h5>
4392:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4393: Nota 4       →  PASIVOS      — Les da igual
4394: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4395:           <h5>Fórmula de cálculo</h5>
4396:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
```

### Línea 4396

```html
4384:         <div class="gk-kpi-body">
4385:           <h5>Utilidad</h5>
4386:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4387:           <h5>Importancia</h5>
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4391:           <h5>Cómo se clasifican las respuestas</h5>
4392:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4393: Nota 4       →  PASIVOS      — Les da igual
4394: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4395:           <h5>Fórmula de cálculo</h5>
4396:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4401:           <h5>Ejemplo</h5>
4402:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4403: • Promotores:   92%
4404: • Pasivos:       6% (NO suman)
4405: • Detractores:   2%
4406: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4407:           <h5>Cómo se lee</h5>
4408:           <div class="gk-semaforo">
```

### Línea 4398

```html
4386:           <p>Mide la lealtad de tus pacientes y la probabilidad de que te recomienden con otros deportistas o médicos cirujanos.</p>
4387:           <h5>Importancia</h5>
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4391:           <h5>Cómo se clasifican las respuestas</h5>
4392:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4393: Nota 4       →  PASIVOS      — Les da igual
4394: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4395:           <h5>Fórmula de cálculo</h5>
4396:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4401:           <h5>Ejemplo</h5>
4402:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4403: • Promotores:   92%
4404: • Pasivos:       6% (NO suman)
4405: • Detractores:   2%
4406: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4407:           <h5>Cómo se lee</h5>
4408:           <div class="gk-semaforo">
4409:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4410:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
```

### Línea 4400

```html
4388:           <p>Un NPS alto <strong>disminuye tu necesidad de gastar en pauta</strong>, porque el "boca a boca" llena la agenda. Es el indicador más rentable del negocio.</p>
4389:           <h5>Fórmula — la única pregunta (escala 0 a 5)</h5>
4390:           <div class="gk-ejemplo"><em>"En una escala del 0 al 5, ¿qué tan probable es que nos recomiendes con un amigo o familiar?"</em></div>
4391:           <h5>Cómo se clasifican las respuestas</h5>
4392:           <div class="gk-formula">Nota 5       →  PROMOTORES   — Aman tu servicio
4393: Nota 4       →  PASIVOS      — Les da igual
4394: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4395:           <h5>Fórmula de cálculo</h5>
4396:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4401:           <h5>Ejemplo</h5>
4402:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4403: • Promotores:   92%
4404: • Pasivos:       6% (NO suman)
4405: • Detractores:   2%
4406: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4407:           <h5>Cómo se lee</h5>
4408:           <div class="gk-semaforo">
4409:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4410:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4411:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4412:           </div>
```

### Línea 4406

```html
4394: Notas 0–3    →  DETRACTORES  — Tuvieron una mala experiencia</div>
4395:           <h5>Fórmula de cálculo</h5>
4396:           <div class="gk-formula">NPS = % de Promotores − % de Detractores</div>
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4401:           <h5>Ejemplo</h5>
4402:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4403: • Promotores:   92%
4404: • Pasivos:       6% (NO suman)
4405: • Detractores:   2%
4406: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4407:           <h5>Cómo se lee</h5>
4408:           <div class="gk-semaforo">
4409:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4410:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4411:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4412:           </div>
4413:           <h5>Acción inmediata con detractores</h5>
4414:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4415:         </div>
4416:       </div>
4417: 
4418:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
```

### Línea 4409

```html
4397:           <h5>Explicación</h5>
4398:           <p>Al buscar un NPS mayor al <strong><span class="kpi-ref" data-ref="meta_nps">90</span>%</strong>, necesitas que casi la totalidad de tus pacientes califiquen con <strong>5</strong>. Si un paciente te pone 4, <strong>financieramente cuenta como cero</strong> — está satisfecho pero no refiere a nadie.</p>
4399:           <h5>Lo más importante de entender</h5>
4400:           <p>Los <strong>Pasivos (nota 4) NO suman al NPS</strong>. Solo se restan detractores de promotores. Un 4 cuenta como cero.</p>
4401:           <h5>Ejemplo</h5>
4402:           <div class="gk-ejemplo">50 respuestas: 46 dieron 5, 3 dieron 4, 1 dio 1–3.
4403: • Promotores:   92%
4404: • Pasivos:       6% (NO suman)
4405: • Detractores:   2%
4406: <strong>NPS = 92 − 2 = 90</strong> → 🟢 Meta alcanzada</div>
4407:           <h5>Cómo se lee</h5>
4408:           <div class="gk-semaforo">
4409:             <div class="gk-sem-item verde">🟢 ≥<span class="kpi-ref" data-ref="meta_nps">90</span> — Excelente, el boca a boca trabaja por ti</div>
4410:             <div class="gk-sem-item amarillo">🟡 70–89 — Bueno, pero aún hay detractores o pasivos</div>
4411:             <div class="gk-sem-item rojo">🔴 &lt;70 — Crítico, revisar experiencia del paciente</div>
4412:           </div>
4413:           <h5>Acción inmediata con detractores</h5>
4414:           <p>Si alguien califica 3 o menos: <strong>llamarlo en menos de 48 horas</strong>. No para discutir, para escuchar. Un detractor recuperado se vuelve promotor; uno ignorado habla mal con 10 personas más.</p>
4415:         </div>
4416:       </div>
4417: 
4418:       <div class="gk-kpi-card" id="gkKpi8" onclick="toggleKPICard(this); _renderBDBreakdown()">
4419:         <div class="gk-kpi-header">
4420:           <div class="gk-kpi-left">
4421:             <div class="gk-kpi-name">KPI 8 — Porcentaje de Actualización de la Base de Datos</div>
```

### Línea 4755

```html
4743:         </div>
4744:       </div>
4745: 
4746:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4747:       <div class="em-dim" id="emDim_4">
4748:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4749:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4750:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4751:           <span class="em-dim-arr" id="emDA_4">▼</span>
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
4759:               <span class="em-card-title">NPS &lt;70<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">escala calculada del formulario</small></span>
4760:               <span class="em-sev c">🔴 Crítico</span>
4761:               <span class="em-card-time">⏱ 48 h</span>
4762:               <span class="em-carr">▼</span>
4763:             </div>
4764:             <div class="em-card-body" id="emBody_nps">
4765:               <div class="em-symptom">💡 <strong>Pacientes insatisfechos.</strong> Un NPS bajo no es un problema de percepción — es un problema real de experiencia. Un detractor recuperado se convierte en promotor activo; uno ignorado habla mal con 10 personas en promedio. Actuar en menos de 48h es crítico porque la mala experiencia se consolida rápido en la memoria.</div>
4766:               <div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>
4767:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_nps" style="width:0%"></div></div>
```

### Línea 4756

```html
4744:       </div>
4745: 
4746:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4747:       <div class="em-dim" id="emDim_4">
4748:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4749:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4750:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4751:           <span class="em-dim-arr" id="emDA_4">▼</span>
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4757

```html
4745: 
4746:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4747:       <div class="em-dim" id="emDim_4">
4748:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4749:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4750:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4751:           <span class="em-dim-arr" id="emDA_4">▼</span>
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4758

```html
4746:       <!-- ══ DIMENSIÓN 4: Calidad ══ -->
4747:       <div class="em-dim" id="emDim_4">
4748:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4749:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4750:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4751:           <span class="em-dim-arr" id="emDA_4">▼</span>
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4759

```html
4747:       <div class="em-dim" id="emDim_4">
4748:         <div class="em-dim-hdr d4" onclick="toggleEmDim(4)">
4749:           <span class="em-dim-label">🟪 Dimensión 4 — Calidad y Retención</span>
4750:           <span class="em-dim-badge neutral" id="emDB_4">—</span>
4751:           <span class="em-dim-arr" id="emDA_4">▼</span>
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4764

```html
4752:         </div>
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4765

```html
4753:         <div class="em-dim-body" id="emDB_body_4">
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4766

```html
4754: 
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
```

### Línea 4767

```html
4755:           <!-- KPI: NPS -->
4756:           <div class="em-card" id="emCard_nps">
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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

### Línea 4769

```html
4757:             <div class="em-card-hdr" onclick="toggleEmCard('nps')">
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
4780:             </div>
4781:           </div>
```

### Línea 4770

```html
4758:               <div class="em-dot gris" id="emDot_nps"></div>
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
4780:             </div>
4781:           </div>
4782: 
```

### Línea 4771

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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
```

### Línea 4772

```html
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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
```

### Línea 4773

```html
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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
```

### Línea 4774

```html
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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
```

### Línea 4777

```html
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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
4787:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
```

### Línea 4778

```html
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
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
4787:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
4790:               <span class="em-carr">▼</span>
```

### Línea 4783

```html
4771:                 <label class="em-step" id="emS_nps_2" onclick="handleEmStep(event,'nps',2)"><input type="checkbox" id="emCk_nps_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer sesión de compensación sin condiciones:</strong> al final de la llamada, si la queja es válida, ofrecer una sesión gratuita o con descuento significativo. No pedirle que cambie la nota — solo demostrar que la calidad importa. Muchos detractores se convierten en los pacientes más leales después de una recuperación bien manejada.</span></label>
4772:                 <label class="em-step" id="emS_nps_3" onclick="handleEmStep(event,'nps',3)"><input type="checkbox" id="emCk_nps_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Analizar el patrón de quejas:</strong> ¿todos los detractores tuvieron el mismo servicio? ¿El mismo día de la semana? ¿Coinciden en horario o auxiliar? Si hay un patrón claro, el problema es sistémico — no individual. Corregirlo en el proceso, no culpar a casos aislados.</span></label>
4773:                 <label class="em-step" id="emS_nps_4" onclick="handleEmStep(event,'nps',4)"><input type="checkbox" id="emCk_nps_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Revisar si los pasivos (nota 4) se pueden convertir:</strong> los pasivos no bajan el NPS pero tampoco lo suben. Contactarlos con: <em>"Hola [nombre], gracias por tu evaluación. ¿Hay algo específico que podríamos mejorar para que tu próxima experiencia sea perfecta?"</em> El que responde con una sugerencia ya está comprometido.</span></label>
4774:                 <label class="em-step" id="emS_nps_5" onclick="handleEmStep(event,'nps',5)"><input type="checkbox" id="emCk_nps_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Plan de mejora documentado:</strong> registrar en una nota los cambios concretos que se van a hacer (protocolo de bienvenida, comunicación de precios, tiempo de espera, etc.) y revisarlos al mes siguiente. Sin documentar, el problema se repite.</span></label>
4775:               </div>
4776:               <div class="em-card-footer">
4777:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4778:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4779:               </div>
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
4787:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
4790:               <span class="em-carr">▼</span>
4791:             </div>
4792:             <div class="em-card-body" id="emBody_enc">
4793:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4794:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4795:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
```

### Línea 4787

```html
4775:               </div>
4776:               <div class="em-card-footer">
4777:                 <button class="em-done-btn" id="emDB_nps" onclick="markEmDone('nps',6)">✓ Plan ejecutado</button>
4778:                 <button class="em-reset-btn" onclick="resetEmSteps('nps',6)">↺ Reiniciar</button>
4779:               </div>
4780:             </div>
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
4787:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
4790:               <span class="em-carr">▼</span>
4791:             </div>
4792:             <div class="em-card-body" id="emBody_enc">
4793:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4794:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4795:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4796:               <div class="em-steps">
4797:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4798:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4799:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
```

### Línea 4793

```html
4781:           </div>
4782: 
4783:           <!-- KPI: Encuestas -->
4784:           <div class="em-card" id="emCard_enc">
4785:             <div class="em-card-hdr" onclick="toggleEmCard('enc')">
4786:               <div class="em-dot gris" id="emDot_enc"></div>
4787:               <span class="em-card-title">Encuestas realizadas &lt;50%</span>
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
4790:               <span class="em-carr">▼</span>
4791:             </div>
4792:             <div class="em-card-body" id="emBody_enc">
4793:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4794:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4795:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4796:               <div class="em-steps">
4797:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4798:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4799:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4800:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4801:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4802:               </div>
4803:               <div class="em-card-footer">
4804:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4805:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
```

### Línea 4800

```html
4788:               <span class="em-sev m">🔵 Monitorear</span>
4789:               <span class="em-card-time">⏱ 15 min</span>
4790:               <span class="em-carr">▼</span>
4791:             </div>
4792:             <div class="em-card-body" id="emBody_enc">
4793:               <div class="em-symptom">💡 <strong>NPS sesgado — sin datos confiables.</strong> Si solo el 30% de los pacientes responde, el NPS refleja solo a los más motivados (generalmente los satisfechos). La meta mínima es 70%: 7 de cada 10 deben contestar para que el número sea estadísticamente válido. El problema casi siempre está en <em>cuándo</em> y <em>cómo</em> se pide la encuesta.</div>
4794:               <div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>
4795:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_enc" style="width:0%"></div></div>
4796:               <div class="em-steps">
4797:                 <label class="em-step" id="emS_enc_0" onclick="handleEmStep(event,'enc',0)"><input type="checkbox" id="emCk_enc_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Cambiar el momento del envío:</strong> el mejor momento es justo cuando el paciente sale — mientras aún está físicamente en la clínica o en el carro de regreso. La tasa de respuesta cae a la mitad si se manda al día siguiente. Regla: encuesta antes de las 2 horas post-sesión.</span></label>
4798:                 <label class="em-step" id="emS_enc_1" onclick="handleEmStep(event,'enc',1)"><input type="checkbox" id="emCk_enc_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Personalizar el mensaje de envío:</strong> no mandar solo el link — agregar contexto. Guión: <em>"Hola [nombre]! Un gusto haberte atendido hoy 🙌 Tu opinión nos ayuda a mejorar — ¿puedes tomarte 30 segundos para responder estas 3 preguntas? [link]"</em>. El 30 segundos reduce la resistencia a responder.</span></label>
4799:                 <label class="em-step" id="emS_enc_2" onclick="handleEmStep(event,'enc',2)"><input type="checkbox" id="emCk_enc_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Recordatorio al tercer día si no respondió:</strong> un único recordatorio — no más. Guión: <em>"Hola [nombre], te quedó pendiente la encuesta de satisfacción. Son solo 3 preguntas 😊 [link]"</em>. Después del tercer día la tasa de respuesta cae a menos del 5%, no vale la pena insistir.</span></label>
4800:                 <label class="em-step" id="emS_enc_3" onclick="handleEmStep(event,'enc',3)"><input type="checkbox" id="emCk_enc_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Verificar que la auxiliar lo está ejecutando:</strong> revisar la última semana — ¿cuántas citas hubo y cuántas encuestas se enviaron? Si la diferencia es grande, el problema es operativo, no de diseño. Agregar el envío de encuesta como paso fijo en el checklist post-cita.</span></label>
4801:                 <label class="em-step" id="emS_enc_4" onclick="handleEmStep(event,'enc',4)"><input type="checkbox" id="emCk_enc_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer incentivo de participación:</strong> comunicar a los pacientes que sus respuestas generan mejoras reales en el servicio — los pacientes responden más cuando sienten que su opinión cambia algo. También se puede agregar al final del formulario: "Al completar esta encuesta entras en el sorteo mensual de una sesión gratuita."</span></label>
4802:               </div>
4803:               <div class="em-card-footer">
4804:                 <button class="em-done-btn" id="emDB_enc" onclick="markEmDone('enc',5)">✓ Plan ejecutado</button>
4805:                 <button class="em-reset-btn" onclick="resetEmSteps('enc',5)">↺ Reiniciar</button>
4806:               </div>
4807:             </div>
4808:           </div>
4809: 
4810:           <!-- KPI: BD actualizada -->
4811:           <div class="em-card" id="emCard_bd">
4812:             <div class="em-card-hdr" onclick="toggleEmCard('bd')">
```

### Línea 4948

```html
4936:             <input type="checkbox" id="rck_s7" onchange="toggleRutinaCheck('s7')">
4937:             <span>Iniciar campaña de recuperación de pacientes inactivos — enviar mensaje personalizado a los que no han vuelto en 30+ días</span>
4938:           </label>
4939:         </div>
4940: 
4941:         <div class="gk-rutina-grupo">
4942:           <div class="gk-rutina-titulo" style="display:flex;justify-content:space-between;align-items:center">
4943:             <span>🗓️ MENSUAL (1 hora el primer lunes del mes)</span>
4944:             <button onclick="resetRutinaGrupo('m')" style="font-size:.68rem;padding:3px 10px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:6px;cursor:pointer;font-family:var(--font-b)">↺ Reiniciar</button>
4945:           </div>
4946:           <label class="gk-check-item" onclick="toggleRutinaCheck('m1')">
4947:             <input type="checkbox" id="rck_m1" onchange="toggleRutinaCheck('m1')">
4948:             <span>Presionar <strong>🔄 Cargar encuestas</strong> para calcular NPS y % de respuestas automáticamente</span>
4949:           </label>
4950: 
4951:           <label class="gk-check-item" onclick="toggleRutinaCheck('m3')">
4952:             <input type="checkbox" id="rck_m3" onchange="toggleRutinaCheck('m3')">
4953:             <span>Revisar mix de servicios del mes — ¿la Descarga Full superó el 30%?</span>
4954:           </label>
4955:           <label class="gk-check-item" onclick="toggleRutinaCheck('m4')">
4956:             <input type="checkbox" id="rck_m4" onchange="toggleRutinaCheck('m4')">
4957:             <span>Comparar ingresos del mes vs mes anterior en la gráfica de Finanzas</span>
4958:           </label>
4959:           <label class="gk-check-item" onclick="toggleRutinaCheck('m5')">
4960:             <input type="checkbox" id="rck_m5" onchange="toggleRutinaCheck('m5')">
```

### Línea 5405

```html
5393:         <div class="co-sep"></div>
5394:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Creador de Contenido</div>
5395:         <div class="co-cfg-grid">
5396:           <div><label class="co-inp-label">Bono total contenido (si cumple meta)</label><input class="co-inp" id="cfg_bono_contenido" type="number" placeholder="50000"></div>
5397:           <div><label class="co-inp-label">% del bono que va a la Auxiliar</label><input class="co-inp" id="cfg_contenido_split_aux" type="number" placeholder="50"></div>
5398:           <div><label class="co-inp-label">Nombre de la persona del video</label><input class="co-inp" id="cfg_contenido_persona" type="text" placeholder="Nombre"></div>
5399:           <div><label class="co-inp-label">Meta mínima de leads para ganar el bono</label><input class="co-inp" id="cfg_contenido_leads_meta" type="number" placeholder="5"></div>
5400:         </div>
5401: 
5402:         <div class="co-sep"></div>
5403:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Todo el Equipo</div>
5404:         <div class="co-cfg-grid">
5405:           <div><label class="co-inp-label">Meta de calidad del servicio (NPS %)</label><input class="co-inp" id="cfg_equipo_nps_meta" type="number" placeholder="90"></div>
5406:         </div>
5407: 
5408:         <button onclick="saveComisConfig()" style="padding:8px 20px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem">Guardar configuración</button>
5409:         <span id="coConfigMsg" style="font-size:.75rem;color:var(--ok);margin-left:10px;display:none">✓ Guardado</span>
5410:       </div>
5411: 
5412:       <!-- Tarjetas principales (2-columnas) -->
5413:       <div class="co-grid" id="coCards">
5414:         <div style="color:var(--muted);font-size:.9rem;padding:40px 0;text-align:center;grid-column:1/-1">Cargando comisiones...</div>
5415:       </div>
5416: 
5417:       <!-- Creador de Contenido (ancho completo) -->
```

### Línea 5500

```html
5488:         </div>
5489:         <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:14px">
5490:           <div>
5491:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Nombre del paciente *</label>
5492:             <input id="recInpPaciente" type="text" placeholder="Ej: María López" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5493:           </div>
5494:           <div>
5495:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Fecha de la cita recuperada *</label>
5496:             <input id="recInpFecha" type="date" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none">
5497:           </div>
5498:           <div>
5499:             <label style="font-size:.74rem;color:var(--muted);font-family:var(--font-m);display:block;margin-bottom:4px">Servicio *</label>
5500:             <select id="recInpServicio" style="width:100%;box-sizing:border-box;padding:9px 12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.85rem;outline:none;cursor:pointer">
5501:               <option value="">Seleccionar...</option>
5502:               <option value="Express Cuello">Express Cuello</option>
5503:               <option value="Express Piernas">Express Piernas</option>
5504:               <option value="Express Completa">Express Completa</option>
5505:               <option value="Full">Full (1.5h)</option>
5506:               <option value="Valoración">Valoración Postural</option>
5507:               <option value="Readaptación">Readaptación Funcional</option>
5508:               <option value="Pack 3 sesiones">Pack 3 sesiones</option>
5509:               <option value="Pack 6 sesiones">Pack 6 sesiones</option>
5510:               <option value="Pack 10 sesiones">Pack 10 sesiones</option>
5511:               <option value="Membresía">Membresía</option>
5512:               <option value="Otro">Otro</option>
```

### Línea 5579

```html
5567:       <div style="background:var(--s2);border:1px solid var(--border);border-radius:14px;margin-bottom:24px;overflow:hidden">
5568:         <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
5569:           <div>
5570:             <div style="font-family:var(--font-h);font-size:.95rem;font-weight:700">Campaña de Referidos del Mes</div>
5571:             <div style="font-size:.78rem;color:var(--muted);margin-top:2px">Pacientes que asistieron este mes · envíales su código de referido personalizado</div>
5572:           </div>
5573:           <button onclick="cargarCampañaReferidos()" style="padding:8px 16px;background:#8b5cf6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.83rem;display:flex;align-items:center;gap:6px">
5574:             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
5575:             Cargar pacientes del mes
5576:           </button>
5577:         </div>
5578:         <div style="padding:14px 16px;background:linear-gradient(135deg,#f5f3ff,#ede9fe20);border-bottom:1px solid var(--border);font-size:.82rem;color:var(--text);line-height:1.55">
5579:           <strong>¿Cómo funciona?</strong> Se listan los pacientes que vinieron este mes. Cada uno recibe un código REF único por WhatsApp. Cuando ese código lo usa un amigo al agendar, tú registras la referencia en la sección Códigos. Tu NPS de 100 significa que <strong>todos tus pacientes actuales son promotores potenciales</strong> — solo hay que activarlos.
5580:         </div>
5581:         <div id="refCampañaPanel" style="padding:20px">
5582:           <div style="text-align:center;color:var(--muted);padding:30px;font-size:.88rem">Haz clic en "Cargar pacientes del mes" para ver la lista</div>
5583:         </div>
5584:       </div>
5585: 
5586:     </section>
5587: 
5588:     <!-- ── MENSAJES PREDETERMINADOS ── -->
5589:     <section id="vMensajes" style="display:none">
5590:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
5591:         <div>
```

### Línea 7698

```html
7686:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7687:   </div>`;
7688:   document.body.appendChild(modal);
7689:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7690: }
7691: 
7692: const KPI_INTERACTIVE = {
7693:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7694:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7695:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7696:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7697:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7698:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7699:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7700:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7701:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7702:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7703: };
7704: let _activeKPIExplorer = null;
7705: 
7706: function _kpiSnapshot(m,y) {
7707:   const citas = citasReales();
7708:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7709:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7710:   const leads = getLeadsMes(m,y);
```

### Línea 7699

```html
7687:   </div>`;
7688:   document.body.appendChild(modal);
7689:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7690: }
7691: 
7692: const KPI_INTERACTIVE = {
7693:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7694:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7695:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7696:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7697:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7698:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7699:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7700:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7701:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7702:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7703: };
7704: let _activeKPIExplorer = null;
7705: 
7706: function _kpiSnapshot(m,y) {
7707:   const citas = citasReales();
7708:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7709:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7710:   const leads = getLeadsMes(m,y);
7711:   const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
```

### Línea 7731

```html
7719:     gkKpi1:mes.length,
7720:     gkKpi2:mes.length?Math.round(mixFull/mes.length*100):0,
7721:     gkKpi3:leads,
7722:     gkKpi4:leads?Math.round(mes.length/leads*100):null,
7723:     gkKpi5:calcCobradoMes(m,y),
7724:     gkKpi6:null,gkKpi7:null,
7725:     gkKpi8:bd?bd.pct:null,
7726:     gkKpi4b:todas.length?Math.round(cancel/todas.length*100):0,
7727:     gkKpi9:retTotal?Math.round(Object.values(cuenta).filter(n=>n>=2).length/retTotal*100):0
7728:   };
7729:   const saved = _kpiServerHistory[`${y}-${String(m).padStart(2,'0')}`];
7730:   if (saved) {
7731:     if (saved.nps !== null) snapshot.gkKpi7 = saved.nps;
7732:     if (saved.sessions) snapshot.gkKpi6 = Math.round((saved.surveyResponses||0) / saved.sessions * 100);
7733:   }
7734:   return snapshot;
7735: }
7736: 
7737: async function loadKPIHistoryFromServer() {
7738:   try {
7739:     const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7740:     if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
7741:   } catch(e) {}
7742: }
7743: 
```

### Línea 7849

```html
7837:         if (_f.desde   !== undefined) document.getElementById('fDesde').value   = _f.desde;
7838:         if (_f.hasta   !== undefined) document.getElementById('fHasta').value   = _f.hasta;
7839:       } catch(e) {}
7840:     }
7841:     renderAgenda();
7842:   }
7843:   if (v === 'bloquear')       renderBloqueos();
7844:   if (v === 'pacientes')      renderPacientes();
7845:   if (v === 'equipo')         { loadTeamData().then(renderEquipo); }
7846:   if (v === 'calendario')     renderCalendar();
7847:   if (v === 'recordatorios')  cargarRecordatorios();
7848:   if (v === 'basedatos')      { renderBasedatos(); initFormDB(); renderChangeLog(); renderReactivacion(); }
7849:   if (v === 'finanzas')       { renderFinanzas(); actualizarContadorLeads(); _renderEncuestaStatsUI(getEncuestaStats()); }
7850:   if (v === 'pagos')          { loadOperationsData().then(renderPagos); }
7851:   if (v === 'seguimiento')    renderSeguimiento();
7852:   if (v === 'tareas')         renderTareas();
7853:   if (v === 'tareasConfig')   initTareasConfig();
7854:   if (v === 'paquetes')       renderPaquetes();
7855:   if (v === 'mensajes')       renderMensajes();
7856:   if (v === 'empresas')       renderEmpresas();
7857:   if (v === 'codigos')        renderCodigos();
7858:   if (v === 'guiakpis')       { renderKPIGuia(); actualizarContadorLeads(); loadRutinaChecks(); loadKPIHistoryFromServer(); }
7859:   if (v === 'presupuesto')    { renderPresupuestoMetas(); }
7860:   if (v === 'comisiones')     renderComisiones();
7861:   if (v === 'recuperacion')   renderRecuperaciones();
```

### Línea 13329

```html
13317:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13318:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13319:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13320: }
13321: 
13322: const KPI_CONFIG_DEFAULTS = {
13323:   meta_sesiones_semana: 30,
13324:   meta_ventas_mes:      10265000,
13325:   meta_leads_min:       40,
13326:   meta_leads_max:       50,
13327:   meta_conv_min:        25,
13328:   meta_conv_max:        35,
13329:   meta_nps:             90,
13330:   meta_encuestas:       70,
13331:   meta_cancelacion:     10,
13332:   meta_retencion:       60,
13333:   inv_mkt_total:        340000,
13334:   inv_mkt_pauta:        100000,
13335:   inv_mkt_contenido:    240000,
13336:   precio_full:          110000,
13337:   duracion_full:        90,
13338:   precio_express:       75000,
13339:   duracion_express:     50,
13340:   // Precios por servicio (presencial / domicilio)
13341:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
```

### Línea 13330

```html
13318:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13319:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13320: }
13321: 
13322: const KPI_CONFIG_DEFAULTS = {
13323:   meta_sesiones_semana: 30,
13324:   meta_ventas_mes:      10265000,
13325:   meta_leads_min:       40,
13326:   meta_leads_max:       50,
13327:   meta_conv_min:        25,
13328:   meta_conv_max:        35,
13329:   meta_nps:             90,
13330:   meta_encuestas:       70,
13331:   meta_cancelacion:     10,
13332:   meta_retencion:       60,
13333:   inv_mkt_total:        340000,
13334:   inv_mkt_pauta:        100000,
13335:   inv_mkt_contenido:    240000,
13336:   precio_full:          110000,
13337:   duracion_full:        90,
13338:   precio_express:       75000,
13339:   duracion_express:     50,
13340:   // Precios por servicio (presencial / domicilio)
13341:   sv_cuello_p:     75000,  sv_cuello_d:      90000,
13342:   sv_piernas_p:    75000,  sv_piernas_d:     90000,
```

### Línea 13377

```html
13365:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13366:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13367:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13368:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13369:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13370: }
13371: 
13372: const _cfg0 = getKPIConfig();
13373: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13374: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13375: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13376: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13377: let META_NPS             = _cfg0.meta_nps;
13378: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13379: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13380: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13381: const META_CAC_MAX         = 80000;
13382: const VENTANA_NUEVO_DIAS   = 180;
13383: const VENTANA_RETENCION    = 60;
13384: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13385: 
13386: function calcBDActualizada(mesParam, anyoParam) {
13387:   const now = new Date();
13388:   const m = mesParam  || now.getMonth() + 1;
13389:   const y = anyoParam || now.getFullYear();
```

### Línea 13378

```html
13366:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13367:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13368:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13369:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13370: }
13371: 
13372: const _cfg0 = getKPIConfig();
13373: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13374: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13375: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13376: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13377: let META_NPS             = _cfg0.meta_nps;
13378: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13379: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13380: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13381: const META_CAC_MAX         = 80000;
13382: const VENTANA_NUEVO_DIAS   = 180;
13383: const VENTANA_RETENCION    = 60;
13384: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13385: 
13386: function calcBDActualizada(mesParam, anyoParam) {
13387:   const now = new Date();
13388:   const m = mesParam  || now.getMonth() + 1;
13389:   const y = anyoParam || now.getFullYear();
13390: 
```

### Línea 13435

```html
13423:     completos,
13424:     total:     pacs.length,
13425:     sinTel,
13426:     sinEmail,
13427:   };
13428: }
13429: 
13430: function reloadMetas() {
13431:   const cfg = getKPIConfig();
13432:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13433:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13434:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13435:   META_NPS             = cfg.meta_nps;
13436:   META_ENCUESTAS       = cfg.meta_encuestas;
13437:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13438:   META_RETENCION_PCT   = cfg.meta_retencion;
13439:   // Sincronizar precios de servicios siempre
13440:   _syncPreciosToAutoFill(cfg);
13441: }
13442: 
13443: function getKPIManual() {
13444:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13445: }
13446: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13447: 
```

### Línea 13436

```html
13424:     total:     pacs.length,
13425:     sinTel,
13426:     sinEmail,
13427:   };
13428: }
13429: 
13430: function reloadMetas() {
13431:   const cfg = getKPIConfig();
13432:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13433:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13434:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13435:   META_NPS             = cfg.meta_nps;
13436:   META_ENCUESTAS       = cfg.meta_encuestas;
13437:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13438:   META_RETENCION_PCT   = cfg.meta_retencion;
13439:   // Sincronizar precios de servicios siempre
13440:   _syncPreciosToAutoFill(cfg);
13441: }
13442: 
13443: function getKPIManual() {
13444:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13445: }
13446: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
13447: 
13448: // ═══════════════════════════════════════════════
```

### Línea 13574

```html
13562:   const elGHoy = document.getElementById('leadsHoyGuia');
13563:   const elGSem = document.getElementById('leadsSemGuia');
13564:   const elGMes = document.getElementById('leadsMesGuia');
13565:   if (elGHoy) elGHoy.textContent = hoy;
13566:   if (elGSem) elGSem.textContent = sem;
13567:   if (elGMes) elGMes.textContent = mes;
13568: }
13569: 
13570: function guardarKPIManual() {
13571:   const obj = {
13572:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13573:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13574:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13575:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13576:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13577:   };
13578:   saveKPIManual(obj);
13579:   toast('KPIs guardados', 'ok');
13580:   renderKPITablero();
13581: }
13582: 
13583: function renderKPITablero() {
13584:   const el = document.getElementById('kpiTableroResult');
13585:   if (!el) return;
13586: 
```

### Línea 13575

```html
13563:   const elGSem = document.getElementById('leadsSemGuia');
13564:   const elGMes = document.getElementById('leadsMesGuia');
13565:   if (elGHoy) elGHoy.textContent = hoy;
13566:   if (elGSem) elGSem.textContent = sem;
13567:   if (elGMes) elGMes.textContent = mes;
13568: }
13569: 
13570: function guardarKPIManual() {
13571:   const obj = {
13572:     leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
13573:     convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
13574:     nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
13575:     encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
13576:     bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
13577:   };
13578:   saveKPIManual(obj);
13579:   toast('KPIs guardados', 'ok');
13580:   renderKPITablero();
13581: }
13582: 
13583: function renderKPITablero() {
13584:   const el = document.getElementById('kpiTableroResult');
13585:   if (!el) return;
13586: 
13587:   // Cargar valores manuales guardados en inputs
```

### Línea 13592

```html
13580:   renderKPITablero();
13581: }
13582: 
13583: function renderKPITablero() {
13584:   const el = document.getElementById('kpiTableroResult');
13585:   if (!el) return;
13586: 
13587:   // Cargar valores manuales guardados en inputs
13588:   const manual = getKPIManual();
13589:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13590:   setVal('kpiLeads', manual.leads);
13591:   setVal('kpiConvertidos', manual.convertidos);
13592:   setVal('kpiNPS', manual.nps);
13593:   setVal('kpiEncuestas', manual.encuestas);
13594:   setVal('kpiBD', manual.bd);
13595: 
13596:   const now  = new Date();
13597:   const m    = now.getMonth()+1, y = now.getFullYear();
13598:   const citas = citasReales();
13599: 
13600:   // Calcular inicio semana actual (lunes)
13601:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13602:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13603:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13604:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
```

### Línea 13593

```html
13581: }
13582: 
13583: function renderKPITablero() {
13584:   const el = document.getElementById('kpiTableroResult');
13585:   if (!el) return;
13586: 
13587:   // Cargar valores manuales guardados en inputs
13588:   const manual = getKPIManual();
13589:   const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
13590:   setVal('kpiLeads', manual.leads);
13591:   setVal('kpiConvertidos', manual.convertidos);
13592:   setVal('kpiNPS', manual.nps);
13593:   setVal('kpiEncuestas', manual.encuestas);
13594:   setVal('kpiBD', manual.bd);
13595: 
13596:   const now  = new Date();
13597:   const m    = now.getMonth()+1, y = now.getFullYear();
13598:   const citas = citasReales();
13599: 
13600:   // Calcular inicio semana actual (lunes)
13601:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13602:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13603:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13604:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13605: 
```

### Línea 13686

```html
13674:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13675:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13676: 
13677:   if (tasa !== null) {
13678:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
```

### Línea 13687

```html
13675:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13676: 
13677:   if (tasa !== null) {
13678:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
```

### Línea 13688

```html
13676: 
13677:   if (tasa !== null) {
13678:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
13700:   const canalMap = {};
```

### Línea 13689

```html
13677:   if (tasa !== null) {
13678:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
13700:   const canalMap = {};
13701:   citas.filter(c => {
```

### Línea 13691

```html
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
13700:   const canalMap = {};
13701:   citas.filter(c => {
13702:     const [cy,cm] = normDate(c.fecha).split('-');
13703:     const estado = (c.estado || '').toLowerCase();
```

### Línea 13692

```html
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
13700:   const canalMap = {};
13701:   citas.filter(c => {
13702:     const [cy,cm] = normDate(c.fecha).split('-');
13703:     const estado = (c.estado || '').toLowerCase();
13704:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
```

### Línea 13693

```html
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
13687:   const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
13688:   const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
13689:   const _npsMeta   = _encStats.promotores !== undefined
13690:     ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
13691:     : `>${META_NPS}%`;
13692:   html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
13693:   html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
13694:   const _bdAuto = calcBDActualizada();
13695:   const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
13696:   const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
13697:   html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);
13698: 
13699:   // ───── KPI: Ingreso por canal (mes actual) ─────
13700:   const canalMap = {};
13701:   citas.filter(c => {
13702:     const [cy,cm] = normDate(c.fecha).split('-');
13703:     const estado = (c.estado || '').toLowerCase();
13704:     return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
13705:   }).forEach(c => {
```

### Línea 14504

```html
14492:   const citasNuevasMes = citasMes.length;
14493:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14494: 
14495:   // Canal de captación
14496:   const canalMap = {};
14497:   const canalIngMap = {};
14498:   citasMes.forEach(c => {
14499:     const canal = c.canal||'Directo';
14500:     canalMap[canal] = (canalMap[canal]||0)+1;
14501:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14502:   });
14503: 
14504:   // ── NPS y encuestas ──
14505:   const encStats = getEncuestaStats();
14506:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14507:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14508: 
14509:   // ── BD ──
14510:   const bdAuto = calcBDActualizada();
14511:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14512: 
14513:   // ── CAC ──
14514:   const egresosMkt = egresosAll.filter(e =>
14515:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14516:   ).reduce((s,e)=>s+(e.monto||0), 0);
```

### Línea 14505

```html
14493:   const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;
14494: 
14495:   // Canal de captación
14496:   const canalMap = {};
14497:   const canalIngMap = {};
14498:   citasMes.forEach(c => {
14499:     const canal = c.canal||'Directo';
14500:     canalMap[canal] = (canalMap[canal]||0)+1;
14501:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14502:   });
14503: 
14504:   // ── NPS y encuestas ──
14505:   const encStats = getEncuestaStats();
14506:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14507:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14508: 
14509:   // ── BD ──
14510:   const bdAuto = calcBDActualizada();
14511:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14512: 
14513:   // ── CAC ──
14514:   const egresosMkt = egresosAll.filter(e =>
14515:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14516:   ).reduce((s,e)=>s+(e.monto||0), 0);
14517:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
```

### Línea 14506

```html
14494: 
14495:   // Canal de captación
14496:   const canalMap = {};
14497:   const canalIngMap = {};
14498:   citasMes.forEach(c => {
14499:     const canal = c.canal||'Directo';
14500:     canalMap[canal] = (canalMap[canal]||0)+1;
14501:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14502:   });
14503: 
14504:   // ── NPS y encuestas ──
14505:   const encStats = getEncuestaStats();
14506:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14507:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14508: 
14509:   // ── BD ──
14510:   const bdAuto = calcBDActualizada();
14511:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14512: 
14513:   // ── CAC ──
14514:   const egresosMkt = egresosAll.filter(e =>
14515:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14516:   ).reduce((s,e)=>s+(e.monto||0), 0);
14517:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14518: 
```

### Línea 14507

```html
14495:   // Canal de captación
14496:   const canalMap = {};
14497:   const canalIngMap = {};
14498:   citasMes.forEach(c => {
14499:     const canal = c.canal||'Directo';
14500:     canalMap[canal] = (canalMap[canal]||0)+1;
14501:     canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
14502:   });
14503: 
14504:   // ── NPS y encuestas ──
14505:   const encStats = getEncuestaStats();
14506:   const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
14507:   const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);
14508: 
14509:   // ── BD ──
14510:   const bdAuto = calcBDActualizada();
14511:   const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);
14512: 
14513:   // ── CAC ──
14514:   const egresosMkt = egresosAll.filter(e =>
14515:     CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
14516:   ).reduce((s,e)=>s+(e.monto||0), 0);
14517:   const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
14518: 
14519:   // ══ Helpers ══
```

### Línea 14551

```html
14539:   if (tasaConv!==null && tasaConv<25) {
14540:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14541:   }
14542:   if (tasaCancel>META_CANCELACION_PCT) {
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
14546:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14547:   }
14548:   if (tasaRet<META_RETENCION_PCT) {
14549:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14550:   }
14551:   if (npsVal<META_NPS) {
14552:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14553:   }
14554:   if (encPct<META_ENCUESTAS) {
14555:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14556:   }
14557:   if (bdPct<100) {
14558:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14559:   }
14560: 
14561:   const fci = (key, val) =>
14562:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14563:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
```

### Línea 14552

```html
14540:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14541:   }
14542:   if (tasaCancel>META_CANCELACION_PCT) {
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
14546:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14547:   }
14548:   if (tasaRet<META_RETENCION_PCT) {
14549:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14550:   }
14551:   if (npsVal<META_NPS) {
14552:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14553:   }
14554:   if (encPct<META_ENCUESTAS) {
14555:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14556:   }
14557:   if (bdPct<100) {
14558:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14559:   }
14560: 
14561:   const fci = (key, val) =>
14562:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14563:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14564:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
```

### Línea 14554

```html
14542:   if (tasaCancel>META_CANCELACION_PCT) {
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
14546:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14547:   }
14548:   if (tasaRet<META_RETENCION_PCT) {
14549:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14550:   }
14551:   if (npsVal<META_NPS) {
14552:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14553:   }
14554:   if (encPct<META_ENCUESTAS) {
14555:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14556:   }
14557:   if (bdPct<100) {
14558:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14559:   }
14560: 
14561:   const fci = (key, val) =>
14562:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14563:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14564:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14565:              text-align:right;box-sizing:border-box"
14566:       oninput="_recalcCostos()">`;
```

### Línea 14555

```html
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
14546:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
14547:   }
14548:   if (tasaRet<META_RETENCION_PCT) {
14549:     mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
14550:   }
14551:   if (npsVal<META_NPS) {
14552:     mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
14553:   }
14554:   if (encPct<META_ENCUESTAS) {
14555:     mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
14556:   }
14557:   if (bdPct<100) {
14558:     mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
14559:   }
14560: 
14561:   const fci = (key, val) =>
14562:     `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
14563:       style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
14564:              color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
14565:              text-align:right;box-sizing:border-box"
14566:       oninput="_recalcCostos()">`;
14567: 
```

### Línea 14584

```html
14572:     </div>`;
14573: 
14574:   let html = '';
14575: 
14576:   // ══════════════════════════════════════════
14577:   // 1 · RESUMEN EJECUTIVO
14578:   // ══════════════════════════════════════════
14579:   const kpisOk   = [
14580:     ventasCobradas >= META_VENTAS_MES,
14581:     totalSesiones  >= metaSesionesMes,
14582:     tasaCancel     <= META_CANCELACION_PCT,
14583:     tasaRet        >= META_RETENCION_PCT,
14584:     npsVal         >= META_NPS,
14585:   ].filter(Boolean).length;
14586:   const totalKpis = 5;
14587:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14588:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14589:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14590:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14591: 
14592:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14593:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14594:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14595:       <div style="flex:1">
14596:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
```

### Línea 14955

```html
14943:         <span style="font-size:.7rem;color:var(--muted)">${sess} sesión${sess===1?'':'es'} · ${pp}% del ingreso total</span>
14944:       </div>`;
14945:     });
14946:     html += `</div></div>`;
14947:   } else {
14948:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14949:   }
14950: 
14951:   // ══════════════════════════════════════════
14952:   // 7 · CALIDAD Y SATISFACCIÓN
14953:   // ══════════════════════════════════════════
14954:   html += _secTitle('⭐','Calidad y Satisfacción');
14955:   const npsC = _semCell(npsVal, META_NPS);
14956:   const encC = _semCell(encPct, META_ENCUESTAS);
14957:   const bdC  = _semCell(bdPct, 100);
14958:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14959:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14960:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14961:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14962:   html += `</div>`;
14963: 
14964:   // ══════════════════════════════════════════
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
```

### Línea 14956

```html
14944:       </div>`;
14945:     });
14946:     html += `</div></div>`;
14947:   } else {
14948:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14949:   }
14950: 
14951:   // ══════════════════════════════════════════
14952:   // 7 · CALIDAD Y SATISFACCIÓN
14953:   // ══════════════════════════════════════════
14954:   html += _secTitle('⭐','Calidad y Satisfacción');
14955:   const npsC = _semCell(npsVal, META_NPS);
14956:   const encC = _semCell(encPct, META_ENCUESTAS);
14957:   const bdC  = _semCell(bdPct, 100);
14958:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14959:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14960:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14961:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14962:   html += `</div>`;
14963: 
14964:   // ══════════════════════════════════════════
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
```

### Línea 14959

```html
14947:   } else {
14948:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14949:   }
14950: 
14951:   // ══════════════════════════════════════════
14952:   // 7 · CALIDAD Y SATISFACCIÓN
14953:   // ══════════════════════════════════════════
14954:   html += _secTitle('⭐','Calidad y Satisfacción');
14955:   const npsC = _semCell(npsVal, META_NPS);
14956:   const encC = _semCell(encPct, META_ENCUESTAS);
14957:   const bdC  = _semCell(bdPct, 100);
14958:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14959:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14960:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14961:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14962:   html += `</div>`;
14963: 
14964:   // ══════════════════════════════════════════
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14969:   const rows = [
14970:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14971:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
```

### Línea 14960

```html
14948:     html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
14949:   }
14950: 
14951:   // ══════════════════════════════════════════
14952:   // 7 · CALIDAD Y SATISFACCIÓN
14953:   // ══════════════════════════════════════════
14954:   html += _secTitle('⭐','Calidad y Satisfacción');
14955:   const npsC = _semCell(npsVal, META_NPS);
14956:   const encC = _semCell(encPct, META_ENCUESTAS);
14957:   const bdC  = _semCell(bdPct, 100);
14958:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
14959:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14960:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14961:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14962:   html += `</div>`;
14963: 
14964:   // ══════════════════════════════════════════
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14969:   const rows = [
14970:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14971:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14972:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
```

### Línea 14977

```html
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14969:   const rows = [
14970:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14971:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14972:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14973:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14974:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14975:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14976:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14977:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14978:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14979:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14980:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14981:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14982:   ];
14983:   rows.forEach(([icon,label,val,c,sub]) => {
14984:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14985:   });
14986:   html += `</div>`;
14987: 
14988:   // ══════════════════════════════════════════
14989:   // 9 · PLAN DE MEJORA
```

### Línea 14978

```html
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14969:   const rows = [
14970:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14971:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14972:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14973:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14974:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14975:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14976:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14977:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14978:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14979:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14980:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14981:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14982:   ];
14983:   rows.forEach(([icon,label,val,c,sub]) => {
14984:     html += _kpiRow(icon,label,val,c.dot,c.color,sub);
14985:   });
14986:   html += `</div>`;
14987: 
14988:   // ══════════════════════════════════════════
14989:   // 9 · PLAN DE MEJORA
14990:   // ══════════════════════════════════════════
```

### Línea 15131

```html
15119:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15120:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15121: 
15122:   // ── Leads y marketing ──
15123:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15124:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15125:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15126:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15127:   const canalMap={}, canalIng={};
15128:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15129: 
15130:   // ── Calidad ──
15131:   const encStats=getEncuestaStats();
15132:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15133:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15134:   const bdAuto  = calcBDActualizada();
15135:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15136: 
15137:   // ── Semanas ──
15138:   const semanas=[0,0,0,0,0];
15139:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15140:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15141: 
15142:   // ── Días pico ──
15143:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
```

### Línea 15132

```html
15120:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15121: 
15122:   // ── Leads y marketing ──
15123:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15124:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15125:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15126:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15127:   const canalMap={}, canalIng={};
15128:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15129: 
15130:   // ── Calidad ──
15131:   const encStats=getEncuestaStats();
15132:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15133:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15134:   const bdAuto  = calcBDActualizada();
15135:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15136: 
15137:   // ── Semanas ──
15138:   const semanas=[0,0,0,0,0];
15139:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15140:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15141: 
15142:   // ── Días pico ──
15143:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15144:   const porDia=[0,0,0,0,0,0,0];
```

### Línea 15133

```html
15121: 
15122:   // ── Leads y marketing ──
15123:   const leadsMes   = getLeadsMes() || manual.leads || 0;
15124:   const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
15125:   const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
15126:   const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
15127:   const canalMap={}, canalIng={};
15128:   citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });
15129: 
15130:   // ── Calidad ──
15131:   const encStats=getEncuestaStats();
15132:   const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
15133:   const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
15134:   const bdAuto  = calcBDActualizada();
15135:   const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);
15136: 
15137:   // ── Semanas ──
15138:   const semanas=[0,0,0,0,0];
15139:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15140:   eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
15141: 
15142:   // ── Días pico ──
15143:   const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15144:   const porDia=[0,0,0,0,0,0,0];
15145:   citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
```

### Línea 15267

```html
15255:   row('CAC (costo adquisición cliente)', cac>0?fmtPeso(cac)+' — meta <'+fmtPeso(META_CAC_MAX):'Sin datos');
15256:   if (Object.keys(canalIng).length>0) {
15257:     line();
15258:     line('  Ingresos por canal de captación:');
15259:     const totalCanalIng=Object.values(canalIng).reduce((s,v)=>s+v,0);
15260:     Object.entries(canalIng).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing])=>{
15261:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15262:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15263:     });
15264:   }
15265: 
15266:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15267:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15268:   if (encStats.promotores!==undefined) {
15269:     row('  Promotores', encStats.promotores+'');
15270:     row('  Pasivos', encStats.pasivos+'');
15271:     row('  Detractores', encStats.detractores+'');
15272:   }
15273:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15274:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15275: 
15276:   h1(`7. SEMÁFORO DE INDICADORES`);
15277:   const sem2 = (v,meta,alto=true) => {
15278:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15279:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
```

### Línea 15273

```html
15261:       const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
15262:       row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
15263:     });
15264:   }
15265: 
15266:   h1(`6. CALIDAD Y SATISFACCIÓN`);
15267:   row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
15268:   if (encStats.promotores!==undefined) {
15269:     row('  Promotores', encStats.promotores+'');
15270:     row('  Pasivos', encStats.pasivos+'');
15271:     row('  Detractores', encStats.detractores+'');
15272:   }
15273:   row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
15274:   row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));
15275: 
15276:   h1(`7. SEMÁFORO DE INDICADORES`);
15277:   const sem2 = (v,meta,alto=true) => {
15278:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15279:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15280:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15281:   };
15282:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15283:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15284:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15285:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
```

### Línea 15288

```html
15276:   h1(`7. SEMÁFORO DE INDICADORES`);
15277:   const sem2 = (v,meta,alto=true) => {
15278:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15279:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15280:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15281:   };
15282:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15283:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15284:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15285:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15286:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15287:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15288:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15289:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15290:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15291:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15292: 
15293:   line();
15294:   line(sep(60));
15295:   line();
15296:   line(`PREGUNTA PARA CLAUDE:`);
15297:   line();
15298:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15299:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15300:   line();
```

### Línea 15289

```html
15277:   const sem2 = (v,meta,alto=true) => {
15278:     if(!meta||isNaN(v)) return '⬜ Sin datos';
15279:     const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
15280:     return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
15281:   };
15282:   row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
15283:   row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
15284:   row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
15285:   row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
15286:   row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
15287:   row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
15288:   row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
15289:   row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
15290:   row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
15291:   row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));
15292: 
15293:   line();
15294:   line(sep(60));
15295:   line();
15296:   line(`PREGUNTA PARA CLAUDE:`);
15297:   line();
15298:   line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
15299:   line(`Te comparto el reporte completo de mi clínica arriba.`);
15300:   line();
15301:   line(`Con base en estos datos reales:`);
```

### Línea 15386

```html
15374:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
15375:     return ok ? 0 : warn ? 1 : 2;
15376:   }
15377: 
15378:   const st = {
15379:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15380:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15381:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15382:     leads:      kpiSt(d.leadsShow,  40,                      true),
15383:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15384:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15385:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15386:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15387:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15388:     bd:         kpiSt(d.bd,         90,                      true),
15389:   };
15390: 
15391:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15392: 
15393:   for (const [kpi, status] of Object.entries(st)) {
15394:     const dot  = document.getElementById('emDot_' + kpi);
15395:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15396:     const card = document.getElementById('emCard_' + kpi);
15397:     if (card) {
15398:       if (status === 2) card.classList.add('alerta');
```

### Línea 15387

```html
15375:     return ok ? 0 : warn ? 1 : 2;
15376:   }
15377: 
15378:   const st = {
15379:     sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
15380:     mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
15381:     cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
15382:     leads:      kpiSt(d.leadsShow,  40,                      true),
15383:     conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
15384:     ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
15385:     ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
15386:     nps:        kpiSt(d.nps,        d.npsMeta,               true),
15387:     enc:        kpiSt(d.encuestas,  d.encMeta,               true),
15388:     bd:         kpiSt(d.bd,         90,                      true),
15389:   };
15390: 
15391:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15392: 
15393:   for (const [kpi, status] of Object.entries(st)) {
15394:     const dot  = document.getElementById('emDot_' + kpi);
15395:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15396:     const card = document.getElementById('emCard_' + kpi);
15397:     if (card) {
15398:       if (status === 2) card.classList.add('alerta');
15399:       else              card.classList.remove('alerta');
```

### Línea 15403

```html
15391:   const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';
15392: 
15393:   for (const [kpi, status] of Object.entries(st)) {
15394:     const dot  = document.getElementById('emDot_' + kpi);
15395:     if (dot)  dot.className = 'em-dot ' + dotCls(status);
15396:     const card = document.getElementById('emCard_' + kpi);
15397:     if (card) {
15398:       if (status === 2) card.classList.add('alerta');
15399:       else              card.classList.remove('alerta');
15400:     }
15401:   }
15402: 
15403:   const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
15404:   let totalRojos = 0;
15405: 
15406:   for (const [dim, kpis] of Object.entries(dims)) {
15407:     const rojos     = kpis.filter(k => st[k] === 2).length;
15408:     const amarillos = kpis.filter(k => st[k] === 1).length;
15409:     totalRojos += rojos;
15410: 
15411:     const badge = document.getElementById('emDB_' + dim);
15412:     if (badge) {
15413:       if (rojos > 0) {
15414:         badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
15415:         badge.className = 'em-dim-badge has-red';
```

### Línea 15505

```html
15493:     if (row) row.classList.toggle('done', ck.checked);
15494:   }
15495:   const total = checks.length, done = checks.filter(Boolean).length;
15496:   const fill = document.getElementById('emPF_' + kpi);
15497:   if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
15498:   const meta = document.getElementById('emPM_' + kpi);
15499:   if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
15500:   const btn  = document.getElementById('emDB_' + kpi);
15501:   if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
15502: }
15503: 
15504: function loadAllEmSteps() {
15505:   ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
15506:     let state = [];
15507:     try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
15508:     state.forEach((checked, idx) => {
15509:       const ck = document.getElementById('emCk_' + kpi + '_' + idx);
15510:       if (ck) ck.checked = !!checked;
15511:     });
15512:     _updateEmProgress(kpi);
15513:   });
15514: }
15515: 
15516: function markEmDone(kpi, total) {
15517:   const state = Array(total).fill(true);
```

### Línea 15605

```html
15593:   const manual    = getKPIManual();
15594:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15595: 
15596:   // KPI 4 — Tasa conversión
15597:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15598:   let tasaConv = null;
15599:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15600:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15601: 
15602:   // KPI 5 — Ventas mes
15603:   const ventasMes = calcCobradoMes(m, y);
15604: 
15605:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15606:   const _encStatsG = getEncuestaStats();
15607:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15608: 
15609:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15610:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15611: 
15612:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15613:   const _bdGuia = calcBDActualizada(m, y);
15614:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15615: 
15616:   // Recurrentes este mes = vinieron este mes
15617:   const _pacUnicosMes = {};
```

### Línea 15606

```html
15594:   const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);
15595: 
15596:   // KPI 4 — Tasa conversión
15597:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15598:   let tasaConv = null;
15599:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15600:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15601: 
15602:   // KPI 5 — Ventas mes
15603:   const ventasMes = calcCobradoMes(m, y);
15604: 
15605:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15606:   const _encStatsG = getEncuestaStats();
15607:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15608: 
15609:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15610:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15611: 
15612:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15613:   const _bdGuia = calcBDActualizada(m, y);
15614:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15615: 
15616:   // Recurrentes este mes = vinieron este mes
15617:   const _pacUnicosMes = {};
15618:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
```

### Línea 15607

```html
15595: 
15596:   // KPI 4 — Tasa conversión
15597:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15598:   let tasaConv = null;
15599:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15600:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15601: 
15602:   // KPI 5 — Ventas mes
15603:   const ventasMes = calcCobradoMes(m, y);
15604: 
15605:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15606:   const _encStatsG = getEncuestaStats();
15607:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15608: 
15609:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15610:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15611: 
15612:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15613:   const _bdGuia = calcBDActualizada(m, y);
15614:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15615: 
15616:   // Recurrentes este mes = vinieron este mes
15617:   const _pacUnicosMes = {};
15618:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15619:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
```

### Línea 15609

```html
15597:   const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15598:   let tasaConv = null;
15599:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15600:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15601: 
15602:   // KPI 5 — Ventas mes
15603:   const ventasMes = calcCobradoMes(m, y);
15604: 
15605:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15606:   const _encStatsG = getEncuestaStats();
15607:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15608: 
15609:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15610:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15611: 
15612:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15613:   const _bdGuia = calcBDActualizada(m, y);
15614:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15615: 
15616:   // Recurrentes este mes = vinieron este mes
15617:   const _pacUnicosMes = {};
15618:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15619:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15620:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15621:   const _stRecurrentes = _listaRecurrentes.length;
```

### Línea 15610

```html
15598:   let tasaConv = null;
15599:   if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
15600:   else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);
15601: 
15602:   // KPI 5 — Ventas mes
15603:   const ventasMes = calcCobradoMes(m, y);
15604: 
15605:   // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
15606:   const _encStatsG = getEncuestaStats();
15607:   const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);
15608: 
15609:   // KPI 7 — NPS (solo disponible para mes actual desde formulario)
15610:   const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);
15611: 
15612:   // KPI 8 — BD actualizada (automático desde datos del sistema)
15613:   const _bdGuia = calcBDActualizada(m, y);
15614:   const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);
15615: 
15616:   // Recurrentes este mes = vinieron este mes
15617:   const _pacUnicosMes = {};
15618:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15619:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15620:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15621:   const _stRecurrentes = _listaRecurrentes.length;
15622: 
```

### Línea 15669

```html
15657: 
15658:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
15659:     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
15660:       <div>
15661:         <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
15662:         <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
15663:       </div>
15664:       <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
15665:         <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
15666:           style="font-size:.73rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
15667:           ${opcionesSelect}
15668:         </select>
15669:         ${esMesActual ? `<button onclick="loadEncuestaStats()" id="btnCargarEncuestaGuia" style="font-size:.73rem;padding:6px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">🔄 Cargar encuestas</button>` : ''}
15670:         <button onclick="showView('finanzas')" style="font-size:.73rem;padding:6px 14px;background:rgba(27,191,176,.1);border:1px solid rgba(27,191,176,.3);color:var(--primary);border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">Ver finanzas →</button>
15671:       </div>
15672:     </div>
15673:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15674: 
15675:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15676:   const _sess1Meta  = esMesActual
15677:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
```

### Línea 15686

```html
15674: 
15675:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15676:   const _sess1Meta  = esMesActual
15677:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15696:   const _mkPacList = (id, icon, label, count, lista, color) => {
15697:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15698:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
```

### Línea 15687

```html
15675:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15676:   const _sess1Meta  = esMesActual
15677:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15696:   const _mkPacList = (id, icon, label, count, lista, color) => {
15697:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15698:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15699:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
```

### Línea 15688

```html
15676:   const _sess1Meta  = esMesActual
15677:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15696:   const _mkPacList = (id, icon, label, count, lista, color) => {
15697:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15698:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15699:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15700:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
```

### Línea 15690

```html
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15696:   const _mkPacList = (id, icon, label, count, lista, color) => {
15697:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15698:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15699:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15700:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15701:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15702:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
```

### Línea 15691

```html
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
15696:   const _mkPacList = (id, icon, label, count, lista, color) => {
15697:     const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
15698:     return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
15699:       <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
15700:       <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
15701:       <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
15702:         style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
15703:       <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
```

### Línea 15751

```html
15739:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15740:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15741:     const textoBanner        = metaYaCumplida
15742:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15743:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15744:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15745:       ${iconoBanner} ${textoBanner}
15746:     </div>`;
15747:   }
15748: 
15749:   if (!esMesActual) {
15750:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15751:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15752:     </div>`;
15753:   }
15754: 
15755:   const cfg = getKPIConfig();
15756:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15757:   const inp = (key, label, val, note='') => `
15758:     <div>
15759:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15760:       <input type="number" id="kcfg_${key}" value="${val}"
15761:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15762:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15763:     </div>`;
```

### Línea 15767

```html
15755:   const cfg = getKPIConfig();
15756:   const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
15757:   const inp = (key, label, val, note='') => `
15758:     <div>
15759:       <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
15760:       <input type="number" id="kcfg_${key}" value="${val}"
15761:         style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
15762:         onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
15763:     </div>`;
15764: 
15765:   html += `</div>
15766:     <div style="margin-top:12px;padding:10px 14px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px;font-size:.75rem;color:var(--muted)">
15767:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15768:     </div>
15769:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15770:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15771:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15772:         ⚙️ Editar valores de referencia
15773:       </button>
15774:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15775:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15776:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15777:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15778:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15779:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
```

### Línea 15784

```html
15772:         ⚙️ Editar valores de referencia
15773:       </button>
15774:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15775:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15776:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15777:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15778:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15779:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15780:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15781:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15782:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15783:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15784:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15785:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15786:         </div>
15787:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15788:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15789:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15790:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15791:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15792:         </div>
15793:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15794:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15795:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15796:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
```

### Línea 15785

```html
15773:       </button>
15774:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15775:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15776:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15777:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15778:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15779:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15780:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15781:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15782:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15783:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15784:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15785:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15786:         </div>
15787:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15788:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15789:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15790:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15791:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
15792:         </div>
15793:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
15794:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
15795:           ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
15796:           ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
15797:           ${inp('precio_express', 'Precio Descarga Express ($)', cfg.precio_express)}
```

### Línea 15818

```html
15806:     </div>
15807:   </div>`;
15808: 
15809:   // Exportar datos para el Manual de Emergencia
15810:   window._emKPIData = {
15811:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15812:     fullPct:       fullPct,           totalMix:      totalMix,
15813:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15814:     leadsShow:     leadsShow || 0,
15815:     tasaConv:      tasaConv,
15816:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15817:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15818:     nps:           isNaN(nps)       ? 0 : nps,
15819:     npsMeta:       META_NPS,
15820:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15821:     encMeta:       META_ENCUESTAS,
15822:     bd:            isNaN(bd)        ? 0 : bd,
15823:   };
15824: 
15825:   el.innerHTML = html;
15826:   applyKPIFavorites();
15827:   applyKPIRefSpans();
15828:   _renderCancelBreakdown();
15829:   _renderBDBreakdown();
15830:   renderEmergencia();
```

### Línea 15819

```html
15807:   </div>`;
15808: 
15809:   // Exportar datos para el Manual de Emergencia
15810:   window._emKPIData = {
15811:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15812:     fullPct:       fullPct,           totalMix:      totalMix,
15813:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15814:     leadsShow:     leadsShow || 0,
15815:     tasaConv:      tasaConv,
15816:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15817:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15818:     nps:           isNaN(nps)       ? 0 : nps,
15819:     npsMeta:       META_NPS,
15820:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15821:     encMeta:       META_ENCUESTAS,
15822:     bd:            isNaN(bd)        ? 0 : bd,
15823:   };
15824: 
15825:   el.innerHTML = html;
15826:   applyKPIFavorites();
15827:   applyKPIRefSpans();
15828:   _renderCancelBreakdown();
15829:   _renderBDBreakdown();
15830:   renderEmergencia();
15831: }
```

### Línea 15820

```html
15808: 
15809:   // Exportar datos para el Manual de Emergencia
15810:   window._emKPIData = {
15811:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15812:     fullPct:       fullPct,           totalMix:      totalMix,
15813:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15814:     leadsShow:     leadsShow || 0,
15815:     tasaConv:      tasaConv,
15816:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15817:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15818:     nps:           isNaN(nps)       ? 0 : nps,
15819:     npsMeta:       META_NPS,
15820:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15821:     encMeta:       META_ENCUESTAS,
15822:     bd:            isNaN(bd)        ? 0 : bd,
15823:   };
15824: 
15825:   el.innerHTML = html;
15826:   applyKPIFavorites();
15827:   applyKPIRefSpans();
15828:   _renderCancelBreakdown();
15829:   _renderBDBreakdown();
15830:   renderEmergencia();
15831: }
15832: 
```

### Línea 15821

```html
15809:   // Exportar datos para el Manual de Emergencia
15810:   window._emKPIData = {
15811:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15812:     fullPct:       fullPct,           totalMix:      totalMix,
15813:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15814:     leadsShow:     leadsShow || 0,
15815:     tasaConv:      tasaConv,
15816:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15817:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15818:     nps:           isNaN(nps)       ? 0 : nps,
15819:     npsMeta:       META_NPS,
15820:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15821:     encMeta:       META_ENCUESTAS,
15822:     bd:            isNaN(bd)        ? 0 : bd,
15823:   };
15824: 
15825:   el.innerHTML = html;
15826:   applyKPIFavorites();
15827:   applyKPIRefSpans();
15828:   _renderCancelBreakdown();
15829:   _renderBDBreakdown();
15830:   renderEmergencia();
15831: }
15832: 
15833: function _renderCancelBreakdown() {
```

### Línea 15966

```html
15954:   if (cancelMesPruebas.length) {
15955:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15956:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15957:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15958:     </div>`;
15959:   }
15960: 
15961:   html += `</div>`;
15962:   el.innerHTML = html;
15963: }
15964: 
15965: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15966: function getEncuestaStats() {
15967:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15968: }
15969: 
15970: async function loadEncuestaStats() {
15971:   const btn  = document.getElementById('btnCargarEncuesta');
15972:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15973:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15974:   try {
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
```

### Línea 15967

```html
15955:     html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
15956:       🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
15957:       ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
15958:     </div>`;
15959:   }
15960: 
15961:   html += `</div>`;
15962:   el.innerHTML = html;
15963: }
15964: 
15965: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15966: function getEncuestaStats() {
15967:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15968: }
15969: 
15970: async function loadEncuestaStats() {
15971:   const btn  = document.getElementById('btnCargarEncuesta');
15972:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15973:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15974:   try {
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
15979:       const m = now.getMonth()+1, y = now.getFullYear();
```

### Línea 15970

```html
15958:     </div>`;
15959:   }
15960: 
15961:   html += `</div>`;
15962:   el.innerHTML = html;
15963: }
15964: 
15965: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15966: function getEncuestaStats() {
15967:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15968: }
15969: 
15970: async function loadEncuestaStats() {
15971:   const btn  = document.getElementById('btnCargarEncuesta');
15972:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15973:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15974:   try {
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
15979:       const m = now.getMonth()+1, y = now.getFullYear();
15980:       const citasMes = citasReales().filter(c => {
15981:         const [cy,cm] = normDate(c.fecha).split('-');
15982:         return +cm===m && +cy===y;
```

### Línea 15975

```html
15963: }
15964: 
15965: // ── ENCUESTA STATS — conectado a Google Forms via GAS ──
15966: function getEncuestaStats() {
15967:   try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
15968: }
15969: 
15970: async function loadEncuestaStats() {
15971:   const btn  = document.getElementById('btnCargarEncuesta');
15972:   const btn2 = document.getElementById('btnCargarEncuestaGuia');
15973:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15974:   try {
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
15979:       const m = now.getMonth()+1, y = now.getFullYear();
15980:       const citasMes = citasReales().filter(c => {
15981:         const [cy,cm] = normDate(c.fecha).split('-');
15982:         return +cm===m && +cy===y;
15983:       }).length;
15984:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
```

### Línea 15985

```html
15973:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15974:   try {
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
15979:       const m = now.getMonth()+1, y = now.getFullYear();
15980:       const citasMes = citasReales().filter(c => {
15981:         const [cy,cm] = normDate(c.fecha).split('-');
15982:         return +cm===m && +cy===y;
15983:       }).length;
15984:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
```

### Línea 15987

```html
15975:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15976:     const d = await r.json();
15977:     if (d.ok) {
15978:       const now = new Date();
15979:       const m = now.getMonth()+1, y = now.getFullYear();
15980:       const citasMes = citasReales().filter(c => {
15981:         const [cy,cm] = normDate(c.fecha).split('-');
15982:         return +cm===m && +cy===y;
15983:       }).length;
15984:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
```

### Línea 15992

```html
15980:       const citasMes = citasReales().filter(c => {
15981:         const [cy,cm] = normDate(c.fecha).split('-');
15982:         return +cm===m && +cy===y;
15983:       }).length;
15984:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
```

### Línea 15995

```html
15983:       }).length;
15984:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
```

### Línea 15997

```html
15985:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15986:       const stats   = {
15987:         nps: npsVal, encuestas: encPct,
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
```

### Línea 16000

```html
15988:         totalRespuestas: d.totalMes, citasMes,
15989:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15990:         fetchedAt: Date.now()
15991:       };
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
```

### Línea 16004

```html
15992:       kvSet('encuestaStats', JSON.stringify(stats));
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
```

### Línea 16005

```html
15993:       // Actualizar inputs ocultos y guardar
15994:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15995:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
```

### Línea 16008

```html
15996:       guardarKPIManual();
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
```

### Línea 16009

```html
15997:       _renderEncuestaStatsUI(stats);
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
```

### Línea 16010

```html
15998:       renderKPITablero();
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
```

### Línea 16011

```html
15999:       renderKPIGuia();
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
```

### Línea 16012

```html
16000:       toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
```

### Línea 16013

```html
16001:     } else {
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16025: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
```

### Línea 16014

```html
16002:       toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16025: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16026: 
```

### Línea 16015

```html
16003:     }
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16025: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16026: 
16027: function _rutinaKey() {
```

### Línea 16016

```html
16004:   } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
16005:   [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
16006: }
16007: 
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16025: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16026: 
16027: function _rutinaKey() {
16028:   const d = new Date();
```

### Línea 16020

```html
16008: function _renderEncuestaStatsUI(stats) {
16009:   if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
16010:   const npsOk     = stats.nps !== null && stats.nps !== undefined;
16011:   const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
16012:   const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
16013:   const npsEl     = document.getElementById('kpiNPSAutoTag');
16014:   const encEl     = document.getElementById('kpiEncuestasAutoTag');
16015:   if (npsEl) npsEl.innerHTML = npsOk
16016:     ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
16017:       ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
16018:     : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
16019:   if (encEl) encEl.innerHTML =
16020:     `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
16021:     ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
16022: }
16023: 
16024: // ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
16025: const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];
16026: 
16027: function _rutinaKey() {
16028:   const d = new Date();
16029:   return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
16030: }
16031: 
16032: function loadRutinaChecks() {
```

### Línea 16257

```html
16245:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16246:       <div style="display:flex;flex-direction:column;gap:16px">
16247: 
16248:         <div class="card">
16249:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16250:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16251:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16252:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16253:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16254:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16255:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16256:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16257:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16258:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16259:           </div>
16260:         </div>
16261: 
16262:         <div class="card">
16263:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16264:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16265: 
16266:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16267:             <div></div>
16268:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16269:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
```

### Línea 16258

```html
16246:       <div style="display:flex;flex-direction:column;gap:16px">
16247: 
16248:         <div class="card">
16249:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16250:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16251:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16252:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16253:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16254:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16255:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16256:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16257:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16258:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16259:           </div>
16260:         </div>
16261: 
16262:         <div class="card">
16263:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16264:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
16265: 
16266:           <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
16267:             <div></div>
16268:             <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
16269:             <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
16270:           </div>
```

### Línea 16394

```html
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
16406:   cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
```

### Línea 16395

```html
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
16406:   cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
16407:   cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
```

### Línea 16476

```html
16464: 
16465: function guardarKPIConfig() {
16466:   const get = key => {
16467:     const el = document.getElementById('kcfg_' + key);
16468:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16469:   };
16470:   const prev = getKPIConfig();
16471:   const updated = {
16472:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16473:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16474:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16475:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16476:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16477:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16478:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16479:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16480:     meta_cancelacion:     prev.meta_cancelacion,
16481:     meta_retencion:       prev.meta_retencion,
16482:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16483:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16484:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16485:     precio_full:          get('precio_full')          ?? prev.precio_full,
16486:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16487:     precio_express:       get('precio_express')       ?? prev.precio_express,
16488:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
```

### Línea 16477

```html
16465: function guardarKPIConfig() {
16466:   const get = key => {
16467:     const el = document.getElementById('kcfg_' + key);
16468:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16469:   };
16470:   const prev = getKPIConfig();
16471:   const updated = {
16472:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16473:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16474:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16475:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16476:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16477:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16478:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16479:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16480:     meta_cancelacion:     prev.meta_cancelacion,
16481:     meta_retencion:       prev.meta_retencion,
16482:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16483:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16484:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16485:     precio_full:          get('precio_full')          ?? prev.precio_full,
16486:     duracion_full:        get('duracion_full')        ?? prev.duracion_full,
16487:     precio_express:       get('precio_express')       ?? prev.precio_express,
16488:     duracion_express:     get('duracion_express')     ?? prev.duracion_express,
16489:   };
```

### Línea 18953

```html
18941:     semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
18942:     ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
18943:     bono_react:            parseInt(cfg.bono_react            || '15000', 10),
18944:     bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
18945:     pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
18946:     bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
18947:     serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
18948:     serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
18949:     bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
18950:     contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
18951:     contenido_persona:     cfg.contenido_persona || 'Persona del video',
18952:     contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
18953:     equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
18954:   };
18955: }
18956: 
18957: function saveComisConfig() {
18958:   const g = id => (document.getElementById(id)||{}).value || '';
18959:   kvSet('comisiones_config', JSON.stringify({
18960:     bono_agenda:          g('cfg_bono_agenda'),
18961:     semanas_meta:         g('cfg_semanas_meta'),
18962:     ses_llena:            g('cfg_ses_llena'),
18963:     bono_react:           g('cfg_bono_react'),
18964:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18965:     pct_reventa:          g('cfg_pct_reventa'),
```

### Línea 18973

```html
18961:     semanas_meta:         g('cfg_semanas_meta'),
18962:     ses_llena:            g('cfg_ses_llena'),
18963:     bono_react:           g('cfg_bono_react'),
18964:     bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
18965:     pct_reventa:          g('cfg_pct_reventa'),
18966:     bono_cruzada:         g('cfg_bono_cruzada'),
18967:     serv_mant:            g('cfg_serv_mant'),
18968:     serv_descarga:        g('cfg_serv_descarga'),
18969:     bono_contenido:       g('cfg_bono_contenido'),
18970:     contenido_split_aux:  g('cfg_contenido_split_aux'),
18971:     contenido_persona:    g('cfg_contenido_persona'),
18972:     contenido_leads_meta: g('cfg_contenido_leads_meta'),
18973:     equipo_nps_meta:      g('cfg_equipo_nps_meta'),
18974:   }));
18975:   const msg = document.getElementById('coConfigMsg');
18976:   if (msg) { msg.style.display='inline'; setTimeout(()=>msg.style.display='none',2000); }
18977:   renderComisiones();
18978: }
18979: 
18980: function toggleComisConfig() {
18981:   const p = document.getElementById('coConfigPanel');
18982:   if (!p) return;
18983:   const open = p.style.display === 'none';
18984:   p.style.display = open ? 'block' : 'none';
18985:   if (!open) return;
```

### Línea 19001

```html
18989:   set('cfg_semanas_meta',         cfg.semanas_meta);
18990:   set('cfg_ses_llena',            META_SESIONES_SEMANA);
18991:   set('cfg_bono_react',           cfg.bono_react);
18992:   set('cfg_bono_react_tipo',      cfg.bono_react_tipo);
18993:   set('cfg_pct_reventa',          cfg.pct_reventa);
18994:   set('cfg_bono_cruzada',         cfg.bono_cruzada);
18995:   set('cfg_serv_mant',            cfg.serv_mant.join(', '));
18996:   set('cfg_serv_descarga',        cfg.serv_descarga);
18997:   set('cfg_bono_contenido',       cfg.bono_contenido);
18998:   set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
18999:   set('cfg_contenido_persona',    cfg.contenido_persona);
19000:   set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
19001:   set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
19002: }
19003: 
19004: function _initComisMesSel() {
19005:   const sel = document.getElementById('comisMes');
19006:   if (!sel || sel.options.length > 0) return;
19007:   const now = new Date();
19008:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19009:   for (let i = 0; i < 12; i++) {
19010:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19011:     const opt = document.createElement('option');
19012:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19013:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
```

### Línea 19192

```html
19180:   const bonoCruzAux   = cruzadas.filter(c => c.asign === 'auxiliar').length * cfg.bono_cruzada;
19181:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19182: 
19183:   // ── CREADOR DE CONTENIDO ──
19184:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19185:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19186:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19187:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19188:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19189:   const bonoContVideo= bonoCont - bonoContAux;
19190:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19191: 
19192:   // ── NPS / TODO EL EQUIPO ──
19193:   const _enc    = getEncuestaStats();
19194:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19195:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19196: 
19197:   // ── TOTALES ──
19198:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19199:   const totalFisio = bonoRev + bonoCruzFisio;
19200:   const totalVideo = bonoContVideo;
19201:   const totalGen   = totalAux + totalFisio + totalVideo;
19202: 
19203:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19204:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
```

### Línea 19193

```html
19181:   const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)
19182: 
19183:   // ── CREADOR DE CONTENIDO ──
19184:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19185:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19186:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19187:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19188:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19189:   const bonoContVideo= bonoCont - bonoContAux;
19190:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19191: 
19192:   // ── NPS / TODO EL EQUIPO ──
19193:   const _enc    = getEncuestaStats();
19194:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19195:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19196: 
19197:   // ── TOTALES ──
19198:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19199:   const totalFisio = bonoRev + bonoCruzFisio;
19200:   const totalVideo = bonoContVideo;
19201:   const totalGen   = totalAux + totalFisio + totalVideo;
19202: 
19203:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19204:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19205:   const pagoVideo = kvGet('comis_pago_video_' + mes);
```

### Línea 19194

```html
19182: 
19183:   // ── CREADOR DE CONTENIDO ──
19184:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19185:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19186:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19187:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19188:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19189:   const bonoContVideo= bonoCont - bonoContAux;
19190:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19191: 
19192:   // ── NPS / TODO EL EQUIPO ──
19193:   const _enc    = getEncuestaStats();
19194:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19195:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19196: 
19197:   // ── TOTALES ──
19198:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19199:   const totalFisio = bonoRev + bonoCruzFisio;
19200:   const totalVideo = bonoContVideo;
19201:   const totalGen   = totalAux + totalFisio + totalVideo;
19202: 
19203:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19204:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19205:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19206: 
```

### Línea 19195

```html
19183:   // ── CREADOR DE CONTENIDO ──
19184:   const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
19185:   const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
19186:   const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
19187:   const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
19188:   const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
19189:   const bonoContVideo= bonoCont - bonoContAux;
19190:   const splitVideoP  = 100 - cfg.contenido_split_aux;
19191: 
19192:   // ── NPS / TODO EL EQUIPO ──
19193:   const _enc    = getEncuestaStats();
19194:   const npsActual = _enc.nps !== undefined ? _enc.nps : null;
19195:   const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;
19196: 
19197:   // ── TOTALES ──
19198:   const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
19199:   const totalFisio = bonoRev + bonoCruzFisio;
19200:   const totalVideo = bonoContVideo;
19201:   const totalGen   = totalAux + totalFisio + totalVideo;
19202: 
19203:   const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
19204:   const pagoFisio = kvGet('comis_pago_fisio_' + mes);
19205:   const pagoVideo = kvGet('comis_pago_video_' + mes);
19206: 
19207:   // ── RESUMEN ──
```

### Línea 19335

```html
19323:       </div>
19324:     </div>
19325:     <div class="co-footer">
19326:       ${btnVideo}
19327:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19328:     </div>
19329:   </div>`;
19330: 
19331:   const contWrap = document.getElementById('coContenidoWrap');
19332:   if (contWrap) contWrap.innerHTML = htmlCont;
19333: 
19334:   // ── TODO EL EQUIPO ──
19335:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19336:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19337:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19338:     <div>
19339:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19340:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19341:     </div>
19342:     <div style="text-align:right">
19343:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19344:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19345:     </div>
19346:   </div>`;
19347: 
```

### Línea 19336

```html
19324:     </div>
19325:     <div class="co-footer">
19326:       ${btnVideo}
19327:       <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
19328:     </div>
19329:   </div>`;
19330: 
19331:   const contWrap = document.getElementById('coContenidoWrap');
19332:   if (contWrap) contWrap.innerHTML = htmlCont;
19333: 
19334:   // ── TODO EL EQUIPO ──
19335:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19336:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19337:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19338:     <div>
19339:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19340:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19341:     </div>
19342:     <div style="text-align:right">
19343:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19344:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19345:     </div>
19346:   </div>`;
19347: 
19348:   const equipoWrap = document.getElementById('coEquipoWrap');
```

### Línea 19340

```html
19328:     </div>
19329:   </div>`;
19330: 
19331:   const contWrap = document.getElementById('coContenidoWrap');
19332:   if (contWrap) contWrap.innerHTML = htmlCont;
19333: 
19334:   // ── TODO EL EQUIPO ──
19335:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19336:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19337:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19338:     <div>
19339:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19340:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19341:     </div>
19342:     <div style="text-align:right">
19343:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19344:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19345:     </div>
19346:   </div>`;
19347: 
19348:   const equipoWrap = document.getElementById('coEquipoWrap');
19349:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19350: }
19351: </script>
19352: 
```

### Línea 19343

```html
19331:   const contWrap = document.getElementById('coContenidoWrap');
19332:   if (contWrap) contWrap.innerHTML = htmlCont;
19333: 
19334:   // ── TODO EL EQUIPO ──
19335:   const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
19336:   const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
19337:   const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
19338:     <div>
19339:       <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
19340:       <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
19341:     </div>
19342:     <div style="text-align:right">
19343:       <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
19344:       ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
19345:     </div>
19346:   </div>`;
19347: 
19348:   const equipoWrap = document.getElementById('coEquipoWrap');
19349:   if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
19350: }
19351: </script>
19352: 
19353: <script>
19354: // ══════════════════════════════════════════
19355: //  DISPONIBILIDAD RÁPIDA
```

### Línea 19808

```html
19796:     pie.style.display = 'flex';
19797:     pie.innerHTML = `
19798:       <span style="color:var(--muted)">Ventas filtradas: <strong style="color:var(--text)">${_fmtCLP(totalFilVenta)}</strong></span>
19799:       <span style="color:var(--muted)">Comisión total: <strong style="color:#10b981">${_fmtCLP(totalFilComis)}</strong></span>
19800:       ${totalFilPend > 0 ? `<span style="color:var(--muted)">Pendiente: <strong style="color:#f59e0b">${_fmtCLP(totalFilPend)}</strong></span>` : ''}
19801:     `;
19802:   }
19803: }
19804: 
19805: function registrarRecuperacion() {
19806:   const paciente = document.getElementById('recInpPaciente')?.value.trim();
19807:   const fecha    = document.getElementById('recInpFecha')?.value;
19808:   const servicio = document.getElementById('recInpServicio')?.value;
19809:   const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
19810:   const nota     = document.getElementById('recInpNota')?.value.trim() || '';
19811: 
19812:   if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
19813:   if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
19814:   if (!servicio) { alert('Selecciona el servicio'); return; }
19815:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19816: 
19817:   const comision = Math.round(venta * REC_PCT);
19818:   const rec = {
19819:     id: Date.now().toString(),
19820:     fecha,
```

### Línea 19837

```html
19825:     nota,
19826:     pagado: false,
19827:     pagadoFecha: null
19828:   };
19829: 
19830:   const all = _loadRec();
19831:   all.push(rec);
19832:   _saveRec(all);
19833: 
19834:   // Limpiar formulario
19835:   document.getElementById('recInpPaciente').value = '';
19836:   document.getElementById('recInpFecha').value    = '';
19837:   document.getElementById('recInpServicio').value = '';
19838:   document.getElementById('recInpVenta').value    = '';
19839:   document.getElementById('recInpNota').value     = '';
19840:   document.getElementById('recInpComisionCalc').value = '$0';
19841: 
19842:   const msg = document.getElementById('recGuardadoMsg');
19843:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19844: 
19845:   renderRecuperaciones();
19846:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
19847: }
19848: 
19849: function marcarPagado(id) {
```

### Línea 20061

```html
20049:       </div>
20050:       <div style="flex-shrink:0">${registrarBtn}</div>
20051:     </div>
20052:     <div style="margin-top:10px;padding-top:10px;border-top:1px solid ${gc.border};display:flex;gap:6px;flex-wrap:wrap;align-items:center">
20053:       <span style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);white-space:nowrap">Enviar por WA:</span>
20054:       ${waBtns}
20055:     </div>
20056:   </div>`;
20057: }
20058: 
20059: function preRellenaRecuperacion(nombre, servicio) {
20060:   const inpNombre = document.getElementById('recInpPaciente');
20061:   const inpServ   = document.getElementById('recInpServicio');
20062:   const inpFecha  = document.getElementById('recInpFecha');
20063:   if (inpNombre) inpNombre.value = nombre;
20064:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20065:   // Intentar hacer match del servicio en el select
20066:   if (inpServ && servicio) {
20067:     const opts = Array.from(inpServ.options);
20068:     const srv  = servicio.toLowerCase();
20069:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20070:     if (match) inpServ.value = match.value;
20071:   }
20072:   // Scroll suave al formulario
20073:   const form = document.getElementById('recInpVenta');
```

### Línea 20066

```html
20054:       ${waBtns}
20055:     </div>
20056:   </div>`;
20057: }
20058: 
20059: function preRellenaRecuperacion(nombre, servicio) {
20060:   const inpNombre = document.getElementById('recInpPaciente');
20061:   const inpServ   = document.getElementById('recInpServicio');
20062:   const inpFecha  = document.getElementById('recInpFecha');
20063:   if (inpNombre) inpNombre.value = nombre;
20064:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20065:   // Intentar hacer match del servicio en el select
20066:   if (inpServ && servicio) {
20067:     const opts = Array.from(inpServ.options);
20068:     const srv  = servicio.toLowerCase();
20069:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20070:     if (match) inpServ.value = match.value;
20071:   }
20072:   // Scroll suave al formulario
20073:   const form = document.getElementById('recInpVenta');
20074:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20075:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20076: }
20077: 
20078: // ── CAMPAÑA DE REFERIDOS DEL MES ──
```

### Línea 20067

```html
20055:     </div>
20056:   </div>`;
20057: }
20058: 
20059: function preRellenaRecuperacion(nombre, servicio) {
20060:   const inpNombre = document.getElementById('recInpPaciente');
20061:   const inpServ   = document.getElementById('recInpServicio');
20062:   const inpFecha  = document.getElementById('recInpFecha');
20063:   if (inpNombre) inpNombre.value = nombre;
20064:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20065:   // Intentar hacer match del servicio en el select
20066:   if (inpServ && servicio) {
20067:     const opts = Array.from(inpServ.options);
20068:     const srv  = servicio.toLowerCase();
20069:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20070:     if (match) inpServ.value = match.value;
20071:   }
20072:   // Scroll suave al formulario
20073:   const form = document.getElementById('recInpVenta');
20074:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20075:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20076: }
20077: 
20078: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20079: // ── helpers de estado por paciente (persisten en localStorage) ──
```

### Línea 20070

```html
20058: 
20059: function preRellenaRecuperacion(nombre, servicio) {
20060:   const inpNombre = document.getElementById('recInpPaciente');
20061:   const inpServ   = document.getElementById('recInpServicio');
20062:   const inpFecha  = document.getElementById('recInpFecha');
20063:   if (inpNombre) inpNombre.value = nombre;
20064:   if (inpFecha && !inpFecha.value) inpFecha.value = today();
20065:   // Intentar hacer match del servicio en el select
20066:   if (inpServ && servicio) {
20067:     const opts = Array.from(inpServ.options);
20068:     const srv  = servicio.toLowerCase();
20069:     const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
20070:     if (match) inpServ.value = match.value;
20071:   }
20072:   // Scroll suave al formulario
20073:   const form = document.getElementById('recInpVenta');
20074:   if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
20075:   if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
20076: }
20077: 
20078: // ── CAMPAÑA DE REFERIDOS DEL MES ──
20079: // ── helpers de estado por paciente (persisten en localStorage) ──
20080: function _refKey(mesStr, anio, nombre) {
20081:   return `refCamp_${mesStr}${anio}_${(nombre||'').toLowerCase().trim().replace(/\s+/g,'_')}`;
20082: }
```

## Controles del formulario de Base de datos

### Línea 5150

```html
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
```

### Línea 11360

```html
11348:     renderPacientes();
11349:     initDashboard();
11350:   } catch(e) { toast('Error de conexión', 'err'); }
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
11372: function dbOnPlanChange() {
```

### Línea 11361

```html
11349:     initDashboard();
11350:   } catch(e) { toast('Error de conexión', 'err'); }
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
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
```

### Línea 11362

```html
11350:   } catch(e) { toast('Error de conexión', 'err'); }
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
11372: function dbOnPlanChange() {
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
```

### Línea 11365

```html
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
11373:   document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
11374: }
11375: 
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
```

### Línea 11368

```html
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
11376: function renderBasedatos() {
11377:   const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
11378:   const map = {};
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
```

### Línea 11372

```html
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
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
11381:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11382:     const email  = (p.email || '').toLowerCase().trim();
11383:     const nombre = (p.nombre || '').trim();
11384:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
```

### Línea 11373

```html
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
11379:   // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
11380:   (allData.pacientes || []).forEach(function(p) {
11381:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11382:     const email  = (p.email || '').toLowerCase().trim();
11383:     const nombre = (p.nombre || '').trim();
11384:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11385:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
```

### Línea 11377

```html
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
11384:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11385:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11386:   });
11387:   // Luego cruzar con citas (actualizan datos si el paciente ya existe)
11388:   (allData.citas || []).forEach(function(c) {
11389:     const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
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
2797:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2798:           <div style="display:flex;gap:8px">
2799:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
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
2797:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2798:           <div style="display:flex;gap:8px">
2799:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2800:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
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
2797:           <textarea id="voiceText" rows="3" placeholder='Ej: "Cita para María García, mañana a las 3 pm, descarga muscular completa, presencial"' style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;resize:none;margin-bottom:8px" onfocus="this.style.borderColor='var(--primary)'"></textarea>
2798:           <div style="display:flex;gap:8px">
2799:             <button type="button" onclick="procesarVozTexto()" style="flex:1;background:var(--primary);color:#0D0D0D;font-family:var(--font-b);font-size:.88rem;font-weight:600;padding:10px;border:none;border-radius:8px;cursor:pointer">✓ Procesar cita</button>
2800:             <button type="button" onclick="toggleVoicePanel()" style="background:var(--s2);color:var(--muted);font-family:var(--font-b);font-size:.88rem;padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer">Cerrar</button>
2801:           </div>
2802:         </div>
```

### Línea 2800

```html
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
```

### Línea 11896

```html
11884:   if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
11885: }
11886: 
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
11908:     document.getElementById('voiceText').value = '';
```

### Línea 11897

```html
11885: }
11886: 
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
11908:     document.getElementById('voiceText').value = '';
11909:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
```

### Línea 11899

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
11908:     document.getElementById('voiceText').value = '';
11909:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11910:   }
11911: }
```

### Línea 11903

```html
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
11908:     document.getElementById('voiceText').value = '';
11909:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11910:   }
11911: }
11912: 
11913: function procesarVozTexto() {
11914:   const txt = (document.getElementById('voiceText').value || '').trim();
11915:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
```

### Línea 11904

```html
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
11908:     document.getElementById('voiceText').value = '';
11909:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11910:   }
11911: }
11912: 
11913: function procesarVozTexto() {
11914:   const txt = (document.getElementById('voiceText').value || '').trim();
11915:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11916:   _parseVoice(txt);
```

### Línea 11917

```html
11905:   const isOpen = panel.style.display !== 'none';
11906:   panel.style.display = isOpen ? 'none' : 'block';
11907:   if (!isOpen) {
11908:     document.getElementById('voiceText').value = '';
11909:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11910:   }
11911: }
11912: 
11913: function procesarVozTexto() {
11914:   const txt = (document.getElementById('voiceText').value || '').trim();
11915:   if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
11916:   _parseVoice(txt);
11917:   document.getElementById('voicePanel').style.display = 'none';
11918:   document.getElementById('voiceText').value = '';
11919: }
11920: 
11921: function toggleVoice() {
11922:   const SR = _getSR();
11923:   if (!SR) {
11924:     alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
11925:     return;
11926:   }
11927:   if (_voiceActive) { _stopVoice(false); return; }
11928:   _startVoice(SR);
11929: }
```

### Línea 11948

```html
11936:     return;
11937:   }
11938: 
11939:   // Configuración optimizada para iOS Safari
11940:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
```

### Línea 11951

```html
11939:   // Configuración optimizada para iOS Safari
11940:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11962: 
11963:   _voiceRec.onerror = e => {
```

### Línea 11952

```html
11940:   _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
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
11962: 
11963:   _voiceRec.onerror = e => {
11964:     if (e.error === 'not-allowed') {
```

### Línea 11953

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
11962: 
11963:   _voiceRec.onerror = e => {
11964:     if (e.error === 'not-allowed') {
11965:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
```

### Línea 11959

```html
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
11964:     if (e.error === 'not-allowed') {
11965:       alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
11966:     } else if (e.error === 'no-speech') {
11967:       toast('No escuché nada. Toca el botón y habla claramente.', 'err');
11968:     } else {
11969:       toast('Error: ' + e.error, 'err');
11970:     }
11971:     _stopVoice(false);
```

### Línea 12002

```html
11990:     alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
11991:     _stopVoice(false);
11992:   }
11993: }
11994: 
11995: function _stopVoice(showMsg = true) {
11996:   _voiceActive = false;
11997:   if (_voiceRec) {
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
```

### Línea 12008

```html
11996:   _voiceActive = false;
11997:   if (_voiceRec) {
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
12019:   let filled = [];
12020: 
```

### Línea 12156

```html
12144:         document.getElementById('ncPhone').value = known.telefono || '';
12145:         document.getElementById('ncEmail').value = known.email    || '';
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
12167: }
12168: function msgSemana5(nombre) {
```

## Meta mensual y presupuesto

### Línea 4316

```html
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
```

### Línea 4331

```html
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
```

### Línea 4719

```html
4707:               </div>
4708:               <div class="em-card-footer">
4709:                 <button class="em-done-btn" id="emDB_ventas_sem" onclick="markEmDone('ventas_sem',5)">✓ Plan ejecutado</button>
4710:                 <button class="em-reset-btn" onclick="resetEmSteps('ventas_sem',5)">↺ Reiniciar</button>
4711:               </div>
4712:             </div>
4713:           </div>
4714: 
4715:           <!-- KPI: Ventas mes -->
4716:           <div class="em-card" id="emCard_ventas_mes">
4717:             <div class="em-card-hdr" onclick="toggleEmCard('ventas_mes')">
4718:               <div class="em-dot gris" id="emDot_ventas_mes"></div>
4719:               <span class="em-card-title">Ventas mes &lt;80% meta<br><small style="font-weight:400;font-size:.75em;color:var(--muted)">&lt;<span class="kpi-ref" data-ref="meta_ventas_mes">$10.265.000</span></small></span>
4720:               <span class="em-sev c">🔴 Crítico</span>
4721:               <span class="em-card-time">⏱ 45 min</span>
4722:               <span class="em-carr">▼</span>
4723:             </div>
4724:             <div class="em-card-body" id="emBody_ventas_mes">
4725:               <div class="em-symptom">💡 <strong>El mes está comprometido.</strong> Por debajo del 80% de la meta ya no alcanza con citas normales — se necesita una acción extraordinaria. La clave es calcular primero cuánto falta y cuántos días quedan, para saber si el gap es recuperable con citas extra, paquetes, o si hay que activar un plan de contingencia.</div>
4726:               <div class="em-prog-meta" id="emPM_ventas_mes">0 de 6 pasos completados</div>
4727:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_mes" style="width:0%"></div></div>
4728:               <div class="em-steps">
4729:                 <label class="em-step" id="emS_ventas_mes_0" onclick="handleEmStep(event,'ventas_mes',0)"><input type="checkbox" id="emCk_ventas_mes_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Calcular el gap real:</strong> abrir Finanzas, ver cuánto se ha facturado y cuánto falta. Dividirlo entre los días hábiles restantes del mes — ese es el ingreso diario necesario. Si son más de $600k/día extra, el plan de citas no es suficiente solo.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4730:                 <label class="em-step" id="emS_ventas_mes_1" onclick="handleEmStep(event,'ventas_mes',1)"><input type="checkbox" id="emCk_ventas_mes_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Campaña de paquetes con fecha límite:</strong> ofrecer a pacientes activos paquetes pre-pagados con vigencia de 60 días. El pago adelantado ingresa al mes actual aunque las citas se usen después — es la palanca más rápida para cerrar el gap.</span></label>
4731:                 <label class="em-step" id="emS_ventas_mes_2" onclick="handleEmStep(event,'ventas_mes',2)"><input type="checkbox" id="emCk_ventas_mes_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Evento corporativo o grupal de emergencia:</strong> si hay contactos en empresas, gimnasios o equipos deportivos de la zona, ofrecer una jornada de valoraciones express (20–30 min c/u). 10 valoraciones a $80k = $800k en un día, sin costo de adquisición.</span></label>
```

### Línea 12788

```html
12776:       if (_remData) renderRecordatorios(_remData);
12777:     } else toast('Error al enviar email', 'err');
12778:   } catch(e) { toast('Error de conexión', 'err'); }
12779: }
12780: 
12781: // ══════════════════════════════════════════════════════════════
12782: // ── META MENSUAL ──
12783: // ══════════════════════════════════════════════════════════════
12784: function getMeta() {
12785:   // Limpiar metaMensual si tiene valor viejo
12786:   const stored = parseInt(kvGet('metaMensual')||'0', 10);
12787:   if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
12788:   return getKPIConfig().meta_ventas_mes || 10265000;
12789: }
12790: 
12791: function actualizarMetaBarra(cobrado) {
12792:   const meta = getMeta();
12793:   const fill = document.getElementById('metaBarFill');
12794:   const pct  = document.getElementById('metaPct');
12795:   const txt  = document.getElementById('metaTexto');
12796:   const inp  = document.getElementById('metaInput');
12797:   if (!fill) return;
12798:   if (!meta) {
12799:     if (pct) pct.textContent = '';
12800:     if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
```

### Línea 12826

```html
12814:   const cobrado = calcCobradoMes();
12815:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12816:   const fill = document.getElementById('metaBarFill');
12817:   const pct  = document.getElementById('metaPct');
12818:   if (fill) fill.style.width = p + '%';
12819:   if (pct)  pct.textContent  = p + '%';
12820: }
12821: 
12822: function guardarMeta() {
12823:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12824:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12825:   kvSet('metaMensual', val);
12826:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12827:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12828:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12829:   actualizarMetaBarra(calcCobradoMes());
12830:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12831: }
12832: 
12833: function previewMetaFin(v) {
12834:   const n = parseInt(v.replace(/\D/g,''), 10);
12835:   if (!n) return;
12836:   const cobrado = calcCobradoMes();
12837:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12838:   const fill = document.getElementById('metaBarFinFill');
```

### Línea 12827

```html
12815:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12816:   const fill = document.getElementById('metaBarFill');
12817:   const pct  = document.getElementById('metaPct');
12818:   if (fill) fill.style.width = p + '%';
12819:   if (pct)  pct.textContent  = p + '%';
12820: }
12821: 
12822: function guardarMeta() {
12823:   const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
12824:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12825:   kvSet('metaMensual', val);
12826:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12827:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12828:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12829:   actualizarMetaBarra(calcCobradoMes());
12830:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12831: }
12832: 
12833: function previewMetaFin(v) {
12834:   const n = parseInt(v.replace(/\D/g,''), 10);
12835:   if (!n) return;
12836:   const cobrado = calcCobradoMes();
12837:   const p = Math.min(Math.round(cobrado / n * 100), 100);
12838:   const fill = document.getElementById('metaBarFinFill');
12839:   const pct  = document.getElementById('metaBarFinPct');
```

### Línea 12850

```html
12838:   const fill = document.getElementById('metaBarFinFill');
12839:   const pct  = document.getElementById('metaBarFinPct');
12840:   const wrap = document.getElementById('metaBarFinWrap');
12841:   if (wrap) wrap.style.display = 'block';
12842:   if (fill) fill.style.width = p + '%';
12843:   if (pct)  pct.textContent  = p + '%';
12844: }
12845: 
12846: function guardarMetaFin() {
12847:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12848:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12849:   kvSet('metaMensual', val);
12850:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12851:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12852:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12853:   renderFinanzas();
12854:   actualizarMetaBarra(calcCobradoMes());
12855:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12856: }
12857: 
12858: function calcIngresoPaquetesMes(m, y) {
12859:   return _getPkAsignados()
12860:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12861:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12862: }
```

### Línea 12851

```html
12839:   const pct  = document.getElementById('metaBarFinPct');
12840:   const wrap = document.getElementById('metaBarFinWrap');
12841:   if (wrap) wrap.style.display = 'block';
12842:   if (fill) fill.style.width = p + '%';
12843:   if (pct)  pct.textContent  = p + '%';
12844: }
12845: 
12846: function guardarMetaFin() {
12847:   const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
12848:   if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
12849:   kvSet('metaMensual', val);
12850:   const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
12851:   META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
12852:   reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
12853:   renderFinanzas();
12854:   actualizarMetaBarra(calcCobradoMes());
12855:   toast('Meta guardada: $' + val.toLocaleString('es-CO'));
12856: }
12857: 
12858: function calcIngresoPaquetesMes(m, y) {
12859:   return _getPkAsignados()
12860:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12861:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12862: }
12863: function calcCobradoMes(mesParam, anyoParam) {
```

### Línea 13324

```html
13312:     + (c.redes_contenido     || 0)
13313:     + (c.activacion_eventos  || 0)
13314:     + (c.pautas_redes        || 0)
13315:     + (c.mantenimiento       || 0)
13316:     + (c.insumos             || 0);
13317:   const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
13318:   const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
13319:   return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
13320: }
13321: 
13322: const KPI_CONFIG_DEFAULTS = {
13323:   meta_sesiones_semana: 30,
13324:   meta_ventas_mes:      10265000,
13325:   meta_leads_min:       40,
13326:   meta_leads_max:       50,
13327:   meta_conv_min:        25,
13328:   meta_conv_max:        35,
13329:   meta_nps:             90,
13330:   meta_encuestas:       70,
13331:   meta_cancelacion:     10,
13332:   meta_retencion:       60,
13333:   inv_mkt_total:        340000,
13334:   inv_mkt_pauta:        100000,
13335:   inv_mkt_contenido:    240000,
13336:   precio_full:          110000,
```

### Línea 13365

```html
13353:   sv_pkTotal_p:   560000,  sv_pkTotal_d:    722000,
13354:   sv_planActivo_p:135000,  sv_planActivo_d: 165000,
13355:   sv_planPro_p:   230000,  sv_planPro_d:    275000,
13356: };
13357: 
13358: function getKPIConfig() {
13359:   try {
13360:     const stored = kvGet('kpiConfig');
13361:     if (!stored) return {...KPI_CONFIG_DEFAULTS};
13362:     const parsed = JSON.parse(stored);
13363:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13364:     let migrated = false;
13365:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13366:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13367:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13368:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13369:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13370: }
13371: 
13372: const _cfg0 = getKPIConfig();
13373: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13374: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13375: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13376: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13377: let META_NPS             = _cfg0.meta_nps;
```

### Línea 13375

```html
13363:     // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
13364:     let migrated = false;
13365:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13366:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13367:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13368:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13369:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13370: }
13371: 
13372: const _cfg0 = getKPIConfig();
13373: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13374: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13375: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13376: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13377: let META_NPS             = _cfg0.meta_nps;
13378: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13379: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13380: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13381: const META_CAC_MAX         = 80000;
13382: const VENTANA_NUEVO_DIAS   = 180;
13383: const VENTANA_RETENCION    = 60;
13384: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13385: 
13386: function calcBDActualizada(mesParam, anyoParam) {
13387:   const now = new Date();
```

### Línea 13376

```html
13364:     let migrated = false;
13365:     if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
13366:     if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
13367:     if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
13368:     return {...KPI_CONFIG_DEFAULTS, ...parsed};
13369:   } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
13370: }
13371: 
13372: const _cfg0 = getKPIConfig();
13373: // kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
13374: let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
13375: let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
13376: let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
13377: let META_NPS             = _cfg0.meta_nps;
13378: let META_ENCUESTAS       = _cfg0.meta_encuestas;
13379: let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
13380: let META_RETENCION_PCT   = _cfg0.meta_retencion;
13381: const META_CAC_MAX         = 80000;
13382: const VENTANA_NUEVO_DIAS   = 180;
13383: const VENTANA_RETENCION    = 60;
13384: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13385: 
13386: function calcBDActualizada(mesParam, anyoParam) {
13387:   const now = new Date();
13388:   const m = mesParam  || now.getMonth() + 1;
```

### Línea 13433

```html
13421:   return {
13422:     pct:       Math.round((completos / pacs.length) * 100),
13423:     completos,
13424:     total:     pacs.length,
13425:     sinTel,
13426:     sinEmail,
13427:   };
13428: }
13429: 
13430: function reloadMetas() {
13431:   const cfg = getKPIConfig();
13432:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13433:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13434:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13435:   META_NPS             = cfg.meta_nps;
13436:   META_ENCUESTAS       = cfg.meta_encuestas;
13437:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13438:   META_RETENCION_PCT   = cfg.meta_retencion;
13439:   // Sincronizar precios de servicios siempre
13440:   _syncPreciosToAutoFill(cfg);
13441: }
13442: 
13443: function getKPIManual() {
13444:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13445: }
```

### Línea 13434

```html
13422:     pct:       Math.round((completos / pacs.length) * 100),
13423:     completos,
13424:     total:     pacs.length,
13425:     sinTel,
13426:     sinEmail,
13427:   };
13428: }
13429: 
13430: function reloadMetas() {
13431:   const cfg = getKPIConfig();
13432:   META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
13433:   META_VENTAS_MES      = cfg.meta_ventas_mes;
13434:   META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
13435:   META_NPS             = cfg.meta_nps;
13436:   META_ENCUESTAS       = cfg.meta_encuestas;
13437:   META_CANCELACION_PCT = cfg.meta_cancelacion;
13438:   META_RETENCION_PCT   = cfg.meta_retencion;
13439:   // Sincronizar precios de servicios siempre
13440:   _syncPreciosToAutoFill(cfg);
13441: }
13442: 
13443: function getKPIManual() {
13444:   try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
13445: }
13446: function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }
```

### Línea 13674

```html
13662:   // Tarjeta sesiones con lógica de compensación por eventos
13663:   const _revenueOk    = ventasSemana >= META_VENTAS_SEMANA * 0.84;
13664:   const _sessLabel    = nEventosSem > 0 ? `${nCitasSem} citas + ${nEventosSem} evento${nEventosSem>1?'s':''}` : `${sessSemana}`;
13665:   const _sessMetaTxt  = nEventosSem > 0 && _revenueOk
13666:     ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan`
13667:     : `${META_SESIONES_SEMANA} sesiones`;
13668:   // Si hay eventos y los ingresos están bien, no mostrar rojo
13669:   const _sessEvalVal  = (nEventosSem > 0 && _revenueOk) ? META_SESIONES_SEMANA : sessSemana;
13670: 
13671:   let html = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px">`;
13672:   html += kpiCard('📅','Sesiones esta semana', _sessLabel, META_SESIONES_SEMANA, '', true, _sessMetaTxt, _sessEvalVal);
13673:   html += kpiCard('💰','Ventas esta semana', fmtPeso(ventasSemana), META_VENTAS_SEMANA, '', true, fmtPeso(META_VENTAS_SEMANA));
13674:   html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
13675:   html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');
13676: 
13677:   if (tasa !== null) {
13678:     html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
13679:   } else {
13680:     html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
13681:       <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
13682:       <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
13683:     </div>`;
13684:   }
13685: 
13686:   const _encStats  = getEncuestaStats();
```

### Línea 13866

```html
13854:   const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
13855:   const ventasGeneradas = citasMesActivas.reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosMes.reduce((s,e) => s + parsePrecio(e.cobro), 0);
13856:   const ingresosCobrados = (typeof calcCobradoMes === 'function') ? calcCobradoMes() : ventasGeneradas;
13857:   const pagosPendientesLista = citasMesActivas.filter(c => {
13858:     const estado = String(c.estado || '').toLowerCase();
13859:     return estado.includes('pendiente de pago') || estado.includes('pago por verificar') || estado.includes('rechazado');
13860:   });
13861:   const pendienteCobrar = pagosPendientesLista.reduce((s,c) => s + parsePrecio(c.precio), 0);
13862:   const egresosMes = (typeof getEgresos === 'function' ? getEgresos() : [])
13863:     .filter(e => String(e.fecha || '').startsWith(monthKey))
13864:     .reduce((s,e) => s + (Number(e.monto) || parsePrecio(e.monto)), 0);
13865:   const ganancia = ingresosCobrados - egresosMes;
13866:   const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;
13867:   const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;
13868:   const faltante = Math.max(0, metaMensual - ingresosCobrados);
13869: 
13870:   const pacienteMes = {};
13871:   citasMesActivas.forEach(c => { if (c.nombre) pacienteMes[String(c.nombre).trim().toLowerCase()] = c.nombre; });
13872:   let personasNuevas = 0;
13873:   let personasRecurrentes = 0;
13874:   Object.keys(pacienteMes).forEach(key => {
13875:     const tuvoAntes = citasAll.some(c => String(c.nombre || '').trim().toLowerCase() === key && normDate(c.fecha || '') < monthKey + '-01' && !String(c.estado || '').toLowerCase().includes('cancel'));
13876:     if (tuvoAntes) personasRecurrentes++; else personasNuevas++;
13877:   });
13878: 
```

### Línea 14293

```html
14281:   if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
14282:   if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
14283:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14284: }
14285: 
14286: function _guardarCostos() {
14287:   const c    = _leerCamposCostos();
14288:   const calc = calcTotalCostos(c);
14289:   saveCostosEstructura(c);
14290: 
14291:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14292:   const cfg = getKPIConfig();
14293:   cfg.meta_ventas_mes = calc.total;
14294:   kvSet('kpiConfig', JSON.stringify(cfg));
14295:   META_VENTAS_MES    = calc.total;
14296:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14297: 
14298:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14299: 
14300:   // Refrescar todo el reporte
14301:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14302:   setTimeout(() => {
14303:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14304:   }, 60);
14305: }
```

### Línea 14295

```html
14283:   if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
14284: }
14285: 
14286: function _guardarCostos() {
14287:   const c    = _leerCamposCostos();
14288:   const calc = calcTotalCostos(c);
14289:   saveCostosEstructura(c);
14290: 
14291:   // Actualizar la meta de ventas en kpiConfig y en las variables globales
14292:   const cfg = getKPIConfig();
14293:   cfg.meta_ventas_mes = calc.total;
14294:   kvSet('kpiConfig', JSON.stringify(cfg));
14295:   META_VENTAS_MES    = calc.total;
14296:   META_VENTAS_SEMANA = Math.round(calc.total / 4);
14297: 
14298:   toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');
14299: 
14300:   // Refrescar todo el reporte
14301:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14302:   setTimeout(() => {
14303:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14304:   }, 60);
14305: }
14306: 
14307: function _secTitle(icon, title) {
```

### Línea 14533

```html
14521:   const SC = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
14522: 
14523:   // ── Recomendaciones ──
14524:   const mejoras = [];
14525: 
14526:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14527:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14528: 
14529:   if (totalSesiones < metaSesionesMes) {
14530:     const falta = metaSesionesMes-totalSesiones;
14531:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14532:   }
14533:   if (ventasCobradas < META_VENTAS_MES) {
14534:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14535:   }
14536:   if (fullCnt > expressCnt && fullCnt>0) {
14537:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14538:   }
14539:   if (tasaConv!==null && tasaConv<25) {
14540:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14541:   }
14542:   if (tasaCancel>META_CANCELACION_PCT) {
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
```

### Línea 14534

```html
14522: 
14523:   // ── Recomendaciones ──
14524:   const mejoras = [];
14525: 
14526:   const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
14527:   const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
14528: 
14529:   if (totalSesiones < metaSesionesMes) {
14530:     const falta = metaSesionesMes-totalSesiones;
14531:     mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
14532:   }
14533:   if (ventasCobradas < META_VENTAS_MES) {
14534:     mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
14535:   }
14536:   if (fullCnt > expressCnt && fullCnt>0) {
14537:     mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
14538:   }
14539:   if (tasaConv!==null && tasaConv<25) {
14540:     mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
14541:   }
14542:   if (tasaCancel>META_CANCELACION_PCT) {
14543:     mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
14544:   }
14545:   if (noShowsMes.length>0) {
14546:     mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
```

### Línea 14580

```html
14568:   const filaC = (label, key, val) =>
14569:     `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.04)">
14570:       <span style="font-size:.82rem;color:var(--text);flex:1">${label}</span>
14571:       <div style="width:130px;flex-shrink:0">${fci(key, val)}</div>
14572:     </div>`;
14573: 
14574:   let html = '';
14575: 
14576:   // ══════════════════════════════════════════
14577:   // 1 · RESUMEN EJECUTIVO
14578:   // ══════════════════════════════════════════
14579:   const kpisOk   = [
14580:     ventasCobradas >= META_VENTAS_MES,
14581:     totalSesiones  >= metaSesionesMes,
14582:     tasaCancel     <= META_CANCELACION_PCT,
14583:     tasaRet        >= META_RETENCION_PCT,
14584:     npsVal         >= META_NPS,
14585:   ].filter(Boolean).length;
14586:   const totalKpis = 5;
14587:   const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
14588:                 : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
14589:                 : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
14590:                 :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };
14591: 
14592:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
```

### Línea 14625

```html
14613:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${pacUnicosMes}</div>
14614:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">PACIENTES</div>
14615:         </div>
14616:       </div>
14617:     </div>
14618:   </div>`;
14619: 
14620:   // ══════════════════════════════════════════
14621:   // 2 · P&L — ESTADO FINANCIERO
14622:   // ══════════════════════════════════════════
14623:   html += _secTitle('💰','Estado Financiero del Mes');
14624: 
14625:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14626:   const barW    = Math.min(pctMeta, 100);
14627:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14628: 
14629:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14630:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14631:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14632:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14633:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14634:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14635:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14636:       <div style="margin-top:10px">
14637:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
```

### Línea 14635

```html
14623:   html += _secTitle('💰','Estado Financiero del Mes');
14624: 
14625:   const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
14626:   const barW    = Math.min(pctMeta, 100);
14627:   const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';
14628: 
14629:   html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
14630:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14631:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
14632:       ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
14633:       ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
14634:       ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
14635:       ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
14636:       <div style="margin-top:10px">
14637:         <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
14638:           <span>Avance vs meta</span><span style="color:${barCol};font-weight:700">${pctMeta}%</span>
14639:         </div>
14640:         <div style="height:8px;background:var(--s3);border-radius:99px;overflow:hidden">
14641:           <div style="height:100%;width:${barW}%;background:${barCol};border-radius:99px;transition:width .3s"></div>
14642:         </div>
14643:       </div>
14644:     </div>
14645:     <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
14646:       <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Costos reales vs estructura</div>
14647:       ${_rFila('Subtotal costos estimados', fmtPeso(calc.subtotal))}
```

### Línea 14971

```html
14959:   html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
14960:   html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
14961:   html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
14962:   html += `</div>`;
14963: 
14964:   // ══════════════════════════════════════════
14965:   // 8 · SEMÁFORO COMPLETO DE KPIs
14966:   // ══════════════════════════════════════════
14967:   html += _secTitle('🚦','Semáforo Completo de Indicadores');
14968:   html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
14969:   const rows = [
14970:     ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
14971:     ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
14972:     ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
14973:     ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
14974:     ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
14975:     ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
14976:     ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
14977:     ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
14978:     ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
14979:     ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
14980:     ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
14981:     ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
14982:   ];
14983:   rows.forEach(([icon,label,val,c,sub]) => {
```

### Línea 15683

```html
15671:       </div>
15672:     </div>
15673:     <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;
15674: 
15675:   const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
15676:   const _sess1Meta  = esMesActual
15677:     ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
15678:     : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
15679:   html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
15680:   html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
15681:   html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
15682:   html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
15683:   html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
15684:   const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
15685:     ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
15686:     : `>${META_ENCUESTAS}%`;
15687:   html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
15688:   const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
15689:     ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
15690:     : `>${META_NPS}`;
15691:   html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
15692:   const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
15693:   html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
15694:   html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
15695:   html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
```

### Línea 15730

```html
15718:     .map(p => p.nombre).sort();
15719: 
15720:   html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
15721:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15722:   // Cálculo: sesiones diarias necesarias para cumplir meta
15723:   if (esMesActual) {
15724:     const diasEnMes = new Date(y, m, 0).getDate();
15725:     let diasRestantes = 0;
15726:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15727:       const dow = new Date(y, m - 1, d).getDay();
15728:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15729:     }
15730:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15731:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15732:     const avgPrecio     = citasMesHechas.length > 0
15733:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15734:       : (getKPIConfig().precio_full || 80000);
15735:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15736:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15737:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15738:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15739:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15740:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15741:     const textoBanner        = metaYaCumplida
15742:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
```

### Línea 15737

```html
15725:     let diasRestantes = 0;
15726:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15727:       const dow = new Date(y, m - 1, d).getDay();
15728:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15729:     }
15730:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15731:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15732:     const avgPrecio     = citasMesHechas.length > 0
15733:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15734:       : (getKPIConfig().precio_full || 80000);
15735:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15736:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15737:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15738:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15739:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15740:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15741:     const textoBanner        = metaYaCumplida
15742:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15743:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15744:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15745:       ${iconoBanner} ${textoBanner}
15746:     </div>`;
15747:   }
15748: 
15749:   if (!esMesActual) {
```

### Línea 15742

```html
15730:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15731:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
15732:     const avgPrecio     = citasMesHechas.length > 0
15733:       ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
15734:       : (getKPIConfig().precio_full || 80000);
15735:     const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
15736:     const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
15737:     const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
15738:     const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
15739:     const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
15740:     const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
15741:     const textoBanner        = metaYaCumplida
15742:       ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
15743:       : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
15744:     html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
15745:       ${iconoBanner} ${textoBanner}
15746:     </div>`;
15747:   }
15748: 
15749:   if (!esMesActual) {
15750:     html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
15751:       ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
15752:     </div>`;
15753:   }
15754: 
```

### Línea 15779

```html
15767:       💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
15768:     </div>
15769:     <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
15770:       <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
15771:         style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
15772:         ⚙️ Editar valores de referencia
15773:       </button>
15774:       <div id="kpiConfigBody" style="display:none;margin-top:14px">
15775:         <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
15776:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
15777:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15778:           ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
15779:           ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
15780:           ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
15781:           ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
15782:           ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
15783:           ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
15784:           ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
15785:           ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
15786:         </div>
15787:         <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
15788:         <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
15789:           ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
15790:           ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
15791:           ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
```

### Línea 15817

```html
15805:       </div>
15806:     </div>
15807:   </div>`;
15808: 
15809:   // Exportar datos para el Manual de Emergencia
15810:   window._emKPIData = {
15811:     sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
15812:     fullPct:       fullPct,           totalMix:      totalMix,
15813:     tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
15814:     leadsShow:     leadsShow || 0,
15815:     tasaConv:      tasaConv,
15816:     ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
15817:     ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
15818:     nps:           isNaN(nps)       ? 0 : nps,
15819:     npsMeta:       META_NPS,
15820:     encuestas:     isNaN(encuestas) ? 0 : encuestas,
15821:     encMeta:       META_ENCUESTAS,
15822:     bd:            isNaN(bd)        ? 0 : bd,
15823:   };
15824: 
15825:   el.innerHTML = html;
15826:   applyKPIFavorites();
15827:   applyKPIRefSpans();
15828:   _renderCancelBreakdown();
15829:   _renderBDBreakdown();
```

### Línea 16128

```html
16116: function applyKPIRefSpans() {
16117:   const cfg = getKPIConfig();
16118:   const fmt = v => v >= 1000 ? '$' + Number(v).toLocaleString('es-CO') : String(v);
16119:   const map = {
16120:     inv_mkt_total:     fmt(cfg.inv_mkt_total),
16121:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16122:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16123:     precio_full:       fmt(cfg.precio_full),
16124:     duracion_full:     String(cfg.duracion_full),
16125:     precio_express:    fmt(cfg.precio_express),
16126:     duracion_express:  String(cfg.duracion_express),
16127:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16128:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16129:     meta_leads_min:    String(cfg.meta_leads_min),
16130:     meta_leads_max:    String(cfg.meta_leads_max),
16131:     meta_conv_min:     String(cfg.meta_conv_min),
16132:     meta_conv_max:     String(cfg.meta_conv_max),
16133:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16134:   };
16135:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16136:     const v = map[el.dataset.ref];
16137:     if (v !== undefined) el.textContent = v;
16138:   });
16139: }
16140: 
```

### Línea 16133

```html
16121:     inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
16122:     inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
16123:     precio_full:       fmt(cfg.precio_full),
16124:     duracion_full:     String(cfg.duracion_full),
16125:     precio_express:    fmt(cfg.precio_express),
16126:     duracion_express:  String(cfg.duracion_express),
16127:     meta_sesiones:     String(cfg.meta_sesiones_semana),
16128:     meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
16129:     meta_leads_min:    String(cfg.meta_leads_min),
16130:     meta_leads_max:    String(cfg.meta_leads_max),
16131:     meta_conv_min:     String(cfg.meta_conv_min),
16132:     meta_conv_max:     String(cfg.meta_conv_max),
16133:     meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
16134:   };
16135:   document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
16136:     const v = map[el.dataset.ref];
16137:     if (v !== undefined) el.textContent = v;
16138:   });
16139: }
16140: 
16141: function renderPresupuestoMetas() {
16142:   const el = document.getElementById('presupuestoBody');
16143:   if (!el) return;
16144:   const costos = getCostosEstructura();
16145:   const calc   = calcTotalCostos(costos);
```

### Línea 16252

```html
16240:           💾 Guardar presupuesto y actualizar metas
16241:         </button>
16242: 
16243:       </div>
16244: 
16245:       <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
16246:       <div style="display:flex;flex-direction:column;gap:16px">
16247: 
16248:         <div class="card">
16249:           <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
16250:           <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
16251:             ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
16252:             ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
16253:             ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
16254:             ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
16255:             ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
16256:             ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
16257:             ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
16258:             ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
16259:           </div>
16260:         </div>
16261: 
16262:         <div class="card">
16263:           <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
16264:           <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>
```

### Línea 16368

```html
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
```

### Línea 16370

```html
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
```

### Línea 16371

```html
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
```

### Línea 16372

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
16381:   renderPresupuestoMetas();
16382: }
16383: 
16384: function pmGuardarKPIs() {
```

### Línea 16374

```html
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
```

### Línea 16389

```html
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
```

### Línea 16434

```html
16422:   cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
16423:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16424:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16425:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16426:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16427:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16428:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16429:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16430:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16431:   // Mantener precio_full apuntando a Completa
16432:   cfg.precio_full           = cfg.sv_completa_p;
16433:   kvSet('kpiConfig', JSON.stringify(cfg));
16434:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16435:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16436:   // Actualizar autoFillPrice con los nuevos precios
16437:   _syncPreciosToAutoFill(cfg);
16438:   reloadMetas();
16439:   applyKPIRefSpans();
16440:   actualizarMetaBarra(calcCobradoMes());
16441:   toast('✅ Precios y metas guardados', 'ok');
16442:   renderPresupuestoMetas();
16443: }
16444: 
16445: function _syncPreciosToAutoFill(cfg) {
16446:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
```

### Línea 16435

```html
16423:   cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
16424:   cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
16425:   cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
16426:   cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
16427:   cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
16428:   cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
16429:   cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
16430:   cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
16431:   // Mantener precio_full apuntando a Completa
16432:   cfg.precio_full           = cfg.sv_completa_p;
16433:   kvSet('kpiConfig', JSON.stringify(cfg));
16434:   kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
16435:   META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
16436:   // Actualizar autoFillPrice con los nuevos precios
16437:   _syncPreciosToAutoFill(cfg);
16438:   reloadMetas();
16439:   applyKPIRefSpans();
16440:   actualizarMetaBarra(calcCobradoMes());
16441:   toast('✅ Precios y metas guardados', 'ok');
16442:   renderPresupuestoMetas();
16443: }
16444: 
16445: function _syncPreciosToAutoFill(cfg) {
16446:   // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
16447:   window._preciosOverride = {
```

### Línea 16473

```html
16461:     'Plan Pro':                             { Presencial: '$'+Number(cfg.sv_planPro_p||230000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_planPro_d||275000).toLocaleString('es-CO') },
16462:   };
16463: }
16464: 
16465: function guardarKPIConfig() {
16466:   const get = key => {
16467:     const el = document.getElementById('kcfg_' + key);
16468:     return el ? (parseInt(el.value, 10) || 0) : undefined;
16469:   };
16470:   const prev = getKPIConfig();
16471:   const updated = {
16472:     meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
16473:     meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
16474:     meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
16475:     meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
16476:     meta_nps:             get('meta_nps')             ?? prev.meta_nps,
16477:     meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
16478:     meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
16479:     meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
16480:     meta_cancelacion:     prev.meta_cancelacion,
16481:     meta_retencion:       prev.meta_retencion,
16482:     inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
16483:     inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
16484:     inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
16485:     precio_full:          get('precio_full')          ?? prev.precio_full,
```
