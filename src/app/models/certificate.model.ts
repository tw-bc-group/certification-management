export enum CertificateType {
  Tw = 'Tw',
  Community = 'Community',
  Corporate = 'Corporate',
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
}
