---
sidebar_position: 70
---

import DerivativeDemo from './demos//derivative.demo.tsx'

# Derivative

_Gradient filter but using predefined kernels._

[🖼️ Image options and parameters of `derivative` method](https://api.image-js.org/classes/index.Image.html#derivativeFilter 'link on github io')

Derivative filter is a special case of a gradient filter, therefore it uses gradient algorithm. However, the key difference are the kernels used in this very algorithm. In ImageJS there are three distinguished kernels: [Sobel](https://en.wikipedia.org/wiki/Sobel_operator 'wikipedia link on Sobel kernel'), [Scharr](https://en.wikipedia.org/wiki/Sobel_operator#Alternative_operators 'wikipedia link on Scharr operator') and [Prewitt](https://en.wikipedia.org/wiki/Prewitt_operator 'wikipedia link on Prewitt kernel').

<DerivativeDemo />

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | `[1]`           |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `options`

#### Options

| Property                                                                                            | Required | Default value    |
| --------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| [`bitDepth`](https://api.image-js.org/interfaces/index.DerivativeFilterOptions.html#bitDepth)       | no       | `image.bitDepth` |
| [`borderType`](https://api.image-js.org/interfaces/index.DerivativeFilterOptions.html#borderType)   | no       | `replicate`      |
| [`borderValue`](https://api.image-js.org/interfaces/index.DerivativeFilterOptions.html#borderValue) | no       | `0`              |
| [`filter`](https://api.image-js.org/interfaces/index.DerivativeFilterOptions.html#filter)           | no       | `sobel`          |

- ## Sobel kernel

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

:::info
As was mentioned, derivative filter is a type of gradient filter. Therefore using the same kernels with gradient filter will provide the same image output. Derivative filter simplifies some kernel's application.

_Applying Sobel kernel using gradient filter_

```js
return image.gradientFilter({
  kernelX: [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ],
  kernelY: [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ],
});
```

_Applying Sobel kernel using derivative filter_

```js
return image.derivativeFilter({ filter: 'sobel' });
```

:::
