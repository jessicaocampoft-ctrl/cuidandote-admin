# Inventario de modularización — Fase 12 Indicadores y KPI

- Funciones propias seleccionadas: **25**.
- Declaraciones globales seleccionadas: **23**.
- Nombres globales encapsulados: **23**.
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

## Estado y constantes propias
- `_activeKPIExplorer`
- `_cfg0`
- `_kpiServerHistory`
- `_kpiViewMonth`
- `allData`
- `APPS_SCRIPT_URL`
- `CATEGORIAS_MARKETING`
- `esRegistroServ`
- `esSesionFull`
- `esSesionIndiv`
- `KPI_CONFIG_DEFAULTS`
- `KPI_INTERACTIVE`
- `META_CAC_MAX`
- `META_CANCELACION_PCT`
- `META_ENCUESTAS`
- `META_NPS`
- `META_RETENCION_PCT`
- `META_SESIONES_SEMANA`
- `META_VENTAS_MES`
- `META_VENTAS_SEMANA`
- `TOKEN`
- `VENTANA_NUEVO_DIAS`
- `VENTANA_RETENCION`

## Declaraciones completas
- `const _cfg0 = getKPIConfig();`
- `const APPS_SCRIPT_URL = window.PanelConfig.APPS_SCRIPT_URL;`
- `const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];`
- `const esRegistroServ = s => (s || '').toLowerCase().trim().startsWith('registro');`
- `const esSesionFull = s => { const n = (s||'').toLowerCase(); return n.includes('full') || n.includes('completa'); };`
- `const esSesionIndiv = s => { const n = (s||'').toLowerCase(); return n.includes('cuello') || n.includes('pierna') || n.includes('express') || n.includes('readap') || n.includes('va…`
- `const KPI_CONFIG_DEFAULTS = { meta_sesiones_semana: 30, meta_ventas_mes: 10265000, meta_leads_min: 40, meta_leads_max: 50, meta_conv_min: 25, meta_conv_max: 35, meta_nps: 90, meta_…`
- `const KPI_INTERACTIVE = { gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'}, gkKpi2:{label:'Mix de servicios Full',action:'finanzas',a…`
- `const META_CAC_MAX = 80000;`
- `const VENTANA_NUEVO_DIAS = 180;`
- `const VENTANA_RETENCION = 60;`
- `let _activeKPIExplorer = null;`
- `let _kpiServerHistory = {};`
- `let _kpiViewMonth = null;`
- `let allData = {citas: [], bloqueos: [], eventos: []};`
- `let META_CANCELACION_PCT = _cfg0.meta_cancelacion;`
- `let META_ENCUESTAS = _cfg0.meta_encuestas;`
- `let META_NPS = _cfg0.meta_nps;`
- `let META_RETENCION_PCT = _cfg0.meta_retencion;`
- `let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;`
- `let META_VENTAS_MES = _cfg0.meta_ventas_mes;`
- `let META_VENTAS_SEMANA = Math.round(_cfg0.meta_ventas_mes / 4);`
- `let TOKEN = sessionStorage.getItem('adminToken') || '';`

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
- `getCancelMotivos` y `marcarErrorMio` siguen perteneciendo a edición de citas.
- `getEncuestaStats` y `loadEncuestaStats` siguen perteneciendo a encuestas.
- `getLeadsMes` sigue perteneciendo a gestión comercial.
- `calcCobradoMes` y `getEgresos` siguen perteneciendo a Finanzas.
- `reloadMetas` sigue siendo una dependencia externa de configuración.
- No se modifica `main`, Apps Script ni el panel publicado.
