/* Cuidándote Fisioterapia — Base de datos de pacientes y reactivación. */
(function (global) {
  'use strict';

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

function checkDupDB() {
  const val  = document.getElementById('dbNombre').value.trim().toLowerCase();
  const warn = document.getElementById('dbDupWarn');
  if (val.length < 3) { warn.style.display = 'none'; return; }

  const fuentes = [
    ...(allData.pacientes || []),
    ...allData.citas.filter(c => !esRegistroServ(c.servicio)).map(c => ({nombre: c.nombre}))
  ];
  const seen = new Set();
  const match = fuentes.find(p => {
    const n = (p.nombre || '').toLowerCase().trim();
    if (seen.has(n)) return false;
    seen.add(n);
    return n.includes(val) || val.includes(n);
  });

  if (match) {
    document.getElementById('dbDupName').textContent = match.nombre;
    warn.style.display = 'block';
  } else {
    warn.style.display = 'none';
  }
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

function recCard(p, semanas) {
  const waUrl   = waRecordatorio(p.telefono, p.nombre, semanas);
  const semanas5 = semanas >= 5;
  const color   = semanas5 ? 'var(--err)' : 'var(--warn)';
  const hasEmail = p.email && p.email.indexOf('@') >= 0;
  const dias    = p.dias;
  const initials = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  const previewMsg = (semanas === 4 ? msgSemana4(p.nombre) : msgSemana5(p.nombre)).slice(0, 90) + '…';

  return `<div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--s2);border:1px solid var(--border);border-radius:10px;flex-wrap:wrap">
    <div class="pac-badge" style="background:rgba(27,191,176,.08);border-color:${color};flex-shrink:0">${initials}</div>
    <div style="flex:1;min-width:160px">
      <div style="font-weight:600;font-size:.9rem">${p.nombre}</div>
      <div style="font-size:.78rem;color:var(--muted);margin-top:2px">${p.lastServicio||'—'} · ${fmtDate(p.lastFecha)}</div>
      <div style="font-size:.75rem;color:${color};font-family:var(--font-m);margin-top:2px;font-weight:600">${dias} días sin sesión</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:4px;font-style:italic">"${previewMsg}"</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
      ${waUrl
        ? `<a href="${waUrl}" target="_blank" class="btn btn-wa btn-sm" onclick="marcarRecordatorioEnviado('${p.nombre}',${semanas})">
            ${recEnviado(p.nombre,semanas) ? '✓ WA enviado' : '💬 WhatsApp'}
           </a>`
        : `<span style="font-size:.78rem;color:var(--muted)">Sin teléfono</span>`}
      ${hasEmail
        ? `<button type="button" class="btn btn-ghost btn-sm" onclick="enviarEmailUno('${encodeURIComponent(p.nombre)}',${semanas})"
            ${recEmailEnviado(p.nombre) ? 'style="opacity:.5"' : ''}>
            ${recEmailEnviado(p.nombre) ? '✓ Email enviado' : '📧 Email'}
           </button>`
        : `<span style="font-size:.78rem;color:var(--muted);padding:5px 8px">Sin email</span>`}
      <button type="button" class="btn btn-ghost btn-sm" onclick="agendarDesdePacienteRec('${encodeURIComponent(p.nombre)}','${encodeURIComponent(p.telefono||'')}','${encodeURIComponent(p.email||'')}')">+ Agendar</button>
      ${(()=>{const u=waEncuesta(p.telefono,p.nombre);return u?`<a href="${u}" target="_blank" class="btn btn-ghost btn-sm" title="Enviar encuesta de satisfacción por WhatsApp">\u2B50 Encuesta</a>`:''})()}
    </div>
  </div>`;
}

function recEnviado(nombre, semanas)  { return !!kvGet('rec_wa_'+semanas+'_'+nombre); }

function recEmailEnviado(nombre)      { return !!kvGet('rec_email_'+nombre); }

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

  global.PanelDatabase = Object.freeze({
    initFormDB,
    renderBasedatos,
    renderReactivacion,
    limpiarFormDB,
    agregarPacienteDB,
    checkDupDB,
    dbEditarPac,
    guardarPacienteDB,
    dbBorrarPac,
    dbOnOrigenChange,
    dbReferidoFilter,
    recCard,
    recEnviado,
    recEmailEnviado,
    _updateReacBtn,
    msgSemana4,
    msgSemana5,
    waRecordatorio
  });
})(window);
