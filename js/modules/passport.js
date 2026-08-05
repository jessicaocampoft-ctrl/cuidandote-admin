/* Cuidándote Fisioterapia — módulo aislado de Pasaporte. */
(function (global) {
  'use strict';

function pasaporteLink(nombre) {
  return PASAPORTE_BASE;
}

function pasaporteLinkAdmin(nombre) {
  return PASAPORTE_BASE;
}

function waBtnPasaporte(tel, nombre) {
  const safeName = String(nombre || '').replace(/'/g, "\\'");
  return '<button type="button" class="btn btn-passport btn-sm" onclick="openPassportModuleFor(\'' + safeName + '\')" title="Generar enlace seguro">Pasaporte</button>';
}

function openPassportModuleFor(nombre) {
  showView('pasaporte');
  setTimeout(function() {
    const input = document.getElementById('pasNombreInput');
    if (!input) return;
    input.value = nombre || '';
    onPasInput(input.value);
    toast('Selecciona el paciente en la lista para generar su enlace seguro.', 'info');
  }, 80);
}

// ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
let _pasTelefono = '';
let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
let _pasCurrent = null;

function _pasGetDB() {
  const map = {};
  allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
    const key = (c.nombre || '').toLowerCase().trim();
    if (key && !map[key]) map[key] = { nombre: c.nombre, telefono: c.telefono || '' };
  });
  (allData.pacientes || []).forEach(p => {
    const key = (p.nombre || '').toLowerCase().trim();
    if (key && !map[key]) map[key] = { nombre: p.nombre, telefono: p.telefono || '' };
  });
  return map;
}

function onPasInput(q) {
  // Cada vez que el usuario escribe manualmente, pierde la confirmación
  _pasConfirmado = false;
  _pasTelefono  = '';
  _pasSetConfirmed(false);
  searchPasPatient(q);
}

function searchPasPatient(q) {
  const dd = document.getElementById('pasDropdown');
  if (!q || q.length < 2) { dd.style.display = 'none'; return; }
  const map = _pasGetDB();
  const term = q.toLowerCase();
  const matches = Object.values(map)
    .filter(p => (p.nombre || '').toLowerCase().includes(term))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .slice(0, 8);
  if (!matches.length) { dd.style.display = 'none'; return; }
  dd.innerHTML = matches.map(p => `
    <div onmousedown="selectPasPatient(${JSON.stringify(p).replace(/"/g,'&quot;')})"
      style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--s2)"
      onmouseenter="this.style.background='var(--s2)'" onmouseleave="this.style.background=''">
      <div style="font-weight:600;font-size:.88rem;color:var(--text)">${p.nombre}</div>
      <div style="font-size:.76rem;color:var(--muted)">${p.telefono || 'Sin teléfono'}</div>
    </div>`).join('');
  dd.style.display = 'block';
}

function selectPasPatient(p) {
  document.getElementById('pasNombreInput').value = p.nombre;
  document.getElementById('pasDropdown').style.display = 'none';
  _pasTelefono  = (p.telefono || '').replace(/\D/g, '');
  _pasConfirmado = true;
  _pasSetConfirmed(true, p);
  generarLinkPasaporte();
}

function _pasSetConfirmed(ok, p) {
  const btn     = document.getElementById('pasAbrirBtn');
  const badge   = document.getElementById('pasConfirmBadge');
  const phoneBadge = document.getElementById('pasPhoneBadge');
  const warning = document.getElementById('pasWarning');
  const card    = document.getElementById('pasLinkCard');
  if (ok && p) {
    btn.disabled = false;
    btn.style.cssText = 'background:var(--primary);color:#0D0D0D;border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:pointer;white-space:nowrap;transition:var(--tr)';
    badge.style.display = 'flex';
    phoneBadge.textContent = p.telefono ? '📞 ' + p.telefono : '';
    warning.style.display = 'none';
  } else {
    btn.disabled = true;
    btn.style.cssText = 'background:var(--s3);color:var(--muted);border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:not-allowed;white-space:nowrap;transition:var(--tr)';
    badge.style.display = 'none';
    card.style.display  = 'none';
    warning.style.display = 'none';
  }
}

function limpiarPasBusqueda() {
  document.getElementById('pasNombreInput').value = '';
  document.getElementById('pasDropdown').style.display = 'none';
  _pasConfirmado = false;
  _pasTelefono  = '';
  _pasSetConfirmed(false);
}

async function generarLinkPasaporte() {
  if (!_pasConfirmado) return;
  const nombre = document.getElementById('pasNombreInput').value.trim();
  const card   = document.getElementById('pasLinkCard');
  if (!nombre) { card.style.display = 'none'; return; }

  const url = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
    + '&nombre=' + encodeURIComponent(nombre)
    + '&telefono=' + encodeURIComponent(_pasTelefono || '');
  const data = await fetch(url).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo generar el pasaporte', 'error'); return; }
  _pasCurrent = data.passport;
  const link = _pasCurrent.link;
  document.getElementById('pasLinkTexto').textContent = link;
  card.style.display = 'block';

  const tel = _pasTelefono.length >= 7
    ? 'https://wa.me/57' + _pasTelefono.slice(-10)
    : 'https://wa.me/';
  const msg = `Hola ${nombre.split(' ')[0]}! \uD83D\uDC4B\nTe dejo tu Pasaporte de Beneficios — ahi vas a ver tu progreso despues de cada sesion.\n${link}\n\n\u2B50 *Como ganar beneficios?*\nCada sesion sumas avances. Al llegar a:\n\n\u2705 *4 sesiones:* Descarga Localizada 10 min (zona de tu eleccion)\n\u2705 *8 sesiones:* Valoracion Funcional Express 10 min + PDF con resultados\n\u2705 *12 sesiones:* Movilidad Asistida 10 min + Botas de Compresion\n\u2705 *16 sesiones:* Kinesiotape + Tens 15 min (Readaptacion completa)\n\nGuardalo y nos vemos pronto! \uD83D\uDE0A`;
  document.getElementById('pasWhatsApp').href = tel + '?text=' + encodeURIComponent(msg);

  renderPasaporteQR(link);
  renderPasaporteAdminTools();
}

function renderPasaporteQR(link) {
  const canvas = document.getElementById('pasQR');
  if (!canvas) return;
  let box = document.getElementById('pasQRBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'pasQRBox';
    box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
    canvas.insertAdjacentElement('afterend', box);
  }
  box.innerHTML = '';
  canvas.style.display = 'none';
  if (typeof QRCode !== 'undefined') {
    if (QRCode.toCanvas) {
      canvas.style.display = 'block';
      box.style.display = 'none';
      QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
    } else {
      box.style.display = 'grid';
      new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
    }
  } else {
    box.textContent = 'QR no disponible';
    box.style.fontSize = '11px';
    box.style.color = 'var(--muted)';
  }
}

function abrirPasaporte() {
  if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
  const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
  if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
  window.open(link, '_blank');
}

function copiarLinkPas() {
  const link = document.getElementById('pasLinkTexto').textContent;
  if (!link) return;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.getElementById('pasCopyBtn');
    const orig = btn.textContent;
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

function renderPasaporteAdminTools() {
  const card = document.getElementById('pasLinkCard');
  if (!card || !_pasCurrent) return;
  let box = document.getElementById('pasAdminTools');
  if (!box) {
    card.insertAdjacentHTML('beforeend', `
      <div id="pasAdminTools" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--s2)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
          <button class="btn btn-sm" onclick="regenerarTokenPasaporte()">Regenerar token</button>
          ${_pasCurrent.estado === 'INACTIVO'
            ? '<button class="btn btn-sm btn-teal" onclick="reactivarPasaporte()">Reactivar pasaporte</button>'
            : '<button class="btn btn-sm btn-danger" onclick="desactivarPasaporte()">Desactivar pasaporte</button>'}
          <button class="btn btn-sm btn-teal" onclick="guardarProgresoPasaporte()">Guardar progreso</button>
        </div>
        <div id="pasProgressEditor"></div>
      </div>`);
    box = document.getElementById('pasAdminTools');
  }
  const passport = _pasCurrent.passport || {};
  const descarga = _pasCurrent.descarga || {};
  const stampSource = passport.stamps || passport.sellos || passport;
  const descargaSource = descarga.stamps || descarga.sellos || descarga;
  document.getElementById('pasProgressEditor').innerHTML = `
    <div style="font-weight:700;margin-bottom:4px">Sellos del pasaporte</div>
    <div style="font-size:.78rem;color:var(--muted);margin-bottom:8px">${Number(passport.autoStampCount || 0)} automáticos. Ajusta solo para correcciones excepcionales.</div>
    <div style="display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin-bottom:14px">
      ${Array.from({length:16}, (_, i) => {
        const n = i + 1;
        const checked = !!(stampSource[n] || stampSource['s' + n] || stampSource['stamp' + n] || stampSource[i]);
        return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px;text-align:center"><input type="checkbox" class="pasStamp" data-n="${n}" ${checked ? 'checked' : ''}> ${n}</label>`;
      }).join('')}
    </div>
    <div style="font-weight:700;margin-bottom:8px">Reto mensual descarga</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${[1,2].map(n => {
        const checked = !!(descargaSource[n] || descargaSource['s' + n] || descargaSource['stamp' + n] || descargaSource[n - 1]);
        return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px 12px"><input type="checkbox" class="pasDescarga" data-n="${n}" ${checked ? 'checked' : ''}> Sesión ${n}</label>`;
      }).join('')}
    </div>`;
}

async function guardarProgresoPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) {
    toast('Genera primero el enlace seguro', 'warn');
    return;
  }

  const btn = document.querySelector('#pasAdminTools button[onclick="guardarProgresoPasaporte()"]');
  let status = document.getElementById('pasSaveStatus');
  if (!status) {
    const editor = document.getElementById('pasProgressEditor');
    if (editor) {
      editor.insertAdjacentHTML('beforebegin', '<div id="pasSaveStatus" style="display:none;margin:0 0 12px;padding:10px 12px;border-radius:9px;font-size:.84rem;font-weight:600"></div>');
      status = document.getElementById('pasSaveStatus');
    }
  }

  const setStatus = (message, type) => {
    if (!status) return;
    const styles = {
      info: 'display:block;background:rgba(37,99,235,.09);border:1px solid rgba(37,99,235,.22);color:#1d4ed8',
      ok: 'display:block;background:rgba(22,163,74,.09);border:1px solid rgba(22,163,74,.22);color:#15803d',
      error: 'display:block;background:rgba(220,38,38,.09);border:1px solid rgba(220,38,38,.22);color:#b91c1c'
    };
    status.style.cssText = styles[type] || styles.info;
    status.textContent = message;
  };

  const passport = {stamps:{}};
  document.querySelectorAll('.pasStamp').forEach(cb => passport.stamps[cb.dataset.n] = cb.checked);
  const descarga = {stamps:{}};
  document.querySelectorAll('.pasDescarga').forEach(cb => descarga.stamps[cb.dataset.n] = cb.checked);
  const requestedCount = Object.values(passport.stamps).filter(Boolean).length;

  const originalText = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Guardando…';
  }
  setStatus('Guardando ' + requestedCount + ' de 16 sellos…', 'info');

  try {
    const url = APPS_SCRIPT_URL + '?action=passportSaveProgress&token=' + encodeURIComponent(TOKEN)
      + '&id=' + encodeURIComponent(_pasCurrent.id)
      + '&passport=' + encodeURIComponent(JSON.stringify(passport))
      + '&descarga=' + encodeURIComponent(JSON.stringify(descarga))
      + '&_ts=' + Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120000);
    let response;
    try {
      response = await fetch(url, {cache:'no-store', signal:controller.signal});
    } finally {
      clearTimeout(timer);
    }

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      throw new Error('El servidor respondió en un formato inesperado.');
    }
    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'No se pudo guardar el progreso.');
    }

    _pasCurrent = data.passport || _pasCurrent;

    // Volver a consultar el pasaporte desde el servidor para que el editor
    // muestre exactamente la misma fuente de datos que la vista pública.
    const nombre = document.getElementById('pasNombreInput').value.trim();
    const verifyUrl = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
      + '&nombre=' + encodeURIComponent(nombre)
      + '&telefono=' + encodeURIComponent(_pasTelefono || '')
      + '&_ts=' + Date.now();
    const verifyResponse = await fetch(verifyUrl, {cache:'no-store'});
    const verifyRaw = await verifyResponse.text();
    let verifyData = null;
    try { verifyData = JSON.parse(verifyRaw); } catch (_) {}
    if (verifyResponse.ok && verifyData && verifyData.ok && verifyData.passport) {
      _pasCurrent = verifyData.passport;
    }

    renderPasaporteAdminTools();
    setStatus('Progreso guardado correctamente: ' + requestedCount + '/16.', 'ok');
    toast('Progreso guardado: ' + requestedCount + '/16', 'success');
  } catch (error) {
    const message = error && error.name === 'AbortError'
      ? 'El servidor tardó demasiado. Actualiza el pasaporte antes de volver a guardar.'
      : (error && error.message ? error.message : 'No se pudo guardar el progreso.');
    setStatus(message, 'error');
    toast(message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalText || 'Guardar progreso';
    }
  }
}

async function regenerarTokenPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Regenerar el enlace? El anterior dejará de funcionar.')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportRegenerateToken&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo regenerar', 'error'); return; }
  _pasCurrent = data.passport;
  generarLinkPasaporte();
  toast('Token regenerado. El enlace anterior quedó inválido.', 'success');
}

async function desactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Desactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportDeactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo desactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte desactivado', 'success');
}

async function reactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Reactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportReactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo reactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte reactivado', 'success');
}

  global.PanelPassport = Object.freeze({
    pasaporteLink,
    pasaporteLinkAdmin,
    waBtnPasaporte,
    openPassportModuleFor,
    _pasGetDB,
    onPasInput,
    searchPasPatient,
    selectPasPatient,
    _pasSetConfirmed,
    limpiarPasBusqueda,
    generarLinkPasaporte,
    renderPasaporteQR,
    abrirPasaporte,
    copiarLinkPas,
    renderPasaporteAdminTools,
    guardarProgresoPasaporte,
    regenerarTokenPasaporte,
    desactivarPasaporte,
    reactivarPasaporte
  });
})(window);
