import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const lines = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);

const ranges = [
  ['Bloque principal de Pagos', 6788, 7075],
  ['Renderizado y acciones posteriores de Pagos', 7076, 7310],
  ['Apertura de Pagos desde Agenda', 16970, 17035]
];

const output = ['# Bloques exactos del módulo de Pagos — Fase 4', ''];
for (const [title, start, end] of ranges) {
  output.push(`## ${title}`, '', '```javascript');
  output.push(lines.slice(start - 1, end).map((line, index) => `${start + index}: ${line}`).join('\n'));
  output.push('```', '');
}

fs.writeFileSync('MODULARIZACION_FASE4_BLOQUES.md', output.join('\n'), 'utf8');
console.log('Bloques exactos de Pagos extraídos.');
