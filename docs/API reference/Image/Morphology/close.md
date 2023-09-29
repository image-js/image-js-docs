import CloseDemo from './close.demo.tsx'

Opposed to [opening](./open.md 'internal link to open method'), [closing process](<https://en.wikipedia.org/wiki/Closing_(morphology)> 'wikipedia link on closing') first [erodes](./Erode.md 'internal link to erode method') an image and only then [dilates](./Dilate.md 'internal link to dilate method') it.
It is a useful process for filling small holes in the image, while preserving the shape and size of large holes and objects.

<CloseDemo />

### Parameters and default values

- `options`

#### Options

| Property                                                                                               | Required | Default value                     |
| ------------------------------------------------------------------------------------------------------ | -------- | --------------------------------- |
| [`iterations`](https://image-js.github.io/image-js-typescript/interfaces/CloseOptions.html#iterations) | no       | `1`                               |
| [`kernel`](https://image-js.github.io/image-js-typescript/interfaces/CloseOptions.html#kernel)         | no       | `[[1, 1, 1],[1, 1, 1],[1, 1, 1]]` |
