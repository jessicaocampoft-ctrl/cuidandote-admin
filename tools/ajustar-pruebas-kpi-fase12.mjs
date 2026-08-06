import fs from 'node:fs';

const path='tools/validar-kpi-fase12.mjs';
let source=fs.readFileSync(path,'utf8');
const replacements=[
  [
    "assert.doesNotMatch(moduleSource,/action=(?!getKPIHistory)/,'No deben aparecer acciones nuevas al servidor.');",
    "const serverActions=[...moduleSource.matchAll(/[?&]action=([A-Za-z0-9_-]+)/g)].map(m=>m[1]);\nassert.deepEqual(serverActions,['getKPIHistory'],'Solo debe conservarse la acción histórica existente.');"
  ],
  ["assert.deepEqual(api.getKPIManual(),{});","assert.equal(JSON.stringify(api.getKPIManual()),'{}');"],
  ["assert.deepEqual(api.getKPIManual(),{leads:9,nps:91});","assert.equal(JSON.stringify(api.getKPIManual()),JSON.stringify({leads:9,nps:91}));"],
  ["assert.deepEqual(api.getKPIManual(),{});","assert.equal(JSON.stringify(api.getKPIManual()),'{}');"]
];
let changed=0;
for(const [from,to] of replacements){
  if(source.includes(from)){
    source=source.replace(from,to);
    changed++;
  }
}
if(changed<3)throw new Error(`Se esperaban al menos 3 ajustes y se aplicaron ${changed}.`);
fs.writeFileSync(path,source,'utf8');
console.log(`Pruebas KPI ajustadas: ${changed} reemplazos.`);
