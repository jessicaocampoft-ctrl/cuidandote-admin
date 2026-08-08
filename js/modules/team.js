/* Cuidándote Fisioterapia — Equipo clínico y portal profesional. */
(function (global) {
  'use strict';

function byIdFrom(list, key, val) {
  return (list || []).find(x => String(x[key] || '') === String(val || ''));
}

function assignmentFor(citaId) {
  return byIdFrom(teamData.asignaciones, 'CitaID', citaId) || {};
}

function professionalName(id) {
  const p = byIdFrom(teamData.profesionales, 'id', id) || byIdFrom(teamData.profesionales, 'ID', id);
  return p ? (p.nombre || p.Nombre || 'Equipo') : 'Sin asignar';
}

async function loadTeamData() {
  if (!TOKEN) return teamData;
  try {
    const d = await fetch(`${APPS_SCRIPT_URL}?action=teamData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
    if (d.ok) {
      teamData = {
        profesionales: d.profesionales || [],
        asignaciones: d.asignaciones || [],
        novedades: d.novedades || [],
        auditoria: d.auditoria || [],
        cuentas: d.cuentas || []
      };
      (allData.citas || []).forEach(c => {
        const a = assignmentFor(c.id);
        c.profesionalId = a.ProfesionalID || '';
        c.estadoAutorizacion = a.EstadoAutorizacion || '';
        c.tarifaProfesional = a.Tarifa || '';
      });
    }
  } catch(e) {
    console.warn('No se pudo cargar Equipo', e);
  }
  return teamData;
}

function activeProfessionals() {
  return (teamData.profesionales || []).filter(p => (p.estado || p.Estado || 'Activo') === 'Activo');
}

function teamCleanText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

function teamAppointmentById(id) {
  const target = String(id || '');
  return (allData.citas || []).find(c => String(c.id || c.ID || '') === target);
}

function teamAssignedAppointments(proId = '') {
  const citas = (teamData.asignaciones || [])
    .filter(a => !proId || String(a.ProfesionalID || '') === String(proId))
    .map(a => {
      const c = teamAppointmentById(a.CitaID);
      return c ? { ...c, _assignment:a } : null;
    })
    .filter(Boolean)
    .filter(c => isOperationalDate(c.fecha));
  return citas.sort((a,b) => (`${normDate(a.fecha)} ${a.hora || ''}`).localeCompare(`${normDate(b.fecha)} ${b.hora || ''}`));
}

function teamIsInactiveAppointment(c) {
  return ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','No asistió','Reembolsada'].includes(c?.estado || '');
}

function teamDateCode(dateStr) {
  const codes = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
  const d = new Date(`${normDate(dateStr)}T12:00:00`);
  return codes[d.getDay()] || '';
}

function teamAvailabilityDays(disponibilidad = '') {
  const text = teamCleanText(disponibilidad).toUpperCase().replace(/MIÉ/g,'MIE').replace(/SÁB/g,'SAB');
  const codes = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
  const found = new Set();
  const dayIndex = code => codes.indexOf(code);
  const addRange = (from, to) => {
    const a = dayIndex(from), b = dayIndex(to);
    if (a < 0 || b < 0) return;
    if (a <= b) for (let i = a; i <= b; i++) found.add(codes[i]);
    else { for (let i = a; i < codes.length; i++) found.add(codes[i]); for (let i = 0; i <= b; i++) found.add(codes[i]); }
  };
  [...text.matchAll(/\b(DOM|LUN|MAR|MIE|JUE|VIE|SAB)\b\s*(?:-|A|AL|HASTA)\s*\b(DOM|LUN|MAR|MIE|JUE|VIE|SAB)\b/g)].forEach(m => addRange(m[1], m[2]));
  codes.forEach(code => { if (new RegExp(`\\b${code}\\b`).test(text)) found.add(code); });
  return found;
}

function teamTimeToMinutes(value) {
  const s = teamCleanText(value).replace(/\s+/g,'');
  const m = s.match(/(\d{1,2})(?::?(\d{2}))?(am|pm)?/);
  if (!m) return null;
  let h = Number(m[1]), min = Number(m[2] || 0), mer = m[3] || '';
  if (mer === 'pm' && h < 12) h += 12;
  if (mer === 'am' && h === 12) h = 0;
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

function teamAvailabilityRange(disponibilidad = '') {
  const times = String(disponibilidad || '').match(/\d{1,2}(?::\d{2})?\s*(?:a\.?\s*m\.?|p\.?\s*m\.?|am|pm)?/gi) || [];
  if (times.length < 2) return null;
  const start = teamTimeToMinutes(times[0]);
  const end = teamTimeToMinutes(times[1]);
  return start === null || end === null ? null : { start, end };
}

function teamAvailabilityIssues(pro, cita) {
  if (!pro || !cita) return [];
  const issues = [];
  const disponibilidad = pro.disponibilidad || pro.Disponibilidad || '';
  const days = teamAvailabilityDays(disponibilidad);
  const code = teamDateCode(cita.fecha);
  if (disponibilidad && days.size && !days.has(code)) {
    issues.push(`Disponibilidad: este profesional figura con disponibilidad ${disponibilidad}, pero la cita es ${fmtDate(cita.fecha)}.`);
  }
  const range = teamAvailabilityRange(disponibilidad);
  const citaMin = teamTimeToMinutes(cita.hora);
  if (range && citaMin !== null && (citaMin < range.start || citaMin > range.end)) {
    issues.push(`Horario: la cita es a las ${cita.hora}, fuera del rango escrito (${disponibilidad}).`);
  }
  const servicios = teamCleanText(pro.servicios || pro.Servicios || '');
  const servicioCita = teamCleanText(cita.servicio || '');
  if (servicios && !['sin definir','todos','todo'].includes(servicios) && servicioCita) {
    const tokens = servicios.split(/[,;\/|]+/).map(x => x.trim()).filter(Boolean);
    const matches = tokens.some(t => servicioCita.includes(t) || t.includes(servicioCita));
    if (tokens.length && !matches) issues.push(`Servicio: "${cita.servicio}" no aparece dentro de los servicios asignados a ${pro.nombre}.`);
  }
  return issues;
}

function teamConflictAppointments(proId, cita) {
  if (!proId || !cita) return [];
  return teamAssignedAppointments(proId).filter(c =>
    String(c.id || c.ID || '') !== String(cita.id || c.ID || '') &&
    !teamIsInactiveAppointment(c) &&
    normDate(c.fecha) === normDate(cita.fecha) &&
    String(c.hora || '') === String(cita.hora || '')
  );
}

function renderTeamOperations(pros, pendientes, novedades) {
  const hoyStr = today();
  const activePros = pros.filter(p => (p.estado || '') === 'Activo');
  const todaysRows = activePros.map(p => {
    const citasHoy = teamAssignedAppointments(p.id).filter(c => normDate(c.fecha) === hoyStr && !teamIsInactiveAppointment(c));
    return { pro:p, citas:citasHoy };
  });
  const overloaded = todaysRows.filter(r => r.citas.length >= 5);
  const withoutSchedule = activePros.filter(p => !(p.disponibilidad || '').trim());
  const alertas = [
    ...pendientes.slice(0, 3).map(c => ({ tone:'danger', title:'Cita sin asignar', body:`${c.nombre} · ${fmtDate(c.fecha)} · ${c.hora || 'sin hora'}` })),
    ...overloaded.map(r => ({ tone:'', title:'Carga alta hoy', body:`${r.pro.nombre}: ${r.citas.length} citas asignadas.` })),
    ...withoutSchedule.slice(0, 3).map(p => ({ tone:'', title:'Disponibilidad incompleta', body:`${p.nombre} aún no tiene disponibilidad definida.` })),
    ...novedades.filter(n => (n.EstadoAdmin || 'Pendiente') === 'Pendiente').slice(0, 3).map(n => ({ tone:'', title:'Novedad pendiente', body:`${professionalName(n.ProfesionalID)} · ${n.Tipo || 'Revisar cita'}` }))
  ];
  document.getElementById('equipoOperacion').innerHTML = `
    <div class="team-ops-grid">
      <div class="team-panel">
        <h2>Operación de hoy</h2>
        <div class="team-ops-list">
          ${todaysRows.length ? todaysRows.map(r => `
            <div class="team-ops-row">
              <div>
                <strong>${esc(r.pro.nombre)}</strong>
                <small>${r.citas.length ? r.citas.map(c => `${esc(c.hora || 'Sin hora')} ${esc(c.nombre || 'Paciente')}`).join(' · ') : 'Sin citas asignadas hoy'}</small>
              </div>
              <span class="team-pill ${r.citas.length ? 'info' : ''}">${r.citas.length} cita${r.citas.length === 1 ? '' : 's'}</span>
            </div>`).join('') : '<div class="empty"><p>No hay fisioterapeutas activos.</p></div>'}
        </div>
      </div>
      <div class="team-panel">
        <h2>Alertas del equipo</h2>
        <div class="team-ops-list">
          ${alertas.length ? alertas.map(a => `<div class="team-alert ${esc(a.tone)}"><strong>${esc(a.title)}</strong>${esc(a.body)}</div>`).join('') : '<div class="team-alert ok"><strong>Todo al día</strong>No hay alertas operativas visibles para hoy.</div>'}
        </div>
      </div>
    </div>`;
}

function renderEquipo() {
  const pros = (teamData.profesionales || []).filter(p => (p.estado || '') !== 'Eliminado');
  const assigns = teamData.asignaciones || [];
  const novedades = teamData.novedades || [];
  const cuentas = teamData.cuentas || [];
  const citas = citasReales ? citasReales() : (allData.citas || []);
  const asignadas = new Set(assigns.map(a => String(a.CitaID || '')));
  const hoyStr = today();
  const estadosNoAsignables = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','No asistió','Atendida','Sesión atendida','Reembolsada'];
  const citasAsignadasOperativas = teamAssignedAppointments().filter(c => !teamIsInactiveAppointment(c));
  const pendientes = citas
    .filter(c => !asignadas.has(String(c.id)) && normDate(c.fecha) >= hoyStr && !estadosNoAsignables.includes(c.estado))
    .sort((a,b) => (`${normDate(a.fecha)} ${a.hora||''}`).localeCompare(`${normDate(b.fecha)} ${b.hora||''}`))
    .slice(0, 12);
  const porPagar = cuentas.filter(c => (c.Estado || '') !== 'Pagada');

  document.getElementById('equipoStats').innerHTML = [
    ['Profesionales activos', pros.filter(p => (p.estado || '') === 'Activo').length],
    ['Citas asignadas', citasAsignadasOperativas.length],
    ['Novedades pendientes', novedades.filter(n => (n.EstadoAdmin || 'Pendiente') === 'Pendiente').length],
    ['Cuentas por pagar', porPagar.length]
  ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
  renderTeamOperations(pros, pendientes, novedades);

  document.getElementById('equipoProfesionales').innerHTML = pros.length ? pros.map(p => {
    const citasAsignadas = teamAssignedAppointments(p.id).filter(c => !teamIsInactiveAppointment(c)).length;
    return `
    <div class="team-card clickable" role="button" tabindex="0" title="Ver citas asignadas" onclick="openProfessionalSchedule('${esc(p.id)}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProfessionalSchedule('${esc(p.id)}')}">
      <div class="team-card-head">
        <div>
          <h3>${esc(p.nombre)}</h3>
          <div class="team-muted">${esc(p.rol || 'Fisioterapeuta')} · ${esc(p.usuario || '')}${p.email ? ' · ' + esc(p.email) : ''}</div>
        </div>
        <span class="team-pill ${(p.estado || '') === 'Activo' ? 'ok' : 'warn'}">${esc(p.estado || 'Activo')}</span>
      </div>
      <div class="team-muted" style="margin-top:8px"><strong>Servicios:</strong> ${esc(p.servicios || 'Sin definir')}</div>
      <div class="team-muted"><strong>Disponibilidad:</strong> ${esc(p.disponibilidad || 'Sin definir')}</div>
      <div class="team-card-hint">Ver agenda asignada · ${esc(citasAsignadas)} cita${citasAsignadas === 1 ? '' : 's'}</div>
      <div class="team-card-actions">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openProfessionalForm('${esc(p.id)}')">Editar</button>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();resetProPassword('${esc(p.id)}')">Reset clave</button>
        <button class="btn ${(p.estado || '') === 'Activo' ? 'btn-danger' : 'btn-teal'} btn-sm" onclick="event.stopPropagation();togglePro('${esc(p.id)}','${(p.estado || '') === 'Activo' ? 'Inactivo' : 'Activo'}')">${(p.estado || '') === 'Activo' ? 'Desactivar' : 'Activar'}</button>
        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation();deletePro('${esc(p.id)}','${esc(p.nombre)}')">Eliminar</button>
      </div>
    </div>`;
  }).join('') : '<div class="empty"><p>No hay fisioterapeutas creados aún.</p></div>';

  document.getElementById('equipoPendientes').innerHTML = pendientes.length ? pendientes.map(c => `
    <div class="team-card">
      <div class="team-card-head">
        <div>
          <h3>${esc(c.nombre)}</h3>
          <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.servicio)}</div>
        </div>
        <span class="team-pill">${esc(c.estado || 'Pendiente')}</span>
      </div>
      <div class="team-card-actions">
        <button class="btn btn-teal btn-sm" onclick="abrirAsignarPro('${esc(c.id)}')">Asignar / autorizar</button>
        <button class="btn btn-ghost btn-sm" onclick="verDetalle('${esc(c.id)}')">Ver cita</button>
      </div>
    </div>`).join('') : '<div class="empty"><p>No hay citas próximas pendientes por asignar.</p></div>';

  document.getElementById('equipoNovedades').innerHTML = novedades.length ? novedades.slice().reverse().slice(0, 10).map(n => `
    <div class="team-row">
      <div>
        <strong>${esc(n.Tipo || 'Novedad')}</strong>
        <small>${esc(professionalName(n.ProfesionalID))} · Cita ${esc(n.CitaID)} · ${esc(n.Observacion || '')}</small>
      </div>
      <span class="team-pill warn">${esc(n.EstadoAdmin || 'Pendiente')}</span>
    </div>`).join('') : '<div class="empty"><p>No hay novedades reportadas.</p></div>';

  document.getElementById('equipoCuentas').innerHTML = cuentas.length ? cuentas.slice().reverse().slice(0, 12).map(c => `
    <div class="team-row">
      <div>
        <strong>${esc(professionalName(c.ProfesionalID))}</strong>
        <small>${esc(c.Servicio || '')} · Cita ${esc(c.CitaID)} · ${formatPrecio(parsePrecio(c.Tarifa || 0))}</small>
      </div>
      ${(c.Estado || '') === 'Pagada' ? '<span class="team-pill ok">Pagada</span>' : `<button class="btn btn-teal btn-sm" onclick="markPayablePaid('${esc(c.ID)}')">Marcar pagada</button>`}
    </div>`).join('') : '<div class="empty"><p>Aún no hay cuentas por pagar generadas.</p></div>';
}

function openProfessionalSchedule(id) {
  const pro = byIdFrom(teamData.profesionales, 'id', id) || byIdFrom(teamData.profesionales, 'ID', id);
  if (!pro) return toast('No encontré el fisioterapeuta', 'err');
  const assignments = (teamData.asignaciones || []).filter(a => String(a.ProfesionalID || '') === String(id));
  const citas = assignments
    .map(a => {
      const c = (allData.citas || []).find(x => String(x.id || x.ID || '') === String(a.CitaID || ''));
      return c ? { ...c, _assignment: a } : null;
    })
    .filter(Boolean)
    .filter(c => isOperationalDate(c.fecha))
    .sort((a,b) => (`${normDate(a.fecha)} ${a.hora || ''}`).localeCompare(`${normDate(b.fecha)} ${b.hora || ''}`));
  const hoyStr = today();
  const proximas = citas.filter(c => normDate(c.fecha) >= hoyStr);
  const anteriores = citas.filter(c => normDate(c.fecha) < hoyStr);
  const ordered = [...proximas, ...anteriores];

  document.getElementById('proAgendaAdminTitle').textContent = `${pro.nombre || 'Fisioterapeuta'} · Agenda asignada`;
  document.getElementById('proAgendaAdminSummary').textContent = ordered.length
    ? `${ordered.length} cita${ordered.length === 1 ? '' : 's'} asignada${ordered.length === 1 ? '' : 's'} desde el inicio operativo del administrador.`
    : 'Este profesional todavía no tiene citas asignadas desde hoy.';
  document.getElementById('proAgendaAdminContent').innerHTML = ordered.length ? ordered.map(c => {
    const fecha = normDate(c.fecha);
    const statusPill = fecha === hoyStr ? '<span class="team-pill info">Hoy</span>' : (fecha > hoyStr ? '<span class="team-pill ok">Próxima</span>' : '<span class="team-pill">Anterior</span>');
    return `
      <div class="team-row">
        <div>
          <strong>${esc(c.nombre || 'Paciente')}</strong>
          <small>${esc(fmtDate(c.fecha))} · ${esc(c.hora || 'Sin hora')} · ${esc(c.servicio || 'Servicio sin definir')} · ${esc(c.estado || 'Sin estado')}</small>
        </div>
        <div class="team-card-actions" style="margin-top:0;justify-content:flex-end">
          ${statusPill}
          <button class="btn btn-ghost btn-sm" onclick="closeModal('modalProAgendaAdmin');verDetalle('${esc(c.id || c.ID)}')">Ver cita</button>
        </div>
      </div>`;
  }).join('') : '<div class="empty"><p>No hay citas asignadas para mostrar.</p></div>';
  openModal('modalProAgendaAdmin');
}

function openProfessionalForm(id='') {
  const p = id ? byIdFrom(teamData.profesionales, 'id', id) : null;
  document.getElementById('proFormTitle').textContent = p ? 'Editar fisioterapeuta' : 'Crear fisioterapeuta';
  document.getElementById('teamProId').value = p?.id || '';
  document.getElementById('teamProNombre').value = p?.nombre || '';
  document.getElementById('teamProUsuario').value = p?.usuario || '';
  document.getElementById('teamProEmail').value = p?.email || '';
  document.getElementById('teamProRol').value = p?.rol || 'Fisioterapeuta';
  document.getElementById('teamProEstado').value = p?.estado || 'Activo';
  document.getElementById('teamProServicios').value = p?.servicios || '';
  document.getElementById('teamProDisponibilidad').value = p?.disponibilidad || '';
  openModal('modalProfesional');
}

function showTemporaryPassword(title, password) {
  document.getElementById('tempPassTitle').textContent = title || 'Contraseña temporal';
  document.getElementById('tempPassValue').textContent = password || '';
  openModal('modalClaveTemporal');
}

async function copyTempPassword() {
  const value = document.getElementById('tempPassValue').textContent.trim();
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    toast('Contraseña copiada');
  } catch(e) {
    const ta = document.createElement('textarea');
    ta.value = value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('Contraseña copiada');
  }
}

async function saveProfessionalForm() {
  const payload = {
    id: document.getElementById('teamProId').value,
    nombre: document.getElementById('teamProNombre').value.trim(),
    usuario: document.getElementById('teamProUsuario').value.trim(),
    email: document.getElementById('teamProEmail').value.trim(),
    rol: document.getElementById('teamProRol').value,
    estado: document.getElementById('teamProEstado').value,
    servicios: document.getElementById('teamProServicios').value.trim(),
    disponibilidad: document.getElementById('teamProDisponibilidad').value.trim(),
    tarifasJSON: '{}'
  };
  const d = await fetch(`${APPS_SCRIPT_URL}?action=saveProfessional&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(payload))}`).then(r => r.json());
  if (!d.ok) { toast(d.error || 'No se pudo guardar', 'err'); return; }
  closeModal('modalProfesional');
  await loadTeamData();
  renderEquipo();
  if (d.tempPassword) showTemporaryPassword('Contraseña temporal creada', d.tempPassword);
  else toast('Profesional actualizado');
}

async function resetProPassword(id) {
  if (!confirm('¿Restablecer la contraseña de este usuario?')) return;
  const d = await fetch(`${APPS_SCRIPT_URL}?action=resetProfessionalPassword&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
  if (d.ok) showTemporaryPassword('Nueva contraseña temporal', d.tempPassword);
  else toast(d.error || 'No se pudo restablecer', 'err');
}

