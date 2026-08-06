(function (global) {
'use strict';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function today() {
  const d = new Date();
  return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
}

function pad(n) { return n < 10 ? '0'+n : ''+n; }

function parsePrecio(p) {
  if (!p) return 0;
  const n = parseInt(String(p).replace(/[^0-9]/g,''), 10);
  return isNaN(n) ? 0 : n;
}

function parsePrecioNum(str) {
  if (!str) return 0;
  return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}

function toDateStr(d) {
  return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
}

function normDate(s) {
  if (!s) return '';
  if (s instanceof Date) return toDateStr(s);
  return String(s).split('T')[0].trim();
}

function fmtDate(s) {
  if (!s) return '—';
  const nd = normDate(s);
  const [y,m,d] = nd.split('-');
  if (!y || !m || !d || isNaN(+y)) return nd || '—';
  return new Date(+y, +m-1, +d).toLocaleDateString('es-CO',{weekday:'short',day:'numeric',month:'short'});
}

function fmtPeso(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

function toast(msg, type='ok') {
  const t = document.createElement('div');
  t.className = 'toast-msg ' + type;
  t.textContent = msg;
  document.getElementById('toast').appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function openModal(id) { document.getElementById(id).classList.add('open'); }

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

global.PanelUtils = Object.freeze({
    esc,
    today,
    pad,
    parsePrecio,
    parsePrecioNum,
    toDateStr,
    normDate,
    fmtDate,
    fmtPeso,
    toast,
    openModal,
    closeModal
  });
})(typeof window !== 'undefined' ? window : globalThis);
