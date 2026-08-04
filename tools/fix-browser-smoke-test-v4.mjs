import fs from 'node:fs';

const target = process.argv[2] || 'tools/browser-smoke.mjs';
let source = fs.readFileSync(target, 'utf8');
const changes = [];

const currentPattern = /^\s*\['Abrir pago desde una cita',[^\n]+$/m;
const matches = source.match(new RegExp(currentPattern.source, 'gm')) || [];
if (matches.length !== 1) {
  throw new Error(`Se esperaba una prueba de openPago y se encontraron ${matches.length}.`);
}

const replacement = `    ['Abrir pago desde una cita', \`(async () => {
      const s=document.getElementById('payCitaId');
      if(!s) throw new Error('payCitaId ausente');
      const now=new Date();
      const qaDate=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
      const qaCita={id:'QA-CITA',ID:'QA-CITA',CitaID:'QA-CITA',nombre:'QA Auditoría',Cliente:'QA Auditoría',fecha:qaDate,Fecha:qaDate,hora:'10:00',Hora:'10:00',servicio:'Descarga muscular completa',Servicio:'Descarga muscular completa',estado:'Pendiente de pago',Estado:'Pendiente de pago',precio:'10000',Precio:'10000'};
      allData.citas=[qaCita];
      operationsData.citas=[qaCita];
      openPago('QA-CITA');
      await new Promise(r=>setTimeout(r,300));
      const options=[...s.options].map(o=>({value:o.value,text:o.textContent}));
      const display=getComputedStyle(document.getElementById('vPagos')).display;
      if(s.value!=='QA-CITA' || display==='none') throw new Error(JSON.stringify({value:s.value,display,options,citas:allData.citas,operaciones:operationsData.citas}));
      return true;
    })()\`],`;

if (!source.includes(replacement)) {
  source = source.replace(currentPattern, replacement);
  changes.push('Aislar openPago con una cita válida justo antes de ejecutarlo');
}

fs.writeFileSync(target, source, 'utf8');
console.log(changes.length ? `Prueba v4 actualizada:\n- ${changes.join('\n- ')}` : 'La prueba v4 ya estaba actualizada.');
