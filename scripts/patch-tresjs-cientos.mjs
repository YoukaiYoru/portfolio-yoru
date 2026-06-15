import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function main() {
  let packageJsonPath;

  try {
    packageJsonPath = require.resolve('@tresjs/cientos/package.json');
  } catch {
    return;
  }

  const packageDir = dirname(packageJsonPath);
  const distPath = join(packageDir, 'dist', 'trescientos.js');
  const source = await readFile(distPath, 'utf8');
  const brokenImport = 'from "three-custom-shader-material/vanilla"';
  const fixedImport = 'from "three-custom-shader-material/vanilla/dist/three-custom-shader-material-vanilla.cjs.js"';

  if (!source.includes(brokenImport) || source.includes(fixedImport)) {
    return;
  }

  const patched = source.replace(brokenImport, fixedImport);
  await writeFile(distPath, patched);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});