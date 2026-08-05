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
      <td style="font-size:.82rem">${esc(c.servicio)}${sesionBadge(c.nombre, c.servicio)}<br><span class="health-badge ${h.tone}">${esc(h.badge)}</span></td>
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

async function renderCalendar() {
  await reload();
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

  // Obtener eventos personales de Google Calendar para esta semana
  try {
    const from = toDateStr(days[0]), to = toDateStr(days[6]);
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getCalEvents&token=${encodeURIComponent(TOKEN)}&from=${from}&to=${to}`);
    const d = await r.json();
    if (d.ok) _calGCevents = d.events || [];
  } catch(e) { _calGCevents = []; }

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
      html += `<div class="cal-day-cell ${isT?'cal-today':''}" onclick="openNuevaCitaFromCal('${ds}',${h})">`;

      // Citas del sistema
      allData.citas.forEach(c => {
        if (c.estado === 'Cancelada') return;
        if (c.servicio === 'Registro') return;
        if (normDate(c.fecha) !== ds) return;
        if (!c.hora) return;
        const [ch] = c.hora.split(':').map(Number);
        if (ch !== h) return;
        const cls = c.estado==='Confirmada'?'cal-ev-ok':c.estado==='Atendida'?'cal-ev-info':c.estado==='Cancelada'?'cal-ev-err':'cal-ev-warn';
        html += `<div class="cal-ev ${cls}" onclick="event.stopPropagation();verDetalle('${c.id}')">
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
      _calGCevents.forEach(ev => {
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
    renderCalendar
  });
})(window);
