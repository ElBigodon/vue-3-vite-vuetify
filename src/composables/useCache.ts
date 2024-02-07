import {createGlobalState} from "@vueuse/core";

export const useCache = createGlobalState(() => {
  
  const _data = ref<Record<string, unknown>>({});

  const attach = (key: string, value: any) => {
    Object.assign(_data.value, { [key]: value })
  }
  
  const detach = (key: string) => {
    delete _data.value[key];
  }
  
  const drop = () => {
    _data.value = {};
  }
  
  return { data: readonly(_data), attach, detach, drop };
});