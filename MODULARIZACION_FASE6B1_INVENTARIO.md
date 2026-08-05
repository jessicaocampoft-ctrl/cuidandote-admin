# Inventario de creación de citas — Fase 6B1

- Funciones relacionadas: 21
- Candidatas para 6B1: 21
- Excluidas para 6B2: 0

## Candidatas para creación

- `bookWaitPatient` — línea 7646
- `agendarHoy` — línea 7894
- `calcAbono` — línea 8031
- `validateNoMidnight` — línea 8136
- `submitAdminBookingMulti` — línea 8257
- `agendarDesdePaciente` — línea 9228
- `toggleNcAddress` — línea 9607
- `_updateDuoTime` — línea 9723
- `checkDomicilioWarn` — línea 9811
- `updateSesionesInfo` — línea 9860
- `calcConvenio` — línea 9927
- `autoFillPrice` — línea 10077
- `submitAdminBooking` — línea 10307
- `fillPatient` — línea 10460
- `clearNuevaCita` — línea 10479
- `checkTimeConflict` — línea 10550
- `exportarHistorialPaciente` — línea 10765
- `openNuevaCitaFromCal` — línea 11260
- `_parseVoice` — línea 11399
- `agendarDesdePacienteRec` — línea 11699
- `agendarDesdeSeg` — línea 12051

## Excluidas para edición/reprogramación/estado


## Código exacto de candidatas

### bookWaitPatient

```javascript
function bookWaitPatient(id) {
  const p = _getWaitList().find(x => x.id === id); if (!p) return;
  showView('nueva');
  document.getElementById('ncName').value = p.nombre;
  document.getElementById('ncPhone').value = p.telefono;
  if (p.servicio) document.getElementById('ncService').value = p.servicio;
  toast('Datos cargados. Completa fecha, hora y servicio.');
}
```

### agendarHoy

```javascript
function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
```

### calcAbono

```javascript
function calcAbono() {
  const monto   = parsePrecio(document.getElementById('ncAbonoMonto').value);
  const fecha   = document.getElementById('ncAbonoFecha').value;
  const precio  = parsePrecio(getPrecioFinal());
  const resumen = document.getElementById('abonoResumen');
  if (!monto || !fecha) { resumen.style.display = 'none'; return; }
  const pct     = precio ? Math.round((monto / precio) * 100) : 0;
  const restante= precio ? precio - monto : 0;
  const pctRest = 100 - pct;
  const [y,m,d] = fecha.split('-');
  const fechaLeg= d + '/' + m + '/' + y;
  let html = `💰 Abonó <strong>${formatPrecio(monto)}</strong> el ${fechaLeg}`;
  if (precio) html += ` · <span style="color:#059669;font-weight:700">${pct}% pagado</span> · Restante: <strong>${formatPrecio(restante)}</strong> <span style="color:#dc2626">(${pctRest}%)</span>`;
  resumen.innerHTML = html;
  resumen.style.display = 'block';
}
```

### validateNoMidnight

```javascript
function validateNoMidnight(time, contexto='la cita') {
  if (!isMidnightTime(time)) return true;
  toast(`Esa hora es de medianoche. Para ${contexto} al mediodía usa 12:00.`, 'err');
  return false;
}
```

### submitAdminBookingMulti

