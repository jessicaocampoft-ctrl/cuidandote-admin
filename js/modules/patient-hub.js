/* Cuidándote Fisioterapia — consolidación de Pacientes y Base de datos. */
(function (global) {
  'use strict';

  let _activeTab = 'lista';
  let _originalShowView = null;

  function _injectStyles() {
    if (document.getElementById('patientHubStyles')) return;
    const style = document.createElement('style');
    style.id = 'patientHubStyles';
    style.textContent = `
      .patient-hub-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px;padding:6px;background:var(--s2);border:1px solid var(--border);border-radius:12px}
      .patient-hub-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--muted);font:600 .84rem var(--font-b);padding:9px 14px;border-radius:9px;cursor:pointer;transition:var(--tr);min-height:40px}
      .patient-hub-tab:hover{color:var(--text);background:var(--s1)}
      .patient-hub-tab.active{background:var(--s1);color:var(--primary-h);border-color:var(--border);box-shadow:0 3px 12px rgba(0,0,0,.05)}
      .patient-hub-panel{display:none}
      .patient-hub-panel.active{display:block}
      .patient-hub-note{font-size:.82rem;color:var(--muted);line-height:1.5;margin:-6px 0 16px}
      @media(max-width:640px){.patient-hub-tabs{display:grid;grid-template-columns:1fr}.patient-hub-tab{width:100%;text-align:left}}
    `;
    document.head.appendChild(style);
  }

  function _renderForTab(tab) {
    if (tab === 'lista') {
      if (typeof global.renderPacientes === 'function') global.renderPacientes();
      return;
    }
    if (tab === 'registrar') {
      if (typeof global.initFormDB === 'function') global.initFormDB();
      return;
    }
    if (tab === 'reactivacion') {
      if (typeof global.renderReactivacion === 'function') global.renderReactivacion();
    }
  }

  function setTab(tab) {
    const valid = new Set(['lista', 'registrar', 'reactivacion']);
    if (!valid.has(tab)) tab = 'lista';
    _activeTab = tab;

    document.querySelectorAll('[data-patient-hub-tab]').forEach(btn => {
      const active = btn.dataset.patientHubTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-patient-hub-panel]').forEach(panel => {
      const active = panel.dataset.patientHubPanel === tab;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });

    _renderForTab(tab);
  }

  function _buildHub() {
    const pacientes = document.getElementById('vPacientes');
    const basedatos = document.getElementById('vBasedatos');
    if (!pacientes || !basedatos) return false;
    if (pacientes.dataset.patientHubReady === '1') return true;

    const header = pacientes.querySelector(':scope > .page-header');
    const originalPatientChildren = Array.from(pacientes.children).filter(el => el !== header);
    const registerCard = document.getElementById('dbNombre')?.closest('.card') || null;
    const reactivationCard = document.getElementById('cardReactivacion');

    if (!registerCard || !reactivationCard) {
      console.warn('No se pudo consolidar Pacientes: faltan los bloques de registro o reactivación.');
      return false;
    }

    pacientes.dataset.patientHubReady = '1';
    _injectStyles();

    if (header) {
      const title = header.querySelector('.page-title');
      const sub = header.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Pacientes</em>';
      if (sub) sub.textContent = 'Consulta, registra y reactiva pacientes desde un solo lugar';
    }

    const tabs = document.createElement('div');
    tabs.className = 'patient-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Secciones de pacientes');
    [
      ['lista', 'Pacientes'],
      ['registrar', 'Registrar paciente'],
      ['reactivacion', 'Reactivación']
    ].forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'patient-hub-tab';
      btn.dataset.patientHubTab = id;
      btn.setAttribute('role', 'tab');
      btn.textContent = label;
      btn.addEventListener('click', () => setTab(id));
      tabs.appendChild(btn);
    });

    const listPanel = document.createElement('div');
    listPanel.className = 'patient-hub-panel';
    listPanel.dataset.patientHubPanel = 'lista';
    listPanel.setAttribute('role', 'tabpanel');
    originalPatientChildren.forEach(el => listPanel.appendChild(el));

    const registerPanel = document.createElement('div');
    registerPanel.className = 'patient-hub-panel';
    registerPanel.dataset.patientHubPanel = 'registrar';
    registerPanel.setAttribute('role', 'tabpanel');
    const registerNote = document.createElement('div');
    registerNote.className = 'patient-hub-note';
    registerNote.textContent = 'Úsalo para registrar una persona antes de su primera cita o completar su ingreso administrativo.';
    registerPanel.append(registerNote, registerCard);

    const reactPanel = document.createElement('div');
    reactPanel.className = 'patient-hub-panel';
    reactPanel.dataset.patientHubPanel = 'reactivacion';
    reactPanel.setAttribute('role', 'tabpanel');
    const reactNote = document.createElement('div');
    reactNote.className = 'patient-hub-note';
    reactNote.textContent = 'Aquí aparecen pacientes sin visita reciente y sin una próxima cita agendada.';
    reactPanel.append(reactNote, reactivationCard);

    if (header) header.insertAdjacentElement('afterend', tabs);
    else pacientes.prepend(tabs);
    pacientes.append(listPanel, registerPanel, reactPanel);

    const oldSidebar = document.getElementById('sb-basedatos');
    if (oldSidebar) {
      oldSidebar.style.display = 'none';
      oldSidebar.setAttribute('aria-hidden', 'true');
      oldSidebar.tabIndex = -1;
    }
    basedatos.style.display = 'none';
    basedatos.setAttribute('aria-hidden', 'true');

    setTab(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__patientHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__patientHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      if (view === 'basedatos') {
        const result = _originalShowView.call(this, 'pacientes', ...args);
        setTimeout(() => setTab('registrar'), 0);
        return result;
      }
      const result = _originalShowView.call(this, view, ...args);
      if (view === 'pacientes') setTimeout(() => setTab('lista'), 0);
      return result;
    };
  }

  function _initFollowUpHubModule() {
    const start = () => {
      const mod = global.PanelFollowUpHub;
      if (mod && typeof mod.initFollowUpHub === 'function') mod.initFollowUpHub();
    };
    if (global.PanelFollowUpHub) { start(); return; }
    const existing = document.querySelector('script[data-panel-follow-up-hub]');
    if (existing) { existing.addEventListener('load', start, { once:true }); return; }
    const script = document.createElement('script');
    script.src = 'js/modules/follow-up-hub.js';
    script.dataset.panelFollowUpHub = '1';
    script.addEventListener('load', start, { once:true });
    script.addEventListener('error', () => console.warn('No se pudo cargar Seguimiento unificado'), { once:true });
    document.head.appendChild(script);
  }

  function initPatientHub() {
    const ready = _buildHub();
    if (ready) _wrapLegacyNavigation();
    _initFollowUpHubModule();
    return ready;
  }

  global.PanelPatientHub = Object.freeze({
    initPatientHub,
    setTab
  });
})(typeof window !== 'undefined' ? window : globalThis);
