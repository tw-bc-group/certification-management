import { environment } from '../../environments/environment';
import AV from 'leancloud-storage';

AV.init({
  appId: environment.lcAppId,
  appKey: environment.lcAppKey
});

console.log('use lcAppId:', environment.lcAppId);

const LEANCLOUD_CLASS = 'Photo';
const INDEX = 'certId';

export const fetch: ({ certId }: { certId: string }) => Promise<object[]> = ({
  certId
}) => {
  const query = new AV.Query(LEANCLOUD_CLASS);
  query.equalTo(INDEX, certId);
  query.include(['png', 'svg']);
  return query.find();
};

export const save: ({
  certId,
  photos
}: {
  certId: string;
  photos: Array<{ key: string; fileName: string; dataUrl: string }>;
}) => Promise<{ pngUrl: string; svgUrl: string }> = ({ certId, photos }) => {
  const mark = 'base64,';
  const imagesObject = photos.map(({ key, fileName, dataUrl }) => {
    const data = dataUrl.substring(dataUrl.indexOf(mark) + mark.length);
    return {
      key,
      image: new AV.File(fileName, { base64: data })
    };
  });

  const photo = new AV.Object(LEANCLOUD_CLASS);
  photo.set(INDEX, certId);

  imagesObject.map((object) => {
    photo.set(object.key, object.image);
  });

  return photo.save().then(photoObj => {
    const pngUrl = photoObj.get('png').url();
    console.log('png.url', pngUrl);
    const svgUrl = photoObj.get('svg').url();
    console.log('svg.url', svgUrl);
    return { pngUrl, svgUrl };
  });
};
