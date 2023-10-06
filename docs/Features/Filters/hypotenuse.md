[Check options and parameters of hypotenuse method](https://image-js.github.io/image-js-typescript/classes/Image.html#hypotenuse 'github.io link')

:::caution
This method works only with images.
:::

A "hypotenuse filter" is using two compatible images to change values of each pixel by calculating [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance 'wikipedia link on Euclidean distance') with the formula:

$$
NewValue = \sqrt{Value1^2+Value2^2}
$$

Where $$Value1$$ is a value of the pixel in the first image and $$Value2$$ is the value in the second one. The goal is to identify which points in one image correspond to points in another image, which is essential for various computer vision and image processing applications. Calculating hypotenuse value between two pixels is necessary for image aligning, feature matching.

:::caution
Images must be compatible by size, bit depth, number of channels and number of alpha channels. However, for the resulting image the bit depth and number of channels depends on the input options.
:::

### Parameters and default values

- `otherImage`

- `options`

#### Options

| Property                                                                                                | Required | Default value    |
| ------------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| [`bitDepth`](https://image-js.github.io/image-js-typescript/interfaces/HypotenuseOptions.html#bitDepth) | no       | `image.bitDepth` |
| [`channels`](https://image-js.github.io/image-js-typescript/interfaces/HypotenuseOptions.html#channels) | no       | -                |
