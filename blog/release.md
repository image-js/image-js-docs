---
slug: v1-release
title: Release notes v1
date: 2025-07-19
---

We're excited to announce the release of a new major version of ImageJS. This version brings TypeScript support and a more intuitive API while maintaining the powerful image processing capabilities you love.

<!-- truncate -->

# API Changes

## 🔷 TypeScript Support

All APIs now have strict TypeScript definitions:

```ts
// Before: loose typing
const pixel = img.getPixel(x, y); // any[]

// After: strict typing
const pixel = img.getPixel(x, y); // number[] with proper channel count
```

This eliminates runtime type errors and provides better IntelliSense, autocomplete, and refactoring support in your IDE. Developers can now catch bugs at compile time rather than discovering them in production.

## ⚠️ Breaking changes

### Images

#### Loading and saving

`load()` and `save()` have been replaced with dedicated functions `read()` and `write()`.

```ts
//Before
import { Image } from 'image-js';
const img = await Image.load('cat.jpg');
img.save('newCat.jpg');
```

```ts
//After
import { read, write } from 'image-js';
const img2 = await read('cat.jpg');
await write('newCat.jpg', img);
```

There are also synchronous versions of these functions.

```ts
import { readSync, writeSync } from 'image-js';
const img = readSync('cat.jpg');
writeSync('newCat.jpg', img);
```

The new approach allows for better TypeScript inference, smaller bundle sizes through tree-shaking, and clearer API design where I/O operations are separate from image manipulation.

#### Creating

When creating a new image, unlike before, image's width and height must be specified.

```ts
import { Image } from 'image-js';

// Would work before, will throw an error in a new version.
const image = new Image();
// Works fine.
const image2 = new Image(10, 10);
```

This change makes the Image constructor more explicit by requiring you to specify the dimensions upfront, preventing potential errors from working with uninitialized or undefined-sized images

#### Image position

Images now include an `origin` property that tracks their position relative to their parent image. When you crop an image, the cropped section remembers where it came from in the original image.

```ts
const croppedImage = img.crop({
  origin: { column: 10, row: 10 },
  width: 10,
  height: 10,
});

console.log(croppedImage.origin); // { column: 10, row: 10 }
```

### Masks

Binary images are now handled by a dedicated `Mask` class instead of Image with `kind: 'BINARY'`.

```ts
// Before
const mask = new Image(10, 10, { kind: 'BINARY' });
```

```ts
// After
const mask = new Mask(10, 10);
```

`Mask` provides better type safety, clearer API, and optimized performance for binary operations.

The new `Mask` class uses 1 byte per pixel (vs 8 pixels per byte), trading ~8x memory usage for significantly faster bit operations and simpler data manipulation.

### Points

Coordinates are now represented using `Point` objects instead of arrays. This change affects methods that require coordinate input like cropping, drawing, and pixel manipulation.

```ts
// Before
const croppedImage = img.crop({
  origin: [10, 10],
  width: 10,
  height: 10,
});
// After
const croppedImage = img.crop({
  origin: { column: 10, row: 10 },
  width: 10,
  height: 10,
});
```

It is a more explicit and self-documenting code and it also eliminates confusion about array order (column vs row).

### Sobel and Scharr filters

