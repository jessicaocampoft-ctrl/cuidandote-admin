(function(global) {
  'use strict';

function setModoIngresos(modo) {
  _modoIngresos = modo;
  ['dia','semana','mes'].forEach(m => {
    const id = 'btnModo'+m.charAt(0).toUpperCase()+m.slice(1);
    const el = document.getElementById(id);
    if (el) el.className = m === modo ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
  });
  // En modo mes el input de fecha solo necesita año-mes; mostramos un mes-picker alternativo
  renderCitasResumen();
  renderIngresosDetalle();
}

function _ingFmt(d) { return d.toLocalDateStr(); }

function _ingFmtLabel(d) { return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short'}); }

function _ingFmtMes(d) { return d.toLocaleDateString('es-CO',{month:'long',year:'numeric'}); }

function renderCitasResumen() {
  try {
    const el = document.getElementById('citasResumenStats');
    if (!el) return;
    const citas = citasReales();
    const fechaInp = document.getElementById('ingresosFechaInput');
    const fechaSel = (fechaInp && fechaInp.value) ? fechaInp.value : today();
    const modo = _modoIngresos || 'semana';
    const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const DIAS  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

    // Cuenta citas en un rango [desde, hasta] (strings YYYY-MM-DD)
    const contarEntre = (desde, hasta) =>
      citas.filter(c => { const f = normDate(c.fecha); return f >= desde && f <= hasta; }).length;

    // Formatea Date → 'YYYY-MM-DD'
    const ds = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');

    const badge = (diff, nAnt, label) => {
      const color = diff > 0 ? '#059669' : diff < 0 ? '#ef4444' : 'var(--muted)';
      const txt = diff > 0 ? '↑ '+diff+' cita'+(diff!==1?'s':'')
                : diff < 0 ? '↓ '+Math.abs(diff)+' cita'+(Math.abs(diff)!==1?'s':'')
                : '= igual';
      return `<div style="margin-top:5px;font-size:.71rem;color:var(--muted)">${label}: <strong style="color:${color}">${txt}</strong> (antes: ${nAnt})</div>`;
    };

    const card = (titulo, n, badgeHtml, color) =>
      `<div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${color}">
        <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">${titulo}</div>
        <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${color};line-height:1.1">${n}</div>
        ${badgeHtml}
      </div>`;

    let c1 = '', c2 = '';

    if (modo === 'dia') {
      const ref  = new Date(fechaSel+'T12:00:00');
      const nDia = contarEntre(fechaSel, fechaSel);
      const ayer = new Date(ref); ayer.setDate(ref.getDate()-1);
      const nAyer = contarEntre(ds(ayer), ds(ayer));
      const semAnt = new Date(ref); semAnt.setDate(ref.getDate()-7);
      const nSemAnt = contarEntre(ds(semAnt), ds(semAnt));
      const label = DIAS[ref.getDay()]+' '+ref.getDate()+' de '+MESES[ref.getMonth()];
      c1 = card(label, nDia, badge(nDia-nAyer, nAyer, 'vs ayer'), '#6366f1');
      c2 = card('Mismo día sem. anterior', nSemAnt, badge(nDia-nSemAnt, nSemAnt, 'diferencia'), 'var(--primary)');

    } else if (modo === 'semana') {
      const ref = new Date(fechaSel+'T12:00:00');
      const dow = ref.getDay();
      const lun = new Date(ref); lun.setDate(ref.getDate()-(dow===0?6:dow-1));
      const dom = new Date(lun); dom.setDate(lun.getDate()+6);
      const nSem = contarEntre(ds(lun), ds(dom));
      const lunAnt = new Date(lun); lunAnt.setDate(lun.getDate()-7);
      const domAnt = new Date(dom); domAnt.setDate(dom.getDate()-7);
      const nSemAnt = contarEntre(ds(lunAnt), ds(domAnt));
      const label = lun.getDate()+'/'+String(lun.getMonth()+1).padStart(2,'0')+' – '+dom.getDate()+'/'+String(dom.getMonth()+1).padStart(2,'0');
      c1 = card('Semana '+label, nSem, badge(nSem-nSemAnt, nSemAnt, 'vs sem. anterior'), '#6366f1');
      // Mes completo en que cae esta semana
      const mesN = lun.getMonth(), yearN = lun.getFullYear();
      const inicioMes = yearN+'-'+String(mesN+1).padStart(2,'0')+'-01';
      const finMes    = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(new Date(yearN,mesN+1,0).getDate()).padStart(2,'0');
      const nMes = contarEntre(inicioMes, finMes);
      const mesAntN = mesN===0?11:mesN-1, yearAntN = mesN===0?yearN-1:yearN;
      const diasAnt = new Date(yearAntN,mesAntN+1,0).getDate();
      const hastaMA = String(Math.min(new Date().getDate(), diasAnt)).padStart(2,'0');
      const nMesAnt = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+hastaMA);
      c2 = card(MESES[mesN]+' '+yearN, nMes, badge(nMes-nMesAnt, nMesAnt, 'vs '+MESES[mesAntN]+' día '+parseInt(hastaMA)), 'var(--primary)');

    } else {
      const ref  = new Date(fechaSel+'T12:00:00');
      const mesN = ref.getMonth(), yearN = ref.getFullYear();
      const inicioMes = yearN+'-'+String(mesN+1).padStart(2,'0')+'-01';
      const finMes    = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(new Date(yearN,mesN+1,0).getDate()).padStart(2,'0');
      const nMes = contarEntre(inicioMes, finMes);
      const mesAntN = mesN===0?11:mesN-1, yearAntN = mesN===0?yearN-1:yearN;
      const diasAnt = new Date(yearAntN,mesAntN+1,0).getDate();
      const hastaMA = String(Math.min(new Date().getDate(), diasAnt)).padStart(2,'0');
      const nMesAnt = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+hastaMA);
      const nMesAntCompleto = contarEntre(yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-01', yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+String(diasAnt).padStart(2,'0'));
      c1 = card(MESES[mesN]+' '+yearN, nMes, badge(nMes-nMesAnt, nMesAnt, 'vs '+MESES[mesAntN]+' hasta día '+parseInt(hastaMA)), 'var(--primary)');
      c2 = card(MESES[mesAntN]+' (mes completo)', nMesAntCompleto, '', '#6366f1');
    }

    el.innerHTML = `
      <div style="border-bottom:1px solid var(--border);padding-bottom:16px;margin-bottom:16px">
        <div style="font-size:.75rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">📊 Resumen de citas</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${c1}${c2}</div>
      </div>`;
  } catch(err) {
    const el = document.getElementById('citasResumenStats');
    if (el) el.innerHTML = '';
  }
}

function renderIngresosDetalle() {
  const fechaInp = document.getElementById('ingresosFechaInput');
  const resultEl = document.getElementById('ingresosDetalleResult');
  const analEl   = document.getElementById('ingresosAnalisis');
  const labelEl  = document.getElementById('ingresosRangoLabel');
  if (!fechaInp || !resultEl) return;
  const fechaSel = fechaInp.value;
  if (!fechaSel) { resultEl.innerHTML = '<div style="color:var(--muted);font-size:.85rem">Selecciona una fecha.</div>'; if (analEl) analEl.innerHTML=''; return; }

  const citas = citasReales();
  const DIAS_NOM = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const MESES_NOM = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  // ── MODO DÍA ──
  if (_modoIngresos === 'dia') {
    const citasDia  = citas.filter(c => normDate(c.fecha) === fechaSel);
    const evtsDia   = (allData.eventos||[]).filter(e => normDate(e.fecha) === fechaSel);
    const total     = citasDia.reduce((s,c) => s + parsePrecio(c.precio), 0)
                    + evtsDia.reduce((s,e) => s + parsePrecio(e.cobro), 0);
    const dObj = new Date(fechaSel+'T12:00:00');
    if (labelEl) labelEl.textContent = DIAS_NOM[dObj.getDay()] + ' ' + dObj.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'});
    if (!citasDia.length && !evtsDia.length) {
      resultEl.innerHTML = '<div style="color:var(--muted);font-size:.85rem;padding:16px 0">Sin citas registradas para este día.</div>';
      if (analEl) analEl.innerHTML = '';
      return;
    }
    // Servicio más frecuente del día
    const srvDia = {};
    citasDia.forEach(c => { srvDia[c.servicio||'—'] = (srvDia[c.servicio||'—']||0)+1; });
    const topSrvDia = Object.entries(srvDia).sort((a,b)=>b[1]-a[1])[0];

    const totalItems = citasDia.length + evtsDia.length;
    resultEl.innerHTML = `
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <span style="font-family:var(--font-h);font-size:1.6rem;color:var(--primary)">$${total.toLocaleString('es-CO')}</span>
        <span style="font-size:.8rem;color:var(--muted)">${citasDia.length} cita${citasDia.length!==1?'s':''}${evtsDia.length?' + '+evtsDia.length+' evento(s)':''}</span>
        ${totalItems > 0 ? `<span style="font-size:.8rem;color:var(--muted)">· Ticket promedio: <strong>$${Math.round(total/totalItems).toLocaleString('es-CO')}</strong></span>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${citasDia.sort((a,b)=>(a.hora||'').localeCompare(b.hora||'')).map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 10px;background:var(--s2);border-radius:8px;gap:10px">
            <span style="color:var(--muted);min-width:44px">${c.hora||'—'}</span>
            <span style="flex:1;font-weight:500">${c.nombre||'—'}</span>
            <span style="color:var(--muted);flex:1;font-size:.78rem">${c.servicio||'—'}</span>
            <span style="font-family:var(--font-m);color:var(--primary)">$${parsePrecio(c.precio).toLocaleString('es-CO')}</span>
          </div>`).join('')}
        ${evtsDia.sort((a,b)=>(a.horaInicio||'').localeCompare(b.horaInicio||'')).map(e => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 10px;background:rgba(124,58,237,.07);border-radius:8px;gap:10px;border-left:3px solid #7c3aed">
            <span style="color:var(--muted);min-width:44px">${e.horaInicio||'—'}</span>
            <span style="flex:1;font-weight:500">⚡ ${e.titulo||'—'}</span>
            <span style="color:var(--muted);flex:1;font-size:.78rem">${e.tipo||'Evento externo'}</span>
            <span style="font-family:var(--font-m);color:#7c3aed">$${parsePrecio(e.cobro).toLocaleString('es-CO')}</span>
          </div>`).join('')}
      </div>`;
    if (analEl) analEl.innerHTML = '';

  // ── MODO SEMANA ──
  } else if (_modoIngresos === 'semana') {
    const ref = new Date(fechaSel+'T12:00:00');
    const dow = ref.getDay();
    const lunes = new Date(ref); lunes.setDate(ref.getDate() - (dow===0?6:dow-1));
    const domingo = new Date(lunes); domingo.setDate(lunes.getDate()+6);
    if (labelEl) labelEl.textContent = 'Semana del ' + _ingFmtLabel(lunes) + ' al ' + _ingFmtLabel(domingo);

    const dias = [];
    for (let i=0;i<7;i++) {
      const d = new Date(lunes); d.setDate(lunes.getDate()+i);
      const fStr = _ingFmt(d);
      const cs = citas.filter(c => normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fStr);
      const totalEvts = es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      dias.push({ fecha:fStr, dia:DIAS_NOM[d.getDay()], citas:cs, eventos:es, total:cs.reduce((s,c)=>s+parsePrecio(c.precio),0)+totalEvts });
    }
    const totalSem = dias.reduce((s,d)=>s+d.total,0);
    const nCitas   = dias.reduce((s,d)=>s+d.citas.length,0);
    const maxDia   = Math.max(...dias.map(d=>d.total),1);
    const mejorDia = [...dias].sort((a,b)=>b.total-a.total)[0];
    const ticketProm = nCitas > 0 ? Math.round(totalSem/nCitas) : 0;

    // Semana anterior para comparar
    const lunesAnt = new Date(lunes); lunesAnt.setDate(lunes.getDate()-7);
    const domAnt   = new Date(lunesAnt); domAnt.setDate(lunesAnt.getDate()+6);
    let totalAnt = 0, nCitasAnt = 0;
    for (let i=0;i<7;i++) {
      const d = new Date(lunesAnt); d.setDate(lunesAnt.getDate()+i);
      const fAnt = _ingFmt(d);
      const cs = citas.filter(c => normDate(c.fecha)===fAnt);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fAnt);
      totalAnt += cs.reduce((s,c)=>s+parsePrecio(c.precio),0) + es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      nCitasAnt += cs.length;
    }
    const diffSem = totalSem - totalAnt;
    const pctDiff = totalAnt>0 ? Math.round(diffSem/totalAnt*100) : null;

    // Servicios de la semana
    const srvSem = {};
    dias.flatMap(d=>d.citas).forEach(c => { srvSem[c.servicio||'—']=(srvSem[c.servicio||'—']||0)+1; });
    const topSrvSem = Object.entries(srvSem).sort((a,b)=>b[1]-a[1]).slice(0,3);

    // Pacientes nuevos vs recurrentes en la semana
    const nomsSem = dias.flatMap(d=>d.citas).map(c=>(c.nombre||'').toLowerCase().trim()).filter(Boolean);
    const contGlobal = {};
    citas.forEach(c => { const n=(c.nombre||'').toLowerCase().trim(); contGlobal[n]=(contGlobal[n]||0)+1; });
    const nuevosSem = nomsSem.filter(n => contGlobal[n]===1).length;
    const recSem    = nomsSem.filter(n => contGlobal[n]>1).length;

    resultEl.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Total semana</div>
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">$${totalSem.toLocaleString('es-CO')}</div>
          <div style="font-size:.73rem;color:var(--muted)">${nCitas} cita${nCitas!==1?'s':''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Ticket promedio</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${ticketProm.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${diffSem>=0?'var(--ok)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">vs semana anterior</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${diffSem>=0?'var(--ok)':'#ef4444'}">${diffSem>=0?'↑':'↓'} ${pctDiff!==null?Math.abs(pctDiff)+'%':'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${diffSem>=0?'+':''}$${diffSem.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Mejor día</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)">${mejorDia.total>0?mejorDia.dia:'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${mejorDia.total>0?'$'+mejorDia.total.toLocaleString('es-CO'):''}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${dias.map(d => {
          const pct = Math.round(d.total/maxDia*100);
          const esHoy = d.fecha===today();
          return `<div style="padding:8px 0">
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:4px">
              <span style="font-weight:${d.citas.length?'600':'400'};color:${esHoy?'var(--primary)':d.citas.length?'var(--text)':'var(--muted)'}">${d.dia}${esHoy?' (hoy)':''}</span>
              <span style="font-family:var(--font-m);color:${d.total>0?'var(--primary)':'var(--muted)'}">
                ${d.total>0?'$'+d.total.toLocaleString('es-CO'):'—'} <span style="color:var(--muted);font-size:.72rem">${d.citas.length?d.citas.length+' cita'+(d.citas.length!==1?'s':''):''}</span>
              </span>
            </div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:${esHoy?'var(--primary)':'#6366f1'}"></div></div>
            ${d.citas.length ? `<div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px">${d.citas.sort((a,b)=>(a.hora||'').localeCompare(b.hora||'')).map(c=>`<span style="font-size:.7rem;padding:2px 8px;background:var(--s2);border-radius:99px;color:var(--muted)">${c.hora||''} ${c.nombre||''}</span>`).join('')}</div>` : ''}
          </div>`;
        }).join('')}
      </div>`;

    // Análisis semanal
    if (analEl) analEl.innerHTML = _analisisSemana({ totalSem, nCitas, ticketProm, diffSem, pctDiff, mejorDia, topSrvSem, nuevosSem, recSem, totalAnt, nCitasAnt, dias, lunes });

  // ── MODO MES ──
  } else {
    const refD = new Date(fechaSel+'T12:00:00');
    const mesN = refD.getMonth();
    const yearN = refD.getFullYear();
    const diasMes = new Date(yearN, mesN+1, 0).getDate();
    const hoyStr = today();
    if (labelEl) labelEl.textContent = MESES_NOM[mesN] + ' ' + yearN;

    // Días del mes
    const diasData = [];
    for (let i=1;i<=diasMes;i++) {
      const fStr = yearN+'-'+String(mesN+1).padStart(2,'0')+'-'+String(i).padStart(2,'0');
      const cs = citas.filter(c => normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e => normDate(e.fecha)===fStr);
      const totalEvts = es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      diasData.push({ fecha:fStr, num:i, dia:DIAS_NOM[new Date(fStr+'T12:00:00').getDay()], citas:cs, eventos:es, total:cs.reduce((s,c)=>s+parsePrecio(c.precio),0)+totalEvts, esFuturo: fStr > hoyStr });
    }
    const totalMes   = diasData.reduce((s,d)=>s+d.total,0);
    const nCitasMes  = diasData.reduce((s,d)=>s+d.citas.length,0);
    const maxDiaMes  = Math.max(...diasData.map(d=>d.total),1);
    const ticketM    = nCitasMes>0 ? Math.round(totalMes/nCitasMes) : 0;
    const diasConCitas = diasData.filter(d=>d.citas.length>0||d.eventos.length>0);
    const mejorDiaMes  = [...diasData].sort((a,b)=>b.total-a.total)[0];
    const peorDiaMes   = diasConCitas.length ? [...diasConCitas].sort((a,b)=>a.total-b.total)[0] : null;

    // Mes anterior
    const mesAntD = new Date(yearN, mesN-1, 1);
    const mesAntN = mesAntD.getMonth(), yearAntN = mesAntD.getFullYear();
    const diasMesAnt = new Date(yearAntN, mesAntN+1, 0).getDate();
    let totalMesAnt=0, nCitasMesAnt=0;
    for (let i=1;i<=diasMesAnt;i++) {
      const fStr = yearAntN+'-'+String(mesAntN+1).padStart(2,'0')+'-'+String(i).padStart(2,'0');
      const cs = citas.filter(c=>normDate(c.fecha)===fStr);
      const es = (allData.eventos||[]).filter(e=>normDate(e.fecha)===fStr);
      totalMesAnt += cs.reduce((s,c)=>s+parsePrecio(c.precio),0) + es.reduce((s,e)=>s+parsePrecio(e.cobro),0);
      nCitasMesAnt += cs.length;
    }
    const diffMes = totalMes - totalMesAnt;
    const pctDiffM = totalMesAnt>0 ? Math.round(diffMes/totalMesAnt*100) : null;

    // Servicios del mes
    const srvMes = {};
    diasData.flatMap(d=>d.citas).forEach(c=>{srvMes[c.servicio||'—']=(srvMes[c.servicio||'—']||0)+1;});
    const topSrvMes = Object.entries(srvMes).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const maxSrvMes = topSrvMes[0]?topSrvMes[0][1]:1;

    // Pacientes
    const nomsMes = diasData.flatMap(d=>d.citas).map(c=>(c.nombre||'').toLowerCase().trim()).filter(Boolean);
    const contG = {};
    citas.forEach(c=>{const n=(c.nombre||'').toLowerCase().trim();contG[n]=(contG[n]||0)+1;});
    const nuevosMes = nomsMes.filter(n=>contG[n]===1).length;
    const recMes    = nomsMes.filter(n=>contG[n]>1).length;

    // Semanas del mes
    const semanasMap = {};
    diasData.forEach(d => {
      const dObj = new Date(d.fecha+'T12:00:00');
      const dow = dObj.getDay();
      const lu = new Date(dObj); lu.setDate(dObj.getDate()-(dow===0?6:dow-1));
      const key = _ingFmt(lu);
      if (!semanasMap[key]) semanasMap[key] = { lunesStr:key, total:0, n:0 };
      semanasMap[key].total += d.total;
      semanasMap[key].n     += d.citas.length;
    });
    const semanas = Object.values(semanasMap).sort((a,b)=>a.lunesStr.localeCompare(b.lunesStr));
    const maxSemana = Math.max(...semanas.map(s=>s.total),1);

    // Meta mensual
    const meta = getMeta();

    resultEl.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Total mes</div>
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">$${totalMes.toLocaleString('es-CO')}</div>
          <div style="font-size:.73rem;color:var(--muted)">${nCitasMes} cita${nCitasMes!==1?'s':''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Ticket promedio</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${ticketM.toLocaleString('es-CO')}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${diffMes>=0?'var(--ok)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">vs mes anterior</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${diffMes>=0?'var(--ok)':'#ef4444'}">${diffMes>=0?'↑':'↓'} ${pctDiffM!==null?Math.abs(pctDiffM)+'%':'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${diffMes>=0?'+':''}$${diffMes.toLocaleString('es-CO')}</div>
        </div>
        ${meta ? `<div style="padding:12px 14px;background:var(--s2);border-radius:10px;border-left:3px solid ${totalMes>=meta?'var(--ok)':totalMes/meta>=.7?'var(--warn)':'#ef4444'}">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Meta mensual</div>
          <div style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:${totalMes>=meta?'var(--ok)':totalMes/meta>=.7?'var(--warn)':'#ef4444'}">${Math.min(Math.round(totalMes/meta*100),100)}%</div>
          <div style="font-size:.73rem;color:var(--muted)">$${meta.toLocaleString('es-CO')}</div>
        </div>` : ''}
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Mejor día</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)">${mejorDiaMes.total>0?mejorDiaMes.dia+' '+mejorDiaMes.num:'—'}</div>
          <div style="font-size:.73rem;color:var(--muted)">${mejorDiaMes.total>0?'$'+mejorDiaMes.total.toLocaleString('es-CO'):''}</div>
        </div>
        <div style="padding:12px 14px;background:var(--s2);border-radius:10px">
          <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">Pacientes</div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700">${nuevosMes} nuevos · ${recMes} recurrentes</div>
        </div>
      </div>

      <!-- Barras semanales -->
      <div style="margin-bottom:20px">
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Ingresos por semana</div>
        ${semanas.map(s => {
          const pct = Math.round(s.total/maxSemana*100);
          const lu = new Date(s.lunesStr+'T12:00:00');
          const do2 = new Date(lu); do2.setDate(lu.getDate()+6);
          return `<div style="padding:6px 0">
            <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:3px">
              <span style="color:var(--muted)">${_ingFmtLabel(lu)} — ${_ingFmtLabel(do2)}</span>
              <span style="font-family:var(--font-m);color:${s.total>0?'var(--primary)':'var(--muted)'}">${s.total>0?'$'+s.total.toLocaleString('es-CO'):'—'} <span style="font-size:.7rem;color:var(--muted)">${s.n?s.n+' citas':''}</span></span>
            </div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:var(--primary)"></div></div>
          </div>`;
        }).join('')}
      </div>

      <!-- Servicios del mes -->
      <div style="margin-bottom:20px">
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Servicios más frecuentes</div>
        ${topSrvMes.map(([s,n],i) => `
          <div class="metric-row">
            <div style="font-size:.8rem;flex:2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${i===0?'🥇 ':''}${s}</div>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxSrvMes*100)}%;background:${i===0?'var(--primary)':'#6366f1'}"></div></div>
            <div class="metric-val" style="color:${i===0?'var(--primary)':'#6366f1'}">${n}</div>
          </div>`).join('')}
      </div>

      <!-- Detalle por días (lista compacta) -->
      <div>
        <div style="font-size:.78rem;color:var(--muted);font-family:var(--font-m);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">Detalle día a día</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:6px">
          ${diasData.filter(d=>d.citas.length>0).map(d => `
            <div style="padding:8px 12px;background:var(--s2);border-radius:8px;display:flex;justify-content:space-between;align-items:center;${d.esFuturo?'opacity:.65':''}">
              <div>
                <span style="font-size:.8rem;font-weight:600">${d.dia} ${d.num}</span>
                <span style="font-size:.73rem;color:var(--muted);margin-left:6px">${d.citas.length} cita${d.citas.length!==1?'s':''}</span>
                ${d.esFuturo?'<span style="font-size:.68rem;color:var(--warn);margin-left:4px">· programada</span>':''}
              </div>
              <span style="font-family:var(--font-m);font-size:.85rem;color:var(--primary)">$${d.total.toLocaleString('es-CO')}</span>
            </div>`).join('')}
        </div>
      </div>`;

    if (analEl) analEl.innerHTML = _analisisMes({ totalMes, nCitasMes, ticketM, diffMes, pctDiffM, mejorDiaMes, peorDiaMes, topSrvMes, nuevosMes, recMes, totalMesAnt, nCitasMesAnt, semanas, meta, diasMes, mesNombre: MESES_NOM[mesN] });
  }
}

function _analisisSemana({ totalSem, nCitas, ticketProm, diffSem, pctDiff, mejorDia, topSrvSem, nuevosSem, recSem, totalAnt, nCitasAnt, dias, lunes }) {
  const positivos = [];
  const alertas   = [];
  const recs      = [];

  const DIAS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const toStr = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');

  // ── Histórico: últimas 12 semanas (excluye la semana seleccionada) ──
  const lunD = lunes instanceof Date ? lunes : new Date((lunes||today())+'T12:00:00');
  const lunesHace12 = new Date(lunD); lunesHace12.setDate(lunD.getDate()-84);
  const histCitas = (allData.citas||[]).filter(c => {
    const f = normDate(c.fecha); if (!f) return false;
    const fD = new Date(f+'T12:00:00');
    return fD < lunD && fD >= lunesHace12;
  });

  // Promedio por día de semana (dow 0=Dom … 6=Sáb)
  const histDow = {};
  histCitas.forEach(c => {
    const f = normDate(c.fecha); if (!f) return;
    const d = new Date(f+'T12:00:00');
    const dow = d.getDay();
    const lu2 = new Date(d); lu2.setDate(d.getDate()-(dow===0?6:dow-1));
    const semKey = toStr(lu2);
    if (!histDow[dow]) histDow[dow] = { totalAcum:0, nCitas:0, semanas:new Set() };
    histDow[dow].totalAcum += parsePrecio(c.precio);
    histDow[dow].nCitas++;
    histDow[dow].semanas.add(semKey);
  });
  const histDowProm = {};
  Object.entries(histDow).forEach(([dow, h]) => {
    const nSem = h.semanas.size||1;
    histDowProm[dow] = { avgTotal: Math.round(h.totalAcum/nSem), avgCitas: +(h.nCitas/nSem).toFixed(1) };
  });

  // Mejor hora histórica (acumulado)
  const histHr = {};
  histCitas.forEach(c => {
    const h = (c.hora||'').split(':')[0]; if (!h) return;
    if (!histHr[h]) histHr[h]={total:0,n:0};
    histHr[h].total+=parsePrecio(c.precio); histHr[h].n++;
  });
  const histHrTop = Object.entries(histHr).sort((a,b)=>b[1].total-a[1].total)[0];

  // Servicio más rentable histórico
  const histSrvMap = {};
  histCitas.forEach(c => { const k=c.servicio||'—'; if(!histSrvMap[k])histSrvMap[k]={total:0,n:0}; histSrvMap[k].total+=parsePrecio(c.precio);histSrvMap[k].n++; });
  const histSrvTop = Object.entries(histSrvMap).sort((a,b)=>b[1].total-a[1].total)[0];

  // Ticket histórico promedio
  const ticketHist = histCitas.length>0 ? Math.round(histCitas.reduce((s,c)=>s+parsePrecio(c.precio),0)/histCitas.length) : 0;

  // Días hábiles de la semana seleccionada
  const diasHab = dias.filter(d=>!['Sábado','Domingo'].includes(d.dia));

  // Días que superaron / quedaron por debajo de su promedio histórico
  const winsDay=[], gapsDay=[];
  diasHab.forEach(d => {
    const dow = new Date(d.fecha+'T12:00:00').getDay();
    const hist = histDowProm[dow];
    if (!hist) return;
    if (d.total >= hist.avgTotal*1.2 && hist.avgTotal>0 && d.citas.length>0) winsDay.push({...d, avg:hist.avgTotal});
    else if (d.citas.length < hist.avgCitas*0.5 && hist.avgCitas>=1) gapsDay.push({...d, avgCitas:hist.avgCitas, avgTotal:hist.avgTotal});
  });

  // ── \u2705 LO QUE HICISTE BIEN (para repetir) ──
  if (pctDiff!==null && pctDiff>=20)
    positivos.push(`Semana excelente: ingresaste <strong>${pctDiff}% más</strong> que la semana anterior ($${Math.abs(diffSem).toLocaleString('es-CO')} adicionales). Mantén ese ritmo.`);
  else if (pctDiff!==null && pctDiff>=5)
    positivos.push(`Semana en crecimiento: <strong>+${pctDiff}%</strong> respecto a la semana anterior.`);

  winsDay.slice(0,2).forEach(w =>
    positivos.push(`El <strong>${w.dia}</strong> fue excepcionalmente bueno — $${w.total.toLocaleString('es-CO')} con ${w.citas.length} cita${w.citas.length!==1?'s':''}, muy por encima de tu promedio histórico ($${w.avg.toLocaleString('es-CO')}). Repite ese volumen.`)
  );

  if (recSem>0 && recSem>=nuevosSem)
    positivos.push(`<strong>${recSem} pacientes recurrentes</strong> esta semana — tu retención es sólida. Estos pacientes confían en ti.`);

  if (ticketHist>0 && ticketProm>ticketHist*1.1)
    positivos.push(`Ticket promedio de <strong>$${ticketProm.toLocaleString('es-CO')}</strong>, superior a tu promedio histórico ($${ticketHist.toLocaleString('es-CO')}). Buen mix de servicios.`);

  if (nuevosSem>=2)
    positivos.push(`<strong>${nuevosSem} pacientes nuevos</strong> esta semana — excelente captación. Activa el seguimiento automático para fidelizarlos.`);

  if (topSrvSem[0] && nCitas>0 && topSrvSem[0][1]/nCitas>=0.5)
    positivos.push(`El <strong>${topSrvSem[0][0]}</strong> fue tu servicio estrella esta semana (${topSrvSem[0][1]} de ${nCitas} sesiones). Si es rentable, sigue priorizándolo.`);

  // ── ⚠️ LO QUE PODRÍAS MEJORAR ──
  if (pctDiff!==null && pctDiff<=-20)
    alertas.push(`Caída del <strong>${Math.abs(pctDiff)}%</strong> respecto a la semana anterior ($${Math.abs(diffSem).toLocaleString('es-CO')} menos). Revisa si hubo cancelaciones o días sin agenda.`);
  else if (pctDiff!==null && pctDiff<0)
    alertas.push(`Leve baja del ${Math.abs(pctDiff)}% vs semana anterior.`);

  gapsDay.slice(0,2).forEach(g => {
    if (g.citas.length===0)
      alertas.push(`El <strong>${g.dia}</strong> quedó sin citas — históricamente promedias ${g.avgCitas.toFixed(1)} cita${g.avgCitas===1?'':'s'} y $${g.avgTotal.toLocaleString('es-CO')} ese día. Es un espacio a recuperar.`);
    else
      alertas.push(`El <strong>${g.dia}</strong> tuvo solo ${g.citas.length} cita${g.citas.length===1?'':'s'} cuando históricamente promedias ${g.avgCitas.toFixed(1)}. Aún hay capacidad sin usar.`);
  });

  const diasSinCitas = diasHab.filter(d=>d.citas.length===0);
  if (diasSinCitas.length>=2 && !gapsDay.some(g=>g.citas.length===0))
    alertas.push(`${diasSinCitas.length} días hábiles sin citas (<strong>${diasSinCitas.map(d=>d.dia).join(', ')}</strong>). Publica disponibilidad o envía recordatorios esos días.`);

  if (ticketHist>0 && ticketProm<ticketHist*0.85 && nCitas>0)
    alertas.push(`Ticket promedio de <strong>$${ticketProm.toLocaleString('es-CO')}</strong>, por debajo de tu promedio histórico ($${ticketHist.toLocaleString('es-CO')}). Puede haber descuentos o más sesiones de bajo precio.`);

  // ── 💡 RECOMENDACIONES BASADAS EN TUS DATOS ──
  // Mejor día de semana histórico
  const mejorDowEntry = Object.entries(histDowProm)
    .filter(([d])=>![0,6].includes(+d))
    .sort((a,b)=>b[1].avgTotal-a[1].avgTotal)[0];
  if (mejorDowEntry) {
    const dNom = DIAS_ES[+mejorDowEntry[0]];
    const dataDow = dias.find(d=>d.dia===dNom);
    if (!dataDow||dataDow.total<mejorDowEntry[1].avgTotal*0.7)
      recs.push(`El <strong>${dNom}</strong> es históricamente tu día más rentable (promedio $${mejorDowEntry[1].avgTotal.toLocaleString('es-CO')}). ${!dataDow||dataDow.citas.length===0?'Esta semana no tuviste citas ese día':'Esta semana estuvo por debajo'} — intenta maximizarlo la próxima semana.`);
  }

  // Mejor hora histórica
  if (histHrTop)
    recs.push(`Tu horario más productivo históricamente es las <strong>${histHrTop[0]}:00</strong> (${histHrTop[1].n} sesiones en 12 semanas, $${histHrTop[1].total.toLocaleString('es-CO')} acumulados). Prioriza agendar en ese bloque.`);

  // Servicio más rentable histórico vs el de esta semana
  if (histSrvTop && topSrvSem[0] && histSrvTop[0]!==topSrvSem[0][0])
    recs.push(`Históricamente tu servicio más rentable es <strong>${histSrvTop[0]}</strong> ($${histSrvTop[1].total.toLocaleString('es-CO')} acumulados), pero esta semana predominó <strong>${topSrvSem[0][0]}</strong>. Evalúa si puedes agenda más ${histSrvTop[0]} la próxima semana.`);

  // Si la semana fue buena: refuerzo
  if (positivos.length>=2 && (pctDiff===null||pctDiff>=0))
    recs.push(`Semana con buen desempeño. Para sostenerlo, replica el patrón del <strong>${mejorDia.dia}</strong> (tu mejor día de la semana con $${mejorDia.total.toLocaleString('es-CO')}) y mantén ese nivel de agenda.`);

  // Si no hay histórico suficiente, nota informativa
  if (histCitas.length<5 && !positivos.length && !alertas.length)
    recs.push(`Aún hay pocos datos históricos para comparar. El análisis se enriquecerá a medida que registres más semanas.`);

  return _renderAnalisis('📊 Análisis de la semana', positivos, alertas, recs);
}

function _analisisMes({ totalMes, nCitasMes, ticketM, diffMes, pctDiffM, mejorDiaMes, peorDiaMes, topSrvMes, nuevosMes, recMes, totalMesAnt, nCitasMesAnt, semanas, meta, diasMes, mesNombre }) {
  const recs = [];
  const alertas = [];
  const positivos = [];

  // vs mes anterior
  if (pctDiffM !== null) {
    if (pctDiffM >= 15)    positivos.push(`🚀 Mes excelente: <strong>+${pctDiffM}%</strong> respecto al mes anterior ($${Math.abs(diffMes).toLocaleString('es-CO')} más). ¡Sigue así!`);
    else if (pctDiffM >= 5) positivos.push(`📈 Crecimiento sólido del ${pctDiffM}% vs el mes pasado.`);
    else if (pctDiffM < -15) alertas.push(`🔴 Caída del <strong>${Math.abs(pctDiffM)}%</strong> vs el mes anterior. Analiza qué semanas tuvieron menos citas y si hubo cancelaciones masivas.`);
    else if (pctDiffM < 0) alertas.push(`📉 Leve caída del ${Math.abs(pctDiffM)}% vs el mes anterior.`);
    else positivos.push(`📊 Mes estable respecto al anterior.`);
  }

  // Meta
  if (meta) {
    const pctMeta = Math.round(totalMes/meta*100);
    if (pctMeta >= 100) positivos.push(`¡Meta cumplida! Alcanzaste el <strong>${pctMeta}%</strong> de tu meta de $${meta.toLocaleString('es-CO')}.`);
    else if (pctMeta >= 80) recs.push(`Alcanzaste el ${pctMeta}% de la meta. Faltaron $${(meta-totalMes).toLocaleString('es-CO')} — considera intensificar en días con espacio disponible.`);
    else if (pctMeta < 60) alertas.push(`⚠️ Solo el ${pctMeta}% de la meta mensual. Considera revisar tu estrategia de precios o captar nuevos pacientes.`);
  }

  // Ticket promedio
  const ticketAntM = nCitasMesAnt>0 ? Math.round(totalMesAnt/nCitasMesAnt) : 0;
  if (ticketM > 0) recs.push(`💰 Ticket promedio del mes: <strong>$${ticketM.toLocaleString('es-CO')}</strong>${ticketAntM>0?' (mes anterior: $'+ticketAntM.toLocaleString('es-CO')+')':''}.`);

  // Semana más fuerte
  if (semanas.length) {
    const mejorSem = [...semanas].sort((a,b)=>b.total-a.total)[0];
    const luS = new Date(mejorSem.lunesStr+'T12:00:00');
    const doS = new Date(luS); doS.setDate(luS.getDate()+6);
    positivos.push(`📅 Mejor semana del mes: <strong>${_ingFmtLabel(luS)} al ${_ingFmtLabel(doS)}</strong> — $${mejorSem.total.toLocaleString('es-CO')} (${mejorSem.n} citas).`);
  }

  // Mejor y peor día
  if (mejorDiaMes.total>0) recs.push(`🏆 Mejor día: <strong>${mejorDiaMes.dia} ${mejorDiaMes.num}</strong> con $${mejorDiaMes.total.toLocaleString('es-CO')}. Analiza qué hiciste diferente ese día.`);
  if (peorDiaMes) recs.push(`📉 Día con menor ingreso: ${peorDiaMes.dia} ${peorDiaMes.num} ($${peorDiaMes.total.toLocaleString('es-CO')}). Puede ser un patrón a corregir.`);

  // Servicios
  if (topSrvMes[0]) recs.push(`🥇 Servicio más vendido: <strong>${topSrvMes[0][0]}</strong> (${topSrvMes[0][1]} sesiones — ${Math.round(topSrvMes[0][1]/nCitasMes*100)}% del total). Asegura disponibilidad para este servicio.`);
  if (topSrvMes.length>1) recs.push(`📦 También destacaron: ${topSrvMes.slice(1,3).map(([s,n])=>`<strong>${s}</strong> (${n})`).join(' y ')}.`);

  // Nuevos vs recurrentes
  if (nuevosMes+recMes>0) {
    const pctRec = Math.round(recMes/(nuevosMes+recMes)*100);
    if (pctRec >= 60) positivos.push(`🔁 Alta fidelización: ${pctRec}% de sesiones fueron de pacientes recurrentes. Excelente retención.`);
    else if (nuevosMes > recMes) recs.push(`👥 Este mes captaste <strong>${nuevosMes} pacientes nuevos</strong> — asegúrate de darles seguimiento para convertirlos en recurrentes.`);
  }

  // Consistencia de semanas
  const totalesSem = semanas.map(s=>s.total);
  const promSem = totalesSem.reduce((a,b)=>a+b,0)/totalesSem.length;
  const varianza = Math.sqrt(totalesSem.reduce((a,b)=>a+Math.pow(b-promSem,2),0)/totalesSem.length);
  if (varianza > promSem*0.5 && semanas.length>=3) alertas.push(`📊 Alta variabilidad entre semanas (coeficiente de variación alto). Intenta distribuir citas más uniformemente para ingresos más estables.`);
  else if (semanas.length>=3) positivos.push(`📊 Ingresos relativamente <strong>consistentes semana a semana</strong>. Buen ritmo de trabajo.`);

  return _renderAnalisis(`📋 Análisis financiero — ${mesNombre}`, positivos, alertas, recs);
}

function _renderAnalisis(titulo, positivos, alertas, recs) {
  if (!positivos.length && !alertas.length && !recs.length) return '';
  const block = (items, bg, border, color, icon) => items.length
    ? `<div style="margin-bottom:12px">${items.map(t=>`<div style="display:flex;gap:10px;padding:10px 14px;background:${bg};border:1px solid ${border};border-radius:8px;margin-bottom:6px;font-size:.83rem;line-height:1.5"><span>${icon}</span><span style="color:${color}">${t}</span></div>`).join('')}</div>` : '';
  return `<div style="border-top:1px solid var(--border);padding-top:20px">
    <div style="font-family:var(--font-h);font-size:1rem;font-weight:700;margin-bottom:14px;color:var(--text)">${titulo}</div>
    ${block(positivos,'rgba(5,150,105,.06)','rgba(5,150,105,.2)','#065f46','\u2705')}
    ${block(alertas,'rgba(239,68,68,.06)','rgba(239,68,68,.2)','#991b1b','⚠️')}
    ${block(recs,'rgba(27,191,176,.06)','rgba(27,191,176,.2)','#0e7c73','💡')}
  </div>`;
}

  global.PanelIncomeAnalysis = Object.freeze({
    setModoIngresos,
    _ingFmt,
    _ingFmtLabel,
    _ingFmtMes,
    renderCitasResumen,
    renderIngresosDetalle,
    _analisisSemana,
    _analisisMes,
    _renderAnalisis
  });
})(window);
