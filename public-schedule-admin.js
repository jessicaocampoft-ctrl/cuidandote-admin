(function () {
  'use strict';

  const DAYS = [
    ['0','Domingo'],['1','Lunes'],['2','Martes'],['3','Miércoles'],['4','Jueves'],['5','Viernes'],['6','Sábado']
  ];
  const SERVICES = {
    santa: [
      ['Descarga Muscular — Cuello y Espalda','Descarga muscular — Cuello y espalda'],
      ['Descarga Muscular — Piernas','Descarga muscular — Piernas'],
      ['Descarga Muscular Completa','Descarga muscular completa'],
      ['Valoración Funcional','Valoración fisioterapéutica inicial'],
      ['Readaptación Funcional','Rehabilitación y readaptación funcional']
    ],
    recovery: [
      ['Descarga Muscular — Cuello y Espalda','Descarga muscular — Cuello y espalda'],
      ['Descarga Muscular — Piernas','Descarga muscular — Piernas'],
      ['Descarga Muscular Completa','Descarga muscular completa']
    ]
  };

  let config = null;
  let loadedConfig = null;
  let busy = false;
  let originalShowView = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function ensureStyles() {
    if (document.getElementById('publicScheduleAdminStyles')) return;
    const style = document.createElement('style');
    style.id = 'publicScheduleAdminStyles';
    style.textContent = `
      .ps-admin-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:20px}
      .ps-admin-intro{max-width:760px;color:var(--muted);font-size:.9rem;line-height:1.55}
      .ps-admin-actions{display:flex;gap:8px;flex-wrap:wrap}
      .ps-status{display:none;margin:0 0 16px;padding:11px 13px;border-radius:10px;font-size:.84rem;font-weight:700}
      .ps-status.info{display:block;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.22);color:#1d4ed8}
      .ps-status.ok{display:block;background:rgba(22,163,74,.08);border:1px solid rgba(22,163,74,.22);color:#15803d}
      .ps-status.err{display:block;background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.22);color:#b91c1c}
      .ps-venue-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}
      .ps-venue{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:18px;box-shadow:0 10px 28px rgba(27,191,176,.05)}
      .ps-venue-head{display:flex;justify-content:space-between;align-items:center;gap:14px;padding-bottom:14px;border-bottom:1px solid var(--border)}
      .ps-venue-title h2{font-family:var(--font-h);font-size:1.55rem;line-height:1.1;margin-bottom:4px}
      .ps-venue-title p{color:var(--muted);font-size:.78rem;line-height:1.4}
      .ps-toggle{display:inline-flex;align-items:center;gap:8px;font-size:.8rem;font-weight:700;cursor:pointer;white-space:nowrap}
      .ps-toggle input{width:18px;height:18px;accent-color:var(--primary)}
      .ps-block{padding-top:16px}
      .ps-block-title{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:10px}
      .ps-services{display:grid;gap:8px}
      .ps-service{display:flex;align-items:flex-start;gap:9px;padding:9px 10px;border-radius:10px;background:var(--s2);font-size:.82rem;line-height:1.35;cursor:pointer}
      .ps-service input{margin-top:2px;width:16px;height:16px;accent-color:var(--primary);flex:0 0 auto}
      .ps-schedule{display:grid;gap:8px}
      .ps-day{display:grid;grid-template-columns:118px minmax(0,1fr);gap:10px;align-items:start;padding:10px;border:1px solid var(--border);border-radius:11px}
      .ps-day-main{display:flex;align-items:center;gap:7px;font-size:.82rem;font-weight:700;min-height:36px}
      .ps-day-main input{width:16px;height:16px;accent-color:var(--primary)}
      .ps-ranges{display:grid;gap:7px}
      .ps-range{display:grid;grid-template-columns:1fr auto 1fr;gap:7px;align-items:center}
      .ps-range span{font-size:.72rem;color:var(--muted)}
      .ps-range input{width:100%;min-width:0;min-height:36px;padding:6px 8px;border-radius:8px;border:1px solid var(--border);background:var(--s1);color:var(--text);font:500 .8rem var(--font-b)}
      .ps-day.closed .ps-ranges{opacity:.42}
      .ps-day.closed .ps-range input{pointer-events:none}
      .ps-note{margin-top:14px;padding:11px 12px;border-radius:10px;background:rgba(217,119,6,.08);border:1px solid rgba(217,119,6,.18);color:var(--muted);font-size:.78rem;line-height:1.45}
      .ps-updated{font-size:.72rem;color:var(--muted);margin-top:8px}
      @media(max-width:1050px){.ps-venue-grid{grid-template-columns:1fr}}
      @media(max-width:680px){.ps-day{grid-template-columns:1fr}.ps-range{grid-template-columns:1fr auto 1fr}.ps-venue{padding:14px}.ps-admin-actions .btn{flex:1 1 auto}}
    `;
    document.head.appendChild(style);
  }

  function ensureSidebarButton() {
    if (document.getElementById('sb-horariospublicos')) return;
    const ref = document.getElementById('sb-bloquear');
    if (!ref || !ref.parentNode) return;
    const button = document.createElement('button');
    button.className = 'sb-link';
    button.id = 'sb-horariospublicos';
    button.dataset.tooltip = 'Horarios públicos';
    button.setAttribute('onclick', "showView('horariospublicos')");
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 15h2M14 15h2"/></svg>
      Horarios públicos`;
    ref.insertAdjacentElement('afterend', button);
  }

  function ensureView() {
    if (document.getElementById('vHorariospublicos')) return;
    const main = document.getElementById('mainContent');
    if (!main) return;
    const section = document.createElement('section');
    section.id = 'vHorariospublicos';
    section.style.display = 'none';
    section.innerHTML = `
      <div class="ps-admin-head">
        <div>
          <h1 class="page-title"><em>Horarios</em> públicos</h1>
          <p class="ps-admin-intro">Controla qué sedes aparecen disponibles para reservar desde la página pública, qué servicios se pueden agendar en cada sede y en qué franjas horarias. Los bloqueos, las citas existentes y Google Calendar siguen teniendo prioridad.</p>
        </div>
        <div class="ps-admin-actions">
          <button type="button" class="btn btn-ghost" id="psReloadBtn">Descartar cambios</button>
          <button type="button" class="btn btn-teal" id="psSaveBtn">Guardar horarios</button>
        </div>
      </div>
      <div id="psStatus" class="ps-status" role="status" aria-live="polite"></div>
      <div id="psScheduleRoot"><div class="loading-wrap"><div class="spinner"></div></div></div>`;
    main.appendChild(section);
    document.getElementById('psReloadBtn').addEventListener('click', () => {
      if (loadedConfig) { config = clone(loadedConfig); render(); setStatus('Cambios descartados. Se recuperó la última configuración guardada.', 'info'); }
      else loadConfig(true);
    });
    document.getElementById('psSaveBtn').addEventListener('click', saveConfig);
  }

  function wrapShowView() {
    if (window.showView && !window.showView.__publicScheduleAdminWrapped) {
      originalShowView = window.showView;
      const wrapped = function(v) {
        const custom = document.getElementById('vHorariospublicos');
        const customSb = document.getElementById('sb-horariospublicos');
        if (v === 'horariospublicos') {
          document.querySelectorAll('#mainContent > section[id^="v"]').forEach(sec => sec.style.display = 'none');
          document.querySelectorAll('#sidebar .sb-link').forEach(btn => btn.classList.remove('active'));
          if (custom) {
            custom.style.display = 'block';
            custom.classList.remove('view-fadein');
            void custom.offsetWidth;
            custom.classList.add('view-fadein');
          }
          if (customSb) customSb.classList.add('active');
          if (!loadedConfig && !busy) loadConfig();
          return true;
        }
        if (custom) custom.style.display = 'none';
        if (customSb) customSb.classList.remove('active');
        return originalShowView.apply(this, arguments);
      };
      wrapped.__publicScheduleAdminWrapped = true;
      window.showView = wrapped;
    }
  }

  function setStatus(message, tone) {
    const el = document.getElementById('psStatus');
    if (!el) return;
    el.className = 'ps-status' + (tone ? ' ' + tone : '');
    el.textContent = message || '';
    if (!message) el.style.display = 'none';
  }

  function endpoint() {
    try { return APPS_SCRIPT_URL; } catch (_) { return ''; }
  }

  function token() {
    try { return TOKEN; } catch (_) { return ''; }
  }

  async function getJson(url, options) {
    if (typeof fetchJsonWithTimeout === 'function') return fetchJsonWithTimeout(url, options || {}, 45000);
    const res = await fetch(url, options || {});
    const raw = await res.text();
    try { return JSON.parse(raw); } catch (_) { throw new Error('El servidor respondió en un formato inesperado.'); }
  }

  async function loadConfig(force) {
    if (busy && !force) return;
    busy = true;
    setStatus('Cargando horarios públicos…', 'info');
    try {
      const url = endpoint();
      if (!url) throw new Error('No se encontró la conexión con el servidor.');
      const data = await getJson(url + '?action=publicScheduleConfig&_ts=' + Date.now(), {cache:'no-store'});
      if (!data || !data.ok || !data.config) throw new Error(data && data.error ? data.error : 'No se pudo leer la configuración.');
      loadedConfig = clone(data.config);
      config = clone(data.config);
      render();
      setStatus(data.source === 'default' ? 'Se muestran los horarios actuales por defecto. Guarda solo cuando quieras cambiarlos.' : 'Horarios públicos cargados correctamente.', 'ok');
    } catch (error) {
      const root = document.getElementById('psScheduleRoot');
      if (root) root.innerHTML = '<div class="team-alert danger"><strong>No se pudieron cargar los horarios.</strong>' + escapeHtml(error.message || 'Error de conexión') + '</div>';
      setStatus(error.message || 'No se pudieron cargar los horarios.', 'err');
    } finally {
      busy = false;
    }
  }

  function venueCard(key) {
    const venue = config.venues[key];
    const isRecovery = key === 'recovery';
    const services = SERVICES[key];
    return `
      <article class="ps-venue" data-venue="${key}">
        <div class="ps-venue-head">
          <div class="ps-venue-title">
            <h2>${escapeHtml(venue.label)}</h2>
            <p>${isRecovery ? 'Solo se permiten aquí los servicios de descarga muscular configurados para esta sede.' : 'Sede principal para fisioterapia, rehabilitación y descargas musculares.'}</p>
          </div>
          <label class="ps-toggle"><input type="checkbox" data-role="venue-enabled" ${venue.enabled !== false ? 'checked' : ''}> Agenda pública</label>
        </div>
        <div class="ps-block">
          <div class="ps-block-title">Servicios disponibles en esta sede</div>
          <div class="ps-services">
            ${services.map(([value,label]) => `<label class="ps-service"><input type="checkbox" data-role="service" value="${escapeHtml(value)}" ${venue.services.includes(value) ? 'checked' : ''}><span>${escapeHtml(label)}</span></label>`).join('')}
          </div>
        </div>
        <div class="ps-block">
          <div class="ps-block-title">Horario semanal mostrado en la página pública</div>
          <div class="ps-schedule">
            ${DAYS.map(([day,label]) => dayRow(day,label,venue.weekly[day] || [])).join('')}
          </div>
        </div>
        ${isRecovery ? '<div class="ps-note"><strong>Protección de sede:</strong> Valoración fisioterapéutica y Rehabilitación/readaptación no pueden habilitarse en Campestre Recovery desde este módulo.</div>' : ''}
      </article>`;
  }

  function dayRow(day, label, ranges) {
    const open = Array.isArray(ranges) && ranges.length > 0;
    const r1 = open && ranges[0] ? ranges[0] : ['', ''];
    const r2 = open && ranges[1] ? ranges[1] : ['', ''];
    return `
      <div class="ps-day ${open ? '' : 'closed'}" data-day="${day}">
        <label class="ps-day-main"><input type="checkbox" data-role="day-open" ${open ? 'checked' : ''}><span>${label}</span></label>
        <div class="ps-ranges">
          <div class="ps-range"><input type="time" data-range="0" data-edge="start" value="${escapeHtml(r1[0])}"><span>a</span><input type="time" data-range="0" data-edge="end" value="${escapeHtml(r1[1])}"></div>
          <div class="ps-range"><input type="time" data-range="1" data-edge="start" value="${escapeHtml(r2[0])}"><span>a</span><input type="time" data-range="1" data-edge="end" value="${escapeHtml(r2[1])}"></div>
        </div>
      </div>`;
  }

  function render() {
    const root = document.getElementById('psScheduleRoot');
    if (!root || !config || !config.venues) return;
    root.innerHTML = `<div class="ps-venue-grid">${venueCard('santa')}${venueCard('recovery')}</div>${config.updatedAt ? `<div class="ps-updated">Última actualización guardada: ${escapeHtml(new Date(config.updatedAt).toLocaleString('es-CO'))}</div>` : ''}`;
    root.querySelectorAll('[data-role="day-open"]').forEach(input => {
      input.addEventListener('change', () => input.closest('.ps-day').classList.toggle('closed', !input.checked));
    });
  }

  function collectVenue(card, key) {
    const current = config.venues[key];
    const services = Array.from(card.querySelectorAll('[data-role="service"]:checked')).map(el => el.value);
    const weekly = {};
    DAYS.forEach(([day]) => {
      const row = card.querySelector(`.ps-day[data-day="${day}"]`);
      const isOpen = row.querySelector('[data-role="day-open"]').checked;
      if (!isOpen) { weekly[day] = []; return; }
      const ranges = [];
      [0,1].forEach(idx => {
        const start = row.querySelector(`[data-range="${idx}"][data-edge="start"]`).value;
        const end = row.querySelector(`[data-range="${idx}"][data-edge="end"]`).value;
        if (!start && !end) return;
        if (!start || !end) throw new Error(`${current.label}: completa inicio y fin de cada franja usada.`);
        if (start >= end) throw new Error(`${current.label}: la hora de inicio debe ser anterior a la hora final.`);
        ranges.push([start,end]);
      });
      ranges.sort((a,b) => a[0].localeCompare(b[0]));
      if (ranges.length > 1 && ranges[1][0] < ranges[0][1]) throw new Error(`${current.label}: las dos franjas del mismo día no pueden cruzarse.`);
      weekly[day] = ranges;
    });
    return {
      label: current.label,
      enabled: card.querySelector('[data-role="venue-enabled"]').checked,
      services,
      weekly
    };
  }

  function collectConfig() {
    const cards = document.querySelectorAll('#psScheduleRoot .ps-venue');
    const next = {version:1, venues:{}};
    cards.forEach(card => {
      const key = card.dataset.venue;
      next.venues[key] = collectVenue(card,key);
    });
    return next;
  }

  async function saveConfig() {
    if (busy) return;
    let next;
    try { next = collectConfig(); }
    catch (error) { setStatus(error.message, 'err'); return; }

    if (next.venues.santa.enabled && next.venues.santa.services.length === 0) {
      setStatus('Santa Mónica está habilitada pero no tiene ningún servicio seleccionado.', 'err'); return;
    }
    if (next.venues.recovery.enabled && next.venues.recovery.services.length === 0) {
      setStatus('Campestre Recovery está habilitada pero no tiene ningún servicio seleccionado.', 'err'); return;
    }

    const btn = document.getElementById('psSaveBtn');
    const original = btn ? btn.textContent : 'Guardar horarios';
    busy = true;
    if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }
    setStatus('Guardando horarios públicos…', 'info');
    try {
      const url = endpoint();
      const sessionToken = token();
      if (!url || !sessionToken) throw new Error('Tu sesión administrativa no está disponible. Vuelve a iniciar sesión.');
      const data = await getJson(url, {
        method:'POST',
        body:JSON.stringify({action:'savePublicScheduleConfig', token:sessionToken, data:next})
      });
      if (!data || !data.ok || !data.config) throw new Error(data && data.error ? data.error : 'El servidor no confirmó el guardado.');
      loadedConfig = clone(data.config);
      config = clone(data.config);
      render();
      setStatus('Horarios guardados. La página pública utilizará esta configuración desde ahora.', 'ok');
      if (typeof toast === 'function') toast('Horarios públicos guardados', 'ok');
    } catch (error) {
      setStatus(error.message || 'No se pudieron guardar los horarios.', 'err');
      if (typeof toast === 'function') toast(error.message || 'No se pudieron guardar los horarios', 'err');
    } finally {
      busy = false;
      if (btn) { btn.disabled = false; btn.textContent = original; }
    }
  }

  function init() {
    ensureStyles();
    ensureSidebarButton();
    ensureView();
    wrapShowView();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
