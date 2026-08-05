# Inventario estricto del Pasaporte — Fase 5

- Funciones relacionadas: 26
- IDs relacionados: 24
- Acciones API relacionadas: 5
- Handlers HTML relacionados: 5

## Acciones API

- `passportDeactivate`
- `passportEnsure`
- `passportReactivate`
- `passportRegenerateToken`
- `passportSaveProgress`

## IDs

- ` + encodeURIComponent(_pasCurrent.id)
      + `
- ` + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || `
- `modalCambiarPassword`
- `pasAbrirBtn`
- `pasAdminTools`
- `pasConfirmBadge`
- `pasCopyBtn`
- `pasDropdown`
- `pasLinkCard`
- `pasLinkTexto`
- `pasNombreInput`
- `pasPhoneBadge`
- `pasProgressEditor`
- `pasQR`
- `pasSaveStatus`
- `pasWarning`
- `pasWhatsApp`
- `proNewPass`
- `proPass`
- `sb-pasaporte`
- `tempPassHelp`
- `tempPassTitle`
- `tempPassValue`
- `vPasaporte`

## Handlers HTML

- `abrirPasaporte()`
- `desactivarPasaporte()`
- `guardarProgresoPasaporte()`
- `reactivarPasaporte()`
- `regenerarTokenPasaporte()`

## Funciones

### esc — línea 6219

```javascript
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

const APPOINTMENT_STATUSES = [
  'Solicitud recibida',
  'Pendiente de pago',
  'Pago por verificar',
  'Pago rechazado',
  'Pago verificado',
  'Autorizada para atender',
  'Sesión iniciada',
  'Sesión atendida',
  'Cerrada',
  'Reprogramada',
  'Reserva vencida',
  'Saldo a favor',
  'Cancelada a tiempo',
  'Cancelación tardía',
  'No asistió',
  'Cortesía autorizada',
  'Reembolsada',
  'Confirmada',
  'Pendiente',
  'Atendida',
  'Cancelada'
];

// Desde esta fecha el administrador empieza “limpio” operativamente.
// Lo anterior queda como historial, pero no alimenta tareas, cobros vencidos ni alertas pendientes.
const ADMIN_OPERATIONS_START_DATE = '2026-07-16';
function isOperationalDate(dateStr) {
  const d = normDate(dateStr);
  return !!d && d >= ADMIN_OPERATIONS_START_DATE;
}

function _sessionBridge() {
  return {
    apiUrl: APPS_SCRIPT_URL,
    document,
    location,
    sessionStorage,
    setTimeout: window.setTimeout.bind(window),
    setInterval: window.setInterval.bind(window),
    inactivityMs: 30 * 60 * 1000,
    fetchJsonWithTimeout,
    toast,
    today,
    getAdminToken: () => TOKEN,
    setAdminToken: value => { TOKEN = value || ''; },
    getAdminUser: () => document.getElementById('userInput')?.value || '',
    getAdminPassword: () => document.getElementById('pwInput')?.value || '',
    setLoginTime: value => { _loginTime = value; },
    setAllData: value => { allData = value; },
    onAdminReady: async () => {
      await loadAdminKV();
      await loadTeamData();
      reloadMetas();
      _initSidebarState();
      initDashboard();
      await _runUrlRepairIfRequested();
    },
    reloadPage: () => location.reload(),
    getProfessionalToken: () => PROFESSIONAL_TOKEN,
    setProfessionalToken: value => { PROFESSIONAL_TOKEN = value || ''; },
    getProfessionalSession: () => professionalSession,
    setProfessionalSession: value => { professionalSession = value; },
    setProfessionalAgenda: value => { professionalAgenda = value || []; },
    getProfessionalUser: () => document.getElementById('proUser')?.value || '',
    getProfessionalPassword: () => document.getElementById('proPass')?.value || '',
    getProfessionalNewPassword: () => document.getElementById('proNewPass')?.value || '',
    showProfessionalApp: () => showProfessionalApp(),
    loadProfessionalAgenda: () => loadProfessionalAgenda(),
    renderProfessionalAgenda,
    logoutAdmin: () => logout(),
    initAdminUX: () => {
      initAdminUX2026();
      const dashDate = document.getElementById('dashDate');
      if (dashDate) {
        dashDate.textContent = new Date().toLocaleDateString('es-CO', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    }
  };
}

function showOnlyScreen(screenId) {
  return window.PanelSession.showOnlyScreen(screenId, _sessionBridge());
}

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

// Adaptadores de compatibilidad — Fase 4 Pagos.
async function loadOperationsData(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.loadOperationsData !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: loadOperationsData');
  }
  return await module.loadOperationsData(...args);
}

async function setupOperationsModuleUI(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.setupOperationsModuleUI !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: setupOperationsModuleUI');
  }
  return await module.setupOperationsModuleUI(...args);
}

function paymentAccountLabel(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.paymentAccountLabel !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: paymentAccountLabel');
  }
  return module.paymentAccountLabel(...args);
}

function paymentCandidateAppointments(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.paymentCandidateAppointments !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: paymentCandidateAppointments');
  }
  return module.paymentCandidateAppointments(...args);
}

function renderPaymentAppointmentList(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.renderPaymentAppointmentList !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: renderPaymentAppointmentList');
  }
  return module.renderPaymentAppointmentList(...args);
}

function selectPaymentAppointment(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.selectPaymentAppointment !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: selectPaymentAppointment');
  }
  return module.selectPaymentAppointment(...args);
}

function updateSelectedPaymentCard(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.updateSelectedPaymentCard !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: updateSelectedPaymentCard');
  }
  return module.updateSelectedPaymentCard(...args);
}

function updatePaymentProofLabel(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.updatePaymentProofLabel !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: updatePaymentProofLabel');
  }
  return module.updatePaymentProofLabel(...args);
}

function fillPaymentSelectors(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.fillPaymentSelectors !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: fillPaymentSelectors');
  }
  return module.fillPaymentSelectors(...args);
}

function prefillPaymentFromAppointment(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.prefillPaymentFromAppointment !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: prefillPaymentFromAppointment');
  }
  return module.prefillPaymentFromAppointment(...args);
}

function clearPaymentForm(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.clearPaymentForm !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: clearPaymentForm');
  }
  return module.clearPaymentForm(...args);
}

function abrirPagoCita(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.abrirPagoCita !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: abrirPagoCita');
  }
  return module.abrirPagoCita(...args);
}

async function saveManualPayment(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.saveManualPayment !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: saveManualPayment');
  }
  return await module.saveManualPayment(...args);
}

async function readPaymentProofFile(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.readPaymentProofFile !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: readPaymentProofFile');
  }
  return await module.readPaymentProofFile(...args);
}

async function verifyPayment(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.verifyPayment !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: verifyPayment');
  }
  return await module.verifyPayment(...args);
}

function renderPagos(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.renderPagos !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: renderPagos');
  }
  return module.renderPagos(...args);
}

function openPago(...args) {
  const module = window.PanelPayments;
  if (!module || typeof module.openPago !== 'function') {
    throw new Error('El módulo de Pagos no está disponible: openPago');
  }
  return module.openPago(...args);
}

function downloadOperationsCSV(filename, rows) {
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 800);
}

function exportPaymentsCSV() {
  const rows = [['ID','Código reserva','Cita','Cliente','Servicio/plan','Valor esperado','Valor recibido','Medio','Cuenta','Fecha pago','Fecha verificación','Estado','Verificó','Observaciones']];
  (operationsData.pagos || []).forEach(p => rows.push([
    p.ID, p.CodigoReserva, p.CitaID, p.Cliente, p.ServicioPlan, p.ValorEsperado, p.ValorRecibido,
    p.MedioPago, paymentAccountLabel(p.CuentaReceptora), p.FechaPago, p.FechaVerificacion, p.EstadoPago, p.UsuarioVerifico, p.Observaciones
  ]));
  downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
}

function exportOperationsAuditCSV() {
  const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
  (operationsData.auditoria || []).forEach(a => rows.push([
    a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
  ]));
  downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
  return window.PanelApi.fetchJsonWithTimeout(url, options, timeoutMs);
}

function openProfessionalLoginMode() {
  return window.PanelSession.openProfessionalLoginMode(_sessionBridge());
}

function backToAdminLogin() {
  return window.PanelSession.backToAdminLogin(_sessionBridge());
}

async function doProfessionalLogin() {
  return window.PanelSession.doProfessionalLogin(_sessionBridge());
}

async function changeProfessionalPassword() {
  return window.PanelSession.changeProfessionalPassword(_sessionBridge());
}

async function showProfessionalApp() {
  return window.PanelSession.showProfessionalApp(_sessionBridge());
}

async function loadProfessionalAgenda() {
  return window.PanelSession.loadProfessionalAgenda(_sessionBridge());
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

function professionalSignout() {
  return window.PanelSession.logoutProfessional(_sessionBridge());
}

let _submittingBooking = false;
let _submittingPatient = false;
let _loginTime = null;

// ── LOGIN ──

async function doLogin() {
  return window.PanelSession.doAdminLogin(_sessionBridge());
}

function logout() {
  return window.PanelSession.logoutAdmin(_sessionBridge());
}

// ── GUARDAS DE SESIÓN MODULARIZADAS ──
window.PanelSession.installAdminGuards(_sessionBridge());

// Auto-login si tiene sesión guardada
window.addEventListener('DOMContentLoaded', async () => {
  await window.PanelSession.restoreOnLoad(_sessionBridge());
});

async function _runUrlRepairIfRequested() {
  const params = new URLSearchParams(location.search);
  if (params.get('repair') !== 'reschedule' || !TOKEN) return;
  const nombre = params.get('nombre') || '';
  const keepFecha = params.get('keepFecha') || '';
  const keepHora = params.get('keepHora') || '';
  if (!nombre || !keepFecha || !keepHora) return;
  try {
    const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
    const result = await fetch(url).then(r => r.json());
    document.body.dataset.repairResult = JSON.stringify(result);
    if (result.ok) {
      toast(result.repaired > 0 ? `Reparación lista: ${result.repaired} cita duplicada cancelada.` : 'Revisión lista: no encontré duplicados activos.', result.repaired > 0 ? 'ok' : 'warn');
      await reload();
      initDashboard();
      renderAgenda();
      renderCalendar();
      renderCitasResumen();
      renderIngresosDetalle();
    } else {
      toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
    }
  } catch(e) {
    document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
    toast('Error ejecutando reparación de reprogramación', 'err');
  }
}

// ── PERFIL DEL ADMIN ──
function updateProfileCard() {
  const now = new Date();
  const wd  = now.getDay();
  const todayDay = now.getDate();
  const m = now.getMonth() + 1, y = now.getFullYear();

  // Semana actual (lun–dom)
  const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
  const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);

  // Semana anterior (7 días antes)
  const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
  const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);

  // Mes anterior
  const prevMDate = new Date(y, now.getMonth() - 1, 1);
  const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();

  const citas = citasReales();

  const semana = citas.filter(c => {
    if (!c.hora) return false;
    const [cy,cm,cd] = normDate(c.fecha).split('-');
    const d = new Date(+cy, +cm-1, +cd);
    return d >= startW && d <= endW;
  }).length;

  const semanaPrev = citas.filter(c => {
    const [cy,cm,cd] = normDate(c.fecha).split('-');
    const d = new Date(+cy, +cm-1, +cd);
    return d >= startPW && d <= endPW;
  }).length;

  const mes = citas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm === m && +cy === y;
  }).length;

  // Mes anterior prorateado: solo hasta el mismo día del mes para comparación justa
  const mesPrev = citas.filter(c => {
    const [cy,cm,cd] = normDate(c.fecha).split('-');
    return +cm === pm && +cy === py && +cd <= todayDay;
  }).length;

  function setDelta(el, curr, prev) {
    if (!el) return;
    const diff = curr - prev;
    el.className = 'sb-stat-delta ' + (diff > 0 ? 'up' : diff < 0 ? 'down' : 'eq');
    el.textContent = diff > 0 ? `↑${diff} vs ant.` : diff < 0 ? `↓${Math.abs(diff)} vs ant.` : '= vs ant.';
  }

  const sbW = document.getElementById('sbStSemana');
  const sbM = document.getElementById('sbStMes');

  if (sbW) sbW.textContent = semana;
  if (sbM) sbM.textContent = mes;
  setDelta(document.getElementById('sbDeltaSemana'), semana, semanaPrev);
  setDelta(document.getElementById('sbDeltaMes'), mes, mesPrev);

  // Tiempo de sesión activa
  if (_loginTime) {
    const mins = Math.round((Date.now() - _loginTime) / 60000);
    const h = Math.floor(mins / 60), rm = mins % 60;
    const label = h > 0 ? `${h}h ${rm}min` : `${mins}min`;
    const el = document.getElementById('sbSessionInfo');
    if (el) el.innerHTML = `<span class="sb-session-dot"></span> ${label}`;
  }
}

function openCambiarPassword() {
  ['pwActual','pwNueva','pwConfirmar'].forEach(id => { document.getElementById(id).value = ''; });
  const errEl = document.getElementById('pwChangeErr');
  errEl.style.display = 'none';
  document.getElementById('modalCambiarPassword').classList.add('open');
}

async function cambiarPassword() {
  const actual    = document.getElementById('pwActual').value.trim();
  const nueva     = document.getElementById('pwNueva').value.trim();
  const confirmar = document.getElementById('pwConfirmar').value.trim();
  const errEl     = document.getElementById('pwChangeErr');
  const btn       = document.getElementById('pwChangeBtn');

  errEl.style.display = 'none';
  if (!actual || !nueva || !confirmar) { errEl.textContent = 'Completa todos los campos.'; errEl.style.display = 'block'; return; }
  if (nueva.length < 8) { errEl.textContent = 'La nueva contraseña debe tener al menos 8 caracteres.'; errEl.style.display = 'block'; return; }
  if (nueva !== confirmar) { errEl.textContent = 'Las contraseñas nuevas no coinciden.'; errEl.style.display = 'block'; return; }

  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    const r = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'changePassword', token: TOKEN, currentPassword: actual, newPassword: nueva})
    }).then(x => x.json());
    if (r.ok) {
      closeModal('modalCambiarPassword');
      toast('Contraseña actualizada correctamente', 'ok');
    } else {
      errEl.textContent = r.error || 'Error al cambiar la contraseña.';
      errEl.style.display = 'block';
    }
  } catch(e) {
    errEl.textContent = 'Error de conexión. Intenta de nuevo.';
    errEl.style.display = 'block';
  }
  btn.textContent = 'Guardar'; btn.disabled = false;
}

// ── EVAL EXPRESS ──
function openEvalExpress() {
  // Token via sessionStorage, nunca en la URL (evita historial/logs)
  sessionStorage.setItem('evalToken', TOKEN);
  window.open('evaluacion-express.html', '_blank');
}

// ── SIDEBAR / NAV ──
function initAdminUX2026() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar || sidebar.dataset.uxReady) return;
  sidebar.dataset.uxReady = '1';

  // Destinos cotidianos visibles; Google Calendar queda como primera opción del menú.
  const principales = new Set(['sb-calendario','sb-dashboard','sb-tareas','sb-agenda','sb-nueva','sb-pacientes','sb-finanzas']);
  sidebar.querySelectorAll(':scope > .sb-link').forEach(link => {
    if (!principales.has(link.id) && link.id !== 'darkModeBtn' && !link.classList.contains('sb-signout')) {
      link.classList.add('sb-secondary');
    }
  });

  const finanzas = document.getElementById('sb-finanzas');
  if (finanzas && !document.getElementById('sbToolsToggle')) {
    const toggle = document.createElement('button');
    toggle.id = 'sbToolsToggle';
    toggle.type = 'button';
    toggle.className = 'sb-tools-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls','sidebar');
    toggle.innerHTML = '<span>Más herramientas</span><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    toggle.addEventListener('click', () => {
      const abierto = sidebar.classList.toggle('tools-open');
      toggle.setAttribute('aria-expanded', String(abierto));
      toggle.querySelector('span').textContent = abierto ? 'Ocultar herramientas' : 'Más herramientas';
    });
    finanzas.insertAdjacentElement('afterend', toggle);
  }

  // Contenido secundario del dashboard bajo demanda.
  const dashboard = document.getElementById('vDashboard');
  const weekCard = document.getElementById('weekGrid')?.closest('.card');
  const notesCard = document.querySelector('#vDashboard .notas-card');
  const leadsGrid = document.getElementById('leadsHoyDash')?.closest('.stats-grid');
  if (dashboard && weekCard && !document.getElementById('dashboardMore')) {
    const btn = document.createElement('button');
    btn.id = 'dashboardMore';
    btn.type = 'button';
    btn.className = 'dashboard-more-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls','dashboardSecondary');
    btn.innerHTML = 'Ver análisis y notas <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    const more = document.createElement('div');
    more.id = 'dashboardSecondary';
    more.className = 'dashboard-secondary';
    const label = document.createElement('div');
    label.className = 'dashboard-section-label';
    label.textContent = 'Análisis complementario';
    more.append(label, weekCard);
    if (notesCard) more.append(notesCard);
    if (leadsGrid) more.append(leadsGrid);
    dashboard.append(btn, more);
    btn.addEventListener('click', () => {
      const abierto = more.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(abierto));
      btn.firstChild.textContent = abierto ? 'Ocultar análisis y notas ' : 'Ver análisis y notas ';
    });
  }

  initFunctionalModules2026();

  // Accesibilidad incremental para controles existentes.
  document.querySelectorAll('svg').forEach(svg => svg.setAttribute('aria-hidden','true'));
  document.querySelectorAll('.modal,.disp-box,.pago-modal-box').forEach(modal => {
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
  });
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.replace(/\s+/g,' ').trim();
    if (!text && btn.title) btn.setAttribute('aria-label', btn.title);
  });
  document.getElementById('menuBtn')?.setAttribute('aria-label','Abrir menú principal');
  document.getElementById('mobileBottomNav')?.setAttribute('aria-label','Navegación principal móvil');
  document.querySelectorAll('.stat-card.clickable,[onclick].stat-card').forEach(card => {
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
}

function initFunctionalModules2026() {
  if (document.getElementById('vAcciones')) return;
  const sidebar = document.getElementById('sidebar');
  const toolsToggle = document.getElementById('sbToolsToggle');
  const makeLink = (id, label, icon) => {
    const b = document.createElement('button');
    b.className = 'sb-link sb-secondary'; b.id = 'sb-' + id; b.dataset.tooltip = label;
    b.innerHTML = icon + '<span>' + label + '</span>';
    b.onclick = () => showView(id);
    return b;
  };
  const iconActions = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';
  const iconWait = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a6 6 0 0 1 12 0v2"/><path d="M19 8v6M16 11h6"/></svg>';
  const iconAuto = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>';
  const accionesLink = makeLink('acciones','Centro de acciones',iconActions);
  const esperaLink = makeLink('espera','Lista de espera',iconWait);
  const autoLink = makeLink('automatizaciones','Automatizaciones',iconAuto);
  accionesLink.classList.remove('sb-secondary');
  toolsToggle.insertAdjacentElement('afterend', esperaLink);
  toolsToggle.insertAdjacentElement('afterend', autoLink);
  document.getElementById('sb-calendario').insertAdjacentElement('afterend', accionesLink);

  const main = document.getElementById('mainContent');
  const acciones = document.createElement('section');
  acciones.id = 'vAcciones'; acciones.style.display = 'none';
  acciones.innerHTML = `
    <div class="page-header"><h1 class="page-title">Centro de <em>acciones</em></h1><p class="page-sub">Pendientes priorizados a partir de citas, pagos y pacientes</p></div>
    <div class="ops-summary">
      <div class="ops-stat"><strong id="opsHoy">0</strong><span>Citas pendientes hoy</span></div>
      <div class="ops-stat"><strong id="opsCobros">0</strong><span>Cobros atrasados</span></div>
      <div class="ops-stat"><strong id="opsInactivos">0</strong><span>Pacientes inactivos</span></div>
      <div class="ops-stat"><strong id="opsDatos">0</strong><span>Fichas incompletas</span></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <div class="card-title" style="margin:0">Prioridades recomendadas</div>
      <button class="btn btn-ghost btn-sm" onclick="renderCentroAcciones()">Actualizar</button>
    </div>
    <div class="ops-list" id="opsList"></div>`;
  main.appendChild(acciones);

  const espera = document.createElement('section');
  espera.id = 'vEspera'; espera.style.display = 'none';
  espera.innerHTML = `
    <div class="page-header"><h1 class="page-title">Lista de <em>espera</em></h1><p class="page-sub">Pacientes disponibles para cubrir cancelaciones y horarios libres</p></div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title">Agregar paciente</div>
      <div class="wait-form">
        <div><label for="waitNombre">Nombre *</label><input id="waitNombre" autocomplete="off" placeholder="Nombre del paciente"></div>
        <div><label for="waitTelefono">Teléfono *</label><input id="waitTelefono" inputmode="tel" placeholder="300 000 0000"></div>
        <div><label for="waitServicio">Servicio</label><input id="waitServicio" placeholder="Descarga, valoración..."></div>
        <div><label for="waitPreferencia">Disponibilidad</label><input id="waitPreferencia" placeholder="Mañanas, martes, cualquier hora..."></div>
        <button class="btn btn-teal" onclick="addWaitPatient()">Agregar</button>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <div class="card-title" style="margin:0">Pacientes esperando <span class="chip chip-info" id="waitCount">0</span></div>
      <input id="waitSearch" oninput="renderWaitList()" placeholder="Buscar..." style="background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:8px 12px;font-family:var(--font-b)">
    </div>
    <div class="ops-list" id="waitList"></div>`;
  main.appendChild(espera);

  const auto = document.createElement('section');
  auto.id = 'vAutomatizaciones'; auto.style.display = 'none';
  const toggleDefs = [
    ['emailReminders','Recordatorios de citas','Correos diarios para citas de hoy y mañana'],
    ['whatsappQueue','Cola de WhatsApp','Prepara mensajes con envío en un clic'],
    ['followups','Seguimiento posconsulta','Contacta 1–2 días después de la sesión'],
    ['inactivePatients','Reactivación de pacientes','Detecta y contacta pacientes inactivos'],
    ['paymentAlerts','Alertas de cobro','Resumen diario de pagos pendientes'],
    ['dataQuality','Calidad de datos','Alerta sobre fichas incompletas'],
    ['weeklyReport','Reporte semanal','Envía resultados cada lunes'],
    ['backups','Copias de seguridad','Crea un respaldo semanal en Drive'],
    ['kpiSnapshots','Historial de indicadores','Guarda el cierre mensual automáticamente'],
    ['waitlistMatching','Lista de espera automática','Sugiere pacientes cuando se cancela una cita']
  ];
  auto.innerHTML = `<div class="page-header"><h1 class="page-title"><em>Automatizaciones</em></h1><p class="page-sub">Control central de tareas programadas, mensajes y respaldos</p></div>
    <div class="auto-status"><span class="auto-dot" id="autoStatusDot"></span><div style="flex:1"><strong id="autoStatusTitle">Consultando estado...</strong><div style="font-size:.75rem;color:var(--muted);margin-top:2px" id="autoStatusSub"></div></div><button class="btn btn-teal btn-sm" onclick="setupAutomations()">Activar programación</button></div>
    <div class="card" style="margin-bottom:18px"><div class="card-title">Qué debe ejecutar el sistema</div><div class="auto-grid">${toggleDefs.map(d=>`<div class="auto-toggle"><div class="auto-toggle-copy"><strong>${d[1]}</strong><span>${d[2]}</span></div><label class="switch"><input type="checkbox" data-auto-key="${d[0]}" onchange="saveAutomationSettings()"><span class="switch-slider"></span></label></div>`).join('')}</div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px"><button class="btn btn-teal" onclick="runAutomationJob('morning')">Ejecutar tareas diarias</button><button class="btn btn-ghost" onclick="runAutomationJob('weekly')">Generar reporte semanal</button><button class="btn btn-ghost" onclick="runAutomationJob('backup')">Crear respaldo ahora</button><button class="btn btn-ghost" onclick="loadAutomationCenter()">Actualizar estado</button></div>
    <div style="display:grid;grid-template-columns:1.2fr .8fr;gap:18px" class="auto-panels"><div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px"><div class="card-title" style="margin:0">Mensajes pendientes</div><span class="chip chip-warn" id="autoQueueCount">0</span></div><div id="autoQueue"><div class="loading-wrap"><div class="spinner"></div></div></div></div><div class="card"><div class="card-title">Actividad reciente</div><div id="autoLogs"></div></div></div>`;
  main.appendChild(auto);
  initKPIExplorer();
}

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

async function loadKPIHistoryFromServer() {
  try {
    const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
    if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
  } catch(e) {}
}

function _formatKPIValue(v,type) {
  if (v === null || v === undefined || Number.isNaN(v)) return 'Sin datos';
  if (type === 'money') return fmtPeso(Math.round(v));
  if (type === 'pct') return Math.round(v) + '%';
  return Math.round(v).toLocaleString('es-CO');
}

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

function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}


function currentAdminRoleKey() {
  return String(currentAdminUser?.rol || 'Superadministradora').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}
function isAuxAdmin() { return currentAdminRoleKey().includes('aux'); }
function applyRoleRestrictions() {
  // Auxiliar operativo: acceso completo. Exclusivos de propietaria se bloquean en backend.
}
function showView(v) {
  return window.PanelNavigation.showView(v);
}

