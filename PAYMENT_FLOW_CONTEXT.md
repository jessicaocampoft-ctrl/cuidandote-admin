# Contexto exacto del flujo de pagos

Archivo: `index.html`

## Texto del botón

Coincidencias: 1

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
3541:                 <button class="btn btn-ghost" onclick="saveManualPayment('verify')">Subir para revisar</button>
3542:                 <button class="btn btn-teal" onclick="saveManualPayment('approve')">Confirmar pago y autorizar</button>
3543:                 <button class="btn btn-ghost" onclick="clearPaymentForm()">Limpiar</button>
3544:               </div>
3545:             </div>
3546:           </div>
3547:         </div>
3548: 
3549:         <div class="team-panel">
3550:           <h2>Cuentas oficiales</h2>
3551:           <div id="paymentAccountsList" class="team-list"></div>
3552:         </div>
3553:       </div>
3554: 
3555:       <div class="team-grid" style="margin-top:16px">
3556:         <div class="team-panel">
3557:           <h2>Pagos registrados</h2>
3558:           <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
3559:             <button class="btn btn-ghost btn-sm" onclick="exportPaymentsCSV()">Exportar pagos CSV</button>
3560:             <button class="btn btn-ghost btn-sm" onclick="exportOperationsAuditCSV()">Exportar auditoría CSV</button>
3561:           </div>
3562:           <div id="paymentsList" class="team-list"></div>
3563:         </div>
3564:         <div class="team-panel">
3565:           <h2>Planes y auditoría</h2>
3566:           <div id="plansAuditList" class="team-list"></div>
3567:         </div>
3568:       </div>
3569:     </section>
3570: 
3571:     <!-- ── FINANZAS ── -->
3572:     <section id="vFinanzas" style="display:none">
3573:       <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
3574:         <div>
3575:           <h1 class="page-title"><em>Módulo</em> Financiero</h1>
3576:           <p class="page-sub">Ingresos reales, tendencias y exportación de reportes</p>
3577:         </div>
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

### Coincidencia 2 — línea 6780

```html
6745:     console.warn('No se pudo cargar Pagos', e);
6746:   }
6747:   return operationsData;
6748: }
6749: 
6750: async function setupOperationsModuleUI() {
6751:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6752:   if (d.ok) {
6753:     await loadOperationsData();
6754:     renderPagos();
6755:     toast('Módulo de pagos inicializado');
6756:   } else toast(d.error || 'No se pudo inicializar', 'err');
6757: }
6758: 
6759: function paymentAccountLabel(id) {
6760:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6761:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6762: }
6763: 
6764: function paymentCandidateAppointments() {
6765:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6766:   return (allData.citas || [])
6767:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6768:     .sort((a,b) => {
6769:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6770:       const pa = priority(a.estado), pb = priority(b.estado);
6771:       if (pa !== pb) return pa - pb;
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
6775: }
6776: 
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6789:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6790:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6791:         <div>
6792:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6793:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6794:         </div>
6795:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6796:       </div>
6797:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
```

### Coincidencia 3 — línea 6806

```html
6771:       if (pa !== pb) return pa - pb;
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
6775: }
6776: 
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6789:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6790:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6791:         <div>
6792:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6793:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6794:         </div>
6795:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6796:       </div>
6797:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
```

### Coincidencia 4 — línea 6841

```html
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
```

### Coincidencia 5 — línea 6854

```html
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
```

### Coincidencia 6 — línea 6864

```html
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
```

### Coincidencia 7 — línea 6880

```html
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
```

### Coincidencia 8 — línea 6957

```html
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
```

### Coincidencia 9 — línea 17145

