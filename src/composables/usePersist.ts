import {createGlobalState} from "@vueuse/core";

export const usePersist = createGlobalState(() => {

  const _encryptData = useLocalStorage('persist', btoa(JSON.stringify({})));

  const _data = refWithControl(JSON.parse(atob(_encryptData.value)), {
    onChanged(value) {
      _encryptData.value = btoa(JSON.stringify(value))
    },
  });

  const define = (key: string, value: unknown) => {
    Object.assign(_data.value, {[key]: value});
  }
  
  const has = (key: string) => {
    return key in _data.value;
  }

  return {data: readonly(_data), define, has}
});