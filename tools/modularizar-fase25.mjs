import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

const utilityFunctions = [
  'esc',
  'today',
  'pad',
  'parsePrecio',
  'parsePrecioNum',
  'toDateStr',
  'normDate',
  'fmtDate',
  'fmtPeso',
  'toast',
  'openModal',
  'closeModal',
];
const storageFunctions = ['loadAdminKV','kvGet','kvSet','kvRemove','_flushKV'];
const storagePrivate = ['_gasKV','_kvDirty','_kvFlushTimer'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(`(${body})`);
      return body.trimEnd();
    } catch {}
  }
  throw new Error(`${name}: cuerpo sin cierre válido.`);
}

function adapter(name, original, panel) {
  const isAsync = /^async\s+function/.test(original);
  return `${isAsync ? 'async ' : ''}function ${name}(...args) {\n` +
    `  const module = window.${panel};\n` +
    `  if (!module || typeof module.${name} !== 'function') {\n` +
    `    throw new Error('El módulo ${panel} no está disponible: ${name}');\n` +
    `  }\n` +
    `  return ${isAsync ? 'await ' : ''}module.${name}(...args);\n` +
    `}`;
}

function buildModule(panel, bodies, names) {
  return `(function (global) {\n'use strict';\n\n${bodies.join('\n\n')}\n\nglobal.${panel} = Object.freeze({\n    ${names.join(',\n    ')}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
}

// 1. Utilidades generales: extraer las implementaciones y dejar adaptadores públicos.
const utilityOriginals = utilityFunctions.map(name => ({name, body: extractNamedFunction(source, name)}));
for (const item of utilityOriginals) {
  source = source.replace(item.body, adapter(item.name, item.body, 'PanelUtils'));
}

// 2. Almacenamiento sincronizado: encapsular estado, funciones y descarga al cerrar.
const storageStartMarker = '// ── KV SYNC — datos persistentes sincronizados en todos los dispositivos via GAS ──';
const storageEndMarker = '\nlet TOKEN  = sessionStorage.getItem(\'adminToken\') || \'\';';
const storageStart = source.indexOf(storageStartMarker);
const storageEnd = source.indexOf(storageEndMarker, storageStart);
assert(storageStart >= 0 && storageEnd > storageStart, 'No se encontró el bloque KV completo.');
const storageBlock = source.slice(storageStart, storageEnd).trimEnd();
for (const name of storageFunctions) {
  assert(storageBlock.includes(`function ${name}`) || storageBlock.includes(`async function ${name}`), `Falta ${name} en el bloque KV.`);
}
const outsideStorage = source.slice(0, storageStart) + source.slice(storageEnd);
for (const name of storagePrivate) {
  assert(!new RegExp(`\\b${name}\\b`).test(outsideStorage), `${name} se usa fuera del bloque KV y no puede encapsularse.`);
}
const storageOriginals = storageFunctions.map(name => ({name, body: extractNamedFunction(storageBlock, name)}));
const storageAdapters = storageOriginals.map(item => adapter(item.name, item.body, 'PanelStorage')).join('\n\n');
source = source.slice(0, storageStart) +
  '// ── KV SYNC modularizado ──\n' + storageAdapters + '\n' +
  source.slice(storageEnd);

fs.mkdirSync('js/modules', {recursive: true});
fs.writeFileSync('js/modules/shared-utils.js', buildModule('PanelUtils', utilityOriginals.map(x => x.body), utilityFunctions));
fs.writeFileSync('js/modules/shared-storage.js', `(function (global) {\n'use strict';\n\n${storageBlock}\n\nglobal.PanelStorage = Object.freeze({\n    ${storageFunctions.join(',\n    ')}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`);

// 3. Cargar primero las dependencias compartidas y luego todos los módulos de dominio.
const anchor = '<script src="js/modules/agenda.js"></script>';
assert(source.includes(anchor), 'No se encontró el primer módulo de dominio para insertar las utilidades.');
assert(!source.includes('js/modules/shared-utils.js'), 'shared-utils.js ya estaba cargado.');
assert(!source.includes('js/modules/shared-storage.js'), 'shared-storage.js ya estaba cargado.');
source = source.replace(anchor,
  '<script src="js/modules/shared-utils.js"></script>\n' +
  '<script src="js/modules/shared-storage.js"></script>\n' + anchor
);

fs.writeFileSync(indexPath, source);
console.log(`Fase 25 aplicada: ${utilityFunctions.length} utilidades y ${storageFunctions.length} funciones KV trasladadas.`);
