(function (global) {
'use strict';

function _comisGetConfig() {
  let cfg = {};
  try { cfg = JSON.parse(kvGet('comisiones_config') || '{}'); } catch(e) {}
  return {
    bono_agenda:           parseInt(cfg.bono_agenda           || '80000', 10),
    semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
    ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
    // Se conservan los valores históricos en KV, pero desde esta fecha no se
    // liquidan reactivaciones ni renovaciones como comisión individual.
    bono_react:            parseInt(cfg.bono_react            || '15000', 10),
    bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
    pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
    politica_comercial_desde: cfg.politica_comercial_desde || '2026-11-08',
    bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
    serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
    serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
    bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
    contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
    contenido_persona:     cfg.contenido_persona || 'Persona del video',
    contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
    equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
    lider_nombre:          cfg.lider_nombre || 'Michelle',
  };
}

async function saveComisConfig() {
  if (!_comisJessica()) {
    if (typeof toast === 'function') toast('Solo Jessica puede modificar las reglas de comisión.', 'err');
    return;
  }
  const g = id => (document.getElementById(id)||{}).value || '';
  // No se sobreescriben los importes anteriores: quedan como trazabilidad de
  // liquidaciones pasadas. Las reglas nuevas se aplican por periodo.
  const previous = (() => { try { return JSON.parse(kvGet('comisiones_config') || '{}'); } catch (_) { return {}; } })();
  kvSet('comisiones_config', JSON.stringify({
    bono_agenda:          g('cfg_bono_agenda'),
    semanas_meta:         g('cfg_semanas_meta'),
    ses_llena:            g('cfg_ses_llena'),
    bono_react:           previous.bono_react || '15000',
    bono_react_tipo:      previous.bono_react_tipo || 'fijo',
    pct_reventa:          previous.pct_reventa || '5',
    politica_comercial_desde: previous.politica_comercial_desde || '2026-11-08',
    bono_cruzada:         g('cfg_bono_cruzada'),
    serv_mant:            g('cfg_serv_mant'),
    serv_descarga:        g('cfg_serv_descarga'),
    bono_contenido:       g('cfg_bono_contenido'),
    contenido_split_aux:  g('cfg_contenido_split_aux'),
    contenido_persona:    g('cfg_contenido_persona'),
    contenido_leads_meta: g('cfg_contenido_leads_meta'),
    equipo_nps_meta:      g('cfg_equipo_nps_meta'),
    lider_nombre:         g('cfg_lider_nombre') || previous.lider_nombre || 'Michelle',
  }));
  const saved = await global.PanelStorage?._flushKV?.();
  const msg = document.getElementById('coConfigMsg');
  if (msg) {
    msg.textContent = saved ? '✓ Guardado en la base de datos' : '⚠ Sin conexión: se reintentará automáticamente';
    msg.style.color = saved ? 'var(--ok)' : '#b45309';
    msg.style.display='inline';
    setTimeout(()=>msg.style.display='none',3500);
  }
  renderComisiones();
}

function toggleComisConfig() {
  if (!_comisJessica()) {
    if (typeof toast === 'function') toast('Solo Jessica puede editar las reglas de comisión.', 'err');
    return;
  }
  const p = document.getElementById('coConfigPanel');
  if (!p) return;
  const open = p.style.display === 'none';
  p.style.display = open ? 'block' : 'none';
  if (!open) return;
  const cfg = _comisGetConfig();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  set('cfg_bono_agenda',          cfg.bono_agenda);
  set('cfg_semanas_meta',         cfg.semanas_meta);
  set('cfg_ses_llena',            META_SESIONES_SEMANA);
  set('cfg_bono_cruzada',         cfg.bono_cruzada);
  set('cfg_serv_mant',            cfg.serv_mant.join(', '));
  set('cfg_serv_descarga',        cfg.serv_descarga);
  set('cfg_bono_contenido',       cfg.bono_contenido);
  set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
  set('cfg_contenido_persona',    cfg.contenido_persona);
  set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
  set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
  set('cfg_lider_nombre',         cfg.lider_nombre);
}

function _initComisMesSel() {
  const sel = document.getElementById('comisMes');
  if (!sel || sel.options.length > 0) return;
  const now = new Date();
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const opt = document.createElement('option');
    opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
    opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
    sel.appendChild(opt);
  }
}

function _comisMesVal() {
  const sel = document.getElementById('comisMes');
  return sel ? sel.value : '';
}

function _comisSemanasLlenas(citas, eventos, year, month, metaSes) {
  const toS = d => d.toLocalDateStr();
  const mS = new Date(year, month-1, 1), mE = new Date(year, month, 0);
  const weeks = [];
  // Las semanas de comisiones pertenecen por completo al mes evaluado:
  // 1–7, 8–14, 15–21, 22–28 y 29–fin de mes. Nunca toma días del mes anterior.
  for (let firstDay = 1; firstDay <= mE.getDate(); firstDay += 7) {
    const ws = new Date(year, month - 1, firstDay);
    const we = new Date(year, month - 1, Math.min(firstDay + 6, mE.getDate()));
    const sesC = citas.filter(c => { if ((c.estado||'').includes('Cancel') || c.estado==='No asistió') return false; const f=normDate(c.fecha); return f>=toS(ws)&&f<=toS(we); }).length;
    const sesE = (eventos||[]).filter(e => { const f=normDate(e.fecha); return f>=toS(ws)&&f<=toS(we); }).length;
    weeks.push({ start: toS(ws), end: toS(we), sesiones: sesC+sesE, llena: (sesC+sesE) >= metaSes });
  }
  return weeks;
}

// La liquidación de agenda es mensual. Esta función conserva el conteo de la
// agenda y de los eventos externos, pero los compara con una sola meta del mes
// para evitar anticipos o pagos proporcionales por semanas.
function _comisResumenAgendaMensual(citas, eventos, year, month, metaSemana, semanasMeta) {
  const toS = d => d.toLocalDateStr();
  const inicio = toS(new Date(year, month - 1, 1));
  const fin = toS(new Date(year, month, 0));
  const estaEnMes = item => {
    const fecha = normDate(item.fecha);
    return fecha >= inicio && fecha <= fin;
  };
  const citasValidas = (citas || []).filter(c => {
    if ((c.estado || '').includes('Cancel') || c.estado === 'No asistió') return false;
    return estaEnMes(c);
  }).length;
  const eventosValidos = (eventos || []).filter(estaEnMes).length;
  const totalSes = citasValidas + eventosValidos;
  const metaMensual = Math.max(0, Number(metaSemana) || 0) * Math.max(1, Number(semanasMeta) || 4);
  return {
    totalSes,
    metaMensual,
    cumpleMeta: metaMensual > 0 && totalSes >= metaMensual,
    ocupacion: metaMensual > 0 ? (totalSes / metaMensual * 100).toFixed(1) : '0'
  };
}

function _comisReactivaciones(citas, year, month) {
  const toS = d => d.toLocalDateStr();
  const mS = new Date(year, month-1, 1);
  const msStr = toS(mS), meStr = toS(new Date(year, month, 0));
  const byP = {};
  citas.forEach(c => {
    if ((c.estado||'').includes('Cancel') || c.estado==='No asistió') return;
    const key = (c.nombre||'').toLowerCase().trim();
    if (!key) return;
    if (!byP[key]) byP[key] = { nombre: c.nombre, citas: [] };
    byP[key].citas.push(c);
  });
  const result = [];
  for (const p of Object.values(byP)) {
    const thisMon = p.citas.filter(c => { const f=normDate(c.fecha); return f>=msStr&&f<=meStr; });
    if (!thisMon.length) continue;
    const before = p.citas.filter(c => normDate(c.fecha) < msStr);
    if (!before.length) continue;
    const lastB = before.reduce((a,b) => normDate(a.fecha)>normDate(b.fecha)?a:b);
    const dias  = Math.round((mS - new Date(normDate(lastB.fecha)+'T12:00')) / 86400000);
    if (dias >= 60) {
      const firstSes = [...thisMon].sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)))[0];
      const precio = parseInt((firstSes?.precio||'0').toString().replace(/\D/g,''), 10) || 0;
      result.push({ nombre: p.nombre, lastFecha: normDate(lastB.fecha), dias, precio });
    }
  }
  return result;
}

