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

export enum NonLinkedCertificateLevel {
  AGILE_COACH = 'AGILE COACH',
  JUNIOR_AGILE_COACH = 'JUNIOR AGILE COACH',
  TRAINEE_AGILE_COACH = 'TRAINEE AGILE COACH'
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

export enum CertificateTemplateType {
  TW_AC = 'tw',
  TW_COR_AC = 'tw-cor',
  DPM = 'dpm'
}

export const CertificateTemplateOptions = [
  { value: CertificateTemplateType.TW_AC, label: "敏捷教练" },
  { value: CertificateTemplateType.TW_COR_AC, label: "合作方敏捷教练" },
  { value: CertificateTemplateType.DPM, label: "数字产品经理" }
];

export const PartnerOptions = [
  { value: "github", label: "Github" },
  { value: "huawei", label: "华为" },
  { value: "pku", label: "PKU" },
  { value: "oppo", label: "OPPO" },
  { value: "CMGFintech", label: "招商金科" },
  { value: "ABC", label: "中国农业银行" }
];

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
