import fs from 'node:fs';

const target = process.argv[2] || 'audit-backend.js';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineAt(index) {
  return raw.slice(0, Math.max(0, index)).split(/\r?\n/).length;
}
function context(line, radius = 55) {
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  return lines.slice(start - 1, end).map((text, i) => `${start + i}: ${text}`).join('\n');
}

const patterns = [
  ['Ruta savePayment', /(?:p|d)\.action\s*===\s*["']savePayment["']/g],
  ['Ruta verifyPayment', /(?:p|d)\.action\s*===\s*["']verifyPayment["']/g],
  ['Estado COMPROBANTE_RECIBIDO', /COMPROBANTE_RECIBIDO/g],
  ['Estado PAGO_APROBADO', /PAGO_APROBADO/g],
  ['Retorno de identificador', /\bid\s*:/g]
];

const output = ['# Contrato real del backend para pagos', '', `Archivo: \`${target}\``, ''];
for (const [title, regex] of patterns) {
  const matches = [...raw.matchAll(regex)];
  output.push(`## ${title}`, '', `Coincidencias: ${matches.length}`, '');
  matches.slice(0, 20).forEach((match, i) => {
    const line = lineAt(match.index ?? 0);
    output.push(`### Coincidencia ${i + 1} — línea ${line}`, '', '```javascript', context(line), '```', '');
  });
}

fs.writeFileSync('BACKEND_PAYMENT_CONTEXT.md', output.join('\n'), 'utf8');
console.log('BACKEND_PAYMENT_CONTEXT.md generado.');
