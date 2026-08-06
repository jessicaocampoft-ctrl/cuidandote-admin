# Inventario restante después de la Fase 13

- Funciones declaradas en index.html: **598**.
- Adaptadores de módulos ya separados: **224**.
- Funciones con implementación todavía dentro de index.html: **374**.
- Secciones sustanciales candidatas a fases: **62**.
- Scripts modulares cargados: **16**.

## Módulos ya cargados

- `js/core/config.js`
- `js/core/api.js`
- `js/core/session.js`
- `js/core/navigation.js`
- `js/modules/payments.js`
- `js/modules/passport.js`
- `js/modules/agenda.js`
- `js/modules/appointment-create.js`
- `js/modules/appointment-edit.js`
- `js/modules/team.js`
- `js/modules/database.js`
- `js/modules/referrals.js`
- `js/modules/packages.js`
- `js/modules/finance.js`
- `js/modules/kpi.js`
- `js/modules/budget.js`

## Secciones candidatas ordenadas por tamaño

### Sin sección identificada

- Funciones: 69. Líneas aproximadas: 1321.
- `exportPaymentsCSV` (L6700, 8 líneas), `exportOperationsAuditCSV` (L6709, 7 líneas), `fetchJsonWithTimeout` (L6717, 1 líneas), `currentAdminRoleKey` (L7196, 3 líneas), `isAuxAdmin` (L7199, 1 líneas), `applyRoleRestrictions` (L7200, 3 líneas), `_renderMultiChips` (L7882, 17 líneas), `_calcRecDates` (L7900, 15 líneas), `_updateRecPreview` (L7916, 25 líneas), `waLinkSeg` (L8130, 22 líneas), `smartCobroWhatsApp` (L8390, 4 líneas), `renderSmartCobrosCenter` (L8395, 47 líneas), `patientInsightHtml` (L8443, 31 líneas), `_renderSegLog` (L10824, 16 líneas), `limpiarCitasSinHora` (L10849, 19 líneas), `limpiarHorariosInvalidosAuto` (L10869, 5 líneas), `_copyGestionOcupacion` (L11487, 13 líneas), `_copyGestionReactivar` (L11501, 15 líneas), `_copyGestionCandidatosPaquete` (L11517, 13 líneas), `_copyGestionDiagnostico` (L11531, 13 líneas), `_copyGestionAcciones` (L11545, 9 líneas), `_copyGestionTexto` (L11555, 36 líneas), `copyGestionTexto` (L11592, 3 líneas), `_copyGestionAsesorText` (L11596, 73 líneas), `_copyPlainText` (L11670, 12 líneas), `_copyOk` (L11683, 9 líneas), `_showCopyFallback` (L11693, 24 líneas), `abrirCopiarListaGestion` (L11718, 10 líneas), `copiarInfoPersonaGestion` (L11729, 27 líneas), `abrirMensajeWAGestion` (L11757, 8 líneas), `_showWhatsAppCopyModal` (L11766, 24 líneas), `_openWAGestionPrepared` (L11791, 6 líneas), `loadAllEmSteps` (L13017, 11 líneas), `markEmDone` (L13029, 9 líneas), `resetEmSteps` (L13039, 8 líneas), `marcarTareaWA` (L14629, 5 líneas), `marcarTareaCompletada` (L14634, 5 líneas), `posponerTarea` (L14639, 6 líneas), `omitirTarea` (L14645, 7 líneas), `_saveEmpresas` (L14761, 1 líneas), `renderEmpresas` (L14763, 55 líneas), `abrirModalEmpresa` (L14818, 29 líneas), `cerrarModalEmpresa` (L14847, 1 líneas), `editarEmpresa` (L14848, 1 líneas), `guardarEmpresa` (L14849, 21 líneas), `borrarEmpresa` (L14870, 4 líneas), `_comisReactivaciones` (L15368, 28 líneas), `_comisReventas` (L15397, 16 líneas), `_comisVentasCruzadas` (L15414, 11 líneas), `_comisCruzadaAsign` (L15426, 3 líneas), `setCruzadaAsign` (L15429, 4 líneas), `_comisManualReact` (L15434, 3 líneas), `_comisSetManualReact` (L15437, 3 líneas), `addManualReactivacion` (L15441, 9 líneas), `removeManualReactivacion` (L15451, 5 líneas), `marcarComisionPagada` (L15457, 5 líneas), `desmarcarComisionPagada` (L15462, 4 líneas), `renderComisiones` (L15467, 211 líneas), `_msgCard` (L15846, 20 líneas), `setMsgCat` (L15867, 7 líneas), `abrirNuevoMensaje` (L15875, 9 líneas), `editarMensaje` (L15885, 10 líneas), `guardarMensaje` (L15896, 18 líneas), `eliminarMensaje` (L15915, 6 líneas), `copiarMensajePre` (L15922, 12 líneas), `renderInactivos` (L16306, 39 líneas), `_waIconSvg` (L16346, 3 líneas), `_recInactivoCard` (L16350, 195 líneas), `preRellenaRecuperacion` (L16386, 18 líneas)

