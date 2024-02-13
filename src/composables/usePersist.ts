import {createGlobalState} from "@vueuse/core";
import { encrypt, decrypt } from '../configs/aes256';

export const usePersist = createGlobalState(() => {

  // @ts-ignore Essas chaves são geradas de forma escondida
  const { _GENERATED_KEY } = process.env;

  const _encryptData = useLocalStorage('persist', {}, {
    serializer: {
      read: (v) => v ? JSON.parse(decrypt(v, _GENERATED_KEY)) : null,
      write: (v) => encrypt(JSON.stringify(v), _GENERATED_KEY),
    }
  });

  const define = (key: string, value: unknown) => {
    Object.assign(_encryptData.value, { [key]: value })
  }
  
  const has = (key: string) => key in _encryptData.value;

  const keys = computed(() => Object.keys(_encryptData.value));

  const values = computed(() => Object.values(_encryptData.value));

  const entries = computed(() => Object.entries(_encryptData.value));

  return {data: readonly(_encryptData), define, has, keys, entries, values}
});