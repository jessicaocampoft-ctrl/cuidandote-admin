import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const modulePath = path.join('js', 'modules', 'appointment-create.js');
const scriptTag = '<script src="js/modules/appointment-create.js"></script>';
const names = [
  'bookWaitPatient','agendarHoy','calcAbono','validateNoMidnight','submitAdminBookingMulti',
  'agendarDesdePaciente','toggleNcAddress','_updateDuoTime','checkDomicilioWarn',
  'updateSesionesInfo','calcConvenio','autoFillPrice','submitAdminBooking','fillPatient',
  'clearNuevaCita','checkTimeConflict','openNuevaCitaFromCal','agendarDesdePacienteRec','agendarDesdeSeg'
];

function extractNamedFunction(source, name) {
  const regex = new RegExp(`(?:async\\s+)?function\\s+${name.replace(/[$]/g, '\\$&')}\\s*\\(`, 'g');
  const matches = [...source.matchAll(regex)];
  if (matches.length !== 1) throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const match = matches[0];
  const start = match.index;
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error(`No se encontró la apertura de ${name}.`);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
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
        return { name, start, end:i + 1, text, async:/^async\s+function/.test(text) };
      }
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

if (html.includes(scriptTag) && fs.existsSync(modulePath)) {
  console.log('La Fase 6B1 ya estaba aplicada.');
  process.exit(0);
}

const blocks = names.map(name => extractNamedFunction(html, name));
const moduleSource = `/* Cuidándote Fisioterapia — creación de citas. */\n(function (global) {\n  'use strict';\n\n${blocks.map(x => x.text).join('\n\n')}\n\n  global.PanelAppointmentCreate = Object.freeze({\n${names.map(name => `    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for (const item of blocks) {
  const adapter = `${item.async ? 'async ' : ''}function ${item.name}(...args) {\n  const module = window.PanelAppointmentCreate;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo de creación de citas no está disponible: ${item.name}');\n  }\n  return ${item.async ? 'await ' : ''}module.${item.name}(...args);\n}`;
  const occurrences = html.split(item.text).length - 1;
  if (occurrences !== 1) throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html = html.replace(item.text, adapter);
}

if (!html.includes(scriptTag)) {
  const bodyClose = html.lastIndexOf('</body>');
  if (bodyClose < 0) throw new Error('No se encontró </body>.');
  html = html.slice(0, bodyClose) + `  ${scriptTag}\n` + html.slice(bodyClose);
}

fs.mkdirSync(path.dirname(modulePath), { recursive:true });
fs.writeFileSync(modulePath, moduleSource, 'utf8');
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log(`Fase 6B1 aplicada: ${names.length} funciones trasladadas a ${modulePath}.`);
