(function(global) {
  'use strict';

let _segFiltros = new Set(['sem3','sem4','sem5','reagendo']);
const MANUAL_REMINDERS_KEY = 'daily_manual_discharge_reminders_v1';

// Regla clínica-operativa única para los seguimientos post-sesión. Mantenerla
// alineada con la automatización del servidor: no mostrar tareas antes del
// día que corresponde a cada tipo de servicio. Una tarea pendiente permanece
// visible para que nunca se pierda por no gestionarla el día exacto.
function postSessionFollowUpRule(service) {
  const normalized = String(service || '')
    .toLocaleLowerCase('es')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (normalized.includes('descarga muscular')) {
    return { days: 2, label: 'Seguimiento a los 2 días' };
  }
  if (normalized.includes('valoracion funcional') || normalized.includes('readaptacion') || normalized.includes('rehabilitacion')) {
    return { days: 1, label: 'Seguimiento al día siguiente' };
  }
  return null;
}

function escFollowUp(value) {
  return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}

function toggleSegFiltro(f) {
  if (_segFiltros.has(f)) _segFiltros.delete(f);
  else _segFiltros.add(f);
  const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
  const chip = document.getElementById('segChip' + (idMap[f] || f));
  if (chip) chip.classList.toggle('active', _segFiltros.has(f));
  _renderSegLista(window._segData || [], window._segReadapData || []);
}

function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
function segNoContact(nombre)   { return !!kvGet('seg_no_contact_'+String(nombre || '').toLocaleLowerCase('es')); }

function segToggleNoContact(nombre) {
  const key = 'seg_no_contact_' + String(nombre || '').toLocaleLowerCase('es');
  if (segNoContact(nombre)) {
    kvRemove(key);
    segLogAction(nombre, 'contact', 'Se reactivó en campañas de seguimiento');
    toast('El paciente vuelve a aparecer en Reactivación', 'ok');
  } else {
    if (!confirm(`¿Marcar a ${nombre} como “No contactar”? Dejará de aparecer en Reactivación. Podrás restaurarlo después desde Resultados.`)) return;
    kvSet(key, '1');
    segLogAction(nombre, 'no_contact', 'Marcado como No contactar');
    toast('Paciente retirado de Reactivación', 'ok');
  }
  renderSeguimiento();
  renderFollowUpResults();
}

function segToggleR(nombre)     {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
  if (segReagendo(nombre)) {
    kvRemove('seg_reagendo_'+nombre);
    _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
  } else {
    kvSet('seg_reagendo_'+nombre,'1');
    segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
    const list = _comisManualReact(y, m);
    if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
  }
  renderSeguimiento();
}

function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }

function segMarkWa(nombre, tipo, dias) {
  kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
  const [periodo, enfoque] = String(tipo || '').split('-');
  const nombreEnfoque = { general:'General', oficina:'Oficina', gimnasio:'Gimnasio' }[enfoque];
  const nombrePeriodo = periodo==='sem3' ? 'primer mes'
    : periodo==='sem4' ? 'segundo mes'
    : periodo==='sem5' ? 'tres meses o más'
    : '';
  const label = nombreEnfoque ? `WA ${nombreEnfoque} · ${nombrePeriodo}`
    : tipo==='sem3' ? 'WA primer mes'
    : tipo==='sem4' ? 'WA segundo mes'
    : tipo==='sem5' ? 'WA tres meses o más'
    : 'WA seguimiento';
  segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin agendar)');
  renderSeguimiento();
}

