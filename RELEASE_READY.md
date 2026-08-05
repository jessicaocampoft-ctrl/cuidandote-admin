# Liberación del panel preparada

Fecha: 2026-08-04
Rama auditada: `auditoria-panel-2026-08-04`
Rama de liberación: `release-panel-estable-2026-08-04`

## Controles superados

- Auditoría estructural: 0 errores críticos y 0 advertencias.
- Contratos Panel ↔ Apps Script: 60 de 60 acciones API con ruta correspondiente.
- Prueba automática en navegador: 31 de 31 controles superados.
- Pruebas reales previas: inicio de sesión, creación de cita y edición manual del pasaporte.

## Archivos que deben pasar a la rama de liberación

- `index.html`
- `vendor/qrcode.min.js`

La rama de liberación se crea desde `main` para evitar incluir informes y herramientas de auditoría en producción.
