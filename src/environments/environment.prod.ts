import {secretEnv} from './secret-env';

export const environment = {
  production: true,
  certViewUrl: 'https://cac.thoughtworks.cn/certification/',
  username: 'cac-admin',
  password: '001',
  IRITA_NODE: `${window.location.origin}/wenchangchain`,
  IRITA_CHAIN_ID: 'wenchangchain',
  JWT_SECRETKEY: '',
  APP_PORT: '3000',
  APP_ENV: 'dev',
  IRITA_DENOM_ID: 'thoughtworks165779e87abe418baeac6aef3a213135',
  IRITA_DENOM_NAME: 'Certificate',
  LC_SERVER_URLS: 'https://shared.lc-cn-n1-shared.com',
  ...secretEnv
};
