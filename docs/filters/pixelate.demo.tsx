import { Image } from 'image-js';

export default function pixelate(image: Image) {
  return image.pixelate({ cellSize: 7 });
}
