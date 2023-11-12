---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

Image-JS is a versatile and powerful TypeScript library for image processing and analysis. By using JavaScript and not WebAssembly, ImageJS provides a stable library across all popular browsers, and gives a user a comprehensive set of tools and algorithms for manipulating, enhancing, and understanding images not only within Node.js but also within web-browser.

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

### Loading an image

There are two ways of loading an image to process it, depending on the way the user is operating: to load locally and load through the browser.

#### Load via Node

Local loading is simple and only needs image's filepath.`decode` function will do the rest:

```ts
let parsedImage = decode(readFileSync(<filepath>));
```

#### Load via link

Loading an image via browser is different. It goes through `fetch` function:

```ts
let image = async () => {
await fetch(<image-link>)
.then((data) => {
  data.ArrayBuffer()
  } // provides image raw data
.then((data) => {
  let view = new DataView(data); //allows data to be parsed
  const parsedImage = decode(view); //parses data
  return parsedImage;
  })
}

image = image.grey(); // image is ready for usage
```

### Applying features

Once the image is imported and processed, any `Image` class method can be applied as a feature. For example if you want to apply an [invert filter](/Features/Filters/Invert.md 'internal link on invert filter') you can use the invert method:

```ts
image = image.invert();
```

To see more methods visit "Features" category.

### Saving an image

#### Save an image via Node

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

#### Display an image via browser

To display an image via [DOM](https://en.wikipedia.org/wiki/Document_Object_Model 'wikipedia link on dom') you can add a few lines to your browser import.
Use `querySelector` or `getElementFromId` to pick a place where an image will land on your page.

```ts
let placeToLandImage = document.querySelector('<place to put an image>');
placeToLandImage.src = image.toDataUrl();
```

### What's next?

Now that you know how images are loaded and saved you can deepen your understanding by going through [Basics](./Basics 'internal link on basics') folder and see how different basic elements of ImageJS work. You can also broaden your horizons by looking at available [Features](./Features 'internal link on features').

If you want to see how ImageJS works in practice I suggest you visit the [Tutorials](./Tutorials 'internal link on tutorial') segment and see for yourself its practical applications.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+
