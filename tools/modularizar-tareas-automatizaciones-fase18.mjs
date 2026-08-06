import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
const modulePath = 'js/modules/operations-automation.js';
let source = fs.readFileSync(indexPath, 'utf8');

const names = [
  '_checkAutoAtendida',
  'marcarTodasAtendidas',
  '_checkCobrosPendientes',
  '_checkAlertaSemanFloja',
  'getTplTarea',
  'guardarPlantillaTarea',
  'initTareasConfig',
  '_tareaKey',
  '_tareaEstado',
  '_tareaFechaTipo',
  'generarTareas',
  'toggleTareaFiltro',
  'renderTareas',
  '_renderTareasLista',
  'marcarTareaWA',
  'marcarTareaCompletada',
  'posponerTarea',
  'omitirTarea',
];

const privateNames = ['_TPL_DEFAULT', '_tareaFiltros'];

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(`(${body})`);
      return { start, end: i + 1, body, isAsync: /^async\s+function/.test(body) };
    } catch {}
  }
  throw new Error(`${name}: cuerpo sin cierre válido.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== ';') continue;
    const body = text.slice(start, i + 1);
    try {
      new vm.Script(body);
      return { start, end: i + 1, body };
    } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
}

function adapterFor(item) {
  const prefix = item.isAsync ? 'async ' : '';
  const call = item.isAsync
    ? `return await module.${item.name}(...args);`
    : `return module.${item.name}(...args);`;
  return `${prefix}function ${item.name}(...args) {\n  const module = window.PanelOperationsAutomation;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Tareas y automatizaciones no está disponible: ${item.name}');\n  }\n  ${call}\n}`;
}

if (source.includes('window.PanelOperationsAutomation') && fs.existsSync(modulePath)) {
  console.log('La Fase 18 ya estaba aplicada.');
  process.exit(0);
}

const functions = names.map(name => ({ name, ...extractNamedFunction(source, name) }));
const declarations = privateNames.map(name => ({ name, ...extractDeclaration(source, name) }));

const moduleSource = `(function(global) {\n  'use strict';\n\n${declarations.map(x => x.body).join('\n\n')}\n\n${functions.map(x => x.body).join('\n\n')}\n\n  global.PanelOperationsAutomation = Object.freeze({\n    ${names.join(',\n    ')}\n  });\n})(window);\n`;

const replacements = [
  ...functions.map(item => ({ ...item, replacement: adapterFor(item) })),
  ...declarations.map(item => ({ ...item, replacement: '' })),
];

for (const item of replacements.sort((a, b) => b.start - a.start)) {
  source = source.slice(0, item.start) + item.replacement + source.slice(item.end);
}

const anchor = '<script src="js/modules/patient-recovery.js"></script>';
const tag = '<script src="js/modules/operations-automation.js"></script>';
if (!source.includes(tag)) {
  if (!source.includes(anchor)) throw new Error('No se encontró el ancla patient-recovery.js para cargar el módulo.');
  source = source.replace(anchor, `${anchor}\n${tag}`);
}

fs.mkdirSync('js/modules', { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(indexPath, source, 'utf8');
console.log(`Fase 18 aplicada: ${names.length} funciones trasladadas a ${modulePath}.`);
