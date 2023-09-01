import InvertDemo from './invert.demo.tsx'

[Check options and parameters of invert method](https://image-js.github.io/image-js-typescript/classes/Image.html#invert 'github.io link')

[The invert filter](<https://en.wikipedia.org/wiki/Negative_(photography)> 'wikipedia link on negative filtering') is an image processing technique used to reverse the color values of an image, creating a negative or "inverted" version of the original. In this process, the darkest areas become the lightest, and the lightest areas become the darkest, while the midtones are adjusted accordingly. The invert filter is a simple but effective way to create visual contrast and produce interesting effects.

<InvertDemo />

### Parameters and default values

- `options`

#### Options

| Option                                                                                    | Default value |
| ----------------------------------------------------------------------------------------- | ------------- |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/InvertOptions.html#out) | -             |

<details>
<summary><b>Implementation</b>
</summary>

Here's how the invert filter works:

_Pixel Transformation_: For each pixel in the image, the inversion filter transforms its color [intensity](../../Glossary.md#intensity 'glossary link on intensity') value. The new intensity value is calculated using the formula:

$$New Intensity = Max Intensity - Original Intensity$$

Where "_Max Intensity_" is the maximum possible intensity value for the color channel.

:::warning
ImageJS uses components to calculate each pixel value and leaves alpha channel unchanged.For more information between channels and components visit [this link](../../Tutorials%20and%20concepts/Concepts/Channel%20vs%20component.md).
:::

</details>