function abrirWhatsAppSeguimiento(nombreCodificado, mensajeCodificado, tipo, dias) {
  const nombre = decodeURIComponent(String(nombreCodificado || ''));
  const mensaje = decodeURIComponent(String(mensajeCodificado || ''));
  const escrito = window.prompt(`No hay un WhatsApp registrado para ${nombre}. Escribe el número para enviar este mensaje:`);
  if (escrito === null) return;
  const telefono = String(escrito || '').replace(/\D/g, '');
  if (telefono.length < 7) {
    toast('Escribe un número de WhatsApp válido', 'err');
    return;
  }
  const destino = telefono.length <= 10 ? `57${telefono}` : telefono;
  window.open(`https://wa.me/${destino}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
  segMarkWa(nombre, tipo, dias);
}

function segLogAction(nombre, tipo, accion) {
  const log = JSON.parse(kvGet('seg_log') || '[]');
  log.unshift({ nombre, tipo, accion, fecha: new Date().toLocaleString('es-CO',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) });
  if (log.length > 80) log.length = 80;
  kvSet('seg_log', JSON.stringify(log));
}

function limpiarLogSeguimiento() {
  if (!confirm('¿Limpiar todo el historial de seguimientos?')) return;
  kvRemove('seg_log');
  _renderSegLog();
  toast('Historial limpiado');
}

function _recentKey(person) {
  return `seg_recent_${person.fecha}_${String(person.nombre || '').toLowerCase()}`;
}

function followUpStatus(value) {
  return String(value || '').toLocaleLowerCase('es')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function isExcludedFollowUpSession(status) {
  const normalized = followUpStatus(status);
  return normalized.includes('cancel') || normalized.includes('no asist') || normalized.includes('reprogram');
}

function _recentFollowUps() {
  const now = new Date(); now.setHours(0,0,0,0);
  const latest = new Map();
  (allData.citas || []).forEach(c => {
    if (!c || esRegistroServ(c.servicio) || isExcludedFollowUpSession(c.estado)) return;
    const fecha = normDate(c.fecha);
    if (!fecha) return;
    const date = new Date(`${fecha}T12:00:00`);
    // La fecha de la cita se normaliza al mediodía para evitar cambios por
    // zona horaria; redondear permite que la sesión de ayer aparezca hoy.
    const days = Math.round((now - date) / 86400000);
    const rule = postSessionFollowUpRule(c.servicio);
    // Mantener el pendiente visible durante dos semanas. Antes se usaba
    // `days !== rule.days`, por lo que una tarea se perdía si no se abría la
    // sección justo el día programado.
    if (!rule || days < rule.days || days > 14) return;
    const nombre = String(c.nombre || '').trim();
    if (!nombre) return;
    const key = nombre.toLocaleLowerCase('es');
    const prev = latest.get(key);
    if (!prev || fecha > prev.fecha) latest.set(key, {
      nombre,
      telefono:c.telefono || '',
      email:c.email || '',
      servicio:c.servicio || 'sesión',
      fecha,
      dias:days,
      rule,
      estado:c.estado || 'Sin estado',
      // El seguimiento se prepara por la fecha de la cita, incluso si el
      // equipo aún no ha cerrado el estado. Solo se excluyen canceladas,
      // reprogramadas o inasistencias.
      ready:true
    });
  });
  return Array.from(latest.values()).sort((a,b) => a.fecha.localeCompare(b.fecha));
}

function recentFollowState(person) {
  return String(kvGet(_recentKey(person)) || '');
}

function markRecentFollow(encodedPerson, state) {
  let person;
  try { person = JSON.parse(decodeURIComponent(encodedPerson)); } catch (_) { return; }
  if (!person || !person.nombre) return;
  kvSet(_recentKey(person), state);
  const labels = { sent:'Mensaje enviado', well:'Evoluciona bien', attention:'Requiere revisión', skipped:'Seguimiento omitido' };
  segLogAction(person.nombre, 'recent', `${labels[state] || 'Seguimiento'} · ${person.dias} día(s) después de la sesión`);
  renderRecentFollowUps();
}

function renderRecentFollowUps() {
  const root = document.getElementById('segTodayList');
  const count = document.getElementById('segTodayCount');
  if (!root) return;
  const pending = _recentFollowUps().filter(person => !['well','attention','skipped'].includes(recentFollowState(person)));
  if (count) count.textContent = pending.length;
  if (!pending.length) {
    root.innerHTML = '<div class="empty" style="padding:42px 20px"><p>Todo al día: no hay sesiones recientes pendientes de seguimiento.</p></div>';
    return;
  }
  root.innerHTML = pending.map(person => {
    const phone = String(person.telefono || '').replace(/\D/g, '');
    const waPhone = phone.length <= 10 ? `57${phone}` : phone;
    const first = person.nombre.split(' ')[0];
    const message = `Hola ${first}! 😊 Queríamos saber cómo te has sentido después de tu sesión de ${person.servicio}. ¿Cómo sigue tu cuerpo hoy? Si notas alguna molestia o tienes dudas, cuéntanos para orientarte.`;
    const encoded = encodeURIComponent(JSON.stringify(person));
    const wa = phone.length >= 7 ? `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}` : '';
    const overdue = person.dias > person.rule.days;
    const dueText = overdue ? `Pendiente desde hace ${person.dias - person.rule.days} día${person.dias - person.rule.days === 1 ? '' : 's'}` : person.rule.label;
    const action = person.ready
      ? (wa ? `<a href="${wa}" target="_blank" class="btn btn-wa btn-sm" onclick="PanelPatientFollowUp.markRecentFollow('${encoded}','sent')">💬 Preguntar cómo le fue</a>` : '<span style="font-size:.75rem;color:var(--muted);padding:5px">Sin teléfono</span>')
      : '<span style="font-size:.75rem;color:var(--muted);padding:5px">Sin teléfono</span>';
    return `<div class="seg-card" style="border-left:3px solid var(--primary)">
      <div class="pac-badge" style="flex-shrink:0;background:rgba(27,191,176,.08)">${person.nombre.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase()}</div>
      <div style="flex:1;min-width:160px"><div style="font-weight:700;font-size:.9rem">${person.nombre}</div><div style="font-size:.78rem;color:var(--muted);margin-top:3px">${person.servicio} · ${dueText}<br>Estado de cita: ${escFollowUp(person.estado)}</div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
        ${action}
        ${person.ready ? `<button class="btn btn-ghost btn-sm" onclick="PanelPatientFollowUp.markRecentFollow('${encoded}','well')">Todo bien ✓</button><button class="btn btn-ghost btn-sm" onclick="PanelPatientFollowUp.markRecentFollow('${encoded}','attention')">Requiere revisión</button><button class="btn btn-ghost btn-sm" onclick="PanelPatientFollowUp.markRecentFollow('${encoded}','skipped')">Omitir</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function renderTeamFollowUpTasks() {
  const root = document.getElementById('segTeamTasks');
  const count = document.getElementById('segTeamCount');
  if (!root) return;
  let tasks = [];
  try { tasks = JSON.parse(kvGet(MANUAL_REMINDERS_KEY) || '[]'); } catch (_) {}
  tasks = tasks.filter(task => task && !['done','booked','no_contact'].includes(task.status)).sort((a,b) => String(a.dueDate || '').localeCompare(String(b.dueDate || '')));
  if (count) count.textContent = tasks.length;
  if (!tasks.length) {
    root.innerHTML = '<div class="empty" style="padding:42px 20px"><p>No hay pendientes para el equipo. Puedes crear uno desde Hoy con el botón Recordatorio.</p></div>';
    return;
  }
  root.innerHTML = tasks.map(task => `<div class="seg-card" style="border-left:3px solid #7c3aed">
    <div class="pac-badge" style="flex-shrink:0;background:rgba(124,58,237,.08);border-color:#7c3aed">💬</div>
    <div style="flex:1;min-width:160px"><div style="font-weight:700;font-size:.9rem">${escFollowUp(task.nombre || 'Paciente')}</div><div style="font-size:.78rem;color:var(--muted);margin-top:3px">Para: ${escFollowUp(task.owner || 'Auxiliar')} · ${task.dueDate ? fmtDate(task.dueDate) : 'Hoy'}${task.note ? `<br>${escFollowUp(task.note)}` : ''}</div></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0"><button class="btn btn-wa btn-sm" onclick="PanelPatientFollowUp.teamTaskAction('copy','${encodeURIComponent(task.id)}')">Copiar mensaje</button><button class="btn btn-ghost btn-sm" onclick="PanelPatientFollowUp.teamTaskAction('booked','${encodeURIComponent(task.id)}')">Agendó ✓</button></div>
  </div>`).join('');
}

function renderFollowUpResults() {
  const root = document.getElementById('segResults');
  if (!root) return;
  let tasks = [];
  try { tasks = JSON.parse(kvGet(MANUAL_REMINDERS_KEY) || '[]'); } catch (_) {}
  tasks = tasks.filter(Boolean);
  const sent = tasks.filter(task => ['sent','responded','booked'].includes(task.status)).length;
  const responded = tasks.filter(task => ['responded','booked'].includes(task.status)).length;
  const booked = tasks.filter(task => task.status === 'booked').length;
  const noContact = tasks.filter(task => task.status === 'no_contact').length;
  const conversion = sent ? Math.round((booked / sent) * 100) : 0;
  const recent = tasks.slice().sort((a,b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''))).slice(0,8);
  const excluded = [...(window._segData || []), ...(window._segReadapData || [])]
    .filter(person => person && segNoContact(person.nombre))
    .filter((person, index, items) => items.findIndex(item => String(item.nombre || '').toLocaleLowerCase('es') === String(person.nombre || '').toLocaleLowerCase('es')) === index);
  root.innerHTML = `<div class="seg-results-grid">
    <div><span>Mensajes enviados</span><strong>${sent}</strong></div>
    <div><span>Respondieron</span><strong>${responded}</strong></div>
    <div><span>Agendaron</span><strong>${booked}</strong></div>
    <div><span>Conversión a cita</span><strong>${conversion}%</strong></div>
  </div>
  <div class="follow-hub-intro" style="margin-top:16px"><strong>Cómo leerlo</strong><span>Estos indicadores se alimentan cuando la auxiliar marca los resultados de cada pendiente. “No contactar” (${noContact}) queda fuera de la conversión para no insistir a esa persona.</span></div>
  <div class="card" style="margin-top:16px"><div class="card-title" style="margin-bottom:12px">Últimos pendientes creados</div>${recent.length ? recent.map(task => `<div class="seg-log-item"><div class="seg-log-dot" style="background:#7c3aed"></div><div class="seg-log-time">${task.createdAt ? fmtDate(task.createdAt) : '—'}</div><div style="flex:1"><strong style="font-size:.83rem">${escFollowUp(task.nombre || 'Paciente')}</strong> — <span style="color:var(--muted)">${task.status === 'booked' ? 'Agendó' : task.status === 'responded' ? 'Respondió' : task.status === 'sent' ? 'Mensaje enviado' : task.status === 'no_contact' ? 'No contactar' : 'Pendiente de enviar'}</span></div></div>`).join('') : '<div class="empty" style="padding:24px 0"><p>Aún no hay resultados. Crea el primer pendiente desde Hoy.</p></div>'}</div>
  ${excluded.length ? `<div class="card" style="margin-top:16px"><div class="card-title" style="margin-bottom:12px">No contactar (${excluded.length})</div>${excluded.map(person => `<div class="seg-log-item"><div class="seg-log-dot" style="background:var(--err)"></div><div style="flex:1"><strong style="font-size:.83rem">${escFollowUp(person.nombre)}</strong> — <span style="color:var(--muted)">Excluido de Reactivación</span></div><button class="btn btn-ghost btn-sm" onclick="PanelPatientFollowUp.segToggleNoContact(decodeURIComponent('${encodeURIComponent(person.nombre)}'))">Restaurar</button></div>`).join('')}</div>` : ''}`;
}

async function teamTaskAction(action, encodedId) {
  const daily = global.PanelDailyControl;
  if (!daily) { toast('Las tareas del equipo todavía están cargando. Intenta de nuevo en un momento.', 'err'); return; }
  if (action === 'copy' && typeof daily.copyManualReminder === 'function') await daily.copyManualReminder(encodedId);
  if (action !== 'copy' && typeof daily.manualReminderAction === 'function') daily.manualReminderAction(action, encodedId);
  renderTeamFollowUpTasks();
}

function openLogPatient(encodedName) {
  const nombre = decodeURIComponent(String(encodedName || ''));
  if (!nombre) return;
  const records = global.PanelPatientRecords;
  if (!records || typeof records.verHistorial !== 'function') {
    toast('El historial del paciente todavía no está disponible', 'err');
    return;
  }
  records.verHistorial(encodeURIComponent(nombre));
}

function esDescargaMusc(serv) {
  const s = (serv||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  return s.includes('descarga');
}

function esReadaptacion(serv) {
  const s = (serv||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  return s.includes('readaptacion') || s.includes('readap');
}

function readapZona(nombre) {
  return kvGet('seg_readap_zona_'+nombre) || '';
}

function setReadapZona(nombre, zona) {
  if (zona) kvSet('seg_readap_zona_'+nombre, zona);
  else kvRemove('seg_readap_zona_'+nombre);
}

function _followUpPatientKey(nombre) {
  return String(nombre || '').trim().toLocaleLowerCase('es')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function _followUpDate(value) {
  const normalized = normDate(value);
  if (!normalized) return null;
  const [year, month, day] = normalized.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : { normalized, date };
}

function _followUpBucket(days) {
  if (days < 30) return null;
  if (days < 60) return 'sem3';
  if (days < 90) return 'sem4';
  return 'sem5';
}

// La reactivación usa la última cita válida de cada paciente. Una cita futura
// lo excluye y una sesión posterior reemplaza la anterior, evitando duplicados.
function buildReactivationPatients(citas, now, contactos) {
  const todayDate = new Date(now); todayDate.setHours(0, 0, 0, 0);
  const patients = new Map();
  const contactBook = contactos || {};

  (citas || []).forEach(cita => {
    if (!cita || esRegistroServ(cita.servicio) || isExcludedFollowUpSession(cita.estado)) return;
    const nombre = String(cita.nombre || '').trim();
    const parsed = _followUpDate(cita.fecha);
    if (!nombre || !parsed) return;
    const key = _followUpPatientKey(nombre);
    const current = patients.get(key) || { nombre, fecha: '', proximaCita: '' };
    const contact = contactBook[key] || {};

    if (parsed.date > todayDate) {
      if (!current.proximaCita || parsed.normalized < current.proximaCita) current.proximaCita = parsed.normalized;
      patients.set(key, current);
      return;
    }

    if (!current.fecha || parsed.normalized > current.fecha) {
      Object.assign(current, {
        nombre: current.nombre || nombre,
        telefono: cita.telefono || current.telefono || contact.telefono || '',
        email: cita.email || current.email || contact.email || '',
        fecha: parsed.normalized,
        servicio: cita.servicio || '',
        notaAdmin: cita.notaAdmin || ''
      });
    }
    patients.set(key, current);
  });

  return Array.from(patients.values()).map(patient => {
    if (!patient.fecha || patient.proximaCita) return null;
    const last = _followUpDate(patient.fecha);
    const dias = Math.floor((todayDate - last.date) / 86400000);
    const semana = _followUpBucket(dias);
    return semana ? { ...patient, dias, semana } : null;
  }).filter(Boolean);
}

function renderSeguimiento() {
  const lista = document.getElementById('segLista');
  if (!lista) return;
  lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';

  const now = new Date(); now.setHours(0,0,0,0);

  // Algunas citas antiguas no guardaron teléfono. Recuperarlo de la ficha
  // del paciente o de otra cita evita ocultar el botón de WhatsApp.
  const contactos = {};
  const claveContacto = _followUpPatientKey;
  const registrarContacto = registro => {
    const clave = claveContacto(registro?.nombre || registro?.nombres);
    if (!clave) return;
    const previo = contactos[clave] || {};
    contactos[clave] = {
      telefono: registro?.telefono || previo.telefono || '',
      email: registro?.email || previo.email || ''
    };
  };
  (allData.citas || []).forEach(registrarContacto);
  (allData.pacientes || []).forEach(registrarContacto);

  const pacientes = buildReactivationPatients(allData.citas || [], now, contactos);

  // Contar
  const c3 = pacientes.filter(p=>p.semana==='sem3').length;
  const c4 = pacientes.filter(p=>p.semana==='sem4').length;
  const c5 = pacientes.filter(p=>p.semana==='sem5').length;
  const cR = pacientes.filter(p=>segReagendo(p.nombre)).length;

  ['3','4','5','R'].forEach(k => {
    const el = document.getElementById('segCount'+k);
    if (el) el.textContent = k==='3'?c3:k==='4'?c4:k==='5'?c5:cR;
  });
  // Badge sidebar
  const pendientes = c3 + c4 + c5;
  const badge = document.getElementById('badgeSeguimiento');
  if (badge) { badge.textContent = pendientes; badge.style.display = pendientes > 0 ? 'inline':'none'; }

  window._segData = pacientes;
  window._segReadapData = [];
  _renderSegLista(pacientes);
  _renderSegLog();
}

function _renderSegLista(pacientes) {
  const lista = document.getElementById('segLista');
  if (!lista) return;

  // Una única campaña para todos los servicios, sin repetir pacientes.
  const activos    = pacientes.filter(p => !segReagendo(p.nombre) && !segNoContact(p.nombre));
  const reagendados = pacientes.filter(p =>  segReagendo(p.nombre) && !segNoContact(p.nombre));

  const descargaCards = [
    ...(_segFiltros.has('sem3') ? activos.filter(p=>p.semana==='sem3').sort((a,b)=>a.dias-b.dias) : []),
    ...(_segFiltros.has('sem4') ? activos.filter(p=>p.semana==='sem4').sort((a,b)=>a.dias-b.dias) : []),
    ...(_segFiltros.has('sem5') ? activos.filter(p=>p.semana==='sem5').sort((a,b)=>b.dias-a.dias) : []),
    ...(_segFiltros.has('reagendo') ? reagendados : []),
  ];

  if (!descargaCards.length) {
    lista.innerHTML = '<div class="empty" style="padding:50px 20px"><p>No hay pacientes en estas categorías</p></div>';
    return;
  }

  lista.innerHTML = descargaCards.map(p => _segCard(p)).join('');
}

function reactivationMessage(p, enfoque) {
  const primero = String(p.nombre || '').split(' ')[0] || 'hola';
  const semanas = Math.max(1, Math.floor(Number(p.dias || 0) / 7));
  const semanasTexto = `${semanas} semana${semanas === 1 ? '' : 's'}`;
  const servicio = p.servicio || 'fisioterapia';
  const referencia = esDescargaMusc(servicio) ? 'tu descarga muscular' : `tu última cita de ${servicio}`;
  const inicio = `Hola, ${primero} ¿Cómo has estado? Ya han pasado ${semanasTexto} desde ${referencia}`;

  if (enfoque === 'oficina') return `${inicio}. Si has sentido otra vez tensión en cuello, espalda o cansancio por tantas horas sentado(a), me escribes y miramos un espacio ⭐`;
  if (enfoque === 'gimnasio') return `${inicio}. Si has sentido tensión, sobrecarga o quieres recuperarte mejor para seguir entrenando, me escribes y miramos un espacio ⭐`;
  return `${inicio} y quería saber cómo te has sentido. Si necesitas retomar, me escribes y miramos un espacio ⭐`;
}

function _segCard(p) {
  const reagendado = segReagendo(p.nombre);
  const initials   = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  const pct        = Math.min(Math.round(p.dias / 30 * 100), 100);

  const colorMap   = { sem3:'#7c3aed', sem4:'var(--warn)', sem5:'var(--err)' };
  const fillMap    = { sem3:'rgba(124,58,237,.5)', sem4:'#d97706', sem5:'#dc2626' };
  const color      = colorMap[p.semana] || 'var(--primary)';
  const fillColor  = fillMap[p.semana]  || 'var(--primary)';

  const labelMap   = { sem3:'1 mes — seguimiento', sem4:'2 meses — seguimiento prioritario', sem5:'3+ meses — reactivación urgente' };
  const label      = labelMap[p.semana] || '';

  const tel   = String(p.telefono||'').replace(/\D/g,'');
  const phone = tel.length<=10 ? '57'+tel : tel;
  const hasWA = tel.length >= 7;
  const mesesSinAgendar = Math.max(1, Math.floor(Number(p.dias || 0) / 30));
  const tiempoSinAgendar = `${mesesSinAgendar} mes${mesesSinAgendar === 1 ? '' : 'es'} sin agendar`;

  const nombreWa = encodeURIComponent(p.nombre).replace(/'/g, '%27');
  const opcionesWa = [
    { key:'general', label:'⭐ General', className:'btn-purple' },
    { key:'oficina', label:'💻 Oficina', className:'btn-wa' },
    { key:'gimnasio', label:'🏋️ Gimnasio', className:'btn-err' }
  ].map(opcion => {
    const tipo = `${p.semana}-${opcion.key}`;
    const mensaje = reactivationMessage(p, opcion.key);
    const enviado = segWaSent(p.nombre, tipo);
    const url = hasWA ? `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}` : null;
    const mensajeWa = encodeURIComponent(mensaje).replace(/'/g, '%27');
    const nombreSeguro = p.nombre.replace(/'/g,"\\'");
    return url
      ? `<a href="${url}" target="_blank" class="btn btn-sm ${opcion.className}" onclick="segMarkWa('${nombreSeguro}','${tipo}',${p.dias})" style="${enviado?'opacity:.55':''}">💬 ${enviado ? '(enviado) ' : ''}${opcion.label}</a>`
      : `<button class="btn btn-sm ${opcion.className}" onclick="PanelPatientFollowUp.abrirWhatsAppSeguimiento('${nombreWa}','${mensajeWa}','${tipo}',${p.dias})">💬 ${opcion.label}</button>`;
  }).join('');

  return `<div class="seg-card ${reagendado?'reagendado':''}">
    <div class="pac-badge" style="flex-shrink:0;background:rgba(27,191,176,.08);border-color:${reagendado?'var(--ok)':color}">${initials}</div>
    <div style="flex:1;min-width:160px">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:.9rem">${p.nombre}</span>
        ${reagendado
          ? `<span style="font-size:.72rem;color:var(--ok);font-weight:700;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:99px;padding:1px 8px">✓ Reagendó</span>`
          : `<span style="font-size:.72rem;color:${color};font-weight:700;font-family:var(--font-m)">${label}</span>`}
      </div>
      <div style="font-size:.78rem;color:var(--muted);margin-top:2px">${p.servicio} · última: ${fmtDate(p.fecha)}</div>
      <div class="seg-days-bar" style="width:180px">
        <div class="seg-days-fill" style="width:${pct}%;background:${reagendado?'var(--ok)':fillColor}"></div>
      </div>
      <div style="font-family:var(--font-m);font-size:.7rem;color:${reagendado?'var(--ok)':color};margin-top:2px;font-weight:600">${tiempoSinAgendar}</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
      ${reagendado ? `
        <button class="btn btn-ghost btn-sm" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">↩ Desmarcar</button>
      ` : `
        ${opcionesWa}
        ${p.email && p.email.includes('@') ? `<a href="mailto:${p.email}" class="btn btn-ghost btn-sm">📧</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="agendarDesdeSeg('${encodeURIComponent(p.nombre)}','${encodeURIComponent(p.telefono)}','${encodeURIComponent(p.email)}')">+ Agendar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--err);border-color:rgba(220,38,38,.35)" onclick="segToggleNoContact(decodeURIComponent('${encodeURIComponent(p.nombre)}'))">No contactar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--ok);border-color:rgba(22,163,74,.3)" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">✓ Reagendó</button>
      `}
    </div>
  </div>`;
}

