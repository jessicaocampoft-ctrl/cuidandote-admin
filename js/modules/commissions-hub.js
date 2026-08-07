/* Cuidándote Fisioterapia — consolidación visual de Comisiones y Recuperaciones. */
(function (global) {
  'use strict';

  let _activeTab = 'comisiones';
  let _originalShowView = null;

  function _injectStyles() {
    if (document.getElementById('commissionsHubStyles')) return;
    const style = document.createElement('style');
    style.id = 'commissionsHubStyles';
    style.textContent = `
      .comm-hub-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px;padding:6px;background:var(--s2);border:1px solid var(--border);border-radius:12px}
      .comm-hub-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--muted);font:600 .84rem var(--font-b);padding:9px 14px;border-radius:9px;cursor:pointer;transition:var(--tr);min-height:40px}
      .comm-hub-tab:hover{color:var(--text);background:var(--s1)}
      .comm-hub-tab.active{background:var(--s1);color:var(--primary-h);border-color:var(--border);box-shadow:0 3px 12px rgba(0,0,0,.05)}
      .comm-hub-panel{display:none}
      .comm-hub-panel.active{display:block}
      .comm-hub-note{font-size:.82rem;color:var(--muted);line-height:1.5;margin:-6px 0 16px}
      @media(max-width:640px){.comm-hub-tabs{display:grid;grid-template-columns:1fr}.comm-hub-tab{width:100%;text-align:left}}
    `;
    document.head.appendChild(style);
  }

  function _renderForTab(tab) {
    if (tab === 'comisiones') {
      if (typeof global.renderComisiones === 'function') global.renderComisiones();
      return;
    }
    if (tab === 'recuperaciones') {
      if (typeof global.renderRecuperaciones === 'function') global.renderRecuperaciones();
    }
  }

  function setTab(tab) {
    if (!['comisiones', 'recuperaciones'].includes(tab)) tab = 'comisiones';
    _activeTab = tab;
    document.querySelectorAll('[data-comm-hub-tab]').forEach(btn => {
      const active = btn.dataset.commHubTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-comm-hub-panel]').forEach(panel => {
      const active = panel.dataset.commHubPanel === tab;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    _renderForTab(tab);
  }

  function _openPatientReactivation() {
    if (typeof global.showView === 'function') global.showView('pacientes');
    setTimeout(() => {
      const hub = global.PanelPatientHub;
      if (hub && typeof hub.setTab === 'function') hub.setTab('reactivacion');
    }, 0);
  }

  function _buildHub() {
    const comisiones = document.getElementById('vComisiones');
    const recuperacion = document.getElementById('vRecuperacion');
    if (!comisiones || !recuperacion) return false;
    if (comisiones.dataset.commHubReady === '1') return true;

    const comHeader = comisiones.querySelector(':scope > .page-header');
    const recHeader = recuperacion.querySelector(':scope > .page-header');
    const comChildren = Array.from(comisiones.children).filter(el => el !== comHeader);
    const recChildren = Array.from(recuperacion.children).filter(el => el !== recHeader);

    comisiones.dataset.commHubReady = '1';
    _injectStyles();

    if (comHeader) {
      const title = comHeader.querySelector('.page-title');
      const sub = comHeader.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Comisiones</em>';
      if (sub) sub.textContent = 'Comisiones del equipo y ventas recuperadas desde un solo lugar';
    }

    const tabs = document.createElement('div');
    tabs.className = 'comm-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Gestión de comisiones');
    [
      ['comisiones', 'Comisiones'],
      ['recuperaciones', 'Recuperaciones']
    ].forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'comm-hub-tab';
      btn.dataset.commHubTab = id;
      btn.setAttribute('role', 'tab');
      btn.textContent = label;
      btn.addEventListener('click', () => setTab(id));
      tabs.appendChild(btn);
    });

    const comPanel = document.createElement('div');
    comPanel.className = 'comm-hub-panel';
    comPanel.dataset.commHubPanel = 'comisiones';
    comPanel.setAttribute('role', 'tabpanel');
    comChildren.forEach(el => comPanel.appendChild(el));

    const recPanel = document.createElement('div');
    recPanel.className = 'comm-hub-panel';
    recPanel.dataset.commHubPanel = 'recuperaciones';
    recPanel.setAttribute('role', 'tabpanel');

    const note = document.createElement('div');
    note.className = 'comm-hub-note';
    note.innerHTML = 'Esta pestaña conserva únicamente el control económico de pacientes recuperados. La lista de pacientes inactivos vive ahora en <strong>Pacientes → Reactivación</strong>.';
    const goPatients = document.createElement('button');
    goPatients.type = 'button';
    goPatients.className = 'btn btn-ghost btn-sm';
    goPatients.textContent = 'Ver pacientes para reactivar';
    goPatients.style.marginBottom = '16px';
    goPatients.addEventListener('click', _openPatientReactivation);
    recPanel.append(note, goPatients);

    recChildren.forEach(el => recPanel.appendChild(el));

    const inactivePanel = document.getElementById('recInactivosPanel');
    if (inactivePanel && inactivePanel.parentElement) {
      inactivePanel.parentElement.style.display = 'none';
      inactivePanel.parentElement.setAttribute('aria-hidden', 'true');
    }

    if (comHeader) comHeader.insertAdjacentElement('afterend', tabs);
    else comisiones.prepend(tabs);
    comisiones.append(comPanel, recPanel);

    const oldSidebar = document.getElementById('sb-recuperacion');
    if (oldSidebar) {
      oldSidebar.style.display = 'none';
      oldSidebar.setAttribute('aria-hidden', 'true');
      oldSidebar.tabIndex = -1;
    }
    recuperacion.style.display = 'none';
    recuperacion.setAttribute('aria-hidden', 'true');

    setTab(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__commissionsHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__commissionsHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      if (view === 'recuperacion') {
        const result = _originalShowView.call(this, 'comisiones', ...args);
        setTimeout(() => setTab('recuperaciones'), 0);
        return result;
      }
      const result = _originalShowView.call(this, view, ...args);
      if (view === 'comisiones') setTimeout(() => setTab('comisiones'), 0);
      return result;
    };
  }

  function _initCommunicationsHubModule() {
    const start = () => {
      const mod = global.PanelCommunicationsHub;
      if (mod && typeof mod.initCommunicationsHub === 'function') mod.initCommunicationsHub();
    };
    if (global.PanelCommunicationsHub) { start(); return; }
    const existing = document.querySelector('script[data-panel-communications-hub]');
    if (existing) { existing.addEventListener('load', start, { once:true }); return; }
    const script = document.createElement('script');
    script.src = 'js/modules/communications-hub.js';
    script.dataset.panelCommunicationsHub = '1';
    script.addEventListener('load', start, { once:true });
    script.addEventListener('error', () => console.warn('No se pudo cargar Mensajes unificado'), { once:true });
    document.head.appendChild(script);
  }

  function initCommissionsHub() {
    const ready = _buildHub();
    if (ready) _wrapLegacyNavigation();
    _initCommunicationsHubModule();
    return ready;
  }

  global.PanelCommissionsHub = Object.freeze({
    initCommissionsHub,
    setTab
  });
})(typeof window !== 'undefined' ? window : globalThis);
