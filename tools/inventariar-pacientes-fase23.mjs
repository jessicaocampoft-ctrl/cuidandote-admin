import fs from 'node:fs';

const src = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');
const out = process.argv[3] || 'INVENTARIO_FASE23_PACIENTES.md';

function range(startMarker, endMarker) {
  const start = src.indexOf(startMarker);
  const end = src.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) throw new Error(`No se pudo delimitar ${startMarker}`);
  return src.slice(start, end);
}

const sections = [
  {name:'Búsqueda global', text: range('function globalSearch(', 'let _agendaPage')},
  {name:'Buscador de pacientes', text: range('// ── BUSCADOR PACIENTE ──', '// Cerrar dropdown')},
  {name:'Historial de cambios', text: range('// ── HISTORIAL DE CAMBIOS ──', '// ── PACIENTES ──')},
  {name:'Pacientes e historial', text: range('// ── PACIENTES ──', '// ── BASE DE DATOS ──')},
];

const fnRegex = /(?:^|\n)((?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\()/g;
const declRegex = /(?:^|\n)((const|let)\s+([A-Za-z_$][\w$]*)\s*=)/g;
const lines = ['# Inventario Fase 23 — Pacientes, historial y búsqueda', ''];
let totalFunctions = 0;
let totalDeclarations = 0;
for (const section of sections) {
  const functions = [...section.text.matchAll(fnRegex)].map(m => m[2]);
  const declarations = [...section.text.matchAll(declRegex)].map(m => `${m[2]} ${m[3]}`);
  totalFunctions += functions.length;
  totalDeclarations += declarations.length;
  lines.push(`## ${section.name}`, '', `- Funciones: **${functions.length}**.`, `- Declaraciones: **${declarations.length}**.`, '');
  functions.forEach(name => lines.push(`- función \`${name}\``));
  declarations.forEach(item => lines.push(`- declaración \`${item}\``));
  lines.push('');
}
lines.splice(2, 0, `- Total funciones: **${totalFunctions}**.`, `- Total declaraciones: **${totalDeclarations}**.`, '');
fs.writeFileSync(out, lines.join('\n'));
console.log(`Inventario Fase 23: ${totalFunctions} funciones y ${totalDeclarations} declaraciones.`);
