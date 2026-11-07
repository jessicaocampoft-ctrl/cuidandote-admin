/* Incentivos comerciales — cálculo en modo prueba. No crea pagos ni reescribe datos históricos. */
(function (global) {
  'use strict';
  const CFG_KEY = 'commercial_incentives_config_v1';
  const STATUS_KEY = 'commercial_incentives_status_v1';
  const AUDIT_KEY = 'commercial_incentives_audit_v1';
  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => '$' + Math.round(Number(v) || 0).toLocaleString('es-CO');
  const clean = v => String(v || '').trim();
  const ym = d => String(d || '').slice(0,7);
  const num = v => typeof global.parsePrecio === 'function' ? global.parsePrecio(v) : Number(String(v || 0).replace(/[^0-9.-]/g,'')) || 0;
  const currentUser = () => { try { return typeof currentAdminUser !== 'undefined' ? currentAdminUser || {} : {}; } catch (_) { return {}; } };
  const role = () => String(currentUser().rol || 'Superadministradora').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const actor = () => clean(currentUser().nombre || currentUser().name || 'Usuario administrador');
  const isDirection = () => /superadministradora|direccion|administradora/.test(role()) || /jessica/.test(actor().toLowerCase());
  const getJson = (key, fallback) => { try { const raw=global.kvGet?.(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; } };
  const setJson = (key, value) => { global.kvSet?.(key, JSON.stringify(value)); global.PanelStorage?._flushKV?.(); };
  const defaults = () => ({
    effectiveFrom:'2026-11-01', leaderName:'', individualEnabled:false, bonusMode:'prueba',
    capturePct:5, increasePct:10, allianceBonus:50000, allianceVerifiedGoal:500000, allianceDays:90,
    goals:{ nonCancelled:[165,180,50000,100000], value:[12500000,14000000,75000,150000], direct:[6,10,50000,100000], cancellation:[14,12,25000,50000] },
    minimums:{ nonCancelled:150, scheduled:180, value:11500000, newPatients:27, direct:3, cancellation:16 },
    extra:{ scheduled:[190,205], newPatients:[30,35], ticket:[80000,85000], incomePatient:[185000,200000] }
  });
  function config() { return {...defaults(), ...getJson(CFG_KEY, {})}; }
  function state() { return getJson(STATUS_KEY, {}); }
  function audit(action, id, detail) { const all=getJson(AUDIT_KEY,[]); all.push({at:new Date().toISOString(),actor:actor(),action,id,detail}); setJson(AUDIT_KEY, all.slice(-1200)); }
  function appointments() { try { return typeof allData !== 'undefined' ? allData.citas || [] : []; } catch (_) { return []; } }
  function payments() { try { return typeof operationsData !== 'undefined' ? operationsData.pagos || [] : []; } catch (_) { return []; } }
  function opportunities() { return global.PanelCommercialSales?.getOpportunities?.() || []; }
  function approvedFor(appointmentId) { return payments().filter(p => String(p.CitaID || p.CitaId || p.citaId || '') === String(appointmentId) && ['Aprobado','PAGO_APROBADO'].includes(clean(p.EstadoPago))); }
  function paidFor(appointmentId) { return approvedFor(appointmentId).reduce((s,p) => s + num(p.ValorRecibido ?? p.Valor ?? p.Monto), 0); }
  const ident = x => (clean(x.phone).replace(/\D/g,'').slice(-10) || clean(x.email).toLowerCase() || clean(x.patientName || x.nombre).toLowerCase());
  function linkedAppointment(o) { return appointments().find(c => String(c.id || c.ID) === String(o.appointmentId)); }
  function isFirstPurchase(o) {
    const ap = linkedAppointment(o); if (!ap) return false;
    const key = ident(o); const apDate = clean(ap.fecha || ap.FechaCita);
    return !appointments().some(c => {
      if (['Cancelada','No asistió'].includes(clean(c.estado || c.Estado))) return false;
      const same = key && (key === clean(c.telefono).replace(/\D/g,'').slice(-10) || key === clean(c.email).toLowerCase() || clean(o.patientName).toLowerCase() === clean(c.nombre).toLowerCase());
      return same && String(c.id || c.ID) !== String(o.appointmentId) && clean(c.fecha || c.FechaCita) < apDate;
    });
  }
  function isDirect(o, cfg) { return !!cfg.leaderName && clean(o.capturedBy).toLowerCase() === clean(cfg.leaderName).toLowerCase() && o.origin === 'Gestión comercial propia' && !!clean(o.directEvidence); }
  function incentiveCandidates(month, cfg) {
    const list=[]; const opps=opportunities();
    opps.forEach(o => {
      const ap=linkedAppointment(o); if (!ap || ym(ap.fecha || ap.FechaCita)!==month || ['Cancelada','No asistió'].includes(clean(ap.estado || ap.Estado))) return;
      const paid=Math.min(paidFor(o.appointmentId), Number(o.saleValue)||Infinity);
      const direct=isDirect(o,cfg) && isFirstPurchase(o);
      const inc=Math.max(0, Math.min(paid, Number(o.saleValue)||paid) - Number(o.initialValue || 0));
      const closeByLeader=!!cfg.leaderName && clean(o.closedBy).toLowerCase()===clean(cfg.leaderName).toLowerCase();
      if (direct) list.push({id:`CAP-${o.id}`,type:'Captación propia',opportunity:o,amount:Math.round(paid*cfg.capturePct/100),paid,eligible:paid>0,reason:paid>0?'Primera compra, captación directa documentada y pago aprobado.':'Pendiente de pago aprobado.'});
      if (Number(o.initialValue)>0 && inc>0 && closeByLeader) list.push({id:`TIC-${o.id}`,type:'Aumento de ticket',opportunity:o,amount:Math.round(inc*cfg.increasePct/100),paid,eligible:true,reason:`Incremento efectivamente cobrado: ${money(inc)}.`});
      if (direct && Number(o.initialValue)>0 && inc>0 && closeByLeader) { const ticket=list.find(x=>x.id===`TIC-${o.id}`); if(ticket) { ticket.eligible=false; ticket.conflict=true; ticket.reason='Requiere aprobación: coincide con captación sobre la misma venta.'; } }
    });
    const companies=getJson('crm_empresas',[]);
    companies.forEach((c,i) => {
      const activation=clean(c.fechaActivacion); const own=!!cfg.leaderName && clean(c.gestionadoPor).toLowerCase()===clean(cfg.leaderName).toLowerCase();
      if (!activation || !own || !c.aprobadoDireccion) return;
      const end=new Date(activation+'T12:00:00'); end.setDate(end.getDate()+Number(cfg.allianceDays));
      const accumulated=opps.filter(o => clean(o.allianceCampaign).toLowerCase()===clean(c.nombre).toLowerCase()).reduce((sum,o)=>{ const ap=linkedAppointment(o); const date=clean(ap?.fecha||ap?.FechaCita); return ap && new Date(date+'T12:00:00')>=new Date(activation+'T12:00:00') && new Date(date+'T12:00:00')<=end ? sum+paidFor(o.appointmentId):sum; },0);
      list.push({id:`ALI-${c.id || i}`,type:'Convenio efectivo',company:c,amount:Number(cfg.allianceBonus),paid:accumulated,eligible:accumulated>=Number(cfg.allianceVerifiedGoal),reason:accumulated>=Number(cfg.allianceVerifiedGoal)?'Meta de pagos verificados dentro de 90 días alcanzada.':`${money(accumulated)} de ${money(cfg.allianceVerifiedGoal)} dentro de los primeros ${cfg.allianceDays} días.`});
    });
    return list;
  }
  function metrics(month, cfg) {
    const citas=appointments(); const inMonth=citas.filter(c=>ym(c.fecha||c.FechaCita)===month); const uniq=new Map(); inMonth.forEach(c=>uniq.set(String(c.id||c.ID||`${c.nombre}-${c.fecha}-${c.hora}`),c)); const scheduled=[...uniq.values()];
    const valid=scheduled.filter(c=>!['Cancelada'].includes(clean(c.estado||c.Estado))); const cancelled=scheduled.filter(c=>clean(c.estado||c.Estado)==='Cancelada');
    const val=valid.reduce((s,c)=>s+num(c.precio||c.Precio),0); const all=citas.filter(c=>!['Cancelada','No asistió'].includes(clean(c.estado||c.Estado)));
    const newPatients=[...new Set(valid.filter(c=>!all.some(x=>clean(x.nombre).toLowerCase()===clean(c.nombre).toLowerCase() && clean(x.fecha||x.FechaCita)<clean(c.fecha||c.FechaCita))).map(c=>clean(c.nombre)))];
    const direct=opportunities().filter(o=>ym(o.firstContact)===month && isDirect(o,cfg)).length;
    const unique=new Set(valid.map(c=>clean(c.telefono).replace(/\D/g,'').slice(-10)||clean(c.nombre).toLowerCase())).size;
    return {scheduled:scheduled.length,nonCancelled:valid.length,cancelled:cancelled.length,cancelRate:scheduled.length?cancelled.length/scheduled.length*100:null,value:val,newPatients:newPatients.length,direct,ticket:valid.length?val/valid.length:null,incomePatient:unique?val/unique:null};
  }
  function bonusRows(m,cfg) {
    const g=cfg.goals, rows=[];
    const add=(key,label,value,min,objective,excellent,ob,eb,kind) => { const pass=kind==='low' ? value!==null && value<=objective : value!==null && value>=objective; const excel=kind==='low' ? value!==null && value<=excellent : value!==null && value>=excellent; rows.push({key,label,value,min,objective,excellent,amount:excel?eb:pass?ob:0,state:value===null?'No calculable':excel?'Sobresaliente':pass?'Objetivo':'En curso'}); };
    add('nonCancelled','Citas no canceladas',m.nonCancelled,cfg.minimums.nonCancelled,g.nonCancelled[0],g.nonCancelled[1],g.nonCancelled[2],g.nonCancelled[3]);
    add('value','Valor de servicios no cancelados',m.value,cfg.minimums.value,g.value[0],g.value[1],g.value[2],g.value[3]);
    add('direct','Nuevos captados directamente',m.direct,cfg.minimums.direct,g.direct[0],g.direct[1],g.direct[2],g.direct[3]);
    add('cancellation','Tasa de cancelación',m.cancelRate,cfg.minimums.cancellation,g.cancellation[0],g.cancellation[1],g.cancellation[2],g.cancellation[3],'low');
    const total=Math.min(400000,rows.reduce((s,r)=>s+r.amount,0)); return {rows,total};
  }
  function fmt(v, type) { return v===null?'No calculable':type==='money'?money(v):type==='pct'?`${v.toFixed(1)}%`:String(v); }
  function render() {
    const host=$('commercialIncentivesPanel'); if(!host) return; const month=$('comisMes')?.value || new Date().toISOString().slice(0,7); const cfg=config(); const m=metrics(month,cfg), bonus=bonusRows(m,cfg), cand=incentiveCandidates(month,cfg), statuses=state();
    const pending=cand.filter(x=>x.eligible && !statuses[x.id]).reduce((s,x)=>s+x.amount,0); const approved=cand.filter(x=>statuses[x.id]?.state==='Aprobado').reduce((s,x)=>s+x.amount,0); const paid=cand.filter(x=>statuses[x.id]?.state==='Pagado').reduce((s,x)=>s+x.amount,0);
    const card=(label,value,note,color='#0f766e')=>`<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};border-radius:10px;padding:11px"><div style="font-size:.7rem;color:var(--muted)">${label}</div><div style="font-size:1.05rem;font-weight:800;color:${color};margin-top:3px">${value}</div>${note?`<div style="font-size:.68rem;color:var(--muted);margin-top:3px">${note}</div>`:''}</div>`;
    const action=x=>{const st=statuses[x.id]?.state||'Pendiente de revisión'; if(!x.eligible)return `<span style="font-size:.72rem;color:var(--muted)">${esc(x.reason)}</span>`; if(!isDirection())return `<span style="font-size:.72rem;color:#b45309">${st}</span>`; return `<select onchange="PanelCommercialIncentives.setStatus('${x.id}',this.value)" style="font-size:.75rem;padding:5px;border:1px solid var(--border);border-radius:6px"><option ${st==='Pendiente de revisión'?'selected':''}>Pendiente de revisión</option><option ${st==='Aprobado'?'selected':''}>Aprobado</option><option ${st==='Rechazado o requiere ajuste'?'selected':''}>Rechazado o requiere ajuste</option><option ${st==='Pagado'?'selected':''}>Pagado</option></select>`;};
    host.innerHTML=`<section style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px;margin-top:16px"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:start"><div><h2 style="margin:0;font-family:var(--font-h);font-size:1.08rem">📊 Metas y bonificaciones — Líder Administrativa y Estratega Comercial</h2><p style="font-size:.78rem;color:var(--muted);margin:5px 0 12px">${cfg.individualEnabled?'Reglas activas para revisión, sin pagos automáticos.':'Modo de prueba: no genera liquidaciones económicas ni pagos.'} ${cfg.leaderName?`Líder: <b>${esc(cfg.leaderName)}</b>`:'Configura el nombre de la líder antes de atribuir incentivos.'}</p></div>${isDirection()?'<button class="co-cfg-btn" onclick="PanelCommercialIncentives.toggleConfig()">⚙ Configurar dirección</button>':''}</div>
      <div id="commercialIncentiveConfig" style="display:none;margin-bottom:14px"></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px">${card('Mes evaluado',month)}${card('Citas agendadas',m.scheduled,`mín. ${cfg.minimums.scheduled}`)}${card('No canceladas',m.nonCancelled,`mín. ${cfg.minimums.nonCancelled}`)}${card('Servicios no cancelados',money(m.value),`mín. ${money(cfg.minimums.value)}`)}${card('Nuevos empresa',m.newPatients,`mín. ${cfg.minimums.newPatients}`)}${card('Captados directamente',m.direct,`mín. ${cfg.minimums.direct}`)}${card('Cancelación',fmt(m.cancelRate,'pct'),`máx. ${cfg.minimums.cancellation}%`,m.cancelRate!==null&&m.cancelRate<=cfg.minimums.cancellation?'#059669':'#dc2626')}${card('Ticket promedio',fmt(m.ticket,'money'))}${card('Ingreso/paciente',fmt(m.incomePatient,'money'))}${card('Comisiones en revisión',money(pending),'sin pago automático','#b45309')}${card('Aprobadas',money(approved),'dirección','#2563eb')}${card('Pagadas',money(paid),'registro manual','#059669')}</div>
      <h3 style="font-size:.92rem;margin:20px 0 8px">Bonos mensuales de prueba</h3><div style="overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:.78rem"><thead><tr style="text-align:left;color:var(--muted)"><th>Indicador</th><th>Resultado</th><th>Mín.</th><th>Objetivo / sobresaliente</th><th>Estado</th><th>Bono</th></tr></thead><tbody>${bonus.rows.map(r=>`<tr style="border-top:1px solid var(--border)"><td>${r.label}</td><td>${fmt(r.value,r.key==='value'?'money':r.key==='cancellation'?'pct':'')}</td><td>${fmt(r.min,r.key==='value'?'money':r.key==='cancellation'?'pct':'')}</td><td>${fmt(r.objective,r.key==='value'?'money':r.key==='cancellation'?'pct':'')} / ${fmt(r.excellent,r.key==='value'?'money':r.key==='cancellation'?'pct':'')}</td><td>${r.state}</td><td><b>${money(r.amount)}</b></td></tr>`).join('')}</tbody></table></div><div style="font-size:.82rem;font-weight:700;margin-top:8px">Total de bonos en prueba: ${money(bonus.total)} <span style="font-weight:400;color:var(--muted)">(máximo mensual $400.000)</span></div>
      <h3 style="font-size:.92rem;margin:20px 0 8px">Comisiones individuales y convenios</h3><div style="display:grid;gap:8px">${cand.length?cand.map(x=>`<div style="border:1px solid var(--border);border-radius:9px;padding:10px;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><div><b>${esc(x.type)}</b> · ${esc(x.opportunity?.patientName || x.company?.nombre || '—')}<div style="font-size:.72rem;color:var(--muted);margin-top:3px">${esc(x.reason)}</div></div><div style="text-align:right"><b>${money(x.amount)}</b><br>${action(x)}</div></div>`).join(''):'<div style="font-size:.8rem;color:var(--muted)">No hay incentivos candidatos para este mes. Vincula oportunidad, cita y pagos aprobados.</div>'}</div></section>`;
  }
  function toggleConfig() { if(!isDirection())return; const p=$('commercialIncentiveConfig'); const cfg=config(); if(p.style.display==='block'){p.style.display='none';return;} p.style.display='block'; p.innerHTML=`<div style="border:1px solid var(--border);border-radius:10px;padding:12px;font-size:.8rem"><b>Configuración exclusiva de dirección</b><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-top:8px"><label>Nombre de la líder<input id="ciLeader" value="${esc(cfg.leaderName)}"></label><label>Vigente desde<input id="ciFrom" type="date" value="${esc(cfg.effectiveFrom)}"></label><label>Captación %<input id="ciCapture" type="number" value="${cfg.capturePct}"></label><label>Incremento ticket %<input id="ciIncrease" type="number" value="${cfg.increasePct}"></label><label>Bono convenio<input id="ciAlliance" type="number" value="${cfg.allianceBonus}"></label><label>Meta convenio<input id="ciGoal" type="number" value="${cfg.allianceVerifiedGoal}"></label><label><input id="ciActive" type="checkbox" ${cfg.individualEnabled?'checked':''}> Activar cálculo individual oficial</label></div><div style="font-size:.72rem;color:#b45309;margin:8px 0">Por seguridad queda desactivado inicialmente. Activarlo habilita revisión, nunca pagos automáticos.</div><button class="btn btn-teal btn-sm" onclick="PanelCommercialIncentives.saveConfig()">Guardar configuración</button></div>`; }
  function saveConfig() { if(!isDirection())return; const cfg=config(); cfg.leaderName=clean($('ciLeader').value); cfg.effectiveFrom=clean($('ciFrom').value); cfg.capturePct=Number($('ciCapture').value); cfg.increasePct=Number($('ciIncrease').value); cfg.allianceBonus=Number($('ciAlliance').value); cfg.allianceVerifiedGoal=Number($('ciGoal').value); cfg.individualEnabled=$('ciActive').checked; setJson(CFG_KEY,cfg); audit('Configuración actualizada','CONFIG',`Vigente desde ${cfg.effectiveFrom}`); render(); }
  function setStatus(id,value) { if(!isDirection())return; const all=state(); all[id]={state:value,by:actor(),at:new Date().toISOString()}; setJson(STATUS_KEY,all); audit('Estado incentivo',id,value); render(); }
  global.PanelCommercialIncentives=Object.freeze({render,toggleConfig,saveConfig,setStatus,_test:{isDirect,bonusRows,incentiveCandidates,metrics}});
  const original=global.renderComisiones; if(typeof original==='function') global.renderComisiones=function(){const out=original.apply(this,arguments); setTimeout(render,0); return out;};
})(window);
