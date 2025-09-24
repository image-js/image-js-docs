---
sidebar_position: 50
---

import TransRotateDemo from './demos/transformRotate.demo.tsx'

# Transform and Rotate

_Rotates an image by any angle._

[🖼️ Image options and parameters of `transformRotate` method](https://api.image-js.org/classes/index.Image.html#transformRotate)

`transformRotate` method rotates image anti-clockwise at any angle that user sets. It applies the same principle as [transform](./transform.md 'internal link on transform demo') method, but user only needs to pass a rotation angle as a parameter instead of the whole matrix.

<TransRotateDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and its default values

- `angle`

- `options`

#### Options

| Property                                                                                                       | Required | Default value |
| -------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`borderType`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#borderType)               | no       | `constant`    |
| [`borderValue`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#borderValue)             | no       | `0`           |
| [`center`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#center)                       | no       | `center`      |
| [`fullImage`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#fullImage)                 | no       | -             |
| [`height`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#height)                       | no       | -             |
| [`interpolationType`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#interpolationType) | no       | `bilinear`    |
| [`inverse`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#inverse)                     | no       | -             |
| [`scale`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#scale)                         | no       | `1`           |
| [`width`](https://api.image-js.org/interfaces/index.TransformRotateOptions.html#width)                         | no       | -             |

:::info
Technically, `transform` method can still be applied to rotate an image. However it is harder.
This means that ,to rotate an image by 90 degrees anti-clockwise, you can use `transform` method like this:

```js
const center = image.getCoordinates('center');
return image.transform([
  [0, 1, center.column - center.row],
  [-1, 0, center.column + center.row],
]);
```

Or use `transformRotate` method like this:

```js
return image.transformRotate(90);
```

`transformRotate` just facilitates this process.
:::
