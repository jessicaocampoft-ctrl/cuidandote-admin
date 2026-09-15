/**
 * Comunicación común con el backend y control de tiempo máximo.
 * Fase 2 de modularización: 2026-08-05.
 */
(function (window) {
  'use strict';

  async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000, retryOnce = false) {
    const attempts = retryOnce ? 2 : 1;
    let lastError;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, { ...options, cache: 'no-store', signal: controller.signal });
        const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
        if (!response.ok) throw new Error(`El servidor respondió ${response.status}. Intenta nuevamente.`);
        if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
        try {
          return JSON.parse(raw);
        } catch (_) {
          throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
        }
      } catch (error) {
        lastError = error && error.name === 'AbortError'
          ? new Error('El servidor tardó demasiado. Intenta nuevamente.')
          : error;
        if (attempt + 1 < attempts) continue;
      } finally {
        clearTimeout(timeout);
      }
    }
    throw lastError || new Error('Error de conexión. Intenta nuevamente.');
  }

  window.PanelApi = Object.freeze({ fetchJsonWithTimeout });
})(window);
