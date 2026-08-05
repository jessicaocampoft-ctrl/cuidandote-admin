# Runtime exacto de sesiones — Fase 3

## loadProfessionalAgenda — línea 7194

```javascript
async function loadProfessionalAgenda() {
  if (!PROFESSIONAL_TOKEN) return openProfessionalLoginMode();
  const d = await fetch(`${APPS_SCRIPT_URL}?action=professionalAgenda&token=${encodeURIComponent(PROFESSIONAL_TOKEN)}`).then(r => r.json());
  if (!d.ok) {
    sessionStorage.removeItem('professionalToken');
    PROFESSIONAL_TOKEN = '';
    toast(d.error || 'Sesión vencida', 'err');
    return openProfessionalLoginMode();
  }
  professionalSession = d.professional;
  document.getElementById('proWelcome').textContent = professionalSession ? `${professionalSession.nombre} · ${professionalSession.rol}` : 'Portal del equipo';
  professionalAgenda = d.citas || [];
  renderProfessionalAgenda();
}
```

## _resetActivity — línea 7363

```javascript
function _resetActivity() { _lastActivity = Date.now(); }
```

## _runUrlRepairIfRequested — línea 7419

```javascript
async function _runUrlRepairIfRequested() {
  const params = new URLSearchParams(location.search);
  if (params.get('repair') !== 'reschedule' || !TOKEN) return;
  const nombre = params.get('nombre') || '';
  const keepFecha = params.get('keepFecha') || '';
  const keepHora = params.get('keepHora') || '';
  if (!nombre || !keepFecha || !keepHora) return;
  try {
    const url = `${APPS_SCRIPT_URL}?action=repairRescheduledDuplicate&token=${encodeURIComponent(TOKEN)}&nombre=${encodeURIComponent(nombre)}&keepFecha=${encodeURIComponent(keepFecha)}&keepHora=${encodeURIComponent(keepHora)}`;
    const result = await fetch(url).then(r => r.json());
    document.body.dataset.repairResult = JSON.stringify(result);
    if (result.ok) {
      toast(result.repaired > 0 ? `Reparación lista: ${result.repaired} cita duplicada cancelada.` : 'Revisión lista: no encontré duplicados activos.', result.repaired > 0 ? 'ok' : 'warn');
      await reload();
      initDashboard();
      renderAgenda();
      renderCalendar();
      renderCitasResumen();
      renderIngresosDetalle();
    } else {
      toast('No se pudo reparar: ' + (result.error || 'respuesta inválida'), 'err');
    }
  } catch(e) {
    document.body.dataset.repairResult = JSON.stringify({ok:false,error:e.message});
    toast('Error ejecutando reparación de reprogramación', 'err');
  }
}
```

## document visibilitychange — línea 7376

```javascript
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState !== 'visible' || !TOKEN) return;
  try {
    const r = await fetch(`${APPS_SCRIPT_URL}?action=ping&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
    if (!r.ok) {
      toast('Sesión expirada. Volviendo al login...', 'warn');
      setTimeout(logout, 1500);
    }
  } catch(e) {}
});


```

## window DOMContentLoaded — línea 7388

```javascript
window.addEventListener('DOMContentLoaded', async () => {
  initAdminUX2026();
  document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  if (location.hash.startsWith('#/profesionales') || location.hash.startsWith('#profesionales')) {
    if (PROFESSIONAL_TOKEN) await showProfessionalApp();
    else openProfessionalLoginMode();
    return;
  }
  if (TOKEN) {
    const btn = document.getElementById('loginBtn');
    try {
      const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
      const d = await r.json();
      if (d.ok) {
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
          return;
      }
    } catch(e) {}
    sessionStorage.removeItem('adminToken');
  }
});


```
