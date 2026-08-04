# Contrato real del backend para pagos

Archivo: `audit-backend.js`

## Ruta savePayment

Coincidencias: 2

### Coincidencia 1 — línea 205

```javascript
150:   if (p.action === 'updateStatus')  return js(doUpdateStatus(p, sessionUser));
151:   if (p.action === 'adminBook')     return js(createBooking(JSON.parse(p.data), true));
152:   if (p.action === 'getCalEvents')  return js(getCalendarEvents(p.from, p.to));
153:   if (p.action === 'cancelBooking') return js(doCancelBooking(p.id));
154:   if (p.action === 'editBooking')   return js(doEditBooking(JSON.parse(p.data)));
155:   if (p.action === 'repairRescheduledDuplicate') return js(doRepairRescheduledDuplicate(p));
156:   if (p.action === 'deletePatient')  return js(deletePatient(decodeURIComponent(p.nombre)));
157:   if (p.action === 'editPatient')    return js(editPatient(JSON.parse(p.data)));
158:   if (p.action === 'cleanCitasSinHora') return js(cleanCitasSinHora());
159:   if (p.action === 'cleanInvalidCitaTimes') return js(cleanInvalidCitaTimes());
160:   if (p.action === 'getReminders')   return js(getRemindersData());
161:   if (p.action === 'sendReminders')  return js(sendEmailReminders());
162:   if (p.action === 'getInactivos')   return js(getInactivosData());
163:   if (p.action === 'generateEval')   return js(generateEvalReport(JSON.parse(decodeURIComponent(p.data))));
164:   if (p.action === 'updatePago')     return js(doUpdatePago(p));
165:   if (p.action === 'getAdminKV')     return js(getAdminKV());
166:   if (p.action === 'setAdminKV')     return js(doSetAdminKV(p.data));
167:   if (p.action === 'generarCodigo')  return js(generarCodigo(p));
168:   if (p.action === 'registrarCodigo') return js(registrarCodigo(p));
169:   if (p.action === 'actualizarCodigo') return js(actualizarCodigo(p));
170:   if (p.action === 'getCodigos')     return js(getCodigos());
171:   if (p.action === 'crearEvento')    return js(crearEvento(p));
172:   if (p.action === 'eliminarEvento') return js(eliminarEvento(p));
173:   if (p.action === 'getEncuestaStats')    return js(getEncuestaStats_());
174:   if (p.action === 'autoMarcarAtendidas') return js(autoMarcarAtendidas());
175:   if (p.action === 'expireTemporaryReservations') return js(expireTemporaryReservations_());
176:   if (p.action === 'automationStatus')     return js(getAutomationStatus());
177:   if (p.action === 'automationSave')       { var bo0 = requireAdminOnly_(sessionUser, p.action); if (bo0) return js(bo0); return js(saveAutomationConfig(p.data)); }
178:   if (p.action === 'automationSetup')      { var bo1 = requireAdminOnly_(sessionUser, p.action); if (bo1) return js(bo1); return js(setupAllAutomations()); }
179:   if (p.action === 'automationRun')        { var bo2 = requireAdminOnly_(sessionUser, p.action); if (bo2) return js(bo2); return js(runAutomationNow(p.job || 'morning')); }
180:   if (p.action === 'automationQueue')      return js(getAutomationQueue(p.status || 'pending'));
181:   if (p.action === 'automationQueueDone')  { var bo3 = requireAdminOnly_(sessionUser, p.action); if (bo3) return js(bo3); return js(markAutomationQueueDone(p.id)); }
182:   if (p.action === 'getKPIHistory')        return js(getKPIHistory_());
183:   if (p.action === 'getWaitlist')          return js(getWaitlist());
184:   if (p.action === 'addWaitlist')          return js(addWaitlist(p.data));
185:   if (p.action === 'removeWaitlist')       return js(removeWaitlist(p.id));
186:   if (p.action === 'teamData')             return js(getTeamModuleData_());
187:   if (p.action === 'saveProfessional')     return js(saveProfessional_(p.data, sessionUser));
188:   if (p.action === 'resetProfessionalPassword') return js(resetProfessionalPassword_(p.id, sessionUser));
189:   if (p.action === 'toggleProfessional')   return js(toggleProfessional_(p.id, p.estado, sessionUser));
190:   if (p.action === 'deleteProfessional')   return js(deleteProfessional_(p.id, sessionUser));
191:   if (p.action === 'assignProfessional')   return js(assignProfessionalToAppointment_(p));
192:   if (p.action === 'authorizeAppointment') return js(authorizeAppointmentForProfessional_(p));
193:   if (p.action === 'authorizeCourtesy')     return js(authorizeCourtesy_(p, sessionUser));
194:   if (p.action === 'createCreditBalance')   return js(createCreditBalance_(p, sessionUser));
195:   if (p.action === 'applyCreditBalance')    return js(applyCreditBalance_(p, sessionUser));
196:   if (p.action === 'markPayablePaid')      return js(markProfessionalPayablePaid_(p.id, sessionUser));
197:   if (p.action === 'setupOperationsModule') return js(setupOperationsModule_());
198:   if (p.action === 'operationsData')        return js(getOperationsData_());
199:   if (p.action === 'dailyOpsData')          return js(getDailyOperationsData_(p.date, p.mode));
200:   if (p.action === 'saveDailyPreparation')  return js(saveDailyPreparation_(p.data, sessionUser));
201:   if (p.action === 'logDailyReminder')      return js(logDailyReminder_(p, sessionUser));
202:   if (p.action === 'addDailyObservation')   return js(addDailyObservation_(p, sessionUser));
203:   if (p.action === 'simulateStateMigration') return js(simulateStateMigration_());
204:   if (p.action === 'backupStateMigrationSheets') return js(backupStateMigrationSheets_());
205:   if (p.action === 'savePayment')           return js(savePayment_(p.data, sessionUser));
206:   if (p.action === 'verifyPayment')         return js(verifyPayment_(p, sessionUser));
207:   if (p.action === 'savePaymentAccount')    return js(savePaymentAccount_(p.data, sessionUser));
208:   if (p.action === 'passportAdminList')      return js(passportAdminList_());
209:   if (p.action === 'passportEnsure')         return js(passportEnsure_(decodeURIComponent(p.nombre || ''), p.telefono || '', sessionUser));
210:   if (p.action === 'passportSaveProgress')   return js(passportSaveProgress_(p.id, p.passport || '{}', p.descarga || '{}', sessionUser));
211:   if (p.action === 'passportRegenerateToken') return js(passportRegenerateToken_(p.id, sessionUser));
212:   if (p.action === 'passportDeactivate')     return js(passportDeactivate_(p.id, sessionUser));
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
```

### Coincidencia 2 — línea 275

```javascript
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
```

## Ruta verifyPayment

Coincidencias: 2

### Coincidencia 1 — línea 206

```javascript
151:   if (p.action === 'adminBook')     return js(createBooking(JSON.parse(p.data), true));
152:   if (p.action === 'getCalEvents')  return js(getCalendarEvents(p.from, p.to));
153:   if (p.action === 'cancelBooking') return js(doCancelBooking(p.id));
154:   if (p.action === 'editBooking')   return js(doEditBooking(JSON.parse(p.data)));
155:   if (p.action === 'repairRescheduledDuplicate') return js(doRepairRescheduledDuplicate(p));
156:   if (p.action === 'deletePatient')  return js(deletePatient(decodeURIComponent(p.nombre)));
157:   if (p.action === 'editPatient')    return js(editPatient(JSON.parse(p.data)));
158:   if (p.action === 'cleanCitasSinHora') return js(cleanCitasSinHora());
159:   if (p.action === 'cleanInvalidCitaTimes') return js(cleanInvalidCitaTimes());
160:   if (p.action === 'getReminders')   return js(getRemindersData());
161:   if (p.action === 'sendReminders')  return js(sendEmailReminders());
162:   if (p.action === 'getInactivos')   return js(getInactivosData());
163:   if (p.action === 'generateEval')   return js(generateEvalReport(JSON.parse(decodeURIComponent(p.data))));
164:   if (p.action === 'updatePago')     return js(doUpdatePago(p));
165:   if (p.action === 'getAdminKV')     return js(getAdminKV());
166:   if (p.action === 'setAdminKV')     return js(doSetAdminKV(p.data));
167:   if (p.action === 'generarCodigo')  return js(generarCodigo(p));
168:   if (p.action === 'registrarCodigo') return js(registrarCodigo(p));
169:   if (p.action === 'actualizarCodigo') return js(actualizarCodigo(p));
170:   if (p.action === 'getCodigos')     return js(getCodigos());
171:   if (p.action === 'crearEvento')    return js(crearEvento(p));
172:   if (p.action === 'eliminarEvento') return js(eliminarEvento(p));
173:   if (p.action === 'getEncuestaStats')    return js(getEncuestaStats_());
174:   if (p.action === 'autoMarcarAtendidas') return js(autoMarcarAtendidas());
175:   if (p.action === 'expireTemporaryReservations') return js(expireTemporaryReservations_());
176:   if (p.action === 'automationStatus')     return js(getAutomationStatus());
177:   if (p.action === 'automationSave')       { var bo0 = requireAdminOnly_(sessionUser, p.action); if (bo0) return js(bo0); return js(saveAutomationConfig(p.data)); }
178:   if (p.action === 'automationSetup')      { var bo1 = requireAdminOnly_(sessionUser, p.action); if (bo1) return js(bo1); return js(setupAllAutomations()); }
179:   if (p.action === 'automationRun')        { var bo2 = requireAdminOnly_(sessionUser, p.action); if (bo2) return js(bo2); return js(runAutomationNow(p.job || 'morning')); }
180:   if (p.action === 'automationQueue')      return js(getAutomationQueue(p.status || 'pending'));
181:   if (p.action === 'automationQueueDone')  { var bo3 = requireAdminOnly_(sessionUser, p.action); if (bo3) return js(bo3); return js(markAutomationQueueDone(p.id)); }
182:   if (p.action === 'getKPIHistory')        return js(getKPIHistory_());
183:   if (p.action === 'getWaitlist')          return js(getWaitlist());
184:   if (p.action === 'addWaitlist')          return js(addWaitlist(p.data));
185:   if (p.action === 'removeWaitlist')       return js(removeWaitlist(p.id));
186:   if (p.action === 'teamData')             return js(getTeamModuleData_());
187:   if (p.action === 'saveProfessional')     return js(saveProfessional_(p.data, sessionUser));
188:   if (p.action === 'resetProfessionalPassword') return js(resetProfessionalPassword_(p.id, sessionUser));
189:   if (p.action === 'toggleProfessional')   return js(toggleProfessional_(p.id, p.estado, sessionUser));
190:   if (p.action === 'deleteProfessional')   return js(deleteProfessional_(p.id, sessionUser));
191:   if (p.action === 'assignProfessional')   return js(assignProfessionalToAppointment_(p));
192:   if (p.action === 'authorizeAppointment') return js(authorizeAppointmentForProfessional_(p));
193:   if (p.action === 'authorizeCourtesy')     return js(authorizeCourtesy_(p, sessionUser));
194:   if (p.action === 'createCreditBalance')   return js(createCreditBalance_(p, sessionUser));
195:   if (p.action === 'applyCreditBalance')    return js(applyCreditBalance_(p, sessionUser));
196:   if (p.action === 'markPayablePaid')      return js(markProfessionalPayablePaid_(p.id, sessionUser));
197:   if (p.action === 'setupOperationsModule') return js(setupOperationsModule_());
198:   if (p.action === 'operationsData')        return js(getOperationsData_());
199:   if (p.action === 'dailyOpsData')          return js(getDailyOperationsData_(p.date, p.mode));
200:   if (p.action === 'saveDailyPreparation')  return js(saveDailyPreparation_(p.data, sessionUser));
201:   if (p.action === 'logDailyReminder')      return js(logDailyReminder_(p, sessionUser));
202:   if (p.action === 'addDailyObservation')   return js(addDailyObservation_(p, sessionUser));
203:   if (p.action === 'simulateStateMigration') return js(simulateStateMigration_());
204:   if (p.action === 'backupStateMigrationSheets') return js(backupStateMigrationSheets_());
205:   if (p.action === 'savePayment')           return js(savePayment_(p.data, sessionUser));
206:   if (p.action === 'verifyPayment')         return js(verifyPayment_(p, sessionUser));
207:   if (p.action === 'savePaymentAccount')    return js(savePaymentAccount_(p.data, sessionUser));
208:   if (p.action === 'passportAdminList')      return js(passportAdminList_());
209:   if (p.action === 'passportEnsure')         return js(passportEnsure_(decodeURIComponent(p.nombre || ''), p.telefono || '', sessionUser));
210:   if (p.action === 'passportSaveProgress')   return js(passportSaveProgress_(p.id, p.passport || '{}', p.descarga || '{}', sessionUser));
211:   if (p.action === 'passportRegenerateToken') return js(passportRegenerateToken_(p.id, sessionUser));
212:   if (p.action === 'passportDeactivate')     return js(passportDeactivate_(p.id, sessionUser));
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
```

### Coincidencia 2 — línea 280

```javascript
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
331:   if (soloRegistro) {
332:     upsertPaciente(d.name, d.phone, d.email);
333:     return {ok: true, id: 'REG-' + new Date().getTime()};
334:   }
335: 
```

## Estado COMPROBANTE_RECIBIDO

Coincidencias: 15

### Coincidencia 1 — línea 1563

```javascript
1508: function ensurePayableForAppointment_(professionalId, citaId, servicio, tarifa) {
1509:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1510:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][2] === citaId) return;
1511:   sh.appendRow(['PAG-' + new Date().getTime(), professionalId, citaId, servicio || '', tarifa || '', 'Pendiente', new Date(), '', '']);
1512: }
1513: function markProfessionalPayablePaid_(id) {
1514:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1515:   for (var i = 1; i < rows.length; i++) {
1516:     if ('' + rows[i][0] !== '' + id) continue;
1517:     sh.getRange(i+1, 6, 1, 3).setValues([['Pagada', new Date(), 'LIQ-' + Utilities.formatDate(new Date(), 'America/Bogota', 'yyyyMM')]]);
1518:     return {ok:true};
1519:   }
1520:   return {ok:false,error:'Cuenta no encontrada'};
1521: }
1522: function getTeamModuleData_() {
1523:   function sheetRows(name) {
1524:     var sh = teamSheet_(name), values = sh.getDataRange().getValues();
1525:     var headers = values[0], out = [];
1526:     for (var i = 1; i < values.length; i++) {
1527:       if (!values[i][0]) continue;
1528:       var o = rowObj_(headers, values[i]);
1529:       Object.keys(o).forEach(function(k) {
1530:         if (o[k] instanceof Date) o[k] = o[k].toISOString();
1531:         else o[k] = '' + (o[k] || '');
1532:       });
1533:       out.push(o);
1534:     }
1535:     return out;
1536:   }
1537:   return {
1538:     ok:true,
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
```

### Coincidencia 2 — línea 1563

```javascript
1508: function ensurePayableForAppointment_(professionalId, citaId, servicio, tarifa) {
1509:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1510:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][2] === citaId) return;
1511:   sh.appendRow(['PAG-' + new Date().getTime(), professionalId, citaId, servicio || '', tarifa || '', 'Pendiente', new Date(), '', '']);
1512: }
1513: function markProfessionalPayablePaid_(id) {
1514:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1515:   for (var i = 1; i < rows.length; i++) {
1516:     if ('' + rows[i][0] !== '' + id) continue;
1517:     sh.getRange(i+1, 6, 1, 3).setValues([['Pagada', new Date(), 'LIQ-' + Utilities.formatDate(new Date(), 'America/Bogota', 'yyyyMM')]]);
1518:     return {ok:true};
1519:   }
1520:   return {ok:false,error:'Cuenta no encontrada'};
1521: }
1522: function getTeamModuleData_() {
1523:   function sheetRows(name) {
1524:     var sh = teamSheet_(name), values = sh.getDataRange().getValues();
1525:     var headers = values[0], out = [];
1526:     for (var i = 1; i < values.length; i++) {
1527:       if (!values[i][0]) continue;
1528:       var o = rowObj_(headers, values[i]);
1529:       Object.keys(o).forEach(function(k) {
1530:         if (o[k] instanceof Date) o[k] = o[k].toISOString();
1531:         else o[k] = '' + (o[k] || '');
1532:       });
1533:       out.push(o);
1534:     }
1535:     return out;
1536:   }
1537:   return {
1538:     ok:true,
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
```

### Coincidencia 3 — línea 1593

```javascript
1538:     ok:true,
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
```

### Coincidencia 4 — línea 1621

```javascript
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
```

### Coincidencia 5 — línea 1967

```javascript
1912:     'HST-' + new Date().getTime() + '-' + Math.floor(Math.random()*999),
1913:     citaId || '', code, 'REPROGRAMACION', 'REPROGRAMACION_REGISTRADA', new Date(),
1914:     user.id || '', user.nombre || 'Administracion', user.rol || 'Superadministradora',
1915:     motivo || '',
1916:     'REPROGRAMACION',
1917:     (oldFecha || '') + ' ' + (oldHora || ''),
1918:     (newFecha || '') + ' ' + (newHora || ''),
1919:     motivo || '',
1920:     count || ''
1921:   ]);
1922:   auditGeneral_(user, 'Reprogramo cita', 'Cita', citaId, (oldFecha || '') + ' ' + (oldHora || ''), (newFecha || '') + ' ' + (newHora || ''), motivo || '');
1923: }
1924: 
1925: function expireTemporaryReservations_() {
1926:   setupOperationsModule_();
1927:   var ss = getOrCreateSheet();
1928:   var sheet = ss.getSheetByName('Citas');
1929:   var map = ensureCitasStateColumns_();
1930:   var rows = sheet.getDataRange().getValues();
1931:   var now = new Date();
1932:   var user = {id:'system', nombre:'Sistema', rol:'Automatizacion'};
1933:   var expired = [];
1934:   for (var i = 1; i < rows.length; i++) {
1935:     var row = rows[i];
1936:     var citaId = '' + (row[0] || '');
1937:     if (!citaId) continue;
1938:     var state = getCitaStateFromRow_(row, map);
1939:     var estadoPago = state.estadoPago || '';
1940:     var estadoCita = state.estadoCita || '';
1941:     var legacyState = '' + (row[10] || '');
1942:     var hasLegacyPayment = hasLegacyPaymentMarker_(row[14]);
1943:     var expiresAt = map.VenceReserva ? parseReservationExpiry_(row[map.VenceReserva - 1]) : null;
1944:     if (!expiresAt) continue;
1945:     if (expiresAt > now) continue;
1946:     if (estadoPago !== PAYMENT_STATUS.PENDIENTE_PAGO) continue;
1947:     if (estadoCita !== APPOINTMENT_STATUS.RESERVADA) continue;
1948:     if (hasLegacyPayment) continue;
1949:     if (hasActivePaymentForCita_(citaId)) continue;
1950:     var prev = legacyState + ' => ' + estadoPago + ' / ' + estadoCita;
1951:     var next = 'RESERVA_VENCIDA => ' + estadoPago + ' / ' + APPOINTMENT_STATUS.CANCELADA;
1952:     sheet.getRange(i + 1, 11).setValue('Cancelada');
1953:     if (map.EstadoCita) sheet.getRange(i + 1, map.EstadoCita).setValue(APPOINTMENT_STATUS.CANCELADA);
1954:     if (map.RequiereCierreAdmin) sheet.getRange(i + 1, map.RequiereCierreAdmin).setValue('');
1955:     recordAppointmentStatusHistory_(citaId, prev, next, user, 'Motivo: RESERVA_VENCIDA. Reserva temporal vencida sin comprobante ni pago aprobado.');
1956:     auditGeneral_(user, 'RESERVA_VENCIDA', 'Cita', citaId, prev, next, 'Cancelada por vencimiento de 60 minutos; horario liberado.');
1957:     expired.push({id:citaId, nombre:row[2] || '', fecha:sd(row[7]), hora:st(row[8])});
1958:   }
1959:   return {ok:true, expired:expired.length, citas:expired};
1960: }
1961: 
1962: function hasLegacyPaymentMarker_(value) {
1963:   var raw = ('' + (value || '')).trim();
1964:   if (!raw) return false;
1965:   var normalizedStatuses = [
1966:     PAYMENT_STATUS.PENDIENTE_PAGO,
1967:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1968:     PAYMENT_STATUS.PAGO_APROBADO,
1969:     PAYMENT_STATUS.PAGO_RECHAZADO,
1970:     PAYMENT_STATUS.REEMBOLSADO,
1971:     PAYMENT_STATUS.NO_REQUIERE_PAGO
1972:   ];
1973:   if (normalizedStatuses.indexOf(raw) >= 0) return false;
1974:   var key = normalizeKey_(raw);
1975:   if (key === 'pendiente' || key === 'pendiente de pago') return false;
1976:   return true;
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
```

### Coincidencia 6 — línea 1995

```javascript
1940:     var estadoCita = state.estadoCita || '';
1941:     var legacyState = '' + (row[10] || '');
1942:     var hasLegacyPayment = hasLegacyPaymentMarker_(row[14]);
1943:     var expiresAt = map.VenceReserva ? parseReservationExpiry_(row[map.VenceReserva - 1]) : null;
1944:     if (!expiresAt) continue;
1945:     if (expiresAt > now) continue;
1946:     if (estadoPago !== PAYMENT_STATUS.PENDIENTE_PAGO) continue;
1947:     if (estadoCita !== APPOINTMENT_STATUS.RESERVADA) continue;
1948:     if (hasLegacyPayment) continue;
1949:     if (hasActivePaymentForCita_(citaId)) continue;
1950:     var prev = legacyState + ' => ' + estadoPago + ' / ' + estadoCita;
1951:     var next = 'RESERVA_VENCIDA => ' + estadoPago + ' / ' + APPOINTMENT_STATUS.CANCELADA;
1952:     sheet.getRange(i + 1, 11).setValue('Cancelada');
1953:     if (map.EstadoCita) sheet.getRange(i + 1, map.EstadoCita).setValue(APPOINTMENT_STATUS.CANCELADA);
1954:     if (map.RequiereCierreAdmin) sheet.getRange(i + 1, map.RequiereCierreAdmin).setValue('');
1955:     recordAppointmentStatusHistory_(citaId, prev, next, user, 'Motivo: RESERVA_VENCIDA. Reserva temporal vencida sin comprobante ni pago aprobado.');
1956:     auditGeneral_(user, 'RESERVA_VENCIDA', 'Cita', citaId, prev, next, 'Cancelada por vencimiento de 60 minutos; horario liberado.');
1957:     expired.push({id:citaId, nombre:row[2] || '', fecha:sd(row[7]), hora:st(row[8])});
1958:   }
1959:   return {ok:true, expired:expired.length, citas:expired};
1960: }
1961: 
1962: function hasLegacyPaymentMarker_(value) {
1963:   var raw = ('' + (value || '')).trim();
1964:   if (!raw) return false;
1965:   var normalizedStatuses = [
1966:     PAYMENT_STATUS.PENDIENTE_PAGO,
1967:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1968:     PAYMENT_STATUS.PAGO_APROBADO,
1969:     PAYMENT_STATUS.PAGO_RECHAZADO,
1970:     PAYMENT_STATUS.REEMBOLSADO,
1971:     PAYMENT_STATUS.NO_REQUIERE_PAGO
1972:   ];
1973:   if (normalizedStatuses.indexOf(raw) >= 0) return false;
1974:   var key = normalizeKey_(raw);
1975:   if (key === 'pendiente' || key === 'pendiente de pago') return false;
1976:   return true;
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
2023:       var state = getCitaStateFromRow_(rows[i], map);
2024:       var nextPago = state.estadoPago;
2025:       var nextCita = state.estadoCita;
2026:       if (statusKey === 'atendida' || statusKey === 'sesion atendida') nextCita = APPOINTMENT_STATUS.ATENDIDA;
2027:       else if (statusKey === 'no asistio') nextCita = APPOINTMENT_STATUS.NO_ASISTIO;
2028:       else if (statusKey === 'cancelada' || statusKey.indexOf('cancel') === 0) nextCita = APPOINTMENT_STATUS.CANCELADA;
2029:       else if (statusKey === 'pago rechazado') nextPago = PAYMENT_STATUS.PAGO_RECHAZADO;
2030:       else if (statusKey === 'pago por verificar') nextPago = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2031:       else if (statusKey === 'pago verificado' || statusKey === 'autorizada para atender') {
2032:         nextPago = PAYMENT_STATUS.PAGO_APROBADO;
2033:         nextCita = APPOINTMENT_STATUS.AUTORIZADA;
2034:       }
2035:       if (map.EstadoPago) sheet.getRange(i+1, map.EstadoPago).setValue(nextPago);
2036:       if (map.EstadoCita) sheet.getRange(i+1, map.EstadoCita).setValue(nextCita);
2037:       if (nextCita === APPOINTMENT_STATUS.ATENDIDA && !p.manualAudit) {
2038:         if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2039:       }
2040:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2041:       var nextRow = rows[i].slice();
2042:       if (map.EstadoPago) nextRow[map.EstadoPago - 1] = nextPago;
2043:       if (map.EstadoCita) nextRow[map.EstadoCita - 1] = nextCita;
2044:       try { passportSyncAppointment_(nextRow, map, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}); } catch(passportErr) {
2045:         try { auditGeneral_(user, 'Error sincronizando Pasaporte', 'Cita', p.id, '', passportErr.message, p.note || ''); } catch(auditErr) {}
2046:       }
2047:       recordAppointmentStatusHistory_(p.id, prev, p.status + ' => ' + nextPago + ' / ' + nextCita, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, p.note || 'Cambio desde agenda admin');
2048:       return {ok: true};
2049:     }
2050:   }
```

