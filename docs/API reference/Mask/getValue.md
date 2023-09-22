[Check options and parameters of getValue method](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

This method gets value of pixel's specific channel from mask data.

:::info
`getValue()` and `getBit()` work the same way with the mask. The `getValue()` function exists for compatibility with the `Image` class.
:::

It works like this:

```ts
let mask = new Mask(3, 3);
let value = mask.getValue(1, 1, 0);
// returns an array with a value of the bit (in this case 0).
```

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

- [`channel`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')
