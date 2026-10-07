/* Cuidándote Fisioterapia — Paquetes y consumo de sesiones. */
(function (global) {
  'use strict';

let _packageSyncTimer = null;
let _packageSyncPending = null;
let _packageDeletedIds = new Set();

function _getPkAsignados()  { try { return JSON.parse(kvGet('pk_asignados') ||'[]'); } catch(e){ return []; } }

function _getPkPlantillas() { try { return JSON.parse(kvGet('pk_plantillas')||'[]'); } catch(e){ return []; } }

function _queuePackageDatabaseSync(records, deletedIds) {
  _packageSyncPending = records.map(record => ({...record, consumoCitas: Array.isArray(record.consumoCitas) ? [...record.consumoCitas] : []}));
  (deletedIds || []).forEach(id => { if (id) _packageDeletedIds.add(String(id)); });
  clearTimeout(_packageSyncTimer);
  _packageSyncTimer = setTimeout(_syncPackagesToDatabase, 350);
}

async function _syncPackagesToDatabase() {
  _packageSyncTimer = null;
  const records = _packageSyncPending;
  const deletedIds = [..._packageDeletedIds];
  if (!records) return;
  _packageSyncPending = null;
  _packageDeletedIds.clear();
  try {
    const response = await global.PanelApi.fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify({action:'savePackageMemberships', token:TOKEN, data:{records, deletedIds}})
    }, 20000);
    if (!response?.ok) throw new Error(response?.error || 'No fue posible guardar en la base de datos');
  } catch (error) {
    // Conserva los cambios localmente y reintenta; nunca se descarta información clínica/financiera.
    _packageSyncPending = records;
    deletedIds.forEach(id => _packageDeletedIds.add(id));
    clearTimeout(_packageSyncTimer);
    _packageSyncTimer = setTimeout(_syncPackagesToDatabase, 5000);
    if (typeof toast === 'function') toast('Paquetes: guardado localmente; reintentando sincronizar con la base', 'err');
  }
}

async function loadPackageMembershipsFromDatabase() {
  try {
    const response = await global.PanelApi.fetchJsonWithTimeout(
      `${APPS_SCRIPT_URL}?action=packageMembershipData&token=${encodeURIComponent(TOKEN)}`,
      {}, 20000
    );
    if (!response?.ok || !Array.isArray(response.records)) return;
    const localRecords = _getPkAsignados();
    const migrated = kvGet('pk_db_migrated_v1') === '1';
    if (response.records.length) {
      kvSet('pk_asignados', JSON.stringify(response.records));
    } else if (!migrated && localRecords.length) {
      _queuePackageDatabaseSync(localRecords);
    }
    kvSet('pk_db_migrated_v1', '1');
  } catch (error) {
    // El módulo conserva el respaldo local si la red no está disponible.
  }
}

function _savePkAsignados(a, deletedIds)  {
  kvSet('pk_asignados', JSON.stringify(a));
  _queuePackageDatabaseSync(a, deletedIds);
}

function _savePkPlantillas(a) { kvSet('pk_plantillas', JSON.stringify(a)); }

function abrirModalPaquete(plIdxPre) {
  const plantillas = _getPkPlantillas();
  const sel = document.getElementById('pkPlantillaSel');
  if (sel) sel.innerHTML = '<option value="">— Paquete personalizado —</option>' + plantillas.map((pl,i) => `<option value="${i}" ${i===plIdxPre?'selected':''}>${pl.nombre}</option>`).join('');
  const dl = document.getElementById('pkPacienteList');
  if (dl) {
    const nomCitas = allData.citas.map(c=>c.nombre||'').filter(Boolean);
    const nomPacs  = (allData.pacientes||[]).map(p=>p.nombre||'').filter(Boolean);
    const todos    = [...new Set([...nomCitas, ...nomPacs])].sort();
    dl.innerHTML   = todos.map(n=>`<option value="${n}">`).join('');
  }
  const fi = document.getElementById('pkFechaCompra'); if (fi) fi.value = today();
  const nombre = document.getElementById('pkNombrePaquete'); if (nombre) nombre.value = '';
  const sesiones = document.getElementById('pkSesionesTotal'); if (sesiones) sesiones.value = '';
  const iniciales = document.getElementById('pkSesionesIniciales'); if (iniciales) iniciales.value = 0;
  const valor = document.getElementById('pkValorTotal'); if (valor) valor.value = '';
  const abono = document.getElementById('pkAbonoInicial'); if (abono) abono.value = '';
  const modalidadPago = document.getElementById('pkModalidadPago'); if (modalidadPago) modalidadPago.value = 'PAQUETE_COMPLETO';
  const valorPorSesion = document.getElementById('pkValorPorSesion'); if (valorPorSesion) valorPorSesion.value = '';
  if (typeof global.actualizarModalidadPagoPaquete === 'function') global.actualizarModalidadPagoPaquete();
  if (plIdxPre !== undefined) autocompletarPaqueteDesdePlantilla();
  const pkModal = document.getElementById('modalPaquete'); if (pkModal) pkModal.style.display = 'flex';
}

