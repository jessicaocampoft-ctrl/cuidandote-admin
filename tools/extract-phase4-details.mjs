import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const lines = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);

function range(start, end) {
  return lines.slice(start - 1, end).map((line, index) => `${start + index}: ${line}`).join('\n');
}

const sections = [
  ['Encuestas y NPS', 3788, 3835],
  ['Interfaz del dictado por voz', 2745, 2835],
  ['Formulario de Base de datos', 5070, 5185],
  ['Interfaz de meta mensual y presupuesto', 4285, 4380],
  ['Guardado de presupuesto y actualización de meta', 16280, 16405]
];

const output = ['# Detalles exactos para correcciones de fase 4', '', `Archivo: \`${target}\``, ''];
for (const [title, start, end] of sections) {
  output.push(`## ${title}`, '', '```html', range(start, end), '```', '');
}

fs.writeFileSync('AUDIT_PHASE4_DETAILS.md', output.join('\n'), 'utf8');
console.log('AUDIT_PHASE4_DETAILS.md generado correctamente.');
