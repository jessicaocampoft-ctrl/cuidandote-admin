import fs from 'node:fs';

const adminPath = process.argv[2] || 'index.html';
const backendPath = process.argv[3] || 'audit-backend.js';

const admin = fs.readFileSync(adminPath, 'utf8').replace(/^\uFEFF/, '');
const backend = fs.readFileSync(backendPath, 'utf8').replace(/^\uFEFF/, '');

function unique(values) {
  return [...new Set(values)].sort();
}

const requested = [];

// Acciones escritas directamente en URLs.
for (const match of admin.matchAll(/[?&]action=([A-Za-z][A-Za-z0-9_]*)/g)) {
  requested.push(match[1]);
}

// Acciones enviadas en cuerpos JSON u objetos de petición.
for (const match of admin.matchAll(/\baction\s*:\s*["']([A-Za-z][A-Za-z0-9_]*)["']/g)) {
  requested.push(match[1]);
}

// Helpers del panel que reciben el nombre de acción como primer argumento.
for (const match of admin.matchAll(/\b(?:apiGet|apiPost|adminAction|runAdminAction)\s*\(\s*["']([A-Za-z][A-Za-z0-9_]*)["']/g)) {
  requested.push(match[1]);
}

const available = [];
for (const match of backend.matchAll(/\b(?:p|d)\.action\s*===\s*["']([A-Za-z][A-Za-z0-9_]*)["']/g)) {
  available.push(match[1]);
}

const requestedActions = unique(requested);
const availableActions = unique(available);

// createBooking es la ruta por defecto de POST cuando el formulario público no envía action.
const localOnly = new Set([
  'createBooking'
]);

const missing = requestedActions.filter(action => !availableActions.includes(action) && !localOnly.has(action));
const unusedBackend = availableActions.filter(action => !requestedActions.includes(action));

const report = [
  '# Auditoría de contratos Panel ↔ Apps Script',
  '',
  `- Acciones solicitadas por el panel: ${requestedActions.length}`,
  `- Acciones disponibles en el backend: ${availableActions.length}`,
  `- Acciones solicitadas sin ruta encontrada: ${missing.length}`,
  '',
  '## Acciones solicitadas por el panel',
  '',
  ...requestedActions.map(action => `- \`${action}\``),
  '',
  '## Acciones solicitadas sin ruta encontrada',
  '',
  ...(missing.length ? missing.map(action => `- **${action}**`) : ['Ninguna.']),
  '',
  '## Acciones del backend no detectadas en el panel principal',
  '',
  ...(unusedBackend.length ? unusedBackend.map(action => `- \`${action}\``) : ['Ninguna.']),
  '',
  '## Alcance',
  '',
  'La prueba valida nombres de acciones y rutas declaradas. No reemplaza la prueba funcional con una sesión autorizada ni confirma que la versión desplegada de Apps Script sea idéntica al archivo del repositorio.'
].join('\n');

fs.writeFileSync('AUDIT_CONTRACTS.md', report, 'utf8');
fs.mkdirSync('audit-output', { recursive: true });
fs.writeFileSync('audit-output/contratos-panel-backend.json', JSON.stringify({
  requestedActions,
  availableActions,
  missing,
  unusedBackend
}, null, 2), 'utf8');

console.log(report);
if (missing.length) process.exit(1);
