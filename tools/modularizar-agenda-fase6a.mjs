import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'agenda.js');
const scriptTag = '<script src="js/modules/agenda.js"></script>';
const specs = [
  { name:'goAgendaPatient', signature:'function goAgendaPatient(encodedName)', async:false },
  { name:'filtrarDia', signature:'function filtrarDia(dateStr)', async:false },
  { name:'smartAgendaFilter', signature:'function smartAgendaFilter(kind)', async:false },
  { name:'renderAgenda', signature:'function renderAgenda(keepPage = false)', async:false },
  { name:'clearFilters', signature:'function clearFilters()', async:false },
  { name:'filtrarHoy', signature:'function filtrarHoy()', async:false },
  { name:'calPrev', signature:'function calPrev()', async:false },
  { name:'calNext', signature:'function calNext()', async:false },
  { name:'calToday', signature:'function calToday()', async:false },
  { name:'renderCalendar', signature:'async function renderCalendar()', async:true }
];

function extractFunction(source, signature) {
  const start = source.indexOf(signature);
  if (start < 0) throw new Error(`No se encontró ${signature}.`);
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error(`No se encontró la apertura de ${signature}.`);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
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
      if (depth === 0) return { start, end:i + 1, text:source.slice(start, i + 1) };
    }
  }
  throw new Error(`No se pudo cerrar ${signature}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 6A ya estaba aplicada.');
  process.exit(0);
}

const blocks = specs.map(spec => ({ ...spec, block:extractFunction(html, spec.signature) }));
const moduleSource = `/* Cuidándote Fisioterapia — Agenda de consulta y calendario. */\n(function (global) {\n  'use strict';\n\n${blocks.map(x => x.block.text).join('\n\n')}\n\n  global.PanelAgenda = Object.freeze({\n${specs.map(x => `    ${x.name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelAgenda;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo de Agenda no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.block.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único; coincidencias: ${occurrences}.`);
  html = html.replace(item.block.text, adapter);
}

if (!html.includes(scriptTag)) {
  const bodyClose = html.lastIndexOf('</body>');
  if (bodyClose < 0) throw new Error('No se encontró </body>.');
  html = html.slice(0, bodyClose) + `  ${scriptTag}\n` + html.slice(bodyClose);
}

fs.mkdirSync(path.dirname(modulePath), { recursive:true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 6A aplicada: ${specs.length} funciones trasladadas a ${modulePath}.`);
