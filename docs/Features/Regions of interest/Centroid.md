---
sidebar_position: 70
---

_Center of mass of the current ROI._

[🔎 ROI options and parameters of `centroid` accessor](https://image-js.github.io/image-js-typescript/classes/Roi.html#centroid 'github.io link')

In image processing, centroid is the weighted average of all the coordinates that belong to the region of interest.

Centroids can be useful for determining the location of an object within an image as well as for tracking the movement of objects over time.

In ImageJS centroid is a ROI class accessor that returns a point:

```ts
const centroid = roi.centroid;
```
