# Inventario Fase 21 — Operación de agenda

- Funciones candidatas: **330**.
- Declaraciones candidatas: **7**.

## Funciones

### esc

- Línea: 6219
- Tamaño: 157535 caracteres
- Llamadas: `Array`, `Blob`, `CITA`, `CONVENIOS`, `Date`, `ESPERA`, `EVENTO`, `EVENTOS`, `Error`, `Map`, `Number`, `PERSONA`, `Pacientes`, `SEMANAL`, `Set`, `String`, `URL`, `URLSearchParams`, `_actionIcon`, `_addMultiDate`, `_addToServiceChips`, `_animateCounter`, `_animateDashStats`, `_calcRecDates`, `_checkAlertaSemanFloja`, `_clearDuo`, `_daysSince`, `_formatKPIValue`, `_getPrecioServicio`, `_getServiceDurationJS`, `_getWaitList`, `_initSidebarState`, `_kpiSnapshot`, `_normStr`, `_onDuo2ServiceChange`, `_opsItem`, `_removeMultiDate`, `_removeServiceChip`, `_renderDesplazamientoBtn`, `_renderMultiChips`, `_renderServiceChips`, `_runUrlRepairIfRequested`, `_saveWaitList`, `_sessionBridge`, `_showDescResult`, `_showEditDescResult`, `_showTableSkeleton`, `_syncDuoTimeDisplay`, `_syncMobileNav`, `_syncWaitList`, `_triggerAddService`, `_updateDuoTime`, `_updateMobBadge`, `_updateRecPreview`, `_updateSubmitLabel`, `_verCobrosPendientes`, `_verCobrosPendientesSemana`, `abrirAsignarPro`, `abrirEditarEvento`, `abrirModalPago`, `abrirPagoCita`, `abs`, `activeProfessionals`, `actual`, `actualizar`, `actualizarMetaBarra`, `add`, `addEventListener`, `addWaitPatient`, `adminScheduleRanges`, `adminTimeToMinutes`, `agendarDesdePaciente`, `agendarHoy`, `all`, `anterior`, `append`, `appendChild`, `applyKPIFavorites`, `applyRoleRestrictions`, `appointmentHealth`, `assignmentFor`, `async`, `authorizeAssignPro`, `autoFillPrice`, `backToAdminLogin`, `bind`, `bookWaitPatient`, `byIdFrom`, `calcAbono`, `calcConvenio`, `calcDescuento`, `calcDescuentoEdit`, `calcDescuentoMonto`, `calcDescuentoMontoEdit`, `calcDuracion`, `cambiarPassword`, `cancelarCita`, `catch`, `cerrarModalEditarEvento`, `cerrarModalPago`, `changeProfessionalPassword`, `changeStatus`, `charAt`, `checkDomicilioWarn`, `checkDupDB`, `checkTimeConflict`, `checkUpcomingAlerts`, `chipState`, `cita`, `citas`, `citasReales`, `clearChangeLog`, `clearEvento`, `clearFilters`, `clearInterval`, `clearNuevaCita`, `clearPaymentForm`, `click`, `closeKPIExplorer`, `closeModal`, `closest`, `cobro`, `confirm`, `confirmarCancelacion`, `confirmarPago`, `confirmarReagendar`, `contains`, `copyTempPassword`, `createElement`, `createObjectURL`, `currentAdminRoleKey`, `deletePro`, `desplazamiento`, `doAdminLogin`, `doBlock`, `doLogin`, `doProfessionalLogin`, `doUnblock`, `downloadOperationsCSV`, `easeOut`, `editarCita`, `eeeCalcDuracion`, `eeeEliminar`, `eeeGuardar`, `eliminarEvento`, `encodeURIComponent`, `entries`, `esCancelExcluida`, `esCobrada`, `esCobrada_UNUSED`, `esRegistroServ`, `evento`, `exportOperationsAuditCSV`, `exportPaymentsCSV`, `exportarAgendaDia`, `fetch`, `fetchJsonWithTimeout`, `fill`, `fillPatient`, `fillPaymentSelectors`, `filter`, `filtrarDia`, `filtrarHoy`, `find`, `floor`, `fmtDate`, `fmtPeso`, `focus`, `fono`, `for`, `forEach`, `formatPrecio`, `from`, `function`, `get`, `getAbonoNota`, `getCancelMotivo`, `getCancelMotivos`, `getDate`, `getDay`, `getDuracionStr`, `getElementById`, `getFullYear`, `getInfoSesion`, `getItem`, `getMetodoPago`, `getMonth`, `getPrecioFinal`, `getPrecioFinalEdit`, `getTime`, `globalSearch`, `goAgendaPatient`, `guardarEdicion`, `guardarNotaAdmin`, `has`, `if`, `includes`, `indexOf`, `initAdminUX2026`, `initDashboard`, `initFunctionalModules2026`, `initKPIExplorer`, `initQuickNotes`, `insertAdjacentElement`, `installAdminGuards`, `isAuxAdmin`, `isMidnightTime`, `isNaN`, `isOperationalDate`, `isPagada`, `join`, `json`, `kvGet`, `kvRemove`, `kvSet`, `loadAdminKV`, `loadAutomationCenter`, `loadKPIHistoryFromServer`, `loadOperationsData`, `loadProfessionalAgenda`, `loadTeamData`, `localeCompare`, `logChange`, `logout`, `logoutAdmin`, `logoutProfessional`, `makeLink`, `map`, `mapa`, `marcarErrorMio`, `markAutomationMessage`, `markPayablePaid`, `markProfessionalAttended`, `markWaSent`, `match`, `max`, `min`, `n`, `normDate`, `normHHMM`, `normalize`, `now`, `object`, `obligatorios`, `ocurridas`, `onConvenioChange`, `onServiceMainChange`, `onServicePlanChange`, `open`, `openCambiarPassword`, `openEvalExpress`, `openKPIExplorer`, `openPago`, `openProIssue`, `openProfessionalForm`, `openProfessionalLoginMode`, `openProfessionalSchedule`, `ordinalES`, `paciente`, `pad`, `padStart`, `pagoBadge`, `parse`, `parseFloat`, `parseInt`, `parsePrecio`, `parsePrecioNum`, `patientInsightHtml`, `paymentAccountLabel`, `paymentCandidateAppointments`, `pow`, `prefillPaymentFromAppointment`, `preventDefault`, `professionalName`, `professionalSignout`, `push`, `querySelector`, `querySelectorAll`, `quitarDescuento`, `quitarDescuentoEdit`, `random`, `readPaymentProofFile`, `reales`, `reduce`, `reload`, `reloadMetas`, `remove`, `removeItem`, `removeWaitPatient`, `renderAgenda`, `renderAssignWarnings`, `renderAutomationLogs`, `renderAutomationQueue`, `renderBloqueos`, `renderCalendar`, `renderCentroAcciones`, `renderChangeLog`, `renderCitasResumen`, `renderConveniosReport`, `renderEquipo`, `renderFinanzas`, `renderIngresosDetalle`, `renderPacientes`, `renderPagos`, `renderPaymentAppointmentList`, `renderProfessionalAgenda`, `renderSmartBriefing`, `renderSmartCobrosCenter`, `renderTareas`, `renderTeamOperations`, `renderWaitList`, `renderWeekGrid`, `repeat`, `replace`, `requestAnimationFrame`, `resetProPassword`, `restoreOnLoad`, `resumenDiaWA`, `return`, `revokeObjectURL`, `rgba`, `round`, `row`, `runAutomationJob`, `saveAssignPro`, `saveAutomationSettings`, `saveCancelMotivo`, `saveKPINote`, `saveManualPayment`, `saveProfessionalForm`, `searchPatient`, `seguimientoWA`, `seguro`, `selectPaymentAppointment`, `sendProfessionalIssue`, `servidor`, `sesionBadge`, `set`, `setAttribute`, `setDate`, `setDelta`, `setHours`, `setInterval`, `setItem`, `setProfessionalMode`, `setTimeout`, `setupAutomations`, `setupOperationsModuleUI`, `showOnlyScreen`, `showProfessionalApp`, `showTemporaryPassword`, `showView`, `slice`, `smartAgendaFilter`, `smartBriefingData`, `smartCobroWhatsApp`, `smartDate`, `smartIsActiveAppointment`, `smartIsPaid`, `smartPatientKey`, `smartPeso`, `smartWeekBounds`, `some`, `sort`, `splice`, `split`, `startsWith`, `stopPropagation`, `stringify`, `submitAdminBooking`, `submitAdminBookingMulti`, `submitEvento`, `switchNuevaMode`, `switchScheduleMode`, `teamAppointmentById`, `teamAssignedAppointments`, `teamAvailabilityDays`, `teamAvailabilityIssues`, `teamAvailabilityRange`, `teamCleanText`, `teamConflictAppointments`, `teamDateCode`, `teamIsInactiveAppointment`, `teamTimeToMinutes`, `test`, `then`, `timeHumanLabel`, `toDateStr`, `toISOString`, `toLocalDateStr`, `toLocaleDateString`, `toLocaleString`, `toLowerCase`, `toS`, `toString`, `toUpperCase`, `toast`, `today`, `toggle`, `toggleAbonoPanel`, `toggleChangeLog`, `toggleCobrarDesplazamiento`, `toggleDescuento`, `toggleDescuentoEdit`, `toggleDesplazamientoBtn`, `toggleKPIFavorite`, `toggleNcAddress`, `togglePro`, `toggleReagendar`, `toggleRecurringPanel`, `toggleSegundaPersona`, `toggleSidebar`, `toggleSidebarCollapse`, `trim`, `unshift`, `updateBadge`, `updateBonosBadge`, `updatePaymentProofLabel`, `updateProfileCard`, `updateSelectedPaymentCard`, `updateSesionesInfo`, `updateTimeHelp`, `validateBusinessSchedule`, `validateNoMidnight`, `value`, `values`, `var`, `vencido`, `verDetalle`, `verHistorial`, `verHistorialPac`, `verifyPayment`, `visible`, `waAmPm`, `waBtn`, `waEncuesta`, `waFechaES`, `waLink`, `waLinkRec`, `waLinkSeg`, `waNombre`, `wasWaSent`

