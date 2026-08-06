# Revisión detallada — Fase 12 Indicadores y KPI

- Funciones candidatas presentes: **26**.
- Funciones candidatas ausentes: **0**.
- Variables/constantes globales relacionadas: **6**.
- Dependencias funcionales externas: **18**.

## Funciones presentes
- `_formatKPIValue`
- `_kpiCardGuia`
- `_kpiRow`
- `_kpiSnapshot`
- `applyKPIFavorites`
- `applyKPIRefSpans`
- `calcBDActualizada`
- `changeKPIMonth`
- `closeKPIExplorer`
- `getCancelMotivos`
- `getKPIConfig`
- `getKPIManual`
- `guardarKPIConfig`
- `guardarKPIManual`
- `initKPIExplorer`
- `loadKPIHistoryFromServer`
- `openKPIExplorer`
- `renderKPIGuia`
- `renderKPITablero`
- `saveKPIManual`
- `saveKPINote`
- `scrollToKPICard`
- `toggleKPICard`
- `toggleKPIFavorite`
- `_renderBDBreakdown`
- `_renderCancelBreakdown`

## Funciones ausentes
- Ninguna.

## Dependencias externas
- `_normStr`
- `calcCobradoMes`
- `citasReales`
- `esCancelExcluida`
- `fmtPeso`
- `getEgresos`
- `getEncuestaStats`
- `getLeadsMes`
- `kvGet`
- `kvSet`
- `loadEncuestaStats`
- `marcarErrorMio`
- `normDate`
- `parsePrecio`
- `reloadMetas`
- `renderEmergencia`
- `showView`
- `toast`

## Variables y constantes globales relacionadas

### _activeKPIExplorer

```javascript
let _activeKPIExplorer = null;
```

### _kpiServerHistory

```javascript
let _kpiServerHistory = {};
```

### _kpiViewMonth

```javascript
let _kpiViewMonth = null;
```

### KPI_CONFIG_DEFAULTS

```javascript
const KPI_CONFIG_DEFAULTS = {
  meta_sesiones_semana: 30,
  meta_ventas_mes:      10265000,
  meta_leads_min:       40,
  meta_leads_max:       50,
  meta_conv_min:        25,
  meta_conv_max:        35,
  meta_nps:             90,
  meta_encuestas:       70,
  meta_cancelacion:     10,
  meta_retencion:       60,
  inv_mkt_total:        340000,
  inv_mkt_pauta:        100000,
  inv_mkt_contenido:    240000,
  precio_full:          110000,
  duracion_full:        90,
  precio_express:       75000,
  duracion_express:     50,
  // Precios por servicio (presencial / domicilio)
  sv_cuello_p:     75000,  sv_cuello_d:      90000,
  sv_piernas_p:    75000,  sv_piernas_d:     90000,
  sv_completa_p:  110000,  sv_completa_d:   125000,
  sv_valoracion_p: 80000,  sv_valoracion_d:  95000,
  sv_readap_p:     70000,  sv_readap_d:      85000,
  sv_express_p:    75000,  sv_express_d:     90000,
  sv_diag_p:      160000,  sv_diag_d:       185000,
  sv_bienvenida_p:120000,  sv_bienvenida_d: 120000,
  sv_mini_p:       40000,  sv_mini_d:        40000,
  sv_pkRecup_p:   264000,  sv_pkRecup_d:    264000,
  sv_pkInicio_p:  378000,  sv_pkInicio_d:   469000,
  sv_pkAvance_p:  476000,  sv_pkAvance_d:   598000,
  sv_pkTotal_p:   560000,  sv_pkTotal_d:    722000,
  sv_planActivo_p:135000,  sv_planActivo_d: 165000,
  sv_planPro_p:   230000,  sv_planPro_d:    275000,
};
```

### KPI_INTERACTIVE

```javascript
const KPI_INTERACTIVE = {
  gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
  gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
  gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
  gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
  gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
  gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
  gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
  gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
  gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
  gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
};
```

### META_CANCELACION_PCT

```javascript
let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
```

## Funciones candidatas

### _formatKPIValue

```javascript
function _formatKPIValue(v,type) {
  if (v === null || v === undefined || Number.isNaN(v)) return 'Sin datos';
  if (type === 'money') return fmtPeso(Math.round(v));
  if (type === 'pct') return Math.round(v) + '%';
  return Math.round(v).toLocaleString('es-CO');
}
```

### _kpiCardGuia

```javascript
function _kpiCardGuia(icon, label, valor, meta, unidad, altoEsMejor, metaTxt, evalVal, targetId) {
  const numVal  = parseFloat(String(evalVal !== undefined ? evalVal : valor).replace(/[^0-9.]/g, ''));
  const numMeta = parseFloat(String(meta));
  let color = 'var(--muted)', semaforo = '', bg = 'var(--s2)';
  if (!isNaN(numVal) && !isNaN(numMeta) && numMeta > 0) {
    const ok   = altoEsMejor ? numVal >= numMeta : numVal <= numMeta;
    const warn = altoEsMejor ? numVal >= numMeta * 0.8 : numVal <= numMeta * 1.25;
    color    = ok ? 'var(--ok)' : warn ? '#f59e0b' : '#ef4444';
    bg       = ok ? 'rgba(16,185,129,.06)' : warn ? 'rgba(245,158,11,.06)' : 'rgba(239,68,68,.06)';
    semaforo = ok ? '🟢' : warn ? '🟡' : '🔴';
  }
  const baseStyle = `padding:14px 16px;background:${bg};border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}`;
  const attrs = targetId
    ? `class="kpi-live-card" data-kpi="${targetId}" data-value="${isNaN(numVal)?'':numVal}" role="button" tabindex="0" onclick="openKPIExplorer('${targetId}',this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openKPIExplorer('${targetId}',this)}" title="Explorar indicador" style="${baseStyle};cursor:pointer;transition:box-shadow .15s,transform .15s" onmouseenter="this.style.boxShadow='0 0 0 2px ${color}66'" onmouseleave="this.style.boxShadow=''"`
    : `style="${baseStyle}"`;
  return `<div ${attrs}>
    ${targetId ? `<button class="kpi-fav-btn" onclick="toggleKPIFavorite(event,'${targetId}')" aria-label="Agregar a favoritos">☆</button>` : ''}
    <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
      <span>${icon} ${label}</span><span style="font-size:.85rem;margin-right:${targetId?'25px':'0'}">${semaforo}</span>
    </div>
    <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${valor}${unidad || ''}</div>
    <div style="font-size:.68rem;color:var(--muted);margin-top:4px">Meta: ${metaTxt || (meta + (unidad || ''))}${targetId ? ' <span style="opacity:.55">· explorar</span>' : ''}</div>
  </div>`;
}
```

### _kpiRow

