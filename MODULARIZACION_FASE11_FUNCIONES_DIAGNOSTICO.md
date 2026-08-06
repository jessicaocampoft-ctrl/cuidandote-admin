# Revisión detallada de funciones — Fase 11 Finanzas

## renderFinanzas

```javascript
function renderFinanzas() {
  const now = new Date();
  const m   = now.getMonth()+1;
  const y   = now.getFullYear();
  const citas = citasReales();

  // ── Inicializar fecha egreso con hoy ──
  const egresoFechaEl = document.getElementById('egresoFecha');
  if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();

  // ── Meta ──
  const meta = getMeta();
  const cobradoMes = calcCobradoMes();
  const metaInp = document.getElementById('metaInputFin');
  const metaActTxt = document.getElementById('metaActualTexto');
  if (metaInp && meta) metaInp.value = meta.toLocaleString('es-CO');
  if (metaActTxt) metaActTxt.textContent = meta ? 'Meta actual: $' + meta.toLocaleString('es-CO') : '';
  const barWrap = document.getElementById('metaBarFinWrap');
  const barFill = document.getElementById('metaBarFinFill');
  const barPct  = document.getElementById('metaBarFinPct');
  const barTxt  = document.getElementById('metaBarFinTexto');
  if (barWrap) barWrap.style.display = meta ? 'block' : 'none';
  if (meta && barFill) {
    const p = Math.min(Math.round(cobradoMes / meta * 100), 100);
    barFill.style.width = p + '%';
    if (barPct) barPct.textContent = p + '%';
    if (barTxt) barTxt.textContent = '$' + cobradoMes.toLocaleString('es-CO') + ' de $' + meta.toLocaleString('es-CO');
  }

  // ── Gráfico últimos 6 meses ──
  const chartEl     = document.getElementById('finChart');
  const chartLabels = document.getElementById('finChartLabels');
  const MESES_CORTO = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const meses6 = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(y, m-1-i, 1);
    meses6.push({ m: d.getMonth()+1, y: d.getFullYear(), label: MESES_CORTO[d.getMonth()] });
  }
  const totales = meses6.map(mes => ({
    ...mes,
    total: citas
      .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===mes.m && +cy===mes.y; })
      .reduce((s,c) => s + parsePrecio(c.precio), 0)
      + calcIngresoPaquetesMes(mes.m, mes.y)
      + (allData.eventos || [])
          .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===mes.m && +cy===mes.y; })
          .reduce((s,e) => s + parsePrecio(e.cobro), 0)
  }));
  const maxVal = Math.max(...totales.map(t => t.total), 1);
  if (chartEl) {
    chartEl.innerHTML = totales.map((t, i) => {
      const pct = Math.max(Math.round(t.total / maxVal * 100), t.total > 0 ? 5 : 0);
      const isCurrent = t.m === m && t.y === y;
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:0;height:100%">
        <div style="font-family:var(--font-m);font-size:.62rem;color:var(--primary);text-align:center;margin-bottom:3px;white-space:nowrap">${t.total > 0 ? '$'+Math.round(t.total/1000)+'k' : ''}</div>
        <div class="chart-bar ${isCurrent?'current':''}" style="width:100%;height:${pct}%;min-height:${t.total>0?'6px':'2px'}" title="$${t.total.toLocaleString('es-CO')}"></div>
      </div>`;
    }).join('');
  }
  if (chartLabels) {
    chartLabels.innerHTML = totales.map(t => {
      const isCurrent = t.m === m && t.y === y;
      return `<div style="flex:1;text-align:center;font-family:var(--font-m);font-size:.65rem;color:${isCurrent?'var(--primary)':'var(--muted)'};font-weight:${isCurrent?'700':'400'}">${t.label}</div>`;
    }).join('');
  }

  // ── Servicios más rentables (mes actual) ──
  const servMap = {};
  citas
    .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(c => {
      const s = c.servicio || 'Sin servicio';
      servMap[s] = (servMap[s] || 0) + parsePrecio(c.precio);
    });
  (allData.eventos || [])
    .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; })
    .forEach(e => {
      const s = e.tipo || 'Evento externo';
      servMap[s] = (servMap[s] || 0) + parsePrecio(e.cobro);
    });
  _getPkAsignados()
    .filter(p => { if (!p.fechaCompra) return false; const [py,pm]=p.fechaCompra.split('-'); return +pm===m && +py===y; })
    .forEach(p => {
      const s = p.nombre || 'Paquete';
      servMap[s] = (servMap[s] || 0) + parsePrecio(p.precio);
    });
  const servArr = Object.entries(servMap).sort((a,b) => b[1]-a[1]);
  const maxServ = servArr[0] ? servArr[0][1] : 1;
  const servEl = document.getElementById('finServiciosMes');
  if (servEl) {
    if (!servArr.length) {
      servEl.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin datos para este mes</p></div>';
    } else {
      servEl.innerHTML = servArr.slice(0,8).map(([s, v]) => `
        <div class="serv-row">
          <div class="serv-name" title="${s}">${s}</div>
          <div class="serv-bar-bg"><div class="serv-bar-fill" style="width:${Math.round(v/maxServ*100)}%"></div></div>
          <div class="serv-val">$${Math.round(v/1000)}k</div>
        </div>`).join('');
    }
  }

  // ── Resumen del mes ──
  const todayStr2    = today();
  const citasMes     = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
  const canceladasN  = allData.citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && c.estado==='Cancelada' && !esRegistroServ(c.servicio); }).length;
  const pasadasN     = citasMes.filter(c => normDate(c.fecha) <= todayStr2).length;
  const futurasN     = citasMes.filter(c => normDate(c.fecha) > todayStr2).length;
  const eventosValFuturas = (allData.eventos || [])
    .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && normDate(e.fecha) > todayStr2; })
    .reduce((s,e) => s + parsePrecio(e.cobro), 0);
  const futurasVal   = citasMes.filter(c => normDate(c.fecha) > todayStr2).reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosValFuturas;
  const ingresoPaquetesMes = calcIngresoPaquetesMes(m, y);
  const ticketProm   = pasadasN > 0 ? Math.round(cobradoMes / pasadasN) : 0;

  const resEl = document.getElementById('finResumenMes');
  if (resEl) {
    resEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px">
        ${resRow('Total citas del mes', citasMes.length + canceladasN, '')}
        ${resRow('Sesiones realizadas', pasadasN, 'color:var(--ok)')}
        ${resRow('Próximas (futuras)', futurasN, futurasN>0?'color:var(--info)':'')}
        ${resRow('Canceladas', canceladasN, canceladasN>0?'color:var(--err)':'')}
        <div style="height:1px;background:var(--border);margin:4px 0"></div>
        ${resRow('Total cobrado', '$' + cobradoMes.toLocaleString('es-CO'), 'color:var(--primary);font-weight:700')}
        ${ingresoPaquetesMes > 0 ? resRow('  · Planes/paquetes', '$' + ingresoPaquetesMes.toLocaleString('es-CO'), 'color:var(--teal)') : ''}
        ${resRow('Por cobrar (futuras)', futurasVal > 0 ? '$' + futurasVal.toLocaleString('es-CO') : '—', 'color:var(--warn)')}
        ${resRow('Ticket promedio', ticketProm > 0 ? '$' + ticketProm.toLocaleString('es-CO') : '—', '')}
        ${meta ? resRow('Meta cumplida', Math.min(Math.round(cobradoMes/meta*100),100) + '%', cobradoMes >= meta ? 'color:var(--ok);font-weight:700' : 'color:var(--warn)') : ''}
      </div>`;
  }

  // ── Alerta semana floja ──
  _checkAlertaSemanFloja(citas);

  // ── Proyección extendida a fin de mes ──
  const proyExtEl = document.getElementById('finProyeccionExt');
  if (proyExtEl) {
    const diasMes   = new Date(y, m, 0).getDate();
    const diaActual = now.getDate();
    const diasRest  = diasMes - diaActual;
    const ritmoD    = diaActual > 0 ? cobradoMes / diaActual : 0;
    const proyFin   = Math.round(ritmoD * diasMes);
    const pctProy   = meta ? Math.min(Math.round(proyFin / meta * 100), 120) : null;
    const color     = !meta ? 'var(--primary)' : (pctProy >= 100 ? 'var(--ok)' : pctProy >= 70 ? 'var(--warn)' : '#ef4444');
    const indicador = !meta ? '🔵' : (pctProy >= 100 ? '🟢' : pctProy >= 70 ? '🟡' : '🔴');
    const promNec   = meta && diasRest > 0 ? Math.round((meta - cobradoMes) / diasRest) : 0;
    const difProyM  = meta ? proyFin - meta : null;
    proyExtEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px">
      <div style="padding:14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Proyección al día ${diasMes}</div>
        <div style="font-family:var(--font-h);font-size:1.25rem;font-weight:700;color:${color}">${indicador} $${proyFin.toLocaleString('es-CO')}</div>
        ${meta?`<div style="font-size:.73rem;color:var(--muted);margin-top:3px">${pctProy}% de la meta</div>`:''}
      </div>
      <div style="padding:14px;background:var(--s2);border-radius:10px">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Promedio diario actual</div>
        <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${Math.round(ritmoD).toLocaleString('es-CO')}</div>
        <div style="font-size:.73rem;color:var(--muted);margin-top:3px">Días restantes: ${diasRest}</div>
      </div>
      ${meta && diasRest > 0 ? `<div style="padding:14px;background:var(--s2);border-radius:10px;border-left:3px solid ${promNec > ritmoD ? '#ef4444':'var(--ok)'}">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Necesario/día para meta</div>
        <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${promNec > ritmoD ? '#ef4444':'var(--ok)'}">$${promNec.toLocaleString('es-CO')}</div>
        <div style="font-size:.73rem;color:var(--muted);margin-top:3px">${promNec>ritmoD?'Por encima del ritmo actual':'Dentro del ritmo ✓'}</div>
      </div>` : ''}
      ${difProyM !== null ? `<div style="padding:14px;background:var(--s2);border-radius:10px">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">Diferencia vs meta</div>
        <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${difProyM>=0?'var(--ok)':'#ef4444'}">${difProyM>=0?'+':''}$${difProyM.toLocaleString('es-CO')}</div>
      </div>` : ''}
    </div>`;
  }

  renderMetricas();
  renderEgresosList();
  renderKPITablero();
  renderEstructuraFinanciera();
}

