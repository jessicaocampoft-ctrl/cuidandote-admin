(function (global) {
'use strict';

let _remData = null;

async function cargarRecordatorios() {
  const cont = document.getElementById('recContent');
  cont.innerHTML = '<div class="loading-wrap"><div class="spinner"></div> Consultando base de datos...</div>';
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (!d.ok) { cont.innerHTML = '<div class="empty"><p>Error al cargar: ' + (d.error||'') + '</p></div>'; return; }
    _remData = d;
    renderRecordatorios(d);
    // Actualizar badge en sidebar
    const total = d.semana4.length + d.semana5.length;
    const badge = document.getElementById('badgeRecordatorios');
    if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'inline' : 'none'; }
  } catch(e) {
    cont.innerHTML = '<div class="empty"><p>Error de conexión</p></div>';
  }
}

function renderRecordatorios(d) {
  const cont = document.getElementById('recContent');
  const total = d.semana4.length + d.semana5.length;

  if (total === 0) {
    cont.innerHTML = `<div class="empty" style="padding:60px 20px">
      <p style="font-size:1.1rem">\u2705 Todos los pacientes están al día</p>
      <p style="margin-top:8px;font-size:.85rem">No hay pacientes con más de 4 semanas sin sesión.</p>
    </div>`;
    return;
  }

  const sinEmail4  = d.semana4.filter(p => !p.email || p.email.indexOf('@') < 0).length;
  const sinEmail5  = d.semana5.filter(p => !p.email || p.email.indexOf('@') < 0).length;
  const conEmail   = total - sinEmail4 - sinEmail5;

  cont.innerHTML = `
    <!-- Resumen rápido -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px">
      <div class="stat-card"><div class="stat-label">Total a recordar</div><div class="stat-val">${total}</div><div class="stat-desc">pacientes</div></div>
      <div class="stat-card"><div class="stat-label">Pueden recibir email</div><div class="stat-val" style="color:var(--ok)">${conEmail}</div><div class="stat-desc">tienen email registrado</div></div>
      <div class="stat-card"><div class="stat-label">Solo WhatsApp</div><div class="stat-val" style="color:var(--warn)">${sinEmail4+sinEmail5}</div><div class="stat-desc">no tienen email</div></div>
    </div>

    <!-- Semana 4 -->
    ${d.semana4.length ? `
    <div class="card" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <div class="card-title" style="margin-bottom:2px;color:var(--warn)">⏰ Semana 4 — Momento ideal</div>
          <div style="font-size:.82rem;color:var(--muted)">${d.semana4.length} paciente(s) · entre 28 y 34 días desde su última sesión</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${d.semana4.map(p => recCard(p, 4)).join('')}
      </div>
    </div>` : ''}

    <!-- Semana 5+ -->
    ${d.semana5.length ? `
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <div class="card-title" style="margin-bottom:2px;color:var(--err)">🔴 Semana 5+ — Reagendamiento urgente</div>
          <div style="font-size:.82rem;color:var(--muted)">${d.semana5.length} paciente(s) · más de 35 días sin sesión</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${d.semana5.map(p => recCard(p, 5)).join('')}
      </div>
    </div>` : ''}
  `;
}

function marcarRecordatorioEnviado(nombre, semanas) {
  kvSet('rec_wa_'+semanas+'_'+nombre, '1');
  // Re-render para mostrar checkmark
  if (_remData) renderRecordatorios(_remData);
}

async function enviarEmailsRecordatorio() {
  const btn = document.getElementById('btnSendEmails');
  btn.textContent = 'Enviando...'; btn.disabled = true;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=sendReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      toast(`\u2705 ${d.sent} email(s) enviados · ${d.skipped} sin email (envía WhatsApp manualmente)`);
      // Marcar emails enviados localmente
      if (_remData) {
        [...(_remData.semana4||[]), ...(_remData.semana5||[])].forEach(p => {
          if (p.email && p.email.indexOf('@') >= 0) kvSet('rec_email_'+p.nombre, '1');
        });
        renderRecordatorios(_remData);
      }
    } else toast('Error: ' + (d.error||''), 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Enviar emails a todos'; btn.disabled = false;
}

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

global.PanelReminders = Object.freeze({
    cargarRecordatorios,
    renderRecordatorios,
    marcarRecordatorioEnviado,
    enviarEmailsRecordatorio,
    enviarEmailUno
  });
})(typeof window !== 'undefined' ? window : globalThis);
