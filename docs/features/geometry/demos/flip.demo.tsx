import type { Image } from 'image-js';

export default function derivativeFilter(image: Image) {
  return image.flip();
}
