import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8').replace(/^\uFEFF/, '');
const out = process.argv[3] || 'MODULARIZACION_FASE12_INVENTARIO_RESULTADO.md';
const unique = values => [...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));

const functionNames = [
  '_formatKPIValue','_kpiCardGuia','_kpiRow','_kpiSnapshot','applyKPIFavorites','applyKPIRefSpans',
  'calcBDActualizada','changeKPIMonth','closeKPIExplorer','getKPIConfig','getKPIManual',
  'guardarKPIConfig','guardarKPIManual','initKPIExplorer','loadKPIHistoryFromServer','openKPIExplorer',
  'renderKPIGuia','renderKPITablero','saveKPIManual','saveKPINote','scrollToKPICard','toggleKPICard',
  'toggleKPIFavorite','_renderBDBreakdown','_renderCancelBreakdown'
];

function extractFunctionRange(source, name) {
  const escaped = name.replace(/[$]/g,'\\$&');
  const matches = [...source.matchAll(new RegExp(`(?:^|\\n)((?:async\\s+)?function\\s+${escaped}\\s*\\()`, 'g'))];
  if (matches.length !== 1) throw new Error(`${name}: ${matches.length} declaraciones.`);
  const start = matches[0].index + (matches[0][0].startsWith('\n') ? 1 : 0);
  const firstLineEnd = source.indexOf('\n', start);
  const firstLine = source.slice(start, firstLineEnd < 0 ? source.length : firstLineEnd);
  const opens = (firstLine.match(/{/g)||[]).length;
  const closes = (firstLine.match(/}/g)||[]).length;
  if (opens > 0 && opens === closes) return {name,start,end:firstLineEnd < 0 ? source.length : firstLineEnd,text:firstLine.trimEnd(),async:/^async\s+function/.test(firstLine)};
  const closeRegex = /^}\s*$/gm;
  closeRegex.lastIndex = firstLineEnd < 0 ? start : firstLineEnd + 1;
  const close = closeRegex.exec(source);
  if (!close) throw new Error(`No se encontró cierre de ${name}.`);
  const end = close.index + close[0].length;
  return {name,start,end,text:source.slice(start,end).trimEnd(),async:/^async\s+function/.test(source.slice(start,end))};
}

