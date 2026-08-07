import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const BASE = 'a2cbd48853d196bc969deeefe0edc15432f90fdd';
const allowed = new Set([
  'SIMPLIFICACION_FASE4_AUDITORIA_DUPLICIDADES.md',
  'js/modules/admin-profile-accessibility.js',
  'js/modules/daily-control.js',
  'js/modules/patient-hub.js',
  'js/modules/follow-up-hub.js',
  'js/modules/commissions-hub.js',
  'js/modules/communications-hub.js',
  'js/modules/finance-hub.js',
  'js/modules/daily-control-completion.js',
  'tools/validar-simplificacion-integral.mjs',
  '.github/workflows/simplificacion-validacion-integral.yml'
]);

const functional = [
  'js/modules/admin-profile-accessibility.js',
  'js/modules/daily-control.js',
  'js/modules/patient-hub.js',
  'js/modules/follow-up-hub.js',
  'js/modules/commissions-hub.js',
  'js/modules/communications-hub.js',
  'js/modules/finance-hub.js',
  'js/modules/daily-control-completion.js'
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}
function ok(message) { console.log(`✅ ${message}`); }
function text(file) {
  if (!fs.existsSync(file)) fail(`Falta ${file}`);
  return fs.readFileSync(file, 'utf8');
}
function requireText(file, needles) {
  const src = text(file);
  for (const needle of needles) {
    if (!src.includes(needle)) fail(`${file}: falta ${needle}`);
  }
}

for (const file of functional) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    console.error(error.stderr?.toString() || error.message);
    fail(`Sintaxis inválida en ${file}`);
  }
}
ok('Sintaxis válida en todos los módulos funcionales de simplificación.');

let changed;
try {
  changed = execFileSync('git', ['diff', '--name-only', `${BASE}..HEAD`], { encoding: 'utf8' })
    .split(/\r?\n/).map(x => x.trim()).filter(Boolean);
} catch (error) {
  fail(`No se pudo calcular el diff contra Fase 25: ${error.message}`);
}
const unexpected = changed.filter(file => !allowed.has(file));
if (unexpected.length) fail(`Archivos fuera de alcance: ${unexpected.join(', ')}`);
ok(`Aislamiento correcto: ${changed.length} archivos dentro de la lista autorizada.`);

for (const protectedFile of ['index.html', 'google-apps-script.js']) {
  try {
    execFileSync('git', ['diff', '--quiet', BASE, '--', protectedFile]);
  } catch (_) {
    fail(`${protectedFile} cambió frente a la Fase 25.`);
  }
}
ok('index.html y google-apps-script.js permanecen intactos.');

requireText('js/modules/admin-profile-accessibility.js', [
  'js/modules/daily-control.js',
  'js/modules/patient-hub.js',
  "'sb-dashboard','sb-agenda','sb-pacientes','sb-pagos','sb-seguimiento','sb-pasaporte'",
  "['mobBtn-calendario','mobBtn-finanzas']",
  "mobBtn-pagos"
]);
requireText('js/modules/patient-hub.js', [
  'Registrar paciente', 'Reactivación', "view === 'basedatos'", 'js/modules/follow-up-hub.js'
]);
requireText('js/modules/follow-up-hub.js', [
  'Reagendamiento', 'Recordatorios', "view === 'recordatorios'", 'js/modules/commissions-hub.js'
]);
requireText('js/modules/commissions-hub.js', [
  'Recuperaciones', "view === 'recuperacion'", 'Pacientes → Reactivación', 'js/modules/communications-hub.js'
]);
requireText('js/modules/communications-hub.js', [
  'Respuestas rápidas', 'Guiones', 'Plantillas automáticas', "view === 'guioneswa'", "view === 'tareasConfig'", 'js/modules/finance-hub.js'
]);
requireText('js/modules/finance-hub.js', [
  'Gestión financiera', 'Metas y presupuesto', 'Indicadores', 'Comisiones', 'Reportes', 'js/modules/daily-control-completion.js'
]);
requireText('js/modules/daily-control-completion.js', [
  'Confirmaciones y datos', 'Completar ficha', "view === 'acciones'", 'sb-acciones'
]);
requireText('js/modules/daily-control.js', [
  'CONTROL DIARIO', 'Prioridad operativa', 'Seguimientos y reagendamientos', 'Gestión pendiente', 'Preparar mañana'
]);
ok('Cadena de carga, pestañas y redirecciones legacy presentes.');

for (const file of [
  'js/modules/patient-hub.js',
  'js/modules/follow-up-hub.js',
  'js/modules/commissions-hub.js',
  'js/modules/communications-hub.js',
  'js/modules/finance-hub.js',
  'js/modules/daily-control-completion.js'
]) {
  const src = text(file);
  if (src.includes('APPS_SCRIPT_URL') || /\bfetch\s*\(/.test(src)) {
    fail(`${file} introdujo comunicación directa con servidor; los hubs deben reutilizar lógica existente.`);
  }
}
ok('Los hubs de simplificación no agregan llamadas nuevas al servidor.');

const redirects = [
  ['js/modules/patient-hub.js', "view === 'basedatos'"],
  ['js/modules/follow-up-hub.js', "view === 'recordatorios'"],
  ['js/modules/commissions-hub.js', "view === 'recuperacion'"],
  ['js/modules/communications-hub.js', "view === 'guioneswa'"],
  ['js/modules/communications-hub.js', "view === 'tareasConfig'"],
  ['js/modules/daily-control-completion.js', "view === 'acciones'"]
];
for (const [file, marker] of redirects) {
  if (!text(file).includes(marker)) fail(`Falta compatibilidad legacy ${marker} en ${file}`);
}
ok('Compatibilidad con accesos antiguos conservada.');

console.log('\n🎉 Validación integral de Simplificación 1–10 superada.');
