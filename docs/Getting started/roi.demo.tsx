import { Image, fromMask } from 'image-js';

export default function roiDemo(image: Image) {
  let mask = image.grey().threshold();
  let roiMap = fromMask(mask);
  let rois = roiMap.getRois();
  let roiMask = rois[0].getMask();
  let roiMask2 = rois[2].getMask();
  let convexRoi = rois[0].feret;
  image = image.drawCircle(
    convexRoi.minDiameter.points[0],
    convexRoi.minDiameter.length,
  );
  image = image.paintMask(roiMask2, { color: [255, 255, 0] });
  image = image.paintMask(roiMask, { color: [255, 255, 0] });
  return image;
}
