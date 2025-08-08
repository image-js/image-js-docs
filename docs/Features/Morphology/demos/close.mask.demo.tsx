import type { Mask } from 'image-js';

export default function close(mask: Mask) {
  return mask.close();
}
