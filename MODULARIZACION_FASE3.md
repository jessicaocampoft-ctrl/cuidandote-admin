# Modularización del panel — Fase 3

Estado: extracción del runtime completo de sesiones en rama aislada.

Objetivo:

- identificar el acceso administrativo y el portal de fisioterapeutas;
- localizar tokens, restauración y cierre de sesión;
- separar después `js/core/session.js` conservando los nombres actuales;
- no modificar Pagos, Pasaporte, Agenda ni sus llamadas específicas;
- no publicar en `main` durante esta fase.

El inventario y el detalle inicial terminaron. Ahora se extraen completos la restauración automática, el cierre y la verificación de inactividad antes de mover código.
