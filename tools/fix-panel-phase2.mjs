import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const changes = [];

function replaceExact(oldText, newText, label) {
  if (html.includes(newText)) return;
  const count = html.split(oldText).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: se esperaba 1 coincidencia y se encontraron ${count}.`);
  }
  html = html.replace(oldText, newText);
  changes.push(label);
}

// 1) Los botones llaman copyGestionTexto(), pero la implementación existente usa _copyGestionTexto().
if (!/\bfunction\s+copyGestionTexto\s*\(/.test(html)) {
  const anchor = 'function _copyGestionAsesorText(d) {';
  const alias = `function copyGestionTexto(kind) {
  return _copyGestionTexto(kind);
}

`;
  const count = html.split(anchor).length - 1;
  if (count !== 1) {
    throw new Error(`Alias de copia: se esperaba 1 punto de inserción y se encontraron ${count}.`);
  }
  html = html.replace(anchor, alias + anchor);
  changes.push('Conectar botones de copia con _copyGestionTexto');
}

// 2) Agregar una utilidad única para solicitudes JSON con límite de tiempo y respuesta validada.
if (!/\basync\s+function\s+fetchJsonWithTimeout\s*\(/.test(html)) {
  const anchor = 'function openProfessionalLoginMode() {';
  const helper = `async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const raw = (await response.text()).replace(/^\\uFEFF/, '').trim();
    if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
    try {
      return JSON.parse(raw);
    } catch (_) {
      throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
    }
  } catch (error) {
    if (error && error.name === 'AbortError') {
      throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

`;
  const count = html.split(anchor).length - 1;
  if (count !== 1) {
    throw new Error(`Timeout de login: se esperaba 1 punto de inserción y se encontraron ${count}.`);
  }
  html = html.replace(anchor, helper + anchor);
  changes.push('Agregar fetchJsonWithTimeout');
}

const professionalOld = `    const d = await fetch(APPS_SCRIPT_URL, {
      method:'POST',
      body:JSON.stringify({
        action:'professionalLogin',
        user:document.getElementById('proUser').value.trim(),
        password:document.getElementById('proPass').value
      })
    }).then(r => r.json());`;

const professionalNew = `    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method:'POST',
      body:JSON.stringify({
        action:'professionalLogin',
        user:document.getElementById('proUser').value.trim(),
        password:document.getElementById('proPass').value
      })
    }, 45000);`;
replaceExact(professionalOld, professionalNew, 'Proteger login profesional con timeout');

const adminOld = `    const r = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'adminLogin', user, password: pw})
    });
    const d = await r.json();`;

const adminNew = `    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'adminLogin', user, password: pw})
    }, 45000);`;
replaceExact(adminOld, adminNew, 'Proteger login administrativo con timeout');

const genericAdminError = `    document.getElementById('loginErr').textContent = 'Error de conexión. Revisa tu internet.';`;
const detailedAdminError = `    document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';`;
replaceExact(genericAdminError, detailedAdminError, 'Mostrar causa controlada del error de acceso');

// Validaciones finales antes de guardar.
const copyAliasCount = [...html.matchAll(/\bfunction\s+copyGestionTexto\s*\(/g)].length;
if (copyAliasCount !== 1) {
  throw new Error(`copyGestionTexto debe existir exactamente una vez; se encontraron ${copyAliasCount}.`);
}
const helperCount = [...html.matchAll(/\basync\s+function\s+fetchJsonWithTimeout\s*\(/g)].length;
if (helperCount !== 1) {
  throw new Error(`fetchJsonWithTimeout debe existir exactamente una vez; se encontraron ${helperCount}.`);
}
if (!html.includes("action:'professionalLogin'") || !html.includes("action: 'adminLogin'")) {
  throw new Error('No se conservaron las acciones de login esperadas.');
}
if (!html.includes('fetchJsonWithTimeout(APPS_SCRIPT_URL')) {
  throw new Error('Los inicios de sesión no quedaron conectados al timeout.');
}

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');

if (changes.length) {
  console.log('Correcciones de fase 2 aplicadas:');
  changes.forEach(change => console.log(`- ${change}`));
} else {
  console.log('La fase 2 ya estaba aplicada; no hubo cambios.');
}
