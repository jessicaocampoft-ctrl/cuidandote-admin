/* Cuidándote Fisioterapia — Paquetes y consumo de sesiones. */
(function (global) {
  'use strict';

function _getPkAsignados()  { try { return JSON.parse(kvGet('pk_asignados') ||'[]'); } catch(e){ return []; } }

function _getPkPlantillas() { try { return JSON.parse(kvGet('pk_plantillas')||'[]'); } catch(e){ return []; } }

function _savePkAsignados(a)  { kvSet('pk_asignados',  JSON.stringify(a)); }

function _savePkPlantillas(a) { kvSet('pk_plantillas', JSON.stringify(a)); }

function abrirModalPaquete(plIdxPre) {
  const plantillas = _getPkPlantillas();
  const sel = document.getElementById('pkPlantillaSel');
  if (sel) sel.innerHTML = '<option value="">— Paquete personalizado —</option>' + plantillas.map((pl,i) => `<option value="${i}" ${i===plIdxPre?'selected':''}>${pl.nombre}</option>`).join('');
  const dl = document.getElementById('pkPacienteList');
  if (dl) {
    const nomCitas = allData.citas.map(c=>c.nombre||'').filter(Boolean);
    const nomPacs  = (allData.pacientes||[]).map(p=>p.nombre||'').filter(Boolean);
    const todos    = [...new Set([...nomCitas, ...nomPacs])].sort();
    dl.innerHTML   = todos.map(n=>`<option value="${n}">`).join('');
  }
  const fi = document.getElementById('pkFechaCompra'); if (fi) fi.value = today();
  const nombre = document.getElementById('pkNombrePaquete'); if (nombre) nombre.value = '';
  const sesiones = document.getElementById('pkSesionesTotal'); if (sesiones) sesiones.value = '';
  const iniciales = document.getElementById('pkSesionesIniciales'); if (iniciales) iniciales.value = 0;
  const valor = document.getElementById('pkValorTotal'); if (valor) valor.value = '';
  const abono = document.getElementById('pkAbonoInicial'); if (abono) abono.value = '';
  if (plIdxPre !== undefined) autocompletarPaqueteDesdePlantilla();
  const pkModal = document.getElementById('modalPaquete'); if (pkModal) pkModal.style.display = 'flex';
}

function autocompletarPaqueteDesdePlantilla() {
  const idx = document.getElementById('pkPlantillaSel')?.value;
  if (idx === undefined || idx === '') return;
  const pl = _getPkPlantillas()[Number(idx)];
  if (!pl) return;
  const nombre = document.getElementById('pkNombrePaquete');
  const sesiones = document.getElementById('pkSesionesTotal');
  const valor = document.getElementById('pkValorTotal');
  if (nombre) nombre.value = pl.nombre || '';
  if (sesiones) sesiones.value = Number(pl.sesiones) || '';
  if (valor) valor.value = pl.precio || '';
}

function abrirModalPlantillaPaquete() { const m = document.getElementById('modalPlantillaPaquete'); if (m) m.style.display='flex'; }

function ajustarSesiones(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  const val = prompt(`Sesiones consumidas de "${p.nombre}" (${p.paciente})\nActual: ${p.consumidas||0} de ${p.sesiones}`, p.consumidas||0);
  if (val === null) return;
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 0) { toast('Número inválido','err'); return; }
  if (n > p.sesiones) { toast(`No puede superar el total (${p.sesiones})`, 'err'); return; }
  p.consumidas = n; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesiones actualizadas: ${n}/${p.sesiones}`);
}

function borrarPaqueteAsignado(idx) {
  if (!confirm('¿Eliminar este paquete?')) return;
  const a = _getPkAsignados(); a.splice(idx,1); _savePkAsignados(a); renderPaquetes();
}

function borrarPlantillaPaquete(idx) {
  if (!confirm('¿Eliminar esta plantilla?')) return;
  const a = _getPkPlantillas(); a.splice(idx,1); _savePkPlantillas(a); renderPaquetes();
}

// ══════════════════════════════════════════════════════════════
// ── EMPRESAS CRM ──
// ══════════════════════════════════════════════════════════════

function renderPaquetes() {
  const search   = ((document.getElementById('pkSearch')||{}).value||'').toLowerCase();
  const plantillas = _getPkPlantillas();
  const asignados  = _getPkAsignados();
  const hoy = today();
  const activos   = asignados.filter(p => p.vencimiento >= hoy && (p.sesiones - (p.consumidas||0)) > 0);
  const agotados  = asignados.filter(p => (p.sesiones - (p.consumidas||0)) <= 0);
  const porVencer = asignados.filter(p => {
    if ((p.sesiones-(p.consumidas||0)) <= 0) return false;
    const diff = Math.round((new Date(p.vencimiento+'T12:00:00') - new Date(hoy+'T12:00:00'))/86400000);
    return diff >= 0 && diff <= 7;
  });
  const valorTotal = activos.reduce((s,p) => s + Number(p.valorTotal ?? parsePrecio(p.precio || 0)), 0);
  const sv = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  sv('pkActivos', activos.length); sv('pkValor', '$'+valorTotal.toLocaleString('es-CO'));
  sv('pkPorVencer', porVencer.length); sv('pkAgotados', agotados.length);

  const plEl = document.getElementById('pkPlantillas');
  if (plEl) {
    plEl.innerHTML = plantillas.length
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${
          plantillas.map((pl,i) => `<div style="padding:14px;background:var(--s2);border-radius:10px;border:1px solid var(--border)">
            <div style="font-weight:700;font-family:var(--font-h);margin-bottom:4px">${pl.nombre}</div>
            <div style="font-size:.8rem;color:var(--muted)">${pl.sesiones} sesiones · $${parsePrecio(pl.precio).toLocaleString('es-CO')} · ${pl.vigencia||60} días</div>
            ${pl.servicios?`<div style="font-size:.75rem;color:var(--muted);margin-top:2px">${pl.servicios}</div>`:''}
            <div style="display:flex;gap:6px;margin-top:10px">
              <button class="btn btn-teal btn-sm" onclick="abrirModalPaquete(${i})">Asignar</button>
              <button class="btn btn-ghost btn-sm" onclick="borrarPlantillaPaquete(${i})">🗑️</button>
            </div>
          </div>`).join('')}</div>`
      : '<div class="empty" style="padding:20px 0"><p>Sin plantillas. Crea una para empezar.</p></div>';
  }

  const pkListaEl = document.getElementById('pkLista');
  if (!pkListaEl) return;
  let lista = asignados;
  if (search) lista = lista.filter(p => (p.paciente||'').toLowerCase().includes(search));
  if (!lista.length) {
    pkListaEl.innerHTML = '<div class="empty" style="padding:30px 0"><p>Sin paquetes asignados</p></div>';
    return;
  }
  pkListaEl.innerHTML = lista.map((p, i) => {
    const rest = (p.sesiones||0) - (p.consumidas||0);
    const pct  = p.sesiones > 0 ? Math.round((p.consumidas||0)/p.sesiones*100) : 0;
    const agotado   = rest <= 0;
    const penultimo = rest === 1;
    const vencido   = p.vencimiento && p.vencimiento < hoy;
    const borderC   = agotado?'rgba(239,68,68,.35)':penultimo?'rgba(251,191,36,.35)':'var(--border)';
    const barC      = agotado?'#ef4444':penultimo?'#f59e0b':'var(--primary)';
    const pkTel    = (p.telefono || '').replace(/\D/g, '');
    const pkNombre = (p.paciente || '').split(' ')[0];
    const valorPaquete = Number(p.valorTotal ?? parsePrecio(p.precio || 0));
    const abonado = Number(p.abonado || 0);
    const saldo = Math.max(0, valorPaquete - abonado);
    const pagoColor = saldo > 0 ? '#d97706' : '#059669';
    const _pkWa    = (msg) => pkTel.length >= 7 ? `https://wa.me/57${pkTel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
    let alerta = '';
    if (agotado) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Tu paquete "${p.nombre||''}" se agoto. ¿Quieres renovarlo para continuar con tu tratamiento? Te paso las opciones disponibles. \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">🔴 Paquete agotado — proponer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-teal btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (penultimo) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u2757 Te aviso que te queda solo 1 sesion en tu paquete "${p.nombre||''}". ¿Renovamos antes de que se acabe para no perder el ritmo? \uD83D\uDCAA`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#92400e">⚠️ Última sesión restante — ofrecer renovación</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-sm" style="background:#f59e0b;color:#fff;border:none;text-decoration:none;font-size:.75rem">💬 WA Renovación</a>` : ''}
      </div>`;
    } else if (vencido) {
      const waLink = _pkWa(`Hola ${pkNombre}! \u274C Tu paquete "${p.nombre||''}" vencio el ${fmtDate(p.vencimiento)}. Si quieres seguir con tu plan, podemos renovarlo ahora. ¿Te interesa? \uD83D\uDE4F`);
      alerta = `<div style="margin-top:8px;padding:7px 12px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:.8rem;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="color:#dc2626">⏰ Paquete vencido (${fmtDate(p.vencimiento)})</span>
        ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-err btn-sm" style="text-decoration:none;font-size:.75rem">💬 WA Recordar</a>` : ''}
      </div>`;
    }
    return `<div style="padding:14px 18px;border:1.5px solid ${borderC};border-radius:12px;margin-bottom:10px;background:var(--s1)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:6px">
        <div>
          <div style="font-weight:700;font-family:var(--font-h)">${p.paciente||'—'}</div>
          <div style="font-size:.8rem;color:var(--muted)">${p.nombre||'—'} · Comprado: ${fmtDate(p.fechaCompra)} · Vence: ${p.vencimiento?fmtDate(p.vencimiento):'—'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-m);font-size:.82rem;color:var(--primary)">Sesión ${agotado ? p.sesiones : (p.consumidas||0)+1} de ${p.sesiones||0}</div>
          <div style="font-size:.75rem;color:var(--muted)">Realizadas: <strong>${p.consumidas||0}</strong> · Restantes: <strong>${rest}</strong></div>
          ${valorPaquete > 0 ? `<div style="font-size:.75rem;color:${pagoColor};margin-top:4px">Pagado: <strong>${fmtPeso(abonado)}</strong> · Debe: <strong>${fmtPeso(saldo)}</strong></div>` : ''}
        </div>
      </div>
      <div style="margin:10px 0 4px;background:var(--s2);border-radius:99px;height:8px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${barC};border-radius:99px;transition:width .5s"></div></div>
      ${alerta}
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
        <button class="btn btn-teal btn-sm" onclick="usarSesion(${i})" ${agotado?'disabled':''}>➕ Usar sesión</button>
        ${valorPaquete > 0 && saldo > 0 ? `<button class="btn btn-ghost btn-sm" onclick="PanelPackages.registrarAbonoPaquete(${i})">💳 Registrar abono</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="ajustarSesiones(${i})">✏️ Ajustar sesiones</button>
        <button class="btn btn-ghost btn-sm" onclick="borrarPaqueteAsignado(${i})">🗑️ Eliminar</button>
      </div>
    </div>`;
  }).join('');
}

function usarSesion(idx) {
  const a = _getPkAsignados(); const p = a[idx]; if (!p) return;
  if ((p.consumidas||0) >= p.sesiones) { toast('Paquete agotado','err'); return; }
  p.consumidas = (p.consumidas||0)+1; _savePkAsignados(a);
  renderPaquetes(); toast(`Sesión registrada: ${p.consumidas}/${p.sesiones}`);
}

function registrarAbonoPaquete(idx) {
  const paquetes = _getPkAsignados();
  const p = paquetes[idx];
  if (!p) return;
  const total = Number(p.valorTotal ?? parsePrecio(p.precio || 0));
  const actual = Number(p.abonado || 0);
  const saldo = Math.max(0, total - actual);
  const valor = prompt(`Abono de "${p.nombre}" (${p.paciente})\nSaldo actual: ${fmtPeso(saldo)}\n¿Cuánto recibió?`, '');
  if (valor === null) return;
  const abono = parsePrecio(valor);
  if (!abono || abono <= 0 || abono > saldo) { toast('Ingresa un abono válido que no supere el saldo','err'); return; }
  p.valorTotal = total;
  p.abonado = actual + abono;
  _savePkAsignados(paquetes);
  renderPaquetes();
  toast(`Abono registrado. Saldo: ${fmtPeso(total - p.abonado)}`);
}

function _normalizarPaciente(value) {
  return String(value || '').trim().toLocaleLowerCase('es-CO').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');
}

function _telefonoComparable(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 7 ? digits.slice(-10) : '';
}

function _paqueteParaCita(cita, paquetes = _getPkAsignados()) {
  const nombre = _normalizarPaciente(cita?.nombre);
  const tel = _telefonoComparable(cita?.telefono);
  return paquetes
    .map((p, index) => ({p, index}))
    .filter(({p}) => {
      const coincideTelefono = tel && _telefonoComparable(p.telefono) === tel;
      const coincideNombre = nombre && _normalizarPaciente(p.paciente) === nombre;
      return (coincideTelefono || coincideNombre) && Number(p.sesiones || 0) > Number(p.consumidas || 0);
    })
    .sort((a, b) => String(b.p.fechaCompra || '').localeCompare(String(a.p.fechaCompra || '')))[0];
}

function consumeSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const found = _paqueteParaCita(cita, paquetes);
  if (!found) return {ok:false};
  const {p} = found;
  p.consumoCitas = Array.isArray(p.consumoCitas) ? p.consumoCitas : [];
  const existing = p.consumoCitas.find(item => String(item.id) === String(cita.id));
  if (existing) return {ok:true, already:true, paquete:p, sesion:Number(existing.sesion || p.consumidas)};
  p.consumidas = Number(p.consumidas || 0) + 1;
  p.consumoCitas.push({id:String(cita.id), sesion:p.consumidas});
  _savePkAsignados(paquetes);
  if (document.getElementById('pkLista')) renderPaquetes();
  return {ok:true, paquete:p, sesion:p.consumidas};
}

