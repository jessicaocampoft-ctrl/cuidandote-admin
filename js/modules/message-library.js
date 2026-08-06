(function(global) {
  'use strict';

const _MSG_CATS = {
  recordatorio:   { label: '🔔 Recordatorio',   color: '#3b82f6' },
  reagendamiento: { label: '📅 Reagendamiento', color: '#8b5cf6' },
  seguimiento:    { label: '💬 Seguimiento',    color: '#1BBFB0' },
  promocion:      { label: '🎯 Promoción',       color: '#f59e0b' },
  general:        { label: '📋 General',         color: '#6b7280' }
};

let _msgCatActiva = '';

const _MSG_DEFAULTS = [
  { id:'def1', cat:'recordatorio',   titulo:'Confirmación de cita',
    texto:'Hola {nombre}! Te escribo para confirmar tu cita 📋\n\n*{servicio}*\n{fecha} · {hora}\n📍 En sitio\n\nResponde:\n✅ *1* — Sí confirmo mi asistencia\n❌ *2* — Necesito cancelar o cambiar el horario\n\nGracias! — Cuidándote Fisioterapia', created:0 },
  { id:'def2', cat:'recordatorio',   titulo:'Recordatorio de cita (día anterior)',
    texto:'Hola {nombre}! 👋 Te recuerdo tu cita de *{servicio}* mañana {fecha} a las {hora}. Recuerda llegar unos minutos antes con ropa cómoda. 💪\n\nCualquier duda me avisas. — Cuidándote Fisioterapia', created:0 },
  { id:'def3', cat:'seguimiento',    titulo:'Post-sesión — Descarga muscular',
    texto:'Hola {nombre}! 👋 Soy Jessica. Han pasado 2 días desde tu sesión de Descarga Muscular. ¿Cómo te has sentido? ¿Notas mejoría en la zona trabajada? Cualquier molestia me cuentas para ajustar tu próximo plan. 💪', created:0 },
  { id:'def4', cat:'seguimiento',    titulo:'Post-sesión — Valoración funcional',
    texto:'Hola {nombre}! 👋 Soy Jessica. ¿Cómo te has sentido después de la Valoración Funcional de ayer? Si tienes alguna duda sobre los hallazgos o el plan que conversamos, quedo atenta. 🙏', created:0 },
  { id:'def5', cat:'seguimiento',    titulo:'Post-sesión — Readaptación funcional',
    texto:'Hola {nombre}! 👋 Soy Jessica. ¿Cómo te ha ido con los ejercicios del plan de ayer? Recuerda hacer las repeticiones que acordamos. Si sientes alguna molestia o duda, me cuentas para ajustarlo. 💪', created:0 },
  { id:'def6', cat:'seguimiento',    titulo:'Encuesta de satisfacción',
    texto:'Hola {nombre}! 😊 Tu opinión me importa mucho. ¿Me regalas 2 minutos para contarme cómo fue tu experiencia? 🙏\n\nhttps://forms.gle/srX1enyKN59n8TfQA\n\n⭐ ¡Premio! Cuando termines la encuesta, envíame un pantallazo y en tu próxima sesión te regalo 10 min de Botas de Compresión 💪\n\nGracias por confiar en mí! — Cuidándote Fisioterapia', created:0 },
  { id:'def7', cat:'reagendamiento', titulo:'Recordatorio semana 5 (35–41 días)',
    texto:'Hola {nombre}! 👋 Te escribimos de Cuidándote Fisioterapia. Ya van 5 semanas desde tu última sesión de Descarga Muscular. La próxima semana sería el momento ideal para reagendar antes de que el cuerpo empiece a acumular tensión. ¿Te agendo?', created:0 },
  { id:'def8', cat:'reagendamiento', titulo:'Recordatorio semana 6 (42–48 días)',
    texto:'Hola {nombre}! 👋 Te escribimos de Cuidándote Fisioterapia. Ya se cumplieron las 6 semanas desde tu última sesión de Descarga Muscular — es el momento de reagendar. Mantener la frecuencia es lo que hace que los resultados se sostengan. ¿Te agendo esta semana?', created:0 },
  { id:'def9', cat:'reagendamiento', titulo:'Urgente semana 7+ (49+ días)',
    texto:'Hola {nombre}! 👋 Te escribimos de Cuidándote Fisioterapia. Hace más de un mes desde tu última sesión de Descarga Muscular. El cuerpo ya empieza a acumular tensión de nuevo. ¿Cuándo te viene bien retomar? Cuéntame y coordinamos. 💪', created:0 },
  { id:'def10', cat:'promocion',     titulo:'Renovación de paquete (1 sesión restante)',
    texto:'Hola {nombre}! ❗ Te aviso que te queda solo 1 sesión en tu paquete. ¿Renovamos antes de que se acabe para no perder el ritmo? 💪\n— Cuidándote Fisioterapia', created:0 },
  { id:'def11', cat:'promocion',     titulo:'Paquete vencido — invitación a renovar',
    texto:'Hola {nombre}! ❌ Tu paquete venció. Si quieres seguir con tu plan, podemos renovarlo ahora. ¿Te interesa? 🙏\n— Cuidándote Fisioterapia', created:0 },
  { id:'def12', cat:'general',       titulo:'Envío de link Pasaporte',
    texto:'Hola {nombre}! 👋 Aquí te comparto tu link de seguimiento personal donde puedes ver el historial de tus sesiones. 📱\n\n{link_pasaporte}\n\n— Cuidándote Fisioterapia', created:0 }
];

function _getMensajesPre() {
  try { return JSON.parse(kvGet('mensajes_pre') || '[]'); } catch(e) { return []; }
}

function _setMensajesPre(arr) { kvSet('mensajes_pre', JSON.stringify(arr)); }

function _initMensajesPre() {
  if (kvGet('mensajes_pre_seeded')) return;
  _setMensajesPre(_MSG_DEFAULTS);
  kvSet('mensajes_pre_seeded', '1');
}

function renderMensajes() {
  _initMensajesPre();
  const grid = document.getElementById('msgGrid');
  if (!grid) return;
  const msgs = _getMensajesPre();
  const filtrados = _msgCatActiva ? msgs.filter(m => m.cat === _msgCatActiva) : msgs;
  if (!filtrados.length) {
    grid.innerHTML = '<div class="empty"><div style="font-size:2.5rem;margin-bottom:12px">💬</div><div>No hay mensajes aquí todavía.<br>Crea el primero con <strong>+ Nuevo mensaje</strong></div></div>';
    return;
  }
  grid.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">'
    + filtrados.map(_msgCard).join('') + '</div>';
}

function _msgCard(m) {
  const cat = _MSG_CATS[m.cat] || _MSG_CATS.general;
  const preview = m.texto.length > 130 ? m.texto.slice(0, 130) + '…' : m.texto;
  return `<div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:20px;border-left:3px solid ${cat.color};display:flex;flex-direction:column;gap:12px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
      <div>
        <div style="font-family:var(--font-h);font-size:1rem;font-weight:600;margin-bottom:5px">${m.titulo}</div>
        <span style="font-size:.72rem;font-weight:700;color:${cat.color};background:${cat.color}1a;padding:2px 9px;border-radius:99px">${cat.label}</span>
      </div>
      <div style="display:flex;gap:2px;flex-shrink:0">
        <button onclick="editarMensaje('${m.id}')" title="Editar" style="background:none;border:none;cursor:pointer;color:var(--muted);padding:5px;border-radius:6px;font-size:.95rem" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--muted)'">✏️</button>
        <button onclick="eliminarMensaje('${m.id}')" title="Eliminar" style="background:none;border:none;cursor:pointer;color:var(--muted);padding:5px;border-radius:6px;font-size:.95rem" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='var(--muted)'">🗑️</button>
      </div>
    </div>
    <div style="font-size:.84rem;color:var(--muted);line-height:1.65;white-space:pre-wrap;flex:1">${preview}</div>
    <button onclick="copiarMensajePre('${m.id}')" style="padding:10px 16px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-size:.84rem;font-weight:600" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
      📋 Copiar mensaje
    </button>
  </div>`;
}

function setMsgCat(cat) {
  _msgCatActiva = cat;
  document.querySelectorAll('[id^="msgChip-"]').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById('msgChip-' + (cat || 'all'));
  if (chip) chip.classList.add('active');
  renderMensajes();
}

function abrirNuevoMensaje() {
  document.getElementById('msgModalTitle').textContent = 'Nuevo mensaje';
  document.getElementById('msgEditId').value = '';
  document.getElementById('msgTitulo').value = '';
  document.getElementById('msgCat').value = _msgCatActiva || 'recordatorio';
  document.getElementById('msgTexto').value = '';
  openModal('modalMensaje');
  setTimeout(() => document.getElementById('msgTitulo').focus(), 100);
}

function editarMensaje(id) {
  const m = _getMensajesPre().find(x => x.id === id);
  if (!m) return;
  document.getElementById('msgModalTitle').textContent = 'Editar mensaje';
  document.getElementById('msgEditId').value = id;
  document.getElementById('msgTitulo').value = m.titulo;
  document.getElementById('msgCat').value = m.cat;
  document.getElementById('msgTexto').value = m.texto;
  openModal('modalMensaje');
}

function guardarMensaje() {
  const titulo = document.getElementById('msgTitulo').value.trim();
  const cat    = document.getElementById('msgCat').value;
  const texto  = document.getElementById('msgTexto').value.trim();
  if (!titulo || !texto) { toast('Completa el título y el mensaje', 'err'); return; }
  const msgs  = _getMensajesPre();
  const editId = document.getElementById('msgEditId').value;
  if (editId) {
    const idx = msgs.findIndex(m => m.id === editId);
    if (idx >= 0) msgs[idx] = { ...msgs[idx], titulo, cat, texto };
  } else {
    msgs.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,5), titulo, cat, texto, created: Date.now() });
  }
  _setMensajesPre(msgs);
  closeModal('modalMensaje');
  renderMensajes();
  toast('Mensaje guardado ✓', 'ok');
}

