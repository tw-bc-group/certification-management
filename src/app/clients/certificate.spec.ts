import {generateCertificateId, generateDenomId} from 'src/app/clients/certificate';
xdescribe('CertificateService', () => {

  it('should create denom id starts with thoughtworks', () => {
    const denomId = generateDenomId();
    expect(denomId).toMatch('^thoughtworks');
  });

  it('should create certificate id starts with cert', () => {
    const certId = generateCertificateId(1);
    expect(certId).toMatch('^cert');
  });

});
