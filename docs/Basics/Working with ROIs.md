è

![output image](roiImages/outputImage.png)

Each region of interest possesses many properties and characteristics (ROIs are highlighted in blue).
There are more basic ones like surface and perimeter to know the size. There are also likes of Feret diameter and convex hull as more advanced metrics.

You can use `roi.feret` to get the Feret Diameters of region of interest.In our current example, feret diameters are represented as two green segments.

![feret image](roiImages/outputFeret.png)

You can use `roi.mbr` to get the Minimum Bounding Rectangle(MBR) of region of interest. In our current example, MBRs are represented on each region as a red rectangle.

![mbr image](roiImages/outputMbr.png)

:::info
If there is a particular region of interest that needs to be analyzed, there is `getRoiById(<ROI id>)` method.
:::
