/* Cuidándote Fisioterapia — biblioteca unificada de mensajes y plantillas. */
(function (global) {
  'use strict';

  let _activeTab = 'mensajes';
  let _originalShowView = null;

  function _injectStyles() {
    if (document.getElementById('communicationsHubStyles')) return;
    const style = document.createElement('style');
    style.id = 'communicationsHubStyles';
    style.textContent = `
      .commmsg-hub-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px;padding:6px;background:var(--s2);border:1px solid var(--border);border-radius:12px}
      .commmsg-hub-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--muted);font:600 .84rem var(--font-b);padding:9px 14px;border-radius:9px;cursor:pointer;transition:var(--tr);min-height:40px}
      .commmsg-hub-tab:hover{color:var(--text);background:var(--s1)}
      .commmsg-hub-tab.active{background:var(--s1);color:var(--primary-h);border-color:var(--border);box-shadow:0 3px 12px rgba(0,0,0,.05)}
      .commmsg-hub-panel{display:none}
      .commmsg-hub-panel.active{display:block}
      .commmsg-hub-note{font-size:.82rem;color:var(--muted);line-height:1.5;margin:-6px 0 16px}
      @media(max-width:640px){.commmsg-hub-tabs{display:grid;grid-template-columns:1fr}.commmsg-hub-tab{width:100%;text-align:left}}
    `;
    document.head.appendChild(style);
  }

  function _renderForTab(tab) {
    if (tab === 'mensajes') {
      if (typeof global.renderMensajes === 'function') global.renderMensajes();
      return;
    }
    if (tab === 'guiones') {
      if (typeof global.gCargarGuardados === 'function') global.gCargarGuardados();
      return;
    }
    if (tab === 'automaticas') {
      if (typeof global.initTareasConfig === 'function') global.initTareasConfig();
    }
  }

  function setTab(tab) {
    if (!['mensajes', 'guiones', 'automaticas'].includes(tab)) tab = 'mensajes';
    _activeTab = tab;
    document.querySelectorAll('[data-commmsg-hub-tab]').forEach(btn => {
      const active = btn.dataset.commmsgHubTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-commmsg-hub-panel]').forEach(panel => {
      const active = panel.dataset.commmsgHubPanel === tab;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    _renderForTab(tab);
  }

  function _buildHub() {
    const mensajes = document.getElementById('vMensajes');
    const guiones = document.getElementById('vGuioneswa');
    const automaticas = document.getElementById('vTareasConfig');
    if (!mensajes || !guiones || !automaticas) return false;
    if (mensajes.dataset.commmsgHubReady === '1') return true;

    const msgHeader = mensajes.querySelector(':scope > .page-header');
    const guiHeader = guiones.querySelector(':scope > .page-header');
    const autoHeader = automaticas.querySelector(':scope > .page-header');
    const msgChildren = Array.from(mensajes.children).filter(el => el !== msgHeader);
    const guiChildren = Array.from(guiones.children).filter(el => el !== guiHeader);
    const autoChildren = Array.from(automaticas.children).filter(el => el !== autoHeader);

    mensajes.dataset.commmsgHubReady = '1';
    _injectStyles();

    if (msgHeader) {
      const title = msgHeader.querySelector('.page-title');
      const sub = msgHeader.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Mensajes</em>';
      if (sub) sub.textContent = 'Respuestas rápidas, guiones y plantillas automáticas en una sola biblioteca';
    }

    const tabs = document.createElement('div');
    tabs.className = 'commmsg-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Biblioteca de mensajes');
    [
      ['mensajes', 'Respuestas rápidas'],
      ['guiones', 'Guiones'],
      ['automaticas', 'Plantillas automáticas']
    ].forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'commmsg-hub-tab';
      btn.dataset.commmsgHubTab = id;
      btn.setAttribute('role', 'tab');
      btn.textContent = label;
      btn.addEventListener('click', () => setTab(id));
      tabs.appendChild(btn);
    });

    const msgPanel = document.createElement('div');
    msgPanel.className = 'commmsg-hub-panel';
    msgPanel.dataset.commmsgHubPanel = 'mensajes';
    msgPanel.setAttribute('role', 'tabpanel');
    msgChildren.forEach(el => msgPanel.appendChild(el));

    const guiPanel = document.createElement('div');
    guiPanel.className = 'commmsg-hub-panel';
    guiPanel.dataset.commmsgHubPanel = 'guiones';
    guiPanel.setAttribute('role', 'tabpanel');
    const guiNote = document.createElement('div');
    guiNote.className = 'commmsg-hub-note';
    guiNote.textContent = 'Guiones largos y comerciales organizados por servicio, paquete o situación.';
    guiPanel.appendChild(guiNote);
    guiChildren.forEach(el => guiPanel.appendChild(el));

    const autoPanel = document.createElement('div');
    autoPanel.className = 'commmsg-hub-panel';
    autoPanel.dataset.commmsgHubPanel = 'automaticas';
    autoPanel.setAttribute('role', 'tabpanel');
    const autoNote = document.createElement('div');
    autoNote.className = 'commmsg-hub-note';
    autoNote.textContent = 'Estas plantillas alimentan las tareas automáticas de seguimiento post-sesión.';
    autoPanel.appendChild(autoNote);
    autoChildren.forEach(el => autoPanel.appendChild(el));

    if (msgHeader) msgHeader.insertAdjacentElement('afterend', tabs);
    else mensajes.prepend(tabs);
    mensajes.append(msgPanel, guiPanel, autoPanel);

    const oldGuiones = document.getElementById('sb-guioneswa');
    if (oldGuiones) {
      oldGuiones.style.display = 'none';
      oldGuiones.setAttribute('aria-hidden', 'true');
      oldGuiones.tabIndex = -1;
    }
    guiones.style.display = 'none';
    guiones.setAttribute('aria-hidden', 'true');
    automaticas.style.display = 'none';
    automaticas.setAttribute('aria-hidden', 'true');

    setTab(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__communicationsHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__communicationsHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      if (view === 'guioneswa') {
        const result = _originalShowView.call(this, 'mensajes', ...args);
        setTimeout(() => setTab('guiones'), 0);
        return result;
      }
      if (view === 'tareasConfig') {
        const result = _originalShowView.call(this, 'mensajes', ...args);
        setTimeout(() => setTab('automaticas'), 0);
        return result;
      }
      const result = _originalShowView.call(this, view, ...args);
      if (view === 'mensajes') setTimeout(() => setTab('mensajes'), 0);
      return result;
    };
  }

  function initCommunicationsHub() {
    if (!_buildHub()) return false;
    _wrapLegacyNavigation();
    return true;
  }

  global.PanelCommunicationsHub = Object.freeze({
    initCommunicationsHub,
    setTab
  });
})(typeof window !== 'undefined' ? window : globalThis);
