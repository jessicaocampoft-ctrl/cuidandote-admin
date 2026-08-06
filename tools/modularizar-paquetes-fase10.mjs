import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'packages.js');
const scriptTag = '<script src="js/modules/packages.js"></script>';
const names = [
  '_getPkAsignados','_getPkPlantillas','_savePkAsignados','_savePkPlantillas',
  'abrirModalPaquete','abrirModalPlantillaPaquete','ajustarSesiones',
  'borrarPaqueteAsignado','borrarPlantillaPaquete','renderPaquetes','usarSesion'
];

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

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 10 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractTopLevelFunction(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — Paquetes y consumo de sesiones. */\n(function (global) {\n  'use strict';\n\n${blocks.map(item => item.text).join('\n\n')}\n\n  global.PanelPackages = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelPackages;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Paquetes no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/referrals.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró referrals.js como ancla de carga.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

fs.mkdirSync(path.dirname(modulePath), {recursive:true});
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 10 aplicada: ${names.length} funciones trasladadas a ${modulePath}.`);