### REPORTE FIN DE MES

- Funciones: 6. Líneas aproximadas: 700.
- `abrirReporteMes` (L11801, 9 líneas), `cerrarReporteMes` (L11811, 3 líneas), `_secTitle` (L11847, 6 líneas), `_rFila` (L11854, 6 líneas), `_semCell` (L11861, 8 líneas), `_buildReporteMes` (L11878, 668 líneas)

### MÉTRICAS INTELIGENTES

- Funciones: 1. Líneas aproximadas: 427.
- `renderMetricas` (L13275, 427 líneas)

### Mes completo en que cae esta semana

- Funciones: 1. Líneas aproximadas: 298.
- `renderIngresosDetalle` (L13988, 298 líneas)

### BRIEF PARA CLAUDE

- Funciones: 1. Líneas aproximadas: 263.
- `copiarBriefClaude` (L12593, 263 líneas)

### (solo si el usuario no presionó "Detener")

- Funciones: 3. Líneas aproximadas: 161.
- `_stopVoice` (L10180, 17 líneas), `_norm` (L10198, 3 líneas), `_parseVoice` (L10202, 141 líneas)

### Normalizar canal para citas antiguas que no lo tienen

- Funciones: 9. Líneas aproximadas: 142.
- `smartPeso` (L8231, 4 líneas), `smartDate` (L8236, 4 líneas), `smartWeekBounds` (L8241, 10 líneas), `smartIsPaid` (L8252, 4 líneas), `smartIsActiveAppointment` (L8257, 3 líneas), `smartPatientKey` (L8261, 3 líneas), `appointmentHealth` (L8265, 12 líneas), `smartBriefingData` (L8286, 42 líneas), `renderSmartBriefing` (L8329, 60 líneas)

### DASHBOARD

- Funciones: 1. Líneas aproximadas: 142.
- `initDashboard` (L8476, 142 líneas)

### MANUAL DE EMERGENCIA — funciones

- Funciones: 6. Líneas aproximadas: 134.
- `renderEmergencia` (L12877, 87 líneas), `toggleEmDim` (L12965, 7 líneas), `toggleEmCard` (L12973, 8 líneas), `handleEmStep` (L12982, 7 líneas), `_persistEmStep` (L12990, 8 líneas), `_updateEmProgress` (L12999, 17 líneas)

### TAREAS DEL DÍA

- Funciones: 10. Líneas aproximadas: 120.
- `getTplTarea` (L14509, 1 líneas), `guardarPlantillaTarea` (L14510, 6 líneas), `initTareasConfig` (L14516, 6 líneas), `_tareaKey` (L14522, 3 líneas), `_tareaEstado` (L14525, 1 líneas), `_tareaFechaTipo` (L14526, 7 líneas), `generarTareas` (L14533, 27 líneas), `toggleTareaFiltro` (L14560, 6 líneas), `renderTareas` (L14566, 20 líneas), `_renderTareasLista` (L14586, 43 líneas)

### SISTEMA DE AGENDAMIENTO MÚLTIPLE

- Funciones: 10. Líneas aproximadas: 110.
- `switchScheduleMode` (L7755, 10 líneas), `_updateSubmitLabel` (L7766, 16 líneas), `isMidnightTime` (L7783, 3 líneas), `timeHumanLabel` (L7787, 11 líneas), `updateTimeHelp` (L7799, 19 líneas), `adminScheduleRanges` (L7827, 14 líneas), `adminTimeToMinutes` (L7842, 5 líneas), `validateBusinessSchedule` (L7848, 13 líneas), `_addMultiDate` (L7861, 14 líneas), `_removeMultiDate` (L7876, 5 líneas)

