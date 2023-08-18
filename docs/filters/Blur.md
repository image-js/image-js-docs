import BlurDemo from './blur.demo.tsx'

[Check options and parameters of blur method](https://image-js.github.io/image-js-typescript/classes/Image.html#blur 'link on github io')

Blur or [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur 'Wikipedia link on gaussian blur') is a widely used image processing technique that smooths an image by reducing high-frequency noise and fine details while preserving the overall structure and larger features. It's named after the Gaussian function, which is a mathematical function that represents a bell-shaped curve. Gaussian blur is often applied to images before other processing steps like edge detection to improve their quality and reliability.

Here's how Gaussian blur works:

_Kernel Definition_: The core concept of Gaussian blur involves convolving the image with a Gaussian kernel, also known as a Gaussian filter or mask. This kernel is a 2D matrix of numerical values that approximates the Gaussian function. The values are arranged in a way that creates a symmetric, bell-shaped pattern around the center of the kernel.
:::info
**Grayscale Conversion**: While it's possible to apply Gaussian blur to color images by treating each color channel separately, it's common to convert the image to grayscale before blurring. This simplifies the process and ensures that color information doesn't affect the smoothing.
:::
_Convolution Operation_: The Gaussian kernel is applied to the image using a convolution operation. This involves placing the kernel's center over each pixel in the image and performing element-wise multiplication of the kernel's values with the corresponding pixel values in the neighborhood. The results of these multiplications are summed up to compute the new value for the central pixel.

_Weighted Averaging_: The Gaussian kernel values create a weighting scheme that favors pixels closer to the center of the kernel and decreases the influence of pixels farther away. This is because the Gaussian function is symmetrically distributed around its center, resulting in stronger weights for nearby pixels and weaker weights for distant ones.

_Smoothing Effect_: As the convolution operation is applied across the entire image, each pixel's value is replaced with a weighted average of its neighboring pixels' values. This process effectively reduces the intensity variations caused by noise and fine details, resulting in a smoothed version of the image.

The key idea behind Gaussian blur is that it simulates a diffusion process, where each pixel's value is influenced by the values of its neighbors. Because the weights are determined by the Gaussian function, pixels that are closer to the central pixel have a larger impact on the smoothed value, while pixels that are farther away contribute less.

The size of the Gaussian kernel and the standard deviation parameter (which controls the spread of the Gaussian curve) influence the degree of smoothing. A larger kernel or a higher standard deviation will produce more pronounced smoothing, but might also result in a loss of fine details.

Gaussian blur is a foundational technique in image processing and is often used as a preprocessing step before applying other operations like edge detection or feature extraction. It strikes a balance between noise reduction and preserving the important structures within an image.

<BlurDemo />
