// import { HttpException } from '@exceptions/HttpException';
import {client, generateCertificateId, generateDenomId, generateSchema, getAdminAddress, newBaseTx} from '../clients/certificate';
import {Client, TxType} from '@irita/irita-sdk/dist/web';
import {CertificateDirection, CertificateModel, CertificateTemplateType, CertificateType, DpmLevel} from '../models/certificate.model';

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
    logoUrl: string,
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
    certDirection: CertificateDirection,
    certificateTemplate: CertificateTemplateType
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
      logoUrl,
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
      certDirection,
      certificateTemplate
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
