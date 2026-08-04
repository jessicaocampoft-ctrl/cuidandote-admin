# Auditoría técnica del panel administrativo

Fecha de inicio: 2026-08-04
Rama de trabajo: `auditoria-panel-2026-08-04`

## Objetivo

Revisar el panel por módulos, corregir fallas sin hacer cambios directos y no validados en producción, y establecer controles para evitar regresiones.

## Hallazgo crítico inicial

El último script de corrección del módulo de pagos insertó mensajes de diagnóstico antes de `<!DOCTYPE html>` en `index.html`. Las correcciones funcionales de pagos deben conservarse, pero el encabezado contaminado debe retirarse antes de una nueva publicación.

## Módulos que se auditarán

1. Inicio de sesión, sesión, permisos y cierre de sesión.
2. Inicio y carga general de datos.
3. Agenda y control diario.
4. Equipo clínico.
5. Base de datos.
6. Códigos REF y bonos.
7. Paquetes.
8. Finanzas.
9. Automatizaciones.
10. Lista de espera.
11. Pagos y autorización para atender.
12. Indicadores de gestión.
13. Presupuesto y metas.
14. Comisiones.
15. Recordatorios.
16. Seguimiento.
17. Mensajes.
18. Empresas.
19. Pasaporte.
20. Exportaciones, archivos y comprobantes.

## Estado inicial

| Módulo | Estado | Observación |
|---|---|---|
| Pagos | Fallo confirmado | Se detectó incompatibilidad de estados y contaminación del HTML por el script de corrección anterior. |
| Pasaporte | Pendiente de regresión | Debe validarse creación, edición, enlace seguro, token, visualización y progreso. |
| Inicio de sesión | Pendiente | Debe validarse acceso autorizado, rechazo de credenciales, persistencia, permisos y cierre. |
| Resto del panel | Pendiente | No se certificará ningún módulo únicamente porque la pantalla cargue. |

## Regla de liberación

Ningún cambio se enviará a `main` hasta cumplir:

- revisión estática del código;
- prueba del flujo principal;
- prueba de error controlado;
- confirmación de que no rompe pagos, sesión ni pasaporte;
- respaldo y ruta de reversión;
- comparación exacta de archivos antes de publicar.

## Prevención de errores futuros

- Separar progresivamente el archivo monolítico `index.html` en módulos independientes.
- Centralizar estados y nombres de acciones de la API.
- Crear un entorno o rama de pruebas antes de producción.
- Agregar pruebas automáticas de humo para inicio de sesión, carga, pagos, pasaporte y cierre de sesión.
- Prohibir scripts que escriban mensajes de consola dentro del contenido que están transformando.
- Hacer cambios mediante ramas y solicitudes de revisión, nunca directamente sobre producción.
- Mantener una lista de pruebas obligatorias para cada publicación.

## Matriz mínima de pruebas

Cada módulo debe probarse con:

1. Apertura y renderizado.
2. Carga de datos.
3. Creación.
4. Edición.
5. Acción principal.
6. Validaciones obligatorias.
7. Manejo de error de red o backend.
8. Persistencia tras recargar.
9. Permisos del usuario.
10. No regresión sobre sesión, pagos y pasaporte.
