import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const source = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = source.split('\n');

function lineOf(marker) {
  const index = source.indexOf(marker);
  if (index < 0) throw new Error(`No se encontró el marcador: ${marker}`);
  return source.slice(0, index).split('\n').length;
}

function block(from, to) {
  const start = Math.max(1, from);
  const end = Math.min(lines.length, to);
  return lines.slice(start - 1, end).map((line, i) => `${start + i}: ${line}`).join('\n');
}

const helperLine = lineOf('function pasaporteLink(nombre)');
const mainLine = lineOf('async function generarLinkPasaporte()');
const finalLine = lineOf('async function reactivarPasaporte()');

let finalEnd = finalLine;
let depth = 0;
let started = false;
for (let i = finalLine - 1; i < lines.length; i++) {
  for (const ch of lines[i]) {
    if (ch === '{') { depth++; started = true; }
    if (ch === '}') depth--;
  }
  if (started && depth === 0) { finalEnd = i + 1; break; }
}

const helperStart = Math.max(1, helperLine - 35);
const helperEnd = helperLine + 45;
const mainStart = Math.max(1, mainLine - 180);
const mainEnd = finalEnd + 25;

const out = `# Bloques completos del Pasaporte — Fase 5\n\n## Ayudantes usados desde otras vistas\n\n\`\`\`javascript\n${block(helperStart, helperEnd)}\n\`\`\`\n\n## Estado, búsqueda, enlace, editor y administración\n\n\`\`\`javascript\n${block(mainStart, mainEnd)}\n\`\`\`\n`;
fs.writeFileSync('MODULARIZACION_FASE5_BLOQUES.md', out, 'utf8');
console.log(`Bloques extraídos: ayudantes ${helperStart}-${helperEnd}; principal ${mainStart}-${mainEnd}.`);
