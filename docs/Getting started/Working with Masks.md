import MaskDemo from './mask.demo.tsx'

### Mask

Masks are binary images. This means its number of channels and components is limited to 1, It also reduces bit depth and maximum value of the pixel.
However, Masks also serve another purpose. A mask is a binary image that specifies which pixels are to be processed or analyzed.
In image processing, It is often used for filtering or isolating specific regions of interest within an image.
In ImageJS, Mask can be obtained by using `threshold` method on an image. Thresholding has multiple algorithms, so you can see which one fits your needs better (for more info see [`threshold` page](../Features/Operations/threshold.md)../).

```ts
image = image.threshold(); // returns a mask
```

It can also be created by simply creating a Mask object. By default mask will be filled with 0s.

```ts
let mask = new Mask(<width>,<height>,<options>);
```

#### Options

| Property                                                                                      | Required | Default value          |
| --------------------------------------------------------------------------------------------- | -------- | ---------------------- |
| [`origin`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#origin) | no       | `{row: 0, column: 0 }` |
| [`data`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#data)     | no       | -                      |

What mask provides is the

<MaskDemo />
