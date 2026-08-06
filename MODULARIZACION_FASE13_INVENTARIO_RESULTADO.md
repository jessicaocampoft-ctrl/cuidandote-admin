# Inventario corregido — Fase 13 Metas y Presupuesto

- Declaraciones de función reales: **600**.
- Candidatas por nombre: **19**.
- Método: declaraciones al inicio de línea; ignora texto dentro de plantillas HTML.

## Funciones candidatas

### getMeta

- Línea: 10955
- Llamadas internas: `getKPIConfig`, `getMeta`, `kvGet`, `kvSet`
- Almacenamiento: `metaMensual`
- IDs: ninguno

```javascript
function getMeta() {
  // Limpiar metaMensual si tiene valor viejo
  const stored = parseInt(kvGet('metaMensual')||'0', 10);
  if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
  return getKPIConfig().meta_ventas_mes || 10265000;
}
```

### actualizarMetaBarra

- Línea: 10962
- Llamadas internas: `actualizarMetaBarra`, `getMeta`
- Almacenamiento: ninguno
- IDs: `metaBarFill`, `metaInput`, `metaPct`, `metaTexto`

```javascript
function actualizarMetaBarra(cobrado) {
  const meta = getMeta();
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  const txt  = document.getElementById('metaTexto');
  const inp  = document.getElementById('metaInput');
  if (!fill) return;
  if (!meta) {
    if (pct) pct.textContent = '';
    if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
    if (fill) fill.style.width = '0%';
    return;
  }
  const p = Math.min(Math.round(cobrado / meta * 100), 100);
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
  if (txt)  txt.textContent  = '$' + cobrado.toLocaleString('es-CO') + ' de $' + meta.toLocaleString('es-CO') + ' meta';
  if (inp && !inp.value) inp.value = meta.toLocaleString('es-CO');
}
```

### previewMeta

- Línea: 10982
- Llamadas internas: `calcCobradoMes`, `previewMeta`
- Almacenamiento: ninguno
- IDs: `metaBarFill`, `metaPct`

```javascript
function previewMeta(v) {
  const n = parseInt(v.replace(/\D/g,''), 10);
  if (!n) return;
  const cobrado = calcCobradoMes();
  const p = Math.min(Math.round(cobrado / n * 100), 100);
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
}
```

### guardarMeta

- Línea: 10993
- Llamadas internas: `actualizarMetaBarra`, `applyKPIRefSpans`, `calcCobradoMes`, `getKPIConfig`, `guardarMeta`, `kvSet`, `reloadMetas`, `renderPresupuestoMetas`, `toast`
- Almacenamiento: `kpiConfig`, `metaMensual`
- IDs: `metaInput`

```javascript
function guardarMeta() {
  const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
  if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
  kvSet('metaMensual', val);
  const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
  reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
  actualizarMetaBarra(calcCobradoMes());
  toast('Meta guardada: $' + val.toLocaleString('es-CO'));
}
```

### previewMetaFin

- Línea: 11004
- Llamadas internas: `calcCobradoMes`, `previewMetaFin`
- Almacenamiento: ninguno
- IDs: `metaBarFinFill`, `metaBarFinPct`, `metaBarFinWrap`

```javascript
function previewMetaFin(v) {
  const n = parseInt(v.replace(/\D/g,''), 10);
  if (!n) return;
  const cobrado = calcCobradoMes();
  const p = Math.min(Math.round(cobrado / n * 100), 100);
  const fill = document.getElementById('metaBarFinFill');
  const pct  = document.getElementById('metaBarFinPct');
  const wrap = document.getElementById('metaBarFinWrap');
  if (wrap) wrap.style.display = 'block';
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
}
```

### guardarMetaFin

- Línea: 11017
- Llamadas internas: `actualizarMetaBarra`, `applyKPIRefSpans`, `calcCobradoMes`, `getKPIConfig`, `guardarMetaFin`, `kvSet`, `reloadMetas`, `renderFinanzas`, `renderPresupuestoMetas`, `toast`
- Almacenamiento: `kpiConfig`, `metaMensual`
- IDs: `metaInputFin`

```javascript
function guardarMetaFin() {
  const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
  if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
  kvSet('metaMensual', val);
  const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
  reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
  renderFinanzas();
  actualizarMetaBarra(calcCobradoMes());
  toast('Meta guardada: $' + val.toLocaleString('es-CO'));
}
```

