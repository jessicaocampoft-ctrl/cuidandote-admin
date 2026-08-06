import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let source = fs.readFileSync('tools/validar-budget-fase13-operaciones.mjs', 'utf8');
source = source.replace(
  "  renderFinanzas:() => { finance++; },",
  "  _syncPreciosToAutoFill(cfg){\n    context._preciosOverride = {\n      'Descarga Muscular — Cuello y Espalda': { Presencial: '$'+Number(cfg.sv_cuello_p||75000).toLocaleString('es-CO') },\n      'Descarga Muscular Completa': { Presencial: '$'+Number(cfg.sv_completa_p||110000).toLocaleString('es-CO') }\n    };\n  },\n  renderFinanzas:() => { finance++; },"
);
if (!source.includes("_syncPreciosToAutoFill(cfg)")) {
  throw new Error('No se agregó la dependencia compartida al entorno operativo.');
}
const tempPath = '/tmp/validar-budget-fase13-operaciones-shared-ejecutable.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
