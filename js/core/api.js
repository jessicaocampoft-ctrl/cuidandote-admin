/**
 * Comunicación común con el backend y control de tiempo máximo.
 * Fase 2 de modularización: 2026-08-05.
 */
(function (window) {
  'use strict';

  function candidateUrls(url) {
    const urls = [url];
    const primary = window.PanelConfig?.APPS_SCRIPT_URL;
    const backup = window.PanelConfig?.ADMIN_DATA_FALLBACK_URL;
    // Cualquier llamada al backend administrativo puede usar la ruta gemela
    // cuando Apps Script devuelve un 404 transitorio al despertar.
    if (primary && backup && url.indexOf(primary) === 0) {
      urls.push(backup + url.slice(primary.length));
    }
    return urls.filter((value, index, list) => value && list.indexOf(value) === index);
  }

  function retryable(error) {
    if (!error || !error.status) return true;
    return error.status === 404 || error.status === 429 || error.status >= 500;
  }

  async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000, retryOnce = false) {
    const attempts = retryOnce ? 2 : 1;
    let lastError;
    for (const candidateUrl of candidateUrls(url)) {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const response = await fetch(candidateUrl, { ...options, cache: 'no-store', signal: controller.signal });
          const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
          if (!response.ok) {
            const error = new Error(`El servidor respondió ${response.status}. Intenta nuevamente.`);
            error.status = response.status;
            throw error;
          }
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
          if (!retryable(lastError)) throw lastError;
          if (attempt + 1 < attempts) continue;
        } finally {
          clearTimeout(timeout);
        }
      }
    }
    throw lastError || new Error('Error de conexión. Intenta nuevamente.');
  }

  window.PanelApi = Object.freeze({ fetchJsonWithTimeout });
})(window);
