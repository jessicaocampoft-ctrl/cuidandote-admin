import fs from 'node:fs';

const file = process.argv[2] || 'index.html';
const out = process.argv[3] || 'MODULARIZACION_FASE7_INVENTARIO.md';
const source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const lines = source.split('\n');

const exact = new Set([
  'byIdFrom','assignmentFor','professionalName','loadTeamData','activeProfessionals',
  'renderEquipo','abrirNuevoPro','abrirEditarPro','savePro','resetProPassword','togglePro','deletePro',
  'abrirAsignarPro','guardarAsignacion','autorizarAsignacion','revocarAsignacion',
  'marcarPagoProfesional','abrirDetalleProfesional','cerrarDetalleProfesional',
  'renderProfessionalAgenda','loadProfessionalAgenda','markProfessionalAttended',
  'openProfessionalIssue','submitProfessionalIssue','renderTeamOperations'
]);
const prefix = /^(?:team|professional|pro[A-Z]|renderPro|loadPro|savePro|resetPro|togglePro|deletePro|abrir.*Pro|guardarAsignacion|autorizarAsignacion|revocarAsignacion|marcarPagoProfesional)/;

const declarations = [];
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^\s*(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/);
  if (!match) continue;
  declarations.push({name:match[2], async:!!match[1], line:i+1});
}

const candidates = declarations.filter(fn => exact.has(fn.name) || prefix.test(fn.name));
let md = '# Inventario estricto — Fase 7 Equipo clínico\n\n';
md += `- Declaraciones totales detectadas: ${declarations.length}\n`;
md += `- Candidatas estrictas: ${candidates.length}\n\n`;
md += '## Funciones candidatas\n\n';
for (const fn of candidates) md += `- \`${fn.name}\` — línea ${fn.line}${fn.async ? ' — async' : ''}\n`;
md += '\n## Contexto alrededor de cada función\n\n';
for (const fn of candidates) {
  const start = Math.max(0, fn.line - 2);
  const end = Math.min(lines.length, fn.line + 18);
  md += `### ${fn.name}\n\n\`\`\`javascript\n${lines.slice(start, end).join('\n')}\n\`\`\`\n\n`;
}
fs.writeFileSync(out, md, 'utf8');
console.log(`Inventario Fase 7 generado: ${candidates.length} candidatas.`);