```javascript
function _kpiRow(icon, label, valTxt, dot, color, sub) {
  return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
    <span style="font-size:1rem;margin-top:1px">${dot}</span>
    <div style="flex:1;min-width:0">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <span style="font-size:.78rem;color:var(--muted);font-family:var(--font-m)">${icon} ${label}</span>
        <span style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:${color}">${valTxt}</span>
      </div>
      ${sub ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
    </div>
  </div>`;
}
```

### _kpiSnapshot

```javascript
function _kpiSnapshot(m,y) {
  const citas = citasReales();
  const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
  const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
  const leads = getLeadsMes(m,y);
  const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
  const motivos = getCancelMotivos();
  const cancel = todas.filter(c => (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(motivos[c.id])).length;
  const ref = new Date(y,m,0), start = new Date(ref); start.setDate(ref.getDate()-VENTANA_RETENCION);
  const cuenta = {};
  citas.filter(c => { const d=new Date(normDate(c.fecha)+'T12:00:00'); return d>=start&&d<=ref; }).forEach(c=>{const k=_normStr(c.nombre);if(k)cuenta[k]=(cuenta[k]||0)+1;});
  const retTotal=Object.keys(cuenta).length, bd=calcBDActualizada(m,y);
  const snapshot = {
    gkKpi1:mes.length,
    gkKpi2:mes.length?Math.round(mixFull/mes.length*100):0,
    gkKpi3:leads,
    gkKpi4:leads?Math.round(mes.length/leads*100):null,
    gkKpi5:calcCobradoMes(m,y),
    gkKpi6:null,gkKpi7:null,
    gkKpi8:bd?bd.pct:null,
    gkKpi4b:todas.length?Math.round(cancel/todas.length*100):0,
    gkKpi9:retTotal?Math.round(Object.values(cuenta).filter(n=>n>=2).length/retTotal*100):0
  };
  const saved = _kpiServerHistory[`${y}-${String(m).padStart(2,'0')}`];
  if (saved) {
    if (saved.nps !== null) snapshot.gkKpi7 = saved.nps;
    if (saved.sessions) snapshot.gkKpi6 = Math.round((saved.surveyResponses||0) / saved.sessions * 100);
  }
  return snapshot;
}
```

### applyKPIFavorites

```javascript
function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}
```

### applyKPIRefSpans

```javascript
function applyKPIRefSpans() {
  const cfg = getKPIConfig();
  const fmt = v => v >= 1000 ? '$' + Number(v).toLocaleString('es-CO') : String(v);
  const map = {
    inv_mkt_total:     fmt(cfg.inv_mkt_total),
    inv_mkt_pauta:     fmt(cfg.inv_mkt_pauta),
    inv_mkt_contenido: fmt(cfg.inv_mkt_contenido),
    precio_full:       fmt(cfg.precio_full),
    duracion_full:     String(cfg.duracion_full),
    precio_express:    fmt(cfg.precio_express),
    duracion_express:  String(cfg.duracion_express),
    meta_sesiones:     String(cfg.meta_sesiones_semana),
    meta_ventas_mes:   fmt(cfg.meta_ventas_mes),
    meta_leads_min:    String(cfg.meta_leads_min),
    meta_leads_max:    String(cfg.meta_leads_max),
    meta_conv_min:     String(cfg.meta_conv_min),
    meta_conv_max:     String(cfg.meta_conv_max),
    meta_ventas_semana: '$' + Math.round(cfg.meta_ventas_mes / 4).toLocaleString('es-CO'),
  };
  document.querySelectorAll('.kpi-ref[data-ref]').forEach(el => {
    const v = map[el.dataset.ref];
    if (v !== undefined) el.textContent = v;
  });
}
```

### calcBDActualizada

```javascript
function calcBDActualizada(mesParam, anyoParam) {
  const now = new Date();
  const m = mesParam  || now.getMonth() + 1;
  const y = anyoParam || now.getFullYear();

  // Pacientes únicos atendidos este mes (no cancelados)
  const pacMap = {};
  (allData.citas || []).filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
  }).forEach(c => {
    const key = (c.nombre||'').trim().toLowerCase();
    if (!key) return;
    if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
    if (c.telefono) pacMap[key].telefono = c.telefono;
    if (c.email)    pacMap[key].email    = c.email;
  });

  // Enriquecer con hoja Pacientes
  (allData.pacientes || []).forEach(p => {
    const key = (p.nombre||'').trim().toLowerCase();
    if (!pacMap[key]) return;
    if (p.telefono && !pacMap[key].telefono) pacMap[key].telefono = p.telefono;
    if (p.email    && !pacMap[key].email)    pacMap[key].email    = p.email;
  });

  const pacs       = Object.values(pacMap);
  if (!pacs.length) return null;

  const tienePhone = p => (p.telefono||'').replace(/\D/g,'').length >= 10;
  const tieneEmail = p => (p.email||'').includes('@');
  const completos  = pacs.filter(p => tienePhone(p) && tieneEmail(p)).length;
  const sinTel     = pacs.filter(p => !tienePhone(p)).length;
  const sinEmail   = pacs.filter(p => !tieneEmail(p)).length;

  return {
    pct:       Math.round((completos / pacs.length) * 100),
    completos,
    total:     pacs.length,
    sinTel,
    sinEmail,
  };
}
```

### changeKPIMonth

```javascript
function changeKPIMonth(m, y) {
  const now = new Date();
  const esActual = m === now.getMonth()+1 && y === now.getFullYear();
  _kpiViewMonth = esActual ? null : {m, y};
  renderKPIGuia();
}
```

### closeKPIExplorer

```javascript
function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
```

### getCancelMotivos

```javascript
function getCancelMotivos(...args) {
  const module = window.PanelAppointmentEdit;
  if (!module || typeof module.getCancelMotivos !== 'function') {
    throw new Error('El módulo de edición de citas no está disponible: getCancelMotivos');
  }
  return module.getCancelMotivos(...args);
}
```

### getKPIConfig

```javascript
function getKPIConfig() {
  try {
    const stored = kvGet('kpiConfig');
    if (!stored) return {...KPI_CONFIG_DEFAULTS};
    const parsed = JSON.parse(stored);
    // Migración: si el usuario tiene los valores viejos, actualizarlos y guardar en KV
    let migrated = false;
    if (parsed.meta_ventas_mes === 8040000 || parsed.meta_ventas_mes === 8000000) { parsed.meta_ventas_mes = 10265000; migrated = true; }
    if (parsed.meta_sesiones_semana === 24) { parsed.meta_sesiones_semana = 30; migrated = true; }
    if (migrated) { try { kvSet('kpiConfig', JSON.stringify(parsed)); } catch(e) {} }
    return {...KPI_CONFIG_DEFAULTS, ...parsed};
  } catch(e) { return {...KPI_CONFIG_DEFAULTS}; }
}

const _cfg0 = getKPIConfig();
// kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
let META_NPS             = _cfg0.meta_nps;
let META_ENCUESTAS       = _cfg0.meta_encuestas;
let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
let META_RETENCION_PCT   = _cfg0.meta_retencion;
const META_CAC_MAX         = 80000;
const VENTANA_NUEVO_DIAS   = 180;
const VENTANA_RETENCION    = 60;
const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
```

### getKPIManual

```javascript
function getKPIManual() {
  try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
}
```

### guardarKPIConfig

```javascript
function guardarKPIConfig() {
  const get = key => {
    const el = document.getElementById('kcfg_' + key);
    return el ? (parseInt(el.value, 10) || 0) : undefined;
  };
  const prev = getKPIConfig();
  const updated = {
    meta_sesiones_semana: get('meta_sesiones_semana') ?? prev.meta_sesiones_semana,
    meta_ventas_mes:      get('meta_ventas_mes')      ?? prev.meta_ventas_mes,
    meta_leads_min:       get('meta_leads_min')       ?? prev.meta_leads_min,
    meta_leads_max:       get('meta_leads_max')       ?? prev.meta_leads_max,
    meta_nps:             get('meta_nps')             ?? prev.meta_nps,
    meta_encuestas:       get('meta_encuestas')       ?? prev.meta_encuestas,
    meta_conv_min:        get('meta_conv_min')       ?? prev.meta_conv_min,
    meta_conv_max:        get('meta_conv_max')       ?? prev.meta_conv_max,
    meta_cancelacion:     prev.meta_cancelacion,
    meta_retencion:       prev.meta_retencion,
    inv_mkt_total:        get('inv_mkt_total')        ?? prev.inv_mkt_total,
    inv_mkt_pauta:        get('inv_mkt_pauta')        ?? prev.inv_mkt_pauta,
    inv_mkt_contenido:    get('inv_mkt_contenido')    ?? prev.inv_mkt_contenido,
    precio_full:          get('precio_full')          ?? prev.precio_full,
    duracion_full:        get('duracion_full')        ?? prev.duracion_full,
    precio_express:       get('precio_express')       ?? prev.precio_express,
    duracion_express:     get('duracion_express')     ?? prev.duracion_express,
  };
  kvSet('kpiConfig', JSON.stringify(updated));
  reloadMetas();
  applyKPIRefSpans();
  renderKPITablero();
  // Re-render tarjetas live (sin cerrar el panel)
  renderKPIGuia();
  const body = document.getElementById('kpiConfigBody');
  if (body) body.style.display = 'block';
  const msg = document.getElementById('kpiConfigSaveMsg');
  if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2500); }
  toast('Valores actualizados ✓', 'ok');
}

