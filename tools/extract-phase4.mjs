import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function context(lineNumber, radius = 12) {
  const start = Math.max(1, lineNumber - radius);
  const end = Math.min(lines.length, lineNumber + radius);
  return lines.slice(start - 1, end).map((line, i) => `${start + i}: ${line}`).join('\n');
}

const searches = [
  ['Encuestas y NPS', /Cargar encuestas|kpiLoad|encuestas|NPS/gi],
  ['Controles del formulario de Base de datos', /dbOnServiceChange|dbOnPlanChange|dbServicioMain|dbServicioPlan|dbServicio|dbSearch/gi],
  ['Interfaz de voz', /voiceBtn|voicePanel|voiceStatus|voiceTranscript|voiceHelp|Dictar cita por voz/gi],
  ['Meta mensual y presupuesto', /pm_kpi_ventas_mes|kpi_ventas_mes|meta_ventas_mes|META_VENTAS_MES/gi]
];

const output = ['# Contexto exacto para fase 4', '', `Archivo: \`${target}\``, ''];

for (const [title, regex] of searches) {
  output.push(`## ${title}`, '');
  const seenLines = new Set();
  const matches = [...raw.matchAll(regex)];
  for (const match of matches) {
    const line = lineNumberAt(match.index ?? 0);
    if (seenLines.has(line)) continue;
    seenLines.add(line);
    output.push(`### Línea ${line}`, '', '```html', context(line), '```', '');
  }
  if (!seenLines.size) output.push('No se encontraron coincidencias.', '');
}

fs.writeFileSync('AUDIT_PHASE4.md', output.join('\n'), 'utf8');
console.log('AUDIT_PHASE4.md generado correctamente.');
