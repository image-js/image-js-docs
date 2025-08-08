import type { Image } from 'image-js';

export default function cannyEdgeDetector(image: Image) {
  image = image.grey();
  return image.cannyEdgeDetector();
}
