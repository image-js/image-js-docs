[Check options and parameters of getValue method](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

This method gets value of pixel's specific channel from mask data. It works like this:

```ts
let mask = new Mask(3, 3);
let value = mask.getValue(1, 1, 0);
// returns an array with a value of a bit (in this case 0).
```

:::caution
Channel option has been added for compatibility with Image class. In reality, if a user puts a channel other than 0, the method will throw an error.
:::

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

- [`channel`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')
