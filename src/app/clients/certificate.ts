import config from '../config/config';
import {BaseTx, Key, KeyDAO, newClient, PubkeyType, SdkError} from '@irita/irita-sdk';
import {v4 as uuid} from 'uuid';
import {fetchWallet, saveWallet} from '../utils/walletStorage';
import { map } from 'lodash';
import {environment} from '../../environments/environment';

class IritaKeyDAO implements KeyDAO {
  async read(name: string): Promise<Key> {
    const obj = await fetchWallet({name});
    if (!obj) {
      return undefined;
    }
    // @ts-ignore
    const key = obj.attributes;
    return {
      address: key.address,
      privKey: key.privKey
    };
  }

  delete(name: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async write(name: string, key: Key): Promise<void> {
    saveWallet({keyName: name, ...key});
  }
}

export const generateDenomId = (): string => `Thoughtworks${uuid().replace(/-/g, '')}`;

export const generateCertificateId = (count: number): string => `cert${uuid().replace(/-/g, '')}${count.toString().padStart(10, '0')}`;


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

export const createNewKey = async (): Promise<{
  address: string;
}> => {
  try {
    console.log('check start <<<<<<<<<<<<<<<<<');
    // return await client.keys.add(environment.IRITA_KEY_NAME, environment.IRITA_KEY_PASSWORD, PubkeyType.sm2);
    const encryptedPrivKey = client.config.keyDAO.encrypt(
      environment.IRITA_WALLET_PRIVATE_KEY,
      environment.IRITA_KEY_PASSWORD
    );
    await client.config.keyDAO.write(environment.IRITA_KEY_NAME, {
      address: environment.IRITA_WALLET_ADDRESS,
      privKey: encryptedPrivKey,
    });
    return {address: environment.IRITA_WALLET_ADDRESS};
  } catch (e) {
    console.log('>>>>>>>>>>>>>>>>>>>>> error check');
    throw e;
  }
};

export const newBaseTxForDenom = (baseTx?: Partial<BaseTx>): BaseTx => {
  const amount = '1200000';
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

