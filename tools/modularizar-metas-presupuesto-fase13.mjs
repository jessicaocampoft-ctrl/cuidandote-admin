import fs from 'node:fs';
import path from 'node:path';

const htmlPath = process.argv[2] || 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'goals-budget.js');
const scriptTag = '<script src="js/modules/goals-budget.js"></script>';
const functionNames = [
  'getMeta','actualizarMetaBarra','previewMeta','guardarMeta','previewMetaFin','guardarMetaFin',
  'getCostosEstructura','saveCostosEstructura','calcTotalCostos','reloadMetas',
  '_toggleEditCostos','_leerCamposCostos','_recalcCostos','_guardarCostos',
  'renderPresupuestoMetas','pmRecalc','pmGuardarCostos','pmGuardarKPIs'
];
const sharedGlobals = [
  'COSTOS_DEFAULTS','META_SESIONES_SEMANA','META_VENTAS_MES','META_VENTAS_SEMANA',
  'META_NPS','META_ENCUESTAS','META_CANCELACION_PCT','META_RETENCION_PCT'
];

function extractFunction(source, name) {
  const escaped = name.replace(/[$]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const firstLineEnd = source.indexOf('\n', start);
  const firstLine = source.slice(start, firstLineEnd < 0 ? source.length : firstLineEnd);
  const opens = (firstLine.match(/{/g) || []).length;
  const closes = (firstLine.match(/}/g) || []).length;
  if (opens > 0 && opens === closes) return { name, text:firstLine.trimEnd(), async:/^async\s+function/.test(firstLine) };
  const closeRegex = /^}\s*$/gm;
  closeRegex.lastIndex = firstLineEnd < 0 ? start : firstLineEnd + 1;
  const close = closeRegex.exec(source);
  if (!close) throw new Error(`No se encontró el cierre de nivel superior de ${name}.`);
  const text = source.slice(start, close.index + close[0].length).trimEnd();
  return { name, text, async:/^async\s+function/.test(text) };
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 13 ya estaba aplicada.');
  process.exit(0);
}

const blocks = functionNames.map(name => extractFunction(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — Metas, presupuesto y costos configurables. */\n(function (global) {\n  'use strict';\n\n${blocks.map(item => item.text).join('\n\n')}\n\n  global.PanelGoalsBudget = Object.freeze({\n${functionNames.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelGoalsBudget;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Metas y Presupuesto no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/kpi.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró kpi.js como ancla de carga.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

for (const name of sharedGlobals) {
  const pattern = new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`);
  if (!pattern.test(html)) throw new Error(`La declaración compartida ${name} desapareció de index.html.`);
  if (pattern.test(moduleSource)) throw new Error(`La declaración compartida ${name} no debe duplicarse en goals-budget.js.`);
}

for (const forbidden of [
  'renderFinanzas','renderEstructuraFinanciera','renderKPITablero','renderKPIGuia',
  'renderMetricas','renderComisiones','renderPagos','saveManualPayment','openPago',
  'renderIngresosDetalle','renderConveniosReport','loadEncuestaStats','getLeads','renderAgenda'
]) {
  if (moduleSource.includes(`function ${forbidden}(`) || moduleSource.includes(`async function ${forbidden}(`)) {
    throw new Error(`${forbidden} no pertenece a goals-budget.js.`);
  }
}

fs.mkdirSync(path.dirname(modulePath), { recursive:true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(htmlPath, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 13 aplicada: ${functionNames.length} funciones trasladadas a ${modulePath}.`);
