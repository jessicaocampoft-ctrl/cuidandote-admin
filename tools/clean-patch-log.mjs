import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
const original = fs.readFileSync(target, 'utf8');
const withoutBom = original.replace(/^\uFEFF/, '');
const doctypeIndex = withoutBom.search(/<!doctype html>/i);

if (doctypeIndex < 0) {
  throw new Error('No se encontró <!DOCTYPE html>; se cancela la limpieza.');
}

const prefix = withoutBom.slice(0, doctypeIndex);
if (!prefix.trim()) {
  console.log('El archivo ya comienza correctamente con DOCTYPE.');
  process.exit(0);
}

const normalizedPrefix = prefix
  .replace(/\[OK\]\s*Patr[oó]n localizado:[^\[]*/gi, '')
  .replace(/\s+/g, '');

if (normalizedPrefix.length > 0) {
  throw new Error(`Hay contenido inesperado antes del DOCTYPE; no se eliminará automáticamente: ${prefix.trim().slice(0, 500)}`);
}

const cleaned = `\uFEFF${withoutBom.slice(doctypeIndex)}`;
const required = [
  'PAGO_APROBADO',
  'PAGO_RECHAZADO',
  'COMPROBANTE_RECIBIDO',
  'Escribe el valor recibido',
  'Selecciona la fecha del pago',
  'Selecciona el medio de pago',
  'const pagosUnicos = []'
];

for (const marker of required) {
  if (!cleaned.includes(marker)) {
    throw new Error(`La corrección se canceló porque falta el marcador funcional: ${marker}`);
  }
}

fs.writeFileSync(target, cleaned, 'utf8');
console.log('Se eliminaron únicamente los mensajes de diagnóstico anteriores al DOCTYPE.');