### Human-readable display date from any date value

- Funciones: 9. Líneas aproximadas: 109.
- `fmtDate` (L8012, 7 líneas), `chipState` (L8020, 18 líneas), `waNombre` (L8039, 3 líneas), `waFechaES` (L8043, 8 líneas), `waAmPm` (L8052, 6 líneas), `ordinalES` (L8059, 4 líneas), `getInfoSesion` (L8064, 14 líneas), `waLink` (L8079, 38 líneas), `waLinkRec` (L8118, 11 líneas)

### Alerta semana floja

- Funciones: 1. Líneas aproximadas: 106.
- `_checkAlertaSemanFloja` (L13770, 106 líneas)

### COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN

- Funciones: 4. Líneas aproximadas: 104.
- `_copyGestionMesKey` (L11379, 3 líneas), `_copyGestionPeriodo` (L11383, 5 líneas), `_copyGestionTop` (L11389, 7 líneas), `_copyGestionData` (L11397, 89 líneas)

### Log de acciones

- Funciones: 7. Líneas aproximadas: 103.
- `segLogAction` (L10541, 6 líneas), `limpiarLogSeguimiento` (L10547, 6 líneas), `esDescargaMusc` (L10554, 4 líneas), `esReadaptacion` (L10559, 4 líneas), `readapZona` (L10564, 3 líneas), `setReadapZona` (L10567, 4 líneas), `renderSeguimiento` (L10572, 76 líneas)

### RECUPERACIÓN DE PACIENTES

- Funciones: 6. Líneas aproximadas: 103.
- `_loadRec` (L16024, 3 líneas), `_saveRec` (L16027, 3 líneas), `_fmtCLP` (L16031, 3 líneas), `_recMesActual` (L16035, 4 líneas), `_initRecMesSel` (L16040, 14 líneas), `renderRecuperaciones` (L16055, 76 líneas)

### LEADS - Sistema de conteo de prospectos

- Funciones: 11. Líneas aproximadas: 101.
- `getLeads` (L11240, 6 líneas), `saveLeads` (L11247, 3 líneas), `addLead` (L11251, 13 líneas), `deleteLastLead` (L11265, 7 líneas), `getLeadsHoy` (L11273, 4 líneas), `getLeadsSemana` (L11278, 8 líneas), `getLeadsMes` (L11287, 9 líneas), `registrarLead` (L11305, 9 líneas), `deshacerUltimoLead` (L11315, 10 líneas), `resetLeadsHoy` (L11326, 8 líneas), `actualizarContadorLeads` (L11335, 24 líneas)

### MÓDULO DE COMISIONES

- Funciones: 6. Líneas aproximadas: 99.
- `_comisGetConfig` (L15263, 20 líneas), `saveComisConfig` (L15284, 22 líneas), `toggleComisConfig` (L15307, 23 líneas), `_initComisMesSel` (L15331, 13 líneas), `_comisMesVal` (L15345, 4 líneas), `_comisSemanasLlenas` (L15350, 17 líneas)

### En modo mes el input de fecha solo necesita año-mes; mostramos un mes-picker alternativo

- Funciones: 4. Líneas aproximadas: 96.
- `_ingFmt` (L13890, 1 líneas), `_ingFmtLabel` (L13891, 1 líneas), `_ingFmtMes` (L13892, 1 líneas), `renderCitasResumen` (L13894, 93 líneas)

### Panel de voz (dictado por teclado iOS)

- Funciones: 4. Líneas aproximadas: 88.
- `toggleVoicePanel` (L10088, 9 líneas), `procesarVozTexto` (L10098, 7 líneas), `toggleVoice` (L10106, 9 líneas), `_startVoice` (L10116, 63 líneas)

### Accesibilidad incremental para controles existentes.

- Funciones: 1. Líneas aproximadas: 83.
- `initFunctionalModules2026` (L7039, 83 líneas)

### SIDEBAR / NAV

- Funciones: 1. Líneas aproximadas: 82.
- `initAdminUX2026` (L6956, 82 líneas)

### Fecha de hoy por defecto