### _sessionBridge

- Línea: 6258
- Tamaño: 1947 caracteres
- Llamadas: `Date`, `_initSidebarState`, `_runUrlRepairIfRequested`, `async`, `bind`, `getElementById`, `if`, `initAdminUX2026`, `initDashboard`, `loadAdminKV`, `loadProfessionalAgenda`, `loadTeamData`, `logout`, `reload`, `reloadMetas`, `showProfessionalApp`, `toLocaleDateString`

### byIdFrom

- Línea: 6313
- Tamaño: 240 caracteres
- Llamadas: `Error`, `if`

### assignmentFor

- Línea: 6321
- Tamaño: 260 caracteres
- Llamadas: `Error`, `if`

### professionalName

- Línea: 6329
- Tamaño: 272 caracteres
- Llamadas: `Error`, `if`

### activeProfessionals

- Línea: 6345
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### teamCleanText

- Línea: 6353
- Tamaño: 260 caracteres
- Llamadas: `Error`, `if`

### teamAppointmentById

- Línea: 6361
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### teamAssignedAppointments

- Línea: 6369
- Tamaño: 304 caracteres
- Llamadas: `Error`, `if`

### teamIsInactiveAppointment

- Línea: 6377
- Tamaño: 308 caracteres
- Llamadas: `Error`, `if`

### teamDateCode

- Línea: 6385
- Tamaño: 256 caracteres
- Llamadas: `Error`, `if`

### teamAvailabilityDays

- Línea: 6393
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### teamTimeToMinutes

- Línea: 6401
- Tamaño: 276 caracteres
- Llamadas: `Error`, `if`

### teamAvailabilityRange

- Línea: 6409
- Tamaño: 292 caracteres
- Llamadas: `Error`, `if`

### teamAvailabilityIssues

- Línea: 6417
- Tamaño: 296 caracteres
- Llamadas: `Error`, `if`

### teamConflictAppointments

- Línea: 6425
- Tamaño: 304 caracteres
- Llamadas: `Error`, `if`

### renderTeamOperations

- Línea: 6433
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### renderEquipo

- Línea: 6441
- Tamaño: 256 caracteres
- Llamadas: `Error`, `if`

### openProfessionalSchedule

- Línea: 6449
- Tamaño: 304 caracteres
- Llamadas: `Error`, `if`

### openProfessionalForm

- Línea: 6457
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### showTemporaryPassword

- Línea: 6465
- Tamaño: 292 caracteres
- Llamadas: `Error`, `if`

### abrirAsignarPro

- Línea: 6513
- Tamaño: 268 caracteres
- Llamadas: `Error`, `if`

### renderAssignWarnings

- Línea: 6521
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### paymentAccountLabel

- Línea: 6570
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### paymentCandidateAppointments

- Línea: 6578
- Tamaño: 318 caracteres
- Llamadas: `Error`, `if`

### renderPaymentAppointmentList

- Línea: 6586
- Tamaño: 318 caracteres
- Llamadas: `Error`, `if`

### selectPaymentAppointment

- Línea: 6594
- Tamaño: 302 caracteres
- Llamadas: `Error`, `if`

### updateSelectedPaymentCard

- Línea: 6602
- Tamaño: 306 caracteres
- Llamadas: `Error`, `if`

### updatePaymentProofLabel

- Línea: 6610
- Tamaño: 298 caracteres
- Llamadas: `Error`, `if`

### fillPaymentSelectors

- Línea: 6618
- Tamaño: 286 caracteres
- Llamadas: `Error`, `if`

### prefillPaymentFromAppointment

- Línea: 6626
- Tamaño: 322 caracteres
- Llamadas: `Error`, `if`

### clearPaymentForm

- Línea: 6634
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### abrirPagoCita

- Línea: 6642
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### renderPagos

- Línea: 6674
- Tamaño: 250 caracteres
- Llamadas: `Error`, `if`

### openPago

- Línea: 6682
- Tamaño: 238 caracteres
- Llamadas: `Error`, `if`

