import type { Image } from 'image-js';

export default function blur(image: Image) {
  return image.blur({ width: 3, height: 3 });
}
