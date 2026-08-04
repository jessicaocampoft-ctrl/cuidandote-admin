# Contexto exacto del flujo de pagos

Archivo: `index.html`

## Texto del botón

Coincidencias: 2

### Coincidencia 1 — línea 3542

```html
3507:                 <div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>
3508:               </div>
3509: 
3510:               <div class="form-grid g2" style="gap:12px">
3511:                 <div class="field">
3512:                   <label>Valor recibido</label>
3513:                   <input id="payValorRecibido" type="text" placeholder="Ej: 70000">
3514:                 </div>
3515:                 <div class="field">
3516:                   <label>Fecha del pago</label>
3517:                   <input id="payFechaPago" type="date">
3518:                 </div>
3519:                 <div class="field" style="grid-column:1/-1">
3520:                   <label>Medio de pago</label>
3521:                   <select id="payMedioPago"></select>
3522:                 </div>
3523:                 <div class="field" style="grid-column:1/-1">
3524:                   <label>Pantallazo / comprobante</label>
3525:                   <label for="payProofFile" style="display:flex;align-items:center;justify-content:center;min-height:92px;border:1.5px dashed var(--primary);border-radius:14px;background:rgba(20,184,166,.07);cursor:pointer;text-align:center;padding:16px">
3526:                     <span id="payProofLabel" style="color:var(--text);font-weight:700">Subir pantallazo del pago</span>
3527:                   </label>
3528:                   <input id="payProofFile" type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" onchange="updatePaymentProofLabel()" style="display:none">
3529:                   <small style="display:block;margin-top:6px;color:var(--muted)">JPG, PNG o PDF · máximo 8 MB · solo visible para administración.</small>
3530:                 </div>
3531:                 <div class="field" style="grid-column:1/-1">
3532:                   <label>Referencia u observación opcional</label>
3533:                   <input id="payComprobante" type="text" placeholder="Ej: pago enviado por Nequi, referencia 1234">
3534:                 </div>
3535:                 <div class="field" style="grid-column:1/-1">
3536:                   <label>Nota interna</label>
3537:                   <textarea id="payObservaciones" rows="2" placeholder="Ej: revisar banco antes de autorizar"></textarea>
3538:                 </div>
3539:               </div>
3540:               <div class="team-card-actions" style="gap:8px;flex-wrap:wrap">
3541:                 <button id="payVerifyBtn" class="btn btn-ghost" onclick="saveManualPayment('verify')">Subir para revisar</button>
3542:                 <button id="payApproveBtn" class="btn btn-teal" onclick="saveManualPayment('approve')">Confirmar pago y autorizar</button>
3543:                 <button class="btn btn-ghost" onclick="clearPaymentForm()">Limpiar</button>
3544:               </div>
3545:               <div id="payActionStatus" role="status" aria-live="polite" style="display:none;margin-top:10px;padding:10px 12px;border-radius:10px;font-size:.84rem;font-weight:700"></div>
3546:             </div>
3547:           </div>
3548:         </div>
3549: 
3550:         <div class="team-panel">
3551:           <h2>Cuentas oficiales</h2>
3552:           <div id="paymentAccountsList" class="team-list"></div>
3553:         </div>
3554:       </div>
3555: 
3556:       <div class="team-grid" style="margin-top:16px">
3557:         <div class="team-panel">
3558:           <h2>Pagos registrados</h2>
3559:           <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
3560:             <button class="btn btn-ghost btn-sm" onclick="exportPaymentsCSV()">Exportar pagos CSV</button>
3561:             <button class="btn btn-ghost btn-sm" onclick="exportOperationsAuditCSV()">Exportar auditoría CSV</button>
3562:           </div>
3563:           <div id="paymentsList" class="team-list"></div>
3564:         </div>
3565:         <div class="team-panel">
3566:           <h2>Planes y auditoría</h2>
3567:           <div id="plansAuditList" class="team-list"></div>
3568:         </div>
3569:       </div>
3570:     </section>
3571: 
3572:     <!-- ── FINANZAS ── -->
3573:     <section id="vFinanzas" style="display:none">
3574:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
3575:         <div>
3576:           <h1 class="page-title"><em>Módulo</em> Financiero</h1>
3577:           <p class="page-sub">Ingresos reales, tendencias y exportación de reportes</p>
```

### Coincidencia 2 — línea 6929

```html
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
6899:     statusEl.style.color = colors[1];
6900:     statusEl.style.border = '1px solid ' + colors[2];
6901:     statusEl.textContent = message;
6902:   };
6903: 
6904:   const citaEl = document.getElementById('payCitaId');
6905:   const valorEl = document.getElementById('payValorRecibido');
6906:   const fechaEl = document.getElementById('payFechaPago');
6907:   const medioEl = document.getElementById('payMedioPago');
6908:   const refEl = document.getElementById('payComprobante');
6909:   const obsEl = document.getElementById('payObservaciones');
6910: 
6911:   const citaId = citaEl?.value || '';
6912:   const valorRecibido = valorEl?.value.trim() || '';
6913:   const fechaPago = fechaEl?.value || '';
6914:   const medioPago = medioEl?.value || '';
6915:   const ref = refEl?.value.trim() || '';
6916:   const observaciones = obsEl?.value.trim() || '';
6917: 
6918:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
6919:   if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
6920:   if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
6921:   if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }
6922: 
6923:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6924:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6925: 
6926:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6927: 
6928:   const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
6929:   const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
6930:   if (verifyBtn) verifyBtn.disabled = true;
6931:   if (approveBtn) approveBtn.disabled = true;
6932:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6933:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6940: 
6941:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6942:     const payload = {
6943:       citaId,
6944:       cliente: c.nombre || '',
6945:       servicioPlan: c.servicio || '',
6946:       valorEsperado: c.precio || '',
6947:       valorRecibido,
6948:       medioPago,
6949:       cuentaReceptora: accountId,
6950:       fechaPago,
6951:       comprobante: ref,
6952:       estadoPago: 'COMPROBANTE_RECIBIDO',
6953:       observaciones,
6954:       proofFile: proofFile || null
6955:     };
6956: 
6957:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6958:       method: 'POST',
6959:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
```

## Selector de cita

Coincidencias: 9

### Coincidencia 1 — línea 3489

