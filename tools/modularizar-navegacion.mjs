import fs from 'node:fs';
import path from 'node:path';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/core/navigation.js';
let html = fs.readFileSync(htmlPath, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const signature = 'function showView(v) {';
const adapter = `function showView(v) {\n  return window.PanelNavigation.showView(v);\n}`;
const scriptTag = '<script src="js/core/navigation.js"></script>';

if (html.includes(adapter) && html.includes(scriptTag) && fs.existsSync(modulePath)) {
  const existingModule = fs.readFileSync(modulePath, 'utf8');
  if (!existingModule.includes('window.PanelNavigation = Object.freeze({ showView });')) {
    throw new Error('navigation.js existe, pero no exporta PanelNavigation.showView.');
  }
  console.log('La navegación ya estaba modularizada; se conserva sin cambios.');
  process.exit(0);
}

function findFunctionEnd(source, start) {
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error('No se encontró la apertura de showView.');
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let templateExpressionDepth = 0;

  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') { blockComment = false; i++; }
      continue;
    }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') {
        templateExpressionDepth++;
        i++;
        continue;
      }
      if (quote === '`' && templateExpressionDepth > 0 && ch === '}') {
        templateExpressionDepth--;
        continue;
      }
      if (ch === quote && templateExpressionDepth === 0) quote = '';
      continue;
    }

    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error('No se encontró el cierre de showView.');
}

const signatureCount = html.split(signature).length - 1;
if (signatureCount !== 1) {
  throw new Error(`Se esperaba una función showView y se encontraron ${signatureCount}.`);
}

const start = html.indexOf(signature);
const end = findFunctionEnd(html, start);
const originalFunction = html.slice(start, end);
const bodyStart = originalFunction.indexOf('{') + 1;
const bodyEnd = originalFunction.lastIndexOf('}');
const body = originalFunction.slice(bodyStart, bodyEnd).trim();

if (body.includes('window.PanelNavigation.showView')) {
  throw new Error('showView ya parece ser un adaptador, pero falta el módulo o su etiqueta de carga.');
}
if (body.length < 300) {
  throw new Error('El cuerpo de showView es inesperadamente pequeño; se canceló la extracción.');
}

const moduleSource = `/**\n * Navegación principal del panel administrativo.\n * Extraído de index.html sin cambiar su lógica interna.\n * Fase 1 de modularización: 2026-08-04.\n */\n(function (window) {\n  'use strict';\n\n  function showView(v) {\n${body.split('\n').map(line => '    ' + line).join('\n')}\n  }\n\n  window.PanelNavigation = Object.freeze({ showView });\n})(window);\n`;

html = html.slice(0, start) + adapter + html.slice(end);

if (!html.includes(scriptTag)) {
  const containingScriptStart = html.lastIndexOf('<script', start);
  if (containingScriptStart < 0) {
    throw new Error('No se encontró la etiqueta script que contiene showView.');
  }
  html = html.slice(0, containingScriptStart) + scriptTag + '\n' + html.slice(containingScriptStart);
}

const finalSignatureCount = html.split(signature).length - 1;
if (finalSignatureCount !== 1) throw new Error('El adaptador showView no quedó único.');
if (!html.includes(adapter)) throw new Error('No quedó instalado el adaptador showView.');
if (!html.includes(scriptTag)) throw new Error('No quedó cargado navigation.js.');
if (!moduleSource.includes('window.PanelNavigation = Object.freeze({ showView });')) {
  throw new Error('El módulo no exporta PanelNavigation.showView.');
}

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(htmlPath, (hadBom ? '\uFEFF' : '') + html, 'utf8');

console.log('Navegación modularizada correctamente.');
console.log(`- HTML: ${htmlPath}`);
console.log(`- Módulo: ${modulePath}`);
console.log(`- Tamaño extraído: ${originalFunction.length} caracteres`);
