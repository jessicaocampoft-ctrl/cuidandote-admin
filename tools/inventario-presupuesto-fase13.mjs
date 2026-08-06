import fs from 'node:fs';

const input = process.argv[2] || 'index.html';
const output = process.argv[3] || 'MODULARIZACION_FASE13_INVENTARIO_RESULTADO.md';
const source = fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, '');

function extractFunctions(text) {
  const result = [];
  const re = /\b(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let m;
  while ((m = re.exec(text))) {
    const start = m.index;
    const open = text.indexOf('{', re.lastIndex);
    if (open < 0) continue;
    let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false;
    let end = -1;
    for (let i = open; i < text.length; i++) {
      const ch = text[i], next = text[i + 1];
      if (lineComment) { if (ch === '\n') lineComment = false; continue; }
      if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
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
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      result.push({
        name: m[2],
        code: text.slice(start, end),
        line: text.slice(0, start).split('\n').length
      });
      re.lastIndex = end;
    }
  }
  return result;
}

const functions = extractFunctions(source);
const markers = /(?:presupuestoBody|\bpm_|costosEstructura|COSTOS_DEFAULTS|metaMensual|metaInputFin|metaInput\b|metaBar|META_VENTAS|calcTotalCostos|guardarMeta|reloadMetas|previewMetaFin|actualizarMetaBarra|costosEditorPanel|costosVistaCompacta)/;
const candidates = functions.filter(fn => markers.test(fn.name) || markers.test(fn.code));

const knownKpiAdapters = new Set([
  'getKPIConfig','applyKPIRefSpans','renderKPITablero','renderKPIGuia','getKPIManual','saveKPIManual'
]);
const likelyOwn = candidates.filter(fn => !knownKpiAdapters.has(fn.name));

let md = '# Inventario — Fase 13 Metas y presupuesto\n\n';
md += `- Funciones totales detectadas: **${functions.length}**.\n`;
md += `- Coincidencias por marcadores: **${candidates.length}**.\n`;
md += `- Candidatas después de excluir adaptadores KPI conocidos: **${likelyOwn.length}**.\n\n`;
md += '## Candidatas sugeridas\n';
for (const fn of likelyOwn) md += `- \`${fn.name}\` — línea ${fn.line}\n`;
md += '\n## Dependencias llamadas por cada candidata\n';
const names = new Set(functions.map(f => f.name));
for (const fn of likelyOwn) {
  const calls = [...new Set([...fn.code.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(x => x[1]).filter(x => names.has(x) && x !== fn.name))].sort();
  md += `- \`${fn.name}\` → ${calls.length ? calls.map(x => `\`${x}\``).join(', ') : 'ninguna función nombrada'}\n`;
}
md += '\n## Código exacto de candidatas\n\n';
for (const fn of likelyOwn) md += `### ${fn.name}\n\n\`\`\`javascript\n${fn.code}\n\`\`\`\n\n`;

fs.writeFileSync(output, md, 'utf8');
console.log(`Inventario Fase 13 generado: ${likelyOwn.length} candidatas.`);
