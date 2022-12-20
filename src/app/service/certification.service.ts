// import { HttpException } from '@exceptions/HttpException';
import { client, generateDenomId, generateCertificateId, generateSchema, getAdminAddress, newBaseTx } from '../clients/certificate';
import { Client, TxType } from '@irita/irita-sdk';
import {CertificateModel, CertificateType, DpmLevel} from '../models/certificate.model';

class CertificateService {
  certificateClient: Client;

  constructor(certificateClient?: Client) {
    this.certificateClient = certificateClient || client;
  }

  /**
   * create Certificate
   * @param userId number userId
   * @param userName string userName
   * @param firstName string
   * @param firstNamePinyin string
   * @param lastName string
   * @param lastNamePinyin string
   * @param denomName string denom name
   * @param certificateName string certificate name
   * @param photoUrl string nft image url
   * @param count number number of NFT to be minted
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
    userName: string,
    firstName: string,
    firstNamePinyin: string,
    lastName: string,
    lastNamePinyin: string,
    denomName: string,
    certificateName: string,
    photoUrl: string,
    count: number,
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
    // todo 如何获取irita的key name
    const sender = await getAdminAddress();
    const denomId = generateDenomId();
    const schema = generateSchema();
    const issueDenomMsg = {
      type: TxType.MsgIssueDenom,
      value: {
        id: denomId,
        name: denomName,
        schema,
        sender,
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
        uri: photoUrl,
        data: JSON.stringify(certificate),
        sender,
        recipient: creatorAddress,
      }
    };
    const msgs = [issueDenomMsg, mintCertificateMsg];
    const simulation = await this.certificateClient.tx.simulate(msgs, baseTx);
    // Fee multiplier 1.2 recommended by bianjie staff
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const amount = Math.floor(simulation.gasInfo.gasUsed * 1.2).toString();
    const realTx = newBaseTx({
      fee: {
        denom: 'ugas',
        amount,
      },
      gas: amount,
    });
    const response = await this.certificateClient.tx.buildAndSend(msgs, realTx);
    return {
      denomId,
      certId: mintCertificateMsg.value.id,
      hash: response.hash,
    };
  }
}

export default CertificateService;
