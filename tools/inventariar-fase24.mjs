import fs from 'node:fs';
import vm from 'node:vm';

const src = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');
const out = process.argv[3] || 'INVENTARIO_FASE24.md';
const keywords = /emerg|encuesta|nps|perfil|profile|acces|a11y|contraste|fuente|tema|dark|medici|medir|rutina|rango|escala/i;
const items = [];
const fnRegex = /(?:^|\n)((?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\()/g;
for (const match of src.matchAll(fnRegex)) {
  const start = match.index + (match[0].startsWith('\n') ? 1 : 0);
  let body = '';
  for (let i = start; i < src.length; i++) {
    if (src[i] !== '}') continue;
    const candidate = src.slice(start, i + 1);
    try { new vm.Script(`(${candidate})`); body = candidate; break; } catch {}
  }
  if (!body) continue;
  const context = src.slice(Math.max(0, start - 220), start);
  if (!keywords.test(match[2] + '\n' + context + '\n' + body.slice(0, 800))) continue;
  const line = src.slice(0, start).split('\n').length;
  const heading = (context.match(/\/\/[^\n]*$/m) || [''])[0].trim();
  items.push({name: match[2], async: /^async/.test(match[1]), line, heading});
}
const declarations = [];
for (const match of src.matchAll(/(?:^|\n)((?:const|let)\s+([A-Za-z_$][\w$]*)\s*=)/g)) {
  const start = match.index + (match[0].startsWith('\n') ? 1 : 0);
  const context = src.slice(Math.max(0, start - 180), start + 250);
  if (!keywords.test(match[2] + '\n' + context)) continue;
  declarations.push({name: match[2], line: src.slice(0, start).split('\n').length});
}
const lines = ['# Inventario Fase 24', '', `- Funciones candidatas: **${items.length}**.`, `- Declaraciones candidatas: **${declarations.length}**.`, '', '## Funciones', ''];
for (const item of items) lines.push(`- \`${item.name}\` — línea ${item.line} — ${item.async ? 'async' : 'sync'}${item.heading ? ` — ${item.heading}` : ''}`);
lines.push('', '## Declaraciones', '');
for (const item of declarations) lines.push(`- \`${item.name}\` — línea ${item.line}`);
fs.writeFileSync(out, lines.join('\n') + '\n');
console.log(`Inventario: ${items.length} funciones y ${declarations.length} declaraciones.`);
