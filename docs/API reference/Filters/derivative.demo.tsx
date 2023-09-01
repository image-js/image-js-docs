import { Image } from 'image-js';

export default function derivativeFilter(image: Image) {
  image = image.grey();
  return image.derivativeFilter();
}
