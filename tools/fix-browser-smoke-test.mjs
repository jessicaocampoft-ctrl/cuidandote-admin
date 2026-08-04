import fs from 'node:fs';

const target = process.argv[2] || 'tools/browser-smoke.mjs';
let source = fs.readFileSync(target, 'utf8');
const changes = [];

function replaceExact(oldText, newText, label) {
  if (source.includes(newText)) return;
  const count = source.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${label}: se esperaba 1 coincidencia y se encontraron ${count}.`);
  source = source.replace(oldText, newText);
  changes.push(label);
}

replaceExact(
  `    try { allData = { citas: [], pacientes: [], bloqueos: [], eventos: [], codigos: [], servicios: [], currentUser: {id:'qa',nombre:'QA Auditoría',rol:'Superadministradora'} }; } catch (_) {}`,
  `    try {\n      const now = new Date();\n      const qaDate = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');\n      allData = {\n        citas: [{ id:'QA-CITA', nombre:'QA Auditoría', fecha:qaDate, hora:'10:00', servicio:'Descarga muscular completa', estado:'Pendiente de pago', precio:'10000' }],\n        pacientes: [], bloqueos: [], eventos: [], codigos: [], servicios: [],\n        currentUser: {id:'qa',nombre:'QA Auditoría',rol:'Superadministradora'}\n      };\n    } catch (_) {}`,
  'Agregar cita operativa simulada'
);

replaceExact(
  `    ['Abrir pago desde una cita', \`(async () => { const s=document.getElementById('payCitaId'); if(!s) throw new Error('payCitaId ausente'); s.innerHTML='<option value="QA-CITA">QA</option>'; openPago('QA-CITA'); await new Promise(r=>setTimeout(r,180)); return s.value==='QA-CITA'; })()\`],`,
  `    ['Abrir pago desde una cita', \`(async () => { const s=document.getElementById('payCitaId'); if(!s) throw new Error('payCitaId ausente'); openPago('QA-CITA'); await new Promise(r=>setTimeout(r,220)); return s.value==='QA-CITA' && getComputedStyle(document.getElementById('vPagos')).display !== 'none'; })()\`],`,
  'Validar openPago con la cita simulada real'
);

replaceExact(
  `  const relevantCdpErrors = cdpErrors.filter(text => !/favicon|ERR_BLOCKED_BY_CLIENT|Failed to load resource/i.test(text));`,
  `  const relevantCdpErrors = cdpErrors.filter(text => !/favicon|ERR_BLOCKED_BY_CLIENT|Failed to load resource|X-Frame-Options may only be set via an HTTP header/i.test(text));`,
  'Ignorar advertencia no funcional de X-Frame-Options'
);

fs.writeFileSync(target, source, 'utf8');
console.log(changes.length ? `Prueba del navegador actualizada:\n- ${changes.join('\n- ')}` : 'La prueba del navegador ya estaba actualizada.');
