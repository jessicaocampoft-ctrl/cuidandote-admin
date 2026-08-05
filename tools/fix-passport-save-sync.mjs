import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

function findFunction(source, name) {
  const re = new RegExp(`async\\s+function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`);
  const match = re.exec(source);
  if (!match) throw new Error(`No se encontró ${name}().`);
  const start = match.index;
  const brace = source.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = brace; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') { const end = source.indexOf('\n', i + 2); i = end < 0 ? source.length : end; continue; }
    if (ch === '/' && next === '*') { const end = source.indexOf('*/', i + 2); i = end < 0 ? source.length : end + 1; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  throw new Error(`No se pudo delimitar ${name}().`);
}

const replacement = `async function guardarProgresoPasaporte() {
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
}`;

const block = findFunction(html, 'guardarProgresoPasaporte');
html = html.slice(0, block.start) + replacement + html.slice(block.end);

if (!html.includes("setStatus('Progreso guardado correctamente: ' + requestedCount + '/16.', 'ok')")) {
  throw new Error('La confirmación visible no quedó instalada.');
}
if (!html.includes("action=passportEnsure")) {
  throw new Error('La verificación posterior no quedó instalada.');
}
if (!html.includes("setTimeout(() => controller.abort(), 120000)")) {
  throw new Error('El tiempo de espera ampliado no quedó instalado.');
}

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log('Guardado y sincronización del Pasaporte corregidos.');
