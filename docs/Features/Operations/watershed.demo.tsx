import { Image, computeThreshold, waterShed } from 'image-js';

export default function watershed(image: Image) {
  image = image.grey().gaussianBlur({ sigma: 5 });
  let threshold = computeThreshold(image);
  let roiMap = waterShed(image, {
    threshold: (threshold / image.maxValue / image.maxValue) * 20,
  }).getRois({ kind: 'black' });
  image = image.convertColor('RGB');
  for (let roi of roiMap) {
    let mask = roi.getMask();
    image = image.paintMask(mask, {
      color: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      origin: { column: roi.origin.column, row: roi.origin.row },
    });
  }
  return image;
}
