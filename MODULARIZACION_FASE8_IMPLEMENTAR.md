# Ejecutar Fase 8 — Base de datos

Separar únicamente las 18 funciones propias de pacientes y reactivación inventariadas y encapsular `_dbPacs`.

Reintento 2: la separación anterior fue descartada porque la prueba comparó una referencia textual de `team.js`; ahora se valida el orden usando las etiquetas `<script>` exactas.

Restricciones:
- no modificar `main`;
- no publicar en `admin.cuidandotefisioterapia.com`;
- no modificar Apps Script;
- no mover Crear cita, Paquetes, historial general ni Códigos REF & BONO;
- conservar los adaptadores existentes;
- confirmar que Agenda y las Fases 1 a 7 permanezcan intactas;
- detenerse ante cualquier fallo.
