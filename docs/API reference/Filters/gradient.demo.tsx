import { Image } from 'image-js';

export default function gradientFilter(image: Image) {
  image = image.grey();
  return image.gradientFilter({
    kernelX: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  });
}
