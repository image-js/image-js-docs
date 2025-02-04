# Blurring techniques and their differences

If you looked at some of our tutorials, you might have noticed that we apply a blurring technique before applying an actual filter like threshold or watershed. We do that in order to improve the image input by reducing the image noise and small elements that could disrupt image analysis. This tutorial will clarify which technique is used in which scenario.

## Blur

To be precise blur is a general term that refers to a reduction in the sharpness or clarity of an image. It also works to reduce some of the noise, such as [gaussian noise](https://en.wikipedia.org/wiki/Gaussian_noise#:~:text=In%20signal%20processing%20theory%2C%20Gaussian,can%20take%20are%20Gaussian%2Ddistributed. 'wikipedia link on gaussian noise') for example. In ImageJS blur is actually a box blur or mean blur. It is a filter that uses convolution matrix to calculate an average among the surrounding pixels which are within the transformation matrix ([kernel](../Glossary.md#kernel 'glossary link on kernel')) and then applies this value.

![Convolution process](./images/blurring/2D_Convolution_Animation.gif)

The key advantage of box blur compared to other filters is its speed. It is slightly faster than Gaussian Blur, and it doesn't need to sort all values within the cells, like median.
However, this also means that every pixel has the same weight to the algorithm regardless of its position. Therefore the blurring quality drops compared to the gaussian blur and the output gets relatively blocky.

![Difference in quality](./images/blurring/MBvsGB.png)

## Gaussian Blur

Gaussian blur also uses convolution but it applies a weighted average based on a Gaussian distribution.

The idea is that the closer you are to the pixel in check, the more weight it will have during average computation. So, if you picture kernels as graphs, it becomes obvious how gaussian blur prioritizes the center pixel:

![Box And Gaussian Blurs](./images/blurring/boxAndGaussianFunctions.png)

The main parameter of gaussian blur is called "sigma" and it is responsible for the width of the gaussian bell curve, therefore it controls the overall smoothness of the end result.

Gaussian blur is a good preparatory tool for edge detection. Edge detection's algorithms are sensitive to noise and small details so blur smoothens them. For instance here is the example of a [Canny Edge detector](../Features/Morphology/Canny%20Edge%20Detector.md 'internal link on canny edge detector') with and without gaussian blur:

![Edge detection with gaussian](./images/blurring/edgesWithBlurs.png)

## Median Filter

Median filter is used differently from blurs. The obvious difference is the fact that median filter looks for a median value in the area, rather than the average like blur does. This means that the values in the surface in check need to be sorted first, which slows the algorithm down. Median filer also needs to treat image borders differently because there are not enough entries to fill the window. But even then, among the three filters, median is the best at preserving objects' edges and details.
It is also particularly effective against ["salt-and-pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'wikipedia link on salt and pepper') effect.

![Remove noise with median filter](./images/blurring/tigersBlur.png)

## What algorithm to use?

Let's take a look at the image used in our tutorials.

![Image from tutorial](./images/blurring/imgTest.jpg)

Here we have an image of particles. The problem is that an image makes threshold to pick on some noise which is undesirable during image analysis (look at the top-right corner). These small dots become considered regions, they start disrupting collection of data, the analysis becomes troublesome etc.

![Thresholding with no blur](./images/blurring/isodataNoBlur.jpg)

To improve it, applying blur is necessary. But we don't really have preserving edges as the priority, we want to remove useless dots from our mask. So applying gaussian blur is a reasonable choice.

![Thresholding with blur](./images/blurring/isodataBlur.jpg)

It was mentioned in the tutorials, but you can get a good result with all three techniques. The question is, however, which of these three to use in what situation.

Therefore the idea is this: if an image is of good quality and you want to focus on well-defined objects, use blur or gaussian blur (if speed is not a pressing issue gaussian blur is preferable). If you need to preserve edges of the elements or if an image has noise, especially "salt-and-pepper" one, use median filter.
