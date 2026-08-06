(function (global) {
'use strict';



function globalSearch(val) {
  if (!val || !val.trim()) return;
  const q = val.trim().toLowerCase();

  // ¿Es un paciente?
  const esPaciente = (allData.citas || []).some(c =>
    (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
  );
  if (esPaciente) {
    showView('agenda');
    const fSearch = document.getElementById('fSearch');
    if (fSearch) { fSearch.value = val; renderAgenda(); }
    return;
  }
  // Fallback: agenda
  showView('agenda');
  const fSearch = document.getElementById('fSearch');
  if (fSearch) { fSearch.value = val; renderAgenda(); }
}

function searchPatient(q) {
  const dd = document.getElementById('pacDropdown');
  if (!q || q.length < 2) { dd.style.display='none'; return; }

  // Clave única por persona: nombre_normalizado|teléfono (evita colisiones entre distintos pacientes)
  const map = {};
  (allData.citas || []).filter(c => c.estado !== 'Cancelada').forEach(c => {
    const phone = (c.telefono||'').replace(/\D/g,'').slice(-10);
    const key   = _normStr(c.nombre) + '|' + phone;
    if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono, email:c.email, sesiones:0, ultimaDir:c.direccion||''};
    if (!esRegistroServ(c.servicio)) map[key].sesiones++;
    if (c.direccion) map[key].ultimaDir = c.direccion;
  });

  // Añadir pacientes de la hoja Pacientes que no estén ya en el mapa
  (allData.pacientes || []).forEach(p => {
    const phone = (p.telefono||'').replace(/\D/g,'').slice(-10);
    const key   = _normStr(p.nombre) + '|' + phone;
    if (!map[key]) {
      map[key] = {nombre: p.nombre, telefono: p.telefono, email: p.email, sesiones: 0, ultimaDir: ''};
    } else {
      if (p.email && !map[key].email) map[key].email = p.email;
    }
  });

  const term      = _normStr(q);
  const termDigits = q.replace(/\D/g,'');
  const matches = Object.values(map).filter(p => {
    const nameMatch  = _normStr(p.nombre).includes(term);
    const phoneMatch = termDigits.length >= 4 && (p.telefono||'').replace(/\D/g,'').includes(termDigits);
    return nameMatch || phoneMatch;
  }).slice(0, 10);

  if (!matches.length) { dd.style.display='none'; return; }

  dd.innerHTML = matches.map(p => `
    <div onclick="fillPatient(${JSON.stringify(p).replace(/"/g,'&quot;')})"
      style="padding:10px 14px;cursor:pointer;border-bottom:1px solid #f0f2f5;transition:.15s"
      onmouseenter="this.style.background='#f0faf9'" onmouseleave="this.style.background=''">
      <div style="font-weight:600;font-size:.88rem">${esc(p.nombre)}</div>
      <div style="font-size:.78rem;color:#6B7280">${p.telefono||'Sin teléfono'} · ${p.email||'Sin email'} · ${p.sesiones} cita(s)</div>
    </div>`).join('');
  dd.style.display = 'block';
}

global.PanelPatientSearch = Object.freeze({
    globalSearch,
    searchPatient
  });
})(typeof window !== 'undefined' ? window : globalThis);
