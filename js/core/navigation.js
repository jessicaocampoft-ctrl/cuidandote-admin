/**
 * Navegación principal del panel administrativo.
 * Extraído de index.html sin cambiar su lógica interna.
 * Fase 1 de modularización: 2026-08-04.
 */
(function (window) {
  'use strict';

  function showView(v) {
    const viewAliases = { citas: 'agenda' };
      v = viewAliases[v] || v;
      ['dashboard','acciones','espera','automatizaciones','tareas','tareasConfig','agenda','nueva','calendario','bloquear','pacientes','equipo','basedatos','codigos','paquetes','recordatorios','finanzas','pagos','guiakpis','presupuesto','seguimiento','mensajes','empresas','pasaporte','comisiones','guioneswa','recuperacion'].forEach(id => {
        const sec = document.getElementById('v' + id.charAt(0).toUpperCase() + id.slice(1));
        const sb  = document.getElementById('sb-' + id);
        if (sec) sec.style.display = 'none';
        if (sb)  sb.classList.remove('active');
      });
      const _sec = document.getElementById('v' + v.charAt(0).toUpperCase() + v.slice(1));
      if (!_sec) {
        console.warn('Vista no encontrada:', v);
        return false;
      }
      _sec.style.display = 'block';
      _sec.classList.remove('view-fadein');
      void _sec.offsetWidth;
      _sec.classList.add('view-fadein');
      const _sbActive = document.getElementById('sb-' + v);
      if (_sbActive) {
        _sbActive.classList.add('active');
        if (_sbActive.classList.contains('sb-secondary')) {
          const sidebar = document.getElementById('sidebar');
          sidebar.classList.add('tools-open');
          const toolsToggle = document.getElementById('sbToolsToggle');
          if (toolsToggle) toolsToggle.setAttribute('aria-expanded','true');
        }
      }
      document.getElementById('sidebar').classList.remove('open');
      // FAB: ocultar en vista nueva (ya estás ahí) y mostrar en las demás
      const fab = document.getElementById('fabAgendar');
      if (fab) fab.style.display = v === 'nueva' ? 'none' : 'flex';
      // Mobile bottom nav: sincronizar activo
      _syncMobileNav(v);
    
      if (v === 'guioneswa') {
        requestAnimationFrame(() => {
          document.querySelectorAll('textarea[id^="gMsg-"]').forEach(gFitHeight);
        });
      }
    
      if (v === 'agenda') {
        const _saved = sessionStorage.getItem('agendaFilters');
        if (_saved) {
          try {
            const _f = JSON.parse(_saved);
            if (_f.search  !== undefined) document.getElementById('fSearch').value  = _f.search;
            if (_f.status  !== undefined) document.getElementById('fStatus').value  = _f.status;
            if (_f.mod     !== undefined) document.getElementById('fMod').value     = _f.mod;
            if (_f.service !== undefined) document.getElementById('fService').value = _f.service;
            if (_f.desde   !== undefined) document.getElementById('fDesde').value   = _f.desde;
            if (_f.hasta   !== undefined) document.getElementById('fHasta').value   = _f.hasta;
          } catch(e) {}
        }
        renderAgenda();
      }
      if (v === 'bloquear')       renderBloqueos();
      if (v === 'pacientes')      renderPacientes();
      if (v === 'equipo')         { loadTeamData().then(renderEquipo); }
      if (v === 'calendario')     renderCalendar();
      if (v === 'recordatorios')  cargarRecordatorios();
      if (v === 'basedatos')      { renderBasedatos(); initFormDB(); renderChangeLog(); renderReactivacion(); }
      if (v === 'finanzas')       { renderFinanzas(); actualizarContadorLeads(); _renderEncuestaStatsUI(getEncuestaStats()); }
      if (v === 'pagos')          { loadOperationsData().then(renderPagos); }
      if (v === 'seguimiento')    renderSeguimiento();
      if (v === 'tareas')         renderTareas();
      if (v === 'tareasConfig')   initTareasConfig();
      if (v === 'paquetes')       renderPaquetes();
      if (v === 'mensajes')       renderMensajes();
      if (v === 'empresas')       renderEmpresas();
      if (v === 'codigos')        renderCodigos();
      if (v === 'guiakpis')       { renderKPIGuia(); actualizarContadorLeads(); loadRutinaChecks(); loadKPIHistoryFromServer(); }
      if (v === 'presupuesto')    { renderPresupuestoMetas(); }
      if (v === 'comisiones')     renderComisiones();
      if (v === 'recuperacion')   renderRecuperaciones();
      if (v === 'acciones')       renderCentroAcciones();
      if (v === 'espera')         renderWaitList();
      if (v === 'automatizaciones') loadAutomationCenter();
      if (v === 'dashboard')      actualizarContadorLeads();
  }

  window.PanelNavigation = Object.freeze({ showView });
})(window);
