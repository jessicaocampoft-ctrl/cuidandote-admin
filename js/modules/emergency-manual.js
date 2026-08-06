(function (global) {
'use strict';

function renderEmergencia() {
  const d = window._emKPIData;
  if (!d) return;

  const now  = new Date();
  const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});

  function kpiSt(val, meta, altoEsMejor) {
    if (isNaN(val) || !meta || meta <= 0) return -1;
    const ok   = altoEsMejor ? val >= meta   : val <= meta;
    const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
    return ok ? 0 : warn ? 1 : 2;
  }

  const st = {
    sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
    mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
    cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
    leads:      kpiSt(d.leadsShow,  40,                      true),
    conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
    ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
    ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
    nps:        kpiSt(d.nps,        d.npsMeta,               true),
    enc:        kpiSt(d.encuestas,  d.encMeta,               true),
    bd:         kpiSt(d.bd,         90,                      true),
  };

  const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';

  for (const [kpi, status] of Object.entries(st)) {
    const dot  = document.getElementById('emDot_' + kpi);
    if (dot)  dot.className = 'em-dot ' + dotCls(status);
    const card = document.getElementById('emCard_' + kpi);
    if (card) {
      if (status === 2) card.classList.add('alerta');
      else              card.classList.remove('alerta');
    }
  }

  const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
  let totalRojos = 0;

  for (const [dim, kpis] of Object.entries(dims)) {
    const rojos     = kpis.filter(k => st[k] === 2).length;
    const amarillos = kpis.filter(k => st[k] === 1).length;
    totalRojos += rojos;

    const badge = document.getElementById('emDB_' + dim);
    if (badge) {
      if (rojos > 0) {
        badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
        badge.className = 'em-dim-badge has-red';
        const dimEl  = document.getElementById('emDim_' + dim);
        const bodyEl = document.getElementById('emDB_body_' + dim);
        if (dimEl && bodyEl && !dimEl.classList.contains('open')) {
          dimEl.classList.add('open');
          bodyEl.style.display = 'block';
        }
      } else if (kpis.some(k => st[k] === 0)) {
        badge.textContent = '✓ OK';
        badge.className = 'em-dim-badge all-ok';
      } else {
        badge.textContent = '—';
        badge.className = 'em-dim-badge neutral';
      }
    }
  }

  const rojoC    = Object.values(st).filter(s => s === 2).length;
  const amarilloC = Object.values(st).filter(s => s === 1).length;
  const verdeC   = Object.values(st).filter(s => s === 0).length;

  const bar = document.getElementById('emStatusBar');
  if (bar) {
    bar.innerHTML =
      (rojoC    > 0 ? `<span class="em-pill rojo">🔴 ${rojoC} en rojo</span>` : '') +
      (amarilloC > 0 ? `<span class="em-pill amarillo">🟡 ${amarilloC} en alerta</span>` : '') +
      (verdeC   > 0 ? `<span class="em-pill verde">🟢 ${verdeC} en meta</span>` : '') +
      (rojoC === 0 && amarilloC === 0 && verdeC === 0 ? '<span class="em-pill gris">Sin datos suficientes</span>' : '') +
      `<span class="em-status-ts">Actualizado ${hora}</span>`;
  }

  const crisis = document.getElementById('emCrisisBanner');
  if (crisis) crisis.style.display = totalRojos >= 3 ? 'block' : 'none';

  loadAllEmSteps();
}

function toggleEmDim(n) {
  const dimEl  = document.getElementById('emDim_' + n);
  const bodyEl = document.getElementById('emDB_body_' + n);
  if (!dimEl || !bodyEl) return;
  const open = dimEl.classList.toggle('open');
  bodyEl.style.display = open ? 'block' : 'none';
}

function toggleEmCard(id) {
  const card = document.getElementById('emCard_' + id);
  const body = document.getElementById('emBody_' + id);
  if (!card || !body) return;
  const open = card.classList.toggle('open');
  body.style.display = open ? 'block' : 'none';
  if (!open) card.classList.remove('alerta');
}

function handleEmStep(event, kpi, idx) {
  event.preventDefault();
  const ck = document.getElementById('emCk_' + kpi + '_' + idx);
  if (!ck) return;
  ck.checked = !ck.checked;
  _persistEmStep(kpi, idx, ck.checked);
}

function _persistEmStep(kpi, idx, checked) {
  const key = 'em_steps_' + kpi;
  let state = [];
  try { state = JSON.parse(kvGet(key) || '[]'); } catch(e) {}
  state[idx] = checked;
  kvSet(key, JSON.stringify(state));
  _updateEmProgress(kpi);
}

function _updateEmProgress(kpi) {
  const checks = [];
  for (let i = 0; i < 6; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (!ck) break;
    checks.push(ck.checked);
    const row = document.getElementById('emS_' + kpi + '_' + i);
    if (row) row.classList.toggle('done', ck.checked);
  }
  const total = checks.length, done = checks.filter(Boolean).length;
  const fill = document.getElementById('emPF_' + kpi);
  if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
  const meta = document.getElementById('emPM_' + kpi);
  if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
  const btn  = document.getElementById('emDB_' + kpi);
  if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
}

function loadAllEmSteps() {
  ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
    let state = [];
    try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
    state.forEach((checked, idx) => {
      const ck = document.getElementById('emCk_' + kpi + '_' + idx);
      if (ck) ck.checked = !!checked;
    });
    _updateEmProgress(kpi);
  });
}

function markEmDone(kpi, total) {
  const state = Array(total).fill(true);
  kvSet('em_steps_' + kpi, JSON.stringify(state));
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = true;
  }
  _updateEmProgress(kpi);
}

function resetEmSteps(kpi, total) {
  kvRemove('em_steps_' + kpi);
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = false;
  }
  _updateEmProgress(kpi);
}

global.PanelEmergencyManual = Object.freeze({
    renderEmergencia,
    toggleEmDim,
    toggleEmCard,
    handleEmStep,
    _persistEmStep,
    _updateEmProgress,
    loadAllEmSteps,
    markEmDone,
    resetEmSteps
  });
})(typeof window !== 'undefined' ? window : globalThis);
