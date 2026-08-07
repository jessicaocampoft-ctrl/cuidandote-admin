/* Cuidándote Fisioterapia — Gestión financiera unificada. */
(function (global) {
  'use strict';

  let _activeTab = 'resumen';
  let _originalShowView = null;

  const VIEW_BY_TAB = {
    resumen: 'finanzas',
    metas: 'presupuesto',
    indicadores: 'guiakpis',
    comisiones: 'comisiones'
  };

  function _injectStyles() {
    if (document.getElementById('financeHubStyles')) return;
    const style = document.createElement('style');
    style.id = 'financeHubStyles';
    style.textContent = `
      .finance-hub-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 20px;padding:6px;background:var(--s2);border:1px solid var(--border);border-radius:12px}
      .finance-hub-tab{appearance:none;border:1px solid transparent;background:transparent;color:var(--muted);font:600 .84rem var(--font-b);padding:9px 14px;border-radius:9px;cursor:pointer;transition:var(--tr);min-height:40px}
      .finance-hub-tab:hover{color:var(--text);background:var(--s1)}
      .finance-hub-tab.active{background:var(--s1);color:var(--primary-h);border-color:var(--border);box-shadow:0 3px 12px rgba(0,0,0,.05)}
      .finance-hub-panel{display:none}
      .finance-hub-panel.active{display:block}
      .finance-report-card{padding:22px;border:1px solid var(--border);border-radius:16px;background:var(--s1);max-width:680px}
      .finance-report-card h3{font-family:var(--font-h);font-size:1.35rem;margin-bottom:8px}
      .finance-report-card p{color:var(--muted);line-height:1.55;margin-bottom:16px}
      @media(max-width:760px){.finance-hub-tabs{display:grid;grid-template-columns:1fr 1fr}.finance-hub-tab{width:100%;text-align:left}}
      @media(max-width:480px){.finance-hub-tabs{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function _showPanels(tab) {
    _activeTab = tab;
    document.querySelectorAll('[data-finance-hub-tab]').forEach(btn => {
      const active = btn.dataset.financeHubTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-finance-hub-panel]').forEach(panel => {
      const active = panel.dataset.financeHubPanel === tab;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  }

  function _primeOriginalView(tab) {
    if (!_originalShowView) return;
    const source = VIEW_BY_TAB[tab];
    if (!source) return;
    if (source !== 'finanzas') _originalShowView(source);
    _originalShowView('finanzas');
  }

  function setTab(tab, options = {}) {
    if (!['resumen','metas','indicadores','comisiones','reportes'].includes(tab)) tab = 'resumen';
    if (options.prime !== false) _primeOriginalView(tab);
    _showPanels(tab);
  }

  function _buildReportsPanel() {
    const panel = document.createElement('div');
    panel.className = 'finance-hub-panel';
    panel.dataset.financeHubPanel = 'reportes';
    panel.setAttribute('role', 'tabpanel');
    const card = document.createElement('div');
    card.className = 'finance-report-card';
    card.innerHTML = `
      <h3>Reportes de gestión</h3>
      <p>Genera el cierre mensual con los indicadores actuales. El reporte existente se conserva sin cambios y continúa permitiendo copiar, imprimir y preparar el resumen administrativo.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn btn-teal" data-finance-report-month>Reporte fin de mes</button>
        <button type="button" class="btn btn-ghost" data-finance-report-indicators>Ver indicadores</button>
      </div>`;
    card.querySelector('[data-finance-report-month]')?.addEventListener('click', () => {
      if (typeof global.abrirReporteMes === 'function') global.abrirReporteMes();
    });
    card.querySelector('[data-finance-report-indicators]')?.addEventListener('click', () => setTab('indicadores'));
    panel.appendChild(card);
    return panel;
  }

  function _buildHub() {
    const finanzas = document.getElementById('vFinanzas');
    const presupuesto = document.getElementById('vPresupuesto');
    const indicadores = document.getElementById('vGuiakpis');
    const comisiones = document.getElementById('vComisiones');
    if (!finanzas || !presupuesto || !indicadores || !comisiones) return false;
    if (finanzas.dataset.financeHubReady === '1') return true;

    const finHeader = finanzas.querySelector(':scope > .page-header');
    const preHeader = presupuesto.querySelector(':scope > .page-header');
    const indHeader = indicadores.querySelector(':scope > .page-header');
    const comHeader = comisiones.querySelector(':scope > .page-header');

    const finChildren = Array.from(finanzas.children).filter(el => el !== finHeader);
    const preChildren = Array.from(presupuesto.children).filter(el => el !== preHeader);
    const indChildren = Array.from(indicadores.children).filter(el => el !== indHeader);
    const comChildren = Array.from(comisiones.children).filter(el => el !== comHeader);

    finanzas.dataset.financeHubReady = '1';
    _injectStyles();

    if (finHeader) {
      const title = finHeader.querySelector('.page-title');
      const sub = finHeader.querySelector('.page-sub');
      if (title) title.innerHTML = '<em>Gestión financiera</em>';
      if (sub) sub.textContent = 'Resumen, metas, indicadores, comisiones y reportes en un solo lugar';
    }

    const tabs = document.createElement('div');
    tabs.className = 'finance-hub-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Gestión financiera');
    [
      ['resumen', 'Resumen'],
      ['metas', 'Metas y presupuesto'],
      ['indicadores', 'Indicadores'],
      ['comisiones', 'Comisiones'],
      ['reportes', 'Reportes']
    ].forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'finance-hub-tab';
      btn.dataset.financeHubTab = id;
      btn.setAttribute('role', 'tab');
      btn.textContent = label;
      btn.addEventListener('click', () => setTab(id));
      tabs.appendChild(btn);
    });

    const makePanel = (id, children) => {
      const panel = document.createElement('div');
      panel.className = 'finance-hub-panel';
      panel.dataset.financeHubPanel = id;
      panel.setAttribute('role', 'tabpanel');
      children.forEach(el => panel.appendChild(el));
      return panel;
    };

    const summaryPanel = makePanel('resumen', finChildren);
    const budgetPanel = makePanel('metas', preChildren);
    const indicatorsPanel = makePanel('indicadores', indChildren);
    const commissionsPanel = makePanel('comisiones', comChildren);
    const reportsPanel = _buildReportsPanel();

    if (finHeader) finHeader.insertAdjacentElement('afterend', tabs);
    else finanzas.prepend(tabs);
    finanzas.append(summaryPanel, budgetPanel, indicatorsPanel, commissionsPanel, reportsPanel);

    ['sb-guiakpis','sb-presupuesto','sb-comisiones'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
      el.tabIndex = -1;
    });
    const finSide = document.getElementById('sb-finanzas');
    if (finSide) finSide.setAttribute('data-tooltip', 'Gestión financiera');

    [presupuesto, indicadores, comisiones].forEach(view => {
      view.style.display = 'none';
      view.setAttribute('aria-hidden', 'true');
    });

    _showPanels(_activeTab);
    return true;
  }

  function _wrapLegacyNavigation() {
    if (global.__financeHubNavigationWrapped) return;
    if (typeof global.showView !== 'function') return;
    _originalShowView = global.showView;
    global.__financeHubNavigationWrapped = true;

    global.showView = function(view, ...args) {
      const map = {
        finanzas: 'resumen',
        presupuesto: 'metas',
        guiakpis: 'indicadores',
        comisiones: 'comisiones',
        recuperacion: 'comisiones'
      };
      const tab = map[view];
      if (tab) {
        if (view !== 'finanzas') _originalShowView.call(this, view, ...args);
        const result = _originalShowView.call(this, 'finanzas', ...args);
        setTimeout(() => {
          _showPanels(tab);
          if (view === 'recuperacion') {
            const hub = global.PanelCommissionsHub;
            if (hub && typeof hub.setTab === 'function') hub.setTab('recuperaciones');
          } else if (view === 'comisiones') {
            const hub = global.PanelCommissionsHub;
            if (hub && typeof hub.setTab === 'function') hub.setTab('comisiones');
          }
        }, 0);
        return result;
      }
      return _originalShowView.call(this, view, ...args);
    };
  }

  function initFinanceHub() {
    if (!_buildHub()) return false;
    _wrapLegacyNavigation();
    return true;
  }

  global.PanelFinanceHub = Object.freeze({
    initFinanceHub,
    setTab
  });
})(typeof window !== 'undefined' ? window : globalThis);
