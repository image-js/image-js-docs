import { Mask } from 'image-js';

export default function morphologicalGradient(mask: Mask) {
  return mask.morphologicalGradient();
}
