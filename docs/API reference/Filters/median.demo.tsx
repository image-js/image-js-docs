import { Image } from 'image-js';

export default function median(image: Image) {
  return image.medianFilter({ borderType: 'constant', cellSize: 3 });
}
