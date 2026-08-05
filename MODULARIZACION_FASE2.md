# Modularización del panel — Fase 2

Estado: inventario técnico en rama aislada.

Objetivo:

- identificar la configuración del backend;
- localizar las funciones comunes de comunicación con Apps Script;
- separar después `js/core/config.js` y `js/core/api.js` sin modificar Pagos, Pasaporte, Agenda ni autenticación;
- conservar las firmas actuales para que los módulos existentes sigan funcionando;
- no publicar en `main` durante esta fase.

Primero se genera un inventario exacto antes de mover código.
