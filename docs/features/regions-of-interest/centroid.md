---
sidebar_position: 70
---

# Centroid

_Center of mass of the current ROI._

[🔎 ROI options and parameters of `centroid` accessor](https://api.image-js.org/classes/index.Roi.html#centroid)

In image processing, centroid is the weighted average of all the coordinates that belong to the region of interest.

Centroids can be useful for determining the location of an object within an image as well as for tracking the movement of objects over time.

In ImageJS centroid is a ROI class accessor that returns a point:

```ts
const centroid = roi.centroid;
```
