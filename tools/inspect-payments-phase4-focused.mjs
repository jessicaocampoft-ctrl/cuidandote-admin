import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

const functionPattern = /\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
const declarations = [];
for (const match of raw.matchAll(functionPattern)) {
  const line = raw.slice(0, match.index ?? 0).split(/\r?\n/).length;
  declarations.push({ name: match[1], line });
}

const directNamePattern = /(?:pay|payment|pago|pagos|comprobante|proof|cuenta|account)/i;
const selected = declarations.filter(item => directNamePattern.test(item.name));

function context(line, before = 4, after = 55) {
  const start = Math.max(1, line - before);
  const end = Math.min(lines.length, line + after);
  return lines.slice(start - 1, end).map((text, index) => `${start + index}: ${text}`).join('\n');
}

const relevantIds = [...new Set([...raw.matchAll(/\bid\s*=\s*["']([^"']*(?:pay|pago|payment|comprobante|cuenta)[^"']*)["']/gi)].map(m => m[1]))].sort();
const onclicks = [...new Set([...raw.matchAll(/\b(?:onclick|onchange|oninput)\s*=\s*["']([^"']+)["']/gi)]
  .map(m => m[1])
  .filter(code => directNamePattern.test(code)))].sort();

const output = [
  '# Inventario estricto de Pagos — Fase 4',
  '',
  `- Funciones con nombre relacionado: ${selected.length}`,
  `- IDs relacionados: ${relevantIds.length}`,
  `- Handlers HTML relacionados: ${onclicks.length}`,
  '',
  '## Funciones',
  ''
];

for (const item of selected) {
  output.push(`### ${item.name} — línea ${item.line}`, '', '```javascript', context(item.line), '```', '');
}

output.push('## IDs', '', ...relevantIds.map(id => `- \`${id}\``), '', '## Handlers HTML', '', ...onclicks.map(code => `- \`${code}\``), '');

fs.writeFileSync('MODULARIZACION_FASE4_FOCAL.md', output.join('\n'), 'utf8');
console.log(`Inventario focal generado: ${selected.length} funciones.`);
