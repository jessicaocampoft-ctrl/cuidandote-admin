import fs from 'node:fs';
import vm from 'node:vm';

const htmlPath = process.argv[2] || 'index.html';
const modulePath = process.argv[3] || 'js/modules/finance.js';
const html = fs.readFileSync(htmlPath,'utf8').replace(/^\uFEFF/,'');
const moduleSource = fs.readFileSync(modulePath,'utf8');

const names = [
  'renderFinanzas','calcCobradoMes','calcIngresoPaquetesMes','renderEgresosList',
  'getEgresos','saveEgresos','guardarEgreso','eliminarEgreso',
  'actualizarConceptosEgreso','renderEstructuraFinanciera','resRow'
];
const constants = ['CONCEPTOS_EGRESO','COSTOS_REFERENCIA','COSTO_BASE','COSTO_PE','COSTO_META'];

function assert(condition,message) {
  if (!condition) throw new Error(message);
}

const packagesTag = '<script src="js/modules/packages.js"></script>';
const financeTag = '<script src="js/modules/finance.js"></script>';
assert(html.includes(financeTag),'index.html no carga finance.js.');
assert((html.match(/script src="js\/modules\/finance\.js"/g)||[]).length===1,'finance.js debe cargarse una sola vez.');
assert(html.indexOf(packagesTag)>=0 && html.indexOf(packagesTag)<html.indexOf(financeTag),'finance.js debe cargar después de packages.js.');

for (const name of names) {
  const escaped = name.replace(/[$]/g,'\\$&');
  assert(new RegExp(`\\bfunction\\s+${escaped}\\s*\\(\.\.\.args\\)`).test(html),`${name} no conserva adaptador.`);
  assert(new RegExp(`\\bfunction\\s+${escaped}\\s*\\(`).test(moduleSource),`${name} no existe en finance.js.`);
  assert(moduleSource.includes(`    ${name}`),`${name} no fue exportada.`);
}
assert(moduleSource.includes('global.PanelFinance = Object.freeze'),'PanelFinance no quedó exportado de forma controlada.');
assert(!/\bconst\s+CONCEPTOS_EGRESO\b/.test(html),'CONCEPTOS_EGRESO no debe seguir en index.html.');
assert(!/\bconst\s+COSTOS_REFERENCIA\b/.test(html),'COSTOS_REFERENCIA no debe seguir en index.html.');
assert(!/\bconst\s+COSTO_BASE\b/.test(html),'Los umbrales financieros no deben seguir en index.html.');
for (const name of constants) assert(new RegExp(`\\b${name}\\b`).test(moduleSource),`${name} no está en finance.js.`);

for (const forbidden of [
  'renderKPITablero','renderMetricas','guardarKPIManual','guardarMetaFin','previewMetaFin',
  'renderPresupuestoMetas','renderConveniosReport','exportarCSV','renderIngresosDetalle',
  'renderCitasResumen','setModoIngresos','registrarLead','loadEncuestaStats',
  'saveManualPayment','renderPagos','renderCalendar','renderEquipo','renderBasedatos'
]) {
  assert(!new RegExp(`\\b(?:async\\s+)?function\\s+${forbidden.replace(/[$]/g,'\\$&')}\\s*\\(`).test(moduleSource),`${forbidden} no pertenece a finance.js.`);
}

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join('\n;\n');
new vm.Script(inlineScripts,{filename:'inline-scripts.js'});
new vm.Script(moduleSource,{filename:modulePath});

class FakeDate extends Date {
  constructor(...args) { super(...(args.length?args:['2026-08-05T12:00:00-05:00'])); }
  static now() { return new Date('2026-08-05T12:00:00-05:00').getTime(); }
}

function element(id) {
  return {
    id,value:'',textContent:'',innerHTML:'',disabled:false,checked:false,
    style:{display:'',width:''},dataset:{},selectedIndex:0,
    classList:{add(){},remove(){},toggle(){}},
    focus(){},select(){},remove(){},addEventListener(){},setAttribute(){},appendChild(){},click(){},
    querySelector(){return null;},querySelectorAll(){return [];}
  };
}
const elements = new Map();
const document = {
  getElementById(id) { if (!elements.has(id)) elements.set(id,element(id)); return elements.get(id); },
  querySelector(){return null;},querySelectorAll(){return [];},
  createElement(tag){return element(tag);},body:{appendChild(){}}
};

