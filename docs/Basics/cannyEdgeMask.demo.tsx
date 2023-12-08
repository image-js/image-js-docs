import { Image } from 'image-js';

export default function maskDemo(image: Image) {
  let mask = image.grey().cannyEdgeDetector();
  return mask;
}
