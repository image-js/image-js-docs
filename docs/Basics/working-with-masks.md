import ThresholdMaskDemo from './thresholdMask.demo.tsx'
import CannyMaskDemo from './cannyEdgeMask.demo.tsx'

# Working with Masks

Masks are binary images which are used for filtering or isolating specific regions of interest within an image for processing and analysis.

### Create a Mask object

In ImageJS there are three ways of creating a mask.
First method for creating a mask is creating a Mask object. It is the easiest way, but once applied on the image, such mask will not affect it in any way, so it needs to be additionally customized by user.

```ts
const mask = new Mask(500, 500); // Creates a simple mask filled with 0s of size 500x500.
```

#### Options

| Property                                                                      | Required | Default value          |
| ----------------------------------------------------------------------------- | -------- | ---------------------- |
| [`origin`](https://api.image-js.org/interfaces/index.MaskOptions.html#origin) | no       | `{row: 0, column: 0 }` |
| [`data`](https://api.image-js.org/interfaces/index.MaskOptions.html#data)     | no       | -                      |

### Use `threshold()` method

Another approach is to obtain a mask by using [`threshold` method](../features/operations/threshold.md 'internal link on threshold') on an image.

```ts
const mask = image.threshold(); // returns a mask
```

In most cases, thresholding is your go-to method to get a mask from an image.

<ThresholdMaskDemo />

:::tip
`threshold()`method possesses different algorithms which can affect the mask output. It is better to try several of them to see which one fits your needs best. For instance the demo above uses [`'otsu'`](https://en.wikipedia.org/wiki/Otsu%27s_method 'wikipedia link on otsu') algorithm.
:::

### Use `cannyEdgeDetector()` method

There is also a third way to get a mask. It is to use [`cannyEdgeDetector` method](../features/morphology/canny-edge-detector.md 'internal link on canny edge detector').

```ts
const mask = image.cannyEdgeDetector(); // returns a mask
```

<CannyMaskDemo />

Canny Edge detection is useful when there is a need to determine edges of the elements. Elements with a change of intensity are colored white, while regions with no change are colored black.
