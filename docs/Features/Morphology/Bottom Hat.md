---
sidebar_position: 60
---

[Check options and parameters of bottomHat method](https://image-js.github.io/image-js-typescript/classes/Image.html#bottomHat 'github.io link')

Similarly to [Top Hat](./Top%20Hat.md 'internal link to top hat'), [Bottom Hat](https://en.wikipedia.org/wiki/Top-hat_transform 'wikipedia link to top hat') operation computes the difference between two images. However, if top hat was using [opening method](./Opening.md 'internal link on open method'), bottom hat is using [closing method](./Closing.md 'internal link on close method').
The purpose of bottom hat(or, as it is also called, _black-hat_) is to enhance and extract **darker** regions of the image.

import BottomHatDemo from './bottomHat.demo.tsx'

<BottomHatDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                                   | Required | Default value                     |
| ---------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/BottomHatOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |
