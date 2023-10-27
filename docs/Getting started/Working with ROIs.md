### Regions of Interest(ROI)

This brings us to ROI class. Regions of interest, as the name suggests, represent the regions that the user wants to analyze. ROIs are also used in data analysis to focus on particular segments of data, time intervals, or areas of interest within a larger dataset. By isolating these regions, researchers can extract relevant information and gain insights more effectively.

### Getting ROIs

Regions of interest derive from analyzing a mask which produces a map of those regions.
To do so, use `fromMask()` function like this:

```ts
let RoiManager = fromMask(mask);
```

This gives us an object of `RoiMapManager` class. This object serves as a literal map of Regions of Interest.
From there, to get all the ROIs type:

```ts
let rois = RoiManager.getRois();
```

:::info
If there is a particular region of interest that needs to be analyzed, there is `getRoiById(<ROI id>)` method.
:::

### Working with ROIs