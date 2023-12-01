_Ratio that assesses how closely an object approaches the shape of a perfect sphere._

Sphericity is a measure of the degree to which a particle approximates the shape of a sphere, and is independent of its size. The value is always between 0 and 1. The less spheric the ROI is the smaller is the number.
It is calculated through this formula:

$$
Sphericity =\frac{ 2*\sqrt{Surface*\pi}}{Perimeter};
$$

In ImageJS sphericity is a ROI class accessor that returns a sphericity index:

```ts
const sphericity = roi.sphericity;
```
