/* Cuidándote Fisioterapia — captación y gestión comercial.
 * Conserva Citas, Pacientes, Pagos, Referidos y Empresas como fuentes existentes.
 * Las oportunidades y su bitácora viven por separado en AdminKV para no reescribir historia.
 */
(function (global) {
  'use strict';

  const STORE_KEY = 'commercial_opportunities_v1';
  const AUDIT_KEY = 'commercial_opportunity_audit_v1';
  const MAX_AUDIT = 1500;
  const STATUSES = ['Nuevo', 'Contactado', 'Interesado', 'Pendiente de pago', 'Venta cerrada', 'Perdido'];
  const ORIGINS = ['WhatsApp', 'Instagram', 'Google', 'Página web', 'Referido', 'Alianza', 'Llamada', 'Otro'];
  let opportunities = [];
  let auditRows = [];

  const $ = (id) => document.getElementById(id);
  const e = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
  const clean = (value) => String(value || '').trim();
  const money = (value) => '$' + Math.round(Number(value) || 0).toLocaleString('es-CO');
  const today = () => new Date().toISOString().slice(0, 10);
  const dateText = (value) => value ? new Date(value + 'T12:00:00').toLocaleDateString('es-CO', { day:'numeric', month:'short', year:'numeric' }) : '—';
  const currentUser = () => {
    try { return typeof currentAdminUser !== 'undefined' ? (currentAdminUser || {}) : (global.currentAdminUser || {}); } catch (_) { return global.currentAdminUser || {}; }
  };
  const role = () => String(currentUser().rol || 'Superadministradora').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const actor = () => clean(currentUser().nombre || currentUser().name || 'Usuario administrador');
  const canOpen = () => !/(fisioterapeuta|profesional)/.test(role());
  const canEdit = () => canOpen();
  const canChangeMoney = () => !/(auxiliar)/.test(role());
  const canAudit = () => !/(auxiliar|fisioterapeuta|profesional)/.test(role());

  function readJson(key, fallback) {
    try { const raw = global.kvGet?.(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
  }
  function persist() {
    global.kvSet?.(STORE_KEY, JSON.stringify(opportunities));
    global.kvSet?.(AUDIT_KEY, JSON.stringify(auditRows.slice(-MAX_AUDIT)));
    global.PanelStorage?._flushKV?.();
  }
  function hydrate() {
    opportunities = readJson(STORE_KEY, []);
    auditRows = readJson(AUDIT_KEY, []);
    if (!Array.isArray(opportunities)) opportunities = [];
    if (!Array.isArray(auditRows)) auditRows = [];
  }
  function normPhone(value) { return clean(value).replace(/\D/g, '').slice(-10); }
  function identity(data) {
    const phone = normPhone(data.phone);
    const email = clean(data.email).toLowerCase();
    const name = clean(data.patientName).toLowerCase().replace(/\s+/g, ' ');
    return phone ? `p:${phone}` : email ? `e:${email}` : name ? `n:${name}` : '';
  }
  function logChange(id, action, detail) {
    auditRows.push({ id: 'AUD-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6), opportunityId: id, at: new Date().toISOString(), actor: actor(), role: clean(currentUser().rol || 'Superadministradora'), action, detail });
  }
  function approvedPayments(citaId) {
    if (!citaId) return [];
    let payments = global.operationsData?.pagos || [];
    try { if (typeof operationsData !== 'undefined') payments = operationsData?.pagos || payments; } catch (_) {}
    return payments.filter(p => String(p.CitaID || p.CitaId || p.citaId || '') === String(citaId) && ['Aprobado', 'PAGO_APROBADO'].includes(clean(p.EstadoPago)));
  }
  function verifiedTotal(item) {
    return approvedPayments(item.appointmentId).reduce((sum, p) => sum + Number(p.ValorRecibido ?? p.Valor ?? p.Monto ?? 0), 0);
  }
  function appointmentOptions(selected) {
    let citas = global.allData?.citas || [];
    try { if (typeof allData !== 'undefined') citas = allData?.citas || citas; } catch (_) {}
    const current = citas.filter(c => !['Cancelada', 'No asistió'].includes(clean(c.estado || c.Estado))).slice(-400).reverse();
    return `<option value="">Sin cita vinculada aún</option>` + current.map(c => {
      const id = c.id || c.ID || '';
      const label = `${c.nombre || c.Nombre || 'Sin nombre'} · ${c.fecha || c.FechaCita || ''} ${c.hora || c.Hora || ''} · ${c.servicio || c.Servicio || ''}`;
      return `<option value="${e(id)}" ${String(id) === String(selected || '') ? 'selected' : ''}>${e(label)}</option>`;
    }).join('');
  }
  function optionList(values, selected, blank) {
    return (blank ? `<option value="">${e(blank)}</option>` : '') + values.map(v => `<option ${v === selected ? 'selected' : ''}>${e(v)}</option>`).join('');
  }
  function peopleOptions(selected) {
    const current = currentUser().nombre || currentUser().name || '';
    let team = global.teamData || {};
    try { if (typeof teamData !== 'undefined') team = teamData || team; } catch (_) {}
    const professionals = (team.professionals || team.profesionales || []).map(x => x.Nombre || x.nombre || x.name).filter(Boolean);
    const entries = [...new Set([current, ...professionals].filter(Boolean))];
    return optionList(entries, selected, 'Sin asignar');
  }
  function field(label, control, span) {
    return `<label style="display:block;grid-column:${span || 'auto'};font-size:.78rem;font-weight:700;color:var(--muted)">${e(label)}${control}</label>`;
  }
  function input(id, value, type, extra) { return `<input id="${id}" type="${type || 'text'}" value="${e(value)}" ${extra || ''} style="display:block;box-sizing:border-box;width:100%;margin-top:5px;padding:9px 10px;border:1px solid var(--border);border-radius:8px;background:var(--s2);color:var(--text)">`; }
  function select(id, inner, extra) { return `<select id="${id}" ${extra || ''} style="display:block;box-sizing:border-box;width:100%;margin-top:5px;padding:9px 10px;border:1px solid var(--border);border-radius:8px;background:var(--s2);color:var(--text)">${inner}</select>`; }

  async function refreshPayments() {
    try { await global.loadOperationsData?.(); } catch (_) {}
  }
  function render() {
    hydrate();
    if (!canOpen()) {
      $('commercialPermissionNotice').style.display = 'block';
      $('commercialPermissionNotice').innerHTML = '<div class="notice notice-warn">Este módulo contiene información comercial restringida. Tu cargo no tiene acceso.</div>';
      $('commercialStats').innerHTML = '';
      $('commercialList').innerHTML = '';
      return;
    }
    $('commercialPermissionNotice').style.display = 'block';
    $('commercialPermissionNotice').innerHTML = `<div style="font-size:.78rem;color:var(--muted);background:var(--s2);border:1px solid var(--border);padding:10px 12px;border-radius:9px">Datos comerciales separados de notas clínicas. ${canAudit() ? 'La dirección puede consultar la bitácora completa.' : 'Tu cargo registra y actualiza oportunidades dentro de sus permisos.'}</div>`;
    refreshPayments().finally(() => { renderStats(); renderList(); });
    renderStats(); renderList();
  }
  function renderStats() {
    const active = opportunities.filter(x => !['Venta cerrada', 'Perdido'].includes(x.status));
    const closed = opportunities.filter(x => x.status === 'Venta cerrada');
    const verified = opportunities.reduce((sum, x) => sum + verifiedTotal(x), 0);
    $('commercialStats').innerHTML = [
      ['Oportunidades activas', active.length, '#0f766e'],
      ['Ventas cerradas', closed.length, '#16a34a'],
      ['Valor en venta', money(opportunities.reduce((s,x) => s + Number(x.saleValue || 0), 0)), '#2563eb'],
      ['Pagado y verificado', money(verified), '#059669']
    ].map(([label, value, color]) => `<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};border-radius:10px;padding:12px"><div style="font-size:.72rem;color:var(--muted)">${label}</div><div style="font-size:1.15rem;font-weight:800;color:${color};margin-top:4px">${value}</div></div>`).join('');
  }
  function renderList() {
    const target = $('commercialList'); if (!target) return;
    const q = clean($('commercialSearch')?.value).toLowerCase();
    const state = clean($('commercialStatusFilter')?.value);
    const list = opportunities.filter(x => !state || x.status === state).filter(x => !q || [x.patientName,x.phone,x.service,x.origin,x.allianceCampaign].join(' ').toLowerCase().includes(q)).sort((a,b) => String(a.nextFollowUp || '9999').localeCompare(String(b.nextFollowUp || '9999')) || String(b.updatedAt).localeCompare(String(a.updatedAt)));
    if (!list.length) { target.innerHTML = '<div style="padding:28px;text-align:center;border:1px dashed var(--border);border-radius:12px;color:var(--muted)">Aún no hay oportunidades que mostrar.</div>'; return; }
    target.innerHTML = list.map(x => {
      const paid = verifiedTotal(x);
      const due = x.nextFollowUp ? (x.nextFollowUp < today() ? 'color:#dc2626' : 'color:#b45309') : 'color:var(--muted)';
      return `<article style="background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px;display:flex;gap:14px;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <div style="min-width:220px;flex:1"><div style="font-weight:800">${e(x.patientName || 'Interesado sin nombre')} <span style="font-size:.72rem;padding:3px 7px;border-radius:99px;background:rgba(20,184,166,.12);color:#0f766e">${e(x.status || 'Nuevo')}</span></div><div style="font-size:.78rem;color:var(--muted);margin-top:4px">${e(x.service || 'Servicio por definir')} · ${e(x.origin || 'Origen por definir')} · primer contacto: ${dateText(x.firstContact)}</div><div style="font-size:.75rem;margin-top:5px;${due}">Próximo seguimiento: ${dateText(x.nextFollowUp)} · Captó: ${e(x.capturedBy || 'No atribuido')}</div></div>
        <div style="font-size:.8rem;min-width:160px"><div>Venta: <b>${money(x.saleValue)}</b></div><div style="color:#059669">Verificado: <b>${money(paid)}</b></div></div>
        <button class="btn btn-ghost btn-sm" onclick="PanelCommercialSales.edit('${e(x.id)}')">Ver / editar</button>
      </article>`;
    }).join('');
  }
  function formHtml(item) {
    return [
      field('Paciente o interesado *', input('comPatientName', item.patientName, 'text', 'required')),
      field('Teléfono', input('comPhone', item.phone, 'tel')),
      field('Correo', input('comEmail', item.email, 'email')),
      field('Fecha primer contacto *', input('comFirstContact', item.firstContact || today(), 'date')),
      field('Canal de origen *', select('comOrigin', optionList(ORIGINS, item.origin, 'Seleccionar canal'))),
      field('Servicio de interés', input('comService', item.service)),
      field('Captó al paciente', select('comCapturedBy', peopleOptions(item.capturedBy)), 'span 1'),
      field('Atendió la conversación', select('comAttendedBy', peopleOptions(item.attendedBy))),
      field('Cerró la venta', select('comClosedBy', peopleOptions(item.closedBy))),
      field('Estado comercial *', select('comStatus', optionList(STATUSES, item.status || 'Nuevo'))),
      field('Valor de la venta', input('comSaleValue', item.saleValue, 'number', `min="0" ${canChangeMoney() ? '' : 'readonly'} step="1000"`)),
      field('Próximo seguimiento', input('comNextFollowUp', item.nextFollowUp, 'date')),
      field('Alianza o campaña de origen', input('comAllianceCampaign', item.allianceCampaign), 'span 2'),
      field('Cita vinculada (para validar pago)', select('comAppointmentId', appointmentOptions(item.appointmentId), 'onchange="PanelCommercialSales.refreshPaymentInfo()"'), 'span 2')
    ].join('');
  }
  function paymentInfo(item) {
    const paid = verifiedTotal(item);
    const linked = item.appointmentId;
    return `<div style="background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.28);border-radius:9px;padding:11px;font-size:.8rem"><b>Pago efectivamente verificado: ${money(paid)}</b><br><span style="color:var(--muted)">${linked ? 'Se calcula únicamente con pagos aprobados de la cita vinculada. No puede editarse manualmente.' : 'Vincula una cita para relacionar automáticamente los pagos aprobados.'}</span></div>`;
  }
  function open(item) {
    if (!canEdit()) return;
    const data = item || { status:'Nuevo', firstContact:today() };
    $('comId').value = data.id || '';
    $('commercialModalTitle').textContent = data.id ? 'Oportunidad comercial' : 'Nueva oportunidad';
    $('commercialForm').innerHTML = formHtml(data);
    $('commercialPaymentInfo').innerHTML = paymentInfo(data);
    $('commercialSaveButton').style.display = canEdit() ? '' : 'none';
    renderAudit(data.id);
    $('commercialModal').style.display = 'block';
  }
  function renderAudit(id) {
    const target = $('commercialAudit'); if (!target) return;
    if (!id || !canAudit()) { target.innerHTML = ''; return; }
    const rows = auditRows.filter(x => x.opportunityId === id).slice(-20).reverse();
    target.innerHTML = `<h3 style="font-size:.92rem;margin:0 0 8px">Bitácora de cambios</h3>${rows.length ? rows.map(x => `<div style="font-size:.76rem;border-top:1px solid var(--border);padding:7px 0"><b>${e(x.action)}</b> · ${e(x.detail || '')}<br><span style="color:var(--muted)">${new Date(x.at).toLocaleString('es-CO')} · ${e(x.actor)} (${e(x.role)})</span></div>`).join('') : '<div style="font-size:.78rem;color:var(--muted)">Sin cambios anteriores.</div>'}`;
  }
  function refreshPaymentInfo() {
    const item = { appointmentId: clean($('comAppointmentId')?.value) };
    $('commercialPaymentInfo').innerHTML = paymentInfo(item);
  }
  function readForm() {
    return {
      id: clean($('comId').value), patientName: clean($('comPatientName').value), phone: clean($('comPhone').value), email: clean($('comEmail').value), firstContact: clean($('comFirstContact').value), origin: clean($('comOrigin').value), capturedBy: clean($('comCapturedBy').value), attendedBy: clean($('comAttendedBy').value), closedBy: clean($('comClosedBy').value), service: clean($('comService').value), status: clean($('comStatus').value), saleValue: Number($('comSaleValue').value || 0), nextFollowUp: clean($('comNextFollowUp').value), allianceCampaign: clean($('comAllianceCampaign').value), appointmentId: clean($('comAppointmentId').value)
    };
  }
  function save() {
    if (!canEdit()) return;
    const data = readForm();
    if (!data.patientName || !data.firstContact || !data.origin || !data.status) { alert('Completa paciente/interesado, fecha del primer contacto, canal de origen y estado comercial.'); return; }
    const ownId = data.id;
    const same = opportunities.find(x => x.id !== ownId && identity(x) && identity(x) === identity(data) && !['Perdido'].includes(x.status));
    if (same) { alert(`Ya existe una oportunidad activa para esta persona (${same.patientName}). Ábrela y actualízala para evitar duplicados.`); return; }
    if (data.appointmentId) {
      const linked = opportunities.find(x => x.id !== ownId && String(x.appointmentId) === data.appointmentId);
      if (linked) { alert(`La cita ya está vinculada a la oportunidad de ${linked.patientName}.`); return; }
    }
    const previous = ownId ? opportunities.find(x => x.id === ownId) : null;
    if (previous && !canChangeMoney()) data.saleValue = Number(previous.saleValue || 0);
    const stamp = new Date().toISOString();
    if (previous) {
      const changed = Object.keys(data).filter(k => k !== 'id' && String(previous[k] ?? '') !== String(data[k] ?? '')).map(k => k === 'saleValue' ? 'valor de venta' : k).join(', ');
      Object.assign(previous, data, { updatedAt: stamp, updatedBy: actor() });
      logChange(previous.id, 'Oportunidad actualizada', changed || 'Sin cambios materiales');
    } else {
      data.id = 'COM-' + Date.now().toString(36).toUpperCase();
      data.createdAt = stamp; data.createdBy = actor(); data.updatedAt = stamp; data.updatedBy = actor();
      opportunities.push(data);
      logChange(data.id, 'Oportunidad creada', `Origen: ${data.origin}; estado: ${data.status}`);
    }
    persist(); close(); render();
  }
  function close() { $('commercialModal').style.display = 'none'; }
  function edit(id) { hydrate(); const item = opportunities.find(x => x.id === id); if (item) open(item); }
  function openNew() { open(null); }

  global.PanelCommercialSales = Object.freeze({ render, renderList, openNew, edit, close, save, refreshPaymentInfo, _test: { identity, verifiedTotal } });
})(window);
