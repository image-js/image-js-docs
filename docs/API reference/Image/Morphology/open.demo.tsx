import { Image } from 'image-js';

export default function open(image: Image) {
  image = image.grey();
  return image.open({
    kernel: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
  });
}
