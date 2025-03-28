---
sidebar_position: 60
---

import BottomHatDemo from './demos/bottomHat.mask.demo.tsx'

# Bottom Hat

_Enhances the fine details or small objects within an image by subtracting an opened version of the image from the original._

[🖼️ Image options and parameters of `bottomHat` method](https://image-js.github.io/image-js-typescript/classes/Image.html#bottomHat 'github.io link')  
[🎭 Mask options and parameters of `bottomHat` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#bottomHat 'github.io link')

Similarly to [top hat](./Top%20Hat.md 'internal link to top hat'), [bottom hat](https://en.wikipedia.org/wiki/Top-hat_transform 'wikipedia link to top hat') operation computes the difference between two images. However, if top hat was using [opening method](./Opening.md 'internal link on open method'), bottom hat is using [closing method](./Closing.md 'internal link on close method').
The purpose of bottom hat(or, as it is also called, _black-hat_) is to enhance and extract **darker** regions of the image.

<BottomHatDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[1,8,16]`      |
| `components`   | number of components       | `[1]`           |
| `alpha`        | is alpha channel allowed   | `false`         |

### Parameters and default values

:::info
Parameters and options for Images and Masks are the same.
:::

- `options`

#### Options

| Property                                                                                                   | Required | Default value                     |
| ---------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
