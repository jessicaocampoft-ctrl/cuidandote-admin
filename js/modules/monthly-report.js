/* Cuidándote Fisioterapia — Reporte mensual. */
(function (global) {
  'use strict';

function abrirReporteMes() {
  const modal = document.getElementById('modalReporteMes');
  modal.style.display = 'flex';
  document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
  setTimeout(() => {
    const html = _buildReporteMes();
    document.getElementById('reporteMesBody').innerHTML = html;
  }, 80);
}

function cerrarReporteMes() {
  document.getElementById('modalReporteMes').style.display = 'none';
}

function _secTitle(icon, title) {
  return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
    <span style="font-size:1.15rem">${icon}</span>
    <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
  </div>`;
}

function _rFila(label, val, color='var(--text)', bold=false) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
    <span style="font-size:.84rem;color:var(--muted)">${label}</span>
    <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
  </div>`;
}

function _semCell(val, meta, alto=true) {
  if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
  const ok   = alto ? val >= meta : val <= meta;
  const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
  if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
  if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
  return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
}

function _buildReporteMes() {
  const now  = new Date();
  const m    = now.getMonth() + 1;
  const y    = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m - 1];

  const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
  document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;

  const citas  = citasReales();
  const manual = getKPIManual();
  const todasCitas = allData.citas || [];
  const eventosAll = allData.eventos || [];

  // ══════════ CÁLCULOS ══════════

  const mesStr = `${y}-${String(m).padStart(2,'0')}`;
  const metaSesionesMes = META_SESIONES_SEMANA * 4;

  // ── Citas del mes ──
  const citasMes = citas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && c.estado !== 'No asistió';
  });
  const noShowsMes = todasCitas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && c.estado === 'No asistió';
  });
  const eventosMes = eventosAll.filter(e => {
    const [cy,cm] = normDate(e.fecha).split('-');
    return +cm===m && +cy===y;
  });
  const totalSesiones = citasMes.length + eventosMes.length;

  // ── Financiero ──
  const ventasCobradas = calcCobradoMes();
  const ventasFact = citasMes.reduce((s,c) => s+parsePrecio(c.precio), 0)
                   + eventosMes.reduce((s,e) => s+parsePrecio(e.cobro), 0);
  const ventasPendientes = citasMes.filter(c => !isPagada(c.id))
                            .reduce((s,c) => s+parsePrecio(c.precio), 0);
  const costos = getCostosEstructura();
  const calc   = calcTotalCostos(costos);
  const egresosAll = getEgresos().filter(e => e.fecha && e.fecha.startsWith(mesStr));
  const egresosMes = egresosAll.reduce((s,e) => s+(e.monto||0), 0);
  const gastosBase = egresosMes > 0 ? Math.max(egresosMes, calc.subtotal) : calc.subtotal;
  const utilidadMes = ventasCobradas - gastosBase;
  const margenPct = ventasCobradas > 0 ? Math.round((utilidadMes/ventasCobradas)*100) : 0;

  // Egresos por categoría
  const egresosCats = {};
  egresosAll.forEach(e => {
    const cat = e.concepto || 'Otros';
    egresosCats[cat] = (egresosCats[cat]||0) + (e.monto||0);
  });

  // ── Semanas del mes ──
  const semanas = [[], [], [], [], []];
  citasMes.forEach(c => {
    const d = new Date(normDate(c.fecha)+'T12:00:00');
    const dia = d.getDate();
    const s = Math.min(Math.floor((dia-1)/7), 4);
    semanas[s].push(c);
  });
  eventosMes.forEach(e => {
    const d = new Date(normDate(e.fecha)+'T12:00:00');
    const dia = d.getDate();
    const s = Math.min(Math.floor((dia-1)/7), 4);
    semanas[s].push({ ...e, _esEvento:true, precio: e.cobro });
  });

  // ── Por día de semana ──
  const diasNom = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const porDia = [0,0,0,0,0,0,0];
  citasMes.forEach(c => {
    const d = new Date(normDate(c.fecha)+'T12:00:00');
    porDia[d.getDay()]++;
  });

  // ── Por servicio ──
  const mixMap = {};
  const mixIngresos = {};
  citasMes.forEach(c => {
    const sv = c.servicio||'Sin tipo';
    mixMap[sv] = (mixMap[sv]||0)+1;
    mixIngresos[sv] = (mixIngresos[sv]||0)+parsePrecio(c.precio);
  });
  const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);

  // ── Por modalidad ──
  const modalMap = {};
  citasMes.forEach(c => {
    const mod = c.modalidad||'Sin modalidad';
    modalMap[mod] = (modalMap[mod]||0)+1;
  });

  // ── Cancelaciones ──
  const motivosMes = getCancelMotivos();
  const todasMes = todasCitas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y;
  });
  const canceladasMes = todasMes.filter(c =>
    (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(motivosMes[c.id])
  );
  const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
  const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;

  // Cancelaciones por servicio
  const cancelPorServ = {};
  canceladasMes.forEach(c => {
    const sv = c.servicio||'Sin tipo';
    cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
  });

  // ── Pacientes ──
  const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
  const pacMesMap = {};
  citasMes.forEach(c => {
    if (!c.nombre) return;
    const k = c.nombre.trim().toLowerCase();
    pacMesMap[k] = (pacMesMap[k]||0)+1;
  });
  const pacUnicosMes = Object.keys(pacMesMap).length;

  let pacNuevos = 0, pacRecurrentes = 0;
  Object.keys(pacMesMap).forEach(pac => {
    const prev = todasCitas.filter(c => {
      if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
      const f = new Date(normDate(c.fecha)+'T12:00:00');
      return f >= ventanaAtras && f < new Date(y, m-1, 1);
    });
    if (prev.length===0) pacNuevos++; else pacRecurrentes++;
  });

  // Top 5 pacientes por sesiones
  const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // Retención 60 días
  const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
  const conteoPac = {};
  citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
    .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
  const pac60 = Object.keys(conteoPac).length;
  const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
  const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;

  // ── Leads y conversión ──
  const leadsMes = getLeadsMes() || manual.leads || 0;
  const citasNuevasMes = citasMes.length;
  const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;

  // Canal de captación
  const canalMap = {};
  const canalIngMap = {};
  citasMes.forEach(c => {
    const canal = c.canal||'Directo';
    canalMap[canal] = (canalMap[canal]||0)+1;
    canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
  });

  // ── NPS y encuestas ──
  const encStats = getEncuestaStats();
  const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
  const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);

  // ── BD ──
  const bdAuto = calcBDActualizada();
  const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);

  // ── CAC ──
  const egresosMkt = egresosAll.filter(e =>
    CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
  ).reduce((s,e)=>s+(e.monto||0), 0);
  const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;

  // ══ Helpers ══
  const pct = (v,m2) => m2>0 ? Math.round(v/m2*100) : 0;
  const SC = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];

  // ── Recomendaciones ──
  const mejoras = [];

  const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
  const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);

  if (totalSesiones < metaSesionesMes) {
    const falta = metaSesionesMes-totalSesiones;
    mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
  }
  if (ventasCobradas < META_VENTAS_MES) {
    mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
  }
  if (fullCnt > expressCnt && fullCnt>0) {
    mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
  }
  if (tasaConv!==null && tasaConv<25) {
    mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
  }
  if (tasaCancel>META_CANCELACION_PCT) {
    mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
  }
  if (noShowsMes.length>0) {
    mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
  }
  if (tasaRet<META_RETENCION_PCT) {
    mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
  }
  if (npsVal<META_NPS) {
    mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
  }
  if (encPct<META_ENCUESTAS) {
    mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
  }
  if (bdPct<100) {
    mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
  }

  const fci = (key, val) =>
    `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
      style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
             color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
             text-align:right;box-sizing:border-box"
      oninput="_recalcCostos()">`;

  const filaC = (label, key, val) =>
    `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.04)">
      <span style="font-size:.82rem;color:var(--text);flex:1">${label}</span>
      <div style="width:130px;flex-shrink:0">${fci(key, val)}</div>
    </div>`;

  let html = '';

  // ══════════════════════════════════════════
  // 1 · RESUMEN EJECUTIVO
  // ══════════════════════════════════════════
  const kpisOk   = [
    ventasCobradas >= META_VENTAS_MES,
    totalSesiones  >= metaSesionesMes,
    tasaCancel     <= META_CANCELACION_PCT,
    tasaRet        >= META_RETENCION_PCT,
    npsVal         >= META_NPS,
  ].filter(Boolean).length;
  const totalKpis = 5;
  const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
                : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
                : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
                :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };

  html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
      <div style="flex:1">
        <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
        <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${totalSesiones}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">SESIONES</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${utilidadMes>=0?'var(--ok)':'#ef4444'}">${fmtPeso(utilidadMes)}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">UTILIDAD</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${pacUnicosMes}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">PACIENTES</div>
        </div>
      </div>
    </div>
  </div>`;

  // ══════════════════════════════════════════
  // 2 · P&L — ESTADO FINANCIERO
  // ══════════════════════════════════════════
  html += _secTitle('💰','Estado Financiero del Mes');

  const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
  const barW    = Math.min(pctMeta, 100);
  const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';

  html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
    <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
      ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
      ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
      ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
      ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
      <div style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
          <span>Avance vs meta</span><span style="color:${barCol};font-weight:700">${pctMeta}%</span>
        </div>
        <div style="height:8px;background:var(--s3);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${barW}%;background:${barCol};border-radius:99px;transition:width .3s"></div>
        </div>
      </div>
    </div>
    <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Costos reales vs estructura</div>
      ${_rFila('Subtotal costos estimados', fmtPeso(calc.subtotal))}
      ${_rFila('Imprevistos estimados ('+costos.pct_imprevistos+'%)', fmtPeso(calc.imprevistos))}
      ${_rFila('Utilidad objetivo ('+costos.pct_utilidad+'%)', fmtPeso(calc.utilidad),'var(--ok)')}
      ${_rFila('Total necesario (meta)', fmtPeso(calc.total), 'var(--primary)', true)}
      <div style="height:1px;background:var(--border);margin:8px 0"></div>
      ${_rFila('Costos estructura (subtotal)', fmtPeso(calc.subtotal), '#ef4444')}
      ${egresosMes > 0 ? _rFila('Egresos registrados en Finanzas', fmtPeso(egresosMes), egresosMes > calc.subtotal ? '#ef4444' : '#f59e0b') : `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)"><span style="font-size:.84rem;color:var(--muted)">Egresos registrados en Finanzas</span><span style="font-size:.78rem;color:var(--muted);font-style:italic">$0 — usando estructura de costos</span></div>`}
      ${_rFila('Gastos considerados', fmtPeso(gastosBase), '#ef4444', true)}
      ${_rFila('Utilidad real (cobrado − gastos)', fmtPeso(utilidadMes), utilidadMes>=0?'var(--ok)':'#ef4444', true)}
      ${_rFila('Margen de utilidad real', margenPct+'%', margenPct>=costos.pct_utilidad?'var(--ok)':'#f59e0b')}
    </div>
  </div>`;

  // Egresos por concepto
  if (Object.keys(egresosCats).length > 0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Egresos por concepto</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">`;
    Object.entries(egresosCats).sort((a,b)=>b[1]-a[1]).forEach(([cat,monto],i) => {
      const pp = egresosMes>0?Math.round(monto/egresosMes*100):0;
      html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:var(--s1);border-radius:8px;border-left:3px solid ${SC[i%6]}">
        <span style="font-size:.8rem">${cat}</span>
        <span style="font-size:.8rem;font-weight:600;font-family:var(--font-m)">${fmtPeso(monto)} <span style="color:var(--muted);font-weight:400">${pp}%</span></span>
      </div>`;
    });
    html += `</div></div>`;
  }

  // Editor de costos
  html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div>
        <span style="font-size:.78rem;color:var(--muted)">Meta calculada desde estructura de costos:</span>
        <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--primary);margin-left:8px" id="costosTotalDisplay">${fmtPeso(calc.total)}</span>
      </div>
      <button onclick="_toggleEditCostos()" id="btnEditCostos"
        style="font-size:.72rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:6px;cursor:pointer;font-family:var(--font-b)">
        ✏️ Editar estructura de costos
      </button>
    </div>
    <div id="costosVistaCompacta" style="display:none"></div>
    <div id="costosEditorPanel" style="display:none;margin-top:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;font-weight:700">Costos Fijos</div>
          ${filaC('Honorarios Fisio','honorarios_fisio',costos.honorarios_fisio)}
          ${filaC('Seguridad Social','seguridad_social',costos.seguridad_social)}
          ${filaC('Asistente Fisio','asistente_fisio',costos.asistente_fisio)}
          ${filaC('Auxiliar Administrativa','auxiliar_admin',costos.auxiliar_admin)}
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin:12px 0 8px;font-weight:700">Costos Operativos</div>
          ${filaC('Arriendo','arriendo',costos.arriendo)}
          ${filaC('Servicios públicos','servicios_publicos',costos.servicios_publicos)}
          ${filaC('Suscripción IA','suscripcion_ia',costos.suscripcion_ia)}
          ${filaC('Suscripción CapCut','suscripcion_capcut',costos.suscripcion_capcut)}
          ${filaC('Asesorías AP x4/Mes','asesorias_ap',costos.asesorias_ap)}
        </div>
        <div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;font-weight:700">Costos Variables</div>
          ${filaC('Redes Sociales Contenido','redes_contenido',costos.redes_contenido)}
          ${filaC('Activación marca-Eventos','activacion_eventos',costos.activacion_eventos)}
          ${filaC('Pautas Redes','pautas_redes',costos.pautas_redes)}
          ${filaC('Mantenimiento y compras','mantenimiento',costos.mantenimiento)}
          ${filaC('Insumos','insumos',costos.insumos)}
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin:12px 0 8px;font-weight:700">Porcentajes</div>
          ${filaC('Fondo Imprevistos (%)','pct_imprevistos',costos.pct_imprevistos)}
          ${filaC('Utilidad Deseada (%)','pct_utilidad',costos.pct_utilidad)}
        </div>
      </div>
      <div style="margin-top:12px;padding:10px 14px;background:var(--s1);border-radius:10px;border:2px solid var(--border);display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Subtotal</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700" id="crSubtotal">${fmtPeso(calc.subtotal)}</div></div>
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Imprevistos</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700;color:#f59e0b" id="crImprevistos">${fmtPeso(calc.imprevistos)}</div></div>
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Utilidad obj.</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700;color:var(--ok)" id="crUtilidad">${fmtPeso(calc.utilidad)}</div></div>
        <div style="border-left:2px solid var(--border)"><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">META TOTAL</div><div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)" id="crTotal">${fmtPeso(calc.total)}</div></div>
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;justify-content:flex-end">
        <button onclick="_toggleEditCostos()" style="font-size:.8rem;padding:7px 16px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">Cancelar</button>
        <button onclick="_guardarCostos()" style="font-size:.8rem;padding:7px 20px;background:var(--primary);color:#0D0D0D;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-weight:600">Guardar y actualizar meta</button>
      </div>
    </div>
  </div>`;

  // ══════════════════════════════════════════
  // 3 · SESIONES Y PRODUCTIVIDAD
  // ══════════════════════════════════════════
  html += _secTitle('📅','Sesiones y Productividad');

  // Semana a semana
  html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:12px">
    <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Desglose semanal</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">`;
  semanas.forEach((sess, i) => {
    if (sess.length===0 && i>3) return;
    const semN = i+1;
    const ingrSem = sess.reduce((s,c)=>s+parsePrecio(c.precio||c.cobro),0);
    const metaSem = META_SESIONES_SEMANA;
    const semCol  = sess.length>=metaSem?'var(--ok)':sess.length>=metaSem*.8?'#f59e0b':'#ef4444';
    html += `<div style="text-align:center;padding:12px 8px;background:var(--s1);border-radius:10px;border-top:3px solid ${semCol}">
      <div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">SEMANA ${semN}</div>
      <div style="font-family:var(--font-h);font-size:1.5rem;font-weight:700;color:${semCol}">${sess.length}</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">sesiones</div>
      <div style="font-size:.7rem;color:var(--primary);margin-top:4px;font-family:var(--font-m)">${fmtPeso(ingrSem)}</div>
    </div>`;
  });
  html += `</div>
    <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--s1);border-radius:8px">
      <span style="font-size:.82rem;color:var(--muted)">Total mes</span>
      <span style="font-family:var(--font-h);font-size:1rem;font-weight:700">${totalSesiones} sesiones — meta ${metaSesionesMes} ${totalSesiones>=metaSesionesMes?'✓':''}</span>
    </div>
  </div>`;

  // Por día de semana
  const maxDia = Math.max(...porDia.filter((_,i)=>i>0&&i<7));
  html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:12px">
    <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Sesiones por día de semana</div>
    <div style="display:flex;flex-direction:column;gap:6px">`;
  [1,2,3,4,5,6,0].forEach(d => {
    const n = porDia[d];
    const barPct = maxDia>0 ? Math.round(n/maxDia*100) : 0;
    const col = n===maxDia&&n>0?'var(--primary)':n===0?'var(--border)':'var(--s3)';
    html += `<div style="display:flex;align-items:center;gap:8px">
      <span style="font-size:.78rem;color:var(--muted);width:80px;flex-shrink:0">${diasNom[d]}</span>
      <div style="flex:1;height:20px;background:var(--s3);border-radius:4px;overflow:hidden;position:relative">
        <div style="height:100%;width:${barPct}%;background:${n===maxDia&&n>0?'var(--primary)':'rgba(27,191,176,.4)'};border-radius:4px"></div>
      </div>
      <span style="font-size:.78rem;font-family:var(--font-m);font-weight:600;width:24px;text-align:right;color:${n===maxDia&&n>0?'var(--primary)':'var(--text)'}">${n}</span>
    </div>`;
  });
  html += `</div></div>`;

  // Mix por servicio
  if (mixArr.length>0) {
    const totalSesM = mixArr.reduce((s,[,n])=>s+n, 0);
    html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Mix de servicios — sesiones e ingresos</div>
      <div style="display:flex;flex-direction:column;gap:8px">`;
    mixArr.forEach(([serv,cnt],i) => {
      const p   = Math.round(cnt/totalSesM*100);
      const ing = mixIngresos[serv]||0;
      const ingPH = cnt>0 ? Math.round(ing/cnt) : 0;
      html += `<div style="padding:10px 14px;background:var(--s1);border-radius:10px;border-left:3px solid ${SC[i%6]}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px">
          <span style="font-size:.85rem;font-weight:600;color:${SC[i%6]}">${serv}</span>
          <span style="font-size:.82rem;font-family:var(--font-m);font-weight:700">${fmtPeso(ing)}</span>
        </div>
        <div style="display:flex;gap:14px;margin-top:4px;flex-wrap:wrap">
          <span style="font-size:.72rem;color:var(--muted)">${cnt} sesiones · ${p}% del total</span>
          <span style="font-size:.72rem;color:var(--muted)">Promedio por sesión: ${fmtPeso(ingPH)}</span>
        </div>
      </div>`;
    });
    html += `</div>`;
    if (fullCnt>expressCnt&&fullCnt>0) {
      html += `<div style="margin-top:10px;padding:10px 14px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:.8rem;color:#ef4444">
        ⚠️ <strong>Alerta de rentabilidad:</strong> Las Descargas Full (${fullCnt}) superan a las Express (${expressCnt}). La Express genera más ingreso por hora.
      </div>`;
    }
    html += `</div>`;
  }

  // Modalidad
  if (Object.keys(modalMap).length>0) {
    html += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">`;
    Object.entries(modalMap).forEach(([mod,cnt],i) => {
      html += `<span style="padding:5px 12px;background:var(--s2);border-radius:99px;font-size:.8rem;border:1px solid ${SC[i%6]}44;color:${SC[i%6]};font-weight:600">${mod}: ${cnt}</span>`;
    });
    html += `</div>`;
  }

  // ══════════════════════════════════════════
  // 4 · CANCELACIONES Y NO-SHOWS
  // ══════════════════════════════════════════
  html += _secTitle('❌','Cancelaciones y No-Shows');
  const cancelColor = tasaCancel<=META_CANCELACION_PCT?'var(--ok)':tasaCancel<=META_CANCELACION_PCT*1.2?'#f59e0b':'#ef4444';
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${cancelColor}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${cancelColor}">${canceladasMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Cancelaciones</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:${cancelColor}">${tasaCancel}% — meta &lt;${META_CANCELACION_PCT}%</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${noShowsMes.length>0?'#f59e0b':'var(--ok)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${noShowsMes.length>0?'#f59e0b':'var(--ok)'}">${noShowsMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">No-shows</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">${noShowRate}% de las citas</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700">${todasMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Citas programadas</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">${todasMes.length-canceladasMes.length-noShowsMes.length} efectivas</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#ef4444">${fmtPeso((canceladasMes.length+noShowsMes.length)*Math.round(ventasFact/Math.max(citasMes.length,1)))}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Ingreso no percibido</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">estimado</div>
    </div>
  </div>`;

  if (Object.keys(cancelPorServ).length>0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Cancelaciones por servicio</div>
      <div style="display:flex;flex-direction:column;gap:5px">`;
    Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1]).forEach(([serv,n],i) => {
      const pp = canceladasMes.length>0?Math.round(n/canceladasMes.length*100):0;
      html += _rFila(serv, `${n} cancelación${n===1?'':'es'} (${pp}%)`,'var(--text)');
    });
    html += `</div></div>`;
  }

  // ══════════════════════════════════════════
  // 5 · ANÁLISIS DE PACIENTES
  // ══════════════════════════════════════════
  html += _secTitle('👥','Análisis de Pacientes');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:var(--primary)">${pacUnicosMes}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes únicos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#10b981">${pacNuevos}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes nuevos</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">sin visita en 6 meses</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#6366f1">${pacRecurrentes}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes recurrentes</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${tasaRet>=META_RETENCION_PCT?'var(--ok)':tasaRet>=META_RETENCION_PCT*.8?'#f59e0b':'#ef4444'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${tasaRet>=META_RETENCION_PCT?'var(--ok)':tasaRet>=META_RETENCION_PCT*.8?'#f59e0b':'#ef4444'}">${tasaRet}%</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Retención 60 días</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta ≥${META_RETENCION_PCT}%</div>
    </div>
  </div>`;

  if (topPac.length>0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Top pacientes por sesiones este mes</div>
      <div style="display:flex;flex-direction:column;gap:6px">`;
    topPac.forEach(([nombre,n],i) => {
      const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
      const cPac = citasMes.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===nombre);
      const ingPac = cPac.reduce((s,c)=>s+parsePrecio(c.precio),0);
      html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--s1);border-radius:8px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:.9rem">${medals[i]||'·'}</span>
          <span style="font-size:.84rem;font-weight:500;text-transform:capitalize">${nombre}</span>
        </div>
        <div style="text-align:right">
          <span style="font-family:var(--font-m);font-size:.78rem;font-weight:600">${n} sesión${n===1?'':'es'}</span>
          <span style="font-size:.72rem;color:var(--muted);margin-left:8px">${fmtPeso(ingPac)}</span>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  // ══════════════════════════════════════════
  // 6 · MARKETING Y CAPTACIÓN
  // ══════════════════════════════════════════
  html += _secTitle('📣','Marketing y Captación');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:var(--primary)">${leadsMes||'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Leads recibidos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${tasaConv!==null?(tasaConv>=25?'var(--ok)':tasaConv>=20?'#f59e0b':'#ef4444'):'var(--border)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${tasaConv!==null?(tasaConv>=25?'var(--ok)':tasaConv>=20?'#f59e0b':'#ef4444'):'var(--muted)'}">${tasaConv!==null?tasaConv+'%':'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Conversión</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta ≥25%</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700">${pacNuevos}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes nuevos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${cac>0&&cac<=META_CAC_MAX?'var(--ok)':cac>META_CAC_MAX?'#ef4444':'var(--border)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${cac>0&&cac<=META_CAC_MAX?'var(--ok)':cac>META_CAC_MAX?'#ef4444':'var(--muted)'}">${cac>0?fmtPeso(cac):'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">CAC</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta &lt;${fmtPeso(META_CAC_MAX)}</div>
    </div>
  </div>`;

  if (Object.keys(canalMap).length>0) {
    const totalCanalIng = Object.values(canalIngMap).reduce((s,v)=>s+v,0);
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos y sesiones por canal de captación</div>
      <div style="display:flex;flex-direction:column;gap:7px">`;
    Object.entries(canalIngMap).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing],i) => {
      const sess = canalMap[canal]||0;
      const pp   = totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
      const bW   = pp;
      html += `<div style="padding:10px 14px;background:var(--s1);border-radius:10px;border-left:3px solid ${SC[i%6]}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:.84rem;font-weight:600;color:${SC[i%6]}">${canal}</span>
          <span style="font-family:var(--font-h);font-size:.95rem;font-weight:700">${fmtPeso(ing)}</span>
        </div>
        <div style="height:5px;background:var(--s3);border-radius:99px;overflow:hidden;margin-bottom:5px">
          <div style="height:100%;width:${bW}%;background:${SC[i%6]};border-radius:99px"></div>
        </div>
        <span style="font-size:.7rem;color:var(--muted)">${sess} sesión${sess===1?'':'es'} · ${pp}% del ingreso total</span>
      </div>`;
    });
    html += `</div></div>`;
  } else {
    html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
  }

  // ══════════════════════════════════════════
  // 7 · CALIDAD Y SATISFACCIÓN
  // ══════════════════════════════════════════
  html += _secTitle('⭐','Calidad y Satisfacción');
  const npsC = _semCell(npsVal, META_NPS);
  const encC = _semCell(encPct, META_ENCUESTAS);
  const bdC  = _semCell(bdPct, 100);
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
  html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
  html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
  html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
  html += `</div>`;

  // ══════════════════════════════════════════
  // 8 · SEMÁFORO COMPLETO DE KPIs
  // ══════════════════════════════════════════
  html += _secTitle('🚦','Semáforo Completo de Indicadores');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
  const rows = [
    ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
    ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
    ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
    ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
    ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
    ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
    ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
    ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
    ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
    ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
    ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
    ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
  ];
  rows.forEach(([icon,label,val,c,sub]) => {
    html += _kpiRow(icon,label,val,c.dot,c.color,sub);
  });
  html += `</div>`;

  // ══════════════════════════════════════════
  // 9 · PLAN DE MEJORA
  // ══════════════════════════════════════════
  html += _secTitle('💡','Plan de Mejora — Próximo Mes');
  if (mejoras.length>0) {
    html += `<div style="display:flex;flex-direction:column;gap:10px">`;
    mejoras.forEach((m2,i) => {
      html += `<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
        <span style="font-family:var(--font-m);font-size:.72rem;background:var(--primary);color:#0D0D0D;border-radius:99px;min-width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-weight:700">${i+1}</span>
        <div style="font-size:.84rem;line-height:1.55">${m2}</div>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
      <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
      <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
      <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
    </div>`;
  }

  return html;
}

  global.PanelMonthlyReport = Object.freeze({
    abrirReporteMes,
    cerrarReporteMes,
    _secTitle,
    _rFila,
    _semCell,
    _buildReporteMes
  });
})(window);
