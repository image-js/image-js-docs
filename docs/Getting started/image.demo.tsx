import { Image } from 'image-js';

export default function ImageDemo(image: Image) {
  let mask = image.grey().threshold();
  return mask;
}
