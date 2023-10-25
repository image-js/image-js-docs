If you are not familiar with image processing there are certain aspects that you should be aware of.
In ImageJS there are three main classes that the user will work with: Image, Mask and Region of Interest(ROI).
Here we will talk about the differences of these classes, what they are needed for and how they are applied.

### Images

Images are basically a graphic depiction of something. In ImageJS it is an object where image data is represented as a typed array of data.
Besides some obvious ones like width and height there are special properties and it is crucial to understand what some of these properties are.

- [Color model](../Glossary.md#color-model 'internal link on glossary'): the abstract model o how pixel colors are formed.

- [Bit depth](../Glossary.md#bit-depth 'internal link on glossary'): number of bits allocated to each channel.

- [Number of channels/components](../Glossary.md#channel 'internal link on glossary'): number of color channels that each pixel has. Grey image has one, RGB-type of image has three.

- Currently ImageJS supports images with these characteristics:

|                  | TIFF                       | GIF                | JPEG            | PNG          |
| ---------------- | -------------------------- | ------------------ | --------------- | ------------ |
| Bits per channel | 8,16                       | 265 indexed colors | 8               | 8,16         |
| Alpha            | N/A                        | 1 bit              | N/A             | 8 or 16 bits |
| Compression      | yes/no(may be destructive) | no                 | no(destructive) | yes          |

### Masks

Masks are binary images. This means that it is black and white, which limits its number of channels and components as well as also reduces bit depth and maximum value of the pixel.
However, Masks also serve another purpose. A mask is a binary image that specifies which pixels are to be processed or analyzed.

### Regions of Interest(ROI)

This brings us to ROI class. Regions of interest, as the name suggests, represent the regions that the user wants to analyze. ROIs are also used in data analysis to focus on particular segments of data, time intervals, or areas of interest within a larger dataset. By isolating these regions, researchers can extract relevant information and gain insights more effectively.
