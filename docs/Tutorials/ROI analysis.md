In this tutorial we will talk about regions of interest, how to extract them and how to analyze them on an actual example.

## Regions' analysis

### Getting ROIs

As a reminder, to get ROIs, first you need to find ROI map. To do so, you can either use `threshold` method:

```ts
const mask = image.threshold();
const roiMap = fromMask(mask);
```

or, if an image has small elements that are touching each other, use `watershed` function:

```ts
const roiMap = watershed(image, { points, mask });
```

You can see a good image to use threshold on the left and an image for watershed on the right.

![Techniques comparison](./images/roiAnalysis/ThresholdOrWatershed.png)

:::caution
Before taking on the analysis of regions of interest we recommend to take a look at the tutorials for `watershed` and `threshold`.
:::

For the sake of simplicity we will use the same example as in a threshold method. However, we will put a little twist and use an image of [TIFF](https://en.wikipedia.org/wiki/TIFF 'wikipedia link on .tiff format') format. This format is great for storing and editing images of high quality. It also allows adding metadata with extensive information about an image which we will examine a bit further in this tutorial. But for now let's take one step at a time.  
To get regions of interest you need to extract them from a map:

```ts
//in this case we are interested in dark regions of interest, so we
//specify the kind of ROIs we want to extract.
const rois = roiMap.getRois({ kind: 'black' });
```

:::tip
For `getRois()` method you can use options `minSurface` and `maxSurface` to filter the ROIs by surface size.

```ts
const rois = roiMap.getRois({ kind: 'black', minSurface: 1000 });
```

:::

### Getting distribution by size

Now we have all the regions identified and stored. We can work on the analysis of those regions.

![Get ROIs](./images/roiAnalysis/MBR.jpg)

To do so we need to understand what kind of analysis is necessary. Depending on the answer, different tools can be used. Let's say we want to filter regions by size and shape.
To do that we can use surface and some basics from statistics. Let's calculate the size distribution of our ROIs.  
First we need to find the limits of our sample.

```ts
const maxSurface = Math.max(...rois.map((roi) => roi.surface));
const minSurface = Math.min(...rois.map((roi) => roi.surface));
```

After that we can calculate the span of our sample:

```ts
const span = maxSurface - minSurface;
```

Then the width of intervals we will have(classes). There is no particular rule of how to choose it, but this formula is a rule of thumb:

```ts
//We round up the interval for simplicity. You can also make it
//a multiple of 10 if you want.
const interval = span / Math.sqrt(rois.length);
```

After that we can find how many ROIs belong to each interval. To make it more visually clear we will use a map.

```ts
const bySizeDistribution = new Map();

for (let i = minSurface; i < maxSurface; i += interval) {
  const count = rois.filter((roi) => {
    return roi.surface >= i && roi.surface < i + interval;
  }).length;
  const intervalString = i + '-' + (i + interval);
  bySizeDistribution.set(intervalString, {
    frequency: count,
    percentage: ((count / rois.length) * 100).toFixed(2),
  });
}
```

Now you have a data about size distribution in our sample:

![Distribution by size](./images/roiAnalysis/distributionGraph.png)

| Interval (points) | Frequency | Percentage (%) |
| ----------------- | --------- | -------------- |
| 174-451           | 2         | 1.47           |
| 451-728           | 13        | 9.56           |
| 726-1005          | 7         | 5.15           |
| 1005-1282         | 16        | 11.76          |
| 1282-1559         | 19        | 13.97          |
| 1559-1836         | 21        | 15.44          |
| 1836-2113         | 20        | 14.71          |
| 2113-2390         | 12        | 8.82           |
| 2390-2667         | 16        | 11.76          |
| 2667-2944         | 8         | 5.88           |
| 2944-3221         | 1         | 0.74           |
| 3221-3498         | 1         | 0.74           |

### Analyzing regions with roundness and fill ratio

Size is not the only parameter that can be used to filter and analyze regions.
Let's take a more trivial example and have a look at how such properties like fill ratio and roundness will work on this image of fasteners:

![Screws and bolts](./images/roiAnalysis/good.jpg)

The obvious distinction here between washers,nuts and other bolts is the fact that they have holes in them. In this case we can use fill ratio. Fill ratio is the ratio between the actual filled space and the total available space.
So, if we take and filter regions by, let's say, 0.9 as a fill ratio we will get something like this.

```ts
const mask = sourceImage
  .blur({ width: 3, height: 3 })
  .grey()
  //renyiEntropy looks like a better choice of algorithm
  //here. Check multiple algorithms to see which one
  //fits your needs best.
  .threshold({ algorithm: 'renyiEntropy' });

const roiMap = fromMask(mask);
const rois = roiMap.getRois({ kind: 'black' });
//Making a copy to not overwrite the existing image.
let image = sourceImage;

for (const roi of rois) {
  if (roi.fillRatio < 0.9) {
    //paintMask allows painting regions of interest on our
    //image. We recommend using it for highlighting regions
    //and for visual aid.
    image = image.paintMask(roi.getMask(), {
      origin: { column: roi.origin.column, row: roi.origin.row },
      color: [0, 0, 255, 255],
    });
  }
}
```

![Finding washers and nuts](./images/roiAnalysis/screwsMask.jpg)

As you can see the result is decent, but there are two big washers in the bottom-left corner that were not captured. We don't know the correct values for fill ratio of the washer and the size of holes can vary, so it's normal to make some "guesses" for an optimal result.
But then, as you can see, there is now a bolt that was also considered as a washer/nut.

![Fill ratio threshold too high](./images/roiAnalysis/fillRatioOverkill.jpg)

In this case fill ratio is not enough so we will now add another option, which is object's roundness.
This is a property that checks how close the ROIs shape resembles a perfect circle(which means its roundness equals to 1). It is reasonable to believe that washers and nuts are more round than other objects after all.
So we slightly modify our code and add another condition:

```ts
const mask = sourceImage
  .blur({ width: 3, height: 3 })
  .grey()
  //renyiEntropy looks like a better choice of algorithm
  //here. Check multiple algorithms to see which one
  //fits your needs best.
  .threshold({ algorithm: 'renyiEntropy' });

const roiMap = fromMask(mask);
const rois = roiMap.getRois({ kind: 'black' });
//Making a copy to not overwrite the existing image.
let image = sourceImage;

for (const roi of rois) {
  if (roi.fillRatio < 0.95 && roi.roundness >= 0.3) {
    //paintMask allows painting regions of interest on our
    //image. We recommend using it for highlighting regions
    //and for visual aid.
    image = image.paintMask(roi.getMask(), {
      origin: { column: roi.origin.column, row: roi.origin.row },
      color: [0, 0, 255, 255],
    });
  }
}
```

![Finding washers and nuts](./images/roiAnalysis/screwsMask2.jpg)

With this we will get the desired result. All nuts and washers are found. But there is one particularity which should be mentioned. You might have noticed that our roundness limit is rather low. Well, if you put all the roundness values of the ROIs that we found you will see two values that are rather low for circle-shaped objects.

![Aberration in roundness](./images/roiAnalysis/roundness.png)

This is because of two particular cases right here.

![ROIs in aberration](./images/roiAnalysis/aberration.jpg)

Since these two elements are touching our threshold algorithm considers it as one region, which in turn reduces its roundness value. You should pay attention to those objects.

These are some of the basic elements of ROI analysis. However,this is just a fraction of tools that ImageJS possesses. There are other properties that you can discover more about in our [API features](../Features/Regions%20of%20interest/Regions%20of%20interest.md) section. Here is an example of the properties that you can use with any region of interest:

| Feature         | Type         | Value                                                                  |
| --------------- | ------------ | ---------------------------------------------------------------------- |
| `id`            | `number`     | -75                                                                    |
| `origin`        | `Point`      | `{ row: 2390, column: 206 }`                                           |
| `height`        | `number`     | 411                                                                    |
| `width`         | `number`     | 358                                                                    |
| `surface`       | `number`     | 78022                                                                  |
| `eqpc`          | `number`     | 315.18359056163894                                                     |
| `ped`           | `number`     | 469.58631480264023                                                     |
| `feret`         | `Feret`      | `feret: {minDiameter, maxDiameter, aspectRatio}`                       |
| `fillRatio`     | `number`     | 0.9239277171210004                                                     |
| `sphericity`    | `number`     | 0.671194156699617                                                      |
| `roundness`     | `number`     | 0.5064165481909365                                                     |
| `solidity`      | `number`     | 0.8081705794917212                                                     |
| `perimeter`     | `number`     | 1475.2489168102784                                                     |
| `convexHull`    | `ConvexHull` | `convexHull: {points,perimeter,surface}`                               |
| `mbr`           | `Mbr`        | `mbr: {points, surface, angle, width, height, perimeter, aspectRatio}` |
| `filledSurface` | `number`     | 84446,                                                                 |
| `centroid`      | `Point`      | `{ column: 385.2887262566968, row: 2593.7994283663584 }`               |
