(function(global) {
  'use strict';

let _segFiltros = new Set(['sem3','sem4','sem5','reagendo','readap']);

function toggleSegFiltro(f) {
  if (_segFiltros.has(f)) _segFiltros.delete(f);
  else _segFiltros.add(f);
  const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
  const chip = document.getElementById('segChip' + (idMap[f] || f));
  if (chip) chip.classList.toggle('active', _segFiltros.has(f));
  _renderSegLista(window._segData || [], window._segReadapData || []);
}

function segReagendo(nombre)    { return !!kvGet('seg_reagendo_'+nombre); }

function segToggleR(nombre)     {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth()+1;
  if (segReagendo(nombre)) {
    kvRemove('seg_reagendo_'+nombre);
    _comisSetManualReact(y, m, _comisManualReact(y,m).filter(n => n.toLowerCase() !== nombre.toLowerCase()));
  } else {
    kvSet('seg_reagendo_'+nombre,'1');
    segLogAction(nombre,'reagendo','Marcado como Reagendó ✓');
    const list = _comisManualReact(y, m);
    if (!list.find(n => n.toLowerCase() === nombre.toLowerCase())) { list.push(nombre); _comisSetManualReact(y, m, list); }
  }
  renderSeguimiento();
}

function segWaSent(nombre, tipo){ return !!kvGet('seg_wa_'+tipo+'_'+nombre); }

function segMarkWa(nombre, tipo, dias) {
  kvSet('seg_wa_'+tipo+'_'+nombre, Date.now());
  const label = tipo==='sem3' ? 'WA aviso 3 semanas' : tipo==='sem4' ? 'WA semana 4' : 'WA semana 5+';
  segLogAction(nombre, tipo, label + ' enviado (' + dias + ' días sin descarga)');
  renderSeguimiento();
}

function segLogAction(nombre, tipo, accion) {
  const log = JSON.parse(kvGet('seg_log') || '[]');
  log.unshift({ nombre, tipo, accion, fecha: new Date().toLocaleString('es-CO',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) });
  if (log.length > 80) log.length = 80;
  kvSet('seg_log', JSON.stringify(log));
}

function limpiarLogSeguimiento() {
  if (!confirm('¿Limpiar todo el historial de seguimientos?')) return;
  kvRemove('seg_log');
  _renderSegLog();
  toast('Historial limpiado');
}

function esDescargaMusc(serv) {
  const s = (serv||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  return s.includes('descarga');
}

function esReadaptacion(serv) {
  const s = (serv||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  return s.includes('readaptacion') || s.includes('readap');
}

function readapZona(nombre) {
  return kvGet('seg_readap_zona_'+nombre) || '';
}

function setReadapZona(nombre, zona) {
  if (zona) kvSet('seg_readap_zona_'+nombre, zona);
  else kvRemove('seg_readap_zona_'+nombre);
}

function renderSeguimiento() {
  const lista = document.getElementById('segLista');
  if (!lista) return;
  lista.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';

  const now = new Date(); now.setHours(0,0,0,0);

  // Mapa: última descarga por paciente
  const map = {};
  allData.citas
    .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esDescargaMusc(c.servicio))
    .forEach(c => {
      const nombre = (c.nombre||'').trim();
      const fecha  = normDate(c.fecha);
      if (!nombre || !fecha) return;
      if (!map[nombre] || fecha > map[nombre].fecha) {
        map[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
      }
    });

  // Calcular días y semana — descargas
  const pacientes = Object.values(map).map(p => {
    const [y,m,d] = p.fecha.split('-');
    const last = new Date(+y,+m-1,+d);
    const dias = Math.floor((now - last) / 86400000);
    let semana = null;
    if      (dias >= 35 && dias < 42) semana = 'sem3';
    else if (dias >= 42 && dias < 49) semana = 'sem4';
    else if (dias >= 49)              semana = 'sem5';
    return { ...p, dias, semana };
  }).filter(p => p.semana !== null);

  // Mapa: última readaptación por paciente
  const mapR = {};
  allData.citas
    .filter(c => c.estado !== 'Cancelada' && !esRegistroServ(c.servicio) && esReadaptacion(c.servicio))
    .forEach(c => {
      const nombre = (c.nombre||'').trim();
      const fecha  = normDate(c.fecha);
      if (!nombre || !fecha) return;
      if (!mapR[nombre] || fecha > mapR[nombre].fecha) {
        mapR[nombre] = { nombre, telefono: c.telefono||'', email: c.email||'', fecha, servicio: c.servicio, notaAdmin: c.notaAdmin||'' };
      }
    });

  const readapPacs = Object.values(mapR).map(p => {
    const [y,m,d] = p.fecha.split('-');
    const last = new Date(+y,+m-1,+d);
    const dias = Math.floor((now - last) / 86400000);
    return { ...p, dias };
  });

  // Contar
  const c3 = pacientes.filter(p=>p.semana==='sem3').length;
  const c4 = pacientes.filter(p=>p.semana==='sem4').length;
  const c5 = pacientes.filter(p=>p.semana==='sem5').length;
  const cR = pacientes.filter(p=>segReagendo(p.nombre)).length;
  const cReadap = readapPacs.filter(p=>!segReagendo(p.nombre)).length;

  ['3','4','5','R'].forEach(k => {
    const el = document.getElementById('segCount'+k);
    if (el) el.textContent = k==='3'?c3:k==='4'?c4:k==='5'?c5:cR;
  });
  const elReadap = document.getElementById('segCountReadap');
  if (elReadap) elReadap.textContent = cReadap;

  // Badge sidebar
  const pendientes = c3 + c4 + c5 + cReadap;
  const badge = document.getElementById('badgeSeguimiento');
  if (badge) { badge.textContent = pendientes; badge.style.display = pendientes > 0 ? 'inline':'none'; }

  window._segData = pacientes;
  window._segReadapData = readapPacs;
  _renderSegLista(pacientes, readapPacs);
  _renderSegLog();
}

function _renderSegLista(pacientes, readapPacs) {
  const lista = document.getElementById('segLista');
  if (!lista) return;

  readapPacs = readapPacs || window._segReadapData || [];

  // Descargas: separar reagendados
  const activos    = pacientes.filter(p => !segReagendo(p.nombre));
  const reagendados = pacientes.filter(p =>  segReagendo(p.nombre));

  // Readaptación: separar reagendados
  const readapActivos    = readapPacs.filter(p => !segReagendo(p.nombre));
  const readapReagendados = readapPacs.filter(p =>  segReagendo(p.nombre));

  const descargaCards = [
    ...(_segFiltros.has('sem3') ? activos.filter(p=>p.semana==='sem3').sort((a,b)=>a.dias-b.dias) : []),
    ...(_segFiltros.has('sem4') ? activos.filter(p=>p.semana==='sem4').sort((a,b)=>a.dias-b.dias) : []),
    ...(_segFiltros.has('sem5') ? activos.filter(p=>p.semana==='sem5').sort((a,b)=>b.dias-a.dias) : []),
    ...(_segFiltros.has('reagendo') ? reagendados : []),
  ];

  const readapCards = [
    ...(_segFiltros.has('readap') ? readapActivos.sort((a,b)=>b.dias-a.dias) : []),
    ...(_segFiltros.has('reagendo') ? readapReagendados : []),
  ];

  if (!descargaCards.length && !readapCards.length) {
    lista.innerHTML = '<div class="empty" style="padding:50px 20px"><p>No hay pacientes en estas categorías</p></div>';
    return;
  }

  let html = '';
  if (descargaCards.length) {
    html += descargaCards.map(p => _segCard(p)).join('');
  }
  if (readapCards.length) {
    if (descargaCards.length) html += `<div style="margin:18px 0 10px;font-size:.78rem;font-weight:700;color:#0369a1;letter-spacing:.04em;text-transform:uppercase">Readaptación Funcional</div>`;
    html += readapCards.map(p => _segCardReadap(p)).join('');
  }
  lista.innerHTML = html;
}

function _segCard(p) {
  const reagendado = segReagendo(p.nombre);
  const initials   = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  const pct        = Math.min(Math.round(p.dias / 35 * 100), 100);
  const waSent3    = segWaSent(p.nombre,'sem3');
  const waSent4    = segWaSent(p.nombre,'sem4');
  const waSent5    = segWaSent(p.nombre,'sem5');

  const colorMap   = { sem3:'#7c3aed', sem4:'var(--warn)', sem5:'var(--err)' };
  const fillMap    = { sem3:'rgba(124,58,237,.5)', sem4:'#d97706', sem5:'#dc2626' };
  const color      = colorMap[p.semana] || 'var(--primary)';
  const fillColor  = fillMap[p.semana]  || 'var(--primary)';

  const labelMap   = { sem3:'Semana 3 — aviso previo', sem4:'Semana 4 — momento ideal', sem5:'Semana 5+ — urgente' };
  const label      = labelMap[p.semana] || '';

  const tel   = String(p.telefono||'').replace(/\D/g,'');
  const phone = tel.length<=10 ? '57'+tel : tel;
  const hasWA = tel.length >= 7;

  // Mensajes WA — personalizados según tipo de descarga y nota de relación
  const primero = p.nombre.split(' ')[0];
  const sn = (p.servicio||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const zonaDesc = sn.includes('cuello') || sn.includes('espalda') ? 'de cuello y espalda'
    : sn.includes('pierna') ? 'de piernas'
    : 'completa';
  const _paraM = (p.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i);
  const paraQuien = _paraM ? _paraM[1].trim() : null;
  const sujeto3 = paraQuien ? `la última sesión de descarga muscular ${zonaDesc} de ${paraQuien}` : `tu última sesión de descarga muscular ${zonaDesc}`;
  const sujeto4 = paraQuien ? `la última descarga muscular ${zonaDesc} de ${paraQuien}` : `tu última descarga muscular ${zonaDesc}`;
  const sujeto5 = paraQuien ? `la última sesión de descarga muscular ${zonaDesc} de ${paraQuien}` : `tu última sesión de descarga muscular ${zonaDesc}`;
  const cierre3 = paraQuien ? '¿Reagendamos?' : '¿Te agendo?';
  const cierre4 = paraQuien ? '¿Reagendamos esta semana?' : '¿Te agendo esta semana?';
  const cierre5 = paraQuien ? '¿Cuando les viene bien retomar? Cuentame y coordinamos. \uD83D\uDCAA' : '¿Cuando te viene bien retomar? Cuentame y coordinamos. \uD83D\uDCAA';
  const msg3 = `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya van 3 semanas desde ${sujeto3}. La proxima semana seria el momento ideal para reagendar antes de que el cuerpo empiece a acumular tension. ${cierre3}`;
  const msg4 = `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Ya se cumplieron las 4 semanas desde ${sujeto4} — es el momento de reagendar. Mantener la frecuencia es lo que hace que los resultados se sostengan. ${cierre4}`;
  const msg5 = `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. Hace mas de un mes desde ${sujeto5}. El cuerpo ya empieza a acumular tension de nuevo. ${cierre5}`;

  const wa3 = hasWA ? `https://wa.me/${phone}?text=${encodeURIComponent(msg3)}` : null;
  const wa4 = hasWA ? `https://wa.me/${phone}?text=${encodeURIComponent(msg4)}` : null;
  const wa5 = hasWA ? `https://wa.me/${phone}?text=${encodeURIComponent(msg5)}` : null;

  return `<div class="seg-card ${reagendado?'reagendado':''}">
    <div class="pac-badge" style="flex-shrink:0;background:rgba(27,191,176,.08);border-color:${reagendado?'var(--ok)':color}">${initials}</div>
    <div style="flex:1;min-width:160px">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:.9rem">${p.nombre}</span>
        ${reagendado
          ? `<span style="font-size:.72rem;color:var(--ok);font-weight:700;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:99px;padding:1px 8px">✓ Reagendó</span>`
          : `<span style="font-size:.72rem;color:${color};font-weight:700;font-family:var(--font-m)">${label}</span>`}
      </div>
      <div style="font-size:.78rem;color:var(--muted);margin-top:2px">${p.servicio} · última: ${fmtDate(p.fecha)}</div>
      <div class="seg-days-bar" style="width:180px">
        <div class="seg-days-fill" style="width:${pct}%;background:${reagendado?'var(--ok)':fillColor}"></div>
      </div>
      <div style="font-family:var(--font-m);font-size:.7rem;color:${reagendado?'var(--ok)':color};margin-top:2px;font-weight:600">${p.dias} días sin descarga muscular</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
      ${reagendado ? `
        <button class="btn btn-ghost btn-sm" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">↩ Desmarcar</button>
      ` : `
        ${p.semana==='sem3' && wa3 ? `<a href="${wa3}" target="_blank" class="btn btn-sm btn-purple" onclick="segMarkWa('${p.nombre.replace(/'/g,"\\'")}','sem3',${p.dias})" style="${waSent3?'opacity:.55':''}">💬 WA ${waSent3?'(enviado)':'Sem 3'}</a>` : ''}
        ${(p.semana==='sem4'||p.semana==='sem3') && wa4 ? `<a href="${wa4}" target="_blank" class="btn btn-wa btn-sm" onclick="segMarkWa('${p.nombre.replace(/'/g,"\\'")}','sem4',${p.dias})" style="${waSent4?'opacity:.55':''}">💬 WA ${waSent4?'(enviado)':'Sem 4'}</a>` : ''}
        ${p.semana==='sem5' && wa5 ? `<a href="${wa5}" target="_blank" class="btn btn-err btn-sm" onclick="segMarkWa('${p.nombre.replace(/'/g,"\\'")}','sem5',${p.dias})" style="${waSent5?'opacity:.55':''}">💬 WA ${waSent5?'(enviado)':'Sem 5+'}</a>` : ''}
        ${p.email && p.email.includes('@') ? `<a href="mailto:${p.email}" class="btn btn-ghost btn-sm">📧</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="agendarDesdeSeg('${encodeURIComponent(p.nombre)}','${encodeURIComponent(p.telefono)}','${encodeURIComponent(p.email)}')">+ Agendar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--ok);border-color:rgba(22,163,74,.3)" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">✓ Reagendó</button>
      `}
    </div>
  </div>`;
}

function _segCardReadap(p) {
  const reagendado = segReagendo(p.nombre);
  const initials   = p.nombre.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  const zona       = readapZona(p.nombre);
  const tel        = String(p.telefono||'').replace(/\D/g,'');
  const phone      = tel.length<=10 ? '57'+tel : tel;
  const hasWA      = tel.length >= 7;
  const primero    = p.nombre.split(' ')[0];
  const uid        = p.nombre.replace(/[^a-zA-Z0-9]/g,'_');
  const waSent     = segWaSent(p.nombre,'readap');
  const _paraMR = (p.notaAdmin||'').match(/\[PARA:\s*([^\]]+)\]/i);
  const paraQuienR = _paraMR ? _paraMR[1].trim() : null;

  const msgReadap = zona
    ? paraQuienR
      ? `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. ¿Como ha estado ${paraQuienR} con el proceso de readaptacion funcional de ${zona}? Queria saber como se siente y si quieren continuar con el plan. ¿Me cuentas como va? \uD83D\uDCAA`
      : `Hola ${primero}! \uD83D\uDC4B Te escribimos de Cuidándote Fisioterapia. ¿Como has estado con tu proceso de readaptacion funcional de ${zona}? Queria saber como te sientes y si quieres continuar con tu plan. ¿Me cuentas como vas? \uD83D\uDCAA`
    : null;
  const waReadap = (hasWA && msgReadap) ? `https://wa.me/${phone}?text=${encodeURIComponent(msgReadap)}` : null;

  return `<div class="seg-card ${reagendado?'reagendado':''}" style="border-left:3px solid #0369a1">
    <div class="pac-badge" style="flex-shrink:0;background:rgba(3,105,161,.08);border-color:${reagendado?'var(--ok)':'#0369a1'}">${initials}</div>
    <div style="flex:1;min-width:160px">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="font-weight:600;font-size:.9rem">${p.nombre}</span>
        ${reagendado
          ? `<span style="font-size:.72rem;color:var(--ok);font-weight:700;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.3);border-radius:99px;padding:1px 8px">✓ Reagendó</span>`
          : `<span style="font-size:.72rem;color:#0369a1;font-weight:700;font-family:var(--font-m)">Readaptación Funcional</span>`}
      </div>
      <div style="font-size:.78rem;color:var(--muted);margin-top:2px">${p.servicio} · última: ${fmtDate(p.fecha)} · ${p.dias} días</div>
      ${!reagendado ? `
      <div style="margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <label style="font-size:.75rem;color:var(--muted);flex-shrink:0">Articulación/zona:</label>
        <input
          id="readapZona_${uid}"
          type="text"
          value="${zona}"
          placeholder="ej: espalda, rodilla, hombro..."
          style="font-size:.78rem;padding:4px 8px;border:1px solid var(--border);border-radius:6px;background:var(--s1);color:var(--text);outline:none;width:180px"
          oninput="setReadapZona('${p.nombre.replace(/'/g,"\\'")}', this.value); _renderSegLista(window._segData||[], window._segReadapData||[])"
          onfocus="this.style.borderColor='#0369a1'"
          onblur="this.style.borderColor='var(--border)'"
        />
        ${zona ? `<span style="font-size:.72rem;color:#0369a1">✓ guardado</span>` : `<span style="font-size:.72rem;color:var(--muted)">Llena para generar mensaje WA</span>`}
      </div>` : ''}
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0">
      ${reagendado ? `
        <button class="btn btn-ghost btn-sm" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">↩ Desmarcar</button>
      ` : `
        ${waReadap
          ? `<a href="${waReadap}" target="_blank" class="btn btn-sm" style="background:#0369a1;color:#fff" onclick="segMarkWa('${p.nombre.replace(/'/g,"\\'")}','readap',${p.dias})" ${waSent?'style="opacity:.55"':''}>💬 WA ${waSent?'(enviado)':'Seguimiento'}</a>`
          : `<span style="font-size:.75rem;color:var(--muted);padding:5px 8px">${hasWA?'Llena la zona primero':'Sin teléfono'}</span>`}
        ${p.email && p.email.includes('@') ? `<a href="mailto:${p.email}" class="btn btn-ghost btn-sm">📧</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="agendarDesdeSeg('${encodeURIComponent(p.nombre)}','${encodeURIComponent(p.telefono)}','${encodeURIComponent(p.email)}')">+ Agendar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--ok);border-color:rgba(22,163,74,.3)" onclick="segToggleR('${p.nombre.replace(/'/g,"\\'")}')">✓ Reagendó</button>
      `}
    </div>
  </div>`;
}

function _renderSegLog() {
  const el = document.getElementById('segLog');
  if (!el) return;
  const log = JSON.parse(kvGet('seg_log') || '[]');
  if (!log.length) {
    el.innerHTML = '<div class="empty" style="padding:24px 0"><p>Aún no hay acciones registradas</p></div>';
    return;
  }
  const dotColors = { sem3:'#7c3aed', sem4:'#d97706', sem5:'#dc2626', reagendo:'#16a34a', readap:'#0369a1' };
  el.innerHTML = `<div style="max-height:320px;overflow-y:auto;padding-right:4px">` +
    log.map(l => `<div class="seg-log-item">
      <div class="seg-log-dot" style="background:${dotColors[l.tipo]||'var(--primary)'}"></div>
      <div class="seg-log-time">${l.fecha}</div>
      <div style="flex:1"><strong style="font-size:.83rem">${l.nombre}</strong> — <span style="color:var(--muted)">${l.accion}</span></div>
    </div>`).join('') + `</div>`;
}

function exportarSeguimientoCSV() {
  const data  = window._segData || [];
  const dataR = window._segReadapData || [];
  if (!data.length && !dataR.length) { toast('No hay datos para exportar', 'err'); return; }
  const header = ['Nombre','Teléfono','Email','Tipo','Servicio','Última sesión','Días','Semana/Zona','Reagendó','WA Enviado'];
  const rowsD = data.map(p => [
    p.nombre, p.telefono, p.email, 'Descarga muscular', p.servicio, p.fecha, p.dias,
    p.semana==='sem3'?'Semana 3':p.semana==='sem4'?'Semana 4':'Semana 5+',
    segReagendo(p.nombre)?'Sí':'No',
    (segWaSent(p.nombre,'sem3')||segWaSent(p.nombre,'sem4')||segWaSent(p.nombre,'sem5'))?'Sí':'No'
  ]);
  const rowsR = dataR.map(p => [
    p.nombre, p.telefono, p.email, 'Readaptación Funcional', p.servicio, p.fecha, p.dias,
    readapZona(p.nombre)||'—',
    segReagendo(p.nombre)?'Sí':'No',
    segWaSent(p.nombre,'readap')?'Sí':'No'
  ]);
  const csv = [header,...rowsD,...rowsR].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'seguimiento_'+today()+'.csv'; a.click();
  toast('CSV exportado');
}

  global.PanelPatientFollowUp = Object.freeze({
    toggleSegFiltro,
    segReagendo,
    segToggleR,
    segWaSent,
    segMarkWa,
    segLogAction,
    limpiarLogSeguimiento,
    esDescargaMusc,
    esReadaptacion,
    readapZona,
    setReadapZona,
    renderSeguimiento,
    _renderSegLista,
    _segCard,
    _segCardReadap,
    _renderSegLog,
    exportarSeguimientoCSV
  });
})(window);