// ══════════════════════════════════════════════════════════════
// ── ESTRUCTURA FINANCIERA ──
// ══════════════════════════════════════════════════════════════
```

### guardarKPIManual

```javascript
function guardarKPIManual() {
  const obj = {
    leads:        parseInt(document.getElementById('kpiLeads').value || '0', 10) || 0,
    convertidos:  parseInt(document.getElementById('kpiConvertidos').value || '0', 10) || 0,
    nps:          parseInt(document.getElementById('kpiNPS').value || '0', 10) || 0,
    encuestas:    parseInt(document.getElementById('kpiEncuestas').value || '0', 10) || 0,
    bd:           parseInt(document.getElementById('kpiBD').value || '0', 10) || 0
  };
  saveKPIManual(obj);
  toast('KPIs guardados', 'ok');
  renderKPITablero();
}
```

### initKPIExplorer

```javascript
function initKPIExplorer() {
  if (document.getElementById('kpiExplorer')) return;
  const modal = document.createElement('div');
  modal.id = 'kpiExplorer';
  modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
  modal.onclick = e => { if (e.target === modal) closeKPIExplorer(); };
  modal.innerHTML = `<div class="kpi-explorer-box">
    <div class="kpi-explorer-head"><div><div class="kpi-explorer-title" id="kpiExplorerTitle">Indicador</div><div class="kpi-explorer-sub" id="kpiExplorerSub"></div></div><button class="kpi-close" onclick="closeKPIExplorer()" aria-label="Cerrar">×</button></div>
    <div class="kpi-compare-grid"><div class="kpi-compare"><span>Periodo actual</span><strong id="kpiExCurrent">—</strong></div><div class="kpi-compare"><span>Periodo anterior</span><strong id="kpiExPrevious">—</strong></div><div class="kpi-compare"><span>Variación</span><strong id="kpiExVariation">—</strong></div></div>
    <div style="font:600 .72rem var(--font-m);text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:8px">Tendencia · últimos 6 meses</div>
    <div class="kpi-trend" id="kpiTrend"></div>
    <label for="kpiNote" style="display:block;font:600 .72rem var(--font-m);text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:7px">Nota de gestión</label>
    <textarea class="kpi-note" id="kpiNote" placeholder="Qué ocurrió, qué decisión tomaste y qué revisarás después..."></textarea>
    <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
  </div>`;
  document.body.appendChild(modal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
}

const KPI_INTERACTIVE = {
  gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
  gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
  gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
  gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
  gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
  gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
  gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
  gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
  gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
  gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
};
let _activeKPIExplorer = null;
```

### loadKPIHistoryFromServer

```javascript
async function loadKPIHistoryFromServer() {
  try {
    const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
    if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
  } catch(e) {}
}
```

### openKPIExplorer

```javascript
function openKPIExplorer(id, card) {
  const cfg = KPI_INTERACTIVE[id]; if (!cfg) return;
  _activeKPIExplorer = id;
  const base = _kpiViewMonth ? new Date(_kpiViewMonth.y,_kpiViewMonth.m-1,1) : new Date();
  const points=[];
  for(let i=5;i>=0;i--){const d=new Date(base.getFullYear(),base.getMonth()-i,1);points.push({m:d.getMonth()+1,y:d.getFullYear(),label:d.toLocaleDateString('es-CO',{month:'short'}),value:_kpiSnapshot(d.getMonth()+1,d.getFullYear())[id]});}
  let current = points[5].value;
  const raw = Number(card?.dataset.value);
  if ((id==='gkKpi6'||id==='gkKpi7') && Number.isFinite(raw)) current=raw;
  const previous=points[4].value;
  const variation=(previous!==null&&previous!==0&&current!==null)?((current-previous)/Math.abs(previous)*100):null;
  document.getElementById('kpiExplorerTitle').textContent=cfg.label;
  document.getElementById('kpiExplorerSub').textContent='Explora la tendencia, registra decisiones y actúa sin salir del indicador.';
  document.getElementById('kpiExCurrent').textContent=_formatKPIValue(current,cfg.type);
  document.getElementById('kpiExPrevious').textContent=_formatKPIValue(previous,cfg.type);
  const varEl=document.getElementById('kpiExVariation');
  varEl.textContent=variation===null?'Sin comparación':`${variation>=0?'↑':'↓'} ${Math.abs(variation).toFixed(1)}%`;
  const lowerIsBetter = id === 'gkKpi2' || id === 'gkKpi4b';
  const improves = variation === null ? null : (lowerIsBetter ? variation <= 0 : variation >= 0);
  varEl.style.color=improves===null?'var(--muted)':improves?'var(--ok)':'var(--err)';
  const values=points.map(p=>p.value||0),max=Math.max(...values,1);
  document.getElementById('kpiTrend').innerHTML=points.map(p=>`<div class="kpi-trend-col"><span class="kpi-trend-val">${p.value===null?'—':_formatKPIValue(p.value,cfg.type)}</span><div class="kpi-trend-bar" style="height:${p.value===null?2:Math.max(4,Math.round(p.value/max*105))}px"></div><span class="kpi-trend-label">${p.label}</span></div>`).join('');
  document.getElementById('kpiNote').value=localStorage.getItem('kpiNote_'+id)||'';
  const action=document.getElementById('kpiActionBtn');action.textContent=cfg.actionLabel;action.onclick=()=>{closeKPIExplorer();showView(cfg.action)};
  document.getElementById('kpiExplainBtn').onclick=()=>{closeKPIExplorer();scrollToKPICard(id)};
  const modal=document.getElementById('kpiExplorer');modal.classList.add('open');
  setTimeout(()=>modal.querySelector('.kpi-close').focus(),20);
}
```

### renderKPIGuia

```javascript
function renderKPIGuia() {
  const el = document.getElementById('kpiGuiaLiveData');
  if (!el) return;

  const now = new Date();
  const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
  const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
  const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
  const citas = citasReales();

  const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

  // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
  let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
  if (esMesActual) {
    const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
    const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
    const citasSemana = citas.filter(c => {
      const f = normDate(c.fecha);
      return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
    });
    const eventosSemanaG = (allData.eventos || []).filter(e => {
      const f = normDate(e.fecha);
      return f >= toStr(lunesSem) && f <= toStr(domingoSem);
    });
    const _nCitasG = citasSemana.length;
    _nEvG    = eventosSemanaG.length;
    const sessSemana = _nCitasG + _nEvG;
    _ventasG = citasSemana.reduce((s,c) => s + parsePrecio(c.precio), 0)
             + eventosSemanaG.reduce((s,e) => s + parsePrecio(e.cobro), 0);
    const _revOkG = _ventasG >= META_VENTAS_SEMANA * 0.84;
    _sessLabelG = _nEvG > 0 ? `${_nCitasG} citas + ${_nEvG} evento${_nEvG>1?'s':''}` : `${sessSemana}`;
    _sessEvalG  = (_nEvG > 0 && _revOkG) ? META_SESIONES_SEMANA : sessSemana;
  } else {
    const citasMesG = citas.filter(c => {
      const [cy,cm] = normDate(c.fecha).split('-');
      return +cm===m && +cy===y && c.estado !== 'No asistió';
    });
    const eventosMesG = (allData.eventos || []).filter(e => {
      const [cy,cm] = normDate(e.fecha).split('-'); return +cm===m && +cy===y;
    });
    _nEvG = eventosMesG.length;
    const totalSessMes = citasMesG.length + _nEvG;
    _sessLabelG = _nEvG > 0 ? `${citasMesG.length} citas + ${_nEvG} eventos` : `${totalSessMes}`;
    _sessEvalG  = Math.round(totalSessMes / 4); // promedio semanal para comparar con meta
  }

  // KPI 2 — Mix Full este mes
  const mixMap = {};
  citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(c => { const s = c.servicio || 'Sin tipo'; mixMap[s] = (mixMap[s]||0)+1; });
  const totalMix = Object.values(mixMap).reduce((s,v) => s+v, 0);
  const fullCnt  = Object.entries(mixMap).reduce((t,[s,n]) => esSesionFull(s) ? t+n : t, 0);
  const fullPct  = totalMix > 0 ? Math.round(fullCnt / totalMix * 100) : 0;

  // KPI 3 — Leads mes
  const leadsMes  = getLeadsMes(m, y);
  const manual    = getKPIManual();
  const leadsShow = leadsMes > 0 ? leadsMes : (esMesActual ? (manual.leads || 0) : 0);

  // KPI 4 — Tasa conversión
  const citasMesTotal = citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
  let tasaConv = null;
  if (leadsMes > 0)                    tasaConv = Math.round((citasMesTotal / leadsMes) * 100);
  else if (esMesActual && manual.leads > 0) tasaConv = Math.round((manual.convertidos / manual.leads) * 100);

  // KPI 5 — Ventas mes
  const ventasMes = calcCobradoMes(m, y);

  // KPI 6 — Encuestas (solo disponible para mes actual desde formulario)
  const _encStatsG = getEncuestaStats();
  const encuestas  = esMesActual && _encStatsG.encuestas !== undefined ? _encStatsG.encuestas : (esMesActual ? (manual.encuestas || 0) : null);

  // KPI 7 — NPS (solo disponible para mes actual desde formulario)
  const nps = esMesActual && _encStatsG.nps !== undefined ? _encStatsG.nps : (esMesActual ? (manual.nps || 0) : null);

  // KPI 8 — BD actualizada (automático desde datos del sistema)
  const _bdGuia = calcBDActualizada(m, y);
  const bd      = _bdGuia ? _bdGuia.pct : (esMesActual ? (manual.bd || 0) : 0);

  // Recurrentes este mes = vinieron este mes
  const _pacUnicosMes = {};
  citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
  const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
  const _stRecurrentes = _listaRecurrentes.length;

  // Extra — Cancelaciones mes (excluye pruebas)
  const _motivosGuia  = getCancelMotivos();
  const todasCitasMes = (allData.citas || []).filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
  const canceladasMes = todasCitasMes.filter(c =>
    (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
  ).length;
  const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;

  // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
  const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
  const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
  const cuentaPac = {};
  citas.filter(c => {
    const fd = new Date(normDate(c.fecha) + 'T12:00:00');
    return fd >= hace60 && fd <= refDate;
  }).forEach(c => { if (!c.nombre) return; const p = c.nombre.trim().toLowerCase(); cuentaPac[p] = (cuentaPac[p]||0)+1; });
  const pacs60     = Object.keys(cuentaPac).length;
  const recompra60 = Object.values(cuentaPac).filter(n => n >= 2).length;
  const tasaRet    = pacs60 > 0 ? Math.round((recompra60 / pacs60) * 100) : 0;

  // Selector de mes
  const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let opcionesSelect = '';
  for (let i = 0; i < 13; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const om = d.getMonth() + 1, oy = d.getFullYear();
    const sel = (om === m && oy === y) ? 'selected' : '';
    opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
  }

  const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
  const subtitulo = esMesActual
    ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
    : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;

  let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:16px">
      <div>
        <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700">📡 ${esMesActual ? 'Estado actual de tus indicadores' : 'Indicadores de ' + MESES[m-1] + ' ' + y}</div>
        <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${subtitulo}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <select onchange="changeKPIMonth(+this.value.split('-')[0], +this.value.split('-')[1])"
          style="font-size:.73rem;padding:6px 10px;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
          ${opcionesSelect}
        </select>
        ${esMesActual ? `<button onclick="loadEncuestaStats()" id="btnCargarEncuestaGuia" style="font-size:.73rem;padding:6px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">🔄 Cargar encuestas</button>` : ''}
        <button onclick="showView('finanzas')" style="font-size:.73rem;padding:6px 14px;background:rgba(27,191,176,.1);border:1px solid rgba(27,191,176,.3);color:var(--primary);border-radius:8px;cursor:pointer;font-family:var(--font-b);white-space:nowrap">Ver finanzas →</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px">`;

  const _sess1Label = esMesActual ? 'Sesiones esta semana' : 'Sesiones del mes';
  const _sess1Meta  = esMesActual
    ? (_nEvG > 0 ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan` : `≥${META_SESIONES_SEMANA} sesiones`)
    : `≥${META_SESIONES_SEMANA}/sem. (promedio)`;
  html += _kpiCardGuia('📅', _sess1Label, _sessLabelG, META_SESIONES_SEMANA, '', true, _sess1Meta, _sessEvalG, 'gkKpi1');
  html += _kpiCardGuia('🔄', 'Mix Full este mes', totalMix > 0 ? fullPct : '—', 30, totalMix > 0 ? '%' : '', false, totalMix > 0 ? '≤30% Full' : 'Sin sesiones aún', totalMix > 0 ? fullPct : 0, 'gkKpi2');
  html += _kpiCardGuia('📣', 'Leads este mes',          leadsShow || '—',                         40,              '',   true,  '40–50 leads',             undefined, 'gkKpi3');
  html += _kpiCardGuia('🎯', 'Tasa de conversión',      tasaConv !== null ? tasaConv+'%' : '—',   25,              '%',  true,  '25–35%',                  undefined, 'gkKpi4');
  html += _kpiCardGuia('💰', esMesActual ? 'Ventas mes actual' : 'Ventas del mes', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES), ventasMes, 'gkKpi5');
  const _encMetaGuia = _encStatsG.totalRespuestas !== undefined
    ? `${_encStatsG.totalRespuestas} resp. / ${_encStatsG.citasMes} citas`
    : `>${META_ENCUESTAS}%`;
  html += _kpiCardGuia('📋', 'Encuestas realizadas',    encuestas !== null ? encuestas+'%' : '—', META_ENCUESTAS,  '%',  true,  _encMetaGuia,              undefined, 'gkKpi6');
  const _npsMetaGuia = (_encStatsG.promotores !== undefined && nps !== null)
    ? `${_encStatsG.promotores}P · ${_encStatsG.pasivos}Pa · ${_encStatsG.detractores}D`
    : `>${META_NPS}`;
  html += _kpiCardGuia('⭐', 'NPS último mes',          nps !== null ? nps : '—',                 META_NPS,        '',   true,  _npsMetaGuia,              undefined, 'gkKpi7');
  const _bdLabel = _bdGuia ? `${_bdGuia.completos}/${_bdGuia.total}` : '—';
  html += _kpiCardGuia('🗄️', `BD actualizada (${_bdLabel} pac.)`, bd + '%', 100, '%', true, '100%',              undefined, 'gkKpi8');
  html += _kpiCardGuia('❌', 'Cancelaciones mes',       tasaCancel + '%',                         META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`, undefined, 'gkKpi4b');
  html += _kpiCardGuia('🔁', 'Retención 60 días',       tasaRet + '%',                            META_RETENCION_PCT,   '%', true,  `>${META_RETENCION_PCT}%`,   undefined, 'gkKpi9');
  const _mkPacList = (id, icon, label, count, lista, color) => {
    const items = lista.map(n => `<div style="font-size:.75rem;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">${n}</div>`).join('');
    return `<div style="padding:14px 16px;background:var(--s2);border-radius:12px;border:1px solid ${color}33;border-left:3px solid ${color}">
      <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px">${icon} ${label}</div>
      <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${count}</div>
      <button onclick="const d=document.getElementById('${id}');d.style.display=d.style.display==='none'?'block':'none';this.textContent=d.style.display==='none'?'▼ Ver lista':'▲ Ocultar'"
        style="margin-top:8px;font-size:.7rem;background:transparent;border:1px solid ${color}55;color:${color};padding:3px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-b)">▼ Ver lista</button>
      <div id="${id}" style="display:none;margin-top:8px;max-height:160px;overflow-y:auto">${items || '<div style="font-size:.75rem;color:var(--muted);padding:4px 0">Sin pacientes este mes</div>'}</div>
    </div>`;
  };
  // Pacientes de 1 sola sesión que no han vuelto en +30 días
  const _citasPorPac = {};
  citasReales().forEach(c => {
    if (!c.nombre) return;
    const nom = c.nombre.trim().toLowerCase();
    if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
    _citasPorPac[nom].fechas.push(normDate(c.fecha));
  });
  const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
  const hace90Str = hace90.toLocalDateStr();
  const _listaUnaVez = Object.values(_citasPorPac)
    .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
    .map(p => p.nombre).sort();

  html += _mkPacList('kpiListaRecurrentes', '👥', esMesActual ? 'Pacientes este mes' : 'Pacientes del mes', _stRecurrentes, _listaRecurrentes, '#6366f1');
  html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
  // Cálculo: sesiones diarias necesarias para cumplir meta
  if (esMesActual) {
    const diasEnMes = new Date(y, m, 0).getDate();
    let diasRestantes = 0;
    for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
      const dow = new Date(y, m - 1, d).getDay();
      if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
    }
    const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
    const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
    const avgPrecio     = citasMesHechas.length > 0
      ? citasMesHechas.reduce((s,c) => s + parsePrecio(c.precio), 0) / citasMesHechas.length
      : (getKPIConfig().precio_full || 80000);
    const sesionesNecesarias = avgPrecio > 0 ? Math.ceil(faltante / avgPrecio) : 0;
    const sesionesDiarias    = diasRestantes > 0 ? Math.ceil(sesionesNecesarias / diasRestantes) : sesionesNecesarias;
    const metaYaCumplida     = ventasMes >= META_VENTAS_MES;
    const colorBanner        = metaYaCumplida ? 'rgba(16,185,129,.12)' : 'rgba(245,158,11,.1)';
    const borderBanner       = metaYaCumplida ? 'rgba(16,185,129,.3)' : 'rgba(245,158,11,.3)';
    const iconoBanner        = metaYaCumplida ? '🎉' : '📌';
    const textoBanner        = metaYaCumplida
      ? `<strong>¡Meta mensual cumplida!</strong> Has superado ${fmtPeso(META_VENTAS_MES)} este mes.`
      : `Para cumplir la meta mensual, se deben agendar en promedio <strong>${sesionesDiarias} sesiones diarias</strong> en los <strong>${diasRestantes} días restantes</strong> del mes — faltan ${fmtPeso(faltante)}.`;
    html += `<div style="grid-column:1/-1;padding:10px 14px;background:${colorBanner};border:1px solid ${borderBanner};border-radius:8px;font-size:.78rem;color:var(--text)">
      ${iconoBanner} ${textoBanner}
    </div>`;
  }

  if (!esMesActual) {
    html += `<div style="grid-column:1/-1;font-size:.72rem;color:var(--muted);padding:8px 10px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px">
      ℹ️ <strong>NPS y Encuestas</strong> solo están disponibles para el mes actual (se cargan desde el formulario). Los demás indicadores se calculan desde las citas del sistema.
    </div>`;
  }

  const cfg = getKPIConfig();
  const fmtRef = v => v >= 1000 ? '$' + v.toLocaleString('es-CO') : String(v);
  const inp = (key, label, val, note='') => `
    <div>
      <label style="font-size:.7rem;color:var(--muted);display:block;margin-bottom:3px;font-family:var(--font-m)">${label}${note ? `<span style="color:var(--primary);margin-left:4px">${note}</span>` : ''}</label>
      <input type="number" id="kcfg_${key}" value="${val}"
        style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
    </div>`;

  html += `</div>
    <div style="margin-top:12px;padding:10px 14px;background:rgba(27,191,176,.06);border:1px solid rgba(27,191,176,.15);border-radius:8px;font-size:.75rem;color:var(--muted)">
      💡 <strong>NPS y Encuestas</strong> se cargan automáticamente desde el formulario — ve a Finanzas y presiona <strong>🔄 Cargar desde formulario</strong>. <strong>BD actualizada</strong> se calcula sola desde las citas del mes.
    </div>
    <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
      <button onclick="document.getElementById('kpiConfigBody').style.display=document.getElementById('kpiConfigBody').style.display==='none'?'block':'none'"
        style="font-size:.73rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">
        ⚙️ Editar valores de referencia
      </button>
      <div id="kpiConfigBody" style="display:none;margin-top:14px">
        <div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">Edita los valores y presiona <strong>Guardar</strong>. Se actualizan los textos, semáforos y metas en toda la guía.</div>
        <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Metas operativas</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
          ${inp('meta_sesiones_semana', 'Sesiones/semana', cfg.meta_sesiones_semana)}
          ${inp('meta_ventas_mes', 'Ventas brutas/mes ($)', cfg.meta_ventas_mes)}
          ${inp('meta_leads_min', 'Leads/mes mínimo', cfg.meta_leads_min)}
          ${inp('meta_leads_max', 'Leads/mes máximo', cfg.meta_leads_max)}
          ${inp('meta_conv_min', 'Conversión mínima (%)', cfg.meta_conv_min)}
          ${inp('meta_conv_max', 'Conversión máxima (%)', cfg.meta_conv_max)}
          ${inp('meta_nps', 'Meta NPS', cfg.meta_nps)}
          ${inp('meta_encuestas', 'Meta encuestas (%)', cfg.meta_encuestas)}
        </div>
        <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Inversión en marketing</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:14px">
          ${inp('inv_mkt_total', 'Total marketing/mes ($)', cfg.inv_mkt_total)}
          ${inp('inv_mkt_pauta', 'Pauta en redes ($)', cfg.inv_mkt_pauta)}
          ${inp('inv_mkt_contenido', 'Creación de contenido ($)', cfg.inv_mkt_contenido)}
        </div>
        <div style="font-size:.72rem;font-family:var(--font-m);color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Precios y tiempos de servicios</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px">
          ${inp('precio_full', 'Precio Descarga Full ($)', cfg.precio_full)}
          ${inp('duracion_full', 'Duración Full (min)', cfg.duracion_full)}
          ${inp('precio_express', 'Precio Descarga Express ($)', cfg.precio_express)}
          ${inp('duracion_express', 'Duración Express (min)', cfg.duracion_express)}
        </div>
        <button onclick="guardarKPIConfig()"
          style="padding:8px 20px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.82rem">
          Guardar cambios
        </button>
        <span id="kpiConfigSaveMsg" style="font-size:.75rem;color:var(--ok);margin-left:10px;display:none">✓ Guardado</span>
      </div>
    </div>
  </div>`;

  // Exportar datos para el Manual de Emergencia
  window._emKPIData = {
    sessEval:      _sessEvalG,        sessMeta:      META_SESIONES_SEMANA,
    fullPct:       fullPct,           totalMix:      totalMix,
    tasaCancel:    tasaCancel,        cancelMeta:    META_CANCELACION_PCT,
    leadsShow:     leadsShow || 0,
    tasaConv:      tasaConv,
    ventasSem:     _ventasG,          ventasSemMeta: META_VENTAS_SEMANA,
    ventasMes:     ventasMes,         ventasMesMeta: META_VENTAS_MES,
    nps:           isNaN(nps)       ? 0 : nps,
    npsMeta:       META_NPS,
    encuestas:     isNaN(encuestas) ? 0 : encuestas,
    encMeta:       META_ENCUESTAS,
    bd:            isNaN(bd)        ? 0 : bd,
  };

  el.innerHTML = html;
  applyKPIFavorites();
  applyKPIRefSpans();
  _renderCancelBreakdown();
  _renderBDBreakdown();
  renderEmergencia();
}
```

### renderKPITablero

```javascript
function renderKPITablero() {
  const el = document.getElementById('kpiTableroResult');
  if (!el) return;

  // Cargar valores manuales guardados en inputs
  const manual = getKPIManual();
  const setVal = (id, v) => { const inp = document.getElementById(id); if(inp && v) inp.value = v; };
  setVal('kpiLeads', manual.leads);
  setVal('kpiConvertidos', manual.convertidos);
  setVal('kpiNPS', manual.nps);
  setVal('kpiEncuestas', manual.encuestas);
  setVal('kpiBD', manual.bd);

  const now  = new Date();
  const m    = now.getMonth()+1, y = now.getFullYear();
  const citas = citasReales();

  // Calcular inicio semana actual (lunes)
  const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
  const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
  const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

  // Sesiones esta semana (excluyendo canceladas y no-shows)
  // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
  const citasSemana = citas.filter(c => {
    const f = normDate(c.fecha);
    return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
  });
  const eventosSemana = (allData.eventos || []).filter(e => {
    const f = normDate(e.fecha);
    return f >= toStr(lunesSem) && f <= toStr(domingoSem);
  });
  const nCitasSem   = citasSemana.length;
  const nEventosSem = eventosSemana.length;
  const sessSemana  = nCitasSem + nEventosSem;

  // Ventas semana (citas + eventos)
  const ventasSemana = citasSemana.reduce((s,c) => s + parsePrecio(c.precio), 0)
                     + eventosSemana.reduce((s,e) => s + parsePrecio(e.cobro), 0);

  // Ventas mes actual
  const ventasMes = calcCobradoMes();

  // Mix servicios mes actual
  const mixMap = {};
  citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(c => { const s = c.servicio || 'Sin tipo'; mixMap[s] = (mixMap[s]||0)+1; });
  const mixArr = Object.entries(mixMap).sort((a,b) => b[1]-a[1]);

  // Tasa conversión — usa el contador automático del mes (con fallback al campo manual)
  const leadsMes = getLeadsMes();
  const citasNuevasMes = citas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm === m && +cy === y;
  }).length;
  const tasaConv = leadsMes > 0 ? Math.round((citasNuevasMes / leadsMes) * 100) : null;
  // Respaldo: si no hay leads en el contador automático, usa el campo manual
  const tasa = leadsMes > 0 ? tasaConv : (manual.leads > 0 ? Math.round((manual.convertidos / manual.leads) * 100) : null);

  function kpiCard(icon, label, valor, meta, unidad='', altoEsMejor=true, meta2txt='', evalVal=undefined) {
    const numVal  = parseFloat(String(evalVal !== undefined ? evalVal : valor).replace(/[^0-9.]/g,''));
    const numMeta = parseFloat(String(meta));
    let color = 'var(--muted)', estado = '';
    if (!isNaN(numVal) && !isNaN(numMeta) && numMeta > 0) {
      const ok = altoEsMejor ? numVal >= numMeta : numVal <= numMeta;
      const warn = altoEsMejor ? numVal >= numMeta * 0.8 : numVal <= numMeta * 1.2;
      color = ok ? 'var(--ok)' : warn ? '#f59e0b' : '#ef4444';
      estado = ok ? '✓' : warn ? '⚠️' : '✗';
    }
    return `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid ${color}">
      <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px;display:flex;justify-content:space-between">
        <span>${icon} ${label}</span><span>${estado}</span>
      </div>
      <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700;color:${color}">${valor}${unidad}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:3px">Meta: ${meta2txt || (meta + unidad)}</div>
    </div>`;
  }

  // Tarjeta sesiones con lógica de compensación por eventos
  const _revenueOk    = ventasSemana >= META_VENTAS_SEMANA * 0.84;
  const _sessLabel    = nEventosSem > 0 ? `${nCitasSem} citas + ${nEventosSem} evento${nEventosSem>1?'s':''}` : `${sessSemana}`;
  const _sessMetaTxt  = nEventosSem > 0 && _revenueOk
    ? `≥${META_SESIONES_SEMANA} ses. · ✓ ingresos compensan`
    : `${META_SESIONES_SEMANA} sesiones`;
  // Si hay eventos y los ingresos están bien, no mostrar rojo
  const _sessEvalVal  = (nEventosSem > 0 && _revenueOk) ? META_SESIONES_SEMANA : sessSemana;

  let html = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:16px">`;
  html += kpiCard('📅','Sesiones esta semana', _sessLabel, META_SESIONES_SEMANA, '', true, _sessMetaTxt, _sessEvalVal);
  html += kpiCard('💰','Ventas esta semana', fmtPeso(ventasSemana), META_VENTAS_SEMANA, '', true, fmtPeso(META_VENTAS_SEMANA));
  html += kpiCard('💰','Ventas mes actual', fmtPeso(ventasMes), META_VENTAS_MES, '', true, fmtPeso(META_VENTAS_MES));
  html += kpiCard('📣','Leads recibidos (mes)', leadsMes > 0 ? leadsMes : (manual.leads||'—'), 0, '', true, 'Contador del dashboard');

  if (tasa !== null) {
    html += kpiCard('🎯','Tasa de conversión', tasa+'%', 25, '%', true, '25–35%');
  } else {
    html += `<div style="padding:16px;background:var(--s2);border-radius:12px;border-left:3px solid var(--border)">
      <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">🎯 Tasa de conversión</div>
      <div style="font-size:.85rem;color:var(--muted)">Registra leads y convertidos arriba</div>
    </div>`;
  }

  const _encStats  = getEncuestaStats();
  const _npsVal    = _encStats.nps      !== undefined ? _encStats.nps      : (manual.nps      || 0);
  const _encVal    = _encStats.encuestas !== undefined ? _encStats.encuestas : (manual.encuestas || 0);
  const _npsMeta   = _encStats.promotores !== undefined
    ? `${_encStats.promotores}P·${_encStats.pasivos}Pa·${_encStats.detractores}D`
    : `>${META_NPS}%`;
  html += kpiCard('⭐','NPS (auto formulario)', _npsVal, META_NPS, '', true, _npsMeta);
  html += kpiCard('📋','Encuestas realizadas', _encVal+'%', META_ENCUESTAS, '%', true, `>${META_ENCUESTAS}%`);
  const _bdAuto = calcBDActualizada();
  const _bdVal  = _bdAuto ? _bdAuto.pct+'%' : (manual.bd||0)+'%';
  const _bdMeta = _bdAuto ? `${_bdAuto.completos}/${_bdAuto.total} pac. con tel+email` : '100%';
  html += kpiCard('🗄️','BD actualizada (auto)', _bdVal, 100, '%', true, _bdMeta);

  // ───── KPI: Ingreso por canal (mes actual) ─────
  const canalMap = {};
  citas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    const estado = (c.estado || '').toLowerCase();
    return +cm===m && +cy===y && !estado.includes('cancel') && !estado.includes('no asist');
  }).forEach(c => {
    const canal = c.canal || 'Directo';
    canalMap[canal] = (canalMap[canal] || 0) + parsePrecio(c.precio);
  });
  const totalCanales = Object.values(canalMap).reduce((s,v) => s+v, 0);
  const canalTop = Object.entries(canalMap).sort((a,b) => b[1]-a[1])[0];
  const canalTopTxt = canalTop ? `${canalTop[0]}: ${fmtPeso(canalTop[1])}` : 'Sin datos';

  // ───── KPI: Tasa de cancelación (mes actual) ─────
  // IMPORTANTE: usa allData.citas (no citasReales) para contar canceladas reales
  // Las marcadas como "Prueba" se excluyen de la tasa de cancelación
  const _motivosMes = getCancelMotivos();
  const todasCitasMes = (allData.citas || []).filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y;
  });
  const canceladasMes = todasCitasMes.filter(c =>
    (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosMes[c.id])
  ).length;
  const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;

  // ───── KPI: CAC (Costo de Adquisición de Cliente) ─────
  const hoyKPI = new Date();
  const ventanaAtras = new Date(hoyKPI); ventanaAtras.setDate(hoyKPI.getDate() - VENTANA_NUEVO_DIAS);
  const pacientesMes = new Set();
  citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(c => { if (c.nombre) pacientesMes.add(c.nombre.trim().toLowerCase()); });
  let nuevosCount = 0;
  pacientesMes.forEach(pac => {
    const citasPrevias = allData.citas.filter(c => {
      if (!c.nombre || c.nombre.trim().toLowerCase() !== pac) return false;
      const f = new Date(normDate(c.fecha) + 'T12:00:00');
      return f >= ventanaAtras && f < new Date(y, m-1, 1);
    });
    if (citasPrevias.length === 0) nuevosCount++;
  });
  const mesStr = `${y}-${String(m).padStart(2,'0')}`;
  const egresosMktMes = getEgresos().filter(e => {
    if (!e.fecha || !e.fecha.startsWith(mesStr)) return false;
    return CATEGORIAS_MARKETING.some(cat => (e.concepto||'').toLowerCase().includes(cat.toLowerCase()));
  }).reduce((s,e) => s + (e.monto||0), 0);
  const cac = nuevosCount > 0 ? Math.round(egresosMktMes / nuevosCount) : 0;

  // ───── KPI: Tasa de retención 60 días ─────
  const hace60 = new Date(hoyKPI); hace60.setDate(hoyKPI.getDate() - VENTANA_RETENCION);
  const conteoPorPaciente = {};
  citas.filter(c => new Date(normDate(c.fecha) + 'T12:00:00') >= hace60)
    .forEach(c => {
      if (!c.nombre) return;
      const pac = c.nombre.trim().toLowerCase();
      conteoPorPaciente[pac] = (conteoPorPaciente[pac] || 0) + 1;
    });
  const pacientesUltimos60 = Object.keys(conteoPorPaciente).length;
  const pacientesConRecompra = Object.values(conteoPorPaciente).filter(n => n >= 2).length;
  const tasaRetencion = pacientesUltimos60 > 0 ? Math.round((pacientesConRecompra / pacientesUltimos60) * 100) : 0;

  // ───── 4 nuevas tarjetas ─────
  html += kpiCard('🎯','Canal líder del mes', canalTopTxt, 0, '', true, 'El que más factura');
  html += kpiCard('❌','Tasa de cancelación', tasaCancel+'%', META_CANCELACION_PCT, '%', false, `<${META_CANCELACION_PCT}%`);
  html += kpiCard('💸','CAC (Costo adq. cliente)', cac > 0 ? fmtPeso(cac) : `— (${nuevosCount} nuevos)`, META_CAC_MAX, '', false, `<${fmtPeso(META_CAC_MAX)}`);
  html += kpiCard('🔁','Retención 60 días', tasaRetencion+'%', META_RETENCION_PCT, '%', true, `>${META_RETENCION_PCT}%`);

  html += '</div>';

  // Mix de servicios mes
  if (mixArr.length) {
    html += `<div class="card" style="margin-top:0">
      <div class="card-title" style="margin-bottom:14px">🔄 Mix de servicios este mes</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">`;
    const totalSess = mixArr.reduce((s,[,n]) => s+n, 0);
    const SERV_COLORS = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
    mixArr.forEach(([serv, cnt], i) => {
      const pct = Math.round(cnt/totalSess*100);
      html += `<div style="padding:12px;background:var(--s2);border-radius:10px">
        <div style="font-size:.78rem;font-weight:600;color:${SERV_COLORS[i%6]};margin-bottom:6px">${serv}</div>
        <div style="font-family:var(--font-h);font-size:1.4rem;font-weight:700">${cnt}</div>
        <div style="font-size:.72rem;color:var(--muted)">${pct}% del total</div>
      </div>`;
    });
    html += '</div>';

    // Alerta rentabilidad
    const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
    const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);
    if (fullCnt > expressCnt && fullCnt > 0) {
      html += `<div style="margin-top:12px;padding:11px 14px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:8px;font-size:.8rem;color:#ef4444">
        ⚠️ <strong>Alerta de rentabilidad:</strong> Las Descargas Full (${fullCnt}) superan a las Express (${expressCnt}) este mes. La Descarga Full genera $73.333/h vs $90.000/h de la Express. Prioriza la Descarga Express y Readaptación para maximizar ingresos por hora.
      </div>`;
    }
    html += '</div>';
  }

  // Desglose visual de ingresos por canal
  if (Object.keys(canalMap).length > 0) {
    const canalArr = Object.entries(canalMap).sort((a,b) => b[1]-a[1]);
    const CANAL_COLORS = {'Directo':'var(--primary)','Gimnasio':'#10b981','Corporativo':'#6366f1','Referido':'#f59e0b'};
    html += `<div class="card" style="margin-top:14px">
      <div class="card-title" style="margin-bottom:14px">📊 Ingresos por canal este mes</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">`;
    canalArr.forEach(([canal, ingreso]) => {
      const pct = totalCanales > 0 ? Math.round(ingreso/totalCanales*100) : 0;
      const color = CANAL_COLORS[canal] || 'var(--muted)';
      html += `<div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="font-size:.78rem;font-weight:600;color:${color};margin-bottom:6px">${canal}</div>
        <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:700">${fmtPeso(ingreso)}</div>
        <div style="font-size:.72rem;color:var(--muted)">${pct}% del total</div>
      </div>`;
    });
    html += `</div></div>`;
  }

  el.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
