import { Image } from 'image-js';

export default function close(image: Image) {
  image = image.grey();
  return image.close({
    kernel: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  });
}
