import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let source = fs.readFileSync('tools/modularizar-budget-fase13.mjs', 'utf8');
source = source.replace(
  "'_toggleEditCostos','_leerCamposCostos','_guardarCostos'",
  "'_syncPreciosToAutoFill','_toggleEditCostos','_leerCamposCostos','_guardarCostos'"
);
if (!source.includes("'_syncPreciosToAutoFill','_toggleEditCostos'")) {
  throw new Error('No se pudo agregar _syncPreciosToAutoFill a la extracción.');
}
const tempPath = '/tmp/modularizar-budget-fase13-v2.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
