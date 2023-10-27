import { Image } from 'image-js';

export default function maskDemo(image: Image) {
  let mask = image.grey().threshold();
  image = image.paintMask(mask, { color: [255, 255, 0] });
  return image;
}
