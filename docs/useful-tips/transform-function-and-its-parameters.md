# `transform()` and its parameters

We have discussed how `transform()` can be applied
`transform()` represents a fundamental operation of image processing, so it would be nice to
talk a bit more in depth about its parameters and what other capabilities this function has.

### Parameters:

`transform()` needs several parameters for it to work:

- image to transform
- transformation matrix
- and options

### Options

#### Width and Height

`width` and `height` just represent dimensions of the destination image. If these values are not specified, they will be equal to source image's.

#### Interpolation Type

Now, let's talk about `interpolationType`. To understand interpolation, imagine you're scaling an image up by 2x. The new image has 4 times as many pixels, but where do the "in-between" pixel values come from? Interpolation algorithms calculate these new pixel values based on surrounding original pixels.
Available interpolation types:

`nearest` - Uses the value of the nearest pixel (fastest, preserves sharp edges).

`bilinear` - Linear interpolation between 4 nearest pixels (smooth gradients).

`bicubic` - Cubic interpolation using 16 nearest pixels (smoothest, best quality).

:::warning
You might be thinking that `bicubic` will be always the way to go since it should transfer the most details from the source. However, that's not always the case.
Let's take a look at this simple 10x10 image (image was enlarged here for display purposes):

![](./images/transform-parameters/test.png)

And now let's enlarge the image by a factor of 10 using different interpolations:

```ts
const resizeMatrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const newImage = image.transform(resizeMatrix, {
  fullImage: true,
  interpolationType: 'nearest',
});
const newImage2 = image.transform(resizeMatrix, {
  fullImage: true,
  interpolationType: 'bilinear',
});
const newImage3 = image.transform(resizeMatrix, {
  fullImage: true,
  interpolationType: 'bicubic',
});
```

And see the results:

![Interpolations](images/transform-parameters/interpolations.svg)

As you can see, sometimes, `nearest` can be a better choice for interpolation algorithm, because it handles abrupt color changes better.
:::

#### Border Type

To understand what `borderType` is, we need to get back to interpolation for a moment. When you transform an image (rotate, scale, skew, etc.), the new pixel positions often map to coordinates in the original image that don't exist - for example, negative coordinates or coordinates beyond the image edges. The `borderType tells the algorithm how to handle these "out-of-bounds" pixels. There are several approaches:

CONSTANT `constant` - Fill border areas with a constant color value (specified by [`borderValue`](./transform-function-and-its-parameters.md#border-value))

REFLECT `reflect` - Mirror the edge pixels: [1,2,3,4] → [2,1,1,2,3,4,4,3]

REFLECT101 `reflect101` - Mirror without repeating edge pixels: [1,2,3,4] → [3,2,1,2,3,4,3,2]

REPLICATE `replicate` - Extend edge pixels: [1,2,3,4] → [1,1,1,2,3,4,4,4]

WRAP `wrap` - Wrap around to opposite edge: [1,2,3,4] → [3,4,1,2,3,4,1,2]

```ts
const result = image.transform(matrix, {
  borderType: 'reflect101', // Good default for most transformations
});
```

!["Border types"](./images/transform-parameters/borderTypes.svg)

#### Border Value

`borderValue` is used when `borderType` is set to `constant`. It specifies the pixel value to use for out-of-bounds pixels. The value should be a number that will be the same for all channels of the pixel in question.

```ts
const result = image.transform(matrix, {
  borderType: 'constant',
  borderValue: 255, // White border
});
```

#### Inverse

We have briefly shown how this option is used in our tutorial on image transformations. Let's take a deeper look at what this option represents.
As mentioned in the tutorial, the transformation process applies the transformation matrix to each pixel coordinate. However, there are two ways to think about transformations:

- **Forward mapping** (inverse: false): Apply the matrix directly to source coordinates to find destination coordinates.
- **Backward mapping** (inverse: true): For each destination pixel, apply the inverse matrix to find which source pixel to sample from.

Backward mapping is generally preferred because it guarantees every destination pixel gets a value and avoids holes in the output image.

```ts
// Most common usage - backward mapping
const result = image.transform(matrix, {
  inverse: true, // Default and recommended
});

const result2 = image.transform(matrix, {
  inverse: false, // Use only for special cases
});
```

#### Full Image

`fullImage` ensures that the output image is large enough to contain all transformed pixels from the source image, preventing any cropping. When true, the function automatically calculates the required output dimensions.

```ts
//Without fullImage - may crop transformed pixels
const result1 = image.transform(rotationMatrix, {
  fullImage: false,
});

// With fullImage - automatically sizes output to fit all pixels
const result2 = image.transform(rotationMatrix, {
  fullImage: true, // Output dimensions calculated automatically
});
```

This is particularly useful for rotations, where corners of the image may extend beyond the original boundaries.
