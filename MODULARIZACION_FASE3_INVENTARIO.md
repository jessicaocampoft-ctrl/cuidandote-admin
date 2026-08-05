# Inventario de inicio de sesión y sesiones — Fase 3

Archivo: `index.html`

- Funciones de sesión detectadas: 13
- Accesos a storage detectados: 37
- Referencias a tokens/usuarios detectadas: 105
- Eventos de ciclo de vida detectados: 18
- Temporizadores detectados: 62

## Funciones relacionadas con sesión

### showOnlyScreen — línea 6257

```javascript
function showOnlyScreen(screenId) {
  ['loginScreen','adminApp','proLoginScreen','proApp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === screenId ? (id === 'adminApp' ? 'block' : 'flex') : 'none';
  });
  if (screenId === 'proApp') document.getElementById('proApp').style.display = 'block';
  if (screenId === 'proLoginScreen') document.getElementById('proLoginScreen').style.display = 'block';
}
```

### doLogin — línea 7301

```javascript
async function doLogin() {
  const ahora = Date.now();
  if (_loginLockedUntil > ahora) {
    const segs = Math.ceil((_loginLockedUntil - ahora) / 1000);
    const errEl = document.getElementById('loginErr');
    errEl.textContent = `Demasiados intentos. Espera ${segs} segundo${segs !== 1 ? 's' : ''}.`;
    errEl.style.display = 'block';
    return;
  }
  const pw  = document.getElementById('pwInput').value.trim();
  const user = (document.getElementById('userInput')?.value || '').trim();
  const btn = document.getElementById('loginBtn');
  if (!pw) return;
  btn.textContent = 'Verificando...'; btn.disabled = true;
  try {
    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'adminLogin', user, password: pw})
    }, 45000);
    if (d.ok) {
      _loginAttempts = 0;
      TOKEN = d.sessionToken;
      sessionStorage.setItem('adminToken', d.sessionToken);
      _loginTime = Date.now();
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminApp').style.display   = 'block';
      allData = d;
      await loadAdminKV();
      await loadTeamData();
      reloadMetas();
      _initSidebarState();
      initDashboard();
      await _runUrlRepairIfRequested();
    } else {
      _loginAttempts++;
      const errEl = document.getElementById('loginErr');
      if (_loginAttempts >= 5) {
        _loginLockedUntil = Date.now() + 120000;
        _loginAttempts = 0;
        errEl.textContent = 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.';
      } else {
        const restantes = 5 - _loginAttempts;
        errEl.textContent = `Contraseña incorrecta. Intentos restantes: ${restantes}`;
      }
      errEl.style.display = 'block';
    }
  } catch(e) {
    document.getElementById('loginErr').textContent = e.message || 'Error de conexión. Revisa tu internet.';
    document.getElementById('loginErr').style.display = 'block';
  }
  btn.textContent = 'Ingresar'; btn.disabled = false;
}
```

### logout — línea 7354

```javascript
function logout() {
  sessionStorage.removeItem('adminToken');
  location.reload();
}
```

### openProfessionalLoginMode — línea 7130

```javascript
function openProfessionalLoginMode() {
  location.hash = '/profesionales/login';
  showOnlyScreen('proLoginScreen');
  document.getElementById('proLoginErr').style.display = 'none';
}
```

### backToAdminLogin — línea 7136

```javascript
function backToAdminLogin() {
  location.hash = '';
  showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
}
```

### doProfessionalLogin — línea 7141

```javascript
async function doProfessionalLogin() {
  const btn = document.getElementById('proLoginBtn');
  const err = document.getElementById('proLoginErr');
  err.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Verificando...';
  try {
    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method:'POST',
      body:JSON.stringify({
        action:'professionalLogin',
        user:document.getElementById('proUser').value.trim(),
        password:document.getElementById('proPass').value
      })
    }, 45000);
    if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
    PROFESSIONAL_TOKEN = d.professionalToken;
    professionalSession = d.professional;
    sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
    if (professionalSession.debeCambiarPassword) {
      document.getElementById('proFirstChangeBox').style.display = 'block';
      toast('Cambia la contraseña temporal para continuar');
    } else {
      await showProfessionalApp();
    }
  } catch(e) {
    err.textContent = e.message || 'Error de acceso';
    err.style.display = 'block';
  } finally {
    btn.disabled = false; btn.textContent = 'Ingresar al portal';
  }
}
```

### changeProfessionalPassword — línea 7173

```javascript
async function changeProfessionalPassword() {
  const currentPassword = document.getElementById('proPass').value;
  const newPassword = document.getElementById('proNewPass').value;
  const d = await fetch(APPS_SCRIPT_URL, {
    method:'POST',
    body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
  }).then(r => r.json());
  if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
  toast('Contraseña actualizada');
  document.getElementById('proFirstChangeBox').style.display = 'none';
  await showProfessionalApp();
}
```

### showProfessionalApp — línea 7186

```javascript
async function showProfessionalApp() {
  location.hash = '/profesionales/agenda';
  showOnlyScreen('proApp');
  document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
  document.getElementById('proDate').value = today();
  await loadProfessionalAgenda();
}
```

### teamIsInactiveAppointment — línea 6329

```javascript
function teamIsInactiveAppointment(c) {
  return ['Cancelada','Cancelada a tiempo','Cancelación tardía','Reprogramada','No asistió','Reembolsada'].includes(c?.estado || '');
}
```

### regenerarTokenPasaporte — línea 18868

```javascript
async function regenerarTokenPasaporte() {
  if (!_pasCurrent || !_pasCurrent.id) return;
  if (!confirm('¿Regenerar el enlace? El anterior dejará de funcionar.')) return;
  const data = await fetch(APPS_SCRIPT_URL + '?action=passportRegenerateToken&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
  if (!data.ok) { toast(data.error || 'No se pudo regenerar', 'error'); return; }
  _pasCurrent = data.passport;
  generarLinkPasaporte();
  toast('Token regenerado. El enlace anterior quedó inválido.', 'success');
}
```

### cargarInactivos — línea 19954

```javascript
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
```

### renderInactivos — línea 20037

```javascript
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
```

### _recInactivoCard — línea 20081

