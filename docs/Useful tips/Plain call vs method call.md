---
sidebar_position: 30
---

# Plain call vs method call

In most cases there are two ways of calling API functions: as a function and as a class method.

```ts
//import for function call
import { flip } from 'image-js';

// Method call on the image instance
const flipped1 = image.flip(options);
// Equivalent plain method call
const flipped2 = flip(image, options);
```

There is no particular advantage using one way over another, you are free to use whichever suites your needs best.
