import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function context(lineNumber, radius = 10) {
  const start = Math.max(1, lineNumber - radius);
  const end = Math.min(lines.length, lineNumber + radius);
  return lines.slice(start - 1, end).map((line, i) => `${start + i}: ${line}`).join('\n');
}

const tokens = [
  'kpiLoadBtn',
  'dbServicioMain',
  'dbServicioPlan',
  'dbServicio',
  'voiceStatus',
  'voiceTranscript',
  'voiceHelp',
  'pm_kpi_ventas_mes'
];

const output = ['# Contexto exacto para fase 3', '', `Archivo: \`${target}\``, ''];

for (const token of tokens) {
  output.push(`## ${token}`, '');
  const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = [...raw.matchAll(regex)];
  if (!matches.length) {
    output.push('No se encontraron coincidencias.', '');
    continue;
  }
  matches.forEach((match, index) => {
    const line = lineNumberAt(match.index ?? 0);
    output.push(`### Coincidencia ${index + 1} — línea ${line}`, '', '```html', context(line), '```', '');
  });
}

fs.writeFileSync('AUDIT_PHASE3.md', output.join('\n'), 'utf8');
console.log('AUDIT_PHASE3.md generado correctamente.');
