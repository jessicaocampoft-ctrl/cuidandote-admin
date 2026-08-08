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

    try {
      const data = await ctx.fetchJsonWithTimeout(ctx.apiUrl, {
        method: 'POST',
        body: JSON.stringify({ action: 'adminLogin', user, password })
      }, 120000);

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
      ctx.setAllData(data);
      await ctx.onAdminReady();
      return data;
    } catch (error) {
      showAdminError(ctx, error?.message || 'Error de conexión. Revisa tu internet.');
      return { ok: false, error: error?.message || 'Error de conexión' };
    } finally {
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
        button.textContent = 'Ingresar al portal';
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
        : 'Portal del equipo';
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
          : 'Portal del equipo';
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

    if (ctx.location.hash.startsWith('#/profesionales') || ctx.location.hash.startsWith('#profesionales')) {
      if (ctx.getProfessionalToken()) await ctx.showProfessionalApp();
      else openProfessionalLoginMode(ctx);
      return { mode: 'professional' };
    }

    if (!ctx.getAdminToken()) return { mode: 'login' };

    try {
      const data = await ctx.fetchJsonWithTimeout(
        `${ctx.apiUrl}?action=adminData&token=${encodeURIComponent(ctx.getAdminToken())}`,
        {},
        45000
      );
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