- Funciones: 4. Líneas aproximadas: 79.
- `cerrarModalDisp` (L15698, 4 líneas), `buscarDisponibilidad` (L15704, 4 líneas), `_buscarDisp` (L15709, 33 líneas), `copiarDisponibilidadWA` (L15743, 38 líneas)

### GUIONES WA

- Funciones: 6. Líneas aproximadas: 76.
- `gEditarToggle` (L15936, 25 líneas), `gAutoGuardar` (L15962, 6 líneas), `gFitHeight` (L15968, 4 líneas), `gCargarGuardados` (L15972, 7 líneas), `gTabSwitch` (L15981, 10 líneas), `gCopiar` (L15991, 24 líneas)

### PACIENTES

- Funciones: 1. Líneas aproximadas: 73.
- `renderPacientes` (L9759, 73 líneas)

### CENTRO DE ACCIONES

- Funciones: 4. Líneas aproximadas: 72.
- `_daysSince` (L7208, 6 líneas), `_actionIcon` (L7215, 9 líneas), `_opsItem` (L7225, 1 líneas), `renderCentroAcciones` (L7229, 56 líneas)

### CENTRO DE AUTOMATIZACIONES

- Funciones: 10. Líneas aproximadas: 71.
- `loadAutomationCenter` (L7358, 21 líneas), `saveAutomationSettings` (L7380, 7 líneas), `setupAutomations` (L7388, 7 líneas), `runAutomationJob` (L7396, 7 líneas), `renderAutomationQueue` (L7404, 5 líneas), `renderAutomationLogs` (L7410, 5 líneas), `markAutomationMessage` (L7416, 3 líneas), `toggleSidebar` (L7420, 3 líneas), `toggleSidebarCollapse` (L7424, 7 líneas), `_initSidebarState` (L7432, 6 líneas)

### REPORTE CONVENIOS (Finanzas)

- Funciones: 2. Líneas aproximadas: 70.
- `renderConveniosReport` (L9295, 59 líneas), `_getPrecioServicio` (L9372, 11 líneas)

### PERFIL DEL ADMIN

- Funciones: 1. Líneas aproximadas: 68.
- `updateProfileCard` (L6840, 68 líneas)

### EVENTOS (Google Sheets via Apps Script)

- Funciones: 4. Líneas aproximadas: 68.
- `switchNuevaMode` (L9395, 7 líneas), `calcDuracion` (L9403, 13 líneas), `getDuracionStr` (L9417, 8 líneas), `submitEvento` (L9426, 40 líneas)

### HELPERS

- Funciones: 12. Líneas aproximadas: 66.
- `today` (L7513, 4 líneas), `pad` (L7517, 1 líneas), `parsePrecio` (L7519, 5 líneas), `formatPrecio` (L7524, 3 líneas), `toggleDescuento` (L7527, 5 líneas), `calcDescuento` (L7532, 13 líneas), `calcDescuentoMonto` (L7545, 12 líneas), `_showDescResult` (L7557, 5 líneas), `quitarDescuento` (L7562, 5 líneas), `getPrecioFinal` (L7567, 11 líneas), `markWaSent` (L7578, 1 líneas), `wasWaSent` (L7579, 1 líneas)

### Readaptación: separar reagendados

- Funciones: 1. Líneas aproximadas: 62.
- `_segCard` (L10691, 62 líneas)

### NOTAS RÁPIDAS

- Funciones: 4. Líneas aproximadas: 61.
- `initQuickNotes` (L11022, 6 líneas), `autoGuardarNota` (L11028, 10 líneas), `limpiarDuplicadosGAS` (L11040, 28 líneas), `detectarDuplicados` (L11069, 17 líneas)

### Actualizar badge en sidebar

- Funciones: 2. Líneas aproximadas: 58.
- `renderRecordatorios` (L10391, 53 líneas), `marcarRecordatorioEnviado` (L10467, 5 líneas)

### al menos 2 ciclos de render antes de aceptar el valor programático.

- Funciones: 2. Líneas aproximadas: 56.
- `eeeCalcDuracion` (L9528, 13 líneas), `eeeGuardar` (L9542, 43 líneas)

### Lo anterior queda como historial, pero no alimenta tareas, cobros vencidos ni alertas pendientes.

