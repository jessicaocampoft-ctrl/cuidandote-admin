# Modularización del panel — Fase 1

Estado: validación final en rama aislada.

Objetivo de esta fase:

- crear `js/core/navigation.js`;
- mover únicamente la implementación de `showView`;
- conservar un adaptador compatible en `index.html`;
- no modificar Pagos, Pasaporte, Agenda, autenticación ni Apps Script;
- no publicar en `main` hasta completar las pruebas.

Validaciones ya superadas:

- extracción de la función completa;
- sintaxis de `navigation.js`;
- contrato de navegación;
- aislamiento respecto a Pagos, Pasaporte y backend.

Pendiente en esta ejecución: confirmar y guardar los dos archivos funcionales esperados únicamente dentro de esta rama.
