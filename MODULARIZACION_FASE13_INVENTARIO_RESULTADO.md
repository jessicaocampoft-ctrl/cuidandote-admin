# Inventario — Fase 13 Metas y Presupuesto

- Funciones totales detectadas: **309**.
- Candidatas detectadas: **1**.

## Candidatas

### exportarHistorialPaciente

- Línea aproximada: 9868
- Llamadas internas: `_comisManualReact`, `_comisSetManualReact`, `autoFillPrice`, `citasReales`, `esCancelExcluida`, `exportarHistorialPaciente`, `fmtDate`, `fmtPeso`, `getCancelMotivos`, `initDashboard`, `isMidnightTime`, `isPagada`, `kvGet`, `kvRemove`, `kvSet`, `normDate`, `pad`, `parsePrecio`, `reload`, `renderAgenda`, `renderCitasResumen`, `renderConveniosReport`, `renderPacientes`, `row`, `setModoIngresos`, `toDateStr`, `toast`, `today`, `toggleNcAddress`
- Claves de almacenamiento: `adminDarkMode`, `costosEstructura`, `em_steps_`, `encuestaStats`, `gestion_estrategias_mes`, `gestion_observaciones_mes`, `gestion_resultados_mes`, `kpiConfig`, `leads_log`, `metaMensual`, `notasRapidas_`, `pago_`, `rec_email_`, `rec_wa_`, `seg_log`, `seg_readap_zona_`, `seg_reagendo_`, `seg_wa_`
- IDs: `badgeRecordatorios`, `badgeSeguimiento`, `bannerAutoAtendida`, `bannerAutoAtendidaTxt`, `bannerCobros`, `bannerCobrosLista`, `bannerCobrosTxt`, `btnBriefClaude`, `btnCargarEncuesta`, `btnCargarEncuestaGuia`, `btnCopiarReporte`, `btnEditCostos`, `btnLimpiarDup`, `btnLimpiarSinHora`, `btnSendEmails`, `convenioMesFiltro`, `copyFallbackModal`, `copyFallbackText`, `copyFallbackTitle`, `costosEditorPanel`, `costosVistaCompacta`, `darkModeTxt`, `emCrisisBanner`, `emStatusBar`, `epEmail`, `epNombre`, `epOldNombre`, `epSaveBtn`, `epTelefono`, `globalSearchInput`, `ingresosFechaInput`, `kpiEncuestasAutoTag`, `kpiNPSAutoTag`, `leadFeedback`, `leadsHoyCount`, `leadsHoyDash`, `leadsHoyGuia`, `leadsMesCount`, `leadsMesGuia`, `leadsSemDash`, `leadsSemGuia`, `leadsSemanaCount`, `leadssMesDash`, `metaBarFill`, `metaBarFinFill`, `metaBarFinPct`, `metaBarFinWrap`, `metaInput`, `metaInputFin`, `metaPct`, `metaTexto`, `metricCancelacion`, `metricComparativo`, `metricDiaSemana`, `metricHorarios`, `metricHorasRentables`, `metricIngresoPorServicio`, `metricModalidad`, `metricPacientes`, `metricPacientesFrecuentes`, `metricPagos`, `metricProyeccion`, `metricServicioTop`, `modalReporteMes`, `ncAddress`, `ncDate`, `ncEmail`, `ncMod`, `ncName`, `ncPhone`, `ncService`, `ncServiceMain`, `ncServicePlan`, `ncTime`, `notasRapidas`, `notasSaved`, `pm_kpi_ventas_mes`, `pm_sess_calc`, `pm_ticket_avg`, `presupuestoBody`, `recContent`, `reporteMesBody`, `reporteMesTitulo`, `segCountReadap`, `segLista`, `segLog`, `voiceBtn`, `voiceHelp`, `voicePanel`, `voiceStatus`, `voiceText`, `voiceTranscript`, `waCopyGestionModal`, `waCopyGestionPhone`, `waCopyGestionText`

```javascript
function exportarHistorialPaciente(nombre) {
  const citas = allData.citas.filter(c => c.nombre === nombre)
    .sort((a,b) => (b.fecha+b.hora).localeCompare(a.fecha+a.hora));
  if (!citas.length) { toast('Sin citas para exportar', 'err'); return; }
  const header = ['Fecha','Hora','Servicio','Modalidad','Valor','Estado','Notas'];
  const rows = citas.map(c => [normDate(c.fecha),c.hora,c.servicio,c.modalidad,c.precio||'',c.estado,c.notas||'']);
  const csv = [header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'historial_'+nombre.replace(/\s+/g,'_')+'_'+today()+'.csv';
  a.click(); URL.revokeObjectURL(a.href);
  toast('Historial exportado: '+citas.length+' cita(s)');
}

// ── EDITAR / BORRAR PACIENTE ──
function editarPacienteIdx(idx) {
  const p = _pacs[idx];
  if (!p) return;
  document.getElementById('epOldNombre').value = JSON.stringify(p.nombres); // guarda TODOS los nombres
  document.getElementById('epNombre').value    = p.nombre;
  document.getElementById('epTelefono').value  = p.telefono || '';
  document.getElementById('epEmail').value     = p.email    || '';
  openModal('modalEditarPaciente');
}
function editarPaciente(nombre, telefono, email) { // compatibilidad legacy
  document.getElementById('epOldNombre').value = JSON.stringify([nombre]);
  document.getElementById('epNombre').value    = nombre;
  document.getElementById('epTelefono').value  = telefono;
  document.getElementById('epEmail').value     = email;
  openModal('modalEditarPaciente');
}

async function guardarPaciente() {
  const oldNombresRaw = document.getElementById('epOldNombre').value;
  const newNombre     = document.getElementById('epNombre').value.trim();
  const telefono      = document.getElementById('epTelefono').value.trim();
  const email         = document.getElementById('epEmail').value.trim();
  if (!newNombre) { toast('El nombre no puede estar vacío', 'err'); return; }
  const btn = document.getElementById('epSaveBtn');
  btn.textContent = 'Guardando...'; btn.disabled = true;
  try {
    let oldNombres = [];
    try { oldNombres = JSON.parse(oldNombresRaw); } catch(e) { oldNombres = [oldNombresRaw]; }
    let totalActualizado = 0;
    for (const oldNombre of oldNombres) {
      const data = encodeURIComponent(JSON.stringify({oldNombre, newNombre, telefono, email}));
      const r = await fetch(`${APPS_SCRIPT_URL}?action=editPatient&token=${encodeURIComponent(TOKEN)}&data=${data}`);
      const d = await r.json();
      if (d.ok) totalActualizado += d.updated || 0;
    }
    // Actualizar en memoria
    allData.citas.forEach(c => {
      if (oldNombres.includes(c.nombre)) { c.nombre = newNombre; c.telefono = telefono.replace(/\D/g,''); c.email = email; }
    });
    toast(`Paciente actualizado en ${totalActualizado} cita(s)`);
    closeModal('modalEditarPaciente');
    renderPacientes();
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Guardar cambios'; btn.disabled = false;
}

async function borrarPaciente(idx) {
  const p = _pacs[idx];
  if (!p) return;
  if (!confirm(`¿Eliminar a ${p.nombre} y sus ${p.sesiones} cita(s)?\n\nEsta acción no se puede deshacer.`)) return;
  try {
    // Borrar todos los nombres que usó este paciente
    for (const nombre of p.nombres) {
      await fetch(`${APPS_SCRIPT_URL}?action=deletePatient&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}`);
    }
    allData.citas = allData.citas.filter(c => !p.nombres.includes(c.nombre));
    toast(`${p.nombre} eliminado/a correctamente`);
    renderPacientes();
    initDashboard();
  } catch(e) { toast('Error de conexión', 'err'); }
}

// ── BASE DE DATOS ──
// Estado _dbPacs encapsulado en js/modules/database.js.

function initFormDB(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.initFormDB !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: initFormDB');
  }
  return module.initFormDB(...args);
}

function renderBasedatos(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.renderBasedatos !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: renderBasedatos');
  }
  return module.renderBasedatos(...args);
}

function renderReactivacion(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.renderReactivacion !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: renderReactivacion');
  }
  return module.renderReactivacion(...args);
}

function _updateReacBtn(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module._updateReacBtn !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: _updateReacBtn');
  }
  return module._updateReacBtn(...args);
}

function dbEditarPac(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.dbEditarPac !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: dbEditarPac');
  }
  return module.dbEditarPac(...args);
}

async function guardarPacienteDB(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.guardarPacienteDB !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: guardarPacienteDB');
  }
  return await module.guardarPacienteDB(...args);
}

async function dbBorrarPac(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.dbBorrarPac !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: dbBorrarPac');
  }
  return await module.dbBorrarPac(...args);
}

async function agregarPacienteDB(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.agregarPacienteDB !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: agregarPacienteDB');
  }
  return await module.agregarPacienteDB(...args);
}

function limpiarFormDB(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.limpiarFormDB !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: limpiarFormDB');
  }
  return module.limpiarFormDB(...args);
}

// ── CALENDARIO ──
let calWeekStart = getMonday(new Date());

function getMonday(d) {
  const dt = new Date(d);
  const day = dt.getDay();
  dt.setDate(dt.getDate() - (day === 0 ? 6 : day - 1));
  dt.setHours(0,0,0,0);
  return dt;
}

function calPrev(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calPrev !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calPrev');
  }
  return module.calPrev(...args);
}
function calNext(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calNext !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calNext');
  }
  return module.calNext(...args);
}
function calToday(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.calToday !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: calToday');
  }
  return module.calToday(...args);
}

let _calGCevents = []; // cache de eventos de Google Calendar

async function renderCalendar(...args) {
  const module = window.PanelAgenda;
  if (!module || typeof module.renderCalendar !== 'function') {
    throw new Error('El módulo de Agenda no está disponible: renderCalendar');
  }
  return await module.renderCalendar(...args);
}

function openNuevaCitaFromCal(...args) {
  const module = window.PanelAppointmentCreate;
  if (!module || typeof module.openNuevaCitaFromCal !== 'function') {
    throw new Error('El módulo de creación de citas no está disponible: openNuevaCitaFromCal');
  }
  return module.openNuevaCitaFromCal(...args);
}

// ══════════════════════════════════════════════════════════════
// ── VOZ ──
// ══════════════════════════════════════════════════════════════
let _voiceActive  = false;
let _voiceRec     = null;
let _voiceGotResult = false;

function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

function _voiceBtn()      { return document.getElementById('voiceBtn'); }
function _voiceStatusEl() { return document.getElementById('voiceStatus'); }

const VOICE_ICON = '🎙️ Dictar cita por voz';
const VOICE_STOP = '⏹ Detener escucha';

// ── Panel de voz (dictado por teclado iOS) ──
function toggleVoicePanel() {
  const panel = document.getElementById('voicePanel');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    document.getElementById('voiceText').value = '';
    setTimeout(() => document.getElementById('voiceText').focus(), 100);
  }
}

function procesarVozTexto() {
  const txt = (document.getElementById('voiceText').value || '').trim();
  if (!txt) { toast('Escribe o dicta algo primero', 'err'); return; }
  _parseVoice(txt);
  document.getElementById('voicePanel').style.display = 'none';
  document.getElementById('voiceText').value = '';
}

function toggleVoice() {
  const SR = _getSR();
  if (!SR) {
    alert('Tu iPhone necesita iOS 14.5 o superior y Safari para usar dictado.\n\nSi ya tienes iOS 14.5+, asegúrate de estar en Safari (no Chrome ni otro navegador).');
    return;
  }
  if (_voiceActive) { _stopVoice(false); return; }
  _startVoice(SR);
}

function _startVoice(SR) {
  try {
    _voiceRec = new SR();
  } catch(e) {
    alert('No se pudo iniciar el micrófono: ' + e.message);
    return;
  }

  // Configuración optimizada para iOS Safari
  _voiceRec.lang            = 'es-ES'; // 'es-CO' no está soportado en todos los iOS
  _voiceRec.continuous      = false;   // iOS no soporta continuous=true de forma confiable
  _voiceRec.interimResults  = false;
  _voiceRec.maxAlternatives = 1;

  _voiceActive    = true;
  _voiceGotResult = false;

  const btn = _voiceBtn();
  btn.classList.add('listening');
  btn.textContent = VOICE_STOP;
  _voiceStatusEl().style.display = 'flex';
  document.getElementById('voiceTranscript').textContent = '';
  document.getElementById('voiceHelp').style.display = 'none';

  _voiceRec.onresult = e => {
    _voiceGotResult = true;
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join(' ');
    document.getElementById('voiceTranscript').textContent = '"' + transcript + '"';
    _parseVoice(transcript);
  };

  _voiceRec.onerror = e => {
    if (e.error === 'not-allowed') {
      alert('Permiso de micrófono denegado.\n\nVe a Ajustes > Safari > Micrófono y actívalo para este sitio.');
    } else if (e.error === 'no-speech') {
      toast('No escuché nada. Toca el botón y habla claramente.', 'err');
    } else {
      toast('Error: ' + e.error, 'err');
    }
    _stopVoice(false);
  };

  _voiceRec.onend = () => {
    if (!_voiceGotResult) {
      // iOS para automáticamente — re-iniciar si no hubo resultado
      // (solo si el usuario no presionó "Detener")
      if (_voiceActive) {
        toast('Escuchando... habla ahora', 'ok');
        try { _voiceRec.start(); return; } catch(e) {}
      }
    }
    _stopVoice(false);
  };

  try {
    _voiceRec.start();
    toast('🎙 Escuchando... habla la cita', 'ok');
  } catch(e) {
    alert('No se pudo activar el micrófono: ' + e.message + '\n\nAsegúrate de permitir el acceso al micrófono cuando Safari lo solicite.');
    _stopVoice(false);
  }
}

function _stopVoice(showMsg = true) {
  _voiceActive = false;
  if (_voiceRec) {
    _voiceRec.onend = null; // evitar loop
    try { _voiceRec.stop(); } catch(e) {}
    _voiceRec = null;
  }
  const btn = _voiceBtn();
  if (btn) {
    btn.classList.remove('listening');
    btn.textContent = VOICE_ICON;
  }
  setTimeout(() => {
    const s = _voiceStatusEl();
    if (s) s.style.display = 'none';
  }, 3000);
}

function _norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function _parseVoice(text) {
  const t = _norm(text);
  let filled = [];

  // ── FECHA ──
  let fecha = '';
  if      (/\bhoy\b/.test(t))    fecha = today();
  else if (/\bmanana\b/.test(t)) { const d=new Date(); d.setDate(d.getDate()+1); fecha=toDateStr(d); }
  else {
    const DIAS = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
    for (let i=0;i<DIAS.length;i++) {
      if (t.includes(DIAS[i])) {
        const d=new Date();
        const diff=(i-d.getDay()+7)%7||7;
        d.setDate(d.getDate()+diff);
        fecha=toDateStr(d);
        break;
      }
    }
    const dm = t.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/);
    if (dm) {
      const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
      fecha = new Date().getFullYear()+'-'+pad(MESES.indexOf(dm[2])+1)+'-'+pad(parseInt(dm[1]));
    }
  }
  if (fecha) { document.getElementById('ncDate').value = fecha; filled.push('fecha'); }

  // ── HORA ──
  const tm = t.match(/(?:a\s+las?\s+)?(\d{1,2})(?:[:\s](\d{2}))?\s*(am|pm)/);
  const tm2 = !tm && t.match(/a\s+las?\s+(\d{1,2})(?:[:\s](\d{2}))?/);
  const match = tm || tm2;
  if (match) {
    let h = parseInt(match[1]);
    const min = match[2] ? parseInt(match[2]) : 0;
    const ampm = match[3];
    if      (ampm==='pm' && h<12) h+=12;
    else if (ampm==='am' && h===12) h=0;
    else if (!ampm && h>=1 && h<=6) h+=12; // 1-6 sin indicador → PM
    document.getElementById('ncTime').value = pad(h)+':'+pad(min);
    filled.push('hora');
  }

  // ── SERVICIO ──
  const SMAP = [
    [/descarga.*(cuello|espalda)|cuello.*espalda/, 'Descarga Muscular — Cuello y Espalda', false],
    [/descarga.*pierna|pierna.*descarga/,           'Descarga Muscular — Piernas',          false],
    [/descarga.*complet|completa/,                  'Descarga Muscular Completa',            false],
    [/valoracion/,                                  'Valoración Funcional',                 false],
    [/readaptacion/,                                'Readaptación Funcional',               false],
    [/espalda\s+sin\s+dolor/,                       'Plan Espalda Sin Dolor',               true ],
    [/alivio\s+profundo/,                           'Plan Alivio Profundo',                 true ],
    [/alivio.*casa|plan.*casa/,                     'Plan Alivio en Casa',                  true ],
    [/duo\s*mensual|plan\s*duo/,                    'Plan Dúo Mensual',                     true ],
    [/\bplan\s+recarga\b|\brecarga\b/,              'Plan Recarga',                         true ],
    [/\bplan\s+avanza\b|\bavanza\b/,                'Plan Avanza',                          true ],
    [/\belite\b/,                                   'Plan Elite',                           true ],
    [/\bplan\s+inicio\b|\binicio\b/,                'Plan Inicio',                          true ],
    [/\bplan\s+avance\b|\bavance\b/,                'Plan Avance',                          true ],
    [/\btransforma\b/,                              'Plan Transforma',                      true ],
  ];
  for (const [re, serv, isPlan] of SMAP) {
    if (re.test(t)) {
      const main = document.getElementById('ncServiceMain');
      const plan = document.getElementById('ncServicePlan');
      if (!isPlan) {
        main.value = serv;
        plan.style.display = 'none';
        document.getElementById('ncService').value = serv;
      } else {
        main.value = '__planes__';
        plan.style.display = 'block';
        plan.value = serv;
        document.getElementById('ncService').value = serv;
      }
      autoFillPrice();
      filled.push('servicio');
      break;
    }
  }

  // ── MODALIDAD ──
  if (/domicilio|a\s+domicilio|en\s+casa/.test(t)) {
    document.getElementById('ncMod').value = 'Domicilio';
    toggleNcAddress();
    filled.push('modalidad');
  } else if (/presencial/.test(t)) {
    document.getElementById('ncMod').value = 'Presencial';
    toggleNcAddress();
    filled.push('modalidad');
  }

  // ── PACIENTE — buscar "para [nombre]" ──
  const STOP_WORDS = new Set([
    'el','la','los','las','un','una','de','del','al','a','en','y','o',
    'que','se','con','por','como','hoy','manana','lunes','martes',
    'miercoles','jueves','viernes','sabado','domingo','para','las','los',
    'esta','este','ese','esa','su','sus','mi','mis','le','les','me','nos',
    'mas','pero','si','no','ya','hay','fue','ser','son','era'
  ]);
  // Palabras que terminan el nombre (señales de fin)
  const NAME_STOPPERS = /\b(el|la|los|las|hoy|manana|lunes|martes|miercoles|jueves|viernes|sabado|domingo|presencial|domicilio|descarga|valoracion|readaptacion|plan|para|a\s+las?)\b/i;

  const nm = text.match(/\bpara\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,4})/i);
  if (nm) {
    // Recortar el nombre en el primer stop-stopper
    let rawFull = nm[1].trim();
    const stopMatch = rawFull.match(NAME_STOPPERS);
    if (stopMatch) rawFull = rawFull.slice(0, stopMatch.index).trim();

    // Filtrar stop words del interior del nombre
    const nameWords = rawFull.split(/\s+/).filter(w => !STOP_WORDS.has(_norm(w)) && w.length > 1);
    const rawName   = nameWords.join(' ');
    if (!rawName) { /* no se capturó nombre válido */ }
    else {
      const normName = _norm(rawName);
      // Buscar en histórico: coincidencia por nombre completo o al menos nombre+apellido
      const known = allData.citas.find(c => {
        const cn = _norm(c.nombre);
        const parts = normName.split(' ');
        // Coincide si el nombre normalizado contiene al menos las primeras dos palabras dictadas
        return cn === normName
          || cn.includes(normName)
          || (parts.length >= 2 && cn.includes(parts[0]) && cn.includes(parts[1]))
          || (parts.length === 1 && cn.startsWith(parts[0]));
      });
      if (known) {
        document.getElementById('ncName').value  = known.nombre;
        document.getElementById('ncPhone').value = known.telefono || '';
        document.getElementById('ncEmail').value = known.email    || '';
        if (known.direccion) document.getElementById('ncAddress').value = known.direccion;
        filled.push('paciente (encontrado)');
      } else {
        document.getElementById('ncName').value = rawName.replace(/\b\w/g, l => l.toUpperCase());
        filled.push('nombre');
      }
    }
  }

  if (filled.length) toast('Voz: ' + filled.join(', ') + ' ✓');
  else { toast('No entendí la cita. Intenta de nuevo.', 'err'); document.getElementById('voiceHelp').style.display='block'; }
}

// ══════════════════════════════════════════════════════════════
// ── RECORDATORIOS ──
// ══════════════════════════════════════════════════════════════

// Mensajes predefinidos con el nombre del paciente
function msgSemana4(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.msgSemana4 !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: msgSemana4');
  }
  return module.msgSemana4(...args);
}
function msgSemana5(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.msgSemana5 !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: msgSemana5');
  }
  return module.msgSemana5(...args);
}
function waRecordatorio(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.waRecordatorio !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: waRecordatorio');
  }
  return module.waRecordatorio(...args);
}

let _remData = null;

async function cargarRecordatorios() {
  const cont = document.getElementById('recContent');
  cont.innerHTML = '<div class="loading-wrap"><div class="spinner"></div> Consultando base de datos...</div>';
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (!d.ok) { cont.innerHTML = '<div class="empty"><p>Error al cargar: ' + (d.error||'') + '</p></div>'; return; }
    _remData = d;
    renderRecordatorios(d);
    // Actualizar badge en sidebar
    const total = d.semana4.length + d.semana5.length;
    const badge = document.getElementById('badgeRecordatorios');
    if (badge) { badge.textContent = total; badge.style.display = total > 0 ? 'inline' : 'none'; }
  } catch(e) {
    cont.innerHTML = '<div class="empty"><p>Error de conexión</p></div>';
  }
}

function renderRecordatorios(d) {
  const cont = document.getElementById('recContent');
  const total = d.semana4.length + d.semana5.length;

  if (total === 0) {
    cont.innerHTML = `<div class="empty" style="padding:60px 20px">
      <p style="font-size:1.1rem">\u2705 Todos los pacientes están al día</p>
      <p style="margin-top:8px;font-size:.85rem">No hay pacientes con más de 4 semanas sin sesión.</p>
    </div>`;
    return;
  }

  const sinEmail4  = d.semana4.filter(p => !p.email || p.email.indexOf('@') < 0).length;
  const sinEmail5  = d.semana5.filter(p => !p.email || p.email.indexOf('@') < 0).length;
  const conEmail   = total - sinEmail4 - sinEmail5;

  cont.innerHTML = `
    <!-- Resumen rápido -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px">
      <div class="stat-card"><div class="stat-label">Total a recordar</div><div class="stat-val">${total}</div><div class="stat-desc">pacientes</div></div>
      <div class="stat-card"><div class="stat-label">Pueden recibir email</div><div class="stat-val" style="color:var(--ok)">${conEmail}</div><div class="stat-desc">tienen email registrado</div></div>
      <div class="stat-card"><div class="stat-label">Solo WhatsApp</div><div class="stat-val" style="color:var(--warn)">${sinEmail4+sinEmail5}</div><div class="stat-desc">no tienen email</div></div>
    </div>

    <!-- Semana 4 -->
    ${d.semana4.length ? `
    <div class="card" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <div class="card-title" style="margin-bottom:2px;color:var(--warn)">⏰ Semana 4 — Momento ideal</div>
          <div style="font-size:.82rem;color:var(--muted)">${d.semana4.length} paciente(s) · entre 28 y 34 días desde su última sesión</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${d.semana4.map(p => recCard(p, 4)).join('')}
      </div>
    </div>` : ''}

    <!-- Semana 5+ -->
    ${d.semana5.length ? `
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <div class="card-title" style="margin-bottom:2px;color:var(--err)">🔴 Semana 5+ — Reagendamiento urgente</div>
          <div style="font-size:.82rem;color:var(--muted)">${d.semana5.length} paciente(s) · más de 35 días sin sesión</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${d.semana5.map(p => recCard(p, 5)).join('')}
      </div>
    </div>` : ''}
  `;
}

function recCard(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.recCard !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: recCard');
  }
  return module.recCard(...args);
}

function recEnviado(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.recEnviado !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: recEnviado');
  }
  return module.recEnviado(...args);
}
function recEmailEnviado(...args) {
  const module = window.PanelDatabase;
  if (!module || typeof module.recEmailEnviado !== 'function') {
    throw new Error('El módulo Base de datos no está disponible: recEmailEnviado');
  }
  return module.recEmailEnviado(...args);
}
function marcarRecordatorioEnviado(nombre, semanas) {
  kvSet('rec_wa_'+semanas+'_'+nombre, '1');
  // Re-render para mostrar checkmark
  if (_remData) renderRecordatorios(_remData);
}

async function enviarEmailsRecordatorio() {
  const btn = document.getElementById('btnSendEmails');
  btn.textContent = 'Enviando...'; btn.disabled = true;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=sendReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      toast(`\u2705 ${d.sent} email(s) enviados · ${d.skipped} sin email (envía WhatsApp manualmente)`);
      // Marcar emails enviados localmente
      if (_remData) {
        [...(_remData.semana4||[]), ...(_remData.semana5||[])].forEach(p => {
          if (p.email && p.email.indexOf('@') >= 0) kvSet('rec_email_'+p.nombre, '1');
        });
        renderRecordatorios(_remData);
      }
    } else toast('Error: ' + (d.error||''), 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
  btn.textContent = 'Enviar emails a todos'; btn.disabled = false;
}

function agendarDesdePacienteRec(...args) {
  const module = window.PanelAppointmentCreate;
  if (!module || typeof module.agendarDesdePacienteRec !== 'function') {
    throw new Error('El módulo de creación de citas no está disponible: agendarDesdePacienteRec');
  }
  return module.agendarDesdePacienteRec(...args);
}

// ══════════════════════════════════════════════════════════════
// ── SEGUIMIENTO DE PACIENTES ──
// ══════════════════════════════════════════════════════════════

// Filtros activos
let _segFiltros = new Set(['sem3','sem4','sem5','reagendo','readap']);

function toggleSegFiltro(f) {
  if (_segFiltros.has(f)) _segFiltros.delete(f);
  else _segFiltros.add(f);
  const idMap = { sem3:'3', sem4:'4', sem5:'5', reagendo:'R', readap:'Readap' };
  const chip = document.getElementById('segChip' + (idMap[f] || f));
  if (chip) chip.classList.toggle('active', _segFiltros.has(f));
  _renderSegLista(window._segData || [], window._segReadapData || []);
}

// Helpers KV sync seguimiento
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

// Log de acciones
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

function agendarDesdeSeg(...args) {
  const module = window.PanelAppointmentCreate;
  if (!module || typeof module.agendarDesdeSeg !== 'function') {
    throw new Error('El módulo de creación de citas no está disponible: agendarDesdeSeg');
  }
  return module.agendarDesdeSeg(...args);
}

async function limpiarCitasSinHora() {
  const sinHora = (allData.citas || []).filter(c => (!c.hora || isMidnightTime(c.hora)) && c.estado !== 'Cancelada');
  if (sinHora.length === 0) { toast('No hay citas a medianoche/sin hora — todo está limpio ✓', 'ok'); return; }
  const detalle = sinHora.map(c => `• ${c.nombre} — ${c.servicio} — ${c.fecha} — hora: ${c.hora || 'sin hora'} — estado: ${c.estado}`).join('\n');
  if (!confirm(`Se encontraron ${sinHora.length} cita(s) guardadas entre 00:00 y 00:59 o sin hora:\n\n${detalle}\n\nEsto elimina esas filas de la base de datos. ¿Continuar?`)) return;
  const btn = document.getElementById('btnLimpiarSinHora');
  btn.textContent = 'Limpiando...'; btn.disabled = true;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=cleanCitasSinHora&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      toast(`✓ ${d.deleted} cita(s) de medianoche/sin hora eliminadas correctamente`, 'ok');
      await reload();
    } else {
      toast('Error: ' + (d.error || ''), 'err');
    }
  } catch(e) { toast('Error de conexión', 'err'); }
  finally { btn.textContent = '🧹 Limpiar medianoche / sin hora'; btn.disabled = false; }
}

async function limpiarHorariosInvalidosAuto() {
  // Ya no se eliminan automáticamente citas fuera de jornada.
  // Administración puede agendar horarios especiales manualmente y deben permanecer visibles.
  return;
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

// ── MODALS ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); }));

// ── DARK MODE ──
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('adminDarkMode', next);
  const txt = document.getElementById('darkModeTxt');
  if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
}
// Sincronizar texto del botón al cargar
window.addEventListener('DOMContentLoaded', () => {
  const txt = document.getElementById('darkModeTxt');
  if (txt && document.documentElement.getAttribute('data-theme') === 'dark') {
    txt.textContent = 'Modo claro';
  }
});

// ── ATAJOS DE TECLADO ──
document.addEventListener('keydown', e => {
  // Esc → cerrar modal abierto
  if (e.key === 'Escape') {
    const m = document.querySelector('.modal-bg.open');
    if (m) { m.classList.remove('open'); return; }
  }
  // No activar atajos cuando el usuario escribe
  const tag = document.activeElement ? document.activeElement.tagName : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  // Ctrl/Cmd + K → búsqueda global
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const s = document.getElementById('globalSearchInput');
    if (s) { s.focus(); s.select(); }
  }
});

// ── ENVIAR EMAIL A UN SOLO PACIENTE (recordatorio) ──
async function enviarEmailUno(encNombre, semanas) {
  const nombre = decodeURIComponent(encNombre);
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=sendReminders&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      kvSet('rec_email_'+nombre, '1');
      toast('Email de recordatorio enviado a ' + nombre.split(' ')[0]);
      if (_remData) renderRecordatorios(_remData);
    } else toast('Error al enviar email', 'err');
  } catch(e) { toast('Error de conexión', 'err'); }
}

// ══════════════════════════════════════════════════════════════
// ── META MENSUAL ──
// ══════════════════════════════════════════════════════════════
function getMeta() {
  // Limpiar metaMensual si tiene valor viejo
  const stored = parseInt(kvGet('metaMensual')||'0', 10);
  if (stored === 8000000 || stored === 8040000) { kvSet('metaMensual', 10265000); }
  return getKPIConfig().meta_ventas_mes || 10265000;
}

function actualizarMetaBarra(cobrado) {
  const meta = getMeta();
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  const txt  = document.getElementById('metaTexto');
  const inp  = document.getElementById('metaInput');
  if (!fill) return;
  if (!meta) {
    if (pct) pct.textContent = '';
    if (txt) txt.textContent = 'Establece tu meta en Finanzas →';
    if (fill) fill.style.width = '0%';
    return;
  }
  const p = Math.min(Math.round(cobrado / meta * 100), 100);
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
  if (txt)  txt.textContent  = '$' + cobrado.toLocaleString('es-CO') + ' de $' + meta.toLocaleString('es-CO') + ' meta';
  if (inp && !inp.value) inp.value = meta.toLocaleString('es-CO');
}

function previewMeta(v) {
  const n = parseInt(v.replace(/\D/g,''), 10);
  if (!n) return;
  const cobrado = calcCobradoMes();
  const p = Math.min(Math.round(cobrado / n * 100), 100);
  const fill = document.getElementById('metaBarFill');
  const pct  = document.getElementById('metaPct');
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
}

function guardarMeta() {
  const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);
  if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
  kvSet('metaMensual', val);
  const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
  reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
  actualizarMetaBarra(calcCobradoMes());
  toast('Meta guardada: $' + val.toLocaleString('es-CO'));
}

function previewMetaFin(v) {
  const n = parseInt(v.replace(/\D/g,''), 10);
  if (!n) return;
  const cobrado = calcCobradoMes();
  const p = Math.min(Math.round(cobrado / n * 100), 100);
  const fill = document.getElementById('metaBarFinFill');
  const pct  = document.getElementById('metaBarFinPct');
  const wrap = document.getElementById('metaBarFinWrap');
  if (wrap) wrap.style.display = 'block';
  if (fill) fill.style.width = p + '%';
  if (pct)  pct.textContent  = p + '%';
}

function guardarMetaFin() {
  const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);
  if (!val || val < 100000) { toast('Ingresa una meta válida (mínimo $100.000)', 'err'); return; }
  kvSet('metaMensual', val);
  const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES = val; META_VENTAS_SEMANA = Math.round(val / 4);
  reloadMetas(); applyKPIRefSpans(); renderPresupuestoMetas();
  renderFinanzas();
  actualizarMetaBarra(calcCobradoMes());
  toast('Meta guardada: $' + val.toLocaleString('es-CO'));
}

function calcIngresoPaquetesMes(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.calcIngresoPaquetesMes !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: calcIngresoPaquetesMes');
  }
  return module.calcIngresoPaquetesMes(...args);
}
function calcCobradoMes(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.calcCobradoMes !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: calcCobradoMes');
  }
  return module.calcCobradoMes(...args);
}

// ══════════════════════════════════════════════════════════════
// ── NOTAS RÁPIDAS ──
// ══════════════════════════════════════════════════════════════
let _notasTimer = null;
function initQuickNotes() {
  const el = document.getElementById('notasRapidas');
  if (!el) return;
  const key = 'notasRapidas_' + today();
  el.value = kvGet(key) || '';
}
function autoGuardarNota() {
  clearTimeout(_notasTimer);
  _notasTimer = setTimeout(() => {
    const el = document.getElementById('notasRapidas');
    if (!el) return;
    kvSet('notasRapidas_' + today(), el.value);
    const saved = document.getElementById('notasSaved');
    if (saved) { saved.classList.add('show'); setTimeout(() => saved.classList.remove('show'), 1800); }
  }, 600);
}

// ══════════════════════════════════════════════════════════════
async function limpiarDuplicadosGAS() {
  const btn = document.getElementById('btnLimpiarDup');
  const dups = detectarDuplicados();
  if (!dups.length) { toast('No se detectaron duplicados en los datos cargados', 'ok'); return; }

  const msg = `Se detectaron ${dups.length} cita(s) duplicada(s):\n\n` +
    dups.map(d => `• ${d.nombre} — ${d.fecha} ${d.hora || '00:00'}`).join('\n') +
    '\n\n¿Cancelarlas en el spreadsheet? Quedarán como Canceladas (no se borran definitivamente).';
  if (!confirm(msg)) return;

  btn.disabled = true;
  btn.textContent = 'Limpiando...';
  let eliminadas = 0, errores = 0;
  for (const dup of dups) {
    try {
      const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(dup.id)}`).then(x => x.json());
      if (r.ok) {
        const cita = allData.citas.find(c => c.id === dup.id);
        if (cita) cita.estado = 'Cancelada';
        eliminadas++;
      } else errores++;
    } catch(e) { errores++; }
  }
  btn.disabled = false;
  btn.textContent = 'Limpiar duplicados';
  toast(`Duplicados corregidos: ${eliminadas}${errores ? ' · Errores: ' + errores : ''}`, eliminadas > 0 ? 'ok' : 'err');
  if (eliminadas > 0) { initDashboard(); renderFinanzas(); }
}