async function togglePro(id, estado) {
  const d = await fetch(`${APPS_SCRIPT_URL}?action=toggleProfessional&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(estado)}`).then(r => r.json());
  if (d.ok) { await loadTeamData(); renderEquipo(); toast('Estado actualizado'); }
  else toast(d.error || 'No se pudo actualizar', 'err');
}

async function deletePro(id, nombre) {
  const label = nombre || 'este fisioterapeuta';
  if (!confirm(`¿Eliminar a ${label} de la lista de fisioterapeutas?\n\nNo podrá ingresar al portal. El historial interno se conserva para auditoría.`)) return;
  const d = await fetch(`${APPS_SCRIPT_URL}?action=deleteProfessional&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
  if (d.ok) {
    await loadTeamData();
    renderEquipo();
    toast('Fisioterapeuta eliminado de la lista');
  } else {
    toast(d.error || 'No se pudo eliminar', 'err');
  }
}

function abrirAsignarPro(citaId) {
  const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
  if (!c) return toast('No encontré la cita', 'err');
  const a = assignmentFor(citaId);
  document.getElementById('assignCitaId').value = citaId;
  document.getElementById('assignCitaResumen').innerHTML = `
    <strong>${esc(c.nombre)}</strong>
    <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.servicio)} · Estado: ${esc(c.estado)}</div>
    <div class="team-muted">Asignado actual: ${esc(professionalName(a.ProfesionalID))}</div>`;
  document.getElementById('assignProfessionalId').innerHTML = activeProfessionals().map(p => `<option value="${esc(p.id)}" ${a.ProfesionalID === p.id ? 'selected' : ''}>${esc(p.nombre)} · ${esc(p.rol || 'Fisioterapeuta')}</option>`).join('');
  document.getElementById('assignOverride').value = a.OverrideAtencion === 'SI' ? '1' : '';
  document.getElementById('assignExcepcion').value = '';
  renderAssignWarnings();
  openModal('modalAsignarPro');
}

function renderAssignWarnings() {
  const box = document.getElementById('assignWarnings');
  if (!box) return;
  const citaId = document.getElementById('assignCitaId')?.value || '';
  const proId = document.getElementById('assignProfessionalId')?.value || '';
  const cita = teamAppointmentById(citaId);
  const pro = byIdFrom(teamData.profesionales, 'id', proId) || byIdFrom(teamData.profesionales, 'ID', proId);
  if (!cita || !proId) {
    box.innerHTML = '<div class="team-alert danger"><strong>Falta información</strong>Selecciona un fisioterapeuta activo para validar la asignación.</div>';
    return;
  }
  const conflicts = teamConflictAppointments(proId, cita);
  const availability = teamAvailabilityIssues(pro, cita);
  const warnings = [];
  if (conflicts.length) {
    warnings.push({
      tone:'danger',
      title:'Choque de horario',
      body:`${pro?.nombre || 'El profesional'} ya tiene ${conflicts.length} cita${conflicts.length === 1 ? '' : 's'} a esa misma hora: ${conflicts.map(c => c.nombre || 'Paciente').join(', ')}.`
    });
  }
  availability.forEach(issue => warnings.push({ tone:'', title:'Revisar antes de asignar', body:issue }));
  box.innerHTML = warnings.length
    ? warnings.map(w => `<div class="team-alert ${esc(w.tone)}"><strong>${esc(w.title)}</strong>${esc(w.body)}</div>`).join('')
    : '<div class="team-alert ok"><strong>Asignación sin alertas visibles</strong>No encuentro choques de horario ni conflictos con la disponibilidad escrita.</div>';
}

async function saveAssignPro(options = {}) {
  const { closeOnSuccess = true } = options;
  const params = new URLSearchParams({
    action:'assignProfessional',
    token:TOKEN,
    citaId:document.getElementById('assignCitaId').value,
    profesionalId:document.getElementById('assignProfessionalId').value,
    tarifa:'',
    override:document.getElementById('assignOverride').value
  });
  const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
  if (d.ok) {
    await loadTeamData();
    renderEquipo();
    renderAgenda(true);
    if (closeOnSuccess) closeModal('modalAsignarPro');
    toast('Cita asignada');
    return true;
  }
  toast(d.error || 'No se pudo asignar', 'err');
  return false;
}

async function authorizeAssignPro() {
  const assigned = await saveAssignPro({ closeOnSuccess:false });
  if (!assigned) return;
  const params = new URLSearchParams({
    action:'authorizeAppointment',
    token:TOKEN,
    citaId:document.getElementById('assignCitaId').value,
    excepcion:document.getElementById('assignExcepcion').value
  });
  const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
  if (d.ok) {
    closeModal('modalAsignarPro');
    await reload();
    await loadTeamData();
    renderEquipo();
    toast('Cita autorizada para atender');
  } else toast(d.error || 'No se pudo autorizar', 'err');
}

async function markPayablePaid(id) {
  if (!confirm('¿Marcar esta cuenta como pagada?')) return;
  const d = await fetch(`${APPS_SCRIPT_URL}?action=markPayablePaid&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
  if (d.ok) { await loadTeamData(); renderEquipo(); toast('Cuenta marcada como pagada'); }
  else toast(d.error || 'No se pudo actualizar', 'err');
}

