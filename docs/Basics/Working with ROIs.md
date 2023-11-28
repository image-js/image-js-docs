_A region of interest (ROI) represents an area of contiguous pixels within the image._

ROIs are created from [masks](./Working%20with%20Masks.md 'internal link on working with mask') by identifying contiguous pixels of black or white pixels within it.

ROIs identify and characterize regions within images, which has wide applications in image analysis.

```ts
import { fromMask } from 'image-js';

// Get the list of ROIs representing the white regions of the mask
const rois = fromMask(mask).getRois();
```

In general you don't need to worry about the intermediate object returned by `fromMask`. You will mostly be working with the list of ROIs returned by `getRois()`. It contains all the useful properties which characterize the regions of interest, such as surface, perimeter, centroid etc.

:::tip
In the options parameter,`getRois()` has a `kind` option which tells what kind of regions to return.

| `kind` option | What it does               |
| ------------- | -------------------------- |
| `'bw'`        | returns all the regions    |
| `'black'`     | returns only black regions |
| `'white'`     | returns only white regions |

:::

<!-- Add  a comment about what the image is -->

Here is an example of how to extract ROIs from a real image.

<!-- Here goes a your source code along with annotations about the generated intermediate images (don't put the code that creates the painted images) -->

<!-- Include here an image 4 sub-images with captions: The original image, the mask, the original image with the ROIs painted in blue, the original image with the feret diameters painted over it. -->

![output image](roiImages/outputImage.png)

Each region of interest possesses many properties and characteristics (ROIs are highlighted in blue).
There are more basic ones like surface and perimeter to know the size. There are also likes of Feret diameter**link** and convex hull**link** as more advanced techniques.

If you need further insight on ROIs level of elongation and shape you can use Feret diameter.
You can use `roi.feret` to get the Feret diameters of region of interest. In our current example, Feret diameters are represented as two green segments.

![feret image](roiImages/outputFeret.png)

If you need to localize ROI and have an approximate understanding of its size or placement.
You can use `roi.mbr` to get the Minimum Bounding Rectangle(MBR)**link** of region of interest. In our current example, MBRs are represented on each region as a red rectangle.

![mbr image](roiImages/outputMbr.png)

Properties shown here only represent a part of what ImageJS analysis is capable of. To learn more about our analysis tools you can visit Analysis section**link**.
