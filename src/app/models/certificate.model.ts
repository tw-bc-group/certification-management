export enum CertificateType {
  Thoughtworks = 'Thoughtworks',
  Community = 'Community',
  Enterprise = 'Enterprise',
  University = 'University',
}

export enum CertificateLevel {
  ASSOCIATE_AGILE_COACH = 'ASSOCIATE AGILE COACH',
  PROFESSIONAL_AGILE_COACH = 'PROFESSIONAL AGILE COACH',
  SENIOR_PROFESSIONAL_AGILE_COACH = 'SENIOR PROFESSIONAL AGILE COACH',
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
  [DpmLevel.JUNIOR]: '初阶',
  [DpmLevel.INTERMEDIATE]: '中阶',
  [DpmLevel.SENIOR]: '高阶',
};

export enum CertificateTemplateType {
  TW_AC = 'tw',
  TW_COR_AC = 'tw-cor',
  DPM = 'dpm'
}

export enum CertificateDirection {
  TECH = 'TECH',
  MANAGE = 'MANAGE',
  PRODUCT = 'PRODUCT',
}

export enum CompanyRadios {
  THOUGHTWORKS = 'THOUGHTWORKS',
  OTHERS = 'OTHERS'
}

export enum CertificateTabs {
  CERTIFICATE_PUBLISH = 'CERTIFICATE_PUBLISH',
  QUERY_CERTIFICATE = 'QUERY_CERTIFICATE',
  LINKED_CERTIFICATE = 'LINKED_CERTIFICATE',
  NON_LINKED_CERTIFICATE = 'NON_LINKED_CERTIFICATE',
}

export const CertificateDirectionOptions = [
  {value: CertificateDirection.MANAGE, label: '管理方向'},
  {value: CertificateDirection.TECH, label: '技术方向'},
];

export const CertificateDirectionSelectOptions = [
  ...CertificateDirectionOptions,
  {value: CertificateDirection.PRODUCT, label: '产品方向'},
];

export const CertificateTemplateOptions = [
  {value: CertificateTemplateType.TW_AC, label: '敏捷教练'},
  {value: CertificateTemplateType.DPM, label: '数字产品经理'}
];

export const PartnerOptions = [
  {value: 'github', label: 'Github'},
  {value: 'huawei', label: '华为'},
  {value: 'pku', label: 'PKU'},
  {value: 'oppo', label: 'OPPO'},
  {value: 'CMGFintech', label: '招商金科'},
  {value: 'ABC', label: '中国农业银行'}
];

export interface CertificateModel {
  certName: string;
  type: CertificateType;
  certDirection?: CertificateDirection;
  partner: string;
  photoUrl: string;
  logoUrl?: string;
  firstName: string;
  firstNamePinyin: string;
  lastName: string;
  lastNamePinyin: string;
  publishedAt: Date;
  expiredAt: Date;
  fingerprint: string;
  issuer: string;
  idNumber: string;
  receiverAddress?: string;
  qrCode: string;
  dpmLevel: DpmLevel;
  certificateTemplate?: CertificateTemplateType;
  subordinateCompany?: string;
}
