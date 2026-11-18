/* Cuidándote Fisioterapia — Agente IA de redes sociales.
 * El panel conserva configuración, conocimiento y trazabilidad en AdminKV.
 * La publicación real está bloqueada hasta que un gateway firmado de Meta sea configurado.
 */
(function (global) {
  'use strict';
  const KEYS = { config: 'social_agent_config_v1', knowledge: 'social_agent_knowledge_v1', history: 'social_agent_history_v1', audit: 'social_agent_audit_v1' };
  const safeCategories = ['Información de servicios', 'Consulta de precios', 'Ubicación y horarios', 'Solicitud de agendamiento', 'Interés en entrenamiento funcional', 'Consulta de masajes y bienestar', 'Agradecimientos y comentarios positivos'];
  const defaults = {
    enabled: false, facebook: false, instagram: false, autoPublish: false, tone: 'Cálido y profesional', length: 'Breve', whatsapp: 'https://wa.me/573136467945',
    allowed: safeCategories, escalation: ['Quejas o reclamos', 'Comentarios de riesgo clínico', 'Consultas sin información suficiente'], metaStatus: 'Pendiente de configuración segura'
  };
  const defaultKnowledge = {
    location: 'Santa Mónica, Dosquebradas, Risaralda, Colombia', website: 'https://cuidandotefisioterapia.com',
    training: 'Lunes a viernes entre 5:00 a. m. y 9:00 a. m.; sesiones de una hora; grupos de máximo cuatro personas; tres días de cortesía; supervisión profesional y respaldo de fisioterapia.',
    services: [
      ['Valoración funcional', 80000], ['Readaptación funcional', 70000], ['Descarga muscular cuello y espalda', 75000], ['Descarga muscular completa', 110000], ['Masaje relajante Pausa', 85000], ['Ritual Cuidándote', 125000], ['Profundo Cuidándote', 175000], ['Entrenamiento funcional 3 días/semana', 185000], ['Entrenamiento funcional 5 días/semana', 240000]
    ],
    faqs: []
  };
  const $ = id => document.getElementById(id);
  const clone = x => JSON.parse(JSON.stringify(x));
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const money = n => '$' + Number(n || 0).toLocaleString('es-CO');
  function read(key, fallback) { try { const raw = global.kvGet?.(key) || localStorage.getItem(key); return raw ? JSON.parse(raw) : clone(fallback); } catch (_) { return clone(fallback); } }
  function write(key, value) { global.kvSet?.(key, JSON.stringify(value)); if (!global.kvSet) localStorage.setItem(key, JSON.stringify(value)); }
  function state() { return { config: { ...defaults, ...read(KEYS.config, defaults) }, knowledge: { ...clone(defaultKnowledge), ...read(KEYS.knowledge, defaultKnowledge) }, history: read(KEYS.history, []), audit: read(KEYS.audit, []) }; }
  function audit(action, detail) { const s = state(); s.audit.push({ at: new Date().toISOString(), action, detail }); write(KEYS.audit, s.audit.slice(-300)); }
  function classify(text) {
    const t = String(text || '').toLowerCase();
    if (/(emergencia|urgencia|no puedo mover|dolor pecho|desmayo|suicid|sangrado|fractura)/.test(t)) return 'Comentarios de riesgo clínico';
    if (/(queja|reclamo|malo|terrible|denuncia|estafa|devolución)/.test(t)) return 'Quejas o reclamos';
    if (/(gracias|excelente|recomend|felicit)/.test(t)) return 'Agradecimientos y comentarios positivos';
    if (/(precio|cuánto|cuanto|vale|tarifa|costo)/.test(t)) return 'Consulta de precios';
    if (/(entrenamiento|gym|gimnasio|funcional|3 días|5 días)/.test(t)) return 'Interés en entrenamiento funcional';
    if (/(masaje|relajante|ritual|descarga)/.test(t)) return 'Consulta de masajes y bienestar';
    if (/(dónde|donde|ubicación|direccion|horario|hora abren)/.test(t)) return 'Ubicación y horarios';
    if (/(agenda|agendar|cita|reservar|disponibilidad)/.test(t)) return 'Solicitud de agendamiento';
    if (/(fisioterapia|dolor|lesión|lesion|rodilla|espalda|cuello)/.test(t)) return 'Pregunta general de fisioterapia';
    if (/(servicio|hacen|ofrecen|tratamiento)/.test(t)) return 'Información de servicios';
    if (t.length < 3 || /(http|crypto|seguidores|gana dinero)/.test(t)) return 'Spam o mensajes irrelevantes';
    return 'Consultas sin información suficiente';
  }
  function responseFor(text, category, k, c) {
    const t = String(text).toLowerCase(); const wa = c.whatsapp || 'WhatsApp';
    const service = k.services.find(x => t.includes(x[0].toLowerCase().split(' ')[0]));
    if (category === 'Consulta de precios') return service ? `¡Hola! ${service[0]} tiene un valor de ${money(service[1])}. Si quieres, te orientamos según lo que buscas por WhatsApp: ${wa}` : `¡Hola! Estos son algunos de nuestros servicios: ${k.services.map(x => `${x[0]} (${money(x[1])})`).join(', ')}. Para orientarte y agendar, escríbenos por WhatsApp: ${wa}`;
    if (category === 'Ubicación y horarios') return `Estamos en ${k.location}. Para confirmar el horario que te sirve, escríbenos por WhatsApp: ${wa}`;
    if (category === 'Solicitud de agendamiento') return `¡Claro! Con gusto te ayudamos a agendar. Escríbenos por WhatsApp: ${wa} y revisamos opciones disponibles.`;
    if (category === 'Interés en entrenamiento funcional') return `¡Qué bueno que te interesa nuestro entrenamiento funcional! ${k.training} El plan de 3 días vale ${money(185000)} y el de 5 días ${money(240000)} mensuales. Para conocer cupos, escríbenos: ${wa}`;
    if (category === 'Consulta de masajes y bienestar') return `Tenemos opciones de bienestar como masaje relajante Pausa (${money(85000)}), Ritual Cuidándote (${money(125000)}) y Profundo Cuidándote (${money(175000)}). Cuéntanos qué buscas por WhatsApp y te orientamos.`;
    if (category === 'Agradecimientos y comentarios positivos') return '¡Muchas gracias por tu confianza! Nos alegra muchísimo acompañarte. 💙';
    if (category === 'Información de servicios') return `Ofrecemos valoración funcional, readaptación, descargas musculares, masajes de bienestar y entrenamiento funcional. Cuéntanos qué estás buscando y te orientamos.`;
    return 'Gracias por escribirnos. Para darte una orientación responsable, cuéntanos un poco más por WhatsApp y revisamos cómo ayudarte.';
  }
  function simulate() {
    const text = $('socialTestComment')?.value.trim(); if (!text) return alert('Escribe un comentario para simular.');
    const s = state(), category = classify(text), safe = s.config.allowed.includes(category), escalated = !safe || s.config.escalation.includes(category) || category === 'Pregunta general de fisioterapia';
    const item = { id: 'SIM-' + Date.now(), platform: $('socialTestPlatform')?.value || 'Instagram', post: 'Simulación local', author: 'Usuario de prueba', comment: text, category, response: escalated ? '' : responseFor(text, category, s.knowledge, s.config), status: escalated ? 'Pendiente de revisión' : 'Simulado — listo para publicar', createdAt: new Date().toISOString(), potentialLead: /precio|agenda|agendar|servicio|entrenamiento|masaje/.test(text.toLowerCase()), simulated: true };
    s.history.unshift(item); write(KEYS.history, s.history.slice(0, 1000)); audit('Simulación procesada', `${item.platform}: ${category}`); render();
  }
  function saveConfig() { const s = state(); s.config.enabled = $('saEnabled').checked; s.config.facebook = $('saFacebook').checked; s.config.instagram = $('saInstagram').checked; s.config.autoPublish = false; s.config.tone = $('saTone').value; s.config.length = $('saLength').value; s.config.whatsapp = $('saWhatsapp').value.trim(); s.config.allowed = safeCategories.filter((_, i) => $('saAllowed' + i)?.checked); write(KEYS.config, s.config); audit('Configuración actualizada', 'La publicación real permanece desactivada'); render(); alert('Configuración guardada. La publicación real sigue desactivada hasta completar Meta y autorizar la activación.'); }
  function saveKnowledge() { const s = state(); s.knowledge.location = $('saLocation').value.trim(); s.knowledge.website = $('saWebsite').value.trim(); s.knowledge.training = $('saTraining').value.trim(); try { s.knowledge.services = JSON.parse($('saServices').value); s.knowledge.faqs = JSON.parse($('saFaqs').value || '[]'); } catch (_) { return alert('Servicios y preguntas frecuentes deben estar en formato JSON válido.'); } write(KEYS.knowledge, s.knowledge); audit('Base de conocimientos actualizada', 'Servicios, ubicación, horarios o FAQ'); alert('Base de conocimientos guardada.'); }
  function stat(label, value, color) { return `<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};padding:12px;border-radius:10px"><div style="font-size:.74rem;color:var(--muted)">${label}</div><b style="font-size:1.25rem;color:${color}">${value}</b></div>`; }
  function render() { const s = state(); const h = s.history; const auto = h.filter(x => x.status.includes('listo')).length, pending = h.filter(x => x.status.includes('Pendiente')).length, leads = h.filter(x => x.potentialLead).length; if ($('socialStats')) $('socialStats').innerHTML = [stat('Comentarios recibidos', h.length, '#2563eb'), stat('Respuestas simuladas', auto, '#059669'), stat('Pendientes', pending, '#d97706'), stat('Oportunidades', leads, '#7c3aed')].join(''); if ($('socialHistory')) $('socialHistory').innerHTML = h.length ? h.slice(0, 80).map(x => `<article style="border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;background:var(--s2)"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><b>${esc(x.platform)} · ${esc(x.category)}</b><span style="font-size:.75rem;color:${x.status.includes('Pendiente') ? '#b45309' : '#047857'}">${esc(x.status)}</span></div><div style="font-size:.85rem;margin-top:7px"><b>Comentario:</b> ${esc(x.comment)}</div>${x.response ? `<div style="font-size:.85rem;margin-top:5px"><b>Respuesta:</b> ${esc(x.response)}</div>` : '<div style="font-size:.82rem;color:#b45309;margin-top:5px">Escalado: requiere revisión humana; no se generó publicación.</div>'}<div style="font-size:.72rem;color:var(--muted);margin-top:7px">${new Date(x.createdAt).toLocaleString('es-CO')} ${x.potentialLead ? '· Oportunidad comercial potencial (sin atribución automática)' : ''}</div></article>`).join('') : '<div class="notice">Aún no hay comentarios. Usa la simulación para probar el flujo antes de conectar Meta.</div>'; }
  async function loadRemoteEvents() {
    if (!global.PanelConfig?.APPS_SCRIPT_URL || typeof TOKEN === 'undefined' || !TOKEN) return;
    try {
      const url = `${global.PanelConfig.APPS_SCRIPT_URL}?action=socialAgentData&token=${encodeURIComponent(TOKEN)}`;
      const data = global.PanelApi?.fetchJsonWithTimeout ? await global.PanelApi.fetchJsonWithTimeout(url, {}, 20000) : await fetch(url).then(r => r.json());
      if (!data?.ok || !Array.isArray(data.items)) return;
      const simulations = state().history.filter(x => x.simulated);
      write(KEYS.history, [...data.items, ...simulations].sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || ''))).slice(0, 1000));
      render();
    } catch (_) { /* La simulación local sigue disponible si la red no responde. */ }
  }
  function init() { const s = state(), c = s.config, k = s.knowledge; if (!$('saEnabled')) return; $('saEnabled').checked = c.enabled; $('saFacebook').checked = c.facebook; $('saInstagram').checked = c.instagram; $('saTone').value = c.tone; $('saLength').value = c.length; $('saWhatsapp').value = c.whatsapp; $('saLocation').value = k.location; $('saWebsite').value = k.website; $('saTraining').value = k.training; $('saServices').value = JSON.stringify(k.services, null, 2); $('saFaqs').value = JSON.stringify(k.faqs, null, 2); safeCategories.forEach((x, i) => { const box = $('saAllowed' + i); if (box) box.checked = c.allowed.includes(x); }); render(); loadRemoteEvents(); }
  global.PanelSocialAgent = Object.freeze({ init, render, simulate, saveConfig, saveKnowledge });
})(window);
