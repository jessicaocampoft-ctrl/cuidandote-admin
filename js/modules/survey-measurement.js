(function (global) {
'use strict';

const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];

function getEncuestaStats() {
  try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
}

async function loadEncuestaStats() {
  const btn  = document.getElementById('btnCargarEncuesta');
  const btn2 = document.getElementById('btnCargarEncuestaGuia');
  [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      const now = new Date();
      const m = now.getMonth()+1, y = now.getFullYear();
      const citasMes = citasReales().filter(c => {
        const [cy,cm] = normDate(c.fecha).split('-');
        return +cm===m && +cy===y;
      }).length;
      const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
      const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
      const stats   = {
        nps: npsVal, encuestas: encPct,
        totalRespuestas: d.totalMes, citasMes,
        promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
        fetchedAt: Date.now()
      };
      kvSet('encuestaStats', JSON.stringify(stats));
      // Actualizar inputs ocultos y guardar
      const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
      guardarKPIManual();
      _renderEncuestaStatsUI(stats);
      renderKPITablero();
      renderKPIGuia();
      toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
    } else {
      toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
    }
  } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
  [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
}

function _renderEncuestaStatsUI(stats) {
  if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
  const npsOk     = stats.nps !== null && stats.nps !== undefined;
  const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
  const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
  const npsEl     = document.getElementById('kpiNPSAutoTag');
  const encEl     = document.getElementById('kpiEncuestasAutoTag');
  if (npsEl) npsEl.innerHTML = npsOk
    ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
      ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
    : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
  if (encEl) encEl.innerHTML =
    `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
    ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
}

function _rutinaKey() {
  const d = new Date();
  return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadRutinaChecks() {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  RUTINA_IDS.forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    const done = checked.includes(id);
    cb.checked = done;
    lbl.classList.toggle('done', done);
  });
}

function toggleRutinaCheck(id) {
  const cb  = document.getElementById('rck_' + id);
  const lbl = cb ? cb.closest('.gk-check-item') : null;
  if (!cb || !lbl) return;
  // Usamos un pequeño delay para leer el valor actualizado
  setTimeout(() => {
    const done = cb.checked;
    lbl.classList.toggle('done', done);
    const today = _rutinaKey();
    let checked = [];
    try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
    if (done && !checked.includes(id))  checked.push(id);
    if (!done) checked = checked.filter(x => x !== id);
    kvSet(today, JSON.stringify(checked));
  }, 0);
}

function resetRutina() {
  kvRemove(_rutinaKey());
  loadRutinaChecks();
  toast('Checklist reiniciado', 'ok');
}

function resetRutinaGrupo(prefix) {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  checked = checked.filter(id => !id.startsWith(prefix));
  kvSet(today, JSON.stringify(checked));
  RUTINA_IDS.filter(id => id.startsWith(prefix)).forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    cb.checked = false;
    lbl.classList.remove('done');
  });
  const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
  toast('Checklist ' + nombre + ' reiniciado', 'ok');
}

global.PanelSurveyMeasurement = Object.freeze({
    getEncuestaStats,
    loadEncuestaStats,
    _renderEncuestaStatsUI,
    _rutinaKey,
    loadRutinaChecks,
    toggleRutinaCheck,
    resetRutina,
    resetRutinaGrupo
  });
})(typeof window !== 'undefined' ? window : globalThis);
