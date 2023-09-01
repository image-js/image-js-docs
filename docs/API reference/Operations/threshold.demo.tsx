import { Image } from 'image-js';

export default function threshold(image: Image) {
  image = image.grey();
  return image.threshold();
}
