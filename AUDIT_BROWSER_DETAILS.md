# Detalle de fallos funcionales encontrados por Chrome

Archivo: `index.html`

## Función renderMetricas

Comienza en línea 16649.

```javascript
function renderMetricas() {
  const now = new Date();
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

Comienza en línea 7799.

```javascript
function showView(v) {
  const viewAliases = { citas: 'agenda' };
  v = viewAliases[v] || v;
  ['dashboard','acciones','espera','automatizaciones','tareas','tareasConfig','agenda','nueva','calendario','bloquear','pacientes','equipo','basedatos','codigos','paquetes','recordatorios','finanzas','pagos','guiakpis','presupuesto','seguimiento','mensajes','empresas','pasaporte','comisiones','guioneswa','recuperacion'].forEach(id => {
    const sec = document.getElementById('v' + id.charAt(0).toUpperCase() + id.slice(1));
    const sb  = document.getElementById('sb-' + id);
    if (sec) sec.style.display = 'none';
    if (sb)  sb.classList.remove('active');
  });
  const _sec = document.getElementById('v' + v.charAt(0).toUpperCase() + v.slice(1));
  if (!_sec) {
    console.warn('Vista no encontrada:', v);
    return false;
  }
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

Comienza en línea 17139.

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

Comienza en línea 6839.

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

### Coincidencia 1 — línea 4575

```html
4561:             <div class="em-card-hdr" onclick="toggleEmCard('mixfull')">
4562:               <div class="em-dot gris" id="emDot_mixfull"></div>
4563:               <span class="em-card-title">Mix Full &gt;40%</span>
4564:               <span class="em-sev u">🟠 Urgente</span>
4565:               <span class="em-card-time">⏱ 20 min</span>
4566:               <span class="em-carr">▼</span>
4567:             </div>
4568:             <div class="em-card-body" id="emBody_mixfull">
4569:               <div class="em-symptom">💡 <strong>Pérdida silenciosa de margen.</strong> Full rinde ~$73k/h vs ~$90k/h de Express. Cada 10% de exceso en Full equivale a dejar entre $70k y $100k/semana sobre la mesa. El problema suele estar en cómo la auxiliar presenta las opciones al paciente — no en el paciente mismo.</div>
4570:               <div class="em-prog-meta" id="emPM_mixfull">0 de 5 pasos completados</div>
4571:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_mixfull" style="width:0%"></div></div>
4572:               <div class="em-steps">
4573:                 <label class="em-step" id="emS_mixfull_0" onclick="handleEmStep(event,'mixfull',0)"><input type="checkbox" id="emCk_mixfull_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Ver el breakdown actual:</strong> ¿qué porcentaje exacto son Full esta semana? ¿Es un problema puntual o viene subiendo varios meses?</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 2 →</button></label>
4574:                 <label class="em-step" id="emS_mixfull_1" onclick="handleEmStep(event,'mixfull',1)"><input type="checkbox" id="emCk_mixfull_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reunión con auxiliar — cambiar el guión de agendamiento:</strong> la regla es ofrecer Express por defecto. Guión exacto: <em>"La Descarga Express cubre cuello, espalda o piernas en 50 min — ¿cuál zona necesitas trabajar?"</em>. Full solo si el paciente lo pide explícitamente o hay justificación clínica de Jessica.</span></label>
4575:                 <label class="em-step" id="emS_mixfull_2" onclick="handleEmStep(event,'mixfull',2)"><input type="checkbox" id="emCk_mixfull_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Revisar citas Full activas:</strong> ¿hay pacientes en plan Full que podrían migrar a Express + Readaptación sin afectar su evolución clínica? Coordinar con Jessica antes de cambiar.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ver citas →</button></label>
4576:                 <label class="em-step" id="emS_mixfull_3" onclick="handleEmStep(event,'mixfull',3)"><input type="checkbox" id="emCk_mixfull_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Empujar Readaptación en contenido:</strong> publicar esta semana un reel o historia explicando qué es la Readaptación Funcional y para quién es — es el servicio más ignorado y el de mejor margen por hora para sesiones largas.</span></label>
4577:                 <label class="em-step" id="emS_mixfull_4" onclick="handleEmStep(event,'mixfull',4)"><input type="checkbox" id="emCk_mixfull_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Seguimiento la próxima semana:</strong> revisar si el mix bajó. Si en 2 semanas sigue >35%, el problema es estructural — revisar si los paquetes activos tienen demasiado peso en Full.</span></label>
4578:               </div>
4579:               <div class="em-card-footer">
4580:                 <button class="em-done-btn" id="emDB_mixfull" onclick="markEmDone('mixfull',5)">✓ Plan ejecutado</button>
4581:                 <button class="em-reset-btn" onclick="resetEmSteps('mixfull',5)">↺ Reiniciar</button>
4582:               </div>
4583:             </div>
4584:           </div>
4585: 
4586:           <!-- KPI: Cancelaciones -->
4587:           <div class="em-card" id="emCard_cancel">
4588:             <div class="em-card-hdr" onclick="toggleEmCard('cancel')">
4589:               <div class="em-dot gris" id="emDot_cancel"></div>
```

### Coincidencia 2 — línea 4605

```html
4591:               <span class="em-sev u">🟠 Urgente</span>
4592:               <span class="em-card-time">⏱ 30 min</span>
4593:               <span class="em-carr">▼</span>
4594:             </div>
4595:             <div class="em-card-body" id="emBody_cancel">
4596:               <div class="em-symptom">💡 <strong>Patrón de cancelación.</strong> Cada cancelación es ingreso y tiempo perdido. Más del 20% indica un problema sistemático, no casos aislados. Los 3 culpables más comunes: (1) no hay recordatorio 24h antes, (2) un día o servicio específico concentra todo, (3) pacientes nuevos que nunca tuvieron intención real de asistir.</div>
4597:               <div class="em-prog-meta" id="emPM_cancel">0 de 6 pasos completados</div>
4598:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_cancel" style="width:0%"></div></div>
4599:               <div class="em-steps">
4600:                 <label class="em-step" id="emS_cancel_0" onclick="handleEmStep(event,'cancel',0)"><input type="checkbox" id="emCk_cancel_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Abrir KPI 4B y hacer el diagnóstico completo:</strong> ¿qué servicio cancela más? ¿Qué día de la semana? ¿Son pacientes nuevos o recurrentes? La respuesta a estas 3 preguntas determina todo lo siguiente.</span><button class="em-goto" onclick="event.stopPropagation();showView('guiakpis')">Ver KPI 4B →</button></label>
4601:                 <label class="em-step" id="emS_cancel_1" onclick="handleEmStep(event,'cancel',1)"><input type="checkbox" id="emCk_cancel_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Reforzar el recordatorio 24h antes:</strong> si no se está enviando confirmación por WhatsApp el día anterior, implementarlo desde hoy. Guión: <em>"Hola [nombre]! Te confirmo tu cita mañana 📋 [servicio] · [hora] · [modalidad]. Respóndeme: ✅ 1 — Sí confirmo · ❌ 2 — Necesito cancelar."</em></span></label>
4602:                 <label class="em-step" id="emS_cancel_2" onclick="handleEmStep(event,'cancel',2)"><input type="checkbox" id="emCk_cancel_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Si hay un día con muchas cancelaciones:</strong> agregar un segundo recordatorio 2 horas antes de la cita ese día específico. Los lunes y viernes suelen concentrar más cancelaciones por reuniones de trabajo o planes del fin de semana.</span></label>
4603:                 <label class="em-step" id="emS_cancel_3" onclick="handleEmStep(event,'cancel',3)"><input type="checkbox" id="emCk_cancel_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Si hay un servicio con muchas cancelaciones:</strong> revisar si el precio, la duración o la expectativa del paciente no están alineados. Por ejemplo, si Full cancela mucho, puede ser que 90 min sea demasiado tiempo para agendar con anticipación.</span></label>
4604:                 <label class="em-step" id="emS_cancel_4" onclick="handleEmStep(event,'cancel',4)"><input type="checkbox" id="emCk_cancel_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Ofrecer reagendamiento inmediato:</strong> cuando un paciente cancela, el mensaje de respuesta debe siempre terminar con una fecha alternativa. Nunca dejar el chat abierto sin proponer otra opción: <em>"¡Sin problema! ¿Te queda bien el [día X] a las [hora Y]?"</em></span></label>
4605:                 <label class="em-step" id="emS_cancel_5" onclick="handleEmStep(event,'cancel',5)"><input type="checkbox" id="emCk_cancel_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Registrar el motivo de cada cancelación:</strong> en el campo "Nota Admin" de la cita — sin este dato el patrón es invisible. En 2 semanas los datos mostrarán si es un problema de horario, precio, salud o simplemente leads mal calificados.</span><button class="em-goto" onclick="event.stopPropagation();showView('citas')">Ir a citas →</button></label>
4606:               </div>
4607:               <div class="em-card-footer">
4608:                 <button class="em-done-btn" id="emDB_cancel" onclick="markEmDone('cancel',6)">✓ Plan ejecutado</button>
4609:                 <button class="em-reset-btn" onclick="resetEmSteps('cancel',6)">↺ Reiniciar</button>
4610:               </div>
4611:             </div>
4612:           </div>
4613: 
4614:         </div>
4615:       </div>
4616: 
4617:       <!-- ══ DIMENSIÓN 2: Comercial ══ -->
4618:       <div class="em-dim" id="emDim_2">
4619:         <div class="em-dim-hdr d2" onclick="toggleEmDim(2)">
```

## Contenedores de vistas

No se encontraron coincidencias.

## Política Content-Security-Policy

### Coincidencia 1 — línea 7

```html
2: <html lang="es">
3: <head>
4: <meta charset="UTF-8">
5: <meta name="viewport" content="width=device-width,initial-scale=1">
6: <meta name="robots" content="noindex,nofollow,noarchive">
7: <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://script.google.com https://script.googleusercontent.com https://places.googleapis.com;">
8: <script>
9: (function(){
10:   var publicHosts = ['cuidandotefisioterapia.com', 'www.cuidandotefisioterapia.com'];
11:   if (publicHosts.indexOf(location.hostname) !== -1) {
12:     location.replace('/');
```

## Carga de librerías QR

### Coincidencia 1 — línea 1560

```html
1548:   .auto-grid{grid-template-columns:1fr}
1549:   .auto-panels{grid-template-columns:1fr!important}
1550: }
1551: @media(max-width:420px){
1552:   .stats-grid,.stats-grid[style]{grid-template-columns:1fr!important}
1553:   .mob-nav-btn{padding:5px 4px;min-width:44px;font-size:.58rem}
1554: }
1555: @media(prefers-reduced-motion:reduce){
1556:   *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;
1557:     animation-iteration-count:1!important;transition-duration:.01ms!important}
1558: }
1559: </style>
1560: <script src="vendor/qrcode.min.js"></script>
1561: </head>
1562: <body>
1563: 
1564: <!-- ── TOAST ── -->
1565: <div id="toast"></div>
1566: 
1567: <!-- ── MODAL COPIAR MENSAJE WA (desktop) ── -->
1568: <div id="waCopyModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:16px" onclick="if(event.target===this)cerrarWaCopyModal()">
1569:   <div style="background:var(--s1,#fff);border-radius:16px;max-width:480px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.22);overflow:hidden">
1570:     <div style="background:#25D366;padding:14px 18px;display:flex;align-items:center;gap:10px">
1571:       <span style="font-size:1.3rem">💬</span>
1572:       <span style="color:#fff;font-weight:700;font-size:1rem">Enviar por WhatsApp</span>
```

### Coincidencia 2 — línea 18722

```html
18710:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18711:     canvas.insertAdjacentElement('afterend', box);
18712:   }
18713:   box.innerHTML = '';
18714:   canvas.style.display = 'none';
18715:   if (typeof QRCode !== 'undefined') {
18716:     if (QRCode.toCanvas) {
18717:       canvas.style.display = 'block';
18718:       box.style.display = 'none';
18719:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18720:     } else {
18721:       box.style.display = 'grid';
18722:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18723:     }
18724:   } else {
18725:     box.textContent = 'QR no disponible';
18726:     box.style.fontSize = '11px';
18727:     box.style.color = 'var(--muted)';
18728:   }
18729: }
18730: 
18731: function abrirPasaporte() {
18732:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18733:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18734:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
```

## Uso de la variable now dentro de métricas

### Coincidencia 1 — línea 7250

```html
7245: // ── LOGIN ──
7246: let _loginAttempts = 0;
7247: let _loginLockedUntil = 0;
7248: 
7249: async function doLogin() {
7250:   const ahora = Date.now();
7251:   if (_loginLockedUntil > ahora) {
7252:     const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
7253:     const errEl = document.getElementById('loginErr');
7254:     errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
7255:     errEl.style.display = 'block';
```

### Coincidencia 2 — línea 7272

```html
7267:     }, 45000);
7268:     if (d.ok) {
7269:       _loginAttempts = 0;
7270:       TOKEN = d.sessionToken;
7271:       sessionStorage.setItem('adminToken', d.sessionToken);
7272:       _loginTime = Date.now();
7273:       document.getElementById('loginScreen').style.display = 'none';
7274:       document.getElementById('adminApp').style.display   = 'block';
7275:       allData = d;
7276:       await loadAdminKV();
7277:       await loadTeamData();
```

### Coincidencia 3 — línea 7286

```html
7281:       await _runUrlRepairIfRequested();
7282:     } else {
7283:       _loginAttempts++;
7284:       const errEl = document.getElementById('loginErr');
7285:       if (_loginAttempts >= 5) {
7286:         _loginLockedUntil = Date.now() + 120000;
7287:         _loginAttempts = 0;
7288:         errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
7289:       } else {
7290:         const restantes = 5 - _loginAttempts;
7291:         errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
```

### Coincidencia 4 — línea 7308

```html
7303:   sessionStorage.removeItem('adminToken');
7304:   location.reload();
7305: }
7306: 
7307: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7308: let _lastActivity = Date.now();
7309: const _INACTIVITY_MS = 30 * 60 * 1000;
7310: 
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
```

### Coincidencia 5 — línea 7311

```html
7306: 
7307: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
7308: let _lastActivity = Date.now();
7309: const _INACTIVITY_MS = 30 * 60 * 1000;
7310: 
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
7314: );
7315: setInterval(() => {
7316:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
```

### Coincidencia 6 — línea 7316

```html
7311: function _resetActivity() { _lastActivity = Date.now(); }
7312: ['click','keydown','scroll','touchstart'].forEach(ev =>
7313:   document.addEventListener(ev, _resetActivity, {passive: true})
7314: );
7315: setInterval(() => {
7316:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7317:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7318:     setTimeout(logout, 1500);
7319:   }
7320: }, 60_000);
7321: 
```

### Coincidencia 7 — línea 7350

```html
7345:     const btn = document.getElementById('loginBtn');
7346:     try {
7347:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7348:       const d = await r.json();
7349:       if (d.ok) {
7350:         _loginTime = Date.now();
7351:         document.getElementById('loginScreen').style.display = 'none';
7352:         document.getElementById('adminApp').style.display   = 'block';
7353:         allData = d;
7354:         await loadAdminKV();
7355:         await loadTeamData();
```

### Coincidencia 8 — línea 7397

```html
7392:   }
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
```

### Coincidencia 9 — línea 7398

```html
7393: }
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
```

### Coincidencia 10 — línea 7399

```html
7394: 
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
```

### Coincidencia 11 — línea 7400

```html
7395: // ── PERFIL DEL ADMIN ──
7396: function updateProfileCard() {
7397:   const now = new Date();
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
```

### Coincidencia 13 — línea 7403

```html
7398:   const wd  = now.getDay();
7399:   const todayDay = now.getDate();
7400:   const m = now.getMonth() + 1, y = now.getFullYear();
7401: 
7402:   // Semana actual (lun–dom)
7403:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1)); startW.setHours(0,0,0,0);
7404:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
7405: 
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
```

### Coincidencia 15 — línea 7411

```html
7406:   // Semana anterior (7 días antes)
7407:   const startPW = new Date(startW); startPW.setDate(startW.getDate() - 7);
7408:   const endPW   = new Date(startPW); endPW.setDate(startPW.getDate() + 6); endPW.setHours(23,59,59,999);
7409: 
7410:   // Mes anterior
7411:   const prevMDate = new Date(y, now.getMonth() - 1, 1);
7412:   const pm = prevMDate.getMonth() + 1, py = prevMDate.getFullYear();
7413: 
7414:   const citas = citasReales();
7415: 
7416:   const semana = citas.filter(c => {
```

### Coincidencia 16 — línea 7457

```html
7452:   setDelta(document.getElementById('sbDeltaSemana'), semana, semanaPrev);
7453:   setDelta(document.getElementById('sbDeltaMes'), mes, mesPrev);
7454: 
7455:   // Tiempo de sesión activa
7456:   if (_loginTime) {
7457:     const mins = Math.round((Date.now() - _loginTime) / 60000);
7458:     const h = Math.floor(mins / 60), rm = mins % 60;
7459:     const label = h > 0 ? `${h}h ${rm}min` : `${mins}min`;
7460:     const el = document.getElementById('sbSessionInfo');
7461:     if (el) el.innerHTML = `<span class="sb-session-dot"></span> ${label}`;
7462:   }
```

### Coincidencia 17 — línea 7885

```html
7880: // ── CENTRO DE ACCIONES ──
7881: function _daysSince(dateStr) {
7882:   const normalized = normDate(dateStr);
7883:   if (!normalized) return 0;
7884:   const d = new Date(normalized + 'T12:00:00');
7885:   return Math.floor((Date.now() - d.getTime()) / 86400000);
7886: }
7887: 
7888: function _actionIcon(type) {
7889:   const icons = {
7890:     cita:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
```

### Coincidencia 18 — línea 7988

```html
7983:   const nombre = document.getElementById('waitNombre').value.trim();
7984:   const telefono = document.getElementById('waitTelefono').value.trim();
7985:   const servicio = document.getElementById('waitServicio').value.trim();
7986:   const preferencia = document.getElementById('waitPreferencia').value.trim();
7987:   if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
7988:   const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
7989:   try {
7990:     const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
7991:     if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
7992:     item.id = d.id || item.id;
7993:   } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
```

### Coincidencia 19 — línea 8124

```html
8119:   const isMonetary = typeof target === 'string' && target.includes('$');
8120:   const numTarget  = isMonetary
8121:     ? parseInt(target.replace(/[^0-9]/g,'')) || 0
8122:     : parseInt(String(target).replace(/[^0-9]/g,'')) || 0;
8123:   if (numTarget === 0) { el.textContent = target; return; }
8124:   const startTs = performance.now();
8125:   const easeOut = t => 1 - Math.pow(1 - t, 3);
8126:   const tick = ts => {
8127:     const progress = Math.min((ts - startTs) / duration, 1);
8128:     const current  = Math.round(easeOut(progress) * numTarget);
8129:     el.textContent = isMonetary
```

### Coincidencia 20 — línea 8320

```html
8315:   } catch(e) { toast('Error de conexión', 'err'); }
8316: }
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
```

### Coincidencia 21 — línea 8329

```html
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
```

### Coincidencia 24 — línea 8330

```html
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
8334:     .sort((a, b) => a.diff - b.diff);
8335: 
```

### Coincidencia 25 — línea 8779

```html
8774: }
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
```

### Coincidencia 26 — línea 8780

```html
8775: 
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
```

### Coincidencia 27 — línea 8781

```html
8776: // ── VISTA SEMANAL (dashboard) ──
8777: function renderWeekGrid() {
8778:   const todayStr = today();
8779:   const now = new Date();
8780:   const wd = now.getDay();
8781:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd === 0 ? -6 : 1));
8782:   const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
8783:   const days = Array.from({length:7}, (_,i) => {
8784:     const d = new Date(startW); d.setDate(startW.getDate() + i); return d;
8785:   });
8786:   const grid = document.getElementById('weekGrid');
```

### Coincidencia 29 — línea 9237

```html
9232: 
9233: function renderSmartCobrosCenter() {
9234:   const box = document.getElementById('smartCobrosCenter');
9235:   if (!box) return;
9236:   const hoy = today();
9237:   const now = new Date();
9238:   const m = now.getMonth() + 1, y = now.getFullYear();
9239:   const d = smartBriefingData();
9240:   const citas = citasReales().filter(smartIsActiveAppointment);
9241:   const mesPend = citas.filter(c => {
9242:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
```

### Coincidencia 30 — línea 9238

```html
9233: function renderSmartCobrosCenter() {
9234:   const box = document.getElementById('smartCobrosCenter');
9235:   if (!box) return;
9236:   const hoy = today();
9237:   const now = new Date();
9238:   const m = now.getMonth() + 1, y = now.getFullYear();
9239:   const d = smartBriefingData();
9240:   const citas = citasReales().filter(smartIsActiveAppointment);
9241:   const mesPend = citas.filter(c => {
9242:     const [cy,cm] = normDate(c.fecha).split('-').map(Number);
9243:     return cy === y && cm === m && isOperationalDate(c.fecha) && !smartIsPaid(c);
```

### Coincidencia 32 — línea 9316

```html
9311: }
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
```

### Coincidencia 33 — línea 9317

```html
9312: 
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
```

### Coincidencia 34 — línea 9318

```html
9313: // ── DASHBOARD ──
9314: function initDashboard() {
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
```

### Coincidencia 36 — línea 9320

```html
9315:   const todayStr = today();
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
```

### Coincidencia 37 — línea 9321

```html
9316:   const now  = new Date();
9317:   const wd   = now.getDay();
9318:   const startW = new Date(now); startW.setDate(now.getDate() - wd + (wd===0?-6:1)); startW.setHours(0,0,0,0);
9319:   const endW   = new Date(startW); endW.setDate(startW.getDate()+6); endW.setHours(23,59,59,999);
9320:   const m    = now.getMonth()+1;
9321:   const y    = now.getFullYear();
9322: 
9323:   const citas = citasReales();
9324: 
9325:   const hoy    = citas.filter(c => normDate(c.fecha) === todayStr).length;
9326:   const semana = citas.filter(c => { if (!c.hora) return false; const [cy,cm,cd]=normDate(c.fecha).split('-'); const d=new Date(+cy,+cm-1,+cd); return d>=startW && d<=endW; }).length;
```

### Coincidencia 38 — línea 9461

```html
9456: 
9457: // ── AGENDA ──
9458: 
9459: // ── COBROS PENDIENTES DETALLE ──
9460: function _verCobrosPendientes() {
9461:   const now    = new Date();
9462:   const m      = now.getMonth() + 1, y = now.getFullYear();
9463:   const hoy    = today();
9464:   const citas  = citasReales();
9465:   const futuras = citas.filter(c => {
9466:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 39 — línea 9462

```html
9457: // ── AGENDA ──
9458: 
9459: // ── COBROS PENDIENTES DETALLE ──
9460: function _verCobrosPendientes() {
9461:   const now    = new Date();
9462:   const m      = now.getMonth() + 1, y = now.getFullYear();
9463:   const hoy    = today();
9464:   const citas  = citasReales();
9465:   const futuras = citas.filter(c => {
9466:     const [cy,cm] = normDate(c.fecha).split('-');
9467:     return +cm===m && +cy===y && normDate(c.fecha) > hoy && !isPagada(c.id);
```

### Coincidencia 41 — línea 9494

```html
9489:   document.getElementById('reporteMesBody').innerHTML = html;
9490:   document.getElementById('modalReporteMes').style.display = 'flex';
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
```

### Coincidencia 42 — línea 9496

```html
9491: }
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
```

### Coincidencia 43 — línea 9497

```html
9492: 
9493: function _verCobrosPendientesSemana() {
9494:   const now   = new Date();
9495:   const hoy   = today();
9496:   const dow   = now.getDay();
9497:   const startW = new Date(now); startW.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1)); startW.setHours(0,0,0,0);
9498:   const endW   = new Date(startW); endW.setDate(startW.getDate() + 6); endW.setHours(23,59,59,999);
9499:   const toS = d => d.toLocalDateStr();
9500:   const sw = toS(startW), ew = toS(endW);
9501: 
9502:   const citas = citasReales();
```

### Coincidencia 45 — línea 9572

```html
9567:   ));
9568: 
9569:   // Citas normales
9570:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9571:   if (window._agendaFiltroPendienteCierre) {
9572:     const nowMs = Date.now();
9573:     citas = citas.filter(c => {
9574:       const estado = normalizeAppointmentStatus(c);
9575:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9576:       const fecha = normDate(c.fecha);
9577:       const hora = String(c.hora || '').slice(0, 5);
```

### Coincidencia 46 — línea 12344

```html
12339: }
12340: 
12341: // Helpers KV sync seguimiento
12342: function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }
12343: function segToggleR(nombre)     {
12344:   const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
12345:   if (segReagendo(nombre)) {
12346:     kvRemove('seg_reagendo_'+nombre);
12347:     _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
12348:   } else {
12349:     kvSet('seg_reagendo_'+nombre,'1');
```

### Coincidencia 49 — línea 12358

```html
12353:   }
12354:   renderSeguimiento();
12355: }
12356: function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }
12357: function segMarkWa(nombre, tipo, dias) {
12358:   kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
12359:   const label = tipo==='sem3' ? 'WA aviso 3 semanas' : tipo==='sem4' ? 'WA semana 4' : 'WA semana 5+';
12360:   segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin descarga)');
12361:   renderSeguimiento();
12362: }
12363: 
```

### Coincidencia 50 — línea 12401

```html
12396: function renderSeguimiento() {
12397:   const lista = document.getElementById('segLista');
12398:   if (!lista) return;
12399:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12400: 
12401:   const now = new Date(); now.setHours(0,0,0,0);
12402: 
12403:   // Mapa: última descarga por paciente
12404:   const map = {};
12405:   allData.citas
12406:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
```

### Coincidencia 52 — línea 12420

```html
12415: 
12416:   // Calcular días y semana — descargas
12417:   const pacientes = Object.values(map).map(p => {
12418:     const [y,m,d] = p.fecha.split('-');
12419:     const last = new Date(+y,+m-1,+d);
12420:     const dias = Math.floor((now - last) / 86400000);
12421:     let semana = null;
12422:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12423:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12424:     else if (dias >= 49)              semana = 'sem5';
12425:     return { ...p, dias, semana };
```

### Coincidencia 53 — línea 12444

```html
12439:     });
12440: 
12441:   const readapPacs = Object.values(mapR).map(p => {
12442:     const [y,m,d] = p.fecha.split('-');
12443:     const last = new Date(+y,+m-1,+d);
12444:     const dias = Math.floor((now - last) / 86400000);
12445:     return { ...p, dias };
12446:   });
12447: 
12448:   // Contar
12449:   const c3 = pacientes.filter(p=>p.semana==='sem3').length;
```

### Coincidencia 54 — línea 12860

```html
12855:   return _getPkAsignados()
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
```

### Coincidencia 55 — línea 12861

```html
12856:     .filter(p => { if (!p.fechaCompra) return false; const [py,pm] = p.fechaCompra.split('-'); return +pm===m && +py===y; })
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
```

### Coincidencia 56 — línea 12862

```html
12857:     .reduce((s,p) => s + parsePrecio(p.precio), 0);
12858: }
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
```

### Coincidencia 57 — línea 12864

```html
12859: function calcCobradoMes(mesParam, anyoParam) {
12860:   const now = new Date();
12861:   const m = mesParam  || now.getMonth()+1;
12862:   const y = anyoParam || now.getFullYear();
12863:   const todayStr = today();
12864:   const esPasado = y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth()+1);
12865:   const citasTotal = citasReales()
12866:     .filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(c.fecha) <= todayStr); })
12867:     .reduce((s,c) => s + parsePrecio(c.precio), 0);
12868:   const eventosTotal = (allData.eventos || [])
12869:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && (esPasado || normDate(e.fecha) <= todayStr); })
```

### Coincidencia 60 — línea 12946

```html
12941: }
12942: 
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
```

### Coincidencia 61 — línea 12947

```html
12942: 
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
12952:   const egresoFechaEl = document.getElementById('egresoFecha');
```

### Coincidencia 62 — línea 12948

```html
12943: // ── MÓDULO FINANZAS ──
12944: // ══════════════════════════════════════════════════════════════
12945: function renderFinanzas() {
12946:   const now = new Date();
12947:   const m   = now.getMonth()+1;
12948:   const y   = now.getFullYear();
12949:   const citas = citasReales();
12950: 
12951:   // ── Inicializar fecha egreso con hoy ──
12952:   const egresoFechaEl = document.getElementById('egresoFecha');
12953:   if (egresoFechaEl && !egresoFechaEl.value) egresoFechaEl.value = today();
```

### Coincidencia 63 — línea 13084

```html
13079: 
13080:   // ── Proyección extendida a fin de mes ──
13081:   const proyExtEl = document.getElementById('finProyeccionExt');
13082:   if (proyExtEl) {
13083:     const diasMes   = new Date(y, m, 0).getDate();
13084:     const diaActual = now.getDate();
13085:     const diasRest  = diasMes - diaActual;
13086:     const ritmoD    = diaActual > 0 ? cobradoMes / diaActual : 0;
13087:     const proyFin   = Math.round(ritmoD * diasMes);
13088:     const pctProy   = meta ? Math.min(Math.round(proyFin / meta * 100), 120) : null;
13089:     const color     = !meta ? 'var(--primary)' : (pctProy >= 100 ? 'var(--ok)' : pctProy >= 70 ? 'var(--warn)' : '#ef4444');
```

### Coincidencia 64 — línea 13164

```html
13159: 
13160:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
13161:   if (!monto || monto <= 0) { toast('Ingresa un monto válido', 'err'); return; }
13162: 
13163:   const arr = getEgresos();
13164:   arr.push({ id: Date.now().toString(), fecha, categoria: cat, concepto: conc, monto, descripcion: desc });
13165:   saveEgresos(arr);
13166: 
13167:   document.getElementById('egresoFecha').value  = '';
13168:   document.getElementById('egresoMonto').value  = '';
13169:   document.getElementById('egresoDesc').value   = '';
```

### Coincidencia 65 — línea 13187

```html
13182: function renderEgresosList() {
13183:   const el = document.getElementById('egresosListResult');
13184:   if (!el) return;
13185: 
13186:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13187:   const now = new Date();
13188:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13189:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13190:     document.getElementById('egresoMesFiltro').value = defaultMes;
13191:   }
13192:   const mes = filtroMes || defaultMes;
```

### Coincidencia 66 — línea 13188

```html
13183:   const el = document.getElementById('egresosListResult');
13184:   if (!el) return;
13185: 
13186:   const filtroMes = document.getElementById('egresoMesFiltro')?.value || '';
13187:   const now = new Date();
13188:   const defaultMes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
13189:   if (!filtroMes && document.getElementById('egresoMesFiltro')) {
13190:     document.getElementById('egresoMesFiltro').value = defaultMes;
13191:   }
13192:   const mes = filtroMes || defaultMes;
13193: 
```

### Coincidencia 68 — línea 13383

```html
13378: const VENTANA_NUEVO_DIAS   = 180;
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
```

### Coincidencia 69 — línea 13384

```html
13379: const VENTANA_RETENCION    = 60;
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
```

### Coincidencia 70 — línea 13385

```html
13380: const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
13390:     const [cy,cm] = normDate(c.fecha).split('-');
```

### Coincidencia 71 — línea 13462

```html
13457: 
13458: function addLead(canal = 'WhatsApp') {
13459:   const leads = getLeads();
13460:   const ahora = new Date();
13461:   leads.push({
13462:     id: Date.now(),
13463:     fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
13464:     hora: ahora.toTimeString().slice(0,5),    // HH:MM
13465:     canal: canal,
13466:     timestamp: ahora.getTime()
13467:   });
```

### Coincidencia 72 — línea 13505

```html
13500:     return +ly === y && +lm === m;
13501:   }).length;
13502: }
13503: 
13504: function changeKPIMonth(m, y) {
13505:   const now = new Date();
13506:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13507:   _kpiViewMonth = esActual ? null : {m, y};
13508:   renderKPIGuia();
13509: }
13510: 
```

### Coincidencia 73 — línea 13506

```html
13501:   }).length;
13502: }
13503: 
13504: function changeKPIMonth(m, y) {
13505:   const now = new Date();
13506:   const esActual = m === now.getMonth()+1 && y === now.getFullYear();
13507:   _kpiViewMonth = esActual ? null : {m, y};
13508:   renderKPIGuia();
13509: }
13510: 
13511: function registrarLead(canal) {
```

### Coincidencia 75 — línea 13592

```html
13587:   setVal('kpiConvertidos', manual.convertidos);
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
```

### Coincidencia 76 — línea 13593

```html
13588:   setVal('kpiNPS', manual.nps);
13589:   setVal('kpiEncuestas', manual.encuestas);
13590:   setVal('kpiBD', manual.bd);
13591: 
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 78 — línea 13597

```html
13592:   const now  = new Date();
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
```

### Coincidencia 80 — línea 13598

```html
13593:   const m    = now.getMonth()+1, y = now.getFullYear();
13594:   const citas = citasReales();
13595: 
13596:   // Calcular inicio semana actual (lunes)
13597:   const diaSemana = now.getDay() === 0 ? 6 : now.getDay() - 1;
13598:   const lunesSem  = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
13599:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
13600:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
13601: 
13602:   // Sesiones esta semana (excluyendo canceladas y no-shows)
13603:   // Nota: citasReales() ya excluye 'Cancelada'; aquí filtramos también 'No asistió'
```

### Coincidencia 82 — línea 13823

```html
13818: function _copyGestionMesKey(d = new Date()) {
13819:   return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
13820: }
13821: 
13822: function _copyGestionPeriodo() {
13823:   const now = new Date();
13824:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
```

### Coincidencia 83 — línea 13825

```html
13820: }
13821: 
13822: function _copyGestionPeriodo() {
13823:   const now = new Date();
13824:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
13825:   return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
13826: }
13827: 
13828: function _copyGestionTop(map, limit = 5) {
13829:   return Object.entries(map || {})
13830:     .sort((a,b) => b[1] - a[1])
```

### Coincidencia 85 — línea 13837

```html
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
13838:   const monthKey = _copyGestionMesKey(now);
13839:   const citasAll = allData.citas || [];
13840:   const eventosAll = allData.eventos || [];
13841:   const pacientesAll = allData.pacientes || [];
13842:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
```

### Coincidencia 86 — línea 13838

```html
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
13838:   const monthKey = _copyGestionMesKey(now);
13839:   const citasAll = allData.citas || [];
13840:   const eventosAll = allData.eventos || [];
13841:   const pacientesAll = allData.pacientes || [];
13842:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13843:   const manual = getKPIManual ? getKPIManual() : {};
```

### Coincidencia 87 — línea 13890

```html
13885:   const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
13886:   const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;
13887: 
13888:   const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
13889:   const leadsConvertidos = manual.convertidos || citasMesActivas.length;
13890:   const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);
13891: 
13892:   const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
13893:   const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
13894:   const disponibilidadPros = pros.length
13895:     ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
```

### Coincidencia 88 — línea 14340

```html
14335:     </div>
14336:   </div>`;
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
```

### Coincidencia 89 — línea 14341

```html
14336:   </div>`;
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
```

### Coincidencia 90 — línea 14342

```html
14337: }
14338: 
14339: function _buildReporteMes() {
14340:   const now  = new Date();
14341:   const m    = now.getMonth() + 1;
14342:   const y    = now.getFullYear();
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14347:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
```

### Coincidencia 91 — línea 14455

```html
14450:     const sv = c.servicio||'Sin tipo';
14451:     cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
14452:   });
14453: 
14454:   // ── Pacientes ──
14455:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
14456:   const pacMesMap = {};
14457:   citasMes.forEach(c => {
14458:     if (!c.nombre) return;
14459:     const k = c.nombre.trim().toLowerCase();
14460:     pacMesMap[k] = (pacMesMap[k]||0)+1;
```

### Coincidencia 93 — línea 14478

```html
14473: 
14474:   // Top 5 pacientes por sesiones
14475:   const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
14476: 
14477:   // Retención 60 días
14478:   const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
14479:   const conteoPac = {};
14480:   citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
14481:     .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
14482:   const pac60 = Object.keys(conteoPac).length;
14483:   const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
```

### Coincidencia 95 — línea 14593

```html
14588:   html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
14589:     <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
14590:       <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
14591:       <div style="flex:1">
14592:         <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
14593:         <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
14594:       </div>
14595:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
14596:         <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
14597:           <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
14598:           <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
```

### Coincidencia 96 — línea 15009

```html
15004: 
15005:   return html;
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
```

### Coincidencia 97 — línea 15010

```html
15005:   return html;
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
15015:   const el = document.getElementById('reporteMesBody');
```

### Coincidencia 98 — línea 15011

```html
15006: }
15007: 
15008: function copiarReporteMes() {
15009:   const now  = new Date();
15010:   const m    = now.getMonth() + 1;
15011:   const y    = now.getFullYear();
15012:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15013:   const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);
15014: 
15015:   const el = document.getElementById('reporteMesBody');
15016:   // Construir texto plano desde el HTML
```

### Coincidencia 99 — línea 15055

```html
15050: 
15051: // ══════════════════════════════════════════════════════════════
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
```

### Coincidencia 100 — línea 15056

```html
15051: // ══════════════════════════════════════════════════════════════
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
```

### Coincidencia 101 — línea 15057

```html
15052: // ── BRIEF PARA CLAUDE ──
15053: // ══════════════════════════════════════════════════════════════
15054: function copiarBriefClaude() {
15055:   const now   = new Date();
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
15062: 
```

### Coincidencia 102 — línea 15103

```html
15098:   const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
15099:   const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
15100:   const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;
15101: 
15102:   // ── Pacientes ──
15103:   const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
15104:   const pacMesMap = {};
15105:   citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
15106:   const pacUnicosMes = Object.keys(pacMesMap).length;
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
```

### Coincidencia 104 — línea 15112

```html
15107:   let pacNuevos=0, pacRecurrentes=0;
15108:   Object.keys(pacMesMap).forEach(pac=>{
15109:     const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
15110:     if(prev.length===0) pacNuevos++; else pacRecurrentes++;
15111:   });
15112:   const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
15113:   const cont60={};
15114:   citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
15115:   const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
15116:   const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;
15117: 
```

### Coincidencia 106 — línea 15153

```html
15148:   const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
15149:   const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
15150:   const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);
15151: 
15152:   line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
15153:   line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
15154:   line(sep(60));
15155:   line();
15156:   line(`CONTEXTO DEL NEGOCIO`);
15157:   line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
15158:   line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
```

### Coincidencia 107 — línea 15364

```html
15359: // ══ MANUAL DE EMERGENCIA — funciones ══
15360: function renderEmergencia() {
15361:   const d = window._emKPIData;
15362:   if (!d) return;
15363: 
15364:   const now  = new Date();
15365:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15366: 
15367:   function kpiSt(val, meta, altoEsMejor) {
15368:     if (isNaN(val) || !meta || meta <= 0) return -1;
15369:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
```

### Coincidencia 108 — línea 15365

```html
15360: function renderEmergencia() {
15361:   const d = window._emKPIData;
15362:   if (!d) return;
15363: 
15364:   const now  = new Date();
15365:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15366: 
15367:   function kpiSt(val, meta, altoEsMejor) {
15368:     if (isNaN(val) || !meta || meta <= 0) return -1;
15369:     const ok   = altoEsMejor ? val >= meta   : val <= meta;
15370:     const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
```

### Coincidencia 109 — línea 15535

```html
15530: 
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
```

### Coincidencia 110 — línea 15536

```html
15531: function renderKPIGuia() {
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
```

### Coincidencia 111 — línea 15537

```html
15532:   const el = document.getElementById('kpiGuiaLiveData');
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
```

### Coincidencia 112 — línea 15538

```html
15533:   if (!el) return;
15534: 
15535:   const now = new Date();
15536:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15537:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15538:   const esMesActual = m === now.getMonth()+1 && y === now.getFullYear();
15539:   const citas = citasReales();
15540: 
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
```

### Coincidencia 114 — línea 15546

```html
15541:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
```

### Coincidencia 116 — línea 15547

```html
15542: 
15543:   // KPI 1 — Sesiones: semana actual (mes actual) o total del mes (meses pasados)
15544:   let _sessLabelG, _sessEvalG, _nEvG = 0, _ventasG = 0;
15545:   if (esMesActual) {
15546:     const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15547:     const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15548:     const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15549:     const citasSemana = citas.filter(c => {
15550:       const f = normDate(c.fecha);
15551:       return c.estado !== 'No asistió' && f >= toStr(lunesSem) && f <= toStr(domingoSem);
15552:     });
```

### Coincidencia 118 — línea 15628

```html
15623:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15624:   ).length;
15625:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15626: 
15627:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15628:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15629:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
15630:   const cuentaPac = {};
15631:   citas.filter(c => {
15632:     const fd = new Date(normDate(c.fecha) + 'T12:00:00');
15633:     return fd >= hace60 && fd <= refDate;
```

### Coincidencia 119 — línea 15643

```html
15638: 
15639:   // Selector de mes
15640:   const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
15641:   let opcionesSelect = '';
15642:   for (let i = 0; i < 13; i++) {
15643:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
15644:     const om = d.getMonth() + 1, oy = d.getFullYear();
15645:     const sel = (om === m && oy === y) ? 'selected' : '';
15646:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15647:   }
15648: 
```

### Coincidencia 121 — línea 15649

```html
15644:     const om = d.getMonth() + 1, oy = d.getFullYear();
15645:     const sel = (om === m && oy === y) ? 'selected' : '';
15646:     opcionesSelect += `<option value="${om}-${oy}" ${sel}>${MESES[om-1]} ${oy}</option>`;
15647:   }
15648: 
15649:   const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
15650:   const subtitulo = esMesActual
15651:     ? `Conectado en vivo desde el módulo de Finanzas · ${hora}`
15652:     : `Mostrando datos históricos · ${MESES[m-1]} ${y}`;
15653: 
15654:   let html = `<div style="background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:20px 20px 16px;margin-bottom:24px">
```

### Coincidencia 122 — línea 15710

```html
15705:     if (!c.nombre) return;
15706:     const nom = c.nombre.trim().toLowerCase();
15707:     if (!_citasPorPac[nom]) _citasPorPac[nom] = { nombre: c.nombre.trim(), fechas: [] };
15708:     _citasPorPac[nom].fechas.push(normDate(c.fecha));
15709:   });
15710:   const hace90 = new Date(now); hace90.setDate(now.getDate() - 90);
15711:   const hace90Str = hace90.toLocalDateStr();
15712:   const _listaUnaVez = Object.values(_citasPorPac)
15713:     .filter(p => p.fechas.length === 1 && p.fechas[0] <= hace90Str)
15714:     .map(p => p.nombre).sort();
15715: 
```

### Coincidencia 124 — línea 15722

```html
15717:   html += _mkPacList('kpiListaUnaVez',      '⚠️', 'Solo 1 sesión · no han vuelto (+3 meses)', _listaUnaVez.length, _listaUnaVez,   '#f59e0b');
15718:   // Cálculo: sesiones diarias necesarias para cumplir meta
15719:   if (esMesActual) {
15720:     const diasEnMes = new Date(y, m, 0).getDate();
15721:     let diasRestantes = 0;
15722:     for (let d = now.getDate() + 1; d <= diasEnMes; d++) {
15723:       const dow = new Date(y, m - 1, d).getDay();
15724:       if (dow !== 0 && dow !== 6) diasRestantes++; // solo lunes a viernes
15725:     }
15726:     const faltante      = Math.max(0, META_VENTAS_MES - ventasMes);
15727:     const citasMesHechas = citas.filter(c => { const [cy,cm2] = normDate(c.fecha).split('-'); return +cm2===m && +cy===y; });
```

### Coincidencia 125 — línea 15833

```html
15828: 
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
```

### Coincidencia 126 — línea 15834

```html
15829: function _renderCancelBreakdown() {
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
```

### Coincidencia 127 — línea 15835

```html
15830:   const el = document.getElementById('kpiCancelBreakdown');
15831:   if (!el) return;
15832: 
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
```

### Coincidencia 128 — línea 15838

```html
15833:   const now = new Date();
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
```

### Coincidencia 130 — línea 15839

```html
15834:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
15835:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
15836:   const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
15837: 
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
```

### Coincidencia 132 — línea 15974

```html
15969:   [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
```

### Coincidencia 133 — línea 15975

```html
15970:   try {
15971:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
15972:     const d = await r.json();
15973:     if (d.ok) {
15974:       const now = new Date();
15975:       const m = now.getMonth()+1, y = now.getFullYear();
15976:       const citasMes = citasReales().filter(c => {
15977:         const [cy,cm] = normDate(c.fecha).split('-');
15978:         return +cm===m && +cy===y;
15979:       }).length;
15980:       const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
```

### Coincidencia 135 — línea 15986

```html
15981:       const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
15982:       const stats   = {
15983:         nps: npsVal, encuestas: encPct,
15984:         totalRespuestas: d.totalMes, citasMes,
15985:         promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
15986:         fetchedAt: Date.now()
15987:       };
15988:       kvSet('encuestaStats', JSON.stringify(stats));
15989:       // Actualizar inputs ocultos y guardar
15990:       const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
15991:       sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
```

### Coincidencia 136 — línea 16085

```html
16080: }
16081: 
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
```

### Coincidencia 137 — línea 16086

```html
16081: 
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
16091:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
```

### Coincidencia 138 — línea 16087

```html
16082: function _renderBDBreakdown() {
16083:   const el = document.getElementById('kpiBDLiveBreakdown');
16084:   if (!el) return;
16085:   const now = new Date();
16086:   const m = _kpiViewMonth ? _kpiViewMonth.m : now.getMonth() + 1;
16087:   const y = _kpiViewMonth ? _kpiViewMonth.y : now.getFullYear();
16088:   const bd = calcBDActualizada(m, y);
16089:   if (!bd) { el.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Sin citas registradas este mes.</span>`; return; }
16090: 
16091:   const color = bd.pct === 100 ? 'var(--ok)' : bd.pct >= 90 ? '#f59e0b' : '#ef4444';
16092:   el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
```

### Coincidencia 139 — línea 16507

```html
16502: function renderEstructuraFinanciera() {
16503:   const el = document.getElementById('estructuraFinResult');
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
```

### Coincidencia 140 — línea 16509

```html
16504:   if (!el) return;
16505: 
16506:   const ingMes = calcCobradoMes();
16507:   const now = new Date();
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
```

### Coincidencia 142 — línea 16513

```html
16508:   const mes = filtroMesEgresos => {
16509:     const mes = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16510:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(mes));
16511:   };
16512:   const egresosMes = (() => {
16513:     const m = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
16514:     return getEgresos().filter(e => e.fecha && e.fecha.startsWith(m));
16515:   })();
16516:   const totalEgresosMes = egresosMes.reduce((s,e) => s + e.monto, 0);
16517:   const utilidadBruta = ingMes - totalEgresosMes;
16518: 
```

### Coincidencia 144 — línea 16650

```html
16645: 
16646: // ══════════════════════════════════════════════════════════════
16647: // ── MÉTRICAS INTELIGENTES ──
16648: // ══════════════════════════════════════════════════════════════
16649: function renderMetricas() {
16650:   const now = new Date();
16651:   const citas = citasReales();
16652:   const COLORES = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];
16653:   const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
16654: 
16655:   // 1. Horarios más demandados (excluye 00:00 = citas sin hora registrada)
```

### Coincidencia 145 — línea 17067

```html
17062:   renderCitasResumen();
17063: 
17064:   // Inicializar filtro de convenios con el mes actual
17065:   const convMesFiltro = document.getElementById('convenioMesFiltro');
17066:   if (convMesFiltro && !convMesFiltro.value) {
17067:     const nm = now.getMonth()+1;
17068:     convMesFiltro.value = y + '-' + String(nm).padStart(2,'0');
17069:   }
17070:   renderConveniosReport();
17071:   _checkAutoAtendida();
17072:   _checkCobrosPendientes();
```

### Coincidencia 146 — línea 17077

```html
17072:   _checkCobrosPendientes();
17073: }
17074: 
17075: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17076: function _checkAutoAtendida() {
17077:   const nowMs = Date.now();
17078:   const pendientes = (allData.citas || []).filter(c => {
17079:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17080:     if (esRegistroServ(c.servicio)) return false;
17081:     const f = normDate(c.fecha);
17082:     if (!f || !c.hora) return false;
```

### Coincidencia 147 — línea 17157

```html
17152:   }, 100);
17153: }
17154: 
17155: // ── Alerta semana floja ──
17156: function _checkAlertaSemanFloja(citas) {
17157:   const now = new Date();
17158:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17159:   const hoyStr = today();
17160: 
17161:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17162:   const dashEl = document.getElementById('alertaSemanFlojaDash');
```

### Coincidencia 148 — línea 17158

```html
17153: }
17154: 
17155: // ── Alerta semana floja ──
17156: function _checkAlertaSemanFloja(citas) {
17157:   const now = new Date();
17158:   const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
17159:   const hoyStr = today();
17160: 
17161:   // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
17162:   const dashEl = document.getElementById('alertaSemanFlojaDash');
17163:   const finEl  = document.getElementById('alertaSemanFlojaFin');
```

### Coincidencia 149 — línea 17174

```html
17169:   };
17170: 
17171:   if (dow < 3 || dow > 5) { apagar(); return; }
17172: 
17173:   // Calcular ingresos semana actual (lunes a hoy)
17174:   const lunes = new Date(now);
17175:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17176:   lunes.setHours(0,0,0,0);
17177: 
17178:   let totalSemActual = 0, nSemActual = 0;
17179:   citas.forEach(c => {
```

### Coincidencia 150 — línea 17175

```html
17170: 
17171:   if (dow < 3 || dow > 5) { apagar(); return; }
17172: 
17173:   // Calcular ingresos semana actual (lunes a hoy)
17174:   const lunes = new Date(now);
17175:   lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
17176:   lunes.setHours(0,0,0,0);
17177: 
17178:   let totalSemActual = 0, nSemActual = 0;
17179:   citas.forEach(c => {
17180:     const f = normDate(c.fecha);
```

### Coincidencia 151 — línea 18542

```html
18537: 
18538: // ══════════════════════════════════════════════════════════════
18539: // ── EXPORTAR CSV ──
18540: // ══════════════════════════════════════════════════════════════
18541: function exportarCSV(modo) {
18542:   const now = new Date();
18543:   const m   = now.getMonth()+1;
18544:   const y   = now.getFullYear();
18545:   let citas = citasReales().filter(esCobrada);
18546: 
18547:   if (modo === 'mes') {
```

### Coincidencia 152 — línea 18543

```html
18538: // ══════════════════════════════════════════════════════════════
18539: // ── EXPORTAR CSV ──
18540: // ══════════════════════════════════════════════════════════════
18541: function exportarCSV(modo) {
18542:   const now = new Date();
18543:   const m   = now.getMonth()+1;
18544:   const y   = now.getFullYear();
18545:   let citas = citasReales().filter(esCobrada);
18546: 
18547:   if (modo === 'mes') {
18548:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
```

### Coincidencia 153 — línea 18544

```html
18539: // ── EXPORTAR CSV ──
18540: // ══════════════════════════════════════════════════════════════
18541: function exportarCSV(modo) {
18542:   const now = new Date();
18543:   const m   = now.getMonth()+1;
18544:   const y   = now.getFullYear();
18545:   let citas = citasReales().filter(esCobrada);
18546: 
18547:   if (modo === 'mes') {
18548:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18549:   }
```

### Coincidencia 154 — línea 18586

```html
18581:   const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
18582:   const url  = URL.createObjectURL(blob);
18583:   const a    = document.createElement('a');
18584:   const nombre = modo === 'mes'
18585:     ? `ingresos_${y}-${pad(m)}.csv`
18586:     : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
18587:   a.href = url; a.download = nombre; a.click();
18588:   URL.revokeObjectURL(url);
18589:   toast('CSV descargado: ' + nombre);
18590: }
18591: 
```

### Coincidencia 155 — línea 19004

```html
18999: }
19000: 
19001: function _initComisMesSel() {
19002:   const sel = document.getElementById('comisMes');
19003:   if (!sel || sel.options.length > 0) return;
19004:   const now = new Date();
19005:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19006:   for (let i = 0; i < 12; i++) {
19007:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19008:     const opt = document.createElement('option');
19009:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
```

### Coincidencia 156 — línea 19007

```html
19002:   const sel = document.getElementById('comisMes');
19003:   if (!sel || sel.options.length > 0) return;
19004:   const now = new Date();
19005:   const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
19006:   for (let i = 0; i < 12; i++) {
19007:     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
19008:     const opt = document.createElement('option');
19009:     opt.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
19010:     opt.textContent = meses[d.getMonth()] + ' ' + d.getFullYear();
19011:     sel.appendChild(opt);
19012:   }
```

### Coincidencia 158 — línea 19128

```html
19123:   _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
19124:   renderComisiones();
19125: }
19126: 
19127: function marcarComisionPagada(persona) {
19128:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19129:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19130:   renderComisiones();
19131: }
19132: function desmarcarComisionPagada(persona) {
19133:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
```

### Coincidencia 159 — línea 19129

```html
19124:   renderComisiones();
19125: }
19126: 
19127: function marcarComisionPagada(persona) {
19128:   const now = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'numeric'});
19129:   kvSet('comis_pago_'+persona+'_'+_comisMesVal(), now);
19130:   renderComisiones();
19131: }
19132: function desmarcarComisionPagada(persona) {
19133:   kvRemove('comis_pago_'+persona+'_'+_comisMesVal());
19134:   renderComisiones();
```

### Coincidencia 160 — línea 19577

```html
19572:   const editId = document.getElementById('msgEditId').value;
19573:   if (editId) {
19574:     const idx = msgs.findIndex(m => m.id === editId);
19575:     if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
19576:   } else {
19577:     msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
19578:   }
19579:   _setMensajesPre(msgs);
19580:   closeModal('modalMensaje');
19581:   renderMensajes();
19582:   toast('Mensaje guardado ✓', 'ok');
```

### Coincidencia 162 — línea 19706

```html
19701: function _fmtCLP(n) {
19702:   return '$' + Math.round(n).toLocaleString('es-CO');
19703: }
19704: 
19705: function _recMesActual() {
19706:   const now = new Date();
19707:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19708: }
19709: 
19710: function _initRecMesSel() {
19711:   const sel = document.getElementById('recMesFiltro');
```

### Coincidencia 163 — línea 19707

```html
19702:   return '$' + Math.round(n).toLocaleString('es-CO');
19703: }
19704: 
19705: function _recMesActual() {
19706:   const now = new Date();
19707:   return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
19708: }
19709: 
19710: function _initRecMesSel() {
19711:   const sel = document.getElementById('recMesFiltro');
19712:   if (!sel) return;
```

### Coincidencia 165 — línea 19816

```html
19811:   if (!servicio) { alert('Selecciona el servicio'); return; }
19812:   if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }
19813: 
19814:   const comision = Math.round(venta * REC_PCT);
19815:   const rec = {
19816:     id: Date.now().toString(),
19817:     fecha,
19818:     paciente,
19819:     servicio,
19820:     venta,
19821:     comision,
```

### Coincidencia 166 — línea 20096

```html
20091: 
20092: function cargarCampañaReferidos() {
20093:   const panel = document.getElementById('refCampañaPanel');
20094:   if (!panel) return;
20095: 
20096:   const now   = new Date();
20097:   const mes   = now.getMonth();
20098:   const anio  = now.getFullYear();
20099:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20100:   const mesStr = MESES[mes];
20101: 
```

### Coincidencia 167 — línea 20097

```html
20092: function cargarCampañaReferidos() {
20093:   const panel = document.getElementById('refCampañaPanel');
20094:   if (!panel) return;
20095: 
20096:   const now   = new Date();
20097:   const mes   = now.getMonth();
20098:   const anio  = now.getFullYear();
20099:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20100:   const mesStr = MESES[mes];
20101: 
20102:   const citas = (allData.citas || []).filter(c => {
```

### Coincidencia 168 — línea 20098

```html
20093:   const panel = document.getElementById('refCampañaPanel');
20094:   if (!panel) return;
20095: 
20096:   const now   = new Date();
20097:   const mes   = now.getMonth();
20098:   const anio  = now.getFullYear();
20099:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20100:   const mesStr = MESES[mes];
20101: 
20102:   const citas = (allData.citas || []).filter(c => {
20103:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
```

## Selectores de pago y cita

### Coincidencia 1 — línea 3489

```html
3481:       </div>
3482: 
3483:       <div id="pagosStats" class="team-stats"></div>
3484: 
3485:       <div class="team-grid">
3486:         <div class="team-panel">
3487:           <h2>Registrar comprobante</h2>
3488:           <p class="team-muted" style="margin-bottom:12px">Primero selecciona la cita. Luego sube el pantallazo y decide si queda pendiente o si ya autorizas la atención.</p>
3489:           <select id="payCitaId" onchange="selectPaymentAppointment(this.value)" style="display:none"></select>
3490: 
3491:           <div style="display:grid;grid-template-columns:minmax(260px,1fr) minmax(260px,.85fr);gap:16px;align-items:start">
3492:             <div>
3493:               <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px">
3494:                 <div>
3495:                   <div style="font-family:var(--font-m);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">1 · Selecciona la cita</div>
3496:                   <div class="team-muted">Citas recientes y pendientes de pago</div>
3497:                 </div>
```

### Coincidencia 2 — línea 6287

```html
6279:     if (d.ok) {
6280:       teamData = {
6281:         profesionales: d.profesionales || [],
6282:         asignaciones: d.asignaciones || [],
6283:         novedades: d.novedades || [],
6284:         auditoria: d.auditoria || [],
6285:         cuentas: d.cuentas || []
6286:       };
6287:       (allData.citas || []).forEach(c => {
6288:         const a = assignmentFor(c.id);
6289:         c.profesionalId = a.ProfesionalID || '';
6290:         c.estadoAutorizacion = a.EstadoAutorizacion || '';
6291:         c.tarifaProfesional = a.Tarifa || '';
6292:       });
6293:     }
6294:   } catch(e) {
6295:     console.warn('No se pudo cargar Equipo', e);
```

### Coincidencia 3 — línea 6310

```html
6302: }
6303: 
6304: function teamCleanText(value) {
6305:   return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
6306: }
6307: 
6308: function teamAppointmentById(id) {
6309:   const target = String(id || '');
6310:   return (allData.citas || []).find(c => String(c.id || c.ID || '') === target);
6311: }
6312: 
6313: function teamAssignedAppointments(proId = '') {
6314:   const citas = (teamData.asignaciones || [])
6315:     .filter(a => !proId || String(a.ProfesionalID || '') === String(proId))
6316:     .map(a => {
6317:       const c = teamAppointmentById(a.CitaID);
6318:       return c ? { ...c, _assignment:a } : null;
```

### Coincidencia 4 — línea 6448

```html
6440:     </div>`;
6441: }
6442: 
6443: function renderEquipo() {
6444:   const pros = (teamData.profesionales || []).filter(p => (p.estado || '') !== 'Eliminado');
6445:   const assigns = teamData.asignaciones || [];
6446:   const novedades = teamData.novedades || [];
6447:   const cuentas = teamData.cuentas || [];
6448:   const citas = citasReales ? citasReales() : (allData.citas || []);
6449:   const asignadas = new Set(assigns.map(a => String(a.CitaID || '')));
6450:   const hoyStr = today();
6451:   const estadosNoAsignables = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','No asistió','Atendida','Sesión atendida','Reembolsada'];
6452:   const citasAsignadasOperativas = teamAssignedAppointments().filter(c => !teamIsInactiveAppointment(c));
6453:   const pendientes = citas
6454:     .filter(c => !asignadas.has(String(c.id)) && normDate(c.fecha) >= hoyStr && !estadosNoAsignables.includes(c.estado))
6455:     .sort((a,b) => (`${normDate(a.fecha)} ${a.hora||''}`).localeCompare(`${normDate(b.fecha)} ${b.hora||''}`))
6456:     .slice(0, 12);
```

### Coincidencia 5 — línea 6530

```html
6522: }
6523: 
6524: function openProfessionalSchedule(id) {
6525:   const pro = byIdFrom(teamData.profesionales, 'id', id) || byIdFrom(teamData.profesionales, 'ID', id);
6526:   if (!pro) return toast('No encontré el fisioterapeuta', 'err');
6527:   const assignments = (teamData.asignaciones || []).filter(a => String(a.ProfesionalID || '') === String(id));
6528:   const citas = assignments
6529:     .map(a => {
6530:       const c = (allData.citas || []).find(x => String(x.id || x.ID || '') === String(a.CitaID || ''));
6531:       return c ? { ...c, _assignment: a } : null;
6532:     })
6533:     .filter(Boolean)
6534:     .filter(c => isOperationalDate(c.fecha))
6535:     .sort((a,b) => (`${normDate(a.fecha)} ${a.hora || ''}`).localeCompare(`${normDate(b.fecha)} ${b.hora || ''}`));
6536:   const hoyStr = today();
6537:   const proximas = citas.filter(c => normDate(c.fecha) >= hoyStr);
6538:   const anteriores = citas.filter(c => normDate(c.fecha) < hoyStr);
```

### Coincidencia 6 — línea 6648

```html
6640:     renderEquipo();
6641:     toast('Fisioterapeuta eliminado de la lista');
6642:   } else {
6643:     toast(d.error || 'No se pudo eliminar', 'err');
6644:   }
6645: }
6646: 
6647: function abrirAsignarPro(citaId) {
6648:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6649:   if (!c) return toast('No encontré la cita', 'err');
6650:   const a = assignmentFor(citaId);
6651:   document.getElementById('assignCitaId').value = citaId;
6652:   document.getElementById('assignCitaResumen').innerHTML = `
6653:     <strong>${esc(c.nombre)}</strong>
6654:     <div class="team-muted">${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.servicio)} · Estado: ${esc(c.estado)}</div>
6655:     <div class="team-muted">Asignado actual: ${esc(professionalName(a.ProfesionalID))}</div>`;
6656:   document.getElementById('assignProfessionalId').innerHTML = activeProfessionals().map(p => `<option value="${esc(p.id)}" ${a.ProfesionalID === p.id ? 'selected' : ''}>${esc(p.nombre)} · ${esc(p.rol || 'Fisioterapeuta')}</option>`).join('');
```

### Coincidencia 7 — línea 6766

```html
6758: 
6759: function paymentAccountLabel(id) {
6760:   const a = (operationsData.cuentas || []).find(x => String(x.ID) === String(id));
6761:   return a ? `${a.Medio} · ${a.Numero}` : (id || 'Sin cuenta');
6762: }
6763: 
6764: function paymentCandidateAppointments() {
6765:   const blocked = ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','Reserva vencida'];
6766:   return (allData.citas || [])
6767:     .filter(c => isOperationalDate(c.fecha) && !blocked.includes(c.estado))
6768:     .sort((a,b) => {
6769:       const priority = s => ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(s || '') ? 0 : 1;
6770:       const pa = priority(a.estado), pb = priority(b.estado);
6771:       if (pa !== pb) return pa - pb;
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
```

### Coincidencia 8 — línea 6780

```html
6772:       return (`${normDate(b.fecha)} ${b.hora || ''}`).localeCompare(`${normDate(a.fecha)} ${a.hora || ''}`);
6773:     })
6774:     .slice(0, 160);
6775: }
6776: 
6777: function renderPaymentAppointmentList() {
6778:   const list = document.getElementById('paymentAppointmentList');
6779:   if (!list) return;
6780:   const selectedId = document.getElementById('payCitaId')?.value || '';
6781:   const q = (document.getElementById('payAppointmentSearch')?.value || '').toLowerCase().trim();
6782:   const citas = paymentCandidateAppointments().filter(c => {
6783:     const hay = `${c.id} ${c.nombre} ${c.servicio} ${fmtDate(c.fecha)} ${c.hora} ${c.estado}`.toLowerCase();
6784:     return !q || hay.includes(q);
6785:   }).slice(0, 60);
6786:   list.innerHTML = citas.length ? citas.map(c => {
6787:     const active = String(c.id) === String(selectedId);
6788:     const pending = ['Pendiente de pago','Pago por verificar','Pago rechazado'].includes(c.estado || '');
```

### Coincidencia 9 — línea 6806

```html
6798:         <span class="team-muted">ID ${esc(c.id || '')}</span>
6799:         <strong style="color:var(--primary)">${formatPrecio(parsePrecio(c.precio || 0))}</strong>
6800:       </div>
6801:     </button>`;
6802:   }).join('') : '<div class="empty"><p>No encontré citas para ese filtro.</p></div>';
6803: }
6804: 
6805: function selectPaymentAppointment(id) {
6806:   const citaSel = document.getElementById('payCitaId');
6807:   if (citaSel) citaSel.value = id || '';
6808:   prefillPaymentFromAppointment();
6809:   renderPaymentAppointmentList();
6810: }
6811: 
6812: function updateSelectedPaymentCard(c) {
6813:   const card = document.getElementById('selectedPaymentCard');
6814:   if (!card) return;
```

### Coincidencia 10 — línea 6841

```html
6833: function updatePaymentProofLabel() {
6834:   const file = document.getElementById('payProofFile')?.files?.[0];
6835:   const label = document.getElementById('payProofLabel');
6836:   if (label) label.textContent = file ? `Archivo listo: ${file.name}` : 'Subir pantallazo del pago';
6837: }
6838: 
6839: function fillPaymentSelectors(selectedId = '') {
6840:   const citas = paymentCandidateAppointments();
6841:   const citaSel = document.getElementById('payCitaId');
6842:   if (citaSel) {
6843:     citaSel.innerHTML = '<option value="">Selecciona una cita...</option>' + citas.map(c => `<option value="${esc(c.id)}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${esc(fmtDate(c.fecha))} · ${esc(c.hora)} · ${esc(c.nombre)} · ${esc(c.servicio)}</option>`).join('');
6844:   }
6845:   const medioSel = document.getElementById('payMedioPago');
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
```

### Coincidencia 11 — línea 6854

```html
6846:   if (medioSel) {
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
```

### Coincidencia 12 — línea 6855

```html
6847:     medioSel.innerHTML = (operationsData.cuentas || []).filter(a => (a.Estado || 'Activa') === 'Activa').map(a => `<option value="${esc(a.Medio)}" data-account="${esc(a.ID)}">${esc(a.Medio)} · ${esc(a.Numero)}</option>`).join('');
6848:   }
6849:   prefillPaymentFromAppointment();
6850:   renderPaymentAppointmentList();
6851: }
6852: 
6853: function prefillPaymentFromAppointment() {
6854:   const id = document.getElementById('payCitaId')?.value || '';
6855:   const c = (allData.citas || []).find(x => String(x.id) === String(id));
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
```

### Coincidencia 13 — línea 6864

```html
6856:   updateSelectedPaymentCard(c);
6857:   if (!c) return;
6858:   document.getElementById('payValorRecibido').value = String(c.precio || '').replace(/[^\d]/g,'');
6859:   if (!document.getElementById('payFechaPago').value) document.getElementById('payFechaPago').value = today();
6860: }
6861: 
6862: function clearPaymentForm() {
6863:   ['payValorRecibido','payFechaPago','payComprobante','payObservaciones','payProofFile'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
6864:   const c = document.getElementById('payCitaId'); if (c) c.value = '';
6865:   updatePaymentProofLabel();
6866:   updateSelectedPaymentCard(null);
6867:   renderPaymentAppointmentList();
6868: }
6869: 
6870: function abrirPagoCita(id) {
6871:   showView('pagos');
6872:   setTimeout(() => {
```

### Coincidencia 14 — línea 6880

```html
6872:   setTimeout(() => {
6873:     fillPaymentSelectors(id);
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
```

### Coincidencia 15 — línea 6882

```html
6874:     const el = document.getElementById('payValorRecibido');
6875:     if (el) el.focus();
6876:   }, 350);
6877: }
6878: 
6879: async function saveManualPayment(mode = 'verify') {
6880:   const citaId = document.getElementById('payCitaId').value;
6881:   if (!citaId) return toast('Selecciona una cita', 'err');
6882:   const c = (allData.citas || []).find(x => String(x.id) === String(citaId));
6883:   const medioEl = document.getElementById('payMedioPago');
6884:   const accountId = medioEl?.selectedOptions?.[0]?.dataset?.account || '';
6885:   const proofFile = await readPaymentProofFile();
6886:   if (proofFile?.error) return toast(proofFile.error, 'err');
6887:   const ref = document.getElementById('payComprobante').value.trim();
6888:   if (!valorRecibido) return toast('Escribe el valor recibido', 'err');
6889:   if (!fechaPago) return toast('Selecciona la fecha del pago', 'err');
6890:   if (!medioPago) return toast('Selecciona el medio de pago', 'err');
```

### Coincidencia 16 — línea 6957

```html
6949:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
6950:     await reload();
6951:     await loadOperationsData();
6952:     renderPagos();
6953:   } else toast(d.error || 'No se pudo verificar', 'err');
6954: }
6955: 
6956: function renderPagos() {
6957:   fillPaymentSelectors(document.getElementById('payCitaId')?.value || '');
6958:   const pagos = operationsData.pagos || [];
6959:   const pagosUnicos = [];
6960:   const seenPayments = new Set();
6961:   pagos.forEach(p => {
6962:     const key = p.CitaID ? `cita:${p.CitaID}` : `pago:${p.ID}`;
6963:     if (seenPayments.has(key)) return;
6964:     seenPayments.add(key);
6965:     pagosUnicos.push(p);
```

### Coincidencia 17 — línea 7717

```html
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7715:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7716:   const leads = getLeadsMes(m,y);
7717:   const todas = (allData.citas||[]).filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && !esRegistroServ(c.servicio); });
7718:   const motivos = getCancelMotivos();
7719:   const cancel = todas.filter(c => (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(motivos[c.id])).length;
7720:   const ref = new Date(y,m,0), start = new Date(ref); start.setDate(ref.getDate()-VENTANA_RETENCION);
7721:   const cuenta = {};
7722:   citas.filter(c => { const d=new Date(normDate(c.fecha)+'T12:00:00'); return d>=start&&d<=ref; }).forEach(c=>{const k=_normStr(c.nombre);if(k)cuenta[k]=(cuenta[k]||0)+1;});
7723:   const retTotal=Object.keys(cuenta).length, bd=calcBDActualizada(m,y);
7724:   const snapshot = {
7725:     gkKpi1:mes.length,
```

### Coincidencia 18 — línea 7906

```html
7898: function _opsItem({level='normal',type='paciente',title,sub,actions=''}) {
7899:   return `<div class="ops-item" data-level="${level}"><div class="ops-icon">${_actionIcon(type)}</div><div class="ops-copy"><div class="ops-title">${title}</div><div class="ops-sub">${sub}</div></div><div class="ops-actions">${actions}</div></div>`;
7900: }
7901: 
7902: function renderCentroAcciones() {
7903:   const list = document.getElementById('opsList');
7904:   if (!list) return;
7905:   const hoy = today();
7906:   const citas = (allData.citas || []).filter(c => !esRegistroServ(c.servicio));
7907:   const citasOperativas = citas.filter(c => isOperationalDate(c.fecha));
7908:   const citasHoy = citasOperativas.filter(c => normDate(c.fecha) === hoy && c.estado !== 'Cancelada' && c.estado !== 'Atendida');
7909:   const cobros = citasOperativas.filter(c => normDate(c.fecha) < hoy && c.estado !== 'Cancelada' && !isPagada(c.id));
7910: 
7911:   const pacientesMap = new Map();
7912:   citasOperativas.filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) <= hoy).forEach(c => {
7913:     const key = _normStr(c.nombre);
7914:     if (!key) return;
```

### Coincidencia 19 — línea 8168

```html
8160:   document.querySelectorAll('.mob-nav-btn').forEach(btn => {
8161:     const id = btn.id.replace('mobBtn-','');
8162:     btn.classList.toggle('active', id === (target || v));
8163:   });
8164: }
8165: 
8166: // Actualizar badge de pendientes en mobile nav
8167: function _updateMobBadge() {
8168:   const n = (allData.citas || []).filter(c => c.estado === 'Pendiente').length;
8169:   const b = document.getElementById('mobBadgeAgenda');
8170:   if (!b) return;
8171:   b.style.display = n > 0 ? '' : 'none';
8172:   b.textContent   = n > 9 ? '9+' : n;
8173: }
8174: 
8175: // Skeleton para tablas mientras carga
8176: function _showTableSkeleton(tbodyId, cols = 5, rows = 6) {
```

### Coincidencia 20 — línea 8259

```html
8251: function markWaSent(id, type) { kvSet('wa_'+id+'_'+type, '1'); }
8252: function wasWaSent(id, type)  { return !!kvGet('wa_'+id+'_'+type); }
8253: function agendarHoy() { showView('nueva'); document.getElementById('ncDate').value = today(); }
8254: 
8255: // ── PAGO POR CITA ──
8256: let _pagoIdActivo = null;
8257: 
8258: function isPagada(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
```

### Coincidencia 21 — línea 8264

```html
8256: let _pagoIdActivo = null;
8257: 
8258: function isPagada(id) {
8259:   const c = allData.citas.find(x => x.id === id);
8260:   return !!(c && c.pago) || kvGet('pago_'+id) === '1';
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
```

### Coincidencia 22 — línea 8269

```html
8261: }
8262: 
8263: function getMetodoPago(id) {
8264:   const c = allData.citas.find(x => x.id === id);
8265:   return (c && c.pago) || '';
8266: }
8267: 
8268: function pagoBadge(id) {
8269:   const c      = allData.citas.find(x => x.id === id);
8270:   const future = c && normDate(c.fecha) > today();
8271:   if (future) return `<span class="pago-btn" style="color:var(--muted);border-color:var(--border);cursor:default;opacity:.6">📅 Próxima</span>`;
8272:   const metodo = getMetodoPago(id);
8273:   const paid   = !!(metodo) || kvGet('pago_'+id) === '1';
8274:   const label  = metodo ? '✓ ' + metodo : (paid ? '✓ Pagada' : '⏳ Pago pend.');
8275:   return `<button type="button" class="pago-btn ${paid?'pagada':'pendiente'}" onclick="event.stopPropagation();abrirModalPago('${id}')" title="Clic para registrar método de pago">${label}</button>`;
8276: }
8277: 
```

### Coincidencia 23 — línea 8285

```html
8277: 
8278: function esCobrada(c) {
8279:   if (normDate(c.fecha) > today()) return false;
8280:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
8281: }
8282: 
8283: function abrirModalPago(id) {
8284:   _pagoIdActivo = id;
8285:   const c = allData.citas.find(x => x.id === id);
8286:   const sub = document.getElementById('pagoModalNombre');
8287:   if (sub && c) sub.textContent = c.nombre + ' · ' + c.fecha + ' · ' + c.precio;
8288:   const metodoActual = c ? c.pago : '';
8289:   document.querySelectorAll('.pago-metodo-btn').forEach(b => {
8290:     b.classList.toggle('activo', b.textContent.includes(metodoActual) && !!metodoActual);
8291:   });
8292:   document.getElementById('modalPago').classList.add('open');
8293: }
```

### Coincidencia 24 — línea 8307

```html
8299: 
8300: async function confirmarPago(metodo) {
8301:   if (!_pagoIdActivo) return;
8302:   const id = _pagoIdActivo;
8303:   cerrarModalPago();
8304:   try {
8305:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8306:     if (r.ok) {
8307:       const c = allData.citas.find(x => x.id === id);
8308:       if (c) c.pago = metodo;
8309:       if (metodo) kvSet('pago_'+id, '1');
8310:       else kvRemove('pago_'+id);
8311:       if (c) logChange(metodo ? 'Pago registrado' : 'Pago pendiente', `${c.nombre} · ${c.fecha} ${c.hora} · ${metodo || 'sin método'}`);
8312:       toast(metodo ? 'Pago registrado: ' + metodo : 'Marcado como pendiente', 'ok');
8313:       renderAgenda(); initDashboard(); renderFinanzas();
8314:     } else toast('Error al guardar: ' + (r.error || ''), 'err');
8315:   } catch(e) { toast('Error de conexión', 'err'); }
```

### Coincidencia 25 — línea 8325

```html
8317: 
8318: // ── ALERTA CITA PRÓXIMA ──
8319: function checkUpcomingAlerts() {
8320:   const now      = new Date();
8321:   const todayStr = today();
8322:   const banner   = document.getElementById('upcomingAlert');
8323:   if (!banner) return;
8324: 
8325:   const candidates = allData.citas
8326:     .filter(c => c.estado !== 'Cancelada' && normDate(c.fecha) === todayStr && c.hora)
8327:     .map(c => {
8328:       const [h, m] = c.hora.split(':').map(Number);
8329:       const dt   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
8330:       const diff = (dt - now) / 60000;
8331:       return { ...c, diff };
8332:     })
8333:     .filter(c => c.diff > 0 && c.diff <= 120)
```

### Coincidencia 26 — línea 8349

```html
8341:   document.getElementById('upcomingAlertMins').textContent =
8342:     mins < 60 ? `en ${mins} min (${next.hora})` : `en ${Math.round(mins/60)}h ${mins%60}min (${next.hora})`;
8343:   banner.classList.add('show');
8344: }
8345: 
8346: // ── EXPORTAR AGENDA DEL DÍA ──
8347: function exportarAgendaDia() {
8348:   const todayStr = today();
8349:   const citas = allData.citas
8350:     .filter(c => normDate(c.fecha) === todayStr && c.estado !== 'Cancelada')
8351:     .sort((a, b) => a.hora.localeCompare(b.hora));
8352:   if (!citas.length) { toast('No hay citas hoy para exportar', 'err'); return; }
8353: 
8354:   const fecha = new Date().toLocaleDateString('es-CO', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
8355:   let txt = `AGENDA — ${fecha.toUpperCase()}\n${'='.repeat(52)}\n\n`;
8356:   citas.forEach((c, i) => {
8357:     txt += `${i+1}. ${c.hora}  ${c.nombre}\n`;
```

### Coincidencia 27 — línea 8757

```html
8749:   const panel = document.getElementById('reagendarPanel_' + id);
8750:   if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
8751: }
8752: async function confirmarReagendar(id) {
8753:   const fecha = document.getElementById('rDate_' + id).value;
8754:   const hora  = document.getElementById('rTime_' + id).value;
8755:   if (!fecha || !hora) { toast('Selecciona fecha y hora', 'err'); return; }
8756:   if (!validateNoMidnight(hora, 'reagendar')) return;
8757:   const cita = allData.citas.find(c => c.id === id);
8758:   if (!cita) return;
8759:   const data = encodeURIComponent(JSON.stringify({
8760:     id, servicio: cita.servicio, modalidad: cita.modalidad,
8761:     fecha, hora, precio: cita.precio, notas: cita.notas || ''
8762:   }));
8763:   try {
8764:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
8765:     const d = await r.json();
```

### Coincidencia 28 — línea 8878

```html
8870:   return n + (n <= 10 ? s[n] : 'ra');
8871: }
8872: 
8873: function getInfoSesion(nombre, servicio, fecha) {
8874:   const total = sesionesPorPaquete[servicio];
8875:   if (!total) return null;
8876:   const norm  = (nombre||'').toLowerCase().trim();
8877:   const hasta = normDate(fecha);
8878:   const lista = (allData && allData.citas) ? allData.citas : [];
8879:   const numero = lista.filter(c =>
8880:     (c.nombre||'').toLowerCase().trim() === norm &&
8881:     c.servicio === servicio &&
8882:     c.estado !== 'Cancelada' &&
8883:     normDate(c.fecha) <= hasta
8884:   ).length;
8885:   return { numero: Math.max(1, numero), total };
8886: }
```

### Coincidencia 30 — línea 9039

```html
9031: // esCobrada definida arriba junto a pagoBadge
9032: function esCobrada_UNUSED(c) {
9033:   return !!(c.pago) || c.estado === 'Atendida' || kvGet('pago_'+c.id) === '1';
9034: }
9035: 
9036: // Citas reales (sin registros, sin canceladas, sin duplicados)
9037: function citasReales() {
9038:   const seen = new Set();
9039:   const result = allData.citas.filter(c => {
9040:     if (c.estado === 'Cancelada' || c.estado === 'Registro' || esRegistroServ(c.servicio)) return false;
9041:     if (!c.hora || isMidnightTime(c.hora)) return false;
9042:     const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
9043:     if (seen.has(key)) return false;
9044:     seen.add(key);
9045:     return true;
9046:   });
9047:   // Normalizar canal para citas antiguas que no lo tienen
```

### Coincidencia 31 — línea 9283

```html
9275:           </div>
9276:         </div>`).join('')}
9277:     </div>` : ''}
9278:   `;
9279: }
9280: 
9281: function patientInsightHtml(c) {
9282:   const key = smartPatientKey(c);
9283:   const lista = allData.citas
9284:     .filter(x => smartPatientKey(x) === key || (x.nombre || '').toLowerCase().trim() === (c.nombre || '').toLowerCase().trim())
9285:     .filter(smartIsActiveAppointment)
9286:     .sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora));
9287:   const hoy = today();
9288:   const futuras = lista.filter(x => normDate(x.fecha) > hoy && x.id !== c.id && x.estado !== 'Cancelada').sort((a,b)=>(normDate(a.fecha)+a.hora).localeCompare(normDate(b.fecha)+b.hora));
9289:   const realizadas = lista.filter(x => normDate(x.fecha) <= hoy && x.estado !== 'Cancelada');
9290:   const total = lista.reduce((s,x)=>s+parsePrecio(x.precio),0);
9291:   const pendiente = lista.filter(x => !smartIsPaid(x)).reduce((s,x)=>s+parsePrecio(x.precio),0);
```

### Coincidencia 32 — línea 9536

```html
9528: }
9529: 
9530: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9531: function globalSearch(val) {
9532:   if (!val || !val.trim()) return;
9533:   const q = val.trim().toLowerCase();
9534: 
9535:   // ¿Es un paciente?
9536:   const esPaciente = (allData.citas || []).some(c =>
9537:     (c.nombre || '').toLowerCase().includes(q) || (c.telefono || '').includes(q) || (c.email || '').toLowerCase().includes(q)
9538:   );
9539:   if (esPaciente) {
9540:     showView('agenda');
9541:     const fSearch = document.getElementById('fSearch');
9542:     if (fSearch) { fSearch.value = val; renderAgenda(); }
9543:     return;
9544:   }
```

### Coincidencia 33 — línea 9570

```html
9562:   const fHasta   = document.getElementById('fHasta').value;
9563: 
9564:   // Persistir filtros en sessionStorage
9565:   sessionStorage.setItem('agendaFilters', JSON.stringify(
9566:     {search, status: fSt, mod: fMod, service: fService, desde: fDesde, hasta: fHasta}
9567:   ));
9568: 
9569:   // Citas normales
9570:   let citas = [...allData.citas].map(c => ({...c, _esEvento:false}));
9571:   if (window._agendaFiltroPendienteCierre) {
9572:     const nowMs = Date.now();
9573:     citas = citas.filter(c => {
9574:       const estado = normalizeAppointmentStatus(c);
9575:       if (['ATENDIDA','CANCELADA','NO_ASISTIO'].includes(estado)) return false;
9576:       const fecha = normDate(c.fecha);
9577:       const hora = String(c.hora || '').slice(0, 5);
9578:       if (!fecha || !/^\d{2}:\d{2}$/.test(hora)) return false;
```

### Coincidencia 34 — línea 9714

```html
9706:   document.getElementById('fStatus').selectedIndex = 0;
9707:   document.getElementById('fMod').selectedIndex = 0;
9708:   document.getElementById('fService').selectedIndex = 0;
9709:   showView('agenda');
9710:   renderAgenda();
9711: }
9712: 
9713: function updateBadge() {
9714:   const n = allData.citas.filter(c => c.estado === 'Pendiente').length;
9715:   const b = document.getElementById('badgePendientes');
9716:   if (!b) return;
9717:   b.textContent = n;
9718:   b.style.display = n > 0 ? 'inline' : 'none';
9719: }
9720: 
9721: function resumenDiaWA() {
9722:   const todayStr = today();
```

### Coincidencia 35 — línea 9772

```html
9764:   const paraQuien = (document.getElementById('notaParaQuienInput').value||'').trim();
9765:   const otrasNotas = document.getElementById('notaAdminInput').value.trim();
9766:   const nota = (paraQuien ? '[PARA: ' + paraQuien + ']' + (otrasNotas ? ' ' + otrasNotas : '') : otrasNotas);
9767:   try {
9768:     const data = encodeURIComponent(JSON.stringify({id, notaAdmin: nota}));
9769:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
9770:     const d = await r.json();
9771:     if (d.ok) {
9772:       const cita = allData.citas.find(c => c.id === id);
9773:       if (cita) cita.notaAdmin = nota;
9774:       toast('Nota guardada');
9775:     } else toast('Error al guardar nota', 'err');
9776:   } catch(e) { toast('Error de conexión', 'err'); }
9777: }
9778: 
9779: async function changeStatus(id, status) {
9780:   try {
```

### Coincidencia 36 — línea 9784

```html
9776:   } catch(e) { toast('Error de conexión', 'err'); }
9777: }
9778: 
9779: async function changeStatus(id, status) {
9780:   try {
9781:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updateStatus&token=${encodeURIComponent(TOKEN)}&id=${id}&status=${status}`);
9782:     const d = await r.json();
9783:     if (d.ok) {
9784:       const cita = allData.citas.find(c => c.id === id);
9785:       if (cita) cita.estado = status;
9786:       if (cita) logChange('Estado cambiado', `${cita.nombre} · ${cita.servicio} ${cita.fecha} → ${status}`);
9787:       toast('Estado actualizado: ' + status);
9788:       if (status === 'No asistió' && cita) {
9789:         const t = String(cita.telefono||'').replace(/\D/g,'');
9790:         const phone = t.length <= 10 ? '57'+t : t;
9791:         if (t.length >= 7 && confirm('¿Enviarle mensaje de reagendamiento a ' + cita.nombre + '?')) {
9792:           const msg = 'Hola ' + waNombre(cita.nombre) + '! \uD83D\uDE4F Vi que no pudiste venir hoy. Espero que todo este bien. Cuando quieras reagendamos, dime que dias te quedan mejor y coordinamos. \uD83D\uDE0A — Cuidándote Fisioterapia';
```

### Coincidencia 37 — línea 9804

```html
9796:       initDashboard();
9797:       renderAgenda();
9798:       updateBadge();
9799:     } else toast('Error al actualizar', 'err');
9800:   } catch(e) { toast('Error de conexión', 'err'); }
9801: }
9802: 
9803: function verDetalle(id) {
9804:   const c = allData.citas.find(x => x.id === id);
9805:   if (!c) return;
9806:   const esCancelada = c.estado === 'Cancelada';
9807:   document.getElementById('modalDetalleContent').innerHTML = `
9808:     <div style="display:grid;gap:12px">
9809:       <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
9810:         ${row('Paciente', esc(c.nombre))} ${row('Teléfono', esc(c.telefono||'—'))}
9811:         ${row('Email', esc(c.email||'—'))} ${row('Servicio', esc(c.servicio))}
9812:         ${row('Fecha', esc(fmtDate(c.fecha) + ' · ' + c.hora))} ${row('Modalidad', esc(c.modalidad))}
```

### Coincidencia 38 — línea 9824

```html
9816:         ${row('ID cita', esc(c.id))}
9817:       </div>
9818:       ${patientInsightHtml(c)}
9819:       <!-- Nota interna editable -->
9820:       <div style="margin-top:10px;padding:10px 12px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.25);border-radius:8px">
9821:         <div style="font-size:.75rem;color:#92400e;font-family:var(--font-m);margin-bottom:8px">📝 Nota interna (solo tú la ves)</div>
9822:         <div style="margin-bottom:8px">
9823:           <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">👤 ¿La sesión es para otra persona? (afecta el mensaje de seguimiento)</div>
9824:           <input type="text" id="notaParaQuienInput" value="${(()=>{ const m=(c.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i); if(m) return m[1].trim(); const prev=allData.citas.filter(x=>x.nombre===c.nombre&&x.id!==c.id&&x.notaAdmin).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)); for(const p of prev){const mp=p.notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);if(mp)return mp[1].trim();} return ''; })()}" placeholder="Ej: tu esposo, tu mamá, tu hijo... (dejar en blanco si es para quien llama)" style="width:100%;background:rgba(255,255,255,.15);border:none;border-bottom:1px solid rgba(251,191,36,.4);border-radius:0;padding:4px 0;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text)">
9825:         </div>
9826:         <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">📋 Otras notas</div>
9827:         <textarea id="notaAdminInput" rows="2" style="width:100%;background:transparent;border:none;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text);resize:none" placeholder="Ej: Debe pagar saldo, viene en transporte...">${(c.notaAdmin||'').replace(/\[PARA:[^\]]*\]\s*/i,'').trim()}</textarea>
9828:         <button class="btn btn-ghost btn-sm" style="margin-top:6px" onclick="guardarNotaAdmin('${c.id}')">Guardar nota</button>
9829:       </div>
9830:       <!-- Mini-historial -->
9831:       ${(()=>{
9832:         const prev = allData.citas.filter(x => x.nombre===c.nombre && x.id!==c.id).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)).slice(0,3);
```

### Coincidencia 39 — línea 9832

```html
9824:           <input type="text" id="notaParaQuienInput" value="${(()=>{ const m=(c.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i); if(m) return m[1].trim(); const prev=allData.citas.filter(x=>x.nombre===c.nombre&&x.id!==c.id&&x.notaAdmin).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)); for(const p of prev){const mp=p.notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);if(mp)return mp[1].trim();} return ''; })()}" placeholder="Ej: tu esposo, tu mamá, tu hijo... (dejar en blanco si es para quien llama)" style="width:100%;background:rgba(255,255,255,.15);border:none;border-bottom:1px solid rgba(251,191,36,.4);border-radius:0;padding:4px 0;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text)">
9825:         </div>
9826:         <div style="font-size:.72rem;color:#a16207;margin-bottom:4px">📋 Otras notas</div>
9827:         <textarea id="notaAdminInput" rows="2" style="width:100%;background:transparent;border:none;outline:none;font-family:var(--font-b);font-size:.85rem;color:var(--text);resize:none" placeholder="Ej: Debe pagar saldo, viene en transporte...">${(c.notaAdmin||'').replace(/\[PARA:[^\]]*\]\s*/i,'').trim()}</textarea>
9828:         <button class="btn btn-ghost btn-sm" style="margin-top:6px" onclick="guardarNotaAdmin('${c.id}')">Guardar nota</button>
9829:       </div>
9830:       <!-- Mini-historial -->
9831:       ${(()=>{
9832:         const prev = allData.citas.filter(x => x.nombre===c.nombre && x.id!==c.id).sort((a,b)=>(normDate(b.fecha)+b.hora).localeCompare(normDate(a.fecha)+a.hora)).slice(0,3);
9833:         if (!prev.length) return '';
9834:         return `<div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px">
9835:           <div style="font-size:.75rem;color:var(--muted);font-family:var(--font-m);margin-bottom:8px">CITAS ANTERIORES DE ${esc(c.nombre.split(' ')[0].toUpperCase())}</div>
9836:           ${prev.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(27,191,176,.07);font-size:.82rem">
9837:             <span style="font-family:var(--font-m);color:var(--primary);font-size:.75rem">${esc(fmtDate(p.fecha))} ${esc(p.hora)}</span>
9838:             <span style="flex:1;margin:0 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.servicio)}</span>
9839:             ${chipState(p.estado)}
9840:           </div>`).join('')}
```

### Coincidencia 40 — línea 9913

```html
9905: 
9906:   const btn = document.getElementById('btnConfirmarCancelar');
9907:   btn.disabled = true; btn.textContent = 'Cancelando...';
9908: 
9909:   try {
9910:     const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${id}`);
9911:     const d = await r.json();
9912:     if (d.ok) {
9913:       const cita = allData.citas.find(c => c.id === id);
9914:       if (cita) { cita.estado = 'Cancelada'; cita.motivoCancelacion = motivo; }
9915:       saveCancelMotivo(id, motivo);
9916:       if (cita) logChange('Cita cancelada', `${cita.nombre} · ${cita.fecha} ${cita.hora} · ${motivo}`);
9917:       toast(esCancelExcluida(motivo) ? `🧪 Cita cancelada (${motivo} — no afecta KPIs)` : `Cita cancelada: ${motivo}`, 'ok');
9918:       document.getElementById('modalCancelar').style.display = 'none';
9919:       closeModal('modalDetalle');
9920:       initDashboard();
9921:       renderAgenda();
```

### Coincidencia 41 — línea 9963

```html
9955:   kvSet('cancelMotivos', JSON.stringify(map));
9956:   _renderCancelBreakdown();
9957:   renderGestionMes();
9958: }
9959: 
9960: // ── Abrir modal de edición con datos actuales ──
9961: function editarCita(id) {
9962:   try {
9963:     const c = allData.citas.find(x => x.id === id);
9964:     if (!c) { toast('No se encontró la cita', 'err'); return; }
9965: 
9966:     document.getElementById('editId').value     = c.id;
9967:     document.getElementById('editFecha').value  = normDate(c.fecha);
9968:     document.getElementById('editPrecio').value = c.precio || '';
9969:     document.getElementById('editNotas').value  = c.notas  || '';
9970: 
9971:     // Servicio — buscar por texto (opciones con y sin optgroup)
```

### Coincidencia 42 — línea 10042

```html
10034:   const monto = parsePrecio(document.getElementById('editDescMonto').value) || 0;
10035:   if (pct > 0)   return formatPrecio(base - Math.round(base * pct / 100));
10036:   if (monto > 0) return formatPrecio(Math.max(0, base - monto));
10037:   return document.getElementById('editPrecio').value.trim();
10038: }
10039: // ── Guardar los cambios de la edición ──
10040: async function guardarEdicion() {
10041:   const id       = document.getElementById('editId').value;
10042:   const anterior = allData.citas.find(c => c.id === id);
10043:   const servicio = document.getElementById('editServicio').value;
10044:   const modalidad= document.getElementById('editModalidad').value;
10045:   const fecha    = document.getElementById('editFecha').value;
10046:   const hora     = document.getElementById('editHora').value;
10047:   const precio   = getPrecioFinalEdit();
10048:   const notas    = document.getElementById('editNotas').value.trim();
10049:   if (!fecha) { toast('Selecciona una fecha', 'err'); return; }
10050:   if (!validateNoMidnight(hora, 'guardar la cita')) return;
```

### Coincidencia 43 — línea 10390

```html
10382: function updateSesionesInfo() {
10383:   const serv   = document.getElementById('ncService').value;
10384:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10385:   const el     = document.getElementById('ncSesionesInfo');
10386:   if (!el) return;
10387:   const n = sesionesPorPaquete[serv];
10388:   if (n) {
10389:     let html = `📦 Este paquete incluye ${n} sesiones.`;
10390:     if (nombre && allData && allData.citas) {
10391:       const hechas = allData.citas.filter(c =>
10392:         (c.nombre||'').toLowerCase().trim() === nombre &&
10393:         c.servicio === serv && c.estado !== 'Cancelada'
10394:       ).length;
10395:       if (hechas > 0) {
10396:         const rest  = Math.max(0, n - hechas);
10397:         const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10398:         html += `<br><span style="color:${color};font-weight:700">📊 ${hechas} realizadas · ${rest} restantes de ${n}</span>`;
```

### Coincidencia 44 — línea 10391

```html
10383:   const serv   = document.getElementById('ncService').value;
10384:   const nombre = (document.getElementById('ncName').value||'').trim().toLowerCase();
10385:   const el     = document.getElementById('ncSesionesInfo');
10386:   if (!el) return;
10387:   const n = sesionesPorPaquete[serv];
10388:   if (n) {
10389:     let html = `📦 Este paquete incluye ${n} sesiones.`;
10390:     if (nombre && allData && allData.citas) {
10391:       const hechas = allData.citas.filter(c =>
10392:         (c.nombre||'').toLowerCase().trim() === nombre &&
10393:         c.servicio === serv && c.estado !== 'Cancelada'
10394:       ).length;
10395:       if (hechas > 0) {
10396:         const rest  = Math.max(0, n - hechas);
10397:         const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10398:         html += `<br><span style="color:${color};font-weight:700">📊 ${hechas} realizadas · ${rest} restantes de ${n}</span>`;
10399:       }
```

### Coincidencia 45 — línea 10412

```html
10404:     el.style.display = 'none';
10405:   }
10406: }
10407: 
10408: function sesionBadge(nombre, servicio) {
10409:   const n = sesionesPorPaquete[servicio];
10410:   if (!n) return '';
10411:   const norm   = (nombre||'').toLowerCase().trim();
10412:   const hechas = allData.citas.filter(c =>
10413:     (c.nombre||'').toLowerCase().trim() === norm &&
10414:     c.servicio === servicio && c.estado !== 'Cancelada'
10415:   ).length;
10416:   const rest  = Math.max(0, n - hechas);
10417:   const color = rest === 0 ? '#dc2626' : rest === 1 ? '#d97706' : '#059669';
10418:   return `<br><span style="font-size:.72rem;color:${color};font-weight:700">📊 ${hechas}/${n} sesiones · ${rest} restantes</span>`;
10419: }
10420: 
```

### Coincidencia 46 — línea 10515

```html
10507: }
10508: 
10509: // ── REPORTE CONVENIOS (Finanzas) ──
10510: function renderConveniosReport() {
10511:   const filtroMes = document.getElementById('convenioMesFiltro').value; // 'YYYY-MM' o vacío
10512:   const el = document.getElementById('conveniosReportResult');
10513:   if (!el) return;
10514: 
10515:   const citas = (allData.citas || []).filter(c => {
10516:     if (!c.gimnasio) return false;
10517:     if (filtroMes && !normDate(c.fecha).startsWith(filtroMes)) return false;
10518:     return true;
10519:   });
10520: 
10521:   if (!citas.length) {
10522:     el.innerHTML = '<p style="font-size:.85rem;color:var(--muted);text-align:center;padding:20px 0">No hay citas con convenio' + (filtroMes ? ' en este mes' : '') + '.</p>';
10523:     return;
```

### Coincidencia 47 — línea 10943

```html
10935: }
10936: 
10937: function searchPatient(q) {
10938:   const dd = document.getElementById('pacDropdown');
10939:   if (!q || q.length < 2) { dd.style.display='none'; return; }
10940: 
10941:   // Clave única por persona: nombre_normalizado|teléfono (evita colisiones entre distintos pacientes)
10942:   const map = {};
10943:   (allData.citas || []).filter(c => c.estado !== 'Cancelada').forEach(c => {
10944:     const phone = (c.telefono||'').replace(/\D/g,'').slice(-10);
10945:     const key   = _normStr(c.nombre) + '|' + phone;
10946:     if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono, email:c.email, sesiones:0, ultimaDir:c.direccion||''};
10947:     if (!esRegistroServ(c.servicio)) map[key].sesiones++;
10948:     if (c.direccion) map[key].ultimaDir = c.direccion;
10949:   });
10950: 
10951:   // Añadir pacientes de la hoja Pacientes que no estén ya en el mapa
```

### Coincidencia 48 — línea 11053

```html
11045: // ── INDICADOR DUPLICADO BASE DE DATOS ──
11046: function checkDupDB() {
11047:   const val  = document.getElementById('dbNombre').value.trim().toLowerCase();
11048:   const warn = document.getElementById('dbDupWarn');
11049:   if (val.length < 3) { warn.style.display = 'none'; return; }
11050: 
11051:   const fuentes = [
11052:     ...(allData.pacientes || []),
11053:     ...allData.citas.filter(c => !esRegistroServ(c.servicio)).map(c => ({nombre: c.nombre}))
11054:   ];
11055:   const seen = new Set();
11056:   const match = fuentes.find(p => {
11057:     const n = (p.nombre || '').toLowerCase().trim();
11058:     if (seen.has(n)) return false;
11059:     seen.add(n);
11060:     return n.includes(val) || val.includes(n);
11061:   });
```

### Coincidencia 49 — línea 11101

```html
11093:     warn.style.background = 'rgba(245,158,11,.12)';
11094:     warn.style.borderColor = 'rgba(245,158,11,.45)';
11095:     warn.style.color = '#92400e';
11096:     warn.innerHTML = '⚠️ Horario fuera de la jornada habitual. Puedes guardarlo como cita manual especial; quedará visible en agenda y reportes.';
11097:     warn.style.display = 'block';
11098:     return;
11099:   }
11100: 
11101:   const conflicts = allData.citas.filter(c =>
11102:     c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) &&
11103:     normDate(c.fecha) === date && c.hora === time
11104:   );
11105: 
11106:   if (conflicts.length) {
11107:     const lista = conflicts.map(c => `<strong>${c.nombre}</strong> (${c.servicio})`).join(', ');
11108:     warn.style.background = 'rgba(239,68,68,.1)';
11109:     warn.style.borderColor = 'rgba(239,68,68,.4)';
```

### Coincidencia 50 — línea 11191

```html
11183:   (allData.pacientes || []).forEach(p => {
11184:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11185:     const email  = (p.email || '').toLowerCase().trim();
11186:     const nombre = (p.nombre || '').trim();
11187:     const key    = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());
11188:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11189:   });
11190: 
11191:   allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
11192:     const phone  = (c.telefono||'').replace(/\D/g,'').slice(-10);
11193:     const email  = (c.email||'').toLowerCase().trim();
11194:     const nombre = (c.nombre||'').trim();
11195:     // Agrupa por: teléfono (10 dígitos) > email > nombre — evita duplicados
11196:     const key = phone.length >= 10 ? 'p:'+phone : (email ? 'e:'+email : 'n:'+nombre.toLowerCase());
11197: 
11198:     if (!map[key]) map[key] = {nombre, telefono:'', email:'', sesiones:0, ultima:'', ultimoServicio:'', servicios:{}, nombres:[]};
11199:     if (!map[key].nombres.includes(nombre)) map[key].nombres.push(nombre);
```

### Coincidencia 51 — línea 11254

```html
11246:         </div>
11247:       </td>
11248:     </tr>`;
11249:   }).join('');
11250: }
11251: 
11252: function verHistorial(encodedNombre) {
11253:   const nombre = decodeURIComponent(encodedNombre);
11254:   const citas = allData.citas.filter(c => c.nombre === nombre).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11255:   _renderHistorial(nombre, citas);
11256: }
11257: 
11258: function verHistorialPac(idx) {
11259:   const p = _pacs[idx];
11260:   if (!p) return;
11261:   // Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)
11262:   const citas = allData.citas.filter(c => p.nombres.includes(c.nombre)).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
```

### Coincidencia 52 — línea 11262

```html
11254:   const citas = allData.citas.filter(c => c.nombre === nombre).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11255:   _renderHistorial(nombre, citas);
11256: }
11257: 
11258: function verHistorialPac(idx) {
11259:   const p = _pacs[idx];
11260:   if (!p) return;
11261:   // Busca citas de TODOS los nombres del paciente (evita perdidas por duplicados)
11262:   const citas = allData.citas.filter(c => p.nombres.includes(c.nombre)).sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11263:   _renderHistorial(p.nombre, citas);
11264: }
11265: 
11266: function _renderHistorial(nombre, citas) {
11267:   document.getElementById('modalHistorialTitle').textContent = 'Historial: ' + nombre;
11268:   const ref = citas[0] || {};
11269:   document.getElementById('modalHistorialContent').innerHTML = `
11270:     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
```

### Coincidencia 53 — línea 11288

```html
11280:       </div>
11281:       <div style="font-size:.88rem;margin-top:4px">${esc(c.servicio)} · ${esc(c.modalidad)} · ${esc(c.precio)}</div>
11282:       ${c.notas ? `<div style="font-size:.8rem;color:var(--muted);margin-top:4px">${esc(c.notas)}</div>` : ''}
11283:     </div>`).join('')}`;
11284:   openModal('modalHistorial');
11285: }
11286: 
11287: function exportarHistorialPaciente(nombre) {
11288:   const citas = allData.citas.filter(c => c.nombre === nombre)
11289:     .sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
11290:   if (!citas.length) { toast('Sin citas para exportar', 'err'); return; }
11291:   const header = ['Fecha','Hora','Servicio','Modalidad','Valor','Estado','Notas'];
11292:   const rows = citas.map(c => [normDate(c.fecha),c.hora,c.servicio,c.modalidad,c.precio||'',c.estado,c.notas||'']);
11293:   const csv = [header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
11294:   const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
11295:   const a = document.createElement('a');
11296:   a.href = URL.createObjectURL(blob);
```

### Coincidencia 54 — línea 11339

```html
11331:     let totalActualizado = 0;
11332:     for (const oldNombre of oldNombres) {
11333:       const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
11334:       const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
11335:       const d = await r.json();
11336:       if (d.ok) totalActualizado += d.updated || 0;
11337:     }
11338:     // Actualizar en memoria
11339:     allData.citas.forEach(c => {
11340:       if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g,''); c.email = email; }
11341:     });
11342:     toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
11343:     closeModal('modalEditarPaciente');
11344:     renderPacientes();
11345:   } catch(e) { toast('Error de conexión', 'err'); }
11346:   btn.textContent = 'Guardar cambios'; btn.disabled = false;
11347: }
```

### Coincidencia 55 — línea 11358

```html
11350:   const p = _pacs[idx];
11351:   if (!p) return;
11352:   if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
11353:   try {
11354:     // Borrar todos los nombres que usó este paciente
11355:     for (const nombre of p.nombres) {
11356:       await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
11357:     }
11358:     allData.citas = allData.citas.filter(c => !p.nombres.includes(c.nombre));
11359:     toast(`${p.nombre} eliminado/a correctamente`);
11360:     renderPacientes();
11361:     initDashboard();
11362:   } catch(e) { toast('Error de conexión', 'err'); }
11363: }
11364: 
11365: // ── BASE DE DATOS ──
11366: let _dbPacs = [];
```

### Coincidencia 57 — línea 11384

```html
11376:   (allData.pacientes || []).forEach(function(p) {
11377:     const phone  = (p.telefono || '').replace(/\D/g, '').slice(-10);
11378:     const email  = (p.email || '').toLowerCase().trim();
11379:     const nombre = (p.nombre || '').trim();
11380:     const key    = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11381:     if (!map[key]) map[key] = {nombre, telefono: phone, email, sesiones: 0, ultima: p.ultimaVisita || '', ultimoServicio: 'Registro', servicios: {}, nombres: [nombre]};
11382:   });
11383:   // Luego cruzar con citas (actualizan datos si el paciente ya existe)
11384:   (allData.citas || []).forEach(function(c) {
11385:     const phone  = (c.telefono || '').replace(/\D/g, '').slice(-10);
11386:     const email  = (c.email || '').toLowerCase().trim();
11387:     const nombre = (c.nombre || '').trim();
11388:     const key = phone.length >= 10 ? 'p:' + phone : (email ? 'e:' + email : 'n:' + nombre.toLowerCase());
11389:     if (!map[key]) map[key] = {nombre: nombre, telefono: '', email: '', sesiones: 0, ultima: '', ultimoServicio: '', servicios: {}, nombres: []};
11390:     if (map[key].nombres.indexOf(nombre) === -1) map[key].nombres.push(nombre);
11391:     if (phone.length >= 10 && !map[key].telefono) map[key].telefono = phone;
11392:     if (email && !map[key].email) map[key].email = email;
```

### Coincidencia 58 — línea 11447

```html
11439: 
11440:   const dias   = parseInt(document.getElementById('reacDias')?.value || '90', 10);
11441:   const hoy    = today(); // "YYYY-MM-DD"
11442:   const limite = new Date(); limite.setDate(limite.getDate() - dias);
11443:   const limiteStr = limite.toLocalDateStr();
11444: 
11445:   // Agrupar citas por paciente (clave por teléfono o nombre)
11446:   const map = {};
11447:   (allData.citas || []).forEach(c => {
11448:     if (!c.nombre) return;
11449:     const phone = (c.telefono || '').replace(/\D/g, '').slice(-10);
11450:     const key   = phone.length >= 10 ? 'p:' + phone : 'n:' + c.nombre.toLowerCase().trim();
11451:     if (!map[key]) map[key] = { nombre: c.nombre, telefono: phone, ultimaPasada: '', proximaFutura: '' };
11452:     const fd = normDate(c.fecha);
11453:     if (fd && fd <= hoy) {
11454:       if (!map[key].ultimaPasada || fd > map[key].ultimaPasada) map[key].ultimaPasada = fd;
11455:     }
```

### Coincidencia 59 — línea 11610

```html
11602:     try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
11603:     let totalActualizado = 0;
11604:     for (const oldNombre of oldNombres) {
11605:       const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
11606:       const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
11607:       const d = await r.json();
11608:       if (d.ok) totalActualizado += d.updated || 0;
11609:     }
11610:     allData.citas.forEach(c => {
11611:       if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g, ''); c.email = email; }
11612:     });
11613:     const oldLabel = oldNombres.join(' / ');
11614:     logChange('Paciente editado', oldLabel !== newNombre ? `${oldLabel} → ${newNombre}` : `${newNombre} (datos actualizados)`);
11615:     toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
11616:     closeModal('modalEditarPaciente');
11617:     renderBasedatos();
11618:   } catch(e) { toast('Error de conexión', 'err'); }
```

### Coincidencia 60 — línea 11632

```html
11624:   if (!p) return;
11625:   if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
11626:   try {
11627:     for (const nombre of p.nombres) {
11628:       const r = await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
11629:       const d = await r.json();
11630:       if (!d.ok) { toast('Error al eliminar: ' + (d.error || 'intenta de nuevo'), 'err'); return; }
11631:     }
11632:     allData.citas    = allData.citas.filter(c => !p.nombres.includes(c.nombre));
11633:     allData.pacientes = (allData.pacientes || []).filter(p2 => !p.nombres.map(n => n.toLowerCase()).includes((p2.nombre||'').toLowerCase()));
11634:     logChange('Paciente eliminado', `${p.nombre} · ${p.sesiones} cita(s)`);
11635:     toast(`${p.nombre} eliminado/a correctamente`);
11636:     renderBasedatos();
11637:     initDashboard();
11638:   } catch(e) { toast('Error de conexión', 'err'); }
11639: }
11640: 
```

### Coincidencia 62 — línea 11803

```html
11795:   HOURS.forEach(h => {
11796:     html += `<div class="cal-body-row"><div class="cal-time-cell">${pad(h)}:00</div>`;
11797:     days.forEach(d => {
11798:       const ds = toDateStr(d);
11799:       const isT = ds === todayStr;
11800:       html += `<div class="cal-day-cell ${isT?'cal-today':''}" onclick="openNuevaCitaFromCal('${ds}',${h})">`;
11801: 
11802:       // Citas del sistema
11803:       allData.citas.forEach(c => {
11804:         if (c.estado === 'Cancelada') return;
11805:         if (c.servicio === 'Registro') return;
11806:         if (normDate(c.fecha) !== ds) return;
11807:         if (!c.hora) return;
11808:         const [ch] = c.hora.split(':').map(Number);
11809:         if (ch !== h) return;
11810:         const cls = c.estado==='Confirmada'?'cal-ev-ok':c.estado==='Atendida'?'cal-ev-info':c.estado==='Cancelada'?'cal-ev-err':'cal-ev-warn';
11811:         html += `<div class="cal-ev ${cls}" onclick="event.stopPropagation();verDetalle('${c.id}')">
```

### Coincidencia 63 — línea 12129

```html
12121: 
12122:     // Filtrar stop words del interior del nombre
12123:     const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
12124:     const rawName   = nameWords.join(' ');
12125:     if (!rawName) { /* no se capturó nombre válido */ }
12126:     else {
12127:       const normName = _norm(rawName);
12128:       // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
12129:       const known = allData.citas.find(c => {
12130:         const cn = _norm(c.nombre);
12131:         const parts = normName.split(' ');
12132:         // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
12133:         return cn === normName
12134:           || cn.includes(normName)
12135:           || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
12136:           || (parts.length === 1 && cn.startsWith(parts[0]));
12137:       });
```

### Coincidencia 64 — línea 12405

```html
12397:   const lista = document.getElementById('segLista');
12398:   if (!lista) return;
12399:   lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
12400: 
12401:   const now = new Date(); now.setHours(0,0,0,0);
12402: 
12403:   // Mapa: última descarga por paciente
12404:   const map = {};
12405:   allData.citas
12406:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
12407:     .forEach(c => {
12408:       const nombre = (c.nombre||'').trim();
12409:       const fecha  = normDate(c.fecha);
12410:       if (!nombre || !fecha) return;
12411:       if (!map[nombre] || fecha > map[nombre].fecha) {
12412:         map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12413:       }
```

### Coincidencia 65 — línea 12430

```html
12422:     if      (dias >= 35 && dias < 42) semana = 'sem3';
12423:     else if (dias >= 42 && dias < 49) semana = 'sem4';
12424:     else if (dias >= 49)              semana = 'sem5';
12425:     return { ...p, dias, semana };
12426:   }).filter(p => p.semana !== null);
12427: 
12428:   // Mapa: última readaptación por paciente
12429:   const mapR = {};
12430:   allData.citas
12431:     .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esReadaptacion(c.servicio))
12432:     .forEach(c => {
12433:       const nombre = (c.nombre||'').trim();
12434:       const fecha  = normDate(c.fecha);
12435:       if (!nombre || !fecha) return;
12436:       if (!mapR[nombre] || fecha > mapR[nombre].fecha) {
12437:         mapR[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
12438:       }
```

### Coincidencia 66 — línea 12675

```html
12667:   document.getElementById('ncName').value  = decodeURIComponent(encNombre);
12668:   document.getElementById('ncPhone').value = decodeURIComponent(encTel);
12669:   document.getElementById('ncEmail').value = decodeURIComponent(encEmail);
12670:   document.getElementById('pacSearch').value = decodeURIComponent(encNombre);
12671:   toast('Datos cargados. Completa fecha, hora y servicio.');
12672: }
12673: 
12674: async function limpiarCitasSinHora() {
12675:   const sinHora = (allData.citas || []).filter(c => (!c.hora || isMidnightTime(c.hora)) && c.estado !== 'Cancelada');
12676:   if (sinHora.length === 0) { toast('No hay citas a medianoche/sin hora — todo está limpio ✓', 'ok'); return; }
12677:   const detalle = sinHora.map(c => `• ${c.nombre} — ${c.servicio} — ${c.fecha} — hora: ${c.hora || 'sin hora'} — estado: ${c.estado}`).join('\n');
12678:   if (!confirm(`Se encontraron ${sinHora.length} cita(s) guardadas entre 00:00 y 00:59 o sin hora:\n\n${detalle}\n\nEsto elimina esas filas de la base de datos. ¿Continuar?`)) return;
12679:   const btn = document.getElementById('btnLimpiarSinHora');
12680:   btn.textContent = 'Limpiando...'; btn.disabled = true;
12681:   try {
12682:     const r = await fetch(`${APPS_SCRIPT_URL}?action=cleanCitasSinHora&token=${encodeURIComponent(TOKEN)}`);
12683:     const d = await r.json();
```

### Coincidencia 67 — línea 12913

```html
12905: 
12906:   btn.disabled = true;
12907:   btn.textContent = 'Limpiando...';
12908:   let eliminadas = 0, errores = 0;
12909:   for (const dup of dups) {
12910:     try {
12911:       const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(dup.id)}`).then(x => x.json());
12912:       if (r.ok) {
12913:         const cita = allData.citas.find(c => c.id === dup.id);
12914:         if (cita) cita.estado = 'Cancelada';
12915:         eliminadas++;
12916:       } else errores++;
12917:     } catch(e) { errores++; }
12918:   }
12919:   btn.disabled = false;
12920:   btn.textContent = 'Limpiar duplicados';
12921:   toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
```

### Coincidencia 68 — línea 12927

```html
12919:   btn.disabled = false;
12920:   btn.textContent = 'Limpiar duplicados';
12921:   toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
12922:   if (eliminadas > 0) { initDashboard(); renderFinanzas(); }
12923: }
12924: 
12925: function detectarDuplicados() {
12926:   const grupos = {};
12927:   for (const c of allData.citas) {
12928:     if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) continue;
12929:     const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
12930:     if (!grupos[key]) grupos[key] = [];
12931:     grupos[key].push(c);
12932:   }
12933:   const dups = [];
12934:   for (const key in grupos) {
12935:     const arr = grupos[key];
```

### Coincidencia 69 — línea 13050

```html
13042:           <div class="serv-val">$${Math.round(v/1000)}k</div>
13043:         </div>`).join('');
13044:     }
13045:   }
13046: 
13047:   // ── Resumen del mes ──
13048:   const todayStr2    = today();
13049:   const citasMes     = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
13050:   const canceladasN  = allData.citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y && c.estado==='Cancelada' && !esRegistroServ(c.servicio); }).length;
13051:   const pasadasN     = citasMes.filter(c => normDate(c.fecha) <= todayStr2).length;
13052:   const futurasN     = citasMes.filter(c => normDate(c.fecha) > todayStr2).length;
13053:   const eventosValFuturas = (allData.eventos || [])
13054:     .filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y && normDate(e.fecha) > todayStr2; })
13055:     .reduce((s,e) => s + parsePrecio(e.cobro), 0);
13056:   const futurasVal   = citasMes.filter(c => normDate(c.fecha) > todayStr2).reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosValFuturas;
13057:   const ingresoPaquetesMes = calcIngresoPaquetesMes(m, y);
13058:   const ticketProm   = pasadasN > 0 ? Math.round(cobradoMes / pasadasN) : 0;
```

### Coincidencia 70 — línea 13389

```html
13381: 
13382: function calcBDActualizada(mesParam, anyoParam) {
13383:   const now = new Date();
13384:   const m = mesParam  || now.getMonth() + 1;
13385:   const y = anyoParam || now.getFullYear();
13386: 
13387:   // Pacientes únicos atendidos este mes (no cancelados)
13388:   const pacMap = {};
13389:   (allData.citas || []).filter(c => {
13390:     const [cy,cm] = normDate(c.fecha).split('-');
13391:     return +cm===m && +cy===y && !(c.estado||'').toLowerCase().includes('cancel');
13392:   }).forEach(c => {
13393:     const key = (c.nombre||'').trim().toLowerCase();
13394:     if (!key) return;
13395:     if (!pacMap[key]) pacMap[key] = {nombre: c.nombre, telefono: '', email: ''};
13396:     if (c.telefono) pacMap[key].telefono = c.telefono;
13397:     if (c.email)    pacMap[key].email    = c.email;
```

### Coincidencia 71 — línea 13710

```html
13702:     const canal = c.canal || 'Directo';
13703:     canalMap[canal] = (canalMap[canal] || 0) + parsePrecio(c.precio);
13704:   });
13705:   const totalCanales = Object.values(canalMap).reduce((s,v) => s+v, 0);
13706:   const canalTop = Object.entries(canalMap).sort((a,b) => b[1]-a[1])[0];
13707:   const canalTopTxt = canalTop ? `${canalTop[0]}: ${fmtPeso(canalTop[1])}` : 'Sin datos';
13708: 
13709:   // ───── KPI: Tasa de cancelación (mes actual) ─────
13710:   // IMPORTANTE: usa allData.citas (no citasReales) para contar canceladas reales
13711:   // Las marcadas como "Prueba" se excluyen de la tasa de cancelación
13712:   const _motivosMes = getCancelMotivos();
13713:   const todasCitasMes = (allData.citas || []).filter(c => {
13714:     const [cy,cm] = normDate(c.fecha).split('-');
13715:     return +cm===m && +cy===y;
13716:   });
13717:   const canceladasMes = todasCitasMes.filter(c =>
13718:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosMes[c.id])
```

### Coincidencia 72 — línea 13713

```html
13705:   const totalCanales = Object.values(canalMap).reduce((s,v) => s+v, 0);
13706:   const canalTop = Object.entries(canalMap).sort((a,b) => b[1]-a[1])[0];
13707:   const canalTopTxt = canalTop ? `${canalTop[0]}: ${fmtPeso(canalTop[1])}` : 'Sin datos';
13708: 
13709:   // ───── KPI: Tasa de cancelación (mes actual) ─────
13710:   // IMPORTANTE: usa allData.citas (no citasReales) para contar canceladas reales
13711:   // Las marcadas como "Prueba" se excluyen de la tasa de cancelación
13712:   const _motivosMes = getCancelMotivos();
13713:   const todasCitasMes = (allData.citas || []).filter(c => {
13714:     const [cy,cm] = normDate(c.fecha).split('-');
13715:     return +cm===m && +cy===y;
13716:   });
13717:   const canceladasMes = todasCitasMes.filter(c =>
13718:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosMes[c.id])
13719:   ).length;
13720:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
13721: 
```

### Coincidencia 73 — línea 13730

```html
13722:   // ───── KPI: CAC (Costo de Adquisición de Cliente) ─────
13723:   const hoyKPI = new Date();
13724:   const ventanaAtras = new Date(hoyKPI); ventanaAtras.setDate(hoyKPI.getDate() - VENTANA_NUEVO_DIAS);
13725:   const pacientesMes = new Set();
13726:   citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
13727:     .forEach(c => { if (c.nombre) pacientesMes.add(c.nombre.trim().toLowerCase()); });
13728:   let nuevosCount = 0;
13729:   pacientesMes.forEach(pac => {
13730:     const citasPrevias = allData.citas.filter(c => {
13731:       if (!c.nombre || c.nombre.trim().toLowerCase() !== pac) return false;
13732:       const f = new Date(normDate(c.fecha) + 'T12:00:00');
13733:       return f >= ventanaAtras && f < new Date(y, m-1, 1);
13734:     });
13735:     if (citasPrevias.length === 0) nuevosCount++;
13736:   });
13737:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
13738:   const egresosMktMes = getEgresos().filter(e => {
```

### Coincidencia 74 — línea 13839

```html
13831:     .slice(0, limit)
13832:     .map(([k,v]) => `${k}: ${v}`)
13833:     .join('\n') || 'Sin datos registrados';
13834: }
13835: 
13836: function _copyGestionData() {
13837:   const now = new Date();
13838:   const monthKey = _copyGestionMesKey(now);
13839:   const citasAll = allData.citas || [];
13840:   const eventosAll = allData.eventos || [];
13841:   const pacientesAll = allData.pacientes || [];
13842:   const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
13843:   const manual = getKPIManual ? getKPIManual() : {};
13844:   const cfg = getKPIConfig ? getKPIConfig() : {};
13845:   const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
13846:   const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
13847:   const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
```

### Coincidencia 75 — línea 14172

```html
14164:   const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
14165:   return _copyPlainText(text);
14166: }
14167: 
14168: function copiarInfoPersonaGestion() {
14169:   const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
14170:   if (!nombre) return;
14171:   const key = nombre.trim().toLowerCase();
14172:   const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
14173:   if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
14174:   citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
14175:   const c0 = citas[0];
14176:   const total = citas.length;
14177:   const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
14178:   const text = [
14179:     'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
14180:     '',
```

### Coincidencia 76 — línea 14351

```html
14343:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
14344:   const nomMes = MESES[m - 1];
14345: 
14346:   const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
14347:   document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;
14348: 
14349:   const citas  = citasReales();
14350:   const manual = getKPIManual();
14351:   const todasCitas = allData.citas || [];
14352:   const eventosAll = allData.eventos || [];
14353: 
14354:   // ══════════ CÁLCULOS ══════════
14355: 
14356:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
14357:   const metaSesionesMes = META_SESIONES_SEMANA * 4;
14358: 
14359:   // ── Citas del mes ──
```

### Coincidencia 77 — línea 15064

```html
15056:   const m     = now.getMonth() + 1;
15057:   const y     = now.getFullYear();
15058:   const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
15059:   const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
15060:   const mesStr = `${y}-${String(m).padStart(2,'0')}`;
15061:   const sep  = n => '─'.repeat(n);
15062: 
15063:   const citas      = citasReales();
15064:   const todasCitas = allData.citas || [];
15065:   const eventosAll = allData.eventos || [];
15066:   const manual     = getKPIManual();
15067:   const costos     = getCostosEstructura();
15068:   const calc       = calcTotalCostos(costos);
15069: 
15070:   // ── Sesiones ──
15071:   const citasMes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado!=='No asistió'; });
15072:   const eventosMes = eventosAll.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m&&+cy===y; });
```

### Coincidencia 78 — línea 15621

```html
15613:   const _pacUnicosMes = {};
15614:   citas.filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; })
15615:     .forEach(c => { if (c.nombre) _pacUnicosMes[c.nombre.trim().toLowerCase()] = c.nombre.trim(); });
15616:   const _listaRecurrentes = Object.values(_pacUnicosMes).sort();
15617:   const _stRecurrentes = _listaRecurrentes.length;
15618: 
15619:   // Extra — Cancelaciones mes (excluye pruebas)
15620:   const _motivosGuia  = getCancelMotivos();
15621:   const todasCitasMes = (allData.citas || []).filter(c => { const [cy,cm] = normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
15622:   const canceladasMes = todasCitasMes.filter(c =>
15623:     (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(_motivosGuia[c.id])
15624:   ).length;
15625:   const tasaCancel = todasCitasMes.length > 0 ? Math.round((canceladasMes / todasCitasMes.length) * 100) : 0;
15626: 
15627:   // Extra — Retención 60 días (ventana relativa al fin del mes seleccionado)
15628:   const refDate = esMesActual ? now : new Date(y, m, 0); // último día del mes seleccionado
15629:   const hace60  = new Date(refDate); hace60.setDate(refDate.getDate() - VENTANA_RETENCION);
```

### Coincidencia 79 — línea 15846

```html
15838:   const diaSemana  = now.getDay() === 0 ? 6 : now.getDay() - 1;
15839:   const lunesSem   = new Date(now); lunesSem.setDate(now.getDate() - diaSemana);
15840:   const domingoSem = new Date(lunesSem); domingoSem.setDate(lunesSem.getDate() + 6);
15841:   const toStr = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
15842: 
15843:   const motivos = getCancelMotivos();
15844: 
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15851:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
15852: 
15853:   const cancelSem = (allData.citas || []).filter(c => {
15854:     const f = normDate(c.fecha);
```

### Coincidencia 80 — línea 15853

```html
15845:   // Excluir pruebas del análisis real
15846:   const cancelMesAll = (allData.citas || []).filter(c => {
15847:     const [cy,cm] = normDate(c.fecha).split('-');
15848:     return +cm===m && +cy===y && (c.estado||'').toLowerCase().includes('cancel');
15849:   });
15850:   const cancelMesPruebas = cancelMesAll.filter(c => esCancelExcluida(motivos[c.id]));
15851:   const cancelMes        = cancelMesAll.filter(c => !esCancelExcluida(motivos[c.id]));
15852: 
15853:   const cancelSem = (allData.citas || []).filter(c => {
15854:     const f = normDate(c.fecha);
15855:     return f >= toStr(lunesSem) && f <= toStr(domingoSem)
15856:       && (c.estado||'').toLowerCase().includes('cancel')
15857:       && !esCancelExcluida(motivos[c.id]);
15858:   });
15859: 
15860:   // Breakdown por servicio y día (solo cancelaciones reales)
15861:   const srvMap = {}, diaMap = {}, motivoMap = {};
```

### Coincidencia 81 — línea 15874

```html
15866:     diaMap[DIAS[d.getDay()]] = (diaMap[DIAS[d.getDay()]]||0) + 1;
15867:     const mot = motivos[c.id] || 'Sin registrar';
15868:     motivoMap[mot] = (motivoMap[mot]||0) + 1;
15869:   });
15870: 
15871:   const topServ  = Object.entries(srvMap).sort((a,b)=>b[1]-a[1]);
15872:   const topDia   = Object.entries(diaMap).sort((a,b)=>b[1]-a[1]);
15873:   const topMotiv = Object.entries(motivoMap).sort((a,b)=>b[1]-a[1]);
15874:   const total    = (allData.citas||[]).filter(c=>{ const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; }).length;
15875:   const pct      = total > 0 ? Math.round((cancelMes.length/total)*100) : 0;
15876:   const color    = pct < 10 ? 'var(--ok)' : pct <= 20 ? '#f59e0b' : '#ef4444';
15877: 
15878:   if (!cancelMesAll.length) {
15879:     el.innerHTML = `<div style="font-size:.8rem;color:var(--ok)">🟢 Sin cancelaciones registradas este mes.</div>`;
15880:     return;
15881:   }
15882: 
```

### Coincidencia 82 — línea 16800

```html
16792:   const meses4 = [];
16793:   for (let i = 3; i >= 0; i--) {
16794:     const d = new Date(now2.getFullYear(), now2.getMonth()-i, 1);
16795:     meses4.push({ m: d.getMonth()+1, y: d.getFullYear(), label: MESES[d.getMonth()] });
16796:   }
16797:   const cancelEl = document.getElementById('metricCancelacion');
16798:   if (cancelEl) {
16799:     const rows = meses4.map(mes => {
16800:       const todasMes = allData.citas.filter(c => {
16801:         const [cy,cm] = normDate(c.fecha).split('-');
16802:         return +cm===mes.m && +cy===mes.y && !esRegistroServ(c.servicio);
16803:       });
16804:       const canceladas = todasMes.filter(c => c.estado === 'Cancelada').length;
16805:       const total = todasMes.length || 1;
16806:       const pct = Math.round(canceladas / total * 100);
16807:       const color = pct >= 30 ? '#ef4444' : pct >= 15 ? '#f59e0b' : 'var(--ok)';
16808:       return `<div class="metric-row">
```

### Coincidencia 83 — línea 17078

```html
17070:   renderConveniosReport();
17071:   _checkAutoAtendida();
17072:   _checkCobrosPendientes();
17073: }
17074: 
17075: // ── Automatización #2: marcar citas pasadas como Atendidas ──
17076: function _checkAutoAtendida() {
17077:   const nowMs = Date.now();
17078:   const pendientes = (allData.citas || []).filter(c => {
17079:     if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
17080:     if (esRegistroServ(c.servicio)) return false;
17081:     const f = normDate(c.fecha);
17082:     if (!f || !c.hora) return false;
17083:     const [hh, mm] = c.hora.split(':').map(Number);
17084:     const citaEnd = new Date(f + 'T' + c.hora);
17085:     citaEnd.setMinutes(citaEnd.getMinutes() + 60);
17086:     return citaEnd.getTime() < nowMs;
```

### Coincidencia 84 — línea 17143

```html
17135:     </div>`;
17136:   }).join('');
17137: }
17138: 
17139: function openPago(citaId) {
17140:   showView('pagos');
17141:   setTimeout(() => {
17142:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17143:     const selector = document.getElementById('payCitaId');
17144:     if (selector) {
17145:       selector.value = citaId || '';
17146:       selector.dispatchEvent(new Event('change', { bubbles: true }));
17147:       selector.focus();
17148:       selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
17149:     } else {
17150:       toast('Se abrió Pagos, pero no se encontró la cita seleccionada', 'warn');
17151:     }
```

### Coincidencia 85 — línea 17685

```html
17677:   const recs      = [];
17678: 
17679:   const DIAS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
17680:   const toStr = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
17681: 
17682:   // ── Histórico: últimas 12 semanas (excluye la semana seleccionada) ──
17683:   const lunD = lunes instanceof Date ? lunes : new Date((lunes||today())+'T12:00:00');
17684:   const lunesHace12 = new Date(lunD); lunesHace12.setDate(lunD.getDate()-84);
17685:   const histCitas = (allData.citas||[]).filter(c => {
17686:     const f = normDate(c.fecha); if (!f) return false;
17687:     const fD = new Date(f+'T12:00:00');
17688:     return fD < lunD && fD >= lunesHace12;
17689:   });
17690: 
17691:   // Promedio por día de semana (dow 0=Dom … 6=Sáb)
17692:   const histDow = {};
17693:   histCitas.forEach(c => {
```

### Coincidencia 86 — línea 17923

```html
17915:   if (s.includes('valoracion'))   return { tipo:'valoracion',   diasDelay:1, label:'Valoración funcional' };
17916:   if (s.includes('readaptacion')) return { tipo:'readaptacion', diasDelay:1, label:'Readaptación funcional' };
17917:   return null;
17918: }
17919: function generarTareas() {
17920:   const hoyStr = today();
17921:   const hoy = new Date(hoyStr+'T12:00:00');
17922:   const tareas = [], seen = new Set();
17923:   allData.citas.forEach(c => {
17924:     if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return;
17925:     const ft = _tareaFechaTipo(c);
17926:     if (!ft) return;
17927:     const fSesion = normDate(c.fecha);
17928:     if (!fSesion) return;
17929:     if (fSesion < ADMIN_OPERATIONS_START_DATE) return;
17930:     const diasDiff = Math.round((hoy - new Date(fSesion+'T12:00:00')) / 86400000);
17931:     if (diasDiff < ft.diasDelay) return;
```

### Coincidencia 87 — línea 18146

```html
18138:   }).join('');
18139: }
18140: function abrirModalPaquete(plIdxPre) {
18141:   const plantillas = _getPkPlantillas();
18142:   const sel = document.getElementById('pkPlantillaSel');
18143:   if (sel) sel.innerHTML = '<option value="">— Elige plantilla —</option>' + plantillas.map((pl,i) => `<option value="${i}" ${i===plIdxPre?'selected':''}>${pl.nombre}</option>`).join('');
18144:   const dl = document.getElementById('pkPacienteList');
18145:   if (dl) {
18146:     const nomCitas = allData.citas.map(c=>c.nombre||'').filter(Boolean);
18147:     const nomPacs  = (allData.pacientes||[]).map(p=>p.nombre||'').filter(Boolean);
18148:     const todos    = [...new Set([...nomCitas, ...nomPacs])].sort();
18149:     dl.innerHTML   = todos.map(n=>`<option value="${n}">`).join('');
18150:   }
18151:   const fi = document.getElementById('pkFechaCompra'); if (fi) fi.value = today();
18152:   const pkModal = document.getElementById('modalPaquete'); if (pkModal) pkModal.style.display = 'flex';
18153: }
18154: function guardarPaqueteAsignado() {
```

### Coincidencia 88 — línea 18600

```html
18592: // ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
18593: const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
18594: let _pasTelefono = '';
18595: let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
18596: let _pasCurrent = null;
18597: 
18598: function _pasGetDB() {
18599:   const map = {};
18600:   allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
18601:     const key = (c.nombre || '').toLowerCase().trim();
18602:     if (key && !map[key]) map[key] = { nombre: c.nombre, telefono: c.telefono || '' };
18603:   });
18604:   (allData.pacientes || []).forEach(p => {
18605:     const key = (p.nombre || '').toLowerCase().trim();
18606:     if (key && !map[key]) map[key] = { nombre: p.nombre, telefono: p.telefono || '' };
18607:   });
18608:   return map;
```

### Coincidencia 89 — línea 20102

```html
20094:   if (!panel) return;
20095: 
20096:   const now   = new Date();
20097:   const mes   = now.getMonth();
20098:   const anio  = now.getFullYear();
20099:   const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
20100:   const mesStr = MESES[mes];
20101: 
20102:   const citas = (allData.citas || []).filter(c => {
20103:     if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
20104:     const [y, m] = c.fecha.split('-');
20105:     return +y === anio && +m === (mes + 1);
20106:   });
20107: 
20108:   const vistos = {};
20109:   const pacientes = [];
20110:   citas.forEach(c => {
```
