---
sidebar_position: 1
---

import GreyDemo from './grey.demo.tsx'
import BlurDemo from './blur.demo.tsx'
import GradientDemo from './gradient.demo.tsx'
import InvertDemo from './invert.demo.tsx'
import DerivativeDemo from './derivative.demo.tsx'

# Filters

Here are presented the filters that can be applied to the image.

## Grey

A grayscale filter, often called a black-and-white filter, is an image processing technique used to convert a colored image into a grayscale version. In a grayscale image, each pixel is represented by a single intensity value, typically ranging from 0 (black) to 255 (white), with various shades of gray in between. This process removes color information and retains only the brightness information of the image.

Here's how a grayscale filter works:

Color Channel Separation: If the image is in color (composed of red, green, and blue channels), the grayscale filter typically processes each color channel separately. This is done to ensure that the brightness values are determined from the original color intensities.

Pixel Transformation: For each pixel in each color channel (red, green, and blue), a transformation is applied to calculate its grayscale intensity value. Various methods can be used to perform this transformation, and one common approach is to calculate the weighted average of the color channels' intensities:

Grayscale Intensity = (0.2989 _ Red Intensity) + (0.5870 _ Green Intensity) + (0.1140 \* Blue Intensity)

These weight values are derived from the perceived luminance of the color channels to ensure that the human eye's sensitivity to different colors is taken into account.

Intensity Clipping: After calculating the grayscale intensity, the resulting value is then assigned to all three color channels (red, green, and blue) of that pixel. This converts the pixel's color to a shade of gray. If the calculated intensity value is below 0, it is set to 0, and if it is above 255, it is set to 255 to ensure that it remains within the valid intensity range.

Reassembly: If the image was processed separately for each color channel, the transformed color channels are reassembled to create the final grayscale image.

The grayscale filter essentially eliminates the color information from the image and retains only the luminance or brightness values. This type of image is often used in situations where color is not essential for understanding or conveying the visual information. Grayscale images can emphasize the tonal contrast and structural details of a scene, making them particularly useful for tasks like analyzing textures, patterns, and lighting conditions.

In most image editing software, applying a grayscale filter is a straightforward process that involves selecting the appropriate option or tool. Grayscale images can have a timeless and classic feel, and they're also used to simplify visual information for printing, displaying on monochrome devices, or creating certain artistic effects.

<GreyDemo />

## Blur

Blur or [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur 'Wikipedia link on gaussian blur') is a widely used image processing technique that smooths an image by reducing high-frequency noise and fine details while preserving the overall structure and larger features. It's named after the Gaussian function, which is a mathematical function that represents a bell-shaped curve. Gaussian blur is often applied to images before other processing steps like edge detection to improve their quality and reliability.

Here's how Gaussian blur works:

_Kernel Definition_: The core concept of Gaussian blur involves convolving the image with a Gaussian kernel, also known as a Gaussian filter or mask. This kernel is a 2D matrix of numerical values that approximates the Gaussian function. The values are arranged in a way that creates a symmetric, bell-shaped pattern around the center of the kernel.

**Grayscale Conversion: While it's possible to apply Gaussian blur to color images by treating each color channel separately, it's common to convert the image to grayscale before blurring. This simplifies the process and ensures that color information doesn't affect the smoothing.**

_Convolution Operation_: The Gaussian kernel is applied to the image using a convolution operation. This involves placing the kernel's center over each pixel in the image and performing element-wise multiplication of the kernel's values with the corresponding pixel values in the neighborhood. The results of these multiplications are summed up to compute the new value for the central pixel.

_Weighted Averaging_: The Gaussian kernel values create a weighting scheme that favors pixels closer to the center of the kernel and decreases the influence of pixels farther away. This is because the Gaussian function is symmetrically distributed around its center, resulting in stronger weights for nearby pixels and weaker weights for distant ones.

_Smoothing Effect_: As the convolution operation is applied across the entire image, each pixel's value is replaced with a weighted average of its neighboring pixels' values. This process effectively reduces the intensity variations caused by noise and fine details, resulting in a smoothed version of the image.

The key idea behind Gaussian blur is that it simulates a diffusion process, where each pixel's value is influenced by the values of its neighbors. Because the weights are determined by the Gaussian function, pixels that are closer to the central pixel have a larger impact on the smoothed value, while pixels that are farther away contribute less.

