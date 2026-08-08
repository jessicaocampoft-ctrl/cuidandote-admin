/* Cuidándote Fisioterapia — edición y estados de citas. */
(function (global) {
  'use strict';

function toggleReagendar(id) {
  const panel = document.getElementById('reagendarPanel_' + id);
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

async function confirmarReagendar(id) {
  const fecha = document.getElementById('rDate_' + id).value;
  const hora  = document.getElementById('rTime_' + id).value;
  if (!fecha || !hora) { toast('Selecciona fecha y hora', 'err'); return; }
  if (!validateNoMidnight(hora, 'reagendar')) return;
  const cita = allData.citas.find(c => c.id === id);
  if (!cita) return;
  const data = encodeURIComponent(JSON.stringify({
    id, servicio: cita.servicio, modalidad: cita.modalidad,
    fecha, hora, precio: cita.precio, notas: cita.notas || ''
  }));
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
    const d = await r.json();
    if (d.ok) {
      logChange('Cita reagendada', `${cita.nombre} · ${cita.fecha} ${cita.hora} → ${fecha} ${hora}`);
      await reload();
      toast('Cita reagendada: ' + fmtDate(fecha) + ' ' + hora);
      closeModal('modalDetalle');
      initDashboard(); renderAgenda(); renderCalendar(); renderIngresosDetalle(); renderCitasResumen();
    } else toast('Error: ' + (d.error || ''), 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function guardarNotaAdmin(id) {
  const paraQuien = (document.getElementById('notaParaQuienInput').value||'').trim();
  const otrasNotas = document.getElementById('notaAdminInput').value.trim();
  const nota = (paraQuien ? '[PARA: ' + paraQuien + ']' + (otrasNotas ? ' ' + otrasNotas : '') : otrasNotas);
  try {
    const data = encodeURIComponent(JSON.stringify({id, notaAdmin: nota}));
    const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
    const d = await r.json();
    if (d.ok) {
      const cita = allData.citas.find(c => c.id === id);
      if (cita) cita.notaAdmin = nota;
      toast('Nota guardada');
    } else toast('Error al guardar nota', 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function changeStatus(id, status) {
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=updateStatus&token=${encodeURIComponent(TOKEN)}&id=${id}&status=${status}`);
    const d = await r.json();
    if (d.ok) {
      const cita = allData.citas.find(c => c.id === id);
      if (cita) cita.estado = status;
      if (cita) logChange('Estado cambiado', `${cita.nombre} · ${cita.servicio} ${cita.fecha} → ${status}`);
      toast('Estado actualizado: ' + status);
      if (status === 'No asistió' && cita) {
        const t = String(cita.telefono||'').replace(/\D/g,'');
        const phone = t.length <= 10 ? '57'+t : t;
        if (t.length >= 7 && confirm('¿Enviarle mensaje de reagendamiento a ' + cita.nombre + '?')) {
          const msg = 'Hola ' + waNombre(cita.nombre) + '! \uD83D\uDE4F Vi que no pudiste venir hoy. Espero que todo este bien. Cuando quieras reagendamos, dime que dias te quedan mejor y coordinamos. \uD83D\uDE0A — Cuidándote Fisioterapia';
          window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
        }
      }
      initDashboard();
      renderAgenda();
      updateBadge();
    } else toast('Error al actualizar', 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
}

function verDetalle(id) {
  const c = allData.citas.find(x => x.id === id);
  if (!c) return;
  const esCancelada = c.estado === 'Cancelada';
  document.getElementById('modalDetalleContent').innerHTML = `
    <div style="display:grid;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${row('Paciente', esc(c.nombre))} ${row('Teléfono', esc(c.telefono||'—'))}
        ${row('Email', esc(c.email||'—'))} ${row('Servicio', esc(c.servicio))}
        ${row('Fecha', esc(fmtDate(c.fecha) + ' · ' + c.hora))} ${row('Modalidad', esc(c.modalidad))}
        ${row('Valor', esc(c.precio))} ${row('Estado', chipState(c.estado))}
        ${c.direccion ? row('Dirección', esc(c.direccion)) : ''}
        ${c.notas ? row('Notas del paciente', esc(c.notas), true) : ''}
        ${row('ID cita', esc(c.id))}
      </div>
      ${patientInsightHtml(c)}
      <!-- Nota interna editable -->
      <div style="margin-top:10px;padding:10px 12px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.25);border-radius:8px">
        <div style="font-size:.75rem;color:#92400e;font-family:var(--font-m);margin-bottom:8px">📝 Nota interna (solo tú la ves)</div>
        <div style="margin-bottom:8px">
          <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">👤 ¿La sesión es para otra persona? (afecta el mensaje de seguimiento)</div>
          <input type="text" id="notaParaQuienInput" value="${(()=>{ const m=(c.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i); if(m) return m[1].trim(); const prev=allData.citas.filter(x=>x.nombre===c.nombre&&x.id!==c.id&&x.notaAdmin).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)); for(const p of prev){const mp=p.notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);if(mp)return mp[1].trim();} return ''; })()}" placeholder="Ej: tu esposo, tu mamá, tu hijo... (dejar en blanco si es para quien llama)" style="width:100%;background:rgba(255,255,255,.15);border:none;border-bottom:1px solid rgba(251,191,36,.4);border-radius:0;padding:4px 0;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text)">
        </div>
        <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">📋 Otras notas</div>
        <textarea id="notaAdminInput" rows="2" style="width:100%;background:transparent;border:none;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text);resize:none" placeholder="Ej: Debe pagar saldo, viene en transporte...">${(c.notaAdmin||'').replace(/\[PARA:[^\]]*\]\s*/i,'').trim()}</textarea>
        <button class="btn btn-ghost btn-sm" style="margin-top:6px" onclick="guardarNotaAdmin('${c.id}')">Guardar nota</button>
      </div>
      <!-- Mini-historial -->
      ${(()=>{
        const prev = allData.citas.filter(x => x.nombre===c.nombre && x.id!==c.id).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)).slice(0,3);
        if (!prev.length) return '';
        return `<div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px">
          <div style="font-size:.75rem;color:var(--muted);font-family:var(--font-m);margin-bottom:8px">CITAS ANTERIORES DE ${esc(c.nombre.split(' ')[0].toUpperCase())}</div>
          ${prev.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(27,191,176,.07);font-size:.82rem">
            <span style="font-family:var(--font-m);color:var(--primary);font-size:.75rem">${esc(fmtDate(p.fecha))} ${esc(p.hora)}</span>
            <span style="flex:1;margin:0 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.servicio)}</span>
            ${chipState(p.estado)}
          </div>`).join('')}
        </div>`;
      })()}
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        ${waBtn(c.telefono,c.nombre,c.fecha,c.hora,c.servicio,'WhatsApp confirmación',c.precio,c.modalidad)}
        <button class="btn btn-ghost btn-sm" onclick="(function(){ const p=(document.getElementById('notaParaQuienInput').value||'').trim(); const o=(document.getElementById('notaAdminInput').value||'').trim(); const nota=p?'[PARA: '+p+']'+(o?' '+o:''):o; seguimientoWA('${esc(c.telefono||'')}','${esc(c.nombre)}','${esc(c.servicio)}',nota); })()">💬 Seguimiento</button>
        ${waBtnPasaporte(c.telefono,c.nombre)}
        ${c.email ? `<a href="mailto:${c.email}" class="btn btn-ghost btn-sm">📧 Email</a>` : ''}
      </div>
      ${!esCancelada ? `
      <div style="display:flex;gap:8px;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:12px;margin-top:10px">
        <button class="btn btn-edit btn-sm" onclick="editarCita('${esc(c.id)}')">✏️ Editar cita</button>
        <button class="btn btn-ghost btn-sm" onclick="toggleReagendar('${esc(c.id)}')">📅 Reagendar</button>
        <button class="btn btn-danger btn-sm" onclick="cancelarCita('${esc(c.id)}','${esc(c.nombre)}')">🚫 Cancelar cita</button>
      </div>
      <div id="reagendarPanel_${c.id}" style="display:none;margin-top:10px;background:rgba(27,191,176,.05);border:1px solid var(--border);border-radius:10px;padding:14px">
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px">NUEVA FECHA Y HORA</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
          <div class="field" style="flex:1;min-width:130px">
            <label>Fecha *</label>
            <input type="date" id="rDate_${c.id}" value="${c.fecha}">
          </div>
          <div class="field" style="flex:1;min-width:110px">
            <label>Hora *</label>
            <input type="time" id="rTime_${c.id}" value="${c.hora}">
          </div>
          <button class="btn btn-teal btn-sm" onclick="confirmarReagendar('${c.id}')">Confirmar</button>
          <button class="btn btn-ghost btn-sm" onclick="toggleReagendar('${c.id}')">Cancelar</button>
        </div>
      </div>` : ''}
    </div>`;
  openModal('modalDetalle');
}

function cancelarCita(id, nombre) {
  _cancelPendingId = id;
  document.getElementById('modalCancelarNombre').textContent = `Cita de: ${nombre}`;
  document.querySelectorAll('input[name="motivoCancel"]').forEach(r => r.checked = false);
  // Resaltar opción seleccionada al hacer click
  document.querySelectorAll('#motivoOpciones label').forEach(lbl => {
    lbl.style.borderColor = 'transparent';
    const inp = lbl.querySelector('input');
    inp.onchange = () => {
      document.querySelectorAll('#motivoOpciones label').forEach(l => l.style.borderColor = 'transparent');
      lbl.style.borderColor = 'var(--primary)';
    };
  });
  document.getElementById('modalCancelar').style.display = 'flex';
}

async function confirmarCancelacion() {
  const id = _cancelPendingId;
  if (!id) return;
  const sel = document.querySelector('input[name="motivoCancel"]:checked');
  if (!sel) { toast('Selecciona un motivo de cancelación', 'err'); return; }
  const motivo = sel.value;

  const btn = document.getElementById('btnConfirmarCancelar');
  btn.disabled = true; btn.textContent = 'Cancelando...';

  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${id}`);
    const d = await r.json();
    if (d.ok) {
      const cita = allData.citas.find(c => c.id === id);
      if (cita) { cita.estado = 'Cancelada'; cita.motivoCancelacion = motivo; }
      saveCancelMotivo(id, motivo);
      if (cita) logChange('Cita cancelada', `${cita.nombre} · ${cita.fecha} ${cita.hora} · ${motivo}`);
      toast(esCancelExcluida(motivo) ? `🧪 Cita cancelada (${motivo} — no afecta KPIs)` : `Cita cancelada: ${motivo}`, 'ok');
      document.getElementById('modalCancelar').style.display = 'none';
      closeModal('modalDetalle');
      initDashboard();
      renderAgenda();
    } else toast('Error al cancelar: ' + (d.error||''), 'err');
  } catch(e) { toast('Error de conexión', 'err'); }

  btn.disabled = false; btn.textContent = 'Confirmar cancelación';
  _cancelPendingId = null;
}

function getCancelMotivos() {
  try { return JSON.parse(kvGet('cancelMotivos') || '{}'); } catch { return {}; }
}

function saveCancelMotivo(id, motivo) {
  const map = getCancelMotivos();
  map[id] = motivo;
  kvSet('cancelMotivos', JSON.stringify(map));
}

function getCancelMotivo(id) {
  return getCancelMotivos()[id] || null;
}

function esCancelExcluida(motivo) {
  return motivo === 'Prueba' || motivo === 'Error mío';
}

function marcarErrorMio(id) {
  const map = getCancelMotivos();
  if (map[id] === 'Error mío') {
    delete map[id]; // toggle: si ya estaba, lo quita
  } else {
    map[id] = 'Error mío';
  }
  kvSet('cancelMotivos', JSON.stringify(map));
  _renderCancelBreakdown();
  renderGestionMes();
}

function editarCita(id) {
  try {
    const c = allData.citas.find(x => x.id === id);
    if (!c) { toast('No se encontró la cita', 'err'); return; }

    document.getElementById('editId').value     = c.id;
    document.getElementById('editFecha').value  = normDate(c.fecha);
    document.getElementById('editPrecio').value = c.precio || '';
    document.getElementById('editNotas').value  = c.notas  || '';

    // Servicio — buscar por texto (opciones con y sin optgroup)
    const ss = document.getElementById('editServicio');
    let found = false;
    for (let i = 0; i < ss.options.length; i++) {
      if (ss.options[i].value === c.servicio || ss.options[i].text.trim() === c.servicio) {
        ss.selectedIndex = i; found = true; break;
      }
    }
    if (!found) ss.value = ss.options[0].value; // fallback al primero

    // Modalidad
    document.getElementById('editModalidad').value = c.modalidad === 'Domicilio' ? 'Domicilio' : 'Presencial';

    // Hora
    document.getElementById('editHora').value = c.hora || '';

    quitarDescuentoEdit();
    document.getElementById('editDescuentoPanel').style.display = 'none';
    closeModal('modalDetalle');
    openModal('modalEditar');
  } catch(err) {
    toast('Error al abrir edición: ' + err.message, 'err');
  }
}

function toggleDescuentoEdit() {
  const panel = document.getElementById('editDescuentoPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  if (panel.style.display === 'block') calcDescuentoEdit();
}

function calcDescuentoEdit() {
  const base = parsePrecio(document.getElementById('editPrecio').value);
  if (!base) { document.getElementById('editDescuentoResult').style.display='none'; return; }
  const pct = parseFloat(document.getElementById('editDescPct').value) || 0;
  if (pct > 0) {
    document.getElementById('editDescMonto').value = '';
    const desc = Math.round(base * pct / 100);
    _showEditDescResult(base, base - desc, desc);
  } else { document.getElementById('editDescuentoResult').style.display='none'; }
}

function calcDescuentoMontoEdit() {
  const base = parsePrecio(document.getElementById('editPrecio').value);
  if (!base) { document.getElementById('editDescuentoResult').style.display='none'; return; }
  const monto = parsePrecio(document.getElementById('editDescMonto').value);
  if (monto > 0) {
    document.getElementById('editDescPct').value = '';
    _showEditDescResult(base, Math.max(0, base - monto), monto);
  } else { document.getElementById('editDescuentoResult').style.display='none'; }
}

function _showEditDescResult(base, final, desc) {
  document.getElementById('editDescOriginal').textContent = formatPrecio(base);
  document.getElementById('editDescFinal').textContent    = formatPrecio(final);
  document.getElementById('editDescuentoResult').style.display = 'block';
}

function quitarDescuentoEdit() {
  document.getElementById('editDescPct').value   = '';
  document.getElementById('editDescMonto').value = '';
  document.getElementById('editDescuentoResult').style.display = 'none';
}

function getPrecioFinalEdit() {
  const base  = parsePrecio(document.getElementById('editPrecio').value);
  if (!base) return document.getElementById('editPrecio').value.trim();
  const pct   = parseFloat(document.getElementById('editDescPct').value)   || 0;
  const monto = parsePrecio(document.getElementById('editDescMonto').value) || 0;
  if (pct > 0)   return formatPrecio(base - Math.round(base * pct / 100));
  if (monto > 0) return formatPrecio(Math.max(0, base - monto));
  return document.getElementById('editPrecio').value.trim();
}

async function guardarEdicion() {
  const id       = document.getElementById('editId').value;
  const anterior = allData.citas.find(c => c.id === id);
  const servicio = document.getElementById('editServicio').value;
  const modalidad= document.getElementById('editModalidad').value;
  const fecha    = document.getElementById('editFecha').value;
  const hora     = document.getElementById('editHora').value;
  const precio   = getPrecioFinalEdit();
  const notas    = document.getElementById('editNotas').value.trim();
  if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
  if (!validateNoMidnight(hora, 'guardar la cita')) return;
  const btn = document.getElementById('editSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    const data = encodeURIComponent(JSON.stringify({id, servicio, modalidad, fecha, hora, precio, notas}));
    const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
    const d = await r.json();
    if (d.ok) {
      if (anterior) logChange('Cita editada', `${anterior.nombre} · ${anterior.fecha} ${anterior.hora} → ${fecha} ${hora} · ${servicio}`);
      await reload();
      toast('Cita actualizada correctamente');
      closeModal('modalEditar');
      initDashboard();
      renderAgenda();
      renderCalendar();
      renderIngresosDetalle();
      renderCitasResumen();
    } else toast('Error al guardar: ' + (d.error||''), 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

  global.PanelAppointmentEdit = Object.freeze({
    toggleReagendar,
    confirmarReagendar,
    guardarNotaAdmin,
    changeStatus,
    verDetalle,
    cancelarCita,
    confirmarCancelacion,
    getCancelMotivos,
    saveCancelMotivo,
    getCancelMotivo,
    esCancelExcluida,
    marcarErrorMio,
    editarCita,
    toggleDescuentoEdit,
    calcDescuentoEdit,
    calcDescuentoMontoEdit,
    _showEditDescResult,
    quitarDescuentoEdit,
    getPrecioFinalEdit,
    guardarEdicion
  });
})(window);
