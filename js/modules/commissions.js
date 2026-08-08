(function (global) {
'use strict';

function _comisGetConfig() {
  let cfg = {};
  try { cfg = JSON.parse(kvGet('comisiones_config') || '{}'); } catch(e) {}
  return {
    bono_agenda:           parseInt(cfg.bono_agenda           || '80000', 10),
    semanas_meta:          parseInt(cfg.semanas_meta          || '4',     10),
    ses_llena:             META_SESIONES_SEMANA, // siempre igual a la meta KPI — fuente única de verdad
    bono_react:            parseInt(cfg.bono_react            || '15000', 10),
    bono_react_tipo:       cfg.bono_react_tipo || 'fijo',
    pct_reventa:           parseInt(cfg.pct_reventa           || '5',     10),
    bono_cruzada:          parseInt(cfg.bono_cruzada          || '20000', 10),
    serv_mant:             (cfg.serv_mant     || 'plan activo,plan pro,longevidad,combo bienvenida,combo').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
    serv_descarga:         (cfg.serv_descarga || 'descarga').toLowerCase().trim(),
    bono_contenido:        parseInt(cfg.bono_contenido        || '50000', 10),
    contenido_split_aux:   parseInt(cfg.contenido_split_aux   || '50',    10),
    contenido_persona:     cfg.contenido_persona || 'Persona del video',
    contenido_leads_meta:  parseInt(cfg.contenido_leads_meta  || '5',     10),
    equipo_nps_meta:       parseInt(cfg.equipo_nps_meta       || '90',    10),
  };
}

function saveComisConfig() {
  const g = id => (document.getElementById(id)||{}).value || '';
  kvSet('comisiones_config', JSON.stringify({
    bono_agenda:          g('cfg_bono_agenda'),
    semanas_meta:         g('cfg_semanas_meta'),
    ses_llena:            g('cfg_ses_llena'),
    bono_react:           g('cfg_bono_react'),
    bono_react_tipo:      g('cfg_bono_react_tipo') || 'fijo',
    pct_reventa:          g('cfg_pct_reventa'),
    bono_cruzada:         g('cfg_bono_cruzada'),
    serv_mant:            g('cfg_serv_mant'),
    serv_descarga:        g('cfg_serv_descarga'),
    bono_contenido:       g('cfg_bono_contenido'),
    contenido_split_aux:  g('cfg_contenido_split_aux'),
    contenido_persona:    g('cfg_contenido_persona'),
    contenido_leads_meta: g('cfg_contenido_leads_meta'),
    equipo_nps_meta:      g('cfg_equipo_nps_meta'),
  }));
  const msg = document.getElementById('coConfigMsg');
  if (msg) { msg.style.display='inline'; setTimeout(()=>msg.style.display='none',2000); }
  renderComisiones();
}

function toggleComisConfig() {
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
  set('cfg_bono_react',           cfg.bono_react);
  set('cfg_bono_react_tipo',      cfg.bono_react_tipo);
  set('cfg_pct_reventa',          cfg.pct_reventa);
  set('cfg_bono_cruzada',         cfg.bono_cruzada);
  set('cfg_serv_mant',            cfg.serv_mant.join(', '));
  set('cfg_serv_descarga',        cfg.serv_descarga);
  set('cfg_bono_contenido',       cfg.bono_contenido);
  set('cfg_contenido_split_aux',  cfg.contenido_split_aux);
  set('cfg_contenido_persona',    cfg.contenido_persona);
  set('cfg_contenido_leads_meta', cfg.contenido_leads_meta);
  set('cfg_equipo_nps_meta',      cfg.equipo_nps_meta);
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
  let cur = new Date(mS);
  const dow = cur.getDay();
  cur.setDate(cur.getDate() - (dow === 0 ? 6 : dow - 1));
  const weeks = [];
  while (cur <= mE) {
    const ws = new Date(cur), we = new Date(cur);
    we.setDate(cur.getDate() + 6);
    const sesC = citas.filter(c => { if ((c.estado||'').includes('Cancel') || c.estado==='No asistió') return false; const f=normDate(c.fecha); return f>=toS(ws)&&f<=toS(we); }).length;
    const sesE = (eventos||[]).filter(e => { const f=normDate(e.fecha); return f>=toS(ws)&&f<=toS(we); }).length;
    weeks.push({ start: toS(ws), end: toS(we), sesiones: sesC+sesE, llena: (sesC+sesE) >= metaSes });
    cur.setDate(cur.getDate() + 7);
  }
  return weeks;
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

function marcarComisionPagada(persona) {
  const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
  kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
  renderComisiones();
}

function desmarcarComisionPagada(persona) {
  kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
  renderComisiones();
}

function renderComisiones() {
  _initComisMesSel();
  const mes = _comisMesVal();
  if (!mes) return;
  const [year, month] = mes.split('-').map(Number);
  const cfg   = _comisGetConfig();
  const citas = citasReales();
  const mLabels = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // ── SEMANAS LLENAS ──
  const semanas  = _comisSemanasLlenas(citas, allData.eventos||[], year, month, cfg.ses_llena);
  const sLlenas  = semanas.filter(s => s.llena).length;
  const sTotal   = semanas.length;
  const bonoAg   = sTotal > 0 ? (sLlenas >= sTotal ? cfg.bono_agenda : Math.round(cfg.bono_agenda * sLlenas / sTotal)) : 0;
  const pctOcup  = sTotal > 0 ? Math.round((semanas.reduce((a,s)=>a+s.sesiones,0) / (sTotal * cfg.ses_llena * (cfg.ses_llena/cfg.ses_llena))) / sTotal * 100) : 0;
  const totalSes = semanas.reduce((a,s)=>a+s.sesiones,0);
  const capacidad = sTotal * cfg.ses_llena;
  const pctOcupReal = capacidad > 0 ? (totalSes / capacidad * 100).toFixed(1) : '0';

  // ── REACTIVACIONES ──
  const reactAuto  = _comisReactivaciones(citas, year, month);
  const reactMan   = _comisManualReact(year, month);
  const reactManN  = reactMan.filter(n => !reactAuto.find(r => r.nombre.toLowerCase() === n.toLowerCase()));
  const totalReact = reactAuto.length + reactManN.length;
  const calcBonoReactItem = (precio) => cfg.bono_react_tipo === 'pct'
    ? Math.round((parseInt((precio||'0').toString().replace(/\D/g,''),10)||0) * cfg.bono_react / 100)
    : cfg.bono_react;
  const bonoReact = reactAuto.reduce((s,r) => s + calcBonoReactItem(r.precio), 0)
    + reactManN.length * (cfg.bono_react_tipo === 'fijo' ? cfg.bono_react : 0);
  const labelBonoReact = cfg.bono_react_tipo === 'pct' ? cfg.bono_react + '% del servicio' : fmtPeso(cfg.bono_react);

  // ── REVENTAS ──
  const reventas = _comisReventas(citas, year, month, cfg.serv_mant, cfg.pct_reventa);
  const bonoRev  = reventas.reduce((s,r) => s+r.comision, 0);

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
  const totalGen   = totalAux + totalFisio + totalVideo;

  const pagoAux   = kvGet('comis_pago_auxiliar_' + mes);
  const pagoFisio = kvGet('comis_pago_fisio_' + mes);
  const pagoVideo = kvGet('comis_pago_video_' + mes);

  // ── RESUMEN ──
  const setEl = (id, v) => { const el=document.getElementById(id); if(el) el.innerHTML=v; };
  setEl('coTotalGeneral',    fmtPeso(totalGen));
  setEl('coTotalAux',        fmtPeso(totalAux));
  setEl('coTotalFisio',      fmtPeso(totalFisio));
  setEl('coTotalVideo',      fmtPeso(totalVideo));
  setEl('coSemanasRes',      sLlenas + '/' + sTotal);
  setEl('coVideoPersonaLabel', cfg.contenido_persona);

  const fmtRng = (s,e) => { const ds=new Date(s+'T12:00'),de=new Date(e+'T12:00'); return ds.getDate()+' '+mLabels[ds.getMonth()]+' – '+de.getDate()+' '+mLabels[de.getMonth()]; };

  // ── HTML AUXILIAR ──
  const semanasH = semanas.map(s => `<div class="co-week"><div class="co-wdot ${s.llena?'ok':'no'}"></div><span>${fmtRng(s.start,s.end)}</span><span style="font-family:var(--font-m);color:${s.llena?'var(--ok)':'var(--muted)'}">${s.sesiones} ses.</span><span style="font-size:.72rem;color:${s.llena?'var(--ok)':'#ef4444'}">${s.llena?'✓ llena':'falta'}</span></div>`).join('');

  const reactH = [
    ...reactAuto.map(r => { const b = calcBonoReactItem(r.precio); return `<div class="co-bd-item"><span>${r.nombre} <span style="font-size:.72rem;color:var(--muted)">(${r.dias}d inactivo)</span></span><span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${fmtPeso(b)}${cfg.bono_react_tipo==='pct'?` <span style="color:var(--muted)">(${cfg.bono_react}%)</span>`:''}</span></div>`; }),
    ...reactManN.map(n  => { const b = cfg.bono_react_tipo === 'fijo' ? cfg.bono_react : 0; return `<div class="co-bd-item"><span>${n} <span style="font-size:.72rem;color:var(--primary)">(manual)</span></span><button onclick="removeManualReactivacion('${n.replace(/'/g,"\\'")}')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:.85rem;padding:0 4px">✕</button><span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${b ? fmtPeso(b) : '—'}</span></div>`; })
  ].join('') || '<div class="co-empty">No se detectaron reactivaciones este mes</div>';

  const btnAux = pagoAux
    ? `<button class="co-pay-btn pagado" onclick="desmarcarComisionPagada('auxiliar')">✓ Pagada el ${pagoAux}</button>`
    : `<button class="co-pay-btn" onclick="marcarComisionPagada('auxiliar')">Marcar como pagada</button>`;

  const htmlAux = `<div class="co-card">
    <div class="co-card-hdr">
      <div><div class="co-card-title">Auxiliar Administrativa</div><div class="co-card-role">Agenda · Recuperación · Contenido (${cfg.contenido_split_aux}%)</div></div>
      <div class="co-total">${fmtPeso(totalAux)}</div>
    </div>
    <div class="co-bono"><div class="co-bono-title">📅 Bono Agenda Llena · ${pctOcupReal}% ocupación</div>
      <div class="co-bono-row"><span class="co-bono-label">${sLlenas} de ${sTotal} semanas ≥${cfg.ses_llena} ses. · ${totalSes} sesiones totales</span><span class="co-bono-amount">${fmtPeso(bonoAg)}</span></div>
      <div class="co-breakdown">${semanasH}</div></div>
    <div class="co-bono"><div class="co-bono-title">🔁 Bono Recuperación de Pacientes</div>
      <div class="co-bono-row"><span class="co-bono-label">${totalReact} reactivado${totalReact!==1?'s':''} × ${labelBonoReact}</span><span class="co-bono-amount">${fmtPeso(bonoReact)}</span></div>
      <div class="co-breakdown">${reactH}</div>
      <div class="co-manual-row"><input class="co-manual-inp" id="coManualReactInp" type="text" placeholder="Agregar reactivación manual..." onkeydown="if(event.key==='Enter')addManualReactivacion()"><button onclick="addManualReactivacion()" style="padding:7px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.8rem;white-space:nowrap">+ Agregar</button></div></div>
    ${bonoCruzAux > 0 ? `<div class="co-bono"><div class="co-bono-title">➕ Bono Venta Cruzada asignada</div>
      <div class="co-bono-row"><span class="co-bono-label">${cruzadas.filter(c=>c.asign==='auxiliar').length} venta${cruzadas.filter(c=>c.asign==='auxiliar').length!==1?'s':''} asignada${cruzadas.filter(c=>c.asign==='auxiliar').length!==1?'s':''} a Auxiliar × ${fmtPeso(cfg.bono_cruzada)}</span><span class="co-bono-amount">${fmtPeso(bonoCruzAux)}</span></div></div>` : ''}
    ${bonoContAux > 0 ? `<div class="co-bono"><div class="co-bono-title">🎬 Parte del Bono Contenido (${cfg.contenido_split_aux}%)</div>
      <div class="co-bono-row"><span class="co-bono-label">${cfg.contenido_split_aux}% de ${fmtPeso(cfg.bono_contenido)} por meta de leads cumplida</span><span class="co-bono-amount">${fmtPeso(bonoContAux)}</span></div></div>` : ''}
    <div class="co-footer">${btnAux}<span style="font-size:.75rem;color:var(--muted)">Total: ${fmtPeso(totalAux)}</span></div>
  </div>`;

  // ── HTML FISIO ──
  const revH  = reventas.map(r => `<div class="co-bd-item"><span>${r.nombre} — <em style="font-size:.78rem">${r.servicio}</em></span><span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${fmtPeso(r.comision)} <span style="color:var(--muted)">(${cfg.pct_reventa}% de ${fmtPeso(r.precio)})</span></span></div>`).join('') || '<div class="co-empty">No se detectaron reventas este mes</div>';
  const selStyle = `background:var(--s2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-b);font-size:.73rem;padding:3px 6px;outline:none;cursor:pointer`;
  const cruzH = cruzadas.map(c => `
    <div class="co-bd-item">
      <span>${c.nombre} — <em style="font-size:.78rem">${c.servicio}</em></span>
      <select style="${selStyle}" onchange="setCruzadaAsign('${mes}','${c.nombre.replace(/'/g,"\\'")}',this.value)">
        <option value="fisio"    ${c.asign==='fisio'    ?'selected':''}>Fisio de Apoyo</option>
        <option value="auxiliar" ${c.asign==='auxiliar' ?'selected':''}>Auxiliar</option>
      </select>
      <span style="font-family:var(--font-m);font-size:.78rem;color:var(--ok)">${fmtPeso(cfg.bono_cruzada)}</span>
    </div>`).join('') || '<div class="co-empty">No se detectaron ventas cruzadas este mes</div>';

  const btnFisio = pagoFisio
    ? `<button class="co-pay-btn pagado" onclick="desmarcarComisionPagada('fisio')">✓ Pagada el ${pagoFisio}</button>`
    : `<button class="co-pay-btn" onclick="marcarComisionPagada('fisio')">Marcar como pagada</button>`;

  const htmlFisio = `<div class="co-card">
    <div class="co-card-hdr">
      <div><div class="co-card-title">Fisioterapeuta de Apoyo</div><div class="co-card-role">Upselling · Venta cruzada</div></div>
      <div class="co-total">${fmtPeso(totalFisio)}</div>
    </div>
    <div class="co-bono"><div class="co-bono-title">🔄 Bono Reventa — ${cfg.pct_reventa}% sobre las ventas</div>
      <div class="co-bono-row"><span class="co-bono-label">${reventas.length} venta${reventas.length!==1?'s':''} · Total vendido: ${fmtPeso(reventas.reduce((s,r)=>s+r.precio,0))}</span><span class="co-bono-amount">${fmtPeso(bonoRev)}</span></div>
      <div class="co-breakdown">${revH}<div style="font-size:.7rem;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px">Servicios: ${cfg.serv_mant.map(s=>`<em>${s}</em>`).join(', ')}</div></div></div>
    <div class="co-bono"><div class="co-bono-title">➕ Bono Venta Cruzada</div>
      <div class="co-bono-row"><span class="co-bono-label">${cruzadas.filter(c=>c.asign==='fisio').length} asignada${cruzadas.filter(c=>c.asign==='fisio').length!==1?'s':''} a Fisio × ${fmtPeso(cfg.bono_cruzada)}</span><span class="co-bono-amount">${fmtPeso(bonoCruzFisio)}</span></div>
      <div class="co-breakdown">${cruzH}<div style="font-size:.7rem;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px">Elige a quién se le acredita cada venta cruzada con el selector.</div></div></div>
    <div class="co-footer">${btnFisio}<span style="font-size:.75rem;color:var(--muted)">Total: ${fmtPeso(totalFisio)}</span></div>
  </div>`;

  const cards = document.getElementById('coCards');
  if (cards) cards.innerHTML = htmlAux + htmlFisio;

  // ── CREADOR DE CONTENIDO (ancho completo) ──
  const visitasGuardadas = visitasActual;
  const metaLabel = `≥${cfg.contenido_leads_meta} leads`;
  const estadoCont = contenidoOk
    ? `<span style="color:var(--ok);font-weight:600">✓ Meta cumplida</span>`
    : `<span style="color:#ef4444;font-weight:600">✗ Meta no cumplida aún</span>`;

  const btnVideo = pagoVideo
    ? `<button class="co-pay-btn pagado" onclick="desmarcarComisionPagada('video')">✓ Pagada el ${pagoVideo}</button>`
    : `<button class="co-pay-btn" onclick="marcarComisionPagada('video')">Marcar como pagada a ${cfg.contenido_persona}</button>`;

  const htmlCont = `<div class="co-card" style="margin-top:14px">
    <div class="co-card-hdr">
      <div>
        <div class="co-card-title">🎬 Creador de Contenido</div>
        <div class="co-card-role">Compartido: Auxiliar (${cfg.contenido_split_aux}%) + ${cfg.contenido_persona} (${splitVideoP}%)</div>
      </div>
      <div style="text-align:right">
        <div class="co-total">${fmtPeso(bonoCont)}</div>
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
        <div class="co-bono-row" style="margin-bottom:8px"><span class="co-bono-label">Auxiliar Administrativa (${cfg.contenido_split_aux}%)</span><span class="co-bono-amount">${fmtPeso(bonoContAux)}</span></div>
        <div class="co-bono-row"><span class="co-bono-label">${cfg.contenido_persona} (${splitVideoP}%)</span><span class="co-bono-amount">${fmtPeso(bonoContVideo)}</span></div>
      </div>
    </div>
    <div class="co-footer">
      ${btnVideo}
      <span style="font-size:.75rem;color:var(--muted)">Bono total: ${fmtPeso(bonoCont)}</span>
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
}

global.PanelCommissions = Object.freeze({
    _comisGetConfig,
    saveComisConfig,
    toggleComisConfig,
    _initComisMesSel,
    _comisMesVal,
    _comisSemanasLlenas,
    _comisReactivaciones,
    _comisReventas,
    _comisVentasCruzadas,
    _comisCruzadaAsign,
    setCruzadaAsign,
    _comisManualReact,
    _comisSetManualReact,
    addManualReactivacion,
    removeManualReactivacion,
    marcarComisionPagada,
    desmarcarComisionPagada,
    renderComisiones
  });
})(typeof window !== 'undefined' ? window : globalThis);