// ══════════════════════════════════════════════════════════════
// ── EGRESOS ──
// ══════════════════════════════════════════════════════════════
const CONCEPTOS_EGRESO = {
  'Costos Fijos': ['Honorarios Fisio','Seguridad Social','Asistente Fisio','Auxiliar Administrativa'],
  'Costos Operativos': ['Arriendo','Servicios públicos','Suscripción IA','Suscripción CapCut','Asesorías AP x4/Mes'],
  'Costos Variables': ['Redes Sociales Contenido','Activación marca-Eventos','Pautas Redes','Mantenimiento y compras','Insumos'],
  'Otro': ['Otro']
};
const COSTOS_REFERENCIA = {
  'Honorarios Fisio': 4000000, 'Seguridad Social': 500000,
  'Asistente Fisio': 1200000, 'Auxiliar Administrativa': 500000,
  'Arriendo': 450000, 'Servicios públicos': 50000,
  'Suscripción IA': 80000, 'Suscripción CapCut': 12000, 'Asesorías AP x4/Mes': 480000,
  'Redes Sociales Contenido': 240000, 'Activación marca-Eventos': 300000,
  'Pautas Redes': 100000, 'Mantenimiento y compras': 200000, 'Insumos': 100000
};
const COSTO_BASE = 8212000, COSTO_PE = 8622600, COSTO_META = 10265000;
```

## calcCobradoMes

```javascript
function calcCobradoMes(mesParam, anyoParam) {
  const now = new Date();
  const m = mesParam  || now.getMonth()+1;
  const y = anyoParam || now.getFullYear();
  const todayStr = today();
  const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
  const citasTotal = citasReales()
    .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
    .reduce((s,c) => s + parsePrecio(c.precio), 0);
  const eventosTotal = (allData.eventos || [])
    .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
    .reduce((s,e) => s + parsePrecio(e.cobro), 0);
  return citasTotal + calcIngresoPaquetesMes(m, y) + eventosTotal;
}

// ══════════════════════════════════════════════════════════════
// ── NOTAS RÁPIDAS ──
// ══════════════════════════════════════════════════════════════
let _notasTimer = null;
```

## calcIngresoPaquetesMes

```javascript
function calcIngresoPaquetesMes(m, y) {
  return _getPkAsignados()
    .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
    .reduce((s,p) => s + parsePrecio(p.precio), 0);
}
```

## renderEgresosList

```javascript
function renderEgresosList() {
  const el = document.getElementById('egresosListResult');
  if (!el) return;

  const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
  const now = new Date();
  const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
  if (!filtroMes && document.getElementById('egresoMesFiltro')) {
    document.getElementById('egresoMesFiltro').value = defaultMes;
  }
  const mes = filtroMes || defaultMes;

  let arr = getEgresos();
  if (mes) arr = arr.filter(e => e.fecha && e.fecha.startsWith(mes));
  arr.sort((a,b) => b.fecha.localeCompare(a.fecha));

  if (!arr.length) {
    el.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin egresos registrados para este período</p></div>';
    return;
  }

  // Totales por categoría
  const totCat = {};
  arr.forEach(e => { totCat[e.categoria] = (totCat[e.categoria] || 0) + e.monto; });
  const totalMes = arr.reduce((s,e) => s + e.monto, 0);

  const catColors = { 'Costos Fijos':'#ef4444','Costos Operativos':'#f59e0b','Costos Variables':'#6366f1','Otro':'var(--muted)' };

  let resHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:20px">`;
  Object.entries(totCat).forEach(([cat, tot]) => {
    resHTML += `<div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid ${catColors[cat]||'var(--primary)'}">
      <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">${cat}</div>
      <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:${catColors[cat]||'var(--primary)'}">${fmtPeso(tot)}</div>
    </div>`;
  });
  resHTML += `<div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
    <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">TOTAL EGRESOS</div>
    <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)">${fmtPeso(totalMes)}</div>
  </div></div>`;

  resHTML += `<div class="tbl-wrap"><table style="width:100%;border-collapse:collapse;font-size:.84rem">
    <thead><tr style="background:var(--s2)">
      <th style="padding:9px 12px;text-align:left;font-family:var(--font-m);font-weight:600">Fecha</th>
      <th style="padding:9px 12px;text-align:left;font-family:var(--font-m);font-weight:600">Categoría</th>
      <th style="padding:9px 12px;text-align:left;font-family:var(--font-m);font-weight:600">Concepto</th>
      <th style="padding:9px 12px;text-align:right;font-family:var(--font-m);font-weight:600">Monto</th>
      <th style="padding:9px 12px;text-align:left;font-family:var(--font-m);font-weight:600">Descripción</th>
      <th style="padding:9px 12px;text-align:center;font-family:var(--font-m);font-weight:600"></th>
    </tr></thead><tbody>`;

  arr.forEach(e => {
    const ref = COSTOS_REFERENCIA[e.concepto];
    const diff = ref ? e.monto - ref : null;
    const diffTxt = diff !== null ? `<span style="font-size:.72rem;color:${diff>0?'#ef4444':'var(--ok)'};margin-left:4px">(${diff>0?'+':''}${fmtPeso(diff)} vs ref.)</span>` : '';
    resHTML += `<tr style="border-bottom:1px solid var(--border)">
      <td style="padding:9px 12px">${e.fecha}</td>
      <td style="padding:9px 12px"><span style="background:${catColors[e.categoria]||'var(--muted)'}22;color:${catColors[e.categoria]||'var(--muted)'};padding:2px 7px;border-radius:5px;font-size:.75rem;font-family:var(--font-m)">${e.categoria}</span></td>
      <td style="padding:9px 12px;font-weight:500">${e.concepto}</td>
      <td style="padding:9px 12px;text-align:right;font-weight:600;font-family:var(--font-m)">${fmtPeso(e.monto)}${diffTxt}</td>
      <td style="padding:9px 12px;color:var(--muted);font-size:.8rem">${e.descripcion||''}</td>
      <td style="padding:9px 12px;text-align:center"><button onclick="eliminarEgreso('${e.id}')" style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:.78rem;padding:3px 7px;border-radius:5px" title="Eliminar">✕</button></td>
    </tr>`;
  });
  resHTML += '</tbody></table></div>';
  el.innerHTML = resHTML;
}

// ══════════════════════════════════════════════════════════════
// ── KPI TABLERO ──
// ══════════════════════════════════════════════════════════════

