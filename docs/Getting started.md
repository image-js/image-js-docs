---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Image-JS is a versatile and powerful TypeScript library for image processing and analysis. By using JavaScript and not WebAssembly, ImageJS provides a stable library across all popular browsers, and gives a user a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images not only within Node.js but also within web-browser.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+

- Windows 10+

- MacOS 12 Monterrey or MacOS 13 Ventura

- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04

### Installation

Installation of ImageJS is straight-forward. Use terminal to install the package:

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

Then, there are two ways of importing an image to process it, depending on the way the user is operating: import locally and import through the browser.

#### Local import

Local import is simple. Use function `decode` while using `readFileSync()` :

```ts
let parsedImage = decode(readFileSync(<filepath>));
```

#### Import via link

Via browser an image is imported through `fetch` method:

```ts

let image = async () => {
await fetch(<image-link>)
.then((data) => {
  data.ArrayBuffer()
  }
.then((data) => {
  let view = new DataView(data);
  const parsedImage = decode(view);
  return parsedImage;
  })
}

image = image.grey();
```

After the promise is received, the data gets parsed into a string of binary data. Then it gets converted into a `DataView` and finally `decode` function parses it into an actual image data which the user can work with.

### Applying features

Once the image is imported and processed, any `Image` class method can be applied as a feature. For example if you want to apply an [invert filter](/Features/Filters/Invert.md 'internal link on invert filter') you can use the invert method:

```ts
image = image.invert();
```

ImageJS possesses many features. To have a deeper understanding visit "Features" category.

### Saving an image

To save an image you need to put the decoded data back into an image format. To do so use `encode` function:

```ts
image = image.encode();
```
