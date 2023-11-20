import ThresholdMaskDemo from './thresholdMask.demo.tsx'
import CannyMaskDemo from './cannyEdgeMask.demo.tsx'

Masks are binary images which are used for filtering or isolating specific regions of interest within an image for processing and analysis.

### Create a Mask object

In ImageJS there are three ways of creating a mask.
First method for creating a mask is creating a Mask object. By default mask will be filled with 0s. It is the easiest way, but once applied on the image, such mask will not affect it in any way, so it needs to be additionally customized by user.

```ts
let mask = new Mask(<width>,<height>,<options>);
```

#### Options

| Property                                                                                      | Required | Default value          |
| --------------------------------------------------------------------------------------------- | -------- | ---------------------- |
| [`origin`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#origin) | no       | `{row: 0, column: 0 }` |
| [`data`](https://image-js.github.io/image-js-typescript/interfaces/MaskOptions.html#data)     | no       | -                      |

### Use `threshold()` method

Another approach is to obtain a mask by using [`threshold` method](../Features/Operations/Threshold.md 'internal link on threshold') on an image.

:::tip
`threshold()`method possesses different algorithms which can affect the mask output. It is better to try several of them to see which one fits your needs best.
:::

```ts
image = image.threshold(); // returns a mask
```

Although it might not perform as well on an image with complex background, in most cases, thresholding is your go-to method to get a mask from an image.

<ThresholdMaskDemo />

### Use `cannyEdgeDetector()` method

There is also a third way to get a mask. It is to use [`сannyEdgeDetector` method](../Features/Morphology/Canny%20Edge%20Detector.md).

```ts
image = image.cannyEdgeDetector(); // returns a mask
```

<CannyMaskDemo />

It is less sensitive towards changes in intensity, but it is also more complex as an algorithm than `threshold()`. Canny Edge detection is useful when there is a need to determine edges of the elements.
