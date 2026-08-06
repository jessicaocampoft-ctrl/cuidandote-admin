import fs from 'node:fs';

const input = process.argv[2] || 'MODULARIZACION_FASE14_INVENTARIO_RESULTADO.md';
const output = process.argv[3] || 'MODULARIZACION_FASE14_PLAN_COMPACTO.md';
const text = fs.readFileSync(input, 'utf8');
const lines = text.split('\n');
const groups = [];
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].startsWith('### ')) continue;
  const section = lines[i].slice(4).trim();
  const stats = lines.slice(i + 1, i + 5).find(x => x.startsWith('- Funciones:')) || '';
  const m = stats.match(/Funciones:\s*(\d+)\.\s*Líneas aproximadas:\s*(\d+)/);
  if (!m) continue;
  groups.push({ section, functions:Number(m[1]), lines:Number(m[2]) });
}
const substantial = groups.filter(x => x.lines >= 40 || x.functions >= 3).sort((a,b) => b.lines - a.lines);
let md = '# Plan compacto después de la Fase 13\n\n';
md += `- Secciones sustanciales: **${substantial.length}**.\n`;
md += `- Líneas aproximadas dentro de esas secciones: **${substantial.reduce((s,x)=>s+x.lines,0)}**.\n\n`;
md += '## Secciones\n\n';
for (const g of substantial) md += `- ${g.section} — ${g.functions} funciones, ${g.lines} líneas.\n`;
fs.writeFileSync(output, md, 'utf8');
console.log(`Resumen compacto generado con ${substantial.length} secciones.`);