### getCostosEstructura

- Línea: 11205
- Llamadas internas: `getCostosEstructura`, `kvGet`
- Almacenamiento: `costosEstructura`
- IDs: ninguno

```javascript
function getCostosEstructura() {
  try {
    const s = kvGet('costosEstructura');
    if (!s) return {...COSTOS_DEFAULTS};
    const stored = JSON.parse(s);
    // Migración: corregir valores desactualizados
    if (stored.asesorias_ap    === 790000) stored.asesorias_ap    = 480000;
    if (stored.redes_contenido === 150000) stored.redes_contenido = 240000;
    // Agregar campos nuevos si faltan
    if (!stored.asistente_fisio)    stored.asistente_fisio    = 1200000;
    if (!stored.arriendo)           stored.arriendo            = 450000;
    if (!stored.servicios_publicos) stored.servicios_publicos  = 50000;
    if (!stored.activacion_eventos) stored.activacion_eventos  = 300000;
    return {...COSTOS_DEFAULTS, ...stored};
  } catch(e) { return {...COSTOS_DEFAULTS}; }
}
```

### saveCostosEstructura

- Línea: 11222
- Llamadas internas: `kvSet`, `saveCostosEstructura`
- Almacenamiento: `costosEstructura`
- IDs: ninguno

```javascript
function saveCostosEstructura(obj) {
  kvSet('costosEstructura', JSON.stringify(obj));
}
```

### calcTotalCostos

- Línea: 11226
- Llamadas internas: `calcTotalCostos`
- Almacenamiento: ninguno
- IDs: ninguno

```javascript
function calcTotalCostos(c) {
  const subtotal = (c.honorarios_fisio   || 0)
    + (c.seguridad_social    || 0)
    + (c.asistente_fisio     || 0)
    + (c.auxiliar_admin      || 0)
    + (c.arriendo            || 0)
    + (c.servicios_publicos  || 0)
    + (c.suscripcion_ia      || 0)
    + (c.suscripcion_capcut  || 0)
    + (c.asesorias_ap        || 0)
    + (c.redes_contenido     || 0)
    + (c.activacion_eventos  || 0)
    + (c.pautas_redes        || 0)
    + (c.mantenimiento       || 0)
    + (c.insumos             || 0);
  const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
  const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
  return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
}
```

### reloadMetas

- Línea: 11278
- Llamadas internas: `_syncPreciosToAutoFill`, `getKPIConfig`, `reloadMetas`
- Almacenamiento: ninguno
- IDs: ninguno

```javascript
function reloadMetas() {
  const cfg = getKPIConfig();
  META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
  META_VENTAS_MES      = cfg.meta_ventas_mes;
  META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
  META_NPS             = cfg.meta_nps;
  META_ENCUESTAS       = cfg.meta_encuestas;
  META_CANCELACION_PCT = cfg.meta_cancelacion;
  META_RETENCION_PCT   = cfg.meta_retencion;
  // Sincronizar precios de servicios siempre
  _syncPreciosToAutoFill(cfg);
}
```

### _toggleEditCostos

- Línea: 11884
- Llamadas internas: `_toggleEditCostos`
- Almacenamiento: ninguno
- IDs: `btnEditCostos`, `costosEditorPanel`, `costosVistaCompacta`

```javascript
function _toggleEditCostos() {
  const panel   = document.getElementById('costosEditorPanel');
  const compact = document.getElementById('costosVistaCompacta');
  const btn     = document.getElementById('btnEditCostos');
  const open    = panel.style.display === 'none';
  panel.style.display   = open ? 'block' : 'none';
  compact.style.display = open ? 'none'  : 'block';
  btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
}
```

### _leerCamposCostos

- Línea: 11894
- Llamadas internas: `_leerCamposCostos`
- Almacenamiento: ninguno
- IDs: ninguno

```javascript
function _leerCamposCostos() {
  const c = {...COSTOS_DEFAULTS};
  document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
    c[inp.dataset.costo] = parseFloat(inp.value) || 0;
  });
  return c;
}
```

### _recalcCostos

