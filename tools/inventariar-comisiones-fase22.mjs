import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'INVENTARIO_FASE22_COMISIONES.md';
const src = fs.readFileSync(file, 'utf8');
const marker = '//  MÓDULO DE COMISIONES';
const markerAt = src.indexOf(marker);
if (markerAt < 0) throw new Error('No se encontró el marcador del módulo de comisiones.');
const start = src.lastIndexOf('// ═', markerAt);
const scriptEnd = src.indexOf('</script>', markerAt);
if (start < 0 || scriptEnd < 0) throw new Error('No se pudieron delimitar las comisiones.');
const block = src.slice(start, scriptEnd);

const functions = [];
const fnRegex = /(?:^|\n)((?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\()/g;
for (const match of block.matchAll(fnRegex)) {
  const localIndex = match.index + (match[0].startsWith('\n') ? 1 : 0);
  functions.push({
    name: match[2],
    async: match[1].startsWith('async'),
    line: src.slice(0, start + localIndex).split('\n').length,
  });
}

const declarations = [];
const declRegex = /(?:^|\n)((const|let)\s+([A-Za-z_$][\w$]*)\s*=)/g;
for (const match of block.matchAll(declRegex)) {
  const localIndex = match.index + (match[0].startsWith('\n') ? 1 : 0);
  declarations.push({
    name: match[3],
    kind: match[2],
    line: src.slice(0, start + localIndex).split('\n').length,
  });
}

const report = [
  '# Inventario Fase 22 — Comisiones',
  '',
  `- Funciones: **${functions.length}**.`,
  `- Declaraciones: **${declarations.length}**.`,
  '',
  '## Funciones',
  '',
  ...functions.map(item => `- \`${item.name}\` — línea ${item.line} — ${item.async ? 'async' : 'sync'}`),
  '',
  '## Declaraciones',
  '',
  ...declarations.map(item => `- \`${item.name}\` — ${item.kind} — línea ${item.line}`),
  '',
];
fs.writeFileSync(out, report.join('\n'));
console.log(`Inventario creado: ${functions.length} funciones y ${declarations.length} declaraciones.`);
