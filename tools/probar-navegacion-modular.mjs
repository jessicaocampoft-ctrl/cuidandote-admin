import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('js/core/navigation.js', 'utf8');
const calls = [];

class MockClassList {
  constructor(initial = []) { this.values = new Set(initial); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  contains(value) { return this.values.has(value); }
}

class MockElement {
  constructor(id, classes = []) {
    this.id = id;
    this.style = { display: '' };
    this.classList = new MockClassList(classes);
    this.attributes = {};
    this.value = '';
    this.offsetWidth = 100;
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
}

const views = [
  'dashboard','acciones','espera','automatizaciones','tareas','tareasConfig',
  'agenda','nueva','calendario','bloquear','pacientes','equipo','basedatos',
  'codigos','paquetes','recordatorios','finanzas','pagos','guiakpis',
  'presupuesto','seguimiento','mensajes','empresas','pasaporte','comisiones',
  'guioneswa','recuperacion'
];

const elements = new Map();
for (const view of views) {
  const suffix = view.charAt(0).toUpperCase() + view.slice(1);
  elements.set('v' + suffix, new MockElement('v' + suffix));
  elements.set('sb-' + view, new MockElement('sb-' + view, view === 'pagos' ? ['sb-secondary'] : []));
}
for (const id of ['sidebar','sbToolsToggle','fabAgendar','fSearch','fStatus','fMod','fService','fDesde','fHasta']) {
  elements.set(id, new MockElement(id));
}

elements.get('sidebar').classList.add('open');

const document = {
  getElementById(id) { return elements.get(id) || null; },
  querySelectorAll() { return []; }
};

const sessionStorage = {
  getItem() { return null; },
  setItem() {}
};

function stub(name, result) {
  return (...args) => {
    calls.push({ name, args });
    return result;
  };
}

const context = {
  window: {},
  document,
  sessionStorage,
  requestAnimationFrame: fn => fn(),
  console,
  Promise,
  _syncMobileNav: stub('_syncMobileNav'),
  gFitHeight: stub('gFitHeight'),
  renderAgenda: stub('renderAgenda'),
  renderBloqueos: stub('renderBloqueos'),
  renderPacientes: stub('renderPacientes'),
  loadTeamData: stub('loadTeamData', Promise.resolve({})),
  renderEquipo: stub('renderEquipo'),
  renderCalendar: stub('renderCalendar'),
  cargarRecordatorios: stub('cargarRecordatorios'),
  renderBasedatos: stub('renderBasedatos'),
  initFormDB: stub('initFormDB'),
  renderChangeLog: stub('renderChangeLog'),
  renderReactivacion: stub('renderReactivacion'),
  renderFinanzas: stub('renderFinanzas'),
  actualizarContadorLeads: stub('actualizarContadorLeads'),
  _renderEncuestaStatsUI: stub('_renderEncuestaStatsUI'),
  getEncuestaStats: stub('getEncuestaStats', {}),
  loadOperationsData: stub('loadOperationsData', Promise.resolve({})),
  renderPagos: stub('renderPagos'),
  renderSeguimiento: stub('renderSeguimiento'),
  renderTareas: stub('renderTareas'),
  initTareasConfig: stub('initTareasConfig'),
  renderPaquetes: stub('renderPaquetes'),
  renderMensajes: stub('renderMensajes'),
  renderEmpresas: stub('renderEmpresas'),
  renderCodigos: stub('renderCodigos'),
  renderKPIGuia: stub('renderKPIGuia'),
  loadRutinaChecks: stub('loadRutinaChecks'),
  loadKPIHistoryFromServer: stub('loadKPIHistoryFromServer'),
  renderPresupuestoMetas: stub('renderPresupuestoMetas'),
  renderComisiones: stub('renderComisiones'),
  renderRecuperaciones: stub('renderRecuperaciones'),
  renderCentroAcciones: stub('renderCentroAcciones'),
  renderWaitList: stub('renderWaitList'),
  loadAutomationCenter: stub('loadAutomationCenter')
};
context.window = context;

vm.runInNewContext(source, context, { filename: 'js/core/navigation.js' });

if (!context.PanelNavigation || typeof context.PanelNavigation.showView !== 'function') {
  throw new Error('PanelNavigation.showView no quedó disponible.');
}

const showView = context.PanelNavigation.showView;

for (const view of views) {
  calls.length = 0;
  const result = showView(view);
  await Promise.resolve();
  await Promise.resolve();

  if (result === false) throw new Error(`La vista ${view} fue rechazada.`);
  const targetId = 'v' + view.charAt(0).toUpperCase() + view.slice(1);
  if (elements.get(targetId).style.display !== 'block') {
    throw new Error(`La vista ${view} no quedó visible.`);
  }
  for (const other of views) {
    if (other === view) continue;
    const otherId = 'v' + other.charAt(0).toUpperCase() + other.slice(1);
    if (elements.get(otherId).style.display !== 'none') {
      throw new Error(`Al abrir ${view}, la vista ${other} no se ocultó.`);
    }
  }
  if (!elements.get('sb-' + view).classList.contains('active')) {
    throw new Error(`El menú ${view} no quedó activo.`);
  }
}

showView('citas');
if (elements.get('vAgenda').style.display !== 'block') {
  throw new Error('El alias citas no abrió Agenda.');
}

const invalid = showView('vista-inexistente');
if (invalid !== false) {
  throw new Error('Una vista inexistente debe devolver false.');
}

const expectedCalls = {
  agenda: 'renderAgenda',
  pagos: 'renderPagos',
  finanzas: 'renderFinanzas',
  pacientes: 'renderPacientes',
  paquetes: 'renderPaquetes',
  empresas: 'renderEmpresas',
  acciones: 'renderCentroAcciones',
  espera: 'renderWaitList',
  automatizaciones: 'loadAutomationCenter'
};

for (const [view, expected] of Object.entries(expectedCalls)) {
  calls.length = 0;
  showView(view);
  await Promise.resolve();
  await Promise.resolve();
  if (!calls.some(call => call.name === expected)) {
    throw new Error(`${view} no llamó ${expected}.`);
  }
}

console.log('PRUEBA DE NAVEGACIÓN SUPERADA');
console.log(`- ${views.length} vistas recorridas`);
console.log('- Alias citas → agenda validado');
console.log('- Vista inexistente controlada');
console.log('- Cargas específicas de módulos verificadas');
