/**
 * Comunicación común con el backend y control de tiempo máximo.
 * Fase 2 de modularización: 2026-08-05.
 */
(function (window) {
  'use strict';

  async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
      if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
      try {
        return JSON.parse(raw);
      } catch (_) {
        throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
      }
    } catch (error) {
      if (error && error.name === 'AbortError') {
        throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  window.PanelApi = Object.freeze({ fetchJsonWithTimeout });
})(window);
