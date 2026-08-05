import fs from 'node:fs';
import vm from 'node:vm';

const target = process.argv[2] || 'index.html';
const html = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const adminLoginPattern = /body:\s*JSON\.stringify\(\{action:\s*'adminLogin',\s*user,\s*password:\s*pw\}\)\s*\}\s*,\s*(\d+)\s*\);/;
const match = html.match(adminLoginPattern);
assert(match, 'No se encontró la solicitud de adminLogin.');
assert(Number(match[1]) === 120000, 'adminLogin no quedó con 120 segundos de espera.');
assert((html.match(/action:\s*'adminLogin'/g) || []).length === 1, 'Debe existir una sola solicitud adminLogin.');
assert(html.includes("body: JSON.stringify({action: 'adminLogin', user, password: pw})"), 'El cuerpo de credenciales cambió.');
assert(html.includes("if (d.ok)"), 'El flujo de éxito del ingreso desapareció.');
assert(html.includes("TOKEN = d.sessionToken"), 'El ingreso dejó de guardar el token de sesión.');
assert(html.includes("sessionStorage.setItem('adminToken', d.sessionToken)"), 'El ingreso dejó de conservar la sesión.');

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(matchItem => matchItem[1])
  .join('\n;\n');
new vm.Script(inlineScripts, {filename:'inline-scripts.js'});

console.log('HOTFIX LOGIN VALIDADO: solo aumenta la espera de adminLogin a 120 segundos y conserva la sesión.');
