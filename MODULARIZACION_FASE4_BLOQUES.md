# Bloques exactos del módulo de Pagos — Fase 4

## Bloque principal de Pagos

```javascript
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
6986:   try {
6987:     const proofFile = await readPaymentProofFile();
6988:     if (proofFile?.error) throw new Error(proofFile.error);
6989:     if (!proofFile && !ref) throw new Error('Sin archivo adjunto: escribe una referencia u observación del pago.');
6990: 
6991:     const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6992:     const payload = {
6993:       citaId,
6994:       cliente: c.nombre || '',
6995:       servicioPlan: c.servicio || '',
6996:       valorEsperado: c.precio || '',
6997:       valorRecibido,
6998:       medioPago,
6999:       cuentaReceptora: accountId,
7000:       fechaPago,
7001:       comprobante: ref,
7002:       estadoPago: 'COMPROBANTE_RECIBIDO',
7003:       observaciones,
7004:       proofFile: proofFile || null
7005:     };
7006: 
7007:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7008:       method: 'POST',
7009:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
7010:     }, 45000);
7011:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
7012:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
7013: 
7014:     if (mode === 'approve') {
7015:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
7016:       const verifyUrl = APPS_SCRIPT_URL
7017:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
7018:         + '&id=' + encodeURIComponent(d.id)
7019:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
7020:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
7021:       if (!v.ok) throw new Error(v.error || 'El comprobante se guardó, pero no se pudo autorizar la cita. No repitas el pago; pulsa Actualizar.');
7022:       setStatus('Pago confirmado y cita autorizada correctamente.', 'ok');
7023:       toast('Pago confirmado y cita autorizada');
7024:     } else {
7025:       setStatus('Comprobante guardado para revisión.', 'ok');
7026:       toast('Comprobante subido para revisión');
7027:     }
7028: 
7029:     clearPaymentForm();
7030:     await reload();
7031:     await loadOperationsData();
7032:     renderPagos();
7033:     renderAgenda(true);
7034:   } catch (error) {
7035:     console.error('Error al guardar el pago:', error);
7036:     const message = error?.message || 'No se pudo guardar el pago. Intenta nuevamente.';
7037:     setStatus(message, 'err');
7038:     toast(message, 'err');
7039:   } finally {
7040:     if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.textContent = originalVerify; }
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
```

## Renderizado y acciones posteriores de Pagos

