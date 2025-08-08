import type { Mask } from 'image-js';

export default function topHat(mask: Mask) {
  return mask.topHat();
}