function detectarDuplicados() {
  const grupos = {};
  for (const c of allData.citas) {
    if (c.estado === 'Cancelada' || esRegistroServ(c.servicio)) continue;
    const key = (c.nombre || '').toLowerCase().trim() + '|' + normDate(c.fecha) + '|' + (c.hora || '00:00');
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(c);
  }
  const dups = [];
  for (const key in grupos) {
    const arr = grupos[key];
    if (arr.length > 1) {
      arr.slice(1).forEach(c => dups.push(c));
    }
  }
  return dups;
}

// ── MÓDULO FINANZAS ──
// ══════════════════════════════════════════════════════════════
function renderFinanzas(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.renderFinanzas !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: renderFinanzas');
  }
  return module.renderFinanzas(...args);
}

// ══════════════════════════════════════════════════════════════
// ── EGRESOS ──
// ══════════════════════════════════════════════════════════════




function getEgresos(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.getEgresos !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: getEgresos');
  }
  return module.getEgresos(...args);
}
function saveEgresos(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.saveEgresos !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: saveEgresos');
  }
  return module.saveEgresos(...args);
}

function actualizarConceptosEgreso(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.actualizarConceptosEgreso !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: actualizarConceptosEgreso');
  }
  return module.actualizarConceptosEgreso(...args);
}

function guardarEgreso(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.guardarEgreso !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: guardarEgreso');
  }
  return module.guardarEgreso(...args);
}

function eliminarEgreso(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.eliminarEgreso !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: eliminarEgreso');
  }
  return module.eliminarEgreso(...args);
}

function renderEgresosList(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.renderEgresosList !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: renderEgresosList');
  }
  return module.renderEgresosList(...args);
}

// ══════════════════════════════════════════════════════════════
// ── KPI TABLERO ──
// ══════════════════════════════════════════════════════════════

// Valores por defecto — se sobreescriben con lo guardado en localStorage
const COSTOS_DEFAULTS = {
  // Costos Fijos
  honorarios_fisio:   4000000,
  seguridad_social:    500000,
  asistente_fisio:    1200000,
  auxiliar_admin:      500000,
  // Costos Operativos
  arriendo:            450000,
  servicios_publicos:   50000,
  suscripcion_ia:       80000,
  suscripcion_capcut:   12000,
  asesorias_ap:        480000,
  // Costos Variables
  redes_contenido:     240000,
  activacion_eventos:  300000,
  pautas_redes:        100000,
  mantenimiento:       200000,
  insumos:             100000,
  // Porcentajes adicionales
  pct_imprevistos: 5,
  pct_utilidad:   20,
};

function getCostosEstructura() {
  try {
    const s = kvGet('costosEstructura');
    if (!s) return {...COSTOS_DEFAULTS};
    const stored = JSON.parse(s);
    // Migración: corregir valores desactualizados
    if (stored.asesorias_ap    === 790000) stored.asesorias_ap    = 480000;
    if (stored.redes_contenido === 150000) stored.redes_contenido = 240000;
    // Agregar campos nuevos si faltan
    if (!stored.asistente_fisio)    stored.asistente_fisio    = 1200000;
    if (!stored.arriendo)           stored.arriendo            = 450000;
    if (!stored.servicios_publicos) stored.servicios_publicos  = 50000;
    if (!stored.activacion_eventos) stored.activacion_eventos  = 300000;
    return {...COSTOS_DEFAULTS, ...stored};
  } catch(e) { return {...COSTOS_DEFAULTS}; }
}

function saveCostosEstructura(obj) {
  kvSet('costosEstructura', JSON.stringify(obj));
}

function calcTotalCostos(c) {
  const subtotal = (c.honorarios_fisio   || 0)
    + (c.seguridad_social    || 0)
    + (c.asistente_fisio     || 0)
    + (c.auxiliar_admin      || 0)
    + (c.arriendo            || 0)
    + (c.servicios_publicos  || 0)
    + (c.suscripcion_ia      || 0)
    + (c.suscripcion_capcut  || 0)
    + (c.asesorias_ap        || 0)
    + (c.redes_contenido     || 0)
    + (c.activacion_eventos  || 0)
    + (c.pautas_redes        || 0)
    + (c.mantenimiento       || 0)
    + (c.insumos             || 0);
  const imprevistos = Math.round(subtotal * (c.pct_imprevistos / 100));
  const utilidad    = Math.round(subtotal * (c.pct_utilidad    / 100));
  return { subtotal, imprevistos, utilidad, total: subtotal + imprevistos + utilidad };
}



function getKPIConfig(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.getKPIConfig !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: getKPIConfig');
  }
  return module.getKPIConfig(...args);
}

const _cfg0 = getKPIConfig();
// kpiConfig es siempre la fuente de verdad; costosEstructura solo se usa para calcular en su propia sección
let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;
let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);
let META_VENTAS_MES      = _cfg0.meta_ventas_mes;
let META_NPS             = _cfg0.meta_nps;
let META_ENCUESTAS       = _cfg0.meta_encuestas;
let META_CANCELACION_PCT = _cfg0.meta_cancelacion;
let META_RETENCION_PCT   = _cfg0.meta_retencion;
const META_CAC_MAX         = 80000;
const VENTANA_NUEVO_DIAS   = 180;
const VENTANA_RETENCION    = 60;
const CATEGORIAS_MARKETING = ['Pautas Redes', 'Redes Sociales Contenido'];

function calcBDActualizada(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.calcBDActualizada !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: calcBDActualizada');
  }
  return module.calcBDActualizada(...args);
}

function reloadMetas() {
  const cfg = getKPIConfig();
  META_SESIONES_SEMANA = cfg.meta_sesiones_semana;
  META_VENTAS_MES      = cfg.meta_ventas_mes;
  META_VENTAS_SEMANA   = Math.round(cfg.meta_ventas_mes / 4);
  META_NPS             = cfg.meta_nps;
  META_ENCUESTAS       = cfg.meta_encuestas;
  META_CANCELACION_PCT = cfg.meta_cancelacion;
  META_RETENCION_PCT   = cfg.meta_retencion;
  // Sincronizar precios de servicios siempre
  _syncPreciosToAutoFill(cfg);
}

function getKPIManual(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.getKPIManual !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: getKPIManual');
  }
  return module.getKPIManual(...args);
}
function saveKPIManual(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.saveKPIManual !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: saveKPIManual');
  }
  return module.saveKPIManual(...args);
}

// ═══════════════════════════════════════════════
// LEADS - Sistema de conteo de prospectos
// ═══════════════════════════════════════════════
function getLeads() {
  try {
    const raw = kvGet('leads_log');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLeads(arr) {
  kvSet('leads_log', JSON.stringify(arr));
}

function addLead(canal = 'WhatsApp') {
  const leads = getLeads();
  const ahora = new Date();
  leads.push({
    id: Date.now(),
    fecha: ahora.toLocalDateStr(),  // YYYY-MM-DD
    hora: ahora.toTimeString().slice(0,5),    // HH:MM
    canal: canal,
    timestamp: ahora.getTime()
  });
  saveLeads(leads);
  return leads.length;
}

function deleteLastLead() {
  const leads = getLeads();
  if (leads.length === 0) return false;
  leads.pop();
  saveLeads(leads);
  return true;
}

function getLeadsHoy() {
  const hoy = new Date().toLocalDateStr();
  return getLeads().filter(l => l.fecha === hoy).length;
}

function getLeadsSemana() {
  const hoy = new Date();
  const dia = hoy.getDay();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (dia === 0 ? 6 : dia - 1));
  lunes.setHours(0,0,0,0);
  return getLeads().filter(l => new Date(l.fecha) >= lunes).length;
}

function getLeadsMes(mesParam, anyoParam) {
  const ahora = new Date();
  const y = anyoParam || ahora.getFullYear();
  const m = mesParam  || ahora.getMonth() + 1;
  return getLeads().filter(l => {
    const [ly, lm] = l.fecha.split('-');
    return +ly === y && +lm === m;
  }).length;
}

function changeKPIMonth(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.changeKPIMonth !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: changeKPIMonth');
  }
  return module.changeKPIMonth(...args);
}

