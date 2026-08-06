import fs from 'node:fs';

const input = process.argv[2] || 'index.html';
const output = process.argv[3] || 'MODULARIZACION_FASE14_INVENTARIO_RESULTADO.md';
const source = fs.readFileSync(input, 'utf8');

function lineNumberAt(index) {
  return source.slice(0, index).split('\n').length;
}

function extractFunction(start) {
  const brace = source.indexOf('{', start);
  if (brace < 0) return null;
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = brace; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') { blockComment = false; i++; }
      continue;
    }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  return null;
}

function nearestHeading(index) {
  const before = source.slice(Math.max(0, index - 5000), index).split('\n');
  for (let i = before.length - 1; i >= 0; i--) {
    const raw = before[i].trim();
    if (!raw.startsWith('//')) continue;
    const text = raw
      .replace(/^\/\/\s*/, '')
      .replace(/[═─━╔╗╚╝]+/g, '')
      .replace(/^[-–—]+|[-–—]+$/g, '')
      .trim();
    if (text.length >= 4 && text.length <= 100 && /[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(text)) return text;
  }
  return 'Sin sección identificada';
}

const declarations = [];
const regex = /(^|\n)(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
for (const match of source.matchAll(regex)) {
  const start = match.index + (match[1] ? match[1].length : 0);
  const body = extractFunction(start);
  if (!body) continue;
  const name = match[3];
  const adapter = /window\.Panel[A-Za-z0-9_$]*/.test(body) || /const\s+module\s*=\s*window\.Panel/.test(body);
  declarations.push({
    name,
    line: lineNumberAt(start),
    section: nearestHeading(start),
    adapter,
    lines: body.split('\n').length,
  });
}

const remaining = declarations.filter(x => !x.adapter);
const adapters = declarations.filter(x => x.adapter);
const groups = new Map();
for (const item of remaining) {
  if (!groups.has(item.section)) groups.set(item.section, []);
  groups.get(item.section).push(item);
}

const sortedGroups = [...groups.entries()]
  .map(([section, items]) => ({
    section,
    items: items.sort((a,b) => a.line - b.line),
    totalLines: items.reduce((sum, x) => sum + x.lines, 0),
  }))
  .sort((a,b) => b.totalLines - a.totalLines);

const moduleTags = [...source.matchAll(/<script\s+src="(js\/(?:core|modules)\/[^"]+)"/g)].map(x => x[1]);
const likelySubstantial = sortedGroups.filter(g => g.totalLines >= 40 || g.items.length >= 3);

let md = '# Inventario restante después de la Fase 13\n\n';
md += `- Funciones declaradas en index.html: **${declarations.length}**.\n`;
md += `- Adaptadores de módulos ya separados: **${adapters.length}**.\n`;
md += `- Funciones con implementación todavía dentro de index.html: **${remaining.length}**.\n`;
md += `- Secciones sustanciales candidatas a fases: **${likelySubstantial.length}**.\n`;
md += `- Scripts modulares cargados: **${moduleTags.length}**.\n\n`;
md += '## Módulos ya cargados\n\n';
for (const tag of moduleTags) md += `- \`${tag}\`\n`;
md += '\n## Secciones candidatas ordenadas por tamaño\n\n';
for (const group of sortedGroups) {
  md += `### ${group.section}\n\n`;
  md += `- Funciones: ${group.items.length}. Líneas aproximadas: ${group.totalLines}.\n`;
  md += `- ${group.items.map(x => `\`${x.name}\` (L${x.line}, ${x.lines} líneas)`).join(', ')}\n\n`;
}
md += '## Nota de planificación\n\n';
md += 'Una fase no debe equivaler automáticamente a una sección. Las funciones pequeñas y utilidades compartidas pueden agruparse, mientras que las secciones con muchas dependencias deben dividirse para conservar pruebas y aislamiento.\n';

fs.writeFileSync(output, md, 'utf8');
console.log(`Inventario generado: ${remaining.length} funciones restantes en ${sortedGroups.length} secciones.`);
