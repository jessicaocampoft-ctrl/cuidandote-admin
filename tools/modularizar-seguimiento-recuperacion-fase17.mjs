import fs from 'node:fs';

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

function skipQuoted(text, start, quote) {
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === quote) return i + 1;
  }
  return text.length;
}

function skipLineComment(text, start) {
  const end = text.indexOf('\n', start + 2);
  return end < 0 ? text.length : end;
}

function skipBlockComment(text, start) {
  const end = text.indexOf('*/', start + 2);
  return end < 0 ? text.length : end + 2;
}

function skipTemplateExpression(text, start) {
  let depth = 1;
  for (let i = start; i < text.length;) {
    const ch = text[i], next = text[i + 1];
    if (ch === "'" || ch === '"') { i = skipQuoted(text, i, ch); continue; }
    if (ch === '`') { i = skipTemplate(text, i); continue; }
    if (ch === '/' && next === '/') { i = skipLineComment(text, i); continue; }
    if (ch === '/' && next === '*') { i = skipBlockComment(text, i); continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return text.length;
}

function skipTemplate(text, start) {
  for (let i = start + 1; i < text.length;) {
    const ch = text[i], next = text[i + 1];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '`') return i + 1;
    if (ch === '$' && next === '{') { i = skipTemplateExpression(text, i + 2); continue; }
    i++;
  }
  return text.length;
}

function skipSpecial(text, i) {
  const ch = text[i], next = text[i + 1];
  if (ch === "'" || ch === '"') return skipQuoted(text, i, ch);
  if (ch === '`') return skipTemplate(text, i);
  if (ch === '/' && next === '/') return skipLineComment(text, i);
  if (ch === '/' && next === '*') return skipBlockComment(text, i);
  return i;
}

function findBodyBrace(text, start) {
  const openParen = text.indexOf('(', start);
  if (openParen < 0) return -1;
  let depth = 0;
  for (let i = openParen; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return text.indexOf('{', i + 1);
    }
    i++;
  }
  return -1;
}

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = findBodyBrace(text, start);
  if (brace < 0) throw new Error(`${name}: no se encontró el cuerpo.`);
  let depth = 0;
  for (let i = brace; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        const body = text.slice(start, i + 1);
        return { start, end: i + 1, body, isAsync: /^async\s+function/.test(body) };
      }
    }
    i++;
  }
  throw new Error(`${name}: cuerpo sin cierre.`);
}

function extractDeclaration(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:const|let)\\s+${safe}\\s*=)`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const eq = text.indexOf('=', start);
  let paren = 0, brace = 0, bracket = 0;
  for (let i = eq + 1; i < text.length;) {
    const skipped = skipSpecial(text, i);
    if (skipped !== i) { i = skipped; continue; }
    const ch = text[i];
    if (ch === '(') paren++;
    else if (ch === ')') paren--;
    else if (ch === '{') brace++;
    else if (ch === '}') brace--;
    else if (ch === '[') bracket++;
    else if (ch === ']') bracket--;
    else if (ch === ';' && paren === 0 && brace === 0 && bracket === 0) {
      return { start, end: i + 1, body: text.slice(start, i + 1) };
    }
    i++;
  }
  throw new Error(`${name}: declaración sin cierre.`);
}

function adapterFor(item, apiName, label) {
  const prefix = item.isAsync ? 'async ' : '';
  const call = item.isAsync ? `return await module.${item.name}(...args);` : `return module.${item.name}(...args);`;
  return `${prefix}function ${item.name}(...args) {\n  const module = window.${apiName};\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo ${label} no está disponible: ${item.name}');\n  }\n  ${call}\n}`;
}

if (source.includes('window.PanelPatientFollowUp') && source.includes('window.PanelPatientRecovery') && fs.existsSync(followPath) && fs.existsSync(recoveryPath)) {
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
  ...followFunctions.map(item => ({ ...item, replacement: adapterFor(item, 'PanelPatientFollowUp', 'Seguimiento de pacientes') })),
  ...recoveryFunctions.map(item => ({ ...item, replacement: adapterFor(item, 'PanelPatientRecovery', 'Recuperación de pacientes') })),
  ...followDeclarations.map(item => ({ ...item, replacement: '' })),
  ...recoveryDeclarations.map(item => ({ ...item, replacement: '' })),
];

for (const item of replacements.sort((a,b) => b.start - a.start)) {
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
