[Check options and parameters of and method](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')

`and` method performs a [logical conjunction](https://en.wikipedia.org/wiki/Logical_conjunction 'wikipedia link on logical conjunction') between bits of two masks.

It works like this:

```ts
let mask = new Mask(3, 3, data: new Uint8Array([1, 1, 1, 1, 1, 1, 0, 0, 0]));
let mask2 = new Mask(3, 3, data: new Uint8Array([0, 0, 0, 1, 1, 1,  1, 1, 1]));
const andMask = mask.and(mask2);
// expect andMask to equal [0,0,0,1,1,1,0,0,0]
```

:::info
Mask calls `and` function. To know how the function works more in-depth click on this link(link).
:::

### Parameters and default values

- [`mask`](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')

- [`options`](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')
