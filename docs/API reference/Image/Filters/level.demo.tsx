import { Image } from 'image-js';

export default function level(image: Image) {
  return image.level({ outputMin: 0, outputMax: 500, gamma: 0.5 });
}
