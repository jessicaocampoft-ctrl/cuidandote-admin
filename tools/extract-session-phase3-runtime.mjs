import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function extractFunction(name) {
  const re = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = re.exec(raw);
  if (!match) return null;
  return extractBalanced(match.index, raw.indexOf('{', match.index), name);
}

function extractBalanced(start, braceStart, label) {
  let depth = 0;
  let quote = '';
  let escaped = false;
  let templateDepth = 0;
  for (let i = braceStart; i < raw.length; i++) {
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
      if (depth === 0) {
        return {
          label,
          start,
          end: i + 1,
          line: lineNumberAt(start),
          text: raw.slice(start, i + 1)
        };
      }
    }
  }
  return null;
}

function extractListener(eventName) {
  const marker = `window.addEventListener('${eventName}'`;
  let start = raw.indexOf(marker);
  if (start < 0) {
    const markerDouble = `window.addEventListener("${eventName}"`;
    start = raw.indexOf(markerDouble);
  }
  if (start < 0) return null;
  const arrow = raw.indexOf('=>', start);
  const brace = raw.indexOf('{', arrow);
  const block = extractBalanced(start, brace, `window ${eventName}`);
  if (!block) return null;
  let end = block.end;
  while (end < raw.length && /[\s;\)]/.test(raw[end])) end++;
  block.end = end;
  block.text = raw.slice(start, end);
  return block;
}

const names = [
  'logoutProfessional',
  'loadProfessionalAgenda',
  '_resetActivity',
  '_runUrlRepairIfRequested'
];

const blocks = names.map(extractFunction).filter(Boolean);
const domReady = extractListener('DOMContentLoaded');
const visibility = (() => {
  const marker = "document.addEventListener('visibilitychange'";
  const start = raw.indexOf(marker);
  if (start < 0) return null;
  const arrow = raw.indexOf('=>', start);
  const brace = raw.indexOf('{', arrow);
  const block = extractBalanced(start, brace, 'document visibilitychange');
  if (!block) return null;
  let end = block.end;
  while (end < raw.length && /[\s;\)]/.test(raw[end])) end++;
  block.end = end;
  block.text = raw.slice(start, end);
  return block;
})();

const output = ['# Runtime exacto de sesiones — Fase 3', ''];
for (const block of [...blocks, visibility, domReady].filter(Boolean)) {
  output.push(
    `## ${block.label} — línea ${block.line}`,
    '',
    '```javascript',
    block.text,
    '```',
    ''
  );
}

fs.writeFileSync('MODULARIZACION_FASE3_RUNTIME.md', output.join('\n'), 'utf8');
console.log(`Runtime extraído: ${[...blocks, visibility, domReady].filter(Boolean).length} bloques.`);
