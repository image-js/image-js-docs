---
sidebar_position: 20
---

_Finds extreme pixel values in the image._

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

### Parameters and default values

- `image`

- `options`

#### Options

| Property                                                                                                        | Required | Default value |
| --------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`kind`](https://image-js.github.io/image-js-typescript/interfaces/RemoveClosePointsOptions.html#distance)      | no       | `'maximum'`   |
| [`mask`](https://image-js.github.io/image-js-typescript/interfaces/RemoveClosePointsOptions.html#distance)      | no       | -             |
| [`algorithm`](https://image-js.github.io/image-js-typescript/interfaces/RemoveClosePointsOptions.html#distance) | no       | `star`        |
| [`maxEquals`](https://image-js.github.io/image-js-typescript/interfaces/RemoveClosePointsOptions.html#distance) | no       | `2`           |
