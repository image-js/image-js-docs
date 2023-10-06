---
sidebar_position: 2
---

import GradientDemo from './gradient.demo.tsx'

[Check options and parameters of gradient method](https://image-js.github.io/image-js-typescript/functions/gradientFilter.html 'link on github.io')

:::caution
This method only works with images.
:::

Gradient filter or specifically[ a gradient-based edge detection filter](https://en.wikipedia.org/wiki/Graduated_neutral-density_filter 'Wikipedia link on gradient filter'), is an image processing technique used to highlight edges and boundaries within an image by emphasizing areas of rapid intensity change. The gradient filter operates by calculating the rate of change of pixel intensities across the image. When there's a rapid transition from one intensity level to another, [the convolution operation](../../../Glossary.md#convolution 'glossary link on convolution') captures this change as a high gradient magnitude value, indicating the presence of an edge. It's a fundamental step in various computer vision and image analysis tasks, such as edge detection, object recognition, and image segmentation.

<GradientDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                           | Required | Default value    |
| ------------------------------------------------------------------------------------------------------------------ | -------- | ---------------- |
| [`kernelX`](https://image-js.github.io/image-js-typescript/interfaces/GradientFilterXOptions.html#kernelX)         | **\***   | -                |
| [`kernelY`](https://image-js.github.io/image-js-typescript/interfaces/GradientFilterYOptions.html#kernelY)         | **\***   | -                |
| [`bitDepth`](https://image-js.github.io/image-js-typescript/interfaces/GradientFilterXOptions.html#bitDepth)       | no       | `image.bitDepth` |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/GradientFilterXOptions.html#borderType)   | no       | `replicate`      |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/GradientFilterXOptions.html#borderValue) | no       | `0`              |

**\*** - if applying filter is necessary in only one of directions, then a user can pass one kernel instead of two. However, if none were passed on, function will throw an error.

The gradient filter enhances edges by detecting abrupt changes in pixel intensities.

:::caution
Keep in mind that gradient filters can be sensitive to noise and might result in false edges or emphasize noise. Smoothing the image (e.g., using Gaussian blur) before applying the gradient filter can help mitigate this issue.
:::

<details>
<summary><b>Implementation</b></summary>

Here's how gradient filter is implemented in ImageJS:

_Grayscale Conversion_: Before applying a gradient filter, the color image is converted into [grayscale](grayscale.md 'link to grayscale filter'). This simplifies the processing by reducing the image to a single channel representing pixel intensities.

_Kernel Operators_: Gradient filter consists of small convolution [kernels](../../../Glossary.md#kernel 'glossary link on kernel'). Normally, one for detecting horizontal changes and another for vertical changes, however user might indicate only one kernel to check only one of directions. These kernels are usually 3x3 matrices of numerical weights.

_Convolution Operation_: The gradient filter is applied through a [convolution](../../../Glossary.md#convolution 'glossary link on convolution') operation, where the filter kernel slides over the grayscale image. At each position, the convolution operation involves element-wise multiplication of the filter kernel with the corresponding pixels in the image, followed by summing up the results. This sum represents the rate of intensity change (gradient) at that location in the image.

_Gradient Magnitude and Direction_: For each pixel, the gradient magnitude is calculated by combining the results of the horizontal and vertical convolutions. The corresponding values from each convolution are put in square and summed, then put in square root.

_Edge Detection_: The gradient magnitude values are used to identify regions of rapid intensity change, which correspond to edges in the image. Higher gradient magnitude values indicate stronger edges.

:::tip
_Thresholding_: To further refine the edges detected, a [thresholding](../Operations/threshold.md 'internal link on threshold filter') step is often applied. Pixels with gradient magnitudes below a certain threshold are considered as non-edges, while those above the threshold are considered edges. This helps in reducing noise and emphasizing significant edges.
:::

</details>
