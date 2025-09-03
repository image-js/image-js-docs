import type { Image } from 'image-js';

export default function maskDemo(image: Image) {
  const mask = image.grey().cannyEdgeDetector();
  return mask;
}
