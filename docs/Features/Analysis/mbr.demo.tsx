import { Image, fromMask } from 'image-js';

export default function feret(image: Image) {
  const mask = image.grey().threshold();
  const mapManager = fromMask(mask);
  const rois = mapManager.getRois();
  for (let roi of rois) {
    let roiMask = roi.getMask();

    image = image.paintMask(roiMask, {
      origin: { column: roi.origin.column, row: roi.origin.row },
      color: [255, 0, 0],
    });
  }
  return image;
}
