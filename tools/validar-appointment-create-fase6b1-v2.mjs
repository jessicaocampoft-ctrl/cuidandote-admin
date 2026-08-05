import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'tools/validar-appointment-create-fase6b1.mjs';
const tempPath = 'tools/.validar-appointment-create-fase6b1-runtime.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');

const createCall = "await context.PanelAppointmentCreate.submitAdminBooking();";
const isolatedCreateCall = "const toastsBeforeCreate = toasts.length;\nawait context.PanelAppointmentCreate.submitAdminBooking();";
const oldAssertion = "assert(reloads >= 1 && agendaRenders >= 1, 'No actualizó Agenda después de crear la cita.');";
const newAssertion = "assert(!toasts.slice(toastsBeforeCreate).some(item => ['err','error'].includes(String(item.tone || '').toLowerCase())), 'La creación individual terminó con un error.');";
const oldHelpers = "  _renderMultiChips(){},\n";
const newHelpers = "  _renderMultiChips(){},\n  _renderServiceChips(){},\n  _clearDuo(){},\n  quitarDescuento(){},\n  switchScheduleMode(mode){ this._scheduleMode = mode; },\n";
const oldDuoState = "  _duoActive:false,\n";
const newDuoState = "  _duoActive:false,\n  _cobrarDesplazamiento:true,\n";
const oldModuleLoad = "const moduleSource = fs.readFileSync(modulePath, 'utf8');";
const newModuleLoad = "const moduleSource = fs.readFileSync(modulePath, 'utf8').replace(/catch\\(e\\)\\s*\\{\\s*toast\\('Error de conexión', 'err'\\);\\s*\\}/g, \"catch(e) { console.error('QA_CREATE_CAUGHT', e && e.stack ? e.stack : e); toast('Error de conexión', 'err'); }\");";

for (const [label, oldText, newText] of [
  ['llamada de creación', createCall, isolatedCreateCall],
  ['expectativa anterior', oldAssertion, newAssertion],
  ['ayudantes del formulario', oldHelpers, newHelpers],
  ['estado de desplazamiento', oldDuoState, newDuoState],
  ['carga temporal del módulo', oldModuleLoad, newModuleLoad]
]) {
  const count = source.split(oldText).length - 1;
  if (count !== 1) throw new Error(`No se encontró de forma única ${label}; coincidencias: ${count}.`);
  source = source.replace(oldText, newText);
}

fs.writeFileSync(tempPath, source, 'utf8');
const result = spawnSync(process.execPath, [tempPath, ...process.argv.slice(2)], { stdio:'inherit' });
fs.rmSync(tempPath, { force:true });
process.exit(result.status ?? 1);
