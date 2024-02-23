---
sidebar_position: 50
---

import MedianDemo from './demos/median.demo.tsx'

_Replaces each pixel's value with the median value of neighboring pixels, effectively reducing noise and preserving edge details._

[🖼️ Image options and parameters of `median` method](https://image-js.github.io/image-js-typescript/classes/Image.html#medianFilter 'github.io link')

[Median filter](https://en.wikipedia.org/wiki/Median_filter 'wikipedia link on median filter') is a digital image processing technique used to reduce noise in an image by replacing each pixel's value with the median value of neighboring pixels. It's particularly effective at removing ["salt and pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'wikipedia link on salt and pepper effect') noise.

<MedianDemo />

The key advantage of using the median filter, especially for noise reduction, is that it is less sensitive to extreme values or outliers compared to other filters like the [mean filter](https://en.wikipedia.org/wiki/Geometric_mean_filter 'wikipedia link on mean filter'). Since noise often appears as isolated bright or dark pixels that deviate significantly from their neighbors, the median filter effectively ignores these outliers and replaces them with more representative values from the local neighborhood.

However, the median filter also has limitations. It can blur sharp edges and thin lines in the image, as it doesn't consider the spatial relationship between pixels beyond their intensity values. This means that while it's great for removing noise, it might not be suitable for all types of image enhancement tasks.

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `options`

#### Options

| Property                                                                                                        | Required | Default value |
| --------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`cellSize`](https://image-js.github.io/image-js-typescript/interfaces/MedianFilterOptions.html#cellSize)       | **yes**  | `1`           |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/MedianFilterOptions.html#borderType)   | no       | `reflect101`  |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/MedianFilterOptions.html#borderValue) | no       | `0`           |

<details>
<summary><b>Implementation</b></summary>

Here's how median filter is implemented in ImageJS:

_Window or Kernel Selection_: The first step is to choose a small window or [kernel](../../Glossary.md#kernel 'glossary link to kernel'). This window will move over the entire image, pixel by pixel.

_Pixel Neighborhood_: As the window moves over the image, for each pixel location, the filter collects the pixel values within the window's neighborhood. The neighborhood consists of the pixels that are currently covered by the window/kernel.

_Median Calculation_: The collected pixel values within the neighborhood are then calculated with internal algorithm.

_Median Replacement_: After calculating the median value, the filter replaces the original pixel value with this median value. This process is repeated for every pixel in the image, as the window moves over the entire image.

</details>
