# Seguridad Fase 2 — Auditoría de Apps Script

Fecha: 2026-08-11

## Alcance

Auditoría del backend de Google Apps Script conocido como `Citas JessicaOcampoFisio`, tomando como referencia el último archivo disponible del 2026-08-04 y su manifiesto asociado. Esta fase es documental: **no modifica `google-apps-script.js`, `appsscript.json`, `main`, Google Apps Script, producción ni GitHub Pages**.

## Estado identificado

- El backend usa sesiones de administrador y profesional almacenadas en `CacheService` con TTL de 4 horas.
- La contraseña de administración y la clave de Gemini se leen desde `PropertiesService`, no están incrustadas en el código.
- El web app está configurado para ejecutarse como el usuario que despliega y permitir acceso anónimo. Esto es compatible con las funciones públicas de agenda/pasaporte/reseñas, pero obliga a que cada acción privada tenga autorización estricta en backend.
- El portal profesional valida token y filtra las citas por asignación al profesional.
- Existe un control de rol auxiliar, pero hoy solo bloquea unas pocas acciones de propietaria.

## Hallazgos prioritarios

### P0 — permisos de auxiliar demasiado amplios

`requireAdminOnly_` solo protege actualmente:

- cambio de contraseña administrativa;
- guardar configuración de automatizaciones;
- activar automatizaciones;
- ejecutar automatizaciones;
- cerrar elementos de cola de automatización.

Sin embargo, una sesión auxiliar válida llega al mismo `doGet` administrativo y puede invocar otras operaciones sensibles que no pasan por ese control, por ejemplo:

- crear/editar profesionales;
- restablecer contraseñas de profesionales;
- activar/desactivar/eliminar profesionales;
- asignar profesionales y autorizar citas;
- crear/aplicar saldos a favor;
- marcar pagos a profesionales como pagados;
- configurar cuentas de pago;
- regenerar/desactivar/reactivar pasaportes;
- ejecutar respaldos/migraciones;
- acciones destructivas o de reparación de datos.

**Riesgo:** una auxiliar con acceso legítimo al panel puede ejecutar tareas de propietaria aunque la interfaz las oculte. La restricción debe existir en backend, no solo en UI.

### P0 — credenciales/tokens en URL y acciones de escritura por GET

Gran parte de las acciones administrativas se ejecutan con `?action=...&token=...` y varias modifican datos mediante GET.

**Riesgos:** el token puede quedar en historial, registros, herramientas de diagnóstico o URLs copiadas; además, una operación de escritura puede ser repetida accidentalmente por recarga/prefetch.

**Corrección propuesta:** mantener GET solo para lecturas y mover las operaciones de escritura a POST con el token dentro del cuerpo.

### P0 — el manejador de errores puede reenviar contraseñas/tokens

El `catch` de `doPost` envía por correo el contenido completo de `e.postData.contents`. Si una excepción ocurre durante login o cambio de contraseña, el cuerpo puede contener contraseña o token.

**Corrección propuesta:** nunca registrar ni enviar el body crudo. Registrar solo acción, identificador no sensible y error técnico sanitizado.

### P1 — sesiones no se revocan al cerrar sesión

El frontend elimina el token de `sessionStorage`, pero el token sigue activo en `CacheService` hasta que venza. Aplica a administración y profesionales.

**Corrección propuesta:** añadir endpoints de logout que eliminen el token del cache y revocar sesiones relevantes después de cambios de contraseña.

### P1 — tokens generados con `Math.random()`

Los tokens de sesión se generan con `Math.random()`. Aunque son largos, no es la fuente adecuada para credenciales de sesión.

**Corrección propuesta:** usar UUIDs de Apps Script combinados y no predecibles para formar el token.

### P1 — rate limit global

Los intentos fallidos usan una única clave global `login_fails`. Cinco fallos pueden bloquear temporalmente todos los logins, incluidos usuarios legítimos.

**Corrección propuesta:** separar al menos administrador y cada usuario profesional/auxiliar en claves independientes.

### P1 — funciones duplicadas

Se detectaron definiciones duplicadas, entre ellas:

- `validatePublicBookingSchedule_`;
- `getProfessionalAgenda_`;
- `professionalMarkAttended_`.

En JavaScript la última definición reemplaza a la anterior. Esto vuelve difícil saber qué lógica está realmente activa y puede ocultar cambios de comportamiento.

**Corrección propuesta:** consolidar una sola definición de cada función después de pruebas de regresión.

### P2 — endpoint de prueba público

`?test=...` responde sin sesión y expone al menos el nombre del calendario por defecto.

**Corrección propuesta:** retirarlo de producción o exigir sesión de propietaria.

### P2 — revisión de OAuth scopes

El manifiesto solicita acceso a Sheets, Calendar, Gmail send, Drive, Forms, URL Fetch y ScriptApp. Varias capacidades parecen justificadas por funciones actuales, pero debe verificarse que cada scope siga siendo necesario antes de reducirlos.

## Matriz de permisos propuesta

### Propietaria

Acceso total, incluyendo:

- contraseñas y usuarios;
- profesionales;
- verificación/configuración financiera;
- saldos a favor;
- cuentas de pago;
- automatizaciones;
- migraciones, respaldos y reparaciones;
- administración sensible del pasaporte.

### Auxiliar

Permitir solo trabajo operativo cotidiano, por ejemplo:

- consultar agenda;
- crear/editar citas;
- actualizar estados permitidos;
- registrar/editar datos de pacientes;
- seguimiento y recordatorios;
- lista de espera;
- tareas administrativas no destructivas.

Las operaciones financieras definitivas, credenciales, equipo, migraciones y configuraciones deben quedar bloqueadas en backend.

### Fisioterapeuta

Mantener el modelo actual de portal independiente:

- ver únicamente citas asignadas;
- marcar atendida únicamente una cita propia y autorizada;
- reportar novedades de una cita propia;
- cambiar su propia contraseña.

## Orden recomendado para corregir

1. Crear una función central de autorización por acción/rol y aplicarla en `doGet` y `doPost`.
2. Bloquear inmediatamente para auxiliares las operaciones P0 sensibles.
3. Sanitizar el manejo de errores para no registrar contraseñas/tokens.
4. Migrar escrituras administrativas de GET a POST gradualmente, manteniendo compatibilidad temporal.
5. Añadir logout/revocación de sesión.
6. Mejorar generación de tokens y rate limit.
7. Eliminar duplicados solo después de pruebas funcionales.
8. Revisar scopes y endpoint de prueba.

## Criterio para la siguiente fase

No desplegar cambios directamente en el Apps Script activo. Primero preparar una copia de trabajo/versionado, aplicar los bloqueos de permisos y ejecutar pruebas contra una versión de prueba. Solo después, con validación explícita, considerar una nueva implementación del backend.