// ── CENTRO DE ACCIONES ──
function _daysSince(dateStr) {
  const normalized = normDate(dateStr);
  if (!normalized) return 0;
  const d = new Date(normalized + 'T12:00:00');
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function _actionIcon(type) {
  const icons = {
    cita:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pago:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    paciente:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>',
    datos:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/></svg>'
  };
  return icons[type] || icons.paciente;
}

function _opsItem({level='normal',type='paciente',title,sub,actions=''}) {
  return `<div class="ops-item" data-level="${level}"><div class="ops-icon">${_actionIcon(type)}</div><div class="ops-copy"><div class="ops-title">${title}</div><div class="ops-sub">${sub}</div></div><div class="ops-actions">${actions}</div></div>`;
}

function renderCentroAcciones() {
  const list = document.getElementById('opsList');
  if (!list) return;
  const hoy = today();
  const citas = (allData.citas || []).filter(c => !esRegistroServ(c.servicio));
  const citasOperativas = citas.filter(c => isOperationalDate(c.fecha));
  const citasHoy = citasOperativas.filter(c => normDate(c.fecha) === hoy && c.estado !== 'Cancelada' && c.estado !== 'Atendida');
  const cobros = citasOperativas.filter(c => normDate(c.fecha) < hoy && c.estado !== 'Cancelada' && !isPagada(c.id));

  const pacientesMap = new Map();
  citasOperativas.filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) <= hoy).forEach(c => {
    const key = _normStr(c.nombre);
    if (!key) return;
    const prev = pacientesMap.get(key);
    if (!prev || normDate(c.fecha) > normDate(prev.fecha)) pacientesMap.set(key, c);
  });
  const inactivos = [...pacientesMap.values()].filter(c => _daysSince(c.fecha) >= 60);

  const fuentePacientes = [...pacientesMap.values()];
  const vistos = new Set();
  const incompletos = fuentePacientes.filter(p => {
    const key = _normStr(p.nombre); if (!key || vistos.has(key)) return false; vistos.add(key);
    return !(p.telefono || '').trim() || !(p.email || '').trim();
  });

  document.getElementById('opsHoy').textContent = citasHoy.length;
  document.getElementById('opsCobros').textContent = cobros.length;
  document.getElementById('opsInactivos').textContent = inactivos.length;
  document.getElementById('opsDatos').textContent = incompletos.length;

  const items = [];
  citasHoy.slice(0,6).forEach(c => items.push(_opsItem({
    level:'normal',type:'cita',title:`Confirmar cita de ${esc(c.nombre)}`,
    sub:`Hoy ${esc(c.hora || '')} · ${esc(c.servicio || 'Servicio')}`,
    actions:`<button class="btn btn-ghost btn-sm" onclick="goAgendaPatient('${encodeURIComponent(c.nombre||'')}')">Ver cita</button>`
  })));
  cobros.slice(0,6).forEach(c => items.push(_opsItem({
    level:'high',type:'pago',title:`Cobro pendiente · ${esc(c.nombre)}`,
    sub:`${esc(c.fecha || '')} · ${esc(c.precio || 'Valor sin registrar')}`,
    actions:`<button class="btn btn-ghost btn-sm" onclick="goAgendaPatient('${encodeURIComponent(c.nombre||'')}')">Registrar pago</button>`
  })));
  inactivos.slice(0,6).forEach(c => {
    const phone = String(c.telefono||'').replace(/\D/g,'');
    const wa = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(`Hola ${c.nombre}, ¿cómo has estado desde tu última sesión? Tenemos horarios disponibles si deseas continuar tu proceso.`)}` : '';
    items.push(_opsItem({level:'medium',type:'paciente',title:`Reactivar a ${esc(c.nombre)}`,
      sub:`${_daysSince(c.fecha)} días sin sesión · última: ${esc(c.servicio||'—')}`,
      actions: wa ? `<a class="btn btn-wa btn-sm" href="${wa}" target="_blank" rel="noopener">Enviar WhatsApp</a>` : `<button class="btn btn-ghost btn-sm" onclick="showView('pacientes')">Ver ficha</button>`}));
  });
  incompletos.slice(0,5).forEach(p => {
    const faltan = [!(p.telefono||'').trim()?'teléfono':'', !(p.email||'').trim()?'email':''].filter(Boolean).join(' y ');
    items.push(_opsItem({level:'medium',type:'datos',title:`Completar ficha de ${esc(p.nombre||'Paciente')}`,
      sub:`Falta ${faltan}`,
      actions:`<button class="btn btn-ghost btn-sm" onclick="showView('basedatos')">Completar datos</button>`}));
  });
  list.innerHTML = items.length ? items.join('') : '<div class="empty-compact">No hay pendientes prioritarios. Todo está al día.</div>';
}
```

### pasaporteLink — línea 8617

```javascript
function pasaporteLink(nombre) {
  return PASAPORTE_BASE;
}
```

### pasaporteLinkAdmin — línea 8621

```javascript
function pasaporteLinkAdmin(nombre) {
  return PASAPORTE_BASE;
}
```

### waBtnPasaporte — línea 8625

```javascript
function waBtnPasaporte(tel, nombre) {
  const safeName = String(nombre || '').replace(/'/g, "\\'");
  return '<button type="button" class="btn btn-passport btn-sm" onclick="openPassportModuleFor(\'' + safeName + '\')" title="Generar enlace seguro">Pasaporte</button>';
}
```

### openPassportModuleFor — línea 8630

```javascript
function openPassportModuleFor(nombre) {
  showView('pasaporte');
  setTimeout(function() {
    const input = document.getElementById('pasNombreInput');
    if (!input) return;
    input.value = nombre || '';
    onPasInput(input.value);
    toast('Selecciona el paciente en la lista para generar su enlace seguro.', 'info');
  }, 80);
}
```

### renderSmartBriefing — línea 8807

```javascript
function renderSmartBriefing() {
  const box = document.getElementById('smartBriefing');
  if (!box) return;
  const d = smartBriefingData();
  const actions = [
    d.cobrosVencidos.length ? {
      tone:'danger', icon:'$', title:`${d.cobrosVencidos.length} cobro(s) vencido(s)`,
      desc:`Prioridad alta: ${smartPeso(d.totalVencido)} de citas ya realizadas.`,
      click:"smartAgendaFilter('vencidos')"
    } : {
      tone:'ok', icon:'✓', title:'Cobros vencidos al día',
      desc:'No aparecen sesiones pasadas sin pago registrado.',
      click:"showView('finanzas')"
    },
    d.pendientesConfirmar.length ? {
      tone:'warn', icon:'!', title:`${d.pendientesConfirmar.length} por confirmar`,
      desc:'Conviene enviar WhatsApp antes de que se vuelvan huecos en agenda.',
      click:"smartAgendaFilter('pendientes')"
    } : {
      tone:'ok', icon:'✓', title:'Agenda confirmada',
      desc:'No hay citas futuras marcadas como pendientes.',
      click:"smartAgendaFilter('semana')"
    },
    {
      tone:d.porCobrarSemana.length ? 'info' : 'ok', icon:'$',
      title:d.porCobrarSemana.length ? `${smartPeso(d.totalSemana)} por cobrar esta semana` : 'Semana sin cobros futuros',
      desc:d.porCobrarSemana.length ? `${d.porCobrarSemana.length} cita(s) próximas sin pago marcado.` : 'Los próximos pagos de la semana están controlados.',
      click:"_verCobrosPendientesSemana()"
    },
    d.pacientesSinProxima.length ? {
      tone:'warn', icon:'↺', title:`${d.pacientesSinProxima.length} paciente(s) sin próxima cita`,
      desc:'Pacientes con más de 30 días desde la última sesión.',
      click:"showView('tareas')"
    } : {
      tone:'ok', icon:'↺', title:'Seguimiento sano',
      desc:'No se detectan pacientes antiguos sin próxima cita urgente.',
      click:"showView('pacientes')"
    }
  ];
  box.style.display = 'block';
  box.innerHTML = `
    <div class="smart-brief-head">
      <div>
        <div class="smart-eyebrow">Asistente operativo</div>
        <div class="smart-title">Qué atender primero hoy</div>
        <div class="smart-sub">${d.citasHoy.length} cita(s) hoy · semana al ${d.pctSesiones}% de la meta de sesiones</div>
      </div>
      <div class="smart-score"><strong>${d.score}</strong><span>salud del día</span></div>
    </div>
    <div class="smart-actions-grid">
      ${actions.map(a => `
        <button type="button" class="smart-action ${a.tone}" onclick="${a.click}">
          <span class="smart-icon">${a.icon}</span>
          <span>
            <span class="smart-action-title">${esc(a.title)}</span>
            <span class="smart-action-desc">${esc(a.desc)}</span>
          </span>
        </button>`).join('')}
    </div>`;
}
```

### renderAgenda — línea 9194

```javascript
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
```

### verDetalle — línea 9443

```javascript
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
```

### renderPacientes — línea 10818

```javascript
function renderPacientes() {
  const search = (document.getElementById('pSearch').value||'').toLowerCase();
  const map = {};

  // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
  (allData.pacientes || []).forEach(p => {
    const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
    const email  = (p.email || '').toLowerCase().trim();
    const nombre = (p.nombre || '').trim();
    const key    = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());
    if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
  });

  allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
    const phone  = (c.telefono||'').replace(/\D/g,'').slice(-10);
    const email  = (c.email||'').toLowerCase().trim();
    const nombre = (c.nombre||'').trim();
    // Agrupa por: teléfono (10 dígitos) > email > nombre — evita duplicados
    const key = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());

    if (!map[key]) map[key] = {nombre, telefono:'', email:'', sesiones:0, ultima:'', ultimoServicio:'', servicios:{}, nombres:[]};
    if (!map[key].nombres.includes(nombre)) map[key].nombres.push(nombre);
    if (phone.length >= 10 && !map[key].telefono) map[key].telefono = phone;
    if (email && !map[key].email) map[key].email = email;
    map[key].sesiones++;
    if (normDate(c.fecha) > normDate(map[key].ultima)) {
      map[key].ultima = normDate(c.fecha);
      map[key].ultimoServicio = c.servicio;
      map[key].nombre = nombre; // usar el nombre más reciente
    }
    map[key].servicios[c.servicio] = (map[key].servicios[c.servicio]||0)+1;
  });

  _pacs = Object.values(map);
  let pacs = _pacs;
  if (search) pacs = pacs.filter(p => (p.nombre+(p.telefono||'')+(p.email||'')).toLowerCase().includes(search));
  pacs.sort((a,b) => b.sesiones - a.sesiones);

  const tbody = document.getElementById('pacientesTbody');
  if (!pacs.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><p>No hay pacientes registrados</p></div></td></tr>';
    return;
  }

  tbody.innerHTML = pacs.map((p, i) => {
    const topServ  = Object.entries(p.servicios).sort((a,b)=>b[1]-a[1])[0]||['—',0];
    const initials = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
    const idx      = _pacs.indexOf(p); // índice real en _pacs
    const _dias = p.ultima ? Math.floor((new Date()-new Date(p.ultima+'T00:00:00'))/86400000) : null;
    const _ultimaHtml = fmtDate(p.ultima) + (_dias !== null
      ? `<br><span style="font-size:.7rem;color:${_dias>30?'var(--warn)':'var(--muted)'}">hace ${_dias} días</span>`
      : '');
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px"><div class="pac-badge">${esc(initials)}</div><strong>${esc(p.nombre)}</strong></div></td>
      <td style="font-family:var(--font-m);font-size:.82rem">${esc(p.telefono||'—')}</td>
      <td style="font-size:.82rem;color:var(--muted)">${esc(p.email||'—')}</td>
      <td><span class="chip chip-ok">${p.sesiones}</span></td>
      <td style="font-size:.82rem">${_ultimaHtml}</td>
      <td style="font-size:.82rem;color:var(--muted)">${esc(topServ[0])}</td>
      <td>
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="verHistorialPac(${idx})">Historial</button>
          ${waBtn(p.telefono,p.nombre,'','','','WA')}
          <button class="btn btn-ghost btn-sm" onclick="seguimientoWA('${p.telefono||''}','${p.nombre.replace(/'/g,"\\'")}','${(p.ultimoServicio||'').replace(/'/g,"\\'")}')">💬</button>
          ${(()=>{const u=waEncuesta(p.telefono,p.nombre);return u?`<a href="${u}" target="_blank" class="btn btn-ghost btn-sm" title="Enviar encuesta de satisfacción por WhatsApp">\u2B50 Encuesta</a>`:''})()}
          <button type="button" class="btn btn-passport btn-sm" onclick="openPassportModuleFor('${p.nombre.replace(/'/g,"\\'")}')">Pasaporte</button>
          <button class="btn btn-edit btn-sm" onclick="editarPacienteIdx(${idx})">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="borrarPaciente(${idx})">🗑️ Eliminar</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}
```

### exportarHistorialPaciente — línea 10927

```javascript
function exportarHistorialPaciente(nombre) {
  const citas = allData.citas.filter(c => c.nombre === nombre)
    .sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  if (!citas.length) { toast('Sin citas para exportar', 'err'); return; }
  const header = ['Fecha','Hora','Servicio','Modalidad','Valor','Estado','Notas'];
  const rows = citas.map(c => [normDate(c.fecha),c.hora,c.servicio,c.modalidad,c.precio||'',c.estado,c.notas||'']);
  const csv = [header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'historial_'+nombre.replace(/\s+/g,'_')+'_'+today()+'.csv';
  a.click(); URL.revokeObjectURL(a.href);
  toast('Historial exportado: '+citas.length+' cita(s)');
}

// ── EDITAR / BORRAR PACIENTE ──
function editarPacienteIdx(idx) {
  const p = _pacs[idx];
  if (!p) return;
  document.getElementById('epOldNombre').value = JSON.stringify(p.nombres); // guarda TODOS los nombres
  document.getElementById('epNombre').value    = p.nombre;
  document.getElementById('epTelefono').value  = p.telefono || '';
  document.getElementById('epEmail').value     = p.email    || '';
  openModal('modalEditarPaciente');
}
function editarPaciente(nombre, telefono, email) { // compatibilidad legacy
  document.getElementById('epOldNombre').value = JSON.stringify([nombre]);
  document.getElementById('epNombre').value    = nombre;
  document.getElementById('epTelefono').value  = telefono;
  document.getElementById('epEmail').value     = email;
  openModal('modalEditarPaciente');
}

async function guardarPaciente() {
  const oldNombresRaw = document.getElementById('epOldNombre').value;
  const newNombre     = document.getElementById('epNombre').value.trim();
  const telefono      = document.getElementById('epTelefono').value.trim();
  const email         = document.getElementById('epEmail').value.trim();
  if (!newNombre) { toast('El nombre no puede estar vacío', 'err'); return; }
  const btn = document.getElementById('epSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    let oldNombres = [];
    try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
    let totalActualizado = 0;
    for (const oldNombre of oldNombres) {
      const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
      const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
      const d = await r.json();
      if (d.ok) totalActualizado += d.updated || 0;
    }
    // Actualizar en memoria
    allData.citas.forEach(c => {
      if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g,''); c.email = email; }
    });
    toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
    closeModal('modalEditarPaciente');
    renderPacientes();
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

async function borrarPaciente(idx) {
  const p = _pacs[idx];
  if (!p) return;
  if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
  try {
    // Borrar todos los nombres que usó este paciente
    for (const nombre of p.nombres) {
      await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
    }
    allData.citas = allData.citas.filter(c => !p.nombres.includes(c.nombre));
    toast(`${p.nombre} eliminado/a correctamente`);
    renderPacientes();
    initDashboard();
  } catch(e) { toast('Error de conexión', 'err'); }
}

// ── BASE DE DATOS ──
let _dbPacs = [];

function initFormDB() {
  // noop — form fields start empty, no defaults needed
}

function renderBasedatos() {
  const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
  const map = {};
  // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
  (allData.pacientes || []).forEach(function(p) {
    const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
    const email  = (p.email || '').toLowerCase().trim();
    const nombre = (p.nombre || '').trim();
    const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
    if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
  });
  // Luego cruzar con citas (actualizan datos si el paciente ya existe)
  (allData.citas || []).forEach(function(c) {
    const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
    const email  = (c.email || '').toLowerCase().trim();
    const nombre = (c.nombre || '').trim();
    const key = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
    if (!map[key]) map[key] = {nombre: nombre, telefono: '', email: '', sesiones: 0, ultima: '', ultimoServicio: '', servicios: {}, nombres: []};
    if (map[key].nombres.indexOf(nombre) === -1) map[key].nombres.push(nombre);
    if (phone.length >= 10 && !map[key].telefono) map[key].telefono = phone;
    if (email && !map[key].email) map[key].email = email;
    map[key].sesiones++;
    if (normDate(c.fecha) > normDate(map[key].ultima)) {
      map[key].ultima = normDate(c.fecha);
      map[key].ultimoServicio = c.servicio;
      map[key].nombre = nombre;
    }
    map[key].servicios[c.servicio] = (map[key].servicios[c.servicio] || 0) + 1;
  });

  _dbPacs = Object.values(map);
  let pacs = _dbPacs;
  if (search) pacs = pacs.filter(function(p) {
    return (p.nombre + (p.telefono || '') + (p.email || '')).toLowerCase().indexOf(search) !== -1;
  });
  pacs.sort(function(a, b) { return b.sesiones - a.sesiones; });

  const tbody = document.getElementById('dbTbody');
  if (!tbody) return;
  if (!pacs.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><p>No hay pacientes registrados</p></div></td></tr>';
    return;
  }
  tbody.innerHTML = pacs.map(function(p) {
    const idx      = _dbPacs.indexOf(p);
    const topServ  = Object.entries(p.servicios).sort(function(a,b){return b[1]-a[1];})[0] || ['—', 0];
    const initials = p.nombre.split(' ').map(function(x){return x[0]||'';}).join('').toUpperCase().slice(0, 2);
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:10px"><div class="pac-badge">' + initials + '</div><strong>' + p.nombre + '</strong></div></td>' +
      '<td style="font-family:var(--font-m);font-size:.82rem">' + (p.telefono || '—') + '</td>' +
      '<td style="font-size:.82rem;color:var(--muted)">' + (p.email || '—') + '</td>' +
      '<td><span class="chip chip-ok">' + p.sesiones + '</span></td>' +
      '<td style="font-size:.82rem">' + fmtDate(p.ultima) + '</td>' +
      '<td style="font-size:.82rem;color:var(--muted)">' + topServ[0] + '</td>' +
      '<td style="font-size:.8rem;color:var(--muted)">' + (p.origen || '—') + '</td>' +
      '<td><div style="display:flex;gap:5px;flex-wrap:wrap">' +
        waBtn(p.telefono, p.nombre, '', '', '', 'WA') +
        '<button type="button" class="btn btn-edit btn-sm" onclick="dbEditarPac(' + idx + ')">✏️ Editar</button>' +
        '<button type="button" class="btn btn-danger btn-sm" onclick="dbBorrarPac(' + idx + ')">🗑️</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
}

function renderReactivacion() {
  const el = document.getElementById('reactivacionResult');
  if (!el) return;

  const dias   = parseInt(document.getElementById('reacDias')?.value || '90', 10);
  const hoy    = today(); // "YYYY-MM-DD"
  const limite = new Date(); limite.setDate(limite.getDate() - dias);
  const limiteStr = limite.toLocalDateStr();

  // Agrupar citas por paciente (clave por teléfono o nombre)
  const map = {};
  (allData.citas || []).forEach(c => {
    if (!c.nombre) return;
    const phone = (c.telefono || '').replace(/\D/g, '').slice(-10);
    const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + c.nombre.toLowerCase().trim();
    if (!map[key]) map[key] = { nombre: c.nombre, telefono: phone, ultimaPasada: '', proximaFutura: '' };
    const fd = normDate(c.fecha);
    if (fd && fd <= hoy) {
      if (!map[key].ultimaPasada || fd > map[key].ultimaPasada) map[key].ultimaPasada = fd;
    }
    if (fd && fd > hoy) {
      if (!map[key].proximaFutura || fd < map[key].proximaFutura) map[key].proximaFutura = fd;
    }
  });

  // Enriquecer con hoja Pacientes (teléfono puede estar ahí)
  (allData.pacientes || []).forEach(p => {
    const phone = (p.telefono || '').replace(/\D/g, '').slice(-10);
    const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + (p.nombre||'').toLowerCase().trim();
    if (map[key] && phone) map[key].telefono = phone;
  });

  // Filtrar: tuvieron cita pasada, esa cita fue hace más de `dias` días, y NO tienen cita futura
  const inactivos = Object.values(map).filter(p =>
    p.ultimaPasada && p.ultimaPasada < limiteStr && !p.proximaFutura
  ).sort((a, b) => a.ultimaPasada.localeCompare(b.ultimaPasada)); // más antiguos primero

  if (!inactivos.length) {
    el.innerHTML = `<div style="padding:18px;text-align:center;color:var(--ok);font-size:.9rem">🟢 ¡Bien! Todos tus pacientes estuvieron activos en los últimos ${dias} días o tienen cita agendada.</div>`;
    return;
  }

  // Calcular días de inactividad
  const diffDias = fecha => {
    const d = new Date(hoy + 'T12:00:00') - new Date(fecha + 'T12:00:00');
    return Math.floor(d / 86400000);
  };

  const chipColor = d => d >= 365 ? '#ef4444' : d >= 180 ? '#f59e0b' : 'var(--primary)';

  // Mensajes de reactivación por estilo
  const REAC_MSGS = {
    calido: (n) =>
      `Hola ${n}! 👋\nHace tiempo no nos visitás y nos encantaría verte de nuevo.\n\n¿Cómo te has sentido? Si querés retomar tus sesiones, estamos disponibles para agendarte 🙌\n\nEscríbenos cuando quieras 😊`,
    motivacional: (n) =>
      `Hola ${n}! 💪\nTu cuerpo lo nota cuando falta la descarga — el estrés acumulado no desaparece solo.\n\nLlevás un tiempo sin sesión y este es el momento perfecto para retomar. No esperes a que el cuerpo te lo exija.\n\n¿Cuándo te agendamos? 🙌`,
    resultado: (n) =>
      `Hola ${n}! 🌿\n¿Recordás cómo te sentías después de tus sesiones? Ese alivio, esa ligereza, ese "volvería mañana"...\n\nEso te espera. Llevás un tiempo sin venir y queremos que retomes tu bienestar.\n\n¿Agendamos esta semana? 😊`,
    espacio: (n) =>
      `Hola ${n}! 🗓️\nTenemos un espacio disponible esta semana y pensamos en vos.\n\nHace tiempo no te vemos — ¿qué tal si retomamos? Escríbenos y te buscamos el mejor horario 🙌`,
  };

  const waReacUrl = (tel, nombre, tipo) => {
    if (!tel || tel.length < 7) return null;
    const phone   = tel.length <= 10 ? '57' + tel : tel;
    const primero = nombre.split(' ')[0];
    const msg     = (REAC_MSGS[tipo] || REAC_MSGS.calido)(primero);
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  let html = `
    <div style="margin-bottom:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <div style="font-size:.82rem;color:var(--muted)">${inactivos.length} paciente${inactivos.length>1?'s':''} inactivo${inactivos.length>1?'s':''}</div>
      <div style="font-size:.75rem;padding:3px 10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:20px;color:#dc2626">${inactivos.filter(p=>diffDias(p.ultimaPasada)>=365).length} sin venir hace 1+ año</div>
      <div style="font-size:.75rem;padding:3px 10px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:20px;color:#b45309">${inactivos.filter(p=>diffDias(p.ultimaPasada)>=180&&diffDias(p.ultimaPasada)<365).length} entre 6m–1 año</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">`;

  inactivos.forEach((p, i) => {
    const d      = diffDias(p.ultimaPasada);
    const color  = chipColor(d);
    const hasTel = p.telefono && p.telefono.length >= 7;
    const dLabel = d >= 365
      ? `${Math.floor(d/365)} año${Math.floor(d/365)>1?'s':''} ${d%365>0?Math.floor((d%365)/30)+'m':''}`
      : d >= 30 ? `${Math.floor(d/30)} mes${Math.floor(d/30)>1?'es':''}` : `${d} días`;

    const selectId = `reacMsg_${i}`;
    const btnId    = `reacBtn_${i}`;
    const telEnc   = encodeURIComponent(p.telefono || '');
    const nomEnc   = encodeURIComponent(p.nombre);

    html += `
      <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="display:grid;grid-template-columns:1fr auto;align-items:start;gap:10px;margin-bottom:${hasTel?'10px':'0'}">
          <div>
            <div style="font-size:.88rem;font-weight:600">${p.nombre}</div>
            <div style="font-size:.73rem;color:var(--muted);margin-top:2px">
              Última visita: ${fmtDate(p.ultimaPasada)}${p.telefono ? ` · 📞 ${p.telefono}` : ''}
            </div>
          </div>
          <div style="font-size:.75rem;font-family:var(--font-m);color:${color};white-space:nowrap;text-align:right">
            Inactivo hace<br><strong>${dLabel}</strong>
          </div>
        </div>
        ${hasTel ? `
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <select id="${selectId}" onchange="_updateReacBtn('${selectId}','${btnId}','${telEnc}','${nomEnc}')"
            style="flex:1;min-width:180px;font-size:.75rem;padding:5px 8px;background:var(--s1);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
            <option value="calido">😊 Cálido — "hace tiempo no nos visitás..."</option>
            <option value="motivacional">💪 Motivacional — "tu cuerpo lo nota cuando falta..."</option>
            <option value="resultado">🌿 Resultado — "¿recordás cómo te sentías después?"</option>
            <option value="espacio">🗓️ Espacio disponible — "tenemos un espacio esta semana..."</option>
          </select>
          <a id="${btnId}" href="${waReacUrl(p.telefono, p.nombre, 'calido')}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>
          <button class="btn btn-teal btn-sm" onclick="agendarDesdePaciente('${nomEnc}','${p.telefono}','')">Agendar</button>
        </div>` : '<span style="font-size:.72rem;color:var(--muted)">Sin teléfono registrado</span>'}
      </div>`;
  });

  html += `</div>`;
  el.innerHTML = html;
}

