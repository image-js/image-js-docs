---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Image-JS is a versatile and powerful library written in TypeScript for image processing and analysis. By using JavaScript and not WebAssembly, ImageJS provides a stable library across all popular browsers, and gives a user a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images not only within Node.js but also within web-browser.

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

### Loading your first image

There are two ways of loading an image to process it, depending on the way the user is operating: to load locally and load through the browser.

#### Node

Local loading is simple and only needs image's filepath.`decode` function will do the rest:

```ts
let parsedImage = decode(readFileSync(<filepath>));
```

Once the image is imported and processed, any `Image` class method can be applied. For example, if you want to apply an [invert filter](/Features/Filters/Invert.md 'internal link on invert filter') you can use the invert method:

```ts
image = image.invert();
```

Saving an image is an inverse process of loading an image.
First you need to put the decoded data back into an image format. To do so use `encode` function:

```ts
image = image.encode();
```

To save image via Node.js use the `writeFileSync()`.

```ts
writeFileSync(<path to file>, <name of encoded image>);
```

If a file doesn't exist yet, it will be created.

So, in the end you should get a code like this.

```ts
let image = decode(readFileSync(<path to file>));
image = image.invert();
image = image.encode();
writeFileSync(<path to file>, image);
```

#### Browser

Loading an image via browser is different. It goes through `fetch` function:

```ts
const data = await fetch(
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
);
const bufferedData = await data.arrayBuffer();
const image = decode(new DataView(bufferedData)); // image is ready for usage

image = image.grey();
```

To see more methods visit "Features" category.

To display an image via [DOM](https://en.wikipedia.org/wiki/Document_Object_Model 'wikipedia link on dom') you can add a few lines to your browser import.
Use `querySelector` or `getElementFromId` to pick a place where an image will land on your page.

```ts
let placeToLandImage = document.querySelector('<place to put an image>');
placeToLandImage.src = image.toDataUrl();
```

Thus in the end your code with `fetch` should look like this:

```ts
const data = await fetch(
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
);
const bufferedData = await data.arrayBuffer();
const image = decode(new DataView(bufferedData)); // image is ready for usage

image = image.grey();

let placeToLandImage = document.querySelector('<place to put an image>');
placeToLandImage.src = image.toDataUrl();
```

:::tip
Node.js also has the ability to load image via `fetch`
:::

### What's next?

Now that you know how images are loaded and saved you can deepen your understanding by going through [Basics](./Basics 'internal link on basics') folder and see how different basic elements of ImageJS work. You can also broaden your horizons by looking at available [Features](./Features 'internal link on features').

If you want to see how ImageJS works in practice I suggest you visit the [Tutorials](./Tutorials 'internal link on tutorial') segment and see for yourself its practical applications.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+
