import type { Image } from 'image-js';

export default function blur(image: Image) {
  return image.gaussianBlur({ sigma: 2 });
}