```javascript
async function submitAdminBookingMulti() {
  if (_submittingBooking) return;

  const name = document.getElementById('ncName').value.trim();
  const serv = document.getElementById('ncService').value;
  const mod  = document.getElementById('ncMod').value;
  if (!name || !serv) { toast('Completa los campos obligatorios (*)','err'); return; }

  // Reunir fechas según modo
  let fechas = [];
  if (_scheduleMode === 'unica') {
    const date = document.getElementById('ncDate').value;
    const time = document.getElementById('ncTime').value;
    if (!date || !time) { toast('Selecciona fecha y hora', 'err'); return; }
    if (!validateNoMidnight(time, 'agendar')) { updateTimeHelp('ncTime','ncTimeHelp'); return; }
    fechas = [{ date, time }];
  } else if (_scheduleMode === 'multiple') {
    if (_multiDates.length === 0) { toast('Agrega al menos una fecha', 'err'); return; }
    if (_multiDates.some(d => isMidnightTime(d.time))) { toast('Hay una fecha entre 00:00 y 00:59 (medianoche). Cámbiala a 12:00 si es mediodía.', 'err'); return; }
    fechas = [..._multiDates];
  } else {
    if (isMidnightTime(document.getElementById('recHora')?.value)) { updateTimeHelp('recHora','recTimeHelp'); toast('Esa hora es de medianoche. Para citas al mediodía usa 12:00.', 'err'); return; }
    fechas = _calcRecDates();
    if (fechas.length === 0) { toast('Configura la recurrencia', 'err'); return; }
  }

  _submittingBooking = true;
  const btn = document.getElementById('ncSubmitBtn');
  const origLabel = document.getElementById('ncSubmitLabel').textContent;
  btn.disabled = true;

  // Datos base de la cita
  const phone = document.getElementById('ncPhone').value.trim();
  const gymSel = document.getElementById('ncConvenio').value;
  let gimnasioData = {};
  if (gymSel) {
    const descValor = parseFloat(document.getElementById('ncConvDescValor').value) || 0;
    const descTipo  = document.getElementById('ncConvDescTipo').value;
    const comValor  = parseFloat(document.getElementById('ncConvComValor').value)  || 0;
    const comTipo   = document.getElementById('ncConvComTipo').value;
    const precioNormal = parsePrecioNum(document.getElementById('ncPrice').value);
    const descuento  = descTipo==='pct' ? precioNormal*descValor/100 : descValor;
    const clientePaga = precioNormal - descuento;
    const comision   = comTipo==='pct' ? clientePaga*comValor/100 : comValor;
    const ingresoReal = clientePaga - comision;
    const costoReal   = costosReales[serv] || 0;
    const utilidad    = ingresoReal - costoReal;
    const margen      = ingresoReal>0 ? Math.round((utilidad/ingresoReal)*100) : 0;
    gimnasioData = { gimnasio:gymSel, descuentoCliente:fmtPeso(descuento), comisionGym:fmtPeso(comision), ingresoReal:fmtPeso(ingresoReal), margenPct:margen+'%' };
  }

  const baseData = {
    name, phone,
    email:     document.getElementById('ncEmail').value.trim(),
    service:   serv, modality: mod,
    priceP:    getPrecioFinal() || 'A convenir',
    priceD:    getPrecioFinal() || 'A convenir',
    address:   document.getElementById('ncAddress').value.trim(),
    notes:     document.getElementById('ncNotes').value.trim(),
    notaAdmin: (() => { const p=(document.getElementById('ncParaQuien').value||'').trim(); const ab=getAbonoNota(); return [p?'[PARA: '+p+']':'',ab].filter(Boolean).join(' '); })(),
    canal:     document.getElementById('nuevaCitaCanal').value || 'Directo',
    ...gimnasioData
  };

  // Validar segunda persona si está activa
  let duoData = null;
  if (_duoActive) {
    const name2  = (document.getElementById('nc2Name').value||'').trim() || name;
    const serv2  = document.getElementById('nc2Service').value;
    const time2  = document.getElementById('nc2Time').value;
    if (!serv2 || !time2) {
      toast('Completa servicio y hora de la segunda persona', 'err');
      _submittingBooking = false; btn.disabled = false;
      document.getElementById('ncSubmitLabel').textContent = origLabel;
      return;
    }
    duoData = {
      name:      name2,
      phone:     (document.getElementById('nc2Phone').value||'').trim(),
      email:     (document.getElementById('nc2Email').value||'').trim(),
      service:   serv2,
      modality:  mod,
      priceP:    document.getElementById('nc2Price').value || 'A convenir',
      priceD:    document.getElementById('nc2Price').value || 'A convenir',
      address:   document.getElementById('ncAddress').value.trim(),
      notes:     document.getElementById('ncNotes').value.trim(),
      notaAdmin: '[PAREJA DE ' + name + ']',
      canal:     document.getElementById('nuevaCitaCanal').value || 'Directo',
    };
  }

  let creadas = 0, errores = 0;
  for (let i = 0; i < fechas.length; i++) {
    document.getElementById('ncSubmitLabel').textContent = `Creando ${i+1}/${fechas.length}...`;
    const data = { ...baseData, date: fechas[i].date, time: fechas[i].time };
    try {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
      const d = await r.json();
      if (d.ok) creadas++; else errores++;
    } catch(e) { errores++; }

    // Segunda persona: usa la misma fecha pero la hora calculada
    if (_duoActive && duoData) {
      const time2  = document.getElementById('nc2Time').value;
      const data2  = { ...duoData, date: fechas[i].date, time: time2 };
      document.getElementById('ncSubmitLabel').textContent = `Creando turno 2/${fechas.length}...`;
      try {
        const r2 = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data2))}`);
        const d2 = await r2.json();
        if (d2.ok) creadas++; else errores++;
      } catch(e) { errores++; }
    }
  }

  _submittingBooking = false;
  btn.disabled = false;
  document.getElementById('ncSubmitLabel').textContent = origLabel;

  if (errores > 0) {
    toast(`${creadas} cita${creadas!==1?'s':''} creada${creadas!==1?'s':''} · ${errores} error${errores!==1?'es':''}`, 'warn');
  } else {
    const personas = _duoActive ? ' (2 personas)' : '';
    toast(`✓ ${creadas} cita${creadas!==1?'s':''} creada${creadas!==1?'s':''} correctamente${personas}`, 'ok');
    logChange('Nueva cita', `${name}${_duoActive ? ' + '+duoData.name : ''} · ${serv} · ${creadas} turno${creadas!==1?'s':''}`);
    await reload();
    renderAgenda(); initDashboard();
    if (_scheduleMode !== 'unica') { _multiDates = []; _renderMultiChips(); }
    clearNuevaCita();
  }
}
```

### agendarDesdePaciente

```javascript
function agendarDesdePaciente(encNombre, encTel, encEmail) {
  const nombre  = decodeURIComponent(encNombre);
  const telefono= decodeURIComponent(encTel);
  const email   = decodeURIComponent(encEmail);
  closeModal('modalHistorial');
  showView('nueva');
  document.getElementById('ncName').value  = nombre;
  document.getElementById('ncPhone').value = telefono;
  document.getElementById('ncEmail').value = email;
  document.getElementById('pacSearch').value = nombre + (telefono ? ' — ' + telefono : '');
  toast('Datos de ' + nombre.split(' ')[0] + ' cargados. Completa fecha, hora y servicio.');
}
```

### toggleNcAddress

```javascript
function toggleNcAddress() {
  const m = document.getElementById('ncMod').value;
  document.getElementById('ncAddrWrap').style.display = m==='Domicilio' ? 'block' : 'none';
}
```

### _updateDuoTime

```javascript
function _updateDuoTime() {
  if (!_duoActive) return;
  const time1 = document.getElementById('ncTime').value;
  const serv1 = document.getElementById('ncService').value;
  const mod1  = document.getElementById('ncMod').value;
  const wrap  = document.getElementById('ncDuoTimeWrap');
  if (!time1 || !serv1) { if (wrap) wrap.style.display = 'none'; return; }

  const durMins = _getServiceDurationJS(serv1) + (mod1 === 'Domicilio' ? 30 : 0);
  const [h, m] = time1.split(':').map(Number);
  const total   = h * 60 + m + durMins;
  const h2 = Math.floor(total / 60) % 24;
  const m2 = total % 60;
  const t2 = `${String(h2).padStart(2,'0')}:${String(m2).padStart(2,'0')}`;

  document.getElementById('nc2Time').value = t2;
  document.getElementById('ncDuoTimeDisplay').textContent = t2;
  if (wrap) wrap.style.display = 'block';
}
```

### checkDomicilioWarn

```javascript
function checkDomicilioWarn() {
  const serv = document.getElementById('ncService').value;
  const mod  = document.getElementById('ncMod').value;
  const warn = document.getElementById('ncDomicilioWarn');
  if (warn) warn.style.display = (mod === 'Domicilio' && soloPresencial.includes(serv)) ? 'block' : 'none';
}
```

### updateSesionesInfo

```javascript
function updateSesionesInfo() {
  const serv   = document.getElementById('ncService').value;
  const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
  const el     = document.getElementById('ncSesionesInfo');
  if (!el) return;
  const n = sesionesPorPaquete[serv];
  if (n) {
    let html = `📦 Este paquete incluye ${n} sesiones.`;
    if (nombre && allData && allData.citas) {
      const hechas = allData.citas.filter(c =>
        (c.nombre||'').toLowerCase().trim() === nombre &&
        c.servicio === serv && c.estado !== 'Cancelada'
      ).length;
      if (hechas > 0) {
        const rest  = Math.max(0, n - hechas);
        const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
        html += `<br><span style="color:${color};font-weight:700">📊 ${hechas} realizadas · ${rest} restantes de ${n}</span>`;
      }
    }
    el.innerHTML = html;
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}
```

### calcConvenio

```javascript
function calcConvenio() {
  const gym = document.getElementById('ncConvenio').value;
  if (!gym) return;

  const descValor = parseFloat(document.getElementById('ncConvDescValor').value) || 0;
  const descTipo  = document.getElementById('ncConvDescTipo').value;
  const comValor  = parseFloat(document.getElementById('ncConvComValor').value)  || 0;
  const comTipo   = document.getElementById('ncConvComTipo').value;

  if (convenios[gym]) {
    convenios[gym].descValor = descValor;
    convenios[gym].descTipo  = descTipo;
    convenios[gym].comValor  = comValor;
    convenios[gym].comTipo   = comTipo;
  }

  const serv        = document.getElementById('ncService').value;
  const precioStr   = document.getElementById('ncPrice').value;
  const precioNormal = parsePrecioNum(precioStr);
  const resumen     = document.getElementById('ncConvenioResumen');

  if (!precioNormal) { resumen.style.display = 'none'; return; }

  const descuento  = descTipo === 'pct' ? precioNormal * descValor / 100 : descValor;
  const clientePaga = precioNormal - descuento;
  const comision   = comTipo === 'pct' ? clientePaga * comValor / 100 : comValor;
  const ingresoReal = clientePaga - comision;
  const costoReal   = costosReales[serv] || 0;
  const utilidad    = ingresoReal - costoReal;
  const margen      = ingresoReal > 0 ? Math.round((utilidad / ingresoReal) * 100) : 0;

  let margenColor = '#16a34a';
  if (margen < 35) margenColor = '#dc2626';
  else if (margen < 45) margenColor = '#d97706';

  let alertaHtml = '';
  if (utilidad < 0) {
    alertaHtml = '<div style="margin-top:8px;color:#dc2626;font-weight:600;font-size:.80rem">⚠️ PÉRDIDA: esta cita te genera pérdida.</div>';
  } else if (margen < 35) {
    alertaHtml = '<div style="margin-top:8px;color:#dc2626;font-size:.80rem">⚠️ Margen bajo. Revisa el descuento o la comisión antes de confirmar.</div>';
  }

  const row = (label, val, bold, color) =>
    `<div style="display:flex;justify-content:space-between;padding:3px 0;${bold?'font-weight:600;':''}${color?'color:'+color+';':''}">
      <span style="color:var(--muted)">${label}</span><span>${val}</span></div>`;

  resumen.innerHTML =
    row('Precio normal:', fmtPeso(precioNormal)) +
    row('Descuento al cliente:', descuento > 0 ? '−' + fmtPeso(descuento) : 'Sin descuento al cliente') +
    row('Cliente paga:', fmtPeso(clientePaga), true) +
    '<div style="border-top:1px solid var(--border);margin:6px 0"></div>' +
    row('Comisión ' + gym + ':', comision > 0 ? fmtPeso(comision) : 'Sin comisión a este gimnasio') +
    (costoReal ? row('Costo real del servicio:', fmtPeso(costoReal)) : '') +
    row('Tu ingreso real:', fmtPeso(ingresoReal), true) +
    (costoReal ? row('Tu utilidad:', fmtPeso(utilidad), false, utilidad < 0 ? '#dc2626' : '') : '') +
    (costoReal ? row('Tu margen:', margen + '%', true, margenColor) : '') +
    alertaHtml;
  resumen.style.display = 'block';
}
```

### autoFillPrice

```javascript
function autoFillPrice() {
  const mod   = document.getElementById('ncMod').value;
  const servs = _selectedServices.length > 0 ? _selectedServices : [document.getElementById('ncService').value];
  if (!servs[0]) return;

  if (_selectedServices.length > 1) {
    // Sumar precios de todos los servicios
    const total = servs.reduce((sum, s) => sum + _getPrecioServicio(s, mod), 0);
    if (total > 0) {
      document.getElementById('ncPrice').value = '$' + total.toLocaleString('es-CO');
    }
  } else {
    const serv  = servs[0];
    const total = _getPrecioServicio(serv, mod);
    if (total > 0) document.getElementById('ncPrice').value = '$' + total.toLocaleString('es-CO');
  }

  checkDomicilioWarn();
  updateSesionesInfo();
  calcConvenio();
  if (document.getElementById('ncAbonoCheck').checked) calcAbono();
}
```

### submitAdminBooking

```javascript
async function submitAdminBooking() {
  if (_submittingBooking) return;
  const name  = document.getElementById('ncName').value.trim();
  const phone = document.getElementById('ncPhone').value.trim();
  const serv  = document.getElementById('ncService').value;
  const mod   = document.getElementById('ncMod').value;
  const date  = document.getElementById('ncDate').value;
  const time  = document.getElementById('ncTime').value;
  if (!name||!serv||!date||!time) { toast('Completa los campos obligatorios (*)','err'); return; }
  if (!validateNoMidnight(time, 'agendar')) { updateTimeHelp('ncTime','ncTimeHelp'); return; }

  _submittingBooking = true;
  const btn = document.getElementById('ncSubmitBtn');
  btn.textContent = 'Creando...'; btn.disabled = true;

  // Calcular campos de convenio para guardar
  const gymSel = document.getElementById('ncConvenio').value;
  let gimnasioData = {};
  if (gymSel) {
    const descValor = parseFloat(document.getElementById('ncConvDescValor').value) || 0;
    const descTipo  = document.getElementById('ncConvDescTipo').value;
    const comValor  = parseFloat(document.getElementById('ncConvComValor').value)  || 0;
    const comTipo   = document.getElementById('ncConvComTipo').value;
    const precioNormal = parsePrecioNum(document.getElementById('ncPrice').value);
    const descuento  = descTipo === 'pct' ? precioNormal * descValor / 100 : descValor;
    const clientePaga = precioNormal - descuento;
    const comision   = comTipo === 'pct' ? clientePaga * comValor / 100 : comValor;
    const ingresoReal = clientePaga - comision;
    const costoReal   = costosReales[serv] || 0;
    const utilidad    = ingresoReal - costoReal;
    const margen      = ingresoReal > 0 ? Math.round((utilidad / ingresoReal) * 100) : 0;
    gimnasioData = {
      gimnasio:         gymSel,
      descuentoCliente: fmtPeso(descuento),
      comisionGym:      fmtPeso(comision),
      ingresoReal:      fmtPeso(ingresoReal),
      margenPct:        margen + '%',
    };
  }

  const data = {
    name, phone,
    email: document.getElementById('ncEmail').value.trim(),
    service: serv, modality: mod, date, time,
    priceP: getPrecioFinal() || 'A convenir',
    priceD: getPrecioFinal() || 'A convenir',
    address: document.getElementById('ncAddress').value.trim(),
    notes:   document.getElementById('ncNotes').value.trim(),
    notaAdmin: (() => { const partes = []; const p = (document.getElementById('ncParaQuien').value||'').trim(); if (p) partes.push('[PARA: ' + p + ']'); const ab = getAbonoNota(); if (ab) partes.push(ab); return partes.join(' '); })(),
    canal: document.getElementById('nuevaCitaCanal').value || 'Directo',
    ...gimnasioData
  };

  const isRecurring   = document.getElementById('ncRecurring').checked;
  const totalSessions = isRecurring ? (parseInt(document.getElementById('ncSessions').value) || 1) : 1;

  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
    const d = await r.json();
    if (!d.ok) { toast('Error: ' + (d.error||''), 'err'); return; }

    // Crear sesiones adicionales si es recurrente
    if (isRecurring && totalSessions > 1) {
      btn.textContent = 'Creando sesiones...';
      const baseDate = new Date(date + 'T12:00:00');
      let created = 1;
      let errors  = 0;
      for (let s = 1; s < totalSessions; s++) {
        baseDate.setDate(baseDate.getDate() + 7);
        const nextData = { ...data, date: toDateStr(baseDate) };
        try {
          const rr = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(nextData))}`);
          const dd = await rr.json();
          if (dd.ok) created++; else errors++;
        } catch(ex) { errors++; }
      }
      if (errors > 0) toast(`${created} de ${totalSessions} sesiones creadas (${errors} fallaron)`, 'warn');
      else toast(`${created} de ${totalSessions} sesiones recurrentes creadas`);
      logChange('Nueva cita', `${name} · ${serv} · ${totalSessions} sesiones recurrentes desde ${date} ${time}`);
    } else {
      toast('Cita creada y agregada a Google Calendar');
      logChange('Nueva cita', `${name} · ${serv} · ${date} ${time}`);
    }

    clearNuevaCita();
    await reload();
    initDashboard();
    // Ir a la agenda filtrada por el paciente para que la cita recién creada sea visible
    document.getElementById('fSearch').value = name;
    document.getElementById('fDesde').value  = '';
    document.getElementById('fHasta').value  = '';
    document.getElementById('fStatus').selectedIndex  = 0;
    document.getElementById('fMod').selectedIndex     = 0;
    document.getElementById('fService').selectedIndex = 0;
    sessionStorage.removeItem('agendaFilters');
    showView('agenda');
  } catch(e) { toast('Error de conexión','err'); }
  finally {
    _submittingBooking = false;
    btn.textContent = 'Crear cita'; btn.disabled = false;
  }
}
```

### fillPatient

```javascript
function fillPatient(p) {
  document.getElementById('ncName').value    = p.nombre  || '';
  document.getElementById('ncPhone').value   = p.telefono|| '';
  document.getElementById('ncEmail').value   = p.email   || '';
  if (p.ultimaDir) document.getElementById('ncAddress').value = p.ultimaDir;
  document.getElementById('pacSearch').value = p.nombre + ' — ' + (p.telefono||'');
  document.getElementById('pacDropdown').style.display = 'none';
  toast('Datos de ' + p.nombre + ' cargados');
  updateSesionesInfo();
}
```

### clearNuevaCita

```javascript
function clearNuevaCita() {
  ['ncName','ncPhone','ncEmail','ncPrice','ncAddress','ncNotes','ncParaQuien','pacSearch'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value='';
  });
  document.getElementById('ncService').value='';
  document.getElementById('ncServiceMain').selectedIndex=0;
  _selectedServices = [];
  _renderServiceChips();
  _clearDuo();
  document.getElementById('ncAbonoCheck').checked = false;
  document.getElementById('ncAbonoMonto').value   = '';
  document.getElementById('ncAbonoFecha').value   = '';
  document.getElementById('abonoPanel').style.display   = 'none';
  document.getElementById('abonoResumen').style.display = 'none';
  const planSel = document.getElementById('ncServicePlan');
  planSel.selectedIndex=0; planSel.style.display='none';
  document.getElementById('ncMod').value='Presencial';
  _cobrarDesplazamiento = true;
  const _dWrap = document.getElementById('ncDesplazamientoWrap');
  if (_dWrap) _dWrap.style.display = 'none';
  document.getElementById('ncDate').value='';
  document.getElementById('ncTime').value='';
  document.getElementById('ncAddrWrap').style.display='none';
  const dd = document.getElementById('pacDropdown');
  if (dd) dd.style.display='none';
  quitarDescuento();
  document.getElementById('descuentoPanel').style.display = 'none';
  // Reset modo de agendamiento
  _multiDates = [];
  _renderMultiChips();
  switchScheduleMode('unica');
  const recPrev = document.getElementById('recPreview');
  if (recPrev) recPrev.innerHTML = '';
  const rFecha = document.getElementById('recFechaInicio');
  const rHora  = document.getElementById('recHora');
  const rCant  = document.getElementById('recCantidad');
  if (rFecha) rFecha.value = '';
  if (rHora)  rHora.value  = '';
  if (rCant)  rCant.value  = '4';
  updateTimeHelp('ncTime','ncTimeHelp');
  updateTimeHelp('multiTime','multiTimeHelp');
  updateTimeHelp('recHora','recTimeHelp');
}
```

### checkTimeConflict

```javascript
function checkTimeConflict() {
  const date = document.getElementById('ncDate').value;
  const time = document.getElementById('ncTime').value;
  const warn = document.getElementById('ncConflictWarn');
  if (!date || !time) { warn.style.display = 'none'; return; }
  if (isMidnightTime(time)) {
    warn.style.background = 'rgba(239,68,68,.1)';
    warn.style.borderColor = 'rgba(239,68,68,.4)';
    warn.style.color = '#991b1b';
    warn.innerHTML = '⚠️ Esa hora está en la franja 00:00–00:59 (medianoche). Si la cita es a las 12 del mediodía, selecciona 12:00.';
    warn.style.display = 'block';
    return;
  }
  const serv = document.getElementById('ncService')?.value || '';
  const mod = document.getElementById('ncMod')?.value || '';
  const start = adminTimeToMinutes(time);
  const duration = _getServiceDurationJS(serv) + (mod === 'Domicilio' ? 30 : 0);
  const fitsSchedule = adminScheduleRanges(date).some(([from, to]) => {
    return start >= adminTimeToMinutes(from) && start + duration <= adminTimeToMinutes(to);
  });
  if (!fitsSchedule) {
    warn.style.background = 'rgba(245,158,11,.12)';
    warn.style.borderColor = 'rgba(245,158,11,.45)';
    warn.style.color = '#92400e';
    warn.innerHTML = '⚠️ Horario fuera de la jornada habitual. Puedes guardarlo como cita manual especial; quedará visible en agenda y reportes.';
    warn.style.display = 'block';
    return;
  }

  const conflicts = allData.citas.filter(c =>
    c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) &&
    normDate(c.fecha) === date && c.hora === time
  );

  if (conflicts.length) {
    const lista = conflicts.map(c => `<strong>${c.nombre}</strong> (${c.servicio})`).join(', ');
    warn.style.background = 'rgba(239,68,68,.1)';
    warn.style.borderColor = 'rgba(239,68,68,.4)';
    warn.style.color = '#991b1b';
    warn.innerHTML = `⚠️ Conflicto de horario: ya hay cita a las ${time} — ${lista}`;
    warn.style.display = 'block';
  } else {
    warn.style.display = 'none';
  }
}
```

### exportarHistorialPaciente

```javascript
function exportarHistorialPaciente(nombre) {
  const citas = allData.citas.filter(c => c.nombre === nombre)
    .sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  if (!citas.length) { toast('Sin citas para exportar', 'err'); return; }
  const header = ['Fecha','Hora','Servicio','Modalidad','Valor','Estado','Notas'];
  const rows = citas.map(c => [normDate(c.fecha),c.hora,c.servicio,c.modalidad,c.precio||'',c.estado,c.notas||'']);
  const csv = [header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'historial_'+nombre.replace(/\s+/g,'_')+'_'+today()+'.csv';
  a.click(); URL.revokeObjectURL(a.href);
  toast('Historial exportado: '+citas.length+' cita(s)');
}

// ── EDITAR / BORRAR PACIENTE ──
function editarPacienteIdx(idx) {
  const p = _pacs[idx];
  if (!p) return;
  document.getElementById('epOldNombre').value = JSON.stringify(p.nombres); // guarda TODOS los nombres
  document.getElementById('epNombre').value    = p.nombre;
  document.getElementById('epTelefono').value  = p.telefono || '';
  document.getElementById('epEmail').value     = p.email    || '';
  openModal('modalEditarPaciente');
}
function editarPaciente(nombre, telefono, email) { // compatibilidad legacy
  document.getElementById('epOldNombre').value = JSON.stringify([nombre]);
  document.getElementById('epNombre').value    = nombre;
  document.getElementById('epTelefono').value  = telefono;
  document.getElementById('epEmail').value     = email;
  openModal('modalEditarPaciente');
}

async function guardarPaciente() {
  const oldNombresRaw = document.getElementById('epOldNombre').value;
  const newNombre     = document.getElementById('epNombre').value.trim();
  const telefono      = document.getElementById('epTelefono').value.trim();
  const email         = document.getElementById('epEmail').value.trim();
  if (!newNombre) { toast('El nombre no puede estar vacío', 'err'); return; }
  const btn = document.getElementById('epSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    let oldNombres = [];
    try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
    let totalActualizado = 0;
    for (const oldNombre of oldNombres) {
      const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
      const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
      const d = await r.json();
      if (d.ok) totalActualizado += d.updated || 0;
    }
    // Actualizar en memoria
    allData.citas.forEach(c => {
      if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g,''); c.email = email; }
    });
    toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
    closeModal('modalEditarPaciente');
    renderPacientes();
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

async function borrarPaciente(idx) {
  const p = _pacs[idx];
  if (!p) return;
  if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
  try {
    // Borrar todos los nombres que usó este paciente
    for (const nombre of p.nombres) {
      await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
    }
    allData.citas = allData.citas.filter(c => !p.nombres.includes(c.nombre));
    toast(`${p.nombre} eliminado/a correctamente`);
    renderPacientes();
    initDashboard();
  } catch(e) { toast('Error de conexión', 'err'); }
}

// ── BASE DE DATOS ──
let _dbPacs = [];

function initFormDB() {
  // noop — form fields start empty, no defaults needed
}

function renderBasedatos() {
  const search = (document.getElementById('dbSearch') ? document.getElementById('dbSearch').value : '').toLowerCase();
  const map = {};
  // Primero cargar pacientes de la hoja Pacientes (incluye los registrados sin cita)
  (allData.pacientes || []).forEach(function(p) {
    const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
    const email  = (p.email || '').toLowerCase().trim();
    const nombre = (p.nombre || '').trim();
    const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
    if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
  });
  // Luego cruzar con citas (actualizan datos si el paciente ya existe)
  (allData.citas || []).forEach(function(c) {
    const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
    const email  = (c.email || '').toLowerCase().trim();
    const nombre = (c.nombre || '').trim();
    const key = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
    if (!map[key]) map[key] = {nombre: nombre, telefono: '', email: '', sesiones: 0, ultima: '', ultimoServicio: '', servicios: {}, nombres: []};
    if (map[key].nombres.indexOf(nombre) === -1) map[key].nombres.push(nombre);
    if (phone.length >= 10 && !map[key].telefono) map[key].telefono = phone;
    if (email && !map[key].email) map[key].email = email;
    map[key].sesiones++;
    if (normDate(c.fecha) > normDate(map[key].ultima)) {
      map[key].ultima = normDate(c.fecha);
      map[key].ultimoServicio = c.servicio;
      map[key].nombre = nombre;
    }
    map[key].servicios[c.servicio] = (map[key].servicios[c.servicio] || 0) + 1;
  });

  _dbPacs = Object.values(map);
  let pacs = _dbPacs;
  if (search) pacs = pacs.filter(function(p) {
    return (p.nombre + (p.telefono || '') + (p.email || '')).toLowerCase().indexOf(search) !== -1;
  });
  pacs.sort(function(a, b) { return b.sesiones - a.sesiones; });

  const tbody = document.getElementById('dbTbody');
  if (!tbody) return;
  if (!pacs.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><p>No hay pacientes registrados</p></div></td></tr>';
    return;
  }
  tbody.innerHTML = pacs.map(function(p) {
    const idx      = _dbPacs.indexOf(p);
    const topServ  = Object.entries(p.servicios).sort(function(a,b){return b[1]-a[1];})[0] || ['—', 0];
    const initials = p.nombre.split(' ').map(function(x){return x[0]||'';}).join('').toUpperCase().slice(0, 2);
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:10px"><div class="pac-badge">' + initials + '</div><strong>' + p.nombre + '</strong></div></td>' +
      '<td style="font-family:var(--font-m);font-size:.82rem">' + (p.telefono || '—') + '</td>' +
      '<td style="font-size:.82rem;color:var(--muted)">' + (p.email || '—') + '</td>' +
      '<td><span class="chip chip-ok">' + p.sesiones + '</span></td>' +
      '<td style="font-size:.82rem">' + fmtDate(p.ultima) + '</td>' +
      '<td style="font-size:.82rem;color:var(--muted)">' + topServ[0] + '</td>' +
      '<td style="font-size:.8rem;color:var(--muted)">' + (p.origen || '—') + '</td>' +
      '<td><div style="display:flex;gap:5px;flex-wrap:wrap">' +
        waBtn(p.telefono, p.nombre, '', '', '', 'WA') +
        '<button type="button" class="btn btn-edit btn-sm" onclick="dbEditarPac(' + idx + ')">✏️ Editar</button>' +
        '<button type="button" class="btn btn-danger btn-sm" onclick="dbBorrarPac(' + idx + ')">🗑️</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
}

function renderReactivacion() {
  const el = document.getElementById('reactivacionResult');
  if (!el) return;

  const dias   = parseInt(document.getElementById('reacDias')?.value || '90', 10);
  const hoy    = today(); // "YYYY-MM-DD"
  const limite = new Date(); limite.setDate(limite.getDate() - dias);
  const limiteStr = limite.toLocalDateStr();

  // Agrupar citas por paciente (clave por teléfono o nombre)
  const map = {};
  (allData.citas || []).forEach(c => {
    if (!c.nombre) return;
    const phone = (c.telefono || '').replace(/\D/g, '').slice(-10);
    const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + c.nombre.toLowerCase().trim();
    if (!map[key]) map[key] = { nombre: c.nombre, telefono: phone, ultimaPasada: '', proximaFutura: '' };
    const fd = normDate(c.fecha);
    if (fd && fd <= hoy) {
      if (!map[key].ultimaPasada || fd > map[key].ultimaPasada) map[key].ultimaPasada = fd;
    }
    if (fd && fd > hoy) {
      if (!map[key].proximaFutura || fd < map[key].proximaFutura) map[key].proximaFutura = fd;
    }
  });

  // Enriquecer con hoja Pacientes (teléfono puede estar ahí)
  (allData.pacientes || []).forEach(p => {
    const phone = (p.telefono || '').replace(/\D/g, '').slice(-10);
    const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + (p.nombre||'').toLowerCase().trim();
    if (map[key] && phone) map[key].telefono = phone;
  });

  // Filtrar: tuvieron cita pasada, esa cita fue hace más de `dias` días, y NO tienen cita futura
  const inactivos = Object.values(map).filter(p =>
    p.ultimaPasada && p.ultimaPasada < limiteStr && !p.proximaFutura
  ).sort((a, b) => a.ultimaPasada.localeCompare(b.ultimaPasada)); // más antiguos primero

  if (!inactivos.length) {
    el.innerHTML = `<div style="padding:18px;text-align:center;color:var(--ok);font-size:.9rem">🟢 ¡Bien! Todos tus pacientes estuvieron activos en los últimos ${dias} días o tienen cita agendada.</div>`;
    return;
  }

  // Calcular días de inactividad
  const diffDias = fecha => {
    const d = new Date(hoy + 'T12:00:00') - new Date(fecha + 'T12:00:00');
    return Math.floor(d / 86400000);
  };

  const chipColor = d => d >= 365 ? '#ef4444' : d >= 180 ? '#f59e0b' : 'var(--primary)';

  // Mensajes de reactivación por estilo
  const REAC_MSGS = {
    calido: (n) =>
      `Hola ${n}! 👋\nHace tiempo no nos visitás y nos encantaría verte de nuevo.\n\n¿Cómo te has sentido? Si querés retomar tus sesiones, estamos disponibles para agendarte 🙌\n\nEscríbenos cuando quieras 😊`,
    motivacional: (n) =>
      `Hola ${n}! 💪\nTu cuerpo lo nota cuando falta la descarga — el estrés acumulado no desaparece solo.\n\nLlevás un tiempo sin sesión y este es el momento perfecto para retomar. No esperes a que el cuerpo te lo exija.\n\n¿Cuándo te agendamos? 🙌`,
    resultado: (n) =>
      `Hola ${n}! 🌿\n¿Recordás cómo te sentías después de tus sesiones? Ese alivio, esa ligereza, ese "volvería mañana"...\n\nEso te espera. Llevás un tiempo sin venir y queremos que retomes tu bienestar.\n\n¿Agendamos esta semana? 😊`,
    espacio: (n) =>
      `Hola ${n}! 🗓️\nTenemos un espacio disponible esta semana y pensamos en vos.\n\nHace tiempo no te vemos — ¿qué tal si retomamos? Escríbenos y te buscamos el mejor horario 🙌`,
  };

  const waReacUrl = (tel, nombre, tipo) => {
    if (!tel || tel.length < 7) return null;
    const phone   = tel.length <= 10 ? '57' + tel : tel;
    const primero = nombre.split(' ')[0];
    const msg     = (REAC_MSGS[tipo] || REAC_MSGS.calido)(primero);
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  let html = `
    <div style="margin-bottom:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <div style="font-size:.82rem;color:var(--muted)">${inactivos.length} paciente${inactivos.length>1?'s':''} inactivo${inactivos.length>1?'s':''}</div>
      <div style="font-size:.75rem;padding:3px 10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:20px;color:#dc2626">${inactivos.filter(p=>diffDias(p.ultimaPasada)>=365).length} sin venir hace 1+ año</div>
      <div style="font-size:.75rem;padding:3px 10px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:20px;color:#b45309">${inactivos.filter(p=>diffDias(p.ultimaPasada)>=180&&diffDias(p.ultimaPasada)<365).length} entre 6m–1 año</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">`;

  inactivos.forEach((p, i) => {
    const d      = diffDias(p.ultimaPasada);
    const color  = chipColor(d);
    const hasTel = p.telefono && p.telefono.length >= 7;
    const dLabel = d >= 365
      ? `${Math.floor(d/365)} año${Math.floor(d/365)>1?'s':''} ${d%365>0?Math.floor((d%365)/30)+'m':''}`
      : d >= 30 ? `${Math.floor(d/30)} mes${Math.floor(d/30)>1?'es':''}` : `${d} días`;

    const selectId = `reacMsg_${i}`;
    const btnId    = `reacBtn_${i}`;
    const telEnc   = encodeURIComponent(p.telefono || '');
    const nomEnc   = encodeURIComponent(p.nombre);

    html += `
      <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="display:grid;grid-template-columns:1fr auto;align-items:start;gap:10px;margin-bottom:${hasTel?'10px':'0'}">
          <div>
            <div style="font-size:.88rem;font-weight:600">${p.nombre}</div>
            <div style="font-size:.73rem;color:var(--muted);margin-top:2px">
              Última visita: ${fmtDate(p.ultimaPasada)}${p.telefono ? ` · 📞 ${p.telefono}` : ''}
            </div>
          </div>
          <div style="font-size:.75rem;font-family:var(--font-m);color:${color};white-space:nowrap;text-align:right">
            Inactivo hace<br><strong>${dLabel}</strong>
          </div>
        </div>
        ${hasTel ? `
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <select id="${selectId}" onchange="_updateReacBtn('${selectId}','${btnId}','${telEnc}','${nomEnc}')"
            style="flex:1;min-width:180px;font-size:.75rem;padding:5px 8px;background:var(--s1);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--font-b);cursor:pointer;outline:none">
            <option value="calido">😊 Cálido — "hace tiempo no nos visitás..."</option>
            <option value="motivacional">💪 Motivacional — "tu cuerpo lo nota cuando falta..."</option>
            <option value="resultado">🌿 Resultado — "¿recordás cómo te sentías después?"</option>
            <option value="espacio">🗓️ Espacio disponible — "tenemos un espacio esta semana..."</option>
          </select>
          <a id="${btnId}" href="${waReacUrl(p.telefono, p.nombre, 'calido')}" target="_blank" class="btn btn-wa btn-sm">WhatsApp</a>
          <button class="btn btn-teal btn-sm" onclick="agendarDesdePaciente('${nomEnc}','${p.telefono}','')">Agendar</button>
        </div>` : '<span style="font-size:.72rem;color:var(--muted)">Sin teléfono registrado</span>'}
      </div>`;
  });

  html += `</div>`;
  el.innerHTML = html;
}

function _updateReacBtn(selectId, btnId, telEnc, nomEnc) {
  const sel  = document.getElementById(selectId);
  const btn  = document.getElementById(btnId);
  if (!sel || !btn) return;
  const tipo    = sel.value;
  const tel     = decodeURIComponent(telEnc);
  const nombre  = decodeURIComponent(nomEnc);
  const primero = nombre.split(' ')[0];
  const MSGS = {
    calido:       `Hola ${primero}! 👋\nHace tiempo no nos visitás y nos encantaría verte de nuevo.\n\n¿Cómo te has sentido? Si querés retomar tus sesiones, estamos disponibles para agendarte 🙌\n\nEscríbenos cuando quieras 😊`,
    motivacional: `Hola ${primero}! 💪\nTu cuerpo lo nota cuando falta la descarga — el estrés acumulado no desaparece solo.\n\nLlevás un tiempo sin sesión y este es el momento perfecto para retomar. No esperes a que el cuerpo te lo exija.\n\n¿Cuándo te agendamos? 🙌`,
    resultado:    `Hola ${primero}! 🌿\n¿Recordás cómo te sentías después de tus sesiones? Ese alivio, esa ligereza, ese "volvería mañana"...\n\nEso te espera. Llevás un tiempo sin venir y queremos que retomes tu bienestar.\n\n¿Agendamos esta semana? 😊`,
    espacio:      `Hola ${primero}! 🗓️\nTenemos un espacio disponible esta semana y pensamos en vos.\n\nHace tiempo no te vemos — ¿qué tal si retomamos? Escríbenos y te buscamos el mejor horario 🙌`,
  };
  const phone = tel.length <= 10 ? '57' + tel : tel;
  btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(MSGS[tipo] || MSGS.calido)}`;
}

function dbEditarPac(idx) {
  const p = _dbPacs[idx];
  if (!p) return;
  document.getElementById('epOldNombre').value  = JSON.stringify(p.nombres);
  document.getElementById('epNombre').value     = p.nombre;
  document.getElementById('epTelefono').value   = p.telefono || '';
  document.getElementById('epEmail').value      = p.email || '';
  document.getElementById('epSaveBtn').setAttribute('onclick', 'guardarPacienteDB()');
  openModal('modalEditarPaciente');
}

async function guardarPacienteDB() {
  const oldNombresRaw = document.getElementById('epOldNombre').value;
  const newNombre     = document.getElementById('epNombre').value.trim();
  const telefono      = document.getElementById('epTelefono').value.trim();
  const email         = document.getElementById('epEmail').value.trim();
  if (!newNombre) { toast('El nombre no puede estar vacío', 'err'); return; }
  if (telefono && telefono.replace(/\D/g, '').length < 10) {
    toast('El teléfono debe tener al menos 10 dígitos', 'err');
    return;
  }
  const btn = document.getElementById('epSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    let oldNombres = [];
    try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
    let totalActualizado = 0;
    for (const oldNombre of oldNombres) {
      const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
      const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
      const d = await r.json();
      if (d.ok) totalActualizado += d.updated || 0;
    }
    allData.citas.forEach(c => {
      if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g, ''); c.email = email; }
    });
    const oldLabel = oldNombres.join(' / ');
    logChange('Paciente editado', oldLabel !== newNombre ? `${oldLabel} → ${newNombre}` : `${newNombre} (datos actualizados)`);
    toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
    closeModal('modalEditarPaciente');
    renderBasedatos();
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

async function dbBorrarPac(idx) {
  const p = _dbPacs[idx];
  if (!p) return;
  if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
  try {
    for (const nombre of p.nombres) {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
      const d = await r.json();
      if (!d.ok) { toast('Error al eliminar: ' + (d.error || 'intenta de nuevo'), 'err'); return; }
    }
    allData.citas    = allData.citas.filter(c => !p.nombres.includes(c.nombre));
    allData.pacientes = (allData.pacientes || []).filter(p2 => !p.nombres.map(n => n.toLowerCase()).includes((p2.nombre||'').toLowerCase()));
    logChange('Paciente eliminado', `${p.nombre} · ${p.sesiones} cita(s)`);
    toast(`${p.nombre} eliminado/a correctamente`);
    renderBasedatos();
    initDashboard();
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function agregarPacienteDB() {
  if (_submittingPatient) return;
  const nombre   = document.getElementById('dbNombre').value.trim();
  const telefono = document.getElementById('dbTelefono').value.trim();
  const email    = document.getElementById('dbEmail').value.trim();
  const entidad  = document.getElementById('dbEntidad').value.trim();
  const deporte  = document.getElementById('dbDeporte').value.trim();
  const notas    = document.getElementById('dbNotas').value.trim();

  if (!nombre) { toast('El nombre es obligatorio', 'err'); return; }
  if (telefono && telefono.replace(/\D/g, '').length < 10) {
    toast('El teléfono debe tener al menos 10 dígitos', 'err');
    return;
  }

  _submittingPatient = true;
  const btn = document.getElementById('dbSubmitBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;

  // Construir notas completas con entidad y deporte
  const partes = [];
  if (entidad) partes.push('Entidad: ' + entidad);
  if (deporte) partes.push('Deporte/actividad: ' + deporte);
  if (notas)   partes.push(notas);
  const notasFinal = partes.join(' | ');

  const data = {
    name: nombre, phone: telefono, email: email,
    service: 'Registro', modality: 'Presencial',
    date: today(), time: '09:00',
    priceP: 'A convenir', priceD: 'A convenir',
    address: '', notes: notasFinal
  };

  const esReferido = document.getElementById('dbOrigen').value === 'Referido';
  const referidoPor = esReferido ? (document.getElementById('dbReferidoPor').value.trim()) : '';

  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
    const d = await r.json();
    if (d.ok) {
      logChange('Paciente agregado', nombre + (telefono ? ` · ${telefono}` : ''));
      await reload();
      renderBasedatos();
      initDashboard();

      // Si es referido, generar y registrar código REF
      if (esReferido) {
        try {
          const rg = await fetch(`${APPS_SCRIPT_URL}?action=generarCodigo&token=${encodeURIComponent(TOKEN)}&tipo=REF`);
          const dg = await rg.json();
          if (dg.ok) {
            const codData = { codigo: dg.codigo, tipo: 'REF', paciente: nombre, telefono, referidoPor };
            await fetch(`${APPS_SCRIPT_URL}?action=registrarCodigo&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(codData))}`);
            // Mostrar banner con el código
            document.getElementById('dbCodigoValor').textContent = dg.codigo;
            document.getElementById('dbCodigoResult').style.display = 'block';
            // Limpiar solo campos del paciente, dejar el banner visible
            document.getElementById('dbNombre').value   = '';
            document.getElementById('dbTelefono').value = '';
            document.getElementById('dbEmail').value    = '';
            document.getElementById('dbEntidad').value  = '';
            document.getElementById('dbDeporte').value  = '';
            document.getElementById('dbNotas').value    = '';
            document.getElementById('dbReferidoPor').value = '';
            toast(`${nombre} agregado/a · Código ${dg.codigo} generado ✓`);
            await reload();
          } else { toast(`${nombre} agregado/a correctamente`); limpiarFormDB(); }
        } catch(ex) { toast(`${nombre} agregado/a correctamente`); limpiarFormDB(); }
      } else {
        toast(`${nombre} agregado/a correctamente`);
        limpiarFormDB();
      }
    } else {
      toast('Error: ' + (d.error || ''), 'err');
    }
  } catch(e) { toast('Error de conexión', 'err'); }
  finally {
    _submittingPatient = false;
    btn.textContent = 'Agregar paciente'; btn.disabled = false;
  }
}

function limpiarFormDB() {
  document.getElementById('dbNombre').value   = '';
  document.getElementById('dbTelefono').value = '';
  document.getElementById('dbEmail').value    = '';
  document.getElementById('dbEntidad').value  = '';
  document.getElementById('dbDeporte').value  = '';
  document.getElementById('dbNotas').value    = '';
  const rp = document.getElementById('dbReferidoPor'); if(rp) rp.value='';
  const rw = document.getElementById('dbReferidoPorWrap'); if(rw) rw.style.display='none';
  const rl = document.getElementById('dbReferidoList'); if(rl) rl.style.display='none';
  const cr = document.getElementById('dbCodigoResult'); if(cr) cr.style.display='none';
  document.getElementById('dbOrigen').selectedIndex = 0;
  dbOnOrigenChange();
}

// ── CALENDARIO ──
let calWeekStart = getMonday(new Date());

function getMonday(d) {
  const dt = new Date(d);
  const day = dt.getDay();
  dt.setDate(dt.getDate() - (day === 0 ? 6 : day - 1));
  dt.setHours(0,0,0,0);
  return dt;
}

function calPrev(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calPrev !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calPrev');
  }
  return module.calPrev(...args);
}
function calNext(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calNext !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calNext');
  }
  return module.calNext(...args);
}
function calToday(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calToday !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calToday');
  }
  return module.calToday(...args);
}

let _calGCevents = []; // cache de eventos de Google Calendar

async function renderCalendar(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.renderCalendar !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: renderCalendar');
  }
  return await module.renderCalendar(...args);
}

function openNuevaCitaFromCal(dateStr, hour) {
  showView('nueva');
  document.getElementById('ncDate').value = dateStr;
  document.getElementById('ncTime').value = pad(hour) + ':00';
  // Scroll al inicio del formulario
  const form = document.querySelector('.nc-form');
  if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}

// ══════════════════════════════════════════════════════════════
// ── VOZ ──
// ══════════════════════════════════════════════════════════════
let _voiceActive  = false;
let _voiceRec     = null;
let _voiceGotResult = false;

function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

function _voiceBtn()      { return document.getElementById('voiceBtn'); }
function _voiceStatusEl() { return document.getElementById('voiceStatus'); }

const VOICE_ICON = '🎙️ Dictar cita por voz';
const VOICE_STOP = '⏹ Detener escucha';

// ── Panel de voz (dictado por teclado iOS) ──
function toggleVoicePanel() {
  const panel = document.getElementById('voicePanel');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    document.getElementById('voiceText').value = '';
    setTimeout(() => document.getElementById('voiceText').focus(), 100);
  }
}

function procesarVozTexto() {
  const txt = (document.getElementById('voiceText').value || '').trim();
  if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
  _parseVoice(txt);
  document.getElementById('voicePanel').style.display = 'none';
  document.getElementById('voiceText').value = '';
}

function toggleVoice() {
  const SR = _getSR();
  if (!SR) {
    alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
    return;
  }
  if (_voiceActive) { _stopVoice(false); return; }
  _startVoice(SR);
}

function _startVoice(SR) {
  try {
    _voiceRec = new SR();
  } catch(e) {
    alert('No se pudo iniciar el micrófono: ' + e.message);
    return;
  }

  // Configuración optimizada para iOS Safari
  _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
  _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
  _voiceRec.interimResults  = false;
  _voiceRec.maxAlternatives = 1;

  _voiceActive    = true;
  _voiceGotResult = false;

  const btn = _voiceBtn();
  btn.classList.add('listening');
  btn.textContent = VOICE_STOP;
  _voiceStatusEl().style.display = 'flex';
  document.getElementById('voiceTranscript').textContent = '';
  document.getElementById('voiceHelp').style.display = 'none';

  _voiceRec.onresult = e => {
    _voiceGotResult = true;
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join(' ');
    document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
    _parseVoice(transcript);
  };

  _voiceRec.onerror = e => {
    if (e.error === 'not-allowed') {
      alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
    } else if (e.error === 'no-speech') {
      toast('No escuché nada. Toca el botón y habla claramente.', 'err');
    } else {
      toast('Error: ' + e.error, 'err');
    }
    _stopVoice(false);
  };

  _voiceRec.onend = () => {
    if (!_voiceGotResult) {
      // iOS para automáticamente — re-iniciar si no hubo resultado
      // (solo si el usuario no presionó "Detener")
      if (_voiceActive) {
        toast('Escuchando... habla ahora', 'ok');
        try { _voiceRec.start(); return; } catch(e) {}
      }
    }
    _stopVoice(false);
  };

  try {
    _voiceRec.start();
    toast('🎙 Escuchando... habla la cita', 'ok');
  } catch(e) {
    alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
    _stopVoice(false);
  }
}

function _stopVoice(showMsg = true) {
  _voiceActive = false;
  if (_voiceRec) {
    _voiceRec.onend = null; // evitar loop
    try { _voiceRec.stop(); } catch(e) {}
    _voiceRec = null;
  }
  const btn = _voiceBtn();
  if (btn) {
    btn.classList.remove('listening');
    btn.textContent = VOICE_ICON;
  }
  setTimeout(() => {
    const s = _voiceStatusEl();
    if (s) s.style.display = 'none';
  }, 3000);
}

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function _parseVoice(text) {
  const t = _norm(text);
  let filled = [];

  // ── FECHA ──
  let fecha = '';
  if      (/\bhoy\b/.test(t))    fecha = today();
  else if (/\bmanana\b/.test(t)) { const d=new Date(); d.setDate(d.getDate()+1); fecha=toDateStr(d); }
  else {
    const DIAS = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
    for (let i=0;i<DIAS.length;i++) {
      if (t.includes(DIAS[i])) {
        const d=new Date();
        const diff=(i-d.getDay()+7)%7||7;
        d.setDate(d.getDate()+diff);
        fecha=toDateStr(d);
        break;
      }
    }
    const dm = t.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/);
    if (dm) {
      const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      fecha = new Date().getFullYear()+'-'+pad(MESES.indexOf(dm[2])+1)+'-'+pad(parseInt(dm[1]));
    }
  }
  if (fecha) { document.getElementById('ncDate').value = fecha; filled.push('fecha'); }

  // ── HORA ──
  const tm = t.match(/(?:a\s+las?\s+)?(\d{1,2})(?:[:\s](\d{2}))?\s*(am|pm)/);
  const tm2 = !tm && t.match(/a\s+las?\s+(\d{1,2})(?:[:\s](\d{2}))?/);
  const match = tm || tm2;
  if (match) {
    let h = parseInt(match[1]);
    const min = match[2] ? parseInt(match[2]) : 0;
    const ampm = match[3];
    if      (ampm==='pm' && h<12) h+=12;
    else if (ampm==='am' && h===12) h=0;
    else if (!ampm && h>=1 && h<=6) h+=12; // 1-6 sin indicador → PM
    document.getElementById('ncTime').value = pad(h)+':'+pad(min);
    filled.push('hora');
  }

  // ── SERVICIO ──
  const SMAP = [
    [/descarga.*(cuello|espalda)|cuello.*espalda/, 'Descarga Muscular — Cuello y Espalda', false],
    [/descarga.*pierna|pierna.*descarga/,           'Descarga Muscular — Piernas',          false],
    [/descarga.*complet|completa/,                  'Descarga Muscular Completa',            false],
    [/valoracion/,                                  'Valoración Funcional',                 false],
    [/readaptacion/,                                'Readaptación Funcional',               false],
    [/espalda\s+sin\s+dolor/,                       'Plan Espalda Sin Dolor',               true ],
    [/alivio\s+profundo/,                           'Plan Alivio Profundo',                 true ],
    [/alivio.*casa|plan.*casa/,                     'Plan Alivio en Casa',                  true ],
    [/duo\s*mensual|plan\s*duo/,                    'Plan Dúo Mensual',                     true ],
    [/\bplan\s+recarga\b|\brecarga\b/,              'Plan Recarga',                         true ],
    [/\bplan\s+avanza\b|\bavanza\b/,                'Plan Avanza',                          true ],
    [/\belite\b/,                                   'Plan Elite',                           true ],
    [/\bplan\s+inicio\b|\binicio\b/,                'Plan Inicio',                          true ],
    [/\bplan\s+avance\b|\bavance\b/,                'Plan Avance',                          true ],
    [/\btransforma\b/,                              'Plan Transforma',                      true ],
  ];
  for (const [re, serv, isPlan] of SMAP) {
    if (re.test(t)) {
      const main = document.getElementById('ncServiceMain');
      const plan = document.getElementById('ncServicePlan');
      if (!isPlan) {
        main.value = serv;
        plan.style.display = 'none';
        document.getElementById('ncService').value = serv;
      } else {
        main.value = '__planes__';
        plan.style.display = 'block';
        plan.value = serv;
        document.getElementById('ncService').value = serv;
      }
      autoFillPrice();
      filled.push('servicio');
      break;
    }
  }

  // ── MODALIDAD ──
  if (/domicilio|a\s+domicilio|en\s+casa/.test(t)) {
    document.getElementById('ncMod').value = 'Domicilio';
    toggleNcAddress();
    filled.push('modalidad');
  } else if (/presencial/.test(t)) {
    document.getElementById('ncMod').value = 'Presencial';
    toggleNcAddress();
    filled.push('modalidad');
  }

  // ── PACIENTE — buscar "para [nombre]" ──
  const STOP_WORDS = new Set([
    'el','la','los','las','un','una','de','del','al','a','en','y','o',
    'que','se','con','por','como','hoy','manana','lunes','martes',
    'miercoles','jueves','viernes','sabado','domingo','para','las','los',
    'esta','este','ese','esa','su','sus','mi','mis','le','les','me','nos',
    'mas','pero','si','no','ya','hay','fue','ser','son','era'
  ]);
  // Palabras que terminan el nombre (señales de fin)
  const NAME_STOPPERS = /\b(el|la|los|las|hoy|manana|lunes|martes|miercoles|jueves|viernes|sabado|domingo|presencial|domicilio|descarga|valoracion|readaptacion|plan|para|a\s+las?)\b/i;

  const nm = text.match(/\bpara\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,4})/i);
  if (nm) {
    // Recortar el nombre en el primer stop-stopper
    let rawFull = nm[1].trim();
    const stopMatch = rawFull.match(NAME_STOPPERS);
    if (stopMatch) rawFull = rawFull.slice(0, stopMatch.index).trim();

    // Filtrar stop words del interior del nombre
    const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
    const rawName   = nameWords.join(' ');
    if (!rawName) { /* no se capturó nombre válido */ }
    else {
      const normName = _norm(rawName);
      // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
      const known = allData.citas.find(c => {
        const cn = _norm(c.nombre);
        const parts = normName.split(' ');
        // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
        return cn === normName
          || cn.includes(normName)
          || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
          || (parts.length === 1 && cn.startsWith(parts[0]));
      });
      if (known) {
        document.getElementById('ncName').value  = known.nombre;
        document.getElementById('ncPhone').value = known.telefono || '';
        document.getElementById('ncEmail').value = known.email    || '';
        if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
        filled.push('paciente (encontrado)');
      } else {
        document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
        filled.push('nombre');
      }
    }
  }

  if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
  else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
}

// ══════════════════════════════════════════════════════════════
// ── RECORDATORIOS ──
// ══════════════════════════════════════════════════════════════

// Mensajes predefinidos con el nombre del paciente
function msgSemana4(nombre) {
  const primero = nombre.split(' ')[0];
  return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya vamos en la semana 4 desde tu ultima descarga muscular — la proxima semana seria el momento ideal para hacerla antes de que el cuerpo empiece a acumular tension de nuevo. ¿Te agendo? \uD83D\uDCAA`;
}
function msgSemana5(nombre) {
  const primero = nombre.split(' ')[0];
  return `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya se cumplieron las 5 semanas desde tu ultima sesion de descarga — es el momento de reagendar. Mantener la frecuencia es lo que hace que los resultados se sostengan. ¿Te agendo esta semana? \uD83D\uDCAA`;
}
function waRecordatorio(tel, nombre, semanas) {
  const t = String(tel||'').replace(/\D/g,'');
  if (!t || t.length < 7) return null;
  const phone = t.length <= 10 ? '57'+t : t;
  const msg   = semanas === 4 ? msgSemana4(nombre) : msgSemana5(nombre);
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
}
```

### openNuevaCitaFromCal

```javascript
function openNuevaCitaFromCal(dateStr, hour) {
  showView('nueva');
  document.getElementById('ncDate').value = dateStr;
  document.getElementById('ncTime').value = pad(hour) + ':00';
  // Scroll al inicio del formulario
  const form = document.querySelector('.nc-form');
  if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}
