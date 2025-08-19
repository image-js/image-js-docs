---
sidebar_position: 110
---

# Sphericity

_Ratio that assesses how closely an object approaches the shape of a perfect sphere._

[🔎 ROI options and parameters of `sphericity` accessor](https://api.image-js.org/classes/index.Roi.html#sphericity)

Sphericity is a measure of the degree to which a particle approximates the shape of a sphere and is independent of its size. The value is always between 0 and 1. The less spheric the ROI is the smaller is the number.
It is calculated through this formula:

$$
Sphericity =\frac{ 2*\sqrt{Surface*\pi}}{Perimeter};
$$

Sphericity has a similar role as [roundness](./Roundness.md 'internal link to roundness') and can be used as a reference for shape comparison.

In ImageJS sphericity is a ROI class accessor that returns a sphericity index:

```ts
const sphericity = roi.sphericity;
```