- Funciones: 2. Líneas aproximadas: 54.
- `isOperationalDate` (L6253, 4 líneas), `_sessionBridge` (L6258, 50 líneas)

### PAGO POR CITA

- Funciones: 7. Líneas aproximadas: 53.
- `isPagada` (L7591, 4 líneas), `getMetodoPago` (L7596, 4 líneas), `pagoBadge` (L7601, 9 líneas), `esCobrada` (L7611, 4 líneas), `abrirModalPago` (L7616, 11 líneas), `cerrarModalPago` (L7628, 4 líneas), `confirmarPago` (L7633, 17 líneas)

### HISTORIAL DE CAMBIOS

- Funciones: 4. Líneas aproximadas: 52.
- `logChange` (L9700, 8 líneas), `renderChangeLog` (L9709, 31 líneas), `toggleChangeLog` (L9741, 8 líneas), `clearChangeLog` (L9750, 5 líneas)

### Mensajes WA — personalizados según tipo de descarga y nota de relación

- Funciones: 1. Líneas aproximadas: 49.
- `_segCardReadap` (L10763, 49 líneas)

### LISTA DE ESPERA (sincronizada con Google Sheets; fallback local)

- Funciones: 6. Líneas aproximadas: 48.
- `_getWaitList` (L7295, 4 líneas), `_saveWaitList` (L7299, 1 líneas), `_syncWaitList` (L7302, 7 líneas), `addWaitPatient` (L7310, 16 líneas), `removeWaitPatient` (L7327, 5 líneas), `renderWaitList` (L7341, 15 líneas)

### Estado del toggle de desplazamiento (true = se cobra)

- Funciones: 4. Líneas aproximadas: 48.
- `toggleDesplazamientoBtn` (L9198, 12 líneas), `toggleCobrarDesplazamiento` (L9211, 5 líneas), `_renderDesplazamientoBtn` (L9217, 19 líneas), `sesionBadge` (L9245, 12 líneas)

### BUSCADOR PACIENTE

- Funciones: 2. Líneas aproximadas: 47.
- `_normStr` (L9608, 3 líneas), `searchPatient` (L9612, 44 líneas)

### BLOQUEAR

- Funciones: 3. Líneas aproximadas: 45.
- `renderBloqueos` (L8943, 15 líneas), `doBlock` (L8959, 19 líneas), `doUnblock` (L8979, 11 líneas)

### Espejo del getServiceDuration del GAS para calcular en el frontend

- Funciones: 4. Líneas aproximadas: 45.
- `_getServiceDurationJS` (L9090, 20 líneas), `_syncDuoTimeDisplay` (L9119, 5 líneas), `_onDuo2ServiceChange` (L9125, 7 líneas), `_clearDuo` (L9133, 13 líneas)

### Ocultar selector de planes y resetear

- Funciones: 4. Líneas aproximadas: 44.
- `_addToServiceChips` (L9026, 13 líneas), `_removeServiceChip` (L9040, 9 líneas), `_renderServiceChips` (L9050, 17 líneas), `_triggerAddService` (L9068, 5 líneas)

### EDITAR / BORRAR PACIENTE

- Funciones: 3. Líneas aproximadas: 44.
- `editarPacienteIdx` (L9884, 9 líneas), `editarPaciente` (L9893, 7 líneas), `guardarPaciente` (L9901, 28 líneas)

### tabla con filtros

- Funciones: 1. Líneas aproximadas: 43.
- `registrarRecuperacion` (L16132, 43 líneas)

### Limpiar formulario

- Funciones: 4. Líneas aproximadas: 42.
- `marcarPagado` (L16176, 10 líneas), `desmarcarPago` (L16187, 9 líneas), `eliminarRecuperacion` (L16197, 7 líneas), `pagarTodasComisiones` (L16205, 16 líneas)

### Carga pacientes inactivos 3+ meses desde GAS

- Funciones: 3. Líneas aproximadas: 42.
- `cargarInactivos` (L16223, 17 líneas), `_recPreguntaDolencia` (L16244, 10 líneas), `_renderRecMsgSelector` (L16290, 15 líneas)

### Badge sidebar

- Funciones: 1. Líneas aproximadas: 41.
- `_renderSegLista` (L10649, 41 líneas)

