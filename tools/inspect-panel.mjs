import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function contextAround(lineNumber, radius = 6) {
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

addSection('Todas las apariciones de copyGestionStatus', occurrences(/\bcopyGestionStatus\b/g));
addSection('ID duplicado: emCk_ventas_sem_1', occurrences(/\bid\s*=\s*["']emCk_ventas_sem_1["']/gi));
addSection('Declaraciones de globalSearch', occurrences(/\bfunction\s+globalSearch\s*\(/g));
addSection('Declaración de copyGestionTexto', occurrences(/\b(?:async\s+)?function\s+copyGestionTexto\s*\(|\bcopyGestionTexto\s*=\s*(?:async\s*)?(?:function|\()/g));
addSection('Declaración de openPago', occurrences(/\b(?:async\s+)?function\s+openPago\s*\(|\bopenPago\s*=\s*(?:async\s*)?(?:function|\()/g));
addSection('Referencias a openPago', occurrences(/\bopenPago\b/g));
addSection('Acción adminLogin', occurrences(/adminLogin/g));
addSection('Variables loginUrl', occurrences(/\bloginUrl\b/g));
addSection('Funciones relacionadas con login', occurrences(/\b(?:async\s+)?function\s+[A-Za-z_$][\w$]*(?:Login|login|Sesion|Session)[A-Za-z_$\w]*\s*\(/g));
addSection('AbortController', occurrences(/new AbortController\(\)/g));
addSection('Llamadas fetch con señal', occurrences(/signal\s*:\s*[A-Za-z_$][\w$]*\.signal/g));
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
