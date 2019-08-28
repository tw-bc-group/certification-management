export enum CertificateType {
  ThoughtWorks = 'ThoughtWorks',
  Community = 'Community',
  Enterprise = 'Enterprise',
  University = 'University',
}

export enum CertificateLevel {
  AGILE_COACH = 'AGILE COACH',
  ADVANCED_AGILE_COACH = 'ADVANCED AGILE COACH',
  MASTER_AGILE_COACH = 'MASTER AGILE COACH'
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
  qrCode: string;
}
