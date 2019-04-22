export enum CertificateType {
  ThoughtWorks = 'ThoughtWorks',
  Community = 'Community',
  Enterprise = 'Enterprise',
  University = 'University',
}

export interface CertificateModel {
  certName: string;
  type: CertificateType;
  partner: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  publishedAt: Date;
  expiredAt: Date;
  fingerprint: string;
  issuer: string;
  receiverAddress: string;
}
