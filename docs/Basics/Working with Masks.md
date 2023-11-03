import MaskDemo from './mask.demo.tsx'

### Mask

In ImageJS masks are binary images which are used for filtering or isolating specific regions of interest within an image for processing and analysis.
In ImageJS, Mask can be obtained by using [`threshold` method](../Features/Operations/Threshold.md 'internal link on threshold') on an image.

:::caution
`threshold()`method possesses different algorithms which can affect the mask output. It is better to try several of them to see which one fits your needs best.
:::

```ts
image = image.threshold(); // returns a mask
```

<MaskDemo />

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
