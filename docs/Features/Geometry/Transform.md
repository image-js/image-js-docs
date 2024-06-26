---
sidebar_position: 40
---

import TransformDemo from './demos/transform.demo.tsx'

# Transform

_Applies linear transformations to an image, such as scaling, rotation, skewing, or warping, altering its shape or orientation._

[🖼️ Image options and parameters of `transform` method](https://image-js.github.io/image-js-typescript/classes/Image.html#transform 'github.io link')

`transform` method uses transformation matrix to rotate, translate, and/or scale the image. User needs to pass on the matrix that will be applied to the image. Matrix must have 2 rows and 3 columns:

$$
\begin{bmatrix}
1 & 2 & 3\\
a & b & c
\end{bmatrix}
$$

Where the first two columns are responsible for image [rotation](https://en.wikipedia.org/wiki/Rotation 'wikipedia link on rotation') and [shear](https://en.wikipedia.org/wiki/Shear_mapping 'wikipedia link on image shearing'), while last column is responsible for image [translation](<https://en.wikipedia.org/wiki/Translation_(geometry)#:~:text=In%20Euclidean%20geometry%2C%20a%20translation,origin%20of%20the%20coordinate%20system> 'wikipedia link on translation').

:::caution
Matrix cannot be singular. Otherwise it cannot be inverted. Click [here](https://en.wikipedia.org/wiki/Invertible_matrix 'wikipedia link on invertible matrices') to learn more.
:::

<TransformDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and its default values

- `transformMatrix`

- `options`

#### Options

| Property                                                                                                                 | Required | Default value |
| ------------------------------------------------------------------------------------------------------------------------ | -------- | ------------- |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#borderType)               | no       | `constant`    |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#borderValue)             | no       | `0`           |
| [`fullImage`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#fullImage)                 | no       | -             |
| [`height`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#height)                       | no       | -             |
| [`interpolationType`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#interpolationType) | no       | `bilinear`    |
| [`inverse`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#inverse)                     | no       | -             |
| [`width`](https://image-js.github.io/image-js-typescript/interfaces/TransformOptions.html#width)                         | no       | -             |
