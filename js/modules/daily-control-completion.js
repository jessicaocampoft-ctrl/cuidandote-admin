/* Cuidándote Fisioterapia — cierre de Centro de acciones dentro de Control Diario. */
(function (global) {
  'use strict';

  let _timer = null;
  let _originalShowView = null;
  let _lastSignature = '';

  function _appointments() {
    try {
      if (typeof global.citasReales === 'function') return global.citasReales() || [];
    } catch (_) {}
    try { return (global.allData && global.allData.citas) || []; } catch (_) { return []; }
  }

  function _isRegister(c) {
    try { return typeof global.esRegistroServ === 'function' ? global.esRegistroServ(c && c.servicio) : false; }
    catch (_) { return false; }
  }

  function _isOperational(date) {
    try { return typeof global.isOperationalDate === 'function' ? global.isOperationalDate(date) : true; }
    catch (_) { return true; }
  }

  function _todayAppointmentsToConfirm() {
    const f = typeof global.today === 'function' ? global.today() : new Date().toISOString().slice(0,10);
    return _appointments()
      .filter(c => c && !_isRegister(c) && _isOperational(c.fecha))
      .filter(c => (typeof global.normDate === 'function' ? global.normDate(c.fecha) : String(c.fecha || '').slice(0,10)) === f)
      .filter(c => !['Cancelada','Atendida','Cancelada a tiempo','Cancelación tardía','Reserva vencida'].includes(c.estado || ''))
      .sort((a,b) => String(a.hora || '').localeCompare(String(b.hora || '')));
  }

  function _incompletePatients() {
    const f = typeof global.today === 'function' ? global.today() : new Date().toISOString().slice(0,10);
    const latest = new Map();
    _appointments()
      .filter(c => c && !_isRegister(c) && _isOperational(c.fecha) && c.estado !== 'Cancelada')
      .filter(c => {
        const d = typeof global.normDate === 'function' ? global.normDate(c.fecha) : String(c.fecha || '').slice(0,10);
        return d && d <= f;
      })
      .forEach(c => {
        const name = String(c.nombre || '').trim();
        if (!name) return;
        const key = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        const date = typeof global.normDate === 'function' ? global.normDate(c.fecha) : String(c.fecha || '').slice(0,10);
        const prev = latest.get(key);
        if (!prev || date > prev.date) latest.set(key, { c, date });
      });

    return Array.from(latest.values())
      .map(x => x.c)
      .filter(p => !String(p.telefono || '').trim() || !String(p.email || '').trim())
      .sort((a,b) => String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es'));
  }

  function _esc(value) {
    if (typeof global.esc === 'function') return global.esc(value == null ? '' : value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  function _attr(value) { return encodeURIComponent(String(value == null ? '' : value)); }

  function _card(level, icon, title, meta, action) {
    return `<div class="daily-task" data-level="${level}">
      <div class="daily-task-icon">${icon}</div>
      <div class="daily-task-copy"><div class="daily-task-title">${title}</div><div class="daily-task-meta">${meta}</div></div>
      <div class="daily-task-actions">${action}</div>
    </div>`;
  }

  function _basePendingCount() {
    try {
      const d = global.PanelDailyControl && global.PanelDailyControl.collectDailyControl
        ? global.PanelDailyControl.collectDailyControl() : null;
      if (!d) return 0;
      return (d.pastToClose?.length || 0)
        + (d.paymentsToReview?.length || 0)
        + (d.todayPaymentIssues?.length || 0)
        + (d.overdueCollections?.length || 0)
        + (d.followUps?.length || 0)
        + (d.rebookings?.length || 0)
        + (d.bonuses?.length || 0)
        + (d.companyActions?.length || 0);
    } catch (_) { return 0; }
  }

  function renderCompletion() {
    const root = document.getElementById('dailyControl');
    if (!root) return;

    const confirms = _todayAppointmentsToConfirm();
    const incomplete = _incompletePatients();
    const total = confirms.length + incomplete.length;
    const signature = JSON.stringify([
      confirms.map(c => [c.id,c.nombre,c.hora,c.estado]),
      incomplete.map(p => [p.nombre,p.telefono,p.email])
    ]);

    const h2 = root.querySelector('.daily-head h2');
    if (h2) {
      const pending = _basePendingCount() + total;
      h2.textContent = pending ? `Tienes ${pending} pendiente${pending === 1 ? '' : 's'}` : 'Todo al día';
    }

    let section = document.getElementById('dailyControlCompletion');
    if (section && signature === _lastSignature) return;
    if (section) section.remove();
    _lastSignature = signature;

    section = document.createElement('details');
    section.id = 'dailyControlCompletion';
    section.className = 'daily-group';
    if (total > 0) section.open = true;

    const cards = [];
    confirms.forEach(c => cards.push(_card(
      'normal', '📅', `Confirmar cita · ${_esc(c.nombre || 'Paciente')}`,
      `Hoy ${_esc(c.hora || '')} · ${_esc(c.servicio || 'Servicio')} · ${_esc(c.estado || 'Pendiente')}`,
      `<button class="daily-btn primary" type="button" onclick="PanelDailyControlCompletion.openAppointment('${_attr(c.nombre || '')}')">Ver cita</button>`
    )));
    incomplete.forEach(p => {
      const missing = [!String(p.telefono || '').trim() ? 'teléfono' : '', !String(p.email || '').trim() ? 'email' : ''].filter(Boolean).join(' y ');
      cards.push(_card(
        'medium', '🪪', `Completar ficha · ${_esc(p.nombre || 'Paciente')}`,
        `Falta ${_esc(missing)}`,
        `<button class="daily-btn" type="button" onclick="PanelDailyControlCompletion.openPatient('${_attr(p.nombre || '')}')">Completar datos</button>`
      ));
    });

    section.innerHTML = `<summary><span>Confirmaciones y datos</span><strong>${total}</strong></summary>
      <div class="daily-group-body">${cards.join('') || '<div class="daily-empty">No hay citas por confirmar ni fichas incompletas.</div>'}</div>`;

    const tomorrow = root.querySelector('.daily-tomorrow');
    if (tomorrow) root.insertBefore(section, tomorrow); else root.appendChild(section);
  }

  function openAppointment(encodedName) {
    const name = decodeURIComponent(String(encodedName || ''));
    if (typeof global.goAgendaPatient === 'function') return global.goAgendaPatient(encodeURIComponent(name));
    if (typeof global.showView === 'function') global.showView('agenda');
  }

  function openPatient(encodedName) {
    const name = decodeURIComponent(String(encodedName || ''));
    if (typeof global.showView === 'function') global.showView('pacientes');
    setTimeout(() => {
      const hub = global.PanelPatientHub;
      if (hub && typeof hub.setTab === 'function') hub.setTab('lista');
      const search = document.getElementById('pSearch');
      if (search) {
        search.value = name;
        if (typeof global.renderPacientes === 'function') global.renderPacientes();
        search.focus();
      }
    }, 0);
  }

  function _retireCenterActions() {
    const side = document.getElementById('sb-acciones');
    if (side) {
      side.style.display = 'none';
      side.setAttribute('aria-hidden','true');
      side.tabIndex = -1;
    }
    const view = document.getElementById('vAcciones');
    if (view) {
      view.style.display = 'none';
      view.setAttribute('aria-hidden','true');
    }
  }

  function _wrapLegacyNavigation() {
    if (global.__dailyControlCompletionNavigationWrapped || typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__dailyControlCompletionNavigationWrapped = true;
    global.showView = function(view, ...args) {
      if (view === 'acciones') return _originalShowView.call(this, 'dashboard', ...args);
      return _originalShowView.call(this, view, ...args);
    };
  }

  function initDailyControlCompletion() {
    _retireCenterActions();
    _wrapLegacyNavigation();
    renderCompletion();
    if (_timer) clearInterval(_timer);
    _timer = setInterval(renderCompletion, 1500);
    return true;
  }

  global.PanelDailyControlCompletion = Object.freeze({
    initDailyControlCompletion,
    renderCompletion,
    openAppointment,
    openPatient
  });
})(typeof window !== 'undefined' ? window : globalThis);
