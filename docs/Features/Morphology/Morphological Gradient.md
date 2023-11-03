---
sidebar_position: 70
---

import MorphGradientDemo from './demos/morphologicalGradient.mask.demo.tsx'

_Emphasizes the boundaries of objects in a binary or grayscale image by calculating the difference between the dilation and erosion of the image._

[🖼️ Image options and parameters of `morphologicalGradient` method](https://image-js.github.io/image-js-typescript/classes/Image.html#morphologicalGradient 'github.io link')  
[🎭 Mask options and parameters of `morphologicalGradient` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#morphologicalGradient 'github.io link')

[The morphological gradient](https://en.wikipedia.org/wiki/Morphological_gradient 'wikipedia link on morphological gradient') is a mathematical operation used in image processing and mathematical morphology to highlight the boundaries of objects or regions within an image.
It is a fundamental concept in morphological image analysis and is often used for tasks such as edge detection and image segmentation.
The morphological gradient is based on the difference between an image after [dilation](./Dilation.md 'internal link on dilation') and the same image after [erosion](./Erosion.md 'internal link on erosion').

### Applying morphological gradient on Images:

<MorphGradientDemo />

### Parameters and default values

:::info
Parameters and options for Images and Masks are the same.
:::

- `options`

#### Options

| Property                                                                                                               | Required | Default value                     |
| ---------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/MorphologicalGradientOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/MorphologicalGradientOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
