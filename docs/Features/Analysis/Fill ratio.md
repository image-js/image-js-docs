---
sidebar_position: 80
---

_Ratio of the actual filled space to the total available space._

Fill ratio represents how much of regions surface is filled with holes. Basically it helps understanding the relation between actual ROI shape and its hypothetical shape if the  
The ratio is calculated in a simple manner:

$$
Fill ratio = \frac{ROI surface}{ROI surface + HolesInfo.surface}
$$

Where $$ROI surface$$ is the surface of the region and $$HolesInfo.surface$$ is the surface property of the method that specifically calculates the surface of holes.

In ImageJS PED is a ROI class accessor that returns a ratio:

```ts
const fillRatio = roi.fillRatio;
```