### Coincidencia 7 — línea 2030

```javascript
1975:   if (key === 'pendiente' || key === 'pendiente de pago') return false;
1976:   return true;
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
2023:       var state = getCitaStateFromRow_(rows[i], map);
2024:       var nextPago = state.estadoPago;
2025:       var nextCita = state.estadoCita;
2026:       if (statusKey === 'atendida' || statusKey === 'sesion atendida') nextCita = APPOINTMENT_STATUS.ATENDIDA;
2027:       else if (statusKey === 'no asistio') nextCita = APPOINTMENT_STATUS.NO_ASISTIO;
2028:       else if (statusKey === 'cancelada' || statusKey.indexOf('cancel') === 0) nextCita = APPOINTMENT_STATUS.CANCELADA;
2029:       else if (statusKey === 'pago rechazado') nextPago = PAYMENT_STATUS.PAGO_RECHAZADO;
2030:       else if (statusKey === 'pago por verificar') nextPago = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2031:       else if (statusKey === 'pago verificado' || statusKey === 'autorizada para atender') {
2032:         nextPago = PAYMENT_STATUS.PAGO_APROBADO;
2033:         nextCita = APPOINTMENT_STATUS.AUTORIZADA;
2034:       }
2035:       if (map.EstadoPago) sheet.getRange(i+1, map.EstadoPago).setValue(nextPago);
2036:       if (map.EstadoCita) sheet.getRange(i+1, map.EstadoCita).setValue(nextCita);
2037:       if (nextCita === APPOINTMENT_STATUS.ATENDIDA && !p.manualAudit) {
2038:         if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2039:       }
2040:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2041:       var nextRow = rows[i].slice();
2042:       if (map.EstadoPago) nextRow[map.EstadoPago - 1] = nextPago;
2043:       if (map.EstadoCita) nextRow[map.EstadoCita - 1] = nextCita;
2044:       try { passportSyncAppointment_(nextRow, map, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}); } catch(passportErr) {
2045:         try { auditGeneral_(user, 'Error sincronizando Pasaporte', 'Cita', p.id, '', passportErr.message, p.note || ''); } catch(auditErr) {}
2046:       }
2047:       recordAppointmentStatusHistory_(p.id, prev, p.status + ' => ' + nextPago + ' / ' + nextCita, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, p.note || 'Cambio desde agenda admin');
2048:       return {ok: true};
2049:     }
2050:   }
2051:   return {ok: false, error: 'Cita no encontrada'};
2052: }
2053: 
2054: function parseOperationsPayload_(data) {
2055:   if (!data) return {};
2056:   if (typeof data === 'object') return data;
2057:   try {
2058:     return JSON.parse(decodeURIComponent(data));
2059:   } catch(e1) {
2060:     try { return JSON.parse(data); } catch(e2) { return {}; }
2061:   }
2062: }
2063: 
2064: function operationConfigValue_(key, fallback) {
2065:   var rows = operationsSheet_('ConfiguracionOperativa').getDataRange().getValues();
2066:   for (var i = 1; i < rows.length; i++) {
2067:     if ('' + rows[i][0] === key) return rows[i][1] || fallback;
2068:   }
2069:   return fallback;
2070: }
2071: 
2072: function paymentProofFolder_() {
2073:   var name = 'Comprobantes Cuidandote Fisioterapia';
2074:   var folders = DriveApp.getFoldersByName(name);
2075:   if (folders.hasNext()) return folders.next();
2076:   return DriveApp.createFolder(name);
2077: }
2078: 
2079: function hexDigest_(bytes) {
2080:   return bytes.map(function(b) {
2081:     var v = (b < 0 ? b + 256 : b).toString(16);
2082:     return v.length === 1 ? '0' + v : v;
2083:   }).join('');
2084: }
2085: 
```

### Coincidencia 8 — línea 2170

```javascript
2115:   try { driveFile.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); } catch(e) {}
2116: 
2117:   var proofId = 'PRF-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2118:   proofSh.appendRow([
2119:     proofId, meta.pagoId || '', meta.codigoReserva || '', meta.citaId || '',
2120:     name, mime, bytes.length, driveFile.getId(), 'Recibido', new Date(),
2121:     meta.observaciones || '', digest
2122:   ]);
2123:   auditGeneral_(user, 'Cargo comprobante de pago', 'ComprobantePago', proofId, '', {pagoId:meta.pagoId, citaId:meta.citaId, archivo:name}, '');
2124:   return {ok:true,id:proofId,fileId:driveFile.getId(),url:driveFile.getUrl(),hash:digest};
2125: }
2126: 
2127: function upsertProfessionalSettlement_(professionalId, citaId, servicio, tarifa, attendedAt, user) {
2128:   setupOperationsModule_();
2129:   if (!professionalId || !citaId) return;
2130:   var period = Utilities.formatDate(attendedAt || new Date(), 'America/Bogota', 'yyyy-MM');
2131:   var value = Number(('' + (tarifa || '')).replace(/[^\d.-]/g, '')) || 0;
2132:   var sh = operationsSheet_('LiquidacionesProfesionales'), rows = sh.getDataRange().getValues();
2133:   for (var i = 1; i < rows.length; i++) {
2134:     if ('' + rows[i][1] === '' + professionalId && '' + rows[i][2] === period && ['Pendiente de liquidacion','Pendiente de liquidaciÃ³n',''].indexOf('' + (rows[i][5] || '')) > -1) {
2135:       var sessions = Number(rows[i][3] || 0) + 1;
2136:       var total = Number(rows[i][4] || 0) + value;
2137:       var obs = (rows[i][8] ? rows[i][8] + '\n' : '') + citaId + ' Â· ' + (servicio || '') + ' Â· ' + value;
2138:       sh.getRange(i + 1, 4, 1, 6).setValues([[sessions, total, 'Pendiente de liquidacion', rows[i][6] || new Date(), rows[i][7] || '', obs]]);
2139:       auditGeneral_(user, 'Actualizo liquidacion profesional', 'LiquidacionProfesional', rows[i][0], '', {periodo:period, sesiones:sessions, total:total}, citaId);
2140:       return;
2141:     }
2142:   }
2143:   var id = 'LIQ-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2144:   sh.appendRow([id, professionalId, period, 1, value, 'Pendiente de liquidacion', new Date(), '', citaId + ' Â· ' + (servicio || '') + ' Â· ' + value]);
2145:   auditGeneral_(user, 'Creo liquidacion profesional', 'LiquidacionProfesional', id, '', {periodo:period, sesiones:1, total:value}, citaId);
2146: }
2147: 
2148: function savePayment_(data, user) {
2149:   setupOperationsModule_();
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
```

### Coincidencia 9 — línea 2182

```javascript
2127: function upsertProfessionalSettlement_(professionalId, citaId, servicio, tarifa, attendedAt, user) {
2128:   setupOperationsModule_();
2129:   if (!professionalId || !citaId) return;
2130:   var period = Utilities.formatDate(attendedAt || new Date(), 'America/Bogota', 'yyyy-MM');
2131:   var value = Number(('' + (tarifa || '')).replace(/[^\d.-]/g, '')) || 0;
2132:   var sh = operationsSheet_('LiquidacionesProfesionales'), rows = sh.getDataRange().getValues();
2133:   for (var i = 1; i < rows.length; i++) {
2134:     if ('' + rows[i][1] === '' + professionalId && '' + rows[i][2] === period && ['Pendiente de liquidacion','Pendiente de liquidaciÃ³n',''].indexOf('' + (rows[i][5] || '')) > -1) {
2135:       var sessions = Number(rows[i][3] || 0) + 1;
2136:       var total = Number(rows[i][4] || 0) + value;
2137:       var obs = (rows[i][8] ? rows[i][8] + '\n' : '') + citaId + ' Â· ' + (servicio || '') + ' Â· ' + value;
2138:       sh.getRange(i + 1, 4, 1, 6).setValues([[sessions, total, 'Pendiente de liquidacion', rows[i][6] || new Date(), rows[i][7] || '', obs]]);
2139:       auditGeneral_(user, 'Actualizo liquidacion profesional', 'LiquidacionProfesional', rows[i][0], '', {periodo:period, sesiones:sessions, total:total}, citaId);
2140:       return;
2141:     }
2142:   }
2143:   var id = 'LIQ-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2144:   sh.appendRow([id, professionalId, period, 1, value, 'Pendiente de liquidacion', new Date(), '', citaId + ' Â· ' + (servicio || '') + ' Â· ' + value]);
2145:   auditGeneral_(user, 'Creo liquidacion profesional', 'LiquidacionProfesional', id, '', {periodo:period, sesiones:1, total:value}, citaId);
2146: }
2147: 
2148: function savePayment_(data, user) {
2149:   setupOperationsModule_();
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
```

### Coincidencia 10 — línea 2187

```javascript
2132:   var sh = operationsSheet_('LiquidacionesProfesionales'), rows = sh.getDataRange().getValues();
2133:   for (var i = 1; i < rows.length; i++) {
2134:     if ('' + rows[i][1] === '' + professionalId && '' + rows[i][2] === period && ['Pendiente de liquidacion','Pendiente de liquidaciÃ³n',''].indexOf('' + (rows[i][5] || '')) > -1) {
2135:       var sessions = Number(rows[i][3] || 0) + 1;
2136:       var total = Number(rows[i][4] || 0) + value;
2137:       var obs = (rows[i][8] ? rows[i][8] + '\n' : '') + citaId + ' Â· ' + (servicio || '') + ' Â· ' + value;
2138:       sh.getRange(i + 1, 4, 1, 6).setValues([[sessions, total, 'Pendiente de liquidacion', rows[i][6] || new Date(), rows[i][7] || '', obs]]);
2139:       auditGeneral_(user, 'Actualizo liquidacion profesional', 'LiquidacionProfesional', rows[i][0], '', {periodo:period, sesiones:sessions, total:total}, citaId);
2140:       return;
2141:     }
2142:   }
2143:   var id = 'LIQ-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2144:   sh.appendRow([id, professionalId, period, 1, value, 'Pendiente de liquidacion', new Date(), '', citaId + ' Â· ' + (servicio || '') + ' Â· ' + value]);
2145:   auditGeneral_(user, 'Creo liquidacion profesional', 'LiquidacionProfesional', id, '', {periodo:period, sesiones:1, total:value}, citaId);
2146: }
2147: 
2148: function savePayment_(data, user) {
2149:   setupOperationsModule_();
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
```

### Coincidencia 11 — línea 2187

```javascript
2132:   var sh = operationsSheet_('LiquidacionesProfesionales'), rows = sh.getDataRange().getValues();
2133:   for (var i = 1; i < rows.length; i++) {
2134:     if ('' + rows[i][1] === '' + professionalId && '' + rows[i][2] === period && ['Pendiente de liquidacion','Pendiente de liquidaciÃ³n',''].indexOf('' + (rows[i][5] || '')) > -1) {
2135:       var sessions = Number(rows[i][3] || 0) + 1;
2136:       var total = Number(rows[i][4] || 0) + value;
2137:       var obs = (rows[i][8] ? rows[i][8] + '\n' : '') + citaId + ' Â· ' + (servicio || '') + ' Â· ' + value;
2138:       sh.getRange(i + 1, 4, 1, 6).setValues([[sessions, total, 'Pendiente de liquidacion', rows[i][6] || new Date(), rows[i][7] || '', obs]]);
2139:       auditGeneral_(user, 'Actualizo liquidacion profesional', 'LiquidacionProfesional', rows[i][0], '', {periodo:period, sesiones:sessions, total:total}, citaId);
2140:       return;
2141:     }
2142:   }
2143:   var id = 'LIQ-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2144:   sh.appendRow([id, professionalId, period, 1, value, 'Pendiente de liquidacion', new Date(), '', citaId + ' Â· ' + (servicio || '') + ' Â· ' + value]);
2145:   auditGeneral_(user, 'Creo liquidacion profesional', 'LiquidacionProfesional', id, '', {periodo:period, sesiones:1, total:value}, citaId);
2146: }
2147: 
2148: function savePayment_(data, user) {
2149:   setupOperationsModule_();
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
```

### Coincidencia 12 — línea 2191

```javascript
2136:       var total = Number(rows[i][4] || 0) + value;
2137:       var obs = (rows[i][8] ? rows[i][8] + '\n' : '') + citaId + ' Â· ' + (servicio || '') + ' Â· ' + value;
2138:       sh.getRange(i + 1, 4, 1, 6).setValues([[sessions, total, 'Pendiente de liquidacion', rows[i][6] || new Date(), rows[i][7] || '', obs]]);
2139:       auditGeneral_(user, 'Actualizo liquidacion profesional', 'LiquidacionProfesional', rows[i][0], '', {periodo:period, sesiones:sessions, total:total}, citaId);
2140:       return;
2141:     }
2142:   }
2143:   var id = 'LIQ-' + new Date().getTime() + '-' + Math.floor(Math.random() * 999);
2144:   sh.appendRow([id, professionalId, period, 1, value, 'Pendiente de liquidacion', new Date(), '', citaId + ' Â· ' + (servicio || '') + ' Â· ' + value]);
2145:   auditGeneral_(user, 'Creo liquidacion profesional', 'LiquidacionProfesional', id, '', {periodo:period, sesiones:1, total:value}, citaId);
2146: }
2147: 
2148: function savePayment_(data, user) {
2149:   setupOperationsModule_();
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
```

### Coincidencia 13 — línea 2207

```javascript
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
```

### Coincidencia 14 — línea 2219

```javascript
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
```

### Coincidencia 15 — línea 2452

```javascript
2397:       notaAdmin:row[ix.notaAdmin], pago:row[ix.pago],
2398:       estadoPago:ix.estadoPago >= 0 ? row[ix.estadoPago] : '',
2399:       estadoCita:ix.estadoCita >= 0 ? row[ix.estadoCita] : '',
2400:       Reprogramaciones:ix.reprogramaciones >= 0 ? row[ix.reprogramaciones] : 0,
2401:       PlanClienteID:ix.planClienteId >= 0 ? row[ix.planClienteId] : ''
2402:     });
2403:   }
2404:   var nowMinutes = todayNow.getHours() * 60 + todayNow.getMinutes();
2405:   var inThreeHours = nowMinutes + 180;
2406:   if (mode === 'hoy') {
2407:     targetCitas.sort(function(a,b){ return st(a.hora || a.Hora).localeCompare(st(b.hora || b.Hora)); });
2408:   }
2409:   var items = targetCitas.map(function(c) {
2410:     var id = '' + (c.id || c.ID || '');
2411:     var assigned = assignments[id] || {};
2412:     var pago = normalizedPaymentStateForDaily_(c);
2413:     var cita = normalizedAppointmentStateForDaily_(c, pago, !!assigned.ProfesionalID || !!assigned.profesionalId);
2414:     var reminder = reminders[id] || null;
2415:     var h = st(c.hora || c.Hora);
2416:     var minutes = Number(h.split(':')[0] || 0) * 60 + Number(h.split(':')[1] || 0);
2417:     var changedAfterPrep = false;
2418:     if (prepTime) {
2419:       changedAfterPrep = historial.some(function(ev) {
2420:         return '' + (ev.CitaID || ev.citaId || '') === id && new Date(ev.Fecha || ev.fecha || 0) > prepTime;
2421:       });
2422:     }
2423:     var pendingClose = false;
2424:     if (mode === 'hoy' && minutes < nowMinutes && [APPOINTMENT_STATUS.ATENDIDA, APPOINTMENT_STATUS.NO_ASISTIO, APPOINTMENT_STATUS.CANCELADA].indexOf(cita) === -1) pendingClose = true;
2425:     return {
2426:       id:id,
2427:       hora:h,
2428:       nombre:c.nombre || c.Nombre || '',
2429:       telefono:c.telefono || c.Telefono || '',
2430:       servicio:c.servicio || c.Servicio || '',
2431:       modalidad:c.modalidad || c.Modalidad || '',
2432:       sede:c.sede || c.Sede || c.modalidad || c.Modalidad || '',
2433:       valor:c.precio || c.Precio || '',
2434:       estadoPago:pago,
2435:       estadoCita:cita,
2436:       confirmadaVisual:isPaymentAuthorizing_(pago) && [APPOINTMENT_STATUS.AUTORIZADA, APPOINTMENT_STATUS.ASIGNADA].indexOf(cita) >= 0,
2437:       fisioterapeuta:assigned.ProfesionalNombre || assigned.profesionalNombre || '',
2438:       fisioterapeutaId:assigned.ProfesionalID || assigned.profesionalId || '',
2439:       observaciones:c.notaAdmin || c.NotaAdmin || c.notas || c.Notas || '',
2440:       reprogramaciones:c.Reprogramaciones || c.reprogramaciones || 0,
2441:       plan:!!(c.PlanClienteID || c.planClienteId || (c.servicio || '').toLowerCase().indexOf('plan') >= 0 || (c.servicio || '').toLowerCase().indexOf('paquete') >= 0),
2442:       recordatorio: reminder ? 'ENVIADO' : 'PENDIENTE',
2443:       proximaTresHoras: mode === 'hoy' && minutes >= nowMinutes && minutes <= inThreeHours,
2444:       pendienteCierre: pendingClose,
2445:       cambioPosteriorPreparacion: changedAfterPrep
2446:     };
2447:   });
2448:   var counts = {
2449:     total: items.length,
2450:     autorizadas: items.filter(function(i){ return isPaymentAuthorizing_(i.estadoPago) && [APPOINTMENT_STATUS.AUTORIZADA, APPOINTMENT_STATUS.ASIGNADA].indexOf(i.estadoCita) >= 0; }).length,
2451:     pendientesPago: items.filter(function(i){ return i.estadoPago === PAYMENT_STATUS.PENDIENTE_PAGO; }).length,
2452:     comprobantes: items.filter(function(i){ return i.estadoPago === PAYMENT_STATUS.COMPROBANTE_RECIBIDO; }).length,
2453:     sinFisioterapeuta: items.filter(function(i){ return !i.fisioterapeuta && [APPOINTMENT_STATUS.CANCELADA, APPOINTMENT_STATUS.NO_ASISTIO].indexOf(i.estadoCita) === -1; }).length,
2454:     recordatoriosPendientes: items.filter(function(i){ return i.recordatorio !== 'ENVIADO'; }).length,
2455:     novedades: items.filter(function(i){ return i.cambioPosteriorPreparacion || i.pendienteCierre; }).length,
2456:     pendientesCierre: items.filter(function(i){ return i.pendienteCierre; }).length,
2457:     cambiosPosteriores: items.filter(function(i){ return i.cambioPosteriorPreparacion; }).length,
2458:     listasAtender: items.filter(function(i){ return i.confirmadaVisual && i.fisioterapeuta; }).length,
2459:     datosIncompletos: items.filter(function(i){ return !i.telefono || !i.servicio || !i.hora; }).length
2460:   };
2461:   return {
2462:     ok:true,
2463:     mode:mode || 'manana',
2464:     fecha:targetDate,
2465:     preparacion:lastPrep,
2466:     counts:counts,
2467:     citas:items,
2468:     horariosDisponibles:[],
2469:     generatedAt:new Date()
2470:   };
2471: }
2472: 
2473: function getDailyOperationsData_(date, mode) {
2474:   var target = date || (mode === 'hoy' ? Utilities.formatDate(new Date(), 'America/Bogota', 'yyyy-MM-dd') : addDaysISO_(Utilities.formatDate(new Date(), 'America/Bogota', 'yyyy-MM-dd'), 1));
2475:   return buildDailyOpsSummary_(target, mode || 'manana');
2476: }
2477: 
2478: function saveDailyPreparation_(data, user) {
2479:   setupOperationsModule_();
2480:   var d = JSON.parse(decodeURIComponent(data || '{}'));
2481:   if (!d.fechaObjetivo) return {ok:false,error:'Falta fecha objetivo'};
2482:   var summary = buildDailyOpsSummary_(d.fechaObjetivo, d.tipo || 'manana');
2483:   var pendientes = {
2484:     pendientesPago: summary.counts.pendientesPago,
2485:     comprobantes: summary.counts.comprobantes,
2486:     sinFisioterapeuta: summary.counts.sinFisioterapeuta,
2487:     recordatoriosPendientes: summary.counts.recordatoriosPendientes,
2488:     datosIncompletos: summary.counts.datosIncompletos,
2489:     conflictosHorario: 0
2490:   };
2491:   var estado = Object.keys(pendientes).some(function(k){ return Number(pendientes[k]) > 0; }) ? 'CON_PENDIENTES' : 'LISTA';
2492:   var id = d.id || ('PREP-' + new Date().getTime());
2493:   operationsSheet_('AgendaPreparacion').appendRow([
2494:     id, d.fechaObjetivo, d.tipo || 'manana', d.estadoPreparacion || estado, user.id || '', user.nombre || '',
2495:     Utilities.formatDate(new Date(), 'America/Bogota', 'yyyy-MM-dd'), Utilities.formatDate(new Date(), 'America/Bogota', 'HH:mm:ss'),
2496:     summary.counts.total, JSON.stringify(pendientes), d.observaciones || '', JSON.stringify(summary.counts), new Date()
2497:   ]);
2498:   auditGeneral_(user, 'MarcÃ³ agenda como revisada', 'AgendaPreparacion', id, '', estado, d.observaciones || '');
2499:   return {ok:true,id:id,estado:estado,pendientes:pendientes,summary:summary.counts};
2500: }
2501: 
2502: function logDailyReminder_(p, user) {
2503:   setupOperationsModule_();
2504:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2505:   var id = 'REC-' + new Date().getTime();
2506:   operationsSheet_('RecordatoriosCita').appendRow([
2507:     id, p.citaId, p.fecha || '', p.tipo || 'recordatorio_cita', new Date(), user.id || '', user.nombre || '',
```

## Estado PAGO_APROBADO

Coincidencias: 20

### Coincidencia 1 — línea 1564

```javascript
1509:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1510:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][2] === citaId) return;
1511:   sh.appendRow(['PAG-' + new Date().getTime(), professionalId, citaId, servicio || '', tarifa || '', 'Pendiente', new Date(), '', '']);
1512: }
1513: function markProfessionalPayablePaid_(id) {
1514:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1515:   for (var i = 1; i < rows.length; i++) {
1516:     if ('' + rows[i][0] !== '' + id) continue;
1517:     sh.getRange(i+1, 6, 1, 3).setValues([['Pagada', new Date(), 'LIQ-' + Utilities.formatDate(new Date(), 'America/Bogota', 'yyyyMM')]]);
1518:     return {ok:true};
1519:   }
1520:   return {ok:false,error:'Cuenta no encontrada'};
1521: }
1522: function getTeamModuleData_() {
1523:   function sheetRows(name) {
1524:     var sh = teamSheet_(name), values = sh.getDataRange().getValues();
1525:     var headers = values[0], out = [];
1526:     for (var i = 1; i < values.length; i++) {
1527:       if (!values[i][0]) continue;
1528:       var o = rowObj_(headers, values[i]);
1529:       Object.keys(o).forEach(function(k) {
1530:         if (o[k] instanceof Date) o[k] = o[k].toISOString();
1531:         else o[k] = '' + (o[k] || '');
1532:       });
1533:       out.push(o);
1534:     }
1535:     return out;
1536:   }
1537:   return {
1538:     ok:true,
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
```

### Coincidencia 2 — línea 1564

```javascript
1509:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1510:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][2] === citaId) return;
1511:   sh.appendRow(['PAG-' + new Date().getTime(), professionalId, citaId, servicio || '', tarifa || '', 'Pendiente', new Date(), '', '']);
1512: }
1513: function markProfessionalPayablePaid_(id) {
1514:   var sh = teamSheet_('CuentasPorPagar'), rows = sh.getDataRange().getValues();
1515:   for (var i = 1; i < rows.length; i++) {
1516:     if ('' + rows[i][0] !== '' + id) continue;
1517:     sh.getRange(i+1, 6, 1, 3).setValues([['Pagada', new Date(), 'LIQ-' + Utilities.formatDate(new Date(), 'America/Bogota', 'yyyyMM')]]);
1518:     return {ok:true};
1519:   }
1520:   return {ok:false,error:'Cuenta no encontrada'};
1521: }
1522: function getTeamModuleData_() {
1523:   function sheetRows(name) {
1524:     var sh = teamSheet_(name), values = sh.getDataRange().getValues();
1525:     var headers = values[0], out = [];
1526:     for (var i = 1; i < values.length; i++) {
1527:       if (!values[i][0]) continue;
1528:       var o = rowObj_(headers, values[i]);
1529:       Object.keys(o).forEach(function(k) {
1530:         if (o[k] instanceof Date) o[k] = o[k].toISOString();
1531:         else o[k] = '' + (o[k] || '');
1532:       });
1533:       out.push(o);
1534:     }
1535:     return out;
1536:   }
1537:   return {
1538:     ok:true,
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
```

