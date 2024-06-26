The point of this tutorial is to show how to decode a stack of images and how to do some basic analysis.

ImageJS has the ability to decode a `tiff` stack of images and analyze each image further. Images in stack can represent frame-by-frame successive changes. This way we can take a look dynamically at changes that happen to regions of interest.
In our specific case here, we have a stack of pulsar kind of images. ImageJS can help us figure out when the region is shown in the image and when it isn't by looking at the average value of the region.

Here's how it is done.

### Decode the Stack

Just like any image, after getting our stack needs to be parsed fo us to work with data.

```ts
const buffer = fs.readFileSync();
const stack = decodeStack(stack);
```

### Find the image with maximum values:

Stack class has a function called `maxImage`. It will give us the maximum value of each pixel from the stack. We will use this image as a reference for all other images, to locate regions of interest.

```ts
const maxValueImage = stack.maxImage();
```

# maxValueImage

### Locate ROIs

From our "maxValues" image we can find all the regions of interest. To do so, we treat it as any other image and get its mask through `threshold()`. Then we use `fromMask()` and `getRois()` functions:

```ts
const maxValueMask = maxValueImage.threshold();
const roiMap = fromMask(maxValueMask);
//Provides all the regions
const rois = roiMap.getRois();
```

# maxValueMask

### Find average value of each ROI on each image

After we found all the ROIs on the "maxValue" image, we take each region and check its average value on every image in the stack.
It will look something like this:

```ts
const stackGrays = new Map<number, number[]>();
for (const roi of rois) {
  const stackAvgs = [];
  const roiPoints = roi.absolutePoints;
  for (const image of stack) {
    const avgValue = image.mean({ points: roiPoints });
    //gets value from one channel since it is grayscaled.
    stackAvgs.push(avgValue[0]);
  }
  stackGrays.set(roi.id, stackAvgs);
}
```

This will create a map where the key is the ID of each ROI, and the values are an array of average values of ROI coordinates across all the images in the stack.
This way we can take a look at the changes in intensity of ROI from one image to another.