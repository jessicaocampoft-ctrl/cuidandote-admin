/* Cuidándote Fisioterapia — módulo aislado de Pagos. */
(function (global) {
  'use strict';

async function loadOperationsData() {
  if (!TOKEN) return operationsData;
  try {
    const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
    if (d.ok) operationsData = d;
  } catch(e) {
    console.warn('No se pudo cargar Pagos', e);
  }
  return operationsData;
}

async function setupOperationsModuleUI() {
  const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
  if (d.ok) {
    await loadOperationsData();
    renderPagos();
    toast('Módulo de pagos inicializado');
  } else toast(d.error || 'No se pudo inicializar', 'err');
}

function paymentAccountLabel(id) {
  const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
  return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
}

function paymentCandidateAppointments() {
  const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
  return (allData.citas || [])
    .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
    .sort((a,b) => {
      const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
      const pa = priority(a.estado), pb = priority(b.estado);
      if (pa !== pb) return pa - pb;
      return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
    })
    .slice(0, 160);
}

function renderPaymentAppointmentList() {
  const list = document.getElementById('paymentAppointmentList');
  if (!list) return;
  const selectedId = document.getElementById('payCitaId')?.value || '';
  const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
  const citas = paymentCandidateAppointments().filter(c => {
    const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
    return !q || hay.includes(q);
  }).slice(0, 60);
  list.innerHTML = citas.length ? citas.map(c => {
    const active = String(c.id) === String(selectedId);
    const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
    return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div>
          <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
          <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
        </div>
        <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
        <span class="team-muted">ID ${esc(c.id || '')}</span>
        <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
      </div>
    </button>`;
  }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
}

function selectPaymentAppointment(id) {
  const citaSel = document.getElementById('payCitaId');
  if (citaSel) citaSel.value = id || '';
  prefillPaymentFromAppointment();
  renderPaymentAppointmentList();
}

function updateSelectedPaymentCard(c) {
  const card = document.getElementById('selectedPaymentCard');
  if (!card) return;
  if (!c) {
    card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
    return;
  }
  card.innerHTML = `
    <div class="team-card-head">
      <div>
        <h3>${esc(c.nombre || 'Paciente')}</h3>
        <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
      </div>
      <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
      <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
      <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
    </div>`;
}

function updatePaymentProofLabel() {
  const file = document.getElementById('payProofFile')?.files?.[0];
  const label = document.getElementById('payProofLabel');
  if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
}

function fillPaymentSelectors(selectedId = '') {
  const citas = paymentCandidateAppointments();
  const citaSel = document.getElementById('payCitaId');
  if (citaSel) {
    citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
  }
  const medioSel = document.getElementById('payMedioPago');
  if (medioSel) {
    medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
  }
  prefillPaymentFromAppointment();
  renderPaymentAppointmentList();
}

function prefillPaymentFromAppointment() {
  const id = document.getElementById('payCitaId')?.value || '';
  const c = (allData.citas || []).find(x => String(x.id) === String(id));
  updateSelectedPaymentCard(c);
  if (!c) return;
  document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
  if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
}

function clearPaymentForm() {
  ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const c = document.getElementById('payCitaId'); if (c) c.value = '';
  updatePaymentProofLabel();
  updateSelectedPaymentCard(null);
  renderPaymentAppointmentList();
}

function abrirPagoCita(id) {
  showView('pagos');
  setTimeout(() => {
    fillPaymentSelectors(id);
    const el = document.getElementById('payValorRecibido');
    if (el) el.focus();
  }, 350);
}

async function saveManualPayment(mode = 'verify') {
  const statusEl = document.getElementById('payActionStatus');
  const verifyBtn = document.getElementById('payVerifyBtn');
  const approveBtn = document.getElementById('payApproveBtn');
  const setStatus = (message = '', tone = 'info') => {
    if (!statusEl) return;
    if (!message) {
      statusEl.style.display = 'none';
      statusEl.textContent = '';
      return;
    }
    const tones = {
      info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
      ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
      err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
    };
    const colors = tones[tone] || tones.info;
    statusEl.style.display = 'block';
    statusEl.style.background = colors[0];
    statusEl.style.color = colors[1];
    statusEl.style.border = '1px solid ' + colors[2];
    statusEl.textContent = message;
  };

  const citaEl = document.getElementById('payCitaId');
  const valorEl = document.getElementById('payValorRecibido');
  const fechaEl = document.getElementById('payFechaPago');
  const medioEl = document.getElementById('payMedioPago');
  const refEl = document.getElementById('payComprobante');
  const obsEl = document.getElementById('payObservaciones');

  const citaId = citaEl?.value || '';
  const valorRecibido = valorEl?.value.trim() || '';
  const fechaPago = fechaEl?.value || '';
  const medioPago = medioEl?.value || '';
  const ref = refEl?.value.trim() || '';
  const observaciones = obsEl?.value.trim() || '';

  if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
  if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
  if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
  if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }

  const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
  if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }

  if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;

  const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
  const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
  if (verifyBtn) verifyBtn.disabled = true;
  if (approveBtn) approveBtn.disabled = true;
  if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
  if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
  setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');

  try {
    const proofFile = await readPaymentProofFile();
    if (proofFile?.error) throw new Error(proofFile.error);
    if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');

    const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
    const payload = {
      citaId,
      cliente: c.nombre || '',
      servicioPlan: c.servicio || '',
      valorEsperado: c.precio || '',
      valorRecibido,
      medioPago,
      cuentaReceptora: accountId,
      fechaPago,
      comprobante: ref,
      estadoPago: 'COMPROBANTE_RECIBIDO',
      observaciones,
      proofFile: proofFile || null
    };

    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
    }, 45000);
    if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
    if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');

    if (mode === 'approve') {
      const obs = observaciones || 'Pago confirmado desde registro de comprobante';
      const verifyUrl = APPS_SCRIPT_URL
        + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
        + '&id=' + encodeURIComponent(d.id)
        + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
      const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
      if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
      setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
      toast('Pago confirmado y cita autorizada');
    } else {
      setStatus('Comprobante guardado para revisión.', 'ok');
      toast('Comprobante subido para revisión');
    }

    clearPaymentForm();
    await reload();
    await loadOperationsData();
    renderPagos();
    renderAgenda(true);
  } catch (error) {
    console.error('Error al guardar el pago:', error);
    const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
    setStatus(message, 'err');
    toast(message, 'err');
  } finally {
    if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
    if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
  }
}

function readPaymentProofFile() {
  const input = document.getElementById('payProofFile');
  const file = input?.files?.[0];
  if (!file) return Promise.resolve(null);
  const allowed = ['image/jpeg','image/png','application/pdf'];
  if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
  if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
    reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
    reader.readAsDataURL(file);
  });
}

async function verifyPayment(id, status) {
  const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
  if (!confirm(`¿Confirmas ${label}?`)) return;
  const obs = prompt('Observación opcional para auditoría:', '') || '';
  const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
  if (d.ok) {
    toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
    await reload();
    await loadOperationsData();
    renderPagos();
  } else toast(d.error || 'No se pudo verificar', 'err');
}

function renderPagos() {
  fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
  const pagos = operationsData.pagos || [];
  const pagosUnicos = [];
  const seenPayments = new Set();
  pagos.forEach(p => {
    const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
    if (seenPayments.has(key)) return;
    seenPayments.add(key);
    pagosUnicos.push(p);
  });
  const cuentas = operationsData.cuentas || [];
  const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
  const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
  const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
  document.getElementById('pagosStats').innerHTML = [
    ['Por verificar', porVerificar],
    ['Aprobados', aprobados],
    ['Rechazados', rechazados],
    ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
  ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');

  document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
    .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
    .map(a => `<div class="team-card">
      <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
      <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
    </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';

  document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
    const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
    return `<div class="team-card">
      <div class="team-card-head">
        <div>
          <h3>${esc(p.Cliente || 'Cliente')}</h3>
          <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
        </div>
        <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
      </div>
      <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
      ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
      ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
      <div class="team-card-actions">
        ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
        ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
      </div>
    </div>`;
  }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';

  const planTemplates = operationsData.plantillasPlanes || [];
  const clientPlans = operationsData.planesCliente || [];
  const settlements = operationsData.liquidaciones || [];
  const history = operationsData.historialEstados || [];
  document.getElementById('plansAuditList').innerHTML = `
    <div class="team-card">
      <h3>Plantillas de planes</h3>
      <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
    </div>
    <div class="team-card">
      <h3>Planes de clientes</h3>
      <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
    </div>
    <div class="team-card">
      <h3>Liquidaciones profesionales</h3>
      <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
    </div>
    <div class="team-card">
      <h3>Últimos cambios de estado</h3>
      <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
    </div>`;
}

function openPago(citaId) {
  showView('pagos');
  setTimeout(() => {
    if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
    const selector = document.getElementById('payCitaId');
    if (selector) {
      selector.value = citaId || '';
      selector.dispatchEvent(new Event('change', { bubbles: true }));
      selector.focus();
      selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
    }
  }, 100);
}

  global.PanelPayments = Object.freeze({
    loadOperationsData,
    setupOperationsModuleUI,
    paymentAccountLabel,
    paymentCandidateAppointments,
    renderPaymentAppointmentList,
    selectPaymentAppointment,
    updateSelectedPaymentCard,
    updatePaymentProofLabel,
    fillPaymentSelectors,
    prefillPaymentFromAppointment,
    clearPaymentForm,
    abrirPagoCita,
    saveManualPayment,
    readPaymentProofFile,
    verifyPayment,
    renderPagos,
    openPago
  });
})(window);
