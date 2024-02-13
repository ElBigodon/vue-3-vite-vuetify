import {createGlobalState} from "@vueuse/core";

export const useCache = createGlobalState(() => {
  
  const _data = ref<Record<string, unknown>>({});

  const attach = (key: string, value: any) => {
    Object.assign(_data.value, { [key]: value })
  }
  
  const detach = (key: string) => {
    delete _data.value[key];
  }

  const has = (key: string) => key in _data.value;
  
  const drop = () => {
    _data.value = {};
  }
  
  return { data: readonly(_data), attach, detach, drop, has };
});

export const useSharedCache = createSharedComposable(useCache);