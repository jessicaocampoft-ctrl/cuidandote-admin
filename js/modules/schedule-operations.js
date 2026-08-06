/* Cuidándote Fisioterapia — PanelScheduleOperations. */
(function (global) {
'use strict';



function renderBloqueos() {
  const bl = document.getElementById('blockList');
  if (!allData.bloqueos.length) {
    bl.innerHTML = '<div class="empty"><p>No hay bloqueos activos</p></div>';
    return;
  }
  bl.innerHTML = allData.bloqueos.map((b) => `
    <div class="block-item">
      <div class="block-info">
        <div class="block-date">${fmtDate(b.fecha)} · ${b.inicio} — ${b.fin}</div>
        <div class="block-reason">${esc(b.motivo||'Sin motivo')}</div>
      </div>
      <button class="btn btn-err btn-sm" onclick="doUnblock('${b.bid||''}','${b.fecha}','${b.inicio}')">Eliminar</button>
    </div>`).join('');
}

async function doBlock() {
  const date  = document.getElementById('blDate').value;
  const start = document.getElementById('blStart').value;
  const end   = document.getElementById('blEnd').value;
  const reason= document.getElementById('blReason').value;
  if (!date||!start||!end) { toast('Completa fecha, hora inicio y fin','err'); return; }
  if (start >= end) { toast('La hora de fin debe ser mayor al inicio','err'); return; }
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=block&token=${encodeURIComponent(TOKEN)}&date=${date}&startTime=${start}&endTime=${end}&reason=${encodeURIComponent(reason||'Bloqueado')}`);
    const d = await r.json();
    if (d.ok) {
      allData.bloqueos.push({bid: d.bid||'', fecha:date, inicio:start, fin:end, motivo:reason||'Bloqueado'});
      toast('Horario bloqueado correctamente');
      renderBloqueos();
      document.getElementById('blDate').value = '';
      document.getElementById('blReason').value = '';
    } else toast('Error al bloquear', 'err');
  } catch(e) { toast('Error de conexión','err'); }
}

async function doUnblock(bid, date, startTime) {
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=unblock&token=${encodeURIComponent(TOKEN)}&bid=${encodeURIComponent(bid)}&date=${date}&startTime=${startTime}`);
    const d = await r.json();
    if (d.ok) {
      allData.bloqueos = allData.bloqueos.filter(b => bid ? b.bid !== bid : !(b.fecha===date && b.inicio===startTime));
      toast('Bloqueo eliminado');
      renderBloqueos();
    } else toast('Error al eliminar: ' + (d.error||''), 'err');
  } catch(e) { toast('Error de conexión','err'); }
}

function toggleRecurringPanel() {
  // Mantenida por compatibilidad — el nuevo sistema usa switchScheduleMode
}

function switchScheduleMode(mode) {
  _scheduleMode = mode;
  ['unica','multiple','recurrente'].forEach(m => {
    const tab   = document.getElementById('schedTab-' + m);
    const panel = document.getElementById('schedPanel-' + m);
    if (tab)   tab.classList.toggle('active', m === mode);
    if (panel) panel.style.display = m === mode ? '' : 'none';
  });
  _updateSubmitLabel();
}

function _updateSubmitLabel() {
  const lbl  = document.getElementById('ncSubmitLabel');
  const hint = document.getElementById('ncSubmitHint');
  if (_scheduleMode === 'unica') {
    lbl.textContent  = 'Crear cita';
    hint.textContent = '';
  } else if (_scheduleMode === 'multiple') {
    const n = _multiDates.length;
    lbl.textContent  = n > 0 ? `Crear ${n} cita${n>1?'s':''}` : 'Crear citas';
    hint.textContent = n > 0 ? `Se crearán ${n} cita${n>1?'s':''}` : 'Agrega fechas arriba';
  } else {
    const n = parseInt(document.getElementById('recCantidad')?.value) || 0;
    lbl.textContent  = n > 0 ? `Crear ${n} cita${n>1?'s':''}` : 'Crear citas';
    hint.textContent = n > 0 ? `Se crearán ${n} citas recurrentes` : '';
  }
}

function isMidnightTime(time) {
  return /^00:[0-5]\d$/.test(String(time || '').trim());
}

function timeHumanLabel(time) {
  const t = String(time || '').trim();
  if (!t) return '';
  if (t === '12:00') return '12:00 del mediodía';
  if (isMidnightTime(t)) return `${t} de medianoche`;
  const [hh, mm] = t.split(':').map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return t;
  if (hh < 12) return `${t} de la mañana`;
  if (hh === 12) return `${t} del mediodía`;
  return `${t} de la tarde`;
}

function updateTimeHelp(inputId, helpId) {
  const input = document.getElementById(inputId);
  const help  = document.getElementById(helpId);
  if (!input || !help) return true;
  const time = input.value;
  help.classList.remove('ok','warn');
  if (!time) {
    help.innerHTML = 'Tip: 12 del mediodía es <strong>12:00</strong>. La franja <strong>00:00–00:59</strong> es medianoche y no se guardará.';
    return true;
  }
  if (isMidnightTime(time)) {
    help.classList.add('warn');
    help.innerHTML = '⚠️ <strong>Esta hora es medianoche.</strong> Si quieres 12 del mediodía, cambia la hora a <strong>12:00</strong>.';
    return false;
  }
  help.classList.add('ok');
  help.innerHTML = `Hora seleccionada: <strong>${timeHumanLabel(time)}</strong>.`;
  return true;
}

