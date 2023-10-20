---
sidebar_position: 50
---

import TransRotateDemo from './transformRotate.demo.tsx'

[Check options and parameters of transformRotate method](https://image-js.github.io/image-js-typescript/classes/Image.html#transformRotate 'github.io link')

transformRotate method rotates image anti-clockwise at any angle that user sets. It applies the same principle as [transform](./transform.md 'internal link on transform demo') method, but user only needs to pass a rotation angle as a parameter instead of the whole matrix.

<TransRotateDemo />

### Parameters and its default values

- `angle`

- `options`

#### Options

| Property                                                                                                                       | Required | Default value |
| ------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------- |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#borderType)               | no       | `constant`    |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#borderValue)             | no       | `0`           |
| [`center`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#center)                       | no       | `center`      |
| [`fullImage`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#fullImage)                 | no       | -             |
| [`height`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#height)                       | no       | -             |
| [`interpolationType`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#interpolationType) | no       | `bilinear`    |
| [`inverse`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#inverse)                     | no       | -             |
| [`scale`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#scale)                         | no       | `1`           |
| [`width`](https://image-js.github.io/image-js-typescript/interfaces/TransformRotateOptions.html#width)                         | no       | -             |

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
