# Inventario de modularización — Fase 12 Indicadores y KPI

- Funciones propias seleccionadas: **25**.
- Declaraciones privadas seleccionadas: **5**.
- Variables KPI compartidas conservadas en index: **12**.
- Variables de plataforma conservadas fuera: **6**.
- Dependencias funcionales externas conservadas: **19**.
- `renderMetricas`, encuestas, presupuesto, metas financieras, leads, pagos y comisiones permanecen fuera.

## Funciones propias
- `_formatKPIValue`
- `_kpiCardGuia`
- `_kpiRow`
- `_kpiSnapshot`
- `applyKPIFavorites`
- `applyKPIRefSpans`
- `calcBDActualizada`
- `changeKPIMonth`
- `closeKPIExplorer`
- `getKPIConfig`
- `getKPIManual`
- `guardarKPIConfig`
- `guardarKPIManual`
- `initKPIExplorer`
- `loadKPIHistoryFromServer` — async
- `openKPIExplorer`
- `renderKPIGuia`
- `renderKPITablero`
- `saveKPIManual`
- `saveKPINote`
- `scrollToKPICard`
- `toggleKPICard`
- `toggleKPIFavorite`
- `_renderBDBreakdown`
- `_renderCancelBreakdown`

## Estado privado que sí se encapsula
- `_activeKPIExplorer`
- `_kpiServerHistory`
- `_kpiViewMonth`
- `KPI_CONFIG_DEFAULTS`
- `KPI_INTERACTIVE`

## Estado KPI compartido que permanece en index
- `_cfg0`
- `CATEGORIAS_MARKETING`
- `META_CAC_MAX`
- `META_CANCELACION_PCT`
- `META_ENCUESTAS`
- `META_NPS`
- `META_RETENCION_PCT`
- `META_SESIONES_SEMANA`
- `META_VENTAS_MES`
- `META_VENTAS_SEMANA`
- `VENTANA_NUEVO_DIAS`
- `VENTANA_RETENCION`

## Variables de plataforma conservadas fuera
- `allData`
- `APPS_SCRIPT_URL`
- `TOKEN`
- `esRegistroServ`
- `esSesionFull`
- `esSesionIndiv`

## Dependencias externas conservadas
- `_normStr`
- `calcCobradoMes`
- `citasReales`
- `esCancelExcluida`
- `fmtPeso`
- `getCancelMotivos`
- `getEgresos`
- `getEncuestaStats`
- `getLeadsMes`
- `kvGet`
- `kvSet`
- `loadEncuestaStats`
- `marcarErrorMio`
- `normDate`
- `parsePrecio`
- `reloadMetas`
- `renderEmergencia`
- `showView`
- `toast`

## Límites confirmados
- Los valores META_* continúan disponibles para Metas, Presupuesto, Comisiones y reportes.
- `getCancelMotivos` y `marcarErrorMio` siguen perteneciendo a edición de citas.
- `getEncuestaStats` y `loadEncuestaStats` siguen perteneciendo a encuestas.
- `getLeadsMes` sigue perteneciendo a gestión comercial.
- `calcCobradoMes` y `getEgresos` siguen perteneciendo a Finanzas.
- No se modifica `main`, Apps Script ni el panel publicado.
