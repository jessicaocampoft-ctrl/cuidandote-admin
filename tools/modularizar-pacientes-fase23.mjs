import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

const searchFunctions = ['globalSearch', 'searchPatient'];
const recordsFunctions = [
  'logChange', 'renderChangeLog', 'toggleChangeLog', 'clearChangeLog',
  'renderPacientes', 'verHistorial', 'verHistorialPac', '_renderHistorial',
  'exportarHistorialPaciente', 'editarPacienteIdx', 'editarPaciente',
  'guardarPaciente', 'borrarPaciente',
];
const recordsDeclarations = ['_pacs'];

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

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== ';') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(body);
      return body.trimEnd();
    } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

function adapter(name, original, panel, label) {
  const isAsync = /^async\s+function/.test(original);
  return `${isAsync ? 'async ' : ''}function ${name}(...args) {\n` +
    `  const module = window.${panel};\n` +
    `  if (!module || typeof module.${name} !== 'function') {\n` +
    `    throw new Error('El módulo ${label} no está disponible: ${name}');\n` +
    `  }\n` +
    `  return ${isAsync ? 'await ' : ''}module.${name}(...args);\n` +
    `}`;
}

function moveGroup(functionNames, declarationNames, panel, label) {
  const declarations = declarationNames.map(name => extractDeclaration(source, name));
  const functions = functionNames.map(name => ({name, body: extractNamedFunction(source, name)}));
  for (const declaration of declarations) source = source.replace(declaration, '');
  for (const item of functions) source = source.replace(item.body, adapter(item.name, item.body, panel, label));
  const api = functionNames.join(',\n    ');
  return `(function (global) {\n'use strict';\n\n${declarations.join('\n\n')}\n\n${functions.map(item => item.body).join('\n\n')}\n\nglobal.${panel} = Object.freeze({\n    ${api}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
}

const searchModule = moveGroup(searchFunctions, [], 'PanelPatientSearch', 'Búsqueda de pacientes');
const recordsModule = moveGroup(recordsFunctions, recordsDeclarations, 'PanelPatientRecords', 'Pacientes e historial');

const anchor = '<script src="js/modules/commissions.js"></script>';
assert(source.includes(anchor), 'No se encontró el ancla de la Fase 22.');
assert(!source.includes('js/modules/patient-search.js'), 'patient-search.js ya estaba cargado.');
assert(!source.includes('js/modules/patient-records.js'), 'patient-records.js ya estaba cargado.');
source = source.replace(
  anchor,
  `${anchor}\n<script src="js/modules/patient-search.js"></script>\n<script src="js/modules/patient-records.js"></script>`,
);

fs.mkdirSync('js/modules', {recursive: true});
fs.writeFileSync('js/modules/patient-search.js', searchModule);
fs.writeFileSync('js/modules/patient-records.js', recordsModule);
fs.writeFileSync(indexPath, source);
console.log(`Fase 23 aplicada: ${searchFunctions.length + recordsFunctions.length} funciones trasladadas.`);
