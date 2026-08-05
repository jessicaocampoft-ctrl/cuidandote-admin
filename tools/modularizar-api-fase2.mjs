import fs from 'node:fs';
import path from 'node:path';

const htmlPath = process.argv[2] || 'index.html';
const configPath = process.argv[3] || 'js/core/config.js';
const apiPath = process.argv[4] || 'js/core/api.js';

let html = fs.readFileSync(htmlPath, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const configTag = '<script src="js/core/config.js"></script>';
const apiTag = '<script src="js/core/api.js"></script>';
const navigationTag = '<script src="js/core/navigation.js"></script>';
const configAdapter = 'const APPS_SCRIPT_URL = window.PanelConfig.APPS_SCRIPT_URL;';
const apiAdapter = `async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {\n  return window.PanelApi.fetchJsonWithTimeout(url, options, timeoutMs);\n}`;

function findFunctionRange(source, signature) {
  const start = source.indexOf(signature);
  if (start < 0) return null;
  const parenStart = source.indexOf('(', start);
  if (parenStart < 0) throw new Error(`No se encontró la apertura de parámetros de ${signature}.`);

  let parenDepth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let closeParen = -1;

  for (let i = parenStart; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '(') parenDepth++;
    if (ch === ')') {
      parenDepth--;
      if (parenDepth === 0) { closeParen = i; break; }
    }
  }
  if (closeParen < 0) throw new Error(`No se encontró el cierre de parámetros de ${signature}.`);

  const bodyStart = source.indexOf('{', closeParen);
  if (bodyStart < 0) throw new Error(`No se encontró el cuerpo de ${signature}.`);

  let braceDepth = 0;
  quote = '';
  escaped = false;
  lineComment = false;
  blockComment = false;
  let templateExpressionDepth = 0;

  for (let i = bodyStart; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') { templateExpressionDepth++; i++; continue; }
      if (quote === '`' && templateExpressionDepth > 0 && ch === '}') { templateExpressionDepth--; continue; }
      if (ch === quote && templateExpressionDepth === 0) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') braceDepth++;
    if (ch === '}') {
      braceDepth--;
      if (braceDepth === 0) return { start, end: i + 1, text: source.slice(start, i + 1) };
    }
  }
  throw new Error(`No se encontró el cierre de ${signature}.`);
}

const originalConfigPattern = /const\s+APPS_SCRIPT_URL\s*=\s*(['"])(https:\/\/script\.google\.com\/macros\/s\/[^'"]+\/exec)\1\s*;/;
let backendUrl = '';
const originalConfigMatch = html.match(originalConfigPattern);
if (originalConfigMatch) {
  backendUrl = originalConfigMatch[2];
  html = html.replace(originalConfigPattern, configAdapter);
} else if (html.includes(configAdapter) && fs.existsSync(configPath)) {
  const existingConfig = fs.readFileSync(configPath, 'utf8');
  const urlMatch = existingConfig.match(/https:\/\/script\.google\.com\/macros\/s\/[^'"\s]+\/exec/);
  if (!urlMatch) throw new Error('config.js existe, pero no contiene una URL válida de Apps Script.');
  backendUrl = urlMatch[0];
} else {
  throw new Error('No se encontró la configuración original ni el adaptador esperado.');
}

let originalTimeout = '';
const timeoutRange = findFunctionRange(html, 'async function fetchJsonWithTimeout');
if (timeoutRange && !timeoutRange.text.includes('window.PanelApi.fetchJsonWithTimeout')) {
  originalTimeout = timeoutRange.text;
  html = html.slice(0, timeoutRange.start) + apiAdapter + html.slice(timeoutRange.end);
} else if (timeoutRange && timeoutRange.text.includes('window.PanelApi.fetchJsonWithTimeout') && fs.existsSync(apiPath)) {
  originalTimeout = '';
} else {
  throw new Error('No se encontró la función fetchJsonWithTimeout ni su adaptador.');
}

if (!html.includes(configTag) || !html.includes(apiTag)) {
  if (!html.includes(navigationTag)) throw new Error('No se encontró el punto seguro de carga antes de navigation.js.');
  const tags = `${configTag}\n${apiTag}\n${navigationTag}`;
  html = html.replace(navigationTag, tags);
}

const configSource = `/**\n * Configuración compartida del panel.\n * Fase 2 de modularización: 2026-08-05.\n */\n(function (window) {\n  'use strict';\n\n  const APPS_SCRIPT_URL = ${JSON.stringify(backendUrl)};\n\n  window.PanelConfig = Object.freeze({ APPS_SCRIPT_URL });\n})(window);\n`;

let timeoutImplementation = originalTimeout;
if (!timeoutImplementation && fs.existsSync(apiPath)) {
  const existingApi = fs.readFileSync(apiPath, 'utf8');
  const existingRange = findFunctionRange(existingApi, 'async function fetchJsonWithTimeout');
  if (!existingRange) throw new Error('api.js existe, pero no contiene fetchJsonWithTimeout.');
  timeoutImplementation = existingRange.text;
}

const apiSource = `/**\n * Comunicación común con el backend y control de tiempo máximo.\n * Fase 2 de modularización: 2026-08-05.\n */\n(function (window) {\n  'use strict';\n\n${timeoutImplementation.split('\n').map(line => '  ' + line).join('\n')}\n\n  window.PanelApi = Object.freeze({ fetchJsonWithTimeout });\n})(window);\n`;

if (!html.includes(configAdapter)) throw new Error('No quedó instalado el adaptador de configuración.');
if (!html.includes(apiAdapter)) throw new Error('No quedó instalado el adaptador de API.');
if ((html.match(/<script src="js\/core\/config\.js"><\/script>/g) || []).length !== 1) throw new Error('config.js debe cargarse exactamente una vez.');
if ((html.match(/<script src="js\/core\/api\.js"><\/script>/g) || []).length !== 1) throw new Error('api.js debe cargarse exactamente una vez.');
if (html.includes(backendUrl)) throw new Error('La URL del backend todavía aparece dentro de index.html.');

fs.mkdirSync(path.dirname(configPath), { recursive: true });
fs.mkdirSync(path.dirname(apiPath), { recursive: true });
fs.writeFileSync(configPath, configSource, 'utf8');
fs.writeFileSync(apiPath, apiSource, 'utf8');
fs.writeFileSync(htmlPath, (hadBom ? '\uFEFF' : '') + html, 'utf8');

console.log('Fase 2 modularizada correctamente.');
console.log(`- Configuración: ${configPath}`);
console.log(`- API común: ${apiPath}`);
console.log('- Pagos, Pasaporte, Agenda y sesión conservaron sus funciones específicas.');
