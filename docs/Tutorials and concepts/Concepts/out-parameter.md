# Plain call vs method call

**Goal**

Memory management

What image processing operations have this option available?
=> mostly supported for filters which take a single image as input and produce a single image as output.

## Choosing the correct output image

Example with code with correct / incorrect output image

Out must be compatible with target width, height, depth, color model

## Overwriting the source image

Use case: replace source image with target

Example with code

```ts
// By default, not passing the out parameter will create and return a new image
const newImage = image.invert();
console.log(image === newImage); // false

// You can pass the source image as the out parameter to avoid creating a new image
// The returned image is the out image
const replacedImage = image.invert({ out: image });
console.log(image === replacedImage); // true
```
