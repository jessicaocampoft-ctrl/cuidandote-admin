import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'budget.js');
const scriptTag = '<script src="js/modules/budget.js"></script>';
const names = [
  'getCostosEstructura','saveCostosEstructura','calcTotalCostos',
  'renderPresupuestoMetas','pmRecalc','pmGuardarCostos','pmGuardarKPIs',
  'getMeta','actualizarMetaBarra','guardarMeta','guardarMetaFin','previewMetaFin','reloadMetas',
  '_toggleEditCostos','_leerCamposCostos','_guardarCostos'
];

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const re = new RegExp(`(?:async\\s+)?function\\s+${safe}\\s*\\(`, 'g');
  const matches = [...source.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index;
  const open = source.indexOf('{', start);
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
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
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const text = source.slice(start, i + 1);
        return { name, text, async: /^async\s+function/.test(text) };
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

function extractObjectConstant(source, name) {
  const marker = `const ${name} =`;
  const start = source.indexOf(marker);
  if (start < 0 || source.indexOf(marker, start + 1) >= 0) throw new Error(`${name} debe existir una sola vez.`);
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error(`No se encontró el objeto ${name}.`);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const semi = source.indexOf(';', i);
        if (semi < 0) throw new Error(`No se encontró el cierre de ${name}.`);
        return source.slice(start, semi + 1);
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 13 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractNamedFunction(html, name));
const defaultsBlock = extractObjectConstant(html, 'COSTOS_DEFAULTS');

let remainder = html;
for (const item of blocks) remainder = remainder.replace(item.text, '');
remainder = remainder.replace(defaultsBlock, '');
if (/\bCOSTOS_DEFAULTS\b/.test(remainder)) {
  throw new Error('COSTOS_DEFAULTS todavía tiene consumidores externos; extracción cancelada.');
}

const moduleSource = `/* Cuidándote Fisioterapia — Metas, presupuesto y estructura de costos. */\n(function (global) {\n  'use strict';\n\n${defaultsBlock}\n\n${blocks.map(x => x.text).join('\n\n')}\n\n  global.PanelBudget = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelBudget;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Metas y Presupuesto no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const count = html.split(item.text).length - 1;
  if (count !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${count}.`);
  html = html.replace(item.text, adapter);
}
html = html.replace(defaultsBlock, '// COSTOS_DEFAULTS encapsulado en js/modules/budget.js.');

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/kpi.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró el módulo KPI como ancla.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 13 aplicada: ${names.length} funciones y COSTOS_DEFAULTS trasladados a ${modulePath}.`);
