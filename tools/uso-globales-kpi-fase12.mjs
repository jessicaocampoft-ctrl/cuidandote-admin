import fs from 'node:fs';

const html=fs.readFileSync(process.argv[2]||'index.html','utf8').replace(/^\uFEFF/,'');
const out=process.argv[3]||'MODULARIZACION_FASE12_USO_GLOBALES_RESULTADO.md';
const unique=v=>[...new Set(v.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
const ownFunctions=new Set([
  '_formatKPIValue','_kpiCardGuia','_kpiRow','_kpiSnapshot','applyKPIFavorites','applyKPIRefSpans',
  'calcBDActualizada','changeKPIMonth','closeKPIExplorer','getKPIConfig','getKPIManual',
  'guardarKPIConfig','guardarKPIManual','initKPIExplorer','loadKPIHistoryFromServer','openKPIExplorer',
  'renderKPIGuia','renderKPITablero','saveKPIManual','saveKPINote','scrollToKPICard','toggleKPICard',
  'toggleKPIFavorite','_renderBDBreakdown','_renderCancelBreakdown'
]);
const globals=[
  '_activeKPIExplorer','_cfg0','_kpiServerHistory','_kpiViewMonth','CATEGORIAS_MARKETING',
  'KPI_CONFIG_DEFAULTS','KPI_INTERACTIVE','META_CAC_MAX','META_CANCELACION_PCT','META_ENCUESTAS',
  'META_NPS','META_RETENCION_PCT','META_SESIONES_SEMANA','META_VENTAS_MES','META_VENTAS_SEMANA',
  'VENTANA_NUEVO_DIAS','VENTANA_RETENCION'
];
function block(name){
  const escaped=name.replace(/[$]/g,'\\$&');
  const matches=[...html.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`,'g'))];
  if(matches.length!==1)throw new Error(`${name}: ${matches.length} declaraciones.`);
  const start=matches[0].index+(matches[0][0].startsWith('\n')?1:0);
  const firstLineEnd=html.indexOf('\n',start);
  const firstLine=html.slice(start,firstLineEnd<0?html.length:firstLineEnd);
  const opens=(firstLine.match(/{/g)||[]).length,closes=(firstLine.match(/}/g)||[]).length;
  if(opens>0&&opens===closes)return firstLine;
  const close=/^}\s*$/gm;close.lastIndex=firstLineEnd<0?start:firstLineEnd+1;const found=close.exec(html);
  if(!found)throw new Error(`Sin cierre: ${name}`);
  return html.slice(start,found.index+found[0].length);
}
const functions=unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const blocks=new Map(functions.map(n=>[n,block(n)]));
const lines=['# Uso de estado global — Fase 12 Indicadores y KPI',''];
let sharedCount=0;
for(const name of globals){
  const users=functions.filter(fn=>new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`).test(blocks.get(fn)));
  const external=users.filter(fn=>!ownFunctions.has(fn));
  if(external.length)sharedCount++;
  lines.push(`## ${name}`,'',`- Usado por funciones KPI: ${users.filter(fn=>ownFunctions.has(fn)).map(fn=>`\`${fn}\``).join(', ')||'ninguna'}.`,
    `- Usado por funciones externas: ${external.map(fn=>`\`${fn}\``).join(', ')||'ninguna'}.`,'');
}
lines.splice(2,0,`- Variables analizadas: **${globals.length}**.`,`- Variables con consumidores externos: **${sharedCount}**.`,'');
lines.push('- Este diagnóstico no modifica código funcional.','');
fs.writeFileSync(out,lines.join('\n'),'utf8');
console.log(`Uso global KPI: ${globals.length} variables, ${sharedCount} compartidas.`);
