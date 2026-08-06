(function(global) {
  'use strict';

const _TPL_DEFAULT = {
  descarga:     'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Han pasado {dias_desde_sesion} dias desde tu {tipo_servicio} del {fecha_sesion}. Como te has sentido? Notas mejoria en la zona trabajada? Cualquier molestia me cuentas para ajustar tu proximo plan. \uD83D\uDCAA',
  valoracion:   'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Como te has sentido despues de la {tipo_servicio} de ayer ({fecha_sesion})? Si tienes alguna duda sobre los hallazgos o el plan que conversamos, quedo atenta. \uD83D\uDE4F',
  readaptacion: 'Hola {nombre}! \uD83D\uDC4B Soy Jessica. Como te ha ido con los ejercicios del plan de ayer ({fecha_sesion})? Recuerda hacer las repeticiones que acordamos. Si sientes alguna molestia o duda, me cuentas para ajustarlo. \uD83D\uDCAA'
};

let _tareaFiltros = new Set(['pendiente','vencida','completada']);

function _checkAutoAtendida() {
  const nowMs = Date.now();
  const pendientes = (allData.citas || []).filter(c => {
    if (!['Confirmada','Pendiente'].includes(c.estado)) return false;
    if (esRegistroServ(c.servicio)) return false;
    const f = normDate(c.fecha);
    if (!f || !c.hora) return false;
    const [hh, mm] = c.hora.split(':').map(Number);
    const citaEnd = new Date(f + 'T' + c.hora);
    citaEnd.setMinutes(citaEnd.getMinutes() + 60);
    return citaEnd.getTime() < nowMs;
  });
  window._autoAtendidaList = pendientes;
  const banner = document.getElementById('bannerAutoAtendida');
  const txt    = document.getElementById('bannerAutoAtendidaTxt');
  if (!banner) return;
  banner.style.display = pendientes.length > 0 ? 'flex' : 'none';
  if (txt && pendientes.length) txt.textContent = `${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pasada${pendientes.length !== 1 ? 's' : ''} aún sin marcar como Atendida`;
}

async function marcarTodasAtendidas() {
  const pendientes = window._autoAtendidaList || [];
  if (!pendientes.length) { toast('No hay citas pendientes de cierre.'); return; }
  window._agendaFiltroPendienteCierre = true;
  showView('agenda');
  if (typeof renderAgenda === 'function') renderAgenda();
  toast(`${pendientes.length} cita${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} de cierre. Revísalas manualmente.`);
}

function _checkCobrosPendientes() {
  const hoyStr = today();
  const pendientes = citasReales().filter(c => {
    if (c.estado !== 'Atendida') return false;
    if (c.pago) return false;
    if (kvGet('pago_' + c.id) === '1') return false;
    if (parsePrecio(c.precio) === 0) return false;
    const f = normDate(c.fecha);
    if (!f) return false;
    const diff = Math.round((new Date(hoyStr + 'T12:00:00') - new Date(f + 'T12:00:00')) / 86400000);
    return diff >= 3;
  });
  const banner = document.getElementById('bannerCobros');
  const txtEl  = document.getElementById('bannerCobrosTxt');
  const lista  = document.getElementById('bannerCobrosLista');
  if (!banner) return;
  if (!pendientes.length) { banner.style.display = 'none'; return; }
  banner.style.display = 'block';
  if (txtEl) txtEl.textContent = `${pendientes.length} cobro${pendientes.length !== 1 ? 's' : ''} pendiente${pendientes.length !== 1 ? 's' : ''} · 3+ días sin registrar pago`;
  if (lista) lista.innerHTML = pendientes.map(c => {
    const tel = (c.telefono || '').replace(/\D/g, '');
    const msg = `Hola ${(c.nombre || '').split(' ')[0]}! \u2757 Te recuerdo que queda pendiente el pago de tu sesion del ${fmtDate(normDate(c.fecha))} por ${c.precio}. ¿Cuando lo puedes hacer efectivo? \uD83D\uDE4F`;
    const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
      <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
      <div style="display:flex;gap:6px">
        ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
      </div>
    </div>`;
  }).join('');
}

function _checkAlertaSemanFloja(citas) {
  const now = new Date();
  const dow = now.getDay(); // 0=dom, 3=mié, 5=vie
  const hoyStr = today();

  // Mostrar solo si es miércoles, jueves o viernes (dow 3,4,5)
  const dashEl = document.getElementById('alertaSemanFlojaDash');
  const finEl  = document.getElementById('alertaSemanFlojaFin');
  const txtEl  = document.getElementById('alertaSemanFlojaTxt');

  const apagar = () => {
    if (dashEl) dashEl.style.display = 'none';
    if (finEl)  { finEl.style.display = 'none'; finEl.innerHTML = ''; }
  };

  if (dow < 3 || dow > 5) { apagar(); return; }

  // Calcular ingresos semana actual (lunes a hoy)
  const lunes = new Date(now);
  lunes.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  lunes.setHours(0,0,0,0);

  let totalSemActual = 0, nSemActual = 0;
  citas.forEach(c => {
    const f = normDate(c.fecha);
    if (!f) return;
    const fd = new Date(f + 'T12:00:00');
    if (fd >= lunes && f <= hoyStr) {
      totalSemActual += parsePrecio(c.precio);
      nSemActual++;
    }
  });
  (allData.eventos || []).forEach(e => {
    const f = normDate(e.fecha);
    if (!f) return;
    const fd = new Date(f + 'T12:00:00');
    if (fd >= lunes && f <= hoyStr) totalSemActual += parsePrecio(e.cobro);
  });

  // Calcular promedio semanal histórico (últimas 8 semanas completas)
  const semanasHist = [];
  for (let w = 1; w <= 8; w++) {
    const lunesW = new Date(lunes);
    lunesW.setDate(lunes.getDate() - w * 7);
    const domW = new Date(lunesW); domW.setDate(lunesW.getDate() + 6);
    const lunesStr = _ingFmt(lunesW);
    const domStr   = _ingFmt(domW);
    let totalW = 0;
    citas.forEach(c => {
      const f = normDate(c.fecha);
      if (f && f >= lunesStr && f <= domStr) totalW += parsePrecio(c.precio);
    });
    (allData.eventos || []).forEach(e => {
      const f = normDate(e.fecha);
      if (f && f >= lunesStr && f <= domStr) totalW += parsePrecio(e.cobro);
    });
    if (totalW > 0) semanasHist.push(totalW);
  }

  if (!semanasHist.length) { apagar(); return; }

  const promSemanal = Math.round(semanasHist.reduce((a,b)=>a+b,0) / semanasHist.length);
  if (!promSemanal) { apagar(); return; }

  // Calcular ritmo proyectado al viernes (5 días hábiles)
  // Días transcurridos: lunes=1, martes=2, mié=3, jue=4, vie=5
  const diasTranscurridos = dow === 0 ? 5 : dow; // dow 1-5
  const pctRitmo = Math.round(totalSemActual / promSemanal * 100);

  // Umbral: si llevas menos del 40% del promedio semanal al miércoles,
  // o menos del 60% al jueves, o menos del 80% al viernes → alerta
  const umbrales = { 3: 40, 4: 60, 5: 80 };
  const umbral = umbrales[dow];
  const estaFloja = pctRitmo < umbral;

  if (!estaFloja) { apagar(); return; }

  const diasNom = { 3:'miércoles', 4:'jueves', 5:'viernes' };
  const faltanPesos = promSemanal - totalSemActual;
  const msg = `📉 Semana floja — Es ${diasNom[dow]} y llevas $${totalSemActual.toLocaleString('es-CO')} (${pctRitmo}% de tu promedio semanal de $${promSemanal.toLocaleString('es-CO')}). Faltan ~$${faltanPesos.toLocaleString('es-CO')} para alcanzar el ritmo habitual. ¿Puedes agregar citas hoy o mañana?`;

  if (txtEl) txtEl.textContent = msg;
  if (dashEl) dashEl.style.display = 'flex';
  if (finEl) { finEl.style.display = 'block'; finEl.innerHTML = `
    <div style="background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.3);border-radius:10px;padding:14px 18px;display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
      <span style="font-size:1.2rem">📉</span>
      <div style="flex:1">
        <div style="font-weight:700;font-size:.9rem;color:#991b1b;margin-bottom:4px">Alerta: semana floja</div>
        <div style="font-size:.84rem;color:#7f1d1d;line-height:1.5">${msg}</div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <div style="flex:1;min-width:180px">
            <div style="display:flex;justify-content:space-between;font-size:.75rem;margin-bottom:3px;color:#991b1b">
              <span>Ritmo actual</span><span>${pctRitmo}% del promedio</span>
            </div>
            <div style="background:rgba(239,68,68,.15);border-radius:99px;height:8px;overflow:hidden">
              <div style="width:${Math.min(pctRitmo,100)}%;height:100%;background:#dc2626;border-radius:99px;transition:width .5s"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.7rem;margin-top:2px;color:#991b1b">
              <span>$0</span><span>Meta: $${promSemanal.toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-sm" style="background:#dc2626;color:#fff;border:none;border-radius:8px;padding:6px 14px;font-family:var(--font-b);cursor:pointer;white-space:nowrap" onclick="showView('nueva');document.getElementById('ncDate').value=today()">+ Agendar hoy</button>
    </div>`; }
}

function getTplTarea(tipo) { return kvGet('tpl_seg_'+tipo) || _TPL_DEFAULT[tipo] || ''; }

function guardarPlantillaTarea(tipo) {
  const el = document.getElementById('tpl'+tipo.charAt(0).toUpperCase()+tipo.slice(1));
  if (!el) return;
  kvSet('tpl_seg_'+tipo, el.value);
  toast('Plantilla guardada');
}

function initTareasConfig() {
  ['descarga','valoracion','readaptacion'].forEach(t => {
    const el = document.getElementById('tpl'+t.charAt(0).toUpperCase()+t.slice(1));
    if (el) el.value = getTplTarea(t);
  });
}

function _tareaKey(c) {
  return 'tarea_' + normDate(c.fecha) + '_' + (c.nombre||'').replace(/\s/g,'_') + '_' + (c.servicio||'').slice(0,10).replace(/\s/g,'_');
}

function _tareaEstado(c) { return kvGet(_tareaKey(c)+'_estado') || 'pendiente'; }

function _tareaFechaTipo(c) {
  const s = (c.servicio||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  if (s.includes('descarga'))     return { tipo:'descarga',     diasDelay:2, label:'Descarga muscular' };
  if (s.includes('valoracion'))   return { tipo:'valoracion',   diasDelay:1, label:'Valoración funcional' };
  if (s.includes('readaptacion')) return { tipo:'readaptacion', diasDelay:1, label:'Readaptación funcional' };
  return null;
}

function generarTareas() {
  const hoyStr = today();
  const hoy = new Date(hoyStr+'T12:00:00');
  const tareas = [], seen = new Set();
  allData.citas.forEach(c => {
    if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return;
    const ft = _tareaFechaTipo(c);
    if (!ft) return;
    const fSesion = normDate(c.fecha);
    if (!fSesion) return;
    if (fSesion < ADMIN_OPERATIONS_START_DATE) return;
    const diasDiff = Math.round((hoy - new Date(fSesion+'T12:00:00')) / 86400000);
    if (diasDiff < ft.diasDelay) return;
    const key = fSesion+'_'+(c.nombre||'')+'_'+ft.tipo;
    if (seen.has(key)) return;
    seen.add(key);
    const estado = _tareaEstado(c);
    const posponerHasta = kvGet(_tareaKey(c)+'_posponer');
    if (posponerHasta && hoyStr < posponerHasta) return;
    const vencida = diasDiff > ft.diasDelay + 3 && estado === 'pendiente';
    tareas.push({ c, ft, fSesion, diasDesde: diasDiff, estado: vencida ? 'vencida' : estado });
  });
  return tareas.sort((a,b) => {
    const ord = {vencida:0,pendiente:1,completada:2};
    return (ord[a.estado]??3)-(ord[b.estado]??3) || a.fSesion.localeCompare(b.fSesion);
  });
}

function toggleTareaFiltro(f) {
  if (_tareaFiltros.has(f)) _tareaFiltros.delete(f); else _tareaFiltros.add(f);
  const map = {pendiente:'tareaChipPend',vencida:'tareaChipVenc',completada:'tareaChipComp'};
  Object.entries(map).forEach(([k,id]) => { const el = document.getElementById(id); if (el) el.classList.toggle('active',_tareaFiltros.has(k)); });
  _renderTareasLista(generarTareas());
}

function renderTareas() {
  const tareas = generarTareas();
  const pend = tareas.filter(t=>t.estado==='pendiente').length;
  const venc = tareas.filter(t=>t.estado==='vencida').length;
  const comp = tareas.filter(t=>t.estado==='completada').length;
  ['tareaCountPend','tareaCountVenc','tareaCountComp'].forEach((id,i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = [pend,venc,comp][i];
  });
  const badge = document.getElementById('badgeTareas');
  const total = pend + venc;
  if (badge) { badge.textContent = total; badge.style.display = total>0?'inline':'none'; }
  const banner = document.getElementById('bannerTareas');
  if (banner) {
    banner.style.display = total > 0 ? 'flex' : 'none';
    const txt = document.getElementById('bannerTareasTxt');
    if (txt) txt.textContent = `⚠️ Tienes ${total} tarea${total!==1?'s':''} de seguimiento pendiente${total!==1?'s':''} hoy`;
  }
  _renderTareasLista(tareas);
}

function _renderTareasLista(tareas) {
  const lista = document.getElementById('tareasLista');
  if (!lista) return;
  const filtroTipo = (document.getElementById('tareaFiltroTipo')||{}).value || '';
  let filtradas = tareas.filter(t => _tareaFiltros.has(t.estado));
  if (filtroTipo) filtradas = filtradas.filter(t => t.ft.tipo === filtroTipo);
  if (!filtradas.length) {
    lista.innerHTML = '<div class="empty" style="padding:50px 20px"><p>No hay tareas en estas categorías 🎉</p></div>';
    return;
  }
  lista.innerHTML = filtradas.map(t => {
    const { c, ft, fSesion, diasDesde, estado } = t;
    const tpl = getTplTarea(ft.tipo)
      .replace(/\{nombre\}/g, c.nombre||'').replace(/\{fecha_sesion\}/g, fmtDate(fSesion))
      .replace(/\{tipo_servicio\}/g, ft.label).replace(/\{dias_desde_sesion\}/g, diasDesde);
    const tel = (c.telefono||'').replace(/\D/g,'');
    const waLink = tel ? `https://wa.me/57${tel}?text=${encodeURIComponent(tpl)}` : '#';
    const colorB = estado==='vencida'?'rgba(239,68,68,.35)':estado==='completada'?'rgba(5,150,105,.3)':'rgba(27,191,176,.25)';
    const colorBg = estado==='vencida'?'rgba(239,68,68,.04)':estado==='completada'?'rgba(5,150,105,.04)':'';
    const key = _tareaKey(c);
    const notas = kvGet(key+'_notas')||'';
    const ts    = kvGet(key+'_ts')||'';
    const colorChip = estado==='vencida'?'#dc2626':estado==='completada'?'#059669':'var(--primary)';
    const bgChip    = estado==='vencida'?'rgba(239,68,68,.12)':estado==='completada'?'rgba(5,150,105,.12)':'rgba(27,191,176,.1)';
    return `<div style="border:1.5px solid ${colorB};border-radius:14px;padding:16px 20px;background:${colorBg}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <div>
          <div style="font-family:var(--font-h);font-size:1rem;font-weight:700">${c.nombre||'—'}</div>
          <div style="font-size:.8rem;color:var(--muted);margin-top:2px">${ft.label} · Sesión: ${fmtDate(fSesion)} · <strong>${diasDesde} días</strong> transcurridos</div>
        </div>
        <span style="font-size:.75rem;font-weight:700;padding:3px 10px;border-radius:99px;background:${bgChip};color:${colorChip}">${estado==='vencida'?'⚠️ Vencida':estado==='completada'?'✓ Completada':'🟢 Pendiente'}</span>
      </div>
      ${estado !== 'completada'
        ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
            <a href="${waLink}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none" onclick="marcarTareaWA('${key}')">\uD83D\uDCF1 Enviar WA</a>
            <button class="btn btn-ghost btn-sm" onclick="marcarTareaCompletada('${key}')">✓ Completada</button>
            <button class="btn btn-ghost btn-sm" onclick="posponerTarea('${key}')">⏭ Posponer 1 día</button>
            <button class="btn btn-ghost btn-sm" style="color:#dc2626" onclick="omitirTarea('${key}')">🚫 Omitir</button>
          </div>`
        : `<div style="font-size:.78rem;color:var(--muted);margin-top:6px">Completada ${ts?new Date(ts).toLocaleString('es-CO'):''} ${notas?'· '+notas:''}</div>`}
    </div>`;
  }).join('');
}

function marcarTareaWA(key) {
  kvSet(key+'_estado','completada');
  kvSet(key+'_ts', new Date().toISOString());
  setTimeout(() => renderTareas(), 500);
}

function marcarTareaCompletada(key) {
  kvSet(key+'_estado','completada');
  kvSet(key+'_ts', new Date().toISOString());
  renderTareas(); toast('Tarea completada ✓');
}

function posponerTarea(key) {
  const manana = new Date(); manana.setDate(manana.getDate()+1);
  const mananaStr = manana.toLocalDateStr();
  kvSet(key+'_posponer', mananaStr);
  toast('Tarea pospuesta para mañana'); renderTareas();
}

function omitirTarea(key) {
  const razon = prompt('Razón para omitir (opcional):');
  kvSet(key+'_estado','completada');
  kvSet(key+'_notas', razon||'Omitida');
  kvSet(key+'_ts', new Date().toISOString());
  renderTareas(); toast('Tarea omitida');
}

  global.PanelOperationsAutomation = Object.freeze({
    _checkAutoAtendida,
    marcarTodasAtendidas,
    _checkCobrosPendientes,
    _checkAlertaSemanFloja,
    getTplTarea,
    guardarPlantillaTarea,
    initTareasConfig,
    _tareaKey,
    _tareaEstado,
    _tareaFechaTipo,
    generarTareas,
    toggleTareaFiltro,
    renderTareas,
    _renderTareasLista,
    marcarTareaWA,
    marcarTareaCompletada,
    posponerTarea,
    omitirTarea
  });
})(window);
