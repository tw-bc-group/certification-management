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
  JWT_SECRETKEY: '',
  APP_PORT: '3000',
  APP_ENV: 'dev',
  IRITA_DENOM_ID: 'thoughtworks179c38337e74492fb087bc4fc99847f8',
  IRITA_DENOM_NAME: 'Certificate',
  LC_SERVER_URLS: 'https://shared.lc-cn-n1-shared.com',
  ...secretEnv
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