### exportPaymentsCSV

- Línea: 6700
- Tamaño: 595 caracteres
- Llamadas: `downloadOperationsCSV`, `forEach`, `paymentAccountLabel`, `push`, `today`

### setProfessionalMode

- Línea: 6745
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### renderProfessionalAgenda

- Línea: 6753
- Tamaño: 304 caracteres
- Llamadas: `Error`, `if`

### openProIssue

- Línea: 6769
- Tamaño: 256 caracteres
- Llamadas: `Error`, `if`

### initFunctionalModules2026

- Línea: 7039
- Tamaño: 7566 caracteres
- Llamadas: `addWaitPatient`, `appendChild`, `createElement`, `getElementById`, `if`, `initKPIExplorer`, `insertAdjacentElement`, `join`, `loadAutomationCenter`, `makeLink`, `map`, `remove`, `renderCentroAcciones`, `renderWaitList`, `runAutomationJob`, `saveAutomationSettings`, `setupAutomations`, `showView`, `var`

### initKPIExplorer

- Línea: 7123
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### _kpiSnapshot

- Línea: 7134
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### _formatKPIValue

- Línea: 7150
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### openKPIExplorer

- Línea: 7158
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### closeKPIExplorer

- Línea: 7166
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### saveKPINote

- Línea: 7173
- Tamaño: 254 caracteres
- Llamadas: `Error`, `if`

### toggleKPIFavorite

- Línea: 7180
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### applyKPIFavorites

- Línea: 7187
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### applyRoleRestrictions

- Línea: 7200
- Tamaño: 128 caracteres
- Llamadas: ninguna

### renderCentroAcciones

- Línea: 7229
- Tamaño: 3523 caracteres
- Llamadas: `Map`, `Set`, `String`, `_daysSince`, `_normStr`, `_opsItem`, `add`, `encodeURIComponent`, `esRegistroServ`, `esc`, `filter`, `forEach`, `get`, `getElementById`, `goAgendaPatient`, `has`, `if`, `isOperationalDate`, `isPagada`, `join`, `normDate`, `push`, `replace`, `set`, `showView`, `slice`, `today`, `trim`, `values`

### goAgendaPatient

- Línea: 7286
- Tamaño: 265 caracteres
- Llamadas: `Error`, `if`

### _getWaitList

- Línea: 7295
- Tamaño: 129 caracteres
- Llamadas: `catch`, `getItem`, `parse`

### _saveWaitList

- Línea: 7299
- Tamaño: 93 caracteres
- Llamadas: `setItem`, `stringify`

### bookWaitPatient

- Línea: 7333
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### getPrecioFinal

- Línea: 7567
- Tamaño: 503 caracteres
- Llamadas: `formatPrecio`, `getElementById`, `if`, `max`, `parseFloat`, `parsePrecio`, `round`

### agendarHoy

- Línea: 7580
- Tamaño: 267 caracteres
- Llamadas: `Error`, `if`

### calcAbono

- Línea: 7723
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### switchScheduleMode

- Línea: 7755
- Tamaño: 386 caracteres
- Llamadas: `_updateSubmitLabel`, `forEach`, `getElementById`, `if`, `toggle`

### _updateSubmitLabel

- Línea: 7766
- Tamaño: 739 caracteres
- Llamadas: `getElementById`, `if`, `parseInt`

### validateNoMidnight

- Línea: 7819
- Tamaño: 299 caracteres
- Llamadas: `Error`, `if`

### validateBusinessSchedule

- Línea: 7848
- Tamaño: 637 caracteres
- Llamadas: `_getServiceDurationJS`, `adminScheduleRanges`, `adminTimeToMinutes`, `if`, `some`, `toast`, `validateNoMidnight`

### _addMultiDate

- Línea: 7861
- Tamaño: 673 caracteres
- Llamadas: `_renderMultiChips`, `_updateSubmitLabel`, `find`, `getElementById`, `if`, `localeCompare`, `push`, `sort`, `toast`, `updateTimeHelp`, `validateNoMidnight`

### _removeMultiDate

- Línea: 7876
- Tamaño: 111 caracteres
- Llamadas: `_renderMultiChips`, `_updateSubmitLabel`, `splice`

### _renderMultiChips

- Línea: 7882
- Tamaño: 757 caracteres
- Llamadas: `Date`, `_removeMultiDate`, `getDay`, `getElementById`, `if`, `join`, `map`, `split`

### toggleReagendar

- Línea: 7951
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### filtrarDia

- Línea: 7991
- Tamaño: 245 caracteres
- Llamadas: `Error`, `if`

### waNombre

- Línea: 8039
- Tamaño: 259 caracteres
- Llamadas: `Error`, `if`

### waFechaES

- Línea: 8047
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### waAmPm

- Línea: 8055
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### ordinalES

- Línea: 8063
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### getInfoSesion

- Línea: 8071
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### waLink

- Línea: 8079
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### waLinkRec

- Línea: 8087
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### waLinkSeg

- Línea: 8095
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### smartAgendaFilter

- Línea: 8228
- Tamaño: 273 caracteres
- Llamadas: `Error`, `if`

### initDashboard

- Línea: 8426
- Tamaño: 7587 caracteres
- Llamadas: `Date`, `Set`, `_checkAlertaSemanFloja`, `actualizarMetaBarra`, `appointmentHealth`, `changeStatus`, `checkUpcomingAlerts`, `chipState`, `citas`, `citasReales`, `clearInterval`, `esc`, `filter`, `fmtDate`, `getDate`, `getDay`, `getElementById`, `getFullYear`, `getMonth`, `if`, `initQuickNotes`, `join`, `localeCompare`, `map`, `normDate`, `ocurridas`, `pagoBadge`, `parsePrecio`, `reduce`, `renderSmartBriefing`, `renderSmartCobrosCenter`, `renderTareas`, `renderWeekGrid`, `setDate`, `setHours`, `setInterval`, `setTimeout`, `slice`, `sort`, `split`, `toLocaleString`, `toLowerCase`, `today`, `trim`, `updateBadge`, `updateBonosBadge`, `updateProfileCard`, `var`, `verDetalle`, `waBtn`, `waLink`

### renderAgenda

- Línea: 8666
- Tamaño: 253 caracteres
- Llamadas: `Error`, `if`

### clearFilters

- Línea: 8674
- Tamaño: 253 caracteres
- Llamadas: `Error`, `if`

### filtrarHoy

- Línea: 8682
- Tamaño: 245 caracteres
- Llamadas: `Error`, `if`

### resumenDiaWA

- Línea: 8698
- Tamaño: 1366 caracteres
- Llamadas: `Date`, `cita`, `citasReales`, `encodeURIComponent`, `evento`, `filter`, `forEach`, `if`, `join`, `localeCompare`, `normDate`, `open`, `push`, `sort`, `toLocaleDateString`, `toast`, `today`

### agendarDesdePaciente

- Línea: 8727
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### verDetalle

- Línea: 8751
- Tamaño: 264 caracteres
- Llamadas: `Error`, `if`

### cancelarCita

