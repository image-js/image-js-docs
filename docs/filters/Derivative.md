import DerivativeDemo from './derivative.demo.tsx'

[Check options and parameters of derivative filter method](https://image-js.github.io/image-js-typescript/classes/Image.html#derivativeFilter 'link on github io')

Derivative filter is a special case of a gradient filter, therefore it behaves the algorithm is similar. However, the key difference are the kernels used in this very algorithm. In ImageJS there are three distinguished kernels:

- ## [Sobel kernel](https://en.wikipedia.org/wiki/Sobel_operator 'Sobel kernel')

$KernelX = \begin{bmatrix}
-1 & 0 & 1 \\
-2 & 0 & 2 \\
-1 & 0 & 1
\end{bmatrix}$

$KernelY = \begin{bmatrix}
-1 & -2 & -1 \\
0 & 0 & 0 \\
1 & 2 & 1
\end{bmatrix}$

- ## Scharr kernel

$KernelX = \begin{bmatrix}
3 & 0 & -3 \\
10 & 0 & -10 \\
3 & 0 & -3
\end{bmatrix}$

$KernelY = \begin{bmatrix}
3 & 10 & 3 \\
0 & 0 & 0 \\
-3 & -10 & -3
\end{bmatrix}$

- ## Prewitt kernel

$KernelX = \begin{bmatrix}
1 & 0 & -1 \\
1 & 0 & -1 \\
1 & 0 & -1
\end{bmatrix}$

$KernelY = \begin{bmatrix}
1 & 1 & 1 \\
0 & 0 & 0 \\
-1 & -1 & -1
\end{bmatrix}$

<DerivativeDemo />
