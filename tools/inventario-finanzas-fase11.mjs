import fs from 'node:fs';

const htmlPath = process.argv[2] || 'index.html';
const reportPath = process.argv[3] || 'MODULARIZACION_FASE11_INVENTARIO_RESULTADO.md';
const html = fs.readFileSync(htmlPath, 'utf8').replace(/^\uFEFF/, '');

const functions = [
  'renderFinanzas',
  'calcCobradoMes',
  'calcIngresoPaquetesMes',
  'renderEgresosList',
  'getEgresos',
  'saveEgresos',
  'guardarEgreso',
  'eliminarEgreso',
  'actualizarConceptosEgreso',
  'renderEstructuraFinanciera',
  'resRow'
];
const constants = [
  'CONCEPTOS_EGRESO',
  'COSTOS_REFERENCIA',
  'COSTO_BASE',
  'COSTO_PE',
  'COSTO_META'
];
const forbidden = [
  'renderPagos','saveManualPayment','renderKPITablero','renderMetricas','guardarKPIManual',
  'guardarMetaFin','previewMetaFin','renderPresupuestoMetas','renderConveniosReport',
  'exportarCSV','renderIngresosDetalle','renderCitasResumen','setModoIngresos',
  'registrarLead','loadEncuestaStats','renderEquipo','renderBasedatos','renderPaquetes',
  'renderCodigos','renderPassport','renderCalendar'
];

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
}

function extractFunction(name) {
  const escaped = name.replace(/[$]/g, '\\$&');
  const matches = [...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const firstLineEnd = html.indexOf('\n', start);
  const firstLine = html.slice(start, firstLineEnd < 0 ? html.length : firstLineEnd);
  const opens = (firstLine.match(/{/g) || []).length;
  const closes = (firstLine.match(/}/g) || []).length;
  if (opens > 0 && opens === closes) return firstLine.trimEnd();
  const closeRegex = /^}\s*$/gm;
  closeRegex.lastIndex = firstLineEnd < 0 ? start : firstLineEnd + 1;
  const close = closeRegex.exec(html);
  if (!close) throw new Error(`No se encontró el cierre de nivel superior de ${name}.`);
  return html.slice(start, close.index + close[0].length).trimEnd();
}

function extractConstant(name) {
  const declarationName = ['COSTO_PE','COSTO_META'].includes(name) ? 'COSTO_BASE' : name;
  const escaped = declarationName.replace(/[$]/g, '\\$&');
  const match = new RegExp(`const\\s+${escaped}\\b`).exec(html);
  if (!match) throw new Error(`No se encontró la declaración que contiene ${name}.`);
  const start = match.index;
  const end = html.indexOf(';', start);
  if (end < 0) throw new Error(`No se encontró el cierre de ${name}.`);
  const declaration = html.slice(start, end + 1).trim();
  if (!new RegExp(`\\b${name}\\b`).test(declaration)) throw new Error(`${name} no está en la declaración esperada.`);
  return declaration;
}

const functionBlocks = new Map(functions.map(name => [name, extractFunction(name)]));
const constantBlocks = new Map(constants.map(name => [name, extractConstant(name)]));
for (const name of forbidden) {
  if (functions.includes(name)) throw new Error(`Se incluyó una función prohibida: ${name}.`);
}

const source = [...new Set(constantBlocks.values()), ...functionBlocks.values()].join('\n\n');
const declarations = new Set([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const outsideCalls = unique([...source.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]))
  .filter(name => declarations.has(name) && !functions.includes(name));
const domIds = unique([...source.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m=>m[1]));
const storageKeys = unique([...source.matchAll(/kv(?:Get|Set|Remove)\(\s*['"]([^'"]+)['"]/g)].map(m=>m[1]));

const requiredOutside = ['citasReales','normDate','parsePrecio','today','getMeta','_getPkAsignados','fmtPeso','renderMetricas','renderKPITablero','_checkAlertaSemanFloja'];
for (const name of requiredOutside) {
  if (!outsideCalls.includes(name)) throw new Error(`No se detectó la dependencia esperada ${name}.`);
}
for (const name of forbidden) {
  const isAllowedExternal = ['renderKPITablero','renderMetricas'].includes(name);
  if (!isAllowedExternal && source.includes(`function ${name}(`)) throw new Error(`Se trasladó accidentalmente ${name}.`);
}

const lines = [
  '# Inventario de modularización — Fase 11 Finanzas','',
  '- Alcance: núcleo financiero, ingresos consolidados, egresos y estructura financiera.',
  `- Funciones propias seleccionadas: **${functions.length}**.`,
  `- Constantes propias seleccionadas: **${constants.length}**.`,
  `- Dependencias compartidas conservadas fuera: **${outsideCalls.length}**.`,
  `- IDs relacionados: **${domIds.length}**.`,
  `- Claves de almacenamiento detectadas: **${storageKeys.length}**.`,
  '- Pagos operativos, Comisiones, Presupuesto, Metas, Indicadores y las Fases 1 a 10 permanecen fuera del alcance.','',
  '## Funciones propias seleccionadas',
  ...functions.map(name => `- \`${name}\``),
  '', '## Constantes propias',
  ...constants.map(name => `- \`${name}\``),
  '', '## Dependencias compartidas que no se mueven',
  ...outsideCalls.map(name => `- \`${name}\``),
  '', '## Claves de almacenamiento',
  ...(storageKeys.length ? storageKeys.map(key => `- \`${key}\``) : ['- No se detectaron claves.']),
  '', '## IDs relacionados',
  ...domIds.map(id => `- \`${id}\``),
  '', '## Fuera del alcance confirmado',
  '- KPI e indicadores: `renderKPITablero`, `renderMetricas` y funciones relacionadas.',
  '- Metas y presupuesto: `guardarMetaFin`, `previewMetaFin`, `renderPresupuestoMetas`.',
  '- Gestión comercial: leads, copias de gestión y encuestas.',
  '- Informes especializados: convenios, exportaciones y análisis detallados de ingresos.',
  '- Pagos, Agenda, Pacientes, Equipo clínico, Paquetes, Referidos y Pasaporte.','',
  '## Controles',
  '- Conservar los mismos nombres públicos mediante adaptadores.',
  '- No introducir llamadas nuevas al servidor.',
  '- No modificar `main`, Apps Script ni el panel publicado.',''
];

fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`Inventario Fase 11 seguro: ${functions.length} funciones y ${constants.length} constantes.`);