The size of the Gaussian kernel and the standard deviation parameter (which controls the spread of the Gaussian curve) influence the degree of smoothing. A larger kernel or a higher standard deviation will produce more pronounced smoothing, but might also result in a loss of fine details.

Gaussian blur is a foundational technique in image processing and is often used as a preprocessing step before applying other operations like edge detection or feature extraction. It strikes a balance between noise reduction and preserving the important structures within an image.<BlurDemo noAutoRun />

## Median

A median filter is a digital image processing technique used to reduce noise in an image by replacing each pixel's value with the median value of neighboring pixels. It's particularly effective at removing ["salt and pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'Wikipedia link on salt and pepper effect') noise, which appears as randomly scattered bright and dark pixels in an image. The median filter helps preserve the edges and details of an image while effectively removing the noise.

Here's how a median filter works:

Window or Kernel Selection: The first step is to choose a small window or kernel. This window will move over the entire image, pixel by pixel. Common window sizes are 3x3, 5x5, or 7x7, but the size depends on the level of noise and the desired amount of smoothing.

_Pixel Neighborhood_: As the window moves over the image, for each pixel location, the filter collects the pixel values within the window's neighborhood. The neighborhood consists of the pixels that are currently covered by the window.

_Median Calculation_: The collected pixel values within the neighborhood are then sorted in ascending order. The median value is the middle value in this sorted list. If the number of values is odd, the median is the value right in the center. If the number of values is even, the median is the average of the two middle values.

_Median Replacement_: After calculating the median value, the filter replaces the original pixel value with this median value. This process is repeated for every pixel in the image, as the window moves over the entire image.

The key advantage of using the median filter, especially for noise reduction, is that it is less sensitive to extreme values or outliers compared to other filters like the mean filter. Since noise often appears as isolated bright or dark pixels that deviate significantly from their neighbors, the median filter effectively ignores these outliers and replaces them with more representative values from the local neighborhood.

However, the median filter also has limitations. It can blur sharp edges and thin lines in the image, as it doesn't consider the spatial relationship between pixels beyond their intensity values. This means that while it's great for removing noise, it might not be suitable for all types of image enhancement tasks.

In summary, a median filter is an effective tool for reducing noise in images, particularly salt and pepper noise, while preserving the image's overall structure and details.

:::info Difference between linear and non-linear algorithm filters

**Linear filters**

Linear filters, like Gaussian blur, are filters whose output is a linear function of the input. Any output value of a linear filter is the weighted mean of input values. In other words, to form one element of the output at time, it is necessary to multiply the input values for time moments adjacent to by coefficients and to sum up the products.

**Non-linear filters**

By definition, any filter that is not a linear filter is a non-linear filter, median filter is one of them. A nonlinear filter is the filter whose output is a nonlinear function of the input. One practical reason to use nonlinear filters instead of linear filters is that linear filters may be too sensitive to a small fraction of anomalously large observations at the input.In other words if the image has big difference in pixles' magnitude between pixels it is better to use non-linear filter.If the image has small difference in magnitude linear filter will suffice.
:::

## Gradient

Gradient filter or specifically[ a gradient-based edge detection filter](https://en.wikipedia.org/wiki/Graduated_neutral-density_filter 'Wikipedia link on gradient filter'), , is an image processing technique used to highlight edges and boundaries within an image by emphasizing areas of rapid intensity change. The gradient filter operates by calculating the rate of change of pixel intensities across the image. It's a fundamental step in various computer vision and image analysis tasks, such as edge detection, object recognition, and image segmentation.

Here's how a basic gradient filter works:

_Grayscale Conversion_: Before applying a gradient filter, the color image is often converted into grayscale. This simplifies the processing by reducing the image to a single channel representing pixel intensities.

_Sobel or Prewitt Operators_: Two commonly used gradient filters are the Sobel and Prewitt operators. These operators consist of two small convolution kernels—one for detecting horizontal changes and another for vertical changes. These kernels are usually 3x3 matrices of numerical weights.

_Convolution Operation_: The gradient filter is applied through a convolution operation, where the filter kernel slides over the grayscale image. At each position, the convolution operation involves element-wise multiplication of the filter kernel with the corresponding pixels in the image, followed by summing up the results. This sum represents the rate of intensity change (gradient) at that location in the image.

_Gradient Magnitude and Direction_: For each pixel, the gradient magnitude is calculated by combining the results of the horizontal and vertical convolutions. The gradient direction is also calculated, often in degrees or radians, indicating the direction of the steepest intensity change.

_Edge Detection_: The gradient magnitude values are used to identify regions of rapid intensity change, which correspond to edges in the image. Higher gradient magnitude values indicate stronger edges.

_Thresholding_: To further refine the edges detected, a thresholding step is often applied. Pixels with gradient magnitudes below a certain threshold are considered as non-edges, while those above the threshold are considered edges. This helps in reducing noise and emphasizing significant edges.

The gradient filter enhances edges by detecting abrupt changes in pixel intensities. When there's a rapid transition from one intensity level to another, the convolution operation captures this change as a high gradient magnitude value, indicating the presence of an edge.

Keep in mind that gradient filters can be sensitive to noise and might result in false edges or emphasize noise. Smoothing the image (e.g., using a Gaussian blur) before applying the gradient filter can help mitigate this issue. Moreover, more advanced techniques, like the Canny edge detector, combine gradient information with non-maximum suppression and hysteresis thresholding to produce more accurate and reliable edge detection results.

<GradientDemo />

## Derivative

<DerivativeDemo />

## Invert

The invert filter is an image processing technique used to reverse the color values of an image, creating a negative or "inverted" version of the original. In this process, the darkest areas become the lightest, and the lightest areas become the darkest, while the midtones are adjusted accordingly. The invert filter is a simple but effective way to create visual contrast and produce interesting effects.

Here's how the invert filter works:

Color Channel Conversion: If the image is in color, it is often first converted to grayscale or processed separately for each color channel (red, green, and blue) before applying the inversion. This is done to maintain the correct balance of color information while inverting the intensities.

Pixel Transformation: For each pixel in the image, the inversion filter transforms its color intensity value. The new intensity value is calculated using the formula:

New Intensity = Max Intensity - Original Intensity

Where "Max Intensity" is the maximum possible intensity value for the color channel. For an 8-bit image, this is typically 255.

Handling Clipping: In some cases, the calculated new intensity might exceed the valid intensity range (0 to 255 for an 8-bit image). To ensure that the result remains within this range, any calculated values below 0 are set to 0, and any values above 255 are set to 255. This prevents clipping and maintains a proper image representation.

Color Channels Reassembly: If the image was processed separately for each color channel, the transformed color channels are then reassembled to reconstruct the final inverted color image.

The inversion process effectively reverses the light and dark values of the image, creating a visually distinct version that often brings out details that might have been less noticeable in the original. Inverted images tend to have high contrast and can appear dramatic, as familiar objects and scenes take on a new, unfamiliar appearance.

In digital image editing software, the invert filter is usually offered as a straightforward option that can be applied with a single click. It's a quick way to create interesting visual effects or to prepare images for specific artistic or creative purposes.

<InvertDemo />

## Pixelate

[Pixelate filter](https://en.wikipedia.org/wiki/Pixelization 'Wikipedia link on pixelization concept') is a digital image processing technique used to reduce the level of detail in an image by replacing groups of pixels with a single, average color value. This creates a mosaic-like effect where the image appears to be composed of larger, blocky elements rather than fine details.

Here's how a basic pixelate filter works:

_Grid Division_: The first step is to divide the image into a grid of cells. Each cell will represent a block of pixels that will be replaced by a single color in the pixelated version.

_Color Sampling_: Within each grid cell, the filter samples the colors of the pixels contained in that cell. It calculates the average color of these pixels by averaging their red, green, and blue (RGB) color values.

_Color Replacement_: After obtaining the average color of each grid cell, the filter replaces the color of all the pixels within that cell with the calculated average color. This effectively reduces the amount of color variation within each cell, resulting in a blocky appearance.

_Blocky Appearance_: Since each grid cell now represents a larger area of the original image, the fine details are lost, and the image appears pixelated or mosaic-like.

The size of the grid cells determines the degree of pixelation. Larger grid cells create a more pronounced pixelation effect, while smaller grid cells result in a subtler effect. The pixelation effect is most noticeable in images with high levels of detail, as the reduction in detail becomes more apparent.
