# Auditoría Fase 2 — Backend Apps Script

Fecha: 2026-08-11

## Alcance

Auditoría estática de la copia más reciente disponible de `google-apps-script.js` (04/08/2026) y contraste con el frontend publicado actual. Esta fase **no modifica ni despliega** Google Apps Script.

## Hallazgos positivos

- Las acciones administrativas GET pasan por `validateSession(token)` antes de ejecutar operaciones privadas.
- El portal profesional utiliza una sesión independiente (`prosess_`).
- `ADMIN_TOKEN` y `GEMINI_API_KEY` se leen desde `PropertiesService`; no hay valores secretos de respaldo incrustados en código.
- `createBooking` usa `LockService` y deduplicación por paciente/fecha/hora para reducir duplicados.
- El Pasaporte público seguro exige `id + token`.

## Hallazgos que requieren corrección antes de considerar el backend cerrado

### P0 — Permisos de propietaria demasiado limitados

`requireAdminOnly_()` solo considera exclusivas de propietaria:

- `changePassword`
- `automationSave`
- `automationSetup`
- `automationRun`
- `automationQueueDone`

Por tanto una cuenta auxiliar con sesión administrativa válida puede llegar a ejecutar otras acciones sensibles que hoy no están bloqueadas explícitamente, entre ellas gestión de profesionales, reset de contraseñas, cortesías/saldos, cuentas de pago, operaciones de mantenimiento/migración y administración del Pasaporte.

Además `verifyPayment` llama a `requireAdminOnly_()` en POST, pero `verifyPayment` no está incluido en `ownerOnly`; por lo tanto ese control no restringe realmente esa acción.

### P0 — Posible exposición de credenciales en correo de errores

El `catch` global de `doPost` intenta enviar por Gmail el contenido completo de `e.postData.contents`. Si ocurre una excepción durante acciones como `adminLogin`, `changePassword` o cualquier POST con token, el correo podría contener contraseña, nueva contraseña o token de sesión.

Debe reemplazarse por un registro sanitizado que elimine `password`, `currentPassword`, `newPassword`, `token`, archivos y otros datos sensibles.

### P1 — Cierre de sesión no revoca token en servidor

El frontend elimina el token de `sessionStorage`, pero en la copia auditada no existe una acción administrativa de logout que elimine `sess_<token>` de `CacheService`. Un token obtenido por un tercero podría seguir siendo válido hasta expirar y su TTL se renueva con cada acción válida.

Debe existir `adminLogout` que invalide el token en servidor y el frontend debe llamarlo antes de limpiar la sesión local.

### P1 — Acciones mutables por GET y token en URL

Muchas operaciones con efectos secundarios viajan como GET con `token` y datos en query string: edición/cancelación de citas, pacientes, profesionales, KV, Pasaporte, cuentas y otras.

Esto aumenta exposición accidental en históricos, diagnósticos, proxies o logs. Debe migrarse progresivamente lo sensible a POST con token y datos en el cuerpo.

### P1 — Doble definición de `validatePublicBookingSchedule_`

La copia auditada contiene dos funciones con el mismo nombre. JavaScript conserva la última definición, por lo que la anterior queda anulada. No es un fallo inmediato de producción, pero sí deuda peligrosa porque una corrección futura puede hacerse sobre la función que no está activa.

Debe quedar una única implementación canónica.

### P1 — Rate limit de login global

El contador `login_fails` es global para todo el script. Cinco intentos fallidos pueden bloquear temporalmente a todos los usuarios administrativos. Conviene cambiarlo a una clave por usuario/origen lógico o, al menos, separar superadministradora y auxiliares.

### P1 — POST desconocido cae en creación pública de cita

Al final de `doPost`, cualquier acción no reconocida termina en `createBooking(d, false)`. Esto mezcla el endpoint público de reserva con acciones administrativas y hace más difícil detectar peticiones malformadas.

Conviene exigir explícitamente `action: publicBook` (o equivalente) y responder `Acción no reconocida` para cualquier otra acción.

## Matriz recomendada de permisos

### Solo propietaria

- Cambiar contraseña administrativa.
- Aprobar/rechazar pagos definitivos.
- Crear/editar/eliminar profesionales y resetear contraseñas.
- Crear/editar cuentas receptoras de pago.
- Autorizar cortesías y saldos a favor.
- Ejecutar setup/migraciones/limpiezas estructurales.
- Activar/configurar/forzar automatizaciones.
- Backups/migraciones manuales de Pasaporte.

### Auxiliar autorizada

- Ver agenda y pacientes.
- Crear/reagendar/cancelar citas según política.
- Registrar comprobantes para revisión.
- Seguimientos/recordatorios.
- Asignación operativa de profesional, si se desea.
- Actualizaciones no financieras del paciente.

### Profesional

- Ver únicamente sus citas asignadas/autorizadas.
- Marcar atención cuando corresponda.
- Reportar novedades.
- Cambiar su propia contraseña.

## Plan seguro de corrección

1. Confirmar esta matriz de permisos.
2. Crear una copia exacta del Apps Script actualmente desplegado antes de modificarlo.
3. Aplicar solo los cambios P0 en una versión de prueba.
4. Ejecutar pruebas negativas por rol: propietaria, auxiliar, profesional y usuario público.
5. Después aplicar P1 de forma incremental.
6. Crear una nueva versión de Apps Script conservando la misma URL pública cuando sea posible.
7. Probar `ping`, login, cita, pago, Pasaporte y portal profesional antes de cerrar la fase.

## Restricción actual

El repositorio público `cuidandote-admin` no contiene el backend activo. No se recomienda subir aquí una copia completa del Apps Script como mecanismo de backup hasta definir un repositorio/almacenamiento privado para el backend.
