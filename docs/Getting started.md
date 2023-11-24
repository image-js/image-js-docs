---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Image-JS is a versatile and powerful library written in TypeScript for image processing and analysis. It gives a user a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images not only within Node.js but also across all popular browsers.

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

There are two ways of loading an image to process it, depending on the way the user is operating: to load locally and load through the browser.

### Loading your first image in Node.js

Local loading uses `readSync` function with indicated filepath:

```ts
import { readSync } from 'image-js';

let parsedImage = readSync('../example.jpg');
```

It gets an image
:::tip
Node.js can also load an image via `fetch` function. To get more information take a look at "Browser" part of this section.
:::

Once the image is loaded, it returns an instance of the `Image` class, so its methods can be applied. For example, if you want to apply an [invert filter](/Features/Filters/Invert.md 'internal link on invert filter') you can use the invert method:

```ts
image = image.invert();
```

To save an image use `writeSync` function:

```ts
writeSync('example.jpg', image);
```

Image format is automatically identified based on the extension typed by the user. In this case it's `'.jpg'`.

So, in the end you should get a code like this.

```ts
import { readSync, writeSync, Image } from 'image-js';

let image = readSync('../example.jpg');
image = image.invert();
writeSync('example.jpg', image);
```

### Loading your first image in browser

To load an image via browser, in order to instantiate it, you need to get an `arrayBuffer`. One of the ways :

```ts
const data = await fetch('https:://example.com/image.jpg');
const bufferedData = await data.arrayBuffer();
const image = decode(new DataView(bufferedData)); // image is ready for usage

image = image.grey();
```

To see more methods visit ["Features"](./Features/Features.md 'internal link on features') category.

An image can also be loaded from a local host through a local filepath. You can use the `read` function

```ts
import { read } from 'image-js';

const data = async () => {
  const data = await read('file:///path/to/file.jpg');
  data = image.invert();
};
```

To display an image via [DOM](https://en.wikipedia.org/wiki/Document_Object_Model 'wikipedia link on dom') you can add a few lines to your browser import.
You can use `writeCanvas` method to do so.

```ts
let canvas = document.getElementById('canvasID'); //puts image into body element of the page
writeCanvas(image, canvas);
```

Thus in the end your code with `fetch` should look like this:

```ts
const data = await fetch('https:://example.com/image.jpg');
const bufferedData = await data.arrayBuffer();
const image = decode(new DataView(bufferedData)); // image is ready for usage

image = image.grey();

let canvas = document.getElementById('canvasID'); //puts image into body element of the page
writeCanvas(image, canvas);
```

### What's next?

Now that you know how images are loaded and saved you can deepen your understanding by going through [Basics](./Basics 'internal link on basics') folder and see how different basic elements of ImageJS work. You can also broaden your horizons by looking at available [Features](./Features 'internal link on features').

If you want to see how ImageJS works in practice I suggest you visit the [Tutorials](./Tutorials 'internal link on tutorial') segment and see for yourself its practical applications.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+
