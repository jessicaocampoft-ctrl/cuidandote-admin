import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const out = process.argv[3] || 'MODULARIZACION_FASE12_FUNCIONES_DIAGNOSTICO.md';
const unique = values => [...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));

function functionBlock(name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const matches = [...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: ${matches.length} declaraciones.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const next = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  next.lastIndex = start + 1;
  const found = next.exec(html);
  return html.slice(start, found ? found.index + 1 : html.length).trimEnd();
}

function declarationBlock(name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const re = new RegExp(`(?:^|\\n)(const|let|var)\\s+${escaped}\\b`, 'g');
  const matches = [...html.matchAll(re)];
  if (matches.length !== 1) return null;
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  let i = start;
  let braces = 0, brackets = 0, parens = 0, quote = null, escapedChar = false;
  for (; i < html.length; i++) {
    const ch = html[i];
    if (quote) {
      if (escapedChar) escapedChar = false;
      else if (ch === '\\') escapedChar = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') braces++;
    else if (ch === '}') braces--;
    else if (ch === '[') brackets++;
    else if (ch === ']') brackets--;
    else if (ch === '(') parens++;
    else if (ch === ')') parens--;
    else if (ch === ';' && braces === 0 && brackets === 0 && parens === 0) { i++; break; }
  }
  return html.slice(start, i).trimEnd();
}

const candidates = [
  '_formatKPIValue','_kpiCardGuia','_kpiRow','_kpiSnapshot','applyKPIFavorites','applyKPIRefSpans',
  'calcBDActualizada','changeKPIMonth','closeKPIExplorer','getCancelMotivos','getKPIConfig','getKPIManual',
  'guardarKPIConfig','guardarKPIManual','initKPIExplorer','loadKPIHistoryFromServer','openKPIExplorer',
  'renderKPIGuia','renderKPITablero','saveKPIManual','saveKPINote','scrollToKPICard','toggleKPICard',
  'toggleKPIFavorite','_renderBDBreakdown','_renderCancelBreakdown'
];
const declarations = new Set([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const present = candidates.filter(n=>declarations.has(n));
const missing = candidates.filter(n=>!declarations.has(n));
const bodies = present.map(name=>({name, text:functionBlock(name)}));
const combined = bodies.map(x=>x.text).join('\n\n');

const globalNames = unique([
  ...[...html.matchAll(/(?:^|\n)(?:const|let|var)\s+([A-Za-z_$][\w$]*)\b/g)].map(m=>m[1])
]).filter(name => /(?:kpi|indicador|favorite|explorer|cancel|bd|metrica)/i.test(name) && new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`).test(combined));
const globalBlocks = globalNames.map(name=>({name,text:declarationBlock(name)})).filter(x=>x.text);
const called = unique([...combined.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const external = called.filter(n=>declarations.has(n) && !present.includes(n));

const lines = [
  '# Revisión detallada — Fase 12 Indicadores y KPI','',
  `- Funciones candidatas presentes: **${present.length}**.`,
  `- Funciones candidatas ausentes: **${missing.length}**.`,
  `- Variables/constantes globales relacionadas: **${globalBlocks.length}**.`,
  `- Dependencias funcionales externas: **${external.length}**.`,
  '', '## Funciones presentes', ...present.map(n=>`- \`${n}\``),
  '', '## Funciones ausentes', ...(missing.length?missing.map(n=>`- \`${n}\``):['- Ninguna.']),
  '', '## Dependencias externas', ...external.map(n=>`- \`${n}\``),
  '', '## Variables y constantes globales relacionadas'
];
for (const item of globalBlocks) lines.push(`\n### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\``);
lines.push('', '## Funciones candidatas');
for (const item of bodies) lines.push(`\n### ${item.name}\n\n\`\`\`javascript\n${item.text}\n\`\`\``);
lines.push('', '- Este documento es diagnóstico; no modifica el panel.','');
fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Revisión Fase 12 generada: ${present.length} funciones, ${globalBlocks.length} globales, ${external.length} dependencias externas.`);
