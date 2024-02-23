---
sidebar_position: 20
---

_Finds extreme pixel values in the image._

[🖼️ Image options and parameters of `getExtrema` function](https://image-js.github.io/image-js-typescript/functions/getExtrema.html 'github.io link')

`getExtrema`, as the name suggests, finds extreme intensity values of the image. If user looks for minimum values it finds the darkest points, when maximum - the brightest.

The principle is straight-forward: the function iterates through each point and compares values around it. If all the values around point in question is smaller then the point is considered a minimum. Same algorithm for maximum values.

:::info
By choosing different algorithm option you can change the size of the neighboring area where the extrema is search.
:::
:::tip
You can add a mask as an option to specify locations where to look for extrema.
:::

| Minimum                                                            | Maximum                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| ![Minimum](./images/extremaOutput/CellsOutputcrossMinISODATA5.jpg) | ![Maximum](./images/extremaOutput/CellsOutputcrossMaxISODATA5.jpg) |

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `image`

- `options`

#### Options

| Property                                                                                               | Required | Default value |
| ------------------------------------------------------------------------------------------------------ | -------- | ------------- |
| [`kind`](https://image-js.github.io/image-js-typescript/interfaces/ExtremaOptions.html#kind)           | no       | `'maximum'`   |
| [`mask`](https://image-js.github.io/image-js-typescript/interfaces/ExtremaOptions.html#mask)           | no       | -             |
| [`algorithm`](https://image-js.github.io/image-js-typescript/interfaces/ExtremaOptions.html#algorithm) | no       | `star`        |
| [`maxEquals`](https://image-js.github.io/image-js-typescript/interfaces/ExtremaOptions.html#maxEquals) | no       | `2`           |
