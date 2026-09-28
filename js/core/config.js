/**
 * Configuración compartida del panel.
 * Fase 2 de modularización: 2026-08-05.
 */
(function (window) {
  'use strict';

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7biQkVS9l1nU4AYQeOmQzbPcKebOUJ5UmX97vCJDaXg5s-9y0-mgSrE0ANZXZJ8Hd/exec";
  // Lectura de respaldo del mismo proyecto para cuando la ruta principal está
  // despertando. Las escrituras (pagos, planes, agenda) siguen en la principal.
  const ADMIN_DATA_FALLBACK_URL = "https://script.google.com/macros/s/AKfycbzFlqrTerVorQDn0_u_D29rh3cTRstc1XBxYDAn5-2YyexMSpip0m2RPcjzJMK7VDjd/exec";

  window.PanelConfig = Object.freeze({ APPS_SCRIPT_URL, ADMIN_DATA_FALLBACK_URL });
})(window);
