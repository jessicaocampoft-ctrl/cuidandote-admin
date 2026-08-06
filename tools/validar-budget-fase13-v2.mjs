import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const sourcePath = 'tools/validar-budget-fase13.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');
source = source.replace(
  "assert(current.indexOf('js/modules/kpi.js') < current.indexOf('js/modules/budget.js'), 'budget.js debe cargar después de kpi.js.');",
  "assert(current.indexOf('<script src=\"js/modules/kpi.js\"></script>') < current.indexOf('<script src=\"js/modules/budget.js\"></script>'), 'budget.js debe cargar después de kpi.js.');"
);
if (source.includes("current.indexOf('js/modules/kpi.js')")) {
  throw new Error('No se pudo corregir la comparación del orden de scripts.');
}
const tempPath = '/tmp/validar-budget-fase13-corregido.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