function autocompletarPaqueteDesdePlantilla() {
  const idx = document.getElementById('pkPlantillaSel')?.value;
  if (idx === undefined || idx === '') return;
  const pl = _getPkPlantillas()[Number(idx)];
  if (!pl) return;
  const nombre = document.getElementById('pkNombrePaquete');
  const sesiones = document.getElementById('pkSesionesTotal');
  const valor = document.getElementById('pkValorTotal');
  if (nombre) nombre.value = pl.nombre || '';
  if (sesiones) sesiones.value = Number(pl.sesiones) || '';
  if (valor) valor.value = pl.precio || '';
}

function abrirModalPlantillaPaquete() { const m = document.getElementById('modalPlantillaPaquete'); if (m) m.style.display='flex'; }

function ajustarSesiones(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
  if (val === null) return;
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
  if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
  p.consumidas = n; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesiones actualizadas: ${n}/${p.sesiones}`);
}

function borrarPaqueteAsignado(idx) {
  if (!confirm('¿Eliminar este paquete?')) return;
  const a = _getPkAsignados(); const deleted = a.splice(idx,1)[0];
  _savePkAsignados(a, deleted?.id ? [deleted.id] : []); renderPaquetes();
}

function borrarPlantillaPaquete(idx) {
  if (!confirm('¿Eliminar esta plantilla?')) return;
  const a = _getPkPlantillas(); a.splice(idx,1); _savePkPlantillas(a); renderPaquetes();
}

// ══════════════════════════════════════════════════════════════
// ── EMPRESAS CRM ──
// ══════════════════════════════════════════════════════════════

function renderPaquetes() {
  const search   = ((document.getElementById('pkSearch')||{}).value||'').toLowerCase();
  const plantillas = _getPkPlantillas();
  const asignados  = _getPkAsignados();
  const hoy = today();
  const activos   = asignados.filter(p => p.vencimiento >= hoy && (p.sesiones - (p.consumidas||0)) > 0);
  const agotados  = asignados.filter(p => (p.sesiones - (p.consumidas||0)) <= 0);
  const porVencer = asignados.filter(p => {
    if ((p.sesiones-(p.consumidas||0)) <= 0) return false;
    const diff = Math.round((new Date(p.vencimiento+'T12:00:00') - new Date(hoy+'T12:00:00'))/86400000);
    return diff >= 0 && diff <= 7;
  });
  const valorTotal = activos.reduce((s,p) => s + Number(p.valorTotal ?? parsePrecio(p.precio || 0)), 0);
  const sv = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  sv('pkActivos', activos.length); sv('pkValor', '$'+valorTotal.toLocaleString('es-CO'));
  sv('pkPorVencer', porVencer.length); sv('pkAgotados', agotados.length);

  const plEl = document.getElementById('pkPlantillas');
  if (plEl) {
    plEl.innerHTML = plantillas.length
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${
          plantillas.map((pl,i) => `<div style="padding:14px;background:var(--s2);border-radius:10px;border:1px solid var(--border)">
            <div style="font-weight:700;font-family:var(--font-h);margin-bottom:4px">${pl.nombre}</div>
            <div style="font-size:.8rem;color:var(--muted)">${pl.sesiones} sesiones · $${parsePrecio(pl.precio).toLocaleString('es-CO')} · ${pl.vigencia||60} días</div>
            ${pl.servicios?`<div style="font-size:.75rem;color:var(--muted);margin-top:2px">${pl.servicios}</div>`:''}
            <div style="display:flex;gap:6px;margin-top:10px">
              <button class="btn btn-teal btn-sm" onclick="abrirModalPaquete(${i})">Asignar</button>
              <button class="btn btn-ghost btn-sm" onclick="borrarPlantillaPaquete(${i})">🗑️</button>
            </div>
          </div>`).join('')}</div>`
      : '<div class="empty" style="padding:20px 0"><p>Sin plantillas. Crea una para empezar.</p></div>';
  }

  const pkListaEl = document.getElementById('pkLista');
  if (!pkListaEl) return;
  let lista = asignados;
  if (search) lista = lista.filter(p => (p.paciente||'').toLowerCase().includes(search));
  if (!lista.length) {
    pkListaEl.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin paquetes asignados</p></div>';
    return;
  }
  pkListaEl.innerHTML = lista.map((p, i) => {
    const rest = (p.sesiones||0) - (p.consumidas||0);
    const pct  = p.sesiones > 0 ? Math.round((p.consumidas||0)/p.sesiones*100) : 0;
    const agotado   = rest <= 0;
    const penultimo = rest === 1;
    const vencido   = p.vencimiento && p.vencimiento < hoy;
    const borderC   = agotado?'rgba(239,68,68,.35)':penultimo?'rgba(251,191,36,.35)':'var(--border)';
    const barC      = agotado?'#ef4444':penultimo?'#f59e0b':'var(--primary)';
    const pkTel    = (p.telefono || '').replace(/\D/g, '');
    const pkNombre = (p.paciente || '').split(' ')[0];
    const valorPaquete = Number(p.valorTotal ?? parsePrecio(p.precio || 0));
    const abonado = Number(p.abonado || 0);
    const saldo = Math.max(0, valorPaquete - abonado);
    const pagoPorSesion = p.modalidadPago === 'PAGO_POR_SESION';
    const pagoColor = saldo > 0 ? '#d97706' : '#059669';
    const _pkWa    = (msg) => pkTel.length >= 7 ? `https://wa.me/57${pkTel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    let alerta = '';
    if (agotado) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Tu paquete "${p.nombre||''}" se agoto. ¿Quieres renovarlo para continuar con tu tratamiento? Te paso las opciones disponibles. \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">🔴 Paquete agotado — proponer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (penultimo) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Te aviso que te queda solo 1 sesion en tu paquete "${p.nombre||''}". ¿Renovamos antes de que se acabe para no perder el ritmo? \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#92400e">⚠️ Última sesión restante — ofrecer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-sm" style="background:#f59e0b;color:#fff;border:none;text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (vencido) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u274C Tu paquete "${p.nombre||''}" vencio el ${fmtDate(p.vencimiento)}. Si quieres seguir con tu plan, podemos renovarlo ahora. ¿Te interesa? \uD83D\uDE4F`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">⏰ Paquete vencido (${fmtDate(p.vencimiento)})</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-err btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Recordar</a>` : ''}
      </div>`;
    }
    return `<div style="padding:14px 18px;border:1.5px solid ${borderC};border-radius:12px;margin-bottom:10px;background:var(--s1)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:6px">
        <div>
          <div style="font-weight:700;font-family:var(--font-h)">${p.paciente||'—'}</div>
          <div style="font-size:.8rem;color:var(--muted)">${p.nombre||'—'} · Comprado: ${fmtDate(p.fechaCompra)} · Vence: ${p.vencimiento?fmtDate(p.vencimiento):'—'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-m);font-size:.82rem;color:var(--primary)">Sesión ${agotado ? p.sesiones : (p.consumidas||0)+1} de ${p.sesiones||0}</div>
          <div style="font-size:.75rem;color:var(--muted)">Realizadas: <strong>${p.consumidas||0}</strong> · Restantes: <strong>${rest}</strong></div>
          ${pagoPorSesion ? `<div style="font-size:.75rem;color:#0f766e;margin-top:4px">Pago por sesión: <strong>${fmtPeso(p.valorPorSesion || 0)}</strong> · sin saldo global</div>` : valorPaquete > 0 ? `<div style="font-size:.75rem;color:${pagoColor};margin-top:4px">Pagado: <strong>${fmtPeso(abonado)}</strong> · Debe: <strong>${fmtPeso(saldo)}</strong></div>` : ''}
        </div>
      </div>
      <div style="margin:10px 0 4px;background:var(--s2);border-radius:99px;height:8px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${barC};border-radius:99px;transition:width .5s"></div></div>
      ${alerta}
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
        ${pagoPorSesion ? '<span class="btn btn-ghost btn-sm" style="pointer-events:none;opacity:.7">Se descuenta al marcar atendida</span>' : `<button class="btn btn-teal btn-sm" onclick="usarSesion(${i})" ${agotado?'disabled':''}>➕ Usar sesión</button>`}
        ${!pagoPorSesion && valorPaquete > 0 && saldo > 0 ? `<button class="btn btn-ghost btn-sm" onclick="PanelPackages.registrarAbonoPaquete(${i})">💳 Registrar abono</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="ajustarSesiones(${i})">✏️ Ajustar sesiones</button>
        <button class="btn btn-ghost btn-sm" onclick="borrarPaqueteAsignado(${i})">🗑️ Eliminar</button>
      </div>
    </div>`;
  }).join('');
}

