# image-js-docs

This is the source code repository for the documentation of [image-js](https://github.com/image-js/image-js)

The documentation is available on <https://docs.image-js.org/>.

## Generating demo images

To regenerate the demo images (only needed when adding/updating images):

```bash
npm run generate-images
```

This will:

- Fetch images from the URLs defined in `defaultImageUrls.ts`
- Save them to the `static/` folder
- Generate `imageData.json` with metadata

## Create demos

A demo is simply a function which takes an image or mask as input and returns an image or mask as output. When imported in `md` files, it will be transformed into a demo component which allows choosing from various image or video sources to showcase the image transformation.

### Image example

In `docs/demos/gaussian-blur.demo.tsx`, define your demo function.

```ts
import { Image } from 'image-js';

export default function blur(image: Image) {
  return image.gaussianBlur({ sigma: 2 });
}
```

### Mask example

In `docs/demos/invert-filter.mask.demo.tsx`, define your demo function.

```ts
import { Mask } from 'image-js';

export default function invert(mask: Mask) {
  return mask.invert();
}
```

### Usage in markdown

Then in `docs/page.md`, import and use the demo component.

```markdown
import GaussianBlur from './demos/gaussian-blur.demo.tsx';
import MaskInvert from './demos/invert-filter.mask.demo.tsx';

# Gaussian blur

<GaussianBlur />

# Mask invert

<MaskInvert />
```

### Caveats

1. The file must end with `.demo.tsx` for image filters and `.mask.demo.tsx` for masks to work. The file extension should be `.tsx`, even if the file does not render any JSX.
2. For image demos, the file must export a default function, which takes an `image: Image` as input and returns an `Image` or a `Mask` as output.
3. For mask demos, the file must export a default function, which takes an `image: Mask` as input and returns an `Image` or a `Mask` as output.
4. The demo must only import from `image-js`.
