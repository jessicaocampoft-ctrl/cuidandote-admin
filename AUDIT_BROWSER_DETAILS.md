# Detalle de fallos funcionales encontrados por Chrome

Archivo: `index.html`

## Función renderMetricas

Comienza en línea 16644.

```javascript
function renderMetricas() {
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
```

## Función showView

Comienza en línea 7800.

```javascript
function showView(v) {
  ['dashboard','acciones','espera','automatizaciones','tareas','tareasConfig','agenda','nueva','calendario','bloquear','pacientes','equipo','basedatos','codigos','paquetes','recordatorios','finanzas','pagos','guiakpis','presupuesto','seguimiento','mensajes','empresas','pasaporte','comisiones','guioneswa','recuperacion'].forEach(id => {
    const sec = document.getElementById('v' + id.charAt(0).toUpperCase() + id.slice(1));
    const sb  = document.getElementById('sb-' + id);
    if (sec) sec.style.display = 'none';
    if (sb)  sb.classList.remove('active');
  });
  const _sec = document.getElementById('v' + v.charAt(0).toUpperCase() + v.slice(1));
  _sec.style.display = 'block';
  _sec.classList.remove('view-fadein');
  void _sec.offsetWidth;
  _sec.classList.add('view-fadein');
  const _sbActive = document.getElementById('sb-' + v);
  if (_sbActive) {
    _sbActive.classList.add('active');
    if (_sbActive.classList.contains('sb-secondary')) {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.add('tools-open');
      const toolsToggle = document.getElementById('sbToolsToggle');
      if (toolsToggle) toolsToggle.setAttribute('aria-expanded','true');
    }
  }
  document.getElementById('sidebar').classList.remove('open');
  // FAB: ocultar en vista nueva (ya estás ahí) y mostrar en las demás
  const fab = document.getElementById('fabAgendar');
  if (fab) fab.style.display = v === 'nueva' ? 'none' : 'flex';
  // Mobile bottom nav: sincronizar activo
  _syncMobileNav(v);

  if (v === 'guioneswa') {
    requestAnimationFrame(() => {
      document.querySelectorAll('textarea[id^="gMsg-"]').forEach(gFitHeight);
    });
  }

  if (v === 'agenda') {
    const _saved = sessionStorage.getItem('agendaFilters');
    if (_saved) {
      try {
        const _f = JSON.parse(_saved);
        if (_f.search  !== undefined) document.getElementById('fSearch').value  = _f.search;
        if (_f.status  !== undefined) document.getElementById('fStatus').value  = _f.status;
        if (_f.mod     !== undefined) document.getElementById('fMod').value     = _f.mod;
        if (_f.service !== undefined) document.getElementById('fService').value = _f.service;
        if (_f.desde   !== undefined) document.getElementById('fDesde').value   = _f.desde;
        if (_f.hasta   !== undefined) document.getElementById('fHasta').value   = _f.hasta;
      } catch(e) {}
    }
    renderAgenda();
  }
  if (v === 'bloquear')       renderBloqueos();
  if (v === 'pacientes')      renderPacientes();
  if (v === 'equipo')         { loadTeamData().then(renderEquipo); }
  if (v === 'calendario')     renderCalendar();
  if (v === 'recordatorios')  cargarRecordatorios();
  if (v === 'basedatos')      { renderBasedatos(); initFormDB(); renderChangeLog(); renderReactivacion(); }
  if (v === 'finanzas')       { renderFinanzas(); actualizarContadorLeads(); _renderEncuestaStatsUI(getEncuestaStats()); }
  if (v === 'pagos')          { loadOperationsData().then(renderPagos); }
  if (v === 'seguimiento')    renderSeguimiento();
  if (v === 'tareas')         renderTareas();
  if (v === 'tareasConfig')   initTareasConfig();
  if (v === 'paquetes')       renderPaquetes();
  if (v === 'mensajes')       renderMensajes();
  if (v === 'empresas')       renderEmpresas();
  if (v === 'codigos')        renderCodigos();
  if (v === 'guiakpis')       { renderKPIGuia(); actualizarContadorLeads(); loadRutinaChecks(); loadKPIHistoryFromServer(); }
  if (v === 'presupuesto')    { renderPresupuestoMetas(); }
  if (v === 'comisiones')     renderComisiones();
  if (v === 'recuperacion')   renderRecuperaciones();
  if (v === 'acciones')       renderCentroAcciones();
  if (v === 'espera')         renderWaitList();
  if (v === 'automatizaciones') loadAutomationCenter();
  if (v === 'dashboard')      actualizarContadorLeads();
}
```

## Función openPago

Comienza en línea 17133.

```javascript
function openPago(citaId) {
  showView('pagos');
  setTimeout(() => {
    if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
    const selector = document.getElementById('payCitaId');
    if (selector) {
      selector.value = citaId || '';
      selector.dispatchEvent(new Event('change', { bubbles: true }));
      selector.focus();
      selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
    }
  }, 100);
}
```

## Función fillPaymentSelectors

Comienza en línea 6840.

```javascript
function fillPaymentSelectors(selectedId = '') {
  const citas = paymentCandidateAppointments();
  const citaSel = document.getElementById('payCitaId');
  if (citaSel) {
    citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
  }
  const medioSel = document.getElementById('payMedioPago');
  if (medioSel) {
    medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
  }
  prefillPaymentFromAppointment();
  renderPaymentAppointmentList();
}
```

## Todos los usos literales de la vista citas

### Coincidencia 1 — línea 4576

```html
4562:             <div class="em-card-hdr" onclick="toggleEmCard('mixfull')">
4563:               <div class="em-dot gris" id="emDot_mixfull"></div>
4564:               <span class="em-card-title">Mix Full &gt;40%</span>
4565:               <span class="em-sev u">🟠 Urgente</span>
4566:               <span class="em-card-time">⏱ 20 min</span>
4567:               <span class="em-carr">▼</span>
4568:             </div>
4569:             <div class="em-card-body" id="emBody_mixfull">
4570:               <div class="em-symptom">💡 <strong>Pérdida silenciosa de margen.</strong> Full rinde ~$73k/h vs ~$90k/h de Express. Cada 10% de exceso en Full equivale a dejar entre $70k y $100k/semana sobre la mesa. El problema suele estar en cómo la auxiliar presenta las opciones al paciente — no en el paciente mismo.</div>
4571:               <div class="em-prog-meta" id="emPM_mixfull">0 de 5 pasos completados</div>
4572:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_mixfull" style="width:0%"></div></div>
4573:               <div class="em-steps">
4574:                 <label class="em-step" id="emS_mixfull_0" onclick="handleEmStep(event,'mixfull',0)"><input type="checkbox" id="emCk_mixfull_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Ver el breakdown actual:</strong> ¿qué porcentaje exacto son Full esta semana? ¿Es un problema puntual o viene subiendo varios meses?</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 2 →</button></label>
4575:                 <label class="em-step" id="emS_mixfull_1" onclick="handleEmStep(event,'mixfull',1)"><input type="checkbox" id="emCk_mixfull_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reunión con auxiliar — cambiar el guión de agendamiento:</strong> la regla es ofrecer Express por defecto. Guión exacto: <em>"La Descarga Express cubre cuello, espalda o piernas en 50 min — ¿cuál zona necesitas trabajar?"</em>. Full solo si el paciente lo pide explícitamente o hay justificación clínica de Jessica.</span></label>
4576:                 <label class="em-step" id="emS_mixfull_2" onclick="handleEmStep(event,'mixfull',2)"><input type="checkbox" id="emCk_mixfull_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Revisar citas Full activas:</strong> ¿hay pacientes en plan Full que podrían migrar a Express + Readaptación sin afectar su evolución clínica? Coordinar con Jessica antes de cambiar.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ver citas →</button></label>
4577:                 <label class="em-step" id="emS_mixfull_3" onclick="handleEmStep(event,'mixfull',3)"><input type="checkbox" id="emCk_mixfull_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Empujar Readaptación en contenido:</strong> publicar esta semana un reel o historia explicando qué es la Readaptación Funcional y para quién es — es el servicio más ignorado y el de mejor margen por hora para sesiones largas.</span></label>
4578:                 <label class="em-step" id="emS_mixfull_4" onclick="handleEmStep(event,'mixfull',4)"><input type="checkbox" id="emCk_mixfull_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Seguimiento la próxima semana:</strong> revisar si el mix bajó. Si en 2 semanas sigue >35%, el problema es estructural — revisar si los paquetes activos tienen demasiado peso en Full.</span></label>
4579:               </div>
4580:               <div class="em-card-footer">
4581:                 <button class="em-done-btn" id="emDB_mixfull" onclick="markEmDone('mixfull',5)">✓ Plan ejecutado</button>
4582:                 <button class="em-reset-btn" onclick="resetEmSteps('mixfull',5)">↺ Reiniciar</button>
4583:               </div>
4584:             </div>
4585:           </div>
4586: 
4587:           <!-- KPI: Cancelaciones -->
4588:           <div class="em-card" id="emCard_cancel">
4589:             <div class="em-card-hdr" onclick="toggleEmCard('cancel')">
4590:               <div class="em-dot gris" id="emDot_cancel"></div>
```

### Coincidencia 2 — línea 4606

```html
4592:               <span class="em-sev u">🟠 Urgente</span>
4593:               <span class="em-card-time">⏱ 30 min</span>
4594:               <span class="em-carr">▼</span>
4595:             </div>
4596:             <div class="em-card-body" id="emBody_cancel">
4597:               <div class="em-symptom">💡 <strong>Patrón de cancelación.</strong> Cada cancelación es ingreso y tiempo perdido. Más del 20% indica un problema sistemático, no casos aislados. Los 3 culpables más comunes: (1) no hay recordatorio 24h antes, (2) un día o servicio específico concentra todo, (3) pacientes nuevos que nunca tuvieron intención real de asistir.</div>
4598:               <div class="em-prog-meta" id="emPM_cancel">0 de 6 pasos completados</div>
4599:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_cancel" style="width:0%"></div></div>
4600:               <div class="em-steps">
4601:                 <label class="em-step" id="emS_cancel_0" onclick="handleEmStep(event,'cancel',0)"><input type="checkbox" id="emCk_cancel_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Abrir KPI 4B y hacer el diagnóstico completo:</strong> ¿qué servicio cancela más? ¿Qué día de la semana? ¿Son pacientes nuevos o recurrentes? La respuesta a estas 3 preguntas determina todo lo siguiente.</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 4B →</button></label>
4602:                 <label class="em-step" id="emS_cancel_1" onclick="handleEmStep(event,'cancel',1)"><input type="checkbox" id="emCk_cancel_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reforzar el recordatorio 24h antes:</strong> si no se está enviando confirmación por WhatsApp el día anterior, implementarlo desde hoy. Guión: <em>"Hola [nombre]! Te confirmo tu cita mañana 📋 [servicio] · [hora] · [modalidad]. Respóndeme: ✅ 1 — Sí confirmo · ❌ 2 — Necesito cancelar."</em></span></label>
4603:                 <label class="em-step" id="emS_cancel_2" onclick="handleEmStep(event,'cancel',2)"><input type="checkbox" id="emCk_cancel_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Si hay un día con muchas cancelaciones:</strong> agregar un segundo recordatorio 2 horas antes de la cita ese día específico. Los lunes y viernes suelen concentrar más cancelaciones por reuniones de trabajo o planes del fin de semana.</span></label>
4604:                 <label class="em-step" id="emS_cancel_3" onclick="handleEmStep(event,'cancel',3)"><input type="checkbox" id="emCk_cancel_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Si hay un servicio con muchas cancelaciones:</strong> revisar si el precio, la duración o la expectativa del paciente no están alineados. Por ejemplo, si Full cancela mucho, puede ser que 90 min sea demasiado tiempo para agendar con anticipación.</span></label>
4605:                 <label class="em-step" id="emS_cancel_4" onclick="handleEmStep(event,'cancel',4)"><input type="checkbox" id="emCk_cancel_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer reagendamiento inmediato:</strong> cuando un paciente cancela, el mensaje de respuesta debe siempre terminar con una fecha alternativa. Nunca dejar el chat abierto sin proponer otra opción: <em>"¡Sin problema! ¿Te queda bien el [día X] a las [hora Y]?"</em></span></label>
4606:                 <label class="em-step" id="emS_cancel_5" onclick="handleEmStep(event,'cancel',5)"><input type="checkbox" id="emCk_cancel_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Registrar el motivo de cada cancelación:</strong> en el campo "Nota Admin" de la cita — sin este dato el patrón es invisible. En 2 semanas los datos mostrarán si es un problema de horario, precio, salud o simplemente leads mal calificados.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ir a citas →</button></label>
4607:               </div>
4608:               <div class="em-card-footer">
4609:                 <button class="em-done-btn" id="emDB_cancel" onclick="markEmDone('cancel',6)">✓ Plan ejecutado</button>
4610:                 <button class="em-reset-btn" onclick="resetEmSteps('cancel',6)">↺ Reiniciar</button>
4611:               </div>
4612:             </div>
4613:           </div>
4614: 
4615:         </div>
4616:       </div>
4617: 
4618:       <!-- ══ DIMENSIÓN 2: Comercial ══ -->
4619:       <div class="em-dim" id="emDim_2">
4620:         <div class="em-dim-hdr d2" onclick="toggleEmDim(2)">
```

## Contenedores de vistas

No se encontraron coincidencias.

## Política Content-Security-Policy

### Coincidencia 1 — línea 8

```html
3: <head>
4: <meta charset="UTF-8">
5: <meta name="viewport" content="width=device-width,initial-scale=1">
6: <meta name="robots" content="noindex,nofollow,noarchive">
7: <meta http-equiv="X-Frame-Options" content="DENY">
8: <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://script.google.com https://script.googleusercontent.com https://places.googleapis.com;">
9: <script>
10: (function(){
11:   var publicHosts = ['cuidandotefisioterapia.com', 'www.cuidandotefisioterapia.com'];
12:   if (publicHosts.indexOf(location.hostname) !== -1) {
13:     location.replace('/');
```

## Carga de librerías QR

### Coincidencia 1 — línea 1561

```html
1549:   .auto-grid{grid-template-columns:1fr}
1550:   .auto-panels{grid-template-columns:1fr!important}
1551: }
1552: @media(max-width:420px){
1553:   .stats-grid,.stats-grid[style]{grid-template-columns:1fr!important}
1554:   .mob-nav-btn{padding:5px 4px;min-width:44px;font-size:.58rem}
1555: }
1556: @media(prefers-reduced-motion:reduce){
1557:   *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;
1558:     animation-iteration-count:1!important;transition-duration:.01ms!important}
1559: }
1560: </style>
1561: <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
1562: </head>
1563: <body>
1564: 
1565: <!-- ── TOAST ── -->
1566: <div id="toast"></div>
1567: 
1568: <!-- ── MODAL COPIAR MENSAJE WA (desktop) ── -->
1569: <div id="waCopyModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this)cerrarWaCopyModal()">
1570:   <div style="background:var(--s1,#fff);border-radius:16px;max-width:480px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.22);overflow:hidden">
1571:     <div style="background:#25D366;padding:14px 18px;display:flex;align-items:center;gap:10px">
1572:       <span style="font-size:1.3rem">💬</span>
1573:       <span style="color:#fff;font-weight:700;font-size:1rem">Enviar por WhatsApp</span>
```

### Coincidencia 2 — línea 18716

