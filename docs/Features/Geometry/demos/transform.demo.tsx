import { Image } from 'image-js';

export default function transform(image: Image) {
  const imageMatrix = [
    [1, 0, 0],
    [0, 1, 25],
  ];
  return image.transform(imageMatrix);
}
