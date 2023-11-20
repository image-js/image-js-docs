import FeretDemo from './feret.demo.tsx'

[Feret diameter](https://en.wikipedia.org/wiki/Feret_diameter 'wikipedia link on feret diameter') is an element of analysis that is determined by measuring the distance between two parallel tangents that are perpendicular to each other and touch the boundary of the object or region of interest.
This measurement is commonly employed in fields such as biology, materials science, and computer vision for the analysis of shapes and structures in images.

:::tip
Feret diameter can be defined by the same lines as if the object was measured by [caliper](https://en.wikipedia.org/wiki/Calipers 'wikipedia link on caliper'). Therefore its other name, caliper diameter.
:::

<FeretDemo />

<details><summary><b>Implementation</b></summary>

Here's how Feret diameter is calculated in ImageJS:

**For minimum diameter**:

_Rotating an object_:

_Calculating distance between points_:

_Finding extreme columns_:

_Make an adjustment of the angle_:

**For maximum diameter**:

_Rotating an object_:

_Calculating distance_:

\_

</details>
