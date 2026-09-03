/* Cuidándote Fisioterapia — navegación administrativa agrupada y compacta. */
(function (global) {
  'use strict';

  const PRIMARY_IDS = ['sb-calendario','sb-dashboard','sb-agenda','sb-pacientes','sb-pagos','sb-seguimiento','sb-pasaporte'];
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
    { id:'tools', label:'Herramientas', items:['sb-evaluacion','sb-evalexpress'] }
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
        // Algunos enlaces (incluido Google Calendar) se insertan después de
        // cargar este módulo. Reaplicar la navegación principal evita que
        // queden dentro de Gestión por el orden en que se creó el DOM.
        const primary = _ensurePrimary(sidebar);
        const toggle = _ensureToggle(sidebar, primary);
        _ensurePanel(sidebar, toggle);
        _moveItems(sidebar);
      });
    });
    _observer.observe(sidebar, { childList:true });
  }

  let _dashboardRecoveryTimer = null;
  let _dashboardRecoveryAttempts = 0;

  function _dashboardNeedsRecovery() {
    const app = document.getElementById('adminApp');
    if (!app || getComputedStyle(app).display === 'none') return false;
    const stHoy = document.getElementById('stHoy');
    const tlHoy = document.getElementById('tlHoy');
    const tlProximas = document.getElementById('tlProximas');
    const statPending = !!stHoy && stHoy.textContent.trim() === '—';
    const todayPending = !!tlHoy && /Cargando/i.test(tlHoy.textContent || '');
    const upcomingPending = !!tlProximas && /Cargando/i.test(tlProximas.textContent || '');
    return statPending || todayPending || upcomingPending;
  }

  function _dashboardRecoveryNormDate(value) {
    if (!value) return '';
    if (value instanceof Date) {
      const y = value.getFullYear();
      const m = String(value.getMonth() + 1).padStart(2, '0');
      const d = String(value.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return String(value).split('T')[0].trim();
  }

  function _dashboardRecoveryEsc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function _dashboardRecoveryAppointments() {
    try {
      if (typeof citasReales === 'function') {
        const rows = citasReales();
        if (Array.isArray(rows)) return rows;
      }
    } catch (error) {
      console.warn('Dashboard recovery: citasReales no disponible', error);
    }
    const source = typeof allData !== 'undefined' && Array.isArray(allData?.citas) ? allData.citas : [];
    const seen = new Set();
    return source.filter(c => {
      const estado = String(c?.estado || '');
      if (estado === 'Cancelada' || estado === 'Registro') return false;
      const hora = String(c?.hora || '').trim();
      if (!hora || /^00:[0-5]\d$/.test(hora)) return false;
      const servicio = String(c?.servicio || '').trim().toLowerCase();
      if (servicio === 'registro') return false;
      const key = `${String(c?.nombre || '').toLowerCase().trim()}|${_dashboardRecoveryNormDate(c?.fecha)}|${hora}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function _dashboardRecoveryDateLabel(value) {
    const norm = _dashboardRecoveryNormDate(value);
    const parts = norm.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return norm || '—';
    return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString('es-CO', {
      weekday: 'short', day: 'numeric', month: 'short'
    });
  }

  function _renderDashboardCoreRecovery() {
    const citas = _dashboardRecoveryAppointments();
    const now = new Date();
    const todayStr = _dashboardRecoveryNormDate(now);
    const dow = now.getDay();
    const startW = new Date(now);
    startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    startW.setHours(0, 0, 0, 0);
    const endW = new Date(startW);
    endW.setDate(startW.getDate() + 6);
    endW.setHours(23, 59, 59, 999);

    const asLocalDate = value => {
      const [y, m, d] = _dashboardRecoveryNormDate(value).split('-').map(Number);
      return new Date(y, m - 1, d);
    };

    const hoy = citas.filter(c => _dashboardRecoveryNormDate(c.fecha) === todayStr).length;
    const semana = citas.filter(c => {
      const d = asLocalDate(c.fecha);
      return !Number.isNaN(d.getTime()) && d >= startW && d <= endW;
    }).length;
    const mes = citas.filter(c => {
      const [y, m] = _dashboardRecoveryNormDate(c.fecha).split('-').map(Number);
      return y === now.getFullYear() && m === now.getMonth() + 1;
    }).length;
    const pacientes = new Set(citas.map(c => c.telefono || c.email || String(c.nombre || '').toLowerCase().trim()).filter(Boolean)).size;

    const values = { stHoy: hoy, stSemana: semana, stMes: mes, stPacientes: pacientes };
    Object.entries(values).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    });

    const renderRow = (c, showDate) => {
      const date = showDate ? `<div class="tl-time" style="min-width:80px">${_dashboardRecoveryEsc(_dashboardRecoveryDateLabel(c.fecha))}<br><small style="color:var(--muted)">${_dashboardRecoveryEsc(c.hora || '')}</small></div>` : `<div class="tl-time">${_dashboardRecoveryEsc(c.hora || '')}</div>`;
      const service = [c.servicio, c.modalidad].filter(Boolean).join(' » ');
      return `<div class="tl-item">${date}<div class="tl-body"><div class="tl-name">${_dashboardRecoveryEsc(c.nombre || 'Paciente')}</div><div class="tl-serv">${_dashboardRecoveryEsc(service)}</div><div class="tl-actions"><button type="button" class="btn btn-ghost btn-sm" onclick="showView('agenda')">Abrir agenda</button></div></div></div>`;
    };

    const hoyRows = citas
      .filter(c => _dashboardRecoveryNormDate(c.fecha) === todayStr)
      .sort((a, b) => String(a.hora || '').localeCompare(String(b.hora || '')));
    const tlHoy = document.getElementById('tlHoy');
    if (tlHoy) {
      tlHoy.innerHTML = hoyRows.length
        ? hoyRows.map(c => renderRow(c, false)).join('')
        : '<div class="empty"><p>No hay citas hoy</p></div>';
    }

    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const in7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999);
    const upcoming = citas
      .filter(c => {
        const d = asLocalDate(c.fecha);
        return !Number.isNaN(d.getTime()) && d >= tomorrow && d <= in7;
      })
      .sort((a, b) => `${_dashboardRecoveryNormDate(a.fecha)}${a.hora || ''}`.localeCompare(`${_dashboardRecoveryNormDate(b.fecha)}${b.hora || ''}`))
      .slice(0, 8);
    const tlProximas = document.getElementById('tlProximas');
    if (tlProximas) {
      tlProximas.innerHTML = upcoming.length
        ? upcoming.map(c => renderRow(c, true)).join('')
        : '<div class="empty"><p>No hay citas en los próximos 7 días</p></div>';
    }
    document.body.dataset.dashboardRecovery = 'fallback';
  }

  function _attemptDashboardRecovery() {
    _dashboardRecoveryTimer = null;
    if (!_dashboardNeedsRecovery()) return;
    _dashboardRecoveryAttempts += 1;
    try {
      if (typeof initDashboard === 'function') initDashboard();
    } catch (error) {
      console.warn('Dashboard recovery: initDashboard falló', error);
    }
    if (_dashboardNeedsRecovery() && _dashboardRecoveryAttempts >= 2) {
      _renderDashboardCoreRecovery();
    }
    if (_dashboardNeedsRecovery() && _dashboardRecoveryAttempts < 8) {
      _dashboardRecoveryTimer = setTimeout(_attemptDashboardRecovery, 1500);
    }
  }

  function _installDashboardRecovery() {
    if (document.body?.dataset.dashboardRecoveryWatch === '1') return;
    if (document.body) document.body.dataset.dashboardRecoveryWatch = '1';

    const scheduleRecovery = (delay = 250) => {
      if (!_dashboardNeedsRecovery()) return;
      clearTimeout(_dashboardRecoveryTimer);
      _dashboardRecoveryTimer = setTimeout(_attemptDashboardRecovery, delay);
    };

    const app = document.getElementById('adminApp');
    if (app && typeof MutationObserver === 'function') {
      const observer = new MutationObserver(() => scheduleRecovery(100));
      observer.observe(app, { attributes:true, attributeFilter:['style','class'] });
    }

    _dashboardRecoveryTimer = setTimeout(_attemptDashboardRecovery, 1500);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      scheduleRecovery(250);
    });
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
    _installDashboardRecovery();
    return true;
  }

  global.PanelSidebarManagement = Object.freeze({ initSidebarManagement });
})(typeof window !== 'undefined' ? window : globalThis);
