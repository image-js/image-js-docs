---
sidebar_position: 7
---

### Alpha channel

[An alpha channel](https://en.wikipedia.org/wiki/Alpha_compositing 'wikipedia link on alpha channel') is a supplementary channel used to store and represent information about the transparency or opacity of each pixel. It is commonly associated with color images, and it allows for the creation of images with varying levels of transparency or translucency, which is essential for various graphic design, visual effects, and image composition tasks.

### Bit depth

[Bit depth](https://en.wikipedia.org/wiki/Color_depth 'wikipedia link on bit depth'), also known as color depth or pixel depth, refers to the number of bits used to represent the color of each pixel in a digital image. Bit depth directly impacts the number of colors or shades of gray that can be displayed in an image. A higher bit depth allows for a greater range of colors, resulting in more detailed and accurate representations, while a lower bit depth limits the color variations that can be shown

### Channel

[A channel](<https://en.wikipedia.org/wiki/Channel_(digital_image)> 'wikipedia link on color channel') refers to one of the separate grayscale or color components that together make up the complete image. Channels are a fundamental concept in image processing and manipulation, especially in color images, where each channel represents a primary color or a specific property of the image.The most common color spaces used in images are RGB (Red, Green, Blue) and CMYK (Cyan, Magenta, Yellow, Black).

### Component

A component typically refers to a distinct and identifiable part or element within an image. Components are crucial for tasks like object detection, segmentation, and feature extraction and are often identified and labeled using connected component analysis techniques.

### Convolution

[Convolution](https://en.wikipedia.org/wiki/Convolution 'wikipedia link on convolution') is a mathematical operation that is widely used in various fields, including image processing, signal processing, and mathematics itself. In the context of image processing, convolution is a fundamental operation used to apply filters, masks, or kernels to an image. It is used for tasks such as blurring, sharpening, edge detection, and more.

The convolution operation involves sliding a small matrix (filter, kernel, or mask) over an input image and calculating a new value for each pixel by performing a mathematical operation between the values in the filter and the corresponding pixel neighborhood in the image.

### Hysteresis

Hysteresis thresholding is a technique used in image processing, particularly in the context of edge detection, to distinguish between strong and weak edges in an image. It is commonly used in edge detection algorithms like the Canny edge detector to improve the detection of continuous edges in noisy images.
The function takes two binary images that have been thresholded at different levels. The higher threshold has a smaller population of white pixels. The values in the higher threshold are
more likely to be real edges. In hysteresis, if a value in the larger population is connected to a point in the smaller population, we can assume it is a real edge and add it to
hysteresis image.

### Image noise

[Image noise](https://en.wikipedia.org/wiki/Image_noise 'wikipedia link on image noise') refers to random variations in pixel values within an image, which can lead to unwanted visual artifacts and reduced image quality. It is often caused by various factors during image acquisition, transmission, or processing. Image noise can obscure details, reduce contrast, and make it harder to extract meaningful information from an image.

### Intensity

[Intensity](https://en.wikipedia.org/wiki/Color_histogram 'wikipedia link on histogram') refers to the brightness or darkness of a pixel or region within an image. It quantifies the amount of light or energy that a pixel or area emits, reflects, or transmits. Intensity values are typically represented numerically and can be single-channel (grayscale) or multi-channel (color) depending on whether the image is grayscale or color.

_In a grayscale image_:

Each pixel has a single intensity value that usually ranges from 0 (black) to 255 (white) in an 8-bit image. Higher values represent brighter areas.

_In a color image_:

Each pixel consists of intensity values for different color channels. In an RGB image, these channels are red, green, and blue.
Each color channel typically has an intensity value ranging from 0 (no contribution of that color) to 255 (maximum contribution of that color).

### Kernel

A [Kernel](<https://en.wikipedia.org/wiki/Kernel_(image_processing)> 'wikipedia link on kernel') is a small matrix of numerical values that is used to perform operations such as convolution on an image. Kernels are a fundamental concept in various image processing techniques and are employed to modify, enhance, or extract specific features from an image.

### Mask

A mask is a small matrix or grid of values that is used to perform various operations on an image. These operations can include filtering, convolution, blurring, sharpening, edge detection, and more. Masks are fundamental tools in image processing because they allow you to modify and enhance images by applying various mathematical operations to each pixel.

### Morphology

[Morphology](https://en.wikipedia.org/wiki/Mathematical_morphology 'wikipedia link on morphology') in image processing is a set of operations that deal with the shape and structure of objects within an image. It involves manipulating the geometric properties of image elements, such as pixels or groups of pixels, to extract meaningful information, enhance features, or remove noise. Morphological operations are often used in tasks like image filtering, object detection, image segmentation, and more.

### ROI(Region of Interest)

A Region of Interest (ROI) refers to a specific area or portion within a larger space or image that is of particular interest for analysis, processing, or further investigation. In various fields such as computer vision, medical imaging, remote sensing, and more, identifying and isolating regions of interest can help in focusing computational resources and analysis efforts on the relevant parts of the data.

### Roi map

An ROI (Region of Interest) map, also known as an ROI mask or segmentation map, is a binary image that highlights specific regions or areas of interest within a larger image. It is a concept in image processing and computer vision for isolation and identification of certain objects, features, or regions for further analysis, manipulation, or processing.
