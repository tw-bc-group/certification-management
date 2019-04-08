export enum CertificateType {
  Tw = 'Tw',
  Community = 'Community',
  Corporate = 'Corporate',
  University = 'University',
}

export interface CertificateModel {
  type: CertificateType;
  partnerLogoUrl: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  publishedAt: Date;
  expiredAt: Date;
  fingerprint: string;
}
