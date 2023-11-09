import { Image } from 'image-js';

export default function level(image: Image) {
  image = image.grey();
  return image.level({
    inputMin: image.maxValue - 200,
    inputMax: image.maxValue,
    outputMin: 0,
    outputMax: 300,
    gamma: 1,
  });
}
