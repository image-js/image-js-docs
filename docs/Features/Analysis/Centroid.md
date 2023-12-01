_Computes a center of mass of the current ROI._

In image processing, centroid is the weighted average of all the coordinates that belong to the region of interest.
It is provides information about the average pixel's intensities, and image orientation.

In ImageJS centroid is a ROI class accessor that returns a pixel coordinate:

```ts
const centroid = roi.centroid;
```