### Coincidencia 3 — línea 1594

```javascript
1539:     profesionales:getProfessionals_().map(function(p){return {id:p.id,nombre:p.nombre,usuario:p.usuario,email:p.email,rol:p.rol,estado:p.estado,servicios:p.servicios,disponibilidad:p.disponibilidad,tarifasJSON:p.tarifasJSON,debeCambiarPassword:p.debeCambiarPassword};}),
1540:     asignaciones:sheetRows('CitaEquipo'),
1541:     novedades:sheetRows('NovedadesProfesionales'),
1542:     auditoria:sheetRows('AuditoriaEquipo').slice(-80).reverse(),
1543:     cuentas:sheetRows('CuentasPorPagar')
1544:   };
1545: }
1546: 
1547: // -------------------------------------------------------------
1548: //  HELPERS PLANES â€” detecciÃ³n y lÃ³gica de pagos
1549: // -------------------------------------------------------------
1550: // -------------------------------------------------------------
1551: //  MODULO OPERATIVO: PAGOS, PLANES, ROLES, HISTORIAL
1552: // -------------------------------------------------------------
1553: var APPOINTMENT_STATUS_CATALOG = [
1554:   'Solicitud recibida','Pendiente de pago','Pago por verificar','Pago rechazado',
1555:   'Confirmada','Pago verificado','CortesÃ­a autorizada','Autorizada para atender',
1556:   'SesiÃ³n iniciada','SesiÃ³n atendida','Cerrada','Cancelada a tiempo',
1557:   'CancelaciÃ³n tardÃ­a','No asistiÃ³','Reprogramada','Saldo a favor',
1558:   'Reserva vencida','Cancelada','Atendida','Pendiente'
1559: ];
1560: 
1561: var PAYMENT_STATUS = {
1562:   PENDIENTE_PAGO: 'PENDIENTE_PAGO',
1563:   COMPROBANTE_RECIBIDO: 'COMPROBANTE_RECIBIDO',
1564:   PAGO_APROBADO: 'PAGO_APROBADO',
1565:   PAGO_RECHAZADO: 'PAGO_RECHAZADO',
1566:   REEMBOLSADO: 'REEMBOLSADO',
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
```

### Coincidencia 4 — línea 1622

```javascript
1567:   NO_REQUIERE_PAGO: 'NO_REQUIERE_PAGO'
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
```

### Coincidencia 5 — línea 1623

```javascript
1568: };
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
1678:     cita = cita || (app.status.indexOf('__') === 0 ? APPOINTMENT_STATUS.RESERVADA : app.status);
```

### Coincidencia 6 — línea 1624

```javascript
1569: 
1570: var APPOINTMENT_STATUS = {
1571:   RESERVADA: 'RESERVADA',
1572:   AUTORIZADA: 'AUTORIZADA',
1573:   ASIGNADA: 'ASIGNADA',
1574:   ATENDIDA: 'ATENDIDA',
1575:   CANCELADA: 'CANCELADA',
1576:   NO_ASISTIO: 'NO_ASISTIO'
1577: };
1578: 
1579: var CITA_STATE_HEADERS = [
1580:   'EstadoPago','EstadoCita','EstadoMigracionOrigen','FechaMigracionEstado',
1581:   'Reprogramaciones','UltimaReprogramacion','RequiereCierreAdmin','VenceReserva'
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
1678:     cita = cita || (app.status.indexOf('__') === 0 ? APPOINTMENT_STATUS.RESERVADA : app.status);
1679:   }
```

### Coincidencia 7 — línea 1637

```javascript
1582: ];
1583: 
1584: function normalizeKey_(v) {
1585:   return ('' + (v || '')).toLowerCase()
1586:     .replace(/[Ã¡Ã Ã¤Ã¢]/g,'a').replace(/[Ã©Ã¨Ã«Ãª]/g,'e').replace(/[Ã­Ã¬Ã¯Ã®]/g,'i')
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
1678:     cita = cita || (app.status.indexOf('__') === 0 ? APPOINTMENT_STATUS.RESERVADA : app.status);
1679:   }
1680:   return {
1681:     estadoPago: '' + pago,
1682:     estadoCita: '' + cita,
1683:     estadoPagoLabel: paymentStatusLabel_(pago),
1684:     estadoCitaLabel: appointmentStatusLabel_(cita),
1685:     confirmadaVisual: isConfirmedVisual_(pago, cita)
1686:   };
1687: }
1688: 
1689: function setCitaStates_(citaId, estadoPago, estadoCita, user, obs) {
1690:   var sh = getOrCreateSheet().getSheetByName('Citas');
1691:   var map = ensureCitasStateColumns_();
1692:   var rows = sh.getDataRange().getValues();
```

### Coincidencia 8 — línea 1642

```javascript
1587:     .replace(/[Ã³Ã²Ã¶Ã´]/g,'o').replace(/[ÃºÃ¹Ã¼Ã»]/g,'u').replace(/Ã±/g,'n').trim();
1588: }
1589: 
1590: function paymentStatusLabel_(s) {
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
1678:     cita = cita || (app.status.indexOf('__') === 0 ? APPOINTMENT_STATUS.RESERVADA : app.status);
1679:   }
1680:   return {
1681:     estadoPago: '' + pago,
1682:     estadoCita: '' + cita,
1683:     estadoPagoLabel: paymentStatusLabel_(pago),
1684:     estadoCitaLabel: appointmentStatusLabel_(cita),
1685:     confirmadaVisual: isConfirmedVisual_(pago, cita)
1686:   };
1687: }
1688: 
1689: function setCitaStates_(citaId, estadoPago, estadoCita, user, obs) {
1690:   var sh = getOrCreateSheet().getSheetByName('Citas');
1691:   var map = ensureCitasStateColumns_();
1692:   var rows = sh.getDataRange().getValues();
1693:   for (var i = 1; i < rows.length; i++) {
1694:     if ('' + rows[i][0] !== '' + citaId) continue;
1695:     var prev = getCitaStateFromRow_(rows[i], map);
1696:     if (estadoPago) sh.getRange(i + 1, map.EstadoPago).setValue(estadoPago);
1697:     if (estadoCita) sh.getRange(i + 1, map.EstadoCita).setValue(estadoCita);
```

### Coincidencia 9 — línea 1646

```javascript
1591:   var labels = {
1592:     PENDIENTE_PAGO:'Pendiente de pago',
1593:     COMPROBANTE_RECIBIDO:'Comprobante recibido',
1594:     PAGO_APROBADO:'Pago aprobado',
1595:     PAGO_RECHAZADO:'Pago rechazado',
1596:     REEMBOLSADO:'Reembolsado',
1597:     NO_REQUIERE_PAGO:'No requiere pago'
1598:   };
1599:   return labels[s] || s || 'Sin estado de pago';
1600: }
1601: 
1602: function appointmentStatusLabel_(s) {
1603:   var labels = {
1604:     RESERVADA:'Reservada',
1605:     AUTORIZADA:'Autorizada',
1606:     ASIGNADA:'Asignada',
1607:     ATENDIDA:'Atendida',
1608:     CANCELADA:'Cancelada',
1609:     NO_ASISTIO:'No asistiÃ³'
1610:   };
1611:   return labels[s] || s || 'Sin estado de cita';
1612: }
1613: 
1614: function legacyPaymentToNew_(legacyState, pagoValue) {
1615:   var stKey = normalizeKey_(legacyState);
1616:   var payKey = normalizeKey_(pagoValue);
1617:   if (stKey === 'saldo a favor') return {status:'__SALDO_A_FAVOR__', ambiguous:true, reason:'Saldo a favor debe convertirse en movimiento financiero, no en reembolso.'};
1618:   if (stKey === 'cortesia autorizada') return {status:PAYMENT_STATUS.NO_REQUIERE_PAGO, courtesy:true};
1619:   if (stKey === 'reembolsada') return {status:PAYMENT_STATUS.REEMBOLSADO};
1620:   if (stKey === 'pago rechazado' || stKey === 'rechazado') return {status:PAYMENT_STATUS.PAGO_RECHAZADO};
1621:   if (stKey === 'pago por verificar' || stKey === 'por verificar') return {status:PAYMENT_STATUS.COMPROBANTE_RECIBIDO};
1622:   if (stKey === 'pago verificado' || stKey === 'autorizada para atender' || stKey === 'sesion atendida' || stKey === 'atendida') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1623:   if (stKey === 'confirmada' && payKey) return {status:PAYMENT_STATUS.PAGO_APROBADO};
1624:   if (payKey && payKey !== 'pendiente') return {status:PAYMENT_STATUS.PAGO_APROBADO};
1625:   return {status:PAYMENT_STATUS.PENDIENTE_PAGO};
1626: }
1627: 
1628: function legacyAppointmentToNew_(legacyState, paymentStatus, hasAssignment) {
1629:   var stKey = normalizeKey_(legacyState);
1630:   if (stKey === 'registro') return {status:'__NO_APLICA__', ambiguous:false};
1631:   if (stKey === 'saldo a favor') return {status:APPOINTMENT_STATUS.CANCELADA, ambiguous:true, reason:'Saldo a favor requiere revisiÃ³n financiera manual.'};
1632:   if (stKey === 'reprogramada') return {status:'__REPROGRAMADA_OPERATIVA__', ambiguous:true, reason:'Reprogramada debe ser evento histÃ³rico; se debe definir estado operativo actual.'};
1633:   if (stKey === 'cancelada' || stKey === 'cancelada a tiempo' || stKey === 'cancelacion tardia' || stKey === 'reserva vencida' || stKey === 'reembolsada') return {status:APPOINTMENT_STATUS.CANCELADA};
1634:   if (stKey === 'no asistio') return {status:APPOINTMENT_STATUS.NO_ASISTIO};
1635:   if (stKey === 'atendida' || stKey === 'sesion atendida' || stKey === 'cerrada') return {status:APPOINTMENT_STATUS.ATENDIDA};
1636:   if (hasAssignment) return {status:APPOINTMENT_STATUS.ASIGNADA};
1637:   if (paymentStatus === PAYMENT_STATUS.PAGO_APROBADO || paymentStatus === PAYMENT_STATUS.NO_REQUIERE_PAGO) return {status:APPOINTMENT_STATUS.AUTORIZADA};
1638:   return {status:APPOINTMENT_STATUS.RESERVADA};
1639: }
1640: 
1641: function isPaymentAuthorizing_(status) {
1642:   return status === PAYMENT_STATUS.PAGO_APROBADO || status === PAYMENT_STATUS.NO_REQUIERE_PAGO;
1643: }
1644: 
1645: function isConfirmedVisual_(estadoPago, estadoCita) {
1646:   return estadoPago === PAYMENT_STATUS.PAGO_APROBADO && (estadoCita === APPOINTMENT_STATUS.AUTORIZADA || estadoCita === APPOINTMENT_STATUS.ASIGNADA);
1647: }
1648: 
1649: function ensureCitasStateColumns_() {
1650:   var sh = getOrCreateSheet().getSheetByName('Citas');
1651:   var lastCol = Math.max(sh.getLastColumn(), 1);
1652:   var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return '' + (h || ''); });
1653:   CITA_STATE_HEADERS.forEach(function(h) {
1654:     if (headers.indexOf(h) === -1) {
1655:       sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
1656:       headers.push(h);
1657:     }
1658:   });
1659:   return headerMap_(sh);
1660: }
1661: 
1662: function headerMap_(sh) {
1663:   var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
1664:   var map = {};
1665:   for (var i = 0; i < headers.length; i++) map['' + headers[i]] = i + 1;
1666:   return map;
1667: }
1668: 
1669: function getCitaStateFromRow_(row, map) {
1670:   map = map || {};
1671:   var legacy = row[10] || '';
1672:   var pago = map.EstadoPago ? row[map.EstadoPago - 1] : '';
1673:   var cita = map.EstadoCita ? row[map.EstadoCita - 1] : '';
1674:   if (!pago || !cita) {
1675:     var pay = legacyPaymentToNew_(legacy, row[14]);
1676:     var app = legacyAppointmentToNew_(legacy, pay.status, false);
1677:     pago = pago || (pay.status.indexOf('__') === 0 ? PAYMENT_STATUS.PENDIENTE_PAGO : pay.status);
1678:     cita = cita || (app.status.indexOf('__') === 0 ? APPOINTMENT_STATUS.RESERVADA : app.status);
1679:   }
1680:   return {
1681:     estadoPago: '' + pago,
1682:     estadoCita: '' + cita,
1683:     estadoPagoLabel: paymentStatusLabel_(pago),
1684:     estadoCitaLabel: appointmentStatusLabel_(cita),
1685:     confirmadaVisual: isConfirmedVisual_(pago, cita)
1686:   };
1687: }
1688: 
1689: function setCitaStates_(citaId, estadoPago, estadoCita, user, obs) {
1690:   var sh = getOrCreateSheet().getSheetByName('Citas');
1691:   var map = ensureCitasStateColumns_();
1692:   var rows = sh.getDataRange().getValues();
1693:   for (var i = 1; i < rows.length; i++) {
1694:     if ('' + rows[i][0] !== '' + citaId) continue;
1695:     var prev = getCitaStateFromRow_(rows[i], map);
1696:     if (estadoPago) sh.getRange(i + 1, map.EstadoPago).setValue(estadoPago);
1697:     if (estadoCita) sh.getRange(i + 1, map.EstadoCita).setValue(estadoCita);
1698:     var nextRow = rows[i].slice();
1699:     if (estadoPago) nextRow[map.EstadoPago - 1] = estadoPago;
1700:     if (estadoCita) nextRow[map.EstadoCita - 1] = estadoCita;
1701:     try { passportSyncAppointment_(nextRow, map, user); } catch(passportErr) {
```

### Coincidencia 10 — línea 1968

```javascript
1913:     citaId || '', code, 'REPROGRAMACION', 'REPROGRAMACION_REGISTRADA', new Date(),
1914:     user.id || '', user.nombre || 'Administracion', user.rol || 'Superadministradora',
1915:     motivo || '',
1916:     'REPROGRAMACION',
1917:     (oldFecha || '') + ' ' + (oldHora || ''),
1918:     (newFecha || '') + ' ' + (newHora || ''),
1919:     motivo || '',
1920:     count || ''
1921:   ]);
1922:   auditGeneral_(user, 'Reprogramo cita', 'Cita', citaId, (oldFecha || '') + ' ' + (oldHora || ''), (newFecha || '') + ' ' + (newHora || ''), motivo || '');
1923: }
1924: 
1925: function expireTemporaryReservations_() {
1926:   setupOperationsModule_();
1927:   var ss = getOrCreateSheet();
1928:   var sheet = ss.getSheetByName('Citas');
1929:   var map = ensureCitasStateColumns_();
1930:   var rows = sheet.getDataRange().getValues();
1931:   var now = new Date();
1932:   var user = {id:'system', nombre:'Sistema', rol:'Automatizacion'};
1933:   var expired = [];
1934:   for (var i = 1; i < rows.length; i++) {
1935:     var row = rows[i];
1936:     var citaId = '' + (row[0] || '');
1937:     if (!citaId) continue;
1938:     var state = getCitaStateFromRow_(row, map);
1939:     var estadoPago = state.estadoPago || '';
1940:     var estadoCita = state.estadoCita || '';
1941:     var legacyState = '' + (row[10] || '');
1942:     var hasLegacyPayment = hasLegacyPaymentMarker_(row[14]);
1943:     var expiresAt = map.VenceReserva ? parseReservationExpiry_(row[map.VenceReserva - 1]) : null;
1944:     if (!expiresAt) continue;
1945:     if (expiresAt > now) continue;
1946:     if (estadoPago !== PAYMENT_STATUS.PENDIENTE_PAGO) continue;
1947:     if (estadoCita !== APPOINTMENT_STATUS.RESERVADA) continue;
1948:     if (hasLegacyPayment) continue;
1949:     if (hasActivePaymentForCita_(citaId)) continue;
1950:     var prev = legacyState + ' => ' + estadoPago + ' / ' + estadoCita;
1951:     var next = 'RESERVA_VENCIDA => ' + estadoPago + ' / ' + APPOINTMENT_STATUS.CANCELADA;
1952:     sheet.getRange(i + 1, 11).setValue('Cancelada');
1953:     if (map.EstadoCita) sheet.getRange(i + 1, map.EstadoCita).setValue(APPOINTMENT_STATUS.CANCELADA);
1954:     if (map.RequiereCierreAdmin) sheet.getRange(i + 1, map.RequiereCierreAdmin).setValue('');
1955:     recordAppointmentStatusHistory_(citaId, prev, next, user, 'Motivo: RESERVA_VENCIDA. Reserva temporal vencida sin comprobante ni pago aprobado.');
1956:     auditGeneral_(user, 'RESERVA_VENCIDA', 'Cita', citaId, prev, next, 'Cancelada por vencimiento de 60 minutos; horario liberado.');
1957:     expired.push({id:citaId, nombre:row[2] || '', fecha:sd(row[7]), hora:st(row[8])});
1958:   }
1959:   return {ok:true, expired:expired.length, citas:expired};
1960: }
1961: 
1962: function hasLegacyPaymentMarker_(value) {
1963:   var raw = ('' + (value || '')).trim();
1964:   if (!raw) return false;
1965:   var normalizedStatuses = [
1966:     PAYMENT_STATUS.PENDIENTE_PAGO,
1967:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1968:     PAYMENT_STATUS.PAGO_APROBADO,
1969:     PAYMENT_STATUS.PAGO_RECHAZADO,
1970:     PAYMENT_STATUS.REEMBOLSADO,
1971:     PAYMENT_STATUS.NO_REQUIERE_PAGO
1972:   ];
1973:   if (normalizedStatuses.indexOf(raw) >= 0) return false;
1974:   var key = normalizeKey_(raw);
1975:   if (key === 'pendiente' || key === 'pendiente de pago') return false;
1976:   return true;
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
2023:       var state = getCitaStateFromRow_(rows[i], map);
```

### Coincidencia 11 — línea 1996

```javascript
1941:     var legacyState = '' + (row[10] || '');
1942:     var hasLegacyPayment = hasLegacyPaymentMarker_(row[14]);
1943:     var expiresAt = map.VenceReserva ? parseReservationExpiry_(row[map.VenceReserva - 1]) : null;
1944:     if (!expiresAt) continue;
1945:     if (expiresAt > now) continue;
1946:     if (estadoPago !== PAYMENT_STATUS.PENDIENTE_PAGO) continue;
1947:     if (estadoCita !== APPOINTMENT_STATUS.RESERVADA) continue;
1948:     if (hasLegacyPayment) continue;
1949:     if (hasActivePaymentForCita_(citaId)) continue;
1950:     var prev = legacyState + ' => ' + estadoPago + ' / ' + estadoCita;
1951:     var next = 'RESERVA_VENCIDA => ' + estadoPago + ' / ' + APPOINTMENT_STATUS.CANCELADA;
1952:     sheet.getRange(i + 1, 11).setValue('Cancelada');
1953:     if (map.EstadoCita) sheet.getRange(i + 1, map.EstadoCita).setValue(APPOINTMENT_STATUS.CANCELADA);
1954:     if (map.RequiereCierreAdmin) sheet.getRange(i + 1, map.RequiereCierreAdmin).setValue('');
1955:     recordAppointmentStatusHistory_(citaId, prev, next, user, 'Motivo: RESERVA_VENCIDA. Reserva temporal vencida sin comprobante ni pago aprobado.');
1956:     auditGeneral_(user, 'RESERVA_VENCIDA', 'Cita', citaId, prev, next, 'Cancelada por vencimiento de 60 minutos; horario liberado.');
1957:     expired.push({id:citaId, nombre:row[2] || '', fecha:sd(row[7]), hora:st(row[8])});
1958:   }
1959:   return {ok:true, expired:expired.length, citas:expired};
1960: }
1961: 
1962: function hasLegacyPaymentMarker_(value) {
1963:   var raw = ('' + (value || '')).trim();
1964:   if (!raw) return false;
1965:   var normalizedStatuses = [
1966:     PAYMENT_STATUS.PENDIENTE_PAGO,
1967:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1968:     PAYMENT_STATUS.PAGO_APROBADO,
1969:     PAYMENT_STATUS.PAGO_RECHAZADO,
1970:     PAYMENT_STATUS.REEMBOLSADO,
1971:     PAYMENT_STATUS.NO_REQUIERE_PAGO
1972:   ];
1973:   if (normalizedStatuses.indexOf(raw) >= 0) return false;
1974:   var key = normalizeKey_(raw);
1975:   if (key === 'pendiente' || key === 'pendiente de pago') return false;
1976:   return true;
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
2023:       var state = getCitaStateFromRow_(rows[i], map);
2024:       var nextPago = state.estadoPago;
2025:       var nextCita = state.estadoCita;
2026:       if (statusKey === 'atendida' || statusKey === 'sesion atendida') nextCita = APPOINTMENT_STATUS.ATENDIDA;
2027:       else if (statusKey === 'no asistio') nextCita = APPOINTMENT_STATUS.NO_ASISTIO;
2028:       else if (statusKey === 'cancelada' || statusKey.indexOf('cancel') === 0) nextCita = APPOINTMENT_STATUS.CANCELADA;
2029:       else if (statusKey === 'pago rechazado') nextPago = PAYMENT_STATUS.PAGO_RECHAZADO;
2030:       else if (statusKey === 'pago por verificar') nextPago = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2031:       else if (statusKey === 'pago verificado' || statusKey === 'autorizada para atender') {
2032:         nextPago = PAYMENT_STATUS.PAGO_APROBADO;
2033:         nextCita = APPOINTMENT_STATUS.AUTORIZADA;
2034:       }
2035:       if (map.EstadoPago) sheet.getRange(i+1, map.EstadoPago).setValue(nextPago);
2036:       if (map.EstadoCita) sheet.getRange(i+1, map.EstadoCita).setValue(nextCita);
2037:       if (nextCita === APPOINTMENT_STATUS.ATENDIDA && !p.manualAudit) {
2038:         if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2039:       }
2040:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2041:       var nextRow = rows[i].slice();
2042:       if (map.EstadoPago) nextRow[map.EstadoPago - 1] = nextPago;
2043:       if (map.EstadoCita) nextRow[map.EstadoCita - 1] = nextCita;
2044:       try { passportSyncAppointment_(nextRow, map, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}); } catch(passportErr) {
2045:         try { auditGeneral_(user, 'Error sincronizando Pasaporte', 'Cita', p.id, '', passportErr.message, p.note || ''); } catch(auditErr) {}
2046:       }
2047:       recordAppointmentStatusHistory_(p.id, prev, p.status + ' => ' + nextPago + ' / ' + nextCita, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, p.note || 'Cambio desde agenda admin');
2048:       return {ok: true};
2049:     }
2050:   }
2051:   return {ok: false, error: 'Cita no encontrada'};
```

### Coincidencia 12 — línea 2032

