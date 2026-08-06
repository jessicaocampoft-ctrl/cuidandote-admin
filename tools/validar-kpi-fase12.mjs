import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const currentHtmlPath=process.argv[2]||'index.html';
const modulePath=process.argv[3]||'js/modules/kpi.js';
const originalHtmlPath=process.argv[4]||'/tmp/index-fase11.html';
const currentHtml=fs.readFileSync(currentHtmlPath,'utf8').replace(/^\uFEFF/,'');
const moduleSource=fs.readFileSync(modulePath,'utf8').replace(/^\uFEFF/,'');
const originalHtml=fs.readFileSync(originalHtmlPath,'utf8').replace(/^\uFEFF/,'');

const functionNames=[
  '_formatKPIValue','_kpiCardGuia','_kpiRow','_kpiSnapshot','applyKPIFavorites','applyKPIRefSpans',
  'calcBDActualizada','changeKPIMonth','closeKPIExplorer','getKPIConfig','getKPIManual',
  'guardarKPIConfig','guardarKPIManual','initKPIExplorer','loadKPIHistoryFromServer','openKPIExplorer',
  'renderKPIGuia','renderKPITablero','saveKPIManual','saveKPINote','scrollToKPICard','toggleKPICard',
  'toggleKPIFavorite','_renderBDBreakdown','_renderCancelBreakdown'
];
const privateGlobals=['_activeKPIExplorer','_kpiServerHistory','_kpiViewMonth','KPI_CONFIG_DEFAULTS','KPI_INTERACTIVE'];
const sharedGlobals=[
  '_cfg0','CATEGORIAS_MARKETING','META_CAC_MAX','META_CANCELACION_PCT','META_ENCUESTAS','META_NPS',
  'META_RETENCION_PCT','META_SESIONES_SEMANA','META_VENTAS_MES','META_VENTAS_SEMANA',
  'VENTANA_NUEVO_DIAS','VENTANA_RETENCION','allData','APPS_SCRIPT_URL','TOKEN',
  'esRegistroServ','esSesionFull','esSesionIndiv'
];

