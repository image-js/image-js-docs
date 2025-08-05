import type { Image } from 'image-js';

import { assertUnreachable } from '../utils/assert';

export function imageToMask(image: Image) {
  switch (image.colorModel) {
    case 'BINARY':
      throw new Error('BINARY Image does not exist in image-js');
    case 'GREY':
      return image.threshold();
    case 'GREYA':
      return image.convertColor('GREY').threshold();
    case 'RGB':
    case 'RGBA':
      return image.grey().threshold();
    default:
      assertUnreachable(image.colorModel);
  }
}
