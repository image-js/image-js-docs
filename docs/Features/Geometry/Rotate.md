---
sidebar_position: 20
---

import RotateDemo from './demos/rotate.demo.tsx'

# Rotate

_Rotates an image by a multiple of 90 degrees._

[🖼️ Image options and parameters of `rotate` method](https://image-js.github.io/image-js-typescript/classes/Image.html#rotate 'github.io link')

Rotating images in image processing involves changing the orientation of the image by a certain angle. This can be useful for correcting the orientation of images, creating artistic effects, or preparing images for specific tasks. Just like with flipping, you can achieve this using various programming languages and image processing libraries.

<RotateDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and its default values

- `RotateAngle`