- Línea: 8768
- Tamaño: 272 caracteres
- Llamadas: `Error`, `if`

### getCancelMotivos

- Línea: 8784
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### saveCancelMotivo

- Línea: 8792
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### getCancelMotivo

- Línea: 8800
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### esCancelExcluida

- Línea: 8809
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### marcarErrorMio

- Línea: 8817
- Tamaño: 280 caracteres
- Llamadas: `Error`, `if`

### editarCita

- Línea: 8826
- Tamaño: 264 caracteres
- Llamadas: `Error`, `if`

### toggleDescuentoEdit

- Línea: 8834
- Tamaño: 300 caracteres
- Llamadas: `Error`, `if`

### calcDescuentoEdit

- Línea: 8841
- Tamaño: 292 caracteres
- Llamadas: `Error`, `if`

### calcDescuentoMontoEdit

- Línea: 8848
- Tamaño: 312 caracteres
- Llamadas: `Error`, `if`

### _showEditDescResult

- Línea: 8855
- Tamaño: 300 caracteres
- Llamadas: `Error`, `if`

### quitarDescuentoEdit

- Línea: 8862
- Tamaño: 300 caracteres
- Llamadas: `Error`, `if`

### getPrecioFinalEdit

- Línea: 8869
- Tamaño: 296 caracteres
- Llamadas: `Error`, `if`

### renderBloqueos

- Línea: 8893
- Tamaño: 627 caracteres
- Llamadas: `doUnblock`, `esc`, `fmtDate`, `getElementById`, `if`, `join`, `map`

### toggleNcAddress

- Línea: 8942
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### _updateDuoTime

- Línea: 9061
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### checkDomicilioWarn

- Línea: 9137
- Tamaño: 299 caracteres
- Llamadas: `Error`, `if`

### updateSesionesInfo

- Línea: 9187
- Tamaño: 299 caracteres
- Llamadas: `Error`, `if`

### onConvenioChange

- Línea: 9218
- Tamaño: 763 caracteres
- Llamadas: `calcConvenio`, `getElementById`, `if`

### calcConvenio

- Línea: 9236
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### renderConveniosReport

- Línea: 9245
- Tamaño: 2961 caracteres
- Llamadas: `entries`, `filter`, `fmtPeso`, `forEach`, `getElementById`, `if`, `normDate`, `parsePrecioNum`, `startsWith`, `var`

### autoFillPrice

- Línea: 9334
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### switchNuevaMode

- Línea: 9345
- Tamaño: 401 caracteres
- Llamadas: `getElementById`, `toggle`

### clearEvento

- Línea: 9417
- Tamaño: 308 caracteres
- Llamadas: `forEach`, `getElementById`, `if`

### cerrarModalEditarEvento

- Línea: 9449
- Tamaño: 109 caracteres
- Llamadas: `getElementById`

### abrirEditarEvento

- Línea: 9453
- Tamaño: 1300 caracteres
- Llamadas: `eeeCalcDuracion`, `find`, `getElementById`, `if`, `normDate`, `normHHMM`, `parsePrecio`, `requestAnimationFrame`, `toLocaleString`, `toast`

### fillPatient

- Línea: 9607
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### clearNuevaCita

- Línea: 9623
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### checkDupDB

- Línea: 9632
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### checkTimeConflict

- Línea: 9641
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### exportarHistorialPaciente

