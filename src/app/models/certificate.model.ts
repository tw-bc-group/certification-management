export enum CertificateType {
  ThoughtWorks = 'ThoughtWorks',
  Community = 'Community',
  Enterprise = 'Enterprise',
  University = 'University',
}

export enum CertificateLevel {
  PROFESSIONAL_AGILE_COACH = 'PROFESSIONAL AGILE COACH',
  ADVANCED_AGILE_COACH = 'ADVANCED AGILE COACH',
  MASTER_AGILE_COACH = 'MASTER AGILE COACH'
}

export enum DpmLevel {
  JUNIOR = 'JUNIOR',
  INTERMEDIATE = 'INTERMEDIATE',
  SENIOR = 'SENIOR',
}

export const dpmLevelNameMapping = {
  [DpmLevel.JUNIOR] : '初阶',
  [DpmLevel.INTERMEDIATE] : '中阶',
  [DpmLevel.SENIOR] : '高阶',
};

export interface CertificateModel {
  certName: string;
  type: CertificateType;
  partner: string;
  photoUrl: string;
  firstName: string;
  firstNamePinyin: string;
  lastName: string;
  lastNamePinyin: string;
  publishedAt: Date;
  expiredAt: Date;
  fingerprint: string;
  issuer: string;
  receiverAddress: string;
  qrCode: string;
  dpmLevel: DpmLevel;
}