function usarSesion(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
  p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
}

function registrarAbonoPaquete(idx) {
  const paquetes = _getPkAsignados();
  const p = paquetes[idx];
  if (!p) return;
  const total = Number(p.valorTotal ?? parsePrecio(p.precio || 0));
  const actual = Number(p.abonado || 0);
  const saldo = Math.max(0, total - actual);
  const valor = prompt(`Abono de "${p.nombre}" (${p.paciente})\nSaldo actual: ${fmtPeso(saldo)}\n¿Cuánto recibió?`, '');
  if (valor === null) return;
  const abono = parsePrecio(valor);
  if (!abono || abono <= 0 || abono > saldo) { toast('Ingresa un abono válido que no supere el saldo','err'); return; }
  p.valorTotal = total;
  p.abonado = actual + abono;
  _savePkAsignados(paquetes);
  renderPaquetes();
  toast(`Abono registrado. Saldo: ${fmtPeso(total - p.abonado)}`);
}

function _normalizarPaciente(value) {
  return String(value || '').trim().toLocaleLowerCase('es-CO').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');
}

function _telefonoComparable(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 7 ? digits.slice(-10) : '';
}

function _formatMoney(value) {
  return '$' + Math.max(0, Number(value || 0)).toLocaleString('es-CO');
}

