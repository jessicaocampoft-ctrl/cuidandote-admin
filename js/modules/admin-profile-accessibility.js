(function (global) {
'use strict';

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

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('adminDarkMode', next);
  const txt = document.getElementById('darkModeTxt');
  if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
}

global.PanelAdminProfileUX = Object.freeze({
    updateProfileCard,
    openCambiarPassword,
    cambiarPassword,
    initAdminUX2026,
    toggleDarkMode
  });
})(typeof window !== 'undefined' ? window : globalThis);
