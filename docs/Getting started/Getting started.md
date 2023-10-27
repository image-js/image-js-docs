---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Welcome
Image-JS is a versatile and powerful TypeScript library that opens up a world of possibilities for image processing and analysis. Designed to empower developers, researchers, and enthusiasts, Image-JS provides a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images directly within web applications. With its user-friendly API and extensive range of functions, Image-JS serves as a valuable resource for tasks such as applying filters, detecting edges, handling color balance, and much more.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+

- Windows 10+

- MacOS 12 Monterrey or MacOS 13 Ventura

- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04

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

### Importing an image

Then, there are two ways of importing an image to process it, depending on the way the user is operating: import locally and import through the internet.

#### Local import

Local import is simple. Use function `decode` while getting file's path:

```ts
let parsedImage = decode(readFileSync(<filepath>));
```

#### Import via link

Via browser image is imported through `fetch` method. It works like this:

```

```

### Applying features

ImageJS features are, basically, methods of classes that can be applied on an Image or Mask. Therefore once the image is imported and processed, any image method can be applied. For example if you want to invert pixel values you can use the invert method:

```ts
image = image.invert();
```

ImageJS possesses many features. To look at them more in-depth visit "Features" category.

### Saving an image

To save an image you need to put the decoded data back into an image format. To do so use `encode` function:

```ts
image = image.encode();
```
