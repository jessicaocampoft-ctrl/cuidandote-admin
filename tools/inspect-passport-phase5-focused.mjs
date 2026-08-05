import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const source = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');

function extractFunctions(text) {
  const found = [];
  const re = /(?:^|\n)(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = re.exec(text))) {
    const start = match.index + (match[0].startsWith('\n') ? 1 : 0);
    const open = text.indexOf('{', start);
    let depth = 0, quote = '', escaped = false, end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i], next = text[i + 1];
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === '\\') { escaped = true; continue; }
        if (ch === quote) quote = '';
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === '/' && next === '/') { const nl = text.indexOf('\n', i + 2); i = nl < 0 ? text.length : nl; continue; }
      if (ch === '/' && next === '*') { const close = text.indexOf('*/', i + 2); i = close < 0 ? text.length : close + 1; continue; }
      if (ch === '{') depth++;
      if (ch === '}' && --depth === 0) { end = i + 1; break; }
    }
    if (end > start) {
      found.push({ name: match[2], line: text.slice(0, start).split('\n').length, code: text.slice(start, end) });
      re.lastIndex = end;
    }
  }
  return found;
}

const functions = extractFunctions(source);
const direct = functions.filter(fn => /(passport|pasaporte|sello|pasCurrent|pasAdmin|pasProgress|pasLink|pasSearch)/i.test(fn.name));

let out = '# Inventario focal del Pasaporte — Fase 5\n\n';
out += `- Funciones por nombre: ${direct.length}\n\n`;
out += '## Nombres y líneas\n\n';
out += direct.map(fn => `- \`${fn.name}\` — línea ${fn.line}`).join('\n') + '\n\n';
out += '## Código exacto\n\n';
for (const fn of direct) out += `### ${fn.name}\n\n\`\`\`javascript\n${fn.code}\n\`\`\`\n\n`;

fs.writeFileSync('MODULARIZACION_FASE5_FOCAL.md', out, 'utf8');
console.log(`Inventario focal: ${direct.length} funciones.`);