### KV SYNC — datos persistentes sincronizados en todos los dispositivos via GAS

- Funciones: 5. Líneas aproximadas: 40.
- `loadAdminKV` (L6153, 9 líneas), `kvGet` (L6163, 4 líneas), `kvSet` (L6168, 8 líneas), `kvRemove` (L6177, 7 líneas), `_flushKV` (L6185, 12 líneas)

### Fallback: agenda

- Funciones: 3. Líneas aproximadas: 40.
- `updateBadge` (L8740, 7 líneas), `resumenDiaWA` (L8748, 28 líneas), `row` (L8809, 5 líneas)

### ENCUESTA STATS — conectado a Google Forms via GAS

- Funciones: 2. Líneas aproximadas: 40.
- `getEncuestaStats` (L13065, 3 líneas), `loadEncuestaStats` (L13069, 37 líneas)

### Usamos un pequeño delay para leer el valor actualizado

- Funciones: 3. Líneas aproximadas: 40.
- `resetRutina` (L13162, 5 líneas), `resetRutinaGrupo` (L13168, 16 líneas), `_syncPreciosToAutoFill` (L13233, 19 líneas)

### Tiempo de sesión activa

- Funciones: 2. Líneas aproximadas: 37.
- `openCambiarPassword` (L6909, 6 líneas), `cambiarPassword` (L6916, 31 líneas)

### Reutiliza el modal de reporte

- Funciones: 1. Líneas aproximadas: 36.
- `_verCobrosPendientesSemana` (L8655, 36 líneas)

### Detectar nota de relación: si notaAdmin contiene [PARA: ...]

- Funciones: 4. Líneas aproximadas: 34.
- `waEncuesta` (L8153, 8 líneas), `waBtn` (L8162, 5 líneas), `toast` (L8176, 7 líneas), `reload` (L8184, 14 líneas)

### RUTINA DE MEDICIÓN — checklist tachable con reinicio diario

- Funciones: 3. Líneas aproximadas: 33.
- `_rutinaKey` (L13126, 4 líneas), `loadRutinaChecks` (L13131, 13 líneas), `toggleRutinaCheck` (L13145, 16 líneas)

### COBROS PENDIENTES DETALLE

- Funciones: 1. Líneas aproximadas: 32.
- `_verCobrosPendientes` (L8622, 32 líneas)

### Automatización #3: cobros pendientes (3+ días sin registrar pago)

- Funciones: 1. Líneas aproximadas: 32.
- `_checkCobrosPendientes` (L13734, 32 líneas)

### EXPORTAR AGENDA DEL DÍA

- Funciones: 1. Líneas aproximadas: 29.
- `exportarAgendaDia` (L7680, 29 líneas)

### Auto-login si tiene sesión guardada

- Funciones: 1. Líneas aproximadas: 27.
- `_runUrlRepairIfRequested` (L6811, 27 líneas)

### Cierra el modal de edición (abre con style.display, no con clase .open)

- Funciones: 2. Líneas aproximadas: 27.
- `cerrarModalEditarEvento` (L9499, 3 líneas), `abrirEditarEvento` (L9503, 24 líneas)

### Automatización #2: marcar citas pasadas como Atendidas

- Funciones: 2. Líneas aproximadas: 27.
- `_checkAutoAtendida` (L13704, 19 líneas), `marcarTodasAtendidas` (L13724, 8 líneas)

### PAQUETES Y MEMBRESÍAS

- Funciones: 3. Líneas aproximadas: 27.
- `guardarPaqueteAsignado` (L14699, 17 líneas), `guardarPlantillaPaquete` (L14744, 9 líneas), `_getEmpresas` (L14760, 1 líneas)

### ALERTA CITA PRÓXIMA

- Funciones: 1. Líneas aproximadas: 26.
- `checkUpcomingAlerts` (L7652, 26 líneas)

### VISTA SEMANAL (dashboard)

- Funciones: 1. Líneas aproximadas: 24.
- `renderWeekGrid` (L7967, 24 líneas)

### CONVENIO HANDLERS

- Funciones: 3. Líneas aproximadas: 24.
- `parsePrecioNum` (L9259, 4 líneas), `fmtPeso` (L9264, 3 líneas), `onConvenioChange` (L9268, 17 líneas)

