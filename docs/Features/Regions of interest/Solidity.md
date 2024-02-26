---
sidebar_position: 90
---

# Solidity

_Measure of the compactness of a region or object._

[🔎 ROI options and parameters of `solidity` accessor](https://image-js.github.io/image-js-typescript/classes/Roi.html#solidity 'github.io link')

The solidity describes the extent to which a shape is convex or concave.
It is calculated through this formula.

$$
Solidity = \frac{Surface}{ConvexHull.surface};
$$

Where $ConvexHull.surface$ is the surface of ROIs convex hull.

It provides insights into the shape irregularity and concavity of the structure.  
The solidity of a completely convex shape is 1, the farther it deviates from 1, the greater the extent of concavity in the shape of the ROI.

In ImageJS solidity is a ROI class accessor that returns a solidity index:

```ts
const solidity = roi.solidity;
```