- Línea: 11902
- Llamadas internas: `_leerCamposCostos`, `_recalcCostos`, `calcTotalCostos`, `fmtPeso`
- Almacenamiento: ninguno
- IDs: ninguno

```javascript
function _recalcCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  const el   = id => document.getElementById(id);
  if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
  if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
  if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
  if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
}
```

### _guardarCostos

- Línea: 11912
- Llamadas internas: `_buildReporteMes`, `_guardarCostos`, `_leerCamposCostos`, `calcTotalCostos`, `fmtPeso`, `getKPIConfig`, `kvSet`, `saveCostosEstructura`, `toast`
- Almacenamiento: `kpiConfig`
- IDs: `reporteMesBody`

```javascript
function _guardarCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  saveCostosEstructura(c);

  // Actualizar la meta de ventas en kpiConfig y en las variables globales
  const cfg = getKPIConfig();
  cfg.meta_ventas_mes = calc.total;
  kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES    = calc.total;
  META_VENTAS_SEMANA = Math.round(calc.total / 4);

  toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');

  // Refrescar todo el reporte
  document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
  setTimeout(() => {
    document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
  }, 60);
}
```

### renderPresupuestoMetas

- Línea: 13287
- Llamadas internas: `calcTotalCostos`, `getCostosEstructura`, `getKPIConfig`, `pmGuardarCostos`, `pmGuardarKPIs`, `pmRecalc`, `renderPresupuestoMetas`
- Almacenamiento: ninguno
- IDs: `presupuestoBody`

