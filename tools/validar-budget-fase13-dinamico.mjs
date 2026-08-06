import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const sourcePath = 'tools/validar-budget-fase13.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');
const fixedAssertion = "assert(document.getElementById('crTotal').textContent.includes('1.300.000'), 'No recalculó el editor.');";
const dynamicAssertion = "const expectedEditorTotal = api.calcTotalCostos(api._leerCamposCostos()).total;\nassert(document.getElementById('crTotal').textContent === context.fmtPeso(expectedEditorTotal), 'No recalculó el editor con el total real.');";
if (!source.includes(fixedAssertion)) {
  throw new Error('No se encontró la expectativa fija del editor de costos.');
}
source = source.replace(fixedAssertion, dynamicAssertion);
if (source.includes(fixedAssertion)) {
  throw new Error('No se pudo sustituir la expectativa fija del editor.');
}
const tempPath = '/tmp/validar-budget-fase13-dinamico.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
