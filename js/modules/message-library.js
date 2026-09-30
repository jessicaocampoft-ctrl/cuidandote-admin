(function(global) {
  'use strict';

const _MSG_CATS = {
  atencion:       { label: '💙 Atención al cliente', color: '#2563eb' },
  recordatorio:   { label: '🔔 Recordatorio',   color: '#3b82f6' },
  reagendamiento: { label: '📅 Reagendamiento', color: '#8b5cf6' },
  seguimiento:    { label: '💬 Seguimiento',    color: '#1BBFB0' },
  promocion:      { label: '🎯 Promoción',       color: '#f59e0b' },
  general:        { label: '📋 General',         color: '#6b7280' }
};

// La primera vista de Mensajes prioriza las respuestas que usa el equipo para
// atender nuevos contactos. El usuario todavía puede escoger "Todos".
let _msgCatActiva = 'atencion';

const _MSG_DEFAULTS = [
  { id:'atencion-bienvenida-inicial', cat:'atencion', titulo:'Mensaje inicial de bienvenida',
    texto:'¡Hola! 😊 Muy buenas tardes. Bienvenido(a) a **Cuidándote Fisioterapia** 🩵\n\nCuéntanos, ¿en qué podemos ayudarte? ¿Buscas información sobre alguno de nuestros servicios o tienes alguna molestia en particular?', created:0 },
  { id:'atencion-cuello-espalda', cat:'atencion', titulo:'Descarga de Cuello y Espalda',
    texto:'¡Hola! 😊 Gracias por escribirnos a **Cuidándote Fisioterapia** 💙\n\nNuestra **Descarga de Cuello y Espalda** está enfocada en liberar la tensión y sobrecarga muscular acumulada principalmente en cuello, hombros y espalda.\n\nEs ideal si pasas muchas horas sentado, trabajas frente al computador, entrenas frecuentemente o simplemente sientes el cuello y la espalda cargados, rígidos o cansados.\n\nDurante la sesión realizamos **terapia manual y diferentes técnicas de recuperación**, seleccionadas de acuerdo con lo que necesites.\n\n**La sesión puede incluir, según valoración y necesidad:**\n• Masaje y técnicas manuales de descarga muscular.\n• **Ventosas.**\n• **TENS / electroterapia.**\n• **Pistola de percusión.**\n• **Liberación instrumental.**\n• Aplicación de **calor** cuando esté indicado.\n• Recomendaciones para complementar la sesión.\n\nTodo se adapta a ti; **no utilizamos los equipos simplemente por utilizarlos**, sino que seleccionamos las herramientas apropiadas para lo que encontremos durante la sesión.\n\n**¿Qué buscamos con la descarga?**\n• Disminuir la sensación de tensión y rigidez muscular.\n• Favorecer la relajación de la musculatura sobrecargada.\n• Mejorar la sensación de movilidad.\n• Ayudarte a recuperarte después del entrenamiento o de jornadas exigentes.\n• Disminuir la sensación de pesadez y carga en cuello y espalda.\n\n⏱️ **Duración:** 50 minutos\n💰 **En sede:** $75.000\n\nLas herramientas utilizadas durante la sesión están **incluidas dentro del valor**, de acuerdo con tus necesidades.\n\nSi nos cuentas qué deporte practicas, cuántas veces entrenas por semana y dónde sientes mayor carga, podemos recomendarte la mejor opción. 💙', created:0 },
  { id:'atencion-descarga-completa', cat:'atencion', titulo:'Descarga Muscular Completa',
    texto:'¡Hola! 😊 Gracias por escribirnos a **Cuidándote Fisioterapia** 💙\n\nNuestra **Descarga Muscular Completa** es una sesión de recuperación integral, ideal si entrenas frecuentemente, tienes varias zonas sobrecargadas o sientes que necesitas trabajar tanto tren superior como inferior.\n\nA diferencia de una descarga localizada, contamos con más tiempo para trabajar el cuerpo de manera global, prestando especial atención a las zonas donde presentes mayor tensión.\n\n**Durante la sesión podemos combinar diferentes técnicas y herramientas según tus necesidades:**\n• Masaje y técnicas manuales de descarga muscular.\n• **Ventosas.**\n• **TENS / electroterapia.**\n• **Pistola de percusión.**\n• **Liberación instrumental.**\n• **Botas de compresión.**\n• Aplicación de **calor** cuando esté indicado.\n• Movilidad y recomendaciones de recuperación.\n\nLas técnicas se seleccionan de manera personalizada. No necesariamente utilizamos todos los equipos en todas las sesiones; elegimos aquellos que sean apropiados según la tensión, sobrecarga y necesidades que presentes.\n\n**¿Qué buscamos con esta sesión?**\n• Disminuir la sensación general de tensión y sobrecarga muscular.\n• Favorecer la recuperación después del entrenamiento.\n• Reducir la sensación de fatiga muscular.\n• Mejorar la sensación de movilidad y relajación.\n• Trabajar varias zonas del cuerpo dentro de una misma sesión.\n• Darle al cuerpo un espacio de recuperación después de semanas de alta carga física.\n\n⏱️ **Duración:** 1 hora y 20 minutos\n💰 **En sede:** $110.000\n\nLas herramientas utilizadas durante la sesión están **incluidas dentro del valor**, de acuerdo con tus necesidades.\n\nSi entrenas varias veces por semana o sientes tensión tanto en piernas como en espalda/cuello, esta suele ser nuestra opción más completa. 💙', created:0 },
  { id:'atencion-piernas', cat:'atencion', titulo:'Descarga de Piernas',
    texto:'¡Hola! 😊 Gracias por escribirnos a **Cuidándote Fisioterapia** 💙\n\nNuestra **Descarga de Piernas** está enfocada en la recuperación de miembros inferiores y es ideal si sientes las piernas cansadas, tensas o sobrecargadas después de entrenar, competir o tener semanas de bastante actividad física.\n\nEs una excelente opción para personas que practican running, gimnasio, CrossFit, ciclismo, fútbol, deportes de combate y otras actividades de alta demanda física.\n\n**Durante la sesión podemos utilizar, según tus necesidades:**\n• Masaje y técnicas manuales de descarga muscular.\n• **Ventosas.**\n• **TENS / electroterapia.**\n• **Pistola de percusión.**\n• **Liberación instrumental.**\n• **Botas de compresión**, cuando estén indicadas.\n• Aplicación de **calor** cuando corresponda.\n• Recomendaciones para complementar la sesión.\n\nNo significa que necesariamente utilizaremos todas las herramientas en una misma sesión. Seleccionamos las técnicas y equipos según cómo te encuentres y lo que necesite tu cuerpo.\n\n**¿Qué buscamos?**\n• Disminuir la sensación de tensión y sobrecarga muscular.\n• Favorecer la recuperación después del entrenamiento.\n• Reducir la sensación de piernas cansadas o pesadas.\n• Favorecer la relajación muscular.\n• Mejorar la sensación de movilidad después de periodos de alta carga.\n\n⏱️ **Duración:** 50 minutos\n💰 **En sede:** $75.000\n\nLas herramientas utilizadas durante la sesión están **incluidas dentro del valor**, de acuerdo con tus necesidades.\n\nSi nos cuentas qué deporte practicas, cuántas veces entrenas por semana y dónde sientes mayor carga, podemos recomendarte la mejor opción. 💙', created:0 },
  { id:'atencion-valoracion-inicial', cat:'atencion', titulo:'Valoración Fisioterapéutica Inicial',
    texto:'¡Hola! 😊 Gracias por escribirnos a **Cuidándote Fisioterapia** 💙\n\nNuestra **Valoración Fisioterapéutica Inicial** es el primer paso para conocer qué está pasando, identificar tus necesidades y establecer un plan de tratamiento personalizado.\n\nEstá recomendada si tienes **dolor, una lesión, vienes de una cirugía, presentas alguna limitación para moverte o quieres iniciar/continuar un proceso de fisioterapia**.\n\n**¿Qué realizamos durante la valoración?**\n• Conocemos tus antecedentes, síntomas y motivo de consulta.\n• Evaluamos **movilidad y rangos de movimiento**.\n• Evaluamos **fuerza muscular**.\n• Analizamos cómo te mueves y las posibles limitaciones que estés presentando.\n• Realizamos pruebas específicas de acuerdo con tu lesión, dolor o condición.\n• Evaluamos tu capacidad para realizar actividades cotidianas, laborales o deportivas.\n• Identificamos los principales aspectos que debemos trabajar durante tu proceso.\n\nAl finalizar, establecemos un **diagnóstico fisioterapéutico** y definimos contigo los objetivos y el enfoque del tratamiento.\n\nAdemás, **la valoración incluye tu primera terapia**, por lo que desde esa misma cita podemos comenzar a trabajar de acuerdo con lo encontrado durante la evaluación. 💙\n\n**¿Qué obtienes con tu valoración?**\n• Una evaluación individual de tu caso.\n• Mayor claridad sobre qué capacidades necesitamos trabajar.\n• Objetivos específicos para tu proceso.\n• Un plan de tratamiento de acuerdo con tus necesidades.\n• Orientación sobre la frecuencia y tipo de sesiones recomendadas.\n• Recomendaciones iniciales para comenzar tu recuperación.\n• **Primera terapia incluida.**\n\nNuestro objetivo es que tu proceso **no sea genérico**. Primero queremos saber cómo estás actualmente, qué necesitas recuperar y a qué actividades quieres volver, para comenzar a trabajar desde allí.\n\n⏱️ **Duración:** 40 minutos\n💰 **En sede:** $80.000\n✅ **Incluye valoración + primera terapia**\n\nSi quieres, cuéntanos brevemente **qué molestia tienes, hace cuánto comenzó y si hubo alguna lesión o cirugía previa**, y te orientamos sobre cómo iniciar. 💙', created:0 },
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

function _agregarAtencionClienteSiFalta(revision) {
  if (kvGet(revision)) return;
  const existing = _getMensajesPre();
  const ids = new Set(existing.map(message => message.id));
  const additions = _MSG_DEFAULTS.filter(message => message.cat === 'atencion' && !ids.has(message.id));
  if (additions.length) _setMensajesPre(existing.concat(additions));
  kvSet(revision, '1');
}

function _mensajesDisponibles() {
  const existing = _getMensajesPre();
  const ids = new Set(existing.map(message => message.id));
  const missingCustomerCare = _MSG_DEFAULTS.filter(message => message.cat === 'atencion' && !ids.has(message.id));
  // No dependemos de una migración antigua: si el servidor devuelve una
  // biblioteca anterior, la vista se corrige en este mismo renderizado.
  if (missingCustomerCare.length) {
    const complete = existing.concat(missingCustomerCare);
    _setMensajesPre(complete);
    return complete;
  }
  return existing;
}

function _initMensajesPre() {
  if (!kvGet('mensajes_pre_seeded')) {
    _setMensajesPre(_MSG_DEFAULTS);
    kvSet('mensajes_pre_seeded', '1');
  }
  // Las bibliotecas que ya existían conservan sus ediciones; solo se añaden
  // las respuestas nuevas de atención al cliente una única vez.
  _agregarAtencionClienteSiFalta('mensajes_pre_atencion_v1');
  // Recupera bibliotecas donde una sincronización anterior alcanzó a marcar
  // la migración antes de que se guardaran las plantillas.
  _agregarAtencionClienteSiFalta('mensajes_pre_atencion_v2');
}

function renderMensajes() {
  _initMensajesPre();
  const grid = document.getElementById('msgGrid');
  if (!grid) return;
  const msgs = _mensajesDisponibles();
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
