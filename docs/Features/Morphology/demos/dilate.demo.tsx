import type { Image } from 'image-js';

export default function dilate(image: Image) {
  image = image.grey();
  return image.dilate({
    kernel: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  });
}
