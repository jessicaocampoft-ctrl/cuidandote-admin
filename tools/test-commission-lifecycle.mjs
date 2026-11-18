import fs from 'node:fs';
import vm from 'node:vm';

const kv = {};
const elements = {};
const element = id => elements[id] ||= {
  value: id === 'comisMes' ? '2026-11' : '',
  options: [],
  style: {},
  innerHTML: '',
  appendChild(option) { this.options.push(option); }
};

const window = {
  PanelStorage: { _flushKV() {} },
  PanelCommercialSales: { getOpportunities: () => [] }
};
const context = {
  window,
  document: { getElementById: element, createElement: () => ({}) },
  localStorage: { getItem: () => null },
  currentAdminUser: { nombre: 'Jessica', rol: 'Superadministradora' },
  META_SESIONES_SEMANA: 10,
  allData: { eventos: [] },
  kvGet: key => kv[key],
  kvSet: (key, value) => { kv[key] = String(value); },
  fmtPeso: value => `COP ${Math.round(Number(value) || 0)}`,
  citasReales: () => [],
  getLeadsMes: () => 0,
  getKPIManual: () => ({}),
  getEncuestaStats: () => ({}),
  normDate: value => value,
  parsePrecio: value => Number(value) || 0,
  console
};

vm.createContext(context);
vm.runInContext("Date.prototype.toLocalDateStr = function () { return `${this.getFullYear()}-${String(this.getMonth()+1).padStart(2,'0')}-${String(this.getDate()).padStart(2,'0')}`; };", context);
vm.runInContext(fs.readFileSync('js/modules/commissions.js', 'utf8'), context);

window.PanelCommissions.renderComisiones();
window.PanelCommissions.setCommissionLifecycle('auxiliar', 'revision');
window.PanelCommissions.setCommissionLifecycle('auxiliar', 'aprobar');
let records = JSON.parse(kv.commission_lifecycle_v1);
if (records['2026-11:auxiliar'].state !== 'Aprobada' || records['2026-11:auxiliar'].snapshot.amount !== 0) {
  throw new Error('La aprobación no congeló correctamente la liquidación.');
}

window.PanelCommissions.setCommissionLifecycle('auxiliar', 'pagar');
records = JSON.parse(kv.commission_lifecycle_v1);
if (records['2026-11:auxiliar'].state !== 'Pagada manualmente') {
  throw new Error('El pago manual no respetó el flujo de aprobación.');
}

console.log('PRUEBA APROBADA: borrador → revisión → aprobación congelada → pago manual.');
