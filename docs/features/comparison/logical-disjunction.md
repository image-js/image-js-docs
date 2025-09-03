---
sidebar_position: 110
---

# Logical disjunction

_Makes a logical disjunction between masks._

[🎭 Mask options and parameters of `or` method](https://api.image-js.org/classes/index.Mask.html#or)

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

| Property                                                              | Required | Default value |
| --------------------------------------------------------------------- | -------- | ------------- |
| [`out`](https://api.image-js.org/interfaces/index.OrOptions.html#out) | no       | -             |