function eliminarMensaje(id) {
  if (!confirm('¿Eliminar este mensaje?')) return;
  _setMensajesPre(_getMensajesPre().filter(m => m.id !== id));
  renderMensajes();
  toast('Mensaje eliminado', 'ok');
}

function copiarMensajePre(id) {
  const m = _getMensajesPre().find(x => x.id === id);
  if (!m) return;
  navigator.clipboard.writeText(m.texto)
    .then(() => toast('Copiado al portapapeles ✓', 'ok'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = m.texto; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      toast('Copiado al portapapeles ✓', 'ok');
    });
}

function gEditarToggle(id, btn) {
  const ta = document.getElementById(id);
  if (!ta) return;
  const editing = ta.readOnly;
  if (editing) {
    ta.readOnly = false;
    ta.style.background = 'var(--bg, #fff)';
    ta.style.cursor = 'text';
    ta.style.border = '2px solid var(--primary, #0ea5e9)';
    ta.style.outline = 'none';
    btn.textContent = '✕ Cerrar edición';
    btn.classList.remove('btn-ghost');
    btn.classList.add('btn-teal');
    ta.focus();
  } else {
    ta.readOnly = true;
    ta.style.background = 'var(--s2)';
    ta.style.cursor = 'default';
    ta.style.border = '1px solid var(--border)';
    btn.textContent = '✏️ Editar';
    btn.classList.remove('btn-teal');
    btn.classList.add('btn-ghost');
    gAutoGuardar(id);
  }
}

