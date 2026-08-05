# Modularización del panel — Fase 3

Estado: inventario de inicio de sesión y manejo de sesiones en rama aislada.

Objetivo:

- identificar el acceso administrativo y el portal de fisioterapeutas;
- localizar tokens, restauración y cierre de sesión;
- separar después `js/core/session.js` conservando los nombres actuales;
- no modificar Pagos, Pasaporte, Agenda ni sus llamadas específicas;
- no publicar en `main` durante esta fase.

Primero se genera un inventario exacto antes de mover código.
