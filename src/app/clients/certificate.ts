import config from '../config/config';
import {
  BaseTx,
  Key,
  KeyDAO,
  newClient,
  PubkeyType,
  SdkError,
  TxResult,
  TxType
} from '@irita/irita-sdk';
import {v4 as uuid} from 'uuid';
// import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';
import { CertificateModel } from '../models/certificate.model';

class IritaKeyDAO implements KeyDAO {
//  private wallets = DB.wallet;

  async write(name: string, key: Key): Promise<void> {
    console.log('123');
    // await this.wallets.create({
    //   data: {
    //     keyName: name,
    //     ...key,
    //   },
    // });
    return;
  }

  async read(name: string): Promise<Key> {
    console.log('321');
    // const wallet = await this.wallets.findFirst({
    //   where: {
    //     keyName: name,
    //   },
    // });
    // return {
    //   address: wallet && wallet.address ? wallet.address : '',
    //   privKey: wallet && wallet.privKey ? wallet.privKey : '',
    // };
    return {
      address: '',
      privKey: '',
    };
  }

  async delete(name: string): Promise<void> {
    // const wallet = await this.wallets.findFirst({
    //   where: {
    //     keyName: name,
    //   },
    // });
    // await this.wallets.delete({ where: { id: wallet.id } });
  }
}

export const generateDenomId = (): string => `thoughtworks${uuid().replace(/-/g, '')}`;

export const generateCertificateId = (count: number): string => `nft${uuid().replace(/-/g, '')}${count.toString().padStart(10, '0')}`;

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

export const newBaseTx = (baseTx?: Partial<BaseTx>): BaseTx => {
  const amount = '400000';
  const defaultBaseTx: BaseTx = {
    from: config.irita.adminKeyName,
    password: config.irita.keystorePassword,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount,
    },
    gas: amount,
  };
  Object.assign(defaultBaseTx, baseTx);
  return defaultBaseTx;
};

const newBaseTxForMint = (): BaseTx => {
  const defaultBaseTx: BaseTx = {
    from: config.irita.adminKeyName,
    password: config.irita.keystorePassword,
    pubkeyType: PubkeyType.sm2,
    fee: {
      denom: 'ugas',
      amount: '400000',
    },
    gas: '400000',
  };
  return defaultBaseTx;
};

// https://github.com/bianjieai/opb-faq/issues/21
// export const mintAndTransfer = async (nft: Nft): Promise<TxResult> => {
//   console.log('Minting NFT: ', nft);
//   const sender = await getAdminAddress();
//   const msgs: any[] = [
//     {
//       type: TxType.MsgMintNFT,
//       value: {
//         id: nft.nft.id,
//         denom_id: nft.denom.id,
//         name: nft.nft.name,
//         uri: nft.imageUrl,
//         data: JSON.stringify(nft),
//         sender,
//         recipient: nft.creator.wallet,
//       },
//     },
//   ];
//   return await client.tx.buildAndSend(msgs, newBaseTxForMint());
// };

// Instantiate client 实例化客户端
const headers = config.irita.apiKey && { headers: { 'x-api-key': config.irita.apiKey } };
export const client = newClient({
  node: config.irita.node,
  chainId: config.irita.chainId,
  keyDAO: new IritaKeyDAO(),
  rpcConfig: { ...headers, timeout: 20000 },
});