// Resumen único para que agenda, detalle y WhatsApp tomen la misma decisión.
// El precio de la cita es siempre el valor acordado para ese paciente, incluso
// cuando sea diferente a la tarifa usual del servicio.
function getAppointmentFinancialSummary(cita) {
  const price = Number(parsePrecio(cita?.precio || 0));
  const paymentState = String(cita?.estadoPago || '');
  const appointmentState = String(cita?.estadoCita || cita?.estado || '');
  const paymentRows = (typeof operationsData !== 'undefined' && Array.isArray(operationsData?.pagos)) ? operationsData.pagos : [];
  const paymentIds = new Set();
  const appointmentPayments = paymentRows.filter(payment => {
    if (String(payment.CitaID || '') !== String(cita?.id || '')) return false;
    const key = String(payment.ID || `${payment.FechaPago || ''}-${payment.ValorRecibido || ''}`);
    if (paymentIds.has(key)) return false;
    paymentIds.add(key);
    return !['RECHAZADO', 'Rechazado'].includes(String(payment.EstadoPago || ''));
  });
  const paidAmount = appointmentPayments.reduce((sum, payment) => sum + Number(parsePrecio(payment.ValorRecibido || 0)), 0);
  const appointmentBalance = Math.max(0, price - paidAmount);
  const paid = ['PAGO_APROBADO', 'NO_REQUIERE_PAGO'].includes(paymentState) || !!cita?.pago || (price > 0 && paidAmount >= price);
  const underReview = ['COMPROBANTE_RECIBIDO', 'Pago por verificar'].includes(paymentState) || appointmentState === 'Pago por verificar';
  const started = ['Sesión iniciada', 'Sesión atendida', 'Atendida', 'Cerrada'].includes(appointmentState);
  const paquetes = _getPkAsignados();
  const used = paquetes.map(p => ({p, record:(p.consumoCitas || []).find(item => String(item.id) === String(cita?.id)) || (p.reservasCitas || []).find(item => String(item.id) === String(cita?.id))})).find(item => item.record);
  const available = used || _paqueteParaCita(cita, paquetes);
  const packageRecord = available?.p || null;
  const packageTotal = Number(packageRecord?.valorTotal ?? parsePrecio(packageRecord?.precio || 0));
  const packagePaid = Number(packageRecord?.abonado || 0);
  const packageBalance = Math.max(0, packageTotal - packagePaid);

  if (started) return {kind:'started', label:'Sesión en curso o finalizada', price, appointmentState};
  if (underReview) return {kind:'under-review', label:'Comprobante en revisión', price};
  if (packageRecord?.modalidadPago === 'PAGO_POR_SESION') {
    const session = used?.record?.sesion || Math.min(Number(packageRecord.sesiones || 0), Number(packageRecord.consumidas || 0) + 1);
    const specialPrice = Number(packageRecord.valorPorSesion || price || 0);
    const sessionPaid = paid || (specialPrice > 0 && paidAmount >= specialPrice);
    return sessionPaid
      ? {kind:'package-session-paid', label:`Paquete pago por sesión · sesión ${session} de ${packageRecord.sesiones || 0} pagada`, price:specialPrice, packageRecord}
      : {kind:'package-session-due', label:`Paquete pago por sesión · sesión ${session} de ${packageRecord.sesiones || 0} · cobrar hoy ${_formatMoney(specialPrice)}`, price:specialPrice, packageRecord, appointmentBalance:Math.max(0, specialPrice - paidAmount), paidAmount};
  }
  if (packageRecord && packageBalance <= 0) {
    const session = used?.record?.sesion || Math.min(Number(packageRecord.sesiones || 0), Number(packageRecord.consumidas || 0) + 1);
    return {kind:'package-covered', label:`Cubierta por ${packageRecord.tipo || 'paquete'} · sesión ${session} de ${packageRecord.sesiones || 0}`, price, packageRecord, packageBalance};
  }
  if (packageRecord && packageBalance > 0) return {kind:'package-balance', label:`Saldo de ${packageRecord.tipo || 'paquete'}: ${_formatMoney(packageBalance)}`, price, packageRecord, packageBalance};
  if (paid) return {kind:'paid', label:'Pago confirmado', price, paidAmount: paidAmount || price, appointmentBalance: 0};
  if (paidAmount > 0) return {kind:'appointment-partial', label:`Abonó ${_formatMoney(paidAmount)} · saldo ${_formatMoney(appointmentBalance)}`, price, paidAmount, appointmentBalance};
  return {kind:'appointment-balance', label:`Pendiente: ${_formatMoney(price)}`, price, paidAmount:0, appointmentBalance:price};
}

