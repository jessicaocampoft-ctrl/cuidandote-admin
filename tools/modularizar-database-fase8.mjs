import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'database.js');
const scriptTag = '<script src="js/modules/database.js"></script>';
const stateDeclaration = 'let _dbPacs = [];';
const names = [
  'initFormDB','renderBasedatos','renderReactivacion','limpiarFormDB','agregarPacienteDB',
  'checkDupDB','dbEditarPac','guardarPacienteDB','dbBorrarPac','dbOnOrigenChange',
  'dbReferidoFilter','recCard','recEnviado','recEmailEnviado','_updateReacBtn',
  'msgSemana4','msgSemana5','waRecordatorio'
];

function findBodyOpen(source, start, name) {
  const paramsOpen = source.indexOf('(', start);
  if (paramsOpen < 0) throw new Error(`No se encontró la apertura de parámetros de ${name}.`);
  let depth = 0, quote = '', escaped = false;
  for (let i = paramsOpen; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') {
      depth--;
      if (depth === 0) {
        let bodyOpen = i + 1;
        while (bodyOpen < source.length && /\s/.test(source[bodyOpen])) bodyOpen++;
        if (source[bodyOpen] !== '{') throw new Error(`No se encontró el cuerpo real de ${name}.`);
        return bodyOpen;
      }
    }
  }
  throw new Error(`No se pudo cerrar la lista de parámetros de ${name}.`);
}

function extractNamedFunction(source, name) {
  const regex = new RegExp(`(?:async\\s+)?function\\s+${name.replace(/[$]/g, '\\$&')}\\s*\\(`, 'g');
  const matches = [...source.matchAll(regex)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index;
  const open = findBodyOpen(source, start, name);
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
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
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

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 8 ya estaba aplicada.');
  process.exit(0);
}

const stateOccurrences = html.split(stateDeclaration).length - 1;
if (stateOccurrences !== 1) throw new Error(`_dbPacs debe tener una única declaración; encontradas: ${stateOccurrences}.`);

const blocks = names.map(name => extractNamedFunction(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — Base de datos de pacientes y reactivación. */\n(function (global) {\n  'use strict';\n\n  let _dbPacs = [];\n\n${blocks.map(x => x.text).join('\n\n')}\n\n  global.PanelDatabase = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelDatabase;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Base de datos no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

html = html.replace(stateDeclaration, '// Estado _dbPacs encapsulado en js/modules/database.js.');

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/team.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró team.js como ancla de carga.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

fs.mkdirSync(path.dirname(modulePath), {recursive:true});
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 8 aplicada: ${names.length} funciones y _dbPacs trasladados a ${modulePath}.`);
