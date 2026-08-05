import fs from 'node:fs';

const htmlPath = process.argv[2] || 'index.html';
const reportPath = process.argv[3] || 'MODULARIZACION_FASE8_INVENTARIO_RESULTADO.md';
let html = fs.readFileSync(htmlPath, 'utf8');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1);

const uiStartMarker = '<!-- ── BASE DE DATOS ── -->';
const uiEndMarker = '<!-- ── CÓDIGOS REF & BONO ── -->';

function between(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0 || end <= start) throw new Error(`No se pudo delimitar ${label}.`);
  return source.slice(start, end);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
}

function findBodyOpen(source, start, name) {
  const paramsOpen = source.indexOf('(', start);
  if (paramsOpen < 0) throw new Error(`No se encontró la apertura de parámetros de ${name}.`);
  let depth = 0, quote = '', escaped = false;
  for (let i = paramsOpen; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') {
      depth--;
      if (depth === 0) {
        let bodyOpen = i + 1;
        while (bodyOpen < source.length && /\s/.test(source[bodyOpen])) bodyOpen++;
        if (source[bodyOpen] !== '{') throw new Error(`No se encontró el cuerpo real de ${name}.`);
        return bodyOpen;
      }
    }
  }
  throw new Error(`No se pudo cerrar la lista de parámetros de ${name}.`);
}

function extractNamedFunction(source, name) {
  const regex = new RegExp(`(?:async\\s+)?function\\s+${name.replace(/[$]/g, '\\$&')}\\s*\\(`, 'g');
  const matches = [...source.matchAll(regex)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start = matches[0].index;
  const open = findBodyOpen(source, start, name);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        const text = source.slice(start, i + 1);
        return { name, text, async: /^async\s+function/.test(text) };
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

const ui = between(html, uiStartMarker, uiEndMarker, 'la interfaz de Base de datos');
const uiHandlers = unique([...ui.matchAll(/\b(?:onclick|onchange|oninput|onkeyup|onsubmit)\s*=\s*['"][^'"]*?([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]));

const expectedModuleFunctions = [
  'initFormDB','renderBasedatos','renderReactivacion','limpiarFormDB','agregarPacienteDB',
  'checkDupDB','dbEditarPac','guardarPacienteDB','dbBorrarPac','dbOnOrigenChange',
  'dbReferidoFilter','agendarDesdePacienteRec','usarSesion','recCard','recEnviado',
  'recEmailEnviado','_updateReacBtn','msgSemana4','msgSemana5','waRecordatorio',
  'logChange','renderChangeLog','toggleChangeLog','clearChangeLog'
];

for (const handler of uiHandlers) {
  if (!expectedModuleFunctions.includes(handler)) expectedModuleFunctions.push(handler);
}

const functions = expectedModuleFunctions.map(name => extractNamedFunction(html, name));
const moduleSource = functions.map(item => item.text).join('\n\n');
const functionNames = functions.map(item => item.name);
const asyncFunctions = functions.filter(item => item.async).map(item => item.name);

const actions = unique([
  ...[...moduleSource.matchAll(/\baction\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]),
  ...[...moduleSource.matchAll(/[?&]action=([A-Za-z0-9_-]+)/g)].map(m => m[1])
]);
const domIds = unique([
  ...[...moduleSource.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]),
  ...[...ui.matchAll(/\bid\s*=\s*['"]([^'"]+)['"]/g)].map(m => m[1])
]);

const calls = unique([...moduleSource.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]));
const languageAndPlatform = new Set([
  'if','for','while','switch','catch','function','return','typeof','String','Number','Date',
  'Object','Array','Math','JSON','Promise','RegExp','URLSearchParams','encodeURIComponent',
  'parseInt','parseFloat','isNaN','confirm','alert','setTimeout','clearTimeout','fetch'
]);
const externalDependencies = calls.filter(name => !functionNames.includes(name) && !languageAndPlatform.has(name));

const stateCandidates = unique([
  ...[...html.matchAll(/(?:^|\n)\s*(?:let|const|var)\s+(_dbPacs|_reac[A-Za-z_$]*|_notasTimer)\b/g)].map(m => m[1])
]);
if (!stateCandidates.includes('_dbPacs')) throw new Error('No se encontró el estado _dbPacs.');

if (!ui.includes('id="vBasedatos"')) throw new Error('No se encontró la vista vBasedatos.');
if (functionNames.length < 20 || functionNames.length > 35) {
  throw new Error(`Selección insegura de funciones: ${functionNames.length}.`);
}
if (functionNames.some(name => /Finanzas|KPI|Agenda|Pago|Pasaporte|Equipo/i.test(name))) {
  throw new Error('Se incluyó una función de otro módulo por nombre.');
}

const lines = [];
lines.push('# Inventario de modularización — Fase 8 Base de datos', '');
lines.push('- Vista delimitada: `vBasedatos`.');
lines.push(`- Funciones seleccionadas para el módulo: **${functionNames.length}**.`);
lines.push(`- Funciones asíncronas: **${asyncFunctions.length}**.`);
lines.push(`- Estados compartidos detectados: **${stateCandidates.length}**.`);
lines.push(`- Acciones API detectadas: **${actions.length}**.`);
lines.push(`- IDs de interfaz relacionados: **${domIds.length}**.`);
lines.push('- La sección Códigos REF & BONO quedó fuera del alcance de esta fase.');
lines.push('- No se seleccionaron funciones de Agenda, Finanzas, KPI, Pagos, Pasaporte ni Equipo clínico.');
lines.push('');
lines.push('## Funciones seleccionadas');
for (const item of functions) lines.push(`- \`${item.name}\`${item.async ? ' — async' : ''}`);
lines.push('');
lines.push('## Manejadores declarados en la vista');
for (const name of uiHandlers) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Estados que requieren encapsulación o adaptador');
for (const name of stateCandidates) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Acciones API');
if (actions.length) for (const action of actions) lines.push(`- \`${action}\``);
else lines.push('- No se detectaron acciones API literales.');
lines.push('');
lines.push('## Dependencias compartidas que deben permanecer externas');
for (const name of externalDependencies) lines.push(`- \`${name}\``);
lines.push('');
lines.push('## Controles para la implementación');
lines.push('- Crear `js/modules/database.js` únicamente con las funciones seleccionadas.');
lines.push('- Conservar adaptadores con los mismos nombres en `index.html`.');
lines.push('- No mover Códigos REF & BONO ni utilidades compartidas.');
lines.push('- Verificar que Agenda, creación/edición de citas y los módulos de las Fases 1 a 7 no cambien.');
lines.push('- No modificar `main`, Apps Script ni el panel publicado.');
lines.push('');

fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`Inventario Fase 8 corregido: ${functionNames.length} funciones y ${externalDependencies.length} dependencias externas.`);
