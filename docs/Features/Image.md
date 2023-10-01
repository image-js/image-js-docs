This section is dedicated to the `Image` class, its properties and features.

An image is a visual representation or a two-dimensional (2D) depiction of an object, scene, pattern, or information. Images can be thought of as a collection of picture elements or pixels arranged in rows and columns. Each pixel contains color and intensity information, which together create the visual content of the image.

In ImageJS an image is an object with certain properties. The properties are such:

- `width`: image width.

- `height`: image height.

- `size`: a product of width and height.

- `bitDepth`: bit depth is the number of bits allocated per value for each channel.

- `colorModel`: color model represents the way colors are represented and organized. For example the most common one, RGB model, represents each pixel as a combination of three colors: Red, Green and Blue, CMYK model uses Cyan, Magenta, Yellow and Black etc.

- `components`: components represent the number of channels excluding alpha-channel. RGB and RGBA images have the same number of components but not the same number of channels.

- `channels`: number of channels that an image has. Values from each channel form a color of a pixel.

- `alpha`: a boolean that tells whether an image has an alpha channel. Alpha channel is a channel that is used to tell the opacity of a pixel.

- `maxValue`: maximum value that a channel value can have.

- `origin`: a point where an image "starts". By default it is top-left corner of the image.

- `meta`: image metadata.

- `data`: image data.

What methods are used and explained here
:::caution
As a `Mask` class is a binary image, its properties and available methods are quite similar to `Image` class. However they are not identical! Therefore if a method cannot be applied on Mask, there will be a warning at the top of the page.  
:::

:::info
Methods explained here represent the main bulk of the features provided by ImageJS, however this is not an exhaustive API list of references.
To see all the available methods as well as their purposes visit an up-to-date [Github documentation of the project](https://image-js.github.io/image-js-typescript/classes/Image.html 'github.io link on Image class').
:::