const allFunctionNames = unique([...html.matchAll(/(?:^|\n)(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const allFunctionRanges = allFunctionNames.map(name=>extractFunctionRange(html,name));
const selectedBlocks = functionNames.map(name=>extractFunctionRange(html,name));
const selectedSource = selectedBlocks.map(x=>x.text).join('\n\n');

function insideFunction(index) {
  return allFunctionRanges.some(r=>index>=r.start && index<r.end);
}

function declarationEnd(source,start) {
  let braces=0, brackets=0, parens=0, quote=null, escaped=false;
  for(let i=start;i<source.length;i++){
    const ch=source[i];
    if(quote){
      if(escaped) escaped=false;
      else if(ch==='\\') escaped=true;
      else if(ch===quote) quote=null;
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch==='{') braces++;
    else if(ch==='}') braces--;
    else if(ch==='[') brackets++;
    else if(ch===']') brackets--;
    else if(ch==='(') parens++;
    else if(ch===')') parens--;
    else if(ch===';'&&braces===0&&brackets===0&&parens===0) return i+1;
  }
  throw new Error('Declaración global sin punto y coma.');
}

function declaredNames(declaration) {
  const body=declaration.replace(/^(?:const|let|var)\s+/,'').replace(/;\s*$/,'');
  const parts=[]; let start=0, braces=0, brackets=0, parens=0, quote=null, escaped=false;
  for(let i=0;i<body.length;i++){
    const ch=body[i];
    if(quote){if(escaped)escaped=false;else if(ch==='\\')escaped=true;else if(ch===quote)quote=null;continue;}
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch==='{')braces++;else if(ch==='}')braces--;else if(ch==='[')brackets++;else if(ch===']')brackets--;else if(ch==='(')parens++;else if(ch===')')parens--;
    else if(ch===','&&braces===0&&brackets===0&&parens===0){parts.push(body.slice(start,i));start=i+1;}
  }
  parts.push(body.slice(start));
  return parts.map(p=>p.match(/^\s*([A-Za-z_$][\w$]*)\s*=/)?.[1]).filter(Boolean);
}

const globalDeclarations=[];
for(const match of html.matchAll(/(?:^|\n)(const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)){
  const start=match.index+(match[0].startsWith('\n')?1:0);
  if(insideFunction(start)) continue;
  const end=declarationEnd(html,start);
  const text=html.slice(start,end).trim();
  globalDeclarations.push({start,end,text,names:declaredNames(text)});
}
const globalByName=new Map();
for(const decl of globalDeclarations) for(const name of decl.names) globalByName.set(name,decl);

const referencedGlobals=new Set();
const queue=[];
for(const name of globalByName.keys()) if(new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`).test(selectedSource)){referencedGlobals.add(name);queue.push(name);}
while(queue.length){
  const name=queue.shift();
  const decl=globalByName.get(name); if(!decl) continue;
  for(const candidate of globalByName.keys()){
    if(referencedGlobals.has(candidate)) continue;
    if(new RegExp(`\\b${candidate.replace(/[$]/g,'\\$&')}\\b`).test(decl.text)){referencedGlobals.add(candidate);queue.push(candidate);}
  }
}
const selectedDeclarations=unique([...new Set([...referencedGlobals].map(n=>globalByName.get(n)?.text).filter(Boolean))]);
const selectedGlobalNames=unique([...referencedGlobals]);

const calledFunctions=unique([...selectedSource.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
const externalFunctions=calledFunctions.filter(name=>allFunctionNames.includes(name)&&!functionNames.includes(name));
const forbiddenFunctions=[
  'renderFinanzas','renderMetricas','renderPresupuestoMetas','pmGuardarKPIs','pmGuardarCostos','pmRecalc',
  'loadEncuestaStats','_renderEncuestaStatsUI','getEncuestaStats','getLeads','getLeadsMes',
  'renderConveniosReport','renderIngresosDetalle','renderCitasResumen','setModoIngresos','openPago',
  'saveManualPayment','renderPagos','renderComisiones'
];
const crossed=functionNames.filter(n=>forbiddenFunctions.includes(n));
if(crossed.length) throw new Error(`Alcance inseguro: ${crossed.join(', ')}`);
if(functionNames.length!==25) throw new Error(`Se esperaban 25 funciones y hay ${functionNames.length}.`);
if(!selectedGlobalNames.includes('KPI_CONFIG_DEFAULTS')||!selectedGlobalNames.includes('KPI_INTERACTIVE')) throw new Error('Faltan constantes KPI esenciales.');

const lines=[
  '# Inventario de modularización — Fase 12 Indicadores y KPI','',
  `- Funciones propias seleccionadas: **${functionNames.length}**.`,
  `- Declaraciones globales seleccionadas: **${selectedDeclarations.length}**.`,
  `- Nombres globales encapsulados: **${selectedGlobalNames.length}**.`,
  `- Dependencias funcionales externas conservadas: **${externalFunctions.length}**.`,
  '- `renderMetricas`, encuestas, presupuesto, metas financieras, leads, pagos y comisiones permanecen fuera.','',
  '## Funciones propias',...functionNames.map(n=>`- \`${n}\`${selectedBlocks.find(x=>x.name===n)?.async?' — async':''}`),
  '', '## Estado y constantes propias',...selectedGlobalNames.map(n=>`- \`${n}\``),
  '', '## Declaraciones completas',...selectedDeclarations.map(d=>`- \`${d.replace(/\s+/g,' ').slice(0,180)}${d.length>180?'…':''}\``),
  '', '## Dependencias externas conservadas',...externalFunctions.map(n=>`- \`${n}\``),
  '', '## Límites confirmados',
  '- `getCancelMotivos` y `marcarErrorMio` siguen perteneciendo a edición de citas.',
  '- `getEncuestaStats` y `loadEncuestaStats` siguen perteneciendo a encuestas.',
  '- `getLeadsMes` sigue perteneciendo a gestión comercial.',
  '- `calcCobradoMes` y `getEgresos` siguen perteneciendo a Finanzas.',
  '- `reloadMetas` sigue siendo una dependencia externa de configuración.',
  '- No se modifica `main`, Apps Script ni el panel publicado.',''
];
fs.writeFileSync(out,lines.join('\n'),'utf8');
console.log(`Inventario Fase 12: ${functionNames.length} funciones, ${selectedGlobalNames.length} globales, ${externalFunctions.length} dependencias.`);
