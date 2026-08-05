import fs from 'node:fs';

const [frontendPath='index.html', backendPath='backend-google-apps-script.js', outPath='HOTFIX_AGENDAMIENTO_DIAGNOSTICO.md'] = process.argv.slice(2);
const frontend = fs.readFileSync(frontendPath,'utf8').replace(/^\uFEFF/,'');
const backend = fs.readFileSync(backendPath,'utf8').replace(/^\uFEFF/,'');

function extractNamedFunction(source, name) {
  const re = new RegExp(`(?:async\\s+)?function\\s+${name.replace(/[$]/g,'\\$&')}\\s*\\(`,'g');
  const matches = [...source.matchAll(re)];
  if (!matches.length) return null;
  const start = matches[0].index;
  const open = source.indexOf('{', start);
  let depth=0, quote='', escaped=false, lineComment=false, blockComment=false;
  for (let i=open;i<source.length;i++) {
    const ch=source[i], next=source[i+1];
    if (lineComment) { if (ch==='\n') lineComment=false; continue; }
    if (blockComment) { if (ch==='*'&&next==='/') { blockComment=false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped=false; continue; }
      if (ch==='\\') { escaped=true; continue; }
      if (ch===quote) quote='';
      continue;
    }
    if (ch==='/'&&next==='/') { lineComment=true; i++; continue; }
    if (ch==='/'&&next==='*') { blockComment=true; i++; continue; }
    if (ch==='"'||ch==="'"||ch==='`') { quote=ch; continue; }
    if (ch==='{') depth++;
    if (ch==='}') { depth--; if (depth===0) return source.slice(start,i+1); }
  }
  throw new Error(`No se pudo cerrar ${name}`);
}

function objectKeysNear(code, marker) {
  const pos = code.indexOf(marker);
  if (pos < 0) return [];
  const open = code.indexOf('{', pos);
  if (open < 0) return [];
  let depth=0, quote='', escaped=false, end=-1;
  for (let i=open;i<code.length;i++) {
    const ch=code[i];
    if (quote) {
      if (escaped) { escaped=false; continue; }
      if (ch==='\\') { escaped=true; continue; }
      if (ch===quote) quote='';
      continue;
    }
    if (ch==='"'||ch==="'"||ch==='`') { quote=ch; continue; }
    if (ch==='{') depth++;
    if (ch==='}') { depth--; if (depth===0) { end=i; break; } }
  }
  if (end<0) return [];
  const body=code.slice(open+1,end);
  return [...body.matchAll(/(?:^|[,\n])\s*([A-Za-z_$][\w$]*)\s*:/g)].map(m=>m[1]);
}

const single = extractNamedFunction(frontend,'submitAdminBooking');
const multi = extractNamedFunction(frontend,'submitAdminBookingMulti');
const create = extractNamedFunction(backend,'createBooking');
const post = extractNamedFunction(backend,'doPost');
if (!single || !multi || !create || !post) throw new Error('Falta una función necesaria para el diagnóstico.');

const report = [];
report.push('# Diagnóstico aislado — agendamiento');
report.push('');
report.push('## Campos detectados');
report.push('');
report.push(`- Envío individual: ${objectKeysNear(single,'const data =').join(', ') || 'no detectados'}`);
report.push(`- Base de envío múltiple: ${objectKeysNear(multi,'const baseData =').join(', ') || 'no detectados'}`);
report.push(`- Payload por fecha: ${objectKeysNear(multi,'const payload =').join(', ') || 'no detectados'}`);
report.push('');
report.push('## Indicadores');
report.push('');
report.push(`- Individual usa POST: ${/method\s*:\s*['"]POST['"]/.test(single)}`);
report.push(`- Múltiple usa POST: ${/method\s*:\s*['"]POST['"]/.test(multi)}`);
report.push(`- Múltiple oculta d.error: ${!/(d\.error|errorMessages|erroresDetalle)/.test(multi)}`);
report.push(`- doPost termina en createBooking(d, false): ${/createBooking\(d,\s*false\)/.test(post)}`);
report.push(`- Backend revisa d.time: ${/d\.time/.test(create)}`);
report.push(`- Backend revisa d.date: ${/d\.date/.test(create)}`);
report.push(`- Backend revisa d.name: ${/d\.name/.test(create)}`);
report.push(`- Backend revisa d.services: ${/d\.services/.test(create)}`);
report.push('');
for (const [title,code] of [['submitAdminBooking',single],['submitAdminBookingMulti',multi],['doPost',post],['createBooking',create]]) {
  report.push(`## ${title}`,'','```javascript',code,'```','');
}
fs.writeFileSync(outPath,report.join('\n'),'utf8');
console.log('Diagnóstico generado.');
