import { Mask } from 'image-js';

export default function dilate(mask: Mask) {
  return mask.dilate();
}
