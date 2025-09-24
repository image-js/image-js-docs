---
sidebar_position: 40
---

import TransformDemo from './demos/transform.demo.tsx'

# Transform

_Applies linear transformations to an image, such as scaling, rotation, skewing, or warping, altering its shape or orientation._

[🖼️ Image options and parameters of `transform` method](https://api.image-js.org/classes/index.Image.html#transform)

`transform` method uses transformation matrix to rotate, translate, and/or scale the image.
User needs to pass on the matrix that will be applied to the image. Matrix must have either 2 rows and 3 columns or 3 rows and 3 columns:

$$
\begin{bmatrix}
a & b & c\\
d & e & f \\
g & h & i
\end{bmatrix}
$$

If 2x3 matrix is passed, the algorithm will consider it as [affine transformation](https://en.wikipedia.org/wiki/Affine_transformation) so last row will be set as `[0,0,1]`;

- the first `a` and `e` are responsible for image scaling
- `b` and `d` are responsible for [shear](https://en.wikipedia.org/wiki/Shear_mapping 'wikipedia link on image shearing'). Combination of these 4 variables allows [rotating](https://en.wikipedia.org/wiki/Rotations_and_reflections_in_two_dimensions 'wikipedia link on rotation'). `c` and `f` are responsible for image [translation](<https://en.wikipedia.org/wiki/Translation_(geometry)#:~:text=In%20Euclidean%20geometry%2C%20a%20translation,origin%20of%20the%20coordinate%20system> 'wikipedia link on translation').
- `g` and `h` are used for an operation called projection. It allows changing image perspective.
- `i` is a normalization factor. It acts like a "scaling factor" for the entire coordinate system. Think of it as a zoom lens setting.

For more information take a look at the tutorial about [image transformations](../../tutorials/applying-transform-function-on-images.md)

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

| Property                                                                                                 | Required | Default value |
| -------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`borderType`](https://api.image-js.org/interfaces/index.TransformOptions.html#borderType)               | no       | `constant`    |
| [`borderValue`](https://api.image-js.org/interfaces/index.TransformOptions.html#borderValue)             | no       | `0`           |
| [`fullImage`](https://api.image-js.org/interfaces/index.TransformOptions.html#fullImage)                 | no       | -             |
| [`height`](https://api.image-js.org/interfaces/index.TransformOptions.html#height)                       | no       | -             |
| [`interpolationType`](https://api.image-js.org/interfaces/index.TransformOptions.html#interpolationType) | no       | `bilinear`    |
| [`inverse`](https://api.image-js.org/interfaces/index.TransformOptions.html#inverse)                     | no       | -             |
| [`width`](https://api.image-js.org/interfaces/index.TransformOptions.html#width)                         | no       | -             |
