If you looked at some of our tutorials, you might have noticed that we apply a blurring technique before applying an actual filter like threshold or watershed. We do that in order to improve the image input by reducing the image noise and small elements that could disrupt image analysis. This tutorial will clarify which technique is used in which scenario.

## Blur

Blur or box blur is the technique that uses convolution matrix to calculate an average among the surrounding pixels which are within the kernel. It is a relatively simple and fast technique for computation but it also produces worse results.

## Median Filter

Median filter is used differently from blurs.
It is

## Gaussian Blur

Gaussian blur uses a weighted average for convolution which means that
