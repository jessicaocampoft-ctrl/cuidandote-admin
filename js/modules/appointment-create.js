/* Cuidándote Fisioterapia — creación de citas. */
(function (global) {
  'use strict';

function bookWaitPatient(id) {
  const p = _getWaitList().find(x => x.id === id); if (!p) return;
  showView('nueva');
  document.getElementById('ncName').value = p.nombre;
  document.getElementById('ncPhone').value = p.telefono;
  if (p.servicio) document.getElementById('ncService').value = p.servicio;
  toast('Datos cargados. Completa fecha, hora y servicio.');
}

function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }

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

function validateNoMidnight(time, contexto='la cita') {
  if (!isMidnightTime(time)) return true;
  toast(`Esa hora es de medianoche. Para ${contexto} al mediodía usa 12:00.`, 'err');
  return false;
}

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
  const label = document.getElementById('ncSubmitLabel');
  const origLabel = label.textContent;
  btn.disabled = true;

  const restoreSubmitButton = () => {
    _submittingBooking = false;
    btn.disabled = false;
    label.textContent = origLabel;
  };

  // Confirmar que la sesión administrativa siga activa antes de enviar datos.
  try {
    const pingResponse = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`);
    const pingData = await pingResponse.json();
    if (!pingData.ok) {
      restoreSubmitButton();
      const sessionExpired = String(pingData.error || '').toLowerCase().includes('permiso');
      toast(sessionExpired
        ? 'Tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'
        : 'No se pudo validar tu sesión: ' + (pingData.error || 'respuesta inválida del servidor.'), 'err');
      return;
    }
  } catch (error) {
    restoreSubmitButton();
    toast('No se pudo conectar con el servidor para validar la sesión. Revisa la conexión e inténtalo nuevamente.', 'err');
    return;
  }

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
  const erroresDetalle = [];
  for (let i = 0; i < fechas.length; i++) {
    document.getElementById('ncSubmitLabel').textContent = `Creando ${i+1}/${fechas.length}...`;
    const data = { ...baseData, date: fechas[i].date, time: fechas[i].time };
    try {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
      const d = await r.json();
      if (d.ok) {
        creadas++;
      } else {
        errores++;
        erroresDetalle.push(d.error || 'El servidor rechazó la cita.');
      }
    } catch(e) {
      errores++;
      erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');
    }

    // Segunda persona: usa la misma fecha pero la hora calculada
    if (_duoActive && duoData) {
      const time2  = document.getElementById('nc2Time').value;
      const data2  = { ...duoData, date: fechas[i].date, time: time2 };
      document.getElementById('ncSubmitLabel').textContent = `Creando turno 2/${fechas.length}...`;
      try {
        const r2 = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data2))}`);
        const d2 = await r2.json();
        if (d2.ok) {
          creadas++;
        } else {
          errores++;
          erroresDetalle.push(d2.error || 'El servidor rechazó la cita de la segunda persona.');
        }
      } catch(e) {
        errores++;
        erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');
      }
    }
  }

  restoreSubmitButton();

  if (errores > 0) {
    const detalle = [...new Set(erroresDetalle.filter(Boolean))].join(' · ') || 'El servidor no explicó el motivo.';
    const sessionExpired = detalle.toLowerCase().includes('sin permiso');
    if (creadas === 0) {
      toast(sessionExpired
        ? 'No se creó la cita porque tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'
        : 'No se creó la cita: ' + detalle, 'err');
    } else {
      toast(`${creadas} cita${creadas!==1?'s':''} creada${creadas!==1?'s':''} · ${errores} sin crear: ${detalle}`, 'warn');
    }
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

function toggleNcAddress() {
  const m = document.getElementById('ncMod').value;
  document.getElementById('ncAddrWrap').style.display = m==='Domicilio' ? 'block' : 'none';
}

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

function checkDomicilioWarn() {
  const serv = document.getElementById('ncService').value;
  const mod  = document.getElementById('ncMod').value;
  const warn = document.getElementById('ncDomicilioWarn');
  if (warn) warn.style.display = (mod === 'Domicilio' && soloPresencial.includes(serv)) ? 'block' : 'none';
}

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

function openNuevaCitaFromCal(dateStr, hour) {
  showView('nueva');
  document.getElementById('ncDate').value = dateStr;
  document.getElementById('ncTime').value = pad(hour) + ':00';
  // Scroll al inicio del formulario
  const form = document.querySelector('.nc-form');
  if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}

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

function agendarDesdeSeg(encNombre, encTel, encEmail) {
  showView('nueva');
  document.getElementById('ncName').value  = decodeURIComponent(encNombre);
  document.getElementById('ncPhone').value = decodeURIComponent(encTel);
  document.getElementById('ncEmail').value = decodeURIComponent(encEmail);
  document.getElementById('pacSearch').value = decodeURIComponent(encNombre);
  toast('Datos cargados. Completa fecha, hora y servicio.');
}

  global.PanelAppointmentCreate = Object.freeze({
    bookWaitPatient,
    agendarHoy,
    calcAbono,
    validateNoMidnight,
    submitAdminBookingMulti,
    agendarDesdePaciente,
    toggleNcAddress,
    _updateDuoTime,
    checkDomicilioWarn,
    updateSesionesInfo,
    calcConvenio,
    autoFillPrice,
    submitAdminBooking,
    fillPatient,
    clearNuevaCita,
    checkTimeConflict,
    openNuevaCitaFromCal,
    agendarDesdePacienteRec,
    agendarDesdeSeg
  });
})(window);
