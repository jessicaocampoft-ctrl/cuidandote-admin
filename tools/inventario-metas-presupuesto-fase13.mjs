import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE13_INVENTARIO_RESULTADO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const lines = source.split('\n');

const declarations = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/);
  if (m) declarations.push({ name:m[2], line:i + 1, async:Boolean(m[1]), index:i });
}

const namePattern = /(?:meta|presup|budget|costo|costos|estructura|proyec|objetivo|^pm[A-Z_]|recalc)/i;
const excluded = /(?:passport|payment|pago|agenda|booking|appointment|professional|team|referral|referido|paquete|package|paciente)/i;
const candidates = declarations.filter(d => namePattern.test(d.name) && !excluded.test(d.name));

function excerptFor(decl) {
  const next = declarations.find(d => d.index > decl.index);
  const end = Math.min(next ? next.index : lines.length, decl.index + 220);
  return lines.slice(decl.index, end).join('\n').trimEnd();
}
function callsOf(text) {
  const names = new Set(declarations.map(d => d.name));
  return [...new Set([...text.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]).filter(n => names.has(n) && n !== 'function'))].sort();
}
function storageKeys(text) {
  return [...new Set([...text.matchAll(/(?:kvGet|kvSet|kvRemove|localStorage\.(?:getItem|setItem|removeItem))\s*\(\s*['"]([^'"]+)['"]/g)].map(m => m[1]))].sort();
}
function idsOf(text) {
  return [...new Set([...text.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]))].sort();
}

let md = '# Inventario corregido — Fase 13 Metas y Presupuesto\n\n';
md += `- Declaraciones de función reales: **${declarations.length}**.\n`;
md += `- Candidatas por nombre: **${candidates.length}**.\n`;
md += '- Método: declaraciones al inicio de línea; ignora texto dentro de plantillas HTML.\n\n';

md += '## Funciones candidatas\n\n';
for (const decl of candidates) {
  const code = excerptFor(decl);
  md += `### ${decl.name}\n\n`;
  md += `- Línea: ${decl.line}\n`;
  md += `- Llamadas internas: ${callsOf(code).map(x => `\`${x}\``).join(', ') || 'ninguna'}\n`;
  md += `- Almacenamiento: ${storageKeys(code).map(x => `\`${x}\``).join(', ') || 'ninguno'}\n`;
  md += `- IDs: ${idsOf(code).map(x => `\`${x}\``).join(', ') || 'ninguno'}\n\n`;
  md += '```javascript\n' + code + '\n```\n\n';
}

md += '## Todas las declaraciones relacionadas por línea\n\n';
for (let i = 0; i < lines.length; i++) {
  const text = lines[i].trim();
  if (!text || text.length > 500) continue;
  if (/(?:metaMensual|presupuesto|costosEstructura|COSTOS_|COSTO_|pm_|metaInput|metaBar)/i.test(text)) {
    md += `- L${i + 1}: \`${text.replace(/`/g, '\\`')}\`\n`;
  }
}

fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario corregido Fase 13: ${candidates.length} candidatas.`);
