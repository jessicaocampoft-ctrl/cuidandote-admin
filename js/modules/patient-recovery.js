(function(global) {
  'use strict';

const REC_KEY = 'recuperaciones_v1';

const _recMensajes = [
  {
    label: 'Chequeo amigable',
    desc:  'Pregunta por la dolencia, sin presionar',
    fn: (nombre1, meses, servicio) => {
      const q = _recPreguntaDolencia(servicio);
      return `Hola ${nombre1}! Te escribe el equipo de Cuidándote Fisioterapia 👋 ${q} Hace ${meses} ${meses===1?'mes':'meses'} que no te vemos por aquí — te escribimos porque sabemos que el cuerpo lo agradece cuando mantiene la rutina de descarga. ¿Quieres agendar una sesión esta semana? 💪`;
    }
  },
  {
    label: 'Recordatorio de resultados',
    desc:  'Recuerda cómo se sentía después de la sesión',
    fn: (nombre1, meses, servicio) => {
      const q = _recPreguntaDolencia(servicio);
      return `Hola ${nombre1}! Te escribe el equipo de Cuidándote Fisioterapia 💙 ${q}\n\n¿Recuerdas cómo te sentiste después de tu última sesión? Ese alivio y esa ligereza que notaste... el cuerpo lo puede volver a tener.\n\nHace ${meses} ${meses===1?'mes':'meses'} que no tienes una descarga — cuando la tensión se acumula, cuesta más recuperarla. ¿Te agendamos esta semana? 🙌`;
    }
  },
  {
    label: 'Directo con fecha',
    desc:  'Propone agendar sin rodeos',
    fn: (nombre1, meses, servicio) => {
      const q = _recPreguntaDolencia(servicio);
      return `Hola ${nombre1}! Te escribe el equipo de Cuidándote Fisioterapia. ${q} Llevas ${meses} ${meses===1?'mes':'meses'} sin sesión y quería avisarte que tenemos disponibilidad esta semana.\n\n¿Te puedo apartar un espacio? Solo dime qué día te queda mejor. 📅`;
    }
  },
  {
    label: 'Bienestar y cuidado',
    desc:  'Tono empático, centrado en la salud',
    fn: (nombre1, meses, servicio) => {
      const q = _recPreguntaDolencia(servicio);
      return `Hola ${nombre1}! Te escribe el equipo de Cuidándote Fisioterapia 🌿 ${q}\n\nSabemos que la vida se pone ocupada — han pasado ${meses} ${meses===1?'mes':'meses'} desde tu última visita. Solo queríamos recordarte que cuidarte no es un lujo, es una necesidad. Cuando estés listo para retomar, aquí estamos 💚`;
    }
  }
];

function _loadRec() {
  try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
}

function _saveRec(arr) {
  localStorage.setItem(REC_KEY, JSON.stringify(arr));
}

function _fmtCLP(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

function _recMesActual() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
}

function _initRecMesSel() {
  const sel = document.getElementById('recMesFiltro');
  if (!sel) return;
  const all = _loadRec();
  const meses = [...new Set(all.map(r => r.fecha.slice(0,7)))].sort().reverse();
  const actual = _recMesActual();
  if (!meses.includes(actual)) meses.unshift(actual);
  const cur = sel.value || actual;
  sel.innerHTML = meses.map(m => {
    const [y,mo] = m.split('-');
    const label = new Date(y, mo-1, 1).toLocaleDateString('es-CO', {month:'long', year:'numeric'});
    return `<option value="${m}" ${m===cur?'selected':''}>${label.charAt(0).toUpperCase()+label.slice(1)}</option>`;
  }).join('');
}

function renderRecuperaciones() {
  _initRecMesSel();
  const mes   = document.getElementById('recMesFiltro')?.value || _recMesActual();
  const busq  = (document.getElementById('recBuscar')?.value || '').toLowerCase().trim();
  const estFl = document.getElementById('recFiltroEstado')?.value || 'todos';

  const all = _loadRec();

  // --- resumen del mes seleccionado (sin filtros de búsqueda) ---
  const desMes = all.filter(r => r.fecha.startsWith(mes));
  const totalVentas   = desMes.reduce((s,r) => s + r.venta, 0);
  const totalComision = desMes.reduce((s,r) => s + r.comision, 0);
  const totalPendiente= desMes.filter(r => !r.pagado).reduce((s,r) => s + r.comision, 0);

  const elTotal    = document.getElementById('recResTotal');
  const elVentas   = document.getElementById('recResVentas');
  const elComision = document.getElementById('recResComision');
  const elPendiente= document.getElementById('recResPendiente');
  const elBtnPagar = document.getElementById('recBtnPagarTodo');

  if (elTotal)     elTotal.textContent     = desMes.length;
  if (elVentas)    elVentas.textContent    = _fmtCLP(totalVentas);
  if (elComision)  elComision.textContent  = _fmtCLP(totalComision);
  if (elPendiente) elPendiente.textContent = _fmtCLP(totalPendiente);
  if (elBtnPagar)  elBtnPagar.style.display = totalPendiente > 0 ? 'inline-block' : 'none';

  // --- tabla con filtros ---
  let filas = all.filter(r => r.fecha.startsWith(mes));
  if (busq)           filas = filas.filter(r => r.paciente.toLowerCase().includes(busq));
  if (estFl !== 'todos') filas = filas.filter(r => estFl === 'pagado' ? r.pagado : !r.pagado);
  filas.sort((a,b) => b.fecha.localeCompare(a.fecha));

  const tbody = document.getElementById('recTablaBody');
  const pie   = document.getElementById('recTotalesPie');
  if (!tbody) return;

  if (filas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding:40px;text-align:center;color:var(--muted)">No hay recuperaciones para este período</td></tr>`;
    if (pie) pie.style.display = 'none';
    return;
  }

  const totalFilVenta  = filas.reduce((s,r) => s + r.venta, 0);
  const totalFilComis  = filas.reduce((s,r) => s + r.comision, 0);
  const totalFilPend   = filas.filter(r=>!r.pagado).reduce((s,r)=>s+r.comision,0);

  tbody.innerHTML = filas.map(r => {
    const fechaFmt = new Date(r.fecha + 'T12:00:00').toLocaleDateString('es-CO', {day:'2-digit',month:'short',year:'numeric'});
    const badge = r.pagado
      ? `<span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;font-size:.72rem;font-family:var(--font-m);white-space:nowrap">✓ Pagado</span>`
      : `<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:20px;font-size:.72rem;font-family:var(--font-m);white-space:nowrap">⏳ Pendiente</span>`;
    const btnPagar = r.pagado
      ? `<button onclick="desmarcarPago('${r.id}')" title="Desmarcar pago" style="padding:4px 10px;background:var(--s2);color:var(--muted);border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:.73rem">↺</button>`
      : `<button onclick="marcarPagado('${r.id}')" style="padding:4px 10px;background:#10b981;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.73rem;white-space:nowrap">✓ Pagar</button>`;
    const btnDel = `<button onclick="eliminarRecuperacion('${r.id}')" title="Eliminar" style="padding:4px 8px;background:var(--s2);color:var(--err,#ef4444);border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:.73rem;margin-left:4px">✕</button>`;
    const notaTxt = r.nota ? `<div style="font-size:.72rem;color:var(--muted);margin-top:2px">${r.nota}</div>` : '';
    return `<tr style="border-top:1px solid var(--border)">
      <td style="padding:10px 16px;white-space:nowrap;font-size:.82rem">${fechaFmt}</td>
      <td style="padding:10px 16px"><div style="font-weight:600">${r.paciente}</div>${notaTxt}</td>
      <td style="padding:10px 16px;color:var(--muted)">${r.servicio}</td>
      <td style="padding:10px 16px;text-align:right;font-family:var(--font-m);white-space:nowrap">${_fmtCLP(r.venta)}</td>
      <td style="padding:10px 16px;text-align:right;font-family:var(--font-m);color:#10b981;font-weight:600;white-space:nowrap">${_fmtCLP(r.comision)}</td>
      <td style="padding:10px 16px;text-align:center">${badge}</td>
      <td style="padding:10px 16px;text-align:center;white-space:nowrap">${btnPagar}${btnDel}</td>
    </tr>`;
  }).join('');

  if (pie) {
    pie.style.display = 'flex';
    pie.innerHTML = `
      <span style="color:var(--muted)">Ventas filtradas: <strong style="color:var(--text)">${_fmtCLP(totalFilVenta)}</strong></span>
      <span style="color:var(--muted)">Comisión total: <strong style="color:#10b981">${_fmtCLP(totalFilComis)}</strong></span>
      ${totalFilPend > 0 ? `<span style="color:var(--muted)">Pendiente: <strong style="color:#f59e0b">${_fmtCLP(totalFilPend)}</strong></span>` : ''}
    `;
  }
}

function registrarRecuperacion() {
  const paciente = document.getElementById('recInpPaciente')?.value.trim();
  const fecha    = document.getElementById('recInpFecha')?.value;
  const servicio = document.getElementById('recInpServicio')?.value;
  const venta    = parseFloat(document.getElementById('recInpVenta')?.value || '0');
  const nota     = document.getElementById('recInpNota')?.value.trim() || '';

  if (!paciente) { alert('Ingresa el nombre del paciente'); return; }
  if (!fecha)    { alert('Selecciona la fecha de la cita'); return; }
  if (!servicio) { alert('Selecciona el servicio'); return; }
  if (!venta || venta <= 0) { alert('Ingresa el valor de la venta'); return; }

  const comision = Math.round(venta * REC_PCT);
  const rec = {
    id: Date.now().toString(),
    fecha,
    paciente,
    servicio,
    venta,
    comision,
    nota,
    pagado: false,
    pagadoFecha: null
  };

  const all = _loadRec();
  all.push(rec);
  _saveRec(all);

  // Limpiar formulario
  document.getElementById('recInpPaciente').value = '';
  document.getElementById('recInpFecha').value    = '';
  document.getElementById('recInpServicio').value = '';
  document.getElementById('recInpVenta').value    = '';
  document.getElementById('recInpNota').value     = '';
  document.getElementById('recInpComisionCalc').value = '$0';

  const msg = document.getElementById('recGuardadoMsg');
  if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }

  renderRecuperaciones();
  if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
}

function marcarPagado(id) {
  const all = _loadRec();
  const rec = all.find(r => r.id === id);
  if (!rec) return;
  rec.pagado = true;
  rec.pagadoFecha = today();
  _saveRec(all);
  renderRecuperaciones();
  if (typeof toast === 'function') toast(`Comisión ${_fmtCLP(rec.comision)} marcada como pagada`, 'ok');
}

function desmarcarPago(id) {
  const all = _loadRec();
  const rec = all.find(r => r.id === id);
  if (!rec) return;
  rec.pagado = false;
  rec.pagadoFecha = null;
  _saveRec(all);
  renderRecuperaciones();
}

function eliminarRecuperacion(id) {
  if (!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
  const all = _loadRec().filter(r => r.id !== id);
  _saveRec(all);
  renderRecuperaciones();
  if (typeof toast === 'function') toast('Registro eliminado', 'ok');
}

function pagarTodasComisiones() {
  const mes = document.getElementById('recMesFiltro')?.value || _recMesActual();
  const all = _loadRec();
  let cnt = 0;
  all.forEach(r => {
    if (r.fecha.startsWith(mes) && !r.pagado) {
      r.pagado = true;
      r.pagadoFecha = today();
      cnt++;
    }
  });
  if (cnt === 0) return;
  _saveRec(all);
  renderRecuperaciones();
  if (typeof toast === 'function') toast(`${cnt} comisión${cnt>1?'es':''} marcada${cnt>1?'s':''} como pagada${cnt>1?'s':''}`, 'ok');
}

async function cargarInactivos() {
  const panel = document.getElementById('recInactivosPanel');
  const btn   = document.getElementById('recBtnCargar');
  if (!panel) return;
  panel.innerHTML = '<div style="text-align:center;padding:30px"><div class="spinner"></div><div style="margin-top:10px;color:var(--muted);font-size:.83rem">Consultando base de datos...</div></div>';
  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getInactivos&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (!d.ok) { panel.innerHTML = `<div style="color:var(--err,#ef4444);padding:20px">Error: ${d.error||'Sin respuesta del servidor'}</div>`; return; }
    renderInactivos(d.inactivos || []);
  } catch(e) {
    panel.innerHTML = '<div style="color:var(--err,#ef4444);padding:20px">Error de conexión. Verifica que el GAS esté actualizado y vuelve a intentarlo.</div>';
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

function _recPreguntaDolencia(servicio) {
  const s = (servicio || '').toLowerCase();
  if (s.includes('cuello') || s.includes('espalda'))  return '¿cómo sigues del cuello y la espalda?';
  if (s.includes('pierna'))                            return '¿cómo sigues de las piernas?';
  if (s.includes('completa'))                          return '¿cómo sigues con la tensión muscular?';
  if (s.includes('valorac'))                           return '¿cómo sigues con tu proceso?';
  if (s.includes('readapt'))                           return '¿cómo sigues con tu readaptación?';
  if (s.includes('recuper') || s.includes('full'))     return '¿cómo sigues con tu recuperación?';
  return '¿cómo sigues de salud?';
}

function _renderRecMsgSelector() {
  return `<div style="margin-bottom:16px;padding:12px 14px;background:var(--s2);border:1px solid var(--border);border-radius:10px">
    <div style="font-size:.75rem;color:var(--muted);font-family:var(--font-m);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Mensaje para enviar por WA</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${_recMensajes.map((m, i) => `
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:8px 10px;border-radius:8px;border:1px solid ${_recMsgTipo===i?'var(--primary)':'var(--border)'};background:${_recMsgTipo===i?'rgba(13,148,136,.06)':'transparent'};transition:all .15s" onclick="_recMsgTipo=${i};renderInactivos(_recCurrentLista)">
          <input type="radio" name="recMsg" ${_recMsgTipo===i?'checked':''} style="margin-top:2px;accent-color:var(--primary);flex-shrink:0">
          <div>
            <div style="font-size:.82rem;font-weight:600;color:var(--text)">${m.label}</div>
            <div style="font-size:.75rem;color:var(--muted);margin-top:1px">${m.desc}</div>
          </div>
        </label>`).join('')}
    </div>
  </div>`;
}

function renderInactivos(lista) {
  const panel = document.getElementById('recInactivosPanel');
  if (!panel) return;
  _recCurrentLista = lista;

  if (lista.length === 0) {
    panel.innerHTML = '<div style="text-align:center;color:var(--ok,#10b981);padding:30px;font-size:.9rem">✅ No hay pacientes inactivos de 2+ meses en la base de datos</div>';
    return;
  }

  const grupos = {};
  lista.forEach(p => {
    const g = p.dias >= 180 ? '6m+' : p.dias >= 120 ? '4-6m' : p.dias >= 90 ? '3-4m' : '2-3m';
    if (!grupos[g]) grupos[g] = [];
    grupos[g].push(p);
  });

  const gCfg = [
    { key:'6m+',  label:'Más de 6 meses sin sesión',    color:'#ef4444', bg:'#fef2f2', border:'#fecaca' },
    { key:'4-6m', label:'Entre 4 y 6 meses sin sesión', color:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
    { key:'3-4m', label:'Entre 3 y 4 meses sin sesión', color:'#3b82f6', bg:'#eff6ff', border:'#bfdbfe' },
    { key:'2-3m', label:'Entre 2 y 3 meses sin sesión', color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe' },
  ];

  let html = `<div style="font-size:.8rem;color:var(--muted);margin-bottom:16px">${lista.length} paciente${lista.length!==1?'s':''} sin sesión desde hace 2+ meses</div>`;

  gCfg.forEach(gc => {
    const ps = grupos[gc.key];
    if (!ps || ps.length === 0) return;
    html += `<div style="margin-bottom:20px">
      <div style="font-size:.75rem;font-family:var(--font-m);color:${gc.color};text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;font-weight:600">${gc.label} · ${ps.length} paciente${ps.length!==1?'s':''}</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${ps.map(p => _recInactivoCard(p, gc)).join('')}
      </div>
    </div>`;
  });

  panel.innerHTML = html;
}

function _waIconSvg() {
  return `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.845L0 24l6.335-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.511-5.18-1.401l-.37-.221-3.762.905.955-3.667-.24-.377A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
}

function _recInactivoCard(p, gc) {
  const nombre1 = p.nombre.split(' ')[0];
  const t = (p.telefono||'').replace(/\D/g,'');
  const phone = t.length <= 10 && t.length >= 7 ? '57'+t : t;
  const meses = Math.round(p.dias / 30);
  const fechaFmt = p.lastFecha ? new Date(p.lastFecha+'T12:00:00').toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}) : '—';

  const preNombre   = p.nombre.replace(/'/g,"\\'");
  const preServicio = (p.lastServicio||'').replace(/'/g,"\\'");
  const registrarBtn = `<button onclick="preRellenaRecuperacion('${preNombre}','${preServicio}')" style="padding:5px 10px;background:var(--primary);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.72rem;font-family:var(--font-b);white-space:nowrap">✓ Registrar</button>`;

  const etiquetas = ['👋 Chequeo','💆 Resultados','📅 Directo','🌿 Bienestar'];
  const waBtns = phone.length >= 9
    ? _recMensajes.map((m, i) => {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(m.fn(nombre1, meses, p.lastServicio))}`;
        return `<a href="${url}" target="_blank" title="${m.label}" style="padding:5px 9px;background:#25D366;color:#fff;border-radius:6px;font-size:.7rem;font-family:var(--font-b);text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;gap:3px">${_waIconSvg()} ${etiquetas[i]}</a>`;
      }).join('')
    : `<span style="font-size:.72rem;color:var(--muted)">Sin tel.</span>`;

  return `<div style="background:${gc.bg};border:1px solid ${gc.border};border-radius:10px;padding:12px 14px">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <div style="width:36px;height:36px;border-radius:50%;background:${gc.color};color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-h);font-weight:700;font-size:.85rem;flex-shrink:0">${p.nombre.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:.88rem;color:var(--text)">${p.nombre}</div>
        <div style="font-size:.75rem;color:var(--muted);margin-top:1px">${p.lastServicio||'—'} · última: ${fechaFmt}</div>
        <div style="font-size:.75rem;font-weight:600;color:${gc.color};margin-top:2px">${p.dias} días sin sesión (${meses} ${meses===1?'mes':'meses'})</div>
      </div>
      <div style="flex-shrink:0">${registrarBtn}</div>
    </div>
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid ${gc.border};display:flex;gap:6px;flex-wrap:wrap;align-items:center">
      <span style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);white-space:nowrap">Enviar por WA:</span>
      ${waBtns}
    </div>
  </div>`;
}

function preRellenaRecuperacion(nombre, servicio) {
  const inpNombre = document.getElementById('recInpPaciente');
  const inpServ   = document.getElementById('recInpServicio');
  const inpFecha  = document.getElementById('recInpFecha');
  if (inpNombre) inpNombre.value = nombre;
  if (inpFecha && !inpFecha.value) inpFecha.value = today();
  // Intentar hacer match del servicio en el select
  if (inpServ && servicio) {
    const opts = Array.from(inpServ.options);
    const srv  = servicio.toLowerCase();
    const match = opts.find(o => srv.includes(o.value.toLowerCase()) || o.value.toLowerCase().includes(srv.split(' ')[0].toLowerCase()));
    if (match) inpServ.value = match.value;
  }
  // Scroll suave al formulario
  const form = document.getElementById('recInpVenta');
  if (form) { form.scrollIntoView({ behavior:'smooth', block:'center' }); form.focus(); }
  if (typeof toast === 'function') toast(`Formulario pre-llenado para ${nombre}`, 'ok');
}

  global.PanelPatientRecovery = Object.freeze({
    _loadRec,
    _saveRec,
    _fmtCLP,
    _recMesActual,
    _initRecMesSel,
    renderRecuperaciones,
    registrarRecuperacion,
    marcarPagado,
    desmarcarPago,
    eliminarRecuperacion,
    pagarTodasComisiones,
    cargarInactivos,
    _recPreguntaDolencia,
    _renderRecMsgSelector,
    renderInactivos,
    _waIconSvg,
    _recInactivoCard,
    preRellenaRecuperacion
  });
})(window);
