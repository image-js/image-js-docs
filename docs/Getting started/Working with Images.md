import ImageDemo from './image.demo.tsx'

### Images

In ImageJS an image is an object where its data is represented as a typed array of data.
Besides some obvious ones like width and height there are special properties and it is crucial to understand what they represent.

- [Image format](../Glossary.md#image-format 'internal link on glossary'): file format. Depending on it, image properties like bit depth can look very different.

- [Color model](../Glossary.md#color-model 'internal link on glossary'): the abstract model of how pixel colors are formed.

- [Bit depth](../Glossary.md#bit-depth 'internal link on glossary'): number of bits allocated to each channel.

- [Number of channels/components](../Glossary.md#channel 'internal link on glossary'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

- Currently ImageJS supports images with these characteristics:

|                                | TIFF                       | JPEG                   | PNG               |
| ------------------------------ | -------------------------- | ---------------------- | ----------------- |
| Bits per channel               | 8 or 16 bits               | 8 bits                 | 8 or 16 bits      |
| Bits per Alpha                 | 8 or 16 bits               | no                     | 8 or 16 bits      |
| Compression                    | yes/no(may be destructive) | no(may be destructive) | yes               |
| Color Model                    | RGB and grayscale          | RGB and grayscale      | RGB and grayscale |
| Can be imported in this format | &#9989;                    | &#9989;                | &#9989;           |
| Can be saved in this format    | &#10060;                   | &#9989;                | &#9989;           |

There are several types of features that image can use:

- [Filtering](../Features/Filters/Filters.md 'internal link on filters'): filters usually apply some sort of [kernel](../Glossary.md#kernel 'internal link on kernel') to change an image.

- [Comparison](../Features/Comparison/Comparison.md 'internal link on comparison'): these features compare two images for further feature matching between the two.

- [Geometry](../Features/Geometry/Geometry.md 'internal link on geometry'): this part of ImageJS allows rotating and resizing an image.

- [Morphology](../Features/Morphology/Morphology.md 'internal link on morphology'): enables shape analysis and shape identification.

For instance, as was shown an image can be
:::caution
**Image coordinate plane should be here(will be done in another PR)**
:::

<ImageDemo />

Image can also be converted to mask through [`threshold()`](../Features/Operations/Threshold.md 'internal link on threshold') method. It will allow deeper analysis of image and enable analysis of its regions of interest.
