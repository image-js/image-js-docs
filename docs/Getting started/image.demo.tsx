import { Image } from 'image-js';

export default function ImageDemo(image: Image) {
  let mask = image.invert();
  return mask;
}
