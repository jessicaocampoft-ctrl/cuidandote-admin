import fs from 'node:fs';

const target = process.argv[2] || 'index.html';
let html = fs.readFileSync(target, 'utf8');
const hadBom = html.charCodeAt(0) === 0xFEFF;
if (hadBom) html = html.slice(1);

const oldBlock = `    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'adminLogin', user, password: pw})
    }, 45000);`;

const newBlock = `    const d = await fetchJsonWithTimeout(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({action: 'adminLogin', user, password: pw})
    }, 120000);`;

if (html.includes(newBlock)) {
  console.log('El hotfix de ingreso ya estaba aplicado.');
  process.exit(0);
}

const occurrences = html.split(oldBlock).length - 1;
if (occurrences !== 1) {
  throw new Error('El bloque de ingreso esperado debe aparecer exactamente una vez; encontrado: ' + occurrences);
}

html = html.replace(oldBlock, newBlock);
fs.writeFileSync(target, (hadBom ? '\uFEFF' : '') + html, 'utf8');
console.log('Hotfix aplicado: el ingreso administrativo espera hasta 120 segundos.');
