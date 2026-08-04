# Auditoría de contratos Panel ↔ Apps Script

- Nombres action detectados en el panel: 64
- Acciones locales excluidas: 4
- Acciones API solicitadas por el panel: 60
- Acciones disponibles en el backend: 81
- Acciones API sin ruta encontrada: 0

## Acciones API solicitadas por el panel

- `actualizarCodigo`
- `addWaitlist`
- `adminBook`
- `adminData`
- `adminLogin`
- `assignProfessional`
- `authorizeAppointment`
- `automationQueue`
- `automationQueueDone`
- `automationRun`
- `automationSave`
- `automationSetup`
- `automationStatus`
- `availability`
- `block`
- `cancelBooking`
- `changePassword`
- `cleanCitasSinHora`
- `crearEvento`
- `deletePatient`
- `deleteProfessional`
- `editBooking`
- `editPatient`
- `eliminarEvento`
- `generarCodigo`
- `getAdminKV`
- `getCalEvents`
- `getEncuestaStats`
- `getInactivos`
- `getKPIHistory`
- `getReminders`
- `getWaitlist`
- `markPayablePaid`
- `operationsData`
- `passportDeactivate`
- `passportEnsure`
- `passportReactivate`
- `passportRegenerateToken`
- `passportSaveProgress`
- `ping`
- `professionalAgenda`
- `professionalChangePassword`
- `professionalLogin`
- `professionalMarkAttended`
- `professionalReportIssue`
- `registrarCodigo`
- `removeWaitlist`
- `repairRescheduledDuplicate`
- `resetProfessionalPassword`
- `savePayment`
- `saveProfessional`
- `sendReminders`
- `setAdminKV`
- `setupOperationsModule`
- `teamData`
- `toggleProfessional`
- `unblock`
- `updatePago`
- `updateStatus`
- `verifyPayment`

## Acciones internas de navegación excluidas

- `agenda`
- `basedatos`
- `finanzas`
- `recuperacion`

## Acciones API solicitadas sin ruta encontrada

Ninguna.

## Acciones del backend no detectadas en el panel principal

- `addDailyObservation`
- `applyCreditBalance`
- `authorizeCourtesy`
- `autoMarcarAtendidas`
- `backupStateMigrationSheets`
- `cleanInvalidCitaTimes`
- `createCreditBalance`
- `dailyOpsData`
- `expireTemporaryReservations`
- `generateEval`
- `getCodigos`
- `getPassport`
- `getPassportSecure`
- `getReviews`
- `logDailyReminder`
- `passportAdminList`
- `passportBackupMigrate`
- `saveDailyPreparation`
- `savePassport`
- `savePaymentAccount`
- `simulateStateMigration`

## Alcance

La prueba valida nombres de acciones y rutas declaradas. No reemplaza la prueba funcional con una sesión autorizada ni confirma que la versión desplegada de Apps Script sea idéntica al archivo del repositorio.