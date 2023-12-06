---
sidebar_position: 60
---

_Diameter of a circle that has the same area as the projection area of the region of interest._

EQPC represents a circle of equal projection area. This means that it is a diameter of a circle that has the same area as an object of interest.
It is widely used for the evaluation of particles sizes from the projection area A of a non-spherical particle.

![roi image](./img/roi.svg)

The formula finds diameter from potential circle's surface:

$$
EQPC = 2\sqrt{\frac{Surface}{\pi}}
$$

In ImageJS EQPC is a ROI class accessor that returns a diameter length in pixels:

```ts
const eqpcResult = roi.eqpc;
```
