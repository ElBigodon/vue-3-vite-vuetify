import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile } from 'node:fs/promises';

const FILE_PATH = fileURLToPath(new URL(import.meta.url));

const DIR_PATH = dirname(FILE_PATH);

const ROOT_DIR = join(DIR_PATH, '..');

const files = await readdir(ROOT_DIR, { withFileTypes: true });

for (const file of files) {

  if (!file.name.startsWith('.env')) continue;

  if (file.name.endsWith('.example') || file.name.split('.').slice(1).length > 2) continue;

  const { name, path } = file;

  const fullPath = join(path, name);

  console.log("Gerando chave (32 bytes) no arquivo '%s'", name);
    
  const rawFileData = await readFile(fullPath, { encoding: 'utf-8' })

  const fileData = rawFileData
    .split('\n')
    .filter((v) => !v.startsWith('#') && v.includes('='))
    .map((v) => v.split('='));

  const environmentData = Object.fromEntries(fileData);

  if (Object.keys(environmentData).includes('_GENERATED_KEY')) {
    console.log("Arquivo '%s' já possui uma chave gerada. Abortando processo.", name);
    process.exit(0);
  }

  Object.assign(environmentData, { 
    _GENERATED_KEY: generateKey().toString('hex')
  })

  const toEnvFormat = Object
    .entries(environmentData)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await writeFile(fullPath, toEnvFormat);

  console.log('As chave foi gerada com sucesso! Confira o arquivo: %s', fullPath);

  break;
}

// Funções utilitárias

function generateKey() {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
}