/* Cuidándote Fisioterapia — Códigos de referidos y bonos. */
(function (global) {
  'use strict';

  const BONO_VALOR   = 20000;
  const BONO_MAX_MES = 2;
  const _MES_EN = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function _mesAbrevActual() { return _MES_EN[new Date().getMonth()]; }

function _bonosReferidorMes(referidoPor) {
  const mes = _mesAbrevActual();
  return (allData.codigos || []).filter(c =>
    c.tipo === 'BONO' &&
    (c.paciente || '').toLowerCase().trim() === (referidoPor || '').toLowerCase().trim() &&
    (c.codigo || '').split('-')[1] === mes
  );
}

function updateBonosBadge() {
  const codigos = allData.codigos || [];
  const refConBono = new Set(codigos.filter(c => c.tipo === 'BONO').map(c => c.codigoRef));
  const pendientes = codigos.filter(c => c.tipo === 'REF' && !refConBono.has(c.codigo) && c.estado !== 'Usado');

  // Sidebar badge
  const badge = document.getElementById('badgeBonos');
  if (badge) {
    if (pendientes.length > 0) { badge.textContent = pendientes.length; badge.style.display = 'inline-block'; }
    else { badge.style.display = 'none'; }
  }

  // Dashboard banner
  const bannerBonos = document.getElementById('bannerBonos');
  if (bannerBonos) {
    if (pendientes.length > 0) {
      const nombres = pendientes.map(c => `<strong>${c.referidoPor || '—'}</strong> (por haber referido a ${c.paciente || '?'})`).join(' · ');
      document.getElementById('bannerBonosTxt').innerHTML = nombres;
      bannerBonos.style.display = 'flex';
    } else {
      bannerBonos.style.display = 'none';
    }
  }

  // Banner detallado en vista Códigos
  const bonoPendingBanner = document.getElementById('bonoPendingBanner');
  const bonoPendingLista  = document.getElementById('bonoPendingLista');
  if (bonoPendingBanner && bonoPendingLista) {
    if (pendientes.length > 0) {
      bonoPendingLista.innerHTML = pendientes.map(c => `
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.6);border:1px solid rgba(217,119,6,.25);border-radius:8px;padding:8px 12px">
          <span style="font-family:var(--font-m);font-size:.8rem;font-weight:700;color:#7c3aed;background:rgba(139,92,246,.1);padding:2px 8px;border-radius:6px;white-space:nowrap">${esc(c.codigo)}</span>
          <div style="flex:1;font-size:.85rem">
            <strong style="color:#92400e">${c.referidoPor || '—'}</strong>
            <span style="color:var(--muted)"> tiene bono pendiente — refirió a <strong>${c.paciente || '?'}</strong></span>
          </div>
          <span style="font-family:var(--font-m);font-size:.75rem;color:var(--muted)">${c.fecha || ''}</span>
          ${_bonosReferidorMes(c.referidoPor||'').length >= BONO_MAX_MES
            ? `<span style="font-size:.75rem;color:#92400e;opacity:.65;padding:3px 8px;border:1px solid rgba(234,179,8,.25);border-radius:6px;white-space:nowrap">🔒 Límite mensual</span>`
            : `<button class="btn btn-sm" onclick="generarBono('${c.codigo}','${(c.referidoPor||'').replace(/'/g,"\\'")}','${(c.telefono||'').replace(/'/g,"\\'")}' )"
                style="background:rgba(234,179,8,.15);color:#92400e;border:1px solid rgba(234,179,8,.4);font-size:.75rem;white-space:nowrap">
                🎁 Bono $${BONO_VALOR.toLocaleString('es-CO')}
              </button>`
          }
        </div>`).join('');
      bonoPendingBanner.style.display = 'block';
    } else {
      bonoPendingBanner.style.display = 'none';
    }
  }
}

