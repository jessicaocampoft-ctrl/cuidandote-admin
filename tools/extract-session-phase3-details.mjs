import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

function lineNumberAt(index) {
  return raw.slice(0, index).split(/\r?\n/).length;
}

function contextByPattern(title, pattern, before = 12, after = 30) {
  const match = pattern.exec(raw);
  if (!match) return [`## ${title}`, '', 'No encontrado.', ''];
  const line = lineNumberAt(match.index);
  const start = Math.max(1, line - before);
  const end = Math.min(lines.length, line + after);
  return [
    `## ${title} — línea ${line}`,
    '',
    '```javascript',
    lines.slice(start - 1, end).map((text, i) => `${start + i}: ${text}`).join('\n'),
    '```',
    ''
  ];
}

function allContexts(title, pattern, before = 8, after = 16, limit = 20) {
  const matches = [...raw.matchAll(pattern)].slice(0, limit);
  const out = [`## ${title}`, ''];
  if (!matches.length) return [...out, 'No encontrado.', ''];
  matches.forEach((match, index) => {
    const line = lineNumberAt(match.index ?? 0);
    const start = Math.max(1, line - before);
    const end = Math.min(lines.length, line + after);
    out.push(
      `### Coincidencia ${index + 1} — línea ${line}`,
      '',
      '```javascript',
      lines.slice(start - 1, end).map((text, i) => `${start + i}: ${text}`).join('\n'),
      '```',
      ''
    );
  });
  return out;
}

const output = [
  '# Detalle exacto de inicio de sesión y sesiones — Fase 3',
  '',
  ...contextByPattern('Estado inicial de sesión', /let\s+TOKEN\s*=\s*sessionStorage\.getItem\(['"]adminToken['"]\)/, 8, 20),
  ...contextByPattern('Cambio de pantallas', /function\s+showOnlyScreen\s*\(/, 5, 20),
  ...contextByPattern('Acceso profesional', /function\s+openProfessionalLoginMode\s*\(/, 5, 105),
  ...contextByPattern('Acceso administrativo', /(?:async\s+)?function\s+doLogin\s*\(/, 15, 150),
  ...contextByPattern('Inactividad y restauración', /TIMEOUT DE INACTIVIDAD/, 5, 130),
  ...allContexts('Inicialización al cargar la página', /(?:DOMContentLoaded|window\.onload|document\.readyState|addEventListener\(['"]load['"])/g, 10, 35, 12),
  ...allContexts('Limpieza de tokens', /sessionStorage\.removeItem\(['"](?:adminToken|professionalToken|adminUser)['"]\)/g, 7, 14, 20),
  ...allContexts('Persistencia de usuarios y tokens', /sessionStorage\.(?:setItem|getItem)\(['"](?:adminToken|professionalToken|adminUser)['"]/g, 7, 14, 30)
];

fs.writeFileSync('MODULARIZACION_FASE3_DETALLE.md', output.join('\n'), 'utf8');
console.log('Detalle exacto de la Fase 3 generado.');