- Línea: 9818
- Tamaño: 108777 caracteres
- Llamadas: `Array`, `Blob`, `CAC`, `Canceladas`, `Date`, `Error`, `Express`, `Full`, `Muscular`, `NPS`, `Number`, `PACIENTE`, `String`, `_analisisMes`, `_analisisSemana`, `_bonosReferidorMes`, `_buildReporteMes`, `_checkAlertaSemanFloja`, `_checkAutoAtendida`, `_checkCobrosPendientes`, `_copyGestionAcciones`, `_copyGestionAsesorText`, `_copyGestionCandidatosPaquete`, `_copyGestionData`, `_copyGestionDiagnostico`, `_copyGestionMesKey`, `_copyGestionOcupacion`, `_copyGestionPeriodo`, `_copyGestionReactivar`, `_copyGestionTexto`, `_copyGestionTop`, `_copyOk`, `_copyPlainText`, `_getEmpresas`, `_getPkAsignados`, `_getPkPlantillas`, `_getSR`, `_guardarCostos`, `_ingFmt`, `_ingFmtLabel`, `_ingFmtMes`, `_kpiCardGuia`, `_kpiRow`, `_leerCamposCostos`, `_mesAbrevActual`, `_norm`, `_openWAGestionPrepared`, `_parseVoice`, `_persistEmStep`, `_rFila`, `_recalcCostos`, `_renderAnalisis`, `_renderBDBreakdown`, `_renderCancelBreakdown`, `_renderEncuestaStatsUI`, `_renderSegLista`, `_renderSegLog`, `_renderTareasLista`, `_rutinaKey`, `_saveEmpresas`, `_savePkAsignados`, `_savePkPlantillas`, `_secTitle`, `_segCard`, `_segCardReadap`, `_semCell`, `_showCopyFallback`, `_showWhatsAppCopyModal`, `_startVoice`, `_stopVoice`, `_syncPreciosToAutoFill`, `_tareaEstado`, `_tareaFechaTipo`, `_tareaKey`, `_toggleEditCostos`, `_updateEmProgress`, `_updateReacBtn`, `_voiceBtn`, `_voiceStatusEl`, `abrirCopiarListaGestion`, `abrirMensajeWAGestion`, `abrirModalEmpresa`, `abrirModalPaquete`, `abrirModalPlantillaPaquete`, `abrirReporteMes`, `actualizada`, `actualizarConceptosEgreso`, `actualizarContadorLeads`, `actualizarMetaBarra`, `add`, `addEventListener`, `addLead`, `agendarDesdePacienteRec`, `agendarDesdeSeg`, `agregarPacienteDB`, `ajustarSesiones`, `applyKPIRefSpans`, `autoGuardarNota`, `borrarEmpresa`, `borrarPaciente`, `borrarPaqueteAsignado`, `borrarPlantillaPaquete`, `calNext`, `calPrev`, `calToday`, `calcBDActualizada`, `calcCobradoMes`, `calcIngresoPaquetesMes`, `calcTotalCostos`, `cargarRecordatorios`, `catch`, `cerrarModalEmpresa`, `cerrarReporteMes`, `changeKPIMonth`, `charAt`, `cita`, `citasReales`, `clearTimeout`, `click`, `close`, `closeModal`, `closest`, `confirm`, `contains`, `copiarBriefClaude`, `copiarInfoPersonaGestion`, `copiarReporteMes`, `copyGestionTexto`, `createElement`, `createObjectURL`, `dbBorrarPac`, `dbEditarPac`, `dbOnOrigenChange`, `dbReferidoFilter`, `deleteLastLead`, `deshacerUltimoLead`, `detectarDuplicados`, `dotCls`, `duplicada`, `editarEmpresa`, `editarPaciente`, `editarPacienteIdx`, `eliminarEgreso`, `encodeURIComponent`, `entries`, `enviarEmailUno`, `enviarEmailsRecordatorio`, `esDescargaMusc`, `esReadaptacion`, `esRegistroServ`, `esSesionFull`, `esSesionIndiv`, `exportarCSV`, `exportarSeguimientoCSV`, `fetch`, `fill`, `filter`, `find`, `floor`, `fmtDate`, `fmtPeso`, `focus`, `for`, `forEach`, `generarBono`, `generarTareas`, `getAttribute`, `getCancelMotivos`, `getCostosEstructura`, `getDate`, `getDay`, `getEgresos`, `getElementById`, `getEncuestaStats`, `getFullYear`, `getKPIConfig`, `getKPIManual`, `getLeads`, `getLeadsHoy`, `getLeadsMes`, `getLeadsSemana`, `getMeta`, `getMonday`, `getMonth`, `getTime`, `getTplTarea`, `guardarEgreso`, `guardarEmpresa`, `guardarKPIConfig`, `guardarKPIManual`, `guardarMeta`, `guardarMetaFin`, `guardarPaciente`, `guardarPacienteDB`, `guardarPaqueteAsignado`, `guardarPlantillaPaquete`, `guardarPlantillaTarea`, `h1`, `handleEmStep`, `if`, `imprimirReporteMes`, `includes`, `indexOf`, `initDashboard`, `initFormDB`, `initQuickNotes`, `initTareasConfig`, `isMidnightTime`, `isNaN`, `isPagada`, `join`, `json`, `keys`, `kpiSt`, `kvGet`, `kvRemove`, `kvSet`, `limpiarCitasSinHora`, `limpiarDuplicadosGAS`, `limpiarFormDB`, `limpiarHorariosInvalidosAuto`, `limpiarLogSeguimiento`, `line`, `loadAllEmSteps`, `loadEncuestaStats`, `loadRutinaChecks`, `localeCompare`, `map`, `marcarRecordatorioEnviado`, `marcarTareaCompletada`, `marcarTareaWA`, `marcarTodasAtendidas`, `marcarUsado`, `markEmDone`, `max`, `min`, `msgSemana4`, `msgSemana5`, `normDate`, `now`, `nuevos`, `omitirTarea`, `open`, `openModal`, `openNuevaCitaFromCal`, `operativos`, `pad`, `padEnd`, `padStart`, `parse`, `parseInt`, `parsePrecio`, `pendientes`, `perdido`, `pmGuardarCostos`, `pmGuardarKPIs`, `pmRecalc`, `pop`, `posponerTarea`, `preventDefault`, `previewMeta`, `previewMetaFin`, `print`, `procesarVozTexto`, `push`, `querySelector`, `querySelectorAll`, `readapZona`, `recCard`, `recEmailEnviado`, `recEnviado`, `reduce`, `registrarLead`, `reload`, `reloadMetas`, `remove`, `renderBasedatos`, `renderCalendar`, `renderCitasResumen`, `renderCodigos`, `renderEgresosList`, `renderEmergencia`, `renderEmpresas`, `renderEstructuraFinanciera`, `renderFinanzas`, `renderIngresosDetalle`, `renderKPIGuia`, `renderKPITablero`, `renderMetricas`, `renderPacientes`, `renderPaquetes`, `renderPresupuestoMetas`, `renderReactivacion`, `renderRecordatorios`, `renderSeguimiento`, `renderTareas`, `repeat`, `replace`, `resRow`, `resetEmSteps`, `resetLeadsHoy`, `resetRutina`, `resetRutinaGrupo`, `return`, `revokeObjectURL`, `rgba`, `round`, `row`, `saveCostosEstructura`, `saveEgresos`, `saveKPIManual`, `saveLeads`, `scrollToKPICard`, `segLogAction`, `segMarkWa`, `segReagendo`, `segToggleR`, `segWaSent`, `select`, `sem2`, `sep`, `sesiones`, `setAttribute`, `setDate`, `setHours`, `setItem`, `setModoIngresos`, `setReadapZona`, `setTimeout`, `shows`, `slice`, `some`, `sort`, `splice`, `split`, `startsWith`, `stringify`, `sv`, `then`, `toLocalDateStr`, `toLocaleDateString`, `toLocaleString`, `toLocaleTimeString`, `toLowerCase`, `toTimeString`, `toUpperCase`, `toast`, `today`, `toggle`, `toggleDarkMode`, `toggleEmCard`, `toggleEmDim`, `toggleRutinaCheck`, `toggleSegFiltro`, `toggleTareaFiltro`, `toggleVoice`, `toggleVoicePanel`, `trim`, `updateBonosBadge`, `usarSesion`, `values`, `var`, `voz`, `waRecordatorio`, `write`, `writeText`

### initFormDB

- Línea: 9899
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### renderBasedatos

- Línea: 9907
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### renderReactivacion

- Línea: 9915
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _updateReacBtn

- Línea: 9923
- Tamaño: 267 caracteres
- Llamadas: `Error`, `if`

### dbEditarPac

- Línea: 9931
- Tamaño: 255 caracteres
- Llamadas: `Error`, `if`

### limpiarFormDB

- Línea: 9963
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### calPrev

- Línea: 9982
- Tamaño: 233 caracteres
- Llamadas: `Error`, `if`

### calNext

- Línea: 9989
- Tamaño: 233 caracteres
- Llamadas: `Error`, `if`

### calToday

- Línea: 9996
- Tamaño: 237 caracteres
- Llamadas: `Error`, `if`

### openNuevaCitaFromCal

- Línea: 10014
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### _getSR

- Línea: 10029
- Tamaño: 244 caracteres
- Llamadas: `Error`, `if`

### _voiceBtn

- Línea: 10037
- Tamaño: 256 caracteres
- Llamadas: `Error`, `if`

### _voiceStatusEl

- Línea: 10044
- Tamaño: 276 caracteres
- Llamadas: `Error`, `if`

### toggleVoicePanel

- Línea: 10056
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### procesarVozTexto

- Línea: 10064
- Tamaño: 284 caracteres
- Llamadas: `Error`, `if`

### toggleVoice

- Línea: 10072
- Tamaño: 264 caracteres
- Llamadas: `Error`, `if`

### _startVoice

- Línea: 10080
- Tamaño: 264 caracteres
- Llamadas: `Error`, `if`

### _stopVoice

- Línea: 10088
- Tamaño: 260 caracteres
- Llamadas: `Error`, `if`

### _norm

- Línea: 10096
- Tamaño: 240 caracteres
- Llamadas: `Error`, `if`

### _parseVoice

- Línea: 10104
- Tamaño: 264 caracteres
- Llamadas: `Error`, `if`

### msgSemana4

- Línea: 10117
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### msgSemana5

- Línea: 10124
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### waRecordatorio

- Línea: 10131
- Tamaño: 267 caracteres
- Llamadas: `Error`, `if`

### renderRecordatorios

- Línea: 10149
- Tamaño: 288 caracteres
- Llamadas: `Error`, `if`

### recCard

- Línea: 10157
- Tamaño: 239 caracteres
- Llamadas: `Error`, `if`

