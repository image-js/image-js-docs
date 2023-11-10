In this article we would like to clarify a few things about Images and Masks. Although Mask is a binary image the emphasis is rather on 'binary' part since there are several distinctions between the two that are worth mentioning.
First we will look at the differences between these objects and then we will explain what resembles them.

## Differences

#### Purposes and applications

An image as a visual representation. Although this definition can also be applied to a Mask as well this is not its primary purpose. Its main purpose is to identify regions of interest**link** which enables a more detailed image analysis.
Another way of using a Mask is to apply it on the image. For example it can be used in combination with a filter to see what regions a filter should be applied to. However, it cannot work the other way around and Image cannot be applied on Mask.

#### Properties and features

Second difference are features that those objects use. It is especially apparent if you take a look at [filters](../Features/Filters/Filters.md 'internal link on filters') or [geometry](../Features/Geometry/Geometry.md 'internal link on geometry') methods. The majority of them can be used on Images exclusively. Images also possess different property values. Images can from 1 to 4 color channels and have from 256 to 65536 colors depending on the color model.
Masks however always possess only 1 channel and 2 colors: black and white.

#### Importing and saving

It is also worth mentioning that, unlike regular images, masks cannot be imported nor saved. User can import and save such objects only as Image objects, so they do need to be converted.

## Similarities

Now that we've covered the differences let's talk about how these objects are alike.

#### Properties and features

No, this is not a typo. It's true that due to different object purposes and applications their methods and properties can be different. However,when it comes to morphology or comparison, images and masks can behave rather similarly. And let's not forget that at the end of the day a mask is still an image. While values are different, it still has size, color model and number of channels.

#### Data manipulation

Any image is a matrix and binary images are no exception. Whether it is an image or a mask, data gets extracted through the same algorithm and with almost identical methods.

## Conclusion

Although there are significant differences between the two, if taking into account the differences in the number of channels and color models Masks and Images can behave in a similar fashion. While Image has a wider specter of applications, a Mask can be considered an intermediate between an Image and its regions of interest.
