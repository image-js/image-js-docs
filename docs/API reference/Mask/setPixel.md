[Check options and parameters of setPixel method](https://image-js.github.io/image-js-typescript/classes/Image.html#resize 'github.io link')

`setPixel()` method sets the value of a pixel.
It works like this:

```ts
let mask = new Mask(3, 3);
let pixel = mask.setPixel(1, 1, 0);
// sets a pixel in second row and second column with a value (in this case 2).
```

:::info
Mask is a binary image, therefore only two possible pixel values are 0 and 1.
:::

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setPixel 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setPixel 'github.io link')

- [`value`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setPixel 'github.io link')