### recEnviado

- Línea: 10165
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### recEmailEnviado

- Línea: 10172
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### marcarRecordatorioEnviado

- Línea: 10179
- Tamaño: 312 caracteres
- Llamadas: `Error`, `if`

### agendarDesdePacienteRec

- Línea: 10195
- Tamaño: 319 caracteres
- Llamadas: `Error`, `if`

### toggleSegFiltro

- Línea: 10210
- Tamaño: 289 caracteres
- Llamadas: `Error`, `if`

### segReagendo

- Línea: 10219
- Tamaño: 273 caracteres
- Llamadas: `Error`, `if`

### segToggleR

- Línea: 10226
- Tamaño: 269 caracteres
- Llamadas: `Error`, `if`

### segWaSent

- Línea: 10233
- Tamaño: 265 caracteres
- Llamadas: `Error`, `if`

### segMarkWa

- Línea: 10240
- Tamaño: 265 caracteres
- Llamadas: `Error`, `if`

### segLogAction

- Línea: 10249
- Tamaño: 277 caracteres
- Llamadas: `Error`, `if`

### limpiarLogSeguimiento

- Línea: 10256
- Tamaño: 313 caracteres
- Llamadas: `Error`, `if`

### esDescargaMusc

- Línea: 10264
- Tamaño: 285 caracteres
- Llamadas: `Error`, `if`

### esReadaptacion

- Línea: 10272
- Tamaño: 285 caracteres
- Llamadas: `Error`, `if`

### readapZona

- Línea: 10280
- Tamaño: 269 caracteres
- Llamadas: `Error`, `if`

### setReadapZona

- Línea: 10287
- Tamaño: 281 caracteres
- Llamadas: `Error`, `if`

### renderSeguimiento

- Línea: 10295
- Tamaño: 297 caracteres
- Llamadas: `Error`, `if`

### _renderSegLista

- Línea: 10303
- Tamaño: 289 caracteres
- Llamadas: `Error`, `if`

### _segCard

- Línea: 10311
- Tamaño: 261 caracteres
- Llamadas: `Error`, `if`

### _segCardReadap

- Línea: 10319
- Tamaño: 285 caracteres
- Llamadas: `Error`, `if`

### _renderSegLog

- Línea: 10327
- Tamaño: 281 caracteres
- Llamadas: `Error`, `if`

### agendarDesdeSeg

- Línea: 10335
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### exportarSeguimientoCSV

- Línea: 10368
- Tamaño: 317 caracteres
- Llamadas: `Error`, `if`

### getMeta

- Línea: 10428
- Tamaño: 243 caracteres
- Llamadas: `Error`, `if`

### actualizarMetaBarra

- Línea: 10436
- Tamaño: 291 caracteres
- Llamadas: `Error`, `if`

### previewMeta

- Línea: 10444
- Tamaño: 259 caracteres
- Llamadas: `Error`, `if`

### guardarMeta

- Línea: 10452
- Tamaño: 259 caracteres
- Llamadas: `Error`, `if`

### previewMetaFin

- Línea: 10460
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### guardarMetaFin

- Línea: 10468
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### calcIngresoPaquetesMes

- Línea: 10476
- Tamaño: 293 caracteres
- Llamadas: `Error`, `if`

### calcCobradoMes

- Línea: 10483
- Tamaño: 261 caracteres
- Llamadas: `Error`, `if`

### renderFinanzas

- Línea: 10562
- Tamaño: 261 caracteres
- Llamadas: `Error`, `if`

### getEgresos

- Línea: 10577
- Tamaño: 245 caracteres
- Llamadas: `Error`, `if`

### saveEgresos

- Línea: 10584
- Tamaño: 249 caracteres
- Llamadas: `Error`, `if`

### actualizarConceptosEgreso

- Línea: 10592
- Tamaño: 305 caracteres
- Llamadas: `Error`, `if`

### guardarEgreso

- Línea: 10600
- Tamaño: 257 caracteres
- Llamadas: `Error`, `if`

### eliminarEgreso

- Línea: 10608
- Tamaño: 261 caracteres
- Llamadas: `Error`, `if`

### renderEgresosList

- Línea: 10616
- Tamaño: 273 caracteres
- Llamadas: `Error`, `if`

### getCostosEstructura

- Línea: 10631
- Tamaño: 291 caracteres
- Llamadas: `Error`, `if`

### saveCostosEstructura

- Línea: 10639
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### calcTotalCostos

- Línea: 10647
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### getKPIConfig

- Línea: 10657
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### calcBDActualizada

- Línea: 10679
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### reloadMetas

- Línea: 10687
- Tamaño: 259 caracteres
- Llamadas: `Error`, `if`

### getKPIManual

- Línea: 10695
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### saveKPIManual

- Línea: 10702
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### changeKPIMonth

- Línea: 10770
- Tamaño: 266 caracteres
- Llamadas: `Error`, `if`

### guardarKPIManual

- Línea: 10833
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### renderKPITablero

- Línea: 10841
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### _copyGestionMesKey

- Línea: 10852
- Tamaño: 299 caracteres
- Llamadas: `Error`, `if`

### _copyGestionPeriodo

- Línea: 10860
- Tamaño: 303 caracteres
- Llamadas: `Error`, `if`

### _copyGestionTop

- Línea: 10868
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### _copyGestionData

- Línea: 10876
- Tamaño: 291 caracteres
- Llamadas: `Error`, `if`

### _copyGestionOcupacion

- Línea: 10884
- Tamaño: 311 caracteres
- Llamadas: `Error`, `if`

### _copyGestionReactivar

- Línea: 10892
- Tamaño: 311 caracteres
- Llamadas: `Error`, `if`

### _copyGestionCandidatosPaquete

- Línea: 10900
- Tamaño: 343 caracteres
- Llamadas: `Error`, `if`

### _copyGestionDiagnostico

- Línea: 10908
- Tamaño: 319 caracteres
- Llamadas: `Error`, `if`

### _copyGestionAcciones

- Línea: 10916
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### _copyGestionTexto

- Línea: 10924
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### copyGestionTexto

- Línea: 10932
- Tamaño: 291 caracteres
- Llamadas: `Error`, `if`

### _copyGestionAsesorText

- Línea: 10940
- Tamaño: 315 caracteres
- Llamadas: `Error`, `if`

### _copyOk

- Línea: 10956
- Tamaño: 255 caracteres
- Llamadas: `Error`, `if`

### _showCopyFallback

- Línea: 10964
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### abrirCopiarListaGestion

- Línea: 10972
- Tamaño: 319 caracteres
- Llamadas: `Error`, `if`

### copiarInfoPersonaGestion

- Línea: 10980
- Tamaño: 323 caracteres
- Llamadas: `Error`, `if`

### abrirMensajeWAGestion

- Línea: 10988
- Tamaño: 311 caracteres
- Llamadas: `Error`, `if`

### _showWhatsAppCopyModal

- Línea: 10996
- Tamaño: 315 caracteres
- Llamadas: `Error`, `if`

### _openWAGestionPrepared