```javascript
1977: }
1978: 
1979: function parseReservationExpiry_(value) {
1980:   if (value instanceof Date && !isNaN(value.getTime())) return value;
1981:   if (typeof value === 'number' && value > 0) {
1982:     var epoch = new Date(Math.round((value - 25569) * 86400 * 1000));
1983:     if (!isNaN(epoch.getTime())) return epoch;
1984:   }
1985:   var raw = ('' + (value || '')).trim();
1986:   if (!raw) return null;
1987:   var parsed = new Date(raw);
1988:   return isNaN(parsed.getTime()) ? null : parsed;
1989: }
1990: 
1991: function hasActivePaymentForCita_(citaId) {
1992:   setupOperationsModule_();
1993:   var rows = operationsSheet_('Pagos').getDataRange().getValues();
1994:   var active = [
1995:     PAYMENT_STATUS.COMPROBANTE_RECIBIDO,
1996:     PAYMENT_STATUS.PAGO_APROBADO,
1997:     PAYMENT_STATUS.NO_REQUIERE_PAGO,
1998:     'Por verificar',
1999:     'Aprobado'
2000:   ];
2001:   for (var i = 1; i < rows.length; i++) {
2002:     if ('' + (rows[i][2] || '') !== '' + citaId) continue;
2003:     if (active.indexOf('' + (rows[i][12] || '')) >= 0) return true;
2004:   }
2005:   var cort = operationsSheet_('Cortesias').getDataRange().getValues();
2006:   for (var j = 1; j < cort.length; j++) {
2007:     if ('' + (cort[j][1] || '') === '' + citaId && normalizeKey_(cort[j][8]) === 'autorizada') return true;
2008:   }
2009:   return false;
2010: }
2011: 
2012: function doUpdateStatus(p, user) {
2013:   setupOperationsModule_();
2014:   ensureCitasStateColumns_();
2015:   var sheet = getOrCreateSheet().getSheetByName('Citas');
2016:   var map = headerMap_(sheet);
2017:   var rows  = sheet.getDataRange().getValues();
2018:   for (var i = 1; i < rows.length; i++) {
2019:     if (rows[i][0] === p.id) {
2020:       var prev = '' + (rows[i][10] || '');
2021:       sheet.getRange(i+1, 11).setValue(p.status);
2022:       var statusKey = normalizeKey_(p.status);
2023:       var state = getCitaStateFromRow_(rows[i], map);
2024:       var nextPago = state.estadoPago;
2025:       var nextCita = state.estadoCita;
2026:       if (statusKey === 'atendida' || statusKey === 'sesion atendida') nextCita = APPOINTMENT_STATUS.ATENDIDA;
2027:       else if (statusKey === 'no asistio') nextCita = APPOINTMENT_STATUS.NO_ASISTIO;
2028:       else if (statusKey === 'cancelada' || statusKey.indexOf('cancel') === 0) nextCita = APPOINTMENT_STATUS.CANCELADA;
2029:       else if (statusKey === 'pago rechazado') nextPago = PAYMENT_STATUS.PAGO_RECHAZADO;
2030:       else if (statusKey === 'pago por verificar') nextPago = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2031:       else if (statusKey === 'pago verificado' || statusKey === 'autorizada para atender') {
2032:         nextPago = PAYMENT_STATUS.PAGO_APROBADO;
2033:         nextCita = APPOINTMENT_STATUS.AUTORIZADA;
2034:       }
2035:       if (map.EstadoPago) sheet.getRange(i+1, map.EstadoPago).setValue(nextPago);
2036:       if (map.EstadoCita) sheet.getRange(i+1, map.EstadoCita).setValue(nextCita);
2037:       if (nextCita === APPOINTMENT_STATUS.ATENDIDA && !p.manualAudit) {
2038:         if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2039:       }
2040:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
2041:       var nextRow = rows[i].slice();
2042:       if (map.EstadoPago) nextRow[map.EstadoPago - 1] = nextPago;
2043:       if (map.EstadoCita) nextRow[map.EstadoCita - 1] = nextCita;
2044:       try { passportSyncAppointment_(nextRow, map, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}); } catch(passportErr) {
2045:         try { auditGeneral_(user, 'Error sincronizando Pasaporte', 'Cita', p.id, '', passportErr.message, p.note || ''); } catch(auditErr) {}
2046:       }
2047:       recordAppointmentStatusHistory_(p.id, prev, p.status + ' => ' + nextPago + ' / ' + nextCita, user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, p.note || 'Cambio desde agenda admin');
2048:       return {ok: true};
2049:     }
2050:   }
2051:   return {ok: false, error: 'Cita no encontrada'};
2052: }
2053: 
2054: function parseOperationsPayload_(data) {
2055:   if (!data) return {};
2056:   if (typeof data === 'object') return data;
2057:   try {
2058:     return JSON.parse(decodeURIComponent(data));
2059:   } catch(e1) {
2060:     try { return JSON.parse(data); } catch(e2) { return {}; }
2061:   }
2062: }
2063: 
2064: function operationConfigValue_(key, fallback) {
2065:   var rows = operationsSheet_('ConfiguracionOperativa').getDataRange().getValues();
2066:   for (var i = 1; i < rows.length; i++) {
2067:     if ('' + rows[i][0] === key) return rows[i][1] || fallback;
2068:   }
2069:   return fallback;
2070: }
2071: 
2072: function paymentProofFolder_() {
2073:   var name = 'Comprobantes Cuidandote Fisioterapia';
2074:   var folders = DriveApp.getFoldersByName(name);
2075:   if (folders.hasNext()) return folders.next();
2076:   return DriveApp.createFolder(name);
2077: }
2078: 
2079: function hexDigest_(bytes) {
2080:   return bytes.map(function(b) {
2081:     var v = (b < 0 ? b + 256 : b).toString(16);
2082:     return v.length === 1 ? '0' + v : v;
2083:   }).join('');
2084: }
2085: 
2086: function savePaymentProof_(file, meta, user) {
2087:   if (!file || !file.data) return null;
```

### Coincidencia 13 — línea 2205

```javascript
2150:   ensureCitasStateColumns_();
2151:   var p = parseOperationsPayload_(data);
2152:   if (!p.citaId && !p.codigoReserva) return {ok:false,error:'Falta cita o cÃ³digo de reserva'};
2153:   var found = p.citaId ? getCitaById_(p.citaId) : null;
2154:   var code = p.codigoReserva || (found ? reservationCodeFor_(p.citaId, found.cita.fecha) : reservationCodeFor_(''));
2155:   var id = p.id || ('PAY-' + new Date().getTime());
2156:   var proofResult = p.proofFile ? savePaymentProof_(p.proofFile, {
2157:     pagoId: id,
2158:     codigoReserva: code,
2159:     citaId: p.citaId || '',
2160:     observaciones: p.observaciones || ''
2161:   }, user) : null;
2162:   if (proofResult && !proofResult.ok) return proofResult;
2163:   if (proofResult && proofResult.url && !p.comprobante) p.comprobante = proofResult.url;
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
```

### Coincidencia 14 — línea 2219

```javascript
2164:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues(), row = -1;
2165:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
```

### Coincidencia 15 — línea 2221

```javascript
2166:   if (row < 0 && p.citaId) {
2167:     for (var j = rows.length - 1; j >= 1; j--) {
2168:       var sameCita = '' + (rows[j][2] || '') === '' + p.citaId;
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
2275:     if ('' + rows[i][0] !== '' + p.saldoId) continue;
2276:     var restante = Number(rows[i][9] || 0);
```

### Coincidencia 16 — línea 2224

```javascript
2169:       var activeStatus = '' + (rows[j][12] || '');
2170:       if (sameCita && ['COMPROBANTE_RECIBIDO','PENDIENTE_PAGO','Por verificar'].indexOf(activeStatus) >= 0) {
2171:         row = j + 1;
2172:         id = '' + rows[j][0];
2173:         break;
2174:       }
2175:     }
2176:   }
2177:   var expected = p.valorEsperado || (found ? found.cita.precio : '');
2178:   var values = [
2179:     id, code, p.citaId || '', p.cliente || (found ? found.cita.nombre : ''),
2180:     p.servicioPlan || (found ? found.cita.servicio : ''), expected, p.valorRecibido || '',
2181:     p.medioPago || '', p.cuentaReceptora || '', p.fechaPago || '', p.fechaVerificacion || '',
2182:     p.comprobante || '', p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO, p.usuarioVerifico || '',
2183:     p.observaciones || '', p.cuotaNumero || '', p.saldoPendiente || '', row > 0 ? rows[row-1][17] || new Date() : new Date(), new Date()
2184:   ];
2185:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2186:   else sh.appendRow(values);
2187:   if (p.citaId && (p.estadoPago || PAYMENT_STATUS.COMPROBANTE_RECIBIDO) === PAYMENT_STATUS.COMPROBANTE_RECIBIDO) {
2188:     var f = getCitaById_(p.citaId);
2189:     if (f) {
2190:       getOrCreateSheet().getSheetByName('Citas').getRange(f.row, 11).setValue('Pago por verificar');
2191:       setCitaStates_(p.citaId, PAYMENT_STATUS.COMPROBANTE_RECIBIDO, APPOINTMENT_STATUS.RESERVADA, user, 'Comprobante registrado pendiente de verificacion');
2192:     }
2193:   }
2194:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ pago' : 'RegistrÃ³ pago', 'Pago', id, '', values, p.observaciones || '');
2195:   return {ok:true,id:id,codigoReserva:code};
2196: }
2197: 
2198: function verifyPayment_(p, user) {
2199:   setupOperationsModule_();
2200:   ensureCitasStateColumns_();
2201:   var id = p.id, status = p.estado || p.status || '';
2202:   if (!id || !status) return {ok:false,error:'Falta pago o estado'};
2203:   var statusKey = normalizeKey_(status);
2204:   var normalizedPay = status;
2205:   if (statusKey === 'aprobado' || statusKey === 'pago aprobado') normalizedPay = PAYMENT_STATUS.PAGO_APROBADO;
2206:   else if (statusKey === 'rechazado' || statusKey === 'pago rechazado') normalizedPay = PAYMENT_STATUS.PAGO_RECHAZADO;
2207:   else if (statusKey === 'por verificar' || statusKey === 'comprobante recibido') normalizedPay = PAYMENT_STATUS.COMPROBANTE_RECIBIDO;
2208:   else if (statusKey === 'reembolsado' || statusKey === 'reembolsada') normalizedPay = PAYMENT_STATUS.REEMBOLSADO;
2209:   var sh = operationsSheet_('Pagos'), rows = sh.getDataRange().getValues();
2210:   for (var i = 1; i < rows.length; i++) {
2211:     if ('' + rows[i][0] !== '' + id) continue;
2212:     var prevPay = '' + (rows[i][12] || '');
2213:     sh.getRange(i+1, 11, 1, 5).setValues([[new Date(), rows[i][11] || '', normalizedPay, user.nombre || 'Administracion', p.observaciones || rows[i][14] || '']]);
2214:     sh.getRange(i+1, 19).setValue(new Date());
2215:     var citaId = '' + (rows[i][2] || '');
2216:     if (citaId) {
2217:       var found = getCitaById_(citaId);
2218:       if (found) {
2219:         var nextState = normalizedPay === PAYMENT_STATUS.PAGO_APROBADO ? 'Autorizada para atender' : (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO ? 'Pago rechazado' : (normalizedPay === PAYMENT_STATUS.COMPROBANTE_RECIBIDO ? 'Pago por verificar' : found.cita.estado));
2220:         getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue(nextState);
2221:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 15).setValue(rows[i][7] || 'Pago aprobado');
2222:         var currentState = getCitaStateFromRow_(found.raw || [], headerMap_(getOrCreateSheet().getSheetByName('Citas')));
2223:         var nextCitaStatus = currentState.estadoCita || APPOINTMENT_STATUS.RESERVADA;
2224:         if (normalizedPay === PAYMENT_STATUS.PAGO_APROBADO) nextCitaStatus = APPOINTMENT_STATUS.AUTORIZADA;
2225:         if (normalizedPay === PAYMENT_STATUS.PAGO_RECHAZADO) nextCitaStatus = APPOINTMENT_STATUS.RESERVADA;
2226:         if (normalizedPay === PAYMENT_STATUS.REEMBOLSADO) nextCitaStatus = APPOINTMENT_STATUS.CANCELADA;
2227:         setCitaStates_(citaId, normalizedPay, nextCitaStatus, user, 'Verificacion de pago: ' + normalizedPay);
2228:       }
2229:     }
2230:     auditGeneral_(user, 'Verifico pago', 'Pago', id, prevPay, normalizedPay, p.observaciones || '');
2231:     return {ok:true};
2232:   }
2233:   return {ok:false,error:'Pago no encontrado'};
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
2275:     if ('' + rows[i][0] !== '' + p.saldoId) continue;
2276:     var restante = Number(rows[i][9] || 0);
2277:     if (!valorUsar) valorUsar = restante;
2278:     if (valorUsar > restante) return {ok:false,error:'El valor a usar supera el saldo disponible'};
2279:     var nuevoRestante = restante - valorUsar;
```

### Coincidencia 17 — línea 2289

```javascript
2234: }
2235: 
2236: function authorizeCourtesy_(p, user) {
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
2275:     if ('' + rows[i][0] !== '' + p.saldoId) continue;
2276:     var restante = Number(rows[i][9] || 0);
2277:     if (!valorUsar) valorUsar = restante;
2278:     if (valorUsar > restante) return {ok:false,error:'El valor a usar supera el saldo disponible'};
2279:     var nuevoRestante = restante - valorUsar;
2280:     var usado = Number(rows[i][8] || 0) + valorUsar;
2281:     sh.getRange(i+1, 9, 1, 5).setValues([[usado, nuevoRestante, rows[i][10] || user.nombre || 'Administracion', nuevoRestante > 0 ? 'Disponible' : 'Usado', rows[i][12] || '']]);
2282:     sh.getRange(i+1, 14).setValue(new Date());
2283:     var payResult = savePayment_({
2284:       citaId:p.citaId,
2285:       valorRecibido:valorUsar,
2286:       medioPago:'SALDO_A_FAVOR',
2287:       cuentaReceptora:p.saldoId,
2288:       fechaPago:fmtDate(new Date()),
2289:       estadoPago:PAYMENT_STATUS.PAGO_APROBADO,
2290:       observaciones:'Pago aplicado con saldo a favor ' + p.saldoId
2291:     }, user);
2292:     if (payResult && payResult.id) verifyPayment_({id:payResult.id, estado:PAYMENT_STATUS.PAGO_APROBADO}, user);
2293:     setCitaStates_(p.citaId, PAYMENT_STATUS.PAGO_APROBADO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Saldo a favor aplicado: ' + p.saldoId + ' valor ' + valorUsar);
2294:     auditGeneral_(user, 'Aplico saldo a favor', 'SaldoFavor', p.saldoId, restante, nuevoRestante, 'Cita ' + p.citaId);
2295:     return {ok:true,saldoRestante:nuevoRestante,valorUtilizado:valorUsar};
2296:   }
2297:   return {ok:false,error:'Saldo a favor no encontrado'};
2298: }
2299: 
2300: function savePaymentAccount_(data, user) {
2301:   setupOperationsModule_();
2302:   var a = JSON.parse(decodeURIComponent(data || '{}'));
2303:   if (!a.medio || !a.numero) return {ok:false,error:'Falta medio o nÃºmero'};
2304:   var id = a.id || ('CTA-' + new Date().getTime());
2305:   var sh = operationsSheet_('CuentasPago'), rows = sh.getDataRange().getValues(), row = -1;
2306:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2307:   var values = [id, a.medio, a.tipo || '', a.numero, a.titular || 'Jessica Andrea Ocampo Barbosa', a.estado || 'Activa', a.orden || 9, new Date()];
2308:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2309:   else sh.appendRow(values);
2310:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ cuenta de pago' : 'CreÃ³ cuenta de pago', 'CuentaPago', id, '', values, '');
2311:   return {ok:true,id:id};
2312: }
2313: 
2314: function getOperationsData_() {
2315:   setupOperationsModule_();
2316:   return {
2317:     ok:true,
2318:     estados: APPOINTMENT_STATUS_CATALOG,
2319:     cuentas: sheetObjects_(operationsSheet_('CuentasPago')),
2320:     config: sheetObjects_(operationsSheet_('ConfiguracionOperativa')),
2321:     pagos: sheetObjects_(operationsSheet_('Pagos')).reverse(),
2322:     saldosFavor: sheetObjects_(operationsSheet_('SaldosFavor')).reverse(),
2323:     cortesias: sheetObjects_(operationsSheet_('Cortesias')).reverse(),
2324:     agendaPreparacion: sheetObjects_(operationsSheet_('AgendaPreparacion')).reverse(),
2325:     recordatoriosCita: sheetObjects_(operationsSheet_('RecordatoriosCita')).reverse(),
2326:     novedadesDiarias: sheetObjects_(operationsSheet_('NovedadesDiarias')).reverse(),
2327:     historialEstados: sheetObjects_(operationsSheet_('HistorialEstadosCita')).slice(-120).reverse(),
2328:     plantillasPlanes: sheetObjects_(operationsSheet_('PlantillasPlanes')),
2329:     planesCliente: sheetObjects_(operationsSheet_('PlanesCliente')),
2330:     cuotasPlan: sheetObjects_(operationsSheet_('CuotasPlan')),
2331:     sesionesPlan: sheetObjects_(operationsSheet_('SesionesPlan')),
2332:     tarifasProfesionales: sheetObjects_(operationsSheet_('TarifasProfesionales')),
2333:     liquidaciones: sheetObjects_(operationsSheet_('LiquidacionesProfesionales')),
2334:     auditoria: sheetObjects_(operationsSheet_('AuditoriaGeneral')).slice(-120).reverse()
2335:   };
2336: }
2337: 
2338: function parseISODate_(s) {
2339:   if (!s) return null;
2340:   if (Object.prototype.toString.call(s) === '[object Date]') return s;
2341:   var parts = ('' + s).split('-').map(Number);
2342:   if (parts.length < 3) return null;
2343:   return new Date(parts[0], parts[1] - 1, parts[2]);
2344: }
```

### Coincidencia 18 — línea 2292

```javascript
2237:   setupOperationsModule_();
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
2275:     if ('' + rows[i][0] !== '' + p.saldoId) continue;
2276:     var restante = Number(rows[i][9] || 0);
2277:     if (!valorUsar) valorUsar = restante;
2278:     if (valorUsar > restante) return {ok:false,error:'El valor a usar supera el saldo disponible'};
2279:     var nuevoRestante = restante - valorUsar;
2280:     var usado = Number(rows[i][8] || 0) + valorUsar;
2281:     sh.getRange(i+1, 9, 1, 5).setValues([[usado, nuevoRestante, rows[i][10] || user.nombre || 'Administracion', nuevoRestante > 0 ? 'Disponible' : 'Usado', rows[i][12] || '']]);
2282:     sh.getRange(i+1, 14).setValue(new Date());
2283:     var payResult = savePayment_({
2284:       citaId:p.citaId,
2285:       valorRecibido:valorUsar,
2286:       medioPago:'SALDO_A_FAVOR',
2287:       cuentaReceptora:p.saldoId,
2288:       fechaPago:fmtDate(new Date()),
2289:       estadoPago:PAYMENT_STATUS.PAGO_APROBADO,
2290:       observaciones:'Pago aplicado con saldo a favor ' + p.saldoId
2291:     }, user);
2292:     if (payResult && payResult.id) verifyPayment_({id:payResult.id, estado:PAYMENT_STATUS.PAGO_APROBADO}, user);
2293:     setCitaStates_(p.citaId, PAYMENT_STATUS.PAGO_APROBADO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Saldo a favor aplicado: ' + p.saldoId + ' valor ' + valorUsar);
2294:     auditGeneral_(user, 'Aplico saldo a favor', 'SaldoFavor', p.saldoId, restante, nuevoRestante, 'Cita ' + p.citaId);
2295:     return {ok:true,saldoRestante:nuevoRestante,valorUtilizado:valorUsar};
2296:   }
2297:   return {ok:false,error:'Saldo a favor no encontrado'};
2298: }
2299: 
2300: function savePaymentAccount_(data, user) {
2301:   setupOperationsModule_();
2302:   var a = JSON.parse(decodeURIComponent(data || '{}'));
2303:   if (!a.medio || !a.numero) return {ok:false,error:'Falta medio o nÃºmero'};
2304:   var id = a.id || ('CTA-' + new Date().getTime());
2305:   var sh = operationsSheet_('CuentasPago'), rows = sh.getDataRange().getValues(), row = -1;
2306:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2307:   var values = [id, a.medio, a.tipo || '', a.numero, a.titular || 'Jessica Andrea Ocampo Barbosa', a.estado || 'Activa', a.orden || 9, new Date()];
2308:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2309:   else sh.appendRow(values);
2310:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ cuenta de pago' : 'CreÃ³ cuenta de pago', 'CuentaPago', id, '', values, '');
2311:   return {ok:true,id:id};
2312: }
2313: 
2314: function getOperationsData_() {
2315:   setupOperationsModule_();
2316:   return {
2317:     ok:true,
2318:     estados: APPOINTMENT_STATUS_CATALOG,
2319:     cuentas: sheetObjects_(operationsSheet_('CuentasPago')),
2320:     config: sheetObjects_(operationsSheet_('ConfiguracionOperativa')),
2321:     pagos: sheetObjects_(operationsSheet_('Pagos')).reverse(),
2322:     saldosFavor: sheetObjects_(operationsSheet_('SaldosFavor')).reverse(),
2323:     cortesias: sheetObjects_(operationsSheet_('Cortesias')).reverse(),
2324:     agendaPreparacion: sheetObjects_(operationsSheet_('AgendaPreparacion')).reverse(),
2325:     recordatoriosCita: sheetObjects_(operationsSheet_('RecordatoriosCita')).reverse(),
2326:     novedadesDiarias: sheetObjects_(operationsSheet_('NovedadesDiarias')).reverse(),
2327:     historialEstados: sheetObjects_(operationsSheet_('HistorialEstadosCita')).slice(-120).reverse(),
2328:     plantillasPlanes: sheetObjects_(operationsSheet_('PlantillasPlanes')),
2329:     planesCliente: sheetObjects_(operationsSheet_('PlanesCliente')),
2330:     cuotasPlan: sheetObjects_(operationsSheet_('CuotasPlan')),
2331:     sesionesPlan: sheetObjects_(operationsSheet_('SesionesPlan')),
2332:     tarifasProfesionales: sheetObjects_(operationsSheet_('TarifasProfesionales')),
2333:     liquidaciones: sheetObjects_(operationsSheet_('LiquidacionesProfesionales')),
2334:     auditoria: sheetObjects_(operationsSheet_('AuditoriaGeneral')).slice(-120).reverse()
2335:   };
2336: }
2337: 
2338: function parseISODate_(s) {
2339:   if (!s) return null;
2340:   if (Object.prototype.toString.call(s) === '[object Date]') return s;
2341:   var parts = ('' + s).split('-').map(Number);
2342:   if (parts.length < 3) return null;
2343:   return new Date(parts[0], parts[1] - 1, parts[2]);
2344: }
2345: 
2346: function addDaysISO_(dateStr, days) {
2347:   var d = parseISODate_(dateStr) || new Date();
```

### Coincidencia 19 — línea 2293

