import type { Mask } from 'image-js';

export default function invert(mask: Mask) {
  return mask.invert();
}
