In most cases there are two ways of calling API functions: as a function and as a class method.

```ts
//import for function call
import { flip } from 'image-js';

// Method call on the image instance
const flipped1 = image.flip(options);
// Equivalent plain method call
const flipped2 = flip(image, options);
```

The difference will be in the way functions are imported but the way these functions will work, remains unchanged.

There is no particular advantage using one way over another, you are free to use whichever suites your needs best.
