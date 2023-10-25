---
sidebar_position: 30
---

[Check options and parameters of flip method](https://image-js.github.io/image-js-typescript/classes/Image.html#flip 'github.io link')

:::caution
This method works only with images.
:::

Flip filter in image processing refers to a transformation that horizontally or vertically flips an image. This operation is also known as a "mirror" operation. Flipping an image horizontally means reversing the order of pixels in each row, while flipping vertically means reversing the order of pixels in each column.

import FlipDemo from './flip.demo.tsx'

<FlipDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                  | Required | Default value |
| ----------------------------------------------------------------------------------------- | -------- | ------------- |
| [`axis`](https://image-js.github.io/image-js-typescript/interfaces/FlipOptions.html#axis) | no       | `horizontal`  |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/FlipOptions.html#out)   | no       | -             |
