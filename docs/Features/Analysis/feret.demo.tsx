import { Image, fromMask } from 'image-js';

export default function feret(image: Image) {
  const greyImage = image.blur({ width: 3, height: 3 }).grey();
  const mask = greyImage.threshold();
  const mapManager = fromMask(mask);
  const rois = mapManager.getRois();
  for (let roi of rois) {
    let feret = roi.feret;
    image = image.drawLine(
      feret.minDiameter.points[0],
      feret.minDiameter.points[1],
      {
        strokeColor: [0, 255, 0],
        origin: roi.origin,
      },
    );
    image = image.drawLine(
      feret.maxDiameter.points[0],
      feret.maxDiameter.points[1],
      {
        strokeColor: [0, 255, 0],
        origin: roi.origin,
      },
    );
  }
  return image;
}
