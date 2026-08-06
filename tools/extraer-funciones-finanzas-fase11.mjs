import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const out = process.argv[3] || 'MODULARIZACION_FASE11_FUNCIONES_DIAGNOSTICO.md';
const names = [
  'renderFinanzas','calcCobradoMes','calcIngresoPaquetesMes','renderEgresosList',
  'getEgresos','saveEgresos','guardarEgreso','eliminarEgreso','actualizarConceptosEgreso',
  'renderEstructuraFinanciera','renderIngresosDetalle','renderCitasResumen','setModoIngresos',
  'exportarCSV','renderConveniosReport','resRow','_checkAlertaSemanFloja',
  'getMeta','guardarMetaFin','previewMetaFin','renderMetricas','renderKPITablero'
];

function extract(name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const matches = [...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) return `// ${name}: ${matches.length} declaraciones encontradas.`;
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const next = /\n(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\(/g;
  next.lastIndex = start + 1;
  const found = next.exec(html);
  return html.slice(start, found ? found.index + 1 : html.length).trimEnd();
}

const lines = ['# Revisión detallada de funciones — Fase 11 Finanzas',''];
for (const name of names) {
  lines.push(`## ${name}`,'','```javascript',extract(name),'```','');
}
lines.push('Este documento es solo diagnóstico y no modifica código funcional.','');
fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Se extrajeron ${names.length} funciones para revisión.`);
