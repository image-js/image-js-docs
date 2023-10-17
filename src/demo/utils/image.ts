import { Image } from 'image-js';

export function imageToMask(image: Image) {
  switch (image.colorModel) {
    case 'BINARY':
      throw new Error('BINARY Image does not exist in image-js');
    case 'GREY':
      return image.threshold();
    case 'GREYA':
      return image.convertColor('GREY').threshold();
    default:
      return image.grey().threshold();
  }
}
