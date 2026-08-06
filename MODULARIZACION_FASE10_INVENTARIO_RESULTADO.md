# Inventario de modularización — Fase 10 Paquetes

- Vista delimitada: `vPaquetes`.
- Funciones propias seleccionadas: **11**.
- Funciones asíncronas: **0**.
- Estados propios detectados: **0**.
- Constantes propias detectadas: **0**.
- Acciones API detectadas: **0**.
- Agenda, Pagos, Finanzas, Pasaporte, Base de datos y Equipo clínico permanecen fuera del alcance.

## Funciones propias seleccionadas
- `_getPkAsignados`
- `_getPkPlantillas`
- `_savePkAsignados`
- `_savePkPlantillas`
- `abrirModalPaquete`
- `abrirModalPlantillaPaquete`
- `ajustarSesiones`
- `borrarPaqueteAsignado`
- `borrarPlantillaPaquete`
- `renderPaquetes`
- `usarSesion`

## Manejadores declarados en la vista
- `abrirModalPaquete`
- `abrirModalPlantillaPaquete`
- `renderPaquetes`

## Estados propios
- No se detectaron estados propios.

## Constantes propias
- No se detectaron constantes propias.

## Acciones API
- No se detectaron acciones API literales.

## Funciones compartidas llamadas desde el módulo
- `fmtDate`
- `kvGet`
- `kvSet`
- `parsePrecio`
- `toast`
- `today`

## Controles
- Mantener los mismos nombres mediante adaptadores compatibles.
- No mover funciones de citas, pagos, pasaporte, finanzas ni pacientes.
- No modificar `main`, Apps Script ni el panel publicado.
