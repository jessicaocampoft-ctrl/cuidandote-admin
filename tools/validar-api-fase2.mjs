import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('index.html', 'utf8').replace(/^\uFEFF/, '');
const configSource = fs.readFileSync('js/core/config.js', 'utf8');
const apiSource = fs.readFileSync('js/core/api.js', 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(html.includes('<script src="js/core/config.js"></script>'), 'index.html no carga config.js.');
assert(html.includes('<script src="js/core/api.js"></script>'), 'index.html no carga api.js.');
assert(html.indexOf('js/core/config.js') < html.indexOf('js/core/api.js'), 'config.js debe cargarse antes de api.js.');
assert(html.indexOf('js/core/api.js') < html.indexOf('js/core/navigation.js'), 'api.js debe cargarse antes de navigation.js.');
assert(html.includes('const APPS_SCRIPT_URL = window.PanelConfig.APPS_SCRIPT_URL;'), 'Falta el adaptador de APPS_SCRIPT_URL.');
assert(html.includes('return window.PanelApi.fetchJsonWithTimeout(url, options, timeoutMs);'), 'Falta el adaptador de fetchJsonWithTimeout.');
assert(!/https:\/\/script\.google\.com\/macros\/s\//.test(html), 'La URL del backend todavía está escrita en index.html.');
assert(/https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(configSource), 'config.js no contiene una URL válida.');
assert(apiSource.includes('AbortController'), 'api.js perdió el control de cancelación.');
assert(apiSource.includes('El servidor respondió vacío'), 'api.js perdió el mensaje de respuesta vacía.');
assert(apiSource.includes('El servidor devolvió una respuesta inválida'), 'api.js perdió la validación JSON.');
assert(apiSource.includes('El servidor tardó demasiado'), 'api.js perdió el mensaje de timeout.');

const context = {
  window: {},
  AbortController,
  setTimeout,
  clearTimeout,
  console,
  fetch: async () => ({ text: async () => '\uFEFF {"ok":true,"valor":7}' })
};
context.window = context;
vm.createContext(context);
vm.runInContext(configSource, context, { filename: 'config.js' });
vm.runInContext(apiSource, context, { filename: 'api.js' });

assert(context.PanelConfig?.APPS_SCRIPT_URL?.startsWith('https://script.google.com/macros/s/'), 'PanelConfig no quedó disponible.');
assert(typeof context.PanelApi?.fetchJsonWithTimeout === 'function', 'PanelApi.fetchJsonWithTimeout no quedó disponible.');

const success = await context.PanelApi.fetchJsonWithTimeout('https://example.test');
assert(success.ok === true && success.valor === 7, 'La respuesta JSON válida no se procesó correctamente.');

context.fetch = async () => ({ text: async () => 'no-json' });
let invalidMessage = '';
try { await context.PanelApi.fetchJsonWithTimeout('https://example.test'); } catch (error) { invalidMessage = error.message; }
assert(invalidMessage === 'El servidor devolvió una respuesta inválida. Intenta nuevamente.', 'El error de JSON inválido cambió.');

context.fetch = async () => ({ text: async () => '   ' });
let emptyMessage = '';
try { await context.PanelApi.fetchJsonWithTimeout('https://example.test'); } catch (error) { emptyMessage = error.message; }
assert(emptyMessage === 'El servidor respondió vacío. Intenta nuevamente.', 'El error de respuesta vacía cambió.');

context.fetch = (url, options = {}) => new Promise((resolve, reject) => {
  options.signal?.addEventListener('abort', () => {
    const error = new Error('aborted');
    error.name = 'AbortError';
    reject(error);
  });
});
let timeoutMessage = '';
try { await context.PanelApi.fetchJsonWithTimeout('https://example.test', {}, 10); } catch (error) { timeoutMessage = error.message; }
assert(timeoutMessage === 'El servidor tardó demasiado. Intenta nuevamente.', 'El mensaje de timeout cambió.');

console.log('FASE 2 VALIDADA');
console.log('- Configuración separada en js/core/config.js');
console.log('- Timeout y validación JSON separados en js/core/api.js');
console.log('- Adaptadores compatibles conservados en index.html');
console.log('- Pagos, Pasaporte, Agenda y sesión no fueron trasladados');
