/* Cuidándote Fisioterapia — consolidación visual de Seguimiento y Recordatorios. */
(function (global) {
  'use strict';

  let _activeTab = 'today';
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
      .follow-hub-count{display:inline-flex;align-items:center;justify-content:center;min-width:19px;height:19px;padding:0 5px;border-radius:99px;background:var(--primary);color:#063b36;font:700 .68rem var(--font-m)}
      .follow-hub-panel{display:none}
      .follow-hub-panel.active{display:block}
      .follow-hub-intro{display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;padding:13px 16px;margin-bottom:16px;border:1px solid rgba(27,191,176,.25);border-radius:11px;background:rgba(27,191,176,.06);font-size:.83rem;line-height:1.45}.follow-hub-intro strong{color:var(--primary-h)}.follow-hub-intro span{color:var(--muted);flex:1;min-width:240px}
      .seg-results-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.seg-results-grid>div{padding:16px;background:var(--s1);border:1px solid var(--border);border-radius:12px}.seg-results-grid span{display:block;color:var(--muted);font-size:.73rem}.seg-results-grid strong{display:block;margin-top:5px;color:var(--primary-h);font:700 1.45rem var(--font-h)}
      @media(max-width:640px){.follow-hub-tabs{display:grid;grid-template-columns:1fr}.follow-hub-tab{width:100%;justify-content:space-between;text-align:left}.seg-results-grid{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);
  }

  function _renderForTab(tab) {
    if (tab === 'today') {
      if (global.PanelPatientFollowUp && typeof global.PanelPatientFollowUp.renderRecentFollowUps === 'function') global.PanelPatientFollowUp.renderRecentFollowUps();
      return;
    }
    if (tab === 'reactivation') {
      if (typeof global.renderSeguimiento === 'function') global.renderSeguimiento();
      return;
    }
    if (tab === 'team') {
      if (global.PanelPatientFollowUp && typeof global.PanelPatientFollowUp.renderTeamFollowUpTasks === 'function') global.PanelPatientFollowUp.renderTeamFollowUpTasks();
      return;
    }
    if (tab === 'results') {
      if (global.PanelPatientFollowUp && typeof global.PanelPatientFollowUp.renderFollowUpResults === 'function') global.PanelPatientFollowUp.renderFollowUpResults();
    }
  }

  function setTab(tab) {
    if (!['today', 'reactivation', 'team', 'results'].includes(tab)) tab = 'today';
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
    const segChildren = Array.from(seguimiento.children).filter(el => el !== segHeader);

    seguimiento.dataset.followHubReady = '1';
    _injectStyles();

    if (segHeader) {
      const title = segHeader.querySelector('.page-title');
      const sub = segHeader.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Seguimiento</em>';
      if (sub) sub.textContent = 'Organiza conversaciones de cuidado, reactivación y tareas para el equipo';
    }

    const tabs = document.createElement('div');
    tabs.className = 'follow-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Seguimiento de pacientes');

    const makeTab = (key, label, countId) => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'follow-hub-tab'; btn.dataset.followHubTab = key; btn.setAttribute('role', 'tab');
      btn.append(label);
      if (countId) { const count = document.createElement('span'); count.id = countId; count.className = 'follow-hub-count'; count.textContent = '0'; btn.append(count); }
      btn.addEventListener('click', () => setTab(key));
      return btn;
    };
    tabs.append(
      makeTab('today', 'Seguimientos de hoy', 'segTodayCount'),
      makeTab('reactivation', 'Reactivación de pacientes'),
      makeTab('team', 'Pendientes del equipo', 'segTeamCount'),
      makeTab('results', 'Resultados')
    );

    const todayPanel = document.createElement('div');
    todayPanel.className = 'follow-hub-panel'; todayPanel.dataset.followHubPanel = 'today'; todayPanel.setAttribute('role', 'tabpanel');
    todayPanel.innerHTML = '<div class="follow-hub-intro"><strong>Después de una sesión</strong><span>Pregunta cómo evolucionó la persona entre 1 y 3 días después. Esta conversación cuida la experiencia y permite detectar si requiere atención.</span></div><div id="segTodayList" style="display:flex;flex-direction:column;gap:10px"></div>';

    const segPanel = document.createElement('div');
    segPanel.className = 'follow-hub-panel';
    segPanel.dataset.followHubPanel = 'reactivation';
    segPanel.setAttribute('role', 'tabpanel');
    segChildren.forEach(el => segPanel.appendChild(el));

    const teamPanel = document.createElement('div');
    teamPanel.className = 'follow-hub-panel'; teamPanel.dataset.followHubPanel = 'team'; teamPanel.setAttribute('role', 'tabpanel');
    teamPanel.innerHTML = '<div class="follow-hub-intro"><strong>Lo que tú le dejas a la auxiliar</strong><span>Usa “Recordatorio” desde Hoy después de una sesión para indicar a quién escribir, cuándo y con qué contexto.</span></div><div id="segTeamTasks" style="display:flex;flex-direction:column;gap:10px"></div>';

    const resultsPanel = document.createElement('div');
    resultsPanel.className = 'follow-hub-panel'; resultsPanel.dataset.followHubPanel = 'results'; resultsPanel.setAttribute('role', 'tabpanel');
    resultsPanel.innerHTML = '<div class="follow-hub-intro"><strong>Resultados de seguimiento</strong><span>Mide qué conversaciones se convirtieron en citas. Marca cada resultado para que esta vista te ayude a decidir qué campaña repetir.</span></div><div id="segResults"></div>';

    if (segHeader) segHeader.insertAdjacentElement('afterend', tabs);
    else seguimiento.prepend(tabs);
    seguimiento.append(todayPanel, segPanel, teamPanel, resultsPanel);

    const oldSidebar = document.getElementById('sb-recordatorios');
    if (oldSidebar) {
      oldSidebar.style.display = 'none';
      oldSidebar.setAttribute('aria-hidden', 'true');
      oldSidebar.tabIndex = -1;
    }
    recordatorios.style.display = 'none';
    recordatorios.setAttribute('aria-hidden', 'true');
    // Esta acción elimina citas y pertenece a Agenda, no a una sección de
    // conversaciones con pacientes. Se conserva la función, pero se retira
    // de esta vista para evitar errores operativos.
    const cleanup = document.getElementById('btnLimpiarSinHora');
    if (cleanup) cleanup.style.display = 'none';

    setTab(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__followUpHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__followUpHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      if (view === 'recordatorios') { const result = _originalShowView.call(this, 'seguimiento', ...args); setTimeout(() => setTab('reactivation'), 0); return result; }
      const result = _originalShowView.call(this, view, ...args);
      if (view === 'seguimiento') setTimeout(() => setTab('today'), 0);
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
