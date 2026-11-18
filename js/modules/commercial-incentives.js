/* Incentivos comerciales: candidatos auditables; nunca crea pagos ni altera historia. */
(function (global) {
  'use strict';
  const CFG='commercial_incentives_config_v1', STATUS='commercial_incentives_status_v1', AUDIT='commercial_incentives_audit_v1';
  const $=id=>document.getElementById(id), clean=v=>String(v||'').trim(), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=v=>'$'+Math.round(Number(v)||0).toLocaleString('es-CO'), ym=d=>String(d||'').slice(0,7);
  const num=v=>typeof global.parsePrecio==='function'?global.parsePrecio(v):Number(String(v||0).replace(/[^0-9.-]/g,''))||0;
  const user=()=>{try{return typeof currentAdminUser!=='undefined'?currentAdminUser||{}:{}}catch(_){return{}}}, actor=()=>clean(user().nombre||user().name||'Usuario administrador');
  // Aprobaciones y liquidaciones: solo Jessica.
  const isJessica=()=>/jessica/.test(actor().toLowerCase());
  const get=(k,f)=>{try{const raw=global.kvGet?.(k);return raw?JSON.parse(raw):f}catch(_){return f}}, put=(k,v)=>{global.kvSet?.(k,JSON.stringify(v));global.PanelStorage?._flushKV?.()};
  const defaults=()=>({effectiveFrom:'2026-11-08',leaderName:'',individualEnabled:false,capturePct:5,increasePct:10,allianceBonus:50000,allianceVerifiedGoal:500000,allianceDays:90,giftDeadline:'2026-12-15',giftGoal:100,giftBaseBonus:100000,giftExtraUnit:2000,goals:{confirmed:[165,180,50000,100000],value:[12500000,14000000,75000,150000],direct:[6,10,50000,100000],cancellation:[14,12,25000,50000]}});
  const cfg=()=>{const d=defaults(),s=get(CFG,{});return {...d,...s,goals:{...d.goals,...(s.goals||{})}}}, audit=(action,id,detail)=>{const rows=get(AUDIT,[]);rows.push({at:new Date().toISOString(),actor:actor(),action,id,detail});put(AUDIT,rows.slice(-1200))};
  const citas=()=>{try{return typeof allData!=='undefined'?allData.citas||[]:[]}catch(_){return[]}}, pagos=()=>{try{return typeof operationsData!=='undefined'?operationsData.pagos||[]:[]}catch(_){return[]}}, opps=()=>global.PanelCommercialSales?.getOpportunities?.()||[];
  const id=c=>String(c?.id||c?.ID||''), date=c=>clean(c?.fecha||c?.FechaCita), status=c=>clean(c?.estado||c?.Estado), valid=c=>!['Cancelada','No asistió','No asistio'].includes(status(c)), confirmed=c=>['Confirmada','Atendida','Pagada','PAGO_APROBADO'].includes(status(c));
  const paid=id=>pagos().filter(p=>String(p.CitaID||p.CitaId||p.citaId||'')===String(id)&&['Aprobado','PAGO_APROBADO'].includes(clean(p.EstadoPago))).reduce((s,p)=>s+num(p.ValorRecibido??p.Valor??p.Monto),0);
  const linked=o=>citas().find(c=>id(c)===String(o.appointmentId)), match=(name,c)=>!!c.leaderName&&clean(name).toLowerCase()===clean(c.leaderName).toLowerCase();
  const ident=(o,c)=>clean(o.phone).replace(/\D/g,'').slice(-10)||clean(o.email).toLowerCase()||clean(c?.telefono).replace(/\D/g,'').slice(-10)||clean(o.patientName).toLowerCase();
  function first(o){const ap=linked(o),key=ident(o,ap);return !!(ap&&key)&&!citas().some(c=>valid(c)&&id(c)!==id(ap)&&date(c)<date(ap)&&(key===clean(c.telefono).replace(/\D/g,'').slice(-10)||key===clean(c.email).toLowerCase()||key===clean(c.nombre).toLowerCase()))}
  const direct=(o,c)=>match(o.capturedBy,c)&&o.origin==='Gestión comercial propia'&&!!clean(o.directEvidence), fullyPaid=o=>{const sale=Number(o.saleValue||0),value=paid(o.appointmentId);return sale>0&&value>=sale?value:0};
  function candidates(month,c){const out=[];opps().forEach(o=>{const ap=linked(o);if(!ap||ym(date(ap))!==month||!valid(ap))return;const value=fullyPaid(o),cap=direct(o,c)&&first(o),increment=Math.max(0,Math.min(value,Number(o.saleValue||0))-Number(o.initialValue||0)),closed=match(o.closedBy,c);if(cap)out.push({id:'CAP-'+o.id,type:'Captación directa (primera compra)',o,amount:Math.round(value*c.capturePct/100),eligible:value>0,reason:value?'Primera compra directa documentada y pagada/verificada.':'Esperando pago completo y verificado.'});if(Number(o.initialValue)>0&&Number(o.saleValue)>Number(o.initialValue)&&increment>0&&closed&&clean(o.ticketEvidence))out.push({id:'TIC-'+o.id,type:'Incremento real de ticket',o,amount:Math.round(increment*c.increasePct/100),eligible:true,reason:`Incremento documentado y pagado/verificado: ${money(increment)}.`});const t=out.find(x=>x.id==='TIC-'+o.id);if(cap&&t){t.eligible=false;t.reason='No se duplica: la misma venta ya tiene candidato de captación directa.'}});get('crm_empresas',[]).forEach((x,i)=>{const start=clean(x.fechaActivacion);if(!start||!match(x.gestionadoPor,c)||!x.aprobadoDireccion)return;const end=new Date(start+'T12:00:00');end.setDate(end.getDate()+Number(c.allianceDays));const got=opps().filter(o=>clean(o.allianceCampaign).toLowerCase()===clean(x.nombre).toLowerCase()).reduce((s,o)=>{const ap=linked(o);return ap&&new Date(date(ap)+'T12:00:00')>=new Date(start+'T12:00:00')&&new Date(date(ap)+'T12:00:00')<=end?s+fullyPaid(o):s},0);out.push({id:'ALI-'+(x.id||i),type:'Nueva alianza comercial',company:x,amount:Number(c.allianceBonus),eligible:got>=Number(c.allianceVerifiedGoal),reason:`${money(got)} de ${money(c.allianceVerifiedGoal)} verificados en los primeros ${c.allianceDays} días.`})});return out}
  function gift(c){const end=new Date(c.giftDeadline+'T23:59:59'),items=opps().filter(o=>{const ap=linked(o);return Number(o.giftVoucherUnits||0)>0&&ap&&new Date(date(ap)+'T12:00:00')<=end&&match(o.attendedBy,c)&&match(o.closedBy,c)&&fullyPaid(o)>0}),units=items.reduce((s,o)=>s+Number(o.giftVoucherUnits||0),0),amount=units>=c.giftGoal?c.giftBaseBonus+Math.max(0,units-c.giftGoal)*c.giftExtraUnit:0;return{id:'GIFT-2026',type:'Campaña bonos de regalo',units,amount,eligible:units>=c.giftGoal,reason:units>=c.giftGoal?`${units} bonos pagados, gestionados y cerrados por la líder. ${money(c.giftBaseBonus)} + ${money(c.giftExtraUnit)} por bono después del #${c.giftGoal}.`:`${units}/${c.giftGoal} bonos pagados, gestionados y cerrados por la líder antes del ${c.giftDeadline}.`}}
  function metrics(month,c){const all=citas(),list=[...new Map(all.filter(x=>ym(date(x))===month).map(x=>[id(x)||`${x.nombre}-${date(x)}-${x.hora}`,x])).values()],ok=list.filter(confirmed),cancelled=list.filter(x=>status(x)==='Cancelada'),value=ok.reduce((s,x)=>s+num(x.precio||x.Precio),0),directs=opps().filter(o=>ym(o.firstContact)===month&&direct(o,c)&&first(o)&&fullyPaid(o)>0).length;return{confirmed:ok.length,cancelled:cancelled.length,value,direct:directs}}
  function bonuses(m,c){const add=(key,label,value,arr,low)=>{const great=low?value<=arr[1]:value>=arr[1],goal=low?value<=arr[0]:value>=arr[0];return{key,label,value,objective:arr[0],excellent:arr[1],amount:great?arr[3]:goal?arr[2]:0,state:great?'Sobresaliente':goal?'Objetivo':'En curso'}},r=[add('confirmed','Citas confirmadas',m.confirmed,c.goals.confirmed),add('value','Valor de servicios confirmados',m.value,c.goals.value),add('direct','Nuevos pacientes captados directamente',m.direct,c.goals.direct),add('cancellation','Cancelaciones',m.cancelled,c.goals.cancellation,true)];return{rows:r,total:r.reduce((s,x)=>s+x.amount,0)}}
  function render(){const host=$('commercialIncentivesPanel');if(!host)return;const month=$('comisMes')?.value||new Date().toISOString().slice(0,7),c=cfg(),m=metrics(month,c),b=bonuses(m,c),all=[...candidates(month,c),gift(c)],states=get(STATUS,{}),sum=s=>all.filter(x=>states[x.id]?.state===s).reduce((n,x)=>n+x.amount,0),fmt=(v,t)=>t==='money'?money(v):String(v),card=(l,v,n,color='#0f766e')=>`<div style="background:var(--s2);border:1px solid var(--border);border-left:3px solid ${color};border-radius:10px;padding:11px"><div style="font-size:.7rem;color:var(--muted)">${l}</div><div style="font-size:1.05rem;font-weight:800;color:${color};margin-top:3px">${v}</div>${n?`<div style="font-size:.68rem;color:var(--muted);margin-top:3px">${n}</div>`:''}</div>`,action=x=>{const s=states[x.id]?.state||'Pendiente de revisión';if(!x.eligible)return `<span style="font-size:.72rem;color:var(--muted)">${esc(x.reason)}</span>`;if(!isJessica())return `<span style="font-size:.72rem;color:#b45309">${esc(s)} · aprueba Jessica</span>`;return `<select onchange="PanelCommercialIncentives.setStatus('${x.id}',this.value)" style="font-size:.75rem;padding:5px;border:1px solid var(--border);border-radius:6px"><option ${s==='Pendiente de revisión'?'selected':''}>Pendiente de revisión</option><option ${s==='Aprobado'?'selected':''}>Aprobado</option><option ${s==='Rechazado o requiere ajuste'?'selected':''}>Rechazado o requiere ajuste</option><option ${s==='Pagado'?'selected':''}>Pagado</option></select>`};host.innerHTML=`<section style="background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px;margin-top:16px"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><h2 style="margin:0;font-family:var(--font-h);font-size:1.08rem">📊 Comisiones y bonificaciones comerciales</h2><p style="font-size:.78rem;color:var(--muted);margin:5px 0 12px">Vigentes desde ${c.effectiveFrom}. Reactivaciones y renovaciones se miden, pero no generan comisión individual. No se crean pagos automáticos.</p></div>${isJessica()?'<button class="co-cfg-btn" onclick="PanelCommercialIncentives.toggleConfig()">⚙ Configurar (Jessica)</button>':''}</div><div id="commercialIncentiveConfig" style="display:none;margin-bottom:14px"></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px">${card('Citas confirmadas',m.confirmed)}${card('Servicios confirmados',money(m.value))}${card('Captados directos nuevos',m.direct)}${card('Cancelaciones',m.cancelled,`meta: ≤ ${c.goals.cancellation[0]} / ≤ ${c.goals.cancellation[1]}`)}${card('Por revisar',money(all.filter(x=>x.eligible&&!states[x.id]).reduce((s,x)=>s+x.amount,0)),'no es pago automático','#b45309')}${card('Aprobadas',money(sum('Aprobado')),'solo Jessica','#2563eb')}${card('Pagadas',money(sum('Pagado')),'registro auditado')}</div><h3 style="font-size:.92rem;margin:20px 0 8px">Bonos mensuales</h3><div style="overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:.78rem"><thead><tr style="text-align:left;color:var(--muted)"><th>Indicador</th><th>Resultado</th><th>Objetivo / sobresaliente</th><th>Estado</th><th>Bono</th></tr></thead><tbody>${b.rows.map(r=>`<tr style="border-top:1px solid var(--border)"><td>${r.label}</td><td>${fmt(r.value,r.key==='value'?'money':'')}</td><td>${fmt(r.objective,r.key==='value'?'money':'')} / ${fmt(r.excellent,r.key==='value'?'money':'')}</td><td>${r.state}</td><td><b>${money(r.amount)}</b></td></tr>`).join('')}</tbody></table></div><div style="font-size:.82rem;font-weight:700;margin-top:8px">Total de bonos del mes: ${money(b.total)} <span style="font-weight:400;color:var(--muted)">No se acumulan objetivo y sobresaliente en un mismo indicador.</span></div><h3 style="font-size:.92rem;margin:20px 0 8px">Candidatos individuales y campañas</h3><div style="display:grid;gap:8px">${all.map(x=>`<div style="border:1px solid var(--border);border-radius:9px;padding:10px;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap"><div><b>${esc(x.type)}</b> · ${esc(x.o?.patientName||x.company?.nombre||`${x.units||0} bonos`)}<div style="font-size:.72rem;color:var(--muted);margin-top:3px">${esc(x.reason)}</div></div><div style="text-align:right"><b>${money(x.amount)}</b><br>${action(x)}</div></div>`).join('')}</div></section>`}
  function toggleConfig(){if(!isJessica())return;const p=$('commercialIncentiveConfig'),c=cfg();if(p.style.display==='block'){p.style.display='none';return}p.style.display='block';p.innerHTML=`<div style="border:1px solid var(--border);border-radius:10px;padding:12px;font-size:.8rem"><b>Configuración exclusiva de Jessica</b><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-top:8px"><label>Nombre de la líder<input id="ciLeader" value="${esc(c.leaderName)}"></label><label>Vigente desde<input id="ciFrom" type="date" value="${esc(c.effectiveFrom)}"></label><label>Captación %<input id="ciCapture" type="number" value="${c.capturePct}"></label><label>Incremento ticket %<input id="ciIncrease" type="number" value="${c.increasePct}"></label><label>Bono alianza<input id="ciAlliance" type="number" value="${c.allianceBonus}"></label><label>Meta alianza<input id="ciGoal" type="number" value="${c.allianceVerifiedGoal}"></label><label><input id="ciActive" type="checkbox" ${c.individualEnabled?'checked':''}> Activar cálculo oficial (solo revisión)</label></div><div style="font-size:.72rem;color:#b45309;margin:8px 0">Reactivación y renovación: $0 individual. Aprobaciones, ajustes y liquidaciones: solo Jessica.</div><button class="btn btn-teal btn-sm" onclick="PanelCommercialIncentives.saveConfig()">Guardar configuración</button></div>`}
  function saveConfig(){if(!isJessica())return;const c=cfg();c.leaderName=clean($('ciLeader').value);c.effectiveFrom=clean($('ciFrom').value);c.capturePct=Number($('ciCapture').value);c.increasePct=Number($('ciIncrease').value);c.allianceBonus=Number($('ciAlliance').value);c.allianceVerifiedGoal=Number($('ciGoal').value);c.individualEnabled=$('ciActive').checked;put(CFG,c);audit('Configuración actualizada','CONFIG',`Vigente desde ${c.effectiveFrom}`);render()}
  function setStatus(id,value){if(!isJessica())return;const all=get(STATUS,{});all[id]={state:value,by:actor(),at:new Date().toISOString()};put(STATUS,all);audit('Estado incentivo',id,value);render()}
  global.PanelCommercialIncentives=Object.freeze({render,toggleConfig,saveConfig,setStatus,_test:{direct,first,candidates,metrics,bonuses,gift}});const original=global.renderComisiones;if(typeof original==='function')global.renderComisiones=function(){const out=original.apply(this,arguments);setTimeout(render,0);return out};
})(window);

