import { Image, fromMask } from 'image-js';

export default function roiDemo(image: Image) {
  let mask = image.blur({ width: 3, height: 3 }).grey().threshold();
  let roiMap = fromMask(mask);
  let rois = roiMap.getRois();
  image = image.paintMask(rois[rois.length - 1].getMask(), {
    color: [0, 0, 0],
  });

  return image;
}
