n image processing, a mask is a binary image or a matrix, where each pixel value indicates whether the corresponding pixel in the target image should be retained (usually denoted as 1 or "on") or ignored (usually denoted as 0 or "off")

Creation of the mask is based on the threshold that define the level of grey intensity that separates the white pixels from the black pixels.

Mask is an object which represents a binary image, therefore its properties are the same as in `Image` class. However, the methods can be slightly different.

:::info
To look deeper into Mask's properties and methods take a look at [the Mask description](../../../API%20reference/Mask/Mask.md) in API reference.
:::

There are multiple ways of creating a Mask.

One way is to create a new object of the class `Mask`:

```js
let mask = new Mask(width, height, options);
```

where options are:

-`origin` - point of origin which

-`data` - image data which will be transferred to the mask

-`width` - mask width

-`height` - mask height

Another way of creating a mask is to use a class method `createFrom(Image|Mask)`. It will look like this:

```ts
let image = new Image(3, 3);
let mask = Mask.createFrom(image);
```

Another way of creating a mask is through `threshold()` method of the image. It allows choosing an algorithm and value of thresholding which in turn allows to choose a more suitable Mask for next operations.

```js
let mask = image.threshold();
```

The advantage of threshold method is that it creates a mask directly from an image with its data taken into account.

Mask is extremely important for finding regions of interest in the image for further analysis.
