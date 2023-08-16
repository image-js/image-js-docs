[Pixelate filter](https://en.wikipedia.org/wiki/Pixelization 'Wikipedia link on pixelization concept') is a digital image processing technique used to reduce the level of detail in an image by replacing groups of pixels with a single, average color value. This creates a mosaic-like effect where the image appears to be composed of larger, blocky elements rather than fine details.

Here's how a basic pixelate filter works:

_Grid Division_: The first step is to divide the image into a grid of cells. Each cell will represent a block of pixels that will be replaced by a single color in the pixelated version.

_Color Sampling_: Within each grid cell, the filter samples the colors of the pixels contained in that cell. It can sample it differently, depending on what the user wants. There are three ways of finding sample color:

- Median sampling: when the values in the grid are sorted to find the median of the formed array.

- Mean sampling: when the sample is computed by obtaining an average value.

- Center sampling: when the sample is computed by finding the center value of the grid.

_Color Replacement_: After obtaining the average color of each grid cell, the filter replaces the color of all the pixels within that cell with the calculated average color. This effectively reduces the amount of color variation within each cell, resulting in a blocky appearance.

_Blocky Appearance_: Since each grid cell now represents a larger area of the original image, the fine details are lost, and the image appears pixelated or mosaic-like.

The size of the grid cells determines the degree of pixelation. Larger grid cells create a more pronounced pixelation effect, while smaller grid cells result in a subtler effect. The pixelation effect is most noticeable in images with high levels of detail, as the reduction in detail becomes more apparent.
