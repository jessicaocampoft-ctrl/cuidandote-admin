import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const out = process.argv[3] || 'MODULARIZACION_FASE11_DIAGNOSTICO_RESULTADO.md';
const unique = values => [...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));

function block(name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const match = [...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (match.length !== 1) throw new Error(`${name}: ${match.length} declaraciones.`);
  const start = match[0].index + (match[0][0].startsWith('\n') ? 1 : 0);
  const next = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  next.lastIndex = start + 1;
  const found = next.exec(html);
  return html.slice(start, found ? found.index + 1 : html.length).trimEnd();
}

const start = html.indexOf('<section id="vFinanzas"');
const end = html.indexOf('</section>', start);
if (start < 0 || end < 0) throw new Error('No se encontró vFinanzas.');
const ui = html.slice(start, end + 10);
const names = unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const set = new Set(names);
const handlers = unique([...ui.matchAll(/\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1])).filter(n=>set.has(n));
const shared = new Set(['showView','openModal','closeModal','toast','esc','fmtDate','today','initDashboard','formatCOP','rgba','chipColor','kvGet','kvSet','kvRemove','logChange','renderChangeLog','toggleChangeLog','clearChangeLog','parsePrecio','reload','loadTeamData']);
const queue = unique([...handlers, 'renderFinanzas']);
const selected = new Set();
const edges = [];
while (queue.length) {
  const name = queue.shift();
  if (!set.has(name) || selected.has(name) || shared.has(name)) continue;
  selected.add(name);
  const calls = unique([...block(name).matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1])).filter(n=>set.has(n));
  for (const called of calls) {
    edges.push([name, called]);
    if (!selected.has(called) && !shared.has(called)) queue.push(called);
  }
}
const selectedNames = unique([...selected]);
const financePattern = /(?:finanz|ingreso|gasto|egreso|movimiento|caja|categoria|concepto|balance|flujo|mes|periodo|export)/i;
const suggested = unique([...handlers, 'renderFinanzas', ...selectedNames.filter(n=>financePattern.test(n))]);
const directFromRender = unique(edges.filter(([from])=>from==='renderFinanzas').map(([,to])=>to));
const lines = [
  '# Diagnóstico de dependencias — Fase 11 Finanzas','',
  `- Manejadores de la vista: **${handlers.length}**.`,
  `- Cierre transitivo inicial: **${selectedNames.length}** funciones.`,
  `- Candidatas por nombre financiero o manejador: **${suggested.length}**.`,
  '', '## Manejadores de vFinanzas', ...handlers.map(n=>`- \`${n}\``),
  '', '## Llamadas directas desde renderFinanzas', ...directFromRender.map(n=>`- \`${n}\``),
  '', '## Candidatas financieras sugeridas', ...suggested.map(n=>`- \`${n}\``),
  '', '## Cierre transitivo completo', ...selectedNames.map(n=>`- \`${n}\``),
  '', '## Relaciones detectadas', ...edges.map(([a,b])=>`- \`${a}\` → \`${b}\``),
  '', '- Este archivo es solo diagnóstico. No autoriza extracción ni modifica código funcional.',''
];
fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Diagnóstico generado: ${handlers.length} manejadores, ${selectedNames.length} dependencias, ${suggested.length} candidatas.`);
