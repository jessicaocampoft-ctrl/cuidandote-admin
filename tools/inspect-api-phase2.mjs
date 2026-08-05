import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function extractFunction(name) {
  const pattern = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = pattern.exec(raw);
  if (!match) return null;
  const start = match.index;
  const open = raw.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let templateDepth = 0;
  for (let i = open; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') { templateDepth++; i++; continue; }
      if (quote === '`' && templateDepth > 0 && ch === '}') { templateDepth--; continue; }
      if (ch === quote && templateDepth === 0) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { name, start, end: i + 1, line: lineNumberAt(start), text: raw.slice(start, i + 1) };
    }
  }
  return null;
}

function context(index, radius = 8) {
  const line = lineNumberAt(index);
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  return {
    line,
    text: lines.slice(start - 1, end).map((value, offset) => `${start + offset}: ${value}`).join('\n')
  };
}

const output = ['# Inventario para modularización de configuración y API', '', `Archivo: \`${target}\``, ''];

const constants = [
  ...raw.matchAll(/\b(?:const|let|var)\s+(APPS_SCRIPT_URL|API_URL|BACKEND_URL|TOKEN)\s*=\s*[^;]+;/g)
];
output.push('## Configuración y estado encontrados', '');
if (!constants.length) output.push('No se encontraron constantes objetivo.', '');
for (const match of constants) {
  const found = context(match.index ?? 0, 5);
  output.push(`### ${match[1]} — línea ${found.line}`, '', '```javascript', found.text, '```', '');
}

const knownFunctions = [
  'fetchJsonWithTimeout',
  'fetchWithTimeout',
  'apiGet',
  'apiPost',
  'adminAction',
  'runAdminAction',
  'loadOperationsData',
  'loadData',
  'loadAllData',
  'api'
];
output.push('## Funciones conocidas de comunicación', '');
for (const name of knownFunctions) {
  const block = extractFunction(name);
  output.push(`### ${name}`, '');
  if (!block) output.push('No encontrada.', '');
  else output.push(`Línea ${block.line}.`, '', '```javascript', block.text, '```', '');
}

output.push('## Funciones que contienen fetch(', '');
const declarations = [...raw.matchAll(/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g)];
const fetchFunctions = [];
for (const declaration of declarations) {
  const block = extractFunction(declaration[1]);
  if (block && /\bfetch\s*\(/.test(block.text)) fetchFunctions.push(block);
}
const seen = new Set();
for (const block of fetchFunctions) {
  if (seen.has(block.name)) continue;
  seen.add(block.name);
  output.push(`### ${block.name} — línea ${block.line}`, '', '```javascript', block.text, '```', '');
}

output.push('## Referencias directas a Apps Script', '');
const directRefs = [...raw.matchAll(/APPS_SCRIPT_URL/g)];
output.push(`Total de referencias: ${directRefs.length}.`, '');
for (const [index, match] of directRefs.slice(0, 80).entries()) {
  const found = context(match.index ?? 0, 2);
  output.push(`### Referencia ${index + 1} — línea ${found.line}`, '', '```javascript', found.text, '```', '');
}

fs.writeFileSync('MODULARIZACION_FASE2_INVENTARIO.md', output.join('\n'), 'utf8');
console.log(`Inventario generado. Funciones con fetch: ${fetchFunctions.length}. Referencias a APPS_SCRIPT_URL: ${directRefs.length}.`);
