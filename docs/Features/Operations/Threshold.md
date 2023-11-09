import ThresholdDemo from './demos/threshold.demo.tsx'

_Grayscale image into a binary image by setting a specific threshold value or algorithm._

[🖼️ Image options and parameters of `threshold` method](https://image-js.github.io/image-js-typescript/classes/Image.html#threshold 'github.io link')

Thresholding is a common image processing technique used to segment an image into regions based on pixel intensity values. The goal of thresholding is to separate objects or features of interest from the background or noise by setting a threshold value that divides the pixel values into two groups: those above the threshold and those below it. Thresholding is widely used for tasks like object detection, image segmentation, and feature extraction.

<ThresholdDemo />

With threshold filter there are two ways of passing options: by passing threshold coefficient manually and by calculating threshold with an algorithm.

- `options`

### Parameters and default values

#### Threshold Variant:

| Property                                                                                                          | Required | Default value |
| ----------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`threshold`](https://image-js.github.io/image-js-typescript/interfaces/ThresholdOptionsThreshold.html#threshold) | no       | -             |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/ThresholdOptionsThreshold.html#out)             | no       | -             |

#### Threshold Algorithm Variant

| Property                                                                                                          | Required | Default value |
| ----------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [`algorithm`](https://image-js.github.io/image-js-typescript/interfaces/ThresholdOptionsAlgorithm.html#algorithm) | no       | `otsu`        |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/ThresholdOptionsAlgorithm.html#out)             | no       | -             |

#### List of threshold algorithms:

- `huang`
- `intermodes`
- `isodata`
- `li`
- `maxEntropy`
- `mean`
- `mean`
- `minimum`
- `minError`
- `moments`
- [`otsu`](https://en.wikipedia.org/wiki/Otsu%27s_method "wikipedia link on otsu's method")
- `percentile`
- `renyiEntropy`
- `shanbhag`
- `triangle`
- `yen`

<details>
<summary><b>Implementation</b>
</summary>

Here's how thresholding works:

_Choose a threshold value_: This value is determined based on the characteristics of the image and the desired segmentation outcome. It can be chosen manually or automatically using various algorithms.

_Compare each pixel's intensity value with the threshold value:_ If the pixel value is greater than or equal to the threshold value, it is assigned to one group (foreground or object).
If the pixel value is less than the threshold value, it is assigned to the other group (background).

_Generate a binary image:_ The result of thresholding is a binary image(mask) where pixels belonging to the foreground are assigned a value of 1 (white) and pixels belonging to the background are assigned a value of 0 (black).

</details>
