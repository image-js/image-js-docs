---
sidebar_position: 10
---

_Makes an addition between two images._

[Check options and parameters of `add` method](https://image-js.github.io/image-js-typescript/classes/Image.html#add 'github.io link')

`add` method, opposed to [subtraction](./Subtraction.md 'internal link on subtract'), takes another Image and makes an addition between each respective pixel value.
It works like this:

```ts
let mask = new Image(3, 3, {
  data: new Uint8Array([1, 122, 122, 122, 122, 1, 1, 1, 1]),
});
let mask2 = new Image(3, 3, {
  data: new Uint8Array([1, 133, 133, 133, 0, 0, 50, 0, 1]),
});
mask = mask.add(mask2);
// expect mask to equal [2,255,255,255,255,122,1,51,2]
```

:::caution
Images must have the same size, channel number and bit depth for compatibility reasons.
:::

### Kinds of images compatible with algorithm

| Image property | What it means                              | Possible values |
| -------------- | ------------------------------------------ | --------------- |
| `bitDepth`     | number of bits per channel                 | `[8,16]`        |
| `components`   | number of components without alpha channel | `[1,3]`         |
| `alpha`        | is alpha channel allowed                   | `false`         |

### Parameters and default values

- [`otherImage`](https://image-js.github.io/image-js-typescript/classes/Mask.html#subtract 'github.io link')
