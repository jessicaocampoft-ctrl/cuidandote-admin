import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8').replace(/^\uFEFF/, '');
const navigation = fs.readFileSync('js/core/navigation.js', 'utf8');
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(html.includes('<script src="js/core/navigation.js"></script>'), 'index.html no carga el módulo de navegación.');
expect((html.match(/function\s+showView\s*\(/g) || []).length === 1, 'Debe quedar un solo adaptador showView en index.html.');
expect(html.includes('return window.PanelNavigation.showView(v);'), 'showView no delega en PanelNavigation.');
expect((navigation.match(/function\s+showView\s*\(/g) || []).length === 1, 'navigation.js debe contener una sola implementación showView.');
expect(navigation.includes('window.PanelNavigation = Object.freeze({ showView });'), 'navigation.js no exporta una API inmutable.');
expect(navigation.includes("const viewAliases = { citas: 'agenda' }"), 'Se perdió el alias citas → agenda.');
expect(navigation.includes("console.warn('Vista no encontrada:', v)"), 'Se perdió la protección ante vistas inexistentes.');
expect(navigation.includes('renderAgenda'), 'El módulo no conserva la navegación de Agenda.');
expect(navigation.includes('renderPagos'), 'El módulo no conserva la navegación de Pagos.');
expect(navigation.includes('renderPasaporte'), 'El módulo no conserva la navegación de Pasaporte.');
expect(!navigation.includes('APPS_SCRIPT_URL ='), 'La navegación no debe contener configuración del backend.');
expect(!navigation.includes('saveManualPayment'), 'La navegación no debe contener el guardado de pagos.');
expect(!navigation.includes('guardarProgresoPasaporte'), 'La navegación no debe contener el guardado del pasaporte.');

const tagPosition = html.indexOf('<script src="js/core/navigation.js"></script>');
const adapterPosition = html.indexOf('function showView(v) {');
const containingScriptPosition = html.lastIndexOf('<script', adapterPosition);
expect(tagPosition >= 0 && tagPosition < containingScriptPosition, 'navigation.js debe cargarse antes del script principal.');

if (errors.length) {
  console.error('La fase 1 no superó la validación:');
  errors.forEach(error => console.error('- ' + error));
  process.exit(1);
}

console.log('FASE 1 VALIDADA');
console.log('- Navegación separada en js/core/navigation.js');
console.log('- Adaptador compatible conservado en index.html');
console.log('- Pagos, Pasaporte, Agenda y backend no fueron trasladados ni modificados');
