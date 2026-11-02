/* Cuidándote Fisioterapia — responsable opcional de cada cita. */
(function (global) {
  'use strict';

  const KEY = 'cita_atendida_por_v1';
  function read() { try { return JSON.parse(kvGet(KEY) || '{}'); } catch (_) { return {}; } }
  function get(citaOrId) {
    const cita = typeof citaOrId === 'object' ? citaOrId : null;
    const id = String(cita?.id || citaOrId || '');
    return String(cita?.atendidoPor || read()[id] || '').trim();
  }
  function set(id, nombre) {
    if (!id) return;
    const map = read(), value = String(nombre || '').trim();
    if (value) map[String(id)] = value; else delete map[String(id)];
    kvSet(KEY, JSON.stringify(map));
    global.PanelStorage?._flushKV?.().catch(() => null);
  }
  global.PanelAppointmentProvider = Object.freeze({ get, set });
})(window);
