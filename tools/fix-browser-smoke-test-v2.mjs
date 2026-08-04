import fs from 'node:fs';

const target = process.argv[2] || 'tools/browser-smoke.mjs';
let source = fs.readFileSync(target, 'utf8');
const changes = [];

const diagnosticLine = `    ['Abrir pago desde una cita', \`(async () => { const s=document.getElementById('payCitaId'); if(!s) throw new Error('payCitaId ausente'); openPago('QA-CITA'); await new Promise(r=>setTimeout(r,300)); const options=[...s.options].map(o=>({value:o.value,text:o.textContent})); const display=getComputedStyle(document.getElementById('vPagos')).display; if(s.value!=='QA-CITA' || display==='none') throw new Error(JSON.stringify({value:s.value,display,options,citas:allData.citas})); return true; })()\`],`;

if (!source.includes(diagnosticLine)) {
  const pattern = /^\s*\['Abrir pago desde una cita',[^\n]+$/m;
  const matches = source.match(new RegExp(pattern.source, 'gm')) || [];
  if (matches.length !== 1) throw new Error(`Se esperaba una prueba de pagos y se encontraron ${matches.length}.`);
  source = source.replace(pattern, diagnosticLine);
  changes.push('Instalar diagnóstico exacto de openPago');
}

const waitBlock = `  let panelReady = false;\n  for (let intento = 0; intento < 100; intento++) {\n    try {\n      panelReady = await evaluate(cdp, \`document.readyState === 'complete' && typeof showView === 'function' && !!document.getElementById('loginScreen') && !!document.getElementById('adminApp')\`);\n    } catch (_) {}\n    if (panelReady) break;\n    await sleep(100);\n  }\n  if (!panelReady) throw new Error('El panel no terminó de cargar en 10 segundos.');\n  await sleep(200);`;
if (!source.includes(waitBlock)) {
  const oldWait = '  await sleep(1200);';
  if (!source.includes(oldWait)) throw new Error('No se encontró el punto de espera del navegador.');
  source = source.replace(oldWait, waitBlock);
  changes.push('Esperar la carga completa del panel');
}

fs.writeFileSync(target, source, 'utf8');
console.log(changes.length ? `Prueba v2 actualizada:\n- ${changes.join('\n- ')}` : 'La prueba v2 ya estaba actualizada.');