```javascript
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

// ── CAMPAÑA DE REFERIDOS DEL MES ──
// ── helpers de estado por paciente (persisten en localStorage) ──
function _refKey(mesStr, anio, nombre) {
  return `refCamp_${mesStr}${anio}_${(nombre||'').toLowerCase().trim().replace(/\s+/g,'_')}`;
}
function _refGetEstado(mesStr, anio, nombre) {
  return kvGet(_refKey(mesStr, anio, nombre)) || 'pendiente';
}
function _refSetEstado(mesStr, anio, nombre, estado) {
  kvSet(_refKey(mesStr, anio, nombre), estado);
}

function marcarRefEstado(mesStr, anio, nombre, estado) {
  _refSetEstado(mesStr, anio, nombre, estado);
  cargarCampañaReferidos();
}

function cargarCampañaReferidos() {
  const panel = document.getElementById('refCampañaPanel');
  if (!panel) return;

  const now   = new Date();
  const mes   = now.getMonth();
  const anio  = now.getFullYear();
  const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const mesStr = MESES[mes];

  const citas = (allData.citas || []).filter(c => {
    if (!c.fecha || c.estado === 'Cancelada' || esRegistroServ(c.servicio)) return false;
    const [y, m] = c.fecha.split('-');
    return +y === anio && +m === (mes + 1);
  });

  const vistos = {};
  const pacientes = [];
  citas.forEach(c => {
    const key = (c.nombre || '').toLowerCase().trim();
    if (!key || vistos[key]) return;
    vistos[key] = true;
    pacientes.push({ nombre: c.nombre, telefono: c.telefono || '', servicio: c.servicio || '' });
  });

  if (!pacientes.length) {
    panel.innerHTML = '<div style="text-align:center;color:var(--muted);padding:30px;font-size:.88rem">No hay pacientes con sesiones registradas este mes</div>';
    return;
  }

  // Resumen de estados
  let nContactados = 0, nAgendo = 0, nNoAgendo = 0;
  pacientes.forEach(p => {
    const e = _refGetEstado(mesStr, anio, p.nombre);
    if (e === 'contactado' || e === 'agendo' || e === 'no_agendo') nContactados++;
    if (e === 'agendo')    nAgendo++;
    if (e === 'no_agendo') nNoAgendo++;
  });
  const nPendientes = pacientes.length - nContactados;

  let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px;margin-bottom:16px">
    <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;font-weight:700;color:#8b5cf6;font-family:var(--font-h)">${pacientes.length}</div>
      <div style="font-size:.72rem;color:#7c3aed;margin-top:2px">Total este mes</div>
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;font-weight:700;color:#16a34a;font-family:var(--font-h)">${nAgendo}</div>
      <div style="font-size:.72rem;color:#15803d;margin-top:2px">Agendaron</div>
    </div>
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;font-weight:700;color:#dc2626;font-family:var(--font-h)">${nNoAgendo}</div>
      <div style="font-size:.72rem;color:#b91c1c;margin-top:2px">No agendaron</div>
    </div>
    <div style="background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;font-weight:700;color:var(--muted);font-family:var(--font-h)">${nPendientes}</div>
      <div style="font-size:.72rem;color:var(--muted);margin-top:2px">Sin contactar</div>
    </div>
  </div>`;

  html += '<div style="display:flex;flex-direction:column;gap:8px">';

  pacientes.forEach(p => {
    const estado    = _refGetEstado(mesStr, anio, p.nombre);
    const iniciales = p.nombre.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const num       = Math.abs(p.nombre.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 900 + 100;
    const codigo    = `REF-${mesStr}-${iniciales}${num}`;
    const tel       = (p.telefono || '').replace(/\D/g, '');
    const phone     = tel.length <= 10 && tel.length >= 7 ? '57' + tel : tel;
    const nombre1   = p.nombre.split(' ')[0];
    const nombreEsc = p.nombre.replace(/'/g, "\\'");

    const msg = encodeURIComponent(
      `Hola ${nombre1}! 💙 Gracias por confiar en Cuidándote Fisioterapia.\n\n` +
      `Como uno de nuestros pacientes especiales, tienes un código de referido personal: *${codigo}*\n\n` +
      `Compártelo con un amigo o familiar que necesite fisioterapia — cuando agenda mencionando tu código, ` +
      `recibe un beneficio especial en su primera sesión.\n\n` +
      `¡Gracias por recomendarnos! 🙏`
    );
    const waUrl = phone.length >= 9 ? `https://wa.me/${phone}?text=${msg}` : '';

    // Colores y chip según estado
    let borderColor = 'var(--border)', bgColor = 'var(--bg)', chipHtml = '';
    if (estado === 'agendo') {
      borderColor = '#86efac'; bgColor = '#f0fdf4';
      chipHtml = '<span style="font-size:.7rem;font-family:var(--font-m);background:#dcfce7;color:#16a34a;border:1px solid #86efac;border-radius:20px;padding:2px 8px;white-space:nowrap">✓ Agendó</span>';
    } else if (estado === 'no_agendo') {
      borderColor = '#fca5a5'; bgColor = '#fef2f2';
      chipHtml = '<span style="font-size:.7rem;font-family:var(--font-m);background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;border-radius:20px;padding:2px 8px;white-space:nowrap">✗ No agendó</span>';
    } else if (estado === 'contactado') {
      borderColor = '#93c5fd'; bgColor = '#eff6ff';
      chipHtml = '<span style="font-size:.7rem;font-family:var(--font-m);background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;border-radius:20px;padding:2px 8px;white-space:nowrap">Enviado · esperando</span>';
    }

    // Botones según estado actual
    let botonesHtml = '';
    if (estado === 'pendiente') {
      botonesHtml = waUrl
        ? `<a href="${waUrl}" target="_blank" onclick="setTimeout(()=>marcarRefEstado('${mesStr}',${anio},'${nombreEsc}','contactado'),1000)" style="padding:6px 14px;background:#8b5cf6;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:.75rem;font-family:var(--font-b);text-decoration:none;white-space:nowrap">Enviar WA</a>`
        : `<span style="font-size:.72rem;color:var(--muted)">Sin tel.</span>`;
    } else if (estado === 'contactado') {
      botonesHtml = `
        <button onclick="marcarRefEstado('${mesStr}',${anio},'${nombreEsc}','agendo')" style="padding:6px 12px;background:#16a34a;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:.75rem;font-family:var(--font-b);white-space:nowrap">✓ Agendó</button>
        <button onclick="marcarRefEstado('${mesStr}',${anio},'${nombreEsc}','no_agendo')" style="padding:6px 12px;background:#dc2626;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:.75rem;font-family:var(--font-b);white-space:nowrap">✗ No agendó</button>`;
    } else {
      // agendo o no_agendo → permitir reenviar o revertir
      botonesHtml = `<button onclick="marcarRefEstado('${mesStr}',${anio},'${nombreEsc}','pendiente')" style="padding:6px 10px;background:transparent;color:var(--muted);border:1px solid var(--border);border-radius:7px;cursor:pointer;font-size:.72rem;font-family:var(--font-b);white-space:nowrap">Resetear</button>`;
    }

    html += `<div style="background:${bgColor};border:1px solid ${borderColor};border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;transition:background .2s">
      <div style="width:36px;height:36px;border-radius:50%;background:#8b5cf6;color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-h);font-weight:700;font-size:.85rem;flex-shrink:0">${p.nombre.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="font-weight:700;font-size:.88rem;color:var(--text)">${p.nombre}</span>
          ${chipHtml}
        </div>
        <div style="font-size:.75rem;color:var(--muted);margin-top:1px">${p.servicio}</div>
        <div style="font-size:.75rem;font-weight:600;color:#8b5cf6;margin-top:2px;font-family:var(--font-m)">${codigo}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;flex-wrap:wrap">
        ${botonesHtml}
      </div>
    </div>`;
  }
```

## Uso de sessionStorage y localStorage

### Coincidencia 1 — línea 16

```javascript
12:     location.replace('/');
13:   }
14: })();
15: </script>
16: <script>if(localStorage.getItem('adminDarkMode')==='dark')document.documentElement.setAttribute('data-theme','dark');</script>
17: <title>Admin — Cuidándote Fisioterapia</title>
18: <link rel="icon" href="LogoCuidandote/favicon.png">
19: <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
20: <style>
```

### Coincidencia 2 — línea 6157

```javascript
6153:   try {
6154:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getAdminKV&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
6155:     if (r.ok && r.kv) {
6156:       _gasKV = r.kv;
6157:       Object.entries(r.kv).forEach(([k, v]) => localStorage.setItem(k, v));
6158:     }
6159:   } catch(e) {}
6160: }
6161: 
```

### Coincidencia 3 — línea 6164

```javascript
6160: }
6161: 
6162: function kvGet(key) {
6163:   const v = _gasKV[key];
6164:   return (v !== undefined && v !== null) ? v : localStorage.getItem(key);
6165: }
6166: 
6167: function kvSet(key, value) {
6168:   const s = String(value);
```

### Coincidencia 4 — línea 6170

```javascript
6166: 
6167: function kvSet(key, value) {
6168:   const s = String(value);
6169:   _gasKV[key] = s;
6170:   localStorage.setItem(key, s);
6171:   _kvDirty[key] = s;
6172:   clearTimeout(_kvFlushTimer);
6173:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6174: }
```

### Coincidencia 5 — línea 6178

```javascript
6174: }
6175: 
6176: function kvRemove(key) {
6177:   delete _gasKV[key];
6178:   localStorage.removeItem(key);
6179:   _kvDirty[key] = '__DELETE__';
6180:   clearTimeout(_kvFlushTimer);
6181:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6182: }
```

### Coincidencia 6 — línea 6205

```javascript
6201:   _kvDirty = {};
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
```

### Coincidencia 7 — línea 6206

```javascript
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
```

### Coincidencia 8 — línea 6210

```javascript
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
```

### Coincidencia 9 — línea 7158

```javascript
7154:     }, 45000);
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
7161:       toast('Cambia la contraseña temporal para continuar');
7162:     } else {
```

### Coincidencia 10 — línea 7198

```javascript
7194: async function loadProfessionalAgenda() {
7195:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
7199:     PROFESSIONAL_TOKEN = '';
7200:     toast(d.error || 'Sesión vencida', 'err');
7201:     return openProfessionalLoginMode();
7202:   }
```

### Coincidencia 11 — línea 7286

```javascript
7282:   else toast(d.error || 'No se pudo enviar', 'err');
7283: }
7284: 
7285: function professionalSignout() {
7286:   sessionStorage.removeItem('professionalToken');
7287:   PROFESSIONAL_TOKEN = '';
7288:   professionalSession = null;
7289:   professionalAgenda = [];
7290:   openProfessionalLoginMode();
```

### Coincidencia 12 — línea 7323

```javascript
7319:     }, 45000);
7320:     if (d.ok) {
7321:       _loginAttempts = 0;
7322:       TOKEN = d.sessionToken;
7323:       sessionStorage.setItem('adminToken', d.sessionToken);
7324:       _loginTime = Date.now();
7325:       document.getElementById('loginScreen').style.display = 'none';
7326:       document.getElementById('adminApp').style.display   = 'block';
7327:       allData = d;
```

### Coincidencia 13 — línea 7355

```javascript
7351:   btn.textContent = 'Ingresar'; btn.disabled = false;
7352: }
7353: 
7354: function logout() {
7355:   sessionStorage.removeItem('adminToken');
7356:   location.reload();
7357: }
7358: 
7359: // ── TIMEOUT DE INACTIVIDAD (30 min) ──
```

### Coincidencia 14 — línea 7415

```javascript
7411:         await _runUrlRepairIfRequested();
7412:           return;
7413:       }
7414:     } catch(e) {}
7415:     sessionStorage.removeItem('adminToken');
7416:   }
7417: });
7418: 
7419: async function _runUrlRepairIfRequested() {
```

### Coincidencia 15 — línea 7559

```javascript
7555: 
7556: // ── EVAL EXPRESS ──
7557: function openEvalExpress() {
7558:   // Token via sessionStorage, nunca en la URL (evita historial/logs)
7559:   sessionStorage.setItem('evalToken', TOKEN);
7560:   window.open('evaluacion-express.html', '_blank');
7561: }
7562: 
7563: // ── SIDEBAR / NAV ──
```

### Coincidencia 16 — línea 7831

```javascript
7827:   const improves = variation === null ? null : (lowerIsBetter ? variation <= 0 : variation >= 0);
7828:   varEl.style.color=improves===null?'var(--muted)':improves?'var(--ok)':'var(--err)';
7829:   const values=points.map(p=>p.value||0),max=Math.max(...values,1);
7830:   document.getElementById('kpiTrend').innerHTML=points.map(p=>`<div class="kpi-trend-col"><span class="kpi-trend-val">${p.value===null?'—':_formatKPIValue(p.value,cfg.type)}</span><div class="kpi-trend-bar" style="height:${p.value===null?2:Math.max(4,Math.round(p.value/max*105))}px"></div><span class="kpi-trend-label">${p.label}</span></div>`).join('');
7831:   document.getElementById('kpiNote').value=localStorage.getItem('kpiNote_'+id)||'';
7832:   const action=document.getElementById('kpiActionBtn');action.textContent=cfg.actionLabel;action.onclick=()=>{closeKPIExplorer();showView(cfg.action)};
7833:   document.getElementById('kpiExplainBtn').onclick=()=>{closeKPIExplorer();scrollToKPICard(id)};
7834:   const modal=document.getElementById('kpiExplorer');modal.classList.add('open');
7835:   setTimeout(()=>modal.querySelector('.kpi-close').focus(),20);
```

### Coincidencia 17 — línea 7839

```javascript
7835:   setTimeout(()=>modal.querySelector('.kpi-close').focus(),20);
7836: }
7837: 
7838: function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
7839: function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
7840: function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
7841: function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}
7842: 
7843: 
```

### Coincidencia 18 — línea 7840

```javascript
7836: }
7837: 
7838: function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
7839: function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
7840: function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
7841: function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}
7842: 
7843: 
7844: function currentAdminRoleKey() {
```

### Coincidencia 19 — línea 7840

```javascript
7836: }
7837: 
7838: function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
7839: function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
7840: function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
7841: function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}
7842: 
7843: 
7844: function currentAdminRoleKey() {
```

### Coincidencia 20 — línea 7841

```javascript
7837: 
7838: function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
7839: function saveKPINote(){if(!_activeKPIExplorer)return;localStorage.setItem('kpiNote_'+_activeKPIExplorer,document.getElementById('kpiNote').value.trim());toast('Nota del indicador guardada')}
7840: function toggleKPIFavorite(e,id){e.stopPropagation();const fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]');const ix=fav.indexOf(id);if(ix>=0)fav.splice(ix,1);else fav.push(id);localStorage.setItem('kpiFavorites',JSON.stringify(fav));applyKPIFavorites()}
7841: function applyKPIFavorites(){let fav=[];try{fav=JSON.parse(localStorage.getItem('kpiFavorites')||'[]')}catch(e){}document.querySelectorAll('.kpi-live-card').forEach(c=>{const on=fav.includes(c.dataset.kpi);c.classList.toggle('is-favorite',on);const b=c.querySelector('.kpi-fav-btn');if(b){b.classList.toggle('active',on);b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'Quitar de favoritos':'Agregar a favoritos')}})}
7842: 
7843: 
7844: function currentAdminRoleKey() {
7845:   return String(currentAdminUser?.rol || 'Superadministradora').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
```

### Coincidencia 21 — línea 7943

```javascript
7939: }
7940: 
7941: // ── LISTA DE ESPERA (sincronizada con Google Sheets; fallback local) ──
7942: function _getWaitList() {
7943:   try { return JSON.parse(localStorage.getItem('adminWaitList') || '[]'); }
7944:   catch(e) { return []; }
7945: }
7946: function _saveWaitList(list) { localStorage.setItem('adminWaitList', JSON.stringify(list)); }
7947: let _waitLoaded = false;
```

### Coincidencia 22 — línea 7946

```javascript
7942: function _getWaitList() {
7943:   try { return JSON.parse(localStorage.getItem('adminWaitList') || '[]'); }
7944:   catch(e) { return []; }
7945: }
7946: function _saveWaitList(list) { localStorage.setItem('adminWaitList', JSON.stringify(list)); }
7947: let _waitLoaded = false;
7948: 
7949: async function _syncWaitList() {
7950:   try {
```

### Coincidencia 23 — línea 8077

```javascript
8073:   const sb   = document.getElementById('sidebar');
8074:   const main = document.getElementById('mainContent');
8075:   sb.classList.toggle('sb-collapsed');
8076:   main.classList.toggle('sb-collapsed-content');
8077:   localStorage.setItem('sbCollapsed', sb.classList.contains('sb-collapsed') ? '1' : '0');
8078: }
8079: 
8080: function _initSidebarState() {
8081:   if (localStorage.getItem('sbCollapsed') === '1') {
```

### Coincidencia 24 — línea 8081

```javascript
8077:   localStorage.setItem('sbCollapsed', sb.classList.contains('sb-collapsed') ? '1' : '0');
8078: }
8079: 
8080: function _initSidebarState() {
8081:   if (localStorage.getItem('sbCollapsed') === '1') {
8082:     document.getElementById('sidebar').classList.add('sb-collapsed');
8083:     document.getElementById('mainContent').classList.add('sb-collapsed-content');
8084:   }
8085: }
```

### Coincidencia 25 — línea 9673

```javascript
9669: 
9670: function clearFilters() {
9671:   ['fSearch','fDesde','fHasta'].forEach(id => document.getElementById(id).value='');
9672:   ['fStatus','fMod','fService'].forEach(id => document.getElementById(id).selectedIndex=0);
9673:   sessionStorage.removeItem('agendaFilters');
9674:   renderAgenda();
9675: }
9676: 
9677: function filtrarHoy() {
```

### Coincidencia 26 — línea 10666

```javascript
10662:     document.getElementById('fHasta').value  = '';
10663:     document.getElementById('fStatus').selectedIndex  = 0;
10664:     document.getElementById('fMod').selectedIndex     = 0;
10665:     document.getElementById('fService').selectedIndex = 0;
10666:     sessionStorage.removeItem('agendaFilters');
10667:     showView('agenda');
10668:   } catch(e) { toast('Error de conexión', 'err'); }
10669:   finally { btn.textContent = 'Crear evento'; btn.disabled = false; }
10670: }
```

### Coincidencia 27 — línea 10898

```javascript
10894:     document.getElementById('fHasta').value  = '';
10895:     document.getElementById('fStatus').selectedIndex  = 0;
10896:     document.getElementById('fMod').selectedIndex     = 0;
10897:     document.getElementById('fService').selectedIndex = 0;
10898:     sessionStorage.removeItem('agendaFilters');
10899:     showView('agenda');
10900:   } catch(e) { toast('Error de conexión','err'); }
10901:   finally {
10902:     _submittingBooking = false;
```

### Coincidencia 28 — línea 12708

```javascript
12704: function toggleDarkMode() {
12705:   const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
12706:   const next = isDark ? '' : 'dark';
12707:   document.documentElement.setAttribute('data-theme', next);
12708:   localStorage.setItem('adminDarkMode', next);
12709:   const txt = document.getElementById('darkModeTxt');
12710:   if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
12711: }
12712: // Sincronizar texto del botón al cargar
```

### Coincidencia 29 — línea 13895

```javascript
13891:     disponibilidadPros,
13892:     pagosPendientesLista,
13893:     reactivar,
13894:     candidatosPaquete,
13895:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13896:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13897:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13898:   };
13899: }
```

### Coincidencia 30 — línea 13896

```javascript
13892:     pagosPendientesLista,
13893:     reactivar,
13894:     candidatosPaquete,
13895:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13896:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13897:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13898:   };
13899: }
13900: 
```

### Coincidencia 31 — línea 13897

```javascript
13893:     reactivar,
13894:     candidatosPaquete,
13895:     estrategiasEjecutadas: localStorage.getItem('gestion_estrategias_mes') || 'Sin registrar',
13896:     resultadosObtenidos: localStorage.getItem('gestion_resultados_mes') || 'Sin registrar',
13897:     observaciones: localStorage.getItem('gestion_observaciones_mes') || 'Sin registrar'
13898:   };
13899: }
13900: 
13901: function _copyGestionOcupacion(citasProgramadas, date) {
```

### Coincidencia 32 — línea 18966

```javascript
18962:   el.classList.toggle('open');
18963:   const id = el.getAttribute('data-help-id');
18964:   if (id) {
18965:     try {
18966:       localStorage.setItem('helpBanner_' + id, el.classList.contains('open') ? '1' : '0');
18967:     } catch(e) {}
18968:   }
18969: }
18970: 
```

### Coincidencia 33 — línea 18975

```javascript
18971: function restoreHelpBanners() {
18972:   document.querySelectorAll('.help-banner[data-help-id]').forEach(el => {
18973:     const id = el.getAttribute('data-help-id');
18974:     try {
18975:       const saved = localStorage.getItem('helpBanner_' + id);
18976:       // Abiertos por defecto la primera vez; cerrados si el usuario los cerró
18977:       if (saved === '0') el.classList.remove('open');
18978:       else el.classList.add('open');
18979:     } catch(e) {
```

### Coincidencia 34 — línea 19697

```javascript
19693: function gAutoGuardar(id) {
19694:   const el = document.getElementById(id);
19695:   if (!el) return;
19696:   gFitHeight(el);
19697:   localStorage.setItem('gMsg_' + id, el.value);
19698: }
19699: function gFitHeight(ta) {
19700:   ta.style.height = 'auto';
19701:   ta.style.height = ta.scrollHeight + 'px';
```

### Coincidencia 35 — línea 19705

```javascript
19701:   ta.style.height = ta.scrollHeight + 'px';
19702: }
19703: function gCargarGuardados() {
19704:   document.querySelectorAll('textarea[id^="gMsg-"]').forEach(el => {
19705:     const saved = localStorage.getItem('gMsg_' + el.id);
19706:     if (saved !== null) el.value = saved;
19707:     gFitHeight(el);
19708:   });
19709: }
```

### Coincidencia 36 — línea 19756

```javascript
19752: const REC_KEY = 'recuperaciones_v1';
19753: const REC_PCT = 0.05;
19754: 
19755: function _loadRec() {
19756:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19757: }
19758: function _saveRec(arr) {
19759:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19760: }
```

### Coincidencia 37 — línea 19759

```javascript
19755: function _loadRec() {
19756:   try { return JSON.parse(localStorage.getItem(REC_KEY) || '[]'); } catch(e) { return []; }
19757: }
19758: function _saveRec(arr) {
19759:   localStorage.setItem(REC_KEY, JSON.stringify(arr));
19760: }
19761: 
19762: function _fmtCLP(n) {
19763:   return '$' + Math.round(n).toLocaleString('es-CO');
```

## Referencias a tokens y usuarios

### Coincidencia 1 — línea 6154

```javascript
6151: 
6152: async function loadAdminKV() {
6153:   try {
6154:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getAdminKV&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
6155:     if (r.ok && r.kv) {
6156:       _gasKV = r.kv;
6157:       Object.entries(r.kv).forEach(([k, v]) => localStorage.setItem(k, v));
```

### Coincidencia 2 — línea 6190

```javascript
6187:   const batch = { ..._kvDirty };
6188:   _kvDirty = {};
6189:   try {
6190:     await fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`);
6191:   } catch(e) {
6192:     Object.assign(_kvDirty, batch);
6193:     _kvFlushTimer = setTimeout(_flushKV, 5000);
```

### Coincidencia 3 — línea 6202

```javascript
6199:   if (!Object.keys(_kvDirty).length) return;
6200:   const batch = { ..._kvDirty };
6201:   _kvDirty = {};
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
```

### Coincidencia 4 — línea 6205

```javascript
6202:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
```

### Coincidencia 5 — línea 6206

```javascript
6203: });
6204: 
6205: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6206: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
```

### Coincidencia 6 — línea 6210

```javascript
6207: let allData = {citas: [], bloqueos: [], eventos: []};
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
```

### Coincidencia 7 — línea 6211

```javascript
6208: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6209: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6210: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6211: let professionalSession = null;
6212: let professionalAgenda = [];
6213: let professionalMode = 'hoy';
6214: let _kpiViewMonth = null; // {m, y} o null = mes actual
```

### Coincidencia 8 — línea 6280

```javascript
6277: }
6278: 
6279: async function loadTeamData() {
6280:   if (!TOKEN) return teamData;
6281:   try {
6282:     const d = await fetch(`${APPS_SCRIPT_URL}?action=teamData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6283:     if (d.ok) {
```

### Coincidencia 9 — línea 6282

```javascript
6279: async function loadTeamData() {
6280:   if (!TOKEN) return teamData;
6281:   try {
6282:     const d = await fetch(`${APPS_SCRIPT_URL}?action=teamData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6283:     if (d.ok) {
6284:       teamData = {
6285:         profesionales: d.profesionales || [],
```

### Coincidencia 10 — línea 6616

```javascript
6613:     disponibilidad: document.getElementById('teamProDisponibilidad').value.trim(),
6614:     tarifasJSON: '{}'
6615:   };
6616:   const d = await fetch(`${APPS_SCRIPT_URL}?action=saveProfessional&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(payload))}`).then(r => r.json());
6617:   if (!d.ok) { toast(d.error || 'No se pudo guardar', 'err'); return; }
6618:   closeModal('modalProfesional');
6619:   await loadTeamData();
```

### Coincidencia 11 — línea 6627

```javascript
6624: 
6625: async function resetProPassword(id) {
6626:   if (!confirm('¿Restablecer la contraseña de este usuario?')) return;
6627:   const d = await fetch(`${APPS_SCRIPT_URL}?action=resetProfessionalPassword&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6628:   if (d.ok) showTemporaryPassword('Nueva contraseña temporal', d.tempPassword);
6629:   else toast(d.error || 'No se pudo restablecer', 'err');
6630: }
```

### Coincidencia 12 — línea 6633

```javascript
6630: }
6631: 
6632: async function togglePro(id, estado) {
6633:   const d = await fetch(`${APPS_SCRIPT_URL}?action=toggleProfessional&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(estado)}`).then(r => r.json());
6634:   if (d.ok) { await loadTeamData(); renderEquipo(); toast('Estado actualizado'); }
6635:   else toast(d.error || 'No se pudo actualizar', 'err');
6636: }
```

### Coincidencia 13 — línea 6641

```javascript
6638: async function deletePro(id, nombre) {
6639:   const label = nombre || 'este fisioterapeuta';
6640:   if (!confirm(`¿Eliminar a ${label} de la lista de fisioterapeutas?\n\nNo podrá ingresar al portal. El historial interno se conserva para auditoría.`)) return;
6641:   const d = await fetch(`${APPS_SCRIPT_URL}?action=deleteProfessional&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6642:   if (d.ok) {
6643:     await loadTeamData();
6644:     renderEquipo();
```

### Coincidencia 14 — línea 6698

```javascript
6695:   const { closeOnSuccess = true } = options;
6696:   const params = new URLSearchParams({
6697:     action:'assignProfessional',
6698:     token:TOKEN,
6699:     citaId:document.getElementById('assignCitaId').value,
6700:     profesionalId:document.getElementById('assignProfessionalId').value,
6701:     tarifa:'',
```

### Coincidencia 15 — línea 6722

```javascript
6719:   if (!assigned) return;
6720:   const params = new URLSearchParams({
6721:     action:'authorizeAppointment',
6722:     token:TOKEN,
6723:     citaId:document.getElementById('assignCitaId').value,
6724:     excepcion:document.getElementById('assignExcepcion').value
6725:   });
```

### Coincidencia 16 — línea 6738

```javascript
6735: 
6736: async function markPayablePaid(id) {
6737:   if (!confirm('¿Marcar esta cuenta como pagada?')) return;
6738:   const d = await fetch(`${APPS_SCRIPT_URL}?action=markPayablePaid&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r => r.json());
6739:   if (d.ok) { await loadTeamData(); renderEquipo(); toast('Cuenta marcada como pagada'); }
6740:   else toast(d.error || 'No se pudo actualizar', 'err');
6741: }
```

### Coincidencia 17 — línea 6744

```javascript
6741: }
6742: 
6743: async function loadOperationsData() {
6744:   if (!TOKEN) return operationsData;
6745:   try {
6746:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6747:     if (d.ok) operationsData = d;
```

### Coincidencia 18 — línea 6746

```javascript
6743: async function loadOperationsData() {
6744:   if (!TOKEN) return operationsData;
6745:   try {
6746:     const d = await fetch(`${APPS_SCRIPT_URL}?action=operationsData&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6747:     if (d.ok) operationsData = d;
6748:   } catch(e) {
6749:     console.warn('No se pudo cargar Pagos', e);
```

### Coincidencia 19 — línea 6755

```javascript
6752: }
6753: 
6754: async function setupOperationsModuleUI() {
6755:   const d = await fetch(`${APPS_SCRIPT_URL}?action=setupOperationsModule&token=${encodeURIComponent(TOKEN)}`).then(r => r.json());
6756:   if (d.ok) {
6757:     await loadOperationsData();
6758:     renderPagos();
```

### Coincidencia 20 — línea 6962

```javascript
6959: 
6960:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
6961:       method: 'POST',
6962:       body: JSON.stringify({ action: 'savePayment', token: TOKEN, data: payload })
6963:     }, 45000);
6964:     if (!d.ok) throw new Error(d.error || 'No se pudo registrar el pago.');
6965:     if (!d.id) throw new Error('El pago se registró, pero el servidor no devolvió su identificador. Actualiza antes de intentarlo otra vez.');
```

### Coincidencia 21 — línea 6970

```javascript
6967:     if (mode === 'approve') {
6968:       const obs = observaciones || 'Pago confirmado desde registro de comprobante';
6969:       const verifyUrl = APPS_SCRIPT_URL
6970:         + '?action=verifyPayment&token=' + encodeURIComponent(TOKEN)
6971:         + '&id=' + encodeURIComponent(d.id)
6972:         + '&estado=PAGO_APROBADO&observaciones=' + encodeURIComponent(obs);
6973:       const v = await fetchJsonWithTimeout(verifyUrl, {}, 45000);
```

### Coincidencia 22 — línea 7017

```javascript
7014:   const label = status === 'Aprobado' ? 'aprobar este pago y autorizar la cita' : `marcar este pago como ${status}`;
7015:   if (!confirm(`¿Confirmas ${label}?`)) return;
7016:   const obs = prompt('Observación opcional para auditoría:', '') || '';
7017:   const d = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&estado=${encodeURIComponent(status)}&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
7018:   if (d.ok) {
7019:     toast(status === 'Aprobado' ? 'Pago aprobado y cita autorizada' : 'Pago actualizado');
7020:     await reload();
```

### Coincidencia 23 — línea 7138

```javascript
7135: 
7136: function backToAdminLogin() {
7137:   location.hash = '';
7138:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7139: }
7140: 
7141: async function doProfessionalLogin() {
```

### Coincidencia 24 — línea 7156

```javascript
7153:       })
7154:     }, 45000);
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
```

### Coincidencia 25 — línea 7157

```javascript
7154:     }, 45000);
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
```

### Coincidencia 26 — línea 7158

```javascript
7155:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
7161:       toast('Cambia la contraseña temporal para continuar');
```

### Coincidencia 27 — línea 7159

```javascript
7156:     PROFESSIONAL_TOKEN = d.professionalToken;
7157:     professionalSession = d.professional;
7158:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7159:     if (professionalSession.debeCambiarPassword) {
7160:       document.getElementById('proFirstChangeBox').style.display = 'block';
7161:       toast('Cambia la contraseña temporal para continuar');
7162:     } else {
```

### Coincidencia 28 — línea 7178

```javascript
7175:   const newPassword = document.getElementById('proNewPass').value;
7176:   const d = await fetch(APPS_SCRIPT_URL, {
7177:     method:'POST',
7178:     body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
7179:   }).then(r => r.json());
7180:   if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
7181:   toast('Contraseña actualizada');
```

### Coincidencia 29 — línea 7189

```javascript
7186: async function showProfessionalApp() {
7187:   location.hash = '/profesionales/agenda';
7188:   showOnlyScreen('proApp');
7189:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7190:   document.getElementById('proDate').value = today();
7191:   await loadProfessionalAgenda();
7192: }
```

### Coincidencia 30 — línea 7189

```javascript
7186: async function showProfessionalApp() {
7187:   location.hash = '/profesionales/agenda';
7188:   showOnlyScreen('proApp');
7189:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7190:   document.getElementById('proDate').value = today();
7191:   await loadProfessionalAgenda();
7192: }
```

### Coincidencia 31 — línea 7189

```javascript
7186: async function showProfessionalApp() {
7187:   location.hash = '/profesionales/agenda';
7188:   showOnlyScreen('proApp');
7189:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7190:   document.getElementById('proDate').value = today();
7191:   await loadProfessionalAgenda();
7192: }
```

### Coincidencia 32 — línea 7195

```javascript
7192: }
7193: 
7194: async function loadProfessionalAgenda() {
7195:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
```

### Coincidencia 33 — línea 7196

```javascript
7193: 
7194: async function loadProfessionalAgenda() {
7195:   if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
7199:     PROFESSIONAL_TOKEN = '';
```

### Coincidencia 34 — línea 7199

```javascript
7196:   const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
7197:   if (!d.ok) {
7198:     sessionStorage.removeItem('professionalToken');
7199:     PROFESSIONAL_TOKEN = '';
7200:     toast(d.error || 'Sesión vencida', 'err');
7201:     return openProfessionalLoginMode();
7202:   }
```

### Coincidencia 35 — línea 7203

```javascript
7200:     toast(d.error || 'Sesión vencida', 'err');
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
```

### Coincidencia 36 — línea 7204

```javascript
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
7207: }
```

### Coincidencia 37 — línea 7204

```javascript
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
7207: }
```

### Coincidencia 38 — línea 7204

```javascript
7201:     return openProfessionalLoginMode();
7202:   }
7203:   professionalSession = d.professional;
7204:   document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
7205:   professionalAgenda = d.citas || [];
7206:   renderProfessionalAgenda();
7207: }
```

### Coincidencia 39 — línea 7257

```javascript
7254:   if (!confirm('¿Confirmas que esta sesión ya fue atendida? Esta acción solo la puede revertir administración.')) return;
7255:   const d = await fetch(APPS_SCRIPT_URL, {
7256:     method:'POST',
7257:     body:JSON.stringify({action:'professionalMarkAttended', token:PROFESSIONAL_TOKEN, citaId})
7258:   }).then(r => r.json());
7259:   if (d.ok) { toast('Sesión marcada como atendida'); await loadProfessionalAgenda(); }
7260:   else toast(d.error || 'No se pudo marcar', 'err');
```

### Coincidencia 40 — línea 7275

```javascript
7272:     method:'POST',
7273:     body:JSON.stringify({
7274:       action:'professionalReportIssue',
7275:       token:PROFESSIONAL_TOKEN,
7276:       citaId:document.getElementById('proIssueCitaId').value,
7277:       tipo:document.getElementById('proIssueTipo').value,
7278:       observacion:document.getElementById('proIssueObs').value.trim()
```

### Coincidencia 41 — línea 7287

```javascript
7284: 
7285: function professionalSignout() {
7286:   sessionStorage.removeItem('professionalToken');
7287:   PROFESSIONAL_TOKEN = '';
7288:   professionalSession = null;
7289:   professionalAgenda = [];
7290:   openProfessionalLoginMode();
```

### Coincidencia 42 — línea 7288

```javascript
7285: function professionalSignout() {
7286:   sessionStorage.removeItem('professionalToken');
7287:   PROFESSIONAL_TOKEN = '';
7288:   professionalSession = null;
7289:   professionalAgenda = [];
7290:   openProfessionalLoginMode();
7291: }
```

### Coincidencia 43 — línea 7322

```javascript
7319:     }, 45000);
7320:     if (d.ok) {
7321:       _loginAttempts = 0;
7322:       TOKEN = d.sessionToken;
7323:       sessionStorage.setItem('adminToken', d.sessionToken);
7324:       _loginTime = Date.now();
7325:       document.getElementById('loginScreen').style.display = 'none';
```

### Coincidencia 44 — línea 7368

```javascript
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7370:     setTimeout(logout, 1500);
7371:   }
```

### Coincidencia 45 — línea 7377

```javascript
7374: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7375: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7376: document.addEventListener('visibilitychange', async () => {
7377:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
```

### Coincidencia 46 — línea 7379

```javascript
7376: document.addEventListener('visibilitychange', async () => {
7377:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
7381:       toast('Sesión expirada. Volviendo al login...', 'warn');
7382:       setTimeout(logout, 1500);
```

### Coincidencia 47 — línea 7392

```javascript
7389:   initAdminUX2026();
7390:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7391:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
7392:     if (PROFESSIONAL_TOKEN) await showProfessionalApp();
7393:     else openProfessionalLoginMode();
7394:     return;
7395:   }
```

### Coincidencia 48 — línea 7396

```javascript
7393:     else openProfessionalLoginMode();
7394:     return;
7395:   }
7396:   if (TOKEN) {
7397:     const btn = document.getElementById('loginBtn');
7398:     try {
7399:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
```

### Coincidencia 49 — línea 7399

```javascript
7396:   if (TOKEN) {
7397:     const btn = document.getElementById('loginBtn');
7398:     try {
7399:       const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
7400:       const d = await r.json();
7401:       if (d.ok) {
7402:         _loginTime = Date.now();
```

### Coincidencia 50 — línea 7421

```javascript
7418: 
7419: async function _runUrlRepairIfRequested() {
7420:   const params = new URLSearchParams(location.search);
7421:   if (params.get('repair') !== 'reschedule' || !TOKEN) return;
7422:   const nombre = params.get('nombre') || '';
7423:   const keepFecha = params.get('keepFecha') || '';
7424:   const keepHora = params.get('keepHora') || '';
```

### Coincidencia 51 — línea 7427

```javascript
7424:   const keepHora = params.get('keepHora') || '';
7425:   if (!nombre || !keepFecha || !keepHora) return;
7426:   try {
7427:     const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
7428:     const result = await fetch(url).then(r => r.json());
7429:     document.body.dataset.repairResult = JSON.stringify(result);
7430:     if (result.ok) {
```

### Coincidencia 52 — línea 7540

```javascript
7537:   try {
7538:     const r = await fetch(APPS_SCRIPT_URL, {
7539:       method: 'POST',
7540:       body: JSON.stringify({action: 'changePassword', token: TOKEN, currentPassword: actual, newPassword: nueva})
7541:     }).then(x => x.json());
7542:     if (r.ok) {
7543:       closeModal('modalCambiarPassword');
```

### Coincidencia 53 — línea 7559

```javascript
7556: // ── EVAL EXPRESS ──
7557: function openEvalExpress() {
7558:   // Token via sessionStorage, nunca en la URL (evita historial/logs)
7559:   sessionStorage.setItem('evalToken', TOKEN);
7560:   window.open('evaluacion-express.html', '_blank');
7561: }
7562: 
```

### Coincidencia 54 — línea 7797

```javascript
7794: 
7795: async function loadKPIHistoryFromServer() {
7796:   try {
7797:     const d=await fetch(`${APPS_SCRIPT_URL}?action=getKPIHistory&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7798:     if(d.ok){_kpiServerHistory={};(d.items||[]).forEach(x=>_kpiServerHistory[x.month]=x);}
7799:   } catch(e) {}
7800: }
```

### Coincidencia 55 — línea 7845

```javascript
7842: 
7843: 
7844: function currentAdminRoleKey() {
7845:   return String(currentAdminUser?.rol || 'Superadministradora').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
7846: }
7847: function isAuxAdmin() { return currentAdminRoleKey().includes('aux'); }
7848: function applyRoleRestrictions() {
```

### Coincidencia 56 — línea 7951

```javascript
7948: 
7949: async function _syncWaitList() {
7950:   try {
7951:     const d = await fetch(`${APPS_SCRIPT_URL}?action=getWaitlist&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
7952:     if (d.ok) { _saveWaitList(d.items || []); _waitLoaded = true; return true; }
7953:   } catch(e) {}
7954:   return false;
```

### Coincidencia 57 — línea 7965

```javascript
7962:   if (!nombre || !telefono) { toast('Nombre y teléfono son obligatorios','err'); return; }
7963:   const item = {id:'w'+Date.now(),nombre,telefono,servicio,preferencia,creado:new Date().toISOString()};
7964:   try {
7965:     const d = await fetch(`${APPS_SCRIPT_URL}?action=addWaitlist&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(item))}`).then(r=>r.json());
7966:     if (!d.ok) throw new Error(d.error||'No se pudo sincronizar');
7967:     item.id = d.id || item.id;
7968:   } catch(e) { toast('Guardado localmente; se sincronizará cuando actualices el servidor','warn'); }
```

### Coincidencia 58 — línea 7975

```javascript
7972: }
7973: 
7974: async function removeWaitPatient(id) {
7975:   try { await fetch(`${APPS_SCRIPT_URL}?action=removeWaitlist&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`).then(r=>r.json()); } catch(e) {}
7976:   _saveWaitList(_getWaitList().filter(p => p.id !== id));
7977:   renderWaitList(); toast('Paciente retirado de la lista');
7978: }
```

### Coincidencia 59 — línea 8011

```javascript
8008:   title.textContent='Consultando estado...';
8009:   try {
8010:     const [status,queue]=await Promise.all([
8011:       fetch(`${APPS_SCRIPT_URL}?action=automationStatus&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json()),
8012:       fetch(`${APPS_SCRIPT_URL}?action=automationQueue&status=pending&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json())
8013:     ]);
8014:     if(!status.ok)throw new Error(status.error||'Actualiza la implementación de Apps Script');
```

### Coincidencia 60 — línea 8012

```javascript
8009:   try {
8010:     const [status,queue]=await Promise.all([
8011:       fetch(`${APPS_SCRIPT_URL}?action=automationStatus&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json()),
8012:       fetch(`${APPS_SCRIPT_URL}?action=automationQueue&status=pending&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json())
8013:     ]);
8014:     if(!status.ok)throw new Error(status.error||'Actualiza la implementación de Apps Script');
8015:     document.getElementById('autoStatusDot').classList.toggle('on',!!status.active);
```

### Coincidencia 61 — línea 8031

```javascript
8028: async function saveAutomationSettings() {
8029:   const config={};document.querySelectorAll('[data-auto-key]').forEach(i=>config[i.dataset.autoKey]=i.checked);
8030:   try {
8031:     const d=await fetch(`${APPS_SCRIPT_URL}?action=automationSave&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(config))}`).then(r=>r.json());
8032:     if(!d.ok)throw new Error(d.error);toast('Configuración de automatizaciones guardada');
8033:   } catch(e){toast('No se pudo guardar: actualiza Apps Script','err')}
8034: }
```

### Coincidencia 62 — línea 8039

```javascript
8036: async function setupAutomations() {
8037:   try {
8038:     toast('Activando tareas programadas...');
8039:     const d=await fetch(`${APPS_SCRIPT_URL}?action=automationSetup&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
8040:     if(!d.ok)throw new Error(d.error);toast('Automatizaciones activadas');loadAutomationCenter();
8041:   } catch(e){toast('No se pudieron activar: '+(e.message||'revisa permisos'),'err')}
8042: }
```

### Coincidencia 63 — línea 8047

```javascript
8044: async function runAutomationJob(job) {
8045:   try {
8046:     toast('Ejecutando automatización...');
8047:     const d=await fetch(`${APPS_SCRIPT_URL}?action=automationRun&job=${encodeURIComponent(job)}&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());
8048:     if(!d.ok)throw new Error(d.error);toast('Automatización completada');loadAutomationCenter();
8049:   } catch(e){toast('Error al ejecutar: '+(e.message||'revisa el servidor'),'err')}
8050: }
```

### Coincidencia 64 — línea 8065

```javascript
8062: }
8063: 
8064: async function markAutomationMessage(id) {
8065:   setTimeout(async()=>{try{await fetch(`${APPS_SCRIPT_URL}?action=automationQueueDone&id=${encodeURIComponent(id)}&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());loadAutomationCenter()}catch(e){}},700);
8066: }
8067: 
8068: function toggleSidebar() {
```

### Coincidencia 65 — línea 8280

```javascript
8277:   const id = _pagoIdActivo;
8278:   cerrarModalPago();
8279:   try {
8280:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updatePago&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}&metodo=${encodeURIComponent(metodo)}`).then(x => x.json());
8281:     if (r.ok) {
8282:       const c = allData.citas.find(x => x.id === id);
8283:       if (c) c.pago = metodo;
```

### Coincidencia 66 — línea 8687

```javascript
8684:     document.getElementById('ncSubmitLabel').textContent = `Creando ${i+1}/${fechas.length}...`;
8685:     const data = { ...baseData, date: fechas[i].date, time: fechas[i].time };
8686:     try {
8687:       const r = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
8688:       const d = await r.json();
8689:       if (d.ok) creadas++; else errores++;
8690:     } catch(e) { errores++; }
```

### Coincidencia 67 — línea 8698

```javascript
8695:       const data2  = { ...duoData, date: fechas[i].date, time: time2 };
8696:       document.getElementById('ncSubmitLabel').textContent = `Creando turno 2/${fechas.length}...`;
8697:       try {
8698:         const r2 = await fetch(`${APPS_SCRIPT_URL}?action=adminBook&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data2))}`);
8699:         const d2 = await r2.json();
8700:         if (d2.ok) creadas++; else errores++;
8701:       } catch(e) { errores++; }
```

### Coincidencia 68 — línea 8739

```javascript
8736:     fecha, hora, precio: cita.precio, notas: cita.notas || ''
8737:   }));
8738:   try {
8739:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
8740:     const d = await r.json();
8741:     if (d.ok) {
8742:       logChange('Cita reagendada', `${cita.nombre} · ${cita.fecha} ${cita.hora} → ${fecha} ${hora}`);
```

### Coincidencia 69 — línea 8986

```javascript
8983: 
8984: async function reload() {
8985:   try {
8986:     const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
8987:     if (!r.ok) { toast('Error del servidor (' + r.status + '). Recarga la página.', 'err'); return; }
8988:     const d = await r.json();
8989:     if (d.ok) {
```

### Coincidencia 70 — línea 9744

```javascript
9741:   const nota = (paraQuien ? '[PARA: ' + paraQuien + ']' + (otrasNotas ? ' ' + otrasNotas : '') : otrasNotas);
9742:   try {
9743:     const data = encodeURIComponent(JSON.stringify({id, notaAdmin: nota}));
9744:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
9745:     const d = await r.json();
9746:     if (d.ok) {
9747:       const cita = allData.citas.find(c => c.id === id);
```

### Coincidencia 71 — línea 9756

```javascript
9753: 
9754: async function changeStatus(id, status) {
9755:   try {
9756:     const r = await fetch(`${APPS_SCRIPT_URL}?action=updateStatus&token=${encodeURIComponent(TOKEN)}&id=${id}&status=${status}`);
9757:     const d = await r.json();
9758:     if (d.ok) {
9759:       const cita = allData.citas.find(c => c.id === id);
```

### Coincidencia 72 — línea 9885

```javascript
9882:   btn.disabled = true; btn.textContent = 'Cancelando...';
9883: 
9884:   try {
9885:     const r = await fetch(`${APPS_SCRIPT_URL}?action=cancelBooking&token=${encodeURIComponent(TOKEN)}&id=${id}`);
9886:     const d = await r.json();
9887:     if (d.ok) {
9888:       const cita = allData.citas.find(c => c.id === id);
```

### Coincidencia 73 — línea 10030

```javascript
10027:   btn.textContent = 'Guardando...'; btn.disabled = true;
10028:   try {
10029:     const data = encodeURIComponent(JSON.stringify({id, servicio, modalidad, fecha, hora, precio, notas}));
10030:     const r = await fetch(`${APPS_SCRIPT_URL}?action=editBooking&token=${encodeURIComponent(TOKEN)}&data=${data}`);
10031:     const d = await r.json();
10032:     if (d.ok) {
10033:       if (anterior) logChange('Cita editada', `${anterior.nombre} · ${anterior.fecha} ${anterior.hora} → ${fecha} ${hora} · ${servicio}`);
```

### Coincidencia 74 — línea 10079

```javascript
10076:   if (!date||!start||!end) { toast('Completa fecha, hora inicio y fin','err'); return; }
10077:   if (start >= end) { toast('La hora de fin debe ser mayor al inicio','err'); return; }
10078:   try {
10079:     const r = await fetch(`${APPS_SCRIPT_URL}?action=block&token=${encodeURIComponent(TOKEN)}&date=${date}&startTime=${start}&endTime=${end}&reason=${encodeURIComponent(reason||'Bloqueado')}`);
10080:     const d = await r.json();
10081:     if (d.ok) {
10082:       allData.bloqueos.push({bid: d.bid||'', fecha:date, inicio:start, fin:end, motivo:reason||'Bloqueado'});
```

### Coincidencia 75 — línea 10093

```javascript
10090: 
10091: async function doUnblock(bid, date, startTime) {
10092:   try {
10093:     const r = await fetch(`${APPS_SCRIPT_URL}?action=unblock&token=${encodeURIComponent(TOKEN)}&bid=${encodeURIComponent(bid)}&date=${date}&startTime=${startTime}`);
10094:     const d = await r.json();
10095:     if (d.ok) {
10096:       allData.bloqueos = allData.bloqueos.filter(b => bid ? b.bid !== bid : !(b.fecha===date && b.inicio===startTime));
```

### Coincidencia 76 — línea 10653

```javascript
10650:   };
10651: 
10652:   try {
10653:     const r = await fetch(`${APPS_SCRIPT_URL}?action=crearEvento&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
10654:     const d = await r.json();
10655:     if (!d.ok) { toast('Error: ' + (d.error||''), 'err'); return; }
10656:     toast('Evento creado ✓');
```

### Coincidencia 77 — línea 10683

```javascript
10680: async function eliminarEvento(id) {
10681:   if (!confirm('¿Eliminar este evento?')) return;
10682:   try {
10683:     const r = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(id)}`);
10684:     const d = await r.json();
10685:     if (!d.ok) { toast('Error al eliminar', 'err'); return; }
10686:     toast('Evento eliminado');
```

### Coincidencia 78 — línea 10775

```javascript
10772: 
10773:   try {
10774:     // Eliminar viejo → crear nuevo con los datos actualizados
10775:     const rDel = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(_eeeId)}`);
10776:     const dDel = await rDel.json();
10777:     if (!dDel.ok) { toast('Error al actualizar (eliminar): ' + (dDel.error||''), 'err'); return; }
10778: 
```

### Coincidencia 79 — línea 10779

```javascript
10776:     const dDel = await rDel.json();
10777:     if (!dDel.ok) { toast('Error al actualizar (eliminar): ' + (dDel.error||''), 'err'); return; }
10778: 
10779:     const rCre = await fetch(`${APPS_SCRIPT_URL}?action=crearEvento&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(data))}`);
10780:     const dCre = await rCre.json();
10781:     if (!dCre.ok) { toast('Error al actualizar (crear): ' + (dCre.error||''), 'err'); return; }
10782: 
```

### Coincidencia 80 — línea 10794

```javascript
10791: async function eeeEliminar() {
10792:   if (!confirm('¿Eliminar este evento?')) return;
10793:   try {
10794:     const r = await fetch(`${APPS_SCRIPT_URL}?action=eliminarEvento&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(_eeeId)}`);
10795:     const d = await r.json();
10796:     if (!d.ok) { toast('Error al eliminar', 'err'); return; }
10797:     toast('Evento eliminado');
```

## Eventos de carga y cierre

### Coincidencia 1 — línea 6198

```javascript
6195: }
6196: 
6197: // Garantiza que leads y checklist pendientes se guarden aunque el navegador cierre
6198: window.addEventListener('beforeunload', () => {
6199:   if (!Object.keys(_kvDirty).length) return;
6200:   const batch = { ..._kvDirty };
6201:   _kvDirty = {};
```

### Coincidencia 2 — línea 7007

```javascript
7004:   if (file.size > 8 * 1024 * 1024) return Promise.resolve({error:'El comprobante supera 8 MB'});
7005:   return new Promise(resolve => {
7006:     const reader = new FileReader();
7007:     reader.onload = () => resolve({name:file.name, type:file.type, size:file.size, data:reader.result});
7008:     reader.onerror = () => resolve({error:'No pude leer el archivo del comprobante'});
7009:     reader.readAsDataURL(file);
7010:   });
```

### Coincidencia 3 — línea 7365

```javascript
7362: 
7363: function _resetActivity() { _lastActivity = Date.now(); }
7364: ['click','keydown','scroll','touchstart'].forEach(ev =>
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
```

### Coincidencia 4 — línea 7376

```javascript
7373: 
7374: // ── VERIFICAR SESIÓN AL VOLVER A LA PESTAÑA ──
7375: // Cubre el caso de suspensión del equipo donde JS se pausa y los timers no disparan
7376: document.addEventListener('visibilitychange', async () => {
7377:   if (document.visibilityState !== 'visible' || !TOKEN) return;
7378:   try {
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
```

### Coincidencia 5 — línea 7388

```javascript
7385: });
7386: 
7387: // Auto-login si tiene sesión guardada
7388: window.addEventListener('DOMContentLoaded', async () => {
7389:   initAdminUX2026();
7390:   document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
7391:   if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
```

### Coincidencia 6 — línea 7586

```javascript
7583:     toggle.setAttribute('aria-expanded','false');
7584:     toggle.setAttribute('aria-controls','sidebar');
7585:     toggle.innerHTML = '<span>Más herramientas</span><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
7586:     toggle.addEventListener('click', () => {
7587:       const abierto = sidebar.classList.toggle('tools-open');
7588:       toggle.setAttribute('aria-expanded', String(abierto));
7589:       toggle.querySelector('span').textContent = abierto ? 'Ocultar herramientas' : 'Más herramientas';
```

### Coincidencia 7 — línea 7617

```javascript
7614:     if (notesCard) more.append(notesCard);
7615:     if (leadsGrid) more.append(leadsGrid);
7616:     dashboard.append(btn, more);
7617:     btn.addEventListener('click', () => {
7618:       const abierto = more.classList.toggle('open');
7619:       btn.setAttribute('aria-expanded', String(abierto));
7620:       btn.firstChild.textContent = abierto ? 'Ocultar análisis y notas ' : 'Ver análisis y notas ';
```

### Coincidencia 8 — línea 7641

```javascript
7638:   document.querySelectorAll('.stat-card.clickable,[onclick].stat-card').forEach(card => {
7639:     card.tabIndex = 0;
7640:     card.setAttribute('role','button');
7641:     card.addEventListener('keydown', e => {
7642:       if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
7643:     });
7644:   });
```

### Coincidencia 9 — línea 7747

```javascript
7744:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7745:   </div>`;
7746:   document.body.appendChild(modal);
7747:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7748: }
7749: 
7750: const KPI_INTERACTIVE = {
```

### Coincidencia 10 — línea 10969

```javascript
10966: }
10967: 
10968: // Cerrar dropdown al hacer clic fuera
10969: document.addEventListener('click', e => {
10970:   if (!e.target.closest('#pacSearch') && !e.target.closest('#pacDropdown')) {
10971:     const dd = document.getElementById('pacDropdown');
10972:     if (dd) dd.style.display = 'none';
```

### Coincidencia 11 — línea 12701

```javascript
12698: // ── MODALS ──
12699: function openModal(id) { document.getElementById(id).classList.add('open'); }
12700: function closeModal(id) { document.getElementById(id).classList.remove('open'); }
12701: document.querySelectorAll('.modal-bg').forEach(m => m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); }));
12702: 
12703: // ── DARK MODE ──
12704: function toggleDarkMode() {
```

### Coincidencia 12 — línea 12713

```javascript
12710:   if (txt) txt.textContent = next === 'dark' ? 'Modo claro' : 'Modo oscuro';
12711: }
12712: // Sincronizar texto del botón al cargar
12713: window.addEventListener('DOMContentLoaded', () => {
12714:   const txt = document.getElementById('darkModeTxt');
12715:   if (txt && document.documentElement.getAttribute('data-theme') === 'dark') {
12716:     txt.textContent = 'Modo claro';
```

### Coincidencia 13 — línea 12721

```javascript
12718: });
12719: 
12720: // ── ATAJOS DE TECLADO ──
12721: document.addEventListener('keydown', e => {
12722:   // Esc → cerrar modal abierto
12723:   if (e.key === 'Escape') {
12724:     const m = document.querySelector('.modal-bg.open');
```

### Coincidencia 14 — línea 18903

```javascript
18900:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18901:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18902: 
18903:   document.addEventListener('click', function(e) {
18904:     const a = e.target.closest('a[href]');
18905:     if (!a) return;
18906:     const href = a.getAttribute('href') || '';
```

### Coincidencia 15 — línea 18985

```javascript
18982:   });
18983: }
18984: 
18985: document.addEventListener('DOMContentLoaded', () => {
18986:   setTimeout(actualizarContadorLeads, 500);
18987:   setTimeout(restoreHelpBanners, 300);
18988: });
```

### Coincidencia 16 — línea 19710

```javascript
19707:     gFitHeight(el);
19708:   });
19709: }
19710: document.addEventListener('DOMContentLoaded', gCargarGuardados);
19711: 
19712: function gTabSwitch(tab) {
19713:   ['servicios','paquetes','membresias','recuperacion'].forEach(t => {
```

### Coincidencia 17 — línea 20282

```javascript
20279: }
20280: 
20281: // Calcular comisión en tiempo real mientras se escribe el valor de venta
20282: document.addEventListener('DOMContentLoaded', () => {
20283:   const ventaInp = document.getElementById('recInpVenta');
20284:   if (ventaInp) {
20285:     ventaInp.addEventListener('input', () => {
```

### Coincidencia 18 — línea 20285

```javascript
20282: document.addEventListener('DOMContentLoaded', () => {
20283:   const ventaInp = document.getElementById('recInpVenta');
20284:   if (ventaInp) {
20285:     ventaInp.addEventListener('input', () => {
20286:       const v = parseFloat(ventaInp.value || '0');
20287:       const comEl = document.getElementById('recInpComisionCalc');
20288:       if (comEl) comEl.value = v > 0 ? _fmtCLP(v * REC_PCT) : '$0';
```

## Temporizadores

### Coincidencia 1 — línea 3869

```javascript
3866:               </div>
3867:               <div class="help-banner-footer">
3868:                 <div class="help-banner-tip">💬 Tip: registra el lead apenas leas el mensaje, no esperes a responderlo.</div>
3869:                 <button class="help-banner-link" onclick="showView('guiakpis'); setTimeout(() => { const el = document.querySelectorAll('.gk-kpi-card')[2]; if(el) { el.classList.add('open'); el.scrollIntoView({behavior:'smooth',block:'center'}); } }, 300)">
3870:                   📚 Ver guía completa
3871:                 </button>
3872:               </div>
```

### Coincidencia 2 — línea 4097

```javascript
4094:           </div>
4095:         </div>
4096:         <div style="display:flex;gap:10px;flex-wrap:wrap">
4097:           <button onclick="registrarLead('WhatsApp');setTimeout(actualizarContadorLeads,300)" style="flex:1;min-width:140px;padding:12px;background:#25d366;color:white;border:none;border-radius:10px;font-family:var(--font-b);font-size:.88rem;font-weight:600;cursor:pointer">
4098:             ➕ Lead WhatsApp
4099:           </button>
4100:           <button onclick="registrarLead('Instagram');setTimeout(actualizarContadorLeads,300)" style="flex:1;min-width:140px;padding:12px;background:linear-gradient(45deg,#833ab4,#e1306c,#fd1d1d);color:white;border:none;border-radius:10px;font-family:var(--font-b);font-size:.88rem;font-weight:600;cursor:pointer">
```

### Coincidencia 3 — línea 4100

```javascript
4097:           <button onclick="registrarLead('WhatsApp');setTimeout(actualizarContadorLeads,300)" style="flex:1;min-width:140px;padding:12px;background:#25d366;color:white;border:none;border-radius:10px;font-family:var(--font-b);font-size:.88rem;font-weight:600;cursor:pointer">
4098:             ➕ Lead WhatsApp
4099:           </button>
4100:           <button onclick="registrarLead('Instagram');setTimeout(actualizarContadorLeads,300)" style="flex:1;min-width:140px;padding:12px;background:linear-gradient(45deg,#833ab4,#e1306c,#fd1d1d);color:white;border:none;border-radius:10px;font-family:var(--font-b);font-size:.88rem;font-weight:600;cursor:pointer">
4101:             ➕ Lead Instagram
4102:           </button>
4103:           <button onclick="deshacerUltimoLead();setTimeout(actualizarContadorLeads,300)" style="padding:12px 16px;background:var(--s2);color:var(--text);border:1px solid var(--border);border-radius:10px;font-family:var(--font-b);font-size:.85rem;cursor:pointer">
```

### Coincidencia 4 — línea 4103

```javascript
4100:           <button onclick="registrarLead('Instagram');setTimeout(actualizarContadorLeads,300)" style="flex:1;min-width:140px;padding:12px;background:linear-gradient(45deg,#833ab4,#e1306c,#fd1d1d);color:white;border:none;border-radius:10px;font-family:var(--font-b);font-size:.88rem;font-weight:600;cursor:pointer">
4101:             ➕ Lead Instagram
4102:           </button>
4103:           <button onclick="deshacerUltimoLead();setTimeout(actualizarContadorLeads,300)" style="padding:12px 16px;background:var(--s2);color:var(--text);border:1px solid var(--border);border-radius:10px;font-family:var(--font-b);font-size:.85rem;cursor:pointer">
4104:             ↩️ Deshacer
4105:           </button>
4106:           <button onclick="resetLeadsHoy()" style="padding:12px 16px;background:rgba(239,68,68,.08);color:#ef4444;border:1px solid rgba(239,68,68,.25);border-radius:10px;font-family:var(--font-b);font-size:.85rem;cursor:pointer" title="Borrar todos los leads de hoy">
```

### Coincidencia 5 — línea 5125

```javascript
5122:             <!-- Campo extra para referidos con autocomplete de pacientes -->
5123:             <div id="dbReferidoPorWrap" style="display:none;margin-top:6px;position:relative">
5124:               <input type="text" id="dbReferidoPor" placeholder="Nombre de quien la refirió..." autocomplete="off"
5125:                 oninput="dbReferidoFilter()" onfocus="dbReferidoFilter()" onblur="setTimeout(()=>document.getElementById('dbReferidoList').style.display='none',200)"
5126:                 style="width:100%;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.3);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.9rem;padding:10px 12px;outline:none;box-sizing:border-box">
5127:               <ul id="dbReferidoList" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:999;background:var(--s2);border:1px solid rgba(139,92,246,.3);border-radius:8px;margin:3px 0 0;padding:4px 0;max-height:180px;overflow-y:auto;box-shadow:0 4px 16px rgba(0,0,0,.15);list-style:none"></ul>
5128:             </div>
```

### Coincidencia 6 — línea 5291

```javascript
5288:               oninput="onPasInput(this.value)"
5289:               autocomplete="off"
5290:               style="width:100%;background:var(--s2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font-b);font-size:.95rem;padding:11px 44px 11px 16px;outline:none;transition:var(--tr)"
5291:               onfocus="this.style.borderColor='var(--primary)'" onblur="setTimeout(()=>document.getElementById('pasDropdown').style.display='none',180)">
5292:             <!-- Botón limpiar -->
5293:             <button onclick="limpiarPasBusqueda()" title="Limpiar"
5294:               style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;line-height:1;padding:4px">×</button>
```

### Coincidencia 7 — línea 6172

```javascript
6169:   _gasKV[key] = s;
6170:   localStorage.setItem(key, s);
6171:   _kvDirty[key] = s;
6172:   clearTimeout(_kvFlushTimer);
6173:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6174: }
6175: 
```

### Coincidencia 8 — línea 6173

```javascript
6170:   localStorage.setItem(key, s);
6171:   _kvDirty[key] = s;
6172:   clearTimeout(_kvFlushTimer);
6173:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6174: }
6175: 
6176: function kvRemove(key) {
```

### Coincidencia 9 — línea 6180

```javascript
6177:   delete _gasKV[key];
6178:   localStorage.removeItem(key);
6179:   _kvDirty[key] = '__DELETE__';
6180:   clearTimeout(_kvFlushTimer);
6181:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6182: }
6183: 
```

### Coincidencia 10 — línea 6181

```javascript
6178:   localStorage.removeItem(key);
6179:   _kvDirty[key] = '__DELETE__';
6180:   clearTimeout(_kvFlushTimer);
6181:   _kvFlushTimer = setTimeout(_flushKV, 2000);
6182: }
6183: 
6184: async function _flushKV() {
```

### Coincidencia 11 — línea 6193

```javascript
6190:     await fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`);
6191:   } catch(e) {
6192:     Object.assign(_kvDirty, batch);
6193:     _kvFlushTimer = setTimeout(_flushKV, 5000);
6194:   }
6195: }
6196: 
```

### Coincidencia 12 — línea 6876

```javascript
6873: 
6874: function abrirPagoCita(id) {
6875:   showView('pagos');
6876:   setTimeout(() => {
6877:     fillPaymentSelectors(id);
6878:     const el = document.getElementById('payValorRecibido');
6879:     if (el) el.focus();
```

### Coincidencia 13 — línea 7106

```javascript
7103:   a.href = URL.createObjectURL(blob);
7104:   a.download = filename;
7105:   a.click();
7106:   setTimeout(() => URL.revokeObjectURL(a.href), 800);
7107: }
7108: 
7109: function exportPaymentsCSV() {
```

### Coincidencia 14 — línea 7367

```javascript
7364: ['click','keydown','scroll','touchstart'].forEach(ev =>
7365:   document.addEventListener(ev, _resetActivity, {passive: true})
7366: );
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7370:     setTimeout(logout, 1500);
```

### Coincidencia 15 — línea 7370

```javascript
7367: setInterval(() => {
7368:   if (TOKEN && Date.now() - _lastActivity > _INACTIVITY_MS) {
7369:     toast('Sesión cerrada por inactividad (30 min).', 'warn');
7370:     setTimeout(logout, 1500);
7371:   }
7372: }, 60_000);
7373: 
```

### Coincidencia 16 — línea 7382

```javascript
7379:     const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
7380:     if (!r.ok) {
7381:       toast('Sesión expirada. Volviendo al login...', 'warn');
7382:       setTimeout(logout, 1500);
7383:     }
7384:   } catch(e) {}
7385: });
```

### Coincidencia 17 — línea 7835

```javascript
7832:   const action=document.getElementById('kpiActionBtn');action.textContent=cfg.actionLabel;action.onclick=()=>{closeKPIExplorer();showView(cfg.action)};
7833:   document.getElementById('kpiExplainBtn').onclick=()=>{closeKPIExplorer();scrollToKPICard(id)};
7834:   const modal=document.getElementById('kpiExplorer');modal.classList.add('open');
7835:   setTimeout(()=>modal.querySelector('.kpi-close').focus(),20);
7836: }
7837: 
7838: function closeKPIExplorer(){document.getElementById('kpiExplorer')?.classList.remove('open')}
```

### Coincidencia 18 — línea 8065

```javascript
8062: }
8063: 
8064: async function markAutomationMessage(id) {
8065:   setTimeout(async()=>{try{await fetch(`${APPS_SCRIPT_URL}?action=automationQueueDone&id=${encodeURIComponent(id)}&token=${encodeURIComponent(TOKEN)}`).then(r=>r.json());loadAutomationCenter()}catch(e){}},700);
8066: }
8067: 
8068: function toggleSidebar() {
```

### Coincidencia 19 — línea 8967

```javascript
8964: 
8965: function openPassportModuleFor(nombre) {
8966:   showView('pasaporte');
8967:   setTimeout(function() {
8968:     const input = document.getElementById('pasNombreInput');
8969:     if (!input) return;
8970:     input.value = nombre || '';
```

### Coincidencia 20 — línea 8981

```javascript
8978:   t.className = 'toast-msg ' + type;
8979:   t.textContent = msg;
8980:   document.getElementById('toast').appendChild(t);
8981:   setTimeout(() => t.remove(), 3500);
8982: }
8983: 
8984: async function reload() {
```

### Coincidencia 21 — línea 8993

```javascript
8990:       allData = d;
8991:       await loadTeamData();
8992:     }
8993:     else if (d.error === 'Sin permiso') { toast('Sesión expirada. Volviendo al login...', 'warn'); setTimeout(logout, 1500); }
8994:   } catch(e) {
8995:     toast('Sin conexión. Verifica tu internet.', 'err');
8996:   }
```

### Coincidencia 22 — línea 9364

```javascript
9361:   initQuickNotes();
9362:   renderSmartBriefing();
9363:   renderSmartCobrosCenter();
9364:   setTimeout(_animateDashStats, 80);
9365:   setTimeout(_updateMobBadge, 200);
9366:   // Revisar alerta cada minuto
9367:   if (window._alertInterval) clearInterval(window._alertInterval);
```

### Coincidencia 23 — línea 9365

```javascript
9362:   renderSmartBriefing();
9363:   renderSmartCobrosCenter();
9364:   setTimeout(_animateDashStats, 80);
9365:   setTimeout(_updateMobBadge, 200);
9366:   // Revisar alerta cada minuto
9367:   if (window._alertInterval) clearInterval(window._alertInterval);
9368:   window._alertInterval = setInterval(checkUpcomingAlerts, 60000);
```

### Coincidencia 24 — línea 9367

```javascript
9364:   setTimeout(_animateDashStats, 80);
9365:   setTimeout(_updateMobBadge, 200);
9366:   // Revisar alerta cada minuto
9367:   if (window._alertInterval) clearInterval(window._alertInterval);
9368:   window._alertInterval = setInterval(checkUpcomingAlerts, 60000);
9369: 
9370:   // Timeline hoy
```

### Coincidencia 25 — línea 9368

```javascript
9365:   setTimeout(_updateMobBadge, 200);
9366:   // Revisar alerta cada minuto
9367:   if (window._alertInterval) clearInterval(window._alertInterval);
9368:   window._alertInterval = setInterval(checkUpcomingAlerts, 60000);
9369: 
9370:   // Timeline hoy
9371:   const citasHoy = citas.filter(c => normDate(c.fecha) === todayStr).sort((a,b) => a.hora.localeCompare(b.hora));
```

### Coincidencia 26 — línea 11855

```javascript
11852:   document.getElementById('ncTime').value = pad(hour) + ':00';
11853:   // Scroll al inicio del formulario
11854:   const form = document.querySelector('.nc-form');
11855:   if (form) setTimeout(() => form.scrollIntoView({behavior:'smooth', block:'start'}), 80);
11856: }
11857: 
11858: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 27 — línea 11880

```javascript
11877:   panel.style.display = isOpen ? 'none' : 'block';
11878:   if (!isOpen) {
11879:     document.getElementById('voiceText').value = '';
11880:     setTimeout(() => document.getElementById('voiceText').focus(), 100);
11881:   }
11882: }
11883: 
```

### Coincidencia 28 — línea 11978

```javascript
11975:     btn.classList.remove('listening');
11976:     btn.textContent = VOICE_ICON;
11977:   }
11978:   setTimeout(() => {
11979:     const s = _voiceStatusEl();
11980:     if (s) s.style.display = 'none';
11981:   }, 3000);
```

### Coincidencia 29 — línea 12860

```javascript
12857:   el.value = kvGet(key) || '';
12858: }
12859: function autoGuardarNota() {
12860:   clearTimeout(_notasTimer);
12861:   _notasTimer = setTimeout(() => {
12862:     const el = document.getElementById('notasRapidas');
12863:     if (!el) return;
```

### Coincidencia 30 — línea 12861

```javascript
12858: }
12859: function autoGuardarNota() {
12860:   clearTimeout(_notasTimer);
12861:   _notasTimer = setTimeout(() => {
12862:     const el = document.getElementById('notasRapidas');
12863:     if (!el) return;
12864:     kvSet('notasRapidas_' + today(), el.value);
```

### Coincidencia 31 — línea 12866

```javascript
12863:     if (!el) return;
12864:     kvSet('notasRapidas_' + today(), el.value);
12865:     const saved = document.getElementById('notasSaved');
12866:     if (saved) { saved.classList.add('show'); setTimeout(() => saved.classList.remove('show'), 1800); }
12867:   }, 600);
12868: }
12869: 
```

### Coincidencia 32 — línea 13492

```javascript
13489:   const fb = document.getElementById('leadFeedback');
13490:   if (fb) {
13491:     fb.textContent = `✅ Lead de ${canal} registrado`;
13492:     setTimeout(() => { fb.textContent = ''; }, 2500);
13493:   }
13494: }
13495: 
```

### Coincidencia 33 — línea 13503

```javascript
13500:   const fb = document.getElementById('leadFeedback');
13501:   if (fb) {
13502:     fb.textContent = ok ? '↩️ Lead deshecho' : '⚠️ No hay leads para deshacer';
13503:     setTimeout(() => { fb.textContent = ''; }, 2500);
13504:   }
13505: }
13506: 
```

### Coincidencia 34 — línea 14101

```javascript
14098:   toast('Información copiada correctamente', 'ok');
14099:   const estados = document.querySelectorAll('.copyGestionStatus');
14100:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14101:   clearTimeout(window._copyGestionStatusTimer);
14102:   window._copyGestionStatusTimer = setTimeout(() => {
14103:     estados.forEach(el => { el.style.display = 'none'; });
14104:   }, 2200);
```

### Coincidencia 35 — línea 14102

```javascript
14099:   const estados = document.querySelectorAll('.copyGestionStatus');
14100:   estados.forEach(el => { el.style.display = 'inline-flex'; });
14101:   clearTimeout(window._copyGestionStatusTimer);
14102:   window._copyGestionStatusTimer = setTimeout(() => {
14103:     estados.forEach(el => { el.style.display = 'none'; });
14104:   }, 2200);
14105: }
```

### Coincidencia 36 — línea 14129

```javascript
14126:   const ta = document.getElementById('copyFallbackText');
14127:   ta.value = text;
14128:   modal.style.display = 'flex';
14129:   setTimeout(() => { ta.focus(); ta.select(); }, 80);
14130: }
14131: 
14132: function abrirCopiarListaGestion() {
```

### Coincidencia 37 — línea 14219

```javascript
14216:   const modal = document.getElementById('modalReporteMes');
14217:   modal.style.display = 'flex';
14218:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Calculando...</div>';
14219:   setTimeout(() => {
14220:     const html = _buildReporteMes();
14221:     document.getElementById('reporteMesBody').innerHTML = html;
14222:   }, 80);
```

### Coincidencia 38 — línea 14273

```javascript
14270: 
14271:   // Refrescar todo el reporte
14272:   document.getElementById('reporteMesBody').innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Actualizando...</div>';
14273:   setTimeout(() => {
14274:     document.getElementById('reporteMesBody').innerHTML = _buildReporteMes();
14275:   }, 60);
14276: }
```

### Coincidencia 39 — línea 15000

```javascript
14997:     const orig = btn.innerHTML;
14998:     btn.textContent = '✓ Copiado';
14999:     btn.style.color = 'var(--ok)';
15000:     setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
15001:   }).catch(() => toast('No se pudo copiar', 'err'));
15002: }
15003: 
```

### Coincidencia 40 — línea 15023

```javascript
15020:     <p style="margin-top:28px;font-size:.75rem;color:#6B7280">Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}</p>
15021:   </body></html>`);
15022:   w.document.close();
15023:   setTimeout(() => w.print(), 500);
15024: }
15025: 
15026: // ══════════════════════════════════════════════════════════════
```

### Coincidencia 41 — línea 15289

```javascript
15286:     btn.textContent = '✓ ¡Listo! Ya puedes pegarlo en Claude';
15287:     btn.style.background = 'var(--ok)';
15288:     btn.style.color = '#fff';
15289:     setTimeout(() => { btn.innerHTML = orig; btn.style.background=''; btn.style.color=''; }, 3000);
15290:   }).catch(() => toast('No se pudo copiar — intenta de nuevo', 'err'));
15291: }
15292: 
```

### Coincidencia 42 — línea 15331

```javascript
15328:     if (id === 'gkKpi4b') _renderCancelBreakdown();
15329:     if (id === 'gkKpi8')  _renderBDBreakdown();
15330:   }
15331:   setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
15332: }
15333: 
15334: // ══ MANUAL DE EMERGENCIA — funciones ══
```

### Coincidencia 43 — línea 16022

```javascript
16019:   const lbl = cb ? cb.closest('.gk-check-item') : null;
16020:   if (!cb || !lbl) return;
16021:   // Usamos un pequeño delay para leer el valor actualizado
16022:   setTimeout(() => {
16023:     const done = cb.checked;
16024:     lbl.classList.toggle('done', done);
16025:     const today = _rutinaKey();
```

### Coincidencia 44 — línea 16470

```javascript
16467:   const body = document.getElementById('kpiConfigBody');
16468:   if (body) body.style.display = 'block';
16469:   const msg = document.getElementById('kpiConfigSaveMsg');
16470:   if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2500); }
16471:   toast('Valores actualizados ✓', 'ok');
16472: }
16473: 
```

### Coincidencia 45 — línea 17118

```javascript
17115: 
17116: function openPago(citaId) {
17117:   showView('pagos');
17118:   setTimeout(() => {
17119:     if (typeof fillPaymentSelectors === 'function') fillPaymentSelectors(citaId || '');
17120:     const selector = document.getElementById('payCitaId');
17121:     if (selector) {
```

### Coincidencia 46 — línea 17995

```javascript
17992: function marcarTareaWA(key) {
17993:   kvSet(key+'_estado','completada');
17994:   kvSet(key+'_ts', new Date().toISOString());
17995:   setTimeout(() => renderTareas(), 500);
17996: }
17997: function marcarTareaCompletada(key) {
17998:   kvSet(key+'_estado','completada');
```

### Coincidencia 47 — línea 18722

```javascript
18719:     const btn = document.getElementById('pasCopyBtn');
18720:     const orig = btn.textContent;
18721:     btn.textContent = '¡Copiado!';
18722:     setTimeout(() => btn.textContent = orig, 2000);
18723:   });
18724: }
18725: 
```

### Coincidencia 48 — línea 18815

```javascript
18812:       + '&_ts=' + Date.now();
18813: 
18814:     const controller = new AbortController();
18815:     const timer = setTimeout(() => controller.abort(), 120000);
18816:     let response;
18817:     try {
18818:       response = await fetch(url, {cache:'no-store', signal:controller.signal});
```

### Coincidencia 49 — línea 18820

```javascript
18817:     try {
18818:       response = await fetch(url, {cache:'no-store', signal:controller.signal});
18819:     } finally {
18820:       clearTimeout(timer);
18821:     }
18822: 
18823:     const raw = await response.text();
```

### Coincidencia 50 — línea 18939

```javascript
18936:     const btn = document.getElementById('waCopyBtn');
18937:     const orig = btn.textContent;
18938:     btn.textContent = '✅ ¡Copiado!';
18939:     setTimeout(() => btn.textContent = orig, 2500);
18940:     toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
18941:   }).catch(() => {
18942:     // Fallback para navegadores sin clipboard API
```

### Coincidencia 51 — línea 18986

```javascript
18983: }
18984: 
18985: document.addEventListener('DOMContentLoaded', () => {
18986:   setTimeout(actualizarContadorLeads, 500);
18987:   setTimeout(restoreHelpBanners, 300);
18988: });
18989: 
```

### Coincidencia 52 — línea 18987

```javascript
18984: 
18985: document.addEventListener('DOMContentLoaded', () => {
18986:   setTimeout(actualizarContadorLeads, 500);
18987:   setTimeout(restoreHelpBanners, 300);
18988: });
18989: 
18990: // ══════════════════════════════════════════
```

### Coincidencia 53 — línea 19034

```javascript
19031:     equipo_nps_meta:      g('cfg_equipo_nps_meta'),
19032:   }));
19033:   const msg = document.getElementById('coConfigMsg');
19034:   if (msg) { msg.style.display='inline'; setTimeout(()=>msg.style.display='none',2000); }
19035:   renderComisiones();
19036: }
19037: 
```

### Coincidencia 54 — línea 19436

```javascript
19433: 
19434: let _dispDebounce = null;
19435: function buscarDisponibilidad() {
19436:   clearTimeout(_dispDebounce);
19437:   _dispDebounce = setTimeout(_buscarDisp, 300);
19438: }
19439: 
```

### Coincidencia 55 — línea 19437

```javascript
19434: let _dispDebounce = null;
19435: function buscarDisponibilidad() {
19436:   clearTimeout(_dispDebounce);
19437:   _dispDebounce = setTimeout(_buscarDisp, 300);
19438: }
19439: 
19440: async function _buscarDisp() {
```

### Coincidencia 56 — línea 19501

```javascript
19498: 
19499:   navigator.clipboard.writeText(msg).then(() => {
19500:     const msgEl = document.getElementById('dispCopyMsg');
19501:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19502:   }).catch(() => {
19503:     // Fallback para dispositivos sin clipboard API
19504:     const ta = document.createElement('textarea');
```

### Coincidencia 57 — línea 19509

```javascript
19506:     document.body.appendChild(ta); ta.select(); document.execCommand('copy');
19507:     document.body.removeChild(ta);
19508:     const msgEl = document.getElementById('dispCopyMsg');
19509:     if (msgEl) { msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 2500); }
19510:   });
19511: }
19512: </script>
```

### Coincidencia 58 — línea 19613

```javascript
19610:   document.getElementById('msgCat').value = _msgCatActiva || 'recordatorio';
19611:   document.getElementById('msgTexto').value = '';
19612:   openModal('modalMensaje');
19613:   setTimeout(() => document.getElementById('msgTitulo').focus(), 100);
19614: }
19615: 
19616: function editarMensaje(id) {
```

### Coincidencia 59 — línea 19729

```javascript
19726:     btn.textContent = '✅ Copiado';
19727:     btn.style.background = '#16a34a';
19728:     btn.style.color = '#fff';
19729:     setTimeout(() => {
19730:       btn.textContent = orig;
19731:       btn.style.background = '';
19732:       btn.style.color = '';
```

### Coincidencia 60 — línea 19743

```javascript
19740:     window.getSelection().removeAllRanges();
19741:     const orig = btn.textContent;
19742:     btn.textContent = '✅ Copiado';
19743:     setTimeout(() => { btn.textContent = orig; }, 2000);
19744:   });
19745: }
19746: </script>
```

### Coincidencia 61 — línea 19901

```javascript
19898:   document.getElementById('recInpComisionCalc').value = '$0';
19899: 
19900:   const msg = document.getElementById('recGuardadoMsg');
19901:   if (msg) { msg.style.display = 'inline'; setTimeout(() => { msg.style.display = 'none'; }, 2500); }
19902: 
19903:   renderRecuperaciones();
19904:   if (typeof toast === 'function') toast(`Recuperación registrada — comisión: ${_fmtCLP(comision)}`, 'ok');
```

### Coincidencia 62 — línea 20250

```javascript
20247:     let botonesHtml = '';
20248:     if (estado === 'pendiente') {
20249:       botonesHtml = waUrl
20250:         ? `<a href="${waUrl}" target="_blank" onclick="setTimeout(()=>marcarRefEstado('${mesStr}',${anio},'${nombreEsc}','contactado'),1000)" style="padding:6px 14px;background:#8b5cf6;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:.75rem;font-family:var(--font-b);text-decoration:none;white-space:nowrap">Enviar WA</a>`
20251:         : `<span style="font-size:.72rem;color:var(--muted)">Sin tel.</span>`;
20252:     } else if (estado === 'contactado') {
20253:       botonesHtml = `
```
