(function (global) {
'use strict';

let _voiceActive  = false;

let _voiceRec     = null;

let _voiceGotResult = false;

const VOICE_ICON = '🎙️ Dictar cita por voz';

const VOICE_STOP = '⏹ Detener escucha';

function _getSR() { return window.SpeechRecognition || window.webkitSpeechRecognition || null; }

function _voiceBtn()      { return document.getElementById('voiceBtn'); }

function _voiceStatusEl() { return document.getElementById('voiceStatus'); }

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

global.PanelVoiceAssistant = Object.freeze({
    _getSR,
    _voiceBtn,
    _voiceStatusEl,
    toggleVoicePanel,
    procesarVozTexto,
    toggleVoice,
    _startVoice,
    _stopVoice,
    _norm,
    _parseVoice
  });
})(typeof window !== 'undefined' ? window : globalThis);
