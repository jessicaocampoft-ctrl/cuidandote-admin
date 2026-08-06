import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'monthly-report.js');
const scriptTag = '<script src="js/modules/monthly-report.js"></script>';
const names = ['abrirReporteMes','cerrarReporteMes','_secTitle','_rFila','_semCell','_buildReporteMes'];

function extractNamedFunction(source, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = source.indexOf('{', start);
  if (brace < 0) throw new Error(`No se encontró el cuerpo de ${name}.`);
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = brace; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const text = source.slice(start, i + 1).trimEnd();
        return { name, text, async:/^async\s+function/.test(text) };
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 14 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractNamedFunction(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — Reporte mensual. */\n(function (global) {\n  'use strict';\n\n${blocks.map(x => x.text).join('\n\n')}\n\n  global.PanelMonthlyReport = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelMonthlyReport;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Reporte mensual no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const count = html.split(item.text).length - 1;
  if (count !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${count}.`);
  html = html.replace(item.text, adapter);
}

if (!html.includes(scriptTag)) {
  const anchor = '<script src="js/modules/budget.js"></script>';
  if (!html.includes(anchor)) throw new Error('No se encontró budget.js como ancla.');
  html = html.replace(anchor, `${anchor}\n  ${scriptTag}`);
}

for (const shared of ['copiarReporteMes','imprimirReporteMes','copiarBriefClaude']) {
  if (!new RegExp(`function\\s+${shared}\\s*\\(`).test(html)) {
    throw new Error(`${shared} debe permanecer en index.html como consumidor compartido.`);
  }
  if (new RegExp(`function\\s+${shared}\\s*\\(`).test(moduleSource)) {
    throw new Error(`${shared} no pertenece al núcleo de monthly-report.js.`);
  }
}

for (const forbidden of ['fetch(', 'APPS_SCRIPT_URL', 'action=']) {
  if (moduleSource.includes(forbidden)) throw new Error(`monthly-report.js introdujo una dependencia de servidor no permitida: ${forbidden}`);
}

fs.mkdirSync(path.dirname(modulePath), { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 14 aplicada: ${names.length} funciones trasladadas a ${modulePath}.`);
