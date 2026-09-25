/* Cuidándote Fisioterapia — Agenda de consulta y calendario. */
(function (global) {
  'use strict';

function goAgendaPatient(encodedName) {
  const name = decodeURIComponent(encodedName || '');
  showView('agenda');
  const search = document.getElementById('fSearch');
  if (search) { search.value = name; renderAgenda(); search.focus(); }
}

function filtrarDia(dateStr) {
  showView('agenda');
  document.getElementById('fDesde').value = dateStr;
  document.getElementById('fHasta').value = dateStr;
  renderAgenda();
}

function smartAgendaFilter(kind) {
  showView('agenda');
  const hoy = today();
  const wk = smartWeekBounds();
  ['fSearch','fDesde','fHasta'].forEach(id => { const el=document.getElementById(id); if (el) el.value=''; });
  ['fStatus','fMod','fService'].forEach(id => { const el=document.getElementById(id); if (el) el.selectedIndex=0; });
  if (kind === 'hoy') {
    document.getElementById('fDesde').value = hoy;
    document.getElementById('fHasta').value = hoy;
  } else if (kind === 'semana') {
    document.getElementById('fDesde').value = wk.startStr;
    document.getElementById('fHasta').value = wk.endStr;
  } else if (kind === 'pendientes') {
    document.getElementById('fStatus').value = 'Pendiente';
  } else if (kind === 'vencidos') {
    document.getElementById('fDesde').value = ADMIN_OPERATIONS_START_DATE;
    document.getElementById('fHasta').value = hoy;
  }
  renderAgenda();
}

function renderAgenda(keepPage = false) {
  if (!keepPage) _agendaPage = 0;

  const search   = (document.getElementById('fSearch').value||'').toLowerCase();
  const fSt      = document.getElementById('fStatus').value;
  const fMod     = document.getElementById('fMod').value;
  const fService = document.getElementById('fService').value;
  const fDesde   = document.getElementById('fDesde').value;
  const fHasta   = document.getElementById('fHasta').value;

  // Persistir filtros en sessionStorage
  sessionStorage.setItem('agendaFilters', JSON.stringify(
    {search, status: fSt, mod: fMod, service: fService, desde: fDesde, hasta: fHasta}
  ));

  // Citas normales
  let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
  if (window._agendaFiltroPendienteCierre) {
    const nowMs = Date.now();
    citas = citas.filter(c => {
      const estado = normalizeAppointmentStatus(c);
      if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
      const fecha = normDate(c.fecha);
      const hora = String(c.hora || '').slice(0, 5);
      if (!fecha || !/^\d{2}:\d{2}$/.test(hora)) return false;
      const fin = new Date(fecha + 'T' + hora);
      fin.setMinutes(fin.getMinutes() + 60);
      return fin.getTime() < nowMs;
    });
    window._agendaFiltroPendienteCierre = false;
  }

  if (search)                  citas = citas.filter(c => (c.nombre+c.servicio+c.email+c.telefono).toLowerCase().includes(search));
  if (fSt)                     citas = citas.filter(c => c.estado === fSt);
  if (fMod)                    citas = citas.filter(c => c.modalidad === fMod);
  if (fService === '__planes__') citas = citas.filter(c => { const s = c.servicio||''; return s.startsWith('Plan') || s.startsWith('Combo') || s.startsWith('Paquete') || s.startsWith('Mini'); });
  else if (fService)           citas = citas.filter(c => c.servicio === fService);
  if (fDesde)                  citas = citas.filter(c => normDate(c.fecha) >= fDesde);
  if (fHasta)                  citas = citas.filter(c => normDate(c.fecha) <= fHasta);

  // Mezclar eventos (solo si no hay filtros de estado/modalidad/servicio)
  if (!fSt && !fMod && !fService) {
    let evts = (allData.eventos || []);
    if (search) evts = evts.filter(e => (e.titulo+e.tipo+(e.notas||'')).toLowerCase().includes(search));
    if (fDesde) evts = evts.filter(e => e.fecha >= fDesde);
    if (fHasta) evts = evts.filter(e => e.fecha <= fHasta);
    evts = evts.map(e => ({
      ...e,
      _esEvento: true,
      nombre: e.titulo, hora: e.horaInicio,
      servicio: e.tipo, precio: e.cobro, modalidad:'—', estado:'—', telefono:'', email:''
    }));
    citas = [...citas, ...evts];
  }

  citas.sort((a,b) => (normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora));

  const total      = citas.length;
  const totalPages = Math.max(1, Math.ceil(total / AGENDA_PER_PAGE));
  if (_agendaPage >= totalPages) _agendaPage = totalPages - 1;
  const start     = _agendaPage * AGENDA_PER_PAGE;
  const pageCitas = citas.slice(start, start + AGENDA_PER_PAGE);

  const tbody = document.getElementById('agendaTbody');
  const pag   = document.getElementById('agendaPagination');

  if (total === 0) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><p>No se encontraron citas</p></div></td></tr>';
    if (pag) pag.innerHTML = '';
    return;
  }

  tbody.innerHTML = pageCitas.map(c => {
    if (c._esEvento) {
      const durStr = c.duracion ? ` · ${esc(c.duracion)}` : '';
      return `<tr class="evt-row">
        <td><span style="font-family:var(--font-m);font-size:.8rem">${esc(fmtDate(c.fecha))}</span><br><small style="color:var(--muted)">${esc(c.horaInicio)}–${esc(c.horaFin)}</small></td>
        <td>
          <span class="chip chip-evento" style="font-size:.7rem;margin-bottom:4px;display:inline-block">⚡ Evento</span><br>
          <strong>${esc(c.titulo)}</strong>${c.notas ? `<br><small style="color:var(--muted)">${esc(c.notas)}</small>` : ''}
        </td>
        <td style="font-size:.82rem">${esc(c.tipo)}${durStr}</td>
        <td>—</td>
        <td style="font-family:var(--font-m);color:#7c3aed;font-size:.82rem">${esc(c.cobro)}</td>
        <td>—</td>
        <td>
          <button class="btn btn-teal btn-sm" onclick="abrirEditarEvento('${esc(c.id)}')" title="Editar evento">✏️ Editar</button>
          <button class="btn btn-err btn-sm" onclick="eliminarEvento('${esc(c.id)}')" title="Eliminar evento">🗑️ Eliminar</button>
        </td>
      </tr>`;
    }
    const h = appointmentHealth(c);
    return `<tr class="${h.rowClass}">
      <td><span style="font-family:var(--font-m);font-size:.8rem">${esc(fmtDate(c.fecha))}</span><br><small style="color:var(--muted)">${esc(c.hora)}</small></td>
      <td>
        <strong>${esc(c.nombre)}</strong><br>
        <small style="color:var(--muted)">${esc(c.telefono||'')}</small><br>
        <button class="btn btn-ghost btn-sm" style="margin-top:3px;font-size:.7rem;padding:2px 7px" onclick="verHistorial('${encodeURIComponent(c.nombre)}')">📋 Historial</button>
      </td>
      <td style="font-size:.82rem">${esc(c.servicio)}${sesionBadge(c)}<br><span class="health-badge ${h.tone}">${esc(h.badge)}</span></td>
      <td><span class="chip ${c.modalidad==='Domicilio'?'chip-info':c.modalidad==='Virtual'?'chip-warn':'chip-ok'}" style="font-size:.7rem">${esc(c.modalidad)}</span></td>
      <td style="font-family:var(--font-m);color:var(--primary);font-size:.82rem">${esc(c.precio)}<br>${pagoBadge(c.id)}</td>
      <td>
        <select class="btn btn-ghost btn-sm" onchange="changeStatus('${esc(c.id)}',this.value)" style="cursor:pointer">
          ${APPOINTMENT_STATUSES.map(st => `<option ${c.estado===st?'selected':''}>${esc(st)}</option>`).join('')}
        </select>
      </td>
      <td>
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="verDetalle('${esc(c.id)}')">Ver</button>
          <button class="btn btn-ghost btn-sm" onclick="abrirAsignarPro('${esc(c.id)}')">Equipo</button>
          <button class="btn btn-ghost btn-sm" onclick="abrirPagoCita('${esc(c.id)}')">Pago</button>
          ${(()=>{const u=waLink(c.telefono,c.nombre,c.fecha,c.hora,c.servicio,c.precio,c.modalidad);const s=wasWaSent(c.id,'conf');return u?`<a href="${u}" target="_blank" class="btn btn-wa btn-sm" title="${s?'Ya enviado':'Confirmación'}" onclick="markWaSent('${esc(c.id)}','conf');this.textContent=this.textContent.includes('✓')?this.textContent:'Conf.✓'" style="${s?'opacity:.5':''}">${s?'Conf.✓':'Conf.'}</a>`:'';})()}
          ${(()=>{const u=waLinkRec(c.telefono,c.nombre,c.fecha,c.hora,c.servicio);const s=wasWaSent(c.id,'rec');return u?`<a href="${u}" target="_blank" class="btn btn-wa-rec btn-sm" title="${s?'Ya enviado':'Recordatorio'}" onclick="markWaSent('${esc(c.id)}','rec');this.textContent=this.textContent.includes('✓')?this.textContent:'Rec.✓'" style="${s?'opacity:.5':''}">${s?'Rec.✓':'Rec.'}</a>`:'';})()}
          ${(()=>{const u=waLinkSeg(c.telefono,c.nombre,c.servicio,c.notaAdmin);const s=wasWaSent(c.id,'seg');return u?`<a href="${u}" target="_blank" class="btn btn-wa-seg btn-sm" title="${s?'Ya enviado':'Seguimiento'}" onclick="markWaSent('${esc(c.id)}','seg');this.textContent=this.textContent.includes('✓')?this.textContent:'Seg.✓'" style="${s?'opacity:.5':''}">${s?'Seg.✓':'Seg.'}</a>`:'';})()}
          ${waBtnPasaporte(c.telefono,c.nombre)}
          ${c.estado!=='Cancelada'?`<button class="btn btn-edit btn-sm" onclick="editarCita('${esc(c.id)}')" title="Editar">✏️</button>`:''}
          ${c.estado!=='Cancelada'?`<button class="btn btn-danger btn-sm" onclick="cancelarCita('${esc(c.id)}','${esc(c.nombre)}')" title="Cancelar">🚫</button>`:''}
        </div>
      </td>
    </tr>`;
  }).join('');

  // Paginación
  if (pag) {
    const nEvts = pageCitas.filter(c=>c._esEvento).length;
    const totalLabel = nEvts ? `${total} registros (${nEvts} evento(s))` : `${total} cita(s)`;
    if (total <= AGENDA_PER_PAGE) {
      pag.innerHTML = `<span>${totalLabel}</span>`;
    } else {
      pag.innerHTML = `
        <span>${start+1}–${Math.min(start+AGENDA_PER_PAGE,total)} de ${total}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="btn btn-ghost btn-sm" ${_agendaPage===0?'disabled':''} onclick="_agendaPage--;renderAgenda(true)">← Ant.</button>
          <span style="font-family:var(--font-m);font-size:.78rem">Pág. ${_agendaPage+1} / ${totalPages}</span>
          <button class="btn btn-ghost btn-sm" ${_agendaPage>=totalPages-1?'disabled':''} onclick="_agendaPage++;renderAgenda(true)">Sig. →</button>
        </div>`;
    }
  }
}

function clearFilters() {
  ['fSearch','fDesde','fHasta'].forEach(id => document.getElementById(id).value='');
  ['fStatus','fMod','fService'].forEach(id => document.getElementById(id).selectedIndex=0);
  sessionStorage.removeItem('agendaFilters');
  renderAgenda();
}

function filtrarHoy() {
  document.getElementById('fDesde').value = today();
  document.getElementById('fHasta').value = today();
  document.getElementById('fSearch').value = '';
  document.getElementById('fStatus').selectedIndex = 0;
  document.getElementById('fMod').selectedIndex = 0;
  document.getElementById('fService').selectedIndex = 0;
  showView('agenda');
  renderAgenda();
}

function calPrev()  { calWeekStart.setDate(calWeekStart.getDate()-7); renderCalendar(); }

function calNext()  { calWeekStart.setDate(calWeekStart.getDate()+7); renderCalendar(); }

function calToday() { calWeekStart = getMonday(new Date()); renderCalendar(); }

let _calendarDragId = '';

function startCalendarDrag(event, encodedId) {
  const id = decodeURIComponent(encodedId || '');
  const cita = allData.citas.find(item => String(item.id) === id);
  if (!cita || ['Cancelada','Atendida'].includes(cita.estado)) { event.preventDefault(); return; }
  _calendarDragId = id;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', id);
  event.currentTarget.classList.add('cal-dragging');
}

function allowCalendarDrop(event) {
  if (!_calendarDragId) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.currentTarget.classList.add('cal-drop-target');
}

function clearCalendarDrop(event) {
  event?.currentTarget?.classList.remove('cal-drop-target');
}

async function dropCalendarAppointment(event, date, hour) {
  event.preventDefault();
  clearCalendarDrop(event);
  const id = event.dataTransfer.getData('text/plain') || _calendarDragId;
  _calendarDragId = '';
  document.querySelectorAll('.cal-dragging,.cal-drop-target').forEach(node => node.classList.remove('cal-dragging','cal-drop-target'));
  const cita = allData.citas.find(item => String(item.id) === String(id));
  const newTime = `${pad(hour)}:00`;
  if (!cita || (normDate(cita.fecha) === date && cita.hora === newTime)) return;
  if (!confirm(`¿Mover la cita de ${cita.nombre} a ${fmtDate(date)} a las ${newTime}?`)) return;
  if (!global.PanelAppointmentEdit?.moveAppointmentFromCalendar) { toast('La edición de citas todavía está cargando. Intenta de nuevo.', 'err'); return; }
  await global.PanelAppointmentEdit.moveAppointmentFromCalendar(cita.id, date, newTime);
}

function _calendarSlotModal() {
  let modal = document.getElementById('calendarSlotModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'calendarSlotModal';
  modal.className = 'modal-bg';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1300;align-items:center;justify-content:center;padding:18px';
  modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="calendarSlotTitle" style="max-width:430px;width:100%">
    <div class="modal-title" id="calendarSlotTitle">Este espacio está libre</div>
    <p id="calendarSlotSummary" style="color:var(--muted);font-size:.86rem;margin:-4px 0 16px"></p>
    <div id="calendarSlotBlockFields" style="display:none">
      <div class="field"><label>Hora final</label><input id="calendarSlotEnd" type="time"></div>
      <div class="field"><label>Motivo <span style="font-weight:400">(opcional)</span></label><input id="calendarSlotReason" type="text" placeholder="Ej: descanso, cita personal, viaje..."></div>
    </div>
    <div style="display:flex;gap:9px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px">
      <button id="calendarSlotCancel" class="btn btn-ghost" type="button">Cancelar</button>
      <button id="calendarSlotNew" class="btn btn-primary" type="button">Nueva cita</button>
      <button id="calendarSlotBlock" class="btn btn-teal" type="button">Bloquear este horario</button>
    </div>
  </div>`;
  modal.addEventListener('click', event => { if (event.target === modal) modal.style.display = 'none'; });
  document.body.appendChild(modal);
  return modal;
}

function openCalendarSlot(date, hour) {
  const openNew = global.PanelAppointmentCreate?.openNuevaCitaFromCal || global.openNuevaCitaFromCal;
  if (typeof openNew === 'function') openNew(date, hour);
  else toast('No se pudo abrir Nueva cita. Actualiza la página e intenta de nuevo.', 'err');
}

function _calendarDuplicateModal() {
  let modal = document.getElementById('calendarDuplicateModal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'calendarDuplicateModal';
  modal.className = 'modal-bg';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1300;align-items:center;justify-content:center;padding:18px';
  modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="calendarDuplicateTitle" style="max-width:470px;width:100%">
    <div class="modal-title" id="calendarDuplicateTitle">Duplicar cita</div>
    <p id="calendarDuplicateSummary" style="color:var(--muted);font-size:.86rem;line-height:1.5;margin:-4px 0 16px"></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="field"><label>Nueva fecha *</label><input id="calendarDuplicateDate" type="date" required></div>
      <div class="field"><label>Nueva hora *</label><input id="calendarDuplicateTime" type="time" required></div>
    </div>
    <p style="font-size:.78rem;color:var(--muted);margin:3px 0 0">Se crea una cita nueva. La cita original no se modifica.</p>
    <div style="display:flex;gap:9px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px">
      <button id="calendarDuplicateCancel" class="btn btn-ghost" type="button">Cancelar</button>
      <button id="calendarDuplicateSubmit" class="btn btn-primary" type="button">Duplicar cita</button>
    </div>
  </div>`;
  modal.addEventListener('click', event => { if (event.target === modal) modal.style.display = 'none'; });
  document.body.appendChild(modal);
  return modal;
}

function openCalendarDuplicate(event, encodedId) {
  event?.preventDefault();
  event?.stopPropagation();
  const id = decodeURIComponent(encodedId || '');
  const cita = allData.citas.find(item => String(item.id) === id);
  if (!cita) { toast('No encontramos esa cita. Actualiza el calendario e intenta de nuevo.', 'err'); return; }

  const modal = _calendarDuplicateModal();
  const dateInput = modal.querySelector('#calendarDuplicateDate');
  const timeInput = modal.querySelector('#calendarDuplicateTime');
  const summary = modal.querySelector('#calendarDuplicateSummary');
  const submit = modal.querySelector('#calendarDuplicateSubmit');
  const cancel = modal.querySelector('#calendarDuplicateCancel');

  summary.textContent = `${cita.nombre} · ${cita.servicio} · ${fmtDate(cita.fecha)} a las ${cita.hora}.`;
  dateInput.value = normDate(cita.fecha) || '';
  timeInput.value = String(cita.hora || '').slice(0, 5);
  modal.style.display = 'flex';
  setTimeout(() => dateInput.focus(), 0);

  cancel.onclick = () => { modal.style.display = 'none'; };
  submit.onclick = async () => {
    const date = dateInput.value;
    const time = timeInput.value;
    if (!date || !time) { toast('Elige la nueva fecha y hora.', 'err'); return; }
    if (!global.PanelAppointmentCreate?.validateNoMidnight?.(time, 'duplicar la cita')) return;

    submit.disabled = true;
    const originalLabel = submit.textContent;
    submit.textContent = 'Duplicando…';
    try {
      const data = {
        name: cita.nombre || '', phone: cita.telefono || '', email: cita.email || '',
        service: cita.servicio || '', modality: cita.modalidad || 'Presencial',
        date, time, priceP: cita.precio || 'A convenir', priceD: cita.precio || 'A convenir',
        address: cita.direccion || '', notes: cita.notas || '', notaAdmin: cita.notaAdmin || '',
        canal: cita.canal || 'Directo', gimnasio: cita.gimnasio || '',
        descuentoCliente: cita.descuentoCliente || '', comisionGym: cita.comisionGym || '',
        ingresoReal: cita.ingresoReal || '', margenPct: cita.margenPct || ''
      };
      const response = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result?.error || 'El servidor no pudo crear la copia.');

      if (typeof global._addOptimisticAppointment === 'function') global._addOptimisticAppointment(data, result);
      else if (Array.isArray(allData.citas) && result.id) allData.citas.unshift({
        id: result.id, nombre: data.name, telefono: data.phone, email: data.email,
        servicio: data.service, modalidad: data.modality, fecha: data.date, hora: data.time,
        precio: data.priceP, direccion: data.address, notas: data.notes, notaAdmin: data.notaAdmin,
        estado: 'Confirmada', pago: ''
      });
      modal.style.display = 'none';
      toast('✓ Cita duplicada. La original quedó intacta.', 'ok');
      renderCalendar();
      renderAgenda();
      initDashboard();
      if (typeof global._refreshPanelAfterBooking === 'function') global._refreshPanelAfterBooking();
    } catch (error) {
      toast('No se duplicó la cita: ' + (error?.message || 'Error de conexión.'), 'err');
    } finally {
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  };
}

function _calendarWeekKey(days) {
  return `${toDateStr(days[0])}:${toDateStr(days[days.length - 1])}`;
}

function _loadGoogleCalendarEvents(from, to, weekKey) {
  if (_calGCeventsLoading === weekKey) return;
  _calGCeventsLoading = weekKey;
  fetch(`${APPS_SCRIPT_URL}?action=getCalEvents&token=${encodeURIComponent(TOKEN)}&from=${from}&to=${to}`)
    .then(r => r.json())
    .then(data => {
      if (!data.ok) return;
      _calGCevents = data.events || [];
      _calGCeventsWeek = weekKey;
      // Actualiza solo si la persona sigue viendo la misma semana.
      if (_calendarWeekKey(Array.from({length:7}, (_, i) => {
        const date = new Date(calWeekStart); date.setDate(date.getDate() + i); return date;
      })) === weekKey) renderCalendar();
    })
    .catch(() => {
      if (_calGCeventsWeek !== weekKey) _calGCevents = [];
    })
    .finally(() => { if (_calGCeventsLoading === weekKey) _calGCeventsLoading = ''; });
}

async function renderCalendar() {
  const HOURS = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  const todayStr = today();

  const days = Array.from({length:7}, (_,i) => {
    const d = new Date(calWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Título
  const opts = {day:'numeric', month:'short'};
  document.getElementById('calTitle').textContent =
    days[0].toLocaleDateString('es-CO', opts) + ' — ' +
    days[6].toLocaleDateString('es-CO', {day:'numeric', month:'short', year:'numeric'});

  // Pintamos primero las citas que ya están en el panel. La lectura de Google
  // Calendar continúa en segundo plano para no congelar esta pantalla.
  const weekKey = _calendarWeekKey(days);
  const calendarEvents = _calGCeventsWeek === weekKey ? _calGCevents : [];
  if (_calGCeventsWeek !== weekKey) {
    _loadGoogleCalendarEvents(toDateStr(days[0]), toDateStr(days[6]), weekKey);
  }

  // Encabezado
  const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  let html = '<div class="cal-head-row"><div class="cal-hour-col"></div>';
  days.forEach((d,i) => {
    const ds = toDateStr(d);
    const isT = ds === todayStr;
    html += `<div class="cal-head-cell ${isT?'cal-today':''}">
      <span class="cal-head-day">${dayNames[i]}</span>
      <strong style="font-size:1rem">${d.getDate()}</strong>
    </div>`;
  });
  html += '</div>';

  // Filas por hora
  HOURS.forEach(h => {
    html += `<div class="cal-body-row"><div class="cal-time-cell">${pad(h)}:00</div>`;
    days.forEach(d => {
      const ds = toDateStr(d);
      const isT = ds === todayStr;
      html += `<div class="cal-day-cell ${isT?'cal-today':''}" onclick="PanelAgenda.openCalendarSlot('${ds}',${h})" ondragover="PanelAgenda.allowCalendarDrop(event)" ondragleave="PanelAgenda.clearCalendarDrop(event)" ondrop="PanelAgenda.dropCalendarAppointment(event,'${ds}',${h})">`;

      // Citas del sistema
      allData.citas.forEach(c => {
        if (c.estado === 'Cancelada') return;
        if (c.servicio === 'Registro') return;
        if (normDate(c.fecha) !== ds) return;
        if (!c.hora) return;
        const [ch] = c.hora.split(':').map(Number);
        if (ch !== h) return;
        const cls = c.estado==='Confirmada'?'cal-ev-ok':c.estado==='Atendida'?'cal-ev-info':c.estado==='Cancelada'?'cal-ev-err':'cal-ev-warn';
        html += `<div class="cal-ev ${cls}" draggable="${['Cancelada','Atendida'].includes(c.estado) ? 'false' : 'true'}" ondragstart="PanelAgenda.startCalendarDrag(event,'${encodeURIComponent(String(c.id))}')" onclick="event.stopPropagation();verDetalle('${c.id}')" oncontextmenu="PanelAgenda.openCalendarDuplicate(event,'${encodeURIComponent(String(c.id))}')" title="Clic para ver · clic derecho para duplicar">
          <span class="cal-ev-time">${c.hora} · ${c.modalidad==='Domicilio'?'Dom':'Pres'}</span>
          <span class="cal-ev-name">${c.nombre}</span>
          <span class="cal-ev-serv">${c.servicio.replace('Descarga Muscular','D.Musc.').replace('Readaptación','Readap.').replace('Valoración','Val.')}</span>
        </div>`;
      });

      // Bloqueos
      allData.bloqueos.forEach(b => {
        if (normDate(b.fecha) !== ds) return;
        const [bh] = (b.inicio||'0:0').split(':').map(Number);
        const [eh] = (b.fin||'0:0').split(':').map(Number);
        if (h < bh || h >= eh) return;
        html += `<div class="cal-ev cal-ev-block" onclick="event.stopPropagation()">
          <span class="cal-ev-time">${b.inicio}–${b.fin}</span>
          <span class="cal-ev-name">⛔ Bloqueado</span>
          <span class="cal-ev-serv">${b.motivo||''}</span>
        </div>`;
      });

      // Eventos internos (hoja Eventos) — se despliegan en todas las horas que ocupan
      (allData.eventos || []).forEach(ev => {
        if (normDate(ev.fecha) !== ds) return;
        const [ehs] = (ev.horaInicio||'0:0').split(':').map(Number);
        const [ehe] = (ev.horaFin||'0:0').split(':').map(Number);
        if (h < ehs || h >= ehe) return;
        const isFirst = h === ehs;
        html += `<div class="cal-ev" style="background:${isFirst?'#7c3aed22':'#7c3aed0d'};border-left:3px solid #7c3aed;min-height:32px;cursor:pointer" onclick="event.stopPropagation();abrirEditarEvento('${ev.id}')" title="Click para editar: ${ev.titulo}">
          ${isFirst
            ? `<span class="cal-ev-time" style="color:#7c3aed">${ev.horaInicio}–${ev.horaFin}${ev.duracion?' · '+ev.duracion:''}</span>
               <span class="cal-ev-name" style="color:#5b21b6">⚡ ${ev.titulo}</span>
               ${ev.cobro&&ev.cobro!=='Sin cobro'?`<span class="cal-ev-serv" style="color:#7c3aed">${ev.tipo} · ${ev.cobro}</span>`:''}`
            : `<span class="cal-ev-name" style="color:#7c3aed;opacity:.5;font-size:.68rem">⚡ ${ev.titulo}</span>`
          }
        </div>`;
      });

      // Eventos personales de Google Calendar
      calendarEvents.forEach(ev => {
        if (ev.fecha !== ds) return;
        if (ev.allDay) {
          if (h === 7) html += `<div class="cal-ev cal-ev-gcal" onclick="event.stopPropagation()" title="${ev.title}">
            <span class="cal-ev-time">Todo el día</span>
            <span class="cal-ev-name">📅 ${ev.title}</span>
          </div>`;
          return;
        }
        const [eh2] = (ev.hora||'0:0').split(':').map(Number);
        if (eh2 !== h) return;
        html += `<div class="cal-ev cal-ev-gcal" onclick="event.stopPropagation()" title="${ev.title}">
          <span class="cal-ev-time">${ev.hora}${ev.horaFin?' — '+ev.horaFin:''}</span>
          <span class="cal-ev-name">📅 ${ev.title}</span>
        </div>`;
      });

      html += '</div>';
    });
    html += '</div>';
  });

  document.getElementById('calGrid').innerHTML = html;
}

async function refreshCalendar() {
  const button = document.getElementById('calRefreshBtn');
  if (button) { button.disabled = true; button.textContent = 'Actualizando…'; }
  try {
    await reload();
    _calGCeventsWeek = '';
    renderCalendar();
  } finally {
    if (button) { button.disabled = false; button.textContent = 'Actualizar'; }
  }
}

  global.PanelAgenda = Object.freeze({
    goAgendaPatient,
    filtrarDia,
    smartAgendaFilter,
    renderAgenda,
    clearFilters,
    filtrarHoy,
    calPrev,
    calNext,
    calToday,
    startCalendarDrag,
    allowCalendarDrop,
    clearCalendarDrop,
    dropCalendarAppointment,
    openCalendarSlot,
    openCalendarDuplicate,
    renderCalendar,
    refreshCalendar
  });
})(window);
