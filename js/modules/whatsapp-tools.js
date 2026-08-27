(function(global) {
  'use strict';

function waNombre(nombre) {
  return (nombre||'').split(' ')[0];
}

function waFechaES(fecha) {
  const DIAS  = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const dp = normDate(fecha).split('-');
  if (dp.length < 3 || !dp[0]) return normDate(fecha);
  const obj = new Date(+dp[0], +dp[1]-1, +dp[2]);
  return DIAS[obj.getDay()] + ' ' + +dp[2] + ' de ' + MESES[+dp[1]-1] + ' de ' + dp[0];
}

function waAmPm(hora) {
  const [h, m] = hora.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 || 12;
  return h12 + ':' + String(m).padStart(2,'0') + ' ' + ampm;
}

function ordinalES(n) {
  const s = ['','ra','da','ra','ta','ta','ta','ma','va','na','ma'];
  return n + (n <= 10 ? s[n] : 'ra');
}

function getInfoSesion(nombre, servicio, fecha) {
  const total = sesionesPorPaquete[servicio];
  if (!total) return null;
  const norm  = (nombre||'').toLowerCase().trim();
  const hasta = normDate(fecha);
  const lista = (allData && allData.citas) ? allData.citas : [];
  const numero = lista.filter(c =>
    (c.nombre||'').toLowerCase().trim() === norm &&
    c.servicio === servicio &&
    c.estado !== 'Cancelada' &&
    normDate(c.fecha) <= hasta
  ).length;
  return { numero: Math.max(1, numero), total };
}

function waLink(tel, nombre, fecha, hora, serv, precio, modalidad) {
  const t = String(tel||'').replace(/\D/g,'');
  if (!t || t.length < 7) return null;
  const phone = t.length <= 10 ? '57'+t : t;
  const conPago  = /descarga|valoraci/i.test(serv);
  const infoSes  = getInfoSesion(nombre, serv, fecha);
  const servLine = infoSes
    ? '*' + serv + '* — ' + ordinalES(infoSes.numero) + ' sesion de ' + infoSes.total
    : '*' + serv + '*';
  const lines = [
    'Hola ' + waNombre(nombre) + '! Te escribo para confirmar tu cita ' + String.fromCodePoint(0x1F4CB),
    '',
    servLine,
    '' + waFechaES(fecha) + ' · ' + waAmPm(hora),
    String.fromCodePoint(0x1F4CD) + ' ' + (modalidad === 'Domicilio' ? 'A domicilio' : 'En sitio'),
  ];
  if (conPago && precio) {
    lines.push(
      '',
      String.fromCodePoint(0x2B50) + ' Valor: *' + precio + '*',
      '',
      'Para el pago:',
      String.fromCodePoint(0x1F3E6) + ' Bancolombia Ahorros: 91257857099',
      String.fromCodePoint(0x1F4F1) + ' Nequi: 3136467945',
      String.fromCodePoint(0x1F5DD, 0xFE0F) + ' Llave: 1010124692',
      'Titular: Jessica Andrea Ocampo Barbosa'
    );
  }
  lines.push(
    '',
    'Respóndeme:',
    '✅ *1* — Sí confirmo mi asistencia',
    '❌ *2* — Necesito cancelar o cambiar el horario',
    '',
    'Gracias! — Cuidándote Fisioterapia'
  );
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(lines.join('\n'));
}

function waLinkRec(tel, nombre, fecha, hora, serv) {
  const t = String(tel||'').replace(/\D/g,'');
  if (!t || t.length < 7) return null;
  const phone   = t.length <= 10 ? '57'+t : t;
  const infoSes = getInfoSesion(nombre, serv, fecha);
  const sesStr  = infoSes
    ? 'tu ' + ordinalES(infoSes.numero) + ' sesion de ' + infoSes.total + ' de *' + serv + '*'
    : 'tu cita de *' + serv + '*';
  const msg = 'Hola ' + waNombre(nombre) + '! Te recuerdo ' + sesStr + ' el ' + waFechaES(fecha) + ' a las ' + waAmPm(hora) + '. Recuerda llegar unos minutos antes con ropa comoda. \uD83D\uDCAA\n\nCualquier duda me avisas. Hasta pronto! — Cuidándote Fisioterapia';
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
}

function waLinkSeg(tel, nombre, serv, notaAdmin) {
  const t = String(tel||'').replace(/\D/g,'');
  if (!t || t.length < 7) return null;
  const phone = t.length <= 10 ? '57'+t : t;
  const s = serv.toLowerCase();
  let det;
  if      (s.includes('descarga') && (s.includes('cuello') || s.includes('espalda'))) det = 'la sesión de descarga muscular en cuello y espalda';
  else if (s.includes('descarga') && s.includes('pierna'))  det = 'la sesión de descarga muscular en piernas';
  else if (s.includes('descarga')) det = 'la sesión de descarga muscular';
  else if (s.includes('readapt'))  det = 'la sesión de readaptación funcional';
  else if (s.includes('valorac'))  det = 'la sesión de valoración funcional';
  else if (s.includes('gimnasio')) det = 'la sesión de gimnasio';
  else if (s.includes('empresa'))  det = 'la sesión empresarial';
  else det = 'la sesión de ' + serv.toLowerCase();
  // Detectar nota de relación: si notaAdmin contiene [PARA: ...]
  const paraMatch = notaAdmin && notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);
  const paraQuien = paraMatch ? paraMatch[1].trim() : null;
  const msg = paraQuien
    ? 'Hola ' + waNombre(nombre) + '! \uD83D\uDC4B Espero que esten bien. ¿Como le fue a ' + paraQuien + ' con ' + det + '? Quedo atenta a cualquier duda o molestia. \uD83D\uDE4F\n\n— Cuidándote Fisioterapia'
    : 'Hola ' + waNombre(nombre) + '! \uD83D\uDC4B Espero que estes bien. ¿Como te fue con ' + det + '? Quedo atenta a cualquier duda o molestia. \uD83D\uDE4F\n\n— Cuidándote Fisioterapia';
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
}

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

function cerrarWaCopyModal() {
  document.getElementById('waCopyModal').style.display = 'none';
}

function copiarMsgWA() {
  const txt = document.getElementById('waCopyText').textContent;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById('waCopyBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ ¡Copiado!';
    setTimeout(() => btn.textContent = orig, 2500);
    toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
  }).catch(() => {
    // Fallback para navegadores sin clipboard API
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    toast('Mensaje copiado. Pégalo en WhatsApp Web 💬', 'ok');
  });
}

  global.PanelWhatsAppTools = Object.freeze({
    waNombre,
    waFechaES,
    waAmPm,
    ordinalES,
    getInfoSesion,
    waLink,
    waLinkRec,
    waLinkSeg,
    _copyGestionMesKey,
    _copyGestionPeriodo,
    _copyGestionTop,
    _copyGestionData,
    _copyGestionOcupacion,
    _copyGestionReactivar,
    _copyGestionCandidatosPaquete,
    _copyGestionDiagnostico,
    _copyGestionAcciones,
    _copyGestionTexto,
    copyGestionTexto,
    _copyGestionAsesorText,
    _copyPlainText,
    _copyOk,
    _showCopyFallback,
    abrirCopiarListaGestion,
    copiarInfoPersonaGestion,
    abrirMensajeWAGestion,
    _showWhatsAppCopyModal,
    _openWAGestionPrepared,
    cerrarWaCopyModal,
    copiarMsgWA
  });
})(window);
