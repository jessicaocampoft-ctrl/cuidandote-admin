/* Cuidándote Fisioterapia — navegación administrativa agrupada y compacta. */
(function (global) {
  'use strict';

  const PRIMARY_IDS = ['sb-dashboard','sb-agenda','sb-pacientes','sb-pagos','sb-seguimiento','sb-pasaporte'];
  const LEGACY_HIDDEN_IDS = [
    'sb-tareas','sb-basedatos','sb-recordatorios','sb-guioneswa','sb-recuperacion',
    'sb-guiakpis','sb-presupuesto','sb-comisiones','sb-acciones'
  ];
  const GROUPS = [
    { id:'finance', label:'Finanzas', items:['sb-finanzas'] },
    { id:'operations', label:'Operación', items:['sb-nueva','sb-bloquear','sb-horariospublicos','sb-paquetes','sb-espera','sb-automatizaciones'] },
    { id:'commercial', label:'Comercial', items:['sb-empresas','sb-codigos'] },
    { id:'team', label:'Equipo', items:['sb-equipo'] },
    { id:'communications', label:'Comunicación', items:['sb-mensajes'] },
    { id:'tools', label:'Herramientas', items:['sb-calendario','sb-evaluacion','sb-evalexpress'] }
  ];

  let _observer = null;
  let _placing = false;

  function _injectStyles() {
    if (document.getElementById('sidebarManagementStyles')) return;
    const style = document.createElement('style');
    style.id = 'sidebarManagementStyles';
    style.textContent = `
      .sb-primary-nav{display:grid;gap:4px;width:100%}
      #sbManagementPanel{display:grid;gap:5px;width:100%;padding:4px 0 2px}
      #sidebar:not(.tools-open) #sbManagementPanel{display:none}
      .sb-management-group{display:grid;gap:3px;width:100%}
      .sb-management-toggle{appearance:none;width:100%;border:0;background:transparent;color:var(--muted);font:650 .78rem var(--font-b);padding:9px 10px;border-radius:9px;display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;text-align:left;transition:var(--tr-fast)}
      .sb-management-toggle:hover{background:var(--s2);color:var(--text)}
      .sb-management-toggle svg{transition:transform var(--tr-fast);flex:0 0 auto}
      .sb-management-group.open > .sb-management-toggle{color:var(--primary-h);background:rgba(27,191,176,.07)}
      .sb-management-group.open > .sb-management-toggle svg{transform:rotate(180deg)}
      .sb-management-items{display:none;gap:2px;padding:0 0 3px 4px}
      .sb-management-group.open > .sb-management-items{display:grid}
      #sbManagementPanel .sb-link{width:100%;margin:0;padding:9px 10px 9px 16px;font-size:.82rem;border-radius:9px}
      #sbManagementPanel .sb-link[aria-hidden="true"]{display:none !important}
      #sidebar.sb-collapsed #sbManagementPanel{display:none !important}
      #sidebar.sb-collapsed .sb-primary-nav{gap:3px}
      #sidebar.sb-collapsed .sb-tools-toggle svg:last-child{display:none}
      .sb-tools-toggle{margin-top:5px}
    `;
    document.head.appendChild(style);
  }

  function _assignEvaluationId(sidebar) {
    if (document.getElementById('sb-evaluacion')) return;
    const link = Array.from(sidebar.querySelectorAll('a.sb-link')).find(el => {
      const href = String(el.getAttribute('href') || '').toLowerCase();
      return href === 'evaluacion.html' || href.endsWith('/evaluacion.html');
    });
    if (link) idSafe(link, 'sb-evaluacion');
  }

  function idSafe(el, id) {
    if (!el || document.getElementById(id)) return;
    el.id = id;
  }

  function _setSimpleLabel(id, label) {
    const el = document.getElementById(id);
    if (!el) return;
    el.dataset.tooltip = label;
    const textNode = Array.from(el.childNodes).find(node => node.nodeType === 3 && String(node.textContent || '').trim());
    if (textNode) {
      textNode.textContent = `\n      ${label}\n    `;
      return;
    }
    const candidate = Array.from(el.children).find(child => child.tagName === 'SPAN' && !child.id && !child.querySelector('[id^="badge"]'));
    if (candidate) candidate.textContent = label;
  }

  function _setCodesLabel() {
    const el = document.getElementById('sb-codigos');
    if (!el) return;
    el.dataset.tooltip = 'Códigos y bonos';
    const label = Array.from(el.children).find(child => child.tagName === 'SPAN' && child.id !== 'badgeBonos');
    if (label) {
      label.textContent = 'Códigos y bonos';
      label.style.lineHeight = '1.3';
    }
  }

  function _hideLegacy() {
    LEGACY_HIDDEN_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = 'none';
      el.setAttribute('aria-hidden','true');
      el.tabIndex = -1;
    });
  }

  function _ensurePrimary(sidebar) {
    let primary = document.getElementById('sbPrimaryNav');
    if (!primary) {
      primary = document.createElement('div');
      primary.id = 'sbPrimaryNav';
      primary.className = 'sb-primary-nav';
      primary.setAttribute('aria-label','Navegación principal');
      const search = sidebar.querySelector(':scope > .sb-search');
      if (search) search.insertAdjacentElement('afterend', primary);
      else sidebar.prepend(primary);
    }
    PRIMARY_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('sb-secondary');
      el.removeAttribute('aria-hidden');
      if (el.parentElement !== primary) primary.appendChild(el);
    });
    _setSimpleLabel('sb-dashboard','Inicio');
    return primary;
  }

  function _ensureToggle(sidebar, primary) {
    let toggle = document.getElementById('sbToolsToggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'sbToolsToggle';
      toggle.type = 'button';
      toggle.className = 'sb-tools-toggle';
      toggle.innerHTML = '<span>Gestión</span><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
      primary.insertAdjacentElement('afterend', toggle);
    } else if (toggle.dataset.managementReady !== '1') {
      const clean = toggle.cloneNode(true);
      toggle.replaceWith(clean);
      toggle = clean;
    }

    toggle.dataset.managementReady = '1';
    toggle.setAttribute('aria-controls','sbManagementPanel');
    toggle.setAttribute('aria-expanded', String(sidebar.classList.contains('tools-open')));
    const label = toggle.querySelector('span');
    if (label) label.textContent = 'Gestión';
    if (!toggle.dataset.managementBound) {
      toggle.dataset.managementBound = '1';
      toggle.addEventListener('click', () => {
        const open = sidebar.classList.toggle('tools-open');
        toggle.setAttribute('aria-expanded', String(open));
        const txt = toggle.querySelector('span');
        if (txt) txt.textContent = 'Gestión';
      });
    }
    if (toggle.previousElementSibling !== primary) primary.insertAdjacentElement('afterend', toggle);
    return toggle;
  }

  function _makeGroup(def) {
    const group = document.createElement('div');
    group.className = 'sb-management-group';
    group.dataset.managementGroup = def.id;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'sb-management-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML = `<span>${def.label}</span><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;

    const body = document.createElement('div');
    body.className = 'sb-management-items';
    body.dataset.managementItems = def.id;

    toggle.addEventListener('click', () => {
      const open = group.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    group.append(toggle, body);
    return group;
  }

  function _ensurePanel(sidebar, toggle) {
    let panel = document.getElementById('sbManagementPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'sbManagementPanel';
      panel.setAttribute('aria-label','Gestión');
      GROUPS.forEach(def => panel.appendChild(_makeGroup(def)));
      toggle.insertAdjacentElement('afterend', panel);
    } else if (panel.previousElementSibling !== toggle) {
      toggle.insertAdjacentElement('afterend', panel);
    }
    return panel;
  }

  function _moveItems(sidebar) {
    if (_placing) return;
    _placing = true;
    try {
      _assignEvaluationId(sidebar);
      _hideLegacy();
      _setSimpleLabel('sb-finanzas','Gestión financiera');
      _setCodesLabel();

      GROUPS.forEach(def => {
        const body = document.querySelector(`[data-management-items="${def.id}"]`);
        if (!body) return;
        def.items.forEach(id => {
          const el = document.getElementById(id);
          if (!el || el.getAttribute('aria-hidden') === 'true' || el.style.display === 'none') return;
          el.classList.add('sb-secondary');
          if (el.parentElement !== body) body.appendChild(el);
        });
        const group = body.closest('.sb-management-group');
        if (group) {
          const hasVisible = Array.from(body.children).some(el => el.getAttribute('aria-hidden') !== 'true' && el.style.display !== 'none');
          group.hidden = !hasVisible;
        }
      });

      sidebar.querySelectorAll(':scope > .sb-sep').forEach(sep => {
        if (!String(sep.getAttribute('style') || '').includes('margin-top:auto')) sep.style.display = 'none';
      });
    } finally {
      _placing = false;
    }
  }

  function _watchDynamicLinks(sidebar) {
    if (_observer) return;
    let scheduled = false;
    _observer = new MutationObserver(() => {
      if (scheduled || _placing) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        _moveItems(sidebar);
      });
    });
    _observer.observe(sidebar, { childList:true });
  }

  function initSidebarManagement() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return false;
    _injectStyles();
    const primary = _ensurePrimary(sidebar);
    const toggle = _ensureToggle(sidebar, primary);
    _ensurePanel(sidebar, toggle);
    _moveItems(sidebar);
    _watchDynamicLinks(sidebar);
    sidebar.dataset.managementOrganized = '1';
    return true;
  }

  global.PanelSidebarManagement = Object.freeze({ initSidebarManagement });
})(typeof window !== 'undefined' ? window : globalThis);
