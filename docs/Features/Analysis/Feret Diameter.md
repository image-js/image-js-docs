import FeretDemo from './feret.demo.tsx'

_The longest and shortest distances between any two points along the boundary of a region in an image._

[Feret diameter](https://en.wikipedia.org/wiki/Feret_diameter 'wikipedia link on feret diameter') is an element of analysis that is determined by measuring the distance between two parallel tangents that are perpendicular to each other and touch the boundary of the object or region of interest.
This measurement is commonly employed in fields such as biology, materials science, and computer vision for the analysis of shapes and structures in images.

:::tip
Feret diameter can be defined by the same lines as if the object was measured by [caliper](https://en.wikipedia.org/wiki/Calipers 'wikipedia link on caliper'). Therefore its other name, caliper diameter.
:::

![Feret output](./img/inputOutputFeret.png)

In ImageJS Feret diameter is a ROI class accessor that returns a Feret object:

It includes:

- minimum diameter

- maximum diameter

- aspect ratio of two diameters

```ts
const feret = roi.feret;
```

It can also be a Mask method:

```ts
const feret = mask.getFeret();
```

:::info
Each diameter in itself is also an object which has its own properties:

- points that form the diameter

- angle

- length

- calliper lines - its the lines that represent the calliper that enfolds an object.

:::

<details><summary><b>Implementation</b></summary>

Here's how Feret diameter is calculated in ImageJS:

**For minimum diameter**:

_Rotating an object_: An object gets rotated parallel to the X-axis.

_Calculating distance between points_:

_Finding extreme columns_:

_Make an adjustment of the angle_:

**For maximum diameter**:

_Rotating an object_:

_Calculating distance_:

\_

</details>
