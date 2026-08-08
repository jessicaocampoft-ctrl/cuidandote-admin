/* Cuidándote Fisioterapia — PanelEventsAgreements. */
(function (global) {
'use strict';

let _eeeId = null;

function onConvenioChange() {
  const gym   = document.getElementById('ncConvenio').value;
  const panel = document.getElementById('ncConvenioPanel');
  const resumen = document.getElementById('ncConvenioResumen');
  if (!gym) {
    panel.style.display   = 'none';
    resumen.style.display = 'none';
    return;
  }
  panel.style.display = 'block';
  const cfg = convenios[gym] || { descTipo:'pct', descValor:0, comTipo:'pct', comValor:0 };
  document.getElementById('ncConvDescValor').value = cfg.descValor || '';
  document.getElementById('ncConvDescTipo').value  = cfg.descTipo  || 'pct';
  document.getElementById('ncConvComValor').value  = cfg.comValor  || '';
  document.getElementById('ncConvComTipo').value   = cfg.comTipo   || 'pct';
  calcConvenio();
}

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

function switchNuevaMode(mode) {
  const isEvento = mode === 'evento';
  document.getElementById('formCita').style.display   = isEvento ? 'none' : 'block';
  document.getElementById('formEvento').style.display = isEvento ? 'block' : 'none';
  document.getElementById('toggleCita').classList.toggle('active', !isEvento);
  document.getElementById('toggleEvento').classList.toggle('active', isEvento);
}

function calcDuracion() {
  const hi = document.getElementById('evHoraInicio').value;
  const hf = document.getElementById('evHoraFin').value;
  const lbl = document.getElementById('evDuracionLabel');
  if (!hi || !hf) { lbl.style.display='none'; return; }
  const [hh,mm] = hi.split(':').map(Number);
  const [hh2,mm2] = hf.split(':').map(Number);
  const mins = (hh2*60+mm2) - (hh*60+mm);
  if (mins <= 0) { lbl.style.display='none'; return; }
  const h = Math.floor(mins/60), m = mins%60;
  lbl.textContent = '⏱ ' + (h ? h + 'h ' : '') + (m ? m + 'min' : '');
  lbl.style.display = 'block';
}

function getDuracionStr(hi, hf) {
  const [hh,mm]   = hi.split(':').map(Number);
  const [hh2,mm2] = hf.split(':').map(Number);
  const mins = (hh2*60+mm2) - (hh*60+mm);
  if (mins <= 0) return '';
  const h = Math.floor(mins/60), m = mins%60;
  return (h ? h+'h ' : '') + (m ? m+'min' : '');
}

async function submitEvento() {
  const titulo = document.getElementById('evTitulo').value.trim();
  const fecha  = document.getElementById('evFecha').value;
  const hi     = document.getElementById('evHoraInicio').value;
  const hf     = document.getElementById('evHoraFin').value;
  if (!titulo || !fecha || !hi || !hf) { toast('Completa los campos obligatorios (*)', 'err'); return; }

  const btn = document.querySelector('#formEvento .btn-teal');
  btn.textContent = 'Guardando...'; btn.disabled = true;

  const data = {
    titulo,
    tipo:       document.getElementById('evTipo').value,
    fecha,
    horaInicio: hi,
    horaFin:    hf,
    duracion:   getDuracionStr(hi, hf),
    cobro:      document.getElementById('evCobro').value.trim() || 'Sin cobro',
    notas:      document.getElementById('evNotas').value.trim()
  };

  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=crearEvento&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
    const d = await r.json();
    if (!d.ok) { toast('Error: ' + (d.error||''), 'err'); return; }
    toast('Evento creado ✓');
    clearEvento();
    await reload();
    // Limpiar filtros para que el evento sea visible (eventos se ocultan si hay filtros activos)
    document.getElementById('fSearch').value = '';
    document.getElementById('fDesde').value  = '';
    document.getElementById('fHasta').value  = '';
    document.getElementById('fStatus').selectedIndex  = 0;
    document.getElementById('fMod').selectedIndex     = 0;
    document.getElementById('fService').selectedIndex = 0;
    sessionStorage.removeItem('agendaFilters');
    showView('agenda');
  } catch(e) { toast('Error de conexión', 'err'); }
  finally { btn.textContent = 'Crear evento'; btn.disabled = false; }
}

function clearEvento() {
  ['evTitulo','evFecha','evHoraInicio','evHoraFin','evCobro','evNotas'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value='';
  });
  document.getElementById('evTipo').selectedIndex = 0;
  document.getElementById('evDuracionLabel').style.display = 'none';
}

