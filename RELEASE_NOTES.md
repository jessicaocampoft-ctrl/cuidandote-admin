# Liberación estable del panel

Esta rama parte de `main` y contiene únicamente:

- `index.html` auditado y corregido;
- `vendor/qrcode.min.js` para evitar la dependencia externa bloqueada por la política de seguridad.

Controles superados antes de preparar esta rama:

- 0 errores críticos y 0 advertencias en la auditoría estructural;
- 60 de 60 acciones del panel con ruta correspondiente en Apps Script;
- 31 de 31 pruebas automáticas en navegador;
- verificación real previa de inicio de sesión, creación de cita y edición manual del pasaporte.

Este archivo es informativo y no debe formar parte de la liberación final en `main`.
