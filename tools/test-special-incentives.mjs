import fs from 'node:fs';
import vm from 'node:vm';

const kv = {
  special_incentives_config_v1: JSON.stringify({
    socialResponsible: 'Equipo de redes',
    calendars: { '2026-11': { planned: 10, published: 9 } }
  }),
  special_incentives_sources_v1: '{}',
  commercial_incentives_status_v1: '{}'
};
const appointments = [];
const payments = [];
const opportunities = [];

for (let index = 1; index <= 15; index += 1) {
  const id = `C${index}`;
  const phone = `3000000${String(index).padStart(3, '0')}`;
  appointments.push({ id, fecha: '2026-11-10', telefono: phone, estado: index <= 5 ? 'Atendida' : 'Confirmada' });
  opportunities.push({ id: `O${index}`, patientName: `Red ${index}`, phone, firstContact: '2026-11-02', origin: 'Instagram', appointmentId: id, saleValue: 70000, capturedBy: 'Redes' });
  if (index <= 5) payments.push({ CitaID: id, EstadoPago: 'PAGO_APROBADO', ValorRecibido: 70000 });
}
opportunities.push({ id: 'N1', patientName: 'Paciente Natalia', phone: '3110000000', firstContact: '2026-11-03', origin: 'Referido', appointmentId: 'CN1', saleValue: 50000, capturedBy: 'Natalia Rodríguez' });
appointments.push({ id: 'CN1', fecha: '2026-11-12', telefono: '3110000000', estado: 'Atendida' });
payments.push({ CitaID: 'CN1', EstadoPago: 'Aprobado', ValorRecibido: 50000 });
kv.special_incentives_sources_v1 = JSON.stringify(Object.fromEntries(opportunities.filter(item => item.origin === 'Instagram').map(item => [item.id, { social: 'organic' }])));

const window = {
  renderComisiones() {},
  kvGet: key => kv[key],
  kvSet: (key, value) => { kv[key] = String(value); },
  PanelStorage: { _flushKV() {} },
  PanelCommercialSales: { getOpportunities: () => opportunities },
  allData: { citas: appointments },
  operationsData: { pagos: payments }
};
const context = {
  window,
  document: { getElementById: () => null, createElement: () => ({}) },
  currentAdminUser: { nombre: 'Jessica', rol: 'Superadministradora' },
  setTimeout() {},
  console
};

vm.createContext(context);
vm.runInContext(fs.readFileSync('js/modules/commercial-incentives.js', 'utf8'), context);
const test = window.PanelSpecialIncentives._test;
const social = test.socialData('2026-11');
const natalia = test.nataliaData('2026-11');
if (social.leads.length !== 15 || social.buyers.length !== 5 || social.calculated !== 75000) throw new Error('El bono de redes no aplicó el nivel 15/5.');
if (natalia.candidates.length !== 1 || natalia.calculated !== 10000) throw new Error('El incentivo por paciente nuevo de Natalia no se calculó una sola vez.');

window.PanelSpecialIncentives.saveNataliaStatus('2026-11', 'En revisión');
window.PanelSpecialIncentives.saveNataliaStatus('2026-11', 'Aprobada');
window.PanelSpecialIncentives.saveNataliaStatus('2026-11', 'Pagada manualmente');
const state = JSON.parse(kv.special_incentives_status_v1)['natalia-2026-11'];
if (state.state !== 'Pagada manualmente' || state.amount !== 10000) throw new Error('El flujo de aprobación/pago de Natalia no se conservó.');

console.log('PRUEBA APROBADA: redes 15/5 = 75.000; Natalia = 10.000 por un paciente nuevo, sin depender del servicio.');
