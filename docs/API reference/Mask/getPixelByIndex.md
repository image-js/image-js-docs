[Check options and parameters of setPixelByIndex method](https://image-js.github.io/image-js-typescript/classes/Mask.html#getPixelByIndex 'github.io link')

This method gets pixel value from mask data by pixel's index. It works like this:

```ts
let mask = new Mask(3, 3);
let pixel = mask.getPixelByIndex(4);
// returns an array with a value of a pixel (in this case 0) indexed 4th.
// with a regular getPixel method it would be image.getPixel(1,1)
```

### Parameters and default values

- [`index`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getPixelByIndex 'github.io link')
