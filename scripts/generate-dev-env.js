import { writeFile, readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

console.log("Gerando arquivo '.env.development' ...");

const FILE_PATH = fileURLToPath(new URL(import.meta.url));

const DIR_PATH = dirname(FILE_PATH);

const ROOT_DIR = join(DIR_PATH, '..');

const files = await readdir(ROOT_DIR);

const envFile = files.find((f) => /^\.env?(\.development|)$/.test(f));

if (envFile) {
  console.log("Arquivo '%s' já existe. Abortando processo.", envFile);
  process.exit(0);
};

const exampleEnv = files.find((f) => f === '.env.example');

if (!exampleEnv) {
  console.log("Arquivo '.env.example' não encontrado. Abortando processo.");
  process.exit(1);
}

const rawExampleEnvData = await readFile(exampleEnv);

await writeFile(join(ROOT_DIR, '.env.development'), rawExampleEnvData, { encoding: 'utf-8' });

console.log("Arquivo '.env.development' gerado com sucesso!");
