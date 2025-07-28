---
slug: v1-release
title: Release notes v1
date: 2025-07-25
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

#### Coordinate System Changes

Coordinates are now represented using `Point` objects instead of arrays. This change affects methods that require coordinate input like cropping, drawing, pixel manipulation etc.

```ts
// Before
const croppedImage = img.crop({
  x:10,
  y:10
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

Images also include an `origin` that tracks their position relative to their parent's `origin`. When you crop an image, the cropped section remembers where it came from in the original image.

```ts
const croppedImage = img.crop({
  origin: { column: 10, row: 10 },
  width: 10,
  height: 10,
});

console.log(croppedImage.origin); // { column: 10, row: 10 }
```

It is a more explicit and self-documenting code. It also eliminates confusion about array order (column vs row).

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

### Regions of Interest

API for handling of regions of interest has also been changed.
ROI creation methods like `fromMask()` and `fromWatershed()` are now standalone functions `fromMask()` and `watershed()`.

```ts
//Before
import { Image } from 'image-js';

const roiManager = mask.getRoiManager();
roiManager.fromMask(mask);
const rois = roiManager.getRois();
```

```ts
//After
import { Image, fromMask } from 'image-js';

const roiManager = fromMask(mask);
const rois = roiManager.getRois();
```

This simplifies the process of creating a map of regions of interest and eliminates the need for a separate initialization step, providing a more direct and functional approach to ROI creation.

For more information, please, visit these tutorials:

- [Image segmentation with `threshold()` and `fromMask()`](../docs/Tutorials/Image%20segmentation%20with%20threshold)
- [Image segmentation with `watershed()`](../docs/Tutorials/Image%20segmentation%20with%20watershed)

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

**Stack methods**

`stack.getMinImage()` ➡️ `stack.minImage()`

`stack.getMinImage()` ➡️ `stack.maxImage()`

`stack.getAverageImage()` ➡️ `stack.meanImage()`

**Other methods**:

`img.clearBit()` ➡️ `img.setBit()`

`img.getLocalMaxima()` ➡️ `img.getExtrema()`

`img.getChannel()` ➡️ `img.extractChannel()`

`img.rotateLeft()` & `img.rotateRight()` ➡️ `img.rotate()`

`img.flipX()` & `img.flipY()` ➡️ `img.flip()`

`img.colorDepth()` ➡️ `img.convertBitDepth()`

`img.mask()` ➡️ `img.threshold()`

### Compatibility requirements

- Node.js: 18+ (previously 14+)
- TypeScript: 5.2.2+ (if using TypeScript)

### Removed Features

The following deprecated features have been removed:

#### Images

- `countAlphaPixel()` - Use custom pixel counting with `getPixel()`
- `paintLabels()` and `roi.paint()` - Features were removed due to dependency issues. We plan to add it back in the future updates.
- `warpingFourPoints()` - Use `getPerspectiveWarp()` + `transform()`.
- 32-bit color depth has been currently removed. We plan to add it back in the future updates as well.
- `CMYK` and `HSL` color models have been removed.
- `insert()` has been removed.
- `abs()` has been removed.
- `paintMasks()` has been removed. Use `paintMask()`+ `for` loop.
- `clearBit()` and `toggleBit()` have been removed, due to changes in `Mask`
  data representation (see ["Masks"](#masks)).

  #### ROIs and its management

- `colsInfo()` and `rowsInfo()` have been removed.
- `fromPoints()` has been removed.
- `fromMaxima()` has been removed.
- `fromMaskConnectedComponentLabelingAlgorithm()` and `getAnalysisMasks()` have been removed.
- `findCorrespondingRoi()` has been removed.
- `resetPainted()` has been removed.
- `mergeRoi()` and `mergeRois()` have been removed.
- `minX`,`minY`,`meanX`,`meanY`,`maxX`,`maxY` have been removed. Use ROI's `position`, combined with its `width` and `height`.

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

`warpingFourPoints()` has been removed. Now you have [`getPerspectiveWarp()`](../docs/Features/Geometry/Get%20Perspective%20Warp%20Matrix) that returns a matrix that can be applied on the image of interest in a new `transform()`.

```ts
// Before
const warped = img.warpingFourPoints(corners);

// After
const matrix = getPerspectiveWarp(corners);
const warped = img.transform(matrix);
```

**Use case**: Rectification of a perspective angle of an image. You can learn more about it [here](../docs/Features/Geometry/Get%20Perspective%20Warp%20Matrix).

### `merge()`

`merge()`is the opposite of `split()`. It allows combining several one-channel images into one multi-channel image:

```ts
// Creates 3  grayscale images;
const img1 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img2 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img3 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(255);
// Creates RGB image. In this case, it creates blue 2x2 image.
const img4 = merge([img1, img2, img3]);
```

**Use case**: Combination of multiple channels into one image after they were modified.

### `Stack` features

The Stack class has been significantly expanded with new methods for batch processing and statistical analysis of image collections.

#### Array-like Operations

A user can now filter images based on custom criteria using `filter()`:

```ts
// Create sample images
const img1 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img2 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(0);
const img3 = new Image(2, 2, { colorModel: 'GREY', bitDepth: 8 }).fill(255);

const stack = new Stack([img1, img2, img3]);

// Filter images where top-left pixel is white (255)
const brightImages = stack.filter((img) => img.getValue(0, 0, 0) === 255);
// Result: [img3]
```

One can also apply the same operation to every image in the stack with `map()`:

```ts
// Set top-left corner to gray (125) on all images
const modifiedStack = stack.map((img) => {
  img.setValue(0, 0, 0, 125);
  return img;
});
```

#### Statistical Operations

It is now possible to generate a median image from the entire stack - useful for noise reduction and background subtraction:

```ts
const medianImage = stack.medianImage();
```

or create a cumulative sum of all images in the stack:

```ts
const summedImage = stack.sum();
```

Access specific pixel values from any image in the stack using two convenient methods:

_By Coordinates_

```ts
const stackIndex = 1; // Second image in stack.
const row = 0;
const column = 0;
const channel = 0;

// Get pixel value at specific coordinates.
const pixelValue = stack.getValue(stackIndex, row, column, channel);
```

_By Linear Index_

```ts
const stackIndex = 1;
const pixelIndex = row * image.width + column; // Convert 2D to 1D index.
const channel = 0;

// Get the same pixel value using linear indexing.
const pixelValue = stack.getValueByIndex(stackIndex, pixelIndex, channel);
```

**Use Cases**: Time-lapse analysis, scientific imaging.

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
