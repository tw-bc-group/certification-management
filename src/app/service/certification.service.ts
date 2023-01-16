// import { HttpException } from '@exceptions/HttpException';
import {
  client,
  generateCertificateId,
  generateDenomId,
  generateSchema,
  getAdminAddress,
  newBaseTx,
  newBaseTxForMint
} from '../clients/certificate';
import {Client, TxResult, TxType} from '@irita/irita-sdk';
import {CertificateModel, CertificateType, DpmLevel} from '../models/certificate.model';

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
  public async issueDenom(denomName: string): Promise<{ denomId: string; hash: string }> {
    const denomId = generateDenomId();
    const schema = generateSchema();
    const baseTx = newBaseTx();
    const response = await this.certificateClient.nft.issueDenom(denomId, denomName, schema, true, true, baseTx);
    return {
      denomId,
      hash: response.hash,
    };
  }

  /**
   * create Certificate
   * @param userId number userId
   * @param firstName string
   * @param firstNamePinyin string
   * @param lastName string
   * @param lastNamePinyin string
   * @param denomName string denom name
   * @param certificateName string certificate name
   * @param photoUrl string nft image url
   * @param logoUrl string partner logo url
   * @param certificateType string
   * @param partner string
   * @param publishedAt string
   * @param expiredAt string
   * @param fingerprint string
   * @param issuer string
   * @param receiverAddress string
   * @param qrCode string
   * @param dpmLevel string
   * @returns Transaction hash string
   */
  public async createDenomAndCertificate(
    userId: number,
    firstName: string,
    firstNamePinyin: string,
    lastName: string,
    lastNamePinyin: string,
    denomName: string,
    certificateName: string,
    photoUrl: string,
    certificateType: CertificateType,
    partner: string,
    publishedAt: Date,
    expiredAt: Date,
    fingerprint: string,
    issuer: string,
    receiverAddress: string,
    qrCode: string,
    dpmLevel: DpmLevel,
  ): Promise<{ denomId: string; certId: string; hash: string }> {
    const creatorAddress = await this.certificateClient.keys.show(userId.toString());
    const baseTx = newBaseTx();
    const sender = await getAdminAddress();
    const denomId = generateDenomId();
    const issueDenomMsg = {
      type: TxType.MsgIssueDenom,
      value: {
        id: denomId,
        name: denomName,
        sender,
        /*
        * mintRestricted
        * false 任何人都可以发行NFT
        * true 只有Denom的所有者可以发行此类别的NFT
        * */
        mintRestricted: true,
        updateRestricted: true,
      },
    };
    const certId = generateCertificateId(1);
    const certificate: CertificateModel = {
      certName: certificateName,
      type: certificateType,
      partner,
      photoUrl,
      firstName,
      firstNamePinyin,
      lastName,
      lastNamePinyin,
      publishedAt,
      expiredAt,
      fingerprint,
      issuer,
      receiverAddress,
      qrCode,
      dpmLevel,
    };
    const mintCertificateMsg = {
      type: TxType.MsgMintNFT,
      value: {
        id: certId,
        denom_id: denomId,
        name: certificateName,
        url: photoUrl,
        data: JSON.stringify(certificate),
        sender,
        recipient: creatorAddress,
      }
    };
    const msgs = [issueDenomMsg, mintCertificateMsg];
    /*
    * issue Denom需要simulation
    * issue certificate不用simulation（目前写死一个amount用于测试链）
    * */
    // const amount = Math.floor(4000 * 1.2).toString();
    const realTx = newBaseTx({
      fee: {
        denom: 'ugas',
        amount: '400000',
      },
      gas: '400000',
    });
    const response = await this.certificateClient.tx.buildAndSend(msgs, realTx);
    return {
      denomId,
      certId: mintCertificateMsg.value.id,
      hash: response.hash,
    };
  }

  public async mintAndTransferCertificate(certificate: CertificateModel, id: string, denomName: string): Promise<TxResult> {
    console.log('Minting Certificate: ', certificate);
    const sender = await getAdminAddress();
    const msgs: any[] = [{
      type: TxType.MsgMintNFT,
      value: {
        id: '',
        denom_id: id,
        name: denomName,
        uri: certificate.photoUrl,
        sender,
        recipient: sender,
      },
    }];
    return await this.certificateClient.tx.buildAndSend(msgs, newBaseTxForMint());
}
}



export default CertificateService;
