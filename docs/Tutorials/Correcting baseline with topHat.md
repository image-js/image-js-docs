There are moments when an image doesn't have a perfect lightning and you have uneven background like here.

![sudoku](./images/topHat%20correction/sudoku.png)

So, when extracting regions of interest the regular way you will have a mask like that:

```ts
//The default algorithm used is
//"otsu".
mask = image.threshold();
```

![Global threshold](./images/topHat%20correction/globalThreshMask.jpg)

The cause of this is the nature of the threshold algorithm. In ImageJS it takes a global threshold variable, which means that the algorithms calculate one value and compare it with all the pixels to create a Mask. Obviously, such approach is not very effective when there are smooth shades and uneven illumination.
One of the ways to deal with uneven illumination and improve the output is to apply `topHat`() method. It is a method that subtracts the result of morphological opening from the original image.

```ts
image = image.grey().invert();
//Big structuring element is necessary for
const kernel = Array(101).fill(Array(101).fill(1));
image = image.topHat({ kernel });
```

![topHat comparison](./images/topHat%20correction/topHatComp.png)

Therefore if we look at the histograms of these two images at a given point we will see that the intensities are spread more evenly after topHat, rather than before.

### Histogram before applying topHat

![](./images/topHat%20correction/histBeforeTopHat.svg)

### Histogram after applying topHat

![](./images/topHat%20correction/histAfterTopHat.svg)
