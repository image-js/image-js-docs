import GrayDemo from './grayscale.demo.tsx'

[Check options and parameters of grayscale method](https://image-js.github.io/image-js-typescript/classes/Image.html#grey 'github.io link')

[A grayscale filter](https://en.wikipedia.org/wiki/Grayscale 'Wikipedia link on grayscale filter'), often called a black-and-white filter, is an image processing technique used to convert a colored image into a grayscale version. In a grayscale image, each pixel is represented by a single intensity value, typically ranging from 0 (black) to 255 (white), with various shades of gray in between. This process removes color information and retains only the brightness information of the image.

Here's how a grayscale filter works:

_Color Channel Separation_: If the image is in color (composed of red, green, and blue channels), the grayscale filter typically processes each color channel separately. This is done to ensure that the brightness values are determined from the original color intensities.

_Pixel Transformation_: For each pixel in each color channel (red, green, and blue), a transformation is applied to calculate its grayscale intensity value. A common approach is to calculate the weighted average of the color channels' intensities.Here is a list of algorithms used to calculate pixel new value:

- [luma709](<https://en.wikipedia.org/wiki/Luma_(video)>)

- [luma601](<https://en.wikipedia.org/wiki/Luma_(video)>)

- [max]

- [min]

- [average]

- [minmax]

- [red]

- [green]

- [blue]

- [black]

- [cyan]

- [magenta]

- [yellow]

- [hue]

- [saturation]

- [lightness]

_Intensity Clipping_: After calculating the grayscale intensity, the resulting value is then assigned to all three color channels (red, green, and blue) of that pixel. This converts the pixel's color to a shade of gray. If the calculated intensity value is below 0, it is set to 0, and if it is above 255, it is set to 255 to ensure that it remains within the valid intensity range.

_Reassembly_: If the image was processed separately for each color channel, the transformed color channels are reassembled to create the final grayscale image.

The grayscale filter essentially eliminates the color information from the image and retains only the luminance or brightness values. This type of image is often used in situations where color is not essential for understanding or conveying the visual information. Grayscale images can emphasize the tonal contrast and structural details of a scene, making them particularly useful for tasks like analyzing textures, patterns, and lighting conditions.

<GrayDemo />
