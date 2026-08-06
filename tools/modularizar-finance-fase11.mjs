import fs from 'node:fs';
import path from 'node:path';

const htmlPath = process.argv[2] || 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js','modules','finance.js');
const scriptTag = '<script src="js/modules/finance.js"></script>';
const names = [
  'renderFinanzas','calcCobradoMes','calcIngresoPaquetesMes','renderEgresosList',
  'getEgresos','saveEgresos','guardarEgreso','eliminarEgreso',
  'actualizarConceptosEgreso','renderEstructuraFinanciera','resRow'
];
const constants = ['CONCEPTOS_EGRESO','COSTOS_REFERENCIA','COSTO_BASE','COSTO_PE','COSTO_META'];

function extractFunction(source, name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const firstLineEnd = source.indexOf('\n', start);
  const firstLine = source.slice(start, firstLineEnd < 0 ? source.length : firstLineEnd);
  const opens = (firstLine.match(/{/g)||[]).length;
  const closes = (firstLine.match(/}/g)||[]).length;
  if (opens > 0 && opens === closes) return {name,text:firstLine.trimEnd(),async:/^async\s+function/.test(firstLine)};
  const closeRegex = /^}\s*$/gm;
  closeRegex.lastIndex = firstLineEnd < 0 ? start : firstLineEnd + 1;
  const close = closeRegex.exec(source);
  if (!close) throw new Error(`No se encontró el cierre de nivel superior de ${name}.`);
  const text = source.slice(start, close.index + close[0].length).trimEnd();
  return {name,text,async:/^async\s+function/.test(text)};
}

function extractConstantDeclaration(source, name) {
  const declarationName = ['COSTO_PE','COSTO_META'].includes(name) ? 'COSTO_BASE' : name;
  const escaped = declarationName.replace(/[$]/g,'\\$&');
  const matches = [...source.matchAll(new RegExp(`const\\s+${escaped}\\b`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe pertenecer a una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index;
  const end = source.indexOf(';', start);
  if (end < 0) throw new Error(`No se encontró el cierre de la declaración de ${name}.`);
  const declaration = source.slice(start, end + 1).trim();
  if (!new RegExp(`\\b${name}\\b`).test(declaration)) throw new Error(`${name} no aparece en su declaración esperada.`);
  return declaration;
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 11 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractFunction(html,name));
const declarations = [...new Set(constants.map(name => extractConstantDeclaration(html,name)))];
const moduleSource = `/* Cuidándote Fisioterapia — Núcleo financiero, ingresos y egresos. */\n(function (global) {\n  'use strict';\n\n${declarations.join('\n\n')}\n\n${blocks.map(item=>item.text).join('\n\n')}\n\n  global.PanelFinance = Object.freeze({\n${names.map(name=>`    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async?'async ':''}function ${item.name}(...args) {\n  const module = window.PanelFinance;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Finanzas no está disponible: ${item.name}');\n  }\n  return ${item.async?'await ':''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

for (const declaration of declarations) {
  const occurrences = html.split(declaration).length - 1;
  if (occurrences !== 1) throw new Error(`Una declaración financiera no es única al retirar; coincidencias: ${occurrences}.`);
  html = html.replace(declaration, '');
}

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/packages.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró packages.js como ancla de carga.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

for (const forbidden of [
  'renderKPITablero','renderMetricas','guardarMetaFin','previewMetaFin','renderPresupuestoMetas',
  'renderConveniosReport','exportarCSV','renderIngresosDetalle','renderCitasResumen','setModoIngresos',
  'registrarLead','loadEncuestaStats','saveManualPayment','renderPagos'
]) {
  if (moduleSource.includes(`function ${forbidden}(`) || moduleSource.includes(`async function ${forbidden}(`)) {
    throw new Error(`${forbidden} no pertenece a finance.js.`);
  }
}

fs.mkdirSync(path.dirname(modulePath),{recursive:true});
fs.writeFileSync(modulePath,moduleSource,'utf8');
fs.writeFileSync(htmlPath,(hadBom?'\uFEFF':'')+html,'utf8');
console.log(`Fase 11 aplicada: ${names.length} funciones y ${constants.length} constantes conceptuales trasladadas a ${modulePath}.`);