function adminScheduleRanges(date) {
  if (!date) return [];
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return {
    0: [],
    1: [['08:00','16:30']],
    2: [['08:00','17:00']],
    3: [['08:00','17:00']],
    4: [['08:00','20:00']],
    5: [['08:00','20:00']],
    6: [['07:00','09:30'], ['14:00','18:00']]
  }[day] || [];
}

function adminTimeToMinutes(time) {
  const [h, m] = String(time || '').split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function validateBusinessSchedule(date, time, service, modality, contexto='guardar la cita') {
  if (!validateNoMidnight(time, contexto)) return false;
  const start = adminTimeToMinutes(time);
  if (start === null) return true;
  const duration = _getServiceDurationJS(service) + (modality === 'Domicilio' ? 30 : 0);
  const end = start + duration;
  const fits = adminScheduleRanges(date).some(([from, to]) => {
    return start >= adminTimeToMinutes(from) && end <= adminTimeToMinutes(to);
  });
  if (fits) return true;
  toast('Horario fuera de la jornada habitual. Se guardará como cita manual especial.', 'warn');
  return true;
}

function _addMultiDate() {
  const date = document.getElementById('multiDate').value;
  const time = document.getElementById('multiTime').value;
  if (!date) { toast('Selecciona una fecha', 'err'); return; }
  if (!time) { toast('Selecciona una hora', 'err'); return; }
  if (!validateNoMidnight(time, 'agendar')) { updateTimeHelp('multiTime','multiTimeHelp'); return; }
  if (_multiDates.find(d => d.date === date && d.time === time)) {
    toast('Esa fecha y hora ya está en la lista', 'warn'); return;
  }
  _multiDates.push({ date, time });
  _multiDates.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  _renderMultiChips();
  _updateSubmitLabel();
}

function _removeMultiDate(idx) {
  _multiDates.splice(idx, 1);
  _renderMultiChips();
  _updateSubmitLabel();
}

function _renderMultiChips() {
  const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const wrap  = document.getElementById('multiDateChips');
  const count = document.getElementById('multiDateCount');
  if (!wrap) return;
  wrap.innerHTML = _multiDates.map((d, i) => {
    const wd   = DIAS[new Date(d.date + 'T12:00:00').getDay()];
    const [y,m,day] = d.date.split('-');
    return `<span class="multi-date-chip">
      ${wd} ${day}/${m}/${y} ${d.time}
      <button type="button" onclick="_removeMultiDate(${i})" title="Quitar">×</button>
    </span>`;
  }).join('');
  count.textContent = _multiDates.length > 0
    ? `${_multiDates.length} fecha${_multiDates.length > 1 ? 's' : ''} seleccionada${_multiDates.length > 1 ? 's' : ''}`
    : '';
}

function _calcRecDates() {
  const start  = document.getElementById('recFechaInicio')?.value;
  const time   = document.getElementById('recHora')?.value;
  const days   = parseInt(document.getElementById('recFrecuencia')?.value) || 7;
  const qty    = Math.min(parseInt(document.getElementById('recCantidad')?.value) || 4, 52);
  if (isMidnightTime(time)) return [];
  if (!start || !time || qty < 1) return [];
  const dates = [];
  const cur   = new Date(start + 'T12:00:00');
  for (let i = 0; i < qty; i++) {
    dates.push({ date: cur.toLocalDateStr(), time });
    cur.setDate(cur.getDate() + days);
  }
  return dates;
}

function _updateRecPreview() {
  _updateSubmitLabel();
  const dates  = _calcRecDates();
  const wrap   = document.getElementById('recPreview');
  if (!wrap) return;
  if (!dates.length) { wrap.innerHTML = ''; return; }

  const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  wrap.innerHTML = `
    <div style="font-size:.72rem;color:var(--muted);font-family:var(--font-m);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">
      Vista previa — ${dates.length} sesiones
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;max-height:160px;overflow-y:auto">
      ${dates.map((d, i) => {
        const dt  = new Date(d.date + 'T12:00:00');
        const dia = DIAS[dt.getDay()];
        const mes = MESES[dt.getMonth()];
        return `<div class="rec-preview-item">
          <span>${i === 0 ? '▶ ' : ''}${dia} ${dt.getDate()} ${mes} ${dt.getFullYear()}</span>
          <span style="font-family:var(--font-m);color:var(--muted)">${d.time}${i===0?' (inicio)':''}</span>
        </div>`;
      }).join('')}
    </div>`;
}

global.PanelScheduleOperations = Object.freeze({
    renderBloqueos,
    doBlock,
    doUnblock,
    toggleRecurringPanel,
    switchScheduleMode,
    _updateSubmitLabel,
    isMidnightTime,
    timeHumanLabel,
    updateTimeHelp,
    adminScheduleRanges,
    adminTimeToMinutes,
    validateBusinessSchedule,
    _addMultiDate,
    _removeMultiDate,
    _renderMultiChips,
    _calcRecDates,
    _updateRecPreview
  });
})(typeof window !== 'undefined' ? window : globalThis);