```javascript
function renderPresupuestoMetas() {
  const el = document.getElementById('presupuestoBody');
  if (!el) return;
  const costos = getCostosEstructura();
  const calc   = calcTotalCostos(costos);
  const cfg    = getKPIConfig();

  const fmtN = v => Number(v).toLocaleString('es-CO');

  const inpDoble = (idP, idD, label, valP, valD) => `
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;align-items:center;gap:8px;margin-bottom:6px">
      <div style="font-size:.78rem;color:var(--text)">${label}</div>
      <input type="number" id="pm_${idP}" value="${valP}" placeholder="Presencial" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" title="Precio presencial">
      <input type="number" id="pm_${idD}" value="${valD}" placeholder="Domicilio" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid rgba(99,102,241,.3);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='rgba(99,102,241,.3)'" title="Precio domicilio">
    </div>`;

  const inp = (id, label, val, note='', tipo='number') => `
    <div>
      <label style="font-size:.75rem;color:var(--muted);display:block;margin-bottom:4px;font-family:var(--font-m)">${label}${note?`<span style="font-size:.68rem;color:var(--primary);margin-left:5px">${note}</span>`:''}</label>
      <input type="${tipo}" id="pm_${id}" value="${val}" oninput="pmRecalc()"
        style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
    </div>`;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">

      <!-- COLUMNA IZQUIERDA: COSTOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">💼 Costos Fijos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('honorarios_fisio',  'Honorarios Fisio',       costos.honorarios_fisio)}
            ${inp('seguridad_social',  'Seguridad Social',       costos.seguridad_social)}
            ${inp('asistente_fisio',   'Asistente Fisio',        costos.asistente_fisio)}
            ${inp('auxiliar_admin',    'Auxiliar Administrativa', costos.auxiliar_admin)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🏢 Costos Operativos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('arriendo',           'Arriendo',            costos.arriendo)}
            ${inp('servicios_publicos', 'Servicios públicos',  costos.servicios_publicos)}
            ${inp('suscripcion_ia',     'Suscripción IA',      costos.suscripcion_ia)}
            ${inp('suscripcion_capcut', 'Suscripción CapCut',  costos.suscripcion_capcut)}
            ${inp('asesorias_ap',       'Asesorías AP x4/Mes', costos.asesorias_ap)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📣 Costos Variables</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('redes_contenido',    'Redes Sociales Contenido',  costos.redes_contenido)}
            ${inp('activacion_eventos', 'Activación marca-Eventos',  costos.activacion_eventos)}
            ${inp('pautas_redes',       'Pautas Redes',              costos.pautas_redes)}
            ${inp('mantenimiento',      'Mantenimiento y compras',   costos.mantenimiento)}
            ${inp('insumos',            'Insumos',                   costos.insumos)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📊 Porcentajes adicionales</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('pct_imprevistos', 'Fondo Imprevistos (%)', costos.pct_imprevistos)}
            ${inp('pct_utilidad',    'Utilidad Deseada (%)',  costos.pct_utilidad)}
          </div>
        </div>

        <!-- Resumen calculado -->
        <div class="card" style="background:rgba(27,191,176,.05);border:1.5px solid rgba(27,191,176,.3)">
          <div class="card-title" style="margin-bottom:12px">🧮 Resultado calculado</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">SUBTOTAL COSTOS</div>
              <div id="pm_res_subtotal" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${fmtN(calc.subtotal)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">IMPREVISTOS</div>
              <div id="pm_res_imprevistos" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:#f59e0b">$${fmtN(calc.imprevistos)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">UTILIDAD OBJETIVO</div>
              <div id="pm_res_utilidad" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--ok)">$${fmtN(calc.utilidad)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--primary);border-radius:8px">
              <div style="font-size:.7rem;color:rgba(0,0,0,.6);font-family:var(--font-m);margin-bottom:3px">META TOTAL / MES</div>
              <div id="pm_res_total" style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:#0D0D0D">$${fmtN(calc.total)}</div>
            </div>
          </div>
        </div>

        <button onclick="pmGuardarCostos()"
          style="padding:12px 24px;background:var(--primary);color:#0D0D0D;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar presupuesto y actualizar metas
        </button>

      </div>

      <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
            ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
            ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
            ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
            ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
            ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
            ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
            ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
          <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>

          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
            <div></div>
            <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
            <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
          </div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Descargas musculares</div>
          ${inpDoble('sv_cuello_p','sv_cuello_d','Cuello y Espalda',cfg.sv_cuello_p||75000,cfg.sv_cuello_d||90000)}
          ${inpDoble('sv_piernas_p','sv_piernas_d','Piernas',cfg.sv_piernas_p||75000,cfg.sv_piernas_d||90000)}
          ${inpDoble('sv_completa_p','sv_completa_d','Completa (Full)',cfg.sv_completa_p||110000,cfg.sv_completa_d||125000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Sesiones individuales</div>
          ${inpDoble('sv_valoracion_p','sv_valoracion_d','Valoración Funcional',cfg.sv_valoracion_p||80000,cfg.sv_valoracion_d||95000)}
          ${inpDoble('sv_readap_p','sv_readap_d','Readaptación Funcional',cfg.sv_readap_p||70000,cfg.sv_readap_d||85000)}
          ${inpDoble('sv_express_p','sv_express_d','Descarga Express',cfg.precio_express||75000,cfg.sv_express_d||90000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Combos y sesiones especiales</div>
          ${inpDoble('sv_diag_p','sv_diag_d','Combo Diagnóstico Pro',cfg.sv_diag_p||160000,cfg.sv_diag_d||185000)}
          ${inpDoble('sv_bienvenida_p','sv_bienvenida_d','Combo Bienvenida',cfg.sv_bienvenida_p||120000,cfg.sv_bienvenida_d||120000)}
          ${inpDoble('sv_mini_p','sv_mini_d','Mini-sesión Familiar 20min',cfg.sv_mini_p||40000,cfg.sv_mini_d||40000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Paquetes Readaptación</div>
          ${inpDoble('sv_pkInicio_p','sv_pkInicio_d','Paquete Inicio (6 ses)',cfg.sv_pkInicio_p||378000,cfg.sv_pkInicio_d||469000)}
          ${inpDoble('sv_pkAvance_p','sv_pkAvance_d','Paquete Avance (8 ses)',cfg.sv_pkAvance_p||476000,cfg.sv_pkAvance_d||598000)}
          ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
          ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
          ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
          ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}

          <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
            💡 Ticket promedio individual (sesiones sueltas):
            <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
            · Sesiones necesarias/mes:
            <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
            ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
            ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
          </div>
        </div>

        <button onclick="pmGuardarKPIs()"
          style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar metas de KPIs
        </button>

      </div>
    </div>`;
}
```

### pmRecalc

- Línea: 13468
- Llamadas internas: `calcTotalCostos`, `pmRecalc`
- Almacenamiento: ninguno
- IDs: `pm_sess_calc`, `pm_ticket_avg`

```javascript
function pmRecalc() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const c = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc  = calcTotalCostos(c);
  const fmtN  = v => Number(v).toLocaleString('es-CO');
  const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
  set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
  set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
  set('pm_res_total',       '$' + fmtN(calc.total));
  // Actualizar ticket promedio
  // Ticket promedio = promedio de los 6 servicios individuales (presencial)
  const indivPrecios = [
    g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
    g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
  ];
  const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
  const ta = document.getElementById('pm_ticket_avg');
  const sc = document.getElementById('pm_sess_calc');
  if (ta) ta.textContent = '$' + fmtN(ticket);
  if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
}
```

### pmGuardarCostos

- Línea: 13500
- Llamadas internas: `applyKPIRefSpans`, `calcTotalCostos`, `getKPIConfig`, `kvSet`, `pmGuardarCostos`, `reloadMetas`, `renderPresupuestoMetas`, `saveCostosEstructura`, `toast`
- Almacenamiento: `kpiConfig`, `metaMensual`
- IDs: `pm_kpi_ventas_mes`

```javascript
function pmGuardarCostos() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const costos = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc = calcTotalCostos(costos);
  saveCostosEstructura(costos);
  // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
  const cfg = getKPIConfig();
  const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
  if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
    cfg.meta_ventas_mes = inputMeta;
    kvSet('kpiConfig', JSON.stringify(cfg));
    META_VENTAS_MES    = inputMeta;
    META_VENTAS_SEMANA = Math.round(inputMeta / 4);
    kvSet('metaMensual', inputMeta);
  }
  reloadMetas();
  applyKPIRefSpans();
  toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
  renderPresupuestoMetas();
}
```

### pmGuardarKPIs

- Línea: 13530
- Llamadas internas: `_syncPreciosToAutoFill`, `actualizarMetaBarra`, `applyKPIRefSpans`, `calcCobradoMes`, `getKPIConfig`, `kvSet`, `pmGuardarKPIs`, `reloadMetas`, `renderPresupuestoMetas`, `toast`
- Almacenamiento: `kpiConfig`, `metaMensual`
- IDs: ninguno

```javascript
function pmGuardarKPIs() {
  const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
  const cfg = getKPIConfig();
  // Metas operativas
  cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
  cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
  cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
  cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
  cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
  cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
  cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
  cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
  // Marketing
  cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
  cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
  cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
  // Precios servicios (presencial y domicilio)
  cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
  cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
  cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
  cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
  cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
  cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
  cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
  cfg.sv_valoracion_d       = g('sv_valoracion_d')|| 95000;
  cfg.sv_readap_p           = g('sv_readap_p')    || 70000;
  cfg.sv_readap_d           = g('sv_readap_d')    || 85000;
  cfg.precio_express        = g('sv_express_p')   || 75000;
  cfg.sv_express_d          = g('sv_express_d')   || 90000;
  cfg.sv_diag_p             = g('sv_diag_p')      || 160000;
  cfg.sv_diag_d             = g('sv_diag_d')      || 185000;
  cfg.sv_bienvenida_p       = g('sv_bienvenida_p')|| 120000;
  cfg.sv_bienvenida_d       = g('sv_bienvenida_d')|| 120000;
  cfg.sv_mini_p             = g('sv_mini_p')      || 40000;
  cfg.sv_mini_d             = g('sv_mini_d')      || 40000;
  cfg.sv_pkInicio_p         = g('sv_pkInicio_p')  || 378000;
  cfg.sv_pkInicio_d         = g('sv_pkInicio_d')  || 469000;
  cfg.sv_pkAvance_p         = g('sv_pkAvance_p')  || 476000;
  cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
  cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
  cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
  cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
  cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
  cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
  cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
  cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
  cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
  // Mantener precio_full apuntando a Completa
  cfg.precio_full           = cfg.sv_completa_p;
  kvSet('kpiConfig', JSON.stringify(cfg));
  kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
  META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
  // Actualizar autoFillPrice con los nuevos precios
  _syncPreciosToAutoFill(cfg);
  reloadMetas();
  applyKPIRefSpans();
  actualizarMetaBarra(calcCobradoMes());
  toast('✅ Precios y metas guardados', 'ok');
  renderPresupuestoMetas();
}
```

### renderEstructuraFinanciera

- Línea: 13622
- Llamadas internas: `renderEstructuraFinanciera`
- Almacenamiento: ninguno
- IDs: ninguno

```javascript
function renderEstructuraFinanciera(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.renderEstructuraFinanciera !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: renderEstructuraFinanciera');
  }
  return module.renderEstructuraFinanciera(...args);
}

