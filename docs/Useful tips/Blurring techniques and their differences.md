If you looked at some of our tutorials, you might have noticed that we apply a blurring technique before applying an actual filter like threshold or watershed. We do that in order to improve the image input by reducing the image noise and small elements that could disrupt image analysis. This tutorial will clarify which technique is used in which scenario.

## Blur

Blur or box blur is the technique that uses convolution matrix to calculate an average among the surrounding pixels which are within the transformation matrix (kernel).

![Convolution process](./images/blurring/2D_Convolution_Animation.gif)

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

Gaussian blur is good for such process as edge detection. Edge detection's algorithms are sensitive to noise. For instance here is the example of a Canny Edge detector with and without gaussian blur:

![Edge detection with gaussian](./images/blurring/lennaCED.png)

## Median Filter

Median filter is used differently from blurs. The obvious difference is the fact that median filter looks for a median value in the area, rather than the average like blur does.
It is particularly effective against ["salt-and-pepper"](https://en.wikipedia.org/wiki/Salt-and-pepper_noise 'wikipedia link on salt and pepper') effect.

![Denoising with median filter](./images/blurring/tigersBlur.png)