function _comisReventas(citas, year, month, mantKws, pct) {
  const toS = d => d.toLocalDateStr();
  const msStr = toS(new Date(year, month-1, 1)), meStr = toS(new Date(year, month, 0));
  const ventas = citas.filter(c => {
    if ((c.estado||'').includes('Cancel') || c.estado==='No asistió') return false;
    const f = normDate(c.fecha);
    return f>=msStr && f<=meStr && mantKws.some(kw => (c.servicio||'').toLowerCase().includes(kw));
  });
  return ventas.map(c => {
    const pn = (c.nombre||'').toLowerCase().trim();
    const hadPrior = citas.some(o => (o.nombre||'').toLowerCase().trim()===pn && !(o.estado||'').includes('Cancel') && o.estado!=='No asistió' && normDate(o.fecha)<msStr);
    if (!hadPrior) return null;
    const precio = parsePrecio(c.precio);
    return { nombre: c.nombre, servicio: c.servicio, precio, comision: Math.round(precio * pct / 100), fecha: normDate(c.fecha) };
  }).filter(Boolean);
}

function _comisVentasCruzadas(citas, year, month, descKw) {
  const toS = d => d.toLocalDateStr();
  const msStr = toS(new Date(year, month-1, 1)), meStr = toS(new Date(year, month, 0));
  const mes = citas.filter(c => { if ((c.estado||'').includes('Cancel')||c.estado==='No asistió') return false; const f=normDate(c.fecha); return f>=msStr&&f<=meStr; });
  const byP = {};
  mes.forEach(c => { const key=(c.nombre||'').toLowerCase().trim(); if(!key) return; if(!byP[key]) byP[key]={nombre:c.nombre,servicios:[]}; byP[key].servicios.push(c.servicio||''); });
  return Object.values(byP).filter(p =>
    p.servicios.some(s => s.toLowerCase().includes(descKw)) &&
    p.servicios.some(s => !s.toLowerCase().includes(descKw))
  ).map(p => ({ nombre: p.nombre, servicio: p.servicios.find(s => s.toLowerCase().includes(descKw)) || p.servicios[0] }));
}

function _comisCruzadaAsign(mes, nombre) {
  return kvGet('comis_cruzada_' + mes + '_' + nombre.toLowerCase().trim()) || 'fisio';
}

function setCruzadaAsign(mes, nombre, persona) {
  kvSet('comis_cruzada_' + mes + '_' + nombre.toLowerCase().trim(), persona);
  renderComisiones();
}

