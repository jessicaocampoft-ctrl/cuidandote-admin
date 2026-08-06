import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let source = fs.readFileSync('tools/validar-budget-fase13-final.mjs', 'utf8');

source = source.replace(
  "'_syncPreciosToAutoFill','_toggleEditCostos'",
  "'_toggleEditCostos'"
);

source = source.replace(
  "const originalDefaults = extractObjectConstant(base, 'COSTOS_DEFAULTS');",
  "const originalSync = extractNamedFunction(base, '_syncPreciosToAutoFill');\nassert(current.includes(originalSync), '_syncPreciosToAutoFill debe conservarse exactamente en index.html.');\nassert(!moduleSource.includes(originalSync), '_syncPreciosToAutoFill no debe duplicarse en budget.js.');\n\nconst originalDefaults = extractObjectConstant(base, 'COSTOS_DEFAULTS');"
);

source = source.replace(
  "  renderFinanzas(){ auxiliaryRenders++; },",
  "  _syncPreciosToAutoFill(cfg){\n    context._preciosOverride = {\n      'Descarga Muscular — Cuello y Espalda': { Presencial: '$'+Number(cfg.sv_cuello_p||75000).toLocaleString('es-CO') },\n      'Descarga Muscular Completa': { Presencial: '$'+Number(cfg.sv_completa_p||110000).toLocaleString('es-CO') }\n    };\n  },\n  renderFinanzas(){ auxiliaryRenders++; },"
);

source = source.replace(
  "FASE 13 VALIDADA: 19 funciones, paridad exacta, costos, migraciones, cálculos, metas y precios preservados.",
  "FASE 13 VALIDADA: 18 funciones, sincronización compartida, paridad, costos, metas y precios preservados."
);

if (source.includes("'_syncPreciosToAutoFill','_toggleEditCostos'")) {
  throw new Error('No se retiró _syncPreciosToAutoFill de la lista del módulo.');
}
if (!source.includes("_syncPreciosToAutoFill debe conservarse exactamente en index.html")) {
  throw new Error('No se agregó la verificación de la dependencia compartida.');
}
if (!source.includes("_syncPreciosToAutoFill(cfg)")) {
  throw new Error('No se agregó el doble funcional de sincronización de precios.');
}

const tempPath = '/tmp/validar-budget-fase13-shared-ejecutable.mjs';
fs.writeFileSync(tempPath, source, 'utf8');
await import(pathToFileURL(tempPath).href + `?t=${Date.now()}`);