/* Bonos de redes e incentivo Natalia: mismo módulo de comisiones, sin tocar reglas de Michelle. */
(function (global) {
  'use strict';

  const CONFIG_KEY = 'special_incentives_config_v1';
  const SOURCE_KEY = 'special_incentives_sources_v1';
  const STATUS_KEY = 'special_incentives_status_v1';
  const AUDIT_KEY = 'special_incentives_audit_v1';
  const LEVELS = [
    { leads: 15, buyers: 5, amount: 75000 },
    { leads: 25, buyers: 10, amount: 150000 },
    { leads: 40, buyers: 15, amount: 250000 },
    { leads: 55, buyers: 20, amount: 300000 }
  ];
  const $ = id => document.getElementById(id);
  const clean = value => String(value || '').trim();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const money = value => '$' + Math.round(Number(value) || 0).toLocaleString('es-CO');
  const dateMonth = value => clean(value).slice(0, 7);
  const num = value => typeof global.parsePrecio === 'function'
    ? global.parsePrecio(value)
    : Number(String(value || 0).replace(/[^0-9.-]/g, '')) || 0;

  function currentUser() {
    try { return typeof currentAdminUser !== 'undefined' ? currentAdminUser || {} : global.currentAdminUser || {}; }
    catch (_) { return global.currentAdminUser || {}; }
  }
  function actor() { const u = currentUser(); return clean(u.nombre || u.name || 'Administración'); }
  function isJessica() {
    const u = currentUser();
    return /jessica|administracion/.test(actor().toLowerCase()) || /superadministradora/i.test(clean(u.rol));
  }
  function get(key, fallback) {
    try { const raw = global.kvGet?.(key); return raw ? JSON.parse(raw) : fallback; }
    catch (_) { return fallback; }
  }
  function put(key, value) {
    global.kvSet?.(key, JSON.stringify(value));
    global.PanelStorage?._flushKV?.();
  }
  function config() {
    const saved = get(CONFIG_KEY, {});
    return {
      socialResponsible: clean(saved.socialResponsible || 'Responsable de redes (sin asignar)'),
      calendars: saved.calendars && typeof saved.calendars === 'object' ? saved.calendars : {}
    };
  }
  function sources() { const value = get(SOURCE_KEY, {}); return value && typeof value === 'object' ? value : {}; }
  function states() { const value = get(STATUS_KEY, {}); return value && typeof value === 'object' ? value : {}; }
  function audit(action, detail) {
    const rows = get(AUDIT_KEY, []);
    rows.push({ at: new Date().toISOString(), actor: actor(), action, detail });
    put(AUDIT_KEY, rows.slice(-5000));
  }
  function opportunities() {
    try { return global.PanelCommercialSales?.getOpportunities?.() || []; }
    catch (_) { return []; }
  }
  function appointments() {
    try { return global.allData?.citas || allData?.citas || []; }
    catch (_) { return global.allData?.citas || []; }
  }
  function payments() {
    try { return global.operationsData?.pagos || operationsData?.pagos || []; }
    catch (_) { return global.operationsData?.pagos || []; }
  }
  function appointmentId(item) { return String(item?.id || item?.ID || ''); }
  function appointmentFor(opportunity) {
    const all = appointments();
    const direct = clean(opportunity.appointmentId);
    if (direct) return all.find(item => appointmentId(item) === direct) || null;
    const phone = clean(opportunity.phone).replace(/\D/g, '').slice(-10);
    const name = clean(opportunity.patientName).toLowerCase();
    return all.filter(item => (phone && clean(item.telefono).replace(/\D/g, '').slice(-10) === phone) || (!phone && name && clean(item.nombre).toLowerCase() === name))
      .sort((a, b) => clean(b.fecha).localeCompare(clean(a.fecha)))[0] || null;
  }
  function identity(opportunity, appointment) {
    const phone = clean(opportunity?.phone || appointment?.telefono).replace(/\D/g, '').slice(-10);
    const email = clean(opportunity?.email || appointment?.email).toLowerCase();
    const name = clean(opportunity?.patientName || appointment?.nombre).toLowerCase().replace(/\s+/g, ' ');
    return phone ? `p:${phone}` : email ? `e:${email}` : name ? `n:${name}` : '';
  }
  function paidVerified(appointment) {
    if (!appointment) return 0;
    const id = appointmentId(appointment);
    return payments().filter(payment => String(payment.CitaID || payment.CitaId || payment.citaId || '') === id && ['Aprobado', 'PAGO_APROBADO', 'Pago verificado'].includes(clean(payment.EstadoPago)))
      .reduce((sum, payment) => sum + num(payment.ValorRecibido ?? payment.Valor ?? payment.Monto), 0);
  }
  function attended(appointment) { return ['Atendida', 'Sesión atendida'].includes(clean(appointment?.estado || appointment?.Estado)); }
  function isSocialOrigin(opportunity) { return /(instagram|facebook|tiktok|redes)/i.test(clean(opportunity?.origin)); }
  function isExternalNataliaOrigin(opportunity) { return /(google|publicidad|instagram|facebook|tiktok|redes|michelle)/i.test(clean(opportunity?.origin)); }
  function isFirstAppointment(opportunity, appointment) {
    const key = identity(opportunity, appointment);
    const date = clean(appointment?.fecha);
    if (!key || !date) return false;
    return !appointments().some(other => {
      if (appointmentId(other) === appointmentId(appointment)) return false;
      const otherState = clean(other.estado || other.Estado);
      if (['Cancelada', 'No asistió', 'No asistio'].includes(otherState)) return false;
      const otherKey = identity({}, other);
      return otherKey === key && clean(other.fecha) < date;
    });
  }
  function bestLevel(leads, buyers) {
    return LEVELS.reduce((best, level) => leads >= level.leads && buyers >= level.buyers ? level : best, null);
  }
  function socialData(month) {
    const verified = sources();
    const byPerson = new Map();
    opportunities().filter(opportunity => dateMonth(opportunity.firstContact) === month && isSocialOrigin(opportunity) && verified[opportunity.id]?.social === 'organic')
      .sort((a, b) => clean(a.firstContact).localeCompare(clean(b.firstContact)) || clean(a.id).localeCompare(clean(b.id)))
      .forEach(opportunity => {
        const appointment = appointmentFor(opportunity);
        const key = identity(opportunity, appointment);
        if (key && !byPerson.has(key)) byPerson.set(key, { opportunity, appointment, key });
      });
    const leads = [...byPerson.values()];
    const buyers = leads.filter(row => paidVerified(row.appointment) > 0);
    const currentConfig = config();
    const calendar = currentConfig.calendars[month] || {};
    const planned = Math.max(0, Number(calendar.planned) || 0);
    const published = Math.max(0, Number(calendar.published) || 0);
    const calendarPct = planned > 0 ? published / planned * 100 : null;
    const level = bestLevel(leads.length, buyers.length);
    const eligible = !!level && calendarPct !== null && calendarPct >= 90;
    return { leads, buyers, planned, published, calendarPct, level, calculated: eligible ? level.amount : 0, eligible, responsible: currentConfig.socialResponsible };
  }
  function nataliaData(month) {
    const source = sources();
    const existingStates = get('commercial_incentives_status_v1', {});
    const unique = new Map();
    opportunities().forEach(opportunity => {
      const appointment = appointmentFor(opportunity);
      const meta = source[opportunity.id] || {};
      const appointmentMonth = dateMonth(appointment?.fecha);
      const capturedByNatalia = /natalia/.test(clean(opportunity.capturedBy).toLowerCase());
      const hasOtherCommission = ['Aprobado', 'Pagado'].includes(existingStates[`CAP-${opportunity.id}`]?.state) || ['Aprobado', 'Pagado'].includes(existingStates[`TIC-${opportunity.id}`]?.state);
      const saleTypeAllowed = !/reactivaci|renovaci/i.test(clean(opportunity.status || '') + ' ' + clean(opportunity.saleType || ''));
      const conditions = {
        period: appointmentMonth === month,
        capturedByNatalia,
        directCapture: meta.nataliaDirect === true,
        newClient: isFirstAppointment(opportunity, appointment),
        wellness: meta.wellnessEligible === true,
        minimumValue: Number(opportunity.saleValue || 0) >= 125000,
        paid: paidVerified(appointment) >= 125000,
        attended: attended(appointment),
        allowedOrigin: !isExternalNataliaOrigin(opportunity),
        saleTypeAllowed,
        noOtherCommission: !hasOtherCommission
      };
      const key = identity(opportunity, appointment);
      const ready = Object.values(conditions).every(Boolean);
      if (key && ready && !unique.has(key)) unique.set(key, { opportunity, appointment, key, conditions });
    });
    const candidates = [...unique.values()];
    return { candidates, potential: candidates.length * 10000, liquidable: 0, legalHold: true };
  }
  function statusFor(key) { return states()[key] || { state: 'Pendiente de aprobación' }; }
  function saveSocialStatus(month, state) {
    if (!isJessica()) return;
    const data = socialData(month);
    if (state === 'Aprobada' && !data.eligible) return;
    const all = states();
    all[`social-${month}`] = { state, amount: data.calculated, period: month, approvedBy: actor(), at: new Date().toISOString() };
    put(STATUS_KEY, all);
    audit(`Bono redes ${state.toLowerCase()}`, `${month} · ${money(data.calculated)} · responsable: ${data.responsible}`);
    render();
  }
  function saveCalendar(month) {
    if (!isJessica()) return;
    const current = config();
    current.socialResponsible = clean($('specialSocialResponsible')?.value) || 'Responsable de redes (sin asignar)';
    current.calendars[month] = {
      planned: Math.max(0, Number($('specialCalendarPlanned')?.value) || 0),
      published: Math.max(0, Number($('specialCalendarPublished')?.value) || 0)
    };
    put(CONFIG_KEY, current);
    audit('Calendario redes actualizado', `${month} · ${current.calendars[month].published}/${current.calendars[month].planned} publicaciones · responsable: ${current.socialResponsible}`);
    render();
  }
  function setSocialSource(opportunityId, value) {
    if (!isJessica()) return;
    const all = sources();
    all[opportunityId] = { ...(all[opportunityId] || {}), social: value, updatedBy: actor(), updatedAt: new Date().toISOString() };
    put(SOURCE_KEY, all);
    audit('Origen social validado', `${opportunityId} · ${value || 'pendiente'}`);
    render();
  }
  function pct(value) { return value === null ? 'Sin calendario' : `${Math.round(value * 10) / 10}%`; }
  function badge(text, color) { return `<span style="display:inline-block;padding:3px 8px;border-radius:999px;background:${color}18;color:${color};font-size:.71rem;font-weight:700">${esc(text)}</span>`; }
  function socialRows(month) {
    const checked = sources();
    const rows = opportunities().filter(opportunity => dateMonth(opportunity.firstContact) === month && isSocialOrigin(opportunity));
    if (!rows.length) return '<div style="font-size:.78rem;color:var(--muted);padding:10px 0">No hay oportunidades de redes sociales registradas para este periodo.</div>';
    return `<details style="margin-top:12px"><summary style="cursor:pointer;font-size:.8rem;font-weight:700">Validar origen orgánico (${rows.length} registros de redes)</summary><div style="display:grid;gap:7px;margin-top:9px">${rows.map(opportunity => {
      const selected = checked[opportunity.id]?.social || '';
      const label = `${clean(opportunity.patientName || 'Interesado')} · ${clean(opportunity.origin)} · ${clean(opportunity.service || 'Servicio por definir')}`;
      const controls = isJessica() ? `<select data-social-source="${esc(opportunity.id)}" style="font-size:.75rem;padding:5px;border:1px solid var(--border);border-radius:6px;background:var(--s1);color:var(--text)"><option value="" ${!selected ? 'selected' : ''}>Pendiente de validar</option><option value="organic" ${selected === 'organic' ? 'selected' : ''}>Orgánico real</option><option value="exclude" ${selected === 'exclude' ? 'selected' : ''}>Excluir: pauta / no verificable</option></select>` : badge(selected === 'organic' ? 'Orgánico real' : 'Pendiente de validar', selected === 'organic' ? '#15803d' : '#b45309');
      return `<div style="display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap;border-top:1px solid var(--border);padding-top:7px"><span style="font-size:.76rem">${esc(label)}</span>${controls}</div>`;
    }).join('')}</div></details>`;
  }
  function render() {
    const parent = $('commercialIncentivesPanel');
    if (!parent) return;
    let host = $('specialIncentivesPanel');
    if (!host) { host = document.createElement('div'); host.id = 'specialIncentivesPanel'; parent.appendChild(host); }
    const month = $('comisMes')?.value || new Date().toISOString().slice(0, 7);
    const social = socialData(month);
    const natalia = nataliaData(month);
    const socialStatus = statusFor(`social-${month}`);
    const selectedLevel = social.level ? `${social.level.leads} interesados / ${social.level.buyers} compradores` : 'Aún no alcanza un nivel';
    const socialState = social.eligible ? socialStatus.state : (social.calendarPct === null ? 'Falta registrar calendario' : social.calendarPct < 90 ? 'Calendario inferior al 90%' : 'Metas aún no cumplidas');
    const sourceHelp = `Solo se cuentan oportunidades de Instagram, Facebook, TikTok o redes que Jessica valide como <strong>Orgánico real</strong>; se deduplican por teléfono, correo o nombre.`;
    host.innerHTML = `
      <section style="margin-top:18px;background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
          <div><h2 style="margin:0;font-family:var(--font-h);font-size:1.08rem">Incentivos especiales</h2><p style="font-size:.78rem;color:var(--muted);margin:5px 0 0">Se calculan desde Gestión Comercial, citas y pagos verificados. No crean pagos automáticos ni modifican las comisiones vigentes de Michelle.</p></div>
          ${badge(month, '#2563eb')}
        </div>

        <div style="margin-top:16px;border:1px solid rgba(20,184,166,.35);border-radius:12px;padding:14px;background:rgba(20,184,166,.04)">
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b>📱 Bono de Crecimiento Digital — Redes Sociales</b><div style="font-size:.75rem;color:var(--muted);margin-top:3px">Responsable: ${esc(social.responsible)} · periodo: ${esc(month)}</div></div>${badge(socialState, social.eligible && socialStatus.state === 'Aprobada' ? '#15803d' : '#b45309')}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-top:12px">
            <div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Interesados orgánicos nuevos</small><b style="display:block;font-size:1.15rem;color:var(--primary-h)">${social.leads.length}</b></div>
            <div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Compradores con pago verificado</small><b style="display:block;font-size:1.15rem;color:var(--primary-h)">${social.buyers.length}</b></div>
            <div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Calendario publicado</small><b style="display:block;font-size:1.15rem;color:var(--primary-h)">${social.published}/${social.planned || '—'} · ${pct(social.calendarPct)}</b></div>
            <div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Bono calculado</small><b style="display:block;font-size:1.15rem;color:${social.calculated ? '#15803d' : 'var(--muted)'}">${money(social.calculated)}</b></div>
          </div>
          <div style="font-size:.76rem;color:var(--muted);margin-top:10px">Nivel más alto: <strong>${esc(selectedLevel)}</strong>. Deben cumplirse ambas metas y al menos 90% del calendario. No se acumulan niveles.</div>
          <div style="overflow:auto;margin-top:10px"><table style="width:100%;border-collapse:collapse;font-size:.75rem"><thead><tr style="text-align:left;color:var(--muted)"><th>Interesados</th><th>Compradores</th><th>Bono</th><th>Resultado</th></tr></thead><tbody>${LEVELS.map(level => `<tr style="border-top:1px solid var(--border)"><td>${level.leads}</td><td>${level.buyers}</td><td>${money(level.amount)}</td><td>${social.level?.amount === level.amount ? badge('Nivel mayor alcanzado', '#15803d') : '—'}</td></tr>`).join('')}</tbody></table></div>
          ${isJessica() ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button data-social-state="Aprobada" ${social.eligible ? '' : 'disabled'} style="padding:7px 11px;border:0;border-radius:7px;background:${social.eligible ? 'var(--primary)' : '#cbd5e1'};color:#fff;cursor:${social.eligible ? 'pointer' : 'not-allowed'}">✓ Aprobar liquidación</button><button data-social-state="Rechazada" style="padding:7px 11px;border:1px solid #fecaca;border-radius:7px;background:#fff;color:#b91c1c;cursor:pointer">Rechazar</button><span style="font-size:.74rem;color:var(--muted);align-self:center">Solo Jessica aprueba o rechaza. Aprobar registra la liquidación; no realiza pago.</span></div>` : `<div style="font-size:.76rem;color:#b45309;margin-top:12px">Liquidación: ${esc(socialStatus.state)} · solo Jessica puede aprobar o rechazar.</div>`}
          ${isJessica() ? `<details style="margin-top:12px"><summary style="cursor:pointer;font-size:.8rem;font-weight:700">Configurar responsable y calendario</summary><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:9px"><label style="font-size:.75rem">Responsable<br><input id="specialSocialResponsible" value="${esc(social.responsible)}" style="margin-top:4px;padding:7px;border:1px solid var(--border);border-radius:7px;background:var(--s2);color:var(--text)"></label><label style="font-size:.75rem">Publicaciones planeadas<br><input id="specialCalendarPlanned" type="number" min="0" value="${social.planned || ''}" style="margin-top:4px;width:112px;padding:7px;border:1px solid var(--border);border-radius:7px;background:var(--s2);color:var(--text)"></label><label style="font-size:.75rem">Publicadas<br><input id="specialCalendarPublished" type="number" min="0" value="${social.published || ''}" style="margin-top:4px;width:112px;padding:7px;border:1px solid var(--border);border-radius:7px;background:var(--s2);color:var(--text)"></label><button id="specialSaveCalendar" style="align-self:end;padding:7px 11px;border:0;border-radius:7px;background:var(--primary);color:#fff;cursor:pointer">Guardar</button></div></details>` : ''}
          <div style="font-size:.74rem;color:var(--muted);margin-top:9px">${sourceHelp}</div>${socialRows(month)}
        </div>

        <div style="margin-top:14px;border:1px solid rgba(245,158,11,.45);border-radius:12px;padding:14px;background:rgba(245,158,11,.06)">
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b>⚖️ Incentivo por referidos — Natalia Rodríguez</b><div style="font-size:.75rem;color:var(--muted);margin-top:3px">Responsable: Natalia Rodríguez · periodo: ${esc(month)}</div></div>${badge('Bloqueado por validación jurídica', '#b45309')}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:12px"><div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Candidatos que cumplen datos</small><b style="display:block;font-size:1.15rem;color:var(--primary-h)">${natalia.candidates.length}</b></div><div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Valor potencial</small><b style="display:block;font-size:1.15rem;color:#b45309">${money(natalia.potential)}</b></div><div style="padding:10px;background:var(--s2);border-radius:9px"><small style="color:var(--muted)">Valor liquidable</small><b style="display:block;font-size:1.15rem;color:var(--muted)">${money(natalia.liquidable)}</b></div></div>
          <p style="font-size:.76rem;line-height:1.45;color:#92400e;margin:11px 0 0"><strong>No se activa ni se puede aprobar/pagar.</strong> La Ley 528 de 1999, art. 34, prohíbe al fisioterapeuta otorgar participación económica por la remisión a su consultorio de personas que requieran sus servicios. Este control solo identifica casos que, por datos, serían candidatos de $10.000; exige concepto jurídico escrito antes de cualquier cambio de política. Excluye Google, publicidad, redes, Michelle, reactivaciones, renovaciones, fisioterapia, pagos no verificados, citas no atendidas y duplicados.</p>
        </div>

        <details style="margin-top:14px"><summary style="cursor:pointer;font-size:.8rem;font-weight:700">Historial y auditoría de incentivos especiales</summary><div style="display:grid;gap:6px;margin-top:9px">${get(AUDIT_KEY, []).slice(-20).reverse().map(row => `<div style="font-size:.74rem;border-top:1px solid var(--border);padding-top:7px"><b>${esc(row.action)}</b> · ${esc(row.detail)}<br><span style="color:var(--muted)">${new Date(row.at).toLocaleString('es-CO')} · ${esc(row.actor)}</span></div>`).join('') || '<div style="font-size:.75rem;color:var(--muted)">Aún no hay movimientos.</div>'}</div></details>
      </section>`;

    host.querySelectorAll('[data-social-source]').forEach(select => select.addEventListener('change', event => setSocialSource(event.currentTarget.dataset.socialSource, event.currentTarget.value)));
    host.querySelectorAll('[data-social-state]').forEach(button => button.addEventListener('click', event => saveSocialStatus(month, event.currentTarget.dataset.socialState)));
    host.querySelector('#specialSaveCalendar')?.addEventListener('click', () => saveCalendar(month));
  }

  const priorRender = global.renderComisiones;
  if (typeof priorRender === 'function') {
    global.renderComisiones = function () {
      const result = priorRender.apply(this, arguments);
      setTimeout(render, 0);
      return result;
    };
  }
  global.PanelSpecialIncentives = Object.freeze({ render, saveCalendar, saveSocialStatus, setSocialSource, _test: { socialData, nataliaData, bestLevel } });
  setTimeout(render, 0);
})(window);
