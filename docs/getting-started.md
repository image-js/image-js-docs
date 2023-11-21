---
sidebar_position: 0
---

# Before getting started

Welcome
ImageJS is a versatile and powerful JavaScript library that opens up a world of possibilities in the realm of image processing and analysis. Designed to empower developers, researchers, and enthusiasts, ImageJS provides a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images directly within web applications. With its user-friendly API and extensive range of functions, ImageJS serves as a valuable resource for tasks such as applying filters, detecting edges, handling color balance, and much more. Whether you're aiming to create captivating visual effects, implement sophisticated image recognition systems, or simply explore the intricacies of image data, ImageJS offers an accessible and efficient solution for harnessing the potential of images in the digital landscape.

It is important to understand and distinguish several concepts used in image processing:

- Channel

- Alpha channel

- Compression

Currently image-js supports

|                  | TIFF                       | GIF                | JPEG            | PNG          |
| ---------------- | -------------------------- | ------------------ | --------------- | ------------ |
| Bits per channel | 8,16                       | 265 indexed colors | 8               | 8,16         |
| Alpha            | N/A                        | 1 bit              | N/A             | 8 or 16 bits |
| Compression      | yes/no(may be destructive) | no                 | no(destructive) | yes          |
