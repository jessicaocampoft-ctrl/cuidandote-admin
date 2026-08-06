import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE13_INVENTARIO_RESULTADO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

function extractFunctions(text) {
  const found = [];
  const re = /\b(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match;
  while ((match = re.exec(text))) {
    const start = match.index;
    const open = text.indexOf('{', re.lastIndex);
    if (open < 0) continue;
    let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false, end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i], next = text[i + 1];
      if (lineComment) { if (ch === '\n') lineComment = false; continue; }
      if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === '\\') { escaped = true; continue; }
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
      if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      const code = text.slice(start, end);
      const line = text.slice(0, start).split('\n').length;
      found.push({ name: match[2], code, line, async: Boolean(match[1]) });
      re.lastIndex = end;
    }
  }
  return found;
}

const functions = extractFunctions(source);
const namePattern = /(?:meta|presup|budget|costo|costos|estructura|proyec|objetivo|pm[A-Z_]|recalc)/i;
const idPattern = /(?:meta|presup|costo|estructura|proyec|pm[A-Z_])/i;
const excluded = /(?:passport|payment|pago|agenda|booking|appointment|professional|team|referral|referido|paquete|package)/i;
const candidates = functions.filter(fn => {
  const byName = namePattern.test(fn.name);
  const ids = [...fn.code.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  const byIds = ids.some(id => idPattern.test(id));
  return (byName || byIds) && !excluded.test(fn.name);
});

const names = new Set(functions.map(f => f.name));
function callsOf(code) {
  return [...new Set([...code.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1])
    .filter(n => names.has(n) && n !== 'function'))].sort();
}
function storageKeys(code) {
  return [...new Set([...code.matchAll(/(?:kvGet|kvSet|localStorage\.(?:getItem|setItem|removeItem))\s*\(\s*['"]([^'"]+)['"]/g)].map(m => m[1]))].sort();
}
function idsOf(code) {
  return [...new Set([...code.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]))].sort();
}

let md = '# Inventario — Fase 13 Metas y Presupuesto\n\n';
md += `- Funciones totales detectadas: **${functions.length}**.\n`;
md += `- Candidatas detectadas: **${candidates.length}**.\n\n`;
md += '## Candidatas\n\n';
for (const fn of candidates) {
  md += `### ${fn.name}\n\n`;
  md += `- Línea aproximada: ${fn.line}\n`;
  md += `- Llamadas internas: ${callsOf(fn.code).map(x => `\`${x}\``).join(', ') || 'ninguna'}\n`;
  md += `- Claves de almacenamiento: ${storageKeys(fn.code).map(x => `\`${x}\``).join(', ') || 'ninguna'}\n`;
  md += `- IDs: ${idsOf(fn.code).map(x => `\`${x}\``).join(', ') || 'ninguno'}\n\n`;
  md += '```javascript\n' + fn.code + '\n```\n\n';
}

const declarations = [...source.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*(?:\s*,\s*[A-Za-z_$][\w$]*)*)\s*=/g)]
  .map(m => ({ name:m[1], line:source.slice(0,m.index).split('\n').length, text:source.slice(m.index, source.indexOf('\n',m.index) < 0 ? source.length : source.indexOf('\n',m.index)) }))
  .filter(x => namePattern.test(x.name) || idPattern.test(x.text));
md += '## Declaraciones relacionadas\n\n';
for (const d of declarations) md += `- Línea ${d.line}: \`${d.text.trim()}\`\n`;

fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario Fase 13 generado con ${candidates.length} candidatas.`);
