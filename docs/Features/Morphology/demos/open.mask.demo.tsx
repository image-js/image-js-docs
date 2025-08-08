import type { Mask } from 'image-js';

export default function open(mask: Mask) {
  return mask.open();
}
