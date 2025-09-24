---
sidebar_position: 20
---

import DilateDemo from './demos/dilate.mask.demo.tsx'

# Dilation

_Enlarges the size of foreground objects by iteratively expanding their boundaries._

[🖼️ Image options and parameters of `dilate` method](https://api.image-js.org/classes/index.Image.html#dilate)  
[🎭 Mask options and parameters of `dilate` method](https://api.image-js.org/classes/index.Mask.html#dilate)

[Dilation](<https://en.wikipedia.org/wiki/Dilation_(morphology)> 'wikipedia link on dilation') is a fundamental morphological operation in image processing that is used to expand the size of foreground objects ([regions of interest](../../glossary.md#roiregion-of-interest 'internal link on region of interest')) within an image while preserving their shape and structure. It involves moving a [structuring element](../../glossary.md#structuring-element 'internal link on structuring element') over the image and replacing each pixel with the **maximum** value of the pixels covered by the structuring element. Dilation is commonly used for tasks like noise reduction, object enlargement, and feature enhancement.

<DilateDemo />

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

| Property                                                                                | Required | Default value                     |
| --------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://api.image-js.org/interfaces/index.DilateOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://api.image-js.org/interfaces/index.DilateOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
