Although Mask is a binary image, in ImageJS these two objects differentiate on multiple levels.
First of all, the purpose of mask is to enable image analysis and spot regions of interest.

Second difference are features that can be applied to those objects. Although these objects do bear similar traits many methods work only on one object or another. It is especially apparent if you take a look at filters or

Last but not least is the fact that a mask(binary image) cannot be directly imported. It can only be created from an image that was added.

Same goes for saving this image. It needs to be converted to one of supported file formats first.
