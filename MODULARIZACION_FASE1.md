# Modularización del panel — Fase 1

Estado: prueba completa de navegación en rama aislada.

Objetivo de esta fase:

- crear `js/core/navigation.js`;
- mover únicamente la implementación de `showView`;
- conservar un adaptador compatible en `index.html`;
- no modificar Pagos, Pasaporte, Agenda, autenticación ni Apps Script;
- no publicar en `main` hasta completar las pruebas.

Validaciones superadas:

- extracción de la función completa;
- sintaxis de `navigation.js`;
- contrato de navegación;
- aislamiento respecto a Pagos, Pasaporte y backend;
- archivos funcionales limitados a `index.html` y `js/core/navigation.js`.

Prueba actual: recorrer las 27 vistas del menú con un DOM y datos simulados, sin usar información real.