```html
3454:     <!-- Modal plantilla paquete -->
3455:     <div class="modal-bg" id="modalPlantillaPaquete" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1200;align-items:center;justify-content:center">
3456:       <div class="modal" style="max-width:400px">
3457:         <div class="modal-title">Nueva plantilla</div>
3458:         <div class="field"><label>Nombre *</label><input type="text" id="ptNombre" placeholder="Pack 6 sesiones descarga"></div>
3459:         <div class="field"><label>Sesiones *</label><input type="number" id="ptSesiones" min="1" placeholder="6"></div>
3460:         <div class="field"><label>Precio total (COP)</label><input type="text" id="ptPrecio" placeholder="420.000"></div>
3461:         <div class="field"><label>Vigencia (días)</label><input type="number" id="ptVigencia" placeholder="60"></div>
3462:         <div class="field"><label>Servicios cubiertos</label><input type="text" id="ptServicios" placeholder="Descarga muscular, Valoración..."></div>
3463:         <div style="display:flex;gap:10px;margin-top:18px">
3464:           <button class="btn btn-teal" onclick="guardarPlantillaPaquete()">Guardar</button>
3465:           <button class="btn btn-ghost" onclick="document.getElementById('modalPlantillaPaquete').style.display='none'">Cancelar</button>
3466:         </div>
3467:       </div>
3468:     </div>
3469: 
3470:     <!-- ── PAGOS OPERATIVOS ── -->
3471:     <section id="vPagos" style="display:none">
3472:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
3473:         <div>
3474:           <h1 class="page-title"><em>Pagos</em> y autorizaciones</h1>
3475:           <p class="page-sub">Registro de pagos, cuentas oficiales, verificación administrativa e historial seguro.</p>
3476:         </div>
3477:         <div style="display:flex;gap:8px;flex-wrap:wrap">
3478:           <button class="btn btn-ghost" onclick="setupOperationsModuleUI()">Inicializar módulo</button>
3479:           <button class="btn btn-teal" onclick="loadOperationsData().then(renderPagos)">Actualizar</button>
3480:         </div>
3481:       </div>
3482: 
3483:       <div id="pagosStats" class="team-stats"></div>
3484: 
3485:       <div class="team-grid">
3486:         <div class="team-panel">
3487:           <h2>Registrar comprobante</h2>
3488:           <p class="team-muted" style="margin-bottom:12px">Primero selecciona la cita. Luego sube el pantallazo y decide si queda pendiente o si ya autorizas la atención.</p>
3489:           <select id="payCitaId" onchange="selectPaymentAppointment(this.value)" style="display:none"></select>
3490: 
3491:           <div style="display:grid;grid-template-columns:minmax(260px,1fr) minmax(260px,.85fr);gap:16px;align-items:start">
3492:             <div>
3493:               <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px">
3494:                 <div>
3495:                   <div style="font-family:var(--font-m);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">1 · Selecciona la cita</div>
3496:                   <div class="team-muted">Citas recientes y pendientes de pago</div>
3497:                 </div>
3498:                 <button class="btn btn-ghost btn-sm" onclick="renderPaymentAppointmentList()">Actualizar lista</button>
3499:               </div>
3500:               <input id="payAppointmentSearch" class="search" type="search" placeholder="Buscar por paciente, código, fecha o servicio..." oninput="renderPaymentAppointmentList()" style="width:100%;margin-bottom:10px">
3501:               <div id="paymentAppointmentList" class="team-list" style="max-height:430px;overflow:auto;padding-right:4px"></div>
3502:             </div>
3503: 
3504:             <div>
3505:               <div id="selectedPaymentCard" class="team-card" style="margin-bottom:12px">
3506:                 <h3>Sin cita seleccionada</h3>
3507:                 <div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>
3508:               </div>
3509: 
3510:               <div class="form-grid g2" style="gap:12px">
3511:                 <div class="field">
3512:                   <label>Valor recibido</label>
3513:                   <input id="payValorRecibido" type="text" placeholder="Ej: 70000">
3514:                 </div>
3515:                 <div class="field">
3516:                   <label>Fecha del pago</label>
3517:                   <input id="payFechaPago" type="date">
3518:                 </div>
3519:                 <div class="field" style="grid-column:1/-1">
3520:                   <label>Medio de pago</label>
3521:                   <select id="payMedioPago"></select>
3522:                 </div>
3523:                 <div class="field" style="grid-column:1/-1">
3524:                   <label>Pantallazo / comprobante</label>
```

### Coincidencia 2 — línea 6781

```html
6746:     console.warn('No se pudo cargar Pagos', e);
6747:   }
6748:   return operationsData;
6749: }
6750: 
6751: async function setupOperationsModuleUI() {
6752:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6753:   if (d.ok) {
6754:     await loadOperationsData();
6755:     renderPagos();
6756:     toast('Módulo de pagos inicializado');
6757:   } else toast(d.error || 'No se pudo inicializar', 'err');
6758: }
6759: 
6760: function paymentAccountLabel(id) {
6761:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6762:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6763: }
6764: 
6765: function paymentCandidateAppointments() {
6766:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6767:   return (allData.citas || [])
6768:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6769:     .sort((a,b) => {
6770:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6771:       const pa = priority(a.estado), pb = priority(b.estado);
6772:       if (pa !== pb) return pa - pb;
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
6776: }
6777: 
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6790:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6791:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6792:         <div>
6793:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6794:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6795:         </div>
6796:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6797:       </div>
6798:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
```

### Coincidencia 3 — línea 6807

```html
6772:       if (pa !== pb) return pa - pb;
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
6776: }
6777: 
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6790:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6791:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6792:         <div>
6793:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6794:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6795:         </div>
6796:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6797:       </div>
6798:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
```

### Coincidencia 4 — línea 6842

```html
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
```

### Coincidencia 5 — línea 6855

```html
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
```

### Coincidencia 6 — línea 6865

```html
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
6891:     const tones = {
6892:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6893:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
6899:     statusEl.style.color = colors[1];
6900:     statusEl.style.border = '1px solid ' + colors[2];
```

### Coincidencia 7 — línea 6904

```html
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
6891:     const tones = {
6892:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6893:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
6899:     statusEl.style.color = colors[1];
6900:     statusEl.style.border = '1px solid ' + colors[2];
6901:     statusEl.textContent = message;
6902:   };
6903: 
6904:   const citaEl = document.getElementById('payCitaId');
6905:   const valorEl = document.getElementById('payValorRecibido');
6906:   const fechaEl = document.getElementById('payFechaPago');
6907:   const medioEl = document.getElementById('payMedioPago');
6908:   const refEl = document.getElementById('payComprobante');
6909:   const obsEl = document.getElementById('payObservaciones');
6910: 
6911:   const citaId = citaEl?.value || '';
6912:   const valorRecibido = valorEl?.value.trim() || '';
6913:   const fechaPago = fechaEl?.value || '';
6914:   const medioPago = medioEl?.value || '';
6915:   const ref = refEl?.value.trim() || '';
6916:   const observaciones = obsEl?.value.trim() || '';
6917: 
6918:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
6919:   if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
6920:   if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
6921:   if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }
6922: 
6923:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6924:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6925: 
6926:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6927: 
6928:   const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
6929:   const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
6930:   if (verifyBtn) verifyBtn.disabled = true;
6931:   if (approveBtn) approveBtn.disabled = true;
6932:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6933:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
```

