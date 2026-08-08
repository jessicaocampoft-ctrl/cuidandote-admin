import fs from 'node:fs';

function read(path) { return fs.readFileSync(path, 'utf8'); }
function write(path, value) { fs.writeFileSync(path, value, 'utf8'); }
function replaceOnce(text, oldValue, newValue, label) {
  const count = text.split(oldValue).length - 1;
  if (count === 0 && text.includes(newValue)) return text;
  if (count !== 1) throw new Error(`${label}: se esperaba 1 coincidencia y se encontraron ${count}`);
  return text.replace(oldValue, newValue);
}

// 1) Conservar hotfix de login publicado: adminLogin espera hasta 120 s.
{
  const path = 'js/core/session.js';
  let s = read(path);
  const oldBlock = `      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {\n        method: 'POST',\n        body: JSON.stringify({ action: 'adminLogin', user, password })\n      }, 45000);`;
  const newBlock = `      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {\n        method: 'POST',\n        body: JSON.stringify({ action: 'adminLogin', user, password })\n      }, 120000);`;
  s = replaceOnce(s, oldBlock, newBlock, 'Timeout de adminLogin');
  write(path, s);
}

// 2) Conservar hotfix de creación de citas publicado.
{
  const path = 'js/modules/appointment-create.js';
  let s = read(path);

  s = replaceOnce(s,
`  const btn = document.getElementById('ncSubmitBtn');\n  const origLabel = document.getElementById('ncSubmitLabel').textContent;\n  btn.disabled = true;\n\n  // Datos base de la cita`,
`  const btn = document.getElementById('ncSubmitBtn');\n  const label = document.getElementById('ncSubmitLabel');\n  const origLabel = label.textContent;\n  btn.disabled = true;\n\n  const restoreSubmitButton = () => {\n    _submittingBooking = false;\n    btn.disabled = false;\n    label.textContent = origLabel;\n  };\n\n  // Confirmar que la sesión administrativa siga activa antes de enviar datos.\n  try {\n    const pingResponse = await fetch(\`${'${APPS_SCRIPT_URL}'}?action=ping&token=${'${encodeURIComponent(TOKEN)}'}\`);\n    const pingData = await pingResponse.json();\n    if (!pingData.ok) {\n      restoreSubmitButton();\n      const sessionExpired = String(pingData.error || '').toLowerCase().includes('permiso');\n      toast(sessionExpired\n        ? 'Tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'\n        : 'No se pudo validar tu sesión: ' + (pingData.error || 'respuesta inválida del servidor.'), 'err');\n      return;\n    }\n  } catch (error) {\n    restoreSubmitButton();\n    toast('No se pudo conectar con el servidor para validar la sesión. Revisa la conexión e inténtalo nuevamente.', 'err');\n    return;\n  }\n\n  // Datos base de la cita`,
  'Validación de sesión antes de crear cita');

  s = replaceOnce(s,
`  let creadas = 0, errores = 0;`,
`  let creadas = 0, errores = 0;\n  const erroresDetalle = [];`,
  'Detalle de errores de agendamiento');

  s = replaceOnce(s,
`      const d = await r.json();\n      if (d.ok) creadas++; else errores++;\n    } catch(e) { errores++; }`,
`      const d = await r.json();\n      if (d.ok) {\n        creadas++;\n      } else {\n        errores++;\n        erroresDetalle.push(d.error || 'El servidor rechazó la cita.');\n      }\n    } catch(e) {\n      errores++;\n      erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');\n    }`,
  'Error detallado primera persona');

  s = replaceOnce(s,
`        const d2 = await r2.json();\n        if (d2.ok) creadas++; else errores++;\n      } catch(e) { errores++; }`,
`        const d2 = await r2.json();\n        if (d2.ok) {\n          creadas++;\n        } else {\n          errores++;\n          erroresDetalle.push(d2.error || 'El servidor rechazó la cita de la segunda persona.');\n        }\n      } catch(e) {\n        errores++;\n        erroresDetalle.push(e && e.message ? e.message : 'Error de conexión con el servidor.');\n      }`,
  'Error detallado segunda persona');

  s = replaceOnce(s,
`  _submittingBooking = false;\n  btn.disabled = false;\n  document.getElementById('ncSubmitLabel').textContent = origLabel;\n\n  if (errores > 0) {\n    toast(\`${'${creadas}'} cita${'${creadas!==1?\'s\':\'\'}'} creada${'${creadas!==1?\'s\':\'\'}'} · ${'${errores}'} error${'${errores!==1?\'es\':\'\'}'}\`, 'warn');\n  } else {`,
`  restoreSubmitButton();\n\n  if (errores > 0) {\n    const detalle = [...new Set(erroresDetalle.filter(Boolean))].join(' · ') || 'El servidor no explicó el motivo.';\n    const sessionExpired = detalle.toLowerCase().includes('sin permiso');\n    if (creadas === 0) {\n      toast(sessionExpired\n        ? 'No se creó la cita porque tu sesión venció. Cierra sesión, vuelve a ingresar y crea la cita una sola vez.'\n        : 'No se creó la cita: ' + detalle, 'err');\n    } else {\n      toast(\`${'${creadas}'} cita${'${creadas!==1?\'s\':\'\'}'} creada${'${creadas!==1?\'s\':\'\'}'} · ${'${errores}'} sin crear: ${'${detalle}'}\`, 'warn');\n    }\n  } else {`,
  'Restauración y mensaje final de agendamiento');

  write(path, s);
}

// 3) Conservar etiquetas visibles publicadas, sin cambiar valores internos.
{
  const path = 'index.html';
  let s = read(path);
  const replacements = [
    ['<option value="Valoración Funcional">Valoración Funcional</option>', '<option value="Valoración Funcional">Valoración fisioterapéutica inicial</option>'],
    ['<option value="Readaptación Funcional">Readaptación Funcional</option>', '<option value="Readaptación Funcional">Rehabilitación y readaptación funcional</option>'],
    ['<option value="Readaptación">Readaptación Funcional</option>', '<option value="Readaptación">Rehabilitación y readaptación funcional</option>'],
    ['<option>Valoración Funcional</option>', '<option value="Valoración Funcional">Valoración fisioterapéutica inicial</option>'],
    ['<option>Readaptación Funcional</option>', '<option value="Readaptación Funcional">Rehabilitación y readaptación funcional</option>']
  ];
  for (const [oldValue, newValue] of replacements) {
    if (!s.includes(oldValue)) continue;
    s = s.split(oldValue).join(newValue);
  }

  // 4) Cargar el módulo de horarios públicos al final, igual que producción actual.
  if (!s.includes('public-schedule-admin.js')) {
    const anchor = '<script src="js/modules/survey-measurement.js"></script>\n</body>';
    const replacement = '<script src="js/modules/survey-measurement.js"></script>\n<script src="public-schedule-admin.js?v=20260807-1"></script>\n</body>';
    s = replaceOnce(s, anchor, replacement, 'Carga final de horarios públicos');
  }
  write(path, s);
}

console.log('Integración funcional aplicada: agendamiento, login, etiquetas y horarios públicos preservados.');