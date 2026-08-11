import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const checks = [];

function ok(message) {
  checks.push(`OK  ${message}`);
}

function fail(message) {
  errors.push(message);
}

function read(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    fail(`Falta archivo requerido: ${rel}`);
    return '';
  }
  const content = fs.readFileSync(abs, 'utf8');
  if (!content.trim()) fail(`Archivo vacío: ${rel}`);
  else ok(`Existe ${rel}`);
  return content;
}

const required = [
  'index.html',
  'js/core/config.js',
  'js/core/api.js',
  'js/core/navigation.js',
  'js/core/session.js',
  'js/modules/appointment-create.js',
  'js/modules/appointment-edit.js',
  'js/modules/payments.js',
  'js/modules/passport.js',
  'js/modules/patient-records.js',
  'js/modules/shared-storage.js',
  'js/modules/admin-profile-accessibility.js',
  'js/modules/sidebar-management.js',
  'public-schedule-admin.js'
];

const contents = new Map(required.map(file => [file, read(file)]));
const index = contents.get('index.html') || '';

if (/^\s*<!doctype html>/i.test(index)) ok('index.html empieza con DOCTYPE');
else fail('index.html no empieza con <!DOCTYPE html>');

const conflictPattern = /^(<<<<<<<|=======|>>>>>>>)/m;
for (const [file, content] of contents) {
  if (!content) continue;
  if (conflictPattern.test(content)) fail(`Hay marcadores de conflicto Git en ${file}`);
}
if (!errors.some(e => e.includes('marcadores de conflicto'))) ok('Sin marcadores de conflicto Git en archivos críticos');

const expectedScripts = [
  'js/core/config.js',
  'js/core/api.js',
  'js/core/navigation.js',
  'js/core/session.js',
  'js/modules/payments.js',
  'js/modules/passport.js',
  'js/modules/appointment-create.js',
  'js/modules/appointment-edit.js',
  'js/modules/patient-records.js',
  'js/modules/shared-storage.js',
  'js/modules/admin-profile-accessibility.js',
  'js/modules/sidebar-management.js'
];
for (const src of expectedScripts) {
  if (index.includes(src)) ok(`index.html carga ${src}`);
  else fail(`index.html dejó de cargar módulo crítico: ${src}`);
}

const localScriptRefs = [...index.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
  .map(match => match[1].split(/[?#]/)[0])
  .filter(src => src && !/^(?:https?:)?\/\//i.test(src) && !src.startsWith('data:'));
for (const src of new Set(localScriptRefs)) {
  const clean = src.replace(/^\.\//, '').replace(/^\//, '');
  if (!fs.existsSync(path.join(root, clean))) fail(`Referencia local rota en index.html: ${src}`);
}
if (!errors.some(e => e.includes('Referencia local rota'))) ok('Todas las referencias locales <script src> existen');

const contracts = [
  ['js/core/api.js', ['AbortController', 'fetchJsonWithTimeout']],
  ['js/core/session.js', ['adminLogin', 'sessionStorage', 'verifyAdminSession']],
  ['js/modules/appointment-create.js', ['action=ping', 'action=adminBook']],
  ['js/modules/appointment-edit.js', ['action=editBooking', 'action=cancelBooking', 'action=updateStatus']],
  ['js/modules/payments.js', ['action: \'savePayment\'', 'action=verifyPayment', 'PAGO_APROBADO']],
  ['js/modules/passport.js', ['action=passportEnsure', 'action=passportSaveProgress']],
  ['js/modules/patient-records.js', ['action=editPatient', 'action=deletePatient']],
  ['js/modules/shared-storage.js', ['action=getAdminKV', 'action=setAdminKV']]
];

for (const [file, needles] of contracts) {
  const content = contents.get(file) || '';
  for (const needle of needles) {
    if (content.includes(needle)) ok(`${file}: contrato ${needle}`);
    else fail(`${file}: falta contrato crítico ${needle}`);
  }
}

if (/\bTOKEN\s*=\s*["'][A-Za-z0-9_-]{20,}["']/.test(index)) {
  fail('Parece existir un token administrativo fijo incrustado en index.html');
} else {
  ok('No se detectó token administrativo fijo incrustado en index.html');
}

console.log('\nVALIDACIÓN PREPUBLICACIÓN\n');
for (const message of checks) console.log(message);

if (errors.length) {
  console.error(`\nFALLÓ: ${errors.length} problema(s):`);
  errors.forEach((message, i) => console.error(`${i + 1}. ${message}`));
  process.exit(1);
}

console.log(`\nAPROBADO: ${checks.length} controles superados.`);
