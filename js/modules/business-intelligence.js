/* Cuidándote Intelligence — indicadores empresariales determinísticos.
 * Lee únicamente datos agregados ya disponibles en el panel. No modifica
 * pagos, citas, historias clínicas ni comisiones.
 */
(function (global) {
  'use strict';

  const SETTINGS = 'business_intelligence_settings_v1';
  const REPORTS = 'business_intelligence_reports_v1';
  const AUDIT = 'business_intelligence_audit_v1';
  const DEFAULTS = Object.freeze({
    revenueTarget: 17000000, confirmedTarget: 12500000, confirmedMin: 150,
    confirmedGoal: 165, occupancyMin: 85, occupancyGoal: 95,
    michelleNewPatients: 6, ticketTarget: 100000, ticketExcellent: 150000
  });
  const money = value => '$' + Math.round(Number(value) || 0).toLocaleString('es-CO');
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const dateOnly = value => String(value || '').slice(0, 10);
  const monthKey = value => dateOnly(value).slice(0, 7);
  const now = () => new Date();
  const currentMonth = () => now().toISOString().slice(0, 7);
  const num = value => Number(String(value ?? 0).replace(/[^0-9.-]/g, '')) || 0;
  const idOf = row => String(row?.ID ?? row?.id ?? row?.PagoID ?? row?.paymentId ?? '').trim();
  const appointmentId = row => String(row?.CitaID ?? row?.CitaId ?? row?.citaId ?? row?.appointmentId ?? '').trim();
  const appointmentDate = row => dateOnly(row?.fecha ?? row?.Fecha ?? row?.date);
  const appointmentValue = row => num(row?.precio ?? row?.Precio ?? row?.valor ?? row?.Valor ?? row?.valorEsperado);
  const status = row => String(row?.estadoCita ?? row?.EstadoCita ?? row?.estado ?? row?.Estado ?? '').trim().toLowerCase();
  const paymentDate = row => dateOnly(row?.FechaPago ?? row?.fechaPago ?? row?.fecha ?? row?.Fecha ?? row?.CreatedAt);
  const paymentValue = row => num(row?.ValorRecibido ?? row?.valorRecibido ?? row?.Valor ?? row?.valor ?? row?.Monto ?? row?.monto);
  const isCancelled = row => /(cancel|no asist|reprogram|anulad|vencid)/i.test(status(row));
  const isAttended = row => /(atendid|realizad|completad)/i.test(status(row));
  const isApprovedPayment = row => /(aprob|verific|confirm|pagado|pago_aprobado)/i.test(String(row?.EstadoPago ?? row?.estadoPago ?? row?.estado ?? row?.Estado ?? ''));
  const safeArray = value => Array.isArray(value) ? value : [];
  const get = (key, fallback) => {
    try { const raw = global.kvGet?.(key) || localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
  };
  const set = (key, value) => {
    const raw = JSON.stringify(value);
    if (global.kvSet) global.kvSet(key, raw); else localStorage.setItem(key, raw);
  };
  const settings = () => ({ ...DEFAULTS, ...get(SETTINGS, {}) });
  const daysInMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysElapsed = date => Math.max(1, date.getDate());
  const pct = (value, target) => target > 0 ? Math.round(value / target * 100) : null;
  const cleanKey = value => String(value || '').trim().toLowerCase();

  function currentUser() { try { return global.currentAdminUser || {}; } catch (_) { return {}; } }
  function canAccess() {
    const role = String(currentUser().rol || currentUser().role || 'Superadministradora').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return !/(auxiliar|fisioterapeuta|profesional)/.test(role);
  }
  function source() {
    const data = global.allData || {};
    const ops = global.operationsData || {};
    return {
      appointments: safeArray(data.citas), payments: safeArray(ops.pagos), events: safeArray(data.eventos),
      opportunities: safeArray(global.PanelCommercialSales?.getOpportunities?.()),
      expenses: safeArray(get('egresos', [])), team: global.teamData || {}
    };
  }
  function uniquePayments(rows) {
    const seen = new Set();
    return rows.filter((row, index) => {
      const base = idOf(row) || [appointmentId(row), paymentDate(row), paymentValue(row), row?.MedioPago || row?.medioPago || '', index].join('|');
      if (seen.has(base)) return false;
      seen.add(base); return true;
    });
  }
  function durationMinutes(row) {
    const direct = num(row?.duracionMinutos ?? row?.DuracionMinutos ?? row?.duracion ?? row?.Duracion);
    if (direct >= 15 && direct <= 300) return direct;
    const service = String(row?.servicio ?? row?.Servicio ?? '').toLowerCase();
    if (/full|profundo|ritual/.test(service)) return 90;
    if (/valoraci/.test(service)) return 60;
    if (/entrenamiento/.test(service)) return 60;
    return 50;
  }
  function capacityMinutes(team, month) {
    // Solo acepta configuración explícita. Sin ella, no se inventa un horario.
    const schedules = safeArray(team?.schedules || team?.horarios || team?.workSchedules || team?.agendaLaboral);
    if (!schedules.length) return null;
    const days = daysInMonth(now());
    const weekly = schedules.reduce((sum, item) => sum + num(item.minutesPerWeek ?? item.minutosSemana ?? item.weeklyMinutes), 0);
    if (!weekly) return null;
    return Math.round(weekly / 7 * days * 2); // dos camillas, sólo desde horario configurado.
  }
  function compute(input = source(), month = currentMonth(), opts = {}) {
    const setts = { ...DEFAULTS, ...(opts.settings || settings()) };
    const appointments = safeArray(input.appointments).filter(row => monthKey(appointmentDate(row)) === month);
    const activeAppointments = appointments.filter(row => !isCancelled(row));
    const cancelled = appointments.filter(isCancelled);
    const attended = activeAppointments.filter(isAttended);
    const payments = uniquePayments(safeArray(input.payments).filter(row => isApprovedPayment(row) && monthKey(paymentDate(row)) === month));
    const cashReceived = payments.reduce((sum, row) => sum + paymentValue(row), 0);
    const confirmedValue = activeAppointments.reduce((sum, row) => sum + appointmentValue(row), 0);
    const paidByAppointment = new Map();
    payments.forEach(row => { const id = appointmentId(row); if (id) paidByAppointment.set(id, (paidByAppointment.get(id) || 0) + paymentValue(row)); });
    const accountsReceivable = activeAppointments.reduce((sum, row) => {
      const id = idOf(row); return sum + Math.max(0, appointmentValue(row) - (paidByAppointment.get(id) || 0));
    }, 0);
    const expenses = safeArray(input.expenses).filter(row => monthKey(row?.fecha ?? row?.Fecha) === month).reduce((sum, row) => sum + num(row?.monto ?? row?.Monto), 0);
    const operatingResult = cashReceived - expenses;
    const occupiedMinutes = activeAppointments.reduce((sum, row) => sum + durationMinutes(row), 0);
    const capacity = capacityMinutes(input.team || {}, month);
    const occupancy = capacity ? Math.round(occupiedMinutes / capacity * 100) : null;
    const ticket = activeAppointments.length ? confirmedValue / activeAppointments.length : 0;
    const opportunities = safeArray(input.opportunities).filter(row => String(row?.firstContact || row?.createdAt || '').slice(0, 7) === month);
    const commercialValue = opportunities.filter(row => /venta cerrada|paciente activo/i.test(String(row?.status))).reduce((sum, row) => sum + num(row?.saleValue), 0);
    const overdueFollowUps = opportunities.filter(row => row?.followUpAt && row.followUpAt < new Date().toISOString() && !/perdido|no contactar/i.test(String(row?.status)));
    const michelleDirect = opportunities.filter(row => /michelle/i.test(String(row?.capturedBy)) && /venta cerrada|paciente activo/i.test(String(row?.status))).length;
    const byService = {};
    const byProfessional = {};
    const byHour = {};
    activeAppointments.forEach(row => {
      const service = String(row?.servicio || row?.Servicio || 'Sin servicio');
      const professional = String(row?.profesional || row?.Profesional || row?.terapeuta || row?.asignadoA || 'Sin asignar');
      const hour = String(row?.hora || row?.Hora || '').slice(0, 2) || 'Sin hora';
      byService[service] = (byService[service] || { count: 0, value: 0, attended: 0 });
      byProfessional[professional] = (byProfessional[professional] || { count: 0, value: 0, attended: 0 });
      byHour[hour] = (byHour[hour] || 0) + 1;
      [byService[service], byProfessional[professional]].forEach(item => { item.count += 1; item.value += appointmentValue(row); if (isAttended(row)) item.attended += 1; });
    });
    const current = now();
    const projectedCash = Math.round(cashReceived / daysElapsed(current) * daysInMonth(current));
    const alerts = buildAlerts({ setts, cashReceived, confirmedValue, accountsReceivable, cancelled, appointments, occupancy, ticket, overdueFollowUps, projectedCash, current });
    return {
      month, setts, source: { appointments: appointments.length, payments: payments.length, opportunities: opportunities.length, expenseRows: safeArray(input.expenses).length },
      cashReceived, confirmedValue, commercialValue, accountsReceivable, expenses, operatingResult,
      operatingMargin: cashReceived ? Math.round(operatingResult / cashReceived * 100) : null,
      ticket, appointments: appointments.length, confirmedAppointments: activeAppointments.length,
      attendedAppointments: attended.length, cancelledAppointments: cancelled.length,
      cancellationRate: appointments.length ? Math.round(cancelled.length / appointments.length * 100) : 0,
      occupiedMinutes, capacityMinutes: capacity, occupancy, projectedCash, daysRemaining: Math.max(0, daysInMonth(current) - daysElapsed(current)),
      gapCash: Math.max(0, setts.revenueTarget - cashReceived), gapConfirmed: Math.max(0, setts.confirmedTarget - confirmedValue),
      byService, byProfessional, byHour, opportunities, overdueFollowUps, michelleDirect, alerts
    };
  }
  function buildAlerts(data) {
    const alerts = [];
    const add = (priority, title, evidence, action) => alerts.push({ priority, title, evidence, action });
    const needPerDay = data.daysRemaining > 0 ? Math.ceil(Math.max(0, data.setts.revenueTarget - data.cashReceived) / data.daysRemaining) : 0;
    if (data.projectedCash < data.setts.revenueTarget && data.cashReceived > 0) add('Alta', 'Proyección de cobro bajo la meta', `${money(data.projectedCash)} proyectados vs meta ${money(data.setts.revenueTarget)}. Faltan ${money(Math.max(0, data.setts.revenueTarget - data.projectedCash))}.`, `Prioriza cobros pendientes y necesita ${money(needPerDay)} diarios durante los días restantes.`);
    if (data.appointments.length >= 5 && data.cancelled.length / data.appointments.length >= .12) add('Alta', 'Cancelaciones por encima del umbral', `${data.cancelled.length} de ${data.appointments.length} citas (${Math.round(data.cancelled.length / data.appointments.length * 100)}%).`, 'Revisar motivo, ofrecer reprogramación y verificar franjas con mayor incidencia.');
    if (data.accountsReceivable > 0) add('Media', 'Cobros pendientes identificados', `${money(data.accountsReceivable)} es el saldo de citas activas con valor explícito.`, 'Conciliar con Pagos antes de contactar o registrar un nuevo cobro.');
    if (data.overdueFollowUps.length) add('Media', 'Seguimientos comerciales vencidos', `${data.overdueFollowUps.length} oportunidades tienen una próxima acción vencida.`, 'Asignar o completar el seguimiento desde Gestión Comercial.');
    if (data.ticket > 0 && data.ticket < data.setts.ticketTarget) add('Media', 'Ticket promedio bajo la meta', `${money(data.ticket)} por cita vs objetivo ${money(data.setts.ticketTarget)}.`, 'Revisar mezcla de servicios y oportunidades de paquetes, sin alterar criterios clínicos.');
    if (data.occupancy !== null && data.occupancy < data.setts.occupancyMin) add('Media', 'Ocupación bajo objetivo', `${data.occupancy}% de capacidad configurada; mínimo ${data.setts.occupancyMin}%.`, 'Promocionar espacios disponibles y revisar la agenda de los próximos días.');
    return alerts;
  }
  function report(kind, metrics) {
    const topService = Object.entries(metrics.byService).sort((a, b) => b[1].value - a[1].value)[0];
    const common = [
      `Cobrado: ${money(metrics.cashReceived)} (pagos aprobados, ${metrics.source.payments} registros).`,
      `Servicios confirmados: ${money(metrics.confirmedValue)} en ${metrics.confirmedAppointments} citas activas.`,
      `Cuentas por cobrar estimadas: ${money(metrics.accountsReceivable)}; requiere conciliación con Pagos.`,
      `Cancelaciones: ${metrics.cancelledAppointments} (${metrics.cancellationRate}%).`,
      topService ? `Servicio de mayor valor confirmado: ${topService[0]} (${money(topService[1].value)}).` : 'No hay servicios confirmados suficientes para ranking.'
    ];
    const recommendations = metrics.alerts.slice(0, 3).map(alert => `${alert.priority}: ${alert.action}`);
    const title = kind === 'daily' ? 'Informe diario' : kind === 'weekly' ? 'Informe semanal' : 'Informe mensual';
    return { id: 'BI-' + Date.now().toString(36).toUpperCase(), kind, title, month: metrics.month, createdAt: new Date().toISOString(), summary: common, recommendations };
  }
  function audit(action, detail) { const rows = get(AUDIT, []); rows.unshift({ at: new Date().toISOString(), action, detail }); set(AUDIT, rows.slice(0, 300)); }
  function answer(question, metrics) {
    const q = cleanKey(question);
    if (!q) return 'Escribe una pregunta sobre ingresos, metas, agenda, servicios o Gestión Comercial.';
    if (/vend|cobrad|ingres/.test(q)) return `Hecho verificable: se han cobrado ${money(metrics.cashReceived)} este mes a partir de ${metrics.source.payments} pagos aprobados. Esto no equivale a servicios confirmados (${money(metrics.confirmedValue)}).`;
    if (/falta|meta/.test(q)) return `Faltan ${money(metrics.gapCash)} para la meta de ingresos cobrados y ${money(metrics.gapConfirmed)} para la meta de servicios confirmados. Son indicadores distintos.`;
    if (/servicio.*(mas|mayor)|mas.*servicio/.test(q)) { const top = Object.entries(metrics.byService).sort((a, b) => b[1].value - a[1].value)[0]; return top ? `Hecho verificable: ${top[0]} suma ${money(top[1].value)} confirmados en ${top[1].count} citas.` : 'No hay citas activas con servicio y valor suficientes para determinarlo.'; }
    if (/michelle|comercial|seguimiento/.test(q)) return `Gestión Comercial: ${metrics.opportunities.length} oportunidades del mes, ${metrics.overdueFollowUps.length} seguimientos vencidos y ${metrics.michelleDirect} captaciones cerradas atribuidas explícitamente a Michelle. No se atribuyen canales espontáneos automáticamente.`;
    if (/natalia|equipo|profesional/.test(q)) return 'La productividad por profesional se muestra con citas y valores confirmados. Si falta el profesional asignado en la agenda, el sistema lo señalará como “Sin asignar” en lugar de inferirlo.';
    if (/horario|ocupaci|agenda/.test(q)) return metrics.occupancy === null ? 'No puedo calcular ocupación fiable: la configuración de horarios/capacidad no está disponible en los datos cargados. Sí puedo mostrar citas por hora y espacios de la agenda.' : `La ocupación calculada contra la capacidad configurada es ${metrics.occupancy}%.`;
    return 'No tengo evidencia suficiente para responderlo con seguridad. Prueba con ingresos cobrados, meta, servicio, agenda, Michelle o seguimientos.';
  }

  const $ = id => document.getElementById(id);
  const stat = (label, value, note, color = '#0f766e') => `<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};border-radius:12px;padding:13px"><div style="font-size:.72rem;color:var(--muted)">${esc(label)}</div><b style="display:block;font-size:1.15rem;color:${color};margin-top:3px">${esc(value)}</b><div style="font-size:.69rem;color:var(--muted);margin-top:4px">${esc(note || '')}</div></div>`;
  function tableRows(object, formatter) { const entries = Object.entries(object).sort((a, b) => b[1].value - a[1].value); return entries.length ? entries.slice(0, 8).map(formatter).join('') : '<div style="font-size:.82rem;color:var(--muted);padding:10px 0">Sin datos suficientes para este período.</div>'; }
  async function render() {
    const root = $('businessIntelligenceContent'); if (!root) return;
    if (!canAccess()) { root.innerHTML = '<div class="notice notice-warn">Este módulo contiene información financiera y está restringido a administración y dirección.</div>'; return; }
    root.innerHTML = '<div class="notice">Actualizando datos operativos y comerciales…</div>';
    try { await global.PanelPayments?.loadOperationsData?.(); } catch (_) {}
    const metrics = compute(); global.__businessIntelligenceMetrics = metrics;
    const alerts = metrics.alerts.length ? metrics.alerts.map(item => `<article style="border-left:4px solid ${item.priority === 'Alta' ? '#dc2626' : '#d97706'};background:var(--s2);border-radius:9px;padding:11px 12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(item.title)}</b><span style="font-size:.72rem;color:${item.priority === 'Alta' ? '#b91c1c' : '#b45309'}">${esc(item.priority)}</span></div><div style="font-size:.78rem;margin-top:5px">${esc(item.evidence)}</div><div style="font-size:.78rem;color:var(--muted);margin-top:4px"><b>Acción:</b> ${esc(item.action)}</div></article>`).join('') : '<div class="notice">No hay alertas con evidencia suficiente en este momento.</div>';
    root.innerHTML = `
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:13px">Período: ${esc(metrics.month)} · datos agregados de Agenda, Pagos, Finanzas y Gestión Comercial. Los pagos aprobados son la única fuente de “cobrado”.</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px">
        ${stat('Ingresos cobrados', money(metrics.cashReceived), `${metrics.source.payments} pagos aprobados`, '#047857')}
        ${stat('Servicios confirmados', money(metrics.confirmedValue), `${metrics.confirmedAppointments} citas activas`, '#2563eb')}
        ${stat('Cuentas por cobrar', money(metrics.accountsReceivable), 'solo citas con valor explícito', '#b45309')}
        ${stat('Resultado operativo', money(metrics.operatingResult), `gastos registrados: ${money(metrics.expenses)}`, metrics.operatingResult >= 0 ? '#047857' : '#b91c1c')}
        ${stat('Ticket promedio', money(metrics.ticket), `meta: ${money(metrics.setts.ticketTarget)}`, '#7c3aed')}
        ${stat('Cancelaciones', metrics.cancelledAppointments + ' (' + metrics.cancellationRate + '%)', `${metrics.appointments} citas registradas`, metrics.cancellationRate >= 12 ? '#b91c1c' : '#047857')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:16px">
        <section class="card"><div class="card-title">🎯 Metas y proyección</div><div style="font-size:.85rem;line-height:1.9"><div>Cobrado: <b>${money(metrics.cashReceived)}</b> / ${money(metrics.setts.revenueTarget)} (${pct(metrics.cashReceived, metrics.setts.revenueTarget)}%)</div><div>Confirmado: <b>${money(metrics.confirmedValue)}</b> / ${money(metrics.setts.confirmedTarget)} (${pct(metrics.confirmedValue, metrics.setts.confirmedTarget)}%)</div><div>Proyección de cobro: <b>${money(metrics.projectedCash)}</b> <span style="color:var(--muted)">(ritmo diario actual; estimación)</span></div><div>Ocupación: <b>${metrics.occupancy === null ? 'No calculable' : metrics.occupancy + '%'}</b> <span style="color:var(--muted)">${metrics.occupancy === null ? 'falta configuración horaria' : 'capacidad de dos camillas desde horario configurado'}</span></div></div></section>
        <section class="card"><div class="card-title">⚠️ Alertas inteligentes</div>${alerts}</section>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:16px">
        <section class="card"><div class="card-title">Servicios confirmados</div>${tableRows(metrics.byService, ([name, value]) => `<div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding:8px 0;font-size:.82rem"><span>${esc(name)}</span><b>${money(value.value)} · ${value.count}</b></div>`)}</section>
        <section class="card"><div class="card-title">Productividad por profesional</div>${tableRows(metrics.byProfessional, ([name, value]) => `<div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding:8px 0;font-size:.82rem"><span>${esc(name)}</span><b>${value.attended}/${value.count} · ${money(value.value)}</b></div>`)}</section>
        <section class="card"><div class="card-title">Gestión Comercial</div><div style="font-size:.84rem;line-height:1.9"><div>Oportunidades del período: <b>${metrics.opportunities.length}</b></div><div>Seguimientos vencidos: <b>${metrics.overdueFollowUps.length}</b></div><div>Captaciones cerradas de Michelle: <b>${metrics.michelleDirect}</b></div><div>Valor comercial cerrado: <b>${money(metrics.commercialValue)}</b></div><p style="font-size:.74rem;color:var(--muted);margin-bottom:0">No representa comisión ni atribuye automáticamente Google, redes, web o referidos.</p></div></section>
      </div>`;
    renderReports();
  }
  function saveSettings() {
    const result = {}; Object.keys(DEFAULTS).forEach(key => { result[key] = num($('bi_' + key)?.value) || DEFAULTS[key]; });
    set(SETTINGS, result); audit('Metas empresariales actualizadas', 'Configuración de Inteligencia Empresarial'); render();
  }
  function openSettings() { const s = settings(), target = $('biSettings'); if (!target) return; target.style.display = target.style.display === 'none' ? 'block' : 'none'; target.innerHTML = `<div class="card" style="margin-top:14px"><div class="card-title">Metas empresariales editables</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px">${Object.entries({ revenueTarget:'Meta ingresos cobrados', confirmedTarget:'Meta servicios confirmados', confirmedMin:'Citas confirmadas mínima', confirmedGoal:'Citas confirmadas objetivo', occupancyMin:'Ocupación mínima (%)', occupancyGoal:'Ocupación objetivo (%)', michelleNewPatients:'Pacientes nuevos Michelle', ticketTarget:'Ticket promedio objetivo', ticketExcellent:'Ticket sobresaliente' }).map(([key, label]) => `<label style="font-size:.78rem;font-weight:700;color:var(--muted)">${esc(label)}<input id="bi_${key}" type="number" min="0" value="${s[key]}" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--s2);color:var(--text)"></label>`).join('')}</div><button class="btn btn-teal" style="margin-top:12px" onclick="PanelBusinessIntelligence.saveSettings()">Guardar metas</button></div>`; }
  function createReport(kind) { const metrics = global.__businessIntelligenceMetrics || compute(); const item = report(kind, metrics); const reports = get(REPORTS, []); reports.unshift(item); set(REPORTS, reports.slice(0, 100)); audit('Informe generado', item.title); renderReports(); }
  function renderReports() { const el = $('biReports'); if (!el) return; const reports = get(REPORTS, []); el.innerHTML = reports.length ? reports.slice(0, 12).map(item => `<article style="padding:10px;border-top:1px solid var(--border);font-size:.8rem"><b>${esc(item.title)}</b> · ${new Date(item.createdAt).toLocaleString('es-CO')}<div style="color:var(--muted);margin-top:4px">${esc(item.summary?.[0] || '')}</div></article>`).join('') : '<div style="font-size:.8rem;color:var(--muted)">Aún no hay informes generados. La entrega automática requiere una integración de notificaciones configurada.</div>'; }
  function ask() { const input = $('biQuestion'), output = $('biAnswer'); if (!input || !output) return; const metrics = global.__businessIntelligenceMetrics || compute(); const response = answer(input.value, metrics); output.innerHTML = `<b>Respuesta basada en datos:</b> ${esc(response)}`; audit('Consulta gerencial', String(input.value || '').slice(0, 300)); }
  function init() { render(); }

  const api = Object.freeze({ init, render, compute, report, answer, saveSettings, openSettings, createReport, renderReports, ask, defaults: DEFAULTS });
  global.PanelBusinessIntelligence = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = { compute, buildAlerts, report, answer, DEFAULTS };
})(typeof window !== 'undefined' ? window : globalThis);
