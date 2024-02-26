---
sidebar_position: 30
---

# Hypotenuse

_Calculates the euclidean distance of two points between two images._

[🖼️ Image options and parameters of `hypotenuse` method](https://image-js.github.io/image-js-typescript/classes/Image.html#hypotenuse 'github.io link')

A "hypotenuse filter" is using two compatible images to change values of each pixel by calculating [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance 'wikipedia link on Euclidean distance') with the formula:

$$
NewValue = \sqrt{Value1^2+Value2^2}
$$

Where $$Value1$$ is a value of the pixel in the first image and $$Value2$$ is the value of the second one. The goal is to identify which points in one image correspond to points in another image, which is essential for various computer vision and image processing applications. Calculating hypotenuse value between two pixels is also necessary for image aligning and feature matching.

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `otherImage`

- `options`

#### Options

| Property                                                                                                | Required | Default value |
| ------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`channels`](https://image-js.github.io/image-js-typescript/interfaces/HypotenuseOptions.html#channels) | no       | -             |

:::caution
Images must be compatible by size, bit depth, number of channels and number of alpha channels. However, for the resulting image user can choose the bit depth of the resulting image as well as channels which the algorithm will be applied to.
:::
