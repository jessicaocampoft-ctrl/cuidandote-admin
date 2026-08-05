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
    let depth = 0;
    let quote = '';
    let escaped = false;
    let end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === '\\') { escaped = true; continue; }
        if (ch === quote) quote = '';
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === '/' && next === '/') {
        const nl = text.indexOf('\n', i + 2);
        i = nl < 0 ? text.length : nl;
        continue;
      }
      if (ch === '/' && next === '*') {
        const close = text.indexOf('*/', i + 2);
        i = close < 0 ? text.length : close + 1;
        continue;
      }
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      const before = text.slice(0, start);
      found.push({
        name: match[2],
        line: before.split('\n').length,
        code: text.slice(start, end)
      });
      re.lastIndex = end;
    }
  }
  return found;
}

const functions = extractFunctions(source);
const namePattern = /(passport|pasaporte|pas[A-Z_]|sello|tokenPas|progresoPas)/i;
const bodyPattern = /(passport[A-Z_]|pasaporte|pas[A-Z_]|pasLink|pasEditor|pasSellos|guardar progreso|regenerar token)/i;
const selected = functions.filter(fn => namePattern.test(fn.name) || bodyPattern.test(fn.code));

const ids = [...new Set([...source.matchAll(/\bid=["']([^"']*(?:pasaporte|passport|pas[A-Z]|pas-)[^"']*)["']/gi)].map(m => m[1]))].sort();
const actions = [...new Set([
  ...[...source.matchAll(/action\s*:\s*["']([^"']*(?:passport|pasaporte)[^"']*)["']/gi)].map(m => m[1]),
  ...[...source.matchAll(/[?&]action=([^&"'`]*(?:passport|pasaporte)[^&"'`]*)/gi)].map(m => m[1])
])].sort();
const handlers = [...new Set([...source.matchAll(/on(?:click|change|input)=["']([^"']*(?:passport|pasaporte|Pasaporte|pas[A-Z]|sello)[^"']*)["']/g)].map(m => m[1]))].sort();

let out = '# Inventario estricto del Pasaporte — Fase 5\n\n';
out += `- Funciones relacionadas: ${selected.length}\n`;
out += `- IDs relacionados: ${ids.length}\n`;
out += `- Acciones API relacionadas: ${actions.length}\n`;
out += `- Handlers HTML relacionados: ${handlers.length}\n\n`;
out += '## Acciones API\n\n' + (actions.length ? actions.map(x => `- \`${x}\``).join('\n') : '- Ninguna detectada') + '\n\n';
out += '## IDs\n\n' + (ids.length ? ids.map(x => `- \`${x}\``).join('\n') : '- Ninguno detectado') + '\n\n';
out += '## Handlers HTML\n\n' + (handlers.length ? handlers.map(x => `- \`${x}\``).join('\n') : '- Ninguno detectado') + '\n\n';
out += '## Funciones\n\n';
for (const fn of selected) {
  out += `### ${fn.name} — línea ${fn.line}\n\n\`\`\`javascript\n${fn.code}\n\`\`\`\n\n`;
}

fs.writeFileSync('MODULARIZACION_FASE5_INVENTARIO.md', out, 'utf8');
console.log(`Inventario Fase 5: ${selected.length} funciones, ${ids.length} IDs y ${actions.length} acciones.`);
