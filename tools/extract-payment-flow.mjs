import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineAt(index) {
  return raw.slice(0, Math.max(0, index)).split(/\r?\n/).length;
}

function context(line, radius = 35) {
  const start = Math.max(1, line - radius);
  const end = Math.min(lines.length, line + radius);
  return lines.slice(start - 1, end).map((text, i) => `${start + i}: ${text}`).join('\n');
}

function extractFunctionAt(index) {
  const before = raw.slice(0, index);
  const starts = [...before.matchAll(/(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g)];
  if (!starts.length) return null;
  const match = starts[starts.length - 1];
  const start = match.index;
  const braceStart = raw.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = braceStart; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const nl = raw.indexOf('\n', i + 2);
      i = nl < 0 ? raw.length : nl;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = raw.indexOf('*/', i + 2);
      i = end < 0 ? raw.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        return { name: match[1], line: lineAt(start), text: raw.slice(start, i + 1) };
      }
    }
  }
  return null;
}

const patterns = [
  ['Texto del botón', /Confirmar pago y autorizar/gi],
  ['Selector de cita', /payCitaId/g],
  ['Guardado de pago', /savePayment/g],
  ['Verificación de pago', /verifyPayment/g],
  ['Estados de pago', /PAGO_APROBADO|PAGO_RECHAZADO|COMPROBANTE_RECIBIDO/g],
  ['Funciones relacionadas con pago', /(?:async\s+)?function\s+[A-Za-z_$][\w$]*(?:Pago|Payment|pay)[A-Za-z_$]*\s*\(/gi]
];

const output = ['# Contexto exacto del flujo de pagos', '', `Archivo: \`${target}\``, ''];
const functions = new Map();

for (const [title, regex] of patterns) {
  output.push(`## ${title}`, '');
  const matches = [...raw.matchAll(regex)];
  output.push(`Coincidencias: ${matches.length}`, '');
  matches.slice(0, 30).forEach((match, idx) => {
    const line = lineAt(match.index ?? 0);
    output.push(`### Coincidencia ${idx + 1} — línea ${line}`, '', '```html', context(line), '```', '');
    const fn = extractFunctionAt(match.index ?? 0);
    if (fn) functions.set(`${fn.name}:${fn.line}`, fn);
  });
}

output.push('## Funciones completas implicadas', '');
if (!functions.size) output.push('No se identificaron funciones completas.', '');
for (const fn of functions.values()) {
  output.push(`### ${fn.name} — línea ${fn.line}`, '', '```javascript', fn.text, '```', '');
}

fs.writeFileSync('PAYMENT_FLOW_CONTEXT.md', output.join('\n'), 'utf8');
console.log(`PAYMENT_FLOW_CONTEXT.md generado con ${functions.size} funciones.`);
