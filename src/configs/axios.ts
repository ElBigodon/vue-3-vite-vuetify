import axios from 'axios';

const environment = import.meta.env;

let serverUrl = environment['VITE_SERVER_URL'];

if (!serverUrl) throw new Error('VITE_SERVER_URL não encontrado!')
else {

  const protocols = ['http://', 'https://'];

  if (!protocols.some((protocol) => serverUrl.startsWith(protocol))) {
    serverUrl = 'https://' + serverUrl;
  }

  // Verificando se URL está válida.
  new URL(serverUrl);

}

export const $axios = axios.create({
  baseURL: serverUrl,
  // Tratamento de erro futuro
  validateStatus: () => true,
  timeout: 7e3,
  timeoutErrorMessage: 'Servidor demorou demais para responder.',
});

$axios.interceptors.request.use((config) => {

  const abortController = new AbortController();

  config.signal = abortController.signal;

  Object.assign(config, { abortController });

  const persistData = reactive(usePersist());

  if (persistData.has('token'))
    config.headers.set('Authorization', `Bearer ${persistData.data.token}`);

  return config;
});

$axios.interceptors.response.use((res) => {
  
  return res;
}, (rej) => {

  return rej;
}, {

})