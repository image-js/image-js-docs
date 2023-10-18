---
sidebar_position: 100
---

_Makes a logical conjunction between masks._

[🎭 Mask options and parameters of `and` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')

`and` method performs a [logical conjunction](https://en.wikipedia.org/wiki/Logical_conjunction 'wikipedia link on logical conjunction') between bits of two masks.

It works like this:

```ts
let mask = new Mask(3, 3, data: new Uint8Array([1, 1, 1, 1, 1, 1, 0, 0, 0]));
let mask2 = new Mask(3, 3, data: new Uint8Array([0, 0, 0, 1, 1, 1,  1, 1, 1]));
const andMask = mask.and(mask2);
// expect andMask to equal [0,0,0,1,1,1,0,0,0]
```

:::caution
Masks must have the same size for compatibility reasons.
:::

### Parameters and default values

- `mask`

- `options`

#### Options

| Property                                                                               | Required | Default value |
| -------------------------------------------------------------------------------------- | -------- | ------------- |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/AndOptions.html#out) | no       | -             |
