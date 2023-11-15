PED represents a diameter of a circle that has the same perimeter as the particle image.
Similarly to [EQPC](./EQPC.md 'internal link on eqpc') it is used to evaluate particles' sizes from its perimeter.

The formula is simple:

$$
PED = \frac{Perimeter}{\pi};
$$

In ImageJS PED is a ROI class method that returns a diameter in pixels:

```ts
let pedResult = roi.ped;
```