```html
18704:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18705:     canvas.insertAdjacentElement('afterend', box);
18706:   }
18707:   box.innerHTML = '';
18708:   canvas.style.display = 'none';
18709:   if (typeof QRCode !== 'undefined') {
18710:     if (QRCode.toCanvas) {
18711:       canvas.style.display = 'block';
18712:       box.style.display = 'none';
18713:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18714:     } else {
18715:       box.style.display = 'grid';
18716:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18717:     }
18718:   } else {
18719:     box.textContent = 'QR no disponible';
18720:     box.style.fontSize = '11px';
18721:     box.style.color = 'var(--muted)';
18722:   }
18723: }
18724: 
18725: function abrirPasaporte() {
18726:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18727:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18728:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

## Uso de la variable now dentro de métricas

### Coincidencia 1 — línea 7251

```html
7246: // ── LOGIN ──
7247: let _loginAttempts = 0;
7248: let _loginLockedUntil = 0;
7249: 
7250: async function doLogin() {
7251:   const ahora = Date.now();
7252:   if (_loginLockedUntil > ahora) {
7253:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7254:     const errEl = document.getElementById('loginErr');
7255:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7256:     errEl.style.display = 'block';
```

### Coincidencia 2 — línea 7273

```html
7268:     }, 45000);
7269:     if (d.ok) {
7270:       _loginAttempts = 0;
7271:       TOKEN = d.sessionToken;
7272:       sessionStorage.setItem('adminToken', d.sessionToken);
7273:       _loginTime = Date.now();
7274:       document.getElementById('loginScreen').style.display = 'none';
7275:       document.getElementById('adminApp').style.display   = 'block';
7276:       allData = d;
7277:       await loadAdminKV();
7278:       await loadTeamData();
```

### Coincidencia 3 — línea 7287

```html
7282:       await _runUrlRepairIfRequested();
7283:     } else {
7284:       _loginAttempts++;
7285:       const errEl = document.getElementById('loginErr');
7286:       if (_loginAttempts >= 5) {
7287:         _loginLockedUntil = Date.now() + 120000;
7288:         _loginAttempts = 0;
7289:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7290:       } else {
7291:         const restantes = 5 - _loginAttempts;
7292:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
```

### Coincidencia 4 — línea 7309

```html
7304:   sessionStorage.removeItem('adminToken');
7305:   location.reload();
7306: }
7307: 
7308: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7309: let _lastActivity = Date.now();
7310: const _INACTIVITY_MS = 30 * 60 * 1000;
7311: 
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
```

### Coincidencia 5 — línea 7312

```html
7307: 
7308: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7309: let _lastActivity = Date.now();
7310: const _INACTIVITY_MS = 30 * 60 * 1000;
7311: 
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
7315: );
7316: setInterval(() => {
7317:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
```

### Coincidencia 6 — línea 7317

```html
7312: function _resetActivity() { _lastActivity = Date.now(); }
7313: ['click','keydown','scroll','touchstart'].forEach(ev =>
7314:   document.addEventListener(ev, _resetActivity, {passive: true})
7315: );
7316: setInterval(() => {
7317:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7318:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7319:     setTimeout(logout, 1500);
7320:   }
7321: }, 60_000);
7322: 
```

### Coincidencia 7 — línea 7351

```html
7346:     const btn = document.getElementById('loginBtn');
7347:     try {
7348:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7349:       const d = await r.json();
7350:       if (d.ok) {
7351:         _loginTime = Date.now();
7352:         document.getElementById('loginScreen').style.display = 'none';
7353:         document.getElementById('adminApp').style.display   = 'block';
7354:         allData = d;
7355:         await loadAdminKV();
7356:         await loadTeamData();
```

### Coincidencia 8 — línea 7398

```html
7393:   }
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
```

### Coincidencia 9 — línea 7399

```html
7394: }
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
```

### Coincidencia 10 — línea 7400

```html
7395: 
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
```

### Coincidencia 11 — línea 7401

```html
7396: // ── PERFIL DEL ADMIN ──
7397: function updateProfileCard() {
7398:   const now = new Date();
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
```

### Coincidencia 13 — línea 7404

```html
7399:   const wd  = now.getDay();
7400:   const todayDay = now.getDate();
7401:   const m = now.getMonth() + 1, y = now.getFullYear();
7402: 
7403:   // Semana actual (lun–dom)
7404:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7405:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7406: 
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
```

### Coincidencia 15 — línea 7412

```html
7407:   // Semana anterior (7 días antes)
7408:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7409:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7410: 
7411:   // Mes anterior
7412:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7413:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7414: 
7415:   const citas = citasReales();
7416: 
7417:   const semana = citas.filter(c => {
```

### Coincidencia 16 — línea 7458

```html
7453:   setDelta(document.getElementById('sbDeltaSemana'), semana, semanaPrev);
7454:   setDelta(document.getElementById('sbDeltaMes'), mes, mesPrev);
7455: 
7456:   // Tiempo de sesión activa
7457:   if (_loginTime) {
7458:     const mins = Math.round((Date.now() - _loginTime) / 60000);
7459:     const h = Math.floor(mins / 60), rm = mins % 60;
7460:     const label = h > 0 ? `${h}h ${rm}min` : `${mins}min`;
7461:     const el = document.getElementById('sbSessionInfo');
7462:     if (el) el.innerHTML = `<span class="sb-session-dot"></span> ${label}`;
7463:   }
```

### Coincidencia 17 — línea 7880

```html
7875: // ── CENTRO DE ACCIONES ──
7876: function _daysSince(dateStr) {
7877:   const normalized = normDate(dateStr);
7878:   if (!normalized) return 0;
7879:   const d = new Date(normalized + 'T12:00:00');
7880:   return Math.floor((Date.now() - d.getTime()) / 86400000);
7881: }
7882: 
7883: function _actionIcon(type) {
7884:   const icons = {
7885:     cita:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
```

### Coincidencia 18 — línea 7983

```html
7978:   const nombre = document.getElementById('waitNombre').value.trim();
7979:   const telefono = document.getElementById('waitTelefono').value.trim();
7980:   const servicio = document.getElementById('waitServicio').value.trim();
7981:   const preferencia = document.getElementById('waitPreferencia').value.trim();
7982:   if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
7983:   const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
7984:   try {
7985:     const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
7986:     if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
7987:     item.id = d.id || item.id;
7988:   } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
```

### Coincidencia 19 — línea 8119

```html
8114:   const isMonetary = typeof target === 'string' && target.includes('$');
8115:   const numTarget  = isMonetary
8116:     ? parseInt(target.replace(/[^0-9]/g,'')) || 0
8117:     : parseInt(String(target).replace(/[^0-9]/g,'')) || 0;
8118:   if (numTarget === 0) { el.textContent = target; return; }
8119:   const startTs = performance.now();
8120:   const easeOut = t => 1 - Math.pow(1 - t, 3);
8121:   const tick = ts => {
8122:     const progress = Math.min((ts - startTs) / duration, 1);
8123:     const current  = Math.round(easeOut(progress) * numTarget);
8124:     el.textContent = isMonetary
```

### Coincidencia 20 — línea 8315

```html
8310:   } catch(e) { toast('Error de conexión', 'err'); }
8311: }
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
```

### Coincidencia 21 — línea 8324

```html
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
```

### Coincidencia 24 — línea 8325

```html
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
8329:     .sort((a, b) => a.diff - b.diff);
8330: 
```

### Coincidencia 25 — línea 8774

```html
8769: }
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
```

### Coincidencia 26 — línea 8775

```html
8770: 
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
```

### Coincidencia 27 — línea 8776

```html
8771: // ── VISTA SEMANAL (dashboard) ──
8772: function renderWeekGrid() {
8773:   const todayStr = today();
8774:   const now = new Date();
8775:   const wd = now.getDay();
8776:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8777:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8778:   const days = Array.from({length:7}, (_,i) => {
8779:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8780:   });
8781:   const grid = document.getElementById('weekGrid');
```

### Coincidencia 29 — línea 9232

```html
9227: 
9228: function renderSmartCobrosCenter() {
9229:   const box = document.getElementById('smartCobrosCenter');
9230:   if (!box) return;
9231:   const hoy = today();
9232:   const now = new Date();
9233:   const m = now.getMonth() + 1, y = now.getFullYear();
9234:   const d = smartBriefingData();
9235:   const citas = citasReales().filter(smartIsActiveAppointment);
9236:   const mesPend = citas.filter(c => {
9237:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
```

### Coincidencia 30 — línea 9233

```html
9228: function renderSmartCobrosCenter() {
9229:   const box = document.getElementById('smartCobrosCenter');
9230:   if (!box) return;
9231:   const hoy = today();
9232:   const now = new Date();
9233:   const m = now.getMonth() + 1, y = now.getFullYear();
9234:   const d = smartBriefingData();
9235:   const citas = citasReales().filter(smartIsActiveAppointment);
9236:   const mesPend = citas.filter(c => {
9237:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9238:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
```

### Coincidencia 32 — línea 9311

```html
9306: }
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
```

### Coincidencia 33 — línea 9312

```html
9307: 
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
```

### Coincidencia 34 — línea 9313

```html
9308: // ── DASHBOARD ──
9309: function initDashboard() {
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
```

### Coincidencia 36 — línea 9315

```html
9310:   const todayStr = today();
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
```

### Coincidencia 37 — línea 9316

```html
9311:   const now  = new Date();
9312:   const wd   = now.getDay();
9313:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9314:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9315:   const m    = now.getMonth()+1;
9316:   const y    = now.getFullYear();
9317: 
9318:   const citas = citasReales();
9319: 
9320:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9321:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
```

### Coincidencia 38 — línea 9456

```html
9451: 
9452: // ── AGENDA ──
9453: 
9454: // ── COBROS PENDIENTES DETALLE ──
9455: function _verCobrosPendientes() {
9456:   const now    = new Date();
9457:   const m      = now.getMonth() + 1, y = now.getFullYear();
9458:   const hoy    = today();
9459:   const citas  = citasReales();
9460:   const futuras = citas.filter(c => {
9461:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 39 — línea 9457

```html
9452: // ── AGENDA ──
9453: 
9454: // ── COBROS PENDIENTES DETALLE ──
9455: function _verCobrosPendientes() {
9456:   const now    = new Date();
9457:   const m      = now.getMonth() + 1, y = now.getFullYear();
9458:   const hoy    = today();
9459:   const citas  = citasReales();
9460:   const futuras = citas.filter(c => {
9461:     const [cy,cm] = normDate(c.fecha).split('-');
9462:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
```

### Coincidencia 41 — línea 9489

```html
9484:   document.getElementById('reporteMesBody').innerHTML = html;
9485:   document.getElementById('modalReporteMes').style.display = 'flex';
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
```

### Coincidencia 42 — línea 9491

```html
9486: }
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
```

### Coincidencia 43 — línea 9492

```html
9487: 
9488: function _verCobrosPendientesSemana() {
9489:   const now   = new Date();
9490:   const hoy   = today();
9491:   const dow   = now.getDay();
9492:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9493:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9494:   const toS = d => d.toLocalDateStr();
9495:   const sw = toS(startW), ew = toS(endW);
9496: 
9497:   const citas = citasReales();
```

### Coincidencia 45 — línea 9567

```html
9562:   ));
9563: 
9564:   // Citas normales
9565:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9566:   if (window._agendaFiltroPendienteCierre) {
9567:     const nowMs = Date.now();
9568:     citas = citas.filter(c => {
9569:       const estado = normalizeAppointmentStatus(c);
9570:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9571:       const fecha = normDate(c.fecha);
9572:       const hora = String(c.hora || '').slice(0, 5);
```

### Coincidencia 46 — línea 12339

```html
12334: }
12335: 
12336: // Helpers KV sync seguimiento
12337: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12338: function segToggleR(nombre)     {
12339:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12340:   if (segReagendo(nombre)) {
12341:     kvRemove('seg_reagendo_'+nombre);
12342:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12343:   } else {
12344:     kvSet('seg_reagendo_'+nombre,'1');
```

### Coincidencia 49 — línea 12353

```html
12348:   }
12349:   renderSeguimiento();
12350: }
12351: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
12352: function segMarkWa(nombre, tipo, dias) {
12353:   kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
12354:   const label = tipo==='sem3' ? 'WA aviso 3 semanas' : tipo==='sem4' ? 'WA semana 4' : 'WA semana 5+';
12355:   segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin descarga)');
12356:   renderSeguimiento();
12357: }
12358: 
```

### Coincidencia 50 — línea 12396

```html
12391: function renderSeguimiento() {
12392:   const lista = document.getElementById('segLista');
12393:   if (!lista) return;
12394:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12395: 
12396:   const now = new Date(); now.setHours(0,0,0,0);
12397: 
12398:   // Mapa: última descarga por paciente
12399:   const map = {};
12400:   allData.citas
12401:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
```

### Coincidencia 52 — línea 12415

```html
12410: 
12411:   // Calcular días y semana — descargas
12412:   const pacientes = Object.values(map).map(p => {
12413:     const [y,m,d] = p.fecha.split('-');
12414:     const last = new Date(+y,+m-1,+d);
12415:     const dias = Math.floor((now - last) / 86400000);
12416:     let semana = null;
12417:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12418:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12419:     else if (dias >= 49)              semana = 'sem5';
12420:     return { ...p, dias, semana };
```

### Coincidencia 53 — línea 12439

```html
12434:     });
12435: 
12436:   const readapPacs = Object.values(mapR).map(p => {
12437:     const [y,m,d] = p.fecha.split('-');
12438:     const last = new Date(+y,+m-1,+d);
12439:     const dias = Math.floor((now - last) / 86400000);
12440:     return { ...p, dias };
12441:   });
12442: 
12443:   // Contar
12444:   const c3 = pacientes.filter(p=>p.semana==='sem3').length;
```

### Coincidencia 54 — línea 12855

```html
12850:   return _getPkAsignados()
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
```

### Coincidencia 55 — línea 12856

```html
12851:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
```

### Coincidencia 56 — línea 12857

```html
12852:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12853: }
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
```

### Coincidencia 57 — línea 12859

```html
12854: function calcCobradoMes(mesParam, anyoParam) {
12855:   const now = new Date();
12856:   const m = mesParam  || now.getMonth()+1;
12857:   const y = anyoParam || now.getFullYear();
12858:   const todayStr = today();
12859:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12860:   const citasTotal = citasReales()
12861:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12862:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12863:   const eventosTotal = (allData.eventos || [])
12864:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
```

### Coincidencia 60 — línea 12941

```html
12936: }
12937: 
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
```

### Coincidencia 61 — línea 12942

```html
12937: 
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
12947:   const egresoFechaEl = document.getElementById('egresoFecha');
```

### Coincidencia 62 — línea 12943

```html
12938: // ── MÓDULO FINANZAS ──
12939: // ══════════════════════════════════════════════════════════════
12940: function renderFinanzas() {
12941:   const now = new Date();
12942:   const m   = now.getMonth()+1;
12943:   const y   = now.getFullYear();
12944:   const citas = citasReales();
12945: 
12946:   // ── Inicializar fecha egreso con hoy ──
12947:   const egresoFechaEl = document.getElementById('egresoFecha');
12948:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
```

### Coincidencia 63 — línea 13079

```html
13074: 
13075:   // ── Proyección extendida a fin de mes ──
13076:   const proyExtEl = document.getElementById('finProyeccionExt');
13077:   if (proyExtEl) {
13078:     const diasMes   = new Date(y, m, 0).getDate();
13079:     const diaActual = now.getDate();
13080:     const diasRest  = diasMes - diaActual;
13081:     const ritmoD    = diaActual > 0 ? cobradoMes / diaActual : 0;
13082:     const proyFin   = Math.round(ritmoD * diasMes);
13083:     const pctProy   = meta ? Math.min(Math.round(proyFin / meta * 100), 120) : null;
13084:     const color     = !meta ? 'var(--primary)' : (pctProy >= 100 ? 'var(--ok)' : pctProy >= 70 ? 'var(--warn)' : '#ef4444');
```

### Coincidencia 64 — línea 13159

```html
13154: 
13155:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
13156:   if (!monto || monto <= 0) { toast('Ingresa un monto válido', 'err'); return; }
13157: 
13158:   const arr = getEgresos();
13159:   arr.push({ id: Date.now().toString(), fecha, categoria: cat, concepto: conc, monto, descripcion: desc });
13160:   saveEgresos(arr);
13161: 
13162:   document.getElementById('egresoFecha').value  = '';
13163:   document.getElementById('egresoMonto').value  = '';
13164:   document.getElementById('egresoDesc').value   = '';
```

### Coincidencia 65 — línea 13182

```html
13177: function renderEgresosList() {
13178:   const el = document.getElementById('egresosListResult');
13179:   if (!el) return;
13180: 
13181:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13182:   const now = new Date();
13183:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13184:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13185:     document.getElementById('egresoMesFiltro').value = defaultMes;
13186:   }
13187:   const mes = filtroMes || defaultMes;
```

### Coincidencia 66 — línea 13183

```html
13178:   const el = document.getElementById('egresosListResult');
13179:   if (!el) return;
13180: 
13181:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13182:   const now = new Date();
13183:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13184:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13185:     document.getElementById('egresoMesFiltro').value = defaultMes;
13186:   }
13187:   const mes = filtroMes || defaultMes;
13188: 
```

### Coincidencia 68 — línea 13378

```html
13373: const VENTANA_NUEVO_DIAS   = 180;
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
```

### Coincidencia 69 — línea 13379

```html
13374: const VENTANA_RETENCION    = 60;
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
```

### Coincidencia 70 — línea 13380

```html
13375: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
13385:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 71 — línea 13457

```html
13452: 
13453: function addLead(canal = 'WhatsApp') {
13454:   const leads = getLeads();
13455:   const ahora = new Date();
13456:   leads.push({
13457:     id: Date.now(),
13458:     fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
13459:     hora: ahora.toTimeString().slice(0,5),    // HH:MM
13460:     canal: canal,
13461:     timestamp: ahora.getTime()
13462:   });
```

### Coincidencia 72 — línea 13500

```html
13495:     return +ly === y && +lm === m;
13496:   }).length;
13497: }
13498: 
13499: function changeKPIMonth(m, y) {
13500:   const now = new Date();
13501:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13502:   _kpiViewMonth = esActual ? null : {m, y};
13503:   renderKPIGuia();
13504: }
13505: 
```

### Coincidencia 73 — línea 13501

```html
13496:   }).length;
13497: }
13498: 
13499: function changeKPIMonth(m, y) {
13500:   const now = new Date();
13501:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13502:   _kpiViewMonth = esActual ? null : {m, y};
13503:   renderKPIGuia();
13504: }
13505: 
13506: function registrarLead(canal) {
```

### Coincidencia 75 — línea 13587

```html
13582:   setVal('kpiConvertidos', manual.convertidos);
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
```

### Coincidencia 76 — línea 13588

```html
13583:   setVal('kpiNPS', manual.nps);
13584:   setVal('kpiEncuestas', manual.encuestas);
13585:   setVal('kpiBD', manual.bd);
13586: 
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 78 — línea 13592

```html
13587:   const now  = new Date();
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
```

### Coincidencia 80 — línea 13593

```html
13588:   const m    = now.getMonth()+1, y = now.getFullYear();
13589:   const citas = citasReales();
13590: 
13591:   // Calcular inicio semana actual (lunes)
13592:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13593:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13594:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13595:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13596: 
13597:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13598:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
```

### Coincidencia 82 — línea 13818

```html
13813: function _copyGestionMesKey(d = new Date()) {
13814:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13815: }
13816: 
13817: function _copyGestionPeriodo() {
13818:   const now = new Date();
13819:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 83 — línea 13820

```html
13815: }
13816: 
13817: function _copyGestionPeriodo() {
13818:   const now = new Date();
13819:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13820:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13821: }
13822: 
13823: function _copyGestionTop(map, limit = 5) {
13824:   return Object.entries(map || {})
13825:     .sort((a,b) => b[1] - a[1])
```

### Coincidencia 85 — línea 13832

```html
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
13833:   const monthKey = _copyGestionMesKey(now);
13834:   const citasAll = allData.citas || [];
13835:   const eventosAll = allData.eventos || [];
13836:   const pacientesAll = allData.pacientes || [];
13837:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 86 — línea 13833

```html
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
13833:   const monthKey = _copyGestionMesKey(now);
13834:   const citasAll = allData.citas || [];
13835:   const eventosAll = allData.eventos || [];
13836:   const pacientesAll = allData.pacientes || [];
13837:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13838:   const manual = getKPIManual ? getKPIManual() : {};
```

### Coincidencia 87 — línea 13885

```html
13880:   const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
13881:   const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;
13882: 
13883:   const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
13884:   const leadsConvertidos = manual.convertidos || citasMesActivas.length;
13885:   const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);
13886: 
13887:   const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
13888:   const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
13889:   const disponibilidadPros = pros.length
13890:     ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
```

### Coincidencia 88 — línea 14335

```html
14330:     </div>
14331:   </div>`;
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
```

### Coincidencia 89 — línea 14336

```html
14331:   </div>`;
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
```

### Coincidencia 90 — línea 14337

```html
14332: }
14333: 
14334: function _buildReporteMes() {
14335:   const now  = new Date();
14336:   const m    = now.getMonth() + 1;
14337:   const y    = now.getFullYear();
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14342:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
```

### Coincidencia 91 — línea 14450

```html
14445:     const sv = c.servicio||'Sin tipo';
14446:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14447:   });
14448: 
14449:   // ── Pacientes ──
14450:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14451:   const pacMesMap = {};
14452:   citasMes.forEach(c => {
14453:     if (!c.nombre) return;
14454:     const k = c.nombre.trim().toLowerCase();
14455:     pacMesMap[k] = (pacMesMap[k]||0)+1;
```

### Coincidencia 93 — línea 14473

```html
14468: 
14469:   // Top 5 pacientes por sesiones
14470:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14471: 
14472:   // Retención 60 días
14473:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14474:   const conteoPac = {};
14475:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14476:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14477:   const pac60 = Object.keys(conteoPac).length;
14478:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
```

### Coincidencia 95 — línea 14588

```html
14583:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14584:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14585:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14586:       <div style="flex:1">
14587:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
14588:         <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
14589:       </div>
14590:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
14591:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14592:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
14593:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
```

### Coincidencia 96 — línea 15004

```html
14999: 
15000:   return html;
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
```

### Coincidencia 97 — línea 15005

```html
15000:   return html;
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
15010:   const el = document.getElementById('reporteMesBody');
```

### Coincidencia 98 — línea 15006

```html
15001: }
15002: 
15003: function copiarReporteMes() {
15004:   const now  = new Date();
15005:   const m    = now.getMonth() + 1;
15006:   const y    = now.getFullYear();
15007:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15008:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15009: 
15010:   const el = document.getElementById('reporteMesBody');
15011:   // Construir texto plano desde el HTML
```

### Coincidencia 99 — línea 15050

```html
15045: 
15046: // ══════════════════════════════════════════════════════════════
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
```

### Coincidencia 100 — línea 15051

```html
15046: // ══════════════════════════════════════════════════════════════
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
```

### Coincidencia 101 — línea 15052

```html
15047: // ── BRIEF PARA CLAUDE ──
15048: // ══════════════════════════════════════════════════════════════
15049: function copiarBriefClaude() {
15050:   const now   = new Date();
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
15057: 
```

### Coincidencia 102 — línea 15098

```html
15093:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15094:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15095:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15096: 
15097:   // ── Pacientes ──
15098:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15099:   const pacMesMap = {};
15100:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15101:   const pacUnicosMes = Object.keys(pacMesMap).length;
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
```

### Coincidencia 104 — línea 15107

```html
15102:   let pacNuevos=0, pacRecurrentes=0;
15103:   Object.keys(pacMesMap).forEach(pac=>{
15104:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15105:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15106:   });
15107:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15108:   const cont60={};
15109:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15110:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15111:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15112: 
```

### Coincidencia 106 — línea 15148

```html
15143:   const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
15144:   const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
15145:   const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);
15146: 
15147:   line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
15148:   line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
15149:   line(sep(60));
15150:   line();
15151:   line(`CONTEXTO DEL NEGOCIO`);
15152:   line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
15153:   line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
```

### Coincidencia 107 — línea 15359

```html
15354: // ══ MANUAL DE EMERGENCIA — funciones ══
15355: function renderEmergencia() {
15356:   const d = window._emKPIData;
15357:   if (!d) return;
15358: 
15359:   const now  = new Date();
15360:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15361: 
15362:   function kpiSt(val, meta, altoEsMejor) {
15363:     if (isNaN(val) || !meta || meta <= 0) return -1;
15364:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
```

### Coincidencia 108 — línea 15360

```html
15355: function renderEmergencia() {
15356:   const d = window._emKPIData;
15357:   if (!d) return;
15358: 
15359:   const now  = new Date();
15360:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15361: 
15362:   function kpiSt(val, meta, altoEsMejor) {
15363:     if (isNaN(val) || !meta || meta <= 0) return -1;
15364:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15365:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
```

### Coincidencia 109 — línea 15530

```html
15525: 
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
```

### Coincidencia 110 — línea 15531

```html
15526: function renderKPIGuia() {
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
```

### Coincidencia 111 — línea 15532

```html
15527:   const el = document.getElementById('kpiGuiaLiveData');
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
```

### Coincidencia 112 — línea 15533

```html
15528:   if (!el) return;
15529: 
15530:   const now = new Date();
15531:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15532:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15533:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15534:   const citas = citasReales();
15535: 
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
```

### Coincidencia 114 — línea 15541

```html
15536:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 116 — línea 15542

```html
15537: 
15538:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15539:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15540:   if (esMesActual) {
15541:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15542:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15543:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15544:     const citasSemana = citas.filter(c => {
15545:       const f = normDate(c.fecha);
15546:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15547:     });
```

### Coincidencia 118 — línea 15623

```html
15618:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15619:   ).length;
15620:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15621: 
15622:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15623:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15624:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
15625:   const cuentaPac = {};
15626:   citas.filter(c => {
15627:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15628:     return fd >= hace60 && fd <= refDate;
```

### Coincidencia 119 — línea 15638

```html
15633: 
15634:   // Selector de mes
15635:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15636:   let opcionesSelect = '';
15637:   for (let i = 0; i < 13; i++) {
15638:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15639:     const om = d.getMonth() + 1, oy = d.getFullYear();
15640:     const sel = (om === m && oy === y) ? 'selected' : '';
15641:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15642:   }
15643: 
```

### Coincidencia 121 — línea 15644

```html
15639:     const om = d.getMonth() + 1, oy = d.getFullYear();
15640:     const sel = (om === m && oy === y) ? 'selected' : '';
15641:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15642:   }
15643: 
15644:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15645:   const subtitulo = esMesActual
15646:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15647:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15648: 
15649:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
```

### Coincidencia 122 — línea 15705

```html
15700:     if (!c.nombre) return;
15701:     const nom = c.nombre.trim().toLowerCase();
15702:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15703:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15704:   });
15705:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15706:   const hace90Str = hace90.toLocalDateStr();
15707:   const _listaUnaVez = Object.values(_citasPorPac)
15708:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15709:     .map(p => p.nombre).sort();
15710: 
```

### Coincidencia 124 — línea 15717

```html
15712:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15713:   // Cálculo: sesiones diarias necesarias para cumplir meta
15714:   if (esMesActual) {
15715:     const diasEnMes = new Date(y, m, 0).getDate();
15716:     let diasRestantes = 0;
15717:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15718:       const dow = new Date(y, m - 1, d).getDay();
15719:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15720:     }
15721:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15722:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
```

### Coincidencia 125 — línea 15828

```html
15823: 
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
```

### Coincidencia 126 — línea 15829

```html
15824: function _renderCancelBreakdown() {
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 127 — línea 15830

```html
15825:   const el = document.getElementById('kpiCancelBreakdown');
15826:   if (!el) return;
15827: 
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
```

### Coincidencia 128 — línea 15833

```html
15828:   const now = new Date();
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
```

### Coincidencia 130 — línea 15834

```html
15829:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15830:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15831:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15832: 
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
```

### Coincidencia 132 — línea 15969

```html
15964:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
```

### Coincidencia 133 — línea 15970

```html
15965:   try {
15966:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15967:     const d = await r.json();
15968:     if (d.ok) {
15969:       const now = new Date();
15970:       const m = now.getMonth()+1, y = now.getFullYear();
15971:       const citasMes = citasReales().filter(c => {
15972:         const [cy,cm] = normDate(c.fecha).split('-');
15973:         return +cm===m && +cy===y;
15974:       }).length;
15975:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
```

### Coincidencia 135 — línea 15981

```html
15976:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15977:       const stats   = {
15978:         nps: npsVal, encuestas: encPct,
15979:         totalRespuestas: d.totalMes, citasMes,
15980:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15981:         fetchedAt: Date.now()
15982:       };
15983:       kvSet('encuestaStats', JSON.stringify(stats));
15984:       // Actualizar inputs ocultos y guardar
15985:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15986:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
```

### Coincidencia 136 — línea 16080

```html
16075: }
16076: 
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
```

### Coincidencia 137 — línea 16081

```html
16076: 
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
16086:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
```

### Coincidencia 138 — línea 16082

```html
16077: function _renderBDBreakdown() {
16078:   const el = document.getElementById('kpiBDLiveBreakdown');
16079:   if (!el) return;
16080:   const now = new Date();
16081:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16082:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16083:   const bd = calcBDActualizada(m, y);
16084:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16085: 
16086:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16087:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
```

### Coincidencia 139 — línea 16502

```html
16497: function renderEstructuraFinanciera() {
16498:   const el = document.getElementById('estructuraFinResult');
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
```

### Coincidencia 140 — línea 16504

```html
16499:   if (!el) return;
16500: 
16501:   const ingMes = calcCobradoMes();
16502:   const now = new Date();
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
```

### Coincidencia 142 — línea 16508

```html
16503:   const mes = filtroMesEgresos => {
16504:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16505:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16506:   };
16507:   const egresosMes = (() => {
16508:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16509:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16510:   })();
16511:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16512:   const utilidadBruta = ingMes - totalEgresosMes;
16513: 
```

### Coincidencia 144 — línea 17061

```html
17056:   renderCitasResumen();
17057: 
17058:   // Inicializar filtro de convenios con el mes actual
17059:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17060:   if (convMesFiltro && !convMesFiltro.value) {
17061:     const nm = now.getMonth()+1;
17062:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17063:   }
17064:   renderConveniosReport();
17065:   _checkAutoAtendida();
17066:   _checkCobrosPendientes();
```

### Coincidencia 145 — línea 17071

```html
17066:   _checkCobrosPendientes();
17067: }
17068: 
17069: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17070: function _checkAutoAtendida() {
17071:   const nowMs = Date.now();
17072:   const pendientes = (allData.citas || []).filter(c => {
17073:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17074:     if (esRegistroServ(c.servicio)) return false;
17075:     const f = normDate(c.fecha);
17076:     if (!f || !c.hora) return false;
```

### Coincidencia 146 — línea 17151

```html
17146:   }, 100);
17147: }
17148: 
17149: // ── Alerta semana floja ──
17150: function _checkAlertaSemanFloja(citas) {
17151:   const now = new Date();
17152:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17153:   const hoyStr = today();
17154: 
17155:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17156:   const dashEl = document.getElementById('alertaSemanFlojaDash');
```

### Coincidencia 147 — línea 17152

```html
17147: }
17148: 
17149: // ── Alerta semana floja ──
17150: function _checkAlertaSemanFloja(citas) {
17151:   const now = new Date();
17152:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17153:   const hoyStr = today();
17154: 
17155:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17156:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17157:   const finEl  = document.getElementById('alertaSemanFlojaFin');
```

### Coincidencia 148 — línea 17168

```html
17163:   };
17164: 
17165:   if (dow < 3 || dow > 5) { apagar(); return; }
17166: 
17167:   // Calcular ingresos semana actual (lunes a hoy)
17168:   const lunes = new Date(now);
17169:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17170:   lunes.setHours(0,0,0,0);
17171: 
17172:   let totalSemActual = 0, nSemActual = 0;
17173:   citas.forEach(c => {
```

### Coincidencia 149 — línea 17169

```html
17164: 
17165:   if (dow < 3 || dow > 5) { apagar(); return; }
17166: 
17167:   // Calcular ingresos semana actual (lunes a hoy)
17168:   const lunes = new Date(now);
17169:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17170:   lunes.setHours(0,0,0,0);
17171: 
17172:   let totalSemActual = 0, nSemActual = 0;
17173:   citas.forEach(c => {
17174:     const f = normDate(c.fecha);
```

### Coincidencia 150 — línea 18536

```html
18531: 
18532: // ══════════════════════════════════════════════════════════════
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
```

### Coincidencia 151 — línea 18537

```html
18532: // ══════════════════════════════════════════════════════════════
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
18542:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
```

### Coincidencia 152 — línea 18538

```html
18533: // ── EXPORTAR CSV ──
18534: // ══════════════════════════════════════════════════════════════
18535: function exportarCSV(modo) {
18536:   const now = new Date();
18537:   const m   = now.getMonth()+1;
18538:   const y   = now.getFullYear();
18539:   let citas = citasReales().filter(esCobrada);
18540: 
18541:   if (modo === 'mes') {
18542:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18543:   }
```

### Coincidencia 153 — línea 18580

```html
18575:   const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
18576:   const url  = URL.createObjectURL(blob);
18577:   const a    = document.createElement('a');
18578:   const nombre = modo === 'mes'
18579:     ? `ingresos_${y}-${pad(m)}.csv`
18580:     : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
18581:   a.href = url; a.download = nombre; a.click();
18582:   URL.revokeObjectURL(url);
18583:   toast('CSV descargado: ' + nombre);
18584: }
18585: 
```

### Coincidencia 154 — línea 18998

```html
18993: }
18994: 
18995: function _initComisMesSel() {
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
```

### Coincidencia 155 — línea 19001

```html
18996:   const sel = document.getElementById('comisMes');
18997:   if (!sel || sel.options.length > 0) return;
18998:   const now = new Date();
18999:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19000:   for (let i = 0; i < 12; i++) {
19001:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19002:     const opt = document.createElement('option');
19003:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19004:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19005:     sel.appendChild(opt);
19006:   }
```

### Coincidencia 157 — línea 19122

```html
19117:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19118:   renderComisiones();
19119: }
19120: 
19121: function marcarComisionPagada(persona) {
19122:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19123:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19124:   renderComisiones();
19125: }
19126: function desmarcarComisionPagada(persona) {
19127:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
```

### Coincidencia 158 — línea 19123

```html
19118:   renderComisiones();
19119: }
19120: 
19121: function marcarComisionPagada(persona) {
19122:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19123:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19124:   renderComisiones();
19125: }
19126: function desmarcarComisionPagada(persona) {
19127:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19128:   renderComisiones();
```

### Coincidencia 159 — línea 19571

```html
19566:   const editId = document.getElementById('msgEditId').value;
19567:   if (editId) {
19568:     const idx = msgs.findIndex(m => m.id === editId);
19569:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19570:   } else {
19571:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19572:   }
19573:   _setMensajesPre(msgs);
19574:   closeModal('modalMensaje');
19575:   renderMensajes();
19576:   toast('Mensaje guardado ✓', 'ok');
```

### Coincidencia 161 — línea 19700

```html
19695: function _fmtCLP(n) {
19696:   return '$' + Math.round(n).toLocaleString('es-CO');
19697: }
19698: 
19699: function _recMesActual() {
19700:   const now = new Date();
19701:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19702: }
19703: 
19704: function _initRecMesSel() {
19705:   const sel = document.getElementById('recMesFiltro');
```

### Coincidencia 162 — línea 19701

```html
19696:   return '$' + Math.round(n).toLocaleString('es-CO');
19697: }
19698: 
19699: function _recMesActual() {
19700:   const now = new Date();
19701:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19702: }
19703: 
19704: function _initRecMesSel() {
19705:   const sel = document.getElementById('recMesFiltro');
19706:   if (!sel) return;
```

### Coincidencia 164 — línea 19810

```html
19805:   if (!servicio) { alert('Selecciona el servicio'); return; }
19806:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19807: 
19808:   const comision = Math.round(venta * REC_PCT);
19809:   const rec = {
19810:     id: Date.now().toString(),
19811:     fecha,
19812:     paciente,
19813:     servicio,
19814:     venta,
19815:     comision,
```

### Coincidencia 165 — línea 20090

```html
20085: 
20086: function cargarCampañaReferidos() {
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
```

### Coincidencia 166 — línea 20091

```html
20086: function cargarCampañaReferidos() {
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
```

### Coincidencia 167 — línea 20092

```html
20087:   const panel = document.getElementById('refCampañaPanel');
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
20097:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
```

## Selectores de pago y cita

### Coincidencia 1 — línea 3490

```html
3482:       </div>
3483: 
3484:       <div id="pagosStats" class="team-stats"></div>
3485: 
3486:       <div class="team-grid">
3487:         <div class="team-panel">
3488:           <h2>Registrar comprobante</h2>
3489:           <p class="team-muted" style="margin-bottom:12px">Primero selecciona la cita. Luego sube el pantallazo y decide si queda pendiente o si ya autorizas la atención.</p>
3490:           <select id="payCitaId" onchange="selectPaymentAppointment(this.value)" style="display:none"></select>
3491: 
3492:           <div style="display:grid;grid-template-columns:minmax(260px,1fr) minmax(260px,.85fr);gap:16px;align-items:start">
3493:             <div>
3494:               <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px">
3495:                 <div>
3496:                   <div style="font-family:var(--font-m);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">1 · Selecciona la cita</div>
3497:                   <div class="team-muted">Citas recientes y pendientes de pago</div>
3498:                 </div>
```

### Coincidencia 2 — línea 6288

```html
6280:     if (d.ok) {
6281:       teamData = {
6282:         profesionales: d.profesionales || [],
6283:         asignaciones: d.asignaciones || [],
6284:         novedades: d.novedades || [],
6285:         auditoria: d.auditoria || [],
6286:         cuentas: d.cuentas || []
6287:       };
6288:       (allData.citas || []).forEach(c => {
6289:         const a = assignmentFor(c.id);
6290:         c.profesionalId = a.ProfesionalID || '';
6291:         c.estadoAutorizacion = a.EstadoAutorizacion || '';
6292:         c.tarifaProfesional = a.Tarifa || '';
6293:       });
6294:     }
6295:   } catch(e) {
6296:     console.warn('No se pudo cargar Equipo', e);
```

### Coincidencia 3 — línea 6311

```html
6303: }
6304: 
6305: function teamCleanText(value) {
6306:   return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
6307: }
6308: 
6309: function teamAppointmentById(id) {
6310:   const target = String(id || '');
6311:   return (allData.citas || []).find(c => String(c.id || c.ID || '') === target);
6312: }
6313: 
6314: function teamAssignedAppointments(proId = '') {
6315:   const citas = (teamData.asignaciones || [])
6316:     .filter(a => !proId || String(a.ProfesionalID || '') === String(proId))
6317:     .map(a => {
6318:       const c = teamAppointmentById(a.CitaID);
6319:       return c ? { ...c, _assignment:a } : null;
```

### Coincidencia 4 — línea 6449

```html
6441:     </div>`;
6442: }
6443: 
6444: function renderEquipo() {
6445:   const pros = (teamData.profesionales || []).filter(p => (p.estado || '') !== 'Eliminado');
6446:   const assigns = teamData.asignaciones || [];
6447:   const novedades = teamData.novedades || [];
6448:   const cuentas = teamData.cuentas || [];
6449:   const citas = citasReales ? citasReales() : (allData.citas || []);
6450:   const asignadas = new Set(assigns.map(a => String(a.CitaID || '')));
6451:   const hoyStr = today();
6452:   const estadosNoAsignables = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','No asistió','Atendida','Sesión atendida','Reembolsada'];
6453:   const citasAsignadasOperativas = teamAssignedAppointments().filter(c => !teamIsInactiveAppointment(c));
6454:   const pendientes = citas
6455:     .filter(c => !asignadas.has(String(c.id)) && normDate(c.fecha) >= hoyStr && !estadosNoAsignables.includes(c.estado))
6456:     .sort((a,b) => (`${normDate(a.fecha)} ${a.hora||''}`).localeCompare(`${normDate(b.fecha)} ${b.hora||''}`))
6457:     .slice(0, 12);
```

### Coincidencia 5 — línea 6531

```html
6523: }
6524: 
6525: function openProfessionalSchedule(id) {
6526:   const pro = byIdFrom(teamData.profesionales, 'id', id) || byIdFrom(teamData.profesionales, 'ID', id);
6527:   if (!pro) return toast('No encontré el fisioterapeuta', 'err');
6528:   const assignments = (teamData.asignaciones || []).filter(a => String(a.ProfesionalID || '') === String(id));
6529:   const citas = assignments
6530:     .map(a => {
6531:       const c = (allData.citas || []).find(x => String(x.id || x.ID || '') === String(a.CitaID || ''));
6532:       return c ? { ...c, _assignment: a } : null;
6533:     })
6534:     .filter(Boolean)
6535:     .filter(c => isOperationalDate(c.fecha))
6536:     .sort((a,b) => (`${normDate(a.fecha)} ${a.hora || ''}`).localeCompare(`${normDate(b.fecha)} ${b.hora || ''}`));
6537:   const hoyStr = today();
6538:   const proximas = citas.filter(c => normDate(c.fecha) >= hoyStr);
6539:   const anteriores = citas.filter(c => normDate(c.fecha) < hoyStr);
```

### Coincidencia 6 — línea 6649

```html
6641:     renderEquipo();
6642:     toast('Fisioterapeuta eliminado de la lista');
6643:   } else {
6644:     toast(d.error || 'No se pudo eliminar', 'err');
6645:   }
6646: }
6647: 
6648: function abrirAsignarPro(citaId) {
6649:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6650:   if (!c) return toast('No encontré la cita', 'err');
6651:   const a = assignmentFor(citaId);
6652:   document.getElementById('assignCitaId').value = citaId;
6653:   document.getElementById('assignCitaResumen').innerHTML = `
6654:     <strong>${esc(c.nombre)}</strong>
6655:     <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.servicio)} · Estado: ${esc(c.estado)}</div>
6656:     <div class="team-muted">Asignado actual: ${esc(professionalName(a.ProfesionalID))}</div>`;
6657:   document.getElementById('assignProfessionalId').innerHTML = activeProfessionals().map(p => `<option value="${esc(p.id)}" ${a.ProfesionalID === p.id ? 'selected' : ''}>${esc(p.nombre)} · ${esc(p.rol || 'Fisioterapeuta')}</option>`).join('');
```

### Coincidencia 7 — línea 6767

```html
6759: 
6760: function paymentAccountLabel(id) {
6761:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6762:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6763: }
6764: 
6765: function paymentCandidateAppointments() {
6766:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6767:   return (allData.citas || [])
6768:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6769:     .sort((a,b) => {
6770:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6771:       const pa = priority(a.estado), pb = priority(b.estado);
6772:       if (pa !== pb) return pa - pb;
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
```

### Coincidencia 8 — línea 6781

```html
6773:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6774:     })
6775:     .slice(0, 160);
6776: }
6777: 
6778: function renderPaymentAppointmentList() {
6779:   const list = document.getElementById('paymentAppointmentList');
6780:   if (!list) return;
6781:   const selectedId = document.getElementById('payCitaId')?.value || '';
6782:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6783:   const citas = paymentCandidateAppointments().filter(c => {
6784:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6785:     return !q || hay.includes(q);
6786:   }).slice(0, 60);
6787:   list.innerHTML = citas.length ? citas.map(c => {
6788:     const active = String(c.id) === String(selectedId);
6789:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
```

### Coincidencia 9 — línea 6807

```html
6799:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6800:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6801:       </div>
6802:     </button>`;
6803:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6804: }
6805: 
6806: function selectPaymentAppointment(id) {
6807:   const citaSel = document.getElementById('payCitaId');
6808:   if (citaSel) citaSel.value = id || '';
6809:   prefillPaymentFromAppointment();
6810:   renderPaymentAppointmentList();
6811: }
6812: 
6813: function updateSelectedPaymentCard(c) {
6814:   const card = document.getElementById('selectedPaymentCard');
6815:   if (!card) return;
```

### Coincidencia 10 — línea 6842

```html
6834: function updatePaymentProofLabel() {
6835:   const file = document.getElementById('payProofFile')?.files?.[0];
6836:   const label = document.getElementById('payProofLabel');
6837:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6838: }
6839: 
6840: function fillPaymentSelectors(selectedId = '') {
6841:   const citas = paymentCandidateAppointments();
6842:   const citaSel = document.getElementById('payCitaId');
6843:   if (citaSel) {
6844:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6845:   }
6846:   const medioSel = document.getElementById('payMedioPago');
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
```

### Coincidencia 11 — línea 6855

```html
6847:   if (medioSel) {
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
```

### Coincidencia 12 — línea 6856

```html
6848:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6849:   }
6850:   prefillPaymentFromAppointment();
6851:   renderPaymentAppointmentList();
6852: }
6853: 
6854: function prefillPaymentFromAppointment() {
6855:   const id = document.getElementById('payCitaId')?.value || '';
6856:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
```

### Coincidencia 13 — línea 6865

```html
6857:   updateSelectedPaymentCard(c);
6858:   if (!c) return;
6859:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6860:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6861: }
6862: 
6863: function clearPaymentForm() {
6864:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6865:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6866:   updatePaymentProofLabel();
6867:   updateSelectedPaymentCard(null);
6868:   renderPaymentAppointmentList();
6869: }
6870: 
6871: function abrirPagoCita(id) {
6872:   showView('pagos');
6873:   setTimeout(() => {
```

### Coincidencia 14 — línea 6881

```html
6873:   setTimeout(() => {
6874:     fillPaymentSelectors(id);
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const citaId = document.getElementById('payCitaId').value;
6882:   if (!citaId) return toast('Selecciona una cita', 'err');
6883:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6884:   const medioEl = document.getElementById('payMedioPago');
6885:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6886:   const proofFile = await readPaymentProofFile();
6887:   if (proofFile?.error) return toast(proofFile.error, 'err');
6888:   const ref = document.getElementById('payComprobante').value.trim();
6889:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
```

### Coincidencia 15 — línea 6883

```html
6875:     const el = document.getElementById('payValorRecibido');
6876:     if (el) el.focus();
6877:   }, 350);
6878: }
6879: 
6880: async function saveManualPayment(mode = 'verify') {
6881:   const citaId = document.getElementById('payCitaId').value;
6882:   if (!citaId) return toast('Selecciona una cita', 'err');
6883:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6884:   const medioEl = document.getElementById('payMedioPago');
6885:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6886:   const proofFile = await readPaymentProofFile();
6887:   if (proofFile?.error) return toast(proofFile.error, 'err');
6888:   const ref = document.getElementById('payComprobante').value.trim();
6889:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6890:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6891:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
```

### Coincidencia 16 — línea 6958

```html
6950:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6951:     await reload();
6952:     await loadOperationsData();
6953:     renderPagos();
6954:   } else toast(d.error || 'No se pudo verificar', 'err');
6955: }
6956: 
6957: function renderPagos() {
6958:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6959:   const pagos = operationsData.pagos || [];
6960:   const pagosUnicos = [];
6961:   const seenPayments = new Set();
6962:   pagos.forEach(p => {
6963:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6964:     if (seenPayments.has(key)) return;
6965:     seenPayments.add(key);
6966:     pagosUnicos.push(p);
```

### Coincidencia 17 — línea 7718

```html
7710: };
7711: let _activeKPIExplorer = null;
7712: 
7713: function _kpiSnapshot(m,y) {
7714:   const citas = citasReales();
7715:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7716:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7717:   const leads = getLeadsMes(m,y);
7718:   const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
7719:   const motivos = getCancelMotivos();
7720:   const cancel = todas.filter(c => (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(motivos[c.id])).length;
7721:   const ref = new Date(y,m,0), start = new Date(ref); start.setDate(ref.getDate()-VENTANA_RETENCION);
7722:   const cuenta = {};
7723:   citas.filter(c => { const d=new Date(normDate(c.fecha)+'T12:00:00'); return d>=start&&d<=ref; }).forEach(c=>{const k=_normStr(c.nombre);if(k)cuenta[k]=(cuenta[k]||0)+1;});
7724:   const retTotal=Object.keys(cuenta).length, bd=calcBDActualizada(m,y);
7725:   const snapshot = {
7726:     gkKpi1:mes.length,
```

### Coincidencia 18 — línea 7901

```html
7893: function _opsItem({level='normal',type='paciente',title,sub,actions=''}) {
7894:   return `<div class="ops-item" data-level="${level}"><div class="ops-icon">${_actionIcon(type)}</div><div class="ops-copy"><div class="ops-title">${title}</div><div class="ops-sub">${sub}</div></div><div class="ops-actions">${actions}</div></div>`;
7895: }
7896: 
7897: function renderCentroAcciones() {
7898:   const list = document.getElementById('opsList');
7899:   if (!list) return;
7900:   const hoy = today();
7901:   const citas = (allData.citas || []).filter(c => !esRegistroServ(c.servicio));
7902:   const citasOperativas = citas.filter(c => isOperationalDate(c.fecha));
7903:   const citasHoy = citasOperativas.filter(c => normDate(c.fecha) === hoy && c.estado !== 'Cancelada' && c.estado !== 'Atendida');
7904:   const cobros = citasOperativas.filter(c => normDate(c.fecha) < hoy && c.estado !== 'Cancelada' && !isPagada(c.id));
7905: 
7906:   const pacientesMap = new Map();
7907:   citasOperativas.filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) <= hoy).forEach(c => {
7908:     const key = _normStr(c.nombre);
7909:     if (!key) return;
```

### Coincidencia 19 — línea 8163

```html
8155:   document.querySelectorAll('.mob-nav-btn').forEach(btn => {
8156:     const id = btn.id.replace('mobBtn-','');
8157:     btn.classList.toggle('active', id === (target || v));
8158:   });
8159: }
8160: 
8161: // Actualizar badge de pendientes en mobile nav
8162: function _updateMobBadge() {
8163:   const n = (allData.citas || []).filter(c => c.estado === 'Pendiente').length;
8164:   const b = document.getElementById('mobBadgeAgenda');
8165:   if (!b) return;
8166:   b.style.display = n > 0 ? '' : 'none';
8167:   b.textContent   = n > 9 ? '9+' : n;
8168: }
8169: 
8170: // Skeleton para tablas mientras carga
8171: function _showTableSkeleton(tbodyId, cols = 5, rows = 6) {
```

### Coincidencia 20 — línea 8254

```html
8246: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8247: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8248: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8249: 
8250: // ── PAGO POR CITA ──
8251: let _pagoIdActivo = null;
8252: 
8253: function isPagada(id) {
8254:   const c = allData.citas.find(x => x.id === id);
8255:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8256: }
8257: 
8258: function getMetodoPago(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return (c && c.pago) || '';
8261: }
8262: 
```

### Coincidencia 21 — línea 8259

```html
8251: let _pagoIdActivo = null;
8252: 
8253: function isPagada(id) {
8254:   const c = allData.citas.find(x => x.id === id);
8255:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8256: }
8257: 
8258: function getMetodoPago(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return (c && c.pago) || '';
8261: }
8262: 
8263: function pagoBadge(id) {
8264:   const c      = allData.citas.find(x => x.id === id);
8265:   const future = c && normDate(c.fecha) > today();
8266:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8267:   const metodo = getMetodoPago(id);
```

### Coincidencia 22 — línea 8264

```html
8256: }
8257: 
8258: function getMetodoPago(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return (c && c.pago) || '';
8261: }
8262: 
8263: function pagoBadge(id) {
8264:   const c      = allData.citas.find(x => x.id === id);
8265:   const future = c && normDate(c.fecha) > today();
8266:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8267:   const metodo = getMetodoPago(id);
8268:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8269:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8270:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8271: }
8272: 
```

### Coincidencia 23 — línea 8280

```html
8272: 
8273: function esCobrada(c) {
8274:   if (normDate(c.fecha) > today()) return false;
8275:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8276: }
8277: 
8278: function abrirModalPago(id) {
8279:   _pagoIdActivo = id;
8280:   const c = allData.citas.find(x => x.id === id);
8281:   const sub = document.getElementById('pagoModalNombre');
8282:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8283:   const metodoActual = c ? c.pago : '';
8284:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8285:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8286:   });
8287:   document.getElementById('modalPago').classList.add('open');
8288: }
```

### Coincidencia 24 — línea 8302

```html
8294: 
8295: async function confirmarPago(metodo) {
8296:   if (!_pagoIdActivo) return;
8297:   const id = _pagoIdActivo;
8298:   cerrarModalPago();
8299:   try {
8300:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8301:     if (r.ok) {
8302:       const c = allData.citas.find(x => x.id === id);
8303:       if (c) c.pago = metodo;
8304:       if (metodo) kvSet('pago_'+id, '1');
8305:       else kvRemove('pago_'+id);
8306:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8307:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8308:       renderAgenda(); initDashboard(); renderFinanzas();
8309:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8310:   } catch(e) { toast('Error de conexión', 'err'); }
```

### Coincidencia 25 — línea 8320

```html
8312: 
8313: // ── ALERTA CITA PRÓXIMA ──
8314: function checkUpcomingAlerts() {
8315:   const now      = new Date();
8316:   const todayStr = today();
8317:   const banner   = document.getElementById('upcomingAlert');
8318:   if (!banner) return;
8319: 
8320:   const candidates = allData.citas
8321:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8322:     .map(c => {
8323:       const [h, m] = c.hora.split(':').map(Number);
8324:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8325:       const diff = (dt - now) / 60000;
8326:       return { ...c, diff };
8327:     })
8328:     .filter(c => c.diff > 0 && c.diff <= 120)
```

### Coincidencia 26 — línea 8344

```html
8336:   document.getElementById('upcomingAlertMins').textContent =
8337:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
8338:   banner.classList.add('show');
8339: }
8340: 
8341: // ── EXPORTAR AGENDA DEL DÍA ──
8342: function exportarAgendaDia() {
8343:   const todayStr = today();
8344:   const citas = allData.citas
8345:     .filter(c => normDate(c.fecha) === todayStr && c.estado !== 'Cancelada')
8346:     .sort((a, b) => a.hora.localeCompare(b.hora));
8347:   if (!citas.length) { toast('No hay citas hoy para exportar', 'err'); return; }
8348: 
8349:   const fecha = new Date().toLocaleDateString('es-CO', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
8350:   let txt = `AGENDA — ${fecha.toUpperCase()}\n${'='.repeat(52)}\n\n`;
8351:   citas.forEach((c, i) => {
8352:     txt += `${i+1}. ${c.hora}  ${c.nombre}\n`;
```

### Coincidencia 27 — línea 8752

```html
8744:   const panel = document.getElementById('reagendarPanel_' + id);
8745:   if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
8746: }
8747: async function confirmarReagendar(id) {
8748:   const fecha = document.getElementById('rDate_' + id).value;
8749:   const hora  = document.getElementById('rTime_' + id).value;
8750:   if (!fecha || !hora) { toast('Selecciona fecha y hora', 'err'); return; }
8751:   if (!validateNoMidnight(hora, 'reagendar')) return;
8752:   const cita = allData.citas.find(c => c.id === id);
8753:   if (!cita) return;
8754:   const data = encodeURIComponent(JSON.stringify({
8755:     id, servicio: cita.servicio, modalidad: cita.modalidad,
8756:     fecha, hora, precio: cita.precio, notas: cita.notas || ''
8757:   }));
8758:   try {
8759:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
8760:     const d = await r.json();
```

### Coincidencia 28 — línea 8873

```html
8865:   return n + (n <= 10 ? s[n] : 'ra');
8866: }
8867: 
8868: function getInfoSesion(nombre, servicio, fecha) {
8869:   const total = sesionesPorPaquete[servicio];
8870:   if (!total) return null;
8871:   const norm  = (nombre||'').toLowerCase().trim();
8872:   const hasta = normDate(fecha);
8873:   const lista = (allData && allData.citas) ? allData.citas : [];
8874:   const numero = lista.filter(c =>
8875:     (c.nombre||'').toLowerCase().trim() === norm &&
8876:     c.servicio === servicio &&
8877:     c.estado !== 'Cancelada' &&
8878:     normDate(c.fecha) <= hasta
8879:   ).length;
8880:   return { numero: Math.max(1, numero), total };
8881: }
```

### Coincidencia 30 — línea 9034

```html
9026: // esCobrada definida arriba junto a pagoBadge
9027: function esCobrada_UNUSED(c) {
9028:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
9029: }
9030: 
9031: // Citas reales (sin registros, sin canceladas, sin duplicados)
9032: function citasReales() {
9033:   const seen = new Set();
9034:   const result = allData.citas.filter(c => {
9035:     if (c.estado === 'Cancelada' || c.estado === 'Registro' || esRegistroServ(c.servicio)) return false;
9036:     if (!c.hora || isMidnightTime(c.hora)) return false;
9037:     const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
9038:     if (seen.has(key)) return false;
9039:     seen.add(key);
9040:     return true;
9041:   });
9042:   // Normalizar canal para citas antiguas que no lo tienen
```

### Coincidencia 31 — línea 9278

```html
9270:           </div>
9271:         </div>`).join('')}
9272:     </div>` : ''}
9273:   `;
9274: }
9275: 
9276: function patientInsightHtml(c) {
9277:   const key = smartPatientKey(c);
9278:   const lista = allData.citas
9279:     .filter(x => smartPatientKey(x) === key || (x.nombre || '').toLowerCase().trim() === (c.nombre || '').toLowerCase().trim())
9280:     .filter(smartIsActiveAppointment)
9281:     .sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora));
9282:   const hoy = today();
9283:   const futuras = lista.filter(x => normDate(x.fecha) > hoy && x.id !== c.id && x.estado !== 'Cancelada').sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora));
9284:   const realizadas = lista.filter(x => normDate(x.fecha) <= hoy && x.estado !== 'Cancelada');
9285:   const total = lista.reduce((s,x)=>s+parsePrecio(x.precio),0);
9286:   const pendiente = lista.filter(x => !smartIsPaid(x)).reduce((s,x)=>s+parsePrecio(x.precio),0);
```

### Coincidencia 32 — línea 9531

```html
9523: }
9524: 
9525: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9526: function globalSearch(val) {
9527:   if (!val || !val.trim()) return;
9528:   const q = val.trim().toLowerCase();
9529: 
9530:   // ¿Es un paciente?
9531:   const esPaciente = (allData.citas || []).some(c =>
9532:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
9533:   );
9534:   if (esPaciente) {
9535:     showView('agenda');
9536:     const fSearch = document.getElementById('fSearch');
9537:     if (fSearch) { fSearch.value = val; renderAgenda(); }
9538:     return;
9539:   }
```

### Coincidencia 33 — línea 9565

```html
9557:   const fHasta   = document.getElementById('fHasta').value;
9558: 
9559:   // Persistir filtros en sessionStorage
9560:   sessionStorage.setItem('agendaFilters', JSON.stringify(
9561:     {search, status: fSt, mod: fMod, service: fService, desde: fDesde, hasta: fHasta}
9562:   ));
9563: 
9564:   // Citas normales
9565:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9566:   if (window._agendaFiltroPendienteCierre) {
9567:     const nowMs = Date.now();
9568:     citas = citas.filter(c => {
9569:       const estado = normalizeAppointmentStatus(c);
9570:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9571:       const fecha = normDate(c.fecha);
9572:       const hora = String(c.hora || '').slice(0, 5);
9573:       if (!fecha || !/^\d{2}:\d{2}$/.test(hora)) return false;
```

### Coincidencia 34 — línea 9709

```html
9701:   document.getElementById('fStatus').selectedIndex = 0;
9702:   document.getElementById('fMod').selectedIndex = 0;
9703:   document.getElementById('fService').selectedIndex = 0;
9704:   showView('agenda');
9705:   renderAgenda();
9706: }
9707: 
9708: function updateBadge() {
9709:   const n = allData.citas.filter(c => c.estado === 'Pendiente').length;
9710:   const b = document.getElementById('badgePendientes');
9711:   if (!b) return;
9712:   b.textContent = n;
9713:   b.style.display = n > 0 ? 'inline' : 'none';
9714: }
9715: 
9716: function resumenDiaWA() {
9717:   const todayStr = today();
```

### Coincidencia 35 — línea 9767

```html
9759:   const paraQuien = (document.getElementById('notaParaQuienInput').value||'').trim();
9760:   const otrasNotas = document.getElementById('notaAdminInput').value.trim();
9761:   const nota = (paraQuien ? '[PARA: ' + paraQuien + ']' + (otrasNotas ? ' ' + otrasNotas : '') : otrasNotas);
9762:   try {
9763:     const data = encodeURIComponent(JSON.stringify({id, notaAdmin: nota}));
9764:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
9765:     const d = await r.json();
9766:     if (d.ok) {
9767:       const cita = allData.citas.find(c => c.id === id);
9768:       if (cita) cita.notaAdmin = nota;
9769:       toast('Nota guardada');
9770:     } else toast('Error al guardar nota', 'err');
9771:   } catch(e) { toast('Error de conexión', 'err'); }
9772: }
9773: 
9774: async function changeStatus(id, status) {
9775:   try {
```

### Coincidencia 36 — línea 9779

```html
9771:   } catch(e) { toast('Error de conexión', 'err'); }
9772: }
9773: 
9774: async function changeStatus(id, status) {
9775:   try {
9776:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updateStatus&token=${encodeURIComponent(TOKEN)}&id=${id}&status=${status}`);
9777:     const d = await r.json();
9778:     if (d.ok) {
9779:       const cita = allData.citas.find(c => c.id === id);
9780:       if (cita) cita.estado = status;
9781:       if (cita) logChange('Estado cambiado', `${cita.nombre} · ${cita.servicio} ${cita.fecha} → ${status}`);
9782:       toast('Estado actualizado: ' + status);
9783:       if (status === 'No asistió' && cita) {
9784:         const t = String(cita.telefono||'').replace(/\D/g,'');
9785:         const phone = t.length <= 10 ? '57'+t : t;
9786:         if (t.length >= 7 && confirm('¿Enviarle mensaje de reagendamiento a ' + cita.nombre + '?')) {
9787:           const msg = 'Hola ' + waNombre(cita.nombre) + '! \uD83D\uDE4F Vi que no pudiste venir hoy. Espero que todo este bien. Cuando quieras reagendamos, dime que dias te quedan mejor y coordinamos. \uD83D\uDE0A — Cuidándote Fisioterapia';
```

### Coincidencia 37 — línea 9799

```html
9791:       initDashboard();
9792:       renderAgenda();
9793:       updateBadge();
9794:     } else toast('Error al actualizar', 'err');
9795:   } catch(e) { toast('Error de conexión', 'err'); }
9796: }
9797: 
9798: function verDetalle(id) {
9799:   const c = allData.citas.find(x => x.id === id);
9800:   if (!c) return;
9801:   const esCancelada = c.estado === 'Cancelada';
9802:   document.getElementById('modalDetalleContent').innerHTML = `
9803:     <div style="display:grid;gap:12px">
9804:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
9805:         ${row('Paciente', esc(c.nombre))} ${row('Teléfono', esc(c.telefono||'—'))}
9806:         ${row('Email', esc(c.email||'—'))} ${row('Servicio', esc(c.servicio))}
9807:         ${row('Fecha', esc(fmtDate(c.fecha) + ' · ' + c.hora))} ${row('Modalidad', esc(c.modalidad))}
```

### Coincidencia 38 — línea 9819

```html
9811:         ${row('ID cita', esc(c.id))}
9812:       </div>
9813:       ${patientInsightHtml(c)}
9814:       <!-- Nota interna editable -->
9815:       <div style="margin-top:10px;padding:10px 12px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.25);border-radius:8px">
9816:         <div style="font-size:.75rem;color:#92400e;font-family:var(--font-m);margin-bottom:8px">📝 Nota interna (solo tú la ves)</div>
9817:         <div style="margin-bottom:8px">
9818:           <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">👤 ¿La sesión es para otra persona? (afecta el mensaje de seguimiento)</div>
9819:           <input type="text" id="notaParaQuienInput" value="${(()=>{ const m=(c.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i); if(m) return m[1].trim(); const prev=allData.citas.filter(x=>x.nombre===c.nombre&&x.id!==c.id&&x.notaAdmin).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)); for(const p of prev){const mp=p.notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);if(mp)return mp[1].trim();} return ''; })()}" placeholder="Ej: tu esposo, tu mamá, tu hijo... (dejar en blanco si es para quien llama)" style="width:100%;background:rgba(255,255,255,.15);border:none;border-bottom:1px solid rgba(251,191,36,.4);border-radius:0;padding:4px 0;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text)">
9820:         </div>
9821:         <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">📋 Otras notas</div>
9822:         <textarea id="notaAdminInput" rows="2" style="width:100%;background:transparent;border:none;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text);resize:none" placeholder="Ej: Debe pagar saldo, viene en transporte...">${(c.notaAdmin||'').replace(/\[PARA:[^\]]*\]\s*/i,'').trim()}</textarea>
9823:         <button class="btn btn-ghost btn-sm" style="margin-top:6px" onclick="guardarNotaAdmin('${c.id}')">Guardar nota</button>
9824:       </div>
9825:       <!-- Mini-historial -->
9826:       ${(()=>{
9827:         const prev = allData.citas.filter(x => x.nombre===c.nombre && x.id!==c.id).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)).slice(0,3);
```

### Coincidencia 39 — línea 9827

```html
9819:           <input type="text" id="notaParaQuienInput" value="${(()=>{ const m=(c.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i); if(m) return m[1].trim(); const prev=allData.citas.filter(x=>x.nombre===c.nombre&&x.id!==c.id&&x.notaAdmin).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)); for(const p of prev){const mp=p.notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);if(mp)return mp[1].trim();} return ''; })()}" placeholder="Ej: tu esposo, tu mamá, tu hijo... (dejar en blanco si es para quien llama)" style="width:100%;background:rgba(255,255,255,.15);border:none;border-bottom:1px solid rgba(251,191,36,.4);border-radius:0;padding:4px 0;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text)">
9820:         </div>
9821:         <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">📋 Otras notas</div>
9822:         <textarea id="notaAdminInput" rows="2" style="width:100%;background:transparent;border:none;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text);resize:none" placeholder="Ej: Debe pagar saldo, viene en transporte...">${(c.notaAdmin||'').replace(/\[PARA:[^\]]*\]\s*/i,'').trim()}</textarea>
9823:         <button class="btn btn-ghost btn-sm" style="margin-top:6px" onclick="guardarNotaAdmin('${c.id}')">Guardar nota</button>
9824:       </div>
9825:       <!-- Mini-historial -->
9826:       ${(()=>{
9827:         const prev = allData.citas.filter(x => x.nombre===c.nombre && x.id!==c.id).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)).slice(0,3);
9828:         if (!prev.length) return '';
9829:         return `<div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px">
9830:           <div style="font-size:.75rem;color:var(--muted);font-family:var(--font-m);margin-bottom:8px">CITAS ANTERIORES DE ${esc(c.nombre.split(' ')[0].toUpperCase())}</div>
9831:           ${prev.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(27,191,176,.07);font-size:.82rem">
9832:             <span style="font-family:var(--font-m);color:var(--primary);font-size:.75rem">${esc(fmtDate(p.fecha))} ${esc(p.hora)}</span>
9833:             <span style="flex:1;margin:0 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.servicio)}</span>
9834:             ${chipState(p.estado)}
9835:           </div>`).join('')}
```

### Coincidencia 40 — línea 9908

```html
9900: 
9901:   const btn = document.getElementById('btnConfirmarCancelar');
9902:   btn.disabled = true; btn.textContent = 'Cancelando...';
9903: 
9904:   try {
9905:     const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${id}`);
9906:     const d = await r.json();
9907:     if (d.ok) {
9908:       const cita = allData.citas.find(c => c.id === id);
9909:       if (cita) { cita.estado = 'Cancelada'; cita.motivoCancelacion = motivo; }
9910:       saveCancelMotivo(id, motivo);
9911:       if (cita) logChange('Cita cancelada', `${cita.nombre} · ${cita.fecha} ${cita.hora} · ${motivo}`);
9912:       toast(esCancelExcluida(motivo) ? `🧪 Cita cancelada (${motivo} — no afecta KPIs)` : `Cita cancelada: ${motivo}`, 'ok');
9913:       document.getElementById('modalCancelar').style.display = 'none';
9914:       closeModal('modalDetalle');
9915:       initDashboard();
9916:       renderAgenda();
```

### Coincidencia 41 — línea 9958

```html
9950:   kvSet('cancelMotivos', JSON.stringify(map));
9951:   _renderCancelBreakdown();
9952:   renderGestionMes();
9953: }
9954: 
9955: // ── Abrir modal de edición con datos actuales ──
9956: function editarCita(id) {
9957:   try {
9958:     const c = allData.citas.find(x => x.id === id);
9959:     if (!c) { toast('No se encontró la cita', 'err'); return; }
9960: 
9961:     document.getElementById('editId').value     = c.id;
9962:     document.getElementById('editFecha').value  = normDate(c.fecha);
9963:     document.getElementById('editPrecio').value = c.precio || '';
9964:     document.getElementById('editNotas').value  = c.notas  || '';
9965: 
9966:     // Servicio — buscar por texto (opciones con y sin optgroup)
```

### Coincidencia 42 — línea 10037

```html
10029:   const monto = parsePrecio(document.getElementById('editDescMonto').value) || 0;
10030:   if (pct > 0)   return formatPrecio(base - Math.round(base * pct / 100));
10031:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
10032:   return document.getElementById('editPrecio').value.trim();
10033: }
10034: // ── Guardar los cambios de la edición ──
10035: async function guardarEdicion() {
10036:   const id       = document.getElementById('editId').value;
10037:   const anterior = allData.citas.find(c => c.id === id);
10038:   const servicio = document.getElementById('editServicio').value;
10039:   const modalidad= document.getElementById('editModalidad').value;
10040:   const fecha    = document.getElementById('editFecha').value;
10041:   const hora     = document.getElementById('editHora').value;
10042:   const precio   = getPrecioFinalEdit();
10043:   const notas    = document.getElementById('editNotas').value.trim();
10044:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
10045:   if (!validateNoMidnight(hora, 'guardar la cita')) return;
```

### Coincidencia 43 — línea 10385

```html
10377: function updateSesionesInfo() {
10378:   const serv   = document.getElementById('ncService').value;
10379:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10380:   const el     = document.getElementById('ncSesionesInfo');
10381:   if (!el) return;
10382:   const n = sesionesPorPaquete[serv];
10383:   if (n) {
10384:     let html = `📦 Este paquete incluye ${n} sesiones.`;
10385:     if (nombre && allData && allData.citas) {
10386:       const hechas = allData.citas.filter(c =>
10387:         (c.nombre||'').toLowerCase().trim() === nombre &&
10388:         c.servicio === serv && c.estado !== 'Cancelada'
10389:       ).length;
10390:       if (hechas > 0) {
10391:         const rest  = Math.max(0, n - hechas);
10392:         const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10393:         html += `<br><span style="color:${color};font-weight:700">📊 ${hechas} realizadas · ${rest} restantes de ${n}</span>`;
```

### Coincidencia 44 — línea 10386

```html
10378:   const serv   = document.getElementById('ncService').value;
10379:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10380:   const el     = document.getElementById('ncSesionesInfo');
10381:   if (!el) return;
10382:   const n = sesionesPorPaquete[serv];
10383:   if (n) {
10384:     let html = `📦 Este paquete incluye ${n} sesiones.`;
10385:     if (nombre && allData && allData.citas) {
10386:       const hechas = allData.citas.filter(c =>
10387:         (c.nombre||'').toLowerCase().trim() === nombre &&
10388:         c.servicio === serv && c.estado !== 'Cancelada'
10389:       ).length;
10390:       if (hechas > 0) {
10391:         const rest  = Math.max(0, n - hechas);
10392:         const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10393:         html += `<br><span style="color:${color};font-weight:700">📊 ${hechas} realizadas · ${rest} restantes de ${n}</span>`;
10394:       }
```

### Coincidencia 45 — línea 10407

```html
10399:     el.style.display = 'none';
10400:   }
10401: }
10402: 
10403: function sesionBadge(nombre, servicio) {
10404:   const n = sesionesPorPaquete[servicio];
10405:   if (!n) return '';
10406:   const norm   = (nombre||'').toLowerCase().trim();
10407:   const hechas = allData.citas.filter(c =>
10408:     (c.nombre||'').toLowerCase().trim() === norm &&
10409:     c.servicio === servicio && c.estado !== 'Cancelada'
10410:   ).length;
10411:   const rest  = Math.max(0, n - hechas);
10412:   const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10413:   return `<br><span style="font-size:.72rem;color:${color};font-weight:700">📊 ${hechas}/${n} sesiones · ${rest} restantes</span>`;
10414: }
10415: 
```

### Coincidencia 46 — línea 10510

```html
10502: }
10503: 
10504: // ── REPORTE CONVENIOS (Finanzas) ──
10505: function renderConveniosReport() {
10506:   const filtroMes = document.getElementById('convenioMesFiltro').value; // 'YYYY-MM' o vacío
10507:   const el = document.getElementById('conveniosReportResult');
10508:   if (!el) return;
10509: 
10510:   const citas = (allData.citas || []).filter(c => {
10511:     if (!c.gimnasio) return false;
10512:     if (filtroMes && !normDate(c.fecha).startsWith(filtroMes)) return false;
10513:     return true;
10514:   });
10515: 
10516:   if (!citas.length) {
10517:     el.innerHTML = '<p style="font-size:.85rem;color:var(--muted);text-align:center;padding:20px 0">No hay citas con convenio' + (filtroMes ? ' en este mes' : '') + '.</p>';
10518:     return;
```

### Coincidencia 47 — línea 10938

```html
10930: }
10931: 
10932: function searchPatient(q) {
10933:   const dd = document.getElementById('pacDropdown');
10934:   if (!q || q.length < 2) { dd.style.display='none'; return; }
10935: 
10936:   // Clave única por persona: nombre_normalizado|teléfono (evita colisiones entre distintos pacientes)
10937:   const map = {};
10938:   (allData.citas || []).filter(c => c.estado !== 'Cancelada').forEach(c => {
10939:     const phone = (c.telefono||'').replace(/\D/g,'').slice(-10);
10940:     const key   = _normStr(c.nombre) + '|' + phone;
10941:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono, email:c.email, sesiones:0, ultimaDir:c.direccion||''};
10942:     if (!esRegistroServ(c.servicio)) map[key].sesiones++;
10943:     if (c.direccion) map[key].ultimaDir = c.direccion;
10944:   });
10945: 
10946:   // Añadir pacientes de la hoja Pacientes que no estén ya en el mapa
```

### Coincidencia 48 — línea 11048

```html
11040: // ── INDICADOR DUPLICADO BASE DE DATOS ──
11041: function checkDupDB() {
11042:   const val  = document.getElementById('dbNombre').value.trim().toLowerCase();
11043:   const warn = document.getElementById('dbDupWarn');
11044:   if (val.length < 3) { warn.style.display = 'none'; return; }
11045: 
11046:   const fuentes = [
11047:     ...(allData.pacientes || []),
11048:     ...allData.citas.filter(c => !esRegistroServ(c.servicio)).map(c => ({nombre: c.nombre}))
11049:   ];
11050:   const seen = new Set();
11051:   const match = fuentes.find(p => {
11052:     const n = (p.nombre || '').toLowerCase().trim();
11053:     if (seen.has(n)) return false;
11054:     seen.add(n);
11055:     return n.includes(val) || val.includes(n);
11056:   });
```

### Coincidencia 49 — línea 11096

```html
11088:     warn.style.background = 'rgba(245,158,11,.12)';
11089:     warn.style.borderColor = 'rgba(245,158,11,.45)';
11090:     warn.style.color = '#92400e';
11091:     warn.innerHTML = '⚠️ Horario fuera de la jornada habitual. Puedes guardarlo como cita manual especial; quedará visible en agenda y reportes.';
11092:     warn.style.display = 'block';
11093:     return;
11094:   }
11095: 
11096:   const conflicts = allData.citas.filter(c =>
11097:     c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) &&
11098:     normDate(c.fecha) === date && c.hora === time
11099:   );
11100: 
11101:   if (conflicts.length) {
11102:     const lista = conflicts.map(c => `<strong>${c.nombre}</strong> (${c.servicio})`).join(', ');
11103:     warn.style.background = 'rgba(239,68,68,.1)';
11104:     warn.style.borderColor = 'rgba(239,68,68,.4)';
```

### Coincidencia 50 — línea 11186

```html
11178:   (allData.pacientes || []).forEach(p => {
11179:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11180:     const email  = (p.email || '').toLowerCase().trim();
11181:     const nombre = (p.nombre || '').trim();
11182:     const key    = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());
11183:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11184:   });
11185: 
11186:   allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
11187:     const phone  = (c.telefono||'').replace(/\D/g,'').slice(-10);
11188:     const email  = (c.email||'').toLowerCase().trim();
11189:     const nombre = (c.nombre||'').trim();
11190:     // Agrupa por: teléfono (10 dígitos) > email > nombre — evita duplicados
11191:     const key = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());
11192: 
11193:     if (!map[key]) map[key] = {nombre, telefono:'', email:'', sesiones:0, ultima:'', ultimoServicio:'', servicios:{}, nombres:[]};
11194:     if (!map[key].nombres.includes(nombre)) map[key].nombres.push(nombre);
```

### Coincidencia 51 — línea 11249

```html
11241:         </div>
11242:       </td>
11243:     </tr>`;
11244:   }).join('');
11245: }
11246: 
11247: function verHistorial(encodedNombre) {
11248:   const nombre = decodeURIComponent(encodedNombre);
11249:   const citas = allData.citas.filter(c => c.nombre === nombre).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11250:   _renderHistorial(nombre, citas);
11251: }
11252: 
11253: function verHistorialPac(idx) {
11254:   const p = _pacs[idx];
11255:   if (!p) return;
11256:   // Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)
11257:   const citas = allData.citas.filter(c => p.nombres.includes(c.nombre)).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
```

### Coincidencia 52 — línea 11257

```html
11249:   const citas = allData.citas.filter(c => c.nombre === nombre).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11250:   _renderHistorial(nombre, citas);
11251: }
11252: 
11253: function verHistorialPac(idx) {
11254:   const p = _pacs[idx];
11255:   if (!p) return;
11256:   // Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)
11257:   const citas = allData.citas.filter(c => p.nombres.includes(c.nombre)).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11258:   _renderHistorial(p.nombre, citas);
11259: }
11260: 
11261: function _renderHistorial(nombre, citas) {
11262:   document.getElementById('modalHistorialTitle').textContent = 'Historial: ' + nombre;
11263:   const ref = citas[0] || {};
11264:   document.getElementById('modalHistorialContent').innerHTML = `
11265:     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
```

### Coincidencia 53 — línea 11283

```html
11275:       </div>
11276:       <div style="font-size:.88rem;margin-top:4px">${esc(c.servicio)} · ${esc(c.modalidad)} · ${esc(c.precio)}</div>
11277:       ${c.notas ? `<div style="font-size:.8rem;color:var(--muted);margin-top:4px">${esc(c.notas)}</div>` : ''}
11278:     </div>`).join('')}`;
11279:   openModal('modalHistorial');
11280: }
11281: 
11282: function exportarHistorialPaciente(nombre) {
11283:   const citas = allData.citas.filter(c => c.nombre === nombre)
11284:     .sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11285:   if (!citas.length) { toast('Sin citas para exportar', 'err'); return; }
11286:   const header = ['Fecha','Hora','Servicio','Modalidad','Valor','Estado','Notas'];
11287:   const rows = citas.map(c => [normDate(c.fecha),c.hora,c.servicio,c.modalidad,c.precio||'',c.estado,c.notas||'']);
11288:   const csv = [header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
11289:   const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
11290:   const a = document.createElement('a');
11291:   a.href = URL.createObjectURL(blob);
```

### Coincidencia 54 — línea 11334

```html
11326:     let totalActualizado = 0;
11327:     for (const oldNombre of oldNombres) {
11328:       const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
11329:       const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
11330:       const d = await r.json();
11331:       if (d.ok) totalActualizado += d.updated || 0;
11332:     }
11333:     // Actualizar en memoria
11334:     allData.citas.forEach(c => {
11335:       if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g,''); c.email = email; }
11336:     });
11337:     toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
11338:     closeModal('modalEditarPaciente');
11339:     renderPacientes();
11340:   } catch(e) { toast('Error de conexión', 'err'); }
11341:   btn.textContent = 'Guardar cambios'; btn.disabled = false;
11342: }
```

### Coincidencia 55 — línea 11353

```html
11345:   const p = _pacs[idx];
11346:   if (!p) return;
11347:   if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
11348:   try {
11349:     // Borrar todos los nombres que usó este paciente
11350:     for (const nombre of p.nombres) {
11351:       await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
11352:     }
11353:     allData.citas = allData.citas.filter(c => !p.nombres.includes(c.nombre));
11354:     toast(`${p.nombre} eliminado/a correctamente`);
11355:     renderPacientes();
11356:     initDashboard();
11357:   } catch(e) { toast('Error de conexión', 'err'); }
11358: }
11359: 
11360: // ── BASE DE DATOS ──
11361: let _dbPacs = [];
```

### Coincidencia 57 — línea 11379

```html
11371:   (allData.pacientes || []).forEach(function(p) {
11372:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11373:     const email  = (p.email || '').toLowerCase().trim();
11374:     const nombre = (p.nombre || '').trim();
11375:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11376:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11377:   });
11378:   // Luego cruzar con citas (actualizan datos si el paciente ya existe)
11379:   (allData.citas || []).forEach(function(c) {
11380:     const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
11381:     const email  = (c.email || '').toLowerCase().trim();
11382:     const nombre = (c.nombre || '').trim();
11383:     const key = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11384:     if (!map[key]) map[key] = {nombre: nombre, telefono: '', email: '', sesiones: 0, ultima: '', ultimoServicio: '', servicios: {}, nombres: []};
11385:     if (map[key].nombres.indexOf(nombre) === -1) map[key].nombres.push(nombre);
11386:     if (phone.length >= 10 && !map[key].telefono) map[key].telefono = phone;
11387:     if (email && !map[key].email) map[key].email = email;
```

### Coincidencia 58 — línea 11442

```html
11434: 
11435:   const dias   = parseInt(document.getElementById('reacDias')?.value || '90', 10);
11436:   const hoy    = today(); // "YYYY-MM-DD"
11437:   const limite = new Date(); limite.setDate(limite.getDate() - dias);
11438:   const limiteStr = limite.toLocalDateStr();
11439: 
11440:   // Agrupar citas por paciente (clave por teléfono o nombre)
11441:   const map = {};
11442:   (allData.citas || []).forEach(c => {
11443:     if (!c.nombre) return;
11444:     const phone = (c.telefono || '').replace(/\D/g, '').slice(-10);
11445:     const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + c.nombre.toLowerCase().trim();
11446:     if (!map[key]) map[key] = { nombre: c.nombre, telefono: phone, ultimaPasada: '', proximaFutura: '' };
11447:     const fd = normDate(c.fecha);
11448:     if (fd && fd <= hoy) {
11449:       if (!map[key].ultimaPasada || fd > map[key].ultimaPasada) map[key].ultimaPasada = fd;
11450:     }
```

### Coincidencia 59 — línea 11605

```html
11597:     try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
11598:     let totalActualizado = 0;
11599:     for (const oldNombre of oldNombres) {
11600:       const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
11601:       const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
11602:       const d = await r.json();
11603:       if (d.ok) totalActualizado += d.updated || 0;
11604:     }
11605:     allData.citas.forEach(c => {
11606:       if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g, ''); c.email = email; }
11607:     });
11608:     const oldLabel = oldNombres.join(' / ');
11609:     logChange('Paciente editado', oldLabel !== newNombre ? `${oldLabel} → ${newNombre}` : `${newNombre} (datos actualizados)`);
11610:     toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
11611:     closeModal('modalEditarPaciente');
11612:     renderBasedatos();
11613:   } catch(e) { toast('Error de conexión', 'err'); }
```

### Coincidencia 60 — línea 11627

```html
11619:   if (!p) return;
11620:   if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
11621:   try {
11622:     for (const nombre of p.nombres) {
11623:       const r = await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
11624:       const d = await r.json();
11625:       if (!d.ok) { toast('Error al eliminar: ' + (d.error || 'intenta de nuevo'), 'err'); return; }
11626:     }
11627:     allData.citas    = allData.citas.filter(c => !p.nombres.includes(c.nombre));
11628:     allData.pacientes = (allData.pacientes || []).filter(p2 => !p.nombres.map(n => n.toLowerCase()).includes((p2.nombre||'').toLowerCase()));
11629:     logChange('Paciente eliminado', `${p.nombre} · ${p.sesiones} cita(s)`);
11630:     toast(`${p.nombre} eliminado/a correctamente`);
11631:     renderBasedatos();
11632:     initDashboard();
11633:   } catch(e) { toast('Error de conexión', 'err'); }
11634: }
11635: 
```

### Coincidencia 62 — línea 11798

```html
11790:   HOURS.forEach(h => {
11791:     html += `<div class="cal-body-row"><div class="cal-time-cell">${pad(h)}:00</div>`;
11792:     days.forEach(d => {
11793:       const ds = toDateStr(d);
11794:       const isT = ds === todayStr;
11795:       html += `<div class="cal-day-cell ${isT?'cal-today':''}" onclick="openNuevaCitaFromCal('${ds}',${h})">`;
11796: 
11797:       // Citas del sistema
11798:       allData.citas.forEach(c => {
11799:         if (c.estado === 'Cancelada') return;
11800:         if (c.servicio === 'Registro') return;
11801:         if (normDate(c.fecha) !== ds) return;
11802:         if (!c.hora) return;
11803:         const [ch] = c.hora.split(':').map(Number);
11804:         if (ch !== h) return;
11805:         const cls = c.estado==='Confirmada'?'cal-ev-ok':c.estado==='Atendida'?'cal-ev-info':c.estado==='Cancelada'?'cal-ev-err':'cal-ev-warn';
11806:         html += `<div class="cal-ev ${cls}" onclick="event.stopPropagation();verDetalle('${c.id}')">
```

### Coincidencia 63 — línea 12124

```html
12116: 
12117:     // Filtrar stop words del interior del nombre
12118:     const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
12119:     const rawName   = nameWords.join(' ');
12120:     if (!rawName) { /* no se capturó nombre válido */ }
12121:     else {
12122:       const normName = _norm(rawName);
12123:       // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
12124:       const known = allData.citas.find(c => {
12125:         const cn = _norm(c.nombre);
12126:         const parts = normName.split(' ');
12127:         // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
12128:         return cn === normName
12129:           || cn.includes(normName)
12130:           || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
12131:           || (parts.length === 1 && cn.startsWith(parts[0]));
12132:       });
```

### Coincidencia 64 — línea 12400

```html
12392:   const lista = document.getElementById('segLista');
12393:   if (!lista) return;
12394:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12395: 
12396:   const now = new Date(); now.setHours(0,0,0,0);
12397: 
12398:   // Mapa: última descarga por paciente
12399:   const map = {};
12400:   allData.citas
12401:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12402:     .forEach(c => {
12403:       const nombre = (c.nombre||'').trim();
12404:       const fecha  = normDate(c.fecha);
12405:       if (!nombre || !fecha) return;
12406:       if (!map[nombre] || fecha > map[nombre].fecha) {
12407:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12408:       }
```

### Coincidencia 65 — línea 12425

```html
12417:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12418:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12419:     else if (dias >= 49)              semana = 'sem5';
12420:     return { ...p, dias, semana };
12421:   }).filter(p => p.semana !== null);
12422: 
12423:   // Mapa: última readaptación por paciente
12424:   const mapR = {};
12425:   allData.citas
12426:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esReadaptacion(c.servicio))
12427:     .forEach(c => {
12428:       const nombre = (c.nombre||'').trim();
12429:       const fecha  = normDate(c.fecha);
12430:       if (!nombre || !fecha) return;
12431:       if (!mapR[nombre] || fecha > mapR[nombre].fecha) {
12432:         mapR[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12433:       }
```

### Coincidencia 66 — línea 12670

```html
12662:   document.getElementById('ncName').value  = decodeURIComponent(encNombre);
12663:   document.getElementById('ncPhone').value = decodeURIComponent(encTel);
12664:   document.getElementById('ncEmail').value = decodeURIComponent(encEmail);
12665:   document.getElementById('pacSearch').value = decodeURIComponent(encNombre);
12666:   toast('Datos cargados. Completa fecha, hora y servicio.');
12667: }
12668: 
12669: async function limpiarCitasSinHora() {
12670:   const sinHora = (allData.citas || []).filter(c => (!c.hora || isMidnightTime(c.hora)) && c.estado !== 'Cancelada');
12671:   if (sinHora.length === 0) { toast('No hay citas a medianoche/sin hora — todo está limpio ✓', 'ok'); return; }
12672:   const detalle = sinHora.map(c => `• ${c.nombre} — ${c.servicio} — ${c.fecha} — hora: ${c.hora || 'sin hora'} — estado: ${c.estado}`).join('\n');
12673:   if (!confirm(`Se encontraron ${sinHora.length} cita(s) guardadas entre 00:00 y 00:59 o sin hora:\n\n${detalle}\n\nEsto elimina esas filas de la base de datos. ¿Continuar?`)) return;
12674:   const btn = document.getElementById('btnLimpiarSinHora');
12675:   btn.textContent = 'Limpiando...'; btn.disabled = true;
12676:   try {
12677:     const r = await fetch(`${APPS_SCRIPT_URL}?action=cleanCitasSinHora&token=${encodeURIComponent(TOKEN)}`);
12678:     const d = await r.json();
```

### Coincidencia 67 — línea 12908

```html
12900: 
12901:   btn.disabled = true;
12902:   btn.textContent = 'Limpiando...';
12903:   let eliminadas = 0, errores = 0;
12904:   for (const dup of dups) {
12905:     try {
12906:       const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(dup.id)}`).then(x => x.json());
12907:       if (r.ok) {
12908:         const cita = allData.citas.find(c => c.id === dup.id);
12909:         if (cita) cita.estado = 'Cancelada';
12910:         eliminadas++;
12911:       } else errores++;
12912:     } catch(e) { errores++; }
12913:   }
12914:   btn.disabled = false;
12915:   btn.textContent = 'Limpiar duplicados';
12916:   toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
```

### Coincidencia 68 — línea 12922

```html
12914:   btn.disabled = false;
12915:   btn.textContent = 'Limpiar duplicados';
12916:   toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
12917:   if (eliminadas > 0) { initDashboard(); renderFinanzas(); }
12918: }
12919: 
12920: function detectarDuplicados() {
12921:   const grupos = {};
12922:   for (const c of allData.citas) {
12923:     if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) continue;
12924:     const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
12925:     if (!grupos[key]) grupos[key] = [];
12926:     grupos[key].push(c);
12927:   }
12928:   const dups = [];
12929:   for (const key in grupos) {
12930:     const arr = grupos[key];
```

### Coincidencia 69 — línea 13045

```html
13037:           <div class="serv-val">$${Math.round(v/1000)}k</div>
13038:         </div>`).join('');
13039:     }
13040:   }
13041: 
13042:   // ── Resumen del mes ──
13043:   const todayStr2    = today();
13044:   const citasMes     = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
13045:   const canceladasN  = allData.citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && c.estado==='Cancelada' && !esRegistroServ(c.servicio); }).length;
13046:   const pasadasN     = citasMes.filter(c => normDate(c.fecha) <= todayStr2).length;
13047:   const futurasN     = citasMes.filter(c => normDate(c.fecha) > todayStr2).length;
13048:   const eventosValFuturas = (allData.eventos || [])
13049:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && normDate(e.fecha) > todayStr2; })
13050:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
13051:   const futurasVal   = citasMes.filter(c => normDate(c.fecha) > todayStr2).reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosValFuturas;
13052:   const ingresoPaquetesMes = calcIngresoPaquetesMes(m, y);
13053:   const ticketProm   = pasadasN > 0 ? Math.round(cobradoMes / pasadasN) : 0;
```

### Coincidencia 70 — línea 13384

```html
13376: 
13377: function calcBDActualizada(mesParam, anyoParam) {
13378:   const now = new Date();
13379:   const m = mesParam  || now.getMonth() + 1;
13380:   const y = anyoParam || now.getFullYear();
13381: 
13382:   // Pacientes únicos atendidos este mes (no cancelados)
13383:   const pacMap = {};
13384:   (allData.citas || []).filter(c => {
13385:     const [cy,cm] = normDate(c.fecha).split('-');
13386:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13387:   }).forEach(c => {
13388:     const key = (c.nombre||'').trim().toLowerCase();
13389:     if (!key) return;
13390:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13391:     if (c.telefono) pacMap[key].telefono = c.telefono;
13392:     if (c.email)    pacMap[key].email    = c.email;
```

### Coincidencia 71 — línea 13705

```html
13697:     const canal = c.canal || 'Directo';
13698:     canalMap[canal] = (canalMap[canal] || 0) + parsePrecio(c.precio);
13699:   });
13700:   const totalCanales = Object.values(canalMap).reduce((s,v) => s+v, 0);
13701:   const canalTop = Object.entries(canalMap).sort((a,b) => b[1]-a[1])[0];
13702:   const canalTopTxt = canalTop ? `${canalTop[0]}: ${fmtPeso(canalTop[1])}` : 'Sin datos';
13703: 
13704:   // ───── KPI: Tasa de cancelación (mes actual) ─────
13705:   // IMPORTANTE: usa allData.citas (no citasReales) para contar canceladas reales
13706:   // Las marcadas como "Prueba" se excluyen de la tasa de cancelación
13707:   const _motivosMes = getCancelMotivos();
13708:   const todasCitasMes = (allData.citas || []).filter(c => {
13709:     const [cy,cm] = normDate(c.fecha).split('-');
13710:     return +cm===m && +cy===y;
13711:   });
13712:   const canceladasMes = todasCitasMes.filter(c =>
13713:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosMes[c.id])
```

### Coincidencia 72 — línea 13708

```html
13700:   const totalCanales = Object.values(canalMap).reduce((s,v) => s+v, 0);
13701:   const canalTop = Object.entries(canalMap).sort((a,b) => b[1]-a[1])[0];
13702:   const canalTopTxt = canalTop ? `${canalTop[0]}: ${fmtPeso(canalTop[1])}` : 'Sin datos';
13703: 
13704:   // ───── KPI: Tasa de cancelación (mes actual) ─────
13705:   // IMPORTANTE: usa allData.citas (no citasReales) para contar canceladas reales
13706:   // Las marcadas como "Prueba" se excluyen de la tasa de cancelación
13707:   const _motivosMes = getCancelMotivos();
13708:   const todasCitasMes = (allData.citas || []).filter(c => {
13709:     const [cy,cm] = normDate(c.fecha).split('-');
13710:     return +cm===m && +cy===y;
13711:   });
13712:   const canceladasMes = todasCitasMes.filter(c =>
13713:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosMes[c.id])
13714:   ).length;
13715:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
13716: 
```

### Coincidencia 73 — línea 13725

```html
13717:   // ───── KPI: CAC (Costo de Adquisición de Cliente) ─────
13718:   const hoyKPI = new Date();
13719:   const ventanaAtras = new Date(hoyKPI); ventanaAtras.setDate(hoyKPI.getDate() - VENTANA_NUEVO_DIAS);
13720:   const pacientesMes = new Set();
13721:   citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
13722:     .forEach(c => { if (c.nombre) pacientesMes.add(c.nombre.trim().toLowerCase()); });
13723:   let nuevosCount = 0;
13724:   pacientesMes.forEach(pac => {
13725:     const citasPrevias = allData.citas.filter(c => {
13726:       if (!c.nombre || c.nombre.trim().toLowerCase() !== pac) return false;
13727:       const f = new Date(normDate(c.fecha) + 'T12:00:00');
13728:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
13729:     });
13730:     if (citasPrevias.length === 0) nuevosCount++;
13731:   });
13732:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
13733:   const egresosMktMes = getEgresos().filter(e => {
```

### Coincidencia 74 — línea 13834

```html
13826:     .slice(0, limit)
13827:     .map(([k,v]) => `${k}: ${v}`)
13828:     .join('\n') || 'Sin datos registrados';
13829: }
13830: 
13831: function _copyGestionData() {
13832:   const now = new Date();
13833:   const monthKey = _copyGestionMesKey(now);
13834:   const citasAll = allData.citas || [];
13835:   const eventosAll = allData.eventos || [];
13836:   const pacientesAll = allData.pacientes || [];
13837:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13838:   const manual = getKPIManual ? getKPIManual() : {};
13839:   const cfg = getKPIConfig ? getKPIConfig() : {};
13840:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13841:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13842:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
```

### Coincidencia 75 — línea 14167

```html
14159:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14160:   return _copyPlainText(text);
14161: }
14162: 
14163: function copiarInfoPersonaGestion() {
14164:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14165:   if (!nombre) return;
14166:   const key = nombre.trim().toLowerCase();
14167:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14168:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14169:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14170:   const c0 = citas[0];
14171:   const total = citas.length;
14172:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14173:   const text = [
14174:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14175:     '',
```

### Coincidencia 76 — línea 14346

```html
14338:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14339:   const nomMes = MESES[m - 1];
14340: 
14341:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14342:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14343: 
14344:   const citas  = citasReales();
14345:   const manual = getKPIManual();
14346:   const todasCitas = allData.citas || [];
14347:   const eventosAll = allData.eventos || [];
14348: 
14349:   // ══════════ CÁLCULOS ══════════
14350: 
14351:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
14352:   const metaSesionesMes = META_SESIONES_SEMANA * 4;
14353: 
14354:   // ── Citas del mes ──
```

### Coincidencia 77 — línea 15059

```html
15051:   const m     = now.getMonth() + 1;
15052:   const y     = now.getFullYear();
15053:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15054:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15055:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15056:   const sep  = n => '─'.repeat(n);
15057: 
15058:   const citas      = citasReales();
15059:   const todasCitas = allData.citas || [];
15060:   const eventosAll = allData.eventos || [];
15061:   const manual     = getKPIManual();
15062:   const costos     = getCostosEstructura();
15063:   const calc       = calcTotalCostos(costos);
15064: 
15065:   // ── Sesiones ──
15066:   const citasMes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado!=='No asistió'; });
15067:   const eventosMes = eventosAll.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m&&+cy===y; });
```

### Coincidencia 78 — línea 15616

```html
15608:   const _pacUnicosMes = {};
15609:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15610:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15611:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15612:   const _stRecurrentes = _listaRecurrentes.length;
15613: 
15614:   // Extra — Cancelaciones mes (excluye pruebas)
15615:   const _motivosGuia  = getCancelMotivos();
15616:   const todasCitasMes = (allData.citas || []).filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
15617:   const canceladasMes = todasCitasMes.filter(c =>
15618:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15619:   ).length;
15620:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15621: 
15622:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15623:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15624:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
```

### Coincidencia 79 — línea 15841

```html
15833:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15834:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15835:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15836:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15837: 
15838:   const motivos = getCancelMotivos();
15839: 
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15846:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
15847: 
15848:   const cancelSem = (allData.citas || []).filter(c => {
15849:     const f = normDate(c.fecha);
```

### Coincidencia 80 — línea 15848

```html
15840:   // Excluir pruebas del análisis real
15841:   const cancelMesAll = (allData.citas || []).filter(c => {
15842:     const [cy,cm] = normDate(c.fecha).split('-');
15843:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15844:   });
15845:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15846:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
15847: 
15848:   const cancelSem = (allData.citas || []).filter(c => {
15849:     const f = normDate(c.fecha);
15850:     return f >= toStr(lunesSem) && f <= toStr(domingoSem)
15851:       && (c.estado||'').toLowerCase().includes('cancel')
15852:       && !esCancelExcluida(motivos[c.id]);
15853:   });
15854: 
15855:   // Breakdown por servicio y día (solo cancelaciones reales)
15856:   const srvMap = {}, diaMap = {}, motivoMap = {};
```

### Coincidencia 81 — línea 15869

```html
15861:     diaMap[DIAS[d.getDay()]] = (diaMap[DIAS[d.getDay()]]||0) + 1;
15862:     const mot = motivos[c.id] || 'Sin registrar';
15863:     motivoMap[mot] = (motivoMap[mot]||0) + 1;
15864:   });
15865: 
15866:   const topServ  = Object.entries(srvMap).sort((a,b)=>b[1]-a[1]);
15867:   const topDia   = Object.entries(diaMap).sort((a,b)=>b[1]-a[1]);
15868:   const topMotiv = Object.entries(motivoMap).sort((a,b)=>b[1]-a[1]);
15869:   const total    = (allData.citas||[]).filter(c=>{ const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15870:   const pct      = total > 0 ? Math.round((cancelMes.length/total)*100) : 0;
15871:   const color    = pct < 10 ? 'var(--ok)' : pct <= 20 ? '#f59e0b' : '#ef4444';
15872: 
15873:   if (!cancelMesAll.length) {
15874:     el.innerHTML = `<div style="font-size:.8rem;color:var(--ok)">🟢 Sin cancelaciones registradas este mes.</div>`;
15875:     return;
15876:   }
15877: 
```

### Coincidencia 82 — línea 16794

```html
16786:   const meses4 = [];
16787:   for (let i = 3; i >= 0; i--) {
16788:     const d = new Date(now2.getFullYear(), now2.getMonth()-i, 1);
16789:     meses4.push({ m: d.getMonth()+1, y: d.getFullYear(), label: MESES[d.getMonth()] });
16790:   }
16791:   const cancelEl = document.getElementById('metricCancelacion');
16792:   if (cancelEl) {
16793:     const rows = meses4.map(mes => {
16794:       const todasMes = allData.citas.filter(c => {
16795:         const [cy,cm] = normDate(c.fecha).split('-');
16796:         return +cm===mes.m && +cy===mes.y && !esRegistroServ(c.servicio);
16797:       });
16798:       const canceladas = todasMes.filter(c => c.estado === 'Cancelada').length;
16799:       const total = todasMes.length || 1;
16800:       const pct = Math.round(canceladas / total * 100);
16801:       const color = pct >= 30 ? '#ef4444' : pct >= 15 ? '#f59e0b' : 'var(--ok)';
16802:       return `<div class="metric-row">
```

### Coincidencia 83 — línea 17072

```html
17064:   renderConveniosReport();
17065:   _checkAutoAtendida();
17066:   _checkCobrosPendientes();
17067: }
17068: 
17069: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17070: function _checkAutoAtendida() {
17071:   const nowMs = Date.now();
17072:   const pendientes = (allData.citas || []).filter(c => {
17073:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17074:     if (esRegistroServ(c.servicio)) return false;
17075:     const f = normDate(c.fecha);
17076:     if (!f || !c.hora) return false;
17077:     const [hh, mm] = c.hora.split(':').map(Number);
17078:     const citaEnd = new Date(f + 'T' + c.hora);
17079:     citaEnd.setMinutes(citaEnd.getMinutes() + 60);
17080:     return citaEnd.getTime() < nowMs;
```

### Coincidencia 84 — línea 17137

```html
17129:     </div>`;
17130:   }).join('');
17131: }
17132: 
17133: function openPago(citaId) {
17134:   showView('pagos');
17135:   setTimeout(() => {
17136:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17137:     const selector = document.getElementById('payCitaId');
17138:     if (selector) {
17139:       selector.value = citaId || '';
17140:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17141:       selector.focus();
17142:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17143:     } else {
17144:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17145:     }
```

### Coincidencia 85 — línea 17679

```html
17671:   const recs      = [];
17672: 
17673:   const DIAS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
17674:   const toStr = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
17675: 
17676:   // ── Histórico: últimas 12 semanas (excluye la semana seleccionada) ──
17677:   const lunD = lunes instanceof Date ? lunes : new Date((lunes||today())+'T12:00:00');
17678:   const lunesHace12 = new Date(lunD); lunesHace12.setDate(lunD.getDate()-84);
17679:   const histCitas = (allData.citas||[]).filter(c => {
17680:     const f = normDate(c.fecha); if (!f) return false;
17681:     const fD = new Date(f+'T12:00:00');
17682:     return fD < lunD && fD >= lunesHace12;
17683:   });
17684: 
17685:   // Promedio por día de semana (dow 0=Dom … 6=Sáb)
17686:   const histDow = {};
17687:   histCitas.forEach(c => {
```

### Coincidencia 86 — línea 17917

```html
17909:   if (s.includes('valoracion'))   return { tipo:'valoracion',   diasDelay:1, label:'Valoración funcional' };
17910:   if (s.includes('readaptacion')) return { tipo:'readaptacion', diasDelay:1, label:'Readaptación funcional' };
17911:   return null;
17912: }
17913: function generarTareas() {
17914:   const hoyStr = today();
17915:   const hoy = new Date(hoyStr+'T12:00:00');
17916:   const tareas = [], seen = new Set();
17917:   allData.citas.forEach(c => {
17918:     if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return;
17919:     const ft = _tareaFechaTipo(c);
17920:     if (!ft) return;
17921:     const fSesion = normDate(c.fecha);
17922:     if (!fSesion) return;
17923:     if (fSesion < ADMIN_OPERATIONS_START_DATE) return;
17924:     const diasDiff = Math.round((hoy - new Date(fSesion+'T12:00:00')) / 86400000);
17925:     if (diasDiff < ft.diasDelay) return;
```

### Coincidencia 87 — línea 18140

```html
18132:   }).join('');
18133: }
18134: function abrirModalPaquete(plIdxPre) {
18135:   const plantillas = _getPkPlantillas();
18136:   const sel = document.getElementById('pkPlantillaSel');
18137:   if (sel) sel.innerHTML = '<option value="">— Elige plantilla —</option>' + plantillas.map((pl,i) => `<option value="${i}" ${i===plIdxPre?'selected':''}>${pl.nombre}</option>`).join('');
18138:   const dl = document.getElementById('pkPacienteList');
18139:   if (dl) {
18140:     const nomCitas = allData.citas.map(c=>c.nombre||'').filter(Boolean);
18141:     const nomPacs  = (allData.pacientes||[]).map(p=>p.nombre||'').filter(Boolean);
18142:     const todos    = [...new Set([...nomCitas, ...nomPacs])].sort();
18143:     dl.innerHTML   = todos.map(n=>`<option value="${n}">`).join('');
18144:   }
18145:   const fi = document.getElementById('pkFechaCompra'); if (fi) fi.value = today();
18146:   const pkModal = document.getElementById('modalPaquete'); if (pkModal) pkModal.style.display = 'flex';
18147: }
18148: function guardarPaqueteAsignado() {
```

### Coincidencia 88 — línea 18594

```html
18586: // ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
18587: const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
18588: let _pasTelefono = '';
18589: let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
18590: let _pasCurrent = null;
18591: 
18592: function _pasGetDB() {
18593:   const map = {};
18594:   allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
18595:     const key = (c.nombre || '').toLowerCase().trim();
18596:     if (key && !map[key]) map[key] = { nombre: c.nombre, telefono: c.telefono || '' };
18597:   });
18598:   (allData.pacientes || []).forEach(p => {
18599:     const key = (p.nombre || '').toLowerCase().trim();
18600:     if (key && !map[key]) map[key] = { nombre: p.nombre, telefono: p.telefono || '' };
18601:   });
18602:   return map;
```

### Coincidencia 89 — línea 20096

```html
20088:   if (!panel) return;
20089: 
20090:   const now   = new Date();
20091:   const mes   = now.getMonth();
20092:   const anio  = now.getFullYear();
20093:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20094:   const mesStr = MESES[mes];
20095: 
20096:   const citas = (allData.citas || []).filter(c => {
20097:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20098:     const [y, m] = c.fecha.split('-');
20099:     return +y === anio && +m === (mes + 1);
20100:   });
20101: 
20102:   const vistos = {};
20103:   const pacientes = [];
20104:   citas.forEach(c => {
```