const storage = new Map();
const toasts = [];
let allowConfirm = true;
let metricCalls = 0;
let kpiCalls = 0;
let weakWeekCalls = 0;
const packages = [
  {nombre:'Plan 6 sesiones',fechaCompra:'2026-08-02',precio:200000,sesiones:6,consumidas:1},
  {nombre:'Plan julio',fechaCompra:'2026-07-02',precio:120000,sesiones:4,consumidas:4}
];
const allData = {
  citas:[
    {fecha:'2026-08-04',precio:100000,servicio:'Valoración',estado:'Atendida',nombre:'Ana'},
    {fecha:'2026-08-10',precio:70000,servicio:'Readaptación',estado:'Confirmada',nombre:'Luis'},
    {fecha:'2026-08-03',precio:30000,servicio:'Descarga',estado:'Cancelada',nombre:'Marta'},
    {fecha:'2026-07-20',precio:50000,servicio:'Descarga',estado:'Atendida',nombre:'Carlos'}
  ],
  eventos:[
    {fecha:'2026-08-03',cobro:40000,tipo:'Evento empresa'},
    {fecha:'2026-08-15',cobro:20000,tipo:'Evento futuro'}
  ]
};

const context = {
  console,document,window:null,globalThis:null,
  Date:FakeDate,Math,JSON,Number,String,Object,Array,Set,Map,Promise,
  parseInt,parseFloat,isNaN,encodeURIComponent,decodeURIComponent,
  allData,
  today:()=> '2026-08-05',
  normDate:value=>String(value||'').slice(0,10),
  parsePrecio:value=> Number(String(value??0).replace(/[^0-9-]/g,''))||0,
  fmtPeso:value=>'$'+Number(value||0).toLocaleString('es-CO'),
  citasReales:()=>allData.citas.filter(c=>c.estado!=='Cancelada'),
  esRegistroServ:()=>false,
  getMeta:()=>1000000,
  _getPkAsignados:()=>packages,
  _checkAlertaSemanFloja:()=>{weakWeekCalls++;},
  renderMetricas:()=>{metricCalls++;},
  renderKPITablero:()=>{kpiCalls++;},
  kvGet:key=>storage.has(key)?storage.get(key):null,
  kvSet:(key,value)=>storage.set(key,String(value)),
  toast:(message,type='ok')=>toasts.push({message:String(message),type}),
  confirm:()=>allowConfirm
};
context.window=context;
context.globalThis=context;
vm.createContext(context);
vm.runInContext(moduleSource,context,{filename:modulePath});

assert(context.PanelFinance,'PanelFinance no quedó disponible.');
for (const name of names) assert(typeof context.PanelFinance[name]==='function',`PanelFinance.${name} no es función.`);

assert(context.PanelFinance.calcIngresoPaquetesMes(8,2026)===200000,'El ingreso de paquetes de agosto cambió.');
assert(context.PanelFinance.calcIngresoPaquetesMes(7,2026)===120000,'El ingreso de paquetes de julio cambió.');
assert(context.PanelFinance.calcCobradoMes()===340000,'El cobrado del mes actual debe excluir ingresos futuros e incluir citas, eventos y paquetes.');
assert(context.PanelFinance.calcCobradoMes(7,2026)===170000,'El cobrado histórico de julio cambió.');

storage.set('egresos','no-es-json');
assert(context.PanelFinance.getEgresos().length===0,'getEgresos no controla JSON inválido.');
context.PanelFinance.saveEgresos([{id:'A',fecha:'2026-08-01',categoria:'Otro',concepto:'Otro',monto:50000,descripcion:'QA'}]);
assert(JSON.parse(storage.get('egresos')).length===1,'saveEgresos no persistió la lista.');

const fecha=document.getElementById('egresoFecha');
const categoria=document.getElementById('egresoCategoria');
const concepto=document.getElementById('egresoConcepto');
const monto=document.getElementById('egresoMonto');
const desc=document.getElementById('egresoDesc');
fecha.value=''; monto.value='100000'; categoria.value='Costos Operativos'; concepto.value='Arriendo'; desc.value='';
const beforeInvalid=storage.get('egresos');
context.PanelFinance.guardarEgreso();
assert(storage.get('egresos')===beforeInvalid,'Se guardó un egreso sin fecha.');
assert(toasts.some(t=>t.message.includes('fecha')&&t.type==='err'),'No avisó que faltaba la fecha.');
fecha.value='2026-08-05'; monto.value='0';
context.PanelFinance.guardarEgreso();
assert(storage.get('egresos')===beforeInvalid,'Se guardó un egreso con monto inválido.');
assert(toasts.some(t=>t.message.includes('monto válido')),'No avisó que el monto era inválido.');

