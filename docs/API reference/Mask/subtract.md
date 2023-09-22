Method called `subtract` ,as the name suggests, takes another mask and makes a subtraction between each respective bit of the mask.
It works like this:

```ts
let mask = new Mask(3, 3, {
  data: new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1]),
});
let mask2 = new Mask(3, 3, {
  data: new Uint8Array([1, 1, 1, 2, 2, 2, 2, 2, 2]),
});
mask = mask.subtract(mask2);
// expect mask to equal [0,0,0,1,1,1,1,1,1]
```

:::caution
Masks must have the same size for compatibility reasons.
:::

:::info
Mask method calls `subtract` function. To check how this function works in depth click on this link(link)
:::

### Parameters and default values

- [`mask`](https://image-js.github.io/image-js-typescript/classes/Mask.html#subtract 'github.io link')

- [`options`](https://image-js.github.io/image-js-typescript/classes/Mask.html#subtract 'github.io link')
