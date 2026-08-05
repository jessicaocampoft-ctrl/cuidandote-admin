import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function context(line, radius = 12) {
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  return lines.slice(start - 1, end).map((text, index) => `${start + index}: ${text}`).join('\n');
}

function addMatches(output, title, regex) {
  output.push(`## ${title}`, '');
  const matches = [...raw.matchAll(regex)];
  if (!matches.length) {
    output.push('No se encontraron coincidencias.', '');
    return;
  }
  matches.forEach((match, index) => {
    const line = lineNumberAt(match.index ?? 0);
    output.push(`### Coincidencia ${index + 1} — línea ${line}`, '', '```html', context(line), '```', '');
  });
}

const output = ['# Contexto de fallos del navegador automático', ''];
output.push('## Encabezado y política de seguridad', '', '```html', lines.slice(0, 90).map((text, i) => `${i + 1}: ${text}`).join('\n'), '```', '');
addMatches(output, 'Función renderMetricas', /function\s+renderMetricas\s*\(/g);
addMatches(output, 'Usos de now en renderizado financiero', /\bnow\b/g);
addMatches(output, "Llamadas a showView('citas')", /showView\(\s*["']citas["']\s*\)/g);
addMatches(output, 'Contenedores de vista relacionados con citas y agenda', /id=["']view-(?:citas|agenda|nueva)["']/g);
addMatches(output, 'Biblioteca QR y creación de códigos', /qrcode|QRCode/gi);
addMatches(output, 'Función openPago', /function\s+openPago\s*\(/g);
addMatches(output, 'Función fillPaymentSelectors', /function\s+fillPaymentSelectors\s*\(/g);

fs.writeFileSync('AUDIT_BROWSER_FAILURES.md', output.join('\n'), 'utf8');
console.log('AUDIT_BROWSER_FAILURES.md generado correctamente.');