- Línea: 11004
- Tamaño: 315 caracteres
- Llamadas: `Error`, `if`

### abrirReporteMes

- Línea: 11015
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### cerrarReporteMes

- Línea: 11023
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### _toggleEditCostos

- Línea: 11031
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _leerCamposCostos

- Línea: 11039
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _recalcCostos

- Línea: 11047
- Tamaño: 267 caracteres
- Llamadas: `Error`, `if`

### _guardarCostos

- Línea: 11055
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### _secTitle

- Línea: 11063
- Tamaño: 254 caracteres
- Llamadas: `Error`, `if`

### _rFila

- Línea: 11071
- Tamaño: 242 caracteres
- Llamadas: `Error`, `if`

### _semCell

- Línea: 11079
- Tamaño: 250 caracteres
- Llamadas: `Error`, `if`

### _kpiRow

- Línea: 11087
- Tamaño: 238 caracteres
- Llamadas: `Error`, `if`

### _buildReporteMes

- Línea: 11095
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### copiarBriefClaude

- Línea: 11149
- Tamaño: 14562 caracteres
- Llamadas: `CAC`, `Date`, `Express`, `Full`, `Muscular`, `NPS`, `String`, `actualizada`, `calcBDActualizada`, `calcCobradoMes`, `calcTotalCostos`, `catch`, `charAt`, `citasReales`, `entries`, `esSesionFull`, `esSesionIndiv`, `filter`, `floor`, `fmtPeso`, `forEach`, `getCancelMotivos`, `getCostosEstructura`, `getDate`, `getDay`, `getEgresos`, `getElementById`, `getEncuestaStats`, `getFullYear`, `getKPIManual`, `getLeadsMes`, `getMonth`, `h1`, `if`, `includes`, `indexOf`, `isNaN`, `isPagada`, `keys`, `line`, `max`, `min`, `normDate`, `nuevos`, `operativos`, `padEnd`, `padStart`, `parsePrecio`, `perdido`, `reduce`, `repeat`, `round`, `row`, `sem2`, `sep`, `sesiones`, `setDate`, `setTimeout`, `shows`, `slice`, `some`, `sort`, `split`, `startsWith`, `then`, `toLocaleDateString`, `toLowerCase`, `toUpperCase`, `toast`, `trim`, `values`, `var`, `writeText`

### _kpiCardGuia

- Línea: 11416
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### scrollToKPICard

- Línea: 11424
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### renderKPIGuia

- Línea: 11604
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### _renderCancelBreakdown

- Línea: 11612
- Tamaño: 298 caracteres
- Llamadas: `Error`, `if`

### _renderBDBreakdown

- Línea: 11741
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### applyKPIRefSpans

- Línea: 11749
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### renderPresupuestoMetas

- Línea: 11757
- Tamaño: 303 caracteres
- Llamadas: `Error`, `if`

### pmRecalc

- Línea: 11765
- Tamaño: 247 caracteres
- Llamadas: `Error`, `if`

### pmGuardarCostos

- Línea: 11773
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### pmGuardarKPIs

- Línea: 11781
- Tamaño: 267 caracteres
- Llamadas: `Error`, `if`

### guardarKPIConfig

- Línea: 11809
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### renderEstructuraFinanciera

- Línea: 11820
- Tamaño: 309 caracteres
- Llamadas: `Error`, `if`

### renderMetricas

- Línea: 11831
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### _checkAutoAtendida

- Línea: 11840
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### _checkCobrosPendientes

- Línea: 11857
- Tamaño: 323 caracteres
- Llamadas: `Error`, `if`

### _checkAlertaSemanFloja

- Línea: 11868
- Tamaño: 323 caracteres
- Llamadas: `Error`, `if`

### setModoIngresos

- Línea: 11877
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _ingFmt

- Línea: 11885
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### _ingFmtLabel

- Línea: 11892
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### _ingFmtMes

- Línea: 11899
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### renderCitasResumen

- Línea: 11907
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### renderIngresosDetalle

- Línea: 11915
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### _analisisSemana

- Línea: 11924
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _analisisMes

- Línea: 11933
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### _renderAnalisis

- Línea: 11941
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### getTplTarea

- Línea: 11955
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### guardarPlantillaTarea

- Línea: 11962
- Tamaño: 319 caracteres
- Llamadas: `Error`, `if`

### initTareasConfig

- Línea: 11969
- Tamaño: 299 caracteres
- Llamadas: `Error`, `if`

### _tareaKey

- Línea: 11976
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### _tareaEstado

- Línea: 11983
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _tareaFechaTipo

- Línea: 11990
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### generarTareas

- Línea: 11997
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### toggleTareaFiltro

- Línea: 12004
- Tamaño: 303 caracteres
- Llamadas: `Error`, `if`

### renderTareas

- Línea: 12011
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _renderTareasLista

- Línea: 12018
- Tamaño: 307 caracteres
- Llamadas: `Error`, `if`

### marcarTareaWA

- Línea: 12025
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### marcarTareaCompletada

- Línea: 12032
- Tamaño: 319 caracteres
- Llamadas: `Error`, `if`

### posponerTarea

- Línea: 12039
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### omitirTarea

- Línea: 12046
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### _getPkPlantillas

- Línea: 12057
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### _getPkAsignados

- Línea: 12064
- Tamaño: 266 caracteres
- Llamadas: `Error`, `if`

### _savePkPlantillas

- Línea: 12071
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### _savePkAsignados

- Línea: 12078
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### renderPaquetes

- Línea: 12086
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### abrirModalPaquete

- Línea: 12093
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### usarSesion

- Línea: 12117
- Tamaño: 246 caracteres
- Llamadas: `Error`, `if`

### ajustarSesiones

- Línea: 12124
- Tamaño: 266 caracteres
- Llamadas: `Error`, `if`

### borrarPaqueteAsignado

- Línea: 12131
- Tamaño: 290 caracteres
- Llamadas: `Error`, `if`

### abrirModalPlantillaPaquete

- Línea: 12138
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### borrarPlantillaPaquete

- Línea: 12154
- Tamaño: 294 caracteres
- Llamadas: `Error`, `if`

### dbOnOrigenChange

- Línea: 12277
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### dbReferidoFilter

- Línea: 12285
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### _mesAbrevActual

- Línea: 12299
- Tamaño: 277 caracteres
- Llamadas: `Error`, `if`

### _bonosReferidorMes

- Línea: 12306
- Tamaño: 289 caracteres
- Llamadas: `Error`, `if`

### updateBonosBadge

- Línea: 12314
- Tamaño: 281 caracteres
- Llamadas: `Error`, `if`

### renderCodigos

- Línea: 12322
- Tamaño: 269 caracteres
- Llamadas: `Error`, `if`

### resRow

- Línea: 12347
- Tamaño: 229 caracteres
- Llamadas: `Error`, `if`

### pasaporteLink

- Línea: 12410
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### pasaporteLinkAdmin

- Línea: 12418
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### waBtnPasaporte

- Línea: 12426
- Tamaño: 266 caracteres
- Llamadas: `Error`, `if`

### openPassportModuleFor