function getAppointmentFinancialSummaryHtml(cita) {
  const summary = getAppointmentFinancialSummary(cita);
  const colors = {
    started:'#2563eb', paid:'#059669', 'package-covered':'#047857', 'package-balance':'#c2410c', 'package-session-paid':'#047857', 'package-session-due':'#b45309', 'under-review':'#a16207', 'appointment-partial':'#c2410c', 'appointment-balance':'#b45309'
  };
  const title = summary.kind === 'package-balance' ? 'Saldo pendiente del paquete' : 'Estado financiero';
  const base = summary.price ? `Valor acordado: <strong>${_formatMoney(summary.price)}</strong>` : 'Sin valor registrado';
  const packageLine = summary.packageRecord && !['package-session-due', 'package-session-paid'].includes(summary.kind)
    ? ` · Abonado: <strong>${_formatMoney(summary.packageRecord.abonado || 0)}</strong> · Saldo: <strong>${_formatMoney(summary.packageBalance)}</strong>`
    : summary.kind === 'appointment-partial' ? ` · Abonado: <strong>${_formatMoney(summary.paidAmount)}</strong> · Saldo: <strong>${_formatMoney(summary.appointmentBalance)}</strong>` : '';
  return `<div style="margin-top:10px;padding:10px 12px;border:1px solid ${colors[summary.kind] || '#64748b'}33;background:${colors[summary.kind] || '#64748b'}0d;border-radius:9px;font-size:.82rem;line-height:1.55"><strong style="color:${colors[summary.kind] || '#64748b'}">💳 ${title}: ${summary.label}</strong><br>${base}${packageLine}</div>`;
}

