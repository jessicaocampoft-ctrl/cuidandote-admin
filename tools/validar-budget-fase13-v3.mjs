import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let source = fs.readFileSync('tools/validar-budget-fase13.mjs', 'utf8');
source = source.replace(
  "'_toggleEditCostos','_leerCamposCostos','_guardarCostos'",
  "'_syncPreciosToAutoFill','_toggleEditCostos','_leerCamposCostos','_guardarCostos'"
);
source = source.replace(
  "assert(current.indexOf('js/modules/kpi.js') < current.indexOf('js/modules/budget.js'), 'budget.js debe cargar después de kpi.js.');",
  "assert(current.indexOf('<script src=\"js/modules/kpi.js\"></script>') < current.indexOf('<script src=\"js/modules/budget.js\"></script>'), 'budget.js debe cargar después de kpi.js.');"
);
source = source.replace(
  "kvSet:(key,value) => store.set(key, String(value)),",
  "kvSet:(key,value) => { store.set(key, String(value)); if (key === 'kpiConfig') kpiConfig = JSON.parse(String(value)); },"
);
if (!source.includes("'_syncPreciosToAutoFill','_toggleEditCostos'")) throw new Error('No se agregó _syncPreciosToAutoFill a la validación.');
if (source.includes("current.indexOf('js/modules/kpi.js')")) throw new Error('No se corrigió el orden de scripts.');
const tempPath = '/tmp/validar-budget-fase13-v3.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
