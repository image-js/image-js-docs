---
slug: Release of a new version
title: Release Notes
date: 2025-07-19
---

We're excited to announce the release of image-js-typescript, a complete rewrite of the popular image-js library. This new version brings TypeScript support and a more intuitive API while maintaining the powerful image processing capabilities you love.

<!--- truncate --->

# API Changes

## ⚠️ Breaking changes

### Changed the way images are loaded and created

Static method `load` for reading and method `save` for writing images have been replaced with dedicated functions `read` and `write`.

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

There are also synchronous versions of these functions.(add more explanation)

```ts
import { readSync, writeSync } from 'image-js';
const img = readSync('cat.jpg');
writeSync('newCat.jpg', img);
```

The new approach allows for better TypeScript inference, smaller bundle sizes through tree-shaking, and clearer API design where I/O operations are separate from image manipulation.

### Distinction between Image and Mask objects

Binary images are now handled by a dedicated Mask class instead of Image with `kind: 'BINARY'`.

```ts
// Before
const mask = new Image(10, 10, { kind: 'BINARY' });
```

```ts
// After
const mask = new Mask(10, 10);
```

Dedicated Mask class provides better type safety, clearer API, and optimized performance for binary operations.

The new Mask class uses 1 byte per pixel (vs 8 pixels per byte), trading ~8x memory usage for significantly faster bit operations and simpler data manipulation.

### Modification of Sobel and Scharr filters

[Sobel](https://en.wikipedia.org/wiki/Sobel_operator),[Scharr](https://en.wikipedia.org/wiki/Sobel_operator#Alternative_operators) filters are now combined into a single `derivative()` method.

```ts
// Before
const sobelX = img.sobelX();
const sobelY = img.sobelY();

// After
const sobelX = img.derivative({ filter: 'sobel' });
const sobelY = img.derivative({ filter: 'scharr' });
```

This filter also now accepts only grayscale images, since filters like Sobel or Scharr are used mainly on grayscale images to detect edges.

### Enhanced TypeScript Support

All APIs now have strict TypeScript definitions:

```ts
ts; // Before: loose typing
const pixel = img.getPixel(x, y); // any[]

// After: strict typing
const pixel = img.getPixel(x, y); // number[] with proper channel count
```

### Method Renaming

Several methods have been renamed for consistency:

**Drawing methods**:

img.paintPolyline() → img.drawPolyline()
img.paintPolygon() → img.drawPolygon()
img.paintCircle() → img.drawCircle()

**Other methods**:

img.copy() → img.clone()
img.clearBit() → img.setBit()
img.getLocalMaxima() → img.getExtrema()
img.getChannel() → img.extractChannel()

Consistent naming follows common conventions (draw\* for rendering, clone for copying objects).

## 🆕 New Features

### `transform()` function

The `transform` function allows applying transformation matrix on the image. Which means that the image can now be translated or sheared or warped based on the matrix that the user entered. `transform()` function accepts both 2x3 and 3x3 matrices, depending on whether you want an affine transformation or a perspective one.

```ts
const matrix = getPerspectiveWarp(sourcePoints);
const warped = img.transform(matrix);
```

For more details visit our [tutorial](/docs/Tutorials/Applying transform function on images.md) on how image transformations work.

### Bicubic Interpolation

High-quality image scaling is now available with [bicubic interpolation](https://en.wikipedia.org/wiki/Bicubic_interpolation):

```ts
const resized = img.resize(800, 600, { interpolation: 'bicubic' });
```

**Use case**: In many cases it gives a better quality when scaling images, especially for photographs.

### Canny Edge Detection

[Canny Edge Detector](https://en.wikipedia.org/wiki/Canny_edge_detector.md) is an advanced edge detection filter for computer vision applications:

```ts
const edges = img.cannyEdgeDetector({
  lowThreshold: 50,
  highThreshold: 150,
});
```

**Use case**: Object detection, image segmentation, feature extraction. You can learn more about it [here](../docs/Features/Morphology/Canny Edge Detector.md).

### Prewitt filter

[Prewitt](https://en.wikipedia.org/wiki/Prewitt_operator) filter has been added to the `derivative()` filter.

```ts
const prewitt = img.derivative({ filter: 'prewitt' });
```

**Use case**: Object detection, image segmentation, feature extraction. You can learn more about it [here](../docs/Features/Morphology/Morphological Gradient.md).

### Migration from deprecated methods:

`warpingFourPoints` function has been deprecated.Now you have [`getPerspectiveWarp`](../docs/Features/Geometry/Get Perspective Warp Matrix.md) function that returns a matrix that can be applied on an image of interest in a new `transform` function.

```ts
// Before
const warped = img.warpingFourPoints(corners);

// After
const matrix = getPerspectiveWarp(corners);
const warped = img.transform(matrix);
```

**Use case**: Rectification of a perspective angle of an image. You can learn more about it [here](../docs/Features/Geometry/Get Perspective Warp Matrix.md).

# 🗑️ Removed Features

The following deprecated features have been removed:

- `countAlphaPixel()` - Use custom pixel counting with getPixel()
- `paintLabels()` - Feature was removed due to poor performance.
- `warpingFourPoints()` - Use `getPerspectiveWarp()` + `transform()`.

# 🔧 Compatibility & Requirements

- Node.js: 16+ (previously 14+)
- TypeScript: 4.5+ (if using TypeScript)

# 🚀 Getting Started

To get started with ImageJS, we recommend visiting our [\"Get started\"](../docs/Getting started.md) guide

# 📚 Resources

- [API Documentation](https://image-js.github.io/image-js-typescript/)
- [Examples and Tutorials](https://image-js-docs.pages.dev/)
- [GitHub Repository](https://github.com/image-js/image-js-typescript)

# 🤝 Contributing

We welcome contributions! The new TypeScript codebase makes it easier than ever to contribute. Check out our contributing guide to get started.

# 🙏 Acknowledgments

Special thanks to all contributors who made this release possible and to the community for their feedback and support during the development process.

Ready to upgrade? Check out our migration guide to get started with image-js-typescript today!
