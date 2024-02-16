---
sidebar_position: 50
---

_Removes mask regions at the border of a mask._

[🎭 Mask options and parameters of `clearBorder` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#clearBorder 'github.io link')

`clearBorder()` method removes the elements at the border of the mask. The elements are cleared depending on the color that user specifies as a parameter. This can be used as a preparatory tool for ROI analysis since there are times when regions do not fit completely on an image. With incomplete elements considered as regions the analysis can become misleading.

![clearBorder example](./images/clearBorder/clearBorder.png)

### Parameters and default values

- `mask`

- `options`

#### Options

| Property                                                                                                         | Required | Default value |
| ---------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`allowCorners`](https://image-js.github.io/image-js-typescript/interfaces/ClearBorderOptions.html#allowCorners) | no       | `false`       |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/ClearBorderOptions.html#out)                   | no       | -             |
| [`color`](https://image-js.github.io/image-js-typescript/interfaces/ClearBorderOptions.html#color)               | no       | `white`       |