function registrarLead(canal) {
  addLead(canal);
  actualizarContadorLeads();
  const fb = document.getElementById('leadFeedback');
  if (fb) {
    fb.textContent = `✅ Lead de ${canal} registrado`;
    setTimeout(() => { fb.textContent = ''; }, 2500);
  }
}

function deshacerUltimoLead() {
  if (!confirm('¿Quitar el último lead registrado?')) return;
  const ok = deleteLastLead();
  actualizarContadorLeads();
  const fb = document.getElementById('leadFeedback');
  if (fb) {
    fb.textContent = ok ? '↩️ Lead deshecho' : '⚠️ No hay leads para deshacer';
    setTimeout(() => { fb.textContent = ''; }, 2500);
  }
}

function resetLeadsHoy() {
  const total = getLeads().length;
  if (total === 0) { toast('No hay leads registrados', 'err'); return; }
  if (!confirm(`¿Borrar todos los ${total} leads registrados? Esto no se puede deshacer.`)) return;
  saveLeads([]);
  actualizarContadorLeads();
  toast('Todos los leads borrados', 'ok');
}

function actualizarContadorLeads() {
  const hoy = getLeadsHoy(), sem = getLeadsSemana(), mes = getLeadsMes();
  // Widget completo en KPIs
  const elHoy = document.getElementById('leadsHoyCount');
  const elSem = document.getElementById('leadsSemanaCount');
  const elMes = document.getElementById('leadsMesCount');
  if (elHoy) elHoy.textContent = hoy;
  if (elSem) elSem.textContent = sem;
  if (elMes) elMes.textContent = mes;
  // Stat-cards de solo lectura en Dashboard
  const elDashHoy = document.getElementById('leadsHoyDash');
  const elDashSem = document.getElementById('leadsSemDash');
  const elDashMes = document.getElementById('leadssMesDash');
  if (elDashHoy) elDashHoy.textContent = hoy;
  if (elDashSem) elDashSem.textContent = sem;
  if (elDashMes) elDashMes.textContent = mes;
  // Widget en Indicadores de Gestión
  const elGHoy = document.getElementById('leadsHoyGuia');
  const elGSem = document.getElementById('leadsSemGuia');
  const elGMes = document.getElementById('leadsMesGuia');
  if (elGHoy) elGHoy.textContent = hoy;
  if (elGSem) elGSem.textContent = sem;
  if (elGMes) elGMes.textContent = mes;
}

function guardarKPIManual(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.guardarKPIManual !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: guardarKPIManual');
  }
  return module.guardarKPIManual(...args);
}

function renderKPITablero(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.renderKPITablero !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: renderKPITablero');
  }
  return module.renderKPITablero(...args);
}

// ══════════════════════════════════════════════════════════════
// COPIAR Y COMPARTIR INFORMACIÓN DE GESTIÓN
// ══════════════════════════════════════════════════════════════
function _copyGestionMesKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

function _copyGestionPeriodo() {
  const now = new Date();
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

function _copyGestionTop(map, limit = 5) {
  return Object.entries(map || {})
    .sort((a,b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k,v]) => `${k}: ${v}`)
    .join('\n') || 'Sin datos registrados';
}

function _copyGestionData() {
  const now = new Date();
  const monthKey = _copyGestionMesKey(now);
  const citasAll = allData.citas || [];
  const eventosAll = allData.eventos || [];
  const pacientesAll = allData.pacientes || [];
  const pros = (allData.profesionales || allData.fisioterapeutas || allData.team || []);
  const manual = getKPIManual ? getKPIManual() : {};
  const cfg = getKPIConfig ? getKPIConfig() : {};
  const citasMesAll = citasAll.filter(c => normDate(c.fecha || '').startsWith(monthKey) && !esRegistroServ(c.servicio));
  const citasMesActivas = citasMesAll.filter(c => !String(c.estado || '').toLowerCase().includes('cancel'));
  const eventosMes = eventosAll.filter(e => normDate(e.fecha || '').startsWith(monthKey));
  const sesionesAtendidas = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('atendida')).length;
  const cancelaciones = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('cancel')).length;
  const noAsistencias = citasMesAll.filter(c => String(c.estado || '').toLowerCase().includes('no asist')).length;
  const ventasGeneradas = citasMesActivas.reduce((s,c) => s + parsePrecio(c.precio), 0) + eventosMes.reduce((s,e) => s + parsePrecio(e.cobro), 0);
  const ingresosCobrados = (typeof calcCobradoMes === 'function') ? calcCobradoMes() : ventasGeneradas;
  const pagosPendientesLista = citasMesActivas.filter(c => {
    const estado = String(c.estado || '').toLowerCase();
    return estado.includes('pendiente de pago') || estado.includes('pago por verificar') || estado.includes('rechazado');
  });
  const pendienteCobrar = pagosPendientesLista.reduce((s,c) => s + parsePrecio(c.precio), 0);
  const egresosMes = (typeof getEgresos === 'function' ? getEgresos() : [])
    .filter(e => String(e.fecha || '').startsWith(monthKey))
    .reduce((s,e) => s + (Number(e.monto) || parsePrecio(e.monto)), 0);
  const ganancia = ingresosCobrados - egresosMes;
  const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;
  const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;
  const faltante = Math.max(0, metaMensual - ingresosCobrados);

  const pacienteMes = {};
  citasMesActivas.forEach(c => { if (c.nombre) pacienteMes[String(c.nombre).trim().toLowerCase()] = c.nombre; });
  let personasNuevas = 0;
  let personasRecurrentes = 0;
  Object.keys(pacienteMes).forEach(key => {
    const tuvoAntes = citasAll.some(c => String(c.nombre || '').trim().toLowerCase() === key && normDate(c.fecha || '') < monthKey + '-01' && !String(c.estado || '').toLowerCase().includes('cancel'));
    if (tuvoAntes) personasRecurrentes++; else personasNuevas++;
  });

  const servicios = {};
  const horarios = {};
  citasMesActivas.forEach(c => {
    const serv = c.servicio || 'Sin servicio';
    servicios[serv] = (servicios[serv] || 0) + 1;
    const h = String(c.hora || '').slice(0,2) + ':00';
    if (h && h !== ':00') horarios[h] = (horarios[h] || 0) + 1;
  });
  const serviciosArr = Object.entries(servicios).sort((a,b) => b[1] - a[1]);
  const horariosArr = Object.entries(horarios).sort((a,b) => b[1] - a[1]);
  const paquetesVendidos = citasMesActivas.filter(c => String(c.servicio || '').toLowerCase().includes('paquete')).length;
  const ticketPromedio = citasMesActivas.length ? Math.round(ventasGeneradas / citasMesActivas.length) : 0;

  const leadsRecibidos = typeof getLeadsMes === 'function' ? getLeadsMes() : (manual.leads || 0);
  const leadsConvertidos = manual.convertidos || citasMesActivas.length;
  const ocupacion = _copyGestionOcupacion(citasMesActivas.length + eventosMes.length, now);

  const reactivar = _copyGestionReactivar(citasAll, pacientesAll);
  const candidatosPaquete = _copyGestionCandidatosPaquete(citasAll);
  const disponibilidadPros = pros.length
    ? pros.map(p => `${p.nombre || p.Nombre || 'Profesional'}: ${p.disponibilidad || p.Disponibilidad || 'Sin disponibilidad registrada'}`).join('\n')
    : 'Sin fisioterapeutas registrados';

  return {
    periodo: _copyGestionPeriodo(),
    metaMensual, ingresosCobrados, ventasGeneradas, pendienteCobrar, egresosMes, ganancia, cumplimiento, faltante,
    citasProgramadas: citasMesActivas.length,
    sesionesAtendidas,
    personasNuevas,
    personasRecurrentes,
    paquetesVendidos,
    ticketPromedio,
    ocupacion,
    cancelaciones,
    noAsistencias,
    leadsRecibidos,
    leadsConvertidos,
    serviciosMasVendidos: serviciosArr.slice(0,5).map(([s,n]) => `${s}: ${n}`).join('\n') || 'Sin datos',
    serviciosMenosVendidos: serviciosArr.slice(-5).map(([s,n]) => `${s}: ${n}`).join('\n') || 'Sin datos',
    horariosMayorOcupacion: horariosArr.slice(0,5).map(([h,n]) => `${h}: ${n} cita(s)`).join('\n') || 'Sin datos',
    horariosMenorOcupacion: horariosArr.slice(-5).map(([h,n]) => `${h}: ${n} cita(s)`).join('\n') || 'Sin datos',
    disponibilidadPros,
    pagosPendientesLista,
    reactivar,
    candidatosPaquete,
    estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
    resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
    observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
  };
}

function _copyGestionOcupacion(citasProgramadas, date) {
  const y = date.getFullYear(), m = date.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  let capacidad = 0;
  for (let d = 1; d <= days; d++) {
    const dow = new Date(y, m, d).getDay();
    if (dow === 0) continue;
    if (dow === 1) capacidad += 8;
    else if (dow === 6) capacidad += 2;
    else capacidad += 9;
  }
  return capacidad ? Math.round((citasProgramadas / capacidad) * 100) + '%' : 'Sin capacidad calculada';
}

function _copyGestionReactivar(citasAll, pacientesAll) {
  const last = {};
  citasAll.forEach(c => {
    if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
    const key = String(c.nombre).trim().toLowerCase();
    const f = normDate(c.fecha || '');
    if (!last[key] || f > last[key].fecha) last[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', fecha:f, servicio:c.servicio || ''};
  });
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 42);
  const cutoffStr = normDate(cutoff);
  return Object.values(last)
    .filter(p => p.fecha && p.fecha < cutoffStr)
    .sort((a,b) => a.fecha.localeCompare(b.fecha))
    .slice(0,40);
}

function _copyGestionCandidatosPaquete(citasAll) {
  const map = {};
  citasAll.forEach(c => {
    if (!c.nombre || String(c.estado || '').toLowerCase().includes('cancel')) return;
    const key = String(c.nombre).trim().toLowerCase();
    if (!map[key]) map[key] = {nombre:c.nombre, telefono:c.telefono || c.phone || '', total:0, paquete:false, ultimo:normDate(c.fecha || '')};
    map[key].total++;
    if (String(c.servicio || '').toLowerCase().includes('paquete')) map[key].paquete = true;
    const f = normDate(c.fecha || '');
    if (f > map[key].ultimo) map[key].ultimo = f;
  });
  return Object.values(map).filter(p => p.total >= 2 && !p.paquete).sort((a,b) => b.total - a.total).slice(0,40);
}

function _copyGestionDiagnostico(d) {
  const ok = [];
  const att = [];
  if (d.cumplimiento >= 80) ok.push(`Cumplimiento de meta en ${d.cumplimiento}%.`);
  else att.push(`Faltan ${fmtPeso(d.faltante)} para llegar a la meta mensual.`);
  if (d.pendienteCobrar > 0) att.push(`Hay ${fmtPeso(d.pendienteCobrar)} pendiente por cobrar.`);
  if (d.cancelaciones > 0) att.push(`Se registran ${d.cancelaciones} cancelación(es) este mes.`);
  if (d.reactivar.length) att.push(`Hay ${d.reactivar.length} persona(s) para reactivar.`);
  if (d.candidatosPaquete.length) ok.push(`Hay ${d.candidatosPaquete.length} candidato(s) para ofrecer paquetes.`);
  if (!ok.length) ok.push('Hay información suficiente para tomar decisiones de gestión.');
  if (!att.length) att.push('No se detectan alertas administrativas fuertes con los datos actuales.');
  return {ok, att};
}

function _copyGestionAcciones(d) {
  return [
    `Contactar ${d.reactivar.length} persona(s) para reactivación.`,
    `Revisar y cerrar ${d.pagosPendientesLista.length} pago(s) pendiente(s).`,
    `Ofrecer paquetes a ${d.candidatosPaquete.length} candidato(s) con sesiones sueltas.`,
    'Revisar horarios de baja ocupación y mover campañas hacia esas franjas.',
    'Revisar el servicio más vendido y crear una oferta complementaria.'
  ];
}

function _copyGestionTexto(kind) {
  const d = _copyGestionData();
  const diag = _copyGestionDiagnostico(d);
  const acciones = _copyGestionAcciones(d);
  const money = v => fmtPeso(v || 0);
  const baseFin = [
    `Periodo: ${d.periodo}`,
    '',
    'RESUMEN FINANCIERO',
    `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
    `* Ventas generadas: ${money(d.ventasGeneradas)}`,
    `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
    `* Gastos: ${money(d.egresosMes)}`,
    `* Ganancia estimada: ${money(d.ganancia)}`,
    `* Meta mensual: ${money(d.metaMensual)}`,
    `* Cumplimiento: ${d.cumplimiento}%`,
    `* Dinero faltante: ${money(d.faltante)}`
  ];
  let text = '';
  if (kind === 'ejecutivo') {
    text = ['RESUMEN EJECUTIVO — CUIDÁNDOTE FISIOTERAPIA', ...baseFin, '', 'PUNTOS CLAVE', ...diag.ok.map(x => `* ${x}`), ...diag.att.map(x => `* ${x}`), '', 'PRÓXIMAS ACCIONES', ...acciones.map((x,i)=>`${i+1}. ${x}`)].join('\n');
  } else if (kind === 'indicadores') {
    text = ['INDICADORES DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...baseFin.slice(2), '', 'OPERACIÓN', `* Citas programadas: ${d.citasProgramadas}`, `* Sesiones atendidas: ${d.sesionesAtendidas}`, `* Ocupación total: ${d.ocupacion}`, `* Cancelaciones: ${d.cancelaciones}`, `* No asistencias: ${d.noAsistencias}`, '', 'CLIENTES Y VENTAS', `* Personas nuevas: ${d.personasNuevas}`, `* Personas recurrentes: ${d.personasRecurrentes}`, `* Leads recibidos: ${d.leadsRecibidos}`, `* Leads convertidos: ${d.leadsConvertidos}`, `* Paquetes vendidos: ${d.paquetesVendidos}`, `* Ticket promedio: ${money(d.ticketPromedio)}`].join('\n');
  } else if (kind === 'diagnostico') {
    text = ['DIAGNÓSTICO DE GESTIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`)].join('\n');
  } else if (kind === 'estrategias') {
    text = ['ESTRATEGIAS RECOMENDADAS — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Estrategias ejecutadas:', d.estrategiasEjecutadas, '', 'Resultados obtenidos:', d.resultadosObtenidos].join('\n');
  } else if (kind === 'plan') {
    text = ['PLAN DE ACCIÓN — CUIDÁNDOTE FISIOTERAPIA', `Periodo: ${d.periodo}`, '', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', 'Prioridad sugerida:', '1. Cobros pendientes.', '2. Reactivación.', '3. Ofertas de paquetes.', '4. Optimización de horarios.'].join('\n');
  } else if (kind === 'asesor') {
    text = _copyGestionAsesorText(d);
  } else {
    text = ['DIRECCIÓN Y CRECIMIENTO', `Periodo: ${d.periodo}`, '', '1. RESUMEN FINANCIERO', `Ingresos cobrados: ${money(d.ingresosCobrados)}`, `Ventas generadas: ${money(d.ventasGeneradas)}`, `Pendiente por cobrar: ${money(d.pendienteCobrar)}`, `Meta mensual: ${money(d.metaMensual)}`, `Cumplimiento: ${d.cumplimiento}%`, `Dinero faltante: ${money(d.faltante)}`, '', '2. DIAGNÓSTICO', '', 'Lo que está funcionando:', ...diag.ok.map(x => `* ${x}`), '', 'Lo que necesita atención:', ...diag.att.map(x => `* ${x}`), '', '3. ACCIONES PRIORITARIAS', ...acciones.map((x,i)=>`${i+1}. ${x}`), '', '4. SERVICIOS', 'Servicios más vendidos:', d.serviciosMasVendidos, '', 'Servicios menos vendidos:', d.serviciosMenosVendidos, '', '5. CAPACIDAD', 'Horarios con mayor ocupación:', d.horariosMayorOcupacion, '', 'Horarios con menor ocupación:', d.horariosMenorOcupacion].join('\n');
  }
  return _copyPlainText(text);
}

function copyGestionTexto(kind) {
  return _copyGestionTexto(kind);
}

function _copyGestionAsesorText(d) {
  const money = v => fmtPeso(v || 0);
  return [
    'ANÁLISIS MENSUAL DE CUIDÁNDOTE FISIOTERAPIA',
    '',
    `Periodo: ${d.periodo}`,
    `Meta mensual: ${money(d.metaMensual)}`,
    '',
    'RESUMEN FINANCIERO',
    `* Ingresos cobrados: ${money(d.ingresosCobrados)}`,
    `* Ventas generadas: ${money(d.ventasGeneradas)}`,
    `* Pendiente por cobrar: ${money(d.pendienteCobrar)}`,
    `* Gastos: ${money(d.egresosMes)}`,
    `* Ganancia estimada: ${money(d.ganancia)}`,
    `* Cumplimiento de la meta: ${d.cumplimiento}%`,
    '',
    'OPERACIÓN',
    `* Citas programadas: ${d.citasProgramadas}`,
    `* Sesiones atendidas: ${d.sesionesAtendidas}`,
    `* Cancelaciones: ${d.cancelaciones}`,
    `* No asistencias: ${d.noAsistencias}`,
    `* Ocupación total: ${d.ocupacion}`,
    '',
    'CLIENTES Y VENTAS',
    `* Personas nuevas: ${d.personasNuevas}`,
    `* Personas recurrentes: ${d.personasRecurrentes}`,
    `* Leads recibidos: ${d.leadsRecibidos}`,
    `* Leads convertidos: ${d.leadsConvertidos}`,
    `* Paquetes vendidos: ${d.paquetesVendidos}`,
    `* Ticket promedio: ${money(d.ticketPromedio)}`,
    '',
    'CAPACIDAD DEL EQUIPO',
    `* Disponibilidad por profesional:\n${d.disponibilidadPros}`,
    `* Horarios con baja ocupación:\n${d.horariosMenorOcupacion}`,
    '* Citas que podrían delegarse: revisar citas próximas de servicios presenciales o de descarga muscular.',
    '',
    'OPORTUNIDADES',
    `* Leads sin seguimiento: revisar contador y mensajes pendientes.`,
    `* Personas para reactivar: ${d.reactivar.length}`,
    `* Candidatos para paquetes: ${d.candidatosPaquete.length}`,
    '* Paquetes próximos a terminar: revisar módulo de paquetes.',
    `* Pagos pendientes: ${d.pagosPendientesLista.length}`,
    '',
    'SERVICIOS',
    `* Servicios más vendidos:\n${d.serviciosMasVendidos}`,
    `* Servicios menos vendidos:\n${d.serviciosMenosVendidos}`,
    '* Servicios más rentables: revisar estructura de costos.',
    '* Servicios con menor rentabilidad: revisar estructura de costos.',
    '',
    'ACCIONES DEL MES',
    `* Estrategias ejecutadas: ${d.estrategiasEjecutadas}`,
    `* Resultado: ${d.resultadosObtenidos}`,
    '* Ingreso generado: calcular según campañas registradas.',
    '',
    'OBSERVACIONES',
    d.observaciones,
    '',
    'Actúa como asesor estratégico de Cuidándote Fisioterapia. Analiza esta información y entrégame:',
    '',
    '1. Diagnóstico del mes.',
    '2. Principales problemas.',
    '3. Oportunidades de ingresos.',
    '4. Cinco acciones prioritarias.',
    '5. Personas o segmentos que debemos contactar.',
    '6. Estrategias para llegar a la meta.',
    '7. Actividades que debe realizar administración.',
    '8. Actividades que se pueden delegar a los fisioterapeutas.',
    '9. Riesgos.',
    '10. Próximo paso inmediato.',
    '',
    'No inventes datos. Basa todas las recomendaciones únicamente en la información entregada.'
  ].join('\n');
}

async function _copyPlainText(text) {
  const clean = String(text || '').replace(/\n{3,}/g, '\n\n').trim();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(clean);
      _copyOk();
      return true;
    }
  } catch(e) {}
  _showCopyFallback(clean);
  return false;
}

function _copyOk() {
  toast('Información copiada correctamente', 'ok');
  const estados = document.querySelectorAll('.copyGestionStatus');
  estados.forEach(el => { el.style.display = 'inline-flex'; });
  clearTimeout(window._copyGestionStatusTimer);
  window._copyGestionStatusTimer = setTimeout(() => {
    estados.forEach(el => { el.style.display = 'none'; });
  }, 2200);
}

function _showCopyFallback(text, title='Copiar manualmente') {
  let modal = document.getElementById('copyFallbackModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'copyFallbackModal';
    modal.className = 'modal-bg';
    modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
    modal.innerHTML = `<div class="modal-card" style="max-width:760px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
      <div class="modal-title" id="copyFallbackTitle" style="margin-bottom:8px">Copiar manualmente</div>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.</p>
      <textarea id="copyFallbackText" style="width:100%;min-height:320px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-m);font-size:.84rem;line-height:1.55"></textarea>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="document.getElementById('copyFallbackModal').style.display='none'">Cerrar</button>
        <button class="btn btn-teal" onclick="document.getElementById('copyFallbackText').select();document.execCommand('copy');_copyOk()">Copiar selección</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('copyFallbackTitle').textContent = title;
  const ta = document.getElementById('copyFallbackText');
  ta.value = text;
  modal.style.display = 'flex';
  setTimeout(() => { ta.focus(); ta.select(); }, 80);
}

function abrirCopiarListaGestion() {
  const d = _copyGestionData();
  const groups = [
    ['Pagos pendientes', d.pagosPendientesLista.map(c => `${c.nombre} | ${normDate(c.fecha)} | ${c.servicio} | ${fmtPeso(parsePrecio(c.precio))}`)],
    ['Personas para reactivar', d.reactivar.map(p => `${p.nombre} | última cita: ${p.fecha} | ${p.telefono || 'sin teléfono'}`)],
    ['Candidatos para paquetes', d.candidatosPaquete.map(p => `${p.nombre} | ${p.total} sesiones | ${p.telefono || 'sin teléfono'}`)]
  ];
  const text = groups.map(([title, items]) => `${title.toUpperCase()}\n${items.length ? items.map((x,i)=>`${i+1}. ${x}`).join('\n') : 'Sin registros'}`).join('\n\n');
  return _copyPlainText(text);
}

function copiarInfoPersonaGestion() {
  const nombre = prompt('Escribe el nombre de la persona que quieres copiar:');
  if (!nombre) return;
  const key = nombre.trim().toLowerCase();
  const citas = (allData.citas || []).filter(c => String(c.nombre || '').toLowerCase().includes(key) && !esRegistroServ(c.servicio));
  if (!citas.length) { toast('No encontré citas para esa persona', 'warn'); return; }
  citas.sort((a,b) => normDate(b.fecha).localeCompare(normDate(a.fecha)));
  const c0 = citas[0];
  const total = citas.length;
  const pagado = citas.filter(c => String(c.estado || '').toLowerCase().includes('atendida') || String(c.estado || '').toLowerCase().includes('confirm')).length;
  const text = [
    'INFORMACIÓN ADMINISTRATIVA DE PERSONA',
    '',
    `Nombre: ${c0.nombre}`,
    `Teléfono: ${c0.telefono || c0.phone || 'Sin registrar'}`,
    `Correo: ${c0.email || 'Sin registrar'}`,
    `Total de citas registradas: ${total}`,
    `Citas confirmadas/atendidas: ${pagado}`,
    `Última cita: ${normDate(c0.fecha)} ${c0.hora || ''}`,
    `Último servicio: ${c0.servicio || 'Sin servicio'}`,
    `Estado último registro: ${c0.estado || 'Sin estado'}`,
    '',
    'Historial reciente:',
    ...citas.slice(0,8).map((c,i)=>`${i+1}. ${normDate(c.fecha)} ${c.hora || ''} | ${c.servicio || ''} | ${c.estado || ''}`)
  ].join('\n');
  return _copyPlainText(text);
}

function abrirMensajeWAGestion() {
  const d = _copyGestionData();
  const persona = d.reactivar[0] || d.candidatosPaquete[0] || null;
  const nombre = persona ? persona.nombre.split(' ')[0] : 'Hola';
  const phone = persona ? String(persona.telefono || '').replace(/\D/g,'') : '';
  const msg = `Hola ${nombre}, te saludamos de Cuidándote Fisioterapia. Queríamos saber cómo has seguido y ayudarte a retomar tu proceso si lo necesitas. Tenemos horarios disponibles esta semana. ¿Quieres que te compartamos opciones?`;
  _showWhatsAppCopyModal(msg, phone);
}

function _showWhatsAppCopyModal(msg, phone='') {
  let modal = document.getElementById('waCopyGestionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'waCopyGestionModal';
    modal.className = 'modal-bg';
    modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.42);z-index:9999;align-items:center;justify-content:center;padding:18px';
    modal.innerHTML = `<div class="modal-card" style="max-width:660px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.22)">
      <div class="modal-title" style="margin-bottom:8px">Mensaje para WhatsApp</div>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Revísalo, edítalo y luego cópialo o abre WhatsApp. No se envía automáticamente.</p>
      <input id="waCopyGestionPhone" placeholder="Teléfono opcional" style="width:100%;margin-bottom:10px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px 12px">
      <textarea id="waCopyGestionText" style="width:100%;min-height:170px;resize:vertical;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:12px;font-family:var(--font-b);font-size:.9rem;line-height:1.55"></textarea>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="document.getElementById('waCopyGestionModal').style.display='none'">Cerrar</button>
        <button class="btn btn-ghost" onclick="_copyPlainText(document.getElementById('waCopyGestionText').value)">Copiar mensaje</button>
        <button class="btn btn-teal" onclick="_openWAGestionPrepared()">Abrir WhatsApp</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('waCopyGestionPhone').value = phone || '';
  document.getElementById('waCopyGestionText').value = msg;
  modal.style.display = 'flex';
}

function _openWAGestionPrepared() {
  const phone = String(document.getElementById('waCopyGestionPhone').value || '').replace(/\D/g,'');
  const text = document.getElementById('waCopyGestionText').value || '';
  const url = phone ? `https://wa.me/57${phone.replace(/^57/,'')}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ══════════════════════════════════════════════════════════════
// ── REPORTE FIN DE MES ──
// ══════════════════════════════════════════════════════════════
function abrirReporteMes() {
  const modal = document.getElementById('modalReporteMes');
  modal.style.display = 'flex';
  document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
  setTimeout(() => {
    const html = _buildReporteMes();
    document.getElementById('reporteMesBody').innerHTML = html;
  }, 80);
}

function cerrarReporteMes() {
  document.getElementById('modalReporteMes').style.display = 'none';
}

function _toggleEditCostos() {
  const panel   = document.getElementById('costosEditorPanel');
  const compact = document.getElementById('costosVistaCompacta');
  const btn     = document.getElementById('btnEditCostos');
  const open    = panel.style.display === 'none';
  panel.style.display   = open ? 'block' : 'none';
  compact.style.display = open ? 'none'  : 'block';
  btn.textContent       = open ? '✕ Cerrar editor' : '✏️ Editar valores';
}

function _leerCamposCostos() {
  const c = {...COSTOS_DEFAULTS};
  document.querySelectorAll('#costosEditorPanel [data-costo]').forEach(inp => {
    c[inp.dataset.costo] = parseFloat(inp.value) || 0;
  });
  return c;
}

function _recalcCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  const el   = id => document.getElementById(id);
  if (el('crSubtotal'))   el('crSubtotal').textContent   = fmtPeso(calc.subtotal);
  if (el('crImprevistos'))el('crImprevistos').textContent = fmtPeso(calc.imprevistos);
  if (el('crUtilidad'))   el('crUtilidad').textContent   = fmtPeso(calc.utilidad);
  if (el('crTotal'))      el('crTotal').textContent      = fmtPeso(calc.total);
}

function _guardarCostos() {
  const c    = _leerCamposCostos();
  const calc = calcTotalCostos(c);
  saveCostosEstructura(c);

  // Actualizar la meta de ventas en kpiConfig y en las variables globales
  const cfg = getKPIConfig();
  cfg.meta_ventas_mes = calc.total;
  kvSet('kpiConfig', JSON.stringify(cfg));
  META_VENTAS_MES    = calc.total;
  META_VENTAS_SEMANA = Math.round(calc.total / 4);

  toast('Estructura de costos guardada — meta actualizada a ' + fmtPeso(calc.total), 'ok');

  // Refrescar todo el reporte
  document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
  setTimeout(() => {
    document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
  }, 60);
}

function _secTitle(icon, title) {
  return `<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--border)">
    <span style="font-size:1.15rem">${icon}</span>
    <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:600;color:var(--text)">${title}</span>
  </div>`;
}

function _rFila(label, val, color='var(--text)', bold=false) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)">
    <span style="font-size:.84rem;color:var(--muted)">${label}</span>
    <span style="font-size:.88rem;font-weight:${bold?'700':'500'};color:${color};font-family:${bold?'var(--font-h)':'var(--font-b)'}">${val}</span>
  </div>`;
}

function _semCell(val, meta, alto=true) {
  if (!meta || isNaN(val)) return { dot:'⬜', color:'var(--border)', bg:'var(--s2)', txt:'Sin meta' };
  const ok   = alto ? val >= meta : val <= meta;
  const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;
  if (ok)   return { dot:'🟢', color:'var(--ok)',  bg:'rgba(16,185,129,.07)', txt:'En meta' };
  if (warn) return { dot:'🟡', color:'#f59e0b', bg:'rgba(245,158,11,.07)', txt:'Cerca' };
  return       { dot:'🔴', color:'#ef4444', bg:'rgba(239,68,68,.07)', txt:'Bajo meta' };
}

function _kpiRow(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module._kpiRow !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: _kpiRow');
  }
  return module._kpiRow(...args);
}

