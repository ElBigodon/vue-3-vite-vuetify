import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    abortController?: AbortController;
  }
}