function gAutoGuardar(id) {
  const el = document.getElementById(id);
  if (!el) return;
  gFitHeight(el);
  localStorage.setItem('gMsg_' + id, el.value);
}

function gFitHeight(ta) {
  ta.style.height = 'auto';
  ta.style.height = ta.scrollHeight + 'px';
}

function gCargarGuardados() {
  document.querySelectorAll('textarea[id^="gMsg-"]').forEach(el => {
    const saved = localStorage.getItem('gMsg_' + el.id);
    if (saved !== null) el.value = saved;
    gFitHeight(el);
  });
}

function gTabSwitch(tab) {
  ['servicios','paquetes','membresias','recuperacion'].forEach(t => {
    const el = document.getElementById('gTab-' + t);
    const btn = document.getElementById('tabN' + t.charAt(0).toUpperCase() + t.slice(1)) || document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.style.display = t === tab ? 'block' : 'none';
    if (btn) {
      btn.className = t === tab ? 'btn btn-teal btn-sm' : 'btn btn-ghost btn-sm';
    }
  });
}

function gCopiar(id, btn) {
  const el = document.getElementById(id); const txt = el.tagName === "TEXTAREA" ? el.value : el.innerText;
  navigator.clipboard.writeText(txt).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✅ Copiado';
    btn.style.background = '#16a34a';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    const range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    const orig = btn.textContent;
    btn.textContent = '✅ Copiado';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

  global.PanelMessageLibrary = Object.freeze({
    _getMensajesPre,
    _setMensajesPre,
    _initMensajesPre,
    renderMensajes,
    _msgCard,
    setMsgCat,
    abrirNuevoMensaje,
    editarMensaje,
    guardarMensaje,
    eliminarMensaje,
    copiarMensajePre,
    gEditarToggle,
    gAutoGuardar,
    gFitHeight,
    gCargarGuardados,
    gTabSwitch,
    gCopiar
  });
})(window);
