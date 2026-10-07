import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const files = [
  'index.html',
  'js/core/config.js',
  'js/core/api.js',
  'js/core/session.js',
  'js/modules/payments.js',
  'js/modules/team.js',
  'js/modules/agenda.js',
  'js/modules/appointment-create.js',
  'js/modules/appointment-edit.js',
  'js/modules/packages.js'
];

function fail(message) {
  throw new Error(`VALIDACIÓN BLOQUEADA: ${message}`);
}

for (const relative of files) {
  const full = `${root}/${relative}`;
  if (!fs.existsSync(full)) fail(`falta ${relative}`);
  if (relative.endsWith('.js')) {
    const result = spawnSync(process.execPath, ['--check', full], { encoding: 'utf8' });
    if (result.status !== 0) fail(`${relative} tiene un error de sintaxis: ${result.stderr.trim()}`);
  }
}

const html = fs.readFileSync(`${root}/index.html`, 'utf8');
const config = fs.readFileSync(`${root}/js/core/config.js`, 'utf8');
const session = fs.readFileSync(`${root}/js/core/session.js`, 'utf8');
const payments = fs.readFileSync(`${root}/js/modules/payments.js`, 'utf8');
const team = fs.readFileSync(`${root}/js/modules/team.js`, 'utf8');
const messages = fs.readFileSync(`${root}/js/modules/message-library.js`, 'utf8');
const packages = fs.readFileSync(`${root}/js/modules/packages.js`, 'utf8');

if (!config.includes('APPS_SCRIPT_URL')) fail('falta la conexión principal del servidor');
if (!config.includes('ADMIN_DATA_FALLBACK_URL')) fail('falta la ruta de respaldo de lectura');
if (!session.includes('loadAdminData')) fail('falta el cargador protegido de datos');
if (!session.includes('backupApiUrl')) fail('la sesión no tiene respaldo configurado');
if (!session.includes('urls.forEach')) fail('la carga protegida no consulta rutas disponibles en paralelo');
if (!session.includes('adminDataScore')) fail('falta la protección contra respuestas vacías de datos');
if (!payments.includes('savePaymentAndApprove') || !payments.includes('savePlanPayment')) fail('faltan acciones de pago o abono');
if (!payments.includes('operationsLoadPromise')) fail('falta el control de carga única de pagos');
if (!payments.includes('OPERATIONS_CACHE_KEY')) fail('falta el respaldo temporal de la vista de pagos');
if (!payments.includes("'tomorrow'")) fail('falta el filtro de cobros de mañana');
if (!payments.includes('planPersonalizado')) fail('falta el soporte de planes con valor libre');
if (!team.includes('teamLoadPromise')) fail('falta el control de carga de colaboradores');
if (!html.includes('js/modules/payments.js') || !html.includes('js/modules/team.js')) fail('faltan módulos críticos en el panel');
if (!html.includes('session.js?v=20261005-persistent-admin-session')) fail('la sesión no tiene una versión actualizada para evitar caché antiguo');
if (!html.includes('payments.js?v=20260929-payment-custom-plan')) fail('pagos no tiene una versión actualizada para evitar caché antiguo');
if (!html.includes('message-library.js?v=20261001-persistent-delete') || !messages.includes('_mensajesDisponibles')) fail('falta la biblioteca de atención al cliente');
if (!packages.includes('reserveSessionForAppointment') || !packages.includes('reservasCitas')) fail('falta el consecutivo de sesiones reservadas para paquetes');
if (!fs.readFileSync(`${root}/js/modules/agenda.js`, 'utf8').includes('Citas canceladas')) fail('falta la sección separada para citas canceladas');
if (!html.includes('packages.js?v=20261007-package-session-sequence') || !html.includes('agenda.js?v=20261007-cancelled-section')) fail('falta la versión de caché para agenda y paquetes');

console.log(`VALIDACIÓN APROBADA: ${files.length} archivos críticos, acceso, agenda, pagos, planes y colaboradores presentes.`);
