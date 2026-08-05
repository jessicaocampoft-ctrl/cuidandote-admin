import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function findLine(pattern) {
  const index = lines.findIndex(line => pattern.test(line));
  return index < 0 ? 0 : index + 1;
}

function blockAround(lineNumber, before = 8, after = 40) {
  if (!lineNumber) return 'No encontrado.';
  const start = Math.max(1, lineNumber - before);
  const end = Math.min(lines.length, lineNumber + after);
  return lines.slice(start - 1, end).map((line, index) => `${start + index}: ${line}`).join('\n');
}

const configLine = findLine(/\bconst\s+APPS_SCRIPT_URL\s*=/);
const timeoutLine = findLine(/\basync\s+function\s+fetchJsonWithTimeout\s*\(/);
const tokenLine = findLine(/\blet\s+TOKEN\s*=/);

const output = [
  '# Detalle exacto de la Fase 2',
  '',
  `- APPS_SCRIPT_URL: línea ${configLine || 'no encontrada'}`,
  `- fetchJsonWithTimeout: línea ${timeoutLine || 'no encontrada'}`,
  `- TOKEN: línea ${tokenLine || 'no encontrada'}`,
  '',
  '## Configuración del backend',
  '',
  '```javascript',
  blockAround(configLine, 8, 16),
  '```',
  '',
  '## Función de tiempo máximo',
  '',
  '```javascript',
  blockAround(timeoutLine, 6, 80),
  '```',
  '',
  '## Estado de sesión cercano',
  '',
  '```javascript',
  blockAround(tokenLine, 8, 20),
  '```',
  ''
];

fs.writeFileSync('MODULARIZACION_FASE2_DETALLE.md', output.join('\n'), 'utf8');
console.log('Detalle exacto de Fase 2 generado.');