### Mostrar texto decodificado (los \uXXXX ya son Unicode real, encodeURIComponent los codifica)

- Funciones: 2. Líneas aproximadas: 24.
- `cerrarWaCopyModal` (L15194, 3 líneas), `copiarMsgWA` (L15198, 21 líneas)

### ABONO PARCIAL

- Funciones: 2. Líneas aproximadas: 22.
- `toggleAbonoPanel` (L7711, 11 líneas), `getAbonoNota` (L7731, 11 líneas)

### BANNERS CONTEXTUALES — colapsar/expandir

- Funciones: 2. Líneas aproximadas: 22.
- `toggleHelpBanner` (L15230, 9 líneas), `restoreHelpBanners` (L15240, 13 líneas)

### MENSAJES PREDETERMINADOS

- Funciones: 4. Líneas aproximadas: 22.
- `_getMensajesPre` (L15794, 3 líneas), `_setMensajesPre` (L15797, 1 líneas), `_initMensajesPre` (L15826, 5 líneas), `renderMensajes` (L15832, 13 líneas)

### Helpers KV sync seguimiento

- Funciones: 4. Líneas aproximadas: 21.
- `segReagendo` (L10518, 1 líneas), `segToggleR` (L10519, 13 líneas), `segWaSent` (L10532, 1 líneas), `segMarkWa` (L10533, 6 líneas)

### Construir texto plano desde el HTML

- Funciones: 1. Líneas aproximadas: 21.
- `imprimirReporteMes` (L12568, 21 líneas)

### Contador animado para números del dashboard

- Funciones: 1. Líneas aproximadas: 20.
- `_animateCounter` (L7444, 20 líneas)

### Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)

- Funciones: 1. Líneas aproximadas: 20.
- `_renderHistorial` (L9847, 20 líneas)

### 9 · PLAN DE MEJORA

- Funciones: 1. Líneas aproximadas: 20.
- `copiarReporteMes` (L12547, 20 líneas)

### BÚSQUEDA GLOBAL EXPANDIDA

- Funciones: 1. Líneas aproximadas: 19.
- `globalSearch` (L8693, 19 líneas)

### Re-render para mostrar checkmark

- Funciones: 1. Líneas aproximadas: 19.
- `enviarEmailsRecordatorio` (L10473, 19 líneas)

### Citas reales (sin registros, sin canceladas, sin duplicados)

- Funciones: 1. Líneas aproximadas: 18.
- `citasReales` (L8212, 18 líneas)

### Limpiar filtros para que el evento sea visible (eventos se ocultan si hay filtros activos)

- Funciones: 2. Líneas aproximadas: 18.
- `clearEvento` (L9467, 7 líneas), `eliminarEvento` (L9475, 11 líneas)

### Mensajes predefinidos con el nombre del paciente

- Funciones: 1. Líneas aproximadas: 17.
- `cargarRecordatorios` (L10373, 17 líneas)

### Actualizar en memoria

- Funciones: 1. Líneas aproximadas: 15.
- `borrarPaciente` (L9930, 15 líneas)

### Actualizar inputs ocultos y guardar

- Funciones: 1. Líneas aproximadas: 15.
- `_renderEncuestaStatsUI` (L13107, 15 líneas)

### NUEVA CITA (ADMIN)

- Funciones: 1. Líneas aproximadas: 14.
- `onServiceMainChange` (L9000, 14 líneas)

### helpers de estado por paciente (persisten en localStorage)

- Funciones: 4. Líneas aproximadas: 13.
- `_refKey` (L16407, 3 líneas), `_refGetEstado` (L16410, 3 líneas), `_refSetEstado` (L16413, 3 líneas), `marcarRefEstado` (L16417, 4 líneas)

### Eliminar viejo → crear nuevo con los datos actualizados

- Funciones: 1. Líneas aproximadas: 12.
- `eeeEliminar` (L9586, 12 líneas)

### Agrupa por: teléfono (10 dígitos) > email > nombre — evita duplicados

- Funciones: 2. Líneas aproximadas: 12.
- `verHistorial` (L9833, 5 líneas), `verHistorialPac` (L9839, 7 líneas)

### ENVIAR EMAIL A UN SOLO PACIENTE (recordatorio)

- Funciones: 1. Líneas aproximadas: 12.
- `enviarEmailUno` (L10939, 12 líneas)

