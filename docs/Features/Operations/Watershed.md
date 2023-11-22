_Separates and identifies distinct regions or objects within an image through gradient information and marker-based segmentation._

[🖼️ Image options and parameters of `waterShed` function](https://image-js.github.io/image-js-typescript/functions/waterShed.html 'github io link')

[Watershed filter](<https://en.wikipedia.org/wiki/Watershed_(image_processing)> 'wikipedia link on watershed') is a way of identifying objects by finding image's lowest points(minima) in terms of intensity and filling these spaces with color(label). The process reminds geological [watershed](https://en.wikipedia.org/wiki/Drainage_divide 'wikipedia link on drainage divide'), which is the origin of algorithm's name. In order for the "water" not to go overboard and stay within the limits of the region, a threshold of [intensity](../../Glossary.md#intensity 'internal link on glossary') is set.

The watershed algorithm is particularly useful for segmenting objects in images, especially when there are variations in intensity or color.

:::caution
It is important to remember that watershed filter does not return an image, nor mask. It returns a `RoiMapManager` object which stores the location of each region of interest.
:::

| Input                                      | What watershed finds                              |
| ------------------------------------------ | ------------------------------------------------- |
| ![Image Input](./images/CellsDivision.jpg) | ![Image Output](./images/CellsOutputISODATA5.jpg) |

### Parameters and default values

- `image`

- `options`

#### Options

| Property         | Required | Default value |
| ---------------- | -------- | ------------- |
| [`points`](#)    | no       | -             |
| [`mask`](#)      | no       | -             |
| [`threshold`](#) | no       | -             |

<details>
<summary>
<b>Implementation</b>
 </summary>

Here's how watershed filter is implemented in ImageJS:

_Blur and grayscale an image(if necessary)_: an image should be grayscale for watershed filter to work. It is also a good practice to blur an image to remove some of its noise.

_Find minima_: the first step is to find minima points. You need to use `getExtrema` to while precising what kind of points you are looking for. The points should be additionally filtered to remove repeating minima close by.

:::caution
If you look for bright-colored ROIs, then either look for maximum points or invert image before applying watershed.
:::

_Set a threshold or use mask_: threshold needs to be set in order for minima not to fill the whole image and stop at intensity border of a region. It can also use a mask to situate general areas of interest.
_Sort pixels by their intensity_: ImageJS uses a priority queue to sort elements.

_Indicate created regions of interest on a ROI map_: Created regions are indicated on a new ROI map.

</details>
