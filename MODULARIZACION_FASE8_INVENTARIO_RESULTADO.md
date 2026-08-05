# Inventario de modularización — Fase 8 Base de datos

- Vista delimitada: `vBasedatos`.
- Funciones seleccionadas para el módulo: **25**.
- Funciones asíncronas: **3**.
- Estados compartidos detectados: **2**.
- Acciones API detectadas: **5**.
- IDs de interfaz relacionados: **31**.
- La sección Códigos REF & BONO quedó fuera del alcance de esta fase.
- No se seleccionaron funciones exactas de Agenda, Finanzas, KPI, Pagos, Pasaporte ni Equipo clínico.

## Funciones seleccionadas
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
- `agendarDesdePacienteRec`
- `usarSesion`
- `recCard`
- `recEnviado`
- `recEmailEnviado`
- `_updateReacBtn`
- `msgSemana4`
- `msgSemana5`
- `waRecordatorio`
- `logChange`
- `renderChangeLog`
- `toggleChangeLog`
- `clearChangeLog`
- `showView`

## Manejadores declarados en la vista
- `agregarPacienteDB`
- `checkDupDB`
- `clearChangeLog`
- `dbOnOrigenChange`
- `dbReferidoFilter`
- `limpiarFormDB`
- `renderBasedatos`
- `renderReactivacion`
- `showView`
- `toggleChangeLog`

## Estados que requieren encapsulación o adaptador
- `_dbPacs`
- `_notasTimer`

## Acciones API
- `adminBook`
- `deletePatient`
- `editPatient`
- `generarCodigo`
- `registrarCodigo`

## Dependencias compartidas que deben permanecer externas
- `_getPkAsignados`
- `_savePkAsignados`
- `add`
- `agendarDesdePaciente`
- `chipColor`
- `cita`
- `citas`
- `closeModal`
- `decodeURIComponent`
- `diffDias`
- `entries`
- `enviarEmailUno`
- `Error`
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
- `kvRemove`
- `kvSet`
- `localeCompare`
- `map`
- `marcarRecordatorioEnviado`
- `normDate`
- `openModal`
- `paciente`
- `Pacientes`
- `parse`
- `push`
- `reload`
- `renderPaquetes`
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
- `toLocaleString`
- `toLowerCase`
- `toUpperCase`
- `trim`
- `unshift`
- `values`
- `var`
- `waBtn`
- `waEncuesta`
- `waReacUrl`

## Controles para la implementación
- Crear `js/modules/database.js` únicamente con las funciones seleccionadas.
- Conservar adaptadores con los mismos nombres en `index.html`.
- No mover Códigos REF & BONO ni utilidades compartidas.
- Verificar que Agenda, creación/edición de citas y los módulos de las Fases 1 a 7 no cambien.
- No modificar `main`, Apps Script ni el panel publicado.