function _buildReporteMes() {
  const now  = new Date();
  const m    = now.getMonth() + 1;
  const y    = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m - 1];

  const nomMesC = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
  document.getElementById('reporteMesTitulo').textContent = `Reporte de cierre — ${nomMesC} ${y}`;

  const citas  = citasReales();
  const manual = getKPIManual();
  const todasCitas = allData.citas || [];
  const eventosAll = allData.eventos || [];

  // ══════════ CÁLCULOS ══════════

  const mesStr = `${y}-${String(m).padStart(2,'0')}`;
  const metaSesionesMes = META_SESIONES_SEMANA * 4;

  // ── Citas del mes ──
  const citasMes = citas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && c.estado !== 'No asistió';
  });
  const noShowsMes = todasCitas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y && c.estado === 'No asistió';
  });
  const eventosMes = eventosAll.filter(e => {
    const [cy,cm] = normDate(e.fecha).split('-');
    return +cm===m && +cy===y;
  });
  const totalSesiones = citasMes.length + eventosMes.length;

  // ── Financiero ──
  const ventasCobradas = calcCobradoMes();
  const ventasFact = citasMes.reduce((s,c) => s+parsePrecio(c.precio), 0)
                   + eventosMes.reduce((s,e) => s+parsePrecio(e.cobro), 0);
  const ventasPendientes = citasMes.filter(c => !isPagada(c.id))
                            .reduce((s,c) => s+parsePrecio(c.precio), 0);
  const costos = getCostosEstructura();
  const calc   = calcTotalCostos(costos);
  const egresosAll = getEgresos().filter(e => e.fecha && e.fecha.startsWith(mesStr));
  const egresosMes = egresosAll.reduce((s,e) => s+(e.monto||0), 0);
  const gastosBase = egresosMes > 0 ? Math.max(egresosMes, calc.subtotal) : calc.subtotal;
  const utilidadMes = ventasCobradas - gastosBase;
  const margenPct = ventasCobradas > 0 ? Math.round((utilidadMes/ventasCobradas)*100) : 0;

  // Egresos por categoría
  const egresosCats = {};
  egresosAll.forEach(e => {
    const cat = e.concepto || 'Otros';
    egresosCats[cat] = (egresosCats[cat]||0) + (e.monto||0);
  });

  // ── Semanas del mes ──
  const semanas = [[], [], [], [], []];
  citasMes.forEach(c => {
    const d = new Date(normDate(c.fecha)+'T12:00:00');
    const dia = d.getDate();
    const s = Math.min(Math.floor((dia-1)/7), 4);
    semanas[s].push(c);
  });
  eventosMes.forEach(e => {
    const d = new Date(normDate(e.fecha)+'T12:00:00');
    const dia = d.getDate();
    const s = Math.min(Math.floor((dia-1)/7), 4);
    semanas[s].push({ ...e, _esEvento:true, precio: e.cobro });
  });

  // ── Por día de semana ──
  const diasNom = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const porDia = [0,0,0,0,0,0,0];
  citasMes.forEach(c => {
    const d = new Date(normDate(c.fecha)+'T12:00:00');
    porDia[d.getDay()]++;
  });

  // ── Por servicio ──
  const mixMap = {};
  const mixIngresos = {};
  citasMes.forEach(c => {
    const sv = c.servicio||'Sin tipo';
    mixMap[sv] = (mixMap[sv]||0)+1;
    mixIngresos[sv] = (mixIngresos[sv]||0)+parsePrecio(c.precio);
  });
  const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);

  // ── Por modalidad ──
  const modalMap = {};
  citasMes.forEach(c => {
    const mod = c.modalidad||'Sin modalidad';
    modalMap[mod] = (modalMap[mod]||0)+1;
  });

  // ── Cancelaciones ──
  const motivosMes = getCancelMotivos();
  const todasMes = todasCitas.filter(c => {
    const [cy,cm] = normDate(c.fecha).split('-');
    return +cm===m && +cy===y;
  });
  const canceladasMes = todasMes.filter(c =>
    (c.estado||'').toLowerCase().includes('cancel') && !esCancelExcluida(motivosMes[c.id])
  );
  const tasaCancel = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
  const noShowRate = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;

  // Cancelaciones por servicio
  const cancelPorServ = {};
  canceladasMes.forEach(c => {
    const sv = c.servicio||'Sin tipo';
    cancelPorServ[sv] = (cancelPorServ[sv]||0)+1;
  });

  // ── Pacientes ──
  const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
  const pacMesMap = {};
  citasMes.forEach(c => {
    if (!c.nombre) return;
    const k = c.nombre.trim().toLowerCase();
    pacMesMap[k] = (pacMesMap[k]||0)+1;
  });
  const pacUnicosMes = Object.keys(pacMesMap).length;

  let pacNuevos = 0, pacRecurrentes = 0;
  Object.keys(pacMesMap).forEach(pac => {
    const prev = todasCitas.filter(c => {
      if (!c.nombre || c.nombre.trim().toLowerCase()!==pac) return false;
      const f = new Date(normDate(c.fecha)+'T12:00:00');
      return f >= ventanaAtras && f < new Date(y, m-1, 1);
    });
    if (prev.length===0) pacNuevos++; else pacRecurrentes++;
  });

  // Top 5 pacientes por sesiones
  const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // Retención 60 días
  const hace60 = new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
  const conteoPac = {};
  citas.filter(c => new Date(normDate(c.fecha)+'T12:00:00') >= hace60)
    .forEach(c => { if(c.nombre) conteoPac[c.nombre.trim().toLowerCase()]=(conteoPac[c.nombre.trim().toLowerCase()]||0)+1; });
  const pac60 = Object.keys(conteoPac).length;
  const pacRecompra = Object.values(conteoPac).filter(n=>n>=2).length;
  const tasaRet = pac60>0 ? Math.round((pacRecompra/pac60)*100) : 0;

  // ── Leads y conversión ──
  const leadsMes = getLeadsMes() || manual.leads || 0;
  const citasNuevasMes = citasMes.length;
  const tasaConv = leadsMes>0 ? Math.round((citasNuevasMes/leadsMes)*100) : null;

  // Canal de captación
  const canalMap = {};
  const canalIngMap = {};
  citasMes.forEach(c => {
    const canal = c.canal||'Directo';
    canalMap[canal] = (canalMap[canal]||0)+1;
    canalIngMap[canal] = (canalIngMap[canal]||0)+parsePrecio(c.precio);
  });

  // ── NPS y encuestas ──
  const encStats = getEncuestaStats();
  const npsVal  = encStats.nps!==undefined ? encStats.nps : (manual.nps||0);
  const encPct  = encStats.encuestas!==undefined ? encStats.encuestas : (manual.encuestas||0);

  // ── BD ──
  const bdAuto = calcBDActualizada();
  const bdPct  = bdAuto ? bdAuto.pct : (manual.bd||0);

  // ── CAC ──
  const egresosMkt = egresosAll.filter(e =>
    CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))
  ).reduce((s,e)=>s+(e.monto||0), 0);
  const cac = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;

  // ══ Helpers ══
  const pct = (v,m2) => m2>0 ? Math.round(v/m2*100) : 0;
  const SC = ['var(--primary)','#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6'];

  // ── Recomendaciones ──
  const mejoras = [];

  const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
  const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);

  if (totalSesiones < metaSesionesMes) {
    const falta = metaSesionesMes-totalSesiones;
    mejoras.push(`<strong>Aumentar agenda:</strong> Faltan ${falta} sesión${falta===1?'':'es'} para la meta mensual. Considera abrir horarios adicionales o sábados. El día menos ocupado fue ${diasNom[porDia.indexOf(Math.min(...porDia))]} — evalúa si conviene cerrarlo y reforzar los días pico.`);
  }
  if (ventasCobradas < META_VENTAS_MES) {
    mejoras.push(`<strong>Impulsar ingresos:</strong> Faltan ${fmtPeso(META_VENTAS_MES-ventasCobradas)} para la meta. Hay ${fmtPeso(ventasPendientes)} pendientes de cobro — prioriza su recaudo. Ofrece paquetes prepagados para el próximo mes.`);
  }
  if (fullCnt > expressCnt && fullCnt>0) {
    mejoras.push(`<strong>Optimizar mix:</strong> Descargas Full (${fullCnt}) superan a Express (${expressCnt}). La Express genera ~$90.000/h vs ~$73.333/h de la Full. Prioriza Express y Readaptación en comunicación.`);
  }
  if (tasaConv!==null && tasaConv<25) {
    mejoras.push(`<strong>Mejorar conversión de leads:</strong> ${tasaConv}% de ${leadsMes} leads agendaron (meta ≥25%). Responde en menos de 1 hora y envía el link de agendamiento desde el segundo mensaje.`);
  }
  if (tasaCancel>META_CANCELACION_PCT) {
    mejoras.push(`<strong>Reducir cancelaciones (${tasaCancel}% — meta <${META_CANCELACION_PCT}%):</strong> Envía recordatorio 24h antes. El servicio con más cancelaciones fue ${Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'}. Revisa KPI 4B para el desglose por día.`);
  }
  if (noShowsMes.length>0) {
    mejoras.push(`<strong>Reducir no-shows (${noShowsMes.length} este mes):</strong> Llama al paciente 2h antes si no confirma. El costo de un no-show es el 100% del ingreso perdido más el slot bloqueado.`);
  }
  if (tasaRet<META_RETENCION_PCT) {
    mejoras.push(`<strong>Mejorar retención (${tasaRet}% — meta ≥${META_RETENCION_PCT}%):</strong> Hay ${pac60-pacRecompra} pacientes que solo tuvieron 1 sesión en 60 días. Envíales un mensaje personalizado ofreciendo reagendar.`);
  }
  if (npsVal<META_NPS) {
    mejoras.push(`<strong>Mejorar NPS (${npsVal} — meta ≥${META_NPS}):</strong> Revisa comentarios del formulario. Implementa seguimiento por WhatsApp 48h post-sesión y pide retroalimentación directa.`);
  }
  if (encPct<META_ENCUESTAS) {
    mejoras.push(`<strong>Aumentar encuestas (${encPct}% — meta ≥${META_ENCUESTAS}%):</strong> Envía el link al finalizar la sesión en persona. Un mensaje tipo "¿Cómo te fue?" tiene mayor respuesta.`);
  }
  if (bdPct<100) {
    mejoras.push(`<strong>Completar base de datos (${bdPct}%):</strong> ${bdAuto?(bdAuto.total-bdAuto.completos)+' pacientes':'Varios pacientes'} sin tel+email completos. Confírmalos en la primera sesión del mes.`);
  }

  const fci = (key, val) =>
    `<input data-costo="${key}" type="number" value="${val}" min="0" step="1000"
      style="width:100%;background:var(--s1);border:1px solid var(--border);border-radius:6px;
             color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:5px 8px;outline:none;
             text-align:right;box-sizing:border-box"
      oninput="_recalcCostos()">`;

  const filaC = (label, key, val) =>
    `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.04)">
      <span style="font-size:.82rem;color:var(--text);flex:1">${label}</span>
      <div style="width:130px;flex-shrink:0">${fci(key, val)}</div>
    </div>`;

  let html = '';

  // ══════════════════════════════════════════
  // 1 · RESUMEN EJECUTIVO
  // ══════════════════════════════════════════
  const kpisOk   = [
    ventasCobradas >= META_VENTAS_MES,
    totalSesiones  >= metaSesionesMes,
    tasaCancel     <= META_CANCELACION_PCT,
    tasaRet        >= META_RETENCION_PCT,
    npsVal         >= META_NPS,
  ].filter(Boolean).length;
  const totalKpis = 5;
  const calidad = kpisOk >= 5 ? { emoji:'🏆', label:'Excelente', color:'var(--ok)',    bg:'rgba(16,185,129,.08)' }
                : kpisOk >= 3 ? { emoji:'✅', label:'Bueno',     color:'#f59e0b',       bg:'rgba(245,158,11,.08)' }
                : kpisOk >= 2 ? { emoji:'⚠️', label:'Regular',   color:'#ef4444',       bg:'rgba(239,68,68,.08)'  }
                :               { emoji:'🚨', label:'Crítico',   color:'#dc2626',       bg:'rgba(220,38,38,.1)'   };

  html += `<div style="background:${calidad.bg};border:1px solid ${calidad.color}44;border-radius:14px;padding:18px 20px;margin-bottom:24px">
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      <div style="font-size:2.4rem;line-height:1">${calidad.emoji}</div>
      <div style="flex:1">
        <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${calidad.color}">${calidad.label} — ${nomMesC} ${y}</div>
        <div style="font-size:.82rem;color:var(--muted);margin-top:3px">${kpisOk} de ${totalKpis} indicadores principales en meta · Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:240px">
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:var(--primary)">${fmtPeso(ventasCobradas)}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">COBRADO</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${totalSesiones}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">SESIONES</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;color:${utilidadMes>=0?'var(--ok)':'#ef4444'}">${fmtPeso(utilidadMes)}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">UTILIDAD</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--s1);border-radius:8px;border:1px solid var(--border)">
          <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700">${pacUnicosMes}</div>
          <div style="font-size:.68rem;color:var(--muted);font-family:var(--font-m)">PACIENTES</div>
        </div>
      </div>
    </div>
  </div>`;

  // ══════════════════════════════════════════
  // 2 · P&L — ESTADO FINANCIERO
  // ══════════════════════════════════════════
  html += _secTitle('💰','Estado Financiero del Mes');

  const pctMeta = pct(ventasCobradas, META_VENTAS_MES);
  const barW    = Math.min(pctMeta, 100);
  const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';

  html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
    <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos</div>
      ${_rFila('Facturado (total citas + eventos)', fmtPeso(ventasFact))}
      ${_rFila('Cobrado / pagado', fmtPeso(ventasCobradas), 'var(--ok)', true)}
      ${_rFila('Pendiente de cobro', fmtPeso(ventasPendientes), ventasPendientes>0?'#f59e0b':'var(--muted)')}
      ${_rFila('Meta de ventas del mes', fmtPeso(META_VENTAS_MES))}
      <div style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:4px">
          <span>Avance vs meta</span><span style="color:${barCol};font-weight:700">${pctMeta}%</span>
        </div>
        <div style="height:8px;background:var(--s3);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${barW}%;background:${barCol};border-radius:99px;transition:width .3s"></div>
        </div>
      </div>
    </div>
    <div style="background:var(--s2);border-radius:12px;padding:16px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Costos reales vs estructura</div>
      ${_rFila('Subtotal costos estimados', fmtPeso(calc.subtotal))}
      ${_rFila('Imprevistos estimados ('+costos.pct_imprevistos+'%)', fmtPeso(calc.imprevistos))}
      ${_rFila('Utilidad objetivo ('+costos.pct_utilidad+'%)', fmtPeso(calc.utilidad),'var(--ok)')}
      ${_rFila('Total necesario (meta)', fmtPeso(calc.total), 'var(--primary)', true)}
      <div style="height:1px;background:var(--border);margin:8px 0"></div>
      ${_rFila('Costos estructura (subtotal)', fmtPeso(calc.subtotal), '#ef4444')}
      ${egresosMes > 0 ? _rFila('Egresos registrados en Finanzas', fmtPeso(egresosMes), egresosMes > calc.subtotal ? '#ef4444' : '#f59e0b') : `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.04)"><span style="font-size:.84rem;color:var(--muted)">Egresos registrados en Finanzas</span><span style="font-size:.78rem;color:var(--muted);font-style:italic">$0 — usando estructura de costos</span></div>`}
      ${_rFila('Gastos considerados', fmtPeso(gastosBase), '#ef4444', true)}
      ${_rFila('Utilidad real (cobrado − gastos)', fmtPeso(utilidadMes), utilidadMes>=0?'var(--ok)':'#ef4444', true)}
      ${_rFila('Margen de utilidad real', margenPct+'%', margenPct>=costos.pct_utilidad?'var(--ok)':'#f59e0b')}
    </div>
  </div>`;

  // Egresos por concepto
  if (Object.keys(egresosCats).length > 0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Egresos por concepto</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">`;
    Object.entries(egresosCats).sort((a,b)=>b[1]-a[1]).forEach(([cat,monto],i) => {
      const pp = egresosMes>0?Math.round(monto/egresosMes*100):0;
      html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:var(--s1);border-radius:8px;border-left:3px solid ${SC[i%6]}">
        <span style="font-size:.8rem">${cat}</span>
        <span style="font-size:.8rem;font-weight:600;font-family:var(--font-m)">${fmtPeso(monto)} <span style="color:var(--muted);font-weight:400">${pp}%</span></span>
      </div>`;
    });
    html += `</div></div>`;
  }

  // Editor de costos
  html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div>
        <span style="font-size:.78rem;color:var(--muted)">Meta calculada desde estructura de costos:</span>
        <span style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--primary);margin-left:8px" id="costosTotalDisplay">${fmtPeso(calc.total)}</span>
      </div>
      <button onclick="_toggleEditCostos()" id="btnEditCostos"
        style="font-size:.72rem;padding:5px 14px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:6px;cursor:pointer;font-family:var(--font-b)">
        ✏️ Editar estructura de costos
      </button>
    </div>
    <div id="costosVistaCompacta" style="display:none"></div>
    <div id="costosEditorPanel" style="display:none;margin-top:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;font-weight:700">Costos Fijos</div>
          ${filaC('Honorarios Fisio','honorarios_fisio',costos.honorarios_fisio)}
          ${filaC('Seguridad Social','seguridad_social',costos.seguridad_social)}
          ${filaC('Asistente Fisio','asistente_fisio',costos.asistente_fisio)}
          ${filaC('Auxiliar Administrativa','auxiliar_admin',costos.auxiliar_admin)}
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin:12px 0 8px;font-weight:700">Costos Operativos</div>
          ${filaC('Arriendo','arriendo',costos.arriendo)}
          ${filaC('Servicios públicos','servicios_publicos',costos.servicios_publicos)}
          ${filaC('Suscripción IA','suscripcion_ia',costos.suscripcion_ia)}
          ${filaC('Suscripción CapCut','suscripcion_capcut',costos.suscripcion_capcut)}
          ${filaC('Asesorías AP x4/Mes','asesorias_ap',costos.asesorias_ap)}
        </div>
        <div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;font-weight:700">Costos Variables</div>
          ${filaC('Redes Sociales Contenido','redes_contenido',costos.redes_contenido)}
          ${filaC('Activación marca-Eventos','activacion_eventos',costos.activacion_eventos)}
          ${filaC('Pautas Redes','pautas_redes',costos.pautas_redes)}
          ${filaC('Mantenimiento y compras','mantenimiento',costos.mantenimiento)}
          ${filaC('Insumos','insumos',costos.insumos)}
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.05em;margin:12px 0 8px;font-weight:700">Porcentajes</div>
          ${filaC('Fondo Imprevistos (%)','pct_imprevistos',costos.pct_imprevistos)}
          ${filaC('Utilidad Deseada (%)','pct_utilidad',costos.pct_utilidad)}
        </div>
      </div>
      <div style="margin-top:12px;padding:10px 14px;background:var(--s1);border-radius:10px;border:2px solid var(--border);display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Subtotal</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700" id="crSubtotal">${fmtPeso(calc.subtotal)}</div></div>
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Imprevistos</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700;color:#f59e0b" id="crImprevistos">${fmtPeso(calc.imprevistos)}</div></div>
        <div><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">Utilidad obj.</div><div style="font-family:var(--font-h);font-size:.95rem;font-weight:700;color:var(--ok)" id="crUtilidad">${fmtPeso(calc.utilidad)}</div></div>
        <div style="border-left:2px solid var(--border)"><div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">META TOTAL</div><div style="font-family:var(--font-h);font-size:1rem;font-weight:700;color:var(--primary)" id="crTotal">${fmtPeso(calc.total)}</div></div>
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;justify-content:flex-end">
        <button onclick="_toggleEditCostos()" style="font-size:.8rem;padding:7px 16px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;cursor:pointer;font-family:var(--font-b)">Cancelar</button>
        <button onclick="_guardarCostos()" style="font-size:.8rem;padding:7px 20px;background:var(--primary);color:#0D0D0D;border:none;border-radius:8px;cursor:pointer;font-family:var(--font-b);font-weight:600">Guardar y actualizar meta</button>
      </div>
    </div>
  </div>`;

  // ══════════════════════════════════════════
  // 3 · SESIONES Y PRODUCTIVIDAD
  // ══════════════════════════════════════════
  html += _secTitle('📅','Sesiones y Productividad');

  // Semana a semana
  html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:12px">
    <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Desglose semanal</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">`;
  semanas.forEach((sess, i) => {
    if (sess.length===0 && i>3) return;
    const semN = i+1;
    const ingrSem = sess.reduce((s,c)=>s+parsePrecio(c.precio||c.cobro),0);
    const metaSem = META_SESIONES_SEMANA;
    const semCol  = sess.length>=metaSem?'var(--ok)':sess.length>=metaSem*.8?'#f59e0b':'#ef4444';
    html += `<div style="text-align:center;padding:12px 8px;background:var(--s1);border-radius:10px;border-top:3px solid ${semCol}">
      <div style="font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-bottom:4px">SEMANA ${semN}</div>
      <div style="font-family:var(--font-h);font-size:1.5rem;font-weight:700;color:${semCol}">${sess.length}</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">sesiones</div>
      <div style="font-size:.7rem;color:var(--primary);margin-top:4px;font-family:var(--font-m)">${fmtPeso(ingrSem)}</div>
    </div>`;
  });
  html += `</div>
    <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--s1);border-radius:8px">
      <span style="font-size:.82rem;color:var(--muted)">Total mes</span>
      <span style="font-family:var(--font-h);font-size:1rem;font-weight:700">${totalSesiones} sesiones — meta ${metaSesionesMes} ${totalSesiones>=metaSesionesMes?'✓':''}</span>
    </div>
  </div>`;

  // Por día de semana
  const maxDia = Math.max(...porDia.filter((_,i)=>i>0&&i<7));
  html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:12px">
    <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Sesiones por día de semana</div>
    <div style="display:flex;flex-direction:column;gap:6px">`;
  [1,2,3,4,5,6,0].forEach(d => {
    const n = porDia[d];
    const barPct = maxDia>0 ? Math.round(n/maxDia*100) : 0;
    const col = n===maxDia&&n>0?'var(--primary)':n===0?'var(--border)':'var(--s3)';
    html += `<div style="display:flex;align-items:center;gap:8px">
      <span style="font-size:.78rem;color:var(--muted);width:80px;flex-shrink:0">${diasNom[d]}</span>
      <div style="flex:1;height:20px;background:var(--s3);border-radius:4px;overflow:hidden;position:relative">
        <div style="height:100%;width:${barPct}%;background:${n===maxDia&&n>0?'var(--primary)':'rgba(27,191,176,.4)'};border-radius:4px"></div>
      </div>
      <span style="font-size:.78rem;font-family:var(--font-m);font-weight:600;width:24px;text-align:right;color:${n===maxDia&&n>0?'var(--primary)':'var(--text)'}">${n}</span>
    </div>`;
  });
  html += `</div></div>`;

  // Mix por servicio
  if (mixArr.length>0) {
    const totalSesM = mixArr.reduce((s,[,n])=>s+n, 0);
    html += `<div style="background:var(--s2);border-radius:12px;padding:16px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Mix de servicios — sesiones e ingresos</div>
      <div style="display:flex;flex-direction:column;gap:8px">`;
    mixArr.forEach(([serv,cnt],i) => {
      const p   = Math.round(cnt/totalSesM*100);
      const ing = mixIngresos[serv]||0;
      const ingPH = cnt>0 ? Math.round(ing/cnt) : 0;
      html += `<div style="padding:10px 14px;background:var(--s1);border-radius:10px;border-left:3px solid ${SC[i%6]}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px">
          <span style="font-size:.85rem;font-weight:600;color:${SC[i%6]}">${serv}</span>
          <span style="font-size:.82rem;font-family:var(--font-m);font-weight:700">${fmtPeso(ing)}</span>
        </div>
        <div style="display:flex;gap:14px;margin-top:4px;flex-wrap:wrap">
          <span style="font-size:.72rem;color:var(--muted)">${cnt} sesiones · ${p}% del total</span>
          <span style="font-size:.72rem;color:var(--muted)">Promedio por sesión: ${fmtPeso(ingPH)}</span>
        </div>
      </div>`;
    });
    html += `</div>`;
    if (fullCnt>expressCnt&&fullCnt>0) {
      html += `<div style="margin-top:10px;padding:10px 14px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);border-radius:8px;font-size:.8rem;color:#ef4444">
        ⚠️ <strong>Alerta de rentabilidad:</strong> Las Descargas Full (${fullCnt}) superan a las Express (${expressCnt}). La Express genera más ingreso por hora.
      </div>`;
    }
    html += `</div>`;
  }

  // Modalidad
  if (Object.keys(modalMap).length>0) {
    html += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">`;
    Object.entries(modalMap).forEach(([mod,cnt],i) => {
      html += `<span style="padding:5px 12px;background:var(--s2);border-radius:99px;font-size:.8rem;border:1px solid ${SC[i%6]}44;color:${SC[i%6]};font-weight:600">${mod}: ${cnt}</span>`;
    });
    html += `</div>`;
  }

  // ══════════════════════════════════════════
  // 4 · CANCELACIONES Y NO-SHOWS
  // ══════════════════════════════════════════
  html += _secTitle('❌','Cancelaciones y No-Shows');
  const cancelColor = tasaCancel<=META_CANCELACION_PCT?'var(--ok)':tasaCancel<=META_CANCELACION_PCT*1.2?'#f59e0b':'#ef4444';
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${cancelColor}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${cancelColor}">${canceladasMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Cancelaciones</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:${cancelColor}">${tasaCancel}% — meta &lt;${META_CANCELACION_PCT}%</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${noShowsMes.length>0?'#f59e0b':'var(--ok)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${noShowsMes.length>0?'#f59e0b':'var(--ok)'}">${noShowsMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">No-shows</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">${noShowRate}% de las citas</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700">${todasMes.length}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Citas programadas</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">${todasMes.length-canceladasMes.length-noShowsMes.length} efectivas</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#ef4444">${fmtPeso((canceladasMes.length+noShowsMes.length)*Math.round(ventasFact/Math.max(citasMes.length,1)))}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Ingreso no percibido</div>
      <div style="font-size:.7rem;font-family:var(--font-m);margin-top:3px;color:var(--muted)">estimado</div>
    </div>
  </div>`;

  if (Object.keys(cancelPorServ).length>0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px;margin-bottom:8px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Cancelaciones por servicio</div>
      <div style="display:flex;flex-direction:column;gap:5px">`;
    Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1]).forEach(([serv,n],i) => {
      const pp = canceladasMes.length>0?Math.round(n/canceladasMes.length*100):0;
      html += _rFila(serv, `${n} cancelación${n===1?'':'es'} (${pp}%)`,'var(--text)');
    });
    html += `</div></div>`;
  }

  // ══════════════════════════════════════════
  // 5 · ANÁLISIS DE PACIENTES
  // ══════════════════════════════════════════
  html += _secTitle('👥','Análisis de Pacientes');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:var(--primary)">${pacUnicosMes}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes únicos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#10b981">${pacNuevos}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes nuevos</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">sin visita en 6 meses</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:#6366f1">${pacRecurrentes}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes recurrentes</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${tasaRet>=META_RETENCION_PCT?'var(--ok)':tasaRet>=META_RETENCION_PCT*.8?'#f59e0b':'#ef4444'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${tasaRet>=META_RETENCION_PCT?'var(--ok)':tasaRet>=META_RETENCION_PCT*.8?'#f59e0b':'#ef4444'}">${tasaRet}%</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Retención 60 días</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta ≥${META_RETENCION_PCT}%</div>
    </div>
  </div>`;

  if (topPac.length>0) {
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Top pacientes por sesiones este mes</div>
      <div style="display:flex;flex-direction:column;gap:6px">`;
    topPac.forEach(([nombre,n],i) => {
      const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
      const cPac = citasMes.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===nombre);
      const ingPac = cPac.reduce((s,c)=>s+parsePrecio(c.precio),0);
      html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--s1);border-radius:8px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:.9rem">${medals[i]||'·'}</span>
          <span style="font-size:.84rem;font-weight:500;text-transform:capitalize">${nombre}</span>
        </div>
        <div style="text-align:right">
          <span style="font-family:var(--font-m);font-size:.78rem;font-weight:600">${n} sesión${n===1?'':'es'}</span>
          <span style="font-size:.72rem;color:var(--muted);margin-left:8px">${fmtPeso(ingPac)}</span>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  // ══════════════════════════════════════════
  // 6 · MARKETING Y CAPTACIÓN
  // ══════════════════════════════════════════
  html += _secTitle('📣','Marketing y Captación');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:12px">
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:var(--primary)">${leadsMes||'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Leads recibidos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${tasaConv!==null?(tasaConv>=25?'var(--ok)':tasaConv>=20?'#f59e0b':'#ef4444'):'var(--border)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${tasaConv!==null?(tasaConv>=25?'var(--ok)':tasaConv>=20?'#f59e0b':'#ef4444'):'var(--muted)'}">${tasaConv!==null?tasaConv+'%':'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Conversión</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta ≥25%</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700">${pacNuevos}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Pacientes nuevos</div>
    </div>
    <div style="text-align:center;padding:12px;background:var(--s2);border-radius:10px;border-top:3px solid ${cac>0&&cac<=META_CAC_MAX?'var(--ok)':cac>META_CAC_MAX?'#ef4444':'var(--border)'}">
      <div style="font-family:var(--font-h);font-size:1.6rem;font-weight:700;color:${cac>0&&cac<=META_CAC_MAX?'var(--ok)':cac>META_CAC_MAX?'#ef4444':'var(--muted)'}">${cac>0?fmtPeso(cac):'—'}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">CAC</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:2px">meta &lt;${fmtPeso(META_CAC_MAX)}</div>
    </div>
  </div>`;

  if (Object.keys(canalMap).length>0) {
    const totalCanalIng = Object.values(canalIngMap).reduce((s,v)=>s+v,0);
    html += `<div style="background:var(--s2);border-radius:12px;padding:14px 18px">
      <div style="font-size:.7rem;font-family:var(--font-m);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Ingresos y sesiones por canal de captación</div>
      <div style="display:flex;flex-direction:column;gap:7px">`;
    Object.entries(canalIngMap).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing],i) => {
      const sess = canalMap[canal]||0;
      const pp   = totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
      const bW   = pp;
      html += `<div style="padding:10px 14px;background:var(--s1);border-radius:10px;border-left:3px solid ${SC[i%6]}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:.84rem;font-weight:600;color:${SC[i%6]}">${canal}</span>
          <span style="font-family:var(--font-h);font-size:.95rem;font-weight:700">${fmtPeso(ing)}</span>
        </div>
        <div style="height:5px;background:var(--s3);border-radius:99px;overflow:hidden;margin-bottom:5px">
          <div style="height:100%;width:${bW}%;background:${SC[i%6]};border-radius:99px"></div>
        </div>
        <span style="font-size:.7rem;color:var(--muted)">${sess} sesión${sess===1?'':'es'} · ${pp}% del ingreso total</span>
      </div>`;
    });
    html += `</div></div>`;
  } else {
    html += `<div style="padding:12px 16px;background:var(--s2);border-radius:10px;font-size:.82rem;color:var(--muted)">Sin datos de canal registrados en las citas de este mes.</div>`;
  }

  // ══════════════════════════════════════════
  // 7 · CALIDAD Y SATISFACCIÓN
  // ══════════════════════════════════════════
  html += _secTitle('⭐','Calidad y Satisfacción');
  const npsC = _semCell(npsVal, META_NPS);
  const encC = _semCell(encPct, META_ENCUESTAS);
  const bdC  = _semCell(bdPct, 100);
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">`;
  html += _kpiRow('⭐','NPS del mes',`${npsVal}`,npsC.dot,npsC.color,`Meta ≥${META_NPS} · ${encStats.promotores!==undefined?`${encStats.promotores} promotores · ${encStats.pasivos} pasivos · ${encStats.detractores} detractores`:''}`);
  html += _kpiRow('📋','Encuestas respondidas',`${encPct}%`,encC.dot,encC.color,`Meta ≥${META_ENCUESTAS}% de los pacientes`);
  html += _kpiRow('🗄️','BD actualizada',`${bdPct}%`,bdC.dot,bdC.color,bdAuto?`${bdAuto.completos}/${bdAuto.total} pacientes con tel+email`:'Meta 100%');
  html += `</div>`;

  // ══════════════════════════════════════════
  // 8 · SEMÁFORO COMPLETO DE KPIs
  // ══════════════════════════════════════════
  html += _secTitle('🚦','Semáforo Completo de Indicadores');
  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:8px">`;
  const rows = [
    ['📅','Sesiones del mes',`${totalSesiones} / meta ${metaSesionesMes}`,_semCell(totalSesiones,metaSesionesMes),`Semana: meta ${META_SESIONES_SEMANA}/sem`],
    ['💰','Ventas cobradas',fmtPeso(ventasCobradas),_semCell(ventasCobradas,META_VENTAS_MES),`Meta ${fmtPeso(META_VENTAS_MES)} · ${pctMeta}% alcanzado`],
    ['💰','Pendiente de cobro',fmtPeso(ventasPendientes),_semCell(ventasPendientes,0,false),`Gestionar recaudo`],
    ['🎯','Tasa de conversión',tasaConv!==null?`${tasaConv}%`:'— sin datos',tasaConv!==null?_semCell(tasaConv,25):{dot:'⬜',color:'var(--border)'},`${leadsMes} leads → ${citasNuevasMes} citas`],
    ['❌','Tasa de cancelación',`${tasaCancel}%`,_semCell(tasaCancel,META_CANCELACION_PCT,false),`${canceladasMes.length} cancel. de ${todasMes.length} citas`],
    ['🚫','No-shows',`${noShowsMes.length} (${noShowRate}%)`,_semCell(noShowsMes.length,0,false),`Ingreso no percibido est.`],
    ['🔁','Retención 60 días',`${tasaRet}%`,_semCell(tasaRet,META_RETENCION_PCT),`${pacRecompra}/${pac60} con ≥2 sesiones`],
    ['⭐','NPS',`${npsVal}`,_semCell(npsVal,META_NPS),`Meta ≥${META_NPS}`],
    ['📋','Encuestas',`${encPct}%`,_semCell(encPct,META_ENCUESTAS),`Meta ≥${META_ENCUESTAS}%`],
    ['🗄️','BD actualizada',`${bdPct}%`,_semCell(bdPct,100),bdAuto?`${bdAuto.completos}/${bdAuto.total} completos`:''],
    ['💸','CAC',cac>0?fmtPeso(cac):'—',cac>0?_semCell(cac,META_CAC_MAX,false):{dot:'⬜',color:'var(--border)'},`${pacNuevos} nuevos · meta <${fmtPeso(META_CAC_MAX)}`],
    ['📊','Margen utilidad real',`${margenPct}%`,_semCell(margenPct,costos.pct_utilidad),`Objetivo ${costos.pct_utilidad}%`],
  ];
  rows.forEach(([icon,label,val,c,sub]) => {
    html += _kpiRow(icon,label,val,c.dot,c.color,sub);
  });
  html += `</div>`;

  // ══════════════════════════════════════════
  // 9 · PLAN DE MEJORA
  // ══════════════════════════════════════════
  html += _secTitle('💡','Plan de Mejora — Próximo Mes');
  if (mejoras.length>0) {
    html += `<div style="display:flex;flex-direction:column;gap:10px">`;
    mejoras.forEach((m2,i) => {
      html += `<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:var(--s2);border-radius:10px;border-left:3px solid var(--primary)">
        <span style="font-family:var(--font-m);font-size:.72rem;background:var(--primary);color:#0D0D0D;border-radius:99px;min-width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-weight:700">${i+1}</span>
        <div style="font-size:.84rem;line-height:1.55">${m2}</div>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<div style="background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:20px 24px;text-align:center">
      <div style="font-size:1.6rem;margin-bottom:8px">🏆</div>
      <div style="font-family:var(--font-h);font-size:1.15rem;font-weight:600;color:var(--ok)">¡Todos los indicadores en verde!</div>
      <div style="font-size:.84rem;color:var(--muted);margin-top:6px">Mes excelente. Evalúa si es momento de subir las metas para seguir creciendo.</div>
    </div>`;
  }

  return html;
}

function copiarReporteMes() {
  const now  = new Date();
  const m    = now.getMonth() + 1;
  const y    = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m - 1].charAt(0).toUpperCase() + MESES[m - 1].slice(1);

  const el = document.getElementById('reporteMesBody');
  // Construir texto plano desde el HTML
  let txt = `REPORTE DE CIERRE — ${nomMes} ${y}\n${'═'.repeat(40)}\n\n`;
  txt += el.innerText.replace(/\n{3,}/g, '\n\n');

  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('btnCopiarReporte');
    const orig = btn.innerHTML;
    btn.textContent = '✓ Copiado';
    btn.style.color = 'var(--ok)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  }).catch(() => toast('No se pudo copiar', 'err'));
}

function imprimirReporteMes() {
  const body = document.getElementById('reporteMesBody').innerHTML;
  const titulo = document.getElementById('reporteMesTitulo').textContent;
  const w = window.open('', '_blank', 'width=700,height=900');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${titulo}</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Cormorant+Garamond:wght@600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'DM Sans',sans-serif;color:#1A1A2E;background:#fff;padding:40px;font-size:14px}
      h1{font-family:'Cormorant Garamond',serif;font-size:1.6rem;margin-bottom:6px}
      @media print{body{padding:20px}}
    </style>
  </head><body>
    <h1>${titulo}</h1>
    <p style="color:#6B7280;font-size:.85rem;margin-bottom:28px">Reporte automático de indicadores de gestión</p>
    ${body}
    <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
  </body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// ══════════════════════════════════════════════════════════════
// ── BRIEF PARA CLAUDE ──
// ══════════════════════════════════════════════════════════════
function copiarBriefClaude() {
  const now   = new Date();
  const m     = now.getMonth() + 1;
  const y     = now.getFullYear();
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const nomMes = MESES[m-1].charAt(0).toUpperCase() + MESES[m-1].slice(1);
  const mesStr = `${y}-${String(m).padStart(2,'0')}`;
  const sep  = n => '─'.repeat(n);

  const citas      = citasReales();
  const todasCitas = allData.citas || [];
  const eventosAll = allData.eventos || [];
  const manual     = getKPIManual();
  const costos     = getCostosEstructura();
  const calc       = calcTotalCostos(costos);

  // ── Sesiones ──
  const citasMes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado!=='No asistió'; });
  const eventosMes = eventosAll.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m&&+cy===y; });
  const noShowsMes = todasCitas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y&&c.estado==='No asistió'; });
  const todasMes   = todasCitas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m&&+cy===y; });
  const totalSesiones = citasMes.length + eventosMes.length;
  const metaSesionesMes = META_SESIONES_SEMANA * 4;

  // ── Financiero ──
  const ventasCobradas  = calcCobradoMes();
  const ventasFact      = citasMes.reduce((s,c)=>s+parsePrecio(c.precio),0) + eventosMes.reduce((s,e)=>s+parsePrecio(e.cobro),0);
  const ventasPendientes= citasMes.filter(c=>!isPagada(c.id)).reduce((s,c)=>s+parsePrecio(c.precio),0);
  const egresosAll      = getEgresos().filter(e=>e.fecha&&e.fecha.startsWith(mesStr));
  const egresosMes      = egresosAll.reduce((s,e)=>s+(e.monto||0),0);
  const gastosBase      = egresosMes>0 ? Math.max(egresosMes,calc.subtotal) : calc.subtotal;
  const utilidadMes     = ventasCobradas - gastosBase;
  const margenPct       = ventasCobradas>0 ? Math.round((utilidadMes/ventasCobradas)*100) : 0;
  const pctMeta         = calc.total>0 ? Math.round((ventasCobradas/calc.total)*100) : 0;

  // ── Mix servicios ──
  const mixMap = {}, mixIng = {};
  citasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; mixMap[sv]=(mixMap[sv]||0)+1; mixIng[sv]=(mixIng[sv]||0)+parsePrecio(c.precio); });
  const mixArr = Object.entries(mixMap).sort((a,b)=>b[1]-a[1]);
  const fullCnt    = mixArr.reduce((t,[s,n]) => esSesionFull(s)  ? t+n : t, 0);
  const expressCnt = mixArr.reduce((t,[s,n]) => esSesionIndiv(s) ? t+n : t, 0);

  // ── Cancelaciones ──
  const motivosMes    = getCancelMotivos();
  const canceladasMes = todasMes.filter(c=>(c.estado||'').toLowerCase().includes('cancel')&&motivosMes[c.id]!=='Prueba');
  const tasaCancel    = todasMes.length>0 ? Math.round((canceladasMes.length/todasMes.length)*100) : 0;
  const noShowRate    = todasMes.length>0 ? Math.round((noShowsMes.length/todasMes.length)*100) : 0;

  // ── Pacientes ──
  const ventanaAtras = new Date(now); ventanaAtras.setDate(now.getDate()-VENTANA_NUEVO_DIAS);
  const pacMesMap = {};
  citasMes.forEach(c=>{ if(c.nombre) pacMesMap[c.nombre.trim().toLowerCase()]=(pacMesMap[c.nombre.trim().toLowerCase()]||0)+1; });
  const pacUnicosMes = Object.keys(pacMesMap).length;
  let pacNuevos=0, pacRecurrentes=0;
  Object.keys(pacMesMap).forEach(pac=>{
    const prev=todasCitas.filter(c=>c.nombre&&c.nombre.trim().toLowerCase()===pac&&new Date(normDate(c.fecha)+'T12:00:00')>=ventanaAtras&&new Date(normDate(c.fecha)+'T12:00:00')<new Date(y,m-1,1));
    if(prev.length===0) pacNuevos++; else pacRecurrentes++;
  });
  const hace60=new Date(now); hace60.setDate(now.getDate()-VENTANA_RETENCION);
  const cont60={};
  citas.filter(c=>new Date(normDate(c.fecha)+'T12:00:00')>=hace60).forEach(c=>{ if(c.nombre) cont60[c.nombre.trim().toLowerCase()]=(cont60[c.nombre.trim().toLowerCase()]||0)+1; });
  const pac60=Object.keys(cont60).length, pacRecompra=Object.values(cont60).filter(n=>n>=2).length;
  const tasaRet=pac60>0?Math.round((pacRecompra/pac60)*100):0;

  // ── Leads y marketing ──
  const leadsMes   = getLeadsMes() || manual.leads || 0;
  const tasaConv   = leadsMes>0 ? Math.round((citasMes.length/leadsMes)*100) : null;
  const egresosMkt = egresosAll.filter(e=>CATEGORIAS_MARKETING.some(cat=>(e.concepto||'').toLowerCase().includes(cat.toLowerCase()))).reduce((s,e)=>s+(e.monto||0),0);
  const cac        = pacNuevos>0 ? Math.round(egresosMkt/pacNuevos) : 0;
  const canalMap={}, canalIng={};
  citasMes.forEach(c=>{ const canal=c.canal||'Directo'; canalMap[canal]=(canalMap[canal]||0)+1; canalIng[canal]=(canalIng[canal]||0)+parsePrecio(c.precio); });

  // ── Calidad ──
  const encStats=getEncuestaStats();
  const npsVal  = encStats.nps!==undefined?encStats.nps:(manual.nps||0);
  const encPct  = encStats.encuestas!==undefined?encStats.encuestas:(manual.encuestas||0);
  const bdAuto  = calcBDActualizada();
  const bdPct   = bdAuto?bdAuto.pct:(manual.bd||0);

  // ── Semanas ──
  const semanas=[0,0,0,0,0];
  citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });
  eventosMes.forEach(e=>{ const d=new Date(normDate(e.fecha)+'T12:00:00'); const s=Math.min(Math.floor((d.getDate()-1)/7),4); semanas[s]++; });

  // ── Días pico ──
  const diasNom=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const porDia=[0,0,0,0,0,0,0];
  citasMes.forEach(c=>{ const d=new Date(normDate(c.fecha)+'T12:00:00'); porDia[d.getDay()]++; });
  const diaPico = diasNom[porDia.indexOf(Math.max(...porDia))];
  const diaBajo = diasNom[[1,2,3,4,5,6,0].reduce((best,d)=>porDia[d]<porDia[best]?d:best, 1)];

  // ════════════ CONSTRUIR TEXTO ════════════
  let t = '';
  const line = (l='') => t += l + '\n';
  const h1   = txt => { line(); line(`${'═'.repeat(60)}`); line(`  ${txt}`); line(`${'═'.repeat(60)}`); };
  const h2   = txt => { line(); line('── ' + txt.toUpperCase() + ' ' + sep(Math.max(0,50-txt.length-4))); };
  const row  = (label, val) => line(`  ${label.padEnd(38,'.')} ${val}`);

  line(`BRIEF DE NEGOCIO — ${nomMes} ${y}`);
  line(`Generado el ${now.toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})} desde el admin de Cuidándote Fisioterapia`);
  line(sep(60));
  line();
  line(`CONTEXTO DEL NEGOCIO`);
  line(`Clínica de fisioterapia especializada en Descarga Muscular (Full y Express),`);
  line(`Readaptación Deportiva y servicios corporativos. Modalidades: presencial y domicilio.`);
  line(`Objetivo: ${fmtPeso(calc.total)}/mes para cubrir costos, imprevistos y 20% de utilidad.`);

  h1(`1. RESULTADOS FINANCIEROS`);
  row('Ingresos facturados', fmtPeso(ventasFact));
  row('Ingresos cobrados', fmtPeso(ventasCobradas));
  row('Pendiente de cobro', fmtPeso(ventasPendientes));
  row('Meta de ventas del mes', fmtPeso(calc.total));
  row('Cumplimiento de meta', pctMeta + '%');
  line();
  row('Costos fijos + operativos (estructura)', fmtPeso(calc.subtotal));
  row('Egresos registrados en sistema', fmtPeso(egresosMes));
  row('Base de gastos usada para cálculo', fmtPeso(gastosBase));
  row('Utilidad neta real', fmtPeso(utilidadMes));
  row('Margen de utilidad real', margenPct + '%');
  row('Margen objetivo', costos.pct_utilidad + '%');
  line();
  line(`  ESTRUCTURA DE COSTOS MENSUAL:`);
  row('  Honorarios Fisio', fmtPeso(costos.honorarios_fisio));
  row('  Seguridad Social', fmtPeso(costos.seguridad_social));
  row('  Auxiliar Administrativa', fmtPeso(costos.auxiliar_admin));
  row('  Suscripción IA', fmtPeso(costos.suscripcion_ia));
  row('  Suscripción CapCut', fmtPeso(costos.suscripcion_capcut));
  row('  Asesorías AP / Mes', fmtPeso(costos.asesorias_ap));
  row('  Redes Sociales Contenido', fmtPeso(costos.redes_contenido));
  row('  Pautas Redes', fmtPeso(costos.pautas_redes));
  row('  Mantenimiento y compras', fmtPeso(costos.mantenimiento));
  row('  Insumos', fmtPeso(costos.insumos));
  row('  Subtotal', fmtPeso(calc.subtotal));
  row('  + Fondo imprevistos ' + costos.pct_imprevistos + '%', fmtPeso(calc.imprevistos));
  row('  + Utilidad deseada ' + costos.pct_utilidad + '%', fmtPeso(calc.utilidad));
  row('  TOTAL NECESARIO', fmtPeso(calc.total));

  h1(`2. SESIONES Y PRODUCTIVIDAD`);
  row('Total sesiones atendidas', totalSesiones + ' / meta ' + metaSesionesMes);
  row('Cumplimiento meta sesiones', Math.round(totalSesiones/metaSesionesMes*100) + '%');
  row('Citas individuales', citasMes.length + '');
  row('Eventos / corporativos', eventosMes.length + '');
  line();
  line('  Por semana:');
  semanas.forEach((n,i) => { if(n>0||i<4) row(`    Semana ${i+1}`, n + ' sesiones'); });
  line();
  line('  Mix de servicios:');
  const totalSesM = mixArr.reduce((s,[,n])=>s+n,0);
  mixArr.forEach(([serv,cnt]) => {
    const p = Math.round(cnt/totalSesM*100);
    const ing = mixIng[serv]||0;
    row(`    ${serv}`, `${cnt} sesiones (${p}%) — ${fmtPeso(ing)} — prom. ${fmtPeso(Math.round(ing/cnt))}/sesión`);
  });
  if (fullCnt>0&&expressCnt>0) {
    line();
    line(`  ALERTA RENTABILIDAD: Full (${fullCnt}) vs Express (${expressCnt}).`);
    line(`  La Express genera más ingreso por hora que la Full.`);
  }
  line();
  row('Día más ocupado', diaPico);
  row('Día menos ocupado', diaBajo);

  h1(`3. CANCELACIONES Y NO-SHOWS`);
  row('Total citas programadas', todasMes.length + '');
  row('Cancelaciones', canceladasMes.length + ' (' + tasaCancel + '%) — meta <' + META_CANCELACION_PCT + '%');
  row('No-shows (no asistió)', noShowsMes.length + ' (' + noShowRate + '%)');
  row('Citas efectivamente atendidas', (todasMes.length-canceladasMes.length-noShowsMes.length) + '');
  const ingPromedio = citasMes.length>0 ? Math.round(ventasFact/citasMes.length) : 0;
  row('Ingreso estimado perdido (cancel+noshow)', fmtPeso((canceladasMes.length+noShowsMes.length)*ingPromedio));
  if (Object.keys({}).length>0||canceladasMes.length>0) {
    const cancelPorServ={};
    canceladasMes.forEach(c=>{ const sv=c.servicio||'Sin tipo'; cancelPorServ[sv]=(cancelPorServ[sv]||0)+1; });
    if(Object.keys(cancelPorServ).length>0) {
      line();
      line('  Cancelaciones por servicio:');
      Object.entries(cancelPorServ).sort((a,b)=>b[1]-a[1]).forEach(([sv,n])=>row(`    ${sv}`,n+''));
    }
  }

  h1(`4. ANÁLISIS DE PACIENTES`);
  row('Pacientes únicos atendidos', pacUnicosMes + '');
  row('Pacientes nuevos (sin visita en 6 meses)', pacNuevos + '');
  row('Pacientes recurrentes', pacRecurrentes + '');
  row('Tasa de retención 60 días', tasaRet + '% — meta ≥' + META_RETENCION_PCT + '%');
  row('Pacientes con ≥2 sesiones en 60 días', pacRecompra + ' de ' + pac60);
  line();
  const topPac = Object.entries(pacMesMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if (topPac.length>0) {
    line('  Top pacientes por sesiones:');
    topPac.forEach(([nom,n],i)=>row(`    ${i+1}. ${nom}`, n+' sesión'+(n===1?'':'es')));
  }

  h1(`5. MARKETING Y CAPTACIÓN`);
  row('Leads recibidos en el mes', leadsMes>0?leadsMes+'':'Sin registro');
  row('Tasa de conversión', tasaConv!==null?tasaConv+'% — meta ≥25%':'Sin datos de leads');
  row('Pacientes nuevos captados', pacNuevos + '');
  row('Inversión en marketing', fmtPeso(egresosMkt));
  row('CAC (costo adquisición cliente)', cac>0?fmtPeso(cac)+' — meta <'+fmtPeso(META_CAC_MAX):'Sin datos');
  if (Object.keys(canalIng).length>0) {
    line();
    line('  Ingresos por canal de captación:');
    const totalCanalIng=Object.values(canalIng).reduce((s,v)=>s+v,0);
    Object.entries(canalIng).sort((a,b)=>b[1]-a[1]).forEach(([canal,ing])=>{
      const pp=totalCanalIng>0?Math.round(ing/totalCanalIng*100):0;
      row(`    ${canal}`, `${fmtPeso(ing)} (${pp}%) — ${canalMap[canal]} sesiones`);
    });
  }

  h1(`6. CALIDAD Y SATISFACCIÓN`);
  row('NPS (Net Promoter Score)', npsVal + ' — meta ≥' + META_NPS);
  if (encStats.promotores!==undefined) {
    row('  Promotores', encStats.promotores+'');
    row('  Pasivos', encStats.pasivos+'');
    row('  Detractores', encStats.detractores+'');
  }
  row('% Pacientes que respondieron encuesta', encPct + '% — meta ≥' + META_ENCUESTAS + '%');
  row('BD actualizada (tel+email completos)', bdPct + '%' + (bdAuto?` — ${bdAuto.completos}/${bdAuto.total} pacientes`:''));

  h1(`7. SEMÁFORO DE INDICADORES`);
  const sem2 = (v,meta,alto=true) => {
    if(!meta||isNaN(v)) return '⬜ Sin datos';
    const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;
    return ok?'🟢 En meta':warn?'🟡 Cerca de meta':'🔴 Bajo meta';
  };
  row('Sesiones del mes', totalSesiones+'/'+metaSesionesMes+' — '+sem2(totalSesiones,metaSesionesMes));
  row('Ventas cobradas', fmtPeso(ventasCobradas)+' — '+sem2(ventasCobradas,calc.total));
  row('Margen de utilidad', margenPct+'% — '+sem2(margenPct,costos.pct_utilidad));
  row('Tasa de conversión', (tasaConv!==null?tasaConv+'%':'—')+' — '+sem2(tasaConv||0,25));
  row('Tasa de cancelación', tasaCancel+'% — '+sem2(tasaCancel,META_CANCELACION_PCT,false));
  row('Retención 60 días', tasaRet+'% — '+sem2(tasaRet,META_RETENCION_PCT));
  row('NPS', npsVal+' — '+sem2(npsVal,META_NPS));
  row('Encuestas respondidas', encPct+'% — '+sem2(encPct,META_ENCUESTAS));
  row('BD actualizada', bdPct+'% — '+sem2(bdPct,100));
  row('CAC', cac>0?fmtPeso(cac):'—'+' — '+sem2(cac||0,META_CAC_MAX,false));

  line();
  line(sep(60));
  line();
  line(`PREGUNTA PARA CLAUDE:`);
  line();
  line(`Soy fisioterapeuta independiente en Colombia. Acabo de cerrar ${nomMes} ${y}.`);
  line(`Te comparto el reporte completo de mi clínica arriba.`);
  line();
  line(`Con base en estos datos reales:`);
  line(`1. ¿Qué estrategias concretas de ventas me recomiendas para el próximo mes?`);
  line(`2. ¿Qué servicio debería priorizar y por qué?`);
  line(`3. ¿Cómo puedo mejorar la retención y reducir cancelaciones?`);
  line(`4. ¿Qué acciones de marketing tienen más sentido con mi presupuesto actual?`);
  line(`5. ¿Qué otras oportunidades ves que no estoy aprovechando?`);
  line();
  line(`Sé específica, usa los números reales del reporte y dame acciones concretas que pueda`);
  line(`implementar esta semana.`);
  line(sep(60));

  navigator.clipboard.writeText(t).then(() => {
    const btn = document.getElementById('btnBriefClaude');
    const orig = btn.innerHTML;
    btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
    btn.style.background = 'var(--ok)';
    btn.style.color = '#fff';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
  }).catch(() => toast('No se pudo copiar — intenta de nuevo', 'err'));
}