// Valores por defecto — se sobreescriben con lo guardado en localStorage
const COSTOS_DEFAULTS = {
  // Costos Fijos
  honorarios_fisio:   4000000,
  seguridad_social:    500000,
  asistente_fisio:    1200000,
  auxiliar_admin:      500000,
  // Costos Operativos
  arriendo:            450000,
  servicios_publicos:   50000,
  suscripcion_ia:       80000,
  suscripcion_capcut:   12000,
  asesorias_ap:        480000,
  // Costos Variables
  redes_contenido:     240000,
  activacion_eventos:  300000,
  pautas_redes:        100000,
  mantenimiento:       200000,
  insumos:             100000,
  // Porcentajes adicionales
  pct_imprevistos: 5,
  pct_utilidad:   20,
};
```

## getEgresos

```javascript
function getEgresos() {
  try { return JSON.parse(kvGet('egresos') || '[]'); } catch { return []; }
}
```

## saveEgresos

```javascript
function saveEgresos(arr) { kvSet('egresos', JSON.stringify(arr)); }
```

## guardarEgreso

```javascript
function guardarEgreso() {
  const fecha = document.getElementById('egresoFecha').value;
  const cat   = document.getElementById('egresoCategoria').value;
  const conc  = document.getElementById('egresoConcepto').value;
  const monto = parseInt((document.getElementById('egresoMonto').value || '').replace(/\D/g,''), 10);
  const desc  = document.getElementById('egresoDesc').value.trim();

  if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
  if (!monto || monto <= 0) { toast('Ingresa un monto válido', 'err'); return; }

  const arr = getEgresos();
  arr.push({ id: Date.now().toString(), fecha, categoria: cat, concepto: conc, monto, descripcion: desc });
  saveEgresos(arr);

  document.getElementById('egresoFecha').value  = '';
  document.getElementById('egresoMonto').value  = '';
  document.getElementById('egresoDesc').value   = '';
  toast('Egreso registrado', 'ok');
  renderEgresosList();
  renderEstructuraFinanciera();
}
```

## eliminarEgreso

```javascript
function eliminarEgreso(id) {
  if (!confirm('¿Eliminar este egreso?')) return;
  saveEgresos(getEgresos().filter(e => e.id !== id));
  renderEgresosList();
  renderEstructuraFinanciera();
}
```

## actualizarConceptosEgreso

```javascript
function actualizarConceptosEgreso() {
  const cat  = document.getElementById('egresoCategoria').value;
  const sel  = document.getElementById('egresoConcepto');
  const opts = CONCEPTOS_EGRESO[cat] || ['Otro'];
  sel.innerHTML = opts.map(o => `<option>${o}</option>`).join('');
}
```

## renderEstructuraFinanciera

```javascript
function renderEstructuraFinanciera() {
  const el = document.getElementById('estructuraFinResult');
  if (!el) return;

  const ingMes = calcCobradoMes();
  const now = new Date();
  const mes = filtroMesEgresos => {
    const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
    return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
  };
  const egresosMes = (() => {
    const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
    return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
  })();
  const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
  const utilidadBruta = ingMes - totalEgresosMes;

  const pctPE   = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_PE * 100), 100) : 0;
  const pctMeta = ingMes > 0 ? Math.min(Math.round(ingMes / COSTO_META * 100), 100) : 0;
  const colorPE   = ingMes >= COSTO_PE ? 'var(--ok)' : ingMes >= COSTO_BASE ? '#f59e0b' : '#ef4444';
  const colorMeta = ingMes >= COSTO_META ? 'var(--ok)' : '#f59e0b';

  function barRow(label, pct, color) {
    return `<div style="margin-bottom:6px">
      <div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:3px">
        <span style="color:var(--muted)">${label}</span><span style="color:${color};font-weight:600">${pct}%</span>
      </div>
      <div style="height:7px;background:var(--s2);border-radius:99px;overflow:hidden">
        <div style="width:${pct}%;height:100%;background:${color};border-radius:99px;transition:width .4s"></div>
      </div>
    </div>`;
  }

  let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
    <!-- Semáforo financiero -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">🚦 Semáforo financiero — mes actual</div>
      <div style="margin-bottom:12px">
        <div style="font-size:.78rem;color:var(--muted);margin-bottom:4px">Ingresos mes: <strong style="color:var(--text)">${fmtPeso(ingMes)}</strong></div>
        <div style="font-size:.78rem;color:var(--muted);margin-bottom:12px">Egresos registrados: <strong style="color:#ef4444">${fmtPeso(totalEgresosMes)}</strong></div>
        ${barRow('vs Punto equilibrio supervivencia (' + fmtPeso(COSTO_BASE) + ')', Math.min(Math.round(ingMes/COSTO_BASE*100),100), ingMes>=COSTO_BASE?'var(--ok)':'#ef4444')}
        ${barRow('vs Punto equilibrio operativo (' + fmtPeso(COSTO_PE) + ')', pctPE, colorPE)}
        ${barRow('vs Meta de facturación (' + fmtPeso(COSTO_META) + ')', pctMeta, colorMeta)}
      </div>
      ${totalEgresosMes > 0 ? `<div style="padding:10px;background:var(--s2);border-radius:8px;font-size:.82rem">
        <strong>Utilidad bruta estimada:</strong>
        <span style="color:${utilidadBruta>=0?'var(--ok)':'#ef4444'};font-weight:700;margin-left:6px">${fmtPeso(utilidadBruta)}</span>
        ${utilidadBruta>=0?'<span style="color:var(--muted);font-size:.75rem;margin-left:4px">('+Math.round(utilidadBruta/ingMes*100)+'% margen)</span>':''}
      </div>` : '<div style="font-size:.78rem;color:var(--muted)">Registra egresos para ver la utilidad bruta</div>'}
    </div>

    <!-- Costo por hora -->
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">⏱️ Análisis de rentabilidad por servicio</div>
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:12px">Capacidad: 208h/mes (Jessica 40h/sem + Asistente 20h/sem)</div>
      <div class="tbl-wrap"><table style="width:100%;border-collapse:collapse;font-size:.82rem">
        <thead><tr style="background:var(--s2)">
          <th style="padding:7px 10px;text-align:left;font-family:var(--font-m)">Servicio</th>
          <th style="padding:7px 10px;text-align:center;font-family:var(--font-m)">Tiempo</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Precio</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Ingreso/h</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Margen/h</th>
        </tr></thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:600">Corporativo</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)">60 min</td>
            <td style="padding:7px 10px;text-align:right">${fmtPeso(120000)}</td>
            <td style="padding:7px 10px;text-align:right;font-weight:700;color:var(--ok)">${fmtPeso(120000)}</td>
            <td style="padding:7px 10px;text-align:right;color:var(--ok)">+${fmtPeso(70649)}</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:600">Descarga Express</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)">50 min</td>
            <td style="padding:7px 10px;text-align:right">${fmtPeso(75000)}</td>
            <td style="padding:7px 10px;text-align:right;font-weight:700;color:#10b981">${fmtPeso(90000)}</td>
            <td style="padding:7px 10px;text-align:right;color:#10b981">+${fmtPeso(40649)}</td>
          </tr>
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:600">Readaptación</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)">50 min</td>
            <td style="padding:7px 10px;text-align:right">${fmtPeso(70000)}</td>
            <td style="padding:7px 10px;text-align:right;font-weight:700;color:#6366f1">${fmtPeso(84000)}</td>
            <td style="padding:7px 10px;text-align:right;color:#6366f1">+${fmtPeso(34649)}</td>
          </tr>
          <tr>
            <td style="padding:7px 10px;font-weight:600">Descarga Full ⚠️</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)">90 min</td>
            <td style="padding:7px 10px;text-align:right">${fmtPeso(110000)}</td>
            <td style="padding:7px 10px;text-align:right;font-weight:700;color:#f59e0b">${fmtPeso(73333)}</td>
            <td style="padding:7px 10px;text-align:right;color:#f59e0b">+${fmtPeso(23982)}</td>
          </tr>
        </tbody>
      </table></div>
      <div style="margin-top:10px;padding:9px 12px;background:rgba(245,158,11,.08);border-radius:8px;font-size:.78rem;color:#f59e0b">
        ⚠️ Costo/hora operativa: <strong>${fmtPeso(49351)}/h</strong> (meta utilidad). 2 Express = ${fmtPeso(150000)} en 100 min vs 1 Full = ${fmtPeso(110000)} en 90 min.
      </div>
    </div>
  </div>

  <!-- Estructura de costos -->
  <div class="card">
    <div class="card-title" style="margin-bottom:16px">📋 Estructura de costos de referencia</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
      <div>
        <div style="font-size:.78rem;font-weight:700;color:#ef4444;font-family:var(--font-m);margin-bottom:8px;text-transform:uppercase">Costos Fijos</div>
        ${[['Honorarios Fisio','$4.000.000'],['Seguridad Social','$500.000'],['Asistente Fisio','$1.200.000'],['Auxiliar Administrativa','$500.000']].map(([c,v]) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.82rem"><span style="color:var(--muted)">${c}</span><span style="font-weight:600">${v}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:.82rem;font-weight:700"><span>Subtotal</span><span>$6.200.000</span></div>
      </div>
      <div>
        <div style="font-size:.78rem;font-weight:700;color:#f59e0b;font-family:var(--font-m);margin-bottom:8px;text-transform:uppercase">Costos Operativos</div>
        ${[['Arriendo','$450.000'],['Servicios públicos','$50.000'],['Suscripción IA','$80.000'],['Suscripción CapCut','$12.000'],['Asesorías AP x4','$480.000']].map(([c,v]) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.82rem"><span style="color:var(--muted)">${c}</span><span style="font-weight:600">${v}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:.82rem;font-weight:700"><span>Subtotal</span><span>$1.072.000</span></div>
      </div>
      <div>
        <div style="font-size:.78rem;font-weight:700;color:#6366f1;font-family:var(--font-m);margin-bottom:8px;text-transform:uppercase">Costos Variables</div>
        ${[['Redes Sociales','$240.000'],['Activación marca','$300.000'],['Pautas Redes','$100.000'],['Mantenimiento','$200.000'],['Insumos','$100.000']].map(([c,v]) => `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.82rem"><span style="color:var(--muted)">${c}</span><span style="font-weight:600">${v}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:.82rem;font-weight:700"><span>Subtotal</span><span>$940.000</span></div>
      </div>
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">
      <div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid #ef4444">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Costos base totales</div>
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h);color:#ef4444">${fmtPeso(COSTO_BASE)}</div>
      </div>
      <div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid #f59e0b">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Punto equil. operativo (+5%)</div>
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h);color:#f59e0b">${fmtPeso(COSTO_PE)}</div>
      </div>
      <div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid var(--ok)">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Meta facturación (+20% utilidad)</div>
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h);color:var(--ok)">${fmtPeso(COSTO_META)}</div>
      </div>
      <div style="padding:12px;background:var(--s2);border-radius:10px">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Punto equilibrio en sesiones</div>
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h)">129 sesiones/mes</div>
        <div style="font-size:.72rem;color:var(--muted)">~30/sem · Ticket prom. $83.000</div>
      </div>
    </div>
  </div>`;

  el.innerHTML = html;
}

// ══════════════════════════════════════════════════════════════
// ── MÉTRICAS INTELIGENTES ──
// ══════════════════════════════════════════════════════════════
```

## renderIngresosDetalle

```javascript
function renderIngresosDetalle() {
  const fechaInp = document.getElementById('ingresosFechaInput');
  const resultEl = document.getElementById('ingresosDetalleResult');
  const analEl   = document.getElementById('ingresosAnalisis');
  const labelEl  = document.getElementById('ingresosRangoLabel');
  if (!fechaInp || !resultEl) return;
  const fechaSel = fechaInp.value;
  if (!fechaSel) { resultEl.innerHTML = '<div style="color:var(--muted);font-size:.85rem">Selecciona una fecha.</div>'; if (analEl) analEl.innerHTML=''; return; }

  const citas = citasReales();
  const DIAS_NOM = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const MESES_NOM = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  // ── MODO DÍA ──
  if (_modoIngresos === 'dia') {
    const citasDia  = citas.filter(c => normDate(c.fecha) === fechaSel);
    const evtsDia   = (allData.eventos||[]).filter(e => normDate(e.fecha) === fechaSel);
    const total     = citasDia.reduce((s,c) => s + parsePrecio(c.precio), 0)
                    + evtsDia.reduce((s,e) => s + parsePrecio(e.cobro), 0);
    const dObj = new Date(fechaSel+'T12:00:00');
    if (labelEl) labelEl.textContent = DIAS_NOM[dObj.getDay()] + ' ' + dObj.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'});
    if (!citasDia.length && !evtsDia.length) {
      resultEl.innerHTML = '<div style="color:var(--muted);font-size:.85rem;padding:16px 0">Sin citas registradas para este día.</div>';
      if (analEl) analEl.innerHTML = '';
      return;
    }
    // Servicio más frecuente del día
    const srvDia = {};
    citasDia.forEach(c => { srvDia[c.servicio||'—'] = (srvDia[c.servicio||'—']||0)+1; });
    const topSrvDia = Object.entries(srvDia).sort((a,b)=>b[1]-a[1])[0];

    const totalItems = citasDia.length + evtsDia.length;
    resultEl.innerHTML = `
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <span style="font-family:var(--font-h);font-size:1.6rem;color:var(--primary)">$${total.toLocaleString('es-CO')}</span>
        <span style="font-size:.8rem;color:var(--muted)">${citasDia.length} cita${citasDia.length!==1?'s':''}${evtsDia.length?' + '+evtsDia.length+' evento(s)':''}</span>
        ${totalItems > 0 ? `<span style="font-size:.8rem;color:var(--muted)">· Ticket promedio: <strong>$${Math.round(total/totalItems).toLocaleString('es-CO')}</strong></span>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${citasDia.sort((a,b)=>(a.hora||'').localeCompare(b.hora||'')).map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 10px;background:var(--s2);border-radius:8px;gap:10px">
            <span style="color:var(--muted);min-width:44px">${c.hora||'—'}</span>
            <span style="flex:1;font-weight:500">${c.nombre||'—'}</span>
            <span style="color:var(--muted);flex:1;font-size:.78rem">${c.servicio||'—'}</span>
            <span style="font-family:var(--font-m);color:var(--primary)">$${parsePrecio(c.precio).toLocaleString('es-CO')}</span>
          </div>`).join('')}
        ${evtsDia.sort((a,b)=>(a.horaInicio||'').localeCompare(b.horaInicio||'')).map(e => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 10px;background:rgba(124,58,237,.07);border-radius:8px;gap:10px;border-left:3px solid #7c3aed">
            <span style="color:var(--muted);min-width:44px">${e.horaInicio||'—'}</span>
            <span style="flex:1;font-weight:500">⚡ ${e.titulo||'—'}</span>
            <span style="color:var(--muted);flex:1;font-size:.78rem">${e.tipo||'Evento externo'}</span>
            <span style="font-family:var(--font-m);color:#7c3aed">$${parsePrecio(e.cobro).toLocaleString('es-CO')}</span>
          </div>`).join('')}
      </div>`;
    if (analEl) analEl.innerHTML = '';

  // ── MODO SEMANA ──
  } else if (_modoIngresos === 'semana') {
    const ref = new Date(fechaSel+'T12:00:00');
    const dow = ref.getDay();
    const lunes = new Date(ref); lunes.setDate(ref.getDate() - (dow===0?6:dow-1));
    const domingo = new Date(lunes); domingo.setDate(lunes.getDate()+6);
    if (labelEl) labelEl.textContent = 'Semana del ' + _ingFmtLabel(lunes) + ' al ' + _ingFmtLabel(domingo);

    const dias = [];
    for (let i=0;i<7;i++) {
      const d = new Date(lunes); d.setDate(lunes.getDate()+i);
      const fStr = _ingFmt(d);
      const cs = citas.filter(c => normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fStr);
      const totalEvts = es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      dias.push({ fecha:fStr, dia:DIAS_NOM[d.getDay()], citas:cs, eventos:es, total:cs.reduce((s,c)=>s+parsePrecio(c.precio),0)+totalEvts });
    }
    const totalSem = dias.reduce((s,d)=>s+d.total,0);
    const nCitas   = dias.reduce((s,d)=>s+d.citas.length,0);
    const maxDia   = Math.max(...dias.map(d=>d.total),1);
    const mejorDia = [...dias].sort((a,b)=>b.total-a.total)[0];
    const ticketProm = nCitas > 0 ? Math.round(totalSem/nCitas) : 0;

    // Semana anterior para comparar
    const lunesAnt = new Date(lunes); lunesAnt.setDate(lunes.getDate()-7);
    const domAnt   = new Date(lunesAnt); domAnt.setDate(lunesAnt.getDate()+6);
    let totalAnt = 0, nCitasAnt = 0;
    for (let i=0;i<7;i++) {
      const d = new Date(lunesAnt); d.setDate(lunesAnt.getDate()+i);
      const fAnt = _ingFmt(d);
      const cs = citas.filter(c => normDate(c.fecha)===fAnt);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fAnt);
      totalAnt += cs.reduce((s,c)=>s+parsePrecio(c.precio),0) + es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      nCitasAnt += cs.length;
    }
    const diffSem = totalSem - totalAnt;
    const pctDiff = totalAnt>0 ? Math.round(diffSem/totalAnt*100) : null;

    // Servicios de la semana
    const srvSem = {};
    dias.flatMap(d=>d.citas).forEach(c => { srvSem[c.servicio||'—']=(srvSem[c.servicio||'—']||0)+1; });
    const topSrvSem = Object.entries(srvSem).sort((a,b)=>b[1]-a[1]).slice(0,3);

    // Pacientes nuevos vs recurrentes en la semana
    const nomsSem = dias.flatMap(d=>d.citas).map(c=>(c.nombre||'').toLowerCase().trim()).filter(Boolean);
    const contGlobal = {};
    citas.forEach(c => { const n=(c.nombre||'').toLowerCase().trim(); contGlobal[n]=(contGlobal[n]||0)+1; });
    const nuevosSem = nomsSem.filter(n => contGlobal[n]===1).length;
    const recSem    = nomsSem.filter(n => contGlobal[n]>1).length;

    resultEl.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Total semana</div>
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">$${totalSem.toLocaleString('es-CO')}</div>
          <div style="font-size:.73rem;color:var(--muted)">${nCitas} cita${nCitas!==1?'s':''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Ticket promedio</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${ticketProm.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${diffSem>=0?'var(--ok)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">vs semana anterior</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${diffSem>=0?'var(--ok)':'#ef4444'}">${diffSem>=0?'↑':'↓'} ${pctDiff!==null?Math.abs(pctDiff)+'%':'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${diffSem>=0?'+':''}$${diffSem.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Mejor día</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)">${mejorDia.total>0?mejorDia.dia:'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${mejorDia.total>0?'$'+mejorDia.total.toLocaleString('es-CO'):''}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${dias.map(d => {
          const pct = Math.round(d.total/maxDia*100);
          const esHoy = d.fecha===today();
          return `<div style="padding:8px 0">
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:4px">
              <span style="font-weight:${d.citas.length?'600':'400'};color:${esHoy?'var(--primary)':d.citas.length?'var(--text)':'var(--muted)'}">${d.dia}${esHoy?' (hoy)':''}</span>
              <span style="font-family:var(--font-m);color:${d.total>0?'var(--primary)':'var(--muted)'}">
                ${d.total>0?'$'+d.total.toLocaleString('es-CO'):'—'} <span style="color:var(--muted);font-size:.72rem">${d.citas.length?d.citas.length+' cita'+(d.citas.length!==1?'s':''):''}</span>
              </span>
            </div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:${esHoy?'var(--primary)':'#6366f1'}"></div></div>
            ${d.citas.length ? `<div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px">${d.citas.sort((a,b)=>(a.hora||'').localeCompare(b.hora||'')).map(c=>`<span style="font-size:.7rem;padding:2px 8px;background:var(--s2);border-radius:99px;color:var(--muted)">${c.hora||''} ${c.nombre||''}</span>`).join('')}</div>` : ''}
          </div>`;
        }).join('')}
      </div>`;

    // Análisis semanal
    if (analEl) analEl.innerHTML = _analisisSemana({ totalSem, nCitas, ticketProm, diffSem, pctDiff, mejorDia, topSrvSem, nuevosSem, recSem, totalAnt, nCitasAnt, dias, lunes });

  // ── MODO MES ──
  } else {
    const refD = new Date(fechaSel+'T12:00:00');
    const mesN = refD.getMonth();
    const yearN = refD.getFullYear();
    const diasMes = new Date(yearN, mesN+1, 0).getDate();
    const hoyStr = today();
    if (labelEl) labelEl.textContent = MESES_NOM[mesN] + ' ' + yearN;

    // Días del mes
    const diasData = [];
    for (let i=1;i<=diasMes;i++) {
      const fStr = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(i).padStart(2,'0');
      const cs = citas.filter(c => normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fStr);
      const totalEvts = es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      diasData.push({ fecha:fStr, num:i, dia:DIAS_NOM[new Date(fStr+'T12:00:00').getDay()], citas:cs, eventos:es, total:cs.reduce((s,c)=>s+parsePrecio(c.precio),0)+totalEvts, esFuturo: fStr > hoyStr });
    }
    const totalMes   = diasData.reduce((s,d)=>s+d.total,0);
    const nCitasMes  = diasData.reduce((s,d)=>s+d.citas.length,0);
    const maxDiaMes  = Math.max(...diasData.map(d=>d.total),1);
    const ticketM    = nCitasMes>0 ? Math.round(totalMes/nCitasMes) : 0;
    const diasConCitas = diasData.filter(d=>d.citas.length>0||d.eventos.length>0);
    const mejorDiaMes  = [...diasData].sort((a,b)=>b.total-a.total)[0];
    const peorDiaMes   = diasConCitas.length ? [...diasConCitas].sort((a,b)=>a.total-b.total)[0] : null;

    // Mes anterior
    const mesAntD = new Date(yearN, mesN-1, 1);
    const mesAntN = mesAntD.getMonth(), yearAntN = mesAntD.getFullYear();
    const diasMesAnt = new Date(yearAntN, mesAntN+1, 0).getDate();
    let totalMesAnt=0, nCitasMesAnt=0;
    for (let i=1;i<=diasMesAnt;i++) {
      const fStr = yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+String(i).padStart(2,'0');
      const cs = citas.filter(c=>normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e=>normDate(e.fecha)===fStr);
      totalMesAnt += cs.reduce((s,c)=>s+parsePrecio(c.precio),0) + es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      nCitasMesAnt += cs.length;
    }
    const diffMes = totalMes - totalMesAnt;
    const pctDiffM = totalMesAnt>0 ? Math.round(diffMes/totalMesAnt*100) : null;

    // Servicios del mes
    const srvMes = {};
    diasData.flatMap(d=>d.citas).forEach(c=>{srvMes[c.servicio||'—']=(srvMes[c.servicio||'—']||0)+1;});
    const topSrvMes = Object.entries(srvMes).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const maxSrvMes = topSrvMes[0]?topSrvMes[0][1]:1;

    // Pacientes
    const nomsMes = diasData.flatMap(d=>d.citas).map(c=>(c.nombre||'').toLowerCase().trim()).filter(Boolean);
    const contG = {};
    citas.forEach(c=>{const n=(c.nombre||'').toLowerCase().trim();contG[n]=(contG[n]||0)+1;});
    const nuevosMes = nomsMes.filter(n=>contG[n]===1).length;
    const recMes    = nomsMes.filter(n=>contG[n]>1).length;

    // Semanas del mes
    const semanasMap = {};
    diasData.forEach(d => {
      const dObj = new Date(d.fecha+'T12:00:00');
      const dow = dObj.getDay();
      const lu = new Date(dObj); lu.setDate(dObj.getDate()-(dow===0?6:dow-1));
      const key = _ingFmt(lu);
      if (!semanasMap[key]) semanasMap[key] = { lunesStr:key, total:0, n:0 };
      semanasMap[key].total += d.total;
      semanasMap[key].n     += d.citas.length;
    });
    const semanas = Object.values(semanasMap).sort((a,b)=>a.lunesStr.localeCompare(b.lunesStr));
    const maxSemana = Math.max(...semanas.map(s=>s.total),1);

    // Meta mensual
    const meta = getMeta();

    resultEl.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Total mes</div>
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">$${totalMes.toLocaleString('es-CO')}</div>
          <div style="font-size:.73rem;color:var(--muted)">${nCitasMes} cita${nCitasMes!==1?'s':''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Ticket promedio</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${ticketM.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${diffMes>=0?'var(--ok)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">vs mes anterior</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${diffMes>=0?'var(--ok)':'#ef4444'}">${diffMes>=0?'↑':'↓'} ${pctDiffM!==null?Math.abs(pctDiffM)+'%':'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${diffMes>=0?'+':''}$${diffMes.toLocaleString('es-CO')}</div>
        </div>
        ${meta ? `<div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${totalMes>=meta?'var(--ok)':totalMes/meta>=.7?'var(--warn)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Meta mensual</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${totalMes>=meta?'var(--ok)':totalMes/meta>=.7?'var(--warn)':'#ef4444'}">${Math.min(Math.round(totalMes/meta*100),100)}%</div>
          <div style="font-size:.73rem;color:var(--muted)">$${meta.toLocaleString('es-CO')}</div>
        </div>` : ''}
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Mejor día</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)">${mejorDiaMes.total>0?mejorDiaMes.dia+' '+mejorDiaMes.num:'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${mejorDiaMes.total>0?'$'+mejorDiaMes.total.toLocaleString('es-CO'):''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Pacientes</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700">${nuevosMes} nuevos · ${recMes} recurrentes</div>
        </div>
      </div>

      <!-- Barras semanales -->
      <div style="margin-bottom:20px">
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Ingresos por semana</div>
        ${semanas.map(s => {
          const pct = Math.round(s.total/maxSemana*100);
          const lu = new Date(s.lunesStr+'T12:00:00');
          const do2 = new Date(lu); do2.setDate(lu.getDate()+6);
          return `<div style="padding:6px 0">
            <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:3px">
              <span style="color:var(--muted)">${_ingFmtLabel(lu)} — ${_ingFmtLabel(do2)}</span>
              <span style="font-family:var(--font-m);color:${s.total>0?'var(--primary)':'var(--muted)'}">${s.total>0?'$'+s.total.toLocaleString('es-CO'):'—'} <span style="font-size:.7rem;color:var(--muted)">${s.n?s.n+' citas':''}</span></span>
            </div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:var(--primary)"></div></div>
          </div>`;
        }).join('')}
      </div>

      <!-- Servicios del mes -->
      <div style="margin-bottom:20px">
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Servicios más frecuentes</div>
        ${topSrvMes.map(([s,n],i) => `
          <div class="metric-row">
            <div style="font-size:.8rem;flex:2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${i===0?'🥇 ':''}${s}</div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxSrvMes*100)}%;background:${i===0?'var(--primary)':'#6366f1'}"></div></div>
            <div class="metric-val" style="color:${i===0?'var(--primary)':'#6366f1'}">${n}</div>
          </div>`).join('')}
      </div>

      <!-- Detalle por días (lista compacta) -->
      <div>
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Detalle día a día</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:6px">
          ${diasData.filter(d=>d.citas.length>0).map(d => `
            <div style="padding:8px 12px;background:var(--s2);border-radius:8px;display:flex;justify-content:space-between;align-items:center;${d.esFuturo?'opacity:.65':''}">
              <div>
                <span style="font-size:.8rem;font-weight:600">${d.dia} ${d.num}</span>
                <span style="font-size:.73rem;color:var(--muted);margin-left:6px">${d.citas.length} cita${d.citas.length!==1?'s':''}</span>
                ${d.esFuturo?'<span style="font-size:.68rem;color:var(--warn);margin-left:4px">· programada</span>':''}
              </div>
              <span style="font-family:var(--font-m);font-size:.85rem;color:var(--primary)">$${d.total.toLocaleString('es-CO')}</span>
            </div>`).join('')}
        </div>
      </div>`;

    if (analEl) analEl.innerHTML = _analisisMes({ totalMes, nCitasMes, ticketM, diffMes, pctDiffM, mejorDiaMes, peorDiaMes, topSrvMes, nuevosMes, recMes, totalMesAnt, nCitasMesAnt, semanas, meta, diasMes, mesNombre: MESES_NOM[mesN] });
  }
}

// ── Análisis financiero semanal ──
```

## renderCitasResumen

```javascript
function renderCitasResumen() {
  try {
    const el = document.getElementById('citasResumenStats');
    if (!el) return;
    const citas = citasReales();
    const fechaInp = document.getElementById('ingresosFechaInput');
    const fechaSel = (fechaInp && fechaInp.value) ? fechaInp.value : today();
    const modo = _modoIngresos || 'semana';
    const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const DIAS  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

    // Cuenta citas en un rango [desde, hasta] (strings YYYY-MM-DD)
    const contarEntre = (desde, hasta) =>
      citas.filter(c => { const f = normDate(c.fecha); return f >= desde && f <= hasta; }).length;

    // Formatea Date → 'YYYY-MM-DD'
    const ds = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');

    const badge = (diff, nAnt, label) => {
      const color = diff > 0 ? '#059669' : diff < 0 ? '#ef4444' : 'var(--muted)';
      const txt = diff > 0 ? '↑ '+diff+' cita'+(diff!==1?'s':'')
                : diff < 0 ? '↓ '+Math.abs(diff)+' cita'+(Math.abs(diff)!==1?'s':'')
                : '= igual';
      return `<div style="margin-top:5px;font-size:.71rem;color:var(--muted)">${label}: <strong style="color:${color}">${txt}</strong> (antes: ${nAnt})</div>`;
    };

    const card = (titulo, n, badgeHtml, color) =>
      `<div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">${titulo}</div>
        <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${color};line-height:1.1">${n}</div>
        ${badgeHtml}
      </div>`;

    let c1 = '', c2 = '';

    if (modo === 'dia') {
      const ref  = new Date(fechaSel+'T12:00:00');
      const nDia = contarEntre(fechaSel, fechaSel);
      const ayer = new Date(ref); ayer.setDate(ref.getDate()-1);
      const nAyer = contarEntre(ds(ayer), ds(ayer));
      const semAnt = new Date(ref); semAnt.setDate(ref.getDate()-7);
      const nSemAnt = contarEntre(ds(semAnt), ds(semAnt));
      const label = DIAS[ref.getDay()]+' '+ref.getDate()+' de '+MESES[ref.getMonth()];
      c1 = card(label, nDia, badge(nDia-nAyer, nAyer, 'vs ayer'), '#6366f1');
      c2 = card('Mismo día sem. anterior', nSemAnt, badge(nDia-nSemAnt, nSemAnt, 'diferencia'), 'var(--primary)');

    } else if (modo === 'semana') {
      const ref = new Date(fechaSel+'T12:00:00');
      const dow = ref.getDay();
      const lun = new Date(ref); lun.setDate(ref.getDate()-(dow===0?6:dow-1));
      const dom = new Date(lun); dom.setDate(lun.getDate()+6);
      const nSem = contarEntre(ds(lun), ds(dom));
      const lunAnt = new Date(lun); lunAnt.setDate(lun.getDate()-7);
      const domAnt = new Date(dom); domAnt.setDate(dom.getDate()-7);
      const nSemAnt = contarEntre(ds(lunAnt), ds(domAnt));
      const label = lun.getDate()+'/'+String(lun.getMonth()+1).padStart(2,'0')+' – '+dom.getDate()+'/'+String(dom.getMonth()+1).padStart(2,'0');
      c1 = card('Semana '+label, nSem, badge(nSem-nSemAnt, nSemAnt, 'vs sem. anterior'), '#6366f1');
      // Mes completo en que cae esta semana
      const mesN = lun.getMonth(), yearN = lun.getFullYear();
      const inicioMes = yearN+'-'+String(mesN+1).padStart(2,'0')+'-01';
      const finMes    = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(new Date(yearN,mesN+1,0).getDate()).padStart(2,'0');
      const nMes = contarEntre(inicioMes, finMes);
      const mesAntN = mesN===0?11:mesN-1, yearAntN = mesN===0?yearN-1:yearN;
      const diasAnt = new Date(yearAntN,mesAntN+1,0).getDate();
      const hastaMA = String(Math.min(new Date().getDate(), diasAnt)).padStart(2,'0');
      const nMesAnt = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+hastaMA);
      c2 = card(MESES[mesN]+' '+yearN, nMes, badge(nMes-nMesAnt, nMesAnt, 'vs '+MESES[mesAntN]+' día '+parseInt(hastaMA)), 'var(--primary)');

    } else {
      const ref  = new Date(fechaSel+'T12:00:00');
      const mesN = ref.getMonth(), yearN = ref.getFullYear();
      const inicioMes = yearN+'-'+String(mesN+1).padStart(2,'0')+'-01';
      const finMes    = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(new Date(yearN,mesN+1,0).getDate()).padStart(2,'0');
      const nMes = contarEntre(inicioMes, finMes);
      const mesAntN = mesN===0?11:mesN-1, yearAntN = mesN===0?yearN-1:yearN;
      const diasAnt = new Date(yearAntN,mesAntN+1,0).getDate();
      const hastaMA = String(Math.min(new Date().getDate(), diasAnt)).padStart(2,'0');
      const nMesAnt = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+hastaMA);
      const nMesAntCompleto = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+String(diasAnt).padStart(2,'0'));
      c1 = card(MESES[mesN]+' '+yearN, nMes, badge(nMes-nMesAnt, nMesAnt, 'vs '+MESES[mesAntN]+' hasta día '+parseInt(hastaMA)), 'var(--primary)');
      c2 = card(MESES[mesAntN]+' (mes completo)', nMesAntCompleto, '', '#6366f1');
    }

    el.innerHTML = `
      <div style="border-bottom:1px solid var(--border);padding-bottom:16px;margin-bottom:16px">
        <div style="font-size:.75rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">📊 Resumen de citas</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${c1}${c2}</div>
      </div>`;
  } catch(err) {
    const el = document.getElementById('citasResumenStats');
    if (el) el.innerHTML = '';
  }
}
```

## setModoIngresos

```javascript
function setModoIngresos(modo) {
  _modoIngresos = modo;
  ['dia','semana','mes'].forEach(m => {
    const id = 'btnModo'+m.charAt(0).toUpperCase()+m.slice(1);
    const el = document.getElementById(id);
    if (el) el.className = m === modo ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
  });
  // En modo mes el input de fecha solo necesita año-mes; mostramos un mes-picker alternativo
  renderCitasResumen();
  renderIngresosDetalle();
}
```

## exportarCSV

```javascript
function exportarCSV(modo) {
  const now = new Date();
  const m   = now.getMonth()+1;
  const y   = now.getFullYear();
  let citas = citasReales().filter(esCobrada);

  if (modo === 'mes') {
    citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
  }

  // Agregar eventos externos como filas adicionales
  let evts = (allData.eventos || []);
  if (modo === 'mes') {
    evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
  }
  const filasEventos = evts.map(e => ({
    fecha: normDate(e.fecha), hora: e.horaInicio||'', nombre: e.titulo||'',
    telefono: '', email: '', servicio: e.tipo||'Evento externo',
    modalidad: '—', precio: e.cobro||'', estado: '⚡ Evento'
  }));

  citas.sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
  filasEventos.sort((a,b) => a.fecha.localeCompare(b.fecha));

  const header = ['Fecha','Hora','Paciente','Teléfono','Email','Servicio','Modalidad','Valor','Estado'];
  const rows = [
    ...citas.map(c => [
      normDate(c.fecha), c.hora||'', c.nombre||'', c.telefono||'', c.email||'',
      c.servicio||'', c.modalidad||'', c.precio||'', c.estado||''
    ]),
    ...filasEventos.map(e => [
      e.fecha, e.hora, e.nombre, e.telefono, e.email,
      e.servicio, e.modalidad, e.precio, e.estado
    ])
  ].sort((a,b) => a[0].localeCompare(b[0]));

  const csvContent = [header, ...rows]
    .map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))
    .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const nombre = modo === 'mes'
    ? `ingresos_${y}-${pad(m)}.csv`
    : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
  a.href = url; a.download = nombre; a.click();
  URL.revokeObjectURL(url);
  toast('CSV descargado: ' + nombre);
}

// Adaptadores de compatibilidad — Fase 5 Pasaporte.
```

## renderConveniosReport

```javascript
function renderConveniosReport() {
  const filtroMes = document.getElementById('convenioMesFiltro').value; // 'YYYY-MM' o vacío
  const el = document.getElementById('conveniosReportResult');
  if (!el) return;

  const citas = (allData.citas || []).filter(c => {
    if (!c.gimnasio) return false;
    if (filtroMes && !normDate(c.fecha).startsWith(filtroMes)) return false;
    return true;
  });

  if (!citas.length) {
    el.innerHTML = '<p style="font-size:.85rem;color:var(--muted);text-align:center;padding:20px 0">No hay citas con convenio' + (filtroMes ? ' en este mes' : '') + '.</p>';
    return;
  }

  const porGym = {};
  citas.forEach(c => {
    const g = c.gimnasio;
    if (!porGym[g]) porGym[g] = { citas:0, facturado:0, comisiones:0 };
    porGym[g].citas++;
    porGym[g].facturado   += parsePrecioNum(c.ingresoReal || c.priceP || '0') || 0;
    porGym[g].comisiones  += parsePrecioNum(c.comisionGym || '0') || 0;
  });

  let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.84rem">' +
    '<thead><tr style="border-bottom:2px solid var(--border)">' +
    '<th style="text-align:left;padding:8px 10px;color:var(--muted);font-weight:600">Gimnasio</th>' +
    '<th style="text-align:right;padding:8px 10px;color:var(--muted);font-weight:600">Citas</th>' +
    '<th style="text-align:right;padding:8px 10px;color:var(--muted);font-weight:600">Facturado</th>' +
    '<th style="text-align:right;padding:8px 10px;color:var(--muted);font-weight:600">Comisión a pagar</th>' +
    '<th style="text-align:right;padding:8px 10px;color:var(--muted);font-weight:600">Ingreso neto</th>' +
    '</tr></thead><tbody>';

  let totCitas = 0, totFact = 0, totCom = 0;
  Object.entries(porGym).forEach(([gym, d]) => {
    const neto = d.facturado - d.comisiones;
    totCitas += d.citas; totFact += d.facturado; totCom += d.comisiones;
    html += `<tr style="border-bottom:1px solid var(--border)">
      <td style="padding:9px 10px;font-weight:600">${gym}</td>
      <td style="padding:9px 10px;text-align:right">${d.citas}</td>
      <td style="padding:9px 10px;text-align:right">${fmtPeso(d.facturado)}</td>
      <td style="padding:9px 10px;text-align:right;color:#d97706;font-weight:600">${fmtPeso(d.comisiones)}</td>
      <td style="padding:9px 10px;text-align:right;color:var(--primary);font-weight:600">${fmtPeso(neto)}</td>
    </tr>`;
  });

  const netoTotal = totFact - totCom;
  html += `<tr style="border-top:2px solid var(--border);font-weight:700">
    <td style="padding:9px 10px">TOTAL</td>
    <td style="padding:9px 10px;text-align:right">${totCitas}</td>
    <td style="padding:9px 10px;text-align:right">${fmtPeso(totFact)}</td>
    <td style="padding:9px 10px;text-align:right;color:#d97706">${fmtPeso(totCom)}</td>
    <td style="padding:9px 10px;text-align:right;color:var(--primary)">${fmtPeso(netoTotal)}</td>
  </tr>`;

  html += '</tbody></table></div>';
  el.innerHTML = html;
}

const _precios = {
  'Descarga Muscular — Cuello y Espalda': { Presencial: 75000,  Domicilio: 90000 },
  'Descarga Muscular — Piernas':          { Presencial: 75000,  Domicilio: 90000 },
  'Descarga Muscular Completa':           { Presencial: 110000, Domicilio: 125000 },
  'Valoración Funcional':                 { Presencial: 80000,  Domicilio: 95000 },
  'Readaptación Funcional':               { Presencial: 70000,  Domicilio: 85000 },
  'Combo Diagnóstico Pro':                { Presencial: 160000, Domicilio: 185000 },
  'Combo Bienvenida':                     { Presencial: 120000, Domicilio: 120000 },
  'Mini-sesión Familiar 20 min':          { Presencial: 40000,  Domicilio: 40000 },
  'Paquete Recuperación Full':            { Presencial: 264000, Domicilio: 264000 },
  'Paquete Readaptación Inicio':          { Presencial: 378000, Domicilio: 469000 },
  'Paquete Readaptación Avance':          { Presencial: 476000, Domicilio: 598000 },
  'Paquete Readaptación Total':           { Presencial: 560000, Domicilio: 722000 },
  'Plan Activo':                          { Presencial: 135000, Domicilio: 165000 },
  'Plan Pro':                             { Presencial: 230000, Domicilio: 275000 },
};
```

## resRow

```javascript
function resRow(label, val, style='') {
  return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
    <span style="color:var(--muted)">${label}</span>
    <span style="${style}">${val}</span>
  </div>`;
}

// ══════════════════════════════════════════════════════════════
// ── EXPORTAR CSV ──
// ══════════════════════════════════════════════════════════════
```

## _checkAlertaSemanFloja

```javascript
function _checkAlertaSemanFloja(citas) {
  const now = new Date();
  const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
  const hoyStr = today();

  // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
  const dashEl = document.getElementById('alertaSemanFlojaDash');
  const finEl  = document.getElementById('alertaSemanFlojaFin');
  const txtEl  = document.getElementById('alertaSemanFlojaTxt');

  const apagar = () => {
    if (dashEl) dashEl.style.display = 'none';
    if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
  };

  if (dow < 3 || dow > 5) { apagar(); return; }

  // Calcular ingresos semana actual (lunes a hoy)
  const lunes = new Date(now);
  lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  lunes.setHours(0,0,0,0);

  let totalSemActual = 0, nSemActual = 0;
  citas.forEach(c => {
    const f = normDate(c.fecha);
    if (!f) return;
    const fd = new Date(f + 'T12:00:00');
    if (fd >= lunes && f <= hoyStr) {
      totalSemActual += parsePrecio(c.precio);
      nSemActual++;
    }
  });
  (allData.eventos || []).forEach(e => {
    const f = normDate(e.fecha);
    if (!f) return;
    const fd = new Date(f + 'T12:00:00');
    if (fd >= lunes && f <= hoyStr) totalSemActual += parsePrecio(e.cobro);
  });

  // Calcular promedio semanal histórico (últimas 8 semanas completas)
  const semanasHist = [];
  for (let w = 1; w <= 8; w++) {
    const lunesW = new Date(lunes);
    lunesW.setDate(lunes.getDate() - w * 7);
    const domW = new Date(lunesW); domW.setDate(lunesW.getDate() + 6);
    const lunesStr = _ingFmt(lunesW);
    const domStr   = _ingFmt(domW);
    let totalW = 0;
    citas.forEach(c => {
      const f = normDate(c.fecha);
      if (f && f >= lunesStr && f <= domStr) totalW += parsePrecio(c.precio);
    });
    (allData.eventos || []).forEach(e => {
      const f = normDate(e.fecha);
      if (f && f >= lunesStr && f <= domStr) totalW += parsePrecio(e.cobro);
    });
    if (totalW > 0) semanasHist.push(totalW);
  }

  if (!semanasHist.length) { apagar(); return; }

  const promSemanal = Math.round(semanasHist.reduce((a,b)=>a+b,0) / semanasHist.length);
  if (!promSemanal) { apagar(); return; }

  // Calcular ritmo proyectado al viernes (5 días hábiles)
  // Días transcurridos: lunes=1, martes=2, mié=3, jue=4, vie=5
  const diasTranscurridos = dow === 0 ? 5 : dow; // dow 1-5
  const pctRitmo = Math.round(totalSemActual / promSemanal * 100);

  // Umbral: si llevas menos del 40% del promedio semanal al miércoles,
  // o menos del 60% al jueves, o menos del 80% al viernes → alerta
  const umbrales = { 3: 40, 4: 60, 5: 80 };
  const umbral = umbrales[dow];
  const estaFloja = pctRitmo < umbral;

  if (!estaFloja) { apagar(); return; }

  const diasNom = { 3:'miércoles', 4:'jueves', 5:'viernes' };
  const faltanPesos = promSemanal - totalSemActual;
  const msg = `📉 Semana floja — Es ${diasNom[dow]} y llevas $${totalSemActual.toLocaleString('es-CO')} (${pctRitmo}% de tu promedio semanal de $${promSemanal.toLocaleString('es-CO')}). Faltan ~$${faltanPesos.toLocaleString('es-CO')} para alcanzar el ritmo habitual. ¿Puedes agregar citas hoy o mañana?`;

  if (txtEl) txtEl.textContent = msg;
  if (dashEl) dashEl.style.display = 'flex';
  if (finEl) { finEl.style.display = 'block'; finEl.innerHTML = `
    <div style="background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.3);border-radius:10px;padding:14px 18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
      <span style="font-size:1.2rem">📉</span>
      <div style="flex:1">
        <div style="font-weight:700;font-size:.9rem;color:#991b1b;margin-bottom:4px">Alerta: semana floja</div>
        <div style="font-size:.84rem;color:#7f1d1d;line-height:1.5">${msg}</div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <div style="flex:1;min-width:180px">
            <div style="display:flex;justify-content:space-between;font-size:.75rem;margin-bottom:3px;color:#991b1b">
              <span>Ritmo actual</span><span>${pctRitmo}% del promedio</span>
            </div>
            <div style="background:rgba(239,68,68,.15);border-radius:99px;height:8px;overflow:hidden">
              <div style="width:${Math.min(pctRitmo,100)}%;height:100%;background:#dc2626;border-radius:99px;transition:width .5s"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.7rem;margin-top:2px;color:#991b1b">
              <span>$0</span><span>Meta: $${promSemanal.toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-sm" style="background:#dc2626;color:#fff;border:none;border-radius:8px;padding:6px 14px;font-family:var(--font-b);cursor:pointer;white-space:nowrap" onclick="showView('nueva');document.getElementById('ncDate').value=today()">+ Agendar hoy</button>
    </div>`; }
}

let _modoIngresos = 'dia';
```

## getMeta

```javascript
function getMeta() {
  // Limpiar metaMensual si tiene valor viejo
  const stored = parseInt(kvGet('metaMensual')||'0', 10);
  if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
  return getKPIConfig().meta_ventas_mes || 10265000;
}
```

## guardarMetaFin

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

## previewMetaFin

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

## renderMetricas

```javascript
function renderMetricas() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  const citas = citasReales();
  const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
  const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
  const horMap = {};
  let sinHoraCnt = 0;
  citas.forEach(c => {
    const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
    if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
    else sinHoraCnt++;
  });
  const horArr = Object.entries(horMap).sort((a,b) => +a[0] - +b[0]);
  const maxHor = Math.max(...horArr.map(x => x[1]), 1);
  const horEl = document.getElementById('metricHorarios');
  if (horEl) {
    const sinHoraNota = sinHoraCnt > 0
      ? `<div style="margin-top:10px;font-size:.72rem;color:var(--muted)">⚠️ ${sinHoraCnt} cita${sinHoraCnt>1?'s':''} sin hora registrada (importadas sin tiempo)</div>`
      : '';
    horEl.innerHTML = horArr.length
      ? horArr.map(([h, n]) => `
        <div class="metric-row">
          <div class="metric-label">${h.padStart(2,'0')}:00</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxHor*100)}%;background:var(--primary)"></div></div>
          <div class="metric-val" style="color:var(--primary)">${n}</div>
        </div>`).join('') + sinHoraNota
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 2. Métodos de pago
  const pagoMap = { 'Efectivo':0, 'Nequi':0, 'Bancolombia':0, 'Transferencia':0, 'Pendiente':0 };
  citas.forEach(c => {
    const m = c.pago || (kvGet('pago_'+c.id)==='1' ? 'Efectivo' : '');
    if (m && pagoMap[m] !== undefined) pagoMap[m]++;
    else if (!m) pagoMap['Pendiente']++;
  });
  const pagoArr = Object.entries(pagoMap).filter(([,v]) => v > 0);
  const totalPagos = citas.length || 1;
  const pagoEl = document.getElementById('metricPagos');
  if (pagoEl) {
    const iconos = { Efectivo:'💵', Nequi:'\uD83D\uDCF1', Bancolombia:'\uD83C\uDFE6', Transferencia:'↗', Pendiente:'⏳' };
    pagoEl.innerHTML = pagoArr.length
      ? pagoArr.map(([m, n], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:110px">${iconos[m]||''} ${m}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/totalPagos*100)}%;background:${COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${COLORES[i%COLORES.length]}">${n}</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos de pago</p></div>';
  }

  // 3. Nuevos vs Recurrentes — mes a mes (últimos 6 meses con datos)
  const pacEl = document.getElementById('metricPacientes');
  if (pacEl) {
    // Construir historial completo: primera cita de cada paciente
    const primeraCita = {}; // nombre_key → "YYYY-MM" de su primera cita
    const todasCitas = citasReales();
    todasCitas
      .filter(c => c.nombre && normDate(c.fecha))
      .sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)))
      .forEach(c => {
        const k   = c.nombre.toLowerCase().trim();
        const mes = normDate(c.fecha).slice(0,7); // "YYYY-MM"
        if (!primeraCita[k]) primeraCita[k] = mes;
      });

    // Determinar rango: últimos 6 meses que tengan al menos 1 cita
    const now3 = new Date();
    const mesesDisp = [];
    for (let i = 11; i >= 0; i--) {
      const d  = new Date(now3.getFullYear(), now3.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      const tieneCitas = todasCitas.some(c => normDate(c.fecha).startsWith(ym));
      if (tieneCitas) mesesDisp.push({ ym, label: MESES[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2) });
    }
    const mesesMostrar = mesesDisp.slice(-6);

    if (!mesesMostrar.length) {
      pacEl.innerHTML = '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
    } else {
      // Para cada mes: contar nuevos (primera cita ese mes) y recurrentes (primera cita en mes anterior)
      const filas = mesesMostrar.map(({ ym, label }) => {
        const pacsMes = new Set(
          todasCitas
            .filter(c => c.nombre && normDate(c.fecha).startsWith(ym))
            .map(c => c.nombre.toLowerCase().trim())
        );
        let nNuevos = 0, nAntig = 0;
        pacsMes.forEach(k => {
          if (primeraCita[k] === ym) nNuevos++;
          else nAntig++;
        });
        const total = nNuevos + nAntig || 1;
        const pctN  = Math.round(nNuevos / total * 100);
        const pctA  = Math.round(nAntig  / total * 100);
        return { label, nNuevos, nAntig, total: nNuevos + nAntig, pctN, pctA };
      });

      const maxTotal = Math.max(...filas.map(f => f.total), 1);

      // Leyenda
      let html = `
        <div style="display:flex;gap:16px;margin-bottom:14px;font-size:.75rem">
          <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:var(--primary);display:inline-block"></span>Nuevo</span>
          <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#6366f1;display:inline-block"></span>Recurrente</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">`;

      filas.forEach(f => {
        const wN = Math.round(f.nNuevos / maxTotal * 100);
        const wA = Math.round(f.nAntig  / maxTotal * 100);
        html += `
          <div style="display:grid;grid-template-columns:70px 1fr 90px;align-items:center;gap:10px">
            <div style="font-size:.8rem;color:var(--muted);font-family:var(--font-m)">${f.label}</div>
            <div style="display:flex;gap:3px;height:18px;border-radius:4px;overflow:hidden;background:var(--s2)">
              ${f.nNuevos ? `<div style="width:${wN}%;background:var(--primary);transition:width .3s"></div>` : ''}
              ${f.nAntig  ? `<div style="width:${wA}%;background:#6366f1;transition:width .3s"></div>` : ''}
            </div>
            <div style="font-size:.75rem;display:flex;gap:8px;justify-content:flex-end">
              <span style="color:var(--primary);font-family:var(--font-b)">${f.nNuevos} N</span>
              <span style="color:#6366f1;font-family:var(--font-b)">${f.nAntig} R</span>
            </div>
          </div>`;
      });

      // Totales acumulados
      const totalNuevosAcc  = filas.reduce((s,f) => s + f.nNuevos, 0);
      const totalAntigAcc   = filas.reduce((s,f) => s + f.nAntig,  0);
      html += `</div>
        <div style="margin-top:14px;padding:10px 14px;background:var(--s2);border-radius:8px;display:flex;gap:20px;flex-wrap:wrap;font-size:.78rem">
          <span>📊 Período: <strong>${mesesMostrar[0].label} – ${mesesMostrar[mesesMostrar.length-1].label}</strong></span>
          <span style="color:var(--primary)">🟢 Nuevos: <strong>${totalNuevosAcc}</strong></span>
          <span style="color:#6366f1">🔵 Recurrentes: <strong>${totalAntigAcc}</strong></span>
        </div>`;

      pacEl.innerHTML = html;
    }
  }

  // 4. Tasa de cancelación últimos 4 meses
  const now2 = new Date();
  const meses4 = [];
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now2.getFullYear(), now2.getMonth()-i, 1);
    meses4.push({ m: d.getMonth()+1, y: d.getFullYear(), label: MESES[d.getMonth()] });
  }
  const cancelEl = document.getElementById('metricCancelacion');
  if (cancelEl) {
    const rows = meses4.map(mes => {
      const todasMes = allData.citas.filter(c => {
        const [cy,cm] = normDate(c.fecha).split('-');
        return +cm===mes.m && +cy===mes.y && !esRegistroServ(c.servicio);
      });
      const canceladas = todasMes.filter(c => c.estado === 'Cancelada').length;
      const total = todasMes.length || 1;
      const pct = Math.round(canceladas / total * 100);
      const color = pct >= 30 ? '#ef4444' : pct >= 15 ? '#f59e0b' : 'var(--ok)';
      return `<div class="metric-row">
        <div class="metric-label">${mes.label}</div>
        <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="metric-val" style="color:${color}">${pct}%</div>
      </div>`;
    });
    cancelEl.innerHTML = rows.join('');
  }

  // 5. Servicio más utilizado (ranking por conteo)
  const servCountMap = {};
  citas.forEach(c => {
    const s = c.servicio || 'Sin servicio';
    servCountMap[s] = (servCountMap[s] || 0) + 1;
  });
  (allData.eventos || []).forEach(e => {
    const s = e.tipo || 'Evento externo';
    servCountMap[s] = (servCountMap[s] || 0) + 1;
  });
  const servCountArr = Object.entries(servCountMap).sort((a,b) => b[1]-a[1]);
  const maxServCount = servCountArr[0] ? servCountArr[0][1] : 1;
  const servTopEl = document.getElementById('metricServicioTop');
  if (servTopEl) {
    servTopEl.innerHTML = servCountArr.length
      ? servCountArr.slice(0,8).map(([s, n], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:auto;flex:2;font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${i===0?'🥇 ':''}${s}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxServCount*100)}%;background:${i===0?'var(--primary)':COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${i===0?'var(--primary)':COLORES[i%COLORES.length]}">${n}</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 6. Ingreso total por servicio (histórico)
  const servIngMap = {};
  citas.forEach(c => {
    const s = c.servicio || 'Sin servicio';
    servIngMap[s] = (servIngMap[s] || 0) + parsePrecio(c.precio);
  });
  (allData.eventos || []).forEach(e => {
    const s = e.tipo || 'Evento externo';
    servIngMap[s] = (servIngMap[s] || 0) + parsePrecio(e.cobro);
  });
  const servIngArr = Object.entries(servIngMap).sort((a,b) => b[1]-a[1]);
  const maxServIng = servIngArr[0] ? servIngArr[0][1] : 1;
  const ingServEl = document.getElementById('metricIngresoPorServicio');
  if (ingServEl) {
    ingServEl.innerHTML = servIngArr.length
      ? servIngArr.slice(0,8).map(([s, v], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:auto;flex:2;font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${s}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(v/maxServIng*100)}%;background:${COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${COLORES[i%COLORES.length]};font-size:.72rem">$${Math.round(v/1000)}k</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 7. Proyección mes actual vs meta
  const meta = getMeta();
  const cobradoMes = calcCobradoMes();
  const proyEl = document.getElementById('metricProyeccion');
  if (proyEl) {
    if (!meta) {
      proyEl.innerHTML = '<div style="font-size:.82rem;color:var(--muted);padding:10px 0">Establece tu meta mensual para ver la proyección.</div>';
    } else {
      const pctMeta = Math.min(Math.round(cobradoMes / meta * 100), 100);
      const nowD = new Date();
      const diasMes = new Date(nowD.getFullYear(), nowD.getMonth()+1, 0).getDate();
      const diaActual = nowD.getDate();
      const ritmo = diaActual > 0 ? Math.round((cobradoMes / diaActual) * diasMes) : 0;
      const pctRitmo = Math.min(Math.round(ritmo / meta * 100), 120);
      const colorMeta = pctMeta >= 100 ? 'var(--ok)' : pctMeta >= 60 ? 'var(--warn)' : '#ef4444';
      proyEl.innerHTML = `
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px">
            <span style="color:var(--muted)">Cobrado este mes</span>
            <span style="font-family:var(--font-m);color:${colorMeta};font-weight:700">${pctMeta}%</span>
          </div>
          <div class="meta-bar-wrap" style="height:10px"><div class="meta-bar-fill" style="width:${pctMeta}%;background:${colorMeta}"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:.74rem;margin-top:4px;color:var(--muted)">
            <span>$${cobradoMes.toLocaleString('es-CO')}</span><span>Meta: $${meta.toLocaleString('es-CO')}</span>
          </div>
        </div>
        <div style="font-size:.78rem;color:var(--muted)">
          Día ${diaActual}/${diasMes} · A este ritmo proyectas: <strong style="color:${pctRitmo>=100?'var(--ok)':'var(--warn)'}">$${ritmo.toLocaleString('es-CO')}</strong>
        </div>`;
    }
  }

  // 8. Modalidad más usada
  const modMap = {};
  citas.forEach(c => { const mod = c.modalidad || 'Sin modalidad'; modMap[mod] = (modMap[mod]||0)+1; });
  const modArr = Object.entries(modMap).sort((a,b) => b[1]-a[1]);
  const totalMod = modArr.reduce((s,[,v]) => s+v, 0) || 1;
  const modEl = document.getElementById('metricModalidad');
  if (modEl) {
    const coloresMod = ['var(--primary)','#6366f1','#f59e0b','#10b981'];
    const segmentos = modArr.map(([,v],i) => `<div style="flex:${v};background:${coloresMod[i%coloresMod.length]};height:12px;border-radius:${i===0?'99px 0 0 99px':i===modArr.length-1?'0 99px 99px 0':'0'}"></div>`).join('');
    modEl.innerHTML = `
      <div style="display:flex;height:12px;border-radius:99px;overflow:hidden;margin-bottom:14px">${segmentos}</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${modArr.map(([mod, n], i) => `
          <div class="metric-row">
            <div style="font-size:.82rem;flex:1">${mod}</div>
            <div class="metric-val" style="color:${coloresMod[i%coloresMod.length]}">${n} <span style="font-size:.7rem;color:var(--muted)">(${Math.round(n/totalMod*100)}%)</span></div>
          </div>`).join('')}
      </div>`;
  }

  // 9. Día más ocupado
  const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const diaMap = {0:0,1:0,2:0,3:0,4:0,5:0,6:0};
  citas.forEach(c => {
    const f = normDate(c.fecha);
    if (f) { const d = new Date(f+'T12:00:00'); diaMap[d.getDay()] = (diaMap[d.getDay()]||0)+1; }
  });
  const diaArr = Object.entries(diaMap).sort((a,b) => b[1]-a[1]);
  const maxDia = Math.max(...Object.values(diaMap), 1);
  const diaEl = document.getElementById('metricDiaSemana');
  if (diaEl) {
    diaEl.innerHTML = [1,2,3,4,5,6,0].map(d => {
      const n = diaMap[d] || 0;
      const isTop = n === maxDia && n > 0;
      return `<div class="metric-row">
        <div class="metric-label" style="font-weight:${isTop?'700':'400'};color:${isTop?'var(--primary)':'var(--muted)'}">${DIAS[d]}</div>
        <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxDia*100)}%;background:${isTop?'var(--primary)':'#6366f1'}"></div></div>
        <div class="metric-val" style="color:${isTop?'var(--primary)':'var(--text)'}">${n}${isTop?' 🔥':''}</div>
      </div>`;
    }).join('');
  }

  // 10. Comparativo mes anterior
  const nowC = new Date();
  const mAct = nowC.getMonth()+1, yAct = nowC.getFullYear();
  const prevD = new Date(yAct, mAct-2, 1);
  const mPrev = prevD.getMonth()+1, yPrev = prevD.getFullYear();
  const totalAct = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===mAct && +cy===yAct; }).reduce((s,c) => s+parsePrecio(c.precio), 0);
  const totalPrev = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===mPrev && +cy===yPrev; }).reduce((s,c) => s+parsePrecio(c.precio), 0);
  const compEl = document.getElementById('metricComparativo');
  if (compEl) {
    const diff = totalAct - totalPrev;
    const pctDiff = totalPrev > 0 ? Math.round((diff / totalPrev) * 100) : null;
    const color = diff > 0 ? 'var(--ok)' : diff < 0 ? '#ef4444' : 'var(--muted)';
    const flecha = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
    const MESES_N = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    compEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="metric-row">
          <div style="font-size:.82rem;flex:1;color:var(--muted)">${MESES_N[mPrev-1]} ${yPrev}</div>
          <div class="metric-val">$${totalPrev.toLocaleString('es-CO')}</div>
        </div>
        <div class="metric-row">
          <div style="font-size:.82rem;flex:1;color:var(--muted)">${MESES_N[mAct-1]} ${yAct} (actual)</div>
          <div class="metric-val" style="color:var(--primary)">$${totalAct.toLocaleString('es-CO')}</div>
        </div>
        <div style="text-align:center;margin-top:6px;font-family:var(--font-h);font-size:1.4rem;color:${color}">
          ${flecha} ${pctDiff !== null ? Math.abs(pctDiff)+'%' : '—'}
        </div>
        <div style="text-align:center;font-size:.78rem;color:${color};font-family:var(--font-m)">
          ${diff > 0 ? '+$'+diff.toLocaleString('es-CO')+' más que el mes pasado' : diff < 0 ? '-$'+Math.abs(diff).toLocaleString('es-CO')+' menos que el mes pasado' : 'Sin cambio respecto al mes pasado'}
        </div>
      </div>`;
  }

  // 11. Pacientes frecuentes (Top 5)
  const frecMap = {};
  citas.forEach(c => {
    const k = (c.nombre||'').trim();
    if (!k) return;
    if (!frecMap[k]) frecMap[k] = { n: k, count: 0 };
    frecMap[k].count++;
  });
  const frecArr = Object.values(frecMap).sort((a,b) => b.count-a.count).slice(0,5);
  const frecEl = document.getElementById('metricPacientesFrecuentes');
  if (frecEl) {
    const maxFrec = frecArr[0] ? frecArr[0].count : 1;
    frecEl.innerHTML = frecArr.length
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">${
          frecArr.map((p, i) => {
            const medallas = ['🥇','🥈','🥉','4️⃣','5️⃣'];
            return `<div class="metric-row">
              <div style="font-size:.82rem;flex:2;font-weight:${i===0?'700':'400'};color:${i===0?'var(--primary)':'var(--text)'}">${medallas[i]||''} ${p.n}</div>
              <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(p.count/maxFrec*100)}%;background:${i===0?'var(--primary)':COLORES[i%COLORES.length]}"></div></div>
              <div class="metric-val" style="color:${i===0?'var(--primary)':COLORES[i%COLORES.length]}">${p.count} sesiones</div>
            </div>`;
          }).join('')
        }</div>`
      : '<div class="empty" style="padding:20px 0"><p>Sin datos suficientes</p></div>';
  }

  // 12. Horas más rentables
  const horRentEl = document.getElementById('metricHorasRentables');
  if (horRentEl) {
    // Agrupar por hora: total ingresado y número de citas
    const horData = {};
    citas.forEach(c => {
      const h = (c.hora || '').split(':')[0];
      if (!h || isNaN(+h)) return;
      if (!horData[h]) horData[h] = { count: 0, total: 0 };
      horData[h].count++;
      horData[h].total += parsePrecio(c.precio);
    });

    const horArr = Object.entries(horData)
      .map(([h, d]) => ({ h: +h, label: h + ':00', count: d.count, total: d.total, avg: Math.round(d.total / d.count) }))
      .sort((a, b) => b.total - a.total);

    const maxTotal = horArr[0] ? horArr[0].total : 1;

    if (!horArr.length) {
      horRentEl.innerHTML = '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
    } else {
      // Top por ingreso total + tabla completa
      const top = horArr[0];
      horRentEl.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:16px">
          <div style="padding:10px 14px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.25);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">\u2B50 Hora más rentable</div>
            <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:var(--primary)">${top.label}</div>
            <div style="font-size:.75rem;color:var(--muted);margin-top:2px">$${top.total.toLocaleString('es-CO')} total · ${top.count} citas</div>
          </div>
          <div style="padding:10px 14px;background:var(--s2);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">💰 Mayor ticket promedio</div>
            ${(() => { const topAvg = [...horArr].sort((a,b) => b.avg - a.avg)[0]; return `<div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700">${topAvg.label}</div><div style="font-size:.75rem;color:var(--muted);margin-top:2px">$${topAvg.avg.toLocaleString('es-CO')} promedio</div>`; })()}
          </div>
          <div style="padding:10px 14px;background:var(--s2);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">📊 Franjas registradas</div>
            <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700">${horArr.length} horarios</div>
            <div style="font-size:.75rem;color:var(--muted);margin-top:2px">${(()=>{const s=[...horArr].sort((a,b)=>a.h-b.h);return s[0].label+' — '+s[s.length-1].label;})()}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${[...horArr].sort((a,b) => b.total - a.total).map((r, i) => `
            <div style="display:grid;grid-template-columns:50px 1fr auto auto;align-items:center;gap:10px;padding:6px 0">
              <span style="font-family:var(--font-m);font-size:.8rem;color:${i===0?'var(--primary)':'var(--muted)'};font-weight:${i===0?'700':'400'}">${r.label}</span>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width:${Math.round(r.total/maxTotal*100)}%;background:${i===0?'var(--primary)':i<3?'#6366f1':'rgba(27,191,176,.4)'}"></div>
              </div>
              <span style="font-size:.75rem;color:var(--muted);min-width:55px;text-align:right">${r.count} cita${r.count!==1?'s':''}</span>
              <span style="font-family:var(--font-m);font-size:.78rem;color:${i===0?'var(--primary)':'var(--text)'};min-width:90px;text-align:right">$${r.total.toLocaleString('es-CO')}</span>
            </div>`).join('')}
        </div>
        <div style="margin-top:14px;padding:10px 14px;background:var(--s2);border-radius:8px;font-size:.78rem;color:var(--muted)">
          💡 <strong>Interpretación:</strong> Prioriza agendar servicios de mayor precio en ${horArr.sort((a,b)=>b.total-a.total)[0].label} y ${horArr[1]?horArr[1].label:'la siguiente hora más rentable'}. Si esas franjas están siempre llenas, considera subir el precio o agregar horarios similares.
        </div>`;
    }
  }

  // Inicializar selector de fecha para ingresos por día/semana
  const fechaInp = document.getElementById('ingresosFechaInput');
  if (fechaInp && !fechaInp.value) {
    fechaInp.value = today();
    setModoIngresos('semana');
  }
  renderCitasResumen();

  // Inicializar filtro de convenios con el mes actual
  const convMesFiltro = document.getElementById('convenioMesFiltro');
  if (convMesFiltro && !convMesFiltro.value) {
    const nm = now.getMonth()+1;
    convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
  }
  renderConveniosReport();
  _checkAutoAtendida();
  _checkCobrosPendientes();
}

// ── Automatización #2: marcar citas pasadas como Atendidas ──
```

## renderKPITablero

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

Este documento es solo diagnóstico y no modifica código funcional.