```javascript
2238:   ensureCitasStateColumns_();
2239:   if (!p.citaId) return {ok:false,error:'Falta cita'};
2240:   if (!p.motivo) return {ok:false,error:'Debes registrar el motivo de la cortesÃ­a'};
2241:   var found = getCitaById_(p.citaId);
2242:   if (!found) return {ok:false,error:'Cita no encontrada'};
2243:   var valor = p.valorComercial || found.cita.precio || '';
2244:   if (!valor) return {ok:false,error:'Debes registrar el valor comercial del servicio'};
2245:   var sh = operationsSheet_('Cortesias');
2246:   var id = 'COR-' + new Date().getTime() + '-' + Math.floor(Math.random()*999);
2247:   sh.appendRow([id, p.citaId, found.cita.nombre, found.cita.servicio, valor, p.motivo, user.nombre || 'Administracion', new Date(), 'Autorizada', p.observaciones || '']);
2248:   getOrCreateSheet().getSheetByName('Citas').getRange(found.row, 11).setValue('CortesÃ­a autorizada');
2249:   setCitaStates_(p.citaId, PAYMENT_STATUS.NO_REQUIERE_PAGO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Cortesia autorizada: ' + p.motivo + ' | Valor comercial: ' + valor);
2250:   auditGeneral_(user, 'Autorizo cortesia', 'Cortesia', id, '', {citaId:p.citaId, valorComercial:valor, motivo:p.motivo}, p.observaciones || '');
2251:   return {ok:true,id:id};
2252: }
2253: 
2254: function createCreditBalance_(p, user) {
2255:   setupOperationsModule_();
2256:   var valor = Number(('' + (p.valorDisponible || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2257:   if (!valor) return {ok:false,error:'Debes registrar el valor disponible'};
2258:   var id = p.id || ('SALDO-' + new Date().getTime() + '-' + Math.floor(Math.random()*999));
2259:   operationsSheet_('SaldosFavor').appendRow([
2260:     id, p.cliente || '', p.telefono || '', valor, p.citaOrigenId || '', p.pagoOrigenId || '',
2261:     new Date(), p.fechaVencimiento || '', 0, valor, user.nombre || 'Administracion',
2262:     'Disponible', p.observaciones || '', new Date()
2263:   ]);
2264:   auditGeneral_(user, 'Creo saldo a favor', 'SaldoFavor', id, '', {valorDisponible:valor, citaOrigen:p.citaOrigenId || '', pagoOrigen:p.pagoOrigenId || ''}, p.observaciones || '');
2265:   return {ok:true,id:id,saldoRestante:valor};
2266: }
2267: 
2268: function applyCreditBalance_(p, user) {
2269:   setupOperationsModule_();
2270:   ensureCitasStateColumns_();
2271:   if (!p.saldoId || !p.citaId) return {ok:false,error:'Falta saldo o cita'};
2272:   var sh = operationsSheet_('SaldosFavor'), rows = sh.getDataRange().getValues();
2273:   var valorUsar = Number(('' + (p.valorUtilizado || p.valor || '')).replace(/[^\d.-]/g,'')) || 0;
2274:   for (var i = 1; i < rows.length; i++) {
2275:     if ('' + rows[i][0] !== '' + p.saldoId) continue;
2276:     var restante = Number(rows[i][9] || 0);
2277:     if (!valorUsar) valorUsar = restante;
2278:     if (valorUsar > restante) return {ok:false,error:'El valor a usar supera el saldo disponible'};
2279:     var nuevoRestante = restante - valorUsar;
2280:     var usado = Number(rows[i][8] || 0) + valorUsar;
2281:     sh.getRange(i+1, 9, 1, 5).setValues([[usado, nuevoRestante, rows[i][10] || user.nombre || 'Administracion', nuevoRestante > 0 ? 'Disponible' : 'Usado', rows[i][12] || '']]);
2282:     sh.getRange(i+1, 14).setValue(new Date());
2283:     var payResult = savePayment_({
2284:       citaId:p.citaId,
2285:       valorRecibido:valorUsar,
2286:       medioPago:'SALDO_A_FAVOR',
2287:       cuentaReceptora:p.saldoId,
2288:       fechaPago:fmtDate(new Date()),
2289:       estadoPago:PAYMENT_STATUS.PAGO_APROBADO,
2290:       observaciones:'Pago aplicado con saldo a favor ' + p.saldoId
2291:     }, user);
2292:     if (payResult && payResult.id) verifyPayment_({id:payResult.id, estado:PAYMENT_STATUS.PAGO_APROBADO}, user);
2293:     setCitaStates_(p.citaId, PAYMENT_STATUS.PAGO_APROBADO, APPOINTMENT_STATUS.AUTORIZADA, user, 'Saldo a favor aplicado: ' + p.saldoId + ' valor ' + valorUsar);
2294:     auditGeneral_(user, 'Aplico saldo a favor', 'SaldoFavor', p.saldoId, restante, nuevoRestante, 'Cita ' + p.citaId);
2295:     return {ok:true,saldoRestante:nuevoRestante,valorUtilizado:valorUsar};
2296:   }
2297:   return {ok:false,error:'Saldo a favor no encontrado'};
2298: }
2299: 
2300: function savePaymentAccount_(data, user) {
2301:   setupOperationsModule_();
2302:   var a = JSON.parse(decodeURIComponent(data || '{}'));
2303:   if (!a.medio || !a.numero) return {ok:false,error:'Falta medio o nÃºmero'};
2304:   var id = a.id || ('CTA-' + new Date().getTime());
2305:   var sh = operationsSheet_('CuentasPago'), rows = sh.getDataRange().getValues(), row = -1;
2306:   for (var i = 1; i < rows.length; i++) if ('' + rows[i][0] === id) row = i + 1;
2307:   var values = [id, a.medio, a.tipo || '', a.numero, a.titular || 'Jessica Andrea Ocampo Barbosa', a.estado || 'Activa', a.orden || 9, new Date()];
2308:   if (row > 0) sh.getRange(row, 1, 1, values.length).setValues([values]);
2309:   else sh.appendRow(values);
2310:   auditGeneral_(user, row > 0 ? 'ActualizÃ³ cuenta de pago' : 'CreÃ³ cuenta de pago', 'CuentaPago', id, '', values, '');
2311:   return {ok:true,id:id};
2312: }
2313: 
2314: function getOperationsData_() {
2315:   setupOperationsModule_();
2316:   return {
2317:     ok:true,
2318:     estados: APPOINTMENT_STATUS_CATALOG,
2319:     cuentas: sheetObjects_(operationsSheet_('CuentasPago')),
2320:     config: sheetObjects_(operationsSheet_('ConfiguracionOperativa')),
2321:     pagos: sheetObjects_(operationsSheet_('Pagos')).reverse(),
2322:     saldosFavor: sheetObjects_(operationsSheet_('SaldosFavor')).reverse(),
2323:     cortesias: sheetObjects_(operationsSheet_('Cortesias')).reverse(),
2324:     agendaPreparacion: sheetObjects_(operationsSheet_('AgendaPreparacion')).reverse(),
2325:     recordatoriosCita: sheetObjects_(operationsSheet_('RecordatoriosCita')).reverse(),
2326:     novedadesDiarias: sheetObjects_(operationsSheet_('NovedadesDiarias')).reverse(),
2327:     historialEstados: sheetObjects_(operationsSheet_('HistorialEstadosCita')).slice(-120).reverse(),
2328:     plantillasPlanes: sheetObjects_(operationsSheet_('PlantillasPlanes')),
2329:     planesCliente: sheetObjects_(operationsSheet_('PlanesCliente')),
2330:     cuotasPlan: sheetObjects_(operationsSheet_('CuotasPlan')),
2331:     sesionesPlan: sheetObjects_(operationsSheet_('SesionesPlan')),
2332:     tarifasProfesionales: sheetObjects_(operationsSheet_('TarifasProfesionales')),
2333:     liquidaciones: sheetObjects_(operationsSheet_('LiquidacionesProfesionales')),
2334:     auditoria: sheetObjects_(operationsSheet_('AuditoriaGeneral')).slice(-120).reverse()
2335:   };
2336: }
2337: 
2338: function parseISODate_(s) {
2339:   if (!s) return null;
2340:   if (Object.prototype.toString.call(s) === '[object Date]') return s;
2341:   var parts = ('' + s).split('-').map(Number);
2342:   if (parts.length < 3) return null;
2343:   return new Date(parts[0], parts[1] - 1, parts[2]);
2344: }
2345: 
2346: function addDaysISO_(dateStr, days) {
2347:   var d = parseISODate_(dateStr) || new Date();
2348:   d.setDate(d.getDate() + days);
```

### Coincidencia 20 — línea 3220

```javascript
3165:   try {
3166:     if (!id || !token) return {ok:false,error:'Enlace incompleto. Solicita tu nuevo enlace por WhatsApp.'};
3167:     var sh   = getPasaportesSheet();
3168:     var map  = passportHeaderMap_(sh);
3169:     var data = sh.getDataRange().getValues();
3170:     for (var i = 1; i < data.length; i++) {
3171:       if ('' + (data[i][map.PasaporteID - 1] || '') === '' + id) {
3172:         if ('' + (data[i][map.TokenPublico - 1] || '') !== '' + token) return {ok:false,error:'Enlace inválido o actualizado. Solicita tu nuevo enlace por WhatsApp.'};
3173:         if (('' + (data[i][map.Estado - 1] || 'ACTIVO')).toUpperCase() !== 'ACTIVO') return {ok:false,error:'Este pasaporte no está activo. Escríbenos por WhatsApp.'};
3174:         sh.getRange(i + 1, map.FechaUltimoAcceso).setValue(new Date());
3175:         var rawPassport = parseJsonSafe_(data[i][map.passport - 1]);
3176:         var applied = passportAppliedAppointments_(data[i], map);
3177:         return {
3178:           ok:       true,
3179:           id:       id,
3180:           nombre:   '' + (data[i][map.nombre - 1] || ''),
3181:           passport: passportProgressForClient_(rawPassport, applied),
3182:           descarga: parseJsonSafe_(data[i][map.descarga - 1])
3183:         };
3184:       }
3185:     }
3186:     return { ok: false, error: 'Pasaporte no encontrado. Solicita tu nuevo enlace por WhatsApp.' };
3187:   } catch(e) {
3188:     return { ok: false, error: e.message };
3189:   }
3190: }
3191: 
3192: function findPassportByName_(nombre) {
3193:   var sh = getPasaportesSheet();
3194:   var map = passportHeaderMap_(sh);
3195:   var rows = sh.getDataRange().getValues();
3196:   var norm = (nombre || '').toLowerCase().trim();
3197:   for (var i = 1; i < rows.length; i++) {
3198:     if (('' + (rows[i][map.nombre - 1] || '')).toLowerCase().trim() === norm) {
3199:       return passportRowToObject_(rows[i], map, i + 1);
3200:     }
3201:   }
3202:   return null;
3203: }
3204: 
3205: function findPassportById_(id) {
3206:   var sh = getPasaportesSheet();
3207:   var map = passportHeaderMap_(sh);
3208:   var rows = sh.getDataRange().getValues();
3209:   for (var i = 1; i < rows.length; i++) {
3210:     if ('' + (rows[i][map.PasaporteID - 1] || '') === '' + id) return passportRowToObject_(rows[i], map, i + 1);
3211:   }
3212:   return null;
3213: }
3214: 
3215: function passportAppointmentIsEligible_(citaRow, citaMap) {
3216:   var state = getCitaStateFromRow_(citaRow, citaMap);
3217:   var service = '' + (citaRow[5] || '');
3218:   var price = Number(citaRow[9] || 0);
3219:   return state.estadoCita === APPOINTMENT_STATUS.ATENDIDA &&
3220:     state.estadoPago === PAYMENT_STATUS.PAGO_APROBADO &&
3221:     price > 0 && !esRegistro(service);
3222: }
3223: 
3224: function passportSyncAppointment_(citaRow, citaMap, user) {
3225:   var citaId = '' + (citaRow[0] || '');
3226:   var nombre = '' + (citaRow[2] || '');
3227:   if (!citaId || !nombre) return {ok:false, skipped:true};
3228:   var eligible = passportAppointmentIsEligible_(citaRow, citaMap);
3229:   var passport = findPassportByName_(nombre);
3230:   if (!passport && !eligible) return {ok:true, skipped:true};
3231:   if (!passport) {
3232:     var created = passportEnsure_(nombre, ('' + (citaRow[3] || '')).replace(/\D/g, ''), user);
3233:     if (!created.ok) return created;
3234:     passport = findPassportById_(created.passport.id);
3235:   }
3236:   var sh = getPasaportesSheet();
3237:   var map = passportHeaderMap_(sh);
3238:   var row = sh.getRange(passport.row, 1, 1, sh.getLastColumn()).getValues()[0];
3239:   var applied = passportAppliedAppointments_(row, map);
3240:   var oldCount = passportEffectiveStampCount_(parseJsonSafe_(row[map.passport - 1]), applied);
3241:   var current = applied[citaId] || {};
3242:   if (!!current.activo === eligible) return {ok:true, changed:false};
3243:   applied[citaId] = {
3244:     citaId:citaId,
3245:     servicio:'' + (citaRow[5] || ''),
3246:     fecha:citaRow[7] || '',
3247:     activo:eligible,
3248:     actualizado:new Date(),
3249:     usuarioId:(user && user.id) || 'system',
3250:     usuarioNombre:(user && user.nombre) || 'Sistema'
3251:   };
3252:   sh.getRange(passport.row, map.CitasAplicadasJSON).setValue(JSON.stringify(applied));
3253:   sh.getRange(passport.row, map.actualizado).setValue(new Date());
3254:   var newCount = passportEffectiveStampCount_(parseJsonSafe_(row[map.passport - 1]), applied);
3255:   try {
3256:     auditGeneral_(user, eligible ? 'Aplico sello automatico' : 'Retiro sello automatico', 'Pasaporte', passport.id,
3257:       {citaId:citaId, sellos:oldCount}, {citaId:citaId, sellos:newCount}, eligible ? 'Cita atendida pagada' : 'Cita ya no es valida para Pasaporte');
3258:   } catch(auditErr) {}
3259:   return {ok:true, changed:true, passportId:passport.id, sellos:newCount};
3260: }
3261: 
3262: function passportEnsure_(nombre, telefono, user) {
3263:   try {
3264:     migratePasaportesIfNeeded_();
3265:     if (!nombre) return {ok:false,error:'Falta nombre'};
3266:     var sh = getPasaportesSheet();
3267:     var map = passportHeaderMap_(sh);
3268:     var existing = findPassportByName_(nombre);
3269:     if (existing) {
3270:       if (telefono && map.Telefono) sh.getRange(existing.row, map.Telefono).setValue(telefono);
3271:       existing.telefono = telefono || existing.telefono || '';
3272:       existing.link = passportPublicUrl_(existing.id, existing.token);
3273:       return {ok:true, passport: existing};
3274:     }
3275:     var id = makePassportId_();
```

## Retorno de identificador

Coincidencias: 70

### Coincidencia 1 — línea 25

```javascript
1: // =============================================================
2: //  Cuidándote Fisioterapia â€” Apps Script Backend
3: //  Funciones: Reservas, Base de datos, Disponibilidad,
4: //             Panel Admin, Recordatorios diarios
5: // =============================================================
6: 
7: // IMPORTANTE: estas variables se leen desde PropertiesService (no estÃ¡n en cÃ³digo).
8: // Para configurarlas: en el editor de Apps Script â†’ Proyecto â†’ Propiedades del script â†’ agrega:
9: //   ADMIN_TOKEN   â†’ tu contraseÃ±a admin (ej: una cadena larga aleatoria)
10: //   GEMINI_API_KEY â†’ tu clave de Gemini AI Studio
11: var _props        = PropertiesService.getScriptProperties();
12: // Sin contraseÃ±a de respaldo en cÃ³digo: ADMIN_TOKEN debe existir en Propiedades del script.
13: var ADMIN_TOKEN   = _props.getProperty('ADMIN_TOKEN')   || '';
14: var GEMINI_API_KEY = _props.getProperty('GEMINI_API_KEY') || '';
15: 
16: // â”€â”€ SESIONES â”€â”€ token UUID almacenado en CacheService (TTL 4 horas)
17: function generateSessionToken() {
18:   var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
19:   var t = '';
20:   for (var i = 0; i < 48; i++) t += chars.charAt(Math.floor(Math.random() * chars.length));
21:   return t;
22: }
23: function createSession(user) {
24:   var token = generateSessionToken();
25:   CacheService.getScriptCache().put('sess_' + token, JSON.stringify(user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}), 14400); // 4 horas
26:   return token;
27: }
28: function validateSession(token) {
29:   if (!token || token.length < 20) return false;
30:   return !!CacheService.getScriptCache().get('sess_' + token);
31: }
32: function getSessionUser_(token) {
33:   if (!token || token.length < 20) return null;
34:   var raw = CacheService.getScriptCache().get('sess_' + token);
35:   if (!raw) return null;
36:   if (raw === '1') return {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
37:   try { return JSON.parse(raw); } catch(e) { return {id:'admin', nombre:'Administracion', rol:'Superadministradora'}; }
38: }
39: function isAuxiliaryUser_(user) {
40:   var rol = ('' + (user && user.rol || '')).toLowerCase();
41:   return rol.indexOf('aux') > -1;
42: }
43: function requireAdminOnly_(user, action) {
44:   var ownerOnly = ['changePassword','automationSave','automationSetup','automationRun','automationQueueDone'];
45:   if (isAuxiliaryUser_(user) && ownerOnly.indexOf(action || '') > -1) {
46:     auditTeam_(user, 'Accion exclusiva de propietaria bloqueada', '', '', '', action || '');
47:     return {ok:false,error:'Acción exclusiva de la propietaria'};
48:   }
49:   return null;
50: }
51: 
52: function createProfessionalSession_(pro) {
53:   var token = generateSessionToken();
54:   var payload = {
55:     id: '' + pro.id,
56:     nombre: '' + pro.nombre,
57:     usuario: '' + pro.usuario,
58:     email: '' + pro.email,
59:     rol: '' + (pro.rol || 'Fisioterapeuta'),
60:     debeCambiarPassword: !!pro.debeCambiarPassword
61:   };
62:   CacheService.getScriptCache().put('prosess_' + token, JSON.stringify(payload), 14400);
63:   return token;
64: }
65: function validateProfessionalSession_(token) {
66:   if (!token || token.length < 20) return null;
67:   var raw = CacheService.getScriptCache().get('prosess_' + token);
68:   if (!raw) return null;
69:   try {
70:     CacheService.getScriptCache().put('prosess_' + token, raw, 14400);
71:     return JSON.parse(raw);
72:   } catch(e) {
73:     return null;
74:   }
75: }
76: function hashPassword_(password, salt) {
77:   var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + password, Utilities.Charset.UTF_8);
78:   return bytes.map(function(b) {
79:     var v = (b < 0 ? b + 256 : b).toString(16);
80:     return v.length === 1 ? '0' + v : v;
```

### Coincidencia 2 — línea 36

```javascript
1: // =============================================================
2: //  Cuidándote Fisioterapia â€” Apps Script Backend
3: //  Funciones: Reservas, Base de datos, Disponibilidad,
4: //             Panel Admin, Recordatorios diarios
5: // =============================================================
6: 
7: // IMPORTANTE: estas variables se leen desde PropertiesService (no estÃ¡n en cÃ³digo).
8: // Para configurarlas: en el editor de Apps Script â†’ Proyecto â†’ Propiedades del script â†’ agrega:
9: //   ADMIN_TOKEN   â†’ tu contraseÃ±a admin (ej: una cadena larga aleatoria)
10: //   GEMINI_API_KEY â†’ tu clave de Gemini AI Studio
11: var _props        = PropertiesService.getScriptProperties();
12: // Sin contraseÃ±a de respaldo en cÃ³digo: ADMIN_TOKEN debe existir en Propiedades del script.
13: var ADMIN_TOKEN   = _props.getProperty('ADMIN_TOKEN')   || '';
14: var GEMINI_API_KEY = _props.getProperty('GEMINI_API_KEY') || '';
15: 
16: // â”€â”€ SESIONES â”€â”€ token UUID almacenado en CacheService (TTL 4 horas)
17: function generateSessionToken() {
18:   var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
19:   var t = '';
20:   for (var i = 0; i < 48; i++) t += chars.charAt(Math.floor(Math.random() * chars.length));
21:   return t;
22: }
23: function createSession(user) {
24:   var token = generateSessionToken();
25:   CacheService.getScriptCache().put('sess_' + token, JSON.stringify(user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}), 14400); // 4 horas
26:   return token;
27: }
28: function validateSession(token) {
29:   if (!token || token.length < 20) return false;
30:   return !!CacheService.getScriptCache().get('sess_' + token);
31: }
32: function getSessionUser_(token) {
33:   if (!token || token.length < 20) return null;
34:   var raw = CacheService.getScriptCache().get('sess_' + token);
35:   if (!raw) return null;
36:   if (raw === '1') return {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
37:   try { return JSON.parse(raw); } catch(e) { return {id:'admin', nombre:'Administracion', rol:'Superadministradora'}; }
38: }
39: function isAuxiliaryUser_(user) {
40:   var rol = ('' + (user && user.rol || '')).toLowerCase();
41:   return rol.indexOf('aux') > -1;
42: }
43: function requireAdminOnly_(user, action) {
44:   var ownerOnly = ['changePassword','automationSave','automationSetup','automationRun','automationQueueDone'];
45:   if (isAuxiliaryUser_(user) && ownerOnly.indexOf(action || '') > -1) {
46:     auditTeam_(user, 'Accion exclusiva de propietaria bloqueada', '', '', '', action || '');
47:     return {ok:false,error:'Acción exclusiva de la propietaria'};
48:   }
49:   return null;
50: }
51: 
52: function createProfessionalSession_(pro) {
53:   var token = generateSessionToken();
54:   var payload = {
55:     id: '' + pro.id,
56:     nombre: '' + pro.nombre,
57:     usuario: '' + pro.usuario,
58:     email: '' + pro.email,
59:     rol: '' + (pro.rol || 'Fisioterapeuta'),
60:     debeCambiarPassword: !!pro.debeCambiarPassword
61:   };
62:   CacheService.getScriptCache().put('prosess_' + token, JSON.stringify(payload), 14400);
63:   return token;
64: }
65: function validateProfessionalSession_(token) {
66:   if (!token || token.length < 20) return null;
67:   var raw = CacheService.getScriptCache().get('prosess_' + token);
68:   if (!raw) return null;
69:   try {
70:     CacheService.getScriptCache().put('prosess_' + token, raw, 14400);
71:     return JSON.parse(raw);
72:   } catch(e) {
73:     return null;
74:   }
75: }
76: function hashPassword_(password, salt) {
77:   var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + password, Utilities.Charset.UTF_8);
78:   return bytes.map(function(b) {
79:     var v = (b < 0 ? b + 256 : b).toString(16);
80:     return v.length === 1 ? '0' + v : v;
81:   }).join('');
82: }
83: function makeSalt_() {
84:   return Utilities.getUuid().replace(/-/g, '') + new Date().getTime();
85: }
86: function makeTempPassword_() {
87:   return 'Cuidandote-' + Math.floor(100000 + Math.random() * 900000);
88: }
89: 
90: // â”€â”€ RATE LIMITING LOGIN â”€â”€ mÃ¡x 5 intentos fallidos en 5 minutos (global)
91: function loginAllowed() {
```

### Coincidencia 3 — línea 37

```javascript
1: // =============================================================
2: //  Cuidándote Fisioterapia â€” Apps Script Backend
3: //  Funciones: Reservas, Base de datos, Disponibilidad,
4: //             Panel Admin, Recordatorios diarios
5: // =============================================================
6: 
7: // IMPORTANTE: estas variables se leen desde PropertiesService (no estÃ¡n en cÃ³digo).
8: // Para configurarlas: en el editor de Apps Script â†’ Proyecto â†’ Propiedades del script â†’ agrega:
9: //   ADMIN_TOKEN   â†’ tu contraseÃ±a admin (ej: una cadena larga aleatoria)
10: //   GEMINI_API_KEY â†’ tu clave de Gemini AI Studio
11: var _props        = PropertiesService.getScriptProperties();
12: // Sin contraseÃ±a de respaldo en cÃ³digo: ADMIN_TOKEN debe existir en Propiedades del script.
13: var ADMIN_TOKEN   = _props.getProperty('ADMIN_TOKEN')   || '';
14: var GEMINI_API_KEY = _props.getProperty('GEMINI_API_KEY') || '';
15: 
16: // â”€â”€ SESIONES â”€â”€ token UUID almacenado en CacheService (TTL 4 horas)
17: function generateSessionToken() {
18:   var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
19:   var t = '';
20:   for (var i = 0; i < 48; i++) t += chars.charAt(Math.floor(Math.random() * chars.length));
21:   return t;
22: }
23: function createSession(user) {
24:   var token = generateSessionToken();
25:   CacheService.getScriptCache().put('sess_' + token, JSON.stringify(user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}), 14400); // 4 horas
26:   return token;
27: }
28: function validateSession(token) {
29:   if (!token || token.length < 20) return false;
30:   return !!CacheService.getScriptCache().get('sess_' + token);
31: }
32: function getSessionUser_(token) {
33:   if (!token || token.length < 20) return null;
34:   var raw = CacheService.getScriptCache().get('sess_' + token);
35:   if (!raw) return null;
36:   if (raw === '1') return {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
37:   try { return JSON.parse(raw); } catch(e) { return {id:'admin', nombre:'Administracion', rol:'Superadministradora'}; }
38: }
39: function isAuxiliaryUser_(user) {
40:   var rol = ('' + (user && user.rol || '')).toLowerCase();
41:   return rol.indexOf('aux') > -1;
42: }
43: function requireAdminOnly_(user, action) {
44:   var ownerOnly = ['changePassword','automationSave','automationSetup','automationRun','automationQueueDone'];
45:   if (isAuxiliaryUser_(user) && ownerOnly.indexOf(action || '') > -1) {
46:     auditTeam_(user, 'Accion exclusiva de propietaria bloqueada', '', '', '', action || '');
47:     return {ok:false,error:'Acción exclusiva de la propietaria'};
48:   }
49:   return null;
50: }
51: 
52: function createProfessionalSession_(pro) {
53:   var token = generateSessionToken();
54:   var payload = {
55:     id: '' + pro.id,
56:     nombre: '' + pro.nombre,
57:     usuario: '' + pro.usuario,
58:     email: '' + pro.email,
59:     rol: '' + (pro.rol || 'Fisioterapeuta'),
60:     debeCambiarPassword: !!pro.debeCambiarPassword
61:   };
62:   CacheService.getScriptCache().put('prosess_' + token, JSON.stringify(payload), 14400);
63:   return token;
64: }
65: function validateProfessionalSession_(token) {
66:   if (!token || token.length < 20) return null;
67:   var raw = CacheService.getScriptCache().get('prosess_' + token);
68:   if (!raw) return null;
69:   try {
70:     CacheService.getScriptCache().put('prosess_' + token, raw, 14400);
71:     return JSON.parse(raw);
72:   } catch(e) {
73:     return null;
74:   }
75: }
76: function hashPassword_(password, salt) {
77:   var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + password, Utilities.Charset.UTF_8);
78:   return bytes.map(function(b) {
79:     var v = (b < 0 ? b + 256 : b).toString(16);
80:     return v.length === 1 ? '0' + v : v;
81:   }).join('');
82: }
83: function makeSalt_() {
84:   return Utilities.getUuid().replace(/-/g, '') + new Date().getTime();
85: }
86: function makeTempPassword_() {
87:   return 'Cuidandote-' + Math.floor(100000 + Math.random() * 900000);
88: }
89: 
90: // â”€â”€ RATE LIMITING LOGIN â”€â”€ mÃ¡x 5 intentos fallidos en 5 minutos (global)
91: function loginAllowed() {
92:   var v = CacheService.getScriptCache().get('login_fails');
```

### Coincidencia 4 — línea 55

