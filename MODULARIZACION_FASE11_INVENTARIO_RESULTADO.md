# Inventario de modularización — Fase 11 Finanzas

- Alcance: núcleo financiero, ingresos consolidados, egresos y estructura financiera.
- Funciones propias seleccionadas: **11**.
- Constantes propias seleccionadas: **5**.
- Dependencias compartidas conservadas fuera: **13**.
- IDs relacionados: **19**.
- Claves de almacenamiento detectadas: **1**.
- Pagos operativos, Comisiones, Presupuesto, Metas, Indicadores y las Fases 1 a 10 permanecen fuera del alcance.

## Funciones propias seleccionadas
- `renderFinanzas`
- `calcCobradoMes`
- `calcIngresoPaquetesMes`
- `renderEgresosList`
- `getEgresos`
- `saveEgresos`
- `guardarEgreso`
- `eliminarEgreso`
- `actualizarConceptosEgreso`
- `renderEstructuraFinanciera`
- `resRow`

## Constantes propias
- `CONCEPTOS_EGRESO`
- `COSTOS_REFERENCIA`
- `COSTO_BASE`
- `COSTO_PE`
- `COSTO_META`

## Dependencias compartidas que no se mueven
- `_checkAlertaSemanFloja`
- `_getPkAsignados`
- `citasReales`
- `fmtPeso`
- `getMeta`
- `kvGet`
- `kvSet`
- `normDate`
- `parsePrecio`
- `renderKPITablero`
- `renderMetricas`
- `toast`
- `today`

## Claves de almacenamiento
- `egresos`

## IDs relacionados
- `egresoCategoria`
- `egresoConcepto`
- `egresoDesc`
- `egresoFecha`
- `egresoMesFiltro`
- `egresoMonto`
- `egresosListResult`
- `estructuraFinResult`
- `finChart`
- `finChartLabels`
- `finProyeccionExt`
- `finResumenMes`
- `finServiciosMes`
- `metaActualTexto`
- `metaBarFinFill`
- `metaBarFinPct`
- `metaBarFinTexto`
- `metaBarFinWrap`
- `metaInputFin`

## Fuera del alcance confirmado
- KPI e indicadores: `renderKPITablero`, `renderMetricas` y funciones relacionadas.
- Metas y presupuesto: `guardarMetaFin`, `previewMetaFin`, `renderPresupuestoMetas`.
- Gestión comercial: leads, copias de gestión y encuestas.
- Informes especializados: convenios, exportaciones y análisis detallados de ingresos.
- Pagos, Agenda, Pacientes, Equipo clínico, Paquetes, Referidos y Pasaporte.

## Controles
- Conservar los mismos nombres públicos mediante adaptadores.
- No introducir llamadas nuevas al servidor.
- No modificar `main`, Apps Script ni el panel publicado.
