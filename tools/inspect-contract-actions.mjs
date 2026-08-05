import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);
const names = ['agenda', 'basedatos', 'finanzas', 'recuperacion'];

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function context(lineNumber, radius = 8) {
  const start = Math.max(1, lineNumber - radius);
  const end = Math.min(lines.length, lineNumber + radius);
  return lines.slice(start - 1, end).map((line, i) => `${start + i}: ${line}`).join('\n');
}

const output = ['# Contexto de acciones sin ruta aparente', ''];
for (const name of names) {
  output.push(`## ${name}`, '');
  const regex = new RegExp(`\\baction\\s*:\\s*["']${name}["']`, 'g');
  const matches = [...raw.matchAll(regex)];
  if (!matches.length) {
    output.push('No se encontraron coincidencias.', '');
    continue;
  }
  for (const [index, match] of matches.entries()) {
    const line = lineNumberAt(match.index ?? 0);
    output.push(`### Coincidencia ${index + 1} — línea ${line}`, '', '```html', context(line), '```', '');
  }
}

fs.writeFileSync('AUDIT_CONTRACT_CONTEXT.md', output.join('\n'), 'utf8');
console.log('AUDIT_CONTRACT_CONTEXT.md generado correctamente.');
