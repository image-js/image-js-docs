---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Welcome
ImageJS is a versatile and powerful JavaScript library that opens up a world of possibilities in the realm of image processing and analysis. Designed to empower developers, researchers, and enthusiasts, ImageJS provides a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images directly within web applications. With its user-friendly API and extensive range of functions, ImageJS serves as a valuable resource for tasks such as applying filters, detecting edges, handling color balance, and much more. Whether you're aiming to create captivating visual effects, implement sophisticated image recognition systems, or simply explore the intricacies of image data, ImageJS offers an accessible and efficient solution for harnessing the potential of images in the digital landscape.

### Installation

Installation of ImageJS is straight-forward.Use terminal to install the package:

<Tabs>
<TabItem value="npm" label="npm" default>

```
npm install image-js
```

</TabItem>
<TabItem value="yarn" label="yarn">

```
yarn add image-js
```

</TabItem>
</Tabs>

Then, there are two ways of importing an image to process it, depending on the way the user is operating: import locally and import through the internet.

#### Local import

Local import is simple. Use function `decode` while getting file's path:

```
let parsedImage = decode(readFileSync(<filepath>));

```

#### Import via link

Via browser image is imported through `fetch`. It works like this:

```

```

### Applying features

ImageJS features are, basically, methods of classes that can be applied on an Image or Mask. Therefore once the image is imported and processed, any image method can be applied. For example if you want to invert pixel values you can use the invert method:

```ts
image = image.invert();
```

ImageJS possesses many features. To look at them more in-depth visit "Features" category.

### Image

Currently ImageJS supports

|                  | TIFF                       | GIF                | JPEG            | PNG          |
| ---------------- | -------------------------- | ------------------ | --------------- | ------------ |
| Bits per channel | 8,16                       | 265 indexed colors | 8               | 8,16         |
| Alpha            | N/A                        | 1 bit              | N/A             | 8 or 16 bits |
| Compression      | yes/no(may be destructive) | no                 | no(destructive) | yes          |

### Mask

Masks are binary images.

### ROI

Regions of interest derive from analyzing a mask which in turn produces ROI map.
