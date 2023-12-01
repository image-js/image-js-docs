---
sidebar_position: 50
---

_Diameter of the circle that results in a circumference equal to the sum of the lengths of the sides of a polygon with the same perimeter._

PED represents a diameter of a circle that has the same perimeter as the particle image.
Similarly to [EQPC](./EQPC.md 'internal link on eqpc') it is used to evaluate particles' sizes albeit from its perimeter and not surface.

The formula is simple:

$$
PED = \frac{Perimeter}{\pi};
$$

In ImageJS PED is a ROI class accessor that returns a diameter in pixels:

```ts
const pedResult = roi.ped;
```
