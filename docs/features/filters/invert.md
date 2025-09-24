---
sidebar_position: 10
---

import InvertDemo from './demos/invert.demo.tsx'

# Invert

_Reverses the colors of an image, transforming dark areas into light and vice versa._

[🖼️ Image options and parameters of `invert` method](https://api.image-js.org/classes/index.Image.html#invert)  
[🎭 Mask options and parameters of `invert` method](https://api.image-js.org/classes/index.Mask.html#invert)

[Invert filter](<https://en.wikipedia.org/wiki/Negative_(photography)> 'wikipedia link on negative filtering') is an image processing technique used to reverse the color values of an image, creating a negative or "inverted" version of the original. In this process, the darkest areas become the lightest, and the lightest areas become the darkest, while the midtones are adjusted accordingly. The invert filter is a simple but effective way to create visual contrast and produce interesting effects.

### Applying invert filter on Images

<InvertDemo />

### Parameters and default values

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[1,8,16]`      |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

:::info
Parameters and options for Images and Masks are the same.
:::

- `options`

#### Options

| Property                                                                  | Required | Default value |
| ------------------------------------------------------------------------- | -------- | ------------- |
| [`out`](https://api.image-js.org/interfaces/index.InvertOptions.html#out) | no       | -             |

:::info
The method is also available for Masks.
:::

<details>
<summary><b>Implementation</b></summary>

Here's how invert filter is implemented in ImageJS:

_Pixel Transformation_: For each pixel in the image, the inversion filter transforms its color [intensity](../../glossary.md#intensity 'glossary link on intensity') value. The new intensity value is calculated using the formula:

$$New Intensity = Max Intensity - Original Intensity$$

Where $$Max Intensity$$ is the maximum possible intensity value for the color channel.

:::warning
ImageJS uses components to calculate each pixel value and leaves alpha channel unchanged.
:::

</details>
