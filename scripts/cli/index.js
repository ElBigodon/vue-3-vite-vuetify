import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FILE_PATH = fileURLToPath(new URL(import.meta.url));

const DIR_PATH = dirname(FILE_PATH);

const files = await readdir(join(DIR_PATH, 'handlers'), { withFileTypes: true });

const args = process.argv.slice(2);

const DEFAULT_PARAMS = ['cmd', 'args', 'handler']

const toRelativePath = (path) => path.replace(process.cwd(), '')

const validateCommand = (cmd) => {
  for (const param of DEFAULT_PARAMS) {
    if (!(param in cmd)) return [false, param];
  }

  return [true, null];
}

/** @param {string[]} params */
const transformParams = (params) => {
  const excludeIndexes = [];
  
  return params.reduce((obj, param, i) => {
    if (excludeIndexes.includes(i)) return obj;
    
    if (param.startsWith('--')) {

      if (param.includes('=')) {
        const [key,value] = param.split('=');
        obj[key.slice(2)] = value;
        return obj;
      }

      if (params[i + 1] && !params[i + 1].startsWith('--')) {
        obj[param.slice(2)] = params[i + 1];
        excludeIndexes.push(i + 1)
        return obj;
      }
      
      obj[param.slice(2)] = true;

      return obj;
      
    }
    
    return obj;

  }, {})
}

for (const file of files) {
  const { name, path } = file;

  const fullPath = join(path, name);

  const data = await import(fullPath);

  if (!data.default) 
    throw new Error(`O arquivo '${toRelativePath(fullPath)}' não possuí uma exportação padrão. Não foi possível identificar o comando.`);

  const command = data.default;

  if (typeof command == 'object') {
  
    const [success, param] = validateCommand(command);
    
    if (!success) {
      throw new Error(`O arquivo '${toRelativePath(fullPath)}' Não é um comando válido, por favor, inclua a propriedade: ${param}.`);
    }

    console.log(transformParams(args));

  }

  if (Array.isArray(command)) {

  }

  continue;

}