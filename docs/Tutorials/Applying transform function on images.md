## Synopsis

Image transformations are fundamental operations in computer graphics and image processing that allow you to manipulate the position, size, shape, and perspective of images. This tutorial covers both affine and projective transformations, providing practical examples and clear explanations of how each parameter affects your image.

![Affine transformations](./images/transformations/affine-transform.gif);

## Understanding Transformation Types

In this tutorial, we distinguish between two primary types of transformations:

### Affine Transformations

- **Preserve**: Collinearity and ratios of distances
- **Properties**: Parallel lines remain parallel, straight lines remain straight
- **Use cases**: Scaling, rotation, translation, shearing
- **Matrix size**: 2×3 (the bottom row [0, 0, 1] is implied)

### Projective Transformations

- **Preserve**: Only collinearity (straight lines remain straight)
- **Properties**: Parallel lines may converge, creates perspective effects
- **Use cases**: Perspective correction, 3D projections, keystone correction
- **Matrix size**: 3×3 (full matrix required)
- **The key difference**: affine transformations might stretch, rotate, or shift a rectangle, but parallel lines remain parallel. Projective transformations can make a rectangle appear tilted or receding into the distance, with parallel lines converging to vanishing points.

## The Transformation Matrix

We use this 3×3 matrix throughout the tutorial:

$$
\begin{bmatrix}
a & b & c\\
d & e & f \\
g & h & i
\end{bmatrix}
$$

Each parameter controls specific aspects of the transformation:

- `a`, `e`: Scaling (horizontal and vertical)
- `b`, `d`: Shearing and rotation
- `c`, `f`: Translation (horizontal and vertical)
- `g`, `h`: Perspective distortion
- `i`: Normalization factor (usually 1)

## Getting Started

First, let's load an image:

```ts
import { readSync } from 'image-processing-library';

const image = readSync('/path/to/image.png');
```

## Affine Transformations

### Scaling

Scaling changes the size of your image. Parameters a and e control horizontal and vertical scaling respectively.

```ts
// Scale image by factor of 2 (Maintaining Aspect Ratio)
const transformationMatrix = [
  [2, 0, 0], // a=2 (horizontal scale), b=0, c=0
  [0, 2, 0], // d=0, e=2 (vertical scale), f=0
];

const scaledImage = image.transform(transformationMatrix);
```

![Scaled image](./images/transformations/lennaScaled.png)

### Non-uniform Scaling

```ts
// Stretch horizontally by 3x, compress vertically by 0.5x
const transformationMatrix = [
  [3, 0, 0], // Horizontal stretch
  [0, 0.5, 0], // Vertical compression
];

const stretchedImage = image.transform(transformationMatrix);
```

![Stretched image](./images/transformations/lennaStretched.png)

#### Common Scaling Examples

```ts
// Shrink to half size
const shrinkMatrix = [
  [0.5, 0, 0],
  [0, 0.5, 0],
];
```

![Shrunk image](./images/transformations/lennaShrunk.png)

```ts
// Mirror horizontally (flip left-right)
const mirrorMatrix = [
  [-1, 0, 0],
  [0, 1, 0],
];
```

![Mirrored image](./images/transformations/lennaMirrorred.png)

```ts
// Mirror vertically (flip up-down)
const flipMatrix = [
  [1, 0, 0],
  [0, -1, 0],
];
```

![Flipped image](./images/transformations/lennaFlipped.png)

### Translation

Translation moves your image to a different position. Parameters `c` and `f` control horizontal and vertical movement.

```ts
// Move image 50 pixels right and 30 pixels down
const translationMatrix = [
  [1, 0, 50], // c=50 (move right)
  [0, 1, 30], // f=30 (move down)
];

const translatedImage = image.transform(translationMatrix);
```

![Translated image](./images/transformations/lennaTranslated.png)

### Rotation

Rotation transforms your image around a point (typically the origin). It uses a combination of parameters `a`, `b`, `d`, and `e`.

For rotation by angle θ (in radians):

- `a` = cos(θ)
- `b` = -sin(θ)
- `d` = sin(θ)
- `e` = cos(θ)

```ts
// Rotate 45 degrees clockwise
const angle = Math.PI / 4; // 45 degrees in radians
const rotationMatrix = [
  [Math.cos(angle), -Math.sin(angle), 0],
  [Math.sin(angle), Math.cos(angle), 0],
];

const rotatedImage = image.transform(rotationMatrix);
```

![Rotated image](./images/transformations/lennaRotated.png)

### Rotation Around Image Center

To rotate around the image center instead of the origin, combine translation with rotation:

```ts
const angle = Math.PI / 4; //45 degrees
const [centerX, centerY] = image.getCoordinates('center');

const cos = Math.cos(angle);
const sin = Math.sin(angle);

// Translate to origin, rotate, translate back
const matrix = [
  [cos, -sin, centerX * (1 - cos) + centerY * sin],
  [sin, cos, centerY * (1 - cos) - centerX * sin],
];

return image.transform(matrix);
```

