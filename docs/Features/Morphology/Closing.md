---
sidebar_position: 40
---

import CloseDemo from './demos/close.mask.demo.tsx'

# Closing

_Combines a dilation filter followed by an erosion filter._

[🖼️ Image options and parameters of `close` method](https://image-js.github.io/image-js-typescript/classes/Image.html#close 'github.io link')  
[🎭 Mask options and parameters of `close` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#close 'github.io link')

Opposed to [opening](./Opening.md 'internal link to open method'), [closing process](<https://en.wikipedia.org/wiki/Closing_(morphology)> 'wikipedia link on closing') first [erodes](./Erosion.md 'internal link to erode method') an image and only then [dilates](./Dilation.md 'internal link to dilate method') it.
It is a useful process for filling small holes in the image, while preserving the shape and size of large holes and objects.

<CloseDemo />

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

| Property                                                                                               | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------ | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/CloseOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/CloseOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
