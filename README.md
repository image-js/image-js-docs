# image-js-docs

This is the source code repository for the documentation of [image-js](https://github.com/image-js/image-js-typescript)

The documentation is available on [https://image-js-docs.pages.dev/](https://image-js-docs.pages.dev/)

## Create demos

A demo is simply function which takes an image as input and returns an image as output. When imported in `md` files, it will be transformed into a demo component which allows to choose from various image or video sources to showcase the image transformation.

### Example

In `docs/demos/gaussian-blur.demo.tsx`, define your demo function.

```ts
import { Image } from 'image-js';

export default function blur(image: Image) {
  return image.gaussianBlur({ sigma: 2 });
}
```

Then in `docs/blur-filters.md`, import and use the demo component.

```markdown
import GaussianBlur from './demos/gaussian-blur.demo.tsx';

# Gaussian blur

<GaussianBlur />
```

### Caveats

1. The file must end with `.demo.tsx` to get processed correctly by the builder. The file extension should be `.tsx`, even if the file does not render any JSX.
2. The file must export a default function, which takes an `Image` as input and returns an `Image` as output.
3. The demo must only import from `image-js`.
