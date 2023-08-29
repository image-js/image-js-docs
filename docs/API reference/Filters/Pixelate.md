import PixelateDemo from './pixelate.demo.tsx'

[Check options and parameters of pixelate method](https://image-js.github.io/image-js-typescript/classes/Image.html#pixelate 'github.io link')

[Pixelate filter](https://en.wikipedia.org/wiki/Pixelization 'Wikipedia link on pixelization concept') is a digital image processing technique used to reduce the level of detail in an image by replacing groups of pixels with a single, average color value. This creates a mosaic-like effect where the image appears to be composed of larger, blocky elements rather than fine details.

<PixelateDemo />

A user can pass on multiple options to customize a desired output. Here are listed available options and their respective default values.For more detailed information click on the option directly.

### Default values

| Option                                                                                                               | Default value |
| -------------------------------------------------------------------------------------------------------------------- | ------------- |
| [`algorithm`](https://image-js.github.io/image-js-typescript/interfaces/PixelateOptions.html#algorithm)              | 'center'      |
| [`cellSize`](https://image-js.github.io/image-js-typescript/interfaces/PixelateOptions.html#cellSize)(**mandatory**) | -             |
| [`out`](https://image-js.github.io/image-js-typescript/interfaces/PixelateOptions.html#out)                          | -             |

<details><summary><b>Implementation</b></summary>

Here's how a pixelate filter is implemented in ImageJS:

_Grid Division_: The first step is to divide the image into a grid of cells. Each cell will represent a block of pixels that will be replaced by a single color in the pixelated version.The size of the grid cells determines the degree of pixelation. Larger grid cells create a more pronounced pixelation effect.

_Color Sampling_: Within each grid cell, the filter samples the colors of the pixels contained in that cell. It can sample it in different algorithms, depending on what the user wants and what algorithm options it chooses.

_Color Replacement_: After obtaining the color for each grid cell, the filter replaces the color of all the pixels within that cell with the calculated sampling color. This effectively reduces the amount of color variation within each cell, resulting in a blocky appearance.

Since each grid cell now represents a larger area of the original image, the fine details are lost, and the image appears pixelated or mosaic-like.

</details>