async function eliminarEvento(id) {
  if (!confirm('¿Eliminar este evento?')) return;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`);
    const d = await r.json();
    if (!d.ok) { toast('Error al eliminar', 'err'); return; }
    toast('Evento eliminado');
    await reload();
    renderAgenda();
  } catch(e) { toast('Error de conexión', 'err'); }
}

function normHHMM(t) {
  if (!t) return '';
  const m = String(t).match(/(\d{1,2}):(\d{2})/);
  if (!m) return '';
  return m[1].padStart(2,'0') + ':' + m[2];
}

function cerrarModalEditarEvento() {
  document.getElementById('modalEditarEvento').style.display = 'none';
}

function abrirEditarEvento(id) {
  const ev = (allData.eventos || []).find(e => e.id === id);
  if (!ev) { toast('Evento no encontrado', 'err'); return; }
  _eeeId = id;
  document.getElementById('eeeTitulo').value = ev.titulo || '';
  document.getElementById('eeeFecha').value  = normDate(ev.fecha) || '';
  // Normalizar cobro: guardar siempre como número limpio para consistencia visual
  const cobroNum = parsePrecio(ev.cobro);
  document.getElementById('eeeCobro').value  = cobroNum > 0 ? cobroNum.toLocaleString('es-CO') : '';
  document.getElementById('eeeNotas').value  = ev.notas || '';
  // Tipo
  const sel = document.getElementById('eeeTipo');
  const opt = [...sel.options].find(o => o.value === ev.tipo);
  sel.value = opt ? ev.tipo : 'Evento externo';
  // Mostrar modal primero; luego en doble rAF asignar las horas.
  // Chrome en Windows 12h necesita que el input sea visible Y haya completado
  // al menos 2 ciclos de render antes de aceptar el valor programático.
  document.getElementById('modalEditarEvento').style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('eeeHoraInicio').value = normHHMM(ev.horaInicio);
    document.getElementById('eeeHoraFin').value    = normHHMM(ev.horaFin);
    eeeCalcDuracion();
  }));
}

function eeeCalcDuracion() {
  const hi = document.getElementById('eeeHoraInicio').value;
  const hf = document.getElementById('eeeHoraFin').value;
  const lbl = document.getElementById('eeeDuracionLabel');
  if (!hi || !hf) { lbl.style.display='none'; return; }
  const [hh,mm]   = hi.split(':').map(Number);
  const [hh2,mm2] = hf.split(':').map(Number);
  const mins = (hh2*60+mm2)-(hh*60+mm);
  if (mins <= 0) { lbl.style.display='none'; return; }
  const h = Math.floor(mins/60), m = mins%60;
  lbl.textContent = '⏱ ' + (h ? h+'h ' : '') + (m ? m+'min' : '');
  lbl.style.display = 'block';
}

async function eeeGuardar() {
  const titulo = document.getElementById('eeeTitulo').value.trim();
  const fecha  = document.getElementById('eeeFecha').value;
  const hi     = document.getElementById('eeeHoraInicio').value;
  const hf     = document.getElementById('eeeHoraFin').value;
  if (!titulo || !fecha || !hi || !hf) { toast('Completa título, fecha y horas', 'err'); return; }

  const btn = document.getElementById('eeeGuardarBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;

  const [hh,mm]   = hi.split(':').map(Number);
  const [hh2,mm2] = hf.split(':').map(Number);
  const mins = (hh2*60+mm2)-(hh*60+mm);
  const dur  = mins > 0 ? (Math.floor(mins/60) ? Math.floor(mins/60)+'h ' : '') + (mins%60 ? mins%60+'min' : '') : '';

  const data = {
    titulo,
    tipo:       document.getElementById('eeeTipo').value,
    fecha,
    horaInicio: hi,
    horaFin:    hf,
    duracion:   dur,
    cobro:      document.getElementById('eeeCobro').value.trim() || 'Sin cobro',
    notas:      document.getElementById('eeeNotas').value.trim()
  };

  try {
    // Eliminar viejo → crear nuevo con los datos actualizados
    const rDel = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(_eeeId)}`);
    const dDel = await rDel.json();
    if (!dDel.ok) { toast('Error al actualizar (eliminar): ' + (dDel.error||''), 'err'); return; }

    const rCre = await fetch(`${APPS_SCRIPT_URL}?action=crearEvento&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
    const dCre = await rCre.json();
    if (!dCre.ok) { toast('Error al actualizar (crear): ' + (dCre.error||''), 'err'); return; }

    toast('Evento actualizado ✓');
    cerrarModalEditarEvento();
    await reload();
    renderAgenda();
  } catch(e) { toast('Error de conexión', 'err'); }
  finally { btn.textContent = 'Guardar cambios'; btn.disabled = false; }
}

async function eeeEliminar() {
  if (!confirm('¿Eliminar este evento?')) return;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(_eeeId)}`);
    const d = await r.json();
    if (!d.ok) { toast('Error al eliminar', 'err'); return; }
    toast('Evento eliminado');
    cerrarModalEditarEvento();
    await reload();
    renderAgenda();
  } catch(e) { toast('Error de conexión', 'err'); }
}

global.PanelEventsAgreements = Object.freeze({
    onConvenioChange,
    renderConveniosReport,
    switchNuevaMode,
    calcDuracion,
    getDuracionStr,
    submitEvento,
    clearEvento,
    eliminarEvento,
    normHHMM,
    cerrarModalEditarEvento,
    abrirEditarEvento,
    eeeCalcDuracion,
    eeeGuardar,
    eeeEliminar
  });
})(typeof window !== 'undefined' ? window : globalThis);
