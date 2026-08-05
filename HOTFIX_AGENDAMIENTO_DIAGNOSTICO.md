# Diagnóstico aislado — agendamiento

## Campos detectados

- Envío individual: email, service, modality, priceP, priceD, address, notes, notaAdmin, canal
- Base de envío múltiple: email, service, modality, priceP, priceD, address, notes, notaAdmin, canal
- Payload por fecha: no detectados

## Indicadores

- Individual usa POST: false
- Múltiple usa POST: false
- Múltiple oculta d.error: true
- doPost termina en createBooking(d, false): true
- Backend revisa d.time: true
- Backend revisa d.date: true
- Backend revisa d.name: true
- Backend revisa d.services: false

## submitAdminBooking

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

## submitAdminBookingMulti

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

## doPost

```javascript
function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === 'professionalLogin') {
      return js(professionalLogin_(d.user, d.password));
    }
    if (d.action === 'professionalChangePassword') {
      return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
    }
    if (d.action === 'professionalMarkAttended') {
      return js(professionalMarkAttended_(d.token, d.citaId));
    }
    if (d.action === 'professionalReportIssue') {
      return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
    }
    if (d.action === 'adminLogin') {
      if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
      var loginUser = ('' + (d.user || '')).trim();
      if (loginUser) {
        var pro = getProfessionalByLogin_(loginUser);
        if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
          recordLoginFail();
          return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
        }
        resetLoginFails();
        var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
        var auxToken = createSession(auxUser);
        var auxData = getAdminData();
        auxData.sessionToken = auxToken;
        auxData.currentUser = auxUser;
        return js(auxData);
      }
      if (!d.password || d.password !== ADMIN_TOKEN) {
        recordLoginFail();
        return js({ok: false, error: 'Credenciales incorrectas'});
      }
      resetLoginFails();
      var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
      var adminData = getAdminData();
      adminData.sessionToken = sessionToken;
      adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
      return js(adminData);
    }
    if (d.action === 'changePassword') {
      if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
      var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
      var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
      if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
      if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
      PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
      return js({ok: true});
    }
    if (d.action === 'savePayment') {
      if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
      var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
      return js(savePayment_(d.data || {}, postUser));
    }
    if (d.action === 'verifyPayment') {
      if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
      var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
      var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
      return js(verifyPayment_(d, postUser2));
    }
    if (d.action === 'generateEval') {
      if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
      return js(generateEvalReport(d.data, d.photos || {}));
    }
    return js(createBooking(d, false));
  } catch(err) {
    try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
    return js({ok: false, error: err.message});
  }
}
```

## createBooking

