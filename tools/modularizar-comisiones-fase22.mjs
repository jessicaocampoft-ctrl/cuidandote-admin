import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

const functions = [
  '_comisGetConfig', 'saveComisConfig', 'toggleComisConfig', '_initComisMesSel',
  '_comisMesVal', '_comisSemanasLlenas', '_comisReactivaciones', '_comisReventas',
  '_comisVentasCruzadas', '_comisCruzadaAsign', 'setCruzadaAsign', '_comisManualReact',
  '_comisSetManualReact', 'addManualReactivacion', 'removeManualReactivacion',
  'marcarComisionPagada', 'desmarcarComisionPagada', 'renderComisiones',
];

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

function adapter(name, original) {
  const isAsync = /^async\s+function/.test(original);
  return `${isAsync ? 'async ' : ''}function ${name}(...args) {\n` +
    `  const module = window.PanelCommissions;\n` +
    `  if (!module || typeof module.${name} !== 'function') {\n` +
    `    throw new Error('El módulo Comisiones no está disponible: ${name}');\n` +
    `  }\n` +
    `  return ${isAsync ? 'await ' : ''}module.${name}(...args);\n` +
    `}`;
}

const originals = functions.map(name => ({name, body: extractNamedFunction(source, name)}));
for (const item of originals) {
  source = source.replace(item.body, adapter(item.name, item.body));
}

const api = functions.join(',\n    ');
const moduleSource = `(function (global) {\n'use strict';\n\n${originals.map(item => item.body).join('\n\n')}\n\nglobal.PanelCommissions = Object.freeze({\n    ${api}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;

const anchor = '<script src="js/modules/events-agreements.js"></script>';
assert(source.includes(anchor), 'No se encontró el ancla de la Fase 21.');
assert(!source.includes('js/modules/commissions.js'), 'commissions.js ya estaba cargado.');
source = source.replace(anchor, `${anchor}\n<script src="js/modules/commissions.js"></script>`);

fs.mkdirSync('js/modules', {recursive: true});
fs.writeFileSync('js/modules/commissions.js', moduleSource);
fs.writeFileSync(indexPath, source);
console.log(`Fase 22 aplicada: ${functions.length} funciones de comisiones trasladadas.`);