function renderCodigos() {
  const tbody  = document.getElementById('codigosTbody');
  const search = (document.getElementById('codSearch')?.value || '').toLowerCase();
  const fTipo  = document.getElementById('codTipoFilter')?.value || '';
  const fEst   = document.getElementById('codEstadoFilter')?.value || '';

  let lista = [...(allData.codigos || [])];
  if (search) lista = lista.filter(c =>
    (c.codigo+c.paciente+c.referidoPor+c.codigoRef+(c.fecha||'')).toLowerCase().includes(search));
  if (fTipo) lista = lista.filter(c => c.tipo === fTipo);
  if (fEst)  lista = lista.filter(c => c.estado === fEst);

  // Ordenar: más recientes primero
  lista.sort((a,b) => (b.codigo).localeCompare(a.codigo));

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty"><p>No hay códigos registrados aún</p><p style="font-size:.8rem;color:var(--muted);margin-top:6px">Los códigos REF se generan al agregar un paciente con origen <strong>Referido</strong></p></div></td></tr>`;
    return;
  }

  // Construir mapa de qué REF ya tienen BONO
  const refConBono = new Set(lista.filter(c=>c.tipo==='BONO').map(c=>c.codigoRef));

  tbody.innerHTML = lista.map(c => {
    const esREF   = c.tipo === 'REF';
    const chipColor = esREF ? 'background:rgba(139,92,246,.12);color:#7c3aed;border:1px solid rgba(139,92,246,.3)'
                            : 'background:rgba(234,179,8,.12);color:#92400e;border:1px solid rgba(234,179,8,.3)';
    const estadoChip = c.estado === 'Activo'
      ? `<span class="chip chip-ok" style="font-size:.7rem">${c.estado}</span>`
      : `<span class="chip chip-no" style="font-size:.7rem">${c.estado}</span>`;
    const vinculo = c.tipo === 'BONO' && c.codigoRef
      ? `<span style="font-family:var(--font-m);font-size:.8rem;color:var(--muted)">← ${c.codigoRef}</span>`
      : (c.tipo === 'REF' && refConBono.has(c.codigo)
          ? `<span style="font-family:var(--font-m);font-size:.8rem;color:#92400e">BONO-${c.codigo.slice(4)} ✓</span>`
          : '—');
    const _bonosMesRef = esREF ? _bonosReferidorMes(c.referidoPor || '') : [];
    const _topeMes     = _bonosMesRef.length >= BONO_MAX_MES;
    const btnBono = esREF && !refConBono.has(c.codigo)
      ? (_topeMes
          ? `<span style="font-size:.75rem;color:#92400e;opacity:.6;padding:3px 8px;border:1px solid rgba(234,179,8,.25);border-radius:6px;background:rgba(234,179,8,.07)">🔒 Límite mensual (${BONO_MAX_MES}/${BONO_MAX_MES})</span>`
          : `<button class="btn btn-sm" onclick="generarBono('${c.codigo}','${(c.referidoPor||'').replace(/'/g,"\\'")}','${(c.telefono||'').replace(/'/g,"\\'")}' )"
               style="background:rgba(234,179,8,.12);color:#92400e;border:1px solid rgba(234,179,8,.3);font-size:.75rem">
               🎁 Generar Bono $${BONO_VALOR.toLocaleString('es-CO')} <span style="opacity:.65">(${_bonosMesRef.length}/${BONO_MAX_MES} mes)</span>
             </button>`)
      : '';
    const btnMarcar = c.estado === 'Activo'
      ? `<button class="btn btn-sm" onclick="marcarUsado('${c.codigo}')"
           style="background:rgba(107,114,128,.1);color:#374151;border:1px solid rgba(107,114,128,.25);font-size:.75rem">
           ✓ Usado
         </button>`
      : '';

    return `<tr>
      <td><span style="font-family:var(--font-m);font-size:.88rem;font-weight:700;padding:3px 8px;border-radius:6px;${chipColor}">${c.codigo}</span></td>
      <td><strong style="font-size:.88rem">${esc(c.paciente||'—')}</strong>${c.telefono?`<br><small style="color:var(--muted)">${c.telefono}</small>`:''}</td>
      <td style="font-size:.85rem">${esc(c.referidoPor||'—')}</td>
      <td style="font-family:var(--font-m);font-size:.78rem;color:var(--muted)">${c.fecha||''}</td>
      <td>${estadoChip}</td>
      <td>${vinculo}</td>
      <td><div style="display:flex;gap:6px;flex-wrap:wrap">${btnBono}${btnMarcar}</div></td>
    </tr>`;
  }).join('');

  updateBonosBadge();
}

async function marcarUsado(codigo) {
  if (!confirm(`¿Marcar ${codigo} como Usado?\nEsto cambiará el estado en Google Sheets.`)) return;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=actualizarCodigo&token=${encodeURIComponent(TOKEN)}&codigo=${encodeURIComponent(codigo)}&estado=Usado`);
    const d = await r.json();
    if (!d.ok) { toast('Error al actualizar el estado', 'err'); return; }
    toast(`${codigo} marcado como Usado ✓`);
    await reload();
    renderCodigos();
  } catch(e) { toast('Error de conexión', 'err'); }
}

async function generarBono(codigoRef, referidoPor, telefonoRef) {
  const bonosMes = _bonosReferidorMes(referidoPor);
  if (bonosMes.length >= BONO_MAX_MES) {
    toast(`${referidoPor || 'Este paciente'} ya tiene ${BONO_MAX_MES} bonos este mes — límite alcanzado`, 'err');
    return;
  }
  if (!confirm(`¿Generar bono de $${BONO_VALOR.toLocaleString('es-CO')} para ${referidoPor || 'quien refirió'}?\nBonos este mes: ${bonosMes.length + 1}/${BONO_MAX_MES}\nSe descontará en su próxima sesión.`)) return;
  try {
    // Generar el número (mismo que el REF)
    const numRef  = codigoRef.split('-').pop(); // ej: "001"
    const mesRef  = codigoRef.split('-')[1];    // ej: "MAY"
    const codBono = `BONO-${mesRef}-${numRef}`;

    const codData = {
      codigo:      codBono,
      tipo:        'BONO',
      paciente:    referidoPor,
      telefono:    telefonoRef,
      referidoPor: '',
      codigoRef:   codigoRef
    };
    const r = await fetch(`${APPS_SCRIPT_URL}?action=registrarCodigo&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(codData))}`);
    const d = await r.json();
    if (!d.ok) { toast('Error al generar bono', 'err'); return; }
    toast(`Bono ${codBono} generado para ${referidoPor || 'el referidor'} ✓`);
    await reload();
    renderCodigos();
  } catch(e) { toast('Error de conexión', 'err'); }
}

  global.PanelReferrals = Object.freeze({
    _mesAbrevActual,
    _bonosReferidorMes,
    updateBonosBadge,
    renderCodigos,
    marcarUsado,
    generarBono
  });
})(window);
