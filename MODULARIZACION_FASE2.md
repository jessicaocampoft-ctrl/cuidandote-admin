# Modularización del panel — Fase 2

Estado: ejecución final en rama aislada.

Objetivo:

- crear `js/core/config.js` con la dirección de Apps Script;
- crear `js/core/api.js` con el control de timeout y validación JSON;
- conservar adaptadores compatibles en `index.html`;
- no modificar Pagos, Pasaporte, Agenda ni autenticación;
- no publicar en `main` durante esta fase.

Validaciones previstas:

- sintaxis de ambos módulos;
- respuesta JSON válida;
- respuesta vacía;
- respuesta inválida;
- cancelación por tiempo máximo;
- confirmación de que `navigation.js` y los módulos funcionales permanecen intactos.
