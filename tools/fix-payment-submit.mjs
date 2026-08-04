import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);
const changes = [];

function replaceOnce(oldText, newText, label) {
  if (html.includes(newText)) return;
  const count = html.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${label}: se esperaba 1 coincidencia y se encontraron ${count}.`);
  html = html.replace(oldText, newText);
  changes.push(label);
}

function replaceFunction(name, newFunction) {
  const match = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`).exec(html);
  if (!match) throw new Error(`No se encontró la función ${name}.`);
  const start = match.index;
  const braceStart = html.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    const next = html[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const nl = html.indexOf('\n', i + 2);
      i = nl < 0 ? html.length : nl;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = html.indexOf('*/', i + 2);
      i = end < 0 ? html.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const old = html.slice(start, i + 1);
        if (old === newFunction) return;
        html = html.slice(0, start) + newFunction + html.slice(i + 1);
        changes.push(`Reemplazar ${name} por una versión segura`);
        return;
      }
    }
  }
  throw new Error(`No se pudo delimitar la función ${name}.`);
}

replaceOnce(
  `<button class="btn btn-ghost" onclick="saveManualPayment('verify')">Subir para revisar</button>`,
  `<button id="payVerifyBtn" class="btn btn-ghost" onclick="saveManualPayment('verify')">Subir para revisar</button>`,
  'Identificar el botón Subir para revisar'
);
replaceOnce(
  `<button class="btn btn-teal" onclick="saveManualPayment('approve')">Confirmar pago y autorizar</button>`,
  `<button id="payApproveBtn" class="btn btn-teal" onclick="saveManualPayment('approve')">Confirmar pago y autorizar</button>`,
  'Identificar el botón Confirmar pago y autorizar'
);
replaceOnce(
  `                <button class="btn btn-ghost" onclick="clearPaymentForm()">Limpiar</button>\n              </div>`,
  `                <button class="btn btn-ghost" onclick="clearPaymentForm()">Limpiar</button>\n              </div>\n              <div id="payActionStatus" role="status" aria-live="polite" style="display:none;margin-top:10px;padding:10px 12px;border-radius:10px;font-size:.84rem;font-weight:700"></div>`,
  'Agregar estado visible del guardado del pago'
);

const safeFunction = `async function saveManualPayment(mode = 'verify') {
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
}`;

replaceFunction('saveManualPayment', safeFunction);

if (!html.includes("const valorRecibido = valorEl?.value.trim() || '';")) throw new Error('No quedó declarada la variable valorRecibido.');
if (!html.includes("const fechaPago = fechaEl?.value || '';")) throw new Error('No quedó declarada la variable fechaPago.');
if (!html.includes("const medioPago = medioEl?.value || '';")) throw new Error('No quedó declarada la variable medioPago.');
if (!html.includes("console.error('Error al guardar el pago:', error);")) throw new Error('No quedó manejo visible de errores.');

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(changes.length ? `Hotfix de pagos aplicado:\n- ${changes.join('\n- ')}` : 'El hotfix de pagos ya estaba aplicado.');