// ══════════════════════════════════════════════════════════════
```

### saveKPIManual

```javascript
function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }

// ═══════════════════════════════════════════════
// LEADS - Sistema de conteo de prospectos
// ═══════════════════════════════════════════════
```

### saveKPINote

```javascript
function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
```

### scrollToKPICard

```javascript
function scrollToKPICard(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.classList.contains('open')) {
    el.classList.add('open');
    const body = el.querySelector('.gk-kpi-body');
    if (body) body.style.display = 'block';
    if (id === 'gkKpi4b') _renderCancelBreakdown();
    if (id === 'gkKpi8')  _renderBDBreakdown();
  }
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}

// ══ MANUAL DE EMERGENCIA — funciones ══
```

### toggleKPICard

```javascript
function toggleKPICard(el) {
  el.classList.toggle('open');
}

// ── BANNERS CONTEXTUALES — colapsar/expandir ──
```

### toggleKPIFavorite

```javascript
function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
```

### _renderBDBreakdown

```javascript
function _renderBDBreakdown() {
  const el = document.getElementById('kpiBDLiveBreakdown');
  if (!el) return;
  const now = new Date();
  const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
  const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
  const bd = calcBDActualizada(m, y);
  if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }

  const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
  el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
    <div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid ${color}">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">COMPLETOS (tel+email)</div>
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${bd.pct}%</div>
      <div style="font-size:.7rem;color:var(--muted)">${bd.completos} de ${bd.total} pacientes</div>
    </div>
    ${bd.sinTel ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #ef4444">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">SIN TELÉFONO</div>
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:#ef4444">${bd.sinTel}</div>
      <div style="font-size:.7rem;color:var(--muted)">pacientes</div>
    </div>` : ''}
    ${bd.sinEmail ? `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;border-left:3px solid #f59e0b">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">SIN EMAIL</div>
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:#f59e0b">${bd.sinEmail}</div>
      <div style="font-size:.7rem;color:var(--muted)">pacientes</div>
    </div>` : ''}
  </div>
  <div style="margin-top:8px;font-size:.72rem;color:var(--muted)">⚙️ Campos verificados: <strong>teléfono y email</strong>. Cédula y diagnóstico se agregarán cuando estén en el sistema.</div>`;
}
```

### _renderCancelBreakdown

```javascript
function _renderCancelBreakdown() {
  const el = document.getElementById('kpiCancelBreakdown');
  if (!el) return;

  const now = new Date();
  const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
  const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
  const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

  const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
  const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
  const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

  const motivos = getCancelMotivos();

  // Excluir pruebas del análisis real
  const cancelMesAll = (allData.citas || []).filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
  });
  const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
  const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));

  const cancelSem = (allData.citas || []).filter(c => {
    const f = normDate(c.fecha);
    return f >= toStr(lunesSem) && f <= toStr(domingoSem)
      && (c.estado||'').toLowerCase().includes('cancel')
      && !esCancelExcluida(motivos[c.id]);
  });

  // Breakdown por servicio y día (solo cancelaciones reales)
  const srvMap = {}, diaMap = {}, motivoMap = {};
  cancelMes.forEach(c => {
    const s = c.servicio || 'Sin tipo';
    srvMap[s] = (srvMap[s]||0) + 1;
    const d = new Date(normDate(c.fecha) + 'T12:00:00');
    diaMap[DIAS[d.getDay()]] = (diaMap[DIAS[d.getDay()]]||0) + 1;
    const mot = motivos[c.id] || 'Sin registrar';
    motivoMap[mot] = (motivoMap[mot]||0) + 1;
  });

  const topServ  = Object.entries(srvMap).sort((a,b)=>b[1]-a[1]);
  const topDia   = Object.entries(diaMap).sort((a,b)=>b[1]-a[1]);
  const topMotiv = Object.entries(motivoMap).sort((a,b)=>b[1]-a[1]);
  const total    = (allData.citas||[]).filter(c=>{ const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
  const pct      = total > 0 ? Math.round((cancelMes.length/total)*100) : 0;
  const color    = pct < 10 ? 'var(--ok)' : pct <= 20 ? '#f59e0b' : '#ef4444';

  if (!cancelMesAll.length) {
    el.innerHTML = `<div style="font-size:.8rem;color:var(--ok)">🟢 Sin cancelaciones registradas este mes.</div>`;
    return;
  }

  let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
    <div style="background:var(--s2);border-radius:8px;padding:10px 12px">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">ESTA SEMANA (reales)</div>
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${cancelSem.length>0?'#f59e0b':'var(--ok)'}">${cancelSem.length}</div>
      <div style="font-size:.7rem;color:var(--muted)">cancelaciones</div>
    </div>
    <div style="background:var(--s2);border-radius:8px;padding:10px 12px">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:4px;font-family:var(--font-m)">ESTE MES (reales)</div>
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${color}">${cancelMes.length} <span style="font-size:.8rem;font-weight:400">(${pct}%)</span></div>
      <div style="font-size:.7rem;color:var(--muted)">del total${cancelMesPruebas.length ? ` · <span style="color:#6366f1">${cancelMesPruebas.length} de prueba excluidas</span>` : ''}</div>
    </div>`;

  if (topMotiv.length) {
    html += `<div style="background:var(--s2);border-radius:8px;padding:10px 12px">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-family:var(--font-m)">POR MOTIVO</div>
      ${topMotiv.map(([m,n])=>`<div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:3px"><span>${m}</span><strong>${n}</strong></div>`).join('')}
    </div>`;
  }

  if (topServ.length) {
    html += `<div style="background:var(--s2);border-radius:8px;padding:10px 12px">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-family:var(--font-m)">SERVICIO QUE MÁS CANCELA</div>
      ${topServ.slice(0,3).map(([s,n])=>`<div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:3px"><span>${s}</span><strong>${n}</strong></div>`).join('')}
    </div>`;
  }

  if (topDia.length) {
    html += `<div style="background:var(--s2);border-radius:8px;padding:10px 12px;grid-column:1/-1">
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:6px;font-family:var(--font-m)">DÍA QUE MÁS CANCELA</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${topDia.map(([d,n])=>`<div style="background:var(--s1);border-radius:6px;padding:5px 10px;font-size:.78rem"><span style="color:var(--muted)">${d}</span> <strong>${n}</strong></div>`).join('')}
      </div>
    </div>`;
  }

  html += `</div>`;

  // Lista detallada de citas canceladas este mes
  html += `<div style="margin-top:14px">
    <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">
      DETALLE — citas canceladas este mes <span style="font-size:.65rem;color:var(--muted);text-transform:none">(marca "Error mío" para excluir del KPI)</span>
    </div>`;

  if (cancelMes.length === 0) {
    html += `<div style="font-size:.78rem;color:var(--ok)">Sin cancelaciones reales este mes.</div>`;
  } else {
    const sorted = [...cancelMes].sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
    html += sorted.map(c => {
      const mot = motivos[c.id];
      const motHtml = mot
        ? `<span style="background:#f59e0b22;color:#92400e;border-radius:4px;padding:1px 6px;font-size:.7rem">${mot}</span>`
        : '';
      return `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--s2);border-radius:7px;margin-bottom:4px;font-size:.78rem">
        <div style="flex:1;min-width:0">
          <strong>${c.nombre || '—'}</strong>
          <span style="color:var(--muted);margin-left:6px">${normDate(c.fecha)}</span>
          <span style="color:var(--muted);margin-left:4px">· ${c.servicio || '—'}</span>
          ${motHtml ? `<span style="margin-left:6px">${motHtml}</span>` : ''}
        </div>
        <button onclick="marcarErrorMio('${c.id}')"
          style="margin-left:8px;flex-shrink:0;padding:3px 10px;border-radius:6px;border:1px solid #ef444466;background:#ef444411;color:#ef4444;font-size:.7rem;cursor:pointer;font-family:var(--font-b)">
          ✗ Error mío
        </button>
      </div>`;
    }).join('');
  }

  if (cancelMesPruebas.length) {
    html += `<div style="margin-top:8px;padding:6px 10px;background:rgba(99,102,241,.07);border-radius:7px;font-size:.75rem;color:#6366f1">
      🧪 ${cancelMesPruebas.length} excluida${cancelMesPruebas.length>1?'s':''} del conteo (Prueba / Error mío):
      ${cancelMesPruebas.map(c=>`<span style="margin-left:6px;opacity:.8">${c.nombre||'—'} (${normDate(c.fecha)}) — ${motivos[c.id]||''}</span>`).join('')}
    </div>`;
  }

  html += `</div>`;
  el.innerHTML = html;
}

// ── ENCUESTA STATS — conectado a Google Forms via GAS ──
```

- Este documento es diagnóstico; no modifica el panel.
