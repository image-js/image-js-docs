---
sidebar_position: 81
---

# Holes' info

_Information about holes in the ROI._

[🔎 ROI options and parameters of `holesInfo` method](https://api.image-js.org/classes/index.Roi.html#holesInfo)

Holes info provides information about the number of and the overall surface of holes within the region of interest. It allows finding [fill ratio](./fill-ratio.md) and provides insight about form of the ROI.

In ImageJS `holesInfo()` is a ROI class method that returns an object with number of holes and their total surface in pixels.

```ts
const holesInfo = roi.holesInfo();
```
