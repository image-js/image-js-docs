### Images

Images are basically a graphic depiction of something. In ImageJS it is an object where image data is represented as a typed array of data.
Besides some obvious ones like width and height there are special properties and it is crucial to understand what some of these properties are.

- [Color model](../Glossary.md#color-model 'internal link on glossary'): the abstract model o how pixel colors are formed.

- [Bit depth](../Glossary.md#bit-depth 'internal link on glossary'): number of bits allocated to each channel.

- [Number of channels/components](../Glossary.md#channel 'internal link on glossary'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

- Currently ImageJS supports images with these characteristics:

|                  | TIFF                       | GIF   | JPEG            | PNG          |
| ---------------- | -------------------------- | ----- | --------------- | ------------ |
| Bits per channel | 8,16                       | 8     | 8               | 8,16         |
| Bits per Alpha   | N/A                        | 1 bit | N/A             | 8 or 16 bits |
| Compression      | yes/no(may be destructive) | no    | no(destructive) | yes          |

There are several types of features that image can use:

- Filtering: filters usually apply some sort of [kernel](../Glossary.md#kernel 'internal link on kernel') to change an image.

- Comparison: these features compare two images and see the difference

- Geometry: this part of ImageJS allows rotating and resizing an image.

- Morphology: allows
