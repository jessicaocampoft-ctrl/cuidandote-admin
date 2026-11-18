# Cuidándote Intelligence — diagnóstico y modelo de datos

## Estado de la primera fase

El módulo **Inteligencia Empresarial** está integrado al panel administrativo. Lee los datos existentes, no edita registros operativos y no transmite información clínica a un modelo externo.

## Fuentes reutilizadas

| Dominio | Fuente existente | Uso en Inteligencia Empresarial |
|---|---|---|
| Agenda | `allData.citas` | Citas activas, atendidas, canceladas, servicios, profesional, hora y valor explícito. |
| Pagos | `operationsData.pagos` | Única fuente para ingresos efectivamente cobrados; se deduplica por identificador de pago. |
| Cobros pendientes | Cita activa + valor explícito - pagos vinculados | Estimación conciliable, sin volver a sumar el mismo pago. |
| Gastos | `egresos` en AdminKV | Gastos registrados para resultado operativo; no usa costos de referencia como gasto real. |
| Gestión Comercial | `PanelCommercialSales.getOpportunities()` | Pipeline, seguimientos vencidos, valor comercial y atribución explícita. |
| Equipo | `teamData` | Se consulta sólo si trae horarios configurados; sin ese dato la ocupación se informa como no calculable. |

## Semántica contable aplicada

1. **Venta/contratación:** valor registrado en una oportunidad comercial cerrada. No es efectivo y no se usa para ingresos cobrados.
2. **Servicio confirmado:** valor explícito de una cita activa; las citas canceladas, reprogramadas, vencidas y no asistidas no suman.
3. **Pago recibido:** pagos aprobados/verificados con fecha de pago en el período. Esta es la fuente exclusiva de ingresos cobrados.
4. **Prestación:** cita marcada atendida/realizada/completada. Se muestra como productividad, no como cobro adicional.

Por diseño, los anticipos y abonos se suman una vez desde la tabla de pagos. Las sesiones de paquetes no se vuelven a facturar desde la agenda.

## Información disponible pero incompleta

- La agenda tiene servicio, estado, fecha y normalmente precio, pero la duración no es uniforme. El módulo usa una duración operativa sólo para carga observada y declara la ocupación como no calculable si no hay horarios configurados del equipo.
- Los costos de referencia existentes son presupuestos, no gastos reales; el resultado operativo usa únicamente egresos registrados.
- Los eventos, planes y entrenamiento ya existen en otros módulos, pero su reconciliación contable completa requiere definir una política única de fecha de contratación, fecha de pago y reconocimiento de servicio antes de incluirlos en el cierre gerencial.
- No se calcula ninguna comisión definitiva: se conserva la atribución comercial existente y se evita asignar captaciones espontáneas a Michelle.

## Próximas fases

1. Normalizar duración, profesional asignado y motivo de cancelación en cada cita.
2. Exponer la configuración real de horarios/camillas como capacidad consultable y validar ocupación contra ella.
3. Conciliar formalmente pagos, planes, entrenamiento y eventos con identificadores de contratación para informes de cierre.
4. Configurar una integración de entrega para informes programados; hasta entonces el panel sólo genera y conserva informes manuales.
5. Integrar un proveedor de IA sólo con datos agregados, credenciales en servidor y trazabilidad de preguntas; nunca con notas clínicas o acciones de modificación automática.
