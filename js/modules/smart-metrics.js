(function(global) {
  'use strict';

function renderMetricas() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  const citas = citasReales();
  const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
  const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
  const horMap = {};
  let sinHoraCnt = 0;
  citas.forEach(c => {
    const h = (c.hora || '').split(':')[0].replace(/^0+$/, ''); // "0" y "00" → ""
    if (h && +h !== 0) horMap[h] = (horMap[h] || 0) + 1;
    else sinHoraCnt++;
  });
  const horArr = Object.entries(horMap).sort((a,b) => +a[0] - +b[0]);
  const maxHor = Math.max(...horArr.map(x => x[1]), 1);
  const horEl = document.getElementById('metricHorarios');
  if (horEl) {
    const sinHoraNota = sinHoraCnt > 0
      ? `<div style="margin-top:10px;font-size:.72rem;color:var(--muted)">⚠️ ${sinHoraCnt} cita${sinHoraCnt>1?'s':''} sin hora registrada (importadas sin tiempo)</div>`
      : '';
    horEl.innerHTML = horArr.length
      ? horArr.map(([h, n]) => `
        <div class="metric-row">
          <div class="metric-label">${h.padStart(2,'0')}:00</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxHor*100)}%;background:var(--primary)"></div></div>
          <div class="metric-val" style="color:var(--primary)">${n}</div>
        </div>`).join('') + sinHoraNota
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 2. Métodos de pago
  const pagoMap = { 'Efectivo':0, 'Nequi':0, 'Bancolombia':0, 'Transferencia':0, 'Pendiente':0 };
  citas.forEach(c => {
    const m = c.pago || (kvGet('pago_'+c.id)==='1' ? 'Efectivo' : '');
    if (m && pagoMap[m] !== undefined) pagoMap[m]++;
    else if (!m) pagoMap['Pendiente']++;
  });
  const pagoArr = Object.entries(pagoMap).filter(([,v]) => v > 0);
  const totalPagos = citas.length || 1;
  const pagoEl = document.getElementById('metricPagos');
  if (pagoEl) {
    const iconos = { Efectivo:'💵', Nequi:'\uD83D\uDCF1', Bancolombia:'\uD83C\uDFE6', Transferencia:'↗', Pendiente:'⏳' };
    pagoEl.innerHTML = pagoArr.length
      ? pagoArr.map(([m, n], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:110px">${iconos[m]||''} ${m}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/totalPagos*100)}%;background:${COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${COLORES[i%COLORES.length]}">${n}</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos de pago</p></div>';
  }

  // 3. Nuevos vs Recurrentes — mes a mes (últimos 6 meses con datos)
  const pacEl = document.getElementById('metricPacientes');
  if (pacEl) {
    // Construir historial completo: primera cita de cada paciente
    const primeraCita = {}; // nombre_key → "YYYY-MM" de su primera cita
    const todasCitas = citasReales();
    todasCitas
      .filter(c => c.nombre && normDate(c.fecha))
      .sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)))
      .forEach(c => {
        const k   = c.nombre.toLowerCase().trim();
        const mes = normDate(c.fecha).slice(0,7); // "YYYY-MM"
        if (!primeraCita[k]) primeraCita[k] = mes;
      });

    // Determinar rango: últimos 6 meses que tengan al menos 1 cita
    const now3 = new Date();
    const mesesDisp = [];
    for (let i = 11; i >= 0; i--) {
      const d  = new Date(now3.getFullYear(), now3.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      const tieneCitas = todasCitas.some(c => normDate(c.fecha).startsWith(ym));
      if (tieneCitas) mesesDisp.push({ ym, label: MESES[d.getMonth()] + ' ' + String(d.getFullYear()).slice(2) });
    }
    const mesesMostrar = mesesDisp.slice(-6);

    if (!mesesMostrar.length) {
      pacEl.innerHTML = '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
    } else {
      // Para cada mes: contar nuevos (primera cita ese mes) y recurrentes (primera cita en mes anterior)
      const filas = mesesMostrar.map(({ ym, label }) => {
        const pacsMes = new Set(
          todasCitas
            .filter(c => c.nombre && normDate(c.fecha).startsWith(ym))
            .map(c => c.nombre.toLowerCase().trim())
        );
        let nNuevos = 0, nAntig = 0;
        pacsMes.forEach(k => {
          if (primeraCita[k] === ym) nNuevos++;
          else nAntig++;
        });
        const total = nNuevos + nAntig || 1;
        const pctN  = Math.round(nNuevos / total * 100);
        const pctA  = Math.round(nAntig  / total * 100);
        return { label, nNuevos, nAntig, total: nNuevos + nAntig, pctN, pctA };
      });

      const maxTotal = Math.max(...filas.map(f => f.total), 1);

      // Leyenda
      let html = `
        <div style="display:flex;gap:16px;margin-bottom:14px;font-size:.75rem">
          <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:var(--primary);display:inline-block"></span>Nuevo</span>
          <span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#6366f1;display:inline-block"></span>Recurrente</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">`;

      filas.forEach(f => {
        const wN = Math.round(f.nNuevos / maxTotal * 100);
        const wA = Math.round(f.nAntig  / maxTotal * 100);
        html += `
          <div style="display:grid;grid-template-columns:70px 1fr 90px;align-items:center;gap:10px">
            <div style="font-size:.8rem;color:var(--muted);font-family:var(--font-m)">${f.label}</div>
            <div style="display:flex;gap:3px;height:18px;border-radius:4px;overflow:hidden;background:var(--s2)">
              ${f.nNuevos ? `<div style="width:${wN}%;background:var(--primary);transition:width .3s"></div>` : ''}
              ${f.nAntig  ? `<div style="width:${wA}%;background:#6366f1;transition:width .3s"></div>` : ''}
            </div>
            <div style="font-size:.75rem;display:flex;gap:8px;justify-content:flex-end">
              <span style="color:var(--primary);font-family:var(--font-b)">${f.nNuevos} N</span>
              <span style="color:#6366f1;font-family:var(--font-b)">${f.nAntig} R</span>
            </div>
          </div>`;
      });

      // Totales acumulados
      const totalNuevosAcc  = filas.reduce((s,f) => s + f.nNuevos, 0);
      const totalAntigAcc   = filas.reduce((s,f) => s + f.nAntig,  0);
      html += `</div>
        <div style="margin-top:14px;padding:10px 14px;background:var(--s2);border-radius:8px;display:flex;gap:20px;flex-wrap:wrap;font-size:.78rem">
          <span>📊 Período: <strong>${mesesMostrar[0].label} – ${mesesMostrar[mesesMostrar.length-1].label}</strong></span>
          <span style="color:var(--primary)">🟢 Nuevos: <strong>${totalNuevosAcc}</strong></span>
          <span style="color:#6366f1">🔵 Recurrentes: <strong>${totalAntigAcc}</strong></span>
        </div>`;

      pacEl.innerHTML = html;
    }
  }

  // 4. Tasa de cancelación últimos 4 meses
  const now2 = new Date();
  const meses4 = [];
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now2.getFullYear(), now2.getMonth()-i, 1);
    meses4.push({ m: d.getMonth()+1, y: d.getFullYear(), label: MESES[d.getMonth()] });
  }
  const cancelEl = document.getElementById('metricCancelacion');
  if (cancelEl) {
    const rows = meses4.map(mes => {
      const todasMes = allData.citas.filter(c => {
        const [cy,cm] = normDate(c.fecha).split('-');
        return +cm===mes.m && +cy===mes.y && !esRegistroServ(c.servicio);
      });
      const canceladas = todasMes.filter(c => c.estado === 'Cancelada').length;
      const total = todasMes.length || 1;
      const pct = Math.round(canceladas / total * 100);
      const color = pct >= 30 ? '#ef4444' : pct >= 15 ? '#f59e0b' : 'var(--ok)';
      return `<div class="metric-row">
        <div class="metric-label">${mes.label}</div>
        <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="metric-val" style="color:${color}">${pct}%</div>
      </div>`;
    });
    cancelEl.innerHTML = rows.join('');
  }

  // 5. Servicio más utilizado (ranking por conteo)
  const servCountMap = {};
  citas.forEach(c => {
    const s = c.servicio || 'Sin servicio';
    servCountMap[s] = (servCountMap[s] || 0) + 1;
  });
  (allData.eventos || []).forEach(e => {
    const s = e.tipo || 'Evento externo';
    servCountMap[s] = (servCountMap[s] || 0) + 1;
  });
  const servCountArr = Object.entries(servCountMap).sort((a,b) => b[1]-a[1]);
  const maxServCount = servCountArr[0] ? servCountArr[0][1] : 1;
  const servTopEl = document.getElementById('metricServicioTop');
  if (servTopEl) {
    servTopEl.innerHTML = servCountArr.length
      ? servCountArr.slice(0,8).map(([s, n], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:auto;flex:2;font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${i===0?'🥇 ':''}${s}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxServCount*100)}%;background:${i===0?'var(--primary)':COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${i===0?'var(--primary)':COLORES[i%COLORES.length]}">${n}</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 6. Ingreso total por servicio (histórico)
  const servIngMap = {};
  citas.forEach(c => {
    const s = c.servicio || 'Sin servicio';
    servIngMap[s] = (servIngMap[s] || 0) + parsePrecio(c.precio);
  });
  (allData.eventos || []).forEach(e => {
    const s = e.tipo || 'Evento externo';
    servIngMap[s] = (servIngMap[s] || 0) + parsePrecio(e.cobro);
  });
  const servIngArr = Object.entries(servIngMap).sort((a,b) => b[1]-a[1]);
  const maxServIng = servIngArr[0] ? servIngArr[0][1] : 1;
  const ingServEl = document.getElementById('metricIngresoPorServicio');
  if (ingServEl) {
    ingServEl.innerHTML = servIngArr.length
      ? servIngArr.slice(0,8).map(([s, v], i) => `
        <div class="metric-row">
          <div class="metric-label" style="width:auto;flex:2;font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${s}">${s}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(v/maxServIng*100)}%;background:${COLORES[i%COLORES.length]}"></div></div>
          <div class="metric-val" style="color:${COLORES[i%COLORES.length]};font-size:.72rem">$${Math.round(v/1000)}k</div>
        </div>`).join('')
      : '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
  }

  // 7. Proyección mes actual vs meta
  const meta = getMeta();
  const cobradoMes = calcCobradoMes();
  const proyEl = document.getElementById('metricProyeccion');
  if (proyEl) {
    if (!meta) {
      proyEl.innerHTML = '<div style="font-size:.82rem;color:var(--muted);padding:10px 0">Establece tu meta mensual para ver la proyección.</div>';
    } else {
      const pctMeta = Math.min(Math.round(cobradoMes / meta * 100), 100);
      const nowD = new Date();
      const diasMes = new Date(nowD.getFullYear(), nowD.getMonth()+1, 0).getDate();
      const diaActual = nowD.getDate();
      const ritmo = diaActual > 0 ? Math.round((cobradoMes / diaActual) * diasMes) : 0;
      const pctRitmo = Math.min(Math.round(ritmo / meta * 100), 120);
      const colorMeta = pctMeta >= 100 ? 'var(--ok)' : pctMeta >= 60 ? 'var(--warn)' : '#ef4444';
      proyEl.innerHTML = `
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px">
            <span style="color:var(--muted)">Cobrado este mes</span>
            <span style="font-family:var(--font-m);color:${colorMeta};font-weight:700">${pctMeta}%</span>
          </div>
          <div class="meta-bar-wrap" style="height:10px"><div class="meta-bar-fill" style="width:${pctMeta}%;background:${colorMeta}"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:.74rem;margin-top:4px;color:var(--muted)">
            <span>$${cobradoMes.toLocaleString('es-CO')}</span><span>Meta: $${meta.toLocaleString('es-CO')}</span>
          </div>
        </div>
        <div style="font-size:.78rem;color:var(--muted)">
          Día ${diaActual}/${diasMes} · A este ritmo proyectas: <strong style="color:${pctRitmo>=100?'var(--ok)':'var(--warn)'}">$${ritmo.toLocaleString('es-CO')}</strong>
        </div>`;
    }
  }

  // 8. Modalidad más usada
  const modMap = {};
  citas.forEach(c => { const mod = c.modalidad || 'Sin modalidad'; modMap[mod] = (modMap[mod]||0)+1; });
  const modArr = Object.entries(modMap).sort((a,b) => b[1]-a[1]);
  const totalMod = modArr.reduce((s,[,v]) => s+v, 0) || 1;
  const modEl = document.getElementById('metricModalidad');
  if (modEl) {
    const coloresMod = ['var(--primary)','#6366f1','#f59e0b','#10b981'];
    const segmentos = modArr.map(([,v],i) => `<div style="flex:${v};background:${coloresMod[i%coloresMod.length]};height:12px;border-radius:${i===0?'99px 0 0 99px':i===modArr.length-1?'0 99px 99px 0':'0'}"></div>`).join('');
    modEl.innerHTML = `
      <div style="display:flex;height:12px;border-radius:99px;overflow:hidden;margin-bottom:14px">${segmentos}</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${modArr.map(([mod, n], i) => `
          <div class="metric-row">
            <div style="font-size:.82rem;flex:1">${mod}</div>
            <div class="metric-val" style="color:${coloresMod[i%coloresMod.length]}">${n} <span style="font-size:.7rem;color:var(--muted)">(${Math.round(n/totalMod*100)}%)</span></div>
          </div>`).join('')}
      </div>`;
  }

  // 9. Día más ocupado
  const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const diaMap = {0:0,1:0,2:0,3:0,4:0,5:0,6:0};
  citas.forEach(c => {
    const f = normDate(c.fecha);
    if (f) { const d = new Date(f+'T12:00:00'); diaMap[d.getDay()] = (diaMap[d.getDay()]||0)+1; }
  });
  const diaArr = Object.entries(diaMap).sort((a,b) => b[1]-a[1]);
  const maxDia = Math.max(...Object.values(diaMap), 1);
  const diaEl = document.getElementById('metricDiaSemana');
  if (diaEl) {
    diaEl.innerHTML = [1,2,3,4,5,6,0].map(d => {
      const n = diaMap[d] || 0;
      const isTop = n === maxDia && n > 0;
      return `<div class="metric-row">
        <div class="metric-label" style="font-weight:${isTop?'700':'400'};color:${isTop?'var(--primary)':'var(--muted)'}">${DIAS[d]}</div>
        <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(n/maxDia*100)}%;background:${isTop?'var(--primary)':'#6366f1'}"></div></div>
        <div class="metric-val" style="color:${isTop?'var(--primary)':'var(--text)'}">${n}${isTop?' 🔥':''}</div>
      </div>`;
    }).join('');
  }

  // 10. Comparativo mes anterior
  const nowC = new Date();
  const mAct = nowC.getMonth()+1, yAct = nowC.getFullYear();
  const prevD = new Date(yAct, mAct-2, 1);
  const mPrev = prevD.getMonth()+1, yPrev = prevD.getFullYear();
  const totalAct = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===mAct && +cy===yAct; }).reduce((s,c) => s+parsePrecio(c.precio), 0);
  const totalPrev = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===mPrev && +cy===yPrev; }).reduce((s,c) => s+parsePrecio(c.precio), 0);
  const compEl = document.getElementById('metricComparativo');
  if (compEl) {
    const diff = totalAct - totalPrev;
    const pctDiff = totalPrev > 0 ? Math.round((diff / totalPrev) * 100) : null;
    const color = diff > 0 ? 'var(--ok)' : diff < 0 ? '#ef4444' : 'var(--muted)';
    const flecha = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
    const MESES_N = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    compEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="metric-row">
          <div style="font-size:.82rem;flex:1;color:var(--muted)">${MESES_N[mPrev-1]} ${yPrev}</div>
          <div class="metric-val">$${totalPrev.toLocaleString('es-CO')}</div>
        </div>
        <div class="metric-row">
          <div style="font-size:.82rem;flex:1;color:var(--muted)">${MESES_N[mAct-1]} ${yAct} (actual)</div>
          <div class="metric-val" style="color:var(--primary)">$${totalAct.toLocaleString('es-CO')}</div>
        </div>
        <div style="text-align:center;margin-top:6px;font-family:var(--font-h);font-size:1.4rem;color:${color}">
          ${flecha} ${pctDiff !== null ? Math.abs(pctDiff)+'%' : '—'}
        </div>
        <div style="text-align:center;font-size:.78rem;color:${color};font-family:var(--font-m)">
          ${diff > 0 ? '+$'+diff.toLocaleString('es-CO')+' más que el mes pasado' : diff < 0 ? '-$'+Math.abs(diff).toLocaleString('es-CO')+' menos que el mes pasado' : 'Sin cambio respecto al mes pasado'}
        </div>
      </div>`;
  }

  // 11. Pacientes frecuentes (Top 5)
  const frecMap = {};
  citas.forEach(c => {
    const k = (c.nombre||'').trim();
    if (!k) return;
    if (!frecMap[k]) frecMap[k] = { n: k, count: 0 };
    frecMap[k].count++;
  });
  const frecArr = Object.values(frecMap).sort((a,b) => b.count-a.count).slice(0,5);
  const frecEl = document.getElementById('metricPacientesFrecuentes');
  if (frecEl) {
    const maxFrec = frecArr[0] ? frecArr[0].count : 1;
    frecEl.innerHTML = frecArr.length
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px">${
          frecArr.map((p, i) => {
            const medallas = ['🥇','🥈','🥉','4️⃣','5️⃣'];
            return `<div class="metric-row">
              <div style="font-size:.82rem;flex:2;font-weight:${i===0?'700':'400'};color:${i===0?'var(--primary)':'var(--text)'}">${medallas[i]||''} ${p.n}</div>
              <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${Math.round(p.count/maxFrec*100)}%;background:${i===0?'var(--primary)':COLORES[i%COLORES.length]}"></div></div>
              <div class="metric-val" style="color:${i===0?'var(--primary)':COLORES[i%COLORES.length]}">${p.count} sesiones</div>
            </div>`;
          }).join('')
        }</div>`
      : '<div class="empty" style="padding:20px 0"><p>Sin datos suficientes</p></div>';
  }

  // 12. Horas más rentables
  const horRentEl = document.getElementById('metricHorasRentables');
  if (horRentEl) {
    // Agrupar por hora: total ingresado y número de citas
    const horData = {};
    citas.forEach(c => {
      const h = (c.hora || '').split(':')[0];
      if (!h || isNaN(+h)) return;
      if (!horData[h]) horData[h] = { count: 0, total: 0 };
      horData[h].count++;
      horData[h].total += parsePrecio(c.precio);
    });

    const horArr = Object.entries(horData)
      .map(([h, d]) => ({ h: +h, label: h + ':00', count: d.count, total: d.total, avg: Math.round(d.total / d.count) }))
      .sort((a, b) => b.total - a.total);

    const maxTotal = horArr[0] ? horArr[0].total : 1;

    if (!horArr.length) {
      horRentEl.innerHTML = '<div class="empty" style="padding:20px 0"><p>Sin datos</p></div>';
    } else {
      // Top por ingreso total + tabla completa
      const top = horArr[0];
      horRentEl.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:16px">
          <div style="padding:10px 14px;background:rgba(27,191,176,.08);border:1px solid rgba(27,191,176,.25);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">\u2B50 Hora más rentable</div>
            <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:var(--primary)">${top.label}</div>
            <div style="font-size:.75rem;color:var(--muted);margin-top:2px">$${top.total.toLocaleString('es-CO')} total · ${top.count} citas</div>
          </div>
          <div style="padding:10px 14px;background:var(--s2);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">💰 Mayor ticket promedio</div>
            ${(() => { const topAvg = [...horArr].sort((a,b) => b.avg - a.avg)[0]; return `<div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700">${topAvg.label}</div><div style="font-size:.75rem;color:var(--muted);margin-top:2px">$${topAvg.avg.toLocaleString('es-CO')} promedio</div>`; })()}
          </div>
          <div style="padding:10px 14px;background:var(--s2);border-radius:10px">
            <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:2px">📊 Franjas registradas</div>
            <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700">${horArr.length} horarios</div>
            <div style="font-size:.75rem;color:var(--muted);margin-top:2px">${(()=>{const s=[...horArr].sort((a,b)=>a.h-b.h);return s[0].label+' — '+s[s.length-1].label;})()}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${[...horArr].sort((a,b) => b.total - a.total).map((r, i) => `
            <div style="display:grid;grid-template-columns:50px 1fr auto auto;align-items:center;gap:10px;padding:6px 0">
              <span style="font-family:var(--font-m);font-size:.8rem;color:${i===0?'var(--primary)':'var(--muted)'};font-weight:${i===0?'700':'400'}">${r.label}</span>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width:${Math.round(r.total/maxTotal*100)}%;background:${i===0?'var(--primary)':i<3?'#6366f1':'rgba(27,191,176,.4)'}"></div>
              </div>
              <span style="font-size:.75rem;color:var(--muted);min-width:55px;text-align:right">${r.count} cita${r.count!==1?'s':''}</span>
              <span style="font-family:var(--font-m);font-size:.78rem;color:${i===0?'var(--primary)':'var(--text)'};min-width:90px;text-align:right">$${r.total.toLocaleString('es-CO')}</span>
            </div>`).join('')}
        </div>
        <div style="margin-top:14px;padding:10px 14px;background:var(--s2);border-radius:8px;font-size:.78rem;color:var(--muted)">
          💡 <strong>Interpretación:</strong> Prioriza agendar servicios de mayor precio en ${horArr.sort((a,b)=>b.total-a.total)[0].label} y ${horArr[1]?horArr[1].label:'la siguiente hora más rentable'}. Si esas franjas están siempre llenas, considera subir el precio o agregar horarios similares.
        </div>`;
    }
  }

  // Inicializar selector de fecha para ingresos por día/semana
  const fechaInp = document.getElementById('ingresosFechaInput');
  if (fechaInp && !fechaInp.value) {
    fechaInp.value = today();
    setModoIngresos('semana');
  }
  renderCitasResumen();

  // Inicializar filtro de convenios con el mes actual
  const convMesFiltro = document.getElementById('convenioMesFiltro');
  if (convMesFiltro && !convMesFiltro.value) {
    const nm = now.getMonth()+1;
    convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
  }
  renderConveniosReport();
  _checkAutoAtendida();
  _checkCobrosPendientes();
}

  global.PanelSmartMetrics = Object.freeze({ renderMetricas });
})(window);
