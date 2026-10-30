/* Cuidándote Fisioterapia — Núcleo financiero, ingresos y egresos. */
(function (global) {
  'use strict';

const ESTRUCTURA_COSTOS_REFERENCIA = Object.freeze([
  {
    categoria: 'Costos Fijos', titulo: 'Costos fijos', color: '#ef4444',
    items: [
      ['Honorarios Jessica', 4000000],
      ['Seguridad Social', 500000],
      ['Fisioterapeuta de apoyo', 1500000],
      ['Auxiliar Administrativa', 500000]
    ]
  },
  {
    categoria: 'Costos Operativos', titulo: 'Costos operativos', color: '#f59e0b',
    items: [
      ['Arriendo', 600000],
      ['Servicios públicos', 70000],
      ['Suscripción de IA', 70000],
      ['CapCut', 12000],
      ['Asesorías AP', 450000]
    ]
  },
  {
    categoria: 'Costos Variables', titulo: 'Contenido e insumos', color: '#6366f1',
    items: [
      ['Contenido para redes sociales', 300000],
      ['Mantenimiento y compras', 200000],
      ['Insumos', 100000]
    ]
  }
]);

const CONCEPTOS_EGRESO = Object.freeze({
  ...Object.fromEntries(ESTRUCTURA_COSTOS_REFERENCIA.map(({categoria, items}) => [categoria, items.map(([concepto]) => concepto)])),
  'Otro': ['Otro']
});

const COSTOS_REFERENCIA = Object.freeze(Object.fromEntries(
  ESTRUCTURA_COSTOS_REFERENCIA.flatMap(({items}) => items)
));

const COSTO_BASE = Object.values(COSTOS_REFERENCIA).reduce((total, valor) => total + valor, 0);
const COSTO_PE = Math.round(COSTO_BASE * 1.05);
const COSTO_META = Math.round(COSTO_BASE * 1.25);
const CAPACIDAD_OPERATIVA_HORAS = 208;
const COSTO_HORA_OPERATIVA = Math.round(COSTO_META / CAPACIDAD_OPERATIVA_HORAS);
const TICKET_PROMEDIO_REFERENCIA = 83000;
const SESIONES_META_REFERENCIA = Math.ceil(COSTO_META / TICKET_PROMEDIO_REFERENCIA);
const SESIONES_SEMANA_REFERENCIA = Math.ceil(SESIONES_META_REFERENCIA / 4.3);
const SERVICIOS_RENTABILIDAD = Object.freeze([
  { nombre: 'Corporativo', minutos: 60, precio: 120000, color: 'var(--ok)' },
  { nombre: 'Descarga Express', minutos: 50, precio: 75000, color: '#10b981' },
  { nombre: 'Readaptación', minutos: 50, precio: 70000, color: '#6366f1' },
  { nombre: 'Descarga Full ⚠️', minutos: 90, precio: 110000, color: '#f59e0b' }
]);

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
      + calcIngresoEntrenamientoMes(mes.m, mes.y)
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
  const ingresoEntrenamientoMes = calcIngresoEntrenamientoMes(m, y);
  if (ingresoEntrenamientoMes > 0) {
    servMap['Entrenamiento funcional'] = (servMap['Entrenamiento funcional'] || 0) + ingresoEntrenamientoMes;
  }
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
        ${ingresoEntrenamientoMes > 0 ? resRow('  · Entrenamiento funcional', '$' + ingresoEntrenamientoMes.toLocaleString('es-CO'), 'color:var(--teal)') : ''}
        ${resRow('Por cobrar (futuras)', futurasVal > 0 ? '$' + futurasVal.toLocaleString('es-CO') : '—', 'color:var(--warn)')}
        ${resRow('Ticket promedio', ticketProm > 0 ? '$' + ticketProm.toLocaleString('es-CO') : '—', '')}
        ${meta ? resRow('Meta cumplida', Math.min(Math.round(cobradoMes/meta*100),100) + '%', cobradoMes >= meta ? 'color:var(--ok);font-weight:700' : 'color:var(--warn)') : ''}
      </div>`;
  }

  renderCobrosPendientesMes(citas, m, y);

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
  global.PanelIncomeAnalysis?.initComparacionFacturacion?.();
  global.PanelIncomeAnalysis?.renderComparacionFacturacion?.();
}

function renderCobrosPendientesMes(citas, mes, anyo) {
  const el = document.getElementById('finCobrosPendientesMes');
  if (!el) return;
  const pendingKinds = new Set(['appointment-balance','appointment-partial','package-balance','package-session-due']);
  const seen = new Set();
  const cobros = [];

  citas
    .filter(c => {
      const f = normDate(c.fecha);
      if (!f) return false;
      const [cy, cm] = f.split('-').map(Number);
      return cy === anyo && cm === mes;
    })
    .forEach(c => {
      const summary = global.PanelPackages?.getAppointmentFinancialSummary?.(c);
      const markedManually = c.estado === 'Pendiente de pago';
      if (!summary || (!pendingKinds.has(summary.kind) && !markedManually)) return;
      // Si administración la marcó manualmente, se prioriza esa tarea incluso
      // cuando antes figuraba como pagada. Conserva el pago histórico y deja
      // visible el valor de la cita para revisar o registrar el ajuste.
      const isPlan = summary.kind === 'package-balance' && !markedManually;
      const key = isPlan ? `plan:${summary.packageRecord?.id || summary.packageRecord?.ID || c.id}` : `cita:${c.id}`;
      if (seen.has(key)) return;
      seen.add(key);
      const amount = isPlan
        ? Number(summary.packageBalance || 0)
        : markedManually ? Number(parsePrecio(c.precio || summary.price || 0)) : Number(summary.appointmentBalance ?? summary.price ?? 0);
      if (amount <= 0) return;
      cobros.push({ cita:c, summary, amount, isPlan });
    });

  cobros.sort((a,b) => `${normDate(a.cita.fecha)} ${a.cita.hora || ''}`.localeCompare(`${normDate(b.cita.fecha)} ${b.cita.hora || ''}`));
  const total = cobros.reduce((sum, item) => sum + item.amount, 0);
  if (!cobros.length) {
    el.innerHTML = '<div class="empty" style="padding:22px 0"><p>✅ No hay cobros pendientes registrados para este mes.</p></div>';
    return;
  }
  el.innerHTML = `<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;padding:10px 12px;margin-bottom:10px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);border-radius:10px"><strong style="color:#92400e">${cobros.length} cobro${cobros.length===1?'':'s'} pendiente${cobros.length===1?'':'s'}</strong><span style="color:var(--muted)">·</span><strong style="font-family:var(--font-m);color:#b45309">$${Math.round(total).toLocaleString('es-CO')}</strong><span style="font-size:.75rem;color:var(--muted)">El pago se registra con fecha, valor y medio de pago.</span></div><div style="display:flex;flex-direction:column;gap:8px">${cobros.map(({cita, summary, amount, isPlan}) => {
    const detail = isPlan
      ? `Saldo del plan: ${summary.packageRecord?.nombre || summary.packageRecord?.tipo || 'Paquete'}`
      : summary.kind === 'package-session-due'
        ? summary.label
        : `${cita.servicio || 'Servicio'} · ${cita.modalidad || '—'}`;
    return `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:11px 12px;background:var(--s2);border:1px solid var(--border);border-radius:10px"><div style="min-width:190px;flex:1"><div style="font-weight:700;font-size:.88rem">${esc(cita.nombre || 'Paciente')}</div><div style="font-size:.76rem;color:var(--muted);margin-top:3px">${esc(fmtDate(cita.fecha))} · ${esc(cita.hora || '—')} · ${esc(detail)}</div></div><div style="font-family:var(--font-m);font-weight:700;color:#b45309">$${Math.round(amount).toLocaleString('es-CO')}</div><div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="verDetalle('${esc(cita.id)}')">Ver cita</button><button class="btn btn-teal btn-sm" onclick="openPago('${esc(cita.id)}')">💳 Registrar pago</button></div></div>`;
  }).join('')}</div>`;
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
  return citasTotal + calcIngresoPaquetesMes(m, y) + calcIngresoEntrenamientoMes(m, y) + eventosTotal;
}

function calcIngresoPaquetesMes(m, y) {
  return _getPkAsignados()
    .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
    .reduce((s,p) => s + parsePrecio(p.precio), 0);
}

function calcIngresoEntrenamientoMes(m, y) {
  return Number(global.PanelFunctionalTraining?.getMonthlyRevenue?.(m, y) || 0);
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
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:12px">Capacidad de referencia: ${CAPACIDAD_OPERATIVA_HORAS} h/mes</div>
      <div class="tbl-wrap"><table style="width:100%;border-collapse:collapse;font-size:.82rem">
        <thead><tr style="background:var(--s2)">
          <th style="padding:7px 10px;text-align:left;font-family:var(--font-m)">Servicio</th>
          <th style="padding:7px 10px;text-align:center;font-family:var(--font-m)">Tiempo</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Precio</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Ingreso/h</th>
          <th style="padding:7px 10px;text-align:right;font-family:var(--font-m)">Margen/h</th>
        </tr></thead>
        <tbody>${SERVICIOS_RENTABILIDAD.map((servicio, indice) => {
          const ingresoHora = Math.round(servicio.precio * 60 / servicio.minutos);
          const margenHora = ingresoHora - COSTO_HORA_OPERATIVA;
          return `<tr style="${indice < SERVICIOS_RENTABILIDAD.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
            <td style="padding:7px 10px;font-weight:600">${servicio.nombre}</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)">${servicio.minutos} min</td>
            <td style="padding:7px 10px;text-align:right">${fmtPeso(servicio.precio)}</td>
            <td style="padding:7px 10px;text-align:right;font-weight:700;color:${servicio.color}">${fmtPeso(ingresoHora)}</td>
            <td style="padding:7px 10px;text-align:right;color:${servicio.color}">${margenHora >= 0 ? '+' : ''}${fmtPeso(margenHora)}</td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>
      <div style="margin-top:10px;padding:9px 12px;background:rgba(245,158,11,.08);border-radius:8px;font-size:.78rem;color:#f59e0b">
        ⚠️ Costo/hora operativo: <strong>${fmtPeso(COSTO_HORA_OPERATIVA)}/h</strong> (incluye la meta de utilidad). 2 Express = ${fmtPeso(150000)} en 100 min vs 1 Full = ${fmtPeso(110000)} en 90 min.
      </div>
    </div>
  </div>

  <!-- Estructura de costos -->
  <div class="card">
    <div class="card-title" style="margin-bottom:4px">📋 Estructura mensual de costos</div>
    <div style="font-size:.78rem;color:var(--muted);margin-bottom:16px">Valores de referencia actuales · no incluye gastos ocasionales</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">
      ${ESTRUCTURA_COSTOS_REFERENCIA.map(({titulo, color, items}) => {
        const subtotal = items.reduce((total, [, valor]) => total + valor, 0);
        return `<div>
          <div style="font-size:.78rem;font-weight:700;color:${color};font-family:var(--font-m);margin-bottom:8px;text-transform:uppercase">${titulo}</div>
          ${items.map(([concepto, valor]) => `<div style="display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.82rem"><span style="color:var(--muted)">${concepto}</span><span style="font-weight:600;white-space:nowrap">${fmtPeso(valor)}</span></div>`).join('')}
          <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:.82rem;font-weight:700"><span>Subtotal</span><span>${fmtPeso(subtotal)}</span></div>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">
      <div style="padding:12px;background:var(--s2);border-radius:10px;border-left:3px solid #ef4444">
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Total mensual sin gastos ocasionales</div>
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
        <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m)">Sesiones estimadas para la meta</div>
        <div style="font-size:1.1rem;font-weight:700;font-family:var(--font-h)">${SESIONES_META_REFERENCIA} sesiones/mes</div>
        <div style="font-size:.72rem;color:var(--muted)">~${SESIONES_SEMANA_REFERENCIA}/sem · Ticket prom. ${fmtPeso(TICKET_PROMEDIO_REFERENCIA)}</div>
      </div>
    </div>
  </div>`;

  el.innerHTML = html;
}

const CHATGPT_STRATEGY_OPTIONS = Object.freeze({
  completo: {
    icon: '🧭', title: 'Diagnóstico completo',
    description: 'Ingresos, agenda, servicios, paquetes y marketing.',
    question: 'Haz un diagnóstico integral y prioriza las 3 decisiones que más pueden mejorar el negocio este mes.'
  },
  ingresos: {
    icon: '📈', title: 'Crecer ingresos',
    description: 'Meta, ticket promedio, cobros y oportunidades de venta.',
    question: 'Propón acciones concretas para aumentar los ingresos y cerrar la diferencia con la meta mensual.'
  },
  agenda: {
    icon: '🗓️', title: 'Llenar la agenda',
    description: 'Ocupación, horarios fuertes y franjas que necesitan movimiento.',
    question: 'Propón cómo llenar horarios de menor ocupación sin saturar al equipo ni bajar el valor del servicio.'
  },
  paquetes: {
    icon: '🎁', title: 'Paquetes y reactivación',
    description: 'Pacientes por reactivar y oportunidades de continuidad.',
    question: 'Diseña una estrategia de reactivación y paquetes con mensajes cercanos, segmentados y sin descuentos innecesarios.'
  },
  marketing: {
    icon: '📣', title: 'Servicios y marketing',
    description: 'Qué servicio impulsar y qué contenido o campaña probar.',
    question: 'Recomienda qué servicios priorizar en marketing, con una campaña pequeña, medible y coherente con la capacidad disponible.'
  }
});

function _chatGPTStrategyModal() {
  let modal = document.getElementById('chatGPTStrategyModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'chatGPTStrategyModal';
  modal.className = 'modal-bg';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1300;align-items:center;justify-content:center;padding:18px';
  const options = Object.entries(CHATGPT_STRATEGY_OPTIONS).map(([key, option]) => `
    <button type="button" onclick="PanelFinance.copyChatGPTStrategy('${key}')" style="text-align:left;background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:13px 14px;color:var(--text);cursor:pointer;font-family:var(--font-b);transition:.15s" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border)'">
      <strong style="display:block;font-size:.9rem;margin-bottom:3px">${option.icon} ${option.title}</strong>
      <span style="display:block;color:var(--muted);font-size:.78rem;line-height:1.4">${option.description}</span>
    </button>`).join('');
  modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="chatGPTStrategyTitle" style="max-width:640px;width:100%">
    <div class="modal-title" id="chatGPTStrategyTitle">Estrategia con ChatGPT</div>
    <p style="font-size:.86rem;color:var(--muted);line-height:1.5;margin:0 0 14px">Elige qué quieres mejorar. Se copiará un prompt con datos agregados reales de la plataforma, sin nombres, teléfonos ni notas de pacientes.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px">${options}</div>
    <div style="padding:10px 12px;border:1px solid rgba(20,184,166,.28);background:rgba(20,184,166,.07);border-radius:9px;font-size:.78rem;color:var(--muted);line-height:1.45;margin-top:14px">Después de copiarlo, abre ChatGPT y pégalo. La plataforma no envía información automáticamente ni comparte datos identificables.</div>
    <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn btn-ghost" onclick="PanelFinance.closeChatGPTStrategy()">Cerrar</button></div>
  </div>`;
  modal.addEventListener('click', event => { if (event.target === modal) closeChatGPTStrategy(); });
  document.body.appendChild(modal);
  return modal;
}

function openChatGPTStrategy() {
  _chatGPTStrategyModal().style.display = 'flex';
}

function closeChatGPTStrategy() {
  const modal = document.getElementById('chatGPTStrategyModal');
  if (modal) modal.style.display = 'none';
}

function _chatGPTMoney(value) {
  return '$' + Math.round(Number(value) || 0).toLocaleString('es-CO');
}

function _chatGPTKnownServices() {
  return [...new Set((global.allData?.citas || [])
    .filter(cita => cita && !global.esRegistroServ?.(cita.servicio))
    .map(cita => String(cita.servicio || '').trim())
    .filter(Boolean))].sort((left, right) => left.localeCompare(right, 'es'));
}

function buildChatGPTStrategyPrompt(focus = 'completo', data, serviceNames) {
  const option = CHATGPT_STRATEGY_OPTIONS[focus] || CHATGPT_STRATEGY_OPTIONS.completo;
  const d = data || global.PanelWhatsAppTools?._copyGestionData?.();
  if (!d) throw new Error('No se pudieron cargar los indicadores para el análisis');
  const services = Array.isArray(serviceNames) ? serviceNames : _chatGPTKnownServices();
  return [
    'Actúa como asesora estratégica de Cuidándote Fisioterapia, un consultorio de fisioterapia en Colombia.',
    '',
    `OBJETIVO DEL ANÁLISIS: ${option.title.toUpperCase()}`,
    option.question,
    '',
    'REGLAS IMPORTANTES',
    '- Usa únicamente los datos entregados. Si falta un dato, dilo y formula una pregunta; no lo inventes.',
    '- No propongas descuentos automáticos ni acciones que reduzcan el valor del servicio sin justificarlo.',
    '- Prioriza acciones realistas, de bajo costo y medibles para los próximos 7 y 30 días.',
    '- No necesito teoría general: necesito decisiones y mensajes aplicables a este consultorio.',
    '',
    `PERIODO: ${d.periodo || 'Mes actual'}`,
    '',
    'DATOS FINANCIEROS AGREGADOS',
    `- Ingresos cobrados: ${_chatGPTMoney(d.ingresosCobrados)}`,
    `- Ventas generadas: ${_chatGPTMoney(d.ventasGeneradas)}`,
    `- Pendiente por cobrar: ${_chatGPTMoney(d.pendienteCobrar)}`,
    `- Gastos registrados: ${_chatGPTMoney(d.egresosMes)}`,
    `- Ganancia estimada: ${_chatGPTMoney(d.ganancia)}`,
    `- Meta mensual: ${_chatGPTMoney(d.metaMensual)}`,
    `- Cumplimiento de la meta: ${Number(d.cumplimiento) || 0}%`,
    `- Faltante para la meta: ${_chatGPTMoney(d.faltante)}`,
    `- Costos mensuales de referencia sin gastos ocasionales: ${_chatGPTMoney(COSTO_BASE)}`,
    '',
    'OPERACIÓN Y VENTAS',
    `- Citas programadas: ${Number(d.citasProgramadas) || 0}`,
    `- Sesiones atendidas: ${Number(d.sesionesAtendidas) || 0}`,
    `- Ocupación estimada: ${d.ocupacion || 'Sin dato'}`,
    `- Cancelaciones: ${Number(d.cancelaciones) || 0}`,
    `- No asistencias: ${Number(d.noAsistencias) || 0}`,
    `- Ticket promedio: ${_chatGPTMoney(d.ticketPromedio)}`,
    `- Personas nuevas: ${Number(d.personasNuevas) || 0}`,
    `- Personas recurrentes: ${Number(d.personasRecurrentes) || 0}`,
    `- Paquetes vendidos: ${Number(d.paquetesVendidos) || 0}`,
    `- Personas candidatas a paquetes (dato agregado): ${(d.candidatosPaquete || []).length}`,
    `- Personas para reactivar (dato agregado): ${(d.reactivar || []).length}`,
    '',
    'SERVICIOS Y AGENDA',
    `- Servicios registrados en la plataforma: ${services.length ? services.join(' · ') : 'Sin servicios registrados'}`,
    `- Servicios más vendidos este mes:\n${d.serviciosMasVendidos || 'Sin datos'}`,
    `- Servicios menos vendidos este mes:\n${d.serviciosMenosVendidos || 'Sin datos'}`,
    `- Horarios con mayor ocupación:\n${d.horariosMayorOcupacion || 'Sin datos'}`,
    `- Horarios con menor ocupación:\n${d.horariosMenorOcupacion || 'Sin datos'}`,
    '',
    'ENTRÉGAME',
    '1. Un diagnóstico breve basado explícitamente en estos números.',
    '2. Las 3 oportunidades con mayor impacto, ordenadas por prioridad.',
    '3. Un plan de 7 días: acción, responsable, indicador que debo mirar y resultado esperado.',
    '4. Una idea de campaña o contenido para el servicio prioritario, sin prometer resultados clínicos.',
    '5. Las preguntas que debería responder para mejorar el siguiente análisis.',
    '',
    'Estos datos son agregados y no contienen nombres, teléfonos ni información clínica de pacientes.'
  ].join('\n');
}

async function copyChatGPTStrategy(focus) {
  try {
    if (!global.PanelWhatsAppTools?._copyPlainText) throw new Error('La herramienta de copiado no está disponible');
    const text = buildChatGPTStrategyPrompt(focus);
    const copied = await global.PanelWhatsAppTools._copyPlainText(text);
    closeChatGPTStrategy();
    if (copied) toast('Estrategia copiada. Ahora pégala en ChatGPT.', 'ok');
  } catch (error) {
    console.error('No se pudo preparar el análisis para ChatGPT', error);
    toast('No se pudo preparar el análisis. Intenta actualizar la página.', 'err');
  }
}

function _analysisExportModal() {
  let modal = document.getElementById('analysisExportModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'analysisExportModal';
  modal.className = 'modal-bg';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1300;align-items:center;justify-content:center;padding:18px';
  modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="analysisExportTitle" style="max-width:560px;width:100%">
    <div class="modal-title" id="analysisExportTitle">Descargar datos para análisis</div>
    <p style="font-size:.85rem;color:var(--muted);line-height:1.5;margin:0 0 16px">Genera un CSV con una fila por cita, pago, egreso, paquete, bloqueo o disponibilidad semanal. Puedes adjuntarlo directamente a ChatGPT.</p>
    <div class="form-grid g2" style="gap:12px">
      <div class="field"><label>Desde <span style="font-weight:400">(opcional)</span></label><input id="analysisFrom" type="date"></div>
      <div class="field"><label>Hasta <span style="font-weight:400">(opcional)</span></label><input id="analysisTo" type="date"></div>
    </div>
    <label style="display:flex;gap:9px;align-items:flex-start;margin:16px 0;font-size:.84rem;cursor:pointer"><input id="analysisNames" type="checkbox" style="margin-top:3px"><span><strong>Incluir nombres de pacientes</strong><br><span style="color:var(--muted)">Déjalo desmarcado si vas a enviar el archivo a ChatGPT u otra persona. El archivo usará un ID anónimo por paciente.</span></span></label>
    <div style="padding:11px 13px;border:1px solid rgba(245,158,11,.35);background:rgba(245,158,11,.08);border-radius:9px;font-size:.8rem;color:var(--muted);line-height:1.45">No incluye teléfonos, correos, direcciones, notas clínicas ni comprobantes. Los campos que no estén registrados quedan vacíos, no se inventan.</div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:18px;flex-wrap:wrap"><button class="btn btn-ghost" onclick="PanelFinance.closeAnalysisExport()">Cancelar</button><button id="analysisDownloadBtn" class="btn btn-teal" onclick="PanelFinance.downloadAnalysisExport()">Descargar CSV</button></div>
  </div>`;
  modal.addEventListener('click', event => { if (event.target === modal) closeAnalysisExport(); });
  document.body.appendChild(modal);
  return modal;
}

function openAnalysisExport() {
  const modal = _analysisExportModal();
  modal.style.display = 'flex';
  document.getElementById('analysisFrom')?.focus();
}

function closeAnalysisExport() {
  const modal = document.getElementById('analysisExportModal');
  if (modal) modal.style.display = 'none';
}

function _analysisDate(value) {
  if (!value) return '';
  try { return normDate(value); } catch (_) { return String(value).slice(0, 10); }
}

function _analysisPatientId(name) {
  let hash = 2166136261;
  const source = String(name || '').trim().toLocaleLowerCase('es');
  for (let index = 0; index < source.length; index += 1) { hash ^= source.charCodeAt(index); hash = Math.imul(hash, 16777619); }
  return source ? `PAC-${(hash >>> 0).toString(36).toUpperCase()}` : '';
}

function _analysisCsvValue(value) {
  return `"${String(value == null ? '' : value).replace(/"/g, '""')}"`;
}

function _analysisInRange(date, from, until) {
  if (!date) return !from && !until;
  return (!from || date >= from) && (!until || date <= until);
}

async function downloadAnalysisExport() {
  const from = document.getElementById('analysisFrom')?.value || '';
  const until = document.getElementById('analysisTo')?.value || '';
  const includeNames = Boolean(document.getElementById('analysisNames')?.checked);
  if (from && until && from > until) { toast('La fecha inicial debe ser anterior a la fecha final', 'err'); return; }
  const button = document.getElementById('analysisDownloadBtn');
  if (button) { button.disabled = true; button.textContent = 'Preparando…'; }
  try {
    if (global.PanelPayments?.loadOperationsData) await global.PanelPayments.loadOperationsData();
    const header = ['Tipo de registro','Fecha','Hora','Paciente ID','Paciente','Servicio o concepto','Estado','Modalidad o categoría','Profesional','Canal de captación','Convenio o empresa','Precio normal','Descuento','Valor cobrado','Forma de pago','Paquete','Sesiones compradas','Sesiones usadas','Sesiones pendientes','Detalle'];
    const rows = [];
    const patient = name => [ _analysisPatientId(name), includeNames ? String(name || '') : '' ];
    const appointmentRows = (allData?.citas || []).filter(cita => !esRegistroServ(cita.servicio)).map(cita => {
      const date = _analysisDate(cita.fecha); if (!_analysisInRange(date, from, until)) return null;
      const [patientId, patientName] = patient(cita.nombre);
      const professional = cita.profesionalNombre || cita.profesional || cita.fisioterapeuta || cita.profesionalId || '';
      const agreement = cita.convenio || cita.gimnasio || cita.empresa || '';
      const normalPrice = cita.precioNormal || cita.valorNormal || cita.precioBase || '';
      const discount = cita.descuento || cita.descuentoCliente || '';
      return ['CITA', date, cita.hora || '', patientId, patientName, cita.servicio || '', cita.estado || '', cita.modalidad || '', professional, cita.canal || '', agreement, normalPrice, discount, cita.precio || '', '', '', '', '', '', ''];
    }).filter(Boolean);
    rows.push(...appointmentRows);
    (operationsData?.pagos || []).forEach(pago => {
      const date = _analysisDate(pago.FechaPago || pago.FechaVerificacion); if (!_analysisInRange(date, from, until)) return;
      const [patientId, patientName] = patient(pago.Cliente);
      rows.push(['PAGO', date, '', patientId, patientName, pago.ServicioPlan || '', pago.EstadoPago || '', '', '', '', '', pago.ValorEsperado || '', '', pago.ValorRecibido || '', pago.MedioPago || '', '', '', '', pago.Observaciones || '']);
    });
    (getEgresos() || []).forEach(egreso => {
      const date = _analysisDate(egreso.fecha); if (!_analysisInRange(date, from, until)) return;
      rows.push(['EGRESO', date, '', '', '', egreso.concepto || '', '', egreso.categoria || '', '', '', '', '', '', egreso.monto || '', '', '', '', '', '', egreso.descripcion || '']);
    });
    (global._getPkAsignados?.() || []).forEach(paquete => {
      const date = _analysisDate(paquete.fechaCompra); if (!_analysisInRange(date, from, until)) return;
      const [patientId, patientName] = patient(paquete.paciente);
      const used = Number(paquete.consumidas || 0), total = Number(paquete.sesiones || 0);
      rows.push(['PAQUETE', date, '', patientId, patientName, '', 'Activo', '', '', '', '', '', '', paquete.precio || '', '', paquete.nombre || '', total, used, Math.max(0, total - used), paquete.notas || '']);
    });
    (allData?.bloqueos || []).forEach(bloqueo => {
      const date = _analysisDate(bloqueo.fecha); if (!_analysisInRange(date, from, until)) return;
      rows.push(['BLOQUEO', date, `${bloqueo.inicio || ''}-${bloqueo.fin || ''}`, '', '', bloqueo.motivo || 'Bloqueo de agenda', 'Bloqueado', '', '', '', '', '', '', '', '', '', '', '', '', '']);
    });
    const weekly = global.PanelScheduleOperations?.getWeeklySchedule?.() || [];
    const weekdays = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    weekly.forEach((day, index) => (day.enabled ? (day.ranges || []).forEach(range => rows.push(['HORARIO_SEMANAL', '', `${range[0]}-${range[1]}`, '', '', `Disponibilidad ${weekdays[index]}`, 'Disponible', '', '', '', '', '', '', '', '', '', '', '', '', ''])) : null));
    rows.sort((left, right) => String(left[1]).localeCompare(String(right[1])) || String(left[0]).localeCompare(String(right[0])));
    if (!rows.length) { toast('No hay registros para el rango seleccionado', 'err'); return; }
    const content = [header, ...rows].map(row => row.map(_analysisCsvValue).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + content], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob), anchor = document.createElement('a');
    anchor.href = url; anchor.download = `analisis_externo_${from || 'inicio'}_${until || 'hoy'}.csv`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`Archivo listo: ${rows.length} registros. Ahora adjúntalo en ChatGPT.`, 'ok');
    closeAnalysisExport();
  } catch (error) {
    console.error('No se pudo preparar el reporte para análisis', error);
    toast('No se pudo preparar el reporte. Intenta actualizar la página.', 'err');
  } finally {
    if (button) { button.disabled = false; button.textContent = 'Descargar CSV'; }
  }
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
    openAnalysisExport,
    closeAnalysisExport,
    downloadAnalysisExport,
    openChatGPTStrategy,
    closeChatGPTStrategy,
    buildChatGPTStrategyPrompt,
    copyChatGPTStrategy,
    resRow
  });
})(window);
