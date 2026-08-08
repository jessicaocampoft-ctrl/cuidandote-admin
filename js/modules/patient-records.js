(function (global) {
'use strict';

let _pacs = [];

function logChange(accion, detalle) {
  const log = JSON.parse(kvGet('adminChangeLog') || '[]');
  log.unshift({ ts: new Date().toLocaleString('es-CO'), accion, detalle });
  if (log.length > 150) log.length = 150;
  kvSet('adminChangeLog', JSON.stringify(log));
  const countEl = document.getElementById('changeLogCount');
  if (countEl) countEl.textContent = log.length;
}

function renderChangeLog() {
  const log   = JSON.parse(kvGet('adminChangeLog') || '[]');
  const body  = document.getElementById('changeLogBody');
  const count = document.getElementById('changeLogCount');
  if (count) count.textContent = log.length;
  if (!body) return;
  if (!log.length) {
    body.innerHTML = '<p style="color:var(--muted);font-size:.85rem;text-align:center;padding:16px 0">No hay cambios registrados todavía.</p>';
    return;
  }
  const iconos = {
    'Nueva cita':        { bg:'rgba(16,185,129,.12)', color:'#065f46', icon:'📅' },
    'Paciente agregado': { bg:'rgba(59,130,246,.12)', color:'#1e3a8a', icon:'👤' },
    'Paciente editado':  { bg:'rgba(251,191,36,.12)', color:'#92400e', icon:'✏️' },
    'Paciente eliminado':{ bg:'rgba(239,68,68,.12)',  color:'#991b1b', icon:'🗑️' },
    'Estado cambiado':   { bg:'rgba(139,92,246,.12)', color:'#4c1d95', icon:'🔄' },
    'Pago registrado':   { bg:'rgba(16,185,129,.12)', color:'#065f46', icon:'💳' },
    'Pago pendiente':    { bg:'rgba(245,158,11,.12)', color:'#92400e', icon:'⏳' },
    'Cita editada':      { bg:'rgba(59,130,246,.12)', color:'#1e3a8a', icon:'✏️' },
    'Cita reagendada':   { bg:'rgba(99,102,241,.12)', color:'#3730a3', icon:'📅' },
    'Cita cancelada':    { bg:'rgba(239,68,68,.12)',  color:'#991b1b', icon:'🚫' },
  };
  body.innerHTML = log.map(e => {
    const s = iconos[e.accion] || { bg:'var(--s2)', color:'var(--muted)', icon:'•' };
    return `<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:.8rem;padding:2px 8px;border-radius:20px;background:${s.bg};color:${s.color};white-space:nowrap;margin-top:1px">${s.icon} ${e.accion}</span>
      <span style="font-size:.84rem;color:var(--text);flex:1">${e.detalle}</span>
      <span style="font-size:.75rem;color:var(--muted);white-space:nowrap">${e.ts}</span>
    </div>`;
  }).join('');
}

function toggleChangeLog() {
  const panel   = document.getElementById('changeLogPanel');
  const chevron = document.getElementById('changeLogChevron');
  const open    = panel.style.display === 'block';
  panel.style.display   = open ? 'none' : 'block';
  chevron.textContent   = open ? '▼ Ver' : '▲ Ocultar';
  if (!open) renderChangeLog();
}

function clearChangeLog() {
  if (!confirm('¿Eliminar todo el historial de cambios?')) return;
  kvRemove('adminChangeLog');
  renderChangeLog();
}

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

function verHistorial(encodedNombre) {
  const nombre = decodeURIComponent(encodedNombre);
  const citas = allData.citas.filter(c => c.nombre === nombre).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  _renderHistorial(nombre, citas);
}

function verHistorialPac(idx) {
  const p = _pacs[idx];
  if (!p) return;
  // Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)
  const citas = allData.citas.filter(c => p.nombres.includes(c.nombre)).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  _renderHistorial(p.nombre, citas);
}

function _renderHistorial(nombre, citas) {
  document.getElementById('modalHistorialTitle').textContent = 'Historial: ' + nombre;
  const ref = citas[0] || {};
  document.getElementById('modalHistorialContent').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
      <p style="color:var(--muted);font-size:.85rem;margin:0">${citas.length} cita(s) registrada(s)</p>
      <button class="btn btn-teal btn-sm" onclick="agendarDesdePaciente('${encodeURIComponent(nombre)}','${encodeURIComponent(ref.telefono||'')}','${encodeURIComponent(ref.email||'')}')">+ Nueva cita para ${nombre.split(' ')[0]}</button>
      <button class="btn btn-ghost btn-sm" onclick="exportarHistorialPaciente('${nombre.replace(/'/g,"\\'")}')">📥 CSV</button>
    </div>
    ${citas.map(c => `
    <div style="padding:12px;background:var(--s2);border-radius:8px;margin-bottom:8px;border:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:var(--font-m);font-size:.82rem;color:var(--primary)">${esc(fmtDate(c.fecha))} · ${esc(c.hora)}</span>
        ${chipState(c.estado)}
      </div>
      <div style="font-size:.88rem;margin-top:4px">${esc(c.servicio)} · ${esc(c.modalidad)} · ${esc(c.precio)}</div>
      ${c.notas ? `<div style="font-size:.8rem;color:var(--muted);margin-top:4px">${esc(c.notas)}</div>` : ''}
    </div>`).join('')}`;
  openModal('modalHistorial');
}

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

global.PanelPatientRecords = Object.freeze({
    logChange,
    renderChangeLog,
    toggleChangeLog,
    clearChangeLog,
    renderPacientes,
    verHistorial,
    verHistorialPac,
    _renderHistorial,
    exportarHistorialPaciente,
    editarPacienteIdx,
    editarPaciente,
    guardarPaciente,
    borrarPaciente
  });
})(typeof window !== 'undefined' ? window : globalThis);
