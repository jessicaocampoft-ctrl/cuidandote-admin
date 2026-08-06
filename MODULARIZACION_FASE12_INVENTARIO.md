# Fase 12 — Inventario exacto de Indicadores y KPI

Delimitar el núcleo KPI antes de extraerlo.

- Incluir tablero, guía, configuración, valores manuales, favoritos, explorador y desgloses de indicadores.
- Encapsular únicamente el estado exclusivo del KPI.
- Mantener en `index.html` los valores compartidos con Metas, Presupuesto, Comisiones y reportes.
- Mantener fuera `renderMetricas`, encuestas, leads, pagos y comisiones.
- Conservar fuera `allData`, `APPS_SCRIPT_URL`, `TOKEN` y los clasificadores compartidos de servicios.
- No modificar código funcional, `main`, Apps Script ni el panel publicado.

Reejecución final: cinco declaraciones privadas y todas las fuentes compartidas preservadas.
