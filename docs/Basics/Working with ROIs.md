One of the reasons why we need a [mask](./Working%20with%20Masks.md 'internal link on working with mask') is to identify its regions of interest.
In the context of image processing or computer vision, a region of interest is an area or subregion within an image that is identified for closer examination or specific operations. ROIs are often chosen because they contain relevant information or features of interest.

To access regions of interest you need to get a `roiMapManager` object.

```ts
import { fromMask } from 'image-js';

const roiManager = fromMask(mask); // It is a function that returns ROIs from mask.
```

It is literally a map of all the regions of interest situated on an image.

From there all you need to do is use `getRois()` method and you get an array of all the regions of interest ready for analysis.

```ts
const rois = roiManager.getRois();
```

![output image](roiImages/outputImage.png)

:::caution
In the options parameter,`getRois()` has a `kind` option which tells what kind of regions to return.

| `kind` option | What it does               |
| ------------- | -------------------------- |
| `'bw'`        | returns all the regions    |
| `'black'`     | returns only black regions |
| `'white'`     | returns only white regions |

:::

:::info
If there is a particular region of interest that needs to be analyzed, there is `getRoiById(<ROI id>)` method.
:::

Each region of interest possesses many properties and characteristics (ROIs are highlighted in blue).
There are more basic ones like surface and perimeter to know the size. There are also likes of Feret diameter**link** and convex hull**link** as more advanced techniques.

If you need further insight on ROIs level of elongation and shape you can use Feret diameter.
You can use `roi.feret` to get the Feret diameters of region of interest. In our current example, Feret diameters are represented as two green segments.

![feret image](roiImages/outputFeret.png)

If you need to localize ROI and have an approximate understanding of its size or placement.
You can use `roi.mbr` to get the Minimum Bounding Rectangle(MBR)**link** of region of interest. In our current example, MBRs are represented on each region as a red rectangle.

![mbr image](roiImages/outputMbr.png)

Properties shown here only represent a part of what ImageJS analysis is capable of. To learn more about our analysis tools you can visit Analysis section**link**.
