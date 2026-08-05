import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const lines = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);

function range(start, end) {
  return lines.slice(start - 1, end).map((line, index) => `${start + index}: ${line}`).join('\n');
}

const output = [
  '# Contexto exacto para fase 2',
  '',
  '## Login profesional',
  '',
  '```html',
  range(7045, 7125),
  '```',
  '',
  '## Login administrativo',
  '',
  '```html',
  range(7210, 7295),
  '```',
  '',
  '## Generación y copia del texto de gestión',
  '',
  '```html',
  range(13970, 14025),
  '```',
  '',
  '## Utilidad de copia',
  '',
  '```html',
  range(14080, 14120),
  '```'
].join('\n');

fs.writeFileSync('AUDIT_PHASE2.md', output, 'utf8');
console.log('AUDIT_PHASE2.md generado correctamente.');
