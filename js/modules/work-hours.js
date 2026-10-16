/* Horarios semanales del equipo: administración y portal clínico. */
(function (global) {
  'use strict';
  const DAYS = [['lunes','Lunes'],['martes','Martes'],['miercoles','Miércoles'],['jueves','Jueves'],['viernes','Viernes'],['sabado','Sábado'],['domingo','Domingo']];
  let current = null;

  function monday(value) {
    const d = value ? new Date(`${value}T12:00:00`) : new Date();
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    return d.toISOString().slice(0, 10);
  }
  function safe(value) { return global.esc ? global.esc(value || '') : String(value || ''); }
  function toast(message, type) { global.toast?.(message, type); }

  global.renderProfessionalWorkSchedule = function (schedule) {
    global.professionalWorkSchedule = schedule || null;
    const el = document.getElementById('proWorkSchedule');
    const label = document.getElementById('proWorkWeekLabel');
    if (!el) return;
    if (label) label.textContent = schedule?.semanaInicio ? `Semana del ${global.fmtDate ? global.fmtDate(schedule.semanaInicio) : schedule.semanaInicio}` : 'Semana actual';
    if (!schedule) { el.innerHTML = '<div class="team-muted">Aún no hay un horario registrado para esta semana.</div>'; return; }
    const rows = DAYS.filter(([key]) => String(schedule[key] || '').trim());
    el.innerHTML = rows.length ? rows.map(([key, name]) => `<div class="team-ops-row"><strong>${name}</strong><span>${safe(schedule[key])}</span></div>`).join('') : '<div class="team-muted">No tienes horas asignadas para esta semana.</div>';
  };

  global.renderTeamWorkHours = async function (force) {
    const professional = document.getElementById('workHoursProfessional');
    const week = document.getElementById('workHoursWeek');
    const fields = document.getElementById('workHoursFields');
    if (!professional || !week || !fields) return;
    const ctx = global.PanelWorkHoursContext;
    if (!ctx) return;
    if (!ctx.teamData()?.profesionales?.length || force) await ctx.loadTeamData();
    const active = (ctx.teamData()?.profesionales || []).filter(p => p.estado === 'Activo');
    const remembered = professional.value;
    professional.innerHTML = `<option value="">Selecciona un colaborador</option>${active.map(p => `<option value="${safe(p.id)}">${safe(p.nombre)} · ${safe(p.rol || 'Colaborador')}</option>`).join('')}`;
    professional.value = active.some(p => p.id === remembered) ? remembered : (active[0]?.id || '');
    if (!week.value) week.value = monday();
    week.value = monday(week.value);
    current = null;
    if (professional.value) {
      try {
        const r = await fetch(`${ctx.apiUrl()}?action=getTeamWorkSchedule&token=${encodeURIComponent(ctx.token())}&professionalId=${encodeURIComponent(professional.value)}&week=${encodeURIComponent(week.value)}`).then(x => x.json());
        if (!r.ok) throw new Error(r.error || 'No se pudo consultar el horario');
        current = r.item || null;
      } catch (error) { toast(error.message, 'err'); }
    }
    fields.innerHTML = DAYS.map(([key, name]) => `<div><label for="workHour_${key}">${name}</label><input id="workHour_${key}" maxlength="120" placeholder="Ej.: 8:00 a. m.–12:00 m. · 2:00–6:00 p. m." value="${safe(current?.[key] || '')}"></div>`).join('');
  };

  global.saveTeamWorkHours = async function () {
    const ctx = global.PanelWorkHoursContext;
    if (!ctx) return;
    const professionalId = document.getElementById('workHoursProfessional')?.value || '';
    const semanaInicio = monday(document.getElementById('workHoursWeek')?.value);
    const values = {};
    DAYS.forEach(([key]) => values[key] = (document.getElementById(`workHour_${key}`)?.value || '').trim());
    if (!professionalId) return toast('Selecciona un colaborador', 'err');
    if (!Object.values(values).some(Boolean)) return toast('Escribe al menos un horario de trabajo', 'err');
    try {
      const data = encodeURIComponent(JSON.stringify({ professionalId, semanaInicio, ...values }));
      const r = await fetch(`${ctx.apiUrl()}?action=saveTeamWorkSchedule&token=${encodeURIComponent(ctx.token())}&data=${data}`).then(x => x.json());
      if (!r.ok) throw new Error(r.error || 'No se pudo guardar');
      current = r.item;
      toast('Horario semanal guardado. El colaborador ya puede verlo.');
    } catch (error) { toast(error.message, 'err'); }
  };
})(window);
