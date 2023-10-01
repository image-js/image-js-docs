import { Image } from 'image-js';

export default function resize(image: Image) {
  return image.resize({ xFactor: 2 });
}