- Línea: 12434
- Tamaño: 294 caracteres
- Llamadas: `Error`, `if`

### _pasGetDB

- Línea: 12442
- Tamaño: 246 caracteres
- Llamadas: `Error`, `if`

### onPasInput

- Línea: 12450
- Tamaño: 250 caracteres
- Llamadas: `Error`, `if`

### searchPasPatient

- Línea: 12458
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### selectPasPatient

- Línea: 12466
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### _pasSetConfirmed

- Línea: 12474
- Tamaño: 274 caracteres
- Llamadas: `Error`, `if`

### limpiarPasBusqueda

- Línea: 12482
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### renderPasaporteQR

- Línea: 12498
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### abrirPasaporte

- Línea: 12506
- Tamaño: 266 caracteres
- Llamadas: `Error`, `if`

### copiarLinkPas

- Línea: 12514
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### renderPasaporteAdminTools

- Línea: 12522
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### cerrarWaCopyModal

- Línea: 12595
- Tamaño: 295 caracteres
- Llamadas: `Error`, `if`

### copiarMsgWA

- Línea: 12603
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### toggleKPICard

- Línea: 12612
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### _comisSemanasLlenas

- Línea: 12741
- Tamaño: 878 caracteres
- Llamadas: `Date`, `filter`, `getDate`, `getDay`, `if`, `includes`, `normDate`, `push`, `setDate`, `toLocalDateStr`, `toS`, `while`

### renderComisiones

- Línea: 12858
- Tamaño: 16181 caracteres
- Llamadas: `Administrativa`, `Auxiliar`, `CONTENIDO`, `Contenido`, `Date`, `_comisCruzadaAsign`, `_comisGetConfig`, `_comisManualReact`, `_comisMesVal`, `_comisReactivaciones`, `_comisReventas`, `_comisSemanasLlenas`, `_comisVentasCruzadas`, `_initComisMesSel`, `addManualReactivacion`, `calcBonoReactItem`, `citasReales`, `compatibilidad`, `desmarcarComisionPagada`, `filter`, `find`, `fmtPeso`, `fmtRng`, `getDate`, `getElementById`, `getEncuestaStats`, `getKPIManual`, `getLeadsMes`, `getMonth`, `if`, `join`, `kvGet`, `kvSet`, `map`, `marcarComisionPagada`, `minmax`, `parseInt`, `reduce`, `removeManualReactivacion`, `repeat`, `replace`, `round`, `setCruzadaAsign`, `setEl`, `split`, `toFixed`, `toLowerCase`, `toString`, `var`

### abrirModalDisp

- Línea: 13077
- Tamaño: 323 caracteres
- Llamadas: `buscarDisponibilidad`, `getElementById`, `if`, `today`

### buscarDisponibilidad

- Línea: 13095
- Tamaño: 114 caracteres
- Llamadas: `clearTimeout`, `setTimeout`

### copiarDisponibilidadWA

- Línea: 13134
- Tamaño: 1714 caracteres
- Llamadas: `Date`, `appendChild`, `catch`, `createElement`, `execCommand`, `forEach`, `getDay`, `getElementById`, `if`, `join`, `map`, `push`, `querySelectorAll`, `removeChild`, `replace`, `select`, `setTimeout`, `split`, `then`, `trim`, `writeText`

### _getMensajesPre

- Línea: 13179
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _setMensajesPre

- Línea: 13186
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### _initMensajesPre

- Línea: 13196
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### renderMensajes

- Línea: 13204
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### _msgCard

- Línea: 13212
- Tamaño: 255 caracteres
- Llamadas: `Error`, `if`

### setMsgCat

- Línea: 13220
- Tamaño: 259 caracteres
- Llamadas: `Error`, `if`

### abrirNuevoMensaje

- Línea: 13228
- Tamaño: 291 caracteres
- Llamadas: `Error`, `if`

### editarMensaje

- Línea: 13236
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### guardarMensaje

- Línea: 13244
- Tamaño: 279 caracteres
- Llamadas: `Error`, `if`

### eliminarMensaje

- Línea: 13252
- Tamaño: 283 caracteres
- Llamadas: `Error`, `if`

### copiarMensajePre

- Línea: 13260
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### gEditarToggle

- Línea: 13269
- Tamaño: 275 caracteres
- Llamadas: `Error`, `if`

### gAutoGuardar

- Línea: 13277
- Tamaño: 271 caracteres
- Llamadas: `Error`, `if`

### gFitHeight

- Línea: 13284
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### gCargarGuardados

- Línea: 13291
- Tamaño: 287 caracteres
- Llamadas: `Error`, `if`

### gTabSwitch

- Línea: 13300
- Tamaño: 263 caracteres
- Llamadas: `Error`, `if`

### gCopiar

- Línea: 13307
- Tamaño: 251 caracteres
- Llamadas: `Error`, `if`

### _loadRec

- Línea: 13323
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### _saveRec

- Línea: 13330
- Tamaño: 262 caracteres
- Llamadas: `Error`, `if`

### _fmtCLP

- Línea: 13338
- Tamaño: 258 caracteres
- Llamadas: `Error`, `if`

### _recMesActual

- Línea: 13346
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### _initRecMesSel

- Línea: 13354
- Tamaño: 286 caracteres
- Llamadas: `Error`, `if`

### renderRecuperaciones

- Línea: 13362
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### registrarRecuperacion

- Línea: 13370
- Tamaño: 314 caracteres
- Llamadas: `Error`, `if`

### marcarPagado

- Línea: 13378
- Tamaño: 278 caracteres
- Llamadas: `Error`, `if`

### desmarcarPago

- Línea: 13386
- Tamaño: 282 caracteres
- Llamadas: `Error`, `if`

### eliminarRecuperacion

- Línea: 13394
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### pagarTodasComisiones

- Línea: 13402
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### _recPreguntaDolencia

- Línea: 13422
- Tamaño: 310 caracteres
- Llamadas: `Error`, `if`

### _renderRecMsgSelector

- Línea: 13432
- Tamaño: 314 caracteres
- Llamadas: `Error`, `if`

### renderInactivos

- Línea: 13440
- Tamaño: 290 caracteres
- Llamadas: `Error`, `if`

### _waIconSvg

- Línea: 13448
- Tamaño: 270 caracteres
- Llamadas: `Error`, `if`

### _recInactivoCard

- Línea: 13456
- Tamaño: 294 caracteres
- Llamadas: `Error`, `if`

### preRellenaRecuperacion

- Línea: 13464
- Tamaño: 318 caracteres
- Llamadas: `Error`, `if`

## Declaraciones

- Línea 6208: `let allData = {citas: [], bloqueos: [], eventos: []};`
- Línea 7300: `let _waitLoaded = false;`
- Línea 7751: `let _scheduleMode    = 'unica';   // 'unica' | 'multiple' | 'recurrente'`
- Línea 7752: `let _multiDates      = [];        // [{date, time}, ...]`
- Línea 9098: `const convenios = {`
- Línea 9438: `let _eeeId = null; // ID del evento en edición`
- Línea 10004: `let _calGCevents = []; // cache de eventos de Google Calendar`