function _comisManualReact(year, month) {
  try { return JSON.parse(kvGet('comis_react_'+year+'-'+String(month).padStart(2,'0')) || '[]'); } catch(e) { return []; }
}

function _comisSetManualReact(year, month, list) {
  kvSet('comis_react_'+year+'-'+String(month).padStart(2,'0'), JSON.stringify(list));
}

// Un retorno después de inactividad no es automáticamente una reactivación.
// La fuente queda marcada por persona y mes para que la decisión sea auditable.
function _comisReactOrigins(year, month) {
  try { return JSON.parse(kvGet('comis_react_origen_'+year+'-'+String(month).padStart(2,'0')) || '{}'); } catch(e) { return {}; }
}
function setReactivationOrigin(nombre, origen) {
  const [year, month] = _comisMesVal().split('-').map(Number);
  const origins = _comisReactOrigins(year, month);
  const key = String(nombre || '').toLowerCase().trim();
  if (!key) return;
  origins[key] = { origen, at: new Date().toISOString() };
  kvSet('comis_react_origen_'+year+'-'+String(month).padStart(2,'0'), JSON.stringify(origins));
  renderComisiones();
}

function addManualReactivacion() {
  const inp = document.getElementById('coManualReactInp');
  if (!inp || !inp.value.trim()) return;
  const nombre = inp.value.trim(); inp.value = '';
  const [y, m] = _comisMesVal().split('-').map(Number);
  const list = _comisManualReact(y, m);
  if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
  renderComisiones();
}

function removeManualReactivacion(nombre) {
  const [y, m] = _comisMesVal().split('-').map(Number);
  _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
  renderComisiones();
}

// ── CICLO ÚNICO DE LIQUIDACIÓN ────────────────────────────────────────────
// Una cifra aprobada queda congelada: cambios posteriores en citas o metas no
// reescriben la liquidación histórica.
const COMMISSION_LIFECYCLE_KEY = 'commission_lifecycle_v1';
const COMMISSION_LIFECYCLE_AUDIT_KEY = 'commission_lifecycle_audit_v1';
let _commissionSnapshots = {};