// ══════════════════════════════════════════════════════════════
// ── MÉTRICAS INTELIGENTES ──
// ══════════════════════════════════════════════════════════════
```

## Todas las declaraciones relacionadas por línea

- L1809: `<button class="sb-link" id="sb-presupuesto" data-tooltip="Presupuesto y Metas" onclick="showView('presupuesto')">`
- L1811: `Presupuesto y Metas`
- L2042: `<div class="meta-bar-wrap"><div class="meta-bar-fill" id="metaBarFill" style="width:0%"></div></div>`
- L2049: `<input type="text" id="metaInput" placeholder="Ej: 10.000.000" style="width:130px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:7px 10px;outline:none" oninput="previewMeta(this.value)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">`
- L3600: `<input type="text" id="metaInputFin" placeholder="Ej: 10.000.000" oninput="previewMetaFin(this.value)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">`
- L3604: `<div id="metaBarFinWrap" style="display:none">`
- L3605: `<div class="meta-bar-wrap" style="height:14px"><div class="meta-bar-fill" id="metaBarFinFill" style="width:0%"></div></div>`
- L3607: `<span class="meta-pct" id="metaBarFinPct">0%</span>`
- L3608: `<span style="font-family:var(--font-m);font-size:.72rem;color:var(--muted)" id="metaBarFinTexto"></span>`
- L3982: `<!-- ── PRESUPUESTO Y METAS ── -->`
- L3983: `<section id="vPresupuesto" style="display:none">`
- L3985: `<h1 class="page-title">⚙️ <em>Presupuesto</em> y Metas</h1>`
- L3988: `<div id="presupuestoBody"></div>`
- L4542: `<div class="em-prog-meta" id="emPM_sesiones">0 de 7 pasos completados</div>`
- L4550: `<label class="em-step" id="emS_sesiones_5" onclick="handleEmStep(event,'sesiones',5)"><input type="checkbox" id="emCk_sesiones_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Activar pauta extra:</strong> si el hueco persiste más de 2 días, aumentar presupuesto de pauta ese día con creatividad de urgencia y CTA directo a WhatsApp.</span></label>`
- L4571: `<div class="em-prog-meta" id="emPM_mixfull">0 de 5 pasos completados</div>`
- L4598: `<div class="em-prog-meta" id="emPM_cancel">0 de 6 pasos completados</div>`
- L4638: `<div class="em-prog-meta" id="emPM_leads">0 de 6 pasos completados</div>`
- L4641: `<label class="em-step" id="emS_leads_0" onclick="handleEmStep(event,'leads',0)"><input type="checkbox" id="emCk_leads_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Verificar el estado de la pauta:</strong> entrar a Meta Ads o la plataforma que se usa y confirmar que la campaña está activa, el presupuesto no se agotó y el anuncio no fue rechazado. Un anuncio pausado puede pasar semanas sin que nadie lo note.</span></label>`
- L4666: `<div class="em-prog-meta" id="emPM_conv">0 de 6 pasos completados</div>`
- L4706: `<div class="em-prog-meta" id="emPM_ventas_sem">0 de 5 pasos completados</div>`
- L4733: `<div class="em-prog-meta" id="emPM_ventas_mes">0 de 6 pasos completados</div>`
- L4773: `<div class="em-prog-meta" id="emPM_nps">0 de 6 pasos completados</div>`
- L4801: `<div class="em-prog-meta" id="emPM_enc">0 de 5 pasos completados</div>`
- L4828: `<div class="em-prog-meta" id="emPM_bd">0 de 5 pasos completados</div>`
- L4855: `<div class="em-prog-meta" id="emPM_retencion">0 de 6 pasos completados</div>`
- L7481: `guiakpis:'finanzas', comisiones:'finanzas', presupuesto:'finanzas', recordatorios:'agenda',`
- L8541: `actualizarMetaBarra(cobrado);`
- L10956: `// Limpiar metaMensual si tiene valor viejo`
- L10957: `const stored = parseInt(kvGet('metaMensual')||'0', 10);`
- L10958: `if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }`
- L10962: `function actualizarMetaBarra(cobrado) {`
- L10964: `const fill = document.getElementById('metaBarFill');`
- L10967: `const inp  = document.getElementById('metaInput');`
- L10987: `const fill = document.getElementById('metaBarFill');`
- L10994: `const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);`
- L10996: `kvSet('metaMensual', val);`
- L10999: `reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();`
- L11000: `actualizarMetaBarra(calcCobradoMes());`
- L11009: `const fill = document.getElementById('metaBarFinFill');`
- L11010: `const pct  = document.getElementById('metaBarFinPct');`
- L11011: `const wrap = document.getElementById('metaBarFinWrap');`
- L11018: `const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);`
- L11020: `kvSet('metaMensual', val);`
- L11023: `reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();`
- L11025: `actualizarMetaBarra(calcCobradoMes());`
- L11182: `const COSTOS_DEFAULTS = {`
- L11205: `function getCostosEstructura() {`
- L11207: `const s = kvGet('costosEstructura');`
- L11208: `if (!s) return {...COSTOS_DEFAULTS};`
- L11218: `return {...COSTOS_DEFAULTS, ...stored};`
- L11219: `} catch(e) { return {...COSTOS_DEFAULTS}; }`
- L11222: `function saveCostosEstructura(obj) {`
- L11223: `kvSet('costosEstructura', JSON.stringify(obj));`
- L11257: `// kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección`
- L11492: `const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;`
- L11493: `const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;`
- L11494: `const faltante = Math.max(0, metaMensual - ingresosCobrados);`
- L11530: `metaMensual, ingresosCobrados, ventasGeneradas, pendienteCobrar, egresosMes, ganancia, cumplimiento, faltante,`
- L11638: `\`* Meta mensual: ${money(d.metaMensual)}\`,`
- L11671: `\`Meta mensual: ${money(d.metaMensual)}\`,`
- L11895: `const c = {...COSTOS_DEFAULTS};`
- L11915: `saveCostosEstructura(c);`
- L12005: `const costos = getCostosEstructura();`
- L12692: `const costos     = getCostosEstructura();`
- L12926: `line(\`4. ¿Qué acciones de marketing tienen más sentido con mi presupuesto actual?\`);`
- L13097: `const meta = document.getElementById('emPM_' + kpi);`
- L13287: `function renderPresupuestoMetas() {`
- L13288: `const el = document.getElementById('presupuestoBody');`
- L13290: `const costos = getCostosEstructura();`
- L13299: `<input type="number" id="pm_${idP}" value="${valP}" placeholder="Presencial" oninput="pmRecalc()"`
- L13302: `<input type="number" id="pm_${idD}" value="${valD}" placeholder="Domicilio" oninput="pmRecalc()"`
- L13310: `<input type="${tipo}" id="pm_${id}" value="${val}" oninput="pmRecalc()"`
- L13367: `<div id="pm_res_subtotal" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${fmtN(calc.subtotal)}</div>`
- L13371: `<div id="pm_res_imprevistos" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:#f59e0b">$${fmtN(calc.imprevistos)}</div>`
- L13375: `<div id="pm_res_utilidad" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--ok)">$${fmtN(calc.utilidad)}</div>`
- L13379: `<div id="pm_res_total" style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:#0D0D0D">$${fmtN(calc.total)}</div>`
- L13386: `💾 Guardar presupuesto y actualizar metas`
- L13444: `<strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>`
- L13446: `<strong id="pm_sess_calc" style="color:var(--primary)">—</strong>`
- L13469: `const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;`
- L13483: `set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));`
- L13484: `set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));`
- L13485: `set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));`
- L13486: `set('pm_res_total',       '$' + fmtN(calc.total));`
- L13494: `const ta = document.getElementById('pm_ticket_avg');`
- L13495: `const sc = document.getElementById('pm_sess_calc');`
- L13501: `const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;`
- L13513: `saveCostosEstructura(costos);`
- L13516: `const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;`
- L13522: `kvSet('metaMensual', inputMeta);`
- L13526: `toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');`
- L13527: `renderPresupuestoMetas();`
- L13531: `const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;`
- L13580: `kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas`
- L13586: `actualizarMetaBarra(calcCobradoMes());`
- L13588: `renderPresupuestoMetas();`