```javascript
1: // =============================================================
2: //  Cuidándote Fisioterapia â€” Apps Script Backend
3: //  Funciones: Reservas, Base de datos, Disponibilidad,
4: //             Panel Admin, Recordatorios diarios
5: // =============================================================
6: 
7: // IMPORTANTE: estas variables se leen desde PropertiesService (no estÃ¡n en cÃ³digo).
8: // Para configurarlas: en el editor de Apps Script â†’ Proyecto â†’ Propiedades del script â†’ agrega:
9: //   ADMIN_TOKEN   â†’ tu contraseÃ±a admin (ej: una cadena larga aleatoria)
10: //   GEMINI_API_KEY â†’ tu clave de Gemini AI Studio
11: var _props        = PropertiesService.getScriptProperties();
12: // Sin contraseÃ±a de respaldo en cÃ³digo: ADMIN_TOKEN debe existir en Propiedades del script.
13: var ADMIN_TOKEN   = _props.getProperty('ADMIN_TOKEN')   || '';
14: var GEMINI_API_KEY = _props.getProperty('GEMINI_API_KEY') || '';
15: 
16: // â”€â”€ SESIONES â”€â”€ token UUID almacenado en CacheService (TTL 4 horas)
17: function generateSessionToken() {
18:   var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
19:   var t = '';
20:   for (var i = 0; i < 48; i++) t += chars.charAt(Math.floor(Math.random() * chars.length));
21:   return t;
22: }
23: function createSession(user) {
24:   var token = generateSessionToken();
25:   CacheService.getScriptCache().put('sess_' + token, JSON.stringify(user || {id:'admin', nombre:'Administracion', rol:'Superadministradora'}), 14400); // 4 horas
26:   return token;
27: }
28: function validateSession(token) {
29:   if (!token || token.length < 20) return false;
30:   return !!CacheService.getScriptCache().get('sess_' + token);
31: }
32: function getSessionUser_(token) {
33:   if (!token || token.length < 20) return null;
34:   var raw = CacheService.getScriptCache().get('sess_' + token);
35:   if (!raw) return null;
36:   if (raw === '1') return {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
37:   try { return JSON.parse(raw); } catch(e) { return {id:'admin', nombre:'Administracion', rol:'Superadministradora'}; }
38: }
39: function isAuxiliaryUser_(user) {
40:   var rol = ('' + (user && user.rol || '')).toLowerCase();
41:   return rol.indexOf('aux') > -1;
42: }
43: function requireAdminOnly_(user, action) {
44:   var ownerOnly = ['changePassword','automationSave','automationSetup','automationRun','automationQueueDone'];
45:   if (isAuxiliaryUser_(user) && ownerOnly.indexOf(action || '') > -1) {
46:     auditTeam_(user, 'Accion exclusiva de propietaria bloqueada', '', '', '', action || '');
47:     return {ok:false,error:'Acción exclusiva de la propietaria'};
48:   }
49:   return null;
50: }
51: 
52: function createProfessionalSession_(pro) {
53:   var token = generateSessionToken();
54:   var payload = {
55:     id: '' + pro.id,
56:     nombre: '' + pro.nombre,
57:     usuario: '' + pro.usuario,
58:     email: '' + pro.email,
59:     rol: '' + (pro.rol || 'Fisioterapeuta'),
60:     debeCambiarPassword: !!pro.debeCambiarPassword
61:   };
62:   CacheService.getScriptCache().put('prosess_' + token, JSON.stringify(payload), 14400);
63:   return token;
64: }
65: function validateProfessionalSession_(token) {
66:   if (!token || token.length < 20) return null;
67:   var raw = CacheService.getScriptCache().get('prosess_' + token);
68:   if (!raw) return null;
69:   try {
70:     CacheService.getScriptCache().put('prosess_' + token, raw, 14400);
71:     return JSON.parse(raw);
72:   } catch(e) {
73:     return null;
74:   }
75: }
76: function hashPassword_(password, salt) {
77:   var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + password, Utilities.Charset.UTF_8);
78:   return bytes.map(function(b) {
79:     var v = (b < 0 ? b + 256 : b).toString(16);
80:     return v.length === 1 ? '0' + v : v;
81:   }).join('');
82: }
83: function makeSalt_() {
84:   return Utilities.getUuid().replace(/-/g, '') + new Date().getTime();
85: }
86: function makeTempPassword_() {
87:   return 'Cuidandote-' + Math.floor(100000 + Math.random() * 900000);
88: }
89: 
90: // â”€â”€ RATE LIMITING LOGIN â”€â”€ mÃ¡x 5 intentos fallidos en 5 minutos (global)
91: function loginAllowed() {
92:   var v = CacheService.getScriptCache().get('login_fails');
93:   return !v || parseInt(v, 10) < 5;
94: }
95: function recordLoginFail() {
96:   var cache = CacheService.getScriptCache();
97:   var count = parseInt(cache.get('login_fails') || '0', 10) + 1;
98:   cache.put('login_fails', '' + count, 300); // ventana de 5 minutos
99: }
100: function resetLoginFails() {
101:   CacheService.getScriptCache().remove('login_fails');
102: }
103: var JESSICA_EMAIL = 'jessica.ocampo.ft@gmail.com';
104: var JESSICA_WA    = '573136467945';
105: var SS_NAME       = 'Citas Jessica Ocampo Fisio';
106: 
107: // -------------------------------------------------------------
108: //  GET  â€” Disponibilidad / Datos admin / Acciones admin
109: // -------------------------------------------------------------
110: function doGet(e) {
```

### Coincidencia 5 — línea 143

```javascript
88: }
89: 
90: // â”€â”€ RATE LIMITING LOGIN â”€â”€ mÃ¡x 5 intentos fallidos en 5 minutos (global)
91: function loginAllowed() {
92:   var v = CacheService.getScriptCache().get('login_fails');
93:   return !v || parseInt(v, 10) < 5;
94: }
95: function recordLoginFail() {
96:   var cache = CacheService.getScriptCache();
97:   var count = parseInt(cache.get('login_fails') || '0', 10) + 1;
98:   cache.put('login_fails', '' + count, 300); // ventana de 5 minutos
99: }
100: function resetLoginFails() {
101:   CacheService.getScriptCache().remove('login_fails');
102: }
103: var JESSICA_EMAIL = 'jessica.ocampo.ft@gmail.com';
104: var JESSICA_WA    = '573136467945';
105: var SS_NAME       = 'Citas Jessica Ocampo Fisio';
106: 
107: // -------------------------------------------------------------
108: //  GET  â€” Disponibilidad / Datos admin / Acciones admin
109: // -------------------------------------------------------------
110: function doGet(e) {
111:   var p = e.parameter;
112: 
113:   if (p.test) {
114:     return txt('OK - Calendario: ' + CalendarApp.getDefaultCalendar().getName());
115:   }
116: 
117:   if (p.action === 'availability' && p.date) {
118:     return js(getAvailability(p.date, p.service, p.modality));
119:   }
120: 
121:   // Pasaporte — lectura pública segura (requiere id + token)
122:   if (p.action === 'getPassportSecure') {
123:     return js(getPassportSecure_(p.id, p.token));
124:   }
125:   if (p.action === 'getPassport' && p.nombre) {
126:     return js(getLegacyPassportNotice_());
127:   }
128: 
129:   // ReseÃ±as Google â€” pÃºblico (sin token)
130:   if (p.action === 'getReviews') {
131:     return js(getGoogleReviews());
132:   }
133: 
134:   // Portal del fisioterapeuta â€” protegido por sesiÃ³n profesional.
135:   if (p.action === 'professionalAgenda') {
136:     return js(getProfessionalAgenda_(p.token));
137:   }
138: 
139:   if (!validateSession(p.token)) {
140:     return js({ok: false, error: 'Sin permiso'});
141:   }
142:   // Ventana deslizante: renovar TTL en cada acciÃ³n vÃ¡lida
143:   var sessionUser = getSessionUser_(p.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
144:   CacheService.getScriptCache().put('sess_' + p.token, JSON.stringify(sessionUser), 14400);
145: 
146:   if (p.action === 'ping')          return js({ok: true});
147:   if (p.action === 'adminData')     return js(getAdminData());
148:   if (p.action === 'block')         return js(doBlock(p));
149:   if (p.action === 'unblock')       return js(doUnblock(p));
150:   if (p.action === 'updateStatus')  return js(doUpdateStatus(p, sessionUser));
151:   if (p.action === 'adminBook')     return js(createBooking(JSON.parse(p.data), true));
152:   if (p.action === 'getCalEvents')  return js(getCalendarEvents(p.from, p.to));
153:   if (p.action === 'cancelBooking') return js(doCancelBooking(p.id));
154:   if (p.action === 'editBooking')   return js(doEditBooking(JSON.parse(p.data)));
155:   if (p.action === 'repairRescheduledDuplicate') return js(doRepairRescheduledDuplicate(p));
156:   if (p.action === 'deletePatient')  return js(deletePatient(decodeURIComponent(p.nombre)));
157:   if (p.action === 'editPatient')    return js(editPatient(JSON.parse(p.data)));
158:   if (p.action === 'cleanCitasSinHora') return js(cleanCitasSinHora());
159:   if (p.action === 'cleanInvalidCitaTimes') return js(cleanInvalidCitaTimes());
160:   if (p.action === 'getReminders')   return js(getRemindersData());
161:   if (p.action === 'sendReminders')  return js(sendEmailReminders());
162:   if (p.action === 'getInactivos')   return js(getInactivosData());
163:   if (p.action === 'generateEval')   return js(generateEvalReport(JSON.parse(decodeURIComponent(p.data))));
164:   if (p.action === 'updatePago')     return js(doUpdatePago(p));
165:   if (p.action === 'getAdminKV')     return js(getAdminKV());
166:   if (p.action === 'setAdminKV')     return js(doSetAdminKV(p.data));
167:   if (p.action === 'generarCodigo')  return js(generarCodigo(p));
168:   if (p.action === 'registrarCodigo') return js(registrarCodigo(p));
169:   if (p.action === 'actualizarCodigo') return js(actualizarCodigo(p));
170:   if (p.action === 'getCodigos')     return js(getCodigos());
171:   if (p.action === 'crearEvento')    return js(crearEvento(p));
172:   if (p.action === 'eliminarEvento') return js(eliminarEvento(p));
173:   if (p.action === 'getEncuestaStats')    return js(getEncuestaStats_());
174:   if (p.action === 'autoMarcarAtendidas') return js(autoMarcarAtendidas());
175:   if (p.action === 'expireTemporaryReservations') return js(expireTemporaryReservations_());
176:   if (p.action === 'automationStatus')     return js(getAutomationStatus());
177:   if (p.action === 'automationSave')       { var bo0 = requireAdminOnly_(sessionUser, p.action); if (bo0) return js(bo0); return js(saveAutomationConfig(p.data)); }
178:   if (p.action === 'automationSetup')      { var bo1 = requireAdminOnly_(sessionUser, p.action); if (bo1) return js(bo1); return js(setupAllAutomations()); }
179:   if (p.action === 'automationRun')        { var bo2 = requireAdminOnly_(sessionUser, p.action); if (bo2) return js(bo2); return js(runAutomationNow(p.job || 'morning')); }
180:   if (p.action === 'automationQueue')      return js(getAutomationQueue(p.status || 'pending'));
181:   if (p.action === 'automationQueueDone')  { var bo3 = requireAdminOnly_(sessionUser, p.action); if (bo3) return js(bo3); return js(markAutomationQueueDone(p.id)); }
182:   if (p.action === 'getKPIHistory')        return js(getKPIHistory_());
183:   if (p.action === 'getWaitlist')          return js(getWaitlist());
184:   if (p.action === 'addWaitlist')          return js(addWaitlist(p.data));
185:   if (p.action === 'removeWaitlist')       return js(removeWaitlist(p.id));
186:   if (p.action === 'teamData')             return js(getTeamModuleData_());
187:   if (p.action === 'saveProfessional')     return js(saveProfessional_(p.data, sessionUser));
188:   if (p.action === 'resetProfessionalPassword') return js(resetProfessionalPassword_(p.id, sessionUser));
189:   if (p.action === 'toggleProfessional')   return js(toggleProfessional_(p.id, p.estado, sessionUser));
190:   if (p.action === 'deleteProfessional')   return js(deleteProfessional_(p.id, sessionUser));
191:   if (p.action === 'assignProfessional')   return js(assignProfessionalToAppointment_(p));
192:   if (p.action === 'authorizeAppointment') return js(authorizeAppointmentForProfessional_(p));
193:   if (p.action === 'authorizeCourtesy')     return js(authorizeCourtesy_(p, sessionUser));
194:   if (p.action === 'createCreditBalance')   return js(createCreditBalance_(p, sessionUser));
195:   if (p.action === 'applyCreditBalance')    return js(applyCreditBalance_(p, sessionUser));
196:   if (p.action === 'markPayablePaid')      return js(markProfessionalPayablePaid_(p.id, sessionUser));
197:   if (p.action === 'setupOperationsModule') return js(setupOperationsModule_());
198:   if (p.action === 'operationsData')        return js(getOperationsData_());
```

### Coincidencia 6 — línea 248

```javascript
193:   if (p.action === 'authorizeCourtesy')     return js(authorizeCourtesy_(p, sessionUser));
194:   if (p.action === 'createCreditBalance')   return js(createCreditBalance_(p, sessionUser));
195:   if (p.action === 'applyCreditBalance')    return js(applyCreditBalance_(p, sessionUser));
196:   if (p.action === 'markPayablePaid')      return js(markProfessionalPayablePaid_(p.id, sessionUser));
197:   if (p.action === 'setupOperationsModule') return js(setupOperationsModule_());
198:   if (p.action === 'operationsData')        return js(getOperationsData_());
199:   if (p.action === 'dailyOpsData')          return js(getDailyOperationsData_(p.date, p.mode));
200:   if (p.action === 'saveDailyPreparation')  return js(saveDailyPreparation_(p.data, sessionUser));
201:   if (p.action === 'logDailyReminder')      return js(logDailyReminder_(p, sessionUser));
202:   if (p.action === 'addDailyObservation')   return js(addDailyObservation_(p, sessionUser));
203:   if (p.action === 'simulateStateMigration') return js(simulateStateMigration_());
204:   if (p.action === 'backupStateMigrationSheets') return js(backupStateMigrationSheets_());
205:   if (p.action === 'savePayment')           return js(savePayment_(p.data, sessionUser));
206:   if (p.action === 'verifyPayment')         return js(verifyPayment_(p, sessionUser));
207:   if (p.action === 'savePaymentAccount')    return js(savePaymentAccount_(p.data, sessionUser));
208:   if (p.action === 'passportAdminList')      return js(passportAdminList_());
209:   if (p.action === 'passportEnsure')         return js(passportEnsure_(decodeURIComponent(p.nombre || ''), p.telefono || '', sessionUser));
210:   if (p.action === 'passportSaveProgress')   return js(passportSaveProgress_(p.id, p.passport || '{}', p.descarga || '{}', sessionUser));
211:   if (p.action === 'passportRegenerateToken') return js(passportRegenerateToken_(p.id, sessionUser));
212:   if (p.action === 'passportDeactivate')     return js(passportDeactivate_(p.id, sessionUser));
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
```

### Coincidencia 7 — línea 260

```javascript
205:   if (p.action === 'savePayment')           return js(savePayment_(p.data, sessionUser));
206:   if (p.action === 'verifyPayment')         return js(verifyPayment_(p, sessionUser));
207:   if (p.action === 'savePaymentAccount')    return js(savePaymentAccount_(p.data, sessionUser));
208:   if (p.action === 'passportAdminList')      return js(passportAdminList_());
209:   if (p.action === 'passportEnsure')         return js(passportEnsure_(decodeURIComponent(p.nombre || ''), p.telefono || '', sessionUser));
210:   if (p.action === 'passportSaveProgress')   return js(passportSaveProgress_(p.id, p.passport || '{}', p.descarga || '{}', sessionUser));
211:   if (p.action === 'passportRegenerateToken') return js(passportRegenerateToken_(p.id, sessionUser));
212:   if (p.action === 'passportDeactivate')     return js(passportDeactivate_(p.id, sessionUser));
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
```

### Coincidencia 8 — línea 263

```javascript
208:   if (p.action === 'passportAdminList')      return js(passportAdminList_());
209:   if (p.action === 'passportEnsure')         return js(passportEnsure_(decodeURIComponent(p.nombre || ''), p.telefono || '', sessionUser));
210:   if (p.action === 'passportSaveProgress')   return js(passportSaveProgress_(p.id, p.passport || '{}', p.descarga || '{}', sessionUser));
211:   if (p.action === 'passportRegenerateToken') return js(passportRegenerateToken_(p.id, sessionUser));
212:   if (p.action === 'passportDeactivate')     return js(passportDeactivate_(p.id, sessionUser));
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
```

### Coincidencia 9 — línea 268

```javascript
213:   if (p.action === 'passportReactivate')     return js(passportReactivate_(p.id, sessionUser));
214:   if (p.action === 'passportBackupMigrate')  return js(passportBackupAndMigrate_());
215:   if (p.action === 'savePassport')           return js({ok:false,error:'Acción retirada: usa passportSaveProgress con sesión administrativa.'});
216: 
217:   return txt('Cuidándote Fisioterapia - Sistema activo');
218: }
219: 
220: // -------------------------------------------------------------
221: //  POST â€” Reservas de pacientes + EvaluaciÃ³n Express con fotos
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
```

### Coincidencia 10 — línea 277

```javascript
222: // -------------------------------------------------------------
223: function doPost(e) {
224:   try {
225:     var d = JSON.parse(e.postData.contents);
226:     if (d.action === 'professionalLogin') {
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
331:   if (soloRegistro) {
332:     upsertPaciente(d.name, d.phone, d.email);
```

### Coincidencia 11 — línea 282

```javascript
227:       return js(professionalLogin_(d.user, d.password));
228:     }
229:     if (d.action === 'professionalChangePassword') {
230:       return js(professionalChangePassword_(d.token, d.currentPassword, d.newPassword));
231:     }
232:     if (d.action === 'professionalMarkAttended') {
233:       return js(professionalMarkAttended_(d.token, d.citaId));
234:     }
235:     if (d.action === 'professionalReportIssue') {
236:       return js(professionalReportIssue_(d.token, d.citaId, d.tipo, d.observacion));
237:     }
238:     if (d.action === 'adminLogin') {
239:       if (!loginAllowed()) return js({ok: false, error: 'Demasiados intentos fallidos. Espera 5 minutos.'});
240:       var loginUser = ('' + (d.user || '')).trim();
241:       if (loginUser) {
242:         var pro = getProfessionalByLogin_(loginUser);
243:         if (!pro || pro.estado !== 'Activo' || !d.password || hashPassword_(d.password, pro.salt) !== pro.passwordHash || !isAuxiliaryUser_(pro)) {
244:           recordLoginFail();
245:           return js({ok:false,error:'Credenciales incorrectas o usuario sin permisos de auxiliar'});
246:         }
247:         resetLoginFails();
248:         var auxUser = {id:pro.id,nombre:pro.nombre,usuario:pro.usuario,email:pro.email,rol:pro.rol};
249:         var auxToken = createSession(auxUser);
250:         var auxData = getAdminData();
251:         auxData.sessionToken = auxToken;
252:         auxData.currentUser = auxUser;
253:         return js(auxData);
254:       }
255:       if (!d.password || d.password !== ADMIN_TOKEN) {
256:         recordLoginFail();
257:         return js({ok: false, error: 'Credenciales incorrectas'});
258:       }
259:       resetLoginFails();
260:       var sessionToken = createSession({id:'admin', nombre:'Administracion', rol:'Superadministradora'});
261:       var adminData = getAdminData();
262:       adminData.sessionToken = sessionToken;
263:       adminData.currentUser = {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
264:       return js(adminData);
265:     }
266:     if (d.action === 'changePassword') {
267:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
268:       var changeUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
269:       var changeBlocked = requireAdminOnly_(changeUser, d.action); if (changeBlocked) return js(changeBlocked);
270:       if (!d.currentPassword || d.currentPassword !== ADMIN_TOKEN) return js({ok: false, error: 'La contraseÃ±a actual es incorrecta.'});
271:       if (!d.newPassword || d.newPassword.length < 8) return js({ok: false, error: 'La nueva contraseÃ±a debe tener al menos 8 caracteres.'});
272:       PropertiesService.getScriptProperties().setProperty('ADMIN_TOKEN', d.newPassword);
273:       return js({ok: true});
274:     }
275:     if (d.action === 'savePayment') {
276:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
277:       var postUser = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
331:   if (soloRegistro) {
332:     upsertPaciente(d.name, d.phone, d.email);
333:     return {ok: true, id: 'REG-' + new Date().getTime()};
334:   }
335: 
336:   // Lock para evitar duplicados por peticiones simultÃ¡neas (race condition)
337:   var lock = LockService.getScriptLock();
```

### Coincidencia 12 — línea 333

```javascript
278:       return js(savePayment_(d.data || {}, postUser));
279:     }
280:     if (d.action === 'verifyPayment') {
281:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
282:       var postUser2 = getSessionUser_(d.token) || {id:'admin', nombre:'Administracion', rol:'Superadministradora'};
283:       var bp2 = requireAdminOnly_(postUser2, d.action); if (bp2) return js(bp2);
284:       return js(verifyPayment_(d, postUser2));
285:     }
286:     if (d.action === 'generateEval') {
287:       if (!validateSession(d.token)) return js({ok: false, error: 'Sin permiso'});
288:       return js(generateEvalReport(d.data, d.photos || {}));
289:     }
290:     return js(createBooking(d, false));
291:   } catch(err) {
292:     try { GmailApp.sendEmail(JESSICA_EMAIL, 'ERROR formulario citas', 'Error: ' + err.message + '\n\nDatos: ' + e.postData.contents); } catch(x) {}
293:     return js({ok: false, error: err.message});
294:   }
295: }
296: 
297: // -------------------------------------------------------------
298: //  CREAR RESERVA
299: // -------------------------------------------------------------
300: // Servicios que son solo registro de paciente â€” NO crean cita en Google Calendar
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
331:   if (soloRegistro) {
332:     upsertPaciente(d.name, d.phone, d.email);
333:     return {ok: true, id: 'REG-' + new Date().getTime()};
334:   }
335: 
336:   // Lock para evitar duplicados por peticiones simultÃ¡neas (race condition)
337:   var lock = LockService.getScriptLock();
338:   try { lock.waitLock(15000); } catch(e) { return {ok: false, error: 'Sistema ocupado, intenta de nuevo'}; }
339: 
340:   try {
341:   var price = d.priceSelected || (d.modality === 'Domicilio'
342:     ? d.priceD
343:     : (d.modality === 'Sede Campestre Recovery' ? (d.priceRecovery || d.priceP) : d.priceP));
344: 
345:   // Dedup: si ya existe una cita con mismo nombre+fecha+hora, devolver la existente
346:   var ss     = getOrCreateSheet();
347:   var cSheet = ss.getSheetByName('Citas');
348:   var cRows  = cSheet.getDataRange().getValues();
349:   var nameNorm = (d.name || '').toLowerCase().trim();
350:   for (var i = 1; i < cRows.length; i++) {
351:     var rowName   = ('' + (cRows[i][2]  || '')).toLowerCase().trim();
352:     var rowDate   = sd(cRows[i][7]);
353:     var rowTime   = st(cRows[i][8]);
354:     var rowStatus = ('' + (cRows[i][10] || '')).trim();
355:     if (rowName === nameNorm && rowDate === d.date && rowTime === d.time && rowStatus !== 'Cancelada') {
356:       return {ok: true, id: cRows[i][0]};
357:     }
358:   }
359: 
360:   // Crear evento en Google Calendar
361:   var cal   = CalendarApp.getDefaultCalendar();
362:   var start = parseDT(d.date, d.time);
363:   var mins  = getServiceDuration(d.service) + (d.modality === 'Domicilio' ? 30 : 0);
364:   var end   = new Date(start.getTime() + mins * 60000);
365:   var event = cal.createEvent('[CITA] ' + d.service + ' - ' + d.name, start, end, {
366:     description: buildDesc(d, price),
367:     location: d.modality === 'Domicilio'
368:       ? (d.address || 'Domicilio - direccion por confirmar')
369:       : (d.modality === 'Sede Campestre Recovery'
370:         ? 'Sede Campestre Recovery - ubicacion compartida al confirmar'
371:         : 'Ubicacion compartida al confirmar la reserva')
372:   });
373:   event.addEmailReminder(60);
374:   event.addPopupReminder(30);
375: 
376:   // Guardar en Google Sheets (solo citas reales)
377:   var clientTs = Number(d.clientTimestamp || 0);
378:   var id    = 'C' + (clientTs > 0 ? clientTs : new Date().getTime());
379:   var phoneClean = ('' + (d.phone||'')).replace(/\D/g,'');
380:   var rawAdminNote = '' + (d.notaAdmin || '');
381:   var codeNote = d.codigoReserva && rawAdminNote.indexOf(d.codigoReserva) === -1 ? '[CODIGO RESERVA: ' + d.codigoReserva + ']' : '';
382:   var adminNote = [rawAdminNote, codeNote].filter(Boolean).join(' ');
383:   cSheet.appendRow([
384:     id,
385:     new Date().toLocaleString('es-CO'),
386:     d.name, phoneClean, d.email,
387:     d.service, d.modality,
388:     d.date, d.time, price,
```

### Coincidencia 13 — línea 356

