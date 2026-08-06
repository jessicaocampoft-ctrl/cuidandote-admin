import fs from 'node:fs';

const indexPath = process.argv[2] || 'index.html';
const modulePath = 'js/modules/income-analysis.js';
let source = fs.readFileSync(indexPath, 'utf8');

const names = [
  'setModoIngresos',
  '_ingFmt',
  '_ingFmtLabel',
  '_ingFmtMes',
  'renderCitasResumen',
  'renderIngresosDetalle',
  '_analisisSemana',
  '_analisisMes',
  '_renderAnalisis',
];

function extractNamedFunction(text, name) {
  const safe = name.replace(/[$]/g, '\\$&');
  const matches = [...text.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${safe}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const brace = text.indexOf('{', start);
  if (brace < 0) throw new Error(`${name}: no se encontró el cuerpo.`);
  let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
  for (let i = brace; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
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
      if (depth === 0) return { start, end: i + 1, body: text.slice(start, i + 1) };
    }
  }
  throw new Error(`${name}: cuerpo sin cierre.`);
}

if (source.includes('window.PanelIncomeAnalysis') && fs.existsSync(modulePath)) {
  console.log('La Fase 16 ya estaba aplicada.');
  process.exit(0);
}

const extracted = names.map(name => ({ name, ...extractNamedFunction(source, name) }));
const moduleSource = `(function(global) {\n  'use strict';\n\n${extracted.map(x => x.body).join('\n\n')}\n\n  global.PanelIncomeAnalysis = Object.freeze({\n    ${names.join(',\n    ')}\n  });\n})(window);\n`;

for (const item of [...extracted].sort((a,b) => b.start - a.start)) {
  const adapter = `function ${item.name}(...args) {\n  const module = window.PanelIncomeAnalysis;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Ingresos y análisis no está disponible: ${item.name}');\n  }\n  return module.${item.name}(...args);\n}`;
  source = source.slice(0, item.start) + adapter + source.slice(item.end);
}

const tag = '<script src="js/modules/income-analysis.js"></script>';
const anchor = '<script src="js/modules/smart-metrics.js"></script>';
if (!source.includes(tag)) {
  if (!source.includes(anchor)) throw new Error('No se encontró el ancla smart-metrics.js para cargar el módulo.');
  source = source.replace(anchor, `${anchor}\n${tag}`);
}

fs.mkdirSync('js/modules', { recursive: true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(indexPath, source, 'utf8');
console.log(`Fase 16 aplicada: ${names.length} funciones trasladadas a ${modulePath}.`);
