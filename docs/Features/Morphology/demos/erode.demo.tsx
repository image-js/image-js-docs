import type { Image } from 'image-js';

export default function erode(image: Image) {
  image = image.grey();
  return image.erode({
    kernel: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  });
}
