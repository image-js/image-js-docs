import { Image, fromMask } from 'image-js';

export default function roiDemo(image: Image) {
  let mask = image.blur({ width: 3, height: 3 }).grey().threshold();
  let roiMap = fromMask(mask);
  let rois = roiMap.getRois();
  for (let roi of rois) {
    image = image.paintMask(roi.getMask(), { color: [255, 255, 0] });
  }
  return image;
}
