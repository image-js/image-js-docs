`or` method performs a [logical disjunction](https://en.wikipedia.org/wiki/Logical_disjunction 'wikipedia link on logical disjunction') between bits of two masks.

It works like this:

```ts
let mask = new Mask(3, 3, data: new Uint8Array([1, 1, 1, 1, 1, 1, 0, 0, 0]));
let mask2 = new Mask(3, 3, data: new Uint8Array([0, 0, 0, 1, 1, 1,  1, 1, 1]));
const orMask = mask.and(mask2);
// expect orMask to equal [1,1,1,1,1,1,1,1,1]
```

:::info
Mask calls an `or` function. To know how the function works more in-depth click on this link(link).
:::

### Parameters and default values

- [`mask`](https://image-js.github.io/image-js-typescript/classes/Mask.html#or 'github.io link')

- [`options`](https://image-js.github.io/image-js-typescript/classes/Mask.html#or 'github.io link')
