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

// 1) Finanzas: renderMetricas usa fecha, mes y año en varios cálculos.
const metricsComplete = `function renderMetricas() {\n  const now = new Date();\n  const m = now.getMonth() + 1;\n  const y = now.getFullYear();\n  const citas = citasReales();`;
const metricsOnlyNow = `function renderMetricas() {\n  const now = new Date();\n  const citas = citasReales();`;
const metricsWithoutDate = `function renderMetricas() {\n  const citas = citasReales();`;
if (!html.includes(metricsComplete)) {
  if (html.includes(metricsOnlyNow)) {
    html = html.replace(metricsOnlyNow, metricsComplete);
    changes.push('Declarar mes y año dentro de renderMetricas');
  } else if (html.includes(metricsWithoutDate)) {
    html = html.replace(metricsWithoutDate, metricsComplete);
    changes.push('Declarar fecha, mes y año dentro de renderMetricas');
  } else {
    throw new Error('No se reconoció el inicio de renderMetricas; no se modificó el panel.');
  }
}

// 2) Navegación: citas es un nombre antiguo de la vista agenda.
replaceExact(
  `function showView(v) {\n  ['dashboard'`,
  `function showView(v) {\n  const viewAliases = { citas: 'agenda' };\n  v = viewAliases[v] || v;\n  ['dashboard'`,
  'Redirigir la vista antigua citas hacia agenda'
);

// 3) No permitir que una referencia futura a una vista inexistente rompa todo el panel.
replaceExact(
  `  const _sec = document.getElementById('v' + v.charAt(0).toUpperCase() + v.slice(1));\n  _sec.style.display = 'block';`,
  `  const _sec = document.getElementById('v' + v.charAt(0).toUpperCase() + v.slice(1));\n  if (!_sec) {\n    console.warn('Vista no encontrada:', v);\n    return false;\n  }\n  _sec.style.display = 'block';`,
  'Proteger showView ante vistas inexistentes'
);

// 4) La política CSP solo permite scripts propios. Usar la copia local de QRCode.js.
replaceExact(
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>`,
  `<script src="vendor/qrcode.min.js"></script>`,
  'Usar QRCode.js desde el propio repositorio'
);

// X-Frame-Options no funciona como meta y Chrome lo reporta como configuración inválida.
const ineffectiveFrameMeta = `<meta http-equiv="X-Frame-Options" content="DENY">\n`;
if (html.includes(ineffectiveFrameMeta)) {
  html = html.replace(ineffectiveFrameMeta, '');
  changes.push('Retirar meta X-Frame-Options ineficaz');
}

// Validaciones antes de guardar.
if (!html.includes(metricsComplete)) {
  throw new Error('Finanzas no quedó protegida con fecha, mes y año locales.');
}
if (!html.includes("const viewAliases = { citas: 'agenda' };")) {
  throw new Error('No quedó configurado el alias citas → agenda.');
}
if (!html.includes("console.warn('Vista no encontrada:', v);")) {
  throw new Error('showView no quedó protegido ante vistas inexistentes.');
}
if (!html.includes('<script src="vendor/qrcode.min.js"></script>')) {
  throw new Error('El panel no quedó conectado a la copia local de QRCode.js.');
}
if (html.includes('cdnjs.cloudflare.com/ajax/libs/qrcodejs')) {
  throw new Error('Todavía existe la dependencia QR bloqueada por CSP.');
}

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');

if (changes.length) {
  console.log('Correcciones del navegador aplicadas:');
  changes.forEach(change => console.log(`- ${change}`));
} else {
  console.log('Las correcciones del navegador ya estaban aplicadas.');
}
