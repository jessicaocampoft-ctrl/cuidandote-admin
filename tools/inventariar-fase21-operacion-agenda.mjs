import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'INVENTARIO_FASE21_OPERACION_AGENDA.md';
const src = fs.readFileSync(file, 'utf8');
const lines = src.split(/\r?\n/);
const keyword = /(wait|espera|conven|evento|dispon|bloque|horario|ausen|multi|multiple|m[uú]ltiple|recurrent|serie|agenda.*varias|varias.*cita)/i;

function findBodyBrace(start) {
  let paren = 0, quote = '', esc = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === quote) quote = '';
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '(') paren++;
    else if (c === ')') paren--;
    else if (c === '{' && paren === 0) return i;
  }
  return -1;
}

function findEnd(body) {
  let depth = 0, quote = '', esc = false;
  for (let i = body; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === quote) quote = '';
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return i + 1;
  }
  return -1;
}

const functions = [];
const re = /^function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
for (const m of src.matchAll(re)) {
  const body = findBodyBrace(m.index);
  const end = body >= 0 ? findEnd(body) : -1;
  if (end < 0) continue;
  const code = src.slice(m.index, end);
  if (!keyword.test(m[1]) && !keyword.test(code)) continue;
  const line = src.slice(0, m.index).split('\n').length;
  const calls = [...code.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)]
    .map(x => x[1]).filter(x => x !== m[1]);
  functions.push({ name: m[1], line, calls: [...new Set(calls)].sort(), chars: code.length });
}

const declarations = [];
lines.forEach((line, i) => {
  if (/^(?:let|const|var)\s+/.test(line) && keyword.test(line)) declarations.push({ line: i + 1, text: line.trim() });
});

let md = '# Inventario Fase 21 — Operación de agenda\n\n';
md += `- Funciones candidatas: **${functions.length}**.\n`;
md += `- Declaraciones candidatas: **${declarations.length}**.\n\n`;
md += '## Funciones\n\n';
for (const f of functions) {
  md += `### ${f.name}\n\n- Línea: ${f.line}\n- Tamaño: ${f.chars} caracteres\n- Llamadas: ${f.calls.length ? '`' + f.calls.join('`, `') + '`' : 'ninguna'}\n\n`;
}
md += '## Declaraciones\n\n';
for (const d of declarations) md += `- Línea ${d.line}: \`${d.text.replace(/`/g, '\\`')}\`\n`;
fs.writeFileSync(out, md);
console.log(`Inventario creado: ${functions.length} funciones, ${declarations.length} declaraciones`);
