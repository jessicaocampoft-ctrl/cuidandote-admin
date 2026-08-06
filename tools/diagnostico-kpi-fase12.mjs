import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const out = process.argv[3] || 'MODULARIZACION_FASE12_DIAGNOSTICO_RESULTADO.md';
const unique = values => [...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));

function block(name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const matches = [...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: ${matches.length} declaraciones.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const next = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  next.lastIndex = start + 1;
  const found = next.exec(html);
  return html.slice(start, found ? found.index + 1 : html.length).trimEnd();
}

const declarations = unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const declarationSet = new Set(declarations);
const sectionStart = html.indexOf('<section id="vFinanzas"');
const sectionEnd = html.indexOf('</section>', sectionStart);
if (sectionStart < 0 || sectionEnd < 0) throw new Error('No se encontró vFinanzas.');
const ui = html.slice(sectionStart, sectionEnd + 10);
const uiHandlers = unique([...ui.matchAll(/\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1])).filter(n=>declarationSet.has(n));

const kpiPattern = /(?:kpi|indicador|metrica|metricas|bdactualizada|cancelmotivos|encuestastats|favorite|explorer|snapshot|refspan|scrolltokpi)/i;
const explicitSeeds = [
  'renderKPITablero','renderMetricas','renderKPIGuia','getKPIConfig','guardarKPIConfig',
  'getKPIManual','saveKPIManual','guardarKPIManual','changeKPIMonth','applyKPIFavorites',
  'applyKPIRefSpans','openKPIExplorer','closeKPIExplorer','toggleKPIFavorite','scrollToKPICard',
  '_kpiCardGuia','_kpiSnapshot','_formatKPIValue','calcBDActualizada','getCancelMotivos',
  'getEncuestaStats','_renderEncuestaStatsUI'
].filter(n=>declarationSet.has(n));
const patternSeeds = declarations.filter(n=>kpiPattern.test(n));
const handlerSeeds = uiHandlers.filter(n=>kpiPattern.test(n));
const seeds = unique([...explicitSeeds, ...patternSeeds, ...handlerSeeds]);
if (!seeds.includes('renderKPITablero')) throw new Error('No existe renderKPITablero.');

const shared = new Set([
  'showView','openModal','closeModal','toast','esc','fmtDate','today','initDashboard','formatCOP',
  'rgba','chipColor','kvGet','kvSet','kvRemove','logChange','renderChangeLog','toggleChangeLog',
  'clearChangeLog','parsePrecio','parsePrecioNum','fmtPeso','reload','loadTeamData','normDate',
  'citasReales','esCancelExcluida','getEgresos','calcCobradoMes','getMeta','resRow'
]);

const queue = [...seeds];
const selected = new Set();
const edges = [];
while (queue.length) {
  const name = queue.shift();
  if (!declarationSet.has(name) || selected.has(name) || shared.has(name)) continue;
  selected.add(name);
  const calls = unique([...block(name).matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1])).filter(n=>declarationSet.has(n));
  for (const called of calls) {
    edges.push([name, called]);
    if (!selected.has(called) && !shared.has(called)) queue.push(called);
  }
}

const selectedNames = unique([...selected]);
const forbiddenPatterns = [
  /^(?:renderFinanzas|renderEgresosList|getEgresos|saveEgresos|guardarEgreso|eliminarEgreso|actualizarConceptosEgreso|renderEstructuraFinanciera|calcCobradoMes|calcIngresoPaquetesMes)$/,
  /(?:MetaFin|Presupuesto|Comision|Lead|Gestion|Convenio|exportarCSV|IngresosDetalle|Pagos|Payment|Pago)/i
];
const crossed = selectedNames.filter(name=>forbiddenPatterns.some(re=>re.test(name)));
const direct = unique(edges.filter(([from])=>from==='renderKPITablero').map(([,to])=>to));
const outsideCalls = unique(edges.map(([,to])=>to).filter(to=>!selected.has(to)));

const lines = [
  '# Diagnóstico de dependencias — Fase 12 Indicadores y KPI','',
  `- Semillas KPI detectadas: **${seeds.length}**.`,
  `- Cierre transitivo inicial: **${selectedNames.length}** funciones.`,
  `- Cruces potenciales con áreas fuera de alcance: **${crossed.length}**.`,
  '', '## Semillas KPI', ...seeds.map(n=>`- \`${n}\``),
  '', '## Llamadas directas desde renderKPITablero', ...direct.map(n=>`- \`${n}\``),
  '', '## Cierre transitivo completo', ...selectedNames.map(n=>`- \`${n}\``),
  '', '## Dependencias externas conservadas', ...outsideCalls.map(n=>`- \`${n}\``),
  '', '## Cruces potenciales', ...(crossed.length ? crossed.map(n=>`- \`${n}\``) : ['- Ninguno detectado.']),
  '', '## Relaciones detectadas', ...edges.map(([a,b])=>`- \`${a}\` → \`${b}\``),
  '', '- Este archivo es solo diagnóstico. No modifica código funcional ni autoriza extracción.',''
];
fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Diagnóstico Fase 12: ${seeds.length} semillas, ${selectedNames.length} funciones, ${crossed.length} cruces.`);
