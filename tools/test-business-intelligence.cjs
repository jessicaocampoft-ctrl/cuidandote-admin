const assert = require('node:assert/strict');
const { compute, DEFAULTS } = require('../js/modules/business-intelligence.js');

const input = {
  appointments: [
    { id: 'A1', fecha: '2026-11-10', estado: 'Atendida', precio: 100000, servicio: 'Readaptación', profesional: 'Jessica', hora: '09:00' },
    { id: 'A2', fecha: '2026-11-11', estado: 'Cancelada', precio: 90000, servicio: 'Descarga', profesional: 'Natalia', hora: '10:00' },
    { id: 'A3', fecha: '2026-11-12', estado: 'Confirmada', precio: 150000, servicio: 'Valoración', profesional: 'Jessica', hora: '15:00' },
    { id: 'A4', fecha: '2026-11-13', estado: 'Reprogramada', precio: 110000, servicio: 'Readaptación', profesional: 'Jessica', hora: '16:00' },
    { id: 'A5', fecha: '2026-11-13', estado: 'No asistió', precio: 110000, servicio: 'Readaptación', profesional: 'Jessica', hora: '17:00' },
    { id: 'O1', fecha: '2026-10-10', estado: 'Confirmada', precio: 80000, servicio: 'Valoración', profesional: 'Jessica', hora: '09:00' }
  ],
  payments: [
    { ID: 'P1', CitaID: 'A1', FechaPago: '2026-11-10', EstadoPago: 'PAGO_APROBADO', ValorRecibido: 100000 },
    { ID: 'P1', CitaID: 'A1', FechaPago: '2026-11-10', EstadoPago: 'PAGO_APROBADO', ValorRecibido: 100000 },
    { ID: 'P2', CitaID: 'A3', FechaPago: '2026-11-12', EstadoPago: 'PAGO_APROBADO', ValorRecibido: 50000 }
  ],
  expenses: [{ fecha: '2026-11-03', monto: 30000 }],
  opportunities: [
    { firstContact: '2026-11-02', status: 'Venta cerrada', saleValue: 250000, capturedBy: 'Michelle' },
    { firstContact: '2026-11-01', status: 'Contactado', followUpAt: '2026-11-01T09:00', saleValue: 0 }
  ],
  team: {}
};

const metrics = compute(input, '2026-11', { settings: DEFAULTS });
assert.equal(metrics.cashReceived, 150000, 'no debe duplicar pagos con el mismo ID');
assert.equal(metrics.confirmedValue, 250000, 'no debe incluir una cita cancelada');
assert.equal(metrics.accountsReceivable, 100000, 'saldo = valor de citas activas menos pagos vinculados');
assert.equal(metrics.expenses, 30000);
assert.equal(metrics.operatingResult, 120000);
assert.equal(metrics.commercialValue, 250000, 'ventas CRM no se mezclan con efectivo cobrado');
assert.equal(metrics.occupancy, null, 'sin horario real configurado no se inventa ocupación');
assert.equal(metrics.cancelledAppointments, 1);
assert.equal(metrics.rescheduledAppointments, 1, 'reprogramada no se cuenta como cancelación');
assert.equal(metrics.noShowAppointments, 1, 'ausencia se reporta de forma independiente');
assert.equal(metrics.byProfessional.Jessica.count, 2);
assert.ok(metrics.alerts.some(item => item.title.includes('Cobros pendientes')));

const capacityInput = {
  ...input,
  weeklySchedule: [
    { enabled:false, ranges:[] }, { enabled:true, ranges:[['08:00','09:00']] },
    { enabled:false, ranges:[] }, { enabled:false, ranges:[] }, { enabled:false, ranges:[] },
    { enabled:false, ranges:[] }, { enabled:false, ranges:[] }
  ],
  blocks: [{ fecha:'2026-11-02', inicio:'08:30', fin:'09:00', camillas:1 }]
};
const capacityMetrics = compute(capacityInput, '2026-11', { settings: DEFAULTS });
assert.equal(capacityMetrics.capacityMinutes, 570, 'jornada de sede por dos camillas menos bloqueo explícito');
assert.equal(capacityMetrics.occupancy, 19, 'ocupación con duraciones observadas y capacidad real');
assert.equal(metrics.comparison.month, '2026-10');
console.log('OK: cálculos de inteligencia empresarial verificados');