function _updateReacBtn(selectId, btnId, telEnc, nomEnc) {
  const sel  = document.getElementById(selectId);
  const btn  = document.getElementById(btnId);
  if (!sel || !btn) return;
  const tipo    = sel.value;
  const tel     = decodeURIComponent(telEnc);
  const nombre  = decodeURIComponent(nomEnc);
  const primero = nombre.split(' ')[0];
  const MSGS = {
    calido:       `Hola ${primero}! 👋\nHace tiempo no nos visitás y nos encantaría verte de nuevo.\n\n¿Cómo te has sentido? Si querés retomar tus sesiones, estamos disponibles para agendarte 🙌\n\nEscríbenos cuando quieras 😊`,
    motivacional: `Hola ${primero}! 💪\nTu cuerpo lo nota cuando falta la descarga — el estrés acumulado no desaparece solo.\n\nLlevás un tiempo sin sesión y este es el momento perfecto para retomar. No esperes a que el cuerpo te lo exija.\n\n¿Cuándo te agendamos? 🙌`,
    resultado:    `Hola ${primero}! 🌿\n¿Recordás cómo te sentías después de tus sesiones? Ese alivio, esa ligereza, ese "volvería mañana"...\n\nEso te espera. Llevás un tiempo sin venir y queremos que retomes tu bienestar.\n\n¿Agendamos esta semana? 😊`,
    espacio:      `Hola ${primero}! 🗓️\nTenemos un espacio disponible esta semana y pensamos en vos.\n\nHace tiempo no te vemos — ¿qué tal si retomamos? Escríbenos y te buscamos el mejor horario 🙌`,
  };
  const phone = tel.length <= 10 ? '57' + tel : tel;
  btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(MSGS[tipo] || MSGS.calido)}`;
}

function dbEditarPac(idx) {
  const p = _dbPacs[idx];
  if (!p) return;
  document.getElementById('epOldNombre').value  = JSON.stringify(p.nombres);
  document.getElementById('epNombre').value     = p.nombre;
  document.getElementById('epTelefono').value   = p.telefono || '';
  document.getElementById('epEmail').value      = p.email || '';
  document.getElementById('epSaveBtn').setAttribute('onclick', 'guardarPacienteDB()');
  openModal('modalEditarPaciente');
}

async function guardarPacienteDB() {
  const oldNombresRaw = document.getElementById('epOldNombre').value;
  const newNombre     = document.getElementById('epNombre').value.trim();
  const telefono      = document.getElementById('epTelefono').value.trim();
  const email         = document.getElementById('epEmail').value.trim();
  if (!newNombre) { toast('El nombre no puede estar vacío', 'err'); return; }
  if (telefono && telefono.replace(/\D/g, '').length < 10) {
    toast('El teléfono debe tener al menos 10 dígitos', 'err');
    return;
  }
  const btn = document.getElementById('epSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    let oldNombres = [];
    try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
    let totalActualizado = 0;
    for (const oldNombre of oldNombres) {
      const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
      const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
      const d = await r.json();
      if (d.ok) totalActualizado += d.updated || 0;
    }
    allData.citas.forEach(c => {
      if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g, ''); c.email = email; }
    });
    const oldLabel = oldNombres.join(' / ');
    logChange('Paciente editado', oldLabel !== newNombre ? `${oldLabel} → ${newNombre}` : `${newNombre} (datos actualizados)`);
    toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
    closeModal('modalEditarPaciente');
    renderBasedatos();
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

async function dbBorrarPac(idx) {
  const p = _dbPacs[idx];
  if (!p) return;
  if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
  try {
    for (const nombre of p.nombres) {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
      const d = await r.json();
      if (!d.ok) { toast('Error al eliminar: ' + (d.error || 'intenta de nuevo'), 'err'); return; }
    }
    allData.citas    = allData.citas.filter(c => !p.nombres.includes(c.nombre));
    allData.pacientes = (allData.pacientes || []).filter(p2 => !p.nombres.map(n => n.toLowerCase()).includes((p2.nombre||'').toLowerCase()));
    logChange('Paciente eliminado', `${p.nombre} · ${p.sesiones} cita(s)`);
    toast(`${p.nombre} eliminado/a correctamente`);
    renderBasedatos();
    initDashboard();
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function agregarPacienteDB() {
  if (_submittingPatient) return;
  const nombre   = document.getElementById('dbNombre').value.trim();
  const telefono = document.getElementById('dbTelefono').value.trim();
  const email    = document.getElementById('dbEmail').value.trim();
  const entidad  = document.getElementById('dbEntidad').value.trim();
  const deporte  = document.getElementById('dbDeporte').value.trim();
  const notas    = document.getElementById('dbNotas').value.trim();

  if (!nombre) { toast('El nombre es obligatorio', 'err'); return; }
  if (telefono && telefono.replace(/\D/g, '').length < 10) {
    toast('El teléfono debe tener al menos 10 dígitos', 'err');
    return;
  }

  _submittingPatient = true;
  const btn = document.getElementById('dbSubmitBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;

  // Construir notas completas con entidad y deporte
  const partes = [];
  if (entidad) partes.push('Entidad: ' + entidad);
  if (deporte) partes.push('Deporte/actividad: ' + deporte);
  if (notas)   partes.push(notas);
  const notasFinal = partes.join(' | ');

  const data = {
    name: nombre, phone: telefono, email: email,
    service: 'Registro', modality: 'Presencial',
    date: today(), time: '09:00',
    priceP: 'A convenir', priceD: 'A convenir',
    address: '', notes: notasFinal
  };

  const esReferido = document.getElementById('dbOrigen').value === 'Referido';
  const referidoPor = esReferido ? (document.getElementById('dbReferidoPor').value.trim()) : '';

  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
    const d = await r.json();
    if (d.ok) {
      logChange('Paciente agregado', nombre + (telefono ? ` · ${telefono}` : ''));
      await reload();
      renderBasedatos();
      initDashboard();

      // Si es referido, generar y registrar código REF
      if (esReferido) {
        try {
          const rg = await fetch(`${APPS_SCRIPT_URL}?action=generarCodigo&token=${encodeURIComponent(TOKEN)}&tipo=REF`);
          const dg = await rg.json();
          if (dg.ok) {
            const codData = { codigo: dg.codigo, tipo: 'REF', paciente: nombre, telefono, referidoPor };
            await fetch(`${APPS_SCRIPT_URL}?action=registrarCodigo&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(codData))}`);
            // Mostrar banner con el código
            document.getElementById('dbCodigoValor').textContent = dg.codigo;
            document.getElementById('dbCodigoResult').style.display = 'block';
            // Limpiar solo campos del paciente, dejar el banner visible
            document.getElementById('dbNombre').value   = '';
            document.getElementById('dbTelefono').value = '';
            document.getElementById('dbEmail').value    = '';
            document.getElementById('dbEntidad').value  = '';
            document.getElementById('dbDeporte').value  = '';
            document.getElementById('dbNotas').value    = '';
            document.getElementById('dbReferidoPor').value = '';
            toast(`${nombre} agregado/a · Código ${dg.codigo} generado ✓`);
            await reload();
          } else { toast(`${nombre} agregado/a correctamente`); limpiarFormDB(); }
        } catch(ex) { toast(`${nombre} agregado/a correctamente`); limpiarFormDB(); }
      } else {
        toast(`${nombre} agregado/a correctamente`);
        limpiarFormDB();
      }
    } else {
      toast('Error: ' + (d.error || ''), 'err');
    }
  } catch(e) { toast('Error de conexión', 'err'); }
  finally {
    _submittingPatient = false;
    btn.textContent = 'Agregar paciente'; btn.disabled = false;
  }
}

function limpiarFormDB() {
  document.getElementById('dbNombre').value   = '';
  document.getElementById('dbTelefono').value = '';
  document.getElementById('dbEmail').value    = '';
  document.getElementById('dbEntidad').value  = '';
  document.getElementById('dbDeporte').value  = '';
  document.getElementById('dbNotas').value    = '';
  const rp = document.getElementById('dbReferidoPor'); if(rp) rp.value='';
  const rw = document.getElementById('dbReferidoPorWrap'); if(rw) rw.style.display='none';
  const rl = document.getElementById('dbReferidoList'); if(rl) rl.style.display='none';
  const cr = document.getElementById('dbCodigoResult'); if(cr) cr.style.display='none';
  document.getElementById('dbOrigen').selectedIndex = 0;
  dbOnOrigenChange();
}

// ── CALENDARIO ──
let calWeekStart = getMonday(new Date());

function getMonday(d) {
  const dt = new Date(d);
  const day = dt.getDay();
  dt.setDate(dt.getDate() - (day === 0 ? 6 : day - 1));
  dt.setHours(0,0,0,0);
  return dt;
}

function calPrev()  { calWeekStart.setDate(calWeekStart.getDate()-7); renderCalendar(); }
function calNext()  { calWeekStart.setDate(calWeekStart.getDate()+7); renderCalendar(); }
function calToday() { calWeekStart = getMonday(new Date()); renderCalendar(); }

let _calGCevents = []; // cache de eventos de Google Calendar

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

function openNuevaCitaFromCal(dateStr, hour) {
  showView('nueva');
  document.getElementById('ncDate').value = dateStr;
  document.getElementById('ncTime').value = pad(hour) + ':00';
  // Scroll al inicio del formulario
  const form = document.querySelector('.nc-form');
  if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}

// ══════════════════════════════════════════════════════════════
// ── VOZ ──
// ══════════════════════════════════════════════════════════════
let _voiceActive  = false;
let _voiceRec     = null;
let _voiceGotResult = false;

function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

function _voiceBtn()      { return document.getElementById('voiceBtn'); }
function _voiceStatusEl() { return document.getElementById('voiceStatus'); }

const VOICE_ICON = '🎙️ Dictar cita por voz';
const VOICE_STOP = '⏹ Detener escucha';

// ── Panel de voz (dictado por teclado iOS) ──
function toggleVoicePanel() {
  const panel = document.getElementById('voicePanel');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    document.getElementById('voiceText').value = '';
    setTimeout(() => document.getElementById('voiceText').focus(), 100);
  }
}

function procesarVozTexto() {
  const txt = (document.getElementById('voiceText').value || '').trim();
  if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
  _parseVoice(txt);
  document.getElementById('voicePanel').style.display = 'none';
  document.getElementById('voiceText').value = '';
}

function toggleVoice() {
  const SR = _getSR();
  if (!SR) {
    alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
    return;
  }
  if (_voiceActive) { _stopVoice(false); return; }
  _startVoice(SR);
}

function _startVoice(SR) {
  try {
    _voiceRec = new SR();
  } catch(e) {
    alert('No se pudo iniciar el micrófono: ' + e.message);
    return;
  }

  // Configuración optimizada para iOS Safari
  _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
  _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
  _voiceRec.interimResults  = false;
  _voiceRec.maxAlternatives = 1;

  _voiceActive    = true;
  _voiceGotResult = false;

  const btn = _voiceBtn();
  btn.classList.add('listening');
  btn.textContent = VOICE_STOP;
  _voiceStatusEl().style.display = 'flex';
  document.getElementById('voiceTranscript').textContent = '';
  document.getElementById('voiceHelp').style.display = 'none';

  _voiceRec.onresult = e => {
    _voiceGotResult = true;
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join(' ');
    document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
    _parseVoice(transcript);
  };

  _voiceRec.onerror = e => {
    if (e.error === 'not-allowed') {
      alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
    } else if (e.error === 'no-speech') {
      toast('No escuché nada. Toca el botón y habla claramente.', 'err');
    } else {
      toast('Error: ' + e.error, 'err');
    }
    _stopVoice(false);
  };

  _voiceRec.onend = () => {
    if (!_voiceGotResult) {
      // iOS para automáticamente — re-iniciar si no hubo resultado
      // (solo si el usuario no presionó "Detener")
      if (_voiceActive) {
        toast('Escuchando... habla ahora', 'ok');
        try { _voiceRec.start(); return; } catch(e) {}
      }
    }
    _stopVoice(false);
  };

  try {
    _voiceRec.start();
    toast('🎙 Escuchando... habla la cita', 'ok');
  } catch(e) {
    alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
    _stopVoice(false);
  }
}

function _stopVoice(showMsg = true) {
  _voiceActive = false;
  if (_voiceRec) {
    _voiceRec.onend = null; // evitar loop
    try { _voiceRec.stop(); } catch(e) {}
    _voiceRec = null;
  }
  const btn = _voiceBtn();
  if (btn) {
    btn.classList.remove('listening');
    btn.textContent = VOICE_ICON;
  }
  setTimeout(() => {
    const s = _voiceStatusEl();
    if (s) s.style.display = 'none';
  }, 3000);
}

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function _parseVoice(text) {
  const t = _norm(text);
  let filled = [];

  // ── FECHA ──
  let fecha = '';
  if      (/\bhoy\b/.test(t))    fecha = today();
  else if (/\bmanana\b/.test(t)) { const d=new Date(); d.setDate(d.getDate()+1); fecha=toDateStr(d); }
  else {
    const DIAS = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
    for (let i=0;i<DIAS.length;i++) {
      if (t.includes(DIAS[i])) {
        const d=new Date();
        const diff=(i-d.getDay()+7)%7||7;
        d.setDate(d.getDate()+diff);
        fecha=toDateStr(d);
        break;
      }
    }
    const dm = t.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/);
    if (dm) {
      const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      fecha = new Date().getFullYear()+'-'+pad(MESES.indexOf(dm[2])+1)+'-'+pad(parseInt(dm[1]));
    }
  }
  if (fecha) { document.getElementById('ncDate').value = fecha; filled.push('fecha'); }

  // ── HORA ──
  const tm = t.match(/(?:a\s+las?\s+)?(\d{1,2})(?:[:\s](\d{2}))?\s*(am|pm)/);
  const tm2 = !tm && t.match(/a\s+las?\s+(\d{1,2})(?:[:\s](\d{2}))?/);
  const match = tm || tm2;
  if (match) {
    let h = parseInt(match[1]);
    const min = match[2] ? parseInt(match[2]) : 0;
    const ampm = match[3];
    if      (ampm==='pm' && h<12) h+=12;
    else if (ampm==='am' && h===12) h=0;
    else if (!ampm && h>=1 && h<=6) h+=12; // 1-6 sin indicador → PM
    document.getElementById('ncTime').value = pad(h)+':'+pad(min);
    filled.push('hora');
  }

  // ── SERVICIO ──
  const SMAP = [
    [/descarga.*(cuello|espalda)|cuello.*espalda/, 'Descarga Muscular — Cuello y Espalda', false],
    [/descarga.*pierna|pierna.*descarga/,           'Descarga Muscular — Piernas',          false],
    [/descarga.*complet|completa/,                  'Descarga Muscular Completa',            false],
    [/valoracion/,                                  'Valoración Funcional',                 false],
    [/readaptacion/,                                'Readaptación Funcional',               false],
    [/espalda\s+sin\s+dolor/,                       'Plan Espalda Sin Dolor',               true ],
    [/alivio\s+profundo/,                           'Plan Alivio Profundo',                 true ],
    [/alivio.*casa|plan.*casa/,                     'Plan Alivio en Casa',                  true ],
    [/duo\s*mensual|plan\s*duo/,                    'Plan Dúo Mensual',                     true ],
    [/\bplan\s+recarga\b|\brecarga\b/,              'Plan Recarga',                         true ],
    [/\bplan\s+avanza\b|\bavanza\b/,                'Plan Avanza',                          true ],
    [/\belite\b/,                                   'Plan Elite',                           true ],
    [/\bplan\s+inicio\b|\binicio\b/,                'Plan Inicio',                          true ],
    [/\bplan\s+avance\b|\bavance\b/,                'Plan Avance',                          true ],
    [/\btransforma\b/,                              'Plan Transforma',                      true ],
  ];
  for (const [re, serv, isPlan] of SMAP) {
    if (re.test(t)) {
      const main = document.getElementById('ncServiceMain');
      const plan = document.getElementById('ncServicePlan');
      if (!isPlan) {
        main.value = serv;
        plan.style.display = 'none';
        document.getElementById('ncService').value = serv;
      } else {
        main.value = '__planes__';
        plan.style.display = 'block';
        plan.value = serv;
        document.getElementById('ncService').value = serv;
      }
      autoFillPrice();
      filled.push('servicio');
      break;
    }
  }

  // ── MODALIDAD ──
  if (/domicilio|a\s+domicilio|en\s+casa/.test(t)) {
    document.getElementById('ncMod').value = 'Domicilio';
    toggleNcAddress();
    filled.push('modalidad');
  } else if (/presencial/.test(t)) {
    document.getElementById('ncMod').value = 'Presencial';
    toggleNcAddress();
    filled.push('modalidad');
  }

  // ── PACIENTE — buscar "para [nombre]" ──
  const STOP_WORDS = new Set([
    'el','la','los','las','un','una','de','del','al','a','en','y','o',
    'que','se','con','por','como','hoy','manana','lunes','martes',
    'miercoles','jueves','viernes','sabado','domingo','para','las','los',
    'esta','este','ese','esa','su','sus','mi','mis','le','les','me','nos',
    'mas','pero','si','no','ya','hay','fue','ser','son','era'
  ]);
  // Palabras que terminan el nombre (señales de fin)
  const NAME_STOPPERS = /\b(el|la|los|las|hoy|manana|lunes|martes|miercoles|jueves|viernes|sabado|domingo|presencial|domicilio|descarga|valoracion|readaptacion|plan|para|a\s+las?)\b/i;

  const nm = text.match(/\bpara\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,4})/i);
  if (nm) {
    // Recortar el nombre en el primer stop-stopper
    let rawFull = nm[1].trim();
    const stopMatch = rawFull.match(NAME_STOPPERS);
    if (stopMatch) rawFull = rawFull.slice(0, stopMatch.index).trim();

    // Filtrar stop words del interior del nombre
    const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
    const rawName   = nameWords.join(' ');
    if (!rawName) { /* no se capturó nombre válido */ }
    else {
      const normName = _norm(rawName);
      // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
      const known = allData.citas.find(c => {
        const cn = _norm(c.nombre);
        const parts = normName.split(' ');
        // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
        return cn === normName
          || cn.includes(normName)
          || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
          || (parts.length === 1 && cn.startsWith(parts[0]));
      });
      if (known) {
        document.getElementById('ncName').value  = known.nombre;
        document.getElementById('ncPhone').value = known.telefono || '';
        document.getElementById('ncEmail').value = known.email    || '';
        if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
        filled.push('paciente (encontrado)');
      } else {
        document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
        filled.push('nombre');
      }
    }
  }

  if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
  else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
}

// ══════════════════════════════════════════════════════════════
// ── RECORDATORIOS ──
// ══════════════════════════════════════════════════════════════

// Mensajes predefinidos con el nombre del paciente
function msgSemana4(nombre) {
  const primero = nombre.split(' ')[0];
  return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya vamos en la semana 4 desde tu ultima descarga muscular — la proxima semana seria el momento ideal para hacerla antes de que el cuerpo empiece a acumular tension de nuevo. ¿Te agendo? \uD83D\uDCAA`;
}
function msgSemana5(nombre) {
  const primero = nombre.split(' ')[0];
  return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya se cumplieron las 5 semanas desde tu ultima sesion de descarga — es el momento de reagendar. Mantener la frecuencia es lo que hace que los resultados se sostengan. ¿Te agendo esta semana? \uD83D\uDCAA`;
}
function waRecordatorio(tel, nombre, semanas) {
  const t = String(tel||'').replace(/\D/g,'');
  if (!t || t.length < 7) return null;
  const phone = t.length <= 10 ? '57'+t : t;
  const msg   = semanas === 4 ? msgSemana4(nombre) : msgSemana5(nombre);
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
}
```

### exportarSeguimientoCSV — línea 12339

```javascript
function exportarSeguimientoCSV() {
  const data  = window._segData || [];
  const dataR = window._segReadapData || [];
  if (!data.length && !dataR.length) { toast('No hay datos para exportar', 'err'); return; }
  const header = ['Nombre','Teléfono','Email','Tipo','Servicio','Última sesión','Días','Semana/Zona','Reagendó','WA Enviado'];
  const rowsD = data.map(p => [
    p.nombre, p.telefono, p.email, 'Descarga muscular', p.servicio, p.fecha, p.dias,
    p.semana==='sem3'?'Semana 3':p.semana==='sem4'?'Semana 4':'Semana 5+',
    segReagendo(p.nombre)?'Sí':'No',
    (segWaSent(p.nombre,'sem3')||segWaSent(p.nombre,'sem4')||segWaSent(p.nombre,'sem5'))?'Sí':'No'
  ]);
  const rowsR = dataR.map(p => [
    p.nombre, p.telefono, p.email, 'Readaptación Funcional', p.servicio, p.fecha, p.dias,
    readapZona(p.nombre)||'—',
    segReagendo(p.nombre)?'Sí':'No',
    segWaSent(p.nombre,'readap')?'Sí':'No'
  ]);
  const csv = [header,...rowsD,...rowsR].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'seguimiento_'+today()+'.csv'; a.click();
  toast('CSV exportado');
}

// ── MODALS ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); }));

// ── DARK MODE ──
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('adminDarkMode', next);
  const txt = document.getElementById('darkModeTxt');
  if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
}
// Sincronizar texto del botón al cargar
window.addEventListener('DOMContentLoaded', () => {
  const txt = document.getElementById('darkModeTxt');
  if (txt && document.documentElement.getAttribute('data-theme') === 'dark') {
    txt.textContent = 'Modo claro';
  }
});

// ── ATAJOS DE TECLADO ──
document.addEventListener('keydown', e => {
  // Esc → cerrar modal abierto
  if (e.key === 'Escape') {
    const m = document.querySelector('.modal-bg.open');
    if (m) { m.classList.remove('open'); return; }
  }
  // No activar atajos cuando el usuario escribe
  const tag = document.activeElement ? document.activeElement.tagName : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  // Ctrl/Cmd + K → búsqueda global
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const s = document.getElementById('globalSearchInput');
    if (s) { s.focus(); s.select(); }
  }
});

// ── ENVIAR EMAIL A UN SOLO PACIENTE (recordatorio) ──
async function enviarEmailUno(encNombre, semanas) {
  const nombre = decodeURIComponent(encNombre);
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=sendReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      kvSet('rec_email_'+nombre, '1');
      toast('Email de recordatorio enviado a ' + nombre.split(' ')[0]);
      if (_remData) renderRecordatorios(_remData);
    } else toast('Error al enviar email', 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
}

// ══════════════════════════════════════════════════════════════
// ── META MENSUAL ──
// ══════════════════════════════════════════════════════════════
function getMeta() {
  // Limpiar metaMensual si tiene valor viejo
  const stored = parseInt(kvGet('metaMensual')||'0', 10);
  if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
  return getKPIConfig().meta_ventas_mes || 10265000;
}

function actualizarMetaBarra(cobrado) {
  const meta = getMeta();
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  const txt  = document.getElementById('metaTexto');
  const inp  = document.getElementById('metaInput');
  if (!fill) return;
  if (!meta) {
    if (pct) pct.textContent = '';
    if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
    if (fill) fill.style.width = '0%';
    return;
  }
  const p = Math.min(Math.round(cobrado / meta * 100), 100);
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
  if (txt)  txt.textContent  = '$' + cobrado.toLocaleString('es-CO') + ' de $' + meta.toLocaleString('es-CO') + ' meta';
  if (inp && !inp.value) inp.value = meta.toLocaleString('es-CO');
}

function previewMeta(v) {
  const n = parseInt(v.replace(/\D/g,''), 10);
  if (!n) return;
  const cobrado = calcCobradoMes();
  const p = Math.min(Math.round(cobrado / n * 100), 100);
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
}

function guardarMeta() {
  const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
  if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
  kvSet('metaMensual', val);
  const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
  reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
  actualizarMetaBarra(calcCobradoMes());
  toast('Meta guardada: $' + val.toLocaleString('es-CO'));
}

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

function calcIngresoPaquetesMes(m, y) {
  return _getPkAsignados()
    .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
    .reduce((s,p) => s + parsePrecio(p.precio), 0);
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

// ══════════════════════════════════════════════════════════════
// ── NOTAS RÁPIDAS ──
// ══════════════════════════════════════════════════════════════
let _notasTimer = null;
function initQuickNotes() {
  const el = document.getElementById('notasRapidas');
  if (!el) return;
  const key = 'notasRapidas_' + today();
  el.value = kvGet(key) || '';
}
function autoGuardarNota() {
  clearTimeout(_notasTimer);
  _notasTimer = setTimeout(() => {
    const el = document.getElementById('notasRapidas');
    if (!el) return;
    kvSet('notasRapidas_' + today(), el.value);
    const saved = document.getElementById('notasSaved');
    if (saved) { saved.classList.add('show'); setTimeout(() => saved.classList.remove('show'), 1800); }
  }, 600);
}

// ══════════════════════════════════════════════════════════════
async function limpiarDuplicadosGAS() {
  const btn = document.getElementById('btnLimpiarDup');
  const dups = detectarDuplicados();
  if (!dups.length) { toast('No se detectaron duplicados en los datos cargados', 'ok'); return; }

  const msg = `Se detectaron ${dups.length} cita(s) duplicada(s):\n\n` +
    dups.map(d => `• ${d.nombre} — ${d.fecha} ${d.hora || '00:00'}`).join('\n') +
    '\n\n¿Cancelarlas en el spreadsheet? Quedarán como Canceladas (no se borran definitivamente).';
  if (!confirm(msg)) return;

  btn.disabled = true;
  btn.textContent = 'Limpiando...';
  let eliminadas = 0, errores = 0;
  for (const dup of dups) {
    try {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(dup.id)}`).then(x => x.json());
      if (r.ok) {
        const cita = allData.citas.find(c => c.id === dup.id);
        if (cita) cita.estado = 'Cancelada';
        eliminadas++;
      } else errores++;
    } catch(e) { errores++; }
  }
  btn.disabled = false;
  btn.textContent = 'Limpiar duplicados';
  toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
  if (eliminadas > 0) { initDashboard(); renderFinanzas(); }
}

