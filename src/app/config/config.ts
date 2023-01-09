import dev from './dev';
import {environment} from '../../environments/environment';

export interface Config {
  app: {
    env: string;
    port: string;
  };
  logger: {
    format?: string;
    dir?: string;
  };
  jwt: {
    secretKey?: string;
  };
  irita: {
    node: string;
    chainId: string;
    keystorePassword: string;
    adminKeyName: string;
    adminKeyMnemonic: string;
    apiKey: string;
  };
}

export const app = {
  env: 'dev',
  port: '',
};

export const jwt = {
  secretKey: environment.JWT_SECRETKEY,
};

const irita = {
  node: process.env.IRITA_NODE,
  chainId: process.env.IRITA_CHAIN_ID,
  keystorePassword: process.env.IRITA_KEY_PASSWORD,
  adminKeyName: process.env.IRITA_KEY_NAME,
  adminKeyMnemonic: process.env.IRITA_MNEMONIC,
  apiKey: process.env.IRITA_API_KEY,
};

// tslint:disable-next-line:variable-name
const env_cfg = {
  dev,
};

const config: Config = {
  app,
  jwt,
  irita,
  ...env_cfg[app.env],
};
export default config;
