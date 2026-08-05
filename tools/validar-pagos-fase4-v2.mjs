import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'tools/validar-pagos-fase4.mjs';
const tempPath = 'tools/.validar-pagos-fase4-runtime.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');

const oldConfirm = "  confirm: () => true,\n";
const newConfirm = "  confirm: () => true,\n  prompt: () => '',\n";
if (!source.includes(newConfirm)) {
  const count = source.split(oldConfirm).length - 1;
  if (count !== 1) throw new Error(`No se pudo preparar prompt() en la prueba; coincidencias: ${count}.`);
  source = source.replace(oldConfirm, newConfirm);
}

const oldElement = "    focus() { this.focused = true; },\n    dispatchEvent() {},\n";
const newElement = "    focus() { this.focused = true; },\n    scrollIntoView() { this.scrolled = true; },\n    dispatchEvent() {},\n";
if (!source.includes(newElement)) {
  const count = source.split(oldElement).length - 1;
  if (count !== 1) throw new Error(`No se pudo preparar scrollIntoView() en la prueba; coincidencias: ${count}.`);
  source = source.replace(oldElement, newElement);
}

fs.writeFileSync(tempPath, source, 'utf8');
const result = spawnSync(process.execPath, [tempPath, ...process.argv.slice(2)], { stdio: 'inherit' });
fs.rmSync(tempPath, { force: true });
process.exit(result.status ?? 1);
