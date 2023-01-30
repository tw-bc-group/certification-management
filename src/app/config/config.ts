import dev from './dev';
import {environment} from '../../environments/environment';

export interface Config {
  nodeEnv: string;
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
    denomId: string;
    denomName: string;
    walletAddress: string;
    encryptedWalletPrivateKey: string;
  };
}

export const app = {
  env: environment.APP_ENV || 'dev',
  port: environment.APP_PORT,
};

export const jwt = {
  secretKey: environment.JWT_SECRETKEY,
};

const irita = {
  node: environment.IRITA_NODE,
  chainId: environment.IRITA_CHAIN_ID,
  keystorePassword: environment.IRITA_KEY_PASSWORD,
  adminKeyName: environment.IRITA_KEY_NAME,
  adminKeyMnemonic: environment.IRITA_MNEMONIC,
  apiKey: environment.IRITA_API_KEY,
  denomId: environment.IRITA_DENOM_ID,
  denomName: environment.IRITA_DENOM_NAME,
  walletAddress: environment.IRITA_WALLET_ADDRESS,
  encryptedWalletPrivateKey: environment.IRITA_WALLET_PRIVATE_KEY
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
