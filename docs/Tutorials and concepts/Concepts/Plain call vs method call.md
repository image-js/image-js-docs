In most cases there are two ways of calling API functions:

First way is to call it as a function. For example a user can call `flip` filter like this:

```ts
import flip from 'image-js';

flip(image, options);
```

Since it is called plainly, only function of interest needs to be imported.

Second way is to call it as a method of `Image` class. Thus, same filter can be used if a user types:

```ts
import Image from 'image-js';

image.flip(options);
```

Evidently the difference will be in the way functions are imported but the way these functions will work, remains unchanged.
