import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function extractFunction(name) {
  const pattern = new RegExp(`\\b(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = pattern.exec(raw);
  if (!match) return null;
  const start = match.index;
  const braceStart = raw.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let templateDepth = 0;
  for (let i = braceStart; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (quote === '`' && ch === '$' && next === '{') { templateDepth++; i++; continue; }
      if (quote === '`' && templateDepth > 0 && ch === '}') { templateDepth--; continue; }
      if (ch === quote && templateDepth === 0) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = raw.indexOf('\n', i + 2);
      i = end < 0 ? raw.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = raw.indexOf('*/', i + 2);
      i = end < 0 ? raw.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        return {
          name,
          start,
          end: i + 1,
          line: lineNumberAt(start),
          text: raw.slice(start, i + 1)
        };
      }
    }
  }
  return null;
}

const declaredFunctions = [...raw.matchAll(/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)]
  .map(match => ({ name: match[1], line: lineNumberAt(match.index ?? 0) }));

const explicitNames = [
  'showOnlyScreen',
  'doLogin',
  'logout',
  'openProfessionalLoginMode',
  'backToAdminLogin',
  'doProfessionalLogin',
  'changeProfessionalPassword',
  'showProfessionalApp',
  'logoutProfessional',
  'restoreSession',
  'restoreAdminSession',
  'checkSession',
  'touchSession',
  'startInactivityTimer',
  'resetInactivityTimer'
];

const inferredNames = declaredFunctions
  .filter(item => /(login|logout|session|token|inactiv|screen|professionalapp)/i.test(item.name))
  .map(item => item.name);

const functionNames = [...new Set([...explicitNames, ...inferredNames])];
const blocks = functionNames.map(extractFunction).filter(Boolean);

function contextFor(regex, radius = 5) {
  const matches = [...raw.matchAll(regex)];
  return matches.map(match => {
    const line = lineNumberAt(match.index ?? 0);
    const start = Math.max(1, line - radius);
    const end = Math.min(lines.length, line + radius);
    return {
      line,
      text: lines.slice(start - 1, end).map((text, i) => `${start + i}: ${text}`).join('\n')
    };
  });
}

const storageHits = contextFor(/(?:sessionStorage|localStorage)\.(?:getItem|setItem|removeItem|clear)\s*\([^\n)]*\)/g, 4);
const tokenHits = contextFor(/\b(?:TOKEN|PROFESSIONAL_TOKEN|currentAdminUser|professionalSession)\b/g, 3);
const listeners = contextFor(/(?:addEventListener|onload|DOMContentLoaded|beforeunload|visibilitychange)[^\n]*/g, 3);
const timers = contextFor(/(?:setTimeout|setInterval|clearTimeout|clearInterval)\s*\(/g, 3);

const report = [
  '# Inventario de inicio de sesión y sesiones — Fase 3',
  '',
  `Archivo: \`${target}\``,
  '',
  `- Funciones de sesión detectadas: ${blocks.length}`,
  `- Accesos a storage detectados: ${storageHits.length}`,
  `- Referencias a tokens/usuarios detectadas: ${tokenHits.length}`,
  `- Eventos de ciclo de vida detectados: ${listeners.length}`,
  `- Temporizadores detectados: ${timers.length}`,
  '',
  '## Funciones relacionadas con sesión',
  '',
  ...blocks.flatMap(block => [
    `### ${block.name} — línea ${block.line}`,
    '',
    '```javascript',
    block.text,
    '```',
    ''
  ]),
  '## Uso de sessionStorage y localStorage',
  '',
  ...storageHits.flatMap((hit, index) => [
    `### Coincidencia ${index + 1} — línea ${hit.line}`,
    '',
    '```javascript',
    hit.text,
    '```',
    ''
  ]),
  '## Referencias a tokens y usuarios',
  '',
  ...tokenHits.slice(0, 80).flatMap((hit, index) => [
    `### Coincidencia ${index + 1} — línea ${hit.line}`,
    '',
    '```javascript',
    hit.text,
    '```',
    ''
  ]),
  '## Eventos de carga y cierre',
  '',
  ...listeners.flatMap((hit, index) => [
    `### Coincidencia ${index + 1} — línea ${hit.line}`,
    '',
    '```javascript',
    hit.text,
    '```',
    ''
  ]),
  '## Temporizadores',
  '',
  ...timers.slice(0, 80).flatMap((hit, index) => [
    `### Coincidencia ${index + 1} — línea ${hit.line}`,
    '',
    '```javascript',
    hit.text,
    '```',
    ''
  ])
].join('\n');

fs.writeFileSync('MODULARIZACION_FASE3_INVENTARIO.md', report, 'utf8');
console.log(`Inventario generado con ${blocks.length} funciones relacionadas con sesión.`);
