---
sidebar_position: 20
---

In ImageJS several functions have an optional parameter called `out`.
You can use this parameter to select the image you want to use as the output. It helps with memory management by allowing you to write the image into an existing one instead of creating a new copy every time the function is run.

This option is mostly supported for filters which take a single image as input and produce a single image as output.

For overwriting to be successful, `out` must be compatible with the width, height, depth and color model of the target image.

Here is a simple example of correct and incorrect usage of `out` while applying `invert` filter:

```js
// Creates a gray image of width = 3 and height = 3.
let image1 = new Image(3, 3, { colorModel: 'GREY' });
// Creates an RGB image of width = 1 and height = 3.
let image2 = new Image(1, 3, { colorModel: 'RGB' });
// Image to apply filter on.
let testImage = new Image(3, 3, { colorModel: 'GREY' });
// Correct usage of `out` option. Images are compatible.
testImage = testImage.invert({ out: image1 });
console.log(testImage === image1); // true

// Incorrect usage of `out` option. Images have different widths.
testImage = testImage.invert({ out: image2 });
// Throws an error `cannot use out image. Its width property must be 3. Received 1`.
```

If the images are compatible, the source image can be used as an output, as shown in the following example:

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
Some functions like [`convertColor`](https://image-js.github.io/image-js-typescript/functions/convertColor.html 'github.io link') can have an `out` parameter but cannot use the source image as the target image, since the function changes the color model of the input image.

```ts
let image1 = testUtils.createGreyImage([[1, 1, 1]]);
image1 = image1.convertColor('RGB', { out: image1 }); // will throw error
```

:::