// ══════════════════════════════════════════════════════════════
// ── KPI GUIA — LIVE DASHBOARD ──
// ══════════════════════════════════════════════════════════════
function _kpiCardGuia(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module._kpiCardGuia !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: _kpiCardGuia');
  }
  return module._kpiCardGuia(...args);
}

function scrollToKPICard(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.scrollToKPICard !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: scrollToKPICard');
  }
  return module.scrollToKPICard(...args);
}

// ══ MANUAL DE EMERGENCIA — funciones ══
function renderEmergencia() {
  const d = window._emKPIData;
  if (!d) return;

  const now  = new Date();
  const hora = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});

  function kpiSt(val, meta, altoEsMejor) {
    if (isNaN(val) || !meta || meta <= 0) return -1;
    const ok   = altoEsMejor ? val >= meta   : val <= meta;
    const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;
    return ok ? 0 : warn ? 1 : 2;
  }

  const st = {
    sesiones:   kpiSt(d.sessEval,   d.sessMeta,             true),
    mixfull:    d.totalMix > 0 ? kpiSt(d.fullPct, 30,       false) : -1,
    cancel:     kpiSt(d.tasaCancel, d.cancelMeta,            false),
    leads:      kpiSt(d.leadsShow,  40,                      true),
    conv:       d.tasaConv !== null ? kpiSt(d.tasaConv, 25,  true) : -1,
    ventas_sem: kpiSt(d.ventasSem,  d.ventasSemMeta * 0.84,  true),
    ventas_mes: kpiSt(d.ventasMes,  d.ventasMesMeta * 0.80,  true),
    nps:        kpiSt(d.nps,        d.npsMeta,               true),
    enc:        kpiSt(d.encuestas,  d.encMeta,               true),
    bd:         kpiSt(d.bd,         90,                      true),
  };

  const dotCls = s => s === 2 ? 'rojo' : s === 1 ? 'amarillo' : s === 0 ? 'verde' : 'gris';

  for (const [kpi, status] of Object.entries(st)) {
    const dot  = document.getElementById('emDot_' + kpi);
    if (dot)  dot.className = 'em-dot ' + dotCls(status);
    const card = document.getElementById('emCard_' + kpi);
    if (card) {
      if (status === 2) card.classList.add('alerta');
      else              card.classList.remove('alerta');
    }
  }

  const dims = { 1:['sesiones','mixfull','cancel'], 2:['leads','conv'], 3:['ventas_sem','ventas_mes'], 4:['nps','enc','bd'] };
  let totalRojos = 0;

  for (const [dim, kpis] of Object.entries(dims)) {
    const rojos     = kpis.filter(k => st[k] === 2).length;
    const amarillos = kpis.filter(k => st[k] === 1).length;
    totalRojos += rojos;

    const badge = document.getElementById('emDB_' + dim);
    if (badge) {
      if (rojos > 0) {
        badge.textContent = rojos + ' alerta' + (rojos > 1 ? 's' : '');
        badge.className = 'em-dim-badge has-red';
        const dimEl  = document.getElementById('emDim_' + dim);
        const bodyEl = document.getElementById('emDB_body_' + dim);
        if (dimEl && bodyEl && !dimEl.classList.contains('open')) {
          dimEl.classList.add('open');
          bodyEl.style.display = 'block';
        }
      } else if (kpis.some(k => st[k] === 0)) {
        badge.textContent = '✓ OK';
        badge.className = 'em-dim-badge all-ok';
      } else {
        badge.textContent = '—';
        badge.className = 'em-dim-badge neutral';
      }
    }
  }

  const rojoC    = Object.values(st).filter(s => s === 2).length;
  const amarilloC = Object.values(st).filter(s => s === 1).length;
  const verdeC   = Object.values(st).filter(s => s === 0).length;

  const bar = document.getElementById('emStatusBar');
  if (bar) {
    bar.innerHTML =
      (rojoC    > 0 ? `<span class="em-pill rojo">🔴 ${rojoC} en rojo</span>` : '') +
      (amarilloC > 0 ? `<span class="em-pill amarillo">🟡 ${amarilloC} en alerta</span>` : '') +
      (verdeC   > 0 ? `<span class="em-pill verde">🟢 ${verdeC} en meta</span>` : '') +
      (rojoC === 0 && amarilloC === 0 && verdeC === 0 ? '<span class="em-pill gris">Sin datos suficientes</span>' : '') +
      `<span class="em-status-ts">Actualizado ${hora}</span>`;
  }

  const crisis = document.getElementById('emCrisisBanner');
  if (crisis) crisis.style.display = totalRojos >= 3 ? 'block' : 'none';

  loadAllEmSteps();
}