function detectarDuplicados() {
  const grupos = {};
  for (const c of allData.citas) {
    if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) continue;
    const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(c);
  }
  const dups = [];
  for (const key in grupos) {
    const arr = grupos[key];
    if (arr.length > 1) {
      arr.slice(1).forEach(c => dups.push(c));
    }
  }
  return dups;
}

// ── MÓDULO FINANZAS ──
// ══════════════════════════════════════════════════════════════
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

function getEgresos() {
  try { return JSON.parse(kvGet('egresos') || '[]'); } catch { return []; }
}
function saveEgresos(arr) { kvSet('egresos', JSON.stringify(arr)); }

function actualizarConceptosEgreso() {
  const cat  = document.getElementById('egresoCategoria').value;
  const sel  = document.getElementById('egresoConcepto');
  const opts = CONCEPTOS_EGRESO[cat] || ['Otro'];
  sel.innerHTML = opts.map(o => `<option>${o}</option>`).join('');
}

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

function getCostosEstructura() {
  try {
    const s = kvGet('costosEstructura');
    if (!s) return {...COSTOS_DEFAULTS};
    const stored = JSON.parse(s);
    // Migración: corregir valores desactualizados
    if (stored.asesorias_ap    === 790000) stored.asesorias_ap    = 480000;
    if (stored.redes_contenido === 150000) stored.redes_contenido = 240000;
    // Agregar campos nuevos si faltan
    if (!stored.asistente_fisio)    stored.asistente_fisio    = 1200000;
    if (!stored.arriendo)           stored.arriendo            = 450000;
    if (!stored.servicios_publicos) stored.servicios_publicos  = 50000;
    if (!stored.activacion_eventos) stored.activacion_eventos  = 300000;
    return {...COSTOS_DEFAULTS, ...stored};
  } catch(e) { return {...COSTOS_DEFAULTS}; }
}

function saveCostosEstructura(obj) {
  kvSet('costosEstructura', JSON.stringify(obj));
}

function calcTotalCostos(c) {
  const subtotal = (c.honorarios_fisio   || 0)
    + (c.seguridad_social    || 0)
    + (c.asistente_fisio     || 0)
    + (c.auxiliar_admin      || 0)
    + (c.arriendo            || 0)
    + (c.servicios_publicos  || 0)
    + (c.suscripcion_ia      || 0)
    + (c.suscripcion_capcut  || 0)
    + (c.asesorias_ap        || 0)
    + (c.redes_contenido     || 0)
    + (c.activacion_eventos  || 0)
    + (c.pautas_redes        || 0)
    + (c.mantenimiento       || 0)
    + (c.insumos             || 0);
  const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
  const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
  return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
}

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

function reloadMetas() {
  const cfg = getKPIConfig();
  META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
  META_VENTAS_MES      = cfg.meta_ventas_mes;
  META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
  META_NPS             = cfg.meta_nps;
  META_ENCUESTAS       = cfg.meta_encuestas;
  META_CANCELACION_PCT = cfg.meta_cancelacion;
  META_RETENCION_PCT   = cfg.meta_retencion;
  // Sincronizar precios de servicios siempre
  _syncPreciosToAutoFill(cfg);
}

function getKPIManual() {
  try { return JSON.parse(kvGet('kpi_manual') || '{}'); } catch { return {}; }
}
function saveKPIManual(obj) { kvSet('kpi_manual', JSON.stringify(obj)); }

// ═══════════════════════════════════════════════
// LEADS - Sistema de conteo de prospectos
// ═══════════════════════════════════════════════
function getLeads() {
  try {
    const raw = kvGet('leads_log');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLeads(arr) {
  kvSet('leads_log', JSON.stringify(arr));
}

function addLead(canal = 'WhatsApp') {
  const leads = getLeads();
  const ahora = new Date();
  leads.push({
    id: Date.now(),
    fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
    hora: ahora.toTimeString().slice(0,5),    // HH:MM
    canal: canal,
    timestamp: ahora.getTime()
  });
  saveLeads(leads);
  return leads.length;
}

function deleteLastLead() {
  const leads = getLeads();
  if (leads.length === 0) return false;
  leads.pop();
  saveLeads(leads);
  return true;
}

function getLeadsHoy() {
  const hoy = new Date().toLocalDateStr();
  return getLeads().filter(l => l.fecha === hoy).length;
}

function getLeadsSemana() {
  const hoy = new Date();
  const dia = hoy.getDay();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (dia === 0 ? 6 : dia - 1));
  lunes.setHours(0,0,0,0);
  return getLeads().filter(l => new Date(l.fecha) >= lunes).length;
}

function getLeadsMes(mesParam, anyoParam) {
  const ahora = new Date();
  const y = anyoParam || ahora.getFullYear();
  const m = mesParam  || ahora.getMonth() + 1;
  return getLeads().filter(l => {
    const [ly, lm] = l.fecha.split('-');
    return +ly === y && +lm === m;
  }).length;
}

function changeKPIMonth(m, y) {
  const now = new Date();
  const esActual = m === now.getMonth()+1 && y === now.getFullYear();
  _kpiViewMonth = esActual ? null : {m, y};
  renderKPIGuia();
}

function registrarLead(canal) {
  addLead(canal);
  actualizarContadorLeads();
  const fb = document.getElementById('leadFeedback');
  if (fb) {
    fb.textContent = `✅ Lead de ${canal} registrado`;
    setTimeout(() => { fb.textContent = ''; }, 2500);
  }
}

function deshacerUltimoLead() {
  if (!confirm('¿Quitar el último lead registrado?')) return;
  const ok = deleteLastLead();
  actualizarContadorLeads();
  const fb = document.getElementById('leadFeedback');
  if (fb) {
    fb.textContent = ok ? '↩️ Lead deshecho' : '⚠️ No hay leads para deshacer';
    setTimeout(() => { fb.textContent = ''; }, 2500);
  }
}

function resetLeadsHoy() {
  const total = getLeads().length;
  if (total === 0) { toast('No hay leads registrados', 'err'); return; }
  if (!confirm(`¿Borrar todos los ${total} leads registrados? Esto no se puede deshacer.`)) return;
  saveLeads([]);
  actualizarContadorLeads();
  toast('Todos los leads borrados', 'ok');
}

function actualizarContadorLeads() {
  const hoy = getLeadsHoy(), sem = getLeadsSemana(), mes = getLeadsMes();
  // Widget completo en KPIs
  const elHoy = document.getElementById('leadsHoyCount');
  const elSem = document.getElementById('leadsSemanaCount');
  const elMes = document.getElementById('leadsMesCount');
  if (elHoy) elHoy.textContent = hoy;
  if (elSem) elSem.textContent = sem;
  if (elMes) elMes.textContent = mes;
  // Stat-cards de solo lectura en Dashboard
  const elDashHoy = document.getElementById('leadsHoyDash');
  const elDashSem = document.getElementById('leadsSemDash');
  const elDashMes = document.getElementById('leadssMesDash');
  if (elDashHoy) elDashHoy.textContent = hoy;
  if (elDashSem) elDashSem.textContent = sem;
  if (elDashMes) elDashMes.textContent = mes;
  // Widget en Indicadores de Gestión
  const elGHoy = document.getElementById('leadsHoyGuia');
  const elGSem = document.getElementById('leadsSemGuia');
  const elGMes = document.getElementById('leadsMesGuia');
  if (elGHoy) elGHoy.textContent = hoy;
  if (elGSem) elGSem.textContent = sem;
  if (elGMes) elGMes.textContent = mes;
}

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
function _copyGestionMesKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

function _copyGestionPeriodo() {
  const now = new Date();
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

function _copyGestionTop(map, limit = 5) {
  return Object.entries(map || {})
    .sort((a,b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k,v]) => `${k}: ${v}`)
    .join('\n') || 'Sin datos registrados';
}

function _copyGestionData() {
  const now = new Date();
  const monthKey = _copyGestionMesKey(now);
  const citasAll = allData.citas || [];
  const eventosAll = allData.eventos || [];
  const pacientesAll = allData.pacientes || [];
  const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
  const manual = getKPIManual ? getKPIManual() : {};
  const cfg = getKPIConfig ? getKPIConfig() : {};
  const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
  const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
  const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
  const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
  const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
  const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
  const ventasGeneradas = citasMesActivas.reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosMes.reduce((s,e) => s + parsePrecio(e.cobro), 0);
  const ingresosCobrados = (typeof calcCobradoMes === 'function') ? calcCobradoMes() : ventasGeneradas;
  const pagosPendientesLista = citasMesActivas.filter(c => {
    const estado = String(c.estado || '').toLowerCase();
    return estado.includes('pendiente de pago') || estado.includes('pago por verificar') || estado.includes('rechazado');
  });
  const pendienteCobrar = pagosPendientesLista.reduce((s,c) => s + parsePrecio(c.precio), 0);
  const egresosMes = (typeof getEgresos === 'function' ? getEgresos() : [])
    .filter(e => String(e.fecha || '').startsWith(monthKey))
    .reduce((s,e) => s + (Number(e.monto) || parsePrecio(e.monto)), 0);
  const ganancia = ingresosCobrados - egresosMes;
  const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;
  const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;
  const faltante = Math.max(0, metaMensual - ingresosCobrados);

  const pacienteMes = {};
  citasMesActivas.forEach(c => { if (c.nombre) pacienteMes[String(c.nombre).trim().toLowerCase()] = c.nombre; });
  let personasNuevas = 0;
  let personasRecurrentes = 0;
  Object.keys(pacienteMes).forEach(key => {
    const tuvoAntes = citasAll.some(c => String(c.nombre || '').trim().toLowerCase() === key && normDate(c.fecha || '') < monthKey + '-01' && !String(c.estado || '').toLowerCase().includes('cancel'));
    if (tuvoAntes) personasRecurrentes++; else personasNuevas++;
  });

  const servicios = {};
  const horarios = {};
  citasMesActivas.forEach(c => {
    const serv = c.servicio || 'Sin servicio';
    servicios[serv] = (servicios[serv] || 0) + 1;
    const h = String(c.hora || '').slice(0,2) + ':00';
    if (h && h !== ':00') horarios[h] = (horarios[h] || 0) + 1;
  });
  const serviciosArr = Object.entries(servicios).sort((a,b) => b[1] - a[1]);
  const horariosArr = Object.entries(horarios).sort((a,b) => b[1] - a[1]);
  const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
  const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;

  const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
  const leadsConvertidos = manual.convertidos || citasMesActivas.length;
  const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);

  const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
  const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
  const disponibilidadPros = pros.length
    ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
    : 'Sin fisioterapeutas registrados';

  return {
    periodo: _copyGestionPeriodo(),
    metaMensual, ingresosCobrados, ventasGeneradas, pendienteCobrar, egresosMes, ganancia, cumplimiento, faltante,
    citasProgramadas: citasMesActivas.length,
    sesionesAtendidas,
    personasNuevas,
    personasRecurrentes,
    paquetesVendidos,
    ticketPromedio,
    ocupacion,
    cancelaciones,
    noAsistencias,
    leadsRecibidos,
    leadsConvertidos,
    serviciosMasVendidos: serviciosArr.slice(0,5).map(([s,n]) => `${s}: ${n}`).join('\n') || 'Sin datos',
    serviciosMenosVendidos: serviciosArr.slice(-5).map(([s,n]) => `${s}: ${n}`).join('\n') || 'Sin datos',
    horariosMayorOcupacion: horariosArr.slice(0,5).map(([h,n]) => `${h}: ${n} cita(s)`).join('\n') || 'Sin datos',
    horariosMenorOcupacion: horariosArr.slice(-5).map(([h,n]) => `${h}: ${n} cita(s)`).join('\n') || 'Sin datos',
    disponibilidadPros,
    pagosPendientesLista,
    reactivar,
    candidatosPaquete,
    estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
    resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
    observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
  };
}

function _copyGestionOcupacion(citasProgramadas, date) {
  const y = date.getFullYear(), m = date.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  let capacidad = 0;
  for (let d = 1; d <= days; d++) {
    const dow = new Date(y, m, d).getDay();
    if (dow === 0) continue;
    if (dow === 1) capacidad += 8;
    else if (dow === 6) capacidad += 2;
    else capacidad += 9;
  }
  return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
}

function _copyGestionReactivar(citasAll, pacientesAll) {
  const last = {};
  citasAll.forEach(c => {
    if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
    const key = String(c.nombre).trim().toLowerCase();
    const f = normDate(c.fecha || '');
    if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
  });
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 42);
  const cutoffStr = normDate(cutoff);
  return Object.values(last)
    .filter(p => p.fecha && p.fecha < cutoffStr)
    .sort((a,b) => a.fecha.localeCompare(b.fecha))
    .slice(0,40);
}

function _copyGestionCandidatosPaquete(citasAll) {
  const map = {};
  citasAll.forEach(c => {
    if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
    const key = String(c.nombre).trim().toLowerCase();
    if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
    map[key].total++;
    if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
    const f = normDate(c.fecha || '');
    if (f > map[key].ultimo) map[key].ultimo = f;
  });
  return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
}

function _copyGestionDiagnostico(d) {
  const ok = [];
  const att = [];
  if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
  else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
  if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
  if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
  if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
  if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
  if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
  if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
  return {ok, att};
}

