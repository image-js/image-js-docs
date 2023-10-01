Method called `subtract` ,as the name suggests, takes another image and makes a subtraction between each respective bit of both images.
It works like this:

```ts
let image = new Image(3, 3, {
  data: new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1]),
});
let image2 = new Image(3, 3, {
  data: new Uint8Array([1, 1, 1, 2, 2, 2, 2, 2, 2]),
});
mask = image.subtract(image2);
// expect image to equal [0,0,0,1,1,1,1,1,1]
```

:::caution
Images must have the same size for compatibility reasons.
:::

### Parameters and default values

- [`image`](https://image-js.github.io/image-js-typescript/classes/Image.html#subtract 'github.io link')

- [`options`](https://image-js.github.io/image-js-typescript/classes/Image.html#subtract 'github.io link')
