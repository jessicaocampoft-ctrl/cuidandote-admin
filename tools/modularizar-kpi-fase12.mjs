import fs from 'node:fs';
import path from 'node:path';

const htmlPath=process.argv[2]||'index.html';
let html=fs.readFileSync(htmlPath,'utf8');
const hadBom=html.charCodeAt(0)===0xFEFF;
if(hadBom)html=html.slice(1);

const modulePath=path.join('js','modules','kpi.js');
const scriptTag='<script src="js/modules/kpi.js"></script>';
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
  if(matches.length!==1)throw new Error(`${name} debe tener una única declaración; encontradas: ${matches.length}.`);
  const start=matches[0].index+(matches[0][0].startsWith('\n')?1:0);
  const firstLineEnd=source.indexOf('\n',start);
  const firstLine=source.slice(start,firstLineEnd<0?source.length:firstLineEnd);
  const opens=(firstLine.match(/{/g)||[]).length;
  const closes=(firstLine.match(/}/g)||[]).length;
  if(opens>0&&opens===closes)return{name,text:firstLine.trimEnd(),async:/^async\s+function/.test(firstLine)};
  const closeRegex=/^}\s*$/gm;
  closeRegex.lastIndex=firstLineEnd<0?start:firstLineEnd+1;
  const close=closeRegex.exec(source);
  if(!close)throw new Error(`No se encontró el cierre de nivel superior de ${name}.`);
  const text=source.slice(start,close.index+close[0].length).trimEnd();
  return{name,text,async:/^async\s+function/.test(text)};
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
  throw new Error('Declaración global sin punto y coma.');
}

function extractGlobalDeclaration(source,name){
  const escaped=name.replace(/[$]/g,'\\$&');
  const matches=[...source.matchAll(new RegExp(`(?:^|\\n)(?:const|let|var)\\s+${escaped}\\b`,'g'))];
  if(matches.length!==1)throw new Error(`${name} debe tener una única declaración global; encontradas: ${matches.length}.`);
  const start=matches[0].index+(matches[0][0].startsWith('\n')?1:0);
  const end=declarationEnd(source,start);
  return{name,start,text:source.slice(start,end).trim()};
}

if(html.includes(scriptTag)&&fs.existsSync(modulePath)){
  console.log('La Fase 12 ya estaba aplicada.');
  process.exit(0);
}

const blocks=functionNames.map(name=>extractFunction(html,name));
const declarations=privateGlobals.map(name=>extractGlobalDeclaration(html,name)).sort((a,b)=>a.start-b.start);
const moduleSource=`/* Cuidándote Fisioterapia — Indicadores, KPI, guía y explorador. */\n(function (global) {\n  'use strict';\n\n${declarations.map(d=>d.text).join('\n\n')}\n\n${blocks.map(item=>item.text).join('\n\n')}\n\n  global.PanelKPI = Object.freeze({\n${functionNames.map(name=>`    ${name}`).join(',\n')}\n  });\n})(window);\n`;

for(const item of blocks){
  const adapter=`${item.async?'async ':''}function ${item.name}(...args) {\n  const module = window.PanelKPI;\n  if (!module || typeof module.${item.name} !== 'function') {\n    throw new Error('El módulo Indicadores y KPI no está disponible: ${item.name}');\n  }\n  return ${item.async?'await ':''}module.${item.name}(...args);\n}`;
  const occurrences=html.split(item.text).length-1;
  if(occurrences!==1)throw new Error(`${item.name} no es único al reemplazar; coincidencias: ${occurrences}.`);
  html=html.replace(item.text,adapter);
}

for(const declaration of declarations){
  const occurrences=html.split(declaration.text).length-1;
  if(occurrences!==1)throw new Error(`${declaration.name} no es único al retirar; coincidencias: ${occurrences}.`);
  html=html.replace(declaration.text,'');
}

if(!html.includes(scriptTag)){
  const anchor='<script src="js/modules/finance.js"></script>';
  if(!html.includes(anchor))throw new Error('No se encontró finance.js como ancla de carga.');
  html=html.replace(anchor,`${anchor}\n  ${scriptTag}`);
}

for(const forbidden of [
  'renderFinanzas','renderMetricas','renderPresupuestoMetas','pmGuardarKPIs','pmGuardarCostos','pmRecalc',
  'loadEncuestaStats','_renderEncuestaStatsUI','getEncuestaStats','getLeads','getLeadsMes',
  'renderConveniosReport','renderIngresosDetalle','renderCitasResumen','setModoIngresos','openPago',
  'saveManualPayment','renderPagos','renderComisiones','getCancelMotivos','marcarErrorMio'
]){
  if(moduleSource.includes(`function ${forbidden}(`)||moduleSource.includes(`async function ${forbidden}(`)){
    throw new Error(`${forbidden} no pertenece a kpi.js.`);
  }
}
for(const name of sharedGlobals){
  const declarationPattern=new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`);
  if(declarationPattern.test(moduleSource))throw new Error(`La variable compartida ${name} no debe duplicarse en kpi.js.`);
  if(!new RegExp(`(?:const|let|var)\\s+${name.replace(/[$]/g,'\\$&')}\\b`).test(html))throw new Error(`La variable compartida ${name} desapareció de index.html.`);
}

fs.mkdirSync(path.dirname(modulePath),{recursive:true});
fs.writeFileSync(modulePath,moduleSource,'utf8');
fs.writeFileSync(htmlPath,(hadBom?'\uFEFF':'')+html,'utf8');
console.log(`Fase 12 aplicada: ${functionNames.length} funciones y ${privateGlobals.length} declaraciones privadas trasladadas a ${modulePath}.`);
