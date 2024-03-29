---
sidebar_position: 100
---

### Alpha channel

[An alpha channel](https://en.wikipedia.org/wiki/Alpha_compositing 'wikipedia link on alpha channel') is a supplementary channel used to store and represent information about the transparency or opacity of each pixel. It is commonly associated with color images, and it allows for the creation of images with varying levels of transparency or translucency, which is essential for various graphic design, visual effects, and image composition tasks.

### Bit depth

[Bit depth](https://en.wikipedia.org/wiki/Color_depth 'wikipedia link on bit depth'), also known as color depth or pixel depth, refers to the number of bits used to represent the color of each pixel in a digital image. Bit depth directly impacts the number of colors or shades of gray that can be displayed in an image. A higher bit depth allows for a greater range of colors, resulting in more detailed and accurate representations, while a lower bit depth limits the color variations.

### Channel

[A channel](<https://en.wikipedia.org/wiki/Channel_(digital_image)> 'wikipedia link on color channel') refers to one of the separate grayscale or color components that together make up the complete image. Channels are a fundamental concept in image processing and manipulation, especially in color images, where each channel represents a primary color or a specific property of the pixel.The most common color spaces used in images are RGB (Red, Green, Blue) and CMYK (Cyan, Magenta, Yellow, Black).

### Color model

[A color model](https://en.wikipedia.org/wiki/Color_model#Additive_and_subtractive_color_models 'wikipedia link on color model') also known as a color space or color system, is a way to represent and describe colors in a systematic and mathematical manner. These models are essential in various fields, including computer graphics, imaging, design, and color reproduction. Different color models serve different purposes and are used for specific applications. Some of the most commonly used color models include RGB(Red Green Blue) and CMYK(Cyan Magenta Hue Key).

### Component

A component typically refers to a distinct and identifiable part or element within an image. In ImageJS, however, component represents the number of color [channels](#channel 'anchor on channel') in the image, excluding [the alpha channel](#alpha-channel 'anchor to alpha-channel').
A grey image has 1 component. An RGB image has 3 components.

### Convolution

[Convolution](https://en.wikipedia.org/wiki/Convolution 'wikipedia link on convolution') is a mathematical operation that is widely used in various fields, including image processing, signal processing, and mathematics itself. In the context of image processing, convolution involves sliding a small matrix (filter, kernel, or mask) over an input image and calculating a new value for each pixel by performing a mathematical operation between the values in the filter and the corresponding pixel neighborhood in the image. It is used for tasks such as blurring, sharpening, edge detection, and more.

### Hysteresis

Hysteresis thresholding is a technique used in image processing, particularly in the context of edge detection, to distinguish between strong and weak edges in an image. It is commonly used in edge detection algorithms like the Canny edge detector to improve the detection of continuous edges in noisy images.
The function takes two binary images that have been thresholded at different levels. The higher threshold has a smaller population of white pixels. The values in the higher threshold are
more likely to be real edges. In hysteresis, if a value in the larger population is connected to a point in the smaller population, we can assume it is a real edge and add it to
hysteresis image.

### Image format

[Image format](https://en.wikipedia.org/wiki/Image_file_format 'wikipedia link on image format') also known as a file format, is a standardized way of encoding and storing digital images. Image formats define how image data is organized, compressed, and represented in a computer file. Different image formats are designed for specific purposes and offer various features, including compression, quality, and support for different types of content.

### Image noise

[Image noise](https://en.wikipedia.org/wiki/Image_noise 'wikipedia link on image noise') refers to random variations in pixel values within an image, which can lead to unwanted visual artifacts and reduced image quality. It is often caused by various factors during image acquisition, transmission, or processing. Image noise can obscure details, reduce contrast, and make it harder to extract meaningful information from an image.

### Image segmentation

[Image segmentation](https://en.wikipedia.org/wiki/Image_segmentation 'wikipedia link on image segmentation') is a technique that divides an image into multiple regions or parts. The goal of segmentation is to simplify and/or change the representation of an image into more meaningful and easier-to-analyze parts. Each region typically corresponds to objects or meaningful areas within the image, such as distinct shapes, colors, or textures.

### Intensity

[Intensity](https://en.wikipedia.org/wiki/Color_histogram 'wikipedia link on histogram') refers to the brightness or darkness of a pixel or region within an image. It quantifies the amount of light or energy that a pixel or area emits, reflects, or transmits. Intensity values are typically represented numerically and can be single-channel (grayscale) or multi-channel (color) depending on whether the image is grayscale or color.

_In a grayscale image_:

Each pixel has a single intensity value. The range of possible values depends on the bit depth. For example, in 8-bit image it ranges from 0 (black) to 255 (white). Higher values represent brighter areas.

_In a color image_:

As in grayscale images intensity value depends on image's bit depth.
However, the difference is that each pixel consists of intensity values for different color channels.
Each color channel typically has an intensity value ranging from 0 (no contribution of that color) to maximal value (maximum contribution of that color). In an RGB image, these channels are red, green, and blue. Therefore in 8-bit RGB image, black-colored pixel would have intensity value of 0 for all three channels, while white-colored pixel channels would have value of 255.

### Kernel

A [Kernel](<https://en.wikipedia.org/wiki/Kernel_(image_processing)> 'wikipedia link on kernel') is a small matrix of numerical values that is used to perform operations such as convolution on an image. Kernels are a fundamental concept in various image processing techniques and are employed to modify, enhance, or extract specific features from an image.

### Mask(class)

Mask in imageJS is a special class of 1-bit depth,single channel images that represents binary data from the image, which means that it is a grid divided on black and white elements. It is usually used to find [regions of interest](#roiregion-of-interest 'anchor on ROI') and/or [their maps](#roi-map 'anchor on RoiMap').It can also be applied to an image in various ways like filtering, edge detection, image fusion etc.

### Metadata

[Metadata](https://en.wikipedia.org/wiki/Metadata 'wikipedia link on metadata') refers to data that provides information about other data. In a broad sense, it is "data about data." Metadata can describe various aspects of information, such as its origin, format, structure, and context. This information is typically used to facilitate the organization, management, and retrieval of data.

### Morphology

[Morphology](https://en.wikipedia.org/wiki/Mathematical_morphology 'wikipedia link on morphology') is a comprehensive set of image processing operations that process images based on shapes and/or borders of elements that images possess. It involves manipulating the geometric properties of image elements to extract meaningful information, enhance features, or remove noise. Morphological operations are often used in tasks like image filtering, object detection, image segmentation, and more.

### ROI(Region of Interest)

A Region of Interest (ROI) refers to a specific area within a space or image that is of particular interest for analysis, processing, or further investigation. In various fields such as computer vision, medical imaging, remote sensing, and more, identifying and isolating regions of interest can help in focusing computational resources and analysis efforts on the relevant parts of the data.

### Roi map

A ROI (Region of Interest) map, also known as segmentation map, is a binary image that highlights regions of interest within a larger image. It is a concept in image processing and computer vision for isolation and identification of certain objects, features, or regions for further analysis, manipulation, or processing.

### Structuring element

A structuring element is a shape or pattern used in morphological image processing operations such as dilation, erosion, opening, and closing. Unlike a kernel, a structuring element is not a matrix of numerical coefficients but rather a binary or grayscale pattern used for reshaping or modifying the overall structure of objects in an image.
