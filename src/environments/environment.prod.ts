declare var LC_APP_ID: string;
declare var LC_APP_KEY: string;
declare var IRITA_WALLET_ADDRESS: string;
declare var IRITA_WALLET_PRIVATE_KEY: string;

export const environment = {
  production: true,
  certViewUrl: 'https://cac.thoughtworks.cn/certification/',
  lcAppId: LC_APP_ID,
  lcAppKey: LC_APP_KEY,
  username: 'cac-admin',
  password: '001',
  IRITA_NODE: 'http://localhost:4200/testnet',
  IRITA_CHAIN_ID: 'testing',
  IRITA_KEY_PASSWORD: '12345678',
  IRITA_KEY_NAME: 'tw',
  // tslint:disable-next-line:max-line-length
  IRITA_MNEMONIC: 'exit effort connect element tiny squeeze worry brown great coffee canoe hole depend great comfort resemble visual patrol smart speak travel cushion damp lake',
  IRITA_API_KEY: '',
  JWT_SECRETKEY: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  APP_PORT: '3000',
  APP_ENV: 'dev',
  IRITA_DENOM_ID: 'thoughtworks165779e87abe418baeac6aef3a213135',
  IRITA_DENOM_NAME: 'Certificate',
  IRITA_WALLET_ADDRESS,
  IRITA_WALLET_PRIVATE_KEY
};