function appointmentPaymentWhatsAppUrl(cita) {
  const summary = getAppointmentFinancialSummary(cita);
  if (['started', 'paid', 'package-covered', 'package-session-paid', 'under-review'].includes(summary.kind)) return null;
  const phone = _telefonoComparable(cita?.telefono);
  if (!phone) return null;
  const patient = String(cita?.nombre || '').trim().split(/\s+/)[0] || '😊';
  const amount = summary.kind === 'package-balance' ? summary.packageBalance : (summary.appointmentBalance ?? summary.price);
  const concept = summary.kind === 'package-balance'
    ? `el saldo pendiente de tu ${summary.packageRecord?.tipo || 'paquete'} *${summary.packageRecord?.nombre || ''}*`
    : `tu cita de *${cita?.servicio || 'fisioterapia'}*`;
  const msg = `Hola ${patient}! 😊 Te compartimos el valor pendiente de ${concept}: *${_formatMoney(amount)}*.`
    + '\n\nCuando realices el pago, por favor envíanos el comprobante. ¡Gracias! — Cuidándote Fisioterapia';
  return `https://wa.me/57${phone}?text=${encodeURIComponent(msg)}`;
}

function _paqueteParaCita(cita, paquetes = _getPkAsignados()) {
  const nombre = _normalizarPaciente(cita?.nombre);
  const tel = _telefonoComparable(cita?.telefono);
  return paquetes
    .map((p, index) => ({p, index}))
    .filter(({p}) => {
      const coincideTelefono = tel && _telefonoComparable(p.telefono) === tel;
      const coincideNombre = nombre && _normalizarPaciente(p.paciente) === nombre;
      return (coincideTelefono || coincideNombre) && Number(p.sesiones || 0) > Number(p.consumidas || 0);
    })
    .sort((a, b) => String(b.p.fechaCompra || '').localeCompare(String(a.p.fechaCompra || '')))[0];
}

function getPaymentPerSessionPackage(cita) {
  const found = _paqueteParaCita(cita);
  return found?.p?.modalidadPago === 'PAGO_POR_SESION' ? found.p : null;
}

function getSpecialSessionPrice(cita) {
  const paquete = getPaymentPerSessionPackage(cita);
  return paquete && Number(paquete.valorPorSesion || 0) > 0 ? Number(paquete.valorPorSesion) : 0;
}

// Reservar el consecutivo cuando se agenda, no cuando se marca como atendida.
// Así, si el paquete empezó en 5/11, las nuevas citas quedan 6/11, 7/11…
// sin que varias citas pendientes muestren el mismo número.
function reserveSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const linked = paquetes.map(p => ({p, record:(p.consumoCitas || []).find(item => String(item.id) === String(cita.id)) || (p.reservasCitas || []).find(item => String(item.id) === String(cita.id))}))
    .find(item => item.record);
  if (linked) return {ok:true, already:true, paquete:linked.p, sesion:Number(linked.record.sesion)};

  const found = _paqueteParaCita(cita, paquetes);
  if (!found) return {ok:false};
  const {p} = found;
  p.reservasCitas = Array.isArray(p.reservasCitas) ? p.reservasCitas : [];
  const usedNumbers = new Set([
    ...(p.consumoCitas || []),
    ...p.reservasCitas
  ].map(item => Number(item.sesion)).filter(Number.isFinite));
  let sesion = Math.max(1, Number(p.consumidas || 0) + 1);
  while (usedNumbers.has(sesion) && sesion <= Number(p.sesiones || 0)) sesion++;
  if (sesion > Number(p.sesiones || 0)) return {ok:false, agotado:true, paquete:p};

  p.reservasCitas.push({id:String(cita.id), sesion});
  _savePkAsignados(paquetes);
  return {ok:true, paquete:p, sesion};
}

function releaseReservedSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const found = paquetes.find(p => Array.isArray(p.reservasCitas) && p.reservasCitas.some(item => String(item.id) === String(cita.id)));
  if (!found) return {ok:false};
  found.reservasCitas = found.reservasCitas.filter(item => String(item.id) !== String(cita.id));
  _savePkAsignados(paquetes);
  if (document.getElementById('pkLista')) renderPaquetes();
  return {ok:true, paquete:found};
}

function consumeSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const linked = paquetes.map(p => ({p, record:(p.consumoCitas || []).find(item => String(item.id) === String(cita.id)) || (p.reservasCitas || []).find(item => String(item.id) === String(cita.id))}))
    .find(item => item.record);
  const found = linked || _paqueteParaCita(cita, paquetes);
  if (!found) return {ok:false};
  const {p} = found;
  p.consumoCitas = Array.isArray(p.consumoCitas) ? p.consumoCitas : [];
  const existing = p.consumoCitas.find(item => String(item.id) === String(cita.id));
  if (existing) return {ok:true, already:true, paquete:p, sesion:Number(existing.sesion || p.consumidas)};
  const reservada = (p.reservasCitas || []).find(item => String(item.id) === String(cita.id));
  p.consumidas = Number(p.consumidas || 0) + 1;
  p.consumoCitas.push({id:String(cita.id), sesion:Number(reservada?.sesion || p.consumidas)});
  _savePkAsignados(paquetes);
  if (document.getElementById('pkLista')) renderPaquetes();
  return {ok:true, paquete:p, sesion:Number(reservada?.sesion || p.consumidas)};
}

function releaseSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const found = paquetes.map((p, index) => ({p, index})).find(({p}) =>
    Array.isArray(p.consumoCitas) && p.consumoCitas.some(item => String(item.id) === String(cita.id))
  );
  if (!found) return {ok:false};
  const {p} = found;
  p.consumoCitas = p.consumoCitas.filter(item => String(item.id) !== String(cita.id));
  p.consumidas = Math.max(0, Number(p.consumidas || 0) - 1);
  _savePkAsignados(paquetes);
  if (document.getElementById('pkLista')) renderPaquetes();
  return {ok:true, paquete:p};
}

function getAppointmentPackageBadge(cita) {
  const paquetes = _getPkAsignados();
  const found = paquetes.map(p => {
    const consumo = (p.consumoCitas || []).find(item => String(item.id) === String(cita?.id));
    const reserva = (p.reservasCitas || []).find(item => String(item.id) === String(cita?.id));
    return {p, record:consumo || reserva, realizada:!!consumo};
  })
    .find(item => item.record) || _paqueteParaCita(cita, paquetes);
  if (!found) return '';
  const p = found.p;
  const sesion = found.record ? Number(found.record.sesion) : Math.min(Number(p.sesiones || 0), Number(p.consumidas || 0) + 1);
  const total = Number(p.sesiones || 0);
  if (!sesion || !total) return '';
  const realizada = found.realizada || String(cita?.estado || '') === 'Atendida';
  const cancelada = String(cita?.estado || '') === 'Cancelada';
  const estado = realizada ? 'realizada' : (cancelada ? 'cancelada' : 'próxima');
  const color = realizada ? '#059669' : (cancelada ? '#dc2626' : 'var(--primary)');
  return `<br><span style="font-size:.72rem;color:${color};font-weight:700">📦 ${esc(p.nombre || 'Paquete')} · Cita ${sesion} de ${total} — ${estado}</span>`;
}

  global.PanelPackages = Object.freeze({
    _getPkAsignados,
    _getPkPlantillas,
    _savePkAsignados,
    _savePkPlantillas,
    loadPackageMembershipsFromDatabase,
    abrirModalPaquete,
    autocompletarPaqueteDesdePlantilla,
    abrirModalPlantillaPaquete,
    ajustarSesiones,
    borrarPaqueteAsignado,
    borrarPlantillaPaquete,
    renderPaquetes,
    usarSesion,
    registrarAbonoPaquete,
    reserveSessionForAppointment,
    releaseReservedSessionForAppointment,
    consumeSessionForAppointment,
    releaseSessionForAppointment,
    getAppointmentPackageBadge,
    getAppointmentFinancialSummary,
    getAppointmentFinancialSummaryHtml,
    appointmentPaymentWhatsAppUrl,
    getPaymentPerSessionPackage,
    getSpecialSessionPrice
  });
})(window);
