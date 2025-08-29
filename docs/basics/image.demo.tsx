import type { Image } from 'image-js';

export default function ImageDemo(image: Image) {
  const mask = image.invert();
  return mask;
}
