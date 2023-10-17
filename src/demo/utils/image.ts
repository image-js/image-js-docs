import { Image } from 'image-js';

export function imageToMask(image: Image) {
  switch (image.colorModel) {
    case 'GREY':
    case 'BINARY':
      return image.threshold();
    case 'GREYA':
      return image.convertColor('GREY').threshold();
    default:
      return image.grey().threshold();
  }
}