:::note
Image-js has functions `rotate()` and `transformRotate()`. `rotate()` function allows rotating an image by multiple of 90 degrees.
`transformRotate()` allows rotating an image by any degree. It also allows choosing the axe of rotation. So, for rotation, you have other functions that allow you to perform it.
Current tutorial just demonstrates the basic principle behind transformation of such kind.
:::

![Rotated by center image](./images/transformations/lennaRotatedCenter.png)

### Shearing

Shearing skews the image, making rectangles appear as parallelograms. Parameters b and d control shearing.

```ts
// Horizontal shear - lean the image to the right
const horizontalShearMatrix = [
  [1, 0.5, 0], // b=0.5 creates horizontal shear
  [0, 1, 0],
];
```

![Horizontally sheared image](./images/transformations/lennaHorizontalShear.png)

```ts
// Vertical shear - lean the image upward
const verticalShearMatrix = [
  [1, 0, 0],
  [0.3, 1, 0], // d=0.3 creates vertical shear
];
```

![Vertically sheared image](./images/transformations/lennaVerticalShear.png)

```ts
// Combined shearing
const combinedShearMatrix = [
  [1, 0.5, 0], // Horizontal shear
  [0.3, 1, 0], // Vertical shear
];
```

![Combined shearing](./images/transformations/lennaCombinedShear.png)

### Complex Affine Transformations

You can combine multiple transformations by multiplying matrices or applying them sequentially:

```ts
// Scale, rotate, and translate in one transformation
const angle = Math.PI / 4;
const scale = 1.5;
const translateX = 100;
const translateY = 50;

const complexMatrix = [
  [scale * Math.cos(angle), -scale * Math.sin(angle), translateX],
  [scale * Math.sin(angle), scale * Math.cos(angle), translateY],
];

const complexTransform = image.transform(complexMatrix);
```

## Projective Transformations

Projective transformations use the full 3×3 matrix, including the bottom row parameters `g`, `h`, and `i`. These create perspective effects and can map rectangular images onto quadrilaterals.

### Understanding Perspective Parameters

`g`, `h`: Control perspective distortion
`i`: Normalization factor (typically 1)

```ts
// Simple perspective transformation
const perspectiveMatrix = [
  [1, 0, 0], // Standard scaling and translation
  [0, 1, 0],
  [0.001, 0, 1], // g=0.001 creates horizontal perspective
];

const perspectiveImage = image.transform(perspectiveMatrix);
```

### Four-Point Mapping

The most common use of projective transformation is mapping an image to fit within four corner points:

```ts
// Define source corners (original image corners)
const sourcePoints = [
  [0, 0], // Top-left
  [image.width, 0], // Top-right
  [image.width, image.height], // Bottom-right
  [0, image.height], // Bottom-left
];

// Define destination corners (where you want them to appear)
const destPoints = [
  [50, 100], // Top-left moved
  [300, 80], // Top-right
  [320, 250], // Bottom-right
  [30, 280], // Bottom-left
];

// Get transformation matrix using 4 points
const projectionMatrix = getPerspectiveWarp(sourcePoints);
const projectedImage = image.transform(projectionMatrix);
```

### Keystone Correction

Correcting perspective distortion (like photographing a screen at an angle):

```ts
// Correct keystone effect - make trapezoid into rectangle
const keystoneMatrix = [
  [1.2, 0.1, -50],
  [0.05, 1.1, -20],
  [0.0002, 0.0001, 1],
];

const correctedImage = image.transform(keystoneMatrix);
```

## Practical Examples and Use Cases

### Creating Thumbnails with Proper Aspect Ratio

```ts
function createThumbnail(image, maxWidth, maxHeight) {
  const scaleX = maxWidth / image.width;
  const scaleY = maxHeight / image.height;
  const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

  const thumbnailMatrix = [
    [scale, 0, 0],
    [0, scale, 0],
  ];

  return image.transform(thumbnailMatrix);
}
```

### Photo Straightening

```ts
function straightenPhoto(image, angleDegrees) {
const angle = (angleDegrees \* Math.PI) / 180;
const centerX = image.width / 2;
const centerY = image.height / 2;

const cos = Math.cos(-angle); // Negative for correction
const sin = Math.sin(-angle);

const matrix = [
[cos, -sin, centerX * (1 - cos) + centerY * sin],
[sin, cos, centerY * (1 - cos) - centerX * sin],
];

return image.transform(matrix);
}
```

### Document Scanning Perspective Correction

```ts
function correctDocumentPerspective(image, corners) {
  // corners should be [topLeft, topRight, bottomRight, bottomLeft]
  const [tl, tr, br, bl] = corners;

  const matrix = getPerspectiveWarp(corners{});
  return image.transform(matrix);
}
```
