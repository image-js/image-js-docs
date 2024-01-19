If you looked at some of our tutorials, you might have noticed that we apply a blurring technique before applying an actual filter like threshold or watershed. We do that in order to improve the image input by reducing the image noise and small elements that could disrupt image analysis. This tutorial will clarify which technique is used in which scenario.

## Blur

Blur or box blur is the technique that uses convolution matrix to calculate an average among the surrounding pixels which are within the transformation matrix (kernel). It is a relatively simple and fast technique for computation but it also produces worse results than the other two filters.

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

The values of the table will probably be floating numbers rather than integers but that's kind of the idea. The closer you are to the value in check, the more weight it will have during average computation.

Gaussian blur is good for such process as edge detection. Edge detection's algorithms are sensitive to noise.

## Median Filter

Median filter is used differently from blurs. The obvious difference is the fact that median filter looks for a median value in the area, rather than the average like blur does.
It is