function _copyGestionAcciones(d) {
  return [
    `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
    `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
    `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
    'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
    'Revisar el servicio más vendido y crear una oferta complementaria.'
  ];
}

function _copyGestionTexto(kind) {
  const d = _copyGestionData();
  const diag = _copyGestionDiagnostico(d);
  const acciones = _copyGestionAcciones(d);
  const money = v => fmtPeso(v || 0);
  const baseFin = [
    `Periodo: ${d.periodo}`,
    '',
    'RESUMEN FINANCIERO',
    `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
    `* Ventas generadas: ${money(d.ventasGeneradas)}`,
    `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
    `* Gastos: ${money(d.egresosMes)}`,
    `* Ganancia estimada: ${money(d.ganancia)}`,
    `* Meta mensual: ${money(d.metaMensual)}`,
    `* Cumplimiento: ${d.cumplimiento}%`,
    `* Dinero faltante: ${money(d.faltante)}`
  ];
  let text = '';
  if (kind === 'ejecutivo') {
    text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
  } else if (kind === 'indicadores') {
    text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
  } else if (kind === 'diagnostico') {
    text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
  } else if (kind === 'estrategias') {
    text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
  } else if (kind === 'plan') {
    text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
  } else if (kind === 'asesor') {
    text = _copyGestionAsesorText(d);
  } else {
    text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
  }
  return _copyPlainText(text);
}

function copyGestionTexto(kind) {
  return _copyGestionTexto(kind);
}

function _copyGestionAsesorText(d) {
  const money = v => fmtPeso(v || 0);
  return [
    'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
    '',
    `Periodo: ${d.periodo}`,
    `Meta mensual: ${money(d.metaMensual)}`,
    '',
    'RESUMEN FINANCIERO',
    `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
    `* Ventas generadas: ${money(d.ventasGeneradas)}`,
    `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
    `* Gastos: ${money(d.egresosMes)}`,
    `* Ganancia estimada: ${money(d.ganancia)}`,
    `* Cumplimiento de la meta: ${d.cumplimiento}%`,
    '',
    'OPERACIÓN',
    `* Citas programadas: ${d.citasProgramadas}`,
    `* Sesiones atendidas: ${d.sesionesAtendidas}`,
    `* Cancelaciones: ${d.cancelaciones}`,
    `* No asistencias: ${d.noAsistencias}`,
    `* Ocupación total: ${d.ocupacion}`,
    '',
    'CLIENTES Y VENTAS',
    `* Personas nuevas: ${d.personasNuevas}`,
    `* Personas recurrentes: ${d.personasRecurrentes}`,
    `* Leads recibidos: ${d.leadsRecibidos}`,
    `* Leads convertidos: ${d.leadsConvertidos}`,
    `* Paquetes vendidos: ${d.paquetesVendidos}`,
    `* Ticket promedio: ${money(d.ticketPromedio)}`,
    '',
    'CAPACIDAD DEL EQUIPO',
    `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
    `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
    '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
    '',
    'OPORTUNIDADES',
    `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
    `* Personas para reactivar: ${d.reactivar.length}`,
    `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
    '* Paquetes próximos a terminar: revisar módulo de paquetes.',
    `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
    '',
    'SERVICIOS',
    `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
    `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
    '* Servicios más rentables: revisar estructura de costos.',
    '* Servicios con menor rentabilidad: revisar estructura de costos.',
    '',
    'ACCIONES DEL MES',
    `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
    `* Resultado: ${d.resultadosObtenidos}`,
    '* Ingreso generado: calcular según campañas registradas.',
    '',
    'OBSERVACIONES',
    d.observaciones,
    '',
    'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
    '',
    '1. Diagnóstico del mes.',
    '2. Principales problemas.',
    '3. Oportunidades de ingresos.',
    '4. Cinco acciones prioritarias.',
    '5. Personas o segmentos que debemos contactar.',
    '6. Estrategias para llegar a la meta.',
    '7. Actividades que debe realizar administración.',
    '8. Actividades que se pueden delegar a los fisioterapeutas.',
    '9. Riesgos.',
    '10. Próximo paso inmediato.',
    '',
    'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
  ].join('\n');
}

async function _copyPlainText(text) {
  const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(clean);
      _copyOk();
      return true;
    }
  } catch(e) {}
  _showCopyFallback(clean);
  return false;
}

function _copyOk() {
  toast('Información copiada correctamente', 'ok');
  const estados = document.querySelectorAll('.copyGestionStatus');
  estados.forEach(el => { el.style.display = 'inline-flex'; });
  clearTimeout(window._copyGestionStatusTimer);
  window._copyGestionStatusTimer = setTimeout(() => {
    estados.forEach(el => { el.style.display = 'none'; });
  }, 2200);
}

function _showCopyFallback(text, title='Copiar manualmente') {
  let modal = document.getElementById('copyFallbackModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'copyFallbackModal';
    modal.className = 'modal-bg';
    modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
    modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
      <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
      <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
        <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('copyFallbackTitle').textContent = title;
  const ta = document.getElementById('copyFallbackText');
  ta.value = text;
  modal.style.display = 'flex';
  setTimeout(() => { ta.focus(); ta.select(); }, 80);
}

function abrirCopiarListaGestion() {
  const d = _copyGestionData();
  const groups = [
    ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
    ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
    ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
  ];
  const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
  return _copyPlainText(text);
}

function copiarInfoPersonaGestion() {
  const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
  if (!nombre) return;
  const key = nombre.trim().toLowerCase();
  const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
  if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
  citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
  const c0 = citas[0];
  const total = citas.length;
  const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
  const text = [
    'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
    '',
    `Nombre: ${c0.nombre}`,
    `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
    `Correo: ${c0.email || 'Sin registrar'}`,
    `Total de citas registradas: ${total}`,
    `Citas confirmadas/atendidas: ${pagado}`,
    `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
    `Último servicio: ${c0.servicio || 'Sin servicio'}`,
    `Estado último registro: ${c0.estado || 'Sin estado'}`,
    '',
    'Historial reciente:',
    ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
  ].join('\n');
  return _copyPlainText(text);
}

function abrirMensajeWAGestion() {
  const d = _copyGestionData();
  const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
  const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
  const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
  const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
  _showWhatsAppCopyModal(msg, phone);
}

function _showWhatsAppCopyModal(msg, phone='') {
  let modal = document.getElementById('waCopyGestionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'waCopyGestionModal';
    modal.className = 'modal-bg';
    modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
    modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
      <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
      <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
      <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
        <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
        <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('waCopyGestionPhone').value = phone || '';
  document.getElementById('waCopyGestionText').value = msg;
  modal.style.display = 'flex';
}

function _openWAGestionPrepared() {
  const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
  const text = document.getElementById('waCopyGestionText').value || '';
  const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ══════════════════════════════════════════════════════════════
// ── REPORTE FIN DE MES ──
// ══════════════════════════════════════════════════════════════
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

function _toggleEditCostos() {
  const panel   = document.getElementById('costosEditorPanel');
  const compact = document.getElementById('costosVistaCompacta');
  const btn     = document.getElementById('btnEditCostos');
  const open    = panel.style.display === 'none';
  panel.style.display   = open ? 'block' : 'none';
  compact.style.display = open ? 'none'  : 'block';
  btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
}

function _leerCamposCostos() {
  const c = {...COSTOS_DEFAULTS};
  document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
    c[inp.dataset.costo] = parseFloat(inp.value) || 0;
  });
  return c;
}

function _recalcCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  const el   = id => document.getElementById(id);
  if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
  if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
  if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
  if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
}

function _guardarCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  saveCostosEstructura(c);

  // Actualizar la meta de ventas en kpiConfig y en las variables globales
  const cfg = getKPIConfig();
  cfg.meta_ventas_mes = calc.total;
  kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES    = calc.total;
  META_VENTAS_SEMANA = Math.round(calc.total / 4);

  toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');

  // Refrescar todo el reporte
  document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
  setTimeout(() => {
    document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
  }, 60);
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

function copiarReporteMes() {
  const now  = new Date();
  const m    = now.getMonth() + 1;
  const y    = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);

  const el = document.getElementById('reporteMesBody');
  // Construir texto plano desde el HTML
  let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
  txt += el.innerText.replace(/\n{3,}/g, '\n\n');

  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('btnCopiarReporte');
    const orig = btn.innerHTML;
    btn.textContent = '✓ Copiado';
    btn.style.color = 'var(--ok)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  }).catch(() => toast('No se pudo copiar', 'err'));
}

function imprimirReporteMes() {
  const body = document.getElementById('reporteMesBody').innerHTML;
  const titulo = document.getElementById('reporteMesTitulo').textContent;
  const w = window.open('', '_blank', 'width=700,height=900');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${titulo}</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Cormorant+Garamond:wght@600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'DM Sans',sans-serif;color:#1A1A2E;background:#fff;padding:40px;font-size:14px}
      h1{font-family:'Cormorant Garamond',serif;font-size:1.6rem;margin-bottom:6px}
      @media print{body{padding:20px}}
    </style>
  </head><body>
    <h1>${titulo}</h1>
    <p style="color:#6B7280;font-size:.85rem;margin-bottom:28px">Reporte automático de indicadores de gestión</p>
    ${body}
    <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
  </body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// ══════════════════════════════════════════════════════════════
// ── BRIEF PARA CLAUDE ──
// ══════════════════════════════════════════════════════════════
function copiarBriefClaude() {
  const now   = new Date();
  const m     = now.getMonth() + 1;
  const y     = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
  const mesStr = `${y}-${String(m).padStart(2,'0')}`;
  const sep  = n => '─'.repeat(n);

  const citas      = citasReales();
  const todasCitas = allData.citas || [];
  const eventosAll = allData.eventos || [];
  const manual     = getKPIManual();
  const costos     = getCostosEstructura();
  const calc       = calcTotalCostos(costos);

  // ── Sesiones ──
  const citasMes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado!=='No asistió'; });
  const eventosMes = eventosAll.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m&&+cy===y; });
  const noShowsMes = todasCitas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado==='No asistió'; });
  const todasMes   = todasCitas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y; });
  const totalSesiones = citasMes.length + eventosMes.length;
  const metaSesionesMes = META_SESIONES_SEMANA * 4;

  // ── Financiero ──
  const ventasCobradas  = calcCobradoMes();
  const ventasFact      = citasMes.reduce((s,c)=>s+parsePrecio(c.precio),0) + eventosMes.reduce((s,e)=>s+parsePrecio(e.cobro),0);
  const ventasPendientes= citasMes.filter(c=>!isPagada(c.id)).reduce((s,c)=>s+parsePrecio(c.precio),0);
  const egresosAll      = getEgresos().filter(e=>e.fecha&&e.fecha.startsWith(mesStr));
  const egresosMes      = egresosAll.reduce((s,e)=>s+(e.monto||0),0);
  const gastosBase      = egresosMes>0 ? Math.max(egresosMes,calc.subtotal) : calc.subtotal;
  const utilidadMes     = ventasCobradas - gastosBase;
  const margenPct       = ventasCobradas>0 ? Math.round((utilidadMes/ventasCobradas)*100) : 0;
  const pctMeta         = calc.total>0 ? Math.round((ventasCobradas/calc.total)*100) : 0;

  // ── Mix servicios ──
  const mixMap = {}, mixIng = {};
  citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
  const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
  const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
  const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);

  // ── Cancelaciones ──
  const motivosMes    = getCancelMotivos();
  const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
  const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
  const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;

  // ── Pacientes ──
  const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
  const pacMesMap = {};
  citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
  const pacUnicosMes = Object.keys(pacMesMap).length;
  let pacNuevos=0, pacRecurrentes=0;
  Object.keys(pacMesMap).forEach(pac=>{
    const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
    if(prev.length===0) pacNuevos++; else pacRecurrentes++;
  });
  const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
  const cont60={};
  citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
  const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
  const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;

  // ── Leads y marketing ──
  const leadsMes   = getLeadsMes() || manual.leads || 0;
  const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
  const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
  const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
  const canalMap={}, canalIng={};
  citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });

  // ── Calidad ──
  const encStats=getEncuestaStats();
  const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
  const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
  const bdAuto  = calcBDActualizada();
  const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);

  // ── Semanas ──
  const semanas=[0,0,0,0,0];
  citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
  eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });

  // ── Días pico ──
  const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const porDia=[0,0,0,0,0,0,0];
  citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
  const diaPico = diasNom[porDia.indexOf(Math.max(...porDia))];
  const diaBajo = diasNom[[1,2,3,4,5,6,0].reduce((best,d)=>porDia[d]<porDia[best]?d:best, 1)];

  // ════════════ CONSTRUIR TEXTO ════════════
  let t = '';
  const line = (l='') => t += l + '\n';
  const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
  const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
  const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);

  line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
  line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
  line(sep(60));
  line();
  line(`CONTEXTO DEL NEGOCIO`);
  line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
  line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
  line(`Objetivo: ${fmtPeso(calc.total)}/mes para cubrir costos, imprevistos y 20% de utilidad.`);

  h1(`1. RESULTADOS FINANCIEROS`);
  row('Ingresos facturados', fmtPeso(ventasFact));
  row('Ingresos cobrados', fmtPeso(ventasCobradas));
  row('Pendiente de cobro', fmtPeso(ventasPendientes));
  row('Meta de ventas del mes', fmtPeso(calc.total));
  row('Cumplimiento de meta', pctMeta + '%');
  line();
  row('Costos fijos + operativos (estructura)', fmtPeso(calc.subtotal));
  row('Egresos registrados en sistema', fmtPeso(egresosMes));
  row('Base de gastos usada para cálculo', fmtPeso(gastosBase));
  row('Utilidad neta real', fmtPeso(utilidadMes));
  row('Margen de utilidad real', margenPct + '%');
  row('Margen objetivo', costos.pct_utilidad + '%');
  line();
  line(`  ESTRUCTURA DE COSTOS MENSUAL:`);
  row('  Honorarios Fisio', fmtPeso(costos.honorarios_fisio));
  row('  Seguridad Social', fmtPeso(costos.seguridad_social));
  row('  Auxiliar Administrativa', fmtPeso(costos.auxiliar_admin));
  row('  Suscripción IA', fmtPeso(costos.suscripcion_ia));
  row('  Suscripción CapCut', fmtPeso(costos.suscripcion_capcut));
  row('  Asesorías AP / Mes', fmtPeso(costos.asesorias_ap));
  row('  Redes Sociales Contenido', fmtPeso(costos.redes_contenido));
  row('  Pautas Redes', fmtPeso(costos.pautas_redes));
  row('  Mantenimiento y compras', fmtPeso(costos.mantenimiento));
  row('  Insumos', fmtPeso(costos.insumos));
  row('  Subtotal', fmtPeso(calc.subtotal));
  row('  + Fondo imprevistos ' + costos.pct_imprevistos + '%', fmtPeso(calc.imprevistos));
  row('  + Utilidad deseada ' + costos.pct_utilidad + '%', fmtPeso(calc.utilidad));
  row('  TOTAL NECESARIO', fmtPeso(calc.total));

  h1(`2. SESIONES Y PRODUCTIVIDAD`);
  row('Total sesiones atendidas', totalSesiones + ' / meta ' + metaSesionesMes);
  row('Cumplimiento meta sesiones', Math.round(totalSesiones/metaSesionesMes*100) + '%');
  row('Citas individuales', citasMes.length + '');
  row('Eventos / corporativos', eventosMes.length + '');
  line();
  line('  Por semana:');
  semanas.forEach((n,i) => { if(n>0||i<4) row(`    Semana ${i+1}`, n + ' sesiones'); });
  line();
  line('  Mix de servicios:');
  const totalSesM = mixArr.reduce((s,[,n])=>s+n,0);
  mixArr.forEach(([serv,cnt]) => {
    const p = Math.round(cnt/totalSesM*100);
    const ing = mixIng[serv]||0;
    row(`    ${serv}`, `${cnt} sesiones (${p}%) — ${fmtPeso(ing)} — prom. ${fmtPeso(Math.round(ing/cnt))}/sesión`);
  });
  if (fullCnt>0&&expressCnt>0) {
    line();
    line(`  ALERTA RENTABILIDAD: Full (${fullCnt}) vs Express (${expressCnt}).`);
    line(`  La Express genera más ingreso por hora que la Full.`);
  }
  line();
  row('Día más ocupado', diaPico);
  row('Día menos ocupado', diaBajo);

  h1(`3. CANCELACIONES Y NO-SHOWS`);
  row('Total citas programadas', todasMes.length + '');
  row('Cancelaciones', canceladasMes.length + ' (' + tasaCancel + '%) — meta <' + META_CANCELACION_PCT + '%');
  row('No-shows (no asistió)', noShowsMes.length + ' (' + noShowRate + '%)');
  row('Citas efectivamente atendidas', (todasMes.length-canceladasMes.length-noShowsMes.length) + '');
  const ingPromedio = citasMes.length>0 ? Math.round(ventasFact/citasMes.length) : 0;
  row('Ingreso estimado perdido (cancel+noshow)', fmtPeso((canceladasMes.length+noShowsMes.length)*ingPromedio));
  if (Object.keys({}).length>0||canceladasMes.length>0) {
    const cancelPorServ={};
    canceladasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; cancelPorServ[sv]=(cancelPorServ[sv]||0)+1; });
    if(Object.keys(cancelPorServ).length>0) {
      line();
      line('  Cancelaciones por servicio:');
      Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1]).forEach(([sv,n])=>row(`    ${sv}`,n+''));
    }
  }

  h1(`4. ANÁLISIS DE PACIENTES`);
  row('Pacientes únicos atendidos', pacUnicosMes + '');
  row('Pacientes nuevos (sin visita en 6 meses)', pacNuevos + '');
  row('Pacientes recurrentes', pacRecurrentes + '');
  row('Tasa de retención 60 días', tasaRet + '% — meta ≥' + META_RETENCION_PCT + '%');
  row('Pacientes con ≥2 sesiones en 60 días', pacRecompra + ' de ' + pac60);
  line();
  const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if (topPac.length>0) {
    line('  Top pacientes por sesiones:');
    topPac.forEach(([nom,n],i)=>row(`    ${i+1}. ${nom}`, n+' sesión'+(n===1?'':'es')));
  }

  h1(`5. MARKETING Y CAPTACIÓN`);
  row('Leads recibidos en el mes', leadsMes>0?leadsMes+'':'Sin registro');
  row('Tasa de conversión', tasaConv!==null?tasaConv+'% — meta ≥25%':'Sin datos de leads');
  row('Pacientes nuevos captados', pacNuevos + '');
  row('Inversión en marketing', fmtPeso(egresosMkt));
  row('CAC (costo adquisición cliente)', cac>0?fmtPeso(cac)+' — meta <'+fmtPeso(META_CAC_MAX):'Sin datos');
  if (Object.keys(canalIng).length>0) {
    line();
    line('  Ingresos por canal de captación:');
    const totalCanalIng=Object.values(canalIng).reduce((s,v)=>s+v,0);
    Object.entries(canalIng).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing])=>{
      const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
      row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
    });
  }

  h1(`6. CALIDAD Y SATISFACCIÓN`);
  row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
  if (encStats.promotores!==undefined) {
    row('  Promotores', encStats.promotores+'');
    row('  Pasivos', encStats.pasivos+'');
    row('  Detractores', encStats.detractores+'');
  }
  row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
  row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));

  h1(`7. SEMÁFORO DE INDICADORES`);
  const sem2 = (v,meta,alto=true) => {
    if(!meta||isNaN(v)) return '⬜ Sin datos';
    const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
    return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
  };
  row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
  row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
  row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
  row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
  row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
  row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
  row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
  row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
  row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
  row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));

  line();
  line(sep(60));
  line();
  line(`PREGUNTA PARA CLAUDE:`);
  line();
  line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
  line(`Te comparto el reporte completo de mi clínica arriba.`);
  line();
  line(`Con base en estos datos reales:`);
  line(`1. ¿Qué estrategias concretas de ventas me recomiendas para el próximo mes?`);
  line(`2. ¿Qué servicio debería priorizar y por qué?`);
  line(`3. ¿Cómo puedo mejorar la retención y reducir cancelaciones?`);
  line(`4. ¿Qué acciones de marketing tienen más sentido con mi presupuesto actual?`);
  line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
  line();
  line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
  line(`implementar esta semana.`);
  line(sep(60));

  navigator.clipboard.writeText(t).then(() => {
    const btn = document.getElementById('btnBriefClaude');
    const orig = btn.innerHTML;
    btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
    btn.style.background = 'var(--ok)';
    btn.style.color = '#fff';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
  }).catch(() => toast('No se pudo copiar — intenta de nuevo', 'err'));
}

// ══════════════════════════════════════════════════════════════
// ── KPI GUIA — LIVE DASHBOARD ──
// ══════════════════════════════════════════════════════════════
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
function renderEmergencia() {
  const d = window._emKPIData;
  if (!d) return;

  const now  = new Date();
  const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});

  function kpiSt(val, meta, altoEsMejor) {
    if (isNaN(val) || !meta || meta <= 0) return -1;
    const ok   = altoEsMejor ? val >= meta   : val <= meta;
    const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
    return ok ? 0 : warn ? 1 : 2;
  }

  const st = {
    sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
    mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
    cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
    leads:      kpiSt(d.leadsShow,  40,                      true),
    conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
    ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
    ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
    nps:        kpiSt(d.nps,        d.npsMeta,               true),
    enc:        kpiSt(d.encuestas,  d.encMeta,               true),
    bd:         kpiSt(d.bd,         90,                      true),
  };

  const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';

  for (const [kpi, status] of Object.entries(st)) {
    const dot  = document.getElementById('emDot_' + kpi);
    if (dot)  dot.className = 'em-dot ' + dotCls(status);
    const card = document.getElementById('emCard_' + kpi);
    if (card) {
      if (status === 2) card.classList.add('alerta');
      else              card.classList.remove('alerta');
    }
  }

  const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
  let totalRojos = 0;

  for (const [dim, kpis] of Object.entries(dims)) {
    const rojos     = kpis.filter(k => st[k] === 2).length;
    const amarillos = kpis.filter(k => st[k] === 1).length;
    totalRojos += rojos;

    const badge = document.getElementById('emDB_' + dim);
    if (badge) {
      if (rojos > 0) {
        badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
        badge.className = 'em-dim-badge has-red';
        const dimEl  = document.getElementById('emDim_' + dim);
        const bodyEl = document.getElementById('emDB_body_' + dim);
        if (dimEl && bodyEl && !dimEl.classList.contains('open')) {
          dimEl.classList.add('open');
          bodyEl.style.display = 'block';
        }
      } else if (kpis.some(k => st[k] === 0)) {
        badge.textContent = '✓ OK';
        badge.className = 'em-dim-badge all-ok';
      } else {
        badge.textContent = '—';
        badge.className = 'em-dim-badge neutral';
      }
    }
  }

  const rojoC    = Object.values(st).filter(s => s === 2).length;
  const amarilloC = Object.values(st).filter(s => s === 1).length;
  const verdeC   = Object.values(st).filter(s => s === 0).length;

  const bar = document.getElementById('emStatusBar');
  if (bar) {
    bar.innerHTML =
      (rojoC    > 0 ? `<span class="em-pill rojo">🔴 ${rojoC} en rojo</span>` : '') +
      (amarilloC > 0 ? `<span class="em-pill amarillo">🟡 ${amarilloC} en alerta</span>` : '') +
      (verdeC   > 0 ? `<span class="em-pill verde">🟢 ${verdeC} en meta</span>` : '') +
      (rojoC === 0 && amarilloC === 0 && verdeC === 0 ? '<span class="em-pill gris">Sin datos suficientes</span>' : '') +
      `<span class="em-status-ts">Actualizado ${hora}</span>`;
  }

  const crisis = document.getElementById('emCrisisBanner');
  if (crisis) crisis.style.display = totalRojos >= 3 ? 'block' : 'none';

  loadAllEmSteps();
}

function toggleEmDim(n) {
  const dimEl  = document.getElementById('emDim_' + n);
  const bodyEl = document.getElementById('emDB_body_' + n);
  if (!dimEl || !bodyEl) return;
  const open = dimEl.classList.toggle('open');
  bodyEl.style.display = open ? 'block' : 'none';
}

function toggleEmCard(id) {
  const card = document.getElementById('emCard_' + id);
  const body = document.getElementById('emBody_' + id);
  if (!card || !body) return;
  const open = card.classList.toggle('open');
  body.style.display = open ? 'block' : 'none';
  if (!open) card.classList.remove('alerta');
}

function handleEmStep(event, kpi, idx) {
  event.preventDefault();
  const ck = document.getElementById('emCk_' + kpi + '_' + idx);
  if (!ck) return;
  ck.checked = !ck.checked;
  _persistEmStep(kpi, idx, ck.checked);
}

function _persistEmStep(kpi, idx, checked) {
  const key = 'em_steps_' + kpi;
  let state = [];
  try { state = JSON.parse(kvGet(key) || '[]'); } catch(e) {}
  state[idx] = checked;
  kvSet(key, JSON.stringify(state));
  _updateEmProgress(kpi);
}

function _updateEmProgress(kpi) {
  const checks = [];
  for (let i = 0; i < 6; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (!ck) break;
    checks.push(ck.checked);
    const row = document.getElementById('emS_' + kpi + '_' + i);
    if (row) row.classList.toggle('done', ck.checked);
  }
  const total = checks.length, done = checks.filter(Boolean).length;
  const fill = document.getElementById('emPF_' + kpi);
  if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
  const meta = document.getElementById('emPM_' + kpi);
  if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
  const btn  = document.getElementById('emDB_' + kpi);
  if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
}

function loadAllEmSteps() {
  ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
    let state = [];
    try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
    state.forEach((checked, idx) => {
      const ck = document.getElementById('emCk_' + kpi + '_' + idx);
      if (ck) ck.checked = !!checked;
    });
    _updateEmProgress(kpi);
  });
}

function markEmDone(kpi, total) {
  const state = Array(total).fill(true);
  kvSet('em_steps_' + kpi, JSON.stringify(state));
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = true;
  }
  _updateEmProgress(kpi);
}

function resetEmSteps(kpi, total) {
  kvRemove('em_steps_' + kpi);
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = false;
  }
  _updateEmProgress(kpi);
}

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
function getEncuestaStats() {
  try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
}

async function loadEncuestaStats() {
  const btn  = document.getElementById('btnCargarEncuesta');
  const btn2 = document.getElementById('btnCargarEncuestaGuia');
  [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      const now = new Date();
      const m = now.getMonth()+1, y = now.getFullYear();
      const citasMes = citasReales().filter(c => {
        const [cy,cm] = normDate(c.fecha).split('-');
        return +cm===m && +cy===y;
      }).length;
      const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
      const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
      const stats   = {
        nps: npsVal, encuestas: encPct,
        totalRespuestas: d.totalMes, citasMes,
        promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
        fetchedAt: Date.now()
      };
      kvSet('encuestaStats', JSON.stringify(stats));
      // Actualizar inputs ocultos y guardar
      const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
      guardarKPIManual();
      _renderEncuestaStatsUI(stats);
      renderKPITablero();
      renderKPIGuia();
      toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
    } else {
      toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
    }
  } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
  [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
}

function _renderEncuestaStatsUI(stats) {
  if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
  const npsOk     = stats.nps !== null && stats.nps !== undefined;
  const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
  const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
  const npsEl     = document.getElementById('kpiNPSAutoTag');
  const encEl     = document.getElementById('kpiEncuestasAutoTag');
  if (npsEl) npsEl.innerHTML = npsOk
    ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
      ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
    : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
  if (encEl) encEl.innerHTML =
    `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
    ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
}

// ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];

function _rutinaKey() {
  const d = new Date();
  return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadRutinaChecks() {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  RUTINA_IDS.forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    const done = checked.includes(id);
    cb.checked = done;
    lbl.classList.toggle('done', done);
  });
}

function toggleRutinaCheck(id) {
  const cb  = document.getElementById('rck_' + id);
  const lbl = cb ? cb.closest('.gk-check-item') : null;
  if (!cb || !lbl) return;
  // Usamos un pequeño delay para leer el valor actualizado
  setTimeout(() => {
    const done = cb.checked;
    lbl.classList.toggle('done', done);
    const today = _rutinaKey();
    let checked = [];
    try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
    if (done && !checked.includes(id))  checked.push(id);
    if (!done) checked = checked.filter(x => x !== id);
    kvSet(today, JSON.stringify(checked));
  }, 0);
}

function resetRutina() {
  kvRemove(_rutinaKey());
  loadRutinaChecks();
  toast('Checklist reiniciado', 'ok');
}

function resetRutinaGrupo(prefix) {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  checked = checked.filter(id => !id.startsWith(prefix));
  kvSet(today, JSON.stringify(checked));
  RUTINA_IDS.filter(id => id.startsWith(prefix)).forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    cb.checked = false;
    lbl.classList.remove('done');
  });
  const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
  toast('Checklist ' + nombre + ' reiniciado', 'ok');
}

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

