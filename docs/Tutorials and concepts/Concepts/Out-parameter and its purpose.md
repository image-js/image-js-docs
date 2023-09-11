In several functions there is an option called "out".

It gives the user a choice what image should be used as function output.  
For example, let's say a user has an image which needs to be invert filtered.

If option `out` is not passed then the existing image will be simply cloned.

```ts
const invertedImage = image.invert();
```

However if option `out` is passed and specified like this:

```ts
let outputImage: Image;
const invertedImage = image.invert({ out: outputImage });
```

Then image can be copied to a specific variable, in this case, `outputImage`.

:::warning
Regardless of what kind of image is passed down as an option, the code will be executed. However,an error will be thrown if certain conditions are not met. For successful use of `out`, images must have the same color model, width, height and bit depth.
:::
