import type { Mask } from 'image-js';

export default function cannyEdgeDetector(mask: Mask) {
  return mask.morphologicalGradient();
}
