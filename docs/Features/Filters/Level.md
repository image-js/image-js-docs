---
sidebar_position: 80
---

import LevelDemo from './demos/level.demo.tsx'

# Invert

_Redistributes pixel intensities to achieve a more uniform histogram distribution._

[🖼️ Image options and parameters of `level` method](https://image-js.github.io/image-js-typescript/classes/Image.html#level 'github.io link')

Level method applies process called ["histogram equalization"](https://en.wikipedia.org/wiki/Histogram_equalization 'wikipedia link on histogram equalization').
Histogram equalization is a technique used in image processing to enhance the contrast and visibility of details in an image by redistributing the pixel intensity values.
This process can make details in both dark and bright regions of the image more visible.

<LevelDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `options`

#### Options

| Property                                                                                             | Required | Default value    |
| ---------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| [`channels`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#channels)   | no       | -                |
| [`gamma`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#gamma)         | no       | `1`              |
| [`inputMin`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#inputMin)   | no       | `0`              |
| [`inputMax`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#inputMax)   | no       | `image.maxValue` |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#out)             | no       | -                |
| [`outputMin`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#outputMin) | no       | `0`              |
| [`outputMax`](https://image-js.github.io/image-js-typescript/interfaces/LevelOptions.html#outputMax) | no       | `image.maxValue` |

<details>
<summary><b>Implementation</b></summary>

Here's how level filter is implemented in ImageJS:

_Input border values selection_: The first step is to choose the range of values that the filter must redistribute.

_Output border values selection_: Then the range of output values must be chosen. It is necessary to understand in what output limits should lie pixels that belong to the input values set.

_Calculation of the values_: After getting input and output values each pixel is compared with input values and a ratio is calculated by using formula:

$$
\dfrac{value - inputMin}{inputMax - inputMin}
$$

where $$value$$ is a value of a pixel which is within the input borders. If value is outside of input limits it is equal to maximum input value.
From there the formula is reciprocated to compute new output value.

:::caution
`gamma` option allows choosing the curve by which points will be connected. It uses [Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve 'wikipedia link on bezier curves') to manipulate this shape. The bigger the value, the smoother the connection is.
:::

_Setting the values_: After calculating it, the filter replaces the original pixel value with this levelled value. This process is repeated for every pixel in the image, as the window moves over the entire image.

</details>
