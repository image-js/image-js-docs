import ImageDemo from './image.demo.tsx'

### What is an Image?

In the context of digital technology and computing, images are often represented as a grid of pixels, with each pixel containing information about color and intensity.

### Types of images supported by ImagesJS

- Currently ImageJS supports images with these characteristics:

|                                  | TIFF                       | JPEG                   | PNG               |
| -------------------------------- | -------------------------- | ---------------------- | ----------------- |
| **Bits per channel**             | 8 or 16 bits               | 8 bits                 | 8 or 16 bits      |
| **Bits per Alpha**               | 8 or 16 bits               | no                     | 8 or 16 bits      |
| **Compression**                  | yes/no(may be destructive) | no(may be destructive) | yes               |
| **Color Model**                  | RGB and grayscale          | RGB and grayscale      | RGB and grayscale |
| **Can be loaded in this format** | &#9989;                    | &#9989;                | &#9989;           |
| **Can be saved in this format**  | &#10060;                   | &#9989;                | &#9989;           |

### Properties and features

In ImageJS an image is an object where its data is represented as a typed array.
There are properties that a user should pay attention to and it is crucial to understand what they represent.

- Size : in ImageJS it is calculated through a multiplication of width and height.

- [Image format](../Glossary.md#image-format 'internal link on glossary'): file format. Depending on it, image properties like bit depth can look very different.

- [Color model](../Glossary.md#color-model 'internal link on glossary'): the abstract model of how pixel colors are formed.

- [Bit depth](../Glossary.md#bit-depth 'internal link on glossary'): number of bits allocated to each channel.

- [Number of channels/components](../Glossary.md#channel 'internal link on glossary'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

  These properties matter most in features that involve two images, like [Hypotenuse method](../Features/Comparison/Hypotenuse.md 'internal link on hypotenuse') or [Subtraction method](../Features/Comparison/Subtraction.md 'internal link on subtraction method'). It simply will not work if images don't have the same bit depth, color model or size.

  Currently, here are several types of features that image can use:

- [Filtering](../Features/Filters/Filters.md 'internal link on filters'): filters usually apply some sort of [kernel](../Glossary.md#kernel 'internal link on kernel') to change an image.

- [Comparison](../Features/Comparison/Comparison.md 'internal link on comparison'): these features compare two images for further feature matching between the two.

- [Geometry](../Features/Geometry/Geometry.md 'internal link on geometry'): this part of ImageJS allows rotating and resizing an image.

- [Morphology](../Features/Morphology/Morphology.md 'internal link on morphology'): enables shape analysis and shape identification.

:::caution
**Image coordinate plane should be here(will be done in another PR)**
:::

Presented features can be used to alter image in aesthetical way as well as to analyze its contents to distinguish shapes or match features. For instance, this demonstration shows how an [`invert` filter](../Features/Filters/Invert.md 'internal link on invert filter') is applied on image.

<ImageDemo />