function toggleEmDim(n) {
  const dimEl  = document.getElementById('emDim_' + n);
  const bodyEl = document.getElementById('emDB_body_' + n);
  if (!dimEl || !bodyEl) return;
  const open = dimEl.classList.toggle('open');
  bodyEl.style.display = open ? 'block' : 'none';
}

function toggleEmCard(id) {
  const card = document.getElementById('emCard_' + id);
  const body = document.getElementById('emBody_' + id);
  if (!card || !body) return;
  const open = card.classList.toggle('open');
  body.style.display = open ? 'block' : 'none';
  if (!open) card.classList.remove('alerta');
}

function handleEmStep(event, kpi, idx) {
  event.preventDefault();
  const ck = document.getElementById('emCk_' + kpi + '_' + idx);
  if (!ck) return;
  ck.checked = !ck.checked;
  _persistEmStep(kpi, idx, ck.checked);
}

function _persistEmStep(kpi, idx, checked) {
  const key = 'em_steps_' + kpi;
  let state = [];
  try { state = JSON.parse(kvGet(key) || '[]'); } catch(e) {}
  state[idx] = checked;
  kvSet(key, JSON.stringify(state));
  _updateEmProgress(kpi);
}

function _updateEmProgress(kpi) {
  const checks = [];
  for (let i = 0; i < 6; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (!ck) break;
    checks.push(ck.checked);
    const row = document.getElementById('emS_' + kpi + '_' + i);
    if (row) row.classList.toggle('done', ck.checked);
  }
  const total = checks.length, done = checks.filter(Boolean).length;
  const fill = document.getElementById('emPF_' + kpi);
  if (fill) fill.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
  const meta = document.getElementById('emPM_' + kpi);
  if (meta) meta.textContent = done + ' de ' + total + ' pasos completados';
  const btn  = document.getElementById('emDB_' + kpi);
  if (btn)  btn.classList.toggle('done-ok', done === total && total > 0);
}

