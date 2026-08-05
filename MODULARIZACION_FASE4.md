# Modularización del panel — Fase 4

Estado: inventario del módulo de Pagos en rama aislada.

Objetivo:

- identificar la carga, selección, registro, aprobación y rechazo de pagos;
- localizar comprobantes, estados, autorización y prevención de duplicados;
- separar después `js/modules/payments.js` conservando los nombres actuales;
- no modificar Pasaporte, Agenda, sesión ni otros módulos;
- no publicar en `main` durante esta fase.

Primero se genera un inventario exacto antes de mover código.
