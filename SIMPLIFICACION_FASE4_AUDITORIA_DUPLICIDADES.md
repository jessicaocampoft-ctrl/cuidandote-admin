# Simplificación Fase 4 — Auditoría de duplicidades

## Objetivo

Reducir pantallas y puntos de entrada sin eliminar capacidades ni cambiar datos. Esta fase es deliberadamente documental: identifica solapamientos y propone una arquitectura final. Las retiradas funcionales se harán solo después de confirmar cada decisión.

## 1. Pacientes vs Base de datos — DUPLICIDAD ALTA

### Hallazgo
`patient-records.js` y `database.js` construyen ambos una lista consolidada de pacientes cruzando `allData.pacientes` con `allData.citas`, deduplican por teléfono/email/nombre, cuentan sesiones, calculan última visita y permiten editar/eliminar.

`Pacientes` aporta además historial, nueva cita, encuesta, WhatsApp y acceso a Pasaporte.

`Base de datos` aporta además alta manual de paciente, origen/referido y reactivación por inactividad.

### Recomendación
Conservar **Pacientes** como única entrada visible y absorber dentro de ella tres pestañas:
1. Pacientes / historial.
2. Registrar paciente.
3. Reactivación.

Después de comprobar paridad, retirar solo la entrada de menú **Base de datos**; no eliminar sus funciones hasta completar la migración.

### Decisión a confirmar
¿La administración necesita registrar pacientes que todavía no tienen ninguna cita? Si sí, el formulario manual debe permanecer como pestaña dentro de Pacientes.

---

## 2. Control Diario vs Tareas vs Centro de acciones — DUPLICIDAD DE NAVEGACIÓN

### Hallazgo
`operations-automation.js` ya es el motor de tareas post-sesión y alertas operativas. Simplificación 2 creó `daily-control.js` como bandeja que reutiliza esas tareas junto con pagos, cierres, cobros, bonos, reagendamientos, empresas y preparación del día siguiente.

Por tanto, **Tareas** ya no necesita ser un destino cotidiano: puede quedar como vista detallada/configuración. El **Centro de acciones** debe revisarse antes de conservarlo porque, después del Control Diario, cualquier tarjeta que solo replique pendientes se vuelve redundante.

### Recomendación
- **Control Diario / Inicio** = única bandeja operativa diaria.
- **Tareas** = detalle/configuración de plantillas y trazabilidad, accesible desde Gestión.
- **Centro de acciones** = retirar de navegación si no contiene una acción única que el Control Diario no tenga.

### Decisión a confirmar
Revisar visualmente Centro de acciones y enumerar cualquier función exclusiva antes de retirarlo.

---

## 3. Seguimiento vs Recordatorios vs Recuperación — DUPLICIDAD MUY ALTA

### Hallazgo
`patient-follow-up.js` maneja pacientes con descarga/readaptación que necesitan contacto, semanas de reagendamiento, WhatsApp, estados de reagendado y log.

`reminders.js` vuelve a trabajar sobre el mismo concepto de pacientes con varias semanas sin sesión y añade envío de email mediante `getReminders` / `sendReminders`.

`patient-recovery.js` mezcla dos responsabilidades distintas:
- recontacto de personas inactivas y mensajes de recuperación;
- registro manual de ventas/comisiones de recuperación.

### Recomendación
Crear un único módulo visible **Seguimiento** con subáreas:
1. Post-sesión / tareas inmediatas.
2. Reagendamiento por semanas.
3. Inactivos / reactivación.
4. Envío por WhatsApp o email.

Mover la parte monetaria de `Recuperación` a **Comisiones**.

Cuando se compruebe paridad:
- retirar la pantalla independiente **Recordatorios**;
- retirar la pantalla independiente **Recuperación**;
- conservar sus acciones únicas dentro de Seguimiento y Comisiones.

### Punto crítico
No eliminar `getReminders`, `sendReminders` ni `getInactivos` mientras haya funciones que dependan de esas consultas.

---

## 4. Mensajes vs Guiones WA vs plantillas de Tareas — DUPLICIDAD ALTA

### Hallazgo
`message-library.js` contiene tanto la biblioteca editable de **Mensajes** (`renderMensajes`, categorías y mensajes predeterminados) como las funciones `g*` que gestionan los **Guiones WA**. Es decir, las dos interfaces ya viven dentro del mismo módulo.

Además, `operations-automation.js` mantiene otra colección independiente de plantillas para seguimiento post-sesión. Existen textos equivalentes en la biblioteca de mensajes y en Tareas, lo que permite que una plantilla se actualice en un sitio y quede vieja en otro.

### Recomendación
Conservar una sola pantalla **Mensajes** con pestañas:
1. Respuestas rápidas.
2. Guiones de servicios/paquetes.
3. Plantillas automáticas de seguimiento.

Hacer que Tareas consulte una única fuente de plantillas, en lugar de mantener textos duplicados.

Después de migrar:
- retirar la entrada independiente **Guiones WA**;
- mantener `whatsapp-tools.js` como infraestructura interna, no como una pantalla adicional.

---

## 5. Finanzas vs Indicadores vs Presupuesto vs Comisiones vs Reportes — FRAGMENTACIÓN, NO DUPLICIDAD FUNCIONAL

### Hallazgo
Estos módulos comparten datos y se llaman entre sí, pero cumplen responsabilidades diferentes:
- `finance.js`: ingresos/egresos y estructura financiera.
- `budget.js`: metas, presupuesto y costos.
- `kpi.js`: indicadores de gestión.
- `commissions.js`: cálculo y pago de comisiones.
- `monthly-report.js`, `smart-metrics.js`, `income-analysis.js`: análisis/reportes.

No conviene borrar estos módulos. El problema es que el usuario debe navegar entre demasiadas pantallas para entender la gestión del negocio.

### Recomendación
Crear una única entrada **Gestión financiera** con pestañas:
1. Resumen financiero.
2. Metas y presupuesto.
3. Indicadores.
4. Comisiones.
5. Reportes y análisis.

**Pagos** debe permanecer independiente porque es un flujo operativo diario, no solo análisis financiero.

---

## 6. Agenda vs Google Calendar — NO SON DUPLICADOS

### Hallazgo
Agenda es el flujo operativo de citas del panel. Google Calendar es una integración/calendario externo.

### Recomendación
- Agenda continúa como acceso principal.
- Google Calendar queda como herramienta secundaria dentro de Gestión/Integraciones.
- No fusionar datos ni eliminar la integración.

Simplificación 1 y 3 ya reducen su protagonismo en la navegación sin quitarlo.

---

## 7. Pasaporte dentro de Pacientes — RELACIÓN, NO DUPLICIDAD

Pacientes permite abrir el Pasaporte de una persona, pero Pasaporte tiene un flujo propio de administración. Por ahora conviene mantener **Pasaporte** como acceso principal y también como acción contextual desde Pacientes.

Revisar su frecuencia de uso después de varias semanas antes de decidir si deja de ser un botón principal.

---

## Arquitectura objetivo propuesta

### Navegación principal
- Inicio / Control Diario
- Agenda
- Pacientes
- Pagos
- Seguimiento
- Pasaporte

### Gestión
- Gestión financiera
- Equipo
- Paquetes
- Empresas / convenios
- Mensajes
- Integraciones (Google Calendar, automatizaciones)
- Configuración / herramientas

### Funciones que podrían dejar de tener pantalla propia
- Base de datos → dentro de Pacientes.
- Tareas → detalle desde Control Diario / Gestión.
- Recordatorios → dentro de Seguimiento.
- Recuperación → Seguimiento + Comisiones.
- Guiones WA → dentro de Mensajes.
- Indicadores, Presupuesto, Comisiones y Reportes → pestañas de Gestión financiera, conservando módulos internos.
- Centro de acciones → candidato a retiro si Control Diario cubre todas sus acciones.

## Orden seguro para implementar después de aprobación

1. Unificar Pacientes + Base de datos.
2. Unificar Mensajes + Guiones + plantillas.
3. Unificar Seguimiento + Recordatorios + Inactivos.
4. Separar de Recuperación la parte de comisiones y moverla a Comisiones.
5. Crear hub de Gestión financiera sin cambiar cálculos.
6. Revisar Centro de acciones y retirar solo si no conserva nada único.
7. Medir uso de Pasaporte, Paquetes, Empresas y Evaluación antes de ocultar más accesos.

## Seguridad

Esta auditoría no elimina código, no cambia Apps Script, no modifica `main`, no publica Pages y no toca producción.
