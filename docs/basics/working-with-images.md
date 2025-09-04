# Working with Images

<!-- TODO add analysis section once it is merged -->

### What is an Image?

In the context of digital technology and computing, images are represented as a grid of pixels, with each pixel containing information about color and intensity.

### Types of images supported by ImagesJS

- Currently ImageJS supports images with these characteristics:

|                                  | TIFF             | JPEG    | PNG              | BMP      |
| -------------------------------- | ---------------- | ------- | ---------------- | -------- |
| **Bits per channel**             | 8 or 16 bits     | 8 bits  | 8 or 16 bits     | 1 bit    |
| **Alpha channel**                | yes              | no      | yes              | no       |
| **Lossy compression**            | can be either    | yes     | no               | no       |
| **Color Model**                  | RGB or grayscale | RGB     | RGB or grayscale | N/A      |
| **Can be loaded in this format** | &#9989;          | &#9989; | &#9989;          | &#10060; |
| **Can be saved in this format**  | &#10060;         | &#9989; | &#9989;          | &#9989;  |

### Image coordinates

The origin point has coordinates (0,0) and is located in the top-left corner of an image.

![Image coordinates](./images/workingWithImages/coordinatesImage.jpg)

So, if we want to get a certain pixel on the image we will be counting the distance from image's top-left corner.

```ts
//We will receive 20th row and 10th column
//from the top-left corner.
const pixel = image.getPixel(10, 20);
```

### Properties

In ImageJS main properties of an image are:

- width

- height

- data: typed array with information about image's pixels.

- [Color model](../glossary.md#color-model 'internal link on color model'): the abstract model of how pixel colors are formed.

- [Bit depth](../glossary.md#bit-depth 'internal link on bit depth'): number of bits allocated to each channel.

- [Number of channels](../glossary.md#channel 'internal link on channels'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

- [Number of components](../glossary.md#component 'internal link on components'): number of color channels that each pixel has but without alpha channel.

- [Alpha channel](../glossary.md#alpha-channel 'internal link on alpha-channel'): channel that represents the transparency or opacity levels of pixels.

- [Metadata](../glossary.md#metadata 'internal link on metadata'): data about data. A basic example would be date and time when an image was taken.

### Features

Currently, there are several ways of processing an image:

- [Filtering](../features/filters/filters.md 'internal link on filters'): filters usually apply some sort of [kernel](../glossary.md#kernel 'internal link on kernel') to change an image.

- [Comparison](../features/comparison/comparison.md 'internal link on comparison'): these features compare two images for further feature matching between the two.

- [Geometry](../features/geometry/geometry.md 'internal link on geometry'): this part of ImageJS allows rotating and resizing an image.

- [Morphology](../features/morphology/morphology.md 'internal link on morphology'): enables shape analysis and shape identification.

- [ROI analysis](../features/regions-of-interest/regions-of-interest.md 'internal link on roi analysis'): these features allow targeting and extracting relevant information from specific regions of interest.
