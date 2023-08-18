import InvertDemo from './invert.demo.tsx'

[Check options and parameters of invert method](https://image-js.github.io/image-js/#imageinvert 'github.io link')

The invert filter is an image processing technique used to reverse the color values of an image, creating a negative or "inverted" version of the original. In this process, the darkest areas become the lightest, and the lightest areas become the darkest, while the midtones are adjusted accordingly. The invert filter is a simple but effective way to create visual contrast and produce interesting effects.

Here's how the invert filter works:

_Color Channel Conversion_: If the image is in color, it is often first converted to grayscale or processed separately for each color channel (red, green, and blue) before applying the inversion. This is done to maintain the correct balance of color information while inverting the intensities.

_Pixel Transformation_: For each pixel in the image, the inversion filter transforms its color intensity value. The new intensity value is calculated using the formula:

$$New Intensity = Max Intensity - Original Intensity$$

Where "_Max Intensity_" is the maximum possible intensity value for the color channel. For an 8-bit image, this is typically 255.

_Color Channels Reassembly_: If the image was processed separately for each color channel, the transformed color channels are then reassembled to reconstruct the final inverted color image.

<InvertDemo />
