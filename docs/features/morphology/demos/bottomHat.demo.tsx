import type { Image } from 'image-js';

export default function bottomHat(image: Image) {
  image = image.grey();
  return image.bottomHat({
    kernel: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  });
}
