// import { HttpException } from '@exceptions/HttpException';
import {
  client,
  generateCertificateId,
  generateDenomId,
  getAdminAddress,
  newBaseTxForDenom,
  newBaseTxForMint,
} from '../clients/certificate';
import { Client, TxResult, TxType } from '@irita/irita-sdk';
import {
  CertificateModel,
  CertificateType,
  DpmLevel,
} from '../models/certificate.model';
import config from '../config';
import {environment} from '../../environments/environment';

class CertificateService {
  certificateClient: Client;

  constructor(certificateClient?: Client) {
    this.certificateClient = certificateClient || client;
  }

  /**
   * issue denom
   * @param denomName string denom name
   * @returns Transaction hash string
   */
  public async issueDenom(
    denomName: string
  ): Promise<{ denomId: string; hash: string }> {
    const denomId = generateDenomId();
    const schema = '';
    const baseTx = newBaseTxForDenom();
    const response = await this.certificateClient.nft.issueDenom(
      denomId,
      denomName,
      schema,
      true,
      true,
      baseTx
    );
    return {
      denomId,
      hash: response.hash,
    };
  }

  /**
   * create Certificate
   * @param certificate CertificateModel
   * @param denomName string denom name
   * @returns Transaction hash string
   */
  public async createDenomAndCertificate(
    certificate: CertificateModel,
    denomName: string
  ): Promise<{ denomId: string; certId: string; hash: string }> {
    const creatorAddress = await this.certificateClient.keys.show(
      environment.IRITA_KEY_NAME
    );
    const baseTx = newBaseTxForDenom();
    const sender = await getAdminAddress();
    const denomId = generateDenomId();
    const issueDenomMsg = {
      type: TxType.MsgIssueDenom,
      value: {
        id: denomId,
        name: denomName,
        sender,
        mintRestricted: true,
        updateRestricted: true,
      },
    };
    const certId = generateCertificateId(1);
    const mintCertificateMsg = {
      type: TxType.MsgMintNFT,
      value: {
        id: certId,
        denom_id: denomId,
        name: certificate.certName,
        // url: photoUrl,
        data: JSON.stringify(certificate),
        sender,
        recipient: creatorAddress,
      },
    };
    const msgs = [issueDenomMsg, mintCertificateMsg];
    const realTx = newBaseTxForDenom();
    const response = await this.certificateClient.tx.buildAndSend(msgs, realTx);
    return {
      denomId,
      certId: mintCertificateMsg.value.id,
      hash: response.hash,
    };
  }

  public async mintAndTransferCertificate(
    certificate: CertificateModel
  ): Promise<TxResult> {
    const sender = await getAdminAddress();
    const certId = generateCertificateId(1);
    const msgs: any[] = [
      {
        type: TxType.MsgMintNFT,
        value: {
          id: certId, // cert id
          denom_id: config.irita.denomId,
          name: certificate.certName, // cert name
          sender,
          recipient: sender,
        },
      },
    ];
    return await this.certificateClient.tx.buildAndSend(
      msgs,
      newBaseTxForMint()
    );
  }
}

export default CertificateService;
