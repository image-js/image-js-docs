import { Image, RoiMapManager } from 'image-js';

export default function maskDemo(image: Image) {
  image = image.grey();
  return image;
}
