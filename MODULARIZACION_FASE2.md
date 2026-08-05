# Modularización del panel — Fase 2

Estado: extracción exacta de configuración y timeout en rama aislada.

Objetivo:

- identificar la configuración del backend;
- localizar las funciones comunes de comunicación con Apps Script;
- separar después `js/core/config.js` y `js/core/api.js` sin modificar Pagos, Pasaporte, Agenda ni autenticación;
- conservar las firmas actuales para que los módulos existentes sigan funcionando;
- no publicar en `main` durante esta fase.

El inventario inicial ya terminó. En esta ejecución se extraen los bloques exactos de `APPS_SCRIPT_URL`, `TOKEN` y `fetchJsonWithTimeout` antes de mover código.
