# Detalle exacto de la Fase 2

- APPS_SCRIPT_URL: línea 6143
- fetchJsonWithTimeout: línea 7124
- TOKEN: línea 6203

## Configuración del backend

```javascript
6135:       <button class="btn btn-teal" id="editSaveBtn" onclick="guardarEdicion()">Guardar cambios</button>
6136:     </div>
6137:   </div>
6138: </div>
6139: 
6140: <script src="js/core/navigation.js"></script>
6141: <script>
6142: // ══════════════════════════════════════════════════════════════
6143: const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7biQkVS9l1nU4AYQeOmQzbPcKebOUJ5UmX97vCJDaXg5s-9y0-mgSrE0ANZXZJ8Hd/exec';
6144: 
6145: // ── KV SYNC — datos persistentes sincronizados en todos los dispositivos via GAS ──
6146: let _gasKV = {};
6147: let _kvDirty = {};
6148: let _kvFlushTimer = null;
6149: 
6150: async function loadAdminKV() {
6151:   try {
6152:     const r = await fetch(`${APPS_SCRIPT_URL}?action=getAdminKV&token=${encodeURIComponent(TOKEN)}`).then(x => x.json());
6153:     if (r.ok && r.kv) {
6154:       _gasKV = r.kv;
6155:       Object.entries(r.kv).forEach(([k, v]) => localStorage.setItem(k, v));
6156:     }
6157:   } catch(e) {}
6158: }
6159: 
```

## Función de tiempo máximo

```javascript
7118:   (operationsData.auditoria || []).forEach(a => rows.push([
7119:     a.ID, a.Fecha, a.UsuarioNombre, a.Rol, a.Accion, a.Entidad, a.EntidadID, a.ValorAnterior, a.ValorNuevo, a.Motivo
7120:   ]));
7121:   downloadOperationsCSV(`auditoria_operativa_${today()}.csv`, rows);
7122: }
7123: 
7124: async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 45000) {
7125:   const controller = new AbortController();
7126:   const timeout = setTimeout(() => controller.abort(), timeoutMs);
7127:   try {
7128:     const response = await fetch(url, { ...options, signal: controller.signal });
7129:     const raw = (await response.text()).replace(/^\uFEFF/, '').trim();
7130:     if (!raw) throw new Error('El servidor respondió vacío. Intenta nuevamente.');
7131:     try {
7132:       return JSON.parse(raw);
7133:     } catch (_) {
7134:       throw new Error('El servidor devolvió una respuesta inválida. Intenta nuevamente.');
7135:     }
7136:   } catch (error) {
7137:     if (error && error.name === 'AbortError') {
7138:       throw new Error('El servidor tardó demasiado. Intenta nuevamente.');
7139:     }
7140:     throw error;
7141:   } finally {
7142:     clearTimeout(timeout);
7143:   }
7144: }
7145: 
7146: function openProfessionalLoginMode() {
7147:   location.hash = '/profesionales/login';
7148:   showOnlyScreen('proLoginScreen');
7149:   document.getElementById('proLoginErr').style.display = 'none';
7150: }
7151: 
7152: function backToAdminLogin() {
7153:   location.hash = '';
7154:   showOnlyScreen(TOKEN ? 'adminApp' : 'loginScreen');
7155: }
7156: 
7157: async function doProfessionalLogin() {
7158:   const btn = document.getElementById('proLoginBtn');
7159:   const err = document.getElementById('proLoginErr');
7160:   err.style.display = 'none';
7161:   btn.disabled = true; btn.textContent = 'Verificando...';
7162:   try {
7163:     const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
7164:       method:'POST',
7165:       body:JSON.stringify({
7166:         action:'professionalLogin',
7167:         user:document.getElementById('proUser').value.trim(),
7168:         password:document.getElementById('proPass').value
7169:       })
7170:     }, 45000);
7171:     if (!d.ok) throw new Error(d.error || 'No pudimos iniciar sesión');
7172:     PROFESSIONAL_TOKEN = d.professionalToken;
7173:     professionalSession = d.professional;
7174:     sessionStorage.setItem('professionalToken', PROFESSIONAL_TOKEN);
7175:     if (professionalSession.debeCambiarPassword) {
7176:       document.getElementById('proFirstChangeBox').style.display = 'block';
7177:       toast('Cambia la contraseña temporal para continuar');
7178:     } else {
7179:       await showProfessionalApp();
7180:     }
7181:   } catch(e) {
7182:     err.textContent = e.message || 'Error de acceso';
7183:     err.style.display = 'block';
7184:   } finally {
7185:     btn.disabled = false; btn.textContent = 'Ingresar al portal';
7186:   }
7187: }
7188: 
7189: async function changeProfessionalPassword() {
7190:   const currentPassword = document.getElementById('proPass').value;
7191:   const newPassword = document.getElementById('proNewPass').value;
7192:   const d = await fetch(APPS_SCRIPT_URL, {
7193:     method:'POST',
7194:     body:JSON.stringify({action:'professionalChangePassword', token:PROFESSIONAL_TOKEN, currentPassword, newPassword})
7195:   }).then(r => r.json());
7196:   if (!d.ok) return toast(d.error || 'No se pudo cambiar la contraseña', 'err');
7197:   toast('Contraseña actualizada');
7198:   document.getElementById('proFirstChangeBox').style.display = 'none';
7199:   await showProfessionalApp();
7200: }
7201: 
7202: async function showProfessionalApp() {
7203:   location.hash = '/profesionales/agenda';
7204:   showOnlyScreen('proApp');
```

## Estado de sesión cercano

```javascript
6195: // Garantiza que leads y checklist pendientes se guarden aunque el navegador cierre
6196: window.addEventListener('beforeunload', () => {
6197:   if (!Object.keys(_kvDirty).length) return;
6198:   const batch = { ..._kvDirty };
6199:   _kvDirty = {};
6200:   fetch(`${APPS_SCRIPT_URL}?action=setAdminKV&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(batch))}`, { keepalive: true });
6201: });
6202: 
6203: let TOKEN  = sessionStorage.getItem('adminToken') || '';
6204: let currentAdminUser = JSON.parse(sessionStorage.getItem('adminUser') || 'null');
6205: let allData = {citas: [], bloqueos: [], eventos: []};
6206: let operationsData = {cuentas: [], pagos: [], config: [], historialEstados: [], plantillasPlanes: []};
6207: let teamData = {profesionales: [], asignaciones: [], novedades: [], auditoria: [], cuentas: []};
6208: let PROFESSIONAL_TOKEN = sessionStorage.getItem('professionalToken') || '';
6209: let professionalSession = null;
6210: let professionalAgenda = [];
6211: let professionalMode = 'hoy';
6212: let _kpiViewMonth = null; // {m, y} o null = mes actual
6213: let _kpiServerHistory = {};
6214: 
6215: // Escapa HTML para prevenir XSS en innerHTML
6216: function esc(s) {
6217:   return String(s == null ? '' : s)
6218:     .replace(/&/g,'&amp;').replace(/</g,'&lt;')
6219:     .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
6220:     .replace(/'/g,'&#39;');
6221: }
6222: 
6223: const APPOINTMENT_STATUSES = [
```
