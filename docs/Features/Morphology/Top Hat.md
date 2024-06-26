---
sidebar_position: 50
---

import TopHatDemo from './demos/topHat.mask.demo.tsx'

# Top Hat

_Enhances the fine details or small objects within an image by subtracting an opened version of the image from the original._

[🖼️ Image options and parameters of `topHat` method](https://image-js.github.io/image-js-typescript/classes/Image.html#topHat 'github.io link')  
[🎭 Mask options and parameters of `topHat` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#topHat 'github.io link')

In morphology and image processing, [Top Hat](https://en.wikipedia.org/wiki/Top-hat_transform 'wikipedia link on top hat') is an operation used to enhance or extract small bright regions or details from an image while suppressing the larger surrounding structures.
It is the result of subtraction between the result of input image [opening](./Opening.md 'internal link on open method') and the input image itself.
The purpose of bottom hat(or as it is also called _black-hat_) is to enhance and extract **brighter** regions of the image.

<TopHatDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[1,8,16]`      |
| `components`   | number of components       | `[1]`           |
| `alpha`        | is alpha channel allowed   | `false`         |

### Parameters and default values

- `options`

#### Options

| Property                                                                                                | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/TopHatOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/TopHatOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
