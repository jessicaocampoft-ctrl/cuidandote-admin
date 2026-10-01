(function (global) {
  'use strict';

  const runtime = {
    loginAttempts: 0,
    loginLockedUntil: 0,
    lastActivity: Date.now(),
    guardsInstalled: false,
    inactivityTimer: null
  };

  function doc(ctx) {
    return ctx.document || global.document;
  }

  function storage(ctx) {
    return ctx.sessionStorage || global.sessionStorage;
  }

  function element(ctx, id) {
    return doc(ctx).getElementById(id);
  }

  function showOnlyScreen(screenId, ctx = {}) {
    const d = doc(ctx);
    ['loginScreen', 'adminApp', 'proLoginScreen', 'proApp'].forEach(id => {
      const node = d.getElementById(id);
      if (!node) return;
      node.style.display = id === screenId
        ? (id === 'adminApp' || id === 'proApp' ? 'block' : 'flex')
        : 'none';
    });
    return screenId;
  }

  function showAdminError(ctx, message) {
    const err = element(ctx, 'loginErr');
    if (!err) return;
    err.textContent = message;
    err.style.display = 'block';
  }

  function adminDataScore(data) {
    if (!data || !data.ok) return -1;
    // Una respuesta de datos debe traer al menos una colección del panel.
    // El puntaje evita que un respaldo vacío sustituya una respuesta real.
    return ['citas', 'pacientes', 'bloqueos', 'eventos', 'codigos']
      .reduce((total, key) => total + (Array.isArray(data[key]) ? data[key].length : 0), 0);
  }

  async function loadAdminData(ctx, token) {
    // La ruta principal es la fuente de datos. El respaldo solo participa si
    // la principal está lenta o temporalmente no disponible.
    const urls = [ctx.apiUrl, ctx.backupApiUrl].filter((value, index, list) => value && list.indexOf(value) === index);
    if (!urls.length) throw new Error('No hay una ruta disponible para cargar los datos del panel.');

    // Las dos rutas pertenecen al mismo proyecto y devuelven únicamente datos
    // a una sesión válida. Consultarlas en paralelo evita que una instancia de
    // Apps Script que está despertando retenga el acceso completo al panel.
    return await new Promise((resolve, reject) => {
      let pending = urls.length;
      let settled = false;
      let emptyResponse = null;
      let lastError = new Error('No pudimos cargar los datos del panel.');
      urls.forEach(baseUrl => {
        const separator = baseUrl.includes('?') ? '&' : '?';
        const url = `${baseUrl}${separator}action=adminData&token=${encodeURIComponent(token)}&_=${Date.now()}`;
        ctx.fetchJsonWithTimeout(url, {}, 45000, false)
          .then(data => {
            if (settled) return;
            if (adminDataScore(data) > 0) {
              settled = true;
              resolve(data);
              return;
            }
            if (data && data.ok) emptyResponse = data;
            lastError = new Error(data?.error || 'No pudimos cargar los datos del panel.');
            pending -= 1;
            // Solo aceptamos una respuesta sin registros si ninguna ruta pudo
            // devolver datos. Así nunca se reemplaza la agenda por ceros.
            if (!pending) emptyResponse ? resolve(emptyResponse) : reject(lastError);
          })
          .catch(error => {
            if (settled) return;
            lastError = error;
            pending -= 1;
            if (!pending) reject(lastError);
          });
      });
    });
  }

  async function doAdminLogin(ctx) {
    const now = Date.now();
    if (runtime.loginLockedUntil > now) {
      const seconds = Math.ceil((runtime.loginLockedUntil - now) / 1000);
      showAdminError(ctx, `Demasiados intentos. Espera ${seconds} segundo${seconds !== 1 ? 's' : ''}.`);
      return { ok: false, locked: true };
    }

    const password = String(ctx.getAdminPassword() || '').trim();
    const user = String(ctx.getAdminUser() || '').trim();
    const button = element(ctx, 'loginBtn');
    if (!password) return { ok: false, emptyPassword: true };

    if (button) {
      button.textContent = 'Verificando...';
      button.disabled = true;
    }
    const slowLoginTimer = setTimeout(() => {
      if (button) button.textContent = 'Conectando...';
    }, 8000);

    try {
      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {
        method: 'POST',
        // URLSearchParams usa un formulario CORS-simple. Apps Script lo
        // recibe en `payload` sin forzar una solicitud OPTIONS adicional.
        body: new URLSearchParams({
          payload: JSON.stringify({ action: 'adminLogin', user, password })
        })
      // Apps Script puede demorar al despertar después de un periodo sin uso.
      // Una sola petición con margen suficiente evita duplicar el inicio de
      // sesión y que el panel corte un acceso válido durante ese arranque.
      // Si Apps Script devuelve un 404 transitorio mientras reanuda una
      // instancia, repetimos una vez la misma autenticación. Así el equipo
      // no tiene que cerrar sesión ni volver a abrir la página.
      }, 70000, true);

      if (!data.ok) {
        runtime.loginAttempts += 1;
        if (runtime.loginAttempts >= 5) {
          runtime.loginLockedUntil = Date.now() + 120000;
          runtime.loginAttempts = 0;
          showAdminError(ctx, 'Demasiados intentos fallidos. Acceso bloqueado por 2 minutos.');
        } else {
          const remaining = 5 - runtime.loginAttempts;
          showAdminError(ctx, `Contraseña incorrecta. Intentos restantes: ${remaining}`);
        }
        return data;
      }

      runtime.loginAttempts = 0;
      runtime.loginLockedUntil = 0;
      ctx.setAdminToken(data.sessionToken);
      storage(ctx).setItem('adminToken', data.sessionToken);
      ctx.setLoginTime(Date.now());
      showOnlyScreen('adminApp', ctx);

      // Las versiones nuevas del servidor confirman la identidad primero y
      // entregan los datos del panel en una segunda lectura protegida. Esto
      // evita que el acceso quede esperando la carga completa de Sheets.
      // Conservamos compatibilidad con la respuesta antigua, que ya incluía
      // citas y pacientes en el mismo POST.
      let adminData = data;
      if (!Array.isArray(adminData.citas)) {
        adminData = await loadAdminData(ctx, data.sessionToken);
        if (!adminData.ok) throw new Error(adminData.error || 'No pudimos cargar los datos del panel.');
        adminData.sessionToken = data.sessionToken;
        adminData.currentUser = data.currentUser || adminData.currentUser;
      }

      ctx.setAllData(adminData);
      await ctx.onAdminReady();
      return adminData;
    } catch (error) {
      showAdminError(ctx, error?.message || 'Error de conexión. Revisa tu internet.');
      return { ok: false, error: error?.message || 'Error de conexión' };
    } finally {
      clearTimeout(slowLoginTimer);
      if (button) {
        button.textContent = 'Ingresar';
        button.disabled = false;
      }
    }
  }

  function logoutAdmin(ctx) {
    storage(ctx).removeItem('adminToken');
    ctx.setAdminToken('');
    if (typeof ctx.reloadPage === 'function') ctx.reloadPage();
  }

  function openProfessionalLoginMode(ctx) {
    ctx.location.hash = '/profesionales/login';
    showOnlyScreen('proLoginScreen', ctx);
    const error = element(ctx, 'proLoginErr');
    if (error) error.style.display = 'none';
  }

  function backToAdminLogin(ctx) {
    ctx.location.hash = '';
    showOnlyScreen(ctx.getAdminToken() ? 'adminApp' : 'loginScreen', ctx);
  }

  async function doProfessionalLogin(ctx) {
    const button = element(ctx, 'proLoginBtn');
    const errorBox = element(ctx, 'proLoginErr');
    if (errorBox) errorBox.style.display = 'none';
    if (button) {
      button.disabled = true;
      button.textContent = 'Verificando...';
    }

    try {
      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          action: 'professionalLogin',
          user: String(ctx.getProfessionalUser() || '').trim(),
          password: ctx.getProfessionalPassword()
        })
      }, 45000);

      if (!data.ok) throw new Error(data.error || 'No pudimos iniciar sesión');

      ctx.setProfessionalToken(data.professionalToken);
      ctx.setProfessionalSession(data.professional);
      storage(ctx).setItem('professionalToken', data.professionalToken);

      if (data.professional?.debeCambiarPassword) {
        const firstChange = element(ctx, 'proFirstChangeBox');
        if (firstChange) firstChange.style.display = 'block';
        ctx.toast('Cambia la contraseña temporal para continuar');
      } else {
        await ctx.showProfessionalApp();
      }
      return data;
    } catch (error) {
      if (errorBox) {
        errorBox.textContent = error?.message || 'Error de acceso';
        errorBox.style.display = 'block';
      }
      return { ok: false, error: error?.message || 'Error de acceso' };
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Ingresar a mi espacio';
      }
    }
  }

  async function changeProfessionalPassword(ctx) {
    try {
      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          action: 'professionalChangePassword',
          token: ctx.getProfessionalToken(),
          currentPassword: ctx.getProfessionalPassword(),
          newPassword: ctx.getProfessionalNewPassword()
        })
      }, 45000);

      if (!data.ok) {
        ctx.toast(data.error || 'No se pudo cambiar la contraseña', 'err');
        return data;
      }

      ctx.toast('Contraseña actualizada');
      const firstChange = element(ctx, 'proFirstChangeBox');
      if (firstChange) firstChange.style.display = 'none';
      await ctx.showProfessionalApp();
      return data;
    } catch (error) {
      ctx.toast(error?.message || 'No se pudo cambiar la contraseña', 'err');
      return { ok: false, error: error?.message || 'Error de conexión' };
    }
  }

  async function showProfessionalApp(ctx) {
    ctx.location.hash = '/profesionales/agenda';
    showOnlyScreen('proApp', ctx);
    const session = ctx.getProfessionalSession();
    const welcome = element(ctx, 'proWelcome');
    if (welcome) {
      welcome.textContent = session
        ? `${session.nombre} · ${session.rol}`
        : 'Mi espacio de trabajo';
    }
    const date = element(ctx, 'proDate');
    if (date) date.value = ctx.today();
    await ctx.loadProfessionalAgenda();
  }

  async function loadProfessionalAgenda(ctx) {
    if (!ctx.getProfessionalToken()) {
      openProfessionalLoginMode(ctx);
      return { ok: false, missingToken: true };
    }

    try {
      const data = await ctx.fetchJsonWithTimeout(
        `${ctx.apiUrl}?action=professionalAgenda&token=${encodeURIComponent(ctx.getProfessionalToken())}`,
        {},
        45000
      );

      if (!data.ok) {
        storage(ctx).removeItem('professionalToken');
        ctx.setProfessionalToken('');
        ctx.setProfessionalSession(null);
        ctx.setProfessionalAgenda([]);
        ctx.toast(data.error || 'Sesión vencida', 'err');
        openProfessionalLoginMode(ctx);
        return data;
      }

      ctx.setProfessionalSession(data.professional);
      const welcome = element(ctx, 'proWelcome');
      if (welcome) {
        welcome.textContent = data.professional
          ? `${data.professional.nombre} · ${data.professional.rol}`
          : 'Mi espacio de trabajo';
      }
      ctx.setProfessionalAgenda(data.citas || []);
      ctx.renderProfessionalAgenda();
      return data;
    } catch (error) {
      ctx.toast(error?.message || 'No se pudo cargar la agenda', 'err');
      return { ok: false, error: error?.message || 'Error de conexión' };
    }
  }

  function logoutProfessional(ctx) {
    storage(ctx).removeItem('professionalToken');
    ctx.setProfessionalToken('');
    ctx.setProfessionalSession(null);
    ctx.setProfessionalAgenda([]);
    openProfessionalLoginMode(ctx);
  }

  function resetActivity(now = Date.now()) {
    runtime.lastActivity = now;
  }

  function checkInactivity(ctx, now = Date.now()) {
    if (!ctx.getAdminToken()) return false;
    if (now - runtime.lastActivity <= ctx.inactivityMs) return false;
    ctx.toast('Sesión cerrada por inactividad (30 min).', 'warn');
    ctx.setTimeout(() => ctx.logoutAdmin(), 1500);
    return true;
  }

  async function verifyAdminSession(ctx) {
    if (!ctx.getAdminToken()) return { ok: false, missingToken: true };
    try {
      const data = await ctx.fetchJsonWithTimeout(
        `${ctx.apiUrl}?action=ping&token=${encodeURIComponent(ctx.getAdminToken())}`,
        {},
        20000
      );
      if (!data.ok) {
        ctx.toast('Sesión expirada. Volviendo al login...', 'warn');
        ctx.setTimeout(() => ctx.logoutAdmin(), 1500);
      }
      return data;
    } catch (_) {
      return { ok: false, networkError: true };
    }
  }

  function installAdminGuards(ctx) {
    if (runtime.guardsInstalled) return;
    runtime.guardsInstalled = true;
    runtime.lastActivity = Date.now();

    ['click', 'keydown', 'scroll', 'touchstart'].forEach(eventName => {
      doc(ctx).addEventListener(eventName, () => resetActivity(), { passive: true });
    });

    runtime.inactivityTimer = ctx.setInterval(
      () => checkInactivity(ctx),
      60000
    );

    doc(ctx).addEventListener('visibilitychange', async () => {
      if (doc(ctx).visibilityState !== 'visible' || !ctx.getAdminToken()) return;
      await verifyAdminSession(ctx);
    });
  }

  async function restoreOnLoad(ctx) {
    ctx.initAdminUX();

    // Despierta el servicio mientras se muestra la pantalla de acceso. Es una
    // consulta pública de salud; no incluye credenciales ni datos del negocio.
    // Así, al pulsar «Ingresar» normalmente el servidor ya está listo.
    try {
      const separator = ctx.apiUrl.includes('?') ? '&' : '?';
      fetch(`${ctx.apiUrl}${separator}test=1&_=${Date.now()}`, { cache: 'no-store' }).catch(() => {});
    } catch (_) {}

    if (ctx.location.hash.startsWith('#/profesionales') || ctx.location.hash.startsWith('#profesionales')) {
      if (ctx.getProfessionalToken()) await ctx.showProfessionalApp();
      else openProfessionalLoginMode(ctx);
      return { mode: 'professional' };
    }

    if (!ctx.getAdminToken()) return { mode: 'login' };

    try {
      const data = await loadAdminData(ctx, ctx.getAdminToken());
      if (data.ok) {
        ctx.setLoginTime(Date.now());
        showOnlyScreen('adminApp', ctx);
        ctx.setAllData(data);
        await ctx.onAdminReady();
        return { mode: 'admin', data };
      }
    } catch (_) {}

    storage(ctx).removeItem('adminToken');
    ctx.setAdminToken('');
    showOnlyScreen('loginScreen', ctx);
    return { mode: 'login', expired: true };
  }

  global.PanelSession = Object.freeze({
    showOnlyScreen,
    loadAdminData,
    doAdminLogin,
    logoutAdmin,
    openProfessionalLoginMode,
    backToAdminLogin,
    doProfessionalLogin,
    changeProfessionalPassword,
    showProfessionalApp,
    loadProfessionalAgenda,
    logoutProfessional,
    resetActivity,
    checkInactivity,
    verifyAdminSession,
    installAdminGuards,
    restoreOnLoad
  });
})(window);