```

### _parseVoice

```javascript
function _parseVoice(text) {
  const t = _norm(text);
  let filled = [];

  // ── FECHA ──
  let fecha = '';
  if      (/\bhoy\b/.test(t))    fecha = today();
  else if (/\bmanana\b/.test(t)) { const d=new Date(); d.setDate(d.getDate()+1); fecha=toDateStr(d); }
  else {
    const DIAS = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
    for (let i=0;i<DIAS.length;i++) {
      if (t.includes(DIAS[i])) {
        const d=new Date();
        const diff=(i-d.getDay()+7)%7||7;
        d.setDate(d.getDate()+diff);
        fecha=toDateStr(d);
        break;
      }
    }
    const dm = t.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/);
    if (dm) {
      const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      fecha = new Date().getFullYear()+'-'+pad(MESES.indexOf(dm[2])+1)+'-'+pad(parseInt(dm[1]));
    }
  }
  if (fecha) { document.getElementById('ncDate').value = fecha; filled.push('fecha'); }

  // ── HORA ──
  const tm = t.match(/(?:a\s+las?\s+)?(\d{1,2})(?:[:\s](\d{2}))?\s*(am|pm)/);
  const tm2 = !tm && t.match(/a\s+las?\s+(\d{1,2})(?:[:\s](\d{2}))?/);
  const match = tm || tm2;
  if (match) {
    let h = parseInt(match[1]);
    const min = match[2] ? parseInt(match[2]) : 0;
    const ampm = match[3];
    if      (ampm==='pm' && h<12) h+=12;
    else if (ampm==='am' && h===12) h=0;
    else if (!ampm && h>=1 && h<=6) h+=12; // 1-6 sin indicador → PM
    document.getElementById('ncTime').value = pad(h)+':'+pad(min);
    filled.push('hora');
  }

  // ── SERVICIO ──
  const SMAP = [
    [/descarga.*(cuello|espalda)|cuello.*espalda/, 'Descarga Muscular — Cuello y Espalda', false],
    [/descarga.*pierna|pierna.*descarga/,           'Descarga Muscular — Piernas',          false],
    [/descarga.*complet|completa/,                  'Descarga Muscular Completa',            false],
    [/valoracion/,                                  'Valoración Funcional',                 false],
    [/readaptacion/,                                'Readaptación Funcional',               false],
    [/espalda\s+sin\s+dolor/,                       'Plan Espalda Sin Dolor',               true ],
    [/alivio\s+profundo/,                           'Plan Alivio Profundo',                 true ],
    [/alivio.*casa|plan.*casa/,                     'Plan Alivio en Casa',                  true ],
    [/duo\s*mensual|plan\s*duo/,                    'Plan Dúo Mensual',                     true ],
    [/\bplan\s+recarga\b|\brecarga\b/,              'Plan Recarga',                         true ],
    [/\bplan\s+avanza\b|\bavanza\b/,                'Plan Avanza',                          true ],
    [/\belite\b/,                                   'Plan Elite',                           true ],
    [/\bplan\s+inicio\b|\binicio\b/,                'Plan Inicio',                          true ],
    [/\bplan\s+avance\b|\bavance\b/,                'Plan Avance',                          true ],
    [/\btransforma\b/,                              'Plan Transforma',                      true ],
  ];
  for (const [re, serv, isPlan] of SMAP) {
    if (re.test(t)) {
      const main = document.getElementById('ncServiceMain');
      const plan = document.getElementById('ncServicePlan');
      if (!isPlan) {
        main.value = serv;
        plan.style.display = 'none';
        document.getElementById('ncService').value = serv;
      } else {
        main.value = '__planes__';
        plan.style.display = 'block';
        plan.value = serv;
        document.getElementById('ncService').value = serv;
      }
      autoFillPrice();
      filled.push('servicio');
      break;
    }
  }

  // ── MODALIDAD ──
  if (/domicilio|a\s+domicilio|en\s+casa/.test(t)) {
    document.getElementById('ncMod').value = 'Domicilio';
    toggleNcAddress();
    filled.push('modalidad');
  } else if (/presencial/.test(t)) {
    document.getElementById('ncMod').value = 'Presencial';
    toggleNcAddress();
    filled.push('modalidad');
  }

  // ── PACIENTE — buscar "para [nombre]" ──
  const STOP_WORDS = new Set([
    'el','la','los','las','un','una','de','del','al','a','en','y','o',
    'que','se','con','por','como','hoy','manana','lunes','martes',
    'miercoles','jueves','viernes','sabado','domingo','para','las','los',
    'esta','este','ese','esa','su','sus','mi','mis','le','les','me','nos',
    'mas','pero','si','no','ya','hay','fue','ser','son','era'
  ]);
  // Palabras que terminan el nombre (señales de fin)
  const NAME_STOPPERS = /\b(el|la|los|las|hoy|manana|lunes|martes|miercoles|jueves|viernes|sabado|domingo|presencial|domicilio|descarga|valoracion|readaptacion|plan|para|a\s+las?)\b/i;

  const nm = text.match(/\bpara\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,4})/i);
  if (nm) {
    // Recortar el nombre en el primer stop-stopper
    let rawFull = nm[1].trim();
    const stopMatch = rawFull.match(NAME_STOPPERS);
    if (stopMatch) rawFull = rawFull.slice(0, stopMatch.index).trim();

    // Filtrar stop words del interior del nombre
    const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
    const rawName   = nameWords.join(' ');
    if (!rawName) { /* no se capturó nombre válido */ }
    else {
      const normName = _norm(rawName);
      // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
      const known = allData.citas.find(c => {
        const cn = _norm(c.nombre);
        const parts = normName.split(' ');
        // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
        return cn === normName
          || cn.includes(normName)
          || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
          || (parts.length === 1 && cn.startsWith(parts[0]));
      });
      if (known) {
        document.getElementById('ncName').value  = known.nombre;
        document.getElementById('ncPhone').value = known.telefono || '';
        document.getElementById('ncEmail').value = known.email    || '';
        if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
        filled.push('paciente (encontrado)');
      } else {
        document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
        filled.push('nombre');
      }
    }
  }

  if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
  else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
}
```

### agendarDesdePacienteRec

```javascript
function agendarDesdePacienteRec(encNombre, encTel, encEmail) {
  const nombre   = decodeURIComponent(encNombre);
  const telefono = decodeURIComponent(encTel);
  const email    = decodeURIComponent(encEmail);
  showView('nueva');
  document.getElementById('ncName').value  = nombre;
  document.getElementById('ncPhone').value = telefono;
  document.getElementById('ncEmail').value = email;
  document.getElementById('pacSearch').value = nombre + (telefono ? ' — ' + telefono : '');
  toast('Datos de ' + nombre.split(' ')[0] + ' cargados. Completa fecha, hora y servicio.');
}
```

### agendarDesdeSeg

```javascript
function agendarDesdeSeg(encNombre, encTel, encEmail) {
  showView('nueva');
  document.getElementById('ncName').value  = decodeURIComponent(encNombre);
  document.getElementById('ncPhone').value = decodeURIComponent(encTel);
  document.getElementById('ncEmail').value = decodeURIComponent(encEmail);
  document.getElementById('pacSearch').value = decodeURIComponent(encNombre);
  toast('Datos cargados. Completa fecha, hora y servicio.');
}
```


## Código exacto de excluidas

