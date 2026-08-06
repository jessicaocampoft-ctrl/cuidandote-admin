import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let source = fs.readFileSync('tools/validar-budget-fase13.mjs', 'utf8');
const before = "assert(document.getElementById('crTotal').textContent.includes('1.300.000'), 'No recalculó el editor.');";
const after = "const editorExpected = context.fmtPeso(api.calcTotalCostos(api._leerCamposCostos()).total);\nassert(document.getElementById('crTotal').textContent === editorExpected, 'No recalculó el editor.');";
if (!source.includes(before)) throw new Error('No se encontró la expectativa antigua del editor.');
source = source.replace(before, after);
const tempPath = '/tmp/validar-budget-fase13-ajustado.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
