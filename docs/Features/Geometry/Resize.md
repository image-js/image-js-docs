---
sidebar_position: 10
---

[Check options and parameters of resize method](https://image-js.github.io/image-js-typescript/classes/Image.html#resize 'github.io link')

[Image rescaling](https://en.wikipedia.org/wiki/Image_scaling 'wikipedia link on image rescaling'), also known as image resizing or image scaling, is an image processing technique used to change the dimensions (size) of an image while maintaining its aspect ratio. Rescaling can involve both enlarging and reducing the image's size. The goal of image rescaling is to adapt an image to fit within specific dimensions, whether it's for display, printing, or other purposes.

import ResizeDemo from './resize.demo.tsx'

<ResizeDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                                  | Required | Default value |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`borderType`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#borderType)                   | no       | `constant`    |
| [`borderValue`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#borderValue)                 | no       | `0`           |
| [`height`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#height)                           | no       | -             |
| [`interpolationType`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#interpolationType)     | no       | `bilinear`    |
| [`preserveAspectRatio`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#preserveAspectRatio) | no       | `true`        |
| [`width`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#width)                             | no       | -             |
| [`xFactor`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#xFactor)                         | no       | -             |
| [`yFactor`](https://image-js.github.io/image-js-typescript/interfaces/ResizeOptions.html#yFactor)                         | no       | -             |
