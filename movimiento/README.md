# Cuidándote en Movimiento

> Tu plan de recuperación, estés donde estés.

**Estado:** especificación del MVP de demostración. **No está listo para pacientes reales ni para producción.**

## Cómo iniciar con Codex

Implementar la tarea [#52 — MVP demo aislado](https://github.com/jessicaocampoft-ctrl/cuidandote-admin/issues/52) en la rama `feature/cuidandote-en-movimiento-mvp`.

1. Buscar el prototipo local previo de Movimiento en el workspace del desarrollador. Si está presente, reutilizarlo; si no, documentar su ausencia y crear demo aislada aquí.
2. Ejecutar el recorrido de un plan sin conexión al panel ni datos reales: borrador → ejercicios seleccionados → revisión profesional → pago simulado → acceso de paciente ficticio → vencimiento/revocación.
3. Mantener los estados clínico, pago y acceso independientes. Solamente se permite acceso cuando los tres requisitos están cumplidos.
4. Mantener archivos del módulo en este directorio, documentar pruebas y abrir PR en borrador. **No merge / deploy.**

## Público y privacidad

Este repositorio es público. No incluir pacientes, teléfonos, cédulas, historias clínicas, recetas individualizadas, comprobantes reales, tokens o credenciales en archivos o commits. El modo demostración usará únicamente datos ficticios, sin almacenamiento de datos sensibles en el navegador.

La autorización y caducidad real deberán validarse en servidor **antes** de una salida a producción, además de revisar los requisitos de tratamiento de datos de salud en Colombia.

## Catálogo inicial revisable

- Rodilla: dolor patelofemoral, tendinopatía rotuliana y reconstrucción de LCA.
- Hombro: tendinopatía del manguito rotador.
- Espalda: dolor lumbar inespecífico.
- Tobillo: esguince lateral e inestabilidad.

Estos temas son **etiquetas para organizar contenido**; no implican tratamientos predeterminados ni publicación sin aprobación profesional.

## Modelo comercial (hipótesis a validar)

- Plan en Movimiento: precio de prueba $50.000 COP.
- Seguimiento en Movimiento mensual: precio de prueba $90.000 COP.
- Programa educativo estandarizado: precio de prueba $40.000 COP (fase futura).

Todas las tarifas deben ser configurables y validadas con pacientes antes de comercializarlas.

## Política de entrega

- Profesional: selecciona ejercicios y dosis; aprueba el plan y los enlaces de video.
- Administración: cobra, verifica comprobantes, gestiona envíos y vencimientos; no aprueba prescripciones.
- Paciente: consulta exclusivamente su plan aprobado y vigente, **una vez que exista backend seguro de producción**.

## Lista para el siguiente sprint

Autenticación y permisos a nivel de servidor, modelo de datos clínicos privado, consentimiento informado y privacidad, evidencia/auditoría de aprobaciones, PDF real, carga segura de comprobantes, canales WhatsApp aprobados y gestión efectiva de acceso/vencimiento.