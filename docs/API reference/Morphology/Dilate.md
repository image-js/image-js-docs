import DilateDemo from './dilate.demo.tsx'

Dilation is a fundamental morphological operation in image processing that is used to expand the size of foreground objects (regions of interest) within an image while preserving their shape and structure. It involves moving a structuring element (also known as a kernel) over the image and replacing each pixel with the maximum value of the pixels covered by the structuring element. Dilation is commonly used for tasks like noise reduction, object enlargement, and feature enhancement.

<DilateDemo />
