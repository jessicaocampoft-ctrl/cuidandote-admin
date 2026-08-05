import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE6B2_INVENTARIO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

function extractFunctions(text) {
  const found = [];
  const re = /\b(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match;
  while ((match = re.exec(text))) {
    const start = match.index;
    const open = text.indexOf('{', re.lastIndex);
    if (open < 0) continue;
    let depth = 0;
    let quote = null;
    let templateDepth = 0;
    let escaped = false;
    let lineComment = false;
    let blockComment = false;
    let end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (lineComment) { if (ch === '\n') lineComment = false; continue; }
      if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (ch === '\\') { escaped = true; continue; }
        if (quote === '`' && ch === '$' && next === '{') { templateDepth++; depth++; i++; continue; }
        if (quote === '`' && ch === '}' && templateDepth > 0) { templateDepth--; depth--; continue; }
        if (ch === quote && templateDepth === 0) quote = null;
        continue;
      }
      if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
      if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      const code = text.slice(start, end);
      const line = text.slice(0, start).split('\n').length;
      found.push({ name: match[2], code, line });
      re.lastIndex = end;
    }
  }
  return found;
}

const functions = extractFunctions(source);
const actionPattern = /action=([A-Za-z0-9_]+)/g;
const editTerms = /(?:edit|editar|actualiz|update|reprogram|resched|cancel|estado|status|atendid|no\s*asisti|delete|eliminar|modal.*cita|cita.*modal)/i;
const excludedNames = /^(?:renderAgenda|smartAgendaFilter|submitAdminBooking|submitAdminBookingMulti|saveManualPayment|verifyPayment|savePassport|renderPassport)/;

const candidates = functions.filter(fn => {
  const actions = [...fn.code.matchAll(actionPattern)].map(m => m[1]);
  const hasWriteAction = actions.some(a => /(?:update|edit|status|cancel|delete|attend|appointment|cita)/i.test(a));
  const hasEditTerm = editTerms.test(fn.name) || editTerms.test(fn.code);
  return !excludedNames.test(fn.name) && (hasWriteAction || hasEditTerm);
});

let md = '# Inventario de edición y estados de citas — Fase 6B2\n\n';
md += `- Funciones totales detectadas: ${functions.length}\n`;
md += `- Candidatas detectadas: ${candidates.length}\n\n`;
md += '## Resumen de candidatas\n\n';
for (const fn of candidates) {
  const actions = [...fn.code.matchAll(actionPattern)].map(m => m[1]);
  md += `- \`${fn.name}\` — línea ${fn.line}`;
  if (actions.length) md += ` — acciones: ${[...new Set(actions)].join(', ')}`;
  md += '\n';
}
md += '\n## Código exacto de candidatas\n\n';
for (const fn of candidates) {
  md += `### ${fn.name}\n\n\`\`\`javascript\n${fn.code}\n\`\`\`\n\n`;
}
fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario 6B2 generado con ${candidates.length} candidatas.`);
