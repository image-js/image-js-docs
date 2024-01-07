In this tutorial we will talk about regions of interest, how to extract them and how to analyse them on an actual example.

As a reminder, to get ROIs, first you need to find ROI map. To do so, you can either use `threshold` method:

```ts
const mask = image.threshold();
const roiMap = fromMask(mask);
```

or, if an image has more complex background and many small elements, use `watershed` function:

```ts
const roiMap = watershed(image, { points, mask });
```

:::caution
`watershed` is a rather advanced technique which needs additional parameters to be precalculated.To see more information check out our tutorial about watershed.
:::

For the sake of simplicity we will use the same example as with a threshold method.
Now, to get regions of interest you need to extract them from a map:

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

## Getting metadata from TIFF files

Another aspect worth inspecting is extracting image metadata. If an image is of TIFF format, you can extract some metadata tags that can provide additional information. For instance,

### Getting extra data

Within metadata you might come across something like this:

**image with exta data**

It provides additional information about an image. For instance, in this case you can get information about the microscope that was used, or the magnification level or the electrometric tension that was used while the image was taken. However, this data needs to be parsed, because it simply is not presentable in its raw format.
To do so you need to
