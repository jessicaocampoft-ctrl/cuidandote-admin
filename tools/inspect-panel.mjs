import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function contextAround(lineNumber, radius = 5) {
  const start = Math.max(1, lineNumber - radius);
  const end = Math.min(lines.length, lineNumber + radius);
  return lines
    .slice(start - 1, end)
    .map((line, i) => `${start + i}: ${line}`)
    .join('\n');
}

function occurrences(regex) {
  return [...raw.matchAll(regex)].map(match => ({
    index: match.index ?? 0,
    line: lineNumberAt(match.index ?? 0),
    text: match[0],
    groups: match.slice(1)
  }));
}

const sections = [];

function addSection(title, items) {
  sections.push(`## ${title}`, '');
  if (!items.length) {
    sections.push('No se encontraron coincidencias.', '');
    return;
  }
  items.forEach((item, index) => {
    sections.push(`### Coincidencia ${index + 1} — línea ${item.line}`, '', '```html', contextAround(item.line), '```', '');
  });
}

addSection('ID duplicado: copyGestionStatus', occurrences(/\bid\s*=\s*["']copyGestionStatus["']/gi));
addSection('ID duplicado: emCk_ventas_sem_1', occurrences(/\bid\s*=\s*["']emCk_ventas_sem_1["']/gi));
addSection('Declaraciones de globalSearch', occurrences(/\bfunction\s+globalSearch\s*\(/g));
addSection('Referencias a copyGestionTexto', occurrences(/\bcopyGestionTexto\b/g));
addSection('Referencias a openPago', occurrences(/\bopenPago\b/g));
addSection('Solicitudes de inicio de sesión', occurrences(/fetch\(loginUrl[\s\S]{0,800}?\}\);/g));
addSection('AbortController del inicio de sesión', occurrences(/const controller = new AbortController\(\);/g));
addSection('Temporizadores del inicio de sesión', occurrences(/const timeout = setTimeout\(\(\) => controller\.abort\(\),\s*\d+\);/g));
addSection('Estados de pago canónicos', occurrences(/PAGO_APROBADO|PAGO_RECHAZADO|COMPROBANTE_RECIBIDO/g));

const output = [
  '# Contexto técnico para correcciones del panel',
  '',
  `Archivo revisado: \`${target}\``,
  `Total de líneas: ${lines.length}`,
  '',
  ...sections
].join('\n');

fs.writeFileSync('AUDIT_CONTEXT.md', output, 'utf8');
console.log('AUDIT_CONTEXT.md generado correctamente.');
