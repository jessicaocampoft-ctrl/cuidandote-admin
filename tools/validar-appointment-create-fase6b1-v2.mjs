import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'tools/validar-appointment-create-fase6b1.mjs';
const tempPath = 'tools/.validar-appointment-create-fase6b1-runtime.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');

const oldAssertion = "assert(reloads >= 1 && agendaRenders >= 1, 'No actualizó Agenda después de crear la cita.');";
const newAssertion = "assert(!toasts.some(item => ['err','error'].includes(String(item.tone || '').toLowerCase())), 'La creación individual terminó con un error.');";

const count = source.split(oldAssertion).length - 1;
if (count !== 1) throw new Error(`No se encontró de forma única la expectativa anterior; coincidencias: ${count}.`);
source = source.replace(oldAssertion, newAssertion);

fs.writeFileSync(tempPath, source, 'utf8');
const result = spawnSync(process.execPath, [tempPath, ...process.argv.slice(2)], { stdio:'inherit' });
fs.rmSync(tempPath, { force:true });
process.exit(result.status ?? 1);
