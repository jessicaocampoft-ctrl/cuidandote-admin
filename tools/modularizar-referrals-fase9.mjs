import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'referrals.js');
const scriptTag = '<script src="js/modules/referrals.js"></script>';
const names = [
  '_mesAbrevActual','_bonosReferidorMes','updateBonosBadge',
  'renderCodigos','marcarUsado','generarBono'
];
const constantNames = ['BONO_VALOR','BONO_MAX_MES','_MES_EN'];

function extractTopLevelFunction(source, name) {
  const escaped = name.replace(/[$]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g');
  const matches = [...source.matchAll(regex)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const nextRegex = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  nextRegex.lastIndex = start + 1;
  const next = nextRegex.exec(source);
  const end = next ? next.index + 1 : source.length;
  const text = source.slice(start, end).trimEnd();
  return {name, text, async:/^async\s+function/.test(text)};
}

function extractConstant(source, name) {
  const escaped = name.replace(/[$]/g, '\\$&');
  const pattern = name === '_MES_EN'
    ? new RegExp(`const\\s+${escaped}\\s*=\\s*\\[[^\\]]*\\]\\s*;`)
    : new RegExp(`const\\s+${escaped}\\s*=\\s*[^;]+;`);
  const matches = [...source.matchAll(new RegExp(pattern.source, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  return matches[0][0];
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 9 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractTopLevelFunction(html, name));
const constants = constantNames.map(name => extractConstant(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — Códigos de referidos y bonos. */\n(function (global) {\n  'use strict';\n\n  ${constants.join('\n  ')}\n\n${blocks.map(item => item.text).join('\n\n')}\n\n  global.PanelReferrals = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelReferrals;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Códigos REF y bono no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

for (const declaration of constants) {
  const occurrences = html.split(declaration).length - 1;
  if (occurrences !== 1) throw new Error(`La constante no es única al reemplazar: ${declaration.slice(0,40)}.`);
  html = html.replace(declaration, '');
}

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/database.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró database.js como ancla de carga.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

fs.mkdirSync(path.dirname(modulePath), {recursive:true});
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 9 aplicada: ${names.length} funciones y ${constantNames.length} constantes trasladadas a ${modulePath}.`);
