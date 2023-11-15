EQPC represents a circle of equal projection area. This means that it is a diameter of a circle that has the same area as an object of interest.
It is widely used for the evaluation of particles sizes from the projection area A of a non-spherical particle.
The formula finds diameter from potential circle's surface:

$$
EQPC = 2\sqrt{\frac{Surface}{\pi}}
$$

In ImageJS EQPC is a ROI class method that returns a diameter in pixels:

```ts
let eqpcResult = roi.eqpc;
```
