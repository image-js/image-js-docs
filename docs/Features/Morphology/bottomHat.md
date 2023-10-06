import BottomHatDemo from './bottomHat.demo.tsx'

[Check options and parameters of bottomHat method](https://image-js.github.io/image-js-typescript/classes/Image.html#bottomHat 'github.io link')

Similarly to [topHat](./topHat.md 'internal link to top hat'), [bottom hat](https://en.wikipedia.org/wiki/Top-hat_transform 'wikipedia link to top hat') operation computes the difference between two images. However, if top hat was using [opening method](./open.md 'internal link on open method'), bottom hat is using [closing method](./close.md 'internal link on close method').
The purpose of bottom hat(or, as it is also called, _black-hat_) is to enhance and extract **darker** regions of the image.

<BottomHatDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                   | Required | Default value                     |
| ---------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |