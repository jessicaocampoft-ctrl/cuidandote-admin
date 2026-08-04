import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const changes = [];

function replaceExact(oldText, newText, label) {
  if (html.includes(newText)) return;
  const count = html.split(oldText).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: se esperaba 1 coincidencia y se encontraron ${count}.`);
  }
  html = html.replace(oldText, newText);
  changes.push(label);
}

// 1) El plan de acción NPS apuntaba a un botón antiguo que ya no existe.
const oldSurveyId = "document.getElementById('kpiLoadBtn')";
const newSurveyId = "document.getElementById('btnCargarEncuesta')";
const oldSurveyCount = html.split(oldSurveyId).length - 1;
if (oldSurveyCount > 0) {
  if (oldSurveyCount !== 2) {
    throw new Error(`Botón de encuestas: se esperaban 2 referencias al ID antiguo y se encontraron ${oldSurveyCount}.`);
  }
  html = html.split(oldSurveyId).join(newSurveyId);
  changes.push('Conectar plan NPS con el botón real de cargar encuestas');
}

// 2) Retirar funciones antiguas de servicio que ya no corresponden al formulario actual de pacientes.
const obsoleteDbFunctions = `function dbOnServiceChange() {
  const val = document.getElementById('dbServicioMain').value;
  const planSel = document.getElementById('dbServicioPlan');
  if (val === '__planes__') {
    planSel.style.display = 'block';
    document.getElementById('dbServicio').value = '';
  } else {
    planSel.style.display = 'none';
    document.getElementById('dbServicio').value = val;
  }
}

function dbOnPlanChange() {
  document.getElementById('dbServicio').value = document.getElementById('dbServicioPlan').value;
}

`;
if (html.includes(obsoleteDbFunctions)) {
  html = html.replace(obsoleteDbFunctions, '');
  changes.push('Retirar funciones huérfanas del formulario antiguo de Base de datos');
}

// 3) Completar los elementos visuales que la lógica de voz espera encontrar.
const voiceAnchor = `          </p>
          <textarea id="voiceText"`;
const voiceCompleted = `          </p>
          <div id="voiceStatus" style="display:none;align-items:center;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(27,191,176,.10);border:1px solid rgba(27,191,176,.28);border-radius:8px;font-size:.8rem;color:var(--primary)">
            <span>🎙️ Escuchando</span>
            <span id="voiceTranscript" style="color:var(--text);font-style:italic"></span>
          </div>
          <div id="voiceHelp" style="display:none;margin-bottom:8px;padding:8px 10px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28);border-radius:8px;font-size:.78rem;color:#92400e">
            Prueba diciendo: “Cita para María, mañana a las 3 de la tarde, descarga muscular completa”.
          </div>
          <textarea id="voiceText"`;
replaceExact(voiceAnchor, voiceCompleted, 'Completar estado, transcripción y ayuda del dictado por voz');

// Validaciones finales.
if (html.includes('kpiLoadBtn')) {
  throw new Error('Todavía queda una referencia al botón antiguo kpiLoadBtn.');
}
for (const obsolete of ['dbServicioMain', 'dbServicioPlan', "getElementById('dbServicio')"]) {
  if (html.includes(obsolete)) {
    throw new Error(`Todavía queda código huérfano de Base de datos: ${obsolete}.`);
  }
}
for (const id of ['voiceStatus', 'voiceTranscript', 'voiceHelp']) {
  const count = [...html.matchAll(new RegExp(`id=["']${id}["']`, 'g'))].length;
  if (count !== 1) throw new Error(`El elemento ${id} debe existir una vez; se encontraron ${count}.`);
}
if (!html.includes('id="btnCargarEncuesta"')) {
  throw new Error('No se conservó el botón real de cargar encuestas.');
}

fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');

if (changes.length) {
  console.log('Correcciones de fase 4 aplicadas:');
  changes.forEach(change => console.log(`- ${change}`));
} else {
  console.log('La fase 4 ya estaba aplicada; no hubo cambios.');
}
