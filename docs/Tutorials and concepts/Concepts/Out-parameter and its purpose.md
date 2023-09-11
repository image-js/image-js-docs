In several functions there is an option called "out".

It gives the user a possibility to choose if one wants to modify the current image or create a new one.
For example, let's say a user has an image which needs to be invert filtered.

```ts
import Image from 'image-js';

let image: Image;
```

If option `out` is not passed then the existing image will be modified.

```js
const invertedImage = image.invert();
//expect image === invertedImage
```

However if option `out` is passed and specified like this:

```js
let outputImage;
const invertedImage = image.invert({ out: outputImage });
//expect outputImage !== image
//expect outputImage === invertedImage
```

Then inverted image will be copied to variable `outputImage` and initial image will remain intact. In fact any compatible image can be passed down as an `out` option.

```ts
let blurredImage = image.blur();
let outputImage = blurredImage.invert({
  out: testUtils.load('opencv/testBlur.png'),
});
```

:::warning
Image can be passed down as an option only if certain conditions are met. An image must have the same color model, width, height and bit depth. If one of those conditions is not met, a corresponding error will be thrown.
:::
