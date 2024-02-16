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

const parsedImage = readSync('../example.jpg');
```

:::tip
Node.js can also load an image via `fetch` function. To get more information take a look at "Browser" part of this section.
:::

Once the image is loaded, it returns an instance of the `Image` class, so its methods can be applied.

```ts
const image = parsedImage.invert();
```

To save an image use `writeSync` function:

```ts
writeSync('../example.jpg', image);
```

Image format is automatically identified based on the extension typed by the user. In this case it's `'.jpg'`.

So, in the end you should get a code like this.

```ts
import { readSync, writeSync, Image } from 'image-js';

const parsedImage = readSync('../example.jpg');
const image = parsedImage.invert();
writeSync('../example.jpg', image);
```

### Loading your first image in browser

To load an image via browser, in order to instantiate it, you need to get an `arrayBuffer`. One of the ways :

```ts
const data = await fetch('https:://example.com/image.jpg');
const bufferedData = await data.arrayBuffer();
let image = decode(new DataView(bufferedData)); // image is ready for usage

image = image.grey();
```

:::info
To see more methods visit ["Features"](./Features/Features.md 'internal link on features') category.
:::

### Bundling your image with Vite

To display an image via [DOM](https://en.wikipedia.org/wiki/Document_Object_Model 'wikipedia link on dom') you can use `writeCanvas` method.

To do so, you need to create a Node.js project:

```
npm init
```

After creating one, install `vite` as a dev-dependency and then install `image-js`:

```
npm install -D vite
```

```
npm install image-js
```

After this you can create a basic html page `index.html` with a `<canvas>` element:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>image-js demo app</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- canvas element -->
    <canvas id="my_canvas" />
  </body>
</html>
```

In the `<body>` part of your code insert your `image-js` script. For instance, here the script turns image into grayscale:

```html
<script type="module">
  import {(Image, writeCanvas)} from 'image-js';
  const data = await fetch('https:://example.com/image.jpg');
  const bufferedData = await data.arrayBuffer();
  let image = decode(new DataView(bufferedData)); // image is ready for usage

  image = image.grey();
  const canvas = document.getElementById('my_canvas');
  writeCanvas(image, canvas);
</script>
```

:::caution
Don't forget to specify the script type. If it is not set as module, the script will not work.
:::

Thus, in the end your html page should look like this:

```ts
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>image-js demo app</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- canvas element -->
    <canvas id="my_canvas" />
    <script type="module">
  import {Image, writeCanvas,decode} from 'image-js';
  const data = await fetch('https:://example.com/image.jpg');
  const bufferedData = await data.arrayBuffer();
  let image = decode(new DataView(bufferedData)); // image is ready for usage

  image = image.grey();
  console.log(Image);
  const canvas = document.getElementById('my_canvas');
  writeCanvas(image, canvas);
</script>
  </body>
</html>
```

### What's next?

Now that you know how images are loaded and saved you can deepen your understanding by going through [Basics](./Basics 'internal link on basics') folder and see how different basic elements of ImageJS work. You can also broaden your horizons by looking at available [Features](./Features 'internal link on features').

If you want to see how ImageJS works in practice I suggest you visit the [Tutorials](./Tutorials 'internal link on tutorial') segment and see for yourself its practical applications.

### System requirements

- Node.js 16+

- Google Chrome 91+, Firefox 90+, Safari 15+, Opera 77+, Edge 91+
