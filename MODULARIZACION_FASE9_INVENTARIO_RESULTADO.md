# Inventario de modularización — Fase 9 Códigos REF y bono

- Vista delimitada: `vCodigos`.
- Funciones propias seleccionadas: **8**.
- Funciones asíncronas: **4**.
- Constantes propias detectadas: **3**.
- Estados propios detectados: **0**.
- Acciones API detectadas: **3**.
- IDs relacionados: **10**.
- Agenda y las Fases 1 a 8 permanecen fuera del alcance.

## Funciones propias seleccionadas
- `_bonosReferidorMes`
- `_mesAbrevActual`
- `generarBono` — async
- `loadTeamData` — async
- `marcarUsado` — async
- `reload` — async
- `renderCodigos`
- `updateBonosBadge`

## Manejadores declarados en la vista
- `getElementById`
- `renderCodigos`

## Constantes propias
- `BONO_VALOR`
- `BONO_MAX_MES`
- `_MES_EN`

## Estados propios
- No se detectaron estados mutables propios.

## Acciones API
- `actualizarCodigo`
- `adminData`
- `registrarCodigo`

## Funciones compartidas llamadas desde el módulo
- `esc`
- `toast`

## Controles para una posible implementación
- Crear un módulo separado solo después de confirmar este inventario.
- Mantener los mismos nombres mediante adaptadores compatibles.
- No mover Agenda, Base de datos, Pagos, Pasaporte, Equipo clínico ni navegación compartida.
- No modificar `main`, Apps Script ni el panel publicado.
