/* Cuidándote Intelligence — indicadores empresariales determinísticos.
 * Lee únicamente datos agregados ya disponibles en el panel. No modifica
 * pagos, citas, historias clínicas ni comisiones.
 */
(function (global) {
  'use strict';

  const SETTINGS = 'business_intelligence_settings_v1';
  const REPORTS = 'business_intelligence_reports_v1';
  const AUDIT = 'business_intelligence_audit_v1';
  const CHAT_HISTORY = 'business_intelligence_chat_history_v1';
  const BUSINESS_CONTEXT = 'business_intelligence_context_v1';
  const REPORT_SCHEDULE = 'business_intelligence_report_schedule_v1';
  const SERVICE_CATALOG = 'business_intelligence_service_catalog_v1';
  const DEFAULTS = Object.freeze({
    revenueTarget: 17000000, confirmedTarget: 12500000, confirmedMin: 150,
    confirmedGoal: 165, occupancyMin: 85, occupancyGoal: 95,
    michelleNewPatients: 6, ticketTarget: 100000, ticketExcellent: 150000
  });
  const DEFAULT_CONTEXT = Object.freeze({ timezone:'America/Bogota', camillas:2, growthObjective:'Crecimiento sostenible sin alterar criterios clínicos', michelleAttribution:'Sólo atribución explícita; no atribuir Google, redes, web o voz a voz automáticamente.' });
  // El catálogo distingue minutos de atención y recurso físico. Así una sesión
  // grupal o entrenamiento no se suma por error como ocupación de camilla.
  const DEFAULT_SERVICE_CATALOG = Object.freeze([
    { name: 'Valoración funcional', minutes: 40, resource: 'camilla', units: 1 },
    { name: 'Readaptación funcional', minutes: 40, resource: 'camilla', units: 1 },
    { name: 'Descarga cuello y espalda', minutes: 50, resource: 'camilla', units: 1 },
    { name: 'Descarga completa', minutes: 80, resource: 'camilla', units: 1 },
    { name: 'Pausa', minutes: 40, resource: 'camilla', units: 1 },
    { name: 'Ritual Cuidándote', minutes: 60, resource: 'camilla', units: 1 },
    { name: 'Profundo Cuidándote', minutes: 90, resource: 'camilla', units: 1 },
    { name: 'Entrenamiento funcional', minutes: 60, resource: 'training', units: 1, maxPeople: 4 }
  ]);
  const money = value => '$' + Math.round(Number(value) || 0).toLocaleString('es-CO');
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const dateOnly = value => String(value || '').slice(0, 10);
  const monthKey = value => dateOnly(value).slice(0, 7);
  const now = () => new Date();
  const currentMonth = () => now().toISOString().slice(0, 7);
  // Acepta tanto valores numéricos como formatos colombianos de moneda
  // ("$80.000" o "1.250.000,50") sin convertir miles en decimales.
  const num = value => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const raw = String(value ?? '').trim();
    // No se extraen dígitos de texto ambiguo como "abono 80.000": ese dato
    // requiere revisión, no una inferencia financiera silenciosa.
    if (!raw || !/^-?\s*(?:(?:COP|\$)\s*)?\d[\d.,\s]*$/i.test(raw)) return 0;
    let text = raw.replace(/\s/g, '').replace(/^COP/i, '').replace(/^\$/, '');
    if (/^-?\d{1,3}(\.\d{3})+,\d{1,2}$/.test(text)) {
      text = text.replace(/\./g, '').replace(',', '.');
    } else if (/^-?\d{1,3}(,\d{3})+\.\d{1,2}$/.test(text)) {
      text = text.replace(/,/g, '');
    } else if (/^-?\d{1,3}(\.\d{3})+$/.test(text)) {
      text = text.replace(/\./g, '');
    } else if (/^-?\d{1,3}(,\d{3})+$/.test(text)) {
      text = text.replace(/,/g, '');
    } else if (!/^-?\d+(?:[.,]\d{1,2})?$/.test(text)) {
      return 0;
    } else {
      text = text.replace(',', '.');
    }
    return Number(text) || 0;
  };
  const idOf = row => String(row?.ID ?? row?.id ?? row?.PagoID ?? row?.paymentId ?? '').trim();
  const appointmentId = row => String(row?.CitaID ?? row?.CitaId ?? row?.citaId ?? row?.appointmentId ?? '').trim();
  const appointmentDate = row => dateOnly(row?.fecha ?? row?.Fecha ?? row?.date);
  const appointmentValue = row => num(row?.precio ?? row?.Precio ?? row?.valor ?? row?.Valor ?? row?.valorEsperado);
  const status = row => String(row?.estadoCita ?? row?.EstadoCita ?? row?.estado ?? row?.Estado ?? '').trim().toLowerCase();
  const paymentDate = row => dateOnly(row?.FechaPago ?? row?.fechaPago ?? row?.fecha ?? row?.Fecha ?? row?.CreatedAt);
  const paymentValue = row => num(row?.ValorRecibido ?? row?.valorRecibido ?? row?.Valor ?? row?.valor ?? row?.Monto ?? row?.monto);
  const isRescheduled = row => /reprogram/i.test(status(row));
  const isNoShow = row => /no asist/i.test(status(row));
  const isCancelled = row => /(cancel|anulad|vencid)/i.test(status(row));
  const isInactiveAppointment = row => isCancelled(row) || isNoShow(row) || isRescheduled(row);
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
  const businessContext = () => ({ ...DEFAULT_CONTEXT, ...get(BUSINESS_CONTEXT, {}) });
  const serviceCatalog = () => {
    const saved = get(SERVICE_CATALOG, null);
    return Array.isArray(saved) && saved.length ? saved : DEFAULT_SERVICE_CATALOG.map(item => ({ ...item }));
  };
  const daysInMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysElapsed = date => Math.max(1, date.getDate());
  const pct = (value, target) => target > 0 ? Math.round(value / target * 100) : null;
  const cleanKey = value => String(value || '').trim().toLowerCase();
  const previousMonth = month => {
    const [year, number] = String(month).split('-').map(Number);
    const date = new Date(year, number - 2, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };
  const minuteOfDay = value => {
    const [hour, minute] = String(value || '').split(':').map(Number);
    return Number.isFinite(hour) && Number.isFinite(minute) ? hour * 60 + minute : null;
  };
  const monthDays = month => {
    const [year, number] = String(month).split('-').map(Number);
    return new Date(year, number, 0).getDate();
  };
  const shiftDate = (iso, days) => {
    const date = new Date(`${iso}T12:00:00`); date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };

  function currentUser() { try { return global.currentAdminUser || {}; } catch (_) { return {}; } }
  function canAccess() {
    const role = String(currentUser().rol || currentUser().role || 'Superadministradora').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return !/(auxiliar|fisioterapeuta|profesional)/.test(role);
  }
  // El panel principal declara estas colecciones con `let`, por lo que no
  // siempre aparecen como window.allData/window.operationsData. Conservamos
  // la lectura del global y usamos el enlace léxico sólo como respaldo.
  function runtimeCollection(key) {
    if (global[key] !== undefined && global[key] !== null) return global[key];
    try {
      if (key === 'allData') return typeof allData !== 'undefined' ? allData : undefined;
      if (key === 'operationsData') return typeof operationsData !== 'undefined' ? operationsData : undefined;
      if (key === 'teamData') return typeof teamData !== 'undefined' ? teamData : undefined;
    } catch (_) {}
    return undefined;
  }
  function source() {
    const rawData = runtimeCollection('allData');
    const rawOps = runtimeCollection('operationsData');
    const data = rawData && typeof rawData === 'object' ? rawData : {};
    const ops = rawOps && typeof rawOps === 'object' ? rawOps : {};
    return {
      appointments: safeArray(data.citas), payments: safeArray(ops.pagos), events: safeArray(data.eventos),
      opportunities: safeArray(global.PanelCommercialSales?.getOpportunities?.()),
      packages: safeArray(ops.planesCliente).length ? safeArray(ops.planesCliente) : safeArray(get('pk_asignados', [])),
      training: get('functional_training_v1', { members: [], bookings: [], payments: [] }),
      expenses: safeArray(get('egresos', [])), team: runtimeCollection('teamData') || {}, blocks: safeArray(data.bloqueos),
      load: {
        appointments: Array.isArray(data.citas), payments: Array.isArray(ops.pagos),
        events: Array.isArray(data.eventos), packages: Array.isArray(ops.planesCliente) || Array.isArray(get('pk_asignados', []))
      },
      // Esta es la configuración de sede realmente guardada. No usamos el horario
      // sugerido del módulo cuando no hay una configuración persistida.
      weeklySchedule: get('horarios_semanales_v1', null)
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
  function catalogEntry(row, catalog = serviceCatalog()) {
    const service = cleanKey(row?.servicio ?? row?.Servicio);
    if (!service) return null;
    return safeArray(catalog).find(item => {
      const name = cleanKey(item?.name);
      return name && (name === service || service.includes(name) || name.includes(service));
    }) || null;
  }
  function durationMinutes(row, catalog) {
    const direct = num(row?.duracionMinutos ?? row?.DuracionMinutos ?? row?.duracion ?? row?.Duracion);
    if (direct >= 15 && direct <= 300) return direct;
    const entry = catalogEntry(row, catalog);
    return entry && num(entry.minutes) >= 15 ? num(entry.minutes) : null;
  }
  function capacityMinutes(weeklySchedule, blocks, month) {
    // La capacidad se mide desde la jornada guardada de la sede y dos camillas.
    // No se deriva de horarios individuales porque podrían duplicarse o solaparse.
    if (!Array.isArray(weeklySchedule) || weeklySchedule.length !== 7) return null;
    let minutes = 0;
    const [year, number] = String(month).split('-').map(Number);
    for (let day = 1; day <= monthDays(month); day += 1) {
      const date = new Date(year, number - 1, day);
      const schedule = weeklySchedule[date.getDay()];
      if (!schedule?.enabled) continue;
      const daily = safeArray(schedule.ranges).reduce((total, range) => {
        const start = minuteOfDay(range?.[0]); const end = minuteOfDay(range?.[1]);
        return start !== null && end !== null && end > start ? total + end - start : total;
      }, 0);
      minutes += daily * 2;
    }
    // Los bloqueos se descuentan de las dos camillas; si un bloqueo se maneja por
    // recurso individual, debe llevar "camillas" explícito para no sobre-restar.
    const blocked = safeArray(blocks).filter(row => dateOnly(row?.fecha ?? row?.Fecha).slice(0, 7) === month)
      .reduce((total, row) => {
        const start = minuteOfDay(row?.inicio ?? row?.Inicio); const end = minuteOfDay(row?.fin ?? row?.Fin);
        const rooms = Math.max(1, Math.min(2, num(row?.camillas ?? row?.Camillas) || 2));
        return start !== null && end !== null && end > start ? total + (end - start) * rooms : total;
      }, 0);
    return Math.max(0, minutes - blocked);
  }
  // Lectura exclusiva: clasifica relaciones existentes sin corregir registros.
  function reconcile(input = source(), month = currentMonth()) {
    const payments = uniquePayments(safeArray(input.payments));
    const rows = [];
    const seen = new Set();
    safeArray(input.packages).forEach(plan => {
      const id = String(plan?.id || plan?.ID || 'sin-id');
      const total = num(plan?.valorTotal ?? plan?.valor ?? plan?.precio);
      const paid = num(plan?.abonado);
      const sessions = Math.max(0, num(plan?.sesiones));
      const consumedIds = new Set(safeArray(plan?.consumoCitas).map(x => String(x?.id)));
      const reservedIds = safeArray(plan?.reservasCitas).map(x => String(x?.id)).filter(id => !consumedIds.has(id));
      const used = Math.max(num(plan?.consumidas), consumedIds.size);
      const status = !id || !total || !sessions ? 'Información insuficiente' : paid > total ? 'Diferencia de valores' : paid < total ? 'Pendiente de relación' : 'Conciliado';
      rows.push({ type:'Plan/paquete', id, patient:String(plan?.paciente || plan?.nombrePaciente || 'Sin paciente'), contracted:total, paid, pending:Math.max(0,total-paid), sessions, consumed:used, reserved:reservedIds.length, available:Math.max(0,sessions-used-reservedIds.length), status });
      seen.add(id);
    });
    const training = input.training && typeof input.training === 'object' ? input.training : {};
    safeArray(training.members).forEach(member => {
      const id = String(member?.id || 'sin-id'); const memberPayments = safeArray(training.payments).filter(p => String(p?.memberId) === id);
      const paid = memberPayments.reduce((sum,p) => sum + num(p?.amount),0);
      const attendance = safeArray(training.bookings).filter(b => String(b?.memberId) === id && b?.status === 'attended').length;
      rows.push({ type:'Membresía entrenamiento', id, patient:String(member?.name || 'Sin participante'), contracted:member?.plan === 'courtesy' ? 0 : paid, paid, pending:0, sessions:member?.plan === 'courtesy' ? 3 : null, consumed:attendance, available:null, status:member?.plan === 'courtesy' ? 'Conciliado' : paid > 0 ? 'Conciliado' : 'Pendiente de relación' });
    });
    safeArray(input.events).filter(e => monthKey(e?.fecha ?? e?.Fecha) === month).forEach(event => rows.push({ type:'Evento/grupal', id:String(event?.id || event?.ID || 'sin-id'), patient:String(event?.nombre || event?.titulo || event?.servicio || 'Sin detalle'), contracted:num(event?.valor ?? event?.cobro), paid:num(event?.pagado ?? event?.valorPagado), pending:Math.max(0,num(event?.valor ?? event?.cobro)-num(event?.pagado ?? event?.valorPagado)), sessions:null, consumed:null, available:null, status:num(event?.valor ?? event?.cobro) ? 'Pendiente de relación' : 'Información insuficiente' }));
    const duplicatePayments = safeArray(input.payments).filter((p,i,a) => { const id = idOf(p); return id && a.findIndex(x => idOf(x) === id) !== i; });
    const unmatchedPayments = payments.filter(p => !appointmentId(p) && !String(p?.planId || p?.packageId || p?.memberId));
    const counts = rows.reduce((a,row) => { a[row.status] = (a[row.status] || 0) + 1; return a; }, {});
    return { month, rows, counts, duplicatePayments, unmatchedPayments, reconciledValue: rows.filter(r => r.status === 'Conciliado').reduce((sum,r)=>sum+r.paid,0) };
  }
  function scenarios(metrics) {
    const base = Number(metrics.projectedCash || 0);
    return { assumptions:'Se extrapola el ritmo de cobros aprobados observado; no es una probabilidad.', conservative:{ name:'Conservador', value:Math.round(base*.9), assumption:'10% por debajo del ritmo observado.' }, base:{ name:'Base', value:base, assumption:'Continuidad del ritmo observado.' }, optimistic:{ name:'Optimista', value:Math.round(base*1.1), assumption:'10% por encima del ritmo; requiere evidencia operativa.' }, requiredDaily:metrics.daysRemaining ? Math.ceil(metrics.gapCash / metrics.daysRemaining) : 0 };
  }
  function compute(input = source(), month = currentMonth(), opts = {}) {
    const setts = { ...DEFAULTS, ...(opts.settings || settings()) };
    const catalog = safeArray(opts.catalog || input.serviceCatalog || serviceCatalog());
    const load = input.load || { appointments:true, payments:true, events:true, packages:true };
    const appointments = safeArray(input.appointments).filter(row => monthKey(appointmentDate(row)) === month);
    const activeAppointments = appointments.filter(row => !isInactiveAppointment(row));
    const cancelled = appointments.filter(isCancelled);
    const rescheduled = appointments.filter(isRescheduled);
    const noShows = appointments.filter(isNoShow);
    const attended = activeAppointments.filter(isAttended);
    const payments = load.payments ? uniquePayments(safeArray(input.payments).filter(row => isApprovedPayment(row) && monthKey(paymentDate(row)) === month)) : [];
    const cashReceived = load.payments ? payments.reduce((sum, row) => sum + paymentValue(row), 0) : null;
    const confirmedValue = activeAppointments.reduce((sum, row) => sum + appointmentValue(row), 0);
    const paidByAppointment = new Map();
    payments.forEach(row => { const id = appointmentId(row); if (id) paidByAppointment.set(id, (paidByAppointment.get(id) || 0) + paymentValue(row)); });
    const accountsReceivable = load.payments ? activeAppointments.reduce((sum, row) => {
      const id = idOf(row); return sum + Math.max(0, appointmentValue(row) - (paidByAppointment.get(id) || 0));
    }, 0) : null;
    const expenses = safeArray(input.expenses).filter(row => monthKey(row?.fecha ?? row?.Fecha) === month).reduce((sum, row) => sum + num(row?.monto ?? row?.Monto), 0);
    const operatingResult = cashReceived === null ? null : cashReceived - expenses;
    const resourceMinutes = { camilla: 0, training: 0, unknown: 0 };
    const professionalMinutes = {};
    const unclassifiedServices = new Set();
    activeAppointments.forEach(row => {
      const minutes = durationMinutes(row, catalog);
      const entry = catalogEntry(row, catalog);
      const service = String(row?.servicio || row?.Servicio || 'Sin servicio');
      const professional = String(row?.profesional || row?.Profesional || row?.terapeuta || row?.asignadoA || 'Sin asignar');
      if (!minutes || !entry) { unclassifiedServices.add(service); resourceMinutes.unknown += 1; return; }
      const units = Math.max(1, num(entry.units) || 1);
      if (entry.resource === 'camilla') resourceMinutes.camilla += minutes * Math.min(2, units);
      else if (entry.resource === 'training') resourceMinutes.training += minutes * units;
      professionalMinutes[professional] = (professionalMinutes[professional] || 0) + minutes;
    });
    const occupiedMinutes = resourceMinutes.camilla;
    const capacity = capacityMinutes(input.weeklySchedule, input.blocks, month);
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
    const isCurrent = month === currentMonth();
    const projectedCash = cashReceived === null ? null : (isCurrent ? Math.round(cashReceived / daysElapsed(current) * daysInMonth(current)) : cashReceived);
    const daysRemaining = isCurrent ? Math.max(0, daysInMonth(current) - daysElapsed(current)) : 0;
    const periodEnd = isCurrent ? current.toISOString().slice(0, 10) : `${month}-${String(monthDays(month)).padStart(2, '0')}`;
    const weekStart = shiftDate(periodEnd, -6);
    const priorWeekEnd = shiftDate(weekStart, -1);
    const priorWeekStart = shiftDate(periodEnd, -13);
    const inWindow = (date, start, end) => date >= start && date <= end;
    const weekly = (start, end) => ({
      start, end,
      cashReceived: load.payments ? uniquePayments(safeArray(input.payments).filter(row => isApprovedPayment(row) && inWindow(paymentDate(row), start, end))).reduce((sum, row) => sum + paymentValue(row), 0) : null,
      confirmedValue: safeArray(input.appointments).filter(row => !isInactiveAppointment(row) && inWindow(appointmentDate(row), start, end)).reduce((sum, row) => sum + appointmentValue(row), 0),
      appointments: safeArray(input.appointments).filter(row => !isInactiveAppointment(row) && inWindow(appointmentDate(row), start, end)).length
    });
    const weeklyCurrent = weekly(weekStart, periodEnd);
    const weeklyPrevious = weekly(priorWeekStart, priorWeekEnd);
    const alerts = buildAlerts({ setts, cashReceived, confirmedValue, accountsReceivable, cancelled, appointments, occupancy, ticket, overdueFollowUps, projectedCash, daysRemaining });
    const reconciliation = reconcile(input, month);
    const result = {
      month, setts, source: { appointments: appointments.length, payments: payments.length, opportunities: opportunities.length, expenseRows: safeArray(input.expenses).length },
      dataStatus: { appointments: load.appointments ? 'loaded' : 'unavailable', payments: load.payments ? 'loaded' : 'unavailable', events: load.events ? 'loaded' : 'unavailable', packages: load.packages ? 'loaded' : 'unavailable' },
      cashReceived, confirmedValue, commercialValue, accountsReceivable, expenses, operatingResult,
      operatingMargin: cashReceived ? Math.round(operatingResult / cashReceived * 100) : null,
      ticket, appointments: appointments.length, confirmedAppointments: activeAppointments.length,
      attendedAppointments: attended.length, cancelledAppointments: cancelled.length, rescheduledAppointments: rescheduled.length, noShowAppointments: noShows.length,
      cancellationRate: appointments.length ? Math.round(cancelled.length / appointments.length * 100) : 0,
      occupiedMinutes, capacityMinutes: capacity, occupancy, projectedCash, daysRemaining,
      resourceMinutes, professionalMinutes, unclassifiedServices: [...unclassifiedServices], serviceCatalog: catalog,
      gapCash: cashReceived === null ? null : Math.max(0, setts.revenueTarget - cashReceived), gapConfirmed: Math.max(0, setts.confirmedTarget - confirmedValue),
      byService, byProfessional, byHour, opportunities, overdueFollowUps, michelleDirect, alerts, reconciliation,
      weekly: { current: weeklyCurrent, previous: weeklyPrevious }
    };
    result.scenarios = scenarios(result);
    if (opts.withComparison !== false) {
      const prior = compute(input, previousMonth(month), { settings: setts, withComparison: false });
      result.comparison = {
        month: prior.month,
        cashReceived: cashReceived - prior.cashReceived,
        confirmedValue: confirmedValue - prior.confirmedValue,
        appointments: activeAppointments.length - prior.confirmedAppointments,
        ticket: ticket - prior.ticket
      };
    }
    return result;
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
      `Cancelaciones: ${metrics.cancelledAppointments} (${metrics.cancellationRate}%); reprogramaciones: ${metrics.rescheduledAppointments}; ausencias: ${metrics.noShowAppointments}.`,
      metrics.comparison ? `Vs. ${metrics.comparison.month}: cobrado ${signedMoney(metrics.comparison.cashReceived)} y confirmado ${signedMoney(metrics.comparison.confirmedValue)}.` : '',
      topService ? `Servicio de mayor valor confirmado: ${topService[0]} (${money(topService[1].value)}).` : 'No hay servicios confirmados suficientes para ranking.'
    ];
    const recommendations = metrics.alerts.slice(0, 3).map(alert => `${alert.priority}: ${alert.action}`);
    const title = kind === 'daily' ? 'Informe diario' : kind === 'weekly' ? 'Informe semanal' : 'Informe mensual';
    return { id: 'BI-' + Date.now().toString(36).toUpperCase(), kind, title, month: metrics.month, createdAt: new Date().toISOString(), summary: common, recommendations };
  }
  function signedMoney(value) { return (value >= 0 ? '+' : '−') + money(Math.abs(value)); }
  function audit(action, detail) { const rows = get(AUDIT, []); rows.unshift({ at: new Date().toISOString(), action, detail }); set(AUDIT, rows.slice(0, 300)); }
  function answer(question, metrics) {
    const q = cleanKey(question);
    if (!q) return 'Escribe una pregunta sobre ingresos, metas, agenda, servicios o Gestión Comercial.';
    if (/(bajaron|bajado|ca[ií]da|semana)/.test(q) && /(venta|cobro|ingreso|confirm)/.test(q)) {
      const current = metrics.weekly?.current; const previous = metrics.weekly?.previous;
      if (!current || !previous) return 'No hay datos semanales suficientes para comparar.';
      const cashDiff = current.cashReceived - previous.cashReceived;
      const confirmedDiff = current.confirmedValue - previous.confirmedValue;
      return `Hecho verificable: entre ${current.start} y ${current.end} se cobraron ${money(current.cashReceived)} y se confirmaron ${money(current.confirmedValue)}; frente a los siete días previos, la variación fue ${signedMoney(cashDiff)} en cobrado y ${signedMoney(confirmedDiff)} en confirmado. Esto muestra la variación, no prueba por sí solo su causa; revisa cancelaciones, cobros pendientes y seguimientos vencidos.`;
    }
    if (/vend|cobrad|ingres/.test(q)) return `Hecho verificable: se han cobrado ${money(metrics.cashReceived)} este mes a partir de ${metrics.source.payments} pagos aprobados. Esto no equivale a servicios confirmados (${money(metrics.confirmedValue)}).`;
    if (/(falta|meta)/.test(q) && !/(cita|sesion|sesión)/.test(q)) return `Faltan ${money(metrics.gapCash)} para la meta de ingresos cobrados y ${money(metrics.gapConfirmed)} para la meta de servicios confirmados. Son indicadores distintos.`;
    if (/(cuanta|cuanto|cuánt|cuánto).*(cita|sesion)|cita.*necesit/.test(q)) {
      const ticket = metrics.ticket > 0 ? metrics.ticket : metrics.setts.ticketTarget;
      const appointments = ticket > 0 ? Math.ceil(metrics.gapCash / ticket) : null;
      return appointments === null ? 'No puedo estimar citas necesarias porque no hay ticket promedio ni meta de ticket configurados.' : `Estimación, no hecho: al ticket de referencia de ${money(ticket)}, se requieren aproximadamente ${appointments} citas adicionales para cubrir ${money(metrics.gapCash)} de la meta de cobrado. La cifra cambia si varían pagos, precios o la mezcla de servicios.`;
    }
    if (/plan(es)?.*(termin|agot|pend)|renov/.test(q)) { const rows = metrics.reconciliation?.rows?.filter(r => r.type === 'Plan/paquete') || []; const nearing = rows.filter(r => r.available !== null && r.available <= 1); return `Datos confirmados del período: ${rows.length} planes/paquetes leídos; ${nearing.length} tienen una o ninguna sesión disponible. ${nearing.length ? 'Recomendación: revisar renovación sólo después de validar su saldo y estado.' : 'No hay planes próximos a agotarse identificados con la información disponible.'}`; }
    if (/servicio.*(mas|mayor)|mas.*servicio/.test(q)) { const top = Object.entries(metrics.byService).sort((a, b) => b[1].value - a[1].value)[0]; return top ? `Hecho verificable: ${top[0]} suma ${money(top[1].value)} confirmados en ${top[1].count} citas. Esto indica mayor valor confirmado, no rentabilidad: faltan costos atribuibles por servicio.` : 'No hay citas activas con servicio y valor suficientes para determinarlo.'; }
    if (/michelle|comercial|seguimiento/.test(q)) return `Gestión Comercial: ${metrics.opportunities.length} oportunidades del mes, ${metrics.overdueFollowUps.length} seguimientos vencidos y ${metrics.michelleDirect} captaciones cerradas atribuidas explícitamente a Michelle. No se atribuyen canales espontáneos automáticamente.`;
    if (/(ma[nñ]ana|accion|acciones|recomienda)/.test(q)) {
      const actions = metrics.alerts.slice(0, 3).map(item => item.action);
      return actions.length ? `Acciones recomendadas basadas en evidencia: ${actions.join(' ')}` : 'No hay alertas con evidencia suficiente para proponer una acción prioritaria. Revisa que Agenda, Pagos y Gestión Comercial estén actualizados.';
    }
    if (/natalia|equipo|profesional/.test(q)) return 'La productividad por profesional se muestra con citas y valores confirmados. Si falta el profesional asignado en la agenda, el sistema lo señalará como “Sin asignar” en lugar de inferirlo.';
    if (/horario|ocupaci|agenda/.test(q)) { const low = Object.entries(metrics.byHour).sort((a,b)=>a[1]-b[1]).slice(0,3); return metrics.occupancy === null ? 'No puedo calcular ocupación fiable: la jornada de sede no está disponible. Sí puedo mostrar la distribución observada por hora: ' + (low.map(x=>`${x[0]}:00 (${x[1]} cita${x[1]===1?'':'s'})`).join(', ') || 'sin citas con hora registrada.') : `Datos confirmados: ocupación de camillas ${metrics.occupancy}% en ${metrics.month}. Franjas con menor volumen observado: ${low.map(x=>`${x[0]}:00 (${x[1]})`).join(', ') || 'sin datos horarios suficientes.'}`; }
    return 'No tengo evidencia suficiente para responderlo con seguridad. Prueba con ingresos cobrados, meta, servicio, agenda, Michelle o seguimientos.';
  }

  const $ = id => document.getElementById(id);
  function selectedMonth() { return $('biMonth')?.value || currentMonth(); }
  const stat = (label, value, note, color = '#0f766e') => `<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};border-radius:12px;padding:13px"><div style="font-size:.72rem;color:var(--muted)">${esc(label)}</div><b style="display:block;font-size:1.15rem;color:${color};margin-top:3px">${esc(value)}</b><div style="font-size:.69rem;color:var(--muted);margin-top:4px">${esc(note || '')}</div></div>`;
  function tableRows(object, formatter) { const entries = Object.entries(object).sort((a, b) => b[1].value - a[1].value); return entries.length ? entries.slice(0, 8).map(formatter).join('') : '<div style="font-size:.82rem;color:var(--muted);padding:10px 0">Sin datos suficientes para este período.</div>'; }
  async function render(month = selectedMonth()) {
    const root = $('businessIntelligenceContent'); if (!root) return;
    if (!canAccess()) { root.innerHTML = '<div class="notice notice-warn">Este módulo contiene información financiera y está restringido a administración y dirección.</div>'; return; }
    root.innerHTML = '<div class="notice">Actualizando datos operativos y comerciales…</div>';
    try { await global.PanelPayments?.loadOperationsData?.(); } catch (_) {}
    const metrics = compute(undefined, month); global.__businessIntelligenceMetrics = metrics;
    const unavailable = Object.entries(metrics.dataStatus).filter(([, value]) => value === 'unavailable').map(([key]) => key);
    if (unavailable.length) {
      root.innerHTML = `<div class="notice notice-warn"><b>No se pudieron recuperar todas las fuentes de ${esc(month)}.</b> No se muestran ceros como resultado financiero. Fuentes no disponibles: ${esc(unavailable.join(', '))}. Reintenta la carga o revisa la sesión administrativa.</div>`;
      return;
    }
    const alerts = metrics.alerts.length ? metrics.alerts.map(item => `<article style="border-left:4px solid ${item.priority === 'Alta' ? '#dc2626' : '#d97706'};background:var(--s2);border-radius:9px;padding:11px 12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(item.title)}</b><span style="font-size:.72rem;color:${item.priority === 'Alta' ? '#b91c1c' : '#b45309'}">${esc(item.priority)}</span></div><div style="font-size:.78rem;margin-top:5px">${esc(item.evidence)}</div><div style="font-size:.78rem;color:var(--muted);margin-top:4px"><b>Acción:</b> ${esc(item.action)}</div></article>`).join('') : '<div class="notice">No hay alertas con evidencia suficiente en este momento.</div>';
    root.innerHTML = `
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:13px">Período: ${esc(metrics.month)} · datos agregados de Agenda, Pagos, Finanzas y Gestión Comercial. Los pagos aprobados son la única fuente de “cobrado”. ${metrics.unclassifiedServices.length ? `Hay ${metrics.unclassifiedServices.length} servicio(s) sin duración/recurso clasificado; no se incluyen en ocupación de camillas.` : ''}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px">
        ${stat('Ingresos cobrados', metrics.cashReceived === null ? 'No disponible' : money(metrics.cashReceived), `${metrics.source.payments} pagos aprobados`, '#047857')}
        ${stat('Servicios confirmados', money(metrics.confirmedValue), `${metrics.confirmedAppointments} citas activas`, '#2563eb')}
        ${stat('Cuentas por cobrar', metrics.accountsReceivable === null ? 'No disponible' : money(metrics.accountsReceivable), 'solo citas con valor explícito', '#b45309')}
        ${stat('Resultado operativo', metrics.operatingResult === null ? 'No disponible' : money(metrics.operatingResult), `gastos registrados: ${money(metrics.expenses)}`, metrics.operatingResult === null || metrics.operatingResult >= 0 ? '#047857' : '#b91c1c')}
        ${stat('Ticket promedio', money(metrics.ticket), `meta: ${money(metrics.setts.ticketTarget)}`, '#7c3aed')}
        ${stat('Cancelaciones', metrics.cancelledAppointments + ' (' + metrics.cancellationRate + '%)', `${metrics.appointments} citas · reprogramadas: ${metrics.rescheduledAppointments} · ausencias: ${metrics.noShowAppointments}`, metrics.cancellationRate >= 12 ? '#b91c1c' : '#047857')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:16px">
        <section class="card"><div class="card-title">🎯 Metas y proyección</div><div style="font-size:.85rem;line-height:1.9"><div>Cobrado: <b>${money(metrics.cashReceived)}</b> / ${money(metrics.setts.revenueTarget)} (${pct(metrics.cashReceived, metrics.setts.revenueTarget)}%)</div><div>Confirmado: <b>${money(metrics.confirmedValue)}</b> / ${money(metrics.setts.confirmedTarget)} (${pct(metrics.confirmedValue, metrics.setts.confirmedTarget)}%)</div><div>Proyección de cobro: <b>${money(metrics.projectedCash)}</b> <span style="color:var(--muted)">${metrics.daysRemaining ? '(ritmo diario actual; estimación)' : '(período cerrado o sin días restantes)'}</span></div><div>Ocupación de camillas: <b>${metrics.occupancy === null ? 'No calculable' : metrics.occupancy + '%'}</b> <span style="color:var(--muted)">${metrics.occupancy === null ? 'falta jornada semanal guardada' : 'capacidad de sede: jornada configurada × dos camillas'}</span></div><div>Uso clasificado: <b>${metrics.resourceMinutes.camilla} min camillas</b> · ${metrics.resourceMinutes.training} min entrenamiento · ${metrics.resourceMinutes.unknown} sin clasificar</div>${metrics.comparison ? `<div style="border-top:1px solid var(--border);margin-top:8px;padding-top:8px">Vs. ${esc(metrics.comparison.month)}: cobrado <b>${signedMoney(metrics.comparison.cashReceived)}</b> · confirmado <b>${signedMoney(metrics.comparison.confirmedValue)}</b> · citas <b>${metrics.comparison.appointments >= 0 ? '+' : ''}${metrics.comparison.appointments}</b></div>` : ''}</div></section>
        <section class="card"><div class="card-title">⚠️ Alertas inteligentes</div>${alerts}</section>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:16px">
        <section class="card"><div class="card-title">Servicios confirmados</div>${tableRows(metrics.byService, ([name, value]) => `<div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding:8px 0;font-size:.82rem"><span>${esc(name)}</span><b>${money(value.value)} · ${value.count}</b></div>`)}</section>
        <section class="card"><div class="card-title">Productividad por profesional</div>${tableRows(metrics.byProfessional, ([name, value]) => `<div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding:8px 0;font-size:.82rem"><span>${esc(name)}</span><b>${value.attended}/${value.count} · ${money(value.value)}</b></div>`)}</section>
        <section class="card"><div class="card-title">Gestión Comercial</div><div style="font-size:.84rem;line-height:1.9"><div>Oportunidades del período: <b>${metrics.opportunities.length}</b></div><div>Seguimientos vencidos: <b>${metrics.overdueFollowUps.length}</b></div><div>Captaciones cerradas de Michelle: <b>${metrics.michelleDirect}</b></div><div>Valor comercial cerrado: <b>${money(metrics.commercialValue)}</b></div><p style="font-size:.74rem;color:var(--muted);margin-bottom:0">No representa comisión ni atribuye automáticamente Google, redes, web o referidos.</p></div></section>
      </div>`;
    root.innerHTML += `<section class="card" style="margin-top:14px"><div class="card-title">🔎 Conciliación financiera (solo lectura)</div><div style="font-size:.82rem;line-height:1.8">Operaciones: <b>${metrics.reconciliation.rows.length}</b> · Conciliadas: <b>${metrics.reconciliation.counts.Conciliado || 0}</b> · Pendientes: <b>${metrics.reconciliation.counts['Pendiente de relación'] || 0}</b> · Con diferencias: <b>${metrics.reconciliation.counts['Diferencia de valores'] || 0}</b> · Posibles pagos duplicados: <b>${metrics.reconciliation.duplicatePayments.length}</b> · Pagos sin relación: <b>${metrics.reconciliation.unmatchedPayments.length}</b></div><div style="font-size:.75rem;color:var(--muted);margin-top:5px">No cambia pagos, citas ni planes. Las diferencias requieren revisión administrativa.</div></section>`;
    renderChatHistory();
    renderReports();
  }
  function saveSettings() {
    const result = {}; Object.keys(DEFAULTS).forEach(key => { result[key] = num($('bi_' + key)?.value) || DEFAULTS[key]; });
    set(SETTINGS, result); audit('Metas empresariales actualizadas', 'Configuración de Inteligencia Empresarial'); render();
  }
  function openSettings() {
    const s = settings(), target = $('biSettings'); if (!target) return;
    target.style.display = target.style.display === 'none' ? 'block' : 'none';
    const fields = { revenueTarget:'Meta ingresos cobrados', confirmedTarget:'Meta servicios confirmados', confirmedMin:'Citas confirmadas mínima', confirmedGoal:'Citas confirmadas objetivo', occupancyMin:'Ocupación mínima (%)', occupancyGoal:'Ocupación objetivo (%)', michelleNewPatients:'Pacientes nuevos Michelle', ticketTarget:'Ticket promedio objetivo', ticketExcellent:'Ticket sobresaliente' };
    target.innerHTML = `<div class="card" style="margin-top:14px"><div class="card-title">Metas empresariales editables</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px">${Object.entries(fields).map(([key, label]) => `<label style="font-size:.78rem;font-weight:700;color:var(--muted)">${esc(label)}<input id="bi_${key}" type="number" min="0" value="${s[key]}" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--s2);color:var(--text)"></label>`).join('')}</div><button class="btn btn-teal" style="margin-top:12px" onclick="PanelBusinessIntelligence.saveSettings()">Guardar metas</button></div><div class="card" style="margin-top:14px"><div class="card-title">Catálogo de duración y recursos</div><p style="font-size:.78rem;color:var(--muted);margin-top:0">La ocupación de camillas sólo usa servicios marcados como “camilla”. Entrenamiento y servicios sin clasificar se muestran aparte.</p><div style="overflow:auto"><table style="width:100%;font-size:.8rem;border-collapse:collapse"><thead><tr><th style="text-align:left">Servicio</th><th>Minutos</th><th>Recurso</th><th>Unidades</th></tr></thead><tbody>${serviceCatalog().map((item, index) => `<tr><td><input data-bi-cat-name="${index}" value="${esc(item.name)}" style="width:100%;min-width:160px"></td><td><input data-bi-cat-minutes="${index}" type="number" min="15" max="300" value="${num(item.minutes)}" style="width:70px"></td><td><select data-bi-cat-resource="${index}"><option value="camilla" ${item.resource === 'camilla' ? 'selected' : ''}>Camilla</option><option value="training" ${item.resource === 'training' ? 'selected' : ''}>Entrenamiento</option></select></td><td><input data-bi-cat-units="${index}" type="number" min="1" max="4" value="${Math.max(1, num(item.units) || 1)}" style="width:55px"></td></tr>`).join('')}</tbody></table></div><button class="btn btn-teal" style="margin-top:12px" onclick="PanelBusinessIntelligence.saveCatalog()">Guardar catálogo</button></div>`;
  }
  function saveCatalog() {
    const rows = serviceCatalog().map((item, index) => ({
      name: String(document.querySelector(`[data-bi-cat-name="${index}"]`)?.value || '').trim(),
      minutes: num(document.querySelector(`[data-bi-cat-minutes="${index}"]`)?.value),
      resource: document.querySelector(`[data-bi-cat-resource="${index}"]`)?.value === 'training' ? 'training' : 'camilla',
      units: Math.max(1, Math.min(4, num(document.querySelector(`[data-bi-cat-units="${index}"]`)?.value) || 1))
    })).filter(item => item.name && item.minutes >= 15 && item.minutes <= 300);
    if (!rows.length) return;
    set(SERVICE_CATALOG, rows); audit('Catálogo de duración actualizado', `${rows.length} servicios clasificados`); render();
  }
  function createReport(kind) { const metrics = global.__businessIntelligenceMetrics || compute(); const item = report(kind, metrics); const reports = get(REPORTS, []); reports.unshift(item); set(REPORTS, reports.slice(0, 100)); audit('Informe generado', item.title); renderReports(); }
  function renderReports() { const el = $('biReports'); if (!el) return; const reports = get(REPORTS, []); el.innerHTML = reports.length ? reports.slice(0, 12).map(item => `<article style="padding:10px;border-top:1px solid var(--border);font-size:.8rem"><b>${esc(item.title)}</b> · ${new Date(item.createdAt).toLocaleString('es-CO')}<div style="color:var(--muted);margin-top:4px">${esc(item.summary?.[0] || '')}</div></article>`).join('') : '<div style="font-size:.8rem;color:var(--muted)">Aún no hay informes generados. La entrega automática requiere una integración de notificaciones configurada.</div>'; }
  function reportSchedule() { return { timezone:'America/Bogota', daily:'Lun–Vie 06:30', weekly:'Lunes 07:00', monthly:'Día 1 07:00', enabled:false, ...get(REPORT_SCHEDULE,{}) }; }
  function renderChatHistory() { const el = $('biChatHistory'); if (!el) return; const rows = get(CHAT_HISTORY, []); el.innerHTML = rows.length ? rows.slice(0,12).map(row => `<article style="border-top:1px solid var(--border);padding:9px 0;font-size:.8rem"><b>Tú:</b> ${esc(row.question)}<div style="margin-top:4px"><b>Analista:</b> ${esc(row.answer)}</div><small style="color:var(--muted)">Corte: ${esc(row.month)} · ${new Date(row.at).toLocaleString('es-CO',{timeZone:businessContext().timezone})}</small></article>`).join('') : '<div style="font-size:.8rem;color:var(--muted)">Aún no hay consultas. El chat sólo lee datos agregados autorizados.</div>'; }
  function ask(question) { const input = $('biQuestion'), output = $('biAnswer'); const asked = String(question || input?.value || '').trim(); if (!asked || !output) return; if (!canAccess()) { output.textContent = 'No tienes permiso para consultar Inteligencia Empresarial.'; return; } const metrics = global.__businessIntelligenceMetrics || compute(); const response = answer(asked, metrics); const final = `Periodo ${metrics.month}. ${response}`; output.innerHTML = `<b>Datos confirmados y análisis:</b> ${esc(final)}`; const rows = get(CHAT_HISTORY, []); rows.unshift({ question:asked, answer:final, month:metrics.month, at:new Date().toISOString() }); set(CHAT_HISTORY, rows.slice(0,50)); audit('Consulta gerencial de solo lectura', asked.slice(0,300)); renderChatHistory(); }
  function init() { const input = $('biMonth'); if (input && !input.value) input.value = currentMonth(); render(); }

  const api = Object.freeze({ init, render, compute, reconcile, scenarios, report, reportSchedule, answer, saveSettings, openSettings, saveCatalog, createReport, renderReports, renderChatHistory, ask, defaults: DEFAULTS, defaultServiceCatalog: DEFAULT_SERVICE_CATALOG, defaultContext: DEFAULT_CONTEXT });
  global.PanelBusinessIntelligence = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = { compute, reconcile, scenarios, buildAlerts, report, answer, source, DEFAULTS, DEFAULT_SERVICE_CATALOG };
})(typeof window !== 'undefined' ? window : globalThis);