```javascript
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
7129:       <h3>Plantillas de planes</h3>
7130:       <div class="team-muted">${planTemplates.length ? planTemplates.map(p => `${esc(p.Nombre)} · ${esc(p.SesionesTotales)} sesiones · ${formatPrecio(parsePrecio(p.PrecioTotal || 0))}`).join('<br>') : 'No hay plantillas creadas.'}</div>
7131:     </div>
7132:     <div class="team-card">
7133:       <h3>Planes de clientes</h3>
7134:       <div class="team-muted">${clientPlans.length ? clientPlans.slice(0, 8).map(p => `${esc(p.Cliente)} · ${esc(p.NombrePlan)} · ${esc(p.Estado)} · saldo ${formatPrecio(parsePrecio(p.SaldoPendiente || 0))}`).join('<br>') : 'Aún no hay planes asignados a clientes.'}</div>
7135:     </div>
7136:     <div class="team-card">
7137:       <h3>Liquidaciones profesionales</h3>
7138:       <div class="team-muted">${settlements.length ? settlements.slice(0, 8).map(l => `${esc(l.ProfesionalID)} · ${esc(l.Periodo)} · ${esc(l.Sesiones)} sesiones · ${formatPrecio(parsePrecio(l.Total || 0))} · ${esc(l.Estado)}`).join('<br>') : 'Aún no hay sesiones liquidadas.'}</div>
7139:     </div>
7140:     <div class="team-card">
7141:       <h3>Últimos cambios de estado</h3>
7142:       <div class="team-muted">${history.length ? history.slice(0, 8).map(h => `${esc(h.CodigoReserva)} · ${esc(h.EstadoAnterior)} → ${esc(h.EstadoNuevo)}`).join('<br>') : 'Aún no hay historial nuevo.'}</div>
7143:     </div>`;
7144: }
7145: 
7146: function downloadOperationsCSV(filename, rows) {
7147:   const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
7148:   const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8;'});
7149:   const a = document.createElement('a');
7150:   a.href = URL.createObjectURL(blob);
7151:   a.download = filename;
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
7212:   const start = new Date(selected + 'T00:00:00');
7213:   const end = new Date(start); end.setDate(end.getDate() + 7);
7214:   const list = base.filter(c => {
7215:     const d = new Date(c.fecha + 'T00:00:00');
7216:     if (professionalMode === 'hoy') return c.fecha === today();
7217:     if (professionalMode === 'fecha') return c.fecha === selected;
7218:     if (professionalMode === 'semana') return d >= start && d < end;
7219:     return d >= new Date(today() + 'T00:00:00');
7220:   });
7221:   document.getElementById('proAgendaList').innerHTML = list.length ? list.map(c => {
7222:     const badge = c.autorizada ? (c.estado || 'Autorizada') : (c.autorizacion || 'Asignada pendiente de autorización');
7223:     const canAttend = c.puedeAtender && c.estado !== 'Sesión atendida';
7224:     return `
7225:     <article class="pro-card pro-appointment">
7226:       <div class="team-card-head">
7227:         <h3>${esc(c.nombre)}</h3>
7228:         <span class="team-pill ${c.autorizada ? 'info' : 'warn'}">${esc(badge)}</span>
7229:       </div>
7230:       <div class="pro-meta">
7231:         <span><strong>Fecha:</strong> ${esc(fmtDate(c.fecha))} · ${esc(c.hora)}</span>
7232:         <span><strong>Servicio:</strong> ${esc(c.servicio)} · ${esc(c.duracion)} min</span>
7233:         <span><strong>Lugar:</strong> ${esc(c.lugar || c.modalidad || '—')}</span>
7234:         ${!c.autorizada ? '<span><strong>Estado:</strong> Asignada, pendiente de autorización administrativa.</span>' : ''}
7235:         ${c.observaciones ? `<span><strong>Observaciones:</strong> ${esc(c.observaciones)}</span>` : ''}
7236:       </div>
7237:       <div class="pro-actions">
7238:         <button class="btn btn-teal btn-sm" ${canAttend ? '' : 'disabled'} onclick="markProfessionalAttended('${esc(c.id)}')">Marcar sesión atendida</button>
7239:         <button class="btn btn-ghost btn-sm" onclick="openProIssue('${esc(c.id)}')">Reportar novedad</button>
7240:       </div>
7241:     </article>`;
7242:   }).join('') : '<div class="team-panel"><p class="team-muted">No hay citas asignadas para este filtro.</p></div>';
7243: }
7244: 
7245: async function markProfessionalAttended(citaId) {
7246:   if (!confirm('¿Confirmas que esta sesión ya fue atendida? Esta acción solo la puede revertir administración.')) return;
7247:   const d = await fetch(APPS_SCRIPT_URL, {
7248:     method:'POST',
7249:     body:JSON.stringify({action:'professionalMarkAttended', token:PROFESSIONAL_TOKEN, citaId})
7250:   }).then(r => r.json());
7251:   if (d.ok) { toast('Sesión marcada como atendida'); await loadProfessionalAgenda(); }
7252:   else toast(d.error || 'No se pudo marcar', 'err');
7253: }
7254: 
7255: function openProIssue(citaId) {
7256:   document.getElementById('proIssueCitaId').value = citaId;
7257:   document.getElementById('proIssueTipo').value = 'Paciente no responde';
7258:   document.getElementById('proIssueObs').value = '';
7259:   openModal('modalProIssue');
7260: }
7261: 
7262: async function sendProfessionalIssue() {
7263:   const d = await fetch(APPS_SCRIPT_URL, {
7264:     method:'POST',
7265:     body:JSON.stringify({
7266:       action:'professionalReportIssue',
7267:       token:PROFESSIONAL_TOKEN,
7268:       citaId:document.getElementById('proIssueCitaId').value,
7269:       tipo:document.getElementById('proIssueTipo').value,
7270:       observacion:document.getElementById('proIssueObs').value.trim()
7271:     })
7272:   }).then(r => r.json());
7273:   if (d.ok) { closeModal('modalProIssue'); toast('Novedad enviada a administración'); }
7274:   else toast(d.error || 'No se pudo enviar', 'err');
7275: }
7276: 
7277: function professionalSignout() {
7278:   return window.PanelSession.logoutProfessional(_sessionBridge());
7279: }
7280: 
7281: let _submittingBooking = false;
7282: let _submittingPatient = false;
7283: let _loginTime = null;
7284: 
7285: // ── LOGIN ──
7286: 
7287: async function doLogin() {
7288:   return window.PanelSession.doAdminLogin(_sessionBridge());
7289: }
7290: 
7291: function logout() {
7292:   return window.PanelSession.logoutAdmin(_sessionBridge());
7293: }
7294: 
7295: // ── GUARDAS DE SESIÓN MODULARIZADAS ──
7296: window.PanelSession.installAdminGuards(_sessionBridge());
7297: 
7298: // Auto-login si tiene sesión guardada
7299: window.addEventListener('DOMContentLoaded', async () => {
7300:   await window.PanelSession.restoreOnLoad(_sessionBridge());
7301: });
7302: 
7303: async function _runUrlRepairIfRequested() {
7304:   const params = new URLSearchParams(location.search);
7305:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7306:   const nombre = params.get('nombre') || '';
7307:   const keepFecha = params.get('keepFecha') || '';
7308:   const keepHora = params.get('keepHora') || '';
7309:   if (!nombre || !keepFecha || !keepHora) return;
7310:   try {
```

## Apertura de Pagos desde Agenda

```javascript
16970:     if (c.estado !== 'Atendida') return false;
16971:     if (c.pago) return false;
16972:     if (kvGet('pago_' + c.id) === '1') return false;
16973:     if (parsePrecio(c.precio) === 0) return false;
16974:     const f = normDate(c.fecha);
16975:     if (!f) return false;
16976:     const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
16977:     return diff >= 3;
16978:   });
16979:   const banner = document.getElementById('bannerCobros');
16980:   const txtEl  = document.getElementById('bannerCobrosTxt');
16981:   const lista  = document.getElementById('bannerCobrosLista');
16982:   if (!banner) return;
16983:   if (!pendientes.length) { banner.style.display = 'none'; return; }
16984:   banner.style.display = 'block';
16985:   if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
16986:   if (lista) lista.innerHTML = pendientes.map(c => {
16987:     const tel = (c.telefono || '').replace(/\D/g, '');
16988:     const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
16989:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
16990:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
16991:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
16992:       <div style="display:flex;gap:6px">
16993:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
16994:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
16995:       </div>
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
```
