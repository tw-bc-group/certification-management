import AV from 'leancloud-storage';

AV.init({
  appId: 'gVpjrW4U6TfrM4AGmxX9toma-9Nh9j0Va',
  appKey: '5ypXCePx32LNLbO0sdSxcBlw'
});

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
  photos: Array<{ fileName: string; dataUrl: string }>;
}) => Promise<{ pngUrl: string; svgUrl: string }> = ({ certId, photos }) => {
  const mark = 'base64,';
  const [png, svg, ...tail] = photos.map(({ fileName, dataUrl }) => {
    const data = dataUrl.substring(dataUrl.indexOf(mark) + mark.length);
    return new AV.File(fileName, { base64: data });
  });

  return Promise.all([png.save(), svg.save()])
    .then(([pngFile, svgFile]) => {
      const photo = new AV.Object(LEANCLOUD_CLASS);
      photo.set(INDEX, certId);
      photo.set('png', pngFile);
      photo.set('svg', svgFile);
      return photo.save();
    })
    .then(photoObj => {
      const pngUrl = photoObj.get('png').url();
      console.log('png.url', pngUrl);
      const svgUrl = photoObj.get('svg').url();
      console.log('svg.url', svgUrl);
      return { pngUrl, svgUrl };
    });
};