categoria.value='Costos Operativos';
context.PanelFinance.actualizarConceptosEgreso();
assert(concepto.innerHTML.includes('Arriendo')&&concepto.innerHTML.includes('Servicios públicos'),'No cargó los conceptos de la categoría.');

fecha.value='2026-08-05'; concepto.value='Arriendo'; monto.value='$450.000'; desc.value='Arriendo QA';
context.PanelFinance.guardarEgreso();
const saved=JSON.parse(storage.get('egresos'));
assert(saved.length===2,'No agregó el egreso válido.');
assert(saved.some(e=>e.concepto==='Arriendo'&&e.monto===450000),'El egreso guardado perdió concepto o monto.');
assert(fecha.value===''&&monto.value===''&&desc.value==='','No limpió el formulario después de guardar.');
assert(toasts.some(t=>t.message==='Egreso registrado'&&t.type==='ok'),'No confirmó el egreso registrado.');

context.PanelFinance.saveEgresos([
  {id:'AGO',fecha:'2026-08-04',categoria:'Costos Operativos',concepto:'Arriendo',monto:450000,descripcion:'Agosto'},
  {id:'JUL',fecha:'2026-07-04',categoria:'Otro',concepto:'Otro',monto:10000,descripcion:'Julio'}
]);
document.getElementById('egresoMesFiltro').value='2026-08';
context.PanelFinance.renderEgresosList();
const listHtml=document.getElementById('egresosListResult').innerHTML;
assert(listHtml.includes('Arriendo')&&listHtml.includes('Agosto'),'La lista no mostró el egreso de agosto.');
assert(!listHtml.includes('Julio'),'El filtro mensual incluyó un egreso de julio.');
assert(listHtml.includes('TOTAL EGRESOS'),'La lista perdió el resumen de egresos.');

allowConfirm=false;
context.PanelFinance.eliminarEgreso('AGO');
assert(context.PanelFinance.getEgresos().some(e=>e.id==='AGO'),'Eliminó el egreso aunque se canceló la confirmación.');
allowConfirm=true;
context.PanelFinance.eliminarEgreso('AGO');
assert(!context.PanelFinance.getEgresos().some(e=>e.id==='AGO'),'No eliminó el egreso confirmado.');

context.PanelFinance.saveEgresos([{id:'QA',fecha:'2026-08-03',categoria:'Otro',concepto:'Otro',monto:100000,descripcion:'Prueba'}]);
context.PanelFinance.renderEstructuraFinanciera();
assert(document.getElementById('estructuraFinResult').innerHTML.includes('Utilidad bruta estimada'),'La estructura financiera no mostró la utilidad bruta.');
assert(document.getElementById('estructuraFinResult').innerHTML.includes('Semáforo financiero'),'La estructura financiera perdió el semáforo.');

context.PanelFinance.renderFinanzas();
assert(document.getElementById('egresoFecha').value==='2026-08-05','Finanzas no inicializó la fecha del egreso.');
assert(document.getElementById('finChart').innerHTML.includes('chart-bar'),'No renderizó el gráfico financiero.');
assert(document.getElementById('finResumenMes').innerHTML.includes('Total cobrado'),'No renderizó el resumen mensual.');
assert(document.getElementById('finServiciosMes').innerHTML.includes('Valoración'),'No renderizó los servicios rentables.');
assert(document.getElementById('metaBarFinPct').textContent==='34%','El avance de la meta cambió.');
assert(metricCalls===1&&kpiCalls===1&&weakWeekCalls===1,'No conservó la integración con métricas, KPI o alerta semanal.');

const row=context.PanelFinance.resRow('Prueba','$10','color:red');
assert(row.includes('Prueba')&&row.includes('$10')&&row.includes('color:red'),'resRow cambió su salida.');

console.log('FASE 11 VALIDADA: ingresos, egresos, filtros, persistencia, cálculos y renderizado preservados.');