function _segCardReadap(p) {
  const reagendado = segReagendo(p.nombre);
  const initials   = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  const zona       = readapZona(p.nombre);
  const tel        = String(p.telefono||'').replace(/\D/g,'');
  const phone      = tel.length<=10 ? '57'+tel : tel;
  const hasWA      = tel.length >= 7;
  const primero    = p.nombre.split(' ')[0];
  const uid        = p.nombre.replace(/[^a-zA-Z0-9]/g,'_');
  const waSent     = segWaSent(p.nombre,'readap');
  const _paraMR = (p.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i);
  const paraQuienR = _paraMR ? _paraMR[1].trim() : null;

  const msgReadap = zona
    ? paraQuienR
      ? `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. ¿Como ha estado ${paraQuienR} con el proceso de readaptacion funcional de ${zona}? Queria saber como se siente y si quieren continuar con el plan. ¿Me cuentas como va? \uD83D\uDCAA`
      : `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. ¿Como has estado con tu proceso de readaptacion funcional de ${zona}? Queria saber como te sientes y si quieres continuar con tu plan. ¿Me cuentas como vas? \uD83D\uDCAA`
    : `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Queríamos saber cómo vas con tu proceso de readaptación funcional y si deseas continuar con tu plan. ¿Me cuentas cómo vas? \uD83D\uDCAA`;
  const waReadap = (hasWA && msgReadap) ? `https://wa.me/${phone}?text=${encodeURIComponent(msgReadap)}` : null;
  const nombreWa = encodeURIComponent(p.nombre).replace(/'/g, '%27');
  const msgReadapWa = encodeURIComponent(msgReadap).replace(/'/g, '%27');

  return `<div class="seg-card ${reagendado?'reagendado':''}" style="border-left:3px solid #0369a1">
    <div class="pac-badge" style="flex-shrink:0;background:rgba(3,105,161,.08);border-color:${reagendado?'var(--ok)':'#0369a1'}">${initials}</div>
    <div style="flex:1;min-width:160px">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:.9rem">${p.nombre}</span>
        ${reagendado
          ? `<span style="font-size:.72rem;color:var(--ok);font-weight:700;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:99px;padding:1px 8px">✓ Reagendó</span>`
          : `<span style="font-size:.72rem;color:#0369a1;font-weight:700;font-family:var(--font-m)">Readaptación Funcional</span>`}
      </div>
      <div style="font-size:.78rem;color:var(--muted);margin-top:2px">${p.servicio} · última: ${fmtDate(p.fecha)} · ${p.dias} días</div>
      ${!reagendado ? `
      <div style="margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <label style="font-size:.75rem;color:var(--muted);flex-shrink:0">Articulación/zona:</label>
        <input
          id="readapZona_${uid}"
          type="text"
          value="${zona}"
          placeholder="ej: espalda, rodilla, hombro..."
          style="font-size:.78rem;padding:4px 8px;border:1px solid var(--border);border-radius:6px;background:var(--s1);color:var(--text);outline:none;width:180px"
          oninput="setReadapZona('${p.nombre.replace(/'/g,"\\'")}', this.value); _renderSegLista(window._segData||[], window._segReadapData||[])"
          onfocus="this.style.borderColor='#0369a1'"
          onblur="this.style.borderColor='var(--border)'"
        />
        ${zona ? `<span style="font-size:.72rem;color:#0369a1">✓ guardado</span>` : `<span style="font-size:.72rem;color:var(--muted)">Llena para generar mensaje WA</span>`}
      </div>` : ''}
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
      ${reagendado ? `
        <button class="btn btn-ghost btn-sm" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">↩ Desmarcar</button>
      ` : `
        ${waReadap
          ? `<a href="${waReadap}" target="_blank" class="btn btn-sm" style="background:#0369a1;color:#fff" onclick="segMarkWa('${p.nombre.replace(/'/g,"\\'")}','readap',${p.dias})" ${waSent?'style="opacity:.55"':''}>💬 WA ${waSent?'(enviado)':'Seguimiento'}</a>`
          : `<button class="btn btn-sm" style="background:#0369a1;color:#fff" onclick="PanelPatientFollowUp.abrirWhatsAppSeguimiento('${nombreWa}','${msgReadapWa}','readap',${p.dias})">💬 WA Seguimiento</button>`}
        ${p.email && p.email.includes('@') ? `<a href="mailto:${p.email}" class="btn btn-ghost btn-sm">📧</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="agendarDesdeSeg('${encodeURIComponent(p.nombre)}','${encodeURIComponent(p.telefono)}','${encodeURIComponent(p.email)}')">+ Agendar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--err);border-color:rgba(220,38,38,.35)" onclick="segToggleNoContact(decodeURIComponent('${encodeURIComponent(p.nombre)}'))">No contactar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--ok);border-color:rgba(22,163,74,.3)" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">✓ Reagendó</button>
      `}
    </div>
  </div>`;
}

function _renderSegLog() {
  const el = document.getElementById('segLog');
  if (!el) return;
  const log = JSON.parse(kvGet('seg_log') || '[]');
  if (!log.length) {
    el.innerHTML = '<div class="empty" style="padding:24px 0"><p>Aún no hay acciones registradas</p></div>';
    return;
  }
  const dotColors = { sem3:'#7c3aed', sem4:'#d97706', sem5:'#dc2626', reagendo:'#16a34a', readap:'#0369a1' };
  el.innerHTML = `<div style="max-height:320px;overflow-y:auto;padding-right:4px">` +
    log.map(l => `<button type="button" class="seg-log-item seg-log-open" onclick="PanelPatientFollowUp.openLogPatient('${encodeURIComponent(String(l.nombre || ''))}')" title="Abrir historial de ${String(l.nombre || '')}">
      <div class="seg-log-dot" style="background:${dotColors[l.tipo]||'var(--primary)'}"></div>
      <div class="seg-log-time">${l.fecha}</div>
      <div style="flex:1;text-align:left"><strong style="font-size:.83rem">${l.nombre}</strong> — <span style="color:var(--muted)">${l.accion}</span></div>
      <span class="seg-log-open-label">Abrir ›</span>
    </button>`).join('') + `</div>`;
}

function exportarSeguimientoCSV() {
  const data  = window._segData || [];
  if (!data.length) { toast('No hay datos para exportar', 'err'); return; }
  const header = ['Nombre','Teléfono','Email','Tipo','Servicio','Última sesión','Días','Semana/Zona','Reagendó','No contactar','WA Enviado'];
  const rowsD = data.map(p => [
    p.nombre, p.telefono, p.email, 'Reactivación', p.servicio, p.fecha, p.dias,
    p.semana==='sem3'?'Mes 1':p.semana==='sem4'?'Mes 2':'Mes 3+',
    segReagendo(p.nombre)?'Sí':'No', segNoContact(p.nombre)?'Sí':'No',
    (segWaSent(p.nombre,'sem3')||segWaSent(p.nombre,'sem4')||segWaSent(p.nombre,'sem5'))?'Sí':'No'
  ]);
  const csv = [header,...rowsD].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'seguimiento_'+today()+'.csv'; a.click();
  toast('CSV exportado');
}

  global.PanelPatientFollowUp = Object.freeze({
    toggleSegFiltro,
    segReagendo,
    segToggleR,
    segNoContact,
    segToggleNoContact,
    segWaSent,
    segMarkWa,
    abrirWhatsAppSeguimiento,
    segLogAction,
    limpiarLogSeguimiento,
    openLogPatient,
    markRecentFollow,
    renderRecentFollowUps,
    renderTeamFollowUpTasks,
    teamTaskAction,
    renderFollowUpResults,
    esDescargaMusc,
    esReadaptacion,
    readapZona,
    setReadapZona,
    buildReactivationPatients,
    reactivationMessage,
    renderSeguimiento,
    _renderSegLista,
    _segCard,
    _segCardReadap,
    _renderSegLog,
    exportarSeguimientoCSV
  });

  // Estas tarjetas se generan como HTML y sus botones usan manejadores
  // declarativos. Conservamos estos puentes explícitos para que cada acción
  // llegue al módulo, sin depender de funciones implícitas del navegador.
  Object.assign(global, {
    segToggleR,
    segMarkWa,
    segToggleNoContact,
    setReadapZona,
    _renderSegLista
  });
})(window);