function setProfessionalMode(mode) {
  professionalMode = mode;
  document.querySelectorAll('.pro-seg').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('proMode-' + mode);
  if (btn) btn.classList.add('active');
  renderProfessionalAgenda();
}

function renderProfessionalAgenda() {
  const selected = document.getElementById('proDate').value || today();
  const base = professionalAgenda.slice().sort((a,b) => (`${a.fecha} ${a.hora}`).localeCompare(`${b.fecha} ${b.hora}`));
  const start = new Date(selected + 'T00:00:00');
  const end = new Date(start); end.setDate(end.getDate() + 7);
  const list = base.filter(c => {
    const d = new Date(c.fecha + 'T00:00:00');
    if (professionalMode === 'hoy') return c.fecha === today();
    if (professionalMode === 'fecha') return c.fecha === selected;
    if (professionalMode === 'semana') return d >= start && d < end;
    return d >= new Date(today() + 'T00:00:00');
  });
  document.getElementById('proAgendaList').innerHTML = list.length ? list.map(c => {
    const badge = c.autorizada ? (c.estado || 'Autorizada') : (c.autorizacion || 'Asignada pendiente de autorización');
    const canAttend = c.puedeAtender && c.estado !== 'Sesión atendida';
    return `
    <article class="pro-card pro-appointment">
      <div class="team-card-head">
        <h3>${esc(c.nombre)}</h3>
        <span class="team-pill ${c.autorizada ? 'info' : 'warn'}">${esc(badge)}</span>
      </div>
      <div class="pro-meta">
        <span><strong>Fecha:</strong> ${esc(fmtDate(c.fecha))} · ${esc(c.hora)}</span>
        <span><strong>Servicio:</strong> ${esc(c.servicio)} · ${esc(c.duracion)} min</span>
        <span><strong>Lugar:</strong> ${esc(c.lugar || c.modalidad || '—')}</span>
        ${!c.autorizada ? '<span><strong>Estado:</strong> Asignada, pendiente de autorización administrativa.</span>' : ''}
        ${c.observaciones ? `<span><strong>Observaciones:</strong> ${esc(c.observaciones)}</span>` : ''}
      </div>
      <div class="pro-actions">
        <button class="btn btn-teal btn-sm" ${canAttend ? '' : 'disabled'} onclick="markProfessionalAttended('${esc(c.id)}')">Marcar sesión atendida</button>
        <button class="btn btn-ghost btn-sm" onclick="openProIssue('${esc(c.id)}')">Reportar novedad</button>
      </div>
    </article>`;
  }).join('') : '<div class="team-panel"><p class="team-muted">No hay citas asignadas para este filtro.</p></div>';
}

