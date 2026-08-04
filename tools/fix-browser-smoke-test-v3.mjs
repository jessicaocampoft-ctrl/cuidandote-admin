import fs from 'node:fs';

const target = process.argv[2] || 'tools/browser-smoke.mjs';
let source = fs.readFileSync(target, 'utf8');
const changes = [];

const oldCommon = `        const common = {
          ok: true, citas: [], pacientes: [], bloqueos: [], eventos: [], codigos: [],
          profesionales: [], pagos: [], cuentas: [], paquetes: [], comisiones: [],
          waitlist: [], queue: [], items: [], data: {}, kv: {}, history: [],
          currentUser: { id: 'qa', nombre: 'QA Auditoría', rol: 'Superadministradora' }
        };`;

const newCommon = `        const qaNow = new Date();
        const qaDate = [
          qaNow.getFullYear(),
          String(qaNow.getMonth() + 1).padStart(2, '0'),
          String(qaNow.getDate()).padStart(2, '0')
        ].join('-');
        const qaCita = {
          id: 'QA-CITA',
          ID: 'QA-CITA',
          CitaID: 'QA-CITA',
          nombre: 'QA Auditoría',
          Cliente: 'QA Auditoría',
          fecha: qaDate,
          Fecha: qaDate,
          hora: '10:00',
          Hora: '10:00',
          servicio: 'Descarga muscular completa',
          Servicio: 'Descarga muscular completa',
          estado: 'Pendiente de pago',
          Estado: 'Pendiente de pago',
          precio: '10000',
          Precio: '10000'
        };
        const common = {
          ok: true, citas: [qaCita], pacientes: [], bloqueos: [], eventos: [], codigos: [],
          profesionales: [], pagos: [], cuentas: [], paquetes: [], comisiones: [],
          waitlist: [], queue: [], items: [], data: {}, kv: {}, history: [],
          currentUser: { id: 'qa', nombre: 'QA Auditoría', rol: 'Superadministradora' }
        };`;

if (!source.includes(newCommon)) {
  const count = source.split(oldCommon).length - 1;
  if (count !== 1) {
    throw new Error(`Se esperaba un bloque común de respuestas simuladas y se encontraron ${count}.`);
  }
  source = source.replace(oldCommon, newCommon);
  changes.push('Conservar una cita válida en todas las respuestas simuladas');
}

const oldOperations = `    try { operationsData = { citas: [], pagos: [], cuentas: [], paquetes: [], comisiones: [], waitlist: [] }; } catch (_) {}`;
const newOperations = `    try { operationsData = { citas: [...allData.citas], pagos: [], cuentas: [], paquetes: [], comisiones: [], waitlist: [] }; } catch (_) {}`;
if (!source.includes(newOperations)) {
  const count = source.split(oldOperations).length - 1;
  if (count !== 1) {
    throw new Error(`Se esperaba una inicialización de operationsData y se encontraron ${count}.`);
  }
  source = source.replace(oldOperations, newOperations);
  changes.push('Compartir la cita simulada con el módulo de operaciones');
}

fs.writeFileSync(target, source, 'utf8');
console.log(changes.length
  ? `Prueba v3 actualizada:\n- ${changes.join('\n- ')}`
  : 'La prueba v3 ya estaba actualizada.');
