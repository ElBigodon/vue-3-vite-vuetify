import CryptoJS from 'crypto-js';

export const encrypt = (data: string, key: string) => CryptoJS.AES.encrypt(data, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}).toString();

export const decrypt = (data: string, key: string) => CryptoJS.AES.decrypt(data, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8);