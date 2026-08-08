(function (global) {
'use strict';

let _observer = null;
let _refreshTimer = null;

function _safeArray(value) { return Array.isArray(value) ? value : []; }
function _realAppointments() {
  try {
    if (typeof citasReales === 'function') return _safeArray(citasReales());
  } catch (_) {}
  try { return _safeArray(allData && allData.citas); } catch (_) { return []; }
}
function _allAppointments() {
  try { return _safeArray(allData && allData.citas); } catch (_) { return []; }
}
function _payments() {
  try { return _safeArray(operationsData && operationsData.pagos); } catch (_) { return []; }
}
function _codes() {
  try { return _safeArray(allData && allData.codigos); } catch (_) { return []; }
}
function _isRegister(c) {
  try { return typeof esRegistroServ === 'function' ? esRegistroServ(c && c.servicio) : false; } catch (_) { return false; }
}
function _daysSince(dateStr) {
  const f = normDate(dateStr);
  if (!f) return null;
  const now = new Date(today() + 'T12:00:00');
  const past = new Date(f + 'T12:00:00');
  const diff = Math.round((now - past) / 86400000);
  return Number.isFinite(diff) ? diff : null;
}
function _tomorrow() {
  const d = new Date(today() + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  return toDateStr(d);
}
function _phone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length < 7) return '';
  return digits.length <= 10 ? '57' + digits : digits;
}
function _attr(value) { return encodeURIComponent(String(value == null ? '' : value)); }
function _decode(value) {
  try { return decodeURIComponent(String(value || '')); } catch (_) { return String(value || ''); }
}

function _followUpTasks() {
  try {
    const mod = global.PanelOperationsAutomation;
    return mod && typeof mod.generarTareas === 'function'
      ? mod.generarTareas().filter(t => t && (t.estado === 'pendiente' || t.estado === 'vencida'))
      : [];
  } catch (_) { return []; }
}

function _completedFollowUpsToday() {
  try {
    const mod = global.PanelOperationsAutomation;
    if (!mod || typeof mod.generarTareas !== 'function' || typeof mod._tareaKey !== 'function') return 0;
    return mod.generarTareas().filter(t => {
      if (!t || t.estado !== 'completada') return false;
      const ts = kvGet(mod._tareaKey(t.c) + '_ts');
      return ts && normDate(ts) === today();
    }).length;
  } catch (_) { return 0; }
}

function _pastAppointmentsToClose() {
  const nowMs = Date.now();
  return _allAppointments().filter(c => {
    if (!c || !['Confirmada','Pendiente'].includes(c.estado)) return false;
    if (_isRegister(c)) return false;
    const f = normDate(c.fecha);
    if (!f || !c.hora) return false;
    const end = new Date(f + 'T' + c.hora);
    if (Number.isNaN(end.getTime())) return false;
    end.setMinutes(end.getMinutes() + 60);
    return end.getTime() < nowMs;
  });
}

function _overdueCollections() {
  return _realAppointments().filter(c => {
    if (!c || c.estado !== 'Atendida' || c.pago) return false;
    if (kvGet('pago_' + c.id) === '1') return false;
    if (parsePrecio(c.precio) === 0) return false;
    const days = _daysSince(c.fecha);
    return days !== null && days >= 3;
  });
}

function _paymentsToReview() {
  const seen = new Set();
  return _payments().filter(p => {
    const status = p && (p.EstadoPago || '');
    if (!['Por verificar','COMPROBANTE_RECIBIDO'].includes(status)) return false;
    const key = p.CitaID ? 'c:' + p.CitaID : 'p:' + p.ID;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function _todayPaymentIssues() {
  const f = today();
  const reviewCitas = new Set(_paymentsToReview().map(p => String(p.CitaID || '')).filter(Boolean));
  return _realAppointments().filter(c => {
    if (!c || normDate(c.fecha) !== f) return false;
    if (reviewCitas.has(String(c.id || ''))) return false;
    return ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
  });
}

function _rebookingTasks() {
  const follow = global.PanelPatientFollowUp;
  const followNames = new Set(_followUpTasks().map(t => String(t?.c?.nombre || '').trim().toLowerCase()).filter(Boolean));
  const latest = new Map();
  _allAppointments().forEach(c => {
    if (!c || c.estado === 'Cancelada' || _isRegister(c)) return;
    const isDischarge = follow && typeof follow.esDescargaMusc === 'function'
      ? follow.esDescargaMusc(c.servicio)
      : String(c.servicio || '').toLowerCase().includes('descarga');
    if (!isDischarge) return;
    const name = String(c.nombre || '').trim();
    const date = normDate(c.fecha);
    if (!name || !date) return;
    const prev = latest.get(name.toLowerCase());
    if (!prev || date > prev.fecha) latest.set(name.toLowerCase(), {
      nombre: name, telefono: c.telefono || '', fecha: date, servicio: c.servicio || ''
    });
  });
  return Array.from(latest.values()).map(p => ({ ...p, dias: _daysSince(p.fecha) }))
    .filter(p => p.dias !== null && p.dias >= 35 && !followNames.has(p.nombre.toLowerCase()))
    .filter(p => {
      try { return !(follow && typeof follow.segReagendo === 'function' && follow.segReagendo(p.nombre)); }
      catch (_) { return true; }
    })
    .sort((a,b) => b.dias - a.dias);
}

function _pendingBonuses() {
  const codes = _codes();
  const withBonus = new Set(codes.filter(c => c && c.tipo === 'BONO').map(c => c.codigoRef));
  return codes.filter(c => c && c.tipo === 'REF' && !withBonus.has(c.codigo) && c.estado !== 'Usado');
}

function _companyActions() {
  try {
    if (typeof global._getEmpresas !== 'function') return [];
    return _safeArray(global._getEmpresas()).filter(e => e && e.fechaAccion && e.fechaAccion <= today() && !['Cerrada-ganada','Cerrada-perdida'].includes(e.estado));
  } catch (_) { return []; }
}

function _tomorrowAppointments() {
  const f = _tomorrow();
  const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reserva vencida'];
  return _realAppointments().filter(c => c && normDate(c.fecha) === f && !blocked.includes(c.estado || ''))
    .sort((a,b) => String(a.hora || '').localeCompare(String(b.hora || '')));
}

function collectDailyControl() {
  return {
    followUps: _followUpTasks(),
    completedToday: _completedFollowUpsToday(),
    pastToClose: _pastAppointmentsToClose(),
    overdueCollections: _overdueCollections(),
    paymentsToReview: _paymentsToReview(),
    todayPaymentIssues: _todayPaymentIssues(),
    rebookings: _rebookingTasks(),
    bonuses: _pendingBonuses(),
    companyActions: _companyActions(),
    tomorrow: _tomorrowAppointments()
  };
}

function _levelForFollowUp(t) { return t.estado === 'vencida' ? 'high' : 'normal'; }
function _levelForRebooking(p) { return p.dias >= 49 ? 'high' : p.dias >= 42 ? 'medium' : 'normal'; }

function _taskCard({ level='normal', icon='•', title='', meta='', action='', secondary='' }) {
  return `<div class="daily-task" data-level="${level}">
    <div class="daily-task-icon">${icon}</div>
    <div class="daily-task-copy"><div class="daily-task-title">${title}</div><div class="daily-task-meta">${meta}</div></div>
    <div class="daily-task-actions">${action}${secondary}</div>
  </div>`;
}

function _followUpCard(t) {
  const mod = global.PanelOperationsAutomation;
  const c = t.c || {};
  const ft = t.ft || {};
  const key = mod && typeof mod._tareaKey === 'function' ? mod._tareaKey(c) : '';
  const tpl = mod && typeof mod.getTplTarea === 'function'
    ? mod.getTplTarea(ft.tipo)
      .replace(/\{nombre\}/g, c.nombre || '')
      .replace(/\{fecha_sesion\}/g, fmtDate(t.fSesion))
      .replace(/\{tipo_servicio\}/g, ft.label || c.servicio || '')
      .replace(/\{dias_desde_sesion\}/g, t.diasDesde)
    : '';
  const phone = _phone(c.telefono);
  const wa = phone && tpl ? `https://wa.me/${phone}?text=${encodeURIComponent(tpl)}` : '';
  const waAction = wa
    ? `<a class="daily-btn primary" href="${esc(wa)}" target="_blank" rel="noopener" onclick="PanelDailyControl.taskAction('wa','${_attr(key)}')">WhatsApp</a>`
    : '';
  const complete = `<button class="daily-btn" type="button" onclick="PanelDailyControl.taskAction('complete','${_attr(key)}')">Completar</button>`;
  const postpone = `<button class="daily-btn ghost" type="button" onclick="PanelDailyControl.taskAction('postpone','${_attr(key)}')">Mañana</button>`;
  return _taskCard({
    level: _levelForFollowUp(t), icon: t.estado === 'vencida' ? '⚠️' : '💬',
    title: `${esc(c.nombre || 'Paciente')} · ${esc(ft.label || c.servicio || 'Seguimiento')}`,
    meta: `Sesión ${esc(fmtDate(t.fSesion))} · ${esc(t.diasDesde)} días · ${t.estado === 'vencida' ? 'vencida' : 'pendiente'}`,
    action: waAction + complete,
    secondary: postpone
  });
}

function _renderUrgent(data) {
  const cards = [];
  data.pastToClose.forEach(c => cards.push(_taskCard({
    level:'high', icon:'📋', title:`Cerrar cita · ${esc(c.nombre || 'Paciente')}`,
    meta:`${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}`,
    action:'<button class="daily-btn primary" type="button" onclick="PanelDailyControl.openAgendaClose()">Revisar agenda</button>'
  })));
  data.paymentsToReview.forEach(p => cards.push(_taskCard({
    level:'high', icon:'💳', title:`Verificar pago · ${esc(p.Cliente || 'Cliente')}`,
    meta:`${esc(p.ServicioPlan || '')} · ${esc(p.ValorRecibido || '')} · comprobante recibido`,
    action:'<button class="daily-btn primary" type="button" onclick="showView(\'pagos\')">Revisar pago</button>'
  })));
  data.todayPaymentIssues.forEach(c => cards.push(_taskCard({
    level: c.estado === 'Pago rechazado' ? 'high' : 'medium', icon:'💰', title:`Pago de hoy · ${esc(c.nombre || 'Paciente')}`,
    meta:`${esc(c.hora || '')} · ${esc(c.servicio || '')} · ${esc(c.estado || 'Pendiente')}`,
    action:`<button class="daily-btn primary" type="button" onclick="PanelDailyControl.openPayment('${_attr(c.id)}')">Gestionar</button>`
  })));
  data.overdueCollections.forEach(c => cards.push(_taskCard({
    level:'medium', icon:'🧾', title:`Cobro atrasado · ${esc(c.nombre || 'Paciente')}`,
    meta:`${esc(fmtDate(c.fecha))} · ${esc(c.precio || '')} · ${esc(_daysSince(c.fecha))} días`,
    action:`<button class="daily-btn primary" type="button" onclick="PanelDailyControl.openPayment('${_attr(c.id)}')">Registrar pago</button>`
  })));
  return cards.join('');
}

function _renderFollowUps(data) {
  const cards = data.followUps.map(_followUpCard);
  data.rebookings.forEach(p => cards.push(_taskCard({
    level:_levelForRebooking(p), icon:'🔁', title:`Reagendar · ${esc(p.nombre)}`,
    meta:`${esc(p.servicio || 'Descarga muscular')} · ${esc(p.dias)} días desde la última sesión`,
    action:'<button class="daily-btn primary" type="button" onclick="showView(\'seguimiento\')">Gestionar seguimiento</button>'
  })));
  return cards.join('');
}

function _renderManagement(data) {
  const cards = [];
  data.bonuses.forEach(c => cards.push(_taskCard({
    level:'normal', icon:'🎁', title:`Bono pendiente · ${esc(c.referidoPor || 'Referidor')}`,
    meta:`Refirió a ${esc(c.paciente || 'paciente')} · ${esc(c.codigo || '')}`,
    action:'<button class="daily-btn" type="button" onclick="showView(\'codigos\')">Gestionar bono</button>'
  })));
  data.companyActions.forEach(e => cards.push(_taskCard({
    level:e.fechaAccion < today() ? 'medium' : 'normal', icon:'🏢', title:`Empresa · ${esc(e.nombre || 'Contacto')}`,
    meta:`${esc(e.proxAccion || 'Acción pendiente')} · ${esc(e.fechaAccion || '')}`,
    action:'<button class="daily-btn" type="button" onclick="showView(\'empresas\')">Abrir empresas</button>'
  })));
  return cards.join('');
}

function _section(title, count, content, emptyText, open=true) {
  return `<details class="daily-group" ${open ? 'open' : ''}>
    <summary><span>${title}</span><strong>${count}</strong></summary>
    <div class="daily-group-body">${content || `<div class="daily-empty">${emptyText}</div>`}</div>
  </details>`;
}

function _renderTomorrow(data) {
  if (!data.tomorrow.length) return '<div class="daily-empty">No hay citas programadas para mañana.</div>';
  return data.tomorrow.map(c => {
    const paymentFlag = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '')
      ? `<span class="daily-flag warn">${esc(c.estado)}</span>` : '';
    return `<div class="daily-tomorrow-row">
      <strong>${esc(c.hora || '—')}</strong>
      <div><b>${esc(c.nombre || 'Paciente')}</b><span>${esc(c.servicio || '')}</span></div>
      ${paymentFlag}
      <button class="daily-btn ghost" type="button" onclick="showView('agenda')">Ver</button>
    </div>`;
  }).join('');
}

function renderDailyControl() {
  const root = document.getElementById('dailyControl');
  if (!root) return;
  const data = collectDailyControl();
  const urgentCount = data.pastToClose.length + data.paymentsToReview.length + data.todayPaymentIssues.length + data.overdueCollections.length;
  const followCount = data.followUps.length + data.rebookings.length;
  const managementCount = data.bonuses.length + data.companyActions.length;
  const pendingTotal = urgentCount + followCount + managementCount;
  const overdueFollow = data.followUps.filter(t => t.estado === 'vencida').length;

  root.innerHTML = `
    <div class="daily-head">
      <div><div class="daily-eyebrow">CONTROL DIARIO</div><h2>${pendingTotal ? `Tienes ${pendingTotal} pendiente${pendingTotal === 1 ? '' : 's'}` : 'Todo al día'}</h2><p>Una sola bandeja para revisar lo que necesita acción.</p></div>
      <button class="daily-refresh" type="button" onclick="PanelDailyControl.refresh(true)">↻ Actualizar</button>
    </div>
    <div class="daily-summary">
      <div><strong>${urgentCount}</strong><span>Operativos / pagos</span></div>
      <div><strong>${followCount}</strong><span>Seguimientos</span></div>
      <div><strong>${overdueFollow}</strong><span>Vencidas</span></div>
      <div><strong>${data.completedToday}</strong><span>Completadas hoy</span></div>
    </div>
    ${_section('Prioridad operativa', urgentCount, _renderUrgent(data), 'No hay cierres ni pagos urgentes pendientes.', true)}
    ${_section('Seguimientos y reagendamientos', followCount, _renderFollowUps(data), 'No hay seguimientos pendientes.', true)}
    ${_section('Gestión pendiente', managementCount, _renderManagement(data), 'No hay bonos ni acciones comerciales pendientes.', managementCount > 0)}
    <details class="daily-group daily-tomorrow" open>
      <summary><span>Preparar mañana</span><strong>${data.tomorrow.length} cita${data.tomorrow.length === 1 ? '' : 's'}</strong></summary>
      <div class="daily-group-body">${_renderTomorrow(data)}</div>
    </details>`;
}

function taskAction(action, encodedKey) {
  const key = _decode(encodedKey);
  const mod = global.PanelOperationsAutomation;
  if (!mod || !key) return;
  if (action === 'wa' && typeof mod.marcarTareaWA === 'function') mod.marcarTareaWA(key);
  if (action === 'complete' && typeof mod.marcarTareaCompletada === 'function') mod.marcarTareaCompletada(key);
  if (action === 'postpone' && typeof mod.posponerTarea === 'function') mod.posponerTarea(key);
  scheduleRefresh(350);
}

function openPayment(encodedId) {
  const id = _decode(encodedId);
  if (typeof global.openPago === 'function') global.openPago(id);
  else if (typeof global.showView === 'function') global.showView('pagos');
}

function openAgendaClose() {
  if (typeof global.marcarTodasAtendidas === 'function') return global.marcarTodasAtendidas();
  if (typeof global.showView === 'function') global.showView('agenda');
}

function _injectStyles() {
  if (document.getElementById('dailyControlStyles')) return;
  const style = document.createElement('style');
  style.id = 'dailyControlStyles';
  style.textContent = `
    #dailyControl{margin-bottom:22px}.daily-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:20px 22px;background:linear-gradient(135deg,rgba(27,191,176,.12),var(--s1));border:1px solid var(--border);border-radius:16px 16px 0 0}.daily-eyebrow{font:700 .68rem var(--font-m);letter-spacing:.11em;color:var(--primary);margin-bottom:4px}.daily-head h2{font:700 1.55rem var(--font-h);margin:0}.daily-head p{color:var(--muted);font-size:.82rem;margin-top:3px}.daily-refresh{border:1px solid var(--border);background:var(--s1);color:var(--text);border-radius:10px;padding:9px 12px;cursor:pointer;font-weight:700}.daily-summary{display:grid;grid-template-columns:repeat(4,1fr);background:var(--s1);border-left:1px solid var(--border);border-right:1px solid var(--border);border-bottom:1px solid var(--border)}.daily-summary>div{padding:14px 18px;border-right:1px solid var(--border)}.daily-summary>div:last-child{border-right:0}.daily-summary strong{display:block;font:700 1.45rem var(--font-h);color:var(--primary)}.daily-summary span{display:block;font-size:.7rem;color:var(--muted);margin-top:2px}.daily-group{background:var(--s1);border:1px solid var(--border);border-top:0}.daily-group:last-child{border-radius:0 0 16px 16px}.daily-group summary{list-style:none;display:flex;align-items:center;justify-content:space-between;padding:13px 18px;cursor:pointer;font-size:.86rem;font-weight:750}.daily-group summary::-webkit-details-marker{display:none}.daily-group summary strong{font:700 .75rem var(--font-m);color:var(--primary);background:rgba(27,191,176,.10);border-radius:99px;padding:3px 8px}.daily-group-body{padding:0 14px 14px;display:grid;gap:8px}.daily-task{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:11px;background:var(--bg)}.daily-task[data-level="high"]{border-left:4px solid var(--err)}.daily-task[data-level="medium"]{border-left:4px solid var(--warn)}.daily-task[data-level="normal"]{border-left:4px solid var(--primary)}.daily-task-icon{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:9px;background:var(--s1);flex-shrink:0}.daily-task-copy{flex:1;min-width:0}.daily-task-title{font-weight:700;font-size:.84rem}.daily-task-meta{color:var(--muted);font-size:.72rem;margin-top:3px;line-height:1.35}.daily-task-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.daily-btn{border:1px solid var(--border);background:var(--s1);color:var(--text);border-radius:8px;padding:7px 9px;font:700 .7rem var(--font-b);cursor:pointer;text-decoration:none;white-space:nowrap}.daily-btn.primary{background:var(--primary);border-color:var(--primary);color:#0d0d0d}.daily-btn.ghost{color:var(--muted)}.daily-empty{text-align:center;color:var(--muted);padding:18px;border:1px dashed var(--border);border-radius:10px;font-size:.8rem}.daily-tomorrow-row{display:grid;grid-template-columns:54px minmax(0,1fr) auto auto;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--bg);font-size:.8rem}.daily-tomorrow-row>div{display:grid;gap:2px}.daily-tomorrow-row span{color:var(--muted);font-size:.72rem}.daily-flag{padding:3px 7px;border-radius:99px;font-size:.65rem!important;font-weight:700}.daily-flag.warn{background:rgba(217,119,6,.1);color:var(--warn)}#bannerAutoAtendida,#bannerCobros,#bannerTareas,#bannerBonos{display:none!important}@media(max-width:760px){.daily-summary{grid-template-columns:1fr 1fr}.daily-summary>div:nth-child(2){border-right:0}.daily-summary>div{border-bottom:1px solid var(--border)}.daily-task{align-items:flex-start;flex-wrap:wrap}.daily-task-actions{width:100%;justify-content:flex-start;padding-left:46px}.daily-tomorrow-row{grid-template-columns:46px minmax(0,1fr)}.daily-tomorrow-row .daily-flag,.daily-tomorrow-row .daily-btn{grid-column:2}.daily-head{padding:17px}.daily-head h2{font-size:1.35rem}}
  `;
  document.head.appendChild(style);
}

function scheduleRefresh(delay=100) {
  clearTimeout(_refreshTimer);
  _refreshTimer = setTimeout(renderDailyControl, delay);
}

async function refresh(loadPayments=false) {
  if (loadPayments) {
    try {
      const mod = global.PanelPayments;
      if (mod && typeof mod.loadOperationsData === 'function') await mod.loadOperationsData();
    } catch (_) {}
  }
  renderDailyControl();
}

function _observeSources() {
  if (_observer) return;
  const ids = ['badgeTareas','badgeSeguimiento','badgeBonos','pagosStats','bannerAutoAtendidaTxt','bannerCobrosTxt'];
  const nodes = ids.map(id => document.getElementById(id)).filter(Boolean);
  if (!nodes.length) return;
  _observer = new MutationObserver(() => scheduleRefresh(120));
  nodes.forEach(node => _observer.observe(node, { childList:true, subtree:true, characterData:true, attributes:true }));
}

function initDailyControl() {
  const dashboard = document.getElementById('vDashboard');
  if (!dashboard || document.getElementById('dailyControl')) return;
  _injectStyles();
  const root = document.createElement('section');
  root.id = 'dailyControl';
  root.setAttribute('aria-label','Control diario');
  const header = dashboard.querySelector('.page-header');
  if (header) header.insertAdjacentElement('afterend', root); else dashboard.prepend(root);
  renderDailyControl();
  _observeSources();
  setTimeout(() => refresh(true), 250);
  setTimeout(renderDailyControl, 1200);
  setTimeout(renderDailyControl, 3000);
}

global.PanelDailyControl = Object.freeze({
  collectDailyControl,
  renderDailyControl,
  initDailyControl,
  refresh,
  scheduleRefresh,
  taskAction,
  openPayment,
  openAgendaClose
});
})(typeof window !== 'undefined' ? window : globalThis);
