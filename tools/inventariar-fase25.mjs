import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');
const moduleDir = 'js/modules';
const moduleFiles = fs.existsSync(moduleDir)
  ? fs.readdirSync(moduleDir).filter(f => f.endsWith('.js')).sort()
  : [];
const moduleSources = moduleFiles.map(file => ({file, src: fs.readFileSync(`${moduleDir}/${file}`, 'utf8')}));

function extractFunctionAt(start) {
  const brace = html.indexOf('{', start);
  if (brace < 0) return null;
  let depth = 0, quote = null, template = false, lineComment = false, blockComment = false, esc = false;
  for (let i = brace; i < html.length; i++) {
    const c = html[i], n = html[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (template) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '`') { template = false; continue; }
      // Braces inside templates are intentionally counted. This is conservative.
    } else {
      if (c === '/' && n === '/') { lineComment = true; i++; continue; }
      if (c === '/' && n === '*') { blockComment = true; i++; continue; }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === '`') { template = true; continue; }
    }
    if (c === '{') depth++;
    if (c === '}') {
      depth--;
      if (depth === 0) return {start, end: i + 1, code: html.slice(start, i + 1)};
    }
  }
  return null;
}

const funcs = [];
const re = /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
for (const m of html.matchAll(re)) {
  const block = extractFunctionAt(m.index);
  if (!block) continue;
  const line = html.slice(0, m.index).split('\n').length;
  const before = html.slice(0, m.index).split('\n').slice(-4).reverse().find(x => /^\s*\/\//.test(x))?.trim() || '';
  const isAdapter = /window\.Panel[A-Za-z0-9_$]+/.test(block.code) && block.code.split('\n').length <= 12;
  funcs.push({name:m[1], line, header:before, code:block.code, isAdapter});
}

const remaining = funcs.filter(f => !f.isAdapter);
const utilityName = /^(?:esc|escape|fmt|format|norm|normalize|parse|safe|to|from|is|has|get|set|kv|today|date|time|slug|debounce|throttle|sleep|clamp|sum|group|sort|unique|copy|download|csv|toast|closeModal|openModal|status|money|phone|email|id)/i;
const utilityHeader = /(UTIL|HELPER|FORMATO|FECHA|MONEDA|ALMACEN|STORAGE|GENERAL|COMÚN|COMUN)/i;

function countRefs(name, src) {
  return (src.match(new RegExp(`\\b${name.replace(/[$]/g,'\\$&')}\\b`, 'g')) || []).length;
}

const candidates = remaining.map(f => {
  const moduleRefs = moduleSources
    .map(({file,src}) => ({file, count:countRefs(f.name, src)}))
    .filter(x => x.count > 0);
  const indexRefs = countRefs(f.name, html);
  const score = moduleRefs.length * 10 + indexRefs + (utilityName.test(f.name) ? 8 : 0) + (utilityHeader.test(f.header) ? 6 : 0);
  return {...f, moduleRefs, indexRefs, score};
}).filter(f => f.moduleRefs.length > 0 || utilityName.test(f.name) || utilityHeader.test(f.header));

candidates.sort((a,b) => b.score - a.score || a.line - b.line);

const declarations = [];
const declRe = /^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm;
for (const m of html.matchAll(declRe)) {
  const name = m[1];
  const moduleRefs = moduleSources.filter(({src}) => countRefs(name, src) > 0).map(x => x.file);
  if (!moduleRefs.length) continue;
  declarations.push({name, line:html.slice(0,m.index).split('\n').length, moduleRefs});
}

const out = [];
out.push('# Inventario Fase 25 — Utilidades e integración final', '');
out.push(`- Funciones declaradas en index: **${funcs.length}**.`);
out.push(`- Adaptadores delegados detectados: **${funcs.filter(f=>f.isAdapter).length}**.`);
out.push(`- Funciones no adaptadoras: **${remaining.length}**.`);
out.push(`- Candidatas compartidas: **${candidates.length}**.`);
out.push(`- Declaraciones globales usadas por módulos: **${declarations.length}**.`, '');
out.push('## Candidatas compartidas', '');
for (const f of candidates) {
  out.push(`### ${f.name}`);
  out.push(`- Línea: ${f.line}`);
  out.push(`- Encabezado: ${f.header || '—'}`);
  out.push(`- Referencias en index: ${f.indexRefs}`);
  out.push(`- Módulos consumidores (${f.moduleRefs.length}): ${f.moduleRefs.map(x=>`${x.file} (${x.count})`).join(', ') || 'ninguno'}`);
  out.push(`- Puntaje: ${f.score}`);
  out.push('');
}
out.push('## Declaraciones globales consumidas por módulos', '');
for (const d of declarations) out.push(`- \`${d.name}\` — línea ${d.line} — ${d.moduleRefs.join(', ')}`);
out.push('', '## Funciones no adaptadoras restantes', '');
for (const f of remaining) out.push(`- \`${f.name}\` — línea ${f.line} — ${f.header || 'sin encabezado'}`);
out.push('');

fs.writeFileSync('INVENTARIO_FASE25.md', out.join('\n'));
console.log(`Inventario final: ${funcs.length} funciones, ${candidates.length} candidatas compartidas.`);
