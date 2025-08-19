---
sidebar_position: 20
---

# Subtraction

_Makes a subtraction between two images._

[🖼️ Image options and parameters of `subtract` method](https://api.image-js.org/classes/index.Image.html#subtract)  
[🎭 Mask options and parameters of `subtract` method](https://api.image-js.org/classes/index.Mask.html#subtract)

Method called `subtract`, as the name suggests, takes another Image(or Mask) and makes a subtraction between each respective bit.
It works like this:

```ts
let mask = new Mask(3, 3, {
  data: new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1]),
});
let mask2 = new Mask(3, 3, {
  data: new Uint8Array([1, 1, 1, 0, 0, 0, 0, 0, 1]),
});
mask = mask.subtract(mask2);
// expect mask to equal [0,0,0,1,1,1,1,1,0]
```

:::caution
Both masks must have the same size for compatibility reasons. Images must have the same size, channel number and bit depth.
:::

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[1,8,16]`      |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `false`         |

### Parameters and default values

:::info
Parameters and options for Images and Masks are the same.
:::

- `other`

- `options`

#### Options

| Property                                                                                   | Required | Default value |
| ------------------------------------------------------------------------------------------ | -------- | ------------- |
| [`absolute`](https://api.image-js.org/interfaces/index.SubtractImageOptions.html#absolute) | no       | `false`       |

:::info
The method is also available for Masks.
:::
