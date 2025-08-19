---
sidebar_position: 60
---

_Calculates ellipse around a region of interest._

[🔎 ROI options and parameters of `ellipse` accessor](https://api.image-js.org/classes/index.Roi.html#ellipse)

As it is obvious from the name, `ellipse` calculates the ellipse around the region of interest.

In ImageJS ellipse is a ROI class accessor that returns an Ellipse object:

| Property name                                                                   | Description            | Property type                                            |
| ------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------- |
| [`center`](https://api.image-js.org/interfaces/index.Ellipse.html#center)       | Ellipse's center point | `Point[]`                                                |
| [`majorAxis`](https://api.image-js.org/interfaces/index.Ellipse.html#majorAxis) | Ellipse's major axis   | `{points: [Point,Point] ,length: number ,angle: number}` |
| [`minorAxis`](https://api.image-js.org/interfaces/index.Ellipse.html#minorAxis) | Ellipse's minor axis   | `{points: [Point,Point] ,length: number ,angle: number}` |
| [`surface`](https://api.image-js.org/interfaces/index.Ellipse.html#surface)     | Ellipse's surface      | `{points: [Point,Point] ,length: number ,angle: number}` |

```ts
const ellipse = roi.ellipse;
```
