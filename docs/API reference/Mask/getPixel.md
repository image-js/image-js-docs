[Check options and parameters of getPixel method](https://image-js.github.io/image-js-typescript/classes/Mask.html#getPixel 'github.io link')

As mask data is private, methods are necessary to tamper data. This method gets pixel value from mask data. It works like this:

```ts
let mask = new Mask(3, 3);
let pixel = mask.getPixel(1, 1);
// returns an array with a value of a pixel (in this case 0). Unlike image.getPixel() this method gives only one value.
```

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getPixel 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getPixel 'github.io link')
