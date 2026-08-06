import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
let source = fs.readFileSync(indexPath, 'utf8');

const groups = [
  {
    panel: 'PanelAdminProfileUX',
    file: 'js/modules/admin-profile-accessibility.js',
    functions: ['updateProfileCard','openCambiarPassword','cambiarPassword','initAdminUX2026','toggleDarkMode'],
    declarations: [],
  },
  {
    panel: 'PanelEmergencyManual',
    file: 'js/modules/emergency-manual.js',
    functions: ['renderEmergencia','toggleEmDim','toggleEmCard','handleEmStep','_persistEmStep','_updateEmProgress','loadAllEmSteps','markEmDone','resetEmSteps'],
    declarations: [],
  },
  {
    panel: 'PanelSurveyMeasurement',
    file: 'js/modules/survey-measurement.js',
    functions: ['getEncuestaStats','loadEncuestaStats','_renderEncuestaStatsUI','_rutinaKey','loadRutinaChecks','toggleRutinaCheck','resetRutina','resetRutinaGrupo'],
    declarations: ['RUTINA_IDS'],
  },
];

function assert(condition, message) { if (!condition) throw new Error(message); }

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  assert(matches.length === 1, `${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  for (let i = start; i < text.length; i++) {
    if (text[i] !== '}') continue;
    const body = text.slice(start, i + 1);
    try { new vm.Script(`(${body})`); return body.trimEnd(); } catch {}
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
    try { new vm.Script(body); return body.trimEnd(); } catch {}
  }
  throw new Error(`${name}: declaración sin cierre válido.`);
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

for (const group of groups) {
  const originals = group.functions.map(name => ({name, body: extractNamedFunction(source, name)}));
  const declarations = group.declarations.map(name => ({name, body: extractDeclaration(source, name)}));
  for (const item of originals) source = source.replace(item.body, adapter(item.name, item.body, group.panel));
  for (const item of declarations) source = source.replace(item.body, `// ${item.name} encapsulado en ${group.file}.`);
  const moduleSource = `(function (global) {\n'use strict';\n\n${declarations.map(item => item.body).join('\n\n')}${declarations.length ? '\n\n' : ''}${originals.map(item => item.body).join('\n\n')}\n\nglobal.${group.panel} = Object.freeze({\n    ${group.functions.join(',\n    ')}\n  });\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
  fs.mkdirSync('js/modules', {recursive: true});
  fs.writeFileSync(group.file, moduleSource);
}

const anchor = '<script src="js/modules/patient-records.js"></script>';
assert(source.includes(anchor), 'No se encontró el ancla de la Fase 23.');
for (const group of groups) assert(!source.includes(`<script src="${group.file}"></script>`), `${group.file} ya estaba cargado.`);
const tags = groups.map(group => `<script src="${group.file}"></script>`).join('\n');
source = source.replace(anchor, `${anchor}\n${tags}`);
fs.writeFileSync(indexPath, source);
console.log('Fase 24 aplicada: 22 funciones y RUTINA_IDS trasladados.');
