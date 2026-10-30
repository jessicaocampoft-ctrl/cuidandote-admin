/* Cuidándote Fisioterapia — entrenamiento funcional grupal. */
(function (global) {
  'use strict';

  const KEY = 'functional_training_v1';
  // Respaldo local independiente: evita que una lectura lenta de la base
  // sustituya una inscripción recién creada antes de que termine la sincronización.
  const BACKUP_KEY = 'functional_training_v1_backup';
  const CAPACITY = 4;
  const TIMES = ['05:00', '06:00', '07:00', '08:00'];
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  const PLANS = {
    courtesy: { name: 'Cortesía', days: 0, price: 0, classes: 3 },
    plan3: { name: 'Plan 3X', days: 3, price: 185000 },
    plan4: { name: 'Plan 4X', days: 4, price: 215000 },
    plan5: { name: 'Plan 5X', days: 5, price: 240000 }
  };

  const byId = id => document.getElementById(id);
  const peso = value => `$${Number(value || 0).toLocaleString('es-CO')}`;
  const notify = (message, type) => typeof global.toast === 'function' ? global.toast(message, type) : alert(message);
  const esc = value => String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const dateKey = date => {
    const d = date instanceof Date ? date : new Date(`${date}T12:00:00`);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const todayKey = () => dateKey(new Date());
  const addDays = (date, days) => {
    const d = date instanceof Date ? new Date(date) : new Date(`${date}T12:00:00`);
    d.setDate(d.getDate() + days);
    return d;
  };
  const monday = value => {
    const d = value ? new Date(`${value}T12:00:00`) : new Date();
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    return dateKey(d);
  };
  const shortDate = value => new Date(`${value}T12:00:00`).toLocaleDateString('es-CO', { day:'numeric', month:'short' });
  const uid = prefix => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

  function normalizeState(value) {
    const parsed = value && typeof value === 'object' ? value : {};
    return {
      members: Array.isArray(parsed.members) ? parsed.members : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      payments: Array.isArray(parsed.payments) ? parsed.payments : [],
      updatedAt: String(parsed.updatedAt || '')
    };
  }

  function stateScore(state) {
    const timestamp = Date.parse(state.updatedAt || '') || 0;
    // Para datos antiguos sin sello de tiempo, conservar la versión que
    // contenga más registros antes que reemplazarla por una respuesta vacía.
    const records = state.members.length * 1000 + state.bookings.length * 10 + state.payments.length;
    return timestamp ? timestamp + records / 1000000 : records;
  }

  function parseState(raw) {
    try { return normalizeState(JSON.parse(raw || '{}')); } catch (error) { return normalizeState({}); }
  }

  function read() {
    const primary = parseState(typeof global.kvGet === 'function' ? global.kvGet(KEY) : localStorage.getItem(KEY));
    const backup = parseState(localStorage.getItem(BACKUP_KEY));
    return stateScore(backup) > stateScore(primary) ? backup : primary;
  }

  function write(data) {
    const next = normalizeState({ ...data, updatedAt:new Date().toISOString() });
    const serialized = JSON.stringify(next);
    // Se guarda primero en el respaldo local, de modo que el registro siga
    // disponible incluso si el servidor tarda o se cierra el navegador.
    localStorage.setItem(BACKUP_KEY, serialized);
    if (typeof global.kvSet === 'function') {
      global.kvSet(KEY, serialized);
      // También se solicita la sincronización inmediata con la base.
      global.PanelStorage?._flushKV?.().catch(() => null);
    } else localStorage.setItem(KEY, serialized);
  }

  function planFor(member) { return PLANS[member.plan] || PLANS.courtesy; }
  function isActiveBooking(booking) { return booking.status !== 'cancelled'; }
  function remainingCourtesy(member, data) {
    return Math.max(0, 3 - data.bookings.filter(b => b.memberId === member.id && isActiveBooking(b)).length);
  }
  function membershipCurrent(member) {
    return member.plan === 'courtesy' || String(member.renewsAt || '') >= todayKey();
  }
  function isBookable(member, data) {
    return !!member && member.active !== false && membershipCurrent(member) && (member.plan !== 'courtesy' || remainingCourtesy(member, data) > 0);
  }
  function weekBookings(memberId, date, data) {
    const start = monday(date);
    const end = dateKey(addDays(start, 4));
    return data.bookings.filter(b => b.memberId === memberId && isActiveBooking(b) && b.date >= start && b.date <= end);
  }
  function canUseWeeklyAllowance(member, date, data) {
    const plan = planFor(member);
    return member.plan === 'courtesy' || weekBookings(member.id, date, data).length < plan.days;
  }
  function capacityAt(date, time, data) {
    return data.bookings.filter(b => b.date === date && b.time === time && isActiveBooking(b)).length;
  }
  function activeMembers(data) { return data.members.filter(member => isBookable(member, data)); }
  function setText(id, value) { const el = byId(id); if (el) el.textContent = value; }

  function updateEnrollmentPreview() {
    const plan = PLANS[byId('ftMemberPlan')?.value] || PLANS.courtesy;
    const start = byId('ftMemberStart')?.value || todayKey();
    const el = byId('ftEnrollmentPreview');
    if (!el) return;
    el.textContent = plan.price
      ? `${plan.name}: ${plan.days} días por semana · ${peso(plan.price)} · renovación el ${shortDate(dateKey(addDays(start, 30)))}`
      : 'Cortesía: 3 clases sin costo. Se descuenta una clase al reservarla.';
  }

  function saveMember() {
    const name = byId('ftMemberName')?.value.trim();
    const phone = byId('ftMemberPhone')?.value.trim() || '';
    const planId = byId('ftMemberPlan')?.value || 'courtesy';
    const start = byId('ftMemberStart')?.value || todayKey();
    if (!name) { notify('Escribe el nombre de la persona', 'err'); return; }
    const data = read();
    const plan = PLANS[planId];
    const member = { id:uid('ftm'), name, phone, plan:planId, startedAt:start, renewsAt:plan.price ? dateKey(addDays(start, 30)) : '', active:true, createdAt:new Date().toISOString() };
    data.members.push(member);
    if (plan.price) data.payments.push({ id:uid('ftp'), memberId:member.id, date:start, amount:plan.price, concept:`${plan.name} · inscripción` });
    write(data);
    ['ftMemberName','ftMemberPhone'].forEach(id => { if (byId(id)) byId(id).value = ''; });
    if (byId('ftMemberPlan')) byId('ftMemberPlan').value = 'courtesy';
    if (byId('ftMemberStart')) byId('ftMemberStart').value = todayKey();
    render();
    notify(plan.price ? `${plan.name} registrada y pago incluido` : 'Cortesía de 3 clases registrada');
  }

  function reserveClass() {
    const memberId = byId('ftBookingMember')?.value;
    const date = byId('ftBookingDate')?.value;
    const time = byId('ftBookingTime')?.value;
    const data = read();
    const member = data.members.find(m => m.id === memberId);
    if (!member || !date || !time) { notify('Selecciona participante, fecha y hora', 'err'); return; }
    const weekday = new Date(`${date}T12:00:00`).getDay();
    if (weekday === 0 || weekday === 6 || !TIMES.includes(time)) { notify('Las clases son de lunes a viernes entre 5:00 y 9:00 a. m.', 'err'); return; }
    if (!isBookable(member, data)) { notify(member.plan === 'courtesy' ? 'Esta persona ya usó sus 3 clases de cortesía' : 'La membresía está vencida; renuévala antes de reservar', 'err'); return; }
    if (!canUseWeeklyAllowance(member, date, data)) { notify(`${planFor(member).name}: ya tiene sus ${planFor(member).days} días reservados esta semana`, 'err'); return; }
    if (capacityAt(date, time, data) >= CAPACITY) { notify('Este horario ya completó sus 4 cupos', 'err'); return; }
    if (data.bookings.some(b => b.memberId === member.id && b.date === date && b.time === time && isActiveBooking(b))) { notify('Esta persona ya tiene esa clase reservada', 'err'); return; }
    data.bookings.push({ id:uid('ftb'), memberId, date, time, status:'reserved', createdAt:new Date().toISOString() });
    write(data); render(); notify(`Clase reservada para ${member.name}`);
  }

  function setSlot(date, time) {
    if (byId('ftBookingDate')) byId('ftBookingDate').value = date;
    if (byId('ftBookingTime')) byId('ftBookingTime').value = time;
    byId('ftBookingMember')?.focus();
  }

  function changeBooking(id, status) {
    const data = read();
    const booking = data.bookings.find(b => b.id === id);
    if (!booking) return;
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    write(data); render();
    notify(status === 'attended' ? 'Asistencia registrada' : 'Reserva cancelada y cupo liberado');
  }

  function renew(id) {
    const data = read();
    const member = data.members.find(m => m.id === id);
    if (!member || member.plan === 'courtesy') return;
    const plan = planFor(member);
    const start = todayKey();
    member.startedAt = start;
    member.renewsAt = dateKey(addDays(start, 30));
    member.active = true;
    data.payments.push({ id:uid('ftp'), memberId:member.id, date:start, amount:plan.price, concept:`${plan.name} · renovación` });
    write(data); render(); notify(`Renovación de ${member.name} registrada`);
  }

  function toggleMember(id) {
    const data = read(); const member = data.members.find(m => m.id === id); if (!member) return;
    member.active = member.active === false;
    write(data); render();
  }

  function fmtStatus(status) { return status === 'attended' ? 'Asistió' : status === 'cancelled' ? 'Canceló' : 'Reservada'; }
  function statusColor(status) { return status === 'attended' ? '#059669' : status === 'cancelled' ? '#dc2626' : '#2563eb'; }

  function render() {
    const root = byId('vEntrenamiento'); if (!root) return;
    const data = read();
    const weekInput = byId('ftWeekStart');
    if (weekInput && !weekInput.value) weekInput.value = monday();
    const weekStart = monday(weekInput?.value || todayKey());
    if (weekInput) weekInput.value = weekStart;
    if (byId('ftMemberStart') && !byId('ftMemberStart').value) byId('ftMemberStart').value = todayKey();
    if (byId('ftBookingDate') && !byId('ftBookingDate').value) byId('ftBookingDate').value = weekStart;
    updateEnrollmentPreview();

    const members = activeMembers(data);
    const weekEnd = dateKey(addDays(weekStart, 4));
    const currentMonth = todayKey().slice(0, 7);
    const weekActive = data.bookings.filter(b => isActiveBooking(b) && b.date >= weekStart && b.date <= weekEnd);
    setText('ftActiveMembers', members.length);
    setText('ftCourtesyLeft', data.members.filter(m => m.plan === 'courtesy').reduce((sum, m) => sum + remainingCourtesy(m, data), 0));
    setText('ftWeekBooked', `${weekActive.length}/80`);
    setText('ftMonthRevenue', peso(data.payments.filter(p => String(p.date).startsWith(currentMonth)).reduce((sum, p) => sum + Number(p.amount || 0), 0)));

    const plansSummary = byId('ftPlansSummary');
    if (plansSummary) plansSummary.innerHTML = ['plan3','plan4','plan5'].map(id => {
      const plan = PLANS[id]; const count = data.members.filter(m => m.plan === id && membershipCurrent(m) && m.active !== false).length;
      return `<div style="padding:12px;border:1px solid var(--border);border-radius:10px;background:var(--s2)"><strong>${plan.name}</strong><div style="font-size:.82rem;color:var(--muted);margin-top:3px">${plan.days} días/semana · ${peso(plan.price)}</div><div style="font-size:.8rem;color:var(--primary);margin-top:7px">${count} activo${count === 1 ? '' : 's'} · ${peso(count * plan.price)}/mes</div></div>`;
    }).join('');

    const selector = byId('ftBookingMember');
    const selected = selector?.value;
    if (selector) selector.innerHTML = members.length ? `<option value="">Selecciona una persona</option>${members.map(m => `<option value="${m.id}">${esc(m.name)} · ${planFor(m).name}${m.plan === 'courtesy' ? ` (${remainingCourtesy(m, data)} clases)` : ''}</option>`).join('')}` : '<option value="">No hay miembros disponibles</option>';
    if (selector && members.some(m => m.id === selected)) selector.value = selected;

    const grid = byId('ftScheduleGrid');
    if (grid) {
      const dates = Array.from({ length:5 }, (_, index) => dateKey(addDays(weekStart, index)));
      grid.innerHTML = `<div style="overflow:auto"><div style="min-width:650px;display:grid;grid-template-columns:82px repeat(5,1fr);border:1px solid var(--border);border-radius:10px;overflow:hidden">` +
        `<div style="padding:10px;background:var(--s2);font-size:.75rem;color:var(--muted)">Hora</div>${dates.map((date, i) => `<div style="padding:10px;background:var(--s2);font-size:.78rem;font-weight:700;border-left:1px solid var(--border)">${WEEKDAYS[i]}<br><span style="font-weight:400;color:var(--muted)">${shortDate(date)}</span></div>`).join('')}` +
        TIMES.map(time => `<div style="padding:12px 10px;border-top:1px solid var(--border);font-family:var(--font-m);font-size:.78rem">${time}</div>${dates.map(date => { const count = capacityAt(date, time, data); const full = count >= CAPACITY; return `<button type="button" onclick="PanelFunctionalTraining.setSlot('${date}','${time}')" style="text-align:left;border:0;border-left:1px solid var(--border);border-top:1px solid var(--border);padding:10px;background:${full ? 'rgba(239,68,68,.07)' : 'transparent'};cursor:pointer;color:var(--text)"><strong style="color:${full ? '#dc2626' : '#0f766e'}">${count}/${CAPACITY}</strong><span style="font-size:.72rem;color:var(--muted);display:block;margin-top:2px">${full ? 'Completo' : 'Elegir cupo'}</span></button>`; }).join('')}`).join('') +
        `</div></div>`;
    }

    const bookingList = byId('ftBookingsList');
    const sortedBookings = [...data.bookings].filter(b => b.date >= weekStart && b.date <= weekEnd).sort((a,b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
    if (bookingList) bookingList.innerHTML = sortedBookings.length ? sortedBookings.map(b => {
      const member = data.members.find(m => m.id === b.memberId); return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);flex-wrap:wrap"><div style="min-width:112px;font-family:var(--font-m);font-size:.78rem">${shortDate(b.date)} · ${b.time}</div><div style="flex:1;font-weight:700">${esc(member?.name || 'Participante eliminado')}<div style="font-size:.75rem;font-weight:400;color:var(--muted)">${member ? planFor(member).name : ''}</div></div><span style="font-size:.75rem;color:${statusColor(b.status)};font-weight:700">${fmtStatus(b.status)}</span>${b.status === 'reserved' ? `<button class="btn btn-teal btn-sm" onclick="PanelFunctionalTraining.changeBooking('${b.id}','attended')">✓ Asistió</button><button class="btn btn-ghost btn-sm" onclick="PanelFunctionalTraining.changeBooking('${b.id}','cancelled')">Cancelar</button>` : ''}</div>`;
    }).join('') : '<div class="empty" style="padding:20px 0"><p>No hay clases reservadas para esta semana.</p></div>';

    const memberList = byId('ftMembersList');
    if (memberList) memberList.innerHTML = data.members.length ? [...data.members].sort((a,b) => a.name.localeCompare(b.name)).map(m => {
      const plan = planFor(m); const courtesy = m.plan === 'courtesy'; const remaining = courtesy ? remainingCourtesy(m, data) : null; const current = membershipCurrent(m); const disabled = m.active === false;
      return `<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);flex-wrap:wrap;opacity:${disabled ? '.55' : '1'}"><div style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:rgba(20,184,166,.14);color:var(--primary);font-weight:800">${esc(m.name.slice(0,1).toUpperCase())}</div><div style="flex:1;min-width:180px"><strong>${esc(m.name)}</strong><div style="font-size:.78rem;color:var(--muted)">${plan.name}${courtesy ? ` · ${remaining} clases disponibles` : ` · ${plan.days} días/semana · vence ${shortDate(m.renewsAt)}`}</div></div><div style="font-size:.78rem;color:${current ? '#059669' : '#d97706'};font-weight:700">${disabled ? 'Inactivo' : current ? 'Activo' : 'Por renovar'}</div>${!courtesy ? `<button class="btn btn-teal btn-sm" onclick="PanelFunctionalTraining.renew('${m.id}')">Renovar ${peso(plan.price)}</button>` : ''}<button class="btn btn-ghost btn-sm" onclick="PanelFunctionalTraining.toggleMember('${m.id}')">${disabled ? 'Activar' : 'Pausar'}</button></div>`;
    }).join('') : '<div class="empty" style="padding:20px 0"><p>Aún no hay personas inscritas.</p></div>';
  }

  function focusNewMember() { byId('ftNewMemberCard')?.scrollIntoView({ behavior:'smooth', block:'center' }); setTimeout(() => byId('ftMemberName')?.focus(), 350); }
  function getFinanceSummary() {
    const data = read(); const month = todayKey().slice(0, 7);
    return { collected: data.payments.filter(p => String(p.date).startsWith(month)).reduce((sum,p) => sum + Number(p.amount || 0), 0), activeMrr: data.members.filter(m => m.plan !== 'courtesy' && isBookable(m, data)).reduce((sum,m) => sum + planFor(m).price, 0), members:activeMembers(data).length };
  }

  function getMonthlyRevenue(month, year) {
    const data = read();
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const currentKey = todayKey().slice(0, 7);
    return data.payments
      .filter(payment => String(payment.date || '').startsWith(key) && (key !== currentKey || String(payment.date) <= todayKey()))
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  }

  function renderFinanceCard() {
    const finance = byId('vFinanzas');
    if (!finance) return;
    let card = byId('ftFinanceCard');
    if (!card) {
      card = document.createElement('div');
      card.id = 'ftFinanceCard';
      card.className = 'card';
      card.style.marginBottom = '20px';
      const header = finance.querySelector('.page-header');
      if (header) header.insertAdjacentElement('afterend', card);
      else finance.prepend(card);
    }
    const summary = getFinanceSummary();
    card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap"><div><div class="card-title" style="margin-bottom:3px">🏋️ Entrenamiento funcional</div><div style="font-size:.8rem;color:var(--muted)">Ingreso separado de las citas individuales; se registra al inscribir o renovar una membresía.</div></div><button class="btn btn-ghost btn-sm" type="button" onclick="showView('entrenamiento')">Administrar entrenamiento</button></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-top:14px"><div style="padding:11px;border:1px solid var(--border);border-radius:10px;background:var(--s2)"><div style="font-size:.75rem;color:var(--muted)">Recibido este mes</div><strong style="display:block;margin-top:4px;color:var(--primary);font-size:1.15rem">${peso(summary.collected)}</strong></div><div style="padding:11px;border:1px solid var(--border);border-radius:10px;background:var(--s2)"><div style="font-size:.75rem;color:var(--muted)">Recurrente activo</div><strong style="display:block;margin-top:4px;font-size:1.15rem">${peso(summary.activeMrr)}/mes</strong></div><div style="padding:11px;border:1px solid var(--border);border-radius:10px;background:var(--s2)"><div style="font-size:.75rem;color:var(--muted)">Participantes activos</div><strong style="display:block;margin-top:4px;font-size:1.15rem">${summary.members}</strong></div></div>`;
  }

  global.renderEntrenamientoFuncional = render;
  global.guardarMiembroEntrenamiento = saveMember;
  global.reservarClaseEntrenamiento = reserveClass;
  global.PanelFunctionalTraining = Object.freeze({ render, focusNewMember, updateEnrollmentPreview, setSlot, changeBooking, renew, toggleMember, getFinanceSummary, getMonthlyRevenue, renderFinanceCard });
})(typeof window !== 'undefined' ? window : globalThis);
