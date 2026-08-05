# Resultado — Hotfix de agendamiento

- Se corrigió únicamente `submitAdminBookingMulti()` en `index.html`.
- Antes de crear, valida que la sesión administrativa continúe activa.
- Si la sesión venció, no envía `adminBook` y conserva todos los campos del formulario.
- Si Apps Script rechaza la cita, muestra el motivo exacto devuelto por el servidor.
- En errores parciales, informa cuántas citas se crearon y por qué fallaron las demás.
- El botón y su etiqueta se recuperan después de éxito, rechazo o fallo de conexión.
- Se validaron tres escenarios: sesión vencida, rechazo del servidor y creación correcta.
- No se modificaron Pagos, Pasaporte, Agenda, backend ni las ramas de modularización.
- No se publicó en `main` durante esta validación.
