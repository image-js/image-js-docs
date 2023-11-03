---
sidebar_position: 0
---

[Morphological operations](../../Glossary.md#morphology 'internal link on morphology') are based on a structuring element, which is a small shape or pattern used as a template for modifying the pixels in an image. The structuring element is typically a small binary array that defines the area around a pixel to consider during the operation.

Morphological operations are simple yet powerful tools that play a significant role in various image processing tasks, especially in situations where the shapes and structures of objects are important.

### Methods

| Can be applied on                                                                                                         | Images  | Masks    |
| ------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| [Morphological gradient(`morphologicalGradient`)](./Morphological%20Gradient.md 'internal link on morphologicalGradient') | &#9989; | &#9989;  |
| [Canny edge detector(`cannyEdgeDetector`)](./Canny%20Edge%20Detector.md 'internal link on cannyEdgeDetector')             | &#9989; | &#10060; |
| [Erosion(`erode`)](./Erosion.md 'internal link on erode')                                                                 | &#9989; | &#9989;  |
| [Dilation(`dilate`)](./Dilation.md 'internal link on dilate')                                                             | &#9989; | &#9989;  |
| [Opening(`open`)](./Opening.md 'internal link on open')                                                                   | &#9989; | &#9989;  |
| [Closing(`close`)](./Closing.md 'internal link on close')                                                                 | &#9989; | &#9989;  |
| [Top Hat(`topHat`)](./Top%20Hat 'internal link on topHat')                                                                | &#9989; | &#9989;  |
| [Bottom Hat(`bottomHat`)](./Bottom%20Hat 'internal link on bottomHat')                                                    | &#9989; | &#9989;  |