[Sobel](https://en.wikipedia.org/wiki/Sobel_operator), [Scharr](https://en.wikipedia.org/wiki/Sobel_operator#Alternative_operators) filters are now combined into a single `derivative()` method.

```ts
// Before
const sobelX = img.sobelX();
const sobelY = img.sobelY();

// After
const sobelX = img.derivative({ filter: 'sobel' });
const sobelY = img.derivative({ filter: 'scharr' });
```

This filter now also accepts only grayscale images, since filters, like Sobel or Scharr, are used mainly on grayscale images to detect edges.

### Method Renaming

Several methods have been renamed for consistency:

**Drawing methods**:

`img.paintPolyline()` ➡️ `img.drawPolyline()`

`img.paintPolygon()` ➡️ `img.drawPolygon()`

`img.paintCircle()` ➡️ `img.drawCircle()`

**Other methods**:

`img.copy()` ➡️ `img.clone()`

`img.clearBit()` ➡️ `img.setBit()`

`img.getLocalMaxima()` ➡️ `img.getExtrema()`

`img.getChannel()` ➡️ `img.extractChannel()`

`img.rotateLeft()` and `img.rotateRight()` ➡️ `img.rotate()`

`img.flipX()` and `img.flipY()` ➡️ `img.flip()`

Consistent naming follows common conventions ("draw\*" for rendering, "clone" for copying objects).

### Compatibility requirements

- Node.js: 18+ (previously 14+)
- TypeScript: 5.2.2+ (if using TypeScript)

### Removed Features

The following deprecated features have been removed:

- `countAlphaPixel()` - Use custom pixel counting with `getPixel()`
- `paintLabels()` - Feature was removed due to dependency issues. We plan to add it back in the future updates.
- `warpingFourPoints()` - Use `getPerspectiveWarp()` + `transform()`.
- 32-bit color depth has been currently removed. We plan to add it back in the future updates as well.
- `CMYK` and `HSL` color models have been removed.
- `insert()` has been removed.
- `abs()` has been removed.
- `paintMasks()` has been removed. Use `paintMask()`+ `for` loop.
- `mergeRois()` has been removed.

## 🆕 New Features

### `transform()`

`transform()` allows applying a transformation matrix on the image. Which means that the image can now be translated, sheared, or warped based on the matrix that the user entered. `transform()` accepts both 2x3 and 3x3 matrices, depending on whether you want an affine transformation or a perspective one.

```ts
const matrix = getPerspectiveWarp(sourcePoints);
const warped = img.transform(matrix);
```

For more details, visit our [tutorial](/docs/Tutorials/Applying%20transform%20function%20on%20images) on how image transformations work.

### Bicubic Interpolation

High-quality image scaling is now available with [bicubic interpolation](https://en.wikipedia.org/wiki/Bicubic_interpolation):

```ts
const resized = img.resize(800, 600, { interpolation: 'bicubic' });
```

**Use case**: In many cases it gives a better quality when scaling images, especially for photographs.

### Canny Edge Detection

[The Canny Edge Detector](https://en.wikipedia.org/wiki/Canny_edge_detector) is an advanced edge detection filter for computer vision applications:

```ts
const edges = img.cannyEdgeDetector({
  lowThreshold: 50,
  highThreshold: 150,
});
```

**Use case**: Object detection, image segmentation, feature extraction. You can learn more about it [here](../docs/Features/Morphology/Canny%20Edge%20Detector).

### Prewitt filter

[Prewitt](https://en.wikipedia.org/wiki/Prewitt_operator) filter has been added to the `derivative()` filter.

```ts
const prewitt = img.derivative({ filter: 'prewitt' });
```

**Use case**: Object detection, image segmentation, feature extraction. You can learn more about it [here](../docs/Features/Morphology/Morphological%20Gradient).

### Migration from deprecated methods

`warpingFourPoints()` has been deprecated. Now you have [`getPerspectiveWarp()`](../docs/Features/Geometry/Get%20Perspective%20Warp%20Matrix) that returns a matrix that can be applied on the image of interest in a new `transform()`.

```ts
// Before
const warped = img.warpingFourPoints(corners);

// After
const matrix = getPerspectiveWarp(corners);
const warped = img.transform(matrix);
```

**Use case**: Rectification of a perspective angle of an image. You can learn more about it [here](../docs/Features/Geometry/Get%20Perspective%20Warp%20Matrix).

### `merge()`

`merge()` allows combining several one-channel images into one image. It is the opposite of `split()`:

```ts
// Creates 3  grayscale images;
const img2 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img1 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img3 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(255);
// Creates RGB image. In this case, it creates blue 2x2 image.
const img4 = merge([img1, img2, img3]);
```

**Use case**: Combination of multiple channels into one image after they were.

## 🚀 Getting Started

To get started with ImageJS, we recommend visiting our ["Get started"](../docs/Getting%20started) guide

## 📚 Resources

- [API Documentation](https://image-js.github.io/image-js-typescript/)
- [Examples and Tutorials](https://image-js-docs.pages.dev/)
- [GitHub Repository](https://github.com/image-js/image-js-typescript)

## 🤝 Contributing

We welcome contributions! The new TypeScript codebase makes it easier than ever to contribute.

## 🙏 Acknowledgments

Special thanks to all contributors who made this release possible and to the community for their feedback and support during the development process.
