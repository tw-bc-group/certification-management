// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {secretEnv} from './secret-env';

export const environment = {
  production: false,
  certViewUrl: 'http://cac.thoughtworks.cn:5000/certification/',
  username: 'cac-admin',
  password: '001',
  IRITA_NODE: `${window.location.origin}/wenchangchain`,
  IRITA_CHAIN_ID: 'wenchangchain',
  IRITA_KEY_PASSWORD: '',
  IRITA_KEY_NAME: '',
  // tslint:disable-next-line:max-line-length
  IRITA_MNEMONIC: '',
  IRITA_API_KEY: '',
  JWT_SECRETKEY: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  APP_PORT: '3000',
  APP_ENV: 'dev',
  IRITA_DENOM_ID: 'thoughtworks7cf27df0d4ae45e8bfee4cca68871fa3',
  IRITA_DENOM_NAME: 'Certificate',
  LC_SERVER_URLS: 'https://shared.lc-cn-n1-shared.com',
  LC_APP_ID: '123',
  LC_APP_KEY: '321',
  IRITA_WALLET_ADDRESS: 'test_address',
  IRITA_WALLET_PRIVATE_KEY: 'private_key',
  REMOVE_BG_API_KEY: 'api_key'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
