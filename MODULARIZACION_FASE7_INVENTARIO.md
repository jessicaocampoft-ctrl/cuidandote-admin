# Inventario completo — Fase 7 Equipo clínico

- Declaraciones totales detectadas: 602
- Inicio del bloque: línea 6313
- Fin del bloque: línea 7058
- Funciones dentro del bloque: 63

## Todas las funciones del bloque

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
- `openProfessionalSchedule` — línea 6575
- `openProfessionalForm` — línea 6614
- `showTemporaryPassword` — línea 6628
- `copyTempPassword` — línea 6634 — async
- `saveProfessionalForm` — línea 6651 — async
- `resetProPassword` — línea 6672 — async
- `togglePro` — línea 6679 — async
- `deletePro` — línea 6685 — async
- `abrirAsignarPro` — línea 6698
- `renderAssignWarnings` — línea 6714
- `saveAssignPro` — línea 6741 — async
- `authorizeAssignPro` — línea 6764 — async
- `markPayablePaid` — línea 6783 — async
- `loadOperationsData` — línea 6791 — async
- `setupOperationsModuleUI` — línea 6799 — async
- `paymentAccountLabel` — línea 6807
- `paymentCandidateAppointments` — línea 6815
- `renderPaymentAppointmentList` — línea 6823
- `selectPaymentAppointment` — línea 6831
- `updateSelectedPaymentCard` — línea 6839
- `updatePaymentProofLabel` — línea 6847
- `fillPaymentSelectors` — línea 6855
- `prefillPaymentFromAppointment` — línea 6863
- `clearPaymentForm` — línea 6871
- `abrirPagoCita` — línea 6879
- `saveManualPayment` — línea 6887 — async
- `readPaymentProofFile` — línea 6895 — async
- `verifyPayment` — línea 6903 — async
- `renderPagos` — línea 6911
- `openPago` — línea 6919
- `downloadOperationsCSV` — línea 6927
- `exportPaymentsCSV` — línea 6937
- `exportOperationsAuditCSV` — línea 6946
- `fetchJsonWithTimeout` — línea 6954 — async
- `openProfessionalLoginMode` — línea 6958
- `backToAdminLogin` — línea 6962
- `doProfessionalLogin` — línea 6966 — async
- `changeProfessionalPassword` — línea 6970 — async
- `showProfessionalApp` — línea 6974 — async
- `loadProfessionalAgenda` — línea 6978 — async
- `setProfessionalMode` — línea 6982
- `renderProfessionalAgenda` — línea 6990
- `markProfessionalAttended` — línea 7026 — async
- `openProIssue` — línea 7036
- `sendProfessionalIssue` — línea 7043 — async
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
```

### openProfessionalSchedule

```javascript

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

```

### openProfessionalForm

```javascript

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
```

### showTemporaryPassword

```javascript

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
```

### copyTempPassword

```javascript

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
```

### renderAssignWarnings

```javascript

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
```

### saveAssignPro

```javascript

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
```

### authorizeAssignPro

```javascript

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
```

### markPayablePaid

```javascript

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
```

### loadOperationsData

```javascript
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
```

### setupOperationsModuleUI

```javascript

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
```

### paymentAccountLabel

```javascript

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
```

### paymentCandidateAppointments

```javascript

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
```

### renderPaymentAppointmentList

```javascript

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
```

### selectPaymentAppointment

```javascript

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
```

### updateSelectedPaymentCard

```javascript

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
```

### updatePaymentProofLabel

```javascript

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
```

### fillPaymentSelectors

```javascript

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
```

### prefillPaymentFromAppointment

```javascript

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
```

### clearPaymentForm

```javascript

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
```

### abrirPagoCita

```javascript

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
```

### saveManualPayment

```javascript

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
```

### readPaymentProofFile

```javascript

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
```

### verifyPayment

```javascript

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
```

### renderPagos

```javascript

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
```

### openPago

```javascript

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
```

### downloadOperationsCSV

```javascript

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
```

### exportPaymentsCSV

```javascript

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

```

### exportOperationsAuditCSV

```javascript

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
```

### fetchJsonWithTimeout

```javascript

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
```

### openProfessionalLoginMode

```javascript

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
```

### backToAdminLogin

```javascript

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
```

### doProfessionalLogin

```javascript

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
```

### changeProfessionalPassword

```javascript

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
```

### showProfessionalApp

```javascript

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
```

### setProfessionalMode

```javascript

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

```

### openProIssue

```javascript

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
```

### sendProfessionalIssue

```javascript

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
```

