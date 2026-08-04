# Auditoría de contratos Panel ↔ Apps Script

- Acciones solicitadas por el panel: 64
- Acciones disponibles en el backend: 81
- Acciones solicitadas sin ruta encontrada: 4

## Acciones solicitadas por el panel

- `actualizarCodigo`
- `addWaitlist`
- `adminBook`
- `adminData`
- `adminLogin`
- `agenda`
- `assignProfessional`
- `authorizeAppointment`
- `automationQueue`
- `automationQueueDone`
- `automationRun`
- `automationSave`
- `automationSetup`
- `automationStatus`
- `availability`
- `basedatos`
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
- `finanzas`
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
- `recuperacion`
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

## Acciones solicitadas sin ruta encontrada

- **agenda**
- **basedatos**
- **finanzas**
- **recuperacion**

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