import { environment } from '../../environments/environment';
import AV from 'leancloud-storage';
import { CertificateModel } from '../models/certificate.model';

AV.init({
  appId: environment.LC_APP_ID,
  appKey: environment.LC_APP_KEY,
  serverURLs: environment.LC_SERVER_URLS,
});

console.log('use lcAppId:', AV.applicationId);

const LEANCLOUD_CLASS_CERTIFICATES = 'Certificates';

export const fetchCertificate: ({
  name,
  certDirection,
}: {
  certId?: string;
  name?: any;
  certDirection?: any;
  subordinateCompany?: any;
}) => Promise<object[]> = async ({
  certId,
  name,
  certDirection,
  subordinateCompany,
}) => {
  const query = new AV.Query(LEANCLOUD_CLASS_CERTIFICATES);
  if (certId) {
    query.equalTo('certId', certId);
  }
  if (name) {
    query.equalTo('name', name);
  }
  if (certDirection) {
    query.equalTo('certDirection', certDirection);
  }
  if (subordinateCompany) {
    query.equalTo('subordinateCompany', subordinateCompany);
  }
  query.include([
    'certId',
    'certName',
    'certificateTemplate',
    'issuer',
    'name',
    'png',
    'publishedAt',
    'svg',
    'type',
  ]);
  query.descending('createdAt');
  return query.find();
};

export const saveCertificate: ({
  certId,
  photos,
  certificate,
}: {
  certId: string;
  photos: Array<{ key: string; fileName: string; dataUrl: string }>;
  certificate: CertificateModel;
}) => Promise<{ pngUrl: string; svgUrl: string }> = ({
  certId,
  photos,
  certificate,
}) => {
  const lcCertificate = new AV.Object(LEANCLOUD_CLASS_CERTIFICATES);
  lcCertificate.set('certId', certId);
  const mark = 'base64,';
  const imagesObject = photos.map(({ key, fileName, dataUrl }) => {
    const data = dataUrl.substring(dataUrl.indexOf(mark) + mark.length);
    return {
      key,
      image: new AV.File(fileName, { base64: data }),
    };
  });
  imagesObject.map((object) => {
    lcCertificate.set(object.key, object.image);
  });
  const {
    lastName,
    firstName,
    certificateTemplate,
    certName,
    certDirection,
    issuer,
    type,
    publishedAt,
    expiredAt,
    partner,
    subordinateCompany,
  } = certificate;
  lcCertificate.set('name', `${lastName}${firstName}`);
  lcCertificate.set('certificateTemplate', certificateTemplate);
  lcCertificate.set('certName', certName);
  lcCertificate.set('certDirection', certDirection);
  lcCertificate.set('issuer', issuer);
  lcCertificate.set('type', type);
  lcCertificate.set('publishedAt', publishedAt);
  lcCertificate.set('expiredAt', expiredAt);
  lcCertificate.set('partner', partner);
  lcCertificate.set('subordinateCompany', subordinateCompany);

  return lcCertificate.save().then((photoObj) => {
    const pngUrl = photoObj.get('png').url();
    console.log('png.url', pngUrl);
    const svgUrl = photoObj.get('svg').url();
    console.log('svg.url', svgUrl);
    return { pngUrl, svgUrl };
  });
};