function extractFunction(source,name){
  const escaped=name.replace(/[$]/g,'\\$&');
  const matches=[...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`,'g'))];
  assert.equal(matches.length,1,`${name} debe tener una declaración.`);
  const start=matches[0].index+(matches[0][0].startsWith('\n')?1:0);
  const firstLineEnd=source.indexOf('\n',start);
  const firstLine=source.slice(start,firstLineEnd<0?source.length:firstLineEnd);
  const opens=(firstLine.match(/{/g)||[]).length,closes=(firstLine.match(/}/g)||[]).length;
  if(opens>0&&opens===closes)return firstLine.trimEnd();
  const close=/^}\s*$/gm;close.lastIndex=firstLineEnd<0?start:firstLineEnd+1;
  const found=close.exec(source);assert.ok(found,`No se encontró cierre de ${name}.`);
  return source.slice(start,found.index+found[0].length).trimEnd();
}
function declarationEnd(source,start){
  let braces=0,brackets=0,parens=0,quote=null,escaped=false;
  for(let i=start;i<source.length;i++){
    const ch=source[i];
    if(quote){if(escaped)escaped=false;else if(ch==='\\')escaped=true;else if(ch===quote)quote=null;continue;}
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch==='{')braces++;else if(ch==='}')braces--;else if(ch==='[')brackets++;else if(ch===']')brackets--;else if(ch==='(')parens++;else if(ch===')')parens--;
    else if(ch===';'&&braces===0&&brackets===0&&parens===0)return i+1;
  }
  throw new Error('Declaración sin cierre.');
}
function extractDeclaration(source,name){
  const escaped=name.replace(/[$]/g,'\\$&');
  const matches=[...source.matchAll(new RegExp(`(?:^|\\n)(?:const|let|var)\\s+${escaped}\\b`,'g'))];
  assert.equal(matches.length,1,`${name} debe tener una declaración.`);
  const start=matches[0].index+(matches[0][0].startsWith('\n')?1:0);
  return source.slice(start,declarationEnd(source,start)).trim();
}
function normalize(text){return text.replace(/\r/g,'').trim();}

// 1. Paridad exacta del código trasladado.
for(const name of functionNames){
  assert.equal(normalize(extractFunction(moduleSource,name)),normalize(extractFunction(originalHtml,name)),`El cuerpo de ${name} cambió durante la extracción.`);
  const escaped=name.replace(/[$]/g,'\\$&');
  assert.match(currentHtml,new RegExp(`(?:async\\s+)?function\\s+${escaped}\\s*\\(\\.\\.\\.args\\)`),`Falta adaptador de ${name}.`);
}
for(const name of privateGlobals){
  assert.equal(normalize(extractDeclaration(moduleSource,name)),normalize(extractDeclaration(originalHtml,name)),`La declaración ${name} cambió.`);
  assert.doesNotMatch(currentHtml,new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`),`${name} quedó duplicado en index.`);
}
for(const name of sharedGlobals){
  assert.match(currentHtml,new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`),`La fuente compartida ${name} desapareció de index.`);
  assert.doesNotMatch(moduleSource,new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`),`${name} se duplicó en kpi.js.`);
}
assert.equal((currentHtml.match(/script src="js\/modules\/kpi\.js"/g)||[]).length,1,'kpi.js debe cargarse una sola vez.');
assert.equal((moduleSource.match(/\bfetch\s*\(/g)||[]).length,1,'Solo debe conservarse la consulta histórica existente.');
assert.match(moduleSource,/action=getKPIHistory/,'La consulta histórica esperada no está presente.');
assert.doesNotMatch(moduleSource,/action=(?!getKPIHistory)/,'No deben aparecer acciones nuevas al servidor.');

// 2. Entorno funcional QA en memoria.
class StorageMock{
  constructor(){this.map=new Map();}
  getItem(k){return this.map.has(k)?this.map.get(k):null;}
  setItem(k,v){this.map.set(k,String(v));}
  removeItem(k){this.map.delete(k);}
  clear(){this.map.clear();}
}
class ClassListMock{
  constructor(){this.set=new Set();}
  add(...v){v.forEach(x=>this.set.add(x));}
  remove(...v){v.forEach(x=>this.set.delete(x));}
  toggle(v,on){if(on===undefined){if(this.set.has(v)){this.set.delete(v);return false;}this.set.add(v);return true;}on?this.set.add(v):this.set.delete(v);return on;}
  contains(v){return this.set.has(v);}
}
function makeElement(id=''){
  return {
    id,value:'',innerHTML:'',textContent:'',dataset:{},style:{},classList:new ClassListMock(),attributes:{},
    onclick:null,onkeydown:null,children:[],
    setAttribute(k,v){this.attributes[k]=String(v);},
    getAttribute(k){return this.attributes[k]??null;},
    appendChild(child){this.children.push(child);return child;},
    querySelector(){return makeElement();},
    focus(){this.focused=true;},
    scrollIntoView(){this.scrolled=true;}
  };
}
const elements=new Map();
const cards=[];
const refs=[];
const ensure=id=>{if(!elements.has(id))elements.set(id,makeElement(id));return elements.get(id);};
const documentMock={
  body:{appendChild(el){if(el.id)elements.set(el.id,el);return el;}},
  getElementById(id){return elements.get(id)||null;},
  createElement(){return makeElement();},
  querySelectorAll(selector){if(selector==='.kpi-live-card')return cards;if(selector==='.kpi-ref[data-ref]')return refs;return[];},
  querySelector(){return null;},
  addEventListener(){},
};
const localStorage=new StorageMock();
const sessionStorage=new StorageMock();
let kv=new Map();
let toastCalls=[];
let shownViews=[];
let fetchedUrl='';
const context={
  console,Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,parseInt,parseFloat,isNaN,NumberFormat:Intl.NumberFormat,
  Intl,setTimeout:(fn)=>{fn();return 1;},clearTimeout(){},confirm:()=>true,
  document:documentMock,localStorage,sessionStorage,
  allData:{citas:[],eventos:[],pacientes:[]},
  APPS_SCRIPT_URL:'https://example.invalid/exec',TOKEN:'qa-token',
  META_SESIONES_SEMANA:30,META_VENTAS_SEMANA:2500000,META_VENTAS_MES:10265000,
  META_NPS:90,META_ENCUESTAS:70,META_CANCELACION_PCT:10,META_RETENCION_PCT:60,
  META_CAC_MAX:80000,VENTANA_NUEVO_DIAS:180,VENTANA_RETENCION:60,
  CATEGORIAS_MARKETING:['Pautas Redes','Redes Sociales Contenido'],
  _cfg0:{},
  esRegistroServ:s=>(s||'').toLowerCase().trim().startsWith('registro'),
  esSesionFull:s=>{const n=(s||'').toLowerCase();return n.includes('full')||n.includes('completa');},
  esSesionIndiv:s=>{const n=(s||'').toLowerCase();return n.includes('cuello')||n.includes('pierna')||n.includes('express')||n.includes('readap')||n.includes('valor');},
  _normStr:s=>(s||'').toLowerCase().trim(),
  normDate:s=>String(s||'').slice(0,10),
  parsePrecio:v=>Number(String(v??0).replace(/[^0-9.-]/g,''))||0,
  fmtPeso:v=>'$'+Math.round(Number(v)||0).toLocaleString('es-CO'),
  kvGet:k=>kv.has(k)?kv.get(k):null,
  kvSet:(k,v)=>{kv.set(k,String(v));},
  toast:(m,t)=>toastCalls.push([m,t]),
  showView:v=>shownViews.push(v),
  reloadMetas(){},renderEmergencia(){},loadEncuestaStats(){},marcarErrorMio(){},
  getCancelMotivos:()=>({}),esCancelExcluida:()=>false,
  getEncuestaStats:()=>({nps:92,encuestas:80,promotores:8,pasivos:1,detractores:1}),
  getLeadsMes:()=>6,getEgresos:()=>[],calcCobradoMes:()=>255000,
  citasReales:()=>context.allData.citas.filter(c=>!(c.estado||'').toLowerCase().includes('cancel')),
  fetch:async url=>{fetchedUrl=String(url);return{json:async()=>({ok:true,items:[{month:'2026-07',nps:88,sessions:10,surveyResponses:7}]})};}
};
context.window=context;
context.globalThis=context;
vm.createContext(context);
vm.runInContext(moduleSource,context,{filename:'kpi.js'});
const api=context.PanelKPI;
assert.ok(Object.isFrozen(api),'PanelKPI debe ser inmutable.');
assert.deepEqual(Object.keys(api).sort(),[...functionNames].sort(),'La API pública KPI no coincide con el inventario.');

// 3. Configuración: defaults, mezcla, JSON inválido y migraciones.
kv.clear();
let cfg=api.getKPIConfig();
assert.equal(cfg.meta_sesiones_semana,30);
assert.equal(cfg.meta_ventas_mes,10265000);
kv.set('kpiConfig',JSON.stringify({meta_nps:95,precio_full:120000}));
cfg=api.getKPIConfig();
assert.equal(cfg.meta_nps,95);
assert.equal(cfg.precio_full,120000);
assert.equal(cfg.meta_leads_min,40);
kv.set('kpiConfig','{mal-json');
assert.equal(api.getKPIConfig().meta_encuestas,70);
kv.set('kpiConfig',JSON.stringify({meta_ventas_mes:8040000,meta_sesiones_semana:24}));
cfg=api.getKPIConfig();
assert.equal(cfg.meta_ventas_mes,10265000);
assert.equal(cfg.meta_sesiones_semana,30);
assert.equal(JSON.parse(kv.get('kpiConfig')).meta_ventas_mes,10265000);

// 4. Valores manuales.
kv.clear();
assert.deepEqual(api.getKPIManual(),{});
api.saveKPIManual({leads:9,nps:91});
assert.deepEqual(api.getKPIManual(),{leads:9,nps:91});
kv.set('kpi_manual','x');
assert.deepEqual(api.getKPIManual(),{});

// 5. Favoritos.
const favButton=makeElement();
const favCard=makeElement();favCard.dataset.kpi='gkKpi1';favCard.querySelector=()=>favButton;cards.push(favCard);
api.toggleKPIFavorite({stopPropagation(){}},'gkKpi1');
assert.deepEqual(JSON.parse(localStorage.getItem('kpiFavorites')),['gkKpi1']);
assert.ok(favCard.classList.contains('is-favorite'));
assert.equal(favButton.textContent,'★');
api.toggleKPIFavorite({stopPropagation(){}},'gkKpi1');
assert.deepEqual(JSON.parse(localStorage.getItem('kpiFavorites')),[]);

// 6. Base de datos actualizada.
context.allData={
  citas:[
    {id:'a1',fecha:'2026-07-01',nombre:'Ana',telefono:'3001234567',email:'ana@qa.test',estado:'Atendida'},
    {id:'b1',fecha:'2026-07-02',nombre:'Beto',telefono:'3111234567',email:'',estado:'Atendida'},
    {id:'c1',fecha:'2026-07-03',nombre:'Cancelado',telefono:'3221234567',email:'c@qa.test',estado:'Cancelada'}
  ],eventos:[],pacientes:[]
};
let bd=api.calcBDActualizada(7,2026);
assert.equal(bd.pct,50);
assert.equal(bd.sinEmail,1);
context.allData.pacientes=[{nombre:'Beto',email:'beto@qa.test'}];
bd=api.calcBDActualizada(7,2026);
assert.equal(bd.pct,100);
assert.equal(api.calcBDActualizada(6,2025),null);

// 7. Historial y fotografía KPI.
context.allData={
  citas:[
    {id:'1',fecha:'2026-07-01',nombre:'Ana',servicio:'Descarga Full',precio:110000,telefono:'3001234567',email:'ana@qa.test',estado:'Atendida'},
    {id:'2',fecha:'2026-07-20',nombre:'Ana',servicio:'Readaptación',precio:70000,telefono:'3001234567',email:'ana@qa.test',estado:'Atendida'},
    {id:'3',fecha:'2026-07-15',nombre:'Beto',servicio:'Express',precio:75000,telefono:'3111234567',email:'b@qa.test',estado:'Atendida'},
    {id:'4',fecha:'2026-07-18',nombre:'Cata',servicio:'Valoración',precio:80000,estado:'Cancelada'}
  ],eventos:[],pacientes:[]
};
await api.loadKPIHistoryFromServer();
assert.match(fetchedUrl,/action=getKPIHistory/);
const snap=api._kpiSnapshot(7,2026);
assert.equal(snap.gkKpi1,3);
assert.equal(snap.gkKpi2,33);
assert.equal(snap.gkKpi3,6);
assert.equal(snap.gkKpi4,50);
assert.equal(snap.gkKpi5,255000);
assert.equal(snap.gkKpi6,70);
assert.equal(snap.gkKpi7,88);
assert.equal(snap.gkKpi8,100);
assert.equal(snap.gkKpi4b,25);
assert.equal(snap.gkKpi9,50);

// 8. Renderizado del tablero y guía con datos QA en memoria.
for(const id of ['kpiTableroResult','kpiLeads','kpiConvertidos','kpiNPS','kpiEncuestas','kpiBD','kpiGuiaLiveData'])ensure(id);
const now=new Date();
const nowStr=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(Math.max(1,now.getDate()-1)).padStart(2,'0')}`;
context.allData={
  citas:[{id:'qa1',fecha:nowStr,nombre:'QA',servicio:'Descarga Full',precio:110000,telefono:'3001234567',email:'qa@test.co',estado:'Atendida',canal:'Instagram'}],
  eventos:[{fecha:nowStr,tipo:'Evento QA',cobro:120000}],pacientes:[]
};
assert.doesNotThrow(()=>api.renderKPITablero());
assert.match(ensure('kpiTableroResult').innerHTML,/Sesiones esta semana/);
assert.match(ensure('kpiTableroResult').innerHTML,/Ventas mes actual/);
assert.doesNotThrow(()=>api.renderKPIGuia());
assert.ok(ensure('kpiGuiaLiveData').innerHTML.length>100,'La guía KPI debe renderizar contenido.');
assert.doesNotThrow(()=>api.changeKPIMonth(now.getMonth()+1,now.getFullYear()));

// 9. Explorador y notas.
assert.equal(documentMock.getElementById('kpiExplorer'),null);
api.initKPIExplorer();
assert.ok(documentMock.getElementById('kpiExplorer'));
for(const id of ['kpiExplorerTitle','kpiExplorerSub','kpiExCurrent','kpiExPrevious','kpiExVariation','kpiTrend','kpiNote','kpiActionBtn','kpiExplainBtn','kpiSaveNote'])ensure(id);
const modal=ensure('kpiExplorer');modal.querySelector=()=>makeElement();
const explorerCard=makeElement();explorerCard.dataset.value='1';
assert.doesNotThrow(()=>api.openKPIExplorer('gkKpi1',explorerCard));
assert.ok(modal.classList.contains('open'));
assert.equal(ensure('kpiExplorerTitle').textContent,'Sesiones realizadas');
ensure('kpiNote').value='Decisión QA';
api.saveKPINote();
assert.equal(localStorage.getItem('kpiNote_gkKpi1'),'Decisión QA');
api.closeKPIExplorer();
assert.ok(!modal.classList.contains('open'));

console.log('FASE 12 VALIDADA: paridad exacta, configuración, datos manuales, favoritos, BD, historial, cálculos, tablero, guía y explorador preservados.');
