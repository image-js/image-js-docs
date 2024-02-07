---
sidebar_position: 30
---

import FlipDemo from './demos/flip.demo.tsx'

_Mirrors or reverses an image horizontally or vertically._

[🖼️ Image options and parameters of `flip` method](https://image-js.github.io/image-js-typescript/classes/Image.html#flip 'github.io link')

Flip filter in image processing refers to a transformation that horizontally or vertically flips an image. This operation is also known as a "mirror" operation. Flipping an image horizontally means reversing the order of pixels in each row, while flipping vertically means reversing the order of pixels in each column.

<FlipDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `options`

#### Options

| Property                                                                                  | Required | Default value |
| ----------------------------------------------------------------------------------------- | -------- | ------------- |
| [`axis`](https://image-js.github.io/image-js-typescript/interfaces/FlipOptions.html#axis) | no       | `horizontal`  |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/FlipOptions.html#out)   | no       | -             |
