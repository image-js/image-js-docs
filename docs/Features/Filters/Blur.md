---
sidebar_position: 30
---

import BlurDemo from './blur.demo.tsx'

[Check options and parameters of blur method](https://image-js.github.io/image-js-typescript/classes/Image.html#blur 'link on github io')

:::caution
This method works only with images.
:::

Blur, also known as average blur or box blur, is a simple image processing technique used to reduce noise and smooth out images. It involves replacing the color value of a pixel with the average color value of its neighboring pixels within a specified window or kernel. This process effectively blurs the image and reduces high-frequency noise.

<BlurDemo />

Box blur is particularly effective in reducing [salt-and-pepper](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'wikipedia link on salt and pepper noise') noise (random black and white pixels) and minor imperfections in an image. However, it also leads to loss of finer details, so the choice of [kernel](../../Glossary.md#kernel) size is important.
More advanced blurring techniques, such as [Gaussian blur](./gaussianBlur.md 'internal link to gaussian blur') or [bilateral filter](https://en.wikipedia.org/wiki/Bilateral_filter 'wikipedia link on bilateral filters'), are often used for better results in various applications.

### Parameters and default values

- `options`

#### Options

| Property                                                                                                | Required | Default value |
| ------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`height`](https://image-js.github.io/image-js-typescript/interfaces/BlurOptions.html#height)           | **yes**  | -             |
| [`width`](https://image-js.github.io/image-js-typescript/interfaces/BlurOptions.html#width)             | **yes**  | -             |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/BlurOptions.html#borderType)   | no       | `reflect101`  |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/BlurOptions.html#borderValue) | no       | `0`           |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/BlurOptions.html#out)                 | no       | -             |

<details>
<summary>
<b>Implementation</b>
 </summary>

Here's how blur filter is implemented in ImageJS:

_Select a Kernel Size_: The first step is to choose the size of the kernel or window that will be used for the blurring operation. The kernel is typically a square matrix with odd dimensions, such as 3x3, 5x5, 7x7, etc. The larger the kernel, the more intense the blurring effect.

_Iterate through Pixels_: For each pixel in the image, the algorithm applies [convolution](../../Glossary.md#convolution).

_Calculate Average Color_: The algorithm calculates the average color value of all the pixels within the kernel.

_Replace Pixel Value_: The original pixel's color value is then replaced with the calculated average color value.

</details>
