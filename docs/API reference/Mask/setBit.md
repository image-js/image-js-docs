[Check options and parameters of setBit method](https://image-js.github.io/image-js-typescript/classes/Mask.html#setBit 'github.io link')

`setBit()` method sets the value of a bit.
It works like this:

```ts
let mask = new Mask(3, 3);
let bit = mask.setBit(1, 1, 1);
// sets a bit in second row and second column with a value (in this case 1).
```

:::info
Mask is a binary image, therefore only two possible bit values are 0 and 1.
:::

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setBit 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setBit 'github.io link')

- [`value`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setBit 'github.io link')
