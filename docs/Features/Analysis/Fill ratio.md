---
sidebar_position: 80
---

_Ratio of the actual filled space to the total available space._

Fill ratio represents the ratio of how much of region's hypothetical, potential surface is filled with holes. Basically it helps understanding the actual ROI shape and how it is affected by holes in it.

The ratio is calculated in a simple manner:

$$
Fill ratio = \frac{Surface}{Surface + HolesInfo.surface}
$$

Where $$HolesInfo.surface$$ is the surface property of the method that specifically calculates the surface of holes.

In ImageJS PED is a ROI class accessor that returns a ratio:

```ts
const fillRatio = roi.fillRatio;
```
