import TopHatDemo from './topHat.demo.tsx'

[Check options and parameters of topHat method](https://image-js.github.io/image-js-typescript/classes/Image.html#topHat 'github.io link')

In morphology and image processing, [top hat](https://en.wikipedia.org/wiki/Top-hat_transform 'wikipedia link on top hat') is an operation used to enhance or extract small bright regions or details from an image while suppressing the larger surrounding structures.
It is the result of subtraction between the result of input image [opening](./open.md 'internal link on open method') and the input image itself.
The purpose of bottom hat(or as it is also called _black-hat_) is to enhance and extract **brighter** regions of the image.

<TopHatDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/TopHatOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/TopHatOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |
