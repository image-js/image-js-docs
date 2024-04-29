---
sidebar_position: 80
---

# Fill ratio

_Ratio of the actual filled space to the total available space._

[🔎 ROI options and parameters of `fillRatio` accessor](https://image-js.github.io/image-js-typescript/classes/Roi.html#fillRatio 'github.io link')

Fill ratio represents the ratio of how much of region's surface is filled with holes. Basically it helps understanding the actual ROI shape and how it is affected by holes in it. For example, if an object does not have holes or cavities in it the fill ratio will be equal to 1.

The ratio is calculated in a simple manner:

$$
fill Ratio = \frac{Surface}{Surface + HolesInfo.surface}
$$

Where $$HolesInfo.surface$$ is the surface property of the method that specifically calculates the information about ROI's holes.

In ImageJS fill ratio is a ROI class accessor that returns a ratio:

```ts
const fillRatio = roi.fillRatio;
```
