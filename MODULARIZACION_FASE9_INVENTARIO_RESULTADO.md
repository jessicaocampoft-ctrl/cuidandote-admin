# Inventario de modularización — Fase 9 Códigos REF y bono

- Vista delimitada: `vCodigos`.
- Funciones propias seleccionadas: **6**.
- Funciones asíncronas: **2**.
- Constantes propias detectadas: **3**.
- Estados propios detectados: **0**.
- Acciones API detectadas: **2**.
- IDs relacionados: **10**.
- Agenda y las Fases 1 a 8 permanecen fuera del alcance.
- `reload` y `loadTeamData` permanecen compartidas y fuera del módulo.

## Funciones propias seleccionadas
- `_bonosReferidorMes`
- `_mesAbrevActual`
- `generarBono` — async
- `marcarUsado` — async
- `renderCodigos`
- `updateBonosBadge`

## Manejadores declarados en la vista
- `renderCodigos`

## Constantes propias
- `BONO_VALOR`
- `BONO_MAX_MES`
- `_MES_EN`

## Estados propios
- No se detectaron estados mutables propios.

## Acciones API
- `actualizarCodigo`
- `registrarCodigo`

## Funciones compartidas llamadas desde el módulo
- `esc`
- `reload`
- `toast`

## Controles para una posible implementación
- Crear un módulo separado solo después de confirmar este inventario.
- Mantener los mismos nombres mediante adaptadores compatibles.
- No mover Agenda, Base de datos, Pagos, Pasaporte, Equipo clínico ni navegación compartida.
- No modificar `main`, Apps Script ni el panel publicado.
