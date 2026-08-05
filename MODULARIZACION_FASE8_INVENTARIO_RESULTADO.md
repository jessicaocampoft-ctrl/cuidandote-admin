# Inventario de modularización — Fase 8 Base de datos

- Vista delimitada: `vBasedatos`.
- Funciones propias seleccionadas: **18**.
- Funciones asíncronas: **3**.
- Estados propios detectados: **1**.
- Acciones API detectadas: **5**.
- IDs de interfaz relacionados: **31**.
- Códigos REF & BONO quedó fuera del alcance.
- Crear cita, Paquetes, historial general, navegación, Agenda, Finanzas, KPI, Pagos, Pasaporte y Equipo clínico permanecen externos.

## Funciones propias seleccionadas
- `initFormDB`
- `renderBasedatos`
- `renderReactivacion`
- `limpiarFormDB`
- `agregarPacienteDB` — async
- `checkDupDB`
- `dbEditarPac`
- `guardarPacienteDB` — async
- `dbBorrarPac` — async
- `dbOnOrigenChange`
- `dbReferidoFilter`
- `recCard`
- `recEnviado`
- `recEmailEnviado`
- `_updateReacBtn`
- `msgSemana4`
- `msgSemana5`
- `waRecordatorio`

## Manejadores de la vista
- `agregarPacienteDB`
- `checkDupDB`
- `clearChangeLog` — compartido, no se mueve
- `dbOnOrigenChange`
- `dbReferidoFilter`
- `limpiarFormDB`
- `renderBasedatos`
- `renderReactivacion`
- `showView` — compartido, no se mueve
- `toggleChangeLog` — compartido, no se mueve

## Estado propio que se encapsulará
- `_dbPacs`

## Acciones API
- `adminBook`
- `deletePatient`
- `editPatient`
- `generarCodigo`
- `registrarCodigo`

## Dependencias compartidas que permanecen externas
- `add`
- `agendarDesdePaciente`
- `agendarDesdePacienteRec`
- `chipColor`
- `cita`
- `citas`
- `closeModal`
- `decodeURIComponent`
- `diffDias`
- `entries`
- `enviarEmailUno`
- `esRegistroServ`
- `filter`
- `find`
- `floor`
- `fmtDate`
- `forEach`
- `getDate`
- `getElementById`
- `has`
- `includes`
- `indexOf`
- `initDashboard`
- `join`
- `json`
- `kvGet`
- `localeCompare`
- `logChange`
- `map`
- `marcarRecordatorioEnviado`
- `normDate`
- `openModal`
- `paciente`
- `Pacientes`
- `parse`
- `push`
- `reload`
- `replace`
- `rgba`
- `Set`
- `setAttribute`
- `setDate`
- `slice`
- `sort`
- `split`
- `stringify`
- `toast`
- `today`
- `toLocalDateStr`
- `toLowerCase`
- `toUpperCase`
- `trim`
- `values`
- `var`
- `waBtn`
- `waEncuesta`
- `waReacUrl`

## Funciones verificadas como externas
- `showView`
- `agendarDesdePacienteRec`
- `usarSesion`
- `logChange`
- `renderChangeLog`
- `toggleChangeLog`
- `clearChangeLog`

## Controles para la implementación
- Crear `js/modules/database.js` solo con pacientes y reactivación.
- Conservar adaptadores con los mismos nombres en `index.html`.
- No mover los puentes de Crear cita, Paquetes ni historial general.
- Verificar que Agenda y los módulos de las Fases 1 a 7 no cambien.
- No modificar `main`, Apps Script ni el panel publicado.