function releaseSessionForAppointment(cita) {
  if (!cita?.id) return {ok:false};
  const paquetes = _getPkAsignados();
  const found = paquetes.map((p, index) => ({p, index})).find(({p}) =>
    Array.isArray(p.consumoCitas) && p.consumoCitas.some(item => String(item.id) === String(cita.id))
  );
  if (!found) return {ok:false};
  const {p} = found;
  p.consumoCitas = p.consumoCitas.filter(item => String(item.id) !== String(cita.id));
  p.consumidas = Math.max(0, Number(p.consumidas || 0) - 1);
  _savePkAsignados(paquetes);
  if (document.getElementById('pkLista')) renderPaquetes();
  return {ok:true, paquete:p};
}

function getAppointmentPackageBadge(cita) {
  const paquetes = _getPkAsignados();
  const found = paquetes.map(p => ({p, record:(p.consumoCitas || []).find(item => String(item.id) === String(cita?.id))}))
    .find(item => item.record) || _paqueteParaCita(cita, paquetes);
  if (!found) return '';
  const p = found.p;
  const sesion = found.record ? Number(found.record.sesion) : Math.min(Number(p.sesiones || 0), Number(p.consumidas || 0) + 1);
  const total = Number(p.sesiones || 0);
  if (!sesion || !total) return '';
  const estado = found.record ? 'registrada' : 'próxima';
  return `<br><span style="font-size:.72rem;color:var(--primary);font-weight:700">📦 ${esc(p.nombre || 'Paquete')} · Sesión ${sesion} de ${total} (${estado})</span>`;
}

  global.PanelPackages = Object.freeze({
    _getPkAsignados,
    _getPkPlantillas,
    _savePkAsignados,
    _savePkPlantillas,
    abrirModalPaquete,
    autocompletarPaqueteDesdePlantilla,
    abrirModalPlantillaPaquete,
    ajustarSesiones,
    borrarPaqueteAsignado,
    borrarPlantillaPaquete,
    renderPaquetes,
    usarSesion,
    registrarAbonoPaquete,
    consumeSessionForAppointment,
    releaseSessionForAppointment,
    getAppointmentPackageBadge
  });
})(window);
