import fs from 'node:fs';
import vm from 'node:vm';

const indexPath = process.argv[2] || 'index.html';
const followPath = 'js/modules/patient-follow-up.js';
const recoveryPath = 'js/modules/patient-recovery.js';
let source = fs.readFileSync(indexPath, 'utf8');

const followNames = [
  'toggleSegFiltro','segReagendo','segToggleR','segWaSent','segMarkWa','segLogAction',
  'limpiarLogSeguimiento','esDescargaMusc','esReadaptacion','readapZona','setReadapZona',
  'renderSeguimiento','_renderSegLista','_segCard','_segCardReadap','_renderSegLog',
  'exportarSeguimientoCSV',
];

const recoveryNames = [
  '_loadRec','_saveRec','_fmtCLP','_recMesActual','_initRecMesSel','renderRecuperaciones',
  'registrarRecuperacion','marcarPagado','desmarcarPago','eliminarRecuperacion',
  'pagarTodasComisiones','cargarInactivos','_recPreguntaDolencia','_renderRecMsgSelector',
  'renderInactivos','_waIconSvg','_recInactivoCard','preRellenaRecuperacion',
];

function functionStarts(text) {
  const re = /(?:^|\n)((?:async\s+)?function\s+[$A-Z_a-z][$\w]*\s*\()/g;
  return [...text.matchAll(re)].map(m => m.index + (m[0].startsWith('\n') ? 1 : 0));
}

function parses(code) {
  try {
    new vm.Script(`'use strict';\n${code}`);
    return true;
  } catch (_) {
    return false;
  }
}

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);

  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const boundary = functionStarts(text).find(pos => pos > start) ?? text.length;
  const segment = text.slice(start, boundary);

  for (let pos = segment.lastIndexOf('}'); pos >= 0; pos = segment.lastIndexOf('}', pos - 1)) {
    const body = segment.slice(0, pos + 1).trimEnd();
    if (!parses(body)) continue;
    if (!new RegExp(`^(?:async\\s+)?function\\s+${safe}\\s*\\(`).test(body)) continue;
    return {
      start,
      end: start + pos + 1,
      body,
      isAsync: /^async\s+function/.test(body),
    };
  }

  throw new Error(`${name}: no se encontró un cuerpo completo que JavaScript pueda validar.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);

  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const segment = text.slice(start);

  for (let pos = segment.indexOf(';'); pos >= 0; pos = segment.indexOf(';', pos + 1)) {
    const body = segment.slice(0, pos + 1).trimEnd();
    if (!parses(body)) continue;
    if (!new RegExp(`^(?:const|let)\\s+${safe}\\s*=`).test(body)) continue;
    return { start, end: start + pos + 1, body };
  }

  throw new Error(`${name}: no se encontró una declaración completa que JavaScript pueda validar.`);
}

function adapterFor(item, apiName, label) {
  const prefix = item.isAsync ? 'async ' : '';
  const call = item.isAsync
    ? `return await module.${item.name}(...args);`
    : `return module.${item.name}(...args);`;
  return `${prefix}function ${item.name}(...args) {\n  const module = window.${apiName};\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo ${label} no está disponible: ${item.name}');\n  }\n  ${call}\n}`;
}

if (
  source.includes('window.PanelPatientFollowUp') &&
  source.includes('window.PanelPatientRecovery') &&
  fs.existsSync(followPath) &&
  fs.existsSync(recoveryPath)
) {
  console.log('La Fase 17 ya estaba aplicada.');
  process.exit(0);
}

const followFunctions = followNames.map(name => ({ name, ...extractNamedFunction(source, name) }));
const recoveryFunctions = recoveryNames.map(name => ({ name, ...extractNamedFunction(source, name) }));
const followDeclarations = [{ name: '_segFiltros', ...extractDeclaration(source, '_segFiltros') }];
const recoveryDeclarations = [
  { name: 'REC_KEY', ...extractDeclaration(source, 'REC_KEY') },
  { name: '_recMensajes', ...extractDeclaration(source, '_recMensajes') },
];

const followSource = `(function(global) {\n  'use strict';\n\n${followDeclarations.map(x => x.body).join('\n\n')}\n\n${followFunctions.map(x => x.body).join('\n\n')}\n\n  global.PanelPatientFollowUp = Object.freeze({\n    ${followNames.join(',\n    ')}\n  });\n})(window);\n`;

const recoverySource = `(function(global) {\n  'use strict';\n\n${recoveryDeclarations.map(x => x.body).join('\n\n')}\n\n${recoveryFunctions.map(x => x.body).join('\n\n')}\n\n  global.PanelPatientRecovery = Object.freeze({\n    ${recoveryNames.join(',\n    ')}\n  });\n})(window);\n`;

const replacements = [
  ...followFunctions.map(item => ({
    ...item,
    replacement: adapterFor(item, 'PanelPatientFollowUp', 'Seguimiento de pacientes'),
  })),
  ...recoveryFunctions.map(item => ({
    ...item,
    replacement: adapterFor(item, 'PanelPatientRecovery', 'Recuperación de pacientes'),
  })),
  ...followDeclarations.map(item => ({ ...item, replacement: '' })),
  ...recoveryDeclarations.map(item => ({ ...item, replacement: '' })),
];

for (const item of replacements.sort((a, b) => b.start - a.start)) {
  source = source.slice(0, item.start) + item.replacement + source.slice(item.end);
}

const anchor = '<script src="js/modules/income-analysis.js"></script>';
const followTag = '<script src="js/modules/patient-follow-up.js"></script>';
const recoveryTag = '<script src="js/modules/patient-recovery.js"></script>';
if (!source.includes(followTag) || !source.includes(recoveryTag)) {
  if (!source.includes(anchor)) throw new Error('No se encontró el ancla income-analysis.js para cargar los módulos.');
  source = source.replace(anchor, `${anchor}\n${followTag}\n${recoveryTag}`);
}

fs.mkdirSync('js/modules', { recursive: true });
fs.writeFileSync(followPath, followSource, 'utf8');
fs.writeFileSync(recoveryPath, recoverySource, 'utf8');
fs.writeFileSync(indexPath, source, 'utf8');
console.log(`Fase 17 aplicada: ${followNames.length} funciones de seguimiento y ${recoveryNames.length} de recuperación trasladadas.`);
