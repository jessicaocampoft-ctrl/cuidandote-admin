# Modularización del panel — Fase 3

Estado: extracción exacta de inicio de sesión, restauración e inactividad en rama aislada.

Objetivo:

- identificar el acceso administrativo y el portal de fisioterapeutas;
- localizar tokens, restauración y cierre de sesión;
- separar después `js/core/session.js` conservando los nombres actuales;
- no modificar Pagos, Pasaporte, Agenda ni sus llamadas específicas;
- no publicar en `main` durante esta fase.

El inventario inicial terminó. Ahora se extraen los bloques exactos antes de mover código.