```javascript
301: var SERVICIOS_SOLO_REGISTRO = ['Registro', 'Registro paciente', 'Registro de paciente'];
302: 
303: function esRegistro(servicio) {
304:   if (!servicio) return false;
305:   var s = servicio.trim().toLowerCase();
306:   for (var i = 0; i < SERVICIOS_SOLO_REGISTRO.length; i++) {
307:     if (s === SERVICIOS_SOLO_REGISTRO[i].toLowerCase()) return true;
308:   }
309:   return s.indexOf('registro') === 0; // cualquier cosa que empiece con "Registro"
310: }
311: 
312: function createBooking(d, isAdmin) {
313:   ensureCitasStateColumns_();
314:   if (isMidnightBookingTime_(d.time)) {
315:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
316:   }
317:   var scheduleCheck = isAdmin
318:     ? validateBookingSchedule_(d.date, d.time, d.service, d.modality)
319:     : validatePublicBookingSchedule_(d.date, d.time, d.service, d.modality);
320:   if (!scheduleCheck.ok) {
321:     return {ok: false, error: scheduleCheck.error};
322:   }
323:   if (!isAdmin) {
324:     var avail = checkAvailability(d.date, d.time, d.modality, d.service);
325:     if (!avail.available) return {ok: false, error: avail.reason};
326:   }
327: 
328:   var soloRegistro = esRegistro(d.service);
329: 
330:   // Para registros de paciente: solo guardar en hoja Pacientes (upsertPaciente ya deduplica)
331:   if (soloRegistro) {
332:     upsertPaciente(d.name, d.phone, d.email);
333:     return {ok: true, id: 'REG-' + new Date().getTime()};
334:   }
335: 
336:   // Lock para evitar duplicados por peticiones simultÃ¡neas (race condition)
337:   var lock = LockService.getScriptLock();
338:   try { lock.waitLock(15000); } catch(e) { return {ok: false, error: 'Sistema ocupado, intenta de nuevo'}; }
339: 
340:   try {
341:   var price = d.priceSelected || (d.modality === 'Domicilio'
342:     ? d.priceD
343:     : (d.modality === 'Sede Campestre Recovery' ? (d.priceRecovery || d.priceP) : d.priceP));
344: 
345:   // Dedup: si ya existe una cita con mismo nombre+fecha+hora, devolver la existente
346:   var ss     = getOrCreateSheet();
347:   var cSheet = ss.getSheetByName('Citas');
348:   var cRows  = cSheet.getDataRange().getValues();
349:   var nameNorm = (d.name || '').toLowerCase().trim();
350:   for (var i = 1; i < cRows.length; i++) {
351:     var rowName   = ('' + (cRows[i][2]  || '')).toLowerCase().trim();
352:     var rowDate   = sd(cRows[i][7]);
353:     var rowTime   = st(cRows[i][8]);
354:     var rowStatus = ('' + (cRows[i][10] || '')).trim();
355:     if (rowName === nameNorm && rowDate === d.date && rowTime === d.time && rowStatus !== 'Cancelada') {
356:       return {ok: true, id: cRows[i][0]};
357:     }
358:   }
359: 
360:   // Crear evento en Google Calendar
361:   var cal   = CalendarApp.getDefaultCalendar();
362:   var start = parseDT(d.date, d.time);
363:   var mins  = getServiceDuration(d.service) + (d.modality === 'Domicilio' ? 30 : 0);
364:   var end   = new Date(start.getTime() + mins * 60000);
365:   var event = cal.createEvent('[CITA] ' + d.service + ' - ' + d.name, start, end, {
366:     description: buildDesc(d, price),
367:     location: d.modality === 'Domicilio'
368:       ? (d.address || 'Domicilio - direccion por confirmar')
369:       : (d.modality === 'Sede Campestre Recovery'
370:         ? 'Sede Campestre Recovery - ubicacion compartida al confirmar'
371:         : 'Ubicacion compartida al confirmar la reserva')
372:   });
373:   event.addEmailReminder(60);
374:   event.addPopupReminder(30);
375: 
376:   // Guardar en Google Sheets (solo citas reales)
377:   var clientTs = Number(d.clientTimestamp || 0);
378:   var id    = 'C' + (clientTs > 0 ? clientTs : new Date().getTime());
379:   var phoneClean = ('' + (d.phone||'')).replace(/\D/g,'');
380:   var rawAdminNote = '' + (d.notaAdmin || '');
381:   var codeNote = d.codigoReserva && rawAdminNote.indexOf(d.codigoReserva) === -1 ? '[CODIGO RESERVA: ' + d.codigoReserva + ']' : '';
382:   var adminNote = [rawAdminNote, codeNote].filter(Boolean).join(' ');
383:   cSheet.appendRow([
384:     id,
385:     new Date().toLocaleString('es-CO'),
386:     d.name, phoneClean, d.email,
387:     d.service, d.modality,
388:     d.date, d.time, price,
389:     isAdmin ? (start < new Date() ? 'Atendida' : 'Confirmada') : 'Pendiente de pago',
390:     d.address || '', d.notes || '', adminNote
391:   ]);
392:   var stateMap = ensureCitasStateColumns_();
393:   var lastRow = cSheet.getLastRow();
394:   var initialPaymentStatus = PAYMENT_STATUS.PENDIENTE_PAGO;
395:   var initialAppointmentStatus = APPOINTMENT_STATUS.RESERVADA;
396:   var reservationHoldMinutes = Number(operationConfigValue_('reserva_temporal_minutos', '60')) || 60;
397:   var reservationExpiresAt = new Date(new Date().getTime() + reservationHoldMinutes * 60000);
398:   cSheet.getRange(lastRow, stateMap.EstadoPago).setValue(initialPaymentStatus);
399:   cSheet.getRange(lastRow, stateMap.EstadoCita).setValue(initialAppointmentStatus);
400:   cSheet.getRange(lastRow, stateMap.EstadoMigracionOrigen).setValue(isAdmin ? 'CREADA_ADMIN' : 'RESERVA_PUBLICA');
401:   cSheet.getRange(lastRow, stateMap.FechaMigracionEstado).setValue(new Date());
402:   if (stateMap.VenceReserva) cSheet.getRange(lastRow, stateMap.VenceReserva).setValue(isAdmin ? '' : reservationExpiresAt);
403:   // Forzar columna Telefono como texto para evitar #ERROR! en Sheets
404:   cSheet.getRange(lastRow, 4).setNumberFormat('@').setValue(phoneClean);
405: 
406:   // Guardar/actualizar paciente en hoja Pacientes
407:   upsertPaciente(d.name, d.phone, d.email);
408: 
409:   // No enviar correos cuando la cita la crea el admin
410:   if (isAdmin) return {ok: true, id: id};
411: 
```

### Coincidencia 14 — línea 410

```javascript
355:     if (rowName === nameNorm && rowDate === d.date && rowTime === d.time && rowStatus !== 'Cancelada') {
356:       return {ok: true, id: cRows[i][0]};
357:     }
358:   }
359: 
360:   // Crear evento en Google Calendar
361:   var cal   = CalendarApp.getDefaultCalendar();
362:   var start = parseDT(d.date, d.time);
363:   var mins  = getServiceDuration(d.service) + (d.modality === 'Domicilio' ? 30 : 0);
364:   var end   = new Date(start.getTime() + mins * 60000);
365:   var event = cal.createEvent('[CITA] ' + d.service + ' - ' + d.name, start, end, {
366:     description: buildDesc(d, price),
367:     location: d.modality === 'Domicilio'
368:       ? (d.address || 'Domicilio - direccion por confirmar')
369:       : (d.modality === 'Sede Campestre Recovery'
370:         ? 'Sede Campestre Recovery - ubicacion compartida al confirmar'
371:         : 'Ubicacion compartida al confirmar la reserva')
372:   });
373:   event.addEmailReminder(60);
374:   event.addPopupReminder(30);
375: 
376:   // Guardar en Google Sheets (solo citas reales)
377:   var clientTs = Number(d.clientTimestamp || 0);
378:   var id    = 'C' + (clientTs > 0 ? clientTs : new Date().getTime());
379:   var phoneClean = ('' + (d.phone||'')).replace(/\D/g,'');
380:   var rawAdminNote = '' + (d.notaAdmin || '');
381:   var codeNote = d.codigoReserva && rawAdminNote.indexOf(d.codigoReserva) === -1 ? '[CODIGO RESERVA: ' + d.codigoReserva + ']' : '';
382:   var adminNote = [rawAdminNote, codeNote].filter(Boolean).join(' ');
383:   cSheet.appendRow([
384:     id,
385:     new Date().toLocaleString('es-CO'),
386:     d.name, phoneClean, d.email,
387:     d.service, d.modality,
388:     d.date, d.time, price,
389:     isAdmin ? (start < new Date() ? 'Atendida' : 'Confirmada') : 'Pendiente de pago',
390:     d.address || '', d.notes || '', adminNote
391:   ]);
392:   var stateMap = ensureCitasStateColumns_();
393:   var lastRow = cSheet.getLastRow();
394:   var initialPaymentStatus = PAYMENT_STATUS.PENDIENTE_PAGO;
395:   var initialAppointmentStatus = APPOINTMENT_STATUS.RESERVADA;
396:   var reservationHoldMinutes = Number(operationConfigValue_('reserva_temporal_minutos', '60')) || 60;
397:   var reservationExpiresAt = new Date(new Date().getTime() + reservationHoldMinutes * 60000);
398:   cSheet.getRange(lastRow, stateMap.EstadoPago).setValue(initialPaymentStatus);
399:   cSheet.getRange(lastRow, stateMap.EstadoCita).setValue(initialAppointmentStatus);
400:   cSheet.getRange(lastRow, stateMap.EstadoMigracionOrigen).setValue(isAdmin ? 'CREADA_ADMIN' : 'RESERVA_PUBLICA');
401:   cSheet.getRange(lastRow, stateMap.FechaMigracionEstado).setValue(new Date());
402:   if (stateMap.VenceReserva) cSheet.getRange(lastRow, stateMap.VenceReserva).setValue(isAdmin ? '' : reservationExpiresAt);
403:   // Forzar columna Telefono como texto para evitar #ERROR! en Sheets
404:   cSheet.getRange(lastRow, 4).setNumberFormat('@').setValue(phoneClean);
405: 
406:   // Guardar/actualizar paciente en hoja Pacientes
407:   upsertPaciente(d.name, d.phone, d.email);
408: 
409:   // No enviar correos cuando la cita la crea el admin
410:   if (isAdmin) return {ok: true, id: id};
411: 
412:   // Para citas reales: enviar todos los correos y WhatsApp
413:   var tel  = (d.phone || '').replace(/\D/g,'');
414:   if (tel.length <= 10) tel = '57' + tel;
415:   var _waDias = ['domingo','lunes','martes','miÃ©rcoles','jueves','viernes','sÃ¡bado'];
416:   var _waMeses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
417:   var _waDP = d.date.split('-');
418:   var _waFechaObj = new Date(+_waDP[0], +_waDP[1]-1, +_waDP[2]);
419:   var _waFecha = _waDias[_waFechaObj.getDay()] + ' ' + +_waDP[2] + ' de ' + _waMeses[+_waDP[1]-1];
420:   var waConfirm = 'Reserva temporal creada, ' + d.name.split(' ')[0] + '.\n\n' +
421:     d.service + '\n' +
422:     _waFecha + ' Â· ' + d.time + ' Â· ' + d.modality + '\n' +
423:     'Codigo de reserva: ' + (d.codigoReserva || reservationCodeFor_(id, d.date)) + '\n' +
424:     'Valor: ' + price + '\n\n' +
425:     'Para confirmar tu cita debes realizar el pago anticipado y enviar el comprobante. La cita queda autorizada solo cuando administracion confirme el pago.\n' +
426:     'Cuidandote Fisioterapia';
427:   var waLink = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(waConfirm);
428: 
429:   GmailApp.sendEmail(
430:     JESSICA_EMAIL,
431:     'Nueva cita: ' + d.name + ' - ' + d.service + ' | ' + d.date,
432:     buildEmailJessica(d, price) + '\n\n>> Confirmar al paciente por WhatsApp (1 clic):\n' + waLink + '\n\nID cita: ' + id
433:   );
434: 
435:   if (d.email && d.email.indexOf('@') > 0) {
436:     GmailApp.sendEmail(
437:       d.email,
438:       'Reserva temporal creada - Cuidandote Fisioterapia',
439:       'Tu horario quedo reservado temporalmente. Para confirmar la cita debes realizar el pago anticipado y enviar el comprobante.',
440:       {htmlBody: buildEmailCliente(d, price), name: 'Cuidándote Fisioterapia'}
441:     );
442:   }
443: 
444:   return {ok: true, id: id};
445:   } finally {
446:     lock.releaseLock();
447:   }
448: }
449: 
450: // -------------------------------------------------------------
451: //  HELPERS: normaliza valores que Sheets convierte a Date/numero
452: // -------------------------------------------------------------
453: function sd(v) {
454:   if (!v) return '';
455:   if (v instanceof Date) return fmtDate(v);
456:   return ('' + v).split('T')[0];
457: }
458: function st(v) {
459:   if (!v && v !== 0) return '00:00';
460:   if (v instanceof Date) return pad(v.getHours()) + ':' + pad(v.getMinutes());
461:   if (typeof v === 'number') {
462:     var h = Math.floor(v * 24);
463:     var m = Math.round((v * 24 - h) * 60);
464:     return pad(h) + ':' + pad(m);
465:   }
```

### Coincidencia 15 — línea 444

```javascript
389:     isAdmin ? (start < new Date() ? 'Atendida' : 'Confirmada') : 'Pendiente de pago',
390:     d.address || '', d.notes || '', adminNote
391:   ]);
392:   var stateMap = ensureCitasStateColumns_();
393:   var lastRow = cSheet.getLastRow();
394:   var initialPaymentStatus = PAYMENT_STATUS.PENDIENTE_PAGO;
395:   var initialAppointmentStatus = APPOINTMENT_STATUS.RESERVADA;
396:   var reservationHoldMinutes = Number(operationConfigValue_('reserva_temporal_minutos', '60')) || 60;
397:   var reservationExpiresAt = new Date(new Date().getTime() + reservationHoldMinutes * 60000);
398:   cSheet.getRange(lastRow, stateMap.EstadoPago).setValue(initialPaymentStatus);
399:   cSheet.getRange(lastRow, stateMap.EstadoCita).setValue(initialAppointmentStatus);
400:   cSheet.getRange(lastRow, stateMap.EstadoMigracionOrigen).setValue(isAdmin ? 'CREADA_ADMIN' : 'RESERVA_PUBLICA');
401:   cSheet.getRange(lastRow, stateMap.FechaMigracionEstado).setValue(new Date());
402:   if (stateMap.VenceReserva) cSheet.getRange(lastRow, stateMap.VenceReserva).setValue(isAdmin ? '' : reservationExpiresAt);
403:   // Forzar columna Telefono como texto para evitar #ERROR! en Sheets
404:   cSheet.getRange(lastRow, 4).setNumberFormat('@').setValue(phoneClean);
405: 
406:   // Guardar/actualizar paciente en hoja Pacientes
407:   upsertPaciente(d.name, d.phone, d.email);
408: 
409:   // No enviar correos cuando la cita la crea el admin
410:   if (isAdmin) return {ok: true, id: id};
411: 
412:   // Para citas reales: enviar todos los correos y WhatsApp
413:   var tel  = (d.phone || '').replace(/\D/g,'');
414:   if (tel.length <= 10) tel = '57' + tel;
415:   var _waDias = ['domingo','lunes','martes','miÃ©rcoles','jueves','viernes','sÃ¡bado'];
416:   var _waMeses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
417:   var _waDP = d.date.split('-');
418:   var _waFechaObj = new Date(+_waDP[0], +_waDP[1]-1, +_waDP[2]);
419:   var _waFecha = _waDias[_waFechaObj.getDay()] + ' ' + +_waDP[2] + ' de ' + _waMeses[+_waDP[1]-1];
420:   var waConfirm = 'Reserva temporal creada, ' + d.name.split(' ')[0] + '.\n\n' +
421:     d.service + '\n' +
422:     _waFecha + ' Â· ' + d.time + ' Â· ' + d.modality + '\n' +
423:     'Codigo de reserva: ' + (d.codigoReserva || reservationCodeFor_(id, d.date)) + '\n' +
424:     'Valor: ' + price + '\n\n' +
425:     'Para confirmar tu cita debes realizar el pago anticipado y enviar el comprobante. La cita queda autorizada solo cuando administracion confirme el pago.\n' +
426:     'Cuidandote Fisioterapia';
427:   var waLink = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(waConfirm);
428: 
429:   GmailApp.sendEmail(
430:     JESSICA_EMAIL,
431:     'Nueva cita: ' + d.name + ' - ' + d.service + ' | ' + d.date,
432:     buildEmailJessica(d, price) + '\n\n>> Confirmar al paciente por WhatsApp (1 clic):\n' + waLink + '\n\nID cita: ' + id
433:   );
434: 
435:   if (d.email && d.email.indexOf('@') > 0) {
436:     GmailApp.sendEmail(
437:       d.email,
438:       'Reserva temporal creada - Cuidandote Fisioterapia',
439:       'Tu horario quedo reservado temporalmente. Para confirmar la cita debes realizar el pago anticipado y enviar el comprobante.',
440:       {htmlBody: buildEmailCliente(d, price), name: 'Cuidándote Fisioterapia'}
441:     );
442:   }
443: 
444:   return {ok: true, id: id};
445:   } finally {
446:     lock.releaseLock();
447:   }
448: }
449: 
450: // -------------------------------------------------------------
451: //  HELPERS: normaliza valores que Sheets convierte a Date/numero
452: // -------------------------------------------------------------
453: function sd(v) {
454:   if (!v) return '';
455:   if (v instanceof Date) return fmtDate(v);
456:   return ('' + v).split('T')[0];
457: }
458: function st(v) {
459:   if (!v && v !== 0) return '00:00';
460:   if (v instanceof Date) return pad(v.getHours()) + ':' + pad(v.getMinutes());
461:   if (typeof v === 'number') {
462:     var h = Math.floor(v * 24);
463:     var m = Math.round((v * 24 - h) * 60);
464:     return pad(h) + ':' + pad(m);
465:   }
466:   return '' + v;
467: }
468: 
469: function isMidnightBookingTime_(time) {
470:   var value = st(time);
471:   var parts = ('' + value).split(':');
472:   if (parts.length < 2) return false;
473:   var h = parseInt(parts[0], 10);
474:   var m = parseInt(parts[1], 10);
475:   return h === 0 && m >= 0 && m <= 59;
476: }
477: 
478: // -------------------------------------------------------------
479: //  DISPONIBILIDAD â€” lee Sheets + Calendario UNA sola vez
480: // -------------------------------------------------------------
481: function minutesFromTime_(time) {
482:   var t = ('' + time).split(':');
483:   return (parseInt(t[0], 10) || 0) * 60 + (parseInt(t[1], 10) || 0);
484: }
485: 
486: function timeFromMinutes_(mins) {
487:   var h = Math.floor(mins / 60), m = mins % 60;
488:   return pad(h) + ':' + pad(m);
489: }
490: 
491: function publicScheduleRanges_(date) {
492:   var dp = date.split('-');
493:   var d = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
494:   var ranges = {
495:     0: [],
496:     1: [['08:00','16:30']],
497:     2: [['08:00','17:00']],
498:     3: [['08:00','17:00']],
499:     4: [['08:00','20:00']],
```

### Coincidencia 16 — línea 785

```javascript
730:   var sheet = getOrCreateSheet().getSheetByName('Citas');
731:   var rows  = sheet.getDataRange().getValues();
732:   for (var i = 1; i < rows.length; i++) {
733:     if (rows[i][0] === p.id) {
734:       sheet.getRange(i+1, 15).setValue(p.metodo || '');
735:       return {ok: true};
736:     }
737:   }
738:   return {ok: false, error: 'Cita no encontrada'};
739: }
740: 
741: function doUpdateStatus(p) {
742:   var sheet = getOrCreateSheet().getSheetByName('Citas');
743:   var rows  = sheet.getDataRange().getValues();
744:   for (var i = 1; i < rows.length; i++) {
745:     if (rows[i][0] === p.id) {
746:       sheet.getRange(i+1, 11).setValue(p.status);
747:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
748:       return {ok: true};
749:     }
750:   }
751:   return {ok: false, error: 'Cita no encontrada'};
752: }
753: 
754: // Devuelve eventos personales del Google Calendar (no citas) para un rango de fechas
755: function getCalendarEvents(from, to) {
756:   try {
757:     var dp1 = from.split('-'), dp2 = to.split('-');
758:     var start = new Date(+dp1[0], +dp1[1]-1, +dp1[2], 0, 0, 0);
759:     var end   = new Date(+dp2[0], +dp2[1]-1, +dp2[2], 23, 59, 59);
760:     var events = [];
761:     CalendarApp.getDefaultCalendar().getEvents(start, end).forEach(function(ev) {
762:       if (ev.getTitle().indexOf('[CITA]') === 0) return; // omitir citas del sistema
763:       if (ev.isAllDayEvent()) {
764:         events.push({title: ev.getTitle(), fecha: fmtDate(ev.getStartTime()), hora: 'Todo el dÃ­a', allDay: true});
765:       } else {
766:         events.push({
767:           title:   ev.getTitle(),
768:           fecha:   fmtDate(ev.getStartTime()),
769:           hora:    pad(ev.getStartTime().getHours()) + ':' + pad(ev.getStartTime().getMinutes()),
770:           horaFin: pad(ev.getEndTime().getHours())   + ':' + pad(ev.getEndTime().getMinutes()),
771:           allDay:  false
772:         });
773:       }
774:     });
775:     return {ok: true, events: events};
776:   } catch(x) { return {ok: false, error: x.message, events: []}; }
777: }
778: 
779: // Cancela la cita y elimina el evento del Google Calendar
780: function doCancelBooking(id) {
781:   var ss   = getOrCreateSheet();
782:   var rows = ss.getSheetByName('Citas').getDataRange().getValues();
783:   var booking = null;
784:   for (var i = 1; i < rows.length; i++) { if (rows[i][0] === id) { booking = rows[i]; break; } }
785:   var result = doUpdateStatus({id: id, status: 'Cancelada'});
786:   if (!result.ok) return result;
787:   if (booking) {
788:     try {
789:       var fecha = sd(booking[7]);
790:       var dp = fecha.split('-');
791:       var dayStart = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
792:       var dayEnd   = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
793:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayStart, dayEnd);
794:       for (var k = 0; k < calEvs.length; k++) {
795:         var t = calEvs[k].getTitle() || '';
796:         if (t.indexOf('[CITA]') === 0 && t.indexOf(booking[2]) > -1) { calEvs[k].deleteEvent(); break; }
797:       }
798:     } catch(x) {}
799:   }
800:   var queued = 0;
801:   if (booking) {
802:     try { queued = queueWaitlistMatch_({id:id,nombre:booking[2],servicio:booking[5],fecha:sd(booking[7]),hora:st(booking[8])}); } catch(qx) {}
803:   }
804:   return {ok: true, waitlistQueued: queued};
805: }
806: 
807: // Edita una cita existente en Sheets y actualiza el evento del Calendar
808: function doEditBooking(d) {
809:   if (d.hora && isMidnightBookingTime_(d.hora)) {
810:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
811:   }
812:   var sheet = getOrCreateSheet().getSheetByName('Citas');
813:   var rows  = sheet.getDataRange().getValues();
814:   for (var i = 1; i < rows.length; i++) {
815:     if (rows[i][0] !== d.id) continue;
816:     var oldFecha = sd(rows[i][7]);
817:     var oldHora  = st(rows[i][8]);
818:     var newServicio  = d.servicio  || rows[i][5];
819:     var newModalidad = d.modalidad || rows[i][6];
820:     var newFecha     = d.fecha     || oldFecha;
821:     var newHora      = d.hora      || oldHora;
822:     var newPrecio    = d.precio    || rows[i][9];
823:     var scheduleCheck = validateBookingSchedule_(newFecha, newHora, newServicio, newModalidad);
824:     if (!scheduleCheck.ok) return {ok: false, error: scheduleCheck.error};
825:     if (d.servicio)           sheet.getRange(i+1, 6).setValue(d.servicio);
826:     if (d.modalidad)          sheet.getRange(i+1, 7).setValue(d.modalidad);
827:     if (d.fecha)              sheet.getRange(i+1, 8).setValue(d.fecha);
828:     if (d.hora)               sheet.getRange(i+1, 9).setValue(d.hora);
829:     if (d.precio)             sheet.getRange(i+1, 10).setValue(d.precio);
830:     if (d.notas !== undefined)     sheet.getRange(i+1, 13).setValue(d.notas);
831:     if (d.notaAdmin !== undefined) sheet.getRange(i+1, 14).setValue(d.notaAdmin);
832:     try {
833:       var dp = oldFecha.split('-');
834:       var dayS = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
835:       var dayE = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
836:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayS, dayE);
837:       for (var k = 0; k < calEvs.length; k++) {
838:         var t = calEvs[k].getTitle() || '';
839:         if (t.indexOf('[CITA]') === 0 && t.indexOf(rows[i][2]) > -1) {
840:           var ns      = parseDT(newFecha, newHora);
```

### Coincidencia 17 — línea 802

