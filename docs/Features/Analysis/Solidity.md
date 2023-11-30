_Measure of the compactness of a region or object, calculated as the ratio of its area to the area of its convex hull, providing insights into the shape irregularity and concavity of the structure._

The solidity describes the extent to which a shape is convex or concave.
It is calculated through this formula.

$$
Solidity = \frac{Surface}{ConvexHull.surface};
$$

Where $Surface$ is the surface of the ROI and $ConvexHull.surface$ is the surface of ROIs convex hull.
The solidity of a completely convex shape is 1, the farther it deviates from 1, the greater the extent of concavity in the shape of the ROI.

In ImageJS solidity is a ROI class accessor that returns a solidity index:

```ts
const solidity = roi.solidity;
```
