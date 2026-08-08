/* Cuidándote Fisioterapia — PanelWaitlist. */
(function (global) {
'use strict';

let _waitLoaded = false;

function _getWaitList() {
  try { return JSON.parse(localStorage.getItem('adminWaitList') || '[]'); }
  catch(e) { return []; }
}

function _saveWaitList(list) { localStorage.setItem('adminWaitList', JSON.stringify(list)); }

async function _syncWaitList() {
  try {
    const d = await fetch(`${APPS_SCRIPT_URL}?action=getWaitlist&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
    if (d.ok) { _saveWaitList(d.items || []); _waitLoaded = true; return true; }
  } catch(e) {}
  return false;
}

async function addWaitPatient() {
  const nombre = document.getElementById('waitNombre').value.trim();
  const telefono = document.getElementById('waitTelefono').value.trim();
  const servicio = document.getElementById('waitServicio').value.trim();
  const preferencia = document.getElementById('waitPreferencia').value.trim();
  if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
  const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
  try {
    const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
    if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
    item.id = d.id || item.id;
  } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
  const list = _getWaitList(); list.unshift(item); _saveWaitList(list); _waitLoaded = true;
  ['waitNombre','waitTelefono','waitServicio','waitPreferencia'].forEach(id => document.getElementById(id).value='');
  renderWaitList(); toast('Paciente agregado a la lista de espera');
}

async function removeWaitPatient(id) {
  try { await fetch(`${APPS_SCRIPT_URL}?action=removeWaitlist&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r=>r.json()); } catch(e) {}
  _saveWaitList(_getWaitList().filter(p => p.id !== id));
  renderWaitList(); toast('Paciente retirado de la lista');
}

async function renderWaitList(force=false) {
  const el = document.getElementById('waitList'); if (!el) return;
  if (!_waitLoaded || force) await _syncWaitList();
  const q = _normStr(document.getElementById('waitSearch')?.value || '');
  const all = _getWaitList();
  const list = all.filter(p => !q || _normStr(`${p.nombre} ${p.servicio} ${p.preferencia}`).includes(q));
  document.getElementById('waitCount').textContent = all.length;
  if (!list.length) { el.innerHTML = '<div class="empty-compact">No hay pacientes en espera. Agrega el primero cuando alguien solicite un horario ocupado.</div>'; return; }
  el.innerHTML = list.map(p => {
    const phone = String(p.telefono||'').replace(/\D/g,'');
    const wa = `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(`Hola ${p.nombre}, se liberó un horario en nuestra agenda. ¿Te gustaría tomarlo?`)}`;
    const fecha = new Date(p.creado).toLocaleDateString('es-CO',{day:'numeric',month:'short'});
    return `<div class="wait-card"><div class="wait-avatar">${esc((p.nombre||'?').charAt(0).toUpperCase())}</div><div class="wait-info"><div class="wait-name">${esc(p.nombre)}</div><div class="wait-meta">${esc(p.servicio||'Cualquier servicio')} · ${esc(p.preferencia||'Sin preferencia')} · desde ${fecha}</div></div><div class="ops-actions"><a class="btn btn-wa btn-sm" href="${wa}" target="_blank" rel="noopener">WhatsApp</a><button class="btn btn-teal btn-sm" onclick="bookWaitPatient('${p.id}')">Agendar</button><button class="btn btn-err btn-sm" onclick="removeWaitPatient('${p.id}')" aria-label="Retirar a ${esc(p.nombre)}">Retirar</button></div></div>`;
  }).join('');
}

global.PanelWaitlist = Object.freeze({
    _getWaitList,
    _saveWaitList,
    _syncWaitList,
    addWaitPatient,
    removeWaitPatient,
    renderWaitList
  });
})(typeof window !== 'undefined' ? window : globalThis);
