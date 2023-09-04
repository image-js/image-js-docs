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

Then inverted image will be copied to variable `outputImage` and initial image will remain intact.
