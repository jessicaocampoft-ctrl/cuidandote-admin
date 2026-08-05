import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

function extractNamedFunction(source, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`, 'g');
  const matches = [...source.matchAll(re)];
  if (matches.length !== 1) throw new Error(`${name}: se esperaba una declaración y se encontraron ${matches.length}.`);
  const start = matches[0].index;
  const open = source.indexOf('{', start);
  let depth = 0, quote = '', escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i + 2);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end:i + 1, text:source.slice(start, i + 1) };
    }
  }
  throw new Error(`No se pudo cerrar ${name}.`);
}

const original = extractNamedFunction(html, 'submitAdminBookingMulti');
if (original.text.includes('erroresDetalle') && original.text.includes('action=ping')) {
  console.log('El hotfix de agendamiento ya estaba aplicado.');
  process.exit(0);
}

let fn = original.text;
const setupNeedle = `  _submittingBooking = true;\n  const btn = document.getElementById('ncSubmitBtn');\n  const origLabel = document.getElementById('ncSubmitLabel').textContent;\n  btn.disabled = true;`;
const setupReplacement = `  _submittingBooking = true;\n  const btn = document.getElementById('ncSubmitBtn');\n  const label = document.getElementById('ncSubmitLabel');\n  const origLabel = label.textContent;\n  btn.disabled = true;\n\n  const restoreSubmitButton = () => {\n    _submittingBooking = false;\n    btn.disabled = false;\n    label.textContent = origLabel;\n  };\n\n  // Confirmar que la sesión administrativa siga activa antes de enviar datos.\n  try {\n    const pingResponse = await fetch(\`${'${APPS_SCRIPT_URL}'}?action=ping&token=${'${encodeURIComponent(TOKEN)}'}\`);\n    const pingData = await pingResponse.json();\n    if (!pingData.ok) {\n      restoreSubmitButton();\n      const sessionExpired = String(pingData.error || '').toLowerCase().includes('permiso');\n      toast(sessionExpired\n        ? 'Tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'\n        : 'No se pudo validar tu sesión: ' + (pingData.error || 'respuesta inválida del servidor.'), 'err');\n      return;\n    }\n  } catch (error) {\n    restoreSubmitButton();\n    toast('No se pudo conectar con el servidor para validar la sesión. Revisa la conexión e inténtalo nuevamente.', 'err');\n    return;\n  }`;
if (!fn.includes(setupNeedle)) throw new Error('No se encontró el bloque inicial esperado del botón.');
fn = fn.replace(setupNeedle, setupReplacement);

fn = fn.replace(
  '  let creadas = 0, errores = 0;',
  `  let creadas = 0, errores = 0;\n  const erroresDetalle = [];`
);

const firstRequest = `      const d = await r.json();\n      if (d.ok) creadas++; else errores++;\n    } catch(e) { errores++; }`;
const firstReplacement = `      const d = await r.json();\n      if (d.ok) {\n        creadas++;\n      } else {\n        errores++;\n        erroresDetalle.push(d.error || 'El servidor rechazó la cita.');\n      }\n    } catch(e) {\n      errores++;\n      erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');\n    }`;
if (!fn.includes(firstRequest)) throw new Error('No se encontró el bloque de respuesta de la primera persona.');
fn = fn.replace(firstRequest, firstReplacement);

const secondRequest = `        const d2 = await r2.json();\n        if (d2.ok) creadas++; else errores++;\n      } catch(e) { errores++; }`;
const secondReplacement = `        const d2 = await r2.json();\n        if (d2.ok) {\n          creadas++;\n        } else {\n          errores++;\n          erroresDetalle.push(d2.error || 'El servidor rechazó la cita de la segunda persona.');\n        }\n      } catch(e) {\n        errores++;\n        erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');\n      }`;
if (!fn.includes(secondRequest)) throw new Error('No se encontró el bloque de respuesta de la segunda persona.');
fn = fn.replace(secondRequest, secondReplacement);

const finishNeedle = `  _submittingBooking = false;\n  btn.disabled = false;\n  document.getElementById('ncSubmitLabel').textContent = origLabel;\n\n  if (errores > 0) {\n    toast(\`${'${creadas}'} cita${'${creadas!==1?\'s\':\'\'}'} creada${'${creadas!==1?\'s\':\'\'}'} · ${'${errores}'} error${'${errores!==1?\'es\':\'\'}'}\`, 'warn');`;
const finishReplacement = `  restoreSubmitButton();\n\n  if (errores > 0) {\n    const detalle = [...new Set(erroresDetalle.filter(Boolean))].join(' · ') || 'El servidor no explicó el motivo.';\n    const sessionExpired = detalle.toLowerCase().includes('sin permiso');\n    if (creadas === 0) {\n      toast(sessionExpired\n        ? 'No se creó la cita porque tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'\n        : 'No se creó la cita: ' + detalle, 'err');\n    } else {\n      toast(\`${'${creadas}'} cita${'${creadas!==1?\'s\':\'\'}'} creada${'${creadas!==1?\'s\':\'\'}'} · ${'${errores}'} sin crear: ${'${detalle}'}\`, 'warn');\n    }`;
if (!fn.includes(finishNeedle)) throw new Error('No se encontró el bloque final de errores.');
fn = fn.replace(finishNeedle, finishReplacement);

html = html.slice(0, original.start) + fn + html.slice(original.end);
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log('Hotfix de agendamiento aplicado a submitAdminBookingMulti.');