### Coincidencia 8 — línea 7024

```html
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
```

### Coincidencia 9 — línea 17212

```html
17177:   const pendientes = citasReales().filter(c => {
17178:     if (c.estado !== 'Atendida') return false;
17179:     if (c.pago) return false;
17180:     if (kvGet('pago_' + c.id) === '1') return false;
17181:     if (parsePrecio(c.precio) === 0) return false;
17182:     const f = normDate(c.fecha);
17183:     if (!f) return false;
17184:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17185:     return diff >= 3;
17186:   });
17187:   const banner = document.getElementById('bannerCobros');
17188:   const txtEl  = document.getElementById('bannerCobrosTxt');
17189:   const lista  = document.getElementById('bannerCobrosLista');
17190:   if (!banner) return;
17191:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17192:   banner.style.display = 'block';
17193:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17194:   if (lista) lista.innerHTML = pendientes.map(c => {
17195:     const tel = (c.telefono || '').replace(/\D/g, '');
17196:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17197:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17198:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17199:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17200:       <div style="display:flex;gap:6px">
17201:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17202:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17203:       </div>
17204:     </div>`;
17205:   }).join('');
17206: }
17207: 
17208: function openPago(citaId) {
17209:   showView('pagos');
17210:   setTimeout(() => {
17211:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17212:     const selector = document.getElementById('payCitaId');
17213:     if (selector) {
17214:       selector.value = citaId || '';
17215:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17216:       selector.focus();
17217:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17218:     } else {
17219:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17220:     }
17221:   }, 100);
17222: }
17223: 
17224: // ── Alerta semana floja ──
17225: function _checkAlertaSemanFloja(citas) {
17226:   const now = new Date();
17227:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17228:   const hoyStr = today();
17229: 
17230:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17231:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17232:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17233:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17234: 
17235:   const apagar = () => {
17236:     if (dashEl) dashEl.style.display = 'none';
17237:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17238:   };
17239: 
17240:   if (dow < 3 || dow > 5) { apagar(); return; }
17241: 
17242:   // Calcular ingresos semana actual (lunes a hoy)
17243:   const lunes = new Date(now);
17244:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17245:   lunes.setHours(0,0,0,0);
17246: 
17247:   let totalSemActual = 0, nSemActual = 0;
```

## Guardado de pago

Coincidencias: 1

### Coincidencia 1 — línea 6959

```html
6924:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6925: 
6926:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6927: 
6928:   const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
6929:   const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
6930:   if (verifyBtn) verifyBtn.disabled = true;
6931:   if (approveBtn) approveBtn.disabled = true;
6932:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6933:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6940: 
6941:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6942:     const payload = {
6943:       citaId,
6944:       cliente: c.nombre || '',
6945:       servicioPlan: c.servicio || '',
6946:       valorEsperado: c.precio || '',
6947:       valorRecibido,
6948:       medioPago,
6949:       cuentaReceptora: accountId,
6950:       fechaPago,
6951:       comprobante: ref,
6952:       estadoPago: 'COMPROBANTE_RECIBIDO',
6953:       observaciones,
6954:       proofFile: proofFile || null
6955:     };
6956: 
6957:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6958:       method: 'POST',
6959:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
6965:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6966:       const verifyUrl = APPS_SCRIPT_URL
6967:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6968:         + '&id=' + encodeURIComponent(d.id)
6969:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6970:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
6971:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
6972:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
6973:       toast('Pago confirmado y cita autorizada');
6974:     } else {
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
```

## Verificación de pago

Coincidencias: 6

### Coincidencia 1 — línea 6967

```html
6932:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6933:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6940: 
6941:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6942:     const payload = {
6943:       citaId,
6944:       cliente: c.nombre || '',
6945:       servicioPlan: c.servicio || '',
6946:       valorEsperado: c.precio || '',
6947:       valorRecibido,
6948:       medioPago,
6949:       cuentaReceptora: accountId,
6950:       fechaPago,
6951:       comprobante: ref,
6952:       estadoPago: 'COMPROBANTE_RECIBIDO',
6953:       observaciones,
6954:       proofFile: proofFile || null
6955:     };
6956: 
6957:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6958:       method: 'POST',
6959:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
6965:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6966:       const verifyUrl = APPS_SCRIPT_URL
6967:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6968:         + '&id=' + encodeURIComponent(d.id)
6969:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6970:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
6971:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
6972:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
6973:       toast('Pago confirmado y cita autorizada');
6974:     } else {
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
```

### Coincidencia 2 — línea 7010

```html
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
```

### Coincidencia 3 — línea 7014

```html
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
```

### Coincidencia 4 — línea 7066

```html
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
```

### Coincidencia 5 — línea 7067

```html
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
```

### Coincidencia 6 — línea 7068

```html
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
7103:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
```

## Estados de pago

Coincidencias: 12

### Coincidencia 1 — línea 6952

```html
6917: 
6918:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
6919:   if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
6920:   if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
6921:   if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }
6922: 
6923:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6924:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6925: 
6926:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6927: 
6928:   const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
6929:   const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
6930:   if (verifyBtn) verifyBtn.disabled = true;
6931:   if (approveBtn) approveBtn.disabled = true;
6932:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6933:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6940: 
6941:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6942:     const payload = {
6943:       citaId,
6944:       cliente: c.nombre || '',
6945:       servicioPlan: c.servicio || '',
6946:       valorEsperado: c.precio || '',
6947:       valorRecibido,
6948:       medioPago,
6949:       cuentaReceptora: accountId,
6950:       fechaPago,
6951:       comprobante: ref,
6952:       estadoPago: 'COMPROBANTE_RECIBIDO',
6953:       observaciones,
6954:       proofFile: proofFile || null
6955:     };
6956: 
6957:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6958:       method: 'POST',
6959:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
6965:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6966:       const verifyUrl = APPS_SCRIPT_URL
6967:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6968:         + '&id=' + encodeURIComponent(d.id)
6969:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6970:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
6971:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
6972:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
6973:       toast('Pago confirmado y cita autorizada');
6974:     } else {
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
```

### Coincidencia 2 — línea 6969

```html
6934:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6935: 
6936:   try {
6937:     const proofFile = await readPaymentProofFile();
6938:     if (proofFile?.error) throw new Error(proofFile.error);
6939:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6940: 
6941:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6942:     const payload = {
6943:       citaId,
6944:       cliente: c.nombre || '',
6945:       servicioPlan: c.servicio || '',
6946:       valorEsperado: c.precio || '',
6947:       valorRecibido,
6948:       medioPago,
6949:       cuentaReceptora: accountId,
6950:       fechaPago,
6951:       comprobante: ref,
6952:       estadoPago: 'COMPROBANTE_RECIBIDO',
6953:       observaciones,
6954:       proofFile: proofFile || null
6955:     };
6956: 
6957:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6958:       method: 'POST',
6959:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
6965:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6966:       const verifyUrl = APPS_SCRIPT_URL
6967:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6968:         + '&id=' + encodeURIComponent(d.id)
6969:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6970:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
6971:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
6972:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
6973:       toast('Pago confirmado y cita autorizada');
6974:     } else {
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
```

### Coincidencia 3 — línea 7035

```html
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
```

### Coincidencia 4 — línea 7036

```html
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
```

### Coincidencia 5 — línea 7037

```html
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
```

### Coincidencia 6 — línea 7053

```html
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
```

### Coincidencia 7 — línea 7053

```html
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
```

### Coincidencia 8 — línea 7066

```html
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
```

### Coincidencia 9 — línea 7066

```html
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
```

### Coincidencia 10 — línea 7067

```html
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
```

### Coincidencia 11 — línea 7067

```html
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
```

### Coincidencia 12 — línea 7068

```html
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7059:         </div>
7060:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7061:       </div>
7062:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7063:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7064:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7065:       <div class="team-card-actions">
7066:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7067:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7068:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7069:       </div>
7070:     </div>`;
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
7103:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
```

## Funciones relacionadas con pago

Coincidencias: 20

### Coincidencia 1 — línea 6733

```html
6698:     tarifa:'',
6699:     override:document.getElementById('assignOverride').value
6700:   });
6701:   const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
6702:   if (d.ok) {
6703:     await loadTeamData();
6704:     renderEquipo();
6705:     renderAgenda(true);
6706:     if (closeOnSuccess) closeModal('modalAsignarPro');
6707:     toast('Cita asignada');
6708:     return true;
6709:   }
6710:   toast(d.error || 'No se pudo asignar', 'err');
6711:   return false;
6712: }
6713: 
6714: async function authorizeAssignPro() {
6715:   const assigned = await saveAssignPro({ closeOnSuccess:false });
6716:   if (!assigned) return;
6717:   const params = new URLSearchParams({
6718:     action:'authorizeAppointment',
6719:     token:TOKEN,
6720:     citaId:document.getElementById('assignCitaId').value,
6721:     excepcion:document.getElementById('assignExcepcion').value
6722:   });
6723:   const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
6724:   if (d.ok) {
6725:     closeModal('modalAsignarPro');
6726:     await reload();
6727:     await loadTeamData();
6728:     renderEquipo();
6729:     toast('Cita autorizada para atender');
6730:   } else toast(d.error || 'No se pudo autorizar', 'err');
6731: }
6732: 
6733: async function markPayablePaid(id) {
6734:   if (!confirm('¿Marcar esta cuenta como pagada?')) return;
6735:   const d = await fetch(`${APPS_SCRIPT_URL}?action=markPayablePaid&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6736:   if (d.ok) { await loadTeamData(); renderEquipo(); toast('Cuenta marcada como pagada'); }
6737:   else toast(d.error || 'No se pudo actualizar', 'err');
6738: }
6739: 
6740: async function loadOperationsData() {
6741:   if (!TOKEN) return operationsData;
6742:   try {
6743:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6744:     if (d.ok) operationsData = d;
6745:   } catch(e) {
6746:     console.warn('No se pudo cargar Pagos', e);
6747:   }
6748:   return operationsData;
6749: }
6750: 
6751: async function setupOperationsModuleUI() {
6752:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6753:   if (d.ok) {
6754:     await loadOperationsData();
6755:     renderPagos();
6756:     toast('Módulo de pagos inicializado');
6757:   } else toast(d.error || 'No se pudo inicializar', 'err');
6758: }
6759: 
6760: function paymentAccountLabel(id) {
6761:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6762:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6763: }
6764: 
6765: function paymentCandidateAppointments() {
6766:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6767:   return (allData.citas || [])
6768:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
```

### Coincidencia 2 — línea 6778

```html
6743:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6744:     if (d.ok) operationsData = d;
6745:   } catch(e) {
6746:     console.warn('No se pudo cargar Pagos', e);
6747:   }
6748:   return operationsData;
6749: }
6750: 
6751: async function setupOperationsModuleUI() {
6752:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6753:   if (d.ok) {
6754:     await loadOperationsData();
6755:     renderPagos();
6756:     toast('Módulo de pagos inicializado');
6757:   } else toast(d.error || 'No se pudo inicializar', 'err');
6758: }
6759: 
6760: function paymentAccountLabel(id) {
6761:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6762:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6763: }
6764: 
6765: function paymentCandidateAppointments() {
6766:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6767:   return (allData.citas || [])
6768:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6769:     .sort((a,b) => {
6770:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6771:       const pa = priority(a.estado), pb = priority(b.estado);
6772:       if (pa !== pb) return pa - pb;
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
6776: }
6777: 
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6790:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6791:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6792:         <div>
6793:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6794:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6795:         </div>
6796:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6797:       </div>
6798:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
```

### Coincidencia 3 — línea 6806

```html
6771:       const pa = priority(a.estado), pb = priority(b.estado);
6772:       if (pa !== pb) return pa - pb;
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
6776: }
6777: 
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6790:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6791:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6792:         <div>
6793:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6794:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6795:         </div>
6796:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6797:       </div>
6798:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
```

### Coincidencia 4 — línea 6813

```html
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6790:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6791:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6792:         <div>
6793:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6794:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6795:         </div>
6796:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6797:       </div>
6798:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
```

### Coincidencia 5 — línea 6834

```html
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
```

### Coincidencia 6 — línea 6840

```html
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
6816:   if (!c) {
6817:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6818:     return;
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
```

### Coincidencia 7 — línea 6854

```html
6819:   }
6820:   card.innerHTML = `
6821:     <div class="team-card-head">
6822:       <div>
6823:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6824:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6825:       </div>
6826:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6827:     </div>
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
```

### Coincidencia 8 — línea 6863

```html
6828:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6829:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6830:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6831:     </div>`;
6832: }
6833: 
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
6891:     const tones = {
6892:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6893:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
```

### Coincidencia 9 — línea 6871

```html
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
6891:     const tones = {
6892:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6893:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
6899:     statusEl.style.color = colors[1];
6900:     statusEl.style.border = '1px solid ' + colors[2];
6901:     statusEl.textContent = message;
6902:   };
6903: 
6904:   const citaEl = document.getElementById('payCitaId');
6905:   const valorEl = document.getElementById('payValorRecibido');
6906:   const fechaEl = document.getElementById('payFechaPago');
```

### Coincidencia 10 — línea 6880

```html
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const statusEl = document.getElementById('payActionStatus');
6882:   const verifyBtn = document.getElementById('payVerifyBtn');
6883:   const approveBtn = document.getElementById('payApproveBtn');
6884:   const setStatus = (message = '', tone = 'info') => {
6885:     if (!statusEl) return;
6886:     if (!message) {
6887:       statusEl.style.display = 'none';
6888:       statusEl.textContent = '';
6889:       return;
6890:     }
6891:     const tones = {
6892:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6893:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6894:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6895:     };
6896:     const colors = tones[tone] || tones.info;
6897:     statusEl.style.display = 'block';
6898:     statusEl.style.background = colors[0];
6899:     statusEl.style.color = colors[1];
6900:     statusEl.style.border = '1px solid ' + colors[2];
6901:     statusEl.textContent = message;
6902:   };
6903: 
6904:   const citaEl = document.getElementById('payCitaId');
6905:   const valorEl = document.getElementById('payValorRecibido');
6906:   const fechaEl = document.getElementById('payFechaPago');
6907:   const medioEl = document.getElementById('payMedioPago');
6908:   const refEl = document.getElementById('payComprobante');
6909:   const obsEl = document.getElementById('payObservaciones');
6910: 
6911:   const citaId = citaEl?.value || '';
6912:   const valorRecibido = valorEl?.value.trim() || '';
6913:   const fechaPago = fechaEl?.value || '';
6914:   const medioPago = medioEl?.value || '';
6915:   const ref = refEl?.value.trim() || '';
```

### Coincidencia 11 — línea 6995

```html
6960:     }, 45000);
6961:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6962:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
6963: 
6964:     if (mode === 'approve') {
6965:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6966:       const verifyUrl = APPS_SCRIPT_URL
6967:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6968:         + '&id=' + encodeURIComponent(d.id)
6969:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6970:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
6971:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
6972:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
6973:       toast('Pago confirmado y cita autorizada');
6974:     } else {
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
```

### Coincidencia 12 — línea 7010

```html
6975:       setStatus('Comprobante guardado para revisión.', 'ok');
6976:       toast('Comprobante subido para revisión');
6977:     }
6978: 
6979:     clearPaymentForm();
6980:     await reload();
6981:     await loadOperationsData();
6982:     renderPagos();
6983:     renderAgenda(true);
6984:   } catch (error) {
6985:     console.error('Error al guardar el pago:', error);
6986:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
6987:     setStatus(message, 'err');
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
```

### Coincidencia 13 — línea 7023

```html
6988:     toast(message, 'err');
6989:   } finally {
6990:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
6991:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
6992:   }
6993: }
6994: 
6995: function readPaymentProofFile() {
6996:   const input = document.getElementById('payProofFile');
6997:   const file = input?.files?.[0];
6998:   if (!file) return Promise.resolve(null);
6999:   const allowed = ['image/jpeg','image/png','application/pdf'];
7000:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7001:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7002:   return new Promise(resolve => {
7003:     const reader = new FileReader();
7004:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7005:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7006:     reader.readAsDataURL(file);
7007:   });
7008: }
7009: 
7010: async function verifyPayment(id, status) {
7011:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7012:   if (!confirm(`¿Confirmas ${label}?`)) return;
7013:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7014:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7015:   if (d.ok) {
7016:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7017:     await reload();
7018:     await loadOperationsData();
7019:     renderPagos();
7020:   } else toast(d.error || 'No se pudo verificar', 'err');
7021: }
7022: 
7023: function renderPagos() {
7024:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7025:   const pagos = operationsData.pagos || [];
7026:   const pagosUnicos = [];
7027:   const seenPayments = new Set();
7028:   pagos.forEach(p => {
7029:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7030:     if (seenPayments.has(key)) return;
7031:     seenPayments.add(key);
7032:     pagosUnicos.push(p);
7033:   });
7034:   const cuentas = operationsData.cuentas || [];
7035:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7036:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7037:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7038:   document.getElementById('pagosStats').innerHTML = [
7039:     ['Por verificar', porVerificar],
7040:     ['Aprobados', aprobados],
7041:     ['Rechazados', rechazados],
7042:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7043:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7044: 
7045:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7046:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7047:     .map(a => `<div class="team-card">
7048:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7049:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7050:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7051: 
7052:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7053:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7054:     return `<div class="team-card">
7055:       <div class="team-card-head">
7056:         <div>
7057:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7058:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
```

### Coincidencia 14 — línea 7106

```html
7071:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7072: 
7073:   const planTemplates = operationsData.plantillasPlanes || [];
7074:   const clientPlans = operationsData.planesCliente || [];
7075:   const settlements = operationsData.liquidaciones || [];
7076:   const history = operationsData.historialEstados || [];
7077:   document.getElementById('plansAuditList').innerHTML = `
7078:     <div class="team-card">
7079:       <h3>Plantillas de planes</h3>
7080:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7081:     </div>
7082:     <div class="team-card">
7083:       <h3>Planes de clientes</h3>
7084:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7085:     </div>
7086:     <div class="team-card">
7087:       <h3>Liquidaciones profesionales</h3>
7088:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7089:     </div>
7090:     <div class="team-card">
7091:       <h3>Últimos cambios de estado</h3>
7092:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7093:     </div>`;
7094: }
7095: 
7096: function downloadOperationsCSV(filename, rows) {
7097:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7098:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7099:   const a = document.createElement('a');
7100:   a.href = URL.createObjectURL(blob);
7101:   a.download = filename;
7102:   a.click();
7103:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
7104: }
7105: 
7106: function exportPaymentsCSV() {
7107:   const rows = [['ID','Código reserva','Cita','Cliente','Servicio/plan','Valor esperado','Valor recibido','Medio','Cuenta','Fecha pago','Fecha verificación','Estado','Verificó','Observaciones']];
7108:   (operationsData.pagos || []).forEach(p => rows.push([
7109:     p.ID, p.CodigoReserva, p.CitaID, p.Cliente, p.ServicioPlan, p.ValorEsperado, p.ValorRecibido,
7110:     p.MedioPago, paymentAccountLabel(p.CuentaReceptora), p.FechaPago, p.FechaVerificacion, p.EstadoPago, p.UsuarioVerifico, p.Observaciones
7111:   ]));
7112:   downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
7113: }
7114: 
7115: function exportOperationsAuditCSV() {
7116:   const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
7117:   (operationsData.auditoria || []).forEach(a => rows.push([
7118:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7119:   ]));
7120:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7121: }
7122: 
7123: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7124:   const controller = new AbortController();
7125:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7126:   try {
7127:     const response = await fetch(url, { ...options, signal: controller.signal });
7128:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7129:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7130:     try {
7131:       return JSON.parse(raw);
7132:     } catch (_) {
7133:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7134:     }
7135:   } catch (error) {
7136:     if (error && error.name === 'AbortError') {
7137:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7138:     }
7139:     throw error;
7140:   } finally {
7141:     clearTimeout(timeout);
```

### Coincidencia 15 — línea 8330

```html
8295:   }
8296: }
8297: function _showDescResult(base, final, desc) {
8298:   document.getElementById('descOriginal').textContent = formatPrecio(base);
8299:   document.getElementById('descFinal').textContent = formatPrecio(final) + ' (- ' + formatPrecio(desc) + ')';
8300:   document.getElementById('descuentoResult').style.display = 'block';
8301: }
8302: function quitarDescuento() {
8303:   document.getElementById('ncDescPct').value = '';
8304:   document.getElementById('ncDescMonto').value = '';
8305:   document.getElementById('descuentoResult').style.display = 'none';
8306: }
8307: function getPrecioFinal() {
8308:   const sel = document.getElementById('ncPrice').value;
8309:   if (!sel || sel === 'A convenir') return sel;
8310:   const base = parsePrecio(sel);
8311:   if (!base) return sel;
8312:   const pct   = parseFloat(document.getElementById('ncDescPct').value)  || 0;
8313:   const monto = parsePrecio(document.getElementById('ncDescMonto').value) || 0;
8314:   if (pct > 0)   return formatPrecio(base - Math.round(base * pct / 100));
8315:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
8316:   return sel;
8317: }
8318: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8319: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8320: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8321: 
8322: // ── PAGO POR CITA ──
8323: let _pagoIdActivo = null;
8324: 
8325: function isPagada(id) {
8326:   const c = allData.citas.find(x => x.id === id);
8327:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8328: }
8329: 
8330: function getMetodoPago(id) {
8331:   const c = allData.citas.find(x => x.id === id);
8332:   return (c && c.pago) || '';
8333: }
8334: 
8335: function pagoBadge(id) {
8336:   const c      = allData.citas.find(x => x.id === id);
8337:   const future = c && normDate(c.fecha) > today();
8338:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8339:   const metodo = getMetodoPago(id);
8340:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8341:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8342:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8343: }
8344: 
8345: function esCobrada(c) {
8346:   if (normDate(c.fecha) > today()) return false;
8347:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8348: }
8349: 
8350: function abrirModalPago(id) {
8351:   _pagoIdActivo = id;
8352:   const c = allData.citas.find(x => x.id === id);
8353:   const sub = document.getElementById('pagoModalNombre');
8354:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8355:   const metodoActual = c ? c.pago : '';
8356:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8357:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8358:   });
8359:   document.getElementById('modalPago').classList.add('open');
8360: }
8361: 
8362: function cerrarModalPago() {
8363:   document.getElementById('modalPago').classList.remove('open');
8364:   _pagoIdActivo = null;
8365: }
```

### Coincidencia 16 — línea 8350

```html
8315:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
8316:   return sel;
8317: }
8318: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8319: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8320: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8321: 
8322: // ── PAGO POR CITA ──
8323: let _pagoIdActivo = null;
8324: 
8325: function isPagada(id) {
8326:   const c = allData.citas.find(x => x.id === id);
8327:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8328: }
8329: 
8330: function getMetodoPago(id) {
8331:   const c = allData.citas.find(x => x.id === id);
8332:   return (c && c.pago) || '';
8333: }
8334: 
8335: function pagoBadge(id) {
8336:   const c      = allData.citas.find(x => x.id === id);
8337:   const future = c && normDate(c.fecha) > today();
8338:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8339:   const metodo = getMetodoPago(id);
8340:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8341:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8342:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8343: }
8344: 
8345: function esCobrada(c) {
8346:   if (normDate(c.fecha) > today()) return false;
8347:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8348: }
8349: 
8350: function abrirModalPago(id) {
8351:   _pagoIdActivo = id;
8352:   const c = allData.citas.find(x => x.id === id);
8353:   const sub = document.getElementById('pagoModalNombre');
8354:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8355:   const metodoActual = c ? c.pago : '';
8356:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8357:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8358:   });
8359:   document.getElementById('modalPago').classList.add('open');
8360: }
8361: 
8362: function cerrarModalPago() {
8363:   document.getElementById('modalPago').classList.remove('open');
8364:   _pagoIdActivo = null;
8365: }
8366: 
8367: async function confirmarPago(metodo) {
8368:   if (!_pagoIdActivo) return;
8369:   const id = _pagoIdActivo;
8370:   cerrarModalPago();
8371:   try {
8372:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8373:     if (r.ok) {
8374:       const c = allData.citas.find(x => x.id === id);
8375:       if (c) c.pago = metodo;
8376:       if (metodo) kvSet('pago_'+id, '1');
8377:       else kvRemove('pago_'+id);
8378:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8379:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8380:       renderAgenda(); initDashboard(); renderFinanzas();
8381:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8382:   } catch(e) { toast('Error de conexión', 'err'); }
8383: }
8384: 
8385: // ── ALERTA CITA PRÓXIMA ──
```

### Coincidencia 17 — línea 8362

```html
8327:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8328: }
8329: 
8330: function getMetodoPago(id) {
8331:   const c = allData.citas.find(x => x.id === id);
8332:   return (c && c.pago) || '';
8333: }
8334: 
8335: function pagoBadge(id) {
8336:   const c      = allData.citas.find(x => x.id === id);
8337:   const future = c && normDate(c.fecha) > today();
8338:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8339:   const metodo = getMetodoPago(id);
8340:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8341:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8342:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8343: }
8344: 
8345: function esCobrada(c) {
8346:   if (normDate(c.fecha) > today()) return false;
8347:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8348: }
8349: 
8350: function abrirModalPago(id) {
8351:   _pagoIdActivo = id;
8352:   const c = allData.citas.find(x => x.id === id);
8353:   const sub = document.getElementById('pagoModalNombre');
8354:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8355:   const metodoActual = c ? c.pago : '';
8356:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8357:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8358:   });
8359:   document.getElementById('modalPago').classList.add('open');
8360: }
8361: 
8362: function cerrarModalPago() {
8363:   document.getElementById('modalPago').classList.remove('open');
8364:   _pagoIdActivo = null;
8365: }
8366: 
8367: async function confirmarPago(metodo) {
8368:   if (!_pagoIdActivo) return;
8369:   const id = _pagoIdActivo;
8370:   cerrarModalPago();
8371:   try {
8372:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8373:     if (r.ok) {
8374:       const c = allData.citas.find(x => x.id === id);
8375:       if (c) c.pago = metodo;
8376:       if (metodo) kvSet('pago_'+id, '1');
8377:       else kvRemove('pago_'+id);
8378:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8379:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8380:       renderAgenda(); initDashboard(); renderFinanzas();
8381:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8382:   } catch(e) { toast('Error de conexión', 'err'); }
8383: }
8384: 
8385: // ── ALERTA CITA PRÓXIMA ──
8386: function checkUpcomingAlerts() {
8387:   const now      = new Date();
8388:   const todayStr = today();
8389:   const banner   = document.getElementById('upcomingAlert');
8390:   if (!banner) return;
8391: 
8392:   const candidates = allData.citas
8393:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8394:     .map(c => {
8395:       const [h, m] = c.hora.split(':').map(Number);
8396:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8397:       const diff = (dt - now) / 60000;
```

### Coincidencia 18 — línea 8367

```html
8332:   return (c && c.pago) || '';
8333: }
8334: 
8335: function pagoBadge(id) {
8336:   const c      = allData.citas.find(x => x.id === id);
8337:   const future = c && normDate(c.fecha) > today();
8338:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8339:   const metodo = getMetodoPago(id);
8340:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8341:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8342:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8343: }
8344: 
8345: function esCobrada(c) {
8346:   if (normDate(c.fecha) > today()) return false;
8347:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8348: }
8349: 
8350: function abrirModalPago(id) {
8351:   _pagoIdActivo = id;
8352:   const c = allData.citas.find(x => x.id === id);
8353:   const sub = document.getElementById('pagoModalNombre');
8354:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8355:   const metodoActual = c ? c.pago : '';
8356:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8357:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8358:   });
8359:   document.getElementById('modalPago').classList.add('open');
8360: }
8361: 
8362: function cerrarModalPago() {
8363:   document.getElementById('modalPago').classList.remove('open');
8364:   _pagoIdActivo = null;
8365: }
8366: 
8367: async function confirmarPago(metodo) {
8368:   if (!_pagoIdActivo) return;
8369:   const id = _pagoIdActivo;
8370:   cerrarModalPago();
8371:   try {
8372:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8373:     if (r.ok) {
8374:       const c = allData.citas.find(x => x.id === id);
8375:       if (c) c.pago = metodo;
8376:       if (metodo) kvSet('pago_'+id, '1');
8377:       else kvRemove('pago_'+id);
8378:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8379:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8380:       renderAgenda(); initDashboard(); renderFinanzas();
8381:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8382:   } catch(e) { toast('Error de conexión', 'err'); }
8383: }
8384: 
8385: // ── ALERTA CITA PRÓXIMA ──
8386: function checkUpcomingAlerts() {
8387:   const now      = new Date();
8388:   const todayStr = today();
8389:   const banner   = document.getElementById('upcomingAlert');
8390:   if (!banner) return;
8391: 
8392:   const candidates = allData.citas
8393:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8394:     .map(c => {
8395:       const [h, m] = c.hora.split(':').map(Number);
8396:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8397:       const diff = (dt - now) / 60000;
8398:       return { ...c, diff };
8399:     })
8400:     .filter(c => c.diff > 0 && c.diff <= 120)
8401:     .sort((a, b) => a.diff - b.diff);
8402: 
```

### Coincidencia 19 — línea 17208

```html
17173: 
17174: // ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
17175: function _checkCobrosPendientes() {
17176:   const hoyStr = today();
17177:   const pendientes = citasReales().filter(c => {
17178:     if (c.estado !== 'Atendida') return false;
17179:     if (c.pago) return false;
17180:     if (kvGet('pago_' + c.id) === '1') return false;
17181:     if (parsePrecio(c.precio) === 0) return false;
17182:     const f = normDate(c.fecha);
17183:     if (!f) return false;
17184:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17185:     return diff >= 3;
17186:   });
17187:   const banner = document.getElementById('bannerCobros');
17188:   const txtEl  = document.getElementById('bannerCobrosTxt');
17189:   const lista  = document.getElementById('bannerCobrosLista');
17190:   if (!banner) return;
17191:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17192:   banner.style.display = 'block';
17193:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17194:   if (lista) lista.innerHTML = pendientes.map(c => {
17195:     const tel = (c.telefono || '').replace(/\D/g, '');
17196:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17197:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17198:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17199:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17200:       <div style="display:flex;gap:6px">
17201:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17202:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17203:       </div>
17204:     </div>`;
17205:   }).join('');
17206: }
17207: 
17208: function openPago(citaId) {
17209:   showView('pagos');
17210:   setTimeout(() => {
17211:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17212:     const selector = document.getElementById('payCitaId');
17213:     if (selector) {
17214:       selector.value = citaId || '';
17215:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17216:       selector.focus();
17217:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17218:     } else {
17219:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17220:     }
17221:   }, 100);
17222: }
17223: 
17224: // ── Alerta semana floja ──
17225: function _checkAlertaSemanFloja(citas) {
17226:   const now = new Date();
17227:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17228:   const hoyStr = today();
17229: 
17230:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17231:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17232:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17233:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17234: 
17235:   const apagar = () => {
17236:     if (dashEl) dashEl.style.display = 'none';
17237:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17238:   };
17239: 
17240:   if (dow < 3 || dow > 5) { apagar(); return; }
17241: 
17242:   // Calcular ingresos semana actual (lunes a hoy)
17243:   const lunes = new Date(now);
```

### Coincidencia 20 — línea 19926

```html
19891:     nota,
19892:     pagado: false,
19893:     pagadoFecha: null
19894:   };
19895: 
19896:   const all = _loadRec();
19897:   all.push(rec);
19898:   _saveRec(all);
19899: 
19900:   // Limpiar formulario
19901:   document.getElementById('recInpPaciente').value = '';
19902:   document.getElementById('recInpFecha').value    = '';
19903:   document.getElementById('recInpServicio').value = '';
19904:   document.getElementById('recInpVenta').value    = '';
19905:   document.getElementById('recInpNota').value     = '';
19906:   document.getElementById('recInpComisionCalc').value = '$0';
19907: 
19908:   const msg = document.getElementById('recGuardadoMsg');
19909:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19910: 
19911:   renderRecuperaciones();
19912:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
19913: }
19914: 
19915: function marcarPagado(id) {
19916:   const all = _loadRec();
19917:   const rec = all.find(r => r.id === id);
19918:   if (!rec) return;
19919:   rec.pagado = true;
19920:   rec.pagadoFecha = today();
19921:   _saveRec(all);
19922:   renderRecuperaciones();
19923:   if (typeof toast === 'function') toast(`Comisión ${_fmtCLP(rec.comision)} marcada como pagada`, 'ok');
19924: }
19925: 
19926: function desmarcarPago(id) {
19927:   const all = _loadRec();
19928:   const rec = all.find(r => r.id === id);
19929:   if (!rec) return;
19930:   rec.pagado = false;
19931:   rec.pagadoFecha = null;
19932:   _saveRec(all);
19933:   renderRecuperaciones();
19934: }
19935: 
19936: function eliminarRecuperacion(id) {
19937:   if (!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
19938:   const all = _loadRec().filter(r => r.id !== id);
19939:   _saveRec(all);
19940:   renderRecuperaciones();
19941:   if (typeof toast === 'function') toast('Registro eliminado', 'ok');
19942: }
19943: 
19944: function pagarTodasComisiones() {
19945:   const mes = document.getElementById('recMesFiltro')?.value || _recMesActual();
19946:   const all = _loadRec();
19947:   let cnt = 0;
19948:   all.forEach(r => {
19949:     if (r.fecha.startsWith(mes) && !r.pagado) {
19950:       r.pagado = true;
19951:       r.pagadoFecha = today();
19952:       cnt++;
19953:     }
19954:   });
19955:   if (cnt === 0) return;
19956:   _saveRec(all);
19957:   renderRecuperaciones();
19958:   if (typeof toast === 'function') toast(`${cnt} comisión${cnt>1?'es':''} marcada${cnt>1?'s':''} como pagada${cnt>1?'s':''}`, 'ok');
19959: }
19960: 
19961: // ── Carga pacientes inactivos 3+ meses desde GAS ──
```

## Funciones completas implicadas

### saveManualPayment — línea 6880

```javascript
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
```

### renderPaymentAppointmentList — línea 6778

```javascript
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
```

### selectPaymentAppointment — línea 6806

```javascript
function selectPaymentAppointment(id) {
  const citaSel = document.getElementById('payCitaId');
  if (citaSel) citaSel.value = id || '';
  prefillPaymentFromAppointment();
  renderPaymentAppointmentList();
}
```

### fillPaymentSelectors — línea 6840

```javascript
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
```

### prefillPaymentFromAppointment — línea 6854

```javascript
function prefillPaymentFromAppointment() {
  const id = document.getElementById('payCitaId')?.value || '';
  const c = (allData.citas || []).find(x => String(x.id) === String(id));
  updateSelectedPaymentCard(c);
  if (!c) return;
  document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
  if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
}
```

### clearPaymentForm — línea 6863

```javascript
function clearPaymentForm() {
  ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const c = document.getElementById('payCitaId'); if (c) c.value = '';
  updatePaymentProofLabel();
  updateSelectedPaymentCard(null);
  renderPaymentAppointmentList();
}
```

### renderPagos — línea 7023

```javascript
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
```

### openPago — línea 17208

```javascript
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
```

### readPaymentProofFile — línea 6995

```javascript
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
```

### verifyPayment — línea 7010

```javascript
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
```

### authorizeAssignPro — línea 6714

```javascript
async function authorizeAssignPro() {
  const assigned = await saveAssignPro({ closeOnSuccess:false });
  if (!assigned) return;
  const params = new URLSearchParams({
    action:'authorizeAppointment',
    token:TOKEN,
    citaId:document.getElementById('assignCitaId').value,
    excepcion:document.getElementById('assignExcepcion').value
  });
  const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
  if (d.ok) {
    closeModal('modalAsignarPro');
    await reload();
    await loadTeamData();
    renderEquipo();
    toast('Cita autorizada para atender');
  } else toast(d.error || 'No se pudo autorizar', 'err');
}
```

### paymentCandidateAppointments — línea 6765

```javascript
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
```

### updateSelectedPaymentCard — línea 6813

```javascript
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
```

### updatePaymentProofLabel — línea 6834

```javascript
function updatePaymentProofLabel() {
  const file = document.getElementById('payProofFile')?.files?.[0];
  const label = document.getElementById('payProofLabel');
  if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
}
```

### abrirPagoCita — línea 6871

```javascript
function abrirPagoCita(id) {
  showView('pagos');
  setTimeout(() => {
    fillPaymentSelectors(id);
    const el = document.getElementById('payValorRecibido');
    if (el) el.focus();
  }, 350);
}
```

### downloadOperationsCSV — línea 7096

```javascript
function downloadOperationsCSV(filename, rows) {
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 800);
}
```

### isPagada — línea 8325

```javascript
function isPagada(id) {
  const c = allData.citas.find(x => x.id === id);
  return !!(c && c.pago) || kvGet('pago_'+id) === '1';
}
```

### esCobrada — línea 8345

```javascript
function esCobrada(c) {
  if (normDate(c.fecha) > today()) return false;
  return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
}
```

### abrirModalPago — línea 8350

```javascript
function abrirModalPago(id) {
  _pagoIdActivo = id;
  const c = allData.citas.find(x => x.id === id);
  const sub = document.getElementById('pagoModalNombre');
  if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
  const metodoActual = c ? c.pago : '';
  document.querySelectorAll('.pago-metodo-btn').forEach(b => {
    b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
  });
  document.getElementById('modalPago').classList.add('open');
}
```

### cerrarModalPago — línea 8362

```javascript
function cerrarModalPago() {
  document.getElementById('modalPago').classList.remove('open');
  _pagoIdActivo = null;
}
```

### _checkCobrosPendientes — línea 17175

```javascript
function _checkCobrosPendientes() {
  const hoyStr = today();
  const pendientes = citasReales().filter(c => {
    if (c.estado !== 'Atendida') return false;
    if (c.pago) return false;
    if (kvGet('pago_' + c.id) === '1') return false;
    if (parsePrecio(c.precio) === 0) return false;
    const f = normDate(c.fecha);
    if (!f) return false;
    const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
    return diff >= 3;
  });
  const banner = document.getElementById('bannerCobros');
  const txtEl  = document.getElementById('bannerCobrosTxt');
  const lista  = document.getElementById('bannerCobrosLista');
  if (!banner) return;
  if (!pendientes.length) { banner.style.display = 'none'; return; }
  banner.style.display = 'block';
  if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
  if (lista) lista.innerHTML = pendientes.map(c => {
    const tel = (c.telefono || '').replace(/\D/g, '');
    const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
    const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
      <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
      <div style="display:flex;gap:6px">
        ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
      </div>
    </div>`;
  }).join('');
}
```

### marcarPagado — línea 19915

```javascript
function marcarPagado(id) {
  const all = _loadRec();
  const rec = all.find(r => r.id === id);
  if (!rec) return;
  rec.pagado = true;
  rec.pagadoFecha = today();
  _saveRec(all);
  renderRecuperaciones();
  if (typeof toast === 'function') toast(`Comisión ${_fmtCLP(rec.comision)} marcada como pagada`, 'ok');
}
```
