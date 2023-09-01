import DilateDemo from './dilate.demo.tsx'

[Check options and parameters of dilate method](https://image-js.github.io/image-js-typescript/classes/Image.html#resize 'github.io link')

<DilateDemo />

[Dilation](<https://en.wikipedia.org/wiki/Dilation_(morphology)> 'wikipedia link on dilation') is a fundamental morphological operation in image processing that is used to expand the size of foreground objects (regions of interest) within an image while preserving their shape and structure. It involves moving a structuring element (also known as a kernel) over the image and replacing each pixel with the maximum value of the pixels covered by the structuring element. Dilation is commonly used for tasks like noise reduction, object enlargement, and feature enhancement.

### Parameters and default values

- `options`

#### Options

| Option                                                                                                 | Default value                     |
| ------------------------------------------------------------------------------------------------------ | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/ErodeOptions.html#iterations) | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/ErodeOptions.html#kernel)         | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |
