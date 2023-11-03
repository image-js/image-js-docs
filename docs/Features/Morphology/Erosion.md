---
sidebar_position: 10
---

import ErodeDemo from './demos/erode.demo.tsx'

_Reduces the size of foreground objects by iteratively shrinking their boundaries._

[🖼️ Image options and parameters of `erode` method](https://image-js.github.io/image-js-typescript/classes/Image.html#erode 'github.io link')  
[🎭 Mask options and parameters of `erode` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#erode 'github.io link')

[Erosion](https://en.wikipedia.org/wiki/Erosion 'wikipedia link on erosion') is a fundamental morphological operation in image processing that is used to reduce the size of foreground objects ([regions of interest](../../Glossary.md#roiregion-of-interest 'internal link on region of interest')) within an image while preserving their shape and structure. It works by moving a structuring element (also known as a [kernel](../../Glossary.md#kernel 'internal link on kernel')) over the image and replacing each pixel with the **minimum** value of the pixels covered by the structuring element. Erosion is particularly useful for tasks like noise reduction, edge detection, and object separation.

<ErodeDemo />

### Parameters and default values

:::info
Parameters and options for Images and Masks are the same.
:::

- `options`

#### Options

| Property                                                                                               | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------ | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/ErodeOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/ErodeOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