function loadAllEmSteps() {
  ['sesiones','mixfull','cancel','leads','conv','ventas_sem','ventas_mes','nps','enc','bd','retencion'].forEach(kpi => {
    let state = [];
    try { state = JSON.parse(kvGet('em_steps_' + kpi) || '[]'); } catch(e) {}
    state.forEach((checked, idx) => {
      const ck = document.getElementById('emCk_' + kpi + '_' + idx);
      if (ck) ck.checked = !!checked;
    });
    _updateEmProgress(kpi);
  });
}

function markEmDone(kpi, total) {
  const state = Array(total).fill(true);
  kvSet('em_steps_' + kpi, JSON.stringify(state));
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = true;
  }
  _updateEmProgress(kpi);
}

function resetEmSteps(kpi, total) {
  kvRemove('em_steps_' + kpi);
  for (let i = 0; i < total; i++) {
    const ck = document.getElementById('emCk_' + kpi + '_' + i);
    if (ck) ck.checked = false;
  }
  _updateEmProgress(kpi);
}

function renderKPIGuia(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.renderKPIGuia !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: renderKPIGuia');
  }
  return module.renderKPIGuia(...args);
}

function _renderCancelBreakdown(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module._renderCancelBreakdown !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: _renderCancelBreakdown');
  }
  return module._renderCancelBreakdown(...args);
}

// ── ENCUESTA STATS — conectado a Google Forms via GAS ──
function getEncuestaStats() {
  try { return JSON.parse(kvGet('encuestaStats') || '{}'); } catch { return {}; }
}

async function loadEncuestaStats() {
  const btn  = document.getElementById('btnCargarEncuesta');
  const btn2 = document.getElementById('btnCargarEncuestaGuia');
  [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Cargando...'; } });
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=getEncuestaStats&token=${encodeURIComponent(TOKEN)}`);
    const d = await r.json();
    if (d.ok) {
      const now = new Date();
      const m = now.getMonth()+1, y = now.getFullYear();
      const citasMes = citasReales().filter(c => {
        const [cy,cm] = normDate(c.fecha).split('-');
        return +cm===m && +cy===y;
      }).length;
      const encPct  = citasMes > 0 ? Math.round((d.totalMes / citasMes) * 100) : 0;
      const npsVal  = (d.nps !== null && d.nps !== undefined) ? d.nps : null;
      const stats   = {
        nps: npsVal, encuestas: encPct,
        totalRespuestas: d.totalMes, citasMes,
        promotores: d.promotores, pasivos: d.pasivos, detractores: d.detractores,
        fetchedAt: Date.now()
      };
      kvSet('encuestaStats', JSON.stringify(stats));
      // Actualizar inputs ocultos y guardar
      const sv = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      sv('kpiNPS', npsVal !== null ? npsVal : ''); sv('kpiEncuestas', encPct);
      guardarKPIManual();
      _renderEncuestaStatsUI(stats);
      renderKPITablero();
      renderKPIGuia();
      toast(`✅ NPS: ${npsVal !== null ? npsVal : '—'} · Encuestas: ${encPct}% · ${d.totalMes} respuestas este mes`, 'ok');
    } else {
      toast('Error al leer el formulario: ' + (d.error || 'verifica el GAS'), 'err');
    }
  } catch(e) { toast('Error de conexión al cargar encuestas', 'err'); }
  [btn, btn2].forEach(b => { if (b) { b.disabled = false; b.textContent = b.id === 'btnCargarEncuestaGuia' ? '🔄 Cargar encuestas' : '🔄 Cargar desde formulario'; } });
}

function _renderEncuestaStatsUI(stats) {
  if (!stats || (stats.nps === undefined && stats.encuestas === undefined)) return;
  const npsOk     = stats.nps !== null && stats.nps !== undefined;
  const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';
  const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';
  const npsEl     = document.getElementById('kpiNPSAutoTag');
  const encEl     = document.getElementById('kpiEncuestasAutoTag');
  if (npsEl) npsEl.innerHTML = npsOk
    ? `<span style="font-size:1rem;font-weight:700;color:${colorNPS}">${stats.nps}</span>`+
      ` <span style="color:var(--muted);font-size:.75rem">· ${stats.promotores}P / ${stats.pasivos}Pa / ${stats.detractores}D</span>`
    : `<span style="font-size:.88rem;color:var(--muted)">Sin respuestas este mes · ${stats.totalRespuestas || 0} resp.</span>`;
  if (encEl) encEl.innerHTML =
    `<span style="font-size:1rem;font-weight:700;color:${colorEnc}">${stats.encuestas}%</span>`+
    ` <span style="color:var(--muted);font-size:.75rem">· ${stats.totalRespuestas} resp. / ${stats.citasMes} citas</span>`;
}

// ── RUTINA DE MEDICIÓN — checklist tachable con reinicio diario ──
const RUTINA_IDS = ['d3','d6','d7','d8','d9','d10','s1','s2','s3','s4','s5','s6','s7','m1','m3','m4','m5','m6'];

function _rutinaKey() {
  const d = new Date();
  return `rutina_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadRutinaChecks() {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  RUTINA_IDS.forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    const done = checked.includes(id);
    cb.checked = done;
    lbl.classList.toggle('done', done);
  });
}

function toggleRutinaCheck(id) {
  const cb  = document.getElementById('rck_' + id);
  const lbl = cb ? cb.closest('.gk-check-item') : null;
  if (!cb || !lbl) return;
  // Usamos un pequeño delay para leer el valor actualizado
  setTimeout(() => {
    const done = cb.checked;
    lbl.classList.toggle('done', done);
    const today = _rutinaKey();
    let checked = [];
    try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
    if (done && !checked.includes(id))  checked.push(id);
    if (!done) checked = checked.filter(x => x !== id);
    kvSet(today, JSON.stringify(checked));
  }, 0);
}

function resetRutina() {
  kvRemove(_rutinaKey());
  loadRutinaChecks();
  toast('Checklist reiniciado', 'ok');
}

function resetRutinaGrupo(prefix) {
  const today = _rutinaKey();
  let checked = [];
  try { checked = JSON.parse(kvGet(today) || '[]'); } catch {}
  checked = checked.filter(id => !id.startsWith(prefix));
  kvSet(today, JSON.stringify(checked));
  RUTINA_IDS.filter(id => id.startsWith(prefix)).forEach(id => {
    const cb  = document.getElementById('rck_' + id);
    const lbl = cb ? cb.closest('.gk-check-item') : null;
    if (!cb || !lbl) return;
    cb.checked = false;
    lbl.classList.remove('done');
  });
  const nombre = prefix === 'd' ? 'Diario' : prefix === 's' ? 'Semanal' : 'Mensual';
  toast('Checklist ' + nombre + ' reiniciado', 'ok');
}

function _renderBDBreakdown(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module._renderBDBreakdown !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: _renderBDBreakdown');
  }
  return module._renderBDBreakdown(...args);
}

function applyKPIRefSpans(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.applyKPIRefSpans !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: applyKPIRefSpans');
  }
  return module.applyKPIRefSpans(...args);
}

