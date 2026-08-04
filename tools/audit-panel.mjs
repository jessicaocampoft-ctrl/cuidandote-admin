import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const target = process.argv[2] || 'index.html';
const raw = fs.readFileSync(target, 'utf8');
const html = raw.replace(/^\uFEFF/, '');
const findings = [];
const outputDir = path.resolve('audit-output');

function add(severity, code, message, detail = '') {
  findings.push({ severity, code, message, detail });
}

function unique(values) {
  return [...new Set(values)];
}

function lineNumber(source, index) {
  return source.slice(0, Math.max(0, index)).split('\n').length;
}

const doctypeIndex = html.search(/<!doctype html>/i);
const prefix = doctypeIndex >= 0 ? html.slice(0, doctypeIndex) : html.slice(0, 500);
if (doctypeIndex < 0) {
  add('CRITICAL', 'HTML_NO_DOCTYPE', 'El archivo no contiene <!DOCTYPE html>.');
} else if (prefix.trim().length > 0) {
  add('CRITICAL', 'HTML_BEFORE_DOCTYPE', 'Hay texto ejecutable o de diagnóstico antes del DOCTYPE.', prefix.trim().slice(0, 500));
}
if (/\[OK\]\s*Patr[oó]n localizado/i.test(prefix)) {
  add('CRITICAL', 'PATCH_LOG_IN_HTML', 'Un script de corrección insertó mensajes de diagnóstico dentro del HTML.');
}

const markupOnly = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

const idMatches = [...markupOnly.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)];
const ids = idMatches.map(m => m[1]);
const idCounts = new Map();
for (const id of ids) idCounts.set(id, (idCounts.get(id) || 0) + 1);
for (const [id, count] of idCounts) {
  if (count > 1) {
    const lines = idMatches.filter(m => m[1] === id).map(m => lineNumber(markupOnly, m.index));
    add('CRITICAL', 'DUPLICATE_ID', `El id "${id}" aparece ${count} veces en el HTML estático.`, `Líneas aproximadas: ${lines.join(', ')}`);
  }
}

