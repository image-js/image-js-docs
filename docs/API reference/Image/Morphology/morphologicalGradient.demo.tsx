import { Image } from 'image-js';

export default function morphologicalGradient(image: Image) {
  image = image.grey();
  return image.morphologicalGradient();
}
