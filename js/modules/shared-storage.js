(function (global) {
'use strict';

// ── KV SYNC — datos persistentes sincronizados en todos los dispositivos via GAS ──
let _gasKV = {};
let _kvDirty = {};
let _kvFlushTimer = null;

async function loadAdminKV() {
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getAdminKV&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
    if (r.ok && r.kv) {
      _gasKV = r.kv;
      Object.entries(r.kv).forEach(([k, v]) => localStorage.setItem(k, v));
    }
  } catch(e) {}
}

function kvGet(key) {
  const v = _gasKV[key];
  return (v !== undefined && v !== null) ? v : localStorage.getItem(key);
}

function kvSet(key, value) {
  const s = String(value);
  _gasKV[key] = s;
  localStorage.setItem(key, s);
  _kvDirty[key] = s;
  clearTimeout(_kvFlushTimer);
  _kvFlushTimer = setTimeout(_flushKV, 2000);
}

function kvRemove(key) {
  delete _gasKV[key];
  localStorage.removeItem(key);
  _kvDirty[key] = '__DELETE__';
  clearTimeout(_kvFlushTimer);
  _kvFlushTimer = setTimeout(_flushKV, 2000);
}

async function _flushKV() {
  _kvFlushTimer = null;
  if (!Object.keys(_kvDirty).length) return;
  const batch = { ..._kvDirty };
  _kvDirty = {};
  try {
    await fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`);
  } catch(e) {
    Object.assign(_kvDirty, batch);
    _kvFlushTimer = setTimeout(_flushKV, 5000);
  }
}

// Garantiza que leads y checklist pendientes se guarden aunque el navegador cierre
window.addEventListener('beforeunload', () => {
  if (!Object.keys(_kvDirty).length) return;
  const batch = { ..._kvDirty };
  _kvDirty = {};
  fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
});

global.PanelStorage = Object.freeze({
    loadAdminKV,
    kvGet,
    kvSet,
    kvRemove,
    _flushKV
  });
})(typeof window !== 'undefined' ? window : globalThis);
