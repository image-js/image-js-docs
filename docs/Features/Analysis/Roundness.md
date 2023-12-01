---
sidebar_position: 100
---

_Quantifies the deviation of an object's shape from a perfect circle._

Roundness is the measure of how closely the shape of an object approaches that of a mathematically perfect circle.
To compute it the formula is this:

$$
Roundness = \frac{4*Surface}{\pi * FeretDiameter_{Max}^2}
$$

Where $$Surface$$ is the surface of ROI and $$FeretDiameter_{Max}$$ is the length of a maximum feret diameter.  
Using roundness as a metric allows for consistent and objective comparisons between different shapes, facilitating research and analysis across various disciplines.

In ImageJS roundness is a ROI class accessor that returns a ratio:

```ts
const roundness = roi.roundness;
```
