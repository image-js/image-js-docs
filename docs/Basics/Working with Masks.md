import MaskDemo from './mask.demo.tsx'

### Mask

Masks are binary images, which means that such image has only one component with only two colors: black and white.
However, Masks also serve another purpose. It can specify which pixels are to be processed or analyzed.
In image processing, It is often used for filtering or isolating specific regions of interest within an image.
In ImageJS, Mask can be obtained by using `threshold` method on an image. Thresholding has multiple algorithms, so you can see which one fits your needs better (for more info see [`threshold` page](../Features/Operations/Threshold.md 'internal link on threshold')).

```ts
image = image.threshold(); // returns a mask
```

:::caution
`threshold()`method possesses different algorithms which can affect the mask output. It is better to try several of them to see which one fits your needs best.
:::
:::info
Mask can also be created by simply creating a Mask object. By default mask will be filled with 0s.

```ts
let mask = new Mask(<width>,<height>,<options>);
```

#### Options

| Property                                                                                      | Required | Default value          |
| --------------------------------------------------------------------------------------------- | -------- | ---------------------- |
| [`origin`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#origin) | no       | `{row: 0, column: 0 }` |
| [`data`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#data)     | no       | -                      |

:::

Besides the fact that masks can analyze shapes and regions by themselves using Convex Hull or Feret Diameter, they also allow finding the regions of interest of the image.

<MaskDemo />
