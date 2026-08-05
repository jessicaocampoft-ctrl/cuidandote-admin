# Modularización del panel — Fase 1

Estado: reintento seguro en rama aislada.

Objetivo de esta fase:

- crear `js/core/navigation.js`;
- mover únicamente la implementación de `showView`;
- conservar un adaptador compatible en `index.html`;
- no modificar Pagos, Pasaporte, Agenda, autenticación ni Apps Script;
- no publicar en `main` hasta completar las pruebas.

Reintento: la primera ejecución extrajo correctamente la función y pasó la sintaxis; se ajustó una comprobación demasiado específica del nombre interno de Pasaporte.