function renderPresupuestoMetas() {
  const el = document.getElementById('presupuestoBody');
  if (!el) return;
  const costos = getCostosEstructura();
  const calc   = calcTotalCostos(costos);
  const cfg    = getKPIConfig();

  const fmtN = v => Number(v).toLocaleString('es-CO');

  const inpDoble = (idP, idD, label, valP, valD) => `
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;align-items:center;gap:8px;margin-bottom:6px">
      <div style="font-size:.78rem;color:var(--text)">${label}</div>
      <input type="number" id="pm_${idP}" value="${valP}" placeholder="Presencial" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" title="Precio presencial">
      <input type="number" id="pm_${idD}" value="${valD}" placeholder="Domicilio" oninput="pmRecalc()"
        style="background:var(--s2);border:1px solid rgba(99,102,241,.3);border-radius:7px;color:var(--text);font-family:var(--font-b);font-size:.82rem;padding:7px 9px;outline:none;width:100%;box-sizing:border-box"
        onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='rgba(99,102,241,.3)'" title="Precio domicilio">
    </div>`;

  const inp = (id, label, val, note='', tipo='number') => `
    <div>
      <label style="font-size:.75rem;color:var(--muted);display:block;margin-bottom:4px;font-family:var(--font-m)">${label}${note?`<span style="font-size:.68rem;color:var(--primary);margin-left:5px">${note}</span>`:''}</label>
      <input type="${tipo}" id="pm_${id}" value="${val}" oninput="pmRecalc()"
        style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.88rem;padding:9px 11px;outline:none;box-sizing:border-box"
        onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
    </div>`;

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">

      <!-- COLUMNA IZQUIERDA: COSTOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">💼 Costos Fijos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('honorarios_fisio',  'Honorarios Fisio',       costos.honorarios_fisio)}
            ${inp('seguridad_social',  'Seguridad Social',       costos.seguridad_social)}
            ${inp('asistente_fisio',   'Asistente Fisio',        costos.asistente_fisio)}
            ${inp('auxiliar_admin',    'Auxiliar Administrativa', costos.auxiliar_admin)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🏢 Costos Operativos</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('arriendo',           'Arriendo',            costos.arriendo)}
            ${inp('servicios_publicos', 'Servicios públicos',  costos.servicios_publicos)}
            ${inp('suscripcion_ia',     'Suscripción IA',      costos.suscripcion_ia)}
            ${inp('suscripcion_capcut', 'Suscripción CapCut',  costos.suscripcion_capcut)}
            ${inp('asesorias_ap',       'Asesorías AP x4/Mes', costos.asesorias_ap)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📣 Costos Variables</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('redes_contenido',    'Redes Sociales Contenido',  costos.redes_contenido)}
            ${inp('activacion_eventos', 'Activación marca-Eventos',  costos.activacion_eventos)}
            ${inp('pautas_redes',       'Pautas Redes',              costos.pautas_redes)}
            ${inp('mantenimiento',      'Mantenimiento y compras',   costos.mantenimiento)}
            ${inp('insumos',            'Insumos',                   costos.insumos)}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📊 Porcentajes adicionales</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('pct_imprevistos', 'Fondo Imprevistos (%)', costos.pct_imprevistos)}
            ${inp('pct_utilidad',    'Utilidad Deseada (%)',  costos.pct_utilidad)}
          </div>
        </div>

        <!-- Resumen calculado -->
        <div class="card" style="background:rgba(27,191,176,.05);border:1.5px solid rgba(27,191,176,.3)">
          <div class="card-title" style="margin-bottom:12px">🧮 Resultado calculado</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">SUBTOTAL COSTOS</div>
              <div id="pm_res_subtotal" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700">$${fmtN(calc.subtotal)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">IMPREVISTOS</div>
              <div id="pm_res_imprevistos" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:#f59e0b">$${fmtN(calc.imprevistos)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--s2);border-radius:8px">
              <div style="font-size:.7rem;color:var(--muted);font-family:var(--font-m);margin-bottom:3px">UTILIDAD OBJETIVO</div>
              <div id="pm_res_utilidad" style="font-family:var(--font-h);font-size:1.1rem;font-weight:700;color:var(--ok)">$${fmtN(calc.utilidad)}</div>
            </div>
            <div style="padding:10px 14px;background:var(--primary);border-radius:8px">
              <div style="font-size:.7rem;color:rgba(0,0,0,.6);font-family:var(--font-m);margin-bottom:3px">META TOTAL / MES</div>
              <div id="pm_res_total" style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:#0D0D0D">$${fmtN(calc.total)}</div>
            </div>
          </div>
        </div>

        <button onclick="pmGuardarCostos()"
          style="padding:12px 24px;background:var(--primary);color:#0D0D0D;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar presupuesto y actualizar metas
        </button>

      </div>

      <!-- COLUMNA DERECHA: METAS KPIs + PRECIOS -->
      <div style="display:flex;flex-direction:column;gap:16px">

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">🎯 Metas operativas</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_sesiones_semana', 'Sesiones por semana',    cfg.meta_sesiones_semana, '≥ N')}
            ${inp('kpi_ventas_mes',      'Meta ventas / mes ($)',  cfg.meta_ventas_mes,      'auto desde costos')}
            ${inp('kpi_leads_min',       'Leads mínimo / mes',     cfg.meta_leads_min)}
            ${inp('kpi_leads_max',       'Leads máximo / mes',     cfg.meta_leads_max)}
            ${inp('kpi_conv_min',        'Conversión mínima (%)',  cfg.meta_conv_min)}
            ${inp('kpi_conv_max',        'Conversión máxima (%)',  cfg.meta_conv_max)}
            ${inp('kpi_nps',             'Meta NPS',               cfg.meta_nps,             '≥ N')}
            ${inp('kpi_encuestas',       'Meta encuestas (%)',     cfg.meta_encuestas,       '≥ N%')}
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:4px">💰 Precios de servicios</div>
          <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Presencial · Domicilio — se usan para autocompletar al agendar</div>

          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin-bottom:6px">
            <div></div>
            <div style="font-size:.68rem;color:var(--muted);text-align:center;font-family:var(--font-m)">PRESENCIAL</div>
            <div style="font-size:.68rem;color:#6366f1;text-align:center;font-family:var(--font-m)">DOMICILIO</div>
          </div>
          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Descargas musculares</div>
          ${inpDoble('sv_cuello_p','sv_cuello_d','Cuello y Espalda',cfg.sv_cuello_p||75000,cfg.sv_cuello_d||90000)}
          ${inpDoble('sv_piernas_p','sv_piernas_d','Piernas',cfg.sv_piernas_p||75000,cfg.sv_piernas_d||90000)}
          ${inpDoble('sv_completa_p','sv_completa_d','Completa (Full)',cfg.sv_completa_p||110000,cfg.sv_completa_d||125000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Sesiones individuales</div>
          ${inpDoble('sv_valoracion_p','sv_valoracion_d','Valoración Funcional',cfg.sv_valoracion_p||80000,cfg.sv_valoracion_d||95000)}
          ${inpDoble('sv_readap_p','sv_readap_d','Readaptación Funcional',cfg.sv_readap_p||70000,cfg.sv_readap_d||85000)}
          ${inpDoble('sv_express_p','sv_express_d','Descarga Express',cfg.precio_express||75000,cfg.sv_express_d||90000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Combos y sesiones especiales</div>
          ${inpDoble('sv_diag_p','sv_diag_d','Combo Diagnóstico Pro',cfg.sv_diag_p||160000,cfg.sv_diag_d||185000)}
          ${inpDoble('sv_bienvenida_p','sv_bienvenida_d','Combo Bienvenida',cfg.sv_bienvenida_p||120000,cfg.sv_bienvenida_d||120000)}
          ${inpDoble('sv_mini_p','sv_mini_d','Mini-sesión Familiar 20min',cfg.sv_mini_p||40000,cfg.sv_mini_d||40000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Paquetes Readaptación</div>
          ${inpDoble('sv_pkInicio_p','sv_pkInicio_d','Paquete Inicio (6 ses)',cfg.sv_pkInicio_p||378000,cfg.sv_pkInicio_d||469000)}
          ${inpDoble('sv_pkAvance_p','sv_pkAvance_d','Paquete Avance (8 ses)',cfg.sv_pkAvance_p||476000,cfg.sv_pkAvance_d||598000)}
          ${inpDoble('sv_pkTotal_p','sv_pkTotal_d','Paquete Total (10 ses)',cfg.sv_pkTotal_p||560000,cfg.sv_pkTotal_d||722000)}
          ${inpDoble('sv_pkRecup_p','sv_pkRecup_d','Paquete Recuperación Full',cfg.sv_pkRecup_p||264000,cfg.sv_pkRecup_d||264000)}

          <div style="font-size:.7rem;font-family:var(--font-m);color:var(--primary);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 8px">Planes mensuales</div>
          ${inpDoble('sv_planActivo_p','sv_planActivo_d','Plan Activo (2 ses)',cfg.sv_planActivo_p||135000,cfg.sv_planActivo_d||165000)}
          ${inpDoble('sv_planPro_p','sv_planPro_d','Plan Pro (3 ses)',cfg.sv_planPro_p||230000,cfg.sv_planPro_d||275000)}

          <div style="margin-top:14px;padding:10px 14px;background:rgba(27,191,176,.06);border-radius:8px;font-size:.75rem;color:var(--muted)">
            💡 Ticket promedio individual (sesiones sueltas):
            <strong id="pm_ticket_avg" style="color:var(--primary)">calculando...</strong>
            · Sesiones necesarias/mes:
            <strong id="pm_sess_calc" style="color:var(--primary)">—</strong>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:14px">📈 Inversión en marketing</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${inp('kpi_inv_mkt_total',     'Total marketing/mes ($)',     cfg.inv_mkt_total)}
            ${inp('kpi_inv_mkt_pauta',     'Pauta en redes ($)',          cfg.inv_mkt_pauta)}
            ${inp('kpi_inv_mkt_contenido', 'Creación de contenido ($)',   cfg.inv_mkt_contenido)}
          </div>
        </div>

        <button onclick="pmGuardarKPIs()"
          style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-b);font-size:.92rem;font-weight:700;width:100%">
          💾 Guardar metas de KPIs
        </button>

      </div>
    </div>`;
}

function pmRecalc() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const c = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc  = calcTotalCostos(c);
  const fmtN  = v => Number(v).toLocaleString('es-CO');
  const set   = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('pm_res_subtotal',    '$' + fmtN(calc.subtotal));
  set('pm_res_imprevistos', '$' + fmtN(calc.imprevistos));
  set('pm_res_utilidad',    '$' + fmtN(calc.utilidad));
  set('pm_res_total',       '$' + fmtN(calc.total));
  // Actualizar ticket promedio
  // Ticket promedio = promedio de los 6 servicios individuales (presencial)
  const indivPrecios = [
    g('sv_cuello_p') || 75000, g('sv_piernas_p') || 75000, g('sv_completa_p') || 110000,
    g('sv_valoracion_p') || 80000, g('sv_readap_p') || 70000, g('sv_express_p') || 75000,
  ];
  const ticket = Math.round(indivPrecios.reduce((s,v) => s+v, 0) / indivPrecios.length);
  const ta = document.getElementById('pm_ticket_avg');
  const sc = document.getElementById('pm_sess_calc');
  if (ta) ta.textContent = '$' + fmtN(ticket);
  if (sc && ticket > 0) sc.textContent = Math.ceil(calc.total / ticket);
}

function pmGuardarCostos() {
  const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;
  const costos = {
    honorarios_fisio: g('honorarios_fisio'), seguridad_social: g('seguridad_social'),
    asistente_fisio: g('asistente_fisio'),   auxiliar_admin: g('auxiliar_admin'),
    arriendo: g('arriendo'),                 servicios_publicos: g('servicios_publicos'),
    suscripcion_ia: g('suscripcion_ia'),     suscripcion_capcut: g('suscripcion_capcut'),
    asesorias_ap: g('asesorias_ap'),         redes_contenido: g('redes_contenido'),
    activacion_eventos: g('activacion_eventos'), pautas_redes: g('pautas_redes'),
    mantenimiento: g('mantenimiento'),       insumos: g('insumos'),
    pct_imprevistos: g('pct_imprevistos'),   pct_utilidad: g('pct_utilidad'),
  };
  const calc = calcTotalCostos(costos);
  saveCostosEstructura(costos);
  // Solo actualiza meta de ventas si el campo kpi_ventas_mes fue editado manualmente en este guardado
  const cfg = getKPIConfig();
  const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;
  if (inputMeta && inputMeta !== cfg.meta_ventas_mes) {
    cfg.meta_ventas_mes = inputMeta;
    kvSet('kpiConfig', JSON.stringify(cfg));
    META_VENTAS_MES    = inputMeta;
    META_VENTAS_SEMANA = Math.round(inputMeta / 4);
    kvSet('metaMensual', inputMeta);
  }
  reloadMetas();
  applyKPIRefSpans();
  toast('✅ Presupuesto guardado — meta actualizada a $' + Number(calc.total).toLocaleString('es-CO'), 'ok');
  renderPresupuestoMetas();
}

function pmGuardarKPIs() {
  const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;
  const cfg = getKPIConfig();
  // Metas operativas
  cfg.meta_sesiones_semana  = g('kpi_sesiones_semana')  || cfg.meta_sesiones_semana;
  cfg.meta_ventas_mes       = g('kpi_ventas_mes')       || cfg.meta_ventas_mes;
  cfg.meta_leads_min        = g('kpi_leads_min')        || cfg.meta_leads_min;
  cfg.meta_leads_max        = g('kpi_leads_max')        || cfg.meta_leads_max;
  cfg.meta_conv_min         = g('kpi_conv_min')         || cfg.meta_conv_min;
  cfg.meta_conv_max         = g('kpi_conv_max')         || cfg.meta_conv_max;
  cfg.meta_nps              = g('kpi_nps')              || cfg.meta_nps;
  cfg.meta_encuestas        = g('kpi_encuestas')        || cfg.meta_encuestas;
  // Marketing
  cfg.inv_mkt_total         = g('kpi_inv_mkt_total')    || cfg.inv_mkt_total;
  cfg.inv_mkt_pauta         = g('kpi_inv_mkt_pauta')    || cfg.inv_mkt_pauta;
  cfg.inv_mkt_contenido     = g('kpi_inv_mkt_contenido')|| cfg.inv_mkt_contenido;
  // Precios servicios (presencial y domicilio)
  cfg.sv_cuello_p           = g('sv_cuello_p')    || 75000;
  cfg.sv_cuello_d           = g('sv_cuello_d')    || 90000;
  cfg.sv_piernas_p          = g('sv_piernas_p')   || 75000;
  cfg.sv_piernas_d          = g('sv_piernas_d')   || 90000;
  cfg.sv_completa_p         = g('sv_completa_p')  || 110000;
  cfg.sv_completa_d         = g('sv_completa_d')  || 125000;
  cfg.sv_valoracion_p       = g('sv_valoracion_p')|| 80000;
  cfg.sv_valoracion_d       = g('sv_valoracion_d')|| 95000;
  cfg.sv_readap_p           = g('sv_readap_p')    || 70000;
  cfg.sv_readap_d           = g('sv_readap_d')    || 85000;
  cfg.precio_express        = g('sv_express_p')   || 75000;
  cfg.sv_express_d          = g('sv_express_d')   || 90000;
  cfg.sv_diag_p             = g('sv_diag_p')      || 160000;
  cfg.sv_diag_d             = g('sv_diag_d')      || 185000;
  cfg.sv_bienvenida_p       = g('sv_bienvenida_p')|| 120000;
  cfg.sv_bienvenida_d       = g('sv_bienvenida_d')|| 120000;
  cfg.sv_mini_p             = g('sv_mini_p')      || 40000;
  cfg.sv_mini_d             = g('sv_mini_d')      || 40000;
  cfg.sv_pkInicio_p         = g('sv_pkInicio_p')  || 378000;
  cfg.sv_pkInicio_d         = g('sv_pkInicio_d')  || 469000;
  cfg.sv_pkAvance_p         = g('sv_pkAvance_p')  || 476000;
  cfg.sv_pkAvance_d         = g('sv_pkAvance_d')  || 598000;
  cfg.sv_pkTotal_p          = g('sv_pkTotal_p')   || 560000;
  cfg.sv_pkTotal_d          = g('sv_pkTotal_d')   || 722000;
  cfg.sv_pkRecup_p          = g('sv_pkRecup_p')   || 264000;
  cfg.sv_pkRecup_d          = g('sv_pkRecup_d')   || 264000;
  cfg.sv_planActivo_p       = g('sv_planActivo_p')|| 135000;
  cfg.sv_planActivo_d       = g('sv_planActivo_d')|| 165000;
  cfg.sv_planPro_p          = g('sv_planPro_p')   || 230000;
  cfg.sv_planPro_d          = g('sv_planPro_d')   || 275000;
  // Mantener precio_full apuntando a Completa
  cfg.precio_full           = cfg.sv_completa_p;
  kvSet('kpiConfig', JSON.stringify(cfg));
  kvSet('metaMensual', cfg.meta_ventas_mes); // sync barra Finanzas
  META_VENTAS_MES = cfg.meta_ventas_mes; META_VENTAS_SEMANA = Math.round(cfg.meta_ventas_mes / 4);
  // Actualizar autoFillPrice con los nuevos precios
  _syncPreciosToAutoFill(cfg);
  reloadMetas();
  applyKPIRefSpans();
  actualizarMetaBarra(calcCobradoMes());
  toast('✅ Precios y metas guardados', 'ok');
  renderPresupuestoMetas();
}

function _syncPreciosToAutoFill(cfg) {
  // Sobreescribe los precios en autoFillPrice leyendo desde kpiConfig guardado
  window._preciosOverride = {
    'Descarga Muscular — Cuello y Espalda': { Presencial: '$'+Number(cfg.sv_cuello_p||75000).toLocaleString('es-CO'),    Domicilio: '$'+Number(cfg.sv_cuello_d||90000).toLocaleString('es-CO') },
    'Descarga Muscular — Piernas':          { Presencial: '$'+Number(cfg.sv_piernas_p||75000).toLocaleString('es-CO'),   Domicilio: '$'+Number(cfg.sv_piernas_d||90000).toLocaleString('es-CO') },
    'Descarga Muscular Completa':           { Presencial: '$'+Number(cfg.sv_completa_p||110000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_completa_d||125000).toLocaleString('es-CO') },
    'Valoración Funcional':                 { Presencial: '$'+Number(cfg.sv_valoracion_p||80000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_valoracion_d||95000).toLocaleString('es-CO') },
    'Readaptación Funcional':               { Presencial: '$'+Number(cfg.sv_readap_p||70000).toLocaleString('es-CO'),   Domicilio: '$'+Number(cfg.sv_readap_d||85000).toLocaleString('es-CO') },
    'Combo Diagnóstico Pro':                { Presencial: '$'+Number(cfg.sv_diag_p||160000).toLocaleString('es-CO'),    Domicilio: '$'+Number(cfg.sv_diag_d||185000).toLocaleString('es-CO') },
    'Combo Bienvenida':                     { Presencial: '$'+Number(cfg.sv_bienvenida_p||120000).toLocaleString('es-CO'),Domicilio:'$'+Number(cfg.sv_bienvenida_d||120000).toLocaleString('es-CO') },
    'Mini-sesión Familiar 20 min':          { Presencial: '$'+Number(cfg.sv_mini_p||40000).toLocaleString('es-CO'),     Domicilio: '$'+Number(cfg.sv_mini_d||40000).toLocaleString('es-CO') },
    'Paquete Recuperación Full':            { Presencial: '$'+Number(cfg.sv_pkRecup_p||264000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_pkRecup_d||264000).toLocaleString('es-CO') },
    'Paquete Readaptación Inicio':          { Presencial: '$'+Number(cfg.sv_pkInicio_p||378000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_pkInicio_d||469000).toLocaleString('es-CO') },
    'Paquete Readaptación Avance':          { Presencial: '$'+Number(cfg.sv_pkAvance_p||476000).toLocaleString('es-CO'),Domicilio: '$'+Number(cfg.sv_pkAvance_d||598000).toLocaleString('es-CO') },
    'Paquete Readaptación Total':           { Presencial: '$'+Number(cfg.sv_pkTotal_p||560000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_pkTotal_d||722000).toLocaleString('es-CO') },
    'Plan Activo':                          { Presencial: '$'+Number(cfg.sv_planActivo_p||135000).toLocaleString('es-CO'),Domicilio:'$'+Number(cfg.sv_planActivo_d||165000).toLocaleString('es-CO') },
    'Plan Pro':                             { Presencial: '$'+Number(cfg.sv_planPro_p||230000).toLocaleString('es-CO'), Domicilio: '$'+Number(cfg.sv_planPro_d||275000).toLocaleString('es-CO') },
  };
}

function guardarKPIConfig(...args) {
  const module = window.PanelKPI;
  if (!module || typeof module.guardarKPIConfig !== 'function') {
    throw new Error('El módulo Indicadores y KPI no está disponible: guardarKPIConfig');
  }
  return module.guardarKPIConfig(...args);
}

// ══════════════════════════════════════════════════════════════
// ── ESTRUCTURA FINANCIERA ──
// ══════════════════════════════════════════════════════════════
function renderEstructuraFinanciera(...args) {
  const module = window.PanelFinance;
  if (!module || typeof module.renderEstructuraFinanciera !== 'function') {
    throw new Error('El módulo Finanzas no está disponible: renderEstructuraFinanciera');
  }
  return module.renderEstructuraFinanciera(...args);
}

// ══════════════════════════════════════════════════════════════
// ── MÉTRICAS INTELIGENTES ──
// ══════════════════════════════════════════════════════════════
function renderMetricas() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
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

// ── Automatización #2: marcar citas pasadas como Atendidas ──
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

// ── Automatización #3: cobros pendientes (3+ días sin registrar pago) ──
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
```

## Declaraciones relacionadas

- Línea 8318: `const pctSesiones = META_SESIONES_SEMANA ? Math.round((semanaCitas.length / META_SESIONES_SEMANA) * 100) : 0;`
- Línea 9155: `const costosReales = {`
- Línea 10308: `const stopMatch = rawFull.match(NAME_STOPPERS);`
- Línea 10957: `const stored = parseInt(kvGet('metaMensual')||'0', 10);`
- Línea 10963: `const meta = getMeta();`
- Línea 10964: `const fill = document.getElementById('metaBarFill');`
- Línea 10965: `const pct  = document.getElementById('metaPct');`
- Línea 10966: `const txt  = document.getElementById('metaTexto');`
- Línea 10967: `const inp  = document.getElementById('metaInput');`
- Línea 10975: `const p = Math.min(Math.round(cobrado / meta * 100), 100);`
- Línea 10987: `const fill = document.getElementById('metaBarFill');`
- Línea 10988: `const pct  = document.getElementById('metaPct');`
- Línea 10994: `const val = parseInt((document.getElementById('metaInput').value||'').replace(/\D/g,''), 10);`
- Línea 10997: `const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));`
- Línea 11009: `const fill = document.getElementById('metaBarFinFill');`
- Línea 11010: `const pct  = document.getElementById('metaBarFinPct');`
- Línea 11011: `const wrap = document.getElementById('metaBarFinWrap');`
- Línea 11018: `const val = parseInt((document.getElementById('metaInputFin').value||'').replace(/\D/g,''), 10);`
- Línea 11021: `const cfg = getKPIConfig(); cfg.meta_ventas_mes = val; kvSet('kpiConfig', JSON.stringify(cfg));`
- Línea 11182: `const COSTOS_DEFAULTS = {`
- Línea 11207: `const s = kvGet('costosEstructura');`
- Línea 11258: `let META_SESIONES_SEMANA = _cfg0.meta_sesiones_semana;`
- Línea 11259: `let META_VENTAS_SEMANA   = Math.round(_cfg0.meta_ventas_mes / 4);`
- Línea 11260: `let META_VENTAS_MES      = _cfg0.meta_ventas_mes;`
- Línea 11261: `let META_NPS             = _cfg0.meta_nps;`
- Línea 11262: `let META_ENCUESTAS       = _cfg0.meta_encuestas;`
- Línea 11263: `let META_CANCELACION_PCT = _cfg0.meta_cancelacion;`
- Línea 11264: `let META_RETENCION_PCT   = _cfg0.meta_retencion;`
- Línea 11265: `const META_CAC_MAX         = 80000;`
- Línea 11492: `const metaMensual = cfg.meta_ventas_mes || window.META_VENTAS_MES || 0;`
- Línea 11493: `const cumplimiento = metaMensual > 0 ? Math.round((ingresosCobrados / metaMensual) * 100) : 0;`
- Línea 11494: `const faltante = Math.max(0, metaMensual - ingresosCobrados);`
- Línea 11885: `const panel   = document.getElementById('costosEditorPanel');`
- Línea 11886: `const compact = document.getElementById('costosVistaCompacta');`
- Línea 11887: `const btn     = document.getElementById('btnEditCostos');`
- Línea 11895: `const c = {...COSTOS_DEFAULTS};`
- Línea 11903: `const c    = _leerCamposCostos();`
- Línea 11904: `const calc = calcTotalCostos(c);`
- Línea 11913: `const c    = _leerCamposCostos();`
- Línea 11914: `const calc = calcTotalCostos(c);`
- Línea 11949: `const ok   = alto ? val >= meta : val <= meta;`
- Línea 11950: `const warn = alto ? val >= meta * 0.8 : val <= meta * 1.2;`
- Línea 11982: `const metaSesionesMes = META_SESIONES_SEMANA * 4;`
- Línea 12005: `const costos = getCostosEstructura();`
- Línea 12006: `const calc   = calcTotalCostos(costos);`
- Línea 12151: `const falta = metaSesionesMes-totalSesiones;`
- Línea 12246: `const pctMeta = pct(ventasCobradas, META_VENTAS_MES);`
- Línea 12247: `const barW    = Math.min(pctMeta, 100);`
- Línea 12248: `const barCol  = pctMeta>=100?'var(--ok)':pctMeta>=80?'#f59e0b':'#ef4444';`
- Línea 12362: `const metaSem = META_SESIONES_SEMANA;`
- Línea 12363: `const semCol  = sess.length>=metaSem?'var(--ok)':sess.length>=metaSem*.8?'#f59e0b':'#ef4444';`
- Línea 12440: `const cancelColor = tasaCancel<=META_CANCELACION_PCT?'var(--ok)':tasaCancel<=META_CANCELACION_PCT*1.2?'#f59e0b':'#ef4444';`
- Línea 12576: `const npsC = _semCell(npsVal, META_NPS);`
- Línea 12577: `const encC = _semCell(encPct, META_ENCUESTAS);`
- Línea 12692: `const costos     = getCostosEstructura();`
- Línea 12693: `const calc       = calcTotalCostos(costos);`
- Línea 12701: `const metaSesionesMes = META_SESIONES_SEMANA * 4;`
- Línea 12712: `const pctMeta         = calc.total>0 ? Math.round((ventasCobradas/calc.total)*100) : 0;`
- Línea 12898: `const sem2 = (v,meta,alto=true) => {`
- Línea 12900: `const ok=alto?v>=meta:v<=meta, warn=alto?v>=meta*.8:v<=meta*1.2;`
- Línea 12972: `const ok   = altoEsMejor ? val >= meta   : val <= meta;`
- Línea 12973: `const warn = altoEsMejor ? val >= meta * 0.8 : val <= meta * 1.25;`
- Línea 13097: `const meta = document.getElementById('emPM_' + kpi);`
- Línea 13196: `const colorNPS  = npsOk ? (stats.nps >= META_NPS ? 'var(--ok)' : stats.nps >= 70 ? '#f59e0b' : '#ef4444') : 'var(--muted)';`
- Línea 13197: `const colorEnc  = stats.encuestas >= META_ENCUESTAS ? 'var(--ok)' : '#f59e0b';`
- Línea 13288: `const el = document.getElementById('presupuestoBody');`
- Línea 13290: `const costos = getCostosEstructura();`
- Línea 13291: `const calc   = calcTotalCostos(costos);`
- Línea 13469: `const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;`
- Línea 13480: `const calc  = calcTotalCostos(c);`
- Línea 13494: `const ta = document.getElementById('pm_ticket_avg');`
- Línea 13495: `const sc = document.getElementById('pm_sess_calc');`
- Línea 13501: `const g = id => parseFloat(document.getElementById('pm_' + id)?.value) || 0;`
- Línea 13502: `const costos = {`
- Línea 13512: `const calc = calcTotalCostos(costos);`
- Línea 13516: `const inputMeta = parseInt(document.getElementById('pm_kpi_ventas_mes')?.value) || 0;`
- Línea 13531: `const g   = id => parseInt(document.getElementById('pm_' + id)?.value) || 0;`
- Línea 13852: `const meta = getMeta();`
- Línea 13854: `const proyEl = document.getElementById('metricProyeccion');`
- Línea 13859: `const pctMeta = Math.min(Math.round(cobradoMes / meta * 100), 100);`
- Línea 13864: `const pctRitmo = Math.min(Math.round(ritmo / meta * 100), 120);`
- Línea 13865: `const colorMeta = pctMeta >= 100 ? 'var(--ok)' : pctMeta >= 60 ? 'var(--warn)' : '#ef4444';`
- Línea 14563: `const meta = getMeta();`
- Línea 14802: `const pctMeta = Math.round(totalMes/meta*100);`
- Línea 15871: `const contenidoOk  = leadsActual >= cfg.contenido_leads_meta;`
- Línea 15880: `const equipoOk  = npsActual !== null && npsActual >= cfg.equipo_nps_meta;`
- Línea 15970: `const metaLabel = `≥${cfg.contenido_leads_meta} leads`;`
