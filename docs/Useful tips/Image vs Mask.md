[//]: <TODO : add a link to region of interest.>

In this article we would like to clarify a few things about Images and Masks. When it comes to morphology or comparison methods, images and masks can behave rather similarly. And let's not forget that at the end of the day a mask is still an image albeit a binary one.
However, there are two main differences in their use that the user needs to understand to use them properly.

### Purposes and applications

Mask's main purpose is to identify regions of interest which enables a more detailed and thorough image analysis.
Mask can also be applied on an image. For example it can be used in combination with a filter to see what regions filter should be applied to. However, it cannot work the other way around and Image cannot be applied on Mask.

### Properties and features

Second difference are features that those objects use. It is especially apparent if you take a look at [filters](../Features/Filters/Filters.md 'internal link on filters') or [geometry](../Features/Geometry/Geometry.md 'internal link on geometry') methods. The majority of them can be used on Images exclusively. Images also possess multiple color models. Their maximum value as well as number of channels can vary.
Masks, however, can only have a binary color model.
