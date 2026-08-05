import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function extractFunctionAt(start) {
  const open = raw.indexOf('{', start);
  if (open < 0) return null;
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < raw.length; i++) {
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
      const end = raw.indexOf('\n', i + 2);
      i = end < 0 ? raw.length : end;
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
      if (depth === 0) return raw.slice(start, i + 1);
    }
  }
  return null;
}

const declarations = [];
for (const match of raw.matchAll(/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g)) {
  const text = extractFunctionAt(match.index ?? 0);
  if (!text) continue;
  declarations.push({ name: match[1], line: lineNumberAt(match.index ?? 0), text });
}

const paymentTerms = /pago|payment|comprobante|autoriza|cuenta|transferencia|verifyPayment|savePayment|payCita|PAGO_/i;
const functions = declarations.filter(fn => paymentTerms.test(fn.name) || paymentTerms.test(fn.text));

const ids = [...new Set([...raw.matchAll(/\bid\s*=\s*["']([^"']*(?:pay|pago|payment|comprobante|cuenta)[^"']*)["']/gi)].map(m => m[1]))].sort();
const handlers = [...new Set([...raw.matchAll(/\b(?:onclick|onchange|oninput)\s*=\s*["'][^"']*?([A-Za-z_$][\w$]*)\s*\(/gi)].map(m => m[1]).filter(name => paymentTerms.test(name)))].sort();
const actions = [...new Set([...raw.matchAll(/\baction\s*:\s*["']([^"']*(?:Payment|Pago|payment|pago)[^"']*)["']/g)].map(m => m[1]))].sort();
const queryActions = [...new Set([...raw.matchAll(/[?&]action=([^&"'`]*(?:Payment|Pago|payment|pago)[^&"'`]*)/g)].map(m => m[1]))].sort();

const stateMatches = [...new Set([...raw.matchAll(/\b(?:PAGO_APROBADO|PAGO_RECHAZADO|COMPROBANTE_RECIBIDO|PENDIENTE_PAGO|NO_REQUIERE_PAGO|REEMBOLSADO)\b/g)].map(m => m[0]))].sort();

const output = [
  '# Inventario del módulo de Pagos — Fase 4',
  '',
  `Archivo: \`${target}\``,
  '',
  `- Funciones relacionadas: ${functions.length}`,
  `- IDs relacionados: ${ids.length}`,
  `- Acciones API relacionadas: ${actions.length + queryActions.length}`,
  `- Estados canónicos detectados: ${stateMatches.length}`,
  '',
  '## Estados canónicos',
  '',
  ...stateMatches.map(state => `- \`${state}\``),
  '',
  '## IDs del módulo',
  '',
  ...ids.map(id => `- \`${id}\``),
  '',
  '## Acciones API',
  '',
  ...[...new Set([...actions, ...queryActions])].map(action => `- \`${action}\``),
  '',
  '## Funciones relacionadas',
  ''
];

for (const fn of functions) {
  output.push(`### ${fn.name} — línea ${fn.line}`, '', '```javascript', fn.text, '```', '');
}

output.push('## Handlers HTML detectados', '', ...handlers.map(name => `- \`${name}\``), '');

fs.writeFileSync('MODULARIZACION_FASE4_INVENTARIO.md', output.join('\n'), 'utf8');
console.log(`Inventario de Pagos generado: ${functions.length} funciones, ${ids.length} IDs.`);
