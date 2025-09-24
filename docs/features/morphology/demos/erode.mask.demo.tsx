import type { Mask } from 'image-js';

export default function erode(mask: Mask) {
  return mask.erode();
}
