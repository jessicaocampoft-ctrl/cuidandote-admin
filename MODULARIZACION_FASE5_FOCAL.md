# Inventario focal del Pasaporte — Fase 5

- Funciones por nombre: 12

## Nombres y líneas

- `pasaporteLink` — línea 8617
- `pasaporteLinkAdmin` — línea 8621
- `waBtnPasaporte` — línea 8625
- `openPassportModuleFor` — línea 8630
- `generarLinkPasaporte` — línea 18305
- `renderPasaporteQR` — línea 18331
- `abrirPasaporte` — línea 18359
- `renderPasaporteAdminTools` — línea 18377
- `guardarProgresoPasaporte` — línea 18418
- `regenerarTokenPasaporte` — línea 18519
- `desactivarPasaporte` — línea 18529
- `reactivarPasaporte` — línea 18539

## Código exacto

### pasaporteLink

```javascript
function pasaporteLink(nombre) {
  return PASAPORTE_BASE;
}
```

### pasaporteLinkAdmin

```javascript
function pasaporteLinkAdmin(nombre) {
  return PASAPORTE_BASE;
}
```

### waBtnPasaporte

```javascript
function waBtnPasaporte(tel, nombre) {
  const safeName = String(nombre || '').replace(/'/g, "\\'");
  return '<button type="button" class="btn btn-passport btn-sm" onclick="openPassportModuleFor(\'' + safeName + '\')" title="Generar enlace seguro">Pasaporte</button>';
}
```

### openPassportModuleFor

```javascript
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
```

### generarLinkPasaporte

```javascript
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
```

### renderPasaporteQR

```javascript
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
```

### abrirPasaporte

```javascript
function abrirPasaporte() {
  if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
  const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
  if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
  window.open(link, '_blank');
}
```

### renderPasaporteAdminTools

```javascript
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
```

### guardarProgresoPasaporte

```javascript
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
```

### regenerarTokenPasaporte

```javascript
async function regenerarTokenPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Regenerar el enlace? El anterior dejará de funcionar.')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportRegenerateToken&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo regenerar', 'error'); return; }
  _pasCurrent = data.passport;
  generarLinkPasaporte();
  toast('Token regenerado. El enlace anterior quedó inválido.', 'success');
}
```

### desactivarPasaporte

```javascript
async function desactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Desactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportDeactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo desactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte desactivado', 'success');
}
```

### reactivarPasaporte

```javascript
async function reactivarPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Reactivar este pasaporte?')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportReactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo reactivar', 'error'); return; }
  _pasCurrent = data.passport || _pasCurrent;
  renderPasaporteAdminTools();
  toast('Pasaporte reactivado', 'success');
}
```

