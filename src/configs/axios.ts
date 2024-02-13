import axios from 'axios';

const environment = import.meta.env;

let serverUrl = environment['VITE_SERVER_URL'];

if ( !serverUrl ) {
  throw new Error('VITE_SERVER_URL não encontrado!')
} else {

  if (!serverUrl.startsWith('http://' || !serverUrl.startsWith('https://'))) {
    serverUrl = 'http://' + serverUrl;
  }

  // Verificando se URL está válida.
  new URL(serverUrl);

}

export const $axios = axios.create({
  baseURL: serverUrl,
  // Tratamento de erro futuro
  validateStatus: () => true
});

$axios.interceptors.request.use((config) => {

  const persist = reactive(usePersist());

  config.headers.set('Authorization', `Bearer ${persist.data.token}`);

  return config;
});