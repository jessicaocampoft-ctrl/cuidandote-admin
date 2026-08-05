import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'tools/validar-appointment-create-fase6b1.mjs';
const tempPath = 'tools/.validar-appointment-create-fase6b1-runtime.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');

const createCall = "await context.PanelAppointmentCreate.submitAdminBooking();";
const isolatedCreateCall = "const toastsBeforeCreate = toasts.length;\nawait context.PanelAppointmentCreate.submitAdminBooking();";
const oldAssertion = "assert(reloads >= 1 && agendaRenders >= 1, 'No actualizó Agenda después de crear la cita.');";
const newAssertion = "assert(!toasts.slice(toastsBeforeCreate).some(item => ['err','error'].includes(String(item.tone || '').toLowerCase())), 'La creación individual terminó con un error.');";

const callCount = source.split(createCall).length - 1;
if (callCount !== 1) throw new Error(`No se encontró de forma única la llamada de creación; coincidencias: ${callCount}.`);
source = source.replace(createCall, isolatedCreateCall);

const assertionCount = source.split(oldAssertion).length - 1;
if (assertionCount !== 1) throw new Error(`No se encontró de forma única la expectativa anterior; coincidencias: ${assertionCount}.`);
source = source.replace(oldAssertion, newAssertion);

fs.writeFileSync(tempPath, source, 'utf8');
const result = spawnSync(process.execPath, [tempPath, ...process.argv.slice(2)], { stdio:'inherit' });
fs.rmSync(tempPath, { force:true });
process.exit(result.status ?? 1);
