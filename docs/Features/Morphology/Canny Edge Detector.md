---
sidebar_position: 80
---

import CannyEdgeDemo from './demos/cannyEdgeDetector.demo.tsx'
import CannyEdgeMaskDemo from './demos/cannyEdgeDetector.mask.demo.tsx'

[Check options and parameters of cannyEdgeDetector method](https://image-js.github.io/image-js-typescript/classes/Image.html#cannyEdgeDetector 'github.io link')

The Canny edge detector is a popular and widely used image processing technique for detecting edges in images. It is widely used in computer vision, image processing, and various applications such as object recognition, image segmentation, and feature extraction due to its ability to accurately detect edges and suppress noise.

### Applying Canny edge detector on Images:

<CannyEdgeDemo />

### Applying Canny edge detector on Masks:

<CannyEdgeMaskDemo />

The Canny edge detector is known for its ability to:

- Detect edges with good localization (i.e., edges are thin and located precisely).
- Suppress noise due to the Gaussian smoothing.
- Handle edges with varying levels of intensity (gradient).
- Allow for customization through the selection of appropriate threshold values.

### Parameters and default values

- `options`

#### Options

| Property                                                                                                                     | Required | Default value |
| ---------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`gaussianBlurOptions`](https://image-js.github.io/image-js-typescript/interfaces/CannyEdgeOptions.html#gaussianBlurOptions) | no       | `1`           |
| [`highThreshold`](https://image-js.github.io/image-js-typescript/interfaces/CannyEdgeOptions.html#highThreshold)             | no       | `0.1`         |
| [`lowThreshold`](https://image-js.github.io/image-js-typescript/interfaces/CannyEdgeOptions.html#hysteresis)                 | no       | `0.04`        |
| [`hysteresis`](https://image-js.github.io/image-js-typescript/interfaces/CannyEdgeOptions.html#hysteresis)                   | no       | `true`        |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/CannyEdgeOptions.html#hysteresis)                          | no       | -             |

<details>
<summary>
<b>Implementation</b>
 </summary>
The Canny edge detector consists of several stages:

_Smoothing_: The first step involves applying a Gaussian filter to the input image. This helps reduce noise and smooth out small variations in pixel values.

_Gradient Calculation_: After smoothing, the gradient of the image is calculated using convolution with Sobel masks in both the horizontal and vertical directions. This step highlights regions of rapid intensity change in the image.

_Non-maximum Suppression_: In this step, the gradient magnitude is examined at each pixel location, and non-maximum values are suppressed. This means that only the local maxima in gradient magnitude are retained, which helps thinning the edges and keeping only the most prominent ones.

**(optional)**

_Edge Tracking by [Hysteresis](../../Glossary.md#hysteresis "internal link on hysteresis)_: This step involves tracking edges by applying two thresholds: a high threshold and a low threshold. Pixels with gradient magnitude values above the high threshold are considered strong edges, while those between the low and high thresholds are considered potential edges. The algorithm then connects potential edges to strong edges, forming continuous edge contours.

Finally, edge tracking by hysteresis is performed to link weak edges to strong edges. This helps in forming continuous edges and eliminating isolated weak edges caused by noise.

The output of the Canny edge detector is a binary image(mask) where edges are represented as white lines.

</details>

:::info
The choice of threshold values for the high and low thresholds can affect the performance of the Canny edge detector and may need to be adjusted depending on the specific application and the characteristics of the input image.
:::