function _comisLifecycleData() {
  try { const parsed = JSON.parse(kvGet(COMMISSION_LIFECYCLE_KEY) || '{}'); return parsed && typeof parsed === 'object' ? parsed : {}; }
  catch (_) { return {}; }
}
function _comisLifecycleAudit() {
  try { const parsed = JSON.parse(kvGet(COMMISSION_LIFECYCLE_AUDIT_KEY) || '[]'); return Array.isArray(parsed) ? parsed : []; }
  catch (_) { return []; }
}
function _comisActor() {
  try { return String(currentAdminUser?.nombre || currentAdminUser?.name || 'Administración'); }
  catch (_) { return 'Administración'; }
}
function _comisJessica() {
  try {
    const name = _comisActor().toLowerCase();
    const role = String(currentAdminUser?.rol || '').toLowerCase();
    return /jessica|administracion/.test(name) || /superadministradora/.test(role);
  } catch (_) { return false; }
}
function _comisLifecycleId(persona, mes) { return `${mes}:${persona}`; }
function _comisSaveLifecycle(data, action, detail) {
  kvSet(COMMISSION_LIFECYCLE_KEY, JSON.stringify(data));
  const audit = _comisLifecycleAudit();
  audit.push({at:new Date().toISOString(), actor:_comisActor(), action, detail});
  kvSet(COMMISSION_LIFECYCLE_AUDIT_KEY, JSON.stringify(audit.slice(-2000)));
  if (window.PanelStorage?._flushKV) window.PanelStorage._flushKV();
}
function _comisGetLifecycle(persona, mes) {
  const all = _comisLifecycleData();
  return all[_comisLifecycleId(persona, mes)] || null;
}
function _comisDisplayAmount(record, calculated) {
  return ['Aprobada','Pagada manualmente'].includes(record?.state) && Number.isFinite(Number(record?.snapshot?.amount))
    ? Number(record.snapshot.amount) : calculated;
}
function _comisStatusBadge(record) {
  const state = record?.state || 'Borrador';
  const colors = {Borrador:'#64748b','En revisión':'#b45309',Aprobada:'#2563eb','Rechazada':'#b91c1c','Pagada manualmente':'#15803d'};
  return `<span style="display:inline-block;padding:4px 8px;border-radius:999px;background:${colors[state] || '#64748b'}18;color:${colors[state] || '#64748b'};font-size:.72rem;font-weight:700">${state}</span>`;
}
function _comisLifecycleControl(persona, mes, snapshot) {
  const record = _comisGetLifecycle(persona, mes);
  const isJessica = _comisJessica();
  const label = record?.state || 'Borrador';
  const lock = record?.snapshot?.amount !== undefined ? ` · liquidación congelada: ${fmtPeso(record.snapshot.amount)}` : '';
  const base = `<span style="font-size:.74rem;color:var(--muted)">${_comisStatusBadge(record)}${lock}</span>`;
  if (!isJessica) return `${base}<span style="font-size:.72rem;color:var(--muted)">Solo Jessica puede gestionar la liquidación.</span>`;
  if (label === 'Borrador') return `${base}<button class="co-pay-btn" onclick="setCommissionLifecycle('${persona}','revision')">Enviar a revisión</button>`;
  if (label === 'En revisión') return `${base}<button class="co-pay-btn" onclick="setCommissionLifecycle('${persona}','aprobar')">Aprobar liquidación</button><button class="co-cfg-btn" onclick="setCommissionLifecycle('${persona}','rechazar')">Rechazar</button>`;
  if (label === 'Aprobada') return `${base}<button class="co-pay-btn" onclick="setCommissionLifecycle('${persona}','pagar')">Registrar pago manual</button>`;
  if (label === 'Pagada manualmente') return `${base}<span style="font-size:.72rem;color:var(--muted)">Registrada el ${record.paidAt || record.updatedAt || '—'} · no crea un pago automático.</span>`;
  return `${base}<button class="co-cfg-btn" onclick="setCommissionLifecycle('${persona}','revision')">Reabrir para revisión</button>`;
}
function setCommissionLifecycle(persona, action) {
  if (!_comisJessica()) { if (typeof toast === 'function') toast('Solo Jessica puede aprobar, rechazar o registrar pagos.', 'err'); return; }
  const mes = _comisMesVal();
  const id = _comisLifecycleId(persona, mes);
  const all = _comisLifecycleData();
  const previous = all[id] || {persona, periodo:mes, state:'Borrador', createdAt:new Date().toISOString(), createdBy:_comisActor()};
  const snapshot = _commissionSnapshots[persona] || previous.snapshot;
  const now = new Date().toLocaleString('es-CO');
  if (action === 'revision') previous.state = 'En revisión';
  if (action === 'aprobar') { previous.state = 'Aprobada'; previous.snapshot = {...snapshot, frozenAt:now, frozenBy:_comisActor()}; previous.approvedAt = now; previous.approvedBy = _comisActor(); }
  if (action === 'rechazar') { previous.state = 'Rechazada'; previous.rejectedAt = now; previous.rejectedBy = _comisActor(); }
  if (action === 'pagar') {
    if (previous.state !== 'Aprobada') { if (typeof toast === 'function') toast('Primero aprueba la liquidación.', 'err'); return; }
    previous.state = 'Pagada manualmente'; previous.paidAt = now; previous.paidBy = _comisActor();
  }
  previous.updatedAt = now; previous.updatedBy = _comisActor();
  all[id] = previous;
  _comisSaveLifecycle(all, `Liquidación ${previous.state.toLowerCase()}`, `${persona} · ${mes} · ${fmtPeso(previous.snapshot?.amount ?? snapshot?.amount ?? 0)}`);
  renderComisiones();
}
function _comisMigrateLegacyPaid(persona, mes) {
  const oldDate = kvGet('comis_pago_' + persona + '_' + mes);
  if (!oldDate || _comisGetLifecycle(persona, mes)) return;
  const all = _comisLifecycleData();
  all[_comisLifecycleId(persona, mes)] = {persona, periodo:mes, state:'Pagada manualmente', legacy:true, paidAt:oldDate, updatedAt:oldDate, updatedBy:'Registro histórico'};
  _comisSaveLifecycle(all, 'Migró pago histórico', `${persona} · ${mes} · valor histórico no disponible para congelar`);
}
function _comisDuplicateAlerts(mes) {
  let recovery = [];
  try { recovery = JSON.parse(localStorage.getItem('recuperaciones_v1') || '[]'); } catch (_) {}
  const commercialStates = (() => { try { return JSON.parse(kvGet('commercial_incentives_status_v1') || '{}'); } catch (_) { return {}; } })();
  const opportunities = (() => { try { return window.PanelCommercialSales?.getOpportunities?.() || []; } catch (_) { return []; } })();
  const alerts = [];
  recovery.filter(item => String(item.fecha || '').slice(0,7) === mes).forEach(item => {
    const match = opportunities.find(opportunity => String(opportunity.patientName || '').trim().toLowerCase() === String(item.paciente || '').trim().toLowerCase());
    if (match && ['Aprobado','Pagado'].includes(commercialStates['CAP-' + match.id]?.state)) alerts.push(`Recuperación y captación comercial: ${item.paciente}`);
    if (match && ['Aprobado','Pagado'].includes(commercialStates['TIC-' + match.id]?.state)) alerts.push(`Recuperación e incremento de ticket: ${item.paciente}`);
  });
  return [...new Set(alerts)];
}
function _renderCommissionLifecycleHistory(mes) {
  const host = document.getElementById('coLiquidationsWrap');
  if (!host) return;
  const rows = Object.values(_comisLifecycleData()).filter(row => row.periodo === mes).sort((a,b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
  const alerts = _comisDuplicateAlerts(mes);
  host.innerHTML = `<div class="co-cfg-panel" style="margin-top:18px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><div><div style="font-family:var(--font-h);font-size:1.02rem;font-weight:600">Liquidaciones del período</div><div style="font-size:.76rem;color:var(--muted)">Flujo: borrador → revisión → aprobada por Jessica → pagada manualmente.</div></div><span style="font-size:.75rem;color:var(--muted)">${rows.length} registro${rows.length===1?'':'s'}</span></div>${alerts.length ? `<div style="margin-top:12px;padding:10px 12px;border:1px solid #fed7aa;background:#fff7ed;border-radius:9px;font-size:.76rem;color:#9a3412"><strong>Posible duplicidad:</strong> ${alerts.join(' · ')}. Revísala antes de aprobar; no se genera un pago automático.</div>` : ''}<div style="display:grid;gap:7px;margin-top:12px">${rows.length ? rows.map(row => `<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:8px"><span><strong>${row.snapshot?.responsable || row.persona}</strong> · ${row.snapshot?.concepto || 'Registro histórico'}<br><small style="color:var(--muted)">${row.periodo} · ${row.updatedAt || 'Sin fecha'}</small></span><span style="text-align:right">${_comisStatusBadge(row)}<br><strong style="font-size:.85rem;color:var(--primary)">${row.snapshot?.amount !== undefined ? fmtPeso(row.snapshot.amount) : 'Valor histórico no disponible'}</strong></span></div>`).join('') : '<div style="font-size:.78rem;color:var(--muted)">Aún no se han enviado liquidaciones a revisión para este período.</div>'}</div></div>`;
}

function renderComisiones() {
  _initComisMesSel();
  const mes = _comisMesVal();
  if (!mes) return;
  const [year, month] = mes.split('-').map(Number);
  const cfg   = _comisGetConfig();
  const citas = citasReales();

  // ── BONO DE AGENDA: LIQUIDACIÓN DEL MES COMPLETO ──
  const agendaMes = _comisResumenAgendaMensual(
    citas, allData.eventos || [], year, month, cfg.ses_llena, cfg.semanas_meta
  );
  const { totalSes, metaMensual, cumpleMeta, ocupacion: pctOcupReal } = agendaMes;
  const bonoAg = cumpleMeta ? cfg.bono_agenda : 0;

  // ── REACTIVACIONES ──
  const reactAuto  = _comisReactivaciones(citas, year, month);
  const reactOrigins = _comisReactOrigins(year, month);
  const reactConfirmadas = reactAuto.filter(r => reactOrigins[String(r.nombre).toLowerCase().trim()]?.origen === 'gestion');
  const reactEspontaneas = reactAuto.filter(r => reactOrigins[String(r.nombre).toLowerCase().trim()]?.origen === 'espontaneo');
  const reactPendientes = reactAuto.filter(r => !reactOrigins[String(r.nombre).toLowerCase().trim()]?.origen);
  const reactMan   = _comisManualReact(year, month);
  const reactManN  = reactMan.filter(n => !reactAuto.find(r => r.nombre.toLowerCase() === n.toLowerCase()));
  const totalReact = reactConfirmadas.length + reactManN.length;
  const policyMonth = `${year}-${String(month).padStart(2,'0')}`;
  const legacyIndividualAllowed = policyMonth < String(cfg.politica_comercial_desde).slice(0,7);
  const calcBonoReactItem = (precio) => cfg.bono_react_tipo === 'pct'
    ? Math.round((parseInt((precio||'0').toString().replace(/\D/g,''),10)||0) * cfg.bono_react / 100)
    : cfg.bono_react;
  const bonoReactHistorico = reactConfirmadas.reduce((s,r) => s + calcBonoReactItem(r.precio), 0)
    + reactManN.length * (cfg.bono_react_tipo === 'fijo' ? cfg.bono_react : 0);
  const bonoReact = legacyIndividualAllowed ? bonoReactHistorico : 0;
  const labelBonoReact = cfg.bono_react_tipo === 'pct' ? cfg.bono_react + '% del servicio' : fmtPeso(cfg.bono_react);

  // ── REVENTAS ──
  const reventas = _comisReventas(citas, year, month, cfg.serv_mant, cfg.pct_reventa);
  const bonoRevHistorico  = reventas.reduce((s,r) => s+r.comision, 0);
  const bonoRev = legacyIndividualAllowed ? bonoRevHistorico : 0;

  // ── VENTA CRUZADA ──
  const cruzadas = _comisVentasCruzadas(citas, year, month, cfg.serv_descarga).map(c => ({
    ...c, asign: _comisCruzadaAsign(mes, c.nombre)
  }));
  const bonoCruzFisio = cruzadas.filter(c => c.asign === 'fisio').length * cfg.bono_cruzada;
  const bonoCruzAux   = cruzadas.filter(c => c.asign === 'auxiliar').length * cfg.bono_cruzada;
  const bonoCruz = bonoCruzFisio; // compatibilidad (se suma a fisio)

  // ── CREADOR DE CONTENIDO ──
  const leadsActual = (() => { const lm=getLeadsMes(), km=getKPIManual(); return lm>0?lm:(km.leads||0); })();
  const visitasActual = parseInt(kvGet('comis_visitas_'+mes)||'0', 10);
  const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;
  const bonoCont     = contenidoOk ? cfg.bono_contenido : 0;
  const bonoContAux  = Math.round(bonoCont * cfg.contenido_split_aux / 100);
  const bonoContVideo= bonoCont - bonoContAux;
  const splitVideoP  = 100 - cfg.contenido_split_aux;

  // ── NPS / TODO EL EQUIPO ──
  const _enc    = getEncuestaStats();
  const npsActual = _enc.nps !== undefined ? _enc.nps : null;
  const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;

  // ── TOTALES ──
  const totalAux   = bonoAg + bonoReact + bonoContAux + bonoCruzAux;
  const totalFisio = bonoRev + bonoCruzFisio;
  const totalVideo = bonoContVideo;
  _commissionSnapshots = {
    // "auxiliar" se conserva solo como clave técnica para no romper el historial.
    auxiliar: {responsable:`${cfg.lider_nombre} — Líder Administrativa y Estratega Comercial`, concepto:'Agenda, contenido y venta cruzada', periodo:mes, amount:totalAux},
    fisio: {responsable:'Fisioterapeuta de Apoyo', concepto:'Renovaciones históricas y venta cruzada', periodo:mes, amount:totalFisio},
    video: {responsable:cfg.contenido_persona || 'Creador de Contenido', concepto:'Bono de contenido', periodo:mes, amount:totalVideo}
  };
  ['auxiliar','fisio','video'].forEach(persona => _comisMigrateLegacyPaid(persona, mes));
  const totalAuxLiquidado = _comisDisplayAmount(_comisGetLifecycle('auxiliar', mes), totalAux);
  const totalFisioLiquidado = _comisDisplayAmount(_comisGetLifecycle('fisio', mes), totalFisio);
  const totalVideoLiquidado = _comisDisplayAmount(_comisGetLifecycle('video', mes), totalVideo);
  const totalGen = totalAuxLiquidado + totalFisioLiquidado + totalVideoLiquidado;

  // ── RESUMEN ──
  const setEl = (id, v) => { const el=document.getElementById(id); if(el) el.innerHTML=v; };
  setEl('coTotalGeneral',    fmtPeso(totalGen));
  setEl('coTotalAux',        fmtPeso(totalAuxLiquidado));
  setEl('coTotalFisio',      fmtPeso(totalFisioLiquidado));
  setEl('coTotalVideo',      fmtPeso(totalVideoLiquidado));
  setEl('coSemanasRes',      totalSes + '/' + metaMensual);
  setEl('coVideoPersonaLabel', cfg.contenido_persona);

  // ── HTML AUXILIAR ──
  const agendaMetaH = `<div class="co-week"><div class="co-wdot ${cumpleMeta?'ok':'no'}"></div><span>Mes completo</span><span style="font-family:var(--font-m);color:${cumpleMeta?'var(--ok)':'var(--muted)'}">${totalSes} / ${metaMensual} ses.</span><span style="font-size:.72rem;color:${cumpleMeta?'var(--ok)':'#ef4444'}">${cumpleMeta?'✓ meta cumplida':'faltan '+Math.max(0,metaMensual-totalSes)+' ses.'}</span></div>`;

  const reactH = [
    ...reactAuto.map(r => {
      const key = String(r.nombre).toLowerCase().trim();
      const origin = reactOrigins[key]?.origen || '';
      const b = legacyIndividualAllowed && origin === 'gestion' ? calcBonoReactItem(r.precio) : 0;
      const state = origin === 'gestion'
        ? '<span style="color:var(--ok);font-weight:700">✓ Reactivada por gestión</span>'
        : origin === 'espontaneo'
          ? '<span style="color:#64748b;font-weight:700">↩ Escribió sola/o · sin bono</span>'
          : '<span style="color:#b45309;font-weight:700">? Confirmar origen</span>';
      const safe = r.nombre.replace(/'/g,"\\'");
      return `<div class="co-bd-item" style="flex-wrap:wrap;gap:7px"><span>${r.nombre} <span style="font-size:.72rem;color:var(--muted)">(${r.dias}d inactivo)</span><br><span style="font-size:.72rem">${state}</span></span><span style="display:flex;gap:5px;align-items:center;flex-wrap:wrap"><button onclick="PanelCommissions.setReactivationOrigin('${safe}','gestion')" style="padding:4px 7px;border:1px solid #86efac;background:#f0fdf4;color:#15803d;border-radius:6px;cursor:pointer;font-size:.7rem">✓ Fue reactivada</button><button onclick="PanelCommissions.setReactivationOrigin('${safe}','espontaneo')" style="padding:4px 7px;border:1px solid #cbd5e1;background:#f8fafc;color:#475569;border-radius:6px;cursor:pointer;font-size:.7rem">↩ Escribió sola/o</button><strong style="font-family:var(--font-m);font-size:.78rem;color:${b?'var(--ok)':'var(--muted)'}">${b?fmtPeso(b):'$0'}</strong></span></div>`;
    }),
    ...reactManN.map(n  => { const b = legacyIndividualAllowed && cfg.bono_react_tipo === 'fijo' ? cfg.bono_react : 0; return `<div class="co-bd-item"><span>${n} <span style="font-size:.72rem;color:var(--primary)">(manual)</span></span><button onclick="removeManualReactivacion('${n.replace(/'/g,"\\'")}')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:.85rem;padding:0 4px">✕</button><span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${b ? fmtPeso(b) : '$0'}</span></div>`; })
  ].join('') || '<div class="co-empty">No se detectaron reactivaciones este mes</div>';

  const btnAux = _comisLifecycleControl('auxiliar', mes, _commissionSnapshots.auxiliar);

  const htmlAux = `<div class="co-card">
    <div class="co-card-hdr">
      <div><div class="co-card-title">${cfg.lider_nombre} — Líder Administrativa y Estratega Comercial</div><div class="co-card-role">Agenda · Recuperación · Contenido (${cfg.contenido_split_aux}%)</div></div>
      <div class="co-total">${fmtPeso(totalAuxLiquidado)}</div>
    </div>
    <div class="co-bono"><div class="co-bono-title">📅 Bono de agenda mensual · ${pctOcupReal}% de la meta</div>
      <div class="co-bono-row"><span class="co-bono-label">Meta: ${metaMensual} sesiones (${cfg.semanas_meta} × ${cfg.ses_llena}) · se liquida al cierre del mes</span><span class="co-bono-amount">${fmtPeso(bonoAg)}</span></div>
      <div class="co-breakdown">${agendaMetaH}</div></div>
    <div class="co-bono"><div class="co-bono-title">🔁 Seguimiento de pacientes reactivados</div>
      <div class="co-bono-row"><span class="co-bono-label">${totalReact} reactivado${totalReact!==1?'s':''} por gestión · actividad medida${legacyIndividualAllowed ? ` · regla histórica ${labelBonoReact}` : '<br><span style="font-size:.7rem;color:var(--muted)">Desde el 8 nov 2026 no genera comisión individual.</span>'}<br><span style="font-size:.7rem;color:var(--muted)">${reactPendientes.length} por confirmar · ${reactEspontaneas.length} retorno${reactEspontaneas.length!==1?'s':''} espontáneo${reactEspontaneas.length!==1?'s':''} sin bono</span></span><span class="co-bono-amount">${fmtPeso(bonoReact)}</span></div>
      <div class="co-breakdown">${reactH}</div>
      <div class="co-manual-row"><input class="co-manual-inp" id="coManualReactInp" type="text" placeholder="Agregar reactivación manual..." onkeydown="if(event.key==='Enter')addManualReactivacion()"><button onclick="addManualReactivacion()" style="padding:7px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.8rem;white-space:nowrap">+ Agregar</button></div></div>
    ${bonoCruzAux > 0 ? `<div class="co-bono"><div class="co-bono-title">➕ Bono Venta Cruzada asignada</div>
      <div class="co-bono-row"><span class="co-bono-label">${cruzadas.filter(c=>c.asign==='auxiliar').length} venta${cruzadas.filter(c=>c.asign==='auxiliar').length!==1?'s':''} asignada${cruzadas.filter(c=>c.asign==='auxiliar').length!==1?'s':''} a Auxiliar × ${fmtPeso(cfg.bono_cruzada)}</span><span class="co-bono-amount">${fmtPeso(bonoCruzAux)}</span></div></div>` : ''}
    ${bonoContAux > 0 ? `<div class="co-bono"><div class="co-bono-title">🎬 Parte del Bono Contenido (${cfg.contenido_split_aux}%)</div>
      <div class="co-bono-row"><span class="co-bono-label">${cfg.contenido_split_aux}% de ${fmtPeso(cfg.bono_contenido)} por meta de leads cumplida</span><span class="co-bono-amount">${fmtPeso(bonoContAux)}</span></div></div>` : ''}
    <div class="co-footer">${btnAux}<span style="font-size:.75rem;color:var(--muted)">Calculado: ${fmtPeso(totalAux)}</span></div>
  </div>`;

  // ── HTML FISIO ──
  const revH  = reventas.map(r => `<div class="co-bd-item"><span>${r.nombre} — <em style="font-size:.78rem">${r.servicio}</em></span><span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${fmtPeso(r.comision)} <span style="color:var(--muted)">(${cfg.pct_reventa}% de ${fmtPeso(r.precio)})</span></span></div>`).join('') || '<div class="co-empty">No se detectaron reventas este mes</div>';
  const selStyle = `background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.73rem;padding:3px 6px;outline:none;cursor:pointer`;
  const cruzH = cruzadas.map(c => `
    <div class="co-bd-item">
      <span>${c.nombre} — <em style="font-size:.78rem">${c.servicio}</em></span>
      <select style="${selStyle}" onchange="setCruzadaAsign('${mes}','${c.nombre.replace(/'/g,"\\'")}',this.value)">
        <option value="fisio"    ${c.asign==='fisio'    ?'selected':''}>Fisio de Apoyo</option>
        <option value="auxiliar" ${c.asign==='auxiliar' ?'selected':''}>Líder Administrativa</option>
      </select>
      <span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${fmtPeso(cfg.bono_cruzada)}</span>
    </div>`).join('') || '<div class="co-empty">No se detectaron ventas cruzadas este mes</div>';

  const btnFisio = _comisLifecycleControl('fisio', mes, _commissionSnapshots.fisio);

  const htmlFisio = `<div class="co-card">
    <div class="co-card-hdr">
      <div><div class="co-card-title">Fisioterapeuta de Apoyo</div><div class="co-card-role">Upselling · Venta cruzada</div></div>
      <div class="co-total">${fmtPeso(totalFisioLiquidado)}</div>
    </div>
    <div class="co-bono"><div class="co-bono-title">🔄 Renovaciones y reventas</div>
      <div class="co-bono-row"><span class="co-bono-label">${reventas.length} venta${reventas.length!==1?'s':''} registrada${reventas.length!==1?'s':''} · actividad medida${legacyIndividualAllowed ? ` · regla histórica ${cfg.pct_reventa}%` : '<br><span style="font-size:.7rem;color:var(--muted)">Desde el 8 nov 2026 no genera comisión individual.</span>'}</span><span class="co-bono-amount">${fmtPeso(bonoRev)}</span></div>
      <div class="co-breakdown">${revH}<div style="font-size:.7rem;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px">Servicios: ${cfg.serv_mant.map(s=>`<em>${s}</em>`).join(', ')}</div></div></div>
    <div class="co-bono"><div class="co-bono-title">➕ Bono Venta Cruzada</div>
      <div class="co-bono-row"><span class="co-bono-label">${cruzadas.filter(c=>c.asign==='fisio').length} asignada${cruzadas.filter(c=>c.asign==='fisio').length!==1?'s':''} a Fisio × ${fmtPeso(cfg.bono_cruzada)}</span><span class="co-bono-amount">${fmtPeso(bonoCruzFisio)}</span></div>
      <div class="co-breakdown">${cruzH}<div style="font-size:.7rem;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px">Elige a quién se le acredita cada venta cruzada con el selector.</div></div></div>
    <div class="co-footer">${btnFisio}<span style="font-size:.75rem;color:var(--muted)">Calculado: ${fmtPeso(totalFisio)}</span></div>
  </div>`;

  const cards = document.getElementById('coCards');
  if (cards) cards.innerHTML = htmlAux + htmlFisio;

  // ── CREADOR DE CONTENIDO (ancho completo) ──
  const visitasGuardadas = visitasActual;
  const metaLabel = `≥${cfg.contenido_leads_meta} leads`;
  const estadoCont = contenidoOk
    ? `<span style="color:var(--ok);font-weight:600">✓ Meta cumplida</span>`
    : `<span style="color:#ef4444;font-weight:600">✗ Meta no cumplida aún</span>`;

  const btnVideo = _comisLifecycleControl('video', mes, _commissionSnapshots.video);

  const htmlCont = `<div class="co-card" style="margin-top:14px">
    <div class="co-card-hdr">
      <div>
        <div class="co-card-title">🎬 Creador de Contenido</div>
        <div class="co-card-role">Compartido: ${cfg.lider_nombre} (${cfg.contenido_split_aux}%) + ${cfg.contenido_persona} (${splitVideoP}%)</div>
      </div>
      <div style="text-align:right">
        <div class="co-total">${fmtPeso(totalVideoLiquidado)}</div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:2px">${estadoCont}</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;padding:16px 24px">
      <div>
        <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Indicadores del mes</div>
        <div class="co-bono-row" style="margin-bottom:8px"><span class="co-bono-label">Leads generados</span><span style="font-family:var(--font-m);font-weight:700;color:${contenidoOk?'var(--ok)':'#ef4444'}">${leadsActual} <span style="font-size:.72rem;color:var(--muted);font-weight:400">/ meta ${metaLabel}</span></span></div>
        <div class="co-bono-row">
          <span class="co-bono-label">Visitas/alcance del mes</span>
          <span style="display:flex;align-items:center;gap:8px">
            <input type="number" value="${visitasGuardadas}" min="0" placeholder="0"
              style="width:90px;background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-m);font-size:.82rem;padding:4px 8px;outline:none;text-align:right"
              onchange="kvSet('comis_visitas_${mes}',this.value)" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
            <span style="font-size:.7rem;color:var(--muted)">manual</span>
          </span>
        </div>
      </div>
      <div>
        <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">División del bono</div>
        <div class="co-bono-row" style="margin-bottom:8px"><span class="co-bono-label">${cfg.lider_nombre} (${cfg.contenido_split_aux}%)</span><span class="co-bono-amount">${fmtPeso(bonoContAux)}</span></div>
        <div class="co-bono-row"><span class="co-bono-label">${cfg.contenido_persona} (${splitVideoP}%)</span><span class="co-bono-amount">${fmtPeso(bonoContVideo)}</span></div>
      </div>
    </div>
    <div class="co-footer">
      ${btnVideo}
      <span style="font-size:.75rem;color:var(--muted)">Calculado: ${fmtPeso(bonoCont)}</span>
    </div>
  </div>`;

  const contWrap = document.getElementById('coContenidoWrap');
  if (contWrap) contWrap.innerHTML = htmlCont;

  // ── TODO EL EQUIPO ──
  const npsStr    = npsActual !== null ? npsActual + '%' : '— (carga encuestas)';
  const equipoCol = equipoOk ? 'var(--ok)' : npsActual !== null ? '#ef4444' : 'var(--muted)';
  const htmlEquipo = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:600;margin-bottom:3px">🏆 Todo el Equipo — Calidad del Servicio</div>
      <div style="font-size:.82rem;color:var(--muted)">Meta: NPS >${cfg.equipo_nps_meta}% · Resultado: <strong style="color:${equipoCol}">${npsStr}</strong></div>
    </div>
    <div style="text-align:right">
      <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:${equipoCol}">${equipoOk ? '✓ Almuerzo trimestral' : npsActual !== null ? '✗ Meta no cumplida' : '⏳ Sin datos de encuesta'}</div>
      ${equipoOk ? '<div style="font-size:.72rem;color:var(--muted);margin-top:2px">Recordar agendar el almuerzo del equipo</div>' : ''}
    </div>
  </div>`;

  const equipoWrap = document.getElementById('coEquipoWrap');
  if (equipoWrap) equipoWrap.innerHTML = htmlEquipo;
  _renderCommissionLifecycleHistory(mes);
}

global.PanelCommissions = Object.freeze({
    _comisGetConfig,
    saveComisConfig,
    toggleComisConfig,
    _initComisMesSel,
    _comisMesVal,
    _comisSemanasLlenas,
    _comisResumenAgendaMensual,
    _comisReactivaciones,
    _comisReventas,
    _comisVentasCruzadas,
    _comisCruzadaAsign,
    setCruzadaAsign,
    _comisManualReact,
    _comisSetManualReact,
    _comisReactOrigins,
    setReactivationOrigin,
    addManualReactivacion,
    removeManualReactivacion,
    setCommissionLifecycle,
    _comisLifecycleData,
    _comisDuplicateAlerts,
    renderComisiones
  });
})(typeof window !== 'undefined' ? window : globalThis);
