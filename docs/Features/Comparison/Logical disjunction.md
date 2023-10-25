---
sidebar_position: 110
---

[Check options and parameters of `or` method](https://image-js.github.io/image-js-typescript/classes/Mask.html#or 'github.io link')

`or` method performs a [logical disjunction](https://en.wikipedia.org/wiki/Logical_disjunction 'wikipedia link on logical disjunction') between bits of two masks.

It works like this:

```ts
let mask = new Mask(3, 3, data: new Uint8Array([1, 1, 1, 1, 1, 1, 0, 0, 0]));
let mask2 = new Mask(3, 3, data: new Uint8Array([0, 0, 0, 1, 1, 1,  1, 1, 1]));
const orMask = mask.or(mask2);
// expect orMask to equal [1,1,1,1,1,1,1,1,1]
```

:::caution
Masks must have the same size for compatibility reasons.
:::

### Parameters and default values

- `mask`

- `options`

#### Options

| Property                                                                              | Required | Default value |
| ------------------------------------------------------------------------------------- | -------- | ------------- |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/OrOptions.html#out) | no       | -             |
