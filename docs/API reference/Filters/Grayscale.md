import GrayDemo from './grayscale.demo.tsx'

[Check options and parameters of grayscale method](https://image-js.github.io/image-js-typescript/classes/Image.html#grey 'github.io link')

[A grayscale filter](https://en.wikipedia.org/wiki/Grayscale 'Wikipedia link on grayscale filter'), often called a black-and-white filter, is an image processing technique used to convert a colored image into a grayscale version. In a grayscale image, each pixel is represented by a single intensity value, typically ranging from 0 (black) to 255 (white), with various shades of gray in between. This process removes color information and retains only the brightness information of the image.

Here's how a grayscale filter works:

_Color Channel Separation_: If the image is in color (composed of red, green, and blue channels), the grayscale filter typically processes each color channel separately. This is done to ensure that the brightness values are determined from the original color intensities.

_Pixel Transformation_: For each pixel in each color channel (red, green, and blue), a transformation is applied to calculate its grayscale intensity value. A common approach is to calculate the weighted average of the color channels' intensities.Here is a list of algorithms used to calculate pixel new value:

- [luma709](<https://en.wikipedia.org/wiki/Luma_(video)>)

- [luma601](<https://en.wikipedia.org/wiki/Luma_(video)>)

- max : takes maximum value among of red,green and blue

- min : takes the minimum value of red,green and blue

- average : takes an average value of red,green and blue

- minmax : takes an average between the max and min values of red, green and blue.

- red : takes a value of pixel's red channel

- green : takes a value of pixel's green channel

- blue : takes a value of pixel's blue channel

- **black** : takes the minimum of the inverses of red, green and blue.

- cyan : takes cyan component of a pixel

- magenta : takes magenta component of a pixel

- yellow : takes yellow component of a pixel

- **hue**: takes hue component of a pixel

- **saturation** : takes saturation component of a pixel

- **lightness** : takes lightness component of a pixel

_Applying intensity_: After calculating the grayscale intensity, the resulting value is then assigned to all three color channels (red, green, and blue) of that pixel. This converts the pixel's color to a shade of gray.

_Reassembly_: If the image was processed separately for each color channel, the transformed color channels are reassembled to create the final grayscale image.

The grayscale filter essentially eliminates the color information from the image and retains only the luminance or brightness values. This type of image is often used in situations where color is not essential for understanding or conveying the visual information. Grayscale images can emphasize the tonal contrast and structural details of a scene, making them particularly useful for tasks like analyzing textures, patterns, and lighting conditions.

<GrayDemo />