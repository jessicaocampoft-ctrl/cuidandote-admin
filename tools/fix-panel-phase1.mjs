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

// 1) Corregir la casilla mensual que reutilizaba el ID semanal.
if (!html.includes('id="emCk_ventas_mes_1"')) {
  const monthlyPattern = /(id="emS_ventas_mes_1"[^\n]*?<input type="checkbox" id=")emCk_ventas_sem_1("[^\n]*>)/;
  if (!monthlyPattern.test(html)) {
    throw new Error('No se encontró la casilla mensual ventas_mes_1 con el ID incorrecto.');
  }
  html = html.replace(monthlyPattern, '$1emCk_ventas_mes_1$2');
  changes.push('Corregir ID de la casilla mensual de ventas');
}

// 2) Convertir los dos avisos de copia en elementos únicos y una clase compartida.
const copyIdMatches = [...html.matchAll(/id="copyGestionStatus"/g)];
if (copyIdMatches.length === 2) {
  let index = 0;
  html = html.replace(/id="copyGestionStatus"/g, () => {
    index += 1;
    return index === 1
      ? 'id="copyGestionStatusPrincipal" class="copyGestionStatus"'
      : 'id="copyGestionStatusSecundario" class="copyGestionStatus"';
  });
  changes.push('Asignar IDs únicos a los avisos de copia');
} else if (copyIdMatches.length !== 0) {
  throw new Error(`Avisos de copia: se esperaban 2 IDs duplicados o 0 ya corregidos; se encontraron ${copyIdMatches.length}.`);
}

const oldCopyOk = `function _copyOk() {
  toast('Información copiada correctamente', 'ok');
  const el = document.getElementById('copyGestionStatus');
  if (el) {
    el.style.display = 'inline-flex';
    clearTimeout(window._copyGestionStatusTimer);
    window._copyGestionStatusTimer = setTimeout(() => { el.style.display = 'none'; }, 2200);
  }
}`;

const newCopyOk = `function _copyOk() {
  toast('Información copiada correctamente', 'ok');
  const estados = document.querySelectorAll('.copyGestionStatus');
  estados.forEach(el => { el.style.display = 'inline-flex'; });
  clearTimeout(window._copyGestionStatusTimer);
  window._copyGestionStatusTimer = setTimeout(() => {
    estados.forEach(el => { el.style.display = 'none'; });
  }, 2200);
}`;
replaceExact(oldCopyOk, newCopyOk, 'Actualizar confirmación visual de copia');

// 3) Conservar solamente la búsqueda global expandida.
const simpleGlobalSearch = `// ── BÚSQUEDA GLOBAL ──
function globalSearch(val) {
  showView('agenda');
  const fSearch = document.getElementById('fSearch');
  if (fSearch) { fSearch.value = val; renderAgenda(); }
}

`;
if (html.includes(simpleGlobalSearch)) {
  html = html.replace(simpleGlobalSearch, '');
  changes.push('Retirar versión antigua de globalSearch');
}

// 4) Reparar el botón de cobro que llama openPago() sin tener función definida.
const hasOpenPagoDeclaration = /\b(?:async\s+)?function\s+openPago\s*\(/.test(html);
const openPagoReference = html.indexOf('onclick="openPago(');
if (!hasOpenPagoDeclaration && openPagoReference >= 0) {
  const marker = '// ── Alerta semana floja ──';
  const insertionIndex = html.indexOf(marker, openPagoReference);
  if (insertionIndex < 0) {
    throw new Error('openPago: no se encontró el punto de inserción después del botón Registrar pago.');
  }

  const openPagoFunction = `function openPago(citaId) {
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

`;

  html = html.slice(0, insertionIndex) + openPagoFunction + html.slice(insertionIndex);
  changes.push('Crear función openPago para Registrar pago');
}

// Validaciones obligatorias antes de escribir.
const staticIds = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
const duplicates = [...new Set(staticIds.filter((id, i, arr) => arr.indexOf(id) !== i))];
if (duplicates.includes('copyGestionStatus') || duplicates.includes('emCk_ventas_sem_1')) {
  throw new Error(`Persisten IDs críticos duplicados: ${duplicates.join(', ')}`);
}

const globalSearchCount = [...html.matchAll(/\bfunction\s+globalSearch\s*\(/g)].length;
if (globalSearchCount !== 1) {
  throw new Error(`globalSearch debe quedar una sola vez; quedaron ${globalSearchCount}.`);
}
if (/onclick="openPago\('/.test(html) && !/\bfunction\s+openPago\s*\(/.test(html)) {
  throw new Error('El botón Registrar pago sigue sin una función openPago definida.');
}

const output = (hadBom ? '\uFEFF' : '') + html;
fs.writeFileSync(target, output, 'utf8');

if (changes.length) {
  console.log('Correcciones de fase 1 aplicadas:');
  changes.forEach(item => console.log(`- ${item}`));
} else {
  console.log('La fase 1 ya estaba aplicada; no hubo cambios.');
}
