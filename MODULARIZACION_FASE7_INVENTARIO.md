# Inventario estricto — Fase 7 Equipo clínico

- Declaraciones totales detectadas: 602
- Candidatas estrictas: 26

## Funciones candidatas

- `byIdFrom` — línea 6313
- `assignmentFor` — línea 6317
- `professionalName` — línea 6321
- `loadTeamData` — línea 6326 — async
- `activeProfessionals` — línea 6351
- `teamCleanText` — línea 6355
- `teamAppointmentById` — línea 6359
- `teamAssignedAppointments` — línea 6364
- `teamIsInactiveAppointment` — línea 6376
- `teamDateCode` — línea 6380
- `teamAvailabilityDays` — línea 6386
- `teamTimeToMinutes` — línea 6402
- `teamAvailabilityRange` — línea 6413
- `teamAvailabilityIssues` — línea 6421
- `teamConflictAppointments` — línea 6445
- `renderTeamOperations` — línea 6455
- `renderEquipo` — línea 6494
- `saveProfessionalForm` — línea 6651 — async
- `resetProPassword` — línea 6672 — async
- `togglePro` — línea 6679 — async
- `deletePro` — línea 6685 — async
- `abrirAsignarPro` — línea 6698
- `loadProfessionalAgenda` — línea 6978 — async
- `renderProfessionalAgenda` — línea 6990
- `markProfessionalAttended` — línea 7026 — async
- `professionalSignout` — línea 7058

## Contexto alrededor de cada función

### byIdFrom

```javascript

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
```

### assignmentFor

```javascript

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
```

### professionalName

```javascript

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
```

### loadTeamData

```javascript

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
```

### activeProfessionals

```javascript

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
```

### teamCleanText

```javascript

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
```

### teamAppointmentById

```javascript

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
```

### teamAssignedAppointments

```javascript

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
```

### teamIsInactiveAppointment

```javascript

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
```

### teamDateCode

```javascript

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
```

### teamAvailabilityDays

```javascript

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
```

### teamTimeToMinutes

```javascript

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

```

### teamAvailabilityRange

```javascript

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
```

### teamAvailabilityIssues

```javascript

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
```

### teamConflictAppointments

```javascript

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
```

### renderTeamOperations

```javascript

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
```

### renderEquipo

```javascript

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
```

### saveProfessionalForm

```javascript

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
```

### resetProPassword

```javascript

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
```

### togglePro

```javascript

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

```

### deletePro

```javascript

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
```

### abrirAsignarPro

```javascript

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
```

### loadProfessionalAgenda

```javascript

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
```

### renderProfessionalAgenda

```javascript

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
```

### markProfessionalAttended

```javascript

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
```

### professionalSignout

```javascript

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
```

