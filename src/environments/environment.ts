// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var LC_APP_ID: string;
declare var LC_APP_KEY: string;

export const environment = {
  production: false,
  certViewUrl: 'http://cac.thoughtworks.cn:5000/certification/',
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
  IRITA_WALLET_ADDRESS: '',
  IRITA_WALLET_PRIVATE_KEY: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