// Algunos formularios se construyen con helpers de plantilla. Registrar sus IDs reales
// evita marcar como ausentes elementos que sí se crean al renderizar la vista.
const generatedIds = new Set();
for (const match of html.matchAll(/\$\{inp\(\s*["']([^"']+)["']/g)) {
  generatedIds.add(`pm_${match[1]}`);
}
for (const match of html.matchAll(/\$\{inpDoble\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g)) {
  generatedIds.add(`pm_${match[1]}`);
  generatedIds.add(`pm_${match[2]}`);
}
const knownIds = new Set([...ids, ...generatedIds]);

const directIdRefs = [
  ...html.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g),
  ...html.matchAll(/querySelector\(\s*["']#([A-Za-z][\w:.-]*)["']\s*\)/g)
].map(m => m[1]);
for (const ref of unique(directIdRefs)) {
  if (!knownIds.has(ref) && !new RegExp(`id\\s*=\\s*[\\"']${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\"']`).test(html)) {
    add('WARNING', 'MISSING_STATIC_ID', `El código consulta #${ref}, pero no existe un id literal ni generado con ese nombre.`, 'Requiere revisión manual.');
  }
}

const sectionTargets = unique([...markupOnly.matchAll(/data-section\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]));
for (const section of sectionTargets) {
  if (!idCounts.has(section) && !idCounts.has(`section-${section}`) && !idCounts.has(`${section}Section`)) {
    add('WARNING', 'SECTION_TARGET_NOT_FOUND', `El menú apunta a la sección "${section}", pero no se encontró un contenedor estático equivalente.`);
  }
}

const legacyStateCalls = [
  ...html.matchAll(/verifyPayment\([^)]*["'](Aprobado|Rechazado|Por verificar)["'][^)]*\)/g),
  ...html.matchAll(/[?&]estado=(Aprobado|Rechazado|Por%20verificar|Por verificar)/g)
];
for (const match of legacyStateCalls) {
  add('CRITICAL', 'LEGACY_PAYMENT_STATE', `El flujo de pagos todavía envía el estado antiguo "${match[1]}".`, `Línea aproximada ${lineNumber(html, match.index)}: ${match[0].slice(0, 250)}`);
}

for (const state of ['PAGO_APROBADO', 'PAGO_RECHAZADO', 'COMPROBANTE_RECIBIDO']) {
  if (!html.includes(state)) add('CRITICAL', 'PAYMENT_STATE_MISSING', `No aparece el estado canónico ${state} en el panel.`);
}

if (/APPS_SCRIPT_URL\s*=\s*["']\s*["']/.test(html)) {
  add('CRITICAL', 'EMPTY_API_URL', 'APPS_SCRIPT_URL está vacío.');
}
if (/APPS_SCRIPT_URL\s*=\s*["']http:\/\//.test(html)) {
  add('CRITICAL', 'INSECURE_API_URL', 'APPS_SCRIPT_URL usa HTTP en lugar de HTTPS.');
}

const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(code => code.trim() && !/^\s*[\[{]/.test(code));

fs.mkdirSync(outputDir, { recursive: true });
if (inlineScripts.length === 0) {
  add('WARNING', 'NO_INLINE_SCRIPT', 'No se encontraron bloques JavaScript internos para validar.');
} else {
  const jsPath = path.join(outputDir, 'inline-scripts.js');
  fs.writeFileSync(jsPath, inlineScripts.join('\n;\n'), 'utf8');
  const syntax = spawnSync(process.execPath, ['--check', jsPath], { encoding: 'utf8' });
  if (syntax.status !== 0) {
    add('CRITICAL', 'JAVASCRIPT_SYNTAX', 'El JavaScript del panel contiene un error de sintaxis.', `${syntax.stdout || ''}\n${syntax.stderr || ''}`.trim().slice(0, 3000));
  }
}

const scriptSource = inlineScripts.join('\n;\n');
const functionDeclarations = [...scriptSource.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m => m[1]);
const duplicateFunctions = [...new Set(functionDeclarations.filter((name, index, arr) => arr.indexOf(name) !== index))];
for (const name of duplicateFunctions) {
  const count = functionDeclarations.filter(n => n === name).length;
  add('WARNING', 'DUPLICATE_FUNCTION', `La función ${name} está declarada ${count} veces.`);
}

const onclickFunctions = unique([...markupOnly.matchAll(/\bonclick\s*=\s*["']\s*([A-Za-z_$][\w$]*)\s*\(/gi)].map(m => m[1]));
const declaredNames = new Set([
  ...functionDeclarations,
  ...[...scriptSource.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/g)].map(m => m[1])
]);
const browserBuiltins = new Set(['alert', 'confirm', 'open', 'print', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval']);
const languageKeywords = new Set(['if', 'for', 'while', 'switch', 'return', 'try', 'catch']);
for (const name of onclickFunctions) {
  if (!declaredNames.has(name) && !browserBuiltins.has(name) && !languageKeywords.has(name)) {
    add('WARNING', 'MISSING_CLICK_HANDLER', `El HTML llama ${name}() desde un botón, pero no se encontró su declaración estática.`);
  }
}

const critical = findings.filter(f => f.severity === 'CRITICAL');
const warnings = findings.filter(f => f.severity === 'WARNING');
const reportLines = [
  '# Resultado de auditoría automática',
  '',
  `- Archivo: \`${target}\``,
  `- IDs estáticos encontrados: ${ids.length}`,
  `- IDs generados reconocidos: ${generatedIds.size}`,
  `- Secciones de menú detectadas: ${sectionTargets.length}`,
  `- Bloques JavaScript revisados: ${inlineScripts.length}`,
  `- Hallazgos críticos: ${critical.length}`,
  `- Advertencias: ${warnings.length}`,
  '',
  '## Hallazgos',
  ''
];

if (findings.length === 0) {
  reportLines.push('No se encontraron fallas mediante estas comprobaciones estáticas. Esto no sustituye las pruebas funcionales en el navegador.');
} else {
  findings.forEach((f, index) => {
    reportLines.push(`${index + 1}. **${f.severity} · ${f.code}** — ${f.message}`);
    if (f.detail) reportLines.push(`   - ${f.detail.replace(/\n/g, ' ').slice(0, 1000)}`);
  });
}

reportLines.push('', '## Alcance', '', 'Esta auditoría detecta regresiones estructurales y de contrato. Inicio de sesión, permisos, llamadas reales al backend, carga de archivos y persistencia deben validarse además con pruebas funcionales controladas.');

fs.writeFileSync(path.join(outputDir, 'resultado-auditoria.md'), reportLines.join('\n'), 'utf8');
fs.writeFileSync(path.join(outputDir, 'resultado-auditoria.json'), JSON.stringify({ target, critical, warnings, findings, generatedIds: [...generatedIds] }, null, 2), 'utf8');
console.log(reportLines.join('\n'));

process.exit(critical.length > 0 ? 1 : 0);