```html
17110:   const pendientes = citasReales().filter(c => {
17111:     if (c.estado !== 'Atendida') return false;
17112:     if (c.pago) return false;
17113:     if (kvGet('pago_' + c.id) === '1') return false;
17114:     if (parsePrecio(c.precio) === 0) return false;
17115:     const f = normDate(c.fecha);
17116:     if (!f) return false;
17117:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17118:     return diff >= 3;
17119:   });
17120:   const banner = document.getElementById('bannerCobros');
17121:   const txtEl  = document.getElementById('bannerCobrosTxt');
17122:   const lista  = document.getElementById('bannerCobrosLista');
17123:   if (!banner) return;
17124:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17125:   banner.style.display = 'block';
17126:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17127:   if (lista) lista.innerHTML = pendientes.map(c => {
17128:     const tel = (c.telefono || '').replace(/\D/g, '');
17129:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17130:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17131:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17132:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17133:       <div style="display:flex;gap:6px">
17134:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17135:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17136:       </div>
17137:     </div>`;
17138:   }).join('');
17139: }
17140: 
17141: function openPago(citaId) {
17142:   showView('pagos');
17143:   setTimeout(() => {
17144:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17145:     const selector = document.getElementById('payCitaId');
17146:     if (selector) {
17147:       selector.value = citaId || '';
17148:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17149:       selector.focus();
17150:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17151:     } else {
17152:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17153:     }
17154:   }, 100);
17155: }
17156: 
17157: // ── Alerta semana floja ──
17158: function _checkAlertaSemanFloja(citas) {
17159:   const now = new Date();
17160:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17161:   const hoyStr = today();
17162: 
17163:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17164:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
17172: 
17173:   if (dow < 3 || dow > 5) { apagar(); return; }
17174: 
17175:   // Calcular ingresos semana actual (lunes a hoy)
17176:   const lunes = new Date(now);
17177:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17178:   lunes.setHours(0,0,0,0);
17179: 
17180:   let totalSemActual = 0, nSemActual = 0;
```

## Guardado de pago

Coincidencias: 1

### Coincidencia 1 — línea 6909

```html
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
```

## Verificación de pago

Coincidencias: 6

### Coincidencia 1 — línea 6914

```html
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
```

### Coincidencia 2 — línea 6943

```html
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
```

### Coincidencia 3 — línea 6947

```html
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
```

### Coincidencia 4 — línea 6999

```html
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
```

### Coincidencia 5 — línea 7000

```html
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
```

### Coincidencia 6 — línea 7001

```html
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
7036:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
```

## Estados de pago

Coincidencias: 11

### Coincidencia 1 — línea 6914

```html
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
```

### Coincidencia 2 — línea 6968

```html
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
```

### Coincidencia 3 — línea 6969

```html
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
```

### Coincidencia 4 — línea 6970

```html
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
```

### Coincidencia 5 — línea 6986

```html
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
```

### Coincidencia 6 — línea 6986

```html
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
```

### Coincidencia 7 — línea 6999

```html
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
```

### Coincidencia 8 — línea 6999

```html
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
```

### Coincidencia 9 — línea 7000

```html
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
```

### Coincidencia 10 — línea 7000

```html
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
```

### Coincidencia 11 — línea 7001

```html
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
6992:         </div>
6993:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
6994:       </div>
6995:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6996:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6997:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6998:       <div class="team-card-actions">
6999:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7000:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7001:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7002:       </div>
7003:     </div>`;
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
7036:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
```

## Funciones relacionadas con pago

Coincidencias: 20

### Coincidencia 1 — línea 6732

```html
6697:     tarifa:'',
6698:     override:document.getElementById('assignOverride').value
6699:   });
6700:   const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
6701:   if (d.ok) {
6702:     await loadTeamData();
6703:     renderEquipo();
6704:     renderAgenda(true);
6705:     if (closeOnSuccess) closeModal('modalAsignarPro');
6706:     toast('Cita asignada');
6707:     return true;
6708:   }
6709:   toast(d.error || 'No se pudo asignar', 'err');
6710:   return false;
6711: }
6712: 
6713: async function authorizeAssignPro() {
6714:   const assigned = await saveAssignPro({ closeOnSuccess:false });
6715:   if (!assigned) return;
6716:   const params = new URLSearchParams({
6717:     action:'authorizeAppointment',
6718:     token:TOKEN,
6719:     citaId:document.getElementById('assignCitaId').value,
6720:     excepcion:document.getElementById('assignExcepcion').value
6721:   });
6722:   const d = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`).then(r => r.json());
6723:   if (d.ok) {
6724:     closeModal('modalAsignarPro');
6725:     await reload();
6726:     await loadTeamData();
6727:     renderEquipo();
6728:     toast('Cita autorizada para atender');
6729:   } else toast(d.error || 'No se pudo autorizar', 'err');
6730: }
6731: 
6732: async function markPayablePaid(id) {
6733:   if (!confirm('¿Marcar esta cuenta como pagada?')) return;
6734:   const d = await fetch(`${APPS_SCRIPT_URL}?action=markPayablePaid&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6735:   if (d.ok) { await loadTeamData(); renderEquipo(); toast('Cuenta marcada como pagada'); }
6736:   else toast(d.error || 'No se pudo actualizar', 'err');
6737: }
6738: 
6739: async function loadOperationsData() {
6740:   if (!TOKEN) return operationsData;
6741:   try {
6742:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6743:     if (d.ok) operationsData = d;
6744:   } catch(e) {
6745:     console.warn('No se pudo cargar Pagos', e);
6746:   }
6747:   return operationsData;
6748: }
6749: 
6750: async function setupOperationsModuleUI() {
6751:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6752:   if (d.ok) {
6753:     await loadOperationsData();
6754:     renderPagos();
6755:     toast('Módulo de pagos inicializado');
6756:   } else toast(d.error || 'No se pudo inicializar', 'err');
6757: }
6758: 
6759: function paymentAccountLabel(id) {
6760:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6761:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6762: }
6763: 
6764: function paymentCandidateAppointments() {
6765:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6766:   return (allData.citas || [])
6767:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
```

### Coincidencia 2 — línea 6777

```html
6742:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6743:     if (d.ok) operationsData = d;
6744:   } catch(e) {
6745:     console.warn('No se pudo cargar Pagos', e);
6746:   }
6747:   return operationsData;
6748: }
6749: 
6750: async function setupOperationsModuleUI() {
6751:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6752:   if (d.ok) {
6753:     await loadOperationsData();
6754:     renderPagos();
6755:     toast('Módulo de pagos inicializado');
6756:   } else toast(d.error || 'No se pudo inicializar', 'err');
6757: }
6758: 
6759: function paymentAccountLabel(id) {
6760:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6761:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6762: }
6763: 
6764: function paymentCandidateAppointments() {
6765:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6766:   return (allData.citas || [])
6767:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6768:     .sort((a,b) => {
6769:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6770:       const pa = priority(a.estado), pb = priority(b.estado);
6771:       if (pa !== pb) return pa - pb;
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
6775: }
6776: 
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6789:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6790:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6791:         <div>
6792:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6793:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6794:         </div>
6795:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6796:       </div>
6797:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
```

### Coincidencia 3 — línea 6805

```html
6770:       const pa = priority(a.estado), pb = priority(b.estado);
6771:       if (pa !== pb) return pa - pb;
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
6775: }
6776: 
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6789:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6790:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6791:         <div>
6792:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6793:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6794:         </div>
6795:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6796:       </div>
6797:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
```

### Coincidencia 4 — línea 6812

```html
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6789:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6790:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6791:         <div>
6792:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6793:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6794:         </div>
6795:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6796:       </div>
6797:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
```

### Coincidencia 5 — línea 6833

```html
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
```

### Coincidencia 6 — línea 6839

```html
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
6815:   if (!c) {
6816:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6817:     return;
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
```

### Coincidencia 7 — línea 6853

```html
6818:   }
6819:   card.innerHTML = `
6820:     <div class="team-card-head">
6821:       <div>
6822:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6823:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6824:       </div>
6825:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6826:     </div>
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
```

### Coincidencia 8 — línea 6862

```html
6827:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6828:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6829:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6830:     </div>`;
6831: }
6832: 
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
```

### Coincidencia 9 — línea 6870

```html
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
```

### Coincidencia 10 — línea 6879

```html
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
6891:   if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
6892:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
```

### Coincidencia 11 — línea 6928

```html
6893:   const payload = {
6894:     citaId,
6895:     cliente: c?.nombre || '',
6896:     servicioPlan: c?.servicio || '',
6897:     valorEsperado: c?.precio || '',
6898:     valorRecibido: document.getElementById('payValorRecibido').value.trim(),
6899:     medioPago: medioEl?.value || '',
6900:     cuentaReceptora: accountId,
6901:     fechaPago: document.getElementById('payFechaPago').value || today(),
6902:     comprobante: ref,
6903:     estadoPago: 'Por verificar',
6904:     observaciones: document.getElementById('payObservaciones').value.trim(),
6905:     proofFile: proofFile || null
6906:   };
6907:   const d = await fetch(APPS_SCRIPT_URL, {
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
```

### Coincidencia 12 — línea 6943

```html
6908:     method:'POST',
6909:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6910:   }).then(r => r.json());
6911:   if (d.ok) {
6912:     if (mode === 'approve') {
6913:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6914:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6915:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6916:       toast('Pago confirmado y cita autorizada');
6917:     } else {
6918:       toast('Comprobante subido para revisión');
6919:     }
6920:     clearPaymentForm();
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
```

### Coincidencia 13 — línea 6956

```html
6921:     await reload();
6922:     await loadOperationsData();
6923:     renderPagos();
6924:     renderAgenda(true);
6925:   } else toast(d.error || 'No se pudo registrar', 'err');
6926: }
6927: 
6928: function readPaymentProofFile() {
6929:   const input = document.getElementById('payProofFile');
6930:   const file = input?.files?.[0];
6931:   if (!file) return Promise.resolve(null);
6932:   const allowed = ['image/jpeg','image/png','application/pdf'];
6933:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
6934:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
6935:   return new Promise(resolve => {
6936:     const reader = new FileReader();
6937:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
6938:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
6939:     reader.readAsDataURL(file);
6940:   });
6941: }
6942: 
6943: async function verifyPayment(id, status) {
6944:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
6945:   if (!confirm(`¿Confirmas ${label}?`)) return;
6946:   const obs = prompt('Observación opcional para auditoría:', '') || '';
6947:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6948:   if (d.ok) {
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
6966:   });
6967:   const cuentas = operationsData.cuentas || [];
6968:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6969:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6970:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6971:   document.getElementById('pagosStats').innerHTML = [
6972:     ['Por verificar', porVerificar],
6973:     ['Aprobados', aprobados],
6974:     ['Rechazados', rechazados],
6975:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
6976:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
6977: 
6978:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
6979:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
6980:     .map(a => `<div class="team-card">
6981:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6982:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6983:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6984: 
6985:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6986:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6987:     return `<div class="team-card">
6988:       <div class="team-card-head">
6989:         <div>
6990:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6991:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
```

### Coincidencia 14 — línea 7039

```html
7004:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7005: 
7006:   const planTemplates = operationsData.plantillasPlanes || [];
7007:   const clientPlans = operationsData.planesCliente || [];
7008:   const settlements = operationsData.liquidaciones || [];
7009:   const history = operationsData.historialEstados || [];
7010:   document.getElementById('plansAuditList').innerHTML = `
7011:     <div class="team-card">
7012:       <h3>Plantillas de planes</h3>
7013:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7014:     </div>
7015:     <div class="team-card">
7016:       <h3>Planes de clientes</h3>
7017:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7018:     </div>
7019:     <div class="team-card">
7020:       <h3>Liquidaciones profesionales</h3>
7021:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7022:     </div>
7023:     <div class="team-card">
7024:       <h3>Últimos cambios de estado</h3>
7025:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7026:     </div>`;
7027: }
7028: 
7029: function downloadOperationsCSV(filename, rows) {
7030:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7031:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7032:   const a = document.createElement('a');
7033:   a.href = URL.createObjectURL(blob);
7034:   a.download = filename;
7035:   a.click();
7036:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
7037: }
7038: 
7039: function exportPaymentsCSV() {
7040:   const rows = [['ID','Código reserva','Cita','Cliente','Servicio/plan','Valor esperado','Valor recibido','Medio','Cuenta','Fecha pago','Fecha verificación','Estado','Verificó','Observaciones']];
7041:   (operationsData.pagos || []).forEach(p => rows.push([
7042:     p.ID, p.CodigoReserva, p.CitaID, p.Cliente, p.ServicioPlan, p.ValorEsperado, p.ValorRecibido,
7043:     p.MedioPago, paymentAccountLabel(p.CuentaReceptora), p.FechaPago, p.FechaVerificacion, p.EstadoPago, p.UsuarioVerifico, p.Observaciones
7044:   ]));
7045:   downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
7046: }
7047: 
7048: function exportOperationsAuditCSV() {
7049:   const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
7050:   (operationsData.auditoria || []).forEach(a => rows.push([
7051:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7052:   ]));
7053:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7054: }
7055: 
7056: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7057:   const controller = new AbortController();
7058:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7059:   try {
7060:     const response = await fetch(url, { ...options, signal: controller.signal });
7061:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7062:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7063:     try {
7064:       return JSON.parse(raw);
7065:     } catch (_) {
7066:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7067:     }
7068:   } catch (error) {
7069:     if (error && error.name === 'AbortError') {
7070:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7071:     }
7072:     throw error;
7073:   } finally {
7074:     clearTimeout(timeout);
```

### Coincidencia 15 — línea 8263

```html
8228:   }
8229: }
8230: function _showDescResult(base, final, desc) {
8231:   document.getElementById('descOriginal').textContent = formatPrecio(base);
8232:   document.getElementById('descFinal').textContent = formatPrecio(final) + ' (- ' + formatPrecio(desc) + ')';
8233:   document.getElementById('descuentoResult').style.display = 'block';
8234: }
8235: function quitarDescuento() {
8236:   document.getElementById('ncDescPct').value = '';
8237:   document.getElementById('ncDescMonto').value = '';
8238:   document.getElementById('descuentoResult').style.display = 'none';
8239: }
8240: function getPrecioFinal() {
8241:   const sel = document.getElementById('ncPrice').value;
8242:   if (!sel || sel === 'A convenir') return sel;
8243:   const base = parsePrecio(sel);
8244:   if (!base) return sel;
8245:   const pct   = parseFloat(document.getElementById('ncDescPct').value)  || 0;
8246:   const monto = parsePrecio(document.getElementById('ncDescMonto').value) || 0;
8247:   if (pct > 0)   return formatPrecio(base - Math.round(base * pct / 100));
8248:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
8249:   return sel;
8250: }
8251: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8252: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8253: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8254: 
8255: // ── PAGO POR CITA ──
8256: let _pagoIdActivo = null;
8257: 
8258: function isPagada(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
8273:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8274:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8275:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8276: }
8277: 
8278: function esCobrada(c) {
8279:   if (normDate(c.fecha) > today()) return false;
8280:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8281: }
8282: 
8283: function abrirModalPago(id) {
8284:   _pagoIdActivo = id;
8285:   const c = allData.citas.find(x => x.id === id);
8286:   const sub = document.getElementById('pagoModalNombre');
8287:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8288:   const metodoActual = c ? c.pago : '';
8289:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8290:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8291:   });
8292:   document.getElementById('modalPago').classList.add('open');
8293: }
8294: 
8295: function cerrarModalPago() {
8296:   document.getElementById('modalPago').classList.remove('open');
8297:   _pagoIdActivo = null;
8298: }
```

### Coincidencia 16 — línea 8283

```html
8248:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
8249:   return sel;
8250: }
8251: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8252: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8253: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8254: 
8255: // ── PAGO POR CITA ──
8256: let _pagoIdActivo = null;
8257: 
8258: function isPagada(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
8273:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8274:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8275:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8276: }
8277: 
8278: function esCobrada(c) {
8279:   if (normDate(c.fecha) > today()) return false;
8280:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8281: }
8282: 
8283: function abrirModalPago(id) {
8284:   _pagoIdActivo = id;
8285:   const c = allData.citas.find(x => x.id === id);
8286:   const sub = document.getElementById('pagoModalNombre');
8287:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8288:   const metodoActual = c ? c.pago : '';
8289:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8290:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8291:   });
8292:   document.getElementById('modalPago').classList.add('open');
8293: }
8294: 
8295: function cerrarModalPago() {
8296:   document.getElementById('modalPago').classList.remove('open');
8297:   _pagoIdActivo = null;
8298: }
8299: 
8300: async function confirmarPago(metodo) {
8301:   if (!_pagoIdActivo) return;
8302:   const id = _pagoIdActivo;
8303:   cerrarModalPago();
8304:   try {
8305:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8306:     if (r.ok) {
8307:       const c = allData.citas.find(x => x.id === id);
8308:       if (c) c.pago = metodo;
8309:       if (metodo) kvSet('pago_'+id, '1');
8310:       else kvRemove('pago_'+id);
8311:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8312:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8313:       renderAgenda(); initDashboard(); renderFinanzas();
8314:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8315:   } catch(e) { toast('Error de conexión', 'err'); }
8316: }
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
```

### Coincidencia 17 — línea 8295

```html
8260:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
8273:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8274:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8275:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8276: }
8277: 
8278: function esCobrada(c) {
8279:   if (normDate(c.fecha) > today()) return false;
8280:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8281: }
8282: 
8283: function abrirModalPago(id) {
8284:   _pagoIdActivo = id;
8285:   const c = allData.citas.find(x => x.id === id);
8286:   const sub = document.getElementById('pagoModalNombre');
8287:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8288:   const metodoActual = c ? c.pago : '';
8289:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8290:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8291:   });
8292:   document.getElementById('modalPago').classList.add('open');
8293: }
8294: 
8295: function cerrarModalPago() {
8296:   document.getElementById('modalPago').classList.remove('open');
8297:   _pagoIdActivo = null;
8298: }
8299: 
8300: async function confirmarPago(metodo) {
8301:   if (!_pagoIdActivo) return;
8302:   const id = _pagoIdActivo;
8303:   cerrarModalPago();
8304:   try {
8305:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8306:     if (r.ok) {
8307:       const c = allData.citas.find(x => x.id === id);
8308:       if (c) c.pago = metodo;
8309:       if (metodo) kvSet('pago_'+id, '1');
8310:       else kvRemove('pago_'+id);
8311:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8312:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8313:       renderAgenda(); initDashboard(); renderFinanzas();
8314:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8315:   } catch(e) { toast('Error de conexión', 'err'); }
8316: }
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
```

### Coincidencia 18 — línea 8300

```html
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
8273:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8274:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8275:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8276: }
8277: 
8278: function esCobrada(c) {
8279:   if (normDate(c.fecha) > today()) return false;
8280:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8281: }
8282: 
8283: function abrirModalPago(id) {
8284:   _pagoIdActivo = id;
8285:   const c = allData.citas.find(x => x.id === id);
8286:   const sub = document.getElementById('pagoModalNombre');
8287:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8288:   const metodoActual = c ? c.pago : '';
8289:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8290:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8291:   });
8292:   document.getElementById('modalPago').classList.add('open');
8293: }
8294: 
8295: function cerrarModalPago() {
8296:   document.getElementById('modalPago').classList.remove('open');
8297:   _pagoIdActivo = null;
8298: }
8299: 
8300: async function confirmarPago(metodo) {
8301:   if (!_pagoIdActivo) return;
8302:   const id = _pagoIdActivo;
8303:   cerrarModalPago();
8304:   try {
8305:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8306:     if (r.ok) {
8307:       const c = allData.citas.find(x => x.id === id);
8308:       if (c) c.pago = metodo;
8309:       if (metodo) kvSet('pago_'+id, '1');
8310:       else kvRemove('pago_'+id);
8311:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8312:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8313:       renderAgenda(); initDashboard(); renderFinanzas();
8314:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8315:   } catch(e) { toast('Error de conexión', 'err'); }
8316: }
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
```

### Coincidencia 19 — línea 17141

```html
17106: 
17107: // ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
17108: function _checkCobrosPendientes() {
17109:   const hoyStr = today();
17110:   const pendientes = citasReales().filter(c => {
17111:     if (c.estado !== 'Atendida') return false;
17112:     if (c.pago) return false;
17113:     if (kvGet('pago_' + c.id) === '1') return false;
17114:     if (parsePrecio(c.precio) === 0) return false;
17115:     const f = normDate(c.fecha);
17116:     if (!f) return false;
17117:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
17118:     return diff >= 3;
17119:   });
17120:   const banner = document.getElementById('bannerCobros');
17121:   const txtEl  = document.getElementById('bannerCobrosTxt');
17122:   const lista  = document.getElementById('bannerCobrosLista');
17123:   if (!banner) return;
17124:   if (!pendientes.length) { banner.style.display = 'none'; return; }
17125:   banner.style.display = 'block';
17126:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
17127:   if (lista) lista.innerHTML = pendientes.map(c => {
17128:     const tel = (c.telefono || '').replace(/\D/g, '');
17129:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
17130:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17131:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17132:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17133:       <div style="display:flex;gap:6px">
17134:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17135:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17136:       </div>
17137:     </div>`;
17138:   }).join('');
17139: }
17140: 
17141: function openPago(citaId) {
17142:   showView('pagos');
17143:   setTimeout(() => {
17144:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17145:     const selector = document.getElementById('payCitaId');
17146:     if (selector) {
17147:       selector.value = citaId || '';
17148:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17149:       selector.focus();
17150:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17151:     } else {
17152:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17153:     }
17154:   }, 100);
17155: }
17156: 
17157: // ── Alerta semana floja ──
17158: function _checkAlertaSemanFloja(citas) {
17159:   const now = new Date();
17160:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17161:   const hoyStr = today();
17162: 
17163:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17164:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17165:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17166:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17167: 
17168:   const apagar = () => {
17169:     if (dashEl) dashEl.style.display = 'none';
17170:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17171:   };
17172: 
17173:   if (dow < 3 || dow > 5) { apagar(); return; }
17174: 
17175:   // Calcular ingresos semana actual (lunes a hoy)
17176:   const lunes = new Date(now);
```

### Coincidencia 20 — línea 19859

```html
19824:     nota,
19825:     pagado: false,
19826:     pagadoFecha: null
19827:   };
19828: 
19829:   const all = _loadRec();
19830:   all.push(rec);
19831:   _saveRec(all);
19832: 
19833:   // Limpiar formulario
19834:   document.getElementById('recInpPaciente').value = '';
19835:   document.getElementById('recInpFecha').value    = '';
19836:   document.getElementById('recInpServicio').value = '';
19837:   document.getElementById('recInpVenta').value    = '';
19838:   document.getElementById('recInpNota').value     = '';
19839:   document.getElementById('recInpComisionCalc').value = '$0';
19840: 
19841:   const msg = document.getElementById('recGuardadoMsg');
19842:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19843: 
19844:   renderRecuperaciones();
19845:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
19846: }
19847: 
19848: function marcarPagado(id) {
19849:   const all = _loadRec();
19850:   const rec = all.find(r => r.id === id);
19851:   if (!rec) return;
19852:   rec.pagado = true;
19853:   rec.pagadoFecha = today();
19854:   _saveRec(all);
19855:   renderRecuperaciones();
19856:   if (typeof toast === 'function') toast(`Comisión ${_fmtCLP(rec.comision)} marcada como pagada`, 'ok');
19857: }
19858: 
19859: function desmarcarPago(id) {
19860:   const all = _loadRec();
19861:   const rec = all.find(r => r.id === id);
19862:   if (!rec) return;
19863:   rec.pagado = false;
19864:   rec.pagadoFecha = null;
19865:   _saveRec(all);
19866:   renderRecuperaciones();
19867: }
19868: 
19869: function eliminarRecuperacion(id) {
19870:   if (!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
19871:   const all = _loadRec().filter(r => r.id !== id);
19872:   _saveRec(all);
19873:   renderRecuperaciones();
19874:   if (typeof toast === 'function') toast('Registro eliminado', 'ok');
19875: }
19876: 
19877: function pagarTodasComisiones() {
19878:   const mes = document.getElementById('recMesFiltro')?.value || _recMesActual();
19879:   const all = _loadRec();
19880:   let cnt = 0;
19881:   all.forEach(r => {
19882:     if (r.fecha.startsWith(mes) && !r.pagado) {
19883:       r.pagado = true;
19884:       r.pagadoFecha = today();
19885:       cnt++;
19886:     }
19887:   });
19888:   if (cnt === 0) return;
19889:   _saveRec(all);
19890:   renderRecuperaciones();
19891:   if (typeof toast === 'function') toast(`${cnt} comisión${cnt>1?'es':''} marcada${cnt>1?'s':''} como pagada${cnt>1?'s':''}`, 'ok');
19892: }
19893: 
19894: // ── Carga pacientes inactivos 3+ meses desde GAS ──
```

## Funciones completas implicadas

### renderPaymentAppointmentList — línea 6777

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

### selectPaymentAppointment — línea 6805

```javascript
function selectPaymentAppointment(id) {
  const citaSel = document.getElementById('payCitaId');
  if (citaSel) citaSel.value = id || '';
  prefillPaymentFromAppointment();
  renderPaymentAppointmentList();
}
```

### fillPaymentSelectors — línea 6839

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

### prefillPaymentFromAppointment — línea 6853

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

### clearPaymentForm — línea 6862

```javascript
function clearPaymentForm() {
  ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const c = document.getElementById('payCitaId'); if (c) c.value = '';
  updatePaymentProofLabel();
  updateSelectedPaymentCard(null);
  renderPaymentAppointmentList();
}
```

### saveManualPayment — línea 6879

```javascript
async function saveManualPayment(mode = 'verify') {
  const citaId = document.getElementById('payCitaId').value;
  if (!citaId) return toast('Selecciona una cita', 'err');
  const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
  const medioEl = document.getElementById('payMedioPago');
  const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
  const proofFile = await readPaymentProofFile();
  if (proofFile?.error) return toast(proofFile.error, 'err');
  const ref = document.getElementById('payComprobante').value.trim();
  if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
  if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
  if (!medioPago) return toast('Selecciona el medio de pago', 'err');
  if (!proofFile && !ref) return toast('Sin archivo adjunto: escribe una referencia u observación del pago', 'err');
  if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
  const payload = {
    citaId,
    cliente: c?.nombre || '',
    servicioPlan: c?.servicio || '',
    valorEsperado: c?.precio || '',
    valorRecibido: document.getElementById('payValorRecibido').value.trim(),
    medioPago: medioEl?.value || '',
    cuentaReceptora: accountId,
    fechaPago: document.getElementById('payFechaPago').value || today(),
    comprobante: ref,
    estadoPago: 'Por verificar',
    observaciones: document.getElementById('payObservaciones').value.trim(),
    proofFile: proofFile || null
  };
  const d = await fetch(APPS_SCRIPT_URL, {
    method:'POST',
    body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
  }).then(r => r.json());
  if (d.ok) {
    if (mode === 'approve') {
      const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
      const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
      if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
      toast('Pago confirmado y cita autorizada');
    } else {
      toast('Comprobante subido para revisión');
    }
    clearPaymentForm();
    await reload();
    await loadOperationsData();
    renderPagos();
    renderAgenda(true);
  } else toast(d.error || 'No se pudo registrar', 'err');
}
```

### renderPagos — línea 6956

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

### openPago — línea 17141

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

### readPaymentProofFile — línea 6928

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

### verifyPayment — línea 6943

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

### authorizeAssignPro — línea 6713

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

### paymentCandidateAppointments — línea 6764

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

### updateSelectedPaymentCard — línea 6812

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

### updatePaymentProofLabel — línea 6833

```javascript
function updatePaymentProofLabel() {
  const file = document.getElementById('payProofFile')?.files?.[0];
  const label = document.getElementById('payProofLabel');
  if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
}
```

### abrirPagoCita — línea 6870

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

### downloadOperationsCSV — línea 7029

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

### isPagada — línea 8258

```javascript
function isPagada(id) {
  const c = allData.citas.find(x => x.id === id);
  return !!(c && c.pago) || kvGet('pago_'+id) === '1';
}
```

### esCobrada — línea 8278

```javascript
function esCobrada(c) {
  if (normDate(c.fecha) > today()) return false;
  return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
}
```

### abrirModalPago — línea 8283

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

### cerrarModalPago — línea 8295

```javascript
function cerrarModalPago() {
  document.getElementById('modalPago').classList.remove('open');
  _pagoIdActivo = null;
}
```

### _checkCobrosPendientes — línea 17108

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

### marcarPagado — línea 19848

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
