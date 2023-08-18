import MedianDemo from './median.demo.tsx'

[Check options and parameters of median method](https://image-js.github.io/image-js-typescript/classes/Image.html#medianFilter 'github.io link')

A median filter is a digital image processing technique used to reduce noise in an image by replacing each pixel's value with the median value of neighboring pixels. It's particularly effective at removing ["salt and pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'Wikipedia link on salt and pepper effect') noise, which appears as randomly scattered bright and dark pixels in an image. The median filter helps preserve the edges and details of an image while effectively removing the noise.

Here's how a median filter works:

Window or Kernel Selection: The first step is to choose a small window or kernel. This window will move over the entire image, pixel by pixel. Common window sizes are 3x3, 5x5, or 7x7, but the size depends on the level of noise and the desired amount of smoothing.

_Pixel Neighborhood_: As the window moves over the image, for each pixel location, the filter collects the pixel values within the window's neighborhood. The neighborhood consists of the pixels that are currently covered by the window.

_Median Calculation_: The collected pixel values within the neighborhood are then sorted in ascending order. The median value is the middle value in this sorted list. If the number of values is odd, the median is the value right in the center. If the number of values is even, the median is the average of the two middle values.

_Median Replacement_: After calculating the median value, the filter replaces the original pixel value with this median value. This process is repeated for every pixel in the image, as the window moves over the entire image.

The key advantage of using the median filter, especially for noise reduction, is that it is less sensitive to extreme values or outliers compared to other filters like the mean filter. Since noise often appears as isolated bright or dark pixels that deviate significantly from their neighbors, the median filter effectively ignores these outliers and replaces them with more representative values from the local neighborhood.

However, the median filter also has limitations. It can blur sharp edges and thin lines in the image, as it doesn't consider the spatial relationship between pixels beyond their intensity values. This means that while it's great for removing noise, it might not be suitable for all types of image enhancement tasks.

In summary, a median filter is an effective tool for reducing noise in images, particularly salt and pepper noise, while preserving the image's overall structure and details.

<MedianDemo />
