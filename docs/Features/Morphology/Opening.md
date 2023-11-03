---
sidebar_position: 30
---

import OpenDemo from './demos/open.demo.tsx'

_Combines an erosion filter followed by a dilation filter._

[🖼️ Image options and parameters of `open` method](https://image-js.github.io/image-js-typescript/classes/Image.html#open 'github.io link')  
[🎭 Mask options and parameters of `open` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#open 'github.io link')

[Opening](<https://en.wikipedia.org/wiki/Opening_(morphology)#:~:text=In%20mathematical%20morphology%2C%20opening%20is,blue%20square%20with%20round%20corners.&text=denote%20erosion%20and%20dilation%2C%20respectively>) process in morphology involves a dilation of an image, followed by its erosion.
This process allows removing small objects and thin lines while preserving the shape and size of larger objects.

<OpenDemo />

### Parameters and default values

:::info
Parameters and options for Images and Masks are the same.
:::

- `options`

#### Options

| Property                                                                                              | Required | Default value                     |
| ----------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/OpenOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/OpenOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |

:::info
The method is also available for Masks.
:::
