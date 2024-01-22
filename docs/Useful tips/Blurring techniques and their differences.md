If you looked at some of our tutorials, you might have noticed that we apply a blurring technique before applying an actual filter like threshold or watershed. We do that in order to improve the image input by reducing the image noise and small elements that could disrupt image analysis. This tutorial will clarify which technique is used in which scenario.

## Blur

Blur or box blur is a filter that uses convolution matrix to calculate an average among the surrounding pixels which are within the transformation matrix (kernel) and then applies this value.

![Convolution process](./images/blurring/2D_Convolution_Animation.gif)

in case of mean blur the kernel will look like this:

$$
\begin{bmatrix}
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}
$$

The key advantage of box blur compared to other filters is its speed. It doesn't need to calculate gaussian matrix, based on its sigma, like Gaussian Blur, nor does it need to sort all values within the cells, like median.
However, this also means that every pixel has the same weight to the algorithm regardless of its position. This means that it's speed comes at the cost of the output quality.

## Gaussian Blur

Gaussian blur applies gaussian distribution formula to create a matrix which weighted average for convolution which means that it takes into account the position of the pixel as well. So, if box blur's convolution matrix would look like this:

$$
\begin{bmatrix}
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}
$$

Gaussian blur's matrix might look like this:

$$
\begin{bmatrix}
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1
\end{bmatrix}
$$

The values of the table will probably be floating numbers rather than integers but the idea is this: the closer you are to the pixel in check, the more weight it will have during average computation.

Gaussian blur is good for such process as edge detection. Edge detection's algorithms are sensitive to noise and small details and this filter smoothens them. For instance here is the example of a Canny Edge detector with and without gaussian blur:

![Edge detection with gaussian](./images/blurring/lennaCED.png)

## Median Filter

Median filter is used differently from blurs. The obvious difference is the fact that median filter looks for a median value in the area, rather than the average like blur does. This means that the values in the area in check need to be sorted first, which slows the algorithm down. Median filer also needs to treat image borders differently because there are not enough entries to fill the window. But even then, among the three filters, median is the best at preserving objects' edges and details.
It is particularly effective against ["salt-and-pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'wikipedia link on salt and pepper') effect.

![Denoising with median filter](./images/blurring/tigersBlur.png)

## What algorithm to use?

Even though it might look clear when to use one algorithm or the other in theory, on practice the end result might not be that obvious.
Take a look at these images.

![](./images/blurring/blurringComp.png)

You could make an argument that after taking a closer look the gaussian blur has a more "natural" blurring than a regular blur. Or that images after median filter have slightly better detailing. But these differences would not be substantial for an average user.
When it comes to image analysis, however, things are different. Let take a look at the images used in our tutorials.

It is preferable
