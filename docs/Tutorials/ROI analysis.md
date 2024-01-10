In this tutorial we will talk about regions of interest, how to extract them and how to analyse them on an actual example.

As a reminder, to get ROIs, first you need to find ROI map. To do so, you can either use `threshold` method:

```ts
const mask = image.threshold();
const roiMap = fromMask(mask);
```

or, if an image has more complex background and many small elements positioned closely to each other, use `watershed` function:

```ts
const roiMap = watershed(image, { points, mask });
```

**add images for example**

:::caution
`watershed` is a rather advanced technique which needs additional parameters to be precalculated.To see more information check out our tutorial about watershed.
:::

For the sake of simplicity we will use the same example as with a threshold method.However, we will put a little twist and use an image of [TIFF](https://en.wikipedia.org/wiki/TIFF 'wikipedia link on .tiff format') format. This format is great for storing and editing an image. It also allows to add metadata with extensive information about an image which we will examine a bit further in this tutorial. But for now let's not go too far ahead and take one step at a time.
To get regions of interest you need to extract them from a map:

```ts
//in this case we are interested in dark regions of interest, so we
//specify the kind of ROIs we want to extract.
const rois = roiMap.getRois({ kind: 'black' });
```

:::tip
For `getRois()` method you can use options `minSurface` and `maxSurface` to filter the ROIs by surface size.
So in this case providing case
Now, for the

```ts
const rois = roiMap.getRois({kind:'black',minSurface:})
```

:::
Now we have all the regions identified and stored. We can work on the analysis of those regions.

**image of colored ROIs**
W
To do so we need to understand what kind of analysis is necessary. Depending on the answer different tools can be used. Let's say we want to find the filter regions by size and shape. Now,
For the size it is rather straight-forward. You can use the `getRois()` options, as was mentioned above, or you can use region's perimeter and surface properties to filter the ROIs.
In this example let's get the regions which are above an average size of the `rois` sample.
First we need to find this average. It can be done in a rather straight-forward fashion:

```ts
let surfaceSum = 0;
for (const roi of rois) {
  surfaceSum += roi.surface;
}
const avgSurface = surfaceSum / rois.length;
```

After that we can get regions that are above the average size:

```ts
const biggestRois = [];
for (const roi of rois) {
  if (roi.surface >= avgSurface) {
    biggestRois.push(roi);
  }
}
```

**add image with highlighted big regions**
The selected regions can be investigated further. For instance, we can use property like `roundness` to see how close the region's shape is to a circle. Let's put arbitrarily 0.8 as a limit.

```ts
let roundestRois = [];
for (const roi of biggestRois) {
  if (roi.roundness > 0.9) {
    roundestRois.push(roi);
  }
}
```

**add image with highlighted round regions**

## Getting metadata from TIFF files

Another aspect worth inspecting is extracting image metadata. If an image is of TIFF format, you can extract some metadata tags that can provide additional information. For instance,

### Getting extra data

Within metadata you might come across something like this:

**image with exta data**

It provides additional information about an image. For instance, in this case you can get information about the microscope that was used, or the magnification level or the electrometric tension that was used while the image was taken. However, this data needs to be parsed, because it simply is not presentable in its raw format.
To do so you need to
