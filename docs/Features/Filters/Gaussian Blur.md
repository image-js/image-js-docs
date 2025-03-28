---
sidebar_position: 40
---

import GaussianBlurDemo from './demos/gaussianBlur.demo.tsx'

# Gaussian Blur

_A blur filter that uses gaussian function for smoothing._

[🖼️ Image options and parameters of `gaussianBlur` method](https://image-js.github.io/image-js-typescript/classes/Image.html#gaussianBlur 'link on github io')

[Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur 'Wikipedia link on gaussian blur') is a widely used image processing technique that smooths an image by reducing high-frequency noise and fine details while preserving the overall structure and larger features. It's named after the [Gaussian function](https://en.wikipedia.org/wiki/Gaussian_function 'wikipedia link on gaussian function'), which is a mathematical function that represents a bell-shaped curve. Gaussian blur is often applied to images before other processing steps like edge detection to improve their quality and reliability.

The key idea behind Gaussian blur is that it simulates a diffusion process, where each pixel's value is influenced by the values of its neighbors. Because the weights are determined by the Gaussian function, pixels that are closer to the central pixel have a larger impact on the smoothed value, while pixels that are farther away contribute less.

<GaussianBlurDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

With Gaussian blur there are two ways of passing options: through sigma and through sigmaX and sigmaY. Main difference is that in first case sigma is the same for X and Y directions.

- `options`

#### Options

#### Sigma Variant:

| Property                                                                                                           | Required | Default value                  |
| ------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------ |
| [`sigma`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurSigmaOptions.html#sigma)           | **yes**  | -                              |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurSigmaOptions.html#borderType) | no       | `reflect101`                   |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurSigmaOptions.html#out)               | no       | -                              |
| [`size`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurSigmaOptions.html#size)             | no       | `2 * Math.ceil(2 * sigma) + 1` |

#### SigmaXY Variant

| Property                                                                                                        | Required | Default value                   |
| --------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------- |
| [`sigmaX`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#sigmaX)         | **yes**  | -                               |
| [`sigmaY`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#sigmaY)         | **yes**  | -                               |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#borderType) | no       | `reflect101`                    |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#out)               | no       | -                               |
| [`sizeX`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#sizeX)           | no       | `2 * Math.ceil(2 * sigmaX) + 1` |
| [`sizeY`](https://image-js.github.io/image-js-typescript/interfaces/GaussianBlurXYOptions.html#sizeY)           | no       | `2 * Math.ceil(2 * sigmaY) + 1` |

The size of the Gaussian kernel and the standard deviation parameter (which controls the spread of the Gaussian curve) influence the degree of smoothing. A larger kernel or a higher standard deviation will produce more pronounced smoothing, but might also result in a loss of fine details.

<details>
<summary>
<b>Implementation</b>
 </summary>

Here's how Gaussian blur is implemented in ImageJS:

_Kernel Definition_: The core concept of Gaussian blur involves [convolving](../../Glossary.md#convolution 'glossary link on convolution') the image with a Gaussian [kernel](../../Glossary.md#kernel 'glossary link on kernel'), also known as a Gaussian filter or mask. This kernel's values are arranged in a way that creates a symmetric, bell-shaped pattern around the center of the kernel to approximate Gaussian function.

_Convolution Operation_: The Gaussian kernel is applied to the image using a convolution operation. This involves placing the kernel's center over each pixel in the image and performing element-wise multiplication of the kernel's values with the corresponding pixel values in the neighborhood. The results of these multiplications are summed up to compute the new value for the central pixel.

_Weighted Averaging_: The Gaussian kernel values create a weighting scheme that favors pixels closer to the center of the kernel and decreases the influence of pixels farther away. This is because the Gaussian function is symmetrically distributed around its center, resulting in stronger weights for nearby pixels and weaker weights for distant ones.

_Smoothing Effect_: As the convolution operation is applied across the entire image, each pixel's value is replaced with a weighted average of its neighboring pixels' values. This process effectively reduces the intensity variations caused by noise and fine details, resulting in a smoothed version of the image.

</details>