async function markProfessionalAttended(citaId) {
  if (!confirm('¿Confirmas que esta sesión ya fue atendida? Esta acción solo la puede revertir administración.')) return;
  const d = await fetch(APPS_SCRIPT_URL, {
    method:'POST',
    body:JSON.stringify({action:'professionalMarkAttended', token:PROFESSIONAL_TOKEN, citaId})
  }).then(r => r.json());
  if (d.ok) { toast('Sesión marcada como atendida'); await loadProfessionalAgenda(); }
  else toast(d.error || 'No se pudo marcar', 'err');
}

function openProIssue(citaId) {
  document.getElementById('proIssueCitaId').value = citaId;
  document.getElementById('proIssueTipo').value = 'Paciente no responde';
  document.getElementById('proIssueObs').value = '';
  openModal('modalProIssue');
}

async function sendProfessionalIssue() {
  const d = await fetch(APPS_SCRIPT_URL, {
    method:'POST',
    body:JSON.stringify({
      action:'professionalReportIssue',
      token:PROFESSIONAL_TOKEN,
      citaId:document.getElementById('proIssueCitaId').value,
      tipo:document.getElementById('proIssueTipo').value,
      observacion:document.getElementById('proIssueObs').value.trim()
    })
  }).then(r => r.json());
  if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
  else toast(d.error || 'No se pudo enviar', 'err');
}

  global.PanelTeam = Object.freeze({
    byIdFrom,
    assignmentFor,
    professionalName,
    loadTeamData,
    activeProfessionals,
    teamCleanText,
    teamAppointmentById,
    teamAssignedAppointments,
    teamIsInactiveAppointment,
    teamDateCode,
    teamAvailabilityDays,
    teamTimeToMinutes,
    teamAvailabilityRange,
    teamAvailabilityIssues,
    teamConflictAppointments,
    renderTeamOperations,
    renderEquipo,
    openProfessionalSchedule,
    openProfessionalForm,
    showTemporaryPassword,
    copyTempPassword,
    saveProfessionalForm,
    resetProPassword,
    togglePro,
    deletePro,
    abrirAsignarPro,
    renderAssignWarnings,
    saveAssignPro,
    authorizeAssignPro,
    markPayablePaid,
    setProfessionalMode,
    renderProfessionalAgenda,
    markProfessionalAttended,
    openProIssue,
    sendProfessionalIssue
  });
})(window);
