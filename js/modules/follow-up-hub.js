/* Cuidándote Fisioterapia — consolidación visual de Seguimiento y Recordatorios. */
(function (global) {
  'use strict';

  let _activeTab = 'seguimiento';
  let _originalShowView = null;

  function _injectStyles() {
    if (document.getElementById('followUpHubStyles')) return;
    const style = document.createElement('style');
    style.id = 'followUpHubStyles';
    style.textContent = `
      .follow-hub-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px;padding:6px;background:var(--s2);border:1px solid var(--border);border-radius:12px}
      .follow-hub-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--muted);font:600 .84rem var(--font-b);padding:9px 14px;border-radius:9px;cursor:pointer;transition:var(--tr);min-height:40px;display:inline-flex;align-items:center;gap:7px}
      .follow-hub-tab:hover{color:var(--text);background:var(--s1)}
      .follow-hub-tab.active{background:var(--s1);color:var(--primary-h);border-color:var(--border);box-shadow:0 3px 12px rgba(0,0,0,.05)}
      .follow-hub-panel{display:none}
      .follow-hub-panel.active{display:block}
      @media(max-width:640px){.follow-hub-tabs{display:grid;grid-template-columns:1fr}.follow-hub-tab{width:100%;justify-content:space-between;text-align:left}}
    `;
    document.head.appendChild(style);
  }

  function _renderForTab(tab) {
    if (tab === 'seguimiento') {
      if (typeof global.renderSeguimiento === 'function') global.renderSeguimiento();
      return;
    }
    if (tab === 'recordatorios') {
      if (typeof global.cargarRecordatorios === 'function') global.cargarRecordatorios();
    }
  }

  function setTab(tab) {
    if (!['seguimiento', 'recordatorios'].includes(tab)) tab = 'seguimiento';
    _activeTab = tab;
    document.querySelectorAll('[data-follow-hub-tab]').forEach(btn => {
      const active = btn.dataset.followHubTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-follow-hub-panel]').forEach(panel => {
      const active = panel.dataset.followHubPanel === tab;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    _renderForTab(tab);
  }

  function _buildHub() {
    const seguimiento = document.getElementById('vSeguimiento');
    const recordatorios = document.getElementById('vRecordatorios');
    if (!seguimiento || !recordatorios) return false;
    if (seguimiento.dataset.followHubReady === '1') return true;

    const segHeader = seguimiento.querySelector(':scope > .page-header');
    const recHeader = recordatorios.querySelector(':scope > .page-header');
    const segChildren = Array.from(seguimiento.children).filter(el => el !== segHeader);
    const recChildren = Array.from(recordatorios.children).filter(el => el !== recHeader);

    seguimiento.dataset.followHubReady = '1';
    _injectStyles();

    if (segHeader) {
      const title = segHeader.querySelector('.page-title');
      const sub = segHeader.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Seguimiento</em>';
      if (sub) sub.textContent = 'Reagendamiento y recordatorios de pacientes desde un solo lugar';
    }

    const tabs = document.createElement('div');
    tabs.className = 'follow-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Seguimiento de pacientes');

    const segBtn = document.createElement('button');
    segBtn.type = 'button';
    segBtn.className = 'follow-hub-tab';
    segBtn.dataset.followHubTab = 'seguimiento';
    segBtn.setAttribute('role', 'tab');
    segBtn.textContent = 'Reagendamiento';
    segBtn.addEventListener('click', () => setTab('seguimiento'));

    const recBtn = document.createElement('button');
    recBtn.type = 'button';
    recBtn.className = 'follow-hub-tab';
    recBtn.dataset.followHubTab = 'recordatorios';
    recBtn.setAttribute('role', 'tab');
    const recLabel = document.createElement('span');
    recLabel.textContent = 'Recordatorios';
    recBtn.appendChild(recLabel);
    const recBadge = document.getElementById('badgeRecordatorios');
    if (recBadge) recBtn.appendChild(recBadge);
    recBtn.addEventListener('click', () => setTab('recordatorios'));

    tabs.append(segBtn, recBtn);

    const segPanel = document.createElement('div');
    segPanel.className = 'follow-hub-panel';
    segPanel.dataset.followHubPanel = 'seguimiento';
    segPanel.setAttribute('role', 'tabpanel');
    segChildren.forEach(el => segPanel.appendChild(el));

    const recPanel = document.createElement('div');
    recPanel.className = 'follow-hub-panel';
    recPanel.dataset.followHubPanel = 'recordatorios';
    recPanel.setAttribute('role', 'tabpanel');
    recChildren.forEach(el => recPanel.appendChild(el));

    if (segHeader) segHeader.insertAdjacentElement('afterend', tabs);
    else seguimiento.prepend(tabs);
    seguimiento.append(segPanel, recPanel);

    const oldSidebar = document.getElementById('sb-recordatorios');
    if (oldSidebar) {
      oldSidebar.style.display = 'none';
      oldSidebar.setAttribute('aria-hidden', 'true');
      oldSidebar.tabIndex = -1;
    }
    recordatorios.style.display = 'none';
    recordatorios.setAttribute('aria-hidden', 'true');

    setTab(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__followUpHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__followUpHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      if (view === 'recordatorios') {
        const result = _originalShowView.call(this, 'seguimiento', ...args);
        setTimeout(() => setTab('recordatorios'), 0);
        return result;
      }
      const result = _originalShowView.call(this, view, ...args);
      if (view === 'seguimiento') setTimeout(() => setTab('seguimiento'), 0);
      return result;
    };
  }

  function _initCommissionsHubModule() {
    const start = () => {
      const mod = global.PanelCommissionsHub;
      if (mod && typeof mod.initCommissionsHub === 'function') mod.initCommissionsHub();
    };
    if (global.PanelCommissionsHub) { start(); return; }
    const existing = document.querySelector('script[data-panel-commissions-hub]');
    if (existing) { existing.addEventListener('load', start, { once:true }); return; }
    const script = document.createElement('script');
    script.src = 'js/modules/commissions-hub.js';
    script.dataset.panelCommissionsHub = '1';
    script.addEventListener('load', start, { once:true });
    script.addEventListener('error', () => console.warn('No se pudo cargar Comisiones unificado'), { once:true });
    document.head.appendChild(script);
  }

  function initFollowUpHub() {
    const ready = _buildHub();
    if (ready) _wrapLegacyNavigation();
    _initCommissionsHubModule();
    return ready;
  }

  global.PanelFollowUpHub = Object.freeze({
    initFollowUpHub,
    setTab
  });
})(typeof window !== 'undefined' ? window : globalThis);
