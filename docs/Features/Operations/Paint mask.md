---
sidebar_position: 60
---

_Paints mask on the image._

[🖼️ Image options and parameters of `paintMask` method](https://api.image-js.org/classes/index.Image.html#paintMask)  
[🎭 Mask options and parameters of `paintMask` method](https://api.image-js.org/classes/index.Mask.html#paintMask)

This method allows painting a mask on the image or on the mask. It can serve as a good visualization tool to highlight the regions in question. For instance, by painting a mask of each black ROI here, we can highlight all the particles present on the image.

```ts
for (const roi of rois) {
  const { column, row } = roi.origin;
  const mask = roi.getMask();
  // This paints blue the mask of a roi.
  //Origin of roi needs to be specified for correct
  //display.
  image = image.paintMask(mask, {
    origin: { column, row },
    color: [0, 0, 255],
  });
}
```

![paintMask in action](./images/paintMask/paintMaskComp.png)

### Kinds of images compatible with algorithm

| Image property | What it means              | Possible values |
| -------------- | -------------------------- | --------------- |
| `bitDepth`     | number of bits per channel | `[8,16]`        |
| `components`   | number of components       | any             |
| `alpha`        | is alpha channel allowed   | `true`          |

### Parameters and default values

- `mask`

- `options`

#### Options

**For image:**

| Property                                                                                  | Required | Default value      |
| ----------------------------------------------------------------------------------------- | -------- | ------------------ |
| [`blend`](https://api.image-js.org/interfaces/index.PaintMaskOnImageOptions.html#blend)   | no       | `true`             |
| [`color`](https://api.image-js.org/interfaces/index.PaintMaskOnImageOptions.html#color)   | no       | black              |
| [`origin`](https://api.image-js.org/interfaces/index.PaintMaskOnImageOptions.html#origin) | no       | `{column:0,row:0}` |
| [`out`](https://api.image-js.org/interfaces/index.PaintMaskOnImageOptions.html#out)       | no       | -                  |

**For mask:**

| Property                                                                                 | Required | Default value      |
| ---------------------------------------------------------------------------------------- | -------- | ------------------ |
| [`value`](https://api.image-js.org/interfaces/index.PaintMaskOnMaskOptions.html#value)   | no       | `1`                |
| [`origin`](https://api.image-js.org/interfaces/index.PaintMaskOnMaskOptions.html#origin) | no       | `{column:0,row:0}` |
| [`out`](https://api.image-js.org/interfaces/index.PaintMaskOnMaskOptions.html#out)       | no       | -                  |