function renderPresupuestoMetas() {
  const el = document.getElementById('presupuestoBody');
  if (!el) return;
  const costos = getCostosEstructura();
  const calc   = calcTotalCostos(costos);
  const cfg    = getKPIConfig();

  const fmtN = v => Number(v).toLocaleString('es-CO');

  const inpDoble = (idP, idD, label, valP, valD) => `
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;align-items:center;gap:8px;margin-bottom:6px">
      <div style="font-size:.78rem;color:var(--text)">${label}</div>
      <input type="number" id="pm_${idP}" value="${valP}" placeholder="Presencial" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" title="Precio presencial">
      <input type="number" id="pm_${idD}" value="${valD}" placeholder="Domicilio" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid rgba(99,102,241,.3);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='rgba(99,102,241,.3)'" title="Precio domicilio">
    </div>`;

  const inp = (id, label, val, note='', tipo='number') => `
    <div>
      <label style="font-size:.75rem;color:var(--muted);display:block;margin-bottom:4px;font-family:var(--font-m)">${label}${note?`<span style="font-size:.68rem;color:var(--primary);margin-left:5px">${note}</span>`:''}</label>
      <input type="${tipo}" id="pm_${id}" value="${val}" oninput="pmRecalc()"
        style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
    </div>`;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">

      <!-- COLUMNA IZQUIERDA: COSTOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">💼 Costos Fijos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('honorarios_fisio',  'Honorarios Fisio',       costos.honorarios_fisio)}
            ${inp('seguridad_social',  'Seguridad Social',       costos.seguridad_social)}
            ${inp('asistente_fisio',   'Asistente Fisio',        costos.asistente_fisio)}
            ${inp('auxiliar_admin',    'Auxiliar Administrativa', costos.auxiliar_admin)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🏢 Costos Operativos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('arriendo',           'Arriendo',            costos.arriendo)}
            ${inp('servicios_publicos', 'Servicios públicos',  costos.servicios_publicos)}
            ${inp('suscripcion_ia',     'Suscripción IA',      costos.suscripcion_ia)}
            ${inp('suscripcion_capcut', 'Suscripción CapCut',  costos.suscripcion_capcut)}
            ${inp('asesorias_ap',       'Asesorías AP x4/Mes', costos.asesorias_ap)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📣 Costos Variables</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('redes_contenido',    'Redes Sociales Contenido',  costos.redes_contenido)}
            ${inp('activacion_eventos', 'Activación marca-Eventos',  costos.activacion_eventos)}
            ${inp('pautas_redes',       'Pautas Redes',              costos.pautas_redes)}
            ${inp('mantenimiento',      'Mantenimiento y compras',   costos.mantenimiento)}
            ${inp('insumos',            'Insumos',                   costos.insumos)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📊 Porcentajes adicionales</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('pct_imprevistos', 'Fondo Imprevistos (%)', costos.pct_imprevistos)}
            ${inp('pct_utilidad',    'Utilidad Deseada (%)',  costos.pct_utilidad)}
          </div>
        </div>

        <!-- Resumen calculado -->
        <div class="card" style="background:rgba(27,191,176,.05);border:1.5px solid rgba(27,191,176,.3)">
          <div class="card-title" style="margin-bottom:12px">🧮 Resultado calculado</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">SUBTOTAL COSTOS</div>
              <div id="pm_res_subtotal" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${fmtN(calc.subtotal)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">IMPREVISTOS</div>
              <div id="pm_res_imprevistos" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:#f59e0b">$${fmtN(calc.imprevistos)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">UTILIDAD OBJETIVO</div>
              <div id="pm_res_utilidad" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--ok)">$${fmtN(calc.utilidad)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--primary);border-radius:8px">
              <div style="font-size:.7rem;color:rgba(0,0,0,.6);font-family:var(--font-m);margin-bottom:3px">META TOTAL / MES</div>
              <div id="pm_res_total" style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:#0D0D0D">$${fmtN(calc.total)}</div>
            </div>
          </div>
        </div>

        <button onclick="pmGuardarCostos()"
          style="padding:12px 24px;background:var(--primary);color:#0D0D0D;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar presupuesto y actualizar metas
        </button>

      </div>

      <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
            ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
            ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
            ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
            ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
            ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
            ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
            ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
          <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>

          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
            <div></div>
            <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
            <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
          </div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Descargas musculares</div>
          ${inpDoble('sv_cuello_p','sv_cuello_d','Cuello y Espalda',cfg.sv_cuello_p||75000,cfg.sv_cuello_d||90000)}
          ${inpDoble('sv_piernas_p','sv_piernas_d','Piernas',cfg.sv_piernas_p||75000,cfg.sv_piernas_d||90000)}
          ${inpDoble('sv_completa_p','sv_completa_d','Completa (Full)',cfg.sv_completa_p||110000,cfg.sv_completa_d||125000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Sesiones individuales</div>
          ${inpDoble('sv_valoracion_p','sv_valoracion_d','Valoración Funcional',cfg.sv_valoracion_p||80000,cfg.sv_valoracion_d||95000)}
          ${inpDoble('sv_readap_p','sv_readap_d','Readaptación Funcional',cfg.sv_readap_p||70000,cfg.sv_readap_d||85000)}
          ${inpDoble('sv_express_p','sv_express_d','Descarga Express',cfg.precio_express||75000,cfg.sv_express_d||90000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Combos y sesiones especiales</div>
          ${inpDoble('sv_diag_p','sv_diag_d','Combo Diagnóstico Pro',cfg.sv_diag_p||160000,cfg.sv_diag_d||185000)}
          ${inpDoble('sv_bienvenida_p','sv_bienvenida_d','Combo Bienvenida',cfg.sv_bienvenida_p||120000,cfg.sv_bienvenida_d||120000)}
          ${inpDoble('sv_mini_p','sv_mini_d','Mini-sesión Familiar 20min',cfg.sv_mini_p||40000,cfg.sv_mini_d||40000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Paquetes Readaptación</div>
          ${inpDoble('sv_pkInicio_p','sv_pkInicio_d','Paquete Inicio (6 ses)',cfg.sv_pkInicio_p||378000,cfg.sv_pkInicio_d||469000)}
          ${inpDoble('sv_pkAvance_p','sv_pkAvance_d','Paquete Avance (8 ses)',cfg.sv_pkAvance_p||476000,cfg.sv_pkAvance_d||598000)}
          ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
          ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
          ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
          ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}

          <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
            💡 Ticket promedio individual (sesiones sueltas):
            <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
            · Sesiones necesarias/mes:
            <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
            ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
            ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
          </div>
        </div>

        <button onclick="pmGuardarKPIs()"
          style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar metas de KPIs
        </button>

      </div>
    </div>`;
}

function pmRecalc() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const c = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc  = calcTotalCostos(c);
  const fmtN  = v => Number(v).toLocaleString('es-CO');
  const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
  set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
  set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
  set('pm_res_total',       '$' + fmtN(calc.total));
  // Actualizar ticket promedio
  // Ticket promedio = promedio de los 6 servicios individuales (presencial)
  const indivPrecios = [
    g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
    g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
  ];
  const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
  const ta = document.getElementById('pm_ticket_avg');
  const sc = document.getElementById('pm_sess_calc');
  if (ta) ta.textContent = '$' + fmtN(ticket);
  if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
}

function pmGuardarCostos() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const costos = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc = calcTotalCostos(costos);
  saveCostosEstructura(costos);
  // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
  const cfg = getKPIConfig();
  const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
  if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
    cfg.meta_ventas_mes = inputMeta;
    kvSet('kpiConfig', JSON.stringify(cfg));
    META_VENTAS_MES    = inputMeta;
    META_VENTAS_SEMANA = Math.round(inputMeta / 4);
    kvSet('metaMensual', inputMeta);
  }
  reloadMetas();
  applyKPIRefSpans();
  toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
  renderPresupuestoMetas();
}

function pmGuardarKPIs() {
  const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
  const cfg = getKPIConfig();
  // Metas operativas
  cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
  cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
  cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
  cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
  cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
  cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
  cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
  cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
  // Marketing
  cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
  cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
  cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
  // Precios servicios (presencial y domicilio)
  cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
  cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
  cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
  cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
  cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
  cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
  cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
  cfg.sv_valoracion_d       = g('sv_valoracion_d')|| 95000;
  cfg.sv_readap_p           = g('sv_readap_p')    || 70000;
  cfg.sv_readap_d           = g('sv_readap_d')    || 85000;
  cfg.precio_express        = g('sv_express_p')   || 75000;
  cfg.sv_express_d          = g('sv_express_d')   || 90000;
  cfg.sv_diag_p             = g('sv_diag_p')      || 160000;
  cfg.sv_diag_d             = g('sv_diag_d')      || 185000;
  cfg.sv_bienvenida_p       = g('sv_bienvenida_p')|| 120000;
  cfg.sv_bienvenida_d       = g('sv_bienvenida_d')|| 120000;
  cfg.sv_mini_p             = g('sv_mini_p')      || 40000;
  cfg.sv_mini_d             = g('sv_mini_d')      || 40000;
  cfg.sv_pkInicio_p         = g('sv_pkInicio_p')  || 378000;
  cfg.sv_pkInicio_d         = g('sv_pkInicio_d')  || 469000;
  cfg.sv_pkAvance_p         = g('sv_pkAvance_p')  || 476000;
  cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
  cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
  cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
  cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
  cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
  cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
  cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
  cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
  cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
  // Mantener precio_full apuntando a Completa
  cfg.precio_full           = cfg.sv_completa_p;
  kvSet('kpiConfig', JSON.stringify(cfg));
  kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
  META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
  // Actualizar autoFillPrice con los nuevos precios
  _syncPreciosToAutoFill(cfg);
  reloadMetas();
  applyKPIRefSpans();
  actualizarMetaBarra(calcCobradoMes());
  toast('✅ Precios y metas guardados', 'ok');
  renderPresupuestoMetas();
}

function _syncPreciosToAutoFill(cfg) {
  // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
  window._preciosOverride = {
    'Descarga Muscular — Cuello y Espalda': { Presencial: '$'+Number(cfg.sv_cuello_p||75000).toLocaleString('es-CO'),    Domicilio: '$'+Number(cfg.sv_cuello_d||90000).toLocaleString('es-CO') },
    'Descarga Muscular — Piernas':          { Presencial: '$'+Number(cfg.sv_piernas_p||75000).toLocaleString('es-CO'),   Domicilio: '$'+Number(cfg.sv_piernas_d||90000).toLocaleString('es-CO') },
    'Descarga Muscular Completa':           { Presencial: '$'+Number(cfg.sv_completa_p||110000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_completa_d||125000).toLocaleString('es-CO') },
    'Valoración Funcional':                 { Presencial: '$'+Number(cfg.sv_valoracion_p||80000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_valoracion_d||95000).toLocaleString('es-CO') },
    'Readaptación Funcional':               { Presencial: '$'+Number(cfg.sv_readap_p||70000).toLocaleString('es-CO'),   Domicilio: '$'+Number(cfg.sv_readap_d||85000).toLocaleString('es-CO') },
    'Combo Diagnóstico Pro':                { Presencial: '$'+Number(cfg.sv_diag_p||160000).toLocaleString('es-CO'),    Domicilio: '$'+Number(cfg.sv_diag_d||185000).toLocaleString('es-CO') },
    'Combo Bienvenida':                     { Presencial: '$'+Number(cfg.sv_bienvenida_p||120000).toLocaleString('es-CO'),Domicilio:'$'+Number(cfg.sv_bienvenida_d||120000).toLocaleString('es-CO') },
    'Mini-sesión Familiar 20 min':          { Presencial: '$'+Number(cfg.sv_mini_p||40000).toLocaleString('es-CO'),     Domicilio: '$'+Number(cfg.sv_mini_d||40000).toLocaleString('es-CO') },
    'Paquete Recuperación Full':            { Presencial: '$'+Number(cfg.sv_pkRecup_p||264000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_pkRecup_d||264000).toLocaleString('es-CO') },
    'Paquete Readaptación Inicio':          { Presencial: '$'+Number(cfg.sv_pkInicio_p||378000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_pkInicio_d||469000).toLocaleString('es-CO') },
    'Paquete Readaptación Avance':          { Presencial: '$'+Number(cfg.sv_pkAvance_p||476000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_pkAvance_d||598000).toLocaleString('es-CO') },
    'Paquete Readaptación Total':           { Presencial: '$'+Number(cfg.sv_pkTotal_p||560000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_pkTotal_d||722000).toLocaleString('es-CO') },
    'Plan Activo':                          { Presencial: '$'+Number(cfg.sv_planActivo_p||135000).toLocaleString('es-CO'),Domicilio:'$'+Number(cfg.sv_planActivo_d||165000).toLocaleString('es-CO') },
    'Plan Pro':                             { Presencial: '$'+Number(cfg.sv_planPro_p||230000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_planPro_d||275000).toLocaleString('es-CO') },
  };
}

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
function _checkAutoAtendida() {
  const nowMs = Date.now();
  const pendientes = (allData.citas || []).filter(c => {
    if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
    if (esRegistroServ(c.servicio)) return false;
    const f = normDate(c.fecha);
    if (!f || !c.hora) return false;
    const [hh, mm] = c.hora.split(':').map(Number);
    const citaEnd = new Date(f + 'T' + c.hora);
    citaEnd.setMinutes(citaEnd.getMinutes() + 60);
    return citaEnd.getTime() < nowMs;
  });
  window._autoAtendidaList = pendientes;
  const banner = document.getElementById('bannerAutoAtendida');
  const txt    = document.getElementById('bannerAutoAtendidaTxt');
  if (!banner) return;
  banner.style.display = pendientes.length > 0 ? 'flex' : 'none';
  if (txt && pendientes.length) txt.textContent = `${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pasada${pendientes.length !== 1 ? 's' : ''} aún sin marcar como Atendida`;
}

async function marcarTodasAtendidas() {
  const pendientes = window._autoAtendidaList || [];
  if (!pendientes.length) { toast('No hay citas pendientes de cierre.'); return; }
  window._agendaFiltroPendienteCierre = true;
  showView('agenda');
  if (typeof renderAgenda === 'function') renderAgenda();
  toast(`${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} de cierre. Revísalas manualmente.`);
}

// ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
function _checkCobrosPendientes() {
  const hoyStr = today();
  const pendientes = citasReales().filter(c => {
    if (c.estado !== 'Atendida') return false;
    if (c.pago) return false;
    if (kvGet('pago_' + c.id) === '1') return false;
    if (parsePrecio(c.precio) === 0) return false;
    const f = normDate(c.fecha);
    if (!f) return false;
    const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
    return diff >= 3;
  });
  const banner = document.getElementById('bannerCobros');
  const txtEl  = document.getElementById('bannerCobrosTxt');
  const lista  = document.getElementById('bannerCobrosLista');
  if (!banner) return;
  if (!pendientes.length) { banner.style.display = 'none'; return; }
  banner.style.display = 'block';
  if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
  if (lista) lista.innerHTML = pendientes.map(c => {
    const tel = (c.telefono || '').replace(/\D/g, '');
    const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
    const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
      <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
      <div style="display:flex;gap:6px">
        ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
      </div>
    </div>`;
  }).join('');
}



// ── Alerta semana floja ──
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

function _ingFmt(d) { return d.toLocalDateStr(); }
function _ingFmtLabel(d) { return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short'}); }
function _ingFmtMes(d) { return d.toLocaleDateString('es-CO',{month:'long',year:'numeric'}); }

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
function _analisisSemana({ totalSem, nCitas, ticketProm, diffSem, pctDiff, mejorDia, topSrvSem, nuevosSem, recSem, totalAnt, nCitasAnt, dias, lunes }) {
  const positivos = [];
  const alertas   = [];
  const recs      = [];

  const DIAS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const toStr = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');

  // ── Histórico: últimas 12 semanas (excluye la semana seleccionada) ──
  const lunD = lunes instanceof Date ? lunes : new Date((lunes||today())+'T12:00:00');
  const lunesHace12 = new Date(lunD); lunesHace12.setDate(lunD.getDate()-84);
  const histCitas = (allData.citas||[]).filter(c => {
    const f = normDate(c.fecha); if (!f) return false;
    const fD = new Date(f+'T12:00:00');
    return fD < lunD && fD >= lunesHace12;
  });

  // Promedio por día de semana (dow 0=Dom … 6=Sáb)
  const histDow = {};
  histCitas.forEach(c => {
    const f = normDate(c.fecha); if (!f) return;
    const d = new Date(f+'T12:00:00');
    const dow = d.getDay();
    const lu2 = new Date(d); lu2.setDate(d.getDate()-(dow===0?6:dow-1));
    const semKey = toStr(lu2);
    if (!histDow[dow]) histDow[dow] = { totalAcum:0, nCitas:0, semanas:new Set() };
    histDow[dow].totalAcum += parsePrecio(c.precio);
    histDow[dow].nCitas++;
    histDow[dow].semanas.add(semKey);
  });
  const histDowProm = {};
  Object.entries(histDow).forEach(([dow, h]) => {
    const nSem = h.semanas.size||1;
    histDowProm[dow] = { avgTotal: Math.round(h.totalAcum/nSem), avgCitas: +(h.nCitas/nSem).toFixed(1) };
  });

  // Mejor hora histórica (acumulado)
  const histHr = {};
  histCitas.forEach(c => {
    const h = (c.hora||'').split(':')[0]; if (!h) return;
    if (!histHr[h]) histHr[h]={total:0,n:0};
    histHr[h].total+=parsePrecio(c.precio); histHr[h].n++;
  });
  const histHrTop = Object.entries(histHr).sort((a,b)=>b[1].total-a[1].total)[0];

  // Servicio más rentable histórico
  const histSrvMap = {};
  histCitas.forEach(c => { const k=c.servicio||'—'; if(!histSrvMap[k])histSrvMap[k]={total:0,n:0}; histSrvMap[k].total+=parsePrecio(c.precio);histSrvMap[k].n++; });
  const histSrvTop = Object.entries(histSrvMap).sort((a,b)=>b[1].total-a[1].total)[0];

  // Ticket histórico promedio
  const ticketHist = histCitas.length>0 ? Math.round(histCitas.reduce((s,c)=>s+parsePrecio(c.precio),0)/histCitas.length) : 0;

  // Días hábiles de la semana seleccionada
  const diasHab = dias.filter(d=>!['Sábado','Domingo'].includes(d.dia));

  // Días que superaron / quedaron por debajo de su promedio histórico
  const winsDay=[], gapsDay=[];
  diasHab.forEach(d => {
    const dow = new Date(d.fecha+'T12:00:00').getDay();
    const hist = histDowProm[dow];
    if (!hist) return;
    if (d.total >= hist.avgTotal*1.2 && hist.avgTotal>0 && d.citas.length>0) winsDay.push({...d, avg:hist.avgTotal});
    else if (d.citas.length < hist.avgCitas*0.5 && hist.avgCitas>=1) gapsDay.push({...d, avgCitas:hist.avgCitas, avgTotal:hist.avgTotal});
  });

  // ── \u2705 LO QUE HICISTE BIEN (para repetir) ──
  if (pctDiff!==null && pctDiff>=20)
    positivos.push(`Semana excelente: ingresaste <strong>${pctDiff}% más</strong> que la semana anterior ($${Math.abs(diffSem).toLocaleString('es-CO')} adicionales). Mantén ese ritmo.`);
  else if (pctDiff!==null && pctDiff>=5)
    positivos.push(`Semana en crecimiento: <strong>+${pctDiff}%</strong> respecto a la semana anterior.`);

  winsDay.slice(0,2).forEach(w =>
    positivos.push(`El <strong>${w.dia}</strong> fue excepcionalmente bueno — $${w.total.toLocaleString('es-CO')} con ${w.citas.length} cita${w.citas.length!==1?'s':''}, muy por encima de tu promedio histórico ($${w.avg.toLocaleString('es-CO')}). Repite ese volumen.`)
  );

  if (recSem>0 && recSem>=nuevosSem)
    positivos.push(`<strong>${recSem} pacientes recurrentes</strong> esta semana — tu retención es sólida. Estos pacientes confían en ti.`);

  if (ticketHist>0 && ticketProm>ticketHist*1.1)
    positivos.push(`Ticket promedio de <strong>$${ticketProm.toLocaleString('es-CO')}</strong>, superior a tu promedio histórico ($${ticketHist.toLocaleString('es-CO')}). Buen mix de servicios.`);

  if (nuevosSem>=2)
    positivos.push(`<strong>${nuevosSem} pacientes nuevos</strong> esta semana — excelente captación. Activa el seguimiento automático para fidelizarlos.`);

  if (topSrvSem[0] && nCitas>0 && topSrvSem[0][1]/nCitas>=0.5)
    positivos.push(`El <strong>${topSrvSem[0][0]}</strong> fue tu servicio estrella esta semana (${topSrvSem[0][1]} de ${nCitas} sesiones). Si es rentable, sigue priorizándolo.`);

  // ── ⚠️ LO QUE PODRÍAS MEJORAR ──
  if (pctDiff!==null && pctDiff<=-20)
    alertas.push(`Caída del <strong>${Math.abs(pctDiff)}%</strong> respecto a la semana anterior ($${Math.abs(diffSem).toLocaleString('es-CO')} menos). Revisa si hubo cancelaciones o días sin agenda.`);
  else if (pctDiff!==null && pctDiff<0)
    alertas.push(`Leve baja del ${Math.abs(pctDiff)}% vs semana anterior.`);

  gapsDay.slice(0,2).forEach(g => {
    if (g.citas.length===0)
      alertas.push(`El <strong>${g.dia}</strong> quedó sin citas — históricamente promedias ${g.avgCitas.toFixed(1)} cita${g.avgCitas===1?'':'s'} y $${g.avgTotal.toLocaleString('es-CO')} ese día. Es un espacio a recuperar.`);
    else
      alertas.push(`El <strong>${g.dia}</strong> tuvo solo ${g.citas.length} cita${g.citas.length===1?'':'s'} cuando históricamente promedias ${g.avgCitas.toFixed(1)}. Aún hay capacidad sin usar.`);
  });

  const diasSinCitas = diasHab.filter(d=>d.citas.length===0);
  if (diasSinCitas.length>=2 && !gapsDay.some(g=>g.citas.length===0))
    alertas.push(`${diasSinCitas.length} días hábiles sin citas (<strong>${diasSinCitas.map(d=>d.dia).join(', ')}</strong>). Publica disponibilidad o envía recordatorios esos días.`);

  if (ticketHist>0 && ticketProm<ticketHist*0.85 && nCitas>0)
    alertas.push(`Ticket promedio de <strong>$${ticketProm.toLocaleString('es-CO')}</strong>, por debajo de tu promedio histórico ($${ticketHist.toLocaleString('es-CO')}). Puede haber descuentos o más sesiones de bajo precio.`);

  // ── 💡 RECOMENDACIONES BASADAS EN TUS DATOS ──
  // Mejor día de semana histórico
  const mejorDowEntry = Object.entries(histDowProm)
    .filter(([d])=>![0,6].includes(+d))
    .sort((a,b)=>b[1].avgTotal-a[1].avgTotal)[0];
  if (mejorDowEntry) {
    const dNom = DIAS_ES[+mejorDowEntry[0]];
    const dataDow = dias.find(d=>d.dia===dNom);
    if (!dataDow||dataDow.total<mejorDowEntry[1].avgTotal*0.7)
      recs.push(`El <strong>${dNom}</strong> es históricamente tu día más rentable (promedio $${mejorDowEntry[1].avgTotal.toLocaleString('es-CO')}). ${!dataDow||dataDow.citas.length===0?'Esta semana no tuviste citas ese día':'Esta semana estuvo por debajo'} — intenta maximizarlo la próxima semana.`);
  }

  // Mejor hora histórica
  if (histHrTop)
    recs.push(`Tu horario más productivo históricamente es las <strong>${histHrTop[0]}:00</strong> (${histHrTop[1].n} sesiones en 12 semanas, $${histHrTop[1].total.toLocaleString('es-CO')} acumulados). Prioriza agendar en ese bloque.`);

  // Servicio más rentable histórico vs el de esta semana
  if (histSrvTop && topSrvSem[0] && histSrvTop[0]!==topSrvSem[0][0])
    recs.push(`Históricamente tu servicio más rentable es <strong>${histSrvTop[0]}</strong> ($${histSrvTop[1].total.toLocaleString('es-CO')} acumulados), pero esta semana predominó <strong>${topSrvSem[0][0]}</strong>. Evalúa si puedes agenda más ${histSrvTop[0]} la próxima semana.`);

  // Si la semana fue buena: refuerzo
  if (positivos.length>=2 && (pctDiff===null||pctDiff>=0))
    recs.push(`Semana con buen desempeño. Para sostenerlo, replica el patrón del <strong>${mejorDia.dia}</strong> (tu mejor día de la semana con $${mejorDia.total.toLocaleString('es-CO')}) y mantén ese nivel de agenda.`);

  // Si no hay histórico suficiente, nota informativa
  if (histCitas.length<5 && !positivos.length && !alertas.length)
    recs.push(`Aún hay pocos datos históricos para comparar. El análisis se enriquecerá a medida que registres más semanas.`);

  return _renderAnalisis('📊 Análisis de la semana', positivos, alertas, recs);
}

// ── Análisis financiero mensual ──
function _analisisMes({ totalMes, nCitasMes, ticketM, diffMes, pctDiffM, mejorDiaMes, peorDiaMes, topSrvMes, nuevosMes, recMes, totalMesAnt, nCitasMesAnt, semanas, meta, diasMes, mesNombre }) {
  const recs = [];
  const alertas = [];
  const positivos = [];

  // vs mes anterior
  if (pctDiffM !== null) {
    if (pctDiffM >= 15)    positivos.push(`🚀 Mes excelente: <strong>+${pctDiffM}%</strong> respecto al mes anterior ($${Math.abs(diffMes).toLocaleString('es-CO')} más). ¡Sigue así!`);
    else if (pctDiffM >= 5) positivos.push(`📈 Crecimiento sólido del ${pctDiffM}% vs el mes pasado.`);
    else if (pctDiffM < -15) alertas.push(`🔴 Caída del <strong>${Math.abs(pctDiffM)}%</strong> vs el mes anterior. Analiza qué semanas tuvieron menos citas y si hubo cancelaciones masivas.`);
    else if (pctDiffM < 0) alertas.push(`📉 Leve caída del ${Math.abs(pctDiffM)}% vs el mes anterior.`);
    else positivos.push(`📊 Mes estable respecto al anterior.`);
  }

  // Meta
  if (meta) {
    const pctMeta = Math.round(totalMes/meta*100);
    if (pctMeta >= 100) positivos.push(`¡Meta cumplida! Alcanzaste el <strong>${pctMeta}%</strong> de tu meta de $${meta.toLocaleString('es-CO')}.`);
    else if (pctMeta >= 80) recs.push(`Alcanzaste el ${pctMeta}% de la meta. Faltaron $${(meta-totalMes).toLocaleString('es-CO')} — considera intensificar en días con espacio disponible.`);
    else if (pctMeta < 60) alertas.push(`⚠️ Solo el ${pctMeta}% de la meta mensual. Considera revisar tu estrategia de precios o captar nuevos pacientes.`);
  }

  // Ticket promedio
  const ticketAntM = nCitasMesAnt>0 ? Math.round(totalMesAnt/nCitasMesAnt) : 0;
  if (ticketM > 0) recs.push(`💰 Ticket promedio del mes: <strong>$${ticketM.toLocaleString('es-CO')}</strong>${ticketAntM>0?' (mes anterior: $'+ticketAntM.toLocaleString('es-CO')+')':''}.`);

  // Semana más fuerte
  if (semanas.length) {
    const mejorSem = [...semanas].sort((a,b)=>b.total-a.total)[0];
    const luS = new Date(mejorSem.lunesStr+'T12:00:00');
    const doS = new Date(luS); doS.setDate(luS.getDate()+6);
    positivos.push(`📅 Mejor semana del mes: <strong>${_ingFmtLabel(luS)} al ${_ingFmtLabel(doS)}</strong> — $${mejorSem.total.toLocaleString('es-CO')} (${mejorSem.n} citas).`);
  }

  // Mejor y peor día
  if (mejorDiaMes.total>0) recs.push(`🏆 Mejor día: <strong>${mejorDiaMes.dia} ${mejorDiaMes.num}</strong> con $${mejorDiaMes.total.toLocaleString('es-CO')}. Analiza qué hiciste diferente ese día.`);
  if (peorDiaMes) recs.push(`📉 Día con menor ingreso: ${peorDiaMes.dia} ${peorDiaMes.num} ($${peorDiaMes.total.toLocaleString('es-CO')}). Puede ser un patrón a corregir.`);

  // Servicios
  if (topSrvMes[0]) recs.push(`🥇 Servicio más vendido: <strong>${topSrvMes[0][0]}</strong> (${topSrvMes[0][1]} sesiones — ${Math.round(topSrvMes[0][1]/nCitasMes*100)}% del total). Asegura disponibilidad para este servicio.`);
  if (topSrvMes.length>1) recs.push(`📦 También destacaron: ${topSrvMes.slice(1,3).map(([s,n])=>`<strong>${s}</strong> (${n})`).join(' y ')}.`);

  // Nuevos vs recurrentes
  if (nuevosMes+recMes>0) {
    const pctRec = Math.round(recMes/(nuevosMes+recMes)*100);
    if (pctRec >= 60) positivos.push(`🔁 Alta fidelización: ${pctRec}% de sesiones fueron de pacientes recurrentes. Excelente retención.`);
    else if (nuevosMes > recMes) recs.push(`👥 Este mes captaste <strong>${nuevosMes} pacientes nuevos</strong> — asegúrate de darles seguimiento para convertirlos en recurrentes.`);
  }

  // Consistencia de semanas
  const totalesSem = semanas.map(s=>s.total);
  const promSem = totalesSem.reduce((a,b)=>a+b,0)/totalesSem.length;
  const varianza = Math.sqrt(totalesSem.reduce((a,b)=>a+Math.pow(b-promSem,2),0)/totalesSem.length);
  if (varianza > promSem*0.5 && semanas.length>=3) alertas.push(`📊 Alta variabilidad entre semanas (coeficiente de variación alto). Intenta distribuir citas más uniformemente para ingresos más estables.`);
  else if (semanas.length>=3) positivos.push(`📊 Ingresos relativamente <strong>consistentes semana a semana</strong>. Buen ritmo de trabajo.`);

  return _renderAnalisis(`📋 Análisis financiero — ${mesNombre}`, positivos, alertas, recs);
}

function _renderAnalisis(titulo, positivos, alertas, recs) {
  if (!positivos.length && !alertas.length && !recs.length) return '';
  const block = (items, bg, border, color, icon) => items.length
    ? `<div style="margin-bottom:12px">${items.map(t=>`<div style="display:flex;gap:10px;padding:10px 14px;background:${bg};border:1px solid ${border};border-radius:8px;margin-bottom:6px;font-size:.83rem;line-height:1.5"><span>${icon}</span><span style="color:${color}">${t}</span></div>`).join('')}</div>` : '';
  return `<div style="border-top:1px solid var(--border);padding-top:20px">
    <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;margin-bottom:14px;color:var(--text)">${titulo}</div>
    ${block(positivos,'rgba(5,150,105,.06)','rgba(5,150,105,.2)','#065f46','\u2705')}
    ${block(alertas,'rgba(239,68,68,.06)','rgba(239,68,68,.2)','#991b1b','⚠️')}
    ${block(recs,'rgba(27,191,176,.06)','rgba(27,191,176,.2)','#0e7c73','💡')}
  </div>`;
}

// ══════════════════════════════════════════════════════════════
// ── TAREAS DEL DÍA ──
// ══════════════════════════════════════════════════════════════
const _TPL_DEFAULT = {
  descarga:     'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Han pasado {dias_desde_sesion} dias desde tu {tipo_servicio} del {fecha_sesion}. Como te has sentido? Notas mejoria en la zona trabajada? Cualquier molestia me cuentas para ajustar tu proximo plan. \uD83D\uDCAA',
  valoracion:   'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Como te has sentido despues de la {tipo_servicio} de ayer ({fecha_sesion})? Si tienes alguna duda sobre los hallazgos o el plan que conversamos, quedo atenta. \uD83D\uDE4F',
  readaptacion: 'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Como te ha ido con los ejercicios del plan de ayer ({fecha_sesion})? Recuerda hacer las repeticiones que acordamos. Si sientes alguna molestia o duda, me cuentas para ajustarlo. \uD83D\uDCAA'
};
let _tareaFiltros = new Set(['pendiente','vencida','completada']);

function getTplTarea(tipo) { return kvGet('tpl_seg_'+tipo) || _TPL_DEFAULT[tipo] || ''; }
function guardarPlantillaTarea(tipo) {
  const el = document.getElementById('tpl'+tipo.charAt(0).toUpperCase()+tipo.slice(1));
  if (!el) return;
  kvSet('tpl_seg_'+tipo, el.value);
  toast('Plantilla guardada');
}
function initTareasConfig() {
  ['descarga','valoracion','readaptacion'].forEach(t => {
    const el = document.getElementById('tpl'+t.charAt(0).toUpperCase()+t.slice(1));
    if (el) el.value = getTplTarea(t);
  });
}
function _tareaKey(c) {
  return 'tarea_' + normDate(c.fecha) + '_' + (c.nombre||'').replace(/\s/g,'_') + '_' + (c.servicio||'').slice(0,10).replace(/\s/g,'_');
}
function _tareaEstado(c) { return kvGet(_tareaKey(c)+'_estado') || 'pendiente'; }
function _tareaFechaTipo(c) {
  const s = (c.servicio||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  if (s.includes('descarga'))     return { tipo:'descarga',     diasDelay:2, label:'Descarga muscular' };
  if (s.includes('valoracion'))   return { tipo:'valoracion',   diasDelay:1, label:'Valoración funcional' };
  if (s.includes('readaptacion')) return { tipo:'readaptacion', diasDelay:1, label:'Readaptación funcional' };
  return null;
}
function generarTareas() {
  const hoyStr = today();
  const hoy = new Date(hoyStr+'T12:00:00');
  const tareas = [], seen = new Set();
  allData.citas.forEach(c => {
    if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return;
    const ft = _tareaFechaTipo(c);
    if (!ft) return;
    const fSesion = normDate(c.fecha);
    if (!fSesion) return;
    if (fSesion < ADMIN_OPERATIONS_START_DATE) return;
    const diasDiff = Math.round((hoy - new Date(fSesion+'T12:00:00')) / 86400000);
    if (diasDiff < ft.diasDelay) return;
    const key = fSesion+'_'+(c.nombre||'')+'_'+ft.tipo;
    if (seen.has(key)) return;
    seen.add(key);
    const estado = _tareaEstado(c);
    const posponerHasta = kvGet(_tareaKey(c)+'_posponer');
    if (posponerHasta && hoyStr < posponerHasta) return;
    const vencida = diasDiff > ft.diasDelay + 3 && estado === 'pendiente';
    tareas.push({ c, ft, fSesion, diasDesde: diasDiff, estado: vencida ? 'vencida' : estado });
  });
  return tareas.sort((a,b) => {
    const ord = {vencida:0,pendiente:1,completada:2};
    return (ord[a.estado]??3)-(ord[b.estado]??3) || a.fSesion.localeCompare(b.fSesion);
  });
}
function toggleTareaFiltro(f) {
  if (_tareaFiltros.has(f)) _tareaFiltros.delete(f); else _tareaFiltros.add(f);
  const map = {pendiente:'tareaChipPend',vencida:'tareaChipVenc',completada:'tareaChipComp'};
  Object.entries(map).forEach(([k,id]) => { const el = document.getElementById(id); if (el) el.classList.toggle('active',_tareaFiltros.has(k)); });
  _renderTareasLista(generarTareas());
}
function renderTareas() {
  const tareas = generarTareas();
  const pend = tareas.filter(t=>t.estado==='pendiente').length;
  const venc = tareas.filter(t=>t.estado==='vencida').length;
  const comp = tareas.filter(t=>t.estado==='completada').length;
  ['tareaCountPend','tareaCountVenc','tareaCountComp'].forEach((id,i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = [pend,venc,comp][i];
  });
  const badge = document.getElementById('badgeTareas');
  const total = pend + venc;
  if (badge) { badge.textContent = total; badge.style.display = total>0?'inline':'none'; }
  const banner = document.getElementById('bannerTareas');
  if (banner) {
    banner.style.display = total > 0 ? 'flex' : 'none';
    const txt = document.getElementById('bannerTareasTxt');
    if (txt) txt.textContent = `⚠️ Tienes ${total} tarea${total!==1?'s':''} de seguimiento pendiente${total!==1?'s':''} hoy`;
  }
  _renderTareasLista(tareas);
}
function _renderTareasLista(tareas) {
  const lista = document.getElementById('tareasLista');
  if (!lista) return;
  const filtroTipo = (document.getElementById('tareaFiltroTipo')||{}).value || '';
  let filtradas = tareas.filter(t => _tareaFiltros.has(t.estado));
  if (filtroTipo) filtradas = filtradas.filter(t => t.ft.tipo === filtroTipo);
  if (!filtradas.length) {
    lista.innerHTML = '<div class="empty" style="padding:50px 20px"><p>No hay tareas en estas categorías 🎉</p></div>';
    return;
  }
  lista.innerHTML = filtradas.map(t => {
    const { c, ft, fSesion, diasDesde, estado } = t;
    const tpl = getTplTarea(ft.tipo)
      .replace(/\{nombre\}/g, c.nombre||'').replace(/\{fecha_sesion\}/g, fmtDate(fSesion))
      .replace(/\{tipo_servicio\}/g, ft.label).replace(/\{dias_desde_sesion\}/g, diasDesde);
    const tel = (c.telefono||'').replace(/\D/g,'');
    const waLink = tel ? `https://wa.me/57${tel}?text=${encodeURIComponent(tpl)}` : '#';
    const colorB = estado==='vencida'?'rgba(239,68,68,.35)':estado==='completada'?'rgba(5,150,105,.3)':'rgba(27,191,176,.25)';
    const colorBg = estado==='vencida'?'rgba(239,68,68,.04)':estado==='completada'?'rgba(5,150,105,.04)':'';
    const key = _tareaKey(c);
    const notas = kvGet(key+'_notas')||'';
    const ts    = kvGet(key+'_ts')||'';
    const colorChip = estado==='vencida'?'#dc2626':estado==='completada'?'#059669':'var(--primary)';
    const bgChip    = estado==='vencida'?'rgba(239,68,68,.12)':estado==='completada'?'rgba(5,150,105,.12)':'rgba(27,191,176,.1)';
    return `<div style="border:1.5px solid ${colorB};border-radius:14px;padding:16px 20px;background:${colorBg}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700">${c.nombre||'—'}</div>
          <div style="font-size:.8rem;color:var(--muted);margin-top:2px">${ft.label} · Sesión: ${fmtDate(fSesion)} · <strong>${diasDesde} días</strong> transcurridos</div>
        </div>
        <span style="font-size:.75rem;font-weight:700;padding:3px 10px;border-radius:99px;background:${bgChip};color:${colorChip}">${estado==='vencida'?'⚠️ Vencida':estado==='completada'?'✓ Completada':'🟢 Pendiente'}</span>
      </div>
      ${estado !== 'completada'
        ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
            <a href="${waLink}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none" onclick="marcarTareaWA('${key}')">\uD83D\uDCF1 Enviar WA</a>
            <button class="btn btn-ghost btn-sm" onclick="marcarTareaCompletada('${key}')">✓ Completada</button>
            <button class="btn btn-ghost btn-sm" onclick="posponerTarea('${key}')">⏭ Posponer 1 día</button>
            <button class="btn btn-ghost btn-sm" style="color:#dc2626" onclick="omitirTarea('${key}')">🚫 Omitir</button>
          </div>`
        : `<div style="font-size:.78rem;color:var(--muted);margin-top:6px">Completada ${ts?new Date(ts).toLocaleString('es-CO'):''} ${notas?'· '+notas:''}</div>`}
    </div>`;
  }).join('');
}
function marcarTareaWA(key) {
  kvSet(key+'_estado','completada');
  kvSet(key+'_ts', new Date().toISOString());
  setTimeout(() => renderTareas(), 500);
}
function marcarTareaCompletada(key) {
  kvSet(key+'_estado','completada');
  kvSet(key+'_ts', new Date().toISOString());
  renderTareas(); toast('Tarea completada ✓');
}
function posponerTarea(key) {
  const manana = new Date(); manana.setDate(manana.getDate()+1);
  const mananaStr = manana.toLocalDateStr();
  kvSet(key+'_posponer', mananaStr);
  toast('Tarea pospuesta para mañana'); renderTareas();
}
function omitirTarea(key) {
  const razon = prompt('Razón para omitir (opcional):');
  kvSet(key+'_estado','completada');
  kvSet(key+'_notas', razon||'Omitida');
  kvSet(key+'_ts', new Date().toISOString());
  renderTareas(); toast('Tarea omitida');
}

// ══════════════════════════════════════════════════════════════
// ── PAQUETES Y MEMBRESÍAS ──
// ══════════════════════════════════════════════════════════════
function _getPkPlantillas() { try { return JSON.parse(kvGet('pk_plantillas')||'[]'); } catch(e){ return []; } }
function _getPkAsignados()  { try { return JSON.parse(kvGet('pk_asignados') ||'[]'); } catch(e){ return []; } }
function _savePkPlantillas(a) { kvSet('pk_plantillas', JSON.stringify(a)); }
function _savePkAsignados(a)  { kvSet('pk_asignados',  JSON.stringify(a)); }

function renderPaquetes() {
  const search   = ((document.getElementById('pkSearch')||{}).value||'').toLowerCase();
  const plantillas = _getPkPlantillas();
  const asignados  = _getPkAsignados();
  const hoy = today();
  const activos   = asignados.filter(p => p.vencimiento >= hoy && (p.sesiones - (p.consumidas||0)) > 0);
  const agotados  = asignados.filter(p => (p.sesiones - (p.consumidas||0)) <= 0);
  const porVencer = asignados.filter(p => {
    if ((p.sesiones-(p.consumidas||0)) <= 0) return false;
    const diff = Math.round((new Date(p.vencimiento+'T12:00:00') - new Date(hoy+'T12:00:00'))/86400000);
    return diff >= 0 && diff <= 7;
  });
  const valorTotal = activos.reduce((s,p) => s+parsePrecio(p.precio||0),0);
  const sv = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  sv('pkActivos', activos.length); sv('pkValor', '$'+valorTotal.toLocaleString('es-CO'));
  sv('pkPorVencer', porVencer.length); sv('pkAgotados', agotados.length);

  const plEl = document.getElementById('pkPlantillas');
  if (plEl) {
    plEl.innerHTML = plantillas.length
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${
          plantillas.map((pl,i) => `<div style="padding:14px;background:var(--s2);border-radius:10px;border:1px solid var(--border)">
            <div style="font-weight:700;font-family:var(--font-h);margin-bottom:4px">${pl.nombre}</div>
            <div style="font-size:.8rem;color:var(--muted)">${pl.sesiones} sesiones · $${parsePrecio(pl.precio).toLocaleString('es-CO')} · ${pl.vigencia||60} días</div>
            ${pl.servicios?`<div style="font-size:.75rem;color:var(--muted);margin-top:2px">${pl.servicios}</div>`:''}
            <div style="display:flex;gap:6px;margin-top:10px">
              <button class="btn btn-teal btn-sm" onclick="abrirModalPaquete(${i})">Asignar</button>
              <button class="btn btn-ghost btn-sm" onclick="borrarPlantillaPaquete(${i})">🗑️</button>
            </div>
          </div>`).join('')}</div>`
      : '<div class="empty" style="padding:20px 0"><p>Sin plantillas. Crea una para empezar.</p></div>';
  }

  const pkListaEl = document.getElementById('pkLista');
  if (!pkListaEl) return;
  let lista = asignados;
  if (search) lista = lista.filter(p => (p.paciente||'').toLowerCase().includes(search));
  if (!lista.length) {
    pkListaEl.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin paquetes asignados</p></div>';
    return;
  }
  pkListaEl.innerHTML = lista.map((p, i) => {
    const rest = (p.sesiones||0) - (p.consumidas||0);
    const pct  = p.sesiones > 0 ? Math.round((p.consumidas||0)/p.sesiones*100) : 0;
    const agotado   = rest <= 0;
    const penultimo = rest === 1;
    const vencido   = p.vencimiento && p.vencimiento < hoy;
    const borderC   = agotado?'rgba(239,68,68,.35)':penultimo?'rgba(251,191,36,.35)':'var(--border)';
    const barC      = agotado?'#ef4444':penultimo?'#f59e0b':'var(--primary)';
    const pkTel    = (p.telefono || '').replace(/\D/g, '');
    const pkNombre = (p.paciente || '').split(' ')[0];
    const _pkWa    = (msg) => pkTel.length >= 7 ? `https://wa.me/57${pkTel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    let alerta = '';
    if (agotado) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Tu paquete "${p.nombre||''}" se agoto. ¿Quieres renovarlo para continuar con tu tratamiento? Te paso las opciones disponibles. \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">🔴 Paquete agotado — proponer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (penultimo) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Te aviso que te queda solo 1 sesion en tu paquete "${p.nombre||''}". ¿Renovamos antes de que se acabe para no perder el ritmo? \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#92400e">⚠️ Última sesión restante — ofrecer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-sm" style="background:#f59e0b;color:#fff;border:none;text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (vencido) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u274C Tu paquete "${p.nombre||''}" vencio el ${fmtDate(p.vencimiento)}. Si quieres seguir con tu plan, podemos renovarlo ahora. ¿Te interesa? \uD83D\uDE4F`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">⏰ Paquete vencido (${fmtDate(p.vencimiento)})</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-err btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Recordar</a>` : ''}
      </div>`;
    }
    return `<div style="padding:14px 18px;border:1.5px solid ${borderC};border-radius:12px;margin-bottom:10px;background:var(--s1)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:6px">
        <div>
          <div style="font-weight:700;font-family:var(--font-h)">${p.paciente||'—'}</div>
          <div style="font-size:.8rem;color:var(--muted)">${p.nombre||'—'} · Comprado: ${fmtDate(p.fechaCompra)} · Vence: ${p.vencimiento?fmtDate(p.vencimiento):'—'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-m);font-size:.82rem;color:var(--primary)">${p.consumidas||0}/${p.sesiones||0} sesiones consumidas</div>
          <div style="font-size:.75rem;color:var(--muted)">Restantes: <strong>${rest}</strong></div>
        </div>
      </div>
      <div style="margin:10px 0 4px;background:var(--s2);border-radius:99px;height:8px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${barC};border-radius:99px;transition:width .5s"></div></div>
      ${alerta}
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
        <button class="btn btn-teal btn-sm" onclick="usarSesion(${i})" ${agotado?'disabled':''}>➕ Usar sesión</button>
        <button class="btn btn-ghost btn-sm" onclick="ajustarSesiones(${i})">✏️ Ajustar sesiones</button>
        <button class="btn btn-ghost btn-sm" onclick="borrarPaqueteAsignado(${i})">🗑️ Eliminar</button>
      </div>
    </div>`;
  }).join('');
}
function abrirModalPaquete(plIdxPre) {
  const plantillas = _getPkPlantillas();
  const sel = document.getElementById('pkPlantillaSel');
  if (sel) sel.innerHTML = '<option value="">— Elige plantilla —</option>' + plantillas.map((pl,i) => `<option value="${i}" ${i===plIdxPre?'selected':''}>${pl.nombre}</option>`).join('');
  const dl = document.getElementById('pkPacienteList');
  if (dl) {
    const nomCitas = allData.citas.map(c=>c.nombre||'').filter(Boolean);
    const nomPacs  = (allData.pacientes||[]).map(p=>p.nombre||'').filter(Boolean);
    const todos    = [...new Set([...nomCitas, ...nomPacs])].sort();
    dl.innerHTML   = todos.map(n=>`<option value="${n}">`).join('');
  }
  const fi = document.getElementById('pkFechaCompra'); if (fi) fi.value = today();
  const pkModal = document.getElementById('modalPaquete'); if (pkModal) pkModal.style.display = 'flex';
}
function guardarPaqueteAsignado() {
  const paciente = (document.getElementById('pkPaciente').value||'').trim();
  const plIdx    = document.getElementById('pkPlantillaSel').value;
  const fechaC   = document.getElementById('pkFechaCompra').value || today();
  const notas    = (document.getElementById('pkNotas').value||'').trim();
  const tel      = (document.getElementById('pkTelefono').value||'').replace(/\D/g,'');
  if (!paciente || plIdx === '') { toast('Completa paciente y plantilla','err'); return; }
  const pl = _getPkPlantillas()[+plIdx];
  if (!pl) { toast('Plantilla no encontrada','err'); return; }
  const vigD = new Date(fechaC+'T12:00:00');
  vigD.setDate(vigD.getDate() + (+pl.vigencia||60));
  const asignados = _getPkAsignados();
  asignados.push({ paciente, telefono:tel, nombre:pl.nombre, sesiones:+pl.sesiones, consumidas:0, precio:pl.precio, fechaCompra:fechaC, vencimiento:vigD.toLocalDateStr(), notas });
  _savePkAsignados(asignados);
  document.getElementById('modalPaquete').style.display='none';
  renderPaquetes(); toast('Paquete asignado ✓');
}
function usarSesion(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
  p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
}
function ajustarSesiones(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
  if (val === null) return;
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
  if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
  p.consumidas = n; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesiones actualizadas: ${n}/${p.sesiones}`);
}
function borrarPaqueteAsignado(idx) {
  if (!confirm('¿Eliminar este paquete?')) return;
  const a = _getPkAsignados(); a.splice(idx,1); _savePkAsignados(a); renderPaquetes();
}
function abrirModalPlantillaPaquete() { const m = document.getElementById('modalPlantillaPaquete'); if (m) m.style.display='flex'; }
function guardarPlantillaPaquete() {
  const nombre   = (document.getElementById('ptNombre').value||'').trim();
  const sesiones = document.getElementById('ptSesiones').value;
  if (!nombre||!sesiones) { toast('Nombre y sesiones son obligatorios','err'); return; }
  const pl = { nombre, sesiones:+sesiones, precio:(document.getElementById('ptPrecio').value||'').trim(), vigencia:+(document.getElementById('ptVigencia').value||60), servicios:(document.getElementById('ptServicios').value||'').trim() };
  const plantillas = _getPkPlantillas(); plantillas.push(pl); _savePkPlantillas(plantillas);
  document.getElementById('modalPlantillaPaquete').style.display='none';
  renderPaquetes(); toast('Plantilla guardada ✓');
}
function borrarPlantillaPaquete(idx) {
  if (!confirm('¿Eliminar esta plantilla?')) return;
  const a = _getPkPlantillas(); a.splice(idx,1); _savePkPlantillas(a); renderPaquetes();
}

// ══════════════════════════════════════════════════════════════
// ── EMPRESAS CRM ──
// ══════════════════════════════════════════════════════════════
function _getEmpresas() { try { return JSON.parse(kvGet('crm_empresas')||'[]'); } catch(e){ return []; } }
function _saveEmpresas(a) { kvSet('crm_empresas', JSON.stringify(a)); }

function renderEmpresas() {
  const empresas = _getEmpresas();
  const filtroEst = (document.getElementById('empresaFiltroEstado')||{}).value||'';
  const orden     = (document.getElementById('empresaOrden')||{}).value||'accion';
  const hoy = today();
  const pipEstados = ['Prospecto','Propuesta enviada','En negociación','Cerrada-ganada','En pausa'];
  const pipColors  = ['#6366f1','#f59e0b','var(--primary)','var(--ok)','var(--muted)'];
  const pipEl = document.getElementById('empresasPipeline');
  if (pipEl) {
    pipEl.innerHTML = pipEstados.map((est,i) => {
      const n   = empresas.filter(e=>e.estado===est).length;
      const val = empresas.filter(e=>e.estado===est).reduce((s,e)=>s+parsePrecio(e.valor||0),0);
      return `<div style="flex:1;min-width:130px;padding:12px 16px;background:var(--s1);border:1px solid var(--border);border-radius:10px;border-top:3px solid ${pipColors[i]}">
        <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;font-family:var(--font-m)">${est}</div>
        <div style="font-family:var(--font-h);font-size:1.4rem;font-weight:700;margin:4px 0">${n}</div>
        ${val>0?`<div style="font-size:.73rem;color:${pipColors[i]};font-family:var(--font-m)">$${Math.round(val/1000)}k</div>`:''}
      </div>`;
    }).join('');
  }
  let lista = filtroEst ? empresas.filter(e=>e.estado===filtroEst) : empresas;
  if (orden==='valor')    lista = [...lista].sort((a,b)=>parsePrecio(b.valor||0)-parsePrecio(a.valor||0));
  else if (orden==='contacto') lista = [...lista].sort((a,b)=>(b.ultimoContacto||'').localeCompare(a.ultimoContacto||''));
  else lista = [...lista].sort((a,b)=>{
    const av=a.fechaAccion&&a.fechaAccion<=hoy, bv=b.fechaAccion&&b.fechaAccion<=hoy;
    if(av&&!bv)return -1; if(!av&&bv)return 1;
    return (a.fechaAccion||'9999').localeCompare(b.fechaAccion||'9999');
  });
  const listaEl = document.getElementById('empresasLista');
  if (!listaEl) return;
  if (!lista.length) { listaEl.innerHTML='<div class="empty" style="padding:50px 20px"><p>No hay empresas registradas</p></div>'; return; }
  const colorEst = {'Prospecto':'#6366f1','Propuesta enviada':'#f59e0b','En negociación':'var(--primary)','Cerrada-ganada':'var(--ok)','Cerrada-perdida':'#ef4444','En pausa':'var(--muted)'};
  listaEl.innerHTML = lista.map(e => {
    const realIdx = empresas.indexOf(e);
    const accionV = e.fechaAccion && e.fechaAccion < hoy;
    const tel = (e.telefono||'').replace(/\D/g,'');
    return `<div style="border:1.5px solid ${accionV?'rgba(239,68,68,.4)':'var(--border)'};border-radius:14px;padding:16px 20px;background:var(--s1)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:8px">
        <div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700">${e.nombre||'—'} <span style="font-size:.75rem;color:var(--muted)">${e.sector?'· '+e.sector:''}</span></div>
          <div style="font-size:.8rem;color:var(--muted);margin-top:2px">${e.contacto||''} ${e.telefono?'· '+e.telefono:''} ${e.email?'· '+e.email:''}</div>
        </div>
        <span style="font-size:.75rem;font-weight:700;padding:3px 10px;border-radius:99px;background:rgba(0,0,0,.05);color:${colorEst[e.estado]||'var(--muted)'}">${e.estado||'—'}</span>
      </div>
      ${e.valor?`<div style="font-size:.82rem;color:var(--primary);font-family:var(--font-m);margin-bottom:6px">💰 $${parsePrecio(e.valor).toLocaleString('es-CO')}</div>`:''}
      ${e.proxAccion?`<div style="font-size:.82rem;margin-bottom:6px;color:${accionV?'#dc2626':'var(--text)'}">📌 ${e.proxAccion} ${e.fechaAccion?'— '+fmtDate(e.fechaAccion):''} ${accionV?'⚠️':''}</div>`:''}
      ${e.ultimoContacto?`<div style="font-size:.78rem;color:var(--muted)">Último contacto: ${fmtDate(e.ultimoContacto)}</div>`:''}
      ${e.notas?`<div style="font-size:.78rem;color:var(--muted);margin-top:4px;white-space:pre-line">${e.notas}</div>`:''}
      <div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">
        ${tel?`<a href="https://wa.me/57${tel}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none">\uD83D\uDCF1 WA</a>`:''}
        <button class="btn btn-ghost btn-sm" onclick="editarEmpresa(${realIdx})">✏️ Editar</button>
        <button class="btn btn-ghost btn-sm" style="color:#dc2626" onclick="borrarEmpresa(${realIdx})">🗑️</button>
      </div>
    </div>`;
  }).join('');
}
function abrirModalEmpresa(idx) {
  document.getElementById('empEditIdx').value = idx !== undefined ? idx : -1;
  document.getElementById('modalEmpresaTitle').textContent = idx !== undefined ? 'Editar empresa' : 'Nueva empresa';
  const ids = ['empNombre','empSector','empContacto','empTelefono','empEmail','empEstado','empValor','empUltimoContacto','empProxAccion','empFechaAccion','empNotas'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = id==='empEstado'?'Prospecto':''; });
  if (idx !== undefined) {
    const e = _getEmpresas()[idx];
    if (e) {
      ['empNombre','empSector','empContacto','empTelefono','empEmail','empEstado','empValor','empUltimoContacto','empProxAccion','empFechaAccion','empNotas'].forEach(id => {
        const key = id.replace('emp','').charAt(0).toLowerCase()+id.replace('emp','').slice(1);
        const el = document.getElementById(id); if (el && e[key] !== undefined) el.value = e[key];
      });
      document.getElementById('empNombre').value = e.nombre||'';
      document.getElementById('empSector').value = e.sector||'';
      document.getElementById('empContacto').value = e.contacto||'';
      document.getElementById('empTelefono').value = e.telefono||'';
      document.getElementById('empEmail').value = e.email||'';
      document.getElementById('empEstado').value = e.estado||'Prospecto';
      document.getElementById('empValor').value = e.valor||'';
      document.getElementById('empUltimoContacto').value = e.ultimoContacto||'';
      document.getElementById('empProxAccion').value = e.proxAccion||'';
      document.getElementById('empFechaAccion').value = e.fechaAccion||'';
      document.getElementById('empNotas').value = e.notas||'';
    }
  } else {
    document.getElementById('empUltimoContacto').value = today();
  }
  document.getElementById('modalEmpresa').style.display = 'flex';
}
function cerrarModalEmpresa() { document.getElementById('modalEmpresa').style.display='none'; }
function editarEmpresa(idx) { abrirModalEmpresa(idx); }
function guardarEmpresa() {
  const idx = parseInt(document.getElementById('empEditIdx').value, 10);
  const emp = {
    nombre: (document.getElementById('empNombre').value||'').trim(),
    sector: (document.getElementById('empSector').value||'').trim(),
    contacto: (document.getElementById('empContacto').value||'').trim(),
    telefono: (document.getElementById('empTelefono').value||'').trim(),
    email: (document.getElementById('empEmail').value||'').trim(),
    estado: document.getElementById('empEstado').value,
    valor: (document.getElementById('empValor').value||'').trim(),
    ultimoContacto: document.getElementById('empUltimoContacto').value,
    proxAccion: (document.getElementById('empProxAccion').value||'').trim(),
    fechaAccion: document.getElementById('empFechaAccion').value,
    notas: (document.getElementById('empNotas').value||'').trim()
  };
  if (!emp.nombre) { toast('El nombre es obligatorio','err'); return; }
  const empresas = _getEmpresas();
  if (idx >= 0) empresas[idx] = emp; else empresas.push(emp);
  _saveEmpresas(empresas);
  cerrarModalEmpresa(); renderEmpresas(); toast('Empresa guardada ✓');
}
function borrarEmpresa(idx) {
  if (!confirm('¿Eliminar esta empresa?')) return;
  const a = _getEmpresas(); a.splice(idx,1); _saveEmpresas(a); renderEmpresas();
}

// ── Origen del paciente ──
function dbOnOrigenChange() {
  const val  = (document.getElementById('dbOrigen')||{}).value || '';
  const sub  = document.getElementById('dbOrigenSub');
  const wrap = document.getElementById('dbReferidoPorWrap');
  const res  = document.getElementById('dbCodigoResult');
  if (sub)  sub.style.display  = (val==='Gimnasio'||val==='Empresa'||val==='Otro') ? 'block' : 'none';
  if (wrap) wrap.style.display = val==='Referido' ? 'block' : 'none';
  if (res && val!=='Referido') res.style.display = 'none';
}

function dbReferidoFilter() {
  const input = document.getElementById('dbReferidoPor');
  const list  = document.getElementById('dbReferidoList');
  const q     = (input.value || '').toLowerCase().trim();
  const pacientes = (allData.pacientes || []);
  const matches = pacientes
    .map(p => p.nombre)
    .filter(n => n && (!q || n.toLowerCase().includes(q)))
    .slice(0, 8);
  if (!matches.length) { list.style.display = 'none'; return; }
  list.innerHTML = matches.map(n =>
    `<li onclick="document.getElementById('dbReferidoPor').value='${n.replace(/'/g,"\\'")}';document.getElementById('dbReferidoList').style.display='none'"
      style="padding:8px 12px;cursor:pointer;font-size:.88rem;color:var(--text)"
      onmouseenter="this.style.background='rgba(139,92,246,.1)'"
      onmouseleave="this.style.background=''">${n}</li>`
  ).join('');
  list.style.display = 'block';
}

// ══════════════════════════════════════════════════════════════
// CÓDIGOS REF & BONO
// ══════════════════════════════════════════════════════════════
const BONO_VALOR   = 20000;
const BONO_MAX_MES = 2;
const _MES_EN = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
function _mesAbrevActual() { return _MES_EN[new Date().getMonth()]; }
function _bonosReferidorMes(referidoPor) {
  const mes = _mesAbrevActual();
  return (allData.codigos || []).filter(c =>
    c.tipo === 'BONO' &&
    (c.paciente || '').toLowerCase().trim() === (referidoPor || '').toLowerCase().trim() &&
    (c.codigo || '').split('-')[1] === mes
  );
}

function updateBonosBadge() {
  const codigos = allData.codigos || [];
  const refConBono = new Set(codigos.filter(c => c.tipo === 'BONO').map(c => c.codigoRef));
  const pendientes = codigos.filter(c => c.tipo === 'REF' && !refConBono.has(c.codigo) && c.estado !== 'Usado');

  // Sidebar badge
  const badge = document.getElementById('badgeBonos');
  if (badge) {
    if (pendientes.length > 0) { badge.textContent = pendientes.length; badge.style.display = 'inline-block'; }
    else { badge.style.display = 'none'; }
  }

  // Dashboard banner
  const bannerBonos = document.getElementById('bannerBonos');
  if (bannerBonos) {
    if (pendientes.length > 0) {
      const nombres = pendientes.map(c => `<strong>${c.referidoPor || '—'}</strong> (por haber referido a ${c.paciente || '?'})`).join(' · ');
      document.getElementById('bannerBonosTxt').innerHTML = nombres;
      bannerBonos.style.display = 'flex';
    } else {
      bannerBonos.style.display = 'none';
    }
  }

  // Banner detallado en vista Códigos
  const bonoPendingBanner = document.getElementById('bonoPendingBanner');
  const bonoPendingLista  = document.getElementById('bonoPendingLista');
  if (bonoPendingBanner && bonoPendingLista) {
    if (pendientes.length > 0) {
      bonoPendingLista.innerHTML = pendientes.map(c => `
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.6);border:1px solid rgba(217,119,6,.25);border-radius:8px;padding:8px 12px">
          <span style="font-family:var(--font-m);font-size:.8rem;font-weight:700;color:#7c3aed;background:rgba(139,92,246,.1);padding:2px 8px;border-radius:6px;white-space:nowrap">${esc(c.codigo)}</span>
          <div style="flex:1;font-size:.85rem">
            <strong style="color:#92400e">${c.referidoPor || '—'}</strong>
            <span style="color:var(--muted)"> tiene bono pendiente — refirió a <strong>${c.paciente || '?'}</strong></span>
          </div>
          <span style="font-family:var(--font-m);font-size:.75rem;color:var(--muted)">${c.fecha || ''}</span>
          ${_bonosReferidorMes(c.referidoPor||'').length >= BONO_MAX_MES
            ? `<span style="font-size:.75rem;color:#92400e;opacity:.65;padding:3px 8px;border:1px solid rgba(234,179,8,.25);border-radius:6px;white-space:nowrap">🔒 Límite mensual</span>`
            : `<button class="btn btn-sm" onclick="generarBono('${c.codigo}','${(c.referidoPor||'').replace(/'/g,"\\'")}','${(c.telefono||'').replace(/'/g,"\\'")}' )"
                style="background:rgba(234,179,8,.15);color:#92400e;border:1px solid rgba(234,179,8,.4);font-size:.75rem;white-space:nowrap">
                🎁 Bono $${BONO_VALOR.toLocaleString('es-CO')}
              </button>`
          }
        </div>`).join('');
      bonoPendingBanner.style.display = 'block';
    } else {
      bonoPendingBanner.style.display = 'none';
    }
  }
}

function renderCodigos() {
  const tbody  = document.getElementById('codigosTbody');
  const search = (document.getElementById('codSearch')?.value || '').toLowerCase();
  const fTipo  = document.getElementById('codTipoFilter')?.value || '';
  const fEst   = document.getElementById('codEstadoFilter')?.value || '';

  let lista = [...(allData.codigos || [])];
  if (search) lista = lista.filter(c =>
    (c.codigo+c.paciente+c.referidoPor+c.codigoRef+(c.fecha||'')).toLowerCase().includes(search));
  if (fTipo) lista = lista.filter(c => c.tipo === fTipo);
  if (fEst)  lista = lista.filter(c => c.estado === fEst);

  // Ordenar: más recientes primero
  lista.sort((a,b) => (b.codigo).localeCompare(a.codigo));

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty"><p>No hay códigos registrados aún</p><p style="font-size:.8rem;color:var(--muted);margin-top:6px">Los códigos REF se generan al agregar un paciente con origen <strong>Referido</strong></p></div></td></tr>`;
    return;
  }

  // Construir mapa de qué REF ya tienen BONO
  const refConBono = new Set(lista.filter(c=>c.tipo==='BONO').map(c=>c.codigoRef));

  tbody.innerHTML = lista.map(c => {
    const esREF   = c.tipo === 'REF';
    const chipColor = esREF ? 'background:rgba(139,92,246,.12);color:#7c3aed;border:1px solid rgba(139,92,246,.3)'
                            : 'background:rgba(234,179,8,.12);color:#92400e;border:1px solid rgba(234,179,8,.3)';
    const estadoChip = c.estado === 'Activo'
      ? `<span class="chip chip-ok" style="font-size:.7rem">${c.estado}</span>`
      : `<span class="chip chip-no" style="font-size:.7rem">${c.estado}</span>`;
    const vinculo = c.tipo === 'BONO' && c.codigoRef
      ? `<span style="font-family:var(--font-m);font-size:.8rem;color:var(--muted)">← ${c.codigoRef}</span>`
      : (c.tipo === 'REF' && refConBono.has(c.codigo)
          ? `<span style="font-family:var(--font-m);font-size:.8rem;color:#92400e">BONO-${c.codigo.slice(4)} ✓</span>`
          : '—');
    const _bonosMesRef = esREF ? _bonosReferidorMes(c.referidoPor || '') : [];
    const _topeMes     = _bonosMesRef.length >= BONO_MAX_MES;
    const btnBono = esREF && !refConBono.has(c.codigo)
      ? (_topeMes
          ? `<span style="font-size:.75rem;color:#92400e;opacity:.6;padding:3px 8px;border:1px solid rgba(234,179,8,.25);border-radius:6px;background:rgba(234,179,8,.07)">🔒 Límite mensual (${BONO_MAX_MES}/${BONO_MAX_MES})</span>`
          : `<button class="btn btn-sm" onclick="generarBono('${c.codigo}','${(c.referidoPor||'').replace(/'/g,"\\'")}','${(c.telefono||'').replace(/'/g,"\\'")}' )"
               style="background:rgba(234,179,8,.12);color:#92400e;border:1px solid rgba(234,179,8,.3);font-size:.75rem">
               🎁 Generar Bono $${BONO_VALOR.toLocaleString('es-CO')} <span style="opacity:.65">(${_bonosMesRef.length}/${BONO_MAX_MES} mes)</span>
             </button>`)
      : '';
    const btnMarcar = c.estado === 'Activo'
      ? `<button class="btn btn-sm" onclick="marcarUsado('${c.codigo}')"
           style="background:rgba(107,114,128,.1);color:#374151;border:1px solid rgba(107,114,128,.25);font-size:.75rem">
           ✓ Usado
         </button>`
      : '';

    return `<tr>
      <td><span style="font-family:var(--font-m);font-size:.88rem;font-weight:700;padding:3px 8px;border-radius:6px;${chipColor}">${c.codigo}</span></td>
      <td><strong style="font-size:.88rem">${esc(c.paciente||'—')}</strong>${c.telefono?`<br><small style="color:var(--muted)">${c.telefono}</small>`:''}</td>
      <td style="font-size:.85rem">${esc(c.referidoPor||'—')}</td>
      <td style="font-family:var(--font-m);font-size:.78rem;color:var(--muted)">${c.fecha||''}</td>
      <td>${estadoChip}</td>
      <td>${vinculo}</td>
      <td><div style="display:flex;gap:6px;flex-wrap:wrap">${btnBono}${btnMarcar}</div></td>
    </tr>`;
  }).join('');

  updateBonosBadge();
}

async function marcarUsado(codigo) {
  if (!confirm(`¿Marcar ${codigo} como Usado?\nEsto cambiará el estado en Google Sheets.`)) return;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=actualizarCodigo&token=${encodeURIComponent(TOKEN)}&codigo=${encodeURIComponent(codigo)}&estado=Usado`);
    const d = await r.json();
    if (!d.ok) { toast('Error al actualizar el estado', 'err'); return; }
    toast(`${codigo} marcado como Usado ✓`);
    await reload();
    renderCodigos();
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function generarBono(codigoRef, referidoPor, telefonoRef) {
  const bonosMes = _bonosReferidorMes(referidoPor);
  if (bonosMes.length >= BONO_MAX_MES) {
    toast(`${referidoPor || 'Este paciente'} ya tiene ${BONO_MAX_MES} bonos este mes — límite alcanzado`, 'err');
    return;
  }
  if (!confirm(`¿Generar bono de $${BONO_VALOR.toLocaleString('es-CO')} para ${referidoPor || 'quien refirió'}?\nBonos este mes: ${bonosMes.length + 1}/${BONO_MAX_MES}\nSe descontará en su próxima sesión.`)) return;
  try {
    // Generar el número (mismo que el REF)
    const numRef  = codigoRef.split('-').pop(); // ej: "001"
    const mesRef  = codigoRef.split('-')[1];    // ej: "MAY"
    const codBono = `BONO-${mesRef}-${numRef}`;

    const codData = {
      codigo:      codBono,
      tipo:        'BONO',
      paciente:    referidoPor,
      telefono:    telefonoRef,
      referidoPor: '',
      codigoRef:   codigoRef
    };
    const r = await fetch(`${APPS_SCRIPT_URL}?action=registrarCodigo&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(codData))}`);
    const d = await r.json();
    if (!d.ok) { toast('Error al generar bono', 'err'); return; }
    toast(`Bono ${codBono} generado para ${referidoPor || 'el referidor'} ✓`);
    await reload();
    renderCodigos();
  } catch(e) { toast('Error de conexión', 'err'); }
}


function resRow(label, val, style='') {
  return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
    <span style="color:var(--muted)">${label}</span>
    <span style="${style}">${val}</span>
  </div>`;
}

// ══════════════════════════════════════════════════════════════
// ── EXPORTAR CSV ──
// ══════════════════════════════════════════════════════════════
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
```

### _pasGetDB — línea 18226

```javascript
function _pasGetDB() {
  const map = {};
  allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
    const key = (c.nombre || '').toLowerCase().trim();
    if (key && !map[key]) map[key] = { nombre: c.nombre, telefono: c.telefono || '' };
  });
  (allData.pacientes || []).forEach(p => {
    const key = (p.nombre || '').toLowerCase().trim();
    if (key && !map[key]) map[key] = { nombre: p.nombre, telefono: p.telefono || '' };
  });
  return map;
}
```

### onPasInput — línea 18239

```javascript
function onPasInput(q) {
  // Cada vez que el usuario escribe manualmente, pierde la confirmación
  _pasConfirmado = false;
  _pasTelefono  = '';
  _pasSetConfirmed(false);
  searchPasPatient(q);
}
```

### searchPasPatient — línea 18247

```javascript
function searchPasPatient(q) {
  const dd = document.getElementById('pasDropdown');
  if (!q || q.length < 2) { dd.style.display = 'none'; return; }
  const map = _pasGetDB();
  const term = q.toLowerCase();
  const matches = Object.values(map)
    .filter(p => (p.nombre || '').toLowerCase().includes(term))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .slice(0, 8);
  if (!matches.length) { dd.style.display = 'none'; return; }
  dd.innerHTML = matches.map(p => `
    <div onmousedown="selectPasPatient(${JSON.stringify(p).replace(/"/g,'&quot;')})"
      style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--s2)"
      onmouseenter="this.style.background='var(--s2)'" onmouseleave="this.style.background=''">
      <div style="font-weight:600;font-size:.88rem;color:var(--text)">${p.nombre}</div>
      <div style="font-size:.76rem;color:var(--muted)">${p.telefono || 'Sin teléfono'}</div>
    </div>`).join('');
  dd.style.display = 'block';
}
```

### selectPasPatient — línea 18267

```javascript
function selectPasPatient(p) {
  document.getElementById('pasNombreInput').value = p.nombre;
  document.getElementById('pasDropdown').style.display = 'none';
  _pasTelefono  = (p.telefono || '').replace(/\D/g, '');
  _pasConfirmado = true;
  _pasSetConfirmed(true, p);
  generarLinkPasaporte();
}
```

### _pasSetConfirmed — línea 18276

```javascript
function _pasSetConfirmed(ok, p) {
  const btn     = document.getElementById('pasAbrirBtn');
  const badge   = document.getElementById('pasConfirmBadge');
  const phoneBadge = document.getElementById('pasPhoneBadge');
  const warning = document.getElementById('pasWarning');
  const card    = document.getElementById('pasLinkCard');
  if (ok && p) {
    btn.disabled = false;
    btn.style.cssText = 'background:var(--primary);color:#0D0D0D;border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:pointer;white-space:nowrap;transition:var(--tr)';
    badge.style.display = 'flex';
    phoneBadge.textContent = p.telefono ? '📞 ' + p.telefono : '';
    warning.style.display = 'none';
  } else {
    btn.disabled = true;
    btn.style.cssText = 'background:var(--s3);color:var(--muted);border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:not-allowed;white-space:nowrap;transition:var(--tr)';
    badge.style.display = 'none';
    card.style.display  = 'none';
    warning.style.display = 'none';
  }
}
```

### limpiarPasBusqueda — línea 18297

```javascript
function limpiarPasBusqueda() {
  document.getElementById('pasNombreInput').value = '';
  document.getElementById('pasDropdown').style.display = 'none';
  _pasConfirmado = false;
  _pasTelefono  = '';
  _pasSetConfirmed(false);
}
```

### generarLinkPasaporte — línea 18305

```javascript
async function generarLinkPasaporte() {
  if (!_pasConfirmado) return;
  const nombre = document.getElementById('pasNombreInput').value.trim();
  const card   = document.getElementById('pasLinkCard');
  if (!nombre) { card.style.display = 'none'; return; }

  const url = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
    + '&nombre=' + encodeURIComponent(nombre)
    + '&telefono=' + encodeURIComponent(_pasTelefono || '');
  const data = await fetch(url).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo generar el pasaporte', 'error'); return; }
  _pasCurrent = data.passport;
  const link = _pasCurrent.link;
  document.getElementById('pasLinkTexto').textContent = link;
  card.style.display = 'block';

  const tel = _pasTelefono.length >= 7
    ? 'https://wa.me/57' + _pasTelefono.slice(-10)
    : 'https://wa.me/';
  const msg = `Hola ${nombre.split(' ')[0]}! \uD83D\uDC4B\nTe dejo tu Pasaporte de Beneficios — ahi vas a ver tu progreso despues de cada sesion.\n${link}\n\n\u2B50 *Como ganar beneficios?*\nCada sesion sumas avances. Al llegar a:\n\n\u2705 *4 sesiones:* Descarga Localizada 10 min (zona de tu eleccion)\n\u2705 *8 sesiones:* Valoracion Funcional Express 10 min + PDF con resultados\n\u2705 *12 sesiones:* Movilidad Asistida 10 min + Botas de Compresion\n\u2705 *16 sesiones:* Kinesiotape + Tens 15 min (Readaptacion completa)\n\nGuardalo y nos vemos pronto! \uD83D\uDE0A`;
  document.getElementById('pasWhatsApp').href = tel + '?text=' + encodeURIComponent(msg);

  renderPasaporteQR(link);
  renderPasaporteAdminTools();
}
```

### renderPasaporteQR — línea 18331

```javascript
function renderPasaporteQR(link) {
  const canvas = document.getElementById('pasQR');
  if (!canvas) return;
  let box = document.getElementById('pasQRBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'pasQRBox';
    box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
    canvas.insertAdjacentElement('afterend', box);
  }
  box.innerHTML = '';
  canvas.style.display = 'none';
  if (typeof QRCode !== 'undefined') {
    if (QRCode.toCanvas) {
      canvas.style.display = 'block';
      box.style.display = 'none';
      QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
    } else {
      box.style.display = 'grid';
      new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
    }
  } else {
    box.textContent = 'QR no disponible';
    box.style.fontSize = '11px';
    box.style.color = 'var(--muted)';
  }
}
```

### abrirPasaporte — línea 18359

```javascript
function abrirPasaporte() {
  if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
  const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
  if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
  window.open(link, '_blank');
}
```

### copiarLinkPas — línea 18366

```javascript
function copiarLinkPas() {
  const link = document.getElementById('pasLinkTexto').textContent;
  if (!link) return;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.getElementById('pasCopyBtn');
    const orig = btn.textContent;
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}
```

### renderPasaporteAdminTools — línea 18377

```javascript
function renderPasaporteAdminTools() {
  const card = document.getElementById('pasLinkCard');
  if (!card || !_pasCurrent) return;
  let box = document.getElementById('pasAdminTools');
  if (!box) {
    card.insertAdjacentHTML('beforeend', `
      <div id="pasAdminTools" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--s2)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          <button class="btn btn-sm" onclick="regenerarTokenPasaporte()">Regenerar token</button>
          ${_pasCurrent.estado === 'INACTIVO'
            ? '<button class="btn btn-sm btn-teal" onclick="reactivarPasaporte()">Reactivar pasaporte</button>'
            : '<button class="btn btn-sm btn-danger" onclick="desactivarPasaporte()">Desactivar pasaporte</button>'}
          <button class="btn btn-sm btn-teal" onclick="guardarProgresoPasaporte()">Guardar progreso</button>
        </div>
        <div id="pasProgressEditor"></div>
      </div>`);
    box = document.getElementById('pasAdminTools');
  }
  const passport = _pasCurrent.passport || {};
  const descarga = _pasCurrent.descarga || {};
  const stampSource = passport.stamps || passport.sellos || passport;
  const descargaSource = descarga.stamps || descarga.sellos || descarga;
  document.getElementById('pasProgressEditor').innerHTML = `
    <div style="font-weight:700;margin-bottom:4px">Sellos del pasaporte</div>
    <div style="font-size:.78rem;color:var(--muted);margin-bottom:8px">${Number(passport.autoStampCount || 0)} automáticos. Ajusta solo para correcciones excepcionales.</div>
    <div style="display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin-bottom:14px">
      ${Array.from({length:16}, (_, i) => {
        const n = i + 1;
        const checked = !!(stampSource[n] || stampSource['s' + n] || stampSource['stamp' + n] || stampSource[i]);
        return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px;text-align:center"><input type="checkbox" class="pasStamp" data-n="${n}" ${checked ? 'checked' : ''}> ${n}</label>`;
      }).join('')}
    </div>
    <div style="font-weight:700;margin-bottom:8px">Reto mensual descarga</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${[1,2].map(n => {
        const checked = !!(descargaSource[n] || descargaSource['s' + n] || descargaSource['stamp' + n] || descargaSource[n - 1]);
        return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px 12px"><input type="checkbox" class="pasDescarga" data-n="${n}" ${checked ? 'checked' : ''}> Sesión ${n}</label>`;
      }).join('')}
    </div>`;
}
```

