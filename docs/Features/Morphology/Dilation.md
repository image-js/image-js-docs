---
sidebar_position: 20
---

import DilateDemo from './dilate.demo.tsx'

_Enlarges the size of foreground objects by iteratively expanding their boundaries, adding pixels based on specific criteria._

[Check options and parameters of `dilate` method](https://image-js.github.io/image-js-typescript/classes/Image.html#dilate 'github.io link')

[Dilation](<https://en.wikipedia.org/wiki/Dilation_(morphology)> 'wikipedia link on dilation') is a fundamental morphological operation in image processing that is used to expand the size of foreground objects ([regions of interest](../../Glossary.md#roiregion-of-interest 'internal link on region of interest')) within an image while preserving their shape and structure. It involves moving a structuring element (also known as a [kernel](../../Glossary.md#kernel 'internal link on kernel')) over the image and replacing each pixel with the **maximum** value of the pixels covered by the structuring element. Dilation is commonly used for tasks like noise reduction, object enlargement, and feature enhancement.

<DilateDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/DilateOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/DilateOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |
