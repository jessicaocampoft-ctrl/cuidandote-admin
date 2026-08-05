import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE7_INVENTARIO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const lines = source.split('\n');

const declarations = [];
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^\s*(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/);
  if (!match) continue;
  declarations.push({name:match[2], async:!!match[1], line:i+1});
}

const start = declarations.find(fn => fn.name === 'byIdFrom');
const end = declarations.find(fn => fn.name === 'professionalSignout');
if (!start || !end || end.line < start.line) throw new Error('No se pudo delimitar el bloque continuo de Equipo clínico.');
const blockFunctions = declarations.filter(fn => fn.line >= start.line && fn.line <= end.line);

let md = '# Inventario completo — Fase 7 Equipo clínico\n\n';
md += `- Declaraciones totales detectadas: ${declarations.length}\n`;
md += `- Inicio del bloque: línea ${start.line}\n`;
md += `- Fin del bloque: línea ${end.line}\n`;
md += `- Funciones dentro del bloque: ${blockFunctions.length}\n\n`;
md += '## Todas las funciones del bloque\n\n';
for (const fn of blockFunctions) md += `- \`${fn.name}\` — línea ${fn.line}${fn.async ? ' — async' : ''}\n`;
md += '\n## Contexto alrededor de cada función\n\n';
for (const fn of blockFunctions) {
  const from = Math.max(0, fn.line - 2);
  const to = Math.min(lines.length, fn.line + 16);
  md += `### ${fn.name}\n\n\`\`\`javascript\n${lines.slice(from, to).join('\n')}\n\`\`\`\n\n`;
}
fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario Fase 7 generado: ${blockFunctions.length} funciones en el bloque.`);
