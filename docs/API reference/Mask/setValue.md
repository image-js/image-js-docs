[Check options and parameters of setValue method](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValue 'github.io link')

`setValue()` method sets the value of a bit.
:::info
`setValue()` and `setBit()` work the same way with the mask. The `setValue()` function exists for compatibility with the `Image` class.
:::
It works like this:

```ts
let mask = new Mask(3, 3);
let value = mask.setValue(1, 1, 0, 1);
// sets a bit in second row and second column with a value (in this case 1).
```

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValue 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValue 'github.io link')

- [`channel`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValue 'github.io link')

- [`value`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValue 'github.io link')