```javascript
747:       if (p.note) sheet.getRange(i+1, 14).setValue(p.note);
748:       return {ok: true};
749:     }
750:   }
751:   return {ok: false, error: 'Cita no encontrada'};
752: }
753: 
754: // Devuelve eventos personales del Google Calendar (no citas) para un rango de fechas
755: function getCalendarEvents(from, to) {
756:   try {
757:     var dp1 = from.split('-'), dp2 = to.split('-');
758:     var start = new Date(+dp1[0], +dp1[1]-1, +dp1[2], 0, 0, 0);
759:     var end   = new Date(+dp2[0], +dp2[1]-1, +dp2[2], 23, 59, 59);
760:     var events = [];
761:     CalendarApp.getDefaultCalendar().getEvents(start, end).forEach(function(ev) {
762:       if (ev.getTitle().indexOf('[CITA]') === 0) return; // omitir citas del sistema
763:       if (ev.isAllDayEvent()) {
764:         events.push({title: ev.getTitle(), fecha: fmtDate(ev.getStartTime()), hora: 'Todo el dÃ­a', allDay: true});
765:       } else {
766:         events.push({
767:           title:   ev.getTitle(),
768:           fecha:   fmtDate(ev.getStartTime()),
769:           hora:    pad(ev.getStartTime().getHours()) + ':' + pad(ev.getStartTime().getMinutes()),
770:           horaFin: pad(ev.getEndTime().getHours())   + ':' + pad(ev.getEndTime().getMinutes()),
771:           allDay:  false
772:         });
773:       }
774:     });
775:     return {ok: true, events: events};
776:   } catch(x) { return {ok: false, error: x.message, events: []}; }
777: }
778: 
779: // Cancela la cita y elimina el evento del Google Calendar
780: function doCancelBooking(id) {
781:   var ss   = getOrCreateSheet();
782:   var rows = ss.getSheetByName('Citas').getDataRange().getValues();
783:   var booking = null;
784:   for (var i = 1; i < rows.length; i++) { if (rows[i][0] === id) { booking = rows[i]; break; } }
785:   var result = doUpdateStatus({id: id, status: 'Cancelada'});
786:   if (!result.ok) return result;
787:   if (booking) {
788:     try {
789:       var fecha = sd(booking[7]);
790:       var dp = fecha.split('-');
791:       var dayStart = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
792:       var dayEnd   = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
793:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayStart, dayEnd);
794:       for (var k = 0; k < calEvs.length; k++) {
795:         var t = calEvs[k].getTitle() || '';
796:         if (t.indexOf('[CITA]') === 0 && t.indexOf(booking[2]) > -1) { calEvs[k].deleteEvent(); break; }
797:       }
798:     } catch(x) {}
799:   }
800:   var queued = 0;
801:   if (booking) {
802:     try { queued = queueWaitlistMatch_({id:id,nombre:booking[2],servicio:booking[5],fecha:sd(booking[7]),hora:st(booking[8])}); } catch(qx) {}
803:   }
804:   return {ok: true, waitlistQueued: queued};
805: }
806: 
807: // Edita una cita existente en Sheets y actualiza el evento del Calendar
808: function doEditBooking(d) {
809:   if (d.hora && isMidnightBookingTime_(d.hora)) {
810:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
811:   }
812:   var sheet = getOrCreateSheet().getSheetByName('Citas');
813:   var rows  = sheet.getDataRange().getValues();
814:   for (var i = 1; i < rows.length; i++) {
815:     if (rows[i][0] !== d.id) continue;
816:     var oldFecha = sd(rows[i][7]);
817:     var oldHora  = st(rows[i][8]);
818:     var newServicio  = d.servicio  || rows[i][5];
819:     var newModalidad = d.modalidad || rows[i][6];
820:     var newFecha     = d.fecha     || oldFecha;
821:     var newHora      = d.hora      || oldHora;
822:     var newPrecio    = d.precio    || rows[i][9];
823:     var scheduleCheck = validateBookingSchedule_(newFecha, newHora, newServicio, newModalidad);
824:     if (!scheduleCheck.ok) return {ok: false, error: scheduleCheck.error};
825:     if (d.servicio)           sheet.getRange(i+1, 6).setValue(d.servicio);
826:     if (d.modalidad)          sheet.getRange(i+1, 7).setValue(d.modalidad);
827:     if (d.fecha)              sheet.getRange(i+1, 8).setValue(d.fecha);
828:     if (d.hora)               sheet.getRange(i+1, 9).setValue(d.hora);
829:     if (d.precio)             sheet.getRange(i+1, 10).setValue(d.precio);
830:     if (d.notas !== undefined)     sheet.getRange(i+1, 13).setValue(d.notas);
831:     if (d.notaAdmin !== undefined) sheet.getRange(i+1, 14).setValue(d.notaAdmin);
832:     try {
833:       var dp = oldFecha.split('-');
834:       var dayS = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
835:       var dayE = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
836:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayS, dayE);
837:       for (var k = 0; k < calEvs.length; k++) {
838:         var t = calEvs[k].getTitle() || '';
839:         if (t.indexOf('[CITA]') === 0 && t.indexOf(rows[i][2]) > -1) {
840:           var ns      = parseDT(newFecha, newHora);
841:           var newMins = getServiceDuration(newServicio) + (newModalidad === 'Domicilio' ? 30 : 0);
842:           calEvs[k].setTime(ns, new Date(ns.getTime() + newMins * 60000));
843:           calEvs[k].setTitle('[CITA] ' + newServicio + ' - ' + rows[i][2]);
844:           break;
845:         }
846:       }
847:     } catch(x) {}
848:     var dedupe = cancelDuplicateReschedules_(sheet, rows, i, {
849:       id: d.id,
850:       nombre: rows[i][2],
851:       servicio: newServicio,
852:       fecha: newFecha,
853:       hora: newHora,
854:       precio: newPrecio
855:     });
856:     if (oldFecha !== newFecha || oldHora !== newHora) {
857:       var map = ensureCitasStateColumns_();
```

### Coincidencia 18 — línea 849

```javascript
794:       for (var k = 0; k < calEvs.length; k++) {
795:         var t = calEvs[k].getTitle() || '';
796:         if (t.indexOf('[CITA]') === 0 && t.indexOf(booking[2]) > -1) { calEvs[k].deleteEvent(); break; }
797:       }
798:     } catch(x) {}
799:   }
800:   var queued = 0;
801:   if (booking) {
802:     try { queued = queueWaitlistMatch_({id:id,nombre:booking[2],servicio:booking[5],fecha:sd(booking[7]),hora:st(booking[8])}); } catch(qx) {}
803:   }
804:   return {ok: true, waitlistQueued: queued};
805: }
806: 
807: // Edita una cita existente en Sheets y actualiza el evento del Calendar
808: function doEditBooking(d) {
809:   if (d.hora && isMidnightBookingTime_(d.hora)) {
810:     return {ok: false, error: 'Ese horario es de medianoche (00:00-00:59). Para 12 del mediodia usa 12:00.'};
811:   }
812:   var sheet = getOrCreateSheet().getSheetByName('Citas');
813:   var rows  = sheet.getDataRange().getValues();
814:   for (var i = 1; i < rows.length; i++) {
815:     if (rows[i][0] !== d.id) continue;
816:     var oldFecha = sd(rows[i][7]);
817:     var oldHora  = st(rows[i][8]);
818:     var newServicio  = d.servicio  || rows[i][5];
819:     var newModalidad = d.modalidad || rows[i][6];
820:     var newFecha     = d.fecha     || oldFecha;
821:     var newHora      = d.hora      || oldHora;
822:     var newPrecio    = d.precio    || rows[i][9];
823:     var scheduleCheck = validateBookingSchedule_(newFecha, newHora, newServicio, newModalidad);
824:     if (!scheduleCheck.ok) return {ok: false, error: scheduleCheck.error};
825:     if (d.servicio)           sheet.getRange(i+1, 6).setValue(d.servicio);
826:     if (d.modalidad)          sheet.getRange(i+1, 7).setValue(d.modalidad);
827:     if (d.fecha)              sheet.getRange(i+1, 8).setValue(d.fecha);
828:     if (d.hora)               sheet.getRange(i+1, 9).setValue(d.hora);
829:     if (d.precio)             sheet.getRange(i+1, 10).setValue(d.precio);
830:     if (d.notas !== undefined)     sheet.getRange(i+1, 13).setValue(d.notas);
831:     if (d.notaAdmin !== undefined) sheet.getRange(i+1, 14).setValue(d.notaAdmin);
832:     try {
833:       var dp = oldFecha.split('-');
834:       var dayS = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
835:       var dayE = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
836:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayS, dayE);
837:       for (var k = 0; k < calEvs.length; k++) {
838:         var t = calEvs[k].getTitle() || '';
839:         if (t.indexOf('[CITA]') === 0 && t.indexOf(rows[i][2]) > -1) {
840:           var ns      = parseDT(newFecha, newHora);
841:           var newMins = getServiceDuration(newServicio) + (newModalidad === 'Domicilio' ? 30 : 0);
842:           calEvs[k].setTime(ns, new Date(ns.getTime() + newMins * 60000));
843:           calEvs[k].setTitle('[CITA] ' + newServicio + ' - ' + rows[i][2]);
844:           break;
845:         }
846:       }
847:     } catch(x) {}
848:     var dedupe = cancelDuplicateReschedules_(sheet, rows, i, {
849:       id: d.id,
850:       nombre: rows[i][2],
851:       servicio: newServicio,
852:       fecha: newFecha,
853:       hora: newHora,
854:       precio: newPrecio
855:     });
856:     if (oldFecha !== newFecha || oldHora !== newHora) {
857:       var map = ensureCitasStateColumns_();
858:       var assignment = getAssignmentMap_()[d.id];
859:       var state = getCitaStateFromRow_(rows[i], map);
860:       var nextOperational = APPOINTMENT_STATUS.RESERVADA;
861:       if (assignment && assignment.profesionalId && isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.ASIGNADA;
862:       else if (isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.AUTORIZADA;
863:       var currentRep = Number(rows[i][map.Reprogramaciones - 1] || 0) + 1;
864:       sheet.getRange(i+1, map.Reprogramaciones).setValue(currentRep);
865:       sheet.getRange(i+1, map.UltimaReprogramacion).setValue(oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora);
866:       recordReprogrammingHistory_(d.id, oldFecha, oldHora, newFecha, newHora, d.motivo || '', {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, currentRep);
867:       setCitaStates_(d.id, state.estadoPago, nextOperational, {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, 'Reprogramacion: ' + oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora + (d.motivo ? ' | Motivo: ' + d.motivo : ''));
868:     }
869:     return {ok: true, duplicatesCancelled: dedupe.cancelled, duplicateIds: dedupe.ids};
870:   }
871:   return {ok: false, error: 'Cita no encontrada'};
872: }
873: 
874: function normalizeBookingText_(v) {
875:   return ('' + (v || '')).toLowerCase().replace(/\s+/g, ' ').trim();
876: }
877: 
878: function bookingIsActive_(status, service) {
879:   var st = normalizeBookingText_(status);
880:   if (st === 'cancelada' || st === 'no asistio' || st === 'no asistiÃ³' || st === 'registro') return false;
881:   return normalizeBookingText_(service).indexOf('registro') !== 0;
882: }
883: 
884: function sameBookingIdentity_(aName, aService, aHour, bName, bService, bHour) {
885:   return normalizeBookingText_(aName) === normalizeBookingText_(bName)
886:     && normalizeBookingText_(aService) === normalizeBookingText_(bService)
887:     && st(aHour) === st(bHour);
888: }
889: 
890: function cancelDuplicateReschedules_(sheet, rows, keepIndex, keep) {
891:   var cancelled = 0, ids = [];
892:   for (var r = 1; r < rows.length; r++) {
893:     if (r === keepIndex) continue;
894:     var row = rows[r];
895:     if (!bookingIsActive_(row[10], row[5])) continue;
896:     if (!sameBookingIdentity_(row[2], row[5], row[8], keep.nombre, keep.servicio, keep.hora)) continue;
897:     var rowFecha = sd(row[7]);
898:     if (rowFecha !== keep.fecha) continue;
899:     sheet.getRange(r+1, 11).setValue('Cancelada');
900:     var note = ('' + (row[13] || '')).trim();
901:     var add  = '[AUTO] Duplicada por reprogramaciÃ³n. Cita activa: ' + keep.fecha + ' ' + keep.hora + ' (' + keep.id + ').';
902:     sheet.getRange(r+1, 14).setValue(note ? note + '\n' + add : add);
903:     cancelled++;
904:     ids.push(row[0]);
```

### Coincidencia 19 — línea 866

```javascript
811:   }
812:   var sheet = getOrCreateSheet().getSheetByName('Citas');
813:   var rows  = sheet.getDataRange().getValues();
814:   for (var i = 1; i < rows.length; i++) {
815:     if (rows[i][0] !== d.id) continue;
816:     var oldFecha = sd(rows[i][7]);
817:     var oldHora  = st(rows[i][8]);
818:     var newServicio  = d.servicio  || rows[i][5];
819:     var newModalidad = d.modalidad || rows[i][6];
820:     var newFecha     = d.fecha     || oldFecha;
821:     var newHora      = d.hora      || oldHora;
822:     var newPrecio    = d.precio    || rows[i][9];
823:     var scheduleCheck = validateBookingSchedule_(newFecha, newHora, newServicio, newModalidad);
824:     if (!scheduleCheck.ok) return {ok: false, error: scheduleCheck.error};
825:     if (d.servicio)           sheet.getRange(i+1, 6).setValue(d.servicio);
826:     if (d.modalidad)          sheet.getRange(i+1, 7).setValue(d.modalidad);
827:     if (d.fecha)              sheet.getRange(i+1, 8).setValue(d.fecha);
828:     if (d.hora)               sheet.getRange(i+1, 9).setValue(d.hora);
829:     if (d.precio)             sheet.getRange(i+1, 10).setValue(d.precio);
830:     if (d.notas !== undefined)     sheet.getRange(i+1, 13).setValue(d.notas);
831:     if (d.notaAdmin !== undefined) sheet.getRange(i+1, 14).setValue(d.notaAdmin);
832:     try {
833:       var dp = oldFecha.split('-');
834:       var dayS = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
835:       var dayE = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
836:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayS, dayE);
837:       for (var k = 0; k < calEvs.length; k++) {
838:         var t = calEvs[k].getTitle() || '';
839:         if (t.indexOf('[CITA]') === 0 && t.indexOf(rows[i][2]) > -1) {
840:           var ns      = parseDT(newFecha, newHora);
841:           var newMins = getServiceDuration(newServicio) + (newModalidad === 'Domicilio' ? 30 : 0);
842:           calEvs[k].setTime(ns, new Date(ns.getTime() + newMins * 60000));
843:           calEvs[k].setTitle('[CITA] ' + newServicio + ' - ' + rows[i][2]);
844:           break;
845:         }
846:       }
847:     } catch(x) {}
848:     var dedupe = cancelDuplicateReschedules_(sheet, rows, i, {
849:       id: d.id,
850:       nombre: rows[i][2],
851:       servicio: newServicio,
852:       fecha: newFecha,
853:       hora: newHora,
854:       precio: newPrecio
855:     });
856:     if (oldFecha !== newFecha || oldHora !== newHora) {
857:       var map = ensureCitasStateColumns_();
858:       var assignment = getAssignmentMap_()[d.id];
859:       var state = getCitaStateFromRow_(rows[i], map);
860:       var nextOperational = APPOINTMENT_STATUS.RESERVADA;
861:       if (assignment && assignment.profesionalId && isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.ASIGNADA;
862:       else if (isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.AUTORIZADA;
863:       var currentRep = Number(rows[i][map.Reprogramaciones - 1] || 0) + 1;
864:       sheet.getRange(i+1, map.Reprogramaciones).setValue(currentRep);
865:       sheet.getRange(i+1, map.UltimaReprogramacion).setValue(oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora);
866:       recordReprogrammingHistory_(d.id, oldFecha, oldHora, newFecha, newHora, d.motivo || '', {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, currentRep);
867:       setCitaStates_(d.id, state.estadoPago, nextOperational, {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, 'Reprogramacion: ' + oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora + (d.motivo ? ' | Motivo: ' + d.motivo : ''));
868:     }
869:     return {ok: true, duplicatesCancelled: dedupe.cancelled, duplicateIds: dedupe.ids};
870:   }
871:   return {ok: false, error: 'Cita no encontrada'};
872: }
873: 
874: function normalizeBookingText_(v) {
875:   return ('' + (v || '')).toLowerCase().replace(/\s+/g, ' ').trim();
876: }
877: 
878: function bookingIsActive_(status, service) {
879:   var st = normalizeBookingText_(status);
880:   if (st === 'cancelada' || st === 'no asistio' || st === 'no asistiÃ³' || st === 'registro') return false;
881:   return normalizeBookingText_(service).indexOf('registro') !== 0;
882: }
883: 
884: function sameBookingIdentity_(aName, aService, aHour, bName, bService, bHour) {
885:   return normalizeBookingText_(aName) === normalizeBookingText_(bName)
886:     && normalizeBookingText_(aService) === normalizeBookingText_(bService)
887:     && st(aHour) === st(bHour);
888: }
889: 
890: function cancelDuplicateReschedules_(sheet, rows, keepIndex, keep) {
891:   var cancelled = 0, ids = [];
892:   for (var r = 1; r < rows.length; r++) {
893:     if (r === keepIndex) continue;
894:     var row = rows[r];
895:     if (!bookingIsActive_(row[10], row[5])) continue;
896:     if (!sameBookingIdentity_(row[2], row[5], row[8], keep.nombre, keep.servicio, keep.hora)) continue;
897:     var rowFecha = sd(row[7]);
898:     if (rowFecha !== keep.fecha) continue;
899:     sheet.getRange(r+1, 11).setValue('Cancelada');
900:     var note = ('' + (row[13] || '')).trim();
901:     var add  = '[AUTO] Duplicada por reprogramaciÃ³n. Cita activa: ' + keep.fecha + ' ' + keep.hora + ' (' + keep.id + ').';
902:     sheet.getRange(r+1, 14).setValue(note ? note + '\n' + add : add);
903:     cancelled++;
904:     ids.push(row[0]);
905:   }
906:   return {cancelled: cancelled, ids: ids};
907: }
908: 
909: function doRepairRescheduledDuplicate(p) {
910:   var nombre = normalizeBookingText_(p.nombre || '');
911:   if (!nombre) return {ok:false, error:'Falta nombre'};
912:   var keepFecha = sd(p.keepFecha || p.fecha || '');
913:   var keepHora  = st(p.keepHora || p.hora || '');
914:   var servicioFiltro = normalizeBookingText_(p.servicio || '');
915:   var ss = getOrCreateSheet();
916:   var sheet = ss.getSheetByName('Citas');
917:   var rows = sheet.getDataRange().getValues();
918:   var matches = [];
919:   for (var i = 1; i < rows.length; i++) {
920:     var r = rows[i];
921:     if (!bookingIsActive_(r[10], r[5])) continue;
```

### Coincidencia 20 — línea 867

```javascript
812:   var sheet = getOrCreateSheet().getSheetByName('Citas');
813:   var rows  = sheet.getDataRange().getValues();
814:   for (var i = 1; i < rows.length; i++) {
815:     if (rows[i][0] !== d.id) continue;
816:     var oldFecha = sd(rows[i][7]);
817:     var oldHora  = st(rows[i][8]);
818:     var newServicio  = d.servicio  || rows[i][5];
819:     var newModalidad = d.modalidad || rows[i][6];
820:     var newFecha     = d.fecha     || oldFecha;
821:     var newHora      = d.hora      || oldHora;
822:     var newPrecio    = d.precio    || rows[i][9];
823:     var scheduleCheck = validateBookingSchedule_(newFecha, newHora, newServicio, newModalidad);
824:     if (!scheduleCheck.ok) return {ok: false, error: scheduleCheck.error};
825:     if (d.servicio)           sheet.getRange(i+1, 6).setValue(d.servicio);
826:     if (d.modalidad)          sheet.getRange(i+1, 7).setValue(d.modalidad);
827:     if (d.fecha)              sheet.getRange(i+1, 8).setValue(d.fecha);
828:     if (d.hora)               sheet.getRange(i+1, 9).setValue(d.hora);
829:     if (d.precio)             sheet.getRange(i+1, 10).setValue(d.precio);
830:     if (d.notas !== undefined)     sheet.getRange(i+1, 13).setValue(d.notas);
831:     if (d.notaAdmin !== undefined) sheet.getRange(i+1, 14).setValue(d.notaAdmin);
832:     try {
833:       var dp = oldFecha.split('-');
834:       var dayS = new Date(+dp[0], +dp[1]-1, +dp[2], 0, 0, 0);
835:       var dayE = new Date(+dp[0], +dp[1]-1, +dp[2], 23, 59, 59);
836:       var calEvs = CalendarApp.getDefaultCalendar().getEvents(dayS, dayE);
837:       for (var k = 0; k < calEvs.length; k++) {
838:         var t = calEvs[k].getTitle() || '';
839:         if (t.indexOf('[CITA]') === 0 && t.indexOf(rows[i][2]) > -1) {
840:           var ns      = parseDT(newFecha, newHora);
841:           var newMins = getServiceDuration(newServicio) + (newModalidad === 'Domicilio' ? 30 : 0);
842:           calEvs[k].setTime(ns, new Date(ns.getTime() + newMins * 60000));
843:           calEvs[k].setTitle('[CITA] ' + newServicio + ' - ' + rows[i][2]);
844:           break;
845:         }
846:       }
847:     } catch(x) {}
848:     var dedupe = cancelDuplicateReschedules_(sheet, rows, i, {
849:       id: d.id,
850:       nombre: rows[i][2],
851:       servicio: newServicio,
852:       fecha: newFecha,
853:       hora: newHora,
854:       precio: newPrecio
855:     });
856:     if (oldFecha !== newFecha || oldHora !== newHora) {
857:       var map = ensureCitasStateColumns_();
858:       var assignment = getAssignmentMap_()[d.id];
859:       var state = getCitaStateFromRow_(rows[i], map);
860:       var nextOperational = APPOINTMENT_STATUS.RESERVADA;
861:       if (assignment && assignment.profesionalId && isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.ASIGNADA;
862:       else if (isPaymentAuthorizing_(state.estadoPago)) nextOperational = APPOINTMENT_STATUS.AUTORIZADA;
863:       var currentRep = Number(rows[i][map.Reprogramaciones - 1] || 0) + 1;
864:       sheet.getRange(i+1, map.Reprogramaciones).setValue(currentRep);
865:       sheet.getRange(i+1, map.UltimaReprogramacion).setValue(oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora);
866:       recordReprogrammingHistory_(d.id, oldFecha, oldHora, newFecha, newHora, d.motivo || '', {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, currentRep);
867:       setCitaStates_(d.id, state.estadoPago, nextOperational, {id:'admin', nombre:'Administracion', rol:'Superadministradora'}, 'Reprogramacion: ' + oldFecha + ' ' + oldHora + ' -> ' + newFecha + ' ' + newHora + (d.motivo ? ' | Motivo: ' + d.motivo : ''));
868:     }
869:     return {ok: true, duplicatesCancelled: dedupe.cancelled, duplicateIds: dedupe.ids};
870:   }
871:   return {ok: false, error: 'Cita no encontrada'};
872: }
873: 
874: function normalizeBookingText_(v) {
875:   return ('' + (v || '')).toLowerCase().replace(/\s+/g, ' ').trim();
876: }
877: 
878: function bookingIsActive_(status, service) {
879:   var st = normalizeBookingText_(status);
880:   if (st === 'cancelada' || st === 'no asistio' || st === 'no asistiÃ³' || st === 'registro') return false;
881:   return normalizeBookingText_(service).indexOf('registro') !== 0;
882: }
883: 
884: function sameBookingIdentity_(aName, aService, aHour, bName, bService, bHour) {
885:   return normalizeBookingText_(aName) === normalizeBookingText_(bName)
886:     && normalizeBookingText_(aService) === normalizeBookingText_(bService)
887:     && st(aHour) === st(bHour);
888: }
889: 
890: function cancelDuplicateReschedules_(sheet, rows, keepIndex, keep) {
891:   var cancelled = 0, ids = [];
892:   for (var r = 1; r < rows.length; r++) {
893:     if (r === keepIndex) continue;
894:     var row = rows[r];
895:     if (!bookingIsActive_(row[10], row[5])) continue;
896:     if (!sameBookingIdentity_(row[2], row[5], row[8], keep.nombre, keep.servicio, keep.hora)) continue;
897:     var rowFecha = sd(row[7]);
898:     if (rowFecha !== keep.fecha) continue;
899:     sheet.getRange(r+1, 11).setValue('Cancelada');
900:     var note = ('' + (row[13] || '')).trim();
901:     var add  = '[AUTO] Duplicada por reprogramaciÃ³n. Cita activa: ' + keep.fecha + ' ' + keep.hora + ' (' + keep.id + ').';
902:     sheet.getRange(r+1, 14).setValue(note ? note + '\n' + add : add);
903:     cancelled++;
904:     ids.push(row[0]);
905:   }
906:   return {cancelled: cancelled, ids: ids};
907: }
908: 
909: function doRepairRescheduledDuplicate(p) {
910:   var nombre = normalizeBookingText_(p.nombre || '');
911:   if (!nombre) return {ok:false, error:'Falta nombre'};
912:   var keepFecha = sd(p.keepFecha || p.fecha || '');
913:   var keepHora  = st(p.keepHora || p.hora || '');
914:   var servicioFiltro = normalizeBookingText_(p.servicio || '');
915:   var ss = getOrCreateSheet();
916:   var sheet = ss.getSheetByName('Citas');
917:   var rows = sheet.getDataRange().getValues();
918:   var matches = [];
919:   for (var i = 1; i < rows.length; i++) {
920:     var r = rows[i];
921:     if (!bookingIsActive_(r[10], r[5])) continue;
922:     if (normalizeBookingText_(r[2]) !== nombre) continue;
```
