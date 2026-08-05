import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'passport.js');
const scriptTag = '<script src="js/modules/passport.js"></script>';

const helperNames = ['pasaporteLink','pasaporteLinkAdmin','waBtnPasaporte','openPassportModuleFor'];
const mainNames = [
  '_pasGetDB','onPasInput','searchPasPatient','selectPasPatient','_pasSetConfirmed','limpiarPasBusqueda',
  'generarLinkPasaporte','renderPasaporteQR','abrirPasaporte','copiarLinkPas','renderPasaporteAdminTools',
  'guardarProgresoPasaporte','regenerarTokenPasaporte','desactivarPasaporte','reactivarPasaporte'
];
const exported = [...helperNames, ...mainNames];
const asyncNames = new Set([
  'generarLinkPasaporte','guardarProgresoPasaporte','regenerarTokenPasaporte',
  'desactivarPasaporte','reactivarPasaporte'
]);

function extractFunction(source, signature) {
  const start = source.indexOf(signature);
  if (start < 0) throw new Error(`No se encontró ${signature}.`);
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error(`No se encontró la apertura de ${signature}.`);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') { const nl = source.indexOf('\n', i + 2); i = nl < 0 ? source.length : nl; continue; }
    if (ch === '/' && next === '*') { const close = source.indexOf('*/', i + 2); i = close < 0 ? source.length : close + 1; continue; }
    if (ch === '{') depth++;
    if (ch === '}' && --depth === 0) return { start, end: i + 1, text: source.slice(start, i + 1) };
  }
  throw new Error(`No se pudo cerrar ${signature}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 5 ya estaba aplicada.');
  process.exit(0);
}

const helperBlocks = helperNames.map(name => extractFunction(html, `function ${name}(`));
const mainStartMarker = '// ── PASAPORTE DE MOVIMIENTO';
const mainStart = html.indexOf(mainStartMarker);
if (mainStart < 0) throw new Error('No se encontró el inicio del bloque principal del Pasaporte.');
const finalBlock = extractFunction(html, 'async function reactivarPasaporte(');
if (finalBlock.end <= mainStart) throw new Error('El final del Pasaporte quedó antes de su inicio.');
const mainBlock = html.slice(mainStart, finalBlock.end).trimEnd();

for (const name of mainNames) {
  const re = new RegExp(`\\b(?:async\\s+)?function\\s+${name.replace('$','\\$')}\\s*\\(`);
  if (!re.test(mainBlock)) throw new Error(`El bloque principal no contiene ${name}().`);
}
if (!mainBlock.includes("const PASAPORTE_BASE")) throw new Error('No se encontró PASAPORTE_BASE en el bloque principal.');
if (!mainBlock.includes('let _pasCurrent')) throw new Error('No se encontró el estado interno del Pasaporte.');

const helpersSource = helperBlocks.map(block => block.text).join('\n\n');
const moduleSource = `/* Cuidándote Fisioterapia — módulo aislado de Pasaporte. */\n(function (global) {\n  'use strict';\n\n${helpersSource}\n\n${mainBlock}\n\n  global.PanelPassport = Object.freeze({\n${exported.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

const adapters = `// Adaptadores de compatibilidad — Fase 5 Pasaporte.\n${exported.map(name => {
  const prefix = asyncNames.has(name) ? 'async ' : '';
  const awaitPrefix = asyncNames.has(name) ? 'await ' : '';
  return `${prefix}function ${name}(...args) {\n  const module = window.PanelPassport;\n  if (!module || typeof module.${name} !== 'function') {\n    throw new Error('El módulo de Pasaporte no está disponible: ${name}');\n  }\n  return ${awaitPrefix}module.${name}(...args);\n}`;
}).join('\n\n')}\n\n`;

// Reemplazar el bloque principal por adaptadores públicos.
html = html.slice(0, mainStart) + adapters + html.slice(finalBlock.end);

// Retirar los cuatro ayudantes antiguos, que están antes del bloque principal.
for (const block of [...helperBlocks].sort((a, b) => b.start - a.start)) {
  html = html.slice(0, block.start) + html.slice(block.end);
}

if (!html.includes(scriptTag)) {
  const bodyClose = html.lastIndexOf('</body>');
  if (bodyClose < 0) throw new Error('No se encontró </body> para cargar passport.js.');
  html = html.slice(0, bodyClose) + `  ${scriptTag}\n` + html.slice(bodyClose);
}

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 5 aplicada: ${exported.length} funciones trasladadas a ${modulePath}.`);
