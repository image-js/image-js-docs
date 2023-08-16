---
sidebar_position: 0
---

# Filters

Image filters are techniques or algorithms applied to digital images in order to modify their appearance, enhance certain features, or extract specific information from them. Image filters work by altering the pixel values of an image based on predefined mathematical operations or transformations. These filters can be used for various purposes, such as artistic effects, noise reduction, image enhancement, edge detection, and more.

:::info Difference between linear and non-linear algorithm filters

**Linear filters**

Linear filters, like Gaussian blur, are filters whose output is a linear function of the input. Any output value of a linear filter is the weighted mean of input values. In other words, to form one element of the output at time, it is necessary to multiply the input values for time moments adjacent to by coefficients and to sum up the products.

**Non-linear filters**

By definition, any filter that is not a linear filter is a non-linear filter, median filter is one of them. A nonlinear filter is the filter whose output is a nonlinear function of the input. One practical reason to use nonlinear filters instead of linear filters is that linear filters may be too sensitive to a small fraction of anomalously large observations at the input.In other words if the image has big difference in pixles' magnitude between pixels it is better to use non-linear filter.If the image has small difference in magnitude linear filter will suffice.
:::
