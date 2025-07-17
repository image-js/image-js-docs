---
slug: Release of a new version
title: Release Notes
date: 2024-01-15
authors: [maxim]
tags: [release]
---

We're excited to announce the release of image-js-typescript, a complete rewrite of the popular image-js library. This new version brings modern TypeScript support and a more intuitive API while maintaining the powerful image processing capabilities you love.

## ⚠️ API Changes

### Stricter typing

```js
// Before
const pixel = img.getPixel(x, y); // any[]

// After
const pixel = img.getPixel(x, y); // number[] with proper typing
```

### Changed the way images are loaded and created

Static method `load` for reading and writing images has been replaced with dedicated functions `read` and `write`. There are also synchronous versions of these functions.(add more explanation)

```ts
javascript; // Before
import { Image } from 'image-js';
const img = await Image.load('cat.jpg');
```

```ts
// After
import { readSync, read } from 'image-js';
const img = readSync('cat.jpg');
// or
const img = await read('cat.jpg');
```

### Distinction between Image and Mask objects

In the new version of ImageJS binary images(masks) becomes a separate class.

```ts
// Before
const mask = new Image(10, 10, { kind: 'BINARY' });
```

```ts
// After
const mask = new Mask(10, 10);
```

In previous versions binary images (masks) had 8 pixels of data stacked in one byte.The new version changes that. Now Masks' data reserves 1 byte per pixel.
It improves and facilitates data readability and editing.

### New features

- Bicubic interpolation has been added as interpolation option
- Canny Edge Detector filter has been added
- `transform` function now accepts 3x3 matrices as well as 2x3
- `warpingFourPoints` function has been deprecated and now `getPerspectiveWarp` returns a matrix that can be used in a new `transform()` function.

### Refactored functions

Several methods have been renamed. Some notable changes:

- `paint*` methods(`drawPoligon()`, `paintPolyline()` etc.) are now `draw\*` methods(`drawPolyline()`,`drawPoligon()` etc.).
- `copy()` → `clone()`
- `clearBit()` → `setBit()`,`setBitByPoint()`,`setBitByCoord()`
- `getLocalMaxima` → `getExtrema`
- `getChannel()`→`extractChannel()`

### Bug fixes

- Fixed perspectiveWarp functioning

### Removed Features

- `countAlphaPixel` was removed.
- `paintLabels` was removed.

### Configuration Changes

Default parameters: Some filter defaults have changed for better results
Color space handling: Improved but different color space conversion behavior

## 📚 Resources

[API Documentation](https://image-js.github.io/image-js-typescript/)
[Examples and Tutorials](https://image-js-docs.pages.dev/)
[GitHub Repository](https://github.com/image-js/image-js-typescript)

## 🤝 Contributing

We welcome contributions! The new TypeScript codebase makes it easier than ever to contribute. Check out our contributing guide to get started.

## 🙏 Acknowledgments

Special thanks to all contributors who made this release possible and to the community for their feedback and support during the development process.

Ready to upgrade? Check out our migration guide to get started with image-js-typescript today!