### o menos del 60% al jueves, o menos del 80% al viernes → alerta

- Funciones: 1. Líneas aproximadas: 11.
- `setModoIngresos` (L13878, 11 líneas)

### Consistencia de semanas

- Funciones: 1. Líneas aproximadas: 11.
- `_renderAnalisis` (L14487, 11 líneas)

### DISPONIBILIDAD RÁPIDA

- Funciones: 1. Líneas aproximadas: 11.
- `abrirModalDisp` (L15686, 11 líneas)

### Reset selector para permitir agregar otro

- Funciones: 1. Líneas aproximadas: 10.
- `onServicePlanChange` (L9015, 10 líneas)

### CALENDARIO

- Funciones: 4. Líneas aproximadas: 10.
- `getMonday` (L10024, 7 líneas), `_getSR` (L10079, 1 líneas), `_voiceBtn` (L10081, 1 líneas), `_voiceStatusEl` (L10082, 1 líneas)

### Adaptadores de compatibilidad — Fase 4 Pagos.

- Funciones: 1. Líneas aproximadas: 9.
- `downloadOperationsCSV` (L6690, 9 líneas)

### SEGUNDA PERSONA (duo)

- Funciones: 1. Líneas aproximadas: 9.
- `toggleSegundaPersona` (L9079, 9 líneas)

### Hooking initDashboard para animar los valores al cargar

- Funciones: 1. Líneas aproximadas: 8.
- `_animateDashStats` (L7467, 8 líneas)

### Skeleton para tablas mientras carga

- Funciones: 1. Líneas aproximadas: 8.
- `_showTableSkeleton` (L7503, 8 líneas)

### Filtros activos

- Funciones: 1. Líneas aproximadas: 8.
- `toggleSegFiltro` (L10508, 8 líneas)

### DARK MODE

- Funciones: 1. Líneas aproximadas: 8.
- `toggleDarkMode` (L10904, 8 líneas)

### Mobile bottom nav sync

- Funciones: 1. Líneas aproximadas: 7.
- `_syncMobileNav` (L7485, 7 líneas)

### Actualizar badge de pendientes en mobile nav

- Funciones: 1. Líneas aproximadas: 7.
- `_updateMobBadge` (L7494, 7 líneas)

### Normaliza cualquier string de hora a "HH:MM" (formato que acepta input[type=time])

- Funciones: 1. Líneas aproximadas: 6.
- `normHHMM` (L9491, 6 líneas)

### EVAL EXPRESS

- Funciones: 1. Líneas aproximadas: 5.
- `openEvalExpress` (L6949, 5 líneas)

### Normalizes any date value (Date object, ISO string, plain "YYYY-MM-DD") → "YYYY-MM-DD"

- Funciones: 1. Líneas aproximadas: 5.
- `normDate` (L8006, 5 líneas)

### Mensaje de seguimiento WhatsApp personalizado

- Funciones: 1. Líneas aproximadas: 5.
- `seguimientoWA` (L8936, 5 líneas)

### CITAS RECURRENTES

- Funciones: 1. Líneas aproximadas: 3.
- `toggleRecurringPanel` (L7744, 3 líneas)

### Returns "YYYY-MM-DD" from a Date object (always local time, never UTC)

- Funciones: 1. Líneas aproximadas: 3.
- `toDateStr` (L8000, 3 líneas)

### esCobrada definida arriba junto a pagoBadge

- Funciones: 1. Líneas aproximadas: 3.
- `esCobrada_UNUSED` (L8207, 3 líneas)

### MODALS

- Funciones: 2. Líneas aproximadas: 2.
- `openModal` (L10899, 1 líneas), `closeModal` (L10900, 1 líneas)

### Análisis financiero semanal

- Funciones: 1. Líneas aproximadas: 1.
- `_analisisSemana` (L14288, 1 líneas)

### Análisis financiero mensual

- Funciones: 1. Líneas aproximadas: 1.
- `_analisisMes` (L14428, 1 líneas)

## Nota de planificación

Una fase no debe equivaler automáticamente a una sección. Las funciones pequeñas y utilidades compartidas pueden agruparse, mientras que las secciones con muchas dependencias deben dividirse para conservar pruebas y aislamiento.
