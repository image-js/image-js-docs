---
sidebar_position: 60
---

_Calculates ellipse around a region of interest._

[🔎 ROI options and parameters of `ellipse` accessor](https://image-js.github.io/image-js-typescript/classes/Roi.html#ellipse 'github.io link')

As it is obvious from the name, `ellipse` calculates the ellipse around the region of interest.

In ImageJS ellipse is a ROI class accessor that returns an Ellipse object:

| Property name                                                                                   | Description            | Property type                                            |
| ----------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------- |
| [`center`](https://image-js.github.io/image-js-typescript/interfaces/Ellipse.html#center)       | Ellipse's center point | `Point[]`                                                |
| [`majorAxis`](https://image-js.github.io/image-js-typescript/interfaces/Ellipse.html#majorAxis) | Ellipse's major axis   | `{points: [Point,Point] ,length: number ,angle: number}` |
| [`minorAxis`](https://image-js.github.io/image-js-typescript/interfaces/Ellipse.html#minorAxis) | Ellipse's minor axis   | `{points: [Point,Point] ,length: number ,angle: number}` |
| [`surface`](https://image-js.github.io/image-js-typescript/interfaces/Ellipse.html#surface)     | Ellipse's surface      | `{points: [Point,Point] ,length: number ,angle: number}` |

```ts
const ellipse = roi.ellipse;
```
