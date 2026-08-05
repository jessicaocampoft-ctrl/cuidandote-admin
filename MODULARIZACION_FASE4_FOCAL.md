# Inventario estricto de Pagos — Fase 4

- Funciones con nombre relacionado: 23
- IDs relacionados: 23
- Handlers HTML relacionados: 17

## Funciones

### markPayablePaid — línea 6783

```javascript
6779:     toast('Cita autorizada para atender');
6780:   } else toast(d.error || 'No se pudo autorizar', 'err');
6781: }
6782: 
6783: async function markPayablePaid(id) {
6784:   if (!confirm('¿Marcar esta cuenta como pagada?')) return;
6785:   const d = await fetch(`${APPS_SCRIPT_URL}?action=markPayablePaid&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6786:   if (d.ok) { await loadTeamData(); renderEquipo(); toast('Cuenta marcada como pagada'); }
6787:   else toast(d.error || 'No se pudo actualizar', 'err');
6788: }
6789: 
6790: async function loadOperationsData() {
6791:   if (!TOKEN) return operationsData;
6792:   try {
6793:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6794:     if (d.ok) operationsData = d;
6795:   } catch(e) {
6796:     console.warn('No se pudo cargar Pagos', e);
6797:   }
6798:   return operationsData;
6799: }
6800: 
6801: async function setupOperationsModuleUI() {
6802:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6803:   if (d.ok) {
6804:     await loadOperationsData();
6805:     renderPagos();
6806:     toast('Módulo de pagos inicializado');
6807:   } else toast(d.error || 'No se pudo inicializar', 'err');
6808: }
6809: 
6810: function paymentAccountLabel(id) {
6811:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6812:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6813: }
6814: 
6815: function paymentCandidateAppointments() {
6816:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6817:   return (allData.citas || [])
6818:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6819:     .sort((a,b) => {
6820:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6821:       const pa = priority(a.estado), pb = priority(b.estado);
6822:       if (pa !== pb) return pa - pb;
6823:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6824:     })
6825:     .slice(0, 160);
6826: }
6827: 
6828: function renderPaymentAppointmentList() {
6829:   const list = document.getElementById('paymentAppointmentList');
6830:   if (!list) return;
6831:   const selectedId = document.getElementById('payCitaId')?.value || '';
6832:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6833:   const citas = paymentCandidateAppointments().filter(c => {
6834:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6835:     return !q || hay.includes(q);
6836:   }).slice(0, 60);
6837:   list.innerHTML = citas.length ? citas.map(c => {
6838:     const active = String(c.id) === String(selectedId);
```

### paymentAccountLabel — línea 6810

```javascript
6806:     toast('Módulo de pagos inicializado');
6807:   } else toast(d.error || 'No se pudo inicializar', 'err');
6808: }
6809: 
6810: function paymentAccountLabel(id) {
6811:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6812:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6813: }
6814: 
6815: function paymentCandidateAppointments() {
6816:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6817:   return (allData.citas || [])
6818:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6819:     .sort((a,b) => {
6820:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6821:       const pa = priority(a.estado), pb = priority(b.estado);
6822:       if (pa !== pb) return pa - pb;
6823:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6824:     })
6825:     .slice(0, 160);
6826: }
6827: 
6828: function renderPaymentAppointmentList() {
6829:   const list = document.getElementById('paymentAppointmentList');
6830:   if (!list) return;
6831:   const selectedId = document.getElementById('payCitaId')?.value || '';
6832:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6833:   const citas = paymentCandidateAppointments().filter(c => {
6834:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6835:     return !q || hay.includes(q);
6836:   }).slice(0, 60);
6837:   list.innerHTML = citas.length ? citas.map(c => {
6838:     const active = String(c.id) === String(selectedId);
6839:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6840:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6841:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6842:         <div>
6843:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6844:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6845:         </div>
6846:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6847:       </div>
6848:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6849:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6850:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6851:       </div>
6852:     </button>`;
6853:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6854: }
6855: 
6856: function selectPaymentAppointment(id) {
6857:   const citaSel = document.getElementById('payCitaId');
6858:   if (citaSel) citaSel.value = id || '';
6859:   prefillPaymentFromAppointment();
6860:   renderPaymentAppointmentList();
6861: }
6862: 
6863: function updateSelectedPaymentCard(c) {
6864:   const card = document.getElementById('selectedPaymentCard');
6865:   if (!card) return;
```

### paymentCandidateAppointments — línea 6815

```javascript
6811:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6812:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6813: }
6814: 
6815: function paymentCandidateAppointments() {
6816:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6817:   return (allData.citas || [])
6818:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6819:     .sort((a,b) => {
6820:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6821:       const pa = priority(a.estado), pb = priority(b.estado);
6822:       if (pa !== pb) return pa - pb;
6823:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6824:     })
6825:     .slice(0, 160);
6826: }
6827: 
6828: function renderPaymentAppointmentList() {
6829:   const list = document.getElementById('paymentAppointmentList');
6830:   if (!list) return;
6831:   const selectedId = document.getElementById('payCitaId')?.value || '';
6832:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6833:   const citas = paymentCandidateAppointments().filter(c => {
6834:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6835:     return !q || hay.includes(q);
6836:   }).slice(0, 60);
6837:   list.innerHTML = citas.length ? citas.map(c => {
6838:     const active = String(c.id) === String(selectedId);
6839:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6840:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6841:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6842:         <div>
6843:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6844:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6845:         </div>
6846:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6847:       </div>
6848:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6849:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6850:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6851:       </div>
6852:     </button>`;
6853:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6854: }
6855: 
6856: function selectPaymentAppointment(id) {
6857:   const citaSel = document.getElementById('payCitaId');
6858:   if (citaSel) citaSel.value = id || '';
6859:   prefillPaymentFromAppointment();
6860:   renderPaymentAppointmentList();
6861: }
6862: 
6863: function updateSelectedPaymentCard(c) {
6864:   const card = document.getElementById('selectedPaymentCard');
6865:   if (!card) return;
6866:   if (!c) {
6867:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6868:     return;
6869:   }
6870:   card.innerHTML = `
```

### renderPaymentAppointmentList — línea 6828

```javascript
6824:     })
6825:     .slice(0, 160);
6826: }
6827: 
6828: function renderPaymentAppointmentList() {
6829:   const list = document.getElementById('paymentAppointmentList');
6830:   if (!list) return;
6831:   const selectedId = document.getElementById('payCitaId')?.value || '';
6832:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6833:   const citas = paymentCandidateAppointments().filter(c => {
6834:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6835:     return !q || hay.includes(q);
6836:   }).slice(0, 60);
6837:   list.innerHTML = citas.length ? citas.map(c => {
6838:     const active = String(c.id) === String(selectedId);
6839:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
6840:     return `<button type="button" onclick="selectPaymentAppointment('${esc(c.id)}')" style="width:100%;text-align:left;border:1px solid ${active ? 'var(--primary)' : 'var(--border)'};background:${active ? 'rgba(20,184,166,.10)' : 'var(--s2)'};border-radius:14px;padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text);transition:.2s ease">
6841:       <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
6842:         <div>
6843:           <div style="font-weight:800;color:var(--text);font-size:.95rem">${esc(c.nombre || 'Paciente')}</div>
6844:           <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6845:         </div>
6846:         <span class="team-pill ${pending ? 'warn' : 'info'}">${esc(c.estado || 'Sin estado')}</span>
6847:       </div>
6848:       <div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:.82rem">
6849:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6850:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6851:       </div>
6852:     </button>`;
6853:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6854: }
6855: 
6856: function selectPaymentAppointment(id) {
6857:   const citaSel = document.getElementById('payCitaId');
6858:   if (citaSel) citaSel.value = id || '';
6859:   prefillPaymentFromAppointment();
6860:   renderPaymentAppointmentList();
6861: }
6862: 
6863: function updateSelectedPaymentCard(c) {
6864:   const card = document.getElementById('selectedPaymentCard');
6865:   if (!card) return;
6866:   if (!c) {
6867:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6868:     return;
6869:   }
6870:   card.innerHTML = `
6871:     <div class="team-card-head">
6872:       <div>
6873:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6874:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6875:       </div>
6876:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6877:     </div>
6878:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6879:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6880:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6881:     </div>`;
6882: }
6883: 
```

### selectPaymentAppointment — línea 6856

```javascript
6852:     </button>`;
6853:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6854: }
6855: 
6856: function selectPaymentAppointment(id) {
6857:   const citaSel = document.getElementById('payCitaId');
6858:   if (citaSel) citaSel.value = id || '';
6859:   prefillPaymentFromAppointment();
6860:   renderPaymentAppointmentList();
6861: }
6862: 
6863: function updateSelectedPaymentCard(c) {
6864:   const card = document.getElementById('selectedPaymentCard');
6865:   if (!card) return;
6866:   if (!c) {
6867:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6868:     return;
6869:   }
6870:   card.innerHTML = `
6871:     <div class="team-card-head">
6872:       <div>
6873:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6874:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6875:       </div>
6876:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6877:     </div>
6878:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6879:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6880:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6881:     </div>`;
6882: }
6883: 
6884: function updatePaymentProofLabel() {
6885:   const file = document.getElementById('payProofFile')?.files?.[0];
6886:   const label = document.getElementById('payProofLabel');
6887:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6888: }
6889: 
6890: function fillPaymentSelectors(selectedId = '') {
6891:   const citas = paymentCandidateAppointments();
6892:   const citaSel = document.getElementById('payCitaId');
6893:   if (citaSel) {
6894:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6895:   }
6896:   const medioSel = document.getElementById('payMedioPago');
6897:   if (medioSel) {
6898:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6899:   }
6900:   prefillPaymentFromAppointment();
6901:   renderPaymentAppointmentList();
6902: }
6903: 
6904: function prefillPaymentFromAppointment() {
6905:   const id = document.getElementById('payCitaId')?.value || '';
6906:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6907:   updateSelectedPaymentCard(c);
6908:   if (!c) return;
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
```

### updateSelectedPaymentCard — línea 6863

```javascript
6859:   prefillPaymentFromAppointment();
6860:   renderPaymentAppointmentList();
6861: }
6862: 
6863: function updateSelectedPaymentCard(c) {
6864:   const card = document.getElementById('selectedPaymentCard');
6865:   if (!card) return;
6866:   if (!c) {
6867:     card.innerHTML = '<h3>Sin cita seleccionada</h3><div class="team-muted">Elige una cita de la lista para cargar sus datos automáticamente.</div>';
6868:     return;
6869:   }
6870:   card.innerHTML = `
6871:     <div class="team-card-head">
6872:       <div>
6873:         <h3>${esc(c.nombre || 'Paciente')}</h3>
6874:         <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora || '')} · ${esc(c.servicio || '')}</div>
6875:       </div>
6876:       <span class="team-pill info">${esc(c.estado || 'Sin estado')}</span>
6877:     </div>
6878:     <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
6879:       <div class="team-muted">Valor esperado<br><strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong></div>
6880:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6881:     </div>`;
6882: }
6883: 
6884: function updatePaymentProofLabel() {
6885:   const file = document.getElementById('payProofFile')?.files?.[0];
6886:   const label = document.getElementById('payProofLabel');
6887:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6888: }
6889: 
6890: function fillPaymentSelectors(selectedId = '') {
6891:   const citas = paymentCandidateAppointments();
6892:   const citaSel = document.getElementById('payCitaId');
6893:   if (citaSel) {
6894:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6895:   }
6896:   const medioSel = document.getElementById('payMedioPago');
6897:   if (medioSel) {
6898:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6899:   }
6900:   prefillPaymentFromAppointment();
6901:   renderPaymentAppointmentList();
6902: }
6903: 
6904: function prefillPaymentFromAppointment() {
6905:   const id = document.getElementById('payCitaId')?.value || '';
6906:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6907:   updateSelectedPaymentCard(c);
6908:   if (!c) return;
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
6912: 
6913: function clearPaymentForm() {
6914:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6915:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6916:   updatePaymentProofLabel();
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
```

### updatePaymentProofLabel — línea 6884

```javascript
6880:       <div class="team-muted">Modalidad<br><strong style="color:var(--text)">${esc(c.modalidad || '')}</strong></div>
6881:     </div>`;
6882: }
6883: 
6884: function updatePaymentProofLabel() {
6885:   const file = document.getElementById('payProofFile')?.files?.[0];
6886:   const label = document.getElementById('payProofLabel');
6887:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6888: }
6889: 
6890: function fillPaymentSelectors(selectedId = '') {
6891:   const citas = paymentCandidateAppointments();
6892:   const citaSel = document.getElementById('payCitaId');
6893:   if (citaSel) {
6894:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6895:   }
6896:   const medioSel = document.getElementById('payMedioPago');
6897:   if (medioSel) {
6898:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6899:   }
6900:   prefillPaymentFromAppointment();
6901:   renderPaymentAppointmentList();
6902: }
6903: 
6904: function prefillPaymentFromAppointment() {
6905:   const id = document.getElementById('payCitaId')?.value || '';
6906:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6907:   updateSelectedPaymentCard(c);
6908:   if (!c) return;
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
6912: 
6913: function clearPaymentForm() {
6914:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6915:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6916:   updatePaymentProofLabel();
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
6919: }
6920: 
6921: function abrirPagoCita(id) {
6922:   showView('pagos');
6923:   setTimeout(() => {
6924:     fillPaymentSelectors(id);
6925:     const el = document.getElementById('payValorRecibido');
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
```

### fillPaymentSelectors — línea 6890

```javascript
6886:   const label = document.getElementById('payProofLabel');
6887:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6888: }
6889: 
6890: function fillPaymentSelectors(selectedId = '') {
6891:   const citas = paymentCandidateAppointments();
6892:   const citaSel = document.getElementById('payCitaId');
6893:   if (citaSel) {
6894:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6895:   }
6896:   const medioSel = document.getElementById('payMedioPago');
6897:   if (medioSel) {
6898:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6899:   }
6900:   prefillPaymentFromAppointment();
6901:   renderPaymentAppointmentList();
6902: }
6903: 
6904: function prefillPaymentFromAppointment() {
6905:   const id = document.getElementById('payCitaId')?.value || '';
6906:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6907:   updateSelectedPaymentCard(c);
6908:   if (!c) return;
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
6912: 
6913: function clearPaymentForm() {
6914:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6915:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6916:   updatePaymentProofLabel();
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
6919: }
6920: 
6921: function abrirPagoCita(id) {
6922:   showView('pagos');
6923:   setTimeout(() => {
6924:     fillPaymentSelectors(id);
6925:     const el = document.getElementById('payValorRecibido');
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
6940:     }
6941:     const tones = {
6942:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6943:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6944:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6945:     };
```

### prefillPaymentFromAppointment — línea 6904

```javascript
6900:   prefillPaymentFromAppointment();
6901:   renderPaymentAppointmentList();
6902: }
6903: 
6904: function prefillPaymentFromAppointment() {
6905:   const id = document.getElementById('payCitaId')?.value || '';
6906:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6907:   updateSelectedPaymentCard(c);
6908:   if (!c) return;
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
6912: 
6913: function clearPaymentForm() {
6914:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6915:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6916:   updatePaymentProofLabel();
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
6919: }
6920: 
6921: function abrirPagoCita(id) {
6922:   showView('pagos');
6923:   setTimeout(() => {
6924:     fillPaymentSelectors(id);
6925:     const el = document.getElementById('payValorRecibido');
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
6940:     }
6941:     const tones = {
6942:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6943:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6944:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6945:     };
6946:     const colors = tones[tone] || tones.info;
6947:     statusEl.style.display = 'block';
6948:     statusEl.style.background = colors[0];
6949:     statusEl.style.color = colors[1];
6950:     statusEl.style.border = '1px solid ' + colors[2];
6951:     statusEl.textContent = message;
6952:   };
6953: 
6954:   const citaEl = document.getElementById('payCitaId');
6955:   const valorEl = document.getElementById('payValorRecibido');
6956:   const fechaEl = document.getElementById('payFechaPago');
6957:   const medioEl = document.getElementById('payMedioPago');
6958:   const refEl = document.getElementById('payComprobante');
6959:   const obsEl = document.getElementById('payObservaciones');
```

### clearPaymentForm — línea 6913

```javascript
6909:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6910:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6911: }
6912: 
6913: function clearPaymentForm() {
6914:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6915:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6916:   updatePaymentProofLabel();
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
6919: }
6920: 
6921: function abrirPagoCita(id) {
6922:   showView('pagos');
6923:   setTimeout(() => {
6924:     fillPaymentSelectors(id);
6925:     const el = document.getElementById('payValorRecibido');
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
6940:     }
6941:     const tones = {
6942:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6943:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6944:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6945:     };
6946:     const colors = tones[tone] || tones.info;
6947:     statusEl.style.display = 'block';
6948:     statusEl.style.background = colors[0];
6949:     statusEl.style.color = colors[1];
6950:     statusEl.style.border = '1px solid ' + colors[2];
6951:     statusEl.textContent = message;
6952:   };
6953: 
6954:   const citaEl = document.getElementById('payCitaId');
6955:   const valorEl = document.getElementById('payValorRecibido');
6956:   const fechaEl = document.getElementById('payFechaPago');
6957:   const medioEl = document.getElementById('payMedioPago');
6958:   const refEl = document.getElementById('payComprobante');
6959:   const obsEl = document.getElementById('payObservaciones');
6960: 
6961:   const citaId = citaEl?.value || '';
6962:   const valorRecibido = valorEl?.value.trim() || '';
6963:   const fechaPago = fechaEl?.value || '';
6964:   const medioPago = medioEl?.value || '';
6965:   const ref = refEl?.value.trim() || '';
6966:   const observaciones = obsEl?.value.trim() || '';
6967: 
6968:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
```

### abrirPagoCita — línea 6921

```javascript
6917:   updateSelectedPaymentCard(null);
6918:   renderPaymentAppointmentList();
6919: }
6920: 
6921: function abrirPagoCita(id) {
6922:   showView('pagos');
6923:   setTimeout(() => {
6924:     fillPaymentSelectors(id);
6925:     const el = document.getElementById('payValorRecibido');
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
6940:     }
6941:     const tones = {
6942:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6943:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6944:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6945:     };
6946:     const colors = tones[tone] || tones.info;
6947:     statusEl.style.display = 'block';
6948:     statusEl.style.background = colors[0];
6949:     statusEl.style.color = colors[1];
6950:     statusEl.style.border = '1px solid ' + colors[2];
6951:     statusEl.textContent = message;
6952:   };
6953: 
6954:   const citaEl = document.getElementById('payCitaId');
6955:   const valorEl = document.getElementById('payValorRecibido');
6956:   const fechaEl = document.getElementById('payFechaPago');
6957:   const medioEl = document.getElementById('payMedioPago');
6958:   const refEl = document.getElementById('payComprobante');
6959:   const obsEl = document.getElementById('payObservaciones');
6960: 
6961:   const citaId = citaEl?.value || '';
6962:   const valorRecibido = valorEl?.value.trim() || '';
6963:   const fechaPago = fechaEl?.value || '';
6964:   const medioPago = medioEl?.value || '';
6965:   const ref = refEl?.value.trim() || '';
6966:   const observaciones = obsEl?.value.trim() || '';
6967: 
6968:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
6969:   if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
6970:   if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
6971:   if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }
6972: 
6973:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6974:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6975: 
6976:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
```

### saveManualPayment — línea 6930

```javascript
6926:     if (el) el.focus();
6927:   }, 350);
6928: }
6929: 
6930: async function saveManualPayment(mode = 'verify') {
6931:   const statusEl = document.getElementById('payActionStatus');
6932:   const verifyBtn = document.getElementById('payVerifyBtn');
6933:   const approveBtn = document.getElementById('payApproveBtn');
6934:   const setStatus = (message = '', tone = 'info') => {
6935:     if (!statusEl) return;
6936:     if (!message) {
6937:       statusEl.style.display = 'none';
6938:       statusEl.textContent = '';
6939:       return;
6940:     }
6941:     const tones = {
6942:       info: ['rgba(20,184,166,.10)', 'var(--primary)', 'rgba(20,184,166,.28)'],
6943:       ok: ['rgba(16,185,129,.10)', '#047857', 'rgba(16,185,129,.28)'],
6944:       err: ['rgba(239,68,68,.10)', '#b91c1c', 'rgba(239,68,68,.28)']
6945:     };
6946:     const colors = tones[tone] || tones.info;
6947:     statusEl.style.display = 'block';
6948:     statusEl.style.background = colors[0];
6949:     statusEl.style.color = colors[1];
6950:     statusEl.style.border = '1px solid ' + colors[2];
6951:     statusEl.textContent = message;
6952:   };
6953: 
6954:   const citaEl = document.getElementById('payCitaId');
6955:   const valorEl = document.getElementById('payValorRecibido');
6956:   const fechaEl = document.getElementById('payFechaPago');
6957:   const medioEl = document.getElementById('payMedioPago');
6958:   const refEl = document.getElementById('payComprobante');
6959:   const obsEl = document.getElementById('payObservaciones');
6960: 
6961:   const citaId = citaEl?.value || '';
6962:   const valorRecibido = valorEl?.value.trim() || '';
6963:   const fechaPago = fechaEl?.value || '';
6964:   const medioPago = medioEl?.value || '';
6965:   const ref = refEl?.value.trim() || '';
6966:   const observaciones = obsEl?.value.trim() || '';
6967: 
6968:   if (!citaId) { setStatus('Selecciona una cita.', 'err'); return toast('Selecciona una cita', 'err'); }
6969:   if (!valorRecibido) { setStatus('Escribe el valor recibido.', 'err'); return toast('Escribe el valor recibido', 'err'); }
6970:   if (!fechaPago) { setStatus('Selecciona la fecha del pago.', 'err'); return toast('Selecciona la fecha del pago', 'err'); }
6971:   if (!medioPago) { setStatus('Selecciona el medio de pago.', 'err'); return toast('Selecciona el medio de pago', 'err'); }
6972: 
6973:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6974:   if (!c) { setStatus('La cita seleccionada ya no está disponible. Pulsa Actualizar y vuelve a seleccionarla.', 'err'); return toast('No encontré la cita seleccionada', 'err'); }
6975: 
6976:   if (mode === 'approve' && !confirm('¿Confirmas que el dinero ya ingresó y quieres autorizar esta cita para atender?')) return;
6977: 
6978:   const originalVerify = verifyBtn?.textContent || 'Subir para revisar';
6979:   const originalApprove = approveBtn?.textContent || 'Confirmar pago y autorizar';
6980:   if (verifyBtn) verifyBtn.disabled = true;
6981:   if (approveBtn) approveBtn.disabled = true;
6982:   if (mode === 'approve' && approveBtn) approveBtn.textContent = 'Confirmando...';
6983:   if (mode !== 'approve' && verifyBtn) verifyBtn.textContent = 'Guardando...';
6984:   setStatus(mode === 'approve' ? 'Confirmando el pago y autorizando la cita...' : 'Guardando el comprobante...', 'info');
6985: 
```

### readPaymentProofFile — línea 7045

```javascript
7041:     if (approveBtn) { approveBtn.disabled = false; approveBtn.textContent = originalApprove; }
7042:   }
7043: }
7044: 
7045: function readPaymentProofFile() {
7046:   const input = document.getElementById('payProofFile');
7047:   const file = input?.files?.[0];
7048:   if (!file) return Promise.resolve(null);
7049:   const allowed = ['image/jpeg','image/png','application/pdf'];
7050:   if (!allowed.includes(file.type)) return Promise.resolve({error:'El comprobante debe ser JPG, PNG o PDF'});
7051:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7052:   return new Promise(resolve => {
7053:     const reader = new FileReader();
7054:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7055:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7056:     reader.readAsDataURL(file);
7057:   });
7058: }
7059: 
7060: async function verifyPayment(id, status) {
7061:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7062:   if (!confirm(`¿Confirmas ${label}?`)) return;
7063:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7064:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7065:   if (d.ok) {
7066:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7067:     await reload();
7068:     await loadOperationsData();
7069:     renderPagos();
7070:   } else toast(d.error || 'No se pudo verificar', 'err');
7071: }
7072: 
7073: function renderPagos() {
7074:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7075:   const pagos = operationsData.pagos || [];
7076:   const pagosUnicos = [];
7077:   const seenPayments = new Set();
7078:   pagos.forEach(p => {
7079:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7080:     if (seenPayments.has(key)) return;
7081:     seenPayments.add(key);
7082:     pagosUnicos.push(p);
7083:   });
7084:   const cuentas = operationsData.cuentas || [];
7085:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7086:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7087:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7088:   document.getElementById('pagosStats').innerHTML = [
7089:     ['Por verificar', porVerificar],
7090:     ['Aprobados', aprobados],
7091:     ['Rechazados', rechazados],
7092:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7093:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7094: 
7095:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7096:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7097:     .map(a => `<div class="team-card">
7098:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7099:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7100:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
```

### verifyPayment — línea 7060

```javascript
7056:     reader.readAsDataURL(file);
7057:   });
7058: }
7059: 
7060: async function verifyPayment(id, status) {
7061:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7062:   if (!confirm(`¿Confirmas ${label}?`)) return;
7063:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7064:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7065:   if (d.ok) {
7066:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7067:     await reload();
7068:     await loadOperationsData();
7069:     renderPagos();
7070:   } else toast(d.error || 'No se pudo verificar', 'err');
7071: }
7072: 
7073: function renderPagos() {
7074:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7075:   const pagos = operationsData.pagos || [];
7076:   const pagosUnicos = [];
7077:   const seenPayments = new Set();
7078:   pagos.forEach(p => {
7079:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7080:     if (seenPayments.has(key)) return;
7081:     seenPayments.add(key);
7082:     pagosUnicos.push(p);
7083:   });
7084:   const cuentas = operationsData.cuentas || [];
7085:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7086:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7087:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7088:   document.getElementById('pagosStats').innerHTML = [
7089:     ['Por verificar', porVerificar],
7090:     ['Aprobados', aprobados],
7091:     ['Rechazados', rechazados],
7092:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7093:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7094: 
7095:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7096:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7097:     .map(a => `<div class="team-card">
7098:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7099:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7100:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7101: 
7102:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7103:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7104:     return `<div class="team-card">
7105:       <div class="team-card-head">
7106:         <div>
7107:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7108:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7109:         </div>
7110:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7111:       </div>
7112:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7113:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7114:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7115:       <div class="team-card-actions">
```

### renderPagos — línea 7073

```javascript
7069:     renderPagos();
7070:   } else toast(d.error || 'No se pudo verificar', 'err');
7071: }
7072: 
7073: function renderPagos() {
7074:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
7075:   const pagos = operationsData.pagos || [];
7076:   const pagosUnicos = [];
7077:   const seenPayments = new Set();
7078:   pagos.forEach(p => {
7079:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
7080:     if (seenPayments.has(key)) return;
7081:     seenPayments.add(key);
7082:     pagosUnicos.push(p);
7083:   });
7084:   const cuentas = operationsData.cuentas || [];
7085:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
7086:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
7087:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
7088:   document.getElementById('pagosStats').innerHTML = [
7089:     ['Por verificar', porVerificar],
7090:     ['Aprobados', aprobados],
7091:     ['Rechazados', rechazados],
7092:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
7093:   ].map(([label,val]) => `<div class="team-stat"><small>${esc(label)}</small><strong>${esc(val)}</strong></div>`).join('');
7094: 
7095:   document.getElementById('paymentAccountsList').innerHTML = cuentas.length ? cuentas
7096:     .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0))
7097:     .map(a => `<div class="team-card">
7098:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
7099:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
7100:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
7101: 
7102:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
7103:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
7104:     return `<div class="team-card">
7105:       <div class="team-card-head">
7106:         <div>
7107:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
7108:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
7109:         </div>
7110:         <span class="team-pill ${tone}">${esc(p.EstadoPago || 'Pendiente')}</span>
7111:       </div>
7112:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
7113:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
7114:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
7115:       <div class="team-card-actions">
7116:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
7117:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
7118:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
7119:       </div>
7120:     </div>`;
7121:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
7122: 
7123:   const planTemplates = operationsData.plantillasPlanes || [];
7124:   const clientPlans = operationsData.planesCliente || [];
7125:   const settlements = operationsData.liquidaciones || [];
7126:   const history = operationsData.historialEstados || [];
7127:   document.getElementById('plansAuditList').innerHTML = `
7128:     <div class="team-card">
```

### exportPaymentsCSV — línea 7156

```javascript
7152:   a.click();
7153:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
7154: }
7155: 
7156: function exportPaymentsCSV() {
7157:   const rows = [['ID','Código reserva','Cita','Cliente','Servicio/plan','Valor esperado','Valor recibido','Medio','Cuenta','Fecha pago','Fecha verificación','Estado','Verificó','Observaciones']];
7158:   (operationsData.pagos || []).forEach(p => rows.push([
7159:     p.ID, p.CodigoReserva, p.CitaID, p.Cliente, p.ServicioPlan, p.ValorEsperado, p.ValorRecibido,
7160:     p.MedioPago, paymentAccountLabel(p.CuentaReceptora), p.FechaPago, p.FechaVerificacion, p.EstadoPago, p.UsuarioVerifico, p.Observaciones
7161:   ]));
7162:   downloadOperationsCSV(`pagos_operativos_${today()}.csv`, rows);
7163: }
7164: 
7165: function exportOperationsAuditCSV() {
7166:   const rows = [['ID','Fecha','Usuario','Rol','Acción','Entidad','ID entidad','Antes','Después','Motivo']];
7167:   (operationsData.auditoria || []).forEach(a => rows.push([
7168:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7169:   ]));
7170:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7171: }
7172: 
7173: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7174:   return window.PanelApi.fetchJsonWithTimeout(url, options, timeoutMs);
7175: }
7176: 
7177: function openProfessionalLoginMode() {
7178:   return window.PanelSession.openProfessionalLoginMode(_sessionBridge());
7179: }
7180: 
7181: function backToAdminLogin() {
7182:   return window.PanelSession.backToAdminLogin(_sessionBridge());
7183: }
7184: 
7185: async function doProfessionalLogin() {
7186:   return window.PanelSession.doProfessionalLogin(_sessionBridge());
7187: }
7188: 
7189: async function changeProfessionalPassword() {
7190:   return window.PanelSession.changeProfessionalPassword(_sessionBridge());
7191: }
7192: 
7193: async function showProfessionalApp() {
7194:   return window.PanelSession.showProfessionalApp(_sessionBridge());
7195: }
7196: 
7197: async function loadProfessionalAgenda() {
7198:   return window.PanelSession.loadProfessionalAgenda(_sessionBridge());
7199: }
7200: 
7201: function setProfessionalMode(mode) {
7202:   professionalMode = mode;
7203:   document.querySelectorAll('.pro-seg').forEach(b => b.classList.remove('active'));
7204:   const btn = document.getElementById('proMode-' + mode);
7205:   if (btn) btn.classList.add('active');
7206:   renderProfessionalAgenda();
7207: }
7208: 
7209: function renderProfessionalAgenda() {
7210:   const selected = document.getElementById('proDate').value || today();
7211:   const base = professionalAgenda.slice().sort((a,b) => (`${a.fecha} ${a.hora}`).localeCompare(`${b.fecha} ${b.hora}`));
```

### getMetodoPago — línea 8122

```javascript
8118:   const c = allData.citas.find(x => x.id === id);
8119:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8120: }
8121: 
8122: function getMetodoPago(id) {
8123:   const c = allData.citas.find(x => x.id === id);
8124:   return (c && c.pago) || '';
8125: }
8126: 
8127: function pagoBadge(id) {
8128:   const c      = allData.citas.find(x => x.id === id);
8129:   const future = c && normDate(c.fecha) > today();
8130:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8131:   const metodo = getMetodoPago(id);
8132:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8133:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8134:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8135: }
8136: 
8137: function esCobrada(c) {
8138:   if (normDate(c.fecha) > today()) return false;
8139:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8140: }
8141: 
8142: function abrirModalPago(id) {
8143:   _pagoIdActivo = id;
8144:   const c = allData.citas.find(x => x.id === id);
8145:   const sub = document.getElementById('pagoModalNombre');
8146:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8147:   const metodoActual = c ? c.pago : '';
8148:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8149:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8150:   });
8151:   document.getElementById('modalPago').classList.add('open');
8152: }
8153: 
8154: function cerrarModalPago() {
8155:   document.getElementById('modalPago').classList.remove('open');
8156:   _pagoIdActivo = null;
8157: }
8158: 
8159: async function confirmarPago(metodo) {
8160:   if (!_pagoIdActivo) return;
8161:   const id = _pagoIdActivo;
8162:   cerrarModalPago();
8163:   try {
8164:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8165:     if (r.ok) {
8166:       const c = allData.citas.find(x => x.id === id);
8167:       if (c) c.pago = metodo;
8168:       if (metodo) kvSet('pago_'+id, '1');
8169:       else kvRemove('pago_'+id);
8170:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8171:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8172:       renderAgenda(); initDashboard(); renderFinanzas();
8173:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8174:   } catch(e) { toast('Error de conexión', 'err'); }
8175: }
8176: 
8177: // ── ALERTA CITA PRÓXIMA ──
```

### pagoBadge — línea 8127

```javascript
8123:   const c = allData.citas.find(x => x.id === id);
8124:   return (c && c.pago) || '';
8125: }
8126: 
8127: function pagoBadge(id) {
8128:   const c      = allData.citas.find(x => x.id === id);
8129:   const future = c && normDate(c.fecha) > today();
8130:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8131:   const metodo = getMetodoPago(id);
8132:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8133:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8134:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8135: }
8136: 
8137: function esCobrada(c) {
8138:   if (normDate(c.fecha) > today()) return false;
8139:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8140: }
8141: 
8142: function abrirModalPago(id) {
8143:   _pagoIdActivo = id;
8144:   const c = allData.citas.find(x => x.id === id);
8145:   const sub = document.getElementById('pagoModalNombre');
8146:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8147:   const metodoActual = c ? c.pago : '';
8148:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8149:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8150:   });
8151:   document.getElementById('modalPago').classList.add('open');
8152: }
8153: 
8154: function cerrarModalPago() {
8155:   document.getElementById('modalPago').classList.remove('open');
8156:   _pagoIdActivo = null;
8157: }
8158: 
8159: async function confirmarPago(metodo) {
8160:   if (!_pagoIdActivo) return;
8161:   const id = _pagoIdActivo;
8162:   cerrarModalPago();
8163:   try {
8164:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8165:     if (r.ok) {
8166:       const c = allData.citas.find(x => x.id === id);
8167:       if (c) c.pago = metodo;
8168:       if (metodo) kvSet('pago_'+id, '1');
8169:       else kvRemove('pago_'+id);
8170:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8171:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8172:       renderAgenda(); initDashboard(); renderFinanzas();
8173:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8174:   } catch(e) { toast('Error de conexión', 'err'); }
8175: }
8176: 
8177: // ── ALERTA CITA PRÓXIMA ──
8178: function checkUpcomingAlerts() {
8179:   const now      = new Date();
8180:   const todayStr = today();
8181:   const banner   = document.getElementById('upcomingAlert');
8182:   if (!banner) return;
```

### abrirModalPago — línea 8142

```javascript
8138:   if (normDate(c.fecha) > today()) return false;
8139:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8140: }
8141: 
8142: function abrirModalPago(id) {
8143:   _pagoIdActivo = id;
8144:   const c = allData.citas.find(x => x.id === id);
8145:   const sub = document.getElementById('pagoModalNombre');
8146:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8147:   const metodoActual = c ? c.pago : '';
8148:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8149:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8150:   });
8151:   document.getElementById('modalPago').classList.add('open');
8152: }
8153: 
8154: function cerrarModalPago() {
8155:   document.getElementById('modalPago').classList.remove('open');
8156:   _pagoIdActivo = null;
8157: }
8158: 
8159: async function confirmarPago(metodo) {
8160:   if (!_pagoIdActivo) return;
8161:   const id = _pagoIdActivo;
8162:   cerrarModalPago();
8163:   try {
8164:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8165:     if (r.ok) {
8166:       const c = allData.citas.find(x => x.id === id);
8167:       if (c) c.pago = metodo;
8168:       if (metodo) kvSet('pago_'+id, '1');
8169:       else kvRemove('pago_'+id);
8170:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8171:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8172:       renderAgenda(); initDashboard(); renderFinanzas();
8173:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8174:   } catch(e) { toast('Error de conexión', 'err'); }
8175: }
8176: 
8177: // ── ALERTA CITA PRÓXIMA ──
8178: function checkUpcomingAlerts() {
8179:   const now      = new Date();
8180:   const todayStr = today();
8181:   const banner   = document.getElementById('upcomingAlert');
8182:   if (!banner) return;
8183: 
8184:   const candidates = allData.citas
8185:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8186:     .map(c => {
8187:       const [h, m] = c.hora.split(':').map(Number);
8188:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8189:       const diff = (dt - now) / 60000;
8190:       return { ...c, diff };
8191:     })
8192:     .filter(c => c.diff > 0 && c.diff <= 120)
8193:     .sort((a, b) => a.diff - b.diff);
8194: 
8195:   if (!candidates.length) { banner.classList.remove('show'); return; }
8196:   const next = candidates[0];
8197:   const mins = Math.round(next.diff);
```

### cerrarModalPago — línea 8154

```javascript
8150:   });
8151:   document.getElementById('modalPago').classList.add('open');
8152: }
8153: 
8154: function cerrarModalPago() {
8155:   document.getElementById('modalPago').classList.remove('open');
8156:   _pagoIdActivo = null;
8157: }
8158: 
8159: async function confirmarPago(metodo) {
8160:   if (!_pagoIdActivo) return;
8161:   const id = _pagoIdActivo;
8162:   cerrarModalPago();
8163:   try {
8164:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8165:     if (r.ok) {
8166:       const c = allData.citas.find(x => x.id === id);
8167:       if (c) c.pago = metodo;
8168:       if (metodo) kvSet('pago_'+id, '1');
8169:       else kvRemove('pago_'+id);
8170:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8171:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8172:       renderAgenda(); initDashboard(); renderFinanzas();
8173:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8174:   } catch(e) { toast('Error de conexión', 'err'); }
8175: }
8176: 
8177: // ── ALERTA CITA PRÓXIMA ──
8178: function checkUpcomingAlerts() {
8179:   const now      = new Date();
8180:   const todayStr = today();
8181:   const banner   = document.getElementById('upcomingAlert');
8182:   if (!banner) return;
8183: 
8184:   const candidates = allData.citas
8185:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8186:     .map(c => {
8187:       const [h, m] = c.hora.split(':').map(Number);
8188:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8189:       const diff = (dt - now) / 60000;
8190:       return { ...c, diff };
8191:     })
8192:     .filter(c => c.diff > 0 && c.diff <= 120)
8193:     .sort((a, b) => a.diff - b.diff);
8194: 
8195:   if (!candidates.length) { banner.classList.remove('show'); return; }
8196:   const next = candidates[0];
8197:   const mins = Math.round(next.diff);
8198:   document.getElementById('upcomingAlertTxt').innerHTML =
8199:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8200:   document.getElementById('upcomingAlertMins').textContent =
8201:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
8202:   banner.classList.add('show');
8203: }
8204: 
8205: // ── EXPORTAR AGENDA DEL DÍA ──
8206: function exportarAgendaDia() {
8207:   const todayStr = today();
8208:   const citas = allData.citas
8209:     .filter(c => normDate(c.fecha) === todayStr && c.estado !== 'Cancelada')
```

### confirmarPago — línea 8159

```javascript
8155:   document.getElementById('modalPago').classList.remove('open');
8156:   _pagoIdActivo = null;
8157: }
8158: 
8159: async function confirmarPago(metodo) {
8160:   if (!_pagoIdActivo) return;
8161:   const id = _pagoIdActivo;
8162:   cerrarModalPago();
8163:   try {
8164:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8165:     if (r.ok) {
8166:       const c = allData.citas.find(x => x.id === id);
8167:       if (c) c.pago = metodo;
8168:       if (metodo) kvSet('pago_'+id, '1');
8169:       else kvRemove('pago_'+id);
8170:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8171:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8172:       renderAgenda(); initDashboard(); renderFinanzas();
8173:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8174:   } catch(e) { toast('Error de conexión', 'err'); }
8175: }
8176: 
8177: // ── ALERTA CITA PRÓXIMA ──
8178: function checkUpcomingAlerts() {
8179:   const now      = new Date();
8180:   const todayStr = today();
8181:   const banner   = document.getElementById('upcomingAlert');
8182:   if (!banner) return;
8183: 
8184:   const candidates = allData.citas
8185:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8186:     .map(c => {
8187:       const [h, m] = c.hora.split(':').map(Number);
8188:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8189:       const diff = (dt - now) / 60000;
8190:       return { ...c, diff };
8191:     })
8192:     .filter(c => c.diff > 0 && c.diff <= 120)
8193:     .sort((a, b) => a.diff - b.diff);
8194: 
8195:   if (!candidates.length) { banner.classList.remove('show'); return; }
8196:   const next = candidates[0];
8197:   const mins = Math.round(next.diff);
8198:   document.getElementById('upcomingAlertTxt').innerHTML =
8199:     `Próxima cita: <strong>${next.nombre}</strong> — ${next.servicio}`;
8200:   document.getElementById('upcomingAlertMins').textContent =
8201:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
8202:   banner.classList.add('show');
8203: }
8204: 
8205: // ── EXPORTAR AGENDA DEL DÍA ──
8206: function exportarAgendaDia() {
8207:   const todayStr = today();
8208:   const citas = allData.citas
8209:     .filter(c => normDate(c.fecha) === todayStr && c.estado !== 'Cancelada')
8210:     .sort((a, b) => a.hora.localeCompare(b.hora));
8211:   if (!citas.length) { toast('No hay citas hoy para exportar', 'err'); return; }
8212: 
8213:   const fecha = new Date().toLocaleDateString('es-CO', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
8214:   let txt = `AGENDA — ${fecha.toUpperCase()}\n${'='.repeat(52)}\n\n`;
```

### openPago — línea 17000

```javascript
16996:     </div>`;
16997:   }).join('');
16998: }
16999: 
17000: function openPago(citaId) {
17001:   showView('pagos');
17002:   setTimeout(() => {
17003:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17004:     const selector = document.getElementById('payCitaId');
17005:     if (selector) {
17006:       selector.value = citaId || '';
17007:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17008:       selector.focus();
17009:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17010:     } else {
17011:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17012:     }
17013:   }, 100);
17014: }
17015: 
17016: // ── Alerta semana floja ──
17017: function _checkAlertaSemanFloja(citas) {
17018:   const now = new Date();
17019:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17020:   const hoyStr = today();
17021: 
17022:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17023:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17024:   const finEl  = document.getElementById('alertaSemanFlojaFin');
17025:   const txtEl  = document.getElementById('alertaSemanFlojaTxt');
17026: 
17027:   const apagar = () => {
17028:     if (dashEl) dashEl.style.display = 'none';
17029:     if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
17030:   };
17031: 
17032:   if (dow < 3 || dow > 5) { apagar(); return; }
17033: 
17034:   // Calcular ingresos semana actual (lunes a hoy)
17035:   const lunes = new Date(now);
17036:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17037:   lunes.setHours(0,0,0,0);
17038: 
17039:   let totalSemActual = 0, nSemActual = 0;
17040:   citas.forEach(c => {
17041:     const f = normDate(c.fecha);
17042:     if (!f) return;
17043:     const fd = new Date(f + 'T12:00:00');
17044:     if (fd >= lunes && f <= hoyStr) {
17045:       totalSemActual += parsePrecio(c.precio);
17046:       nSemActual++;
17047:     }
17048:   });
17049:   (allData.eventos || []).forEach(e => {
17050:     const f = normDate(e.fecha);
17051:     if (!f) return;
17052:     const fd = new Date(f + 'T12:00:00');
17053:     if (fd >= lunes && f <= hoyStr) totalSemActual += parsePrecio(e.cobro);
17054:   });
17055: 
```

### desmarcarPago — línea 19802

```javascript
19798:   renderRecuperaciones();
19799:   if (typeof toast === 'function') toast(`Comisión ${_fmtCLP(rec.comision)} marcada como pagada`, 'ok');
19800: }
19801: 
19802: function desmarcarPago(id) {
19803:   const all = _loadRec();
19804:   const rec = all.find(r => r.id === id);
19805:   if (!rec) return;
19806:   rec.pagado = false;
19807:   rec.pagadoFecha = null;
19808:   _saveRec(all);
19809:   renderRecuperaciones();
19810: }
19811: 
19812: function eliminarRecuperacion(id) {
19813:   if (!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
19814:   const all = _loadRec().filter(r => r.id !== id);
19815:   _saveRec(all);
19816:   renderRecuperaciones();
19817:   if (typeof toast === 'function') toast('Registro eliminado', 'ok');
19818: }
19819: 
19820: function pagarTodasComisiones() {
19821:   const mes = document.getElementById('recMesFiltro')?.value || _recMesActual();
19822:   const all = _loadRec();
19823:   let cnt = 0;
19824:   all.forEach(r => {
19825:     if (r.fecha.startsWith(mes) && !r.pagado) {
19826:       r.pagado = true;
19827:       r.pagadoFecha = today();
19828:       cnt++;
19829:     }
19830:   });
19831:   if (cnt === 0) return;
19832:   _saveRec(all);
19833:   renderRecuperaciones();
19834:   if (typeof toast === 'function') toast(`${cnt} comisión${cnt>1?'es':''} marcada${cnt>1?'s':''} como pagada${cnt>1?'s':''}`, 'ok');
19835: }
19836: 
19837: // ── Carga pacientes inactivos 3+ meses desde GAS ──
19838: async function cargarInactivos() {
19839:   const panel = document.getElementById('recInactivosPanel');
19840:   const btn   = document.getElementById('recBtnCargar');
19841:   if (!panel) return;
19842:   panel.innerHTML = '<div style="text-align:center;padding:30px"><div class="spinner"></div><div style="margin-top:10px;color:var(--muted);font-size:.83rem">Consultando base de datos...</div></div>';
19843:   if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }
19844:   try {
19845:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getInactivos&token=${encodeURIComponent(TOKEN)}`);
19846:     const d = await r.json();
19847:     if (!d.ok) { panel.innerHTML = `<div style="color:var(--err,#ef4444);padding:20px">Error: ${d.error||'Sin respuesta del servidor'}</div>`; return; }
19848:     renderInactivos(d.inactivos || []);
19849:   } catch(e) {
19850:     panel.innerHTML = '<div style="color:var(--err,#ef4444);padding:20px">Error de conexión. Verifica que el GAS esté actualizado y vuelve a intentarlo.</div>';
19851:   } finally {
19852:     if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
19853:   }
19854: }
19855: 
19856: let _recCurrentLista = [];
19857: let _recMsgTipo = 0;
```

## IDs

- `equipoCuentas`
- `metricPagos`
- `modalPago`
- `pagoModalNombre`
- `pagosStats`
- `payActionStatus`
- `payAppointmentSearch`
- `payApproveBtn`
- `payCitaId`
- `payComprobante`
- `payFechaPago`
- `payMedioPago`
- `payObservaciones`
- `payProofFile`
- `payProofLabel`
- `payValorRecibido`
- `payVerifyBtn`
- `paymentAccountsList`
- `paymentAppointmentList`
- `paymentsList`
- `sb-pagos`
- `selectedPaymentCard`
- `vPagos`

## Handlers HTML

- `abrirPagoCita(`
- `cerrarModalPago()`
- `clearPaymentForm()`
- `confirmarPago(`
- `desmarcarPago(`
- `event.stopPropagation();abrirModalPago(`
- `exportPaymentsCSV()`
- `if(event.target===this)cerrarModalPago()`
- `loadOperationsData().then(renderPagos)`
- `markPayablePaid(`
- `openPago(`
- `renderPaymentAppointmentList()`
- `saveManualPayment(`
- `selectPaymentAppointment(`
- `selectPaymentAppointment(this.value)`
- `updatePaymentProofLabel()`
- `verifyPayment(`
