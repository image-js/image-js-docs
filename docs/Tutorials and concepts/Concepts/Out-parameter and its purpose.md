In ImageJS several functions have an optional parameter called `out`.
This parameter allows to choose which image to use as an output. It enables better memory management by allowing writing image into an existing one instead of cloning it every time a function is executed.

This option is mostly supported for filters which take a single image as input and produce a single image as output.

For overwriting to be successful,`out` must be compatible with target width, height, depth and color model.

Here is a simple example of correct and incorrect usage of `out` while applying `invert` filter:

```ts
//Creates a gray image of width = 3 and height = 3.
let image1 = testUtils.createGreyImage([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
]);
//Creates an RGB image of width = 1 and height = 3.
let image2 = testUtils.createRgbImage([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
]);
//Image to apply filter on.
let testImage = testUtils.createGreyImage([
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3],
]);
//Correct usage of `out` option. Images are compatible.
testImage = testImage.invert({ out: image1 });
console.log(testImage === image1); //true

//Incorrect usage of `out` option. Images have different widths.
testImage = testImage.invert({ out: image2 });
//Throws an error `cannot use out image. Its width property must be 3. Received 1`.
```

If images are compatible source image can be used as an output. The example below shows the difference between function with and without `out` parameter.

```ts
// By default, not passing the out parameter will create and return a new image
testImage = image.invert();
console.log(image === testImage); // false

// You can pass the source image as the out parameter to avoid creating a new image
// The returned image is the out image
testImage = image.invert({ out: image });
console.log(image === testImage); // true
```

:::caution
Some functions like `convertColor` can have an `out` parameter but cannot be applied on itself, since the function changes color model of input image.

```ts
let image1 = testUtils.createGreyImage([[1, 1, 1]]);
image1 = image1.convertColor('RGB', { out: image1 }); //will throw error
```

:::