### guardarProgresoPasaporte — línea 18418

```javascript
async function guardarProgresoPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) {
    toast('Genera primero el enlace seguro', 'warn');
    return;
  }

  const btn = document.querySelector('#pasAdminTools button[onclick="guardarProgresoPasaporte()"]');
  let status = document.getElementById('pasSaveStatus');
  if (!status) {
    const editor = document.getElementById('pasProgressEditor');
    if (editor) {
      editor.insertAdjacentHTML('beforebegin', '<div id="pasSaveStatus" style="display:none;margin:0 0 12px;padding:10px 12px;border-radius:9px;font-size:.84rem;font-weight:600"></div>');
      status = document.getElementById('pasSaveStatus');
    }
  }

  const setStatus = (message, type) => {
    if (!status) return;
    const styles = {
      info: 'display:block;background:rgba(37,99,235,.09);border:1px solid rgba(37,99,235,.22);color:#1d4ed8',
      ok: 'display:block;background:rgba(22,163,74,.09);border:1px solid rgba(22,163,74,.22);color:#15803d',
      error: 'display:block;background:rgba(220,38,38,.09);border:1px solid rgba(220,38,38,.22);color:#b91c1c'
    };
    status.style.cssText = styles[type] || styles.info;
    status.textContent = message;
  };

  const passport = {stamps:{}};
  document.querySelectorAll('.pasStamp').forEach(cb => passport.stamps[cb.dataset.n] = cb.checked);
  const descarga = {stamps:{}};
  document.querySelectorAll('.pasDescarga').forEach(cb => descarga.stamps[cb.dataset.n] = cb.checked);
  const requestedCount = Object.values(passport.stamps).filter(Boolean).length;

  const originalText = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Guardando…';
  }
  setStatus('Guardando ' + requestedCount + ' de 16 sellos…', 'info');

  try {
    const url = APPS_SCRIPT_URL + '?action=passportSaveProgress&token=' + encodeURIComponent(TOKEN)
      + '&id=' + encodeURIComponent(_pasCurrent.id)
      + '&passport=' + encodeURIComponent(JSON.stringify(passport))
      + '&descarga=' + encodeURIComponent(JSON.stringify(descarga))
      + '&_ts=' + Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120000);
    let response;
    try {
      response = await fetch(url, {cache:'no-store', signal:controller.signal});
    } finally {
      clearTimeout(timer);
    }

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      throw new Error('El servidor respondió en un formato inesperado.');
    }
    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'No se pudo guardar el progreso.');
    }

    _pasCurrent = data.passport || _pasCurrent;

    // Volver a consultar el pasaporte desde el servidor para que el editor
    // muestre exactamente la misma fuente de datos que la vista pública.
    const nombre = document.getElementById('pasNombreInput').value.trim();
    const verifyUrl = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
      + '&nombre=' + encodeURIComponent(nombre)
      + '&telefono=' + encodeURIComponent(_pasTelefono || '')
      + '&_ts=' + Date.now();
    const verifyResponse = await fetch(verifyUrl, {cache:'no-store'});
    const verifyRaw = await verifyResponse.text();
    let verifyData = null;
    try { verifyData = JSON.parse(verifyRaw); } catch (_) {}
    if (verifyResponse.ok && verifyData && verifyData.ok && verifyData.passport) {
      _pasCurrent = verifyData.passport;
    }

    renderPasaporteAdminTools();
    setStatus('Progreso guardado correctamente: ' + requestedCount + '/16.', 'ok');
    toast('Progreso guardado: ' + requestedCount + '/16', 'success');
  } catch (error) {
    const message = error && error.name === 'AbortError'
      ? 'El servidor tardó demasiado. Actualiza el pasaporte antes de volver a guardar.'
      : (error && error.message ? error.message : 'No se pudo guardar el progreso.');
    setStatus(message, 'error');
    toast(message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText || 'Guardar progreso';
    }
  }
}
```

### regenerarTokenPasaporte — línea 18519

```javascript
async function regenerarTokenPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Regenerar el enlace? El anterior dejará de funcionar.')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportRegenerateToken&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo regenerar', 'error'); return; }
  _pasCurrent = data.passport;
  generarLinkPasaporte();
  toast('Token regenerado. El enlace anterior quedó inválido.', 'success');
}
```

### desactivarPasaporte — línea 18529

```javascript
async function desactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Desactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportDeactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo desactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte desactivado', 'success');
}
```

### reactivarPasaporte — línea 18539

```javascript
async function reactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Reactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportReactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo reactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte reactivado', 'success');
}
```

