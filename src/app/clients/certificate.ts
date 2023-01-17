import config from '../config/config';
import {BaseTx, Key, KeyDAO, newClient, PubkeyType, SdkError} from '@irita/irita-sdk';
import {v4 as uuid} from 'uuid';

class IritaKeyDAO implements KeyDAO {
  // TODO address and privKey need to config in .env
  async read(name: string): Promise<Key> {
    return {
      // address and privKey should not be pushed to repo
      address: '',
      // tslint:disable-next-line:max-line-length
      privKey: '',
    };
  }

  delete(name: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  write(name: string, key: Key): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export const generateDenomId = (): string => `thoughtworks${uuid().replace(/-/g, '')}`;

export const generateCertificateId = (count: number): string => `cert${uuid().replace(/-/g, '')}${count.toString().padStart(10, '0')}`;

export const generateSchema = () => {
//  const settings: TJS.PartialArgs = {
//    required: true,
//  };
//  const compilerOptions: TJS.CompilerOptions = {
//    strictNullChecks: true,
//  };
//  const program = TJS.getProgramFromFiles([resolve('src/app/models/certificate.model.ts')], compilerOptions);
//  return JSON.stringify(TJS.generateSchema(program, 'CertificateModel', settings));
  return '';
};

// Instantiate client 实例化客户端
const headers = config.irita.apiKey && { headers: { 'x-api-key': config.irita.apiKey } };
export const client = newClient({
  node: config.irita.node,
  chainId: config.irita.chainId,
  keyDAO: new IritaKeyDAO(),
  rpcConfig: { ...headers, timeout: 20000 },
});

export const getAdminAddress = async (): Promise<string> => {
  try {
    return await client.keys.show(config.irita.adminKeyName);
  } catch (e) {
    // Recover admin key
    if (e instanceof SdkError) {
      // tslint:disable-next-line:max-line-length
      return await client.keys.recover(config.irita.adminKeyName, config.irita.keystorePassword, config.irita.adminKeyMnemonic, PubkeyType.sm2);
    }
    throw e;
  }
};

export const newBaseTxForDenom = (baseTx?: Partial<BaseTx>): BaseTx => {
  const amount = '400000';
  return {
    from: config.irita.adminKeyName,
    password: config.irita.keystorePassword,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount: '400000',
    },
    gas: amount,
  };
};

export const newBaseTxForMint = (): BaseTx => {
  const amount = '400000';
  return {
    from: config.irita.adminKeyName,
    password: config.irita.keystorePassword,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount,
    },
    gas: amount,
  };
};

