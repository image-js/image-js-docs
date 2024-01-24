import ImageDemo from './image.demo.tsx'

<!-- TODO add analysis section once it is merged -->

### What is an Image?

In the context of digital technology and computing, images are represented as a grid of pixels, with each pixel containing information about color and intensity.

<ImageDemo />

### Types of images supported by ImagesJS

- Currently ImageJS supports images with these characteristics:

|                                  | TIFF                       | JPEG                   | PNG               |
| -------------------------------- | -------------------------- | ---------------------- | ----------------- |
| **Bits per channel**             | 8 or 16 bits               | 8 bits                 | 8 or 16 bits      |
| **Bits per Alpha**               | 8 or 16 bits               | N/A                    | 8 or 16 bits      |
| **Compression**                  | yes/no(may be destructive) | no(may be destructive) | yes               |
| **Color Model**                  | RGB and grayscale          | RGB and grayscale      | RGB and grayscale |
| **Can be loaded in this format** | &#9989;                    | &#9989;                | &#9989;           |
| **Can be saved in this format**  | &#10060;                   | &#9989;                | &#9989;           |

### Properties

In ImageJS main properties of an image are:

- width

- height

- data: typed array with information about image's pixels.

- [Color model](../Glossary.md#color-model 'internal link on glossary'): the abstract model of how pixel colors are formed.

- [Bit depth](../Glossary.md#bit-depth 'internal link on glossary'): number of bits allocated to each channel.

- [Number of channels/components](../Glossary.md#channel 'internal link on glossary'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

- [Metadata](../Glossary.md#metadata 'internal link on metadata'): data about data. A basic example would be date and time when an image was taken

The former ones matter most in features that involve two images, like [hypotenuse method](../Features/Comparison/Hypotenuse.md 'internal link on hypotenuse') or [subtraction method](../Features/Comparison/Subtraction.md 'internal link on subtraction method'). It simply will not work if images are not compatible by bit depth, color model or size.

### Features

Currently, there are several ways of processing an image:

- [Filtering](../Features/Filters/Filters.md 'internal link on filters'): filters usually apply some sort of [kernel](../Glossary.md#kernel 'internal link on kernel') to change an image.

- [Comparison](../Features/Comparison/Comparison.md 'internal link on comparison'): these features compare two images for further feature matching between the two.

- [Geometry](../Features/Geometry/Geometry.md 'internal link on geometry'): this part of ImageJS allows rotating and resizing an image.

- [Morphology](../Features/Morphology/Morphology.md 'internal link on morphology'): enables shape analysis and shape identification.
