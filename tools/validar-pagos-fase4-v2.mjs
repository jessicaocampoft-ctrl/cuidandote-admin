import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'tools/validar-pagos-fase4.mjs';
const tempPath = 'tools/.validar-pagos-fase4-runtime.mjs';
let source = fs.readFileSync(sourcePath, 'utf8');

const oldText = "  confirm: () => true,\n";
const newText = "  confirm: () => true,\n  prompt: () => '',\n";
if (!source.includes(newText)) {
  const count = source.split(oldText).length - 1;
  if (count !== 1) throw new Error(`No se pudo preparar prompt() en la prueba; coincidencias: ${count}.`);
  source = source.replace(oldText, newText);
}

fs.writeFileSync(tempPath, source, 'utf8');
const result = spawnSync(process.execPath, [tempPath, ...process.argv.slice(2)], { stdio: 'inherit' });
fs.rmSync(tempPath, { force: true });
process.exit(result.status ?? 1);
