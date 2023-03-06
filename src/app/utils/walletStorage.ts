import {environment} from '../../environments/environment';
import AV from 'leancloud-storage';
import {CertificateModel} from '../models/certificate.model';
import {Key} from '@irita/irita-sdk';

// AV.init({
//   appId: environment.LC_APP_ID,
//   appKey: environment.LC_APP_KEY,
//   serverURLs: environment.LC_SERVER_URLS,
// });

console.log('use lcAppId:', AV.applicationId);

const LEANCLOUD_CLASS_WALLET = 'Wallet';


export const saveWallet: ({keyName, address, privKey}: { keyName: any; address: any; privKey: any }) => void = ({
                                                                                                                  keyName,
                                                                                                                  address,
                                                                                                                  privKey,
                                                                                                                }) => {
  console.log('>>>>>>>>>>>>>>>>check saveWallet', address);
  const lcCertificate = new AV.Object(LEANCLOUD_CLASS_WALLET);
  lcCertificate.set('keyName', keyName);
  lcCertificate.set('address', address);
  lcCertificate.set('privKey', privKey);
  lcCertificate.save();
};

export const fetchWallet: (
                             name
                           : {
  name?: any;
}) => Promise<object> = async ({
                              name,
                            }) => {
  const query = new AV.Query(LEANCLOUD_CLASS_WALLET);
  if (name) {
    query.equalTo('keyName', name);
  }
  return query.first();
};


