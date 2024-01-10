import { Image, fromMask } from 'image-js';

export default function roiDemo(image: Image) {
  let mask = image.blur({ width: 3, height: 3 }).grey().threshold();
  let roiMap = fromMask(mask);
  let rois = roiMap.getRois();
  for (let roi of rois) {
    image = image.paintMask(roi.getMask(), {
      origin: { column: roi.origin.column, row: roi.origin.row },
      color: [0, 0, 255],
    });
  }

  return image;
}