```javascript
function createBooking(d, isAdmin) {
  ensureCitasStateColumns_();
  if (isMidnightBookingTime_(d.time)) {
    return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
  }
  var scheduleCheck = isAdmin
    ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
    : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
  if (!scheduleCheck.ok) {
    return {ok: false, error: scheduleCheck.error};
  }
  if (!isAdmin) {
    var avail = checkAvailability(d.date, d.time, d.modality, d.service);
    if (!avail.available) return {ok: false, error: avail.reason};
  }

  var soloRegistro = esRegistro(d.service);

  // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
  if (soloRegistro) {
    upsertPaciente(d.name, d.phone, d.email);
    return {ok: true, id: 'REG-' + new Date().getTime()};
  }

  // Lock para evitar duplicados por peticiones simultÃ¡neas (race condition)
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch(e) { return {ok: false, error: 'Sistema ocupado, intenta de nuevo'}; }

  try {
  var price = d.priceSelected || (d.modality === 'Domicilio'
    ? d.priceD
    : (d.modality === 'Sede Campestre Recovery' ? (d.priceRecovery || d.priceP) : d.priceP));

  // Dedup: si ya existe una cita con mismo nombre+fecha+hora, devolver la existente
  var ss     = getOrCreateSheet();
  var cSheet = ss.getSheetByName('Citas');
  var cRows  = cSheet.getDataRange().getValues();
  var nameNorm = (d.name || '').toLowerCase().trim();
  for (var i = 1; i < cRows.length; i++) {
    var rowName   = ('' + (cRows[i][2]  || '')).toLowerCase().trim();
    var rowDate   = sd(cRows[i][7]);
    var rowTime   = st(cRows[i][8]);
    var rowStatus = ('' + (cRows[i][10] || '')).trim();
    if (rowName === nameNorm && rowDate === d.date && rowTime === d.time && rowStatus !== 'Cancelada') {
      return {ok: true, id: cRows[i][0]};
    }
  }

  // Crear evento en Google Calendar
  var cal   = CalendarApp.getDefaultCalendar();
  var start = parseDT(d.date, d.time);
  var mins  = getServiceDuration(d.service) + (d.modality === 'Domicilio' ? 30 : 0);
  var end   = new Date(start.getTime() + mins * 60000);
  var event = cal.createEvent('[CITA] ' + d.service + ' - ' + d.name, start, end, {
    description: buildDesc(d, price),
    location: d.modality === 'Domicilio'
      ? (d.address || 'Domicilio - direccion por confirmar')
      : (d.modality === 'Sede Campestre Recovery'
        ? 'Sede Campestre Recovery - ubicacion compartida al confirmar'
        : 'Ubicacion compartida al confirmar la reserva')
  });
  event.addEmailReminder(60);
  event.addPopupReminder(30);

  // Guardar en Google Sheets (solo citas reales)
  var clientTs = Number(d.clientTimestamp || 0);
  var id    = 'C' + (clientTs > 0 ? clientTs : new Date().getTime());
  var phoneClean = ('' + (d.phone||'')).replace(/\D/g,'');
  var rawAdminNote = '' + (d.notaAdmin || '');
  var codeNote = d.codigoReserva && rawAdminNote.indexOf(d.codigoReserva) === -1 ? '[CODIGO RESERVA: ' + d.codigoReserva + ']' : '';
  var adminNote = [rawAdminNote, codeNote].filter(Boolean).join(' ');
  cSheet.appendRow([
    id,
    new Date().toLocaleString('es-CO'),
    d.name, phoneClean, d.email,
    d.service, d.modality,
    d.date, d.time, price,
    isAdmin ? (start < new Date() ? 'Atendida' : 'Confirmada') : 'Pendiente de pago',
    d.address || '', d.notes || '', adminNote
  ]);
  var stateMap = ensureCitasStateColumns_();
  var lastRow = cSheet.getLastRow();
  var initialPaymentStatus = PAYMENT_STATUS.PENDIENTE_PAGO;
  var initialAppointmentStatus = APPOINTMENT_STATUS.RESERVADA;
  var reservationHoldMinutes = Number(operationConfigValue_('reserva_temporal_minutos', '60')) || 60;
  var reservationExpiresAt = new Date(new Date().getTime() + reservationHoldMinutes * 60000);
  cSheet.getRange(lastRow, stateMap.EstadoPago).setValue(initialPaymentStatus);
  cSheet.getRange(lastRow, stateMap.EstadoCita).setValue(initialAppointmentStatus);
  cSheet.getRange(lastRow, stateMap.EstadoMigracionOrigen).setValue(isAdmin ? 'CREADA_ADMIN' : 'RESERVA_PUBLICA');
  cSheet.getRange(lastRow, stateMap.FechaMigracionEstado).setValue(new Date());
  if (stateMap.VenceReserva) cSheet.getRange(lastRow, stateMap.VenceReserva).setValue(isAdmin ? '' : reservationExpiresAt);
  // Forzar columna Telefono como texto para evitar #ERROR! en Sheets
  cSheet.getRange(lastRow, 4).setNumberFormat('@').setValue(phoneClean);

  // Guardar/actualizar paciente en hoja Pacientes
  upsertPaciente(d.name, d.phone, d.email);

  // No enviar correos cuando la cita la crea el admin
  if (isAdmin) return {ok: true, id: id};

  // Para citas reales: enviar todos los correos y WhatsApp
  var tel  = (d.phone || '').replace(/\D/g,'');
  if (tel.length <= 10) tel = '57' + tel;
  var _waDias = ['domingo','lunes','martes','miÃ©rcoles','jueves','viernes','sÃ¡bado'];
  var _waMeses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var _waDP = d.date.split('-');
  var _waFechaObj = new Date(+_waDP[0], +_waDP[1]-1, +_waDP[2]);
  var _waFecha = _waDias[_waFechaObj.getDay()] + ' ' + +_waDP[2] + ' de ' + _waMeses[+_waDP[1]-1];
  var waConfirm = 'Reserva temporal creada, ' + d.name.split(' ')[0] + '.\n\n' +
    d.service + '\n' +
    _waFecha + ' Â· ' + d.time + ' Â· ' + d.modality + '\n' +
    'Codigo de reserva: ' + (d.codigoReserva || reservationCodeFor_(id, d.date)) + '\n' +
    'Valor: ' + price + '\n\n' +
    'Para confirmar tu cita debes realizar el pago anticipado y enviar el comprobante. La cita queda autorizada solo cuando administracion confirme el pago.\n' +
    'Cuidandote Fisioterapia';
  var waLink = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(waConfirm);

  GmailApp.sendEmail(
    JESSICA_EMAIL,
    'Nueva cita: ' + d.name + ' - ' + d.service + ' | ' + d.date,
    buildEmailJessica(d, price) + '\n\n>> Confirmar al paciente por WhatsApp (1 clic):\n' + waLink + '\n\nID cita: ' + id
  );

  if (d.email && d.email.indexOf('@') > 0) {
    GmailApp.sendEmail(
      d.email,
      'Reserva temporal creada - Cuidandote Fisioterapia',
      'Tu horario quedo reservado temporalmente. Para confirmar la cita debes realizar el pago anticipado y enviar el comprobante.',
      {htmlBody: buildEmailCliente(d, price), name: 'Cuidándote Fisioterapia'}
    );
  }

  return {ok: true, id: id};
  } finally {
    lock.releaseLock();
  }
}
```
