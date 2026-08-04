import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function context(lineNumber, radius = 18) {
  const start = Math.max(1, lineNumber - radius);
  const end = Math.min(lines.length, lineNumber + radius);
  return lines.slice(start - 1, end).map((line, i) => `${start + i}: ${line}`).join('\n');
}

function addMatches(output, title, regex, radius = 18) {
  output.push(`## ${title}`, '');
  const matches = [...raw.matchAll(regex)];
  if (!matches.length) {
    output.push('No se encontraron coincidencias.', '');
    return;
  }
  const seen = new Set();
  matches.forEach((match, index) => {
    const line = lineNumberAt(match.index ?? 0);
    if (seen.has(line)) return;
    seen.add(line);
    output.push(`### Coincidencia ${index + 1} — línea ${line}`, '', '```html', context(line, radius), '```', '');
  });
}

function extractFunction(name) {
  const pattern = new RegExp(`\\bfunction\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = pattern.exec(raw);
  if (!match) return null;
  const start = match.index;
  let depth = 0;
  let quote = '';
  let escaped = false;
  let templateDepth = 0;
  for (let i = raw.indexOf('{', start); i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') { templateDepth++; i++; continue; }
      if (quote === '`' && templateDepth > 0 && ch === '}') { templateDepth--; continue; }
      if (ch === quote && templateDepth === 0) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') { const end = raw.indexOf('\n', i + 2); i = end < 0 ? raw.length : end; continue; }
    if (ch === '/' && next === '*') { const end = raw.indexOf('*/', i + 2); i = end < 0 ? raw.length : end + 1; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1, text: raw.slice(start, i + 1), line: lineNumberAt(start) };
    }
  }
  return null;
}

const output = ['# Detalle de fallos funcionales encontrados por Chrome', '', `Archivo: \`${target}\``, ''];

for (const fn of ['renderMetricas', 'showView', 'openPago', 'fillPaymentSelectors']) {
  output.push(`## Función ${fn}`, '');
  const block = extractFunction(fn);
  if (!block) output.push('No se encontró la función.', '');
  else output.push(`Comienza en línea ${block.line}.`, '', '```javascript', block.text, '```', '');
}

addMatches(output, 'Todos los usos literales de la vista citas', /(?:showView\s*\(\s*["']citas["']\s*\)|["']citas["'])/g, 14);
addMatches(output, 'Contenedores de vistas', /id\s*=\s*["']view-[^"']+["']/g, 2);
addMatches(output, 'Política Content-Security-Policy', /Content-Security-Policy/gi, 5);
addMatches(output, 'Carga de librerías QR', /<script[^>]+(?:qrcode|qr-code)[^>]*>|QRCode\s*\(/gi, 12);
addMatches(output, 'Uso de la variable now dentro de métricas', /\bnow\b/g, 5);
addMatches(output, 'Selectores de pago y cita', /payCitaId|operationsData\.citas|allData\.citas/gi, 8);

fs.writeFileSync('AUDIT_BROWSER_DETAILS.md', output.join('\n'), 'utf8');
console.log('AUDIT_BROWSER_DETAILS.md generado correctamente.');
