In this article we would like to clarify a few things about Images and Masks. When it comes to morphology or comparison methods, images and masks can behave rather similarly. And let's not forget that at the end of the day a mask is still an image albeit a binary one. While possible values are different, it still has size, color model and number of channels.
However, there are two main differences in their use that the user needs to understand to use them properly.

### Purposes and applications

Mask's main purpose is to identify regions of interest**link** which enables a more detailed and thorough image analysis.
Mask can also be applied on an image. For example it can be used in combination with a filter to see what regions filter should be applied to. However, it cannot work the other way around and Image cannot be applied on Mask.

### Properties and features

Second difference are features that those objects use. It is especially apparent if you take a look at [filters](../Features/Filters/Filters.md 'internal link on filters') or [geometry](../Features/Geometry/Geometry.md 'internal link on geometry') methods. The majority of them can be used on Images exclusively. Images also possess different property values. They can have from 1 to 4 color channels and from 256 to 65536 colors depending on the color model.
Masks, however, always possess only 1 channel and 2 colors: black and white.
