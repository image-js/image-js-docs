import ErodeDemo from './erode.demo.tsx'

[Erosion](https://en.wikipedia.org/wiki/Erosion 'wikipedia link on erosion') is a fundamental morphological operation in image processing that is used to reduce the size of foreground objects (regions of interest) within an image while preserving their shape and structure. It works by moving a structuring element (also known as a [kernel](../../Glossary.md#kernel 'internal link on kernel')) over the image and replacing each pixel with the minimum value of the pixels covered by the structuring element. Erosion is particularly useful for tasks like noise reduction, edge detection, and object separation.

<ErodeDemo />
