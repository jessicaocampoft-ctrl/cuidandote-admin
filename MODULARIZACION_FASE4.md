# Modularización del panel — Fase 4

Estado: inventario estricto del módulo de Pagos en rama aislada.

Objetivo:

- identificar la carga, selección, registro, aprobación y rechazo de pagos;
- localizar comprobantes, estados, autorización y prevención de duplicados;
- separar después `js/modules/payments.js` conservando los nombres actuales;
- no modificar Pasaporte, Agenda, sesión ni otros módulos;
- no publicar en `main` durante esta fase.

El inventario general terminó. Ahora se ejecuta un inventario estricto basado en nombres de funciones, IDs y acciones reales.
