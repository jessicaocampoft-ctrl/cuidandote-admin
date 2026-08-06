/* Cuidándote Fisioterapia — Núcleo financiero, ingresos y egresos. */
(function (global) {
  'use strict';

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

function calcIngresoPaquetesMes(m, y) {
  return _getPkAsignados()
    .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
    .reduce((s,p) => s + parsePrecio(p.precio), 0);
}

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

function getEgresos() {
  try { return JSON.parse(kvGet('egresos') || '[]'); } catch { return []; }
}

function saveEgresos(arr) { kvSet('egresos', JSON.stringify(arr)); }

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

function eliminarEgreso(id) {
  if (!confirm('¿Eliminar este egreso?')) return;
  saveEgresos(getEgresos().filter(e => e.id !== id));
  renderEgresosList();
  renderEstructuraFinanciera();
}

function actualizarConceptosEgreso() {
  const cat  = document.getElementById('egresoCategoria').value;
  const sel  = document.getElementById('egresoConcepto');
  const opts = CONCEPTOS_EGRESO[cat] || ['Otro'];
  sel.innerHTML = opts.map(o => `<option>${o}</option>`).join('');
}

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

function resRow(label, val, style='') {
  return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
    <span style="color:var(--muted)">${label}</span>
    <span style="${style}">${val}</span>
  </div>`;
}

  global.PanelFinance = Object.freeze({
    renderFinanzas,
    calcCobradoMes,
    calcIngresoPaquetesMes,
    renderEgresosList,
    getEgresos,
    saveEgresos,
    guardarEgreso,
    eliminarEgreso,
    actualizarConceptosEgreso,
    renderEstructuraFinanciera,
    resRow
  });
})(window);
